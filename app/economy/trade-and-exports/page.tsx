// ─── Trade & Exports Sub-Page ─────────────────────────────────────────────────

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumb }  from '@/components/layout/Breadcrumb'
import { FactCard }    from '@/components/sections/FactCard'
import { QuoteBlock }  from '@/components/sections/QuoteBlock'
import {
  TRADE_OVERVIEW_PARAGRAPHS,
  US_EXPORT_CATEGORIES,
} from '@/lib/data/economy-data'
import { BLUR_PLACEHOLDER } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Trade & Exports | Economy | America: The Greatest Nation',
  description:
    'America exports $2T+ in goods — aircraft, semiconductors, medical devices, petroleum, and agricultural products — plus trillions in services, software, and financial expertise.',
  alternates: { canonical: '/economy/trade-and-exports' },
}

const TRADE_FACTS = [
  {
    id: 'trade-goods-total',
    fact: 'US merchandise exports exceed $2 trillion annually',
    detail: 'Aircraft from Boeing, semiconductors from Intel and Qualcomm, medical devices from Medtronic, petrochemical products from ExxonMobil — America exports the most complex and high-value goods on Earth.',
    source: 'US Census Bureau / BEA 2024',
    color: 'gold' as const,
  },
  {
    id: 'trade-services',
    fact: 'US services exports exceed $1 trillion — the world\'s largest',
    detail: 'Financial services from Goldman Sachs and JPMorgan, software from Microsoft and Salesforce, education from Harvard and MIT, entertainment from Hollywood — America\'s service exports are the envy of the world.',
    source: 'BEA / USTR 2024',
    color: 'red' as const,
  },
  {
    id: 'trade-aerospace',
    fact: 'America dominates aerospace exports — Boeing sells to 150+ countries',
    detail: 'The aerospace and defense sector alone generates $132B+ in annual exports. Every major airline on Earth flies American-built engines, aircraft, or avionics. There is no peer competitor in commercial aerospace.',
    source: 'Aerospace Industries Association 2024',
    color: 'blue' as const,
  },
  {
    id: 'trade-ag',
    fact: 'America feeds the world — $58B+ in annual agricultural exports',
    detail: 'The US is the world\'s largest exporter of soybeans, corn, cotton, and almonds, and among the top exporters of wheat, poultry, and pork. American farmers grow food that reaches every corner of the globe.',
    source: 'USDA Foreign Agricultural Service 2024',
    color: 'gold' as const,
  },
  {
    id: 'trade-pharma',
    fact: 'American pharmaceutical exports save lives on every continent',
    detail: 'Pfizer, Merck, Eli Lilly, Johnson & Johnson — US pharmaceutical exports exceed $63 billion annually. COVID mRNA vaccines alone were a $50B+ export event. American biotech is a global public good.',
    source: 'PhRMA / BEA 2024',
    color: 'red' as const,
  },
  {
    id: 'trade-tech',
    fact: 'US software and intellectual property exports: $200B+ annually',
    detail: 'Microsoft Windows, Adobe Creative Suite, Salesforce CRM, AWS cloud services, Apple App Store — American software is the invisible infrastructure of the global economy, generating hundreds of billions in annual export value.',
    source: 'BEA Intellectual Property Products 2024',
    color: 'blue' as const,
  },
]

const TRADE_PARTNERS = [
  { country: 'Canada',       flag: '🇨🇦', trade: '$773B', direction: 'Largest overall partner' },
  { country: 'Mexico',       flag: '🇲🇽', trade: '$798B', direction: '#1 goods trading partner 2023' },
  { country: 'China',        flag: '🇨🇳', trade: '$575B', direction: 'Largest goods deficit' },
  { country: 'Germany',      flag: '🇩🇪', trade: '$257B', direction: 'Key machinery & auto partner' },
  { country: 'Japan',        flag: '🇯🇵', trade: '$212B', direction: 'Technology & automotive' },
  { country: 'South Korea',  flag: '🇰🇷', trade: '$185B', direction: 'Semiconductors & EVs' },
  { country: 'United Kingdom',flag:'🇬🇧', trade: '$156B', direction: 'Services surplus partner' },
  { country: 'India',        flag: '🇮🇳', trade: '$130B', direction: 'Fastest-growing partner' },
]

const TOP_EXPORT_COMPANIES = [
  { company: 'Boeing',                sector: 'Aerospace',       hq: 'Arlington, VA',    note: 'Largest US goods exporter' },
  { company: 'ExxonMobil',            sector: 'Energy',          hq: 'Spring, TX',       note: 'Petroleum products leader' },
  { company: 'Apple',                 sector: 'Consumer Tech',   hq: 'Cupertino, CA',    note: '$100B+ in international revenue' },
  { company: 'Microsoft',             sector: 'Software / Cloud', hq: 'Redmond, WA',     note: 'Azure & Office 365 globally' },
  { company: 'Caterpillar',           sector: 'Industrial',      hq: 'Irving, TX',       note: 'Heavy machinery to 190 countries' },
  { company: 'General Electric',      sector: 'Industrial',      hq: 'Fairfield, CT',    note: 'Jet engines, power equipment' },
  { company: 'Medtronic / Edwards',   sector: 'Medical Devices', hq: 'Minneapolis, MN',  note: 'Devices used in every hospital globally' },
  { company: 'ADM / Cargill / Bunge', sector: 'Agriculture',     hq: 'Multiple US cities',note: 'Feed the world from the Great Plains' },
]

export default function TradeAndExportsPage() {
  const maxExport = Math.max(...US_EXPORT_CATEGORIES.map((c) => c.exports))

  return (
    <>
      {/* Hero */}
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1920&auto=format&fit=crop"
          alt="Container port — America's export machine"
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
              { label: 'Trade & Exports' },
            ]}
            className="mb-8"
          />
          <p className="mb-4 section-eyebrow">Trade & Exports</p>
          <h1 className="mb-4 font-hero text-6xl text-white sm:text-7xl">
            AMERICA POWERS<br />
            <span className="text-glory-gold">GLOBAL COMMERCE</span>
          </h1>
          <p className="max-w-2xl font-body text-lg text-white/65 leading-relaxed">
            Aircraft, semiconductors, pharmaceuticals, petroleum, agricultural
            products, and trillions in software and financial services.
            America doesn&apos;t just trade — it supplies the world with
            its most advanced and high-value goods.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          {/* Overview */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              America&apos;s Export Machine
            </h2>
            {TRADE_OVERVIEW_PARAGRAPHS.map((para, i) => (
              <p key={i} className="mb-5 font-body text-lg leading-relaxed text-white/65">
                {para}
              </p>
            ))}
          </section>

          {/* Export categories chart */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              Top US Export Categories (2024)
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              Unlike developing nations that export raw commodities, the United States
              exports the world&apos;s most sophisticated, highest-margin goods —
              aircraft, microchips, medical devices, and pharmaceuticals. These are
              products that take decades and billions in R&D to develop, cementing
              America&apos;s position at the top of the global value chain.
            </p>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              {US_EXPORT_CATEGORIES.map((cat) => {
                const pct = Math.round((cat.exports / maxExport) * 100)
                return (
                  <div key={cat.category} className="group">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="font-body text-sm text-white/80">{cat.category}</span>
                      <span className="font-hero text-lg text-glory-gold">${cat.exports}B</span>
                    </div>
                    <div className="h-7 w-full overflow-hidden rounded-full bg-white/8">
                      <div
                        className="flex h-full items-center rounded-full bg-gradient-to-r from-glory-red to-glory-gold px-3 transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      >
                        <span className="font-body text-xs font-semibold text-navy-dark opacity-0 group-hover:opacity-100 transition-opacity">
                          {pct}% of top category
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
              <p className="pt-2 text-right font-body text-xs text-white/30">
                Source: US Census Bureau / Bureau of Economic Analysis 2024
              </p>
            </div>
          </section>

          {/* Trade partners */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              America&apos;s Top Trading Partners
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              US total trade (goods + services) exceeds $6 trillion annually.
              The largest trading relationships span the entire globe — from
              Canada and Mexico under USMCA to Asia&apos;s technology and manufacturing hubs.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {TRADE_PARTNERS.map((partner) => (
                <div
                  key={partner.country}
                  className="rounded-2xl border border-white/10 bg-navy-mid p-4 transition-colors hover:border-glory-gold/25"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-2xl">{partner.flag}</span>
                    <span className="font-body text-sm font-semibold text-white">{partner.country}</span>
                  </div>
                  <p className="font-hero text-2xl text-glory-gold">{partner.trade}</p>
                  <p className="mt-1 font-body text-xs text-white/40">{partner.direction}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Top export companies */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              America&apos;s Global Export Champions
            </h2>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-mid">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[580px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">Company</th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">Sector</th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">HQ</th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">Global Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOP_EXPORT_COMPANIES.map((company, i) => (
                      <tr
                        key={i}
                        className="border-b border-white/5 transition-colors hover:bg-white/3"
                      >
                        <td className="px-5 py-4 font-body text-sm font-semibold text-white">{company.company}</td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-glory-blue/30 px-2.5 py-0.5 font-body text-xs text-white/65">
                            {company.sector}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-body text-sm text-white/45">{company.hq}</td>
                        <td className="px-5 py-4 font-body text-sm text-white/55">{company.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Facts */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              The Export Numbers
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TRADE_FACTS.map((fact) => (
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

          {/* Services exports callout */}
          <section className="overflow-hidden rounded-2xl border border-glory-gold/20 bg-glory-gold/5">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <p className="mb-2 section-eyebrow">The Hidden Export Superpower</p>
                <h2 className="mb-4 font-display text-2xl font-bold text-white">
                  Services: America&apos;s Trillion-Dollar Trade Surplus
                </h2>
                <p className="font-body text-base leading-relaxed text-white/65">
                  While the US runs a trade deficit in goods, it runs a massive
                  <span className="text-glory-gold font-semibold"> surplus</span> in
                  services — approximately $250+ billion annually. Financial advisory,
                  cloud computing, film and TV licensing, university education for
                  foreign students, software subscriptions, and consulting — these
                  invisible exports dwarf what most nations sell in goods.
                </p>
                <p className="mt-4 font-body text-sm leading-relaxed text-white/55">
                  When a Korean bank pays Goldman Sachs for M&A advisory, when
                  a German firm licenses Adobe Creative Suite, when a Brazilian
                  student pays Harvard tuition — America exports wealth without
                  shipping a single container.
                </p>
              </div>
              <div className="relative hidden md:block">
                <Image
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop"
                  alt="New York City — export capital of American financial services"
                  fill
                  className="object-cover opacity-50"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-glory-gold/5 to-transparent" />
              </div>
            </div>
          </section>

          <QuoteBlock
            quote="Trade is the handmaiden of freedom. A country that can sell its best goods and ideas to the world will always maintain its competitive edge."
            attribution="Ronald Reagan"
            title="40th President of the United States"
          />

          {/* Nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link href="/economy/dollar-dominance" className="font-body text-sm text-white/50 hover:text-white transition-colors">
              ← Dollar Dominance
            </Link>
            <Link href="/economy" className="font-body text-sm font-semibold text-glory-gold hover:text-glory-gold-dark transition-colors">
              ↑ Economy Overview
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
