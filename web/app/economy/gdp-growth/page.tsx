// ─── GDP & Scale Sub-Page ─────────────────────────────────────────────────────
// A deep-dive vertical focusing on the magnitude of the US economy.
//
// Pedagogical Goal:
// - To contextualize $32.4 trillion by comparing individual US states to 
//   entire G7 nations.
// - To demonstrate the historical resilience of American GDP.
//
// Beginner guide:
// - Most numbers and chart data come from lib/data/economy-data.ts
// - This file mostly decides page order, headings, and which reusable
//   components are used

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { GdpHistoryChart } from "@/components/data/GdpHistoryChart";
import { GdpBarChart } from "@/components/data/GdpBarChart";
import { GdpSectorsChart } from "@/components/data/GdpSectorsChart";
import { GdpDivergenceChart } from "@/components/data/GdpDivergenceChart";
import { MacroStyles, MacroHero, MacroStat, MacroFact, InfrastructureBand, CountUp } from "@/components/economy/EconomyAnimations";
import { getServerLocale } from "@/lib/i18n/server";
import {
  GDP_COMPARISON,
  US_GDP_HISTORY,
  GDP_HISTORY_META,
  GDP_SERIES_META,
  GDP_PER_CAPITA,
  US_GDP_SECTORS,
  US_VS_G7_DIVERGENCE,
  type GdpDataPoint,
} from "@/lib/data/economy-data";
import { SITE_IMAGES } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "GDP & Scale | Economy",
  description:
    "$32.4 trillion GDP — the United States has been the world's largest economy for over 130 years. A deep dive into American economic scale, resilience, and dominance.",
  alternates: { canonical: "/economy/gdp-growth" },
};

const STATE_GDP_RANKINGS = [
  {
    state: "California",
    gdp: "$4.25T",
    rank: 4,
    comparison: "Larger than Japan",
  },
  { state: "Texas", gdp: "$2.9T", rank: 8, comparison: "Larger than Brazil" },
  {
    state: "New York",
    gdp: "$2.5T",
    rank: 10,
    comparison: "Larger than Canada",
  },
  {
    state: "Florida",
    gdp: "$1.6T",
    rank: 15,
    comparison: "Larger than Mexico",
  },
  {
    state: "Illinois",
    gdp: "$1.1T",
    rank: 19,
    comparison: "Larger than Saudi Arabia",
  },
  {
    state: "Washington",
    gdp: "$0.9T",
    rank: 21,
    comparison: "Larger than Sweden",
  },
  {
    state: "Pennsylvania",
    gdp: "$0.9T",
    rank: 21,
    comparison: "Larger than Switzerland",
  },
];

export default async function GdpGrowthPage() {
  // Locale decides which copy block and which translated supporting arrays are
  // used for this request. The page itself stays server-rendered.
  const locale = await getServerLocale();
  const breadcrumbEconomy = locale === "ro" ? "Economie" : "Economy";
  const pageLabel = locale === "ro" ? "PIB și Dimensiune" : "GDP & Scale";
  // Terminal "by the numbers" section: three headline stats plus two editorial
  // insights, replacing the old wall of seven identical fact cards. The Texas
  // fact was dropped — the state-vs-nation table above already makes that point.
  const gdpStatTrio =
    locale === "ro"
      ? [
          { value: "80%", label: "din PIB provine din servicii cu valoare mare" },
          { value: "$21T", label: "cheltuieli de consum — depășesc întreg PIB-ul Chinei" },
          { value: "$900B+", label: "investiți anual în cercetare și dezvoltare — nr. 1 mondial" },
        ]
      : [
          { value: "80%", label: "of GDP comes from high-value services" },
          { value: "$21T", label: "in consumer spending — exceeds China's entire GDP" },
          { value: "$900B+", label: "invested in R&D every year — #1 on Earth" },
        ];
  const gdpInsights =
    locale === "ro"
      ? [
          {
            fact: "Cel mai mare producător de energie de pe Pământ",
            detail:
              "SUA produc mai mult petrol și gaze naturale decât orice altă națiune — un avantaj structural în costurile industriale și securitatea națională.",
          },
          {
            fact: "Productivitate pe oră în topul OCDE",
            detail:
              "Măsurată prin PIB pe oră lucrată, America depășește constant Germania, Regatul Unit și Japonia — de aceea salariile americane sunt printre cele mai mari din lume (vezi [Salarii & Productivitate](/quality-of-life/wages)).",
          },
        ]
      : [
          {
            fact: "The largest energy producer on Earth",
            detail:
              "The US pumps more oil and natural gas than any nation — a structural advantage in industrial costs and national security.",
          },
          {
            fact: "Top-tier OECD productivity per hour",
            detail:
              "Measured by GDP per hour worked, America consistently outperforms Germany, the UK, and Japan — which is why American wages are high (see [Wages & Productivity](/quality-of-life/wages)).",
          },
        ];
  // These local arrays let the page translate or swap a few facts without
  // editing the shared source data used elsewhere in the economy section.
  const stateRankings =
    locale === "ro"
      ? [
          { ...STATE_GDP_RANKINGS[0], comparison: "Mai mare decât Regatul Unit" },
          { ...STATE_GDP_RANKINGS[1], comparison: "Mai mare decât Rusia" },
          { ...STATE_GDP_RANKINGS[2], comparison: "Mai mare decât Coreea de Sud" },
          { ...STATE_GDP_RANKINGS[3], comparison: "Mai mare decât Mexicul" },
          { ...STATE_GDP_RANKINGS[4], comparison: "Mai mare decât Arabia Saudită" },
          { ...STATE_GDP_RANKINGS[5], comparison: "Mai mare decât Suedia" },
          { ...STATE_GDP_RANKINGS[6], comparison: "Mai mare decât Elveția" },
        ]
      : STATE_GDP_RANKINGS;
  // `copy` keeps all visible labels together so the JSX below reads more like
  // layout structure and less like a wall of inline strings.
  const copy =
    locale === "ro"
      ? {
          heroAlt: "Districtul financiar din New York",
          heroEyebrow: "PIB și Dimensiune",
          heroLead: "$32.4 TRILIOANE",
          heroAccent: "ȘI ÎN CREȘTERE",
          heroBody:
            "O domnie de 130 de ani în vârf. Prin fiecare criză, fiecare rival și fiecare predicție a declinului american — economia Statelor Unite nu doar că a rezistat. A dominat.",
          growthTitle: "Creșterea, an de an",
          growthBody:
            "Restul acestei pagini prezintă instantanee: cine este cel mai mare astăzi. Aceasta arată cum s-a ajuns acolo. Din 1929, când începe seria oficială, economia americană s-a mărit de douăzeci de ori în termeni reali — nu prin salturi, ci prin compunere, an după an, prin Marea Criză, un război mondial, două crize petroliere, o criză financiară și o pandemie.",
          growthChartTitle: "PIB-ul SUA din 1929",
          growthChartSubtitle: "Comută între real (inflația eliminată) și nominal",
          worldTitle: "Statele Unite vs. lumea",
          worldBody:
            "Economia SUA nu este doar cea mai mare — operează într-o categorie complet diferită. La 32,4 trilioane de dolari, depășește PIB-urile cumulate ale Chinei (20,8T), Germaniei (5,4T) și Japoniei (4,4T). Asta înseamnă că următoarele trei mari economii, adunate, tot nu pot egala producția unei singure națiuni de 335 de milioane de oameni.",
          worldChartTitle: "PIB pe țări (2026, trilioane USD)",
          worldChartSubtitle:
            "Economia SUA depășește următoarele trei mari economii combinate",
          perCapitaTitle: "Per capita: oameni bogați, țară bogată",
          perCapitaBody:
            "Ceea ce face performanța SUA cu adevărat extraordinară este că dominația economică americană nu este doar o funcție a populației. Americanul mediu generează 94.400 USD în producție economică anuală — mai mult decât Germania (65.300), Regatul Unit (61.100), Franța (52.100) și incomparabil mai mult decât China (14.900). SUA sunt simultan cea mai mare și una dintre cele mai productive economii de pe Pământ.",
          perCapitaChartTitle: "PIB pe cap de locuitor după țară (2026, mii USD)",
          perCapitaChartSubtitle:
            "La 94.400 USD per persoană, americanul mediu produce mai mult decât orice altă mare națiune",
          worldValueLabel: "PIB (proiecție 2026, trilioane USD)",
          perCapitaValueLabel: "PIB pe cap de locuitor (proiecție 2026, mii USD)",
          prosperityTitle: "Arcul lung al prosperității americane",
          prosperityBody:
            "S&P 500 este cel mai urmărit indice bursier din lume — o fișă de evaluare în timp real a vitalității economice americane. Din 1980, a oferit un randament mediu anual de aproximativ 10,5%, transformând 1.000 USD în peste 40.000 USD. Fiecare prăbușire — dot-com, criza financiară, COVID — a fost urmată de o revenire la noi maxime. Nu este noroc; este rodul unui sistem care alocă în mod constant capitalul către utilizările sale cele mai productive.",
          prosperityChartTitle: "Indicele S&P 500 — 46 de ani de creștere neîntreruptă pe termen lung",
          prosperityChartSubtitle:
            "Fiecare scădere a fost temporară; fiecare revenire a fost reală",
          statesTitle: "State americane vs. națiuni",
          statesBody:
            "Poate cea mai remarcabilă ilustrare a dimensiunii economice americane: state individuale ale SUA depășesc națiuni importante întregi. California, Texas și New York sunt fiecare centre de putere economică globală în sine.",
          stateLabel: "Stat",
          stateGdpLabel: "PIB statal",
          globalRankLabel: "Rang global",
          comparisonLabel: "Comparație",
          globallyLabel: "la nivel global",
          statesSource: "Sursă: Bureau of Economic Analysis 2026, World Bank 2026",
          growthPullLabel:
            "ani de creștere din ultimii 75 — o reziliență economică pe care nicio mare economie nu o egalează.",
          byNumbersEyebrow: "Amploarea, în cifre",
          byNumbersTitle: "Cifrele din spatele cifrelor",
          insightsEyebrow: "Avantaje structurale",
          quoteTitle: "Laureat Nobel pentru Economie, University of Chicago",
          backLink: "← Înapoi la prezentarea economiei",
          nextLink: "Piețe de Capital →",
          sectorsTitle: "Compoziția PIB: Servicii & Valoare Ridicată",
          sectorsBody: "Economia americană modernă este fundamental bazată pe servicii de înaltă valoare, finanțele, asigurările și serviciile profesionale/tehnice generând peste o treime din total. Cu toate acestea, SUA mențin o bază industrială colosală (3,0T$) care singură depășește producția totală a marii majorități a țărilor lumii.",
          sectorsChartTitle: "Valoarea adăugată pe sectoare (2025/2026, % din PIB)",
          sectorsChartSubtitle: "Un amestec de servicii avansate și producție industrială masivă",
          sectorsSource: "Biroul de Analiză Economică al SUA (BEA) 2026",
          divergenceTitle: "Marea Divergență: SUA vs. G7",
          divergenceBody: "De la criza financiară globală, Statele Unite s-au distanțat dramatic de partenerii săi din G7. Cu o bază de indexare la nivelul anului 2010 (100), economia reală a SUA a înregistrat o expansiune de 41%, în timp ce restul națiunilor din G7 (Germania, Japonia, Marea Britanie, Franța, Italia, Canada) au avansat în medie cu doar 19,5%. Această performanță reflectă dinamismul unic al piețelor de capital și flexibilitatea structurală a Americii.",
          divergenceChartTitle: "Indicele de creștere a PIB-ului real (2010 = 100)",
          divergenceChartSubtitle: "Comparație istorică între ritmul de creștere al SUA și media restului G7",
          divergenceSource: "Date de la OECD / FMI World Economic Outlook 2026",
        }
      : {
          heroAlt: "New York City financial district",
          heroEyebrow: "GDP & Scale",
          heroLead: "$32.4 TRILLION",
          heroAccent: "AND COUNTING",
          heroBody:
            "A 130-year reign at the top. Through every crisis, every challenger, every prediction of American decline — the United States economy has not just endured. It has dominated.",
          growthTitle: "The Growth, Year by Year",
        growthBody:
          "The rest of this page is snapshots: who is biggest today. This is how it got there. Since 1929, where the official series begins, the American economy has grown twenty times over in real terms — not in leaps, but by compounding, year after year, through the Depression, a world war, two oil shocks, a financial crisis, and a pandemic.",
        growthChartTitle: "U.S. GDP since 1929",
        growthChartSubtitle: "Toggle between real (inflation removed) and nominal",
        worldTitle: "The United States vs. The World",
          worldBody:
            "The US economy is not just the largest — it operates in a different category entirely. At $32.4 trillion, it exceeds the combined GDPs of China ($20.8T), Germany ($5.4T), and Japan ($4.4T). That means the three next-largest economies, added together, still cannot match the output of a single nation of 335 million people.",
          worldChartTitle: "GDP by Country (2026, USD Trillions)",
          worldChartSubtitle:
            "The US economy exceeds the next three largest economies combined",
          perCapitaTitle: "Per Capita: Rich People, Rich Country",
          perCapitaBody:
            "What makes the US achievement truly extraordinary is that its economic dominance is not simply a function of population size. The average American generates $94,400 in economic output per year — more than Germany ($65,300), the United Kingdom ($61,100), France ($52,100), and vastly more than China ($14,900). The US is simultaneously the largest AND one of the most productive economies on Earth.",
          perCapitaChartTitle: "GDP Per Capita by Country (2026, USD Thousands)",
          perCapitaChartSubtitle:
            "At $94,400 per person, the average American produces more than any major nation",
          worldValueLabel: "GDP (2026 projection, USD Trillions)",
          perCapitaValueLabel: "GDP per capita (2026 projection, USD Thousands)",
          prosperityTitle: "The Long Arc of American Prosperity",
          prosperityBody:
            "The S&P 500 is the world's most closely watched equity index — a real-time report card on American economic vitality. Since 1980, it has delivered an average annual return of approximately 10.5%, compounding $1,000 into over $40,000. Every crash — dot-com, financial crisis, COVID — was followed by recovery to new highs. This is not luck; it is the fruit of a system that consistently allocates capital to its most productive uses.",
          prosperityChartTitle: "S&P 500 Index — 46 Years of Unbroken Long-Term Growth",
          prosperityChartSubtitle: "Each dip was temporary; each recovery was real",
          statesTitle: "American States vs. Nations",
          statesBody:
            "Perhaps the most remarkable illustration of American economic scale: individual US states outperform entire major nations. California, Texas, and New York are each global economic powerhouses in their own right.",
          stateLabel: "State",
          stateGdpLabel: "State GDP",
          globalRankLabel: "Global Rank",
          comparisonLabel: "Comparison",
          globallyLabel: "globally",
          statesSource: "Source: Bureau of Economic Analysis 2026, World Bank 2026",
          growthPullLabel:
            "years of growth out of the last 75 — a record of economic resilience no major economy can match.",
          byNumbersEyebrow: "The scale, in numbers",
          byNumbersTitle: "The Numbers Behind the Numbers",
          insightsEyebrow: "Structural advantages",
          quoteTitle: "Nobel Laureate in Economics, University of Chicago",
          backLink: "← Back to Economy Overview",
          nextLink: "Capital Markets →",
          sectorsTitle: "GDP by Sector: Services & High-Value Industry",
          sectorsBody: "The modern U.S. economy is structurally service-oriented, with Finance, Insurance, Real Estate, and Professional/Technical Services generating over a third of total economic output. However, the U.S. also maintains a powerhouse manufacturing core ($3.0T) that outproduces almost every individual country on Earth.",
          sectorsChartTitle: "GDP Value Added by Sector (2025/2026, % of GDP)",
          sectorsChartSubtitle: "A combination of high-margin services and a massive industrial core",
          sectorsSource: "U.S. Bureau of Economic Analysis (BEA) 2026",
          divergenceTitle: "The Great Divergence: U.S. vs. G7",
          divergenceBody: "Since the 2008 financial crisis, the United States has steadily outperformed its G7 peers. When indexing real GDP to 2010 (100), the U.S. has expanded by 41%, whereas the average of the other G7 nations (Germany, Japan, UK, France, Italy, Canada) grew by only 19.5%. This gap illustrates the compounding impact of America's tech leadership, venture capital, and flexible labor markets.",
          divergenceChartTitle: "Real GDP Growth Index (2010 = 100)",
          divergenceChartSubtitle: "Historical tracking of U.S. real GDP growth vs. G7 average",
          divergenceSource: "OECD Data Explorer / IMF WEO 2026",
        };

  return (
    <>
      <MacroStyles />
      <MacroHero 
        titleLead={copy.heroLead}
        titleAccent={copy.heroAccent}
        eyebrow={copy.heroEyebrow}
        description={copy.heroBody}
        imageSrc={SITE_IMAGES.economyGrowth}
        imageAlt={copy.heroAlt}
      />

      {/* Main Content */}
      <div className="bg-[#000000] relative z-10 pb-32 pt-16">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 mb-24">
          <Breadcrumb
            items={[
              { label: breadcrumbEconomy, href: "/economy" },
              { label: pageLabel },
            ]}
          />
        </div>

        <div className="mx-auto max-w-[1600px] px-6 md:px-12 space-y-48">
          {/* The long run — the growth this page is named for */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.growthTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.growthBody}
            </p>
            <div className="my-24">
              <GdpHistoryChart
                data={US_GDP_HISTORY}
                title={copy.growthChartTitle}
                subtitle={copy.growthChartSubtitle}
                source={GDP_HISTORY_META.source}
                realBase={GDP_HISTORY_META.realBase}
              />
            </div>
          </section>

          {/* GDP Comparison */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.worldTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.worldBody}
            </p>
            <div className="my-24">
              <GdpBarChart
                data={GDP_COMPARISON}
                title={copy.worldChartTitle}
                subtitle={copy.worldChartSubtitle}
                source={`${GDP_SERIES_META.source} · ${GDP_SERIES_META.year} projection`}
                valueLabel={copy.worldValueLabel}
              />
            </div>
          </section>

          {/* GDP Per Capita */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.perCapitaTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.perCapitaBody}
            </p>
            <div className="my-24">
              <GdpBarChart
                data={GDP_PER_CAPITA.map(
                  (d): GdpDataPoint => ({
                    country: d.country,
                    gdp: d.gdpPerCapita,
                    flag: d.flag,
                    highlight: d.highlight,
                  }),
                )}
                title={copy.perCapitaChartTitle}
                subtitle={copy.perCapitaChartSubtitle}
                source="IMF World Economic Outlook 2026"
                valueSuffix="K"
                valueLabel={copy.perCapitaValueLabel}
              />
            </div>
          </section>

          {/* GDP Sector Composition */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.sectorsTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.sectorsBody}
            </p>
            <div className="my-24">
              <GdpSectorsChart
                data={US_GDP_SECTORS}
                title={copy.sectorsChartTitle}
                subtitle={copy.sectorsChartSubtitle}
                source={copy.sectorsSource}
              />
            </div>
          </section>

          {/* GDP Divergence US vs G7 */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.divergenceTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.divergenceBody}
            </p>
            <div className="my-24">
              <GdpDivergenceChart
                data={US_VS_G7_DIVERGENCE}
                title={copy.divergenceChartTitle}
                subtitle={copy.divergenceChartSubtitle}
                source={copy.divergenceSource}
              />
            </div>
          </section>


          {/* State GDPs */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.statesTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.statesBody}
            </p>
            
            <div className="grid gap-8 mt-16">
              {stateRankings.map((state, i) => (
                <div key={state.state} className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-white/10 pb-8 items-center">
                  <div className="font-macro-display text-3xl text-white">{state.state}</div>
                  <div className="font-macro-display text-3xl text-[#E8B923]">{state.gdp}</div>
                  <div>
                    <span className="macro-metadata border border-white/20 px-3 py-1 text-white">
                      #{state.rank} {copy.globallyLabel}
                    </span>
                  </div>
                  <div className="font-macro-body text-white/55 italic text-right">{state.comparison}</div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-right macro-metadata text-white/30">
              {copy.statesSource}
            </p>
          </section>

          {/* Featured pull-stat — one cinematic number instead of a card wall */}
          <section className="border-t border-white/5 pt-32">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <p className="font-macro-display font-black leading-none tracking-tighter text-[clamp(72px,15vw,200px)]">
                <CountUp value={70} suffix=" / 75" />
              </p>
              <p className="macro-body mt-8 max-w-3xl">{copy.growthPullLabel}</p>
            </div>
          </section>

          {/* By the numbers — headline stat trio */}
          <section className="border-t border-white/5 pt-32">
            <span className="macro-eyebrow">{copy.byNumbersEyebrow}</span>
            <h2 className="macro-section-title mt-6 mb-16">{copy.byNumbersTitle}</h2>
            <div className="grid gap-16 border-t border-[#E8B923]/30 pt-16 sm:grid-cols-3">
              {gdpStatTrio.map((stat) => (
                <MacroStat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </section>

          {/* Two editorial insights */}
          <section className="pt-8">
            <span className="macro-eyebrow">{copy.insightsEyebrow}</span>
            <div className="mt-10 grid gap-16 md:grid-cols-2">
              {gdpInsights.map((insight) => (
                <MacroFact key={insight.fact} fact={insight.fact} detail={insight.detail} />
              ))}
            </div>
          </section>

          <div className="border-t border-white/5 pt-32 pb-16">
            <QuoteBlock
              quote={
                locale === "ro"
                  ? "Pe termen lung, libertatea economică și libertatea politică merg mână în mână. Piața liberă este singurul sistem care a scos vreodată mase mari de oameni din sărăcie."
                  : "In the long run, economic freedom and political freedom go hand in hand. The free market is the only system that has ever lifted masses of people out of poverty."
              }
              attribution="Milton Friedman"
              title={copy.quoteTitle}
              variant="dark"
            />
          </div>

          {/* Back nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-16 mt-32">
            <Link
              href="/economy"
              className="font-macro-mono text-sm uppercase tracking-widest text-white/50 transition-colors hover:text-white"
            >
              {copy.backLink}
            </Link>
            <Link
              href="/economy/capital-markets"
              className="font-macro-mono text-sm uppercase tracking-widest text-[#E8B923] transition-colors hover:text-white"
            >
              {copy.nextLink}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
