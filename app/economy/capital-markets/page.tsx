// ─── Capital Markets Sub-Page ─────────────────────────────────────────────────

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumb }      from '@/components/layout/Breadcrumb'
import { FactCard }        from '@/components/sections/FactCard'
import { QuoteBlock }      from '@/components/sections/QuoteBlock'
import { SP500Chart }      from '@/components/data/SP500Chart'
import { MarketCapChart }  from '@/components/data/DollarMarketCharts'
import {
  SP500_HISTORY,
  MARKET_CAP_BY_EXCHANGE,
  CAPITAL_MARKETS_FACTS,
} from '@/lib/data/economy-data'
import { BLUR_PLACEHOLDER } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Capital Markets | Economy | America: The Greatest Nation',
  description:
    'NYSE + NASDAQ: $47 trillion in market cap. US Treasuries set the world\'s risk-free rate. The deepest, most liquid capital markets in human history.',
  alternates: { canonical: '/economy/capital-markets' },
}

const CAPITAL_MARKETS_EXTENDED_FACTS = [
  {
    id: 'nyse-history',
    fact: 'The NYSE has operated continuously under the buttonwood tree agreement since 1792',
    detail: 'Founded under a buttonwood tree on Wall Street, the NYSE is older than most nations on Earth and has been the center of global finance for over 230 years.',
    source: 'NYSE Historical Records',
    color: 'gold' as const,
  },
  {
    id: 'spy-liquidity',
    fact: 'S&P 500 ETFs trade $50B+ in volume every single trading day',
    detail: 'The SPY ETF alone regularly exceeds $50 billion in daily volume — more than the entire annual GDP of many nations, traded in a single day on a single American exchange.',
    source: 'Bloomberg 2024',
    color: 'red' as const,
  },
  {
    id: 'private-equity',
    fact: 'US private equity manages over $12 trillion in assets',
    detail: 'America\'s private equity industry — Blackstone, Apollo, KKR, Carlyle — manages more capital than the GDP of China, Japan, and Germany combined in private markets alone.',
    source: 'Preqin 2024',
    color: 'blue' as const,
  },
  {
    id: 'hedge-funds',
    fact: '70% of global hedge fund AUM is managed from the United States',
    detail: 'Greenwich, CT and Midtown Manhattan host the world\'s most sophisticated capital allocators. Ray Dalio\'s Bridgewater alone manages $150B+ in assets.',
    source: 'Preqin / HFR 2024',
    color: 'gold' as const,
  },
  {
    id: 'ipo-market',
    fact: 'The US IPO market raises more capital than the next 5 exchanges combined',
    detail: 'Companies from around the world — Alibaba, Arm Holdings, Spotify — choose to list on US exchanges to access American capital depth. There is no rival.',
    source: 'Ernst & Young Global IPO Monitor 2024',
    color: 'red' as const,
  },
  {
    id: 'treasury-market',
    fact: 'The US Treasury market is the most liquid financial market in history',
    detail: '$700+ billion in US Treasuries trade hands every single day — more than most countries\' annual GDP. This liquidity is the foundation of global financial stability.',
    source: 'Federal Reserve Bank of New York 2024',
    color: 'blue' as const,
  },
]

const MAJOR_US_EXCHANGES = [
  {
    name: 'NYSE',
    founded: 1792,
    marketCap: '$25.1 Trillion',
    description: 'The world\'s largest stock exchange by market cap — home to the world\'s most iconic corporations, from JPMorgan Chase to Berkshire Hathaway.',
    famous: 'JPMorgan Chase, Berkshire Hathaway, ExxonMobil, J&J, Visa',
  },
  {
    name: 'NASDAQ',
    founded: 1971,
    marketCap: '$22.4 Trillion',
    description: 'The technology exchange — where Apple, Microsoft, NVIDIA, Alphabet, Amazon, and Meta are listed. NASDAQ is synonymous with American technological dominance.',
    famous: 'Apple, Microsoft, NVIDIA, Alphabet, Amazon, Meta, Tesla',
  },
  {
    name: 'CME Group',
    founded: 1848,
    marketCap: 'Derivatives Exchange',
    description: 'The world\'s leading derivatives exchange — setting global prices for everything from corn futures to interest rate swaps and foreign currency options.',
    famous: 'Oil futures, agricultural futures, interest rate swaps, FX options',
  },
]

export default function CapitalMarketsPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1920&auto=format&fit=crop"
          alt="Stock market trading screens"
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/90 to-navy-dark" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Economy', href: '/economy' },
              { label: 'Capital Markets' },
            ]}
            className="mb-8"
          />
          <p className="mb-4 section-eyebrow">Capital Markets</p>
          <h1 className="mb-4 font-hero text-6xl text-white sm:text-7xl">
            WALL STREET<br />
            <span className="text-glory-gold">POWERS THE WORLD</span>
          </h1>
          <p className="max-w-2xl font-body text-lg text-white/65 leading-relaxed">
            NYSE + NASDAQ: $47 trillion in combined market capitalization.
            The US Treasury as the world&apos;s risk-free benchmark. The deepest,
            most transparent, most liquid capital markets in human history.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          {/* Market cap comparison */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              Stock Exchange Market Cap — US vs World
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              The United States hosts the two largest stock exchanges on Earth —
              by a staggering margin. The NYSE ($25.1T) and NASDAQ ($22.4T) together
              represent more market capitalization than the next five exchanges combined.
              American exchanges don&apos;t just lead — they dominate.
            </p>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <MarketCapChart
                data={MARKET_CAP_BY_EXCHANGE}
                title="Global Stock Exchange Market Cap (2024, USD Trillions)"
                source="World Federation of Exchanges 2024"
              />
            </div>
          </section>

          {/* S&P 500 */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              The S&P 500 — The World&apos;s Benchmark
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              No index is watched more closely. No index is replicated more widely.
              The S&P 500 tracks the 500 largest publicly traded US companies —
              and its performance is the world&apos;s de facto report card on
              capitalist prosperity. Since 1980, it has delivered total returns
              exceeding 3,900%.
            </p>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <SP500Chart
                data={SP500_HISTORY}
                title="S&P 500 — 45 Years of American Capital Market Performance"
                source="S&P Global / Yahoo Finance"
              />
            </div>
          </section>

          {/* Major exchanges */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              America&apos;s Major Exchanges
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {MAJOR_US_EXCHANGES.map((exchange) => (
                <div
                  key={exchange.name}
                  className="rounded-2xl border border-white/10 bg-navy-mid p-6 transition-colors hover:border-glory-gold/30"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="font-hero text-3xl text-glory-gold">{exchange.name}</h3>
                    <span className="rounded-full bg-white/8 px-2.5 py-1 font-body text-xs text-white/50">
                      Est. {exchange.founded}
                    </span>
                  </div>
                  <p className="mb-2 font-hero text-xl text-white">{exchange.marketCap}</p>
                  <p className="mb-4 font-body text-sm leading-relaxed text-white/55">
                    {exchange.description}
                  </p>
                  <p className="border-t border-white/8 pt-3 font-body text-xs text-white/35">
                    {exchange.famous}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Extended facts */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              The Capital Markets Advantage
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CAPITAL_MARKETS_EXTENDED_FACTS.map((fact) => (
                <FactCard
                  key={fact.id}
                  fact={fact.fact}
                  detail={fact.detail}
                  source={fact.source}
                  color={fact.color}
                  variant="dark"
                />
              ))}
            </div>
          </section>

          <QuoteBlock
            quote="The stock market is a mechanism for transferring wealth from the impatient to the patient. American investors who stayed patient through every crisis became the wealthiest people in history."
            attribution="Warren Buffett"
            title="Chairman & CEO, Berkshire Hathaway — Omaha, Nebraska"
          />

          {/* Back nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link
              href="/economy/gdp-growth"
              className="font-body text-sm text-white/50 transition-colors hover:text-white"
            >
              ← GDP & Scale
            </Link>
            <Link
              href="/economy/startups-venture-capital"
              className="font-body text-sm font-semibold text-glory-gold transition-colors hover:text-glory-gold-dark"
            >
              Startups & VC →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
