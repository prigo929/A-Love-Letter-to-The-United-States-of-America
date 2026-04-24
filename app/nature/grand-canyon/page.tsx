// ─── Grand Canyon Sub-Page ────────────────────────────────────────────────────
// Beginner guide:
// - Shared Grand Canyon facts come from lib/data/nature-data.ts
// - The geology layers below are page-only because they drive a custom visual
// - Hero and parallax images are pulled from SITE_IMAGES

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb }  from "@/components/layout/Breadcrumb";
import { FactCard }    from "@/components/sections/FactCard";
import { QuoteBlock }  from "@/components/sections/QuoteBlock";
import { CanyonStrataReveal, AnimatedStatWall, ParallaxImageBand, HeroTextReveal } from "@/components/nature/NatureAnimations";
import { getServerLocale }     from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER }    from "@/lib/utils";
import { SITE_IMAGES }         from "@/lib/site-images";
import { getGrandCanyonFacts } from "@/lib/data/nature-data";

export const metadata: Metadata = {
  title: "Grand Canyon | Nature | America: The Greatest Nation",
  description: "277 miles long, 18 miles wide, one mile deep — exposing 1.8 billion years of Earth's geological history.",
};

const GEOLOGY_LAYERS_EN = [
  { layer: "Kaibab Limestone",      age: "270M yrs",      depth: "Rim (top)",            color: "#e8d5b0" },
  { layer: "Toroweap Formation",    age: "273M yrs",      depth: "Just below rim",       color: "#d4b896" },
  { layer: "Coconino Sandstone",    age: "275M yrs",      depth: "300 ft below rim",     color: "#f5e6c8" },
  { layer: "Hermit Shale",          age: "280M yrs",      depth: "500 ft",               color: "#c4705a" },
  { layer: "Supai Group",           age: "285–315M yrs",  depth: "800–1,800 ft",         color: "#b85540" },
  { layer: "Redwall Limestone",     age: "340M yrs",      depth: "1,800 ft",             color: "#a04030" },
  { layer: "Tonto Group",           age: "500–545M yrs",  depth: "3,000 ft",             color: "#7a9060" },
  { layer: "Vishnu Basement Rocks", age: "1.7–1.8B yrs",  depth: "River level (bottom)", color: "#4a3d6b" },
];

const GEOLOGY_LAYERS_RO = [
  { layer: "Calcar Kaibab",          age: "270M ani",      depth: "Margine (vârf)",         color: "#e8d5b0" },
  { layer: "Formația Toroweap",      age: "273M ani",      depth: "Imediat sub margine",    color: "#d4b896" },
  { layer: "Gresie Coconino",        age: "275M ani",      depth: "91 m sub margine",       color: "#f5e6c8" },
  { layer: "Șist Hermit",            age: "280M ani",      depth: "152 m",                  color: "#c4705a" },
  { layer: "Grupul Supai",           age: "285–315M ani",  depth: "243–548 m",              color: "#b85540" },
  { layer: "Calcar Redwall",         age: "340M ani",      depth: "548 m",                  color: "#a04030" },
  { layer: "Grupul Tonto",           age: "500–545M ani",  depth: "914 m",                  color: "#7a9060" },
  { layer: "Roci Baza Vishnu",       age: "1,7–1,8 mld ani",depth: "Nivelul râului (fund)", color: "#4a3d6b" },
];

const GC_EXTENDED_EN = [
  { id: "gc-condor", fact: "The Grand Canyon saved the California condor from extinction",     detail: "Once reduced to just 27 individuals, California condors were released here in 1996. Over 500 now exist — one of conservation's greatest success stories.", source: "USFWS / Peregrine Fund", color: "gold" as const },
  { id: "gc-river",  fact: "The Colorado River carved the entire canyon in just 5–6 million years", detail: "Geologically a very short time — the river carved through rock deposited over 1.8 billion years, exposing nearly half the Earth's age in one vertical mile.", source: "USGS Grand Canyon Geology", color: "red"  as const },
  { id: "gc-sky",    fact: "On a clear day, you can see for 200 miles from the South Rim",       detail: "The Grand Canyon's scale is so vast you experience a view measured in tens of miles. The far rim is 10+ miles away; the horizon over 200 miles distant on clear winter days.", source: "NPS Visitor Center", color: "blue" as const },
  { id: "gc-dark",   fact: "Grand Canyon is a certified International Dark Sky Park",             detail: "Far from city lights, the canyon offers spectacular stargazing. The Milky Way is visible with the naked eye on clear nights, and the park holds annual Star Party events for astronomers.", source: "International Dark-Sky Association", color: "gold" as const },
];

const GC_EXTENDED_RO = [
  { id: "gc-condor", fact: "Marele Canion a salvat condorul californian de la dispariție",       detail: "Odată redus la doar 27 de exemplare, condorii californieni au fost eliberați în 1996. Acum există peste 500 — una dintre cele mai mari reușite ale conservării.", source: "USFWS / Peregrine Fund", color: "gold" as const },
  { id: "gc-river",  fact: "Râul Colorado a sculptat întregul canion în doar 5–6 milioane de ani", detail: "Geologic, este un timp foarte scurt — râul a tăiat prin roci depuse pe parcursul a 1,8 miliarde de ani, expunând aproape jumătate din vârsta Pământului într-un singur mile vertical.", source: "USGS Grand Canyon Geology", color: "red"  as const },
  { id: "gc-sky",    fact: "Pe vreme senină, poți vedea 320 km de pe South Rim",                  detail: "Scara Marelui Canion este atât de vastă încât experiezi o priveliște măsurată în zeci de mile. Malul opus este la 16+ km distanță; orizontul la peste 320 km în zilele senine de iarnă.", source: "NPS Visitor Center", color: "blue" as const },
  { id: "gc-dark",   fact: "Marele Canion este un Parc Internațional cu Cer Întunecat certificat",  detail: "Departe de luminile orașului, canionul oferă o priveliște spectaculoasă spre stele. Calea Lactee este vizibilă cu ochiul liber în nopțile senine.", source: "International Dark-Sky Association", color: "gold" as const },
];

export default async function GrandCanyonPage() {
  // Pick language first, then swap in the right geology labels and supporting
  // facts for the rest of the page.
  const locale   = await getServerLocale();
  const isRo     = locale === "ro";
  const facts    = getGrandCanyonFacts(locale);
  const layers   = isRo ? GEOLOGY_LAYERS_RO : GEOLOGY_LAYERS_EN;
  const extFacts = isRo ? GC_EXTENDED_RO : GC_EXTENDED_EN;

  // This uniform array shape is what the reusable animated stat wall expects.
  const statWall = [
    { value: 277,  suffix: " mi",    label: isRo ? "Lungime" : "Length",          sub: isRo ? "De-a lungul râului Colorado" : "Along the Colorado River",    color: "#fb923c" },
    { value: 18,   suffix: " mi",    label: isRo ? "Lățime Max." : "Max Width",   sub: isRo ? "Margine la margine, la cel mai lat" : "Rim to rim at widest", color: "#FFD700" },
    { value: 6093, suffix: " ft",    label: isRo ? "Ad. Maximă" : "Max Depth",    sub: isRo ? "Până la râul Colorado" : "To the Colorado River below",       color: "#fb923c" },
    { value: 1800, suffix: "M yr",   label: isRo ? "Geologie Expusă" : "Geology Exposed", sub: isRo ? "Din istoria Pământului" : "Of Earth's history",      color: "#a78bfa" },
  ];

  return (
    <>
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image src={SITE_IMAGES.homeGrandCanyon}
          alt={isRo ? "Marele Canion la răsărit de soare — niveluri geologice colorate" : "Grand Canyon at sunrise — layered geological strata"}
          fill className="object-cover opacity-50" priority sizes="100vw"
          placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/75 to-navy-dark" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: isRo ? "Natură" : "Nature", href: "/nature" }, { label: isRo ? "Marele Canion" : "Grand Canyon" }]} className="mb-8" />
          <HeroTextReveal
            eyebrow={isRo ? "Marele Canion" : "Grand Canyon"}
            line1={isRo ? "CEA MAI MARE" : "NATURE'S"}
            line2={isRo ? "SCULPTURĂ A NATURII" : "GREATEST SCULPTURE"}
            line2Color="#fb923c"
            body={isRo
              ? "277 de mile lungime, 18 mile lățime, un mile adâncime — expunând 1,8 miliarde de ani de geologie. Niciun cuvânt, nicio fotografie nu poate pregăti un vizitator pentru primul contact cu Marele Canion."
              : "277 miles long, 18 miles wide, one mile deep — exposing 1.8 billion years of Earth's geological history. No words, no photograph can prepare a first-time visitor."}
          />
        </div>
      </div>

      <section className="bg-navy-dark px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl"><AnimatedStatWall stats={statWall} /></div>
      </section>

      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 space-y-16">

          <section>
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "Un Mile prin Timp" : "A Mile Through Time"}</h2>
            <p className="mb-8 font-body text-lg leading-relaxed text-white/65">
              {isRo
                ? "Peretele canionului este un calendar de piatră. Fiecare strat reprezintă un mediu complet diferit — mări tropicale, deșerturi antice, câmpii de inundații — depozitate de-a lungul a sute de milioane de ani."
                : "The canyon wall is a stone calendar. Each layer represents a completely different ancient environment — tropical seas, ancient deserts, flood plains — deposited over hundreds of millions of years."}
            </p>
            <CanyonStrataReveal layers={layers} />
          </section>

          <section>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative h-[300px] overflow-hidden rounded-2xl">
                <Image src={SITE_IMAGES.homeGrandCanyon}
                  alt={isRo ? "Marele Canion — priveliște panoramică la amiază" : "Grand Canyon — panoramic midday view"}
                  fill className="object-cover object-bottom" sizes="(max-width:768px) 100vw, 50vw"
                  placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
                <div className="absolute bottom-4 left-4 rounded-lg border border-white/15 bg-black/60 px-3 py-2 backdrop-blur-sm">
                  <p className="font-body text-xs text-white/70">{isRo ? "South Rim, Arizona" : "South Rim, Arizona"}</p>
                </div>
              </div>
              <div className="relative h-[300px] overflow-hidden rounded-2xl">
                <Image src={SITE_IMAGES.zionNationalPark}
                  alt={isRo ? "Zion National Park — canioane din gresie roșie, nearby" : "Zion National Park — nearby red sandstone canyon"}
                  fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw"
                  placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
                <div className="absolute bottom-4 left-4 rounded-lg border border-white/15 bg-black/60 px-3 py-2 backdrop-blur-sm">
                  <p className="font-body text-xs text-white/70">{isRo ? "Zion NP — la 160 km nord" : "Zion NP — 100 miles north"}</p>
                </div>
              </div>
            </div>
          </section>

          <ParallaxImageBand imageSrc={SITE_IMAGES.homeGrandCanyon}
            imageAlt={isRo ? "Marele Canion la ora de aur" : "Grand Canyon at golden hour"}
            height={360} overlayOpacity={0.5}>
            <div className="text-center px-4">
              <p className="font-hero text-5xl text-orange-300 md:text-7xl">1.8 {isRo ? "MILIARDE" : "BILLION"}</p>
              <p className="mt-3 font-body text-xl text-white/80">
                {isRo ? "ani de geologie expusă într-un mile vertical" : "years of geology exposed in one vertical mile"}
              </p>
            </div>
          </ParallaxImageBand>

          <section>
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "Marele Canion în Detaliu" : "Grand Canyon in Detail"}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...facts, ...extFacts].map((fact) => (
                <FactCard key={fact.id} fact={fact.fact} detail={fact.detail} source={fact.source} color={fact.color} variant="dark" />
              ))}
            </div>
          </section>

          <QuoteBlock
            quote={isRo ? "Nu faceți nimic pentru a-i deteriora grandoarea. Nu-l puteți îmbunătăți. Dar ceea ce puteți face este să-l păstrați pentru copiii voștri, copiii copiilor voștri și pentru toți cei care vin după voi." : "Do nothing to mar its grandeur, sublimity and loveliness. You cannot improve on it. But what you can do is to keep it for your children, your children's children, and for all who come after you."}
            attribution="Theodore Roosevelt"
            title={isRo ? "Al 26-lea Președinte, la Marele Canion, 6 mai 1903" : "26th President, speaking at the Grand Canyon, May 6, 1903"}
            variant="dark"
          />

          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link href="/nature/rockies" className="font-body text-sm text-white/50 hover:text-white transition-colors">← {isRo ? "Munții Stâncoși" : "Rocky Mountains"}</Link>
            <Link href="/nature/yellowstone" className="font-body text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors">Yellowstone →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
