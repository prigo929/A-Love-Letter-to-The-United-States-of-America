// ─── Capital Markets Sub-Page ─────────────────────────────────────────────────
// Deep-dive page about US stock exchanges and capital markets.
//
// Beginner guide:
// - Shared chart data comes from lib/data/economy-data.ts
// - This file controls page structure and page-specific copy
// - To change the hero photo, update SITE_IMAGES.economyNYSEUpsideDown below

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FactCard } from "@/components/sections/FactCard";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { SP500Chart } from "@/components/data/SP500Chart";
import { MarketCapChart } from "@/components/data/DollarMarketCharts";
import { getServerLocale } from "@/lib/i18n/server";
import {
  SP500_HISTORY,
  MARKET_CAP_BY_EXCHANGE,
  getCapitalMarketsFacts,
} from "@/lib/data/economy-data";
import { SITE_IMAGES } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Capital Markets | Economy | America: The Greatest Nation",
  description:
    "NYSE + NASDAQ: $47 trillion in market cap. US Treasuries set the world's risk-free rate. The deepest, most liquid capital markets in human history.",
  alternates: { canonical: "/economy/capital-markets" },
};

const CAPITAL_MARKETS_EXTENDED_FACTS = [
  // Page-specific supporting facts. Shared facts stay in economy-data.ts;
  // local facts that belong only to this page can live here.
  {
    id: "nyse-history",
    fact: "The NYSE has operated continuously under the buttonwood tree agreement since 1792",
    detail:
      "Founded under a buttonwood tree on Wall Street, the NYSE is older than most nations on Earth and has been the center of global finance for over 230 years.",
    source: "NYSE Historical Records",
    color: "gold" as const,
  },
  {
    id: "spy-liquidity",
    fact: "S&P 500 ETFs trade $50B+ in volume every single trading day",
    detail:
      "The SPY ETF alone regularly exceeds $50 billion in daily volume — more than the entire annual GDP of many nations, traded in a single day on a single American exchange.",
    source: "Bloomberg 2024",
    color: "red" as const,
  },
  {
    id: "private-equity",
    fact: "US private equity manages over $12 trillion in assets",
    detail:
      "America's private equity industry — Blackstone, Apollo, KKR, Carlyle — manages more capital than the GDP of China, Japan, and Germany combined in private markets alone.",
    source: "Preqin 2024",
    color: "blue" as const,
  },
  {
    id: "hedge-funds",
    fact: "70% of global hedge fund AUM is managed from the United States",
    detail:
      "Greenwich, CT and Midtown Manhattan host the world's most sophisticated capital allocators. Ray Dalio's Bridgewater alone manages $150B+ in assets.",
    source: "Preqin / HFR 2024",
    color: "gold" as const,
  },
  {
    id: "ipo-market",
    fact: "The US IPO market raises more capital than the next 5 exchanges combined",
    detail:
      "Companies from around the world — Alibaba, Arm Holdings, Spotify — choose to list on US exchanges to access American capital depth. There is no rival.",
    source: "Ernst & Young Global IPO Monitor 2024",
    color: "red" as const,
  },
  {
    id: "treasury-market",
    fact: "The US Treasury market is the most liquid financial market in history",
    detail:
      "$700+ billion in US Treasuries trade hands every single day — more than most countries' annual GDP. This liquidity is the foundation of global financial stability.",
    source: "Federal Reserve Bank of New York 2024",
    color: "blue" as const,
  },
];

const MAJOR_US_EXCHANGES = [
  // Simple content array used to generate the three exchange cards below.
  {
    name: "NYSE",
    founded: 1792,
    marketCap: "$25.1 Trillion",
    description:
      "The world's largest stock exchange by market cap — home to the world's most iconic corporations, from JPMorgan Chase to Berkshire Hathaway.",
    famous: "JPMorgan Chase, Berkshire Hathaway, ExxonMobil, J&J, Visa",
  },
  {
    name: "NASDAQ",
    founded: 1971,
    marketCap: "$22.4 Trillion",
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
  const locale = await getServerLocale();
  const breadcrumbEconomy = locale === "ro" ? "Economie" : "Economy";
  const pageLabel = locale === "ro" ? "Piețe de Capital" : "Capital Markets";
  const sharedFacts = getCapitalMarketsFacts(locale);
  const localFacts =
    locale === "ro"
      ? [
          {
            ...CAPITAL_MARKETS_EXTENDED_FACTS[0],
            fact: "NYSE funcționează neîntrerupt din 1792, încă de la acordul Buttonwood",
            detail:
              "Fondată sub un platan pe Wall Street, NYSE este mai veche decât majoritatea națiunilor de pe Pământ și centrul finanțelor globale de peste 230 de ani.",
          },
          {
            ...CAPITAL_MARKETS_EXTENDED_FACTS[1],
            fact: "ETF-urile pe S&P 500 tranzacționează peste 50 mld. $ în fiecare zi de bursă",
            detail:
              "Doar ETF-ul SPY depășește frecvent 50 de miliarde de dolari volum zilnic — mai mult decât PIB-ul anual al multor națiuni, tranzacționat într-o singură zi pe o singură bursă americană.",
          },
          {
            ...CAPITAL_MARKETS_EXTENDED_FACTS[2],
            fact: "Private equity-ul american administrează peste 12 trilioane de dolari",
            detail:
              "Industria americană de private equity — Blackstone, Apollo, KKR, Carlyle — administrează mai mult capital decât PIB-ul Chinei, Japoniei și Germaniei la un loc doar în piețele private.",
          },
          {
            ...CAPITAL_MARKETS_EXTENDED_FACTS[3],
            fact: "70% din activele hedge fund-urilor globale sunt gestionate din Statele Unite",
            detail:
              "Greenwich, Connecticut și Midtown Manhattan găzduiesc cei mai sofisticați alocatori de capital din lume. Numai Bridgewater al lui Ray Dalio administrează peste 150 mld. $.",
          },
          {
            ...CAPITAL_MARKETS_EXTENDED_FACTS[4],
            fact: "Piața IPO din SUA strânge mai mult capital decât următoarele 5 burse la un loc",
            detail:
              "Companii din toată lumea — Alibaba, Arm Holdings, Spotify — aleg listarea pe bursele americane pentru a accesa profunzimea capitalului american. Nu există rival.",
          },
          {
            ...CAPITAL_MARKETS_EXTENDED_FACTS[5],
            fact: "Piața americană a titlurilor de Trezorerie este cea mai lichidă piață financiară din istorie",
            detail:
              "Peste 700 de miliarde de dolari în titluri de Trezorerie SUA se tranzacționează în fiecare zi — mai mult decât PIB-ul anual al majorității țărilor. Această lichiditate este fundația stabilității financiare globale.",
          },
        ]
      : CAPITAL_MARKETS_EXTENDED_FACTS;
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
          heroAccent: "ALIMENTEAZĂ LUMEA",
          heroBody:
            "NYSE + NASDAQ: 47 de trilioane de dolari capitalizare combinată. Titlurile de Trezorerie americane ca reper global pentru rata fără risc. Cele mai adânci, transparente și lichide piețe de capital din istoria umană.",
          marketCapTitle: "Capitalizarea burselor — SUA vs. lume",
          marketCapBody:
            "Statele Unite găzduiesc cele mai mari două burse de pe Pământ — la o distanță uriașă. NYSE (25,1T $) și NASDAQ (22,4T $) reprezintă împreună mai multă capitalizare decât următoarele cinci burse combinate. Bursele americane nu doar conduc — domină.",
          marketCapChartTitle: "Capitalizarea burselor globale (2024, trilioane USD)",
          benchmarkTitle: "S&P 500 — reperul lumii",
          benchmarkBody:
            "Niciun indice nu este urmărit mai atent. Niciun indice nu este replicat mai larg. S&P 500 urmărește cele mai mari 500 de companii americane listate public — iar performanța lui este, de facto, fișa de evaluare a prosperității capitaliste globale. Din 1980, a generat randamente totale de peste 3.900%.",
          benchmarkChartTitle:
            "S&P 500 — 45 de ani de performanță a piețelor americane de capital",
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
            "NYSE + NASDAQ: $47 trillion in combined market capitalization. The US Treasury as the world's risk-free benchmark. The deepest, most transparent, most liquid capital markets in human history.",
          marketCapTitle: "Stock Exchange Market Cap — US vs World",
          marketCapBody:
            "The United States hosts the two largest stock exchanges on Earth — by a staggering margin. The NYSE ($25.1T) and NASDAQ ($22.4T) together represent more market capitalization than the next five exchanges combined. American exchanges don't just lead — they dominate.",
          marketCapChartTitle: "Global Stock Exchange Market Cap (2024, USD Trillions)",
          benchmarkTitle: "The S&P 500 — The World's Benchmark",
          benchmarkBody:
            "No index is watched more closely. No index is replicated more widely. The S&P 500 tracks the 500 largest publicly traded US companies — and its performance is the world's de facto report card on capitalist prosperity. Since 1980, it has delivered total returns exceeding 3,900%.",
          benchmarkChartTitle:
            "S&P 500 — 45 Years of American Capital Market Performance",
          exchangesTitle: "America's Major Exchanges",
          estLabel: "Est.",
          advantageTitle: "The Capital Markets Advantage",
          quoteTitle: "Chairman & CEO, Berkshire Hathaway — Omaha, Nebraska",
          prevLink: "← GDP & Scale",
          nextLink: "Startups & VC →",
        };

  return (
    <>
      {/* Hero */}
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image
          src={SITE_IMAGES.economyNYSEUpsideDown}
          alt={copy.heroAlt}
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
              { label: breadcrumbEconomy, href: "/economy" },
              { label: pageLabel },
            ]}
            className="mb-8"
          />
          <p className="mb-4 section-eyebrow">{copy.heroEyebrow}</p>
          <h1 className="mb-4 font-hero text-6xl text-white sm:text-7xl">
            {copy.heroLead}
            <br />
            <span className="text-glory-gold">{copy.heroAccent}</span>
          </h1>
          <p className="max-w-2xl font-body text-lg text-white/65 leading-relaxed">
            {copy.heroBody}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
          {/* Market cap comparison
              Uses a reusable chart component instead of custom SVG code in this file. */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.marketCapTitle}
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {copy.marketCapBody}
            </p>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <MarketCapChart
                data={MARKET_CAP_BY_EXCHANGE}
                title={copy.marketCapChartTitle}
                source="World Federation of Exchanges 2024"
              />
            </div>
          </section>

          {/* S&P 500 */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.benchmarkTitle}
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {copy.benchmarkBody}
            </p>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <SP500Chart
                data={SP500_HISTORY}
                title={copy.benchmarkChartTitle}
                source="S&P Global / Yahoo Finance"
              />
            </div>
          </section>

          {/* Major exchanges
              Generated from the MAJOR_US_EXCHANGES array above. */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.exchangesTitle}
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {exchanges.map((exchange) => (
                <div
                  key={exchange.name}
                  className="rounded-2xl border border-white/10 bg-navy-mid p-6 transition-colors hover:border-glory-gold/30"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="font-hero text-3xl text-glory-gold">
                      {exchange.name}
                    </h3>
                    <span className="rounded-full bg-white/8 px-2.5 py-1 font-body text-xs text-white/50">
                      {copy.estLabel} {exchange.founded}
                    </span>
                  </div>
                  <p className="mb-2 font-hero text-xl text-white">
                    {exchange.marketCap}
                  </p>
                  <p className="mb-4 font-body text-sm leading-relaxed text-white/55">
                    {exchange.description}
                  </p>
                  <p className="border-t border-white/8 pt-3 font-body text-xs text-white/35">
                    {exchange.famous}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Extended facts */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.advantageTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...sharedFacts, ...localFacts].map((fact) => (
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
                ? "Bursa este un mecanism prin care averea este transferată de la cei nerăbdători la cei răbdători. Investitorii americani care au rămas răbdători prin fiecare criză au devenit cei mai bogați oameni din istorie."
                : "The stock market is a mechanism for transferring wealth from the impatient to the patient. American investors who stayed patient through every crisis became the wealthiest people in history."
            }
            attribution="Warren Buffett"
            title={copy.quoteTitle}
            variant="dark"
          />

          {/* Back nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link
              href="/economy/gdp-growth"
              className="font-body text-sm text-white/50 transition-colors hover:text-white"
            >
              {copy.prevLink}
            </Link>
            <Link
              href="/economy/startups-venture-capital"
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
