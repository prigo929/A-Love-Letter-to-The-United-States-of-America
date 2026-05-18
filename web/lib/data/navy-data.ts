import { SITE_IMAGES } from "@/lib/site-images";
import type { Locale } from "@/lib/i18n/config";

export interface NavyMetric {
  value: string;
  label: string;
  detail: string;
}

export interface NavyCapability {
  kicker: string;
  title: string;
  description: string;
  stat: string;
  accent: string;
}

export interface NavyPlatform {
  name: string;
  className: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  capability: string;
  specs: { label: string; value: string }[];
}

export interface NavyCommandLayer {
  title: string;
  subtitle: string;
  description: string;
  nodes: string[];
  accent: string;
}

export interface NavyFutureProgram {
  label: string;
  title: string;
  description: string;
  status: string;
}

export interface NavyVisualPanel {
  title: string;
  eyebrow: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export interface NavyTheater {
  id: string;
  name: string;
  region: string;
  headline: string;
  description: string;
  signal: string;
  imageSrc: string;
  imageAlt: string;
  accent: string;
  metrics: { label: string; value: string }[];
}

// ─── English Raw Constants ───────────────────────────────────────────────────

export const NAVY_METRICS: NavyMetric[] = [
  {
    value: "11",
    label: "Nuclear Carriers",
    detail: "The only nation operating a fleet of nuclear-powered supercarriers at this scale.",
  },
  {
    value: "14",
    label: "Strategic SSBNs",
    detail: "Ohio-class ballistic missile submarines form the sea-based leg of nuclear deterrence.",
  },
  {
    value: "290+",
    label: "Battle Force Ships",
    detail: "A global fleet built around carriers, submarines, destroyers, amphibious ships, and logistics.",
  },
  {
    value: "5th",
    label: "Generation Air Wing",
    detail: "F-35C, E-2D, EA-18G, Super Hornet, and MQ-25 create a sensor-rich carrier air ecosystem.",
  },
];

export const NAVY_CAPABILITIES: NavyCapability[] = [
  {
    kicker: "Blue-water reach",
    title: "Carrier Strike Groups",
    description:
      "A carrier strike group is a mobile airbase, missile battery, sensor network, command node, and sovereign American presence moving through international waters.",
    stat: "70+ aircraft",
    accent: "#d7f2ff",
  },
  {
    kicker: "Silent deterrence",
    title: "Undersea Dominance",
    description:
      "Attack submarines hunt, map, shadow, and collect. Ballistic missile submarines remain hidden to guarantee strategic second-strike credibility.",
    stat: "24/7 patrol",
    accent: "#70e0bf",
  },
  {
    kicker: "Integrated fire control",
    title: "Aegis Combat System",
    description:
      "Aegis fuses ship sensors, weapons, command software, and cooperative engagement into a fleet-wide air and missile defense architecture.",
    stat: "100+ tracks",
    accent: "#f2d48a",
  },
  {
    kicker: "Autonomous edge",
    title: "Manned-Unmanned Teaming",
    description:
      "Unmanned surface, air, and undersea systems extend sensing, targeting, decoy, logistics, and strike capacity across the maritime battlespace.",
    stat: "distributed",
    accent: "#ff7a7a",
  },
];

export const NAVY_PLATFORMS: NavyPlatform[] = [
  {
    name: "USS Gerald R. Ford",
    className: "Ford-class CVN",
    role: "Next-generation carrier",
    imageSrc: SITE_IMAGES.navy.geraldFord,
    imageAlt: "USS Gerald R. Ford aircraft carrier underway",
    capability:
      "Electromagnetic aircraft launch, advanced arresting gear, redesigned weapons movement, and a higher sortie-generation architecture.",
    specs: [
      { label: "Propulsion", value: "Nuclear" },
      { label: "Air Wing", value: "70+ aircraft" },
      { label: "Crew", value: "4,500+" },
      { label: "Domain", value: "Sea-air command" },
    ],
  },
  {
    name: "Ohio-class SSBN",
    className: "Fleet ballistic missile submarine",
    role: "Strategic deterrence",
    imageSrc: SITE_IMAGES.navy.ohioSubmarine,
    imageAlt: "Ohio-class ballistic missile submarine at sea",
    capability:
      "The quietest and most survivable part of the nuclear triad, designed to disappear into the ocean and remain politically decisive.",
    specs: [
      { label: "Fleet", value: "14 SSBNs" },
      { label: "Weapon", value: "Trident II D5" },
      { label: "Patrol", value: "Undetected" },
      { label: "Mission", value: "Second strike" },
    ],
  },
  {
    name: "Arleigh Burke Flight III",
    className: "Guided-missile destroyer",
    role: "Air and missile defense",
    imageSrc: SITE_IMAGES.navy.destroyer,
    imageAlt: "U.S. Navy guided-missile cruiser in San Diego",
    capability:
      "The backbone of surface combat: vertical launch cells, ballistic missile defense, anti-submarine warfare, strike, and escort missions.",
    specs: [
      { label: "Combat", value: "Aegis" },
      { label: "Radar", value: "SPY-6" },
      { label: "Weapons", value: "Mk 41 VLS" },
      { label: "Role", value: "Fleet shield" },
    ],
  },
  {
    name: "F/A-18F Super Hornet",
    className: "Carrier strike fighter",
    role: "Naval aviation",
    imageSrc: SITE_IMAGES.navy.fa18Landing,
    imageAlt: "F/A-18F Super Hornet landing on an aircraft carrier",
    capability:
      "A combat-proven naval fighter built for carrier launch, precision strike, fleet defense, and high-tempo operations at sea.",
    specs: [
      { label: "Launch", value: "Catapult" },
      { label: "Recovery", value: "Arrested" },
      { label: "Mission", value: "Strike/fleet defense" },
      { label: "Tempo", value: "Cyclic ops" },
    ],
  },
];

export const NAVY_COMMAND_LAYERS: NavyCommandLayer[] = [
  {
    title: "Sensing Layer",
    subtitle: "Satellites, E-2D, P-8A, submarines, destroyers, passive sensors",
    description:
      "The fleet first wins by seeing. Every platform is a sensor, every sensor contributes to a larger maritime picture, and every picture compresses decision time.",
    nodes: ["ISR", "acoustic arrays", "airborne early warning", "space cueing"],
    accent: "#d7f2ff",
  },
  {
    title: "Decision Layer",
    subtitle: "Combat direction centers, Aegis, CEC, Link 16, joint command networks",
    description:
      "The Navy's advantage is not only steel. It is the ability to convert distributed information into coordinated action faster than an adversary can isolate one ship.",
    nodes: ["Aegis", "CEC", "joint fires", "mission command"],
    accent: "#f2d48a",
  },
  {
    title: "Effect Layer",
    subtitle: "Carrier aviation, Tomahawk, SM-series missiles, torpedoes, Marines, cyber",
    description:
      "A carrier strike group can defend itself, open airspace, strike inland, protect allies, and shape a crisis without needing a foreign runway.",
    nodes: ["air wing", "VLS", "undersea strike", "expeditionary force"],
    accent: "#ff7a7a",
  },
];

export const NAVY_THEATERS: NavyTheater[] = [
  {
    id: "indo-pacific",
    name: "Indo-Pacific",
    region: "Seventh Fleet",
    headline: "The decisive maritime theater",
    description:
      "Carrier aviation, submarines, destroyers, Marines, space cueing, and allied bases combine into a layered maritime architecture across the world's largest ocean.",
    signal: "Forward presence at scale",
    imageSrc: SITE_IMAGES.navy.carrierFormation,
    imageAlt: "U.S. Navy carrier strike group operating in formation",
    accent: "#8edcff",
    metrics: [
      { label: "Fleet posture", value: "forward" },
      { label: "Primary domain", value: "sea-air" },
      { label: "Allied mesh", value: "high" },
    ],
  },
  {
    id: "atlantic",
    name: "Atlantic",
    region: "Second Fleet",
    headline: "Undersea lanes and reinforcement routes",
    description:
      "The Atlantic is the reinforcement bridge for NATO, the undersea contest for submarines, and the logistics route that keeps European deterrence credible.",
    signal: "Convoy logic, modernized",
    imageSrc: SITE_IMAGES.navy.geraldFord,
    imageAlt: "U.S. Navy aircraft carrier underway in open ocean",
    accent: "#70e0bf",
    metrics: [
      { label: "Mission shape", value: "deterrence" },
      { label: "Tempo", value: "persistent" },
      { label: "Undersea value", value: "critical" },
    ],
  },
  {
    id: "mediterranean",
    name: "Mediterranean",
    region: "Sixth Fleet",
    headline: "Crisis response without a runway",
    description:
      "A compact sea gives the Navy immediate political presence, missile defense, strike options, evacuation capacity, and allied integration from Europe to the Middle East.",
    signal: "Fast theater access",
    imageSrc: SITE_IMAGES.navy.dualCarrier,
    imageAlt: "Two U.S. Navy carrier strike groups operating together",
    accent: "#f2d48a",
    metrics: [
      { label: "Response", value: "rapid" },
      { label: "Coverage", value: "dense" },
      { label: "Diplomatic signal", value: "visible" },
    ],
  },
  {
    id: "deck",
    name: "Flight Deck",
    region: "Carrier Air Wing",
    headline: "Aerospace operations at industrial tempo",
    description:
      "The flight deck is choreography under pressure: launch, recovery, weapons movement, maintenance, fuel, command discipline, and precision timing.",
    signal: "Sortie generation",
    imageSrc: SITE_IMAGES.navy.flightDeck,
    imageAlt: "U.S. Navy carrier flight deck operations",
    accent: "#ff7a7a",
    metrics: [
      { label: "Cycle", value: "minutes" },
      { label: "System type", value: "human-machine" },
      { label: "Pressure", value: "extreme" },
    ],
  },
];

export const NAVY_FUTURE_PROGRAMS: NavyFutureProgram[] = [
  {
    label: "MQ-25",
    title: "Carrier-based autonomous refueling",
    description:
      "Extends the reach of the carrier air wing and moves unmanned aviation directly into cyclic deck operations.",
    status: "fleet integration",
  },
  {
    label: "Columbia",
    title: "Next strategic submarine",
    description:
      "The Ohio replacement program is built to preserve the most survivable nuclear deterrent leg into the 2080s.",
    status: "construction",
  },
  {
    label: "SPY-6",
    title: "Digital radar architecture",
    description:
      "A scalable radar family for air and missile defense, designed around sensitivity, software growth, and fleet commonality.",
    status: "fielding",
  },
  {
    label: "OUSV",
    title: "Unmanned surface vessels",
    description:
      "Prototype vessels test autonomy, payload modularity, distributed sensing, and the tactics needed for mixed human-machine fleets.",
    status: "experimentation",
  },
];

export const NAVY_VISUAL_PANELS: NavyVisualPanel[] = [
  {
    eyebrow: "Flight deck as factory",
    title: "A moving aerospace production line",
    description:
      "Launch, recover, arm, fuel, repair, and launch again. The deck turns naval power into a repeatable industrial rhythm at sea.",
    imageSrc: SITE_IMAGES.navy.flightDeck,
    imageAlt: "U.S. Navy aircraft carrier flight deck operations",
  },
  {
    eyebrow: "Distributed sea control",
    title: "The fleet is a network, not a formation",
    description:
      "Destroyers, cruisers, submarines, aircraft, satellites, Marines, and logistics vessels operate as one adaptive machine.",
    imageSrc: SITE_IMAGES.navy.carrierFormation,
    imageAlt: "U.S. Navy carrier strike group formation at sea",
  },
  {
    eyebrow: "Capital ship energy",
    title: "American mass, precision, and presence",
    description:
      "The carrier is not just a ship. It is a diplomatic signal, a strategic option, and a technologically dense expression of national will.",
    imageSrc: SITE_IMAGES.navy.dualCarrier,
    imageAlt: "Two U.S. Navy carrier strike groups operating together",
  },
];

// ─── Localized Getters ────────────────────────────────────────────────────────

export function getNavyMetrics(locale: Locale): NavyMetric[] {
  if (locale !== "ro") return NAVY_METRICS;
  return [
    {
      value: "11",
      label: "Portavioane Nucleare",
      detail: "Singura națiune care operează o flotă de superportavioane cu propulsie nucleară la această scară.",
    },
    {
      value: "14",
      label: "Submarine SSBN",
      detail: "Submarinele din clasa Ohio cu rachete balistice formează componenta maritimă a descurajării nucleare.",
    },
    {
      value: "290+",
      label: "Nave de Luptă",
      detail: "O flotă globală construită în jurul portavioanelor, submarinelor, distrugătoarelor, navelor amfibii și logisticii.",
    },
    {
      value: "5th",
      label: "Generația Aeriană",
      detail: "F-35C, E-2D, EA-18G, Super Hornet și MQ-25 creează un ecosistem aerian de portavion bogat în senzori.",
    },
  ];
}

export function getNavyCapabilities(locale: Locale): NavyCapability[] {
  if (locale !== "ro") return NAVY_CAPABILITIES;
  return [
    {
      kicker: "Rază în ape deschise",
      title: "Grupuri de Atac",
      description:
        "Un grup de atac de portavioane este o bază aeriană mobilă, baterie de rachete, rețea de senzori, nod de comandă și prezență americană suverană.",
      stat: "70+ aeronave",
      accent: "#d7f2ff",
    },
    {
      kicker: "Descurajare silențioasă",
      title: "Dominanță Subacvatică",
      description:
        "Submarinele de atac vânează, cartografiază, monitorizează și colectează informații. Submarinele cu rachete balistice rămân ascunse pentru a garanta capacitatea de contraatac.",
      stat: "patrulă 24/7",
      accent: "#70e0bf",
    },
    {
      kicker: "Control integrat al focului",
      title: "Sistemul de Luptă Aegis",
      description:
        "Aegis fuzionează senzorii navei, armele, software-ul de comandă și angajamentul cooperativ într-o arhitectură de apărare aeriană și antirachetă la nivelul întregii flote.",
      stat: "100+ ținte",
      accent: "#f2d48a",
    },
    {
      kicker: "Avantaj autonom",
      title: "Echipe Oameni-Mașini",
      description:
        "Sistemele autonome de suprafață, aeriene și subacvatice extind capacitatea de detectare, țintire, momeală, logistică și atac în spațiul de luptă maritim.",
      stat: "distribuit",
      accent: "#ff7a7a",
    },
  ];
}

export function getNavyPlatforms(locale: Locale): NavyPlatform[] {
  if (locale !== "ro") return NAVY_PLATFORMS;
  return [
    {
      name: "USS Gerald R. Ford",
      className: "Clasa Ford CVN",
      role: "Portavion de generație următoare",
      imageSrc: SITE_IMAGES.navy.geraldFord,
      imageAlt: "Portavionul USS Gerald R. Ford pe mare",
      capability:
        "Lansare electromagnetică a aeronavelor, dispozitive avansate de reținere la aterizare, mișcare reproiectată a armelor și o arhitectură superioară de generare a sortilor.",
      specs: [
        { label: "Propulsie", value: "Nucleară" },
        { label: "Grup Aerian", value: "70+ aeronave" },
        { label: "Echipaj", value: "4.500+" },
        { label: "Domeniu", value: "Comandă aer-mare" },
      ],
    },
    {
      name: "Ohio-class SSBN",
      className: "Submarin cu rachete balistice",
      role: "Descurajare strategică",
      imageSrc: SITE_IMAGES.navy.ohioSubmarine,
      imageAlt: "Submarin din clasa Ohio la suprafață",
      capability:
        "Cea mai silențioasă și mai supraviețuitoare componentă a triadei nucleare, concepută să dispară în ocean și să rămână decisivă din punct de vedere politic.",
      specs: [
        { label: "Flotă", value: "14 submarine" },
        { label: "Armament", value: "Trident II D5" },
        { label: "Patrulă", value: "Nedetectat" },
        { label: "Misiune", value: "Contraatac strategic" },
      ],
    },
    {
      name: "Arleigh Burke Flight III",
      className: "Distrugător cu rachete ghidate",
      role: "Apărare aeriană și antirachetă",
      imageSrc: SITE_IMAGES.navy.destroyer,
      imageAlt: "Distrugător american clasa Arleigh Burke pe mare",
      capability:
        "Coloana vertebrală a luptei de suprafață: celule de lansare verticală, apărare împotriva rachetelor balistice, război antisubmarin, atac și misiuni de escortă.",
      specs: [
        { label: "Luptă", value: "Aegis" },
        { label: "Radar", value: "SPY-6" },
        { label: "Arme", value: "Mk 41 VLS" },
        { label: "Rol", value: "Scutul flotei" },
      ],
    },
    {
      name: "F/A-18F Super Hornet",
      className: "Avion de vânătoare ambarcat",
      role: "Aviație navală",
      imageSrc: SITE_IMAGES.navy.fa18Landing,
      imageAlt: "Avion F/A-18F Super Hornet aterizând pe portavion",
      capability:
        "Un avion de luptă naval dovedit în luptă, construit pentru lansare de pe portavion, atac de precizie, apărare a flotei și operațiuni de mare intensitate pe mare.",
      specs: [
        { label: "Lansare", value: "Catapultă" },
        { label: "Aterizare", value: "Cârlig de arestare" },
        { label: "Misiune", value: "Atac/apărare flotă" },
        { label: "Ritm", value: "Operațiuni ciclice" },
      ],
    },
  ];
}

export function getNavyCommandLayers(locale: Locale): NavyCommandLayer[] {
  if (locale !== "ro") return NAVY_COMMAND_LAYERS;
  return [
    {
      title: "Stratul de Detecție",
      subtitle: "Sateliți, E-2D, P-8A, submarine, distrugătoare, senzori pasivi",
      description:
        "Flota câștigă în primul rând prin vizibilitate. Fiecare platformă este un senzor, fiecare senzor contribuie la o imagine maritimă mai largă, iar fiecare imagine comprimă timpul de decizie.",
      nodes: ["ISR", "antene acustice", "avertizare timpurie", "ghidare spațială"],
      accent: "#d7f2ff",
    },
    {
      title: "Stratul de Decizie",
      subtitle: "Centre de luptă, Aegis, CEC, Link 16, rețele de comandă comune",
      description:
        "Avantajul Marinei nu constă doar în oțel. Este capacitatea de a converti informațiile distribuite în acțiune coordonată mai rapid decât poate un adversar să izoleze o singură navă.",
      nodes: ["Aegis", "CEC", "focuri comune", "comandă misiune"],
      accent: "#f2d48a",
    },
    {
      title: "Stratul de Efect",
      subtitle: "Aviație de portavion, Tomahawk, rachete din seria SM, torpile, infanterie marină, cyber",
      description:
        "Un grup de atac de portavioane se poate apăra singur, poate deschide spațiul aerian, poate lovi în interiorul uscatului, poate proteja aliații și poate gestiona o criză fără a avea nevoie de o pistă străină.",
      nodes: ["grup aerian", "sisteme VLS", "atac subacvatic", "forță amfibie"],
      accent: "#ff7a7a",
    },
  ];
}

export function getNavyTheaters(locale: Locale): NavyTheater[] {
  if (locale !== "ro") return NAVY_THEATERS;
  return [
    {
      id: "indo-pacific",
      name: "Indo-Pacific",
      region: "Flota a Șaptea",
      headline: "Teatrul maritim decisiv",
      description:
        "Aviația de portavion, submarinele, distrugătoarele, infanteriștii marini, ghidarea spațială și bazele aliate se combină într-o arhitectură maritimă stratificată pe cel mai mare ocean al lumii.",
      signal: "Prezență avansată la scară",
      imageSrc: SITE_IMAGES.navy.carrierFormation,
      imageAlt: "Grup de atac de portavioane american în formație",
      accent: "#8edcff",
      metrics: [
        { label: "Poziție flotă", value: "avansată" },
        { label: "Domeniu primar", value: "aer-mare" },
        { label: "Integrare aliați", value: "ridicată" },
      ],
    },
    {
      id: "atlantic",
      name: "Atlantic",
      region: "Flota a Doua",
      headline: "Căi subacvatice și rute de întărire",
      description:
        "Atlanticul este podul de întărire pentru NATO, competiția subacvatică pentru submarine și ruta logistică ce menține credibilă descurajarea europeană.",
      signal: "Logica convoaielor, modernizată",
      imageSrc: SITE_IMAGES.navy.geraldFord,
      imageAlt: "Portavionul USS Gerald R. Ford în Oceanul Atlantic",
      accent: "#70e0bf",
      metrics: [
        { label: "Tip misiune", value: "descurajare" },
        { label: "Ritm", value: "persistent" },
        { label: "Valoare subacvatică", value: "critică" },
      ],
    },
    {
      id: "mediterranean",
      name: "Mediterană",
      region: "Flota a Șasea",
      headline: "Răspuns la criză fără pistă de aterizare",
      description:
        "O mare compactă oferă Marinei prezență politică imediată, apărare antirachetă, opțiuni de atac, capacitate de evacuare și integrare aliată din Europa până în Orientul Mijlociu.",
      signal: "Acces rapid în teatru",
      imageSrc: SITE_IMAGES.navy.dualCarrier,
      imageAlt: "Două grupuri de atac de portavioane operând împreună în Mediterană",
      accent: "#f2d48a",
      metrics: [
        { label: "Răspuns", value: "rapid" },
        { label: "Acoperire", value: "densă" },
        { label: "Semnal diplomatic", value: "vizibil" },
      ],
    },
    {
      id: "deck",
      name: "Puntea de Zbor",
      region: "Grupul Aerian de Portavion",
      headline: "Operațiuni aerospațiale în ritm industrial",
      description:
        "Puntea de zbor este coregrafie sub presiune: lansare, recuperare, mișcarea armelor, întreținere, combustibil, disciplină de comandă și sincronizare de precizie.",
      signal: "Generare de sortii",
      imageSrc: SITE_IMAGES.navy.flightDeck,
      imageAlt: "Activitate intensă pe puntea de zbor a unui portavion",
      accent: "#ff7a7a",
      metrics: [
        { label: "Ciclu", value: "minute" },
        { label: "Tip sistem", value: "om-mașină" },
        { label: "Presiune", value: "extremă" },
      ],
    },
  ];
}

export function getNavyFuturePrograms(locale: Locale): NavyFutureProgram[] {
  if (locale !== "ro") return NAVY_FUTURE_PROGRAMS;
  return [
    {
      label: "MQ-25",
      title: "Alimentare autonomă pe portavion",
      description:
        "Extinde raza de acțiune a grupului aerian de portavion și introduce aviația fără pilot direct în operațiunile ciclice de pe punte.",
      status: "integrare în flotă",
    },
    {
      label: "Columbia",
      title: "Următorul submarin strategic",
      description:
        "Programul de înlocuire a clasei Ohio este construit pentru a păstra cea mai stabilă componentă a descurajării nucleare până în anii 2080.",
      status: "construcție",
    },
    {
      label: "SPY-6",
      title: "Arhitectură radar digitală",
      description:
        "O familie de radare scalabile pentru apărarea aeriană și antirachetă, concepută în jurul sensibilității, dezvoltării software și comunității flotei.",
      status: "instalare",
    },
    {
      label: "OUSV",
      title: "Nave de suprafață fără echipaj",
      description:
        "Navele prototip testează autonomia, modularitatea încărcăturii utile, detecția distribuită și tacticile necesare pentru flotele mixte om-mașină.",
      status: "experimentare",
    },
  ];
}

export function getNavyVisualPanels(locale: Locale): NavyVisualPanel[] {
  if (locale !== "ro") return NAVY_VISUAL_PANELS;
  return [
    {
      eyebrow: "Puntea de zbor ca fabrică",
      title: "O linie de producție aerospațială în mișcare",
      description:
        "Lansează, recuperează, înarmează, alimentează, repară și lansează din nou. Puntea transformă puterea navală într-un ritm industrial repetabil pe mare.",
      imageSrc: SITE_IMAGES.navy.flightDeck,
      imageAlt: "Operațiuni pe puntea de zbor a portavionului american",
    },
    {
      eyebrow: "Control maritim distribuit",
      title: "Flota este o rețea, nu o formație",
      description:
        "Distrugătoarele, crucișătoarele, submarinele, aeronavele, sateliții, infanteriștii marini și navele logistice operează ca o singură mașină adaptivă.",
      imageSrc: SITE_IMAGES.navy.carrierFormation,
      imageAlt: "Grup de atac de portavioane american navigând în Ocean",
    },
    {
      eyebrow: "Energia navelor mari",
      title: "Masă, precizie și prezență americană",
      description:
        "Portavionul nu este doar o navă. Este un semnal diplomatic, o opțiune strategică și o expresie densă din punct de vedere tehnologic a voinței naționale.",
      imageSrc: SITE_IMAGES.navy.dualCarrier,
      imageAlt: "Două superportavioane americane navigând în paralel",
    },
  ];
}
