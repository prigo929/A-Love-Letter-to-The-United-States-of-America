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
import {
  NatStyles,
  NatureSubPageHero,
  AnimatedStatWall,
  ParallaxImageBand,
  HeroTextReveal,
  NatureQuoteBreak,
  NatureFactModule,
} from "@/components/nature/NatureAnimations";

import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { SITE_IMAGES }      from "@/lib/site-images";
import { getRockiesFacts }  from "@/lib/data/nature-data";

export const metadata: Metadata = {
  title: "Rocky Mountains | Nature",
  description: "The Rocky Mountains: 3,000 miles long, 53 peaks over 14,000 feet, and the backbone of North America.",
};

const ROCKIES_PARKS_EN = [
  { name: "Rocky Mountain NP",  state: "CO", highlight: "Most visited Rocky Mountain park: 4.4M visitors, 114 peaks over 11,000 ft, 3,000+ elk" },
  { name: "Grand Teton NP",     state: "WY", highlight: "Dramatic fault-block mountains rising 7,000 ft abruptly from the floor of Jackson Hole" },
  { name: "Glacier NP",         state: "MT", highlight: "Going-to-the-Sun Road: 50 miles of engineering wonder through pristine wilderness" },
  { name: "Yellowstone NP",     state: "WY/MT/ID", highlight: "World's first national park: 10,000 hydrothermal features, largest bison herd" },
  { name: "Great Sand Dunes NP",state: "CO", highlight: "North America's tallest sand dunes (750 ft), set against a Rocky Mountain backdrop" },
  { name: "Black Canyon of the Gunnison NP", state: "CO", highlight: "One of the world's most dramatic gorges: 2,722 ft deep, only 40 ft wide at narrowest" },
];

const ROCKIES_PARKS_RO = [
  { name: "Rocky Mountain NP",  state: "CO", highlight: "Cel mai vizitat parc montan: 4,4M vizitatori, 114 vârfuri peste 3.350 m, 3.000+ elani" },
  { name: "Grand Teton NP",     state: "WY", highlight: "Munți spectaculoși ce se ridică brusc cu 2.100 m deasupra văii Jackson Hole" },
  { name: "Glacier NP",         state: "MT", highlight: "Going-to-the-Sun Road: 80 km de inginerie extraordinară prin sălbăticie pristină" },
  { name: "Yellowstone NP",     state: "WY/MT/ID", highlight: "Primul parc național din lume: 10.000 fenomene hidrotermale, cel mai mare turmă de bizon" },
  { name: "Great Sand Dunes NP",state: "CO", highlight: "Cele mai înalte dune de nisip din America de Nord (228 m), pe fundal montan" },
  { name: "Black Canyon of the Gunnison NP", state: "CO", highlight: "Una dintre cele mai dramatice chei din lume: 829 m adâncime, doar 12 m lățime la cel mai îngust" },
];

const ROCKIES_EXTENDED_EN = [
  { id: "rc-divide",     fact: "The Continental Divide runs the full length of the Rockies",                detail: "Standing on the Divide, you can send raindrops to two different oceans. It is the geographical spine of North America, determining whether rivers flow to the Atlantic/Gulf or Pacific.", source: "USGS", color: "gold" as const },
  { id: "rc-skiing",     fact: "Colorado's ski resorts attract 13M+ skiers annually",                       detail: "Vail, Aspen, Breckenridge, Telluride, and Snowmass ski resorts collectively host more international visitors than the Swiss Alps. The Rocky Mountain snowpack is a $10B+ annual economic engine.", source: "Colorado Ski Country USA 2024", color: "red" as const },
  { id: "rc-headwaters", fact: "The Rockies are the headwaters for 14 major river systems",                 detail: "The Colorado, Rio Grande, Arkansas, South Platte, Missouri, Columbia, and Snake Rivers all originate in the Rockies. Rocky Mountain snowpack provides drinking water for 70 million Americans.", source: "Western Water Assessment / USGS", color: "blue" as const },
];

const ROCKIES_EXTENDED_RO = [
  { id: "rc-divide",     fact: "Linia de Separare a Continentelor parcurge întreaga lungime a Munților Stâncoși", detail: "Stând pe Linia de Separare, poți trimite picături de ploaie spre două oceane diferite. Este coloana vertebrală geografică a Americii de Nord, determinând dacă râurile curg spre Atlantic/Golf sau Pacific.", source: "USGS", color: "gold" as const },
  { id: "rc-skiing",     fact: "Stațiunile de schi din Colorado atrag 13 milioane+ schiori anual",               detail: "Vail, Aspen, Breckenridge, Telluride și Snowmass primesc în total mai mulți vizitatori internaționali decât Alpii elvețieni. Stratul de zăpadă din Munții Stâncoși generează anual peste 10 miliarde de dolari.", source: "Colorado Ski Country USA 2024", color: "red" as const },
  { id: "rc-headwaters", fact: "Munții Stâncoși sunt izvoarele a 14 sisteme fluviale majore",                    detail: "Colorado, Rio Grande, Arkansas, South Platte, Missouri, Columbia și Snake izvorăsc din Munții Stâncoși. Zăpada montană furnizează apă potabilă pentru 70 de milioane de americani.", source: "Western Water Assessment / USGS", color: "blue" as const },
];

export default async function RockiesPage() {
  const locale   = await getServerLocale();
  const isRo     = locale === "ro";
  const facts    = getRockiesFacts(locale);
  const parks    = isRo ? ROCKIES_PARKS_RO : ROCKIES_PARKS_EN;
  const extFacts = isRo ? ROCKIES_EXTENDED_RO : ROCKIES_EXTENDED_EN;

  const statWall = [
    { value: isRo ? 4828 : 3000, suffix: isRo ? " km" : " mi",   label: isRo ? "Lungime Lanț Muntos" : "Mountain Length",      sub: isRo ? "De la New Mexico până în Canada" : "New Mexico to northern Canada",  color: "#C4956A" },
    { value: 53,   suffix: "",      label: isRo ? "Vârfuri peste 4.267 m" : "14,000 ft Peaks",         sub: isRo ? "Doar în Colorado" : "In Colorado alone",                              color: "#8B8680" },
    { value: isRo ? 4401 : 14440, suffix: isRo ? " m" : " ft",   label: isRo ? "Mt. Elbert (m)" : "Mt. Elbert (ft)",           sub: isRo ? "Cel mai înalt din Munții Stâncoși" : "Highest in the Rockies",        color: "#60a5fa" },
    { value: 8,    suffix: "",      label: isRo ? "Parcuri Naționale Majore" : "Major National Parks", sub: isRo ? "Incl. Yellowstone & Grand Teton" : "Incl. Yellowstone & Grand Teton", color: "#4ade80" },
  ];

  const colorMap = { gold: 'earth' as const, red: 'earth' as const, blue: 'glacier' as const, green: 'forest' as const };

  return (
    <>
      <NatStyles />

      {/* ── HERO: single image cinematic entrance ───────────────────────── */}
      <NatureSubPageHero
        imageSrc={SITE_IMAGES.glacierNationalPark}
        imageAlt={isRo ? "Munții Stâncoși" : "Rocky Mountains"}
        label={isRo ? "ROCKY MOUNTAINS · THE BACKBONE OF AMERICA" : "ROCKY MOUNTAINS · THE BACKBONE OF AMERICA"}
      >

        <HeroTextReveal
          eyebrow={isRo ? "Munții Stâncoși" : "The Rocky Mountains"}
          line1={isRo ? "COLOANA" : "THE AMERICAN"}
          line2={isRo ? "VERTEBRALĂ" : "BACKBONE"}
          line2Color="var(--nat-accent-stone)"
          body={isRo 
            ? "Întinzându-se pe 4.828 km din British Columbia până în New Mexico, Munții Stâncoși definesc peisajul vestic și sunt sursa marilor râuri ale continentului."
            : "Stretching 3,000 miles from British Columbia to New Mexico, the Rockies define the Western landscape and serve as the headwaters for the continent's great rivers."}
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

          {/* Parks showcase borderless grid */}
          <section className="max-w-5xl mx-auto">
            <h2 className="nat-text-section text-white mb-10">
              {isRo ? "Parcuri Naționale Majore" : "Major National Parks"}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 border-t border-white/4 pt-8">
              {parks.map((park) => (
                <div key={park.name} className="border-b border-white/4 pb-6 last:border-0 group">
                  <p className="nat-text-metadata text-white/40 mb-1 tracking-widest">{park.state}</p>
                  <p className="text-lg font-semibold text-white tracking-wide mb-2 group-hover:text-(--nat-accent-glacier) transition-colors">
                    {park.name}
                  </p>
                  <p className="nat-text-body">{park.highlight}</p>
                </div>
              ))}
            </div>
          </section>

        </div> {/* End first container */}

        {/* Parallax divider - FULL WIDTH */}
        <div className="my-32">
          <ParallaxImageBand
            imageSrc={SITE_IMAGES.glacierNationalPark}
            imageAlt={isRo ? "Parcul Național Glacier" : "Glacier National Park"}
            height={600}
            overlayOpacity={0.5}
          >
            <div className="text-center max-w-4xl mx-auto px-6">
              <p className="nat-text-display" style={{ color: 'var(--nat-accent-earth)' }}>3,000+</p>
              <p className="nat-text-heading text-white mt-4">
                {isRo ? "Elani în Parcul Național Rocky Mountain" : "Elk in Rocky Mountain National Park"}
              </p>
              <p className="nat-text-body text-white/60 mt-2">
                {isRo ? "Cel mai spectaculos sunet din natură: elk bugling în septembrie" : "The most spectacular sound in nature: elk bugling in September"}
              </p>
            </div>
          </ParallaxImageBand>
        </div>

        <div className="mx-auto max-w-[1440px] w-full px-6 md:px-12 space-y-32">

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
            quote={isRo ? "Munții Stâncoși constituie inima continentului: pe Linia de Separare a Continentelor, te afli la centrul Americii de Nord." : "The Rocky Mountains form the true heart of this land: standing on the Great Divide, you are at the center of North America."}
            attribution="Wallace Stegner"
            title={isRo ? "Autor, The Sound of Mountain Water" : "Author, The Sound of Mountain Water"}
          />

          {/* Sub-page Navigation Footer */}
          <div className="flex items-center justify-between border-t border-white/4 pt-12 max-w-5xl mx-auto">
            <Link href="/nature/alaska" className="nat-text-label text-white/40 hover:text-white transition-colors">
              ← Alaska
            </Link>
            <Link href="/nature/grand-canyon" className="nat-text-label text-white/40 hover:text-white transition-colors" style={{ color: 'var(--nat-accent-glacier)' }}>
              {isRo ? "Marele Canion →" : "Grand Canyon →"}
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
