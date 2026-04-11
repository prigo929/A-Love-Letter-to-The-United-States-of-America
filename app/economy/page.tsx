// ─── Economy Page ─────────────────────────────────────────────────────────────
// Phase 3: Full Economy section with hero, overview, GDP, capital markets,
// VC, dollar dominance, and sub-section navigation.
// Server Component — chart components imported as client leaves.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  Globe,
  Rocket,
  Building2,
} from "lucide-react";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { StatCard } from "@/components/sections/StatCard";
import { FactCard } from "@/components/sections/FactCard";
import { QuoteBlock } from "@/components/sections/QuoteBlock";

// ── Chart components (client) ────────────────────────────────────────────────
import { GdpBarChart } from "@/components/data/GdpBarChart";
import { SP500Chart } from "@/components/data/SP500Chart";
import { VCBarChart } from "@/components/data/VCCharts";
import { DollarReserveChart } from "@/components/data/DollarMarketCharts";

// ── Data ────────────────────────────────────────────────────────────────────
import {
  GDP_COMPARISON,
  GDP_PER_CAPITA,
  SP500_HISTORY,
  VC_BY_COUNTRY,
  DOLLAR_RESERVE_SHARE,
  ECONOMY_HERO_STATS,
  GDP_FACTS,
  CAPITAL_MARKETS_FACTS,
  VC_FACTS,
  DOLLAR_FACTS,
  STARTUP_TIMELINE,
  STARTUP_ECOSYSTEMS,
  ECONOMY_QUOTES,
  ECONOMY_SUB_PAGES,
  ECONOMY_OVERVIEW_PARAGRAPHS,
  GDP_OVERVIEW_PARAGRAPHS,
  CAPITAL_MARKETS_PARAGRAPHS,
  VC_OVERVIEW_PARAGRAPHS,
  DOLLAR_OVERVIEW_PARAGRAPHS,
  TRADE_OVERVIEW_PARAGRAPHS,
  type GdpDataPoint,
} from "@/lib/data/economy-data";

import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Economy | America: The Greatest Nation",
  description:
    "The US economy — $28.8 trillion in GDP, the world's largest stock markets, the global reserve currency, and the innovation capital of Earth. A deep-dive into American economic dominance.",
  alternates: { canonical: "/economy" },
  openGraph: {
    title: "The Engine of the World — US Economy",
    description:
      "America's economic dominance explained: $28.8T GDP, 47% of global VC, world reserve currency, and 659+ unicorn companies.",
    url: "/economy",
    images: [
      {
        url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "New York Stock Exchange — heart of the world's largest economy",
      },
    ],
  },
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The United States Economy — The Engine of the World",
  description:
    "A comprehensive analysis of US economic dominance: GDP, capital markets, venture capital, the dollar, and trade.",
  url: "https://america-greatest.vercel.app/economy",
  author: { "@type": "Organization", name: "America: The Greatest Nation" },
};

// ─── TOC Sections (anchors) ───────────────────────────────────────────────────

const TOC_ITEMS = [
  { label: "Overview", href: "#overview" },
  { label: "GDP & Scale", href: "#gdp" },
  { label: "Capital Markets", href: "#capital-markets" },
  { label: "Venture Capital", href: "#venture-capital" },
  { label: "The Dollar", href: "#dollar" },
  { label: "Trade & Exports", href: "#trade" },
  { label: "Sub-Pages", href: "#sub-pages" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EconomyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <EconomyHero />

      {/* ── Desktop layout: sticky TOC sidebar + main content ─────────────── */}
      <div className="relative bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 xl:grid-cols-[260px_1fr]">
            {/* Sticky TOC — desktop only */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 py-16">
                <p className="mb-4 font-body text-xs font-semibold uppercase tracking-widest text-glory-gold">
                  Contents
                </p>
                <nav aria-label="Economy page contents">
                  <ul className="space-y-1">
                    {TOC_ITEMS.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className="block rounded-lg px-3 py-2 font-body text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Quick stat box */}
                <div className="mt-10 rounded-2xl border border-glory-gold/20 bg-glory-gold/5 p-4">
                  <p className="font-hero text-4xl text-glory-gold">$28.8T</p>
                  <p className="mt-1 font-body text-xs text-white/50">
                    US GDP 2024
                  </p>
                  <p className="mt-2 font-body text-xs text-glory-gold">
                    ~25% of world GDP
                  </p>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <main className="min-w-0 py-16">
              {/* Breadcrumb */}
              <Breadcrumb items={[{ label: "Economy" }]} className="mb-8" />

              {/* ── Section 1: Overview ─────────────────────────────────── */}
              <section id="overview" className="mb-20 scroll-mt-24">
                <p className="section-eyebrow">Phase 3 — Deep Dive</p>
                <h1 className="mb-6 font-display text-h1 text-white">
                  The Engine of the World
                </h1>

                {ECONOMY_OVERVIEW_PARAGRAPHS.map((para, i) => (
                  <p
                    key={i}
                    className="mb-5 font-body text-lg leading-relaxed text-white/70"
                  >
                    {para}
                  </p>
                ))}

                {/* Hero stat cards */}
                <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {ECONOMY_HERO_STATS.map((stat) => (
                    <StatCard
                      key={stat.id}
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      label={stat.label}
                      description={stat.description}
                      source={stat.source}
                      variant={stat.color === "gold" ? "gold" : "dark"}
                    />
                  ))}
                </div>
              </section>

              {/* ── Section 2: GDP & Scale ──────────────────────────────── */}
              <section id="gdp" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-glory-gold pl-5">
                  <p className="section-eyebrow">GDP & Scale</p>
                  <h2 className="font-display text-h2 text-white">
                    25% of Everything on Earth
                  </h2>
                </div>

                {GDP_OVERVIEW_PARAGRAPHS.map((para, i) => (
                  <p
                    key={i}
                    className="mb-5 font-body text-lg leading-relaxed text-white/70"
                  >
                    {para}
                  </p>
                ))}

                {/* GDP Comparison Chart */}
                <div className="my-10 rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
                  <GdpBarChart
                    data={GDP_COMPARISON}
                    title="GDP: United States vs Major Economies (2024)"
                    subtitle="US GDP in USD Trillions — larger than the next three economies combined"
                    source="World Bank 2024"
                  />
                </div>

                {/* GDP Per Capita Chart */}
                <div className="mb-10 rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
                  <GdpBarChart
                    data={GDP_PER_CAPITA.map(
                      (d): GdpDataPoint => ({
                        country: d.country,
                        gdp: d.gdpPerCapita,
                        flag: d.flag,
                        highlight: d.highlight,
                      }),
                    )}
                    title="GDP Per Capita: USA vs G7 & Emerging Markets (2024)"
                    subtitle="At $82,700 per person, Americans produce more wealth per capita than any major nation"
                    source="IMF World Economic Outlook 2024"
                  />
                </div>

                {/* GDP Fact Cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {GDP_FACTS.map((fact) => (
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

                <div className="mt-8 flex justify-end">
                  <Link
                    href="/economy/gdp-growth"
                    className="inline-flex items-center gap-2 font-body text-sm font-semibold text-glory-gold hover:text-glory-gold-dark transition-colors"
                  >
                    Full GDP Analysis →
                  </Link>
                </div>
              </section>

              {/* ── Pull Quote 1 ────────────────────────────────────────── */}
              <QuoteBlock
                quote={ECONOMY_QUOTES[0].quote}
                attribution={ECONOMY_QUOTES[0].attribution}
                title={ECONOMY_QUOTES[0].title}
              />

              {/* ── Section 3: Capital Markets ──────────────────────────── */}
              <section id="capital-markets" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-glory-red pl-5">
                  <p className="section-eyebrow">Capital Markets</p>
                  <h2 className="font-display text-h2 text-white">
                    Wall Street Powers the World
                  </h2>
                </div>

                {CAPITAL_MARKETS_PARAGRAPHS.map((para, i) => (
                  <p
                    key={i}
                    className="mb-5 font-body text-lg leading-relaxed text-white/70"
                  >
                    {para}
                  </p>
                ))}

                {/* S&P 500 Chart */}
                <div className="my-10 rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
                  <SP500Chart
                    data={SP500_HISTORY}
                    title="S&P 500 Index — 45 Years of American Prosperity"
                    subtitle="The world's most-watched equity index: 1980 → 2024"
                    source="S&P Global / Yahoo Finance"
                  />
                </div>

                {/* Capital Markets image */}
                <div className="relative mb-10 overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop"
                    alt="Stock market trading screens — the heartbeat of global capital"
                    width={1200}
                    height={500}
                    className="h-[300px] w-full object-cover md:h-[400px]"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/80 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="font-hero text-5xl text-glory-gold">$47T+</p>
                    <p className="font-body text-sm text-white/70">
                      Combined NYSE + NASDAQ market cap
                    </p>
                  </div>
                </div>

                {/* Capital Markets Facts */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {CAPITAL_MARKETS_FACTS.map((fact) => (
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

                <div className="mt-8 flex justify-end">
                  <Link
                    href="/economy/capital-markets"
                    className="inline-flex items-center gap-2 font-body text-sm font-semibold text-glory-gold hover:text-glory-gold-dark transition-colors"
                  >
                    Full Capital Markets Analysis →
                  </Link>
                </div>
              </section>

              {/* ── Section 4: Venture Capital & Startups ──────────────── */}
              <section id="venture-capital" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-glory-gold pl-5">
                  <p className="section-eyebrow">Venture Capital & Startups</p>
                  <h2 className="font-display text-h2 text-white">
                    Silicon Valley Is a Planet
                  </h2>
                </div>

                {VC_OVERVIEW_PARAGRAPHS.map((para, i) => (
                  <p
                    key={i}
                    className="mb-5 font-body text-lg leading-relaxed text-white/70"
                  >
                    {para}
                  </p>
                ))}

                {/* VC Chart */}
                <div className="my-10 rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
                  <VCBarChart
                    data={VC_BY_COUNTRY}
                    title="Venture Capital Investment by Country (2023)"
                    source="NVCA / Pitchbook 2024"
                  />
                </div>

                {/* VC Facts */}
                <div className="mb-10 grid gap-4 sm:grid-cols-3">
                  {VC_FACTS.map((fact) => (
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

                {/* Startup Timeline */}
                <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
                  <h3 className="mb-6 font-display text-xl text-white">
                    American Companies That Rewired the World
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="pb-3 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                            Founded
                          </th>
                          <th className="pb-3 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                            Company
                          </th>
                          <th className="pb-3 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                            Founder(s)
                          </th>
                          <th className="pb-3 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                            Industry
                          </th>
                          <th className="pb-3 text-right font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                            Valuation
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {STARTUP_TIMELINE.map((item, i) => (
                          <tr
                            key={i}
                            className="border-b border-white/5 transition-colors hover:bg-white/3"
                          >
                            <td className="py-3.5 font-hero text-lg text-glory-gold">
                              {item.year}
                            </td>
                            <td className="py-3.5 font-body text-sm font-semibold text-white">
                              {item.company}
                            </td>
                            <td className="py-3.5 font-body text-sm text-white/55">
                              {item.founder}
                            </td>
                            <td className="py-3.5">
                              <span className="rounded-full bg-glory-blue/30 px-2.5 py-0.5 font-body text-xs text-white/70">
                                {item.industry}
                              </span>
                            </td>
                            <td className="py-3.5 text-right font-hero text-base text-glory-gold">
                              {item.currentValuation}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Startup Ecosystems */}
                <div className="mt-10">
                  <h3 className="mb-6 font-display text-xl text-white">
                    America&apos;s Startup Ecosystems
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {STARTUP_ECOSYSTEMS.map((eco) => (
                      <div
                        key={eco.city}
                        className="rounded-2xl border border-white/10 bg-navy-mid p-5 transition-colors hover:border-glory-gold/30"
                      >
                        <p className="mb-1 font-body text-xs font-semibold uppercase tracking-widest text-glory-gold">
                          {eco.state}
                        </p>
                        <h4 className="mb-1 font-display text-lg font-semibold text-white">
                          {eco.city}
                        </h4>
                        <p className="mb-3 font-body text-sm text-white/50">
                          {eco.nickname}
                        </p>
                        <div className="mb-3 flex gap-4 border-t border-white/8 pt-3">
                          <div>
                            <p className="font-hero text-2xl text-glory-gold">
                              {eco.unicorns}+
                            </p>
                            <p className="font-body text-xs text-white/40">
                              Unicorns
                            </p>
                          </div>
                          <div>
                            <p className="font-hero text-2xl text-white">
                              {eco.vcFunding}
                            </p>
                            <p className="font-body text-xs text-white/40">
                              Annual VC
                            </p>
                          </div>
                        </div>
                        <p className="font-body text-xs text-white/40">
                          {eco.keyCompanies.join(" · ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Link
                    href="/economy/startups-venture-capital"
                    className="inline-flex items-center gap-2 font-body text-sm font-semibold text-glory-gold hover:text-glory-gold-dark transition-colors"
                  >
                    Full Startups & VC Analysis →
                  </Link>
                </div>
              </section>

              {/* ── Pull Quote 2 ────────────────────────────────────────── */}
              <QuoteBlock
                quote={ECONOMY_QUOTES[1].quote}
                attribution={ECONOMY_QUOTES[1].attribution}
                title={ECONOMY_QUOTES[1].title}
              />

              {/* ── Section 5: Dollar Dominance ─────────────────────────── */}
              <section id="dollar" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-glory-blue-light pl-5">
                  <p className="section-eyebrow">Dollar Dominance</p>
                  <h2 className="font-display text-h2 text-white">
                    The World&apos;s Reserve Currency
                  </h2>
                </div>

                {DOLLAR_OVERVIEW_PARAGRAPHS.map((para, i) => (
                  <p
                    key={i}
                    className="mb-5 font-body text-lg leading-relaxed text-white/70"
                  >
                    {para}
                  </p>
                ))}

                {/* Dollar Reserve Chart */}
                <div className="my-10 rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
                  <DollarReserveChart
                    data={DOLLAR_RESERVE_SHARE}
                    title="Global Foreign Exchange Reserves by Currency (2024)"
                    source="IMF COFER Q4 2023"
                  />
                </div>

                {/* Dollar image */}
                <div className="relative mb-10 overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=1200&auto=format&fit=crop"
                    alt="US dollar bills — the world's reserve currency"
                    width={1200}
                    height={400}
                    className="h-[250px] w-full object-cover md:h-[320px]"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent" />
                  <div className="absolute bottom-6 left-0 right-0 px-6">
                    <p className="font-body text-center text-sm text-white/70">
                      The dollar&apos;s reserve status confers the
                      &ldquo;exorbitant privilege&rdquo; — the US can finance
                      its deficits in its own currency at favorable global rates
                    </p>
                  </div>
                </div>

                {/* Dollar Facts */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {DOLLAR_FACTS.map((fact) => (
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

                <div className="mt-8 flex justify-end">
                  <Link
                    href="/economy/dollar-dominance"
                    className="inline-flex items-center gap-2 font-body text-sm font-semibold text-glory-gold hover:text-glory-gold-dark transition-colors"
                  >
                    Full Dollar Analysis →
                  </Link>
                </div>
              </section>

              {/* ── Section 6: Trade & Exports ──────────────────────────── */}
              <section id="trade" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-glory-red pl-5">
                  <p className="section-eyebrow">Trade & Exports</p>
                  <h2 className="font-display text-h2 text-white">
                    America Powers Global Commerce
                  </h2>
                </div>

                {TRADE_OVERVIEW_PARAGRAPHS.map((para, i) => (
                  <p
                    key={i}
                    className="mb-5 font-body text-lg leading-relaxed text-white/70"
                  >
                    {para}
                  </p>
                ))}

                {/* Trade visual */}
                <div className="my-10 overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop"
                    alt="Container port — America's export machine"
                    width={1200}
                    height={450}
                    className="h-[280px] w-full object-cover md:h-[380px]"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                </div>

                {/* Top export categories */}
                <h3 className="mb-5 font-display text-xl text-white">
                  Top US Export Categories (2024, USD Billions)
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Aircraft & Parts", value: 132, pct: 100 },
                    { label: "Petroleum Products", value: 119, pct: 90 },
                    { label: "Semiconductors", value: 87, pct: 66 },
                    { label: "Medical Devices", value: 74, pct: 56 },
                    { label: "Automobiles", value: 65, pct: 49 },
                    { label: "Pharmaceuticals", value: 63, pct: 48 },
                    { label: "Agricultural Products", value: 58, pct: 44 },
                    { label: "Industrial Machinery", value: 52, pct: 39 },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <p className="w-44 shrink-0 font-body text-sm text-white/70 sm:w-52">
                        {item.label}
                      </p>
                      <div className="relative flex-1 overflow-hidden rounded-full bg-white/8 h-8">
                        <div
                          className="absolute inset-y-0 left-0 flex items-center rounded-full bg-glory-gold/80 px-3"
                          style={{ width: `${item.pct}%` }}
                        >
                          <span className="font-hero text-sm text-navy-dark">
                            ${item.value}B
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-right font-body text-xs text-white/30">
                  Source: US Census Bureau / BEA 2024
                </p>

                <div className="mt-8 flex justify-end">
                  <Link
                    href="/economy/trade-and-exports"
                    className="inline-flex items-center gap-2 font-body text-sm font-semibold text-glory-gold hover:text-glory-gold-dark transition-colors"
                  >
                    Full Trade Analysis →
                  </Link>
                </div>
              </section>

              {/* ── Pull Quote 3 ────────────────────────────────────────── */}
              <QuoteBlock
                quote={ECONOMY_QUOTES[2].quote}
                attribution={ECONOMY_QUOTES[2].attribution}
                title={ECONOMY_QUOTES[2].title}
              />

              {/* ── Section 7: Sub-Page Navigation ──────────────────────── */}
              <section id="sub-pages" className="mb-8 scroll-mt-24">
                <p className="section-eyebrow">Explore Deeper</p>
                <h2 className="mb-8 font-display text-h2 text-white">
                  Deep Dives
                </h2>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {ECONOMY_SUB_PAGES.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-navy-mid transition-all duration-300 hover:border-glory-gold/40 hover:shadow-[0_0_30px_rgba(255,215,0,0.1)]"
                    >
                      {/* Image */}
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={page.imageSrc}
                          alt={page.imageAlt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          placeholder="blur"
                          blurDataURL={BLUR_PLACEHOLDER}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-mid via-navy-mid/30 to-transparent" />

                        {/* Badge */}
                        <span className="absolute right-3 top-3 rounded-full bg-glory-gold px-3 py-1 font-body text-xs font-bold text-navy-dark">
                          {page.badge}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="mb-1.5 font-display text-lg font-semibold text-white transition-colors group-hover:text-glory-gold">
                          {page.title}
                        </h3>
                        <p className="font-body text-sm leading-relaxed text-white/55">
                          {page.description}
                        </p>
                        <p className="mt-4 font-body text-xs font-semibold text-glory-gold">
                          Explore →
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Economy Hero ─────────────────────────────────────────────────────────────
// Extracted as a local server component to keep the page clean.

function EconomyHero() {
  return (
    <section
      className="relative flex min-h-[80vh] items-end bg-navy-dark pb-16 pt-32"
      aria-label="Economy hero"
    >
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1920&auto=format&fit=crop"
        alt="New York City skyline at night — the financial capital of the world"
        fill
        className="object-cover"
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/85 to-navy-dark/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent" />

      {/* Red/blue stripe accent at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-glory-gradient" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.3em] text-glory-gold">
            Phase 3 — Economy Section
          </p>

          <h1 className="mb-6 font-hero text-6xl leading-none tracking-wide text-white sm:text-7xl md:text-8xl">
            THE ENGINE
            <br />
            <span className="text-glory-gold">OF THE WORLD</span>
          </h1>

          <p className="mb-8 font-body text-lg leading-relaxed text-white/70 md:text-xl">
            The United States economy is the most powerful economic force in the
            history of human civilization — $28.8 trillion in annual output, the
            world&apos;s reserve currency, and the innovation capital of Earth.
          </p>

          {/* Three hero stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { value: "$28.8T", label: "GDP 2024", sub: "World Bank" },
              { value: "25%", label: "of World GDP", sub: "IMF" },
              { value: "136", label: "Fortune 500 HQs", sub: "Fortune 2024" },
            ].map((stat) => (
              <div key={stat.value} className="text-center">
                <p className="font-hero text-4xl text-glory-gold md:text-5xl">
                  {stat.value}
                </p>
                <p className="font-body text-sm text-white/70">{stat.label}</p>
                <p className="font-body text-xs text-white/35">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
