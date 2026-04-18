// ─── Economy Page ─────────────────────────────────────────────────────────────
// Main landing page for the Economy section.
//
// Beginner guide:
// - To change the numbers used by the charts/cards, edit lib/data/economy-data.ts
// - To change which sections appear on this page, edit the JSX below.
// - To change the hero image, update the SITE_IMAGES key used in metadata or the
//   EconomyHero component further down in this file.
//
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
import { getServerLocale } from "@/lib/i18n/server";

// ── Data ────────────────────────────────────────────────────────────────────
// This page is intentionally data-driven. Most factual edits belong in
// `lib/data/economy-data.ts`, not inside JSX.
import {
  GDP_COMPARISON,
  GDP_PER_CAPITA,
  SP500_HISTORY,
  VC_BY_COUNTRY,
  DOLLAR_RESERVE_SHARE,
  STARTUP_TIMELINE,
  STARTUP_ECOSYSTEMS,
  getEconomyHeroStats,
  getGdpFacts,
  getCapitalMarketsFacts,
  getVcFacts,
  getDollarFacts,
  getEconomyQuotes,
  getEconomySubPages,
  getEconomyOverviewParagraphs,
  getGdpOverviewParagraphs,
  getCapitalMarketsParagraphs,
  getVcOverviewParagraphs,
  getDollarOverviewParagraphs,
  getTradeOverviewParagraphs,
  type GdpDataPoint,
} from "@/lib/data/economy-data";
import type { Locale } from "@/lib/i18n/config";
import { SITE_IMAGES } from "@/lib/site-images";
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
        url: SITE_IMAGES.economyNYSEUpsideDown,
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

function getEconomyPageCopy(locale: Locale) {
  if (locale === "ro") {
    return {
      tocLabel: "Cuprins",
      tocAriaLabel: "Cuprinsul paginii economiei",
      quickStatLabel: "PIB SUA 2024",
      quickStatSubLabel: "~25% din PIB-ul mondial",
      breadcrumb: "Economie",
      overviewEyebrow: "Faza 3 — Analiză în profunzime",
      overviewTitle: "Motorul lumii",
      gdpEyebrow: "PIB și Dimensiune",
      gdpTitle: "25% din tot ce există pe Pământ",
      gdpChartTitle: "PIB: Statele Unite vs economiile majore (2024)",
      gdpChartSubtitle:
        "PIB-ul SUA în trilioane USD — mai mare decât următoarele trei economii la un loc",
      gdpPerCapitaTitle: "PIB pe cap de locuitor: SUA vs G7 și piețe emergente (2024)",
      gdpPerCapitaSubtitle:
        "La 82.700 USD per persoană, americanii produc mai multă bogăție per capita decât orice mare națiune",
      gdpPerCapitaValueLabel: "PIB pe cap de locuitor (2024, mii USD)",
      fullGdpAnalysis: "Analiza completă a PIB-ului →",
      capitalEyebrow: "Piețe de Capital",
      capitalTitle: "Wall Street pune în mișcare lumea",
      capitalChartTitle: "Indicele S&P 500 — 45 de ani de prosperitate americană",
      capitalChartSubtitle:
        "Cel mai urmărit indice bursier din lume: 1980 → 2024",
      marketCapLabel: "Capitalizare combinată NYSE + NASDAQ",
      fullCapitalMarketsAnalysis: "Analiza completă a piețelor de capital →",
      vcEyebrow: "Venture Capital și Startup-uri",
      vcTitle: "Silicon Valley este o planetă",
      vcChartTitle: "Investiții venture capital după țară (2023)",
      startupTimelineTitle: "Companiile americane care au rescris lumea",
      foundedLabel: "Fondat",
      companyLabel: "Companie",
      foundersLabel: "Fondator(i)",
      industryLabel: "Industrie",
      valuationLabel: "Evaluare",
      startupEcosystemsTitle: "Ecosistemele de startup din America",
      unicornsLabel: "Unicorni",
      annualVcLabel: "VC anual",
      fullVcAnalysis: "Analiza completă a startup-urilor și VC →",
      dollarEyebrow: "Dominația Dolarului",
      dollarTitle: "Moneda de rezervă a lumii",
      dollarChartTitle: "Rezerve valutare globale pe monedă (2024)",
      dollarReserveCaption:
        "Statutul de monedă de rezervă oferă dolarului «privilegiul exorbitant» — SUA își pot finanța deficitele în propria monedă la costuri favorabile la nivel global",
      fullDollarAnalysis: "Analiza completă a dolarului →",
      tradeEyebrow: "Comerț și Exporturi",
      tradeTitle: "America alimentează comerțul global",
      tradeCategoriesTitle:
        "Principalele categorii de export ale SUA (2024, miliarde USD)",
      tradePercentOfTopCategory: "% din categoria de top",
      fullTradeAnalysis: "Analiza completă a comerțului →",
      subPagesEyebrow: "Explorează în profunzime",
      subPagesTitle: "Analize detaliate",
      exploreCta: "Explorează →",
      heroEyebrow: "Faza 3 — Secțiunea economie",
      heroTitleLead: "MOTORUL",
      heroTitleAccent: "LUMII",
      heroDescription:
        "Economia Statelor Unite este cea mai puternică forță economică din istoria civilizației umane — 28,8 trilioane de dolari producție anuală, moneda de rezervă a lumii și capitala globală a inovației.",
      heroStats: [
        { value: "$28.8T", label: "PIB 2024", sub: "Banca Mondială" },
        { value: "25%", label: "din PIB-ul mondial", sub: "FMI" },
        { value: "136", label: "sedii Fortune 500", sub: "Fortune 2024" },
      ],
      tocItems: [
        { label: "Prezentare", href: "#overview" },
        { label: "PIB și Dimensiune", href: "#gdp" },
        { label: "Piețe de Capital", href: "#capital-markets" },
        { label: "Venture Capital", href: "#venture-capital" },
        { label: "Dolarul", href: "#dollar" },
        { label: "Comerț și Exporturi", href: "#trade" },
        { label: "Subpagini", href: "#sub-pages" },
      ],
      tradeCategories: [
        { label: "Avioane și piese", value: 132, pct: 100 },
        { label: "Produse petroliere", value: 119, pct: 90 },
        { label: "Semiconductori", value: 87, pct: 66 },
        { label: "Dispozitive medicale", value: 74, pct: 56 },
        { label: "Automobile", value: 65, pct: 49 },
        { label: "Produse farmaceutice", value: 63, pct: 48 },
        { label: "Produse agricole", value: 58, pct: 44 },
        { label: "Utilaje industriale", value: 52, pct: 39 },
      ],
    };
  }

  return {
    tocLabel: "Contents",
    tocAriaLabel: "Economy page contents",
    quickStatLabel: "US GDP 2024",
    quickStatSubLabel: "~25% of world GDP",
    breadcrumb: "Economy",
    overviewEyebrow: "Phase 3 — Deep Dive",
    overviewTitle: "The Engine of the World",
    gdpEyebrow: "GDP & Scale",
    gdpTitle: "25% of Everything on Earth",
    gdpChartTitle: "GDP: United States vs Major Economies (2024)",
    gdpChartSubtitle:
      "US GDP in USD Trillions — larger than the next three economies combined",
    gdpPerCapitaTitle: "GDP Per Capita: USA vs G7 & Emerging Markets (2024)",
    gdpPerCapitaSubtitle:
      "At $82,700 per person, Americans produce more wealth per capita than any major nation",
    gdpPerCapitaValueLabel: "GDP per capita (2024, USD Thousands)",
    fullGdpAnalysis: "Full GDP Analysis →",
    capitalEyebrow: "Capital Markets",
    capitalTitle: "Wall Street Powers the World",
    capitalChartTitle: "S&P 500 Index — 45 Years of American Prosperity",
    capitalChartSubtitle: "The world's most-watched equity index: 1980 → 2024",
    marketCapLabel: "Combined NYSE + NASDAQ market cap",
    fullCapitalMarketsAnalysis: "Full Capital Markets Analysis →",
    vcEyebrow: "Venture Capital & Startups",
    vcTitle: "Silicon Valley Is a Planet",
    vcChartTitle: "Venture Capital Investment by Country (2023)",
    startupTimelineTitle: "American Companies That Rewired the World",
    foundedLabel: "Founded",
    companyLabel: "Company",
    foundersLabel: "Founder(s)",
    industryLabel: "Industry",
    valuationLabel: "Valuation",
    startupEcosystemsTitle: "America's Startup Ecosystems",
    unicornsLabel: "Unicorns",
    annualVcLabel: "Annual VC",
    fullVcAnalysis: "Full Startups & VC Analysis →",
    dollarEyebrow: "Dollar Dominance",
    dollarTitle: "The World's Reserve Currency",
    dollarChartTitle: "Global Foreign Exchange Reserves by Currency (2024)",
    dollarReserveCaption:
      "The dollar's reserve status confers the “exorbitant privilege” — the US can finance its deficits in its own currency at favorable global rates",
    fullDollarAnalysis: "Full Dollar Analysis →",
    tradeEyebrow: "Trade & Exports",
    tradeTitle: "America Powers Global Commerce",
    tradeCategoriesTitle: "Top US Export Categories (2024, USD Billions)",
    tradePercentOfTopCategory: "% of top category",
    fullTradeAnalysis: "Full Trade Analysis →",
    subPagesEyebrow: "Explore Deeper",
    subPagesTitle: "Deep Dives",
    exploreCta: "Explore →",
    heroEyebrow: "Phase 3 — Economy Section",
    heroTitleLead: "THE ENGINE",
    heroTitleAccent: "OF THE WORLD",
    heroDescription:
      "The United States economy is the most powerful economic force in the history of human civilization — $28.8 trillion in annual output, the world's reserve currency, and the innovation capital of Earth.",
    heroStats: [
      { value: "$28.8T", label: "GDP 2024", sub: "World Bank" },
      { value: "25%", label: "of World GDP", sub: "IMF" },
      { value: "136", label: "Fortune 500 HQs", sub: "Fortune 2024" },
    ],
    tocItems: [
      { label: "Overview", href: "#overview" },
      { label: "GDP & Scale", href: "#gdp" },
      { label: "Capital Markets", href: "#capital-markets" },
      { label: "Venture Capital", href: "#venture-capital" },
      { label: "The Dollar", href: "#dollar" },
      { label: "Trade & Exports", href: "#trade" },
      { label: "Sub-Pages", href: "#sub-pages" },
    ],
    tradeCategories: [
      { label: "Aircraft & Parts", value: 132, pct: 100 },
      { label: "Petroleum Products", value: 119, pct: 90 },
      { label: "Semiconductors", value: 87, pct: 66 },
      { label: "Medical Devices", value: 74, pct: 56 },
      { label: "Automobiles", value: 65, pct: 49 },
      { label: "Pharmaceuticals", value: 63, pct: 48 },
      { label: "Agricultural Products", value: 58, pct: 44 },
      { label: "Industrial Machinery", value: 52, pct: 39 },
    ],
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function EconomyPage() {
  const locale = await getServerLocale();
  const copy = getEconomyPageCopy(locale);
  const economyHeroStats = getEconomyHeroStats(locale);
  const gdpFacts = getGdpFacts(locale);
  const capitalFacts = getCapitalMarketsFacts(locale);
  const vcFacts = getVcFacts(locale);
  const dollarFacts = getDollarFacts(locale);
  const economyQuotes = getEconomyQuotes(locale);
  const economySubPages = getEconomySubPages(locale);
  const economyOverviewParagraphs = getEconomyOverviewParagraphs(locale);
  const gdpOverviewParagraphs = getGdpOverviewParagraphs(locale);
  const capitalMarketsParagraphs = getCapitalMarketsParagraphs(locale);
  const vcOverviewParagraphs = getVcOverviewParagraphs(locale);
  const dollarOverviewParagraphs = getDollarOverviewParagraphs(locale);
  const tradeOverviewParagraphs = getTradeOverviewParagraphs(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <EconomyHero copy={copy} />

      {/* ── Desktop layout: sticky TOC sidebar + main content ─────────────── */}
      <div className="relative bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 xl:grid-cols-[260px_1fr]">
            {/* Sticky TOC — desktop only */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 py-16">
                <p className="mb-4 font-body text-xs font-semibold uppercase tracking-widest text-glory-gold">
                  {copy.tocLabel}
                </p>
                <nav aria-label={copy.tocAriaLabel}>
                  <ul className="space-y-1">
                    {copy.tocItems.map((item) => (
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
                    {copy.quickStatLabel}
                  </p>
                  <p className="mt-2 font-body text-xs text-glory-gold">
                    {copy.quickStatSubLabel}
                  </p>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <main className="min-w-0 py-16">
              {/* Breadcrumb */}
              <Breadcrumb items={[{ label: copy.breadcrumb }]} className="mb-8" />

              {/* ── Section 1: Overview ─────────────────────────────────── */}
              <section id="overview" className="mb-20 scroll-mt-24">
                <p className="section-eyebrow">{copy.overviewEyebrow}</p>
                <h1 className="mb-6 font-display text-h1 text-white">
                  {copy.overviewTitle}
                </h1>

                {economyOverviewParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className="mb-5 font-body text-lg leading-relaxed text-white/70"
                  >
                    {para}
                  </p>
                ))}

                {/* Hero stat cards */}
                <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {economyHeroStats.map((stat) => (
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
                  <p className="section-eyebrow">{copy.gdpEyebrow}</p>
                  <h2 className="font-display text-h2 text-white">
                    {copy.gdpTitle}
                  </h2>
                </div>

                {gdpOverviewParagraphs.map((para, i) => (
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
                    title={copy.gdpChartTitle}
                    subtitle={copy.gdpChartSubtitle}
                    source="World Bank 2024"
                  />
                </div>

                {/* GDP Per Capita Chart
                    The data numbers are stored in thousands, so the chart uses
                    valueSuffix="K" to display values like 82.7K = $82,700. */}
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
                    title={copy.gdpPerCapitaTitle}
                    subtitle={copy.gdpPerCapitaSubtitle}
                    source="IMF World Economic Outlook 2024"
                    valueSuffix="K"
                    valueLabel={copy.gdpPerCapitaValueLabel}
                  />
                </div>

                {/* GDP Fact Cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {gdpFacts.map((fact) => (
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
                    {copy.fullGdpAnalysis}
                  </Link>
                </div>
              </section>

              {/* ── Pull Quote 1 ────────────────────────────────────────── */}
              <QuoteBlock
                quote={economyQuotes[0].quote}
                attribution={economyQuotes[0].attribution}
                title={economyQuotes[0].title}
                variant="dark"
              />

              {/* ── Section 3: Capital Markets ──────────────────────────── */}
              <section id="capital-markets" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-glory-red pl-5">
                  <p className="section-eyebrow">{copy.capitalEyebrow}</p>
                  <h2 className="font-display text-h2 text-white">
                    {copy.capitalTitle}
                  </h2>
                </div>

                {capitalMarketsParagraphs.map((para, i) => (
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
                    title={copy.capitalChartTitle}
                    subtitle={copy.capitalChartSubtitle}
                    source="S&P Global / Yahoo Finance"
                  />
                </div>

                {/* Capital Markets image */}
                <div className="relative mb-10 overflow-hidden rounded-2xl">
                  <Image
                    src={SITE_IMAGES.economyNYSEUpsideDown}
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
                      {copy.marketCapLabel}
                    </p>
                  </div>
                </div>

                {/* Capital Markets Facts */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {capitalFacts.map((fact) => (
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
                    {copy.fullCapitalMarketsAnalysis}
                  </Link>
                </div>
              </section>

              {/* ── Section 4: Venture Capital & Startups ──────────────── */}
              <section id="venture-capital" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-glory-gold pl-5">
                  <p className="section-eyebrow">{copy.vcEyebrow}</p>
                  <h2 className="font-display text-h2 text-white">
                    {copy.vcTitle}
                  </h2>
                </div>

                {vcOverviewParagraphs.map((para, i) => (
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
                    title={copy.vcChartTitle}
                    source="NVCA / Pitchbook 2024"
                  />
                </div>

                {/* VC Facts */}
                <div className="mb-10 grid gap-4 sm:grid-cols-3">
                  {vcFacts.map((fact) => (
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
                    {copy.startupTimelineTitle}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="pb-3 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                            {copy.foundedLabel}
                          </th>
                          <th className="pb-3 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                            {copy.companyLabel}
                          </th>
                          <th className="pb-3 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                            {copy.foundersLabel}
                          </th>
                          <th className="pb-3 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                            {copy.industryLabel}
                          </th>
                          <th className="pb-3 text-right font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                            {copy.valuationLabel}
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
                    {copy.startupEcosystemsTitle}
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
                              {copy.unicornsLabel}
                            </p>
                          </div>
                          <div>
                            <p className="font-hero text-2xl text-white">
                              {eco.vcFunding}
                            </p>
                            <p className="font-body text-xs text-white/40">
                              {copy.annualVcLabel}
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
                    {copy.fullVcAnalysis}
                  </Link>
                </div>
              </section>

              {/* ── Pull Quote 2 ────────────────────────────────────────── */}
              <QuoteBlock
                quote={economyQuotes[1].quote}
                attribution={economyQuotes[1].attribution}
                title={economyQuotes[1].title}
                variant="dark"
              />

              {/* ── Section 5: Dollar Dominance ─────────────────────────── */}
              <section id="dollar" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-glory-blue-light pl-5">
                  <p className="section-eyebrow">{copy.dollarEyebrow}</p>
                  <h2 className="font-display text-h2 text-white">
                    {copy.dollarTitle}
                  </h2>
                </div>

                {dollarOverviewParagraphs.map((para, i) => (
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
                    title={copy.dollarChartTitle}
                    source="IMF COFER Q4 2023"
                  />
                </div>

                {/* Dollar image */}
                <div className="relative mb-10 overflow-hidden rounded-2xl">
                  <Image
                    src={SITE_IMAGES.economyDollar}
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
                      {copy.dollarReserveCaption}
                    </p>
                  </div>
                </div>

                {/* Dollar Facts */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {dollarFacts.map((fact) => (
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
                    {copy.fullDollarAnalysis}
                  </Link>
                </div>
              </section>

              {/* ── Section 6: Trade & Exports ──────────────────────────── */}
              <section id="trade" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-glory-red pl-5">
                  <p className="section-eyebrow">{copy.tradeEyebrow}</p>
                  <h2 className="font-display text-h2 text-white">
                    {copy.tradeTitle}
                  </h2>
                </div>

                {tradeOverviewParagraphs.map((para, i) => (
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
                    src={SITE_IMAGES.economyPort}
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
                  {copy.tradeCategoriesTitle}
                </h3>
                <div className="space-y-3">
                  {copy.tradeCategories.map((item) => (
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
                    {copy.fullTradeAnalysis}
                  </Link>
                </div>
              </section>

              {/* ── Pull Quote 3 ────────────────────────────────────────── */}
              <QuoteBlock
                quote={economyQuotes[2].quote}
                attribution={economyQuotes[2].attribution}
                title={economyQuotes[2].title}
                variant="dark"
              />

              {/* ── Section 7: Sub-Page Navigation ──────────────────────── */}
              <section id="sub-pages" className="mb-8 scroll-mt-24">
                <p className="section-eyebrow">{copy.subPagesEyebrow}</p>
                <h2 className="mb-8 font-display text-h2 text-white">
                  {copy.subPagesTitle}
                </h2>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {economySubPages.map((page) => (
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
                          {copy.exploreCta}
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

function EconomyHero({
  copy,
}: {
  copy: ReturnType<typeof getEconomyPageCopy>;
}) {
  return (
    <section
      className="relative flex min-h-[80vh] items-end bg-navy-dark pb-16 pt-32"
      aria-label="Economy hero"
    >
      {/* Background image */}
      <Image
        src={SITE_IMAGES.economyTradeSkyline}
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
            {copy.heroEyebrow}
          </p>

          <h1 className="mb-6 font-hero text-6xl leading-none tracking-wide text-white sm:text-7xl md:text-8xl">
            {copy.heroTitleLead}
            <br />
            <span className="text-glory-gold">{copy.heroTitleAccent}</span>
          </h1>

          <p className="mb-8 font-body text-lg leading-relaxed text-white/70 md:text-xl">
            {copy.heroDescription}
          </p>

          {/* Three hero stats */}
          <div className="flex flex-wrap gap-6">
            {copy.heroStats.map((stat) => (
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
