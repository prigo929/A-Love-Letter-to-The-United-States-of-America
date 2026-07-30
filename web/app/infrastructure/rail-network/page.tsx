// ─── The Continental Rail Network ─────────────────────────────────────────────
// From the golden spike at Promontory to the busiest freight arteries on Earth —
// with an interactive era map (1869 race · the great expansion · modern Class I).

import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import type { Locale } from "@/lib/i18n/config";
import { getServerLocale } from "@/lib/i18n/server";
import {
  MacroStyles,
  MacroHero,
  MacroStat,
  MacroFact,
  InfrastructureBand,
  FullBleed,
} from "@/components/shared/CinematicSystem";
import { NetworkMap } from "@/components/infrastructure/NetworkMap";
import { SerifLede, Reveal } from "@/components/infrastructure/InfraMotion";
import {
  RAIL_ERAS,
  RAIL_ROUTES,
  RAIL_NODES,
} from "@/lib/data/infrastructure-network-data";
import railData from "@/lib/data/rail-simplified.json";
import { SITE_IMAGES } from "@/lib/site-images";

const getPageMetadata = (locale: Locale) => ({
  title:
    locale === "ro"
      ? "Rețeaua Feroviară Continentală | Infrastructură"
      : "The Continental Rail Network | Infrastructure",
  description:
    locale === "ro"
      ? "De la cuiul de aur din 1869 la cele mai aglomerate artere de marfă de pe Pământ: cursa transcontinentală, marea expansiune și titanii feroviari de azi, pe o hartă interactivă."
      : "From the golden spike of 1869 to the busiest freight arteries on Earth: the transcontinental race, the great expansion, and today's rail titans on an interactive map.",
  alternates: { canonical: "/infrastructure/rail-network" },
});

export async function generateMetadata() {
  const locale = await getServerLocale();
  return getPageMetadata(locale);
}

export default async function RailNetworkPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        breadcrumbSection: "Infrastructură",
        breadcrumbPage: "Rețeaua Feroviară",
        heroEyebrow: "Rețeaua Feroviară Continentală",
        heroLead: "DOUĂ OCEANE.",
        heroAccent: "O SINGURĂ CALE FERATĂ.",
        heroBody:
          "În 1869, două echipe care construiau una spre cealaltă s-au întâlnit într-un deșert din Utah și au bătut un cui de aur. Călătoria de la un ocean la altul s-a prăbușit de la șase luni la o săptămână, iar America a devenit, peste noapte, o singură țară.",
        heroStats: [
          { value: "1,776 mi", label: "de cale ferată nouă până în 1869" },
          { value: "10 mi", label: "așezate într-o singură zi: record" },
          { value: "140,000", label: "mile de rețea de marfă astăzi" },
        ],
        lede: "Autostrada a făcut continentul accesibil. Calea ferată l-a făcut, mai întâi, posibil.",
        storyTitle: "Cursa către Promontory",
        storyP1:
          "În plin Război Civil, Abraham Lincoln a semnat Pacific Railway Act din 1862, un pariu că o națiune care se destrăma putea, în același timp, să se lege singură cu șine de oțel. Central Pacific a pornit din Sacramento spre est, prin granitul Sierrei Nevada: cincisprezece tuneluri săpate cu pulbere neagră de circa 15.000 de muncitori chinezi, ierni întregi petrecute sub zăpadă.",
        storyP2:
          "Union Pacific a pornit din Omaha spre vest, prin Marile Câmpii, cu veterani ai războiului și imigranți irlandezi așezând câte o milă, apoi câte două, apoi, într-o singură zi de aprilie 1869, zece mile și 56 de picioare, un record care nu a fost egalat niciodată cu unelte de mână. Pe 10 mai 1869, la Promontory Summit, cele două linii s-au atins.",
        doneWord: "GATA.",
        doneLabel:
          "Telegrama de un singur cuvânt transmisă întregii națiuni în clipa în care ciocanul a atins cuiul de aur, pe 10 mai 1869. Au sunat clopote din San Francisco până în New York.",
        mapEyebrow: "Harta interactivă",
        mapTitle: "Trei epoci de oțel",
        mapBody:
          "Privește cele două linii din 1869 construind una spre cealaltă, expansiunea din anii 1880 și titanii de marfă de astăzi. Atinge un coridor pentru povestea lui.",
        mapLabels: {
          eraLabel: "Alege epoca",
          corridorsLabel: "Treci peste un coridor pentru detalii",
          lengthLabel: "Lungime",
          openedLabel: "Finalizată",
          hint: "În epoca 1869, cele două trasee se desenează unul către celălalt — exact cum s-au construit.",
          viewCorridors: "Rețele",
          viewTraffic: "Densitate",
          heatLow: "Linie simplă",
          heatHigh: "Mai multe linii",
          zoomHint: "Ctrl + scroll pentru zoom · trageți pentru panoramare",
        },
        chicagoEyebrow: "Nodul continentului",
        chicagoTitle: "Chicago: locul unde se întâlnesc toate șinele",
        chicagoBody:
          "Un sfert din traficul feroviar de marfă al Americii trece prin Chicago — aproximativ 500 de trenuri de marfă pe zi, punctul de schimb între rețelele estice și cele vestice încă din anii 1850. Niciun alt nod logistic de pe Pământ nu-i seamănă.",
        chicagoAlt: "Centrul orașului Chicago",
        freightEyebrow: "Titanii de marfă",
        freightTitle: "Cea mai eficientă rețea de marfă din lume",
        stats: [
          { value: "≈40%", label: "din tonele-milă de marfă pe distanțe lungi" },
          { value: "≈500 mi", label: "parcurse de o tonă cu un singur galon de combustibil" },
          { value: "≈300", label: "camioane înlocuite de un singur tren de marfă" },
        ],
        facts: [
          {
            fact: "Revoluția containerelor suprapuse",
            detail:
              "În 1984, primul tren cu containere așezate pe două niveluri a plecat din Los Angeles. Dublarea capacității fiecărui vagon a redus costurile cu o treime și a făcut din calea ferată americană coloana vertebrală a comerțului transpacific.",
          },
          {
            fact: "Moștenirea din 1869 lucrează și azi",
            detail:
              "Ruta Overland a Union Pacific urmează, pe sute de mile, chiar traseul trasat în anii 1860. La North Platte, Nebraska, se află Bailey Yard: cel mai mare triaj feroviar din lume, sortând 14.000 de vagoane în fiecare zi.",
          },
        ],
        quote: "Văd peste propriul meu continent calea ferată a Pacificului trecând peste fiecare barieră.",
        quoteAttribution: "Walt Whitman",
        quoteTitle: "„Passage to India”, 1871",
        prevLink: "← Autostrăzile Interstatale",
        nextLink: "↑ Prezentare Infrastructură",
      }
    : {
        breadcrumbSection: "Infrastructure",
        breadcrumbPage: "The Rail Network",
        heroEyebrow: "The Continental Rail Network",
        heroLead: "TWO OCEANS.",
        heroAccent: "ONE RAILROAD.",
        heroBody:
          "In 1869, two crews building toward each other met in a Utah desert and drove a golden spike. The coast-to-coast journey collapsed from six months to a week, and America became, overnight, a single country.",
        heroStats: [
          { value: "1,776 mi", label: "of new track by 1869" },
          { value: "10 mi", label: "laid in a single day: the record" },
          { value: "140,000", label: "miles of freight network today" },
        ],
        lede: "The highway made the continent reachable. The railroad first made it possible.",
        storyTitle: "The Race to Promontory",
        storyP1:
          "In the middle of the Civil War, Abraham Lincoln signed the Pacific Railway Act of 1862, a bet that a nation tearing itself apart could simultaneously bind itself together with steel. The Central Pacific struck east from Sacramento into Sierra Nevada granite: fifteen tunnels blasted with black powder by some 15,000 Chinese laborers, whole winters spent working beneath the snow.",
        storyP2:
          "The Union Pacific struck west from Omaha across the Plains, war veterans and Irish immigrants laying a mile a day, then two, then, on one April day in 1869, ten miles and 56 feet, a record never equaled by hand. On May 10, 1869, at Promontory Summit, the two lines touched.",
        doneWord: "DONE.",
        doneLabel:
          "The one-word telegram flashed to the entire nation the instant the hammer touched the golden spike, May 10, 1869. Bells rang from San Francisco to New York.",
        mapEyebrow: "The Interactive Map",
        mapTitle: "Three Ages of Steel",
        mapBody:
          "Watch the two lines of 1869 build toward each other, the great expansion of the 1880s, and today's freight titans. Touch a corridor for its story.",
        mapLabels: {
          eraLabel: "Choose the era",
          corridorsLabel: "Hover a corridor for its story",
          lengthLabel: "Length",
          openedLabel: "Completed",
          hint: "In the 1869 era the two routes draw toward each other — exactly as they were built.",
          viewCorridors: "Networks",
          viewTraffic: "Density",
          heatLow: "Single track",
          heatHigh: "Multi-track",
          zoomHint: "Ctrl + scroll to zoom · drag to pan",
        },
        chicagoEyebrow: "The Continental Junction",
        chicagoTitle: "Chicago: Where All the Rails Meet",
        chicagoBody:
          "A quarter of America's rail freight passes through Chicago — roughly 500 freight trains a day, the interchange between the eastern and western networks since the 1850s. No other logistics junction on Earth resembles it.",
        chicagoAlt: "Downtown Chicago",
        freightEyebrow: "The Freight Titans",
        freightTitle: "The World's Most Efficient Freight Network",
        stats: [
          { value: "≈40%", label: "of long-distance freight ton-miles" },
          { value: "≈500 mi", label: "one ton moved on a single gallon of fuel" },
          { value: "≈300", label: "trucks replaced by a single freight train" },
        ],
        facts: [
          {
            fact: "The double-stack revolution",
            detail:
              "In 1984 the first train carrying containers stacked two-high left Los Angeles. Doubling every railcar's capacity cut costs by a third and made American rail the backbone of transpacific trade.",
          },
          {
            fact: "The 1869 inheritance still works",
            detail:
              "Union Pacific's Overland Route follows the original 1860s survey for hundreds of miles. At North Platte, Nebraska, sits Bailey Yard: the largest railroad classification yard in the world, sorting 14,000 cars every day.",
          },
        ],
        quote: "I see over my own continent the Pacific railroad surmounting every barrier.",
        quoteAttribution: "Walt Whitman",
        quoteTitle: "“Passage to India,” 1871",
        prevLink: "← The Interstate Highways",
        nextLink: "↑ Infrastructure Overview",
      };

  return (
    <>
      <MacroStyles />
      <MacroHero
        imageSrc={SITE_IMAGES.infraGoldenSpike}
        imageAlt={isRo ? "Baterea cuiului de aur, Promontory, 1869" : "Driving the golden spike, Promontory, 1869"}
        eyebrow={copy.heroEyebrow}
        titleLead={copy.heroLead}
        titleAccent={copy.heroAccent}
        description={copy.heroBody}
        stats={copy.heroStats}
      />

      <div className="relative z-10 bg-[#000000] pb-32 pt-16">
        <div className="mx-auto mb-24 max-w-[1600px] px-6 md:px-12">
          <Breadcrumb
            items={[
              { label: copy.breadcrumbSection, href: "/infrastructure" },
              { label: copy.breadcrumbPage },
            ]}
          />
        </div>

        <div className="mx-auto max-w-[1600px] space-y-40 px-6 md:space-y-48 md:px-12">
          {/* ── The race ── */}
          <section>
            <h2 className="macro-section-title mb-12">{copy.storyTitle}</h2>
            <SerifLede className="mb-12 max-w-5xl">{copy.lede}</SerifLede>
            <div className="grid gap-10 md:grid-cols-2">
              <Reveal><p className="macro-body">{copy.storyP1}</p></Reveal>
              <Reveal delay={0.12}><p className="macro-body">{copy.storyP2}</p></Reveal>
            </div>
          </section>

          {/* ── "DONE." pull moment ── */}
          <section className="border-t border-white/5 pt-24">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <p className="font-macro-display text-[clamp(90px,18vw,260px)] font-black leading-none tracking-tighter text-[#E8B923]">
                {copy.doneWord}
              </p>
              <p className="macro-body mt-8 max-w-3xl">{copy.doneLabel}</p>
            </div>
          </section>

          {/* ── Interactive map ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">{copy.mapEyebrow}</span>
            <h2 className="macro-section-title mb-8 mt-6">{copy.mapTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.mapBody}</p>
            <FullBleed>
  <NetworkMap
                locale={locale}
                eras={RAIL_ERAS}
                routes={RAIL_ROUTES.filter((r) => r.era !== "modern" || !["bnsf-transcon", "up-overland", "bnsf-northern", "up-sunset"].includes(r.id))}
                nodes={RAIL_NODES}
                accent="#E8B923"
                backgroundNetwork
                variant="rail"
                backgroundGeoms={railData as unknown as Record<string, { segments: [number, number][][]; miles: number; tracks?: number }>}
                labels={copy.mapLabels}
              />
            </FullBleed>
          </section>

          {/* ── Chicago junction ── */}
          <InfrastructureBand imageSrc={SITE_IMAGES.homeChicagoDowntownPortrait} imageAlt={copy.chicagoAlt} fullBleed>
            <span className="macro-eyebrow">{copy.chicagoEyebrow}</span>
            <h2 className="macro-section-title mb-6 mt-4">{copy.chicagoTitle}</h2>
            <p className="macro-body max-w-4xl">{copy.chicagoBody}</p>
          </InfrastructureBand>

          {/* ── Freight titans ── */}
          <section>
            <span className="macro-eyebrow">{copy.freightEyebrow}</span>
            <h2 className="macro-section-title mb-16 mt-6">{copy.freightTitle}</h2>
            <div className="grid gap-16 border-t border-[#E8B923]/30 pt-16 sm:grid-cols-3">
              {copy.stats.map((s) => (
                <MacroStat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
            <div className="mt-20 grid gap-16 md:grid-cols-2">
              {copy.facts.map((f) => (
                <MacroFact key={f.fact} fact={f.fact} detail={f.detail} />
              ))}
            </div>
          </section>

          <div className="border-t border-white/5 pb-8 pt-24">
            <QuoteBlock
              quote={copy.quote}
              attribution={copy.quoteAttribution}
              title={copy.quoteTitle}
              variant="dark"
            />
          </div>

          {/* ── Nav ── */}
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-16">
            <Link
              href="/infrastructure/highway-system"
              className="font-sans text-sm uppercase tracking-widest text-white/50 transition-colors hover:text-white"
            >
              {copy.prevLink}
            </Link>
            <Link
              href="/infrastructure"
              className="font-sans text-sm uppercase tracking-widest text-[#E8B923] transition-colors hover:text-white"
            >
              {copy.nextLink}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
