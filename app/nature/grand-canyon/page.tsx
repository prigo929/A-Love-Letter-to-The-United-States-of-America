// ─── Grand Canyon Sub-Page ────────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FactCard }   from "@/components/sections/FactCard";
import { StatCard }   from "@/components/sections/StatCard";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { getServerLocale }   from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER }  from "@/lib/utils";
import { SITE_IMAGES }       from "@/lib/site-images";
import { getGrandCanyonFacts } from "@/lib/data/nature-data";

export const metadata: Metadata = {
  title: "Grand Canyon | Nature | America: The Greatest Nation",
  description:
    "The Grand Canyon — 277 miles long, 18 miles wide, one mile deep, exposing 1.8 billion years of Earth's geological history. Nature's greatest sculpture.",
};

const GC_STATS = [
  { id: "length",    value: 277,  suffix: " mi",  label: "Length",           description: "Along the Colorado River",      source: "NPS",  color: "gold"  as const },
  { id: "width",     value: 18,   suffix: " mi",  label: "Max Width",        description: "Rim to rim at widest point",    source: "NPS",  color: "gold"  as const },
  { id: "depth",     value: 6093, suffix: " ft",  label: "Max Depth",        description: "To the Colorado River below",   source: "NPS",  color: "white" as const },
  { id: "age",       value: 5,    suffix: "–6M yr", label: "Years Old",      description: "Of canyon carving by the river",source: "USGS", color: "white" as const },
];

const GEOLOGY_LAYERS = [
  { layer: "Kaibab Limestone",        age: "270 million yrs",  depth: "Rim (top)",        color: "#e8d5b0" },
  { layer: "Toroweap Formation",      age: "273 million yrs",  depth: "Just below rim",   color: "#d4b896" },
  { layer: "Coconino Sandstone",      age: "275 million yrs",  depth: "300 ft below rim", color: "#f5e6c8" },
  { layer: "Hermit Shale",            age: "280 million yrs",  depth: "500 ft",           color: "#c4705a" },
  { layer: "Supai Group",             age: "285–315 M yrs",    depth: "800–1,800 ft",     color: "#b85540" },
  { layer: "Redwall Limestone",       age: "340 million yrs",  depth: "1,800 ft",         color: "#a04030" },
  { layer: "Tonto Group",             age: "500–545 M yrs",    depth: "3,000 ft",         color: "#7a9060" },
  { layer: "Vishnu Basement Rocks",   age: "1.7–1.8 billion yrs", depth: "River level",  color: "#4a3d6b" },
];

const GC_EXTENDED_FACTS = [
  {
    id: "gc-condor",
    fact: "The Grand Canyon is home to the critically endangered California condor",
    detail: "Once reduced to just 27 individuals worldwide, California condors were released in the Grand Canyon in 1996. Today over 500 exist, with dozens soaring the thermal updrafts above the canyon. It is one of conservation's greatest success stories.",
    source: "USFWS / Peregrine Fund",
    color: "gold" as const,
  },
  {
    id: "gc-river",
    fact: "The Colorado River cut the entire Grand Canyon in just 5–6 million years",
    detail: "Geologically, that is a very short time. The river carved through rock layers deposited over 1.8 billion years — exposing nearly half the Earth's age in a single vertical mile. The Grand Canyon is literally a time machine through deep history.",
    source: "USGS Grand Canyon Geology",
    color: "red" as const,
  },
  {
    id: "gc-visibility",
    fact: "On a clear day, you can see for 200 miles from the South Rim",
    detail: "The Grand Canyon's scale makes it one of the few places on Earth where you can directly experience a view measured not in miles but in tens of miles. The far rim is 10+ miles away; the horizon is over 200 miles distant on a clear winter day.",
    source: "NPS Visitor Center",
    color: "blue" as const,
  },
  {
    id: "gc-dark-sky",
    fact: "Grand Canyon National Park is a designated Dark Sky Park",
    detail: "Far from city lights, the Grand Canyon offers some of the most spectacular stargazing in the American West. The Milky Way is visible with the naked eye on clear nights, and the park holds annual Star Party events attracting astronomers from around the world.",
    source: "International Dark-Sky Association",
    color: "gold" as const,
  },
];

export default async function GrandCanyonPage() {
  const locale = await getServerLocale();
  const isRo   = locale === "ro";
  const facts  = getGrandCanyonFacts(locale);

  return (
    <>
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image src={SITE_IMAGES.homeGrandCanyon} alt="Grand Canyon South Rim at sunrise" fill className="object-cover opacity-40" priority sizes="100vw" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 to-navy-dark" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: isRo ? "Natură" : "Nature", href: "/nature" }, { label: isRo ? "Marele Canion" : "Grand Canyon" }]} className="mb-8" />
          <p className="mb-4 section-eyebrow">{isRo ? "Marele Canion" : "Grand Canyon"}</p>
          <h1 className="mb-4 font-hero text-6xl text-white sm:text-7xl">
            {isRo ? "CEA MAI MARE" : "NATURE'S"}<br />
            <span className="text-orange-400">{isRo ? "SCULPTURĂ A NATURII" : "GREATEST SCULPTURE"}</span>
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-white/65">
            {isRo
              ? "277 de mile lungime, 18 mile lățime, un mile adâncime — expunând 1,8 miliarde de ani de geologie a Pământului. Niciun cuvânt, nicio fotografie nu poate pregăti un vizitator pentru primul contact cu Marele Canion."
              : "277 miles long, 18 miles wide, one mile deep — exposing 1.8 billion years of Earth's geological history. No words, no photograph can prepare a first-time visitor for the Grand Canyon."}
          </p>
        </div>
      </div>

      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          <section>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {GC_STATS.map((s) => (
                <StatCard key={s.id} value={s.value} suffix={s.suffix} label={s.label} description={s.description} source={s.source} variant={s.color === "gold" ? "gold" : "dark"} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-h2 text-white">{isRo ? "Un Mile prin Timp" : "A Mile Through Time"}</h2>
            <p className="mb-8 font-body text-lg leading-relaxed text-white/65">
              {isRo
                ? "Peretele canionului este un calendar de piatră. Fiecare strat reprezintă un mediu complet diferit — mări tropicale, deșerturi antice, câmpii de inundații — depozitate de-a lungul a sute de milioane de ani și apoi sculptate de râul Colorado."
                : "The canyon wall is a stone calendar. Each layer represents a completely different ancient environment — tropical seas, ancient deserts, flood plains — deposited over hundreds of millions of years and then carved by the Colorado River."}
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-mid">
              <div className="p-5 border-b border-white/10">
                <p className="font-body text-sm font-semibold text-white/70">{isRo ? "Straturile Geologice — de sus în jos" : "Geological Layers — top to bottom"}</p>
              </div>
              {GEOLOGY_LAYERS.map((layer, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-white/5 px-5 py-3.5 last:border-0">
                  <div className="h-4 w-4 shrink-0 rounded-sm" style={{ backgroundColor: layer.color }} />
                  <div className="flex-1">
                    <p className="font-body text-sm font-semibold text-white">{layer.layer}</p>
                    <p className="font-body text-xs text-white/40">{layer.depth}</p>
                  </div>
                  <p className="font-hero text-base text-glory-gold shrink-0">{layer.age}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative h-[300px] overflow-hidden rounded-2xl">
                <Image src="https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?q=80&w=900&auto=format&fit=crop" alt="Grand Canyon at dawn — layered canyon walls glowing in morning light" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
              </div>
              <div className="relative h-[300px] overflow-hidden rounded-2xl">
                <Image src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=900&auto=format&fit=crop" alt="Colorado River at the bottom of the Grand Canyon" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "Marele Canion în Detaliu" : "Grand Canyon in Detail"}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...facts, ...GC_EXTENDED_FACTS].map((fact) => (
                <FactCard key={fact.id} fact={fact.fact} detail={fact.detail} source={fact.source} color={fact.color} variant="dark" />
              ))}
            </div>
          </section>

          <QuoteBlock
            quote="Do nothing to mar its grandeur, sublimity and loveliness. You cannot improve on it. But what you can do is to keep it for your children, your children's children, and for all who come after you."
            attribution="Theodore Roosevelt" title="26th President, speaking at the Grand Canyon, May 6, 1903"
          />

          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link href="/nature/rockies" className="font-body text-sm text-white/50 hover:text-white transition-colors">← {isRo ? "Munții Stâncoși" : "Rocky Mountains"}</Link>
            <Link href="/nature/yellowstone" className="font-body text-sm font-semibold text-glory-gold hover:text-glory-gold-dark transition-colors">Yellowstone →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
