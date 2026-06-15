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
import { MacroStyles, MacroHero, MacroStat, MacroFact, InfrastructureBand } from "@/components/economy/EconomyAnimations";
import { getServerLocale } from "@/lib/i18n/server";
import {
  DOLLAR_RESERVE_SHARE,
  getDollarFacts,
  getDollarOverviewParagraphs,
} from "@/lib/data/economy-data";
import { SITE_IMAGES } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dollar Dominance | Economy",
  description:
    "The US dollar: 57.4% of global FX reserves, the Petrodollar system, Bretton Woods to today. The world's reserve currency and its extraordinary advantages for America.",
  alternates: { canonical: "/economy/dollar-dominance" },
};

const DOLLAR_EXTENDED_FACTS = [
  // Extra facts that belong only to this page.
  {
    id: "exorbitant-privilege",
    fact: "The Dollar as Global Reserve Currency: The Exorbitant Privilege",
    detail: "The US dollar constitutes approximately 60% of global foreign exchange reserves and is used in 88% of all international transactions. This 'exorbitant privilege' allows the US to borrow at lower rates and issue sovereign debt in its own currency, effectively subsidizing American borrowing costs.",
    source: "Federal Reserve / BIS 2026",
    color: "gold" as const,
  },
  {
    id: "dollar-countries",
    fact: "Over 65 countries peg or tightly link their currency to the US dollar",
    detail:
      "From Panama (which uses USD as legal tender) to Saudi Arabia, dozens of nations anchor their monetary systems to the dollar — amplifying its global reach far beyond US borders.",
    source: "IMF Annual Report on Exchange Rate Arrangements 2026",
    color: "gold" as const,
  },
  {
    id: "dollar-commodities",
    fact: "Oil, gold, copper, wheat — virtually every major commodity is dollar-denominated",
    detail:
      "When Brazil buys oil from Saudi Arabia, they transact in US dollars. When China imports copper from Chile, dollars change hands. American monetary policy is felt in every corner of the world.",
    source: "BIS Quarterly Review 2026",
    color: "red" as const,
  },
  {
    id: "dollar-debt",
    fact: "Over 50% of all international debt is denominated in US dollars",
    detail:
      "Governments, corporations, and banks from Istanbul to Jakarta borrow in dollars. This creates a structural demand for dollars that underpins the currency's reserve status.",
    source: "Bank for International Settlements 2026",
    color: "blue" as const,
  },
  {
    id: "dollar-seigniorage",
    fact: 'The US earns "seigniorage" — profit from issuing the world\'s money',
    detail:
      "When the Federal Reserve issues dollars, it earns an interest-free loan from the world. Economists estimate the exorbitant privilege saves the US $100–$500 billion annually in borrowing costs.",
    source: "Federal Reserve Research / IMF Working Papers",
    color: "gold" as const,
  },
  {
    id: "dollar-sanctions",
    fact: "Dollar dominance gives the US unparalleled geopolitical leverage",
    detail:
      "Being cut off from the dollar system — via SWIFT sanctions — is among the most powerful economic weapons available. Iran, Russia, and North Korea have all felt this power acutely.",
    source: "US Treasury / OFAC",
    color: "red" as const,
  },
  {
    id: "dollar-fed",
    fact: "The Federal Reserve is effectively the world's central bank",
    detail:
      "When the Fed raises interest rates, capital flows globally shift. When the Fed cuts, emerging market debt becomes cheaper. No other institution holds this degree of global financial authority.",
    source: "Bank for International Settlements / Federal Reserve",
    color: "blue" as const,
  },
  {
    id: "dollar-fed-lender",
    fact: "The Federal Reserve as Global Lender of Last Resort",
    detail: "During crises, the Federal Reserve serves as the de facto international lender of last resort. In response to COVID-19, it extended $450 billion in dollar liquidity swap lines to foreign central banks. No international body, IMF mechanism, or other central bank possesses the capacity to stabilize the global financial system in this way.",
    source: "Dallas Fed 2024",
    color: "gold" as const,
  },
];

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
      'Despite repeated predictions of "de-dollarization," the dollar\'s share of global reserves remains above 57.4%, SWIFT dominance holds above 40%, and no credible rival has emerged. The dollar endures.',
  },
];

export default async function DollarDominancePage() {
  // Start by resolving the request locale, then build the translated timeline,
  // facts, and labels from that single value.
  const locale = await getServerLocale();
  const breadcrumbEconomy = locale === "ro" ? "Economie" : "Economy";
  const pageLabel = locale === "ro" ? "Dominația Dolarului" : "Dollar Dominance";
  const sharedFacts = getDollarFacts(locale);
  const overviewParagraphs = getDollarOverviewParagraphs(locale);
  // These page-only facts explain dollar dominance from angles that are not
  // reused on the other economy pages.
  const localFacts =
    locale === "ro"
      ? [
          {
            id: "exorbitant-privilege",
            fact: "Dolarul ca Monedă de Rezervă Globală: Privilegiul Exorbitant",
            detail: "Dolarul constituie aproximativ 60% din rezervele valutare globale și este utilizat în 88% din tranzacțiile internaționale. Acest 'privilegiu exorbitant' permite SUA să se împrumute la rate mai mici în propria monedă.",
            source: "Federal Reserve / BIS 2026",
          },
          {
            ...DOLLAR_EXTENDED_FACTS[1],
            fact: "Peste 65 de țări își fixează sau leagă strâns moneda de dolarul american",
            detail:
              "De la Panama, care folosește USD ca mijloc legal de plată, până la Arabia Saudită, zeci de națiuni își ancorează sistemele monetare de dolar, amplificându-i influența cu mult dincolo de granițele SUA.",
          },
          {
            ...DOLLAR_EXTENDED_FACTS[1],
            fact: "Petrolul, aurul, cuprul, grâul — practic orice marfă majoră este denominată în dolari",
            detail:
              "Când Brazilia cumpără petrol din Arabia Saudită, tranzacționează în dolari americani. Când China importă cupru din Chile, schimbă dolari. Politica monetară americană se simte în fiecare colț al lumii.",
          },
          {
            ...DOLLAR_EXTENDED_FACTS[2],
            fact: "Peste 50% din datoria internațională este denominată în dolari americani",
            detail:
              "Guverne, corporații și bănci de la Istanbul la Jakarta se împrumută în dolari. Asta creează o cerere structurală pentru dolari care susține statutul de monedă de rezervă.",
          },
          {
            ...DOLLAR_EXTENDED_FACTS[3],
            fact: "SUA câștigă «seigniorage» — profit din emiterea banilor lumii",
            detail:
              "Când Federal Reserve emite dolari, primește practic un împrumut fără dobândă din partea restului lumii. Economiștii estimează că acest privilegiu salvează SUA între 100 și 500 de miliarde de dolari anual la costurile de finanțare.",
          },
          {
            ...DOLLAR_EXTENDED_FACTS[4],
            fact: "Dominația dolarului oferă SUA o influență geopolitică neegalată",
            detail:
              "A fi tăiat de la sistemul dolarului, prin sancțiuni SWIFT, este una dintre cele mai puternice arme economice disponibile. Iranul, Rusia și Coreea de Nord au simțit direct această putere.",
          },
          {
            ...DOLLAR_EXTENDED_FACTS[5],
            fact: "Federal Reserve este, în practică, banca centrală a lumii",
            detail:
              "Când Fed ridică dobânzile, fluxurile globale de capital se mută. Când Fed le reduce, datoria piețelor emergente devine mai ieftină. Nicio altă instituție nu deține o asemenea autoritate financiară globală.",
          },
          {
            id: "dollar-fed-lender",
            fact: "Federal Reserve ca Împrumutător Global de Ultimă Instanță",
            detail: "În perioadele de criză, Fed acționează ca împrumutătorul internațional de ultimă instanță de facto. În timpul crizei COVID-19 (martie 2020), Fed a extins liniile de swap valutar cu 450 de miliarde de dolari pentru băncile centrale străine. Nicio altă instituție sau mecanism FMI nu are capacitatea de a asigura această lichiditate în dolari, stabilizând sistemul mondial în 2008, 2011 și 2020.",
            source: "Dallas Fed 2024",
          },
        ]
      : DOLLAR_EXTENDED_FACTS;
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
            event: "Dolarul încă domnește la 82 de ani",
            description:
              "În ciuda previziunilor repetate despre «de-dolarizare», ponderea dolarului în rezervele globale rămâne peste 57.4%, dominația SWIFT rămâne peste 40% și nu a apărut niciun rival credibil.",
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
            "Dolarul american este sistemul de operare al economiei globale. 57.4% din toate rezervele valutare. Peste 40% din comerțul mondial. Fiecare baril de petrol. O domnie de 82 de ani care nu a fost niciodată amenințată serios.",
          heroStats: [
            { value: "57.4%", label: "din rezervele FX globale", source: "IMF COFER 2026" },
            { value: "40%+", label: "din tranzacțiile SWIFT", source: "SWIFT 2026" },
            { value: "65+", label: "țări legate de USD", source: "IMF 2026" },
          ],
          overviewTitle: "Privilegiul exorbitant",
          chartTitle: "Rezerve valutare globale pe monedă (2026)",
          timelineTitle: "82 de ani de supremație a dolarului",
          timelineBody:
            "Dominația dolarului nu a fost accidentală — a fost construită prin politică deliberată, putere militară și forță economică de-a lungul a peste opt decenii.",
          detailTitle: "Avantajul dolarului — în detaliu",
          calloutTitle: "Despre «de-dolarizare» — o verificare a realității",
          calloutP1:
            "În fiecare deceniu de la Bretton Woods, analiștii au prezis înlocuirea iminentă a dolarului. Lansarea euro în 1999, ascensiunea Chinei în anii 2000, propunerile BRICS în anii 2020 — fiecare a fost prezentată cu încredere drept clopotul funerar al dolarului. De fiecare dată, ponderea dolarului în rezervele globale a scăzut modest, apoi s-a stabilizat.",
          calloutP2:
            "Motivul este structural: niciun rival nu oferă combinația de piețe lichide și profunde, stat de drept, stabilitate politică, putere militară și efecte de rețea pe care le oferă dolarul. Renminbi-ul chinez nu este liber convertibil. Euro nu are un sprijin fiscal unificat. Poziția dolarului nu este doar obișnuință — este alegerea rațională a oricărui bancher central rațional de pe Pământ.",
          calloutConclusion:
            "Dolarul rezistă — nu din inerție, ci pentru că nu există nimic mai bun.",
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
            "The US dollar is the operating system of the global economy. 57.4% of all foreign exchange reserves. 40%+ of global trade. Every barrel of oil. An 82-year reign that has never been seriously threatened.",
          heroStats: [
            { value: "57.4%", label: "of global FX reserves", source: "IMF COFER 2026" },
            { value: "40%+", label: "of SWIFT transactions", source: "SWIFT 2026" },
            { value: "65+", label: "countries pegged to USD", source: "IMF 2026" },
          ],
          overviewTitle: "The Exorbitant Privilege",
          chartTitle: "Global Foreign Exchange Reserves by Currency (2026)",
          timelineTitle: "82 Years of Dollar Supremacy",
          timelineBody:
            "The dollar's dominance was not accidental — it was built through deliberate policy, military power, and economic strength over eight decades.",
          detailTitle: "The Dollar Advantage — In Detail",
          calloutTitle: "On “De-Dollarization” — A Reality Check",
          calloutP1:
            "Every decade since Bretton Woods, analysts have predicted the dollar's imminent replacement. The Euro launch in 1999, China's rise in the 2000s, BRICS proposals in the 2020s — each was confidently declared the dollar's death knell. Each time, the dollar's share of global reserves declined modestly, then stabilized.",
          calloutP2:
            "The reason is structural: no rival offers the combination of deep liquid markets, rule of law, political stability, military power, and network effects that the dollar provides. The Chinese renminbi is not freely convertible. The Euro lacks a unified fiscal backstop. The dollar's position is not merely habitual — it is the rational choice of every rational central banker on Earth.",
          calloutConclusion:
            "The dollar endures — not because of inertia, but because nothing better exists.",
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
                source="IMF COFER Q4 2023 — allocated reserves"
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

          {/* Extended facts */}
          <section className="border-t border-white/5 pt-32">
            <h2 className="macro-section-title text-[clamp(24px,4vw,60px)] mb-16">
              {copy.detailTitle}
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

          {/* Dollar Bill Photo Strip */}
          <div className="mt-24 mb-8 grid grid-cols-3 gap-3">
            {[
              { src: SITE_IMAGES.economyPaperMoney, alt: "American paper currency denominations" },
              { src: SITE_IMAGES.economyDollarObverse, alt: "United States one dollar bill — obverse" },
              { src: SITE_IMAGES.economyDollarReverse, alt: "United States one dollar bill — reverse" },
            ].map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </div>
            ))}
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
