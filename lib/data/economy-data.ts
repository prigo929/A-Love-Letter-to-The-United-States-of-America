// ─── Economy Section Data ─────────────────────────────────────────────────────
// All static data for the Economy section and its sub-pages.
// Components import from here — never hardcode in JSX.

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GdpDataPoint {
  country: string
  gdp: number       // USD Trillions
  flag: string
  highlight?: boolean
}

export interface GdpPerCapitaPoint {
  country: string
  gdpPerCapita: number  // USD thousands
  flag: string
  highlight?: boolean
}

export interface SP500DataPoint {
  year: number
  value: number     // Index value
}

export interface VCDataPoint {
  country: string
  investment: number  // USD Billions
  percentage: number  // % of global
  highlight?: boolean
}

export interface UnicornDataPoint {
  country: string
  unicorns: number
  percentage: number
  highlight?: boolean
}

export interface DollarReservePoint {
  currency: string
  percentage: number
  color: string
}

export interface MarketCapPoint {
  exchange: string
  marketCap: number   // USD Trillions
  country: string
  highlight?: boolean
}

export interface TradeDataPoint {
  category: string
  exports: number     // USD Billions
}

export interface EconomyStat {
  id: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
  description: string
  source: string
  color?: 'gold' | 'red' | 'blue' | 'white'
}

export interface EconomyFact {
  id: string
  fact: string
  detail: string
  source: string
  color: 'gold' | 'red' | 'blue'
}

export interface StartupEcosystem {
  city: string
  state: string
  nickname: string
  unicorns: number
  vcFunding: string
  keyCompanies: string[]
  lat: number
  lng: number
}

export interface FoundingTimeline {
  year: number
  company: string
  founder: string
  currentValuation: string
  industry: string
}

// ─── GDP Comparison Data ──────────────────────────────────────────────────────

export const GDP_COMPARISON: GdpDataPoint[] = [
  { country: 'United States', gdp: 28.8,  flag: '🇺🇸', highlight: true },
  { country: 'China',          gdp: 18.5,  flag: '🇨🇳' },
  { country: 'Germany',        gdp: 4.5,   flag: '🇩🇪' },
  { country: 'Japan',          gdp: 4.2,   flag: '🇯🇵' },
  { country: 'India',          gdp: 3.9,   flag: '🇮🇳' },
  { country: 'United Kingdom', gdp: 3.1,   flag: '🇬🇧' },
  { country: 'France',         gdp: 3.0,   flag: '🇫🇷' },
  { country: 'Brazil',         gdp: 2.3,   flag: '🇧🇷' },
]

export const GDP_PER_CAPITA: GdpPerCapitaPoint[] = [
  { country: 'United States', gdpPerCapita: 82.7, flag: '🇺🇸', highlight: true },
  { country: 'Germany',        gdpPerCapita: 54.3, flag: '🇩🇪' },
  { country: 'United Kingdom', gdpPerCapita: 46.5, flag: '🇬🇧' },
  { country: 'France',         gdpPerCapita: 45.0, flag: '🇫🇷' },
  { country: 'Japan',          gdpPerCapita: 33.8, flag: '🇯🇵' },
  { country: 'China',          gdpPerCapita: 13.1, flag: '🇨🇳' },
  { country: 'Brazil',         gdpPerCapita: 10.7, flag: '🇧🇷' },
  { country: 'India',          gdpPerCapita: 2.8,  flag: '🇮🇳' },
]

// ─── S&P 500 Historical Data (1980–2024) ──────────────────────────────────────

export const SP500_HISTORY: SP500DataPoint[] = [
  { year: 1980, value: 136 },
  { year: 1985, value: 211 },
  { year: 1990, value: 354 },
  { year: 1995, value: 615 },
  { year: 2000, value: 1498 },
  { year: 2002, value: 879 },   // Dot-com bust
  { year: 2005, value: 1248 },
  { year: 2007, value: 1477 },
  { year: 2009, value: 757 },   // Financial crisis
  { year: 2012, value: 1426 },
  { year: 2015, value: 2044 },
  { year: 2017, value: 2674 },
  { year: 2019, value: 3231 },
  { year: 2020, value: 3756 },
  { year: 2021, value: 4766 },
  { year: 2022, value: 3840 },
  { year: 2023, value: 4742 },
  { year: 2024, value: 5460 },
]

// ─── Venture Capital Data ─────────────────────────────────────────────────────

export const VC_BY_COUNTRY: VCDataPoint[] = [
  { country: 'United States', investment: 170,  percentage: 47, highlight: true },
  { country: 'China',          investment: 52,   percentage: 14 },
  { country: 'United Kingdom', investment: 22,   percentage: 6  },
  { country: 'India',          investment: 18,   percentage: 5  },
  { country: 'Germany',        investment: 12,   percentage: 3  },
  { country: 'France',         investment: 9,    percentage: 2.5},
  { country: 'Rest of World',  investment: 81,   percentage: 22.5},
]

export const UNICORNS_BY_COUNTRY: UnicornDataPoint[] = [
  { country: 'United States', unicorns: 659,  percentage: 52, highlight: true },
  { country: 'China',          unicorns: 168,  percentage: 13 },
  { country: 'India',          unicorns: 70,   percentage: 5.5},
  { country: 'United Kingdom', unicorns: 52,   percentage: 4  },
  { country: 'Germany',        unicorns: 32,   percentage: 2.5},
  { country: 'France',         unicorns: 27,   percentage: 2  },
  { country: 'Rest of World',  unicorns: 262,  percentage: 21 },
]

// ─── Dollar Reserve Data (IMF COFER 2024) ─────────────────────────────────────

export const DOLLAR_RESERVE_SHARE: DollarReservePoint[] = [
  { currency: 'US Dollar (USD)',   percentage: 57.4, color: '#B22234' },
  { currency: 'Euro (EUR)',        percentage: 20.0, color: '#3C3B6E' },
  { currency: 'Japanese Yen',     percentage: 5.8,  color: '#4B5563' },
  { currency: 'British Pound',    percentage: 4.8,  color: '#6B7280' },
  { currency: 'Chinese Renminbi', percentage: 2.3,  color: '#9CA3AF' },
  { currency: 'Other',            percentage: 9.7,  color: '#374151' },
]

// ─── Stock Market Cap Data ────────────────────────────────────────────────────

export const MARKET_CAP_BY_EXCHANGE: MarketCapPoint[] = [
  { exchange: 'NYSE',       marketCap: 25.1, country: '🇺🇸 USA',    highlight: true },
  { exchange: 'NASDAQ',     marketCap: 22.4, country: '🇺🇸 USA',    highlight: true },
  { exchange: 'Shanghai',   marketCap: 7.3,  country: '🇨🇳 China'  },
  { exchange: 'Euronext',   marketCap: 6.8,  country: '🇪🇺 Europe' },
  { exchange: 'Tokyo (JPX)',marketCap: 6.5,  country: '🇯🇵 Japan'  },
  { exchange: 'Hong Kong',  marketCap: 4.7,  country: '🇭🇰 HK'     },
  { exchange: 'London',     marketCap: 3.2,  country: '🇬🇧 UK'     },
]

// ─── US Trade Exports ─────────────────────────────────────────────────────────

export const US_EXPORT_CATEGORIES: TradeDataPoint[] = [
  { category: 'Aircraft & Parts',        exports: 132 },
  { category: 'Petroleum Products',      exports: 119 },
  { category: 'Semiconductors',          exports: 87  },
  { category: 'Medical Devices',         exports: 74  },
  { category: 'Automobiles',             exports: 65  },
  { category: 'Pharmaceuticals',         exports: 63  },
  { category: 'Agricultural Products',   exports: 58  },
  { category: 'Industrial Machinery',    exports: 52  },
]

// ─── Economy Hero Stats ───────────────────────────────────────────────────────

export const ECONOMY_HERO_STATS: EconomyStat[] = [
  {
    id: 'gdp',
    value: 28.8,
    suffix: 'T',
    prefix: '$',
    decimals: 1,
    label: 'GDP (2024)',
    description: 'Largest economy in human history',
    source: 'World Bank 2024',
    color: 'gold',
  },
  {
    id: 'market-cap',
    value: 47,
    suffix: 'T+',
    prefix: '$',
    label: 'US Stock Markets',
    description: 'NYSE + NASDAQ combined',
    source: 'WFE 2024',
    color: 'gold',
  },
  {
    id: 'fortune500',
    value: 136,
    label: 'Fortune 500 HQs',
    description: 'More than any other nation',
    source: 'Fortune 2024',
    color: 'white',
  },
  {
    id: 'vc',
    value: 47,
    suffix: '%',
    label: 'Global VC',
    description: 'America's share of world VC',
    source: 'NVCA 2024',
    color: 'white',
  },
]

// ─── Economy Fact Cards ───────────────────────────────────────────────────────

export const GDP_FACTS: EconomyFact[] = [
  {
    id: 'gdp-share',
    fact: 'The US represents ~25% of total world GDP',
    detail: 'With just 4.2% of the world\'s population, America generates a quarter of all global economic output.',
    source: 'World Bank 2024',
    color: 'gold',
  },
  {
    id: 'gdp-100-years',
    fact: 'Largest economy for 100+ consecutive years',
    detail: 'The United States has been the world\'s largest economy since the late 1800s — an unbroken reign of over a century.',
    source: 'IMF Historical Data',
    color: 'red',
  },
  {
    id: 'gdp-consumer',
    fact: 'US consumer spending alone ≈ Germany\'s entire GDP',
    detail: 'American household consumption is approximately $19 trillion — larger than the GDP of every nation except the US itself.',
    source: 'BEA & World Bank 2024',
    color: 'blue',
  },
  {
    id: 'gdp-companies',
    fact: '12 of the world\'s 20 most valuable companies are American',
    detail: 'Apple, Microsoft, NVIDIA, Alphabet, Amazon, Meta, Berkshire Hathaway — the global corporate elite is overwhelmingly American.',
    source: 'Forbes Global 2000, 2024',
    color: 'gold',
  },
]

export const CAPITAL_MARKETS_FACTS: EconomyFact[] = [
  {
    id: 'nyse-age',
    fact: 'The NYSE has operated continuously since 1792',
    detail: 'The New York Stock Exchange is the largest stock exchange on Earth by market capitalization — $25+ trillion — and has been the world\'s financial anchor for over 230 years.',
    source: 'NYSE / WFE 2024',
    color: 'gold',
  },
  {
    id: 'treasury-risk-free',
    fact: 'US Treasuries are the world\'s risk-free rate benchmark',
    detail: 'Every financial model on Earth uses US Treasury yields as the baseline for risk-free returns. The US bond market is $27 trillion — the deepest, most liquid market in history.',
    source: 'SIFMA 2024',
    color: 'red',
  },
  {
    id: 'nasdaq-tech',
    fact: 'NASDAQ lists the most valuable tech companies in history',
    detail: 'Apple, Microsoft, NVIDIA, Alphabet, Amazon, Meta — all listed on a single American exchange. The NASDAQ Composite has returned over 4,500% since 1985.',
    source: 'NASDAQ 2024',
    color: 'blue',
  },
]

export const VC_FACTS: EconomyFact[] = [
  {
    id: 'vc-share',
    fact: 'America attracts ~47% of all global VC investment',
    detail: 'In 2023, US startups raised approximately $170 billion in venture capital — nearly half of all VC deployed on Earth, despite having just 4% of the world\'s population.',
    source: 'NVCA / Pitchbook 2024',
    color: 'gold',
  },
  {
    id: 'unicorn-share',
    fact: '659+ US unicorns — over 52% of the global total',
    detail: 'A "unicorn" is a private company valued at $1 billion or more. America has built more of them than all other nations combined.',
    source: 'Pitchbook 2024',
    color: 'red',
  },
  {
    id: 'immigrant-founders',
    fact: '55%+ of US billion-dollar startups were founded by immigrants',
    detail: 'Elon Musk (South Africa), Sergey Brin (Russia), Andy Grove (Hungary), Jensen Huang (Taiwan) — America\'s open door to talent is a core economic superpower.',
    source: 'NFAP 2022',
    color: 'blue',
  },
]

export const DOLLAR_FACTS: EconomyFact[] = [
  {
    id: 'reserve-share',
    fact: 'USD is held in 57%+ of all global foreign exchange reserves',
    detail: 'Central banks around the world collectively hold $6.8 trillion in US dollar reserves. The next closest currency — the Euro — holds just 20%.',
    source: 'IMF COFER Q4 2023',
    color: 'gold',
  },
  {
    id: 'swift-share',
    fact: 'Over 40% of global SWIFT transactions are in US dollars',
    detail: 'International trade, commodities, oil, gas, gold — all priced and settled in dollars. This creates an extraordinary structural advantage for the American economy.',
    source: 'SWIFT 2024',
    color: 'red',
  },
  {
    id: 'petrodollar',
    fact: 'Global oil markets are settled almost exclusively in dollars',
    detail: 'Since the 1970s Petrodollar agreement, oil — the world\'s most traded commodity — has been denominated in USD, embedding dollar demand into every nation\'s economy.',
    source: 'Federal Reserve / IMF',
    color: 'blue',
  },
]

// ─── Startup Ecosystem Cities ─────────────────────────────────────────────────

export const STARTUP_ECOSYSTEMS: StartupEcosystem[] = [
  {
    city: 'San Francisco / Silicon Valley',
    state: 'California',
    nickname: 'The VC Capital of Earth',
    unicorns: 200,
    vcFunding: '$80B+ annually',
    keyCompanies: ['Apple', 'Google', 'Meta', 'NVIDIA', 'Salesforce', 'Airbnb'],
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    city: 'New York City',
    state: 'New York',
    nickname: 'Finance & Media Hub',
    unicorns: 97,
    vcFunding: '$30B+ annually',
    keyCompanies: ['Bloomberg', 'Goldman Sachs', 'Stripe', 'Peloton', 'Canva USA'],
    lat: 40.7128,
    lng: -74.0060,
  },
  {
    city: 'Boston',
    state: 'Massachusetts',
    nickname: 'Biotech & DeepTech',
    unicorns: 45,
    vcFunding: '$18B+ annually',
    keyCompanies: ['HubSpot', 'Carbon Black', 'Moderna', 'Kensho'],
    lat: 42.3601,
    lng: -71.0589,
  },
  {
    city: 'Seattle',
    state: 'Washington',
    nickname: 'Cloud & E-Commerce',
    unicorns: 38,
    vcFunding: '$12B+ annually',
    keyCompanies: ['Amazon', 'Microsoft', 'Boeing', 'Expedia', 'Convoy'],
    lat: 47.6062,
    lng: -122.3321,
  },
  {
    city: 'Austin',
    state: 'Texas',
    nickname: 'Silicon Hills',
    unicorns: 29,
    vcFunding: '$8B+ annually',
    keyCompanies: ['Tesla', 'Oracle', 'Dell', 'Indeed', 'HomeAway'],
    lat: 30.2672,
    lng: -97.7431,
  },
  {
    city: 'Miami',
    state: 'Florida',
    nickname: 'Crypto & LatAm Gateway',
    unicorns: 22,
    vcFunding: '$6B+ annually',
    keyCompanies: ['Chewy', 'Ultimate Software', 'Magic Leap', 'Citadel'],
    lat: 25.7617,
    lng: -80.1918,
  },
]

// ─── Founding Timeline ────────────────────────────────────────────────────────

export const STARTUP_TIMELINE: FoundingTimeline[] = [
  { year: 1975, company: 'Microsoft',  founder: 'Bill Gates & Paul Allen', currentValuation: '$3.1T',  industry: 'Software' },
  { year: 1976, company: 'Apple',      founder: 'Steve Jobs & Wozniak',    currentValuation: '$3.4T',  industry: 'Consumer Tech' },
  { year: 1994, company: 'Amazon',     founder: 'Jeff Bezos',              currentValuation: '$1.9T',  industry: 'E-Commerce / Cloud' },
  { year: 1998, company: 'Google',     founder: 'Brin & Page (Stanford)',  currentValuation: '$2.1T',  industry: 'Search / AI' },
  { year: 2002, company: 'SpaceX',     founder: 'Elon Musk',               currentValuation: '$210B',  industry: 'Space' },
  { year: 2003, company: 'Tesla',      founder: 'Musk / Eberhard',         currentValuation: '$650B',  industry: 'EVs' },
  { year: 2004, company: 'Facebook',   founder: 'Mark Zuckerberg',         currentValuation: '$1.4T',  industry: 'Social Media' },
  { year: 2006, company: 'Twitter/X',  founder: 'Dorsey / Williams',       currentValuation: '$44B',   industry: 'Social Media' },
  { year: 2008, company: 'Airbnb',     founder: 'Chesky / Gebbia',         currentValuation: '$85B',   industry: 'Travel' },
  { year: 2009, company: 'Uber',       founder: 'Travis Kalanick',         currentValuation: '$140B',  industry: 'Mobility' },
  { year: 2010, company: 'Instagram',  founder: 'Systrom & Krieger',       currentValuation: '$100B+', industry: 'Social Media' },
  { year: 2022, company: 'OpenAI',     founder: 'Altman / Musk / Brockman',currentValuation: '$80B+',  industry: 'AI' },
]

// ─── Overview Copy Blocks ─────────────────────────────────────────────────────

export const ECONOMY_OVERVIEW_PARAGRAPHS = [
  'The United States economy is the most powerful economic force in the history of human civilization — not by accident, not by geography alone, but by design. A constitutional system that protects private property, enforces contracts, and rewards individual initiative created the conditions for an explosion of wealth, productivity, and innovation unmatched in 5,000 years of recorded economic history.',
  'At $28.8 trillion in 2024, the US economy is not merely the largest — it is categorically different from every other economy on Earth. It is simultaneously the world\'s largest consumer market, its most important financial hub, the leading destination for foreign direct investment, the dominant technology innovator, and the issuer of the global reserve currency. No other nation has ever held all five crowns at once.',
  'The numbers are staggering but the story behind them is even more remarkable: a system built on free markets, low barriers to entry, tolerance for creative destruction, and an immigration policy that has attracted the world\'s most ambitious people for 250 years. The American economy does not succeed despite capitalism — it succeeds because of it.',
]

export const GDP_OVERVIEW_PARAGRAPHS = [
  'Let the scale settle in: the United States economy produces $28.8 trillion in goods and services annually. That is more than the next three largest economies — China ($18.5T), Germany ($4.5T), and Japan ($4.2T) — combined. It represents approximately 25% of all global economic output generated by a country with just 4.2% of the world\'s population.',
  'What makes this achievement even more extraordinary is its durability. The United States has been the world\'s largest economy for over 130 consecutive years — through the Great Depression, two World Wars, the Cold War, the financial crisis of 2008, and the COVID-19 pandemic. No other economy in modern history has demonstrated this combination of scale and resilience.',
]

export const CAPITAL_MARKETS_PARAGRAPHS = [
  'The New York Stock Exchange and NASDAQ together represent the deepest, most liquid, and most transparent capital markets in human history. Combined market capitalization exceeds $47 trillion — more than the GDP of every nation except the United States itself. These markets are not merely places where stocks are traded; they are the engine through which American innovation is financed.',
  'The US bond market — $27 trillion in outstanding Treasury securities alone — is the bedrock of global finance. US Treasury yields serve as the world\'s reference rate for risk-free returns. When institutions from Tokyo to Frankfurt price any financial asset, they start with what the US government pays.',
]

export const VC_OVERVIEW_PARAGRAPHS = [
  'Silicon Valley is not a place — it is a philosophy made physical. The venture capital ecosystem centered in the San Francisco Bay Area, with satellites in New York, Boston, Seattle, Austin, and Miami, channels more patient, risk-seeking capital into early-stage innovation than the rest of the world combined.',
  'The numbers are breathtaking: American startups raised approximately $170 billion in venture capital in 2023 — nearly half of all VC deployed globally. The result? 659 unicorn companies (private businesses valued over $1 billion), representing 52% of the entire global unicorn ecosystem. From the iPhone to Google Search to ChatGPT, the tools that define modern civilization were born here.',
]

export const DOLLAR_OVERVIEW_PARAGRAPHS = [
  'The US dollar is not merely the currency of 335 million Americans — it is the operating system of the global economy. Since the Bretton Woods agreement of 1944, and reinforced by the Petrodollar arrangements of the 1970s, the dollar has served as the world\'s reserve currency, trade medium, and ultimate store of value. This status confers on the United States an "exorbitant privilege" — the ability to borrow in its own currency at globally competitive rates.',
  'Today, 57.4% of all global foreign exchange reserves are held in US dollars. Over 40% of international trade is invoiced in dollars regardless of whether the United States is a party to the transaction. Oil, the world\'s most traded commodity, is priced in dollars in nearly every market on Earth. These structural facts embed dollar demand into the financial architecture of every nation on the planet.',
]

export const TRADE_OVERVIEW_PARAGRAPHS = [
  'The United States is both the world\'s largest importer and one of its most significant exporters — a reflection of an economy so dynamic it both produces and consumes at a scale no other nation can match. US merchandise exports exceed $2 trillion annually, led by aircraft, petroleum products, semiconductors, medical devices, and pharmaceuticals.',
  'Beyond goods, America dominates the export of services — financial services, software, education, entertainment, and professional consulting. American firms like JP Morgan, Goldman Sachs, McKinsey, and Harvard Business School export the intellectual capital that runs economies around the world. When you add services to the ledger, the American export story is far more impressive than the goods trade deficit suggests.',
]

// ─── Quote Data ───────────────────────────────────────────────────────────────

export const ECONOMY_QUOTES = [
  {
    id: 'friedman',
    quote: 'The great virtue of a free market system is that it does not care what color people are; it does not care what their religion is; it only cares whether they can produce something you want to buy.',
    attribution: 'Milton Friedman',
    title: 'Nobel Laureate in Economics',
  },
  {
    id: 'reagan',
    quote: 'There are no limits to growth and human progress when men and women are free to follow their dreams.',
    attribution: 'Ronald Reagan',
    title: '40th President of the United States',
  },
  {
    id: 'sowell',
    quote: 'The first lesson of economics is scarcity: there is never enough of anything to satisfy all those who want it. The first lesson of politics is to disregard the first lesson of economics.',
    attribution: 'Thomas Sowell',
    title: 'Economist & Senior Fellow, Hoover Institution',
  },
]

// ─── Sub-Page Navigation Cards ────────────────────────────────────────────────

export const ECONOMY_SUB_PAGES = [
  {
    href: '/economy/gdp-growth',
    title: 'GDP & Scale',
    description: 'The largest economy in human history — $28.8 trillion and counting',
    imageSrc: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop',
    imageAlt: 'New York City financial district skyline',
    badge: '$28.8T',
  },
  {
    href: '/economy/capital-markets',
    title: 'Capital Markets',
    description: 'NYSE, NASDAQ, and Wall Street — the financial backbone of civilization',
    imageSrc: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
    imageAlt: 'Stock market trading screens',
    badge: '$47T+',
  },
  {
    href: '/economy/startups-venture-capital',
    title: 'Startups & VC',
    description: 'Silicon Valley and beyond — where the future is funded',
    imageSrc: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    imageAlt: 'Modern startup office',
    badge: '47% of global VC',
  },
  {
    href: '/economy/dollar-dominance',
    title: 'Dollar Dominance',
    description: 'The world\'s reserve currency — the operating system of global finance',
    imageSrc: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=800&auto=format&fit=crop',
    imageAlt: 'US dollar bills close up',
    badge: '57% of reserves',
  },
  {
    href: '/economy/trade-and-exports',
    title: 'Trade & Exports',
    description: 'America powers global commerce — from aircraft to software',
    imageSrc: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop',
    imageAlt: 'Container port with cargo ships',
    badge: '$2T+ Exports',
  },
]
