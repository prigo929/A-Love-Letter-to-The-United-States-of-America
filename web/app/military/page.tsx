// ─────────────────────────────────────────────────────────────────────────────
// page.tsx: MILITARY POWER · CINEMATIC OVERHAUL v3
// "The United States as a planetary command-and-control system."
//
// Design language ─────────────────────────────────────────────────────────────
//   Defense-Tech × Aerospace HUD × Apple Keynote × Top Gun: Maverick
//
// Architecture ────────────────────────────────────────────────────────────────
//   Every section is a full-bleed cinematic panel.
//   Layers per panel: bg-image → vignette → grid → scan → grain → HUD → text
//
// Sections ────────────────────────────────────────────────────────────────────
//   §0  HERO         : B-2 emerging from darkness, parallax, particle canvas
//   §1  STAT WALL    : HUD counters across the full viewport
//   §2  DOMINANCE    : global overview + budget comparison bars
//   §3  BRANCHES     : cinematic branch selector
//   §4  CARRIER MAP  : world map with real-time carrier positions + satellite
//   §5  WEAPONS      : classified dossier cards
//   §6  NUCLEAR TRIAD: interactive SVG triangle
//   §7  DARPA        : future systems grid
//   §8  INDUSTRY     : defense contractor grid
//   §9  FACTS        : rolling ticker + fact cards
//   §10 QUOTE        : full-bleed cinematic quote
//   §11 SUB-PAGE NAV : chapter navigation
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


import {
  MilStyles,
  MinimalistStat,
  WeaponSystemCard,
  BranchSelector,
  DARPAProgramGrid,
  NuclearTriadDiagram,
  VideoMilitaryHero,
  BudgetComparisonBar,
  AlliancesShowcase,
  SOCOMGrid,
  IntelligenceNetworkMap,
} from "@/components/military/MilitaryAnimations";
import { GlobalCommandMap } from "@/components/military/GlobalBasesComponents";
import { getDomesticBases } from "@/lib/data/domestic-bases-data";
import { getStrategicBases, getRegionBriefs } from "@/lib/data/global-bases-data";
import { getOverseasBases } from "@/lib/data/overseas-bases-data";
import { LayoutGroup } from "framer-motion";
import { FloatingTOC } from "@/components/layout/FloatingTOC";

import { getServerLocale } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";
import { SITE_IMAGES } from "@/lib/site-images";
import { VERTICALS_THEMATIC_DATA } from "@/lib/data/verticals-thematic-data";
import DeepDiveSection from "@/components/shared/DeepDiveSection";
import { IconicPhotographs } from "@/components/shared/IconicPhotographs";
import { DEEP_DIVE_THEMES } from "@/lib/deep-dive-themes";
import { getMilitaryPageCopy } from "@/lib/i18n/messages/pages";

import {
  MILITARY_STATS,
  MILITARY_BRANCHES,
  WEAPON_SYSTEMS,
  DARPA_PROGRAMS,
  NUCLEAR_TRIAD,
  CARRIER_POSITIONS,
  MILITARY_QUOTES,
  DEFENSE_CONTRACTORS,
  BUDGET_DATA,
  getMilitaryFacts,
  getMilitaryStats,
  getMilitaryBranches,
  getWeaponSystems,
  getDARPAPrograms,
  getNuclearTriad,
  getLocalizedCarriers,
  getBudgetData,
  getDefenseContractors,
  getMilitaryQuotes,
  getSOCOMUnits,
  getIntelligenceAgencies,
  getAlliancesData,
} from "@/lib/data/military-data";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "American Military Power",
  description:
    "The United States operates the most advanced military-industrial-intelligence system in human history. Explore the forces, technologies, and doctrine that define planetary dominance.",
  openGraph: {
    title: "American Military Power",
    description: "Planetary command-and-control. The full spectrum of American military supremacy.",
    images: [{ url: SITE_IMAGES.military.hero, width: 1200, height: 630 }],
  },
};

// ─── Constants ────────────────────────────────────────────────────────────────

const getHeroStats = (locale: Locale) => {
  const stats = getMilitaryStats(locale);
  const budgetStat = stats.find(s => s.id === "budget");
  const basesStat = stats.find(s => s.id === "bases");
  const nukesStat = stats.find(s => s.id === "nukes");
  const carriersStat = stats.find(s => s.id === "carriers");
  const isRo = locale === 'ro';

  return [
    { 
      value: budgetStat
        ? (isRo 
            ? `${budgetStat.value} mld. $` 
            : `$${budgetStat.value}B`)
        : "", 
      label: budgetStat?.label || ""
    },
    { 
      value: carriersStat ? `${carriersStat.value}` : "", 
      label: carriersStat?.label || ""
    },
    { 
      value: basesStat ? `${basesStat.value}${basesStat.suffix || ''}` : "", 
      label: basesStat?.label || ""
    },
    { 
      value: nukesStat 
        ? `${nukesStat.value.toLocaleString(isRo ? 'ro-RO' : 'en-US')}${nukesStat.suffix || ''}` 
        : "", 
      label: nukesStat?.label || ""
    },
  ];
};

const getDominanceMetrics = (locale: Locale) => {
  const stats = getMilitaryStats(locale);
  const isRo = locale === 'ro';
  return [
    { 
      value: "33%",  
      label: isRo ? "Cotă din Cheltuielile Militare Globale" : "Share of Global Military Spending" 
    },
    { 
      value: `${stats.find(s => s.id === "satellites")?.value || ''}${stats.find(s => s.id === "satellites")?.suffix || ''}`,  
      label: stats.find(s => s.id === "satellites")?.label || ""
    },
    { 
      value: `${Math.round((stats.find(s => s.id === "aircraft")?.value || 0) / 1000)}K+`, 
      label: isRo ? "Aeronave Militare: Cea Mai Mare Flotă" : "Military Aircraft: Largest Fleet on Earth"
    },
    { 
      value: `${stats.find(s => s.id === "ships")?.value || ''}${stats.find(s => s.id === "ships")?.suffix || ''}`,  
      label: stats.find(s => s.id === "ships")?.label || ""
    },
  ];
};

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  children,
  id,
  label,
  bg = "#000000",
  noPad = false,
  fullBleed = false,
}: {
  children: React.ReactNode;
  id?: string;
  label?: string;
  bg?: string;
  noPad?: boolean;
  fullBleed?: boolean;
}) {
  return (
    <section
      id={id}
      className="relative overflow-hidden"
      style={{ background: bg }}
    >
      {/* Seamless transition */}

      {label && (
        <div className="pt-22 pb-12 flex justify-center">
          <div className="mil-text-label tracking-[0.5em]">{label}</div>
        </div>
      )}

      <div className={cn(
        "mx-auto",
        fullBleed ? "max-w-none" : "max-w-[1440px]",
        noPad ? "p-0" : "px-6 py-32 md:py-48"
      )}>
        {children}
      </div>
    </section>
  );
}



// ─── Cinematic Section Image ──────────────────────────────────────────────────

function CinematicImage({
  src,
  alt,
  height = 600,
  children,
}: {
  src:       string;
  alt:       string;
  height?:   number;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden bg-black min-h-screen flex items-center justify-center">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-45 grayscale-[0.7] sepia-[0.1]"
        sizes="100vw"
        quality={90}
      />
      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,black_0%,rgba(0,0,0,0)_15%,rgba(0,0,0,0)_85%,black_100%)]" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)'
      }} />
      <div className="relative z-10 flex h-full items-center justify-center py-32">
        {children}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function MilitaryPage() {
  const locale = await getServerLocale();
  const isRo   = locale === "ro";
  const copy = getMilitaryPageCopy(locale);
  const stats = getMilitaryStats(locale);
  const facts = getMilitaryFacts(locale);
  const branches = getMilitaryBranches(locale);
  const weaponSystems = getWeaponSystems(locale);
  const darpaPrograms = getDARPAPrograms(locale);
  const nuclearTriad = getNuclearTriad(locale);
  const carriers = getLocalizedCarriers(locale);
  const bases = getStrategicBases(locale);
  const regions = getRegionBriefs(locale);
  const domesticBases = getDomesticBases(locale);
  const overseasBases = getOverseasBases(locale);
  const budgetData = getBudgetData(locale);
  const contractors = getDefenseContractors(locale);
  const quotes = getMilitaryQuotes(locale);
  const alliances = getAlliancesData(locale);
  const socomUnits = getSOCOMUnits(locale);
  const intelligenceAgencies = getIntelligenceAgencies(locale);
  const quote = quotes[0];

  const heroStats = getHeroStats(locale);
  const dominanceMetrics = getDominanceMetrics(locale);
  const tocItems = copy.tocItems;

  return (
    <div className="bg-black text-white min-h-screen">
      <FloatingTOC items={tocItems} />
      <MilStyles />


      {/* ─── §1  HERO: looping video showcase ─────────────────────────── */}
      <VideoMilitaryHero
        videoSrc="/videos/military/supremacy-wave.mp4"
        posterSrc={SITE_IMAGES.military.hero}
        title={copy.heroTitle}
        subtitle={copy.heroSubtitle}
        tagline={copy.heroTagline}
        stats={heroStats}
      />

      {/* ─── §2  GLOBAL STAT WALL ──────────────────────────────────────────── */}
      <Section
        id="stats"
        label={copy.statsLabel}
        noPad
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/5">
          {stats.map((s, i) => (
            <div key={s.id} className="border-r border-b border-white/5">
              <MinimalistStat stat={s} index={i} locale={locale} />
            </div>
          ))}
        </div>
      </Section>

      {/* ─── §3  GLOBAL DOMINANCE OVERVIEW ─────────────────────────────────── */}
      <Section
        id="dominance"
        label={copy.dominanceLabel}
      >
        <div className="text-center mb-32">
          <h2 className="mil-text-hero mb-12 flex flex-col items-center w-full text-center">
            <span className="block whitespace-nowrap">{copy.dominanceTitle1}</span>
            <span className="block whitespace-nowrap text-white/20">{copy.dominanceTitle2}</span>
          </h2>
          <p className="mil-text-metadata max-w-2xl mx-auto leading-relaxed">
            {copy.dominanceDescription}
          </p>
        </div>

        {/* Dominance metric tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          {dominanceMetrics.map((m, i) => (
            <div key={i} className="flex flex-col">
              <div className="text-[clamp(40px,6vw,80px)] font-extralight tracking-tighter mb-4 leading-none">{m.value}</div>
              <div className="h-px w-12 bg-white/10 mb-4" />
              <div className="mil-text-metadata font-bold tracking-[0.2em] text-[11px] text-white/70">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Budget comparison chart */}
        <div className="mt-12">
          <BudgetComparisonBar data={budgetData} locale={locale}/>
        </div>
      </Section>


      
      


      {/* ─── §4  MILITARY BRANCHES ──────────────────────────────────────────── */}
      <Section
        id="branches"
        label={copy.branchesLabel}
      >
        <div className="text-center mb-24">
          <h2 className="text-7xl font-black tracking-tighter uppercase">
            {copy.branchesTitle1}<br/>
            <span className="text-white/20">{copy.branchesTitle2}</span>
          </h2>
        </div>
        <BranchSelector branches={branches} locale={locale}/>
      </Section>

      {/* ─── §4.2  SPECIAL OPERATIONS COMMAND (SOCOM) ───────────────────────── */}
      <Section
        id="socom"
        label={copy.socomLabel}
      >
        <div className="text-center mb-24">
          <h2 className="mil-text-hero mb-12 flex flex-col items-center w-full text-center">
            <span className="block whitespace-nowrap">{copy.socomTitle1}</span>
            <span className="block whitespace-nowrap text-white/20">{copy.socomTitle2}</span>
          </h2>
          <p className="mil-text-metadata max-w-xl mx-auto leading-relaxed tracking-[0.2em] text-center">
            {copy.socomDescription}
          </p>
        </div>
        <SOCOMGrid units={socomUnits} locale={locale} />
      </Section>

      {/* ─── §5  GLOBAL COMMAND MAP CINEMATIC INTERLUDE ────────────────────────────── */}
      <CinematicImage
        src={SITE_IMAGES.homeUsaAtNightFromSpace}
        alt="US military global presence"
      >
        <div className="text-center px-4">
          <div className="mil-text-label mb-12">{copy.carrierLabel}</div>
          <h2 className="text-[clamp(32px,8vw,110px)] font-black uppercase leading-[1.0] tracking-tight text-white flex flex-col items-center w-full text-center">
            <span className="block whitespace-nowrap">{copy.carrierTitle1}</span>
            <span className="block whitespace-nowrap text-white/20">{copy.carrierTitle2}</span>
          </h2>
          <div className="mil-text-metadata mt-12 font-bold text-sm text-white/70">
            {copy.carrierSub}
          </div>
        </div>
      </CinematicImage>

      {/* ─── §6  GLOBAL COMMAND MAP ─────────────────────────────────────────── */}
      <GlobalCommandMap
        bases={bases}
        domesticBases={domesticBases}
        overseasBases={overseasBases}
        regions={regions}
        locale={locale}
      />

      {/* ─── §7  WEAPON SYSTEMS ─────────────────────────────────────────────── */}
      <Section
        id="weapons"
        label={copy.weaponsLabel}
      >
        <div className="text-center mb-24">
          <h2 className="mil-text-hero mb-12 flex flex-col items-center w-full text-center">
            <span className="block whitespace-nowrap">{copy.weaponsTitle1}</span>
            <span className="block whitespace-nowrap text-white/20">{copy.weaponsTitle2}</span>
          </h2>
          <p className="mil-text-metadata max-w-xl mx-auto leading-relaxed tracking-[0.2em]">
            {copy.weaponsDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {weaponSystems.map((sys, i) => (
            <WeaponSystemCard key={sys.id} system={sys} index={i} locale={locale}/>
          ))}
        </div>
      </Section>

      {/* ─── §8  B-2 CINEMATIC INTERLUDE ────────────────────────────────────── */}
      <CinematicImage
        src={SITE_IMAGES.military.b2}
        alt="B-2 Spirit stealth bomber over the Pacific"
        height={800}
      >
        <div className="flex flex-col items-center text-center max-w-4xl px-6">
          <div className="mil-text-label mb-12">{copy.b2Label}</div>
          <h2 className="mil-text-hero flex flex-col items-center w-full">
            <span className="block">{copy.b2Title1}</span>
            <span className="block text-white/20">{copy.b2Title2}</span>
          </h2>
          <p className="mil-text-metadata mt-12 mb-16">
            {copy.b2Description}
          </p>

          <div className="flex flex-wrap justify-center gap-x-24 gap-y-12">
            {copy.b2Stats.map((item) => (
              <div key={item.label} className="text-center">
                <div className="mil-text-metadata mb-2 opacity-60">{item.label}</div>
                <div className="text-2xl font-bold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </CinematicImage>

      {/* ─── §9  NUCLEAR TRIAD ──────────────────────────────────────────────── */}
      <Section
        id="nuclear"
        label={copy.nuclearLabel}
      >
        <div className="text-center mb-24">
          <h2 className="text-7xl font-black tracking-tighter uppercase mb-8">
            {copy.nuclearTitle1}<br/>
            <span className="text-white/20">{copy.nuclearTitle2}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <NuclearTriadDiagram triad={nuclearTriad} locale={locale}/>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {copy.nuclearLegs.map((item, i) => (
              <div key={i} className="border-l border-white/10 pl-8 py-6">
                <div className="text-2xl font-black mb-2">{item.v}</div>
                <div className="mil-text-metadata mb-2 font-bold">{item.l}</div>
                <div className="mil-text-metadata text-[11px] font-bold text-white/40">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── §9.5  THE INTELLIGENCE NETWORK ─────────────────────────────────── */}
      <Section
        id="intelligence"
        label={copy.intelligenceLabel}
      >
        <div className="text-center mb-24">
          <h2 className="text-7xl font-black tracking-tighter uppercase mb-8">
            {copy.intelligenceTitle1}<br/>
            <span className="text-white/20">{copy.intelligenceTitle2}</span>
          </h2>
          <p className="mil-text-metadata max-w-2xl mx-auto leading-relaxed text-center">
            {copy.intelligenceDescription}
          </p>
        </div>
        <IntelligenceNetworkMap agencies={intelligenceAgencies} locale={locale} />
      </Section>

      {/* ─── §10  DARPA / FUTURE SYSTEMS ────────────────────────────────────── */}
      <Section
        id="darpa"
        label={copy.darpaLabel}
      >
        <div className="text-center mb-32">
          <h2 className="mil-text-hero mb-12 flex flex-col items-center w-full text-center">
            <span className="block whitespace-nowrap">{copy.darpaTitle1}</span>
            <span className="block whitespace-nowrap text-white/20">{copy.darpaTitle2}</span>
          </h2>
          <p className="mil-text-metadata max-w-xl mx-auto leading-relaxed">
            {copy.darpaDescription}
          </p>
        </div>

        <LayoutGroup>
          <DARPAProgramGrid programs={darpaPrograms} locale={locale}/>
        </LayoutGroup>
      </Section>


      {/* ─── §11  ORBITAL CINEMATIC INTERLUDE ───────────────────────────────── */}
      <CinematicImage
        src={SITE_IMAGES.military.satellite}
        alt="US military satellite orbital infrastructure"
      >
        <div className="text-center max-w-4xl px-6">
          <div className="mil-text-label mb-12">{copy.orbitalLabel}</div>
          <h2 className="mil-text-hero flex flex-col items-center w-full text-center">
            <span className="block whitespace-nowrap">{copy.orbitalTitle1}</span>
            <span className="block whitespace-nowrap text-white/20">{copy.orbitalTitle2}</span>
          </h2>
          <p className="mil-text-metadata mt-12 font-bold text-sm text-white/70">
            {copy.orbitalSub}
          </p>
        </div>
      </CinematicImage>

      {/* ─── §12  DEFENSE INDUSTRIAL BASE ───────────────────────────────────── */}
      <Section
        id="industry"
        label={copy.industryLabel}
      >
        <div className="text-center mb-32">
          <h2 className="mil-text-hero mb-12 flex flex-col items-center w-full text-center">
            <span className="block whitespace-nowrap">{copy.industryTitle1}</span>
            <span className="block whitespace-nowrap text-white/20">{copy.industryTitle2}</span>
          </h2>
          <p className="mil-text-metadata max-w-xl mx-auto leading-relaxed">
            {copy.industryDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/2">
          {contractors.map((c, i) => (
            <div key={c.name} className="group bg-[#0a0a0a] p-12 flex flex-col h-full relative mil-gradient-border hover:bg-[#0f0f0f] transition-colors duration-500">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <h4 className="text-2xl font-bold tracking-tight">{c.name}</h4>
                  <div className="mil-text-metadata text-[11px] font-black bg-white/5 border border-white/10 px-3 py-1.5 text-white/80">{c.revenue}</div>
                </div>
                <div className="mil-text-metadata opacity-55 mb-8 grow tracking-[0.2em]">{c.specialty}</div>
                <div className="flex flex-wrap gap-2">
                  {c.programs.map(prog => (
                    <span key={prog} className="mil-text-metadata text-[10px] font-bold border border-white/10 px-2 py-1 text-white/70">
                      {prog}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── §13  FACTS GRID ────────────────────────────────────────────────── */}
      <Section
        id="facts"
        label={copy.factsLabel}
      >
        <div className="text-center mb-32">
          <h2 className="mil-text-hero mb-12 flex flex-col items-center w-full text-center">
            <span className="block whitespace-nowrap">{copy.factsTitle1}</span>
            <span className="block whitespace-nowrap text-white/20">{copy.factsTitle2}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {facts.map((f, i) => (
            <div key={i} className="bg-black p-12">
              <div className="mil-text-metadata text-white/60 font-black mb-6">[ FACT_{i+1} ]</div>
              <p className="text-white/60 leading-relaxed">
                {f.fact}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── §3.2  GLOBAL ALLIANCES: NATO & AUKUS ─────────────────────────── */}
      <Section
        id="alliances"
        label={copy.alliancesLabel}
      >
        <div className="text-center mb-24">
          <h2 className="text-7xl font-black tracking-tighter uppercase mb-8">
            {copy.alliancesTitle1}<br/>
            <span className="text-white/20">{copy.alliancesTitle2}</span>
          </h2>
          <p className="mil-text-metadata max-w-2xl mx-auto leading-relaxed text-center">
            {copy.alliancesDescription}
          </p>
        </div>
        <AlliancesShowcase alliances={alliances} locale={locale} />
        <div className="mt-12 flex justify-center">
          <Link
            href="/global-leadership/nato"
            className="inline-flex h-11 items-center justify-center border border-white/15 bg-white px-5 text-xs font-bold uppercase text-black transition-colors hover:bg-white/85"
          >
            {isRo ? "EXPLOREAZĂ DIPLOMAȚIA NATO →" : "EXPLORE NATO DIPLOMACY →"}
          </Link>
        </div>
      </Section>

      {/* ─── §14  QUOTE: full-bleed cinematic ──────────────────────────────── */}
      {/* ─── §14  QUOTE: full-viewport cinematic ──────────────────────────── */}
      <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 mil-dot-canvas opacity-30" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <blockquote className="text-[clamp(28px,5vw,72px)] font-black tracking-wider leading-[1.7] text-white/90 mb-24" style={{ wordSpacing: '0.08em' }}>
            &ldquo;{quote.quote}&rdquo;
          </blockquote>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2))' }} />
              <cite className="mil-text-metadata not-italic tracking-[0.4em] text-[11px] font-black uppercase text-white/70">
                {quote.attribution}: {quote.title}
              </cite>
              <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.2))' }} />
            </div>
            {quote.note && (
              <p className="mil-text-metadata max-w-xl mx-auto opacity-30 text-[10px] leading-relaxed italic">
                {quote.note}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ─── §15  CHAPTER NAVIGATION ─────────────────────────────────────────── */}
      <Section
        id="explore"
        label={copy.exploreLabel}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: "/economy",     label: isRo ? "Economie" : "Economy",      sub: isRo ? "Motor Financiar" : "Financial Engine" },
            { href: "/nature",      label: isRo ? "Natură" : "Nature",       sub: isRo ? "Peisaj Primal" : "Primal Landscape" },
            { href: "/science",     label: isRo ? "Inovație" : "Innovation",   sub: isRo ? "Tehnologia Viitorului" : "Future Tech" },
            { href: "/history",     label: isRo ? "Moștenire" : "Heritage",     sub: isRo ? "Legatul Libertății" : "Legacy of Liberty" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mil-glass p-8 group hover:bg-white/5 transition-colors"
            >
              <div className="text-xl font-bold uppercase mb-2 group-hover:translate-x-1 transition-transform">{item.label}</div>
              <div className="mil-text-metadata text-[11px] font-bold text-white/40 tracking-widest uppercase">{item.sub}</div>
            </Link>
          ))}
        </div>

        {/* Iconic Photographs */}
        <IconicPhotographs
          section="military"
          intro="The American armed forces across a century of conflict, from the beaches of Normandy to the skies over the modern battlespace, captured on film."
        />

        {/* Deep Dive Archive */}
        <DeepDiveSection
          locale={locale}
          topics={VERTICALS_THEMATIC_DATA["military"] || []}
          theme={DEEP_DIVE_THEMES.military}
        />
 
        {/* Interactive Chat CTA */}
        <div className="mt-16 border border-glory-gold/20 bg-glory-gold/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
          <div>
            <span className="mil-text-metadata text-xs uppercase tracking-[0.2em] text-[#E8B923] mb-2 block">
              {copy.oracleLabel}
            </span>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-(family-name:--font-archivo)">
              {copy.oracleTitle}
            </h3>
            <p className="mil-text-metadata text-white/50 text-sm mt-2 max-w-2xl">
              {copy.oracleDescription}
            </p>
          </div>
          <Link
            href="/interactive"
            className="shrink-0 inline-flex items-center gap-3 px-6 py-3.5 bg-glory-gold hover:bg-glory-gold-light text-black font-body font-semibold text-sm transition-colors rounded-none shadow-lg"
          >
            {isRo ? "ÎNTREABĂ AMERICA →" : "ASK AMERICA →"}
          </Link>
        </div>

        {/* Bottom classification strip */}
        <div className="mt-48 pt-12 border-t border-white/5 flex items-center justify-center gap-8">
          <div className="h-px w-24 bg-linear-to-r from-transparent to-white/10" />
          <span className="mil-text-metadata text-[11px] font-black text-white/40 tracking-[0.5em] uppercase">
            {copy.bottomClassification}
          </span>
          <div className="h-px w-24 bg-linear-to-l from-transparent to-white/10" />
        </div>
      </Section>
      
      {/* Footer Spacer */}
      <div className="h-32 bg-black" />
    </div>
  );
}
