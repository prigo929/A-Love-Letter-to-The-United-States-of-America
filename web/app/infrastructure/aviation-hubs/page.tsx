// ─── The Global Aviation Hubs ─────────────────────────────────────────────────
// A deep-dive subpage on the American airport system: 19,514 airfields, the
// world's busiest hubs, and an interactive national map of every commercial
// airport, sized by traffic, from FAA/NTAD enplanement data.

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
import { AirportMap } from "@/components/infrastructure/AirportMap";
import { SerifLede, Reveal } from "@/components/infrastructure/InfraMotion";
import { SITE_IMAGES } from "@/lib/site-images";

const getPageMetadata = (locale: Locale): Metadata => ({
  title:
    locale === "ro"
      ? "Huburile Aviatice Globale | Infrastructură"
      : "The Global Aviation Hubs | Infrastructure",
  description:
    locale === "ro"
      ? "19.514 aeroporturi, cele mai aglomerate huburi din lume și harta interactivă a fiecărui aeroport comercial din America."
      : "19,514 airfields, the world's busiest hubs, and an interactive map of every commercial airport in America.",
  alternates: { canonical: "/infrastructure/aviation-hubs" },
});

export async function generateMetadata() {
  const locale = await getServerLocale();
  return getPageMetadata(locale);
}

export default async function AviationHubsPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        breadcrumbSection: "Infrastructură",
        breadcrumbPage: "Huburile Aviatice",
        heroEyebrow: "Huburile Aviatice Globale",
        heroLead: "CEL MAI AGLOMERAT",
        heroAccent: "CER DE PE PĂMÂNT.",
        heroBody:
          "Nicio națiune nu zboară ca America. Peste 19.000 de aeroporturi, cele mai aglomerate huburi de pe planetă și un sistem de control al traficului aerian care mută aproape trei milioane de oameni în fiecare zi, fără ca cei mai mulți să se gândească vreodată la asta.",
        heroStats: [
          { value: "19,514", label: "aeroporturi în SUA — mai multe decât în orice altă țară" },
          { value: "44,7 mil.", label: "îmbarcări pe an la Atlanta, cel mai aglomerat aeroport de pe Pământ" },
          { value: "~45,000", label: "zboruri gestionate zilnic de controlul traficului aerian FAA" },
        ],
        storyTitle: "O națiune construită pentru zbor",
        lede: "Când frații Wright s-au ridicat de pe o dună din Carolina de Nord în 1903, au zburat 37 de metri. Un secol mai târziu, urmașii lor mută un continent prin aer în fiecare zi.",
        storyP1:
          "Sistemul aerian american nu este un lanț de aeroporturi, ci o rețea. Marile huburi — Atlanta, Chicago, Dallas, Denver — adună zboruri din sute de orașe mai mici și le redistribuie, astfel încât aproape orice punct din țară să fie la cel mult două escale de oricare altul.",
        storyP2:
          "Sub această rețea comercială se află una și mai mare: mii de aerodromuri mici, heliporturi și piste de iarbă care țin America generală în aer. Împreună formează cel mai dens sistem de aviație pe care l-a cunoscut vreodată o singură țară.",
        numbersTitle: "Anatomia sistemului",
        numbersStats: [
          { value: "86", label: "huburi mari, fiecare cu peste un milion de îmbarcări pe an" },
          { value: "5,579", label: "heliporturi înregistrate în toată țara" },
          { value: "1 din 3", label: "pasageri aerieni din lume zboară în interiorul SUA" },
        ],
        mapTitle: "Constelația aviatică a Americii",
        mapIntro:
          "Cele 873 de aeroporturi comerciale ale țării, fiecare dimensionat după numărul de îmbarcări. Filtrează după categorie sau atinge oricare aeroport pentru detalii.",
        mapLabels: {
          all: "Toate cele 873",
          major: "Huburi mari",
          medium: "Medii",
          regional: "Regionale",
          enplanements: "Îmbarcări",
          passengers: "Pasageri",
          hint: "aeroporturi afișate",
          towered: "Turn de control",
          international: "Punct de intrare internațional",
          perYear: "pe an",
          scopeCommercial: "Comerciale",
          scopeAll: "Toate cele 19.514",
          gaAirfields: "Aerodromuri GA",
          heliports: "Heliporturi",
          seaplane: "Baze de hidroavioane",
        },
        bandTitle: "Rețeaua de tip hub-and-spoke",
        bandP1:
          "În 1978, dereglementarea a eliberat companiile aeriene să zboare oriunde voiau. Răspunsul lor a fost geometria: câteva huburi uriașe, alimentate de sute de spițe regionale.",
        bandP2:
          "De aceea un zbor din Fargo către Boise trece adesea prin Denver. Modelul a făcut zborul ieftin și aproape universal, iar aeroporturi precum O'Hare din Chicago au devenit orașe în sine, cu propriile coduri poștale, gări feroviare și populații de zi.",
        bandAlt: "Avioane la porțile aeroportului O'Hare din Chicago",
        hubsTitle: "Titanii",
        hubsIntro:
          "O mână de aeroporturi poartă o parte disproporționată din traficul aerian al lumii. Iată cine conduce clasamentul.",
        hubsFacts: [
          { fact: "Atlanta este cel mai aglomerat aeroport de pe Pământ, aproape în fiecare an din 1998.", detail: "Hartsfield–Jackson gestionează peste 44 de milioane de îmbarcări pe an. Este la mai puțin de două ore de zbor de 80% din populația SUA, ceea ce îl face hubul perfect." },
          { fact: "Memphis devine, în fiecare noapte, cel mai aglomerat aeroport din lume.", detail: "SuperHub-ul FedEx sortează milioane de colete între miezul nopții și zori. Măsurat după tonajul de marfă, niciun aeroport de pasageri nu se apropie." },
          { fact: "Denver ocupă cea mai mare suprafață aeroportuară din emisfera vestică.", detail: "137 de kilometri pătrați de câmpie înaltă — mai mare decât insula Manhattan, cu spațiu de extindere pentru un secol." },
          { fact: "O'Hare a fost cândva cel mai aglomerat aeroport din lume timp de decenii.", detail: "Codul său, ORD, vine de la Orchard Field, livada pe care a fost construit. De aceea eticheta de bagaj spune și azi ORD." },
        ],
        gaTitle: "Cerul de dedesubt",
        gaP:
          "Dincolo de companiile aeriene există o a doua Americă aeriană: peste 200.000 de aeronave de aviație generală, de la avioane cu un singur motor la jeturi de afaceri, folosind mii de aeroporturi mici pe care majoritatea oamenilor nu le văd niciodată. Este libertatea de a zbura, scrisă în asfalt și iarbă în fiecare comitat al țării.",
        quote:
          "Aviația nu s-a mulțumit niciodată cu cerul. A vrut întregul continent la o zi distanță de oriunde — și l-a obținut.",
        quoteAttribution: "Despre epoca aviației americane",
        quoteTitle: "Un continent la o zi distanță",
        prevLink: "↑ Prezentare Infrastructură",
        nextLink: "Porturile Maritime →",
      }
    : {
        breadcrumbSection: "Infrastructure",
        breadcrumbPage: "Aviation Hubs",
        heroEyebrow: "The Global Aviation Hubs",
        heroLead: "THE BUSIEST",
        heroAccent: "SKY ON EARTH.",
        heroBody:
          "No nation flies like America. More than 19,000 airports, the busiest hubs on the planet, and an air traffic control system that moves nearly three million people every day, most of them never giving it a second thought.",
        heroStats: [
          { value: "19,514", label: "airports in the U.S. — more than any other country" },
          { value: "44.7M", label: "enplanements a year at Atlanta, the busiest airport on Earth" },
          { value: "~45,000", label: "flights handled every day by FAA air traffic control" },
        ],
        storyTitle: "A Nation Built to Fly",
        lede: "When the Wright brothers lifted off a North Carolina dune in 1903, they flew 120 feet. A century later, their heirs move a continent through the air every day.",
        storyP1:
          "The American air system is not a chain of airports but a network. The great hubs — Atlanta, Chicago, Dallas, Denver — gather flights from hundreds of smaller cities and redistribute them, so that almost any point in the country is at most two stops from any other.",
        storyP2:
          "Beneath that commercial web lies a larger one: thousands of small airfields, heliports, and grass strips that keep general aviation aloft. Together they form the densest aviation system a single country has ever known.",
        numbersTitle: "The Anatomy of the System",
        numbersStats: [
          { value: "86", label: "large hubs, each with over a million enplanements a year" },
          { value: "5,579", label: "registered heliports across the country" },
          { value: "1 in 3", label: "of the world's air passengers fly within the United States" },
        ],
        mapTitle: "America's Aviation Constellation",
        mapIntro:
          "The country's 873 commercial airports, each sized by its annual enplanements. Filter by tier, or tap any airport for its detail.",
        mapLabels: {
          all: "All 873",
          major: "Major hubs",
          medium: "Medium",
          regional: "Regional",
          enplanements: "Enplanements",
          passengers: "Passengers",
          hint: "airports shown",
          towered: "Control tower",
          international: "Intl port of entry",
          perYear: "per year",
          scopeCommercial: "Commercial",
          scopeAll: "All 19,514",
          gaAirfields: "GA airfields",
          heliports: "Heliports",
          seaplane: "Seaplane bases",
        },
        bandTitle: "The Hub-and-Spoke Web",
        bandP1:
          "In 1978, deregulation freed the airlines to fly wherever they wanted. Their answer was geometry: a few enormous hubs, fed by hundreds of regional spokes.",
        bandP2:
          "It is why a flight from Fargo to Boise so often runs through Denver. The pattern made flying cheap and nearly universal, and airports like Chicago's O'Hare became cities in their own right, with their own zip codes, rail stations, and daytime populations.",
        bandAlt: "Airliners at the gates of Chicago O'Hare",
        hubsTitle: "The Titans",
        hubsIntro:
          "A handful of airports carry a wildly outsized share of the world's air traffic. Here is who tops the list.",
        hubsFacts: [
          { fact: "Atlanta is the busiest airport on Earth, almost every year since 1998.", detail: "Hartsfield–Jackson handles more than 44 million enplanements a year. It sits within a two-hour flight of 80% of the U.S. population, which makes it the perfect hub." },
          { fact: "Memphis becomes the busiest airport in the world every night.", detail: "The FedEx SuperHub sorts millions of packages between midnight and dawn. Measured by cargo tonnage, no passenger airport comes close." },
          { fact: "Denver covers the largest airport site in the Western Hemisphere.", detail: "53 square miles of high plains — larger than the island of Manhattan, with room to grow for a century." },
          { fact: "O'Hare was once the world's busiest airport for decades.", detail: "Its code, ORD, comes from Orchard Field, the orchard it was built on. That is why your bag tag still reads ORD." },
        ],
        gaTitle: "The Sky Below",
        gaP:
          "Beyond the airlines is a second aerial America: more than 200,000 general-aviation aircraft, from single-engine planes to business jets, using thousands of small airports most people never see. It is the freedom to fly, written in asphalt and grass in every county of the country.",
        quote:
          "Aviation was never content with the sky. It wanted the whole continent a day away from anywhere — and it got it.",
        quoteAttribution: "On the age of American aviation",
        quoteTitle: "A Continent a Day Away",
        prevLink: "↑ Infrastructure Overview",
        nextLink: "The Maritime Ports →",
      };

  return (
    <>
      <MacroStyles />
      <MacroHero
        imageSrc={SITE_IMAGES.infraOHareJets}
        imageAlt={copy.bandAlt}
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

          {/* ── Interactive airport map ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">{isRo ? "Harta națională" : "The National Map"}</span>
            <h2 className="macro-section-title mb-6 mt-6">{copy.mapTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.mapIntro}</p>
            <AirportMap locale={locale} labels={copy.mapLabels} />
          </section>

          {/* ── Full-bleed band: O'Hare ── */}
          <InfrastructureBand imageSrc={SITE_IMAGES.infraOHareJets} imageAlt={copy.bandAlt} fullBleed>
            <h2 className="macro-section-title mb-6">{copy.bandTitle}</h2>
            <p className="macro-body max-w-4xl">{copy.bandP1}</p>
            <p className="macro-body mt-4 max-w-4xl">{copy.bandP2}</p>
          </InfrastructureBand>

          {/* ── The Titans ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">{isRo ? "Huburile mari" : "The Great Hubs"}</span>
            <h2 className="macro-section-title mb-6 mt-6">{copy.hubsTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.hubsIntro}</p>
            <div className="grid gap-16 md:grid-cols-2">
              {copy.hubsFacts.map((f) => (
                <MacroFact key={f.fact} fact={f.fact} detail={f.detail} />
              ))}
            </div>
          </section>

          {/* ── General aviation ── */}
          <section className="border-t border-white/5 pt-24">
            <div className="max-w-3xl">
              <span className="macro-eyebrow">{isRo ? "Aviația generală" : "General Aviation"}</span>
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
            <Link href="/infrastructure/maritime-ports" className="font-macro-mono text-sm uppercase tracking-widest text-white/50 transition-colors hover:text-white">
              {copy.nextLink}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
