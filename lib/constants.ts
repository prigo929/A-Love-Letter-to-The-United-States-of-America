// ─── App Constants ────────────────────────────────────────────────────────────
// Single source of truth for:
// - site metadata (name, description, URL)
// - reusable colors
// - top navigation structure
// - hero carousel images
//
// Beginners: if you want to change text in the header menu, start in
// NAV_SECTIONS below. If you want to change the home page hero slideshow,
// start in HERO_IMAGES at the bottom of this file.

import { SITE_IMAGES } from "@/lib/site-images";

// ─── Colors (mirrors tailwind.config.ts) ─────────────────────────────────────
export const COLORS = {
  gloryRed: "#B22234",
  gloryRedDark: "#8B1A26",
  gloryRedLight: "#D4404F",
  gloryBlue: "#3C3B6E",
  gloryBlueDark: "#2a2950",
  gloryBlueLight: "#5554A0",
  gloryGold: "#FFD700",
  gloryGoldDark: "#CC9900",
  navyDark: "#0d1117",
  navyMid: "#1a1f3a",
  navyLight: "#252b4a",
  parchment: "#F5F0E8",
  parchmentDark: "#E8E0CC",
} as const;

// ─── Site Metadata ────────────────────────────────────────────────────────────
export const SITE = {
  name: "America: The Greatest Nation",
  tagline: "The Greatest Nation in the History of Human Civilization",
  description:
    "A cinematic celebration of the United States of America — its history, achievements, natural wonders, and enduring promise.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://americagreatest.com",
  og: "/images/og-default.jpg",
  twitter: "@AmericaGreatest",
  founded: 1776,
} as const;

// ─── Navigation Structure ─────────────────────────────────────────────────────
// Powers both the header mega-menu and the sitemap page.
//
// Each section card in the navigation is data-driven:
// - `title` is the visible section name
// - `href` is where it links
// - `imageSrc` is the image shown in the menu card
// - `items` are the submenu links

export const NAV_SECTIONS = [
  {
    title: "Economy",
    href: "/economy",
    description: "The engine of the world — $28.8T GDP and counting",
    imageSrc: SITE_IMAGES.economyNYSEUpsideDown,
    badge: "#1 Economy",
    items: [
      {
        label: "GDP & Scale",
        href: "/economy/gdp-growth",
        description: "The largest economy on Earth",
      },
      {
        label: "Capital Markets",
        href: "/economy/capital-markets",
        description: "NYSE, NASDAQ & Wall Street",
      },
      {
        label: "Venture Capital",
        href: "/economy/startups-venture-capital",
        description: "50% of global VC flows here",
      },
      {
        label: "Dollar Dominance",
        href: "/economy/dollar-dominance",
        description: "The world's reserve currency",
      },
      {
        label: "Trade & Exports",
        href: "/economy/trade-and-exports",
        description: "America powers global commerce",
      },
    ],
  },
  {
    title: "Nature",
    href: "/nature",
    description: "From the Arctic to the tropics — unrivaled natural beauty",
    imageSrc: SITE_IMAGES.grandTeton,
    badge: "63 National Parks",
    items: [
      {
        label: "National Parks",
        href: "/nature/national-parks",
        description: "63 parks across 85 million acres",
      },
      {
        label: "Alaska",
        href: "/nature/alaska",
        description: "The last frontier",
      },
      {
        label: "Rocky Mountains",
        href: "/nature/rockies",
        description: "53 peaks over 14,000 feet",
      },
      {
        label: "Grand Canyon",
        href: "/nature/grand-canyon",
        description: "One mile deep, 277 miles long",
      },
      {
        label: "Yellowstone",
        href: "/nature/yellowstone",
        description: "The world's first national park",
      },
      {
        label: "Great Lakes",
        href: "/nature/great-lakes",
        description: "21% of Earth's fresh surface water",
      },
    ],
  },
  {
    title: "Military",
    href: "/military",
    description: "The most powerful military in the history of civilization",
    imageSrc: SITE_IMAGES.homeAirForcePlane,
    badge: "$886B Budget",
    items: [
      {
        label: "Overview",
        href: "/military",
        description: "$886B budget, 1.3M active duty",
      },
      {
        label: "US Navy",
        href: "/military/navy",
        description: "11 carrier strike groups",
      },
      {
        label: "US Air Force",
        href: "/military/air-force",
        description: "Most advanced in history",
      },
      {
        label: "Space Force",
        href: "/military/space-force",
        description: "The world's first space branch",
      },
      {
        label: "Global Bases",
        href: "/military/global-bases",
        description: "800+ bases in 80+ countries",
      },
      {
        label: "Intelligence",
        href: "/military/intelligence",
        description: "CIA, NSA, DIA — unmatched reach",
      },
    ],
  },
  {
    title: "Constitution",
    href: "/constitution",
    description: "250 years of unbroken democratic government",
    imageSrc: SITE_IMAGES.constitutionDocument,
    badge: "Est. 1776",
    items: [
      {
        label: "The Foundation",
        href: "/constitution",
        description: "1776 — the miracle in Philadelphia",
      },
      {
        label: "Bill of Rights",
        href: "/constitution/bill-of-rights",
        description: "The first 10 amendments",
      },
      {
        label: "First Amendment",
        href: "/constitution/first-amendment",
        description: "Broadest free speech on Earth",
      },
      {
        label: "Second Amendment",
        href: "/constitution/second-amendment",
        description: "The right to bear arms",
      },
      {
        label: "Federalism",
        href: "/constitution/federalism",
        description: "Laboratories of democracy",
      },
      {
        label: "Separation of Powers",
        href: "/constitution/separation-of-powers",
        description: "Tyranny made nearly impossible",
      },
    ],
  },
  {
    title: "Culture",
    href: "/culture",
    description: "America didn't just build a nation — it built global culture",
    imageSrc: SITE_IMAGES.cultureFlagCrowd,
    badge: "Global Culture",
    items: [
      {
        label: "Overview",
        href: "/culture",
        description: "The culture hub and soft power thesis",
      },
      {
        label: "The American High School",
        href: "/culture/the-american-high-school",
        description: "An anthropological look at the teen experience",
      },
      {
        label: "American Aesthetics",
        href: "/culture/american-aesthetics",
        description: "A visual gallery of recurring American interiors",
      },
      {
        label: "Soft Power Thesis",
        href: "/culture#intro",
        description: "The core argument for America's cultural reach",
      },
      {
        label: "Melting Pot",
        href: "/culture#feature",
        description: "Placeholder for the future WebGL culture feature",
      },
    ],
  },
  {
    title: "Innovation",
    href: "/innovation",
    description: "The internet, the iPhone, AI — all made in America",
    imageSrc: SITE_IMAGES.homeSiliconValley,
    badge: "Silicon Valley",
    items: [
      {
        label: "The Internet",
        href: "/innovation/internet-history",
        description: "ARPANET to the World Wide Web",
      },
      {
        label: "AI & Tech",
        href: "/innovation/ai-and-tech",
        description: "OpenAI, Google, Anthropic lead the way",
      },
      {
        label: "Smartphones",
        href: "/innovation/smartphones",
        description: "iPhone changed the world",
      },
      {
        label: "Cloud Computing",
        href: "/innovation/cloud-computing",
        description: "AWS powers the internet",
      },
      {
        label: "Space Technology",
        href: "/innovation/space-technology",
        description: "NASA to SpaceX",
      },
      {
        label: "Gaming",
        href: "/innovation/gaming",
        description: "Atari to Epic Games",
      },
    ],
  },
  {
    title: "Science",
    href: "/science",
    description: "They built the modern world, one invention at a time",
    imageSrc: SITE_IMAGES.scienceLab,
    badge: "400+ Nobel Prizes",
    items: [
      {
        label: "Inventions Pre-1890",
        href: "/science/inventions-pre-1890",
        description: "Telegraph, lightbulb, telephone",
      },
      {
        label: "Inventions 1890-1945",
        href: "/science/inventions-1890-1945",
        description: "Airplane, assembly line, nuclear fission",
      },
      {
        label: "Post-War Miracles",
        href: "/science/inventions-post-1991",
        description: "Transistor, microchip, internet",
      },
      {
        label: "Medicine & Biotech",
        href: "/science/medicine-and-biotech",
        description: "NIH, vaccines, cancer breakthroughs",
      },
    ],
  },
  {
    title: "Universities",
    href: "/universities",
    description: "7 of the top 10 universities in the world are American",
    imageSrc: SITE_IMAGES.harvardCampus,
    badge: "Top of the World",
    items: [
      {
        label: "Ivy League",
        href: "/universities/ivy-league",
        description: "Harvard, Yale, Princeton & more",
      },
      {
        label: "STEM Powerhouses",
        href: "/universities/stem-powerhouses",
        description: "MIT, Stanford, Caltech",
      },
      {
        label: "Business Schools",
        href: "/universities/business-schools",
        description: "HBS, Wharton, Booth",
      },
      {
        label: "Public Research",
        href: "/universities/public-research-universities",
        description: "Berkeley, Michigan, UT Austin",
      },
    ],
  },
  {
    title: "Quality of Life",
    href: "/quality-of-life",
    description: "The highest standard of living for the most people",
    imageSrc: SITE_IMAGES.qualityOfLifeHouse,
    badge: "American Dream",
    items: [
      {
        label: "Overview",
        href: "/quality-of-life",
        description: "Quality of life section landing page",
      },
      {
        label: "Stat Grid",
        href: "/quality-of-life#stats",
        description: "PPP income, home size, cars, and healthcare",
      },
      {
        label: "Democratized Luxury",
        href: "/quality-of-life#luxury",
        description: "Split-layout section on abundance and access",
      },
      {
        label: "Comparison Chart",
        href: "/quality-of-life#comparison",
        description: "Placeholder wrapper for the D3 comparison chart",
      },
    ],
  },
  {
    title: "Global Leadership",
    href: "/global-leadership",
    description: "The indispensable nation — leading the free world since 1945",
    imageSrc: SITE_IMAGES.globalLeadership,
    badge: "Free World Leader",
    items: [
      {
        label: "NATO Alliance",
        href: "/global-leadership/nato",
        description: "Defender of the free world",
      },
      {
        label: "Dollar as Reserve",
        href: "/global-leadership/dollar-as-reserve",
        description: "60%+ of global reserves",
      },
      {
        label: "Soft Power",
        href: "/global-leadership/soft-power",
        description: "Hollywood to Harvard",
      },
      {
        label: "UN & Institutions",
        href: "/global-leadership/un",
        description: "Founder of the postwar order",
      },
    ],
  },
] as const;

// These images rotate in the full-screen homepage hero.
// To swap one, replace the `src` value with another SITE_IMAGES entry and
// update the `alt` text so it still describes the new photo accurately.
export const HERO_IMAGES = [
  {
    id: "grand-canyon",
    src: SITE_IMAGES.homeGrandCanyon,
    alt: "Grand Canyon at sunrise, illuminated in deep orange and gold",
  },
  {
    id: "nyc-skyline",
    src: SITE_IMAGES.homeNycSkyline,
    alt: "New York City skyline at dusk, Manhattan glittering with lights",
  },
  {
    id: "aircraft-carrier",
    src: SITE_IMAGES.homeAirForcePlane,
    alt: "US Air Force cargo plane on the tarmac, ready for rapid deployment",
  },
  {
    id: "silicon-valley",
    src: SITE_IMAGES.homeSiliconValley,
    alt: "Silicon Valley tech campus — the innovation capital of Earth",
  },
  {
    id: "wheat-fields",
    src: SITE_IMAGES.homeWheatFields,
    alt: "Golden wheat fields at sunset — America's vast agricultural heartland",
  },
] as const;
