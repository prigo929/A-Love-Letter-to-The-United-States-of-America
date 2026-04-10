// ─── App Constants ────────────────────────────────────────────────────────────
// Single source of truth for colors, breakpoints, and navigation data.

// ─── Colors (mirrors tailwind.config.ts) ─────────────────────────────────────
export const COLORS = {
  gloryRed:       '#B22234',
  gloryRedDark:   '#8B1A26',
  gloryRedLight:  '#D4404F',
  gloryBlue:      '#3C3B6E',
  gloryBlueDark:  '#2a2950',
  gloryBlueLight: '#5554A0',
  gloryGold:      '#FFD700',
  gloryGoldDark:  '#CC9900',
  navyDark:       '#0d1117',
  navyMid:        '#1a1f3a',
  navyLight:      '#252b4a',
  parchment:      '#F5F0E8',
  parchmentDark:  '#E8E0CC',
} as const

// ─── Site Metadata ────────────────────────────────────────────────────────────
export const SITE = {
  name:        'America: The Greatest Nation',
  tagline:     'The Greatest Nation in the History of Human Civilization',
  description: 'A cinematic celebration of the United States of America — its history, achievements, natural wonders, and enduring promise.',
  url:         process.env.NEXT_PUBLIC_SITE_URL ?? 'https://americagreatest.com',
  og:          '/images/og-default.jpg',
  twitter:     '@AmericaGreatest',
  founded:     1776,
} as const

// ─── Navigation Structure ─────────────────────────────────────────────────────
// Powers both the header mega-menu and the sitemap page.

export const NAV_SECTIONS = [
  {
    title: 'Economy',
    href:  '/economy',
    description: 'The engine of the world — $28.8T GDP and counting',
    imageSrc: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
    badge: '#1 Economy',
    items: [
      { label: 'GDP & Scale',          href: '/economy/gdp-growth',              description: 'The largest economy on Earth' },
      { label: 'Capital Markets',      href: '/economy/capital-markets',         description: 'NYSE, NASDAQ & Wall Street' },
      { label: 'Venture Capital',      href: '/economy/startups-venture-capital', description: '50% of global VC flows here' },
      { label: 'Dollar Dominance',     href: '/economy/dollar-dominance',        description: 'The world\'s reserve currency' },
      { label: 'Trade & Exports',      href: '/economy/trade-and-exports',       description: 'America powers global commerce' },
    ],
  },
  {
    title: 'Nature',
    href:  '/nature',
    description: 'From the Arctic to the tropics — unrivaled natural beauty',
    imageSrc: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop',
    badge: '63 National Parks',
    items: [
      { label: 'National Parks',  href: '/nature/national-parks', description: '63 parks across 85 million acres' },
      { label: 'Alaska',          href: '/nature/alaska',          description: 'The last frontier' },
      { label: 'Rocky Mountains', href: '/nature/rockies',         description: '53 peaks over 14,000 feet' },
      { label: 'Grand Canyon',    href: '/nature/grand-canyon',    description: 'One mile deep, 277 miles long' },
      { label: 'Yellowstone',     href: '/nature/yellowstone',     description: 'The world\'s first national park' },
      { label: 'Great Lakes',     href: '/nature/great-lakes',     description: '21% of Earth\'s fresh surface water' },
    ],
  },
  {
    title: 'Military',
    href:  '/military',
    description: 'The most powerful military in the history of civilization',
    imageSrc: 'https://unsplash.com/photos/ZiLJnc_iR90/download?force=true&w=800',
    badge: '$886B Budget',
    items: [
      { label: 'Overview',       href: '/military',                description: '$886B budget, 1.3M active duty' },
      { label: 'US Navy',        href: '/military/navy',           description: '11 carrier strike groups' },
      { label: 'US Air Force',   href: '/military/air-force',      description: 'Most advanced in history' },
      { label: 'Space Force',    href: '/military/space-force',    description: 'The world\'s first space branch' },
      { label: 'Global Bases',   href: '/military/global-bases',   description: '800+ bases in 80+ countries' },
      { label: 'Intelligence',   href: '/military/intelligence',   description: 'CIA, NSA, DIA — unmatched reach' },
    ],
  },
  {
    title: 'Constitution',
    href:  '/constitution',
    description: '250 years of unbroken democratic government',
    imageSrc: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=800&auto=format&fit=crop',
    badge: 'Est. 1776',
    items: [
      { label: 'The Foundation',        href: '/constitution',                      description: '1776 — the miracle in Philadelphia' },
      { label: 'Bill of Rights',        href: '/constitution/bill-of-rights',       description: 'The first 10 amendments' },
      { label: 'First Amendment',       href: '/constitution/first-amendment',      description: 'Broadest free speech on Earth' },
      { label: 'Second Amendment',      href: '/constitution/second-amendment',     description: 'The right to bear arms' },
      { label: 'Federalism',            href: '/constitution/federalism',           description: 'Laboratories of democracy' },
      { label: 'Separation of Powers',  href: '/constitution/separation-of-powers', description: 'Tyranny made nearly impossible' },
    ],
  },
  {
    title: 'Culture',
    href:  '/culture',
    description: 'America didn\'t just build a nation — it built global culture',
    imageSrc: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800&auto=format&fit=crop',
    badge: 'Global Culture',
    items: [
      { label: 'Food & Drinks',       href: '/culture/food-and-drinks', description: 'Burgers, Coke, BBQ & more' },
      { label: 'Music Genres',        href: '/culture/music-genres',    description: 'Jazz, Blues, Rock, Hip Hop — all American' },
      { label: 'Fashion',             href: '/culture/fashion',         description: 'Blue jeans to sneakers' },
      { label: 'Film & Hollywood',    href: '/culture/film-and-storytelling', description: '#1 film industry on Earth' },
      { label: 'Iconic Brands',       href: '/culture/companies-brands', description: 'Apple, Disney, Nike & the rest' },
      { label: 'Sports',              href: '/culture/sports',           description: 'NFL, NBA, MLB — American originals' },
    ],
  },
  {
    title: 'Innovation',
    href:  '/innovation',
    description: 'The internet, the iPhone, AI — all made in America',
    imageSrc: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    badge: 'Silicon Valley',
    items: [
      { label: 'The Internet',       href: '/innovation/internet-history', description: 'ARPANET to the World Wide Web' },
      { label: 'AI & Tech',          href: '/innovation/ai-and-tech',      description: 'OpenAI, Google, Anthropic lead the way' },
      { label: 'Smartphones',        href: '/innovation/smartphones',      description: 'iPhone changed the world' },
      { label: 'Cloud Computing',    href: '/innovation/cloud-computing',  description: 'AWS powers the internet' },
      { label: 'Space Technology',   href: '/innovation/space-technology', description: 'NASA to SpaceX' },
      { label: 'Gaming',             href: '/innovation/gaming',           description: 'Atari to Epic Games' },
    ],
  },
  {
    title: 'Science',
    href:  '/science',
    description: 'They built the modern world, one invention at a time',
    imageSrc: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop',
    badge: '400+ Nobel Prizes',
    items: [
      { label: 'Inventions Pre-1890',  href: '/science/inventions-pre-1890',  description: 'Telegraph, lightbulb, telephone' },
      { label: 'Inventions 1890-1945', href: '/science/inventions-1890-1945', description: 'Airplane, assembly line, nuclear fission' },
      { label: 'Post-War Miracles',    href: '/science/inventions-post-1991', description: 'Transistor, microchip, internet' },
      { label: 'Medicine & Biotech',   href: '/science/medicine-and-biotech', description: 'NIH, vaccines, cancer breakthroughs' },
    ],
  },
  {
    title: 'Universities',
    href:  '/universities',
    description: '7 of the top 10 universities in the world are American',
    imageSrc: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=800&auto=format&fit=crop',
    badge: 'Top of the World',
    items: [
      { label: 'Ivy League',              href: '/universities/ivy-league',              description: 'Harvard, Yale, Princeton & more' },
      { label: 'STEM Powerhouses',        href: '/universities/stem-powerhouses',        description: 'MIT, Stanford, Caltech' },
      { label: 'Business Schools',        href: '/universities/business-schools',        description: 'HBS, Wharton, Booth' },
      { label: 'Public Research',         href: '/universities/public-research-universities', description: 'Berkeley, Michigan, UT Austin' },
    ],
  },
  {
    title: 'Quality of Life',
    href:  '/quality-of-life',
    description: 'The highest standard of living for the most people',
    imageSrc: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop',
    badge: 'American Dream',
    items: [
      { label: 'Income & Wages',    href: '/quality-of-life/income-and-wages', description: 'Highest median wages on Earth' },
      { label: 'Housing',           href: '/quality-of-life/housing',          description: '2,500 sq ft average — 3x the world' },
      { label: 'Food Abundance',    href: '/quality-of-life/food-abundance',   description: 'Most calories per capita' },
      { label: 'Transportation',    href: '/quality-of-life/transportation',   description: 'The car culture that built freedom' },
      { label: 'Leisure',           href: '/quality-of-life/leisure',          description: 'Entertainment capital of Earth' },
    ],
  },
  {
    title: 'Global Leadership',
    href:  '/global-leadership',
    description: 'The indispensable nation — leading the free world since 1945',
    imageSrc: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=800&auto=format&fit=crop',
    badge: 'Free World Leader',
    items: [
      { label: 'NATO Alliance',        href: '/global-leadership/nato',                description: 'Defender of the free world' },
      { label: 'Dollar as Reserve',    href: '/global-leadership/dollar-as-reserve',   description: '60%+ of global reserves' },
      { label: 'Soft Power',           href: '/global-leadership/soft-power',          description: 'Hollywood to Harvard' },
      { label: 'UN & Institutions',    href: '/global-leadership/un',                  description: 'Founder of the postwar order' },
    ],
  },
] as const

// ─── Key Stats (used in home hero and stat bar) ───────────────────────────────
export const KEY_STATS = [
  {
    id:          'gdp',
    prefix:      '#',
    value:       1,
    suffix:      ' Economy',
    label:       '$28.8 Trillion GDP',
    source:      'World Bank 2024',
    color:       'gold' as const,
  },
  {
    id:          'population',
    value:       335,
    suffix:      'M+',
    label:       'Americans',
    description: '335 million stories',
    source:      'US Census Bureau',
    color:       'white' as const,
  },
  {
    id:          'national-parks',
    value:       63,
    label:       'National Parks',
    description: '85 million acres of wonder',
    source:      'National Park Service',
    color:       'white' as const,
  },
  {
    id:          'military-bases',
    value:       800,
    suffix:      '+',
    label:       'Military Bases',
    description: 'Worldwide presence',
    source:      'Department of Defense',
    color:       'white' as const,
  },
  {
    id:          'nobel-prizes',
    value:       400,
    suffix:      '+',
    label:       'Nobel Prizes',
    description: 'More than any nation',
    source:      'Nobel Foundation',
    color:       'white' as const,
  },
  {
    id:          'military',
    prefix:      '#',
    value:       1,
    label:       'Military Power',
    description: '$886B defense budget',
    source:      'SIPRI 2024',
    color:       'gold' as const,
  },
] as const

// ─── Unsplash Image IDs (for section placeholders) ────────────────────────────
// Format: https://images.unsplash.com/photo-{ID}?q=80&w={W}&auto=format&fit=crop
export const HERO_IMAGES = [
  {
    id:       'grand-canyon',
    unsplash: 'photo-1508193638397-1c4234db14d8',
    alt:      'Grand Canyon at sunrise, illuminated in deep orange and gold',
  },
  {
    id:       'nyc-skyline',
    unsplash: 'photo-1538970272646-f61fabb3a8a2',
    alt:      'New York City skyline at dusk, Manhattan glittering with lights',
  },
  {
    id:       'aircraft-carrier',
    src:      'https://unsplash.com/photos/ZiLJnc_iR90/download?force=true&w=1920',
    alt:      'US Air Force cargo plane on the tarmac, ready for rapid deployment',
  },
  {
    id:       'silicon-valley',
    unsplash: 'photo-1518770660439-4636190af475',
    alt:      'Silicon Valley tech campus — the innovation capital of Earth',
  },
  {
    id:       'wheat-fields',
    unsplash: 'photo-1500382017468-9049fed747ef',
    alt:      'Golden wheat fields at sunset — America\'s vast agricultural heartland',
  },
] as const
