// ─── Natural Resources Page ───────────────────────────────────────────────────
// The "macro-editorial" hub for American natural wealth, told across six pillars:
// Energy, Renewables & Nuclear, Agriculture, Minerals, Water, and Forests & Public
// Lands: plus a milestones timeline. Mirrors the cinematic pattern of
// app/economy/page.tsx, with an emerald accent (the site's `nature` identity).
//
// Beginner guide:
// - Numbers, paragraphs, facts, grids, and quotes live in lib/data/natural-resources-data.ts
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
import { ResourceGallery } from "@/components/nature/ResourceGallery";
import { getResourceGallery } from "@/lib/data/natural-resources-gallery-data";

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
  LNG_EXPORTS,
  NUCLEAR_GENERATION,
  BEEF_PRODUCTION,
  getResourcesHeroStats,
  getResourcesOverviewStats,
  getResourcesOverviewParagraphs,
  getEnergyParagraphs,
  getRenewablesParagraphs,
  getAgricultureParagraphs,
  getMineralsParagraphs,
  getWaterParagraphs,
  getForestsParagraphs,
  getIrrigationParagraphs,
  getEnergyFacts,
  getRenewablesFacts,
  getAgricultureFacts,
  getMineralsFacts,
  getWaterFacts,
  getForestsFacts,
  getEnergyBasins,
  getTopCommodities,
  getStrategicMinerals,
  getWaterSystems,
  getMilestones,
  getResourcesQuotes,
  type ResourceStat,
  type ResourceItem,
} from "@/lib/data/natural-resources-data";

// ─── Theme ────────────────────────────────────────────────────────────────────
const ACCENT = "#4ade80"; // emerald: the site's `nature` identity

const STAT_COLOR: Record<NonNullable<ResourceStat["color"]>, string> = {
  emerald: ACCENT,
  gold: "#E8B923",
  white: "#F0F2F5",
};

const PILLAR_IMAGE: Record<string, string> = {
  energy: SITE_IMAGES.resourcesEnergy,
  renewables: SITE_IMAGES.resourcesSolar,
  agriculture: SITE_IMAGES.resourcesAgriculture,
  minerals: SITE_IMAGES.resourcesMinerals,
  water: SITE_IMAGES.resourcesWater,
  forests: SITE_IMAGES.landscapes.blueRidge,
};

// ─── Small server helpers ───────────────────────────────────────────────────────

function ResourceGrid({ title, items }: { title: string; items: ResourceItem[] }) {
  return (
    <div className="mt-24 border-t border-white/5 pt-16">
      <h3 className="macro-section-title text-[clamp(24px,4vw,56px)] mb-12">
        {title}
      </h3>
      <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.name}
            className="flex flex-col border-t border-[#4ade80]/30 pt-6"
          >
            <p className="font-macro-display text-2xl text-white">{it.name}</p>
            <p
              className="font-macro-display text-4xl font-bold mt-2"
              style={{ color: ACCENT }}
            >
              {it.stat}
            </p>
            <p className="macro-metadata text-white/40 mt-3 leading-relaxed">
              {it.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Natural Resources",
  description:
    "The wealth of a continent: America is the world's #1 oil & gas producer, top LNG exporter, holder of the largest coal reserves and nuclear fleet on Earth, a leading agricultural power, and guardian of a fifth of the planet's surface fresh water.",
  alternates: { canonical: "/natural-resources" },
  openGraph: {
    title: "Natural Resources: The Wealth of a Continent",
    description:
      "Energy, renewables, agriculture, minerals, water, and forests: the most complete endowment of natural wealth ever granted to a single nation.",
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
  headline: "American Natural Resources: The Wealth of a Continent",
  description:
    "A deep-dive into American resource abundance: energy, renewables, agriculture, minerals, fresh water, and forests.",
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
  const renewablesParagraphs = getRenewablesParagraphs(locale);
  const agricultureParagraphs = getAgricultureParagraphs(locale);
  const mineralsParagraphs = getMineralsParagraphs(locale);
  const waterParagraphs = getWaterParagraphs(locale);
  const forestsParagraphs = getForestsParagraphs(locale);
  const irrigationParagraphs = getIrrigationParagraphs(locale);
  const energyFacts = getEnergyFacts(locale);
  const renewablesFacts = getRenewablesFacts(locale);
  const agricultureFacts = getAgricultureFacts(locale);
  const mineralsFacts = getMineralsFacts(locale);
  const waterFacts = getWaterFacts(locale);
  const forestsFacts = getForestsFacts(locale);
  const energyBasins = getEnergyBasins(locale);
  const topCommodities = getTopCommodities(locale);
  const strategicMinerals = getStrategicMinerals(locale);
  const waterSystems = getWaterSystems(locale);
  const milestones = getMilestones(locale);
  const quotes = getResourcesQuotes(locale);
  const galleryCategories = getResourceGallery(locale);

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

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

          <div className="mb-8">
            <GdpBarChart
              data={LNG_EXPORTS}
              title={copy.lngChartTitle}
              subtitle={copy.lngChartSubtitle}
              source="EIA / GIIGNL 2023"
              valuePrefix=""
              valueSuffix=""
              valueDecimals={0}
              valueLabel={copy.lngValueLabel}
            />
          </div>

          <ResourceGrid title={copy.basinsTitle} items={energyBasins} />
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
              <p className="macro-metadata text-white/70">{copy.oilValueLabel}</p>
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

        {/* ── Renewables & Nuclear ────────────────────────────────── */}
        <section id="renewables" className="mt-48 mb-48 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <p className="macro-eyebrow mb-8" style={{ color: ACCENT }}>
                {copy.renewablesEyebrow}
              </p>
              <h2 className="macro-section-title mb-12">{copy.renewablesTitle}</h2>
              {renewablesParagraphs.map((para, i) => (
                <p key={i} className="macro-body mb-8 max-w-4xl">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="my-24">
            <GdpBarChart
              data={NUCLEAR_GENERATION}
              title={copy.nuclearChartTitle}
              subtitle={copy.nuclearChartSubtitle}
              source="IAEA / EIA 2023"
              valuePrefix=""
              valueSuffix=""
              valueDecimals={0}
              valueLabel={copy.nuclearValueLabel}
            />
          </div>
        </section>

        {/* Cinematic solar image */}
        <div className="relative w-full h-[440px] mb-24 overflow-hidden">
          <Image
            src={SITE_IMAGES.resourcesSolar}
            alt="Aerial of the Ivanpah solar power towers in the Mojave Desert"
            fill
            className="object-cover macro-edge-fade opacity-70 grayscale-[0.15]"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        </div>

        <section className="mx-auto max-w-[1600px] px-6 md:px-12 mb-48">
          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/5 pt-16">
            {renewablesFacts.map((fact, i) => (
              <MacroFact
                key={fact.id}
                index={i + 1}
                fact={fact.fact}
                detail={fact.detail}
              />
            ))}
          </div>
        </section>

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

          <div className="my-24 grid grid-cols-1 xl:grid-cols-2 gap-16">
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
            <GdpBarChart
              data={BEEF_PRODUCTION}
              title={copy.beefChartTitle}
              subtitle={copy.beefChartSubtitle}
              source="USDA FAS 2023"
              valuePrefix=""
              valueSuffix=""
              valueDecimals={1}
              valueLabel={copy.beefValueLabel}
            />
          </div>
        </section>

        {/* Cinematic image */}
        <div className="relative w-full h-[420px] mb-24 overflow-hidden">
          <Image
            src={SITE_IMAGES.resourcesAgriculture}
            alt="A stunning vineyard in early summer in Polk County, Oregon, part of the Willamette Valley's wine region"
            fill
            className="object-cover macro-edge-fade opacity-70 grayscale-[0.15]"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        </div>

        <section className="mx-auto max-w-[1600px] px-6 md:px-12 mb-48">
          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/5 pt-16">
            {agricultureFacts.map((fact, i) => (
              <MacroFact
                key={fact.id}
                index={i + 1}
                fact={fact.fact}
                detail={fact.detail}
              />
            ))}
          </div>

          <ResourceGrid title={copy.commoditiesTitle} items={topCommodities} />
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

        {/* ── Center-Pivot Irrigation Circles ────────────────────── */}
        <section id="irrigation" className="mb-48 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Narrative Copy */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <p className="macro-eyebrow mb-8" style={{ color: ACCENT }}>
                {copy.irrigationEyebrow}
              </p>
              <h2 className="macro-section-title mb-12">{copy.irrigationTitle}</h2>
              {irrigationParagraphs.map((para, i) => (
                <p key={i} className="macro-body mb-8 leading-relaxed text-white/70">
                  {para}
                </p>
              ))}
              
              {/* Mini-stat callout for premium feel */}
              <div className="mt-8 pt-8 border-t border-white/5 flex gap-8">
                <div>
                  <p className="font-macro-display text-4xl font-bold" style={{ color: ACCENT }}>
                    160 Ac.
                  </p>
                  <p className="macro-metadata text-white/50 text-xs mt-2">
                    {locale === "ro" ? "Dimensiune Cerc Standard" : "Standard Circle Size"}
                  </p>
                </div>
                <div>
                  <p className="font-macro-display text-4xl font-bold" style={{ color: ACCENT }}>
                    1948
                  </p>
                  <p className="macro-metadata text-white/50 text-xs mt-2">
                    {locale === "ro" ? "Anul Brevetării" : "Year of Patent"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Dual Image Grid with Hover Effects */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col group">
                <div className="relative h-96 overflow-hidden border border-white/10 hover:border-[#4ade80]/40 transition-colors bg-white/5">
                  <Image
                    src={SITE_IMAGES.resourcesIrrigationAerial}
                    alt={copy.irrigationAerialCaption}
                    fill
                    className="object-cover opacity-75 grayscale-[0.1] group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 35vw"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                </div>
                <p className="macro-metadata text-white/40 mt-4 leading-relaxed text-xs">
                  {copy.irrigationAerialCaption}
                </p>
              </div>

              <div className="flex flex-col group sm:mt-12">
                <div className="relative h-96 overflow-hidden border border-white/10 hover:border-[#4ade80]/40 transition-colors bg-white/5">
                  <Image
                    src={SITE_IMAGES.resourcesIrrigationSatellite}
                    alt={copy.irrigationSatelliteCaption}
                    fill
                    className="object-cover opacity-75 grayscale-[0.1] group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 35vw"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                </div>
                <p className="macro-metadata text-white/40 mt-4 leading-relaxed text-xs">
                  {copy.irrigationSatelliteCaption}
                </p>
              </div>
            </div>
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

          <ResourceGrid title={copy.mineralsGridTitle} items={strategicMinerals} />
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
        </section>

        {/* Cinematic image */}
        <div className="relative w-full h-[440px] my-24 overflow-hidden">
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

        <section className="mx-auto max-w-[1600px] px-6 md:px-12 mb-48">
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

          <ResourceGrid title={copy.waterSystemsTitle} items={waterSystems} />
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

        {/* ── Forests & Public Lands ──────────────────────────────── */}
        <section id="forests" className="mb-48 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <p className="macro-eyebrow mb-8" style={{ color: ACCENT }}>
                {copy.forestsEyebrow}
              </p>
              <h2 className="macro-section-title mb-12">{copy.forestsTitle}</h2>
              {forestsParagraphs.map((para, i) => (
                <p key={i} className="macro-body mb-8 max-w-4xl">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="my-24 grid gap-16 sm:grid-cols-3 border-t border-white/5 pt-16">
            {forestsFacts.map((fact, i) => (
              <MacroFact
                key={fact.id}
                index={i + 1}
                fact={fact.fact}
                detail={fact.detail}
              />
            ))}
          </div>
        </section>

        <InfrastructureBand
          imageSrc={SITE_IMAGES.landscapes.blueRidge}
          imageAlt="The forested ridges of the Blue Ridge Mountains"
        >
          <div className="max-w-3xl">
            <p className="macro-hero-title mb-4" style={{ color: ACCENT }}>
              640M
            </p>
            <p className="macro-metadata text-white/70">
              {locale === "ro"
                ? "Acri de teren public: aproape 28% din America"
                : "Acres of public land: nearly 28% of America"}
            </p>
          </div>
        </InfrastructureBand>

        {/* ── Milestones Timeline ─────────────────────────────────── */}
        <section id="milestones" className="mt-48 mb-32 mx-auto max-w-[1600px] px-6 md:px-12">
          <p className="macro-eyebrow mb-8" style={{ color: ACCENT }}>
            {copy.milestonesEyebrow}
          </p>
          <h2 className="macro-section-title mb-16">{copy.milestonesTitle}</h2>

          <div className="grid gap-6">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 border-b border-white/10 pb-6 md:items-baseline"
              >
                <div
                  className="md:col-span-2 font-macro-display text-3xl font-bold"
                  style={{ color: ACCENT }}
                >
                  {m.year}
                </div>
                <div className="md:col-span-3 font-macro-display text-2xl text-white">
                  {m.title}
                </div>
                <div className="md:col-span-7 font-macro-body text-white/55">
                  {m.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pull Quote 3 ────────────────────────────────────────── */}
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 my-32 border-t border-white/5 pt-32">
          <QuoteBlock
            quote={quotes[2].quote}
            attribution={quotes[2].attribution}
            title={quotes[2].title}
            variant="dark"
          />
        </div>

        {/* The Visual Record: grouped photo gallery */}
        <ResourceGallery
          categories={galleryCategories}
          eyebrow={copy.galleryEyebrow}
          title={copy.galleryTitle}
          intro={copy.galleryIntro}
        />

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
