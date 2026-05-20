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
  href?: string;
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
  /** Short elevator-pitch line for the collapsed dossier strip */
  tagline?: string;
  /** Per-system accent color for visual identity */
  accentColor?: string;
  /** Single most impressive stat shown on the collapsed strip */
  heroStat?: string;
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

export interface SOCOMUnit {
  id: string;
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  accentColor: string;
  description: string;
  keyFacts: string[];
}

export interface IntelligenceAgency {
  id: string;
  name: string;
  shortName: string;
  specialty: string;
  role: string;
  accentColor: string;
  description: string;
  stats: { label: string; value: string }[];
}

export interface AllianceData {
  id: string;
  name: string;
  shortName: string;
  members: number;
  founded: number;
  role: string;
  accentColor: string;
  description: string;
  capabilities: string[];
  metrics: { label: string; value: string }[];
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
    href: "/military/navy",
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
    tagline: "The most advanced aircraft ever built.",
    accentColor: "#7DD3FC",
    heroStat: "6TH GEN",
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
    tagline: "A flying supercomputer with a god-eye view.",
    accentColor: "#F5A623",
    heroStat: "3,300 PLANNED",
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
    tagline: "The apex predator of the sky.",
    accentColor: "#94A3B8",
    heroStat: "MACH 2.25",
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
    tagline: "The most powerful warship ever built.",
    accentColor: "#3B82F6",
    heroStat: "100,000 TONS",
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
    tagline: "The invisible nuclear deterrent.",
    accentColor: "#6366F1",
    heroStat: "70% OF ARSENAL",
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
    tagline: "Any target on Earth in 30 minutes.",
    accentColor: "#F59E0B",
    heroStat: "MACH 23",
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
  {
    id: "virginia",
    name: "Virginia Class",
    designation: "SSN-774+",
    category: "Fast Attack Submarine",
    status: "operational",
    quantity: "22 in service (40+ planned)",
    speed: "Classified (25+ kts submerged)",
    range: "Unlimited (nuclear powered)",
    ceiling: "Classified (800+ ft depth)",
    stealth: true,
    nuclear: false,
    tagline: "The silent shadow of the deep.",
    accentColor: "#10B981",
    heroStat: "25+ KNOTS",
    description: "The primary undersea superiority platform of the US Navy. Designed for stealth, intelligence gathering, and precision land-attack using Tomahawk cruise missiles, the Virginia class represents unmatched acoustic quietness.",
    significance: "Undersea warfare remains the one domain where the U.S. maintains a massive, uncontested qualitative lead over peer adversaries. These submarines can linger undetected in hostile coastal waters indefinitely.",
    imageSrc: SITE_IMAGES.ohioSubmarine,
    imageAlt: "Virginia-class attack submarine underway in the Pacific",
    specs: [
      { label: "Propulsion", value: "S9G nuclear reactor" },
      { label: "Armament", value: "Tomahawk VLS, Mk 48 Torpedoes" },
      { label: "Displacement", value: "7,900 tons" },
      { label: "Contractor", value: "General Dynamics Electric Boat / HII" },
      { label: "Depth", value: "Classified (800+ ft)" },
      { label: "Acoustics", value: "Anechoic coating & quiet drive" },
    ],
  },
  {
    id: "aegis",
    name: "Aegis Combat System",
    designation: "BMD 6.0+",
    category: "Missile Defense",
    status: "operational",
    quantity: "100+ ships equipped",
    speed: "Mach 15+ (SM-3 interceptors)",
    range: "1,500+ miles intercept range",
    stealth: false,
    nuclear: false,
    tagline: "The world's premier naval defense shield.",
    accentColor: "#3B82F6",
    heroStat: "100+ SHIPS",
    description: "An integrated naval weapons system combining advanced SPY radars, command computers, and Standard Missiles (SM-3/SM-6) to track and destroy ballistic and hypersonic missiles in the exoatmosphere.",
    significance: "Formulates the core shield of the carrier strike groups and allied nations against saturating missile strikes, extending defensive coverage into outer space.",
    imageSrc: SITE_IMAGES.ticonderogaCruiser,
    imageAlt: "USS John Finn firing a Standard Missile SM-3 from Aegis launcher",
    specs: [
      { label: "Radar Type", value: "AN/SPY-1 / SPY-6 AESA" },
      { label: "Interceptors", value: "SM-3, SM-6, ESSM" },
      { label: "Targeting", value: "Multi-mission tracking (100+ targets)" },
      { label: "Integration", value: "Cooperative Engagement Capability" },
      { label: "Allies", value: "Japan, Australia, South Korea, Spain" },
      { label: "Bases", value: "Aegis Ashore (Romania, Poland)" },
    ],
  },
  {
    id: "mq25",
    name: "MQ-25 Stingray",
    designation: "MQ-25A",
    category: "Autonomous Carrier UAV",
    status: "development",
    quantity: "Testing (76 planned)",
    speed: "High subsonic",
    range: "500+ mi (combat radius extension)",
    stealth: true,
    nuclear: false,
    tagline: "Unmanned aerial refueling for the future fleet.",
    accentColor: "#F59E0B",
    heroStat: "UNMANNED",
    description: "The world's first operational carrier-based unmanned aircraft, designed to provide aerial refueling for F-35C and F/A-18 strike fighters, drastically extending their operational range and survivability.",
    significance: "Solves the 'carrier standoff' dilemma by allowing aircraft carriers to stay outside the range of adversary land-based anti-ship missiles while still launching fighter strikes.",
    imageSrc: SITE_IMAGES.autonomousDrone,
    imageAlt: "MQ-25 Stingray unmanned tanker refuels a Navy fighter",
    specs: [
      { label: "Role", value: "Aerial Refueling & ISR" },
      { label: "Contractor", value: "Boeing" },
      { label: "First Flight", value: "2019" },
      { label: "Fuel Payload", value: "15,000 lbs" },
      { label: "Control", value: "Semi-autonomous / carrier integrated" },
      { label: "Status", value: "Initial Operating Capability (IOC) 2026" },
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

export function getDefenseContractors(locale: Locale): DefenseContractor[] {
  if (locale !== "ro") return DEFENSE_CONTRACTORS;
  return DEFENSE_CONTRACTORS.map(c => ({
    ...c,
    specialty: c.name === "Lockheed Martin" ? "Avioane de vânătoare, Rachete, Spațiu"
             : c.name === "RTX (Raytheon)" ? "Rachete, Apărare aeriană, EW"
             : c.name === "Northrop Grumman" ? "Invizibilitate, Spațiu, Electronică"
             : c.name === "Boeing Defense" ? "Aeronave cu aripi rotative, Naval, Spațiu"
             : c.name === "General Dynamics" ? "Luptă la sol, Construcții navale"
             : c.name === "L3Harris" ? "ISR, Comunicații, EW"
             : c.specialty
  }));
}

export const BUDGET_DATA = [
  { country: "United States", budget: 916, flag: "🇺🇸" },
  { country: "China",         budget: 336, flag: "🇨🇳" },
  { country: "Russia",        budget: 140, flag: "🇷🇺" },
  { country: "India",         budget:  83, flag: "🇮🇳" },
  { country: "Saudi Arabia",  budget:  75, flag: "🇸🇦" },
  { country: "UK",            budget:  73, flag: "🇬🇧" },
  { country: "Germany",       budget:  67, flag: "🇩🇪" },
];

export function getBudgetData(locale: Locale) {
  if (locale !== "ro") return BUDGET_DATA;
  return [
    { country: "Statele Unite", budget: 916, flag: "🇺🇸" },
    { country: "China",         budget: 336, flag: "🇨🇳" },
    { country: "Rusia",        budget: 140, flag: "🇷🇺" },
    { country: "India",         budget:  83, flag: "🇮🇳" },
    { country: "Arabia Saudită", budget:  75, flag: "🇸🇦" },
    { country: "Marea Britanie", budget:  73, flag: "🇬🇧" },
    { country: "Germania",       budget:  67, flag: "🇩🇪" },
  ];
}

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

export function getMilitaryQuotes(locale: Locale) {
  if (locale !== "ro") return MILITARY_QUOTES;
  return [
    {
      ...MILITARY_QUOTES[0],
      quote: "Arta supremă a războiului este de a învinge inamicul fără luptă.",
      title: "Arta Războiului",
      note: "Principiul care ghidează descurajarea americană: scopul nu este niciodată să lupți — ci să faci lupta împotriva Americii atât de costisitoare încât adversarii să nu o înceapă niciodată.",
    },
    {
      ...MILITARY_QUOTES[1],
      quote: "Dacă vrei pace, pregătește-te de război.",
      title: "Teoretician Militar Roman",
      note: "Si vis pacem, para bellum — logica descurajării în patru cuvinte. Superioritatea militară americană a prevenit mai multe războaie decât a purtat.",
    },
    {
      ...MILITARY_QUOTES[2],
      quote: "Pacea nu este absența conflictului, ci abilitatea de a gestiona conflictul prin mijloace pașnice. Forța americană este fundamentul acelei păci.",
      attribution: "Ronald Reagan", title: "Al 40-lea Președinte al Statelor Unite",
    },
    {
      ...MILITARY_QUOTES[3],
      quote: "Nicio viață, libertate sau proprietate nu este în siguranță când legislativul este în sesiune — dar nicio viață, libertate sau proprietate a unui american nu este în siguranță când armata Americii nu este supremă.",
      title: "Principiul Descurajării Strategice",
    },
  ];
}

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
  { id: "mil-medicine",  fact: "Combat medicine breakthroughs save 25,000+ civilian lives annually", detail: "From advanced tourniquets to freeze-dried plasma, the US military's trauma research (pioneered in Iraq/Afghanistan) has been adopted by civilian EMS globally, drastically increasing survival rates for car accidents and mass-casualty events.", source: "Journal of Trauma and Acute Care Surgery", color: "gold" as const },
  { id: "global-logistics", fact: "American logistics can deploy a combat brigade anywhere on Earth in 18 hours", detail: "The Air Mobility Command's fleet of C-17s and C-5s, supported by a global network of 750+ bases, provides a logistical reach that is physically impossible for any other military. America doesn't just have the most power; it has the most mobile power.", source: "TRANSCOM 2024", color: "blue" as const },
  { id: "gps-utility",   fact: "GPS is a $1 trillion global utility provided free by the US military", detail: "Operated by the Space Force, the Global Positioning System is the clock for the world's financial markets and the map for every smartphone. The US provides this critical infrastructure to the entire world at zero cost to users.", source: "NIST / Department of Commerce 2024", color: "gold" as const },
  { id: "rd-dominance",     fact: "US defense R&D spending exceeds the total defense budgets of most nations",                               detail: "The US spends $140+ billion annually on defense R&D — more than the total military budgets of Italy, Spain, Australia, or Canada. This investment compound over 80 years is why the B-21 and F-35 have no peer.", source: "Office of the Under Secretary of Defense (Comptroller) 2024", color: "blue" as const },
  { id: "satellite-network", fact: "The US operates more military satellites than all other nations combined", detail: "From GPS guidance to instant global communications, the US Space Force manages a constellation of 500+ dedicated military assets. This 'orbital high ground' allows American forces to see, communicate, and strike with precision that remains unmatched.", source: "UCS Satellite Database 2024", color: "gold" as const },
  { id: "space-dependency", fact: "Modern American warfare is impossible without Space Force — every precision weapon depends on satellites", detail: "GPS guidance for bombs and missiles. ISR satellites locating targets. Satellite communications coordinating forces across continents. Space Force protects the infrastructure without which F-35s become expensive aluminum tubes.", source: "Congressional Research Service 2024", color: "blue" as const },
];

export const MILITARY_FACTS_RO = [
  { id: "mil-medicine",  fact: "Descoperirile în medicina de luptă salvează peste 25.000 de vieți civile anual", detail: "De la garouri avansate la plasmă liofilizată, cercetările de traumă ale armatei americane au fost adoptate global de serviciile de urgență civile, crescând drastic ratele de supraviețuire în accidente rutiere.", source: "Journal of Trauma and Acute Care Surgery", color: "gold" as const },
  { id: "global-logistics", fact: "Logistica americană poate trimite o brigadă de luptă oriunde pe Pământ în 18 ore", detail: "Flota de C-17 și C-5 a Air Mobility Command, susținută de o rețea globală de peste 750 de baze, oferă o rază de acțiune logistică imposibilă pentru orice altă armată. America are cea mai mobilă putere din lume.", source: "TRANSCOM 2024", color: "blue" as const },
  { id: "gps-utility",   fact: "GPS este o utilitate globală de 1 trilion $ oferită gratuit de armata SUA", detail: "Operat de Space Force, Sistemul de Poziționare Globală este ceasul pentru piețele financiare mondiale și harta pentru fiecare smartphone. SUA oferă această infrastructură întregii lumi fără costuri.", source: "NIST / Department of Commerce 2024", color: "gold" as const },
  { id: "rd-dominance",     fact: "Cheltuielile de C&D pentru apărare ale SUA depășesc bugetele totale de apărare ale majorității națiunilor",  detail: "SUA cheltuiesc 140+ miliarde de dolari anual pe C&D pentru apărare — mai mult decât bugetele militare totale ale Italiei, Spaniei, Australiei sau Canadei. Aceasta este investiția care a produs B-21 și F-35.", source: "Office of the Under Secretary of Defense (Comptroller) 2024", color: "blue" as const },
  { id: "satellite-network", fact: "SUA operează mai mulți sateliți militari decât toate celelalte națiuni la un loc", detail: "De la ghidarea GPS la comunicații globale instantanee, Space Force gestionează o constelație de peste 500 de active militare dedicate. Acest avantaj orbital permite forțelor americane să lovească cu o precizie inegalabilă.", source: "UCS Satellite Database 2024", color: "gold" as const },
  { id: "space-dependency", fact: "Războiul american modern este imposibil fără Space Force — fiecare armă de precizie depinde de sateliți",   detail: "Ghidare GPS pentru bombe și rachete. Sateliți ISR care localizează ținte. Comunicații prin satelit care coordonează forțele de pe continente. Space Force protejează infrastructura fără de care F-35-urile devin tuburi de aluminiu scump.", source: "Congressional Research Service 2024", color: "blue" as const },
];

// ─── i18n helpers ─────────────────────────────────────────────────────────────

export function getMilitaryFacts(locale: Locale) {
  return locale === "ro" ? MILITARY_FACTS_RO : MILITARY_FACTS_EN;
}

export function getMilitaryStats(locale: Locale): MilitaryStat[] {
  if (locale !== "ro") return MILITARY_STATS;
  return [
    { ...MILITARY_STATS[0], label: "Buget Apărare",              sublabel: "AF2025 — mai mare decât următoarele 9 națiuni combinate" },
    { ...MILITARY_STATS[1], label: "Personal Activ",             sublabel: "Plus 765K rezerviști și 700K civili DOD" },
    { ...MILITARY_STATS[2], label: "Grupuri Atac Portavioane",   sublabel: "11 portavioane cu propulsie nucleară — 100% cotă mondială" },
    { ...MILITARY_STATS[3], label: "Focoase Nucleare",           sublabel: "Inventar activ și în rezervă — Triada" },
    { ...MILITARY_STATS[4], label: "Sateliți Militari",          sublabel: "Active orbitale dedicate și clasificate" },
    { ...MILITARY_STATS[5], label: "Aeronave Militare",          sublabel: "Cea mai mare forță aeriană (Air Force) și a 2-a (Navy)" },
    { ...MILITARY_STATS[6], label: "Baze în Exterior",           sublabel: "Proiectarea puterii în peste 80 de țări" },
    { ...MILITARY_STATS[7], label: "Nave de Război",             sublabel: "Incluzând Forța de Luptă și Comandamentul Sealift" },
  ];
}

export function getLocalizedCarriers(locale: Locale): CarrierGroupPosition[] {
  if (locale !== "ro") return CARRIER_POSITIONS;
  return [
    { ...CARRIER_POSITIONS[0], region: "Rio de Janeiro, Brazilia (Southern Seas 2026)" },
    { ...CARRIER_POSITIONS[1], region: "Coasta de Est a SUA (Pregătiri post-mentenanță)" },
    { ...CARRIER_POSITIONS[2], region: "Marea Chinei de Sud / Flota a 7-a" },
    { ...CARRIER_POSITIONS[3], region: "Pacificul Central (Operațiuni Hawaii)" },
    { ...CARRIER_POSITIONS[4], region: "Marea Arabiei (Blocada CENTCOM)" },
    { ...CARRIER_POSITIONS[5], region: "Probe de mare lângă Yokosuka, Japonia" },
    { ...CARRIER_POSITIONS[6], region: "Stația Navală Norfolk (RCOH)" },
    { ...CARRIER_POSITIONS[7], region: "Oceanul Indian / Flota a 5-a" },
    { ...CARRIER_POSITIONS[8], region: "Yokosuka, Japonia (Desfășurat în avans)" },
    { ...CARRIER_POSITIONS[9], region: "Marea Arabiei (Blocada CENTCOM)" },
    { ...CARRIER_POSITIONS[10], region: "Atlanticul de Mijloc (Spre Norfolk)" },
  ];
}

export function getMilitaryBranches(locale: Locale): MilitaryBranch[] {
  if (locale !== "ro") return MILITARY_BRANCHES;
  return [
    {
      ...MILITARY_BRANCHES[0],
      name: "Armata Statelor Unite",
      tagline: "Aceasta Vom Apăra",
      description: "Cea mai veche și mai mare ramură, Armata SUA formează coloana vertebrală a puterii de luptă terestră. Cu 58 de echipe de luptă de brigadă și peste 6.000 de tancuri.",
      keyFacts: [
        "Forțele Speciale (Beretele Verzi) operează în peste 100 de țări",
        "Divizia 82 Aeroportată poate fi trimisă global în 18 ore",
        "Comandamentul Cyber al Armatei desfășoară operațiuni ofensive",
        "Peste 10.000 de vehicule blindate Stryker, Bradley și M1 Abrams",
      ],
    },
    {
      ...MILITARY_BRANCHES[1],
      name: "Marina Statelor Unite",
      tagline: "Făurită de Mare",
      description: "Raza de acțiune globală a Americii. Marina SUA operează pe fiecare ocean simultan — proiectând puterea prin 11 grupuri de atac de portavioane și 68 de submarine.",
      keyFacts: [
        "11 portavioane cu propulsie nucleară — restul lumii are 2 în total",
        "Submarinele clasa Ohio transportă 70% din arsenalul nuclear al Americii",
        "SEAL-urile desfășoară operațiuni clasificate pe fiecare continent",
        "Fiecare grup de atac reprezintă mai multă putere aeriană decât forțele aeriene ale multor națiuni",
      ],
    },
    {
      ...MILITARY_BRANCHES[2],
      name: "Forțele Aeriene ale Statelor Unite",
      tagline: "Țintește Sus — Zboară, Luptă, Câștigă",
      description: "Dominanță aeriană globală. USAF operează peste 5.500 de aeronave. De la bombardiere invizibile la vânătoare de ultimă generație.",
      keyFacts: [
        "F-22 Raptor: singurul avion de vânătoare de generația a 5-a pentru superioritate aeriană",
        "B-2 Spirit poate atinge orice țintă de pe Pământ în câteva ore",
        "USAF operează mai multe aeronave decât toate celelalte țări combinate",
        "B-21 Raider a intrat în serviciu în 2023 — următoarea generație de invizibilitate",
      ],
    },
    {
      ...MILITARY_BRANCHES[3],
      name: "Corpul Infanteriei Marine a SUA",
      tagline: "Semper Fidelis",
      description: "Forța de răspuns rapid a Americii. Pușcașii marini mențin echipe integrate de luptă aer-sol capabile să proiecteze puterea în câteva ore.",
      keyFacts: [
        "Infanteriștii marini sunt antrenați să opereze simultan pe mare, în aer și pe uscat",
        "Batalioanele Marine Raider desfășoară operațiuni speciale în întreaga lume",
        "Modernizare pentru război de înaltă intensitate: F-35B, CH-53K King Stallion",
        "Desfășurați continuu la bordul grupurilor amfibii gata de luptă",
      ],
    },
    {
      ...MILITARY_BRANCHES[4],
      name: "Forța Spațială a Statelor Unite",
      tagline: "Semper Supra — Întotdeauna Deasupra",
      description: "Cea mai nouă ramură a Americii, păzind infrastructura orbitală de care depinde tot războiul modern. GPS, ISR, avertizare rachete.",
      keyFacts: [
        "Sateliții militari americani permit țintirea GPS de precizie pentru toate ramurile",
        "Forța Spațială operează sisteme de avertizare a rachetelor în câteva secunde",
        "Responsabilă pentru protejarea infrastructurii spațiale de peste 800 mld.$",
        "Capabilitățile ASAT pot nega accesul orbital adversarilor",
      ],
    },
    {
      ...MILITARY_BRANCHES[5],
      name: "Comandamentul Cyber al SUA",
      tagline: "Apără, Descurajează, Domină",
      description: "Câmpul de luptă invizibil. US Cyber Command desfășoară operațiuni ofensive și defensive în spațiul cibernetic.",
      keyFacts: [
        "Stuxnet (2010) a distrus centrifugele nucleare iraniene fără nicio bombă",
        "133 de echipe de misiune cibernetică acoperind funcții ofensive și defensive",
        "Poate perturba sistemele de comandă și control ale adversarului global",
        "Operează alături de NSA la Fort Meade — spionaj electronic + operațiuni cyber",
      ],
    },
  ];
}

export function getWeaponSystems(locale: Locale): WeaponSystem[] {
  if (locale !== "ro") return WEAPON_SYSTEMS;
  return WEAPON_SYSTEMS.map(w => {
    switch(w.id) {
      case "b21": return {
        ...w,
        category: "Bombardier Invizibil",
        description: "Cea mai avansată aeronavă construită vreodată. B-21 Raider a intrat în serviciu în 2023 ca singura aeronavă de generația a 6-a din lume.",
        significance: "Face orice sistem de apărare aeriană existent în lume să fie depășit. B-21 înfrânge sistemele concepute să înfrângă B-2.",
        specs: [
          { label: "Clasificare", value: "Generația a 6-a" },
          { label: "Invizibilitate", value: "Ultra-scăzută" },
          { label: "Încărcătură", value: "Nucleară + Convențională" },
          { label: "Contractor", value: "Northrop Grumman" },
          { label: "Introdus", value: "2023" },
          { label: "Cost Unitar", value: "$750M+" },
        ]
      };
      case "f35": return {
        ...w,
        category: "Vânător Multirol",
        description: "Cea mai capabilă aeronavă de luptă multirol din lume. F-35 este un supercomputer zburător — fuziunea senzorilor săi vede amenințările înainte ca adversarii să știe că există.",
        significance: "Avantajul real al F-35 este informația, nu doar invizibilitatea. Acesta agregă date de la senzori proprii, alte F-35, sateliți și sisteme terestre.",
        specs: [
          { label: "Generație", value: "Generația a 5-a" },
          { label: "Variante", value: "A (USAF), B (USMC), C (USN)" },
          { label: "Viteză", value: "Mach 1.6" },
          { label: "Radar", value: "AN/APG-81 AESA" },
          { label: "Suită EW", value: "AN/ASQ-239" },
          { label: "Parteneri", value: "17 națiuni aliate" },
        ]
      };
      case "f22": return {
        ...w,
        category: "Vânător Superioritate Aeriană",
        description: "Prădătorul suprem al cerului. F-22 Raptor este singurul avion de vânătoare invizibil capabil de supercroazieră operațional din lume.",
        significance: "Supercroaziera — abilitatea de a depăși Mach 1 fără postcombustie — combinată cu invizibilitatea extremă face ca F-22 să fie aproape imposibil de angajat.",
        specs: [
          { label: "Generație", value: "Generația a 5-a" },
          { label: "Viteză", value: "Mach 2.25 (Mach 1.82 supercroazieră)" },
          { label: "Plafon de Serviciu", value: "65.000 ft" },
          { label: "Radar", value: "AN/APG-77 AESA" },
          { label: "Avionică", value: "Cea mai avansată în producție" },
          { label: "Status", value: "Producția încheiată în 2011" },
        ]
      };
      case "gerald-ford": return {
        ...w,
        category: "Portavion Nuclear",
        description: "Cea mai puternică navă de război construită vreodată. La 100.000 de tone, portavioanele din clasa Ford operează 90 de aeronave.",
        significance: "Un singur grup de atac de portavioane comandă un domeniu maritim de 500.000 de mile pătrate. Cu 11 CSG-uri desfășurate simultan, Marina SUA poate proiecta puterea oriunde pe Pământ.",
        specs: [
          { label: "Deplasament", value: "100.000+ tone" },
          { label: "Aeronave", value: "90 (F-35C, F/A-18, E-2D, etc.)" },
          { label: "Propulsie", value: "2× reactoare nucleare A1B" },
          { label: "Echipaj", value: "4.539 + 2.500 personal aerian" },
          { label: "EMALS", value: "Lansare electromagnetică" },
          { label: "Durata de viață", value: "50 de ani fără realimentare" },
        ]
      };
      case "ohio": return {
        ...w,
        category: "Submarin cu Rachete Balistice",
        description: "Descurajarea nucleară invizibilă. 14 submarine din clasa Ohio transportă 70% din arsenalul nuclear al Americii.",
        significance: "Supraviețuirea SSBN este fundamentul descurajării nucleare. Deoarece sunt nedetectabile, ele garantează capacitatea de contraatac a Americii.",
        specs: [
          { label: "Rachete", value: "24 × Trident II D5 SLBM" },
          { label: "Focoase", value: "Până la 192 per submarin" },
          { label: "Rază", value: "7.000+ mile (Trident II)" },
          { label: "CEP", value: "Acuratețe ~90 metri" },
          { label: "Adâncime", value: "Clasificată (800+ ft)" },
          { label: "Autonomie", value: "77 de zile în patrulare" },
        ]
      };
      case "minuteman": return {
        ...w,
        category: "Rachetă Balistică Intercontinentală",
        description: "Descurajarea nucleară bazată pe uscat. 400 de ICBM-uri Minuteman III stau în alertă 24/7 în silozuri întărite.",
        significance: "Componenta terestră a triadei nucleare este cea mai supraviețuitoare din perspectiva lansării la avertizare.",
        specs: [
          { label: "Rază", value: "8.000+ mile" },
          { label: "Viteză", value: "Mach 23" },
          { label: "Timp până la Țintă", value: "~30 minute (orice punct de pe Pământ)" },
          { label: "Focoase", value: "Până la 3 × MIRV-uri W78/W87" },
          { label: "Alertă", value: "Continuă 24/7" },
          { label: "Silozuri", value: "Montana, North Dakota, Wyoming" },
        ]
      };
      case "virginia": return {
        ...w,
        category: "Submarin de Atac Rapid",
        description: "Principala platformă de superioritate subacvatică a Marinei SUA. Proiectat pentru invizibilitate, colectare de informații și atacuri de precizie la sol cu rachete Tomahawk.",
        significance: "Războiul subacvatic rămâne singurul domeniu în care SUA mențin un avantaj calitativ masiv și necontestat în fața adversarilor.",
        specs: [
          { label: "Propulsie", value: "Reactor nuclear S9G" },
          { label: "Armament", value: "Tomahawk VLS, Torpile Mk 48" },
          { label: "Deplasament", value: "7.900 tone" },
          { label: "Contractor", value: "General Dynamics Electric Boat / HII" },
          { label: "Adâncime", value: "Clasificată (800+ ft)" },
          { label: "Acustică", value: "Înveliș anecoic și propulsie silențioasă" },
        ]
      };
      case "aegis": return {
        ...w,
        category: "Apărare Antirachetă",
        description: "Un sistem integrat de arme navale care combină radare SPY avansate, computere de comandă și rachete Standard (SM-3/SM-6) pentru a urmări și distruge rachete balistice și hipersonice.",
        significance: "Formează scutul principal al grupurilor de atac de portavioane și al națiunilor aliate împotriva atacurilor cu rachete, extinzând acoperirea defensivă în spațiu.",
        specs: [
          { label: "Tip Radar", value: "AN/SPY-1 / SPY-6 AESA" },
          { label: "Interceptoare", value: "SM-3, SM-6, ESSM" },
          { label: "Țintire", value: "Urmărire multi-misiune (100+ ținte)" },
          { label: "Integrare", value: "Capabilitate de Angajare Cooperativă" },
          { label: "Aliați", value: "Japonia, Australia, Coreea de Sud, Spania" },
          { label: "Baze", value: "Aegis Ashore (România, Polonia)" },
        ]
      };
      case "mq25": return {
        ...w,
        category: "UAV Autonom de Portavion",
        description: "Prima aeronavă fără pilot de pe un portavion operațională din lume, proiectată să ofere realimentare în aer pentru avioanele de luptă F-35C și F/A-18, extinzându-le raza și supraviețuirea.",
        significance: "Rezolvă dilema distanțării portavioanelor, permițându-le să rămână în afara razei rachetelor anti-navă inamice lansate de pe uscat, în timp ce lansează lovituri aeriene.",
        specs: [
          { label: "Rol", value: "Realimentare în aer și ISR" },
          { label: "Contractor", value: "Boeing" },
          { label: "Primul Zbor", value: "2019" },
          { label: "Capacitate Combustibil", value: "15.000 lbs" },
          { label: "Control", value: "Semi-autonom / integrat pe portavion" },
          { label: "Status", value: "Capabilitate Operațională Inițială (IOC) 2026" },
        ]
      };
      default: return w;
    }
  });
}

export function getDARPAPrograms(locale: Locale): DARPAProgram[] {
  if (locale !== "ro") return DARPA_PROGRAMS;
  return DARPA_PROGRAMS.map(p => {
    switch(p.id) {
      case "hypersonic": return {
        ...p,
        category: "SISTEME OFENSIVE",
        description: "HAWC și HACM sunt rachete cu propulsie scramjet care călătoresc cu Mach 5+ — prea repede pentru a fi interceptate.",
        significance: "Face ca toate sistemele actuale de apărare — Patriot, S-400, THAAD — să fie efectiv depășite."
      };
      case "autonomous": return {
        ...p,
        category: "AI / ROBOTICĂ",
        description: "Programul Collaborative Combat Aircraft (CCA) dezvoltă însoțitori AI care zboară alături de piloți umani.",
        significance: "Un singur pilot de F-35 ar putea comanda peste 4 însoțitori autonomi, multiplicând puterea de luptă de 5 ori."
      };
      case "directed-energy": return {
        ...p,
        category: "ARME DE GENERAȚIE VIITOARE",
        description: "Armele cu laser de înaltă energie (HEL) și microunde de înaltă putere (HPM) oferă încărcătoare nelimitate și viteză a luminii.",
        significance: "Sistemul HELIOS al Marinei poate înfrânge drone și rachete la un cost de 1$ per angajare față de milioane pentru rachete interceptoare."
      };
      case "quantum": return {
        ...p,
        category: "RĂZBOI INFORMAȚIONAL",
        description: "Gravimetrele cuantice pot detecta urmele submarinelor de la altitudine orbitală. Computerele cuantice vor sparge standardele actuale de criptare.",
        significance: "Cine obține primul superioritatea în calculul cuantic poate decripta toate comunicațiile criptate existente — militare, diplomatice, financiare."
      };
      case "cyber-offensive": return {
        ...p,
        category: "RĂZBOI CIBERNETIC",
        description: "US Cyber Command menține o prezență persistentă în infrastructura critică a adversarului — rețele electrice, sisteme financiare.",
        significance: "Capabilitățile actuale sunt cu ordine de mărime mai sofisticate decât Stuxnet (2010)."
      };
      case "ai-c2": return {
        ...p,
        category: "AI / SISTEME DE DECIZIE",
        description: "JADO și ABMS folosesc AI pentru a fuziona datele de la toți senzorii, platformele și domeniile.",
        significance: "Scopul: comprimarea buclei OODA la milisecunde. Până când un adversar a observat și s-a orientat, SUA au acționat deja."
      };
      default: return p;
    }
  });
}

export function getNuclearTriad(locale: Locale) {
  if (locale !== "ro") return NUCLEAR_TRIAD;
  return {
    description: "Triada nucleară — ICBM-uri terestre, SLBM-uri marine și arme lansate din aer — garantează că niciun prim atac nu poate distruge simultan toate cele trei componente. Atâta timp cât o componentă supraviețuiește, Statele Unite își păstrează capacitatea de răspuns.",
    legs: [
      {
        ...NUCLEAR_TRIAD.legs[0],
        name: "Terestru (ICBM)",
        systems: "400 Minuteman III",
        advantage: "Timp de răspuns rapid — 30 de minute către orice țintă de pe Pământ",
      },
      {
        ...NUCLEAR_TRIAD.legs[1],
        name: "Maritim (SSBN)",
        systems: "14 submarine clasa Ohio",
        advantage: "Cea mai supraviețuitoare componentă — submarinele sunt nedetectabile",
      },
      {
        ...NUCLEAR_TRIAD.legs[2],
        name: "Aerian (Bombardiere)",
        systems: "60 B-52H + 20 B-2 Spirit + B-21 intrând în serviciu",
        advantage: "Rechemabile — singura componentă care poate fi întoarsă după lansare",
      },
    ],
  };
}

// ─── Special Operations Units ──────────────────────────────────────────────────

export const SOCOM_UNITS: SOCOMUnit[] = [
  {
    id: "greenberets",
    name: "Special Forces (Green Berets)",
    shortName: "Army SF",
    role: "Unconventional Warfare",
    tagline: "De Oppresso Liber — To Free the Oppressed",
    accentColor: "#10B981",
    description: "Highly specialized army teams trained for guerrilla warfare, foreign internal defense, and counter-insurgency. They typically operate in small, 12-man teams (ODAs) to train and fight alongside allied local forces.",
    keyFacts: [
      "Specialize in language and cultural immersion",
      "Deploy to 100+ countries annually",
      "Backbone of foreign military training and assistance"
    ]
  },
  {
    id: "seals",
    name: "Navy SEALs",
    shortName: "Navy SEALs",
    role: "Direct Action & Reconnaissance",
    tagline: "The Only Easy Day Was Yesterday",
    accentColor: "#3B82F6",
    description: "The Navy's sea, air, and land special warfare teams. Trained for high-risk operations including hostage rescue, counter-terrorism, clandestine insertions, and maritime interdiction.",
    keyFacts: [
      "Operate in extreme aquatic, polar, and desert environments",
      "Includes the ultra-elite DEVGRU (SEAL Team Six)",
      "Masters of clandestine maritime infiltration via mini-subs"
    ]
  },
  {
    id: "delta",
    name: "1st SFOD-D (Delta Force)",
    shortName: "Delta Force",
    role: "Hostage Rescue & Counter-Terrorism",
    tagline: "Sine Pari — Without Equal",
    accentColor: "#EF4444",
    description: "The Army's premier Tier 1 special missions unit. Delta Force operates in absolute secrecy, executing national-security level counter-terrorism, high-value target capture, and hostage rescue operations.",
    keyFacts: [
      "Directly answerable to the Joint Special Operations Command (JSOC)",
      "Recruits primarily from Special Forces and the 75th Ranger Regiment",
      "Equipped with classified weaponry and custom-built tactical gear"
    ]
  },
  {
    id: "raiders",
    name: "Marine Raiders",
    shortName: "MARSOC",
    role: "Special Reconnaissance",
    tagline: "Spiritus Invictus — Unconquerable Spirit",
    accentColor: "#B91C1C",
    description: "Marine Corps Forces Special Operations Command. Specialized in amphibious special reconnaissance, direct action, and training foreign military partners in contested littoral zones.",
    keyFacts: [
      "Direct descendants of the legendary WWII Marine Raiders",
      "Highly integrated amphibious operations capabilities",
      "Specialists in coastal and riverine tactical insertions"
    ]
  }
];

export function getSOCOMUnits(locale: Locale): SOCOMUnit[] {
  if (locale !== "ro") return SOCOM_UNITS;
  return SOCOM_UNITS.map(u => {
    switch (u.id) {
      case "greenberets":
        return {
          ...u,
          name: "Forțele Speciale (Beretele Verzi)",
          role: "Război Neconvențional",
          tagline: "De Oppresso Liber — Pentru eliberarea celor oprimați",
          description: "Echipe ale armatei extrem de specializate, antrenate pentru război de gherilă, apărare internă străină și contrainsurgență. Operează de obicei în echipe mici de 12 oameni (ODA) pentru a antrena și lupta alături de forțele locale aliate.",
          keyFacts: [
            "Specializate în imersiune lingvistică și culturală",
            "Trimiși în peste 100 de țări anual",
            "Coloana vertebrală a instruirii și asistenței militare străine"
          ]
        };
      case "seals":
        return {
          ...u,
          name: "Navy SEALs",
          role: "Acțiuni Directe și Recunoaștere",
          tagline: "Singura zi ușoară a fost ieri",
          description: "Echipele de război special pe mare, în aer și pe uscat ale Marinei. Antrenate pentru operațiuni cu grad ridicat de risc, inclusiv salvarea de ostatici, combaterea terorismului, infiltrații clandestine și interdicții maritime.",
          keyFacts: [
            "Operează în medii acvatice, polare și de deșert extreme",
            "Include unitatea de elită DEVGRU (SEAL Team Six)",
            "Maeștri ai infiltrării maritime clandestine prin mini-submarine"
          ]
        };
      case "delta":
        return {
          ...u,
          name: "Forța Delta (Delta Force)",
          role: "Salvare de Ostatici și Contra-Terorism",
          tagline: "Sine Pari — Fără Egal",
          description: "Principala unitate de misiuni speciale de Nivel 1 (Tier 1) a Armatei. Delta Force operează în secret absolut, executând contra-terorism la nivel de securitate națională, capturarea de ținte de mare valoare și operațiuni de salvare a ostaticilor.",
          keyFacts: [
            "Răspunde direct în fața Comandamentului Comun pentru Operațiuni Speciale (JSOC)",
            "Recrutează în principal din Forțele Speciale și Regimentul 75 Rangers",
            "Echipată cu armament clasificat și echipamente tactice personalizate"
          ]
        };
      case "raiders":
        return {
          ...u,
          name: "Pușcașii Marini Raiders",
          role: "Recunoaștere Specială",
          tagline: "Spiritus Invictus — Spirit de Neînvins",
          description: "Comandamentul de Operațiuni Speciale al Corpului de Pușcași Marini. Specializat în recunoaștere specială amfibie, acțiuni directe și instruirea partenerilor militari străini în zone litorale contestate.",
          keyFacts: [
            "Descendenți direcți ai legendarilor Marine Raiders din al Doilea Război Mondial",
            "Capabilități integrate de operațiuni amfibii",
            "Specialiști în infiltrații tactice de coastă și riverane"
          ]
        };
      default:
        return u;
    }
  });
}

// ─── Intelligence Agencies ─────────────────────────────────────────────────────

export const INTELLIGENCE_AGENCIES: IntelligenceAgency[] = [
  {
    id: "cia",
    name: "Central Intelligence Agency",
    shortName: "CIA",
    specialty: "HUMINT (Human Intelligence)",
    role: "Covert Action & Global Espionage",
    accentColor: "#F59E0B",
    description: "The primary agency for collecting foreign human intelligence (HUMINT) and conducting covert paramilitary operations at the direction of the President.",
    stats: [
      { label: "Focus", value: "Foreign Intel Only" },
      { label: "Method", value: "Clandestine Networks" },
      { label: "Command", value: "Director of National Intel" }
    ]
  },
  {
    id: "nsa",
    name: "National Security Agency",
    shortName: "NSA",
    specialty: "SIGINT (Signals Intelligence)",
    role: "Global Cryptology & Cybersecurity",
    accentColor: "#10B981",
    description: "The world's leading cryptologic and signals intelligence organization, monitoring, collecting, and decoding global communication data to protect U.S. and allied interests.",
    stats: [
      { label: "Focus", value: "Signals & Cryptology" },
      { label: "Supercomputers", value: "Fort Meade Cryptology" },
      { label: "Joint Command", value: "Co-located with Cyber Command" }
    ]
  },
  {
    id: "dia",
    name: "Defense Intelligence Agency",
    shortName: "DIA",
    specialty: "Military Intelligence",
    role: "Foreign Military Assessment",
    accentColor: "#3B82F6",
    description: "Fuses military intelligence from all branches to assess foreign military capabilities, doctrines, and logistics, directly supporting JCS combat commanders.",
    stats: [
      { label: "Focus", value: "Foreign Armies" },
      { label: "Deployment", value: "Integrated with Combatants" },
      { label: "Nerve Center", value: "Pentagon Integrated" }
    ]
  },
  {
    id: "nro",
    name: "National Reconnaissance Office",
    shortName: "NRO",
    specialty: "IMINT / Satellite Recon",
    role: "Space-Based Surveillance",
    accentColor: "#6366F1",
    description: "Designs, builds, and operates America's classified spy satellite fleet, providing high-resolution imagery and electronic eavesdropping from orbit.",
    stats: [
      { label: "Focus", value: "Orbital Reconnaissance" },
      { label: "Assets", value: "Classified spy satellites" },
      { label: "Data Flow", value: "Feeds CIA, DIA, and NSA" }
    ]
  }
];

export function getIntelligenceAgencies(locale: Locale): IntelligenceAgency[] {
  if (locale !== "ro") return INTELLIGENCE_AGENCIES;
  return INTELLIGENCE_AGENCIES.map(a => {
    switch (a.id) {
      case "cia":
        return {
          ...a,
          name: "Agenția Centrală de Informații",
          specialty: "HUMINT (Informații Umane)",
          role: "Acțiuni Coverte și Espionaj Global",
          description: "Agenția principală pentru colectarea de informații umane externe (HUMINT) și desfășurarea de operațiuni paramilitare secrete la directiva Președintelui.",
          stats: [
            { label: "Focus", value: "Doar informații externe" },
            { label: "Metodă", value: "Rețele clandestine" },
            { label: "Comandă", value: "Directorul National Intel" }
          ]
        };
      case "nsa":
        return {
          ...a,
          name: "Agenția de Securitate Națională",
          specialty: "SIGINT (Informații din Semnale)",
          role: "Criptologie Globală și Securitate Cibernetică",
          description: "Cea mai mare organizație de criptologie și informații din semnale din lume, monitorizând, colectând și decodificând date de comunicații globale pentru a proteja interesele SUA și ale aliaților.",
          stats: [
            { label: "Focus", value: "Semnale și Criptologie" },
            { label: "Supercomputere", value: "Criptologia Fort Meade" },
            { label: "Comandă Comună", value: "Co-locat cu Cyber Command" }
          ]
        };
      case "dia":
        return {
          ...a,
          name: "Agenția de Informații a Apărării",
          specialty: "Informații Militare",
          role: "Evaluarea Armatelor Străine",
          description: "Fuzionează informațiile militare din toate ramurile pentru a evalua capabilitățile, doctrinele și logistica armatelor străine, sprijinind direct comandanții militari.",
          stats: [
            { label: "Focus", value: "Armate Străine" },
            { label: "Desfășurare", value: "Integrat cu Forțele" },
            { label: "Centru", value: "Integrat în Pentagon" }
          ]
        };
      case "nro":
        return {
          ...a,
          name: "Biroul Național de Recunoaștere",
          specialty: "IMINT / Recunoaștere prin Satelit",
          role: "Supraveghere bazată pe Spațiu",
          description: "Proiectează, construiește și operează flota de sateliți spion clasificați ai Americii, oferind imagini de înaltă rezoluție și interceptări electronice de pe orbită.",
          stats: [
            { label: "Focus", value: "Recunoaștere Orbitală" },
            { label: "Active", value: "Sateliți spion clasificați" },
            { label: "Flux de date", value: "Alimentează CIA, DIA și NSA" }
          ]
        };
      default:
        return a;
    }
  });
}

// ─── Global Alliances ──────────────────────────────────────────────────────────

export const ALLIANCES_DATA: AllianceData[] = [
  {
    id: "nato",
    name: "North Atlantic Treaty Organization",
    shortName: "NATO",
    members: 32,
    founded: 1949,
    role: "Collective Euro-Atlantic Defense",
    accentColor: "#3B82F6",
    description: "The most successful military alliance in human history. Under Article 5, an attack on one is an attack on all. NATO provides the ironclad security umbrella that deters aggression across the European continent.",
    capabilities: [
      "Combined active forces of 3.4 million personnel",
      "Shared command-and-control and airspace defense systems",
      "Nuclear sharing programs (Belgium, Germany, Italy, Netherlands, Turkey)"
    ],
    metrics: [
      { label: "Allied GDP Share", value: "50% of Global GDP" },
      { label: "Total Budget", value: "$1.3 Trillion combined" },
      { label: "Air Patrols", value: "24/7 Baltic & Black Sea" }
    ]
  },
  {
    id: "aukus",
    name: "AUKUS Alliance",
    shortName: "AUKUS",
    members: 3,
    founded: 2021,
    role: "Indo-Pacific Technology Coalition",
    accentColor: "#0D9488",
    description: "A trilateral security partnership between Australia, the United Kingdom, and the United States, focused on delivering conventionally armed, nuclear-powered submarines to Australia and co-developing advanced quantum, AI, and hypersonic technologies.",
    capabilities: [
      "Trilateral undersea warfare integration",
      "Shared quantum computing and cryptography R&D",
      "Hypersonic weapon and counter-hypersonic development"
    ],
    metrics: [
      { label: "Focus", value: "Indo-Pacific Deterrence" },
      { label: "SSN Deliveries", value: "Virginia-class to Australia" },
      { label: "Pillar II Focus", value: "AI & Quantum Superiority" }
    ]
  }
];

export function getAlliancesData(locale: Locale): AllianceData[] {
  if (locale !== "ro") return ALLIANCES_DATA;
  return ALLIANCES_DATA.map(a => {
    switch (a.id) {
      case "nato":
        return {
          ...a,
          name: "Organizația Tratatului Atlanticului de Nord",
          role: "Apărare Colectivă Euro-Atlantică",
          description: "Cea mai de succes alianță militară din istoria omenirii. Conform Articolului 5, un atac împotriva unuia este un atac împotriva tuturor. NATO oferă umbrela de securitate de fier care descurajează agresiunea pe continentul european.",
          capabilities: [
            "Forțe active combinate de 3,4 milioane de oameni",
            "Sisteme comune de comandă-control și apărare a spațiului aerian",
            "Programe de partajare nucleară (Belgia, Germania, Italia, Olanda, Turcia)"
          ],
          metrics: [
            { label: "Cotă PIB Aliat", value: "50% din PIB-ul Global" },
            { label: "Buget Total", value: "1.3 Trilioane $ combinat" },
            { label: "Patrule Aeriene", value: "24/7 Marea Baltică și Neagră" }
          ]
        };
      case "aukus":
        return {
          ...a,
          name: "Alianța AUKUS",
          role: "Coaliție Tehnologică Indo-Pacifică",
          description: "Un parteneriat de securitate trilateral între Australia, Marea Britanie și Statele Unite, axat pe furnizarea de submarine cu propulsie nucleară și armament convențional către Australia și dezvoltarea comună de tehnologii avansate de cuantică, AI și hipersonice.",
          capabilities: [
            "Integrare trilaterală a războiului submarin",
            "Cercetare comună în calcul cuantic și criptografie",
            "Dezvoltare de arme hipersonice și contra-hipersonice"
          ],
          metrics: [
            { label: "Focus", value: "Descurajare Indo-Pacifică" },
            { label: "Livrări SSN", value: "Clasa Virginia către Australia" },
            { label: "Focus Pilonul II", value: "Superioritate AI și Cuantică" }
          ]
        };
      default:
        return a;
    }
  });
}
