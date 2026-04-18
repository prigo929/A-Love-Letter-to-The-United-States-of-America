// ─── Yellowstone Sub-Page ─────────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FactCard }   from "@/components/sections/FactCard";
import { StatCard }   from "@/components/sections/StatCard";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { getServerLocale }    from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER }   from "@/lib/utils";
import { SITE_IMAGES }        from "@/lib/site-images";
import { getYellowstoneFacts } from "@/lib/data/nature-data";

export const metadata: Metadata = {
  title: "Yellowstone | Nature | America: The Greatest Nation",
  description:
    "Yellowstone — the world's first national park. 10,000 hydrothermal features (more than the rest of the world combined), 5,000 bison, and a supervolcano beneath.",
};

const YS_STATS = [
  { id: "established", value: 1872,                      label: "Est.",                  description: "World's first national park",            source: "NPS",  color: "gold"  as const },
  { id: "thermal",     value: 10000, suffix: "+",         label: "Hydrothermal Features", description: "More than rest of world combined",       source: "NPS",  color: "gold"  as const },
  { id: "geysers",     value: 500,   suffix: "+",         label: "Geysers",               description: "Half of all geysers on Earth",           source: "NPS",  color: "white" as const },
  { id: "bison",       value: 5000,  suffix: "+",         label: "Wild Bison",            description: "Largest free-roaming herd in N. America", source: "NPS",  color: "white" as const },
];

const HYDROTHERMAL_FEATURES = [
  { type: "Geysers",         count: "500+",    note: "Old Faithful erupts every 44–125 minutes, 100–180 ft high" },
  { type: "Hot Springs",     count: "10,000+", note: "Grand Prismatic Spring — largest hot spring in the US, 370 ft wide" },
  { type: "Mud Pots",        count: "~300",    note: "Bubbling pools of acidic clay — some so acidic they dissolve rock" },
  { type: "Fumaroles",       count: "~3,000",  note: "Steam vents releasing SO₂, H₂S, and CO₂ from magma far below" },
  { type: "Travertine Terraces", count: "~2", note: "Mammoth Hot Springs — a constantly changing landscape of calcium carbonate" },
];

const YS_WILDLIFE = [
  { animal: "American Bison", count: "5,000–6,000", note: "Largest free-roaming bison herd in North America" },
  { animal: "Gray Wolf",       count: "100–130",     note: "Reintroduced 1995–96; restored entire ecosystem balance" },
  { animal: "Grizzly Bear",    count: "700+",        note: "Greater Yellowstone Ecosystem population" },
  { animal: "Elk",             count: "10,000–20,000", note: "Multiple herds migrate through the park seasonally" },
  { animal: "Black Bear",      count: "600+",        note: "Distributed throughout forested areas of the park" },
  { animal: "Pronghorn",       count: "200–400",     note: "Second fastest land animal on Earth, native to open plains" },
];

const YS_EXTENDED_FACTS = [
  {
    id: "ys-wolf-reintroduction",
    fact: "Yellowstone's wolf reintroduction changed the entire ecosystem — even the rivers",
    detail: "When wolves were reintroduced in 1995, they changed elk behavior, which allowed riverbanks to revegetate, which reduced erosion, which changed river courses. This 'trophic cascade' is one of the most famous examples of ecology in the world.",
    source: "PNAS / Yellowstone Center for Resources",
    color: "gold" as const,
  },
  {
    id: "ys-microbiology",
    fact: "Yellowstone's hot springs led to a revolution in biology and medicine",
    detail: "Thermus aquaticus, a heat-resistant bacterium found in Yellowstone hot springs, provided the enzyme Taq polymerase — the foundation of PCR technology. PCR is used in everything from COVID testing to DNA forensics. Yellowstone changed medicine.",
    source: "ATCC / NIH History of PCR",
    color: "red" as const,
  },
  {
    id: "ys-caldera",
    fact: "Yellowstone's magma chamber could power all of US electricity for 30,000 years",
    detail: "The Yellowstone supervolcano system contains an estimated 240 cubic miles of partly molten rock. The geothermal energy it releases daily exceeds the power output of most US power plants — but channeled peacefully as the world's most spectacular hot spring display.",
    source: "USGS Yellowstone Volcano Observatory",
    color: "blue" as const,
  },
];

export default async function YellowstonePage() {
  const locale = await getServerLocale();
  const isRo   = locale === "ro";
  const facts  = getYellowstoneFacts(locale);

  return (
    <>
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image src={SITE_IMAGES.yellowstonePrismatic} alt="Grand Prismatic Spring, Yellowstone — the world's most famous hot spring" fill className="object-cover opacity-40" priority sizes="100vw" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 to-navy-dark" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: isRo ? "Natură" : "Nature", href: "/nature" }, { label: "Yellowstone" }]} className="mb-8" />
          <p className="mb-4 section-eyebrow">Yellowstone</p>
          <h1 className="mb-4 font-hero text-6xl text-white sm:text-7xl">
            THE WORLD&apos;S<br /><span className="text-orange-400">FIRST PARK</span>
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-white/65">
            {isRo
              ? "Primul parc național din lume, înființat în 1872. Peste 10.000 de fenomene hidrotermale — mai mult decât restul lumii la un loc. Cel mai mare turmă de bison liber din America de Nord. Și un supervolcan care a remodelat continente."
              : "The world's first national park, established 1872. Over 10,000 hydrothermal features — more than the rest of the world combined. The largest free-roaming bison herd in North America. And a supervolcano that has reshaped continents."}
          </p>
        </div>
      </div>

      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          <section>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {YS_STATS.map((s) => (
                <StatCard key={s.id} value={s.value} suffix={s.suffix} label={s.label} description={s.description} source={s.source} variant={s.color === "gold" ? "gold" : "dark"} />
              ))}
            </div>
          </section>

          {/* Grand Prismatic image feature */}
          <section>
            <div className="relative overflow-hidden rounded-2xl">
              <Image src="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1200&auto=format&fit=crop" alt="Old Faithful geyser erupting against a blue sky" width={1200} height={500} className="h-[300px] w-full object-cover md:h-[420px]" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/80 to-transparent" />
              <div className="absolute inset-y-0 left-0 flex items-center px-8">
                <div className="max-w-sm">
                  <p className="font-hero text-5xl text-glory-gold">Old Faithful</p>
                  <p className="mt-2 font-body text-lg text-white/80">{isRo ? "Erupție la fiecare 44–125 minute, 30–55 m înălțime, de mii de ani" : "Erupts every 44–125 minutes, 100–180 ft high, for thousands of years"}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Hydrothermal features */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "Fenomenele Hidrotermale" : "Hydrothermal Features"}</h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {isRo
                ? "Sub Yellowstone se află un rezervor de magmă parțial topit la numai 3–8 km adâncime. Apa de precipitații se infiltrează, se încălzește și revine la suprafață ca un spectacol termic fără egal pe Terra."
                : "Beneath Yellowstone lies a partly molten magma reservoir just 2–5 miles underground. Surface water seeps down, heats up, and returns as the most spectacular thermal display on Earth."}
            </p>
            <div className="space-y-3">
              {HYDROTHERMAL_FEATURES.map((feature, i) => (
                <div key={i} className="flex gap-4 rounded-2xl border border-white/8 bg-navy-mid p-4">
                  <div className="shrink-0 rounded-lg bg-orange-500/15 px-3 py-2 text-center min-w-[80px]">
                    <p className="font-hero text-xl text-orange-400">{feature.count}</p>
                    <p className="font-body text-[10px] text-white/40 uppercase tracking-wider">{feature.type}</p>
                  </div>
                  <p className="font-body text-sm leading-relaxed text-white/60 self-center">{feature.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Wildlife table */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "Megafauna din Yellowstone" : "Yellowstone's Megafauna"}</h2>
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
                  {YS_WILDLIFE.map((item, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="px-5 py-3.5 font-body text-sm font-semibold text-white">{item.animal}</td>
                      <td className="px-5 py-3.5 text-right font-hero text-base text-glory-gold">{item.count}</td>
                      <td className="px-5 py-3.5 font-body text-sm italic text-white/45">{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "Yellowstone în Cifre" : "Yellowstone by the Numbers"}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...facts, ...YS_EXTENDED_FACTS].map((fact) => (
                <FactCard key={fact.id} fact={fact.fact} detail={fact.detail} source={fact.source} color={fact.color} variant="dark" />
              ))}
            </div>
          </section>

          <QuoteBlock
            quote="Yellowstone is not just a national park. It is a window into geological time, a living laboratory of evolution, and proof that if you leave nature alone, it heals itself magnificently."
            attribution="E.O. Wilson" title="Biologist, Harvard University"
          />

          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link href="/nature/grand-canyon" className="font-body text-sm text-white/50 hover:text-white transition-colors">← {isRo ? "Marele Canion" : "Grand Canyon"}</Link>
            <Link href="/nature/great-lakes" className="font-body text-sm font-semibold text-glory-gold hover:text-glory-gold-dark transition-colors">{isRo ? "Marile Lacuri →" : "Great Lakes →"}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
