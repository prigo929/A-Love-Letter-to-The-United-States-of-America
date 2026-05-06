export type ViewMode = "President" | "Senate" | "House" | "Governor";
export type Party = "DEM" | "REP" | "OTHER";

export interface StateData {
  president: { party: Party; flipped: boolean };
  senate: { split: boolean; party1: Party; party2: Party };
  house: { demReps: number; repReps: number; totalReps: number };
  governor: { party: Party };
}

export interface YearData {
  year: number;
  states: Record<string, StateData>;
}

function ms(p: Party, fl: boolean, ss: boolean, s1: Party, s2: Party, hd: number, hr: number, g: Party): StateData {
  return { president: { party: p, flipped: fl }, senate: { split: ss, party1: s1, party2: s2 }, house: { demReps: hd, repReps: hr, totalReps: hd + hr }, governor: { party: g } };
}

// All 50 states keyed by geo name. Covers 2000-2024 election cycles.
// Data is approximate/simplified for visualization purposes.

const ALL_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
  "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
  "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
  "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming"
];

// Base lean: deterministic per-state so the map looks realistic
// R-lean states, D-lean states based on real-world tendencies
const R_LEAN = new Set(["Alabama","Alaska","Arkansas","Idaho","Indiana","Kansas","Kentucky","Louisiana","Mississippi","Missouri","Montana","Nebraska","North Dakota","Oklahoma","South Carolina","South Dakota","Tennessee","Texas","Utah","West Virginia","Wyoming"]);
const D_LEAN = new Set(["California","Connecticut","Delaware","Hawaii","Illinois","Maryland","Massachusetts","New Jersey","New York","Oregon","Rhode Island","Vermont","Washington"]);
// Swing: Arizona, Colorado, Florida, Georgia, Iowa, Maine, Michigan, Minnesota, Nevada, New Hampshire, New Mexico, North Carolina, Ohio, Pennsylvania, Virginia, Wisconsin

type YearProfile = {
  dFlips: string[]; rFlips: string[];
  splitSenate: string[];
  govOverrides: Record<string, Party>;
};

const PROFILES: Record<number, YearProfile> = {
  2000: { dFlips: [], rFlips: ["Florida"], splitSenate: ["Florida","Maine","Virginia","Washington"], govOverrides: { "New York": "REP", "California": "DEM", "Texas": "REP", "Massachusetts": "REP" } },
  2004: { dFlips: [], rFlips: [], splitSenate: ["Florida","Maine","Nebraska","Oregon"], govOverrides: { "California": "REP", "New York": "REP", "Massachusetts": "REP", "Connecticut": "REP" } },
  2008: { dFlips: ["Florida","Ohio","Indiana","Virginia","North Carolina","Colorado","Nevada","New Mexico","Iowa"], rFlips: [], splitSenate: ["Maine","Ohio","Pennsylvania","Nevada"], govOverrides: { "California": "REP", "Florida": "REP", "Connecticut": "REP", "Vermont": "REP" } },
  2012: { dFlips: [], rFlips: ["Indiana","North Carolina"], splitSenate: ["Maine","Nevada","Ohio","Wisconsin","Pennsylvania"], govOverrides: { "New Jersey": "REP", "Virginia": "REP", "Ohio": "REP", "Michigan": "REP", "Wisconsin": "REP", "Florida": "REP" } },
  2016: { dFlips: [], rFlips: ["Florida","Ohio","Pennsylvania","Michigan","Wisconsin","Iowa"], splitSenate: ["Maine","Wisconsin","Pennsylvania","West Virginia"], govOverrides: { "Massachusetts": "REP", "Maryland": "REP", "Vermont": "REP" } },
  2020: { dFlips: ["Pennsylvania","Michigan","Wisconsin","Arizona","Georgia"], rFlips: [], splitSenate: ["Maine","Pennsylvania","West Virginia","Georgia"], govOverrides: { "Massachusetts": "REP", "Maryland": "REP", "Vermont": "REP", "New Hampshire": "REP" } },
  2024: { dFlips: [], rFlips: ["Pennsylvania","Michigan","Wisconsin","Arizona","Georgia","Nevada"], splitSenate: ["Maine","West Virginia"], govOverrides: { "Virginia": "REP", "Kentucky": "DEM", "Kansas": "DEM", "Louisiana": "REP" } },
};

function buildYear(year: number): YearData {
  const profile = PROFILES[year] || PROFILES[2020];
  const dFlipSet = new Set(profile.dFlips);
  const rFlipSet = new Set(profile.rFlips);
  const splitSet = new Set(profile.splitSenate);
  const states: Record<string, StateData> = {};

  for (const name of ALL_STATES) {
    // President
    let presParty: Party;
    if (R_LEAN.has(name)) presParty = "REP";
    else if (D_LEAN.has(name)) presParty = "DEM";
    else presParty = "DEM"; // swing defaults D

    // Apply flips
    let flipped = false;
    if (dFlipSet.has(name)) { presParty = "DEM"; flipped = true; }
    if (rFlipSet.has(name)) { presParty = "REP"; flipped = true; }

    // Senate — same base lean unless split
    const isSplit = splitSet.has(name);
    const senBase: Party = R_LEAN.has(name) ? "REP" : "DEM";
    const s1 = senBase;
    const s2 = isSplit ? (senBase === "DEM" ? "REP" : "DEM") : senBase;

    // House — proportional based on lean + some randomness from name
    const seed = name.length + name.charCodeAt(0);
    const totalReps = Math.max(1, Math.round(seed % 20) + 1);
    const demRatio = R_LEAN.has(name) ? 0.3 : D_LEAN.has(name) ? 0.7 : 0.5;
    const demReps = Math.round(totalReps * demRatio);
    const repReps = totalReps - demReps;

    // Governor — follows lean unless overridden
    let gov: Party = R_LEAN.has(name) ? "REP" : "DEM";
    if (profile.govOverrides[name]) gov = profile.govOverrides[name];

    states[name] = ms(presParty, flipped, isSplit, s1, s2, demReps, repReps, gov);
  }
  return { year, states };
}

export const ELECTORAL_HISTORY: YearData[] = [2000, 2004, 2008, 2012, 2016, 2020, 2024].map(buildYear);

export function getStateData(year: number, stateName: string): StateData {
  // Find closest year
  let closest = ELECTORAL_HISTORY[0];
  let minDist = Infinity;
  for (const yd of ELECTORAL_HISTORY) {
    const d = Math.abs(yd.year - year);
    if (d < minDist) { minDist = d; closest = yd; }
  }
  if (closest.states[stateName]) return closest.states[stateName];
  // Fallback
  const isDem = stateName.length % 2 === 0;
  return ms(isDem ? "DEM" : "REP", false, false, isDem ? "DEM" : "REP", isDem ? "DEM" : "REP", isDem ? 5 : 2, isDem ? 2 : 5, isDem ? "DEM" : "REP");
}
