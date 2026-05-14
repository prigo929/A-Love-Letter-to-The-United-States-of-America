// ─── Alaska Sub-Page ──────────────────────────────────────────────────────────
// A vertical focusing on extreme scale and the "Last Frontier."
//
// Pedagogical Goal:
// - To visualize Alaska's immense size (2.5x Texas) and its unique status as 
//   America's greatest wilderness reserve.
// - To demonstrate the scale of the Hubbard Glacier and Mount Denali.
//
// Beginner guide:
// - Shared Alaska facts come from lib/data/nature-data.ts

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  NatStyles,
  NatureSubPageHero,
  HeroTextReveal,
  AnimatedStatWall,
  ParallaxImageBand,
  NatureQuoteBreak,
  NatureFactModule,
} from "@/components/nature/NatureAnimations";

import { getServerLocale }  from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { SITE_IMAGES }      from "@/lib/site-images";
import { getAlaskaFacts }   from "@/lib/data/nature-data";

export const metadata: Metadata = {
  title: "Alaska | Nature",
  description:
    "Alaska — 663,268 square miles, Denali at 20,310 ft, 100,000 glaciers, 3 million lakes, and the greatest concentration of wilderness remaining on Earth.",
  alternates: { canonical: "/nature/alaska" },
};

const ALASKA_WILDLIFE = [
  { animal: "Brown / Grizzly Bears",  count: "30,000+",     countRo: "30.000+",     note: "70% of all US brown bears",           noteRo: "70% din toți urșii bruni americani" },
  { animal: "Caribou",               count: "750,000+",    countRo: "750.000+",    note: "Several major herds crossing the state", noteRo: "Mai multe cirezi mari traversând statul" },
  { animal: "Moose",                 count: "175,000+",    countRo: "175.000+",    note: "Largest moose population in the US",   noteRo: "Cea mai mare populație de elan din SUA" },
  { animal: "Black Bears",           count: "100,000+",    countRo: "100.000+",    note: "Distributed throughout forested areas", noteRo: "Răspândiți în zonele împădurite" },
  { animal: "Wolves",                count: "7,000–11,000",countRo: "7.000–11.000",note: "Largest wolf population in the US",   noteRo: "Cea mai mare populație de lupi din SUA" },
  { animal: "Bald Eagles",           count: "30,000+",     countRo: "30.000+",     note: "Half of all bald eagles in the US",   noteRo: "Jumătate din toți vulturii cheliți americani" },
  { animal: "Nesting Seabirds",      count: "50M+",        countRo: "50 milioane+",note: "One of the greatest seabird rookeries", noteRo: "Una dintre cele mai mari colonii de păsări marine" },
];

const ALASKA_EXTENDED_FACTS_EN = [
  { id: "ak-coastline",    fact: "Alaska has more coastline than the rest of the US combined",          detail: "Alaska's 33,904 miles of tidal shoreline represent more coastal length than all other US states combined — fjords, sea stacks, glacial inlets, and beaches of breathtaking remoteness.", source: "NOAA", color: "red"  as const },
  { id: "ak-midnight-sun", fact: "Fairbanks receives 22 hours of daylight on the summer solstice",     detail: "Above the Arctic Circle, the sun doesn't set for weeks in summer. At Barrow (Utqiaġvik), the sun doesn't set for 82 consecutive days. In winter, the same areas experience weeks of polar night.", source: "NOAA / Alaska Observatory", color: "gold" as const },
  { id: "ak-oil",          fact: "Alaska's North Slope is one of the largest oil fields in N. American history", detail: "Prudhoe Bay has produced over 13 billion barrels since 1968, connected to the lower 48 via the 800-mile Trans-Alaska Pipeline — an engineering marvel across permafrost and three mountain ranges.", source: "Alaska Dept. of Natural Resources", color: "blue" as const },
  { id: "ak-parks",        fact: "Alaska holds 8 national parks — over half of all NPS acreage in the US", detail: "Denali, Wrangell–St. Elias (larger than Switzerland), Kenai Fjords, Glacier Bay, Katmai, Lake Clark, Gates of the Arctic, and Kobuk Valley form the greatest wilderness park system on Earth.", source: "National Park Service", color: "gold" as const },
  { id: "ak-aurora",       fact: "Fairbanks is one of the world's premier aurora borealis destinations", detail: "Located directly under the auroral oval, Fairbanks offers some of the most reliable Northern Lights viewing. Aurora season runs August through April with displays visible up to 200 nights per year.", source: "UAF Geophysical Institute", color: "red"  as const },
  { id: "ak-size-compare", fact: "Alaska is larger than TX + CA + MT combined — by 83,000 square miles", detail: "Texas (268,596 mi²) + California (163,696 mi²) + Montana (147,040 mi²) = 579,332 mi². Alaska at 663,268 mi² beats all three combined — making it in a category entirely its own.", source: "US Census Bureau", color: "blue" as const },
];

const ALASKA_EXTENDED_FACTS_RO = [
  { id: "ak-coastline",    fact: "Alaska are mai multă coastă decât restul SUA la un loc",               detail: "Cei 54.563 km de coastă mareică ai Alaskăi reprezintă mai multă lungime costieră decât toate celelalte state americane combinate — fiorduri, stânci marine, intrândul glaciar și plaje de o frumusețe copleșitoare.", source: "NOAA", color: "red"  as const },
  { id: "ak-midnight-sun", fact: "Fairbanks primește 22 ore de lumină pe zi la solstițiul de vară",       detail: "Deasupra Cercului Polar Arctic, soarele nu apune timp de săptămâni vara. La Barrow (Utqiaġvik), soarele nu apune timp de 82 de zile consecutive. Iarna, aceleași zone trăiesc nopți polare.", source: "NOAA / Alaska Observatory", color: "gold" as const },
  { id: "ak-oil",          fact: "North Slope din Alaska este unul dintre cele mai mari câmpuri petroliere din istoria Americii de Nord", detail: "Prudhoe Bay a produs peste 13 miliarde de barili din 1968, conectat cu restul SUA prin Conducta Trans-Alaska de 1.287 km — o minune de inginerie prin permafrost și trei lanțuri muntoase.", source: "Alaska Dept. of Natural Resources", color: "blue" as const },
  { id: "ak-parks",        fact: "Alaska are 8 parcuri naționale — mai mult de jumătate din suprafața totală NPS",  detail: "Denali, Wrangell–St. Elias (mai mare decât Elveția), Kenai Fjords, Glacier Bay, Katmai, Lake Clark, Gates of the Arctic și Kobuk Valley formează cel mai mare sistem de parcuri sălbatice de pe Pământ.", source: "National Park Service", color: "gold" as const },
  { id: "ak-aurora",       fact: "Fairbanks este una dintre destinațiile de top din lume pentru aurora boreală", detail: "Situată direct sub ovalul auroral, Fairbanks oferă unele dintre cele mai sigure priveliști cu Luminile Nordului. Sezonul aurorelor durează din august până în aprilie, cu spectacole vizibile până la 200 de nopți pe an.", source: "UAF Geophysical Institute", color: "red"  as const },
  { id: "ak-size-compare", fact: "Alaska este mai mare decât TX + CA + MT la un loc — cu 133.000 km² în plus", detail: "Texas + California + Montana = 1.500.600 km². Alaska la 1.717.854 km² le depășește pe toate trei combinate — o scară geografică greu de imaginat.", source: "US Census Bureau", color: "blue" as const },
];

export default async function AlaskaPage() {
  const locale = await getServerLocale();
  const isRo   = locale === "ro";
  const facts  = getAlaskaFacts(locale);
  const extFacts = isRo ? ALASKA_EXTENDED_FACTS_RO : ALASKA_EXTENDED_FACTS_EN;

  const statWall = [
    { value: 663,   suffix: "K mi²", label: isRo ? "Suprafață Totală" : "Total Area",          sub: isRo ? "De 2,5× mai mare decât Texas" : "2.5× the size of Texas",       color: "#8B8680" },
    { value: 20310, suffix: " ft",   label: isRo ? "Altitudine Denali" : "Denali Elevation",   sub: isRo ? "Cel mai înalt vârf din America de Nord" : "Highest peak in N. America", color: "#C4956A" },
    { value: 100,   suffix: "K+",    label: isRo ? "Ghețari" : "Glaciers",                     sub: isRo ? "Mai mult decât restul lumii fără calote" : "More than rest of world outside poles", color: "#60a5fa" },
    { value: 3,     suffix: "M+",    label: isRo ? "Lacuri" : "Lakes",                         sub: isRo ? "Mai multe decât toate celelalte state" : "More than all other states", color: "#C4956A" },
  ];

  const colorMap = { gold: 'earth' as const, red: 'earth' as const, blue: 'glacier' as const, green: 'forest' as const };

  return (
    <>
      <NatStyles />

      {/* ── HERO — single image cinematic entrance ───────────────────────── */}
      <NatureSubPageHero
        imageSrc={SITE_IMAGES.denaliNationalPark}
        imageAlt={isRo ? "Muntele Denali" : "Mount Denali"}
        label={isRo ? "ALASKA · THE LAST FRONTIER" : "ALASKA · THE LAST FRONTIER"}
      >
        <HeroTextReveal
          eyebrow="Alaska"
          line1={isRo ? "ULTIMA" : "THE LAST"}
          line2={isRo ? "FRONTIERĂ" : "FRONTIER"}
          line2Color="var(--nat-accent-glacier)"
          body={
            isRo
              ? "663.268 de mile pătrate de sălbăticie arctică, ghețari impunători și animale sălbatice ce nu pot fi văzute nicăieri altundeva pe Pământ. Alaska nu este doar un stat — este o altă lume."
              : "663,268 square miles of Arctic wilderness, towering glaciers, and wildlife found nowhere else on Earth. Alaska is not merely a state — it is another world."
          }
        />
      </NatureSubPageHero>

      {/* ── STAT WALL ─────────────────────────────────────────────────────── */}
      <section className="bg-(--nat-void) pb-20 pt-12">
        <div className="mx-auto max-w-[1440px] w-full px-6 md:px-12">
          <AnimatedStatWall stats={statWall} />
        </div>
      </section>

      {/* ── CONTENT ───────────────────────────────────────────────────────── */}
      <div className="bg-(--nat-void) pb-32">
        <div className="mx-auto max-w-[1440px] w-full px-6 md:px-12 space-y-32">

          {/* Denali feature */}
          <section className="max-w-6xl mx-auto">
            <h2 className="nat-text-section text-white mb-12">
              {isRo ? "Denali — Cel Mai Înalt Vârf" : "Denali — Highest Peak"}
            </h2>
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <p className="nat-text-body mb-6">
                  {isRo
                    ? "La 6.194 de metri deasupra nivelului mării, Denali este cel mai înalt vârf din America de Nord. Din câmpiile interioare ale Alaskăi, muntele se ridică cu aproape 5.500 de metri deasupra terenului înconjurător — mai mult decât Everest deasupra platoului tibetan."
                    : "At 20,310 feet above sea level, Denali is the highest peak in North America. From Alaska's interior plains, the mountain rises nearly 18,000 feet above the surrounding terrain — more than Everest above the Tibetan plateau."}
                </p>
                <p className="nat-text-body">
                  {isRo
                    ? "Parcul Național Denali, la 6 milioane de acri, înconjoară muntele cu o sălbăticie mai mare decât întreg statul New Hampshire. Un singur drum, de 92 de mile, se aventurează în parc — o decizie deliberată de a păstra sălbăticia neîmblânzită."
                    : "Denali National Park, at 6 million acres, surrounds the mountain in a wilderness larger than the entire state of New Hampshire. A single 92-mile road ventures into the park — a deliberate decision to keep the wilderness untamed."}
                </p>
                <div className="grid grid-cols-3 gap-6 mt-8 border-t border-white/4 pt-8">
                  {[
                    { value: "20,310 ft", label: isRo ? "Altitudine" : "Elevation"            },
                    { value: "~18,000 ft",label: isRo ? "Ridicare bază-vârf" : "Base-to-Summit Rise" },
                    { value: "6M acres",  label: isRo ? "Parc Național" : "National Park"     },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="nat-text-hero" style={{ color: 'var(--nat-accent-glacier)' }}>{s.value}</p>
                      <p className="nat-text-metadata text-white/40 mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[450px] overflow-hidden group">
                <Image
                  src={SITE_IMAGES.denaliNationalPark}
                  alt={isRo ? "Muntele Denali" : "Denali"}
                  fill className="object-cover object-top brightness-[0.7] group-hover:scale-105 transition-transform duration-1000"
                  sizes="(max-width:768px) 100vw, 50vw"
                  placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
            </div>
          </section>

          {/* Wildlife containerless table */}
          <section className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h2 className="nat-text-section text-white mb-4">
                {isRo ? "Fauna Sălbatică" : "Alaska's Wildlife"}
              </h2>
              <p className="nat-text-body">
                {isRo
                  ? "Alaska găzduiește concentrații de animale sălbatice care nu mai există nicăieri altundeva în lumea modernă — o fereastră spre ce arăta America de Nord acum mii de ani."
                  : "Alaska harbors concentrations of wildlife that no longer exist anywhere else in the modern world — a glimpse of what North America looked like thousands of years ago."}
              </p>
            </div>
            <div className="border-t border-b border-white/4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/4">
                    <th className="py-4 text-left nat-text-metadata text-white/40 px-4">{isRo ? "Animal" : "Animal"}</th>
                    <th className="py-4 text-right nat-text-metadata text-white/40 px-4">{isRo ? "Populație" : "Population"}</th>
                    <th className="py-4 text-left nat-text-metadata text-white/40 pl-8 hidden sm:table-cell">{isRo ? "Notă" : "Note"}</th>
                  </tr>
                </thead>
                <tbody>
                  {ALASKA_WILDLIFE.map((item, i) => (
                    <tr key={i} className="border-b border-white/4 last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="py-5 text-base font-semibold text-white tracking-wide px-4">{item.animal}</td>
                      <td className="py-5 text-right font-hero text-base px-4" style={{ color: 'var(--nat-accent-glacier)' }}>{isRo ? item.countRo : item.count}</td>
                      <td className="py-5 nat-text-body italic pl-8 hidden sm:table-cell">{isRo ? item.noteRo : item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="py-3 text-right nat-text-metadata text-white/30 px-4">
                {isRo ? "Sursă: Alaska Dept. of Fish & Game 2024" : "Source: Alaska Dept. of Fish & Game 2024"}
              </p>
            </div>
          </section>

          {/* Glaciers parallax divider */}
          <ParallaxImageBand
            imageSrc={SITE_IMAGES.denaliNationalPark}
            imageAlt={isRo ? "Peisaj glaciar alaskan" : "Alaskan glacial landscape"}
            height={600}
            overlayOpacity={0.6}
          >
            <div className="text-center max-w-4xl mx-auto px-6">
              <p className="nat-text-display" style={{ color: 'var(--nat-accent-glacier)' }}>100,000</p>
              <p className="nat-text-heading text-white mt-4">
                {isRo ? "Ghețari acoperind 5% din suprafața Alaskăi" : "Glaciers covering 5% of Alaska's surface"}
              </p>
              <p className="nat-text-body text-white/60 mt-2">
                {isRo ? "Mai multă gheață glaciară decât restul lumii fără calote" : "More glacial ice than the rest of the world outside the polar caps"}
              </p>
            </div>
          </ParallaxImageBand>

          {/* Facts list as NatureFactModules */}

            <section className="max-w-4xl mx-auto py-24 px-6 md:px-12">
              <h2 className="nat-text-section text-white mb-16">{isRo ? "În Detaliu" : "In Detail"}</h2>
              <div>
                {[...facts, ...extFacts].map((fact) => (
                  <NatureFactModule
                    key={fact.id}
                    fact={fact.fact}
                    detail={fact.detail}
                    source={fact.source}
                    color={colorMap[fact.color as keyof typeof colorMap] ?? 'earth'}
                  />
                ))}
              </div>
            </section>


          {/* Quote Section */}
          <NatureQuoteBreak
            quote={isRo
              ? "Alaska nu este un loc la marginea nicăieri. Alaska este centrul a tot — ultima mare sălbăticie, ultima frontieră a ultimei mari națiuni."
              : "Alaska is not a place on the edge of anywhere. Alaska is the center of everything — the last great wilderness, the last frontier of the last great country."}
            attribution="Joe Vogler"
            title={isRo ? "Pionier alaskan" : "Alaskan Independence Advocate & Frontier Pioneer"}
          />

          {/* Sub-page Navigation Footer */}
          <div className="flex items-center justify-between border-t border-white/4 pt-12 max-w-5xl mx-auto">
            <Link href="/nature/national-parks" className="nat-text-label text-white/40 hover:text-white transition-colors">
              ← {isRo ? "Parcuri Naționale" : "National Parks"}
            </Link>
            <Link href="/nature/rockies" className="nat-text-label text-white/40 hover:text-white transition-colors" style={{ color: 'var(--nat-accent-glacier)' }}>
              {isRo ? "Munții Stâncoși →" : "Rocky Mountains →"}
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
