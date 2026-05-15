// ─── Yellowstone Sub-Page ─────────────────────────────────────────────────────
// A vertical focusing on the world's first national park and its volcanic power.
//
// Pedagogical Goal:
// - To highlight the `GeyserScene` and the 10,000 hydrothermal features.
// - To explain the history of the 1872 Protection Act and the recovery of 
//   the American Bison.
//
// Beginner guide:
// - Shared Yellowstone facts come from lib/data/nature-data.ts

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  NatStyles,
  NatureSubPageHero,
  AnimatedStatWall,
  ParallaxImageBand,
  HeroTextReveal,
  NatureQuoteBreak,
  NatureFactModule,
  CountUp,
} from "@/components/nature/NatureAnimations";

import { getServerLocale }    from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER }   from "@/lib/utils";
import { SITE_IMAGES }        from "@/lib/site-images";
import { getYellowstoneFacts } from "@/lib/data/nature-data";

export const metadata: Metadata = {
  title: "Yellowstone | Nature",
  description: "Yellowstone — the world's first national park. 10,000 hydrothermal features, 5,000 bison, and a supervolcano.",
};

const HYDROTHERMAL_FEATURES_EN = [
  { type: "Geysers",              count: "500+",    note: "Old Faithful erupts every 44–125 minutes, 100–180 ft high" },
  { type: "Hot Springs",          count: "10,000+", note: "Grand Prismatic Spring — largest hot spring in the US, 370 ft wide" },
  { type: "Mud Pots",             count: "~300",    note: "Bubbling pools of acidic clay — some so acidic they dissolve rock" },
  { type: "Fumaroles",            count: "~3,000",  note: "Steam vents releasing SO₂, H₂S, CO₂ from magma 2–5 miles below" },
  { type: "Travertine Terraces",  count: "~2",      note: "Mammoth Hot Springs — a constantly changing calcium carbonate landscape" },
];

const HYDROTHERMAL_FEATURES_RO = [
  { type: "Gheizeri",             count: "500+",    note: "Old Faithful erupe la fiecare 44–125 minute, 30–55 m înălțime" },
  { type: "Izvoare Termale",      count: "10.000+", note: "Marele Izvoare Prismatice — cel mai mare izvor termal din SUA, 113 m lărgime" },
  { type: "Mlaștini Noroioase",   count: "~300",    note: "Mlaștini cu argilă acidă — unele atât de acide încât dizolvă rocile" },
  { type: "Fumarole",             count: "~3.000",  note: "Venturi de abur ce eliberează SO₂, H₂S, CO₂ din magmă la 3–8 km adâncime" },
  { type: "Terase Travertin",     count: "~2",      note: "Mammoth Hot Springs — un peisaj de carbonat de calciu în continuă schimbare" },
];

const YS_WILDLIFE_EN = [
  { animal: "American Bison",  count: "5,000–6,000",  note: "Largest free-roaming bison herd in North America" },
  { animal: "Gray Wolf",        count: "100–130",      note: "Reintroduced 1995–96; restored entire ecosystem balance" },
  { animal: "Grizzly Bear",     count: "700+",         note: "Greater Yellowstone Ecosystem population" },
  { animal: "Elk",              count: "10,000–20,000",note: "Multiple herds migrate through the park seasonally" },
  { animal: "Black Bear",       count: "600+",         note: "Distributed throughout forested areas of the park" },
  { animal: "Pronghorn",        count: "200–400",      note: "Second fastest land animal on Earth" },
];

const YS_WILDLIFE_RO = [
  { animal: "Bizon American",  count: "5.000–6.000",  note: "Cea mai mare turmă de bizon liber din America de Nord" },
  { animal: "Lup Cenușiu",     count: "100–130",      note: "Reintroduse în 1995–96; au restaurat echilibrul întregului ecosistem" },
  { animal: "Urs Grizzly",     count: "700+",         note: "Populația ecosistemului Greater Yellowstone" },
  { animal: "Elan",            count: "10.000–20.000",note: "Mai multe cirezi migrează sezonier prin parc" },
  { animal: "Urs Negru",       count: "600+",         note: "Răspândit în zonele împădurite ale parcului" },
  { animal: "Pronhorn",        count: "200–400",      note: "Al doilea animal terestru ca viteză de pe Pământ" },
];

const YS_EXTENDED_FACTS_EN = [
  { id: "ys-wolf", fact: "Wolf reintroduction changed Yellowstone's rivers — a trophic cascade", detail: "When wolves returned in 1995, they changed elk behavior, which allowed riverbanks to revegetate, which reduced erosion, which changed river courses. One of the most famous ecology case studies ever.", source: "PNAS / Yellowstone Center for Resources", color: "gold" as const },
  { id: "ys-pcr",  fact: "Yellowstone's hot springs led to a revolution in biology and medicine",   detail: "Thermus aquaticus, discovered in Yellowstone hot springs, provided Taq polymerase — the foundation of PCR technology, used in COVID testing, DNA forensics, and every modern genetics lab.", source: "ATCC / NIH", color: "red" as const },
  { id: "ys-caldera",fact:"Yellowstone's magma chamber could power all US electricity for 30,000 years", detail: "The supervolcano system contains ~240 cubic miles of partly molten rock. Its last full eruption 640,000 years ago deposited ash across half of North America.", source: "USGS Yellowstone Volcano Observatory", color: "blue" as const },
];

const YS_EXTENDED_FACTS_RO = [
  { id: "ys-wolf", fact: "Reintroducerea lupilor a schimbat cursurile râurilor din Yellowstone — o cascadă trofică", detail: "Când lupii au revenit în 1995, au schimbat comportamentul elanilor, ceea ce a permis revegetalizarea malurilor, care a redus eroziunea, care a modificat cursurile râurilor. Unul dintre cele mai faimoase studii de caz din ecologie.", source: "PNAS / Yellowstone Center for Resources", color: "gold" as const },
  { id: "ys-pcr",  fact: "Izvoarele termale din Yellowstone au declanșat o revoluție în biologie și medicină",         detail: "Thermus aquaticus, descoperit în izvoarele din Yellowstone, a furnizat enzima Taq polimerazei — baza tehnologiei PCR, folosită în testele COVID, criminalistică ADN și orice laborator de genetică modern.", source: "ATCC / NIH", color: "red" as const },
  { id: "ys-caldera",fact:"Camera de magmă din Yellowstone ar putea alimenta toată electricitatea SUA timp de 30.000 de ani", detail: "Sistemul supervolcanic conține ~400 km³ de rocă parțial topită. Ultima erupție completă, acum 640.000 de ani, a depus cenușă pe jumătate din America de Nord.", source: "USGS Yellowstone Volcano Observatory", color: "blue" as const },
];

export default async function YellowstonePage() {
  const locale = await getServerLocale();
  const isRo   = locale === "ro";
  const facts  = getYellowstoneFacts(locale);
  const hydrothermal = isRo ? HYDROTHERMAL_FEATURES_RO : HYDROTHERMAL_FEATURES_EN;
  const wildlife     = isRo ? YS_WILDLIFE_RO : YS_WILDLIFE_EN;
  const extFacts     = isRo ? YS_EXTENDED_FACTS_RO : YS_EXTENDED_FACTS_EN;

  const statWall = [
    { value: 1872,  suffix: "",    label: isRo ? "Înființat" : "Established",            sub: isRo ? "Primul parc național din lume" : "World's first national park",          color: "#C4956A" },
    { value: 10000, suffix: "+",   label: isRo ? "Fenomene Hidrotermale" : "Hydrothermal Features", sub: isRo ? "Mai mult decât restul lumii" : "More than rest of world combined", color: "#C4956A" },
    { value: 500,   suffix: "+",   label: isRo ? "Gheizeri" : "Geysers",                 sub: isRo ? "Jumătate din toți gheizerii Pământului" : "Half of all geysers on Earth", color: "#8B8680" },
    { value: 5000,  suffix: "+",   label: isRo ? "Bizoni Sălbatici" : "Wild Bison",      sub: isRo ? "Cea mai mare turmă liberă din America de Nord" : "Largest free-roaming herd in N. America", color: "#4ade80" },
  ];

  const colorMap = { gold: 'earth' as const, red: 'earth' as const, blue: 'glacier' as const, green: 'forest' as const };

  return (
    <>
      <NatStyles />

      {/* ── HERO — single image cinematic entrance ───────────────────────── */}
      <NatureSubPageHero
        imageSrc={SITE_IMAGES.yellowstoneNationalPark}
        imageAlt={isRo ? "Parcul Național Yellowstone" : "Yellowstone National Park"}
        label={isRo ? "PARCUL NAȚIONAL YELLOWSTONE · WYOMING" : "YELLOWSTONE NATIONAL PARK · WYOMING"}
      >
        <HeroTextReveal
          eyebrow={isRo ? "Parcul Național Yellowstone" : "Yellowstone National Park"}
          line1={isRo ? "PRIMUL PARC" : "THE WORLD'S"}
          line2={isRo ? "DIN LUME" : "FIRST PARK"}
          line2Color="var(--nat-accent-earth)"
          body={
            isRo
              ? "Primul parc național din lume, înființat în 1872. Peste 10.000 de fenomene hidrotermale — mai mult decât restul lumii la un loc. Cel mai mare turmă de bizon liber din America de Nord. Și un supervolcan dedesubt."
              : "The world's first national park, established 1872. Over 10,000 hydrothermal features — more than the rest of the world combined. The largest free-roaming bison herd in North America. And a supervolcano beneath it all."
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

          {/* Geyser scene + description */}
          <section className="max-w-5xl mx-auto">
            <h2 className="nat-text-section text-white mb-12">
              {isRo ? "10.000 de Fenomene Hidrotermale" : "10,000 Hydrothermal Features"}
            </h2>
            <div>

              <div>
                <p className="nat-text-body">
                  {isRo
                    ? "Sub Yellowstone se află un rezervor de magmă parțial topit la numai 3–8 km adâncime. Apa de precipitații se infiltrează, se încălzește și revine la suprafață ca un spectacol termic fără egal pe Terra. Yellowstone conține peste 500 de gheizeri — jumătate din totalul mondial."
                    : "Beneath Yellowstone lies a partly molten magma reservoir just 2–5 miles underground. Surface water seeps down, heats up, and returns as the most spectacular thermal display on Earth. Yellowstone contains over 500 geysers — half of the world's total."}
                </p>
                <div className="grid grid-cols-2 gap-x-20 gap-y-12 mt-12 border-t border-white/4 pt-12">
                  {[
                    { n: "500+",  l: isRo ? "Gheizeri" : "Geysers"       },
                    { n: "10K+",  l: isRo ? "Total fenomene" : "Total features"   },
                    { n: "370 ft",l: isRo ? "Izv. Prismatic" : "Grand Prismatic" },
                    { n: "~200°F",l: isRo ? "Temp. medie" : "Avg. spring temp"   },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="text-6xl md:text-7xl font-black tracking-tight text-white uppercase">
                        <CountUp 
                          value={parseInt(s.n.replace(/[^0-9]/g, ''))} 
                          prefix={s.n.startsWith('~') ? '~' : ''}
                          suffix={s.n.replace(/[0-9~]/g, '')} 
                          color="var(--nat-accent-earth)" 
                        />
                      </div>
                      <p className="nat-text-metadata text-white/40 mt-2">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Hydrothermal breakdown borderless list */}
          <section className="max-w-5xl mx-auto">
            <h2 className="nat-text-section text-white mb-10">
              {isRo ? "Tipuri de Fenomene" : "Feature Types"}
            </h2>
            <div className="space-y-3 border-t border-white/4 pt-4">
              {hydrothermal.map((feature, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-20 border-b border-white/4 py-10 transition-colors hover:bg-white/[0.02] px-6">
                  <div className="shrink-0 text-left sm:w-1/3">
                    <div className="text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
                      <CountUp 
                        value={parseInt(feature.count.replace(/[^0-9]/g, ''))} 
                        prefix={feature.count.startsWith('~') ? '~' : ''}
                        suffix={feature.count.replace(/[0-9~]/g, '')} 
                        color="var(--nat-accent-earth)" 
                      />
                    </div>
                    <p className="nat-text-metadata text-white/40 uppercase tracking-wider leading-snug mt-1">{feature.type}</p>
                  </div>
                  <p className="nat-text-body self-center flex-1">{feature.note}</p>
                </div>
              ))}
            </div>
          </section>

        </div> {/* End first container */}
        
        {/* Parallax divider - FULL WIDTH */}
        <div className="my-32">
          <ParallaxImageBand
            imageSrc={SITE_IMAGES.yellowstoneNationalPark}
            imageAlt={isRo ? "Yellowstone" : "Yellowstone National Park"}
            height={600}
            overlayOpacity={0.5}
          >
            <div className="text-center max-w-4xl mx-auto px-6">
              <p className="nat-text-display" style={{ color: 'var(--nat-accent-earth)' }}>{isRo ? "1872" : "1872"}</p>
              <p className="nat-text-heading text-white mt-4">
                {isRo ? "Primul Parc Național din Lume" : "The World's First National Park"}
              </p>
              <p className="nat-text-body text-white/60 mt-2">
                {isRo ? "O idee americană care a inspirat conservarea globală" : "An American idea that inspired conservation around the world"}
              </p>
            </div>
          </ParallaxImageBand>
        </div>

        <div className="mx-auto max-w-[1440px] w-full px-6 md:px-12 space-y-32">
          {/* Wildlife containerless table */}
          <section className="max-w-5xl mx-auto">
            <h2 className="nat-text-section text-white mb-10">
              {isRo ? "Megafauna" : "Megafauna"}
            </h2>
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
                  {wildlife.map((item, i) => (
                    <tr key={i} className="border-b border-white/4 last:border-0 hover:bg-white/2 transition-colors">
                      <td className="py-5 text-base font-semibold text-white tracking-wide px-4">{item.animal}</td>
                      <td className="py-6 text-right font-black text-2xl tracking-tight px-4" style={{ color: 'var(--nat-accent-earth)', fontFamily: 'var(--font-archivo)' }}>
                        <span className="tabular-nums">{item.count}</span>
                      </td>
                      <td className="py-5 nat-text-body italic pl-8 hidden sm:table-cell">{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Facts list as NatureFactModules */}
          <section className="max-w-5xl mx-auto">
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
              ? "Yellowstone nu este doar un parc național. Este o fereastră spre timpul geologic, un laborator viu al evoluției și dovada că, dacă lași natura în pace, ea se vindecă singură, magnific."
              : "Yellowstone is not just a national park. It is a window into geological time, a living laboratory of evolution, and proof that if you leave nature alone, it heals itself magnificently."}
            attribution="E.O. Wilson"
            title={isRo ? "Biolog, Universitatea Harvard" : "Biologist, Harvard University"}
          />

          {/* Sub-page Navigation Footer */}
          <div className="flex items-center justify-between border-t border-white/4 pt-12 max-w-5xl mx-auto">
            <Link href="/nature/grand-canyon" className="nat-text-label text-white/40 hover:text-white transition-colors">
              ← {isRo ? "Marele Canion" : "Grand Canyon"}
            </Link>
            <Link href="/nature/great-lakes" className="nat-text-label text-white/40 hover:text-white transition-colors" style={{ color: 'var(--nat-accent-earth)' }}>
              {isRo ? "Marile Lacuri →" : "Great Lakes →"}
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
