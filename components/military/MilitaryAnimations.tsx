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
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";
import type { WeaponSystem, MilitaryBranch, DARPAProgram, MilitaryStat, CarrierGroupPosition } from "@/lib/data/military-data";
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
        font-size: clamp(60px, 12vw, 180px);
        font-weight: 900;
        line-height: 0.85;
        letter-spacing: -0.04em;
        text-transform: uppercase;
      }

      .mil-text-section {
        font-family: var(--font-archivo);
        font-size: clamp(48px, 8vw, 120px);
        font-weight: 900;
        line-height: 0.9;
        letter-spacing: -0.03em;
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
        line-height: 1.7;
        color: rgba(255,255,255,0.65);
      }

      .mil-text-label {
        font-family: var(--font-hero);
        font-size: clamp(8px, 0.8vw, 10px);
        font-weight: 500;
        letter-spacing: 0.4em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.55);
      }

      .mil-text-metadata {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.50);
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
      <div className="mil-text-metadata mb-6 tracking-[0.3em]">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className="text-[clamp(48px,7vw,96px)] font-extralight tracking-tighter leading-none">
          <MilCountUp to={value} prefix={prefix} suffix={suffix} decimals={decimals} color="white" />
        </span>
      </div>
      {/* Gradient divider */}
      <div className="mt-6 mb-4 h-px w-full" style={{
        background: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.03), transparent)'
      }} />
      <div className="mil-text-metadata max-w-[220px] leading-relaxed opacity-50 text-[8px]">
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
            <span className="mil-text-metadata text-[7px] tracking-[0.3em]">{system.category}</span>
            {system.stealth && <span className="mil-text-metadata text-[6px] border border-white/10 px-1.5 py-0.5 text-white/60">STEALTH</span>}
          </div>
          <h3 className="text-xl font-black tracking-tighter uppercase leading-tight mb-2">{system.name}</h3>
          <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-2">{system.tagline || system.description.split('.')[0] + '.'}</p>
          <div className="flex gap-2 mb-4">
            {system.specs.slice(0, 2).map((spec, i) => (
              <div key={i} className="border border-white/6 bg-white/2 px-3 py-1.5 flex-1">
                <div className="mil-text-metadata text-[6px] tracking-[0.2em] opacity-60 mb-0.5">{spec.label}</div>
                <div className="text-[11px] font-semibold tracking-tight text-white/80">{spec.value}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            {system.heroStat && (
              <span className="text-lg font-black tracking-tighter" style={{ color: system.accentColor || 'white' }}>{system.heroStat}</span>
            )}
            <span className="mil-text-metadata text-[7px] tracking-[0.3em] group-hover:text-white transition-colors">DOSSIER →</span>
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
              className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/6 no-scrollbar"
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
            >
              <div className="sticky -top-px z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-[#0a0a0a] border-b border-white/6">
                <span className="mil-text-metadata tracking-[0.3em]">{locale === 'ro' ? 'DOSAR ACTIV' : 'ASSET DOSSIER'}</span>
                <button onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }} className="mil-text-metadata hover:text-white transition-colors tracking-[0.2em]">
                  {locale === 'ro' ? '[ ÎNCHIDE ]' : '[ CLOSE ]'}
                </button>
              </div>
              <div className="relative w-full h-[35vh] md:h-[45vh] overflow-hidden">
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
                <span className="mil-text-metadata text-[7px] tracking-[0.3em] opacity-60">{program.category}</span>
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
              className="relative z-10 w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-[#0a0a0a] border border-white/8 no-scrollbar"
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
  const [active, setActive] = useState<number | null>(null);

  const labels = locale === 'ro' 
    ? { AIR: 'AER', LAND: 'TERESTRU', SEA: 'MARITIM', NUCLEAR: 'TRIADA', TRIAD: 'NUCLEARĂ' } 
    : { AIR: 'AIR', LAND: 'LAND', SEA: 'SEA', NUCLEAR: 'NUCLEAR', TRIAD: 'TRIAD' };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#080C14]">
      {/* SVG triangle */}
      <div className="relative flex items-center justify-center p-8 pb-0">
        <svg 
          viewBox="0 0 400 280" 
          className="w-full max-w-md" 
          role="img"
          aria-label="Interactive diagram of the American nuclear triad: Land, Sea, and Air legs"
        >
          <defs>
            <filter id="triad-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Triangle lines */}
          {legs.map((leg, i) => {
            const positions = [{ x: 200, y: 20 }, { x: 40, y: 250 }, { x: 360, y: 250 }];
            const next = positions[(i + 1) % 3];
            const curr = positions[i];
            const isActive = active === i || active === (i + 1) % 3;
            return (
              <line
                key={i}
                x1={curr.x} y1={curr.y} x2={next.x} y2={next.y}
                stroke={isActive ? leg.color : "rgba(255,255,255,0.1)"}
                strokeWidth={isActive ? 2 : 1}
                style={{ transition: "all 0.3s ease" }}
              />
            );
          })}

          {/* Nodes */}
          {[
            { x: 200, y: 20, label: labels.AIR, i: 0 }, 
            { x: 40, y: 250, label: labels.LAND, i: 1 }, 
            { x: 360, y: 250, label: labels.SEA, i: 2 }
          ].map(node => {
            const leg = legs[node.i];
            const isActive = active === node.i;
            return (
              <g
                key={node.i}
                className="cursor-pointer"
                onClick={() => setActive(active === node.i ? null : node.i)}
              >
                <circle
                  cx={node.x} cy={node.y} r={isActive ? 28 : 20}
                  fill={`${leg.color}15`}
                  stroke={leg.color}
                  strokeWidth={isActive ? 2 : 1}
                  filter={isActive ? "url(#triad-glow)" : undefined}
                  style={{ transition: "all 0.3s ease" }}
                />
                <text x={node.x} y={node.y + 4} textAnchor="middle"
                  fill={isActive ? leg.color : "rgba(255,255,255,0.6)"}
                  fontSize="9" fontFamily="'Space Mono','Courier',monospace" fontWeight="600"
                  letterSpacing="0.15em" style={{ transition: "all 0.3s ease" }}>
                  {node.label}
                </text>
              </g>
            );
          })}

          {/* Center label */}
          <text x="200" y="145" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="9"
            fontFamily="'Space Mono','Courier',monospace" letterSpacing="0.2em">{labels.NUCLEAR}</text>
          <text x="200" y="158" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="9"
            fontFamily="'Space Mono','Courier',monospace" letterSpacing="0.2em">{labels.TRIAD}</text>
        </svg>
      </div>

      {/* Detail panel */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {active === null ? (
            <motion.p key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center font-mono text-xs text-white/30 tracking-[0.2em]">
              {locale === 'ro' ? 'APASĂ PE UN NOD PENTRU DETALII' : 'CLICK A NODE FOR DETAILS'}
            </motion.p>
          ) : (
            <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}>
              <div className="mb-3 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: legs[active].color }} />
                <h4 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">{legs[active].name}</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: locale === 'ro' ? 'SISTEME' : 'SYSTEMS', value: legs[active].systems },
                  { label: locale === 'ro' ? 'FOCOASE' : 'WARHEADS', value: legs[active].warheads },
                  { label: locale === 'ro' ? 'STATUS ALERTĂ' : 'ALERT STATUS', value: legs[active].alert },
                  { label: locale === 'ro' ? 'AVANTAJ CHEIE' : 'KEY ADVANTAGE', value: legs[active].advantage },
                ].map((item, i) => (
                  <div key={i} className="rounded-lg border border-white/6 bg-white/3 p-3">
                    <p className="mb-0.5 font-mono text-[8px] tracking-widest text-white/30">{item.label}</p>
                    <p className="font-mono text-[10px] leading-snug" style={{ color: legs[active].color }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Description */}
        <p className="mt-4 border-t border-white/8 pt-4 font-body text-xs leading-relaxed text-white/40">
          {description}
        </p>
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
                    <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#F59E0B]">
                      {locale === 'ro' ? 'POZIȚIE CSG' : 'CSG POSITION'}
                    </p>
                    <p className="font-mono text-xs font-bold text-white">{c.ship}</p>
                    <p className="font-mono text-[10px] text-white/50">{c.region}</p>
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
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
            {locale === 'ro' ? 'Grup de Atac Portavion' : 'Carrier Strike Group'}
          </p>
        </div>
        <p className="font-mono text-[9px] text-white/15">
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
  imageSrc, imageAlt, title, subtitle, tagline, stats
}: { 
  imageSrc: string; 
  imageAlt: string; 
  title?: string;
  subtitle?: string;
  tagline?: string;
  stats?: { value: string; label: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

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

  const words = title?.split(" ") || [];

  return (
    <div ref={ref} className="relative h-[180vh] bg-black">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden mil-noise">
        {/* Background image with 3-stage reveal */}
        <motion.div 
          className="absolute inset-0 will-change-transform"
          style={{ 
            opacity: imageOpacity, 
            filter: useTransform(imageBlur, (v) => `blur(${v}px)`),
            scale: imageScale,
            y: imageY
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            className="object-cover brightness-[0.4] grayscale-[0.3]"
            sizes="100vw"
            quality={90}
          />
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
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          style={{ opacity: textOpacity, y: textY }}
        >
          {/* Tagline */}
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="mil-text-label mb-8 tracking-[0.5em] text-white/40"
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
              visible: { opacity: 0.5, y: 0, transition: { duration: 0.8 } }
            }}
            className="mil-text-metadata mt-12 max-w-lg tracking-[0.3em] leading-relaxed uppercase"
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
                  <div className="mil-text-metadata mb-2 opacity-30 uppercase tracking-widest text-[9px]">{s.label}</div>
                  <div className="text-2xl md:text-3xl font-black tracking-tight text-white/90">{s.value}</div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
        
        {/* Breathing dot scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="mil-text-metadata text-[7px] tracking-[0.5em] opacity-30">SCROLL</span>
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-white/50 mil-breathe" />
          </div>
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
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const defaultLabel = locale === 'ro' 
    ? "Bugetul de Apărare (miliarde USD, 2024)" 
    : "Defense Budget (USD Billion, 2024)";

  const displayLabel = label || defaultLabel;

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-white/8 bg-[#080C14] p-6">
      <p className="mb-6 font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">{displayLabel}</p>
      <div className="space-y-3">
        {data.map((row, i) => {
          const isHighlight = row.highlight || row.country.includes("United States") || row.country.includes("Statele Unite");
          const pct = (row.budget / 886) * 100;
          return (
            <div key={row.country}>
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{row.flag}</span>
                  <span className={`mil-text-metadata font-(family-name:--font-archivo) tracking-normal text-[11px] ${isHighlight ? "text-white font-bold" : "text-white/40"}`}>
                    {row.country}
                  </span>
                </div>
                <span className={`mil-text-metadata font-mono text-[10px] ${isHighlight ? "text-white" : "text-white/30"}`}>
                  ${row.budget}B
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${pct}%` } : { width: 0 }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: isHighlight
                      ? "white"
                      : "rgba(255,255,255,0.1)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-right font-mono text-[8px] text-white/20">Source: SIPRI Military Expenditure Database 2024</p>
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
