// ─── Dollar Dominance Sub-Page ────────────────────────────────────────────────
// Deep-dive page about why the US dollar still anchors the global economy.
//
// Beginner guide:
// - Shared facts and overview paragraphs come from lib/data/economy-data.ts
// - This file decides page structure and page-specific content blocks
// - To change the hero photo, update SITE_IMAGES.economyDollar below

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FactCard } from "@/components/sections/FactCard";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { DollarReserveChart } from "@/components/data/DollarMarketCharts";
import { getServerLocale } from "@/lib/i18n/server";
import {
  DOLLAR_RESERVE_SHARE,
  getDollarFacts,
  getDollarOverviewParagraphs,
} from "@/lib/data/economy-data";
import { SITE_IMAGES } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dollar Dominance | Economy | America: The Greatest Nation",
  description:
    "The US dollar: 57% of global FX reserves, the Petrodollar system, Bretton Woods to today. The world's reserve currency and its extraordinary advantages for America.",
  alternates: { canonical: "/economy/dollar-dominance" },
};

const DOLLAR_EXTENDED_FACTS = [
  // Extra facts that belong only to this page.
  {
    id: "dollar-countries",
    fact: "Over 65 countries peg or tightly link their currency to the US dollar",
    detail:
      "From Panama (which uses USD as legal tender) to Saudi Arabia, dozens of nations anchor their monetary systems to the dollar — amplifying its global reach far beyond US borders.",
    source: "IMF Annual Report on Exchange Rate Arrangements 2024",
    color: "gold" as const,
  },
  {
    id: "dollar-commodities",
    fact: "Oil, gold, copper, wheat — virtually every major commodity is dollar-denominated",
    detail:
      "When Brazil buys oil from Saudi Arabia, they transact in US dollars. When China imports copper from Chile, dollars change hands. American monetary policy is felt in every corner of the world.",
    source: "BIS Quarterly Review 2024",
    color: "red" as const,
  },
  {
    id: "dollar-debt",
    fact: "Over 50% of all international debt is denominated in US dollars",
    detail:
      "Governments, corporations, and banks from Istanbul to Jakarta borrow in dollars. This creates a structural demand for dollars that underpins the currency's reserve status.",
    source: "Bank for International Settlements 2024",
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
    year: 2024,
    event: "Dollar Still Reigns at 80 Years",
    description:
      'Despite repeated predictions of "de-dollarization," the dollar\'s share of global reserves remains above 57%, SWIFT dominance holds above 40%, and no credible rival has emerged. The dollar endures.',
  },
];

export default async function DollarDominancePage() {
  const locale = await getServerLocale();
  const breadcrumbEconomy = locale === "ro" ? "Economie" : "Economy";
  const pageLabel = locale === "ro" ? "Dominația Dolarului" : "Dollar Dominance";
  const sharedFacts = getDollarFacts(locale);
  const overviewParagraphs = getDollarOverviewParagraphs(locale);
  const localFacts =
    locale === "ro"
      ? [
          {
            ...DOLLAR_EXTENDED_FACTS[0],
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
        ]
      : DOLLAR_EXTENDED_FACTS;
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
            event: "Dolarul încă domnește la 80 de ani",
            description:
              "În ciuda previziunilor repetate despre «de-dolarizare», ponderea dolarului în rezervele globale rămâne peste 57%, dominația SWIFT rămâne peste 40% și nu a apărut niciun rival credibil.",
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
            "Dolarul american este sistemul de operare al economiei globale. 57% din toate rezervele valutare. Peste 40% din comerțul mondial. Fiecare baril de petrol. O domnie de 80 de ani care nu a fost niciodată amenințată serios.",
          heroStats: [
            { value: "57.4%", label: "din rezervele FX globale", source: "IMF COFER 2024" },
            { value: "40%+", label: "din tranzacțiile SWIFT", source: "SWIFT 2024" },
            { value: "65+", label: "țări legate de USD", source: "IMF 2024" },
          ],
          overviewTitle: "Privilegiul exorbitant",
          chartTitle: "Rezerve valutare globale pe monedă (2024)",
          timelineTitle: "80 de ani de supremație a dolarului",
          timelineBody:
            "Dominația dolarului nu a fost accidentală — a fost construită prin politică deliberată, putere militară și forță economică de-a lungul a opt decenii.",
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
            "The US dollar is the operating system of the global economy. 57% of all foreign exchange reserves. 40%+ of global trade. Every barrel of oil. An 80-year reign that has never been seriously threatened.",
          heroStats: [
            { value: "57.4%", label: "of global FX reserves", source: "IMF COFER 2024" },
            { value: "40%+", label: "of SWIFT transactions", source: "SWIFT 2024" },
            { value: "65+", label: "countries pegged to USD", source: "IMF 2024" },
          ],
          overviewTitle: "The Exorbitant Privilege",
          chartTitle: "Global Foreign Exchange Reserves by Currency (2024)",
          timelineTitle: "80 Years of Dollar Supremacy",
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
      {/* Hero */}
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image
          src={SITE_IMAGES.economyDollar}
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
            {copy.heroLead}
            <br />
            <span className="text-glory-gold">{copy.heroAccent}</span>
          </h1>
          <p className="max-w-2xl font-body text-lg text-white/65 leading-relaxed">
            {copy.heroBody}
          </p>

          {/* Key dollar stats
              Short highlights rendered from a small inline array because they
              are unique to this hero block. */}
          <div className="mt-8 flex flex-wrap gap-6">
            {copy.heroStats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-xl border border-glory-gold/20 bg-glory-gold/5 px-5 py-3"
              >
                <p className="font-hero text-3xl text-glory-gold">
                  {stat.value}
                </p>
                <p className="font-body text-sm text-white/65">{stat.label}</p>
                <p className="font-body text-xs text-white/35">{stat.source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
          {/* Overview
              Long-form paragraphs pulled from the shared economy data file. */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.overviewTitle}
            </h2>
            {overviewParagraphs.map((para, i) => (
              <p
                key={i}
                className="mb-5 font-body text-lg leading-relaxed text-white/65"
              >
                {para}
              </p>
            ))}
          </section>

          {/* Reserve chart
              Reusable chart component driven by shared reserve-share data. */}
          <section>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <DollarReserveChart
                data={DOLLAR_RESERVE_SHARE}
                title={copy.chartTitle}
                source="IMF COFER Q4 2023 — allocated reserves"
              />
            </div>
          </section>

          {/* Timeline
              A visual history section generated from the DOLLAR_TIMELINE array above. */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.timelineTitle}
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {copy.timelineBody}
            </p>
            <div className="relative space-y-0">
              {/* Vertical line */}
              <div className="absolute left-[52px] top-0 bottom-0 w-px bg-glory-gold/20 hidden sm:block" />

              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-5 pb-8">
                  {/* Year bubble */}
                  <div className="relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-2 border-glory-gold/40 bg-navy-dark">
                    <span className="font-hero text-sm text-glory-gold leading-none">
                      {item.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-2xl border border-white/8 bg-navy-mid p-5">
                    <h3 className="mb-2 font-display text-lg font-semibold text-white">
                      {item.event}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-white/55">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Extended facts
              Combines shared facts from economy-data.ts with page-local facts. */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.detailTitle}
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

          {/* Dedollarization callout
              A highlighted editorial block rather than a chart or data table. */}
          <section className="rounded-2xl border border-glory-red/20 bg-glory-red/5 p-6 md:p-8">
            <h2 className="mb-4 font-display text-xl font-semibold text-white">
              {copy.calloutTitle}
            </h2>
            <p className="mb-4 font-body text-base leading-relaxed text-white/65">
              {copy.calloutP1}
            </p>
            <p className="font-body text-base leading-relaxed text-white/65">
              {copy.calloutP2}
            </p>
            <p className="mt-4 font-body text-sm font-semibold text-glory-gold">
              {copy.calloutConclusion}
            </p>
          </section>

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

          {/* Nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link
              href="/economy/startups-venture-capital"
              className="font-body text-sm text-white/50 hover:text-white transition-colors"
            >
              {copy.prevLink}
            </Link>
            <Link
              href="/economy/trade-and-exports"
              className="font-body text-sm font-semibold text-glory-gold hover:text-glory-gold-dark transition-colors"
            >
              {copy.nextLink}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
