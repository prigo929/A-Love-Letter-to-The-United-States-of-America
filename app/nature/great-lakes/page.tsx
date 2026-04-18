// ─── Great Lakes Sub-Page ─────────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb }   from "@/components/layout/Breadcrumb";
import { FactCard }     from "@/components/sections/FactCard";
import { StatCard }     from "@/components/sections/StatCard";
import { QuoteBlock }   from "@/components/sections/QuoteBlock";
import { GreatLakesChart } from "@/components/data/NatureCharts";
import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import {
  GREAT_LAKES_DATA,
  getGreatLakesFacts,
} from "@/lib/data/nature-data";

export const metadata: Metadata = {
  title: "Great Lakes | Nature | America: The Greatest Nation",
  description:
    "The Great Lakes — 21% of Earth's surface freshwater, 10,900 miles of coastline, and the economic engine of the American Midwest.",
};

const GL_STATS = [
  { id: "freshwater", value: 21,  suffix: "%",  label: "Global Freshwater",    description: "Of all Earth's surface fresh water",       source: "GLC / EPA",  color: "gold"  as const },
  { id: "coastline",  value: 10900,              label: "Miles of Coastline",   description: "More than Atlantic + Gulf coasts combined",  source: "NOAA",       color: "gold"  as const },
  { id: "area",       value: 94,  suffix: "K mi²", label: "Total Surface Area", description: "Larger than the United Kingdom",            source: "GLC",        color: "white" as const },
  { id: "population", value: 107, suffix: "M",  label: "People in the Region", description: "8 US states + 2 Canadian provinces",         source: "CGLR 2024",  color: "white" as const },
];

const LAKES_DETAIL = [
  {
    name: "Superior",
    flag: "🔵",
    area: "31,700 mi²",
    volume: "2,900 mi³",
    depth: "1,332 ft",
    note: "Largest freshwater lake by surface area in the world. So large it creates its own weather systems.",
  },
  {
    name: "Michigan",
    flag: "🟦",
    area: "22,400 mi²",
    volume: "1,180 mi³",
    depth: "925 ft",
    note: "The only Great Lake entirely within the United States. Home to Chicago, Milwaukee, and Green Bay.",
  },
  {
    name: "Huron",
    flag: "🔷",
    area: "23,000 mi²",
    volume: "850 mi³",
    depth: "750 ft",
    note: "Contains Manitoulin Island — the largest freshwater island in the world.",
  },
  {
    name: "Erie",
    flag: "🟡",
    area: "9,910 mi²",
    volume: "116 mi³",
    depth: "210 ft",
    note: "Shallowest and most ecologically productive of the Great Lakes. 'Perch capital of the world.'",
  },
  {
    name: "Ontario",
    flag: "🟠",
    area: "7,340 mi²",
    volume: "393 mi³",
    depth: "802 ft",
    note: "Smallest by surface area but deepest in average depth. Drains via the St. Lawrence River to the Atlantic.",
  },
];

const GL_EXTENDED_FACTS = [
  {
    id: "gl-weather",
    fact: "Lake Superior is so large it generates its own weather systems",
    detail: "Lake Superior's surface area of 31,700 square miles is large enough to influence regional weather patterns. It moderates temperatures on its shores, creates lake-effect snowstorms, and generates waves up to 25 feet during storm season.",
    source: "NOAA Great Lakes Environmental Research Laboratory",
    color: "gold" as const,
  },
  {
    id: "gl-stlawrence",
    fact: "The St. Lawrence Seaway connects the Great Lakes to the Atlantic Ocean",
    detail: "Built jointly by the US and Canada in 1959, the St. Lawrence Seaway allows ocean-going vessels to sail 2,340 miles inland from the Atlantic. It opened the American heartland to global trade and is still one of the busiest waterways in the world.",
    source: "St. Lawrence Seaway Development Corporation",
    color: "red" as const,
  },
  {
    id: "gl-drinkingwater",
    fact: "The Great Lakes provide drinking water for 30 million Americans",
    detail: "Cities including Chicago, Detroit, Cleveland, Buffalo, and Milwaukee draw their municipal water supply from the Great Lakes system. The lakes represent the largest surface freshwater reservoir available to any major urban population.",
    source: "American Water Works Association",
    color: "blue" as const,
  },
  {
    id: "gl-islands",
    fact: "Manitoulin Island in Lake Huron is the world's largest freshwater island",
    detail: "At 1,068 square miles, Manitoulin Island (in Lake Huron, straddling the US-Canada border) is larger than many US counties and is itself home to numerous lakes — including the world's largest lake on an island in a freshwater lake.",
    source: "Natural Resources Canada",
    color: "gold" as const,
  },
];

export default async function GreatLakesPage() {
  const locale = await getServerLocale();
  const isRo   = locale === "ro";
  const facts  = getGreatLakesFacts(locale);

  return (
    <>
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image
          src="https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=1920&auto=format&fit=crop"
          alt="Lake Superior's crystal clear shoreline from above"
          fill className="object-cover opacity-30" priority sizes="100vw"
          placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/85 to-navy-dark" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: isRo ? "Natură" : "Nature", href: "/nature" }, { label: isRo ? "Marile Lacuri" : "Great Lakes" }]} className="mb-8" />
          <p className="mb-4 section-eyebrow">{isRo ? "Marile Lacuri" : "The Great Lakes"}</p>
          <h1 className="mb-4 font-hero text-6xl text-white sm:text-7xl">
            {isRo ? "MĂRILE INTERIOARE" : "AMERICA'S"}<br />
            <span className="text-blue-400">{isRo ? "ALE AMERICII" : "INLAND SEAS"}</span>
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-white/65">
            {isRo
              ? "Cinci lacuri. 21% din toată apa dulce de suprafață a Pământului. 17.560 km de coastă — mai mult decât Atlantic și Golf la un loc. Cel mai mare sistem de apă dulce din lume, chiar în inima Americii."
              : "Five lakes. 21% of all Earth's surface fresh water. 10,900 miles of coastline — more than the Atlantic and Gulf coasts combined. The largest freshwater system in the world, right in the heart of America."}
          </p>
        </div>
      </div>

      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          <section>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {GL_STATS.map((s) => (
                <StatCard key={s.id} value={s.value} suffix={s.suffix} label={s.label} description={s.description} source={s.source} variant={s.color === "gold" ? "gold" : "dark"} />
              ))}
            </div>
          </section>

          {/* Volume chart */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "Volumul Lacurilor (mile cubice)" : "Lake Volumes (cubic miles)"}</h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {isRo
                ? "Lacul Superior singur conține mai multă apă dulce decât toate celelalte Lacuri Mari la un loc. Împreună, cele cinci lacuri conțin suficientă apă pentru a acoperi întregul teritoriu al celor 48 de state continentale la o adâncime de aproape 10 picioare."
                : "Lake Superior alone contains more fresh water than all the other Great Lakes combined. Together, the five lakes hold enough water to flood the entire continental United States to a depth of nearly 10 feet."}
            </p>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <GreatLakesChart
                data={GREAT_LAKES_DATA}
                title={isRo ? "Volumul Marilor Lacuri (mile cubice)" : "Great Lakes Volume (cubic miles)"}
                subtitle={isRo ? "Superior singur conține mai multă apă decât celelalte patru lacuri la un loc" : "Superior alone holds more water than the other four lakes combined"}
                source="NOAA / Great Lakes Commission"
              />
            </div>
          </section>

          {/* Individual lake profiles */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "Fiecare Lac în Parte" : "Each Lake in Detail"}</h2>
            <div className="space-y-4">
              {LAKES_DETAIL.map((lake) => (
                <div key={lake.name} className="rounded-2xl border border-white/10 bg-navy-mid p-5 transition-colors hover:border-glory-gold/25">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{lake.flag}</span>
                        <h3 className="font-display text-xl font-semibold text-white">Lake {lake.name}</h3>
                      </div>
                      <p className="font-body text-sm leading-relaxed text-white/55 max-w-lg">{lake.note}</p>
                    </div>
                    <div className="flex gap-4 shrink-0">
                      {[
                        { label: isRo ? "Suprafață" : "Area",   value: lake.area   },
                        { label: isRo ? "Volum"     : "Volume",  value: lake.volume },
                        { label: isRo ? "Ad. Max."  : "Max Depth", value: lake.depth },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-lg border border-white/8 bg-white/5 px-3 py-2 text-center min-w-[80px]">
                          <p className="font-hero text-base text-glory-gold">{stat.value}</p>
                          <p className="font-body text-[10px] text-white/40">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Image feature */}
          <section>
            <div className="overflow-hidden rounded-2xl border border-glory-blue/20 bg-gradient-to-br from-navy-mid to-blue-950/50">
              <div className="grid md:grid-cols-2">
                <div className="p-8">
                  <p className="mb-2 section-eyebrow">{isRo ? "Aprovizionare cu Apă" : "Water Security"}</p>
                  <h2 className="mb-4 font-display text-2xl font-bold text-white">
                    {isRo ? "Cel Mai Valoros Bun Natural al Americii" : "America's Most Valuable Natural Asset"}
                  </h2>
                  <p className="font-body text-base leading-relaxed text-white/65">
                    {isRo
                      ? "Într-o lume în care apa dulce devine din ce în ce mai rară, Marile Lacuri reprezintă un avantaj strategic fără precedent. 6 cvadriliane de galoane de apă dulce — o resursă care alimentează 30 de milioane de americani, susține agricultura și industria și va deveni din ce în ce mai prețioasă pe măsură ce schimbările climatice alterează sistemele globale de apă."
                      : "In a world where fresh water is increasingly scarce, the Great Lakes represent an unparalleled strategic advantage. 6 quadrillion gallons of fresh water — a resource that supplies 30 million Americans, sustains agriculture and industry, and will become increasingly precious as climate change alters global water systems."}
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-blue-500/20 bg-blue-900/20 p-3 text-center">
                      <p className="font-hero text-2xl text-blue-300">30M</p>
                      <p className="font-body text-xs text-white/50">{isRo ? "Americani aprovizionați" : "Americans supplied"}</p>
                    </div>
                    <div className="rounded-xl border border-blue-500/20 bg-blue-900/20 p-3 text-center">
                      <p className="font-hero text-2xl text-blue-300">$6T</p>
                      <p className="font-body text-xs text-white/50">{isRo ? "Output economic regional" : "Regional economic output"}</p>
                    </div>
                  </div>
                </div>
                <div className="relative hidden md:block h-72">
                  <Image
                    src="https://images.unsplash.com/photo-1494548162494-384bba4ab999?q=80&w=900&auto=format&fit=crop"
                    alt="Great Lakes seen from space — the largest freshwater system in the world"
                    fill className="object-cover opacity-60"
                    sizes="50vw"
                    placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-navy-mid/60" />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "Marile Lacuri în Cifre" : "Great Lakes by the Numbers"}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...facts, ...GL_EXTENDED_FACTS].map((fact) => (
                <FactCard key={fact.id} fact={fact.fact} detail={fact.detail} source={fact.source} color={fact.color} variant="dark" />
              ))}
            </div>
          </section>

          <QuoteBlock
            quote="The Great Lakes are a gift that most Americans take for granted. One-fifth of the world's fresh water, sitting in the heartland of the most powerful nation on Earth. Future generations will understand their value more clearly than we do."
            attribution="David Dempsey" title="Author, On the Brink: The Great Lakes in the 21st Century"
          />

          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link href="/nature/yellowstone" className="font-body text-sm text-white/50 hover:text-white transition-colors">← Yellowstone</Link>
            <Link href="/nature" className="font-body text-sm font-semibold text-glory-gold hover:text-glory-gold-dark transition-colors">
              ↑ {isRo ? "Prezentare Generală Natură" : "Nature Overview"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
