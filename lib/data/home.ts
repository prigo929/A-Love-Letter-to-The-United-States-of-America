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

import { SITE_IMAGES } from "@/lib/site-images";
import type { ContentBlockItem } from "@/types/content.types";

// Small facts bar near the top of the homepage.
// Change these values if you want to update the animated counters.
export const KEY_STATS = [
  {
    id: "gdp",
    prefix: "#",
    value: 1,
    suffix: " Economy",
    label: "$28.8 Trillion GDP",
    source: "World Bank 2024",
    color: "gold" as const,
  },
  {
    id: "population",
    value: 335,
    suffix: "M+",
    label: "Americans",
    description: "335 million stories",
    source: "US Census Bureau",
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
    value: 400,
    suffix: "+",
    label: "Nobel Prizes",
    description: "More than any nation",
    source: "Nobel Foundation",
    color: "white" as const,
  },
  {
    id: "military",
    prefix: "#",
    value: 1,
    label: "Military Power",
    description: "$886B defense budget",
    source: "SIPRI 2024",
    color: "gold" as const,
  },
] as const;

export const HOME_COPY = {
  sectionGridSummary:
    "From its $28.8 trillion economy to 63 national parks. From the Constitution to the semiconductor. Every chapter of America's extraordinary story.",
  statSources:
    "Sources: World Bank, SIPRI, NPS, Nobel Foundation, DoD — 2024 data",
} as const;

// Placeholder copy for the economy landing summary used on the homepage.
export const ECONOMY_PAGE_COPY = {
  heroValue: "$28.8T",
  description:
    "The United States economy — $28.8 trillion, the largest in human history.",
  body: "Phase 3 — Economy section — coming soon. Full charts, data, and analysis of America's unrivaled economic dominance.",
} as const;

// Four long-form homepage feature blocks used by WhyAmericaSection.
// To change the image in one block, swap the `imageSrc` entry to another value
// from SITE_IMAGES.
export const WHY_AMERICA_BLOCKS: ContentBlockItem[] = [
  {
    heading: "The Land of the Free",
    subheading: "250 Years of Unbroken Constitutional Government",
    paragraphs: [
      "No nation in history has maintained the same constitutional framework for as long as the United States — 250 years and counting. While empires fell, republics collapsed, and constitutions were rewritten across the globe, America's founding document endured through civil war, world wars, economic depression, and social upheaval.",
      "The First Amendment alone is without parallel: no nation on Earth extends freedom of speech as broadly as the United States. The Bill of Rights was not a gift from government — it was a recognition of rights that existed before government. That distinction changes everything.",
    ],
    imageSrc: SITE_IMAGES.constitutionDocument,
    imageAlt:
      "The United States Constitution — the longest-surviving written national constitution in history",
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
        fact: "27 Amendments — proof the system can evolve",
        source: "National Archives",
        color: "blue",
      },
    ],
  },
  {
    heading: "The Engine of Innovation",
    subheading: "Silicon Valley to Cape Canaveral — America Invents the Future",
    paragraphs: [
      "The telephone. The airplane. The transistor. The microchip. The internet. The iPhone. The mRNA vaccine. Artificial intelligence. Every technology that defines modern civilization traces its lineage to American laboratories, garages, and university campuses.",
      "America receives approximately 50% of all global venture capital investment. It is home to 7 of the world's top 10 universities. Its researchers have won more Nobel Prizes than the next three nations combined. This is not coincidence — it is the fruit of a system that rewards risk-taking, tolerates failure, and celebrates the individual.",
    ],
    imageSrc: SITE_IMAGES.homeSiliconValley,
    imageAlt:
      "Microchip circuit board — symbol of American technological dominance",
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
        fact: "400+ Nobel Prizes — more than any nation",
        source: "Nobel Foundation",
        color: "red",
      },
      {
        id: "tech-3",
        fact: "650+ unicorn companies — 50%+ of the global total",
        source: "Pitchbook 2024",
        color: "blue",
      },
    ],
  },
  {
    heading: "America the Beautiful",
    subheading: "From the Arctic Tundra to the Tropical Everglades",
    paragraphs: [
      "No country on Earth possesses such extraordinary diversity of natural landscapes within a single border. The United States spans Arctic tundra in Alaska, tropical rainforests in Hawaii, towering granite walls in Yosemite, geothermal wonders in Yellowstone, the world's largest canyon, and the Great Lakes — containing 21% of Earth's entire surface freshwater.",
      "Theodore Roosevelt called the preservation of this land \"the greatest gift a generation can give to those who come after.\" America answered that call with the world's first national park system — 63 parks protecting 85 million acres, more than most countries' entire landmass.",
    ],
    imageSrc: SITE_IMAGES.grandTeton,
    imageAlt:
      "Grand Teton National Park — a crown jewel of the American national park system",
    imagePosition: "right",
    facts: [
      {
        id: "nat-1",
        fact: "63 National Parks — 85 million acres protected",
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
      "The United States maintains 11 aircraft carrier strike groups — the rest of the world combined has roughly four. Its defense budget of $886 billion exceeds the next ten nations' budgets combined. It operates bases in more than 80 countries, maintains a nuclear triad, and fields the most technologically advanced military force in history.",
      "But American military power is not merely about hardware. It is about what that power has preserved: the post-1945 rules-based international order, the freedom of navigation that enables global trade, and the security umbrella under which democracies across Europe, Asia, and the Pacific have flourished for eight decades.",
    ],
    imageSrc: SITE_IMAGES.homeAirForcePlane,
    imageAlt:
      "US Air Force cargo plane on the tarmac — symbol of American military reach and readiness",
    imagePosition: "left",
    facts: [
      {
        id: "mil-1",
        fact: "11 carrier strike groups — more than the rest of the world",
        source: "IISS 2024",
        color: "gold",
      },
      {
        id: "mil-2",
        fact: "$886 billion defense budget",
        source: "SIPRI 2024",
        color: "red",
      },
      {
        id: "mil-3",
        fact: "800+ bases in 80+ countries — truly global reach",
        source: "DoD",
        color: "blue",
      },
    ],
  },
];

export const VIDEO_PREVIEWS = [
  {
    id: "landscape",
    title: "The American Landscape",
    description:
      "From the Rocky Mountains to the Florida Everglades — a cinematic journey through America's unrivaled natural wonders.",
    youtubeId: null,
    thumbnailSrc: SITE_IMAGES.homeGrandCanyon,
    thumbnailAlt: "Grand Canyon at sunrise — the American landscape",
    duration: "8:42",
    category: "Nature",
  },
  {
    id: "innovation",
    title: "Built by Innovation",
    description:
      "From Edison's lab to Silicon Valley — the story of how American ingenuity rewired the world.",
    youtubeId: null,
    thumbnailSrc: SITE_IMAGES.homeSiliconValley,
    thumbnailAlt: "Silicon Valley technology — American innovation",
    duration: "12:18",
    category: "Innovation",
  },
  {
    id: "military",
    title: "Defender of Freedom",
    description:
      "The story of the most powerful military in history — and the peace it has kept for 80 years.",
    youtubeId: null,
    thumbnailSrc: SITE_IMAGES.homeAirForcePlane,
    thumbnailAlt: "US Air Force cargo plane — Defender of Freedom",
    duration: "15:05",
    category: "Military",
  },
] as const;

// These three datasets power the mini charts in DataTeaserSection.
export const GDP_COMPARISON_DATA = [
  { country: "USA", value: 28.8, isUSA: true },
  { country: "China", value: 17.7, isUSA: false },
  { country: "Germany", value: 4.5, isUSA: false },
  { country: "Japan", value: 4.2, isUSA: false },
  { country: "India", value: 3.7, isUSA: false },
  { country: "UK", value: 3.1, isUSA: false },
  { country: "France", value: 3.0, isUSA: false },
] as const;

export const MILITARY_SPENDING_DATA = [
  { country: "USA", value: 886, isUSA: true },
  { country: "China", value: 296, isUSA: false },
  { country: "Russia", value: 109, isUSA: false },
  { country: "India", value: 84, isUSA: false },
  { country: "UK", value: 75, isUSA: false },
  { country: "Germany", value: 66, isUSA: false },
  { country: "France", value: 61, isUSA: false },
] as const;

export const NOBEL_PRIZES_DATA = [
  { country: "USA", value: 411, isUSA: true },
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
// - `category` powers the small category pills
// - `span` changes the card shape in the layout
export const GALLERY_PREVIEW_IMAGES = [
  {
    id: "yosemite",
    src: SITE_IMAGES.grandTeton,
    alt: "Grand Teton National Park — jagged peaks rising over the American West",
    caption: "Grand Teton National Park, Wyoming",
    category: "National Parks",
    span: "tall",
  },
  {
    id: "nyc",
    src: SITE_IMAGES.homeNycSkyline,
    alt: "New York City skyline at golden hour seen from above",
    caption: "Manhattan, New York City",
    category: "Cities",
    span: "wide",
  },
  {
    id: "air-force",
    src: SITE_IMAGES.homeAirForcePlane,
    alt: "US Air Force cargo plane on the tarmac — American airpower and rapid deployment",
    caption: "US Air Force Mobility Command",
    category: "Military",
    span: "normal",
  },
  {
    id: "grand-canyon",
    src: SITE_IMAGES.homeGrandCanyon,
    alt: "Grand Canyon at sunrise, illuminated in deep orange and red",
    caption: "Grand Canyon, Arizona",
    category: "National Parks",
    span: "normal",
  },
  {
    id: "silicon-valley",
    src: SITE_IMAGES.siliconValleyOffice,
    alt: "Modern tech office interior — Silicon Valley innovation hub",
    caption: "Silicon Valley, California",
    category: "Innovation",
    span: "wide",
  },
  {
    id: "yellowstone",
    src: SITE_IMAGES.yellowstonePrismatic,
    alt: "Yellowstone Grand Prismatic Spring — vivid geothermal colors",
    caption: "Yellowstone National Park, Wyoming",
    category: "National Parks",
    span: "tall",
  },
  {
    id: "chicago",
    src: SITE_IMAGES.chicagoSkyline,
    alt: "Chicago skyline at night reflected in Lake Michigan",
    caption: "Chicago, Illinois",
    category: "Cities",
    span: "normal",
  },
  {
    id: "harvard",
    src: SITE_IMAGES.harvardCampus,
    alt: "Harvard University campus in autumn — the most famous university on Earth",
    caption: "Harvard University, Cambridge",
    category: "Universities",
    span: "normal",
  },
] as const;

export const STATE_FACTS: Record<string, { fact: string; emoji: string }> = {
  CA: {
    fact: "5th largest economy in the world if it were a country",
    emoji: "🌊",
  },
  TX: {
    fact: "Largest oil producer in the US — 43% of domestic output",
    emoji: "🤠",
  },
  NY: {
    fact: "Home to the NYSE — the world's largest stock exchange",
    emoji: "🗽",
  },
  FL: {
    fact: "NASA Kennedy Space Center — America reaches for the stars",
    emoji: "🚀",
  },
  WA: { fact: "Birthplace of Boeing, Microsoft, and Amazon", emoji: "💻" },
  AK: {
    fact: "Largest state — twice the size of Texas, 100,000 glaciers",
    emoji: "🏔️",
  },
  HI: {
    fact: "Only US state with tropical rainforest and active volcanoes",
    emoji: "🌺",
  },
  IL: {
    fact: "Chicago — America's third city and financial hub of the Midwest",
    emoji: "🌃",
  },
  PA: {
    fact: "Birthplace of American democracy — Constitution signed in Philadelphia",
    emoji: "🔔",
  },
  MA: {
    fact: "Home to Harvard, MIT, and the birth of the American Revolution",
    emoji: "📚",
  },
  VA: {
    fact: "Home to the Pentagon — nerve center of the world's most powerful military",
    emoji: "⭐",
  },
  NV: {
    fact: "Las Vegas — entertainment capital of the world, $70B+ annual GDP",
    emoji: "🎰",
  },
  CO: {
    fact: "53 mountain peaks above 14,000 feet — more than any other state",
    emoji: "⛰️",
  },
  AZ: {
    fact: "Grand Canyon — the most visited natural wonder in the United States",
    emoji: "🏜️",
  },
  WY: {
    fact: "Yellowstone — the world's first national park, established 1872",
    emoji: "🦬",
  },
};
