import { SITE_IMAGES } from "@/lib/site-images";
import type { Locale } from "@/lib/i18n/config";

export interface SpaceForceMetric {
  value: string;
  label: string;
  detail: string;
}

export interface SpaceForceCapability {
  kicker: string;
  title: string;
  description: string;
  stat: string;
  accent: string;
}

export interface SpaceForcePlatform {
  name: string;
  designation: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  capability: string;
  specs: { label: string; value: string }[];
}

export interface SpaceForceTheater {
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

export interface SpaceForceHeritageEvent {
  year: string;
  title: string;
  description: string;
  significance: string;
  imageSrc: string;
  aspectClass?: string;
  imageFit?: "cover" | "contain";
}

export interface SpaceForceFleetComparison {
  country: string;
  flag: string;
  militarySatellites: number;
  gpsSatellites: number;
  totalSpacecraft: number;
  highlight?: boolean;
}

export interface SpaceForceFutureProgram {
  label: string;
  title: string;
  description: string;
  status: string;
  imageSrc: string;
  imageAlt: string;
  capability: string;
  specs: { label: string; value: string }[];
}

export interface SpaceForceBase {
  name: string;
  location: string;
  role: string;
  description: string;
  accent: string;
  stats: { label: string; value: string }[];
}

export const SF_METRICS: SpaceForceMetric[] = [
  {
    value: "908",
    label: "X-37B Spaceplane Record",
    detail: "The autonomous orbital test vehicle conducts classified research, recently spending 908 consecutive days in space.",
  },
  {
    value: "26K+",
    label: "Orbital Space Watch",
    detail: "Using systems like the 'Space Fence' radar in the Marshall Islands to track debris as small as a marble.",
  },
  {
    value: "27",
    label: "Tactical Launch (Hours)",
    detail: "The Victus Nox mission prepared, encapsulated, and launched a satellite in just 27 hours from receiving the order.",
  },
  {
    value: "<1ns",
    label: "GPS III Timing Accuracy",
    detail: "Timing signals accurate to within under one nanosecond, synchronizing global stock markets and energy grids.",
  },
  {
    value: "22,300",
    label: "Deep Space Patrol (Miles)",
    detail: "GSSAP satellites operate 22,300 miles above Earth, providing close-up inspections of strategic geosynchronous assets.",
  },
  {
    value: "14K",
    label: "Agile Service Force",
    detail: "America's smallest military branch, engineered as a lean, software-driven force where every operator has high leverage.",
  },
];

export const SF_CAPABILITIES: SpaceForceCapability[] = [
  {
    kicker: "01 - PNT",
    title: "GPS & Timing",
    description:
      "Space Force operates the military backbone of GPS, providing the precision timing and navigation signal used by joint weapons, aircraft, ships, financial systems, power grids, and civilian devices.",
    stat: "31+ satellites",
    accent: "#3ddbd9",
  },
  {
    kicker: "02 - WARNING",
    title: "Missile Warning",
    description:
      "Overhead infrared satellites and ground radars detect launches, characterize threats, and feed warning data to national command authorities and combatant commanders within seconds.",
    stat: "24/7 watch",
    accent: "#ff6b6b",
  },
  {
    kicker: "03 - COMMS",
    title: "Protected SATCOM",
    description:
      "Military satellite communications connect nuclear command and control, deployed headquarters, aircraft, ships, and ground units through contested environments.",
    stat: "Global links",
    accent: "#b9c7d9",
  },
  {
    kicker: "04 - SDA",
    title: "Space Domain Awareness",
    description:
      "Sensor networks track objects in orbit, monitor maneuvers, identify hazards, and help commanders understand what is happening above Earth before it affects operations below.",
    stat: "Orbital custody",
    accent: "#8b5cf6",
  },
  {
    kicker: "05 - DEFENSE",
    title: "Orbital Defense",
    description:
      "Guardians protect satellite constellations, harden ground networks, and plan operations that preserve access to the orbital infrastructure every modern force depends on.",
    stat: "Always above",
    accent: "#34d399",
  },
];

export const SF_SYSTEMS: SpaceForcePlatform[] = [
  {
    name: "GPS Constellation",
    designation: "Positioning, Navigation & Timing",
    role:
      "A medium-Earth-orbit constellation that gives U.S. forces precision navigation, weapon guidance, encrypted military signals, and the timing layer behind global infrastructure.",
    imageSrc: SITE_IMAGES.spaceForce.earthNight,
    imageAlt: "United States at night from space",
    capability: "Precision timing and navigation",
    specs: [
      { label: "Orbit", value: "MEO" },
      { label: "Mission", value: "PNT" },
      { label: "Coverage", value: "Global" },
      { label: "Signal", value: "Civil + military" },
    ],
  },
  {
    name: "Missile Warning Network",
    designation: "OPIR / Ground Radar",
    role:
      "Space and ground sensors detect launches, track trajectories, and provide warning for North America, allies, deployed forces, and strategic deterrence forces.",
    imageSrc: SITE_IMAGES.spaceForce.launch,
    imageAlt: "Rocket launch supporting space operations",
    capability: "Launch detection and warning",
    specs: [
      { label: "Posture", value: "24/7" },
      { label: "Sensors", value: "Space + ground" },
      { label: "Output", value: "Warning data" },
      { label: "Users", value: "Joint force" },
    ],
  },
  {
    name: "Protected SATCOM",
    designation: "Strategic Communications",
    role:
      "Hardened military communications link commanders and forces in contested environments, including strategic command and control and theater operations.",
    imageSrc: SITE_IMAGES.spaceForce.earth,
    imageAlt: "Planet Earth from space",
    capability: "Resilient global communications",
    specs: [
      { label: "Mission", value: "MILSATCOM" },
      { label: "Users", value: "Joint / allied" },
      { label: "Priority", value: "Assured C2" },
      { label: "Range", value: "Global" },
    ],
  },
  {
    name: "Space Domain Sensors",
    designation: "Orbital Awareness",
    role:
      "Radars, telescopes, and data systems maintain custody of objects in orbit, watch adversary movement, and warn operators about collisions or hostile activity.",
    imageSrc: SITE_IMAGES.spaceForce.spacex,
    imageAlt: "Launch vehicle ascending into space",
    capability: "Orbital tracking and custody",
    specs: [
      { label: "Domain", value: "LEO-GEO" },
      { label: "Task", value: "Track / ID" },
      { label: "Tempo", value: "Persistent" },
      { label: "Effect", value: "SDA" },
    ],
  },
  {
    name: "National Security Launch",
    designation: "Assured Access to Space",
    role:
      "Launch partnerships place critical payloads into orbit, refresh constellations, and make the industrial base a central part of American spacepower.",
    imageSrc: SITE_IMAGES.spaceForce.launch,
    imageAlt: "Falcon 9 launch for national security space missions",
    capability: "Assured orbital access",
    specs: [
      { label: "Mission", value: "NSSL" },
      { label: "Payloads", value: "Military / intel" },
      { label: "Range", value: "Cape / Vandenberg" },
      { label: "Cadence", value: "Regular" },
    ],
  },
];

export const SF_OPERATIONS: SpaceForceTheater[] = [
  {
    id: "spoc",
    name: "Space Operations Command",
    region: "SpOC",
    headline: "The operational fight in orbit",
    description:
      "Space Operations Command presents combat-ready space forces to U.S. Space Command and the joint force, turning satellites, sensors, and networks into operational effects.",
    signal: "Combat-ready space forces",
    imageSrc: SITE_IMAGES.spaceForce.earthNight,
    imageAlt: "Night lights across the United States from space",
    accent: "#3ddbd9",
    metrics: [
      { label: "Focus", value: "Operations" },
      { label: "Domain", value: "Space" },
      { label: "Users", value: "Joint force" },
    ],
  },
  {
    id: "ssc",
    name: "Space Systems Command",
    region: "SSC",
    headline: "Acquisition at orbital speed",
    description:
      "Space Systems Command develops, acquires, launches, and sustains space capabilities, from satellites and ground systems to launch services and resilient architectures.",
    signal: "Build, launch, sustain",
    imageSrc: SITE_IMAGES.spaceForce.launch,
    imageAlt: "Launch vehicle rising into the sky",
    accent: "#b9c7d9",
    metrics: [
      { label: "Focus", value: "Acquisition" },
      { label: "Portfolio", value: "Satellites / launch" },
      { label: "Base", value: "Los Angeles" },
    ],
  },
  {
    id: "starcom",
    name: "STARCOM",
    region: "Training & Readiness",
    headline: "Guardians trained for contested space",
    description:
      "Space Training and Readiness Command develops doctrine, education, exercises, and test culture for a service designed to operate through interference and attack.",
    signal: "Doctrine and readiness",
    imageSrc: SITE_IMAGES.spaceForce.spacex,
    imageAlt: "Rocket launching into a blue sky",
    accent: "#8b5cf6",
    metrics: [
      { label: "Focus", value: "Training" },
      { label: "Output", value: "Ready crews" },
      { label: "Culture", value: "Test / learn" },
    ],
  },
  {
    id: "components",
    name: "Joint Components",
    region: "USSPACECOM Support",
    headline: "Space effects for every theater",
    description:
      "Space Force components connect orbital capabilities to combatant commands, giving commanders access to warning, navigation, communications, ISR, and space control expertise.",
    signal: "Integrated with combatant commands",
    imageSrc: SITE_IMAGES.spaceForce.earth,
    imageAlt: "Earth viewed from orbit",
    accent: "#34d399",
    metrics: [
      { label: "Support", value: "COCOMs" },
      { label: "Effects", value: "PNT / SATCOM / warning" },
      { label: "Reach", value: "Global" },
    ],
  },
];

export const SF_TIMELINE: SpaceForceHeritageEvent[] = [
  {
    year: "1957",
    title: "Space Becomes a Strategic Domain",
    description:
      "The launch of Sputnik makes orbit a national-security priority and starts the race to build military warning, communications, weather, and navigation systems in space.",
    significance: "Strategic space age begins",
    imageSrc: SITE_IMAGES.spaceForce.sputnik,
    aspectClass: "aspect-[4/3]",
    imageFit: "cover",
  },
  {
    year: "1982",
    title: "Air Force Space Command",
    description:
      "Air Force Space Command is established to organize military space operations decades before the Space Force becomes an independent service.",
    significance: "Dedicated space command culture",
    imageSrc: SITE_IMAGES.spaceForce.afscLogo,
    aspectClass: "aspect-square",
    imageFit: "contain",
  },
  {
    year: "1995",
    title: "GPS Reaches Full Operational Capability",
    description:
      "GPS matures into a global utility and military advantage, transforming precision strike, timing, navigation, logistics, and civilian infrastructure.",
    significance: "PNT becomes foundational",
    imageSrc: SITE_IMAGES.spaceForce.gpsEarth,
    aspectClass: "aspect-square",
    imageFit: "cover",
  },
  {
    year: "2019",
    title: "United States Space Force Established",
    description:
      "The Space Force is created on December 20, 2019, separating military space responsibilities into a new branch focused on orbital security.",
    significance: "First new U.S. service since 1947",
    imageSrc: SITE_IMAGES.spaceForce.launchPoster,
    aspectClass: "aspect-[3/4]",
    imageFit: "cover",
  },
  {
    year: "2020",
    title: "Guardians Named",
    description:
      "Space Force personnel become Guardians, marking a distinct service identity built around space operations, acquisition, intelligence, and cyber defense.",
    significance: "Guardian identity",
    imageSrc: SITE_IMAGES.spaceForce.guardiansPoster,
    aspectClass: "aspect-[16/9]",
    imageFit: "cover",
  },
  {
    year: "2024",
    title: "Contested Space Era",
    description:
      "The service accelerates resilient architectures, proliferated constellations, cyber defense, and operational integration as orbit becomes more congested and contested.",
    significance: "Resilience becomes doctrine",
    imageSrc: SITE_IMAGES.spaceForce.earth,
    aspectClass: "aspect-[16/9]",
    imageFit: "cover",
  },
];

export const SF_COMPARISON: SpaceForceFleetComparison[] = [
  { country: "United States", flag: "🇺🇸", militarySatellites: 250, gpsSatellites: 31, totalSpacecraft: 9000, highlight: true },
  { country: "China", flag: "🇨🇳", militarySatellites: 150, gpsSatellites: 35, totalSpacecraft: 900 },
  { country: "Russia", flag: "🇷🇺", militarySatellites: 100, gpsSatellites: 24, totalSpacecraft: 200 },
  { country: "India", flag: "🇮🇳", militarySatellites: 20, gpsSatellites: 7, totalSpacecraft: 100 },
  { country: "Japan", flag: "🇯🇵", militarySatellites: 10, gpsSatellites: 7, totalSpacecraft: 90 },
  { country: "European Union", flag: "🇪🇺", militarySatellites: 25, gpsSatellites: 28, totalSpacecraft: 800 },
];

export const SF_FUTURE_PROGRAMS: SpaceForceFutureProgram[] = [
  {
    label: "GPS IIIF",
    title: "Next-Generation GPS",
    description:
      "Modernized GPS satellites improve accuracy, resilience, signal power, and anti-jam capability for both civilian users and military operations.",
    status: "Modernization pipeline",
    imageSrc: SITE_IMAGES.spaceForce.earthNight,
    imageAlt: "Global lights depending on satellite timing",
    capability: "Resilient PNT",
    specs: [
      { label: "Mission", value: "PNT" },
      { label: "Signal", value: "Modernized" },
      { label: "Users", value: "Global" },
      { label: "Priority", value: "Resilience" },
    ],
  },
  {
    label: "Next-Gen OPIR",
    title: "Next-Generation Missile Warning",
    description:
      "New overhead persistent infrared systems are designed to detect and track advanced missile threats while sustaining strategic warning.",
    status: "In development",
    imageSrc: SITE_IMAGES.spaceForce.launch,
    imageAlt: "Rocket launch observed from the ground",
    capability: "Advanced warning",
    specs: [
      { label: "Mission", value: "OPIR" },
      { label: "Threat", value: "Missiles" },
      { label: "Tempo", value: "Persistent" },
      { label: "Effect", value: "Warning" },
    ],
  },
  {
    label: "Resilient SATCOM",
    title: "Protected Communications Architecture",
    description:
      "The future communications stack mixes protected military satellites, commercial capacity, tactical links, and cyber-hardened ground segments.",
    status: "Architecture transition",
    imageSrc: SITE_IMAGES.spaceForce.earth,
    imageAlt: "Earth with global communications implied",
    capability: "Assured command and control",
    specs: [
      { label: "Mission", value: "SATCOM" },
      { label: "Design", value: "Hybrid" },
      { label: "Users", value: "Joint force" },
      { label: "Priority", value: "Assured C2" },
    ],
  },
  {
    label: "Proliferated LEO",
    title: "Resilient Orbital Layers",
    description:
      "Larger, distributed constellations make space capabilities harder to disrupt and faster to refresh as technology and threats change.",
    status: "Fielding and scaling",
    imageSrc: SITE_IMAGES.spaceForce.spacex,
    imageAlt: "Launch vehicle supporting future constellations",
    capability: "Distributed resilience",
    specs: [
      { label: "Orbit", value: "LEO" },
      { label: "Model", value: "Distributed" },
      { label: "Goal", value: "Resilience" },
      { label: "Refresh", value: "Rapid" },
    ],
  },
];

export const SF_BASES: SpaceForceBase[] = [
  {
    name: "Peterson SFB",
    location: "Colorado, USA",
    role: "Operational Headquarters",
    description:
      "A central node for Space Force operations in Colorado Springs, connected to U.S. Space Command, NORAD, and the broader Front Range space enterprise.",
    accent: "#3ddbd9",
    stats: [
      { label: "Region", value: "Front Range" },
      { label: "Mission", value: "Operations" },
      { label: "Domain", value: "Space C2" },
    ],
  },
  {
    name: "Schriever SFB",
    location: "Colorado, USA",
    role: "Satellite Operations",
    description:
      "Home to critical satellite command-and-control missions, including crews tied to GPS and other space operations.",
    accent: "#b9c7d9",
    stats: [
      { label: "Mission", value: "Satellite C2" },
      { label: "Focus", value: "PNT / ops" },
      { label: "Posture", value: "24/7" },
    ],
  },
  {
    name: "Buckley SFB",
    location: "Colorado, USA",
    role: "Missile Warning",
    description:
      "A key installation for missile warning and space-based infrared missions that support strategic warning and homeland defense.",
    accent: "#ff6b6b",
    stats: [
      { label: "Mission", value: "Warning" },
      { label: "Sensors", value: "Infrared" },
      { label: "Tempo", value: "Continuous" },
    ],
  },
  {
    name: "Vandenberg SFB",
    location: "California, USA",
    role: "Launch & Test Range",
    description:
      "The West Coast launch and test range for polar and high-inclination orbits, national security launches, and missile testing.",
    accent: "#34d399",
    stats: [
      { label: "Role", value: "Launch range" },
      { label: "Orbit", value: "Polar" },
      { label: "Coast", value: "Pacific" },
    ],
  },
  {
    name: "Patrick SFB",
    location: "Florida, USA",
    role: "Eastern Range",
    description:
      "Supports launch and range operations tied to Cape Canaveral and the Eastern Range, one of America's primary gateways to orbit.",
    accent: "#8b5cf6",
    stats: [
      { label: "Role", value: "Eastern Range" },
      { label: "Gateway", value: "Cape" },
      { label: "Mission", value: "Launch support" },
    ],
  },
  {
    name: "Los Angeles AFB",
    location: "California, USA",
    role: "Systems Acquisition",
    description:
      "Home of Space Systems Command, where satellites, launch, ground systems, and space acquisition programs are managed.",
    accent: "#3ddbd9",
    stats: [
      { label: "Command", value: "SSC" },
      { label: "Focus", value: "Acquisition" },
      { label: "Portfolio", value: "Space systems" },
    ],
  },
];

export function getSpaceForceMetrics(locale: Locale): SpaceForceMetric[] {
  if (locale !== "ro") return SF_METRICS;
  return [
    { value: "908", label: "Record Navetă X-37B", detail: "Vehiculul autonom de testare orbitală efectuează cercetări clasificate, petrecând recent 908 zile consecutive în spațiu." },
    { value: "26K+", label: "Supraveghere Spațială", detail: "Utilizarea radarului 'Space Fence' din Insulele Marshall pentru a urmări resturi spațiale de dimensiunea unei bile." },
    { value: "27", label: "Lansare Tactică (Ore)", detail: "Misiunea Victus Nox a pregătit, încapsulat și lansat un satelit în doar 27 de ore de la primirea ordinului." },
    { value: "<1ns", label: "Precizie Timp GPS III", detail: "Semnale de timp precise la nivel de sub o nanosecundă, sincronizând bursele globale și rețelele energetice." },
    { value: "22.300", label: "Patrulă Spațială (Mile)", detail: "Sateliții GSSAP operează la 22.300 de mile deasupra Pământului, inspectând activele geostaționare strategice." },
    { value: "14K", label: "Forță de Serviciu Agilă", detail: "Cea mai mică ramură militară a Americii, concepută ca o forță agilă, unde fiecare operator are un impact uriaș." },
  ];
}

export function getSpaceForceCapabilities(locale: Locale): SpaceForceCapability[] {
  if (locale !== "ro") return SF_CAPABILITIES;
  return [
    { ...SF_CAPABILITIES[0], kicker: "01 - PNT", title: "GPS & Sincronizare", description: "Space Force operează coloana vertebrală militară a GPS, oferind semnalul de navigație și sincronizare folosit de arme, aeronave, nave, rețele energetice și dispozitive civile.", stat: "31+ sateliți" },
    { ...SF_CAPABILITIES[1], kicker: "02 - AVERTIZARE", title: "Avertizare Rachete", description: "Sateliții infraroșu și radarele terestre detectează lansări, caracterizează amenințări și trimit date de avertizare în câteva secunde.", stat: "Veghe 24/7" },
    { ...SF_CAPABILITIES[2], kicker: "03 - COMMS", title: "SATCOM Protejat", description: "Comunicațiile militare prin satelit conectează comandamentul nuclear, cartierele generale, aeronavele, navele și unitățile terestre în medii contestate.", stat: "Legături globale" },
    { ...SF_CAPABILITIES[3], kicker: "04 - SDA", title: "Conștientizare Spațială", description: "Rețelele de senzori urmăresc obiecte pe orbită, monitorizează manevre, identifică pericole și ajută comandanții să înțeleagă domeniul orbital.", stat: "Custodie orbitală" },
    { ...SF_CAPABILITIES[4], kicker: "05 - APĂRARE", title: "Apărare Orbitală", description: "Guardienii protejează constelațiile de sateliți, întăresc rețelele la sol și păstrează accesul la infrastructura orbitală.", stat: "Mereu deasupra" },
  ];
}

export function getSpaceForceSystems(locale: Locale): SpaceForcePlatform[] {
  if (locale !== "ro") return SF_SYSTEMS;
  return SF_SYSTEMS.map((system) => {
    const roMap: Record<string, { designation: string; role: string; capability: string }> = {
      "GPS Constellation": { designation: "Poziționare, Navigație & Sincronizare", role: "O constelație pe orbită medie care oferă forțelor SUA navigație precisă, ghidarea armelor, semnale militare criptate și stratul de timp al infrastructurii globale.", capability: "Timp și navigație de precizie" },
      "Missile Warning Network": { designation: "OPIR / Radar Terestru", role: "Senzori spațiali și tereștri detectează lansări, urmăresc traiectorii și oferă avertizare pentru America de Nord, aliați și forțe desfășurate.", capability: "Detectare și avertizare lansări" },
      "Protected SATCOM": { designation: "Comunicații Strategice", role: "Comunicații militare întărite leagă comandanții și forțele în medii contestate, inclusiv comandă și control strategic.", capability: "Comunicații globale reziliente" },
      "Space Domain Sensors": { designation: "Conștientizare Orbitală", role: "Radare, telescoape și sisteme de date mențin custodia obiectelor pe orbită și urmăresc mișcarea adversarilor.", capability: "Urmărire și custodie orbitală" },
      "National Security Launch": { designation: "Acces Asigurat la Spațiu", role: "Parteneriatele de lansare plasează payload-uri critice pe orbită și reîmprospătează constelațiile.", capability: "Acces orbital asigurat" },
    };
    const ro = roMap[system.name];
    return ro ? { ...system, ...ro } : system;
  });
}

export function getSpaceForceOperations(locale: Locale): SpaceForceTheater[] {
  if (locale !== "ro") return SF_OPERATIONS;
  return [
    { ...SF_OPERATIONS[0], headline: "Lupta operațională pe orbită", description: "Space Operations Command prezintă forțe spațiale pregătite de luptă către U.S. Space Command și forța întrunită.", signal: "Forțe spațiale pregătite" },
    { ...SF_OPERATIONS[1], headline: "Achiziție la viteza orbitei", description: "Space Systems Command dezvoltă, achiziționează, lansează și susține capabilități spațiale.", signal: "Construiește, lansează, susține" },
    { ...SF_OPERATIONS[2], name: "STARCOM", headline: "Guardieni antrenați pentru spațiu contestat", description: "STARCOM dezvoltă doctrină, educație, exerciții și cultură de testare pentru operațiuni prin interferență și atac.", signal: "Doctrină și readiness" },
    { ...SF_OPERATIONS[3], name: "Componente Întrunite", headline: "Efecte spațiale pentru fiecare teatru", description: "Componentele Space Force conectează capabilitățile orbitale la comandamentele combatante.", signal: "Integrat cu comandamentele combatante" },
  ];
}

export function getSpaceForceTimeline(locale: Locale): SpaceForceHeritageEvent[] {
  if (locale !== "ro") return SF_TIMELINE;
  return [
    { ...SF_TIMELINE[0], title: "Spațiul Devine Domeniu Strategic", description: "Lansarea Sputnik transformă orbita într-o prioritate de securitate națională.", significance: "Începe era spațială strategică" },
    { ...SF_TIMELINE[1], title: "Air Force Space Command", description: "Air Force Space Command este înființat pentru a organiza operațiunile spațiale militare.", significance: "Cultură dedicată spațiului" },
    { ...SF_TIMELINE[2], title: "GPS Atinge Capacitatea Operațională", description: "GPS devine utilitate globală și avantaj militar, transformând lovitura de precizie, sincronizarea și navigația.", significance: "PNT devine fundațional" },
    { ...SF_TIMELINE[3], title: "United States Space Force Înființată", description: "Space Force este creată pe 20 decembrie 2019 ca ramură nouă concentrată pe securitatea orbitală.", significance: "Primul serviciu nou din 1947" },
    { ...SF_TIMELINE[4], title: "Numele Guardian Devine Oficial", description: "Personalul Space Force devine Guardians, marcând o identitate de serviciu distinctă.", significance: "Identitate de Guardian" },
    { ...SF_TIMELINE[5], title: "Era Spațiului Contestat", description: "Serviciul accelerează arhitecturi reziliente, constelații proliferate și apărare cyber.", significance: "Reziliența devine doctrină" },
  ];
}

export function getSpaceForceFleetComparison(locale: Locale): SpaceForceFleetComparison[] {
  if (locale !== "ro") return SF_COMPARISON;
  return [
    { country: "Statele Unite", flag: "🇺🇸", militarySatellites: 250, gpsSatellites: 31, totalSpacecraft: 9000, highlight: true },
    { country: "China", flag: "🇨🇳", militarySatellites: 150, gpsSatellites: 35, totalSpacecraft: 900 },
    { country: "Rusia", flag: "🇷🇺", militarySatellites: 100, gpsSatellites: 24, totalSpacecraft: 200 },
    { country: "India", flag: "🇮🇳", militarySatellites: 20, gpsSatellites: 7, totalSpacecraft: 100 },
    { country: "Japonia", flag: "🇯🇵", militarySatellites: 10, gpsSatellites: 7, totalSpacecraft: 90 },
    { country: "Uniunea Europeană", flag: "🇪🇺", militarySatellites: 25, gpsSatellites: 28, totalSpacecraft: 800 },
  ];
}

export function getSpaceForceFuturePrograms(locale: Locale): SpaceForceFutureProgram[] {
  if (locale !== "ro") return SF_FUTURE_PROGRAMS;
  return SF_FUTURE_PROGRAMS.map((program) => {
    const roMap: Record<string, { title: string; description: string; capability: string; status: string }> = {
      "GPS IIIF": { title: "GPS de Nouă Generație", description: "Sateliții GPS modernizați îmbunătățesc precizia, reziliența, puterea semnalului și capacitatea anti-jam.", capability: "PNT rezilient", status: "Modernizare" },
      "Next-Gen OPIR": { title: "Avertizare Rachete Next-Gen", description: "Sistemele infraroșu persistente de nouă generație detectează și urmăresc amenințări avansate.", capability: "Avertizare avansată", status: "În dezvoltare" },
      "Resilient SATCOM": { title: "Arhitectură de Comunicații Protejate", description: "Stiva viitoare combină sateliți militari protejați, capacitate comercială și segmente terestre întărite cyber.", capability: "Comandă și control asigurate", status: "Tranziție arhitecturală" },
      "Proliferated LEO": { title: "Straturi Orbitale Reziliente", description: "Constelațiile distribuite fac capabilitățile spațiale mai greu de perturbat și mai rapid de reîmprospătat.", capability: "Reziliență distribuită", status: "Scalare" },
    };
    const ro = roMap[program.label];
    return ro ? { ...program, ...ro } : program;
  });
}

export function getSpaceForceBases(locale: Locale): SpaceForceBase[] {
  if (locale !== "ro") return SF_BASES;
  return SF_BASES.map((base) => {
    const roMap: Record<string, { role: string; description: string }> = {
      "Peterson SFB": { role: "Cartier Operațional", description: "Un nod central pentru operațiunile Space Force în Colorado Springs." },
      "Schriever SFB": { role: "Operațiuni Satelit", description: "Gazdă pentru misiuni critice de comandă și control satelitar, inclusiv GPS." },
      "Buckley SFB": { role: "Avertizare Rachete", description: "Instalație-cheie pentru avertizare rachete și misiuni infraroșu spațiale." },
      "Vandenberg SFB": { role: "Lansare & Testare", description: "Poligonul de lansare și testare de pe Coasta de Vest pentru orbite polare și lansări de securitate națională." },
      "Patrick SFB": { role: "Eastern Range", description: "Sprijină operațiunile de lansare și range legate de Cape Canaveral." },
      "Los Angeles AFB": { role: "Achiziție Sisteme", description: "Gazda Space Systems Command, unde sunt gestionate programele de sateliți, lansare și sisteme la sol." },
    };
    const ro = roMap[base.name];
    return ro ? { ...base, ...ro } : base;
  });
}
