// ─── Rocky Mountains Sub-Page ─────────────────────────────────────────────────
// Hero: local SITE_IMAGES.glacierNationalPark
//
// Beginner guide:
// - Shared Rockies facts come from lib/data/nature-data.ts
// - Park lists and extra regional facts here are specific to this subpage
// - Visual effects like snow and parallax are handled by reusable nature components

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FactCard }   from "@/components/sections/FactCard";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { SnowParticles, AnimatedStatWall, ParallaxImageBand, HeroTextReveal } from "@/components/nature/NatureAnimations";
import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { SITE_IMAGES }      from "@/lib/site-images";
import { getRockiesFacts }  from "@/lib/data/nature-data";

export const metadata: Metadata = { title: "Rocky Mountains | Nature | America: The Greatest Nation", description: "The Rocky Mountains — 3,000 miles long, 53 peaks over 14,000 feet, and the backbone of North America." };

const ROCKIES_PARKS_EN = [
  { name: "Rocky Mountain NP",  state: "CO", highlight: "Most visited Rocky Mountain park — 4.4M visitors, 114 peaks over 11,000 ft, 3,000+ elk" },
  { name: "Grand Teton NP",     state: "WY", highlight: "Dramatic fault-block mountains rising 7,000 ft abruptly from the floor of Jackson Hole" },
  { name: "Glacier NP",         state: "MT", highlight: "Going-to-the-Sun Road — 50 miles of engineering wonder through pristine wilderness" },
  { name: "Yellowstone NP",     state: "WY/MT/ID", highlight: "World's first national park — 10,000 hydrothermal features, largest bison herd" },
  { name: "Great Sand Dunes NP",state: "CO", highlight: "North America's tallest sand dunes — 750 ft — set against a Rocky Mountain backdrop" },
  { name: "Black Canyon of the Gunnison NP", state: "CO", highlight: "One of the world's most dramatic gorges — 2,722 ft deep, only 40 ft wide at narrowest" },
];

const ROCKIES_PARKS_RO = [
  { name: "Rocky Mountain NP",  state: "CO", highlight: "Cel mai vizitat parc montan — 4,4M vizitatori, 114 vârfuri peste 3.350 m, 3.000+ elani" },
  { name: "Grand Teton NP",     state: "WY", highlight: "Munți spectaculoși ce se ridică brusc cu 2.100 m deasupra văii Jackson Hole" },
  { name: "Glacier NP",         state: "MT", highlight: "Going-to-the-Sun Road — 80 km de inginerie extraordinară prin sălbăticie pristină" },
  { name: "Yellowstone NP",     state: "WY/MT/ID", highlight: "Primul parc național din lume — 10.000 fenomene hidrotermale, cel mai mare turmă de bizon" },
  { name: "Great Sand Dunes NP",state: "CO", highlight: "Cele mai înalte dune de nisip din America de Nord — 228 m — pe fundal montan" },
  { name: "Black Canyon of the Gunnison NP", state: "CO", highlight: "Una dintre cele mai dramatice chei din lume — 829 m adâncime, doar 12 m lățime la cel mai îngust" },
];

const ROCKIES_EXTENDED_EN = [
  { id: "rc-divide",     fact: "The Continental Divide runs the full length of the Rockies",                detail: "Standing on the Divide, you can send raindrops to two different oceans. It is the geographical spine of North America, determining whether rivers flow to the Atlantic/Gulf or Pacific.", source: "USGS", color: "gold" as const },
  { id: "rc-skiing",     fact: "Colorado's ski resorts attract 13M+ skiers annually",                       detail: "Vail, Aspen, Breckenridge, Telluride, Snowmass — Colorado's ski resorts collectively host more international visitors than the Swiss Alps. The Rocky Mountain snowpack is a $10B+ annual economic engine.", source: "Colorado Ski Country USA 2024", color: "red" as const },
  { id: "rc-headwaters", fact: "The Rockies are the headwaters for 14 major river systems",                 detail: "The Colorado, Rio Grande, Arkansas, South Platte, Missouri, Columbia, and Snake Rivers all originate in the Rockies. Rocky Mountain snowpack provides drinking water for 70 million Americans.", source: "Western Water Assessment / USGS", color: "blue" as const },
];

const ROCKIES_EXTENDED_RO = [
  { id: "rc-divide",     fact: "Linia de Separare a Continentelor parcurge întreaga lungime a Munților Stâncoși", detail: "Stând pe Linia de Separare, poți trimite picături de ploaie spre două oceane diferite. Este coloana vertebrală geografică a Americii de Nord, determinând dacă râurile curg spre Atlantic/Golf sau Pacific.", source: "USGS", color: "gold" as const },
  { id: "rc-skiing",     fact: "Stațiunile de schi din Colorado atrag 13 milioane+ schiori anual",               detail: "Vail, Aspen, Breckenridge, Telluride, Snowmass — stațiunile montane din Colorado primesc în total mai mulți vizitatori internaționali decât Alpii elvețieni. Stratul de zăpadă din Munții Stâncoși generează anual peste 10 miliarde de dolari.", source: "Colorado Ski Country USA 2024", color: "red" as const },
  { id: "rc-headwaters", fact: "Munții Stâncoși sunt izvoarele a 14 sisteme fluviale majore",                    detail: "Colorado, Rio Grande, Arkansas, South Platte, Missouri, Columbia și Snake izvorăsc din Munții Stâncoși. Zăpada montană furnizează apă potabilă pentru 70 de milioane de americani.", source: "Western Water Assessment / USGS", color: "blue" as const },
];

export default async function RockiesPage() {
  // Keep locale selection at the top so every translated dataset is prepared
  // before the JSX starts.
  const locale   = await getServerLocale();
  const isRo     = locale === "ro";
  const facts    = getRockiesFacts(locale);
  const parks    = isRo ? ROCKIES_PARKS_RO : ROCKIES_PARKS_EN;
  const extFacts = isRo ? ROCKIES_EXTENDED_RO : ROCKIES_EXTENDED_EN;

  // A shared stat object format lets one animated component work across many
  // different nature subpages.
  const statWall = [
    { value: 3000, suffix: " mi",   label: isRo ? "Lungime Lanț Muntos" : "Mountain Length",      sub: isRo ? "De la New Mexico până în Canada" : "New Mexico to northern Canada",  color: "#e2e8f0" },
    { value: 53,   suffix: "",      label: isRo ? "Vârfuri 14.000 ft" : "14,000 ft Peaks",         sub: isRo ? "Doar în Colorado" : "In Colorado alone",                              color: "#FFD700" },
    { value: 14440,suffix: " ft",   label: isRo ? "Mt. Elbert (ft)" : "Mt. Elbert (ft)",           sub: isRo ? "Cel mai înalt din Munții Stâncoși" : "Highest in the Rockies",        color: "#e2e8f0" },
    { value: 8,    suffix: "",      label: isRo ? "Parcuri Naționale Majore" : "Major National Parks", sub: isRo ? "Incl. Yellowstone & Grand Teton" : "Incl. Yellowstone & Grand Teton", color: "#4ade80" },
  ];

  return (
    <>
      <div className="relative bg-[#060e18] pt-28 pb-16 overflow-hidden">
        <SnowParticles count={40} />
        <Image src={SITE_IMAGES.glacierNationalPark}
          alt={isRo ? "Parcul Național Glacier — lacuri alpine și vârfuri zimțate" : "Glacier National Park — alpine lakes and jagged peaks"}
          fill className="object-cover opacity-40" priority sizes="100vw"
          placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060e18]/65 to-[#060e18]" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: isRo ? "Natură" : "Nature", href: "/nature" }, { label: isRo ? "Munții Stâncoși" : "Rocky Mountains" }]} className="mb-8" />
          <HeroTextReveal eyebrow={isRo ? "Munții Stâncoși" : "Rocky Mountains"}
            line1={isRo ? "COLOANA VERTEBRALĂ" : "BACKBONE OF"}
            line2={isRo ? "A AMERICII DE NORD" : "NORTH AMERICA"}
            line2Color="#bfdbfe"
            body={isRo
              ? "3.000 de mile de piscuri acoperite de zăpadă și văi alpine. 53 de vârfuri în Colorado depășesc 4.267 m — mai mult decât orice țară din afara Himalaiei."
              : "3,000 miles of snow-capped peaks and alpine valleys. 53 peaks in Colorado alone topping 14,000 feet — more than any country outside the Himalayas."}>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-blue-300/25 bg-blue-900/20 px-5 py-2.5 backdrop-blur-sm">
              <span className="text-xl">🏔️</span>
              <span className="font-body text-sm text-blue-200">
                {isRo ? "Linia de Separare a Continentelor — coloana vertebrală a Americii de Nord" : "The Continental Divide — backbone of North America"}
              </span>
            </div>
          </HeroTextReveal>
        </div>
      </div>

      <section className="bg-navy-dark px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl"><AnimatedStatWall stats={statWall} /></div>
      </section>

      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 space-y-16">

          <section>
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "Parcuri Naționale în Munții Stâncoși" : "Rocky Mountain National Parks"}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {parks.map((park) => (
                <div key={park.name} className="rounded-2xl border border-white/10 bg-navy-mid p-5 transition-all hover:border-blue-300/30">
                  <p className="mb-1 font-display text-lg font-semibold text-white">{park.name}</p>
                  <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-blue-300">{park.state}</p>
                  <p className="font-body text-sm leading-relaxed text-white/55">{park.highlight}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Local Glacier NP image for parallax */}
          <ParallaxImageBand imageSrc={SITE_IMAGES.glacierNationalPark}
            imageAlt={isRo ? "Parcul Național Glacier — peisaj alpin sublim" : "Glacier National Park — sublime alpine landscape"}
            height={420} overlayOpacity={0.42}>
            <div className="text-center px-4">
              <p className="font-hero text-6xl text-white/90 md:text-8xl">3,000+</p>
              <p className="mt-3 font-body text-xl text-white/80">
                {isRo ? "Elani în Parcul Național Rocky Mountain" : "Elk in Rocky Mountain National Park"}
              </p>
              <p className="mt-2 font-body text-sm text-white/45">
                {isRo ? "Cel mai spectaculos sunet din natură — elk bugling în septembrie" : "The most spectacular sound in nature — elk bugling in September"}
              </p>
            </div>
          </ParallaxImageBand>

          <section>
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "De ce Contează Munții Stâncoși" : "Why the Rockies Matter"}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...facts, ...extFacts].map((fact) => (
                <FactCard key={fact.id} fact={fact.fact} detail={fact.detail} source={fact.source} color={fact.color} variant="dark" />
              ))}
            </div>
          </section>

          <QuoteBlock
            quote={isRo ? "Munții Stâncoși nu sunt o trăsătură a acestei țări — ei sunt țara. Stai pe Linia de Separare și ești în centrul a tot." : "The Rocky Mountains are not a feature of this country — they are the country. Stand on the Great Divide and you are standing at the center of everything."}
            attribution="Wallace Stegner" title={isRo ? "Autor, The Sound of Mountain Water" : "Author, The Sound of Mountain Water"} variant="dark"
          />

          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link href="/nature/alaska" className="font-body text-sm text-white/50 hover:text-white transition-colors">← Alaska</Link>
            <Link href="/nature/grand-canyon" className="font-body text-sm font-semibold text-blue-300 hover:text-blue-200 transition-colors">{isRo ? "Marele Canion →" : "Grand Canyon →"}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
