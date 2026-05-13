"use client";

// ─── Military Animation Components ───────────────────────────────────────────
// All client-only interactive/animated elements for the Military section.
// Design language: defense-tech + aerospace + HUD + cinematic.
// Color palette: matte black, deep navy, graphite, steel blue, amber HUD.

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  motion, AnimatePresence, useScroll, useTransform,
  useInView, useMotionValue, animate,
  LayoutGroup
} from "framer-motion";
import Lenis from "lenis";
import Image from "next/image";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";
import type { WeaponSystem, MilitaryBranch, DARPAProgram, MilitaryStat, CarrierGroupPosition } from "@/lib/data/military-data";
import { BUDGET_DATA as SHARED_BUDGET_DATA } from "@/lib/data/military-data";
import { SITE_IMAGES } from "@/lib/site-images";

// ─────────────────────────────────────────────────────────────────────────────
// 1. SmoothScroll — Lenis Integration
// ─────────────────────────────────────────────────────────────────────────────

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0, // Snappier response
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0, 
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return null;
}

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
        --color-black: #000000;
        --color-graphite: #0a0a0a;
        --color-steel: #1a1a1a;
        --color-accent: #ffffff;
        --font-mono: 'Space Mono', 'Courier', monospace;
      }

      body {
        background-color: var(--color-black);
        color: white;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .mil-text-hero {
        font-size: clamp(60px, 12vw, 180px);
        font-weight: 900;
        line-height: 0.85;
        letter-spacing: -0.04em;
        text-transform: uppercase;
      }

      .mil-text-label {
        font-size: clamp(8px, 0.8vw, 10px);
        font-weight: 500;
        letter-spacing: 0.4em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.4);
      }

      .mil-text-metadata {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.3);
      }

      .mil-glass {
        background: rgba(10, 10, 10, 0.7);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(255, 255, 255, 0.05);
      }

      /* Cinematic Animations */
      @keyframes mk-ken {
        0% { transform: scale(1); }
        100% { transform: scale(1.08) translate(-1%, -1%); }
      }
      .mk-ken { animation: mk-ken 24s ease-in-out infinite alternate; }

      .mil-nav-card {
        transition: border-color 0.25s ease, background-color 0.25s ease;
      }

      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 4px;
      }
      ::-webkit-scrollbar-track {
        background: var(--color-black);
      }
      ::-webkit-scrollbar-thumb {
        background: var(--color-steel);
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: var(--color-accent);
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
// 3. MinimalistStat — high-contrast numerical display
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
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col border-l border-white/5 pl-8 py-4"
    >
      <div className="mil-text-metadata mb-4">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className="text-6xl font-bold tracking-tighter">
          <MilCountUp to={value} prefix={prefix} suffix={suffix} decimals={decimals} color="white" />
        </span>
      </div>
      <div className="mil-text-metadata mt-4 max-w-[180px] leading-relaxed opacity-50">
        {sublabel}
      </div>
    </motion.div>
  );
}

// Rename the export for backward compatibility during refactor if needed, 
// but we'll update page.tsx soon.
export { MinimalistStat as HUDCounter };

// ─────────────────────────────────────────────────────────────────────────────
// 4. WeaponSystemCard — classified dossier card with hover reveal
// ─────────────────────────────────────────────────────────────────────────────

export function WeaponSystemCard({ system, index = 0 }: { system: WeaponSystem; index?: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Master View (Card) */}
      <motion.div
        layoutId={`card-${system.id}`}
        onClick={() => setIsOpen(true)}
        className="group relative h-[400px] cursor-pointer overflow-hidden bg-zinc-900 grayscale-[0.5] transition-[filter,background-color] duration-700 hover:grayscale-0"
      >
        <motion.div layoutId={`image-container-${system.id}`} className="absolute inset-0">
          <Image
            src={system.imageSrc}
            alt={system.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>
        
        {/* Scrim */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-60" />
        
        <div className="absolute bottom-0 left-0 p-8">
          <motion.p layoutId={`designation-${system.id}`} className="mil-text-metadata mb-2">{system.designation}</motion.p>
          <motion.h3 layoutId={`title-${system.id}`} className="text-3xl font-bold tracking-tight">{system.name}</motion.h3>
        </div>
      </motion.div>

      {/* Detail View (Modal) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            {/* Content Container */}
            <motion.div
              layoutId={`card-${system.id}`}
              transition={{ type: "spring", stiffness: 30, damping: 20, mass: 3 }}
              className="relative flex h-full max-h-[900px] w-full max-w-6xl overflow-hidden rounded-sm bg-black border border-white/10"
            >
              <div className="grid h-full w-full md:grid-cols-2">
                {/* Visual Side */}
                <motion.div layoutId={`image-container-${system.id}`} className="relative h-64 md:h-full overflow-hidden bg-zinc-900">
                  <Image
                    src={system.imageSrc}
                    alt={system.imageAlt}
                    fill
                    className="object-cover opacity-60"
                    priority
                  />
                  {/* Schematic Overlay (Visual abstraction) */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }} />
                  
                  <div className="absolute bottom-12 left-12">
                    <motion.p layoutId={`designation-${system.id}`} className="mil-text-metadata mb-4">{system.designation}</motion.p>
                    <motion.h3 layoutId={`title-${system.id}`} className="text-6xl font-black tracking-tighter uppercase">{system.name}</motion.h3>
                  </div>
                </motion.div>

                {/* Data Side */}
                <div className="overflow-y-auto p-8 md:p-16">
                  <div className="flex justify-between items-start mb-12">
                    <div className="mil-text-metadata">CLASSIFIED // ASSET DOSSIER</div>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="mil-text-metadata hover:text-white transition-colors"
                    >
                      [ CLOSE_ESC ]
                    </button>
                  </div>

                  <p className="text-xl text-white/60 leading-relaxed mb-12">
                    {system.description}
                  </p>

                  <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                    {system.specs.map((spec, i) => (
                      <div key={i} className="border-t border-white/10 pt-4">
                        <div className="mil-text-metadata mb-2">{spec.label}</div>
                        <div className="text-lg font-bold">{spec.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-16 p-8 bg-white/5 border border-white/5">
                    <div className="mil-text-metadata mb-4 text-white/80">STRATEGIC SIGNIFICANCE</div>
                    <p className="text-sm text-white/40 leading-relaxed italic">
                      "{system.significance}"
                    </p>
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
// 5. BranchSelector — cinematic branch switcher
// ─────────────────────────────────────────────────────────────────────────────

export function BranchSelector({ branches }: { branches: MilitaryBranch[] }) {
  const [active, setActive] = useState(0);
  const branch = branches[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#080C14]">
      {/* Tab row */}
      <div className="flex overflow-x-auto border-b border-white/8">
        {branches.map((b, i) => (
          <button
            key={b.id}
            onClick={() => setActive(i)}
            className={`flex shrink-0 items-center gap-2 px-6 py-4 mil-text-metadata transition-colors duration-200 ${
              i === active
                ? "border-b border-white text-white bg-white/5"
                : "text-white/20 hover:text-white/40 border-b border-transparent"
            }`}
          >
            <span>{b.iconEmoji}</span>
            <span className="hidden sm:block">{b.shortName}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-[1fr_380px]"
        >
          {/* Text */}
          <div className="p-6 md:p-8">
            <p className="mb-1 mil-text-metadata">
              Est. {branch.founded} · {branch.personnel}
            </p>
            <h3 className="mb-1 text-3xl font-black uppercase tracking-tighter text-white">
              {branch.name}
            </h3>
            <p className="mb-4 mil-text-metadata italic opacity-40">"{branch.tagline}"</p>
            <p className="mb-6 text-sm leading-relaxed text-white/50">{branch.description}</p>

            {/* Key facts */}
            <div className="space-y-2">
              {branch.keyFacts.map((fact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-3 border-l border-white/10 pl-4 py-1"
                >
                  <p className="text-xs leading-snug text-white/40">{fact}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative h-64 md:h-auto overflow-hidden">
            <Image
              src={branch.imageSrc}
              alt={branch.imageAlt}
              fill
              quality={80}
              className="object-cover transition-transform duration-700"
              sizes="(max-width:768px) 100vw, 400px"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to right, #000000 0%, rgba(0,0,0,0.3) 40%, transparent 100%)",
            }} />
            {/* Minimalist corners */}
            {["top-3 right-3 border-t border-r", "bottom-3 right-3 border-b border-r"].map((pos, i) => (
              <div key={i} className={`absolute ${pos} h-5 w-5 border-white/20`} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. DARPAProgramGrid — DARPA future systems cards
// ─────────────────────────────────────────────────────────────────────────────

export function DARPAProgramGrid({ programs }: { programs: DARPAProgram[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProgram = programs.find(p => p.id === selectedId);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <motion.div
            key={program.id}
            layoutId={`darpa-${program.id}`}
            onClick={() => setSelectedId(program.id)}
            className="group cursor-pointer border border-white/5 bg-zinc-950 p-8 transition-colors hover:border-white/20"
          >
            <motion.div layoutId={`icon-${program.id}`} className="text-4xl mb-6">{program.icon}</motion.div>
            <motion.p layoutId={`category-${program.id}`} className="mil-text-metadata mb-2">{program.category}</motion.p>
            <motion.h3 layoutId={`name-${program.id}`} className="text-xl font-bold uppercase tracking-tight">{program.name}</motion.h3>
            <motion.div layoutId={`status-${program.id}`} className="mt-4 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-white/40" />
              <span className="mil-text-metadata text-[8px]">{program.status}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedProgram && (
          <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              layoutId={`darpa-${selectedId}`}
              className="relative w-full max-w-2xl border border-white/10 bg-zinc-900 p-12 md:p-16"
            >
              <div className="flex justify-between items-start mb-12">
                <motion.div layoutId={`icon-${selectedId}`} className="text-6xl">{selectedProgram.icon}</motion.div>
                <button onClick={() => setSelectedId(null)} className="mil-text-metadata hover:text-white">[ CLOSE ]</button>
              </div>

              <motion.p layoutId={`category-${selectedId}`} className="mil-text-metadata mb-4 text-white/40">{selectedProgram.category}</motion.p>
              <motion.h3 layoutId={`name-${selectedId}`} className="text-4xl font-black uppercase tracking-tighter mb-8">{selectedProgram.name}</motion.h3>
              
              <div className="space-y-8">
                <p className="text-lg text-white/60 leading-relaxed">
                  {selectedProgram.description}
                </p>

                <div className="border-t border-white/10 pt-8">
                  <div className="mil-text-metadata mb-4">STRATEGIC SIGNIFICANCE</div>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {selectedProgram.significance}
                  </p>
                </div>

                <motion.div layoutId={`status-${selectedId}`} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  <span className="mil-text-metadata">{selectedProgram.status.toUpperCase()} DEVELOPMENT PHASE</span>
                </motion.div>
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

export function NuclearTriadDiagram({ triad }: { triad: { legs: TriadLeg[]; description: string } }) {
  const { legs, description } = triad;
  const [active, setActive] = useState<number | null>(null);

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
          {[{ x: 200, y: 20, label: "AIR", i: 0 }, { x: 40, y: 250, label: "LAND", i: 1 }, { x: 360, y: 250, label: "SEA", i: 2 }].map(node => {
            const leg = legs[node.i];
            const isActive = active === node.i;
            return (
              <g
                key={node.label}
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
            fontFamily="'Space Mono','Courier',monospace" letterSpacing="0.2em">NUCLEAR</text>
          <text x="200" y="158" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="9"
            fontFamily="'Space Mono','Courier',monospace" letterSpacing="0.2em">TRIAD</text>
        </svg>
      </div>

      {/* Detail panel */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {active === null ? (
            <motion.p key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center font-mono text-xs text-white/30 tracking-[0.2em]">
              CLICK A NODE FOR DETAILS
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
                  { label: "SYSTEMS", value: legs[active].systems },
                  { label: "WARHEADS", value: legs[active].warheads },
                  { label: "ALERT STATUS", value: legs[active].alert },
                  { label: "KEY ADVANTAGE", value: legs[active].advantage },
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

export function GlobalCarrierMap({ positions }: { positions: CarrierGroupPosition[] }) {
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
                    <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#F59E0B]">CSG POSITION</p>
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
               className="object-contain scale-[2.4] pointer-events-none"
             />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Carrier Strike Group</p>
        </div>
        <p className="font-mono text-[9px] text-white/15">APPROXIMATE GLOBAL POSITIONS</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. ParallaxMilitaryHero — Ken Burns + HUD overlay hero image
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

  // Scroll transforms for the cinematic reveal
  // Lower initial opacity for the "Black-Ops" feel while remaining technically visible for LCP
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.35, 0.05]); 
  const blur = useTransform(scrollYProgress, [0, 0.4], [5, 20]); 
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Text animations
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div ref={ref} className="relative h-[200vh] bg-black">
      {/* Sticky container for the hero content */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background image with reveal effect */}
        <motion.div 
          className="absolute inset-0"
          style={{ 
            opacity, 
            filter: useTransform(blur, (v) => `blur(${v}px)`),
            scale,
            y
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            className="object-cover brightness-50 grayscale-[0.2]"
            sizes="100vw"
            quality={90}
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />
        </motion.div>

        {/* Content Overlay */}
        <motion.div 
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mil-text-label mb-6"
          >
            {tagline}
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="mil-text-hero"
          >
            {title?.split(" ").map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 2, delay: 1 }}
            className="mil-text-metadata mt-12 max-w-lg"
          >
            {subtitle}
          </motion.p>

          {/* Minimalist Stats Strip */}
          {stats && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-24 flex flex-wrap justify-center gap-x-16 gap-y-8"
            >
              {stats.map((s, i) => (
                <div key={i} className="text-left">
                  <div className="mil-text-metadata mb-1">{s.label}</div>
                  <div className="text-2xl font-bold tracking-tight">{s.value}</div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="h-12 w-px bg-linear-to-b from-white/40 to-transparent" />
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
  label = "Defense Budget (USD Billion, 2024)" 
}: { 
  data?: any[]; 
  label?: string; 
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-white/8 bg-[#080C14] p-6">
      <p className="mb-6 font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">{label}</p>
      <div className="space-y-3">
        {data.map((row, i) => {
          const isHighlight = row.highlight || row.country.includes("United States");
          const pct = (row.budget / 886) * 100;
          return (
            <div key={row.country}>
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{row.flag}</span>
                  <span className={`mil-text-metadata ${isHighlight ? "text-white font-bold" : "text-white/20"}`}>
                    {row.country}
                  </span>
                </div>
                <span className={`mil-text-metadata ${isHighlight ? "text-white" : "text-white/20"}`}>
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
