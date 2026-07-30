// ─── Interstate Cooperation ───────────────────────────────────────────────────
// Real, named interstate compacts, authorities and regional bodies. Every entry
// below is an actual agreement with a verifiable membership list.
//
// `hub` is the body's real administrative seat (a headquarters city, or the place
// the compact was signed). Earlier versions of this file used a member state as a
// visual "anchor", which wrongly implied that state was central to the agreement —
// Kentucky is not the centre of EMAC; it is simply where the secretariat sits.
//
// `network: false` marks agreements where nearly every state is a member. Drawing
// hub-and-spoke lines for those would imply a hierarchy that does not exist, so
// the map fills every member instead and marks the seat.
//
// `caveat` records places where membership is genuinely contested or changing, so
// the UI never presents a disputed roster as settled fact.

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
  /** The body's real seat — headquarters city, or where the compact was signed. */
  hub: {
    label: { en: string; ro: string };
    /** [longitude, latitude] */
    coordinates: [number, number];
  };
  /** Draw hub→member connecting lines. False for near-universal compacts. */
  network: boolean;
  blurb: { en: string; ro: string };
  history: { en: string; ro: string };
  caveat?: { en: string; ro: string };
}

export const COOPERATION_CATEGORIES: {
  id: CooperationCategory;
  label: { en: string; ro: string };
  color: string;
}[] = [
  { id: "compacts",    label: { en: "Interstate Compacts",   ro: "Pacte interstatale" },    color: "#fbbf24" },
  { id: "water",       label: { en: "Shared Water",          ro: "Resurse de apă comune" }, color: "#38bdf8" },
  { id: "transport",   label: { en: "Transportation",        ro: "Rețele de transport" },   color: "#f87171" },
  { id: "power",       label: { en: "Power Grids",           ro: "Rețele electrice" },      color: "#a78bfa" },
  { id: "emergency",   label: { en: "Emergency Response",    ro: "Răspuns la urgențe" },    color: "#fb923c" },
  { id: "environment", label: { en: "Environmental Accords", ro: "Acorduri de mediu" },     color: "#34d399" },
];

const ALL_50 = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

// Frequently-used seats.
const LEXINGTON_KY: [number, number] = [-84.5037, 38.0406];
const WASHINGTON_DC: [number, number] = [-77.0369, 38.9072];
const NEW_YORK_NY: [number, number] = [-74.006, 40.7128];

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
    network: false,
    hub: {
      label: { en: "Commission seat: Lexington, Kentucky", ro: "Sediul comisiei: Lexington, Kentucky" },
      coordinates: LEXINGTON_KY,
    },
    blurb: {
      en: "Governs the transfer of probation and parole supervision across state lines. Ratified by all 50 states — one of the few compacts with truly universal membership.",
      ro: "Reglementează transferul supravegherii condiționate peste granițele statelor. Ratificat de toate cele 50 de state — unul dintre puținele pacte cu aderare universală.",
    },
    history: {
      en: "Its 1937 predecessor was a single page and had no enforcement mechanism, so states simply ignored transfer requests they disliked. After six decades of drift the states rewrote it from scratch, creating an interstate commission with rulemaking power. It is a rare case of the states building their own regulator rather than waiting for Congress.",
      ro: "Predecesorul din 1937 avea o singură pagină și niciun mecanism de aplicare, așa că statele ignorau cererile de transfer incomode. După șase decenii, statele l-au rescris integral, creând o comisie interstatală cu putere de reglementare, un caz rar în care statele își construiesc propriul regulator.",
    },
  },
  {
    id: "multistate-tax-compact",
    category: "compacts",
    name: { en: "Multistate Tax Commission", ro: "Comisia fiscală multistatală" },
    year: 1967,
    members: ["AL", "AK", "AR", "CO", "HI", "ID", "KS", "MO", "MT", "NM", "ND", "OR", "TX", "UT", "WA"],
    network: true,
    hub: { label: { en: "Headquarters — Washington, D.C.", ro: "Sediu — Washington, D.C." }, coordinates: WASHINGTON_DC },
    blurb: {
      en: "Created by the Multistate Tax Compact so states could coordinate how multi-state businesses are taxed, without waiting for Congress to act.",
      ro: "Creată prin Pactul fiscal multistatal, pentru ca statele să coordoneze impozitarea companiilor care operează în mai multe state.",
    },
    history: {
      en: "Congress spent the early 1960s threatening to federalise state business taxation after a Supreme Court ruling exposed how inconsistent it had become. The states pre-empted that by writing their own uniform apportionment rules — a defensive compact designed specifically to keep Washington out.",
      ro: "La începutul anilor 1960, Congresul amenința să federalizeze impozitarea afacerilor. Statele au anticipat, scriindu-și propriile reguli uniforme — un pact defensiv creat tocmai pentru a ține Washingtonul deoparte.",
    },
    caveat: {
      en: "Membership tiers vary: states participate as full compact members, sovereignty members, or associate members. Full members are shown.",
      ro: "Nivelurile de aderare diferă: membre depline, suverane sau asociate. Sunt afișate statele membre depline.",
    },
  },

  // ── Shared water resources ──
  {
    id: "colorado-river-compact",
    category: "water",
    name: { en: "Colorado River Compact", ro: "Pactul râului Colorado" },
    year: 1922,
    members: ["CO", "WY", "UT", "NM", "AZ", "NV", "CA"],
    network: true,
    hub: {
      label: { en: "Signed at Bishop's Lodge — Santa Fe, New Mexico", ro: "Semnat la Bishop's Lodge — Santa Fe, New Mexico" },
      coordinates: [-105.9378, 35.687],
    },
    blurb: {
      en: "Divides the Colorado River between an Upper Basin (CO, WY, UT, NM) and a Lower Basin (AZ, NV, CA). It allocated more water than the river reliably carries — the root of today's shortage negotiations.",
      ro: "Împarte râul Colorado între Bazinul Superior (CO, WY, UT, NM) și cel Inferior (AZ, NV, CA). A alocat mai multă apă decât transportă râul — cauza negocierilor actuale privind seceta.",
    },
    history: {
      en: "The negotiators, chaired by Commerce Secretary Herbert Hoover, used streamflow records from an unusually wet stretch of years and concluded the river carried about 16.4 million acre-feet annually. The long-run average is closer to 13 million. Every drought crisis since has been an argument with the arithmetic of 1922.",
      ro: "Negociatorii, conduși de secretarul comerțului Herbert Hoover, au folosit date dintr-o perioadă neobișnuit de ploioasă și au estimat circa 16,4 milioane acri-picioare pe an. Media reală e mai aproape de 13 milioane. Fiecare criză de secetă de atunci este o dispută cu aritmetica anului 1922.",
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
    network: true,
    hub: {
      label: { en: "Great Lakes Commission — Ann Arbor, Michigan", ro: "Comisia Marilor Lacuri — Ann Arbor, Michigan" },
      coordinates: [-83.743, 42.2808],
    },
    blurb: {
      en: "Bans most diversions of water out of the Great Lakes basin. Eight states — holding roughly a fifth of the world's surface fresh water — agreed to govern it jointly.",
      ro: "Interzice majoritatea devierilor de apă din bazinul Marilor Lacuri. Opt state — care dețin aproximativ o cincime din apa dulce de suprafață a lumii — o administrează împreună.",
    },
    history: {
      en: "The trigger was a 1998 Ontario permit allowing a company to ship Lake Superior water to Asia by tanker. The outcry produced a decade of negotiation and, in 2008, a compact ratified by eight legislatures and consented to by Congress — with Ontario and Quebec joining through a parallel agreement.",
      ro: "Declanșatorul a fost un permis din 1998 din Ontario care permitea transportul apei din Lacul Superior în Asia cu petroliere. Indignarea a produs un deceniu de negocieri și, în 2008, un pact ratificat de opt legislaturi și aprobat de Congres.",
    },
  },
  {
    id: "delaware-river-basin",
    category: "water",
    name: { en: "Delaware River Basin Commission", ro: "Comisia bazinului râului Delaware" },
    year: 1961,
    members: ["DE", "NJ", "NY", "PA"],
    network: true,
    hub: { label: { en: "Headquarters — West Trenton, New Jersey", ro: "Sediu — West Trenton, New Jersey" }, coordinates: [-74.8135, 40.2601] },
    blurb: {
      en: "The first time the federal government and a group of states joined as equal partners in a single regulatory agency, managing one river basin across four states.",
      ro: "Prima dată când guvernul federal și un grup de state s-au alăturat ca parteneri egali într-o singură agenție de reglementare a unui bazin hidrografic.",
    },
    history: {
      en: "Four states spent decades suing each other over Delaware water, twice reaching the Supreme Court. Rather than litigate a third time they wrote a compact in which the federal government holds one vote alongside four governors — an arrangement that still has no real parallel.",
      ro: "Patru state s-au judecat decenii pentru apa Delaware, ajungând de două ori la Curtea Supremă. În loc de un al treilea proces, au scris un pact în care guvernul federal are un vot alături de patru guvernatori — un aranjament fără paralelă reală.",
    },
  },

  // ── Transportation networks ──
  {
    id: "port-authority-ny-nj",
    category: "transport",
    name: { en: "Port Authority of New York & New Jersey", ro: "Autoritatea Portuară New York și New Jersey" },
    year: 1921,
    members: ["NY", "NJ"],
    network: true,
    hub: { label: { en: "Headquarters — New York, New York", ro: "Sediu — New York, New York" }, coordinates: NEW_YORK_NY },
    blurb: {
      en: "The first interstate agency created under the Constitution's Compact Clause. It runs JFK, LaGuardia, Newark, the George Washington Bridge, the PATH trains and the port itself.",
      ro: "Prima agenție interstatală creată în baza Clauzei Pactelor din Constituție. Administrează JFK, LaGuardia, Newark, podul George Washington și portul.",
    },
    history: {
      en: "New York and New Jersey fought over harbour rights for a century, at one point sending armed men onto the water. The 1921 compact ended it by inventing something new: a self-financing public authority, funded by tolls and bonds rather than taxes, answering to two governors. Robert Moses would later build an empire on the model.",
      ro: "New York și New Jersey s-au luptat un secol pentru drepturile portuare. Pactul din 1921 a inventat ceva nou: o autoritate publică autofinanțată, susținută de taxe de trecere și obligațiuni, răspunzând în fața a doi guvernatori.",
    },
  },
  {
    id: "wmata",
    category: "transport",
    name: { en: "Washington Metropolitan Area Transit Authority", ro: "Autoritatea de transport a zonei Washington" },
    year: 1967,
    members: ["MD", "VA"],
    network: true,
    hub: { label: { en: "Headquarters — Washington, D.C.", ro: "Sediu — Washington, D.C." }, coordinates: WASHINGTON_DC },
    blurb: {
      en: "Runs the Washington Metro across two states and the District of Columbia — a transit system created by compact because no single jurisdiction could build it.",
      ro: "Operează metroul din Washington în două state și în Districtul Columbia — un sistem creat prin pact, pentru că nicio jurisdicție nu îl putea construi singură.",
    },
    history: {
      en: "The capital region's commuters live in Maryland and Virginia but work in a federal district with no state of its own, so no ordinary government could tax or build across the whole system. Congress consented to a three-way compact in 1966; the first trains ran in 1976.",
      ro: "Navetiștii capitalei locuiesc în Maryland și Virginia, dar lucrează într-un district federal fără stat propriu. Congresul a aprobat un pact tripartit în 1966; primele trenuri au circulat în 1976.",
    },
  },

  // ── Regional power grids ──
  {
    id: "pjm",
    category: "power",
    name: { en: "PJM Interconnection", ro: "Interconexiunea PJM" },
    year: 1927,
    members: ["DE", "IL", "IN", "KY", "MD", "MI", "NJ", "NC", "OH", "PA", "TN", "VA", "WV"],
    network: true,
    hub: { label: { en: "Control centre — Audubon, Pennsylvania", ro: "Centru de comandă — Audubon, Pennsylvania" }, coordinates: [-75.4302, 40.1112] },
    blurb: {
      en: "The largest wholesale electricity market on Earth, dispatching power for roughly 65 million people. It began in 1927 as three utilities agreeing to share generation.",
      ro: "Cea mai mare piață angro de electricitate din lume, alimentând circa 65 de milioane de oameni. A început în 1927, cu trei companii care și-au împărțit producția.",
    },
    history: {
      en: "Its name is a fossil: Pennsylvania–New Jersey–Maryland, the three states of the original 1927 pool. Utilities discovered that sharing generating capacity was cheaper than each building its own reserve margin. That insight — pooling reserves across borders — is the reason the modern grid exists.",
      ro: "Numele e o fosilă: Pennsylvania–New Jersey–Maryland, cele trei state ale grupului original din 1927. Companiile au descoperit că partajarea capacității de producție e mai ieftină decât rezervele individuale.",
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
    network: true,
    hub: { label: { en: "Control centre — Holyoke, Massachusetts", ro: "Centru de comandă — Holyoke, Massachusetts" }, coordinates: [-72.6412, 42.2043] },
    blurb: {
      en: "Six states operate as a single electricity market and control area — the whole of New England dispatched from one control room.",
      ro: "Șase state operează ca o singură piață de electricitate — întreaga Noua Anglie, coordonată dintr-o singură cameră de comandă.",
    },
    history: {
      en: "New England has almost no fossil fuel of its own, so its six states have always imported power. When the region deregulated in the 1990s they chose a single independent operator rather than six competing ones — which is why a cold snap in Maine changes the price of electricity in Connecticut.",
      ro: "Noua Anglie nu are practic combustibili fosili proprii. Când regiunea s-a dereglementat în anii 1990, cele șase state au ales un singur operator independent — de aceea un val de frig în Maine schimbă prețul curentului în Connecticut.",
    },
  },
  {
    id: "ercot",
    category: "power",
    name: { en: "ERCOT — The Texas Interconnection", ro: "ERCOT — Interconexiunea Texas" },
    year: 1970,
    members: ["TX"],
    network: false,
    hub: { label: { en: "Control centre — Taylor, Texas", ro: "Centru de comandă — Taylor, Texas" }, coordinates: [-97.4092, 30.571] },
    blurb: {
      en: "The exception that proves the rule: Texas runs its own grid, deliberately isolated from its neighbours to stay outside federal interstate regulation.",
      ro: "Excepția care confirmă regula: Texas își operează propria rețea, izolată intenționat de vecini pentru a rămâne în afara reglementării federale interstatale.",
    },
    history: {
      en: "Because almost no power crosses the state line, ERCOT is not engaged in interstate commerce and so escapes Federal Energy Regulatory Commission jurisdiction. That independence was tested in February 2021, when Winter Storm Uri left millions without heat and Texas could import very little help.",
      ro: "Fiindcă aproape niciun curent nu traversează granița, ERCOT nu face comerț interstatal și scapă de jurisdicția FERC. Independența a fost testată în februarie 2021, când furtuna Uri a lăsat milioane de oameni fără căldură.",
    },
  },

  // ── Emergency response ──
  {
    id: "emac",
    category: "emergency",
    name: { en: "Emergency Management Assistance Compact (EMAC)", ro: "Pactul de asistență în situații de urgență (EMAC)" },
    year: 1996,
    members: ALL_50,
    network: false,
    hub: {
      label: { en: "Administered by NEMA — Lexington, Kentucky", ro: "Administrat de NEMA — Lexington, Kentucky" },
      coordinates: LEXINGTON_KY,
    },
    blurb: {
      en: "Ratified by Congress in 1996, EMAC lets any state request personnel and equipment from any other during a disaster, with liability and reimbursement settled in advance. Every state is a member.",
      ro: "Ratificat de Congres în 1996, EMAC permite oricărui stat să solicite personal și echipamente de la altul în caz de dezastru, cu răspunderea și rambursarea stabilite în avans. Toate statele sunt membre.",
    },
    history: {
      en: "Hurricane Andrew flattened south Florida in 1992 and help arrived slowly, tangled in questions of who would pay and who was liable if an out-of-state paramedic made a mistake. Southern governors drafted a mutual-aid compact to answer those questions before the next storm. After Hurricane Katrina it moved roughly 66,000 personnel between states.",
      ro: "Uraganul Andrew a devastat Florida în 1992, iar ajutorul a venit greu, blocat de întrebări despre cine plătește și cine răspunde juridic. Guvernatorii sudici au redactat un pact de ajutor reciproc. După uraganul Katrina, a mutat circa 66.000 de oameni între state.",
    },
  },

  // ── Environmental agreements ──
  {
    id: "rggi",
    category: "environment",
    name: { en: "Regional Greenhouse Gas Initiative (RGGI)", ro: "Inițiativa regională privind gazele cu efect de seră (RGGI)" },
    year: 2009,
    members: ["CT", "DE", "ME", "MD", "MA", "NH", "NJ", "NY", "RI", "VT"],
    network: true,
    hub: { label: { en: "RGGI, Inc. — New York, New York", ro: "RGGI, Inc. — New York, New York" }, coordinates: NEW_YORK_NY },
    blurb: {
      en: "The first mandatory cap-and-trade programme for power-plant carbon in the United States, run cooperatively by the participating states rather than by Washington.",
      ro: "Primul program obligatoriu de plafonare și tranzacționare a emisiilor centralelor electrice din SUA, administrat de statele participante, nu de Washington.",
    },
    history: {
      en: "After Congress declined to price carbon, ten northeastern governors did it themselves, auctioning emission allowances from 2009. Participation has proved reversible: New Jersey left in 2011 and rejoined in 2020, and Virginia withdrew at the end of 2023 — a reminder that a compact is only as durable as the next election.",
      ro: "După ce Congresul a refuzat să taxeze carbonul, zece guvernatori din nord-est au făcut-o singuri, licitând permise din 2009. Participarea s-a dovedit reversibilă: New Jersey a plecat în 2011 și a revenit în 2020, iar Virginia s-a retras la finalul lui 2023.",
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
    network: true,
    hub: { label: { en: "Headquarters — Washington, D.C.", ro: "Sediu — Washington, D.C." }, coordinates: WASHINGTON_DC },
    blurb: {
      en: "Created by the Clean Air Act because smog does not stop at state lines: upwind states and downwind states are forced to plan air quality together.",
      ro: "Creată prin Clean Air Act, pentru că smogul nu se oprește la granițele statelor: statele din amonte și din aval planifică împreună calitatea aerului.",
    },
    history: {
      en: "Connecticut spent the 1980s unable to meet federal ozone limits no matter what it did, because much of its smog blew in from power plants hundreds of miles upwind. The 1990 Clean Air Act amendments created a statutory region so the states causing the pollution had to sit at the table with the states breathing it.",
      ro: "În anii 1980, Connecticut nu putea respecta limitele federale de ozon, indiferent ce făcea, pentru că smogul venea de la centrale aflate la sute de kilometri. Amendamentele din 1990 au creat o regiune statutară.",
    },
    caveat: {
      en: "Only the northern Virginia counties fall inside the statutory Ozone Transport Region.",
      ro: "Doar comitatele din nordul Virginiei se află în Regiunea statutară de transport al ozonului.",
    },
  },
];
