// ─── Nature & Geography Main Page ────────────────────────────────────────────
// This is the "Immersive Multimedia" hub for the American landscape.
//
// Pedagogical Strategy:
// - Atmospheric Immersion: Uses crossfading heroes, parallax dividers, and 
//   particle effects to create a sense of scale and majesty.
// - Technical Data: Balances "beauty shots" with hard data (visitor counts,
//   biodiversity species) to drive the "America is Unique" narrative.
//
// Server Component — all interactive parts imported as client leaves.
//
// Beginner guide:
// - To change the stats or text, edit lib/data/nature-data.ts
// - To change the hero images, update the HERO_SLIDES in components/nature/NatureAnimations.tsx
// - To rearrange the page, edit the JSX sections below.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  NatStyles,
  NatureHeroCrossfade,
  ParallaxImageBand,
  AnimatedStatWall,
  ParkCinematicGrid,
  HeroTextReveal,
  RegionCardsGrid,
  NatureQuoteBreak,
  NatureFactModule,
} from "@/components/nature/NatureAnimations";
import { ParkVisitorsChart, BiodiversityChart } from "@/components/data/NatureCharts";

import { getServerLocale } from "@/lib/i18n/server";
import { SITE_IMAGES }     from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { VERTICALS_THEMATIC_DATA } from "@/lib/data/verticals-thematic-data";
import DeepDiveSection from "@/components/shared/DeepDiveSection";
import { DEEP_DIVE_THEMES } from "@/lib/deep-dive-themes";

import {
  getNatureHeroStats,
  getNatureOverviewParagraphs,
  getNatureOverviewFacts,
  getNatureSubPages,
  getNatureQuotes,
  getNatureRegions,
  getFeaturedParks,
  getTopParksVisitors,
  getBiodiversityByCountry,
} from "@/lib/data/nature-data";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Nature & Geography",
  description:
    "From Arctic Alaska to tropical Hawaii — no nation on Earth possesses such extraordinary diversity of natural wonders. 63 national parks, the Great Lakes, Yellowstone, the Grand Canyon, and more.",
  alternates: { canonical: "/nature" },
  openGraph: {
    title: "America the Beautiful — Nature & Geography",
    description:
      "63 national parks, 85 million protected acres, 21% of Earth's freshwater, and landscapes found nowhere else on the planet.",
    url: "/nature",
    images: [{ url: SITE_IMAGES.homeGrandCanyon, width: 1200, height: 630, alt: "Grand Canyon" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "America the Beautiful — Nature & Geography",
  description: "A deep dive into the extraordinary natural diversity of the United States.",
  url: "https://americagreatest.com/nature",
  author: { "@type": "Organization", name: "America: The Greatest Nation" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function NaturePage() {
  // The locale decides all copy on the page.
  // `isRo` is just a short helper boolean so the JSX stays readable below.
  const locale     = await getServerLocale();
  const isRo       = locale === "ro";

  // This page is intentionally data-driven.
  // Most factual content changes should happen in `lib/data/nature-data.ts`,
  // not by hard-coding new strings directly into the JSX.
  const heroStats  = getNatureHeroStats(locale);
  const paragraphs = getNatureOverviewParagraphs(locale);
  const facts      = getNatureOverviewFacts(locale);
  const subPages   = getNatureSubPages(locale);
  const quotes     = getNatureQuotes(locale);
  const regions    = getNatureRegions(locale);
  const featuredParks = getFeaturedParks(locale);
  const topParksVisitors = getTopParksVisitors(locale);
  const biodiversityData = getBiodiversityByCountry(locale);

  // `AnimatedStatWall` expects a very specific visual data shape, so we map the
  // shared content data into the format that component needs.
  const statWallData = heroStats.map((s) => ({
    value: s.value,
    suffix: s.suffix,
    prefix: s.prefix,
    decimals: s.decimals,
    label: s.label,
    sub: s.source,
    color: s.color === "gold" ? "#C4956A" : s.color === "red" ? "#4ade80" : "#8B8680",
  }));

  return (
    <>
      <NatStyles />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO — crossfading 5 landscapes ──────────────────────────────── */}
      <NatureHeroCrossfade>
        <HeroTextReveal
          eyebrow={isRo ? "Natură și Geografie" : "Nature & Geography"}
          line1={isRo ? "AMERICA" : "AMERICA"}
          line2={isRo ? "CEA FRUMOASĂ" : "THE BEAUTIFUL"}
          line2Color="#4ade80"
          body={
            isRo
              ? "Nicio națiune de pe Pământ nu posedă o diversitate atât de extraordinară de minuni naturale — de la tundra arctică la pădurile tropicale, de la cel mai înalt vârf al Americii de Nord la cel mai mare sistem de apă dulce din lume."
              : "No nation on Earth possesses such extraordinary diversity of natural wonders — from Arctic tundra to tropical rainforests, from North America's highest peak to the world's greatest freshwater system."
          }
        >
          <div className="mt-10 flex flex-wrap gap-10">
            {[
              { value: "63",  label: isRo ? "Parcuri Naționale" : "National Parks",  sub: "NPS 2024" },
              { value: "85M", label: isRo ? "Acri Protejați"   : "Acres Protected",  sub: "NPS 2024" },
              { value: "21%", label: isRo ? "Apă Dulce Globală": "Global Freshwater", sub: "EPA/GLC"  },
            ].map((s) => (
              <div key={s.value} className="text-center">
                <p className="text-[clamp(32px,5vw,56px)] font-extralight tracking-tighter text-[#4ade80]">{s.value}</p>
                <p className="nat-text-label mt-1">{s.label}</p>
                <p className="nat-text-metadata mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </HeroTextReveal>
      </NatureHeroCrossfade>

      {/* ── ANIMATED STAT WALL ────────────────────────────────────────────── */}
      <section className="bg-(--nat-void,#030504) px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <AnimatedStatWall stats={statWallData} />
        </div>
      </section>

      {/* ── PARALLAX QUOTE BAND 1 — Roosevelt ────────────────────────────── */}
      <ParallaxImageBand
        imageSrc={SITE_IMAGES.yosemiteNationalPark}
        imageAlt="Yosemite Valley with Half Dome at sunrise"
        height={500}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="nat-text-section italic leading-[1.8] mb-14" style={{ fontSize: 'clamp(20px, 3.5vw, 40px)', fontWeight: 400, letterSpacing: '0.04em', wordSpacing: '0.1em' }}>
            &ldquo;{isRo
              ? "Nu faceți nimic pentru a-l deteriora. Nu-l puteți îmbunătăți. Singurul lucru pe care îl puteți face este să-l lăsați în seama celor ce vin după voi."
              : "Do nothing to mar its grandeur. You cannot improve on it. Keep it for your children and your children's children."
            }&rdquo;
          </p>
          <p className="nat-text-label" style={{ color: 'var(--nat-accent-earth)' }}>— Theodore Roosevelt, 1903</p>
        </div>
      </ParallaxImageBand>

      {/* ── OVERVIEW NARRATIVE ──────────────────────────────────────────── */}
      <section className="bg-(--nat-void,#030504) py-24 md:py-32">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <p className="nat-text-label mb-8" style={{ color: 'var(--nat-accent-earth)' }}>
            {isRo ? "Prezentare Generală" : "Overview"}
          </p>
          <h2 className="nat-text-heading text-white mb-10">{isRo ? "America cea Frumoasă" : "America the Beautiful"}</h2>
          {paragraphs.map((para, i) => (
            <p key={i} className="nat-text-body mb-6">{para}</p>
          ))}
        </div>
      </section>

      {/* ── FACT MODULES ──────────────────────────────────────────────────── */}
      <section className="bg-(--nat-void,#030504)">
        <div className="mx-auto max-w-[900px] px-6 md:px-12 pb-16">
          {facts.slice(0, 3).map((fact, i) => (
            <NatureFactModule
              key={fact.id}
              fact={fact.fact}
              detail={fact.detail}
              source={fact.source}
              color={i === 0 ? 'earth' : i === 1 ? 'forest' : 'glacier'}
            />
          ))}
        </div>
      </section>

      {/* ── NATIONAL PARKS — chart ───────────────────────────────────────── */}
      <section className="bg-(--nat-void,#030504) py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <p className="nat-text-label mb-6" style={{ color: 'var(--nat-accent-forest)' }}>
            {isRo ? "Sistemul Parcurilor Naționale" : "The National Parks System"}
          </p>
          <h2 className="nat-text-heading text-white mb-6">
            {isRo ? "Cea Mai Bună Idee a Americii" : "The Best Idea America Ever Had"}
          </h2>
          <p className="nat-text-body mb-12 max-w-[700px]">
            {isRo
              ? "Înființat în 1872 cu Yellowstone, Sistemul Național de Parcuri al SUA protejează astăzi 85 de milioane de acri în 63 de parcuri și 423 de situri totale — un model de conservare pe care fiecare altă națiune a încercat să îl imite."
              : "Established in 1872 with Yellowstone, the US National Park System today protects 85 million acres across 63 parks and 423 total sites — a conservation model every other nation has tried to imitate."}
          </p>
          <div className="bg-(--nat-surface) p-6 md:p-10">
            <ParkVisitorsChart
              data={topParksVisitors}
              title={isRo ? "Cele Mai Vizitate Parcuri Naționale (2023)" : "Most Visited National Parks (2023)"}
              subtitle={isRo ? "Vizite anuale în milioane" : "Annual visits in millions"}
              source="National Park Service 2023"
            />
          </div>
        </div>
      </section>

      {/* ── QUOTE BREAK 1 ─────────────────────────────────────────────────── */}
      <div className="bg-(--nat-void,#030504)">
        <NatureQuoteBreak
          quote={quotes[0].quote}
          attribution={quotes[0].attribution}
          title={quotes[0].title}
        />
      </div>

      {/* ── CROWN JEWELS — cinematic grid ─────────────────────────────────── */}
      <section className="bg-(--nat-void,#030504) py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <p className="nat-text-label mb-6" style={{ color: 'var(--nat-accent-earth)' }}>
            {isRo ? "Parcuri de Referință" : "Landmark Parks"}
          </p>
          <h2 className="nat-text-heading text-white mb-12">
            {isRo ? "Bijuteriile Coroanei" : "Crown Jewels of the Republic"}
          </h2>
          <ParkCinematicGrid
            parks={featuredParks}
            visitLabel={isRo ? "Vizite/an" : "Visits/yr"}
            acresLabel={isRo ? "Acri" : "Acres"}
            estLabel={isRo ? "Înf." : "Est."}
          />
          <div className="mt-8 flex justify-end">
            <Link
              href="/nature/national-parks"
              className="nat-text-label transition-colors hover:text-white"
              style={{ color: 'var(--nat-accent-forest)' }}
            >
              {isRo ? "Toate parcurile naționale →" : "All National Parks →"}
            </Link>
          </div>
        </div>
      </section>

      {/* ── PARALLAX QUOTE BAND 2 — Muir ─────────────────────────────────── */}
      <ParallaxImageBand
        imageSrc={SITE_IMAGES.glacierNationalPark}
        imageAlt="Glacier National Park alpine wilderness"
        height={500}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="nat-text-section italic leading-[1.8] mb-14" style={{ fontSize: 'clamp(20px, 3.5vw, 40px)', fontWeight: 400, letterSpacing: '0.04em', wordSpacing: '0.1em' }}>
            &ldquo;{quotes[1].quote}&rdquo;
          </p>
          <p className="nat-text-label" style={{ color: 'var(--nat-accent-earth)' }}>— {quotes[1].attribution}</p>
        </div>
      </ParallaxImageBand>

      {/* ── BIODIVERSITY ──────────────────────────────────────────────────── */}
      <section className="bg-(--nat-void,#030504) py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <p className="nat-text-label mb-6" style={{ color: 'var(--nat-accent-glacier)' }}>
            {isRo ? "Biodiversitate" : "Biodiversity"}
          </p>
          <h2 className="nat-text-heading text-white mb-6">
            {isRo ? "Fiecare Zonă Climatică pe Pământ" : "Every Climate Zone on Earth"}
          </h2>
          <p className="nat-text-body mb-12 max-w-[700px]">
            {isRo
              ? "Statele Unite sunt una dintre cele mai bogate națiuni temperate din punct de vedere al biodiversității de pe Pământ. Cu 432.000 de specii cunoscute, SUA depășesc cu mult toți omologii lor din lumea dezvoltată."
              : "The United States is one of the most biodiversity-rich temperate nations on Earth. With 432,000 known species, the US dramatically outpaces its developed-world peers."}
          </p>
          <div className="bg-(--nat-surface) p-6 md:p-10 mb-12">
            <BiodiversityChart
              data={biodiversityData}
              title={isRo ? "Specii Cunoscute pe Țară (mii)" : "Known Species by Country (thousands)"}
              subtitle={isRo ? "SUA depășesc dramatic toată Europa" : "The US dramatically outpaces all of Europe"}
              source="IUCN Red List / World Resources Institute 2024"
            />
          </div>
          {facts.slice(3).map((fact, i) => (
            <NatureFactModule
              key={fact.id}
              fact={fact.fact}
              detail={fact.detail}
              source={fact.source}
              color={i % 3 === 0 ? 'forest' : i % 3 === 1 ? 'glacier' : 'earth'}
            />
          ))}
        </div>
      </section>

      {/* ── QUOTE BREAK 2 ─────────────────────────────────────────────────── */}
      <div className="bg-(--nat-void,#030504)">
        <NatureQuoteBreak
          quote={quotes[2].quote}
          attribution={quotes[2].attribution}
          title={quotes[2].title}
        />
      </div>

      {/* ── REGIONAL WONDERS ──────────────────────────────────────────────── */}
      <section className="bg-(--nat-void,#030504) py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <p className="nat-text-label mb-6" style={{ color: 'var(--nat-accent-glacier)' }}>
            {isRo ? "Regiunile Naturale" : "Natural Regions"}
          </p>
          <h2 className="nat-text-heading text-white mb-6">
            {isRo ? "Un Continent într-o Singură Țară" : "A Continent in One Country"}
          </h2>
          <p className="nat-text-body mb-12 max-w-[700px]">
            {isRo
              ? "Cele cincizeci de state cuprind nu doar o națiune, ci o întreagă lume de peisaje."
              : "The fifty states encompass not just a nation, but an entire world of landscapes."}
          </p>
          <RegionCardsGrid regions={regions} />
        </div>
      </section>

      {/* ── LANDSCAPE MOSAIC ──────────────────────────────────────────────── */}
      <section className="bg-(--nat-void,#030504) py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <p className="nat-text-label mb-6" style={{ color: 'var(--nat-accent-forest)' }}>
            {isRo ? "Diversitatea Peisajelor" : "Landscape Diversity"}
          </p>
          <h2 className="nat-text-heading text-white mb-4">
            {isRo ? "De la Deșert la Ghetar" : "Desert to Glacier"}
          </h2>
          <p className="nat-text-body mb-12 max-w-[700px]">
            {isRo
              ? "Nicio altă țară dezvoltată nu cuprinde un spectru atât de vast de ecosisteme — deșerturi de cactus saguaro, păduri de secvoia, munți stâncoși, câmpii de iarbă, fluvii și lanțuri muntoase îmbrăcate în brumă."
              : "No other developed nation spans such a breadth of ecosystems — saguaro deserts, sequoia forests, rocky badlands, prairies, rivers, and mist-covered mountain ranges all within one country."}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {([
              { src: SITE_IMAGES.landscapes.grandTeton,          label: isRo ? "Munții Grand Teton" : "Grand Teton NP",              region: isRo ? "Wyoming" : "Wyoming" },
              { src: SITE_IMAGES.landscapes.saguaro,             label: isRo ? "Parcul Național Saguaro" : "Saguaro NP",             region: isRo ? "Arizona" : "Arizona" },
              { src: SITE_IMAGES.landscapes.sequoia,             label: isRo ? "Parcul Național Sequoia" : "Sequoia NP",             region: isRo ? "California" : "California" },
              { src: SITE_IMAGES.landscapes.theodoreRoosevelt,   label: isRo ? "P.N. Theodore Roosevelt" : "Theodore Roosevelt NP",  region: isRo ? "Dakota de Nord" : "North Dakota" },
              { src: SITE_IMAGES.landscapes.blueRidge,           label: isRo ? "Munții Blue Ridge" : "Blue Ridge Mountains",         region: isRo ? "Carolina de Nord" : "North Carolina" },
              { src: SITE_IMAGES.landscapes.tunnelViewYosemite,  label: isRo ? "Yosemite — Tunnel View" : "Yosemite Tunnel View",    region: isRo ? "California" : "California" },
              { src: SITE_IMAGES.landscapes.grandCanyonCave,     label: isRo ? "Grand Canyon — Peșteră" : "Grand Canyon Cave",       region: isRo ? "Arizona" : "Arizona" },
              { src: SITE_IMAGES.landscapes.coloradoRiver,       label: isRo ? "Râul Colorado" : "Colorado River",                  region: isRo ? "Grand Canyon" : "Grand Canyon" },
              { src: SITE_IMAGES.landscapes.mississippi,         label: isRo ? "Fluviul Mississippi" : "Mississippi River",         region: isRo ? "Minneapolis" : "Minneapolis" },
              { src: SITE_IMAGES.landscapes.chattanooga,         label: isRo ? "Chattanooga" : "Chattanooga",                       region: isRo ? "Tennessee" : "Tennessee" },
            ] as { src: string; label: string; region: string }[]).map((item, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl group" style={{ aspectRatio: '3/4' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,5,4,0.85)_0%,rgba(3,5,4,0)_55%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="nat-text-label text-white leading-tight" style={{ fontSize: '11px' }}>{item.label}</p>
                  <p className="nat-text-metadata mt-0.5" style={{ color: 'var(--nat-accent-forest)', fontSize: '10px' }}>{item.region}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARALLAX BAND 3 — Burns ──────────────────────────────────────── */}
      <ParallaxImageBand
        imageSrc={SITE_IMAGES.denaliNationalPark}
        imageAlt="Denali peak in Alaska wilderness"
        height={400}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="nat-text-section italic leading-[1.8]" style={{ fontSize: 'clamp(18px, 3vw, 36px)', fontWeight: 400, letterSpacing: '0.04em', wordSpacing: '0.1em' }}>
            &ldquo;{isRo ? "Cel mai frumos dar pe care orice țară l-ar putea oferi" : "The best idea America ever had"}&rdquo;
          </p>
          <p className="nat-text-label mt-6" style={{ color: 'var(--nat-accent-earth)' }}>— Ken Burns</p>
        </div>
      </ParallaxImageBand>

      {/* ── DEEP DIVES — sub-page navigation ─────────────────────────────── */}
      <section className="bg-(--nat-void,#030504) py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <p className="nat-text-label mb-6" style={{ color: 'var(--nat-accent-earth)' }}>
            {isRo ? "Explorați mai Adânc" : "Explore Deeper"}
          </p>
          <h2 className="nat-text-heading text-white mb-12">
            {isRo ? "Imersiuni în Profunzime" : "Deep Dives"}
          </h2>

          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {subPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group relative overflow-hidden h-72 md:h-80"
              >
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src={page.imageSrc}
                    alt={page.imageAlt}
                    fill
                    className="object-cover brightness-[0.4] saturate-[0.6] transition-all duration-700 group-hover:brightness-[0.5] group-hover:saturate-[0.8]"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,5,4,0.9)_0%,rgba(3,5,4,0)_60%)]" />
                <span className="absolute right-4 top-4 nat-text-metadata" style={{ color: 'var(--nat-accent-forest)' }}>
                  {page.badge}
                </span>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                  <h3 className="nat-text-heading text-white mb-2 transition-colors group-hover:text-(--nat-accent-forest)" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)' }}>
                    {page.title}
                  </h3>
                  <p className="nat-text-body text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {page.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive Archive */}
      <DeepDiveSection
        locale={locale}
        topics={VERTICALS_THEMATIC_DATA["nature"] || []}
        theme={DEEP_DIVE_THEMES.nature}
      />

      {/* Ask America AI Oracle CTA */}
      <section className="bg-(--nat-void,#030504) pb-32 px-6 md:px-12">
        <div className="mx-auto max-w-[1200px] border border-zinc-800 bg-zinc-950 p-8 md:p-12 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest font-mono mb-2 block">
              AI Oracle
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-sans">
              {isRo ? "Oracolul Ask America" : "The Ask America Oracle"}
            </h3>
            <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-sans">
              {isRo
                ? "Pune întrebări despre sistemele de conservare a parcurilor naționale ale Americii, biodiversitatea locală sau rezervațiile protejate din Alaska."
                : "Ask questions about America's national park conservation systems, local biodiversity, or protected wilderness reserves in Alaska."}
            </p>
          </div>
          <Link
            href="/interactive"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-zinc-200 text-black font-semibold text-sm transition-colors rounded-md"
          >
            {isRo ? "Întreabă America →" : "Ask America →"}
          </Link>
        </div>
      </section>
    </>
  );
}
