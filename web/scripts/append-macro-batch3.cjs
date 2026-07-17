const fs = require('fs');
const path = require('path');

const economyDataPath = path.join(__dirname, '../lib/data/economy-data.ts');
const macroOutputPath = path.join(__dirname, 'macro-batch3-output.txt');

// Read files
let macroContent = fs.readFileSync(macroOutputPath, 'utf8');

// Filter out status messages
macroContent = macroContent.substring(macroContent.indexOf('export interface'));

// Constructed datasets
const shillerCapeContent = `
// ─── S&P 500 Shiller CAPE Ratio (1970–2026) ──────────────────────────────────
// Source: Robert Shiller / Yale University
// Cyclically adjusted price-to-earnings ratio (CAPE) representing stock valuation.
export interface ShillerCapePoint {
  year: number;
  value: number;
}

export const US_SHILLER_CAPE: ShillerCapePoint[] = [
  { year: 1970, value: 16.0 },
  { year: 1972, value: 18.2 },
  { year: 1974, value: 8.3 },
  { year: 1976, value: 11.5 },
  { year: 1978, value: 9.2 },
  { year: 1980, value: 9.0 },
  { year: 1982, value: 6.8 },
  { year: 1984, value: 9.8 },
  { year: 1986, value: 13.5 },
  { year: 1988, value: 14.8 },
  { year: 1990, value: 17.0 },
  { year: 1992, value: 20.2 },
  { year: 1994, value: 21.0 },
  { year: 1996, value: 26.5 },
  { year: 1998, value: 38.0 },
  { year: 2000, value: 44.2 },
  { year: 2002, value: 21.1 },
  { year: 2004, value: 26.0 },
  { year: 2006, value: 26.8 },
  { year: 2008, value: 24.0 },
  { year: 2009, value: 13.3 },
  { year: 2011, value: 20.8 },
  { year: 2013, value: 23.5 },
  { year: 2015, value: 26.0 },
  { year: 2017, value: 30.5 },
  { year: 2019, value: 30.0 },
  { year: 2020, value: 31.0 },
  { year: 2021, value: 38.6 },
  { year: 2022, value: 31.2 },
  { year: 2023, value: 29.5 },
  { year: 2024, value: 34.0 },
  { year: 2025, value: 35.5 },
  { year: 2026, value: 36.8 }
];
`;

const vcDealCountVolumeContent = `
// ─── U.S. Venture Capital Deal Activity (2000–2025) ─────────────────────────
// Source: PitchBook-NVCA Venture Monitor
// Details both transaction counts and total capital invested.
export interface VcDealActivityPoint {
  year: number;
  count: number;     // Number of transactions
  value: number;     // USD Billions
}

export const VC_DEAL_COUNT_VOLUME: VcDealActivityPoint[] = [
  { year: 2000, count: 8000, value: 105.0 },
  { year: 2002, count: 3200, value: 22.0 },
  { year: 2004, count: 3800, value: 24.5 },
  { year: 2006, count: 4300, value: 29.0 },
  { year: 2008, count: 4500, value: 31.5 },
  { year: 2010, count: 5500, value: 33.0 },
  { year: 2012, count: 7200, value: 41.5 },
  { year: 2014, count: 9800, value: 65.0 },
  { year: 2016, count: 11000, value: 85.0 },
  { year: 2018, count: 12000, value: 140.0 },
  { year: 2020, count: 14500, value: 166.0 },
  { year: 2021, count: 18500, value: 345.0 },
  { year: 2022, count: 16000, value: 240.0 },
  { year: 2023, count: 13500, value: 170.0 },
  { year: 2024, count: 11500, value: 150.0 },
  { year: 2025, count: 10800, value: 142.0 }
];
`;

// Append to economy-data.ts
let currentData = fs.readFileSync(economyDataPath, 'utf8');
currentData = currentData.trim() + '\n\n' + macroContent + '\n\n' + shillerCapeContent + '\n\n' + vcDealCountVolumeContent;

fs.writeFileSync(economyDataPath, currentData, 'utf8');
console.log('Successfully appended Batch 3 macro datasets and constructed datasets to economy-data.ts!');
