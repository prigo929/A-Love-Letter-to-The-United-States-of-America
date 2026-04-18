// ─── GDP & Scale Sub-Page ─────────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FactCard } from "@/components/sections/FactCard";
import { StatCard } from "@/components/sections/StatCard";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { GdpBarChart } from "@/components/data/GdpBarChart";
import { SP500Chart } from "@/components/data/SP500Chart";
import {
  GDP_COMPARISON,
  GDP_PER_CAPITA,
  SP500_HISTORY,
  GDP_FACTS,
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

export default function GdpGrowthPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image
          src={SITE_IMAGES.economyGrowth}
          alt="New York City financial district"
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
              { label: "Economy", href: "/economy" },
              { label: "GDP & Scale" },
            ]}
            className="mb-8"
          />
          <p className="mb-4 section-eyebrow">GDP & Scale</p>
          <h1 className="mb-4 font-hero text-6xl text-white sm:text-7xl">
            <span className="text-glory-gold">$28.8 TRILLION</span>
            <br />
            AND COUNTING
          </h1>
          <p className="max-w-2xl font-body text-lg text-white/65 leading-relaxed">
            A 130-year reign at the top. Through every crisis, every challenger,
            every prediction of American decline — the United States economy has
            not just endured. It has dominated.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
          {/* GDP Comparison */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              The United States vs. The World
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              The US economy is not just the largest — it operates in a
              different category entirely. At $28.8 trillion, it exceeds the
              combined GDPs of China ($18.5T), Germany ($4.5T), and Japan
              ($4.2T). That means the three next-largest economies, added
              together, still cannot match the output of a single nation of 335
              million people.
            </p>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <GdpBarChart
                data={GDP_COMPARISON}
                title="GDP by Country (2024, USD Trillions)"
                subtitle="The US economy exceeds the next three largest economies combined"
                source="World Bank 2024"
              />
            </div>
          </section>

          {/* GDP Per Capita */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              Per Capita: Rich People, Rich Country
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              What makes the US achievement truly extraordinary is that its
              economic dominance is not simply a function of population size.
              The average American generates $82,700 in economic output per year
              — more than Germany ($54,300), France ($45,000), Japan ($33,800),
              and vastly more than China ($13,100). The US is simultaneously the
              largest AND one of the most productive economies on Earth.
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
                title="GDP Per Capita by Country (2024, USD Thousands)"
                subtitle="At $82,700 per person, the average American produces more than any major nation"
                source="IMF World Economic Outlook 2024"
              />
            </div>
          </section>

          {/* S&P 500 */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              The Long Arc of American Prosperity
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              The S&P 500 is the world&apos;s most closely watched equity index
              — a real-time report card on American economic vitality. Since
              1980, it has delivered an average annual return of approximately
              10.5%, compounding $1,000 into over $40,000. Every crash —
              dot-com, financial crisis, COVID — was followed by recovery to new
              highs. This is not luck; it is the fruit of a system that
              consistently allocates capital to its most productive uses.
            </p>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <SP500Chart
                data={SP500_HISTORY}
                title="S&P 500 Index — 45 Years of Unbroken Long-Term Growth"
                subtitle="Each dip was temporary; each recovery was real"
                source="S&P Global 2024"
              />
            </div>
          </section>

          {/* State GDPs */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              American States vs. Nations
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              Perhaps the most remarkable illustration of American economic
              scale: individual US states outperform entire major nations.
              California, Texas, and New York are each global economic
              powerhouses in their own right.
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-mid">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                      State
                    </th>
                    <th className="px-6 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                      State GDP
                    </th>
                    <th className="px-6 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                      Global Rank
                    </th>
                    <th className="px-6 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                      Comparison
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {STATE_GDP_RANKINGS.map((state, i) => (
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
                          #{state.rank} globally
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
                Source: Bureau of Economic Analysis 2024, World Bank 2024
              </p>
            </div>
          </section>

          {/* Extended Facts Grid */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              The Numbers Behind the Numbers
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {GDP_EXTENDED_FACTS.map((fact) => (
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
            quote="In the long run, economic freedom and political freedom go hand in hand. The free market is the only system that has ever lifted masses of people out of poverty."
            attribution="Milton Friedman"
            title="Nobel Laureate in Economics, University of Chicago"
          />

          {/* Back nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link
              href="/economy"
              className="font-body text-sm text-white/50 transition-colors hover:text-white"
            >
              ← Back to Economy Overview
            </Link>
            <Link
              href="/economy/capital-markets"
              className="font-body text-sm font-semibold text-glory-gold transition-colors hover:text-glory-gold-dark"
            >
              Capital Markets →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
