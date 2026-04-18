// ─── Rocky Mountains Sub-Page ─────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FactCard }   from "@/components/sections/FactCard";
import { StatCard }   from "@/components/sections/StatCard";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { getRockiesFacts } from "@/lib/data/nature-data";

export const metadata: Metadata = {
  title: "Rocky Mountains | Nature | America: The Greatest Nation",
  description:
    "The Rocky Mountains — 3,000 miles long, 53 peaks over 14,000 feet, elk herds in the thousands, and the backbone of North America.",
};

const ROCKIES_STATS = [
  { id: "length",      value: 3000,  suffix: " mi",   label: "Length",              description: "New Mexico to northern Canada",      source: "USGS",                   color: "gold"  as const },
  { id: "fourteeners", value: 53,                      label: "14,000 ft Peaks",     description: "In Colorado alone",                  source: "Colorado Geological Survey", color: "gold" as const },
  { id: "elevation",   value: 14440,                   label: "Mt. Elbert (ft)",     description: "Highest peak in the Rockies",        source: "USGS",                   color: "white" as const },
  { id: "parks",       value: 8,                       label: "Major National Parks",description: "Including Yellowstone, Grand Teton", source: "NPS",                    color: "white" as const },
];

const ROCKIES_PARKS = [
  { name: "Rocky Mountain NP",  state: "CO", highlight: "Most visited Rocky Mountain park, 4.4M annual visitors, 114 peaks over 11,000 ft" },
  { name: "Grand Teton NP",     state: "WY", highlight: "Dramatic fault-block mountains rising abruptly from Jackson Hole valley floor" },
  { name: "Glacier NP",         state: "MT", highlight: "Going-to-the-Sun Road, 700 miles of trails, threatened glaciers" },
  { name: "Yellowstone NP",     state: "WY/MT/ID", highlight: "World's first national park, supervolcano, largest bison herd" },
  { name: "Great Sand Dunes NP",state: "CO", highlight: "Tallest sand dunes in North America — 750 ft — against a Rocky Mountain backdrop" },
  { name: "Black Canyon of the Gunnison NP", state: "CO", highlight: "One of the most dramatic gorges in the world — 2,722 ft deep, only 40 ft wide at the narrowest" },
];

const ROCKIES_EXTENDED_FACTS = [
  {
    id: "rockies-continental-divide",
    fact: "The Continental Divide runs the full length of the Rockies",
    detail: "The Great Divide determines whether precipitation flows to the Atlantic/Gulf or Pacific Ocean. Standing on the Divide, you can send raindrops to two different oceans. It is the geographical spine of North America.",
    source: "USGS",
    color: "gold" as const,
  },
  {
    id: "rockies-skiing",
    fact: "Colorado's ski resorts attract 13M+ skiers annually — the world's premier ski destination",
    detail: "Vail, Aspen, Breckenridge, Telluride, Snowmass — Colorado's Rocky Mountain ski resorts collectively host more international visitors than the Swiss Alps. The Rocky Mountain snowpack is a $10B+ annual economic engine.",
    source: "Colorado Ski Country USA 2024",
    color: "red" as const,
  },
  {
    id: "rockies-headwaters",
    fact: "The Rockies are the headwaters for 14 major river systems",
    detail: "The Colorado, Rio Grande, Arkansas, South Platte, Missouri, Columbia, and Snake Rivers all originate in the Rockies. The Rocky Mountain snowpack provides drinking water for 70 million Americans.",
    source: "Western Water Assessment / USGS",
    color: "blue" as const,
  },
];

export default async function RockiesPage() {
  const locale = await getServerLocale();
  const isRo   = locale === "ro";
  const facts  = getRockiesFacts(locale);

  return (
    <>
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop"
          alt="Rocky Mountain National Park — emerald alpine lake surrounded by peaks"
          fill className="object-cover opacity-30" priority sizes="100vw"
          placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/85 to-navy-dark" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: isRo ? "Natură" : "Nature", href: "/nature" }, { label: isRo ? "Munții Stâncoși" : "Rocky Mountains" }]} className="mb-8" />
          <p className="mb-4 section-eyebrow">{isRo ? "Munții Stâncoși" : "Rocky Mountains"}</p>
          <h1 className="mb-4 font-hero text-6xl text-white sm:text-7xl">
            BACKBONE OF<br /><span className="text-blue-300">NORTH AMERICA</span>
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-white/65">
            {isRo ? "3.000 de mile de piscuri acoperite de zăpadă, păduri de pini și văi alpine. 53 de vârfuri în Colorado care depășesc 4.267 de metri — mai mult decât orice țară din afara Himalaiei." : "3,000 miles of snow-capped peaks, pine forests, and alpine valleys. 53 peaks in Colorado alone topping 14,000 feet — more than any country outside the Himalayas."}
          </p>
        </div>
      </div>

      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          <section>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {ROCKIES_STATS.map((s) => (
                <StatCard key={s.id} value={s.value} suffix={s.suffix} label={s.label} description={s.description} source={s.source} variant={s.color === "gold" ? "gold" : "dark"} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "Parcuri Naționale în Munții Stâncoși" : "Rocky Mountain National Parks"}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ROCKIES_PARKS.map((park) => (
                <div key={park.name} className="rounded-2xl border border-white/10 bg-navy-mid p-5 transition-colors hover:border-glory-gold/30">
                  <p className="mb-1 font-display text-lg font-semibold text-white">{park.name}</p>
                  <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-glory-gold">{park.state}</p>
                  <p className="font-body text-sm leading-relaxed text-white/55">{park.highlight}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="relative overflow-hidden rounded-2xl">
              <Image src="https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=1200&auto=format&fit=crop" alt="Elk herd in Rocky Mountain National Park at dusk" width={1200} height={450} className="h-[300px] w-full object-cover md:h-[380px]" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/80 to-transparent" />
              <div className="absolute inset-y-0 left-0 flex items-center px-8">
                <div>
                  <p className="font-hero text-5xl text-glory-gold">3,000+</p>
                  <p className="font-body text-lg text-white/80">{isRo ? "Elani în Parcul Național Rocky Mountain" : "Elk in Rocky Mountain National Park"}</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "De ce Contează Munții Stâncoși" : "Why the Rockies Matter"}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...facts, ...ROCKIES_EXTENDED_FACTS].map((fact) => (
                <FactCard key={fact.id} fact={fact.fact} detail={fact.detail} source={fact.source} color={fact.color} variant="dark" />
              ))}
            </div>
          </section>

          <QuoteBlock
            quote="The Rocky Mountains are not a feature of this country — they are the country. Stand on the Great Divide and you are standing at the center of everything."
            attribution="Wallace Stegner" title="Author, The Sound of Mountain Water"
            variant="dark"
          />

          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link href="/nature/alaska" className="font-body text-sm text-white/50 hover:text-white transition-colors">← Alaska</Link>
            <Link href="/nature/grand-canyon" className="font-body text-sm font-semibold text-glory-gold hover:text-glory-gold-dark transition-colors">{isRo ? "Marele Canion →" : "Grand Canyon →"}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
