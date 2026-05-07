export type ViewMode = "President" | "Senate" | "House" | "Governor";
export interface StateData {
  president: { party: string; candidate?: string; flipped: boolean };
  senate: { split: boolean; party1: string; party2: string; active: boolean };
  house: { demReps: number; repReps: number; totalReps: number };
  governor: { party: string; active: boolean };
  electoralVotes: number;
}
export interface YearData {
  year: number;
  states: Record<string, StateData>;
  demCandidate: string;
  repCandidate: string;
  demPopVote: number;
  repPopVote: number;
  totalPopVote: number;
  thirdPartyCandidates?: Record<string, string>;
  unopposed?: boolean;
}

// ── Party Color Registry ──────────────────────────────────────────────────
export const PARTY_COLORS: Record<string, string> = {
  DEM: "#4169E1", REP: "#E64141", FED: "#8B4513", DR: "#2E8B57", WHIG: "#DAA520",
  PROG: "#9370DB", DIX: "#FF8C00", AI: "#CD853F", BM: "#8A2BE2", SR: "#D2691E", NR: "#A0522D",
  IND: "#9932CC", VACANT: "#1A1A24", AM: "#8FBC8F", NULL: "#2F4F4F", KN: "#B22222", CU: "#4682B4",
  SDEM: "#8B0000", POP: "#FFD700",
  "DR-J": "#2E8B57", "DR-A": "#4682B4", "DR-C": "#8B4513", "DR-CL": "#DAA520"
};

export const PARTY_FULL_NAMES: Record<string, string> = {
  DEM: "Democrat", REP: "Republican", FED: "Federalist", DR: "Democratic-Republican", WHIG: "Whig",
  PROG: "Progressive", DIX: "Dixiecrat", AI: "American Independent", BM: "Bull Moose", SR: "States' Rights", NR: "National Republican",
  IND: "Independent", VACANT: "Vacant", AM: "Anti-Masonic", NULL: "Nullifier", KN: "Know Nothing", CU: "Constitutional Union",
  SDEM: "Southern Democrat", POP: "Populist"
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
  "District of Columbia":1961,
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
  Virginia:13,Washington:12,"West Virginia":4,Wisconsin:10,Wyoming:3,
  "District of Columbia":3
};
const HOUSE: Record<string,number> = {
  Alabama:7,Alaska:1,Arizona:9,Arkansas:4,California:52,Colorado:8,Connecticut:5,
  Delaware:1,Florida:28,Georgia:14,Hawaii:2,Idaho:2,Illinois:17,Indiana:9,Iowa:4,
  Kansas:4,Kentucky:6,Louisiana:6,Maine:2,Maryland:8,Massachusetts:9,Michigan:13,
  Minnesota:8,Mississippi:4,Missouri:8,Montana:2,Nebraska:3,Nevada:4,
  "New Hampshire":2,"New Jersey":12,"New Mexico":3,"New York":26,"North Carolina":14,
  "North Dakota":1,Ohio:15,Oklahoma:5,Oregon:6,Pennsylvania:17,"Rhode Island":2,
  "South Carolina":7,"South Dakota":1,Tennessee:9,Texas:38,Utah:4,Vermont:1,
  Virginia:11,Washington:10,"West Virginia":2,Wisconsin:8,Wyoming:1,
  "District of Columbia":0
};

const NAMES = Object.keys(STATE_ADMISSION);

// ── Historical Presidential Winners ───────────────────────────────────────
// Format: { year: { winner_party, states_for_winner[] } }
// States not listed go to the opponent party. Pre-admission states are excluded.
type ElectionRecord = { winner: string; loser: string; winnerStates: string[]; demCandidate?: string; repCandidate?: string; anomalies?: Record<string, string>; thirdPartyCandidates?: Record<string, string>; note?: string; unopposed?: boolean };

const ELECTIONS: Record<number, ElectionRecord> = {
  1788: { winner: "FED", loser: "NONE", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1789), unopposed: true, note: "Washington unopposed" },
  1792: { winner: "FED", loser: "NONE", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1792), unopposed: true, note: "Washington unopposed" },
  1796: { winner: "FED", loser: "DR", winnerStates: ["Connecticut","Delaware","Massachusetts","New Hampshire","New Jersey","New York","Rhode Island","Vermont"], note: "Adams vs Jefferson" },
  1800: { winner: "DR", loser: "FED", winnerStates: ["Georgia","Kentucky","New York","North Carolina","Pennsylvania","South Carolina","Tennessee","Virginia"], note: "Jefferson revolution" },
  1804: { winner: "DR", loser: "FED", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1804 && n !== "Connecticut" && n !== "Delaware"), note: "Jefferson landslide" },
  1808: { winner: "DR", loser: "FED", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1808 && !["Connecticut","Delaware","Massachusetts","New Hampshire","Rhode Island"].includes(n)) },
  1812: { winner: "DR", loser: "FED", winnerStates: ["Georgia","Kentucky","Louisiana","Maryland","North Carolina","Ohio","Pennsylvania","South Carolina","Tennessee","Vermont","Virginia"] },
  1816: { winner: "DR", loser: "FED", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1816 && !["Connecticut","Delaware","Massachusetts"].includes(n)) },
  1820: { winner: "DR", loser: "DR", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1820), note: "Monroe unopposed" },
  1824: { 
    winner: "DR-J", loser: "DR-A", 
    winnerStates: ["Alabama","Illinois","Indiana","Louisiana","Maryland","Mississippi","Missouri","New Jersey","North Carolina","Pennsylvania","South Carolina","Tennessee"],
    anomalies: { "Maine": "DR-A", "Massachusetts": "DR-A", "New Hampshire": "DR-A", "New York": "DR-A", "Rhode Island": "DR-A", "Vermont": "DR-A", "Georgia": "DR-C", "Virginia": "DR-C", "Kentucky": "DR-CL", "Ohio": "DR-CL" },
    thirdPartyCandidates: { "DR-J": "Andrew Jackson", "DR-A": "John Q. Adams", "DR-C": "William Crawford", "DR-CL": "Henry Clay" },
    note: "Jackson won popular/electoral plurality; House chose J.Q. Adams" 
  },
  1828: { winner: "DEM", loser: "NR", winnerStates: ["Alabama","Georgia","Illinois","Indiana","Kentucky","Louisiana","Maine","Mississippi","Missouri","New Hampshire","New York","North Carolina","Ohio","Pennsylvania","South Carolina","Tennessee","Virginia"] },
  1832: { winner: "DEM", loser: "NR", winnerStates: ["Alabama","Georgia","Illinois","Indiana","Maine","Mississippi","Missouri","New Hampshire","New York","North Carolina","Ohio","Pennsylvania","Tennessee","Virginia"], anomalies: { "Vermont": "AM", "South Carolina": "NULL" }, thirdPartyCandidates: { "AM": "William Wirt", "NULL": "John Floyd" } },
  1836: { winner: "DEM", loser: "WHIG", winnerStates: ["Alabama","Arkansas","Connecticut","Illinois","Louisiana","Maine","Michigan","Mississippi","Missouri","New Hampshire","New York","North Carolina","Pennsylvania","Rhode Island","Virginia"] },
  1840: { winner: "WHIG", loser: "DEM", winnerStates: ["Connecticut","Delaware","Georgia","Indiana","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","New Jersey","New York","North Carolina","Ohio","Pennsylvania","Rhode Island","Tennessee","Vermont"] },
  1844: { winner: "DEM", loser: "WHIG", winnerStates: ["Alabama","Arkansas","Georgia","Illinois","Indiana","Louisiana","Maine","Michigan","Mississippi","Missouri","New Hampshire","New York","Pennsylvania","South Carolina","Texas","Virginia"] },
  1848: { winner: "WHIG", loser: "DEM", winnerStates: ["Connecticut","Delaware","Florida","Kentucky","Louisiana","Massachusetts","Maryland","New Jersey","New York","North Carolina","Ohio","Pennsylvania","Rhode Island","Tennessee","Vermont"] },
  1852: { winner: "DEM", loser: "WHIG", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1852 && !["Kentucky","Massachusetts","Tennessee","Vermont"].includes(n)) },
  1856: { winner: "DEM", loser: "REP", winnerStates: ["Alabama","Arkansas","California","Delaware","Florida","Georgia","Illinois","Indiana","Kentucky","Louisiana","Mississippi","Missouri","New Jersey","North Carolina","Pennsylvania","South Carolina","Tennessee","Texas","Virginia"], anomalies: { "Maryland": "KN" }, thirdPartyCandidates: { "KN": "Millard Fillmore" } },
  1860: { winner: "REP", loser: "SDEM", winnerStates: ["California","Connecticut","Illinois","Indiana","Iowa","Maine","Massachusetts","Michigan","Minnesota","New Hampshire","New Jersey","New York","Ohio","Oregon","Pennsylvania","Rhode Island","Vermont","Wisconsin"], anomalies: { "Kentucky": "CU", "Tennessee": "CU", "Virginia": "CU", "Alabama": "SDEM", "Arkansas": "SDEM", "Delaware": "SDEM", "Florida": "SDEM", "Georgia": "SDEM", "Louisiana": "SDEM", "Maryland": "SDEM", "Mississippi": "SDEM", "North Carolina": "SDEM", "South Carolina": "SDEM", "Texas": "SDEM" }, thirdPartyCandidates: { "CU": "John Bell", "SDEM": "John Breckinridge" }, note: "Lincoln; Civil War begins" },
  1864: { winner: "REP", loser: "DEM", winnerStates: ["California","Connecticut","Illinois","Indiana","Iowa","Kansas","Maine","Maryland","Massachusetts","Michigan","Minnesota","Missouri","Nevada","New Hampshire","New York","Ohio","Oregon","Pennsylvania","Rhode Island","Vermont","West Virginia","Wisconsin"], note: "Lincoln re-election" },
  1868: { winner: "REP", loser: "DEM", winnerStates: ["Alabama","Arkansas","California","Connecticut","Florida","Illinois","Indiana","Iowa","Kansas","Maine","Massachusetts","Michigan","Minnesota","Missouri","Nebraska","Nevada","New Hampshire","New York","North Carolina","Ohio","Oregon","Pennsylvania","Rhode Island","South Carolina","Tennessee","Vermont","West Virginia","Wisconsin"] },
  1872: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1872 && !["Georgia","Kentucky","Maryland","Missouri","Tennessee","Texas"].includes(n)) },
  1876: { winner: "REP", loser: "DEM", winnerStates: ["California","Colorado","Florida","Illinois","Iowa","Kansas","Louisiana","Maine","Massachusetts","Michigan","Minnesota","Nebraska","Nevada","New Hampshire","Ohio","Oregon","Pennsylvania","Rhode Island","South Carolina","Vermont","Wisconsin"], note: "Disputed; Hayes-Tilden" },
  1880: { winner: "REP", loser: "DEM", winnerStates: ["California","Colorado","Connecticut","Illinois","Indiana","Iowa","Kansas","Maine","Massachusetts","Michigan","Minnesota","Nebraska","Nevada","New Hampshire","New York","Ohio","Oregon","Pennsylvania","Rhode Island","Vermont","Wisconsin"] },
  1884: { winner: "DEM", loser: "REP", winnerStates: ["Alabama","Arkansas","Connecticut","Delaware","Florida","Georgia","Indiana","Kentucky","Louisiana","Maryland","Mississippi","Missouri","New Jersey","New York","North Carolina","South Carolina","Tennessee","Texas","Virginia","West Virginia"], note: "Cleveland" },
  1888: { winner: "REP", loser: "DEM", winnerStates: ["California","Colorado","Illinois","Indiana","Iowa","Kansas","Maine","Massachusetts","Michigan","Minnesota","Nebraska","Nevada","New Hampshire","New York","Ohio","Oregon","Pennsylvania","Rhode Island","Vermont","Wisconsin"], note: "Harrison; lost popular vote" },
  1892: { winner: "DEM", loser: "REP", winnerStates: ["Alabama","Arkansas","California","Connecticut","Delaware","Florida","Georgia","Illinois","Indiana","Kentucky","Louisiana","Maryland","Mississippi","Missouri","New Jersey","New York","North Carolina","South Carolina","Tennessee","Texas","Virginia","West Virginia","Wisconsin"], anomalies: { "Colorado": "POP", "Idaho": "POP", "Kansas": "POP", "Nevada": "POP" }, thirdPartyCandidates: { "POP": "James Weaver" }, note: "Cleveland return" },
  1896: { winner: "REP", loser: "DEM", winnerStates: ["California","Connecticut","Delaware","Illinois","Indiana","Iowa","Kansas","Kentucky","Maine","Maryland","Massachusetts","Michigan","Minnesota","New Hampshire","New Jersey","New York","North Dakota","Ohio","Oregon","Pennsylvania","Rhode Island","Vermont","West Virginia","Wisconsin"], note: "McKinley vs Bryan" },
  1900: { winner: "REP", loser: "DEM", winnerStates: ["California","Connecticut","Delaware","Idaho","Illinois","Indiana","Iowa","Kansas","Maine","Maryland","Massachusetts","Michigan","Minnesota","Nebraska","New Hampshire","New Jersey","New York","North Dakota","Ohio","Oregon","Pennsylvania","Rhode Island","South Dakota","Utah","Vermont","Washington","West Virginia","Wisconsin","Wyoming"] },
  1904: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1904 && !["Alabama","Arkansas","Florida","Georgia","Kentucky","Louisiana","Maryland","Mississippi","Missouri","North Carolina","South Carolina","Tennessee","Texas","Virginia"].includes(n)) },
  1908: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1908 && !["Alabama","Arkansas","Colorado","Florida","Georgia","Kentucky","Louisiana","Maryland","Mississippi","Missouri","Nebraska","Nevada","North Carolina","Oklahoma","South Carolina","Tennessee","Texas","Virginia"].includes(n)) },
  1912: { winner: "DEM", loser: "PROG", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1912 && !["California","Michigan","Minnesota","Pennsylvania","South Dakota","Washington","Utah","Vermont"].includes(n)), anomalies: { "California": "PROG", "Michigan": "PROG", "Minnesota": "PROG", "Pennsylvania": "PROG", "South Dakota": "PROG", "Washington": "PROG", "Utah": "REP", "Vermont": "REP" }, thirdPartyCandidates: { "PROG": "Theodore Roosevelt" }, note: "Wilson; TR splits GOP" },
  1916: { winner: "DEM", loser: "REP", winnerStates: ["Alabama","Arizona","Arkansas","California","Colorado","Florida","Georgia","Idaho","Kansas","Kentucky","Louisiana","Maryland","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Mexico","North Carolina","North Dakota","Ohio","Oklahoma","South Carolina","Tennessee","Texas","Utah","Virginia","Washington","Wisconsin","Wyoming"] },
  1920: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1920 && !["Alabama","Arkansas","Florida","Georgia","Kentucky","Louisiana","Mississippi","North Carolina","South Carolina","Tennessee","Texas","Virginia"].includes(n)), note: "Harding landslide" },
  1924: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1924 && !["Alabama","Arkansas","Florida","Georgia","Louisiana","Mississippi","North Carolina","Oklahoma","South Carolina","Tennessee","Texas","Virginia","Wisconsin"].includes(n)), anomalies: { "Wisconsin": "PROG" }, thirdPartyCandidates: { "PROG": "Robert La Follette" } },
  1928: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1928 && !["Alabama","Arkansas","Georgia","Louisiana","Massachusetts","Mississippi","Rhode Island","South Carolina"].includes(n)), note: "Hoover" },
  1932: { winner: "DEM", loser: "REP", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1932 && !["Connecticut","Delaware","Maine","New Hampshire","Pennsylvania","Vermont"].includes(n)), note: "FDR; New Deal begins" },
  1936: { winner: "DEM", loser: "REP", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1936 && !["Maine","Vermont"].includes(n)), note: "FDR landslide; 46 of 48 states" },
  1940: { winner: "DEM", loser: "REP", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1940 && !["Colorado","Indiana","Iowa","Kansas","Maine","Michigan","Nebraska","North Dakota","South Dakota","Vermont"].includes(n)), note: "FDR third term" },
  1944: { winner: "DEM", loser: "REP", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1944 && !["Colorado","Indiana","Iowa","Kansas","Maine","Nebraska","North Dakota","Ohio","South Dakota","Vermont","Wisconsin","Wyoming"].includes(n)), note: "FDR fourth term" },
  1948: { winner: "DEM", loser: "REP", winnerStates: ["Arizona","Arkansas","California","Colorado","Florida","Georgia","Idaho","Illinois","Iowa","Kentucky","Massachusetts","Minnesota","Missouri","Montana","Nevada","New Mexico","North Carolina","Ohio","Oklahoma","Rhode Island","Tennessee","Texas","Utah","Virginia","Washington","West Virginia","Wisconsin","Wyoming"], anomalies: { "Alabama": "DIX", "Louisiana": "DIX", "Mississippi": "DIX", "South Carolina": "DIX" }, thirdPartyCandidates: { "DIX": "Strom Thurmond" }, note: "Truman; Dixiecrat revolt" },
  1952: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1952 && !["Alabama","Arkansas","Georgia","Kentucky","Louisiana","Mississippi","North Carolina","South Carolina","West Virginia"].includes(n)), note: "Eisenhower" },
  1956: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1956 && !["Alabama","Arkansas","Georgia","Maryland","Mississippi","Missouri","North Carolina","South Carolina"].includes(n)) },
  1960: { winner: "DEM", loser: "REP", winnerStates: ["Alabama","Arkansas","Connecticut","Delaware","Georgia","Hawaii","Illinois","Louisiana","Maryland","Massachusetts","Michigan","Minnesota","Missouri","Nevada","New Jersey","New Mexico","New York","North Carolina","Pennsylvania","Rhode Island","South Carolina","Texas","West Virginia"], note: "JFK" },
  1964: { winner: "DEM", loser: "REP", winnerStates: NAMES.filter(n => (STATE_ADMISSION[n]||9999) <= 1964 && !["Alabama","Arizona","Georgia","Louisiana","Mississippi","South Carolina"].includes(n)), note: "LBJ landslide" },
  1968: { winner: "REP", loser: "DEM", winnerStates: ["Alaska","California","Colorado","Delaware","Florida","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","South Carolina","South Dakota","Tennessee","Utah","Vermont","Virginia","Wisconsin","Wyoming"], anomalies: { "Alabama": "AI", "Arkansas": "AI", "Georgia": "AI", "Louisiana": "AI", "Mississippi": "AI" }, thirdPartyCandidates: { "AI": "George Wallace" }, note: "Nixon; Wallace 3rd party" },
  1972: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => n !== "Massachusetts"), note: "Nixon landslide; 49 states" },
  1976: { winner: "DEM", loser: "REP", winnerStates: ["Alabama","Arkansas","Delaware","Florida","Georgia","Hawaii","Kentucky","Louisiana","Maryland","Massachusetts","Minnesota","Mississippi","Missouri","New York","North Carolina","Ohio","Pennsylvania","Rhode Island","South Carolina","Tennessee","Texas","West Virginia","Wisconsin"], note: "Carter" },
  1980: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => !["Georgia","Hawaii","Maryland","Massachusetts","Minnesota","Rhode Island","West Virginia"].includes(n)), note: "Reagan" },
  1984: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => n !== "Minnesota"), note: "Reagan landslide; 49 states" },
  1988: { winner: "REP", loser: "DEM", winnerStates: NAMES.filter(n => !["Hawaii","Iowa","Massachusetts","Minnesota","New York","Oregon","Rhode Island","Washington","West Virginia","Wisconsin"].includes(n)), note: "H.W. Bush" },
  1992: { winner: "DEM", loser: "REP", winnerStates: ["Arkansas","California","Colorado","Connecticut","Delaware","Georgia","Hawaii","Illinois","Iowa","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Missouri","Montana","Nevada","New Hampshire","New Jersey","New Mexico","New York","Ohio","Oregon","Pennsylvania","Rhode Island","Tennessee","Vermont","Washington","West Virginia","Wisconsin"], note: "Clinton; Perot 3rd party" },
  1996: { winner: "DEM", loser: "REP", winnerStates: ["Arkansas","California","Connecticut","Delaware","Florida","Hawaii","Illinois","Iowa","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Missouri","Nevada","New Hampshire","New Jersey","New Mexico","New York","Ohio","Oregon","Pennsylvania","Rhode Island","Tennessee","Vermont","Washington","West Virginia","Wisconsin"], note: "Clinton re-election" },
  2000: { winner: "REP", loser: "DEM", winnerStates: ["Alabama","Alaska","Arizona","Arkansas","Colorado","Florida","Georgia","Idaho","Indiana","Kansas","Kentucky","Louisiana","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","North Carolina","North Dakota","Ohio","Oklahoma","South Carolina","South Dakota","Tennessee","Texas","Utah","Virginia","West Virginia","Wyoming"], note: "Bush; disputed Florida" },
  2004: { winner: "REP", loser: "DEM", winnerStates: ["Alabama","Alaska","Arizona","Arkansas","Colorado","Florida","Georgia","Idaho","Indiana","Iowa","Kansas","Kentucky","Louisiana","Mississippi","Missouri","Montana","Nebraska","Nevada","New Mexico","North Carolina","North Dakota","Ohio","Oklahoma","South Carolina","South Dakota","Tennessee","Texas","Utah","Virginia","West Virginia","Wyoming"] },
  2008: { winner: "DEM", loser: "REP", winnerStates: ["California","Colorado","Connecticut","Delaware","Florida","Hawaii","Illinois","Indiana","Iowa","Maine","Maryland","Massachusetts","Michigan","Minnesota","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","Ohio","Oregon","Pennsylvania","Rhode Island","Vermont","Virginia","Washington","Wisconsin"], note: "Obama" },
  2012: { winner: "DEM", loser: "REP", winnerStates: ["California","Colorado","Connecticut","Delaware","Florida","Hawaii","Illinois","Iowa","Maine","Maryland","Massachusetts","Michigan","Minnesota","Nevada","New Hampshire","New Jersey","New Mexico","New York","Ohio","Oregon","Pennsylvania","Rhode Island","Vermont","Virginia","Washington","Wisconsin"] },
  2016: { winner: "REP", loser: "DEM", winnerStates: ["Alabama","Alaska","Arizona","Arkansas","Florida","Georgia","Idaho","Indiana","Iowa","Kansas","Kentucky","Louisiana","Michigan","Mississippi","Missouri","Montana","Nebraska","North Carolina","North Dakota","Ohio","Oklahoma","Pennsylvania","South Carolina","South Dakota","Tennessee","Texas","Utah","West Virginia","Wisconsin","Wyoming"], note: "Trump; lost popular vote" },
  2020: { winner: "DEM", loser: "REP", winnerStates: ["Arizona","California","Colorado","Connecticut","Delaware","Georgia","Hawaii","Illinois","Maine","Maryland","Massachusetts","Michigan","Minnesota","Nevada","New Hampshire","New Jersey","New Mexico","New York","Oregon","Pennsylvania","Rhode Island","Vermont","Virginia","Washington","Wisconsin"], note: "Biden" },
  2024: { winner: "REP", loser: "DEM", winnerStates: ["Alabama","Alaska","Arizona","Arkansas","Florida","Georgia","Idaho","Indiana","Iowa","Kansas","Kentucky","Louisiana","Michigan","Mississippi","Missouri","Montana","Nebraska","Nevada","North Carolina","North Dakota","Ohio","Oklahoma","Pennsylvania","South Carolina","South Dakota","Tennessee","Texas","Utah","West Virginia","Wisconsin","Wyoming"], note: "Trump return" },
};

export const PRESIDENTIAL_DATA: Record<number, { dem: string, rep: string, demV: number, repV: number, totV: number }> = {
  2024: { dem: "Kamala Harris", rep: "Donald J. Trump", demV: 75019616, repV: 77304184, totV: 154900000 },
  2020: { dem: "Joseph R. Biden", rep: "Donald J. Trump", demV: 81283501, repV: 74223975, totV: 158383403 },
  2016: { dem: "Hillary Clinton", rep: "Donald J. Trump", demV: 65853514, repV: 62984828, totV: 136669276 },
  2012: { dem: "Barack Obama", rep: "Mitt Romney", demV: 65915795, repV: 60933504, totV: 129085410 },
  2008: { dem: "Barack Obama", rep: "John McCain", demV: 69498516, repV: 59948323, totV: 131313820 },
  2004: { dem: "John Kerry", rep: "George W. Bush", demV: 59028444, repV: 62040610, totV: 122295345 },
  2000: { dem: "Al Gore", rep: "George W. Bush", demV: 50999897, repV: 50456002, totV: 105421423 },
  1996: { dem: "Bill Clinton", rep: "Bob Dole", demV: 47400125, repV: 39198620, totV: 96277254 },
  1992: { dem: "Bill Clinton", rep: "George H.W. Bush", demV: 44909806, repV: 39104550, totV: 104425014 },
  1988: { dem: "Michael Dukakis", rep: "George H.W. Bush", demV: 41809074, repV: 48886097, totV: 91594686 },
  1984: { dem: "Walter Mondale", rep: "Ronald Reagan", demV: 37577352, repV: 54455472, totV: 92653233 },
  1980: { dem: "Jimmy Carter", rep: "Ronald Reagan", demV: 35480115, repV: 43903230, totV: 86509678 },
  1976: { dem: "Jimmy Carter", rep: "Gerald Ford", demV: 40831881, repV: 39148634, totV: 81531584 },
  1972: { dem: "George McGovern", rep: "Richard Nixon", demV: 29173222, repV: 47168710, totV: 77718554 },
  1968: { dem: "Hubert Humphrey", rep: "Richard Nixon", demV: 31271839, repV: 31783783, totV: 73199998 },
  1964: { dem: "Lyndon B. Johnson", rep: "Barry Goldwater", demV: 43127041, repV: 27175754, totV: 70644592 },
  1960: { dem: "John F. Kennedy", rep: "Richard Nixon", demV: 34220984, repV: 34108157, totV: 68838219 },
  1956: { dem: "Adlai Stevenson", rep: "Dwight D. Eisenhower", demV: 26028028, repV: 35579180, totV: 62021328 },
  1952: { dem: "Adlai Stevenson", rep: "Dwight D. Eisenhower", demV: 27375090, repV: 34075529, totV: 61551919 },
  1948: { dem: "Harry S. Truman", rep: "Thomas E. Dewey", demV: 24179347, repV: 21991292, totV: 48793826 },
  1944: { dem: "Franklin D. Roosevelt", rep: "Thomas E. Dewey", demV: 25612916, repV: 22017929, totV: 47977063 },
  1940: { dem: "Franklin D. Roosevelt", rep: "Wendell Willkie", demV: 27313945, repV: 22347744, totV: 49900445 },
  1936: { dem: "Franklin D. Roosevelt", rep: "Alf Landon", demV: 27752648, repV: 16681862, totV: 45647559 },
  1932: { dem: "Franklin D. Roosevelt", rep: "Herbert Hoover", demV: 22821277, repV: 15761254, totV: 39830836 },
  1928: { dem: "Al Smith", rep: "Herbert Hoover", demV: 15015464, repV: 21427123, totV: 36811689 },
  1924: { dem: "John W. Davis", rep: "Calvin Coolidge", demV: 8386242, repV: 15723789, totV: 29091417 },
  1920: { dem: "James M. Cox", rep: "Warren G. Harding", demV: 9139661, repV: 16144093, totV: 26813398 },
  1916: { dem: "Woodrow Wilson", rep: "Charles E. Hughes", demV: 9126868, repV: 8538221, totV: 18536002 },
  1912: { dem: "Woodrow Wilson", rep: "William H. Taft", demV: 6296284, repV: 3486242, totV: 15045324 },
  1908: { dem: "William J. Bryan", rep: "William H. Taft", demV: 6408979, repV: 7678335, totV: 14882734 },
  1904: { dem: "Alton B. Parker", rep: "Theodore Roosevelt", demV: 5083880, repV: 7630457, totV: 13534954 },
  1900: { dem: "William J. Bryan", rep: "William McKinley", demV: 6370932, repV: 7228864, totV: 13970420 },
  1896: { dem: "William J. Bryan", rep: "William McKinley", demV: 6509052, repV: 7111607, totV: 13936957 },
  1892: { dem: "Grover Cleveland", rep: "Benjamin Harrison", demV: 5553898, repV: 5176108, totV: 12050536 },
  1888: { dem: "Grover Cleveland", rep: "Benjamin Harrison", demV: 5534488, repV: 5443892, totV: 11383320 },
  1884: { dem: "Grover Cleveland", rep: "James G. Blaine", demV: 4914482, repV: 4856905, totV: 10049754 },
  1880: { dem: "Winfield S. Hancock", rep: "James A. Garfield", demV: 4444260, repV: 4446158, totV: 9210420 },
  1876: { dem: "Samuel J. Tilden", rep: "Rutherford B. Hayes", demV: 4288546, repV: 4034311, totV: 8398815 },
  1872: { dem: "Horace Greeley", rep: "Ulysses S. Grant", demV: 2834761, repV: 3598236, totV: 6432997 },
  1868: { dem: "Horatio Seymour", rep: "Ulysses S. Grant", demV: 2708744, repV: 3013650, totV: 5722394 },
  1864: { dem: "George B. McClellan", rep: "Abraham Lincoln", demV: 1812807, repV: 2218388, totV: 4031195 },
  1860: { dem: "Stephen A. Douglas", rep: "Abraham Lincoln", demV: 1380202, repV: 1865908, totV: 4685561 },
  1856: { dem: "James Buchanan", rep: "John C. Fremont", demV: 1836072, repV: 1342345, totV: 4054647 },
  1852: { dem: "Franklin Pierce", rep: "Winfield Scott", demV: 1601274, repV: 1386580, totV: 3144601 },
  1848: { dem: "Lewis Cass", rep: "Zachary Taylor", demV: 1223460, repV: 1361393, totV: 2879184 },
  1844: { dem: "James K. Polk", rep: "Henry Clay", demV: 1339494, repV: 1300004, totV: 2703659 },
  1840: { dem: "Martin Van Buren", rep: "William H. Harrison", demV: 1128854, repV: 1275390, totV: 2411808 },
  1836: { dem: "Martin Van Buren", rep: "William H. Harrison", demV: 764176, repV: 736250, totV: 1500426 },
  1832: { dem: "Andrew Jackson", rep: "Henry Clay", demV: 701799, repV: 484205, totV: 1293020 },
  1828: { dem: "Andrew Jackson", rep: "John Q. Adams", demV: 642553, repV: 500897, totV: 1143450 },
  1824: { dem: "Andrew Jackson", rep: "John Q. Adams", demV: 153544, repV: 115696, totV: 353387 },
  1820: { dem: "James Monroe", rep: "John Q. Adams", demV: 87343, repV: 0, totV: 87343 },
  1816: { dem: "James Monroe", rep: "Rufus King", demV: 76592, repV: 34740, totV: 111332 },
  1812: { dem: "James Madison", rep: "DeWitt Clinton", demV: 140431, repV: 132781, totV: 273212 },
  1808: { dem: "James Madison", rep: "Charles C. Pinckney", demV: 122390, repV: 47241, totV: 169631 },
  1804: { dem: "Thomas Jefferson", rep: "Charles C. Pinckney", demV: 104110, repV: 38919, totV: 143029 },
  1800: { dem: "Thomas Jefferson", rep: "John Adams", demV: 41330, repV: 25952, totV: 67282 },
  1796: { dem: "Thomas Jefferson", rep: "John Adams", demV: 31115, repV: 35726, totV: 66841 },
  1792: { dem: "Unopposed", rep: "G. Washington", demV: 0, repV: 28579, totV: 28579 },
  1788: { dem: "Unopposed", rep: "G. Washington", demV: 0, repV: 43782, totV: 43782 },
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

// States with split senate delegations (1 DEM + 1 REP or FED + DR)
const SPLIT_SENATE_BY_YEAR: Record<number, string[]> = {
  2024: ["Maine","West Virginia","Ohio","Montana","Wisconsin"],
  2020: ["Maine","Pennsylvania","West Virginia","Georgia","Montana"],
  2016: ["Maine","Wisconsin","Pennsylvania","West Virginia","Colorado","Indiana"],
  2012: ["Maine","Nevada","Ohio","Wisconsin","Pennsylvania","North Dakota"],
  2008: ["Maine","Ohio","Pennsylvania","Nevada","Indiana","Iowa"],
  2004: ["Florida","Maine","Nebraska","Oregon","Arkansas","Colorado"],
  2000: ["Florida","Maine","Virginia","Washington","Nevada","Nebraska"],
  1996: ["New York", "California", "Florida", "Illinois", "Ohio", "Pennsylvania", "Wisconsin", "Maine"],
  1992: ["New York", "California", "Florida", "Illinois", "Ohio", "Pennsylvania", "Wisconsin"],
  1988: ["New York", "California", "Florida", "Illinois", "Ohio", "Pennsylvania", "Wisconsin"],
  1984: ["New York", "California", "Florida", "Illinois", "Ohio", "Pennsylvania"],
  1980: ["New York", "California", "Florida", "Illinois", "Ohio", "Pennsylvania"],
  1976: ["New York", "Pennsylvania", "Illinois", "California", "Ohio", "Michigan"],
  1972: ["New York", "Pennsylvania", "Illinois", "California", "Ohio"],
  1968: ["New York", "Pennsylvania", "Illinois", "California", "Ohio"],
  1964: ["New York", "Pennsylvania", "Illinois", "California"],
  1960: ["New York", "Pennsylvania", "Illinois", "California"],
  1956: ["New York", "Pennsylvania", "Illinois"],
  1952: ["New York", "Pennsylvania", "Illinois"],
  1948: ["New York", "Pennsylvania", "Ohio", "Illinois"],
  1944: ["New York", "Pennsylvania", "Ohio"],
  1940: ["New York", "Pennsylvania", "Ohio"],
  1936: ["New York", "New Jersey", "Massachusetts"],
  1932: ["New York", "New Jersey", "Massachusetts"],
  1928: ["New York", "New Jersey", "Massachusetts"],
  1924: ["Massachusetts", "Maryland", "New York"],
  1920: ["Massachusetts", "Maryland", "New York"],
  1916: ["New York", "Ohio", "Massachusetts"],
  1912: ["New York", "Ohio", "Massachusetts", "Kansas"],
  1908: ["New York", "Ohio", "Maryland"],
  1904: ["New York", "Ohio", "Maryland"],
  1900: ["New York", "Maryland", "Kentucky"],
  1892: ["New York", "California", "Illinois"],
  1880: ["New York", "Pennsylvania", "Ohio"],
  1860: ["New Jersey", "Oregon", "California"],
  1852: ["New York", "Pennsylvania", "Virginia"],
  1840: ["New York", "Pennsylvania", "Ohio"],
  1832: ["Pennsylvania", "New Jersey", "Maryland"],
  1824: ["New York", "Maryland", "Illinois"],
  1812: ["Massachusetts", "Maryland", "New York"],
  1800: ["New York", "Pennsylvania", "North Carolina", "South Carolina"],
  1792: ["New York", "Pennsylvania", "Delaware"],
  1788: ["Pennsylvania", "Georgia"],
};

// Historical Congress composition: [majorityParty, minorityParty, majorityHouseShare, majoritySenateShare]
// Sources: Wikipedia "Party divisions of United States Congresses", US Senate/House historical offices
export type CongressInfo = { p1: string; p2: string; houseShare: number; senateShare: number };
export const CONGRESS_DATA: Record<number, CongressInfo> = {
  // 1st-2nd Congress: Pro-Administration vs Anti-Administration
  1788: { p1: "FED", p2: "DR", houseShare: 0.57, senateShare: 0.69 }, // 37/65 Pro-Admin House, 18/26 Senate
  1790: { p1: "FED", p2: "DR", houseShare: 0.57, senateShare: 0.53 }, // 39/69 Pro-Admin, 16/30 Sen
  // 3rd-4th Congress: Federalist vs Democratic-Republican
  1792: { p1: "DR", p2: "FED", houseShare: 0.51, senateShare: 0.47 }, // 54/105 DR, 14/30 Sen
  1794: { p1: "DR", p2: "FED", houseShare: 0.51, senateShare: 0.34 }, // 54/105 DR, 11/32 Sen
  // 5th-6th Congress: Federalist majority
  1796: { p1: "FED", p2: "DR", houseShare: 0.56, senateShare: 0.63 }, // 59/106, 20/32
  1798: { p1: "FED", p2: "DR", houseShare: 0.59, senateShare: 0.59 }, // 63/106, 19/32
  // 7th-12th Congress: DR dominance
  1800: { p1: "DR", p2: "FED", houseShare: 0.60, senateShare: 0.50 }, // 64/106, 16/32
  1802: { p1: "DR", p2: "FED", houseShare: 0.72, senateShare: 0.74 }, // 102/141, 25/34
  1804: { p1: "DR", p2: "FED", houseShare: 0.82, senateShare: 0.79 }, // 116/141, 27/34
  1806: { p1: "DR", p2: "FED", houseShare: 0.83, senateShare: 0.82 }, // 118/142, 28/34
  1808: { p1: "DR", p2: "FED", houseShare: 0.66, senateShare: 0.79 }, // 94/142, 27/34
  1810: { p1: "DR", p2: "FED", houseShare: 0.75, senateShare: 0.76 }, // 107/143, 26/34
  1812: { p1: "DR", p2: "FED", houseShare: 0.62, senateShare: 0.72 }, // 112/181, 26/36
  1814: { p1: "DR", p2: "FED", houseShare: 0.64, senateShare: 0.61 }, // 117/183, 22/36
  // 15th-18th Congress: Era of Good Feelings (DR dominance, FED collapse)
  1816: { p1: "DR", p2: "FED", houseShare: 0.77, senateShare: 0.73 }, // 141/183, 29/40
  1818: { p1: "DR", p2: "FED", houseShare: 0.85, senateShare: 0.82 }, // 156/183, 36/44
  1820: { p1: "DR", p2: "FED", houseShare: 0.86, senateShare: 0.90 }, // 158/183, 43/48
  1822: { p1: "DR", p2: "FED", houseShare: 0.62, senateShare: 0.90 }, // 131/213, 43/48
  // 19th-22nd Congress: Jacksonian era (DEM = Jacksonian, NR = Adams/Anti-Jacksonian)
  1824: { p1: "NR", p2: "DEM", houseShare: 0.52, senateShare: 0.55 }, // 105/202 Adams, 26/47
  1826: { p1: "DEM", p2: "NR", houseShare: 0.56, senateShare: 0.44 }, // 119/213 Jackson, 21/48
  1828: { p1: "DEM", p2: "NR", houseShare: 0.65, senateShare: 0.55 }, // 139/213, 26/47
  1830: { p1: "DEM", p2: "NR", houseShare: 0.66, senateShare: 0.60 }, // 141/213, 29/48
  // 23rd-33rd Congress: Democrat vs Whig
  1832: { p1: "DEM", p2: "WHIG", houseShare: 0.61, senateShare: 0.65 }, // 147/240, 31/48
  1834: { p1: "DEM", p2: "WHIG", houseShare: 0.59, senateShare: 0.67 }, // 145/245, 32/48
  1836: { p1: "DEM", p2: "WHIG", houseShare: 0.56, senateShare: 0.67 }, // 128/242, 35/52
  1838: { p1: "DEM", p2: "WHIG", houseShare: 0.49, senateShare: 0.54 }, // 119/242, 28/52
  1840: { p1: "WHIG", p2: "DEM", houseShare: 0.57, senateShare: 0.56 }, // 142/251, 29/52
  1842: { p1: "DEM", p2: "WHIG", houseShare: 0.64, senateShare: 0.47 }, // 148/232, 25/53
  1844: { p1: "DEM", p2: "WHIG", houseShare: 0.63, senateShare: 0.55 }, // 143/226, 31/56
  1846: { p1: "WHIG", p2: "DEM", houseShare: 0.51, senateShare: 0.37 }, // 115/227, 21/58
  1848: { p1: "DEM", p2: "WHIG", houseShare: 0.48, senateShare: 0.55 }, // 117/242, 33/60
  1850: { p1: "DEM", p2: "WHIG", houseShare: 0.57, senateShare: 0.55 }, // 140/246, 34/62
  1852: { p1: "DEM", p2: "WHIG", houseShare: 0.65, senateShare: 0.61 }, // 159/243, 38/62
  1854: { p1: "REP", p2: "DEM", houseShare: 0.43, senateShare: 0.53 }, // 100/234 Opposition, 33/62
  // 35th Congress onward: Democrat vs Republican
  1856: { p1: "DEM", p2: "REP", houseShare: 0.57, senateShare: 0.61 }, // 133/234, 39/64
  1858: { p1: "REP", p2: "DEM", houseShare: 0.53, senateShare: 0.38 }, // 113/214, 25/66
  1860: { p1: "REP", p2: "DEM", houseShare: 0.59, senateShare: 0.57 }, // 108/183, 31/54
  1862: { p1: "REP", p2: "DEM", houseShare: 0.55, senateShare: 0.65 }, // 102/186, 34/52
  1864: { p1: "REP", p2: "DEM", houseShare: 0.74, senateShare: 0.67 }, // 143/193, 36/54
  1866: { p1: "REP", p2: "DEM", houseShare: 0.74, senateShare: 0.78 }, // 143/193, 42/54
  1868: { p1: "REP", p2: "DEM", houseShare: 0.67, senateShare: 0.85 }, // 149/223, 56/66
  1870: { p1: "REP", p2: "DEM", houseShare: 0.56, senateShare: 0.77 }, // 134/240, 56/73
  1872: { p1: "REP", p2: "DEM", houseShare: 0.69, senateShare: 0.74 }, // 194/283, 54/73
  1874: { p1: "DEM", p2: "REP", houseShare: 0.62, senateShare: 0.60 }, // 181/293, 44/73
  1876: { p1: "DEM", p2: "REP", houseShare: 0.53, senateShare: 0.52 }, // 156/296, 39/75
  1878: { p1: "DEM", p2: "REP", houseShare: 0.52, senateShare: 0.53 }, // 151/293, 40/76
  1880: { p1: "REP", p2: "DEM", houseShare: 0.45, senateShare: 0.51 },
  1882: { p1: "DEM", p2: "REP", houseShare: 0.61, senateShare: 0.48 },
  1884: { p1: "DEM", p2: "REP", houseShare: 0.56, senateShare: 0.49 },
  1886: { p1: "DEM", p2: "REP", houseShare: 0.53, senateShare: 0.48 },
  1888: { p1: "REP", p2: "DEM", houseShare: 0.52, senateShare: 0.55 },
  1890: { p1: "DEM", p2: "REP", houseShare: 0.71, senateShare: 0.52 },
  1892: { p1: "DEM", p2: "REP", houseShare: 0.62, senateShare: 0.52 },
  1894: { p1: "REP", p2: "DEM", houseShare: 0.70, senateShare: 0.52 },
  1896: { p1: "REP", p2: "DEM", houseShare: 0.65, senateShare: 0.56 },
  1898: { p1: "REP", p2: "DEM", houseShare: 0.55, senateShare: 0.56 },
  1900: { p1: "REP", p2: "DEM", houseShare: 0.55, senateShare: 0.60 },
  1902: { p1: "REP", p2: "DEM", houseShare: 0.52, senateShare: 0.63 },
  1904: { p1: "REP", p2: "DEM", houseShare: 0.65, senateShare: 0.67 },
  1906: { p1: "REP", p2: "DEM", houseShare: 0.49, senateShare: 0.64 },
  1908: { p1: "REP", p2: "DEM", houseShare: 0.61, senateShare: 0.63 },
  1910: { p1: "DEM", p2: "REP", houseShare: 0.52, senateShare: 0.52 },
  1912: { p1: "DEM", p2: "REP", houseShare: 0.66, senateShare: 0.56 },
  1914: { p1: "DEM", p2: "REP", houseShare: 0.53, senateShare: 0.56 },
  1916: { p1: "DEM", p2: "REP", houseShare: 0.49, senateShare: 0.56 },
  1918: { p1: "REP", p2: "DEM", houseShare: 0.56, senateShare: 0.51 },
  1920: { p1: "REP", p2: "DEM", houseShare: 0.70, senateShare: 0.63 },
  1922: { p1: "REP", p2: "DEM", houseShare: 0.52, senateShare: 0.56 },
  1924: { p1: "REP", p2: "DEM", houseShare: 0.58, senateShare: 0.58 },
  1926: { p1: "REP", p2: "DEM", houseShare: 0.55, senateShare: 0.55 },
  1928: { p1: "REP", p2: "DEM", houseShare: 0.63, senateShare: 0.63 },
  1930: { p1: "DEM", p2: "REP", houseShare: 0.50, senateShare: 0.50 },
  1932: { p1: "DEM", p2: "REP", houseShare: 0.72, senateShare: 0.63 },
  1934: { p1: "DEM", p2: "REP", houseShare: 0.74, senateShare: 0.72 },
  1936: { p1: "DEM", p2: "REP", houseShare: 0.77, senateShare: 0.79 },
  1938: { p1: "DEM", p2: "REP", houseShare: 0.60, senateShare: 0.72 },
  1940: { p1: "DEM", p2: "REP", houseShare: 0.61, senateShare: 0.69 },
  1942: { p1: "DEM", p2: "REP", houseShare: 0.51, senateShare: 0.63 },
  1944: { p1: "DEM", p2: "REP", houseShare: 0.56, senateShare: 0.58 },
  1946: { p1: "REP", p2: "DEM", houseShare: 0.57, senateShare: 0.54 },
  1948: { p1: "DEM", p2: "REP", houseShare: 0.60, senateShare: 0.56 },
  1950: { p1: "DEM", p2: "REP", houseShare: 0.54, senateShare: 0.51 },
  1952: { p1: "REP", p2: "DEM", houseShare: 0.51, senateShare: 0.51 },
  1954: { p1: "DEM", p2: "REP", houseShare: 0.53, senateShare: 0.51 },
  1956: { p1: "DEM", p2: "REP", houseShare: 0.53, senateShare: 0.51 },
  1958: { p1: "DEM", p2: "REP", houseShare: 0.64, senateShare: 0.66 },
  1960: { p1: "DEM", p2: "REP", houseShare: 0.60, senateShare: 0.65 },
  1962: { p1: "DEM", p2: "REP", houseShare: 0.59, senateShare: 0.67 },
  1964: { p1: "DEM", p2: "REP", houseShare: 0.68, senateShare: 0.68 },
  1966: { p1: "DEM", p2: "REP", houseShare: 0.57, senateShare: 0.64 },
  1968: { p1: "DEM", p2: "REP", houseShare: 0.56, senateShare: 0.57 },
  1970: { p1: "DEM", p2: "REP", houseShare: 0.59, senateShare: 0.55 },
  1972: { p1: "DEM", p2: "REP", houseShare: 0.56, senateShare: 0.57 },
  1974: { p1: "DEM", p2: "REP", houseShare: 0.67, senateShare: 0.61 },
  1976: { p1: "DEM", p2: "REP", houseShare: 0.67, senateShare: 0.62 },
  1978: { p1: "DEM", p2: "REP", houseShare: 0.64, senateShare: 0.59 },
  1980: { p1: "DEM", p2: "REP", houseShare: 0.56, senateShare: 0.47 },
  1982: { p1: "DEM", p2: "REP", houseShare: 0.62, senateShare: 0.46 },
  1984: { p1: "DEM", p2: "REP", houseShare: 0.58, senateShare: 0.47 },
  1986: { p1: "DEM", p2: "REP", houseShare: 0.59, senateShare: 0.55 },
  1988: { p1: "DEM", p2: "REP", houseShare: 0.60, senateShare: 0.55 },
  1990: { p1: "DEM", p2: "REP", houseShare: 0.61, senateShare: 0.57 },
  1992: { p1: "DEM", p2: "REP", houseShare: 0.59, senateShare: 0.57 },
  1994: { p1: "REP", p2: "DEM", houseShare: 0.53, senateShare: 0.53 },
  1996: { p1: "REP", p2: "DEM", houseShare: 0.52, senateShare: 0.55 },
  1998: { p1: "REP", p2: "DEM", houseShare: 0.51, senateShare: 0.55 },
  2000: { p1: "REP", p2: "DEM", houseShare: 0.51, senateShare: 0.50 },
  2002: { p1: "REP", p2: "DEM", houseShare: 0.53, senateShare: 0.51 },
  2004: { p1: "REP", p2: "DEM", houseShare: 0.53, senateShare: 0.55 },
  2006: { p1: "DEM", p2: "REP", houseShare: 0.54, senateShare: 0.51 },
  2008: { p1: "DEM", p2: "REP", houseShare: 0.59, senateShare: 0.59 },
  2010: { p1: "REP", p2: "DEM", houseShare: 0.56, senateShare: 0.47 },
  2012: { p1: "REP", p2: "DEM", houseShare: 0.54, senateShare: 0.45 },
  2014: { p1: "REP", p2: "DEM", houseShare: 0.57, senateShare: 0.54 },
  2016: { p1: "REP", p2: "DEM", houseShare: 0.55, senateShare: 0.52 },
  2018: { p1: "DEM", p2: "REP", houseShare: 0.54, senateShare: 0.47 },
  2020: { p1: "DEM", p2: "REP", houseShare: 0.51, senateShare: 0.50 },
  2022: { p1: "REP", p2: "DEM", houseShare: 0.51, senateShare: 0.49 },
  2024: { p1: "REP", p2: "DEM", houseShare: 0.52, senateShare: 0.53 },
};

// Lean sets for senate/governor baseline (independent of presidential vote)
const R_BASE = new Set(["Alabama","Alaska","Arkansas","Idaho","Indiana","Kansas","Kentucky","Louisiana","Mississippi","Missouri","Montana","Nebraska","North Dakota","Oklahoma","South Carolina","South Dakota","Tennessee","Texas","Utah","West Virginia","Wyoming"]);
const D_BASE = new Set(["California","Connecticut","Delaware","Hawaii","Illinois","Maryland","Massachusetts","New Jersey","New York","Oregon","Rhode Island","Vermont","Washington"]);

// Deterministic logic for active states based on 4-year cycles
function isSenateActive(year: number, state: string): boolean {
  const stateHash = state.charCodeAt(0) + state.charCodeAt(state.length - 1);
  const classA = stateHash % 3;
  const classB = (stateHash + 1) % 3;
  const cycle = Math.floor(year / 4) % 3;
  return classA === cycle || classB === cycle;
}

const GOV_PRES_YEAR_STATES = new Set([
  "Delaware", "Indiana", "Missouri", "Montana", "North Carolina", 
  "North Dakota", "Utah", "Washington", "West Virginia", "New Hampshire", "Vermont"
]);

function isGovernorActive(year: number, state: string): boolean {
  if (state === "New Hampshire" || state === "Vermont") return true;
  if (year < 1920) return (state.charCodeAt(0) + year) % 2 === 0;
  const isPresYear = year % 4 === 0;
  if (isPresYear) return GOV_PRES_YEAR_STATES.has(state);
  // Midterm years (most governors)
  return !GOV_PRES_YEAR_STATES.has(state) && (year % 2 === 0) && !["New Jersey", "Virginia"].includes(state);
}

function buildYear(year: number): YearData {
  const el = ELECTIONS[year];
  const pData = PRESIDENTIAL_DATA[year] || { dem: "Off-Year", rep: "Off-Year", demV: 0, repV: 0, totV: 0 };
  const fallback: YearData = { 
    year, states: {}, 
    demCandidate: pData.dem, repCandidate: pData.rep, 
    demPopVote: pData.demV, repPopVote: pData.repV, totalPopVote: pData.totV, 
    thirdPartyCandidates: el?.thirdPartyCandidates,
    unopposed: el?.unopposed 
  };
  
  // Use the most recent presidential election for the baseline Map fill if not an election year
  const presElectionYears = Object.keys(ELECTIONS).map(Number).sort((a,b)=>a-b);
  const lastPresYear = presElectionYears.filter(y => y <= year).pop() || 1789;
  const activeEl = ELECTIONS[lastPresYear];
  const winSet = new Set(activeEl.winnerStates);

  const states: Record<string, StateData> = {};
  const govOvr = GOV_OVERRIDES[year] || {};
  const splits = new Set(SPLIT_SENATE_BY_YEAR[year] || []);
  const cd = CONGRESS_DATA[year] || { p1: "DEM", p2: "REP", houseShare: 0.5, senateShare: 0.5 };
  const majorityShare = cd.houseShare;

  for (const name of NAMES) {
    const admitted = STATE_ADMISSION[name] || 9999;
    if (admitted > year) continue;
    
    // Presidential (if not an election year, this party will be used for the "dormant" state)
    let presParty = winSet.has(name) ? activeEl.winner : activeEl.loser;
    let presCandidate: string | undefined = undefined;
    if (activeEl.anomalies && activeEl.anomalies[name]) {
      presParty = activeEl.anomalies[name];
    }
    if (!el) presCandidate = undefined; 
    else {
      if (presParty === "DEM") presCandidate = activeEl.demCandidate || pData.dem;
      else if (presParty === "REP") presCandidate = activeEl.repCandidate || pData.rep;
      else presCandidate = activeEl.thirdPartyCandidates?.[presParty] || (year < 1860 && (presParty === "DR" || presParty === "FED") ? (presParty === "DR" ? activeEl.demCandidate : activeEl.repCandidate) : PARTY_FULL_NAMES[presParty] || presParty);
    }

    // Senate — use CONGRESS_DATA parties for historical accuracy
    const senBase = year >= 1856 ? (R_BASE.has(name) ? "REP" : D_BASE.has(name) ? "DEM" : presParty) : (winSet.has(name) ? cd.p1 : cd.p2);
    const isSplit = splits.has(name);
    const senOther = senBase === cd.p1 ? cd.p2 : cd.p1;

    // Governor — use CONGRESS_DATA parties for historical accuracy
    let govParty = year >= 1856 ? (R_BASE.has(name) ? "REP" : D_BASE.has(name) ? "DEM" : presParty) : (winSet.has(name) ? cd.p1 : cd.p2);
    if (govOvr[name]) govParty = govOvr[name];

    // House (proportional based on national wave + state lean adjustment)
    const totalH = HOUSE[name] || Math.max(1, Math.floor((EV[name] || 3) - 2));
    let stateShare = majorityShare;
    if (R_BASE.has(name)) stateShare = Math.max(0.1, majorityShare - 0.2);
    else if (D_BASE.has(name)) stateShare = Math.min(0.9, majorityShare + 0.15);
    const hash = (name.charCodeAt(0) + name.length) % 10;
    stateShare = Math.max(0, Math.min(1, stateShare + (hash - 5) * 0.02));
    const dH = Math.round(totalH * stateShare);

    states[name] = {
      president: { party: presParty, candidate: presCandidate, flipped: false },
      senate: { split: isSplit, party1: senBase, party2: isSplit ? senOther : senBase, active: isSenateActive(year, name) },
      house: { demReps: dH, repReps: totalH - dH, totalReps: totalH },
      governor: { party: govParty, active: isGovernorActive(year, name) },
      electoralVotes: EV[name] || 3,
    };
  }
  return { 
    year, 
    states,
    demCandidate: pData.dem, 
    repCandidate: pData.rep, 
    demPopVote: pData.demV, 
    repPopVote: pData.repV, 
    totalPopVote: pData.totV,
    unopposed: el?.unopposed,
    thirdPartyCandidates: el?.thirdPartyCandidates
  };
}

export const ELECTORAL_HISTORY: YearData[] = Array.from({ length: (2024 - 1788) / 2 + 1 }, (_, i) => 1788 + i * 2).filter(y => y >= 1788).map(buildYear);

export function getStateData(year: number, stateName: string): StateData {
  let closest = ELECTORAL_HISTORY[0];
  let minDist = Infinity;
  for (const yd of ELECTORAL_HISTORY) {
    const d = Math.abs(yd.year - year);
    if (d < minDist) { minDist = d; closest = yd; }
  }
  return closest.states[stateName] || {
    president: { party: "", flipped: false }, senate: { split: false, party1: "", party2: "", active: false },
    house: { demReps: 0, repReps: 0, totalReps: 0 }, governor: { party: "", active: false }, electoralVotes: 0,
  };
}

// Universal flip detection across all 4 views
export interface FlipInfo {
  presFlip: boolean;
  senFlip1: boolean;      // did seat 1 flip?
  senFlip2: boolean;      // did seat 2 flip?
  govFlip: boolean;
  houseFlipDem: number;   // seats gained by DEM vs previous
  houseFlipRep: number;   // seats gained by REP vs previous
}

export function getFlipData(year: number, stateName: string): FlipInfo {
  const years = ELECTORAL_HISTORY.map(y => y.year).sort((a, b) => a - b);
  const idx = years.indexOf(year);
  const noFlip: FlipInfo = { presFlip: false, senFlip1: false, senFlip2: false, govFlip: false, houseFlipDem: 0, houseFlipRep: 0 };
  if (idx <= 0) return noFlip;

  const cur = getStateData(year, stateName);
  const prev = getStateData(years[idx - 1], stateName);

  const curAdmitted = (STATE_ADMISSION[stateName] || 1787) <= year;
  const prevAdmitted = (STATE_ADMISSION[stateName] || 1787) <= years[idx - 1];

  if (!curAdmitted || !prevAdmitted || !cur.president.party || !prev.president.party || cur.president.party === "NONE" || prev.president.party === "NONE") return noFlip;

  const presFlip = cur.president.party !== prev.president.party;
  const govFlip = cur.governor.party !== prev.governor.party;

  // Senate: compare individual seats to find exactly which half flipped
  const prevSens = [prev.senate.party1, prev.senate.party2];
  let senFlip1 = false;
  let senFlip2 = false;
  
  const prevAvail = [...prevSens];
  if (prevAvail.includes(cur.senate.party1)) {
    prevAvail.splice(prevAvail.indexOf(cur.senate.party1), 1);
  } else {
    senFlip1 = true;
  }
  if (prevAvail.includes(cur.senate.party2)) {
    prevAvail.splice(prevAvail.indexOf(cur.senate.party2), 1);
  } else {
    senFlip2 = true;
  }

  // House: compare DEM seat counts
  const demDiff = cur.house.demReps - prev.house.demReps;
  const houseFlipDem = Math.max(0, demDiff);
  const houseFlipRep = Math.max(0, -demDiff);

  return { presFlip, senFlip1, senFlip2, govFlip, houseFlipDem, houseFlipRep };
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

