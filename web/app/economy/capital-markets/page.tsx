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
import { BondMarketChart } from "@/components/data/BondMarketChart";
import { TreasuryYieldChart } from "@/components/data/TreasuryYieldChart";
import { VixChart } from "@/components/data/VixChart";
import { BuffettIndicatorChart } from "@/components/data/BuffettIndicatorChart";
import { FedFundsChart } from "@/components/data/FedFundsChart";
import { YieldCurveChart } from "@/components/data/YieldCurveChart";
import { QuarterlySeriesChart } from "@/components/data/QuarterlySeriesChart";
import { MacroStyles, MacroHero, MacroStat, MacroFact, InfrastructureBand, CountUp } from "@/components/economy/EconomyAnimations";
import { getServerLocale } from "@/lib/i18n/server";
import {
  SP500_HISTORY,
  MARKET_CAP_BY_EXCHANGE,
  BOND_MARKET_COMPOSITION,
  US_TREASURY_10Y_HISTORY,
  PRIVATE_MARKETS_TOP_FIRMS,
  VIX_HISTORY,
  VIX_META,
  BUFFETT_INDICATOR,
  BUFFETT_META,
  FED_FUNDS,
  FED_FUNDS_META,
  YIELD_CURVE,
  YIELD_CURVE_META,
  RECESSIONS,
  CORPORATE_PROFITS,
  CORPORATE_PROFITS_META,
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
          vixTitle: "Indicele fricii",
          vixBody:
            "VIX măsoară cât de multă turbulență se așteaptă piața în următoarele 30 de zile. În anii liniștiți stă în jurul valorii de 15. În momentele de panică, explodează: 80,86 în noiembrie 2008 și 82,69 pe 16 martie 2020, recordul absolut. Graficul de mai jos arată exact unde s-a rupt încrederea, de fiecare dată din 1990 încoace.",
          vixChartTitle: "Volatilitatea pieței (VIX) din 1990",
          vixChartSubtitle: "Media lunară, cu vârful lunar ca umbră deasupra",
          buffettTitle: "Piața față de economie",
          buffettBody:
            "Warren Buffett a numit acest raport „probabil cea mai bună măsură unică a evaluărilor la un moment dat”: valoarea totală a acțiunilor americane împărțită la PIB. Timp de aproape tot secolul XX, piața a valorat mai puțin decât producția anuală a țării. Astăzi valorează de peste două ori cât aceasta.",
          buffettChartTitle: "Valoarea acțiunilor ca procent din PIB, din 1947",
          buffettChartSubtitle: "Linia de 100% marchează paritatea cu producția anuală",
          fedTitle: "Prețul banilor",
          fedBody:
            "Fiecare preț de pe această pagină este cotat, în cele din urmă, față de unul singur: rata la care Rezerva Federală împrumută bani peste noapte. În iunie 1981, Paul Volcker a urcat-o la 19,10% și a provocat intenționat o recesiune pentru a opri inflația anilor '70. În aprilie 2020 a coborât la 0,05%, cel mai aproape de gratuit din istorie. Distanța dintre aceste două momente este istoria financiară americană modernă.",
          fedChartTitle: "Rata fondurilor federale, din 1954",
          fedChartSubtitle: "Media lunară, în procente",
          yieldTitle: "Alarma de recesiune a pieței",
          yieldBody:
            "În mod normal, banii pe termen lung costă mai mult decât cei pe termen scurt. Când se inversează — când titlurile pe 10 ani plătesc mai puțin decât cele pe 2 ani — piața pariază că ratele trebuie să scadă, ceea ce înseamnă de obicei că se așteaptă la necazuri. Fiecare recesiune din 1976 încoace a fost precedată de o inversiune. Reciproca nu este însă adevărată: inversiunea din 2022–2024 a fost cea mai adâncă de la Volcker și nu a urmat nicio recesiune. Este o alarmă bună, care uneori sună în gol.",
          yieldChartTitle: "Curba randamentelor (10 ani minus 2 ani), din 1976",
          yieldChartSubtitle: "Zonele umbrite marchează recesiunile datate de NBER",
          profitsTitle: "Ce cumpără de fapt piața",
          profitsBody:
            "Fiecare evaluare de pe această pagină este, în cele din urmă, o creanță asupra acestui număr. Corporațiile americane au câștigat 22 de miliarde de dolari după impozitare în 1947. Astăzi câștigă aproape 4 trilioane pe an. O precizare necesară: cifrele sunt exprimate în dolarii fiecărui an, așa că o parte reală din această creștere este inflație, nu putere de câștig. Forma rămâne însă esențială — profiturile își revin după fiecare criză de pe grafic, inclusiv după cele două care ar fi trebuit să le pună capăt.",
          profitsChartTitle: "Profituri corporative după impozitare, din 1947",
          profitsChartSubtitle: "Trimestrial, la rată anuală, în dolari curenți",
          profitsValueLabel: "Profituri corporative după impozitare, rată anuală",
          profitsLatestLabel: "Cel mai recent trimestru",
          profitsMultipleLabel: "Creștere din 1947, în dolari curenți",
          bondTitle: "Piața obligațiunilor SUA — $50,5T",
          bondBody:
            "Cu titluri de creanță totale de 50,5 trilioane de dolari, piața obligațiunilor americane este cea mai mare și mai lichidă din lume. Titlurile de Trezorerie (30,8T $) stabilesc rata globală fără risc, iar obligațiunile corporative (11,7T $) au atins un volum record de emisiuni în 2025, alimentând expansiunea companiilor americane.",
          bondChartTitle: "Piața Fixed Income a SUA — compoziție (1T 2026, sursa SIFMA)",
          exchangesTitle: "Marile burse ale Americii",
          estLabel: "Înființată",
          advantagePullLabel:
            "din valoarea acțiunilor publice de pe Pământ se tranzacționează pe piețele americane — dintr-o țară cu doar 4% din populația lumii.",
          advantageEyebrow: "Adâncimea, în cifre",
          advantageTitle: "Avantajul piețelor de capital",
          insightsEyebrow: "De ce contează",
          quoteTitle: "Președinte și CEO, Berkshire Hathaway — Omaha, Nebraska",
          treasuryTitle: "Trezoreria SUA: ancora gloțală a ratei fără risc",
          treasuryBody:
            "Fiecare model financiar de pe Pământ porneste de la randamentele Trezoreriei americane. De la maximele de 6% din era dot-com, la 0,89% în 2020 — minimul era ZIRP — şi revenirea la 4,35% în 2025 prin cel mai rapid ciclu de majorare a dobânzilor din ultimii 40 de ani. Nicio altă pieță de obligațiuni nu are aceeaşi adâncime, lichiditate sau relevanță globală.",
          treasuryChartTitle: "Randamentul Trezoreriei SUA pe 10 ani (2000–2025)",
          altTitle: "Piața Alternativă: Giganții Private Equity americani",
          altBody:
            "Dincolo de bursele publice, SUA domină piața globală a activelor alternative. Blackstone (1,3T$), KKR (744Mld$) şi Apollo (650Mld$) sunt doar cele mai mari trei. Aceste companii controlează fonduri de private equity, credit privat, infrastructură și imobiliare la o scară fără precedent — 8 din primele 10 firme de alternative din lume sunt americane.",
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
        vixTitle: "The Fear Index",
        vixBody:
          "The VIX measures how much turbulence the market expects over the next 30 days. In quiet years it sits around 15. In moments of panic it detonates: 80.86 in November 2008, and 82.69 on 16 March 2020, the all-time record. The chart below shows exactly where confidence broke, every time since 1990.",
        vixChartTitle: "Market volatility (VIX) since 1990",
        vixChartSubtitle: "Monthly average, with the monthly high ghosted above it",
        buffettTitle: "The Market Against the Economy",
        buffettBody:
          "Warren Buffett called this ratio \"probably the best single measure of where valuations stand at any given moment\": the total value of American equities divided by GDP. For most of the twentieth century the market was worth less than the country's annual output. Today it is worth more than twice as much.",
        buffettChartTitle: "Equity value as a percent of GDP, since 1947",
        buffettChartSubtitle: "The 100% line marks parity with one year of national output",
        fedTitle: "The Price of Money",
        fedBody:
          "Every price on this page is ultimately quoted against a single one: the rate at which the Federal Reserve lends money overnight. In June 1981 Paul Volcker took it to 19.10% and deliberately caused a recession to break the inflation of the 1970s. In April 2020 it fell to 0.05%, about as close to free as money has ever been. The distance between those two moments is modern American financial history.",
        fedChartTitle: "The Federal Funds Rate, since 1954",
        fedChartSubtitle: "Monthly average, in percent",
        yieldTitle: "The Market's Recession Alarm",
        yieldBody:
          "Normally long money costs more than short money. When that inverts — when the 10-year Treasury pays less than the 2-year — the market is betting rates must come down, which usually means it expects trouble. Every recession since 1976 was preceded by an inversion. The reverse does not hold: the 2022–24 inversion was the deepest since Volcker, and no recession followed. It is a good alarm that sometimes cries wolf.",
        yieldChartTitle: "The Yield Curve (10-year minus 2-year), since 1976",
        yieldChartSubtitle: "Shaded bands mark NBER-dated recessions",
        profitsTitle: "What the Market Is Buying",
        profitsBody:
          "Every valuation on this page is ultimately a claim on this number. American corporations earned $22 billion after tax in 1947. They now earn close to $4 trillion a year. A caution worth stating plainly: this is measured in the dollars of each year, so a real share of that rise is inflation rather than earning power. The shape is still the point — profits recover from every crisis on the chart, including the two that were supposed to end them.",
        profitsChartTitle: "Corporate profits after tax, since 1947",
        profitsChartSubtitle: "Quarterly, at an annual rate, in current dollars",
        profitsValueLabel: "Corporate profits after tax, annual rate",
        profitsLatestLabel: "Most recent quarter",
        profitsMultipleLabel: "Growth since 1947, in current dollars",
          bondTitle: "The US Bond Market — $50.5 Trillion",
          bondBody:
            "With $50.5 trillion in outstanding fixed income securities, the US bond market is the largest and most liquid in human history. US Treasuries ($30.8T) set the global risk-free rate — the anchor for every financial model on Earth. Corporate bonds ($11.7T) hit record issuance in 2025 as American companies tapped cheap capital to fund AI infrastructure and global expansion.",
          bondChartTitle: "US Fixed Income Market — Composition (1Q 2026, SIFMA)",
          exchangesTitle: "America's Major Exchanges",
          estLabel: "Est.",
          advantagePullLabel:
            "of all the public equity value on Earth trades on US markets — from a country with just 4% of the world's population.",
          advantageEyebrow: "The depth, in numbers",
          advantageTitle: "The Capital Markets Advantage",
          insightsEyebrow: "Why it matters",
          quoteTitle: "Chairman & CEO, Berkshire Hathaway — Omaha, Nebraska",
          treasuryTitle: "The US Treasury: The World's Risk-Free Anchor",
          treasuryBody:
            "Every financial model on Earth starts with the US Treasury yield. From 6% highs in the dot-com era, to 0.89% in 2020's ZIRP experiment, to 4.35% in 2025 following the fastest rate-hiking cycle in 40 years. No other bond market has the same depth, liquidity, or global relevance. The 10-year yield is, literally, the price of money for the world.",
          treasuryChartTitle: "US 10-Year Treasury Yield (2000–2025, FRED DGS10)",
          altTitle: "The Alternative Markets: America's Private Capital Giants",
          altBody:
            "Beyond public equities, the US dominates global alternative assets. Blackstone ($1.3T), KKR ($744B), and Apollo ($650B) are the top three. These firms control private equity, private credit, infrastructure, and real estate funds at an unprecedented scale — 8 of the world's top 10 alternative asset managers are American.",
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

          {/* Volatility — the fear index */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.vixTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.vixBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <VixChart
                data={VIX_HISTORY}
                title={copy.vixChartTitle}
                subtitle={copy.vixChartSubtitle}
                source={VIX_META.source}
              />
            </div>
          </section>

          {/* The market measured against the economy */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.buffettTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.buffettBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <BuffettIndicatorChart
                data={BUFFETT_INDICATOR}
                title={copy.buffettChartTitle}
                subtitle={copy.buffettChartSubtitle}
                source={BUFFETT_META.source}
              />
            </div>
          </section>

          {/* The policy rate every other price is quoted against */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.fedTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.fedBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <FedFundsChart
                data={FED_FUNDS}
                title={copy.fedChartTitle}
                subtitle={copy.fedChartSubtitle}
                source={FED_FUNDS_META.source}
              />
            </div>
          </section>

          {/* Yield curve, with recessions shaded behind it */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.yieldTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.yieldBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <YieldCurveChart
                data={YIELD_CURVE}
                recessions={RECESSIONS}
                title={copy.yieldChartTitle}
                subtitle={copy.yieldChartSubtitle}
                source={YIELD_CURVE_META.source}
              />
            </div>
          </section>

          {/* The earnings every valuation on this page is a claim on */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.profitsTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.profitsBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <QuarterlySeriesChart
                data={CORPORATE_PROFITS.map((p) => ({ q: p.q, v: p.profits }))}
                gradientId="profitsGradient"
                title={copy.profitsChartTitle}
                subtitle={copy.profitsChartSubtitle}
                valueLabel={copy.profitsValueLabel}
                latestLabel={copy.profitsLatestLabel}
                multipleLabel={copy.profitsMultipleLabel}
                markers={[
                  { x: "2008-10", label: locale === "ro" ? "Criza 2008" : "2008 crisis" },
                  { x: "2020-04", label: "COVID" },
                ]}
                source={CORPORATE_PROFITS_META.source}
              />
            </div>
          </section>

          {/* US Bond Market */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.bondTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.bondBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <BondMarketChart
                data={BOND_MARKET_COMPOSITION}
                title={copy.bondChartTitle}
                source="SIFMA Research Quarterly — Fixed Income Outstanding 1Q 2026"
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

          {/* Treasury Yield History */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.treasuryTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.treasuryBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <TreasuryYieldChart
                data={US_TREASURY_10Y_HISTORY}
                title={copy.treasuryChartTitle}
                source="Federal Reserve FRED — DGS10 (10-Year Treasury Constant Maturity)"
              />
            </div>
          </section>

          {/* Private Markets */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.altTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.altBody}
            </p>
            <div className="grid gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3">
              {PRIVATE_MARKETS_TOP_FIRMS.map((firm) => (
                <div
                  key={firm.firm}
                  className={`flex flex-col border-t pt-8 transition-colors duration-300 ${
                    firm.highlight
                      ? "border-[#E8B923]/60"
                      : "border-white/10 hover:border-white/25"
                  }`}
                >
                  <h3 className="font-macro-display text-4xl text-white mb-2">{firm.firm}</h3>
                  <p
                    className="font-macro-display text-3xl mb-4"
                    style={{ color: firm.highlight ? "#E8B923" : "rgba(255,255,255,0.7)" }}
                  >
                    {/* aum is USD billions. Only convert when we actually print
                        trillions — dividing sub-$1T firms by 1000 and rounding to
                        0dp turned $744B into "$1B" and $425B into "$0B". */}
                    {firm.aum >= 1000
                      ? `$${(firm.aum / 1000).toFixed(1)}T`
                      : `$${firm.aum}B`}
                  </p>
                  <p className="font-macro-body text-sm text-white/40 mt-auto">
                    {locale === "ro" ? firm.specialtyRo : firm.specialty}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-right macro-metadata text-white/30">
              {locale === "ro"
                ? "Sursă: Raportările companiilor, T1 2026 (31 martie 2026)"
                : "Source: Company Q1 2026 disclosures (as of 31 March 2026)"}
            </p>
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
