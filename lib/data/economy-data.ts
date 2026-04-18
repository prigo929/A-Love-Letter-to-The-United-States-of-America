// ─── Economy Section Data ─────────────────────────────────────────────────────
// All static data for the Economy section and its sub-pages.
// Components import from here — never hardcode in JSX.
//
// Beginner guide:
// - If you want to change economy page numbers, edit them here.
// - If you want to swap economy images, use SITE_IMAGES keys here.
// - If you want to change chart titles/layout, edit the React page/component.

import { SITE_IMAGES } from "@/lib/site-images";
import type { Locale } from "@/lib/i18n/config";

// ─── Types ────────────────────────────────────────────────────────────────────

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

export const GDP_COMPARISON: GdpDataPoint[] = [
  { country: "United States", gdp: 28.8, flag: "🇺🇸", highlight: true },
  { country: "China", gdp: 18.5, flag: "🇨🇳" },
  { country: "Germany", gdp: 4.5, flag: "🇩🇪" },
  { country: "Japan", gdp: 4.2, flag: "🇯🇵" },
  { country: "India", gdp: 3.9, flag: "🇮🇳" },
  { country: "United Kingdom", gdp: 3.1, flag: "🇬🇧" },
  { country: "France", gdp: 3.0, flag: "🇫🇷" },
  { country: "Brazil", gdp: 2.3, flag: "🇧🇷" },
];

export const GDP_PER_CAPITA: GdpPerCapitaPoint[] = [
  // Values here are in thousands of USD per person.
  // Example: 82.7 means roughly $82,700, not $82.7 trillion.
  { country: "United States", gdpPerCapita: 82.7, flag: "🇺🇸", highlight: true },
  { country: "Germany", gdpPerCapita: 54.3, flag: "🇩🇪" },
  { country: "United Kingdom", gdpPerCapita: 46.5, flag: "🇬🇧" },
  { country: "France", gdpPerCapita: 45.0, flag: "🇫🇷" },
  { country: "Japan", gdpPerCapita: 33.8, flag: "🇯🇵" },
  { country: "China", gdpPerCapita: 13.1, flag: "🇨🇳" },
  { country: "Brazil", gdpPerCapita: 10.7, flag: "🇧🇷" },
  { country: "India", gdpPerCapita: 2.8, flag: "🇮🇳" },
];

// ─── S&P 500 Historical Data (1980–2024) ──────────────────────────────────────

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
];

// ─── Venture Capital Data ─────────────────────────────────────────────────────

export const VC_BY_COUNTRY: VCDataPoint[] = [
  {
    country: "United States",
    investment: 170,
    percentage: 47,
    highlight: true,
  },
  { country: "China", investment: 52, percentage: 14 },
  { country: "United Kingdom", investment: 22, percentage: 6 },
  { country: "India", investment: 18, percentage: 5 },
  { country: "Germany", investment: 12, percentage: 3 },
  { country: "France", investment: 9, percentage: 2.5 },
  { country: "Rest of World", investment: 81, percentage: 22.5 },
];

export const UNICORNS_BY_COUNTRY: UnicornDataPoint[] = [
  { country: "United States", unicorns: 659, percentage: 52, highlight: true },
  { country: "China", unicorns: 168, percentage: 13 },
  { country: "India", unicorns: 70, percentage: 5.5 },
  { country: "United Kingdom", unicorns: 52, percentage: 4 },
  { country: "Germany", unicorns: 32, percentage: 2.5 },
  { country: "France", unicorns: 27, percentage: 2 },
  { country: "Rest of World", unicorns: 262, percentage: 21 },
];

// ─── Dollar Reserve Data (IMF COFER 2024) ─────────────────────────────────────

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
  { exchange: "NYSE", marketCap: 25.1, country: "🇺🇸 USA", highlight: true },
  { exchange: "NASDAQ", marketCap: 22.4, country: "🇺🇸 USA", highlight: true },
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
    value: 28.8,
    suffix: "T",
    prefix: "$",
    decimals: 1,
    label: "GDP (2024)",
    description: "Largest economy in human history",
    source: "World Bank 2024",
    color: "gold",
  },
  {
    id: "market-cap",
    value: 47,
    suffix: "T+",
    prefix: "$",
    label: "US Stock Markets",
    description: "NYSE + NASDAQ combined",
    source: "WFE 2024",
    color: "gold",
  },
  {
    id: "fortune500",
    value: 136,
    label: "Fortune 500 HQs",
    description: "More than any other nation",
    source: "Fortune 2024",
    color: "white",
  },
  {
    id: "vc",
    value: 47,
    suffix: "%",
    label: "Global VC",
    description: "America's share of world VC",
    source: "NVCA 2024",
    color: "white",
  },
];

// ─── Economy Fact Cards ───────────────────────────────────────────────────────

export const GDP_FACTS: EconomyFact[] = [
  {
    id: "gdp-share",
    fact: "The US represents ~25% of total world GDP",
    detail:
      "With just 4.2% of the world's population, America generates a quarter of all global economic output.",
    source: "World Bank 2024",
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
    source: "BEA & World Bank 2024",
    color: "blue",
  },
  {
    id: "gdp-companies",
    fact: "12 of the world's 20 most valuable companies are American",
    detail:
      "Apple, Microsoft, NVIDIA, Alphabet, Amazon, Meta, Berkshire Hathaway — the global corporate elite is overwhelmingly American.",
    source: "Forbes Global 2000, 2024",
    color: "gold",
  },
];

export const CAPITAL_MARKETS_FACTS: EconomyFact[] = [
  {
    id: "nyse-age",
    fact: "The NYSE has operated continuously since 1792",
    detail:
      "The New York Stock Exchange is the largest stock exchange on Earth by market capitalization — $25+ trillion — and has been the world's financial anchor for over 230 years.",
    source: "NYSE / WFE 2024",
    color: "gold",
  },
  {
    id: "treasury-risk-free",
    fact: "US Treasuries are the world's risk-free rate benchmark",
    detail:
      "Every financial model on Earth uses US Treasury yields as the baseline for risk-free returns. The US bond market is $27 trillion — the deepest, most liquid market in history.",
    source: "SIFMA 2024",
    color: "red",
  },
  {
    id: "nasdaq-tech",
    fact: "NASDAQ lists the most valuable tech companies in history",
    detail:
      "Apple, Microsoft, NVIDIA, Alphabet, Amazon, Meta — all listed on a single American exchange. The NASDAQ Composite has returned over 4,500% since 1985.",
    source: "NASDAQ 2024",
    color: "blue",
  },
];

export const VC_FACTS: EconomyFact[] = [
  {
    id: "vc-share",
    fact: "America attracts ~47% of all global VC investment",
    detail:
      "In 2023, US startups raised approximately $170 billion in venture capital — nearly half of all VC deployed on Earth, despite having just 4% of the world's population.",
    source: "NVCA / Pitchbook 2024",
    color: "gold",
  },
  {
    id: "unicorn-share",
    fact: "659+ US unicorns — over 52% of the global total",
    detail:
      'A "unicorn" is a private company valued at $1 billion or more. America has built more of them than all other nations combined.',
    source: "Pitchbook 2024",
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
    source: "SWIFT 2024",
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
    city: "San Francisco / Silicon Valley",
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

// ─── Founding Timeline ────────────────────────────────────────────────────────

export const STARTUP_TIMELINE: FoundingTimeline[] = [
  {
    year: 1975,
    company: "Microsoft",
    founder: "Bill Gates & Paul Allen",
    currentValuation: "$3.1T",
    industry: "Software",
  },
  {
    year: 1976,
    company: "Apple",
    founder: "Steve Jobs & Wozniak",
    currentValuation: "$3.4T",
    industry: "Consumer Tech",
  },
  {
    year: 1994,
    company: "Amazon",
    founder: "Jeff Bezos",
    currentValuation: "$1.9T",
    industry: "E-Commerce / Cloud",
  },
  {
    year: 1998,
    company: "Google",
    founder: "Brin & Page (Stanford)",
    currentValuation: "$2.1T",
    industry: "Search / AI",
  },
  {
    year: 2002,
    company: "SpaceX",
    founder: "Elon Musk",
    currentValuation: "$210B",
    industry: "Space",
  },
  {
    year: 2003,
    company: "Tesla",
    founder: "Musk / Eberhard",
    currentValuation: "$650B",
    industry: "EVs",
  },
  {
    year: 2004,
    company: "Facebook",
    founder: "Mark Zuckerberg",
    currentValuation: "$1.4T",
    industry: "Social Media",
  },
  {
    year: 2006,
    company: "Twitter/X",
    founder: "Dorsey / Williams",
    currentValuation: "$44B",
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
    currentValuation: "$80B+",
    industry: "AI",
  },
];

// ─── Overview Copy Blocks ─────────────────────────────────────────────────────

export const ECONOMY_OVERVIEW_PARAGRAPHS = [
  "The United States economy is the most powerful economic force in the history of human civilization — not by accident, not by geography alone, but by design. A constitutional system that protects private property, enforces contracts, and rewards individual initiative created the conditions for an explosion of wealth, productivity, and innovation unmatched in 5,000 years of recorded economic history.",
  "At $28.8 trillion in 2024, the US economy is not merely the largest — it is categorically different from every other economy on Earth. It is simultaneously the world's largest consumer market, its most important financial hub, the leading destination for foreign direct investment, the dominant technology innovator, and the issuer of the global reserve currency. No other nation has ever held all five crowns at once.",
  "The numbers are staggering but the story behind them is even more remarkable: a system built on free markets, low barriers to entry, tolerance for creative destruction, and an immigration policy that has attracted the world's most ambitious people for 250 years. The American economy does not succeed despite capitalism — it succeeds because of it.",
];

export const GDP_OVERVIEW_PARAGRAPHS = [
  "Let the scale settle in: the United States economy produces $28.8 trillion in goods and services annually. That is more than the next three largest economies — China ($18.5T), Germany ($4.5T), and Japan ($4.2T) — combined. It represents approximately 25% of all global economic output generated by a country with just 4.2% of the world's population.",
  "What makes this achievement even more extraordinary is its durability. The United States has been the world's largest economy for over 130 consecutive years — through the Great Depression, two World Wars, the Cold War, the financial crisis of 2008, and the COVID-19 pandemic. No other economy in modern history has demonstrated this combination of scale and resilience.",
];

export const CAPITAL_MARKETS_PARAGRAPHS = [
  "The New York Stock Exchange and NASDAQ together represent the deepest, most liquid, and most transparent capital markets in human history. Combined market capitalization exceeds $47 trillion — more than the GDP of every nation except the United States itself. These markets are not merely places where stocks are traded; they are the engine through which American innovation is financed.",
  "The US bond market — $27 trillion in outstanding Treasury securities alone — is the bedrock of global finance. US Treasury yields serve as the world's reference rate for risk-free returns. When institutions from Tokyo to Frankfurt price any financial asset, they start with what the US government pays.",
];

export const VC_OVERVIEW_PARAGRAPHS = [
  "Silicon Valley is not a place — it is a philosophy made physical. The venture capital ecosystem centered in the San Francisco Bay Area, with satellites in New York, Boston, Seattle, Austin, and Miami, channels more patient, risk-seeking capital into early-stage innovation than the rest of the world combined.",
  "The numbers are breathtaking: American startups raised approximately $170 billion in venture capital in 2023 — nearly half of all VC deployed globally. The result? 659 unicorn companies (private businesses valued over $1 billion), representing 52% of the entire global unicorn ecosystem. From the iPhone to Google Search to ChatGPT, the tools that define modern civilization were born here.",
];

export const DOLLAR_OVERVIEW_PARAGRAPHS = [
  'The US dollar is not merely the currency of 335 million Americans — it is the operating system of the global economy. Since the Bretton Woods agreement of 1944, and reinforced by the Petrodollar arrangements of the 1970s, the dollar has served as the world\'s reserve currency, trade medium, and ultimate store of value. This status confers on the United States an "exorbitant privilege" — the ability to borrow in its own currency at globally competitive rates.',
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
      "The largest economy in human history — $28.8 trillion and counting",
    imageSrc:
      SITE_IMAGES.economyGrowth,
    imageAlt: "New York City financial district skyline",
    badge: "$28.8T",
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
        label: "PIB (2024)",
        description: "Cea mai mare economie din istoria umană",
      },
      {
        ...ECONOMY_HERO_STATS[1],
        label: "Piețele Bursiere SUA",
        description: "NYSE + NASDAQ împreună",
      },
      {
        ...ECONOMY_HERO_STATS[2],
        label: "Sedii Fortune 500",
        description: "Mai multe decât orice altă națiune",
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
        fact: "SUA reprezintă aproximativ 25% din PIB-ul mondial total",
        detail:
          "Cu doar 4,2% din populația lumii, America generează un sfert din întreaga producție economică globală.",
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
          "Bursa din New York este cea mai mare bursă din lume după capitalizare — peste 25 de trilioane de dolari — și ancora financiară a lumii de peste 230 de ani.",
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
        fact: "America atrage aproximativ 47% din toate investițiile globale de VC",
        detail:
          "În 2023, startup-urile din SUA au atras aproximativ 170 de miliarde de dolari în venture capital — aproape jumătate din tot VC-ul investit pe Pământ, deși SUA au doar 4% din populația lumii.",
      },
      {
        ...VC_FACTS[1],
        fact: "659+ unicorni americani — peste 52% din totalul global",
        detail:
          'Un "unicorn" este o companie privată evaluată la cel puțin 1 miliard de dolari. America a construit mai multe astfel de companii decât toate celelalte națiuni la un loc.',
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
      "La 28,8 trilioane de dolari în 2024, economia SUA nu este doar cea mai mare — este categoric diferită de orice altă economie de pe Pământ. Este simultan cea mai mare piață de consum din lume, cel mai important centru financiar, principala destinație pentru investițiile străine directe, liderul inovării tehnologice și emitentul monedei de rezervă globale. Nicio altă națiune nu a purtat vreodată toate aceste cinci coroane în același timp.",
      "Cifrele sunt uluitoare, dar povestea din spatele lor este și mai remarcabilă: un sistem construit pe piețe libere, bariere reduse la intrare, toleranță pentru distrugerea creativă și o politică de imigrație care a atras cei mai ambițioși oameni ai lumii timp de 250 de ani. Economia americană nu reușește în ciuda capitalismului — reușește datorită lui.",
    ];
  }

  return ECONOMY_OVERVIEW_PARAGRAPHS;
}

export function getGdpOverviewParagraphs(locale: Locale) {
  if (locale === "ro") {
    return [
      "Privește bine scara: economia Statelor Unite produce anual bunuri și servicii în valoare de 28,8 trilioane de dolari. Asta înseamnă mai mult decât următoarele trei economii ca mărime — China, Germania și Japonia — la un loc. Reprezintă aproximativ 25% din întreaga producție economică globală generată de o țară care are doar 4,2% din populația lumii.",
      "Ceea ce face această realizare și mai extraordinară este durabilitatea ei. Statele Unite au fost cea mai mare economie a lumii timp de peste 130 de ani consecutivi — prin Marea Criză Economică, două războaie mondiale, Războiul Rece, criza financiară din 2008 și pandemia COVID-19. Nicio altă economie modernă nu a demonstrat această combinație de scară și reziliență.",
    ];
  }

  return GDP_OVERVIEW_PARAGRAPHS;
}

export function getCapitalMarketsParagraphs(locale: Locale) {
  if (locale === "ro") {
    return [
      "Bursa din New York și NASDAQ reprezintă împreună cele mai adânci, lichide și transparente piețe de capital din istoria umanității. Capitalizarea lor cumulată depășește 47 de trilioane de dolari — mai mult decât PIB-ul oricărei națiuni, cu excepția Statelor Unite. Aceste piețe nu sunt doar locuri unde se tranzacționează acțiuni; ele sunt motorul prin care este finanțată inovația americană.",
      "Piața americană de obligațiuni — cu 27 de trilioane de dolari doar în titluri de Trezorerie restante — este fundamentul finanțelor globale. Randamentele titlurilor de Trezorerie ale SUA sunt rata de referință pentru randamentele fără risc în întreaga lume. Când instituții din Tokyo până la Frankfurt evaluează orice activ financiar, pornesc de la ceea ce plătește guvernul SUA.",
    ];
  }

  return CAPITAL_MARKETS_PARAGRAPHS;
}

export function getVcOverviewParagraphs(locale: Locale) {
  if (locale === "ro") {
    return [
      "Silicon Valley nu este doar un loc — este o filosofie făcută realitate. Ecosistemul de venture capital centrat în zona golfului San Francisco, cu sateliți în New York, Boston, Seattle, Austin și Miami, direcționează mai mult capital răbdător și dispus la risc către inovația aflată la început de drum decât restul lumii la un loc.",
      "Cifrele sunt uimitoare: startup-urile americane au atras aproximativ 170 de miliarde de dolari în venture capital în 2023 — aproape jumătate din tot VC-ul investit global. Rezultatul? 659 de companii unicorn, adică 52% din întreg ecosistemul global. De la iPhone la Google Search și ChatGPT, instrumentele care definesc civilizația modernă s-au născut aici.",
    ];
  }

  return VC_OVERVIEW_PARAGRAPHS;
}

export function getDollarOverviewParagraphs(locale: Locale) {
  if (locale === "ro") {
    return [
      "Dolarul american nu este doar moneda a 335 de milioane de americani — este sistemul de operare al economiei globale. De la acordul Bretton Woods din 1944 și consolidat de aranjamentele petrodolarului din anii 1970, dolarul a servit drept monedă de rezervă, mijloc de comerț și depozit final de valoare pentru lume. Acest statut oferă Statelor Unite un «privilegiu exorbitant» — capacitatea de a se împrumuta în propria monedă la costuri competitive la nivel global.",
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
          "Cea mai mare economie din istoria umană — 28,8 trilioane de dolari și în creștere",
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
          "America alimentează comerțul global — de la avioane la software",
      },
    ];
  }

  return ECONOMY_SUB_PAGES;
}
