// ─── Military Section Data ────────────────────────────────────────────────────
// Phase 5: American Military Power
// All images: US government public domain (Wikimedia Commons) or NASA.

import type { Locale } from "@/lib/i18n/config";
import { SITE_IMAGES } from "@/lib/site-images";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MilitaryStat {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  sublabel: string;
}

export interface MilitaryBranch {
  id: string;
  name: string;
  shortName: string;
  founded: number;
  personnel: string;
  tagline: string;
  description: string;
  accentColor: string;
  iconEmoji: string;
  keyFacts: string[];
  imageSrc: string;
  imageAlt: string;
}

export interface WeaponSystem {
  id: string;
  name: string;
  designation: string;
  category: string;
  status: "operational" | "limited" | "development";
  quantity: string;
  speed?: string;
  range?: string;
  ceiling?: string;
  stealth?: boolean;
  nuclear?: boolean;
  description: string;
  significance: string;
  imageSrc: string;
  imageAlt: string;
  specs: { label: string; value: string }[];
}

export interface DARPAProgram {
  id: string;
  name: string;
  category: string;
  status: "active" | "testing" | "concept";
  description: string;
  significance: string;
  icon: string;
}

export interface DefenseContractor {
  name: string;
  revenue: string;
  programs: string[];
  specialty: string;
}

export interface CarrierGroupPosition {
  id: string;
  ship: string;
  region: string;
  cx: number; // SVG x %
  cy: number; // SVG y %
  status: "deployed" | "transit" | "homeport";
}

// ─── Global Stats ─────────────────────────────────────────────────────────────

export const MILITARY_STATS: MilitaryStat[] = [
  { id: "budget",    value: 916,  suffix: "B",   prefix: "$", label: "Defense Budget",            sublabel: "FY2025 — larger than next 9 nations combined" },
  { id: "personnel", value: 1.34, suffix: "M",   decimals: 2, label: "Active Duty Personnel",     sublabel: "Plus 765K reserve and 700K civilian DOD" },
  { id: "carriers",  value: 11,   suffix: "",                 label: "Carrier Strike Groups",      sublabel: "11 nuclear-powered supercarriers — 100% world share"  },
  { id: "nukes",     value: 5044, suffix: "",                 label: "Nuclear Warheads",            sublabel: "Active and reserve inventory — the Triad" },
  { id: "satellites",value: 500,  suffix: "+",                label: "Military Satellites",         sublabel: "Dedicated and classified orbital assets"       },
  { id: "aircraft",  value: 13300,suffix: "+",                label: "Military Aircraft",           sublabel: "World's largest air force (Air Force) and 2nd largest (Navy)" },
  { id: "bases",     value: 750,  suffix: "+",                label: "Overseas Bases",              sublabel: "Projecting power across 80+ countries"         },
  { id: "ships",     value: 530,  suffix: "+",                label: "Naval Vessels",               sublabel: "Including Battle Force and Sealift Command"    },
];

// ─── Military Branches ────────────────────────────────────────────────────────

export const MILITARY_BRANCHES: MilitaryBranch[] = [
  {
    id: "army",
    name: "United States Army",
    shortName: "Army",
    founded: 1775,
    personnel: "452,000 active",
    tagline: "This We'll Defend",
    accentColor: "#78B06A",
    iconEmoji: "🪖",
    description: "The oldest and largest branch, the US Army forms the backbone of ground combat power. With 58 brigade combat teams, over 6,000 tanks, and special operations forces operating in 100+ countries simultaneously.",
    keyFacts: [
      "Special Forces (Green Berets) operate in 100+ countries at any given time",
      "82nd Airborne can deploy globally within 18 hours of notification",
      "Army Cyber Command conducts offensive operations in cyberspace",
      "10,000+ Stryker, Bradley, and M1 Abrams armored vehicles",
    ],
    imageSrc: SITE_IMAGES.armyHero,
    imageAlt: "US Army paratroopers — airborne assault capability",
  },
  {
    id: "navy",
    name: "United States Navy",
    shortName: "Navy",
    founded: 1775,
    personnel: "347,000 active",
    tagline: "Forged by the Sea",
    accentColor: "#1E6FBF",
    iconEmoji: "⚓",
    description: "America's global reach. The US Navy operates on every ocean simultaneously — projecting power from 11 carrier strike groups, 68 submarines, and 290+ surface combatants. The Navy ensures freedom of navigation for the global economy.",
    keyFacts: [
      "11 nuclear-powered aircraft carriers — the rest of the world has 2 total",
      "14 Ohio-class submarines carry 70% of America's nuclear arsenal",
      "SEALs conduct classified operations on every continent",
      "Each carrier strike group represents more air power than most nations' entire air force",
    ],
    imageSrc: SITE_IMAGES.navyHero,
    imageAlt: "USS Gerald R. Ford CVN-78 — the world's most powerful warship",
  },
  {
    id: "airforce",
    name: "United States Air Force",
    shortName: "Air Force",
    founded: 1947,
    personnel: "325,000 active",
    tagline: "Aim High — Fly, Fight, Win",
    accentColor: "#4B89DC",
    iconEmoji: "✈️",
    description: "Global air dominance. The USAF operates 5,500+ aircraft — more than any other nation's entire air force. From stealth bombers to next-generation fighters, it maintains continuous combat-ready superiority in the air.",
    keyFacts: [
      "F-22 Raptor: the only true 5th-generation air superiority fighter in service",
      "B-2 Spirit can reach any target on Earth within hours from CONUS",
      "USAF operates more aircraft than every other country combined",
      "B-21 Raider entered service in 2023 — the next generation of stealth penetration",
    ],
    imageSrc: SITE_IMAGES.airForceHero,
    imageAlt: "B-2 Spirit stealth bomber — invisible, global, nuclear-capable",
  },
  {
    id: "marines",
    name: "United States Marine Corps",
    shortName: "Marines",
    founded: 1775,
    personnel: "178,000 active",
    tagline: "Semper Fidelis",
    accentColor: "#8B1A1A",
    iconEmoji: "🦅",
    description: "America's rapid response force. The Marines maintain three Marine Expeditionary Forces — fully integrated air-ground combat teams capable of projecting power from amphibious vessels within hours. Always forward, always ready.",
    keyFacts: [
      "Marines are trained to operate from sea, by air, and on land simultaneously",
      "Marine Raider Battalions conduct special operations worldwide",
      "Currently modernizing for high-end warfare: F-35Bs, CH-53K King Stallion",
      "Deployed continuously aboard amphibious ready groups globally",
    ],
    imageSrc: SITE_IMAGES.marinesAssault,
    imageAlt: "U.S. Marines conducting an amphibious assault — projection of power from the sea",
  },
  {
    id: "spaceforce",
    name: "United States Space Force",
    shortName: "Space Force",
    founded: 2019,
    personnel: "8,600 active",
    tagline: "Semper Supra — Always Above",
    accentColor: "#3DDBD9",
    iconEmoji: "🛰️",
    description: "America's newest and fastest-growing branch, guarding the orbital infrastructure on which all modern warfare depends. GPS, ISR, missile warning, satellite communications — Space Force defends the systems that make American military supremacy possible.",
    keyFacts: [
      "US military satellites enable precision GPS targeting for all branches",
      "Space Force operates missile warning systems detecting launches within seconds",
      "Responsible for protecting $800B+ in space-based military infrastructure",
      "ASAT (anti-satellite) capabilities can deny orbital access to adversaries",
    ],
    imageSrc: SITE_IMAGES.spaceForceLaunch,
    imageAlt: "US Space Force launch — protecting the orbital domain",
  },
  {
    id: "cyber",
    name: "US Cyber Command",
    shortName: "Cyber",
    founded: 2009,
    personnel: "6,000+ (est.)",
    tagline: "Defend, Deter, Dominate",
    accentColor: "#00D4AA",
    iconEmoji: "⚡",
    description: "The invisible battlefield. US Cyber Command conducts offensive and defensive operations in cyberspace — disrupting adversary networks, protecting American infrastructure, and deterring attacks on critical systems. The 21st century's stealth force.",
    keyFacts: [
      "Stuxnet (2010) destroyed Iranian nuclear centrifuges without a single bomb dropped",
      "133 cyber mission teams covering offensive, defensive, and national mission functions",
      "Can disrupt adversary command-and-control systems globally within hours",
      "Operates alongside NSA in Fort Meade — signals intelligence + cyber operations",
    ],
    imageSrc: SITE_IMAGES.cyberOps,
    imageAlt: "US Cyber Command Operations Center — the nerve center of digital warfare",
  },
];

// ─── Weapon Systems — Crown Jewels ────────────────────────────────────────────

export const WEAPON_SYSTEMS: WeaponSystem[] = [
  {
    id: "b21",
    name: "B-21 Raider",
    designation: "B-21A",
    category: "Stealth Bomber",
    status: "operational",
    quantity: "Production (100+ planned)",
    speed: "High subsonic (Mach 0.9+)",
    range: "Intercontinental (classified)",
    ceiling: "50,000+ ft",
    stealth: true,
    nuclear: true,
    description: "The most advanced aircraft ever built. The B-21 Raider entered service in 2023 as the world's only 6th-generation aircraft. Designed to penetrate any integrated air defense system on Earth and deliver both conventional and nuclear weapons.",
    significance: "Renders every existing air defense system in the world obsolete. China has been building its IADS specifically to defeat the B-2. The B-21 defeats those systems designed to defeat the B-2.",
    imageSrc: SITE_IMAGES.b21Raider,
    imageAlt: "B-21 Raider on its first flight, December 2023",
    specs: [
      { label: "Classification", value: "6th Generation" },
      { label: "Stealth", value: "Ultra-low observable" },
      { label: "Payload", value: "Nuclear + Conventional" },
      { label: "Contract", value: "Northrop Grumman" },
      { label: "Introduced", value: "2023" },
      { label: "Unit Cost", value: "$750M+" },
    ],
  },
  {
    id: "f35",
    name: "F-35 Lightning II",
    designation: "F-35A/B/C",
    category: "Multirole Fighter",
    status: "operational",
    quantity: "900+ delivered (3,300 planned)",
    speed: "Mach 1.6",
    range: "1,380 mi (combat radius)",
    ceiling: "50,000 ft",
    stealth: true,
    nuclear: false,
    description: "The world's most capable multirole combat aircraft. The F-35 is a flying supercomputer — its sensor fusion and electronic warfare systems see threats before adversaries know it exists. Three variants serve all three armed services.",
    significance: "The F-35's real advantage is information, not just stealth. It aggregates sensor data from itself, other F-35s, satellites, and ground systems — giving the pilot a god-eye view of the battlefield that no adversary can match.",
    imageSrc: SITE_IMAGES.f35Lightning,
    imageAlt: "F-35A Lightning II in flight — the world's most advanced multirole fighter",
    specs: [
      { label: "Generation", value: "5th Generation" },
      { label: "Variants", value: "A (USAF), B (USMC), C (USN)" },
      { label: "Speed", value: "Mach 1.6" },
      { label: "Radar", value: "AN/APG-81 AESA" },
      { label: "EW Suite", value: "AN/ASQ-239" },
      { label: "Partners", value: "17 allied nations" },
    ],
  },
  {
    id: "f22",
    name: "F-22 Raptor",
    designation: "F-22A",
    category: "Air Superiority Fighter",
    status: "operational",
    quantity: "186 aircraft",
    speed: "Mach 2.25 (supercruise: Mach 1.82)",
    range: "1,600 mi (with 2 ext. tanks)",
    ceiling: "65,000 ft",
    stealth: true,
    nuclear: false,
    description: "The apex predator of the sky. The F-22 Raptor is the world's only operational supercruise-capable stealth air superiority fighter. No adversary aircraft can detect, outrun, or outmaneuver it. China and Russia have spent 20 years trying to build an equivalent.",
    significance: "Supercruise — the ability to exceed Mach 1 without afterburner — combined with extreme stealth makes the F-22 nearly impossible to engage. By the time an adversary's radar resolves a contact, the Raptor has already fired.",
    imageSrc: SITE_IMAGES.f22Raptor,
    imageAlt: "F-22 Raptor — the world's most capable air superiority fighter",
    specs: [
      { label: "Generation", value: "5th Generation" },
      { label: "Speed", value: "Mach 2.25 (Mach 1.82 supercruise)" },
      { label: "Service Ceiling", value: "65,000 ft" },
      { label: "Radar", value: "AN/APG-77 AESA" },
      { label: "Avionics", value: "Most advanced in production" },
      { label: "Status", value: "Production ended 2011" },
    ],
  },
  {
    id: "gerald-ford",
    name: "Gerald R. Ford Class",
    designation: "CVN-78+",
    category: "Nuclear Carrier",
    status: "operational",
    quantity: "2 in service, 4 ordered",
    nuclear: false,
    description: "The most powerful warship ever built. At 100,000 tons, the Ford class carriers operate 90 aircraft — more air power than most nations' entire air forces. Powered by two A1B nuclear reactors, they operate for 50 years without refueling.",
    significance: "A single carrier strike group commands a 500,000 sq mile maritime domain. With 11 CSGs simultaneously deployed globally, the US Navy can project decisive airpower anywhere on Earth within 72 hours.",
    imageSrc: SITE_IMAGES.geraldFordCarrier,
    imageAlt: "USS Gerald R. Ford (CVN-78) underway — the lead ship of the world's most advanced carrier class",
    specs: [
      { label: "Displacement", value: "100,000+ tons" },
      { label: "Aircraft", value: "90 (F-35C, F/A-18, E-2D, etc.)" },
      { label: "Propulsion", value: "2× A1B nuclear reactors" },
      { label: "Crew", value: "4,539 + 2,500 air wing" },
      { label: "EMALS", value: "Electromagnetic launch" },
      { label: "Lifespan", value: "50 years without nuclear refueling" },
    ],
  },
  {
    id: "ohio",
    name: "Ohio-Class SSBN",
    designation: "SSBN-726+",
    category: "Ballistic Missile Submarine",
    status: "operational",
    quantity: "14 submarines",
    speed: "Classified (25+ kts submerged)",
    nuclear: true,
    description: "The invisible nuclear deterrent. 14 Ohio-class submarines carry 70% of America's nuclear arsenal — 24 Trident II D5 missiles each, with up to 8 independently targetable warheads per missile. Each submarine alone can end civilization.",
    significance: "SSBN survivability is the foundation of nuclear deterrence. Because they are undetectable, they guarantee America's second-strike capability — making a successful first strike on the US not just difficult, but strategically irrational.",
    imageSrc: SITE_IMAGES.ohioSubmarine,
    imageAlt: "USS Ohio (SSGN-726) surfacing — the silent leg of the nuclear triad",
    specs: [
      { label: "Missiles", value: "24 × Trident II D5 SLBM" },
      { label: "Warheads", value: "Up to 192 per submarine" },
      { label: "Range", value: "7,000+ miles (Trident II)" },
      { label: "CEP", value: "~90 meters accuracy" },
      { label: "Depth", value: "Classified (800+ ft)" },
      { label: "Endurance", value: "77 days on patrol" },
    ],
  },
  {
    id: "minuteman",
    name: "Minuteman III ICBM",
    designation: "LGM-30G",
    category: "Intercontinental Ballistic Missile",
    status: "operational",
    quantity: "400 deployed",
    speed: "15,000+ mph (Mach 23)",
    range: "8,000+ miles",
    nuclear: true,
    description: "Land-based nuclear deterrence. 400 Minuteman III ICBMs stand alert 24/7 in hardened silos across Montana, North Dakota, and Wyoming — each carrying up to 3 independently targetable warheads capable of striking any target on Earth in 30 minutes.",
    significance: "The land-based leg of the nuclear triad is the most survivable from a launch-on-warning perspective. Adversaries must allocate multiple warheads per silo to have confidence of destruction — an exchange that is never in their favor.",
    imageSrc: SITE_IMAGES.minutemanLaunch,
    imageAlt: "LGM-30G Minuteman III test launch — the land-based deterrent",
    specs: [
      { label: "Range", value: "8,000+ miles" },
      { label: "Speed", value: "Mach 23" },
      { label: "Time to Target", value: "~30 minutes (any point on Earth)" },
      { label: "Warheads", value: "Up to 3 × W78/W87 MIRVs" },
      { label: "Alert", value: "24/7 continuous" },
      { label: "Silos", value: "Montana, North Dakota, Wyoming" },
    ],
  },
];

// ─── DARPA Programs ───────────────────────────────────────────────────────────

export const DARPA_PROGRAMS: DARPAProgram[] = [
  {
    id: "hypersonic",
    name: "Hypersonic Strike",
    category: "OFFENSIVE SYSTEMS",
    status: "testing",
    icon: "⚡",
    description: "HAWC (Hypersonic Air-breathing Weapon Concept) and HACM are scramjet-powered missiles traveling Mach 5+ — too fast for any existing air defense system to intercept.",
    significance: "Renders all current point-defense systems — Patriot, S-400, THAAD — effectively obsolete against a committed adversary.",
  },
  {
    id: "autonomous",
    name: "Autonomous Combat Systems",
    category: "AI / ROBOTICS",
    status: "testing",
    icon: "🤖",
    description: "The Collaborative Combat Aircraft (CCA) program develops AI wingmen that fly alongside manned fighters, conducting electronic warfare, reconnaissance, and offensive strike — expendable and unbounded by human cognitive limits.",
    significance: "A single F-35 pilot could command 4+ autonomous wingmen, multiplying combat power by 5× without additional human risk.",
  },
  {
    id: "directed-energy",
    name: "Directed Energy Weapons",
    category: "NEXT-GEN WEAPONS",
    status: "testing",
    icon: "🔆",
    description: "High-Energy Laser (HEL) and High-Power Microwave (HPM) weapons offer unlimited magazines, speed-of-light engagement, and near-zero cost per shot ($1 vs. $3M+ for kinetic interceptors).",
    significance: "The Navy's HELIOS system can defeat drones, missiles, and small craft at a cost of $1 per engagement vs. millions for missile interceptors.",
  },
  {
    id: "quantum",
    name: "Quantum Sensing & Computing",
    category: "INFORMATION WARFARE",
    status: "active",
    icon: "⚛️",
    description: "Quantum gravimeters can detect submarine wakes from orbital altitude. Quantum computing will break current encryption standards — NIST is racing to deploy quantum-resistant algorithms before adversaries achieve quantum supremacy.",
    significance: "Whoever achieves quantum computing superiority first can decrypt all existing encrypted communications — military, diplomatic, financial. The implications are civilizational.",
  },
  {
    id: "cyber-offensive",
    name: "Offensive Cyber Operations",
    category: "CYBER WARFARE",
    status: "active",
    icon: "💻",
    description: "US Cyber Command maintains persistent presence in adversary critical infrastructure — power grids, financial systems, command-and-control networks — enabling near-instantaneous disruption at the onset of conflict.",
    significance: "Stuxnet (2010) destroyed 20% of Iran's nuclear centrifuges without a physical attack. Current capabilities are orders of magnitude more sophisticated.",
  },
  {
    id: "ai-c2",
    name: "AI Command & Control",
    category: "AI / DECISION SYSTEMS",
    status: "active",
    icon: "🧠",
    description: "JADO (Joint All-Domain Operations) and ABMS (Advanced Battle Management System) use AI to fuse data from all sensors, platforms, and domains — presenting commanders with decision-quality information in seconds rather than hours.",
    significance: "The goal: compress the OODA loop to milliseconds. By the time an adversary has observed and oriented, the US has already acted.",
  },
];

// ─── Defense Contractors ──────────────────────────────────────────────────────

export const DEFENSE_CONTRACTORS: DefenseContractor[] = [
  { name: "Lockheed Martin",     revenue: "$67.6B",  specialty: "Fighters, Missiles, Space",  programs: ["F-35 Lightning II", "F-22 Raptor", "C-130J", "Trident II D5", "Sikorsky Black Hawk"] },
  { name: "RTX (Raytheon)",      revenue: "$68.9B",  specialty: "Missiles, Air Defense, EW",  programs: ["Patriot PAC-3", "Stinger", "Tomahawk", "AIM-120 AMRAAM", "LTAMDS Radar"] },
  { name: "Northrop Grumman",    revenue: "$37.0B",  specialty: "Stealth, Space, Electronics", programs: ["B-21 Raider", "B-2 Spirit (maintenance)", "E-2D Hawkeye", "GBSD/Sentinel ICBM"] },
  { name: "Boeing Defense",      revenue: "$22.9B",  specialty: "Rotary Wing, Naval, Space",   programs: ["F/A-18 Super Hornet", "CH-47 Chinook", "AH-64 Apache", "KC-46A Pegasus"] },
  { name: "General Dynamics",    revenue: "$42.3B",  specialty: "Ground Combat, Shipbuilding", programs: ["M1A2 Abrams", "Virginia-class SSN", "Gulfstream (ISR platforms)"] },
  { name: "L3Harris",            revenue: "$19.4B",  specialty: "ISR, Communications, EW",    programs: ["AN/PRC-163 Radio", "F-16 AESA radar", "Space-based ISR sensors"] },
];

export const BUDGET_DATA = [
  { country: "United States", budget: 916, flag: "🇺🇸" },
  { country: "China",         budget: 336, flag: "🇨🇳" },
  { country: "Russia",        budget: 140, flag: "🇷🇺" },
  { country: "India",         budget:  83, flag: "🇮🇳" },
  { country: "Saudi Arabia",  budget:  75, flag: "🇸🇦" },
  { country: "UK",            budget:  73, flag: "🇬🇧" },
  { country: "Germany",       budget:  67, flag: "🇩🇪" },
];

// ─── Carrier Group Positions (approximate deployment regions) ─────────────────

export const CARRIER_POSITIONS: CarrierGroupPosition[] = [
  { id: "cvn68", ship: "USS Nimitz (CVN-68)",           region: "Rio de Janeiro, Brazil (Southern Seas 2026)", cx: 64.0, cy: 65.0, status: "deployed" },
  { id: "cvn69", ship: "USS Dwight D. Eisenhower (CVN-69)", region: "US East Coast (Post-Maintenance Workups)", cx: 44.5, cy: 26.7, status: "deployed" },
  { id: "cvn70", ship: "USS Carl Vinson (CVN-70)",      region: "South China Sea / 7th Fleet",        cx: 160.0, cy: 42.0, status: "deployed" },
  { id: "cvn71", ship: "USS Theodore Roosevelt (CVN-71)", region: "Central Pacific (Hawaii Ops)",      cx: 12.3, cy: 37.1, status: "deployed" },
  { id: "cvn72", ship: "USS Abraham Lincoln (CVN-72)",  region: "Arabian Sea (CENTCOM Blockade)",      cx: 130.0, cy: 40.4, status: "deployed" },
  { id: "cvn73", ship: "USS George Washington (CVN-73)", region: "Sea Trials off Yokosuka, Japan",     cx: 182.0, cy: 32.0, status: "deployed" },
  { id: "cvn74", ship: "USS John C. Stennis (CVN-74)",  region: "Naval Station Norfolk (RCOH)",        cx: 44.0, cy: 26.7, status: "homeport" },
  { id: "cvn75", ship: "USS Harry S. Truman (CVN-75)",  region: "Indian Ocean / 5th Fleet",           cx: 125.0, cy: 43.1, status: "deployed" },
  { id: "cvn76", ship: "USS Ronald Reagan (CVN-76)",     region: "Yokosuka, Japan (Forward Deployed)",  cx: 181.5, cy: 32.0, status: "deployed" },
  { id: "cvn77", ship: "USS George H.W. Bush (CVN-77)",  region: "Arabian Sea (CENTCOM Blockade)",      cx: 129.0, cy: 39.8, status: "deployed" },
  { id: "cvn78", ship: "USS Gerald R. Ford (CVN-78)",    region: "Mid-Atlantic (Norfolk Inbound)",      cx: 52.0, cy: 26.7, status: "deployed" },
];

// ─── Quotes ───────────────────────────────────────────────────────────────────

export const MILITARY_QUOTES = [
  {
    quote: "The supreme art of war is to subdue the enemy without fighting.",
    attribution: "Sun Tzu", title: "The Art of War",
    note: "The principle that guides American deterrence: the goal is never to fight — it is to make fighting against America so costly that adversaries never start.",
  },
  {
    quote: "If you want peace, prepare for war.",
    attribution: "Vegetius", title: "Roman Military Theorist",
    note: "Si vis pacem, para bellum — the logic of deterrence in four words. American military superiority has prevented more wars than it has fought.",
  },
  {
    quote: "Peace is not absence of conflict, it is the ability to handle conflict by peaceful means. American strength is the foundation of that peace.",
    attribution: "Ronald Reagan", title: "40th President of the United States",
  },
  {
    quote: "No man's life, liberty, or property is safe while the legislature is in session — but no American's life, liberty, or property is safe when America's military is not supreme.",
    attribution: "Paraphrased from military doctrine",
    title: "Strategic Deterrence Principle",
  },
];

// ─── Nuclear Triad ────────────────────────────────────────────────────────────

export const NUCLEAR_TRIAD = {
  description: "The nuclear triad — land-based ICBMs, sea-based SLBMs, and air-launched weapons — ensures that no first strike can simultaneously destroy all three legs. As long as one leg survives, the United States retains the ability to respond. This guaranteed second-strike capability is the foundation of strategic deterrence.",
  legs: [
    {
      name: "Land (ICBMs)",
      systems: "400 Minuteman III",
      warheads: "400+ deployed",
      alert: "24/7 continuous alert",
      advantage: "Rapid response time — 30 minutes to any target on Earth",
      color: "#F59E0B",
    },
    {
      name: "Sea (SSBNs)",
      systems: "14 Ohio-class submarines",
      warheads: "~1,000 deployed at sea",
      alert: "Continuous deterrent patrol",
      advantage: "Most survivable leg — submarines are undetectable",
      color: "#3B82F6",
    },
    {
      name: "Air (Bombers)",
      systems: "60 B-52H + 20 B-2 Spirit + B-21 entering service",
      warheads: "Variable — conventional and nuclear",
      alert: "Surge-capable (can be dispersed globally)",
      advantage: "Recallable — the only leg that can be called back after launch",
      color: "#94A3B8",
    },
  ],
};

// ─── Facts ────────────────────────────────────────────────────────────────────

export const MILITARY_FACTS_EN = [
  { id: "budget-context",   fact: "US defense budget is larger than the next 10 countries combined",                                        detail: "At $886 billion (FY2024), the US spends more than China ($225B), Russia ($109B), India, Saudi Arabia, UK, Germany, France, South Korea, Japan, and Australia combined. This gap is the physical expression of American primacy.", source: "SIPRI Military Expenditure Database 2024", color: "gold" as const },
  { id: "carrier-dominance",fact: "The US Navy operates 11 aircraft carriers — the rest of the world has 2 that are combat-comparable",        detail: "China has 3 carriers (2 ski-jump, 1 electromagnetic). No other navy has nuclear-powered supercarriers. The US has 11. Each US carrier strike group represents more sustained air power than most nations' entire air forces.", source: "IISS Military Balance 2024", color: "blue" as const },
  { id: "air-dominance",    fact: "The US Air Force alone has more aircraft than every other air force on Earth combined",                    detail: "13,247 USAF aircraft vs. ~12,000 for the rest of the world's air forces combined. But quantity is secondary — the F-22 and B-21 maintain qualitative superiority that no adversary comes close to matching.", source: "World Air Forces 2024 / Flight International", color: "gold" as const },
  { id: "nuclear-deterrence",fact:"America's nuclear triad guarantees no adversary can launch a first strike and survive the response",       detail: "With 400 ICBMs in hardened silos, 14 nuclear submarines at sea, and nuclear bombers on standby, no adversary can simultaneously destroy all three legs. Guaranteed second-strike capability is why nuclear war has not occurred.", source: "Hans Kristensen / Federation of American Scientists 2024", color: "blue" as const },
  { id: "space-dependency", fact: "Modern American warfare is impossible without Space Force — every precision weapon depends on satellites", detail: "GPS guidance for bombs and missiles. ISR satellites locating targets. Satellite communications coordinating forces across continents. Space Force protects the infrastructure without which F-35s become expensive aluminum tubes.", source: "Congressional Research Service 2024", color: "gold" as const },
  { id: "rd-dominance",     fact: "US defense R&D spending exceeds the total defense budgets of most nations",                               detail: "The US spends $140+ billion annually on defense R&D — more than the total military budgets of Italy, Spain, Australia, or Canada. This investment compound over 80 years is why the B-21 and F-35 have no peer.", source: "Office of the Under Secretary of Defense (Comptroller) 2024", color: "blue" as const },
];

export const MILITARY_FACTS_RO = [
  { id: "budget-context",   fact: "Bugetul de apărare al SUA este mai mare decât al următoarelor 10 țări combinate",                         detail: "La 886 miliarde de dolari (AF2024), SUA cheltuiesc mai mult decât China (225 mld.$), Rusia (109 mld.$), India, Arabia Saudită, Marea Britanie, Germania, Franța, Coreea de Sud, Japonia și Australia combinate.", source: "SIPRI Military Expenditure Database 2024", color: "gold" as const },
  { id: "carrier-dominance",fact: "Marina SUA operează 11 portavioane — restul lumii are 2 cu capacitate de luptă comparabilă",               detail: "China are 3 portavioane (2 cu rampă schi, 1 electromagnetic). Nicio altă marină nu are portavioane nucleare supercarrier. SUA au 11. Fiecare grup de atac portavioane reprezintă mai multă putere aeriană decât forțele aeriene întregi ale majorității națiunilor.", source: "IISS Military Balance 2024", color: "blue" as const },
  { id: "air-dominance",    fact: "Forța Aeriană a SUA singură are mai multe aeronave decât toate celelalte forțe aeriene de pe Pământ combinate", detail: "13.247 de aeronave USAF față de ~12.000 pentru toate celelalte forțe aeriene combinate. F-22 și B-21 mențin o superioritate calitativă pe care niciun adversar nu o poate egala.", source: "World Air Forces 2024 / Flight International", color: "gold" as const },
  { id: "nuclear-deterrence",fact:"Triada nucleară americană garantează că niciun adversar nu poate lansa un prim atac și supraviețui răspunsului", detail: "Cu 400 de ICBM-uri în silozuri întărite, 14 submarine nucleare pe mare și bombardiere nucleare în stare de alertă, niciun adversar nu poate distruge simultan toate cele trei componente.", source: "Hans Kristensen / Federation of American Scientists 2024", color: "blue" as const },
  { id: "space-dependency", fact: "Războiul american modern este imposibil fără Space Force — fiecare armă de precizie depinde de sateliți",   detail: "Ghidare GPS pentru bombe și rachete. Sateliți ISR care localizează ținte. Comunicații prin satelit care coordonează forțele de pe continente. Space Force protejează infrastructura fără de care F-35-urile devin tuburi de aluminiu scumpe.", source: "Congressional Research Service 2024", color: "gold" as const },
  { id: "rd-dominance",     fact: "Cheltuielile de C&D pentru apărare ale SUA depășesc bugetele totale de apărare ale majorității națiunilor",  detail: "SUA cheltuiesc 140+ miliarde de dolari anual pe C&D pentru apărare — mai mult decât bugetele militare totale ale Italiei, Spaniei, Australiei sau Canadei. Aceasta este investiția care a produs B-21 și F-35.", source: "Office of the Under Secretary of Defense (Comptroller) 2024", color: "blue" as const },
];

// ─── i18n helpers ─────────────────────────────────────────────────────────────

export function getMilitaryFacts(locale: Locale) {
  return locale === "ro" ? MILITARY_FACTS_RO : MILITARY_FACTS_EN;
}

export function getMilitaryStats(locale: Locale): MilitaryStat[] {
  if (locale !== "ro") return MILITARY_STATS;
  return [
    { ...MILITARY_STATS[0], label: "Buget Apărare",              sublabel: "AF2024 — mai mare decât următoarele 10 națiuni combinate" },
    { ...MILITARY_STATS[1], label: "Personal Activ",             sublabel: "Plus 800K rezerviști și 700K civili DOD" },
    { ...MILITARY_STATS[2], label: "Grupuri Atac Portavioane",   sublabel: "Restul lumii are 2 total" },
    { ...MILITARY_STATS[3], label: "Focoase Nucleare",           sublabel: "Livrate pe uscat, mare și aer — Triada" },
    { ...MILITARY_STATS[4], label: "Sateliți Militari",          sublabel: "GPS, ISR, comunicații, avertizare timpurie" },
    { ...MILITARY_STATS[5], label: "Aeronave Militare",          sublabel: "Cea mai mare forță aeriană de pe Pământ — de departe" },
    { ...MILITARY_STATS[6], label: "Baze în Exterior",           sublabel: "În 80+ de țări de pe toate continentele" },
    { ...MILITARY_STATS[7], label: "Nave de Război",             sublabel: "Incluzând 68 de submarine" },
  ];
}
