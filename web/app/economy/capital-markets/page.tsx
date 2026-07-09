// ─── Capital Markets Sub-Page ─────────────────────────────────────────────────
// A vertical deep-dive into the NYSE, NASDAQ, and the US bond market.
//
// Pedagogical Goal:
// - To show how the US financial system acts as the "Capital Pump" for global 
//   innovation.
// - To explain the "Risk-Free Rate" benchmark of US Treasuries.
//
// Beginner guide:
// - Shared chart data comes from lib/data/economy-data.ts

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { SP500Chart } from "@/components/data/SP500Chart";
import { MarketCapChart } from "@/components/data/DollarMarketCharts";
import { MacroStyles, MacroHero, MacroStat, MacroFact, InfrastructureBand, CountUp } from "@/components/economy/EconomyAnimations";
import { getServerLocale } from "@/lib/i18n/server";
import {
  SP500_HISTORY,
  MARKET_CAP_BY_EXCHANGE,
} from "@/lib/data/economy-data";
import { SITE_IMAGES } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Capital Markets | Economy",
  description:
    "NYSE + NASDAQ: $69 trillion in market cap. US Treasuries set the world's risk-free rate. The deepest, most liquid capital markets in human history.",
  alternates: { canonical: "/economy/capital-markets" },
};

const MAJOR_US_EXCHANGES = [
  // Simple content array used to generate the three exchange cards below.
  {
    name: "NYSE",
    founded: 1792,
    marketCap: "$33.2 Trillion",
    description:
      "The world's largest stock exchange by market cap — home to the world's most iconic corporations, from JPMorgan Chase to Berkshire Hathaway.",
    famous: "JPMorgan Chase, Berkshire Hathaway, ExxonMobil, J&J, Visa",
  },
  {
    name: "NASDAQ",
    founded: 1971,
    marketCap: "$35.8 Trillion",
    description:
      "The technology exchange — where Apple, Microsoft, NVIDIA, Alphabet, Amazon, and Meta are listed. NASDAQ is synonymous with American technological dominance.",
    famous: "Apple, Microsoft, NVIDIA, Alphabet, Amazon, Meta, Tesla",
  },
  {
    name: "CME Group",
    founded: 1848,
    marketCap: "Derivatives Exchange",
    description:
      "The world's leading derivatives exchange — setting global prices for everything from corn futures to interest rate swaps and foreign currency options.",
    famous:
      "Oil futures, agricultural futures, interest rate swaps, FX options",
  },
];

export default async function CapitalMarketsPage() {
  // Read the locale first, then derive all translated labels and page-specific
  // fact arrays from that one value.
  const locale = await getServerLocale();
  const breadcrumbEconomy = locale === "ro" ? "Economie" : "Economy";
  const pageLabel = locale === "ro" ? "Piețe de Capital" : "Capital Markets";
  // Terminal "advantage" section: three headline stats plus two editorial
  // insights, replacing the old wall of fourteen identical fact cards.
  const cmStatTrio =
    locale === "ro"
      ? [
          { value: "$40T+", label: "capitalizarea combinată a NYSE și NASDAQ" },
          { value: "$27T", label: "piața de obligațiuni a SUA — cea mai adâncă și lichidă din istorie" },
          { value: "$12T", label: "administrați de private equity-ul american (Blackstone, Apollo, KKR)" },
        ]
      : [
          { value: "$40T+", label: "combined market cap of the NYSE and NASDAQ" },
          { value: "$27T", label: "the US bond market — the deepest, most liquid in history" },
          { value: "$12T", label: "managed by American private equity (Blackstone, Apollo, KKR)" },
        ];
  const cmInsights =
    locale === "ro"
      ? [
          {
            fact: "Titlurile de Trezorerie ale SUA sunt reperul global fără risc",
            detail:
              "Fiecare model financiar de pe Pământ pornește de la randamentele Trezoreriei americane ca bază pentru randamentul fără risc — nicio altă piață nu are aceeași adâncime și încredere.",
          },
          {
            fact: "Revoluția 401(k) a transformat muncitorii în investitori",
            detail:
              "Activele de pensionare din SUA au atins 45,8 trilioane $. Un sistem apărut dintr-o lacună fiscală din 1978 a transformat americanii obișnuiți în investitori pe termen lung pe cea mai performantă piață din lume.",
          },
        ]
      : [
          {
            fact: "US Treasuries are the world's risk-free benchmark",
            detail:
              "Every financial model on Earth prices off US Treasury yields as the baseline for risk-free returns — no other market matches their depth and trust.",
          },
          {
            fact: "The 401(k) revolution turned workers into investors",
            detail:
              "US retirement assets have reached $45.8 trillion. A system born from a 1978 tax quirk turned ordinary Americans into long-term investors in the best-performing market on Earth.",
          },
        ];
  // These cards are simple data objects so the JSX can render them with a
  // small `.map()` instead of repeating the same markup three times.
  const exchanges =
    locale === "ro"
      ? [
          {
            ...MAJOR_US_EXCHANGES[0],
            description:
              "Cea mai mare bursă din lume după capitalizare — casa celor mai iconice corporații ale lumii, de la JPMorgan Chase la Berkshire Hathaway.",
          },
          {
            ...MAJOR_US_EXCHANGES[1],
            description:
              "Bursa tehnologiei — locul unde sunt listate Apple, Microsoft, NVIDIA, Alphabet, Amazon și Meta. NASDAQ este sinonimă cu dominația tehnologică americană.",
          },
          {
            ...MAJOR_US_EXCHANGES[2],
            description:
              "Cea mai importantă bursă de derivate din lume — stabilește prețuri globale pentru orice, de la futures pe porumb la swap-uri de dobândă și opțiuni valutare.",
          },
        ]
      : MAJOR_US_EXCHANGES;
  const copy =
    locale === "ro"
      ? {
          heroAlt: "Ecrane de tranzacționare bursieră",
          heroEyebrow: "Piețe de Capital",
          heroLead: "WALL STREET",
          heroAccent: "SUSȚINE LUMEA",
          heroBody:
            "NYSE + NASDAQ: 69 de trilioane de dolari capitalizare combinată. Titlurile de Trezorerie americane ca reper global pentru rata fără risc. Cele mai adânci, transparente și lichide piețe de capital din istoria umană.",
          marketCapTitle: "Capitalizarea burselor — SUA vs. lume",
          marketCapBody:
            "Statele Unite găzduiesc cele mai mari două burse de pe Pământ — la o distanță uriașă. NYSE (33,2T $) și NASDAQ (35,8T $) reprezintă împreună mai multă capitalizare decât următoarele cinci burse combinate. Bursele americane nu doar conduc — domină.",
          marketCapChartTitle: "Capitalizarea burselor globale (2026, trilioane USD)",
          benchmarkTitle: "S&P 500 — reperul lumii",
          benchmarkBody:
            "Niciun indice nu este urmărit mai atent. Niciun indice nu este replicat mai larg. S&P 500 urmărește cele mai mari 500 de companii americane listate public — iar performanța lui este, de facto, fișa de evaluare a prosperității capitaliste globale. Din 1980, a generat randamente totale de peste 9.000%.",
          benchmarkChartTitle:
            "S&P 500 — 46 de ani de performanță a piețelor americane de capital",
          exchangesTitle: "Marile burse ale Americii",
          estLabel: "Înființată",
          advantagePullLabel:
            "din valoarea acțiunilor publice de pe Pământ se tranzacționează pe piețele americane — dintr-o țară cu doar 4% din populația lumii.",
          advantageEyebrow: "Adâncimea, în cifre",
          advantageTitle: "Avantajul piețelor de capital",
          insightsEyebrow: "De ce contează",
          quoteTitle: "Președinte și CEO, Berkshire Hathaway — Omaha, Nebraska",
          prevLink: "← PIB și Dimensiune",
          nextLink: "Startup-uri și VC →",
        }
      : {
          heroAlt: "Stock market trading screens",
          heroEyebrow: "Capital Markets",
          heroLead: "WALL STREET",
          heroAccent: "POWERS THE WORLD",
          heroBody:
            "NYSE + NASDAQ: $69 trillion in combined market capitalization. The US Treasury as the world's risk-free benchmark. The deepest, most transparent, most liquid capital markets in human history.",
          marketCapTitle: "Stock Exchange Market Cap — US vs World",
          marketCapBody:
            "The United States hosts the two largest stock exchanges on Earth — by a staggering margin. The NYSE ($33.2T) and NASDAQ ($35.8T) together represent more market capitalization than the next five exchanges combined. American exchanges don't just lead — they dominate.",
          marketCapChartTitle: "Global Stock Exchange Market Cap (2026, USD Trillions)",
          benchmarkTitle: "The S&P 500 — The World's Benchmark",
          benchmarkBody:
            "No index is watched more closely. No index is replicated more widely. The S&P 500 tracks the 500 largest publicly traded US companies — and its performance is the world's de facto report card on capitalist prosperity. Since 1980, it has delivered total returns exceeding 9,000%.",
          benchmarkChartTitle:
            "S&P 500 — 46 Years of American Capital Market Performance",
          exchangesTitle: "America's Major Exchanges",
          estLabel: "Est.",
          advantagePullLabel:
            "of all the public equity value on Earth trades on US markets — from a country with just 4% of the world's population.",
          advantageEyebrow: "The depth, in numbers",
          advantageTitle: "The Capital Markets Advantage",
          insightsEyebrow: "Why it matters",
          quoteTitle: "Chairman & CEO, Berkshire Hathaway — Omaha, Nebraska",
          prevLink: "← GDP & Scale",
          nextLink: "Startups & VC →",
        };

  return (
    <>
      <MacroStyles />
      <MacroHero 
        titleLead={copy.heroLead}
        titleAccent={copy.heroAccent}
        eyebrow={copy.heroEyebrow}
        description={copy.heroBody}
        imageSrc={SITE_IMAGES.economyNYSEUpsideDown}
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
          {/* Market cap comparison */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.marketCapTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.marketCapBody}
            </p>
            <div className="my-24">
              <MarketCapChart
                data={MARKET_CAP_BY_EXCHANGE}
                title={copy.marketCapChartTitle}
                source="World Federation of Exchanges 2026"
              />
            </div>
          </section>

          {/* S&P 500 */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.benchmarkTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.benchmarkBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <SP500Chart
                data={SP500_HISTORY}
                title={copy.benchmarkChartTitle}
                source="S&P Global / Yahoo Finance"
              />
            </div>
          </section>

          {/* Major exchanges */}
          <section>
            <h2 className="macro-section-title mb-16">
              {copy.exchangesTitle}
            </h2>
            <div className="grid gap-16 md:grid-cols-3">
              {exchanges.map((exchange) => (
                <div key={exchange.name} className="flex flex-col border-t border-[#E8B923]/30 pt-8 hover:border-[#E8B923]/60 transition-colors duration-300">
                  <div className="mb-8">
                    <h3 className="font-macro-display text-5xl text-white mb-2">
                      {exchange.name}
                    </h3>
                    <span className="macro-metadata text-[#E8B923]">
                      {copy.estLabel} {exchange.founded}
                    </span>
                  </div>
                  <p className="font-macro-display text-4xl text-[#E8B923] mb-6">
                    {exchange.marketCap.startsWith("$") ? (
                      <>$<CountUp value={parseFloat(exchange.marketCap.replace(/[$T\s]/g, ""))} suffix="T" decimals={1} /></>
                    ) : exchange.marketCap}
                  </p>
                  <p className="font-macro-body text-white/60 mb-8 leading-relaxed">
                    {exchange.description}
                  </p>
                  <p className="macro-metadata text-white/30 border-t border-white/10 pt-4 mt-auto">
                    {exchange.famous}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Democratization of Capital Section */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-12 font-semibold">
              {locale === "ro" ? "DEMOCRATIZAREA CAPITALULUI" : "THE DEMOCRATIZATION OF CAPITAL"}
            </p>
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <span className="macro-eyebrow">
                  {locale === "ro" ? "REVOLUȚIA DE ECONOMISIRE" : "THE RETIREMENT REVOLUTION"}
                </span>
                <h3 className="font-macro-display text-3xl font-bold text-white leading-tight">
                  {locale === "ro" ? "Sistemul 401(k) și Conturile IRA" : "The 401(k) & Individual Retirement Assets"}
                </h3>
                <p className="font-macro-body text-lg text-white/70 leading-relaxed">
                  {locale === "ro"
                    ? "În loc să se bazeze pe pensii de stat rigide, clasa de mijloc din SUA folosește planurile 401(k) și conturile IRA, acumulând active de pensionare de peste 45 de trilioane de dolari. Acest sistem, apărut dintr-o lacună fiscală în 1978, a transformat zeci de milioane de lucrători în acționari pe termen lung ai economiei americane."
                    : "Rather than relying on rigid, state-managed pension schemes, ordinary American workers leverage tax-advantaged 401(k) and IRA accounts to compound wealth. Total retirement assets exceed $45 trillion. Formally established in 1978, this system effectively turned everyday citizens into long-term equity owners of the S&P 500."}
                </p>
                <p className="font-macro-body text-lg text-white/70 leading-relaxed">
                  {locale === "ro"
                    ? "Această acumulare masivă de active de retail oferă o lichiditate profundă și stabilă pentru piețele de capital, oferind companiilor americane un cost extrem de redus al capitalului pentru a finanța expansiunea și R&D-ul."
                    : "This massive aggregation of retail capital provides deep, stable liquidity to US financial markets, ensuring American companies have access to the cheapest funding on Earth for R&D and global expansion."}
                </p>
              </div>
              <div className="space-y-6">
                <span className="macro-eyebrow">
                  {locale === "ro" ? "ELIMINAREA COMISIOANELOR ACTIVE" : "THE INDEX FUND REVOLUTION"}
                </span>
                <h3 className="font-macro-display text-3xl font-bold text-white leading-tight">
                  {locale === "ro" ? "Inovația Fondurilor de Indici (Jack Bogle)" : "The Rise of Low-Cost Passive Indexing"}
                </h3>
                <p className="font-macro-body text-lg text-white/70 leading-relaxed">
                  {locale === "ro"
                    ? "Lansat de Jack Bogle (fondatorul Vanguard) în 1976, fondul de indici pasiv și inventarea ulterioară a ETF-urilor în 1993 au democratizat complet Wall Street. Prin eliminarea comisioanelor managerilor activi de fonduri, saverii din clasa de mijloc pot capta direct randamentul complet al pieței de acțiuni, economisind trilioane în comisioane."
                    : "Pioneered by Vanguard founder Jack Bogle in 1976, and accelerated by the invention of the ETF in 1993, passive index investing democratized Wall Street. By eliminating high management fees of active managers, middle-class savers directly capture the full compounding returns of the market, holding over $15 trillion in index-linked assets."}
                </p>
                <div className="relative aspect-[16/8] w-full overflow-hidden rounded-3xl border border-white/5 bg-black/40 mt-6">
                  <Image
                    src="/images/library/Economy/100 dollar bill.jpg"
                    alt="US 100 Dollar Bill detailed engraving representing capital wealth"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </section>

          {/* Featured pull-stat — one cinematic number instead of a card wall */}
          <section className="border-t border-white/5 pt-32">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <p className="font-macro-display font-black leading-none tracking-tighter text-[clamp(72px,15vw,200px)]">
                <CountUp value={60} suffix="%" />
              </p>
              <p className="macro-body mt-8 max-w-3xl">{copy.advantagePullLabel}</p>
            </div>
          </section>

          {/* The advantage, in numbers — headline stat trio */}
          <section className="border-t border-white/5 pt-32">
            <span className="macro-eyebrow">{copy.advantageEyebrow}</span>
            <h2 className="macro-section-title mt-6 mb-16">{copy.advantageTitle}</h2>
            <div className="grid gap-16 border-t border-[#E8B923]/30 pt-16 sm:grid-cols-3">
              {cmStatTrio.map((stat) => (
                <MacroStat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </section>

          {/* Two editorial insights */}
          <section className="pt-8">
            <span className="macro-eyebrow">{copy.insightsEyebrow}</span>
            <div className="mt-10 grid gap-16 md:grid-cols-2">
              {cmInsights.map((insight) => (
                <MacroFact key={insight.fact} fact={insight.fact} detail={insight.detail} />
              ))}
            </div>
          </section>

          <div className="border-t border-white/5 pt-32 pb-16">
            <QuoteBlock
              quote={
                locale === "ro"
                  ? "Bursa este un mecanism prin care averea este transferată de la cei nerăbdători la cei răbdători. Investitorii americani care au rămas răbdători prin fiecare criză au devenit cei mai bogați oameni din istorie."
                  : "The stock market is a mechanism for transferring wealth from the impatient to the patient. American investors who stayed patient through every crisis became the wealthiest people in history."
              }
              attribution="Warren Buffett"
              title={copy.quoteTitle}
              variant="dark"
            />
          </div>

          {/* Back nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-16 mt-32">
            <Link
              href="/economy/gdp-growth"
              className="font-macro-mono text-sm uppercase tracking-widest text-white/50 transition-colors hover:text-white"
            >
              {copy.prevLink}
            </Link>
            <Link
              href="/economy/startups-venture-capital"
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
