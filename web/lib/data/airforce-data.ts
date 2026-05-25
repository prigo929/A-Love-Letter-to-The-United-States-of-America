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
    name: "F-22 Raptor",
    designation: "Air Superiority Fighter",
    role: "Fifth-generation stealth air dominance fighter. Supercruise capability, thrust vectoring, and integrated avionics.",
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
    name: "F-35A Lightning II",
    designation: "Multirole Stealth Fighter",
    role: "Fifth-generation multirole stealth fighter with unmatched sensor fusion, electronic warfare, and network-centric warfare capability.",
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
    name: "B-2 Spirit",
    designation: "Stealth Strategic Bomber",
    role: "Flying-wing stealth bomber capable of intercontinental nuclear and conventional strike with near-zero radar cross-section.",
    imageSrc: SITE_IMAGES.airForce.b2,
    imageAlt: "B-2 Spirit stealth bomber in maintenance hangar",
    capability: "Penetrating strike",
    specs: [
      { label: "Range", value: "6,000 nmi" },
      { label: "Payload", value: "40,000 lb" },
      { label: "RCS", value: "Near-zero" },
      { label: "Crew", value: "2 pilots" },
    ],
  },
  {
    name: "B-21 Raider",
    designation: "Next-Gen Stealth Bomber",
    role: "The world's most advanced stealth bomber. Designed for contested environments with open-architecture systems and nuclear certification.",
    imageSrc: SITE_IMAGES.airForce.b21,
    imageAlt: "B-21 Raider first flight",
    capability: "Next-gen penetration",
    specs: [
      { label: "Generation", value: "6th-Gen" },
      { label: "Stealth", value: "Advanced LO" },
      { label: "Nuclear", value: "Dual-capable" },
      { label: "Status", value: "Flight testing" },
    ],
  },
  {
    name: "C-17 Globemaster III",
    designation: "Strategic Airlifter",
    role: "Heavy strategic and tactical airlift — delivers combat forces, humanitarian aid, and outsize cargo to any airfield worldwide.",
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
    name: "AC-130J Ghostrider",
    designation: "Gunship",
    role: "Precision close air support, air interdiction, and armed reconnaissance from a modified C-130 platform with 105mm howitzer and guided munitions.",
    imageSrc: SITE_IMAGES.airForce.ac130,
    imageAlt: "AC-130J Ghostrider in flight",
    capability: "Precision CAS",
    specs: [
      { label: "Weapons", value: "105mm / 30mm / GBU" },
      { label: "Loiter", value: "4+ hours" },
      { label: "Sensors", value: "EO/IR/Radar" },
      { label: "Crew", value: "13" },
    ],
  },
  {
    name: "KC-46A Pegasus",
    designation: "Aerial Refueling Tanker",
    role: "Next-generation refueling tanker extending the combat range of every fighter, bomber, and transport in the joint force.",
    imageSrc: SITE_IMAGES.airForce.f22Formation,
    imageAlt: "F-22 Raptors in formation",
    capability: "Force multiplication",
    specs: [
      { label: "Fuel", value: "212,000 lb" },
      { label: "Boom", value: "Centerline" },
      { label: "Drogue", value: "Wing pods" },
      { label: "Fleet", value: "68 delivered" },
    ],
  },
  {
    name: "MQ-9 Reaper / CCA",
    designation: "Unmanned Combat Platform",
    role: "From the proven MQ-9 Reaper to the emerging Collaborative Combat Aircraft (CCA), the Air Force leads in autonomous and optionally-manned aerial warfare.",
    imageSrc: SITE_IMAGES.airForce.drone,
    imageAlt: "YFQ-42A drone on runway",
    capability: "Autonomous warfare",
    specs: [
      { label: "Endurance", value: "27 hours" },
      { label: "Weapons", value: "Hellfire / GBU-12" },
      { label: "CCA Gen", value: "Increment 1" },
      { label: "AI", value: "Autonomous teaming" },
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
    imageSrc: "https://images.unsplash.com/photo-1614728263202-43d588024541?auto=format&fit=crop&w=960&q=80",
  },
  {
    year: "1947",
    title: "Air Force Established & Sound Barrier Broken",
    description: "The National Security Act creates the United States Air Force as an independent branch. Weeks later, Chuck Yeager breaks the sound barrier in the Bell X-1 'Glamorous Glennis.'",
    significance: "Independent service & supersonic era",
    imageSrc: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=960&q=80",
  },
  {
    year: "1950",
    title: "MiG Alley — Korea",
    description: "F-86 Sabres engage Soviet MiG-15s over the Yalu River in the first jet-versus-jet air combat in history. USAF pilots achieve a 10:1 kill ratio, establishing American air superiority doctrine.",
    significance: "Jet age air combat",
    imageSrc: "https://images.unsplash.com/photo-1579546929518-9e396f3cc135?auto=format&fit=crop&w=960&q=80",
  },
  {
    year: "1960",
    title: "Strategic Air Command at Peak",
    description: "SAC operates over 2,000 strategic bombers and 1,000 ICBMs, maintaining continuous airborne alert with B-52s carrying nuclear weapons 24/7. The Air Force becomes the backbone of nuclear deterrence.",
    significance: "Nuclear deterrence apex",
    imageSrc: "https://images.unsplash.com/photo-1569396116180-210c182bedb8?auto=format&fit=crop&w=960&q=80",
  },
  {
    year: "1991",
    title: "Desert Storm — Stealth Revolution",
    description: "F-117 Nighthawks strike Baghdad on opening night with zero losses. The 43-day air campaign destroys Iraq's military infrastructure and proves stealth technology has permanently changed warfare.",
    significance: "Stealth warfare validated",
    imageSrc: "https://images.pexels.com/photos/6832455/pexels-photo-6832455.jpeg?auto=compress&cs=tinysrgb&w=960",
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
  { country: "United States", flag: "🇺🇸", fighters: 2717, bombers: 140, tankers: 479, totalAircraft: 5217, highlight: true },
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
      "F-22 Raptor": { role: "Avion de superioritate aeriană de generația a cincea. Capacitate supercruise, vectorizare a tracțiunii și avionică integrată.", capability: "Superioritate aeriană stealth" },
      "F-35A Lightning II": { role: "Avion stealth multirole de generația a cincea cu fuziune senzorială fără egal, război electronic și capacitate de luptă în rețea.", capability: "Lovitură cu fuziune senzorială" },
      "B-2 Spirit": { role: "Bombardier strategic stealth cu aripi zburătoare capabil de lovitură intercontinentală nucleară și convențională.", capability: "Lovitură de penetrare" },
      "B-21 Raider": { role: "Cel mai avansat bombardier stealth din lume. Proiectat pentru medii contestate cu sisteme cu arhitectură deschisă.", capability: "Penetrare next-gen" },
      "C-17 Globemaster III": { role: "Transport aerian strategic și tactic greu — livrează forțe de luptă, ajutor umanitar și marfă supradimensionată.", capability: "Mobilitate globală rapidă" },
      "AC-130J Ghostrider": { role: "Sprijin aerian apropiat de precizie, interdicție aeriană și recunoaștere armată de pe o platformă C-130 modificată.", capability: "CAS de precizie" },
      "KC-46A Pegasus": { role: "Cisternă de realimentare aeriană de nouă generație care extinde raza de luptă a forțelor aeriene.", capability: "Multiplicare de forțe" },
      "MQ-9 Reaper / CCA": { role: "De la MQ-9 Reaper la Aeronavele de Luptă Colaborative (CCA), Forțele Aeriene conduc în războiul aerian autonom.", capability: "Război autonom" },
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
    { country: "Statele Unite", flag: "🇺🇸", fighters: 2717, bombers: 140, tankers: 479, totalAircraft: 5217, highlight: true },
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
