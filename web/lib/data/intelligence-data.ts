import { SITE_IMAGES } from "@/lib/site-images";
import type { Locale } from "@/lib/i18n/config";

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface IntelligenceMetric {
  value: string;
  label: string;
  detail: string;
}

export interface IntelligenceAgency {
  id: string;
  name: string;
  shortName: string;
  specialty: string;
  role: string;
  description: string;
  imageSrc: string;
  stats: { label: string; value: string }[];
}

export interface IntelligenceCapability {
  kicker: string;
  title: string;
  description: string;
  stat: string;
  accent: string;
}

export interface IntelligenceNode {
  name: string;
  location: string;
  role: string;
  description: string;
  accent: string;
  stats: { label: string; value: string }[];
}

export interface IntelligenceHeritageEvent {
  year: string;
  title: string;
  description: string;
  significance: string;
  imageSrc: string;
}

export interface IntelligenceFutureProgram {
  label: string;
  title: string;
  description: string;
  status: string;
  imageSrc: string;
  imageAlt: string;
  capability: string;
  specs: { label: string; value: string }[];
}

// ─── English Raw Constants ───────────────────────────────────────────────────

export const INTEL_METRICS: IntelligenceMetric[] = [
  {
    value: "$100B+",
    label: "ANNUAL BUDGET",
    detail: "Estimated annual budget of the National Intelligence Program and Military Intelligence Program.",
  },
  {
    value: "18",
    label: "ACTIVE AGENCIES",
    detail: "Separate intelligence organizations operating under the Director of National Intelligence.",
  },
  {
    value: "50+",
    label: "SPY SATELLITES",
    detail: "Classified orbital reconnaissance, signals intelligence, and imagery assets.",
  },
  {
    value: "100K+",
    label: "ACTIVE PERSONNEL",
    detail: "Cryptanalysts, field officers, linguists, and cyber warfare specialists globally.",
  },
  {
    value: "Exabytes",
    label: "DATA COLLECTED DAILY",
    detail: "Massive global signals and telemetry processed daily by automated sorting systems.",
  },
  {
    value: "24/7/365",
    label: "THREAT MONITORING",
    detail: "Real-time threat monitoring and strategic warning for national command authorities.",
  },
];

export const INTEL_AGENCIES: IntelligenceAgency[] = [
  {
    id: "cia",
    name: "Central Intelligence Agency",
    shortName: "CIA",
    specialty: "HUMINT (Human Intelligence)",
    role: "Clandestine Operations",
    description: "The primary agency for collecting foreign human intelligence (HUMINT) and conducting covert operations worldwide at the President's direction.",
    imageSrc: SITE_IMAGES.military.tacticalMap,
    stats: [
      { label: "Founded", value: "1947" },
      { label: "Headquarters", value: "Langley, Virginia" },
      { label: "Core Method", value: "Clandestine Networks" },
    ],
  },
  {
    id: "nsa",
    name: "National Security Agency",
    shortName: "NSA",
    specialty: "SIGINT (Signals Intelligence)",
    role: "Global Cryptology & Cyber Ops",
    description: "The world's largest cryptologic and signals intelligence organization, monitoring, intercepting, and decodifying global communications for defense.",
    imageSrc: SITE_IMAGES.cyberOps,
    stats: [
      { label: "Founded", value: "1952" },
      { label: "Headquarters", value: "Fort Meade, Maryland" },
      { label: "Core Method", value: "Supercomputer Arrays" },
    ],
  },
  {
    id: "nro",
    name: "National Reconnaissance Office",
    shortName: "NRO",
    specialty: "IMINT (Satellite Reconnaissance)",
    role: "Space-Based Surveillance",
    description: "Designs, builds, launches, and operates the nation's fleet of classified spy satellites, feeding real-time imagery to other intelligence assets.",
    imageSrc: SITE_IMAGES.spaceForce.gpsEarth,
    stats: [
      { label: "Founded", value: "1961" },
      { label: "Headquarters", value: "Chantilly, Virginia" },
      { label: "Core Method", value: "Orbital Constellations" },
    ],
  },
  {
    id: "nga",
    name: "National Geospatial-Intelligence Agency",
    shortName: "NGA",
    specialty: "GEOINT (Geospatial Intelligence)",
    role: "Imagery and Mapping Analysis",
    description: "Analyzes imagery and geospatial data to construct detailed maps and intelligence charts, enabling precise navigation and targeting.",
    imageSrc: SITE_IMAGES.homeUsaAtNightFromSpace,
    stats: [
      { label: "Founded", value: "1996" },
      { label: "Headquarters", value: "Springfield, Virginia" },
      { label: "Core Method", value: "Sat Imagery & Cartography" },
    ],
  },
  {
    id: "dia",
    name: "Defense Intelligence Agency",
    shortName: "DIA",
    specialty: "MASINT & Military Intelligence",
    role: "Foreign Military Assessment",
    description: "Fuses military intelligence from all branches to assess foreign military capabilities, doctrines, and logistics for combat commanders.",
    imageSrc: SITE_IMAGES.soldierSaluting,
    stats: [
      { label: "Founded", value: "1961" },
      { label: "Headquarters", value: "Pentagon (DIA HQ)" },
      { label: "Core Method", value: "Defense-Tech Analytics" },
    ],
  },
];

export const INTEL_CAPABILITIES: IntelligenceCapability[] = [
  {
    kicker: "01 — SIGINT",
    title: "Signals Intelligence",
    description: "Interception, analysis, and decryption of foreign communications, telemetry, and electronic signals. Led by the NSA at Fort Meade, utilizing global listening posts and satellites.",
    stat: "Global Intercepts",
    accent: "#38bdf8",
  },
  {
    kicker: "02 — HUMINT",
    title: "Human Intelligence",
    description: "Clandestine espionage, covert source recruitment, and field intelligence operations conducted globally. Led by the CIA, delivering direct insight into adversary intentions.",
    stat: "Clandestine Networks",
    accent: "#f5a623",
  },
  {
    kicker: "03 — GEOINT",
    title: "Geospatial Intelligence",
    description: "Exploitation and analysis of imagery and geospatial information to describe, assess, and visually depict physical features and geographically referenced activities.",
    stat: "Orbital Imaging",
    accent: "#10b981",
  },
  {
    kicker: "04 — CYBER",
    title: "Cyber Warfare Operations",
    description: "Offensive and defensive digital operations to disrupt adversary infrastructure, protect national command networks, and gather electronic intelligence.",
    stat: "Full-Spectrum Cyber",
    accent: "#a78bfa",
  },
  {
    kicker: "05 — MASINT",
    title: "Measurement & Signature Intelligence",
    description: "Scientific and technical intelligence information obtained by quantitative and qualitative analysis of data derived from radar, acoustic, nuclear, and seismic sensors.",
    stat: "Scientific ISR",
    accent: "#ff6b6b",
  },
];

export const INTEL_NODES: IntelligenceNode[] = [
  {
    name: "Pine Gap Facility",
    location: "Alice Springs, Australia",
    role: "Joint Satellite Downlink",
    description: "A highly classified joint US-Australian defense facility providing deep space satellite control and signals interception in the Eastern Hemisphere.",
    accent: "#f5a623",
    stats: [
      { label: "Location", value: "Central Australia" },
      { label: "Primary Role", value: "SIGINT Downlinks" },
      { label: "Cooperation", value: "Five Eyes Treaty" },
    ],
  },
  {
    name: "Menwith Hill Station",
    location: "North Yorkshire, UK",
    role: "Global Signals Interception",
    description: "The largest signals intelligence site on Earth. Monitors millions of global telecommunication channels and feeds data straight into NSA processing grids.",
    accent: "#38bdf8",
    stats: [
      { label: "Radomes", value: "30+ protective domes" },
      { label: "Logistics", value: "Co-located RAF/NSA" },
      { label: "Coverage", value: "Europe / Middle East" },
    ],
  },
  {
    name: "Buckley Space Force Base",
    location: "Aurora, Colorado, USA",
    role: "Overhead Persistent Infrared",
    description: "Nerve center for missile warning operations. Gathers data from infrared space constellations to monitor rocket launches and nuclear events globally.",
    accent: "#10b981",
    stats: [
      { label: "Sensors", value: "OPIR Constellation" },
      { label: "Readiness", value: "24/7/365 continuous" },
      { label: "Downlinks", value: "Classified satellite feeds" },
    ],
  },
  {
    name: "Fort Meade Complex",
    location: "Maryland, USA",
    role: "National Cryptologic Center",
    description: "Headquarters of the NSA and Cyber Command. Coordinates defensive and offensive cyber operations and builds supercomputers for cryptologic tasks.",
    accent: "#a78bfa",
    stats: [
      { label: "Units", value: "NSA / Cyber Command" },
      { label: "Power Grid", value: "Self-sustaining infrastructure" },
      { label: "Staff", value: "Tens of thousands" },
    ],
  },
  {
    name: "Langley Center",
    location: "Virginia, USA",
    role: "CIA Operations Headquarters",
    description: "The George Bush Center for Intelligence. Nerve center for clandestine source operations, covert planning, and foreign policy threat assessment.",
    accent: "#ff6b6b",
    stats: [
      { label: "Focus", value: "Foreign intelligence" },
      { label: "Director", value: "National Intelligence link" },
      { label: "Clandestine", value: "Global operations" },
    ],
  },
];

export const INTEL_HERITAGE: IntelligenceHeritageEvent[] = [
  {
    year: "1947",
    title: "National Security Act",
    description: "President Truman signs the National Security Act, establishing the CIA and laying the groundwork for a unified national intelligence framework.",
    significance: "Modern intelligence community birth",
    imageSrc: SITE_IMAGES.military.tacticalMap,
  },
  {
    year: "1952",
    title: "Creation of the NSA",
    description: "Formed secretly via presidential memorandum, the National Security Agency consolidates military codebreaking and communication intercept units into a single entity.",
    significance: "Unified signals intelligence branch",
    imageSrc: SITE_IMAGES.cyberOps,
  },
  {
    year: "1960",
    title: "CORONA Satellite Operations",
    description: "The NRO's CORONA spy satellite completes its first successful orbital photo flight, recovering film canisters mid-air and mapping Soviet facilities from space.",
    significance: "First orbital photographic recon",
    imageSrc: SITE_IMAGES.spaceForce.gpsEarth,
  },
  {
    year: "1962",
    title: "Cuban Missile Crisis Verification",
    description: "U-2 surveillance flights take detailed aerial photographs of Soviet medium-range ballistic missile installations in Cuba, giving command authorities critical proof.",
    significance: "Tactical photographic intelligence validation",
    imageSrc: SITE_IMAGES.homeUsaAtNightFromSpace,
  },
  {
    year: "2011",
    title: "Operation Neptune Spear",
    description: "Intelligence analysts fuse SIGINT intercepts, HUMINT tracking, and GEOINT 3D compound modeling to verify the location of Osama bin Laden, enabling the tactical raid.",
    significance: "Peak integration of community databases",
    imageSrc: SITE_IMAGES.military.hero,
  },
  {
    year: "2026+",
    title: "JADC2 Intelligence Integration",
    description: "Fusing global sensor systems using military AI networks, delivering real-time strategic targeting data and intelligence assessments in milliseconds.",
    significance: "Real-time AI tactical decision support",
    imageSrc: SITE_IMAGES.spaceForce.gpsEarth,
  },
];

export const INTEL_FUTURE: IntelligenceFutureProgram[] = [
  {
    label: "Project Maven",
    title: "AI Computer Vision Initiative",
    description: "Utilizes advanced neural networks to scan exabytes of drone surveillance video and satellite imaging, instantly identifying and tagging threats on global grids.",
    status: "Operational deployment",
    imageSrc: SITE_IMAGES.cyberOps,
    imageAlt: "Computer monitors displaying digital image processing",
    capability: "AI Threat Identification",
    specs: [
      { label: "Analysis Speed", value: "Millisecond automated tag" },
      { label: "Data Input", value: "Video / Satellite feeds" },
      { label: "AI Model", value: "Deep CNN systems" },
      { label: "Deployment", value: "Joint operations command" },
    ],
  },
  {
    label: "Sentient Satellites",
    title: "AI-Driven Constellation Orchestration",
    description: "Spy satellites that autonomously adjust orbit heights and camera coordinates based on real-time threat telemetry, eliminating communications latency.",
    status: "R&D Prototype",
    imageSrc: SITE_IMAGES.spaceForce.gpsEarth,
    imageAlt: "Satellite in orbit overlooking Earth",
    capability: "Autonomous Orbital Reconnaissance",
    specs: [
      { label: "Constellation", value: "NRO next-generation" },
      { label: "Decision latency", value: "Under 1 second" },
      { label: "Coverage", value: "Dynamic tactical focus" },
      { label: "Self-healing", value: "Orbital anti-collision" },
    ],
  },
  {
    label: "Quantum Decrypt",
    title: "Post-Quantum Cryptanalysis",
    description: "Building massive decryption processors to withstand post-quantum security measures and decrypt legacy communications gathered from foreign targets.",
    status: "Classified development",
    imageSrc: SITE_IMAGES.cyberOps,
    imageAlt: "Blinking supercomputer servers",
    capability: "Cryptologic Supremacy",
    specs: [
      { label: "Encryption target", value: "Quantum-safe systems" },
      { label: "Host location", value: "Utah Data Center / Meade" },
      { label: "Infrastructure", value: "Liquid helium cooled labs" },
      { label: "Capability", value: "Massive parallel decryption" },
    ],
  },
  {
    label: "Autonomous Stealth UAVs",
    title: "Next-Gen Penetrating Recon Drones",
    description: "Uncrewed aircraft combining radar-deflecting stealth geometries and AI pathing to loiter inside contested airspace, gathering signals and imagery.",
    status: "Operational prototyping",
    imageSrc: SITE_IMAGES.spaceForce.gpsEarth,
    imageAlt: "Stealth aircraft on radar profile view",
    capability: "Low-Observable Signals Intelligence",
    specs: [
      { label: "RCS", value: "Comparable to small insect" },
      { label: "Stealth Tech", value: "Radar absorbing composites" },
      { label: "Command", value: "Autonomous pathing" },
      { label: "Sensors", value: "Wideband passive SIGINT" },
    ],
  },
];

// ─── Localized Getters ───────────────────────────────────────────────────────

export function getIntelligenceMetrics(locale: Locale): IntelligenceMetric[] {
  if (locale !== "ro") return INTEL_METRICS;
  return [
    { value: "$100B+", label: "BUGET ANUAL", detail: "Bugetul estimat cumulativ al Programului Național de Informații și al Programului de Informații Militare." },
    { value: "18", label: "AGENȚII ACTIVE", detail: "Organizații distincte de securitate și informații care operează sub egida Comunității Naționale." },
    { value: "50+", label: "SATELIȚI SPION", detail: "Active orbitale clasificate de recunoaștere, analiză a semnalelor și supraveghere." },
    { value: "100K+", label: "PERSONAL ACTIV", detail: "Criptologi, analiști, ofițeri operativi și specialiști cibernetici la nivel mondial." },
    { value: "Exabytes", label: "DATE COLECTATE ZILNIC", detail: "Fluxuri globale masive de semnale interceptate și procesate prin sisteme inteligente." },
    { value: "24/7/365", label: "MONITORIZARE AMENINȚĂRI", detail: "Monitorizare constantă a amenințărilor strategice pentru factorii decizionali ai SUA." },
  ];
}

export function getIntelligenceAgencies(locale: Locale): IntelligenceAgency[] {
  if (locale !== "ro") return INTEL_AGENCIES;
  return INTEL_AGENCIES.map((a) => {
    const roMap: Record<string, { name: string; specialty: string; role: string; description: string; stats: { label: string; value: string }[] }> = {
      "cia": {
        name: "Central Intelligence Agency (Agenția Centrală de Informații)",
        specialty: "HUMINT (Informații Umane)",
        role: "Operațiuni Clandestine și Espionaj",
        description: "Organizația principală responsabilă de culegerea informațiilor externe prin surse umane și de derularea acțiunilor secrete din ordinul Președintelui.",
        stats: [
          { label: "Fondată", value: "1947" },
          { label: "Sediu", value: "Langley, Virginia" },
          { label: "Metodă Principală", value: "Rețele Clandestine" },
        ],
      },
      "nsa": {
        name: "National Security Agency (Agenția de Securitate Națională)",
        specialty: "SIGINT (Informații din Semnale)",
        role: "Criptanaliză și Război Cibernetic",
        description: "Lider mondial în domeniul criptologiei, însărcinat cu interceptarea, procesarea și protecția datelor de comunicații strategice ale SUA.",
        stats: [
          { label: "Fondată", value: "1952" },
          { label: "Sediu", value: "Fort Meade, Maryland" },
          { label: "Metodă Principală", value: "Supercalculatoare în Rețea" },
        ],
      },
      "nro": {
        name: "National Reconnaissance Office (Oficiul Național de Recunoaștere)",
        specialty: "IMINT (Recunoaștere Satelitară)",
        role: "Supraveghere Spațială",
        description: "Proiectează, construiește și operează sateliții spion clasați ai Statelor Unite, furnizând imagini de înaltă rezoluție și telemetrie.",
        stats: [
          { label: "Fondată", value: "1961" },
          { label: "Sediu", value: "Chantilly, Virginia" },
          { label: "Metodă Principală", value: "Constelații Orbitale" },
        ],
      },
      "nga": {
        name: "National Geospatial-Intelligence Agency (Agenția de Informații Geospațiale)",
        specialty: "GEOINT (Informații Geospațiale)",
        role: "Analiză Imagistică și Cartografică",
        description: "Analizează imagini și date geospațiale pentru a construi hărți extrem de precise, oferind suport esențial pentru misiuni și țintire tactică.",
        stats: [
          { label: "Fondată", value: "1996" },
          { label: "Sediu", value: "Springfield, Virginia" },
          { label: "Metodă Principală", value: "Cartografie Digitală & Sateliți" },
        ],
      },
      "dia": {
        name: "Defense Intelligence Agency (Agenția de Informații a Apărării)",
        specialty: "MASINT & Informații Militare",
        role: "Evaluarea Amenințărilor Externe",
        description: "Sintetizează informații strategice din toate ramurile forțelor armate pentru a evalua capabilitățile tactice și logistice ale armatelor străine.",
        stats: [
          { label: "Fondată", value: "1961" },
          { label: "Sediu", value: "Pentagon (Sediul DIA)" },
          { label: "Metodă Principală", value: "Analize Tehno-Militare" },
        ],
      },
    };
    const ro = roMap[a.id];
    return ro ? { ...a, ...ro } : a;
  });
}

export function getIntelligenceCapabilities(locale: Locale): IntelligenceCapability[] {
  if (locale !== "ro") return INTEL_CAPABILITIES;
  return [
    {
      kicker: "01 — SIGINT",
      title: "Informații din Semnale",
      description: "Interceptarea, analiza și decriptarea comunicațiilor străine și a semnalelor electronice. Coordonat de NSA la Fort Meade prin antene globale și sateliți.",
      stat: "Interceptări Globale",
      accent: "#38bdf8",
    },
    {
      kicker: "02 — HUMINT",
      title: "Informații Umane",
      description: "Espionaj clandestin, recrutare de surse pe teren și operațiuni speciale executate la nivel global de către CIA pentru a înțelege intențiile inamice.",
      stat: "Rețele Clandestine",
      accent: "#f5a623",
    },
    {
      kicker: "03 — GEOINT",
      title: "Informații Geospațiale",
      description: "Exploatarea și analiza imaginilor satelitare și a datelor geografice pentru a cartografia precis și a monitoriza infrastructurile critice globale.",
      stat: "Imagistică Orbitală",
      accent: "#10b981",
    },
    {
      kicker: "04 — CIBERNETICĂ",
      title: "Operațiuni Cibernetice",
      description: "Acțiuni digitale ofensive și defensive pentru a perturba rețelele inamice și a proteja sistemele de comandă naționale ale SUA.",
      stat: "Securitate Cibernetică",
      accent: "#a78bfa",
    },
    {
      kicker: "05 — MASINT",
      title: "Informații Tehnice de Semnătură",
      description: "Analiza științifică a datelor culese de senzori specifici (radar, acustic, nuclear) pentru a detecta și monitoriza teste balistice și nucleare.",
      stat: "Senzori Științifici",
      accent: "#ff6b6b",
    },
  ];
}

export function getIntelligenceNodes(locale: Locale): IntelligenceNode[] {
  if (locale !== "ro") return INTEL_NODES;
  return [
    {
      ...INTEL_NODES[0],
      name: "Baza Comună Pine Gap",
      location: "Alice Springs, Australia",
      role: "Recepție Sateliți Orbită Înaltă",
      description: "Centru secret de colectare și monitorizare a semnalelor în parteneriat cu Australia, esențial pentru acoperirea emisferei sudice.",
    },
    {
      ...INTEL_NODES[1],
      name: "Stația Menwith Hill",
      location: "North Yorkshire, Marea Britanie",
      role: "Interceptare Comunicații Globale",
      description: "Cea mai mare stație de monitorizare a semnalelor din lume. Captează și filtrează traficul de comunicații din Europa și Orientul Mijlociu.",
    },
    {
      ...INTEL_NODES[2],
      name: "Baza Buckley Space Force",
      location: "Aurora, Colorado, SUA",
      role: "Monitorizare Infraroșu Spațial",
      description: "Centru vital de avertizare timpurie, procesând datele colectate de sateliții orbitali pentru detectarea instantanee a rachetelor.",
    },
    {
      ...INTEL_NODES[3],
      name: "Complexul Fort Meade",
      location: "Maryland, SUA",
      role: "Centru Criptologic Național",
      description: "Sediul central al NSA și Cyber Command. Locul unde mii de analiști și sisteme cibernetice protejează și analizează spațiul digital.",
    },
    {
      ...INTEL_NODES[4],
      name: "Centrul Langley",
      location: "Virginia, SUA",
      role: "Centrul de Operațiuni CIA",
      description: "Sediul istoric George Bush Center. Punctul focal pentru planificarea operațiunilor externe și analizarea riscurilor globale de securitate.",
    },
  ];
}

export function getIntelligenceHeritage(locale: Locale): IntelligenceHeritageEvent[] {
  if (locale !== "ro") return INTEL_HERITAGE;
  return [
    {
      ...INTEL_HERITAGE[0],
      title: "Legea Securității Naționale",
      description: "Președintele Truman semnează actul constitutiv prin care iau naștere CIA și structura modernă a comunității naționale de securitate.",
      significance: "Înființarea serviciilor de informații moderne",
    },
    {
      ...INTEL_HERITAGE[1],
      title: "Înființarea Secretă a NSA",
      description: "Prin decret prezidențial clasificat, se naște NSA, preluând și consolidând unitățile de decodificare militară din Al Doilea Război Mondial.",
      significance: "Unificarea direcțiilor de informații din semnale",
    },
    {
      ...INTEL_HERITAGE[2],
      title: "Programul de Sateliți CORONA",
      description: "Oficiul NRO lansează primul satelit de recunoaștere foto de succes, recuperând containerele de film lansate din spațiu pentru evaluarea bazelor sovietice.",
      significance: "Prima monitorizare fotografică din spațiu",
    },
    {
      ...INTEL_HERITAGE[3],
      title: "Criza Rachetelor din Cuba",
      description: "Avioanele de supraveghere U-2 fotografiază rachetele balistice nucleare sovietice instalate în Cuba, oferind dovezi esențiale pentru deciziile de criză.",
      significance: "Validare tactică prin imagini aeriene",
    },
    {
      ...INTEL_HERITAGE[4],
      title: "Operațiunea Neptune Spear",
      description: "Analiștii corelează datele SIGINT, HUMINT și modelele 3D geospațiale pentru a confirma prezența lui Osama bin Laden, permițând succesul misiunii SEAL.",
      significance: "Integrare supremă a bazelor de date",
    },
    {
      ...INTEL_HERITAGE[5],
      title: "Integrarea AI - JADC2",
      description: "Conectarea fluxurilor globale de informații prin rețele AI integrate, asigurând evaluări tactice și ținte precise la nivel global în fracțiuni de secundă.",
      significance: "Sprijin decizional prin inteligență artificială în timp real",
    },
  ];
}

export function getIntelligenceFuturePrograms(locale: Locale): IntelligenceFutureProgram[] {
  if (locale !== "ro") return INTEL_FUTURE;
  return INTEL_FUTURE.map((p) => {
    const roMap: Record<string, { title: string; description: string; capability: string; specs: { label: string; value: string }[] }> = {
      "Project Maven": {
        title: "Inițiativa AI de Procesare a Imaginii",
        description: "Utilizează rețele neuronale adânci pentru a scana automat exabytes de fluxuri video transmise de drone și imagini din satelit, detectând amenințări.",
        capability: "Identificare AI a Amenințărilor",
        specs: [
          { label: "Viteză Analiză", value: "Marcare automată în milisecunde" },
          { label: "Date Intrare", value: "Fluxuri video / Imagini Satelit" },
          { label: "Model AI", value: "Rețele Neuronale Convolutionale" },
          { label: "Implementare", value: "Comandamentul Întrunit" },
        ],
      },
      "Sentient Satellites": {
        title: "Orchestrare Autonomă de Constelații",
        description: "Sateliți spion care își ajustează în mod autonom coordonatele și senzorii pe baza datelor de alertă primite, eliminând timpii morți.",
        capability: "Recunoaștere Orbitală Autonomă",
        specs: [
          { label: "Constelație", value: "NRO Generație Următoare" },
          { label: "Timp Decizie", value: "Sub o secundă" },
          { label: "Acoperire", value: "Focus tactic dinamic" },
          { label: "Evitare Impact", value: "Corecție orbitală automată" },
        ],
      },
      "Quantum Decrypt": {
        title: "Criptanaliză Post-Cuantică",
        description: "Dezvoltarea sistemelor de supercalcul capabile să ruleze algoritmi de decriptare cuantică pentru decodarea comunicațiilor interceptate securizate.",
        capability: "Supremație Criptologică",
        specs: [
          { label: "Sisteme Țintă", value: "Criptare securizată cuantic" },
          { label: "Locație Server", value: "Centrul Utah / Fort Meade" },
          { label: "Răcire Infrastructură", value: "Sisteme criogenice cu heliu" },
          { label: "Capabilitate", value: "Decriptare paralelă masivă" },
        ],
      },
      "Autonomous Stealth UAVs": {
        title: "Drone Autonome de Recunoaștere Invizibile",
        description: "Vehicule aeriene fără pilot care combină tehnologia stealth de absorbție radar și navigația autonomă pentru monitorizare în spații inamice.",
        capability: "Informații Clandestine din Semnale",
        specs: [
          { label: "Amprentă Radar", value: "Echivalentă cu o insectă" },
          { label: "Fuzionare Tehnologică", value: "Compozit absorbant radar" },
          { label: "Control Zbor", value: "Rute automate prin AI" },
          { label: "Senzori", value: "SIGINT pasiv în bandă largă" },
        ],
      },
    };
    const ro = roMap[p.label];
    return ro ? { ...p, ...ro } : p;
  });
}
