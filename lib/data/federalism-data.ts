// ─── Federalism State Policy Data (All 50 States) ────────────────────────────
// Extended data for the interactive Federalism Simulator.
// Each state includes fiscal, social, and regulatory dimensions,
// plus real outcome metrics.

export interface StatePolicyExtended {
  id: string;              // 2-letter abbreviation
  name: string;
  abbr: string;
  // ── Fiscal Engine (A) ──
  incomeTax: number;       // top marginal rate, 0 = no income tax
  corporateTax: number;    // top marginal rate
  // ── Social Framework (B) ──
  gunRights: number;       // 1 = strictest, 10 = Constitutional Carry
  cannabisLegal: number;   // 1 = full prohibition, 10 = full recreational
  // ── Regulatory Matrix (C) ──
  regulatoryIndex: number; // 1 = lightest, 10 = heaviest
  // ── Outcomes ──
  gdpGrowth5yr: number;
  netMigration: number;    // thousands over 5 years (positive = inflow)
  medianIncome: number;    // median household income
  unemploymentRate: number;
}

// All 50 states + DC — sourced from Tax Foundation, BLS, Census Bureau, Giffords, NORML
export const STATES_50: StatePolicyExtended[] = [
  // State, Abbr, IncomeTax, CorpTax, Gun(1-10), Cannabis(1-10), RegIdx, GDP5yr, NetMig(k), MedInc, Unemp
  { id:"AL", name:"Alabama",        abbr:"AL", incomeTax:5.0,  corporateTax:6.5,  gunRights:9, cannabisLegal:3, regulatoryIndex:3.0, gdpGrowth5yr:2.1, netMigration:25,   medianIncome:56956, unemploymentRate:2.8 },
  { id:"AK", name:"Alaska",         abbr:"AK", incomeTax:0,    corporateTax:9.4,  gunRights:10,cannabisLegal:10,regulatoryIndex:4.0, gdpGrowth5yr:0.8, netMigration:-12,  medianIncome:77790, unemploymentRate:4.5 },
  { id:"AZ", name:"Arizona",        abbr:"AZ", incomeTax:2.5,  corporateTax:4.9,  gunRights:9, cannabisLegal:10,regulatoryIndex:3.8, gdpGrowth5yr:3.6, netMigration:99,   medianIncome:72581, unemploymentRate:3.6 },
  { id:"AR", name:"Arkansas",       abbr:"AR", incomeTax:4.4,  corporateTax:5.3,  gunRights:9, cannabisLegal:5, regulatoryIndex:3.5, gdpGrowth5yr:2.4, netMigration:18,   medianIncome:52528, unemploymentRate:3.4 },
  { id:"CA", name:"California",     abbr:"CA", incomeTax:13.3, corporateTax:8.84, gunRights:2, cannabisLegal:10,regulatoryIndex:8.7, gdpGrowth5yr:2.8, netMigration:-340, medianIncome:91905, unemploymentRate:4.8 },
  { id:"CO", name:"Colorado",       abbr:"CO", incomeTax:4.4,  corporateTax:4.4,  gunRights:5, cannabisLegal:10,regulatoryIndex:4.8, gdpGrowth5yr:3.1, netMigration:44,   medianIncome:87598, unemploymentRate:3.3 },
  { id:"CT", name:"Connecticut",    abbr:"CT", incomeTax:6.99, corporateTax:7.5,  gunRights:2, cannabisLegal:10,regulatoryIndex:7.5, gdpGrowth5yr:1.8, netMigration:-28,  medianIncome:83771, unemploymentRate:3.8 },
  { id:"DE", name:"Delaware",       abbr:"DE", incomeTax:6.6,  corporateTax:8.7,  gunRights:4, cannabisLegal:5, regulatoryIndex:5.0, gdpGrowth5yr:1.5, netMigration:12,   medianIncome:75275, unemploymentRate:4.0 },
  { id:"FL", name:"Florida",        abbr:"FL", incomeTax:0,    corporateTax:5.5,  gunRights:7, cannabisLegal:5, regulatoryIndex:3.2, gdpGrowth5yr:4.0, netMigration:300,  medianIncome:67917, unemploymentRate:3.0 },
  { id:"GA", name:"Georgia",        abbr:"GA", incomeTax:5.49, corporateTax:5.75, gunRights:8, cannabisLegal:3, regulatoryIndex:3.5, gdpGrowth5yr:3.5, netMigration:95,   medianIncome:66559, unemploymentRate:3.2 },
  { id:"HI", name:"Hawaii",         abbr:"HI", incomeTax:11.0, corporateTax:6.4,  gunRights:1, cannabisLegal:5, regulatoryIndex:7.0, gdpGrowth5yr:1.2, netMigration:-22,  medianIncome:84857, unemploymentRate:3.1 },
  { id:"ID", name:"Idaho",          abbr:"ID", incomeTax:5.8,  corporateTax:5.8,  gunRights:10,cannabisLegal:1, regulatoryIndex:2.8, gdpGrowth5yr:4.1, netMigration:52,   medianIncome:65988, unemploymentRate:2.9 },
  { id:"IL", name:"Illinois",       abbr:"IL", incomeTax:4.95, corporateTax:9.5,  gunRights:3, cannabisLegal:10,regulatoryIndex:7.2, gdpGrowth5yr:1.5, netMigration:-141, medianIncome:72205, unemploymentRate:4.3 },
  { id:"IN", name:"Indiana",        abbr:"IN", incomeTax:3.05, corporateTax:4.9,  gunRights:9, cannabisLegal:1, regulatoryIndex:3.0, gdpGrowth5yr:2.5, netMigration:15,   medianIncome:62743, unemploymentRate:3.3 },
  { id:"IA", name:"Iowa",           abbr:"IA", incomeTax:5.7,  corporateTax:8.4,  gunRights:9, cannabisLegal:3, regulatoryIndex:4.0, gdpGrowth5yr:2.0, netMigration:-5,   medianIncome:65573, unemploymentRate:2.8 },
  { id:"KS", name:"Kansas",         abbr:"KS", incomeTax:5.7,  corporateTax:4.0,  gunRights:9, cannabisLegal:3, regulatoryIndex:3.5, gdpGrowth5yr:2.2, netMigration:-8,   medianIncome:64521, unemploymentRate:2.9 },
  { id:"KY", name:"Kentucky",       abbr:"KY", incomeTax:4.0,  corporateTax:5.0,  gunRights:9, cannabisLegal:5, regulatoryIndex:4.0, gdpGrowth5yr:2.0, netMigration:10,   medianIncome:55573, unemploymentRate:3.8 },
  { id:"LA", name:"Louisiana",      abbr:"LA", incomeTax:4.25, corporateTax:7.5,  gunRights:8, cannabisLegal:5, regulatoryIndex:4.5, gdpGrowth5yr:1.2, netMigration:-30,  medianIncome:52087, unemploymentRate:3.9 },
  { id:"ME", name:"Maine",          abbr:"ME", incomeTax:7.15, corporateTax:8.93, gunRights:9, cannabisLegal:10,regulatoryIndex:5.5, gdpGrowth5yr:1.8, netMigration:14,   medianIncome:64767, unemploymentRate:3.0 },
  { id:"MD", name:"Maryland",       abbr:"MD", incomeTax:5.75, corporateTax:8.25, gunRights:2, cannabisLegal:10,regulatoryIndex:6.5, gdpGrowth5yr:2.0, netMigration:-18,  medianIncome:87063, unemploymentRate:3.1 },
  { id:"MA", name:"Massachusetts",  abbr:"MA", incomeTax:5.0,  corporateTax:8.0,  gunRights:2, cannabisLegal:10,regulatoryIndex:7.0, gdpGrowth5yr:2.5, netMigration:-15,  medianIncome:89645, unemploymentRate:3.4 },
  { id:"MI", name:"Michigan",       abbr:"MI", incomeTax:4.25, corporateTax:6.0,  gunRights:6, cannabisLegal:10,regulatoryIndex:5.0, gdpGrowth5yr:2.0, netMigration:-10,  medianIncome:63498, unemploymentRate:4.1 },
  { id:"MN", name:"Minnesota",      abbr:"MN", incomeTax:9.85, corporateTax:9.8,  gunRights:5, cannabisLegal:10,regulatoryIndex:6.5, gdpGrowth5yr:2.3, netMigration:8,    medianIncome:80441, unemploymentRate:2.9 },
  { id:"MS", name:"Mississippi",    abbr:"MS", incomeTax:5.0,  corporateTax:5.0,  gunRights:10,cannabisLegal:5, regulatoryIndex:3.0, gdpGrowth5yr:1.5, netMigration:-15,  medianIncome:48610, unemploymentRate:3.7 },
  { id:"MO", name:"Missouri",       abbr:"MO", incomeTax:4.95, corporateTax:4.0,  gunRights:10,cannabisLegal:10,regulatoryIndex:3.5, gdpGrowth5yr:2.1, netMigration:5,    medianIncome:61043, unemploymentRate:2.7 },
  { id:"MT", name:"Montana",        abbr:"MT", incomeTax:5.9,  corporateTax:6.75, gunRights:9, cannabisLegal:10,regulatoryIndex:3.5, gdpGrowth5yr:3.0, netMigration:18,   medianIncome:63249, unemploymentRate:2.6 },
  { id:"NE", name:"Nebraska",       abbr:"NE", incomeTax:5.84, corporateTax:5.58, gunRights:8, cannabisLegal:3, regulatoryIndex:3.5, gdpGrowth5yr:2.4, netMigration:5,    medianIncome:66644, unemploymentRate:2.1 },
  { id:"NV", name:"Nevada",         abbr:"NV", incomeTax:0,    corporateTax:0,    gunRights:7, cannabisLegal:10,regulatoryIndex:3.5, gdpGrowth5yr:3.5, netMigration:85,   medianIncome:65686, unemploymentRate:5.0 },
  { id:"NH", name:"New Hampshire",  abbr:"NH", incomeTax:0,    corporateTax:7.5,  gunRights:10,cannabisLegal:5, regulatoryIndex:3.0, gdpGrowth5yr:2.8, netMigration:20,   medianIncome:88841, unemploymentRate:2.3 },
  { id:"NJ", name:"New Jersey",     abbr:"NJ", incomeTax:10.75,corporateTax:11.5, gunRights:2, cannabisLegal:10,regulatoryIndex:7.5, gdpGrowth5yr:1.8, netMigration:-50,  medianIncome:89703, unemploymentRate:4.0 },
  { id:"NM", name:"New Mexico",     abbr:"NM", incomeTax:5.9,  corporateTax:5.9,  gunRights:6, cannabisLegal:10,regulatoryIndex:4.5, gdpGrowth5yr:2.0, netMigration:5,    medianIncome:53992, unemploymentRate:3.9 },
  { id:"NY", name:"New York",       abbr:"NY", incomeTax:10.9, corporateTax:7.25, gunRights:2, cannabisLegal:10,regulatoryIndex:7.8, gdpGrowth5yr:2.1, netMigration:-250, medianIncome:74314, unemploymentRate:4.1 },
  { id:"NC", name:"North Carolina", abbr:"NC", incomeTax:4.5,  corporateTax:2.5,  gunRights:7, cannabisLegal:3, regulatoryIndex:3.0, gdpGrowth5yr:3.7, netMigration:120,  medianIncome:64439, unemploymentRate:3.4 },
  { id:"ND", name:"North Dakota",   abbr:"ND", incomeTax:1.95, corporateTax:4.31, gunRights:9, cannabisLegal:5, regulatoryIndex:2.5, gdpGrowth5yr:1.8, netMigration:-3,   medianIncome:68131, unemploymentRate:2.0 },
  { id:"OH", name:"Ohio",           abbr:"OH", incomeTax:3.5,  corporateTax:0,    gunRights:8, cannabisLegal:10,regulatoryIndex:4.5, gdpGrowth5yr:1.8, netMigration:-40,  medianIncome:61938, unemploymentRate:3.8 },
  { id:"OK", name:"Oklahoma",       abbr:"OK", incomeTax:4.75, corporateTax:4.0,  gunRights:10,cannabisLegal:5, regulatoryIndex:3.0, gdpGrowth5yr:2.0, netMigration:10,   medianIncome:55826, unemploymentRate:3.0 },
  { id:"OR", name:"Oregon",         abbr:"OR", incomeTax:9.9,  corporateTax:7.6,  gunRights:4, cannabisLegal:10,regulatoryIndex:6.0, gdpGrowth5yr:2.5, netMigration:25,   medianIncome:71562, unemploymentRate:3.7 },
  { id:"PA", name:"Pennsylvania",   abbr:"PA", incomeTax:3.07, corporateTax:8.99, gunRights:6, cannabisLegal:5, regulatoryIndex:5.5, gdpGrowth5yr:1.9, netMigration:-30,  medianIncome:68957, unemploymentRate:3.6 },
  { id:"RI", name:"Rhode Island",   abbr:"RI", incomeTax:5.99, corporateTax:7.0,  gunRights:3, cannabisLegal:10,regulatoryIndex:6.5, gdpGrowth5yr:1.5, netMigration:-3,   medianIncome:71169, unemploymentRate:3.2 },
  { id:"SC", name:"South Carolina", abbr:"SC", incomeTax:6.4,  corporateTax:5.0,  gunRights:8, cannabisLegal:3, regulatoryIndex:3.5, gdpGrowth5yr:3.2, netMigration:72,   medianIncome:59318, unemploymentRate:3.3 },
  { id:"SD", name:"South Dakota",   abbr:"SD", incomeTax:0,    corporateTax:0,    gunRights:10,cannabisLegal:10,regulatoryIndex:2.0, gdpGrowth5yr:2.8, netMigration:8,    medianIncome:63920, unemploymentRate:2.1 },
  { id:"TN", name:"Tennessee",      abbr:"TN", incomeTax:0,    corporateTax:6.5,  gunRights:9, cannabisLegal:3, regulatoryIndex:2.5, gdpGrowth5yr:3.8, netMigration:89,   medianIncome:59695, unemploymentRate:3.3 },
  { id:"TX", name:"Texas",          abbr:"TX", incomeTax:0,    corporateTax:0,    gunRights:9, cannabisLegal:3, regulatoryIndex:2.1, gdpGrowth5yr:4.2, netMigration:380,  medianIncome:67321, unemploymentRate:3.9 },
  { id:"UT", name:"Utah",           abbr:"UT", incomeTax:4.65, corporateTax:4.65, gunRights:8, cannabisLegal:5, regulatoryIndex:2.5, gdpGrowth5yr:4.5, netMigration:45,   medianIncome:79449, unemploymentRate:2.5 },
  { id:"VT", name:"Vermont",        abbr:"VT", incomeTax:8.75, corporateTax:8.5,  gunRights:7, cannabisLegal:10,regulatoryIndex:6.5, gdpGrowth5yr:1.2, netMigration:5,    medianIncome:65792, unemploymentRate:2.2 },
  { id:"VA", name:"Virginia",       abbr:"VA", incomeTax:5.75, corporateTax:6.0,  gunRights:7, cannabisLegal:5, regulatoryIndex:4.0, gdpGrowth5yr:2.8, netMigration:40,   medianIncome:80615, unemploymentRate:2.9 },
  { id:"WA", name:"Washington",     abbr:"WA", incomeTax:0,    corporateTax:0,    gunRights:4, cannabisLegal:10,regulatoryIndex:5.5, gdpGrowth5yr:3.2, netMigration:65,   medianIncome:84247, unemploymentRate:3.8 },
  { id:"WV", name:"West Virginia",  abbr:"WV", incomeTax:5.12, corporateTax:6.5,  gunRights:10,cannabisLegal:5, regulatoryIndex:4.0, gdpGrowth5yr:0.5, netMigration:-20,  medianIncome:48037, unemploymentRate:4.0 },
  { id:"WI", name:"Wisconsin",      abbr:"WI", incomeTax:7.65, corporateTax:7.9,  gunRights:6, cannabisLegal:3, regulatoryIndex:5.0, gdpGrowth5yr:2.0, netMigration:-5,   medianIncome:67125, unemploymentRate:2.9 },
  { id:"WY", name:"Wyoming",        abbr:"WY", incomeTax:0,    corporateTax:0,    gunRights:10,cannabisLegal:1, regulatoryIndex:1.5, gdpGrowth5yr:1.5, netMigration:-2,   medianIncome:68002, unemploymentRate:3.3 },
];
