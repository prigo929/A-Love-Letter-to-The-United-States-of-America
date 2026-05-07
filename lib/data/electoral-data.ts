export type ViewMode = "President" | "Senate" | "House" | "Governor";
export type Party = "DEM" | "REP" | "OTHER";
export interface StateData {
  president: { party: Party; flipped: boolean };
  senate: { split: boolean; party1: Party; party2: Party };
  house: { demReps: number; repReps: number; totalReps: number };
  governor: { party: Party };
  electoralVotes: number;
}
export interface YearData { year: number; states: Record<string, StateData>; }

// Electoral votes per state (2020 apportionment)
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

// House seats per state (2020 apportionment)
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

// Compact presidential winners: R=REP, D=DEM per year
// Order: AL,AK,AZ,AR,CA,CO,CT,DE,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY
const NAMES = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

const PRES: Record<number,string> = {
  2000:"RRDRDDDDRRDRIDRKRRDDDDDRDRRDRDDDRRDRORDDRSDRTVDWDRY".replace(/[a-z]/g,"D").replace(/[A-Z]/g,"R"),
  2004:"RRDRDDDDRRDRIDRRRRDDDRDRDRRRDRDDRRDRORDDRSDRTVDWDRY".replace(/[a-z]/g,"D").replace(/[A-Z]/g,"R"),
  2008:"RRDRDDDDDDDRIDDRRRDDDDDDRDRDDDDDDRDDRODDRSDRDVDDDRY".replace(/[a-z]/g,"D").replace(/[A-Z]/g,"R"),
  2012:"RRDRDDDDDDDRIDDRRRDDDDDDRDRDDDDDRDDDRODDRSDRDVDDDRY".replace(/[a-z]/g,"D").replace(/[A-Z]/g,"R"),
  2016:"RRRRDDDDRRDRIRRRRRDDDRDRDRRRDRDDRRDRORDDRSDRRVDRRDRY".replace(/[a-z]/g,"D").replace(/[A-Z]/g,"R"),
  2020:"RRDRDDDDDDDRIDDRRRDDDDDDRDRDDDDDRDDDRODDRSDRDVDDDRY".replace(/[a-z]/g,"D").replace(/[A-Z]/g,"R"),
  2024:"RRRRDDDDRRDRIRRRRRDDDRDRDRRRDRDDRRDRORDDRSDRRVDRRDRY".replace(/[a-z]/g,"D").replace(/[A-Z]/g,"R"),
};

// Actual results encoded cleanly
function presWinner(year: number): Record<string, Party> {
  const map: Record<string, Party> = {};
  // Hardcoded real results
  const R: Party = "REP", D: Party = "DEM";
  const y: Record<number, Record<string, Party>> = {
    2000: { Alabama:R,Alaska:R,Arizona:R,Arkansas:R,California:D,Colorado:R,Connecticut:D,Delaware:D,Florida:R,Georgia:R,Hawaii:D,Idaho:R,Illinois:D,Indiana:R,Iowa:D,Kansas:R,Kentucky:R,Louisiana:R,Maine:D,Maryland:D,Massachusetts:D,Michigan:D,Minnesota:D,Mississippi:R,Missouri:R,Montana:R,Nebraska:R,Nevada:R,"New Hampshire":R,"New Jersey":D,"New Mexico":D,"New York":D,"North Carolina":R,"North Dakota":R,Ohio:R,Oklahoma:R,Oregon:D,Pennsylvania:D,"Rhode Island":D,"South Carolina":R,"South Dakota":R,Tennessee:R,Texas:R,Utah:R,Vermont:D,Virginia:R,Washington:D,"West Virginia":R,Wisconsin:D,Wyoming:R },
    2004: { Alabama:R,Alaska:R,Arizona:R,Arkansas:R,California:D,Colorado:R,Connecticut:D,Delaware:D,Florida:R,Georgia:R,Hawaii:D,Idaho:R,Illinois:D,Indiana:R,Iowa:R,Kansas:R,Kentucky:R,Louisiana:R,Maine:D,Maryland:D,Massachusetts:D,Michigan:D,Minnesota:D,Mississippi:R,Missouri:R,Montana:R,Nebraska:R,Nevada:R,"New Hampshire":D,"New Jersey":D,"New Mexico":R,"New York":D,"North Carolina":R,"North Dakota":R,Ohio:R,Oklahoma:R,Oregon:D,Pennsylvania:D,"Rhode Island":D,"South Carolina":R,"South Dakota":R,Tennessee:R,Texas:R,Utah:R,Vermont:D,Virginia:R,Washington:D,"West Virginia":R,Wisconsin:D,Wyoming:R },
    2008: { Alabama:R,Alaska:R,Arizona:R,Arkansas:R,California:D,Colorado:D,Connecticut:D,Delaware:D,Florida:D,Georgia:R,Hawaii:D,Idaho:R,Illinois:D,Indiana:D,Iowa:D,Kansas:R,Kentucky:R,Louisiana:R,Maine:D,Maryland:D,Massachusetts:D,Michigan:D,Minnesota:D,Mississippi:R,Missouri:R,Montana:R,Nebraska:R,Nevada:D,"New Hampshire":D,"New Jersey":D,"New Mexico":D,"New York":D,"North Carolina":D,"North Dakota":R,Ohio:D,Oklahoma:R,Oregon:D,Pennsylvania:D,"Rhode Island":D,"South Carolina":R,"South Dakota":R,Tennessee:R,Texas:R,Utah:R,Vermont:D,Virginia:D,Washington:D,"West Virginia":R,Wisconsin:D,Wyoming:R },
    2012: { Alabama:R,Alaska:R,Arizona:R,Arkansas:R,California:D,Colorado:D,Connecticut:D,Delaware:D,Florida:D,Georgia:R,Hawaii:D,Idaho:R,Illinois:D,Indiana:R,Iowa:D,Kansas:R,Kentucky:R,Louisiana:R,Maine:D,Maryland:D,Massachusetts:D,Michigan:D,Minnesota:D,Mississippi:R,Missouri:R,Montana:R,Nebraska:R,Nevada:D,"New Hampshire":D,"New Jersey":D,"New Mexico":D,"New York":D,"North Carolina":R,"North Dakota":R,Ohio:D,Oklahoma:R,Oregon:D,Pennsylvania:D,"Rhode Island":D,"South Carolina":R,"South Dakota":R,Tennessee:R,Texas:R,Utah:R,Vermont:D,Virginia:D,Washington:D,"West Virginia":R,Wisconsin:D,Wyoming:R },
    2016: { Alabama:R,Alaska:R,Arizona:R,Arkansas:R,California:D,Colorado:D,Connecticut:D,Delaware:D,Florida:R,Georgia:R,Hawaii:D,Idaho:R,Illinois:D,Indiana:R,Iowa:R,Kansas:R,Kentucky:R,Louisiana:R,Maine:D,Maryland:D,Massachusetts:D,Michigan:R,Minnesota:D,Mississippi:R,Missouri:R,Montana:R,Nebraska:R,Nevada:D,"New Hampshire":D,"New Jersey":D,"New Mexico":D,"New York":D,"North Carolina":R,"North Dakota":R,Ohio:R,Oklahoma:R,Oregon:D,Pennsylvania:R,"Rhode Island":D,"South Carolina":R,"South Dakota":R,Tennessee:R,Texas:R,Utah:R,Vermont:D,Virginia:D,Washington:D,"West Virginia":R,Wisconsin:R,Wyoming:R },
    2020: { Alabama:R,Alaska:R,Arizona:D,Arkansas:R,California:D,Colorado:D,Connecticut:D,Delaware:D,Florida:R,Georgia:D,Hawaii:D,Idaho:R,Illinois:D,Indiana:R,Iowa:R,Kansas:R,Kentucky:R,Louisiana:R,Maine:D,Maryland:D,Massachusetts:D,Michigan:D,Minnesota:D,Mississippi:R,Missouri:R,Montana:R,Nebraska:R,Nevada:D,"New Hampshire":D,"New Jersey":D,"New Mexico":D,"New York":D,"North Carolina":R,"North Dakota":R,Ohio:R,Oklahoma:R,Oregon:D,Pennsylvania:D,"Rhode Island":D,"South Carolina":R,"South Dakota":R,Tennessee:R,Texas:R,Utah:R,Vermont:D,Virginia:D,Washington:D,"West Virginia":R,Wisconsin:D,Wyoming:R },
    2024: { Alabama:R,Alaska:R,Arizona:R,Arkansas:R,California:D,Colorado:D,Connecticut:D,Delaware:D,Florida:R,Georgia:R,Hawaii:D,Idaho:R,Illinois:D,Indiana:R,Iowa:R,Kansas:R,Kentucky:R,Louisiana:R,Maine:D,Maryland:D,Massachusetts:D,Michigan:R,Minnesota:D,Mississippi:R,Missouri:R,Montana:R,Nebraska:R,Nevada:R,"New Hampshire":D,"New Jersey":D,"New Mexico":D,"New York":D,"North Carolina":R,"North Dakota":R,Ohio:R,Oklahoma:R,Oregon:D,Pennsylvania:R,"Rhode Island":D,"South Carolina":R,"South Dakota":R,Tennessee:R,Texas:R,Utah:R,Vermont:D,Virginia:D,Washington:D,"West Virginia":R,Wisconsin:R,Wyoming:R },
  };
  return y[year] || y[2020];
}

// Governor party (approximate, real for major states)
function govParty(year: number): Record<string, Party> {
  const R: Party = "REP", D: Party = "DEM";
  const base: Record<string, Party> = {};
  for (const n of NAMES) base[n] = EV[n] > 10 ? D : R; // placeholder
  const overrides: Record<number, Record<string, Party>> = {
    2000: { California:D,Texas:R,Florida:R,"New York":R,Ohio:R,Pennsylvania:R,Michigan:R,Illinois:R,Georgia:R,Virginia:R,Massachusetts:R },
    2004: { California:R,Texas:R,Florida:R,"New York":R,Ohio:R,Pennsylvania:D,Michigan:D,Illinois:R,Georgia:R,Virginia:D,Massachusetts:R },
    2008: { California:R,Texas:R,Florida:R,"New York":D,Ohio:D,Pennsylvania:D,Michigan:D,Illinois:D,Georgia:R,Virginia:D,Massachusetts:D },
    2012: { California:D,Texas:R,Florida:R,"New York":D,Ohio:R,Pennsylvania:R,Michigan:R,Illinois:D,Georgia:R,Virginia:R,Massachusetts:D,"New Jersey":R,Wisconsin:R },
    2016: { California:D,Texas:R,Florida:R,"New York":D,Ohio:R,Pennsylvania:D,Michigan:R,Illinois:R,Georgia:R,Virginia:D,Massachusetts:R,Maryland:R,Vermont:R },
    2020: { California:D,Texas:R,Florida:R,"New York":D,Ohio:R,Pennsylvania:D,Michigan:D,Illinois:D,Georgia:R,Virginia:D,Massachusetts:R,Maryland:R,Vermont:R,"New Hampshire":R },
    2024: { California:D,Texas:R,Florida:R,"New York":D,Ohio:R,Pennsylvania:D,Michigan:D,Illinois:D,Georgia:R,Virginia:R,Kentucky:D,Kansas:D,Louisiana:R },
  };
  const o = overrides[year] || overrides[2020];
  return { ...base, ...o };
}

// Senate: split delegations by year
const SPLIT_SENATE: Record<number, Set<string>> = {
  2000: new Set(["Florida","Maine","Virginia","Washington","Nevada","Nebraska"]),
  2004: new Set(["Florida","Maine","Nebraska","Oregon","Arkansas","Colorado"]),
  2008: new Set(["Maine","Ohio","Pennsylvania","Nevada","Indiana","Iowa"]),
  2012: new Set(["Maine","Nevada","Ohio","Wisconsin","Pennsylvania","North Dakota"]),
  2016: new Set(["Maine","Wisconsin","Pennsylvania","West Virginia","Colorado","Indiana"]),
  2020: new Set(["Maine","Pennsylvania","West Virginia","Georgia","Montana","Wisconsin"]),
  2024: new Set(["Maine","West Virginia","Ohio","Montana"]),
};

// House Dem seats by state (approximate real)
const HOUSE_DEM: Record<number, Record<string, number>> = {
  2000: { California:32,Texas:17,Florida:8,"New York":19,Ohio:8,Pennsylvania:11,Illinois:10,Michigan:9,Georgia:5,"North Carolina":7,Virginia:4,Washington:6,Arizona:3,Massachusetts:10,Indiana:4,"New Jersey":7,Minnesota:5,Colorado:2,Oregon:4,Maryland:4,Wisconsin:4,Connecticut:3,Iowa:2 },
  2004: { California:33,Texas:11,Florida:7,"New York":20,Ohio:6,Pennsylvania:7,Illinois:10,Michigan:6,Georgia:4,"North Carolina":6,Virginia:3,Washington:6,Arizona:3,Massachusetts:10,Indiana:2,"New Jersey":7,Minnesota:4,Colorado:3,Oregon:4,Maryland:4,Wisconsin:3,Connecticut:2,Iowa:2 },
  2008: { California:34,Texas:12,Florida:10,"New York":26,Ohio:8,Pennsylvania:12,Illinois:12,Michigan:8,Georgia:6,"North Carolina":7,Virginia:6,Washington:6,Arizona:5,Massachusetts:10,Indiana:4,"New Jersey":8,Minnesota:5,Colorado:5,Oregon:5,Maryland:7,Wisconsin:5,Connecticut:5,Iowa:3 },
  2012: { California:38,Texas:12,Florida:10,"New York":21,Ohio:4,Pennsylvania:5,Illinois:12,Michigan:5,Georgia:5,"North Carolina":4,Virginia:4,Washington:6,Arizona:5,Massachusetts:9,Indiana:2,"New Jersey":6,Minnesota:5,Colorado:4,Oregon:4,Maryland:7,Wisconsin:3,Connecticut:5,Iowa:1 },
  2016: { California:39,Texas:11,Florida:11,"New York":18,Ohio:4,Pennsylvania:5,Illinois:11,Michigan:5,Georgia:4,"North Carolina":3,Virginia:4,Washington:7,Arizona:4,Massachusetts:9,Indiana:2,"New Jersey":7,Minnesota:5,Colorado:4,Oregon:4,Maryland:7,Wisconsin:3,Connecticut:5,Iowa:1 },
  2020: { California:42,Texas:13,Florida:11,"New York":19,Ohio:4,Pennsylvania:9,Illinois:13,Michigan:7,Georgia:6,"North Carolina":5,Virginia:7,Washington:7,Arizona:5,Massachusetts:9,Indiana:2,"New Jersey":10,Minnesota:4,Colorado:5,Oregon:4,Maryland:7,Wisconsin:3,Connecticut:5,Iowa:1 },
  2024: { California:40,Texas:13,Florida:9,"New York":17,Ohio:4,Pennsylvania:7,Illinois:14,Michigan:7,Georgia:5,"North Carolina":7,Virginia:6,Washington:8,Arizona:4,Massachusetts:9,Indiana:2,"New Jersey":9,Minnesota:5,Colorado:5,Oregon:4,Maryland:7,Wisconsin:4,Connecticut:5,Iowa:1 },
};

function buildYear(year: number): YearData {
  const pres = presWinner(year);
  const prevPres = year > 2000 ? presWinner(year - 4) : null;
  const gov = govParty(year);
  const splits = SPLIT_SENATE[year] || new Set();
  const demHouse = HOUSE_DEM[year] || HOUSE_DEM[2020];
  const states: Record<string, StateData> = {};

  for (const name of NAMES) {
    const pp = pres[name] || "REP";
    const flipped = prevPres ? prevPres[name] !== pp : false;
    const isSplit = splits.has(name);
    const baseS: Party = pp; // approximate senate lean from pres
    const totalH = HOUSE[name] || 1;
    const dH = demHouse[name] ?? Math.round(totalH * (pp === "DEM" ? 0.6 : 0.35));
    const rH = totalH - dH;

    states[name] = {
      president: { party: pp, flipped },
      senate: { split: isSplit, party1: baseS, party2: isSplit ? (baseS === "DEM" ? "REP" : "DEM") : baseS },
      house: { demReps: dH, repReps: rH, totalReps: totalH },
      governor: { party: gov[name] || "REP" },
      electoralVotes: EV[name] || 3,
    };
  }
  return { year, states };
}

export const ELECTORAL_HISTORY: YearData[] = [2000, 2004, 2008, 2012, 2016, 2020, 2024].map(buildYear);

export function getStateData(year: number, stateName: string): StateData {
  let closest = ELECTORAL_HISTORY[0];
  let minDist = Infinity;
  for (const yd of ELECTORAL_HISTORY) {
    const d = Math.abs(yd.year - year);
    if (d < minDist) { minDist = d; closest = yd; }
  }
  if (closest.states[stateName]) return closest.states[stateName];
  return { president: { party: "REP", flipped: false }, senate: { split: false, party1: "REP", party2: "REP" }, house: { demReps: 1, repReps: 1, totalReps: 2 }, governor: { party: "REP" }, electoralVotes: 3 };
}

// State geographic centroids for dot-density rendering [lon, lat]
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
