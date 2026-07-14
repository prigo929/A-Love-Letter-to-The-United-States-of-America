// ─── The Continental Power Grid ───────────────────────────────────────────────
// A deep-dive subpage on the North American electric grid: three vast synchronized
// interconnections, the largest machine ever built, and an interactive map of the
// extra-high-voltage transmission backbone, coloured by voltage (HIFLD data).

import Link from "next/link";
import type { Metadata } from "next";
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
} from "@/components/shared/CinematicSystem";
import { NetworkMap } from "@/components/infrastructure/NetworkMap";
import { SerifLede, Reveal } from "@/components/infrastructure/InfraMotion";
import { SITE_IMAGES } from "@/lib/site-images";
import powerData from "@/lib/data/powergrid-simplified.json";

const getPageMetadata = (locale: Locale): Metadata => ({
  title:
    locale === "ro"
      ? "Rețeaua Electrică Continentală | Infrastructură"
      : "The Continental Power Grid | Infrastructure",
  description:
    locale === "ro"
      ? "Cea mai mare mașină construită vreodată: trei interconexiuni uriașe, harta coloanei vertebrale de foarte înaltă tensiune și rețeaua care ține un continent aprins."
      : "The largest machine ever built: three vast interconnections, a map of the extra-high-voltage backbone, and the network that keeps a continent lit.",
  alternates: { canonical: "/infrastructure/power-grid" },
});

export async function generateMetadata() {
  const locale = await getServerLocale();
  return getPageMetadata(locale);
}

export default async function PowerGridPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        breadcrumbSection: "Infrastructură",
        breadcrumbPage: "Rețeaua Electrică",
        heroEyebrow: "Rețeaua Electrică Continentală",
        heroLead: "CEA MAI MARE MAȘINĂ",
        heroAccent: "CONSTRUITĂ VREODATĂ.",
        heroBody:
          "Privită de sus, America noaptea este o hartă a propriei sale rețele electrice. Fiecare punct de lumină este alimentat de aceeași mașină interconectată: cea mai mare și mai complexă structură construită vreodată de om.",
        heroStats: [
          { value: "3", label: "interconexiuni uriașe — Est, Vest și Texas" },
          { value: "60 Hz", label: "frecvența pe care întreaga rețea o menține, în fiecare secundă" },
          { value: "~11,000", label: "centrale electrice la scară industrială care alimentează rețeaua" },
        ],
        storyTitle: "O singură mașină, de mărimea unui continent",
        lede: "Electricitatea nu poate fi depozitată la scară. Deci rețeaua trebuie să producă, în fiecare clipă, exact cât consumă un continent — nici mai mult, nici mai puțin.",
        storyP1:
          "Când aprinzi o lumină în Ohio, undeva o turbină se învârte imperceptibil mai repede ca să compenseze. Întreaga rețea de est, din Florida până în Manitoba, se rotește în perfectă sincronie la 60 de cicluri pe secundă, un singur organism electric întins peste jumătate de continent.",
        storyP2:
          "Această coloană vertebrală de foarte înaltă tensiune poartă energia pe sute de kilometri, de la barajele și centralele îndepărtate până la orașe. Cu cât tensiunea este mai mare, cu atât pierderile sunt mai mici: de aceea liniile de 500 de kilovolți sunt arterele care fac posibilă o piață energetică continentală.",
        numbersTitle: "Anatomia rețelei",
        numbersStats: [
          { value: "500 kV+", label: "tensiunea arterelor superioare ale coloanei vertebrale (500 kV și 765 kV)" },
          { value: "~380,000 mi", label: "de linii de transport de înaltă tensiune (69 kV - 765 kV)" },
          { value: "5,447", label: "substații electrice majore conectate în rețea" },
        ],
        mapTitle: "Rețeaua electrică și substațiile",
        mapIntro:
          "Rețeaua de transport de la sub-transport (sub 100 kV) până la foarte înaltă tensiune (765 kV), colorată după tensiune. Punctele portocalii reprezintă substații de transport majore. Atinge sau treci peste o linie pentru detalii.",
        mapLabels: {
          eraLabel: "Rețea",
          corridorsLabel: "Treci peste o linie pentru tensiunea ei",
          lengthLabel: "Lungime",
          openedLabel: "În serviciu",
          hint: "Ctrl + scroll pentru zoom · trageți pentru panoramare",
          zoomHint: "Ctrl + scroll pentru zoom · trageți pentru panoramare",
        },
        bandTitle: "Echilibrul de fiecare secundă",
        bandP1:
          "Nicio altă mașină nu este solicitată să fie perfectă în fiecare moment. Producția și consumul trebuie să se potrivească instantaneu, altfel frecvența alunecă și rețeaua se poate prăbuși.",
        bandP2:
          "Operatorii veghează la fiecare secundă a fiecărei zile, pornind și oprind centrale în avans, prezicând cererea până la nivel de megawați. Este un act de echilibru continental care nu se oprește niciodată, și pe care aproape nimeni nu-l observă vreodată.",
        bandAlt: "Rețeaua urbană iluminată a orașului Chicago la amurg",
        interTitle: "Cele trei rețele",
        interIntro:
          "America de Nord nu are o singură rețea, ci trei mașini gigantice care se ating abia prin câteva legături de curent continuu.",
        interFacts: [
          { fact: "Interconexiunea de Est este cea mai mare mașină sincronizată din lume.", detail: "De la Coasta de Est până la poalele Munților Stâncoși și din Florida până în centrul Canadei, totul se rotește la unison. Sute de milioane de oameni, o singură frecvență." },
          { fact: "Texasul își conduce propria rețea, ERCOT, aproape singur.", detail: "În mare parte deconectat de restul țării, în parte pentru a rămâne în afara reglementării federale. Este singurul stat cu o rețea proprie, la scară de interconexiune." },
          { fact: "Interconexiunea de Vest leagă Munții Stâncoși de Pacific.", detail: "Coordonează hidrocentralele din nord-vest, energia solară din sud-vest și orașe la peste 1.500 de kilometri distanță, într-o singură undă sincronizată." },
          { fact: "Legăturile de curent continuu cos rețelele între ele.", detail: "Câteva stații de conversie de mari dimensiuni transferă energie între cele trei interconexiuni, singurele porți dintr-o mașină altfel împărțită în trei." },
        ],
        gaTitle: "Curentul invizibil",
        gaP:
          "Rețeaua este infrastructura pe care o folosim cel mai mult și la care ne gândim cel mai puțin. Rulează neîntrerupt de peste un secol, o pânză de cupru și oțel atât de fiabilă încât singurele dăți când o observăm sunt rarele momente în care se stinge.",
        quote:
          "Rețeaua electrică este poate cea mai mare realizare de inginerie a secolului XX — o singură mașină de mărimea unei națiuni, pe care lumea o ține pornită.",
        quoteAttribution: "Despre rețeaua electrică americană",
        quoteTitle: "Mașina care nu doarme niciodată",
        prevLink: "↑ Prezentare Infrastructură",
        nextLink: "Marile Apeducte →",
      }
    : {
        breadcrumbSection: "Infrastructure",
        breadcrumbPage: "The Power Grid",
        heroEyebrow: "The Continental Power Grid",
        heroLead: "THE LARGEST MACHINE",
        heroAccent: "EVER BUILT.",
        heroBody:
          "Seen from above, America at night is a map of its own power grid. Every point of light is fed by the same interconnected machine: the largest and most complex structure ever built by human hands.",
        heroStats: [
          { value: "3", label: "vast interconnections — East, West, and Texas" },
          { value: "60 Hz", label: "the frequency the entire grid holds, every second" },
          { value: "~11,000", label: "utility-scale power plants feeding the grid" },
        ],
        storyTitle: "One Machine, the Size of a Continent",
        lede: "Electricity cannot be stored at scale. So the grid must generate, at every instant, exactly as much as a continent consumes — no more, no less.",
        storyP1:
          "When you switch on a light in Ohio, somewhere a turbine spins imperceptibly faster to make up for it. The entire Eastern grid, from Florida to Manitoba, turns in perfect lockstep at sixty cycles a second, a single electric organism stretched across half a continent.",
        storyP2:
          "That extra-high-voltage backbone carries power hundreds of miles, from distant dams and plants to the cities. The higher the voltage, the smaller the loss: which is why the 500-kilovolt lines are the arteries that make a continental energy market possible at all.",
        numbersTitle: "The Anatomy of the Grid",
        numbersStats: [
          { value: "500 kV+", label: "the voltage of the backbone's highest arteries (500 kV & 765 kV)" },
          { value: "~380,000 mi", label: "of high-voltage transmission line (69 kV to 765 kV)" },
          { value: "5,447", label: "major electrical substations mapping the grid nodes" },
        ],
        mapTitle: "The Transmission Grid & Substations",
        mapIntro:
          "The transmission network from sub-transmission (under 100 kV) up to extra-high voltage (765 kV), colored by voltage. Orange dots represent major transmission substations. Hover or tap a line for details.",
        mapLabels: {
          eraLabel: "Grid",
          corridorsLabel: "Hover a line for its voltage",
          lengthLabel: "Length",
          openedLabel: "In service",
          hint: "Ctrl + scroll to zoom · drag to pan",
          zoomHint: "Ctrl + scroll to zoom · drag to pan",
        },
        bandTitle: "The Every-Second Balancing Act",
        bandP1:
          "No other machine is asked to be perfect at every moment. Generation and demand must match instantly, or the frequency drifts and the grid can collapse.",
        bandP2:
          "Operators watch every second of every day, starting and stopping plants ahead of need, forecasting demand down to the megawatt. It is a continental balancing act that never stops, and that almost no one ever notices.",
        bandAlt: "Chicago's illuminated urban grid at twilight",
        interTitle: "The Three Grids",
        interIntro:
          "North America does not have one grid but three giant machines, touching only through a handful of direct-current links.",
        interFacts: [
          { fact: "The Eastern Interconnection is the largest synchronized machine on Earth.", detail: "From the East Coast to the foot of the Rockies and from Florida into central Canada, it all turns as one. Hundreds of millions of people, a single frequency." },
          { fact: "Texas runs its own grid, ERCOT, almost alone.", detail: "Largely disconnected from the rest of the country, partly to stay outside federal regulation. It is the only state with a grid of its own, at interconnection scale." },
          { fact: "The Western Interconnection binds the Rockies to the Pacific.", detail: "It coordinates Northwest hydropower, Southwest solar, and cities a thousand miles apart into one synchronized wave." },
          { fact: "Direct-current links stitch the grids together.", detail: "A few large converter stations pass power between the three interconnections, the only gateways in an otherwise three-part machine." },
        ],
        gaTitle: "The Invisible Current",
        gaP:
          "The grid is the infrastructure we use most and think about least. It has run continuously for over a century, a web of copper and steel so reliable that the only time we notice it is the rare moment it goes dark.",
        quote:
          "The electric grid may be the greatest engineering achievement of the twentieth century — a single machine the size of a nation, that the world keeps running.",
        quoteAttribution: "On the American electric grid",
        quoteTitle: "The Machine That Never Sleeps",
        prevLink: "↑ Infrastructure Overview",
        nextLink: "The Great Aqueducts →",
      };

  const gridEra = [
    { id: "grid", label: { en: "The Grid", ro: "Rețeaua" }, sublabel: { en: "Today", ro: "Prezent" } },
  ];

  return (
    <>
      <MacroStyles />
      <MacroHero
        imageSrc={SITE_IMAGES.homeUsaAtNightFromSpace}
        imageAlt={isRo ? "Statele Unite noaptea, văzute din spațiu" : "The United States at night, seen from space"}
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
          {/* ── Origin ── */}
          <section>
            <h2 className="macro-section-title mb-12">{copy.storyTitle}</h2>
            <SerifLede className="mb-12 max-w-5xl">{copy.lede}</SerifLede>
            <div className="grid gap-10 md:grid-cols-2">
              <Reveal><p className="macro-body">{copy.storyP1}</p></Reveal>
              <Reveal delay={0.12}><p className="macro-body">{copy.storyP2}</p></Reveal>
            </div>
          </section>

          {/* ── By the numbers ── */}
          <section className="border-t border-white/5 pt-24">
            <h2 className="macro-section-title mb-16">{copy.numbersTitle}</h2>
            <div className="grid gap-16 border-t border-[#E8B923]/30 pt-16 sm:grid-cols-3">
              {copy.numbersStats.map((s) => (
                <MacroStat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </section>

          {/* ── Transmission map ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">{isRo ? "Harta rețelei" : "The Grid Map"}</span>
            <h2 className="macro-section-title mb-6 mt-6">{copy.mapTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.mapIntro}</p>
            <NetworkMap
              locale={locale}
              eras={gridEra}
              routes={[]}
              nodes={[]}
              accent="#E8B923"
              backgroundNetwork
              variant="power"
              backgroundGeoms={powerData as unknown as Record<string, { segments: [number, number][][]; miles: number }>}
              hideEraToggle
              initialEra="grid"
              labels={copy.mapLabels}
            />
          </section>

          {/* ── Full-bleed band ── */}
          <InfrastructureBand imageSrc={SITE_IMAGES.cities.chicagoTwilight} imageAlt={copy.bandAlt} fullBleed>
            <h2 className="macro-section-title mb-6">{copy.bandTitle}</h2>
            <p className="macro-body max-w-4xl">{copy.bandP1}</p>
            <p className="macro-body mt-4 max-w-4xl">{copy.bandP2}</p>
          </InfrastructureBand>

          {/* ── The three grids ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">{isRo ? "Interconexiuni" : "Interconnections"}</span>
            <h2 className="macro-section-title mb-6 mt-6">{copy.interTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.interIntro}</p>
            <div className="grid gap-16 md:grid-cols-2">
              {copy.interFacts.map((f) => (
                <MacroFact key={f.fact} fact={f.fact} detail={f.detail} />
              ))}
            </div>
          </section>

          {/* ── The invisible current ── */}
          <section className="border-t border-white/5 pt-24">
            <div className="max-w-3xl">
              <span className="macro-eyebrow">{isRo ? "Fiabilitate" : "Reliability"}</span>
              <h3 className="mb-6 mt-4 font-macro-display text-3xl font-black text-white">{copy.gaTitle}</h3>
              <p className="macro-body leading-relaxed text-white/70">{copy.gaP}</p>
            </div>
          </section>

          <div className="border-t border-white/5 pb-8 pt-24">
            <QuoteBlock quote={copy.quote} attribution={copy.quoteAttribution} title={copy.quoteTitle} variant="dark" />
          </div>

          {/* ── Nav ── */}
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-16">
            <Link href="/infrastructure" className="font-macro-mono text-sm uppercase tracking-widest text-white/50 transition-colors hover:text-white">
              {copy.prevLink}
            </Link>
            <Link href="/infrastructure/aqueducts-waterways" className="font-macro-mono text-sm uppercase tracking-widest text-white/50 transition-colors hover:text-white">
              {copy.nextLink}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
