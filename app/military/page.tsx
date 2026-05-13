// ─────────────────────────────────────────────────────────────────────────────
// page.tsx — MILITARY POWER · CINEMATIC OVERHAUL v3
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
//   §0  HERO          — B-2 emerging from darkness, parallax, particle canvas
//   §1  STAT WALL     — HUD counters across the full viewport
//   §2  DOMINANCE     — global overview + budget comparison bars
//   §3  BRANCHES      — cinematic branch selector
//   §4  CARRIER MAP   — world map with real-time carrier positions + satellite
//   §5  WEAPONS       — classified dossier cards
//   §6  NUCLEAR TRIAD — interactive SVG triangle
//   §7  DARPA         — future systems grid
//   §8  INDUSTRY      — defense contractor grid
//   §9  FACTS         — rolling ticker + fact cards
//   §10 QUOTE         — full-bleed cinematic quote
//   §11 SUB-PAGE NAV  — chapter navigation
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


import {
  MilStyles,
  SmoothScroll,
  MinimalistStat,
  WeaponSystemCard,
  BranchSelector,
  DARPAProgramGrid,
  NuclearTriadDiagram,
  GlobalCarrierMap,
  ParallaxMilitaryHero,
  BudgetComparisonBar,
} from "@/components/military/MilitaryAnimations";
import { LayoutGroup } from "framer-motion";

import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";
import { SITE_IMAGES } from "@/lib/site-images";

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

const HERO_STATS = [
  { 
    value: `${MILITARY_STATS.find(s => s.id === "budget")?.prefix}${MILITARY_STATS.find(s => s.id === "budget")?.value}${MILITARY_STATS.find(s => s.id === "budget")?.suffix}`, 
    label: "Defense Budget" 
  },
  { 
    value: `${MILITARY_STATS.find(s => s.id === "carriers")?.value}`, 
    label: "Carrier Groups" 
  },
  { 
    value: `${MILITARY_STATS.find(s => s.id === "bases")?.value}${MILITARY_STATS.find(s => s.id === "bases")?.suffix}`, 
    label: "Global Bases" 
  },
  { 
    value: `${MILITARY_STATS.find(s => s.id === "nukes")?.value}${MILITARY_STATS.find(s => s.id === "nukes")?.suffix}`, 
    label: "Nuclear Warheads" 
  },
];

const DOMINANCE_METRICS = [
  { value: "33%",  label: "Share of Global Military Spending" },
  { 
    value: `${MILITARY_STATS.find(s => s.id === "satellites")?.value}${MILITARY_STATS.find(s => s.id === "satellites")?.suffix}`,  
    label: "Satellites in Military Orbit" 
  },
  { 
    value: `${Math.round(MILITARY_STATS.find(s => s.id === "aircraft")?.value! / 1000)}K+`, 
    label: "Military Aircraft — Largest Fleet on Earth"
  },
  { 
    value: `${MILITARY_STATS.find(s => s.id === "ships")?.value}${MILITARY_STATS.find(s => s.id === "ships")?.suffix}`,  
    label: "Naval Vessels Including 11 Supercarriers"
  },
];

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
      {/* Subtle separator */}
      <div className="h-px w-full bg-white/5" />

      {label && (
        <div className="pt-24 pb-12 flex justify-center">
          <div className="mil-text-label">{label}</div>
        </div>
      )}

      <div className={cn(
        "mx-auto",
        fullBleed ? "max-w-none" : "max-w-[1440px]",
        noPad ? "p-0" : "px-6 py-24"
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
    <div className="relative overflow-hidden bg-black" style={{ height }}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-40 grayscale-[0.5]"
        sizes="100vw"
        quality={90}
      />
      <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black" />
      <div className="relative z-10 flex h-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function MilitaryPage() {
  const locale = await getServerLocale();
  const stats  = getMilitaryStats(locale);
  const facts  = getMilitaryFacts(locale);
  const quote  = MILITARY_QUOTES[0];

  return (
    <div className="bg-black text-white min-h-screen">
      <MilStyles />
      <SmoothScroll />

      {/* ─── §1  HERO — B-2 emerging from darkness ─────────────────────────── */}
      <ParallaxMilitaryHero
        imageSrc={SITE_IMAGES.military.hero}
        imageAlt="B-2 Spirit stealth bomber"
        title="ABSOLUTE POWER"
        subtitle="United States Military · Industrial · Intelligence Complex"
        tagline="First in strength · First in readiness · First in the world"
        stats={HERO_STATS}
      />

      {/* ─── §2  GLOBAL STAT WALL ──────────────────────────────────────────── */}
      <Section
        id="stats"
        label="VERIFIED METRICS · FY 2025"
        noPad
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/5">
          {stats.map((s, i) => (
            <div key={s.id} className="border-r border-b border-white/5">
              <MinimalistStat stat={s} index={i}/>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── §3  GLOBAL DOMINANCE OVERVIEW ─────────────────────────────────── */}
      <Section
        id="dominance"
        label="GLOBAL DOMINANCE · STRATEGIC OVERVIEW"
      >
        <div className="text-center mb-32">
          <h2 className="mil-text-hero mb-12">
            PLANETARY<br/>
            <span className="text-white/20">COMMAND</span>
          </h2>
          <p className="mil-text-metadata max-w-2xl mx-auto leading-relaxed">
            The United States does not simply field a military — it operates a globally
            interconnected command-and-control system spanning land, sea, air, space, and
            cyberspace. No nation comes close.
          </p>
        </div>

        {/* Dominance metric tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          {DOMINANCE_METRICS.map((m, i) => (
            <div key={i} className="flex flex-col">
              <div className="text-5xl font-black mb-4">{m.value}</div>
              <div className="mil-text-metadata opacity-40">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Budget comparison chart */}
        <div className="mil-glass p-12 md:p-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16">
            <div>
              <div className="mil-text-metadata mb-4">VERIFIED · SIPRI 2025</div>
              <h3 className="text-4xl font-bold tracking-tight">DEFENSE BUDGET COMPARISON</h3>
            </div>
            <div className="mil-text-metadata opacity-40">◈ &nbsp; U.S. OUTSPENDS THE NEXT TEN NATIONS COMBINED</div>
          </div>
          <BudgetComparisonBar data={BUDGET_DATA}/>
        </div>
      </Section>
      
      {/* ─── §3.5  SUPREMACY WAVE — MILITARY SHOWCASE ────────────────────────── */}
      <Section
        id="supremacy-wave"
        label="AMERICA SUPREMACY · MILITARY SHOWCASE"
        fullBleed
        noPad
      >
        <div className="relative w-full aspect-video overflow-hidden bg-black">
          <video
            autoPlay loop muted playsInline
            className="w-full h-full object-cover opacity-60"
            aria-label="Cinematic military supremacy video showcase"
          >
            <source src="/videos/military/supremacy-wave.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black" />
          
          <div className="absolute bottom-24 left-24 z-30 border-l-2 border-white/20 pl-12">
            <h2 className="text-6xl font-black tracking-tighter uppercase mb-4">
              ABSOLUTE SUPREMACY
            </h2>
            <p className="mil-text-metadata">
              PLANETARY DOMINANCE · VERIFIED 2025
            </p>
          </div>
        </div>
      </Section>

      {/* ─── §4  MILITARY BRANCHES ──────────────────────────────────────────── */}
      <Section
        id="branches"
        label="THE BRANCHES OF SERVICE"
      >
        <div className="text-center mb-24">
          <h2 className="text-7xl font-black tracking-tighter uppercase">
            SIX BRANCHES.<br/>
            <span className="text-white/20">ONE MISSION.</span>
          </h2>
        </div>
        <BranchSelector branches={MILITARY_BRANCHES}/>
      </Section>

      {/* ─── §5  CARRIER MAP CINEMATIC INTERLUDE ────────────────────────────── */}
      <CinematicImage
        src={SITE_IMAGES.military.carrier}
        alt="USS Nimitz carrier strike group"
      >
        <div className="text-center">
          <div className="mil-text-label mb-12">NAVAL SUPERIORITY · GLOBAL REACH</div>
          <h2 className="mil-text-hero">
            11 CARRIER<br/>STRIKE GROUPS
          </h2>
          <div className="mil-text-metadata mt-12">
            Simultaneously deployed across every ocean on earth
          </div>
        </div>
      </CinematicImage>

      {/* ─── §6  GLOBAL CARRIER MAP ─────────────────────────────────────────── */}
      <Section
        id="carrier-map"
        label="CARRIER GROUP DEPLOYMENT · LIVE POSITIONS"
      >
        <GlobalCarrierMap positions={CARRIER_POSITIONS}/>
      </Section>

      {/* ─── §7  WEAPON SYSTEMS ─────────────────────────────────────────────── */}
      <Section
        id="weapons"
        label="CROWN JEWELS OF AMERICAN POWER"
      >
        <div className="text-center mb-32">
          <h2 className="mil-text-hero mb-12">
            THE ARSENAL OF<br/>
            <span className="text-white/20">DEMOCRACY</span>
          </h2>
          <p className="mil-text-metadata max-w-xl mx-auto leading-relaxed">
            From stealth aircraft to hypersonic missiles, the systems that define
            the technological boundary of what warfare can be.
          </p>
        </div>

        <LayoutGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WEAPON_SYSTEMS.map((sys, i) => (
              <WeaponSystemCard key={sys.id} system={sys} index={i}/>
            ))}
          </div>
        </LayoutGroup>
      </Section>

      {/* ─── §8  B-2 CINEMATIC INTERLUDE ────────────────────────────────────── */}
      <CinematicImage
        src={SITE_IMAGES.military.b2}
        alt="B-2 Spirit stealth bomber over the Pacific"
      >
        <div className="text-center max-w-4xl px-6">
          <div className="mil-text-label mb-12">NORTHROP GRUMMAN B-2 SPIRIT · SINCE 1997</div>
          <h2 className="mil-text-hero">
            BORN FROM<br/>
            <span className="text-white/20">DARKNESS</span>
          </h2>
          <p className="mil-text-metadata mt-12 mb-16">
            The world's only operational low-observable strategic stealth bomber.
            Radar cross-section equivalent to a large bird. Range: global.
          </p>

          <div className="flex flex-wrap justify-center gap-x-24 gap-y-12">
            {[
              ["SPEED", "Mach 0.95"],
              ["RANGE", "6,900+ mi"],
              ["PAYLOAD", "40,000 lb"],
              ["FLEET",   "20 aircraft"],
            ].map(([k, v]) => (
              <div key={k} className="text-center">
                <div className="mil-text-metadata mb-2 opacity-40">{k}</div>
                <div className="text-2xl font-bold">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </CinematicImage>

      {/* ─── §9  NUCLEAR TRIAD ──────────────────────────────────────────────── */}
      <Section
        id="nuclear"
        label="NUCLEAR DETERRENCE · THE IRON TRIAD"
      >
        <div className="text-center mb-24">
          <h2 className="text-7xl font-black tracking-tighter uppercase mb-8">
            THE NUCLEAR<br/>
            <span className="text-white/20">TRIAD</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <NuclearTriadDiagram triad={NUCLEAR_TRIAD}/>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { v: "5,550+",   l: "Total Nuclear Warheads",         sub: "Verified stockpile" },
              { v: "400",      l: "Minuteman III ICBMs on Alert",    sub: "Silo-based, 24/7" },
              { v: "14",       l: "Ohio-Class SSBNs",                sub: "Trident II D5 equipped" },
              { v: "60+",      l: "Strategic Bombers",               sub: "B-52H and B-2A fleet" },
            ].map((item, i) => (
              <div key={i} className="border-l border-white/10 pl-8 py-6">
                <div className="text-4xl font-black mb-2">{item.v}</div>
                <div className="mil-text-metadata mb-2">{item.l}</div>
                <div className="mil-text-metadata text-[8px] opacity-30">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── §10  DARPA / FUTURE SYSTEMS ────────────────────────────────────── */}
      <Section
        id="darpa"
        label="DARPA · FUTURE CAPABILITIES"
      >
        <div className="text-center mb-32">
          <h2 className="mil-text-hero mb-12">
            THE NEXT<br/>
            <span className="text-white/20">GENERATION</span>
          </h2>
          <p className="mil-text-metadata max-w-xl mx-auto leading-relaxed">
            DARPA funds technologies a generation ahead of the battlefield. 
            What's in development today is what wins wars in 2040.
          </p>
        </div>

        <LayoutGroup>
          <DARPAProgramGrid programs={DARPA_PROGRAMS}/>
        </LayoutGroup>
      </Section>


      {/* ─── §11  ORBITAL CINEMATIC INTERLUDE ───────────────────────────────── */}
      <CinematicImage
        src={SITE_IMAGES.military.satellite}
        alt="US military satellite orbital infrastructure"
      >
        <div className="text-center max-w-4xl px-6">
          <div className="mil-text-label mb-12">SPACE DOMAIN AWARENESS · GLOBAL REACH</div>
          <h2 className="mil-text-hero">
            ORBITAL<br/>
            <span className="text-white/20">DOMINANCE</span>
          </h2>
          <p className="mil-text-metadata mt-12">
            142+ military satellites provide GPS precision, real-time ISR, 
            and missile defense integration. Global coverage: 100%.
          </p>
        </div>
      </CinematicImage>

      {/* ─── §12  DEFENSE INDUSTRIAL BASE ───────────────────────────────────── */}
      <Section
        id="industry"
        label="DEFENSE INDUSTRIAL BASE"
      >
        <div className="text-center mb-32">
          <h2 className="mil-text-hero mb-12">
            THE PRIME<br/>
            <span className="text-white/20">CONTRACTORS</span>
          </h2>
          <p className="mil-text-metadata max-w-xl mx-auto leading-relaxed">
            The companies that translate American science into weapons no adversary
            can counter — and no alliance can field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {DEFENSE_CONTRACTORS.map((c, i) => (
            <div key={c.name} className="bg-black p-12 flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                <h4 className="text-2xl font-bold tracking-tight">{c.name}</h4>
                <div className="mil-text-metadata text-[8px] bg-white/5 px-3 py-1">{c.revenue}</div>
              </div>
              <div className="mil-text-metadata opacity-40 mb-8 grow">{c.specialty}</div>
              <div className="flex flex-wrap gap-2">
                {c.programs.map(prog => (
                  <span key={prog} className="mil-text-metadata text-[8px] border border-white/10 px-2 py-1">
                    {prog}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── §13  FACTS GRID ────────────────────────────────────────────────── */}
      <Section
        id="facts"
        label="CONTEXTUAL INTELLIGENCE"
      >
        <div className="text-center mb-32">
          <h2 className="mil-text-hero mb-12">
            STRATEGIC<br/>
            <span className="text-white/20">CONTEXT</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {facts.map((f, i) => (
            <div key={i} className="bg-black p-12">
              <div className="mil-text-metadata text-white/20 mb-6">[ FACT_{i+1} ]</div>
              <p className="text-white/60 leading-relaxed">
                {f.fact}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── §14  QUOTE — full-bleed cinematic ──────────────────────────────── */}
      <div className="relative min-h-[60vh] flex items-center justify-center bg-black overflow-hidden py-48">
        <div className="absolute inset-0 bg-linear-to-b from-black via-zinc-950/20 to-black opacity-60" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mil-text-label mb-16 opacity-30">◈ &nbsp; COMMAND AUTHORITY &nbsp; ◈</div>
          <blockquote className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.1] italic text-white/90 mb-16">
            &ldquo;{quote.quote}&rdquo;
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="h-16 w-px bg-white/10 mb-8" />
            <cite className="mil-text-metadata not-italic tracking-[0.5em] text-[10px] uppercase text-white/40">
              {quote.attribution} — {quote.title}
            </cite>
          </div>
        </div>
      </div>

      {/* ─── §15  CHAPTER NAVIGATION ─────────────────────────────────────────── */}
      <Section
        id="explore"
        label="THE FULL PICTURE"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: "/economy",     label: "Economy",      sub: "Financial Engine" },
            { href: "/nature",      label: "Nature",       sub: "Primal Landscape" },
            { href: "/science",     label: "Innovation",   sub: "Future Tech" },
            { href: "/history",     label: "Heritage",     sub: "Legacy of Liberty" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mil-glass p-8 group hover:bg-white/5 transition-colors"
            >
              <div className="text-xl font-bold uppercase mb-2 group-hover:translate-x-1 transition-transform">{item.label}</div>
              <div className="mil-text-metadata text-[8px] opacity-30 tracking-widest uppercase">{item.sub}</div>
            </Link>
          ))}
        </div>

        {/* Bottom classification strip */}
        <div className="mt-48 pt-12 border-t border-white/5 flex items-center justify-center gap-8">
          <div className="h-px w-24 bg-linear-to-r from-transparent to-white/10" />
          <span className="mil-text-metadata text-[8px] opacity-20 tracking-[0.5em] uppercase">
            America: The Greatest Nation · Planetary Command
          </span>
          <div className="h-px w-24 bg-linear-to-l from-transparent to-white/10" />
        </div>
      </Section>
      
      {/* Footer Spacer */}
      <div className="h-32 bg-black" />
    </div>
  );
}
