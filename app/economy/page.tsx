// ─── Economy Page ─────────────────────────────────────────────────────────────
// This is the "Data-Driven Narrative" hub for the American economy.
//
// Pedagogical Strategy:
// - Contrast & Scale: Uses charts to show the US relative to the rest of the world.
// - Vertical Integration: Connects high-level GDP stats to individual startup hubs.
// - Performance: Uses Server Components to assemble metadata and TOC, while 
//   offloading charts to client-side Recharts islands.
//
// Beginner guide:
// - To change the numbers used by the charts/cards, edit lib/data/economy-data.ts
// - To change which sections appear on this page, edit the JSX below.
// - To change the hero image, update the SITE_IMAGES key used in metadata or the
//   EconomyHero component further down in this file.

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
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MacroStyles, MacroHero, MacroStat, MacroFact, InfrastructureBand } from "@/components/economy/EconomyAnimations";

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
  title: "Economy",
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
  // Keep page labels and small UI strings in one place.
  // This makes the large page component below much easier to read and edit.
  if (locale === "ro") {
    return {
      tocLabel: "Cuprins",
      tocAriaLabel: "Cuprinsul paginii economiei",
      quickStatLabel: "PIB SUA 2026",
      quickStatSubLabel: "~25% din PIB-ul mondial",
      breadcrumb: "Economie",
      overviewEyebrow: "Analiză în profunzime",
      overviewTitle: "Scară fără precedent",
      gdpEyebrow: "PIB și Dimensiune",
      gdpTitle: "25% din tot ce există pe Pământ",
      gdpChartTitle: "PIB: Statele Unite vs economiile majore (2026)",
      gdpChartSubtitle:
        "PIB-ul SUA în trilioane USD — mai mare decât următoarele trei economii la un loc",
      gdpPerCapitaTitle: "PIB pe cap de locuitor: SUA vs G7 și piețe emergente (2026)",
      gdpPerCapitaSubtitle:
        "La 94.400 USD per persoană, americanii produc mai multă bogăție per capita decât orice mare națiune",
      gdpPerCapitaValueLabel: "PIB pe cap de locuitor (2026, mii USD)",
      fullGdpAnalysis: "Analiza completă a PIB-ului →",
      capitalEyebrow: "Piețe de Capital",
      capitalTitle: "Wall Street pune în mișcare lumea",
      capitalChartTitle: "Indicele S&P 500 — 45 de ani de prosperitate americană",
      capitalChartSubtitle:
        "Cel mai urmărit indice bursier din lume: 1980 → 2026",
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
      dollarChartTitle: "Rezerve valutare globale pe monedă (2026)",
      dollarReserveCaption:
        "Statutul de monedă de rezervă oferă dolarului «privilegiul exorbitant» — SUA își pot finanța deficitele în propria monedă la costuri favorabile la nivel global",
      fullDollarAnalysis: "Analiza completă a dolarului →",
      tradeEyebrow: "Comerț și Exporturi",
      tradeTitle: "America alimentează comerțul global",
      tradeCategoriesTitle:
        "Principalele categorii de export ale SUA (2026, miliarde USD)",
      tradePercentOfTopCategory: "% din categoria de top",
      fullTradeAnalysis: "Analiza completă a comerțului →",
      subPagesEyebrow: "Explorați Mai Departe",
      subPagesTitle: "Analize aprofundate",
      exploreCta: "Explorează →",
      heroEyebrow: "Secțiunea Economie",
      heroTitleLead: "MOTORUL",
      heroTitleAccent: "LUMII",
      heroDescription:
        "Economia Statelor Unite este cea mai puternică forță economică din istoria civilizației umane — 32,4 trilioane de dolari producție anuală, moneda de rezervă a lumii și capitala globală a inovației.",
      heroStats: [
        { value: "$32.4T", label: "PIB 2026", sub: "IMF Projection" },
        { value: "25%", label: "din PIB-ul mondial", sub: "FMI" },
        { value: "139", label: "sedii Fortune 500", sub: "Fortune 2026" },
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
    quickStatLabel: "US GDP 2026",
    quickStatSubLabel: "~25% of world GDP",
    breadcrumb: "Economy",
    overviewEyebrow: "Deep Dive",
    overviewTitle: "Unprecedented Scale",
    gdpEyebrow: "GDP & Scale",
    gdpTitle: "25% of Everything on Earth",
    gdpChartTitle: "GDP: United States vs Major Economies (2026)",
    gdpChartSubtitle:
      "US GDP in USD Trillions — larger than the next three economies combined",
    gdpPerCapitaTitle: "GDP Per Capita: USA vs G7 & Emerging Markets (2026)",
    gdpPerCapitaSubtitle:
      "At $94,400 per person, Americans produce more wealth per capita than any major nation",
    gdpPerCapitaValueLabel: "GDP per capita (2026, USD Thousands)",
    fullGdpAnalysis: "Full GDP Analysis →",
    capitalEyebrow: "Capital Markets",
    capitalTitle: "Wall Street Powers the World",
    capitalChartTitle: "S&P 500 Index — 45 Years of American Prosperity",
    capitalChartSubtitle: "The world's most-watched equity index: 1980 → 2026",
    marketCapLabel: "Combined NYSE + NASDAQ market cap",
    fullCapitalMarketsAnalysis: "Full Capital Markets Analysis →",
    vcEyebrow: "Venture Capital & Startups",
    vcTitle: "Silicon Valley Is a Planet",
    vcChartTitle: "Venture Capital Investment by Country (2026)",
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
    dollarChartTitle: "Global Foreign Exchange Reserves by Currency (2026)",
    dollarReserveCaption:
      "The dollar's reserve status confers the “exorbitant privilege” — the US can finance its deficits in its own currency at favorable global rates",
    fullDollarAnalysis: "Full Dollar Analysis →",
    tradeEyebrow: "Trade & Exports",
    tradeTitle: "America Powers Global Commerce",
    tradeCategoriesTitle: "Top US Export Categories (2026, USD Billions)",
    tradePercentOfTopCategory: "% of top category",
    fullTradeAnalysis: "Full Trade Analysis →",
    subPagesEyebrow: "Explore Deeper",
    subPagesTitle: "Deep Dives",
    exploreCta: "Explore →",
    heroEyebrow: "Economy Section",
    heroTitleLead: "THE ENGINE",
    heroTitleAccent: "OF THE WORLD",
    heroDescription:
      "The United States economy is the most powerful economic force in the history of human civilization — $32.4 trillion in annual output, the world's reserve currency, and the innovation capital of Earth.",
    heroStats: [
      { value: "$32.4T", label: "GDP 2026", sub: "IMF Projection" },
      { value: "25%", label: "of World GDP", sub: "IMF" },
      { value: "139", label: "Fortune 500 HQs", sub: "Fortune 2026" },
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
  // This page is assembled from shared data helpers.
  // If a number, paragraph, or quote is wrong, the first place to inspect is
  // usually `lib/data/economy-data.ts`, not the JSX below.
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

      <MacroStyles />
      <MacroHero 
        imageSrc={SITE_IMAGES.economyNyseHero}
        imageAlt="New York Stock Exchange trading floor"
        eyebrow={copy.heroEyebrow}
        titleLead={copy.heroTitleLead}
        titleAccent={copy.heroTitleAccent}
        description={copy.heroDescription}
        stats={copy.heroStats}
      />

      {/* ── Main Content — Full-width Macro-Editorial Flow ─────────────── */}
      <main className="relative bg-[#030405] pb-32">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-12">
          <Breadcrumb items={[{ label: copy.breadcrumb }]} />
        </div>

        {/* ── Section 1: Overview ─────────────────────────────────── */}
        <section id="overview" className="mb-48 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <p className="macro-eyebrow mb-8">{copy.overviewEyebrow}</p>
              <h2 className="macro-section-title mb-12">
                {copy.overviewTitle}
              </h2>

              {economyOverviewParagraphs.map((para, i) => (
                <p key={i} className="macro-body mb-8 max-w-4xl">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Hero stat cards - Replaced with MacroStat */}
          <div className="mt-24 grid gap-x-12 gap-y-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/5 pt-16">
            {economyHeroStats.map((stat) => (
              <MacroStat
                key={stat.id}
                value={
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                }
                label={stat.label}
                source={stat.source}
                color={stat.color === "gold" ? "#E8B923" : "#F0F2F5"}
              />
            ))}
          </div>
        </section>

        {/* ── Section 2: GDP & Scale ──────────────────────────────── */}
        <section id="gdp" className="mb-48 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <p className="macro-eyebrow mb-8 text-[#E8B923]">{copy.gdpEyebrow}</p>
              <h2 className="macro-section-title mb-12">
                {copy.gdpTitle}
              </h2>

              {gdpOverviewParagraphs.map((para, i) => (
                <p key={i} className="macro-body mb-8 max-w-4xl">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* GDP Charts - Borderless */}
          <div className="my-24 grid grid-cols-1 xl:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <GdpBarChart
                data={GDP_COMPARISON}
                title={copy.gdpChartTitle}
                subtitle={copy.gdpChartSubtitle}
                source="World Bank 2026"
              />
            </div>
            <div className="flex flex-col">
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
                source="IMF World Economic Outlook 2026"
                valueSuffix="K"
                valueLabel={copy.gdpPerCapitaValueLabel}
              />
            </div>
          </div>

          {/* GDP Facts - Replaced with MacroFact */}
          <div className="grid gap-16 sm:grid-cols-2 mt-24 border-t border-white/5 pt-16">
            {gdpFacts.map((fact, i) => (
              <MacroFact
                key={fact.id}
                index={i + 1}
                fact={fact.fact}
                detail={fact.detail}
              />
            ))}
          </div>

          <div className="mt-16">
            <Link
              href="/economy/gdp-growth"
              className="inline-flex items-center gap-4 font-macro-mono text-sm uppercase tracking-[0.2em] text-[#E8B923] hover:text-white transition-colors"
            >
              {copy.fullGdpAnalysis}
            </Link>
          </div>
        </section>

        {/* ── Pull Quote 1 ────────────────────────────────────────── */}
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 my-32 border-t border-white/5 pt-32">
          <QuoteBlock
            quote={economyQuotes[0].quote}
            attribution={economyQuotes[0].attribution}
            title={economyQuotes[0].title}
            variant="dark"
          />
        </div>

        {/* ── Section 3: Capital Markets ──────────────────────────── */}
        <section id="capital-markets" className="mb-48 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <p className="macro-eyebrow mb-8 text-[#b22234]">{copy.capitalEyebrow}</p>
              <h2 className="macro-section-title mb-12">
                {copy.capitalTitle}
              </h2>

              {capitalMarketsParagraphs.map((para, i) => (
                <p key={i} className="macro-body mb-8 max-w-4xl">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Cinematic Infrastructure Band for Capital Markets */}
        <InfrastructureBand 
          imageSrc={SITE_IMAGES.economyNYSEUpsideDown} 
          imageAlt="Stock market trading screens"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="macro-hero-title text-[#E8B923] mb-4">$47T+</p>
              <p className="macro-metadata text-white/70">
                {copy.marketCapLabel}
              </p>
              <div className="mt-16 grid gap-12">
                {capitalFacts.map((fact, i) => (
                  <MacroFact
                    key={fact.id}
                    index={i + 1}
                    fact={fact.fact}
                    detail={fact.detail}
                  />
                ))}
              </div>
            </div>
            
            {/* S&P 500 Chart - Borderless on top of cinematic blur */}
            <div className="bg-[#030405]/50 backdrop-blur-md p-8 border border-white/10">
              <SP500Chart
                data={SP500_HISTORY}
                title={copy.capitalChartTitle}
                subtitle={copy.capitalChartSubtitle}
                source="S&P Global / Yahoo Finance"
              />
            </div>
          </div>
        </InfrastructureBand>

        <div className="mx-auto max-w-[1600px] px-6 md:px-12 mt-16 mb-48">
          <Link
            href="/economy/capital-markets"
            className="inline-flex items-center gap-4 font-macro-mono text-sm uppercase tracking-[0.2em] text-[#b22234] hover:text-white transition-colors"
          >
            {copy.fullCapitalMarketsAnalysis}
          </Link>
        </div>

        {/* ── Section 4: Venture Capital & Startups ──────────────── */}
        <section id="venture-capital" className="mb-48 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <p className="macro-eyebrow mb-8 text-[#E8B923]">{copy.vcEyebrow}</p>
              <h2 className="macro-section-title mb-12">
                {copy.vcTitle}
              </h2>

              {vcOverviewParagraphs.map((para, i) => (
                <p key={i} className="macro-body mb-8 max-w-4xl">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* VC Chart - Borderless */}
          <div className="my-24">
            <VCBarChart
              data={VC_BY_COUNTRY}
              title={copy.vcChartTitle}
              source="NVCA / Pitchbook 2026"
            />
          </div>

          {/* VC Facts - Replaced with MacroFact */}
          <div className="grid gap-16 sm:grid-cols-3 mt-24 border-t border-white/5 pt-16">
            {vcFacts.map((fact, i) => (
              <MacroFact
                key={fact.id}
                index={i + 1}
                fact={fact.fact}
                detail={fact.detail}
              />
            ))}
          </div>

          {/* Startup Timeline - Borderless typographic table */}
          <div className="mt-32">
            <h3 className="macro-section-title text-[clamp(24px,4vw,60px)] mb-16">
              {copy.startupTimelineTitle}
            </h3>
            <div className="grid gap-8">
              {STARTUP_TIMELINE.map((item, i) => (
                <div key={i} className="grid grid-cols-2 md:grid-cols-5 gap-4 border-b border-white/10 pb-8 items-center">
                  <div className="font-macro-display text-3xl text-[#E8B923]">{item.year}</div>
                  <div className="font-macro-display text-2xl text-white">{item.company}</div>
                  <div className="font-macro-body text-white/60">{item.founder}</div>
                  <div>
                    <span className="macro-metadata border border-white/20 px-3 py-1 text-white">{item.industry}</span>
                  </div>
                  <div className="font-macro-mono text-xl text-white text-right">{item.currentValuation}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Startup Ecosystems */}
          <div className="mt-32">
            <h3 className="macro-section-title text-[clamp(24px,4vw,60px)] mb-16">
              {copy.startupEcosystemsTitle}
            </h3>
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {STARTUP_ECOSYSTEMS.map((eco) => (
                <div key={eco.city} className="flex flex-col border-t border-[#E8B923]/30 pt-8">
                  <p className="macro-eyebrow mb-2">{eco.state}</p>
                  <h4 className="font-macro-display text-4xl text-white mb-2">{eco.city}</h4>
                  <p className="font-macro-body text-white/50 mb-8">{eco.nickname}</p>
                  
                  <div className="flex gap-8 mb-6">
                    <div>
                      <p className="font-macro-display text-4xl text-[#E8B923]">{eco.unicorns}+</p>
                      <p className="macro-metadata">{copy.unicornsLabel}</p>
                    </div>
                    <div>
                      <p className="font-macro-display text-4xl text-white">{eco.vcFunding}</p>
                      <p className="macro-metadata">{copy.annualVcLabel}</p>
                    </div>
                  </div>
                  <p className="macro-metadata text-white/30">{eco.keyCompanies.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <Link
              href="/economy/startups-venture-capital"
              className="inline-flex items-center gap-4 font-macro-mono text-sm uppercase tracking-[0.2em] text-[#E8B923] hover:text-white transition-colors"
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
        <section id="dollar" className="mb-48 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <p className="macro-eyebrow mb-8 text-[#3c3b6e]">{copy.dollarEyebrow}</p>
              <h2 className="macro-section-title mb-12">
                {copy.dollarTitle}
              </h2>

              {dollarOverviewParagraphs.map((para, i) => (
                <p key={i} className="macro-body mb-8 max-w-4xl">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="my-24 bg-[#030405]/50 backdrop-blur-md p-8 border border-white/10">
            <DollarReserveChart
              data={DOLLAR_RESERVE_SHARE}
              title={copy.dollarChartTitle}
              source="IMF COFER Q4 2023"
            />
          </div>

          {/* Dollar image - Cinematic */}
          <div className="relative mb-24 overflow-hidden h-[400px]">
            <Image
              src={SITE_IMAGES.economyDollar}
              alt="US dollar bills — the world's reserve currency"
              fill
              className="object-cover macro-edge-fade opacity-70 grayscale-[0.2]"
              sizes="100vw"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
            <div className="absolute bottom-6 left-0 right-0 px-6">
              <p className="macro-metadata text-center text-white/50">
                {copy.dollarReserveCaption}
              </p>
            </div>
          </div>

          <div className="grid gap-16 sm:grid-cols-3 mt-24 border-t border-white/5 pt-16">
            {dollarFacts.map((fact, i) => (
              <MacroFact
                key={fact.id}
                index={i + 1}
                fact={fact.fact}
                detail={fact.detail}
              />
            ))}
          </div>

          <div className="mt-16">
            <Link
              href="/economy/dollar-dominance"
              className="inline-flex items-center gap-4 font-macro-mono text-sm uppercase tracking-[0.2em] text-[#3c3b6e] hover:text-white transition-colors"
            >
              {copy.fullDollarAnalysis}
            </Link>
          </div>
        </section>

        {/* ── Section 6: Trade & Exports ──────────────────────────── */}
        <section id="trade" className="mb-48 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <p className="macro-eyebrow mb-8 text-[#b22234]">{copy.tradeEyebrow}</p>
              <h2 className="macro-section-title mb-12">
                {copy.tradeTitle}
              </h2>

              {tradeOverviewParagraphs.map((para, i) => (
                <p key={i} className="macro-body mb-8 max-w-4xl">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <InfrastructureBand 
            imageSrc={SITE_IMAGES.economyPort} 
            imageAlt="Container port — America's export machine"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="font-macro-display text-4xl text-white mb-12">
                  {copy.tradeCategoriesTitle}
                </h3>
                <div className="space-y-6">
                  {copy.tradeCategories.map((item) => (
                    <div key={item.label} className="flex items-center gap-6">
                      <p className="w-48 shrink-0 font-macro-mono text-xs uppercase tracking-widest text-white/70">
                        {item.label}
                      </p>
                      <div className="relative flex-1 bg-white/5 h-12">
                        <div
                          className="absolute inset-y-0 left-0 bg-[#b22234]/80 flex items-center px-4"
                          style={{ width: `${item.pct}%` }}
                        >
                          <span className="font-macro-display text-xl text-white">
                            ${item.value}B
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-8 macro-metadata text-white/30 text-right">
                  Source: US Census Bureau / BEA 2026
                </p>
              </div>
              
              <div className="grid gap-12">
                <div className="mx-auto px-6">
                  <QuoteBlock
                    quote={economyQuotes[2].quote}
                    attribution={economyQuotes[2].attribution}
                    title={economyQuotes[2].title}
                    variant="dark"
                  />
                </div>
              </div>
            </div>
          </InfrastructureBand>

          <div className="mt-16">
            <Link
              href="/economy/trade-and-exports"
              className="inline-flex items-center gap-4 font-macro-mono text-sm uppercase tracking-[0.2em] text-[#b22234] hover:text-white transition-colors"
            >
              {copy.fullTradeAnalysis}
            </Link>
          </div>
        </section>

        {/* ── Section 7: Sub-Page Navigation ──────────────────────── */}
        <section id="sub-pages" className="mb-8 mx-auto max-w-[1600px] px-6 md:px-12 border-t border-white/10 pt-32">
          <p className="macro-eyebrow mb-8 text-[#E8B923]">{copy.subPagesEyebrow}</p>
          <h2 className="macro-section-title mb-16">
            {copy.subPagesTitle}
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {economySubPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group flex flex-col border border-white/10 hover:border-[#E8B923]/40 transition-colors bg-white/5"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={page.imageSrc}
                    alt={page.imageAlt}
                    fill
                    className="object-cover opacity-60 grayscale-[0.2] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                  <span className="absolute right-4 top-4 bg-[#E8B923] text-[#030405] font-macro-mono text-[10px] uppercase tracking-widest px-3 py-1 font-bold">
                    {page.badge}
                  </span>
                </div>
                <div className="p-8">
                  <h3 className="font-macro-display text-3xl font-bold text-white mb-4 group-hover:text-[#E8B923] transition-colors">
                    {page.title}
                  </h3>
                  <p className="font-macro-body text-white/50 text-base mb-8">
                    {page.description}
                  </p>
                  <p className="macro-metadata text-[#E8B923]">
                    {copy.exploreCta}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

// ─── Economy Hero ─────────────────────────────────────────────────────────────
// Extracted as a local server component to keep the page clean.


