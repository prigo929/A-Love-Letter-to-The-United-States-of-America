export type ViewMode = "President" | "Senate" | "House" | "Governor";
export interface StateData {
  president: { party: string; flipped: boolean };
  senate: { split: boolean; party1: string; party2: string };
  house: { demReps: number; repReps: number; totalReps: number };
  governor: { party: string };
  electoralVotes: number;
}
export interface YearData { year: number; states: Record<string, StateData>; }

// ── Party Color Registry ──────────────────────────────────────────────────
export const PARTY_COLORS: Record<string, string> = {
  DEM: "#1E5AA8", REP: "#B22234", FED: "#5B4A8A", DR: "#8B6914",
  WHIG: "#D4A017", NR: "#CC7722", PROG: "#2E8B57", DIX: "#8B4513",
  IND: "#9370DB", OTHER: "#C9A84C", "": "#1A1F3A",
};

// ── State Admission Years ─────────────────────────────────────────────────
export const STATE_ADMISSION: Record<string, number> = {
  Delaware:1787,Pennsylvania:1787,"New Jersey":1787,Georgia:1788,Connecticut:1788,
  Massachusetts:1788,Maryland:1788,"South Carolina":1788,"New Hampshire":1788,
  Virginia:1788,"New York":1788,"North Carolina":1789,"Rhode Island":1790,
  Vermont:1791,Kentucky:1792,Tennessee:1796,Ohio:1803,Louisiana:1812,Indiana:1816,
  Mississippi:1817,Illinois:1818,Alabama:1819,Maine:1820,Missouri:1821,
  Arkansas:1836,Michigan:1837,Florida:1845,Texas:1845,Iowa:1846,Wisconsin:1848,
  California:1850,Minnesota:1858,Oregon:1859,Kansas:1861,"West Virginia":1863,
  Nevada:1864,Nebraska:1867,Colorado:1876,"North Dakota":1889,"South Dakota":1889,
  Montana:1889,Washington:1889,Idaho:1890,Wyoming:1890,Utah:1896,Oklahoma:1907,
  "New Mexico":1912,Arizona:1912,Alaska:1959,Hawaii:1959,
};

// ── Electoral Eras (for timeline annotations) ─────────────────────────────
export const ERAS: { label: string; start: number; end: number; color: string }[] = [
  { label: "Founding", start: 1789, end: 1824, color: "rgba(91,74,138,0.15)" },
  { label: "Jacksonian", start: 1828, end: 1852, color: "rgba(139,105,20,0.15)" },
  { label: "Civil War", start: 1856, end: 1876, color: "rgba(178,34,52,0.12)" },
  { label: "Gilded Age", start: 1880, end: 1908, color: "rgba(201,168,76,0.08)" },
  { label: "Progressive", start: 1912, end: 1928, color: "rgba(46,139,87,0.12)" },
  { label: "New Deal", start: 1932, end: 1948, color: "rgba(30,90,168,0.12)" },
  { label: "Cold War", start: 1952, end: 1988, color: "rgba(201,168,76,0.06)" },
  { label: "Modern", start: 1992, end: 2024, color: "rgba(201,168,76,0.1)" },
];

// ── Electoral Votes (2020 apportionment, used for modern; historical approximate) ─
const EV: Record<string,number> = {
  Alabama:9,Alaska:3,Arizona:11,Arkansas:6,California:54,Colorado:10,Connecticut:7,
  Delaware:3,Florida:30,Georgia:16,Hawaii:4,Idaho:4,Illinois:19,Indiana:11,Iowa:6,
  Kansas:6,Kentucky:8,Louisiana:8,Maine:4,Maryland:10,Massachusetts:11,Michigan:15,
  Minnesota:10,Mississippi:6,Missouri:10,Montana:4,Nebraska:5,Nevada:6,
  "New Hampshire":4,"New Jersey":14,"New Mexico":5,"New York":28,"North Carolina":16,
  "North Dakota":3,Ohio:17,Oklahoma:7,Oregon:8,Pennsylvania:19,"Rhode Island":4,
  "South Carolina":9,"South Dakota":3,Tennessee:11,Texas:40,Utah:6,Vermont:3,
  Virginia:13,Washington:12,"West Virginia":4,Wisconsin:10,Wyoming:3
};
const HOUSE: Record<string,number> = {
  Alabama:7,Alaska:1,Arizona:9,Arkansas:4,California:52,Colorado:8,Connecticut:5,
  Delaware:1,Florida:28,Georgia:14,Hawaii:2,Idaho:2,Illinois:17,Indiana:9,Iowa:4,
  Kansas:4,Kentucky:6,Louisiana:6,Maine:2,Maryland:8,Massachusetts:9,Michigan:13,
  Minnesota:8,Mississippi:4,Missouri:8,Montana:2,Nebraska:3,Nevada:4,
  "New Hampshire":2,"New Jersey":12,"New Mexico":3,"New York":26,"North Carolina":14,
  "North Dakota":1,Ohio:15,Oklahoma:5,Oregon:6,Pennsylvania:17,"Rhode Island":2,
  "South Carolina":7,"South Dakota":1,Tennessee:9,Texas:38,Utah:4,Vermont:1,
  Virginia:11,Washington:10,"West Virginia":2,Wisconsin:8,Wyoming:1
};

const NAMES = Object.keys(STATE_ADMISSION);

// ── Historical Presidential Winners ───────────────────────────────────────
// Format: { year: { winner_party, states_for_winner[] } }
// States not listed go to the opponent party. Pre-admission states are excluded.
type ElectionRecord = { winner: string; loser: string; winnerStates: string[]; note?: string };

const ELECTIONS: Record<number, ElectionRecord> = {
  1789: { winner: "FED", loser: "FED", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1789), note: "Washington unopposed" },
  1792: { winner: "FED", loser: "DR", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1792), note: "Washington unopposed" },
  1796: { winner: "FED", loser: "DR", winnerStates: ["Connecticut","Delaware","Massachusetts","New Hampshire","New Jersey","New York","Rhode Island","Vermont"], note: "Adams vs Jefferson" },
  1800: { winner: "DR", loser: "FED", winnerStates: ["Georgia","Kentucky","New York","North Carolina","Pennsylvania","South Carolina","Tennessee","Virginia"], note: "Jefferson revolution" },
  1804: { winner: "DR", loser: "FED", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1804 && n !== "Connecticut" && n !== "Delaware"), note: "Jefferson landslide" },
  1808: { winner: "DR", loser: "FED", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1808 && !["Connecticut","Delaware","Massachusetts","New Hampshire","Rhode Island"].includes(n)) },
  1812: { winner: "DR", loser: "FED", winnerStates: ["Georgia","Kentucky","Louisiana","Maryland","North Carolina","Ohio","Pennsylvania","South Carolina","Tennessee","Vermont","Virginia"] },
  1816: { winner: "DR", loser: "FED", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1816 && !["Connecticut","Delaware","Massachusetts"].includes(n)) },
  1820: { winner: "DR", loser: "DR", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1820), note: "Monroe unopposed" },
  1824: { winner: "DR", loser: "DR", winnerStates: ["Alabama","Illinois","Indiana","Louisiana","Maryland","Mississippi","Missouri","New Jersey","North Carolina","Pennsylvania","South Carolina","Tennessee"], note: "J.Q. Adams chosen by House" },
  1828: { winner: "DEM", loser: "NR", winnerStates: ["Alabama","Georgia","Illinois","Indiana","Kentucky","Louisiana","Maine","Mississippi","Missouri","New Hampshire","New York","North Carolina","Ohio","Pennsylvania","South Carolina","Tennessee","Virginia"] },
  1832: { winner: "DEM", loser: "NR", winnerStates: ["Alabama","Georgia","Illinois","Indiana","Maine","Mississippi","Missouri","New Hampshire","New York","North Carolina","Ohio","Pennsylvania","Tennessee","Virginia"] },
  1836: { winner: "DEM", loser: "WHIG", winnerStates: ["Alabama","Arkansas","Connecticut","Illinois","Louisiana","Maine","Michigan","Mississippi","Missouri","New Hampshire","New York","North Carolina","Pennsylvania","Rhode Island","Virginia"] },
  1840: { winner: "WHIG", loser: "DEM", winnerStates: ["Connecticut","Delaware","Georgia","Indiana","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Mississippi","New Jersey","New York","North Carolina","Ohio","Pennsylvania","Rhode Island","Tennessee","Vermont"] },
  1844: { winner: "DEM", loser: "WHIG", winnerStates: ["Alabama","Arkansas","Georgia","Illinois","Indiana","Louisiana","Maine","Michigan","Mississippi","Missouri","New Hampshire","New York","Pennsylvania","South Carolina","Texas","Virginia"] },
  1848: { winner: "WHIG", loser: "DEM", winnerStates: ["Connecticut","Delaware","Florida","Georgia","Kentucky","Louisiana","Massachusetts","Maryland","New Jersey","New York","North Carolina","Ohio","Pennsylvania","Rhode Island","Tennessee","Vermont"] },
  1852: { winner: "DEM", loser: "WHIG", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1852 && !["Kentucky","Massachusetts","Tennessee","Vermont"].includes(n)) },
  1856: { winner: "DEM", loser: "REP", winnerStates: ["Alabama","Arkansas","California","Delaware","Florida","Georgia","Illinois","Indiana","Kentucky","Louisiana","Mississippi","Missouri","New Jersey","North Carolina","Pennsylvania","South Carolina","Tennessee","Texas","Virginia"] },
  1860: { winner: "REP", loser: "DEM", winnerStates: ["California","Connecticut","Illinois","Indiana","Iowa","Maine","Massachusetts","Michigan","Minnesota","New Hampshire","New Jersey","New York","Ohio","Oregon","Pennsylvania","Rhode Island","Vermont","Wisconsin"], note: "Lincoln; Civil War begins" },
  1864: { winner: "REP", loser: "DEM", winnerStates: ["California","Connecticut","Illinois","Indiana","Iowa","Kansas","Maine","Maryland","Massachusetts","Michigan","Minnesota","Missouri","Nevada","New Hampshire","New York","Ohio","Oregon","Pennsylvania","Rhode Island","Vermont","West Virginia","Wisconsin"], note: "Lincoln re-election" },
  1868: { winner: "REP", loser: "DEM", winnerStates: ["Alabama","Arkansas","California","Connecticut","Florida","Illinois","Indiana","Iowa","Kansas","Maine","Massachusetts","Michigan","Minnesota","Missouri","Nebraska","Nevada","New Hampshire","New York","North Carolina","Ohio","Oregon","Pennsylvania","Rhode Island","South Carolina","Tennessee","Vermont","West Virginia","Wisconsin"] },
  1872: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1872 && !["Georgia","Kentucky","Maryland","Missouri","Tennessee","Texas"].includes(n)) },
  1876: { winner: "REP", loser: "DEM", winnerStates: ["California","Colorado","Florida","Illinois","Iowa","Kansas","Louisiana","Maine","Massachusetts","Michigan","Minnesota","Nebraska","Nevada","New Hampshire","Ohio","Oregon","Pennsylvania","Rhode Island","South Carolina","Vermont","Wisconsin"], note: "Disputed; Hayes-Tilden" },
  1880: { winner: "REP", loser: "DEM", winnerStates: ["California","Colorado","Connecticut","Illinois","Indiana","Iowa","Kansas","Maine","Massachusetts","Michigan","Minnesota","Nebraska","Nevada","New Hampshire","New York","Ohio","Oregon","Pennsylvania","Rhode Island","Vermont","Wisconsin"] },
  1884: { winner: "DEM", loser: "REP", winnerStates: ["Alabama","Arkansas","Connecticut","Delaware","Florida","Georgia","Indiana","Kentucky","Louisiana","Maryland","Mississippi","Missouri","New Jersey","New York","North Carolina","South Carolina","Tennessee","Texas","Virginia","West Virginia"], note: "Cleveland" },
  1888: { winner: "REP", loser: "DEM", winnerStates: ["California","Colorado","Illinois","Indiana","Iowa","Kansas","Maine","Massachusetts","Michigan","Minnesota","Nebraska","Nevada","New Hampshire","New York","Ohio","Oregon","Pennsylvania","Rhode Island","Vermont","Wisconsin"], note: "Harrison; lost popular vote" },
  1892: { winner: "DEM", loser: "REP", winnerStates: ["Alabama","Arkansas","California","Connecticut","Delaware","Florida","Georgia","Illinois","Indiana","Kentucky","Louisiana","Maryland","Mississippi","Missouri","New Jersey","New York","North Carolina","South Carolina","Tennessee","Texas","Virginia","West Virginia","Wisconsin"], note: "Cleveland return" },
  1896: { winner: "REP", loser: "DEM", winnerStates: ["California","Connecticut","Delaware","Illinois","Indiana","Iowa","Kansas","Kentucky","Maine","Maryland","Massachusetts","Michigan","Minnesota","New Hampshire","New Jersey","New York","North Dakota","Ohio","Oregon","Pennsylvania","Rhode Island","Vermont","West Virginia","Wisconsin"], note: "McKinley vs Bryan" },
  1900: { winner: "REP", loser: "DEM", winnerStates: ["California","Connecticut","Delaware","Idaho","Illinois","Indiana","Iowa","Kansas","Maine","Maryland","Massachusetts","Michigan","Minnesota","Nebraska","New Hampshire","New Jersey","New York","North Dakota","Ohio","Oregon","Pennsylvania","Rhode Island","South Dakota","Utah","Vermont","Washington","West Virginia","Wisconsin","Wyoming"] },
  1904: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1904 && !["Alabama","Arkansas","Florida","Georgia","Kentucky","Louisiana","Maryland","Mississippi","Missouri","North Carolina","South Carolina","Tennessee","Texas","Virginia"].includes(n)) },
  1908: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1908 && !["Alabama","Arkansas","Colorado","Florida","Georgia","Kentucky","Louisiana","Maryland","Mississippi","Missouri","Nebraska","Nevada","North Carolina","Oklahoma","South Carolina","Tennessee","Texas","Virginia"].includes(n)) },
  1912: { winner: "DEM", loser: "PROG", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1912 && !["California","Michigan","Minnesota","Pennsylvania","South Dakota","Washington"].includes(n) && !["Utah","Vermont"].includes(n)), note: "Wilson; TR splits GOP" },
  1916: { winner: "DEM", loser: "REP", winnerStates: ["Alabama","Arizona","Arkansas","California","Colorado","Florida","Georgia","Idaho","Kansas","Kentucky","Louisiana","Maryland","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Mexico","North Carolina","North Dakota","Ohio","Oklahoma","South Carolina","Tennessee","Texas","Utah","Virginia","Washington","Wisconsin","Wyoming"] },
  1920: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1920 && !["Alabama","Arkansas","Florida","Georgia","Kentucky","Louisiana","Mississippi","North Carolina","South Carolina","Tennessee","Texas","Virginia"].includes(n)), note: "Harding landslide" },
  1924: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1924 && !["Alabama","Arkansas","Florida","Georgia","Louisiana","Mississippi","North Carolina","Oklahoma","South Carolina","Tennessee","Texas","Virginia","Wisconsin"].includes(n)) },
  1928: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1928 && !["Alabama","Arkansas","Georgia","Louisiana","Massachusetts","Mississippi","Rhode Island","South Carolina"].includes(n)), note: "Hoover" },
  1932: { winner: "DEM", loser: "REP", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1932 && !["Connecticut","Delaware","Maine","New Hampshire","Pennsylvania","Vermont"].includes(n)), note: "FDR; New Deal begins" },
  1936: { winner: "DEM", loser: "REP", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1936 && !["Maine","Vermont"].includes(n)), note: "FDR landslide; 46 of 48 states" },
  1940: { winner: "DEM", loser: "REP", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1940 && !["Colorado","Indiana","Iowa","Kansas","Maine","Michigan","Nebraska","North Dakota","South Dakota","Vermont"].includes(n)), note: "FDR third term" },
  1944: { winner: "DEM", loser: "REP", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1944 && !["Colorado","Indiana","Iowa","Kansas","Maine","Nebraska","North Dakota","Ohio","South Dakota","Vermont","Wisconsin","Wyoming"].includes(n)), note: "FDR fourth term" },
  1948: { winner: "DEM", loser: "REP", winnerStates: ["Arizona","Arkansas","California","Colorado","Florida","Georgia","Idaho","Illinois","Iowa","Kentucky","Massachusetts","Minnesota","Missouri","Montana","Nevada","New Mexico","North Carolina","Ohio","Oklahoma","Rhode Island","Tennessee","Texas","Utah","Virginia","Washington","West Virginia","Wisconsin","Wyoming"], note: "Truman; Dixiecrat revolt" },
  1952: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1952 && !["Alabama","Arkansas","Georgia","Kentucky","Louisiana","Mississippi","North Carolina","South Carolina","West Virginia"].includes(n)), note: "Eisenhower" },
  1956: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1956 && !["Alabama","Arkansas","Georgia","Maryland","Mississippi","Missouri","North Carolina","South Carolina"].includes(n)) },
  1960: { winner: "DEM", loser: "REP", winnerStates: ["Alabama","Arkansas","Connecticut","Delaware","Georgia","Hawaii","Illinois","Louisiana","Maryland","Massachusetts","Michigan","Minnesota","Missouri","Nevada","New Jersey","New Mexico","New York","North Carolina","Pennsylvania","Rhode Island","South Carolina","Texas","West Virginia"], note: "JFK" },
  1964: { winner: "DEM", loser: "REP", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1964 && !["Alabama","Arizona","Georgia","Louisiana","Mississippi","South Carolina"].includes(n)), note: "LBJ landslide" },
  1968: { winner: "REP", loser: "DEM", winnerStates: ["Alaska","California","Colorado","Delaware","Florida","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","South Carolina","South Dakota","Tennessee","Utah","Vermont","Virginia","Wisconsin","Wyoming"], note: "Nixon; Wallace 3rd party" },
  1972: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => n !== "Massachusetts"), note: "Nixon landslide; 49 states" },
  1976: { winner: "DEM", loser: "REP", winnerStates: ["Alabama","Arkansas","Delaware","Florida","Georgia","Hawaii","Kentucky","Louisiana","Maryland","Massachusetts","Minnesota","Mississippi","Missouri","New York","North Carolina","Ohio","Pennsylvania","Rhode Island","South Carolina","Tennessee","Texas","Virginia","West Virginia","Wisconsin"], note: "Carter" },
  1980: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => !["Georgia","Hawaii","Maryland","Massachusetts","Minnesota","Rhode Island","West Virginia"].includes(n)), note: "Reagan" },
  1984: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => n !== "Minnesota"), note: "Reagan landslide; 49 states" },
  1988: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => !["Hawaii","Iowa","Massachusetts","Minnesota","New York","Oregon","Rhode Island","Washington","West Virginia","Wisconsin"].includes(n)), note: "H.W. Bush" },
  1992: { winner: "DEM", loser: "REP", winnerStates: ["Arkansas","California","Colorado","Connecticut","Delaware","Georgia","Hawaii","Illinois","Iowa","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Missouri","Montana","Nevada","New Hampshire","New Jersey","New Mexico","New York","Ohio","Oregon","Pennsylvania","Rhode Island","Tennessee","Vermont","Washington","West Virginia","Wisconsin"], note: "Clinton; Perot 3rd party" },
  1996: { winner: "DEM", loser: "REP", winnerStates: ["Arizona","Arkansas","California","Connecticut","Delaware","Florida","Hawaii","Illinois","Iowa","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Missouri","Nevada","New Hampshire","New Jersey","New Mexico","New York","Ohio","Oregon","Pennsylvania","Rhode Island","Tennessee","Vermont","Virginia","Washington","West Virginia","Wisconsin"], note: "Clinton re-election" },
  2000: { winner: "REP", loser: "DEM", winnerStates: ["Alabama","Alaska","Arizona","Arkansas","Colorado","Florida","Georgia","Idaho","Indiana","Kansas","Kentucky","Louisiana","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","North Carolina","North Dakota","Ohio","Oklahoma","South Carolina","South Dakota","Tennessee","Texas","Utah","Virginia","West Virginia","Wyoming"], note: "Bush; disputed Florida" },
  2004: { winner: "REP", loser: "DEM", winnerStates: ["Alabama","Alaska","Arizona","Arkansas","Colorado","Florida","Georgia","Idaho","Indiana","Iowa","Kansas","Kentucky","Louisiana","Mississippi","Missouri","Montana","Nebraska","Nevada","New Mexico","North Carolina","North Dakota","Ohio","Oklahoma","South Carolina","South Dakota","Tennessee","Texas","Utah","Virginia","West Virginia","Wyoming"] },
  2008: { winner: "DEM", loser: "REP", winnerStates: ["California","Colorado","Connecticut","Delaware","Florida","Hawaii","Illinois","Indiana","Iowa","Maine","Maryland","Massachusetts","Michigan","Minnesota","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","Ohio","Oregon","Pennsylvania","Rhode Island","Vermont","Virginia","Washington","Wisconsin"], note: "Obama" },
  2012: { winner: "DEM", loser: "REP", winnerStates: ["California","Colorado","Connecticut","Delaware","Florida","Hawaii","Illinois","Iowa","Maine","Maryland","Massachusetts","Michigan","Minnesota","Nevada","New Hampshire","New Jersey","New Mexico","New York","Ohio","Oregon","Pennsylvania","Rhode Island","Vermont","Virginia","Washington","Wisconsin"] },
  2016: { winner: "REP", loser: "DEM", winnerStates: ["Alabama","Alaska","Arizona","Arkansas","Florida","Georgia","Idaho","Indiana","Iowa","Kansas","Kentucky","Louisiana","Michigan","Mississippi","Missouri","Montana","Nebraska","North Carolina","North Dakota","Ohio","Oklahoma","Pennsylvania","South Carolina","South Dakota","Tennessee","Texas","Utah","West Virginia","Wisconsin","Wyoming"], note: "Trump; lost popular vote" },
  2020: { winner: "DEM", loser: "REP", winnerStates: ["Arizona","California","Colorado","Connecticut","Delaware","Georgia","Hawaii","Illinois","Maine","Maryland","Massachusetts","Michigan","Minnesota","Nevada","New Hampshire","New Jersey","New Mexico","New York","Oregon","Pennsylvania","Rhode Island","Vermont","Virginia","Washington","Wisconsin"], note: "Biden" },
  2024: { winner: "REP", loser: "DEM", winnerStates: ["Alabama","Alaska","Arizona","Arkansas","Florida","Georgia","Idaho","Indiana","Iowa","Kansas","Kentucky","Louisiana","Michigan","Mississippi","Missouri","Montana","Nebraska","Nevada","North Carolina","North Dakota","Ohio","Oklahoma","Pennsylvania","South Carolina","South Dakota","Tennessee","Texas","Utah","West Virginia","Wisconsin","Wyoming"], note: "Trump return" },
};

// ── Independent Senate/Governor/House data ────────────────────────────────
// States with Republican governors despite being D-lean presidentially (or vice versa)
const GOV_OVERRIDES: Record<number, Record<string, string>> = {
  2024: { Massachusetts:"REP", Vermont:"REP", Virginia:"REP", Kentucky:"DEM", Kansas:"DEM", Louisiana:"REP" },
  2020: { Massachusetts:"REP", Maryland:"REP", Vermont:"REP", "New Hampshire":"REP" },
  2016: { Massachusetts:"REP", Maryland:"REP", Vermont:"REP" },
  2012: { "New Jersey":"REP", Virginia:"REP", Ohio:"REP", Michigan:"REP", Wisconsin:"REP", Florida:"REP" },
  2008: { California:"REP", Florida:"REP", Connecticut:"REP", Vermont:"REP" },
  2004: { California:"REP", "New York":"REP", Massachusetts:"REP", Connecticut:"REP" },
  2000: { "New York":"REP", Massachusetts:"REP", Texas:"REP" },
};

// States with split senate delegations (1 DEM + 1 REP)
const SPLIT_SENATE_BY_YEAR: Record<number, string[]> = {
  2024: ["Maine","West Virginia","Ohio","Montana","Wisconsin"],
  2020: ["Maine","Pennsylvania","West Virginia","Georgia","Montana"],
  2016: ["Maine","Wisconsin","Pennsylvania","West Virginia","Colorado","Indiana"],
  2012: ["Maine","Nevada","Ohio","Wisconsin","Pennsylvania","North Dakota"],
  2008: ["Maine","Ohio","Pennsylvania","Nevada","Indiana","Iowa"],
  2004: ["Florida","Maine","Nebraska","Oregon","Arkansas","Colorado"],
  2000: ["Florida","Maine","Virginia","Washington","Nevada","Nebraska"],
};

// National House DEM seat share by year (approximate)
const NATIONAL_DEM_SHARE: Record<number, number> = {
  2024: 0.49, 2020: 0.51, 2016: 0.45, 2012: 0.46, 2008: 0.59, 2004: 0.47, 2000: 0.49,
  1996: 0.47, 1992: 0.60, 1988: 0.60, 1984: 0.58, 1980: 0.56, 1976: 0.67, 1972: 0.56,
  1968: 0.57, 1964: 0.68, 1960: 0.60, 1956: 0.53, 1952: 0.49, 1948: 0.60, 1944: 0.51,
  1940: 0.61, 1936: 0.77, 1932: 0.72, 1928: 0.37, 1924: 0.42, 1920: 0.30, 1916: 0.49,
};

// Lean sets for senate/governor baseline (independent of presidential vote)
const R_BASE = new Set(["Alabama","Alaska","Arkansas","Idaho","Indiana","Kansas","Kentucky","Louisiana","Mississippi","Missouri","Montana","Nebraska","North Dakota","Oklahoma","South Carolina","South Dakota","Tennessee","Texas","Utah","West Virginia","Wyoming"]);
const D_BASE = new Set(["California","Connecticut","Delaware","Hawaii","Illinois","Maryland","Massachusetts","New Jersey","New York","Oregon","Rhode Island","Vermont","Washington"]);

function buildYear(year: number): YearData {
  const el = ELECTIONS[year];
  if (!el) return { year, states: {} };
  const prevYear = Object.keys(ELECTIONS).map(Number).sort((a,b)=>a-b).filter(y=>y<year).pop();
  const prevEl = prevYear ? ELECTIONS[prevYear] : null;
  const winSet = new Set(el.winnerStates);
  const states: Record<string, StateData> = {};
  const govOvr = GOV_OVERRIDES[year] || {};
  const splits = new Set(SPLIT_SENATE_BY_YEAR[year] || []);
  const demShare = NATIONAL_DEM_SHARE[year] || 0.5;

  for (const name of NAMES) {
    const admitted = STATE_ADMISSION[name] || 9999;
    if (admitted > year) continue;
    
    // Presidential
    const presParty = winSet.has(name) ? el.winner : el.loser;
    const prevWinSet = prevEl ? new Set(prevEl.winnerStates) : null;
    const prevParty = prevWinSet ? (prevWinSet.has(name) ? prevEl!.winner : prevEl!.loser) : null;
    const flipped = prevParty !== null && prevParty !== presParty;

    // Senate (independent baseline: state lean + split overrides)
    const senBase = year < 1856 ? presParty : R_BASE.has(name) ? "REP" : D_BASE.has(name) ? "DEM" : presParty;
    const isSplit = splits.has(name);
    const senOther = senBase === "DEM" ? "REP" : senBase === "REP" ? "DEM" : "REP";

    // Governor (independent: state lean + overrides)
    let govParty = year < 1856 ? presParty : R_BASE.has(name) ? "REP" : D_BASE.has(name) ? "DEM" : presParty;
    if (govOvr[name]) govParty = govOvr[name];

    // House (proportional based on national wave + state lean adjustment)
    const totalH = HOUSE[name] || Math.max(1, Math.floor((EV[name] || 3) - 2));
    let stateShare = demShare;
    if (R_BASE.has(name)) stateShare = Math.max(0.1, demShare - 0.2);
    else if (D_BASE.has(name)) stateShare = Math.min(0.9, demShare + 0.15);
    // Add per-state variation using name hash
    const hash = (name.charCodeAt(0) + name.length) % 10;
    stateShare = Math.max(0, Math.min(1, stateShare + (hash - 5) * 0.02));
    const dH = Math.round(totalH * stateShare);

    states[name] = {
      president: { party: presParty, flipped },
      senate: { split: isSplit, party1: senBase, party2: isSplit ? senOther : senBase },
      house: { demReps: dH, repReps: totalH - dH, totalReps: totalH },
      governor: { party: govParty },
      electoralVotes: EV[name] || 3,
    };
  }
  return { year, states };
}

export const ELECTORAL_HISTORY: YearData[] = Object.keys(ELECTIONS).map(Number).sort((a,b)=>a-b).map(buildYear);

export function getStateData(year: number, stateName: string): StateData {
  let closest = ELECTORAL_HISTORY[0];
  let minDist = Infinity;
  for (const yd of ELECTORAL_HISTORY) {
    const d = Math.abs(yd.year - year);
    if (d < minDist) { minDist = d; closest = yd; }
  }
  return closest.states[stateName] || {
    president: { party: "", flipped: false }, senate: { split: false, party1: "", party2: "" },
    house: { demReps: 0, repReps: 0, totalReps: 0 }, governor: { party: "" }, electoralVotes: 0,
  };
}

// Universal flip detection across all 4 views
export interface FlipInfo {
  presFlip: boolean;
  senFlip: boolean;       // any change in delegation composition
  govFlip: boolean;
  houseFlipDem: number;   // seats gained by DEM vs previous
  houseFlipRep: number;   // seats gained by REP vs previous
}

export function getFlipData(year: number, stateName: string): FlipInfo {
  const years = ELECTORAL_HISTORY.map(y => y.year).sort((a, b) => a - b);
  const idx = years.indexOf(year);
  const noFlip: FlipInfo = { presFlip: false, senFlip: false, govFlip: false, houseFlipDem: 0, houseFlipRep: 0 };
  if (idx <= 0) return noFlip;

  const cur = getStateData(year, stateName);
  const prev = getStateData(years[idx - 1], stateName);
  if (!cur.president.party || !prev.president.party) return noFlip;

  const presFlip = cur.president.party !== prev.president.party;
  const govFlip = cur.governor.party !== prev.governor.party;

  // Senate: compare the pair of parties (order-independent)
  const curSen = [cur.senate.party1, cur.senate.party2].sort().join(",");
  const prevSen = [prev.senate.party1, prev.senate.party2].sort().join(",");
  const senFlip = curSen !== prevSen;

  // House: compare DEM seat counts
  const demDiff = cur.house.demReps - prev.house.demReps;
  const houseFlipDem = Math.max(0, demDiff);
  const houseFlipRep = Math.max(0, -demDiff);

  return { presFlip, senFlip, govFlip, houseFlipDem, houseFlipRep };
}

export const STATE_CENTROIDS: Record<string, [number, number]> = {
  Alabama:[-86.8,32.8],Alaska:[-153.5,64.2],Arizona:[-111.7,34.3],Arkansas:[-92.4,34.9],
  California:[-119.7,37.3],Colorado:[-105.5,39.0],Connecticut:[-72.7,41.6],Delaware:[-75.5,39.0],
  Florida:[-81.7,28.7],Georgia:[-83.4,32.7],Hawaii:[-155.5,19.9],Idaho:[-114.5,44.4],
  Illinois:[-89.2,40.0],Indiana:[-86.3,39.9],Iowa:[-93.5,42.0],Kansas:[-98.3,38.5],
  Kentucky:[-85.3,37.8],Louisiana:[-91.9,31.0],Maine:[-69.2,45.4],Maryland:[-76.6,39.0],
  Massachusetts:[-71.8,42.4],Michigan:[-84.7,44.3],Minnesota:[-94.3,46.3],Mississippi:[-89.7,32.7],
  Missouri:[-92.5,38.4],Montana:[-109.6,47.0],Nebraska:[-99.8,41.5],Nevada:[-116.6,39.3],
  "New Hampshire":[-71.6,43.7],"New Jersey":[-74.7,40.1],"New Mexico":[-106.0,34.5],
  "New York":[-75.5,42.9],"North Carolina":[-79.4,35.5],"North Dakota":[-100.5,47.4],
  Ohio:[-82.8,40.4],Oklahoma:[-97.5,35.6],Oregon:[-120.6,44.0],Pennsylvania:[-77.6,41.0],
  "Rhode Island":[-71.5,41.7],"South Carolina":[-80.9,33.9],"South Dakota":[-100.2,44.4],
  Tennessee:[-86.3,35.8],Texas:[-99.0,31.5],Utah:[-111.7,39.3],Vermont:[-72.6,44.1],
  Virginia:[-78.9,37.5],Washington:[-120.7,47.4],"West Virginia":[-80.6,38.6],
  Wisconsin:[-89.8,44.6],Wyoming:[-107.6,43.0]
};

