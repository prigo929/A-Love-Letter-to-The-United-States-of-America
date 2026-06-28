// ─── Natural Resources Page ───────────────────────────────────────────────────
// The "macro-editorial" hub for American natural wealth, told across four pillars:
// Energy, Agriculture, Minerals, and Water. Mirrors the cinematic pattern of
// app/economy/page.tsx, with an emerald accent (the site's `nature` identity).
//
// Beginner guide:
// - Numbers, paragraphs, facts, and quotes live in lib/data/natural-resources-data.ts
// - On-page strings (titles, labels) live in getNaturalResourcesPageCopy (pages.ts)
// - Hero/section images are SITE_IMAGES.resources* keys (lib/site-images.ts)

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FloatingTOC } from "@/components/layout/FloatingTOC";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import {
  MacroStyles,
  MacroHero,
  MacroStat,
  MacroFact,
  InfrastructureBand,
} from "@/components/economy/EconomyAnimations";
import { GdpBarChart } from "@/components/data/GdpBarChart";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import DeepDiveSection from "@/components/shared/DeepDiveSection";

import { getServerLocale } from "@/lib/i18n/server";
import { getNaturalResourcesPageCopy } from "@/lib/i18n/messages/pages";
import { VERTICALS_THEMATIC_DATA } from "@/lib/data/verticals-thematic-data";
import { DEEP_DIVE_THEMES } from "@/lib/deep-dive-themes";
import { SITE_IMAGES } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import {
  OIL_PRODUCTION,
  GAS_PRODUCTION,
  CORN_PRODUCTION,
  COAL_RESERVES,
  getResourcesHeroStats,
  getResourcesOverviewStats,
  getResourcesOverviewParagraphs,
  getEnergyParagraphs,
  getAgricultureParagraphs,
  getMineralsParagraphs,
  getWaterParagraphs,
  getEnergyFacts,
  getAgricultureFacts,
  getMineralsFacts,
  getWaterFacts,
  getResourcesQuotes,
  type ResourceStat,
} from "@/lib/data/natural-resources-data";

// ─── Theme ────────────────────────────────────────────────────────────────────
const ACCENT = "#4ade80"; // emerald — the site's `nature` identity

const STAT_COLOR: Record<NonNullable<ResourceStat["color"]>, string> = {
  emerald: ACCENT,
  gold: "#E8B923",
  white: "#F0F2F5",
};

const PILLAR_IMAGE: Record<string, string> = {
  energy: SITE_IMAGES.resourcesEnergy,
  agriculture: SITE_IMAGES.resourcesAgriculture,
  minerals: SITE_IMAGES.resourcesMinerals,
  water: SITE_IMAGES.resourcesWater,
};

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Natural Resources",
  description:
    "The wealth of a continent: America is the world's #1 oil & gas producer, a top agricultural exporter, holder of the largest coal reserves on Earth, and guardian of a fifth of the planet's surface fresh water.",
  alternates: { canonical: "/natural-resources" },
  openGraph: {
    title: "Natural Resources — The Wealth of a Continent",
    description:
      "Energy, agriculture, minerals, and water: the most complete endowment of natural wealth ever granted to a single nation.",
    url: "/natural-resources",
    images: [
      {
        url: SITE_IMAGES.resourcesHero,
        width: 1200,
        height: 630,
        alt: "American wind farm sweeping across the Great Plains",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "American Natural Resources — The Wealth of a Continent",
  description:
    "A deep-dive into American resource abundance: energy, agriculture, minerals, and fresh water.",
  url: "https://america-greatest.vercel.app/natural-resources",
  author: { "@type": "Organization", name: "America: The Greatest Nation" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function NaturalResourcesPage() {
  const locale = await getServerLocale();
  const copy = getNaturalResourcesPageCopy(locale);

  const heroStats = getResourcesHeroStats(locale);
  const overviewStats = getResourcesOverviewStats(locale);
  const overviewParagraphs = getResourcesOverviewParagraphs(locale);
  const energyParagraphs = getEnergyParagraphs(locale);
  const agricultureParagraphs = getAgricultureParagraphs(locale);
  const mineralsParagraphs = getMineralsParagraphs(locale);
  const waterParagraphs = getWaterParagraphs(locale);
  const energyFacts = getEnergyFacts(locale);
  const agricultureFacts = getAgricultureFacts(locale);
  const mineralsFacts = getMineralsFacts(locale);
  const waterFacts = getWaterFacts(locale);
  const quotes = getResourcesQuotes(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <FloatingTOC items={copy.tocItems} />

      <MacroStyles />
      <MacroHero
        imageSrc={SITE_IMAGES.resourcesHero}
        imageAlt="American wind farm sweeping across the Great Plains"
        eyebrow={copy.heroEyebrow}
        titleLead={copy.heroTitleLead}
        titleAccent={copy.heroTitleAccent}
        description={copy.heroDescription}
        stats={heroStats}
      />

      <main className="relative bg-[#000000] pb-32">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-12">
          <Breadcrumb items={[{ label: copy.breadcrumb }]} />
        </div>

        {/* ── Overview ─────────────────────────────────────────────── */}
        <section id="overview" className="mb-48 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <p className="macro-eyebrow mb-8" style={{ color: ACCENT }}>
                {copy.overviewEyebrow}
              </p>
              <h2 className="macro-section-title mb-12">{copy.overviewTitle}</h2>
              {overviewParagraphs.map((para, i) => (
                <p key={i} className="macro-body mb-8 max-w-4xl">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Stat wall */}
          <div className="mt-24 grid gap-x-12 gap-y-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/5 pt-16">
            {overviewStats.map((stat) => (
              <MacroStat
                key={stat.id}
                value={
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                }
                label={stat.label}
                source={stat.source}
                color={STAT_COLOR[stat.color ?? "white"]}
              />
            ))}
          </div>
        </section>

        {/* ── Pillar Navigation ───────────────────────────────────── */}
        <section id="pillars" className="mb-48 mx-auto max-w-[1600px] px-6 md:px-12">
          <p className="macro-eyebrow mb-8" style={{ color: ACCENT }}>
            {copy.pillarsEyebrow}
          </p>
          <h2 className="macro-section-title mb-16">{copy.pillarsTitle}</h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {copy.pillars.map((pillar) => (
              <a
                key={pillar.id}
                href={`#${pillar.id}`}
                className="group flex flex-col border border-white/10 hover:border-[#4ade80]/40 transition-colors bg-white/5"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={PILLAR_IMAGE[pillar.id]}
                    alt={pillar.label}
                    fill
                    className="object-cover opacity-60 grayscale-[0.2] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-macro-display text-2xl font-bold text-white mb-3 group-hover:text-[#4ade80] transition-colors">
                    {pillar.label}
                  </h3>
                  <p className="font-macro-body text-white/50 text-sm">
                    {pillar.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Energy ──────────────────────────────────────────────── */}
        <section id="energy" className="mb-48 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <p className="macro-eyebrow mb-8" style={{ color: ACCENT }}>
                {copy.energyEyebrow}
              </p>
              <h2 className="macro-section-title mb-12">{copy.energyTitle}</h2>
              {energyParagraphs.map((para, i) => (
                <p key={i} className="macro-body mb-8 max-w-4xl">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="my-24 grid grid-cols-1 xl:grid-cols-2 gap-16">
            <GdpBarChart
              data={OIL_PRODUCTION}
              title={copy.oilChartTitle}
              subtitle={copy.oilChartSubtitle}
              source="EIA 2024"
              valuePrefix=""
              valueSuffix=""
              valueDecimals={1}
              valueLabel={copy.oilValueLabel}
            />
            <GdpBarChart
              data={GAS_PRODUCTION}
              title={copy.gasChartTitle}
              subtitle={copy.gasChartSubtitle}
              source="BP Statistical Review"
              valuePrefix=""
              valueSuffix=""
              valueDecimals={0}
              valueLabel={copy.gasValueLabel}
            />
          </div>
        </section>

        <InfrastructureBand
          imageSrc={SITE_IMAGES.resourcesEnergy}
          imageAlt="Oil pumpjacks silhouetted against a golden sunset"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="macro-hero-title mb-4" style={{ color: ACCENT }}>
                13.2M
              </p>
              <p className="macro-metadata text-white/70">
                {copy.oilValueLabel}
              </p>
            </div>
            <div className="grid gap-12">
              {energyFacts.map((fact, i) => (
                <MacroFact
                  key={fact.id}
                  index={i + 1}
                  fact={fact.fact}
                  detail={fact.detail}
                />
              ))}
            </div>
          </div>
        </InfrastructureBand>

        {/* ── Pull Quote 1 ────────────────────────────────────────── */}
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 my-32 border-t border-white/5 pt-32">
          <QuoteBlock
            quote={quotes[0].quote}
            attribution={quotes[0].attribution}
            title={quotes[0].title}
            variant="dark"
          />
        </div>

        {/* ── Agriculture ─────────────────────────────────────────── */}
        <section id="agriculture" className="mb-48 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <p className="macro-eyebrow mb-8" style={{ color: ACCENT }}>
                {copy.agEyebrow}
              </p>
              <h2 className="macro-section-title mb-12">{copy.agTitle}</h2>
              {agricultureParagraphs.map((para, i) => (
                <p key={i} className="macro-body mb-8 max-w-4xl">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="my-24">
            <GdpBarChart
              data={CORN_PRODUCTION}
              title={copy.cornChartTitle}
              subtitle={copy.cornChartSubtitle}
              source="USDA FAS 2024"
              valuePrefix=""
              valueSuffix=""
              valueDecimals={0}
              valueLabel={copy.cornValueLabel}
            />
          </div>

          {/* Cinematic image */}
          <div className="relative mb-24 overflow-hidden h-[420px]">
            <Image
              src={SITE_IMAGES.resourcesAgriculture}
              alt="A combine harvesting a golden cornfield in Iowa"
              fill
              className="object-cover macro-edge-fade opacity-70 grayscale-[0.15]"
              sizes="100vw"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
          </div>

          <div className="grid gap-16 sm:grid-cols-3 border-t border-white/5 pt-16">
            {agricultureFacts.map((fact, i) => (
              <MacroFact
                key={fact.id}
                index={i + 1}
                fact={fact.fact}
                detail={fact.detail}
              />
            ))}
          </div>
        </section>

        {/* ── Minerals ────────────────────────────────────────────── */}
        <section id="minerals" className="mb-48 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <p className="macro-eyebrow mb-8" style={{ color: ACCENT }}>
                {copy.mineralsEyebrow}
              </p>
              <h2 className="macro-section-title mb-12">{copy.mineralsTitle}</h2>
              {mineralsParagraphs.map((para, i) => (
                <p key={i} className="macro-body mb-8 max-w-4xl">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="my-24">
            <GdpBarChart
              data={COAL_RESERVES}
              title={copy.coalChartTitle}
              subtitle={copy.coalChartSubtitle}
              source="EIA / BP Statistical Review"
              valuePrefix=""
              valueSuffix=""
              valueDecimals={0}
              valueLabel={copy.coalValueLabel}
            />
          </div>
        </section>

        <InfrastructureBand
          imageSrc={SITE_IMAGES.resourcesMinerals}
          imageAlt="Aerial of the terraced Bingham Canyon open-pit copper mine"
        >
          <div className="grid gap-12 sm:grid-cols-3">
            {mineralsFacts.map((fact, i) => (
              <MacroFact
                key={fact.id}
                index={i + 1}
                fact={fact.fact}
                detail={fact.detail}
              />
            ))}
          </div>
        </InfrastructureBand>

        {/* ── Water ───────────────────────────────────────────────── */}
        <section id="water" className="mt-48 mb-48 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <p className="macro-eyebrow mb-8" style={{ color: ACCENT }}>
                {copy.waterEyebrow}
              </p>
              <h2 className="macro-section-title mb-12">{copy.waterTitle}</h2>
              {waterParagraphs.map((para, i) => (
                <p key={i} className="macro-body mb-8 max-w-4xl">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Cinematic image */}
          <div className="relative my-24 overflow-hidden h-[440px]">
            <Image
              src={SITE_IMAGES.resourcesWater}
              alt="Aerial of Hoover Dam and the Colorado River"
              fill
              className="object-cover macro-edge-fade opacity-70 grayscale-[0.15]"
              sizes="100vw"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
          </div>

          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/5 pt-16">
            {waterFacts.map((fact, i) => (
              <MacroFact
                key={fact.id}
                index={i + 1}
                fact={fact.fact}
                detail={fact.detail}
              />
            ))}
          </div>

          <div className="mt-16">
            <Link
              href="/nature/great-lakes"
              className="inline-flex items-center gap-4 font-macro-mono text-sm uppercase tracking-[0.2em] hover:text-white transition-colors"
              style={{ color: ACCENT }}
            >
              {copy.waterLinkLabel}
            </Link>
          </div>
        </section>

        {/* ── Pull Quote 2 ────────────────────────────────────────── */}
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 my-32 border-t border-white/5 pt-32">
          <QuoteBlock
            quote={quotes[1].quote}
            attribution={quotes[1].attribution}
            title={quotes[1].title}
            variant="dark"
          />
        </div>

        {/* Deep Dive Archive */}
        <DeepDiveSection
          locale={locale}
          topics={VERTICALS_THEMATIC_DATA["nature"] || []}
          theme={DEEP_DIVE_THEMES.nature}
        />

        {/* Ask America Oracle */}
        <AskAmericaCTA
          locale={locale}
          descriptionEn="Ask the AI Oracle about American shale oil abundance, agricultural yields, clean water infrastructure, or rare earth mineral reserves."
          descriptionRo="Întreabă Oracolul AI despre abundența petrolului de șist american, producțiile agricole, infrastructura de apă curată sau rezervele de minerale rare."
        />
      </main>
    </>
  );
}
