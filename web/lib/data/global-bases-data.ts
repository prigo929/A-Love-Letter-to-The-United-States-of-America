import { SITE_IMAGES } from "@/lib/site-images";
import type { Locale } from "@/lib/i18n/config";

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
    "Image URL": SITE_IMAGES.globalBases.ramstein,
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
    "Image URL": SITE_IMAGES.globalBases.yokosuka,
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
    "Image URL": SITE_IMAGES.globalBases.campHumphreys,
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
    "Image URL": SITE_IMAGES.globalBases.diegoGarcia,
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
    "Image URL": SITE_IMAGES.globalBases.alUdeid,
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
    "Image URL": SITE_IMAGES.globalBases.rotaNavy,
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
    "Image URL": SITE_IMAGES.globalBases.andersen,
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
    "Image URL": SITE_IMAGES.globalBases.pituffik,
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
    "Image URL": SITE_IMAGES.globalBases.lemonnier,
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
    "Image URL": SITE_IMAGES.globalBases.norfolk,
  },
  {
    ID: "raf-lakenheath",
    Name: "RAF Lakenheath",
    Country: "United Kingdom",
    Region: "Europe",
    Coordinates: "52.4093, 0.5610",
    "Primary Branch": "U.S. Air Force",
    "Operational Focus": "Forward fifth-generation fighter presence, NATO quick reaction options, and northern European air defense integration.",
    "Critical Infrastructure": ["F-35 squadrons", "Hardened shelters", "NATO air links", "Weapons storage support"],
    "Strategic Rationale": "A forward combat-air node that keeps U.S. tactical aviation tied directly into NATO's northern air-defense architecture and Russian approach monitoring.",
    "Image URL": SITE_IMAGES.globalBases.lakenheath,
  },
  {
    ID: "aviano-air-base",
    Name: "Aviano Air Base",
    Country: "Italy",
    Region: "Europe",
    Coordinates: "46.0319, 12.5965",
    "Primary Branch": "U.S. Air Force",
    "Operational Focus": "Southern European fighter operations, Balkan access, Mediterranean air tasking, and NATO contingency response.",
    "Critical Infrastructure": ["Fighter wing", "NATO staging", "Munitions support", "Expeditionary ramp"],
    "Strategic Rationale": "A southern NATO launch platform positioned to cover the Balkans, Black Sea approaches, North Africa, and the central Mediterranean without waiting on transatlantic force flow.",
    "Image URL": SITE_IMAGES.globalBases.aviano,
  },
  {
    ID: "spangdahlem-air-base",
    Name: "Spangdahlem Air Base",
    Country: "Germany",
    Region: "Europe",
    Coordinates: "49.9727, 6.6925",
    "Primary Branch": "U.S. Air Force",
    "Operational Focus": "Fighter operations, European theater support, deployable airpower packages, and NATO reinforcement.",
    "Critical Infrastructure": ["Fighter ramp", "Maintenance complex", "Munitions support", "Deployment processing"],
    "Strategic Rationale": "A combat-air reinforcement node inside Germany that gives EUCOM flexible fighter capacity beyond the main Ramstein mobility hub.",
    "Image URL": SITE_IMAGES.globalBases.spangdahlem,
  },
  {
    ID: "naval-support-activity-bahrain",
    Name: "Naval Support Activity Bahrain",
    Country: "Bahrain",
    Region: "Middle East",
    Coordinates: "26.2090, 50.6080",
    "Primary Branch": "U.S. Navy",
    "Operational Focus": "Fifth Fleet command, Gulf maritime security, mine countermeasures, and regional naval coordination.",
    "Critical Infrastructure": ["Fifth Fleet HQ", "Pier access", "Maritime C2", "Mine warfare support"],
    "Strategic Rationale": "The command anchor for U.S. naval presence in the Gulf, positioned to monitor oil routes, Iranian naval activity, and chokepoint risk near the Strait of Hormuz.",
    "Image URL": SITE_IMAGES.globalBases.bahrain,
  },
  {
    ID: "al-dhafra-air-base",
    Name: "Al Dhafra Air Base",
    Country: "United Arab Emirates",
    Region: "Middle East",
    Coordinates: "24.2482, 54.5477",
    "Primary Branch": "U.S. Air Force",
    "Operational Focus": "ISR, tanker support, air superiority rotations, and Gulf air defense coordination.",
    "Critical Infrastructure": ["ISR ramp", "Tanker operations", "Air-defense links", "Long runway"],
    "Strategic Rationale": "A high-value air operations platform that gives CENTCOM surveillance and airpower depth across the Gulf while reducing reliance on a single regional hub.",
    "Image URL": SITE_IMAGES.globalBases.alDhafra,
  },
  {
    ID: "ali-al-salem-air-base",
    Name: "Ali Al Salem Air Base",
    Country: "Kuwait",
    Region: "Middle East",
    Coordinates: "29.3467, 47.5208",
    "Primary Branch": "U.S. Air Force",
    "Operational Focus": "Theater gateway operations, airlift staging, personnel movement, and northern Gulf contingency access.",
    "Critical Infrastructure": ["Airlift ramp", "Passenger terminal", "Expeditionary support", "Cargo handling"],
    "Strategic Rationale": "A movement and staging node that turns Kuwait into a northern Gulf logistics gateway for personnel, equipment, and rapid theater access.",
    "Image URL": SITE_IMAGES.globalBases.aliAlSalem,
  },
  {
    ID: "sigonella-naval-air-station",
    Name: "Naval Station Air Sigonella",
    Country: "Italy",
    Region: "Africa",
    Coordinates: "37.4017, 14.9224",
    "Primary Branch": "U.S. Navy",
    "Operational Focus": "Mediterranean ISR, Africa support, unmanned aircraft operations, and logistics bridging.",
    "Critical Infrastructure": ["ISR runway", "UAS operations", "Cargo handling", "Mediterranean staging"],
    "Strategic Rationale": "A central Mediterranean platform that connects European infrastructure to Africa missions and maritime surveillance across the southern flank.",
    "Image URL": SITE_IMAGES.globalBases.sigonella,
  },
  {
    ID: "manta-forward-location",
    Name: "Forward Operating Location Manta",
    Country: "Ecuador",
    Region: "Americas",
    Coordinates: "-0.9461, -80.6788",
    "Primary Branch": "Joint / Air Mobility Support",
    "Operational Focus": "Maritime domain awareness, counter-trafficking patrol support, and eastern Pacific monitoring.",
    "Critical Infrastructure": ["Patrol aircraft access", "Maritime surveillance", "Regional liaison", "Runway access"],
    "Strategic Rationale": "A Pacific-facing access point for monitoring maritime corridors where narcotics trafficking, illegal fishing, and regional instability intersect.",
    "Image URL": SITE_IMAGES.globalBases.manta,
  },
  {
    ID: "guantanamo-bay",
    Name: "Naval Station Guantanamo Bay",
    Country: "Cuba",
    Region: "Americas",
    Coordinates: "19.9060, -75.2071",
    "Primary Branch": "U.S. Navy",
    "Operational Focus": "Caribbean maritime access, contingency support, migrant operations capacity, and regional staging.",
    "Critical Infrastructure": ["Deep-water bay", "Airfield", "Port services", "Regional staging"],
    "Strategic Rationale": "A persistent Caribbean foothold that gives the United States maritime and air access near the Windward Passage without depending on crisis-time permissions.",
    "Image URL": SITE_IMAGES.globalBases.guantanamo,
  },
  {
    ID: "eielson-air-force-base",
    Name: "Eielson Air Force Base",
    Country: "United States",
    Region: "Arctic / High North",
    Coordinates: "64.6657, -147.1015",
    "Primary Branch": "U.S. Air Force",
    "Operational Focus": "Arctic fighter operations, Pacific airpower depth, high-end training, and polar response.",
    "Critical Infrastructure": ["F-35 squadrons", "Arctic runway", "Red Flag Alaska", "Cold-weather sustainment"],
    "Strategic Rationale": "A northern combat-air base that links Arctic access with Pacific deterrence, allowing U.S. fighters to operate from a high-latitude position inside sovereign territory.",
    "Image URL": SITE_IMAGES.globalBases.eielson,
  },
  {
    ID: "clear-space-force-station",
    Name: "Clear Space Force Station",
    Country: "United States",
    Region: "Arctic / High North",
    Coordinates: "64.2911, -149.1869",
    "Primary Branch": "U.S. Space Force",
    "Operational Focus": "Missile warning, space surveillance, polar tracking, and homeland aerospace defense.",
    "Critical Infrastructure": ["Long-range radar", "Missile warning", "Space tracking", "NORAD integration"],
    "Strategic Rationale": "A polar sensor node that buys decision time against missile threats and tracks orbital activity across northern approach corridors.",
    "Image URL": SITE_IMAGES.globalBases.clear,
  },
  {
    ID: "fort-liberty",
    Name: "Fort Liberty",
    Country: "United States",
    Region: "Americas",
    Coordinates: "35.1415, -79.0060",
    "Primary Branch": "U.S. Army",
    "Operational Focus": "Airborne force generation, special operations support, contingency headquarters, and rapid deployment packaging.",
    "Critical Infrastructure": ["Airborne units", "SOCOM support", "Deployment processing", "Joint training"],
    "Strategic Rationale": "A force-generation base built to move high-readiness airborne and special operations formations into crisis theaters faster than heavy force packages can assemble.",
    "Image URL": SITE_IMAGES.globalBases.fortLiberty,
  },
  {
    ID: "kadena-air-base",
    Name: "Kadena Air Base",
    Country: "Japan",
    Region: "Indo-Pacific",
    Coordinates: "26.3556, 127.7676",
    "Primary Branch": "U.S. Air Force",
    "Operational Focus": "Air superiority, ISR, tanker support, and first-island-chain response from Okinawa.",
    "Critical Infrastructure": ["Fighter ramp", "ISR support", "Tanker operations", "Hardened shelters"],
    "Strategic Rationale": "A front-line air hub in Okinawa that keeps U.S. airpower positioned near Taiwan, the East China Sea, and the Philippine Sea.",
    "Image URL": SITE_IMAGES.globalBases.kadena,
  },
  {
    ID: "marine-corps-base-darwin",
    Name: "Marine Rotational Force Darwin",
    Country: "Australia",
    Region: "Indo-Pacific",
    Coordinates: "-12.4634, 130.8456",
    "Primary Branch": "U.S. Marine Corps",
    "Operational Focus": "Distributed training, northern Australia access, expeditionary logistics, and Indo-Pacific dispersal.",
    "Critical Infrastructure": ["Training ranges", "Expeditionary staging", "Port access", "Airfield access"],
    "Strategic Rationale": "A southern Indo-Pacific access point that expands dispersal options and gives U.S. forces operational depth beyond the first island chain.",
    "Image URL": SITE_IMAGES.marinesAssault,
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
    imageUrl: SITE_IMAGES.globalBases.ramstein,
  },
  {
    title: "Indo-Pacific",
    designation: "Deterrence Arc",
    description: "Forward naval and air nodes positioned to reduce response time across the Pacific's extreme distance problem.",
    imageUrl: SITE_IMAGES.globalBases.yokosuka,
  },
  {
    title: "Middle East",
    designation: "Forward Response",
    description: "Air command, tanker, ISR, and maritime access points that convert regional volatility into manageable operating geometry.",
    imageUrl: SITE_IMAGES.globalBases.alUdeid,
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

export function getGlobalBaseStats(locale: Locale) {
  if (locale !== "ro") return globalBaseStats;
  return [
    { value: "750+", label: "Situri" },
    { value: "80+", label: "Țări" },
    { value: "11", label: "Comandamente combatante" },
    { value: "24/7", label: "Acoperire" },
  ];
}

export function getStrategicBases(locale: Locale): StrategicBase[] {
  if (locale !== "ro") return strategicBases;
  return strategicBases.map((b) => {
    const roMap: Record<string, { Name?: string; Country: string; "Primary Branch": string; "Operational Focus": string; "Critical Infrastructure": string[]; "Strategic Rationale": string }> = {
      "ramstein-air-base": {
        Country: "Germania",
        "Primary Branch": "U.S. Air Force",
        "Operational Focus": "Mobilitate aeriană europeană, integrarea comandamentului NATO, evacuare medicală și comunicații de teatru.",
        "Critical Infrastructure": ["Hub transport aerian", "Legături comandă NATO", "Evacuare aeromedicală", "C2 teatru"],
        "Strategic Rationale": "Principala poartă logistică aeriană în Europa, legând transportul aerian strategic al SUA cu descurajarea NATO și rutele de întărire rapidă de la Atlantic spre flancul estic.",
      },
      "yokosuka-naval-base": {
        Country: "Japonia",
        "Primary Branch": "U.S. Navy",
        "Operational Focus": "Operațiuni cu portavioane desfășurate avansat, reparații de nave, prezență pentru apărare antirachetă și comandă maritimă în Indo-Pacific.",
        "Critical Infrastructure": ["Doc portavion", "Reparații nave", "Comandă flotă", "Integrare Aegis"],
        "Strategic Rationale": "Ancora navală avansată pentru Flota a Șaptea, plasând puterea de lovire a portavioanelor în interiorul primului lanț de insule fără a aștepta termenele de desfășurare transpacifice.",
      },
      "camp-humphreys": {
        Country: "Coreea de Sud",
        "Primary Branch": "U.S. Army",
        "Operational Focus": "Descurajare în peninsulă, sprijin pentru comandamentul întrunit SUA-ROK, primirea forțelor blindate și susținere în teatru.",
        "Critical Infrastructure": ["Garnizoană militară", "Aerodrom", "Hub susținere", "Sprijin comandă întrunită"],
        "Strategic Rationale": "Principalul factor de descurajare împotriva agresiunii nord-coreene și o ancoră logistică critică pentru mutarea puterii de luptă în peninsulă în condiții de avertizare extrem de reduse.",
      },
      "diego-garcia": {
        Country: "Teritoriul Britanic din Oceanul Indian",
        "Primary Branch": "Marina SUA / Facilitate întrunită",
        "Operational Focus": "Logistică în Oceanul Indian, acces bombardiere, prepoziționare maritimă și susținere pe rază lungă.",
        "Critical Infrastructure": ["Lagună de adâncime", "Pistă de aterizare", "Stocuri prepoziționate", "Depozit combustibil"],
        "Strategic Rationale": "Un nod logistic izolat, imposibil de scufundat, poziționat între Africa, Orientul Mijlociu și Asia, permițând forțelor SUA să susțină operațiuni departe de bazele continentale.",
      },
      "al-udeid-air-base": {
        Country: "Qatar",
        "Primary Branch": "U.S. Air Force",
        "Operational Focus": "Operațiuni aeriene CENTCOM, suport avioane cisternă, misiuni ISR și comandă și control regional.",
        "Critical Infrastructure": ["Centrul Combinat de Operațiuni Aeriene", "Pistă lungă", "Rampă alimentare", "Suport ISR"],
        "Strategic Rationale": "Platforma centrală de comandă aeriană pentru operațiunile din Orientul Mijlociu, transformând accesul la bazele regionale în supraveghere continuă, coordonarea loviturilor și rază de acțiune susținută de avioanele cisternă.",
      },
      "naval-station-rota": {
        Country: "Spania",
        "Primary Branch": "U.S. Navy",
        "Operational Focus": "Acces la Marea Mediterană, patrule de apărare împotriva rachetelor balistice, logistică în Atlantic și prezență navală avansată.",
        "Critical Infrastructure": ["Port de bază distrugătoare", "Acces portuar", "Aerodrom", "Suport muniții"],
        "Strategic Rationale": "Un punct de sprijin între Atlantic, Mediterană și Africa de Nord care menține activele de apărare antirachetă navală avansate fără a fi nevoie de rotirea fiecărei nave de pe Coasta de Est a SUA.",
      },
      "andersen-air-force-base": {
        Country: "Guam",
        "Primary Branch": "U.S. Air Force",
        "Operational Focus": "Rotații de bombardiere, staționare avioane cisternă, dispersarea puterii aeriene în Pacific și acces la lovituri cu rază lungă.",
        "Critical Infrastructure": ["Pistă strategică", "Depozitare combustibil", "Rampă bombardiere", "Zonă de muniții"],
        "Strategic Rationale": "Un punct de lansare suveran al SUA la vest de Hawaii, oferind dispersie, profunzime și capacitate de atac greu forțelor aeriene din Pacific.",
      },
      "thule-pituffik-space-base": {
        Name: "Baza Spațială Pituffik",
        Country: "Groenlanda",
        "Primary Branch": "U.S. Space Force",
        "Operational Focus": "Avertizare timpurie rachete, urmărire polară, supraveghere spațială și conștientizare strategică în Arctica.",
        "Critical Infrastructure": ["Radar avertizare timpurie", "Urmărire spațială", "Acces polar", "Comunicații securizate"],
        "Strategic Rationale": "Un avanpost de senzori și comunicații watchers în High North, monitorizând abordările polare unde se intersectează traiectoriile rachetelor, sateliții și competiția marilor puteri.",
      },
      "camp-lemonnier": {
        Country: "Djibouti",
        "Primary Branch": "Bază expediționară întrunită",
        "Operational Focus": "Contraterorism în Cornul Africii, acces la Marea Roșie, securitate maritimă și sprijin expediționar.",
        "Critical Infrastructure": ["Aerodrom expediționar", "Suport ISR", "Proximitate portuară", "Facilități forță întrunită"],
        "Strategic Rationale": "Ancora operațională avansată pentru situații neprevăzute în Africa de Est și Marea Roșie, poziționată lângă unul dintre cele mai importante puncte de tranzit maritim din lume.",
      },
      "norfolk-naval-station": {
        Country: "Statele Unite",
        "Primary Branch": "U.S. Navy",
        "Operational Focus": "Generarea flotei din Atlantic, desfășurarea grupurilor de luptă ale portavioanelor, întreținere și capacitate de vârf.",
        "Critical Infrastructure": ["Docuri portavioane", "Șantiere navale", "Logistică flotă", "Legături comandă Atlantic"],
        "Strategic Rationale": "Motorul de generare a forței pentru puterea navală din Atlantic, unde sunt asamblate grupurile de luptă ale portavioanelor, forțele amfibii și conductele de susținere înainte de desfășurarea globală.",
      },
      "raf-lakenheath": {
        Country: "Marea Britanie",
        "Primary Branch": "U.S. Air Force",
        "Operational Focus": "Prezență avansată a avioanelor de luptă de generația a cincea, opțiuni de reacție rapidă NATO și integrarea apărării aeriene din Europa de Nord.",
        "Critical Infrastructure": ["Escadrile F-35", "Adăposturi ranforsate", "Legături aeriene NATO", "Suport depozitare arme"],
        "Strategic Rationale": "Un nod aerian de luptă avansat care menține aviația tactică a SUA fiind conectată direct la arhitectura de apărare aeriană nordică a NATO și la monitorizarea flancului nordic.",
      },
      "aviano-air-base": {
        Country: "Italia",
        "Primary Branch": "U.S. Air Force",
        "Operational Focus": "Operațiuni cu avioane de luptă în Europa de Sud, acces în Balcani, sarcini aeriene în Mediterană și răspuns la situații de urgență NATO.",
        "Critical Infrastructure": ["Aripă avioane luptă", "Pregătire NATO", "Suport muniție", "Rampă expediționară"],
        "Strategic Rationale": "O platformă de lansare NATO sudică poziționată pentru a acoperi Balcanii, Marea Neagră, Africa de Nord și Marea Mediterană centrală.",
      },
      "spangdahlem-air-base": {
        Country: "Germania",
        "Primary Branch": "U.S. Air Force",
        "Operational Focus": "Operațiuni cu avioane de luptă, sprijin în teatrul european, pachete de forțe aeriene deployable și întărire NATO.",
        "Critical Infrastructure": ["Rampă avioane luptă", "Complex întreținere", "Suport muniție", "Procesare desfășurare"],
        "Strategic Rationale": "Un nod de întărire aeriană de luptă în Germania care oferă EUCOM capacitate flexibilă de avioane de luptă dincolo de hub-ul principal de mobilitate Ramstein.",
      },
      "naval-support-activity-bahrain": {
        Country: "Bahrain",
        "Primary Branch": "U.S. Navy",
        "Operational Focus": "Comandamentul Flotei a Cincea, securitatea maritimă în Golf, măsuri împotriva minelor și coordonare navală regională.",
        "Critical Infrastructure": ["HQ Flota a 5-a", "Acces la chei", "C2 maritim", "Suport război mine"],
        "Strategic Rationale": "Ancora de comandă pentru prezența navală a SUA în Golf, poziționată pentru a monitoriza rutele petroliere, activitatea navală iraniană și riscul din Strâmtoarea Hormuz.",
      },
      "al-dhafra-air-base": {
        Country: "Emiratele Arabe Unite",
        "Primary Branch": "U.S. Air Force",
        "Operational Focus": "Misiuni ISR, suport avioane cisternă, rotații de superioritate aeriană și coordonarea apărării aeriene în Golf.",
        "Critical Infrastructure": ["Rampă ISR", "Operațiuni alimentare", "Legături apărare aeriană", "Pistă lungă"],
        "Strategic Rationale": "A treia platformă valoroasă de operațiuni aeriene care oferă CENTCOM supraveghere și adâncime a puterii aeriene în Golf, reducând dependența de un singur hub regional.",
      },
      "ali-al-salem-air-base": {
        Country: "Kuwait",
        "Primary Branch": "U.S. Air Force",
        "Operational Focus": "Operațiuni poartă de teatru, pregătire transport aerian, mișcare de personal și acces la situații de urgență în nordul Golfului.",
        "Critical Infrastructure": ["Rampă transport aerian", "Terminal pasageri", "Sprijin expediționar", "Manipulare mărfuri"],
        "Strategic Rationale": "Un nod de mișcare și tranzit care transformă Kuweitul într-o poartă logistică din nordul Golfului pentru personal, echipamente și acces rapid în teatru.",
      },
      "sigonella-naval-air-station": {
        Country: "Italia",
        "Primary Branch": "U.S. Navy",
        "Operational Focus": "Misiuni ISR în Mediterană, sprijin pentru Africa, operațiuni cu drone și legături logistice.",
        "Critical Infrastructure": ["Pistă ISR", "Operațiuni UAS", "Manipulare marfă", "Pregătire mediteraneană"],
        "Strategic Rationale": "O platformă din centrul Mediteranei care conectează infrastructura europeană cu misiunile din Africa și supravegherea maritimă pe flancul sudic.",
      },
      "manta-forward-location": {
        Country: "Ecuador",
        "Primary Branch": "Suport întrunit / mobilitate aeriană",
        "Operational Focus": "Conștientizarea domeniului maritim, sprijin pentru patrulele de combatere a traficului și monitorizarea Pacificului de Est.",
        "Critical Infrastructure": ["Acces aeronave patrol", "Supraveghere maritimă", "Legătură regională", "Acces la pistă"],
        "Strategic Rationale": "Un punct de acces orientat spre Pacific pentru monitorizarea coridoarelor maritime unde se intersectează traficul de stupefiante, pescuitul ilegal și instabilitatea regională.",
      },
      "guantanamo-bay": {
        Country: "Cuba",
        "Primary Branch": "U.S. Navy",
        "Operational Focus": "Acces maritim în Caraibe, sprijin pentru situații de urgență, operațiuni cu migranți și pregătire regională.",
        "Critical Infrastructure": ["Golf de adâncime", "Aerodrom", "Servicii portuare", "Staging regional"],
        "Strategic Rationale": "O prezență persistentă în Caraibe care oferă Statelor Unite acces maritim și aerian lângă Windward Passage fără a depinde de permisiunile din timp de criză.",
      },
      "eielson-air-force-base": {
        Country: "Statele Unite",
        "Primary Branch": "U.S. Air Force",
        "Operational Focus": "Operațiuni cu avioane de luptă în Arctica, profunzime a puterii aeriene în Pacific, antrenament avansat și răspuns polar.",
        "Critical Infrastructure": ["Escadrile F-35", "Pistă arctică", "Red Flag Alaska", "Susținere în condiții de frig"],
        "Strategic Rationale": "O bază aeriană de luptă nordică care leagă accesul în Arctica cu descurajarea în Pacific, permițând avioanelor de luptă ale SUA să opereze dintr-o poziție de latitudine mare.",
      },
      "clear-space-force-station": {
        Country: "Statele Unite",
        "Primary Branch": "U.S. Space Force",
        "Operational Focus": "Avertizare timpurie rachete, supraveghere spațială, urmărire polară și apărare aerospațială a patriei.",
        "Critical Infrastructure": ["Radar cu rază lungă", "Avertizare rachete", "Urmărire spațială", "Integrare NORAD"],
        "Strategic Rationale": "Un nod polar de senzori care oferă timp de decizie împotriva amenințărilor cu rachete și urmărește activitatea orbitală pe coridoarele de abordare nordice.",
      },
      "fort-liberty": {
        Country: "Statele Unite",
        "Primary Branch": "U.S. Army",
        "Operational Focus": "Generarea forțelor aeropurtate, sprijin pentru operațiunile speciale, cartier general de urgență și pachete de desfășurare rapidă.",
        "Critical Infrastructure": ["Unități aeropurtate", "Suport SOCOM", "Procesare desfășurare", "Instruire întrunită"],
        "Strategic Rationale": "O bază de generare a forțelor concepută pentru a deplasa formațiuni aeropurtate și de operațiuni speciale cu pregătire ridicată în teatrele de criză mai rapid decât se pot asambla unitățile grele.",
      },
      "kadena-air-base": {
        Country: "Japonia",
        "Primary Branch": "U.S. Air Force",
        "Operational Focus": "Superioritate aeriană, ISR, sprijin avioane cisternă și răspuns în primul lanț de insule din Okinawa.",
        "Critical Infrastructure": ["Rampă avioane luptă", "Suport ISR", "Operațiuni avioane cisternă", "Adăposturi ranforsate"],
        "Strategic Rationale": "Un nod aerian de primă linie în Okinawa care menține puterea aeriană a SUA poziționată aproape de Taiwan, Marea Chinei de Est și Marea Filipinelor.",
      },
      "marine-corps-base-darwin": {
        Country: "Australia",
        "Primary Branch": "Corpul Infanteriei Marine a SUA",
        "Operational Focus": "Instruire distribuită, acces în nordul Australiei, logistică expediționară și dispersare în Indo-Pacific.",
        "Critical Infrastructure": ["Poligoane antrenament", "Pregătire expediționară", "Acces portuar", "Acces aerodrom"],
        "Strategic Rationale": "Un punct de acces în sudul Indo-Pacificului care extinde opțiunile de dispersie și oferă forțelor SUA profunzime operațională dincolo de al doilea lanț de insule.",
      },
    };
    const ro = roMap[b.ID];
    return ro ? { ...b, ...ro } : b;
  });
}

export function getRegionBriefs(locale: Locale): RegionBrief[] {
  if (locale !== "ro") return regionBriefs;
  return regionBriefs.map((r) => {
    const roMap: Record<string, { label: string; purpose: string; strategicRole: string }> = {
      "Europe": {
        label: "Europa / Scutul NATO",
        purpose: "Întărirea flancului estic al NATO, susținerea transportului aerian transatlantic și menținerea structurilor de comandă integrate înainte de criză.",
        strategicRole: "Transformă Atlanticul într-un coridor de întărire, nu într-o barieră.",
      },
      "Indo-Pacific": {
        label: "Indo-Pacific / Arcul de descurajare",
        purpose: "Menținerea pozițiilor maritime și aeriene avansate de-a lungul primului și celui de-al doilea lanț de insule, păstrând în același timp profunzimea suverană a SUA în Guam.",
        strategicRole: "Comprimă timpul de răspuns pe distanțele vaste ale Pacificului.",
      },
      "Middle East": {
        label: "Orientul Mijlociu / Răspuns rapid",
        purpose: "Menținerea comenzii aeriene, a suportului pentru avioanele cisternă, a colectării ISR și a accesului pentru răspuns în caz de criză.",
        strategicRole: "Împiedică transformarea situațiilor de urgență regionale în probleme de mobilizare transoceanică.",
      },
      "Americas": {
        label: "Americile / Generare forțe",
        purpose: "Generarea, repararea, instruirea și desfășurarea pachetelor de forțe grele care se deplasează de la rețeaua continentale la teatrele globale.",
        strategicRole: "Baza industrială și logistică din patrie care face credibilă prezența din străinătate.",
      },
      "Africa": {
        label: "Africa / Acces la puncte de tranzit",
        purpose: "Sprijinirea operațiunilor expediționare, a securității în Marea Roșie și a răspunsului la criză în Africa de Est lângă Bab el-Mandeb.",
        strategicRole: "Plasează capacitatea de răspuns a SUA lângă un punct de tranzit maritim crucial care leagă Europa, Asia și Golful.",
      },
      "Arctic / High North": {
        label: "Arctica / High North",
        purpose: "Monitorizarea traiectoriilor de rachete polare, a traficului de sateliți și a abordărilor arctice în curs de dezvoltare.",
        strategicRole: "Extinde timpul de avertizare pe cele mai scurte rute aerospațiale dintre marile puteri.",
      },
    };
    const ro = roMap[r.id];
    return ro ? { ...r, ...ro } : r;
  });
}

export function getTheaterCards(locale: Locale): TheaterCard[] {
  if (locale !== "ro") return theaterCards;
  return [
    {
      title: "Europa",
      designation: "Scutul NATO",
      description: "O rețea matură de baze construită pentru întărire, descurajare, evacuare medicală și integrare multinațională.",
      imageUrl: SITE_IMAGES.globalBases.ramstein,
    },
    {
      title: "Indo-Pacific",
      designation: "Arcul de descurajare",
      description: "Noduri maritime și aeriene avansate poziționate pentru a reduce timpul de răspuns pe distanțele extreme ale Pacificului.",
      imageUrl: SITE_IMAGES.globalBases.yokosuka,
    },
    {
      title: "Orientul Mijlociu",
      designation: "Răspuns rapid",
      description: "Puncte de comandă aeriană, avioane cisternă, ISR și acces maritim care convertesc volatilitatea regională într-o geometrie stabilă.",
      imageUrl: SITE_IMAGES.globalBases.alUdeid,
    },
    {
      title: "Transport aerian + maritim",
      designation: "Transport aerian + maritim",
      description: "Porturile, rampele, stocurile și sistemele de comandă care deplasează forțe grele peste oceane mai rapid decât rivalii.",
      imageUrl: SITE_IMAGES.economyPort,
    },
  ];
}

export function getLogisticsBackbone(locale: Locale): LogisticsNode[] {
  if (locale !== "ro") return logisticsBackbone;
  return [
    {
      label: "01 / MISIUNE",
      title: "TRANSCOM primește misiunea",
      description: "O cerință de criză devine o problemă de transport: personalul, blindatele, combustibilul, capacitatea medicală, munițiile și susținerea sunt ordonate în mișcare.",
    },
    {
      label: "02 / AER",
      title: "Transportul aerian strategic deschide coridorul",
      description: "Rutele C-17 și C-5 deplasează echipe de comandă, module de spitale, echipamente de apărare aeriană și piese urgente înainte de sosirea navelor.",
    },
    {
      label: "03 / MARE",
      title: "Transportul maritim mută greutatea",
      description: "Stocurile prepoziționate, navele roll-on/roll-off și echipele de control portuar deplasează masa de blindate care nu poate fi transportată doar cu avioane.",
    },
    {
      label: "04 / SUSȚINERE",
      title: "Rețeaua de baze o menține activă",
      description: "Nodurile de combustibil, reparații, servicii medicale, comunicații și muniții convertesc sosirea într-o putere de luptă continuă.",
    },
  ];
}

export function getAllianceArchitecture(locale: Locale): AllianceNode[] {
  if (locale !== "ro") return allianceArchitecture;
  return [
    {
      partner: "NATO",
      posture: "Întărire integrată",
      description: "Bazele europene sunt angajamente politice materializate: aerodromuri, porturi și structuri de comandă care dovedesc că Articolul 5 poate fi susținut rapid.",
    },
    {
      partner: "Japonia",
      posture: "Profunzime maritimă avansată",
      description: "Baza SUA-Japonia menține Flota a Șaptea și puterea aeriană din Pacific în teatrul de operațiuni, schimbând calculul timpului pentru orice agresor.",
    },
    {
      partner: "Coreea de Sud",
      posture: "Descurajare în peninsulă",
      description: "Infrastructura comună SUA-ROK menține descurajarea imediată, vizibilă și logistic executabilă pe cea mai militarizată frontieră din lume.",
    },
    {
      partner: "Australia",
      posture: "Acces sudic și reziliență",
      description: "Accesul australian extinde opțiunile de dispersie, profunzimea antrenamentelor, cooperarea submarină și susținerea pe rază lungă.",
    },
    {
      partner: "Partenerii din Golf",
      posture: "Comandă aeriană și securitate energetică",
      description: "Accesul din Golf sprijină operațiunile aeriene, securitatea maritimă și răspunsul la criză lângă coridoarele energetice globale.",
    },
  ];
}
