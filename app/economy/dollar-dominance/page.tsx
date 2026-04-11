// ─── Dollar Dominance Sub-Page ────────────────────────────────────────────────

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumb }         from '@/components/layout/Breadcrumb'
import { FactCard }           from '@/components/sections/FactCard'
import { QuoteBlock }         from '@/components/sections/QuoteBlock'
import { DollarReserveChart } from '@/components/data/DollarMarketCharts'
import {
  DOLLAR_RESERVE_SHARE,
  DOLLAR_FACTS,
  DOLLAR_OVERVIEW_PARAGRAPHS,
} from '@/lib/data/economy-data'
import { BLUR_PLACEHOLDER } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Dollar Dominance | Economy | America: The Greatest Nation',
  description:
    'The US dollar: 57% of global FX reserves, the Petrodollar system, Bretton Woods to today. The world\'s reserve currency and its extraordinary advantages for America.',
  alternates: { canonical: '/economy/dollar-dominance' },
}

const DOLLAR_EXTENDED_FACTS = [
  {
    id: 'dollar-countries',
    fact: 'Over 65 countries peg or tightly link their currency to the US dollar',
    detail: 'From Panama (which uses USD as legal tender) to Saudi Arabia, dozens of nations anchor their monetary systems to the dollar — amplifying its global reach far beyond US borders.',
    source: 'IMF Annual Report on Exchange Rate Arrangements 2024',
    color: 'gold' as const,
  },
  {
    id: 'dollar-commodities',
    fact: 'Oil, gold, copper, wheat — virtually every major commodity is dollar-denominated',
    detail: 'When Brazil buys oil from Saudi Arabia, they transact in US dollars. When China imports copper from Chile, dollars change hands. American monetary policy is felt in every corner of the world.',
    source: 'BIS Quarterly Review 2024',
    color: 'red' as const,
  },
  {
    id: 'dollar-debt',
    fact: 'Over 50% of all international debt is denominated in US dollars',
    detail: 'Governments, corporations, and banks from Istanbul to Jakarta borrow in dollars. This creates a structural demand for dollars that underpins the currency\'s reserve status.',
    source: 'Bank for International Settlements 2024',
    color: 'blue' as const,
  },
  {
    id: 'dollar-seigniorage',
    fact: 'The US earns "seigniorage" — profit from issuing the world\'s money',
    detail: 'When the Federal Reserve issues dollars, it earns an interest-free loan from the world. Economists estimate the exorbitant privilege saves the US $100–$500 billion annually in borrowing costs.',
    source: 'Federal Reserve Research / IMF Working Papers',
    color: 'gold' as const,
  },
  {
    id: 'dollar-sanctions',
    fact: 'Dollar dominance gives the US unparalleled geopolitical leverage',
    detail: 'Being cut off from the dollar system — via SWIFT sanctions — is among the most powerful economic weapons available. Iran, Russia, and North Korea have all felt this power acutely.',
    source: 'US Treasury / OFAC',
    color: 'red' as const,
  },
  {
    id: 'dollar-fed',
    fact: 'The Federal Reserve is effectively the world\'s central bank',
    detail: 'When the Fed raises interest rates, capital flows globally shift. When the Fed cuts, emerging market debt becomes cheaper. No other institution holds this degree of global financial authority.',
    source: 'Bank for International Settlements / Federal Reserve',
    color: 'blue' as const,
  },
]

const DOLLAR_TIMELINE = [
  {
    year: 1944,
    event: 'Bretton Woods Agreement',
    description: 'Allied nations agree to peg their currencies to the US dollar, and the dollar to gold at $35/oz. The dollar becomes the cornerstone of the post-war financial order.',
  },
  {
    year: 1971,
    event: 'Nixon Closes the Gold Window',
    description: 'President Nixon ends dollar-gold convertibility. Rather than weaken the dollar\'s position, the move ushers in the era of the pure fiat dollar — which has only grown stronger.',
  },
  {
    year: 1973,
    event: 'Petrodollar System Established',
    description: 'The US negotiates with Saudi Arabia: oil is priced and sold exclusively in dollars in exchange for US military protection. The "Petrodollar" embeds dollar demand into global energy markets forever.',
  },
  {
    year: 1994,
    event: 'NAFTA & Dollar Expansion',
    description: 'Trade liberalization expands dollar use across the Americas. The peso crisis reinforces that dollar-denominated assets are the global safe haven.',
  },
  {
    year: 2008,
    event: 'Financial Crisis Confirms Dollar Supremacy',
    description: 'During the worst financial crisis since 1929 — a crisis that originated in America — global investors fled TO the dollar, not away from it. The dollar strengthened. This proved the dollar\'s irreplaceable safe-haven status.',
  },
  {
    year: 2022,
    event: 'Dollar Weaponized Against Russia',
    description: 'Russia\'s invasion of Ukraine triggers unprecedented dollar-based sanctions. $300B+ in Russian reserves frozen. The episode demonstrates the dollar\'s role as both economic instrument and geopolitical weapon.',
  },
  {
    year: 2024,
    event: 'Dollar Still Reigns at 80 Years',
    description: 'Despite repeated predictions of "de-dollarization," the dollar\'s share of global reserves remains above 57%, SWIFT dominance holds above 40%, and no credible rival has emerged. The dollar endures.',
  },
]

export default function DollarDominancePage() {
  return (
    <>
      {/* Hero */}
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image
          src="https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=1920&auto=format&fit=crop"
          alt="US dollar bills — the world's reserve currency"
          fill
          className="object-cover opacity-25"
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
              { label: 'Dollar Dominance' },
            ]}
            className="mb-8"
          />
          <p className="mb-4 section-eyebrow">Dollar Dominance</p>
          <h1 className="mb-4 font-hero text-6xl text-white sm:text-7xl">
            THE WORLD&apos;S<br />
            <span className="text-glory-gold">RESERVE CURRENCY</span>
          </h1>
          <p className="max-w-2xl font-body text-lg text-white/65 leading-relaxed">
            The US dollar is the operating system of the global economy. 57% of
            all foreign exchange reserves. 40%+ of global trade. Every barrel of
            oil. An 80-year reign that has never been seriously threatened.
          </p>

          {/* Key dollar stats */}
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { value: '57.4%', label: 'of global FX reserves', source: 'IMF COFER 2024' },
              { value: '40%+',  label: 'of SWIFT transactions',  source: 'SWIFT 2024'   },
              { value: '65+',   label: 'countries pegged to USD', source: 'IMF 2024'     },
            ].map((stat) => (
              <div key={stat.value} className="rounded-xl border border-glory-gold/20 bg-glory-gold/5 px-5 py-3">
                <p className="font-hero text-3xl text-glory-gold">{stat.value}</p>
                <p className="font-body text-sm text-white/65">{stat.label}</p>
                <p className="font-body text-xs text-white/35">{stat.source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          {/* Overview */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              The Exorbitant Privilege
            </h2>
            {DOLLAR_OVERVIEW_PARAGRAPHS.map((para, i) => (
              <p key={i} className="mb-5 font-body text-lg leading-relaxed text-white/65">
                {para}
              </p>
            ))}
          </section>

          {/* Reserve chart */}
          <section>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <DollarReserveChart
                data={DOLLAR_RESERVE_SHARE}
                title="Global Foreign Exchange Reserves by Currency (2024)"
                source="IMF COFER Q4 2023 — allocated reserves"
              />
            </div>
          </section>

          {/* Timeline */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              80 Years of Dollar Supremacy
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              The dollar&apos;s dominance was not accidental — it was built through deliberate
              policy, military power, and economic strength over eight decades.
            </p>
            <div className="relative space-y-0">
              {/* Vertical line */}
              <div className="absolute left-[52px] top-0 bottom-0 w-px bg-glory-gold/20 hidden sm:block" />

              {DOLLAR_TIMELINE.map((item, i) => (
                <div key={i} className="relative flex gap-5 pb-8">
                  {/* Year bubble */}
                  <div className="relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-2 border-glory-gold/40 bg-navy-dark">
                    <span className="font-hero text-sm text-glory-gold leading-none">{item.year}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-2xl border border-white/8 bg-navy-mid p-5">
                    <h3 className="mb-2 font-display text-lg font-semibold text-white">
                      {item.event}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-white/55">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Extended facts */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              The Dollar Advantage — In Detail
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...DOLLAR_FACTS, ...DOLLAR_EXTENDED_FACTS].map((fact) => (
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

          {/* Dedollarization callout */}
          <section className="rounded-2xl border border-glory-red/20 bg-glory-red/5 p-6 md:p-8">
            <h2 className="mb-4 font-display text-xl font-semibold text-white">
              On &ldquo;De-Dollarization&rdquo; — A Reality Check
            </h2>
            <p className="mb-4 font-body text-base leading-relaxed text-white/65">
              Every decade since Bretton Woods, analysts have predicted the dollar&apos;s
              imminent replacement. The Euro launch in 1999, China&apos;s rise in the 2000s,
              BRICS proposals in the 2020s — each was confidently declared the dollar&apos;s
              death knell. Each time, the dollar&apos;s share of global reserves declined
              modestly, then stabilized.
            </p>
            <p className="font-body text-base leading-relaxed text-white/65">
              The reason is structural: no rival offers the combination of deep liquid
              markets, rule of law, political stability, military power, and network
              effects that the dollar provides. The Chinese renminbi is not freely
              convertible. The Euro lacks a unified fiscal backstop. The dollar&apos;s position
              is not merely habitual — it is the rational choice of every rational
              central banker on Earth.
            </p>
            <p className="mt-4 font-body text-sm font-semibold text-glory-gold">
              The dollar endures — not because of inertia, but because nothing better exists.
            </p>
          </section>

          <QuoteBlock
            quote="America's ability to borrow in its own currency at the world's lowest rates is not luck — it is the reward for having built the most trustworthy financial system in human history."
            attribution="Lawrence Summers"
            title="Former US Secretary of the Treasury, Harvard University"
          />

          {/* Nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link href="/economy/startups-venture-capital" className="font-body text-sm text-white/50 hover:text-white transition-colors">
              ← Startups & VC
            </Link>
            <Link href="/economy/trade-and-exports" className="font-body text-sm font-semibold text-glory-gold hover:text-glory-gold-dark transition-colors">
              Trade & Exports →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
