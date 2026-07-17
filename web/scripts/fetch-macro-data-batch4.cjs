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
    console.log('Fetching PSAVERT (Personal Savings Rate)...');
    const savingsRaw = await fetchSeries('PSAVERT', 1970);
    const savingsData = savingsRaw.map(d => ({
      month: d.date.slice(0, 7),
      value: d.value
    }));

    console.log('Fetching AAA and BAA (Moody Corporate Yields)...');
    const aaaRaw = await fetchSeries('AAA', 1970);
    const baaRaw = await fetchSeries('BAA', 1970);

    const baaMap = {};
    baaRaw.forEach(d => {
      baaMap[d.date] = d.value;
    });

    const yieldsData = [];
    aaaRaw.forEach(aaa => {
      const baa = baaMap[aaa.date];
      if (baa !== undefined) {
        yieldsData.push({
          month: aaa.date.slice(0, 7),
          aaa: aaa.value,
          baa: baa
        });
      }
    });

    console.log('// --- GDP Batch 4 Data ---');
    console.log('export interface SavingsRatePoint { month: string; value: number; }');
    console.log('export const US_SAVINGS_RATE: SavingsRatePoint[] = ', JSON.stringify(savingsData, null, 2) + ';');

    console.log('\n// --- Capital Markets Batch 4 Data ---');
    console.log('export interface CorporateYieldPoint { month: string; aaa: number; baa: number; }');
    console.log('export const US_CORPORATE_YIELDS: CorporateYieldPoint[] = ', JSON.stringify(yieldsData, null, 2) + ';');

  } catch (err) {
    console.error('Error running fetch:', err);
  }
}

main();
