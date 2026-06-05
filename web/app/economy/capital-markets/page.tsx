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
  getCapitalMarketsFacts,
} from "@/lib/data/economy-data";
import { SITE_IMAGES } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Capital Markets | Economy",
  description:
    "NYSE + NASDAQ: $69 trillion in market cap. US Treasuries set the world's risk-free rate. The deepest, most liquid capital markets in human history.",
  alternates: { canonical: "/economy/capital-markets" },
};

const CAPITAL_MARKETS_EXTENDED_FACTS = [
  // Page-specific supporting facts. Shared facts stay in economy-data.ts;
  // local facts that belong only to this page can live here.
  {
    id: "stock-market-wealth",
    fact: "US stock market represents roughly 60% of total global equity value",
    detail: "Despite having only 4% of the world's population, everyday Americans utilize 401(k)s and Roth IRAs to invest in the S&P 500, which has historically crushed European indices like the Stoxx 600, compounding wealth at a rate that is largely impossible in Europe.",
    source: "Visual Capitalist 2024",
    color: "gold" as const,
  },
  {
    id: "capital-markets-depth",
    fact: "The NYSE and NASDAQ carry a combined market capitalization exceeding $40 trillion",
    detail: "This unmatched depth means American companies of every size — from seed-stage startups to Fortune 500 firms — can access the cheapest financing on Earth, which is a primary reason why they scale faster, invest in R&D, and dominate global markets.",
    source: "World Federation of Exchanges 2026",
    color: "red" as const,
  },
  {
    id: "asset-management",
    fact: "US asset managers control over $25 trillion in global wealth",
    detail:
      "BlackRock, Vanguard, and State Street manage more assets than the entire GDP of China. This 'Big Three' provides the backbone of global institutional investment.",
    source: "Investment Company Institute 2026",
    color: "gold" as const,
  },
  {
    id: "spy-liquidity",
    fact: "S&P 500 ETFs trade $60B+ in volume every single trading day",
    detail:
      "The SPY ETF alone regularly exceeds $60 billion in daily volume — more than the entire annual GDP of many nations, traded in a single day on a single American exchange.",
    source: "Bloomberg 2026",
    color: "red" as const,
  },
  {
    id: "private-equity",
    fact: "US private equity manages over $14 trillion in assets",
    detail:
      "America's private equity industry — Blackstone, Apollo, KKR, Carlyle — manages more capital than the GDP of China, Japan, and Germany combined in private markets alone.",
    source: "Preqin 2026",
    color: "blue" as const,
  },
  {
    id: "hedge-funds",
    fact: "70% of global hedge fund AUM is managed from the United States",
    detail:
      "Greenwich, CT and Midtown Manhattan host the world's most sophisticated capital allocators. Ray Dalio's Bridgewater alone manages $160B+ in assets.",
    source: "Preqin / HFR 2026",
    color: "gold" as const,
  },
  {
    id: "ipo-market",
    fact: "The US IPO market raises more capital than the next 5 exchanges combined",
    detail:
      "Companies from around the world — Alibaba, Arm Holdings, Spotify — choose to list on US exchanges to access American capital depth. There is no rival.",
    source: "Ernst & Young Global IPO Monitor 2026",
    color: "red" as const,
  },
  {
    id: "options-market",
    fact: "The US options market is larger than all other global markets combined",
    detail:
      "American derivatives exchanges trade over 40 million contracts per day, providing the world's most sophisticated mechanism for hedging and price discovery.",
    source: "Options Clearing Corporation 2026",
    color: "blue" as const,
  },
  {
    id: "401k-revolution",
    fact: "The 401(k) Revolution: Democratizing Compound Wealth",
    detail: "Total US retirement financial assets reached $45.8 trillion in mid-2025, with IRAs holding $18 trillion and 401(k) plans accounting for $9.3 trillion. Created by a tax loophole in 1978, this system effectively turned ordinary workers into long-term equity investors compounding in the deepest market on Earth.",
    source: "Investment Company Institute (ICI) Q3 2025",
    color: "gold" as const,
  },
  {
    id: "index-fund-innovation",
    fact: "The Index Fund: Financial Innovation That Eliminated Active Management Fees",
    detail: "Launched by Jack Bogle (Vanguard) in 1976, passive retail index investing represents over $15 trillion in US assets. Low-cost passive indexing and ETFs (invented in 1993) eliminate active management fees, letting middle-class retirement savers capture the full compounding returns of the market.",
    source: "Vanguard / ICI 2026",
    color: "red" as const,
  },
];

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
  const sharedFacts = getCapitalMarketsFacts(locale);
  // Shared facts come from the central data file; local facts stay here when
  // they only belong to this one subpage.
  const localFacts =
    locale === "ro"
      ? [
          {
            id: "stock-market-wealth",
            fact: "Bursa din SUA reprezintă aproximativ 60% din valoarea totală a acțiunilor globale",
            detail: "În ciuda faptului că are doar 4% din populație, clasa de mijloc din SUA folosește conturi 401(k) și Roth IRA pentru a investi în S&P 500, care a depășit istoric indicii europeni (Stoxx 600), acumulând avere într-un mod imposibil în Europa.",
            source: "Visual Capitalist 2024",
          },
          {
            id: "capital-markets-depth",
            fact: "NYSE și NASDAQ au o capitalizare combinată de peste 40 de trilioane de dolari",
            detail: "Această profunzime unică înseamnă că firmele americane de toate dimensiunile pot accesa cea mai ieftină finanțare de pe Pământ, ajutându-le să se dezvolte rapid, să investească în R&D și să domine piețele.",
            source: "World Federation of Exchanges 2026",
          },
          {
            ...CAPITAL_MARKETS_EXTENDED_FACTS[2],
            fact: "Administratorii de active din SUA controlează peste 25 de trilioane de dolari",
            detail:
              "BlackRock, Vanguard și State Street gestionează mai multe active decât întregul PIB al Chinei. Acești «Giganți» reprezintă coloana vertebrală a investițiilor instituționale globale.",
          },
          {
            ...CAPITAL_MARKETS_EXTENDED_FACTS[3],
            fact: "ETF-urile pe S&P 500 tranzacționează peste 50 mld. $ în fiecare zi de bursă",
            detail:
              "Doar ETF-ul SPY depășește frecvent 50 de miliarde de dolari volum zilnic — mai mult decât PIB-ul anual al multor națiuni, tranzacționat într-o singură zi pe o singură bursă americană.",
          },
          {
            ...CAPITAL_MARKETS_EXTENDED_FACTS[4],
            fact: "Private equity-ul american administrează peste 12 trilioane de dolari",
            detail:
              "Industria americană de private equity — Blackstone, Apollo, KKR, Carlyle — administrează mai mult capital decât PIB-ul Chinei, Japoniei și Germaniei la un loc doar în piețele private.",
          },
          {
            ...CAPITAL_MARKETS_EXTENDED_FACTS[5],
            fact: "70% din activele hedge fund-urilor globale sunt gestionate din Statele Unite",
            detail:
              "Greenwich, Connecticut și Midtown Manhattan găzduiesc cei mai sofisticați alocatori de capital din lume. Numai Bridgewater al lui Ray Dalio administrează peste 150 mld. $.",
          },
          {
            ...CAPITAL_MARKETS_EXTENDED_FACTS[6],
            fact: "Piața IPO din SUA strânge mai mult capital decât următoarele 5 burse la un loc",
            detail:
              "Companii din toată lumea — Alibaba, Arm Holdings, Spotify — aleg listarea pe bursele americane pentru a accesa profunzimea capitalului american. Nu există rival.",
          },
          {
            ...CAPITAL_MARKETS_EXTENDED_FACTS[7],
            fact: "Piața opțiunilor din SUA este mai mare decât toate celelalte piețe globale la un loc",
            detail:
              "Bursele americane de derivate tranzacționează peste 40 de milioane de contracte pe zi, oferind cel mai sofisticat mecanism din lume pentru acoperirea riscurilor și descoperirea prețurilor.",
          },
          {
            ...CAPITAL_MARKETS_EXTENDED_FACTS[8],
            fact: "Revoluția 401(k): Democratizarea Acumulării de Avere",
            detail: "Activele de pensionare din SUA au atins 45,8 trilioane $ în 2025, planurile 401(k) reprezentând 9,3 trilioane $, iar conturile IRA 18 trilioane $. Apărut dintr-o lacună fiscală din 1978, sistemul a transformat lucrătorii în investitori pe termen lung pe piețele americane de acțiuni.",
            source: "Investment Company Institute (ICI) Q3 2025",
          },
          {
            ...CAPITAL_MARKETS_EXTENDED_FACTS[9],
            fact: "Fondul de Indici: Inovația Financiară ce a Eliminat Comisioanele Active",
            detail: "Lansat de Jack Bogle (Vanguard) în 1976, investițiile pasive în fonduri indexate reprezintă acum peste 15 trilioane $ în active din SUA. Urmărirea pasivă a indicilor și ETF-urile (create în 1993) economisesc comisioane masive, stimulând randamentul economiilor de pensionare.",
            source: "Vanguard / ICI 2026",
          },
        ]
      : CAPITAL_MARKETS_EXTENDED_FACTS;
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
          advantageTitle: "Avantajul piețelor de capital",
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
          advantageTitle: "The Capital Markets Advantage",
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
      <div className="bg-[#030405] relative z-10 pb-32 pt-16">
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
            <div className="my-24 bg-[#030405]/50 backdrop-blur-md p-8 border border-white/10">
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

          {/* Extended facts */}
          <section className="border-t border-white/5 pt-32">
            <h2 className="macro-section-title text-[clamp(24px,4vw,60px)] mb-16">
              {copy.advantageTitle}
            </h2>
            <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
              {[...sharedFacts, ...localFacts].map((fact, i) => (
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
