const https = require('https');

// The FRED API key is read from the environment, never hardcoded. This file
// previously contained the key literally, which committed it to git history and
// pushed it to a public GitHub repo — see the note in scripts/README-fred.md.
// Run with:  FRED_API_KEY=... node scripts/<this-file>
const API_KEY = process.env.FRED_API_KEY;
if (!API_KEY) {
  console.error('FRED_API_KEY is not set. Run: FRED_API_KEY=<key> node ' + __filename);
  process.exit(1);
}

function fetchSeries(seriesId, startYear = 1970) {
  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${API_KEY}&file_type=json&observation_start=${startYear}-01-01`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          if (!data.observations) {
            reject(new Error(`No observations for ${seriesId}: ${body}`));
            return;
          }
          resolve(data.observations.map(obs => ({
            date: obs.date,
            value: parseFloat(obs.value)
          })).filter(obs => !isNaN(obs.value)));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  try {
    console.log('Fetching Federal Deficit/Surplus to GDP (FYFSGDA188S)...');
    const deficitDataRaw = await fetchSeries('FYFSGDA188S', 1970);
    const deficitData = deficitDataRaw.map(d => ({
      year: parseInt(d.date.split('-')[0]),
      value: d.value
    }));

    console.log('Fetching Industrial Production (INDPRO)...');
    const indproDataRaw = await fetchSeries('INDPRO', 1970);
    // Downsample monthly to annual average
    const annualIndpro = {};
    indproDataRaw.forEach(d => {
      const year = d.date.split('-')[0];
      if (!annualIndpro[year]) annualIndpro[year] = [];
      annualIndpro[year].push(d.value);
    });
    const indproData = Object.keys(annualIndpro).map(year => ({
      year: parseInt(year),
      value: parseFloat((annualIndpro[year].reduce((a, b) => a + b, 0) / annualIndpro[year].length).toFixed(1))
    })).sort((a, b) => a.year - b.year);

    console.log('Fetching CPI (CPIAUCSL) for inflation calculation...');
    const cpiData = await fetchSeries('CPIAUCSL', 1969); // fetch one year earlier to calculate YoY
    console.log('Fetching Fed Funds Rate (FEDFUNDS)...');
    const fedFundsData = await fetchSeries('FEDFUNDS', 1970);

    // Calculate YoY Inflation rate monthly
    // Inflation_t = ((CPI_t - CPI_t-12) / CPI_t-12) * 100
    const inflationMap = {};
    for (let i = 12; i < cpiData.length; i++) {
      const current = cpiData[i];
      const prev = cpiData[i - 12];
      const yoy = ((current.value - prev.value) / prev.value) * 100;
      inflationMap[current.date.slice(0, 7)] = parseFloat(yoy.toFixed(2));
    }

    // Align Fed Funds with Inflation
    const interestVsInflation = [];
    fedFundsData.forEach(ff => {
      const month = ff.date.slice(0, 7);
      const inf = inflationMap[month];
      if (inf !== undefined) {
        interestVsInflation.push({
          month,
          rate: ff.value,
          inflation: inf
        });
      }
    });

    console.log('Fetching High Yield Spread (BAMLH0A0HYM2)...');
    const spreadDataRaw = await fetchSeries('BAMLH0A0HYM2', 1997); // series starts in late 1990s
    // Downsample daily to monthly average
    const monthlySpread = {};
    spreadDataRaw.forEach(d => {
      const month = d.date.slice(0, 7);
      if (!monthlySpread[month]) monthlySpread[month] = [];
      monthlySpread[month].push(d.value);
    });
    const spreadData = Object.keys(monthlySpread).map(month => ({
      month,
      value: parseFloat((monthlySpread[month].reduce((a, b) => a + b, 0) / monthlySpread[month].length).toFixed(2))
    })).sort((a, b) => a.month.localeCompare(b.month));

    console.log('// --- GDP Data ---');
    console.log('export interface DeficitToGdpPoint { year: number; value: number; }');
    console.log('export const US_FEDERAL_DEFICIT: DeficitToGdpPoint[] = ', JSON.stringify(deficitData, null, 2) + ';');
    console.log('\nexport interface IndustrialProductionPoint { year: number; value: number; }');
    console.log('export const US_INDUSTRIAL_PRODUCTION: IndustrialProductionPoint[] = ', JSON.stringify(indproData, null, 2) + ';');

    console.log('\n// --- Capital Markets Data ---');
    console.log('export interface InterestVsInflationPoint { month: string; rate: number; inflation: number; }');
    console.log('export const FED_FUNDS_VS_INFLATION: InterestVsInflationPoint[] = ', JSON.stringify(interestVsInflation, null, 2) + ';');
    console.log('\nexport interface HighYieldSpreadPoint { month: string; value: number; }');
    console.log('export const US_HIGH_YIELD_SPREAD: HighYieldSpreadPoint[] = ', JSON.stringify(spreadData, null, 2) + ';');

  } catch (err) {
    console.error('Error running fetch:', err);
  }
}

main();
