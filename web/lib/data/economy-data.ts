// ─── Economy Section Data ─────────────────────────────────────────────────────
// This file serves as the "Financial Source of Truth" for the entire platform.
// It centralizes all static statistics, historical trends, and economic facts.
//
// Architectural Principles:
// - Decoupling: UI components should NEVER hardcode numbers. They import from here.
// - Bilingual Parity: Every data set must support English and Romanian.
// - Static Performance: All data is exported as immutable constants for zero runtime overhead.
//
// Beginner guide:
// - If you want to change economy page numbers (e.g. 2026 GDP), edit them here.
// - If you want to swap economy images, use SITE_IMAGES keys here.
// - If you want to change chart titles/layout, edit the React page/component.

import { SITE_IMAGES } from "@/lib/site-images";
import type { Locale } from "@/lib/i18n/config";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GdpSectorPoint {
  sector: string;
  sectorRo: string;
  value: number; // in trillions USD
  percentage: number;
  highlight?: boolean;
}

export interface GdpDivergencePoint {
  year: number;
  us: number; // Real GDP Index (2010=100)
  g7: number; // G7 ex-US Real GDP Index (2010=100)
}

export interface GdpExpenditurePoint {
  component: string;
  componentRo: string;
  value: number; // in trillions USD
  percentage: number;
  description: string;
  descriptionRo: string;
  color: string;
}

export interface GdpGlobalHistoryPoint {
  year: number;
  us: number;
  china: number;
  japan: number;
  germany: number;
}

export interface GdpLaborComparisonPoint {
  sector: string;
  sectorRo: string;
  gdpShare: number;
  laborShare: number;
  jobsCount: number;
}

export interface GdpDataPoint {
  country: string;
  gdp: number; // USD Trillions
  flag: string;
  highlight?: boolean;
}

export interface GdpPerCapitaPoint {
  country: string;
  gdpPerCapita: number; // USD thousands
  flag: string;
  highlight?: boolean;
}

export interface SP500DataPoint {
  year: number;
  value: number; // Index value
}

export interface VCDataPoint {
  country: string;
  investment: number; // USD Billions
  percentage: number; // % of global
  highlight?: boolean;
}

export interface UnicornDataPoint {
  country: string;
  unicorns: number;
  percentage: number;
  highlight?: boolean;
}

export interface DollarReservePoint {
  currency: string;
  percentage: number;
  color: string;
}

export interface MarketCapPoint {
  exchange: string;
  marketCap: number; // USD Trillions
  country: string;
  highlight?: boolean;
}

export interface VcFirm {
  name: string;
  aum: string;
  city: string;
  portfolio: string;
}

export interface ExtendedFact {
  id: string;
  fact: string;
  detail: string;
  source: string;
  color: "gold" | "red" | "blue";
}

export interface TradeDataPoint {
  category: string;
  exports: number; // USD Billions
}

export interface EconomyStat {
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

export interface EconomyFact {
  id: string;
  fact: string;
  detail: string;
  source: string;
  color: "gold" | "red" | "blue";
}

export interface StartupEcosystem {
  city: string;
  state: string;
  nickname: string;
  unicorns: number;
  vcFunding: string;
  keyCompanies: string[];
  lat: number;
  lng: number;
}

export interface FoundingTimeline {
  year: number;
  company: string;
  founder: string;
  currentValuation: string;
  industry: string;
}

// ─── GDP Comparison Data ──────────────────────────────────────────────────────

// Vintage recorded here, at the source of truth, so charts can't drift from it.
// Verified against the IMF World Economic Outlook 2026 projections:
// US 32.38 · China 20.85 · Germany 5.45 · Japan 4.38 · India 4.15 · UK 4.26 ·
// France 3.60 · Brazil 2.64 (trillions USD). 2026 is a projection, not an actual.
export const GDP_SERIES_META = {
  year: 2026,
  projected: true,
  source: "IMF World Economic Outlook",
  sourceHref: "https://www.imf.org/en/publications/weo",
} as const;

export const GDP_COMPARISON: GdpDataPoint[] = [
  { country: "United States", gdp: 32.4, flag: "🇺🇸", highlight: true },
  { country: "China", gdp: 20.8, flag: "🇨🇳" },
  { country: "Germany", gdp: 5.4, flag: "🇩🇪" },
  { country: "Japan", gdp: 4.4, flag: "🇯🇵" },
  { country: "United Kingdom", gdp: 4.3, flag: "🇬🇧" },
  { country: "India", gdp: 4.2, flag: "🇮🇳" },
  { country: "France", gdp: 3.6, flag: "🇫🇷" },
  { country: "Brazil", gdp: 2.6, flag: "🇧🇷" },
];

export const GDP_PER_CAPITA: GdpPerCapitaPoint[] = [
  // Values here are in thousands of USD per person.
  // Example: 94.4 means roughly $94,400.
  { country: "United States", gdpPerCapita: 94.4, flag: "🇺🇸", highlight: true },
  { country: "Germany", gdpPerCapita: 65.3, flag: "🇩🇪" },
  { country: "United Kingdom", gdpPerCapita: 61.1, flag: "🇬🇧" },
  { country: "France", gdpPerCapita: 52.1, flag: "🇫🇷" },
  { country: "Japan", gdpPerCapita: 35.7, flag: "🇯🇵" },
  { country: "China", gdpPerCapita: 14.9, flag: "🇨🇳" },
  { country: "Brazil", gdpPerCapita: 12.3, flag: "🇧🇷" },
  { country: "India", gdpPerCapita: 2.8, flag: "🇮🇳" },
];

// ─── S&P 500 Historical Data (1980–2026) ──────────────────────────────────────

export const SP500_HISTORY: SP500DataPoint[] = [
  { year: 1980, value: 136 },
  { year: 1985, value: 211 },
  { year: 1990, value: 354 },
  { year: 1995, value: 615 },
  { year: 2000, value: 1498 },
  { year: 2002, value: 879 }, // Dot-com bust
  { year: 2005, value: 1248 },
  { year: 2007, value: 1477 },
  { year: 2009, value: 757 }, // Financial crisis
  { year: 2012, value: 1426 },
  { year: 2015, value: 2044 },
  { year: 2017, value: 2674 },
  { year: 2019, value: 3231 },
  { year: 2020, value: 3756 },
  { year: 2021, value: 4766 },
  { year: 2022, value: 3840 },
  { year: 2023, value: 4742 },
  { year: 2024, value: 5460 },
  { year: 2025, value: 6500 },
  { year: 2026, value: 7500 },
];

// ─── Venture Capital Data ─────────────────────────────────────────────────────

export const VC_BY_COUNTRY: VCDataPoint[] = [
  {
    country: "United States",
    investment: 210,
    percentage: 65,
    highlight: true,
  },
  { country: "China", investment: 45, percentage: 14 },
  { country: "United Kingdom", investment: 19, percentage: 6 },
  { country: "India", investment: 16, percentage: 5 },
  { country: "Germany", investment: 10, percentage: 3 },
  { country: "France", investment: 8, percentage: 2.5 },
  { country: "Rest of World", investment: 15, percentage: 4.5 },
];

export const UNICORNS_BY_COUNTRY: UnicornDataPoint[] = [
  { country: "United States", unicorns: 1172, percentage: 65, highlight: true },
  { country: "China", unicorns: 168, percentage: 13 },
  { country: "India", unicorns: 70, percentage: 5.5 },
  { country: "United Kingdom", unicorns: 52, percentage: 4 },
  { country: "Germany", unicorns: 32, percentage: 2.5 },
  { country: "France", unicorns: 27, percentage: 2 },
  { country: "Rest of World", unicorns: 262, percentage: 21 },
];

// ─── Dollar Reserve Data (IMF COFER 2026) ─────────────────────────────────────

export const DOLLAR_RESERVE_SHARE: DollarReservePoint[] = [
  { currency: "US Dollar (USD)", percentage: 57.4, color: "#B22234" },
  { currency: "Euro (EUR)", percentage: 20.0, color: "#3C3B6E" },
  { currency: "Japanese Yen", percentage: 5.8, color: "#4B5563" },
  { currency: "British Pound", percentage: 4.8, color: "#6B7280" },
  { currency: "Chinese Renminbi", percentage: 2.3, color: "#9CA3AF" },
  { currency: "Other", percentage: 9.7, color: "#374151" },
];

// ─── Stock Market Cap Data ────────────────────────────────────────────────────

export const MARKET_CAP_BY_EXCHANGE: MarketCapPoint[] = [
  { exchange: "NYSE", marketCap: 33.2, country: "🇺🇸 USA", highlight: true },
  { exchange: "NASDAQ", marketCap: 35.8, country: "🇺🇸 USA", highlight: true },
  { exchange: "Shanghai", marketCap: 7.3, country: "🇨🇳 China" },
  { exchange: "Euronext", marketCap: 6.8, country: "🇪🇺 Europe" },
  { exchange: "Tokyo (JPX)", marketCap: 6.5, country: "🇯🇵 Japan" },
  { exchange: "Hong Kong", marketCap: 4.7, country: "🇭🇰 HK" },
  { exchange: "London", marketCap: 3.2, country: "🇬🇧 UK" },
];

// ─── US Trade Exports ─────────────────────────────────────────────────────────

export const US_EXPORT_CATEGORIES: TradeDataPoint[] = [
  { category: "Aircraft & Parts", exports: 132 },
  { category: "Petroleum Products", exports: 119 },
  { category: "Semiconductors", exports: 87 },
  { category: "Medical Devices", exports: 74 },
  { category: "Automobiles", exports: 65 },
  { category: "Pharmaceuticals", exports: 63 },
  { category: "Agricultural Products", exports: 58 },
  { category: "Industrial Machinery", exports: 52 },
];

// ─── Economy Hero Stats ───────────────────────────────────────────────────────
// These cards appear near the top of /economy.
// `suffix` controls the unit label shown next to the number.

export const ECONOMY_HERO_STATS: EconomyStat[] = [
  {
    id: "gdp",
    value: 32.4,
    suffix: "T",
    prefix: "$",
    decimals: 1,
    label: "GDP (2026 Est.)",
    description: "Largest economy in human history",
    source: "IMF 2026 Projection",
    color: "gold",
  },
  {
    id: "market-cap",
    value: 69.0,
    suffix: "T+",
    prefix: "$",
    label: "US Stock Markets",
    description: "NYSE + NASDAQ combined",
    source: "WFE 2026",
    color: "gold",
  },
  {
    id: "reserves",
    value: 57.4,
    suffix: "%",
    label: "Global Reserves",
    description: "Share of world FX reserves in USD",
    source: "IMF 2026",
    color: "white",
  },
  {
    id: "vc",
    value: 65,
    suffix: "%",
    label: "Global VC",
    description: "America's share of world VC",
    source: "NVCA 2026",
    color: "white",
  },
];

// ─── Economy Fact Cards ───────────────────────────────────────────────────────

export const GDP_FACTS: EconomyFact[] = [
  {
    id: "gdp-california",
    fact: "California alone would be the 4th largest economy on Earth",
    detail:
      "At $4.25 trillion, California has overtaken Japan, Germany, and India. A single US state produces more than almost every nation.",
    source: "BEA 2026",
    color: "gold",
  },
  {
    id: "gdp-100-years",
    fact: "Largest economy for 100+ consecutive years",
    detail:
      "The United States has been the world's largest economy since the late 1800s — an unbroken reign of over a century.",
    source: "IMF Historical Data",
    color: "red",
  },
  {
    id: "gdp-consumer",
    fact: "US consumer spending alone ≈ Germany's entire GDP",
    detail:
      "American household consumption is approximately $19 trillion — larger than the GDP of every nation except the US itself.",
    source: "BEA & World Bank 2026",
    color: "blue",
  },
  {
    id: "gdp-companies",
    fact: "12 of the world's 20 most valuable companies are American",
    detail:
      "Apple, Microsoft, NVIDIA, Alphabet, Amazon, Meta, Berkshire Hathaway — the global corporate elite is overwhelmingly American.",
    source: "Forbes Global 2000, 2026",
    color: "gold",
  },
];

export const CAPITAL_MARKETS_FACTS: EconomyFact[] = [
  {
    id: "nyse-age",
    fact: "The NYSE has operated continuously since 1792",
    detail:
      "The New York Stock Exchange is the largest stock exchange on Earth by market capitalization — $33+ trillion — and has been the world's financial anchor for over 230 years.",
    source: "NYSE / WFE 2026",
    color: "gold",
  },
  {
    id: "treasury-risk-free",
    fact: "US Treasuries are the world's risk-free rate benchmark",
    detail:
      "Every financial model on Earth uses US Treasury yields as the baseline for risk-free returns. The US bond market is $27 trillion — the deepest, most liquid market in history.",
    source: "SIFMA 2026",
    color: "red",
  },
  {
    id: "nasdaq-tech",
    fact: "NASDAQ lists the most valuable tech companies in history",
    detail:
      "Apple, Microsoft, NVIDIA, Alphabet, Amazon, Meta — all listed on a single American exchange. The NASDAQ Composite has returned over 4,500% since 1985.",
    source: "NASDAQ 2026",
    color: "blue",
  },
];

export const VC_FACTS: EconomyFact[] = [
  {
    id: "vc-ai",
    fact: "US AI startups raised $85B in 2025 — 65% of global AI investment",
    detail:
      "OpenAI, Anthropic, and Scale AI — the AI revolution is being financed almost entirely by American capital and talent.",
    source: "Pitchbook 2026",
    color: "gold",
  },
  {
    id: "unicorn-share",
    fact: "1,172 US unicorns — over 65% of the global total",
    detail:
      'A "unicorn" is a private company valued at $1 billion or more. America has built more of them than all other nations combined.',
    source: "Pitchbook 2026",
    color: "red",
  },
  {
    id: "immigrant-founders",
    fact: "55%+ of US billion-dollar startups were founded by immigrants",
    detail:
      "Elon Musk (South Africa), Sergey Brin (Russia), Andy Grove (Hungary), Jensen Huang (Taiwan) — America's open door to talent is a core economic superpower.",
    source: "NFAP 2022",
    color: "blue",
  },
];

export const DOLLAR_FACTS: EconomyFact[] = [
  {
    id: "reserve-share",
    fact: "USD is held in 57%+ of all global foreign exchange reserves",
    detail:
      "Central banks around the world collectively hold $6.8 trillion in US dollar reserves. The next closest currency — the Euro — holds just 20%.",
    source: "IMF COFER Q4 2023",
    color: "gold",
  },
  {
    id: "swift-share",
    fact: "Over 40% of global SWIFT transactions are in US dollars",
    detail:
      "International trade, commodities, oil, gas, gold — all priced and settled in dollars. This creates an extraordinary structural advantage for the American economy.",
    source: "SWIFT 2026",
    color: "red",
  },
  {
    id: "petrodollar",
    fact: "Global oil markets are settled almost exclusively in dollars",
    detail:
      "Since the 1970s Petrodollar agreement, oil — the world's most traded commodity — has been denominated in USD, embedding dollar demand into every nation's economy.",
    source: "Federal Reserve / IMF",
    color: "blue",
  },
];

// ─── Startup Ecosystem Cities ─────────────────────────────────────────────────

export const STARTUP_ECOSYSTEMS: StartupEcosystem[] = [
  {
    city: "Silicon Valley",
    state: "California",
    nickname: "The VC Capital of Earth",
    unicorns: 200,
    vcFunding: "$80B+ annually",
    keyCompanies: ["Apple", "Google", "Meta", "NVIDIA", "Salesforce", "Airbnb"],
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    city: "New York City",
    state: "New York",
    nickname: "Finance & Media Hub",
    unicorns: 97,
    vcFunding: "$30B+ annually",
    keyCompanies: [
      "Bloomberg",
      "Goldman Sachs",
      "Stripe",
      "Peloton",
      "Canva USA",
    ],
    lat: 40.7128,
    lng: -74.006,
  },
  {
    city: "Boston",
    state: "Massachusetts",
    nickname: "Biotech & DeepTech",
    unicorns: 45,
    vcFunding: "$18B+ annually",
    keyCompanies: ["HubSpot", "Carbon Black", "Moderna", "Kensho"],
    lat: 42.3601,
    lng: -71.0589,
  },
  {
    city: "Seattle",
    state: "Washington",
    nickname: "Cloud & E-Commerce",
    unicorns: 38,
    vcFunding: "$12B+ annually",
    keyCompanies: ["Amazon", "Microsoft", "Boeing", "Expedia", "Convoy"],
    lat: 47.6062,
    lng: -122.3321,
  },
  {
    city: "Austin",
    state: "Texas",
    nickname: "Silicon Hills",
    unicorns: 29,
    vcFunding: "$8B+ annually",
    keyCompanies: ["Tesla", "Oracle", "Dell", "Indeed", "HomeAway"],
    lat: 30.2672,
    lng: -97.7431,
  },
  {
    city: "Miami",
    state: "Florida",
    nickname: "Crypto & LatAm Gateway",
    unicorns: 22,
    vcFunding: "$6B+ annually",
    keyCompanies: ["Chewy", "Ultimate Software", "Magic Leap", "Citadel"],
    lat: 25.7617,
    lng: -80.1918,
  },
];

export const TOP_VC_FIRMS: VcFirm[] = [
  {
    name: "Sequoia Capital",
    aum: "$85B+",
    city: "Menlo Park, CA",
    portfolio: "Apple, Google, WhatsApp, Instagram, Airbnb, Stripe",
  },
  {
    name: "Andreessen Horowitz",
    aum: "$35B+",
    city: "San Francisco, CA",
    portfolio: "Facebook, Twitter, Airbnb, Lyft, GitHub, Coinbase",
  },
  {
    name: "Accel Partners",
    aum: "$18B+",
    city: "Palo Alto, CA",
    portfolio: "Facebook, Dropbox, Slack, Spotify, CrowdStrike",
  },
  {
    name: "Benchmark Capital",
    aum: "$8B+",
    city: "San Francisco, CA",
    portfolio: "eBay, Twitter, Uber, Snapchat, WeWork, Yelp",
  },
  {
    name: "Kleiner Perkins",
    aum: "$12B+",
    city: "Menlo Park, CA",
    portfolio: "Amazon, Google, Genentech, Netscape, Twitter",
  },
  {
    name: "Tiger Global",
    aum: "$50B+",
    city: "New York, NY",
    portfolio: "Facebook (early), Spotify, Stripe, Bytedance, Nubank",
  },
];

export const VC_EXTENDED_FACTS: ExtendedFact[] = [
  {
    id: "vc-patents",
    fact: "The US grants over 350,000 patents annually — #1 in IP value",
    detail:
      "American innovation is protected by the world's most robust intellectual property system, ensuring that inventors can monetize their breakthroughs globally.",
    source: "USPTO 2026",
    color: "gold",
  },
  {
    id: "vc-stanford",
    fact: "Stanford alumni have founded companies worth $5 trillion+",
    detail:
      "Google (Brin & Page), NVIDIA (Jensen Huang), Netflix (Reed Hastings), Instagram (Mike Krieger), PayPal (Peter Thiel), Yahoo, Cisco, HP, Sun Microsystems — all Stanford.",
    source: "Stanford University Alumni Relations 2026",
    color: "red",
  },
  {
    id: "vc-quantum",
    fact: "The US leads in Quantum Computing with 60% of all global venture capital",
    detail:
      "From Google's 'Sycamore' to IBM's 'Condor' and startups like Quantinuum and IonQ, the United States is the primary financier of the quantum revolution, ensuring American leadership in the next era of computation.",
    source: "Boston Consulting Group 2024",
    color: "blue",
  },
  {
    id: "vc-second-chance",
    fact: "Chapter 11 Bankruptcy: Bounding the Downside of Risk-Taking",
    detail: "No other country's bankruptcy framework so comprehensively protects a business's ability to continue operating while restructuring its debts under court protection, allowing management to stay in place, customers to be served, and employees to keep their jobs. Treating failure as a recoverable condition rather than a permanent stigma is one of the least-discussed structural advantages of the American entrepreneurial ecosystem.",
    source: "Chicago Booth Review 2026",
    color: "gold",
  },
  {
    id: "vc-corporate-rd",
    fact: "US tech companies invest $250B+ in R&D every year",
    detail:
      "Amazon, Alphabet, Meta, and Microsoft alone outspend entire nations on research and development, fueling the next wave of global innovation.",
    source: "Strategy& / Bloomberg 2026",
    color: "red",
  },
  {
    id: "vc-returns",
    fact: "The top 10 US VC returns have produced over $2 trillion in value from tiny investments",
    detail:
      "Sequoia's $60M investment in Google returned $12B. Benchmark's $13M in eBay became $2.5B. American venture capital is the greatest wealth-creation mechanism ever invented.",
    source: "Forbes / Crunchbase",
    color: "blue",
  },
  {
    id: "vc-dynamism",
    fact: "Forming an LLC in the US takes days or hours, not weeks or months",
    detail: "While European labor regulations require weeks or months to legally incorporate and hire, American corporate formation is frictionless, attracting the vast majority of global venture capital.",
    source: "Pitchbook 2026",
    color: "gold" as const,
  },
  {
    id: "vc-franchise",
    fact: "The American Franchise System: Democratizing Business Ownership",
    detail: "Ray Kroc's standardization of McDonald's in the 1950s established the template. Today, the US franchise sector encompasses over 800,000 establishments across 300 categories, employing 8 million people and generating over $800 billion in economic output. It democratizes ownership: allowing first-generation immigrants or veterans to run a proven system without building a brand from scratch.",
    source: "International Franchise Association 2026",
    color: "blue",
  },
];

// ─── Founding Timeline ────────────────────────────────────────────────────────

export const STARTUP_TIMELINE: FoundingTimeline[] = [
  {
    year: 1975,
    company: "Microsoft",
    founder: "Bill Gates & Paul Allen",
    currentValuation: "$3.03T",
    industry: "Software",
  },
  {
    year: 1976,
    company: "Apple",
    founder: "Steve Jobs & Wozniak",
    currentValuation: "$3.89T",
    industry: "Consumer Tech",
  },
  {
    year: 1993,
    company: "NVIDIA",
    founder: "Jensen Huang, Chris Malachowsky & Curtis Priem",
    currentValuation: "$4.83T",
    industry: "AI / Semiconductors",
  },
  {
    year: 1994,
    company: "Amazon",
    founder: "Jeff Bezos",
    currentValuation: "$2.67T",
    industry: "E-Commerce / Cloud",
  },
  {
    year: 1998,
    company: "Google",
    founder: "Brin & Page (Stanford)",
    currentValuation: "$4.08T",
    industry: "Search / AI",
  },
  {
    year: 2002,
    company: "SpaceX",
    founder: "Elon Musk",
    currentValuation: "$400B+",
    industry: "Space",
  },
  {
    year: 2003,
    company: "Tesla",
    founder: "Musk / Eberhard",
    currentValuation: "$1.46T",
    industry: "EVs",
  },
  {
    year: 2004,
    company: "Meta (Facebook)",
    founder: "Mark Zuckerberg",
    currentValuation: "$1.70T",
    industry: "Social Media",
  },
  {
    year: 2006,
    company: "X (Twitter)",
    founder: "Dorsey / Williams",
    currentValuation: "$33B",
    industry: "Social Media",
  },
  {
    year: 2008,
    company: "Airbnb",
    founder: "Chesky / Gebbia",
    currentValuation: "$85B",
    industry: "Travel",
  },
  {
    year: 2009,
    company: "Uber",
    founder: "Travis Kalanick",
    currentValuation: "$140B",
    industry: "Mobility",
  },
  {
    year: 2010,
    company: "Instagram",
    founder: "Systrom & Krieger",
    currentValuation: "$100B+",
    industry: "Social Media",
  },
  {
    year: 2022,
    company: "OpenAI",
    founder: "Altman / Musk / Brockman",
    currentValuation: "$500B",
    industry: "AI",
  },
];

// ─── Overview Copy Blocks ─────────────────────────────────────────────────────

export const ECONOMY_OVERVIEW_PARAGRAPHS = [
  "The United States economy is the most powerful economic force in the history of human civilization — not by accident, not by geography alone, but by design. A constitutional system that protects private property, enforces contracts, and rewards individual initiative created the conditions for an explosion of wealth, productivity, and innovation unmatched in 5,000 years of recorded economic history.",
  "At $32.4 trillion in 2026, the US economy is not merely the largest — it is categorically different from every other economy on Earth. It is simultaneously the world's largest consumer market, its most important financial hub, the leading destination for foreign direct investment, the dominant technology innovator, and the issuer of the global reserve currency. No other nation has ever held all five crowns at once.",
  "The numbers are staggering but the story behind them is even more remarkable: a system built on free markets, low barriers to entry, tolerance for creative destruction, and an immigration policy that has attracted the world's most ambitious people for 250 years. The American economy does not succeed despite capitalism — it succeeds because of it.",
];

export const GDP_OVERVIEW_PARAGRAPHS = [
  "Let the scale settle in: the United States economy produces $32.4 trillion in goods and services annually. That is more than the next three largest economies — China ($19.5T), Germany ($4.8T), and Japan ($4.4T) — combined. It represents approximately 25% of all global economic output generated by a country with just 4.2% of the world's population.",
  "What makes this achievement even more extraordinary is its durability. The United States has been the world's largest economy for over 130 consecutive years — through the Great Depression, two World Wars, the Cold War, the financial crisis of 2008, and the COVID-19 pandemic. No other economy in modern history has demonstrated this combination of scale and resilience.",
];

export const CAPITAL_MARKETS_PARAGRAPHS = [
  "The New York Stock Exchange and NASDAQ together represent the deepest, most liquid, and most transparent capital markets in human history. Combined market capitalization exceeds $69 trillion — more than the GDP of every nation except the United States itself. These markets are not merely places where stocks are traded; they are the engine through which American innovation is financed, with [Wall Street](#deep-dive-Wall_Street) serving as the global focal point.",
  "The US bond market — $27 trillion in outstanding Treasury securities alone — is the bedrock of global finance. US Treasury yields serve as the world's reference rate for risk-free returns. When institutions from Tokyo to Frankfurt price any financial asset, they start with what the [Federal Reserve](#deep-dive-Federal_Reserve) pays.",
];

export const VC_OVERVIEW_PARAGRAPHS = [
  "[Silicon Valley](#deep-dive-Silicon_Valley) is not a place — it is a philosophy made physical. The venture capital ecosystem centered in the San Francisco Bay Area, with satellites in New York, Boston, Seattle, Austin, and Miami, channels more patient, risk-seeking capital into early-stage innovation than the rest of the world combined.",
  "The numbers are breathtaking: American startups raised approximately $210 billion in venture capital in 2025 — nearly 65% of all VC deployed globally. The result? 1,172 unicorn companies (private businesses valued over $1 billion), representing 65% of the entire global unicorn ecosystem. From the iPhone to Google Search to ChatGPT, the tools that define modern civilization were born here.",
];

export const DOLLAR_OVERVIEW_PARAGRAPHS = [
  'The US dollar is not merely the currency of 335 million Americans — it is the operating system of the global economy. Since the [Bretton Woods system](#deep-dive-Bretton_Woods_system) of 1944, and reinforced by the Petrodollar arrangements of the 1970s, the dollar has served as the world\'s reserve currency, trade medium, and ultimate store of value. This status confers on the United States an "exorbitant privilege" — the ability to borrow in its own currency at globally competitive rates.',
  "Today, 57.4% of all global foreign exchange reserves are held in US dollars. Over 40% of international trade is invoiced in dollars regardless of whether the United States is a party to the transaction. Oil, the world's most traded commodity, is priced in dollars in nearly every market on Earth. These structural facts embed dollar demand into the financial architecture of every nation on the planet.",
];

export const TRADE_OVERVIEW_PARAGRAPHS = [
  "The United States is both the world's largest importer and one of its most significant exporters — a reflection of an economy so dynamic it both produces and consumes at a scale no other nation can match. US merchandise exports exceed $2 trillion annually, led by aircraft, petroleum products, semiconductors, medical devices, and pharmaceuticals.",
  "Beyond goods, America dominates the export of services — financial services, software, education, entertainment, and professional consulting. American firms like JP Morgan, Goldman Sachs, McKinsey, and Harvard Business School export the intellectual capital that runs economies around the world. When you add services to the ledger, the American export story is far more impressive than the goods trade deficit suggests.",
];

// ─── Quote Data ───────────────────────────────────────────────────────────────

export const ECONOMY_QUOTES = [
  {
    id: "friedman",
    quote:
      "The great virtue of a free market system is that it does not care what color people are; it does not care what their religion is; it only cares whether they can produce something you want to buy.",
    attribution: "Milton Friedman",
    title: "Nobel Laureate in Economics",
  },
  {
    id: "reagan",
    quote:
      "There are no limits to growth and human progress when men and women are free to follow their dreams.",
    attribution: "Ronald Reagan",
    title: "40th President of the United States",
  },
  {
    id: "sowell",
    quote:
      "The first lesson of economics is scarcity: there is never enough of anything to satisfy all those who want it. The first lesson of politics is to disregard the first lesson of economics.",
    attribution: "Thomas Sowell",
    title: "Economist & Senior Fellow, Hoover Institution",
  },
];

// ─── Sub-Page Navigation Cards ────────────────────────────────────────────────

export const ECONOMY_SUB_PAGES = [
  {
    href: "/economy/gdp-growth",
    title: "GDP & Scale",
    description:
      "The largest economy in human history — $32.4 trillion and counting",
    imageSrc:
      SITE_IMAGES.economyGrowth,
    imageAlt: "New York City financial district skyline",
    badge: "$32.4T",
  },
  {
    href: "/economy/capital-markets",
    title: "Capital Markets",
    description:
      "NYSE, NASDAQ, and Wall Street — the financial backbone of civilization",
    imageSrc:
      SITE_IMAGES.economyNYSEUpsideDown,
    imageAlt: "Stock market trading screens",
    badge: "$47T+",
  },
  {
    href: "/economy/startups-venture-capital",
    title: "Startups & VC",
    description: "Silicon Valley and beyond — where the future is funded",
    imageSrc:
      SITE_IMAGES.siliconValleyOffice,
    imageAlt: "Modern startup office",
    badge: "47% of global VC",
  },
  {
    href: "/economy/dollar-dominance",
    title: "Dollar Dominance",
    description:
      "The world's reserve currency — the operating system of global finance",
    imageSrc:
      SITE_IMAGES.economyDollar,
    imageAlt: "US dollar bills close up",
    badge: "57% of reserves",
  },
  {
    href: "/economy/trade-and-exports",
    title: "Trade & Exports",
    description: "America powers global commerce — from aircraft to software",
    imageSrc:
      SITE_IMAGES.economyPort,
    imageAlt: "Container port with cargo ships",
    badge: "$2T+ Exports",
  },
];

export function getEconomyHeroStats(locale: Locale) {
  if (locale === "ro") {
    return [
      {
        ...ECONOMY_HERO_STATS[0],
        label: "PIB (2026)",
        description: "Cea mai mare economie din istoria umană",
      },
      {
        ...ECONOMY_HERO_STATS[1],
        label: "Piețele Bursiere SUA",
        description: "NYSE + NASDAQ împreună",
      },
      {
        ...ECONOMY_HERO_STATS[2],
        label: "Rezerve Globale",
        description: "Ponderea rezervelor valutare mondiale în USD",
      },
      {
        ...ECONOMY_HERO_STATS[3],
        label: "VC Global",
        description: "Ponderea Americii din venture capitalul mondial",
      },
    ];
  }

  return ECONOMY_HERO_STATS;
}

export function getGdpFacts(locale: Locale) {
  if (locale === "ro") {
    return [
      {
        ...GDP_FACTS[0],
        fact: "California ar fi, singură, a 4-a economie de pe Pământ",
        detail:
          "La 4,25 trilioane de dolari, California a depășit Japonia, Germania și India. Un singur stat american produce mai mult decât aproape orice națiune.",
      },
      {
        ...GDP_FACTS[1],
        fact: "Cea mai mare economie pentru peste 100 de ani consecutivi",
        detail:
          "Statele Unite sunt cea mai mare economie a lumii încă de la sfârșitul anilor 1800 — o domnie neîntreruptă de peste un secol.",
      },
      {
        ...GDP_FACTS[2],
        fact: "Cheltuielile consumatorilor americani ≈ întregul PIB al Germaniei",
        detail:
          "Consumul gospodăriilor americane este de aproximativ 19 trilioane de dolari — mai mare decât PIB-ul oricărei națiuni, cu excepția SUA.",
      },
      {
        ...GDP_FACTS[3],
        fact: "12 dintre cele mai valoroase 20 de companii din lume sunt americane",
        detail:
          "Apple, Microsoft, NVIDIA, Alphabet, Amazon, Meta, Berkshire Hathaway — elita corporativă globală este covârșitor americană.",
      },
    ];
  }

  return GDP_FACTS;
}

export function getCapitalMarketsFacts(locale: Locale) {
  if (locale === "ro") {
    return [
      {
        ...CAPITAL_MARKETS_FACTS[0],
        fact: "NYSE funcționează neîntrerupt din 1792",
        detail:
          "Bursa din New York este cea mai mare bursă din lume după capitalizare — peste 33 de trilioane de dolari — și ancora financiară a lumii de peste 230 de ani.",
      },
      {
        ...CAPITAL_MARKETS_FACTS[1],
        fact: "Titlurile de Trezorerie SUA sunt reperul global pentru rata fără risc",
        detail:
          "Orice model financiar de pe Pământ folosește randamentele Trezoreriei SUA ca bază pentru randamentele fără risc. Piața americană de obligațiuni are 27 de trilioane de dolari — cea mai adâncă și mai lichidă din istorie.",
      },
      {
        ...CAPITAL_MARKETS_FACTS[2],
        fact: "NASDAQ listează cele mai valoroase companii tech din istorie",
        detail:
          "Apple, Microsoft, NVIDIA, Alphabet, Amazon, Meta — toate listate pe o singură bursă americană. NASDAQ Composite a generat un randament de peste 4.500% din 1985.",
      },
    ];
  }

  return CAPITAL_MARKETS_FACTS;
}

export function getVcFacts(locale: Locale) {
  if (locale === "ro") {
    return [
      {
        ...VC_FACTS[0],
        fact: "Startup-urile americane de AI au strâns 85 mld. $ în 2025 — 65% din investițiile globale",
        detail:
          "OpenAI, Anthropic și Scale AI — revoluția inteligenței artificiale este finanțată aproape în totalitate de capitalul și talentul american.",
      },
      {
        ...VC_FACTS[1],
        fact: "1.172 unicorni americani — peste 65% din totalul global",
        detail:
          'Un "unicorn" este o companie privată evaluată la cel puțin 1 miliard de dolari. America a construit mai mulți astfel de companii decât toate celelalte națiuni la un loc.',
      },
      {
        ...VC_FACTS[2],
        fact: "Peste 55% dintre startup-urile americane de un miliard de dolari au fost fondate de imigranți",
        detail:
          "Elon Musk, Sergey Brin, Andy Grove, Jensen Huang — deschiderea Americii către talent este o superputere economică de bază.",
      },
    ];
  }

  return VC_FACTS;
}

export function getDollarFacts(locale: Locale) {
  if (locale === "ro") {
    return [
      {
        ...DOLLAR_FACTS[0],
        fact: "USD este păstrat în peste 57% din toate rezervele valutare globale",
        detail:
          "Băncile centrale din toată lumea dețin împreună 6,8 trilioane de dolari în rezerve americane. Următoarea monedă — Euro — are doar 20%.",
      },
      {
        ...DOLLAR_FACTS[1],
        fact: "Peste 40% din tranzacțiile globale SWIFT sunt în dolari americani",
        detail:
          "Comerțul internațional, materiile prime, petrolul, gazele, aurul — toate sunt evaluate și decontate în dolari. Asta creează un avantaj structural extraordinar pentru economia americană.",
      },
      {
        ...DOLLAR_FACTS[2],
        fact: "Piețele globale de petrol sunt decontate aproape exclusiv în dolari",
        detail:
          "De la acordurile petrodolarului din anii 1970, petrolul — cea mai tranzacționată marfă din lume — este denominat în USD în aproape toate piețele de pe Pământ.",
      },
    ];
  }

  return DOLLAR_FACTS;
}

export function getEconomyOverviewParagraphs(locale: Locale) {
  if (locale === "ro") {
    return [
      "Economia Statelor Unite este cea mai puternică forță economică din istoria civilizației umane — nu din întâmplare, nu doar datorită geografiei, ci prin design. Un sistem constituțional care protejează proprietatea privată, impune respectarea contractelor și răsplătește inițiativa individuală a creat condițiile pentru o explozie de bogăție, productivitate și inovație fără egal în 5.000 de ani de istorie economică.",
      "La 32,4 trilioane de dolari în 2026, economia SUA nu este doar cea mai mare — este categoric diferită de orice altă economie de pe Pământ. Este simultan cea mai mare piață de consum din lume, cel mai important centru financiar, principala destinație pentru investițiile străine directe, liderul inovării tehnologice și emitentul monedei de rezervă globale. Nicio altă națiune nu a purtat vreodată toate aceste cinci coroane în același timp.",
      "Cifrele sunt uluitoare, dar povestea din spatele lor este și mai remarcabilă: un sistem construit pe piețe libere, bariere reduse la intrare, toleranță pentru distrugerea creativă și o politică de imigrație care a atras cei mai ambițioși oameni ai lumii timp de 250 de ani. Economia americană nu reușește în ciuda capitalismului — reușește datorită lui.",
    ];
  }

  return ECONOMY_OVERVIEW_PARAGRAPHS;
}

export function getGdpOverviewParagraphs(locale: Locale) {
  if (locale === "ro") {
    return [
      "Privește bine scara: economia Statelor Unite produce anual bunuri și servicii în valoare de 32,4 trilioane de dolari. Asta înseamnă mai mult decât următoarele trei economii ca mărime — China, Germania și Japonia — la un loc. Reprezintă aproximativ 25% din întreaga producție economică globală generată de o țară care are doar 4,2% din populația lumii.",
      "Ceea ce face această realizare și mai extraordinară este durabilitatea ei. Statele Unite au fost cea mai mare economie a lumii timp de peste 130 de ani consecutivi — prin Marea Criză Economică, două războaie mondiale, Războiul Rece, criza financiară din 2008 și pandemia COVID-19. Nicio altă economie modernă nu a demonstrat această combinație de scară și reziliență.",
    ];
  }

  return GDP_OVERVIEW_PARAGRAPHS;
}

export function getCapitalMarketsParagraphs(locale: Locale) {
  if (locale === "ro") {
    return [
      "Bursa din New York și NASDAQ reprezintă împreună cele mai adânci, lichide și transparente piețe de capital din istoria umanității. Capitalizarea lor cumulată depășește 69 de trilioane de dolari — mai mult decât PIB-ul oricărei națiuni, cu excepția Statelor Unite. Aceste piețe nu sunt doar locuri unde se tranzacționează acțiuni; ele sunt motorul prin care este finanțată inovația americană, cu [Wall Street](#deep-dive-Wall_Street) servind drept punct focal global.",
      "Piața americană de obligațiuni — cu 27 de trilioane de dolari doar în titluri de Trezorerie restante — este fundamentul finanțelor globale. Randamentele titlurilor de Trezorerie ale SUA sunt rata de referință pentru randamentele fără risc în întreaga lume. Când instituții din Tokyo până la Frankfurt evaluează orice activ financiar, pornesc de la ceea ce plătește [Federal Reserve](#deep-dive-Federal_Reserve).",
    ];
  }

  return CAPITAL_MARKETS_PARAGRAPHS;
}

export function getVcOverviewParagraphs(locale: Locale) {
  if (locale === "ro") {
    return [
      "[Silicon Valley](#deep-dive-Silicon_Valley) nu este doar un loc — este o filosofie făcută realitate. Ecosistemul de venture capital centrat în zona golfului San Francisco, cu sateliți în New York, Boston, Seattle, Austin și Miami, direcționează mai mult capital răbdător și dispus la risc către inovația aflată la început de drum decât restul lumii la un loc.",
      "Cifrele sunt uimitoare: startup-urile americane au atras aproximativ 210 miliarde de dolari în venture capital în 2025 — aproape 65% din tot VC-ul investit global. Rezultatul? 1.172 de companii unicorn, adică 65% din întreg ecosistemul global. De la iPhone la Google Search și ChatGPT, instrumentele care definesc civilizația modernă s-au născut aici.",
    ];
  }

  return VC_OVERVIEW_PARAGRAPHS;
}

export function getDollarOverviewParagraphs(locale: Locale) {
  if (locale === "ro") {
    return [
      "Dolarul american nu este doar moneda a 335 de milioane de americani — este sistemul de operare al economiei globale. De la acordul [Bretton Woods](#deep-dive-Bretton_Woods_system) din 1944 și consolidat de aranjamentele petrodolarului din anii 1970, dolarul a servit drept monedă de rezervă, mijloc de comerț și depozit final de valoare pentru lume. Acest statut oferă Statelor Unite un «privilegiu exorbitant» — capacitatea de a se împrumuta în propria monedă la costuri competitive la nivel global, sub egida [Federal Reserve](#deep-dive-Federal_Reserve).",
      "Astăzi, 57,4% din toate rezervele valutare globale sunt deținute în dolari americani. Peste 40% din comerțul internațional este facturat în dolari indiferent dacă Statele Unite sunt sau nu parte a tranzacției. Petrolul, cea mai tranzacționată marfă din lume, este evaluat în dolari pe aproape fiecare piață de pe Pământ. Aceste realități structurale încorporează cererea de dolari în arhitectura financiară a fiecărei națiuni.",
    ];
  }

  return DOLLAR_OVERVIEW_PARAGRAPHS;
}

export function getTradeOverviewParagraphs(locale: Locale) {
  if (locale === "ro") {
    return [
      "Statele Unite sunt atât cel mai mare importator din lume, cât și unul dintre cei mai importanți exportatori — reflexia unei economii atât de dinamice încât produce și consumă la o scară pe care nicio altă națiune nu o poate egala. Exporturile americane de bunuri depășesc anual 2 trilioane de dolari, conduse de avioane, produse petroliere, semiconductori, dispozitive medicale și produse farmaceutice.",
      "Dincolo de bunuri, America domină exportul de servicii — servicii financiare, software, educație, divertisment și consultanță profesională. Firme americane precum JP Morgan, Goldman Sachs, McKinsey și Harvard Business School exportă capitalul intelectual care pune în mișcare economii din întreaga lume. Când adaugi serviciile în ecuație, povestea exporturilor americane este mult mai impresionantă decât lasă să se înțeleagă deficitul comercial de bunuri.",
    ];
  }

  return TRADE_OVERVIEW_PARAGRAPHS;
}

export function getEconomyQuotes(locale: Locale) {
  if (locale === "ro") {
    return [
      {
        ...ECONOMY_QUOTES[0],
        quote:
          "Marea virtute a sistemului de piață liberă este că nu îi pasă ce culoare au oamenii; nu îi pasă care este religia lor; îi pasă doar dacă pot produce ceva ce vrei să cumperi.",
        title: "Laureat Nobel pentru Economie",
      },
      {
        ...ECONOMY_QUOTES[1],
        quote:
          "Nu există limite pentru creștere și progres uman atunci când bărbații și femeile sunt liberi să își urmeze visurile.",
        title: "Al 40-lea președinte al Statelor Unite",
      },
      {
        ...ECONOMY_QUOTES[2],
        quote:
          "Prima lecție a economiei este raritatea: nu există niciodată suficient din nimic pentru a-i satisface pe toți cei care își doresc acel lucru. Prima lecție a politicii este să ignore prima lecție a economiei.",
        title: "Economist și Senior Fellow, Hoover Institution",
      },
    ];
  }

  return ECONOMY_QUOTES;
}

export function getEconomySubPages(locale: Locale) {
  if (locale === "ro") {
    return [
      {
        ...ECONOMY_SUB_PAGES[0],
        title: "PIB și Dimensiune",
        description:
          "Cea mai mare economie din istoria umană — 32,4 trilioane de dolari și în creștere",
      },
      {
        ...ECONOMY_SUB_PAGES[1],
        title: "Piețe de Capital",
        description:
          "NYSE, NASDAQ și Wall Street — coloana vertebrală financiară a civilizației",
      },
      {
        ...ECONOMY_SUB_PAGES[2],
        title: "Startup-uri și VC",
        description: "Silicon Valley și dincolo de ea — locul unde este finanțat viitorul",
      },
      {
        ...ECONOMY_SUB_PAGES[3],
        title: "Dominația Dolarului",
        description:
          "Moneda de rezervă a lumii — sistemul de operare al finanțelor globale",
      },
      {
        ...ECONOMY_SUB_PAGES[4],
        title: "Comerț și Exporturi",
        description:
          "America susține comerțul global — de la avioane la software",
      },
    ];
  }

  return ECONOMY_SUB_PAGES;
}

export function getStartupEcosystems(locale: Locale) {
  if (locale === "ro") {
    return STARTUP_ECOSYSTEMS.map((eco) => ({
      ...eco,
      city: eco.city === "New York City" ? "New York" : eco.city,
      state: eco.state === "New York" ? "New York" : eco.state,
      nickname: eco.nickname.includes("Capital of Earth")
        ? "Capitala VC a Pământului"
        : eco.nickname.includes("Finance & Media")
          ? "Hub financiar și media"
          : eco.nickname.includes("Biotech")
            ? "Biotech și deep tech"
            : eco.nickname.includes("Cloud")
              ? "Cloud și e-commerce"
              : eco.nickname.includes("Silicon Hills")
                ? "Silicon Hills"
                : eco.nickname.includes("Crypto")
                  ? "Poarta către cripto și America Latină"
                  : eco.nickname,
      vcFunding: eco.vcFunding
        .replace("$", "")
        .replace("B+", " mld. $ +")
        .replace("annually", "anual"),
    }));
  }
  return STARTUP_ECOSYSTEMS;
}

export function getStartupTimeline(locale: Locale) {
  if (locale === "ro") {
    return STARTUP_TIMELINE.map((item) => ({
      ...item,
      currentValuation: item.currentValuation
        .replace("T", " trilioane $")
        .replace("B", " mld. $")
        .replace("$", ""),
      industry: item.industry
        .replace("Software", "Software")
        .replace("Consumer Tech", "Tehnologie de consum")
        .replace("AI / Semiconductors", "IA / Semiconductori")
        .replace("E-Commerce / Cloud", "E-commerce / Cloud")
        .replace("Search / AI", "Căutare / IA")
        .replace("Space", "Spațiu")
        .replace("EVs", "Vehicule electrice")
        .replace("Social Media", "Social media")
        .replace("Travel", "Turism")
        .replace("Mobility", "Mobilitate")
        .replace("AI", "IA"),
    }));
  }
  return STARTUP_TIMELINE;
}

export function getTopVcFirms(locale: Locale) {
  if (locale === "ro") {
    return TOP_VC_FIRMS.map((firm) => ({
      ...firm,
      city: firm.city.replace(", CA", ", California").replace(", NY", ", New York"),
      aum: firm.aum.replace("$", "").replace("B+", " mld. $ +"),
    }));
  }
  return TOP_VC_FIRMS;
}

export function getVcExtendedFacts(locale: Locale) {
  if (locale === "ro") {
    return [
      {
        ...VC_EXTENDED_FACTS[0],
        fact: "SUA acordă peste 350.000 de brevete anual — locul #1 în valoarea proprietății intelectuale",
        detail:
          "Inovația americană este protejată de cel mai robust sistem de proprietate intelectuală din lume, asigurând că inventatorii își pot monetiza descoperirile la nivel global.",
      },
      {
        ...VC_EXTENDED_FACTS[1],
        fact: "Absolvenții Stanford au fondat companii evaluate la peste 5 trilioane de dolari",
        detail:
          "Google, NVIDIA, Netflix, Instagram, PayPal, Yahoo, Cisco, HP, Sun Microsystems — toate au legături puternice cu Stanford.",
      },
      {
        id: "vc-quantum",
        fact: "SUA conduc în calculul cuantic cu 60% din tot capitalul de risc global",
        detail:
          "De la 'Sycamore' al Google la 'Condor' al IBM și startup-uri precum Quantinuum și IonQ, Statele Unite sunt principalul finanțator al revoluției cuantice, asigurând leadership-ul american în următoarea eră a calculului.",
        source: "Boston Consulting Group 2024",
        color: "blue",
      },
      {
        ...VC_EXTENDED_FACTS[3],
        fact: "Falimentul Chapter 11: Delimitarea Riscurilor în Afaceri",
        detail: "Niciun alt cadru de faliment din lume nu protejează atât de cuprinzător capacitatea unei afaceri de a continua să funcționeze în timpul restructurării datoriilor sub protecția instanței. Tratarea eșecului ca o etapă recuperabilă, nu ca un stigmat permanent, reprezintă un avantaj structural de bază al ecosistemului american.",
        source: "Chicago Booth Review 2026",
      },
      {
        ...VC_EXTENDED_FACTS[4],
        fact: "Companiile tech din SUA investesc peste 250 mld. $ în R&D în fiecare an",
        detail:
          "Amazon, Alphabet, Meta și Microsoft cheltuiesc împreună mai mult pe cercetare și dezvoltare decât națiuni întregi, alimentând următorul val de inovație globală.",
      },
      {
        ...VC_EXTENDED_FACTS[5],
        fact: "Cele mai bune 10 randamente de VC din SUA au produs peste 2 trilioane $ din investiții minuscule",
        detail:
          "Investiția de 60 mil. $ a Sequoia în Google a returnat 12 mld. $. Cele 13 mil. $ ale Benchmark în eBay au devenit 2,5 mld. $. Venture capitalul american este cel mai mare mecanism de creare de avere.",
      },
      {
        ...VC_EXTENDED_FACTS[6],
        fact: "Înființarea unui LLC în SUA durează ore sau zile, nu săptămâni sau luni",
        detail:
          "În timp ce legile și reglementările europene ale muncii necesită săptămâni sau chiar luni pentru încorporare și angajare, formarea unei firme în SUA este simplă, atrăgând majoritatea fluxurilor de capital de risc.",
      },
      {
        ...VC_EXTENDED_FACTS[7],
        fact: "Sistemul de Franciză American: Democratizarea Afacerilor",
        detail: "Standardizat de Ray Kroc cu McDonald's în anii 1950, modelul de franciză cuprinde azi peste 800.000 de unități din 300 de categorii, angajând 8 milioane de oameni și generând peste 800 mld. $ anual. Permite oricărui antreprenor sau imigrant să opereze un sistem dovedit, cu suport complet.",
        source: "International Franchise Association 2026",
      },
    ];
  }
  return VC_EXTENDED_FACTS;
}

// ─── U.S. GDP, the long run ───────────────────────────────────────────────────
// The growth story the GDP page was missing: every year since the BEA series
// begins in 1929. `real` is chained 2017 dollars (inflation removed — the honest
// measure of growth); `nominal` is current dollars (comparable to the country
// bars elsewhere on the page). Both in trillions USD.
// Source: U.S. Bureau of Economic Analysis via FRED — GDPCA (real), GDPA (nominal).
export interface GdpHistoryPoint {
  year: number;
  real: number;
  nominal: number;
}

export const GDP_HISTORY_META = {
  firstYear: 1929,
  lastYear: 2025,
  realBase: 2017,
  source: "U.S. Bureau of Economic Analysis (via FRED: GDPCA, GDPA)",
  sourceHref: "https://fred.stlouisfed.org/series/GDPCA",
} as const;

export const US_GDP_HISTORY: GdpHistoryPoint[] = [
  { year: 1929, real: 1.19, nominal: 0.10 },
  { year: 1930, real: 1.09, nominal: 0.09 },
  { year: 1931, real: 1.02, nominal: 0.08 },
  { year: 1932, real: 0.89, nominal: 0.06 },
  { year: 1933, real: 0.88, nominal: 0.06 },
  { year: 1934, real: 0.97, nominal: 0.07 },
  { year: 1935, real: 1.06, nominal: 0.07 },
  { year: 1936, real: 1.20, nominal: 0.08 },
  { year: 1937, real: 1.26, nominal: 0.09 },
  { year: 1938, real: 1.21, nominal: 0.09 },
  { year: 1939, real: 1.31, nominal: 0.09 },
  { year: 1940, real: 1.43, nominal: 0.10 },
  { year: 1941, real: 1.68, nominal: 0.13 },
  { year: 1942, real: 2.00, nominal: 0.17 },
  { year: 1943, real: 2.34, nominal: 0.20 },
  { year: 1944, real: 2.52, nominal: 0.22 },
  { year: 1945, real: 2.50, nominal: 0.23 },
  { year: 1946, real: 2.21, nominal: 0.23 },
  { year: 1947, real: 2.18, nominal: 0.25 },
  { year: 1948, real: 2.27, nominal: 0.27 },
  { year: 1949, real: 2.26, nominal: 0.27 },
  { year: 1950, real: 2.46, nominal: 0.30 },
  { year: 1951, real: 2.66, nominal: 0.35 },
  { year: 1952, real: 2.76, nominal: 0.37 },
  { year: 1953, real: 2.89, nominal: 0.39 },
  { year: 1954, real: 2.88, nominal: 0.39 },
  { year: 1955, real: 3.08, nominal: 0.43 },
  { year: 1956, real: 3.15, nominal: 0.45 },
  { year: 1957, real: 3.22, nominal: 0.47 },
  { year: 1958, real: 3.19, nominal: 0.48 },
  { year: 1959, real: 3.41, nominal: 0.52 },
  { year: 1960, real: 3.50, nominal: 0.54 },
  { year: 1961, real: 3.59, nominal: 0.56 },
  { year: 1962, real: 3.81, nominal: 0.60 },
  { year: 1963, real: 3.98, nominal: 0.64 },
  { year: 1964, real: 4.21, nominal: 0.68 },
  { year: 1965, real: 4.48, nominal: 0.74 },
  { year: 1966, real: 4.77, nominal: 0.81 },
  { year: 1967, real: 4.90, nominal: 0.86 },
  { year: 1968, real: 5.15, nominal: 0.94 },
  { year: 1969, real: 5.31, nominal: 1.02 },
  { year: 1970, real: 5.32, nominal: 1.07 },
  { year: 1971, real: 5.49, nominal: 1.16 },
  { year: 1972, real: 5.78, nominal: 1.28 },
  { year: 1973, real: 6.11, nominal: 1.43 },
  { year: 1974, real: 6.07, nominal: 1.55 },
  { year: 1975, real: 6.06, nominal: 1.68 },
  { year: 1976, real: 6.39, nominal: 1.87 },
  { year: 1977, real: 6.68, nominal: 2.08 },
  { year: 1978, real: 7.05, nominal: 2.35 },
  { year: 1979, real: 7.28, nominal: 2.63 },
  { year: 1980, real: 7.26, nominal: 2.86 },
  { year: 1981, real: 7.44, nominal: 3.21 },
  { year: 1982, real: 7.31, nominal: 3.34 },
  { year: 1983, real: 7.64, nominal: 3.63 },
  { year: 1984, real: 8.20, nominal: 4.04 },
  { year: 1985, real: 8.54, nominal: 4.34 },
  { year: 1986, real: 8.83, nominal: 4.58 },
  { year: 1987, real: 9.14, nominal: 4.86 },
  { year: 1988, real: 9.52, nominal: 5.24 },
  { year: 1989, real: 9.87, nominal: 5.64 },
  { year: 1990, real: 10.06, nominal: 5.96 },
  { year: 1991, real: 10.04, nominal: 6.16 },
  { year: 1992, real: 10.40, nominal: 6.52 },
  { year: 1993, real: 10.68, nominal: 6.86 },
  { year: 1994, real: 11.11, nominal: 7.29 },
  { year: 1995, real: 11.41, nominal: 7.64 },
  { year: 1996, real: 11.84, nominal: 8.07 },
  { year: 1997, real: 12.37, nominal: 8.58 },
  { year: 1998, real: 12.92, nominal: 9.06 },
  { year: 1999, real: 13.54, nominal: 9.63 },
  { year: 2000, real: 14.10, nominal: 10.25 },
  { year: 2001, real: 14.23, nominal: 10.58 },
  { year: 2002, real: 14.47, nominal: 10.93 },
  { year: 2003, real: 14.88, nominal: 11.46 },
  { year: 2004, real: 15.45, nominal: 12.22 },
  { year: 2005, real: 15.99, nominal: 13.04 },
  { year: 2006, real: 16.43, nominal: 13.82 },
  { year: 2007, real: 16.76, nominal: 14.47 },
  { year: 2008, real: 16.78, nominal: 14.77 },
  { year: 2009, real: 16.35, nominal: 14.48 },
  { year: 2010, real: 16.79, nominal: 15.05 },
  { year: 2011, real: 17.05, nominal: 15.60 },
  { year: 2012, real: 17.44, nominal: 16.25 },
  { year: 2013, real: 17.81, nominal: 16.88 },
  { year: 2014, real: 18.26, nominal: 17.61 },
  { year: 2015, real: 18.80, nominal: 18.30 },
  { year: 2016, real: 19.14, nominal: 18.80 },
  { year: 2017, real: 19.61, nominal: 19.61 },
  { year: 2018, real: 20.19, nominal: 20.66 },
  { year: 2019, real: 20.72, nominal: 21.54 },
  { year: 2020, real: 20.28, nominal: 21.38 },
  { year: 2021, real: 21.53, nominal: 23.73 },
  { year: 2022, real: 22.08, nominal: 26.05 },
  { year: 2023, real: 22.72, nominal: 27.81 },
  { year: 2024, real: 23.36, nominal: 29.30 },
  { year: 2025, real: 23.85, nominal: 30.76 },
];

// ─── U.S. GDP by Industry Sector (BEA 2025/2026 Value Added) ──────────────────
export const US_GDP_SECTORS: GdpSectorPoint[] = [
  { sector: "Finance, Real Estate & Leasing", sectorRo: "Finanțe, Imobiliare & Leasing", value: 6.8, percentage: 21.8, highlight: true },
  { sector: "Professional & Business Services", sectorRo: "Servicii Profesionale & Afaceri", value: 4.1, percentage: 13.1, highlight: true },
  { sector: "Manufacturing", sectorRo: "Industria Prelucrătoare", value: 3.0, percentage: 9.4 },
  { sector: "Health Care & Education", sectorRo: "Sănătate & Educație", value: 2.8, percentage: 8.9 },
  { sector: "State & Local Government", sectorRo: "Guvernare Statală & Locală", value: 2.4, percentage: 7.6 },
  { sector: "Wholesale Trade", sectorRo: "Comerț cu Ridicata", value: 2.0, percentage: 6.4 },
  { sector: "Retail Trade", sectorRo: "Comerț cu Amănuntul", value: 2.0, percentage: 6.2 },
  { sector: "Information & Technology", sectorRo: "Informație & Tehnologie", value: 1.8, percentage: 5.6 },
  { sector: "Other Private Services & Utilities", sectorRo: "Alte Servicii Private & Utilități", value: 4.5, percentage: 14.0 },
  { sector: "Federal Government & Construction", sectorRo: "Guvern Federal & Construcții", value: 2.2, percentage: 7.0 },
];

// ─── U.S. vs. G7 Real GDP Growth Divergence (OECD / IMF, 2010 = 100) ──────────
export const US_VS_G7_DIVERGENCE: GdpDivergencePoint[] = [
  { year: 2010, us: 100.0, g7: 100.0 },
  { year: 2012, us: 104.2, g7: 102.1 },
  { year: 2014, us: 109.1, g7: 105.0 },
  { year: 2016, us: 113.5, g7: 108.2 },
  { year: 2018, us: 120.1, g7: 112.4 },
  { year: 2020, us: 121.5, g7: 108.6 },
  { year: 2022, us: 129.2, g7: 114.1 },
  { year: 2024, us: 134.6, g7: 116.8 },
  { year: 2026, us: 141.0, g7: 119.5 }, // projected
];

// ─── U.S. GDP by Expenditure Component (BEA 2025/2026) ────────────────────────
export const US_GDP_EXPENDITURES: GdpExpenditurePoint[] = [
  {
    component: "Personal Consumption (C)",
    componentRo: "Consum Personal (C)",
    value: 22.1,
    percentage: 68.2,
    description: "Household spending on goods and services, powering the bulk of economic activity.",
    descriptionRo: "Cheltuielile gospodăriilor pe bunuri și servicii, motorul principal al activității economice.",
    color: "#E8B923", // Gold
  },
  {
    component: "Gross Private Domestic Investment (I)",
    componentRo: "Investiții Private Brute (I)",
    value: 5.7,
    percentage: 17.5,
    description: "Business spending on machinery, factories, software, housing, and R&D.",
    descriptionRo: "Cheltuielile companiilor pe echipamente, fabrici, software, locuințe și cercetare-dezvoltare.",
    color: "#3b82f6", // Blue
  },
  {
    component: "Government spending & investment (G)",
    componentRo: "Cheltuieli și Investiții Publice (G)",
    value: 5.7,
    percentage: 17.6,
    description: "Federal, state, and local spending on public services, infrastructure, and defense.",
    descriptionRo: "Cheltuielile federale, statale și locale pe servicii publice, infrastructură și apărare.",
    color: "#e11d48", // Red/Rose
  },
  {
    component: "Net Exports of Goods & Services (NX)",
    componentRo: "Exporturi Nete de Bunuri & Servicii (NX)",
    value: -1.1,
    percentage: -3.3,
    description: "The trade balance (Exports minus Imports). Represents a subtractive trade deficit.",
    descriptionRo: "Balanța comercială (Exporturi minus Importuri). Reprezintă un deficit comercial substractiv.",
    color: "#6b7280", // Gray
  },
];

// ─── U.S. vs. Major Global Economies (Nominal GDP, USD Trillions, 1980–2026) ─
export const US_VS_WORLD_GDP_HISTORY: GdpGlobalHistoryPoint[] = [
  { year: 1980, us: 2.86, china: 0.31, japan: 1.11, germany: 0.95 },
  { year: 1990, us: 5.96, china: 0.40, japan: 3.13, germany: 1.77 },
  { year: 2000, us: 10.25, china: 1.21, japan: 4.97, germany: 1.95 },
  { year: 2010, us: 14.99, china: 6.09, japan: 5.76, germany: 3.42 },
  { year: 2020, us: 21.06, china: 14.69, japan: 5.04, germany: 3.89 },
  { year: 2026, us: 32.40, china: 20.85, japan: 4.40, germany: 5.50 }, // projected
];

// ─── U.S. GDP vs. Labor Force Shares by Sector (BEA & BLS 2025/2026) ─────────
export const GDP_VS_LABOR_SECTORS: GdpLaborComparisonPoint[] = [
  {
    sector: "Finance, Insurance & Real Estate",
    sectorRo: "Finanțe, Asigurări & Imobiliare",
    gdpShare: 21.0,
    laborShare: 5.7,
    jobsCount: 9.1,
  },
  {
    sector: "Professional & Business Services",
    sectorRo: "Servicii Profesionale & Afaceri",
    gdpShare: 13.1,
    laborShare: 14.5,
    jobsCount: 23.0,
  },
  {
    sector: "Manufacturing",
    sectorRo: "Industrie Prelucrătoare",
    gdpShare: 9.4,
    laborShare: 8.2,
    jobsCount: 13.0,
  },
  {
    sector: "Health Care & Education",
    sectorRo: "Sănătate & Servicii Sociale",
    gdpShare: 8.9,
    laborShare: 16.4,
    jobsCount: 26.0,
  },
  {
    sector: "Wholesale & Retail Trade",
    sectorRo: "Comerț cu Amănuntul & Ridicata",
    gdpShare: 12.6,
    laborShare: 13.8,
    jobsCount: 22.0,
  },
  {
    sector: "Leisure & Hospitality",
    sectorRo: "Horeca & Divertisment",
    gdpShare: 4.2,
    laborShare: 10.7,
    jobsCount: 17.0,
  },
  {
    sector: "Government (All Levels)",
    sectorRo: "Sector Public & Guvern",
    gdpShare: 14.6,
    laborShare: 14.7,
    jobsCount: 23.4,
  },
];

// ─── Bond Market Composition ──────────────────────────────────────────────────
// Source: SIFMA Research Quarterly – Fixed Income Outstanding, 1Q 2026
// Total US fixed income outstanding: $50.5 trillion

export interface BondMarketPoint {
  category: string;
  categoryRo: string;
  value: number;  // in trillions USD
  percentage: number;
  color: string;
  description: string;
  descriptionRo: string;
}

export const BOND_MARKET_COMPOSITION: BondMarketPoint[] = [
  {
    category: "US Treasuries",
    categoryRo: "Titluri de Trezorerie SUA",
    value: 30.8,
    percentage: 61.0,
    color: "#E8B923",
    description: "Bills, Notes & Bonds — the world's risk-free benchmark",
    descriptionRo: "Bonuri, Note & Obligațiuni — reperul global fără risc",
  },
  {
    category: "Corporate Bonds",
    categoryRo: "Obligațiuni Corporative",
    value: 11.7,
    percentage: 23.2,
    color: "#3B82F6",
    description: "Investment grade & high yield — record issuance in 2025",
    descriptionRo: "Investment grade & high yield — emisiuni record în 2025",
  },
  {
    category: "Municipal Bonds",
    categoryRo: "Obligațiuni Municipale",
    value: 4.5,
    percentage: 8.9,
    color: "#10B981",
    description: "State & local government debt, largely tax-exempt",
    descriptionRo: "Datoria autorităților locale, în mare parte scutită de taxe",
  },
  {
    category: "Federal Agency",
    categoryRo: "Agenții Federale",
    value: 2.1,
    percentage: 4.2,
    color: "#8B5CF6",
    description: "Fannie Mae, Freddie Mac, FHLB & other agency securities",
    descriptionRo: "Fannie Mae, Freddie Mac, FHLB și alte titluri de agenții",
  },
  {
    category: "Commercial Paper",
    categoryRo: "Hârtii Comerciale",
    value: 1.4,
    percentage: 2.7,
    color: "#F97316",
    description: "Short-term corporate funding instruments",
    descriptionRo: "Instrumente de finanțare corporativă pe termen scurt",
  },
];

// ─── R&D Spending International Comparison ────────────────────────────────────
// Source: NSF/NCSES, OECD Main Science and Technology Indicators 2024–2025
// Metric: GERD as % of GDP (Gross Domestic Expenditure on R&D)

export interface RdSpendingPoint {
  country: string;
  countryRo: string;
  value: number;   // GERD as % of GDP
  highlight?: boolean;
}

export const RD_SPENDING_BY_COUNTRY: RdSpendingPoint[] = [
  { country: "South Korea", countryRo: "Coreea de Sud", value: 4.93 },
  { country: "Israel",      countryRo: "Israel",         value: 4.70 },
  { country: "United States", countryRo: "Statele Unite", value: 3.50, highlight: true },
  { country: "Sweden",     countryRo: "Suedia",          value: 3.40 },
  { country: "Japan",      countryRo: "Japonia",         value: 3.27 },
  { country: "Germany",    countryRo: "Germania",        value: 3.13 },
  { country: "Austria",    countryRo: "Austria",         value: 3.24 },
  { country: "Denmark",    countryRo: "Danemarca",       value: 3.10 },
  { country: "China",      countryRo: "China",           value: 2.44 },
  { country: "France",     countryRo: "Franța",          value: 2.20 },
  { country: "United Kingdom", countryRo: "Marea Britanie", value: 1.72 },
];

// ─── Venture Capital Investment History ───────────────────────────────────────
// Source: NVCA / PitchBook Venture Monitor
// Annual US VC deployed (billion USD)

export interface VCHistoryPoint {
  year: number;
  vc: number;  // billions USD
}

export const VC_INVESTMENT_HISTORY: VCHistoryPoint[] = [
  { year: 2000, vc: 105 },
  { year: 2001, vc: 40  },
  { year: 2002, vc: 22  },
  { year: 2003, vc: 19  },
  { year: 2004, vc: 22  },
  { year: 2005, vc: 29  },
  { year: 2006, vc: 31  },
  { year: 2007, vc: 35  },
  { year: 2008, vc: 31  },
  { year: 2009, vc: 20  },
  { year: 2010, vc: 30  },
  { year: 2011, vc: 33  },
  { year: 2012, vc: 37  },
  { year: 2013, vc: 44  },
  { year: 2014, vc: 60  },
  { year: 2015, vc: 77  },
  { year: 2016, vc: 71  },
  { year: 2017, vc: 85  },
  { year: 2018, vc: 140 },
  { year: 2019, vc: 136 },
  { year: 2020, vc: 167 },
  { year: 2021, vc: 348 },
  { year: 2022, vc: 242 },
  { year: 2023, vc: 171 },
  { year: 2024, vc: 320 },
  { year: 2025, vc: 413 },
];

// ─── US Annual Real GDP Growth Rate (1970–2025) ───────────────────────────────
// Source: BEA National Income and Product Accounts (NIPA) / World Bank WDI
// Real GDP % change year-over-year (chained 2017 dollars).
// Recession years (NBER-defined) are flagged for visual highlighting.

export interface GdpGrowthRatePoint {
  year: number;
  growth: number;   // % YoY real GDP change
  recession: boolean;
}

export const US_ANNUAL_GDP_GROWTH: GdpGrowthRatePoint[] = [
  { year: 1970, growth:  0.2, recession: true  },
  { year: 1971, growth:  3.3, recession: false },
  { year: 1972, growth:  5.3, recession: false },
  { year: 1973, growth:  5.6, recession: false },
  { year: 1974, growth: -0.5, recession: true  },
  { year: 1975, growth: -0.2, recession: true  },
  { year: 1976, growth:  5.4, recession: false },
  { year: 1977, growth:  4.6, recession: false },
  { year: 1978, growth:  5.5, recession: false },
  { year: 1979, growth:  3.2, recession: false },
  { year: 1980, growth: -0.3, recession: true  },
  { year: 1981, growth:  2.5, recession: true  },
  { year: 1982, growth: -1.8, recession: true  },
  { year: 1983, growth:  4.6, recession: false },
  { year: 1984, growth:  7.2, recession: false },
  { year: 1985, growth:  4.2, recession: false },
  { year: 1986, growth:  3.5, recession: false },
  { year: 1987, growth:  3.5, recession: false },
  { year: 1988, growth:  4.2, recession: false },
  { year: 1989, growth:  3.7, recession: false },
  { year: 1990, growth:  1.9, recession: true  },
  { year: 1991, growth: -0.1, recession: true  },
  { year: 1992, growth:  3.5, recession: false },
  { year: 1993, growth:  2.8, recession: false },
  { year: 1994, growth:  4.0, recession: false },
  { year: 1995, growth:  2.7, recession: false },
  { year: 1996, growth:  3.8, recession: false },
  { year: 1997, growth:  4.4, recession: false },
  { year: 1998, growth:  4.5, recession: false },
  { year: 1999, growth:  4.8, recession: false },
  { year: 2000, growth:  4.1, recession: false },
  { year: 2001, growth:  1.0, recession: true  },
  { year: 2002, growth:  1.7, recession: false },
  { year: 2003, growth:  2.9, recession: false },
  { year: 2004, growth:  3.8, recession: false },
  { year: 2005, growth:  3.5, recession: false },
  { year: 2006, growth:  2.8, recession: false },
  { year: 2007, growth:  2.0, recession: false },
  { year: 2008, growth:  0.1, recession: true  },
  { year: 2009, growth: -2.6, recession: true  },
  { year: 2010, growth:  2.7, recession: false },
  { year: 2011, growth:  1.5, recession: false },
  { year: 2012, growth:  2.3, recession: false },
  { year: 2013, growth:  1.8, recession: false },
  { year: 2014, growth:  2.5, recession: false },
  { year: 2015, growth:  3.1, recession: false },
  { year: 2016, growth:  1.7, recession: false },
  { year: 2017, growth:  2.3, recession: false },
  { year: 2018, growth:  2.9, recession: false },
  { year: 2019, growth:  2.3, recession: false },
  { year: 2020, growth: -2.2, recession: true  },
  { year: 2021, growth:  5.8, recession: false },
  { year: 2022, growth:  1.9, recession: false },
  { year: 2023, growth:  2.9, recession: false },
  { year: 2024, growth:  2.8, recession: false },
  { year: 2025, growth:  2.4, recession: false },
];

// ─── US Exports by Category (2025) ───────────────────────────────────────────
// Source: U.S. Census Bureau / BEA FT-900 Report (2025 Annual)
// Top export categories by value, illustrating depth and diversity of US exports.

export interface ExportCategoryPoint {
  category: string;
  categoryRo: string;
  value: number;   // billions USD
  emoji: string;
}

export const US_EXPORTS_BY_CATEGORY: ExportCategoryPoint[] = [
  { category: "Energy & Fuels",         categoryRo: "Energie & Combustibili",        value: 309, emoji: "⚡" },
  { category: "Machinery & Computers",  categoryRo: "Utilaje & Computere",           value: 284, emoji: "⚙️" },
  { category: "Electrical Equipment",   categoryRo: "Echipamente Electrice",         value: 226, emoji: "🔌" },
  { category: "Aircraft & Aerospace",   categoryRo: "Aviație & Spațial",             value: 164, emoji: "✈️" },
  { category: "Precious Metals & Gold", categoryRo: "Metale Prețioase & Aur",        value: 149, emoji: "🥇" },
  { category: "Vehicles",               categoryRo: "Autovehicule",                  value: 131, emoji: "🚗" },
  { category: "Medical & Optical Inst.",categoryRo: "Aparatură Medicală & Optică",   value: 106, emoji: "🔬" },
  { category: "Pharmaceuticals",        categoryRo: "Produse Farmaceutice",          value: 120, emoji: "💊" },
];

// ─── Labor Productivity: US vs Peers ─────────────────────────────────────────
// Source: OECD.Stat – GDP per hour worked, current USD PPP (2024 data)
// The US leads all major economies in output per hour worked.

export interface ProductivityPoint {
  country: string;
  countryRo: string;
  value: number;   // USD PPP per hour worked
  highlight?: boolean;
}

export const LABOR_PRODUCTIVITY_COMPARISON: ProductivityPoint[] = [
  { country: "United States", countryRo: "Statele Unite",  value: 97.1, highlight: true },
  { country: "Germany",       countryRo: "Germania",       value: 93.8 },
  { country: "France",        countryRo: "Franța",         value: 88.2 },
  { country: "Canada",        countryRo: "Canada",         value: 75.3 },
  { country: "United Kingdom",countryRo: "Marea Britanie", value: 78.1 },
  { country: "Italy",         countryRo: "Italia",         value: 70.4 },
  { country: "Japan",         countryRo: "Japonia",        value: 56.3 },
  { country: "South Korea",   countryRo: "Coreea de Sud",  value: 54.6 },
  { country: "China",         countryRo: "China",          value: 28.1 },
];

// ─── US IPO Market History (2020–2025) ───────────────────────────────────────
// Source: Renaissance Capital (IPOs with market cap ≥ $50M)
// Tracks the full cycle: SPAC boom → rate hike freeze → AI-led rebound.

export interface IPOMarketPoint {
  year: number;
  deals: number;       // number of IPOs
  proceeds: number;    // USD billions raised
}

export const US_IPO_MARKET_HISTORY: IPOMarketPoint[] = [
  { year: 2020, deals: 221, proceeds:  78.2 },
  { year: 2021, deals: 397, proceeds: 142.4 },
  { year: 2022, deals:  71, proceeds:   7.7 },
  { year: 2023, deals: 109, proceeds:  19.5 },
  { year: 2024, deals: 150, proceeds:  29.6 },
  { year: 2025, deals: 202, proceeds:  44.0 },
];

// ─── US 10-Year Treasury Yield History (2000–2025) ───────────────────────────
// Source: Federal Reserve FRED Series DGS10
// Annual averages of daily constant maturity yields.
// Shows the "risk-free rate" journey: from post-dot-com highs → ZIRP → taper → rate hike cycle.

export interface TreasuryYieldPoint {
  year: number;
  yield: number;  // % annual average
}

export const US_TREASURY_10Y_HISTORY: TreasuryYieldPoint[] = [
  { year: 2000, yield: 6.03 },
  { year: 2001, yield: 5.02 },
  { year: 2002, yield: 4.61 },
  { year: 2003, yield: 4.01 },
  { year: 2004, yield: 4.27 },
  { year: 2005, yield: 4.29 },
  { year: 2006, yield: 4.80 },
  { year: 2007, yield: 4.63 },
  { year: 2008, yield: 3.66 },
  { year: 2009, yield: 3.26 },
  { year: 2010, yield: 3.22 },
  { year: 2011, yield: 2.78 },
  { year: 2012, yield: 1.80 },
  { year: 2013, yield: 2.35 },
  { year: 2014, yield: 2.54 },
  { year: 2015, yield: 2.14 },
  { year: 2016, yield: 1.84 },
  { year: 2017, yield: 2.33 },
  { year: 2018, yield: 2.91 },
  { year: 2019, yield: 2.14 },
  { year: 2020, yield: 0.89 },
  { year: 2021, yield: 1.45 },
  { year: 2022, yield: 2.95 },
  { year: 2023, yield: 4.05 },
  { year: 2024, yield: 4.29 },
  { year: 2025, yield: 4.35 },
];

// ─── Private Markets AUM by Firm ─────────────────────────────────────────────
// Source: Company filings, Preqin, Bloomberg 2025
// Top US alternative asset managers by AUM (USD billions).
// US firms dominate global alternatives — 8 of the top 10 are American.

export interface PrivateMarketsFirmPoint {
  firm: string;
  firmRo: string;
  aum: number;      // USD billions
  specialty: string;
  specialtyRo: string;
  highlight?: boolean;
}

export const PRIVATE_MARKETS_TOP_FIRMS: PrivateMarketsFirmPoint[] = [
  {
    firm: "Blackstone",
    firmRo: "Blackstone",
    aum: 1300,
    specialty: "RE, PE, Credit, Infrastructure",
    specialtyRo: "Imobiliare, PE, Credit, Infrastructură",
    highlight: true,
  },
  {
    firm: "KKR",
    firmRo: "KKR",
    aum: 744,
    specialty: "Buyouts, Credit, Infrastructure",
    specialtyRo: "Buyout-uri, Credit, Infrastructură",
  },
  {
    firm: "Apollo Global",
    firmRo: "Apollo Global",
    aum: 650,
    specialty: "Credit, PE, Real Assets",
    specialtyRo: "Credit, PE, Active Reale",
  },
  {
    firm: "Carlyle Group",
    firmRo: "Carlyle Group",
    aum: 425,
    specialty: "Global PE, Credit",
    specialtyRo: "PE Global, Credit",
  },
  {
    firm: "Ares Management",
    firmRo: "Ares Management",
    aum: 464,
    specialty: "Private Credit, RE, PE",
    specialtyRo: "Credit Privat, Imobiliare, PE",
  },
  {
    firm: "Warburg Pincus",
    firmRo: "Warburg Pincus",
    aum: 83,
    specialty: "Growth Equity, Buyouts",
    specialtyRo: "Growth Equity, Buyout-uri",
  },
];

// ─── VC Deal Stage Breakdown (2025) ──────────────────────────────────────────
// Source: NVCA / PitchBook Venture Monitor 2025 Full-Year
// Shows where capital is concentrated: early-stage vs late-stage vs mega-deals.

export interface VCDealStagePoint {
  stage: string;
  stageRo: string;
  dealCount: number;    // number of rounds
  capital: number;      // USD billions invested
  color: string;
}

export const VC_DEAL_STAGE_BREAKDOWN: VCDealStagePoint[] = [
  {
    stage: "Angel / Pre-Seed",
    stageRo: "Angel / Pre-Seed",
    dealCount: 5800,
    capital: 8.2,
    color: "#E8B923",
  },
  {
    stage: "Seed",
    stageRo: "Seed (Sămânță)",
    dealCount: 4200,
    capital: 16.4,
    color: "#60A5FA",
  },
  {
    stage: "Early Venture (A/B)",
    stageRo: "Venture Timpuriu (A/B)",
    dealCount: 3100,
    capital: 58.7,
    color: "#34D399",
  },
  {
    stage: "Late Venture (C/D+)",
    stageRo: "Venture Târziu (C/D+)",
    dealCount: 1400,
    capital: 112.5,
    color: "#A78BFA",
  },
  {
    stage: "Mega-Rounds ($1B+)",
    stageRo: "Runde Mega ($1Mld+)",
    dealCount: 180,
    capital: 217.2,
    color: "#F97316",
  },
];

// ─── Market volatility: the CBOE VIX ─────────────────────────────────────────
// Daily VIX averaged by month (1990→today). The "fear index": it sits in the
// teens in calm markets and spikes when the floor drops out. Record daily highs
// are 82.69 (16 Mar 2020, COVID) and 80.86 (20 Nov 2008, the financial crisis) —
// `high` keeps the monthly peak so those spikes stay visible under the average.
// Source: CBOE via FRED (VIXCLS).
export interface VixPoint { month: string; avg: number; high: number; }
export const VIX_HISTORY: VixPoint[] = [
  { month: "1990-01", avg: 23.35, high: 27.25 },
  { month: "1990-02", avg: 23.26, high: 24.87 },
  { month: "1990-03", avg: 20.06, high: 22.74 },
  { month: "1990-04", avg: 21.4, high: 24.16 },
  { month: "1990-05", avg: 18.1, high: 20.14 },
  { month: "1990-06", avg: 16.82, high: 19.36 },
  { month: "1990-07", avg: 18.39, high: 23.68 },
  { month: "1990-08", avg: 28.18, high: 36.47 },
  { month: "1990-09", avg: 29.11, high: 30.56 },
  { month: "1990-10", avg: 29.63, high: 33.98 },
  { month: "1990-11", avg: 24.89, high: 30.87 },
  { month: "1990-12", avg: 23.36, high: 26.38 },
  { month: "1991-01", avg: 27.43, high: 36.2 },
  { month: "1991-02", avg: 21.6, high: 23.6 },
  { month: "1991-03", avg: 17.74, high: 21.05 },
  { month: "1991-04", avg: 17.37, high: 20.12 },
  { month: "1991-05", avg: 16.93, high: 18.38 },
  { month: "1991-06", avg: 17.13, high: 19.55 },
  { month: "1991-07", avg: 17.29, high: 20.29 },
  { month: "1991-08", avg: 15.68, high: 21.19 },
  { month: "1991-09", avg: 16.96, high: 18.22 },
  { month: "1991-10", avg: 16.36, high: 18.58 },
  { month: "1991-11", avg: 17.77, high: 21.92 },
  { month: "1991-12", avg: 18.35, high: 20.57 },
  { month: "1992-01", avg: 17.68, high: 19.23 },
  { month: "1992-02", avg: 17.48, high: 18.79 },
  { month: "1992-03", avg: 17.52, high: 19.79 },
  { month: "1992-04", avg: 16.56, high: 20.15 },
  { month: "1992-05", avg: 15.08, high: 16.92 },
  { month: "1992-06", avg: 15.2, high: 18.2 },
  { month: "1992-07", avg: 13.6, high: 15.83 },
  { month: "1992-08", avg: 14.42, high: 16.19 },
  { month: "1992-09", avg: 13.7, high: 15.19 },
  { month: "1992-10", avg: 17.64, high: 21.02 },
  { month: "1992-11", avg: 14.42, high: 17.33 },
  { month: "1992-12", avg: 12.19, high: 12.8 },
  { month: "1993-01", avg: 12.41, high: 14.72 },
  { month: "1993-02", avg: 13.72, high: 15.9 },
  { month: "1993-03", avg: 13.61, high: 16.22 },
  { month: "1993-04", avg: 12.84, high: 15.25 },
  { month: "1993-05", avg: 13.61, high: 14.76 },
  { month: "1993-06", avg: 12.52, high: 14.74 },
  { month: "1993-07", avg: 11.5, high: 13.87 },
  { month: "1993-08", avg: 11.93, high: 12.39 },
  { month: "1993-09", avg: 12.93, high: 17.3 },
  { month: "1993-10", avg: 11.88, high: 13.14 },
  { month: "1993-11", avg: 14.08, high: 15.9 },
  { month: "1993-12", avg: 11.36, high: 13.83 },
  { month: "1994-01", avg: 11.29, high: 12.57 },
  { month: "1994-02", avg: 13.64, high: 15.96 },
  { month: "1994-03", avg: 15.22, high: 20.45 },
  { month: "1994-04", avg: 16.47, high: 23.87 },
  { month: "1994-05", avg: 13.9, high: 16.16 },
  { month: "1994-06", avg: 13.41, high: 16.72 },
  { month: "1994-07", avg: 12.48, high: 14.92 },
  { month: "1994-08", avg: 11.89, high: 12.83 },
  { month: "1994-09", avg: 13.23, high: 14.56 },
  { month: "1994-10", avg: 15.25, high: 16.97 },
  { month: "1994-11", avg: 16.38, high: 18.41 },
  { month: "1994-12", avg: 14.18, high: 18.15 },
  { month: "1995-01", avg: 12.27, high: 14.25 },
  { month: "1995-02", avg: 11.47, high: 12.51 },
  { month: "1995-03", avg: 12.17, high: 14.22 },
  { month: "1995-04", avg: 12.44, high: 13.5 },
  { month: "1995-05", avg: 12.27, high: 13.13 },
  { month: "1995-06", avg: 11.9, high: 13.45 },
  { month: "1995-07", avg: 12.51, high: 13.49 },
  { month: "1995-08", avg: 12.8, high: 13.78 },
  { month: "1995-09", avg: 12.06, high: 13.22 },
  { month: "1995-10", avg: 14.36, high: 15.74 },
  { month: "1995-11", avg: 12.47, high: 13.41 },
  { month: "1995-12", avg: 11.75, high: 14.55 },
  { month: "1996-01", avg: 13.47, high: 16.4 },
  { month: "1996-02", avg: 15.03, high: 17.04 },
  { month: "1996-03", avg: 17.76, high: 20.7 },
  { month: "1996-04", avg: 16.58, high: 20.22 },
  { month: "1996-05", avg: 16.15, high: 18.62 },
  { month: "1996-06", avg: 16.39, high: 18.64 },
  { month: "1996-07", avg: 17.98, high: 21.55 },
  { month: "1996-08", avg: 15.76, high: 18.76 },
  { month: "1996-09", avg: 16.58, high: 20.51 },
  { month: "1996-10", avg: 16.38, high: 18.48 },
  { month: "1996-11", avg: 16.0, high: 18.04 },
  { month: "1996-12", avg: 19.26, high: 21.99 },
  { month: "1997-01", avg: 19.47, high: 21.14 },
  { month: "1997-02", avg: 20.14, high: 21.41 },
  { month: "1997-03", avg: 20.17, high: 22.14 },
  { month: "1997-04", avg: 19.66, high: 21.34 },
  { month: "1997-05", avg: 19.92, high: 21.57 },
  { month: "1997-06", avg: 20.19, high: 21.82 },
  { month: "1997-07", avg: 20.53, high: 23.51 },
  { month: "1997-08", avg: 23.08, high: 24.76 },
  { month: "1997-09", avg: 23.81, high: 25.99 },
  { month: "1997-10", avg: 23.87, high: 38.2 },
  { month: "1997-11", avg: 32.21, high: 37.84 },
  { month: "1997-12", avg: 26.28, high: 30.27 },
  { month: "1998-01", avg: 23.87, high: 28.69 },
  { month: "1998-02", avg: 20.0, high: 21.55 },
  { month: "1998-03", avg: 20.16, high: 24.66 },
  { month: "1998-04", avg: 22.03, high: 26.09 },
  { month: "1998-05", avg: 20.87, high: 23.39 },
  { month: "1998-06", avg: 21.66, high: 25.94 },
  { month: "1998-07", avg: 19.93, high: 25.25 },
  { month: "1998-08", avg: 31.59, high: 44.28 },
  { month: "1998-09", avg: 38.2, high: 45.29 },
  { month: "1998-10", avg: 36.61, high: 45.74 },
  { month: "1998-11", avg: 26.22, high: 29.28 },
  { month: "1998-12", avg: 25.48, high: 31.31 },
  { month: "1999-01", avg: 28.04, high: 32.98 },
  { month: "1999-02", avg: 28.82, high: 31.36 },
  { month: "1999-03", avg: 25.31, high: 29.22 },
  { month: "1999-04", avg: 23.48, high: 26.42 },
  { month: "1999-05", avg: 26.2, high: 28.9 },
  { month: "1999-06", avg: 23.63, high: 26.62 },
  { month: "1999-07", avg: 21.05, high: 24.98 },
  { month: "1999-08", avg: 24.32, high: 28.45 },
  { month: "1999-09", avg: 24.54, high: 27.84 },
  { month: "1999-10", avg: 24.02, high: 28.75 },
  { month: "1999-11", avg: 21.82, high: 24.18 },
  { month: "1999-12", avg: 22.16, high: 24.76 },
  { month: "2000-01", avg: 23.2, high: 27.01 },
  { month: "2000-02", avg: 23.6, high: 26.0 },
  { month: "2000-03", avg: 22.72, high: 25.47 },
  { month: "2000-04", avg: 27.16, high: 33.49 },
  { month: "2000-05", avg: 26.37, high: 31.63 },
  { month: "2000-06", avg: 21.54, high: 23.05 },
  { month: "2000-07", avg: 19.89, high: 21.16 },
  { month: "2000-08", avg: 18.09, high: 20.55 },
  { month: "2000-09", avg: 19.69, high: 21.88 },
  { month: "2000-10", avg: 25.2, high: 30.51 },
  { month: "2000-11", avg: 26.38, high: 29.65 },
  { month: "2000-12", avg: 26.53, high: 31.74 },
  { month: "2001-01", avg: 24.92, high: 29.99 },
  { month: "2001-02", avg: 23.41, high: 28.35 },
  { month: "2001-03", avg: 28.5, high: 32.84 },
  { month: "2001-04", avg: 28.13, high: 34.72 },
  { month: "2001-05", avg: 22.94, high: 25.78 },
  { month: "2001-06", avg: 20.94, high: 23.17 },
  { month: "2001-07", avg: 22.32, high: 25.24 },
  { month: "2001-08", avg: 21.86, high: 25.41 },
  { month: "2001-09", avg: 35.07, high: 43.74 },
  { month: "2001-10", avg: 32.72, high: 35.31 },
  { month: "2001-11", avg: 26.63, high: 32.31 },
  { month: "2001-12", avg: 23.72, high: 25.91 },
  { month: "2002-01", avg: 22.25, high: 24.35 },
  { month: "2002-02", avg: 22.88, high: 26.09 },
  { month: "2002-03", avg: 18.98, high: 20.5 },
  { month: "2002-04", avg: 19.9, high: 24.05 },
  { month: "2002-05", avg: 20.09, high: 22.56 },
  { month: "2002-06", avg: 25.27, high: 28.42 },
  { month: "2002-07", avg: 34.05, high: 44.92 },
  { month: "2002-08", avg: 33.74, high: 45.08 },
  { month: "2002-09", avg: 37.65, high: 40.65 },
  { month: "2002-10", avg: 35.24, high: 42.64 },
  { month: "2002-11", avg: 28.18, high: 31.42 },
  { month: "2002-12", avg: 28.21, high: 30.78 },
  { month: "2003-01", avg: 27.42, high: 34.69 },
  { month: "2003-02", avg: 32.22, high: 34.33 },
  { month: "2003-03", avg: 30.63, high: 33.61 },
  { month: "2003-04", avg: 23.99, high: 29.13 },
  { month: "2003-05", avg: 20.24, high: 21.59 },
  { month: "2003-06", avg: 20.36, high: 22.15 },
  { month: "2003-07", avg: 19.16, high: 20.22 },
  { month: "2003-08", avg: 19.27, high: 22.68 },
  { month: "2003-09", avg: 19.53, high: 22.72 },
  { month: "2003-10", avg: 18.02, high: 21.07 },
  { month: "2003-11", avg: 17.4, high: 19.48 },
  { month: "2003-12", avg: 16.83, high: 18.31 },
  { month: "2004-01", avg: 16.1, high: 18.22 },
  { month: "2004-02", avg: 16.0, high: 17.87 },
  { month: "2004-03", avg: 17.69, high: 21.58 },
  { month: "2004-04", avg: 15.7, high: 17.26 },
  { month: "2004-05", avg: 17.71, high: 19.96 },
  { month: "2004-06", avg: 15.34, high: 17.03 },
  { month: "2004-07", avg: 15.5, high: 17.3 },
  { month: "2004-08", avg: 16.68, high: 19.34 },
  { month: "2004-09", avg: 14.08, high: 14.91 },
  { month: "2004-10", avg: 14.97, high: 16.58 },
  { month: "2004-11", avg: 13.58, high: 16.27 },
  { month: "2004-12", avg: 12.46, high: 13.67 },
  { month: "2005-01", avg: 13.44, high: 14.65 },
  { month: "2005-02", avg: 11.71, high: 13.14 },
  { month: "2005-03", avg: 13.13, high: 14.49 },
  { month: "2005-04", avg: 14.46, high: 17.74 },
  { month: "2005-05", avg: 13.97, high: 16.32 },
  { month: "2005-06", avg: 11.87, high: 12.7 },
  { month: "2005-07", avg: 11.05, high: 12.49 },
  { month: "2005-08", avg: 12.95, high: 14.17 },
  { month: "2005-09", avg: 12.63, high: 13.79 },
  { month: "2005-10", avg: 14.94, high: 16.47 },
  { month: "2005-11", avg: 12.15, high: 14.85 },
  { month: "2005-12", avg: 11.26, high: 12.21 },
  { month: "2006-01", avg: 12.04, high: 14.56 },
  { month: "2006-02", avg: 12.47, high: 13.59 },
  { month: "2006-03", avg: 11.69, high: 12.74 },
  { month: "2006-04", avg: 11.85, high: 13.0 },
  { month: "2006-05", avg: 14.45, high: 18.66 },
  { month: "2006-06", avg: 16.92, high: 23.81 },
  { month: "2006-07", avg: 15.33, high: 18.64 },
  { month: "2006-08", avg: 13.35, high: 15.23 },
  { month: "2006-09", avg: 12.18, high: 13.88 },
  { month: "2006-10", avg: 11.31, high: 12.57 },
  { month: "2006-11", avg: 10.82, high: 12.3 },
  { month: "2006-12", avg: 10.96, high: 12.67 },
  { month: "2007-01", avg: 11.04, high: 12.14 },
  { month: "2007-02", avg: 11.16, high: 18.31 },
  { month: "2007-03", avg: 15.16, high: 19.63 },
  { month: "2007-04", avg: 12.93, high: 14.53 },
  { month: "2007-05", avg: 13.3, high: 14.08 },
  { month: "2007-06", avg: 14.95, high: 18.89 },
  { month: "2007-07", avg: 17.27, high: 24.17 },
  { month: "2007-08", avg: 25.03, high: 30.83 },
  { month: "2007-09", avg: 22.2, high: 27.38 },
  { month: "2007-10", avg: 19.12, high: 22.96 },
  { month: "2007-11", avg: 25.58, high: 31.09 },
  { month: "2007-12", avg: 21.65, high: 24.52 },
  { month: "2008-01", avg: 25.82, high: 31.01 },
  { month: "2008-02", avg: 25.46, high: 28.97 },
  { month: "2008-03", avg: 27.1, high: 32.24 },
  { month: "2008-04", avg: 21.56, high: 23.82 },
  { month: "2008-05", avg: 18.3, high: 19.73 },
  { month: "2008-06", avg: 22.11, high: 24.12 },
  { month: "2008-07", avg: 24.32, high: 28.54 },
  { month: "2008-08", avg: 20.7, high: 23.49 },
  { month: "2008-09", avg: 30.24, high: 46.72 },
  { month: "2008-10", avg: 61.18, high: 80.06 },
  { month: "2008-11", avg: 62.67, high: 80.86 },
  { month: "2008-12", avg: 52.41, high: 68.51 },
  { month: "2009-01", avg: 44.68, high: 56.65 },
  { month: "2009-02", avg: 45.57, high: 52.62 },
  { month: "2009-03", avg: 44.8, high: 52.65 },
  { month: "2009-04", avg: 38.06, high: 42.28 },
  { month: "2009-05", avg: 31.98, high: 35.3 },
  { month: "2009-06", avg: 29.14, high: 32.68 },
  { month: "2009-07", avg: 26.16, high: 31.3 },
  { month: "2009-08", avg: 25.34, high: 27.89 },
  { month: "2009-09", avg: 24.93, high: 29.15 },
  { month: "2009-10", avg: 24.25, high: 30.69 },
  { month: "2009-11", avg: 23.79, high: 29.78 },
  { month: "2009-12", avg: 21.24, high: 23.69 },
  { month: "2010-01", avg: 20.64, high: 27.31 },
  { month: "2010-02", avg: 22.54, high: 26.51 },
  { month: "2010-03", avg: 17.77, high: 19.26 },
  { month: "2010-04", avg: 17.42, high: 22.81 },
  { month: "2010-05", avg: 31.93, high: 45.79 },
  { month: "2010-06", avg: 29.92, high: 36.57 },
  { month: "2010-07", avg: 25.57, high: 32.86 },
  { month: "2010-08", avg: 24.75, high: 27.46 },
  { month: "2010-09", avg: 22.52, high: 23.89 },
  { month: "2010-10", avg: 20.37, high: 23.53 },
  { month: "2010-11", avg: 20.1, high: 23.54 },
  { month: "2010-12", avg: 17.57, high: 21.36 },
  { month: "2011-01", avg: 17.32, high: 20.04 },
  { month: "2011-02", avg: 17.43, high: 22.13 },
  { month: "2011-03", avg: 20.72, high: 29.4 },
  { month: "2011-04", avg: 16.24, high: 17.87 },
  { month: "2011-05", avg: 16.91, high: 18.4 },
  { month: "2011-06", avg: 19.15, high: 22.73 },
  { month: "2011-07", avg: 19.23, high: 25.25 },
  { month: "2011-08", avg: 35.03, high: 48.0 },
  { month: "2011-09", avg: 36.53, high: 42.96 },
  { month: "2011-10", avg: 32.83, high: 45.45 },
  { month: "2011-11", avg: 31.94, high: 36.16 },
  { month: "2011-12", avg: 25.05, high: 30.59 },
  { month: "2012-01", avg: 20.23, high: 22.97 },
  { month: "2012-02", avg: 18.42, high: 21.14 },
  { month: "2012-03", avg: 16.17, high: 20.87 },
  { month: "2012-04", avg: 17.82, high: 20.39 },
  { month: "2012-05", avg: 21.0, high: 25.1 },
  { month: "2012-06", avg: 21.13, high: 26.66 },
  { month: "2012-07", avg: 17.57, high: 20.47 },
  { month: "2012-08", avg: 15.69, high: 18.96 },
  { month: "2012-09", avg: 15.28, high: 17.98 },
  { month: "2012-10", avg: 16.28, high: 18.83 },
  { month: "2012-11", avg: 16.7, high: 19.08 },
  { month: "2012-12", avg: 17.31, high: 22.72 },
  { month: "2013-01", avg: 13.51, high: 14.68 },
  { month: "2013-02", avg: 14.07, high: 18.99 },
  { month: "2013-03", avg: 13.03, high: 15.36 },
  { month: "2013-04", avg: 13.97, high: 17.56 },
  { month: "2013-05", avg: 13.49, high: 16.3 },
  { month: "2013-06", avg: 17.27, high: 20.49 },
  { month: "2013-07", avg: 13.97, high: 16.44 },
  { month: "2013-08", avg: 14.21, high: 17.01 },
  { month: "2013-09", avg: 14.69, high: 16.61 },
  { month: "2013-10", avg: 15.41, high: 20.34 },
  { month: "2013-11", avg: 12.92, high: 13.91 },
  { month: "2013-12", avg: 14.19, high: 16.21 },
  { month: "2014-01", avg: 14.24, high: 18.41 },
  { month: "2014-02", avg: 15.47, high: 21.44 },
  { month: "2014-03", avg: 14.84, high: 17.82 },
  { month: "2014-04", avg: 14.2, high: 17.03 },
  { month: "2014-05", avg: 12.48, high: 13.8 },
  { month: "2014-06", avg: 11.54, high: 12.65 },
  { month: "2014-07", avg: 12.3, high: 16.95 },
  { month: "2014-08", avg: 13.49, high: 17.03 },
  { month: "2014-09", avg: 13.47, high: 16.31 },
  { month: "2014-10", avg: 18.06, high: 26.25 },
  { month: "2014-11", avg: 13.41, high: 14.89 },
  { month: "2014-12", avg: 16.29, high: 23.57 },
  { month: "2015-01", avg: 19.12, high: 22.39 },
  { month: "2015-02", avg: 15.9, high: 19.43 },
  { month: "2015-03", avg: 14.81, high: 16.87 },
  { month: "2015-04", avg: 13.49, high: 15.11 },
  { month: "2015-05", avg: 13.34, high: 15.15 },
  { month: "2015-06", avg: 14.34, high: 18.85 },
  { month: "2015-07", avg: 14.35, high: 19.97 },
  { month: "2015-08", avg: 19.43, high: 40.74 },
  { month: "2015-09", avg: 24.38, high: 31.4 },
  { month: "2015-10", avg: 16.79, high: 22.55 },
  { month: "2015-11", avg: 16.21, high: 20.08 },
  { month: "2015-12", avg: 18.03, high: 24.39 },
  { month: "2016-01", avg: 23.72, high: 27.59 },
  { month: "2016-02", avg: 22.52, high: 28.14 },
  { month: "2016-03", avg: 15.85, high: 18.67 },
  { month: "2016-04", avg: 14.3, high: 16.26 },
  { month: "2016-05", avg: 14.85, high: 16.33 },
  { month: "2016-06", avg: 17.77, high: 25.76 },
  { month: "2016-07", avg: 13.16, high: 15.58 },
  { month: "2016-08", avg: 12.4, high: 13.65 },
  { month: "2016-09", avg: 14.22, high: 18.14 },
  { month: "2016-10", avg: 14.59, high: 17.06 },
  { month: "2016-11", avg: 15.24, high: 22.51 },
  { month: "2016-12", avg: 12.47, high: 14.12 },
  { month: "2017-01", avg: 11.61, high: 12.85 },
  { month: "2017-02", avg: 11.53, high: 12.92 },
  { month: "2017-03", avg: 11.9, high: 13.12 },
  { month: "2017-04", avg: 13.14, high: 15.96 },
  { month: "2017-05", avg: 10.86, high: 15.59 },
  { month: "2017-06", avg: 10.51, high: 11.46 },
  { month: "2017-07", avg: 10.26, high: 12.54 },
  { month: "2017-08", avg: 11.98, high: 16.04 },
  { month: "2017-09", avg: 10.44, high: 12.23 },
  { month: "2017-10", avg: 10.13, high: 11.3 },
  { month: "2017-11", avg: 10.54, high: 13.13 },
  { month: "2017-12", avg: 10.26, high: 11.68 },
  { month: "2018-01", avg: 11.06, high: 14.79 },
  { month: "2018-02", avg: 22.46, high: 37.32 },
  { month: "2018-03", avg: 19.02, high: 24.87 },
  { month: "2018-04", avg: 18.27, high: 23.62 },
  { month: "2018-05", avg: 14.12, high: 17.02 },
  { month: "2018-06", avg: 13.68, high: 17.91 },
  { month: "2018-07", avg: 13.15, high: 16.14 },
  { month: "2018-08", avg: 12.55, high: 14.78 },
  { month: "2018-09", avg: 12.91, high: 14.88 },
  { month: "2018-10", avg: 19.35, high: 25.23 },
  { month: "2018-11", avg: 19.39, high: 22.48 },
  { month: "2018-12", avg: 24.95, high: 36.07 },
  { month: "2019-01", avg: 19.57, high: 25.45 },
  { month: "2019-02", avg: 15.23, high: 16.37 },
  { month: "2019-03", avg: 14.49, high: 16.59 },
  { month: "2019-04", avg: 12.95, high: 14.28 },
  { month: "2019-05", avg: 16.72, high: 20.55 },
  { month: "2019-06", avg: 15.84, high: 18.86 },
  { month: "2019-07", avg: 13.31, high: 16.12 },
  { month: "2019-08", avg: 18.98, high: 24.59 },
  { month: "2019-09", avg: 15.56, high: 19.66 },
  { month: "2019-10", avg: 15.47, high: 20.56 },
  { month: "2019-11", avg: 12.52, high: 13.13 },
  { month: "2019-12", avg: 13.76, high: 15.96 },
  { month: "2020-01", avg: 13.94, high: 18.84 },
  { month: "2020-02", avg: 19.63, high: 40.11 },
  { month: "2020-03", avg: 57.74, high: 82.69 },
  { month: "2020-04", avg: 41.45, high: 57.06 },
  { month: "2020-05", avg: 30.9, high: 37.19 },
  { month: "2020-06", avg: 31.12, high: 40.79 },
  { month: "2020-07", avg: 26.84, high: 32.19 },
  { month: "2020-08", avg: 22.89, high: 26.41 },
  { month: "2020-09", avg: 27.65, high: 33.6 },
  { month: "2020-10", avg: 29.44, high: 40.28 },
  { month: "2020-11", avg: 25.0, high: 37.13 },
  { month: "2020-12", avg: 22.37, high: 25.16 },
  { month: "2021-01", avg: 24.91, high: 37.21 },
  { month: "2021-02", avg: 23.14, high: 30.24 },
  { month: "2021-03", avg: 21.84, high: 28.57 },
  { month: "2021-04", avg: 17.42, high: 18.71 },
  { month: "2021-05", avg: 19.76, high: 27.59 },
  { month: "2021-06", avg: 16.96, high: 20.7 },
  { month: "2021-07", avg: 17.6, high: 22.5 },
  { month: "2021-08", avg: 17.47, high: 21.67 },
  { month: "2021-09", avg: 19.82, high: 25.71 },
  { month: "2021-10", avg: 17.87, high: 22.96 },
  { month: "2021-11", avg: 18.5, high: 28.62 },
  { month: "2021-12", avg: 21.35, high: 31.12 },
  { month: "2022-01", avg: 23.18, high: 31.96 },
  { month: "2022-02", avg: 25.75, high: 31.02 },
  { month: "2022-03", avg: 26.97, high: 36.45 },
  { month: "2022-04", avg: 24.37, high: 33.52 },
  { month: "2022-05", avg: 29.31, high: 34.75 },
  { month: "2022-06", avg: 28.23, high: 34.02 },
  { month: "2022-07", avg: 25.0, high: 27.54 },
  { month: "2022-08", avg: 22.17, high: 26.21 },
  { month: "2022-09", avg: 27.34, high: 32.6 },
  { month: "2022-10", avg: 30.01, high: 33.63 },
  { month: "2022-11", avg: 23.3, high: 26.09 },
  { month: "2022-12", avg: 21.78, high: 25.0 },
  { month: "2023-01", avg: 20.17, high: 22.9 },
  { month: "2023-02", avg: 20.12, high: 22.87 },
  { month: "2023-03", avg: 21.64, high: 26.52 },
  { month: "2023-04", avg: 17.82, high: 19.1 },
  { month: "2023-05", avg: 17.64, high: 20.09 },
  { month: "2023-06", avg: 14.0, high: 15.65 },
  { month: "2023-07", avg: 13.93, high: 15.44 },
  { month: "2023-08", avg: 15.85, high: 17.89 },
  { month: "2023-09", avg: 15.17, high: 18.94 },
  { month: "2023-10", avg: 18.89, high: 21.71 },
  { month: "2023-11", avg: 14.02, high: 16.87 },
  { month: "2023-12", avg: 12.72, high: 13.67 },
  { month: "2024-01", avg: 13.39, high: 14.79 },
  { month: "2024-02", avg: 13.98, high: 15.85 },
  { month: "2024-03", avg: 13.79, high: 15.22 },
  { month: "2024-04", avg: 16.14, high: 19.23 },
  { month: "2024-05", avg: 13.06, high: 15.39 },
  { month: "2024-06", avg: 12.67, high: 13.33 },
  { month: "2024-07", avg: 14.37, high: 18.46 },
  { month: "2024-08", avg: 19.31, high: 38.57 },
  { month: "2024-09", avg: 17.66, high: 22.38 },
  { month: "2024-10", avg: 19.96, high: 23.16 },
  { month: "2024-11", avg: 16.02, high: 21.98 },
  { month: "2024-12", avg: 15.87, high: 27.62 },
  { month: "2025-01", avg: 16.76, high: 19.54 },
  { month: "2025-02", avg: 16.97, high: 21.13 },
  { month: "2025-03", avg: 21.84, high: 27.86 },
  { month: "2025-04", avg: 31.97, high: 52.33 },
  { month: "2025-05", avg: 20.46, high: 24.76 },
  { month: "2025-06", avg: 18.4, high: 22.17 },
  { month: "2025-07", avg: 16.38, high: 17.79 },
  { month: "2025-08", avg: 15.75, high: 20.38 },
  { month: "2025-09", avg: 15.79, high: 17.17 },
  { month: "2025-10", avg: 18.09, high: 25.31 },
  { month: "2025-11", avg: 19.77, high: 26.42 },
  { month: "2025-12", avg: 15.55, high: 17.62 },
  { month: "2026-01", avg: 16.18, high: 20.09 },
  { month: "2026-02", avg: 19.21, high: 21.77 },
  { month: "2026-03", avg: 25.6, high: 31.05 },
  { month: "2026-04", avg: 19.81, high: 25.78 },
  { month: "2026-05", avg: 17.24, high: 18.43 },
  { month: "2026-06", avg: 17.91, high: 22.22 },
  { month: "2026-07", avg: 16.12, high: 17.16 },
];
export const VIX_META = {
  source: "CBOE Volatility Index via FRED (VIXCLS)",
  sourceHref: "https://fred.stlouisfed.org/series/VIXCLS",
  recordHigh: 82.69,
  recordHighDate: "2020-03-16",
  gfcHigh: 80.86,
} as const;

// ─── The market against the economy (the "Buffett Indicator") ────────────────
// Total value of U.S. corporate equities as a percent of GDP, quarterly since
// 1947. Buffett called this "probably the best single measure of where
// valuations stand at any given moment." Under 100% for most of the 20th
// century; it is now well over 200%.
// Source: Federal Reserve Z.1 (NCBEILQ027S) ÷ BEA GDP, via FRED.
export interface BuffettPoint { date: string; pct: number; }
export const BUFFETT_INDICATOR: BuffettPoint[] = [
  { date: "1947-10", pct: 36.6 },
  { date: "1948-10", pct: 33.6 },
  { date: "1949-10", pct: 38.4 },
  { date: "1950-10", pct: 39.6 },
  { date: "1951-10", pct: 41.4 },
  { date: "1952-01", pct: 42.1 },
  { date: "1952-04", pct: 43.7 },
  { date: "1952-07", pct: 42.7 },
  { date: "1952-10", pct: 38.5 },
  { date: "1953-01", pct: 36.9 },
  { date: "1953-04", pct: 34.2 },
  { date: "1953-07", pct: 33.0 },
  { date: "1953-10", pct: 37.3 },
  { date: "1954-01", pct: 40.5 },
  { date: "1954-04", pct: 44.7 },
  { date: "1954-07", pct: 49.1 },
  { date: "1954-10", pct: 48.7 },
  { date: "1955-01", pct: 48.9 },
  { date: "1955-04", pct: 53.5 },
  { date: "1955-07", pct: 56.0 },
  { date: "1955-10", pct: 55.9 },
  { date: "1956-01", pct: 59.7 },
  { date: "1956-04", pct: 56.7 },
  { date: "1956-07", pct: 54.7 },
  { date: "1956-10", pct: 58.3 },
  { date: "1957-01", pct: 54.1 },
  { date: "1957-04", pct: 57.9 },
  { date: "1957-07", pct: 51.2 },
  { date: "1957-10", pct: 51.8 },
  { date: "1958-01", pct: 55.9 },
  { date: "1958-04", pct: 59.0 },
  { date: "1958-07", pct: 63.9 },
  { date: "1958-10", pct: 65.0 },
  { date: "1959-01", pct: 65.1 },
  { date: "1959-04", pct: 66.3 },
  { date: "1959-07", pct: 64.7 },
  { date: "1959-10", pct: 68.5 },
  { date: "1960-01", pct: 62.5 },
  { date: "1960-04", pct: 64.2 },
  { date: "1960-07", pct: 58.9 },
  { date: "1960-10", pct: 67.6 },
  { date: "1961-01", pct: 75.3 },
  { date: "1961-04", pct: 74.1 },
  { date: "1961-07", pct: 74.6 },
  { date: "1961-10", pct: 75.4 },
  { date: "1962-01", pct: 72.0 },
  { date: "1962-04", pct: 54.4 },
  { date: "1962-07", pct: 56.7 },
  { date: "1962-10", pct: 69.3 },
  { date: "1963-01", pct: 72.1 },
  { date: "1963-04", pct: 74.5 },
  { date: "1963-07", pct: 75.7 },
  { date: "1963-10", pct: 71.2 },
  { date: "1964-01", pct: 73.9 },
  { date: "1964-04", pct: 75.3 },
  { date: "1964-07", pct: 76.4 },
  { date: "1964-10", pct: 78.3 },
  { date: "1965-01", pct: 78.0 },
  { date: "1965-04", pct: 73.9 },
  { date: "1965-07", pct: 78.5 },
  { date: "1965-10", pct: 80.8 },
  { date: "1966-01", pct: 76.2 },
  { date: "1966-04", pct: 72.2 },
  { date: "1966-07", pct: 63.8 },
  { date: "1966-10", pct: 65.7 },
  { date: "1967-01", pct: 74.1 },
  { date: "1967-04", pct: 75.5 },
  { date: "1967-07", pct: 78.4 },
  { date: "1967-10", pct: 80.8 },
  { date: "1968-01", pct: 71.8 },
  { date: "1968-04", pct: 78.2 },
  { date: "1968-07", pct: 76.6 },
  { date: "1968-10", pct: 87.1 },
  { date: "1969-01", pct: 80.9 },
  { date: "1969-04", pct: 76.8 },
  { date: "1969-07", pct: 72.2 },
  { date: "1969-10", pct: 67.9 },
  { date: "1970-01", pct: 64.5 },
  { date: "1970-04", pct: 50.8 },
  { date: "1970-07", pct: 58.4 },
  { date: "1970-10", pct: 64.5 },
  { date: "1971-01", pct: 68.3 },
  { date: "1971-04", pct: 67.3 },
  { date: "1971-07", pct: 65.0 },
  { date: "1971-10", pct: 69.2 },
  { date: "1972-01", pct: 70.9 },
  { date: "1972-04", pct: 69.1 },
  { date: "1972-07", pct: 69.2 },
  { date: "1972-10", pct: 77.7 },
  { date: "1973-01", pct: 70.5 },
  { date: "1973-04", pct: 63.9 },
  { date: "1973-07", pct: 66.5 },
  { date: "1973-10", pct: 54.8 },
  { date: "1974-01", pct: 52.6 },
  { date: "1974-04", pct: 47.3 },
  { date: "1974-07", pct: 34.6 },
  { date: "1974-10", pct: 34.9 },
  { date: "1975-01", pct: 42.4 },
  { date: "1975-04", pct: 47.9 },
  { date: "1975-07", pct: 41.0 },
  { date: "1975-10", pct: 42.8 },
  { date: "1976-01", pct: 47.7 },
  { date: "1976-04", pct: 47.9 },
  { date: "1976-07", pct: 47.6 },
  { date: "1976-10", pct: 47.9 },
  { date: "1977-01", pct: 43.1 },
  { date: "1977-04", pct: 42.9 },
  { date: "1977-07", pct: 39.9 },
  { date: "1977-10", pct: 37.8 },
  { date: "1978-01", pct: 35.1 },
  { date: "1978-04", pct: 35.7 },
  { date: "1978-07", pct: 37.4 },
  { date: "1978-10", pct: 34.6 },
  { date: "1979-01", pct: 36.1 },
  { date: "1979-04", pct: 35.5 },
  { date: "1979-07", pct: 36.8 },
  { date: "1979-10", pct: 37.3 },
  { date: "1980-01", pct: 34.3 },
  { date: "1980-04", pct: 38.5 },
  { date: "1980-07", pct: 42.5 },
  { date: "1980-10", pct: 45.1 },
  { date: "1981-01", pct: 43.2 },
  { date: "1981-04", pct: 41.6 },
  { date: "1981-07", pct: 34.8 },
  { date: "1981-10", pct: 37.4 },
  { date: "1982-01", pct: 33.3 },
  { date: "1982-04", pct: 32.2 },
  { date: "1982-07", pct: 34.8 },
  { date: "1982-10", pct: 40.7 },
  { date: "1983-01", pct: 44.2 },
  { date: "1983-04", pct: 48.5 },
  { date: "1983-07", pct: 46.3 },
  { date: "1983-10", pct: 43.0 },
  { date: "1984-01", pct: 39.1 },
  { date: "1984-04", pct: 36.3 },
  { date: "1984-07", pct: 37.8 },
  { date: "1984-10", pct: 37.5 },
  { date: "1985-01", pct: 39.5 },
  { date: "1985-04", pct: 40.6 },
  { date: "1985-07", pct: 37.4 },
  { date: "1985-10", pct: 43.2 },
  { date: "1986-01", pct: 47.4 },
  { date: "1986-04", pct: 49.4 },
  { date: "1986-07", pct: 44.1 },
  { date: "1986-10", pct: 48.1 },
  { date: "1987-01", pct: 57.4 },
  { date: "1987-04", pct: 57.9 },
  { date: "1987-07", pct: 60.3 },
  { date: "1987-10", pct: 45.7 },
  { date: "1988-01", pct: 47.7 },
  { date: "1988-04", pct: 48.5 },
  { date: "1988-07", pct: 46.6 },
  { date: "1988-10", pct: 47.4 },
  { date: "1989-01", pct: 48.5 },
  { date: "1989-04", pct: 50.6 },
  { date: "1989-07", pct: 53.7 },
  { date: "1989-10", pct: 54.6 },
  { date: "1990-01", pct: 51.2 },
  { date: "1990-04", pct: 52.6 },
  { date: "1990-07", pct: 44.1 },
  { date: "1990-10", pct: 49.2 },
  { date: "1991-01", pct: 56.3 },
  { date: "1991-04", pct: 54.8 },
  { date: "1991-07", pct: 57.0 },
  { date: "1991-10", pct: 63.9 },
  { date: "1992-01", pct: 61.5 },
  { date: "1992-04", pct: 59.9 },
  { date: "1992-07", pct: 60.5 },
  { date: "1992-10", pct: 65.4 },
  { date: "1993-01", pct: 66.8 },
  { date: "1993-04", pct: 66.3 },
  { date: "1993-07", pct: 67.5 },
  { date: "1993-10", pct: 69.4 },
  { date: "1994-01", pct: 65.5 },
  { date: "1994-04", pct: 63.1 },
  { date: "1994-07", pct: 65.9 },
  { date: "1994-10", pct: 64.8 },
  { date: "1995-01", pct: 69.2 },
  { date: "1995-04", pct: 74.3 },
  { date: "1995-07", pct: 78.9 },
  { date: "1995-10", pct: 83.0 },
  { date: "1996-01", pct: 85.5 },
  { date: "1996-04", pct: 87.6 },
  { date: "1996-07", pct: 87.3 },
  { date: "1996-10", pct: 89.6 },
  { date: "1997-01", pct: 89.1 },
  { date: "1997-04", pct: 100.9 },
  { date: "1997-07", pct: 107.4 },
  { date: "1997-10", pct: 107.6 },
  { date: "1998-01", pct: 121.7 },
  { date: "1998-04", pct: 122.4 },
  { date: "1998-07", pct: 108.7 },
  { date: "1998-10", pct: 127.8 },
  { date: "1999-01", pct: 129.2 },
  { date: "1999-04", pct: 138.7 },
  { date: "1999-07", pct: 131.1 },
  { date: "1999-10", pct: 155.4 },
  { date: "2000-01", pct: 162.6 },
  { date: "2000-04", pct: 152.4 },
  { date: "2000-07", pct: 147.9 },
  { date: "2000-10", pct: 128.0 },
  { date: "2001-01", pct: 112.7 },
  { date: "2001-04", pct: 119.4 },
  { date: "2001-07", pct: 100.1 },
  { date: "2001-10", pct: 112.0 },
  { date: "2002-01", pct: 111.3 },
  { date: "2002-04", pct: 95.7 },
  { date: "2002-07", pct: 78.9 },
  { date: "2002-10", pct: 83.8 },
  { date: "2003-01", pct: 80.8 },
  { date: "2003-04", pct: 91.7 },
  { date: "2003-07", pct: 93.1 },
  { date: "2003-10", pct: 101.4 },
  { date: "2004-01", pct: 103.5 },
  { date: "2004-04", pct: 104.3 },
  { date: "2004-07", pct: 100.3 },
  { date: "2004-10", pct: 107.9 },
  { date: "2005-01", pct: 105.5 },
  { date: "2005-04", pct: 106.3 },
  { date: "2005-07", pct: 108.2 },
  { date: "2005-10", pct: 106.7 },
  { date: "2006-01", pct: 112.0 },
  { date: "2006-04", pct: 107.2 },
  { date: "2006-07", pct: 109.2 },
  { date: "2006-10", pct: 114.1 },
  { date: "2007-01", pct: 117.2 },
  { date: "2007-04", pct: 120.8 },
  { date: "2007-07", pct: 120.6 },
  { date: "2007-10", pct: 114.9 },
  { date: "2008-01", pct: 106.1 },
  { date: "2008-04", pct: 103.9 },
  { date: "2008-07", pct: 92.8 },
  { date: "2008-10", pct: 75.6 },
  { date: "2009-01", pct: 69.0 },
  { date: "2009-04", pct: 78.9 },
  { date: "2009-07", pct: 89.8 },
  { date: "2009-10", pct: 93.3 },
  { date: "2010-01", pct: 96.3 },
  { date: "2010-04", pct: 85.3 },
  { date: "2010-07", pct: 93.5 },
  { date: "2010-10", pct: 101.7 },
  { date: "2011-01", pct: 107.9 },
  { date: "2011-04", pct: 106.2 },
  { date: "2011-07", pct: 90.7 },
  { date: "2011-10", pct: 98.5 },
  { date: "2012-01", pct: 105.9 },
  { date: "2012-04", pct: 102.1 },
  { date: "2012-07", pct: 108.1 },
  { date: "2012-10", pct: 106.5 },
  { date: "2013-01", pct: 118.0 },
  { date: "2013-04", pct: 119.5 },
  { date: "2013-07", pct: 124.4 },
  { date: "2013-10", pct: 131.9 },
  { date: "2014-01", pct: 136.3 },
  { date: "2014-04", pct: 139.9 },
  { date: "2014-07", pct: 136.6 },
  { date: "2014-10", pct: 141.4 },
  { date: "2015-01", pct: 141.1 },
  { date: "2015-04", pct: 137.8 },
  { date: "2015-07", pct: 126.5 },
  { date: "2015-10", pct: 132.1 },
  { date: "2016-01", pct: 133.7 },
  { date: "2016-04", pct: 135.0 },
  { date: "2016-07", pct: 136.8 },
  { date: "2016-10", pct: 135.5 },
  { date: "2017-01", pct: 141.4 },
  { date: "2017-04", pct: 142.5 },
  { date: "2017-07", pct: 144.5 },
  { date: "2017-10", pct: 149.9 },
  { date: "2018-01", pct: 146.3 },
  { date: "2018-04", pct: 149.9 },
  { date: "2018-07", pct: 156.6 },
  { date: "2018-10", pct: 133.5 },
  { date: "2019-01", pct: 150.8 },
  { date: "2019-04", pct: 152.5 },
  { date: "2019-07", pct: 151.0 },
  { date: "2019-10", pct: 159.9 },
  { date: "2020-01", pct: 128.8 },
  { date: "2020-04", pct: 173.1 },
  { date: "2020-07", pct: 175.6 },
  { date: "2020-10", pct: 198.3 },
  { date: "2021-01", pct: 205.9 },
  { date: "2021-04", pct: 215.7 },
  { date: "2021-07", pct: 210.8 },
  { date: "2021-10", pct: 218.7 },
  { date: "2022-01", pct: 202.9 },
  { date: "2022-04", pct: 163.8 },
  { date: "2022-07", pct: 153.3 },
  { date: "2022-10", pct: 157.1 },
  { date: "2023-01", pct: 166.9 },
  { date: "2023-04", pct: 177.7 },
  { date: "2023-07", pct: 167.1 },
  { date: "2023-10", pct: 182.0 },
  { date: "2024-01", pct: 197.3 },
  { date: "2024-04", pct: 199.6 },
  { date: "2024-07", pct: 207.9 },
  { date: "2024-10", pct: 210.3 },
  { date: "2025-01", pct: 197.7 },
  { date: "2025-04", pct: 214.1 },
  { date: "2025-07", pct: 226.0 },
  { date: "2025-10", pct: 228.7 },
  { date: "2026-01", pct: 218.1 },
];
export const BUFFETT_META = {
  source: "Federal Reserve Z.1 (corporate equities) ÷ BEA GDP, via FRED",
  sourceHref: "https://fred.stlouisfed.org/series/NCBEILQ027S",
  latestPct: 218.1,
  peakPct: 228.7,
  peakDate: "2025-10",
} as const;

// ─── The startup engine: new business applications ───────────────────────────
// Monthly business applications filed with the IRS, from the Census Bureau's
// Business Formation Statistics. Americans filed 5.25 million applications in
// 2024, more than double the 2.50 million of 2005 — and the pandemic set off the
// largest surge on record (546,719 in July 2020 alone).
// Source: U.S. Census Bureau, Business Formation Statistics, via FRED.
export interface BusinessFormationPoint { month: string; apps: number; hp: number; }
export const BUSINESS_FORMATION: BusinessFormationPoint[] = [
  { month: "2004-07", apps: 158475, hp: 97192 },
  { month: "2004-08", apps: 190755, hp: 117467 },
  { month: "2004-09", apps: 189732, hp: 116772 },
  { month: "2004-10", apps: 189834, hp: 117623 },
  { month: "2004-11", apps: 210436, hp: 127521 },
  { month: "2004-12", apps: 194015, hp: 114146 },
  { month: "2005-01", apps: 202843, hp: 119749 },
  { month: "2005-02", apps: 204339, hp: 123298 },
  { month: "2005-03", apps: 201714, hp: 120092 },
  { month: "2005-04", apps: 203971, hp: 121163 },
  { month: "2005-05", apps: 203067, hp: 120226 },
  { month: "2005-06", apps: 209167, hp: 123547 },
  { month: "2005-07", apps: 207146, hp: 121147 },
  { month: "2005-08", apps: 203963, hp: 119472 },
  { month: "2005-09", apps: 183543, hp: 108113 },
  { month: "2005-10", apps: 229648, hp: 137712 },
  { month: "2005-11", apps: 221721, hp: 130404 },
  { month: "2005-12", apps: 233874, hp: 139211 },
  { month: "2006-01", apps: 216711, hp: 127703 },
  { month: "2006-02", apps: 223584, hp: 132639 },
  { month: "2006-03", apps: 220837, hp: 130157 },
  { month: "2006-04", apps: 221673, hp: 129734 },
  { month: "2006-05", apps: 220526, hp: 130064 },
  { month: "2006-06", apps: 216343, hp: 126889 },
  { month: "2006-07", apps: 218471, hp: 128083 },
  { month: "2006-08", apps: 217514, hp: 127888 },
  { month: "2006-09", apps: 210576, hp: 124101 },
  { month: "2006-10", apps: 205714, hp: 122989 },
  { month: "2006-11", apps: 201617, hp: 119703 },
  { month: "2006-12", apps: 247845, hp: 145003 },
  { month: "2007-01", apps: 208246, hp: 122574 },
  { month: "2007-02", apps: 217604, hp: 128556 },
  { month: "2007-03", apps: 216164, hp: 126140 },
  { month: "2007-04", apps: 214131, hp: 125407 },
  { month: "2007-05", apps: 220037, hp: 128689 },
  { month: "2007-06", apps: 220862, hp: 129353 },
  { month: "2007-07", apps: 220521, hp: 129349 },
  { month: "2007-08", apps: 217887, hp: 127379 },
  { month: "2007-09", apps: 225643, hp: 127526 },
  { month: "2007-10", apps: 232383, hp: 119137 },
  { month: "2007-11", apps: 213015, hp: 107157 },
  { month: "2007-12", apps: 245899, hp: 122161 },
  { month: "2008-01", apps: 208482, hp: 104588 },
  { month: "2008-02", apps: 210303, hp: 105039 },
  { month: "2008-03", apps: 220389, hp: 109795 },
  { month: "2008-04", apps: 219024, hp: 108115 },
  { month: "2008-05", apps: 215387, hp: 106925 },
  { month: "2008-06", apps: 210155, hp: 104380 },
  { month: "2008-07", apps: 209396, hp: 103631 },
  { month: "2008-08", apps: 222223, hp: 107116 },
  { month: "2008-09", apps: 210402, hp: 103558 },
  { month: "2008-10", apps: 204593, hp: 101082 },
  { month: "2008-11", apps: 204094, hp: 100036 },
  { month: "2008-12", apps: 187289, hp: 90841 },
  { month: "2009-01", apps: 208117, hp: 101611 },
  { month: "2009-02", apps: 195238, hp: 94679 },
  { month: "2009-03", apps: 198598, hp: 96455 },
  { month: "2009-04", apps: 198684, hp: 96716 },
  { month: "2009-05", apps: 199441, hp: 96733 },
  { month: "2009-06", apps: 202527, hp: 96540 },
  { month: "2009-07", apps: 206927, hp: 98887 },
  { month: "2009-08", apps: 201391, hp: 95865 },
  { month: "2009-09", apps: 205778, hp: 97663 },
  { month: "2009-10", apps: 203145, hp: 96486 },
  { month: "2009-11", apps: 207255, hp: 98164 },
  { month: "2009-12", apps: 201302, hp: 93796 },
  { month: "2010-01", apps: 201730, hp: 93997 },
  { month: "2010-02", apps: 202438, hp: 94865 },
  { month: "2010-03", apps: 203227, hp: 94830 },
  { month: "2010-04", apps: 206091, hp: 96076 },
  { month: "2010-05", apps: 210575, hp: 97939 },
  { month: "2010-06", apps: 204492, hp: 93807 },
  { month: "2010-07", apps: 207258, hp: 95916 },
  { month: "2010-08", apps: 207432, hp: 98281 },
  { month: "2010-09", apps: 213690, hp: 99614 },
  { month: "2010-10", apps: 213496, hp: 99752 },
  { month: "2010-11", apps: 220986, hp: 103583 },
  { month: "2010-12", apps: 205990, hp: 94415 },
  { month: "2011-01", apps: 220262, hp: 101971 },
  { month: "2011-02", apps: 224248, hp: 102685 },
  { month: "2011-03", apps: 213338, hp: 97974 },
  { month: "2011-04", apps: 213578, hp: 99058 },
  { month: "2011-05", apps: 186215, hp: 89075 },
  { month: "2011-06", apps: 219576, hp: 102026 },
  { month: "2011-07", apps: 216352, hp: 99793 },
  { month: "2011-08", apps: 212893, hp: 97936 },
  { month: "2011-09", apps: 211969, hp: 97720 },
  { month: "2011-10", apps: 205200, hp: 95245 },
  { month: "2011-11", apps: 220838, hp: 100928 },
  { month: "2011-12", apps: 228767, hp: 103566 },
  { month: "2012-01", apps: 185168, hp: 83274 },
  { month: "2012-02", apps: 214454, hp: 97160 },
  { month: "2012-03", apps: 216917, hp: 98319 },
  { month: "2012-04", apps: 217615, hp: 98391 },
  { month: "2012-05", apps: 220514, hp: 100938 },
  { month: "2012-06", apps: 208224, hp: 94542 },
  { month: "2012-07", apps: 207891, hp: 95397 },
  { month: "2012-08", apps: 208611, hp: 94378 },
  { month: "2012-09", apps: 206493, hp: 92866 },
  { month: "2012-10", apps: 212036, hp: 95648 },
  { month: "2012-11", apps: 201841, hp: 91202 },
  { month: "2012-12", apps: 274870, hp: 121311 },
  { month: "2013-01", apps: 219826, hp: 95226 },
  { month: "2013-02", apps: 212132, hp: 94356 },
  { month: "2013-03", apps: 216804, hp: 97747 },
  { month: "2013-04", apps: 213092, hp: 95742 },
  { month: "2013-05", apps: 207148, hp: 93361 },
  { month: "2013-06", apps: 216701, hp: 98714 },
  { month: "2013-07", apps: 217965, hp: 97417 },
  { month: "2013-08", apps: 221376, hp: 98778 },
  { month: "2013-09", apps: 212417, hp: 94849 },
  { month: "2013-10", apps: 222856, hp: 99290 },
  { month: "2013-11", apps: 221486, hp: 97834 },
  { month: "2013-12", apps: 228339, hp: 101474 },
  { month: "2014-01", apps: 209436, hp: 91054 },
  { month: "2014-02", apps: 222677, hp: 96155 },
  { month: "2014-03", apps: 228095, hp: 99148 },
  { month: "2014-04", apps: 225982, hp: 98558 },
  { month: "2014-05", apps: 223626, hp: 97333 },
  { month: "2014-06", apps: 225960, hp: 99054 },
  { month: "2014-07", apps: 222113, hp: 97679 },
  { month: "2014-08", apps: 226150, hp: 99445 },
  { month: "2014-09", apps: 228220, hp: 100023 },
  { month: "2014-10", apps: 226161, hp: 99149 },
  { month: "2014-11", apps: 222018, hp: 97743 },
  { month: "2014-12", apps: 205929, hp: 91719 },
  { month: "2015-01", apps: 255317, hp: 110504 },
  { month: "2015-02", apps: 229911, hp: 100670 },
  { month: "2015-03", apps: 229121, hp: 100284 },
  { month: "2015-04", apps: 231237, hp: 100792 },
  { month: "2015-05", apps: 225203, hp: 96987 },
  { month: "2015-06", apps: 233799, hp: 100450 },
  { month: "2015-07", apps: 237552, hp: 101498 },
  { month: "2015-08", apps: 234217, hp: 99634 },
  { month: "2015-09", apps: 240255, hp: 102666 },
  { month: "2015-10", apps: 242992, hp: 104421 },
  { month: "2015-11", apps: 237065, hp: 100883 },
  { month: "2015-12", apps: 226045, hp: 96551 },
  { month: "2016-01", apps: 258911, hp: 109150 },
  { month: "2016-02", apps: 241406, hp: 101320 },
  { month: "2016-03", apps: 236623, hp: 99885 },
  { month: "2016-04", apps: 244018, hp: 101958 },
  { month: "2016-05", apps: 255025, hp: 106025 },
  { month: "2016-06", apps: 216520, hp: 90437 },
  { month: "2016-07", apps: 261383, hp: 109884 },
  { month: "2016-08", apps: 248039, hp: 102830 },
  { month: "2016-09", apps: 255054, hp: 104453 },
  { month: "2016-10", apps: 245258, hp: 100190 },
  { month: "2016-11", apps: 252973, hp: 102737 },
  { month: "2016-12", apps: 260647, hp: 106160 },
  { month: "2017-01", apps: 262312, hp: 106563 },
  { month: "2017-02", apps: 260199, hp: 104824 },
  { month: "2017-03", apps: 262143, hp: 105658 },
  { month: "2017-04", apps: 261557, hp: 104805 },
  { month: "2017-05", apps: 261640, hp: 103117 },
  { month: "2017-06", apps: 267588, hp: 106138 },
  { month: "2017-07", apps: 267675, hp: 105253 },
  { month: "2017-08", apps: 269566, hp: 106111 },
  { month: "2017-09", apps: 260571, hp: 101627 },
  { month: "2017-10", apps: 272946, hp: 105694 },
  { month: "2017-11", apps: 282216, hp: 109307 },
  { month: "2017-12", apps: 269042, hp: 104382 },
  { month: "2018-01", apps: 295555, hp: 115598 },
  { month: "2018-02", apps: 285597, hp: 110260 },
  { month: "2018-03", apps: 289624, hp: 111407 },
  { month: "2018-04", apps: 285744, hp: 109067 },
  { month: "2018-05", apps: 293199, hp: 111804 },
  { month: "2018-06", apps: 296623, hp: 112530 },
  { month: "2018-07", apps: 291042, hp: 109819 },
  { month: "2018-08", apps: 295949, hp: 110620 },
  { month: "2018-09", apps: 290040, hp: 112263 },
  { month: "2018-10", apps: 285939, hp: 111156 },
  { month: "2018-11", apps: 290747, hp: 108833 },
  { month: "2018-12", apps: 298548, hp: 110861 },
  { month: "2019-01", apps: 275827, hp: 102398 },
  { month: "2019-02", apps: 299331, hp: 111458 },
  { month: "2019-03", apps: 301093, hp: 111266 },
  { month: "2019-04", apps: 293060, hp: 111491 },
  { month: "2019-05", apps: 287481, hp: 109314 },
  { month: "2019-06", apps: 290529, hp: 110998 },
  { month: "2019-07", apps: 280547, hp: 106567 },
  { month: "2019-08", apps: 292063, hp: 110912 },
  { month: "2019-09", apps: 290721, hp: 109792 },
  { month: "2019-10", apps: 297723, hp: 110755 },
  { month: "2019-11", apps: 293965, hp: 110900 },
  { month: "2019-12", apps: 315267, hp: 116456 },
  { month: "2020-01", apps: 282360, hp: 105103 },
  { month: "2020-02", apps: 303982, hp: 115344 },
  { month: "2020-03", apps: 259162, hp: 97646 },
  { month: "2020-04", apps: 235568, hp: 79384 },
  { month: "2020-05", apps: 298466, hp: 99204 },
  { month: "2020-06", apps: 376926, hp: 128429 },
  { month: "2020-07", apps: 546719, hp: 184824 },
  { month: "2020-08", apps: 484772, hp: 165567 },
  { month: "2020-09", apps: 433059, hp: 149356 },
  { month: "2020-10", apps: 410569, hp: 141100 },
  { month: "2020-11", apps: 396615, hp: 138206 },
  { month: "2020-12", apps: 351615, hp: 118337 },
  { month: "2021-01", apps: 488126, hp: 167039 },
  { month: "2021-02", apps: 434622, hp: 148334 },
  { month: "2021-03", apps: 448765, hp: 155653 },
  { month: "2021-04", apps: 498579, hp: 168067 },
  { month: "2021-05", apps: 505645, hp: 169638 },
  { month: "2021-06", apps: 446232, hp: 153433 },
  { month: "2021-07", apps: 443113, hp: 151263 },
  { month: "2021-08", apps: 427748, hp: 145611 },
  { month: "2021-09", apps: 427508, hp: 146182 },
  { month: "2021-10", apps: 428017, hp: 147914 },
  { month: "2021-11", apps: 432545, hp: 150937 },
  { month: "2021-12", apps: 427901, hp: 143489 },
  { month: "2022-01", apps: 436674, hp: 146600 },
  { month: "2022-02", apps: 427960, hp: 141400 },
  { month: "2022-03", apps: 412246, hp: 138337 },
  { month: "2022-04", apps: 433663, hp: 144322 },
  { month: "2022-05", apps: 430119, hp: 146954 },
  { month: "2022-06", apps: 407753, hp: 141150 },
  { month: "2022-07", apps: 423929, hp: 146773 },
  { month: "2022-08", apps: 419560, hp: 143663 },
  { month: "2022-09", apps: 422293, hp: 146633 },
  { month: "2022-10", apps: 429432, hp: 149183 },
  { month: "2022-11", apps: 416428, hp: 143764 },
  { month: "2022-12", apps: 423745, hp: 142791 },
  { month: "2023-01", apps: 428614, hp: 146019 },
  { month: "2023-02", apps: 446842, hp: 152532 },
  { month: "2023-03", apps: 452843, hp: 157536 },
  { month: "2023-04", apps: 444715, hp: 152118 },
  { month: "2023-05", apps: 449234, hp: 147490 },
  { month: "2023-06", apps: 470793, hp: 156205 },
  { month: "2023-07", apps: 478273, hp: 156583 },
  { month: "2023-08", apps: 467208, hp: 153875 },
  { month: "2023-09", apps: 470317, hp: 164552 },
  { month: "2023-10", apps: 470393, hp: 162306 },
  { month: "2023-11", apps: 455805, hp: 154439 },
  { month: "2023-12", apps: 454137, hp: 152887 },
  { month: "2024-01", apps: 450041, hp: 151258 },
  { month: "2024-02", apps: 443944, hp: 146859 },
  { month: "2024-03", apps: 431289, hp: 143583 },
  { month: "2024-04", apps: 431531, hp: 139518 },
  { month: "2024-05", apps: 427923, hp: 140171 },
  { month: "2024-06", apps: 436016, hp: 142131 },
  { month: "2024-07", apps: 424927, hp: 139439 },
  { month: "2024-08", apps: 436267, hp: 144689 },
  { month: "2024-09", apps: 427221, hp: 142589 },
  { month: "2024-10", apps: 426875, hp: 139532 },
  { month: "2024-11", apps: 446146, hp: 141489 },
  { month: "2024-12", apps: 464450, hp: 148917 },
  { month: "2025-01", apps: 385618, hp: 128338 },
  { month: "2025-02", apps: 432820, hp: 139440 },
  { month: "2025-03", apps: 461056, hp: 141441 },
  { month: "2025-04", apps: 456024, hp: 142828 },
  { month: "2025-05", apps: 448815, hp: 141570 },
  { month: "2025-06", apps: 459613, hp: 142251 },
  { month: "2025-07", apps: 474833, hp: 143991 },
  { month: "2025-08", apps: 478074, hp: 142221 },
  { month: "2025-09", apps: 510794, hp: 143116 },
  { month: "2025-10", apps: 498416, hp: 141266 },
  { month: "2025-11", apps: 537266, hp: 145007 },
  { month: "2025-12", apps: 496139, hp: 136578 },
  { month: "2026-01", apps: 526115, hp: 148127 },
  { month: "2026-02", apps: 496121, hp: 146252 },
  { month: "2026-03", apps: 493792, hp: 144970 },
  { month: "2026-04", apps: 506807, hp: 147126 },
  { month: "2026-05", apps: 525462, hp: 146851 },
  { month: "2026-06", apps: 531423, hp: 149714 }
];
export const BUSINESS_FORMATION_META = {
  source: "U.S. Census Bureau, Business Formation Statistics (via FRED: BABATOTALSAUS)",
  sourceHref: "https://fred.stlouisfed.org/series/BABATOTALSAUS",
  apps2024: 5246630,
  apps2005: 2504996,
  peakMonth: "2020-07",
  peakMonthApps: 546719,
  // "High-propensity" = applications the Census judges likely to become
  // employers, i.e. real payrolls rather than sole proprietorships. It is the
  // honest denominator: only about a third of the application surge is firms
  // that will ever hire anyone.
  hpSource: "U.S. Census Bureau, Business Formation Statistics (via FRED: BAHBATOTALSAUS)",
  hpSourceHref: "https://fred.stlouisfed.org/series/BAHBATOTALSAUS",
  hp2024: 1720175,
  hpShare2024Pct: 32.8,
  hpPeakMonth: "2020-07",
  hpPeakMonthApps: 184824,
} as const;

// ─── The yield curve: the market's own recession alarm ───────────────────────
// The 10-year Treasury yield minus the 2-year, monthly since 1976. Normally
// long money costs more than short money and the spread is positive. When it
// goes negative — "inverted" — the market is betting rates must fall, which
// usually means it expects a downturn.
//
// Every recession since 1976 was preceded by an inversion. The reverse is NOT
// true, and the chart must not imply it: the 2022–24 inversion was the deepest
// and longest in four decades and no recession followed it. Read this as an
// alarm that sometimes cries wolf, not a prediction.
// Source: Federal Reserve Bank of St. Louis (T10Y2Y), monthly average of daily.
export interface YieldCurvePoint { month: string; spread: number; }
export const YIELD_CURVE: YieldCurvePoint[] = [
  { month: "1976-06", spread: 0.8 },
  { month: "1976-07", spread: 0.98 },
  { month: "1976-08", spread: 1.14 },
  { month: "1976-09", spread: 1.18 },
  { month: "1976-10", spread: 1.43 },
  { month: "1976-11", spread: 1.48 },
  { month: "1976-12", spread: 1.49 },
  { month: "1977-01", spread: 1.31 },
  { month: "1977-02", spread: 1.3 },
  { month: "1977-03", spread: 1.37 },
  { month: "1977-04", spread: 1.41 },
  { month: "1977-05", spread: 1.2 },
  { month: "1977-06", spread: 1.15 },
  { month: "1977-07", spread: 1.06 },
  { month: "1977-08", spread: 0.79 },
  { month: "1977-09", spread: 0.63 },
  { month: "1977-10", spread: 0.42 },
  { month: "1977-11", spread: 0.43 },
  { month: "1977-12", spread: 0.51 },
  { month: "1978-01", spread: 0.47 },
  { month: "1978-02", spread: 0.47 },
  { month: "1978-03", spread: 0.46 },
  { month: "1978-04", spread: 0.41 },
  { month: "1978-05", spread: 0.34 },
  { month: "1978-06", spread: 0.22 },
  { month: "1978-07", spread: 0.15 },
  { month: "1978-08", spread: 0.04 },
  { month: "1978-09", spread: -0.15 },
  { month: "1978-10", spread: -0.21 },
  { month: "1978-11", spread: -0.62 },
  { month: "1978-12", spread: -0.71 },
  { month: "1979-01", spread: -0.76 },
  { month: "1979-02", spread: -0.62 },
  { month: "1979-03", spread: -0.67 },
  { month: "1979-04", spread: -0.6 },
  { month: "1979-05", spread: -0.53 },
  { month: "1979-06", spread: -0.31 },
  { month: "1979-07", spread: -0.19 },
  { month: "1979-08", spread: -0.43 },
  { month: "1979-09", spread: -0.72 },
  { month: "1979-10", spread: -1.19 },
  { month: "1979-11", spread: -1.16 },
  { month: "1979-12", spread: -1.0 },
  { month: "1980-01", spread: -0.7 },
  { month: "1980-02", spread: -1.0 },
  { month: "1980-03", spread: -2.14 },
  { month: "1980-04", spread: -1.03 },
  { month: "1980-05", spread: 0.73 },
  { month: "1980-06", spread: 1.05 },
  { month: "1980-07", spread: 1.22 },
  { month: "1980-08", spread: 0.57 },
  { month: "1980-09", spread: -0.07 },
  { month: "1980-10", spread: -0.34 },
  { month: "1980-11", spread: -0.83 },
  { month: "1980-12", spread: -1.23 },
  { month: "1981-01", spread: -0.69 },
  { month: "1981-02", spread: -0.72 },
  { month: "1981-03", spread: -0.45 },
  { month: "1981-04", spread: -0.47 },
  { month: "1981-05", spread: -1.36 },
  { month: "1981-06", spread: -1.03 },
  { month: "1981-07", spread: -1.07 },
  { month: "1981-08", spread: -1.35 },
  { month: "1981-09", spread: -1.13 },
  { month: "1981-10", spread: -0.39 },
  { month: "1981-11", spread: 0.51 },
  { month: "1981-12", spread: 0.43 },
  { month: "1982-01", spread: 0.03 },
  { month: "1982-02", spread: -0.4 },
  { month: "1982-03", spread: -0.33 },
  { month: "1982-04", spread: -0.33 },
  { month: "1982-05", spread: -0.15 },
  { month: "1982-06", spread: -0.17 },
  { month: "1982-07", spread: 0.15 },
  { month: "1982-08", spread: 0.73 },
  { month: "1982-09", spread: 0.56 },
  { month: "1982-10", spread: 0.72 },
  { month: "1982-11", spread: 0.75 },
  { month: "1982-12", spread: 0.88 },
  { month: "1983-01", spread: 1.13 },
  { month: "1983-02", spread: 1.09 },
  { month: "1983-03", spread: 0.85 },
  { month: "1983-04", spread: 0.83 },
  { month: "1983-05", spread: 0.89 },
  { month: "1983-06", spread: 0.67 },
  { month: "1983-07", spread: 0.69 },
  { month: "1983-08", spread: 0.78 },
  { month: "1983-09", spread: 0.86 },
  { month: "1983-10", spread: 0.97 },
  { month: "1983-11", spread: 1.03 },
  { month: "1983-12", spread: 0.99 },
  { month: "1984-01", spread: 1.03 },
  { month: "1984-02", spread: 1.06 },
  { month: "1984-03", spread: 1.0 },
  { month: "1984-04", spread: 0.95 },
  { month: "1984-05", spread: 0.94 },
  { month: "1984-06", spread: 0.66 },
  { month: "1984-07", spread: 0.48 },
  { month: "1984-08", spread: 0.28 },
  { month: "1984-09", spread: 0.32 },
  { month: "1984-10", spread: 0.56 },
  { month: "1984-11", spread: 0.92 },
  { month: "1984-12", spread: 1.32 },
  { month: "1985-01", spread: 1.45 },
  { month: "1985-02", spread: 1.34 },
  { month: "1985-03", spread: 1.14 },
  { month: "1985-04", spread: 1.35 },
  { month: "1985-05", spread: 1.45 },
  { month: "1985-06", spread: 1.47 },
  { month: "1985-07", spread: 1.53 },
  { month: "1985-08", spread: 1.39 },
  { month: "1985-09", spread: 1.39 },
  { month: "1985-10", spread: 1.37 },
  { month: "1985-11", spread: 1.2 },
  { month: "1985-12", spread: 1.11 },
  { month: "1986-01", spread: 1.05 },
  { month: "1986-02", spread: 0.74 },
  { month: "1986-03", spread: 0.56 },
  { month: "1986-04", spread: 0.6 },
  { month: "1986-05", spread: 0.64 },
  { month: "1986-06", spread: 0.61 },
  { month: "1986-07", spread: 0.64 },
  { month: "1986-08", spread: 0.84 },
  { month: "1986-09", spread: 1.1 },
  { month: "1986-10", spread: 1.15 },
  { month: "1986-11", spread: 0.97 },
  { month: "1986-12", spread: 0.84 },
  { month: "1987-01", spread: 0.86 },
  { month: "1987-02", spread: 0.85 },
  { month: "1987-03", spread: 0.82 },
  { month: "1987-04", spread: 1.0 },
  { month: "1987-05", spread: 0.85 },
  { month: "1987-06", spread: 0.83 },
  { month: "1987-07", spread: 1.0 },
  { month: "1987-08", spread: 1.01 },
  { month: "1987-09", spread: 1.08 },
  { month: "1987-10", spread: 1.12 },
  { month: "1987-11", spread: 1.17 },
  { month: "1987-12", spread: 1.13 },
  { month: "1988-01", spread: 1.04 },
  { month: "1988-02", spread: 1.03 },
  { month: "1988-03", spread: 1.1 },
  { month: "1988-04", spread: 1.13 },
  { month: "1988-05", spread: 1.09 },
  { month: "1988-06", spread: 0.9 },
  { month: "1988-07", spread: 0.78 },
  { month: "1988-08", spread: 0.63 },
  { month: "1988-09", spread: 0.51 },
  { month: "1988-10", spread: 0.44 },
  { month: "1988-11", spread: 0.3 },
  { month: "1988-12", spread: 0.02 },
  { month: "1989-01", spread: -0.08 },
  { month: "1989-02", spread: -0.2 },
  { month: "1989-03", spread: -0.32 },
  { month: "1989-04", spread: -0.28 },
  { month: "1989-05", spread: -0.16 },
  { month: "1989-06", spread: -0.13 },
  { month: "1989-07", spread: 0.2 },
  { month: "1989-08", spread: -0.03 },
  { month: "1989-09", spread: -0.09 },
  { month: "1989-10", spread: 0.03 },
  { month: "1989-11", spread: 0.08 },
  { month: "1989-12", spread: 0.06 },
  { month: "1990-01", spread: 0.12 },
  { month: "1990-02", spread: 0.1 },
  { month: "1990-03", spread: -0.04 },
  { month: "1990-04", spread: 0.06 },
  { month: "1990-05", spread: 0.12 },
  { month: "1990-06", spread: 0.13 },
  { month: "1990-07", spread: 0.31 },
  { month: "1990-08", spread: 0.69 },
  { month: "1990-09", spread: 0.81 },
  { month: "1990-10", spread: 0.84 },
  { month: "1990-11", spread: 0.79 },
  { month: "1990-12", spread: 0.76 },
  { month: "1991-01", spread: 0.97 },
  { month: "1991-02", spread: 0.99 },
  { month: "1991-03", spread: 1.01 },
  { month: "1991-04", spread: 1.09 },
  { month: "1991-05", spread: 1.28 },
  { month: "1991-06", spread: 1.33 },
  { month: "1991-07", spread: 1.35 },
  { month: "1991-08", spread: 1.47 },
  { month: "1991-09", spread: 1.47 },
  { month: "1991-10", spread: 1.61 },
  { month: "1991-11", spread: 1.86 },
  { month: "1991-12", spread: 2.06 },
  { month: "1992-01", spread: 2.07 },
  { month: "1992-02", spread: 2.13 },
  { month: "1992-03", spread: 1.86 },
  { month: "1992-04", spread: 2.14 },
  { month: "1992-05", spread: 2.17 },
  { month: "1992-06", spread: 2.21 },
  { month: "1992-07", spread: 2.49 },
  { month: "1992-08", spread: 2.39 },
  { month: "1992-09", spread: 2.52 },
  { month: "1992-10", spread: 2.51 },
  { month: "1992-11", spread: 2.29 },
  { month: "1992-12", spread: 2.1 },
  { month: "1993-01", spread: 2.21 },
  { month: "1993-02", spread: 2.16 },
  { month: "1993-03", spread: 2.03 },
  { month: "1993-04", spread: 2.13 },
  { month: "1993-05", spread: 2.06 },
  { month: "1993-06", spread: 1.8 },
  { month: "1993-07", spread: 1.73 },
  { month: "1993-08", spread: 1.68 },
  { month: "1993-09", spread: 1.51 },
  { month: "1993-10", spread: 1.46 },
  { month: "1993-11", spread: 1.57 },
  { month: "1993-12", spread: 1.56 },
  { month: "1994-01", spread: 1.61 },
  { month: "1994-02", spread: 1.5 },
  { month: "1994-03", spread: 1.49 },
  { month: "1994-04", spread: 1.42 },
  { month: "1994-05", spread: 1.22 },
  { month: "1994-06", spread: 1.17 },
  { month: "1994-07", spread: 1.17 },
  { month: "1994-08", spread: 1.06 },
  { month: "1994-09", spread: 1.06 },
  { month: "1994-10", spread: 1.02 },
  { month: "1994-11", spread: 0.81 },
  { month: "1994-12", spread: 0.22 },
  { month: "1995-01", spread: 0.27 },
  { month: "1995-02", spread: 0.36 },
  { month: "1995-03", spread: 0.43 },
  { month: "1995-04", spread: 0.49 },
  { month: "1995-05", spread: 0.46 },
  { month: "1995-06", spread: 0.45 },
  { month: "1995-07", spread: 0.5 },
  { month: "1995-08", spread: 0.51 },
  { month: "1995-09", spread: 0.39 },
  { month: "1995-10", spread: 0.35 },
  { month: "1995-11", spread: 0.45 },
  { month: "1995-12", spread: 0.39 },
  { month: "1996-01", spread: 0.54 },
  { month: "1996-02", spread: 0.78 },
  { month: "1996-03", spread: 0.61 },
  { month: "1996-04", spread: 0.55 },
  { month: "1996-05", spread: 0.64 },
  { month: "1996-06", spread: 0.61 },
  { month: "1996-07", spread: 0.6 },
  { month: "1996-08", spread: 0.61 },
  { month: "1996-09", spread: 0.6 },
  { month: "1996-10", spread: 0.62 },
  { month: "1996-11", spread: 0.5 },
  { month: "1996-12", spread: 0.52 },
  { month: "1997-01", spread: 0.57 },
  { month: "1997-02", spread: 0.52 },
  { month: "1997-03", spread: 0.47 },
  { month: "1997-04", spread: 0.44 },
  { month: "1997-05", spread: 0.43 },
  { month: "1997-06", spread: 0.4 },
  { month: "1997-07", spread: 0.33 },
  { month: "1997-08", spread: 0.36 },
  { month: "1997-09", spread: 0.33 },
  { month: "1997-10", spread: 0.26 },
  { month: "1997-11", spread: 0.16 },
  { month: "1997-12", spread: 0.09 },
  { month: "1998-01", spread: 0.19 },
  { month: "1998-02", spread: 0.16 },
  { month: "1998-03", spread: 0.09 },
  { month: "1998-04", spread: 0.07 },
  { month: "1998-05", spread: 0.06 },
  { month: "1998-06", spread: -0.02 },
  { month: "1998-07", spread: 0.0 },
  { month: "1998-08", spread: 0.07 },
  { month: "1998-09", spread: 0.14 },
  { month: "1998-10", spread: 0.44 },
  { month: "1998-11", spread: 0.29 },
  { month: "1998-12", spread: 0.14 },
  { month: "1999-01", spread: 0.11 },
  { month: "1999-02", spread: 0.12 },
  { month: "1999-03", spread: 0.18 },
  { month: "1999-04", spread: 0.21 },
  { month: "1999-05", spread: 0.29 },
  { month: "1999-06", spread: 0.28 },
  { month: "1999-07", spread: 0.24 },
  { month: "1999-08", spread: 0.26 },
  { month: "1999-09", spread: 0.25 },
  { month: "1999-10", spread: 0.25 },
  { month: "1999-11", spread: 0.17 },
  { month: "1999-12", spread: 0.17 },
  { month: "2000-01", spread: 0.22 },
  { month: "2000-02", spread: -0.09 },
  { month: "2000-03", spread: -0.27 },
  { month: "2000-04", spread: -0.41 },
  { month: "2000-05", spread: -0.37 },
  { month: "2000-06", spread: -0.38 },
  { month: "2000-07", spread: -0.29 },
  { month: "2000-08", spread: -0.4 },
  { month: "2000-09", spread: -0.28 },
  { month: "2000-10", spread: -0.17 },
  { month: "2000-11", spread: -0.16 },
  { month: "2000-12", spread: -0.11 },
  { month: "2001-01", spread: 0.4 },
  { month: "2001-02", spread: 0.44 },
  { month: "2001-03", spread: 0.54 },
  { month: "2001-04", spread: 0.91 },
  { month: "2001-05", spread: 1.13 },
  { month: "2001-06", spread: 1.2 },
  { month: "2001-07", spread: 1.2 },
  { month: "2001-08", spread: 1.21 },
  { month: "2001-09", spread: 1.61 },
  { month: "2001-10", spread: 1.84 },
  { month: "2001-11", spread: 1.87 },
  { month: "2001-12", spread: 1.98 },
  { month: "2002-01", spread: 2.01 },
  { month: "2002-02", spread: 1.9 },
  { month: "2002-03", spread: 1.73 },
  { month: "2002-04", spread: 1.79 },
  { month: "2002-05", spread: 1.9 },
  { month: "2002-06", spread: 1.93 },
  { month: "2002-07", spread: 2.1 },
  { month: "2002-08", spread: 2.12 },
  { month: "2002-09", spread: 1.87 },
  { month: "2002-10", spread: 2.03 },
  { month: "2002-11", spread: 2.13 },
  { month: "2002-12", spread: 2.2 },
  { month: "2003-01", spread: 2.31 },
  { month: "2003-02", spread: 2.27 },
  { month: "2003-03", spread: 2.23 },
  { month: "2003-04", spread: 2.34 },
  { month: "2003-05", spread: 2.15 },
  { month: "2003-06", spread: 2.11 },
  { month: "2003-07", spread: 2.5 },
  { month: "2003-08", spread: 2.58 },
  { month: "2003-09", spread: 2.57 },
  { month: "2003-10", spread: 2.54 },
  { month: "2003-11", spread: 2.37 },
  { month: "2003-12", spread: 2.36 },
  { month: "2004-01", spread: 2.39 },
  { month: "2004-02", spread: 2.34 },
  { month: "2004-03", spread: 2.25 },
  { month: "2004-04", spread: 2.28 },
  { month: "2004-05", spread: 2.18 },
  { month: "2004-06", spread: 1.97 },
  { month: "2004-07", spread: 1.86 },
  { month: "2004-08", spread: 1.77 },
  { month: "2004-09", spread: 1.6 },
  { month: "2004-10", spread: 1.51 },
  { month: "2004-11", spread: 1.34 },
  { month: "2004-12", spread: 1.22 },
  { month: "2005-01", spread: 1.0 },
  { month: "2005-02", spread: 0.78 },
  { month: "2005-03", spread: 0.77 },
  { month: "2005-04", spread: 0.69 },
  { month: "2005-05", spread: 0.5 },
  { month: "2005-06", spread: 0.36 },
  { month: "2005-07", spread: 0.31 },
  { month: "2005-08", spread: 0.22 },
  { month: "2005-09", spread: 0.25 },
  { month: "2005-10", spread: 0.19 },
  { month: "2005-11", spread: 0.12 },
  { month: "2005-12", spread: 0.06 },
  { month: "2006-01", spread: 0.02 },
  { month: "2006-02", spread: -0.1 },
  { month: "2006-03", spread: -0.01 },
  { month: "2006-04", spread: 0.1 },
  { month: "2006-05", spread: 0.14 },
  { month: "2006-06", spread: -0.02 },
  { month: "2006-07", spread: -0.03 },
  { month: "2006-08", spread: -0.03 },
  { month: "2006-09", spread: -0.05 },
  { month: "2006-10", spread: -0.07 },
  { month: "2006-11", spread: -0.15 },
  { month: "2006-12", spread: -0.11 },
  { month: "2007-01", spread: -0.12 },
  { month: "2007-02", spread: -0.13 },
  { month: "2007-03", spread: -0.01 },
  { month: "2007-04", spread: 0.03 },
  { month: "2007-05", spread: -0.02 },
  { month: "2007-06", spread: 0.12 },
  { month: "2007-07", spread: 0.19 },
  { month: "2007-08", spread: 0.36 },
  { month: "2007-09", spread: 0.51 },
  { month: "2007-10", spread: 0.56 },
  { month: "2007-11", spread: 0.81 },
  { month: "2007-12", spread: 0.98 },
  { month: "2008-01", spread: 1.27 },
  { month: "2008-02", spread: 1.76 },
  { month: "2008-03", spread: 1.89 },
  { month: "2008-04", spread: 1.63 },
  { month: "2008-05", spread: 1.43 },
  { month: "2008-06", spread: 1.33 },
  { month: "2008-07", spread: 1.43 },
  { month: "2008-08", spread: 1.47 },
  { month: "2008-09", spread: 1.61 },
  { month: "2008-10", spread: 2.2 },
  { month: "2008-11", spread: 2.31 },
  { month: "2008-12", spread: 1.6 },
  { month: "2009-01", spread: 1.71 },
  { month: "2009-02", spread: 1.89 },
  { month: "2009-03", spread: 1.89 },
  { month: "2009-04", spread: 2.0 },
  { month: "2009-05", spread: 2.36 },
  { month: "2009-06", spread: 2.54 },
  { month: "2009-07", spread: 2.54 },
  { month: "2009-08", spread: 2.47 },
  { month: "2009-09", spread: 2.45 },
  { month: "2009-10", spread: 2.44 },
  { month: "2009-11", spread: 2.6 },
  { month: "2009-12", spread: 2.72 },
  { month: "2010-01", spread: 2.8 },
  { month: "2010-02", spread: 2.83 },
  { month: "2010-03", spread: 2.77 },
  { month: "2010-04", spread: 2.79 },
  { month: "2010-05", spread: 2.59 },
  { month: "2010-06", spread: 2.48 },
  { month: "2010-07", spread: 2.39 },
  { month: "2010-08", spread: 2.18 },
  { month: "2010-09", spread: 2.17 },
  { month: "2010-10", spread: 2.16 },
  { month: "2010-11", spread: 2.31 },
  { month: "2010-12", spread: 2.67 },
  { month: "2011-01", spread: 2.78 },
  { month: "2011-02", spread: 2.8 },
  { month: "2011-03", spread: 2.72 },
  { month: "2011-04", spread: 2.72 },
  { month: "2011-05", spread: 2.61 },
  { month: "2011-06", spread: 2.59 },
  { month: "2011-07", spread: 2.6 },
  { month: "2011-08", spread: 2.07 },
  { month: "2011-09", spread: 1.76 },
  { month: "2011-10", spread: 1.87 },
  { month: "2011-11", spread: 1.76 },
  { month: "2011-12", spread: 1.72 },
  { month: "2012-01", spread: 1.73 },
  { month: "2012-02", spread: 1.69 },
  { month: "2012-03", spread: 1.83 },
  { month: "2012-04", spread: 1.76 },
  { month: "2012-05", spread: 1.52 },
  { month: "2012-06", spread: 1.33 },
  { month: "2012-07", spread: 1.28 },
  { month: "2012-08", spread: 1.41 },
  { month: "2012-09", spread: 1.47 },
  { month: "2012-10", spread: 1.47 },
  { month: "2012-11", spread: 1.39 },
  { month: "2012-12", spread: 1.46 },
  { month: "2013-01", spread: 1.65 },
  { month: "2013-02", spread: 1.72 },
  { month: "2013-03", spread: 1.7 },
  { month: "2013-04", spread: 1.53 },
  { month: "2013-05", spread: 1.68 },
  { month: "2013-06", spread: 1.97 },
  { month: "2013-07", spread: 2.24 },
  { month: "2013-08", spread: 2.38 },
  { month: "2013-09", spread: 2.41 },
  { month: "2013-10", spread: 2.28 },
  { month: "2013-11", spread: 2.41 },
  { month: "2013-12", spread: 2.56 },
  { month: "2014-01", spread: 2.46 },
  { month: "2014-02", spread: 2.38 },
  { month: "2014-03", spread: 2.32 },
  { month: "2014-04", spread: 2.29 },
  { month: "2014-05", spread: 2.17 },
  { month: "2014-06", spread: 2.15 },
  { month: "2014-07", spread: 2.04 },
  { month: "2014-08", spread: 1.95 },
  { month: "2014-09", spread: 1.97 },
  { month: "2014-10", spread: 1.86 },
  { month: "2014-11", spread: 1.8 },
  { month: "2014-12", spread: 1.57 },
  { month: "2015-01", spread: 1.33 },
  { month: "2015-02", spread: 1.36 },
  { month: "2015-03", spread: 1.4 },
  { month: "2015-04", spread: 1.4 },
  { month: "2015-05", spread: 1.59 },
  { month: "2015-06", spread: 1.68 },
  { month: "2015-07", spread: 1.66 },
  { month: "2015-08", spread: 1.47 },
  { month: "2015-09", spread: 1.46 },
  { month: "2015-10", spread: 1.43 },
  { month: "2015-11", spread: 1.38 },
  { month: "2015-12", spread: 1.26 },
  { month: "2016-01", spread: 1.19 },
  { month: "2016-02", spread: 1.05 },
  { month: "2016-03", spread: 1.01 },
  { month: "2016-04", spread: 1.04 },
  { month: "2016-05", spread: 0.99 },
  { month: "2016-06", spread: 0.91 },
  { month: "2016-07", spread: 0.83 },
  { month: "2016-08", spread: 0.82 },
  { month: "2016-09", spread: 0.86 },
  { month: "2016-10", spread: 0.92 },
  { month: "2016-11", spread: 1.16 },
  { month: "2016-12", spread: 1.3 },
  { month: "2017-01", spread: 1.23 },
  { month: "2017-02", spread: 1.22 },
  { month: "2017-03", spread: 1.17 },
  { month: "2017-04", spread: 1.06 },
  { month: "2017-05", spread: 1.0 },
  { month: "2017-06", spread: 0.84 },
  { month: "2017-07", spread: 0.95 },
  { month: "2017-08", spread: 0.87 },
  { month: "2017-09", spread: 0.82 },
  { month: "2017-10", spread: 0.81 },
  { month: "2017-11", spread: 0.66 },
  { month: "2017-12", spread: 0.56 },
  { month: "2018-01", spread: 0.55 },
  { month: "2018-02", spread: 0.68 },
  { month: "2018-03", spread: 0.57 },
  { month: "2018-04", spread: 0.48 },
  { month: "2018-05", spread: 0.47 },
  { month: "2018-06", spread: 0.38 },
  { month: "2018-07", spread: 0.28 },
  { month: "2018-08", spread: 0.25 },
  { month: "2018-09", spread: 0.24 },
  { month: "2018-10", spread: 0.29 },
  { month: "2018-11", spread: 0.26 },
  { month: "2018-12", spread: 0.16 },
  { month: "2019-01", spread: 0.17 },
  { month: "2019-02", spread: 0.17 },
  { month: "2019-03", spread: 0.16 },
  { month: "2019-04", spread: 0.19 },
  { month: "2019-05", spread: 0.19 },
  { month: "2019-06", spread: 0.26 },
  { month: "2019-07", spread: 0.22 },
  { month: "2019-08", spread: 0.06 },
  { month: "2019-09", spread: 0.05 },
  { month: "2019-10", spread: 0.16 },
  { month: "2019-11", spread: 0.2 },
  { month: "2019-12", spread: 0.25 },
  { month: "2020-01", spread: 0.24 },
  { month: "2020-02", spread: 0.17 },
  { month: "2020-03", spread: 0.42 },
  { month: "2020-04", spread: 0.43 },
  { month: "2020-05", spread: 0.5 },
  { month: "2020-06", spread: 0.54 },
  { month: "2020-07", spread: 0.48 },
  { month: "2020-08", spread: 0.51 },
  { month: "2020-09", spread: 0.54 },
  { month: "2020-10", spread: 0.64 },
  { month: "2020-11", spread: 0.7 },
  { month: "2020-12", spread: 0.8 },
  { month: "2021-01", spread: 0.95 },
  { month: "2021-02", spread: 1.14 },
  { month: "2021-03", spread: 1.46 },
  { month: "2021-04", spread: 1.47 },
  { month: "2021-05", spread: 1.47 },
  { month: "2021-06", spread: 1.32 },
  { month: "2021-07", spread: 1.1 },
  { month: "2021-08", spread: 1.07 },
  { month: "2021-09", spread: 1.13 },
  { month: "2021-10", spread: 1.19 },
  { month: "2021-11", spread: 1.05 },
  { month: "2021-12", spread: 0.79 },
  { month: "2022-01", spread: 0.78 },
  { month: "2022-02", spread: 0.5 },
  { month: "2022-03", spread: 0.22 },
  { month: "2022-04", spread: 0.21 },
  { month: "2022-05", spread: 0.28 },
  { month: "2022-06", spread: 0.15 },
  { month: "2022-07", spread: -0.14 },
  { month: "2022-08", spread: -0.35 },
  { month: "2022-09", spread: -0.34 },
  { month: "2022-10", spread: -0.39 },
  { month: "2022-11", spread: -0.61 },
  { month: "2022-12", spread: -0.67 },
  { month: "2023-01", spread: -0.68 },
  { month: "2023-02", spread: -0.79 },
  { month: "2023-03", spread: -0.64 },
  { month: "2023-04", spread: -0.56 },
  { month: "2023-05", spread: -0.56 },
  { month: "2023-06", spread: -0.89 },
  { month: "2023-07", spread: -0.93 },
  { month: "2023-08", spread: -0.73 },
  { month: "2023-09", spread: -0.64 },
  { month: "2023-10", spread: -0.27 },
  { month: "2023-11", spread: -0.38 },
  { month: "2023-12", spread: -0.44 },
  { month: "2024-01", spread: -0.26 },
  { month: "2024-02", spread: -0.34 },
  { month: "2024-03", spread: -0.38 },
  { month: "2024-04", spread: -0.33 },
  { month: "2024-05", spread: -0.37 },
  { month: "2024-06", spread: -0.43 },
  { month: "2024-07", spread: -0.25 },
  { month: "2024-08", spread: -0.09 },
  { month: "2024-09", spread: 0.1 },
  { month: "2024-10", spread: 0.12 },
  { month: "2024-11", spread: 0.1 },
  { month: "2024-12", spread: 0.17 },
  { month: "2025-01", spread: 0.36 },
  { month: "2025-02", spread: 0.24 },
  { month: "2025-03", spread: 0.31 },
  { month: "2025-04", spread: 0.5 },
  { month: "2025-05", spread: 0.5 },
  { month: "2025-06", spread: 0.49 },
  { month: "2025-07", spread: 0.51 },
  { month: "2025-08", spread: 0.56 },
  { month: "2025-09", spread: 0.55 },
  { month: "2025-10", spread: 0.54 },
  { month: "2025-11", spread: 0.54 },
  { month: "2025-12", spread: 0.64 },
  { month: "2026-01", spread: 0.68 },
  { month: "2026-02", spread: 0.65 },
  { month: "2026-03", spread: 0.53 },
  { month: "2026-04", spread: 0.52 },
  { month: "2026-05", spread: 0.49 },
  { month: "2026-06", spread: 0.36 },
  { month: "2026-07", spread: 0.37 }
];

// NBER-dated recessions since the yield-curve series begins, for shading.
// Source: NBER via FRED (USREC).
export const RECESSIONS: { start: string; end: string }[] = [
  { start: "1980-02", end: "1980-08" },
  { start: "1981-08", end: "1982-12" },
  { start: "1990-08", end: "1991-04" },
  { start: "2001-04", end: "2001-12" },
  { start: "2008-01", end: "2009-07" },
  { start: "2020-03", end: "2020-05" },
];

export const YIELD_CURVE_META = {
  source: "Federal Reserve Bank of St. Louis (T10Y2Y)",
  sourceHref: "https://fred.stlouisfed.org/series/T10Y2Y",
  latestSpread: 0.37,
  latestMonth: "2026-07",
  deepestSpread: -2.14,
  deepestMonth: "1980-03",
  monthsInverted: 99,
  recentDeepest: -0.93,
  recentDeepestMonth: "2023-07",
} as const;

// ─── The federal funds rate: the price of money ──────────────────────────────
// The Fed's policy rate, monthly since 1954. The spike is Volcker: 19.10% in
// June 1981, the rate that broke the back of 1970s inflation and caused a
// recession on purpose. The floor is the opposite extreme — 0.05% in April
// 2020, money as close to free as it has ever been.
// Source: Board of Governors of the Federal Reserve System (FEDFUNDS), via FRED.
export interface FedFundsPoint { month: string; rate: number; }
export const FED_FUNDS: FedFundsPoint[] = [
  { month: "1954-07", rate: 0.8 },
  { month: "1954-08", rate: 1.22 },
  { month: "1954-09", rate: 1.07 },
  { month: "1954-10", rate: 0.85 },
  { month: "1954-11", rate: 0.83 },
  { month: "1954-12", rate: 1.28 },
  { month: "1955-01", rate: 1.39 },
  { month: "1955-02", rate: 1.29 },
  { month: "1955-03", rate: 1.35 },
  { month: "1955-04", rate: 1.43 },
  { month: "1955-05", rate: 1.43 },
  { month: "1955-06", rate: 1.64 },
  { month: "1955-07", rate: 1.68 },
  { month: "1955-08", rate: 1.96 },
  { month: "1955-09", rate: 2.18 },
  { month: "1955-10", rate: 2.24 },
  { month: "1955-11", rate: 2.35 },
  { month: "1955-12", rate: 2.48 },
  { month: "1956-01", rate: 2.45 },
  { month: "1956-02", rate: 2.5 },
  { month: "1956-03", rate: 2.5 },
  { month: "1956-04", rate: 2.62 },
  { month: "1956-05", rate: 2.75 },
  { month: "1956-06", rate: 2.71 },
  { month: "1956-07", rate: 2.75 },
  { month: "1956-08", rate: 2.73 },
  { month: "1956-09", rate: 2.95 },
  { month: "1956-10", rate: 2.96 },
  { month: "1956-11", rate: 2.88 },
  { month: "1956-12", rate: 2.94 },
  { month: "1957-01", rate: 2.84 },
  { month: "1957-02", rate: 3.0 },
  { month: "1957-03", rate: 2.96 },
  { month: "1957-04", rate: 3.0 },
  { month: "1957-05", rate: 3.0 },
  { month: "1957-06", rate: 3.0 },
  { month: "1957-07", rate: 2.99 },
  { month: "1957-08", rate: 3.24 },
  { month: "1957-09", rate: 3.47 },
  { month: "1957-10", rate: 3.5 },
  { month: "1957-11", rate: 3.28 },
  { month: "1957-12", rate: 2.98 },
  { month: "1958-01", rate: 2.72 },
  { month: "1958-02", rate: 1.67 },
  { month: "1958-03", rate: 1.2 },
  { month: "1958-04", rate: 1.26 },
  { month: "1958-05", rate: 0.63 },
  { month: "1958-06", rate: 0.93 },
  { month: "1958-07", rate: 0.68 },
  { month: "1958-08", rate: 1.53 },
  { month: "1958-09", rate: 1.76 },
  { month: "1958-10", rate: 1.8 },
  { month: "1958-11", rate: 2.27 },
  { month: "1958-12", rate: 2.42 },
  { month: "1959-01", rate: 2.48 },
  { month: "1959-02", rate: 2.43 },
  { month: "1959-03", rate: 2.8 },
  { month: "1959-04", rate: 2.96 },
  { month: "1959-05", rate: 2.9 },
  { month: "1959-06", rate: 3.39 },
  { month: "1959-07", rate: 3.47 },
  { month: "1959-08", rate: 3.5 },
  { month: "1959-09", rate: 3.76 },
  { month: "1959-10", rate: 3.98 },
  { month: "1959-11", rate: 4.0 },
  { month: "1959-12", rate: 3.99 },
  { month: "1960-01", rate: 3.99 },
  { month: "1960-02", rate: 3.97 },
  { month: "1960-03", rate: 3.84 },
  { month: "1960-04", rate: 3.92 },
  { month: "1960-05", rate: 3.85 },
  { month: "1960-06", rate: 3.32 },
  { month: "1960-07", rate: 3.23 },
  { month: "1960-08", rate: 2.98 },
  { month: "1960-09", rate: 2.6 },
  { month: "1960-10", rate: 2.47 },
  { month: "1960-11", rate: 2.44 },
  { month: "1960-12", rate: 1.98 },
  { month: "1961-01", rate: 1.45 },
  { month: "1961-02", rate: 2.54 },
  { month: "1961-03", rate: 2.02 },
  { month: "1961-04", rate: 1.49 },
  { month: "1961-05", rate: 1.98 },
  { month: "1961-06", rate: 1.73 },
  { month: "1961-07", rate: 1.17 },
  { month: "1961-08", rate: 2.0 },
  { month: "1961-09", rate: 1.88 },
  { month: "1961-10", rate: 2.26 },
  { month: "1961-11", rate: 2.61 },
  { month: "1961-12", rate: 2.33 },
  { month: "1962-01", rate: 2.15 },
  { month: "1962-02", rate: 2.37 },
  { month: "1962-03", rate: 2.85 },
  { month: "1962-04", rate: 2.78 },
  { month: "1962-05", rate: 2.36 },
  { month: "1962-06", rate: 2.68 },
  { month: "1962-07", rate: 2.71 },
  { month: "1962-08", rate: 2.93 },
  { month: "1962-09", rate: 2.9 },
  { month: "1962-10", rate: 2.9 },
  { month: "1962-11", rate: 2.94 },
  { month: "1962-12", rate: 2.93 },
  { month: "1963-01", rate: 2.92 },
  { month: "1963-02", rate: 3.0 },
  { month: "1963-03", rate: 2.98 },
  { month: "1963-04", rate: 2.9 },
  { month: "1963-05", rate: 3.0 },
  { month: "1963-06", rate: 2.99 },
  { month: "1963-07", rate: 3.02 },
  { month: "1963-08", rate: 3.49 },
  { month: "1963-09", rate: 3.48 },
  { month: "1963-10", rate: 3.5 },
  { month: "1963-11", rate: 3.48 },
  { month: "1963-12", rate: 3.38 },
  { month: "1964-01", rate: 3.48 },
  { month: "1964-02", rate: 3.48 },
  { month: "1964-03", rate: 3.43 },
  { month: "1964-04", rate: 3.47 },
  { month: "1964-05", rate: 3.5 },
  { month: "1964-06", rate: 3.5 },
  { month: "1964-07", rate: 3.42 },
  { month: "1964-08", rate: 3.5 },
  { month: "1964-09", rate: 3.45 },
  { month: "1964-10", rate: 3.36 },
  { month: "1964-11", rate: 3.52 },
  { month: "1964-12", rate: 3.85 },
  { month: "1965-01", rate: 3.9 },
  { month: "1965-02", rate: 3.98 },
  { month: "1965-03", rate: 4.05 },
  { month: "1965-04", rate: 4.09 },
  { month: "1965-05", rate: 4.1 },
  { month: "1965-06", rate: 4.05 },
  { month: "1965-07", rate: 4.09 },
  { month: "1965-08", rate: 4.12 },
  { month: "1965-09", rate: 4.02 },
  { month: "1965-10", rate: 4.08 },
  { month: "1965-11", rate: 4.1 },
  { month: "1965-12", rate: 4.32 },
  { month: "1966-01", rate: 4.42 },
  { month: "1966-02", rate: 4.6 },
  { month: "1966-03", rate: 4.66 },
  { month: "1966-04", rate: 4.67 },
  { month: "1966-05", rate: 4.9 },
  { month: "1966-06", rate: 5.17 },
  { month: "1966-07", rate: 5.3 },
  { month: "1966-08", rate: 5.53 },
  { month: "1966-09", rate: 5.4 },
  { month: "1966-10", rate: 5.53 },
  { month: "1966-11", rate: 5.76 },
  { month: "1966-12", rate: 5.4 },
  { month: "1967-01", rate: 4.94 },
  { month: "1967-02", rate: 5.0 },
  { month: "1967-03", rate: 4.53 },
  { month: "1967-04", rate: 4.05 },
  { month: "1967-05", rate: 3.94 },
  { month: "1967-06", rate: 3.98 },
  { month: "1967-07", rate: 3.79 },
  { month: "1967-08", rate: 3.9 },
  { month: "1967-09", rate: 3.99 },
  { month: "1967-10", rate: 3.88 },
  { month: "1967-11", rate: 4.13 },
  { month: "1967-12", rate: 4.51 },
  { month: "1968-01", rate: 4.61 },
  { month: "1968-02", rate: 4.71 },
  { month: "1968-03", rate: 5.05 },
  { month: "1968-04", rate: 5.76 },
  { month: "1968-05", rate: 6.12 },
  { month: "1968-06", rate: 6.07 },
  { month: "1968-07", rate: 6.03 },
  { month: "1968-08", rate: 6.03 },
  { month: "1968-09", rate: 5.78 },
  { month: "1968-10", rate: 5.91 },
  { month: "1968-11", rate: 5.82 },
  { month: "1968-12", rate: 6.02 },
  { month: "1969-01", rate: 6.3 },
  { month: "1969-02", rate: 6.61 },
  { month: "1969-03", rate: 6.79 },
  { month: "1969-04", rate: 7.41 },
  { month: "1969-05", rate: 8.67 },
  { month: "1969-06", rate: 8.9 },
  { month: "1969-07", rate: 8.61 },
  { month: "1969-08", rate: 9.19 },
  { month: "1969-09", rate: 9.15 },
  { month: "1969-10", rate: 9.0 },
  { month: "1969-11", rate: 8.85 },
  { month: "1969-12", rate: 8.97 },
  { month: "1970-01", rate: 8.98 },
  { month: "1970-02", rate: 8.98 },
  { month: "1970-03", rate: 7.76 },
  { month: "1970-04", rate: 8.1 },
  { month: "1970-05", rate: 7.95 },
  { month: "1970-06", rate: 7.61 },
  { month: "1970-07", rate: 7.21 },
  { month: "1970-08", rate: 6.62 },
  { month: "1970-09", rate: 6.29 },
  { month: "1970-10", rate: 6.2 },
  { month: "1970-11", rate: 5.6 },
  { month: "1970-12", rate: 4.9 },
  { month: "1971-01", rate: 4.14 },
  { month: "1971-02", rate: 3.72 },
  { month: "1971-03", rate: 3.71 },
  { month: "1971-04", rate: 4.16 },
  { month: "1971-05", rate: 4.63 },
  { month: "1971-06", rate: 4.91 },
  { month: "1971-07", rate: 5.31 },
  { month: "1971-08", rate: 5.57 },
  { month: "1971-09", rate: 5.55 },
  { month: "1971-10", rate: 5.2 },
  { month: "1971-11", rate: 4.91 },
  { month: "1971-12", rate: 4.14 },
  { month: "1972-01", rate: 3.51 },
  { month: "1972-02", rate: 3.3 },
  { month: "1972-03", rate: 3.83 },
  { month: "1972-04", rate: 4.17 },
  { month: "1972-05", rate: 4.27 },
  { month: "1972-06", rate: 4.46 },
  { month: "1972-07", rate: 4.55 },
  { month: "1972-08", rate: 4.81 },
  { month: "1972-09", rate: 4.87 },
  { month: "1972-10", rate: 5.05 },
  { month: "1972-11", rate: 5.06 },
  { month: "1972-12", rate: 5.33 },
  { month: "1973-01", rate: 5.94 },
  { month: "1973-02", rate: 6.58 },
  { month: "1973-03", rate: 7.09 },
  { month: "1973-04", rate: 7.12 },
  { month: "1973-05", rate: 7.84 },
  { month: "1973-06", rate: 8.49 },
  { month: "1973-07", rate: 10.4 },
  { month: "1973-08", rate: 10.5 },
  { month: "1973-09", rate: 10.78 },
  { month: "1973-10", rate: 10.01 },
  { month: "1973-11", rate: 10.03 },
  { month: "1973-12", rate: 9.95 },
  { month: "1974-01", rate: 9.65 },
  { month: "1974-02", rate: 8.97 },
  { month: "1974-03", rate: 9.35 },
  { month: "1974-04", rate: 10.51 },
  { month: "1974-05", rate: 11.31 },
  { month: "1974-06", rate: 11.93 },
  { month: "1974-07", rate: 12.92 },
  { month: "1974-08", rate: 12.01 },
  { month: "1974-09", rate: 11.34 },
  { month: "1974-10", rate: 10.06 },
  { month: "1974-11", rate: 9.45 },
  { month: "1974-12", rate: 8.53 },
  { month: "1975-01", rate: 7.13 },
  { month: "1975-02", rate: 6.24 },
  { month: "1975-03", rate: 5.54 },
  { month: "1975-04", rate: 5.49 },
  { month: "1975-05", rate: 5.22 },
  { month: "1975-06", rate: 5.55 },
  { month: "1975-07", rate: 6.1 },
  { month: "1975-08", rate: 6.14 },
  { month: "1975-09", rate: 6.24 },
  { month: "1975-10", rate: 5.82 },
  { month: "1975-11", rate: 5.22 },
  { month: "1975-12", rate: 5.2 },
  { month: "1976-01", rate: 4.87 },
  { month: "1976-02", rate: 4.77 },
  { month: "1976-03", rate: 4.84 },
  { month: "1976-04", rate: 4.82 },
  { month: "1976-05", rate: 5.29 },
  { month: "1976-06", rate: 5.48 },
  { month: "1976-07", rate: 5.31 },
  { month: "1976-08", rate: 5.29 },
  { month: "1976-09", rate: 5.25 },
  { month: "1976-10", rate: 5.02 },
  { month: "1976-11", rate: 4.95 },
  { month: "1976-12", rate: 4.65 },
  { month: "1977-01", rate: 4.61 },
  { month: "1977-02", rate: 4.68 },
  { month: "1977-03", rate: 4.69 },
  { month: "1977-04", rate: 4.73 },
  { month: "1977-05", rate: 5.35 },
  { month: "1977-06", rate: 5.39 },
  { month: "1977-07", rate: 5.42 },
  { month: "1977-08", rate: 5.9 },
  { month: "1977-09", rate: 6.14 },
  { month: "1977-10", rate: 6.47 },
  { month: "1977-11", rate: 6.51 },
  { month: "1977-12", rate: 6.56 },
  { month: "1978-01", rate: 6.7 },
  { month: "1978-02", rate: 6.78 },
  { month: "1978-03", rate: 6.79 },
  { month: "1978-04", rate: 6.89 },
  { month: "1978-05", rate: 7.36 },
  { month: "1978-06", rate: 7.6 },
  { month: "1978-07", rate: 7.81 },
  { month: "1978-08", rate: 8.04 },
  { month: "1978-09", rate: 8.45 },
  { month: "1978-10", rate: 8.96 },
  { month: "1978-11", rate: 9.76 },
  { month: "1978-12", rate: 10.03 },
  { month: "1979-01", rate: 10.07 },
  { month: "1979-02", rate: 10.06 },
  { month: "1979-03", rate: 10.09 },
  { month: "1979-04", rate: 10.01 },
  { month: "1979-05", rate: 10.24 },
  { month: "1979-06", rate: 10.29 },
  { month: "1979-07", rate: 10.47 },
  { month: "1979-08", rate: 10.94 },
  { month: "1979-09", rate: 11.43 },
  { month: "1979-10", rate: 13.77 },
  { month: "1979-11", rate: 13.18 },
  { month: "1979-12", rate: 13.78 },
  { month: "1980-01", rate: 13.82 },
  { month: "1980-02", rate: 14.13 },
  { month: "1980-03", rate: 17.19 },
  { month: "1980-04", rate: 17.61 },
  { month: "1980-05", rate: 10.98 },
  { month: "1980-06", rate: 9.47 },
  { month: "1980-07", rate: 9.03 },
  { month: "1980-08", rate: 9.61 },
  { month: "1980-09", rate: 10.87 },
  { month: "1980-10", rate: 12.81 },
  { month: "1980-11", rate: 15.85 },
  { month: "1980-12", rate: 18.9 },
  { month: "1981-01", rate: 19.08 },
  { month: "1981-02", rate: 15.93 },
  { month: "1981-03", rate: 14.7 },
  { month: "1981-04", rate: 15.72 },
  { month: "1981-05", rate: 18.52 },
  { month: "1981-06", rate: 19.1 },
  { month: "1981-07", rate: 19.04 },
  { month: "1981-08", rate: 17.82 },
  { month: "1981-09", rate: 15.87 },
  { month: "1981-10", rate: 15.08 },
  { month: "1981-11", rate: 13.31 },
  { month: "1981-12", rate: 12.37 },
  { month: "1982-01", rate: 13.22 },
  { month: "1982-02", rate: 14.78 },
  { month: "1982-03", rate: 14.68 },
  { month: "1982-04", rate: 14.94 },
  { month: "1982-05", rate: 14.45 },
  { month: "1982-06", rate: 14.15 },
  { month: "1982-07", rate: 12.59 },
  { month: "1982-08", rate: 10.12 },
  { month: "1982-09", rate: 10.31 },
  { month: "1982-10", rate: 9.71 },
  { month: "1982-11", rate: 9.2 },
  { month: "1982-12", rate: 8.95 },
  { month: "1983-01", rate: 8.68 },
  { month: "1983-02", rate: 8.51 },
  { month: "1983-03", rate: 8.77 },
  { month: "1983-04", rate: 8.8 },
  { month: "1983-05", rate: 8.63 },
  { month: "1983-06", rate: 8.98 },
  { month: "1983-07", rate: 9.37 },
  { month: "1983-08", rate: 9.56 },
  { month: "1983-09", rate: 9.45 },
  { month: "1983-10", rate: 9.48 },
  { month: "1983-11", rate: 9.34 },
  { month: "1983-12", rate: 9.47 },
  { month: "1984-01", rate: 9.56 },
  { month: "1984-02", rate: 9.59 },
  { month: "1984-03", rate: 9.91 },
  { month: "1984-04", rate: 10.29 },
  { month: "1984-05", rate: 10.32 },
  { month: "1984-06", rate: 11.06 },
  { month: "1984-07", rate: 11.23 },
  { month: "1984-08", rate: 11.64 },
  { month: "1984-09", rate: 11.3 },
  { month: "1984-10", rate: 9.99 },
  { month: "1984-11", rate: 9.43 },
  { month: "1984-12", rate: 8.38 },
  { month: "1985-01", rate: 8.35 },
  { month: "1985-02", rate: 8.5 },
  { month: "1985-03", rate: 8.58 },
  { month: "1985-04", rate: 8.27 },
  { month: "1985-05", rate: 7.97 },
  { month: "1985-06", rate: 7.53 },
  { month: "1985-07", rate: 7.88 },
  { month: "1985-08", rate: 7.9 },
  { month: "1985-09", rate: 7.92 },
  { month: "1985-10", rate: 7.99 },
  { month: "1985-11", rate: 8.05 },
  { month: "1985-12", rate: 8.27 },
  { month: "1986-01", rate: 8.14 },
  { month: "1986-02", rate: 7.86 },
  { month: "1986-03", rate: 7.48 },
  { month: "1986-04", rate: 6.99 },
  { month: "1986-05", rate: 6.85 },
  { month: "1986-06", rate: 6.92 },
  { month: "1986-07", rate: 6.56 },
  { month: "1986-08", rate: 6.17 },
  { month: "1986-09", rate: 5.89 },
  { month: "1986-10", rate: 5.85 },
  { month: "1986-11", rate: 6.04 },
  { month: "1986-12", rate: 6.91 },
  { month: "1987-01", rate: 6.43 },
  { month: "1987-02", rate: 6.1 },
  { month: "1987-03", rate: 6.13 },
  { month: "1987-04", rate: 6.37 },
  { month: "1987-05", rate: 6.85 },
  { month: "1987-06", rate: 6.73 },
  { month: "1987-07", rate: 6.58 },
  { month: "1987-08", rate: 6.73 },
  { month: "1987-09", rate: 7.22 },
  { month: "1987-10", rate: 7.29 },
  { month: "1987-11", rate: 6.69 },
  { month: "1987-12", rate: 6.77 },
  { month: "1988-01", rate: 6.83 },
  { month: "1988-02", rate: 6.58 },
  { month: "1988-03", rate: 6.58 },
  { month: "1988-04", rate: 6.87 },
  { month: "1988-05", rate: 7.09 },
  { month: "1988-06", rate: 7.51 },
  { month: "1988-07", rate: 7.75 },
  { month: "1988-08", rate: 8.01 },
  { month: "1988-09", rate: 8.19 },
  { month: "1988-10", rate: 8.3 },
  { month: "1988-11", rate: 8.35 },
  { month: "1988-12", rate: 8.76 },
  { month: "1989-01", rate: 9.12 },
  { month: "1989-02", rate: 9.36 },
  { month: "1989-03", rate: 9.85 },
  { month: "1989-04", rate: 9.84 },
  { month: "1989-05", rate: 9.81 },
  { month: "1989-06", rate: 9.53 },
  { month: "1989-07", rate: 9.24 },
  { month: "1989-08", rate: 8.99 },
  { month: "1989-09", rate: 9.02 },
  { month: "1989-10", rate: 8.84 },
  { month: "1989-11", rate: 8.55 },
  { month: "1989-12", rate: 8.45 },
  { month: "1990-01", rate: 8.23 },
  { month: "1990-02", rate: 8.24 },
  { month: "1990-03", rate: 8.28 },
  { month: "1990-04", rate: 8.26 },
  { month: "1990-05", rate: 8.18 },
  { month: "1990-06", rate: 8.29 },
  { month: "1990-07", rate: 8.15 },
  { month: "1990-08", rate: 8.13 },
  { month: "1990-09", rate: 8.2 },
  { month: "1990-10", rate: 8.11 },
  { month: "1990-11", rate: 7.81 },
  { month: "1990-12", rate: 7.31 },
  { month: "1991-01", rate: 6.91 },
  { month: "1991-02", rate: 6.25 },
  { month: "1991-03", rate: 6.12 },
  { month: "1991-04", rate: 5.91 },
  { month: "1991-05", rate: 5.78 },
  { month: "1991-06", rate: 5.9 },
  { month: "1991-07", rate: 5.82 },
  { month: "1991-08", rate: 5.66 },
  { month: "1991-09", rate: 5.45 },
  { month: "1991-10", rate: 5.21 },
  { month: "1991-11", rate: 4.81 },
  { month: "1991-12", rate: 4.43 },
  { month: "1992-01", rate: 4.03 },
  { month: "1992-02", rate: 4.06 },
  { month: "1992-03", rate: 3.98 },
  { month: "1992-04", rate: 3.73 },
  { month: "1992-05", rate: 3.82 },
  { month: "1992-06", rate: 3.76 },
  { month: "1992-07", rate: 3.25 },
  { month: "1992-08", rate: 3.3 },
  { month: "1992-09", rate: 3.22 },
  { month: "1992-10", rate: 3.1 },
  { month: "1992-11", rate: 3.09 },
  { month: "1992-12", rate: 2.92 },
  { month: "1993-01", rate: 3.02 },
  { month: "1993-02", rate: 3.03 },
  { month: "1993-03", rate: 3.07 },
  { month: "1993-04", rate: 2.96 },
  { month: "1993-05", rate: 3.0 },
  { month: "1993-06", rate: 3.04 },
  { month: "1993-07", rate: 3.06 },
  { month: "1993-08", rate: 3.03 },
  { month: "1993-09", rate: 3.09 },
  { month: "1993-10", rate: 2.99 },
  { month: "1993-11", rate: 3.02 },
  { month: "1993-12", rate: 2.96 },
  { month: "1994-01", rate: 3.05 },
  { month: "1994-02", rate: 3.25 },
  { month: "1994-03", rate: 3.34 },
  { month: "1994-04", rate: 3.56 },
  { month: "1994-05", rate: 4.01 },
  { month: "1994-06", rate: 4.25 },
  { month: "1994-07", rate: 4.26 },
  { month: "1994-08", rate: 4.47 },
  { month: "1994-09", rate: 4.73 },
  { month: "1994-10", rate: 4.76 },
  { month: "1994-11", rate: 5.29 },
  { month: "1994-12", rate: 5.45 },
  { month: "1995-01", rate: 5.53 },
  { month: "1995-02", rate: 5.92 },
  { month: "1995-03", rate: 5.98 },
  { month: "1995-04", rate: 6.05 },
  { month: "1995-05", rate: 6.01 },
  { month: "1995-06", rate: 6.0 },
  { month: "1995-07", rate: 5.85 },
  { month: "1995-08", rate: 5.74 },
  { month: "1995-09", rate: 5.8 },
  { month: "1995-10", rate: 5.76 },
  { month: "1995-11", rate: 5.8 },
  { month: "1995-12", rate: 5.6 },
  { month: "1996-01", rate: 5.56 },
  { month: "1996-02", rate: 5.22 },
  { month: "1996-03", rate: 5.31 },
  { month: "1996-04", rate: 5.22 },
  { month: "1996-05", rate: 5.24 },
  { month: "1996-06", rate: 5.27 },
  { month: "1996-07", rate: 5.4 },
  { month: "1996-08", rate: 5.22 },
  { month: "1996-09", rate: 5.3 },
  { month: "1996-10", rate: 5.24 },
  { month: "1996-11", rate: 5.31 },
  { month: "1996-12", rate: 5.29 },
  { month: "1997-01", rate: 5.25 },
  { month: "1997-02", rate: 5.19 },
  { month: "1997-03", rate: 5.39 },
  { month: "1997-04", rate: 5.51 },
  { month: "1997-05", rate: 5.5 },
  { month: "1997-06", rate: 5.56 },
  { month: "1997-07", rate: 5.52 },
  { month: "1997-08", rate: 5.54 },
  { month: "1997-09", rate: 5.54 },
  { month: "1997-10", rate: 5.5 },
  { month: "1997-11", rate: 5.52 },
  { month: "1997-12", rate: 5.5 },
  { month: "1998-01", rate: 5.56 },
  { month: "1998-02", rate: 5.51 },
  { month: "1998-03", rate: 5.49 },
  { month: "1998-04", rate: 5.45 },
  { month: "1998-05", rate: 5.49 },
  { month: "1998-06", rate: 5.56 },
  { month: "1998-07", rate: 5.54 },
  { month: "1998-08", rate: 5.55 },
  { month: "1998-09", rate: 5.51 },
  { month: "1998-10", rate: 5.07 },
  { month: "1998-11", rate: 4.83 },
  { month: "1998-12", rate: 4.68 },
  { month: "1999-01", rate: 4.63 },
  { month: "1999-02", rate: 4.76 },
  { month: "1999-03", rate: 4.81 },
  { month: "1999-04", rate: 4.74 },
  { month: "1999-05", rate: 4.74 },
  { month: "1999-06", rate: 4.76 },
  { month: "1999-07", rate: 4.99 },
  { month: "1999-08", rate: 5.07 },
  { month: "1999-09", rate: 5.22 },
  { month: "1999-10", rate: 5.2 },
  { month: "1999-11", rate: 5.42 },
  { month: "1999-12", rate: 5.3 },
  { month: "2000-01", rate: 5.45 },
  { month: "2000-02", rate: 5.73 },
  { month: "2000-03", rate: 5.85 },
  { month: "2000-04", rate: 6.02 },
  { month: "2000-05", rate: 6.27 },
  { month: "2000-06", rate: 6.53 },
  { month: "2000-07", rate: 6.54 },
  { month: "2000-08", rate: 6.5 },
  { month: "2000-09", rate: 6.52 },
  { month: "2000-10", rate: 6.51 },
  { month: "2000-11", rate: 6.51 },
  { month: "2000-12", rate: 6.4 },
  { month: "2001-01", rate: 5.98 },
  { month: "2001-02", rate: 5.49 },
  { month: "2001-03", rate: 5.31 },
  { month: "2001-04", rate: 4.8 },
  { month: "2001-05", rate: 4.21 },
  { month: "2001-06", rate: 3.97 },
  { month: "2001-07", rate: 3.77 },
  { month: "2001-08", rate: 3.65 },
  { month: "2001-09", rate: 3.07 },
  { month: "2001-10", rate: 2.49 },
  { month: "2001-11", rate: 2.09 },
  { month: "2001-12", rate: 1.82 },
  { month: "2002-01", rate: 1.73 },
  { month: "2002-02", rate: 1.74 },
  { month: "2002-03", rate: 1.73 },
  { month: "2002-04", rate: 1.75 },
  { month: "2002-05", rate: 1.75 },
  { month: "2002-06", rate: 1.75 },
  { month: "2002-07", rate: 1.73 },
  { month: "2002-08", rate: 1.74 },
  { month: "2002-09", rate: 1.75 },
  { month: "2002-10", rate: 1.75 },
  { month: "2002-11", rate: 1.34 },
  { month: "2002-12", rate: 1.24 },
  { month: "2003-01", rate: 1.24 },
  { month: "2003-02", rate: 1.26 },
  { month: "2003-03", rate: 1.25 },
  { month: "2003-04", rate: 1.26 },
  { month: "2003-05", rate: 1.26 },
  { month: "2003-06", rate: 1.22 },
  { month: "2003-07", rate: 1.01 },
  { month: "2003-08", rate: 1.03 },
  { month: "2003-09", rate: 1.01 },
  { month: "2003-10", rate: 1.01 },
  { month: "2003-11", rate: 1.0 },
  { month: "2003-12", rate: 0.98 },
  { month: "2004-01", rate: 1.0 },
  { month: "2004-02", rate: 1.01 },
  { month: "2004-03", rate: 1.0 },
  { month: "2004-04", rate: 1.0 },
  { month: "2004-05", rate: 1.0 },
  { month: "2004-06", rate: 1.03 },
  { month: "2004-07", rate: 1.26 },
  { month: "2004-08", rate: 1.43 },
  { month: "2004-09", rate: 1.61 },
  { month: "2004-10", rate: 1.76 },
  { month: "2004-11", rate: 1.93 },
  { month: "2004-12", rate: 2.16 },
  { month: "2005-01", rate: 2.28 },
  { month: "2005-02", rate: 2.5 },
  { month: "2005-03", rate: 2.63 },
  { month: "2005-04", rate: 2.79 },
  { month: "2005-05", rate: 3.0 },
  { month: "2005-06", rate: 3.04 },
  { month: "2005-07", rate: 3.26 },
  { month: "2005-08", rate: 3.5 },
  { month: "2005-09", rate: 3.62 },
  { month: "2005-10", rate: 3.78 },
  { month: "2005-11", rate: 4.0 },
  { month: "2005-12", rate: 4.16 },
  { month: "2006-01", rate: 4.29 },
  { month: "2006-02", rate: 4.49 },
  { month: "2006-03", rate: 4.59 },
  { month: "2006-04", rate: 4.79 },
  { month: "2006-05", rate: 4.94 },
  { month: "2006-06", rate: 4.99 },
  { month: "2006-07", rate: 5.24 },
  { month: "2006-08", rate: 5.25 },
  { month: "2006-09", rate: 5.25 },
  { month: "2006-10", rate: 5.25 },
  { month: "2006-11", rate: 5.25 },
  { month: "2006-12", rate: 5.24 },
  { month: "2007-01", rate: 5.25 },
  { month: "2007-02", rate: 5.26 },
  { month: "2007-03", rate: 5.26 },
  { month: "2007-04", rate: 5.25 },
  { month: "2007-05", rate: 5.25 },
  { month: "2007-06", rate: 5.25 },
  { month: "2007-07", rate: 5.26 },
  { month: "2007-08", rate: 5.02 },
  { month: "2007-09", rate: 4.94 },
  { month: "2007-10", rate: 4.76 },
  { month: "2007-11", rate: 4.49 },
  { month: "2007-12", rate: 4.24 },
  { month: "2008-01", rate: 3.94 },
  { month: "2008-02", rate: 2.98 },
  { month: "2008-03", rate: 2.61 },
  { month: "2008-04", rate: 2.28 },
  { month: "2008-05", rate: 1.98 },
  { month: "2008-06", rate: 2.0 },
  { month: "2008-07", rate: 2.01 },
  { month: "2008-08", rate: 2.0 },
  { month: "2008-09", rate: 1.81 },
  { month: "2008-10", rate: 0.97 },
  { month: "2008-11", rate: 0.39 },
  { month: "2008-12", rate: 0.16 },
  { month: "2009-01", rate: 0.15 },
  { month: "2009-02", rate: 0.22 },
  { month: "2009-03", rate: 0.18 },
  { month: "2009-04", rate: 0.15 },
  { month: "2009-05", rate: 0.18 },
  { month: "2009-06", rate: 0.21 },
  { month: "2009-07", rate: 0.16 },
  { month: "2009-08", rate: 0.16 },
  { month: "2009-09", rate: 0.15 },
  { month: "2009-10", rate: 0.12 },
  { month: "2009-11", rate: 0.12 },
  { month: "2009-12", rate: 0.12 },
  { month: "2010-01", rate: 0.11 },
  { month: "2010-02", rate: 0.13 },
  { month: "2010-03", rate: 0.16 },
  { month: "2010-04", rate: 0.2 },
  { month: "2010-05", rate: 0.2 },
  { month: "2010-06", rate: 0.18 },
  { month: "2010-07", rate: 0.18 },
  { month: "2010-08", rate: 0.19 },
  { month: "2010-09", rate: 0.19 },
  { month: "2010-10", rate: 0.19 },
  { month: "2010-11", rate: 0.19 },
  { month: "2010-12", rate: 0.18 },
  { month: "2011-01", rate: 0.17 },
  { month: "2011-02", rate: 0.16 },
  { month: "2011-03", rate: 0.14 },
  { month: "2011-04", rate: 0.1 },
  { month: "2011-05", rate: 0.09 },
  { month: "2011-06", rate: 0.09 },
  { month: "2011-07", rate: 0.07 },
  { month: "2011-08", rate: 0.1 },
  { month: "2011-09", rate: 0.08 },
  { month: "2011-10", rate: 0.07 },
  { month: "2011-11", rate: 0.08 },
  { month: "2011-12", rate: 0.07 },
  { month: "2012-01", rate: 0.08 },
  { month: "2012-02", rate: 0.1 },
  { month: "2012-03", rate: 0.13 },
  { month: "2012-04", rate: 0.14 },
  { month: "2012-05", rate: 0.16 },
  { month: "2012-06", rate: 0.16 },
  { month: "2012-07", rate: 0.16 },
  { month: "2012-08", rate: 0.13 },
  { month: "2012-09", rate: 0.14 },
  { month: "2012-10", rate: 0.16 },
  { month: "2012-11", rate: 0.16 },
  { month: "2012-12", rate: 0.16 },
  { month: "2013-01", rate: 0.14 },
  { month: "2013-02", rate: 0.15 },
  { month: "2013-03", rate: 0.14 },
  { month: "2013-04", rate: 0.15 },
  { month: "2013-05", rate: 0.11 },
  { month: "2013-06", rate: 0.09 },
  { month: "2013-07", rate: 0.09 },
  { month: "2013-08", rate: 0.08 },
  { month: "2013-09", rate: 0.08 },
  { month: "2013-10", rate: 0.09 },
  { month: "2013-11", rate: 0.08 },
  { month: "2013-12", rate: 0.09 },
  { month: "2014-01", rate: 0.07 },
  { month: "2014-02", rate: 0.07 },
  { month: "2014-03", rate: 0.08 },
  { month: "2014-04", rate: 0.09 },
  { month: "2014-05", rate: 0.09 },
  { month: "2014-06", rate: 0.1 },
  { month: "2014-07", rate: 0.09 },
  { month: "2014-08", rate: 0.09 },
  { month: "2014-09", rate: 0.09 },
  { month: "2014-10", rate: 0.09 },
  { month: "2014-11", rate: 0.09 },
  { month: "2014-12", rate: 0.12 },
  { month: "2015-01", rate: 0.11 },
  { month: "2015-02", rate: 0.11 },
  { month: "2015-03", rate: 0.11 },
  { month: "2015-04", rate: 0.12 },
  { month: "2015-05", rate: 0.12 },
  { month: "2015-06", rate: 0.13 },
  { month: "2015-07", rate: 0.13 },
  { month: "2015-08", rate: 0.14 },
  { month: "2015-09", rate: 0.14 },
  { month: "2015-10", rate: 0.12 },
  { month: "2015-11", rate: 0.12 },
  { month: "2015-12", rate: 0.24 },
  { month: "2016-01", rate: 0.34 },
  { month: "2016-02", rate: 0.38 },
  { month: "2016-03", rate: 0.36 },
  { month: "2016-04", rate: 0.37 },
  { month: "2016-05", rate: 0.37 },
  { month: "2016-06", rate: 0.38 },
  { month: "2016-07", rate: 0.39 },
  { month: "2016-08", rate: 0.4 },
  { month: "2016-09", rate: 0.4 },
  { month: "2016-10", rate: 0.4 },
  { month: "2016-11", rate: 0.41 },
  { month: "2016-12", rate: 0.54 },
  { month: "2017-01", rate: 0.65 },
  { month: "2017-02", rate: 0.66 },
  { month: "2017-03", rate: 0.79 },
  { month: "2017-04", rate: 0.9 },
  { month: "2017-05", rate: 0.91 },
  { month: "2017-06", rate: 1.04 },
  { month: "2017-07", rate: 1.15 },
  { month: "2017-08", rate: 1.16 },
  { month: "2017-09", rate: 1.15 },
  { month: "2017-10", rate: 1.15 },
  { month: "2017-11", rate: 1.16 },
  { month: "2017-12", rate: 1.3 },
  { month: "2018-01", rate: 1.41 },
  { month: "2018-02", rate: 1.42 },
  { month: "2018-03", rate: 1.51 },
  { month: "2018-04", rate: 1.69 },
  { month: "2018-05", rate: 1.7 },
  { month: "2018-06", rate: 1.82 },
  { month: "2018-07", rate: 1.91 },
  { month: "2018-08", rate: 1.91 },
  { month: "2018-09", rate: 1.95 },
  { month: "2018-10", rate: 2.19 },
  { month: "2018-11", rate: 2.2 },
  { month: "2018-12", rate: 2.27 },
  { month: "2019-01", rate: 2.4 },
  { month: "2019-02", rate: 2.4 },
  { month: "2019-03", rate: 2.41 },
  { month: "2019-04", rate: 2.42 },
  { month: "2019-05", rate: 2.39 },
  { month: "2019-06", rate: 2.38 },
  { month: "2019-07", rate: 2.4 },
  { month: "2019-08", rate: 2.13 },
  { month: "2019-09", rate: 2.04 },
  { month: "2019-10", rate: 1.83 },
  { month: "2019-11", rate: 1.55 },
  { month: "2019-12", rate: 1.55 },
  { month: "2020-01", rate: 1.55 },
  { month: "2020-02", rate: 1.58 },
  { month: "2020-03", rate: 0.65 },
  { month: "2020-04", rate: 0.05 },
  { month: "2020-05", rate: 0.05 },
  { month: "2020-06", rate: 0.08 },
  { month: "2020-07", rate: 0.09 },
  { month: "2020-08", rate: 0.1 },
  { month: "2020-09", rate: 0.09 },
  { month: "2020-10", rate: 0.09 },
  { month: "2020-11", rate: 0.09 },
  { month: "2020-12", rate: 0.09 },
  { month: "2021-01", rate: 0.09 },
  { month: "2021-02", rate: 0.08 },
  { month: "2021-03", rate: 0.07 },
  { month: "2021-04", rate: 0.07 },
  { month: "2021-05", rate: 0.06 },
  { month: "2021-06", rate: 0.08 },
  { month: "2021-07", rate: 0.1 },
  { month: "2021-08", rate: 0.09 },
  { month: "2021-09", rate: 0.08 },
  { month: "2021-10", rate: 0.08 },
  { month: "2021-11", rate: 0.08 },
  { month: "2021-12", rate: 0.08 },
  { month: "2022-01", rate: 0.08 },
  { month: "2022-02", rate: 0.08 },
  { month: "2022-03", rate: 0.2 },
  { month: "2022-04", rate: 0.33 },
  { month: "2022-05", rate: 0.77 },
  { month: "2022-06", rate: 1.21 },
  { month: "2022-07", rate: 1.68 },
  { month: "2022-08", rate: 2.33 },
  { month: "2022-09", rate: 2.56 },
  { month: "2022-10", rate: 3.08 },
  { month: "2022-11", rate: 3.78 },
  { month: "2022-12", rate: 4.1 },
  { month: "2023-01", rate: 4.33 },
  { month: "2023-02", rate: 4.57 },
  { month: "2023-03", rate: 4.65 },
  { month: "2023-04", rate: 4.83 },
  { month: "2023-05", rate: 5.06 },
  { month: "2023-06", rate: 5.08 },
  { month: "2023-07", rate: 5.12 },
  { month: "2023-08", rate: 5.33 },
  { month: "2023-09", rate: 5.33 },
  { month: "2023-10", rate: 5.33 },
  { month: "2023-11", rate: 5.33 },
  { month: "2023-12", rate: 5.33 },
  { month: "2024-01", rate: 5.33 },
  { month: "2024-02", rate: 5.33 },
  { month: "2024-03", rate: 5.33 },
  { month: "2024-04", rate: 5.33 },
  { month: "2024-05", rate: 5.33 },
  { month: "2024-06", rate: 5.33 },
  { month: "2024-07", rate: 5.33 },
  { month: "2024-08", rate: 5.33 },
  { month: "2024-09", rate: 5.13 },
  { month: "2024-10", rate: 4.83 },
  { month: "2024-11", rate: 4.64 },
  { month: "2024-12", rate: 4.48 },
  { month: "2025-01", rate: 4.33 },
  { month: "2025-02", rate: 4.33 },
  { month: "2025-03", rate: 4.33 },
  { month: "2025-04", rate: 4.33 },
  { month: "2025-05", rate: 4.33 },
  { month: "2025-06", rate: 4.33 },
  { month: "2025-07", rate: 4.33 },
  { month: "2025-08", rate: 4.33 },
  { month: "2025-09", rate: 4.22 },
  { month: "2025-10", rate: 4.09 },
  { month: "2025-11", rate: 3.88 },
  { month: "2025-12", rate: 3.72 },
  { month: "2026-01", rate: 3.64 },
  { month: "2026-02", rate: 3.64 },
  { month: "2026-03", rate: 3.64 },
  { month: "2026-04", rate: 3.64 },
  { month: "2026-05", rate: 3.63 },
  { month: "2026-06", rate: 3.63 }
];

export const FED_FUNDS_META = {
  source: "Federal Reserve Board (FEDFUNDS)",
  sourceHref: "https://fred.stlouisfed.org/series/FEDFUNDS",
  peakRate: 19.1,
  peakMonth: "1981-06",
  lowRate: 0.05,
  lowMonth: "2020-04",
  latestRate: 3.63,
  latestMonth: "2026-06",
} as const;

