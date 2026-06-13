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
import { GdpBarChart } from "@/components/data/GdpBarChart";
import { SP500Chart } from "@/components/data/SP500Chart";
import { MacroStyles, MacroHero, MacroStat, MacroFact, InfrastructureBand } from "@/components/economy/EconomyAnimations";
import { getServerLocale } from "@/lib/i18n/server";
import {
  GDP_COMPARISON,
  GDP_PER_CAPITA,
  SP500_HISTORY,
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

const GDP_EXTENDED_FACTS = [
  // This page has a few extra facts stored locally because they are specific to
  // this subpage and not reused elsewhere.
  {
    id: "gdp-services",
    fact: "80% of US GDP is driven by the services sector",
    detail:
      "Finance, healthcare, education, and technology — America has successfully transitioned to a high-value service economy that is the envy of the industrialized world.",
    source: "CIAA 2026",
    color: "gold" as const,
  },
  {
    id: "gdp-energy",
    fact: "The US is the world's largest producer of oil and natural gas",
    detail:
      "America produces more energy than any nation on Earth, providing a massive structural advantage in industrial costs and national security.",
    source: "EIA 2026",
    color: "red" as const,
  },
  {
    id: "gdp-texas",
    fact: "Texas GDP exceeds all of Brazil or Russia",
    detail:
      "The state of Texas, with a GDP of approximately $2.9 trillion, produces more economic output annually than the entire nation of Brazil or the Russian Federation.",
    source: "BEA & World Bank 2026",
    color: "blue" as const,
  },
  {
    id: "gdp-growth-resilience",
    fact: "US GDP has grown in 70 of the last 75 years",
    detail:
      "Since 1950, the American economy has experienced growth in 70 out of 75 calendar years — a record of economic resilience unmatched by any major economy.",
    source: "Bureau of Economic Analysis 2026",
    color: "gold" as const,
  },
  {
    id: "gdp-consumer",
    fact: "US consumer spending (~$21T) exceeds China's entire GDP",
    detail:
      "American household consumption — driven by high incomes, easy credit access, and a culture of innovation — is a $21 trillion engine that pulls the global economy.",
    source: "BEA 2026",
    color: "red" as const,
  },
  {
    id: "gdp-r-and-d",
    fact: "The US spends more on R&D than any nation — $900B+ annually",
    detail:
      "American businesses, universities, and government agencies invest over $900 billion per year in research and development — the fuel for the next generation of economic leadership.",
    source: "NSF 2026",
    color: "blue" as const,
  },
  {
    id: "gdp-productivity",
    fact: "Worker Productivity: Output Per Hour",
    detail: "Measured by GDP per hour worked, the United States consistently ranks in the top tier of OECD nations, outperforming Germany, the United Kingdom, and Japan by a meaningful margin. High productivity is why American wages are high.",
    source: "OECD 2026",
    color: "gold" as const,
  },
];

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
  // These local arrays let the page translate or swap a few facts without
  // editing the shared source data used elsewhere in the economy section.
  const extendedFacts =
    locale === "ro"
      ? [
          {
            ...GDP_EXTENDED_FACTS[0],
            fact: "80% din PIB-ul SUA este generat de sectorul serviciilor",
            detail:
              "Finanțele, sănătatea, educația și tehnologia — America a trecut cu succes la o economie de servicii cu valoare adăugată mare, invidiată de lumea industrializată.",
          },
          {
            ...GDP_EXTENDED_FACTS[1],
            fact: "SUA sunt cel mai mare producător de petrol și gaze naturale din lume",
            detail:
              "America produce mai multă energie decât orice altă națiune de pe Pământ, oferind un avantaj structural masiv în costurile industriale și securitatea națională.",
          },
          {
            ...GDP_EXTENDED_FACTS[2],
            fact: "PIB-ul Texasului depășește economia Braziliei sau a Rusiei",
            detail:
              "Statul Texas, cu un PIB de aproximativ 2,9 trilioane de dolari, produce anual mai multă activitate economică decât Brazilia sau întreaga Federație Rusă.",
          },
          {
            ...GDP_EXTENDED_FACTS[3],
            fact: "PIB-ul SUA a crescut în 70 din ultimii 75 de ani",
            detail:
              "Din 1950 încoace, economia americană a înregistrat creștere în 70 din 75 de ani calendaristici — un record de reziliență economică neegalat de vreo mare economie.",
          },
          {
            ...GDP_EXTENDED_FACTS[4],
            fact: "Cheltuielile consumatorilor americani (~19T $) depășesc întregul PIB al Chinei",
            detail:
              "Consumul gospodăriilor americane — susținut de venituri ridicate, acces facil la credit și o cultură a cheltuirii — este un motor de 19 trilioane de dolari care trage după el economia globală.",
          },
          {
            ...GDP_EXTENDED_FACTS[5],
            fact: "SUA cheltuiesc mai mult pe cercetare și dezvoltare decât orice altă națiune — peste 800 mld. $ anual",
            detail:
              "Companiile, universitățile și instituțiile publice americane investesc peste 800 de miliarde de dolari pe an în cercetare și dezvoltare — combustibilul pentru următoarea generație de leadership economic.",
          },
          {
            ...GDP_EXTENDED_FACTS[6],
            fact: "Productivitatea Muncii: Producția pe Oră",
            detail:
              "Măsurată prin PIB pe oră lucrată, SUA se află în mod constant în vârful OCDE, depășind Germania, Marea Britanie și Japonia. Această productivitate mare explică salariile mari ale americanilor și succesul global al companiilor lor.",
            source: "OECD 2026",
          },
        ]
      : GDP_EXTENDED_FACTS;
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
          perCapitaValueLabel: "PIB pe cap de locuitor (2026, mii USD)",
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
          numbersTitle: "Cifrele din spatele cifrelor",
          quoteTitle: "Laureat Nobel pentru Economie, University of Chicago",
          backLink: "← Înapoi la prezentarea economiei",
          nextLink: "Piețe de Capital →",
        }
      : {
          heroAlt: "New York City financial district",
          heroEyebrow: "GDP & Scale",
          heroLead: "$32.4 TRILLION",
          heroAccent: "AND COUNTING",
          heroBody:
            "A 130-year reign at the top. Through every crisis, every challenger, every prediction of American decline — the United States economy has not just endured. It has dominated.",
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
          perCapitaValueLabel: "GDP per capita (2026, USD Thousands)",
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
          numbersTitle: "The Numbers Behind the Numbers",
          quoteTitle: "Nobel Laureate in Economics, University of Chicago",
          backLink: "← Back to Economy Overview",
          nextLink: "Capital Markets →",
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
                source="World Bank 2026"
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

          {/* S&P 500 */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.prosperityTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.prosperityBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <SP500Chart
                data={SP500_HISTORY}
                title={copy.prosperityChartTitle}
                subtitle={copy.prosperityChartSubtitle}
                source="S&P Global 2026"
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

          {/* Extended Facts Grid */}
          <section className="border-t border-white/5 pt-32">
            <h2 className="macro-section-title text-[clamp(24px,4vw,60px)] mb-16">
              {copy.numbersTitle}
            </h2>
            <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
              {extendedFacts.map((fact: any, i: number) => (
                <MacroFact
                  key={fact.id}
                  index={i + 1}
                  fact={fact.fact}
                  detail={fact.detail}
                />
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
