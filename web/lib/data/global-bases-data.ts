import { SITE_IMAGES } from "@/lib/site-images";

export type GlobalBaseRegion =
  | "Europe"
  | "Indo-Pacific"
  | "Middle East"
  | "Americas"
  | "Africa"
  | "Arctic / High North";

export interface StrategicBase {
  ID: string;
  Name: string;
  Country: string;
  Region: GlobalBaseRegion;
  Coordinates: string;
  "Primary Branch": string;
  "Operational Focus": string;
  "Critical Infrastructure": string[];
  "Strategic Rationale": string;
  "Image URL": string;
}

export interface RegionBrief {
  id: GlobalBaseRegion;
  label: string;
  purpose: string;
  majorInstallations: string[];
  supportedCommands: string[];
  strategicRole: string;
}

export interface TheaterCard {
  title: string;
  designation: string;
  description: string;
  imageUrl: string;
}

export interface LogisticsNode {
  label: string;
  title: string;
  description: string;
}

export interface AllianceNode {
  partner: string;
  posture: string;
  description: string;
}

export const globalBaseStats = [
  { value: "750+", label: "Sites" },
  { value: "80+", label: "Countries" },
  { value: "11", label: "Combatant Commands" },
  { value: "24/7", label: "Reach" },
];

export const strategicBases: StrategicBase[] = [
  {
    ID: "ramstein-air-base",
    Name: "Ramstein Air Base",
    Country: "Germany",
    Region: "Europe",
    Coordinates: "49.4369, 7.6003",
    "Primary Branch": "U.S. Air Force",
    "Operational Focus": "European air mobility, NATO command integration, medical evacuation, and theater communications.",
    "Critical Infrastructure": ["Airlift hub", "NATO command links", "Aeromedical evacuation", "Theater C2"],
    "Strategic Rationale": "The primary air logistics gateway into Europe, linking U.S. strategic airlift with NATO deterrence and rapid reinforcement routes from the Atlantic into the eastern flank.",
    "Image URL": SITE_IMAGES.airForce.c17,
  },
  {
    ID: "yokosuka-naval-base",
    Name: "Yokosuka Naval Base",
    Country: "Japan",
    Region: "Indo-Pacific",
    Coordinates: "35.2833, 139.6667",
    "Primary Branch": "U.S. Navy",
    "Operational Focus": "Forward-deployed carrier operations, fleet repair, missile-defense presence, and Indo-Pacific maritime command.",
    "Critical Infrastructure": ["Carrier berth", "Ship repair", "Fleet command", "Aegis integration"],
    "Strategic Rationale": "The forward naval anchor for Seventh Fleet, placing carrier strike power inside the first island chain without waiting for trans-Pacific deployment timelines.",
    "Image URL": SITE_IMAGES.navy.carrierFormation,
  },
  {
    ID: "camp-humphreys",
    Name: "Camp Humphreys",
    Country: "South Korea",
    Region: "Indo-Pacific",
    Coordinates: "36.9667, 127.0333",
    "Primary Branch": "U.S. Army",
    "Operational Focus": "Peninsula deterrence, combined U.S.-ROK command support, armored force reception, and theater sustainment.",
    "Critical Infrastructure": ["Army garrison", "Airfield", "Sustainment hub", "Combined command support"],
    "Strategic Rationale": "Primary deterrent against North Korean aggression and a critical logistical anchor for moving combat power onto the peninsula under compressed warning timelines.",
    "Image URL": SITE_IMAGES.abramsTank,
  },
  {
    ID: "diego-garcia",
    Name: "Diego Garcia",
    Country: "British Indian Ocean Territory",
    Region: "Indo-Pacific",
    Coordinates: "-7.3133, 72.4111",
    "Primary Branch": "Joint / Navy Support Facility",
    "Operational Focus": "Indian Ocean logistics, bomber access, maritime prepositioning, and long-range sustainment.",
    "Critical Infrastructure": ["Deep-water lagoon", "Runway", "Prepositioned stocks", "Fuel storage"],
    "Strategic Rationale": "A remote unsinkable logistics node positioned between Africa, the Middle East, and Asia, enabling U.S. forces to sustain operations far from continental bases.",
    "Image URL": SITE_IMAGES.globalLeadership,
  },
  {
    ID: "al-udeid-air-base",
    Name: "Al Udeid Air Base",
    Country: "Qatar",
    Region: "Middle East",
    Coordinates: "25.1174, 51.3146",
    "Primary Branch": "U.S. Air Force",
    "Operational Focus": "CENTCOM air operations, tanker support, ISR tasking, and regional command-and-control.",
    "Critical Infrastructure": ["Combined Air Operations Center", "Long runway", "Tanker ramp", "ISR support"],
    "Strategic Rationale": "The central air command platform for Middle East operations, turning regional basing access into continuous surveillance, strike coordination, and tanker-backed reach.",
    "Image URL": SITE_IMAGES.airForce.kc46,
  },
  {
    ID: "naval-station-rota",
    Name: "Naval Station Rota",
    Country: "Spain",
    Region: "Europe",
    Coordinates: "36.6453, -6.3495",
    "Primary Branch": "U.S. Navy",
    "Operational Focus": "Mediterranean access, ballistic missile defense patrols, Atlantic logistics, and naval forward presence.",
    "Critical Infrastructure": ["Destroyer homeport", "Port access", "Airfield", "Ammunition support"],
    "Strategic Rationale": "A hinge point between the Atlantic, Mediterranean, and North Africa that keeps naval missile-defense assets forward without cycling every hull from the U.S. East Coast.",
    "Image URL": SITE_IMAGES.navy.destroyer,
  },
  {
    ID: "andersen-air-force-base",
    Name: "Andersen Air Force Base",
    Country: "Guam",
    Region: "Indo-Pacific",
    Coordinates: "13.5840, 144.9290",
    "Primary Branch": "U.S. Air Force",
    "Operational Focus": "Bomber rotations, tanker staging, Pacific airpower dispersal, and long-range strike access.",
    "Critical Infrastructure": ["Strategic runway", "Fuel storage", "Bomber ramp", "Munitions area"],
    "Strategic Rationale": "A sovereign U.S. launch point west of Hawaii, giving Pacific airpower depth, dispersal, and heavy strike capacity inside the theater.",
    "Image URL": SITE_IMAGES.airForce.b2,
  },
  {
    ID: "thule-pituffik-space-base",
    Name: "Pituffik Space Base",
    Country: "Greenland",
    Region: "Arctic / High North",
    Coordinates: "76.5312, -68.7032",
    "Primary Branch": "U.S. Space Force",
    "Operational Focus": "Missile warning, polar tracking, space surveillance, and Arctic strategic awareness.",
    "Critical Infrastructure": ["Early warning radar", "Space tracking", "Polar access", "Hardened communications"],
    "Strategic Rationale": "A High North sensor and communications outpost watching polar approaches where missile trajectories, satellites, and great-power competition converge.",
    "Image URL": SITE_IMAGES.spaceForce.earth,
  },
  {
    ID: "camp-lemonnier",
    Name: "Camp Lemonnier",
    Country: "Djibouti",
    Region: "Africa",
    Coordinates: "11.5473, 43.1595",
    "Primary Branch": "Joint Expeditionary Base",
    "Operational Focus": "Horn of Africa counterterrorism, Red Sea access, maritime security, and expeditionary staging.",
    "Critical Infrastructure": ["Expeditionary airfield", "ISR support", "Port proximity", "Joint task force facilities"],
    "Strategic Rationale": "The forward operating anchor for East Africa and Red Sea contingencies, positioned beside one of the world's most important maritime chokepoints.",
    "Image URL": SITE_IMAGES.socomOperators,
  },
  {
    ID: "norfolk-naval-station",
    Name: "Naval Station Norfolk",
    Country: "United States",
    Region: "Americas",
    Coordinates: "36.9467, -76.3133",
    "Primary Branch": "U.S. Navy",
    "Operational Focus": "Atlantic fleet generation, carrier strike group deployment, maintenance, and surge capacity.",
    "Critical Infrastructure": ["Carrier piers", "Shipyards", "Fleet logistics", "Atlantic command links"],
    "Strategic Rationale": "The force-generation engine for Atlantic naval power, where carrier strike groups, amphibious forces, and sustainment pipelines are assembled before global deployment.",
    "Image URL": SITE_IMAGES.navy.geraldFord,
  },
];

export const regionBriefs: RegionBrief[] = [
  {
    id: "Europe",
    label: "Europe / NATO Shield",
    purpose: "Reinforce NATO's eastern flank, sustain transatlantic airlift, and keep command structures integrated before a crisis begins.",
    majorInstallations: ["Ramstein Air Base", "Naval Station Rota", "RAF Lakenheath", "Aviano Air Base"],
    supportedCommands: ["EUCOM", "NATO", "TRANSCOM"],
    strategicRole: "Turns the Atlantic into a reinforcement corridor rather than a barrier.",
  },
  {
    id: "Indo-Pacific",
    label: "Indo-Pacific / Deterrence Arc",
    purpose: "Hold forward maritime and air positions across the first and second island chains while preserving sovereign U.S. depth in Guam.",
    majorInstallations: ["Yokosuka", "Camp Humphreys", "Andersen AFB", "Diego Garcia"],
    supportedCommands: ["INDOPACOM", "USFK", "Seventh Fleet"],
    strategicRole: "Compresses response time across the Pacific's vast distances.",
  },
  {
    id: "Middle East",
    label: "Middle East / Forward Response",
    purpose: "Maintain air command, tanker support, ISR collection, and crisis-response access near the Gulf and Levant.",
    majorInstallations: ["Al Udeid", "Naval Support Activity Bahrain", "Ali Al Salem", "Al Dhafra"],
    supportedCommands: ["CENTCOM", "AFCENT", "Fifth Fleet"],
    strategicRole: "Keeps regional contingencies from becoming transoceanic mobilization problems.",
  },
  {
    id: "Americas",
    label: "Americas / Force Generation",
    purpose: "Generate, repair, train, and deploy the heavy force packages that move from the continental base network into global theaters.",
    majorInstallations: ["Norfolk", "Dover AFB", "Charleston", "San Diego"],
    supportedCommands: ["NORTHCOM", "TRANSCOM", "Fleet Forces"],
    strategicRole: "The homeland industrial and logistics base that makes overseas posture credible.",
  },
  {
    id: "Africa",
    label: "Africa / Chokepoint Access",
    purpose: "Support expeditionary operations, Red Sea security, and East Africa crisis response near the Bab el-Mandeb corridor.",
    majorInstallations: ["Camp Lemonnier", "Manda Bay", "Sigonella support links"],
    supportedCommands: ["AFRICOM", "CJTF-HOA", "TRANSCOM"],
    strategicRole: "Places U.S. response capacity beside a maritime chokepoint linking Europe, Asia, and the Gulf.",
  },
  {
    id: "Arctic / High North",
    label: "Arctic / High North",
    purpose: "Monitor polar missile trajectories, satellite traffic, and emerging Arctic approaches as the region becomes more contested.",
    majorInstallations: ["Pituffik Space Base", "Eielson AFB", "Clear Space Force Station"],
    supportedCommands: ["NORTHCOM", "SPACECOM", "NORAD"],
    strategicRole: "Extends warning time across the shortest aerospace routes between great powers.",
  },
];

export const theaterCards: TheaterCard[] = [
  {
    title: "Europe",
    designation: "NATO Shield",
    description: "A mature basing network built for reinforcement, deterrence, medical evacuation, and multinational command integration.",
    imageUrl: SITE_IMAGES.airForce.c17,
  },
  {
    title: "Indo-Pacific",
    designation: "Deterrence Arc",
    description: "Forward naval and air nodes positioned to reduce response time across the Pacific's extreme distance problem.",
    imageUrl: SITE_IMAGES.navy.carrierFormation,
  },
  {
    title: "Middle East",
    designation: "Forward Response",
    description: "Air command, tanker, ISR, and maritime access points that convert regional volatility into manageable operating geometry.",
    imageUrl: SITE_IMAGES.airForce.kc135,
  },
  {
    title: "Global Logistics",
    designation: "Airlift + Sealift",
    description: "The ports, ramps, stocks, and command systems that move heavy power across oceans faster than rivals can cross land borders.",
    imageUrl: SITE_IMAGES.economyPort,
  },
];

export const logisticsBackbone: LogisticsNode[] = [
  {
    label: "01 / TASK",
    title: "TRANSCOM Receives The Mission",
    description: "A crisis requirement becomes a transport problem: personnel, armor, fuel, medical capacity, munitions, and sustainment are sequenced into a single movement order.",
  },
  {
    label: "02 / AIR",
    title: "Strategic Airlift Opens The Corridor",
    description: "C-17 and C-5 routes move command teams, hospital modules, air-defense equipment, and urgent parts before slower surface lift arrives.",
  },
  {
    label: "03 / SEA",
    title: "Sealift Moves The Weight",
    description: "Prepositioned stocks, roll-on/roll-off ships, and port-control teams move the armored mass that cannot be solved by aircraft alone.",
  },
  {
    label: "04 / SUSTAIN",
    title: "The Base Network Keeps It Alive",
    description: "Fuel, repair, medical, communications, and ammunition nodes convert arrival into continuing combat power rather than a one-time deployment.",
  },
];

export const allianceArchitecture: AllianceNode[] = [
  {
    partner: "NATO",
    posture: "Integrated reinforcement",
    description: "European bases are political commitments made physical: airfields, ports, and command structures that prove Article 5 can be reinforced quickly.",
  },
  {
    partner: "Japan",
    posture: "Forward maritime depth",
    description: "U.S.-Japan basing keeps Seventh Fleet and Pacific airpower inside the operating theater, changing the timing calculus for any regional aggressor.",
  },
  {
    partner: "South Korea",
    posture: "Peninsula deterrence",
    description: "Combined U.S.-ROK infrastructure keeps deterrence immediate, visible, and logistically executable on the world's most militarized border.",
  },
  {
    partner: "Australia",
    posture: "Southern access and resilience",
    description: "Australian access expands dispersal options, training depth, submarine cooperation, and long-range sustainment across the southern Indo-Pacific.",
  },
  {
    partner: "Gulf Partners",
    posture: "Air command and energy security",
    description: "Gulf access supports air operations, maritime security, and crisis response near energy corridors that still shape global economic stability.",
  },
];
