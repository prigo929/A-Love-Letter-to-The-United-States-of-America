"use client";

// ─── Military Animation Components ───────────────────────────────────────────
// All client-only interactive/animated elements for the Military section.
// Design language: defense-tech + aerospace + HUD + cinematic.
// Color palette: matte black, deep navy, graphite, steel blue, amber HUD.

import { useEffect, useRef, useState, useMemo } from "react";
import {
  motion, AnimatePresence, useScroll, useTransform,
  useInView, useMotionValue, animate,
  LayoutGroup
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";
import type { WeaponSystem, MilitaryBranch, DARPAProgram, MilitaryStat, CarrierGroupPosition, SOCOMUnit, IntelligenceAgency, AllianceData } from "@/lib/data/military-data";
import { BUDGET_DATA as SHARED_BUDGET_DATA } from "@/lib/data/military-data";
import { SITE_IMAGES } from "@/lib/site-images";
import type { Locale } from "@/lib/i18n/config";



// ─────────────────────────────────────────────────────────────────────────────
// 1.5 MilCountUp — High-performance numerical animator
// ─────────────────────────────────────────────────────────────────────────────

interface MilCountUpProps {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  color?: string;
}

export function MilCountUp({ to, duration = 2, prefix = "", suffix = "", decimals = 0, color = "white" }: MilCountUpProps) {
  const [displayValue, setDisplayValue] = useState(prefix + (0).toFixed(decimals) + suffix);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, to, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayValue(prefix + latest.toFixed(decimals) + suffix);
        },
      });
      return () => controls.stop();
    }
  }, [inView, to, duration, prefix, suffix, decimals]);

  return <span ref={ref} style={{ color }}>{displayValue}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. MilStyles — Minimalist Black-Ops Design System
// ─────────────────────────────────────────────────────────────────────────────

export function MilStyles() {
  return (
    <style jsx global>{`
      :root {
        /* ── Surface hierarchy ── */
        --mil-black: #000000;
        --mil-void: #050505;
        --mil-surface: #0a0a0a;
        --mil-elevated: #111111;
        --mil-border: rgba(255,255,255,0.06);

        /* ── Accent system — surgical, never decorative ── */
        --mil-accent: #E8E8E8;
        --mil-accent-warm: #F5A623;
        --mil-accent-cold: #7DD3FC;

        /* ── Legacy compat ── */
        --color-black: #000000;
        --color-graphite: #0a0a0a;
        --color-steel: #1a1a1a;
        --color-accent: #ffffff;
        --font-mono: 'Space Mono', 'Courier', monospace;
      }

      body {
        background-color: var(--mil-black);
        color: white;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* ── Typography — Apple Keynote grade ── */

      .mil-text-display {
        font-family: var(--font-archivo);
        font-size: clamp(80px, 15vw, 240px);
        font-weight: 200;
        line-height: 0.85;
        letter-spacing: -0.05em;
        text-transform: uppercase;
      }

      .mil-text-hero {
        font-family: var(--font-archivo);
        font-size: clamp(38px, 12vw, 180px);
        font-weight: 900;
        line-height: 1.0;
        letter-spacing: -0.02em;
        text-transform: uppercase;
      }

      .mil-text-section {
        font-family: var(--font-archivo);
        font-size: clamp(48px, 8vw, 120px);
        font-weight: 900;
        line-height: 1.05;
        letter-spacing: -0.02em;
        text-transform: uppercase;
      }

      .mil-text-heading {
        font-family: var(--font-archivo);
        font-size: clamp(28px, 4vw, 56px);
        font-weight: 800;
        line-height: 1;
        letter-spacing: -0.02em;
        text-transform: uppercase;
      }

      .mil-text-body {
        font-family: var(--font-body, 'Inter', system-ui, sans-serif);
        font-size: clamp(14px, 1.2vw, 18px);
        line-height: 1.8;
        letter-spacing: 0.02em;
        word-spacing: 0.04em;
        color: rgba(255,255,255,0.8);
      }

      .mil-text-label {
        font-family: var(--font-hero);
        font-size: clamp(12px, 2.5vw, 16px);
        font-weight: 900;
        letter-spacing: clamp(0.15em, 1.5vw, 0.35em);
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.9);
      }

      .mil-text-metadata {
        font-family: var(--font-mono);
        font-size: 14px;
        font-weight: 800;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.85);
      }

      /* ── Surfaces ── */

      .mil-glass {
        background: rgba(10, 10, 10, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.05);
      }

      .mil-glass-premium {
        background: rgba(8, 8, 8, 0.85);
        backdrop-filter: blur(40px) saturate(1.2);
        -webkit-backdrop-filter: blur(40px) saturate(1.2);
        border: 1px solid rgba(255,255,255,0.06);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.015'/%3E%3C/svg%3E");
      }

      .mil-gradient-border {
        position: relative;
      }
      .mil-gradient-border::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 1px;
        background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02), rgba(255,255,255,0.06));
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
      }

      /* ── Backgrounds ── */

      .mil-dot-canvas {
        background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
        background-size: 24px 24px;
      }

      .mil-vignette::after {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%);
        pointer-events: none;
      }

      .mil-noise {
        position: relative;
      }
      .mil-noise::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E");
        pointer-events: none;
        z-index: 1;
      }

      /* ── Animations ── */
      @keyframes mk-ken {
        0% { transform: scale(1); }
        100% { transform: scale(1.08) translate(-1%, -1%); }
      }
      .mk-ken { animation: mk-ken 24s ease-in-out infinite alternate; }

      @keyframes mil-breathe {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }
      .mil-breathe { animation: mil-breathe 3s ease-in-out infinite; }

      @keyframes mil-pulse-ring {
        0% { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(2.5); opacity: 0; }
      }

      .mil-nav-card {
        transition: border-color 0.25s ease, background-color 0.25s ease;
      }
    `}</style>
  );
}

// Gimmicky HUD components are removed to maintain the minimalist Black-Ops aesthetic.
export function HUDGrid() { return null; }
export function RadarPing() { return null; }
export function HUDCorners() { return null; }
export function GrainOverlay() { return null; }
export function ScanLine() { return null; }

// ─────────────────────────────────────────────────────────────────────────────
// 3. MinimalistStat — ultra-thin numerical display (Tesla spec-page inspired)
// ─────────────────────────────────────────────────────────────────────────────

interface MinimalistStatProps {
  stat: MilitaryStat;
  index?: number;
}

export function MinimalistStat({ stat, index = 0 }: MinimalistStatProps) {
  const { value, suffix = "", prefix = "", decimals = 0, label, sublabel } = stat;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col px-8 py-12"
    >
      <div className="mil-text-metadata mb-6 tracking-[0.3em] font-black text-white">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className="text-[clamp(48px,7vw,96px)] font-extralight tracking-tighter leading-none">
          <MilCountUp to={value} prefix={prefix} suffix={suffix} decimals={decimals} color="white" />
        </span>
      </div>
      {/* Gradient divider */}
      <div className="mt-6 mb-4 h-px w-full" style={{
        background: 'linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.05), transparent)'
      }} />
      <div className="mil-text-metadata max-w-[240px] leading-relaxed opacity-60 text-[11px] font-medium tracking-wide">
        {sublabel}
      </div>
    </motion.div>
  );
}

// Rename the export for backward compatibility during refactor if needed, 
// but we'll update page.tsx soon.
export { MinimalistStat as HUDCounter };

// ─────────────────────────────────────────────────────────────────────────────
// 4. WeaponSystemCard — compact grid card with fullscreen dossier overlay
// ─────────────────────────────────────────────────────────────────────────────

export function WeaponSystemCard({ system, index = 0, locale = 'en' }: { system: WeaponSystem; index?: number; locale?: Locale }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { 
      document.body.style.overflow = ''; 
    };
  }, [isExpanded]);

  return (
    <>
      {/* Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setIsExpanded(true)}
        className="group relative cursor-pointer bg-[#0a0a0a] border border-white/6 hover:border-white/12 transition-all duration-500 overflow-hidden"
      >
        <div className="relative h-[220px] overflow-hidden">
          <Image
            src={system.imageSrc}
            alt={system.imageAlt}
            fill
            className="object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-black/30 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="mil-text-metadata text-[7px] tracking-[0.4em] bg-black/50 backdrop-blur-sm px-2 py-1">{system.designation}</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: system.accentColor || 'white' }}
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="mil-text-metadata text-[10px] tracking-[0.3em] font-black">{system.category}</span>
            {system.stealth && <span className="mil-text-metadata text-[9px] border border-white/10 px-1.5 py-0.5 text-white/80 font-bold">STEALTH</span>}
          </div>
          <h3 className="text-xl font-black tracking-tighter uppercase leading-tight mb-2">{system.name}</h3>
          <p className="text-white/60 text-xs leading-relaxed mb-4 line-clamp-2">{system.tagline || system.description.split('.')[0] + '.'}</p>
          <div className="flex gap-2 mb-4">
            {system.specs.slice(0, 2).map((spec, i) => (
              <div key={i} className="border border-white/10 bg-white/4 px-3 py-1.5 flex-1">
                <div className="mil-text-metadata text-[9px] tracking-[0.2em] opacity-80 mb-0.5 font-bold">{spec.label}</div>
                <div className="text-[12px] font-black tracking-tight text-white/90">{spec.value}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            {system.heroStat && (
              <span className="text-lg font-black tracking-tighter" style={{ color: system.accentColor || 'white' }}>{system.heroStat}</span>
            )}
            <span className="mil-text-metadata text-[10px] tracking-[0.3em] font-black group-hover:text-white transition-colors">DOSSIER →</span>
          </div>
        </div>
      </motion.div>

      {/* Expanded Dossier Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8" onClick={() => setIsExpanded(false)}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-5xl max-h-[90dvh] overflow-y-auto bg-[#0a0a0a] border border-white/6 no-scrollbar"
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
            >
              <div className="sticky -top-px z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-[#0a0a0a] border-b border-white/6">
                <span className="mil-text-metadata tracking-[0.3em]">{locale === 'ro' ? 'DOSAR ACTIV' : 'ASSET DOSSIER'}</span>
                <button onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }} className="mil-text-metadata hover:text-white transition-colors tracking-[0.2em]">
                  {locale === 'ro' ? '[ ÎNCHIDE ]' : '[ CLOSE ]'}
                </button>
              </div>
              <div className="relative w-full h-[35dvh] md:h-[45dvh] overflow-hidden">
                <Image src={system.imageSrc} alt={system.imageAlt} fill className="object-cover" priority sizes="100vw" />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-black/30 to-transparent" />
                <div className="absolute bottom-8 left-6 md:left-12">
                  <p className="mil-text-metadata mb-3 tracking-[0.3em]">{system.designation}</p>
                  <h3 className="text-[clamp(28px,4vw,52px)] font-black tracking-tighter uppercase leading-none">{system.name}</h3>
                </div>
              </div>
              <div className="px-6 md:px-12 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-12">
                  <div>
                    <p className="text-base text-white/60 leading-relaxed mb-10">{system.description}</p>
                    <div className="pl-5 border-l-2" style={{ borderColor: system.accentColor || 'rgba(255,255,255,0.15)' }}>
                      <div className="mil-text-metadata mb-3 tracking-[0.3em]">{locale === 'ro' ? 'SEMNIFICAȚIE STRATEGICĂ' : 'STRATEGIC SIGNIFICANCE'}</div>
                      <p className="text-sm text-white/55 leading-relaxed">{system.significance}</p>
                    </div>
                  </div>
                  <div className="hidden lg:block bg-white/6" />
                  <div>
                    <div className="mil-text-metadata mb-6 tracking-[0.3em]">{locale === 'ro' ? 'SPECIFICAȚII TEHNICE' : 'TECHNICAL SPECIFICATIONS'}</div>
                    {system.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between items-baseline py-3 border-b border-white/6">
                        <span className="mil-text-metadata text-[8px] tracking-[0.2em] opacity-60">{spec.label}</span>
                        <span className="text-sm font-semibold tracking-tight text-white/80">{spec.value}</span>
                      </div>
                    ))}
                    <div className="mt-10 grid grid-cols-2 gap-3">
                      {system.speed && (
                        <div className="bg-white/3 border border-white/6 p-4">
                          <div className="mil-text-metadata text-[7px] mb-1 opacity-60">SPEED</div>
                          <div className="text-lg font-bold tracking-tight">{system.speed}</div>
                        </div>
                      )}
                      {system.range && (
                        <div className="bg-white/3 border border-white/6 p-4">
                          <div className="mil-text-metadata text-[7px] mb-1 opacity-60">RANGE</div>
                          <div className="text-lg font-bold tracking-tight">{system.range}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// 5. BranchSelector — vertical sidebar + fullscreen image (Linear-inspired)
// ─────────────────────────────────────────────────────────────────────────────

export function BranchSelector({ branches, locale = 'en' }: { branches: MilitaryBranch[]; locale?: Locale }) {
  const [active, setActive] = useState(0);
  const branch = branches[active];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] min-h-[600px] md:min-h-[700px] border border-white/4 bg-[#050505]">
      {/* Vertical sidebar */}
      <div className="flex md:flex-col md:h-full border-b md:border-b-0 md:border-r border-white/4 overflow-x-auto md:overflow-visible">
        {branches.map((b, i) => (
          <button
            key={b.id}
            onClick={() => setActive(i)}
            className={cn(
              "relative flex shrink-0 md:shrink items-center gap-3 px-6 py-4 md:py-5 text-left transition-all duration-300 md:flex-1",
              i === active
                ? "text-white bg-white/3"
                : "text-white/20 hover:text-white/40"
            )}
          >
            {/* Active indicator bar */}
            {i === active && (
              <motion.div
                layoutId="branch-indicator"
                className="absolute left-0 top-0 hidden md:block w-[2px] h-full"
                style={{ background: branch.accentColor }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="mil-text-metadata text-[9px] tracking-[0.25em]">{b.shortName}</span>
          </button>
        ))}
      </div>

      {/* Image + overlay content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={branch.imageSrc}
              alt={branch.imageAlt}
              fill
              quality={85}
              className="object-cover"
              sizes="(max-width:768px) 100vw, 75vw"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content overlay */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12"
          >
            <div className="max-w-xl">
              <p className="mil-text-metadata mb-2 tracking-[0.3em]">
                {locale === 'ro' ? 'FOND.' : 'EST.'} {branch.founded} · {branch.personnel}
              </p>
              <h3 className="text-[clamp(28px,4vw,48px)] font-black uppercase tracking-tighter text-white mb-2 leading-none">
                {branch.name}
              </h3>
              <p className="mil-text-metadata italic opacity-60 mb-6">&ldquo;{branch.tagline}&rdquo;</p>
              <p className="text-sm leading-relaxed text-white/60 mb-8">{branch.description}</p>

              {branch.href && (
                <Link
                  href={branch.href}
                  className="mb-8 inline-flex h-11 items-center justify-center border border-white/15 bg-white px-5 text-xs font-bold uppercase text-black transition-colors hover:bg-white/85"
                >
                  {locale === "ro" ? "Exploreaza ramura" : `Explore ${branch.shortName}`}
                </Link>
              )}

              {/* Key facts */}
              <div className="space-y-2">
                {branch.keyFacts.map((fact, i) => (
                  <motion.div
                    key={`${active}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    className="flex gap-3 border-l-2 pl-4 py-1"
                    style={{ borderColor: `${branch.accentColor}40` }}
                  >
                    <p className="text-xs leading-snug text-white/55">{fact}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. DARPAProgramGrid — DARPA future systems bento grid (Vercel-inspired)
// ─────────────────────────────────────────────────────────────────────────────

export function DARPAProgramGrid({ programs, locale = 'en' }: { programs: DARPAProgram[]; locale?: Locale }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProgram = programs.find(p => p.id === selectedId);

  // Lock body scroll when expanded
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { 
      document.body.style.overflow = ''; 
    };
  }, [selectedId]);

  return (
    <>
      <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3 bg-white/2">
        {programs.map((program, idx) => (
          <div
            key={program.id}
            onClick={() => setSelectedId(program.id)}
            className={cn(
              "group cursor-pointer bg-[#0a0a0a] p-8 md:p-10 transition-all duration-500",
              "hover:bg-[#0f0f0f]",
              "relative mil-gradient-border",
              idx === 0 && "sm:col-span-2 sm:row-span-2"
            )}
          >
            {/* Featured card gradient bg */}
            {idx === 0 && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'radial-gradient(ellipse at 30% 50%, rgba(125,211,252,0.03) 0%, transparent 60%)'
                }}
              />
            )}
            
            <div className="relative z-10">
              {/* Category dot + label */}
              <div className="flex items-center gap-2 mb-6">
                <div className="h-1.5 w-1.5 rounded-full" style={{
                  background: program.status === 'active' ? '#F5A623' : program.status === 'testing' ? '#7DD3FC' : '#555'
                }} />
                <span className="mil-text-metadata text-[10px] tracking-[0.3em] opacity-80 font-bold">{program.category}</span>
              </div>

              <h3 
                className={cn(
                  "font-bold uppercase tracking-tight mb-3",
                  idx === 0 ? "text-2xl md:text-3xl" : "text-lg"
                )}
              >
                {program.name}
              </h3>

              {idx === 0 && (
                <p className="text-sm text-white/55 leading-relaxed max-w-lg mb-6">
                  {program.description.slice(0, 150)}...
                </p>
              )}

              <div className="flex items-center gap-2 mt-auto">
                <span className="mil-text-metadata text-[8px] tracking-[0.2em] opacity-55">{program.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedProgram && (
          <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-2xl max-h-[80dvh] overflow-y-auto bg-[#0a0a0a] border border-white/8 no-scrollbar"
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
            >
              <div className="sticky -top-px z-50 flex justify-between items-center px-8 md:px-12 py-5 bg-[#0a0a0a] border-b border-white/6">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{
                    background: selectedProgram.status === 'active' ? '#F5A623' : '#7DD3FC'
                  }} />
                  <span className="mil-text-metadata text-[8px] tracking-[0.3em]">{selectedProgram.category}</span>
                </div>
                <button onClick={() => setSelectedId(null)} className="mil-text-metadata hover:text-white transition-colors tracking-[0.2em]">
                  {locale === 'ro' ? '[ ÎNCHIDE ]' : '[ CLOSE ]'}
                </button>
              </div>

              <div className="p-8 md:p-12">
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-8">{selectedProgram.name}</h3>
              
              <div className="space-y-8">
                <p className="text-lg text-white/60 leading-relaxed">
                  {selectedProgram.description}
                </p>

                <div className="pl-6 border-l border-white/8">
                  <div className="mil-text-metadata mb-4 tracking-[0.3em] opacity-70">
                    {locale === 'ro' ? 'SEMNIFICAȚIE STRATEGICĂ' : 'STRATEGIC SIGNIFICANCE'}
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {selectedProgram.significance}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-white mil-breathe" />
                  <span className="mil-text-metadata tracking-[0.2em]">{selectedProgram.status.toUpperCase()} {locale === 'ro' ? 'FAZA DE DEZVOLTARE' : 'DEVELOPMENT PHASE'}</span>
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. NuclearTriadDiagram — interactive triad visualization
// ─────────────────────────────────────────────────────────────────────────────

interface TriadLeg {
  name: string; systems: string; warheads: string;
  alert: string; advantage: string; color: string;
}

export function NuclearTriadDiagram({ triad, locale = 'en' }: { triad: { legs: TriadLeg[]; description: string }; locale?: Locale }) {
  const { legs, description } = triad;
  const isRo = locale === 'ro';

  return (
    <div className="space-y-6 w-full">
      {/* Strategic Thesis Panel */}
      <div className="mil-glass-premium p-6 md:p-8 relative border-l border-white/20">
        <div className="mil-text-metadata text-[9px] tracking-[0.3em] text-white/40 mb-3 uppercase">
          {isRo ? "DOCTRINĂ DE DESCURAJARE STRATEGICĂ" : "STRATEGIC DETERRENCE DOCTRINE"}
        </div>
        <p className="font-body text-xs md:text-sm leading-relaxed text-white/70">
          {description}
        </p>
      </div>

      {/* Triad Legs List */}
      <div className="space-y-4">
        {legs.map((leg, idx) => (
          <div 
            key={idx} 
            className="bg-[#050505] border border-white/5 p-6 hover:border-white/10 transition-colors duration-350"
          >
            {/* Header row */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="w-1 h-5 block" style={{ backgroundColor: leg.color }} />
                <h4 className="text-md font-bold uppercase tracking-tight text-white">{leg.name}</h4>
              </div>
              <span className="mil-text-metadata text-[8px] tracking-[0.2em] opacity-40">
                {idx === 0 ? (isRo ? "TERESTRU" : "TERRESTRIAL") : idx === 1 ? (isRo ? "MARITIM" : "MARITIME") : (isRo ? "AERIAN" : "AEROSPACE")}
              </span>
            </div>

            {/* Technical Parameters Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="mil-text-metadata text-[8px] tracking-widest text-white/30 mb-0.5">
                  {isRo ? "SISTEME" : "SYSTEMS"}
                </p>
                <p className="font-mono text-[11px] font-semibold text-white/80 leading-tight">{leg.systems}</p>
              </div>
              <div>
                <p className="mil-text-metadata text-[8px] tracking-widest text-white/30 mb-0.5">
                  {isRo ? "FOCOASE" : "WARHEADS"}
                </p>
                <p className="font-mono text-[11px] font-semibold text-white/80 leading-tight">{leg.warheads}</p>
              </div>
              <div>
                <p className="mil-text-metadata text-[8px] tracking-widest text-white/30 mb-0.5">
                  {isRo ? "ALERTĂ" : "ALERT STATUS"}
                </p>
                <p className="font-mono text-[11px] font-semibold text-white/80 leading-tight">{leg.alert}</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="mil-text-metadata text-[8px] tracking-widest text-white/30 mb-0.5">
                  {isRo ? "AVANTAJ CHEIE" : "KEY ADVANTAGE"}
                </p>
                <p className="font-body text-[11px] leading-snug text-white/70">{leg.advantage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. GlobalCarrierMap — simplified carrier positions visualization
// ─────────────────────────────────────────────────────────────────────────────

interface CarrierPos {
  id: string; ship: string; region: string;
  cx: number; cy: number;
  status: "deployed" | "transit" | "homeport";
}

export function GlobalCarrierMap({ positions, locale = 'en' }: { positions: CarrierGroupPosition[]; locale?: Locale }) {
  const [hovered, setHovered] = useState<string | null>(null);
  
  // Calculate jitter for overlapping carriers to ensure visibility in crowded areas (e.g. Norfolk, San Diego)
  const localizedCarriers = useMemo(() => {
    const threshold = 5.0; // Tighter grouping threshold
    const groups: CarrierGroupPosition[][] = [];
    
    // Group carriers that are visually too close to each other
    positions.forEach(c => {
      let foundGroup = false;
      for (const group of groups) {
        const leader = group[0];
        const dx = c.cx - leader.cx;
        const dy = c.cy - leader.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < threshold) {
          group.push(c);
          foundGroup = true;
          break;
        }
      }
      if (!foundGroup) groups.push([c]);
    });

    // Flatten groups and apply circular offset to those with multiple members
    return groups.flatMap(group => {
      if (group.length === 1) return group;
      
      // Use the average center of the group for the distribution
      const avgCx = group.reduce((sum, c) => sum + c.cx, 0) / group.length;
      const avgCy = group.reduce((sum, c) => sum + c.cy, 0) / group.length;
      
      const distRadius = 1.5; // Aggressive "snap" to make them overlap tightly
      return group.map((c, i) => {
        const angle = (i / group.length) * Math.PI * 2 - Math.PI / 2;
        return {
          ...c,
          cx: avgCx + Math.cos(angle) * distRadius,
          cy: avgCy + Math.sin(angle) * distRadius,
        };
      });
    });
  }, [positions]);

  const carriers = localizedCarriers;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#04080F]">
      {/* Map background — high-fidelity tactical SVG */}
      <div className="relative" style={{ paddingBottom: "48.25%" }}>
        <div className="absolute inset-0">
          <Image
            src={SITE_IMAGES.military.tacticalMap}
            alt="Global tactical map"
            fill
            className="object-contain opacity-20 grayscale"
            style={{ filter: "brightness(0.5) invert(1)" }}
          />
          
          {/* Simplified world map grid (faded) */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 60% at 25% 40%, rgba(30,111,191,0.04) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 75% 35%, rgba(30,111,191,0.03) 0%, transparent 60%)
            `,
          }} />

          {/* Grid */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "8% 10%",
          }} />

          {/* Carrier dots */}
          <svg 
            viewBox="0 0 201 97" 
            className="absolute inset-0 w-full h-full" 
            preserveAspectRatio="none"
            role="img"
            aria-label="Global map showing approximate positions of U.S. Navy Carrier Strike Groups"
          >
            {/* Carrier group positions */}
             {carriers.map((c) => (
               <g key={c.id} className="cursor-pointer">

                {/* Precise Shield-shaped hit area (Contracted to 6x8 for tighter feel) */}
                <path 
                  d="M -3,-3.5 L 3,-3.5 L 3,0.5 Q 3,3.5 0,4.5 Q -3,3.5 -3,0.5 Z" 
                  transform={`translate(${c.cx}, ${c.cy})`}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHovered(c.id)}
                  onMouseLeave={() => setHovered(null)}
                />

                {/* Carrier Logo Group (Visuals only) */}
                <g 
                  transform={`translate(${c.cx}, ${c.cy}) scale(${hovered === c.id ? 1.2 : 1})`} 
                  opacity={hovered === c.id ? 1 : 0.85}
                  style={{ transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)", pointerEvents: "none" }}
                >
                   <image 
                     href={SITE_IMAGES.military.carrierLogo}
                     x={-5}
                     y={-5}
                     width={10}
                     height={10}
                     style={{ 
                       filter: c.status === "homeport" 
                         ? `drop-shadow(0 0 ${hovered === c.id ? '6px' : '3px'} rgba(96,165,250,0.8))` 
                         : `drop-shadow(0 0 ${hovered === c.id ? '6px' : '3px'} rgba(245,158,11,0.8))`
                     }}
                   />
                </g>
              </g>
            ))}
          </svg>

          {/* Tooltip */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute bottom-4 left-4 rounded-lg border border-[rgba(245,158,11,0.3)] bg-[rgba(4,8,15,0.95)] px-4 py-3 backdrop-blur-sm"
              >
                {carriers.filter(c => c.id === hovered).map(c => (
                  <div key={c.id}>
                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-[#F59E0B] mb-1">
                      {locale === 'ro' ? 'POZIȚIE CSG' : 'CSG POSITION'}
                    </p>
                    <p className="font-mono text-sm font-black text-white">{c.ship}</p>
                    <p className="font-mono text-[11px] font-bold text-white/60">{c.region}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between border-t border-white/8 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-10">
             <Image 
               src={SITE_IMAGES.military.carrierLogo} 
               alt="Carrier Logo" 
               fill 
               sizes="40px"
               className="object-contain scale-[2.4] pointer-events-none"
             />
          </div>
          <p className="font-mono text-[12px] font-black uppercase tracking-[0.3em] text-white/70">
            {locale === 'ro' ? 'Grup de Atac Portavion' : 'Carrier Strike Group'}
          </p>
        </div>
        <p className="font-mono text-[11px] font-bold text-white/30 uppercase tracking-widest">
          {locale === 'ro' ? 'POZIȚII GLOBALE APROXIMATIVE' : 'APPROXIMATE GLOBAL POSITIONS'}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. ParallaxMilitaryHero — 3-stage cinematic reveal (Apple Keynote-grade)
// ─────────────────────────────────────────────────────────────────────────────

export function ParallaxMilitaryHero({
  imageSrc, imageAlt, videoSrc, title, subtitle, tagline, stats, heightClass = "h-[180dvh]"
}: { 
  imageSrc: string; 
  imageAlt: string; 
  videoSrc?: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
  stats?: { value: string; label: string }[];
  heightClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch((err) => {
        console.warn("Autoplay block in ParallaxMilitaryHero:", err);
      });
    }
  }, [videoSrc]);

  // 3-stage scroll reveal:
  // Stage 1 (0–30vh): Image fades from 0% to 30% opacity
  // Stage 2 (30–60vh): Text appears, image stabilizes
  // Stage 3 (60–100vh): Image zooms to 120%, text fades + blurs
  // Content is sharp and visible at start, then fades/blurs as we scroll away
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [0.35, 0.05]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.0, 1.2]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageBlur = useTransform(scrollYProgress, [0, 0.5], [0, 15]);

  // Text animations
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  return (
    <div ref={ref} className={cn("relative bg-black", heightClass)}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden mil-noise">
        {/* Background media with 3-stage reveal */}
        <motion.div 
          className="absolute inset-0 will-change-transform"
          style={{ 
            opacity: imageOpacity, 
            filter: useTransform(imageBlur, (v) => `blur(${v}px)`),
            scale: imageScale,
            y: imageY
          }}
        >
          {videoSrc ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              className="object-cover brightness-[0.4] grayscale-[0.3]"
              sizes="100vw"
              quality={90}
            />
          )}
        </motion.div>

        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/50 pointer-events-none" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)'
        }} />

        {/* Content Overlay */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.2 }
            }
          }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-28 pb-16 text-center md:pt-0 md:pb-0"
          style={{ opacity: textOpacity, y: textY }}
        >
          {/* Tagline */}
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="mil-text-label mb-8 tracking-[0.2em] md:tracking-[0.5em]"
          >
            {tagline}
          </motion.p>
          
          {/* Title - Nature-style reveal */}
          <div className="overflow-hidden">
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.19, 1, 0.22, 1] } }
              }}
              className="mil-text-hero"
            >
              {title}
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 0.85, y: 0, transition: { duration: 0.8 } }
            }}
            className="mil-text-metadata mt-12 max-w-2xl font-bold tracking-[0.3em] leading-relaxed uppercase"
          >
            {subtitle}
          </motion.p>

          {/* Stats Strip */}
          {stats && (
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
              }}
              className="mt-20 flex flex-wrap justify-center gap-x-14 gap-y-6"
            >
              {stats.map((s, i) => (
                <div key={i} className="text-center group">
                  <div className="mil-text-metadata mb-2 font-black uppercase tracking-widest text-[11px] text-white/50">{s.label}</div>
                  <div className="text-2xl md:text-3xl font-black tracking-tight text-white/90">{s.value}</div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VideoMilitaryHero — cinematic looping video hero (B-2 Spirit / Air Force)
// ─────────────────────────────────────────────────────────────────────────────

export function VideoMilitaryHero({
  videoSrc, title, subtitle, tagline, stats
}: {
  videoSrc: string;
  posterSrc?: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
  stats?: { value: string; label: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch((err) => {
        console.warn("Autoplay block in VideoMilitaryHero:", err);
      });
    }
  }, [videoSrc]);

  const videoOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const videoScale  = useTransform(scrollYProgress, [0, 0.55], [1.0, 1.18]);
  const videoY      = useTransform(scrollYProgress, [0, 1],    ["0%", "22%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  return (
    <div ref={ref} className="relative h-[180dvh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden mil-noise">
        {/* ── Looping video layer ── */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ opacity: videoOpacity, scale: videoScale, y: videoY }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-[center_40%] object-cover brightness-[0.48] saturate-[0.75] scale-[1.15] md:scale-100 md:object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </motion.div>

        {/* ── Cinematic vignette ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/55 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.75) 100%)" }}
        />

        {/* ── Content ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-28 pb-16 text-center md:pt-0 md:pb-0"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="mil-text-label mb-8 tracking-[0.2em] md:tracking-[0.5em]"
          >
            {tagline}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.19, 1, 0.22, 1] } } }}
              className="mil-text-hero"
            >
              {title}
            </motion.h1>
          </div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 0.85, y: 0, transition: { duration: 0.8 } } }}
            className="mil-text-metadata mt-12 max-w-2xl font-bold tracking-[0.3em] leading-relaxed uppercase"
          >
            {subtitle}
          </motion.p>

          {stats && (
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
              className="mt-20 flex flex-wrap justify-center gap-x-14 gap-y-6"
            >
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="mil-text-metadata mb-2 font-black uppercase tracking-widest text-[11px] text-white/50">{s.label}</div>
                  <div className="text-2xl md:text-3xl font-black tracking-tight text-white/90">{s.value}</div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. BudgetComparisonBar — animated defense budget comparison
// ─────────────────────────────────────────────────────────────────────────────

export function BudgetComparisonBar({ 
  data = SHARED_BUDGET_DATA, 
  label,
  locale = 'en'
}: { 
  data?: any[]; 
  label?: string; 
  locale?: Locale;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isRo = locale === 'ro';

  const defaultLabel = isRo 
    ? "Bugetul de Apărare (miliarde USD, 2025)" 
    : "Defense Budget (USD Billion, 2025)";
  
  const displayLabel = label || defaultLabel;

  // Next 10 nations combined calculation
  const usBudget = 954;
  const nextTenBudget = 925;
  const nextTenPCT = (nextTenBudget / usBudget) * 100;

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-white/5 bg-[#030303] p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 items-start">
        {/* Left Panel: The US Dominance Stack */}
        <div className="space-y-8">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/60 uppercase block mb-2">
              {isRo ? "VERIFICAT · SIPRI 2025" : "VERIFIED · SIPRI 2025"}
            </span>
            <h4 className="text-2xl font-black tracking-tight text-white mb-3">
              {isRo ? "COMPARAȚIE BUGET APĂRARE" : "DEFENSE BUDGET COMPARISON"}
            </h4>
            <div className="text-[11px] font-mono font-bold text-white/80 mb-4 tracking-wide uppercase flex items-center gap-1.5">
              <span>◈</span>
              <span>{isRo ? "S.U.A. CHELTUIESC MAI MULT DECÂT URMĂTOARELE ZECE NAȚIUNI COMBINATE" : "U.S. OUTSPENDS THE NEXT TEN NATIONS COMBINED"}</span>
            </div>
            <p className="text-[13px] leading-relaxed text-white/65 max-w-lg mt-3">
              {isRo
                ? "Statele Unite investesc în securitate mai mult decât următoarele zece puteri militare globale la un loc. Această superioritate bugetară susține o infrastructură operațională globală de neegalat."
                : "The United States defense investment outpaces the combined spending of the next ten global military powers. This massive resource scale funds unparalleled worldwide force projection."}
            </p>
          </div>

          {/* Big Stat display */}
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-lg space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-white/40 block uppercase">
                  {isRo ? "BUGET SUA 2025" : "U.S. BUDGET FY2025"}
                </span>
                <span className="text-4xl font-extrabold tracking-tighter text-white block mt-1">
                  $954B
                </span>
              </div>
              <div className="hidden md:block h-8 w-px bg-white/10" />
              <div>
                <span className="text-[10px] font-mono tracking-widest text-white/40 block uppercase">
                  {isRo ? "URMĂTOARELE 10 COMBINATE" : "NEXT 10 NATIONS COMBINED"}
                </span>
                <span className="text-4xl font-extrabold tracking-tighter text-white/60 block mt-1">
                  $925B
                </span>
              </div>
            </div>

            {/* Visual comparative bars */}
            <div className="space-y-4 pt-2 border-t border-white/5">
              {/* United States Bar */}
              <div>
                <div className="flex justify-between items-center text-[10px] font-mono mb-1.5">
                  <span className="font-bold text-white tracking-wider flex items-center gap-1.5">
                    🇺🇸 {isRo ? "STATELE UNITE" : "UNITED STATES"}
                  </span>
                  <span className="text-white font-bold">$954B</span>
                </div>
                <div className="h-2.5 rounded bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded bg-white"
                    initial={{ width: 0 }}
                    animate={inView ? { width: "100%" } : { width: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      boxShadow: "0 0 10px rgba(255,255,255,0.15)"
                    }}
                  />
                </div>
              </div>

              {/* Combined Next 10 Bar */}
              <div>
                <div className="flex justify-between items-center text-[10px] font-mono mb-1.5">
                  <span className="text-white/50 tracking-wider">
                    {isRo ? "URMĂTOARELE 10 NAȚIUNI COMBINATE" : "NEXT 10 NATIONS COMBINED"}
                  </span>
                  <span className="text-white/50">$925B</span>
                </div>
                <div className="h-2.5 rounded bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded bg-white/30"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${nextTenPCT}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </div>

            <div className="text-[8px] font-mono text-white/30 leading-relaxed pt-1">
              * {isRo
                ? "Următoarele 10 națiuni includ: China, Rusia, India, Arabia Saudită, Marea Britanie, Germania, Franța, Japonia, Coreea de Sud și Ucraina."
                : "Next 10 nations include: China, Russia, India, Saudi Arabia, United Kingdom, Germany, France, Japan, South Korea, and Ukraine."}
            </div>
          </div>
        </div>

        {/* Right Panel: Individual Budget Breakdown */}
        <div className="space-y-6">
          <p className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase block mb-1">
            {isRo ? "IERARHIA GLOBALĂ A CHELTUIELILOR" : "GLOBAL SPENDING BREAKDOWN"}
          </p>

          <div className="space-y-4">
            {data.map((row, i) => {
              const isUS = row.country.includes("United States") || row.country.includes("Statele Unite");
              const pct = (row.budget / usBudget) * 100;
              const isHovered = hoveredIndex === i;

              return (
                <div 
                  key={row.country}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative transition-all duration-200"
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">{row.flag}</span>
                      <span className={cn(
                        "font-mono text-[11px] uppercase tracking-wide transition-colors",
                        isUS 
                          ? "text-white font-bold" 
                          : isHovered ? "text-white" : "text-white/50"
                      )}>
                        {row.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      {isHovered && !isUS && (
                        <span className="text-[9px] text-white/30 mr-1.5">
                          ({pct.toFixed(1)}% {isRo ? "din SUA" : "of U.S."})
                        </span>
                      )}
                      <span className={cn(
                        "transition-colors",
                        isUS 
                          ? "text-white font-bold" 
                          : isHovered ? "text-white" : "text-white/40"
                      )}>
                        ${row.budget}B
                      </span>
                    </div>
                  </div>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className={cn(
                        "h-full rounded-full transition-all duration-200",
                        isUS 
                          ? "bg-white" 
                          : isHovered ? "bg-white/40" : "bg-white/15"
                      )}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${pct}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/5 flex justify-between items-center font-mono text-[8px] text-white/30 uppercase tracking-widest">
            <span>VERIFIED · SIPRI 2025</span>
            <span>SOURCE: SIPRI EXPENDITURES DATABASE</span>
          </div>
        </div>
      </div>
    </div>
  );
}



// ─────────────────────────────────────────────────────────────────────────────
// 15. ParticleCanvas — cinematic background particles
// ─────────────────────────────────────────────────────────────────────────────

export function ParticleCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/20"
          initial={{ 
            x: `${Math.random() * 100}%`, 
            y: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5
          }}
          animate={{ 
            y: ["-10%", "110%"],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 10 + Math.random() * 20, 
            repeat: Infinity, 
            delay: Math.random() * 10,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

// ─── Global Alliances Showcase Component ──────────────────────────────────────

export function AlliancesShowcase({ alliances, locale = "en" }: { alliances: AllianceData[]; locale?: Locale }) {
  const isRo = locale === "ro";
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      {alliances.map((alliance, index) => (
        <motion.div
          key={alliance.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mil-glass p-8 md:p-12 relative flex flex-col h-full overflow-hidden"
        >
          {/* Subtle background glow */}
          <div 
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none" 
            style={{ backgroundColor: alliance.accentColor }} 
          />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="mil-text-metadata text-[10px] tracking-[0.3em] font-black" style={{ color: alliance.accentColor }}>
                  {isRo ? "ALIANȚĂ STRATEGICĂ" : "STRATEGIC ALLIANCE"}
                </span>
                <h3 className="text-3xl font-black tracking-tighter uppercase mt-2">{alliance.name}</h3>
              </div>
              <span className="text-4xl font-extrabold opacity-15 font-mono">{alliance.shortName}</span>
            </div>

            <div className="h-px w-full bg-white/5 mb-6" />

            <p className="text-sm text-white/70 leading-relaxed mb-8">{alliance.description}</p>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {alliance.metrics.map((metric, idx) => (
                <div key={idx} className="bg-white/3 border border-white/5 p-4 flex flex-col justify-between">
                  <span className="mil-text-metadata text-[8px] tracking-[0.2em] opacity-40 mb-1">{metric.label}</span>
                  <span className="text-xs md:text-sm font-bold tracking-tight text-white/90">{metric.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto space-y-3">
              <h4 className="mil-text-metadata text-[10px] tracking-[0.2em] font-black opacity-80">
                {isRo ? "CAPABILITĂȚI INTEGRATE" : "INTEGRATED CAPABILITIES"}
              </h4>
              <div className="space-y-2">
                {alliance.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex gap-3 border-l pl-4 py-1" style={{ borderColor: alliance.accentColor + "40" }}>
                    <p className="text-xs text-white/55 leading-relaxed">{cap}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Special Operations Grid Component ────────────────────────────────────────

export function SOCOMGrid({ units, locale = "en" }: { units: SOCOMUnit[]; locale?: Locale }) {
  const isRo = locale === "ro";
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {units.map((unit, index) => (
        <motion.div
          key={unit.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="group relative bg-[#050505] border border-white/5 hover:border-white/10 p-8 md:p-10 transition-colors duration-500 overflow-hidden"
        >
          {/* Accent-colored corner indicator */}
          <div 
            className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20"
            style={{
              background: `linear-gradient(225deg, ${unit.accentColor} 0%, transparent 60%)`
            }}
          />

          <div>
            <div className="flex justify-between items-baseline mb-4">
              <span className="mil-text-metadata text-[10px] tracking-[0.25em] font-black" style={{ color: unit.accentColor }}>
                {unit.role}
              </span>
              <span className="mil-text-metadata text-[9px] opacity-40 font-mono">[{unit.shortName}]</span>
            </div>

            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-white/90 transition-colors">
              {unit.name}
            </h3>

            <p className="mil-text-metadata text-xs opacity-60 italic tracking-wide mb-6">
              &ldquo;{unit.tagline}&rdquo;
            </p>

            <p className="text-sm leading-relaxed text-white/60 mb-8">
              {unit.description}
            </p>

            <div className="space-y-3 border-t border-white/5 pt-6">
              <h4 className="mil-text-metadata text-[10px] tracking-[0.2em] font-black opacity-80">
                {isRo ? "PROFIL OPERAȚIONAL" : "OPERATIONAL PROFILE"}
              </h4>
              <ul className="space-y-2">
                {unit.keyFacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: unit.accentColor }} />
                    <span className="text-xs text-white/50 leading-normal">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Intelligence Network Map Component ───────────────────────────────────────

export function IntelligenceNetworkMap({ agencies, locale = "en" }: { agencies: IntelligenceAgency[]; locale?: Locale }) {
  const [active, setActive] = useState("cia");
  const [mode, setMode] = useState<"ALL" | "SIGINT" | "HUMINT" | "MILITARY">("ALL");
  const current = agencies.find(a => a.id === active) || agencies[0];
  const isRo = locale === "ro";

  // Filter coordinates and properties based on active mode
  const modeAgencies = {
    ALL: ["cia", "nsa", "dia", "nro"],
    SIGINT: ["nsa", "nro"],
    HUMINT: ["cia"],
    MILITARY: ["dia"]
  };

  const isHighlighted = (id: string) => {
    return modeAgencies[mode].includes(id);
  };

  // Node position coordinates
  const nodePositions = {
    cia: { cx: "15%", cy: "30%" },
    nsa: { cx: "38%", cy: "25%" },
    dia: { cx: "62%", cy: "25%" },
    nro: { cx: "85%", cy: "30%" }
  };

  // Custom status metrics for visual realism
  const systemStatuses = {
    cia: [
      { label: "FEED_INTEGRITY", value: "98.4%" },
      { label: "ORBITAL_COVERAGE", value: "72.1% (LOW_ALT)" },
      { label: "DATA_CRYPT_MODE", value: "AES-256-GCM" }
    ],
    nsa: [
      { label: "FEED_INTEGRITY", value: "99.98%" },
      { label: "ORBITAL_COVERAGE", value: "100.0% (HIGH_ALT)" },
      { label: "DATA_CRYPT_MODE", value: "POST_QUANTUM_CRY" }
    ],
    dia: [
      { label: "FEED_INTEGRITY", value: "99.1%" },
      { label: "ORBITAL_COVERAGE", value: "85.6% (TACTICAL)" },
      { label: "DATA_CRYPT_MODE", value: "FIPS-140-3" }
    ],
    nro: [
      { label: "FEED_INTEGRITY", value: "100.0%" },
      { label: "ORBITAL_COVERAGE", value: "100.0% (CONSTELLATION)" },
      { label: "DATA_CRYPT_MODE", value: "HARDWARE_ENCRYPT" }
    ]
  };

  const activeStatus = systemStatuses[active as keyof typeof systemStatuses] || systemStatuses.cia;

  // Professional static feeds telemetry table
  const feeds = [
    { id: "CIA", type: "HUMINT", latency: "0.18s", bandwidth: "12 Mbps", status: "SECURE" },
    { id: "NSA", type: "SIGINT", latency: "0.02s", bandwidth: "2.4 Gbps", status: "SECURE" },
    { id: "DIA", type: "MIL-INT", latency: "0.05s", bandwidth: "850 Mbps", status: "SECURE" },
    { id: "NRO", type: "IMINT", latency: "0.08s", bandwidth: "4.8 Gbps", status: "SECURE" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 w-full items-stretch">
      {/* Interactive Map Visual Area */}
      <div className="relative min-h-[440px] md:min-h-[520px] bg-[#030303] border border-white/5 flex flex-col justify-between p-8 overflow-hidden">
        {/* Fine static coordinate grid overlay */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.02] pointer-events-none border border-white/5">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="border-r border-b border-white/20 flex items-start p-1">
              <span className="font-mono text-[6px]">{(i * 12.4).toFixed(1)}°N</span>
            </div>
          ))}
        </div>

        {/* HUD corners */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/10" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/10" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10" />

        {/* Top Header metadata */}
        <div className="relative z-10 flex justify-between items-center text-[9px] font-mono opacity-30">
          <span>SYSTEM: INTEGRATED INTEL FEED</span>
          <span>LATENCY: 0.08ms</span>
        </div>

        {/* Tactical Mode Filters */}
        <div className="relative z-20 flex justify-center gap-2 mt-4">
          {(["ALL", "SIGINT", "HUMINT", "MILITARY"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                const allowed = modeAgencies[m];
                if (!allowed.includes(active)) {
                  setActive(allowed[0]);
                }
              }}
              className={cn(
                "px-3 py-1 font-mono text-[9px] font-bold border transition-all duration-200",
                mode === m
                  ? "bg-white text-black border-white"
                  : "bg-black text-white/30 border-white/10 hover:text-white/60 hover:border-white/25"
              )}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Connection lines from nodes to Central Command Hub (cx: 50%, cy: 75%) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Static Command Hub Crosshair Ticks */}
          <line x1="50%" y1="71%" x2="50%" y2="79%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <line x1="46%" y1="75%" x2="54%" y2="75%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

          {Object.entries(nodePositions).map(([id, pos]) => {
            const highlighted = isHighlighted(id);
            const activePath = active === id;
            return (
              <line
                key={id}
                x1={pos.cx}
                y1={pos.cy}
                x2="50%"
                y2="75%"
                stroke={activePath ? "rgba(255,255,255,0.2)" : highlighted ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.01)"}
                strokeWidth="1"
                style={{ transition: "stroke 0.2s ease" }}
              />
            );
          })}
        </svg>

        {/* Nodes Placement */}
        <div className="relative z-10 w-full grow flex items-center justify-center min-h-[300px]">
          {agencies.map((agency) => {
            const pos = nodePositions[agency.id as keyof typeof nodePositions] || nodePositions.cia;
            const highlighted = isHighlighted(agency.id);
            const activeNode = active === agency.id;

            return (
              <div
                key={agency.id}
                className="absolute"
                style={{ left: pos.cx, top: pos.cy, transform: "translate(-50%, -50%)" }}
              >
                {/* Minimal clean active boundary box */}
                {activeNode && (
                  <div className="absolute -inset-1.5 border border-white/20 pointer-events-none z-0" />
                )}

                <button
                  onClick={() => setActive(agency.id)}
                  disabled={!highlighted}
                  className={cn(
                    "relative focus:outline-none transition-all duration-300 z-10",
                    !highlighted && "opacity-15 cursor-not-allowed pointer-events-none"
                  )}
                >
                  <div className={cn(
                    "px-4 py-2 border transition-all duration-200 flex flex-col items-center",
                    activeNode 
                      ? "bg-white text-black border-white" 
                      : "bg-black text-white/40 border-white/10 hover:border-white/25 hover:text-white"
                  )}>
                    <span className="font-mono text-[10px] font-bold tracking-wide">{agency.id.toUpperCase()}</span>
                    <span className="text-[7px] tracking-widest font-mono opacity-50 uppercase">{agency.specialty.split(" ")[0]}</span>
                  </div>
                </button>
              </div>
            );
          })}

          {/* Central Command Hub Node */}
          <div
            className="absolute flex flex-col items-center justify-center p-5 border border-white/10 bg-black z-20"
            style={{ left: "50%", top: "75%", transform: "translate(-50%, -50%)" }}
          >
            <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-white">COMMAND HUB</span>
            <span className="text-[7px] font-mono opacity-30 uppercase tracking-widest">{isRo ? "Integrare Date" : "Data Integration"}</span>
          </div>
        </div>

        {/* Professional feed telemetry log table */}
        <div className="relative z-10 grid grid-cols-4 gap-4 border-t border-white/5 pt-4 font-mono text-[9px]">
          {feeds.map((f) => {
            const isActive = active === f.id.toLowerCase();
            return (
              <div key={f.id} className={cn("flex flex-col border-l pl-3 transition-colors duration-200", isActive ? "border-white/30" : "border-white/5")}>
                <span className={cn("font-bold text-[8px]", isActive ? "text-white" : "text-white/30")}>
                  {f.id} // {f.type}
                </span>
                <span className="text-white/20 mt-1">LAT: {f.latency}</span>
                <span className="text-white/20">STATUS: {f.status}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Panel */}
      <div className="mil-glass p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col h-full justify-between z-10"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: current.accentColor }} />
                <span className="mil-text-metadata text-[10px] tracking-[0.3em] font-black">{current.specialty}</span>
              </div>

              <h3 className="text-3xl font-black tracking-tighter uppercase mb-2">
                {current.name}
              </h3>
              <p className="mil-text-metadata text-xs font-bold opacity-60 tracking-wider mb-6">{current.role}</p>

              <p className="text-sm leading-relaxed text-white/60 mb-8">{current.description}</p>
            </div>

            {/* Diagnostic system parameters */}
            <div className="space-y-4 border-t border-white/5 pt-6">
              <h4 className="mil-text-metadata text-[9px] tracking-[0.25em] opacity-40 font-black">
                {isRo ? "DIAGNOSTIC SISTEM" : "SYSTEM DIAGNOSTICS"}
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {activeStatus.map((s, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1.5 border-b border-white/5 font-mono text-[10px]">
                    <span className="text-white/40">{s.label}</span>
                    <span className="font-bold text-white/80">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 border-t border-white/5 pt-6 mt-6">
              <h4 className="mil-text-metadata text-[9px] tracking-[0.25em] opacity-40 font-black">
                {isRo ? "METRICI SPECIFICE" : "KEY FOCUS AREAS"}
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {current.stats.map((s, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="mil-text-metadata text-[8px] tracking-widest text-white/30">{s.label}</span>
                    <span className="text-xs font-semibold text-white/80">{s.value}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link
                  href="/military/intelligence"
                  className="w-full inline-flex h-11 items-center justify-center border border-white/15 bg-white px-5 text-xs font-bold uppercase text-black transition-colors hover:bg-white/85"
                >
                  {isRo ? "EXPLOREAZĂ REȚEAUA DE INTELIGENȚĂ →" : "EXPLORE INTELLIGENCE NETWORK →"}
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
