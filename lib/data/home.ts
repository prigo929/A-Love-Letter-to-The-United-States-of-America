export const KEY_STATS = [
  {
    id: 'gdp',
    prefix: '#',
    value: 1,
    suffix: ' Economy',
    label: '$28.8 Trillion GDP',
    source: 'World Bank 2024',
    color: 'gold' as const,
  },
  {
    id: 'population',
    value: 335,
    suffix: 'M+',
    label: 'Americans',
    description: '335 million stories',
    source: 'US Census Bureau',
    color: 'white' as const,
  },
  {
    id: 'national-parks',
    value: 63,
    label: 'National Parks',
    description: '85 million acres of wonder',
    source: 'National Park Service',
    color: 'white' as const,
  },
  {
    id: 'military-bases',
    value: 800,
    suffix: '+',
    label: 'Military Bases',
    description: 'Worldwide presence',
    source: 'Department of Defense',
    color: 'white' as const,
  },
  {
    id: 'nobel-prizes',
    value: 400,
    suffix: '+',
    label: 'Nobel Prizes',
    description: 'More than any nation',
    source: 'Nobel Foundation',
    color: 'white' as const,
  },
  {
    id: 'military',
    prefix: '#',
    value: 1,
    label: 'Military Power',
    description: '$886B defense budget',
    source: 'SIPRI 2024',
    color: 'gold' as const,
  },
] as const

export const HOME_COPY = {
  sectionGridSummary:
    'From its $28.8 trillion economy to 63 national parks. From the Constitution to the semiconductor. Every chapter of America\'s extraordinary story.',
  statSources:
    'Sources: World Bank, SIPRI, NPS, Nobel Foundation, DoD — 2024 data',
} as const

export const ECONOMY_PAGE_COPY = {
  heroValue: '$28.8T',
  description:
    'The United States economy — $28.8 trillion, the largest in human history.',
  body:
    'Phase 3 — Economy section — coming soon. Full charts, data, and analysis of America\'s unrivaled economic dominance.',
} as const
