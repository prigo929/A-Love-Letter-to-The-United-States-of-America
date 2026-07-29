// Data file for the homepage.
//
// This file is where a non-programmer should usually edit homepage content:
// - key stats
// - section copy
// - video cards
// - chart data
// - gallery images
//
// Images are pulled from SITE_IMAGES, so changing a homepage image usually
// means replacing the image key used here.
//
// Why this file exists:
// React components should focus on layout and behavior. Keeping the content in
// one place makes updates easier and reduces the chance of editing the wrong file.

import { SITE_IMAGES } from "@/lib/site-images";
import type { ContentBlockItem } from "@/types/content.types";

// Small facts bar near the top of the homepage.
// Change these values if you want to update the animated counters.
// `as const` at the end tells TypeScript to keep these values very specific,
// which helps catch mistakes when other files read this data.
export const KEY_STATS = [
  {
    id: "gdp",
    prefix: "#",
    value: 1,
    label: "Economy",
    description: "$32.4 Trillion GDP",
    source: "IMF 2026",
    color: "gold" as const,
  },
  {
    id: "population",
    value: 342,
    suffix: "M+",
    label: "Americans",
    description: "342 million stories",
    source: "US Census Bureau 2026",
    color: "white" as const,
  },
  {
    id: "national-parks",
    value: 63,
    label: "National Parks",
    description: "85 million acres of wonder",
    source: "National Park Service",
    color: "white" as const,
  },
  {
    id: "military-bases",
    value: 800,
    suffix: "+",
    label: "Military Bases",
    description: "Worldwide presence",
    source: "Department of Defense",
    color: "white" as const,
  },
  {
    id: "nobel-prizes",
    value: 425,
    suffix: "+",
    label: "Nobel Prizes",
    description: "More than any nation",
    source: "Nobel Foundation 2025",
    color: "white" as const,
  },
  {
    id: "military",
    prefix: "#",
    value: 1,
    label: "Military Power",
    description: "$954B defense budget",
    source: "SIPRI 2025",
    color: "gold" as const,
  },
] as const;

export const HOME_COPY = {
  sectionGridSummary:
    "Explore the $32.4 trillion economy, 63 national parks, constitutional governance, and technological breakthroughs that define America.",
  statSources:
    "Sources: IMF, SIPRI, NPS, Nobel Foundation, DoD (2025–2026 data)",
} as const;

// Placeholder copy for the economy landing summary used on the homepage.
export const ECONOMY_PAGE_COPY = {
  heroValue: "$32.4T",
  description:
    "The United States economy, valued at $32.4 trillion, represents the largest national economy in human history.",
  body: "Phase 3: Economy section, coming soon. Full charts, data, and analysis of America's unrivaled economic dominance.",
} as const;

// Four long-form homepage feature blocks used by WhyAmericaSection.
// To change the image in one block, swap the `imageSrc` entry to another value
// from SITE_IMAGES.
//
// Each block has:
// - text content (`heading`, `subheading`, `paragraphs`)
// - one image (`imageSrc`, `imageAlt`)
// - small supporting fact pills (`facts`)
export const WHY_AMERICA_BLOCKS: ContentBlockItem[] = [
  {
    heading: "The Land of the Free",
    subheading: "250 Years of Unbroken Constitutional Government",
    paragraphs: [
      "No nation in history has maintained the same constitutional framework for as long as the United States, spanning 250 years. While regimes crumbled and national constitutions were repeatedly rewritten across the globe, America's founding text stood firm through civil war, world wars, and economic turmoil.",
      "The First Amendment alone is without parallel: no nation on Earth extends freedom of speech as broadly as the United States. The Bill of Rights recognized fundamental human freedoms that predated the government itself. That constitutional distinction shapes American society.",
    ],
    imageSrc: SITE_IMAGES.constitutionDocument,
    imageAlt:
      "The United States Constitution, the longest-surviving written national constitution in history",
    imagePosition: "right",
    facts: [
      {
        id: "const-1",
        fact: "250+ years of constitutional government",
        source: "The longest in the world",
        color: "gold",
      },
      {
        id: "const-2",
        fact: "Broadest free speech protections on Earth",
        source: "First Amendment, 1791",
        color: "red",
      },
      {
        id: "const-3",
        fact: "27 Amendments, proof the system can evolve",
        source: "National Archives",
        color: "blue",
      },
    ],
  },
  {
    heading: "The Engine of Innovation",
    subheading: "Technological Enterprise and Industrial Achievement",
    paragraphs: [
      "The telephone, airplane, transistor, microchip, internet, iPhone, mRNA vaccine, and artificial intelligence all trace their origins to American research centers and private enterprise.",
      "America receives approximately 50% of global venture capital funding and houses 7 of the world's top 10 universities. Its researchers have earned more Nobel Prizes than the next three nations combined. This extraordinary output stems directly from an economic model built on free enterprise, risk tolerance, and individual initiative.",
    ],
    imageSrc: SITE_IMAGES.homeSiliconValley,
    imageAlt:
      "Microchip circuit board, symbol of American technological dominance",
    imagePosition: "left",
    facts: [
      {
        id: "tech-1",
        fact: "~50% of global VC investment flows to the US",
        source: "NVCA 2024",
        color: "gold",
      },
      {
        id: "tech-2",
        fact: "425+ Nobel Prizes, more than any nation",
        source: "Nobel Foundation 2025",
        color: "red",
      },
      {
        id: "tech-3",
        fact: "650+ unicorn companies, 50%+ of the global total",
        source: "Pitchbook 2024",
        color: "blue",
      },
    ],
  },
  {
    heading: "America the Beautiful",
    subheading: "Continental Ecosystems and Protected Public Lands",
    paragraphs: [
      "The United States holds extraordinary ecological diversity within a single nation. Its geography encompasses Arctic tundra in Alaska, tropical rainforests in Hawaii, granite peaks in Yosemite, geothermal basins in Yellowstone, the Grand Canyon, and the Great Lakes, which contain 21% of Earth's surface freshwater.",
      'Theodore Roosevelt called the preservation of this land "the greatest gift a generation can give to those who come after." America fulfilled that vision by establishing the world\'s first national park system, protecting 85 million acres across 63 designated parks.',
    ],
    imageSrc: SITE_IMAGES.grandTeton,
    imageAlt:
      "Grand Teton National Park, a crown jewel of the American national park system",
    imagePosition: "right",
    facts: [
      {
        id: "nat-1",
        fact: "63 National Parks, 85 million acres protected",
        source: "National Park Service",
        color: "gold",
      },
      {
        id: "nat-2",
        fact: "Great Lakes hold 21% of Earth's surface freshwater",
        source: "EPA",
        color: "blue",
      },
      {
        id: "nat-3",
        fact: "Only nation with both Arctic tundra & tropical rainforest",
        source: "USGS",
        color: "red",
      },
    ],
  },
  {
    heading: "Guardian of the Free World",
    subheading:
      "The Most Powerful Military in the History of Human Civilization",
    paragraphs: [
      "The United States operates 11 aircraft carrier strike groups, while the rest of the world combined maintains four. Its defense budget of $954 billion exceeds the next ten nations' defense spending combined. America maintains strategic installations across 80 countries, operates a complete nuclear triad, and deploys advanced military technologies.",
      "Beyond raw hardware and manpower, American force projection sustains the global rules-based order, open maritime trade lanes, and democratic security alliances across key regions.",
    ],
    imageSrc: SITE_IMAGES.homeAirForcePlane,
    imageAlt:
      "US Air Force cargo plane on the tarmac, symbol of American military reach and readiness",
    imagePosition: "left",
    facts: [
      {
        id: "mil-1",
        fact: "11 carrier strike groups, more than the rest of the world",
        source: "IISS 2024",
        color: "gold",
      },
      {
        id: "mil-2",
        fact: "$954 billion defense budget",
        source: "SIPRI 2025",
        color: "red",
      },
      {
        id: "mil-3",
        fact: "800+ bases in 80+ countries, truly global reach",
        source: "DoD",
        color: "blue",
      },
    ],
  },
];

export const VIDEO_PREVIEWS = [
  {
    id: "cinematic",
    title: "America in 16K",
    description:
      "The United States captured in 16K ultra-HD, showcasing the infrastructure and geography of the world's largest economy.",
    youtubeId: "jPBfZrgvpSo",
    thumbnailSrc: SITE_IMAGES.homeNycSkyline,
    thumbnailAlt: "American skyline in ultra-high definition",
    duration: "10:36",
    category: "The Nation",
  },
  {
    id: "cities",
    title: "Flying Over American Cities",
    description:
      "An 8K aerial flight highlighting the architectural density and expansive suburbs of America's metropolitan areas.",
    youtubeId: "vE3BAgh_VAQ",
    thumbnailSrc: SITE_IMAGES.cities.aerialChicago,
    thumbnailAlt: "Aerial view of an American city",
    duration: "8:12",
    category: "Cities",
  },
  {
    id: "neighborhoods",
    title: "American Neighborhoods",
    description:
      "A quiet walk through the tree-lined streets and suburbs that define everyday American life.",
    youtubeId: "rVrhikMug3A",
    thumbnailSrc: SITE_IMAGES.housing.frontPorch,
    thumbnailAlt: "A walk through an American suburban neighborhood",
    duration: "1:30:00",
    category: "Everyday",
  },
] as const;

// These three datasets power the mini charts in DataTeaserSection.
// The chart component reads `country` and `value` from each item.
export const GDP_COMPARISON_DATA = [
  { country: "USA", value: 32.4, isUSA: true },
  { country: "China", value: 20.8, isUSA: false },
  { country: "Germany", value: 5.4, isUSA: false },
  { country: "Japan", value: 4.4, isUSA: false },
  { country: "UK", value: 4.3, isUSA: false },
  { country: "India", value: 4.2, isUSA: false },
  { country: "France", value: 3.6, isUSA: false },
] as const;

export const MILITARY_SPENDING_DATA = [
  { country: "USA", value: 954, isUSA: true },
  { country: "China", value: 336, isUSA: false },
  { country: "Russia", value: 190, isUSA: false },
  { country: "Germany", value: 114, isUSA: false },
  { country: "India", value: 92, isUSA: false },
  { country: "UK", value: 89, isUSA: false },
  { country: "France", value: 68, isUSA: false },
] as const;

export const NOBEL_PRIZES_DATA = [
  { country: "USA", value: 425, isUSA: true },
  { country: "UK", value: 137, isUSA: false },
  { country: "Germany", value: 114, isUSA: false },
  { country: "France", value: 73, isUSA: false },
  { country: "Sweden", value: 33, isUSA: false },
  { country: "Japan", value: 29, isUSA: false },
  { country: "Russia", value: 21, isUSA: false },
] as const;

// Homepage gallery preview data.
//
// Important:
// - `src` decides which image file is shown
// - `caption` is the short label users see
// - `description` is the longer text shown in the lightbox
// - `category` powers the small category pills
// - `span` changes the card shape in the layout
//
// If the gallery layout looks odd after changing an item, check `span` first.
export const GALLERY_PREVIEW_IMAGES = [
  {
    id: "usa-from-space",
    src: SITE_IMAGES.homeUsaAtNightFromSpace,
    alt: "The United States at night seen from orbit, with major population centers glowing across the continent",
    caption: "The United States at Night, from Space",
    description:
      "The United States at night seen from orbit, with major population centers glowing across the continent and revealing the scale of the country's cities, infrastructure, and connected regions.",
    category: "Global Scale",
    span: "wide",
  },
  {
    id: "chicago-downtown",
    src: SITE_IMAGES.homeChicagoDowntownPortrait,
    alt: "Elevated dusk view of the Chicago River running through downtown Chicago",
    caption: "Downtown Chicago, Illinois",
    description:
      "This is an elevated, dusk view of the Chicago River flowing through the downtown architectural canyon. The perspective looks down the river corridor from behind a stone balustrade, showing multiple bascule bridges spanning the water. Key elements include the illuminated multi-level Wacker Drive on the left and the distinctive, cylindrical Marina City towers on the right, with city lights beginning to reflect on the water as evening sets in.",
    category: "Cities",
    span: "tall",
  },
  {
    id: "yosemite-road",
    src: SITE_IMAGES.grandTeton,
    alt: "A road cutting through Yosemite National Park beneath towering granite and pine forest",
    caption: "Yosemite National Park, California",
    description:
      "A road cutting through Yosemite National Park beneath towering granite formations and pine forest, placing the viewer inside one of America's most recognizable protected landscapes.",
    category: "Nature",
    span: "wide",
  },
  {
    id: "golden-gate",
    src: SITE_IMAGES.chicagoSkyline,
    alt: "Golden Gate Bridge spanning San Francisco Bay in warm daylight",
    caption: "Golden Gate Bridge, San Francisco",
    description:
      "This is an elevated, golden-hour view of the Golden Gate Bridge spanning the San Francisco Bay, looking southward from Marin County. The iconic suspension structure, defined by its massive International Orange towers and sweeping main cables, dominates the foreground and leads the eye diagonally across the strait. The San Francisco city skyline is faintly visible on the distant left horizon, while the coastline of the Presidio anchors the far end of the span. The scene is bathed in warm, low-angle sunlight against a clear gradient sky, with a faint crescent moon high above the primary tower and a single white sailboat navigating the dark blue water in the lower right.",
    category: "Cities",
    span: "wide",
  },
  {
    id: "statue-of-liberty",
    src: SITE_IMAGES.cultureFlagCrowd,
    alt: "Statue of Liberty viewed in clear daylight against a bright blue sky",
    caption: "Statue of Liberty, New York Harbor",
    description:
      "This is a clear, daylight view of the Statue of Liberty set against a bright blue sky with scattered clouds. The colossal neoclassical copper sculpture, distinguished by its bright verdigris patina, is captured wearing her iconic seven-spiked crown. She holds a gold-tinted torch aloft in her right hand and a tabula ansata tablet close to her body in her left. The figure is anchored atop the upper tier of its massive masonry pedestal, showing classical architectural detailing and the structural columns of the observation deck.",
    category: "Culture",
    span: "normal",
  },
  {
    id: "columbia",
    src: SITE_IMAGES.harvardCampus,
    alt: "Low Memorial Library on the Columbia University campus in New York City",
    caption: "Columbia University, New York",
    description:
      'This is an eye-level, daytime view of Low Memorial Library on the Columbia University campus in New York City. The prominent Neoclassical building is anchored by a central stone dome and an expansive, multi-tiered stone staircase leading to the entrance. The focal point is a massive classical portico supported by ten tall Ionic columns. The entablature clearly reads "THE LIBRARY OF COLUMBIA UNIVERSITY" below a larger historical inscription detailing its founding as King\'s College. The active plaza features classic green globe lampposts, scattered pedestrians, and parked micromobility transit near a manicured lawn and black bollards.',
    category: "Universities",
    span: "normal",
  },
  {
    id: "suburb-house",
    src: SITE_IMAGES.housing.frontPorch,
    alt: "Traditional American coastal-style suburban home with a broad green lawn",
    caption: "American Suburbia",
    description:
      "This is an exterior view of a traditional American coastal-style suburban home. The facade uses weathered cedar shake siding paired with a dark asphalt shingle roof. A prominent, elevated wraparound front porch features white structural columns, balustrades, and decorative lattice skirting. The roofline includes two symmetrical gabled dormers with dark window shutters, flanking a central arched eyebrow dormer. The property is situated on a broad, heavily manicured green lawn with mature landscaping under clear daylight.",
    category: "Quality of Life",
    span: "wide",
  },
  {
    id: "spacex-launch",
    src: SITE_IMAGES.homeSpacexLaunch,
    alt: "A SpaceX rocket lifting off in a plume of fire and smoke against the sky",
    caption: "SpaceX Launch, Florida",
    description:
      "A SpaceX rocket lifting off in a plume of fire and smoke, showing the scale, power, and technological ambition of modern American launch infrastructure.",
    category: "Innovation",
    span: "normal",
  },
] as const;

export const STATE_FACTS: Record<string, { fact: string; emoji: string }> = {
  AL: { fact: "Huntsville: Rocket City, where the Saturn V rockets that put man on the moon were designed.", emoji: "🚀" },
  AK: { fact: "Largest state: twice the size of Texas, with over 100,000 glaciers.", emoji: "🏔️" },
  AZ: { fact: "Grand Canyon: one of the seven natural wonders of the world.", emoji: "🏜️" },
  AR: { fact: "Crater of Diamonds: the world's only active diamond site open to the public.", emoji: "💎" },
  CA: { fact: "Silicon Valley: global epicenter of technology and venture capital innovation.", emoji: "🌊" },
  CO: { fact: "Highest average elevation of any US state, with 58 peaks over 14,000 feet.", emoji: "⛰️" },
  CT: { fact: "USS Nautilus: the world's first nuclear-powered submarine, built in Groton.", emoji: "⚓" },
  DE: { fact: "The First State: the very first to ratify the US Constitution on December 7, 1787.", emoji: "📜" },
  DC: { fact: "The nation's capital: home to the White House, Capitol, and monuments to liberty.", emoji: "🏛️" },
  FL: { fact: "Kennedy Space Center: launch site for Apollo missions and Space Shuttles.", emoji: "🚀" },
  GA: { fact: "Hartsfield-Jackson Atlanta Airport: the world's busiest airport by passenger traffic.", emoji: "🍑" },
  HI: { fact: "Only US state made entirely of islands, with active volcanoes and tropical rainforests.", emoji: "🌺" },
  ID: { fact: "Produces 13 billion pounds of potatoes annually, leading the nation in agriculture.", emoji: "🥔" },
  IL: { fact: "Chicago: home of the world's first steel-dome skyscraper and Sears Tower.", emoji: "🌃" },
  IN: { fact: "Indianapolis 500: the world's oldest and largest single-day sporting event.", emoji: "🏎️" },
  IA: { fact: "Produces more corn and pork than any other US state, feeding millions globally.", emoji: "🌽" },
  KS: { fact: "Geographic center of the contiguous United States, famous for wheat production.", emoji: "🌻" },
  KY: { fact: "Kentucky Derby: the legendary 'Run for the Roses' horse race in Louisville.", emoji: "🐎" },
  LA: { fact: "Birthplace of Jazz in New Orleans, blending French, Spanish, and African cultures.", emoji: "🎷" },
  ME: { fact: "Produces 90% of the nation's lobster supply and features 65 historic lighthouses.", emoji: "🦞" },
  MD: { fact: "Fort McHenry: where the Star-Spangled Banner national anthem was written.", emoji: "🦀" },
  MA: { fact: "Harvard University: founded in 1636, the oldest institution of higher learning in the US.", emoji: "📚" },
  MI: { fact: "Detroit: Motor City, birthplace of Henry Ford's assembly line and modern auto industry.", emoji: "🚗" },
  MN: { fact: "Land of 10,000 Lakes: actually contains 11,842 lakes larger than 10 acres.", emoji: "🛶" },
  MS: { fact: "Birthplace of the Blues in the Delta, which shaped rock 'n' roll and American music.", emoji: "🎸" },
  MO: { fact: "Gateway Arch in St. Louis: the world's tallest arch, standing at 630 feet.", emoji: "🏹" },
  MT: { fact: "Glacier National Park: features over 700 lakes and untouched wilderness.", emoji: "🏔️" },
  NE: { fact: "Home to the world's largest hand-planted forest (Halsey) and pioneer heritage.", emoji: "🌾" },
  NV: { fact: "Las Vegas: entertainment capital of the world, leading in hospitality and convention scale.", emoji: "🎰" },
  NH: { fact: "First-in-the-nation primary state and home to Mt. Washington, known for extreme weather.", emoji: "🏔️" },
  NJ: { fact: "Thomas Edison's Menlo Park lab, where the incandescent light bulb and phonograph were invented.", emoji: "💡" },
  NM: { fact: "Albuquerque Balloon Fiesta: the world's largest hot air balloon festival.", emoji: "🎈" },
  NY: { fact: "NYSE & Wall Street: financial capital of the world, driving global markets.", emoji: "🗽" },
  NC: { fact: "Kitty Hawk: site of the Wright Brothers' historic first powered flight in 1903.", emoji: "✈️" },
  ND: { fact: "Theodore Roosevelt National Park: where the Badlands and wild bison meet.", emoji: "🦬" },
  OH: { fact: "Birthplace of aviation pioneers (Wright Brothers) and 25 astronauts, including Neil Armstrong.", emoji: "🧑‍🚀" },
  OK: { fact: "Center of the American cowboy culture and home to the National Cowboy Museum.", emoji: "🌪️" },
  OR: { fact: "Crater Lake: the deepest lake in America, filled entirely by direct rain and snow.", emoji: "🌲" },
  PA: { fact: "Independence Hall in Philadelphia: where both the Declaration and Constitution were adopted.", emoji: "🔔" },
  RI: { fact: "Sailing Capital of the World, featuring Newport Mansions and over 400 miles of coastline.", emoji: "⛵" },
  SC: { fact: "Charleston: historic port city famous for antebellum architecture and civil war history.", emoji: "🌴" },
  SD: { fact: "Mount Rushmore: monumental sculpture depicting four iconic US Presidents.", emoji: "⛰️" },
  TN: { fact: "Nashville: Music City USA, the undisputed world capital of country music.", emoji: "🎸" },
  TX: { fact: "Second-largest state by GDP ($2.6T+) and home to NASA Johnson Space Center.", emoji: "🤠" },
  UT: { fact: "The Mighty 5 National Parks: famous for red rock arches and world-class skiing.", emoji: "🎿" },
  VT: { fact: "Largest producer of maple syrup in the US and pioneer in environmental protection.", emoji: "🍁" },
  VA: { fact: "Mother of Presidents: birthplace of 8 US Presidents, including George Washington.", emoji: "🏛️" },
  WA: { fact: "The Evergreen State: leading exporter of agricultural products and enterprise software.", emoji: "🌲" },
  WV: { fact: "New River Gorge Bridge: one of the tallest steel arch bridges in the Western hemisphere.", emoji: "🌉" },
  WI: { fact: "America's Dairyland: produces over 3.4 billion pounds of cheese annually.", emoji: "🧀" },
  WY: { fact: "Yellowstone & Grand Teton: national parks that protect America's grandest wildlife.", emoji: "🦬" },
};
