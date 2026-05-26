import { SITE_IMAGES } from "@/lib/site-images";
import type { Locale } from "@/lib/i18n/config";

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface AirForceMetric {
  value: string;
  label: string;
  detail: string;
}

export interface AirForceCapability {
  kicker: string;
  title: string;
  description: string;
  stat: string;
  accent: string;
}

export interface AirForcePlatform {
  name: string;
  designation: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  capability: string;
  specs: { label: string; value: string }[];
}

export interface AirForceTheater {
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

export interface AirForceHeritageEvent {
  year: string;
  title: string;
  description: string;
  significance: string;
  imageSrc: string;
}

export interface AirForceFleetComparison {
  country: string;
  flag: string;
  fighters: number;
  bombers: number;
  tankers: number;
  totalAircraft: number;
  highlight?: boolean;
}

export interface AirForceFutureProgram {
  label: string;
  title: string;
  description: string;
  status: string;
  imageSrc: string;
  imageAlt: string;
  capability: string;
  specs: { label: string; value: string }[];
}

export interface AirForceBase {
  name: string;
  location: string;
  role: string;
  description: string;
  accent: string;
  stats: { label: string; value: string }[];
}

// ─── English Raw Constants ───────────────────────────────────────────────────

export const AF_METRICS: AirForceMetric[] = [
  {
    value: "5,217",
    label: "Active Aircraft",
    detail: "The largest military aviation fleet in human history.",
  },
  {
    value: "329,000",
    label: "Active-Duty Airmen",
    detail: "Pilots, maintainers, cyber operators, and space professionals.",
  },
  {
    value: "70+",
    label: "Overseas Bases",
    detail: "Forward-deployed installations spanning every combatant command.",
  },
  {
    value: "400",
    label: "ICBMs On Alert",
    detail: "Minuteman III missiles at constant readiness across three missile wings.",
  },
  {
    value: "48hr",
    label: "Global Reach",
    detail: "Capability to project force to any point on Earth within 48 hours.",
  },
  {
    value: "3,000+",
    label: "Daily Sorties",
    detail: "Training, operational, and logistics flights executed every day.",
  },
];

export const AF_CAPABILITIES: AirForceCapability[] = [
  {
    kicker: "01 — DOMAIN",
    title: "Air Superiority",
    description:
      "The F-22 Raptor and F-35A Lightning II establish uncontested control of the battlespace. No peer adversary has achieved air parity against USAF fighters in combat since 1953.",
    stat: "5th-Gen Fleet",
    accent: "#7dd3fc",
  },
  {
    kicker: "02 — STRIKE",
    title: "Global Strike",
    description:
      "B-2 Spirit and B-21 Raider stealth bombers can reach any target on Earth without detection. The Air Force is the only service that can deliver conventional or nuclear ordnance from intercontinental range.",
    stat: "Intercontinental",
    accent: "#f5a623",
  },
  {
    kicker: "03 — MOBILITY",
    title: "Rapid Global Mobility",
    description:
      "C-17 Globemaster III and C-5M Super Galaxy aircraft can airlift an entire armored battalion to any theater within 48 hours. Air Mobility Command is the backbone of American power projection.",
    stat: "48-Hour Deploy",
    accent: "#a78bfa",
  },
  {
    kicker: "04 — ISR",
    title: "Intelligence, Surveillance & Reconnaissance",
    description:
      "RQ-4 Global Hawk, MQ-9 Reaper, U-2 Dragon Lady, and RC-135 Rivet Joint operate persistent surveillance orbits across every theater, feeding real-time targeting data to joint forces.",
    stat: "Persistent ISR",
    accent: "#34d399",
  },
  {
    kicker: "05 — DETERRENCE",
    title: "Nuclear Deterrence",
    description:
      "400 Minuteman III ICBMs and B-2/B-21 strategic bombers form two of the three legs of the nuclear triad. The Air Force operates the land-based and airborne components of America's ultimate deterrent.",
    stat: "2/3 of Nuclear Triad",
    accent: "#ff6b6b",
  },
];

export const AF_PLATFORMS: AirForcePlatform[] = [
  {
    name: "Lockheed Martin F-22 Raptor",
    designation: "Air Superiority Fighter",
    role: "Unmatched in air-to-air combat, this air-dominance fighter combines stealth, supermaneuverability, and advanced avionics to secure control of the skies.",
    imageSrc: SITE_IMAGES.airForce.f22,
    imageAlt: "F-22 Raptor in close-up profile",
    capability: "Stealth air superiority",
    specs: [
      { label: "Speed", value: "Mach 2.25" },
      { label: "Range", value: "1,840 mi" },
      { label: "Ceiling", value: "65,000 ft" },
      { label: "Weapons", value: "AIM-120 / AIM-9X" },
    ],
  },
  {
    name: "Lockheed Martin F-35A Lightning II",
    designation: "Multirole Stealth Fighter",
    role: "The premier fifth-generation multirole fighter. Designed for stealth, electronic attack, and intelligence gathering, it is the cornerstone of modern tactical air power.",
    imageSrc: SITE_IMAGES.airForce.f35,
    imageAlt: "F-35A Lightning II in flight",
    capability: "Sensor-fused strike",
    specs: [
      { label: "Speed", value: "Mach 1.6" },
      { label: "Range", value: "1,380 mi" },
      { label: "Payload", value: "18,000 lb" },
      { label: "Sensors", value: "AN/APG-81 AESA" },
    ],
  },
  {
    name: "F-16 Fighting Falcon",
    designation: "Multirole Fighter",
    role: "The most numerous and common multirole fighter in the Air Force, highly agile and combat-proven in both air-to-air and air-to-ground missions.",
    imageSrc: SITE_IMAGES.airForce.f22Formation,
    imageAlt: "F-16 Flying Falcon multirole fighter",
    capability: "Agile multirole combat",
    specs: [
      { label: "Speed", value: "Mach 2.0" },
      { label: "Range", value: "2,000 mi" },
      { label: "Payload", value: "12,000 lb" },
      { label: "Fleet Size", value: "800+ active" },
    ],
  },
  {
    name: "F-15EX Eagle II",
    designation: "Heavyweight Tactical Fighter",
    role: "A heavily updated, \"heavyweight missile truck\" designed to carry hypersonic weapons and massive payloads alongside the F-35.",
    imageSrc: SITE_IMAGES.airForce.f22Formation,
    imageAlt: "F-15EX Eagle II tactical fighter",
    capability: "Heavy payload tactical strike",
    specs: [
      { label: "Speed", value: "Mach 2.5" },
      { label: "Range", value: "2,990 mi" },
      { label: "Payload", value: "29,500 lb" },
      { label: "Hardpoints", value: "23 weapons stations" },
    ],
  },
  {
    name: "B-52 Stratofortress",
    designation: "Heavy Strategic Bomber",
    role: "Arguably the most enduring aircraft in the fleet, this heavy long-range bomber has been in service for decades and remains the backbone of the U.S. heavy payload and standoff strike capabilities.",
    imageSrc: SITE_IMAGES.airForce.b52,
    imageAlt: "B-52 Stratofortress heavy strategic bomber",
    capability: "Heavy standoff strike",
    specs: [
      { label: "Range", value: "8,800 mi" },
      { label: "Payload", value: "70,000 lb" },
      { label: "Engines", value: "8 Pratt & Whitney" },
      { label: "Status", value: "Active until 2050s" },
    ],
  },
  {
    name: "Northrop Grumman B-2 Spirit",
    designation: "Stealth Strategic Bomber",
    role: "A highly specialized, stealth flying-wing bomber capable of penetrating deeply defended enemy airspace to deliver conventional and nuclear payloads.",
    imageSrc: SITE_IMAGES.airForce.b2,
    imageAlt: "B-2 Spirit stealth bomber in maintenance hangar",
    capability: "Penetrating stealth strike",
    specs: [
      { label: "Range", value: "6,000 nmi" },
      { label: "Payload", value: "40,000 lb" },
      { label: "RCS", value: "Near-zero" },
      { label: "Crew", value: "2 pilots" },
    ],
  },
  {
    name: "B-1B Lancer",
    designation: "Supersonic Strategic Bomber",
    role: "A supersonic heavy bomber that provides long-range conventional strike capabilities and massive payload capacity.",
    imageSrc: SITE_IMAGES.airForce.b21,
    imageAlt: "B-1B Lancer supersonic heavy bomber",
    capability: "Supersonic conventional strike",
    specs: [
      { label: "Speed", value: "Mach 1.25" },
      { label: "Payload", value: "75,000 lb" },
      { label: "Range", value: "7,400 mi" },
      { label: "Status", value: "Conventional only" },
    ],
  },
  {
    name: "Boeing C-17 Globemaster III",
    designation: "Strategic Airlifter",
    role: "The primary strategic and tactical airlifter. It routinely delivers troops, equipment, and medical aid to forward operating bases globally.",
    imageSrc: SITE_IMAGES.airForce.personnel,
    imageAlt: "C-17 Globemaster III with Air Force personnel",
    capability: "Rapid global mobility",
    specs: [
      { label: "Payload", value: "170,900 lb" },
      { label: "Range", value: "2,400 nmi" },
      { label: "Runway", value: "3,500 ft" },
      { label: "Fleet", value: "222 aircraft" },
    ],
  },
  {
    name: "Lockheed Martin C-130 Hercules",
    designation: "Tactical Transport Aircraft",
    role: "The premier tactical transport aircraft, used for dropping paratroopers, carrying supplies to austere runways, and performing special operations and refueling tasks.",
    imageSrc: SITE_IMAGES.airForce.c130,
    imageAlt: "C-130 Hercules tactical transport aircraft takeoff",
    capability: "Austere theater transport",
    specs: [
      { label: "Payload", value: "42,000 lb" },
      { label: "Range", value: "2,360 mi" },
      { label: "Operations", value: "Airdrop / Special Ops" },
      { label: "Fleet Size", value: "300+ active" },
    ],
  },
  {
    name: "Boeing KC-135 Stratotanker",
    designation: "Aerial Refueling Tanker",
    role: "The backbone of global reach. By providing mid-air refueling, this decades-old workhorse extends the range and loiter time of almost all USAF combat aircraft.",
    imageSrc: SITE_IMAGES.airForce.f22Formation,
    imageAlt: "KC-135 Stratotanker aerial refueling",
    capability: "Global reach multiplication",
    specs: [
      { label: "Fuel Capacity", value: "200,000 lb" },
      { label: "Transfer Rate", value: "Boom or Drogue" },
      { label: "Fleet Size", value: "390+ active" },
      { label: "Status", value: "Operational" },
    ],
  },
  {
    name: "Boeing KC-46 Pegasus",
    designation: "Next-Gen Refueling Tanker",
    role: "The next-generation aerial refueling tanker slowly replacing older tankers like the KC-135.",
    imageSrc: SITE_IMAGES.airForce.f22Formation,
    imageAlt: "Boeing KC-46 Pegasus in formation",
    capability: "Force multiplication",
    specs: [
      { label: "Fuel", value: "212,000 lb" },
      { label: "Boom", value: "Fly-by-wire" },
      { label: "Drogue", value: "Wing pods" },
      { label: "Fleet", value: "68 delivered" },
    ],
  },
];

export const AF_THEATERS: AirForceTheater[] = [
  {
    id: "indopacom",
    name: "Indo-Pacific",
    region: "PACAF / 7th Air Force",
    headline: "Pacing challenge and power projection",
    description:
      "Pacific Air Forces operate the largest theater air component, maintaining deterrence against the PRC with persistent 5th-gen fighter rotations, bomber task force deployments, and distributed basing across Guam, Japan, South Korea, and Australia.",
    signal: "Distributed operations",
    imageSrc: SITE_IMAGES.airForce.f22,
    imageAlt: "F-22 Raptor Indo-Pacific deployment",
    accent: "#7dd3fc",
    metrics: [
      { label: "Fighters forward", value: "300+" },
      { label: "BTF rotations", value: "Continuous" },
      { label: "Threat pacing", value: "PRC" },
    ],
  },
  {
    id: "eucom",
    name: "Europe",
    region: "USAFE / 3rd Air Force",
    headline: "NATO backbone and eastern flank",
    description:
      "U.S. Air Forces in Europe anchor NATO's air defense architecture. F-35A squadrons at RAF Lakenheath and rotational fighters at Baltic and Polish bases provide continuous air policing and deterrence following Russia's invasion of Ukraine.",
    signal: "Allied interoperability",
    imageSrc: SITE_IMAGES.airForce.f35,
    imageAlt: "F-35A deployed to RAF Lakenheath",
    accent: "#a78bfa",
    metrics: [
      { label: "NATO integration", value: "Deep" },
      { label: "EFP rotations", value: "Active" },
      { label: "Air policing", value: "24/7" },
    ],
  },
  {
    id: "centcom",
    name: "Central Command",
    region: "AFCENT / 9th Air Force",
    headline: "Desert persistence and overwatch",
    description:
      "From Al Udeid Air Base in Qatar to operations across Iraq, Syria, and Afghanistan, Air Forces Central has generated more combat sorties than any other component since 2001. ISR, strike, and tanker operations run continuously.",
    signal: "Combat persistence",
    imageSrc: SITE_IMAGES.airForce.hero,
    imageAlt: "Air Force Desert Storm operations",
    accent: "#f5a623",
    metrics: [
      { label: "Sorties since 2001", value: "1M+" },
      { label: "ISR orbits", value: "Continuous" },
      { label: "Tanker support", value: "24/7" },
    ],
  },
  {
    id: "northcom",
    name: "NORAD / Homeland",
    region: "1st Air Force / CONR",
    headline: "Aerospace warning and continental defense",
    description:
      "NORAD and Continental U.S. NORAD Region maintain continuous aerospace surveillance with ground-based radars, AWACS, and fighter interceptor alert sites. F-22s and F-16s sit on 24/7 alert to defend North American airspace.",
    signal: "Homeland defense",
    imageSrc: SITE_IMAGES.airForce.minuteman,
    imageAlt: "Minuteman III ICBM launch",
    accent: "#ff6b6b",
    metrics: [
      { label: "Alert status", value: "24/7/365" },
      { label: "Radar coverage", value: "Continental" },
      { label: "Intercept time", value: "Minutes" },
    ],
  },
  {
    id: "africom",
    name: "Africa",
    region: "AFAFRICA / 17th AF",
    headline: "Light-footprint counter-terrorism",
    description:
      "Air Forces Africa supports counterterrorism, partner-nation training, and crisis response across the continent with MQ-9 Reaper ISR orbits, C-130 mobility, and special operations aviation from distributed locations in the Sahel and Horn of Africa.",
    signal: "CT & partner capacity",
    imageSrc: SITE_IMAGES.airForce.drone,
    imageAlt: "MQ-9 Reaper on forward operating base",
    accent: "#34d399",
    metrics: [
      { label: "ISR coverage", value: "Sahel / Horn" },
      { label: "Partner nations", value: "20+" },
      { label: "Footprint", value: "Distributed" },
    ],
  },
];

export const AF_HERITAGE_TIMELINE: AirForceHeritageEvent[] = [
  {
    year: "1903",
    title: "Wright Brothers at Kitty Hawk",
    description: "Orville and Wilbur Wright achieve the first powered, sustained flight at Kill Devil Hills, North Carolina — 12 seconds that changed warfare forever.",
    significance: "Birth of powered flight",
    imageSrc: SITE_IMAGES.airForce.wrightBrothers,
  },
  {
    year: "1947",
    title: "Air Force Established & Sound Barrier Broken",
    description: "The National Security Act creates the United States Air Force as an independent branch. Weeks later, Chuck Yeager breaks the sound barrier in the Bell X-1 'Glamorous Glennis.'",
    significance: "Independent service & supersonic era",
    imageSrc: SITE_IMAGES.airForce.bellX1,
  },
  {
    year: "1950",
    title: "MiG Alley — Korea",
    description: "F-86 Sabres engage Soviet MiG-15s over the Yalu River in the first jet-versus-jet air combat in history. USAF pilots achieve a 10:1 kill ratio, establishing American air superiority doctrine.",
    significance: "Jet age air combat",
    imageSrc: SITE_IMAGES.airForce.f86vsMig15,
  },
  {
    year: "1960",
    title: "Strategic Air Command at Peak",
    description: "SAC operates over 2,000 strategic bombers and 1,000 ICBMs, maintaining continuous airborne alert with B-52s carrying nuclear weapons 24/7. The Air Force becomes the backbone of nuclear deterrence.",
    significance: "Nuclear deterrence apex",
    imageSrc: SITE_IMAGES.airForce.b52,
  },
  {
    year: "1991",
    title: "Desert Storm — Stealth Revolution",
    description: "F-117 Nighthawks strike Baghdad on opening night with zero losses. The 43-day air campaign destroys Iraq's military infrastructure and proves stealth technology has permanently changed warfare.",
    significance: "Stealth warfare validated",
    imageSrc: SITE_IMAGES.airForce.f117,
  },
  {
    year: "2005",
    title: "F-22 Raptor Achieves IOC",
    description: "The F-22 Raptor enters operational service — the world's first fifth-generation air superiority fighter. Supercruise, stealth, and integrated avionics create an insurmountable advantage over all competitors.",
    significance: "Fifth-generation dominance",
    imageSrc: SITE_IMAGES.airForce.f22,
  },
  {
    year: "2023",
    title: "B-21 Raider First Flight",
    description: "Northrop Grumman's B-21 Raider completes its first flight from Edwards AFB. The world's most advanced stealth bomber is designed to penetrate the most sophisticated air defenses on Earth.",
    significance: "Next-gen strategic bomber",
    imageSrc: SITE_IMAGES.airForce.b21,
  },
];

export const AF_FLEET_COMPARISON: AirForceFleetComparison[] = [
  { country: "United States", flag: "🇺🇸", fighters: 3050, bombers: 140, tankers: 625, totalAircraft: 13217, highlight: true },
  { country: "China",         flag: "🇨🇳", fighters: 1200, bombers: 176, tankers: 15,  totalAircraft: 3285 },
  { country: "Russia",        flag: "🇷🇺", fighters: 772,  bombers: 162, tankers: 19,  totalAircraft: 3829 },
  { country: "India",         flag: "🇮🇳", fighters: 572,  bombers: 0,   tankers: 6,   totalAircraft: 2182 },
  { country: "South Korea",   flag: "🇰🇷", fighters: 406,  bombers: 0,   tankers: 4,   totalAircraft: 898  },
  { country: "Japan",         flag: "🇯🇵", fighters: 303,  bombers: 0,   tankers: 6,   totalAircraft: 740  },
  { country: "United Kingdom",flag: "🇬🇧", fighters: 133,  bombers: 0,   tankers: 14,  totalAircraft: 607  },
];

export const AF_FUTURE_PROGRAMS: AirForceFutureProgram[] = [
  {
    label: "NGAD",
    title: "Next Generation Air Dominance",
    description:
      "A sixth-generation air superiority system-of-systems combining a crewed fighter with autonomous CCA wingmen, advanced stealth, directed energy, and AI-driven decision-making.",
    status: "In development",
    imageSrc: SITE_IMAGES.airForce.f22,
    imageAlt: "Conceptual next-generation air dominance fighter",
    capability: "Sixth-generation supremacy",
    specs: [
      { label: "Generation", value: "6th" },
      { label: "AI integration", value: "Full" },
      { label: "CCA pairing", value: "Yes" },
      { label: "IOC target", value: "2030s" },
    ],
  },
  {
    label: "CCA",
    title: "Collaborative Combat Aircraft",
    description:
      "Autonomous drone wingmen that fly alongside crewed fighters, conducting ISR, electronic warfare, and strike missions. CCA multiplies combat mass at a fraction of the cost of manned platforms.",
    status: "Increment 1 flight testing",
    imageSrc: SITE_IMAGES.airForce.drone,
    imageAlt: "Collaborative Combat Aircraft prototype",
    capability: "Autonomous force multiplication",
    specs: [
      { label: "Autonomy", value: "AI-driven" },
      { label: "Cost", value: "Fraction of F-35" },
      { label: "Increments", value: "3 planned" },
      { label: "Vendors", value: "5 competing" },
    ],
  },
  {
    label: "ARRW",
    title: "Air-Launched Rapid Response Weapon",
    description:
      "Hypersonic boost-glide weapon capable of striking targets at speeds exceeding Mach 5. Designed for time-sensitive, high-value targets in contested A2/AD environments.",
    status: "Operational prototyping",
    imageSrc: SITE_IMAGES.airForce.b2,
    imageAlt: "Hypersonic weapon concept",
    capability: "Hypersonic strike",
    specs: [
      { label: "Speed", value: "Mach 5+" },
      { label: "Type", value: "Boost-glide" },
      { label: "Carrier", value: "B-52 / B-1" },
      { label: "Defense pen.", value: "Extreme" },
    ],
  },
  {
    label: "LGM-35A Sentinel",
    title: "Next-Gen ICBM",
    description:
      "The Sentinel will replace the aging Minuteman III as America's ground-based nuclear deterrent. A completely redesigned missile system with modern C3 infrastructure for the nuclear triad's land leg.",
    status: "EMD phase",
    imageSrc: SITE_IMAGES.airForce.minuteman,
    imageAlt: "Minuteman III ICBM launch — Sentinel's predecessor",
    capability: "Nuclear modernization",
    specs: [
      { label: "Replaces", value: "Minuteman III" },
      { label: "Silos", value: "400+" },
      { label: "Range", value: "ICBM-class" },
      { label: "IOC", value: "2029 target" },
    ],
  },
];

export const AF_BASES: AirForceBase[] = [
  {
    name: "Nellis AFB",
    location: "Nevada, USA",
    role: "Advanced Combat Training",
    description: "Home of Red Flag, the world's most demanding combat exercise. The Nevada Test and Training Range spans 12,000+ sq mi — the largest air combat training facility on Earth.",
    accent: "#f5a623",
    stats: [
      { label: "Range", value: "12,000 sq mi" },
      { label: "Mission", value: "Red Flag / WIC" },
      { label: "Units", value: "57th Wing" },
    ],
  },
  {
    name: "Eglin AFB",
    location: "Florida, USA",
    role: "Weapons Development & Testing",
    description: "The largest Air Force base by area. Home to the 96th Test Wing and USAF Armament Center, where every bomb, missile, and munition is tested before entering service.",
    accent: "#7dd3fc",
    stats: [
      { label: "Area", value: "724 sq mi" },
      { label: "Mission", value: "T&E / F-35 trng" },
      { label: "Units", value: "96th TW / 33rd FW" },
    ],
  },
  {
    name: "Ramstein AB",
    location: "Germany",
    role: "USAFE Headquarters",
    description: "The nerve center of American air power in Europe. Ramstein hosts USAFE-AFAFRICA headquarters, the 86th Airlift Wing, and serves as the primary logistics hub for NATO operations.",
    accent: "#a78bfa",
    stats: [
      { label: "Role", value: "USAFE HQ" },
      { label: "Logistics", value: "Primary hub" },
      { label: "NATO", value: "CAOC-5" },
    ],
  },
  {
    name: "Andersen AFB",
    location: "Guam",
    role: "Pacific Power Projection",
    description: "Strategic bomber and tanker hub in the Western Pacific. Andersen hosts continuous Bomber Task Force rotations and serves as the tip of the spear for Indo-Pacific deterrence.",
    accent: "#34d399",
    stats: [
      { label: "BTF", value: "Continuous" },
      { label: "Tankers", value: "Forward deployed" },
      { label: "Theater", value: "INDOPACOM" },
    ],
  },
  {
    name: "Al Udeid AB",
    location: "Qatar",
    role: "CENTCOM Air Operations",
    description: "The Combined Air Operations Center (CAOC) at Al Udeid commands all coalition air operations across the Middle East. The largest USAF forward operating base in the region.",
    accent: "#f5a623",
    stats: [
      { label: "CAOC", value: "Combined" },
      { label: "Sorties", value: "100+/day" },
      { label: "Coalition", value: "Multi-nation" },
    ],
  },
  {
    name: "Langley AFB",
    location: "Virginia, USA",
    role: "ACC Headquarters / F-22 Wing",
    description: "Home of Air Combat Command headquarters and the 1st Fighter Wing — the USAF's premier F-22 Raptor operational unit. The intellectual center of American combat airpower.",
    accent: "#7dd3fc",
    stats: [
      { label: "Command", value: "ACC HQ" },
      { label: "Aircraft", value: "F-22 Raptor" },
      { label: "Unit", value: "1st FW" },
    ],
  },
];

// ─── Localized Getters ───────────────────────────────────────────────────────

export function getAirForceMetrics(locale: Locale): AirForceMetric[] {
  if (locale !== "ro") return AF_METRICS;
  return [
    { value: "5.217", label: "Aeronave Active", detail: "Cea mai mare flotă de aviație militară din istoria omenirii." },
    { value: "329.000", label: "Aviatori Activi", detail: "Piloți, tehnicieni, operatori cyber și profesioniști spațiali." },
    { value: "70+", label: "Baze în Străinătate", detail: "Instalații avansate în fiecare comandament combatant." },
    { value: "400", label: "ICBM-uri în Alertă", detail: "Rachete Minuteman III în pregătire constantă." },
    { value: "48h", label: "Rază Globală", detail: "Capacitatea de a proiecta forța oriunde pe Pământ în 48 de ore." },
    { value: "3.000+", label: "Sortii Zilnice", detail: "Zboruri de antrenament, operaționale și logistice zilnic." },
  ];
}

export function getAirForceCapabilities(locale: Locale): AirForceCapability[] {
  if (locale !== "ro") return AF_CAPABILITIES;
  return [
    {
      kicker: "01 — DOMENIU",
      title: "Superioritate Aeriană",
      description: "F-22 Raptor și F-35A Lightning II stabilesc control necontestat al spațiului de luptă. Niciun adversar egal nu a obținut paritate aeriană contra avioanelor USAF în luptă din 1953.",
      stat: "Flotă Gen-5",
      accent: "#7dd3fc",
    },
    {
      kicker: "02 — LOVITURĂ",
      title: "Lovitură Globală",
      description: "Bombardierele stealth B-2 Spirit și B-21 Raider pot atinge orice țintă de pe Pământ fără detectare. Forțele Aeriene sunt singura ramură care poate livra muniție de la distanță intercontinentală.",
      stat: "Intercontinental",
      accent: "#f5a623",
    },
    {
      kicker: "03 — MOBILITATE",
      title: "Mobilitate Globală Rapidă",
      description: "Aeronavele C-17 Globemaster III și C-5M Super Galaxy pot transporta un batalion blindat complet în orice teatru în 48 de ore.",
      stat: "Desfășurare 48h",
      accent: "#a78bfa",
    },
    {
      kicker: "04 — ISR",
      title: "Informații, Supraveghere și Recunoaștere",
      description: "RQ-4 Global Hawk, MQ-9 Reaper, U-2 Dragon Lady și RC-135 Rivet Joint operează orbite de supraveghere persistentă în fiecare teatru.",
      stat: "ISR Persistent",
      accent: "#34d399",
    },
    {
      kicker: "05 — DESCURAJARE",
      title: "Descurajare Nucleară",
      description: "400 ICBM-uri Minuteman III și bombardierele strategice B-2/B-21 formează două din cele trei picioare ale triadei nucleare.",
      stat: "2/3 din Triada Nucleară",
      accent: "#ff6b6b",
    },
  ];
}

export function getAirForcePlatforms(locale: Locale): AirForcePlatform[] {
  if (locale !== "ro") return AF_PLATFORMS;
  return AF_PLATFORMS.map((p) => {
    const roMap: Record<string, { role: string; capability: string }> = {
      "Lockheed Martin F-22 Raptor": {
        role: "Fără egal în lupta aer-aer, acest avion de dominanță aeriană combină tehnologia stealth, super-manevrabilitatea și avionica avansată pentru a asigura controlul cerului.",
        capability: "Superioritate aeriană stealth",
      },
      "Lockheed Martin F-35A Lightning II": {
        role: "Cel mai important avion de luptă multirol de generația a cincea. Proiectat pentru stealth, atac electronic și colectare de informații, este piatra de temelie a puterii tactice aeriene moderne.",
        capability: "Lovitură cu fuziune senzorială",
      },
      "F-16 Fighting Falcon": {
        role: "Cel mai numeros și comun avion de luptă multirol din cadrul Forțelor Aeriene, extrem de agil și testat în luptă în misiuni aer-aer și aer-sol.",
        capability: "Luptă multirol agilă",
      },
      "F-15EX Eagle II": {
        role: "Un avion de luptă tactic de mare tonaj, puternic modernizat și proiectat ca un 'camion greu de rachete' pentru a transporta arme hipersonice și încărcături masive alături de F-35.",
        capability: "Lovitură tactică grea",
      },
      "B-52 Stratofortress": {
        role: "Probabil cea mai longevivă aeronavă din flotă, acest bombardier greu cu rază lungă de acțiune este în serviciu de decenii și rămâne coloana vertebrală a capacităților de lovitură cu încărcătură grea și atac la distanță ale SUA.",
        capability: "Lovitură grea la distanță",
      },
      "Northrop Grumman B-2 Spirit": {
        role: "Un bombardier stealth extrem de specializat, cu aripă zburătoare, capabil să penetreze adânc în spațiul aerian inamic apărat pentru a lansa încărcături convenționale și nucleare.",
        capability: "Lovitură stealth de penetrare",
      },
      "B-1B Lancer": {
        role: "Un bombardier supersonic greu care oferă capacități de lovitură convențională cu rază lungă de acțiune și o capacitate masivă de încărcătură utilă.",
        capability: "Lovitură convențională supersonică",
      },
      "Boeing C-17 Globemaster III": {
        role: "Principalul transportor aerian strategic și tactic. Acesta livrează în mod regulat trupe, echipamente și ajutor medical către bazele de operare avansate la nivel global.",
        capability: "Mobilitate globală rapidă",
      },
      "Lockheed Martin C-130 Hercules": {
        role: "Cea mai importantă aeronavă de transport tactic, utilizată pentru parașutarea trupelor, transportul de provizii pe piste austere și executarea de misiuni speciale și realimentare.",
        capability: "Transport în teatre austere",
      },
      "Boeing KC-135 Stratotanker": {
        role: "Coloana vertebrală a razei globale de acțiune. Prin asigurarea realimentării în aer, acest avion de transport veteran extinde raza de acțiune și timpul de zbor pentru aproape toate aeronavele de luptă ale USAF.",
        capability: "Multiplicarea razei globale",
      },
      "Boeing KC-46 Pegasus": {
        role: "Avionul de realimentare aeriană de nouă generație care înlocuiește treptat cisternele mai vechi precum KC-135.",
        capability: "Multiplicare de forțe next-gen",
      },
    };
    const ro = roMap[p.name];
    return ro ? { ...p, role: ro.role, capability: ro.capability } : p;
  });
}

export function getAirForceTheaters(locale: Locale): AirForceTheater[] {
  if (locale !== "ro") return AF_THEATERS;
  return [
    {
      ...AF_THEATERS[0],
      name: "Indo-Pacific",
      region: "PACAF / Forța Aeriană a 7-a",
      headline: "Provocarea de ritm și proiectarea puterii",
      description: "Forțele Aeriene ale Pacificului operează cea mai mare componentă aeriană de teatru, menținând descurajarea cu rotații persistente de avioane de generația a 5-a și desfășurări de bombardiere.",
      signal: "Operațiuni distribuite",
    },
    {
      ...AF_THEATERS[1],
      name: "Europa",
      region: "USAFE / Forța Aeriană a 3-a",
      headline: "Coloana vertebrală NATO și flancul estic",
      description: "Forțele Aeriene SUA din Europa ancorează arhitectura de apărare aeriană NATO cu escadrile F-35A și avioane de interceptare rotaționale.",
      signal: "Interoperabilitate aliată",
    },
    {
      ...AF_THEATERS[2],
      name: "Comandamentul Central",
      region: "AFCENT / Forța Aeriană a 9-a",
      headline: "Persistență în deșert și supraveghere",
      description: "De la Baza Aeriană Al Udeid la operațiunile din Irak, Siria și Afganistan, AFCENT a generat mai multe sortii de luptă decât orice altă componentă din 2001.",
      signal: "Persistență în luptă",
    },
    {
      ...AF_THEATERS[3],
      name: "NORAD / Patrie",
      region: "Forța Aeriană 1 / CONR",
      headline: "Avertizare aerospațială și apărare continentală",
      description: "NORAD menține supravegherea aerospațială continuă cu radare terestre, AWACS și site-uri de alertă interceptor. F-22 și F-16 stau în alertă 24/7.",
      signal: "Apărarea patriei",
    },
    {
      ...AF_THEATERS[4],
      name: "Africa",
      region: "AFAFRICA / FA 17-a",
      headline: "Contraterorism cu amprentă ușoară",
      description: "Forțele Aeriene Africa sprijină contraterorismul și antrenamentul națiunilor partenere cu orbite ISR MQ-9 Reaper și mobilitate C-130.",
      signal: "CT & capacitate parteneră",
    },
  ];
}

export function getAirForceHeritageTimeline(locale: Locale): AirForceHeritageEvent[] {
  if (locale !== "ro") return AF_HERITAGE_TIMELINE;
  return [
    { ...AF_HERITAGE_TIMELINE[0], title: "Frații Wright la Kitty Hawk", description: "Orville și Wilbur Wright realizează primul zbor motorizat, susținut, la Kill Devil Hills, Carolina de Nord — 12 secunde care au schimbat războiul pentru totdeauna.", significance: "Nașterea zborului motorizat" },
    { ...AF_HERITAGE_TIMELINE[1], title: "Forțele Aeriene Stabilite & Bariera Sunetului Spartă", description: "Legea Securității Naționale creează Forțele Aeriene ale Statelor Unite. La câteva săptămâni, Chuck Yeager sparge bariera sunetului în Bell X-1.", significance: "Serviciu independent & era supersonică" },
    { ...AF_HERITAGE_TIMELINE[2], title: "MiG Alley — Coreea", description: "F-86 Sabre se angajează cu MiG-15 sovietice deasupra râului Yalu în prima luptă aeriană jet contra jet din istorie.", significance: "Luptă aeriană din era jeturilor" },
    { ...AF_HERITAGE_TIMELINE[3], title: "Comandamentul Aerian Strategic la Apogeu", description: "SAC operează peste 2.000 de bombardiere strategice și 1.000 de ICBM-uri, menținând alertă aeriană continuă cu B-52.", significance: "Apogeul descurajării nucleare" },
    { ...AF_HERITAGE_TIMELINE[4], title: "Furtuna Deșertului — Revoluția Stealth", description: "F-117 Nighthawk lovesc Bagdadul în noaptea de deschidere cu zero pierderi. Campania aeriană de 43 de zile dovedește tehnologia stealth.", significance: "Războiul stealth validat" },
    { ...AF_HERITAGE_TIMELINE[5], title: "F-22 Raptor Atinge IOC", description: "F-22 Raptor intră în serviciul operațional — primul avion de superioritate aeriană de generația a cincea din lume.", significance: "Dominanța generației a cincea" },
    { ...AF_HERITAGE_TIMELINE[6], title: "B-21 Raider — Primul Zbor", description: "B-21 Raider de la Northrop Grumman completează primul zbor. Cel mai avansat bombardier stealth din lume.", significance: "Bombardier strategic next-gen" },
  ];
}

export function getAirForceFleetComparison(locale: Locale): AirForceFleetComparison[] {
  if (locale !== "ro") return AF_FLEET_COMPARISON;
  return [
    { country: "Statele Unite", flag: "🇺🇸", fighters: 3050, bombers: 140, tankers: 625, totalAircraft: 13217, highlight: true },
    { country: "China",         flag: "🇨🇳", fighters: 1200, bombers: 176, tankers: 15,  totalAircraft: 3285 },
    { country: "Rusia",         flag: "🇷🇺", fighters: 772,  bombers: 162, tankers: 19,  totalAircraft: 3829 },
    { country: "India",         flag: "🇮🇳", fighters: 572,  bombers: 0,   tankers: 6,   totalAircraft: 2182 },
    { country: "Coreea de Sud", flag: "🇰🇷", fighters: 406,  bombers: 0,   tankers: 4,   totalAircraft: 898  },
    { country: "Japonia",       flag: "🇯🇵", fighters: 303,  bombers: 0,   tankers: 6,   totalAircraft: 740  },
    { country: "Marea Britanie",flag: "🇬🇧", fighters: 133,  bombers: 0,   tankers: 14,  totalAircraft: 607  },
  ];
}

export function getAirForceFuturePrograms(locale: Locale): AirForceFutureProgram[] {
  if (locale !== "ro") return AF_FUTURE_PROGRAMS;
  return AF_FUTURE_PROGRAMS.map((p) => {
    const roMap: Record<string, { title: string; description: string; capability: string }> = {
      "NGAD": { title: "Dominanță Aeriană de Nouă Generație", description: "Un sistem de sisteme de superioritate aeriană de generația a șasea combinând un avion pilotat cu drone CCA autonome, stealth avansat și AI.", capability: "Supremație de generația a 6-a" },
      "CCA": { title: "Aeronave de Luptă Colaborative", description: "Drone autonome wingman care zboară alături de avioanele pilotate, efectuând ISR, război electronic și misiuni de lovitură.", capability: "Multiplicare autonomă a forțelor" },
      "ARRW": { title: "Armă de Răspuns Rapid Lansată din Aer", description: "Armă hipersonică boost-glide capabilă să lovească ținte la viteze peste Mach 5 în medii A2/AD contestate.", capability: "Lovitură hipersonică" },
      "LGM-35A Sentinel": { title: "ICBM de Nouă Generație", description: "Sentinel va înlocui Minuteman III ca descurajator nuclear terestru al Americii.", capability: "Modernizare nucleară" },
    };
    const ro = roMap[p.label];
    return ro ? { ...p, title: ro.title, description: ro.description, capability: ro.capability } : p;
  });
}

export function getAirForceBases(locale: Locale): AirForceBase[] {
  if (locale !== "ro") return AF_BASES;
  return AF_BASES.map((b) => {
    const roMap: Record<string, { role: string; description: string }> = {
      "Nellis AFB": { role: "Antrenament de Luptă Avansat", description: "Gazda Red Flag, cel mai exigent exercițiu de luptă din lume. Poligonul Nevada se întinde pe peste 12.000 mi²." },
      "Eglin AFB": { role: "Dezvoltare și Testare Armament", description: "Cea mai mare bază aeriană ca suprafață. Gazda Centrului de Armament USAF unde fiecare bombă și rachetă este testată." },
      "Ramstein AB": { role: "Cartierul General USAFE", description: "Centrul nervos al puterii aeriene americane în Europa. Gazda USAFE-AFAFRICA și hub logistic principal NATO." },
      "Andersen AFB": { role: "Proiectare de Putere în Pacific", description: "Hub de bombardiere strategice și cisterne în Pacificul de Vest. Rotații continue BTF pentru descurajarea Indo-Pacific." },
      "Al Udeid AB": { role: "Operațiuni Aeriene CENTCOM", description: "Centrul Combinat de Operațiuni Aeriene (CAOC) comandă toate operațiunile aeriene ale coaliției din Orientul Mijlociu." },
      "Langley AFB": { role: "Cartierul General ACC / Escadrilă F-22", description: "Gazda Comandamentului de Luptă Aerian și a escadrilei premiere F-22 Raptor. Centrul intelectual al puterii aeriene." },
    };
    const ro = roMap[b.name];
    return ro ? { ...b, role: ro.role, description: ro.description } : b;
  });
}
