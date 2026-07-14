// ─── Monumental Dams & Bridges ────────────────────────────────────────────────
// A deep-dive subpage on the great works of American structural engineering: the
// dams that tamed the western rivers and the bridges that leapt its bays and
// canyons, with a ranked comparison of the longest spans and tallest dams.

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
import { EngineeringComparison } from "@/components/infrastructure/EngineeringComparison";
import { SerifLede, Reveal } from "@/components/infrastructure/InfraMotion";
import { DamsBridgesMap } from "@/components/infrastructure/DamsBridgesMap";
import { SITE_IMAGES } from "@/lib/site-images";

const getPageMetadata = (locale: Locale): Metadata => ({
  title:
    locale === "ro"
      ? "Baraje și Poduri Monumentale | Infrastructură"
      : "Monumental Dams & Bridges | Infrastructure",
  description:
    locale === "ro"
      ? "Barajul Hoover, Podul Golden Gate și marile lucrări de inginerie care au îmblânzit râurile Americii și i-au traversat golfurile și canioanele."
      : "Hoover Dam, the Golden Gate, and the great works of engineering that tamed America's rivers and leapt its bays and canyons.",
  alternates: { canonical: "/infrastructure/dams-bridges" },
});

export async function generateMetadata() {
  const locale = await getServerLocale();
  return getPageMetadata(locale);
}

export default async function DamsBridgesPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        breadcrumbSection: "Infrastructură",
        breadcrumbPage: "Baraje și Poduri Monumentale",
        heroEyebrow: "Baraje și Poduri Monumentale",
        heroLead: "RÂURI ÎMBLÂNZITE.",
        heroAccent: "CANIOANE TRAVERSATE.",
        heroBody:
          "Când America a vrut să crească, a turnat betonul în canioanele Vestului și a întins oțelul peste golfurile ei. Rezultatul: structuri atât de mari încât au reașezat râuri, au aprins orașe și au redefinit ce poate construi o națiune.",
        heroStats: [
          { value: "726 ft", label: "Barajul Hoover — cel mai înalt de pe Pământ în 1936" },
          { value: "4.200 ft", label: "deschiderea principală Golden Gate" },
          { value: "6,6 mil. t", label: "beton în Barajul Hoover" },
        ],
        storyTitle: "Sublimul ingineresc american",
        lede: "Un baraj oprește un râu care curge de un milion de ani. Un pod ține în aer o milă de oțel. America a făcut din amândouă o formă de artă publică.",
        storyP1:
          "În anii Marii Crize, când un sfert din națiune era fără lucru, guvernul federal a răspuns cu betonul. Barajul Hoover, Grand Coulee și zeci de altele au dat de lucru unei armate de oameni și au electrificat un Vest întreg, aproape peste noapte.",
        storyP2:
          "Podurile au venit din aceeași îndrăzneală. Acolo unde un golf sau un canion spunea „până aici”, inginerii au răspuns cu cabluri de oțel și turnuri mai înalte decât orice clădire din jur. Multe dintre ele dețin și azi recorduri, la aproape un secol de la turnarea primei fundații.",
        numbersTitle: "Măsura ambiției",
        numbersStats: [
          { value: "Lacul Mead", label: "cel mai mare rezervor din SUA ca volum, creat de Barajul Hoover" },
          { value: "~6.809 MW", label: "Grand Coulee — cea mai mare centrală electrică din SUA" },
          { value: "1883", label: "Podul Brooklyn — primul pod suspendat pe cabluri de oțel" },
        ],
        mapTitle: "Harta Monumentelor Inginerești",
        mapIntro: "Descoperă unde se află cele mai faimoase baraje și poduri din Statele Unite. Treci peste sau atinge un punct pe hartă ca să afli detalii tehnice și istoria lui.",
        mapLabels: {
          all: "Toate",
          dams: "Baraje",
          bridges: "Poduri",
          completed: "Finalizat",
          statLabel: "Dimensiune / Deschidere",
          hint: "Treci peste un punct pentru detalii",
          scopeLabel: "Monument",
        },
        compTitle: "Cine deține recordul",
        compIntro:
          "Cele mai lungi deschideri și cele mai înalte baraje ale țării, clasate. Comutați între cele două ca să vedeți cât de departe au împins inginerii americani limita.",
        bandTitle: "Oțel roșu deasupra ceții",
        bandP1:
          "Podul Golden Gate a fost declarat imposibil de construit. Curenți puternici, ceață densă și un ocean deschis stăteau în calea unei deschideri de 1,3 kilometri.",
        bandP2:
          "Joseph Strauss a întins sub șantier prima plasă de siguranță din istoria construcțiilor. A salvat nouăsprezece vieți; oamenii care au căzut în ea și-au spus „Clubul La Jumătatea Drumului spre Iad”. Podul s-a deschis în 1937 și a rămas cea mai lungă deschidere de pe Pământ timp de douăzeci și șapte de ani.",
        bandAlt: "Podul Golden Gate în ceața coastei",
        damsTitle: "Barajele",
        damsIntro:
          "Marile baraje de beton ale Vestului nu au făcut doar energie. Au făcut posibile orașe întregi acolo unde înainte era deșert.",
        damsFacts: [
          { fact: "Barajul Hoover a fost gata cu doi ani înainte de termen.", detail: "Betonul a fost turnat în blocuri răcite de kilometri de țevi cu apă rece. Turnat monolitic, s-ar fi răcit și întărit abia peste circa 125 de ani." },
          { fact: "Grand Coulee este cea mai mare structură de beton din SUA.", detail: "Pe râul Columbia, în statul Washington, rămâne cel mai mare producător de energie electrică al țării, alimentând fabricile care au construit avioanele celui de-Al Doilea Război Mondial." },
          { fact: "Barajul Oroville este cel mai înalt din țară, la 770 de picioare.", detail: "Terasamentul său de pământ din California îl întrece pe Hoover cu aproape 15 metri, deși nu are aceeași faimă." },
          { fact: "Barajul Glen Canyon a creat Lacul Powell.", detail: "În Arizona, cei 710 picioare ai săi rețin al doilea rezervor ca mărime din țară, un canion inundat lung de peste 300 de kilometri." },
        ],
        bridgesTitle: "Podurile",
        bridgesIntro:
          "De la primul cablu de oțel întins peste East River până la cel mai lung arc din emisferă, podurile Americii sunt cataloage de îndrăzneală structurală.",
        bridgeCards: [
          { name: "Podul Golden Gate", meta: "San Francisco · 1937", span: "deschidere de 4.200 ft", text: "Turnuri de 227 de metri vopsite în „Portocaliu Internațional”. Cea mai lungă deschidere suspendată din lume timp de 27 de ani și, poate, cel mai fotografiat pod de pe planetă." },
          { name: "Podul Brooklyn", meta: "New York · 1883", span: "deschidere de 1.595 ft", text: "Primul pod suspendat pe cabluri de oțel din lume. John Roebling a murit din cauza lucrărilor; fiul său a rămas invalid, iar Emily Roebling a condus finalizarea vreme de unsprezece ani." },
          { name: "Podul Verrazzano-Narrows", meta: "New York · 1964", span: "deschidere de 4.260 ft", text: "Cea mai lungă deschidere suspendată din SUA. Curbura Pământului este atât de vizibilă la scara sa încât vârfurile turnurilor sunt cu câțiva centimetri mai depărtate decât bazele lor." },
          { name: "Podul Mackinac", meta: "Michigan · 1957", span: "lungime totală de ~5 mile", text: "„Mighty Mac” leagă cele două peninsule ale statului Michigan peste strâmtoarea unde se întâlnesc lacurile Michigan și Huron, una dintre cele mai lungi traversări suspendate din emisfera vestică." },
          { name: "Podul New River Gorge", meta: "Virginia de Vest · 1977", span: "arc de oțel de 1.700 ft", text: "Cel mai lung arc de oțel din emisfera vestică vreme de decenii. O dată pe an, „Ziua Podului”, oamenii sar de pe el cu parașuta, la peste 250 de metri deasupra râului." },
        ],
        costTitle: "Prețul plătit",
        costP:
          "Aceste structuri au fost ridicate de oameni atârnați deasupra hăurilor, în vânt și în stropii râului. Nouăzeci și șase de muncitori au murit la Barajul Hoover; unsprezece la Golden Gate. Fiecare monument din pagina aceasta este și un memorial pentru cei care nu au apucat să-l vadă terminat.",
        quote:
          "Am construit lucruri mărețe fiindcă am fost un popor măreț. Barajele și podurile noastre sunt catedralele republicii.",
        quoteAttribution: "Despre epoca marilor lucrări publice americane",
        quoteTitle: "Catedralele republicii",
        prevLink: "↑ Prezentare Infrastructură",
        nextLink: "Huburile Aviatice Globale →",
      }
    : {
        breadcrumbSection: "Infrastructure",
        breadcrumbPage: "Monumental Dams & Bridges",
        heroEyebrow: "Monumental Dams & Bridges",
        heroLead: "RIVERS TAMED.",
        heroAccent: "CANYONS SPANNED.",
        heroBody:
          "When America wanted to grow, it poured concrete into the canyons of the West and strung steel across its bays. The result: structures so large they reseated rivers, lit up cities, and redefined what a nation could build.",
        heroStats: [
          { value: "726 ft", label: "Hoover Dam — tallest on Earth in 1936" },
          { value: "4,200 ft", label: "Golden Gate main span" },
          { value: "6.6M tons", label: "concrete in Hoover Dam" },
        ],
        storyTitle: "The American Engineering Sublime",
        lede: "A dam stops a river that has run for a million years. A bridge holds a mile of steel in the air. America turned both into a form of public art.",
        storyP1:
          "In the Depression years, with a quarter of the nation out of work, the federal government answered with concrete. Hoover Dam, Grand Coulee, and dozens more put an army of men to work and electrified an entire West almost overnight.",
        storyP2:
          "The bridges came from the same nerve. Where a bay or a canyon said stop, engineers answered with steel cable and towers taller than anything around them. Many still hold their records today, nearly a century after the first footing was poured.",
        numbersTitle: "The Measure of the Ambition",
        numbersStats: [
          { value: "Lake Mead", label: "largest U.S. reservoir by volume, created by Hoover Dam" },
          { value: "~6.809 MW", label: "Grand Coulee — the largest power station in the U.S." },
          { value: "1883", label: "Brooklyn Bridge — the first steel-wire suspension bridge" },
        ],
        mapTitle: "Map of Engineering Landmarks",
        mapIntro: "Locate the most famous dams and bridges across the United States. Hover or tap any marker on the map to reveal engineering facts and structural details.",
        mapLabels: {
          all: "All",
          dams: "Dams",
          bridges: "Bridges",
          completed: "Completed",
          statLabel: "Height / Span Size",
          hint: "Hover a marker for details",
          scopeLabel: "Monument",
        },
        compTitle: "Who Holds the Record",
        compIntro:
          "The nation's longest spans and tallest dams, ranked. Switch between the two to see just how far American engineers pushed the limit.",
        bandTitle: "Red Steel Above the Fog",
        bandP1:
          "The Golden Gate Bridge was called impossible to build. Powerful currents, dense fog, and open ocean stood between the two shores of a 4,200-foot span.",
        bandP2:
          "Joseph Strauss strung the first construction safety net in history beneath the deck. It saved nineteen lives, and the men who fell into it called themselves the Halfway to Hell Club. The bridge opened in 1937 and stayed the longest span on Earth for twenty-seven years.",
        bandAlt: "The Golden Gate Bridge in coastal fog",
        damsTitle: "The Dams",
        damsIntro:
          "The great concrete dams of the West did more than make power. They made whole cities possible where there had been only desert.",
        damsFacts: [
          { fact: "Hoover Dam was finished two years ahead of schedule.", detail: "Its concrete was poured in blocks cooled by miles of chilled-water pipe. Poured as one mass, it would not have finished cooling and curing for roughly 125 years." },
          { fact: "Grand Coulee is the largest concrete structure in the U.S.", detail: "On the Columbia River in Washington, it remains the country's largest power producer, feeding the factories that built the aircraft of the Second World War." },
          { fact: "Oroville is the tallest dam in the country, at 770 feet.", detail: "Its earthfill embankment in California edges out Hoover by nearly fifty feet, even if it never earned the same fame." },
          { fact: "Glen Canyon Dam created Lake Powell.", detail: "In Arizona, its 710 feet hold back the country's second-largest reservoir, a flooded canyon more than 180 miles long." },
        ],
        bridgesTitle: "The Bridges",
        bridgesIntro:
          "From the first steel cable strung across the East River to the longest arch in the hemisphere, America's bridges are a catalogue of structural nerve.",
        bridgeCards: [
          { name: "Golden Gate Bridge", meta: "San Francisco · 1937", span: "4,200 ft span", text: "746-foot towers painted in International Orange. The longest suspension span on Earth for 27 years, and perhaps the most photographed bridge on the planet." },
          { name: "Brooklyn Bridge", meta: "New York · 1883", span: "1,595 ft span", text: "The world's first steel-wire suspension bridge. John Roebling died of the work, his son was left an invalid, and Emily Roebling ran the completion for eleven years." },
          { name: "Verrazzano-Narrows Bridge", meta: "New York · 1964", span: "4,260 ft span", text: "The longest suspension span in the United States. The curve of the Earth is so real at its scale that the tower tops stand nearly two inches farther apart than their bases." },
          { name: "Mackinac Bridge", meta: "Michigan · 1957", span: "~5 mi total length", text: "The Mighty Mac links Michigan's two peninsulas across the strait where Lakes Michigan and Huron meet, one of the longest suspension crossings in the Western Hemisphere." },
          { name: "New River Gorge Bridge", meta: "West Virginia · 1977", span: "1,700 ft steel arch", text: "The longest steel arch in the Western Hemisphere for decades. Once a year, on Bridge Day, people parachute off it, more than 850 feet above the river." },
        ],
        costTitle: "The Price That Was Paid",
        costP:
          "These structures were raised by men hung over voids, in the wind and the spray of the river. Ninety-six workers died at Hoover Dam, eleven at the Golden Gate. Every monument on this page is also a memorial to the men who never saw it finished.",
        quote:
          "We built great things because we were a great people. Our dams and our bridges are the cathedrals of the republic.",
        quoteAttribution: "On the age of the great American public works",
        quoteTitle: "Cathedrals of the Republic",
        prevLink: "↑ Infrastructure Overview",
        nextLink: "The Global Aviation Hubs →",
      };

  return (
    <>
      <MacroStyles />
      <MacroHero
        imageSrc={SITE_IMAGES.infraHooverAerial}
        imageAlt={isRo ? "Vedere aeriană a Barajului Hoover" : "Aerial view of the Hoover Dam"}
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

          {/* ── Interactive Map ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">{isRo ? "Harta Interactivă" : "Interactive Map"}</span>
            <h2 className="macro-section-title mb-8 mt-6">{copy.mapTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.mapIntro}</p>
            <DamsBridgesMap locale={locale} labels={copy.mapLabels} />
          </section>

          {/* ── Comparison visual ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">{isRo ? "Clasament" : "The Ranking"}</span>
            <h2 className="macro-section-title mb-6 mt-6">{copy.compTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.compIntro}</p>
            <EngineeringComparison locale={locale} />
          </section>

          {/* ── Full-bleed band: Golden Gate ── */}
          <InfrastructureBand
            imageSrc={SITE_IMAGES.homeGoldenGateBridge}
            imageAlt={copy.bandAlt}
            fullBleed
          >
            <h2 className="macro-section-title mb-6">{copy.bandTitle}</h2>
            <p className="macro-body max-w-4xl">{copy.bandP1}</p>
            <p className="macro-body mt-4 max-w-4xl">{copy.bandP2}</p>
          </InfrastructureBand>

          {/* ── The Dams ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">{isRo ? "Beton" : "Concrete"}</span>
            <h2 className="macro-section-title mb-6 mt-6">{copy.damsTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.damsIntro}</p>
            <div className="grid gap-16 md:grid-cols-2">
              {copy.damsFacts.map((f) => (
                <MacroFact key={f.fact} fact={f.fact} detail={f.detail} />
              ))}
            </div>
          </section>

          {/* ── The Bridges ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">{isRo ? "Oțel" : "Steel"}</span>
            <h2 className="macro-section-title mb-6 mt-6">{copy.bridgesTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.bridgesIntro}</p>
            <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {copy.bridgeCards.map((b) => (
                <div key={b.name} className="border-t border-[#E8B923]/30 pt-6">
                  <div className="font-sans text-[10px] uppercase tracking-[0.18em] text-white/40">
                    {b.meta}
                  </div>
                  <h3 className="mb-1 mt-2 font-macro-display text-xl font-bold text-white">{b.name}</h3>
                  <div className="mb-3 font-hero text-lg text-[#E8B923]/90">{b.span}</div>
                  <p className="macro-body !text-sm leading-relaxed text-white/60">{b.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── The human cost ── */}
          <section className="border-t border-white/5 pt-24">
            <div className="max-w-3xl">
              <span className="macro-eyebrow">{isRo ? "Memorial" : "In Memoriam"}</span>
              <h3 className="mb-6 mt-4 font-macro-display text-3xl font-black text-white">{copy.costTitle}</h3>
              <p className="macro-body leading-relaxed text-white/70">{copy.costP}</p>
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
              href="/infrastructure"
              className="font-sans text-sm uppercase tracking-widest text-white/50 transition-colors hover:text-white"
            >
              {copy.prevLink}
            </Link>
            <Link
              href="/infrastructure/aviation-hubs"
              className="font-sans text-sm uppercase tracking-widest text-white/50 transition-colors hover:text-white"
            >
              {copy.nextLink}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
