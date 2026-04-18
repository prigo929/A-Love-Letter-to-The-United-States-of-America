// ─── GDP & Scale Sub-Page ─────────────────────────────────────────────────────
// Deep-dive page for the economy section.
//
// Beginner guide:
// - Most numbers and chart data come from lib/data/economy-data.ts
// - This file mostly decides page order, headings, and which reusable
//   components are used
// - If you want to swap the hero photo, change SITE_IMAGES.economyGrowth below

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FactCard } from "@/components/sections/FactCard";
import { StatCard } from "@/components/sections/StatCard";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { GdpBarChart } from "@/components/data/GdpBarChart";
import { SP500Chart } from "@/components/data/SP500Chart";
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
  title: "GDP & Scale | Economy | America: The Greatest Nation",
  description:
    "$28.8 trillion GDP — the United States has been the world's largest economy for over 130 years. A deep dive into American economic scale, resilience, and dominance.",
  alternates: { canonical: "/economy/gdp-growth" },
};

const GDP_EXTENDED_FACTS = [
  // This page has a few extra facts stored locally because they are specific to
  // this subpage and not reused elsewhere.
  {
    id: "gdp-streak",
    fact: "The US has held the #1 GDP rank for 130+ consecutive years",
    detail:
      "Through the Great Depression, two World Wars, the Cold War, the 2008 financial crisis, and a global pandemic — the US economy has never relinquished its crown.",
    source: "IMF Historical Data",
    color: "gold" as const,
  },
  {
    id: "gdp-california",
    fact: "California alone would be the 5th largest economy on Earth",
    detail:
      "At approximately $3.9 trillion in state GDP, California outperforms the United Kingdom, France, and India. A single American state.",
    source: "Bureau of Economic Analysis 2024",
    color: "red" as const,
  },
  {
    id: "gdp-texas",
    fact: "Texas GDP exceeds all of Russia's",
    detail:
      "The state of Texas, with a GDP of approximately $2.4 trillion, produces more economic output annually than the entire Russian Federation.",
    source: "BEA & World Bank 2024",
    color: "blue" as const,
  },
  {
    id: "gdp-growth-resilience",
    fact: "US GDP has grown in 70 of the last 75 years",
    detail:
      "Since 1950, the American economy has experienced growth in 70 out of 75 calendar years — a record of economic resilience unmatched by any major economy.",
    source: "Bureau of Economic Analysis",
    color: "gold" as const,
  },
  {
    id: "gdp-consumer",
    fact: "US consumer spending (~$19T) exceeds China's entire GDP",
    detail:
      "American household consumption — driven by high incomes, easy credit access, and a culture of spending — is a $19 trillion engine that pulls the global economy.",
    source: "BEA 2024",
    color: "red" as const,
  },
  {
    id: "gdp-r-and-d",
    fact: "The US spends more on R&D than any nation — $800B+ annually",
    detail:
      "American businesses, universities, and government agencies invest over $800 billion per year in research and development — the fuel for the next generation of economic leadership.",
    source: "NSF National Center for Science & Engineering Statistics 2024",
    color: "blue" as const,
  },
];

const STATE_GDP_RANKINGS = [
  {
    state: "California",
    gdp: "$3.9T",
    rank: 5,
    comparison: "Larger than the UK",
  },
  { state: "Texas", gdp: "$2.4T", rank: 10, comparison: "Larger than Russia" },
  {
    state: "New York",
    gdp: "$2.1T",
    rank: 11,
    comparison: "Larger than South Korea",
  },
  {
    state: "Florida",
    gdp: "$1.4T",
    rank: 16,
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
  const locale = await getServerLocale();
  const breadcrumbEconomy = locale === "ro" ? "Economie" : "Economy";
  const pageLabel = locale === "ro" ? "PIB și Dimensiune" : "GDP & Scale";
  const extendedFacts =
    locale === "ro"
      ? [
          {
            ...GDP_EXTENDED_FACTS[0],
            fact: "SUA ocupă locul #1 la PIB de peste 130 de ani consecutivi",
            detail:
              "Prin Marea Criză Economică, două războaie mondiale, Războiul Rece, criza financiară din 2008 și o pandemie globală — economia SUA nu și-a cedat niciodată coroana.",
          },
          {
            ...GDP_EXTENDED_FACTS[1],
            fact: "Doar California ar fi a 5-a economie ca mărime de pe Pământ",
            detail:
              "Cu aproximativ 3,9 trilioane de dolari PIB la nivel de stat, California depășește Regatul Unit, Franța și India. Un singur stat american.",
          },
          {
            ...GDP_EXTENDED_FACTS[2],
            fact: "PIB-ul Texasului îl depășește pe cel al întregii Rusii",
            detail:
              "Statul Texas, cu un PIB de aproximativ 2,4 trilioane de dolari, produce anual mai multă activitate economică decât întreaga Federație Rusă.",
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
  const copy =
    locale === "ro"
      ? {
          heroAlt: "Districtul financiar din New York",
          heroEyebrow: "PIB și Dimensiune",
          heroLead: "$28.8 TRILIOANE",
          heroAccent: "ȘI ÎN CREȘTERE",
          heroBody:
            "O domnie de 130 de ani în vârf. Prin fiecare criză, fiecare rival și fiecare predicție a declinului american — economia Statelor Unite nu doar că a rezistat. A dominat.",
          worldTitle: "Statele Unite vs. lumea",
          worldBody:
            "Economia SUA nu este doar cea mai mare — operează într-o categorie complet diferită. La 28,8 trilioane de dolari, depășește PIB-urile cumulate ale Chinei (18,5T), Germaniei (4,5T) și Japoniei (4,2T). Asta înseamnă că următoarele trei mari economii, adunate, tot nu pot egala producția unei singure națiuni de 335 de milioane de oameni.",
          worldChartTitle: "PIB pe țări (2024, trilioane USD)",
          worldChartSubtitle:
            "Economia SUA depășește următoarele trei mari economii combinate",
          perCapitaTitle: "Per capita: oameni bogați, țară bogată",
          perCapitaBody:
            "Ceea ce face performanța SUA cu adevărat extraordinară este că dominația economică americană nu este doar o funcție a populației. Americanul mediu generează 82.700 USD în producție economică anuală — mai mult decât Germania (54.300), Franța (45.000), Japonia (33.800) și incomparabil mai mult decât China (13.100). SUA sunt simultan cea mai mare și una dintre cele mai productive economii de pe Pământ.",
          perCapitaChartTitle: "PIB pe cap de locuitor după țară (2024, mii USD)",
          perCapitaChartSubtitle:
            "La 82.700 USD per persoană, americanul mediu produce mai mult decât orice altă mare națiune",
          perCapitaValueLabel: "PIB pe cap de locuitor (2024, mii USD)",
          prosperityTitle: "Arcul lung al prosperității americane",
          prosperityBody:
            "S&P 500 este cel mai urmărit indice bursier din lume — o fișă de evaluare în timp real a vitalității economice americane. Din 1980, a oferit un randament mediu anual de aproximativ 10,5%, transformând 1.000 USD în peste 40.000 USD. Fiecare prăbușire — dot-com, criza financiară, COVID — a fost urmată de o revenire la noi maxime. Nu este noroc; este rodul unui sistem care alocă în mod constant capitalul către utilizările sale cele mai productive.",
          prosperityChartTitle: "Indicele S&P 500 — 45 de ani de creștere neîntreruptă pe termen lung",
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
          statesSource: "Sursă: Bureau of Economic Analysis 2024, World Bank 2024",
          numbersTitle: "Cifrele din spatele cifrelor",
          quoteTitle: "Laureat Nobel pentru Economie, University of Chicago",
          backLink: "← Înapoi la prezentarea economiei",
          nextLink: "Piețe de Capital →",
        }
      : {
          heroAlt: "New York City financial district",
          heroEyebrow: "GDP & Scale",
          heroLead: "$28.8 TRILLION",
          heroAccent: "AND COUNTING",
          heroBody:
            "A 130-year reign at the top. Through every crisis, every challenger, every prediction of American decline — the United States economy has not just endured. It has dominated.",
          worldTitle: "The United States vs. The World",
          worldBody:
            "The US economy is not just the largest — it operates in a different category entirely. At $28.8 trillion, it exceeds the combined GDPs of China ($18.5T), Germany ($4.5T), and Japan ($4.2T). That means the three next-largest economies, added together, still cannot match the output of a single nation of 335 million people.",
          worldChartTitle: "GDP by Country (2024, USD Trillions)",
          worldChartSubtitle:
            "The US economy exceeds the next three largest economies combined",
          perCapitaTitle: "Per Capita: Rich People, Rich Country",
          perCapitaBody:
            "What makes the US achievement truly extraordinary is that its economic dominance is not simply a function of population size. The average American generates $82,700 in economic output per year — more than Germany ($54,300), France ($45,000), Japan ($33,800), and vastly more than China ($13,100). The US is simultaneously the largest AND one of the most productive economies on Earth.",
          perCapitaChartTitle: "GDP Per Capita by Country (2024, USD Thousands)",
          perCapitaChartSubtitle:
            "At $82,700 per person, the average American produces more than any major nation",
          perCapitaValueLabel: "GDP per capita (2024, USD Thousands)",
          prosperityTitle: "The Long Arc of American Prosperity",
          prosperityBody:
            "The S&P 500 is the world's most closely watched equity index — a real-time report card on American economic vitality. Since 1980, it has delivered an average annual return of approximately 10.5%, compounding $1,000 into over $40,000. Every crash — dot-com, financial crisis, COVID — was followed by recovery to new highs. This is not luck; it is the fruit of a system that consistently allocates capital to its most productive uses.",
          prosperityChartTitle: "S&P 500 Index — 45 Years of Unbroken Long-Term Growth",
          prosperityChartSubtitle: "Each dip was temporary; each recovery was real",
          statesTitle: "American States vs. Nations",
          statesBody:
            "Perhaps the most remarkable illustration of American economic scale: individual US states outperform entire major nations. California, Texas, and New York are each global economic powerhouses in their own right.",
          stateLabel: "State",
          stateGdpLabel: "State GDP",
          globalRankLabel: "Global Rank",
          comparisonLabel: "Comparison",
          globallyLabel: "globally",
          statesSource: "Source: Bureau of Economic Analysis 2024, World Bank 2024",
          numbersTitle: "The Numbers Behind the Numbers",
          quoteTitle: "Nobel Laureate in Economics, University of Chicago",
          backLink: "← Back to Economy Overview",
          nextLink: "Capital Markets →",
        };

  return (
    <>
      {/* Hero
          A full-width intro block with background image + headline + summary. */}
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image
          src={SITE_IMAGES.economyGrowth}
          alt={copy.heroAlt}
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
              { label: breadcrumbEconomy, href: "/economy" },
              { label: pageLabel },
            ]}
            className="mb-8"
          />
          <p className="mb-4 section-eyebrow">{copy.heroEyebrow}</p>
          <h1 className="mb-4 font-hero text-6xl text-white sm:text-7xl">
            <span className="text-glory-gold">{copy.heroLead}</span>
            <br />
            {copy.heroAccent}
          </h1>
          <p className="max-w-2xl font-body text-lg text-white/65 leading-relaxed">
            {copy.heroBody}
          </p>
        </div>
      </div>

      {/* Content
          The rest of the page is broken into stacked sections so it reads like
          a long-form article instead of one giant block. */}
      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
          {/* GDP Comparison
              Reusable chart component fed by shared data from economy-data.ts */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.worldTitle}
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {copy.worldBody}
            </p>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <GdpBarChart
                data={GDP_COMPARISON}
                title={copy.worldChartTitle}
                subtitle={copy.worldChartSubtitle}
                source="World Bank 2024"
              />
            </div>
          </section>

          {/* GDP Per Capita
              The numbers are stored in thousands, so 82.7 means $82,700. */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.perCapitaTitle}
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {copy.perCapitaBody}
            </p>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
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
                source="IMF World Economic Outlook 2024"
                valueSuffix="K"
                valueLabel={copy.perCapitaValueLabel}
              />
            </div>
          </section>

          {/* S&P 500 */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.prosperityTitle}
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {copy.prosperityBody}
            </p>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <SP500Chart
                data={SP500_HISTORY}
                title={copy.prosperityChartTitle}
                subtitle={copy.prosperityChartSubtitle}
                source="S&P Global 2024"
              />
            </div>
          </section>

          {/* State GDPs
              This one uses a plain HTML table instead of a chart because the
              comparison is short and easier to scan in rows. */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.statesTitle}
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {copy.statesBody}
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-mid">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                      {copy.stateLabel}
                    </th>
                    <th className="px-6 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                      {copy.stateGdpLabel}
                    </th>
                    <th className="px-6 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                      {copy.globalRankLabel}
                    </th>
                    <th className="px-6 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                      {copy.comparisonLabel}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stateRankings.map((state, i) => (
                    <tr
                      key={state.state}
                      className={`border-b border-white/5 transition-colors hover:bg-white/3 ${i % 2 === 0 ? "" : "bg-white/2"}`}
                    >
                      <td className="px-6 py-4 font-body text-sm font-semibold text-white">
                        {state.state}
                      </td>
                      <td className="px-6 py-4 font-hero text-xl text-glory-gold">
                        {state.gdp}
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-glory-blue/30 px-2.5 py-1 font-body text-sm text-white/70">
                          #{state.rank} {copy.globallyLabel}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-body text-sm text-white/55 italic">
                        {state.comparison}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="px-6 py-3 text-right font-body text-xs text-white/30">
                {copy.statesSource}
              </p>
            </div>
          </section>

          {/* Extended Facts Grid */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.numbersTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {extendedFacts.map((fact) => (
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
            quote={
              locale === "ro"
                ? "Pe termen lung, libertatea economică și libertatea politică merg mână în mână. Piața liberă este singurul sistem care a scos vreodată mase mari de oameni din sărăcie."
                : "In the long run, economic freedom and political freedom go hand in hand. The free market is the only system that has ever lifted masses of people out of poverty."
            }
            attribution="Milton Friedman"
            title={copy.quoteTitle}
            variant="dark"
          />

          {/* Back nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link
              href="/economy"
              className="font-body text-sm text-white/50 transition-colors hover:text-white"
            >
              {copy.backLink}
            </Link>
            <Link
              href="/economy/capital-markets"
              className="font-body text-sm font-semibold text-glory-gold transition-colors hover:text-glory-gold-dark"
            >
              {copy.nextLink}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
