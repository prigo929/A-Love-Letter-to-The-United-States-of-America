// ─── Nature & Geography Main Page ────────────────────────────────────────────
// Phase 4 Enhanced: Cinematic hero crossfade, parallax bands, animated stat
// wall, Ken-Burns park grid, region cards with micro-animations.
// Server Component — all interactive parts imported as client leaves.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb }    from "@/components/layout/Breadcrumb";
import { FactCard }      from "@/components/sections/FactCard";
import { QuoteBlock }    from "@/components/sections/QuoteBlock";

import {
  NatureHeroCrossfade,
  ParallaxImageBand,
  AnimatedStatWall,
  ParkCinematicGrid,
  HeroTextReveal,
  RegionCardsGrid,
} from "@/components/nature/NatureAnimations";
import { ParkVisitorsChart, BiodiversityChart } from "@/components/data/NatureCharts";

import { getServerLocale } from "@/lib/i18n/server";
import { SITE_IMAGES }     from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

import {
  TOP_PARKS_VISITORS,
  BIODIVERSITY_BY_COUNTRY,
  FEATURED_PARKS,
  NATURE_REGIONS,
  getNatureHeroStats,
  getNatureOverviewParagraphs,
  getNatureOverviewFacts,
  getNatureSubPages,
  getNatureQuotes,
} from "@/lib/data/nature-data";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Nature & Geography | America: The Greatest Nation",
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

  // `AnimatedStatWall` expects a very specific visual data shape, so we map the
  // shared content data into the format that component needs.
  const statWallData = heroStats.map((s) => ({
    value: s.value,
    suffix: s.suffix,
    prefix: s.prefix,
    decimals: s.decimals,
    label: s.label,
    sub: s.source,
    color: s.color === "gold" ? "#FFD700" : s.color === "red" ? "#B22234" : "#ffffff",
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO — crossfading 5 landscapes ──────────────────────────────── */}
      <NatureHeroCrossfade>
        <HeroTextReveal
          eyebrow={isRo ? "Faza 4 — Natură și Geografie" : "Phase 4 — Nature & Geography"}
          line1={isRo ? "AMERICA" : "AMERICA"}
          line2={isRo ? "CEA FRUMOASĂ" : "THE BEAUTIFUL"}
          line2Color="#4ade80"
          body={
            isRo
              ? "Nicio națiune de pe Pământ nu posedă o diversitate atât de extraordinară de minuni naturale — de la tundra arctică la pădurile tropicale, de la cel mai înalt vârf al Americii de Nord la cel mai mare sistem de apă dulce din lume."
              : "No nation on Earth possesses such extraordinary diversity of natural wonders — from Arctic tundra to tropical rainforests, from North America's highest peak to the world's greatest freshwater system."
          }
        >
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { value: "63",  label: isRo ? "Parcuri Naționale" : "National Parks",  sub: "NPS 2024" },
              { value: "85M", label: isRo ? "Acri Protejați"   : "Acres Protected",  sub: "NPS 2024" },
              { value: "21%", label: isRo ? "Apă Dulce Globală": "Global Freshwater", sub: "EPA/GLC"  },
            ].map((s) => (
              <div key={s.value} className="text-center">
                <p className="font-hero text-5xl text-green-400">{s.value}</p>
                <p className="font-body text-sm text-white/70">{s.label}</p>
                <p className="font-body text-xs text-white/35">{s.sub}</p>
              </div>
            ))}
          </div>
        </HeroTextReveal>
      </NatureHeroCrossfade>

      {/* ── ANIMATED STAT WALL ────────────────────────────────────────────── */}
      <section className="bg-navy-dark px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <AnimatedStatWall stats={statWallData} />
        </div>
      </section>

      {/* ── PARALLAX BAND 1 ───────────────────────────────────────────────── */}
      <ParallaxImageBand
        imageSrc="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1920&auto=format&fit=crop"
        imageAlt="Yosemite Valley with Half Dome at sunrise"
        height={480}
        overlayOpacity={0.5}
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-green-300/80">
            {isRo ? "Teodore Roosevelt, 1903" : "Theodore Roosevelt, 1903"}
          </p>
          <blockquote className="font-display text-2xl font-semibold italic leading-relaxed text-white md:text-3xl">
            &ldquo;{isRo
              ? "Nu faceți nimic pentru a-l deteriora. Nu-l puteți îmbunătăți. Singurul lucru pe care îl puteți face este să-l lăsați în seama celor ce vin după voi."
              : "Do nothing to mar its grandeur. You cannot improve on it. Keep it for your children and your children's children."
            }&rdquo;
          </blockquote>
        </div>
      </ParallaxImageBand>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 xl:grid-cols-[260px_1fr]">

            {/* Sticky TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 py-16">
                {/* This is a simple in-page table of contents.
                    Each link jumps to the matching section id below. */}
                <p className="mb-4 font-body text-xs font-semibold uppercase tracking-widest text-glory-gold">
                  {isRo ? "Cuprins" : "Contents"}
                </p>
                <nav>
                  <ul className="space-y-1">
                    {[
                      { label: isRo ? "Prezentare" : "Overview",         href: "#overview"     },
                      { label: isRo ? "Parcuri Naționale" : "Nat. Parks", href: "#parks"        },
                      { label: isRo ? "Parcuri Celebre" : "Crown Jewels", href: "#featured"     },
                      { label: isRo ? "Biodiversitate" : "Biodiversity",  href: "#biodiversity" },
                      { label: isRo ? "Regiuni" : "Regions",              href: "#regions"      },
                      { label: isRo ? "Adâncimi" : "Deep Dives",          href: "#sub-pages"    },
                    ].map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className="block rounded-lg px-3 py-2 font-body text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-10 overflow-hidden rounded-2xl border border-green-500/25 bg-green-950/30 p-4">
                  <p className="font-hero text-5xl text-green-400">63</p>
                  <p className="mt-1 font-body text-xs text-white/50">
                    {isRo ? "Parcuri Naționale" : "National Parks"}
                  </p>
                  <div className="mt-3 h-px w-full bg-green-500/20" />
                  <p className="mt-3 font-body text-xs text-green-400/70">
                    {isRo ? "85 milioane acri protejați" : "85 million acres protected"}
                  </p>
                  <p className="font-body text-xs text-green-400/70">
                    {isRo ? "325M+ vizite anuale" : "325M+ annual visits"}
                  </p>
                </div>
              </div>
            </aside>

            {/* Main content column */}
            <main className="min-w-0 py-16">

              <Breadcrumb
                items={[{ label: isRo ? "Natură" : "Nature" }]}
                className="mb-8"
              />

              {/* ── Overview ─────────────────────────────────────────────── */}
              <section id="overview" className="mb-20 scroll-mt-24">
                {/* `scroll-mt-24` keeps the sticky header from covering the
                    section title when someone jumps here from the TOC. */}
                <p className="section-eyebrow">
                  {isRo ? "Faza 4 — Natură și Geografie" : "Phase 4 — Nature & Geography"}
                </p>
                <h1 className="mb-6 font-display text-h1 text-white">
                  {isRo ? "America cea Frumoasă" : "America the Beautiful"}
                </h1>
                {paragraphs.map((para, i) => (
                  <p key={i} className="mb-5 font-body text-lg leading-relaxed text-white/70">
                    {para}
                  </p>
                ))}

                {/* Overview fact cards */}
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {facts.slice(0, 3).map((fact) => (
                    <FactCard key={fact.id} fact={fact.fact} detail={fact.detail} source={fact.source} color={fact.color} variant="dark" />
                  ))}
                </div>
              </section>

              {/* ── National Parks ───────────────────────────────────────── */}
              <section id="parks" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-green-500 pl-5">
                  <p className="section-eyebrow">
                    {isRo ? "Sistemul Parcurilor Naționale" : "The National Parks System"}
                  </p>
                  <h2 className="font-display text-h2 text-white">
                    {isRo ? "Cea Mai Bună Idee a Americii" : "The Best Idea America Ever Had"}
                  </h2>
                </div>

                <p className="mb-8 font-body text-lg leading-relaxed text-white/70">
                  {isRo
                    ? "Înființat în 1872 cu Yellowstone, Sistemul Național de Parcuri al SUA protejează astăzi 85 de milioane de acri în 63 de parcuri și 423 de situri totale — un model de conservare pe care fiecare altă națiune a încercat să îl imite."
                    : "Established in 1872 with Yellowstone, the US National Park System today protects 85 million acres across 63 parks and 423 total sites — a conservation model every other nation has tried to imitate."}
                </p>

                <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
                  <ParkVisitorsChart
                    data={TOP_PARKS_VISITORS}
                    title={isRo ? "Cele Mai Vizitate Parcuri Naționale (2023)" : "Most Visited National Parks (2023)"}
                    subtitle={isRo ? "Vizite anuale în milioane" : "Annual visits in millions"}
                    source="National Park Service 2023"
                  />
                </div>
              </section>

              {/* ── Quote 1 (inline parallax style) ──────────────────────── */}
              <QuoteBlock
                quote={quotes[0].quote}
                attribution={quotes[0].attribution}
                title={quotes[0].title}
                variant="dark"
              />

              {/* ── Featured Parks — cinematic grid ──────────────────────── */}
              <section id="featured" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-glory-gold pl-5">
                  <p className="section-eyebrow">
                    {isRo ? "Parcuri de Referință" : "Landmark Parks"}
                  </p>
                  <h2 className="font-display text-h2 text-white">
                    {isRo ? "Bijuteriile Coroanei" : "Crown Jewels of the Republic"}
                  </h2>
                </div>

                <ParkCinematicGrid
                  parks={FEATURED_PARKS}
                  visitLabel={isRo ? "Vizite/an" : "Visits/yr"}
                  acresLabel={isRo ? "Acri" : "Acres"}
                  estLabel={isRo ? "Înf." : "Est."}
                />

                <div className="mt-6 flex justify-end">
                  <Link
                    href="/nature/national-parks"
                    className="group inline-flex items-center gap-2 font-body text-sm font-semibold text-glory-gold transition-colors hover:text-glory-gold-dark"
                  >
                    {isRo ? "Toate parcurile naționale" : "All National Parks"}
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </section>

              {/* ── Biodiversity ──────────────────────────────────────────── */}
              <section id="biodiversity" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-glory-red pl-5">
                  <p className="section-eyebrow">
                    {isRo ? "Biodiversitate" : "Biodiversity"}
                  </p>
                  <h2 className="font-display text-h2 text-white">
                    {isRo ? "Fiecare Zonă Climatică pe Pământ" : "Every Climate Zone on Earth"}
                  </h2>
                </div>

                <p className="mb-8 font-body text-lg leading-relaxed text-white/70">
                  {isRo
                    ? "Statele Unite sunt una dintre cele mai bogate națiuni temperate din punct de vedere al biodiversității de pe Pământ. Cu 432.000 de specii cunoscute, SUA depășesc cu mult toți omologii lor din lumea dezvoltată."
                    : "The United States is one of the most biodiversity-rich temperate nations on Earth. With 432,000 known species, the US dramatically outpaces its developed-world peers."}
                </p>

                <div className="my-8 rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
                  <BiodiversityChart
                    data={BIODIVERSITY_BY_COUNTRY}
                    title={isRo ? "Specii Cunoscute pe Țară (mii)" : "Known Species by Country (thousands)"}
                    subtitle={isRo
                      ? "SUA depășesc dramatic toată Europa"
                      : "The US dramatically outpaces all of Europe"}
                    source="IUCN Red List / World Resources Institute 2024"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {facts.slice(3).map((fact) => (
                    <FactCard key={fact.id} fact={fact.fact} detail={fact.detail} source={fact.source} color={fact.color} variant="dark" />
                  ))}
                </div>
              </section>

              {/* ── Quote 2 ───────────────────────────────────────────────── */}
              <QuoteBlock
                quote={quotes[1].quote}
                attribution={quotes[1].attribution}
                title={quotes[1].title}
                variant="dark"
              />

              {/* ── Regional Wonders — animated cards ────────────────────── */}
              <section id="regions" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-glory-blue-light pl-5">
                  <p className="section-eyebrow">
                    {isRo ? "Regiunile Naturale" : "Natural Regions"}
                  </p>
                  <h2 className="font-display text-h2 text-white">
                    {isRo ? "Un Continent într-o Singură Țară" : "A Continent in One Country"}
                  </h2>
                </div>

                <p className="mb-8 font-body text-lg leading-relaxed text-white/70">
                  {isRo
                    ? "Cele cincizeci de state cuprind nu doar o națiune, ci o întreagă lume de peisaje."
                    : "The fifty states encompass not just a nation, but an entire world of landscapes."}
                </p>

                <RegionCardsGrid regions={NATURE_REGIONS} />
              </section>

              {/* ── Quote 3 ───────────────────────────────────────────────── */}
              <QuoteBlock
                quote={quotes[2].quote}
                attribution={quotes[2].attribution}
                title={quotes[2].title}
                variant="dark"
              />

              {/* ── Sub-page navigation ───────────────────────────────────── */}
              <section id="sub-pages" className="mb-8 scroll-mt-24">
                <p className="section-eyebrow">
                  {isRo ? "Explorați mai Adânc" : "Explore Deeper"}
                </p>
                <h2 className="mb-8 font-display text-h2 text-white">
                  {isRo ? "Imersiuni în Profunzime" : "Deep Dives"}
                </h2>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {subPages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-navy-mid transition-all duration-300 hover:border-green-500/40 hover:shadow-[0_0_30px_rgba(74,222,128,0.08)]"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={page.imageSrc}
                          alt={page.imageAlt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                          placeholder="blur"
                          blurDataURL={BLUR_PLACEHOLDER}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-mid via-navy-mid/30 to-transparent" />
                        <span className="absolute right-3 top-3 rounded-full bg-green-500 px-3 py-1 font-body text-xs font-bold text-navy-dark">
                          {page.badge}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="mb-1.5 font-display text-lg font-semibold text-white transition-colors group-hover:text-green-400">
                          {page.title}
                        </h3>
                        <p className="font-body text-sm leading-relaxed text-white/55">
                          {page.description}
                        </p>
                        <p className="mt-4 font-body text-xs font-semibold text-green-400 opacity-0 transition-opacity group-hover:opacity-100">
                          {isRo ? "Explorează →" : "Explore →"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

            </main>
          </div>
        </div>
      </div>
    </>
  );
}
