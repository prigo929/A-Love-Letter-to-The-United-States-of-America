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
  imageSrc: string;
  imageAlt: string;
  capability: string;
  specs: { label: string; value: string }[];
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

export const NAVY_SECONDARY_METRICS: NavyMetric[] = [
  {
    value: "340,000+",
    label: "Active Sailors",
    detail: "The exceptional human crew operating the global maritime technological grid.",
  },
  {
    value: "70+",
    label: "Active Submarines",
    detail: "Attack submarines from Virginia and Seawolf classes maintaining complete undersea dominance.",
  },
  {
    value: "100+",
    label: "Aegis Combat Ships",
    detail: "Destroyers and cruisers carrying advanced detection radars and VLS strike cells.",
  },
  {
    value: "3,700+",
    label: "Naval Aircraft",
    detail: "The carrier-capable aircraft fleet ready to project power globally at cyclic operational tempo.",
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
  {
    name: "F-35C Lightning II",
    className: "Carrier stealth fighter",
    role: "5th-Gen multirole stealth",
    imageSrc: SITE_IMAGES.f35Lightning,
    imageAlt: "F-35C Lightning II stealth fighter launching from carrier",
    capability:
      "The world's only carrier-capable 5th-generation stealth fighter, designed to slip undetected past hostile air defenses, gather intelligence, and coordinate fires via link networks.",
    specs: [
      { label: "Propulsion", value: "F135 Turbofan" },
      { label: "Stealth", value: "LO profile" },
      { label: "Speed", value: "Mach 1.6" },
      { label: "Radar", value: "AESA APG-81" },
    ],
  },
  {
    name: "Virginia-class SSN",
    className: "Fast attack submarine",
    role: "Undersea search & strike",
    imageSrc: SITE_IMAGES.navy.ohioSubmarine,
    imageAlt: "Virginia-class fast attack submarine underway",
    capability:
      "The backbone of modern undersea warfare, designed to hunt hostile submarines, launch Tomahawk cruise missiles, deploy Special Forces, and conduct intelligence gathering in contested littoral waters.",
    specs: [
      { label: "Propulsion", value: "Nuclear" },
      { label: "Armament", value: "Tomahawk VLS" },
      { label: "Crew", value: "135" },
      { label: "Stealth", value: "Anechoic coat" },
    ],
  },
  {
    name: "USS Zumwalt (DDG-1000)",
    className: "Stealth guided-missile destroyer",
    role: "Littoral stealth & land strike",
    imageSrc: SITE_IMAGES.navy.destroyer,
    imageAlt: "USS Zumwalt stealth destroyer at sea",
    capability:
      "A multi-mission stealth destroyer designed with a radically minimized radar profile and an integrated electric power system to operate in littoral regions and project land-attack fires.",
    specs: [
      { label: "Propulsion", value: "IPS Electric" },
      { label: "Hull Design", value: "Tumblehome wave-piercing" },
      { label: "Weapons", value: "80x Mk 57 VLS" },
      { label: "Crew", value: "140" },
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
    imageSrc: SITE_IMAGES.navy.flightDeck,
    imageAlt: "MQ-25 Stingray autonomous unmanned refueling tanker",
    capability:
      "The MQ-25 Stingray is the U.S. Navy's first operational carrier-based unmanned aerial system (UAS). It is designed to provide robust aerial refueling capabilities, effectively doubling the combat strike range of the carrier air wing's F/A-18 Super Hornets and F-35C fighters.",
    specs: [
      { label: "Deployment", value: "2026 (Planned)" },
      { label: "Manufacturer", value: "Boeing" },
      { label: "Capacity", value: "15,000 lbs fuel" },
      { label: "Combat Range", value: "500+ nm" },
    ],
  },
  {
    label: "Columbia",
    title: "Next strategic submarine",
    description:
      "The Ohio replacement program is built to preserve the most survivable nuclear deterrent leg into the 2080s.",
    status: "construction",
    imageSrc: SITE_IMAGES.navy.ohioSubmarine,
    imageAlt: "Columbia-class nuclear submarine construction schematic",
    capability:
      "The Columbia-class submarine is the Navy's top priority program, replacing the aging Ohio-class ballistic missile submarines. It features a life-of-ship nuclear reactor core that will not require refueling during its 42-year service life, maximizing operational availability.",
    specs: [
      { label: "Lead Ship", value: "USS District of Columbia" },
      { label: "Reactor Core", value: "Life-of-ship (42 years)" },
      { label: "Armament", value: "16x Trident II D5 LE" },
      { label: "First Patrol", value: "2031 (Planned)" },
    ],
  },
  {
    label: "SPY-6",
    title: "Digital radar architecture",
    description:
      "A scalable radar family for air and missile defense, designed around sensitivity, software growth, and fleet commonality.",
    status: "fielding",
    imageSrc: SITE_IMAGES.navy.destroyer,
    imageAlt: "SPY-6 Air and Missile Defense Radar installation on destroyer",
    capability:
      "The AN/SPY-6(V)1 Air and Missile Defense Radar provides the Navy with unprecedented sensitivity and coverage. It allows simultaneous tracking of ballistic missiles, cruise missiles, and enemy aircraft with high clutter rejection.",
    specs: [
      { label: "Radar Type", value: "Active Electronically Scanned (AESA)" },
      { label: "Bands Used", value: "S-band and X-band" },
      { label: "Sensitivity", value: "30x higher than SPY-1D" },
      { label: "Primary Platform", value: "Arleigh Burke Flight III" },
    ],
  },
  {
    label: "OUSV",
    title: "Unmanned surface vessels",
    description:
      "Prototype vessels test autonomy, payload modularity, distributed sensing, and the tactics needed for mixed human-machine fleets.",
    status: "experimentation",
    imageSrc: SITE_IMAGES.navy.carrierFormation,
    imageAlt: "Overlord Unmanned Surface Vessel executing autonomous maneuvers",
    capability:
      "Unmanned surface vessels represent the transition to a hybrid crewed-uncrewed fleet. Prototype vessels are proving the ability to navigate autonomously for thousands of miles, carrying modular sensors, electronic warfare suites, and rocket launch cells.",
    specs: [
      { label: "Navigation Mode", value: "Fully Autonomous" },
      { label: "Weapon System", value: "Modular containerized VLS" },
      { label: "Endurance", value: "Weeks of continuous ops" },
      { label: "Strategic Role", value: "Distributed Sensing/Decoy" },
    ],
  },
];

export const NAVY_VISUAL_PANELS: NavyVisualPanel[] = [
  {
    eyebrow: "Flight deck as factory",
    title: "A moving aerospace production line",
    description:
      "Launch, recover, arm, fuel, repair, and launch again. The deck turns naval power into a repeatable industrial rhythm at sea.",
    imageSrc: SITE_IMAGES.navy.fa18Landing,
    imageAlt: "F/A-18F Super Hornet landing on a carrier deck",
  },
  {
    eyebrow: "Distributed sea control",
    title: "The fleet is a network, not a formation",
    description:
      "Destroyers, cruisers, submarines, aircraft, satellites, Marines, and logistics vessels operate as one adaptive machine.",
    imageSrc: SITE_IMAGES.navy.destroyer,
    imageAlt: "U.S. Navy guided-missile surface combatant at sea",
  },
  {
    eyebrow: "Strategic deterrence",
    title: "Undersea silence, global leverage",
    description:
      "Sailing unseen beneath the waves, ballistic and guided-missile submarines maintain continuous strategic readiness, representing the most survivable leg of nuclear deterrence.",
    imageSrc: SITE_IMAGES.navy.ohioSubmarine,
    imageAlt: "U.S. Navy strategic ballistic submarine underway",
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

export function getNavySecondaryMetrics(locale: Locale): NavyMetric[] {
  if (locale !== "ro") return NAVY_SECONDARY_METRICS;
  return [
    {
      value: "340.000+",
      label: "Marinari Activi",
      detail: "Echipajul uman excepțional ce operează grila tehnologică maritimă globală.",
    },
    {
      value: "70+",
      label: "Submarine Active",
      detail: "Submarine de atac din clasele Virginia și Seawolf ce mențin dominația subacvatică totală.",
    },
    {
      value: "100+",
      label: "Nave Aegis",
      detail: "Distrugătoare și crucișătoare dotate cu radare avansate de detectare și celule de lansare VLS.",
    },
    {
      value: "3.700+",
      label: "Aeronave Navale",
      detail: "Flota aeriană navală ambarcată, capabilă să proiecteze forță la nivel global.",
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
    {
      name: "F-35C Lightning II",
      className: "Avion de vânătoare stealth ambarcat",
      role: "Stealth multirol de gen. 5",
      imageSrc: SITE_IMAGES.navy.fa18Landing,
      imageAlt: "Avion stealth F-35C Lightning II decolând de pe portavion pe mare",
      capability:
        "Singurul avion de vânătoare stealth de generația a 5-a din lume capabil de pe portavion, conceput să pătrundă nedetectat prin apărările aeriene inamice, să colecteze date și să coordoneze atacurile.",
      specs: [
        { label: "Propulsie", value: "F135 Turbofan" },
        { label: "Profil", value: "Stealth avansat (LO)" },
        { label: "Viteză", value: "Mach 1.6" },
        { label: "Radar", value: "AESA APG-81" },
      ],
    },
    {
      name: "Virginia-class SSN",
      className: "Submarin de atac rapid",
      role: "Căutare și atac submarin",
      imageSrc: SITE_IMAGES.navy.ohioSubmarine,
      imageAlt: "Submarin de atac rapid din clasa Virginia în ape litorale",
      capability:
        "Coloana vertebrală a războiului subacvatic modern, concepută pentru a văna submarine inamice, lansa rachete de croazieră Tomahawk, desfășura forțe speciale Navy SEAL și realiza culegere de informații.",
      specs: [
        { label: "Propulsie", value: "Nucleară" },
        { label: "Arme", value: "VLS Tomahawk și torpile Mk 48" },
        { label: "Echipaj", value: "135" },
        { label: "Stealth", value: "Înveliș anecoic" },
      ],
    },
    {
      name: "USS Zumwalt (DDG-1000)",
      className: "Distrugător stealth cu rachete ghidate",
      role: "Atac terestru stealth",
      imageSrc: SITE_IMAGES.navy.destroyer,
      imageAlt: "Distrugătorul stealth USS Zumwalt în marș pe ocean",
      capability:
        "Un distrugător stealth multi-misiune, conceput cu o semnătură radar redusă radical și un sistem de alimentare electric integrat pentru a opera în zone litorale contestate.",
      specs: [
        { label: "Propulsie", value: "Electrică IPS" },
        { label: "Design Cocă", value: "Tumblehome wave-piercing" },
        { label: "Arme", value: "80x celule Mk 57 VLS" },
        { label: "Echipaj", value: "140" },
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
      imageSrc: SITE_IMAGES.navy.flightDeck,
      imageAlt: "Cisternă de realimentare autonomă fără pilot MQ-25 Stingray",
      capability:
        "MQ-25 Stingray este primul sistem aerian fără pilot (UAS) operațional de pe portavioanele Marinei SUA. Este proiectat pentru a oferi capacități robuste de realimentare în aer, dublând practic raza de atac a avioanelor de luptă F/A-18 și F-35C.",
      specs: [
        { label: "Desfășurare", value: "2026 (Planificat)" },
        { label: "Producător", value: "Boeing" },
        { label: "Capacitate", value: "6.800 kg combustibil" },
        { label: "Rază Combat", value: "920+ km" },
      ],
    },
    {
      label: "Columbia",
      title: "Următorul submarin strategic",
      description:
        "Programul de înlocuire a clasei Ohio este construit pentru a păstra cea mai stabilă componentă a descurajării nucleare până în anii 2080.",
      status: "construcție",
      imageSrc: SITE_IMAGES.navy.ohioSubmarine,
      imageAlt: "Schemă de construcție a submarinului nuclear clasa Columbia",
      capability:
        "Submarinul din clasa Columbia este programul de prioritate absolută al Marinei, înlocuind submarinele cu rachete balistice din clasa Ohio. Acesta dispune de un miez de reactor nuclear activ pe toată durata de viață a navei (42 de ani) care nu va necesita reîncărcare.",
      specs: [
        { label: "Prima Navă", value: "USS District of Columbia" },
        { label: "Reactor Core", value: "Pe viața navei (42 ani)" },
        { label: "Armament", value: "16x Trident II D5 LE" },
        { label: "Patrulare", value: "2031 (Planificat)" },
      ],
    },
    {
      label: "SPY-6",
      title: "Arhitectură radar digitală",
      description:
        "O familie de radare scalabile pentru apărarea aeriană și antirachetă, concepută în jurul sensibilității, dezvoltării software și comunității flotei.",
      status: "instalare",
      imageSrc: SITE_IMAGES.navy.destroyer,
      imageAlt: "Instalarea radarului de apărare aeriană și antirachetă SPY-6 pe distrugător",
      capability:
        "Radarul de apărare aeriană și antirachetă AN/SPY-6(V)1 oferă Marinei o sensibilitate și o acoperire fără precedent. Permite urmărirea simultană a rachetelor balistice, a rachetelor de croazieră și a aeronavelor inamice.",
      specs: [
        { label: "Tip Radar", value: "AESA activ electronic" },
        { label: "Benzi Utilizate", value: "Banda S și banda X" },
        { label: "Sensibilitate", value: "De 30 de ori mai mare decât SPY-1D" },
        { label: "Platformă", value: "Arleigh Burke Flight III" },
      ],
    },
    {
      label: "OUSV",
      title: "Nave de suprafață fără echipaj",
      description:
        "Navele prototip testează autonomia, modularitatea încărcăturii utile, detecția distribuită și tacticile necesare pentru flotele mixte om-mașină.",
      status: "experimentare",
      imageSrc: SITE_IMAGES.navy.carrierFormation,
      imageAlt: "Navă de suprafață fără echipaj Overlord executând manevre autonome",
      capability:
        "Navele de suprafață fără echipaj reprezintă tranziția către o flotă hibridă cu și fără echipaj. Vehiculele prototip demonstrează capacitatea de a naviga autonom pe mii de mile, transportând senzori modulari și celule de lansare.",
      specs: [
        { label: "Mod Navigație", value: "Complet Autonom" },
        { label: "Sistem Arme", value: "Celule VLS modulare" },
        { label: "Autonomie", value: "Săptămâni de operare continuă" },
        { label: "Rol Strategic", value: "Detecție distribuită / Momeală" },
      ],
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
      imageSrc: SITE_IMAGES.navy.fa18Landing,
      imageAlt: "Avion de luptă F/A-18F aterizând pe portavion",
    },
    {
      eyebrow: "Control maritim distribuit",
      title: "Flota este o rețea, nu o formație",
      description:
        "Distrugătoarele, crucișătoarele, submarinele, aeronavele, sateliții, infanteriștii marini și navele logistice operează ca o singură mașină adaptivă.",
      imageSrc: SITE_IMAGES.navy.destroyer,
      imageAlt: "Navă de suprafață militară americană Aegis pe mare",
    },
    {
      eyebrow: "Descurajare strategică",
      title: "Tăcere subacvatică, pârghie globală",
      description:
        "Navigând nevăzute sub valuri, submarinele cu rachete balistice și ghidate mențin o stare continuă de pregătire strategică, reprezentând cea mai supraviețuitoare componentă a descurajării nucleare.",
      imageSrc: SITE_IMAGES.navy.ohioSubmarine,
      imageAlt: "Submarin strategic american cu propulsie nucleară",
    },
  ];
}

export interface NavyWeaponSystem {
  id: string;
  name: string;
  designation: string;
  category: string;
  specs: { label: string; value: string }[];
  description: string;
  accuracy: number;
  operations: string;
  tacticalOverlay: string;
}

export const NAVY_WEAPONS: NavyWeaponSystem[] = [
  {
    id: "tomahawk",
    name: "Tomahawk Land Attack Missile",
    designation: "UGM-109 / BGM-109",
    category: "Deep Strike",
    specs: [
      { label: "Range", value: "1,000+ miles" },
      { label: "Velocity", value: "Mach 0.74" },
      { label: "Guidance", value: "GPS / TERCOM / DSMAC" },
      { label: "Payload", value: "1,000 lbs HE" },
    ],
    description: "The Navy's premier long-range precision strike weapon, launched from vertical launch systems (VLS) on destroyers, cruisers, and submarines to strike high-value land targets with extreme accuracy.",
    accuracy: 98,
    operations: "2,000+ combat launches",
    tacticalOverlay: "SAT-LINK ACTIVE // TERCOM ALTITUDE MATCH // DSMAC SCENE MATCHED",
  },
  {
    id: "sm6",
    name: "Standard Missile 6",
    designation: "RIM-174 ERAM",
    category: "Fleet Air Defense",
    specs: [
      { label: "Range", value: "150+ miles" },
      { label: "Velocity", value: "Mach 3.5+" },
      { label: "Guidance", value: "Active Radar Homing" },
      { label: "Ceiling", value: "110,000 ft" },
    ],
    description: "Provides multi-mission capability for air defense, ballistic missile defense, and anti-surface warfare. Fuses threat tracking data from off-board sensors (like F-35 or E-2D) via cooperative engagement.",
    accuracy: 95,
    operations: "Active fielding scale",
    tacticalOverlay: "AEGIS NETWORK // CEC COORDINATION ACTIVE // HYPERSONIC TRACK LOCK",
  },
  {
    id: "mk48",
    name: "Mk 48 ADCAP Torpedo",
    designation: "Mark 48 Mod 7",
    category: "Undersea Warfare",
    specs: [
      { label: "Range", value: "50+ miles" },
      { label: "Velocity", value: "55+ knots" },
      { label: "Guidance", value: "Acoustic Sonar / Wire-guided" },
      { label: "Depth", value: "800+ ft" },
    ],
    description: "The primary weapon of fast-attack and ballistic missile submarines, designed to hunt and destroy ultra-quiet submarines and heavily armored surface vessels in deep ocean or littoral zones.",
    accuracy: 96,
    operations: "Undersea silent readiness",
    tacticalOverlay: "ACTIVE ACC-PING ACTIVE // AN/BSY-1 COMMAND LINK // SONAR RAY LOCK",
  },
  {
    id: "phalanx",
    name: "Phalanx CIWS",
    designation: "Mk 15 CIWS",
    category: "Point Defense",
    specs: [
      { label: "Rate of Fire", value: "4,500 rounds/min" },
      { label: "Caliber", value: "20mm M61A1 Vulcan" },
      { label: "Guidance", value: "Ku-band Search & Track" },
      { label: "Range", value: "1.5 miles" },
    ],
    description: "The ultimate layer of defense for surface ships against anti-ship missiles and close-in threats. Automatically detects, tracks, and destroys incoming threats using a rapid-fire rotary cannon.",
    accuracy: 99,
    operations: "Autonomous point defense",
    tacticalOverlay: "AUTO-DEFENSE ACTIVE // Ku-BAND SWEEP ACTIVE // RADAR MATCH COMPLETE",
  },
];

export function getNavyWeapons(locale: Locale): NavyWeaponSystem[] {
  if (locale !== "ro") return NAVY_WEAPONS;
  return [
    {
      id: "tomahawk",
      name: "Rachetă de Atac Terestru Tomahawk",
      designation: "UGM-109 / BGM-109",
      category: "Atac la Distanță",
      specs: [
        { label: "Rază", value: "1.600+ km" },
        { label: "Viteză", value: "Mach 0.74" },
        { label: "Ghidare", value: "GPS / TERCOM / DSMAC" },
        { label: "Explozibil", value: "450 kg" },
      ],
      description: "Principala armă de atac de precizie la distanță a Marinei, lansată de pe distrugătoare, crucișătoare și submarine pentru a lovi ținte terestre de mare valoare cu o acuratețe extremă.",
      accuracy: 98,
      operations: "2.000+ lansări de luptă",
      tacticalOverlay: "CONEXIUNE SAT-LINK ACTIVĂ // POTRIVIRE ALTITUDINE TERCOM // POTRIVIRE SCENĂ DSMAC",
    },
    {
      id: "sm6",
      name: "Rachetă Standard 6",
      designation: "RIM-174 ERAM",
      category: "Apărare Aeriană a Flotei",
      specs: [
        { label: "Rază", value: "240+ km" },
        { label: "Viteză", value: "Mach 3.5+" },
        { label: "Ghidare", value: "Autoghidare Radar Activă" },
        { label: "Plafon", value: "33.000 m" },
      ],
      description: "Oferă capacități multi-misiune pentru apărare aeriană, apărare împotriva rachetelor balistice și atac de suprafață. Fuzionează datele de la senzori externi (cum ar fi F-35 sau E-2D) prin rețea.",
      accuracy: 95,
      operations: "Ritm activ de desfășurare",
      tacticalOverlay: "REȚEA AEGIS // COORDONARE CEC ACTIVĂ // BLOCARE TRACK HIPERSONIC",
    },
    {
      id: "mk48",
      name: "Torpilă Mk 48 ADCAP",
      designation: "Mark 48 Mod 7",
      category: "Luptă Subacvatică",
      specs: [
        { label: "Rază", value: "80+ km" },
        { label: "Viteză", value: "100+ km/h" },
        { label: "Ghidare", value: "Sonar Acustic / Ghidare prin Cablu" },
        { label: "Adâncime", value: "250+ m" },
      ],
      description: "Arma principală a submarinelor de atac și cu rachete balistice, concepută pentru a vâna și distruge submarine extrem de silențioase și nave de suprafață blindate.",
      accuracy: 96,
      operations: "Pregătire subacvatică silențioasă",
      tacticalOverlay: "PING ACUSTIC ACTIV // CONEXIUNE COMANDĂ AN/BSY-1 // BLOCARE FAZĂ SONAR",
    },
    {
      id: "phalanx",
      name: "Sistem de Apărare Phalanx CIWS",
      designation: "Mk 15 CIWS",
      category: "Apărare Terminală",
      specs: [
        { label: "Ritm Foc", value: "4.500 lovituri/min" },
        { label: "Calibru", value: "20mm M61A1 Vulcan" },
        { label: "Ghidare", value: "Căutare & Urmărire Banda Ku" },
        { label: "Rază", value: "2.4 km" },
      ],
      description: "Ultimul strat de apărare al navelor de suprafață împotriva rachetelor antinavă și a amenințărilor din apropiere. Detectează, urmărește și distruge automat țintele folosind un tun rotativ rapid.",
      accuracy: 99,
      operations: "Apărare terminală autonomă",
      tacticalOverlay: "AUTO-APĂRARE ACTIVĂ // INSPECȚIE BANDA Ku ACTIVĂ // POTRIVIRE RADAR REUȘITĂ",
    },
  ];
}

// ─── Fleet Size Comparison ────────────────────────────────────────────────────

export interface NavyFleetComparison {
  country: string;
  flag: string;
  carriers: number;
  submarines: number;
  totalShips: number;
  tonnage: string;
  highlight?: boolean;
}

export const NAVY_FLEET_COMPARISON: NavyFleetComparison[] = [
  { country: "United States", flag: "🇺🇸", carriers: 11, submarines: 72, totalShips: 296, tonnage: "4.6M", highlight: true },
  { country: "China",         flag: "🇨🇳", carriers: 3,  submarines: 61, totalShips: 370, tonnage: "2.0M" },
  { country: "Russia",        flag: "🇷🇺", carriers: 1,  submarines: 58, totalShips: 192, tonnage: "0.9M" },
  { country: "United Kingdom",flag: "🇬🇧", carriers: 2,  submarines: 11, totalShips: 75,  tonnage: "0.4M" },
  { country: "Japan",         flag: "🇯🇵", carriers: 0,  submarines: 22, totalShips: 114, tonnage: "0.5M" },
  { country: "India",         flag: "🇮🇳", carriers: 2,  submarines: 17, totalShips: 130, tonnage: "0.4M" },
  { country: "France",        flag: "🇫🇷", carriers: 1,  submarines: 10, totalShips: 80,  tonnage: "0.3M" },
];

export function getNavyFleetComparison(locale: Locale): NavyFleetComparison[] {
  if (locale !== "ro") return NAVY_FLEET_COMPARISON;
  return [
    { country: "Statele Unite",  flag: "🇺🇸", carriers: 11, submarines: 72, totalShips: 296, tonnage: "4.6M", highlight: true },
    { country: "China",          flag: "🇨🇳", carriers: 3,  submarines: 61, totalShips: 370, tonnage: "2.0M" },
    { country: "Rusia",          flag: "🇷🇺", carriers: 1,  submarines: 58, totalShips: 192, tonnage: "0.9M" },
    { country: "Marea Britanie", flag: "🇬🇧", carriers: 2,  submarines: 11, totalShips: 75,  tonnage: "0.4M" },
    { country: "Japonia",        flag: "🇯🇵", carriers: 0,  submarines: 22, totalShips: 114, tonnage: "0.5M" },
    { country: "India",          flag: "🇮🇳", carriers: 2,  submarines: 17, totalShips: 130, tonnage: "0.4M" },
    { country: "Franța",         flag: "🇫🇷", carriers: 1,  submarines: 10, totalShips: 80,  tonnage: "0.3M" },
  ];
}

// ─── Naval Heritage Timeline ──────────────────────────────────────────────────

export interface NavyHeritageEvent {
  year: string;
  title: string;
  description: string;
  significance: string;
}

export const NAVY_HERITAGE_TIMELINE: NavyHeritageEvent[] = [
  {
    year: "1775",
    title: "Continental Navy Founded",
    description: "The Continental Congress establishes a naval force to intercept British supply ships during the American Revolution, planting the seed for permanent sea power.",
    significance: "Origin of American naval identity",
  },
  {
    year: "1812",
    title: "\"Old Ironsides\" & Blue-Water Credibility",
    description: "USS Constitution defeats HMS Guerriere, proving the young republic could challenge the Royal Navy and projecting American sovereignty across oceans.",
    significance: "First proof of naval competence",
  },
  {
    year: "1907",
    title: "Great White Fleet Circumnavigation",
    description: "President Roosevelt sends 16 battleships around the world in 14 months, announcing America as a global naval power and establishing forward-deployment doctrine.",
    significance: "Birth of global naval presence",
  },
  {
    year: "1942",
    title: "Midway: Carriers Replace Battleships",
    description: "Four Japanese carriers sunk in a single engagement. The Battle of Midway proved that carrier aviation, not gun-line battleships, would dominate modern naval warfare.",
    significance: "The carrier era begins",
  },
  {
    year: "1962",
    title: "Cuban Missile Crisis Naval Blockade",
    description: "The Navy's quarantine line around Cuba demonstrated that sea control could resolve nuclear brinkmanship without firing a shot. Deterrence through presence.",
    significance: "Sea power as diplomatic leverage",
  },
  {
    year: "1991",
    title: "Tomahawk Debut in Desert Storm",
    description: "288 Tomahawk cruise missiles launched from ships and submarines in the opening hours of Desert Storm, introducing precision stand-off strike from the sea.",
    significance: "Precision strike revolution",
  },
  {
    year: "2001–Now",
    title: "Persistent Global Presence",
    description: "Carrier strike groups deploy continuously across the Indo-Pacific, Mediterranean, and Arabian Sea. The Navy is the first responder to every global crisis.",
    significance: "Permanent forward deployment",
  },
];

export function getNavyHeritageTimeline(locale: Locale): NavyHeritageEvent[] {
  if (locale !== "ro") return NAVY_HERITAGE_TIMELINE;
  return [
    {
      year: "1775",
      title: "Înființarea Marinei Continentale",
      description: "Congresul Continental stabilește o forță navală pentru interceptarea navelor britanice de aprovizionare, plantând sămânța puterii maritime permanente.",
      significance: "Originea identității navale americane",
    },
    {
      year: "1812",
      title: "\"Old Ironsides\" și Credibilitatea Maritimă",
      description: "USS Constitution învinge HMS Guerriere, dovedind că tânăra republică poate contesta Marina Regală și proiectând suveranitatea americană peste oceane.",
      significance: "Prima dovadă de competență navală",
    },
    {
      year: "1907",
      title: "Circumnavigarea Flotei Albe",
      description: "Președintele Roosevelt trimite 16 cuirasate în jurul lumii în 14 luni, anunțând America ca putere navală globală și stabilind doctrina desfășurării avansate.",
      significance: "Nașterea prezenței navale globale",
    },
    {
      year: "1942",
      title: "Midway: Portavioanele Înlocuiesc Cuirasatele",
      description: "Patru portavioane japoneze scufundate într-o singură bătălie. Midway a dovedit că aviația de portavion, nu cuirasatele, va domina războiul naval modern.",
      significance: "Începutul erei portavioanelor",
    },
    {
      year: "1962",
      title: "Blocada Navală din Criza Rachetelor Cubaneze",
      description: "Linia de carantină a Marinei în jurul Cubei a demonstrat că controlul mării poate rezolva o confruntare nucleară fără a trage un foc de armă.",
      significance: "Puterea navală ca pârghie diplomatică",
    },
    {
      year: "1991",
      title: "Debutul Tomahawk în Furtuna Deșertului",
      description: "288 de rachete de croazieră Tomahawk lansate de pe nave și submarine în primele ore ale operațiunii, introducând atacul de precizie de la distanță de pe mare.",
      significance: "Revoluția atacului de precizie",
    },
    {
      year: "2001–Azi",
      title: "Prezență Globală Permanentă",
      description: "Grupurile de atac de portavioane se desfășoară continuu în Indo-Pacific, Mediterana și Marea Arabiei. Marina este primul răspuns la fiecare criză globală.",
      significance: "Desfășurare avansată permanentă",
    },
  ];
}

// ─── Navy Special Warfare ─────────────────────────────────────────────────────

export interface NavySpecWarUnit {
  id: string;
  name: string;
  fullName: string;
  role: string;
  description: string;
  stats: { label: string; value: string }[];
  missions: string[];
  accent: string;
}

export const NAVY_SPECWAR_UNITS: NavySpecWarUnit[] = [
  {
    id: "seal-teams",
    name: "Navy SEALs",
    fullName: "Sea, Air, and Land Teams",
    role: "Maritime special operations",
    description: "The Navy's elite special operations force, trained to operate in any environment from deep ocean to landlocked mountains. SEAL teams conduct direct action, special reconnaissance, counter-terrorism, and unconventional warfare missions worldwide.",
    stats: [
      { label: "Active Teams", value: "8 + DEVGRU" },
      { label: "BUD/S Duration", value: "6 months" },
      { label: "Selection Rate", value: "~25%" },
      { label: "Deployment", value: "Global" },
    ],
    missions: ["Direct Action", "Special Reconnaissance", "Counter-Terrorism", "Unconventional Warfare"],
    accent: "#8edcff",
  },
  {
    id: "swcc",
    name: "SWCC",
    fullName: "Special Warfare Combatant-craft Crewmen",
    role: "High-speed maritime insertion & extraction",
    description: "SWCC operators are the boat crews that deliver SEAL teams to their objectives. They operate specialized high-speed craft in hostile waters, providing fire support, infiltration, and rapid extraction under combat conditions.",
    stats: [
      { label: "Craft Types", value: "SOC-R, MKVI, CCM" },
      { label: "Training", value: "37 weeks" },
      { label: "Speed", value: "40+ knots" },
      { label: "Mission", value: "Insertion/Extraction" },
    ],
    missions: ["Coastal Patrol", "Riverine Operations", "Personnel Recovery", "Combat Support"],
    accent: "#70e0bf",
  },
];

export function getNavySpecWarUnits(locale: Locale): NavySpecWarUnit[] {
  if (locale !== "ro") return NAVY_SPECWAR_UNITS;
  return [
    {
      id: "seal-teams",
      name: "Navy SEALs",
      fullName: "Echipe de Mare, Aer și Uscat",
      role: "Operațiuni speciale maritime",
      description: "Forța de operațiuni speciale de elită a Marinei, antrenată să opereze în orice mediu, de la oceanul profund la munți izolați. Echipele SEAL execută acțiune directă, recunoaștere specială, contraterorism și război neconvențional la nivel mondial.",
      stats: [
        { label: "Echipe Active", value: "8 + DEVGRU" },
        { label: "Durată BUD/S", value: "6 luni" },
        { label: "Rată Selecție", value: "~25%" },
        { label: "Desfășurare", value: "Globală" },
      ],
      missions: ["Acțiune Directă", "Recunoaștere Specială", "Contraterorism", "Război Neconvențional"],
      accent: "#8edcff",
    },
    {
      id: "swcc",
      name: "SWCC",
      fullName: "Echipaje de Nave Speciale de Luptă",
      role: "Inserție și extracție maritimă de mare viteză",
      description: "Operatorii SWCC sunt echipajele de barcă care livrează echipele SEAL la obiectivele lor. Operează nave speciale de mare viteză în ape ostile, oferind sprijin de foc, infiltrare și extracție rapidă în condiții de luptă.",
      stats: [
        { label: "Tipuri Nave", value: "SOC-R, MKVI, CCM" },
        { label: "Antrenament", value: "37 săptămâni" },
        { label: "Viteză", value: "74+ km/h" },
        { label: "Misiune", value: "Inserție/Extracție" },
      ],
      missions: ["Patrulare Costieră", "Operațiuni Fluviale", "Recuperare Personal", "Sprijin de Luptă"],
      accent: "#70e0bf",
    },
  ];
}
