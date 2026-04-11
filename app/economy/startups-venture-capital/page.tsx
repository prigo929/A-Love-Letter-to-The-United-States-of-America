// ─── Startups & Venture Capital Sub-Page ─────────────────────────────────────

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumb }     from '@/components/layout/Breadcrumb'
import { FactCard }       from '@/components/sections/FactCard'
import { QuoteBlock }     from '@/components/sections/QuoteBlock'
import { VCBarChart, UnicornPieChart } from '@/components/data/VCCharts'
import {
  VC_BY_COUNTRY,
  UNICORNS_BY_COUNTRY,
  VC_FACTS,
  STARTUP_TIMELINE,
  STARTUP_ECOSYSTEMS,
  VC_OVERVIEW_PARAGRAPHS,
} from '@/lib/data/economy-data'
import { BLUR_PLACEHOLDER } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Startups & Venture Capital | Economy | America: The Greatest Nation',
  description:
    'America attracts 47% of all global venture capital. 659+ unicorn companies. Silicon Valley, the greatest engine of innovation and wealth creation in history.',
  alternates: { canonical: '/economy/startups-venture-capital' },
}

const VC_EXTENDED_FACTS = [
  {
    id: 'vc-total',
    fact: 'US startups raised ~$170B in VC in 2023 — 47% of the global total',
    detail: 'With just 4.2% of the world\'s population, America attracts nearly half of all venture capital deployed on Earth. No other country has come close in the modern era.',
    source: 'NVCA / Pitchbook 2024',
    color: 'gold' as const,
  },
  {
    id: 'vc-stanford',
    fact: 'Stanford alumni have founded companies worth $3.5 trillion+',
    detail: 'Google (Brin & Page), NVIDIA (Jensen Huang), Netflix (Reed Hastings), Instagram (Mike Krieger), PayPal (Peter Thiel), Yahoo, Cisco, HP, Sun Microsystems — all Stanford.',
    source: 'Stanford University Alumni Relations 2024',
    color: 'red' as const,
  },
  {
    id: 'vc-ai',
    fact: 'US AI startups raised $67B in 2023 — 65% of global AI investment',
    detail: 'OpenAI, Anthropic, Cohere, Mistral (partially US-funded), Inflection AI, Scale AI — the AI revolution is being financed almost entirely by American capital and talent.',
    source: 'Pitchbook AI Report 2024',
    color: 'blue' as const,
  },
  {
    id: 'vc-second-chance',
    fact: 'America\'s bankruptcy laws make failure survivable — a key innovation advantage',
    detail: 'Chapter 11 bankruptcy protection allows American entrepreneurs to restructure and try again. This tolerance for failure — unique in the world — is a core driver of American startup culture.',
    source: 'World Bank Doing Business Report',
    color: 'gold' as const,
  },
  {
    id: 'vc-immigrants',
    fact: '55% of billion-dollar US startup founders were immigrants or their children',
    detail: 'Elon Musk (South Africa), Sergey Brin (Russia), Jensen Huang (Taiwan), Pierre Omidyar (France/Iran), Jerry Yang (Taiwan), Andy Grove (Hungary) — America builds greatness from everywhere.',
    source: 'NFAP 2022 / Forbes',
    color: 'red' as const,
  },
  {
    id: 'vc-returns',
    fact: 'The top 10 US VC returns have produced over $2 trillion in value from tiny investments',
    detail: 'Sequoia\'s $60M investment in Google returned $12B. Benchmark\'s $13M in eBay became $2.5B. American venture capital is the greatest wealth-creation mechanism ever invented.',
    source: 'Forbes / Crunchbase',
    color: 'blue' as const,
  },
]

const TOP_VC_FIRMS = [
  { name: 'Sequoia Capital',    aum: '$85B+',   city: 'Menlo Park, CA',  portfolio: 'Apple, Google, WhatsApp, Instagram, Airbnb, Stripe' },
  { name: 'Andreessen Horowitz',aum: '$35B+',   city: 'San Francisco, CA',portfolio: 'Facebook, Twitter, Airbnb, Lyft, GitHub, Coinbase' },
  { name: 'Accel Partners',     aum: '$18B+',   city: 'Palo Alto, CA',   portfolio: 'Facebook, Dropbox, Slack, Spotify, CrowdStrike' },
  { name: 'Benchmark Capital',  aum: '$8B+',    city: 'San Francisco, CA',portfolio: 'eBay, Twitter, Uber, Snapchat, WeWork, Yelp' },
  { name: 'Kleiner Perkins',    aum: '$12B+',   city: 'Menlo Park, CA',  portfolio: 'Amazon, Google, Genentech, Netscape, Twitter' },
  { name: 'Tiger Global',       aum: '$50B+',   city: 'New York, NY',    portfolio: 'Facebook (early), Spotify, Stripe, Bytedance, Nubank' },
]

export default function StartupsVCPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop"
          alt="Modern startup office — Silicon Valley innovation culture"
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
              { label: 'Startups & VC' },
            ]}
            className="mb-8"
          />
          <p className="mb-4 section-eyebrow">Venture Capital & Startups</p>
          <h1 className="mb-4 font-hero text-6xl text-white sm:text-7xl">
            SILICON VALLEY<br />
            <span className="text-glory-gold">IS A PLANET</span>
          </h1>
          <p className="max-w-2xl font-body text-lg text-white/65 leading-relaxed">
            No corner of Earth has produced more transformative companies, more
            billionaires, or more world-changing technology per square mile.
            America&apos;s startup ecosystem is a force of nature.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          {/* Overview paras */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              Why America Leads the World in Innovation Capital
            </h2>
            {VC_OVERVIEW_PARAGRAPHS.map((para, i) => (
              <p key={i} className="mb-5 font-body text-lg leading-relaxed text-white/65">
                {para}
              </p>
            ))}
          </section>

          {/* VC Chart */}
          <section>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <VCBarChart
                data={VC_BY_COUNTRY}
                title="Venture Capital Investment by Country (2023, USD Billions)"
                source="NVCA / Pitchbook 2024"
              />
            </div>
          </section>

          {/* Unicorn chart */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              The Unicorn Economy — 659+ and Counting
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              A "unicorn" — a private company valued at $1 billion or more — was once
              considered a mythological rarity. America has built 659 of them, representing
              over 52% of the global total. More unicorns have been born in California
              alone than in all of Europe combined.
            </p>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <UnicornPieChart
                data={UNICORNS_BY_COUNTRY}
                title="Unicorn Companies by Country of Origin (2024)"
                source="Pitchbook 2024"
              />
            </div>
          </section>

          {/* Startup Timeline table */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              The Companies That Rewired Human Civilization
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              The most consequential companies of the digital age were founded by Americans
              — or immigrants who came to America. This is not a coincidence. The combination
              of Stanford and MIT talent, patient venture capital, strong IP protection,
              and a culture that celebrates ambition created a perfect laboratory for
              world-changing innovation.
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-mid">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">Year</th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">Company</th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">Founder(s)</th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">Industry</th>
                      <th className="px-5 py-4 text-right font-body text-xs font-semibold uppercase tracking-widest text-white/40">Today's Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STARTUP_TIMELINE.map((item, i) => (
                      <tr
                        key={i}
                        className="border-b border-white/5 transition-colors hover:bg-white/3"
                      >
                        <td className="px-5 py-4 font-hero text-xl text-glory-gold">{item.year}</td>
                        <td className="px-5 py-4 font-body text-sm font-semibold text-white">{item.company}</td>
                        <td className="px-5 py-4 font-body text-sm text-white/55">{item.founder}</td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-glory-blue/30 px-2.5 py-0.5 font-body text-xs text-white/65">
                            {item.industry}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right font-hero text-lg text-glory-gold">
                          {item.currentValuation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Startup Ecosystems */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              America&apos;s Startup Ecosystems
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              Silicon Valley gets the headlines, but the American startup ecosystem
              now spans six major metropolitan hubs — each with its own specialization,
              talent base, and investor community.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {STARTUP_ECOSYSTEMS.map((eco) => (
                <div
                  key={eco.city}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-navy-mid transition-all hover:border-glory-gold/30 hover:shadow-[0_0_25px_rgba(255,215,0,0.08)]"
                >
                  <div className="border-b border-white/8 bg-white/3 px-5 py-3">
                    <p className="font-body text-xs font-semibold uppercase tracking-widest text-glory-gold">
                      {eco.state}
                    </p>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-0.5 font-display text-lg font-semibold text-white">
                      {eco.city}
                    </h3>
                    <p className="mb-4 font-body text-sm italic text-white/45">
                      &ldquo;{eco.nickname}&rdquo;
                    </p>
                    <div className="mb-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-white/5 p-3 text-center">
                        <p className="font-hero text-2xl text-glory-gold">{eco.unicorns}+</p>
                        <p className="font-body text-xs text-white/40">Unicorns</p>
                      </div>
                      <div className="rounded-lg bg-white/5 p-3 text-center">
                        <p className="font-hero text-lg text-white">{eco.vcFunding}</p>
                        <p className="font-body text-xs text-white/40">Annual VC</p>
                      </div>
                    </div>
                    <p className="font-body text-xs leading-relaxed text-white/40">
                      {eco.keyCompanies.join(' · ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top VC Firms */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              The World&apos;s Most Influential VC Firms
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              Every one of the world&apos;s most consequential venture capital firms is
              headquartered in the United States. These firms don&apos;t just invest —
              they shape global technology strategy, recruit the world&apos;s best engineers,
              and manufacture the companies of tomorrow.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {TOP_VC_FIRMS.map((firm) => (
                <div
                  key={firm.name}
                  className="rounded-2xl border border-white/10 bg-navy-mid p-5 transition-colors hover:border-glory-gold/25"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-display text-lg font-semibold text-white">{firm.name}</h3>
                    <span className="font-hero text-xl text-glory-gold">{firm.aum}</span>
                  </div>
                  <p className="mb-2 font-body text-xs text-white/40">{firm.city}</p>
                  <p className="font-body text-xs leading-relaxed text-white/50">
                    <span className="text-white/35">Notable portfolio: </span>
                    {firm.portfolio}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Facts grid */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">By the Numbers</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...VC_FACTS, ...VC_EXTENDED_FACTS].map((fact) => (
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
            quote="The startup ecosystem is the most powerful wealth-creation and problem-solving machine ever invented. America built it, and America keeps improving it."
            attribution="Marc Andreessen"
            title="Co-Founder, Andreessen Horowitz — Menlo Park, California"
          />

          {/* Nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link href="/economy/capital-markets" className="font-body text-sm text-white/50 hover:text-white transition-colors">
              ← Capital Markets
            </Link>
            <Link href="/economy/dollar-dominance" className="font-body text-sm font-semibold text-glory-gold hover:text-glory-gold-dark transition-colors">
              Dollar Dominance →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
