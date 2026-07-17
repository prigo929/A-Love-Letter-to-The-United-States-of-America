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
    console.log('Fetching EXPGS (Exports) and IMPGS (Imports)...');
    const exportsRaw = await fetchSeries('EXPGS', 1970);
    const importsRaw = await fetchSeries('IMPGS', 1970);

    const importsMap = {};
    importsRaw.forEach(d => {
      importsMap[d.date] = d.value;
    });

    const exportsImportsData = [];
    exportsRaw.forEach(exp => {
      const imp = importsMap[exp.date];
      if (imp !== undefined) {
        exportsImportsData.push({
          date: exp.date,
          exports: exp.value,
          imports: imp
        });
      }
    });

    console.log('Fetching TNWBSHNO (Household Net Worth)...');
    const netWorthRaw = await fetchSeries('TNWBSHNO', 1970);
    const netWorthData = netWorthRaw.map(d => ({
      date: d.date,
      value: parseFloat((d.value / 1000000).toFixed(2)) // convert millions to trillions
    }));

    // Output JS
    console.log('// --- GDP Batch 3 Data ---');
    console.log('export interface ExportsImportsPoint { date: string; exports: number; imports: number; }');
    console.log('export const US_EXPORTS_VS_IMPORTS: ExportsImportsPoint[] = ', JSON.stringify(exportsImportsData, null, 2) + ';');

    console.log('\n// --- Capital Markets Batch 3 Data ---');
    console.log('export interface HouseholdNetWorthPoint { date: string; value: number; }');
    console.log('export const US_HOUSEHOLD_NET_WORTH: HouseholdNetWorthPoint[] = ', JSON.stringify(netWorthData, null, 2) + ';');

  } catch (err) {
    console.error('Error running fetch:', err);
  }
}

main();
