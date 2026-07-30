// ─── Startups & Venture Capital Sub-Page ─────────────────────────────────────
// A deep-dive into the "Silicon Valley Philosophy" and the funding of the future.
//
// Pedagogical Goal:
// - To demonstrate American dominance in risk capital (65% of global VC).
// - To showcase the "Unicorn" ecosystem and the history of tech founders.
//
// Beginner guide:
// - Most charts and factual datasets come from lib/data/economy-data.ts

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { VCBarChart, UnicornPieChart } from "@/components/data/VCCharts";
import { VCHistoryChart } from "@/components/data/VCHistoryChart";
import { IPOMarketChart } from "@/components/data/IPOMarketChart";
import { VCDealStageChart } from "@/components/data/VCDealStageChart";
import { BusinessFormationChart } from "@/components/data/BusinessFormationChart";
import { QuarterlySeriesChart } from "@/components/data/QuarterlySeriesChart";
import { VcDryPowderChart } from "@/components/data/VcDryPowderChart";
import { VcSectorFundingChart } from "@/components/data/VcSectorFundingChart";
import { VcDealCountVolumeChart } from "@/components/data/VcDealCountVolumeChart";
import { VcExitsChart } from "@/components/data/VcExitsChart";
import { MacroStyles, MacroHero, MacroStat, MacroFact, InfrastructureBand, CountUp } from "@/components/economy/EconomyAnimations";
import { getServerLocale } from "@/lib/i18n/server";
import {
  VC_BY_COUNTRY,
  UNICORNS_BY_COUNTRY,
  VC_INVESTMENT_HISTORY,
  US_IPO_MARKET_HISTORY,
  VC_DEAL_STAGE_BREAKDOWN,
  getStartupTimeline,
  getStartupEcosystems,
  getTopVcFirms,
  getVcOverviewParagraphs,
  type FoundingTimeline,
  type StartupEcosystem,
  type VcFirm,
  BUSINESS_FORMATION,
  BUSINESS_FORMATION_META,
  RD_INVESTMENT,
  RD_META,
  VC_DRY_POWDER,
  VC_SECTOR_FUNDING,
  VC_DEAL_COUNT_VOLUME,
  VC_EXITS,
} from "@/lib/data/economy-data";
import { SITE_IMAGES } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Startups & Venture Capital | Economy",
  description:
    "America attracts 65% of all global venture capital and is home to 659 unicorn companies, about half the world's total. Silicon Valley, the greatest engine of innovation and wealth creation in history.",
  alternates: { canonical: "/economy/startups-venture-capital" },
};


export default async function StartupsVCPage() {
  // This page follows the same pattern as the other economy pages:
  // 1. read the locale
  // 2. choose translated/shared datasets
  // 3. pass those arrays into reusable visual components
  const locale = await getServerLocale();
  const breadcrumbEconomy = locale === "ro" ? "Economie" : "Economy";
  const pageLabel = locale === "ro" ? "Startup-uri și VC" : "Startups & VC";
  const overviewParagraphs = getVcOverviewParagraphs(locale);
  const vcFirms = getTopVcFirms(locale);
  const ecosystems = getStartupEcosystems(locale);
  const timeline = getStartupTimeline(locale);

  // Terminal "by the numbers" section: three headline stats plus two editorial
  // insights, replacing the old wall of identical fact cards. The unicorn count
  // is featured in its own section above, so it is not repeated here.
  const vcStatTrio =
    locale === "ro"
      ? [
          { value: "350K", label: "brevete acordate anual în SUA: nr. 1 mondial ca valoare a PI" },
          { value: "$250B+", label: "investiți anual în R&D de firmele tech americane (Amazon, Alphabet, Meta, Microsoft)" },
          { value: "$2T+", label: "valoarea produsă de primele 10 randamente VC din SUA, din investiții minuscule" },
        ]
      : [
          { value: "350K", label: "US patents granted every year: #1 in the world by IP value" },
          { value: "$250B+", label: "invested in R&D each year by US tech firms (Amazon, Alphabet, Meta, Microsoft)" },
          { value: "$2T+", label: "in value produced by the top 10 US VC returns from tiny checks" },
        ];
  const vcInsights =
    locale === "ro"
      ? [
          {
            fact: "Capitolul 11: eșecul ca stare recuperabilă",
            detail:
              "Niciun alt cadru de faliment nu protejează atât de complet capacitatea unei afaceri de a continua să opereze în timp ce își restructurează datoriile. A tratar eșecul ca recuperabil, nu ca un stigmat permanent, este un avantaj structural discret al ecosistemului american.",
          },
          {
            fact: "Formare fără fricțiune",
            detail:
              "În timp ce reglementările europene cer săptămâni sau luni pentru a înființa și angaja legal, o companie americană se poate forma în ore, atrăgând marea majoritate a capitalului de risc global.",
          },
        ]
      : [
          {
            fact: "Chapter 11: failure as a recoverable condition",
            detail:
              "No other bankruptcy framework so fully protects a business's ability to keep operating while it restructures its debts. Treating failure as recoverable rather than a permanent stigma is a quiet structural advantage of the American ecosystem.",
          },
          {
            fact: "Frictionless formation",
            detail:
              "Where European regulation takes weeks or months to legally incorporate and hire, an American company can form in hours, attracting the vast majority of global venture capital.",
          },
        ];

  const copy =
    locale === "ro"
      ? {
          heroAlt: "Birou modern de startup: cultura inovației din Silicon Valley",
          heroEyebrow: "Venture Capital și Startup-uri",
          heroLead: "SILICON\nVALLEY",
          heroAccent: "ESTE O\nPLANETĂ",
          heroBody:
            "Ecosistemul american de startup-uri concentrează companii de top și resurse financiare pentru inovație tehnologică.",
          overviewTitle: "De ce America conduce lumea în capitalul pentru inovație",
          vcChartTitle: "Investiții venture capital după țară (2026, miliarde USD)",
          unicornTitle: "Economia unicornilor: 659 și în creștere",
          unicornBody:
            "Un «unicorn» (o companie privată evaluată la cel puțin 1 miliard de dolari) era cândva considerat o raritate mitologică. America a construit 659, aproximativ jumătate din totalul mondial de circa 1.270. Sursele diferă asupra numărului exact, fiindcă «unicorn» este mai degrabă o metodologie decât un fapt: CB Insights, PitchBook și Hurun plasează toate SUA în jurul a jumătate. Numai în California s-au născut mai mulți unicorni decât în toată Europa la un loc.",
          unicornChartTitle: "Companii unicorn după țara de origine (2026)",
          rewiredTitle: "Companiile care au transformat tehnologia globală",
          rewiredBody:
            "Marile companii ale erei digitale au fost fondate de antreprenori americani și imigranți atrași de piața din SUA. Combinarea talentului academic de la Stanford și MIT, capitalul de risc pe termen lung și protecția proprietății intelectuale a favorizat dezvoltarea inovației.",
          yearLabel: "An",
          companyLabel: "Companie",
          founderLabel: "Fondator(i)",
          industryLabel: "Industrie",
          valueLabel: "Valoarea de azi",
          ecosystemsTitle: "Ecosistemele de startup ale Americii",
          ecosystemsBody:
            "Silicon Valley ia cele mai multe titluri, dar ecosistemul american de startup-uri se întinde acum în șase mari centre metropolitane, fiecare cu propria specializare, bază de talent și comunitate de investitori.",
          unicornsLabel: "Unicorni",
          annualVcLabel: "VC anual",
          firmsTitle: "Cele mai influente firme VC din lume",
          firmsBody:
            "Toate cele mai importante firme de venture capital din lume își au sediul în Statele Unite. Aceste firme nu doar investesc: ele modelează strategia tehnologică globală, recrutează cei mai buni ingineri din lume și fabrică companiile de mâine.",
          portfolioLabel: "Portofoliu notabil:",
          vcPullLabel:
            "valoarea combinată a companiilor fondate doar de absolvenți Stanford: Google, NVIDIA, Netflix, PayPal, Cisco, HP.",
          vcNumbersEyebrow: "Motorul, în cifre",
          numbersTitle: "În cifre",
          insightsEyebrow: "Avantaje structurale",
          quoteTitle: "Co-fondator, Andreessen Horowitz: Menlo Park, California",
          vcHistoryTitle: "Un sfert de secol de capital de risc american",
          vcHistoryBody:
            "Din 2000 până în 2025, capitalul de risc american a urmat o traiectorie parabolică. După explozia dot-com din 2000 (105Mld$) și contractarea care a urmat, ecosistemul și-a revenit și a crescut constant. Apoi a venit valul AI: în 2021 (348Mld$), în 2024 (320Mld$) și în 2025 (413Mld$) s-au stabilit record după record. Nici o altă țară nu atrage capital de risc la această scară.",
          vcHistoryChartTitle:
            "Investiții de venture capital în SUA (2000–2025, miliarde USD)",
          formationTitle: "Motorul de sub capitalul de risc",
          formationBody:
            "Capitalul de risc finanțează câteva mii de companii pe an. Dedesubt se află cealaltă Americă antreprenorială: 5,25 milioane de cereri de înființare a unei firme depuse în 2024, mai mult decât dublul celor 2,50 milioane din 2005. Pandemia a declanșat cel mai mare val din istorie (546.719 cereri doar în iulie 2020) și, spre deosebire de alte șocuri, nivelul nu a mai coborât niciodată. A doua bandă este jumătatea lucidă a acestei povești. Doar aproximativ o treime dintre aceste cereri sunt ceea ce Census numește „high-propensity”: firme care probabil vor avea vreodată un angajat. Restul sunt persoane fizice autorizate, activități secundare și entități de tip holding. Avântul antreprenorial este real, dar înseamnă mai ales oameni care lucrează pe cont propriu.",
          formationChartTitle: "Cereri de înființare a unei afaceri, lunar",
          formationChartSubtitle: "Toate cererile față de cele care probabil vor angaja, din 2004",
          rdTitle: "Cheltuiala de sub pariuri",
          rdBody:
            "Capitalul de risc prinde titlurile, dar este vârful vizibil al unui lucru mult mai mare. Investiția americană în cercetare-dezvoltare (laboratoare corporative, știință federală, cercetare universitară) a depășit 1,1 trilioane de dolari pe an, de aproximativ cinci ori cât plasează anual capitalul de risc. În 1947 era de 2,4 miliarde. Aceasta este conducta care produce lucrurile care merită finanțate: tranzistorul, GPS-ul, internetul, ARN-ul mesager. Capitalul de risc este modul în care aceste pariuri sunt comercializate, nu modul în care sunt descoperite.",
          rdChartTitle: "Investiția SUA în cercetare-dezvoltare, din 1947",
          rdChartSubtitle: "Trimestrial, la rată anuală, în dolari curenți",
          rdValueLabel: "Investiție în C&D, rată anuală",
          rdLatestLabel: "Cel mai recent trimestru",
          rdMultipleLabel: "Creștere din 1947, în dolari curenți",
          ipoTitle: "Piața IPO: Ciclul de Exitenţe Publice",
          ipoBody:
            "IPO-urile americane au înregistrat cel mai dramatic ciclu din istoria modernă: boom-ul SPAC din 2021 (397 IPO-uri, 142,4Mld$) urmat de cel mai sever declin din cauza ciclului de majorare al dobânzilor Fed (71 IPO-uri în 2022). Reboundul din 2025 (202 IPO-uri, 44Mld$) este alimentat de dominia în AI. Faptul că NASDAQ rămâne bursa preferată pentru IPO-uri tech este un avantaj structural american.",
          ipoChartTitle: "Piața IPO din SUA (2020–2025): Deal-uri și Venituri",
          ipoSource: "Sursă: Renaissance Capital: IPO-uri cu capitaliz. ≥ 50Mld$",
          dealStageTitle: "Unde Merge Capitalul de Risc: Distribuția pe Etape (2025)",
          dealStageBody:
            "Mega-rundele de 1 miliard$ i-au depășit pe toți ceilalți: doar 180 de tranzacții au absorbit 217Mld$, mai mult decât toate celelalte etape combinate. Acest lucru reflectă concentrarea structurala a capitalului de risc în ‘AI winners’ și în starturi technologice late-stage. Start-up-urile timpurii primeșc mai puțin în termeni absoluti, dar mult mai mult în număr de deal-uri.",
          dealStageChartTitle: "Distribuția Capitalului de Risc pe Etape de Investiție (2025)",
          dealStageSource: "Sursă: NVCA / PitchBook Venture Monitor 2025",
          dryPowderTitle: "Rezervele de Capital: Capitalul de Risc Neutilizat (Dry Powder)",
          dryPowderBody:
            "Venture capital-ul din SUA dispune de resurse financiare fără precedent care așteaptă să fie investite. În 2025, capitalul neutilizat („dry powder”) s-a menținut la nivelul masiv de 315 miliarde $, oferind o plasă de siguranță uriașă și o putere enormă de cumpărare pentru finanțarea următoarei generații de tehnologii revoluționare în următorii ani.",
          dryPowderChartTitle: "Evoluția rezervelor de capital neutilizat (Dry Powder) în SUA (2015–2025, miliarde USD)",
          vcSectorTitle: "Alocarea pe Sectoare: Boom-ul Inteligenței Artificiale",
          vcSectorBody:
            "Analiza investițiilor de venture capital pe sectoare arată direcția în care se îndreaptă viitoarea economie. Începând cu 2023, finanțarea pentru companiile de AI/ML a explodat de la 18 miliarde $ în 2020 la 88 miliarde $ în 2025, depășind pentru prima dată sectorul de software tradițional. Acesta este rezultatul direct al cursei globale pentru dezvoltarea modelelor lingvistice mari și a aplicațiilor generative.",
          vcSectorChartTitle: "Finanțarea VC în SUA pe Sectoare Principale (2020–2025, miliarde USD)",
          vcSectorSource: "Sursă: PitchBook-NVCA Venture Monitor",
          vcActivityTitle: "Activitatea Deal-urilor: Volumul vs. Numărul de Tranzacții VC",
          vcActivityBody:
            "Evoluția de lungă durată a pieței de venture capital arată fazele de boom și corecție ale capitalismului tehnologic. De la vârful bulei dot-com din 2000, la anii de reconstrucție și boom-ul excepțional din 2021 (peste 18.500 de deal-uri totalizând 345 miliarde $), piața s-a stabilizat în 2024–2025 la un ritm sustenabil de peste 10.000 de tranzacții și ~142-150 miliarde $ investiți anual.",
          vcActivityChartTitle: "Volumul Investițiilor vs. Numărul de Deal-uri VC în SUA (2000–2025)",
          vcActivitySource: "Sursă: PitchBook-NVCA Venture Monitor",
          vcExitsTitle: "Rutele de Ieșire: IPO-uri, M&A și Răscumpărări VC",
          vcExitsBody:
            "Exits reprezintă mecanismul prin care investitorii de risc și fondatorii își monetizează acțiunile, fie prin listarea la bursă (IPO), fie prin achiziția de către o companie mai mare (M&A). Boom-ul extraordinar din 2021 a înregistrat un volum istoric de 797 miliarde $ în exits (dintre care 680 miliarde $ au fost IPO-uri precum Coinbase, Roblox și Rivian), urmat de o corecție bruscă în 2023–2025 din cauza ratelor ridicate ale dobânzilor.",
          vcExitsChartTitle: "Valoarea Exits în SUA pe Tip de Tranzacție (2015–2025, miliarde USD)",
          vcExitsSource: "Sursă: PitchBook-NVCA Venture Monitor",
          prevLink: "← Piețe de Capital",
          nextLink: "Dominația Dolarului →",
        }
      : {
          heroAlt: "Modern startup office: Silicon Valley innovation culture",
          heroEyebrow: "Venture Capital & Startups",
          heroLead: "SILICON\nVALLEY",
          heroAccent: "IS A\nPLANET",
          heroBody:
            "America's startup ecosystem hosts leading global technology companies and venture capital resources.",
          overviewTitle: "Why America Leads the World in Innovation Capital",
          vcChartTitle: "Venture Capital Investment by Country (2026, USD Billions)",
          unicornTitle: "The Unicorn Economy: 659 and Counting",
          unicornBody:
            'A "unicorn" (a private company valued at $1 billion or more) was once considered a mythological rarity. America has built 659 of them, about half the world\'s total of roughly 1,270. Trackers disagree on the exact count because "unicorn" is a methodology rather than a fact: CB Insights, PitchBook and Hurun all put the US somewhere near half. More unicorns have been born in California alone than in all of Europe combined.',
          unicornChartTitle: "Unicorn Companies by Country of Origin (2026)",
          rewiredTitle: "The Companies That Transformed Global Technology",
          rewiredBody:
            "Major digital age companies were founded by American entrepreneurs and immigrants drawn to the US market. Combining academic talent from Stanford and MIT, long-term venture capital, and intellectual property protections fostered technological development.",
          yearLabel: "Year",
          companyLabel: "Company",
          founderLabel: "Founder(s)",
          industryLabel: "Industry",
          valueLabel: "Today's Value",
          ecosystemsTitle: "America's Startup Ecosystems",
          ecosystemsBody:
            "Silicon Valley gets the headlines, but the American startup ecosystem now spans six major metropolitan hubs, each with its own specialization, talent base, and investor community.",
          unicornsLabel: "Unicorns",
          annualVcLabel: "Annual VC",
          firmsTitle: "The World's Most Influential VC Firms",
          firmsBody:
            "Every one of the world's most consequential venture capital firms is headquartered in the United States. These firms don't just invest: they shape global technology strategy, recruit the world's best engineers, and manufacture the companies of tomorrow.",
          portfolioLabel: "Notable portfolio:",
          vcPullLabel:
            "the combined value of companies founded by Stanford alumni alone: Google, NVIDIA, Netflix, PayPal, Cisco, HP.",
          vcNumbersEyebrow: "The engine, in numbers",
          numbersTitle: "By the Numbers",
          insightsEyebrow: "Structural advantages",
          quoteTitle: "Co-Founder, Andreessen Horowitz: Menlo Park, California",
          vcHistoryTitle: "25 Years of American Risk Capital",
          vcHistoryBody:
            "From 2000 to 2025, US venture capital followed a parabolic trajectory. After the dot-com peak in 2000 ($105B) and subsequent contraction, the ecosystem recovered and grew steadily. Then came the AI wave: 2021 ($348B), 2024 ($320B), and 2025 ($413B) each set records. No other country attracts risk capital at this scale.",
          vcHistoryChartTitle:
            "US Venture Capital Investment (2000–2025, USD Billions)",
        formationTitle: "The Engine Underneath Venture Capital",
        formationBody:
          "Venture capital funds a few thousand companies a year. Underneath it sits the other entrepreneurial America: 5.25 million business applications filed in 2024, more than double the 2.50 million of 2005. The pandemic set off the largest surge on record (546,719 applications in July 2020 alone) and unlike other shocks, the level never came back down. The second band is the sober half of that story. Only about a third of those applications are what the Census calls high-propensity: businesses likely to ever put someone on a payroll. The rest are sole proprietorships, side ventures, and holding entities. The founding boom is real, but it is mostly people working for themselves.",
        formationChartTitle: "New business applications, monthly",
        formationChartSubtitle: "All applications against those likely to become employers, since 2004",
        rdTitle: "The Spending Underneath the Bets",
        rdBody:
          "Venture capital gets the headlines, but it is the visible tip of something much larger. American R&D investment (corporate labs, federal science, university research) crossed $1.1 trillion a year, roughly five times what venture capital deploys annually. It was $2.4 billion in 1947. This is the pipeline that produces the things worth funding: the transistor, GPS, the internet, mRNA. VC is how those bets get commercialised, not how they get discovered.",
        rdChartTitle: "U.S. research and development investment, since 1947",
        rdChartSubtitle: "Quarterly, at an annual rate, in current dollars",
        rdValueLabel: "R&D investment, annual rate",
        rdLatestLabel: "Most recent quarter",
        rdMultipleLabel: "Growth since 1947, in current dollars",
          ipoTitle: "The IPO Market: The Public Exit Cycle",
          ipoBody:
            "US IPOs have seen the most dramatic cycle in modern history: the 2021 SPAC boom (397 IPOs, $142.4B) followed by the sharpest rate-driven collapse on record (71 IPOs in 2022). The 2025 rebound (202 IPOs, $44B) is being powered by AI-sector listings. The fact that NASDAQ remains the preferred exchange for high-growth tech IPOs worldwide is a structural American advantage.",
          ipoChartTitle: "US IPO Market (2020–2025): Deal Count & Proceeds",
          ipoSource: "Source: Renaissance Capital: IPOs with market cap ≥ $50M",
          dealStageTitle: "Where Risk Capital Goes: Deal Stage Breakdown (2025)",
          dealStageBody:
            "Mega-rounds of $1B+ have outpaced everyone else: just 180 transactions absorbed $217B, more than all other stages combined. This reflects the structural concentration of risk capital into \u2018AI winners\u2019 and late-stage tech. Early-stage startups receive less in absolute terms but far more in deal count.",
          dealStageChartTitle: "US Venture Capital Deployment by Deal Stage (2025)",
          dealStageSource: "Source: NVCA / PitchBook Venture Monitor 2025 Full-Year",
          dryPowderTitle: "Unspent Capital: U.S. Venture Capital Dry Powder",
          dryPowderBody:
            "U.S. venture capital commands unprecedented financial reserves that are committed but not yet deployed. In 2025, 'dry powder' stood at a massive $315 billion, offering a huge runway and purchasing power to finance the next wave of disruptive technologies over the coming years.",
          dryPowderChartTitle: "U.S. Venture Capital Dry Powder (2015–2025, USD Billions)",
          vcSectorTitle: "Sector Allocation: The Artificial Intelligence Surge",
          vcSectorBody:
            "A breakdown of venture capital deployment by sector highlights where the future economy is being funded. Beginning in 2023, investment in Artificial Intelligence and Machine Learning (AI/ML) surged, rising from $18 billion in 2020 to $88 billion in 2025, eclipsing traditional enterprise software for the first time in history as funds rushed to back foundation models and generative applications.",
          vcSectorChartTitle: "U.S. Venture Capital Funding by Key Industry Sector (2020–2025)",
          vcSectorSource: "Source: PitchBook-NVCA Venture Monitor",
          vcActivityTitle: "Deal Activity: Venture Capital Volume vs. Transaction Count",
          vcActivityBody:
            "The long-term evolution of the venture capital market traces the waves of technological cycles. From the dot-com peak in 2000, through the slow rebuilding years, to the massive post-COVID boom of 2021 (over 18,500 deals deploying $345 billion), the market has normalized in 2024–2025 to a sustainable baseline of over 10,000 transactions and ~$142-150 billion deployed annually.",
          vcActivityChartTitle: "U.S. Venture Capital Deployed Capital vs. Deal Count (2000–2025)",
          vcActivitySource: "Source: PitchBook-NVCA Venture Monitor",
          vcExitsTitle: "Exit Pathways: IPOs, M&A, and VC Buyouts",
          vcExitsBody:
            "Exits are the ultimate liquidity mechanism for venture investors and startup founders, letting them convert equity back into cash. The 2021 liquidity supercycle recorded a record $797 billion in total exit value (led by massive tech IPOs like Coinbase, Roblox, and Rivian), before higher interest rates led to a sharp drop and valuation reset in 2023–2025.",
          vcExitsChartTitle: "U.S. Venture Capital Exit Value by Transaction Type (2015–2025)",
          vcExitsSource: "Source: PitchBook-NVCA Venture Monitor",
          prevLink: "← Capital Markets",
          nextLink: "Dollar Dominance →",
        };

  return (
    <>
      <MacroStyles />
      <MacroHero 
        titleLead={copy.heroLead}
        titleAccent={copy.heroAccent}
        eyebrow={copy.heroEyebrow}
        description={copy.heroBody}
        imageSrc={SITE_IMAGES.siliconValleyOffice}
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
          {/* Overview */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.overviewTitle}
            </h2>
            {overviewParagraphs.map((para: string, i: number) => (
              <p
                key={i}
                className="macro-body max-w-4xl mb-8"
              >
                {para}
              </p>
            ))}
          </section>

          {/* VC Chart */}
          <section>
            <div className="my-24">
              <VCBarChart
                data={VC_BY_COUNTRY}
                title={copy.vcChartTitle}
                source="NVCA / Pitchbook 2026"
              />
            </div>
          </section>

          {/* VC History Chart */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.vcHistoryTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.vcHistoryBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <VCHistoryChart
                data={VC_INVESTMENT_HISTORY}
                title={copy.vcHistoryChartTitle}
                source="NVCA / PitchBook Venture Monitor 2026"
              />
            </div>
          </section>

          {/* Unicorn chart */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.unicornTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.unicornBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <UnicornPieChart
                data={UNICORNS_BY_COUNTRY}
                title={copy.unicornChartTitle}
                source="Pitchbook 2026"
              />
            </div>
          </section>

          {/* IPO Market History */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.ipoTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.ipoBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <IPOMarketChart
                data={US_IPO_MARKET_HISTORY}
                title={copy.ipoChartTitle}
                source={copy.ipoSource}
              />
            </div>
          </section>

          {/* VC Deal Stage */}
          {/* The startup engine: Census business formation */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.formationTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.formationBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <BusinessFormationChart
                data={BUSINESS_FORMATION}
                title={copy.formationChartTitle}
                subtitle={copy.formationChartSubtitle}
                source={BUSINESS_FORMATION_META.source}
              />
            </div>
          </section>

          {/* R&D: the pipeline VC draws from */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.rdTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.rdBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <QuarterlySeriesChart
                data={RD_INVESTMENT.map((p) => ({ q: p.q, v: p.rd }))}
                gradientId="rdInvestGradient"
                title={copy.rdChartTitle}
                subtitle={copy.rdChartSubtitle}
                valueLabel={copy.rdValueLabel}
                latestLabel={copy.rdLatestLabel}
                multipleLabel={copy.rdMultipleLabel}
                source={RD_META.source}
              />
            </div>
          </section>

          <section>
            <h2 className="macro-section-title mb-12">
              {copy.dealStageTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.dealStageBody}
            </p>
            <div className="my-24">
              <VCDealStageChart
                data={VC_DEAL_STAGE_BREAKDOWN}
                title={copy.dealStageChartTitle}
                source={copy.dealStageSource}
              />
            </div>
          </section>

          {/* VC Dry Powder */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.dryPowderTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.dryPowderBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <VcDryPowderChart
                data={VC_DRY_POWDER}
                title={copy.dryPowderChartTitle}
                source="PitchBook-NVCA Venture Monitor 2025"
              />
            </div>
          </section>

          {/* VC Funding by Sector */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.vcSectorTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.vcSectorBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <VcSectorFundingChart
                data={VC_SECTOR_FUNDING}
                title={copy.vcSectorChartTitle}
                source={copy.vcSectorSource}
              />
            </div>
          </section>

          {/* VC Deal Activity (Count vs Volume) */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.vcActivityTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.vcActivityBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <VcDealCountVolumeChart
                data={VC_DEAL_COUNT_VOLUME}
                title={copy.vcActivityChartTitle}
                source={copy.vcActivitySource}
              />
            </div>
          </section>

          {/* VC Exits */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.vcExitsTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.vcExitsBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <VcExitsChart
                data={VC_EXITS}
                title={copy.vcExitsChartTitle}
                source={copy.vcExitsSource}
              />
            </div>
          </section>

          {/* Startup Timeline table */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.rewiredTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.rewiredBody}
            </p>
            
            <div className="grid gap-8 mt-16">
              {timeline.map((item: FoundingTimeline, i: number) => (
                <div key={i} className="grid grid-cols-2 md:grid-cols-5 gap-4 border-b border-white/10 pb-8 items-center">
                  <div className="font-macro-display text-3xl text-[#E8B923]">{item.year}</div>
                  <div className="font-macro-display text-2xl text-white">{item.company}</div>
                  <div className="font-macro-body text-white/55">{item.founder}</div>
                  <div>
                    <span className="macro-metadata border border-white/20 px-3 py-1 text-white">
                      {item.industry}
                    </span>
                  </div>
                  <div className="font-macro-display text-2xl text-[#E8B923] text-right">{item.currentValuation}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Startup Ecosystems */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.ecosystemsTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.ecosystemsBody}
            </p>
            <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
              {ecosystems.map((eco: StartupEcosystem) => (
                <div key={eco.city} className="flex flex-col border-t border-white/10 pt-8">
                  <p className="macro-eyebrow mb-6 text-[#E8B923]">
                    {eco.state}
                  </p>
                  <h3 className="font-macro-display text-4xl text-white mb-2">
                    {eco.city}
                  </h3>
                  <p className="font-macro-body text-white/45 italic mb-8">
                    &ldquo;{eco.nickname}&rdquo;
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 mb-8 border-t border-white/10 pt-8">
                    <div>
                      <p className="font-macro-display text-4xl text-[#E8B923]">
                        {eco.unicorns}+
                      </p>
                      <p className="macro-metadata mt-2">
                        {copy.unicornsLabel}
                      </p>
                    </div>
                    <div>
                      <p className="font-macro-display text-3xl text-white mt-1">
                        {eco.vcFunding}
                      </p>
                      <p className="macro-metadata mt-3">
                        {copy.annualVcLabel}
                      </p>
                    </div>
                  </div>
                  
                  <p className="macro-metadata text-white/40 leading-relaxed mt-auto border-t border-white/10 pt-8">
                    {eco.keyCompanies.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Top VC Firms */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.firmsTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.firmsBody}
            </p>
            <div className="grid gap-12 md:grid-cols-2">
              {vcFirms.map((firm: VcFirm) => (
                <div key={firm.name} className="flex flex-col border-t border-white/10 pt-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-macro-display text-4xl text-white">
                      {firm.name}
                    </h3>
                    <span className="font-macro-display text-3xl text-[#E8B923]">
                      {firm.aum}
                    </span>
                  </div>
                  <p className="macro-metadata text-white/40 mb-8">
                    {firm.city}
                  </p>
                  <p className="font-macro-body text-white/60 leading-relaxed">
                    <span className="text-white/30 uppercase text-xs tracking-widest font-mono mr-2">{copy.portfolioLabel}</span>
                    {firm.portfolio}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured pull-stat: one cinematic number instead of a card wall */}
          <section className="border-t border-white/5 pt-32">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <p className="font-macro-display font-black leading-none tracking-tighter text-[clamp(72px,15vw,200px)]">
                <CountUp value={5} prefix="$" suffix="T+" />
              </p>
              <p className="macro-body mt-8 max-w-3xl">{copy.vcPullLabel}</p>
            </div>
          </section>

          {/* By the numbers: headline stat trio */}
          <section className="border-t border-white/5 pt-32">
            <span className="macro-eyebrow">{copy.vcNumbersEyebrow}</span>
            <h2 className="macro-section-title mt-6 mb-16">{copy.numbersTitle}</h2>
            <div className="grid gap-16 border-t border-[#E8B923]/30 pt-16 sm:grid-cols-3">
              {vcStatTrio.map((stat) => (
                <MacroStat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </section>

          {/* Two editorial insights */}
          <section className="pt-8">
            <span className="macro-eyebrow">{copy.insightsEyebrow}</span>
            <div className="mt-10 grid gap-16 md:grid-cols-2">
              {vcInsights.map((insight) => (
                <MacroFact key={insight.fact} fact={insight.fact} detail={insight.detail} />
              ))}
            </div>
          </section>

          <div className="border-t border-white/5 pt-32 pb-16">
            <QuoteBlock
              quote={
                locale === "ro"
                  ? "Ecosistemul startup-urilor este cel mai puternic mecanism de creare de bogăție și rezolvare de probleme inventat vreodată. America l-a construit, iar America continuă să îl îmbunătățească."
                  : "The startup ecosystem is the most powerful wealth-creation and problem-solving machine ever invented. America built it, and America keeps improving it."
              }
              attribution="Marc Andreessen"
              title={copy.quoteTitle}
              variant="dark"
            />
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-16 mt-32">
            <Link
              href="/economy/capital-markets"
              className="font-macro-mono text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              {copy.prevLink}
            </Link>
            <Link
              href="/economy/dollar-dominance"
              className="font-macro-mono text-sm uppercase tracking-widest text-[#E8B923] hover:text-white transition-colors"
            >
              {copy.nextLink}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
