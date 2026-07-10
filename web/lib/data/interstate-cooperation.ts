// ─── Interstate Cooperation ───────────────────────────────────────────────────
// Real, named interstate compacts, authorities and regional bodies. Every entry
// below is an actual agreement with a verifiable membership list.
//
// `anchor` is the state the network map draws its connecting lines from. It is a
// presentation choice (usually the seat of the body, or the geographic hub), not
// a claim that the anchor state has special legal authority.
//
// `caveat` records places where membership is genuinely contested or changing,
// so the UI never presents a disputed roster as settled fact.

export type CooperationCategory =
  | "compacts"
  | "water"
  | "transport"
  | "power"
  | "emergency"
  | "environment";

export interface CooperationAgreement {
  id: string;
  category: CooperationCategory;
  name: { en: string; ro: string };
  /** Year established / entered into force. */
  year: number;
  /** Two-letter state abbreviations. DC and territories are deliberately excluded. */
  members: string[];
  /** State the map draws connecting lines from. */
  anchor: string;
  blurb: { en: string; ro: string };
  caveat?: { en: string; ro: string };
}

export const COOPERATION_CATEGORIES: {
  id: CooperationCategory;
  label: { en: string; ro: string };
  color: string;
}[] = [
  { id: "compacts",    label: { en: "Interstate Compacts",     ro: "Pacte interstatale" },      color: "#fbbf24" },
  { id: "water",       label: { en: "Shared Water",            ro: "Resurse de apă comune" },   color: "#38bdf8" },
  { id: "transport",   label: { en: "Transportation",          ro: "Rețele de transport" },     color: "#f87171" },
  { id: "power",       label: { en: "Power Grids",             ro: "Rețele electrice" },        color: "#a78bfa" },
  { id: "emergency",   label: { en: "Emergency Response",      ro: "Răspuns la urgențe" },      color: "#fb923c" },
  { id: "environment", label: { en: "Environmental Accords",   ro: "Acorduri de mediu" },       color: "#34d399" },
];

const ALL_50 = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

export const COOPERATION_AGREEMENTS: CooperationAgreement[] = [
  // ── Interstate compacts (the constitutional mechanism itself) ──
  {
    id: "adult-offender-supervision",
    category: "compacts",
    name: {
      en: "Interstate Compact for Adult Offender Supervision",
      ro: "Pactul interstatal pentru supravegherea infractorilor adulți",
    },
    year: 2002,
    members: ALL_50,
    anchor: "KY",
    blurb: {
      en: "Governs the transfer of probation and parole supervision across state lines. Ratified by all 50 states — one of the few compacts with truly universal membership.",
      ro: "Reglementează transferul supravegherii condiționate peste granițele statelor. Ratificat de toate cele 50 de state — unul dintre puținele pacte cu aderare universală.",
    },
  },
  {
    id: "multistate-tax-compact",
    category: "compacts",
    name: { en: "Multistate Tax Commission", ro: "Comisia fiscală multistatală" },
    year: 1967,
    members: ["AL","AK","AR","CO","DC","HI","ID","KS","MO","MT","NM","ND","OR","TX","UT","WA"].filter((s) => s !== "DC"),
    anchor: "CO",
    blurb: {
      en: "Created by the Multistate Tax Compact so states could coordinate how multi-state businesses are taxed, without waiting for Congress to act.",
      ro: "Creată prin Pactul fiscal multistatal, pentru ca statele să coordoneze impozitarea companiilor care operează în mai multe state.",
    },
    caveat: {
      en: "Membership tiers vary: states participate as full compact members, sovereignty members, or associate members. Full members shown.",
      ro: "Nivelurile de aderare diferă: state membre depline, membre suverane sau asociate. Sunt afișate statele membre depline.",
    },
  },

  // ── Shared water resources ──
  {
    id: "colorado-river-compact",
    category: "water",
    name: { en: "Colorado River Compact", ro: "Pactul râului Colorado" },
    year: 1922,
    members: ["CO", "WY", "UT", "NM", "AZ", "NV", "CA"],
    anchor: "CO",
    blurb: {
      en: "Divides the Colorado River between an Upper Basin (CO, WY, UT, NM) and a Lower Basin (AZ, NV, CA). It allocated more water than the river reliably carries — the root of today's shortage negotiations.",
      ro: "Împarte râul Colorado între Bazinul Superior (CO, WY, UT, NM) și cel Inferior (AZ, NV, CA). A alocat mai multă apă decât transportă râul — cauza negocierilor actuale privind seceta.",
    },
  },
  {
    id: "great-lakes-compact",
    category: "water",
    name: {
      en: "Great Lakes–St. Lawrence River Basin Compact",
      ro: "Pactul bazinului Marilor Lacuri și al fluviului Sf. Laurențiu",
    },
    year: 2008,
    members: ["IL", "IN", "MI", "MN", "NY", "OH", "PA", "WI"],
    anchor: "MI",
    blurb: {
      en: "Bans most diversions of water out of the Great Lakes basin. Eight states — holding roughly a fifth of the world's surface fresh water — agreed to govern it jointly.",
      ro: "Interzice majoritatea devierilor de apă din bazinul Marilor Lacuri. Opt state — care dețin aproximativ o cincime din apa dulce de suprafață a lumii — o administrează împreună.",
    },
  },
  {
    id: "delaware-river-basin",
    category: "water",
    name: { en: "Delaware River Basin Commission", ro: "Comisia bazinului râului Delaware" },
    year: 1961,
    members: ["DE", "NJ", "NY", "PA"],
    anchor: "PA",
    blurb: {
      en: "The first time the federal government and a group of states joined as equal partners in a single regulatory agency, managing one river basin across four states.",
      ro: "Prima dată când guvernul federal și un grup de state s-au alăturat ca parteneri egali într-o singură agenție de reglementare a unui bazin hidrografic.",
    },
  },

  // ── Transportation networks ──
  {
    id: "port-authority-ny-nj",
    category: "transport",
    name: { en: "Port Authority of New York & New Jersey", ro: "Autoritatea Portuară New York și New Jersey" },
    year: 1921,
    members: ["NY", "NJ"],
    anchor: "NY",
    blurb: {
      en: "The first interstate agency created under the Constitution's Compact Clause. It runs JFK, LaGuardia, Newark, the George Washington Bridge, the PATH trains and the port itself.",
      ro: "Prima agenție interstatală creată în baza Clauzei Pactelor din Constituție. Administrează JFK, LaGuardia, Newark, podul George Washington și portul.",
    },
  },
  {
    id: "wmata",
    category: "transport",
    name: { en: "Washington Metropolitan Area Transit Authority", ro: "Autoritatea de transport a zonei Washington" },
    year: 1967,
    members: ["MD", "VA"],
    anchor: "VA",
    blurb: {
      en: "Runs the Washington Metro across two states and the District of Columbia — a transit system created by compact because no single jurisdiction could build it.",
      ro: "Operează metroul din Washington în două state și în Districtul Columbia — un sistem creat prin pact, pentru că nicio jurisdicție nu îl putea construi singură.",
    },
  },

  // ── Regional power grids ──
  {
    id: "pjm",
    category: "power",
    name: { en: "PJM Interconnection", ro: "Interconexiunea PJM" },
    year: 1927,
    members: ["DE", "IL", "IN", "KY", "MD", "MI", "NJ", "NC", "OH", "PA", "TN", "VA", "WV"],
    anchor: "PA",
    blurb: {
      en: "The largest wholesale electricity market on Earth, dispatching power for roughly 65 million people. It began in 1927 as three utilities agreeing to share generation.",
      ro: "Cea mai mare piață angro de electricitate din lume, alimentând circa 65 de milioane de oameni. A început în 1927, cu trei companii care și-au împărțit producția.",
    },
    caveat: {
      en: "PJM serves all or part of each state listed; several are only partially inside its footprint.",
      ro: "PJM deservește integral sau parțial fiecare stat listat; unele sunt incluse doar parțial.",
    },
  },
  {
    id: "iso-new-england",
    category: "power",
    name: { en: "ISO New England", ro: "ISO New England" },
    year: 1997,
    members: ["CT", "ME", "MA", "NH", "RI", "VT"],
    anchor: "MA",
    blurb: {
      en: "Six states operate as a single electricity market and control area — the whole of New England dispatched from one control room.",
      ro: "Șase state operează ca o singură piață de electricitate — întreaga Noua Anglie, coordonată dintr-o singură cameră de comandă.",
    },
  },
  {
    id: "ercot",
    category: "power",
    name: { en: "ERCOT — The Texas Interconnection", ro: "ERCOT — Interconexiunea Texas" },
    year: 1970,
    members: ["TX"],
    anchor: "TX",
    blurb: {
      en: "The exception that proves the rule: Texas runs its own grid, deliberately isolated from its neighbours to stay outside federal interstate regulation.",
      ro: "Excepția care confirmă regula: Texas își operează propria rețea, izolată intenționat de vecini pentru a rămâne în afara reglementării federale interstatale.",
    },
  },

  // ── Emergency response ──
  {
    id: "emac",
    category: "emergency",
    name: { en: "Emergency Management Assistance Compact (EMAC)", ro: "Pactul de asistență în situații de urgență (EMAC)" },
    year: 1996,
    members: ALL_50,
    anchor: "KY",
    blurb: {
      en: "Ratified by Congress in 1996, EMAC lets any state request personnel and equipment from any other during a disaster, with liability and reimbursement settled in advance. Every state is a member.",
      ro: "Ratificat de Congres în 1996, EMAC permite oricărui stat să solicite personal și echipamente de la altul în caz de dezastru, cu răspunderea și rambursarea stabilite în avans. Toate statele sunt membre.",
    },
  },

  // ── Environmental agreements ──
  {
    id: "rggi",
    category: "environment",
    name: { en: "Regional Greenhouse Gas Initiative (RGGI)", ro: "Inițiativa regională privind gazele cu efect de seră (RGGI)" },
    year: 2009,
    members: ["CT", "DE", "ME", "MD", "MA", "NH", "NJ", "NY", "RI", "VT"],
    anchor: "NY",
    blurb: {
      en: "The first mandatory cap-and-trade programme for power-plant carbon in the United States, run cooperatively by the participating states rather than by Washington.",
      ro: "Primul program obligatoriu de plafonare și tranzacționare a emisiilor centralelor electrice din SUA, administrat de statele participante, nu de Washington.",
    },
    caveat: {
      en: "Membership shifts: Virginia withdrew at the end of 2023, and Pennsylvania's participation has been tied up in litigation. The ten long-standing members are shown.",
      ro: "Componența se schimbă: Virginia s-a retras la sfârșitul lui 2023, iar participarea Pennsylvaniei este blocată în instanță. Sunt afișate cele zece state membre de lungă durată.",
    },
  },
  {
    id: "ozone-transport-commission",
    category: "environment",
    name: { en: "Ozone Transport Commission", ro: "Comisia pentru transportul ozonului" },
    year: 1990,
    members: ["CT", "DE", "ME", "MD", "MA", "NH", "NJ", "NY", "PA", "RI", "VT", "VA"],
    anchor: "NJ",
    blurb: {
      en: "Created by the Clean Air Act because smog does not stop at state lines: upwind states and downwind states are forced to plan air quality together.",
      ro: "Creată prin Clean Air Act, pentru că smogul nu se oprește la granițele statelor: statele din amonte și din aval planifică împreună calitatea aerului.",
    },
    caveat: {
      en: "Only the northern Virginia counties fall inside the statutory Ozone Transport Region.",
      ro: "Doar comitatele din nordul Virginiei se află în Regiunea statutară de transport al ozonului.",
    },
  },
];
