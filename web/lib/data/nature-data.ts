// ─── Nature Section Data ─────────────────────────────────────────────────────
// This file serves as the "Ecological Source of Truth" for the platform.
// It centralizes all natural statistics, park information, and geographic facts.
//
// Architectural Principles:
// - Decoupling: UI components should NEVER hardcode facts. They import from here.
// - Bilingual Support: Every dataset is wrapped in a getter function (e.g., `getNatureHeroStats`)
//   to handle the locale-specific data mappings.
//
// Beginner guide:
// - To change nature page stats (e.g., number of National Parks), edit them here.
// - To swap nature-related images, update the SITE_IMAGES keys below.
// - To change chart data, edit the array exports.

import type { Locale } from "@/lib/i18n/config";
import { SITE_IMAGES } from "@/lib/site-images";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NatureStat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  description: string;
  source: string;
  color?: "gold" | "red" | "blue" | "white";
}

export interface NatureFact {
  id: string;
  fact: string;
  detail: string;
  source: string;
  color: "gold" | "red" | "blue";
}

export interface NationalPark {
  name: string;
  state: string;
  established: number;
  visitors: number;
  area: number;
  highlight: string;
  imageSrc: string;
  imageAlt: string;
}

export interface ParkVisitorData {
  park: string;
  visitors: number;
  highlight?: boolean;
}

export interface BiodiversityData {
  country: string;
  species: number;
  flag: string;
  highlight?: boolean;
}

export interface GreatLakeData {
  lake: string;
  volume: number;
  area: number;
  maxDepth: number;
  color: string;
}

export interface NatureSubPage {
  href: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  badge: string;
}

export interface NatureQuote {
  id: string;
  quote: string;
  attribution: string;
  title: string;
}

export interface RegionCard {
  region: string;
  icon: string;
  headline: string;
  stat: string;
  statLabel: string;
  description: string;
}

// ─── Chart Data (language-independent) ───────────────────────────────────────

export const TOP_PARKS_VISITORS: ParkVisitorData[] = [
  { park: "Great Smoky Mtns", visitors: 13.3, highlight: true },
  { park: "Grand Canyon",      visitors: 6.4  },
  { park: "Zion",              visitors: 4.9  },
  { park: "Rocky Mountain",    visitors: 4.4  },
  { park: "Acadia",            visitors: 4.1  },
  { park: "Yellowstone",       visitors: 3.9  },
  { park: "Olympic",           visitors: 3.7  },
  { park: "Yosemite",          visitors: 3.7  },
];

export const BIODIVERSITY_BY_COUNTRY: BiodiversityData[] = [
  { country: "United States", species: 432, flag: "🇺🇸", highlight: true },
  { country: "Brazil",         species: 670, flag: "🇧🇷" },
  { country: "Indonesia",      species: 515, flag: "🇮🇩" },
  { country: "Colombia",       species: 479, flag: "🇨🇴" },
  { country: "China",          species: 374, flag: "🇨🇳" },
  { country: "Mexico",         species: 364, flag: "🇲🇽" },
  { country: "Germany",        species: 72,  flag: "🇩🇪" },
  { country: "France",         species: 94,  flag: "🇫🇷" },
];

export function getBiodiversityByCountry(locale: Locale): BiodiversityData[] {
  if (locale === "ro") {
    return BIODIVERSITY_BY_COUNTRY.map((d) => ({
      ...d,
      country: d.country === "United States" ? "Statele Unite" 
             : d.country === "Brazil" ? "Brazilia"
             : d.country === "Germany" ? "Germania"
             : d.country === "France" ? "Franța"
             : d.country,
    }));
  }
  return BIODIVERSITY_BY_COUNTRY;
}

export function getTopParksVisitors(locale: Locale): ParkVisitorData[] {
  if (locale === "ro") {
    return TOP_PARKS_VISITORS.map((d) => ({
      ...d,
      park: d.park === "Great Smoky Mtns" ? "Munții Great Smoky"
          : d.park === "Grand Canyon" ? "Marele Canion"
          : d.park === "Rocky Mountain" ? "Munții Stâncoși"
          : d.park,
    }));
  }
  return TOP_PARKS_VISITORS;
}

export const GREAT_LAKES_DATA: GreatLakeData[] = [
  { lake: "Superior", volume: 2900, area: 31700, maxDepth: 1332, color: "#B22234" },
  { lake: "Michigan",  volume: 1180, area: 22400, maxDepth: 925,  color: "#3C3B6E" },
  { lake: "Huron",     volume: 850,  area: 23000, maxDepth: 750,  color: "#5554A0" },
  { lake: "Erie",      volume: 116,  area: 9910,  maxDepth: 210,  color: "#FFD700" },
  { lake: "Ontario",   volume: 393,  area: 7340,  maxDepth: 802,  color: "#CC9900" },
];

// ─── Featured Parks — uses local SITE_IMAGES ──────────────────────────────────

export const FEATURED_PARKS_EN: NationalPark[] = [
  {
    name: "Yellowstone",
    state: "WY / MT / ID",
    established: 1872,
    visitors: 3.9,
    area: 2220,
    highlight: "World's first national park: 10,000 hydrothermal features",
    imageSrc: SITE_IMAGES.yellowstoneNationalPark,
    imageAlt: "Yellowstone National Park: bison and thermal terrain",
  },
  {
    name: "Grand Canyon",
    state: "Arizona",
    established: 1919,
    visitors: 6.4,
    area: 1218,
    highlight: "277 miles long, 1 mile deep: 6 million years of geology exposed",
    imageSrc: SITE_IMAGES.homeGrandCanyon,
    imageAlt: "Grand Canyon South Rim at sunrise",
  },
  {
    name: "Yosemite",
    state: "California",
    established: 1890,
    visitors: 3.7,
    area: 748,
    highlight: "El Capitan, Half Dome, and the world's tallest waterfall in North America",
    imageSrc: SITE_IMAGES.yosemiteNationalPark,
    imageAlt: "Yosemite National Park: valley and granite walls",
  },
  {
    name: "Denali",
    state: "Alaska",
    established: 1917,
    visitors: 0.6,
    area: 6075,
    highlight: "20,310 ft: highest peak in North America, park the size of New Hampshire",
    imageSrc: SITE_IMAGES.denaliNationalPark,
    imageAlt: "Mount Denali: highest peak in North America",
  },
  {
    name: "Glacier",
    state: "Montana",
    established: 1910,
    visitors: 2.9,
    area: 1013,
    highlight: "Going-to-the-Sun Road through 700 miles of pristine alpine wilderness",
    imageSrc: SITE_IMAGES.glacierNationalPark,
    imageAlt: "Glacier National Park: alpine lakes and jagged peaks",
  },
  {
    name: "Zion",
    state: "Utah",
    established: 1919,
    visitors: 4.9,
    area: 148,
    highlight: "Towering Navajo sandstone cliffs: the iconic American canyon experience",
    imageSrc: SITE_IMAGES.zionNationalPark,
    imageAlt: "Zion National Park: red sandstone canyon walls",
  },
];

export const FEATURED_PARKS_RO: NationalPark[] = [
  {
    ...FEATURED_PARKS_EN[0],
    highlight: "Primul parc național din lume: 10.000 de fenomene hidrotermale",
  },
  {
    ...FEATURED_PARKS_EN[1],
    state: "Arizona",
    highlight: "446 km lungime, 1,6 km adâncime: 6 milioane de ani de geologie expusă",
  },
  {
    ...FEATURED_PARKS_EN[2],
    state: "California",
    highlight: "El Capitan, Half Dome și cea mai înaltă cascadă din America de Nord",
  },
  {
    ...FEATURED_PARKS_EN[3],
    state: "Alaska",
    highlight: "6.190 m: cel mai înalt vârf din America de Nord, parc de dimensiunea statului New Hampshire",
  },
  {
    ...FEATURED_PARKS_EN[4],
    state: "Montana",
    highlight: "Going-to-the-Sun Road prin 1.100 km de sălbăticie alpină pristină",
  },
  {
    ...FEATURED_PARKS_EN[5],
    state: "Utah",
    highlight: "Stânci impunătoare de gresie Navajo: experiența iconică a canionului american",
  },
];

export function getFeaturedParks(locale: Locale): NationalPark[] {
  return locale === "ro" ? FEATURED_PARKS_RO : FEATURED_PARKS_EN;
}

// ─── Hero Stats ───────────────────────────────────────────────────────────────

export const NATURE_HERO_STATS: NatureStat[] = [
  { id: "parks",    value: 63,  label: "National Parks",  description: "Crown jewels of the American landscape",        source: "NPS 2024", color: "gold"  },
  { id: "nps-sites",value: 423, label: "NPS Sites Total", description: "Monuments, seashores, historic sites & more",    source: "NPS 2024", color: "gold"  },
  { id: "acres",    value: 85,  suffix: "M", label: "Acres Protected",  description: "Larger than many entire nations",  source: "NPS 2024", color: "white" },
  { id: "visitors", value: 325, suffix: "M+", label: "Annual Visits",   description: "More than the US population, every year", source: "NPS 2023", color: "white" },
];

// ─── Sub-Page Nav Cards — uses local SITE_IMAGES where available ──────────────

export const NATURE_SUB_PAGES: NatureSubPage[] = [
  {
    href: "/nature/national-parks",
    title: "National Parks",
    description: "63 parks across 85 million acres of protected wilderness",
    imageSrc: SITE_IMAGES.yosemiteNationalPark,
    imageAlt: "Yosemite National Park",
    badge: "63 Parks",
  },
  {
    href: "/nature/alaska",
    title: "Alaska",
    description: "The Last Frontier: larger than Texas, California, and Montana combined",
    imageSrc: SITE_IMAGES.denaliNationalPark,
    imageAlt: "Mount Denali, Alaska",
    badge: "663,000 mi²",
  },
  {
    href: "/nature/rockies",
    title: "Rocky Mountains",
    description: "3,000 miles long, 53 peaks over 14,000 ft: the backbone of North America",
    imageSrc: SITE_IMAGES.glacierNationalPark,
    imageAlt: "Glacier National Park: Rocky Mountains",
    badge: "53 Fourteeners",
  },
  {
    href: "/nature/grand-canyon",
    title: "Grand Canyon",
    description: "277 miles long, 18 miles wide, one mile deep: nature's greatest sculpture",
    imageSrc: SITE_IMAGES.homeGrandCanyon,
    imageAlt: "Grand Canyon at sunrise",
    badge: "1 Mile Deep",
  },
  {
    href: "/nature/yellowstone",
    title: "Yellowstone",
    description: "World's first national park: 10,000 hydrothermal features, 5,000 bison",
    imageSrc: SITE_IMAGES.yellowstoneNationalPark,
    imageAlt: "Yellowstone National Park landscape",
    badge: "Est. 1872",
  },
  {
    href: "/nature/great-lakes",
    title: "The Great Lakes",
    description: "21% of Earth's surface freshwater: the inland seas of America",
    imageSrc: SITE_IMAGES.greatLakesChicago,
    imageAlt: "The Great Lakes with Chicago",
    badge: "21% Global Freshwater",
  },
];

// ─── Quotes ───────────────────────────────────────────────────────────────────

export const NATURE_QUOTES: NatureQuote[] = [
  {
    id: "burns",
    quote: "National parks are the best idea America ever had. Democratic, classless, and free. They reflect us at our best rather than our worst.",
    attribution: "Ken Burns",
    title: "Documentary Filmmaker, \"The National Parks: America's Best Idea\"",
  },
  {
    id: "muir",
    quote: "In every walk with Nature, one receives far more than he seeks. The mountains are calling and I must go.",
    attribution: "John Muir",
    title: "Naturalist & Founder of the Sierra Club",
  },
  {
    id: "roosevelt",
    quote: "There can be nothing in the world more beautiful than the Yosemite, the groves of the giant sequoias and redwoods, the Canyon of the Colorado: our people should see to it that they are preserved for their children and their children's children forever.",
    attribution: "Theodore Roosevelt",
    title: "26th President of the United States",
  },
];

// ─── Region Cards ─────────────────────────────────────────────────────────────

export const NATURE_REGIONS_EN: RegionCard[] = [
  { region: "Pacific Coast", icon: "🌊", headline: "Highway 1 & the Tallest Trees on Earth", stat: "379 ft", statLabel: "Tallest Coastal Redwood", description: "California's Highway 1 winds past Big Sur's dramatic cliffs. Olympic National Park holds the wettest temperate rainforest in the lower 48. Redwood National Park protects trees over 2,000 years old." },
  { region: "Desert Southwest", icon: "🏜️", headline: "Arches, Canyons & Ancient Landscapes", stat: "2,000+", statLabel: "Natural Arches in Utah", description: "Arches, Bryce Canyon, Monument Valley, and the Sonoran Desert give the American Southwest its distinct geology. Arches National Park contains more natural stone arches than anywhere on Earth." },
  { region: "Appalachian Mountains", icon: "🍂", headline: "Oldest Mountains, Most Biodiverse Forests", stat: "2,190 mi", statLabel: "Appalachian Trail Length", description: "The Appalachians pre-date the Rockies by 200 million years. Great Smoky Mountains is America's most-visited national park, famous for the most diverse temperate deciduous forest on Earth." },
  { region: "Great Plains", icon: "🌾", headline: "The Breadbasket of the World", stat: "1.3M mi²", statLabel: "Great Plains Area", description: "The American Great Plains produce more food than any equivalent landmass. The deep, rich topsoil, built by 10,000 years of prairie, feeds a billion people worldwide." },
  { region: "Pacific Islands & Hawaii", icon: "🌺", headline: "Volcanoes, Coral Reefs & Unique Biodiversity", stat: "90%", statLabel: "Hawaiian Species Found Nowhere Else", description: "Hawaii Volcanoes National Park sits atop Kilauea, one of the world's most active volcanoes. Hawaii is one of the most biodiverse island chains on Earth." },
  { region: "Everglades & Subtropical Florida", icon: "🐊", headline: "The Only Subtropical Wilderness in North America", stat: "1.5M", statLabel: "Acres in Everglades NP", description: "The Everglades, the 'River of Grass', is the only place on Earth where alligators and American crocodiles coexist. Home to the Florida panther, manatee, and over 350 bird species." },
];

export const NATURE_REGIONS_RO: RegionCard[] = [
  {
    region: "Coasta Pacificului",
    icon: "🌊",
    headline: "Highway 1 și cei mai înalți arbori de pe Pământ",
    stat: "115 m",
    statLabel: "Cel mai înalt Sequoia de coastă",
    description: "Autostrada 1 din California șerpuiește pe lângă stâncile dramatice din Big Sur. Parcul Național Olympic deține cea mai umedă pădure temperată din SUA continentală. Parcul Național Redwood protejează arbori de peste 2.000 de ani."
  },
  {
    region: "Sud-vestul Deșertic",
    icon: "🏜️",
    headline: "Arcuri, Canioane și Peisaje Antice",
    stat: "2.000+",
    statLabel: "Arcuri naturale în Utah",
    description: "Arches, Bryce Canyon, Monument Valley și Deșertul Sonoran conferă Sud-vestului american o geologie distinctă. Parcul Național Arches conține mai multe arcuri naturale de piatră decât oriunde altundeva pe Pământ."
  },
  {
    region: "Munții Appalachi",
    icon: "🍂",
    headline: "Cei mai vechi munți, cele mai biodiverse păduri",
    stat: "3.524 km",
    statLabel: "Lungimea traseului Appalachian",
    description: "Appalachii preced Munții Stâncoși cu 200 de milioane de ani. Great Smoky Mountains este cel mai vizitat parc național al Americii, renumit pentru cea mai diversă pădure temperată de foioase de pe Pământ."
  },
  {
    region: "Marile Câmpii",
    icon: "🌾",
    headline: "Coșul de pâine al lumii",
    stat: "3,3M km²",
    statLabel: "Suprafața Marilor Câmpii",
    description: "Marile Câmpii americane produc mai multă hrană decât orice masă de pământ echivalentă. Solul bogat și adânc, construit în 10.000 de ani de prerie, hrănește un miliard de oameni la nivel mondial."
  },
  {
    region: "Insulele din Pacific și Hawaii",
    icon: "🌺",
    headline: "Vulcani, recife de corali și biodiversitate unică",
    stat: "90%",
    statLabel: "Specii hawaiiene găsite doar aici",
    description: "Parcul Național Volcanoes din Hawaii se află deasupra Kilauea, unul dintre cei mai activi vulcani din lume. Hawaii este unul dintre cele mai biodiverse lanțuri insulare de pe Pământ."
  },
  {
    region: "Everglades și Florida Subtropicală",
    icon: "🐊",
    headline: "Singura sălbăticie subtropicală din America de Nord",
    stat: "6.000 km²",
    statLabel: "Acri în Parcul Național Everglades",
    description: "Everglades, 'Râul de Iarbă', este singurul loc de pe Pământ unde aligatorii și crocodilii americani coexistă. Găzduiește pantera de Florida, lamantinul și peste 350 de specii de păsări."
  }
];

export function getNatureRegions(locale: Locale): RegionCard[] {
  return locale === "ro" ? NATURE_REGIONS_RO : NATURE_REGIONS_EN;
}

// ─── English Fact Arrays ──────────────────────────────────────────────────────

export const NATURE_OVERVIEW_FACTS: NatureFact[] = [
  { id: "climate-zones", fact: "Only nation on Earth with every major climate zone", detail: "Arctic tundra in Alaska, tropical rainforests in Hawaii, temperate rainforests in the Pacific Northwest, deserts in the Southwest, subtropical wetlands in Florida, tallgrass prairies in the Midwest: no other country contains this diversity within a single sovereign territory.", source: "USGS / NOAA Climate Data", color: "gold" },
  { id: "biodiversity-lead", fact: "The US leads the developed world in biodiversity with 432,000+ species", detail: "From the world's most diverse temperate forests in the Appalachians to the unique volcanic ecosystems of Hawaii, the United States is a 'megadiverse' nation that dramatically outpaces all European and Asian peers in known species count.", source: "IUCN Red List / NatureServe 2024", color: "blue" },
  { id: "economic-impact", fact: "National Parks generate $50B+ in annual economic output", detail: "Conservation is a massive economic driver. The park system supports 378,000 jobs and provides a return on investment of $10 for every $1 of federal funding.", source: "NPS Peer-Reviewed Economics 2024", color: "red" },
  { id: "volcanic-lead", fact: "The US manages the most active volcanic territory in the developed world", detail: "With over 130 volcanoes in Alaska alone, the active Cascades in the Pacific Northwest, and Kilauea in Hawaii, the world's most active volcano, the United States possesses a dynamic volcanic domain that powers geothermal energy and creates new land every year.", source: "USGS Volcano Hazards Program", color: "gold" },
  { id: "coastline", fact: "The US has 95,471 miles of coastline: more than any nation except Canada", detail: "From the rocky shores of Maine to the tropical beaches of Hawaii, from the Gulf Coast wetlands to the Alaskan fjords, American coastline spans broad geographic diversity.", source: "NOAA 2024", color: "blue" },
  { id: "rivers", fact: "The Mississippi-Missouri river system is the world's 4th longest", detail: "At over 3,700 miles, the Missouri-Mississippi system drains 41% of the continental United States, an area of 1.2 million square miles that made America's agricultural heartland one of the most productive on Earth.", source: "USGS", color: "red" },
  {
    id: "ocean-estate",
    fact: "The Ocean Estate: America's 4.5 Million Square Miles of Maritime Sovereignty",
    detail: "The US Exclusive Economic Zone (EEZ) spans over 13,000 miles of coastline and contains 3.4 million square nautical miles (4.5 million sq miles) of ocean, larger than the combined land area of all 50 states. This massive oceanic territory grants the US exclusive rights over fisheries, seabed minerals, energy resources, and research, translating into unmatched maritime leverage.",
    source: "NOAA Office of Ocean Exploration 2024",
    color: "blue" as const
  },
  {
    id: "pittman-robertson",
    fact: "The Pittman-Robertson Act: Market-Based Conservation",
    detail: "Since its inception in 1937, the Pittman-Robertson Act has generated over $29 billion to monitor and manage the nation's fish and wildlife resources, support hunter and aquatic education, and improve access for outdoor activities. The mechanism relies on market logic: an 11% excise tax on firearms, ammunition, and archery equipment paid by manufacturers, distributed to state wildlife agencies for habitat restoration, wildlife management, and hunter education. In Fiscal Year 2024 alone, $989.5 million was apportioned to fish and wildlife agencies in all 50 states and five US territories. Hunters and shooting sports enthusiasts pay into the system, and all Americans benefit from healthy wildlife populations and natural landscapes. Hunters, through market transactions, funded it themselves.",
    source: "NRA HLF 2024",
    color: "gold" as const
  },
  {
    id: "ogallala-aquifer",
    fact: "The Ogallala Aquifer: America's Underground Ocean",
    detail: "Beneath the Great Plains lies the Ogallala Aquifer, one of the world's largest freshwater aquifers, stretching across 174,000 square miles beneath eight states from South Dakota to Texas. It contains an estimated 3 billion acre-feet of water, roughly equivalent to the volume of Lake Huron, accumulated over tens of thousands of years. This underground reservoir has made the semi-arid High Plains one of the most productive agricultural regions on Earth, irrigating roughly 30% of all US groundwater-irrigated farmland. Kansas alone produces enough wheat annually to bake 36 billion loaves of bread. The aquifer is a geological endowment that required no investment or engineering to create: a key structural reason why American agricultural productivity leads globally.",
    source: "USGS",
    color: "red" as const
  },
];

export const ALASKA_FACTS: NatureFact[] = [
  { id: "alaska-size",    fact: "Alaska is 2.5× the size of Texas, and twice the size of any other US state",          detail: "At 663,268 square miles, Alaska is so large that if it were a country, it would be the 18th largest in the world: bigger than France, Germany, and the UK combined.", source: "US Census Bureau / USGS", color: "gold" },
  { id: "alaska-glaciers",fact: "Alaska contains more glacial ice than the rest of the world outside the polar caps",     detail: "Approximately 100,000 glaciers cover 5% of Alaska's land surface, about 28,800 square miles of ice. The Hubbard Glacier alone is 76 miles long and still growing.", source: "National Snow and Ice Data Center", color: "blue" },
  { id: "alaska-wildlife",fact: "Alaska has 500 species of wildlife including the largest brown bear population on Earth", detail: "Alaska is home to 30,000+ brown bears (70% of all US brown bears), 750,000 caribou, 12,000 grizzlies, one million moose, and 50 million seabirds nesting annually.", source: "Alaska Department of Fish and Game 2024", color: "red" },
  { id: "alaska-denali",  fact: "Denali rises 18,000 ft above its surrounding terrain: more than Everest above its base",detail: "While Everest is taller in absolute elevation, Denali's base-to-summit rise of ~18,000 feet makes it arguably the most dramatic rise of any mountain on Earth.", source: "USGS / National Park Service", color: "gold" },
];

export const ROCKIES_FACTS: NatureFact[] = [
  { id: "fourteeners",    fact: "Colorado has 53 peaks over 14,000 feet: more than any country outside the Himalayas", detail: "Colorado's 53 'fourteeners' attract climbers from around the globe. Mount Elbert at 14,440 ft is the highest in the Rockies. No European nation has a single peak this high.", source: "Colorado Geological Survey", color: "gold" },
  { id: "rockies-length", fact: "The Rocky Mountains stretch 3,000 miles from New Mexico to northern Canada",            detail: "Spanning multiple US states and into Canada, the Rockies form the Continental Divide, the backbone of North America, determining which direction rivers flow to the Atlantic or Pacific.", source: "USGS", color: "red" },
  { id: "rockies-ecology",fact: "The Rockies are home to grizzly bears, gray wolves, and elk herds numbering in the thousands", detail: "Rocky Mountain National Park alone hosts over 3,000 elk. The Yellowstone-Grand Teton ecosystem contains the largest concentration of free-roaming megafauna in the lower 48 states.", source: "Rocky Mountain National Park / USFWS", color: "blue" },
];

export const GRAND_CANYON_FACTS: NatureFact[] = [
  { id: "gc-scale",    fact: "The Grand Canyon is 277 miles long, 18 miles wide, and a full mile deep",   detail: "Standing at the rim, you gaze across a void wide enough to contain the entire city of Chicago. The Colorado River at the bottom is 70 feet wide and appears as a ribbon from the top.", source: "National Park Service", color: "gold" },
  { id: "gc-geology",  fact: "The Grand Canyon exposes 1.8 billion years of Earth's geological history",   detail: "Each layer of rock is a chapter in Earth's 4.5-billion-year story. The innermost Vishnu Basement Rocks are among the oldest exposed rocks on the planet's surface.", source: "USGS / NPS Geological Survey", color: "red" },
  { id: "gc-ecosystem",fact: "Five distinct ecosystems coexist within a vertical mile of canyon walls",     detail: "Descending the Grand Canyon is like traveling from Canada to Mexico: spruce forests at the rim give way to desert scrub at the bottom, with four climate zones in between.", source: "National Park Service", color: "blue" },
];

export const YELLOWSTONE_FACTS: NatureFact[] = [
  { id: "ys-hydrothermal",fact: "Yellowstone has more hydrothermal features than the rest of the world combined", detail: "Over 10,000 geysers, hot springs, fumaroles, and mud pots: the result of a massive volcanic hotspot beneath the park. Half of all the world's geysers are in Yellowstone.", source: "Yellowstone National Park / USGS", color: "gold" },
  { id: "ys-first-park",  fact: "Yellowstone was the world's first national park: established in 1872",           detail: "When President Ulysses S. Grant signed the Yellowstone National Park Protection Act, it was the first time any government in history had set aside land specifically for public enjoyment and preservation.", source: "National Park Service Historical Records", color: "red" },
  { id: "ys-wildlife",    fact: "Yellowstone has the largest bison herd in North America: 5,000+ animals",        detail: "After near-extinction in the 1890s (fewer than 100 bison survived), Yellowstone's herd has recovered to 5,000–6,000, the largest wild bison herd on Earth.", source: "Yellowstone National Park / NPS", color: "blue" },
  { id: "ys-supervolcano",fact: "Yellowstone sits atop a supervolcano capable of reshaping a continent",           detail: "The Yellowstone Caldera is one of the largest supervolcanic systems on Earth. Its last full eruption, 640,000 years ago, deposited ash across half of North America.", source: "USGS Volcano Hazards Program", color: "gold" },
];

export const GREAT_LAKES_FACTS: NatureFact[] = [
  { id: "gl-freshwater",fact: "The Great Lakes hold 21% of all surface freshwater on Earth",                             detail: "Lakes Superior, Michigan, Huron, Erie, and Ontario collectively contain 6 quadrillion gallons of fresh water, enough to flood the entire lower 48 states to a depth of nearly 10 feet.", source: "Great Lakes Commission / EPA", color: "gold" },
  { id: "gl-coastline", fact: "The Great Lakes coastline (10,900 miles) exceeds the US Atlantic & Gulf Coasts combined", detail: "Including all islands, bays, and inlets, the Great Lakes have more coastline than the entire American Eastern Seaboard plus Gulf Coast, a geographic fact virtually unknown outside the region.", source: "NOAA Great Lakes Environmental Research Laboratory", color: "blue" },
  { id: "gl-economy",   fact: "The Great Lakes region produces $6 trillion in annual economic output",                    detail: "The eight Great Lakes states plus two Canadian provinces form one of the most productive economic regions in the world, home to 107 million people.", source: "Council of the Great Lakes Region 2024", color: "red" },
  { id: "gl-shipping",  fact: "Over 200 million tons of cargo move through Great Lakes ports each year",                  detail: "Iron ore, grain, coal, limestone, and petroleum products flow through a network of ports that has powered American industry for 150 years. The St. Lawrence Seaway connects these inland seas directly to the Atlantic Ocean.", source: "American Association of Port Authorities 2024", color: "gold" },
];

// ─── Overview Copy ────────────────────────────────────────────────────────────

export const NATURE_OVERVIEW_PARAGRAPHS_EN = [
  "The United States encompasses Arctic tundra in Alaska, tropical rainforests in Hawaii, granite peaks in Yosemite, geothermal basins in Yellowstone, the Grand Canyon, and the Great Plains: the largest temperate grassland remaining on Earth.",
  "America's natural geography represents an economic and strategic asset of immense value: the Great Lakes holding 21% of Earth's fresh surface water, the Mississippi watershed draining 41% of the continent into the most fertile agricultural heartland in history, and the Rockies forming the continental spine that determines the flow of every river between the Atlantic and Pacific.",
  "Theodore Roosevelt called the preservation of this land 'the greatest gift a generation can give to those who come after.' America answered with the world's first national park system: 85 million acres protected across 63 parks, a model of conservation every other nation has tried to imitate.",
];

export const NATURE_OVERVIEW_PARAGRAPHS_RO = [
  "Statele Unite cuprind tundră arctică în Alaska, păduri tropicale în Hawaii, masive de granit în Yosemite, bazine geotermale în Yellowstone, Marele Canion și Marile Câmpii: cea mai întinsă pajiște temperată de pe Pământ.",
  "Geografia naturală a Americii constituie un patrimoniu economic și strategic de prim rang: Marile Lacuri dețin 21% din apa dulce de suprafață a Pământului, bazinul Mississippi drenează 41% din continent, iar Munții Stâncoși formează coloana vertebrală continentală.",
  "Theodore Roosevelt a numit conservarea acestor pământuri 'cel mai mare dar pe care o generație îl poate face celor care vin după ea'. America a răspuns cu cel mai vechi și mai mare sistem de parcuri naționale din lume: 85 de milioane de acri protejați în 63 de parcuri, un model de conservare pe care fiecare altă națiune a încercat să îl imite.",
];

// ─── Romanian Fact Arrays ─────────────────────────────────────────────────────

const ALASKA_FACTS_RO: NatureFact[] = [
  { id: "alaska-size",    fact: "Alaska este de 2,5× mai mare decât Texas, și de două ori mai mare decât orice alt stat american",  detail: "Cu 663.268 de mile pătrate, Alaska este atât de mare încât, dacă ar fi o țară, ar fi a 18-a ca dimensiune din lume: mai mare decât Franța, Germania și Regatul Unit combinate.", source: "US Census Bureau / USGS", color: "gold" },
  { id: "alaska-glaciers",fact: "Alaska conține mai multă gheață glaciară decât restul lumii în afara calotelor polare",              detail: "Aproximativ 100.000 de ghețari acoperă 5% din suprafața Alaskăi (aproximativ 74.600 km²). Ghețarul Hubbard singur are 122 km lungime și continuă să crească.", source: "National Snow and Ice Data Center", color: "blue" },
  { id: "alaska-wildlife",fact: "Alaska are 500 de specii de animale sălbatice, inclusiv cea mai mare populație de urși grizzly de pe Pământ", detail: "Alaska găzduiește 30.000+ urși bruni (70% din toți urșii bruni americani), 750.000 de caribu, 12.000 de grizzly, un milion de elan și 50 de milioane de păsări de mare cuibăritoare anual.", source: "Alaska Department of Fish and Game 2024", color: "red" },
  { id: "alaska-denali",  fact: "Denali se ridică cu 5.500 m deasupra terenului înconjurător: mai mult decât Everest deasupra platoului tibetan", detail: "Deși Everest este mai înalt în altitudine absolută, ridicarea bazei până la vârf a lui Denali (~18.000 ft) îl face probabil cel mai dramatic munte de pe Pământ ca relief local.", source: "USGS / National Park Service", color: "gold" },
];

const ROCKIES_FACTS_RO: NatureFact[] = [
  { id: "fourteeners",    fact: "Colorado are 53 de vârfuri peste 4.267 m: mai mult decât orice țară din afara Himalaiei", detail: "Cele 53 de 'fourteeners' din Colorado atrag alpiniști din toată lumea. Mount Elbert la 4.399 m este cel mai înalt din Munții Stâncoși. Nicio națiune europeană nu are un singur vârf atât de înalt.", source: "Colorado Geological Survey", color: "gold" },
  { id: "rockies-length", fact: "Munții Stâncoși se întind pe 4.800 km de la New Mexico până în nordul Canadei",              detail: "Traversând mai multe state americane și Canada, Munții Stâncoși formează Linia de Separare a Continentelor, coloana vertebrală a Americii de Nord, determinând direcția râurilor spre Atlantic sau Pacific.", source: "USGS", color: "red" },
  { id: "rockies-ecology",fact: "Munții Stâncoși găzduiesc urși grizzly, lupi cenușii și cirezi de elani de mii de capete",   detail: "Parcul Național Rocky Mountain singur găzduiește peste 3.000 de elani. Ecosistemul Yellowstone-Grand Teton conține cea mai mare concentrație de megafaună liberă din statele din sudul latitudinii 49.", source: "Rocky Mountain National Park / USFWS", color: "blue" },
];

const GRAND_CANYON_FACTS_RO: NatureFact[] = [
  { id: "gc-scale",    fact: "Marele Canion are 446 km lungime, 29 km lățime și 1,6 km adâncime",         detail: "La margine, privești un gol destul de larg pentru a cuprinde întregul oraș Chicago. Râul Colorado de la fund are 21 m lățime și apare ca o panglică de sus.", source: "National Park Service", color: "gold" },
  { id: "gc-geology",  fact: "Marele Canion expune 1,8 miliarde de ani din istoria geologică a Pământului", detail: "Fiecare strat de rocă este un capitol din povestea de 4,5 miliarde de ani a Pământului. Rocile de bază Vishnu sunt printre cele mai vechi roci expuse la suprafața planetei.", source: "USGS / NPS Geological Survey", color: "red" },
  { id: "gc-ecosystem",fact: "Cinci ecosisteme distincte coexistă în interiorul unui mile vertical de pereți", detail: "Coborârea în Marele Canion este ca o călătorie de la Canada la Mexic: păduri de molid la margine cedează loc scrubului deșertic la fund, cu patru zone climatice între ele.", source: "National Park Service", color: "blue" },
];

const YELLOWSTONE_FACTS_RO: NatureFact[] = [
  { id: "ys-hydrothermal",fact: "Yellowstone are mai multe fenomene hidrotermale decât restul lumii la un loc",   detail: "Peste 10.000 de gheizeri, izvoare termale, fumarole și mlaștini noroioase: rezultatul unui hotspot vulcanic masiv sub parc. Jumătate din toți gheizerii lumii se află în Yellowstone.", source: "Yellowstone National Park / USGS", color: "gold" },
  { id: "ys-first-park",  fact: "Yellowstone a fost primul parc național din lume: înființat în 1872",          detail: "Când președintele Ulysses S. Grant a semnat Legea de Protecție a Parcului Național Yellowstone, a fost prima dată în istorie când vreun guvern a rezervat terenuri special pentru bucuria și conservarea publicului.", source: "National Park Service Historical Records", color: "red" },
  { id: "ys-wildlife",    fact: "Yellowstone are cea mai mare turmă de bison din America de Nord: 5.000+ animale", detail: "După aproape dispariție în anii 1890 (mai puțin de 100 de bizoni au supraviețuit), turma din Yellowstone s-a refăcut la 5.000–6.000, cea mai mare turmă de bizon sălbatic de pe Pământ.", source: "Yellowstone National Park / NPS", color: "blue" },
  { id: "ys-supervolcano",fact: "Yellowstone se află deasupra unui supervolcan capabil să remodeleze un continent", detail: "Caldera Yellowstone este unul dintre cele mai mari sisteme supervolcanice de pe Pământ. Ultima erupție completă, cu 640.000 de ani în urmă, a depus cenușă pe jumătate din America de Nord.", source: "USGS Volcano Hazards Program", color: "gold" },
];

const GREAT_LAKES_FACTS_RO: NatureFact[] = [
  { id: "gl-freshwater",fact: "Marile Lacuri dețin 21% din toată apa dulce de suprafață de pe Pământ",                          detail: "Lacurile Superior, Michigan, Huron, Erie și Ontario conțin în total 6 cvadriliane de galoane de apă dulce, suficient pentru a inunda toate cele 48 de state continentale la o adâncime de aproape 3 metri.", source: "Great Lakes Commission / EPA", color: "gold" },
  { id: "gl-coastline", fact: "Linia de coastă a Marilor Lacuri (17.560 km) depășește coastele Atlanticului și Golfului combinate", detail: "Incluzând toate insulele, golfurile și intrândul, Marile Lacuri au mai multă coastă decât întregul litoral american de est plus Golful Mexic, un fapt geografic uimitor, aproape necunoscut în afara regiunii.", source: "NOAA Great Lakes Environmental Research Laboratory", color: "blue" },
  { id: "gl-economy",   fact: "Regiunea Marilor Lacuri produce 6 trilioane de dolari producție economică anuală",                    detail: "Cele opt state americane de la Marile Lacuri plus două provincii canadiene formează una dintre cele mai productive regiuni economice din lume, cu 107 milioane de oameni.", source: "Council of the Great Lakes Region 2024", color: "red" },
  { id: "gl-shipping",  fact: "Peste 200 de milioane de tone de marfă trec prin porturile Marilor Lacuri în fiecare an",              detail: "Minereu de fier, cereale, cărbune, calcar și produse petroliere circulă printr-o rețea de porturi care a alimentat industria americană timp de 150 de ani.", source: "American Association of Port Authorities 2024", color: "gold" },
];

const NATURE_OVERVIEW_FACTS_RO: NatureFact[] = [
  { id: "climate-zones", fact: "Singura națiune de pe Pământ cu fiecare zonă climatică majoră",          detail: "Tundră arctică în Alaska, păduri tropicale în Hawaii, deșerturi în sud-vest, zone umede subtropicale în Florida: nicio altă țară nu conține această diversitate într-un singur teritoriu suveran.", source: "USGS / NOAA Climate Data", color: "gold" },
  { id: "biodiversity-lead", fact: "SUA conduc lumea dezvoltată în biodiversitate cu peste 432.000 de specii", detail: "De la cele mai diverse păduri temperate din lume în Appalachi la ecosistemele vulcanice unice din Hawaii, Statele Unite sunt o națiune 'megadiversă' care depășește dramatic toți omologii europeni și asiatici.", source: "IUCN Red List / NatureServe 2024", color: "blue" },
  { id: "economic-impact", fact: "Parcurile Naționale generează peste 50 mld. $ în producție economică anuală", detail: "Conservarea este un motor economic masiv. Sistemul de parcuri susține 378.000 de locuri de muncă și oferă un randament al investiției de 10$ pentru fiecare 1$ de finanțare federală.", source: "NPS Peer-Reviewed Economics 2024", color: "red" },
  { id: "volcanic-lead", fact: "SUA gestionează cel mai activ teritoriu vulcanic din lumea dezvoltată", detail: "Cu peste 130 de vulcani doar în Alaska, lanțul activ al Cascadelor în Nord-Vestul Pacificului și Kilauea în Hawaii, cel mai activ vulcan din lume, Statele Unite posedă un teritoriu vulcanic dinamic ce alimentează energia geotermală și creează pământ nou în fiecare an.", source: "USGS Volcano Hazards Program", color: "gold" },
  { id: "coastline",     fact: "SUA au 153.500 km de coastă: mai mult decât orice națiune, în afară de Canada", detail: "De la țărmurile stâncoase ale statului Maine până la plajele tropicale din Hawaii, linia de coastă americană cuprinde mai multă diversitate geografică decât orice altă masă de pământ comparabilă.", source: "NOAA 2024", color: "blue" },
  { id: "rivers",        fact: "Sistemul fluvial Mississippi-Missouri este al 4-lea cel mai lung din lume",    detail: "Cu peste 5.970 km, sistemul Missouri-Mississippi drenează 41% din Statele Unite continentale, o suprafață de 3,1 milioane de km² care a făcut inima agricolă americană una dintre cele mai productive de pe Pământ.", source: "USGS", color: "red" },
  {
    id: "ocean-estate",
    fact: "Domeniul Oceanic: 4,5 Milioane de Mile Pătrate de Suveranitate Maritimă",
    detail: "Zona Economică Exclusivă (EEZ) a SUA se întinde pe 13.000 de mile de coastă și conține 3,4 milioane de mile marine pătrate (4,5 milioane de mile pătrate) de ocean, mai mare decât suprafața terestră a tuturor celor 50 de state la un loc. Acest teritoriu oferă drepturi suverane exclusive asupra pescuitului, mineralelor de fund și resurselor energetice.",
    source: "NOAA Office of Ocean Exploration 2024",
    color: "blue" as const
  },
  {
    id: "pittman-robertson",
    fact: "Legea Pittman-Robertson: Conservare Bazată pe Piață",
    detail: "De la înființarea sa în 1937, Legea Pittman-Robertson a generat peste 29 de miliarde de dolari pentru monitorizarea și gestionarea resurselor de pește și faună sălbatică ale națiunii. Mecanismul depinde de logica de piață: o taxă specială de 11% pe arme de foc, muniție și echipamente de tir cu arcul plătită de producători, distribuită agențiilor de stat pentru restaurarea habitatelor. În anul fiscal 2024, au fost alocate 989,5 milioane de dolari în toate cele 50 de state și 5 teritorii SUA. Vânătorii și pasionații de sporturi de tragere plătesc în sistem, iar toți americanii beneficiază de faună sălbatică sănătoasă.",
    source: "NRA HLF 2024",
    color: "gold" as const
  },
  {
    id: "ogallala-aquifer",
    fact: "Acviferul Ogallala: Oceanul Subteran al Americii",
    detail: "Sub Marile Câmpii se află Acviferul Ogallala, unul dintre cele mai mari acvifere de apă dulce din lume, întinzându-se pe 174.000 de mile pătrate sub opt state. Conține aproximativ 3 miliarde de acri-picioare de apă, echivalent cu volumul Lacului Huron. Acest rezervor subteran face din High Plains una dintre cele mai productive regiuni agricole de pe Pământ, irigând circa 30% din totalul terenurilor irigate cu apă subterană din SUA. Kansas singur produce suficient grâu anual pentru a coace 36 de miliarde de pâini.",
    source: "USGS",
    color: "red" as const
  },
];

// ─── i18n Getters ─────────────────────────────────────────────────────────────

export function getNatureOverviewParagraphs(locale: Locale): string[] {
  return locale === "ro" ? NATURE_OVERVIEW_PARAGRAPHS_RO : NATURE_OVERVIEW_PARAGRAPHS_EN;
}

export function getNatureHeroStats(locale: Locale): NatureStat[] {
  if (locale === "ro") {
    return [
      { ...NATURE_HERO_STATS[0], label: "Parcuri Naționale",  description: "Bijuteriile peisajului american" },
      { ...NATURE_HERO_STATS[1], label: "Total Situri NPS",   description: "Monumente, maluri de mare, situri istorice" },
      { ...NATURE_HERO_STATS[2], label: "Acri Protejați",     description: "Mai mari decât multe națiuni întregi" },
      { ...NATURE_HERO_STATS[3], label: "Vizite Anuale",      description: "Mai mult decât populația SUA, în fiecare an" },
    ];
  }
  return NATURE_HERO_STATS;
}

export function getNatureOverviewFacts(locale: Locale): NatureFact[] {
  return locale === "ro" ? NATURE_OVERVIEW_FACTS_RO : NATURE_OVERVIEW_FACTS;
}

export function getNatureSubPages(locale: Locale): NatureSubPage[] {
  if (locale === "ro") {
    return [
      { ...NATURE_SUB_PAGES[0], title: "Parcuri Naționale",  description: "63 de parcuri pe 85 de milioane de acri de sălbăticie protejată" },
      { ...NATURE_SUB_PAGES[1], title: "Alaska",             description: "Ultima Frontieră: mai mare decât Texas, California și Montana combinate" },
      { ...NATURE_SUB_PAGES[2], title: "Munții Stâncoși",    description: "4.800 km lungime, 53 de vârfuri peste 4.270 m: coloana vertebrală a Americii de Nord" },
      { ...NATURE_SUB_PAGES[3], title: "Marele Canion",      description: "446 km lungime, 29 km lățime, 1,6 km adâncime: cea mai mare sculptură a naturii" },
      { ...NATURE_SUB_PAGES[4], title: "Yellowstone",        description: "Primul parc național din lume: 10.000 de fenomene hidrotermale" },
      { ...NATURE_SUB_PAGES[5], title: "Marile Lacuri",      description: "21% din apa dulce de suprafață a Pământului: mările interioare ale Americii" },
    ];
  }
  return NATURE_SUB_PAGES;
}

export function getNatureQuotes(locale: Locale): NatureQuote[] {
  if (locale === "ro") {
    return [
      { ...NATURE_QUOTES[0], quote: "Parcurile naționale sunt cea mai bună idee pe care America a avut-o vreodată. Democratice, fără clase și gratuite. Ele ne reflectă la cel mai bun al nostru, nu la cel mai rău." },
      { ...NATURE_QUOTES[1], quote: "În fiecare plimbare cu Natura, primim mult mai mult decât căutăm. Munții cheamă și trebuie să merg." },
      { ...NATURE_QUOTES[2], quote: "Nu poate exista nimic în lume mai frumos decât Yosemite, pădurile de sequoia și redwood, Canioanele Colorado — poporul nostru ar trebui să se asigure că sunt păstrate pentru copiii lor și copiii copiilor lor, pentru totdeauna." },
    ];
  }
  return NATURE_QUOTES;
}

export function getAlaskaFacts(locale: Locale): NatureFact[] {
  return locale === "ro" ? ALASKA_FACTS_RO : ALASKA_FACTS;
}

export function getRockiesFacts(locale: Locale): NatureFact[] {
  return locale === "ro" ? ROCKIES_FACTS_RO : ROCKIES_FACTS;
}

export function getGrandCanyonFacts(locale: Locale): NatureFact[] {
  return locale === "ro" ? GRAND_CANYON_FACTS_RO : GRAND_CANYON_FACTS;
}

export function getYellowstoneFacts(locale: Locale): NatureFact[] {
  return locale === "ro" ? YELLOWSTONE_FACTS_RO : YELLOWSTONE_FACTS;
}

export function getGreatLakesFacts(locale: Locale): NatureFact[] {
  return locale === "ro" ? GREAT_LAKES_FACTS_RO : GREAT_LAKES_FACTS;
}
