import { SITE_IMAGES } from "@/lib/site-images";

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
