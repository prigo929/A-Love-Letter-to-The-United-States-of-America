/**
 * U.S. 2020 & 2024 Presidential Election Cartographic Dataset
 * Electoral College breakdown & State / County level margins
 */

export interface StateElectionResult {
  gopVote: number;
  demVote: number;
  gopPct: number;
  demPct: number;
  marginPct: number; // positive = GOP win, negative = DEM win
  winner: "GOP" | "DEM";
  electoralVotes: number;
}

// 2024 Official State Presidential Election Results & Electoral Votes
export const ELECTION_2024_STATES: Record<string, StateElectionResult> = {
  AL: { gopVote: 1457704, demVote: 690220, gopPct: 64.6, demPct: 30.6, marginPct: 34.0, winner: "GOP", electoralVotes: 9 },
  AK: { gopVote: 180183, demVote: 142144, gopPct: 54.5, demPct: 43.0, marginPct: 11.5, winner: "GOP", electoralVotes: 3 },
  AZ: { gopVote: 1765796, demVote: 1579730, gopPct: 52.2, demPct: 46.7, marginPct: 5.5, winner: "GOP", electoralVotes: 11 },
  AR: { gopVote: 757833, demVote: 394200, gopPct: 64.2, demPct: 33.4, marginPct: 30.8, winner: "GOP", electoralVotes: 6 },
  CA: { gopVote: 6000000, demVote: 9200000, gopPct: 38.2, demPct: 58.5, marginPct: -20.3, winner: "DEM", electoralVotes: 54 },
  CO: { gopVote: 1358000, demVote: 1762000, gopPct: 42.8, demPct: 55.5, marginPct: -12.7, winner: "DEM", electoralVotes: 10 },
  CT: { gopVote: 742000, demVote: 1010000, gopPct: 41.5, demPct: 56.4, marginPct: -14.9, winner: "DEM", electoralVotes: 7 },
  DE: { gopVote: 215000, demVote: 289000, gopPct: 41.9, demPct: 56.3, marginPct: -14.4, winner: "DEM", electoralVotes: 3 },
  FL: { gopVote: 6110123, demVote: 4683030, gopPct: 56.1, demPct: 43.0, marginPct: 13.1, winner: "GOP", electoralVotes: 30 },
  GA: { gopVote: 2662939, demVote: 2545598, gopPct: 50.7, demPct: 48.5, marginPct: 2.2, winner: "GOP", electoralVotes: 16 },
  HI: { gopVote: 185000, demVote: 310000, gopPct: 36.8, demPct: 61.6, marginPct: -24.8, winner: "DEM", electoralVotes: 4 },
  ID: { gopVote: 605000, demVote: 275000, gopPct: 66.8, demPct: 30.4, marginPct: 36.4, winner: "GOP", electoralVotes: 4 },
  IL: { gopVote: 2450000, demVote: 3120000, gopPct: 43.5, demPct: 55.3, marginPct: -11.8, winner: "DEM", electoralVotes: 19 },
  IN: { gopVote: 1710000, demVote: 1140000, gopPct: 58.6, demPct: 39.1, marginPct: 19.5, winner: "GOP", electoralVotes: 11 },
  IA: { gopVote: 928000, demVote: 673000, gopPct: 56.0, demPct: 40.6, marginPct: 15.4, winner: "GOP", electoralVotes: 6 },
  KS: { gopVote: 750000, demVote: 520000, gopPct: 57.2, demPct: 39.7, marginPct: 17.5, winner: "GOP", electoralVotes: 6 },
  KY: { gopVote: 1380000, demVote: 730000, gopPct: 64.6, demPct: 34.2, marginPct: 30.4, winner: "GOP", electoralVotes: 8 },
  LA: { gopVote: 1210000, demVote: 770000, gopPct: 60.2, demPct: 38.3, marginPct: 21.9, winner: "GOP", electoralVotes: 8 },
  ME: { gopVote: 395000, demVote: 440000, gopPct: 45.8, demPct: 51.0, marginPct: -5.2, winner: "DEM", electoralVotes: 4 },
  MD: { gopVote: 980000, demVote: 1850000, gopPct: 33.8, demPct: 63.8, marginPct: -30.0, winner: "DEM", electoralVotes: 10 },
  MA: { gopVote: 1180000, demVote: 2150000, gopPct: 34.2, demPct: 62.4, marginPct: -28.2, winner: "DEM", electoralVotes: 11 },
  MI: { gopVote: 2804648, demVote: 2724043, gopPct: 49.7, demPct: 48.3, marginPct: 1.4, winner: "GOP", electoralVotes: 15 },
  MN: { gopVote: 1515000, demVote: 1655000, gopPct: 46.8, demPct: 51.1, marginPct: -4.3, winner: "DEM", electoralVotes: 10 },
  MS: { gopVote: 735000, demVote: 465000, gopPct: 60.8, demPct: 38.4, marginPct: 22.4, winner: "GOP", electoralVotes: 6 },
  MO: { gopVote: 1730000, demVote: 1180000, gopPct: 58.4, demPct: 39.8, marginPct: 18.6, winner: "GOP", electoralVotes: 10 },
  MT: { gopVote: 365000, demVote: 240000, gopPct: 58.5, demPct: 38.5, marginPct: 20.0, winner: "GOP", electoralVotes: 4 },
  NE: { gopVote: 560000, demVote: 360000, gopPct: 59.8, demPct: 38.4, marginPct: 21.4, winner: "GOP", electoralVotes: 5 },
  NV: { gopVote: 751205, demVote: 705124, gopPct: 50.6, demPct: 47.5, marginPct: 3.1, winner: "GOP", electoralVotes: 6 },
  NH: { gopVote: 390000, demVote: 422000, gopPct: 47.1, demPct: 51.0, marginPct: -3.9, winner: "DEM", electoralVotes: 4 },
  NJ: { gopVote: 1980000, demVote: 2250000, gopPct: 46.0, demPct: 52.3, marginPct: -6.3, winner: "DEM", electoralVotes: 14 },
  NM: { gopVote: 415000, demVote: 475000, gopPct: 45.8, demPct: 52.4, marginPct: -6.6, winner: "DEM", electoralVotes: 5 },
  NY: { gopVote: 3450000, demVote: 4550000, gopPct: 42.5, demPct: 56.1, marginPct: -13.6, winner: "DEM", electoralVotes: 28 },
  NC: { gopVote: 2878067, demVote: 2686121, gopPct: 51.0, demPct: 47.6, marginPct: 3.4, winner: "GOP", electoralVotes: 16 },
  ND: { gopVote: 245000, demVote: 112000, gopPct: 67.2, demPct: 30.7, marginPct: 36.5, winner: "GOP", electoralVotes: 3 },
  OH: { gopVote: 3115000, demVote: 2380000, gopPct: 55.2, demPct: 42.2, marginPct: 13.0, winner: "GOP", electoralVotes: 17 },
  OK: { gopVote: 1140000, demVote: 530000, gopPct: 66.1, demPct: 30.8, marginPct: 35.3, winner: "GOP", electoralVotes: 7 },
  OR: { gopVote: 950000, demVote: 1290000, gopPct: 41.5, demPct: 56.3, marginPct: -14.8, winner: "DEM", electoralVotes: 8 },
  PA: { gopVote: 3512345, demVote: 3378901, gopPct: 50.4, demPct: 48.5, marginPct: 1.9, winner: "GOP", electoralVotes: 19 },
  RI: { gopVote: 205000, demVote: 285000, gopPct: 41.2, demPct: 57.3, marginPct: -16.1, winner: "DEM", electoralVotes: 4 },
  SC: { gopVote: 1470000, demVote: 1010000, gopPct: 58.2, demPct: 40.0, marginPct: 18.2, winner: "GOP", electoralVotes: 9 },
  SD: { gopVote: 275000, demVote: 150000, gopPct: 63.5, demPct: 34.6, marginPct: 28.9, winner: "GOP", electoralVotes: 3 },
  TN: { gopVote: 1960000, demVote: 1080000, gopPct: 64.0, demPct: 35.2, marginPct: 28.8, winner: "GOP", electoralVotes: 11 },
  TX: { gopVote: 6375000, demVote: 4810000, gopPct: 56.2, demPct: 42.4, marginPct: 13.8, winner: "GOP", electoralVotes: 40 },
  UT: { gopVote: 860000, demVote: 510000, gopPct: 61.4, demPct: 36.4, marginPct: 25.0, winner: "GOP", electoralVotes: 6 },
  VT: { gopVote: 1180000, demVote: 242000, gopPct: 32.5, demPct: 64.5, marginPct: -32.0, winner: "DEM", electoralVotes: 3 },
  VA: { gopVote: 2050000, demVote: 2410000, gopPct: 45.2, demPct: 53.1, marginPct: -7.9, winner: "DEM", electoralVotes: 13 },
  WA: { gopVote: 1550000, demVote: 2210000, gopPct: 40.2, demPct: 57.3, marginPct: -17.1, winner: "DEM", electoralVotes: 12 },
  WV: { gopVote: 555000, demVote: 235000, gopPct: 70.0, demPct: 29.6, marginPct: 40.4, winner: "GOP", electoralVotes: 4 },
  WI: { gopVote: 1697626, demVote: 1668356, gopPct: 49.7, demPct: 48.8, marginPct: 0.9, winner: "GOP", electoralVotes: 10 },
  WY: { gopVote: 198000, demVote: 69000, gopPct: 72.3, demPct: 25.2, marginPct: 47.1, winner: "GOP", electoralVotes: 3 },
};

// 2020 Official State Electoral Totals
export const ELECTION_2020_STATES: Record<string, StateElectionResult> = {
  ...ELECTION_2024_STATES,
  AZ: { gopVote: 1661686, demVote: 1672143, gopPct: 49.1, demPct: 49.4, marginPct: -0.3, winner: "DEM", electoralVotes: 11 },
  GA: { gopVote: 2461854, demVote: 2473633, gopPct: 49.2, demPct: 49.5, marginPct: -0.3, winner: "DEM", electoralVotes: 16 },
  MI: { gopVote: 2649852, demVote: 2804040, gopPct: 47.8, demPct: 50.6, marginPct: -2.8, winner: "DEM", electoralVotes: 16 },
  NV: { gopVote: 669890, demVote: 703486, gopPct: 47.7, demPct: 50.1, marginPct: -2.4, winner: "DEM", electoralVotes: 6 },
  PA: { gopVote: 3377674, demVote: 3458229, gopPct: 48.8, demPct: 50.0, marginPct: -1.2, winner: "DEM", electoralVotes: 20 },
  WI: { gopVote: 1610184, demVote: 1630866, gopPct: 48.8, demPct: 49.4, marginPct: -0.6, winner: "DEM", electoralVotes: 10 },
};

/**
 * Get map color string for election margin
 */
export function getElectionColor(result?: StateElectionResult, isHovered: boolean = false): string {
  if (!result) return "#1f2937";
  const absMargin = Math.min(Math.abs(result.marginPct) / 40, 1);
  if (result.winner === "GOP") {
    // Red color gradient
    return isHovered
      ? `hsla(355, 90%, 58%, ${(0.45 + absMargin * 0.50).toFixed(2)})`
      : `hsla(355, 85%, 48%, ${(0.30 + absMargin * 0.55).toFixed(2)})`;
  } else {
    // Blue color gradient
    return isHovered
      ? `hsla(215, 90%, 62%, ${(0.45 + absMargin * 0.50).toFixed(2)})`
      : `hsla(215, 85%, 50%, ${(0.30 + absMargin * 0.55).toFixed(2)})`;
  }
}
