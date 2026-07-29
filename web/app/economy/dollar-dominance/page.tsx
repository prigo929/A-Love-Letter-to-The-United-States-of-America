// ─── Dollar Dominance Sub-Page ────────────────────────────────────────────────
// A technical overview of the US dollar as the world's reserve currency.
//
// Pedagogical Goal:
// - To explain the "Exorbitant Privilege" of the dollar.
// - To show the dollar's share of global reserves vs. rival currencies.
//
// Beginner guide:
// - Shared facts and overview paragraphs come from lib/data/economy-data.ts

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { DollarReserveChart } from "@/components/data/DollarMarketCharts";
import { DollarIndexChart } from "@/components/data/DollarIndexChart";
import { MacroStyles, MacroHero, MacroStat, MacroFact, InfrastructureBand, CountUp } from "@/components/economy/EconomyAnimations";
import { getServerLocale } from "@/lib/i18n/server";
import {
  DOLLAR_RESERVE_SHARE,
  DOLLAR_RESERVE_META,
  DOLLAR_INDEX,
  DOLLAR_INDEX_META,
  getDollarOverviewParagraphs,
} from "@/lib/data/economy-data";
import { SITE_IMAGES } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { PhotoLightboxGrid } from "@/components/shared/PhotoLightboxGrid";

export const metadata: Metadata = {
  title: "Dollar Dominance | Economy",
  description:
    "The US dollar: 56.8% of global FX reserves, the Petrodollar system, Bretton Woods to today. The world's reserve currency and its extraordinary advantages for America.",
  alternates: { canonical: "/economy/dollar-dominance" },
};


const DOLLAR_TIMELINE = [
  // Timeline entries are plain data objects so the page can render them with one map().
  {
    year: 1944,
    event: "Bretton Woods Agreement",
    description:
      "Allied nations agree to peg their currencies to the US dollar, and the dollar to gold at $35/oz. The dollar becomes the cornerstone of the post-war financial order.",
  },
  {
    year: 1971,
    event: "Nixon Closes the Gold Window",
    description:
      "President Nixon ends dollar-gold convertibility. Rather than weaken the dollar's position, the move ushers in the era of the pure fiat dollar — which has only grown stronger.",
  },
  {
    year: 1973,
    event: "Petrodollar System Established",
    description:
      'The US negotiates with Saudi Arabia: oil is priced and sold exclusively in dollars in exchange for US military protection. The "Petrodollar" embeds dollar demand into global energy markets forever.',
  },
  {
    year: 1994,
    event: "NAFTA & Dollar Expansion",
    description:
      "Trade liberalization expands dollar use across the Americas. The peso crisis reinforces that dollar-denominated assets are the global safe haven.",
  },
  {
    year: 2008,
    event: "Financial Crisis Confirms Dollar Supremacy",
    description:
      "During the worst financial crisis since 1929 — a crisis that originated in America — global investors fled TO the dollar, not away from it. The dollar strengthened. This proved the dollar's irreplaceable safe-haven status.",
  },
  {
    year: 2022,
    event: "Dollar Weaponized Against Russia",
    description:
      "Russia's invasion of Ukraine triggers unprecedented dollar-based sanctions. $300B+ in Russian reserves frozen. The episode demonstrates the dollar's role as both economic instrument and geopolitical weapon.",
  },
  {
    year: 2026,
    event: "Dollar Still Reigns at 80 Years",
    description:
      'Despite repeated predictions of "de-dollarization," the dollar\'s share of global reserves remains above 56.8%, SWIFT dominance holds above 40%, and no credible rival has emerged. The dollar endures.',
  },
];

export default async function DollarDominancePage() {
  // Start by resolving the request locale, then build the translated timeline,
  // facts, and labels from that single value.
  const locale = await getServerLocale();
  const breadcrumbEconomy = locale === "ro" ? "Economie" : "Economy";
  const pageLabel = locale === "ro" ? "Dominația Dolarului" : "Dollar Dominance";
  const overviewParagraphs = getDollarOverviewParagraphs(locale);
  // Terminal "dollar advantage" section: three headline stats plus two editorial
  // insights, replacing the old wall of eleven identical fact cards. The stats
  // here are deliberately distinct from the hero (reserves / SWIFT / pegs).
  const dollarStatTrio =
    locale === "ro"
      ? [
          { value: "50%+", label: "din datoria internațională este denominată în dolari" },
          { value: "$100–500B", label: "economisiți anual prin seigniorage — profitul din emiterea banilor lumii" },
          { value: "$450B", label: "în linii de swap de urgență extinse de Fed băncilor centrale străine în 2020" },
        ]
      : [
          { value: "50%+", label: "of all international debt is denominated in US dollars" },
          { value: "$100–500B", label: "saved every year through seigniorage — the profit of issuing the world's money" },
          { value: "$450B", label: "in emergency swap lines the Fed extended to foreign central banks in 2020" },
        ];
  const dollarInsights =
    locale === "ro"
      ? [
          {
            fact: "Petrodolarul",
            detail:
              "De la acordul din anii 1970, petrolul — și practic orice marfă majoră — este prețuit și decontat în dolari, înglobând cererea de dolari în economia fiecărei națiuni.",
          },
          {
            fact: "Dolarul ca armă geopolitică",
            detail:
              "A fi tăiat de la sistemul dolarului prin sancțiuni SWIFT este una dintre cele mai puternice arme economice de pe Pământ — Iranul, Rusia și Coreea de Nord au simțit-o direct.",
          },
        ]
      : [
          {
            fact: "The petrodollar",
            detail:
              "Since the 1970s agreement, oil — and virtually every major commodity — is priced and settled in dollars, embedding dollar demand into every nation's economy.",
          },
          {
            fact: "The dollar as a geopolitical weapon",
            detail:
              "Being cut off from the dollar system through SWIFT sanctions is one of the most powerful economic weapons on Earth — Iran, Russia, and North Korea have all felt it directly.",
          },
        ];
  // The timeline is plain data on purpose so the render section can stay
  // simple and focus on structure instead of hard-coded event blocks.
  const timeline =
    locale === "ro"
      ? [
          {
            ...DOLLAR_TIMELINE[0],
            event: "Acordul Bretton Woods",
            description:
              "Națiunile aliate convin să-și lege monedele de dolarul american, iar dolarul de aur la 35 $/uncie. Dolarul devine piatra de temelie a ordinii financiare postbelice.",
          },
          {
            ...DOLLAR_TIMELINE[1],
            event: "Nixon închide fereastra aurului",
            description:
              "Președintele Nixon pune capăt convertibilității dolar-aur. În loc să slăbească poziția dolarului, mișcarea deschide era dolarului pur fiat — care a devenit și mai puternic.",
          },
          {
            ...DOLLAR_TIMELINE[2],
            event: "Se stabilește sistemul petrodolarului",
            description:
              "SUA negociază cu Arabia Saudită: petrolul este prețuit și vândut exclusiv în dolari în schimbul protecției militare americane. «Petrodolarul» fixează cererea globală de dolari în piețele de energie.",
          },
          {
            ...DOLLAR_TIMELINE[3],
            event: "NAFTA și extinderea dolarului",
            description:
              "Liberalizarea comerțului extinde utilizarea dolarului în Americi. Criza peso-ului confirmă încă o dată că activele denominate în dolari sunt refugiu global.",
          },
          {
            ...DOLLAR_TIMELINE[4],
            event: "Criza financiară confirmă supremația dolarului",
            description:
              "În timpul celei mai grave crize financiare de după 1929 — o criză pornită din America — investitorii globali au fugit SPRE dolar, nu departe de el. Dolarul s-a întărit.",
          },
          {
            ...DOLLAR_TIMELINE[5],
            event: "Dolarul este folosit împotriva Rusiei",
            description:
              "Invazia Ucrainei de către Rusia declanșează sancțiuni fără precedent bazate pe dolar. Peste 300 mld. $ în rezerve rusești sunt înghețate. Episodul arată rolul dolarului ca instrument economic și armă geopolitică.",
          },
          {
            ...DOLLAR_TIMELINE[6],
            event: "Statutul global al dolarului la 82 de ani",
            description:
              "Ponderea dolarului în rezervele globale și decontările internaționale își menține nivelul ridicat în comerțul mondial.",
          },
        ]
      : DOLLAR_TIMELINE;
  const copy =
    locale === "ro"
      ? {
          heroAlt: "Bancnote de dolari americani — moneda de rezervă a lumii",
          heroEyebrow: "Dominația Dolarului",
          heroLead: "MONEDA DE REZERVĂ",
          heroAccent: "A LUMII",
          heroBody:
            "Dolarul american este sistemul de operare al economiei globale: 56,8% din toate rezervele valutare și peste 40% din comerțul mondial.",
          heroStats: [
            { value: "56.8%", label: "din rezervele FX globale", source: "IMF COFER, T4 2025" },
            { value: "40%+", label: "din tranzacțiile SWIFT", source: "SWIFT 2026" },
            { value: "65+", label: "țări legate de USD", source: "IMF 2026" },
          ],
          overviewTitle: "Privilegiul exorbitant",
          chartTitle: "Rezerve valutare globale pe monedă (T4 2025)",
          allocatedLabel: "rezerve alocate",
          indexTitle: "O felie mai mică dintr-un bazin mai mare",
          indexBody:
            "Graficul de mai sus este citit adesea ca declin, iar tendința din el este reală: dolarul deținea aproximativ 71% din rezervele alocate în 2000 și deține 56,8% acum. Bazinul însuși a crescut enorm — o felie mai mică din 13,1 trilioane de dolari nu înseamnă mai puțini dolari. Când FMI a analizat scăderea din al doilea trimestru din 2025, a constatat că mișcările cursului de schimb au explicat 92% din ea.",
          indexChartTitle: "Indicele nominal larg al dolarului, din 2006",
          indexChartSubtitle: "Ponderat comercial față de partenerii SUA; ianuarie 2006 = 100",
          timelineTitle: "Evoluția istorică a rolului global al dolarului",
          timelineBody:
            "Pozitionarea dolarului s-a consolidat prin acorduri economice, piețe financiare transparente și forță economică de-a lungul deceniilor.",
          detailPullLabel:
            "din tranzacțiile internaționale implică dolarul american, susținând comerțul global.",
          detailEyebrow: "Dominația, în cifre",
          detailTitle: "Avantajul dolarului — în detaliu",
          insightsEyebrow: "De ce contează",
          calloutTitle: "Despre «de-dolarizare» — O analiză a piețelor",
          calloutP1:
            "Analiștii au discutat periodic despre potențiala înlocuire a dolarului. Lansarea euro în 1999 și ascensiunea Chinei în anii 2000 au fost văzute ca provocări pentru USD, însă de fiecare dată ponderea dolarului s-a stabilizat.",
          calloutP2:
            "Niciun alt activ nu oferă combinația de piețe lichide, stabilitate instituțională și stat de drept ale piețelor americane. Dolarul rămâne alegerea principală pentru băncile centrale globale.",
          calloutConclusion:
            "Dolarul își păstrează statutul datorită adâncimii piețelor de capital americane.",
          quoteTitle: "Fost secretar al Trezoreriei SUA, Harvard University",
          prevLink: "← Startup-uri și VC",
          nextLink: "Comerț și Exporturi →",
        }
      : {
          heroAlt: "US dollar bills — the world's reserve currency",
          heroEyebrow: "Dollar Dominance",
          heroLead: "THE WORLD'S",
          heroAccent: "RESERVE CURRENCY",
          heroBody:
            "The US dollar functions as the central operating currency of global finance, accounting for 56.8% of official FX reserves and over 40% of international trade.",
          heroStats: [
            { value: "56.8%", label: "of global FX reserves", source: "IMF COFER, Q4 2025" },
            { value: "40%+", label: "of SWIFT transactions", source: "SWIFT 2026" },
            { value: "65+", label: "countries pegged to USD", source: "IMF 2026" },
          ],
          overviewTitle: "The Exorbitant Privilege",
          chartTitle: "Global Foreign Exchange Reserves by Currency (Q4 2025)",
          allocatedLabel: "allocated reserves",
          indexTitle: "Reserve Allocations and Market Value",
          indexBody:
            "While the dollar's share of allocated global FX reserves moved from 71% in 2000 to 56.8% today, total global reserves expanded significantly. The IMF attributed 92% of recent quarterly fluctuations to exchange-rate valuation changes rather than reserve sales.",
          indexChartTitle: "The nominal broad dollar index, since 2006",
          indexChartSubtitle: "Trade-weighted against America's trading partners; January 2006 = 100",
          timelineTitle: "Historical Development of Dollar Reserve Status",
          timelineBody:
            "The dollar's reserve status developed through international financial agreements, capital market liquidity, and trade flows over eight decades.",
          detailPullLabel:
            "of international transactions involve the US dollar, anchoring global trade.",
          detailEyebrow: "Dominance, in numbers",
          detailTitle: "The Dollar Advantage — In Detail",
          insightsEyebrow: "Why it matters",
          calloutTitle: "On “De-Dollarization” — A Reality Check",
          calloutP1:
            "Periodic predictions of de-dollarization have accompanied major financial shifts, including the launch of the Euro in 1999 and the expansion of emerging market trade. In each period, dollar demand stabilized.",
          calloutConclusion:
            "The dollar maintains its role due to the unmatched liquidity of US financial markets.",
          quoteTitle: "Former US Secretary of the Treasury, Harvard University",
          prevLink: "← Startups & VC",
          nextLink: "Trade & Exports →",
        };

  return (
    <>
      <MacroStyles />
      <MacroHero 
        titleLead={copy.heroLead}
        titleAccent={copy.heroAccent}
        eyebrow={copy.heroEyebrow}
        description={copy.heroBody}
        imageSrc={SITE_IMAGES.economyDollar}
        imageAlt={copy.heroAlt}
        stats={copy.heroStats}
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
            {overviewParagraphs.map((para, i) => (
              <p
                key={i}
                className="macro-body max-w-4xl mb-8"
              >
                {para}
              </p>
            ))}
          </section>

          {/* Reserve chart */}
          <section>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <DollarReserveChart
                data={DOLLAR_RESERVE_SHARE}
                title={copy.chartTitle}
                source={`${DOLLAR_RESERVE_META.source} — ${copy.allocatedLabel}`}
              />
            </div>
          </section>

          {/* The counterweight: share is falling, price is not */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.indexTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.indexBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <DollarIndexChart
                data={DOLLAR_INDEX}
                title={copy.indexChartTitle}
                subtitle={copy.indexChartSubtitle}
                source={DOLLAR_INDEX_META.source}
              />
            </div>
          </section>

          {/* Timeline */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.timelineTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.timelineBody}
            </p>
            <div className="mt-24 space-y-0">
              {timeline.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-8 md:gap-16 border-t border-white/10 py-12">
                  <div className="md:w-1/4 shrink-0">
                    <span className="font-macro-display text-6xl text-[#E8B923]">
                      {item.year}
                    </span>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="font-macro-display text-4xl text-white mb-6">
                      {item.event}
                    </h3>
                    <p className="macro-body">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured pull-stat — one cinematic number instead of a card wall */}
          <section className="border-t border-white/5 pt-32">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <p className="font-macro-display font-black leading-none tracking-tighter text-[clamp(72px,15vw,200px)]">
                <CountUp value={88} suffix="%" />
              </p>
              <p className="macro-body mt-8 max-w-3xl">{copy.detailPullLabel}</p>
            </div>
          </section>

          {/* Dominance, in numbers — headline stat trio */}
          <section className="border-t border-white/5 pt-32">
            <span className="macro-eyebrow">{copy.detailEyebrow}</span>
            <h2 className="macro-section-title mt-6 mb-16">{copy.detailTitle}</h2>
            <div className="grid gap-16 border-t border-[#E8B923]/30 pt-16 sm:grid-cols-3">
              {dollarStatTrio.map((stat) => (
                <MacroStat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </section>

          {/* Two editorial insights */}
          <section className="pt-8">
            <span className="macro-eyebrow">{copy.insightsEyebrow}</span>
            <div className="mt-10 grid gap-16 md:grid-cols-2">
              {dollarInsights.map((insight) => (
                <MacroFact key={insight.fact} fact={insight.fact} detail={insight.detail} />
              ))}
            </div>
          </section>

          {/* Dedollarization callout */}
          <section className="my-32 border-l border-[#b22234] pl-8 md:pl-16">
            <h2 className="macro-eyebrow text-[#b22234] mb-8">
              {copy.calloutTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-8">
              {copy.calloutP1}
            </p>
            <p className="macro-body max-w-4xl mb-8">
              {copy.calloutP2}
            </p>
            <p className="font-macro-display text-3xl text-white mt-12 max-w-4xl">
              {copy.calloutConclusion}
            </p>
          </section>

          <div className="border-t border-white/5 pt-32 pb-16">
            <QuoteBlock
              quote={
                locale === "ro"
                  ? "Capacitatea Americii de a se împrumuta în propria monedă la cele mai mici costuri din lume nu este noroc — este recompensa pentru că a construit cel mai credibil sistem financiar din istoria omenirii."
                  : "America's ability to borrow in its own currency at the world's lowest rates is not luck — it is the reward for having built the most trustworthy financial system in human history."
              }
              attribution="Lawrence Summers"
              title={copy.quoteTitle}
              variant="dark"
            />
          </div>

          {/* Dollar Bill Gallery */}
          <div className="mt-24 mb-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8B923]/70 mb-3">
              {locale === "ro" ? "SIMBOLURILE MONEDEI" : "THE CURRENCY"}
            </p>
            <h3 className="text-white font-display text-xl font-bold mb-4">
              {locale === "ro"
                ? "Designul Dolarului American"
                : "The Dollar Bill — Designed in Detail"}
            </h3>
            <p className="text-white/50 text-sm font-body leading-relaxed mb-8 max-w-2xl">
              {locale === "ro"
                ? "Fiecare bancnotă americană poartă simboluri cu rezonanță istorică profundă: Ochiul Providenței, constelația celor 13 stele, vulturul și scutul. Peste 2 trilioane de dolari circulă la nivel global — circa 60% în afara Statelor Unite."
                : "Every Federal Reserve Note carries centuries of symbolism: the Eye of Providence, the thirteen-star constellation, the eagle and shield. Over $2 trillion in physical dollars circulate globally, with roughly 60% held outside the United States."}
            </p>
            {/* The two banknote faces (wide/landscape) share one row; the vertical
                currency stack gets its own row below, shown in full and uncropped. */}
            <PhotoLightboxGrid
              gridClassName="grid grid-cols-1 sm:grid-cols-2 gap-4"
              photos={[
                {
                  src: SITE_IMAGES.economyDollarObverse,
                  alt: "United States one dollar bill — obverse side with George Washington portrait",
                  caption: locale === "ro" ? "Dolarul — față (George Washington)" : "Dollar Bill — Obverse",
                  aspect: "12/5",
                },
                {
                  src: SITE_IMAGES.economyDollarReverse,
                  alt: "United States one dollar bill — reverse side with the Great Seal",
                  caption: locale === "ro" ? "Dolarul — verso (Marele Sigiliu)" : "Dollar Bill — Reverse (Great Seal)",
                  aspect: "12/5",
                },
              ]}
            />
            <PhotoLightboxGrid
              gridClassName="grid grid-cols-1 gap-4 mt-4 max-w-md mx-auto"
              photos={[
                {
                  src: SITE_IMAGES.economyPaperMoney,
                  alt: "American paper money denominations laid out from small to large bills",
                  caption: locale === "ro" ? "Bancnotele Americane — de la $1 la $100" : "US Currency — $1 to $100",
                  aspect: "2975/4460",
                },
              ]}
            />
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-16 mt-32">
            <Link
              href="/economy/startups-venture-capital"
              className="font-macro-mono text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              {copy.prevLink}
            </Link>
            <Link
              href="/economy/trade-and-exports"
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
