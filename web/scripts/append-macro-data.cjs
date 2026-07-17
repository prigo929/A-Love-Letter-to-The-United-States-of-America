const fs = require('fs');
const path = require('path');

const economyDataPath = path.join(__dirname, '../lib/data/economy-data.ts');
const macroOutputPath = path.join(__dirname, 'macro-output.txt');

// Read files
let macroContent = fs.readFileSync(macroOutputPath, 'utf8');

// Filter out status messages
macroContent = macroContent.substring(macroContent.indexOf('export interface'));

// Append VC sector funding data (from PitchBook/NVCA)
const vcSectorFundingContent = `
// ─── U.S. Venture Capital Funding by Sector (2020–2025) ──────────────────────
// Source: PitchBook-NVCA Venture Monitor
// Details venture deployment shifts, highlighting the AI/ML surge starting in 2023.
export interface VcSectorFundingPoint {
  year: number;
  software: number;    // USD Billions
  ai: number;          // USD Billions
  healthcare: number;  // USD Billions
  other: number;       // USD Billions
}

export const VC_SECTOR_FUNDING: VcSectorFundingPoint[] = [
  { year: 2020, software: 58.0, ai: 18.0, healthcare: 32.0, other: 22.0 },
  { year: 2021, software: 120.0, ai: 34.0, healthcare: 55.0, other: 39.0 },
  { year: 2022, software: 85.0, ai: 28.0, healthcare: 42.0, other: 33.0 },
  { year: 2023, software: 50.0, ai: 48.0, healthcare: 36.0, other: 26.0 },
  { year: 2024, software: 42.0, ai: 65.0, healthcare: 38.0, other: 28.0 },
  { year: 2025, software: 45.0, ai: 88.0, healthcare: 40.0, other: 32.0 }
];
`;

// Append to economy-data.ts
let currentData = fs.readFileSync(economyDataPath, 'utf8');
currentData = currentData.trim() + '\n\n' + macroContent + '\n\n' + vcSectorFundingContent;

fs.writeFileSync(economyDataPath, currentData, 'utf8');
console.log('Successfully appended macro datasets and VC sector data to economy-data.ts!');
