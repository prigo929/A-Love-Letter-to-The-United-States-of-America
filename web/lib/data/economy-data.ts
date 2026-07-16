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
