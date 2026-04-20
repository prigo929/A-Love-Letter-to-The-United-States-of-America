// ─── Alaska Sub-Page ──────────────────────────────────────────────────────────
// Hero: local SITE_IMAGES.denaliNationalPark (Mount Denali)
// Secondary: Unsplash aurora only for AuroraBackground base layer (no local aurora shot)

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb }  from "@/components/layout/Breadcrumb";
import { FactCard }    from "@/components/sections/FactCard";
import { StatCard }    from "@/components/sections/StatCard";
import { QuoteBlock }  from "@/components/sections/QuoteBlock";
import {
  AuroraBackground,
  HeroTextReveal,
  AnimatedStatWall,
  ParallaxImageBand,
} from "@/components/nature/NatureAnimations";
import { getServerLocale }  from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { SITE_IMAGES }      from "@/lib/site-images";
import { getAlaskaFacts }   from "@/lib/data/nature-data";

export const metadata: Metadata = {
  title: "Alaska | Nature | America: The Greatest Nation",
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
    { value: 663,   suffix: "K mi²", label: isRo ? "Suprafață Totală" : "Total Area",          sub: isRo ? "De 2,5× mai mare decât Texas" : "2.5× the size of Texas",       color: "#4ade80" },
    { value: 20310, suffix: " ft",   label: isRo ? "Altitudine Denali" : "Denali Elevation",   sub: isRo ? "Cel mai înalt vârf din America de Nord" : "Highest peak in N. America", color: "#FFD700" },
    { value: 100,   suffix: "K+",    label: isRo ? "Ghețari" : "Glaciers",                     sub: isRo ? "Mai mult decât restul lumii fără calote" : "More than rest of world outside poles", color: "#93c5fd" },
    { value: 3,     suffix: "M+",    label: isRo ? "Lacuri" : "Lakes",                         sub: isRo ? "Mai multe decât toate celelalte state" : "More than all other states", color: "#FFD700" },
  ];

  return (
    <>
      {/* ── HERO — aurora CSS behind local Denali photo ───────────────────── */}
      <AuroraBackground>
        <div className="relative min-h-screen">
          <Image
            src={SITE_IMAGES.denaliNationalPark}
            alt={isRo ? "Muntele Denali — cel mai înalt vârf din America de Nord" : "Mount Denali — highest peak in North America"}
            fill priority className="object-cover opacity-45"
            sizes="100vw" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020818]/40 to-[#020818]" />
          <div className="relative z-10 flex min-h-screen items-end pb-20 pt-32 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-screen-xl w-full">
              <Breadcrumb
                items={[
                  { label: isRo ? "Natură" : "Nature", href: "/nature" },
                  { label: "Alaska" },
                ]}
                className="mb-8"
              />
              <HeroTextReveal
                eyebrow="Alaska"
                line1={isRo ? "ULTIMA" : "THE LAST"}
                line2={isRo ? "FRONTIERĂ" : "FRONTIER"}
                line2Color="#93c5fd"
                body={
                  isRo
                    ? "663.268 de mile pătrate de sălbăticie arctică, ghețari impunători și animale sălbatice ce nu pot fi văzute nicăieri altundeva pe Pământ. Alaska nu este doar un stat — este o altă lume."
                    : "663,268 square miles of Arctic wilderness, towering glaciers, and wildlife found nowhere else on Earth. Alaska is not merely a state — it is another world."
                }
              >
                <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-900/20 px-5 py-2.5 backdrop-blur-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                  <span className="font-body text-sm text-cyan-300">
                    {isRo ? "Aurora Boreală vizibilă 200+ nopți/an în Fairbanks" : "Aurora Borealis visible 200+ nights/year in Fairbanks"}
                  </span>
                </div>
              </HeroTextReveal>
            </div>
          </div>
        </div>
      </AuroraBackground>

      {/* ── STAT WALL ─────────────────────────────────────────────────────── */}
      <section className="bg-navy-dark px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <AnimatedStatWall stats={statWall} />
        </div>
      </section>

      {/* ── CONTENT ───────────────────────────────────────────────────────── */}
      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 space-y-16">

          {/* Denali feature */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {isRo ? "Denali — Cel Mai Înalt Vârf din America de Nord" : "Denali — North America's Highest Peak"}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <p className="mb-5 font-body text-lg leading-relaxed text-white/70">
                  {isRo
                    ? "La 6.194 de metri deasupra nivelului mării, Denali este cel mai înalt vârf din America de Nord. Din câmpiile interioare ale Alaskăi, muntele se ridică cu aproape 5.500 de metri deasupra terenului înconjurător — mai mult decât Everest deasupra platoului tibetan."
                    : "At 20,310 feet above sea level, Denali is the highest peak in North America. From Alaska's interior plains, the mountain rises nearly 18,000 feet above the surrounding terrain — more than Everest above the Tibetan plateau."}
                </p>
                <p className="mb-5 font-body text-lg leading-relaxed text-white/70">
                  {isRo
                    ? "Parcul Național Denali, la 6 milioane de acri, înconjoară muntele cu o sălbăticie mai mare decât întreg statul New Hampshire. Un singur drum, de 92 de mile, se aventurează în parc — o decizie deliberată de a păstra sălbăticia neîmblânzită."
                    : "Denali National Park, at 6 million acres, surrounds the mountain in a wilderness larger than the entire state of New Hampshire. A single 92-mile road ventures into the park — a deliberate decision to keep the wilderness untamed."}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "20,310 ft", label: isRo ? "Altitudine" : "Elevation"            },
                    { value: "~18,000 ft",label: isRo ? "Ridicare bază-vârf" : "Base-to-Summit Rise" },
                    { value: "6M acres",  label: isRo ? "Parc Național" : "National Park"     },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-white/10 bg-navy-mid p-3 text-center">
                      <p className="font-hero text-xl text-cyan-300">{s.value}</p>
                      <p className="font-body text-xs text-white/45">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Local Denali image used as secondary — different crop/framing */}
              <div className="relative h-[360px] overflow-hidden rounded-2xl">
                <Image
                  src={SITE_IMAGES.denaliNationalPark}
                  alt={isRo ? "Muntele Denali reflectat în lacul glaciar" : "Denali reflected in a glacial lake"}
                  fill className="object-cover object-top"
                  sizes="(max-width:768px) 100vw, 50vw"
                  placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
                />
              </div>
            </div>
          </section>

          {/* Wildlife table */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {isRo ? "Fauna Sălbatică din Alaska" : "Alaska's Wildlife"}
            </h2>
            <p className="mb-6 font-body text-lg text-white/65 leading-relaxed">
              {isRo
                ? "Alaska găzduiește concentrații de animale sălbatice care nu mai există nicăieri altundeva în lumea modernă — o fereastră spre ce arăta America de Nord acum mii de ani."
                : "Alaska harbors concentrations of wildlife that no longer exist anywhere else in the modern world — a glimpse of what North America looked like thousands of years ago."}
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-mid">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">{isRo ? "Animal" : "Animal"}</th>
                    <th className="px-5 py-4 text-right font-body text-xs font-semibold uppercase tracking-widest text-white/40">{isRo ? "Populație" : "Population"}</th>
                    <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">{isRo ? "Notă" : "Note"}</th>
                  </tr>
                </thead>
                <tbody>
                  {ALASKA_WILDLIFE.map((item, i) => (
                    <tr key={i} className="border-b border-white/5 transition-colors hover:bg-white/3">
                      <td className="px-5 py-3.5 font-body text-sm font-semibold text-white">{item.animal}</td>
                      <td className="px-5 py-3.5 text-right font-hero text-lg text-cyan-300">{isRo ? item.countRo : item.count}</td>
                      <td className="px-5 py-3.5 font-body text-sm italic text-white/45">{isRo ? item.noteRo : item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="px-5 py-3 text-right font-body text-xs text-white/30">
                {isRo ? "Sursă: Alaska Dept. of Fish & Game 2024" : "Source: Alaska Dept. of Fish & Game 2024"}
              </p>
            </div>
          </section>

          {/* Glaciers — parallax with local Denali landscape */}
          <ParallaxImageBand
            imageSrc={SITE_IMAGES.denaliNationalPark}
            imageAlt={isRo ? "Peisaj glaciar alaskan" : "Alaskan glacial landscape"}
            height={380}
            overlayOpacity={0.5}
          >
            <div className="text-center">
              <p className="font-hero text-6xl text-cyan-300 md:text-8xl">100,000</p>
              <p className="mt-3 font-body text-lg text-white/80">
                {isRo ? "Ghețari acoperind 5% din suprafața Alaskăi" : "Glaciers covering 5% of Alaska's surface"}
              </p>
              <p className="mt-1 font-body text-sm text-white/45">
                {isRo ? "Mai multă gheață glaciară decât restul lumii fără calotele polare" : "More glacial ice than the rest of the world outside the polar caps"}
              </p>
            </div>
          </ParallaxImageBand>

          {/* Facts grid */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {isRo ? "Alaska în Cifre" : "Alaska by the Numbers"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...facts, ...extFacts].map((fact) => (
                <FactCard key={fact.id} fact={fact.fact} detail={fact.detail} source={fact.source} color={fact.color} variant="dark" />
              ))}
            </div>
          </section>

          <QuoteBlock
            quote={isRo
              ? "Alaska nu este un loc la marginea nicăieri. Alaska este centrul a tot — ultima mare sălbăticie, ultima frontieră a ultimei mari națiuni."
              : "Alaska is not a place on the edge of anywhere. Alaska is the center of everything — the last great wilderness, the last frontier of the last great country."}
            attribution="Joe Vogler"
            title={isRo ? "Pionier alaskan" : "Alaskan Independence Advocate & Frontier Pioneer"}
            variant="dark"
          />

          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link href="/nature/national-parks" className="font-body text-sm text-white/50 hover:text-white transition-colors">
              ← {isRo ? "Parcuri Naționale" : "National Parks"}
            </Link>
            <Link href="/nature/rockies" className="font-body text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              {isRo ? "Munții Stâncoși →" : "Rocky Mountains →"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
