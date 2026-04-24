// ─── Yellowstone Sub-Page ─────────────────────────────────────────────────────
// Hero: local SITE_IMAGES.yellowstonePrismatic (Grand Prismatic Spring)
// Secondary: local SITE_IMAGES.yellowstoneNationalPark
//
// Beginner guide:
// - Shared Yellowstone facts come from lib/data/nature-data.ts
// - The arrays in this file are page-only supporting details and comparison cards
// - If you want to swap the imagery, edit the SITE_IMAGES keys used below

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb }  from "@/components/layout/Breadcrumb";
import { FactCard }    from "@/components/sections/FactCard";
import { QuoteBlock }  from "@/components/sections/QuoteBlock";
import {
  GeyserScene,
  AnimatedStatWall,
  ParallaxImageBand,
  HeroTextReveal,
} from "@/components/nature/NatureAnimations";
import { getServerLocale }    from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER }   from "@/lib/utils";
import { SITE_IMAGES }        from "@/lib/site-images";
import { getYellowstoneFacts } from "@/lib/data/nature-data";

export const metadata: Metadata = {
  title: "Yellowstone | Nature | America: The Greatest Nation",
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
  // `isRo` is a small helper so the JSX can read cleanly below. Instead of
  // repeating `locale === "ro"` everywhere, the page chooses once here.
  const locale = await getServerLocale();
  const isRo   = locale === "ro";
  const facts  = getYellowstoneFacts(locale);
  // These arrays are plain content definitions for the repeated grids/tables
  // farther down the page.
  const hydrothermal = isRo ? HYDROTHERMAL_FEATURES_RO : HYDROTHERMAL_FEATURES_EN;
  const wildlife     = isRo ? YS_WILDLIFE_RO : YS_WILDLIFE_EN;
  const extFacts     = isRo ? YS_EXTENDED_FACTS_RO : YS_EXTENDED_FACTS_EN;

  // The animated stat wall expects a uniform object shape, so we prepare that
  // data once here and let the component handle the visuals.
  const statWall = [
    { value: 1872,  suffix: "",    label: isRo ? "Înființat" : "Established",            sub: isRo ? "Primul parc național din lume" : "World's first national park",          color: "#FFD700" },
    { value: 10000, suffix: "+",   label: isRo ? "Fenomene Hidrotermale" : "Hydrothermal Features", sub: isRo ? "Mai mult decât restul lumii" : "More than rest of world combined", color: "#fb923c" },
    { value: 500,   suffix: "+",   label: isRo ? "Gheizeri" : "Geysers",                 sub: isRo ? "Jumătate din toți gheizerii Pământului" : "Half of all geysers on Earth", color: "#93c5fd" },
    { value: 5000,  suffix: "+",   label: isRo ? "Bizoni Sălbatici" : "Wild Bison",      sub: isRo ? "Cea mai mare turmă liberă din America de Nord" : "Largest free-roaming herd in N. America", color: "#4ade80" },
  ];

  return (
    <>
      {/* ── HERO — local Grand Prismatic Spring ───────────────────────────── */}
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image
          src={SITE_IMAGES.yellowstonePrismatic}
          alt={isRo ? "Marele Izvor Prismatic, Yellowstone — culorile termale vibrante" : "Grand Prismatic Spring, Yellowstone — vibrant thermal colors"}
          fill className="object-cover opacity-50" priority sizes="100vw"
          placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/70 to-navy-dark" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: isRo ? "Natură" : "Nature", href: "/nature" }, { label: "Yellowstone" }]}
            className="mb-8"
          />
          <HeroTextReveal
            eyebrow={isRo ? "Parcul Național Yellowstone" : "Yellowstone National Park"}
            line1={isRo ? "PRIMUL PARC" : "THE WORLD'S"}
            line2={isRo ? "DIN LUME" : "FIRST PARK"}
            line2Color="#fb923c"
            body={
              isRo
                ? "Primul parc național din lume, înființat în 1872. Peste 10.000 de fenomene hidrotermale — mai mult decât restul lumii la un loc. Cel mai mare turmă de bizon liber din America de Nord. Și un supervolcan dedesubt."
                : "The world's first national park, established 1872. Over 10,000 hydrothermal features — more than the rest of the world combined. The largest free-roaming bison herd in North America. And a supervolcano beneath it all."
            }
          />
        </div>
      </div>

      {/* ── STAT WALL ─────────────────────────────────────────────────────── */}
      <section className="bg-navy-dark px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <AnimatedStatWall stats={statWall} />
        </div>
      </section>

      {/* ── CONTENT ───────────────────────────────────────────────────────── */}
      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 space-y-16">

          {/* Geyser scene + description */}
          <section>
            <h2 className="mb-8 font-display text-h2 text-white">
              {isRo ? "10.000 de Fenomene Hidrotermale" : "10,000 Hydrothermal Features"}
            </h2>
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div className="flex items-center justify-center rounded-2xl border border-orange-500/15 bg-gradient-to-b from-navy-mid to-[#1a0f05] py-10">
                <GeyserScene
                  label={isRo ? "OLD FAITHFUL" : "OLD FAITHFUL"}
                  sublabel={isRo ? "Erupție la fiecare 44–125 minute" : "Erupts every 44–125 minutes"}
                />
              </div>
              <div>
                <p className="mb-5 font-body text-lg leading-relaxed text-white/70">
                  {isRo
                    ? "Sub Yellowstone se află un rezervor de magmă parțial topit la numai 3–8 km adâncime. Apa de precipitații se infiltrează, se încălzește și revine la suprafață ca un spectacol termic fără egal pe Terra. Yellowstone conține peste 500 de gheizeri — jumătate din totalul mondial."
                    : "Beneath Yellowstone lies a partly molten magma reservoir just 2–5 miles underground. Surface water seeps down, heats up, and returns as the most spectacular thermal display on Earth. Yellowstone contains over 500 geysers — half of the world's total."}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { n: "500+",  l: isRo ? "Gheizeri" : "Geysers"       },
                    { n: "10K+",  l: isRo ? "Total fenomene" : "Total features"   },
                    { n: "370 ft",l: isRo ? "Izv. Prismatic" : "Grand Prismatic" },
                    { n: "~200°F",l: isRo ? "Temp. medie" : "Avg. spring temp"   },
                  ].map((s) => (
                    <div key={s.l} className="rounded-xl border border-orange-500/15 bg-orange-950/20 p-3 text-center">
                      <p className="font-hero text-2xl text-orange-400">{s.n}</p>
                      <p className="font-body text-xs text-white/45">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Hydrothermal breakdown */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {isRo ? "Tipuri de Fenomene Hidrotermale" : "Types of Hydrothermal Features"}
            </h2>
            <div className="space-y-3">
              {hydrothermal.map((feature, i) => (
                <div key={i} className="flex gap-4 rounded-2xl border border-white/8 bg-navy-mid p-4 transition-colors hover:border-orange-500/25">
                  <div className="shrink-0 rounded-lg bg-orange-500/15 px-3 py-2 text-center min-w-[90px]">
                    <p className="font-hero text-xl text-orange-400">{feature.count}</p>
                    <p className="font-body text-[10px] text-white/40 uppercase tracking-wider leading-snug mt-0.5">{feature.type}</p>
                  </div>
                  <p className="font-body text-sm leading-relaxed text-white/60 self-center">{feature.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Parallax — local Yellowstone NP image */}
          <ParallaxImageBand
            imageSrc={SITE_IMAGES.yellowstoneNationalPark}
            imageAlt={isRo ? "Yellowstone — peisajul iconic al parcului" : "Yellowstone National Park — iconic park landscape"}
            height={400}
            overlayOpacity={0.45}
          >
            <div className="text-center px-4">
              <p className="font-hero text-4xl text-orange-300 md:text-6xl">{isRo ? "Înf. 1872" : "Est. 1872"}</p>
              <p className="mt-3 font-body text-xl text-white/80">
                {isRo ? "Primul Parc Național din Lume" : "The World's First National Park"}
              </p>
              <p className="mt-2 font-body text-sm text-white/45">
                {isRo ? "O idee americană care a inspirat conservarea globală a naturii" : "An American idea that inspired conservation around the world"}
              </p>
            </div>
          </ParallaxImageBand>

          {/* Wildlife */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {isRo ? "Megafauna din Yellowstone" : "Yellowstone's Megafauna"}
            </h2>
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
                  {wildlife.map((item, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="px-5 py-3.5 font-body text-sm font-semibold text-white">{item.animal}</td>
                      <td className="px-5 py-3.5 text-right font-hero text-base text-orange-400">{item.count}</td>
                      <td className="px-5 py-3.5 font-body text-sm italic text-white/45">{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Facts */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {isRo ? "Yellowstone în Cifre" : "Yellowstone by the Numbers"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...facts, ...extFacts].map((fact) => (
                <FactCard key={fact.id} fact={fact.fact} detail={fact.detail} source={fact.source} color={fact.color} variant="dark" />
              ))}
            </div>
          </section>

          <QuoteBlock
            quote={isRo
              ? "Yellowstone nu este doar un parc național. Este o fereastră spre timpul geologic, un laborator viu al evoluției și dovada că, dacă lași natura în pace, ea se vindecă singură, magnific."
              : "Yellowstone is not just a national park. It is a window into geological time, a living laboratory of evolution, and proof that if you leave nature alone, it heals itself magnificently."}
            attribution="E.O. Wilson"
            title={isRo ? "Biolog, Universitatea Harvard" : "Biologist, Harvard University"}
            variant="dark"
          />

          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link href="/nature/grand-canyon" className="font-body text-sm text-white/50 hover:text-white transition-colors">← {isRo ? "Marele Canion" : "Grand Canyon"}</Link>
            <Link href="/nature/great-lakes" className="font-body text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors">{isRo ? "Marile Lacuri →" : "Great Lakes →"}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
