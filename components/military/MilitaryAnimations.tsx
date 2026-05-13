"use client";

// ─── Military Animation Components ───────────────────────────────────────────
// All client-only interactive/animated elements for the Military section.
// Design language: defense-tech + aerospace + HUD + cinematic.
// Color palette: matte black, deep navy, graphite, steel blue, amber HUD.

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  motion, AnimatePresence, useScroll, useTransform,
  useInView, useMotionValue, animate,
} from "framer-motion";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import type { WeaponSystem, MilitaryBranch, DARPAProgram, MilitaryStat, CarrierGroupPosition } from "@/lib/data/military-data";
import { BUDGET_DATA as SHARED_BUDGET_DATA } from "@/lib/data/military-data";

// ─────────────────────────────────────────────────────────────────────────────
// 1. HUDGrid — animated scan-line grid overlay
// ─────────────────────────────────────────────────────────────────────────────

export function HUDGrid({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes hud-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,${opacity}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,${opacity}) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Diagonal accent lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(45deg, transparent 49%, rgba(245,158,11,${opacity * 0.5}) 49%, rgba(245,158,11,${opacity * 0.5}) 51%, transparent 51%)`,
          backgroundSize: "120px 120px",
        }}
      />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.15), rgba(245,158,11,0.4), rgba(245,158,11,0.15), transparent)",
          animation: "scan-line 8s linear infinite",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. RadarPing — circular radar sweep animation
// ─────────────────────────────────────────────────────────────────────────────

export function RadarPing({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <style>{`
        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes radar-ping {
          0%   { transform: scale(0.3); opacity: 0.8; }
          100% { transform: scale(1);   opacity: 0;   }
        }
      `}</style>

      {/* Rings */}
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="absolute rounded-full border border-[rgba(59,130,246,0.25)]"
          style={{ width: `${(i / 3) * 100}%`, height: `${(i / 3) * 100}%` }}
        />
      ))}

      {/* Cross-hairs */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-px w-full bg-[rgba(59,130,246,0.2)]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-px bg-[rgba(59,130,246,0.2)]" />
      </div>

      {/* Sweep */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{ animation: "radar-sweep 4s linear infinite" }}
      >
        <div
          className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left"
          style={{
            background: "conic-gradient(from 0deg, transparent 60%, rgba(59,130,246,0.4) 100%)",
          }}
        />
      </div>

      {/* Center dot */}
      <div className="relative z-10 h-2 w-2 rounded-full bg-[#3B82F6]" style={{ boxShadow: "0 0 8px rgba(59,130,246,0.8)" }} />

      {/* Ping dots */}
      {[{ x: "65%", y: "30%", delay: "0s" }, { x: "30%", y: "60%", delay: "1.2s" }, { x: "75%", y: "65%", delay: "2.5s" }].map((p, i) => (
        <div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#F59E0B]"
          style={{
            left: p.x, top: p.y,
            boxShadow: "0 0 6px rgba(245,158,11,0.8)",
            animation: `radar-ping 3s ease-out ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. HUDCounter — military-style counting stat display
// ─────────────────────────────────────────────────────────────────────────────

interface HUDCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  sublabel: string;
  color?: "amber" | "blue" | "white";
  delay?: number;
}

function MilCountUp({ to, prefix = "", suffix = "", decimals = 0, color }: {
  to: number; prefix?: string; suffix?: string; decimals?: number; color: string;
}) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv     = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(mv, to, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => {
        if (!ref.current) return;
        const display = to >= 10000
          ? v.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : v.toFixed(decimals);
        ref.current.textContent = prefix + display + suffix;
      },
    });
    return ctrl.stop;
  }, [inView, to, prefix, suffix, decimals, mv]);

  return <span ref={ref} style={{ color }}>{prefix}0{suffix}</span>;
}

export function HUDCounter({ stat, index = 0 }: { stat: MilitaryStat; index?: number }) {
  const { value, suffix = "", prefix = "", decimals = 0, label, sublabel, color = "amber" } = stat;
  const delay = index * 0.1;
  const colorMap = { amber: "#F59E0B", blue: "#60A5FA", white: "#F8FAFC" };
  const borderMap = { amber: "rgba(245,158,11,0.25)", blue: "rgba(96,165,250,0.2)", white: "rgba(248,250,252,0.15)" };
  const glowMap = { amber: "rgba(245,158,11,0.08)", blue: "rgba(60,130,246,0.06)", white: "rgba(248,250,252,0.04)" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border p-5 backdrop-blur-sm transition-all duration-300"
      style={{
        borderColor: borderMap[color],
        background: `linear-gradient(135deg, rgba(8,12,20,0.9) 0%, rgba(12,18,28,0.95) 100%)`,
        boxShadow: `inset 0 1px 0 ${borderMap[color]}, 0 0 40px ${glowMap[color]}`,
      }}
    >
      {/* Corner brackets — HUD aesthetic */}
      <div className="pointer-events-none absolute inset-0">
        {["top-0 left-0", "top-0 right-0 rotate-90", "bottom-0 left-0 -rotate-90", "bottom-0 right-0 rotate-180"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} h-4 w-4`}>
            <div className="h-full w-px" style={{ backgroundColor: colorMap[color], opacity: 0.5 }} />
            <div className="absolute top-0 h-px w-full" style={{ backgroundColor: colorMap[color], opacity: 0.5 }} />
          </div>
        ))}
      </div>

      {/* Classification tag */}
      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: colorMap[color], opacity: 0.6 }}>
        ◼ CLASSIFIED DATA
      </p>

      {/* Number */}
      <p className="mb-1 font-mono leading-none" style={{ fontSize: "clamp(32px,4vw,52px)" }}>
        <MilCountUp to={value} prefix={prefix} suffix={suffix} decimals={decimals} color={colorMap[color]} />
      </p>

      {/* Label */}
      <div className="grow">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{label}</p>
        <p className="mt-1 font-body text-[10px] text-white/35">{sublabel}</p>
      </div>

      {/* Bottom data bar */}
      <div className="mt-4 h-px w-full" style={{ background: `linear-gradient(90deg, ${colorMap[color]}, transparent)`, opacity: 0.4 }} />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. WeaponSystemCard — classified dossier card with hover reveal
// ─────────────────────────────────────────────────────────────────────────────

export function WeaponSystemCard({ system, index = 0 }: { system: WeaponSystem; index?: number }) {
  const [expanded, setExpanded] = useState(false);
  const statusColors = {
    operational: { bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.4)", text: "#22C55E", label: "OPERATIONAL" },
    limited:     { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.4)", text: "#F59E0B", label: "LIMITED" },
    development: { bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.4)", text: "#60A5FA", label: "IN DEVELOPMENT" },
  };
  const sc = statusColors[system.status];

  return (
    <motion.div
      layout
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/8 bg-[#080C14] transition-all duration-300 hover:border-[rgba(245,158,11,0.3)]"
      style={{ boxShadow: expanded ? "0 0 40px rgba(245,158,11,0.06)" : "none" }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={system.imageSrc}
          alt={system.imageAlt}
          fill
          quality={80}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
        {/* Dark grade overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,12,20,0.4) 0%, rgba(8,12,20,0.85) 100%)" }} />

        {/* HUD overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner brackets */}
          <div className="absolute top-3 left-3 h-6 w-6 border-t border-l border-[rgba(245,158,11,0.6)]" />
          <div className="absolute top-3 right-3 h-6 w-6 border-t border-r border-[rgba(245,158,11,0.6)]" />
          <div className="absolute bottom-3 left-3 h-6 w-6 border-b border-l border-[rgba(245,158,11,0.6)]" />
          <div className="absolute bottom-3 right-3 h-6 w-6 border-b border-r border-[rgba(245,158,11,0.6)]" />
        </div>

        {/* Status badge */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <div
            className="rounded-full px-3 py-1 font-mono text-[9px] font-bold tracking-[0.25em] backdrop-blur-sm"
            style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text }}
          >
            ● {sc.label}
          </div>
        </div>

        {/* Tags */}
        <div className="absolute top-4 right-4 flex gap-1.5">
          {system.stealth && (
            <span className="rounded bg-[rgba(8,12,20,0.8)] px-1.5 py-0.5 font-mono text-[8px] text-[#60A5FA] backdrop-blur-sm">STEALTH</span>
          )}
          {system.nuclear && (
            <span className="rounded bg-[rgba(8,12,20,0.8)] px-1.5 py-0.5 font-mono text-[8px] text-[#F59E0B] backdrop-blur-sm">NUCLEAR</span>
          )}
        </div>

        {/* System ID bottom left */}
        <div className="absolute bottom-4 left-4">
          <p className="font-mono text-[9px] text-white/40 tracking-[0.2em]">{system.designation} · {system.category.toUpperCase()}</p>
          <p className="font-mono text-lg font-bold text-white tracking-wide">{system.name}</p>
        </div>

        {/* Quantity bottom right */}
        <div className="absolute bottom-4 right-4 text-right">
          <p className="font-mono text-[9px] text-white/40 tracking-widest">INVENTORY</p>
          <p className="font-mono text-xs text-[#F59E0B]">{system.quantity}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex grow flex-col p-5">
        <p className="mb-3 grow font-body text-sm leading-relaxed text-white/60">{system.description}</p>

        {/* Quick specs */}
        <div className="mb-4 grid grid-cols-2 gap-2">
          {system.specs.slice(0, 4).map((spec, i) => (
            <div key={i} className="rounded-lg border border-white/6 bg-white/3 px-3 py-2">
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/35">{spec.label}</p>
              <p className="font-mono text-xs text-[#F59E0B]">{spec.value}</p>
            </div>
          ))}
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between rounded-lg border border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.04)] px-4 py-2.5 font-mono text-xs text-[#F59E0B] transition-all hover:bg-[rgba(245,158,11,0.08)]"
        >
          <span>{expanded ? "CLOSE DOSSIER" : "ACCESS FULL DOSSIER"}</span>
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>▼</motion.span>
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.3, delay: 0.1 } }}
            >
              <div className="mt-4 space-y-4 border-t border-white/8 pt-4">
                {/* Strategic significance */}
                <div className="rounded-lg border border-[rgba(245,158,11,0.15)] bg-[rgba(245,158,11,0.04)] p-4">
                  <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#F59E0B]">STRATEGIC SIGNIFICANCE</p>
                  <p className="font-body text-xs leading-relaxed text-white/65">{system.significance}</p>
                </div>

                {/* Full specs */}
                <div>
                  <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">SPECIFICATIONS</p>
                  <div className="grid grid-cols-2 gap-2">
                    {system.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between rounded-lg border border-white/6 bg-white/3 px-3 py-2">
                        <span className="font-mono text-[9px] text-white/35">{spec.label}</span>
                        <span className="font-mono text-[9px] text-[#60A5FA]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
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
            className={`flex shrink-0 items-center gap-2 px-4 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-200 ${
              i === active
                ? "border-b-2 border-[#F59E0B] text-[#F59E0B] bg-[rgba(245,158,11,0.06)]"
                : "text-white/35 hover:text-white/60 border-b-2 border-transparent"
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
            <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.3em] text-[#F59E0B]">
              Est. {branch.founded} · {branch.personnel}
            </p>
            <h3 className="mb-1 font-mono text-2xl font-bold uppercase tracking-wide text-white">
              {branch.name}
            </h3>
            <p className="mb-4 font-mono text-xs italic text-white/40">"{branch.tagline}"</p>
            <p className="mb-6 font-body text-sm leading-relaxed text-white/65">{branch.description}</p>

            {/* Key facts */}
            <div className="space-y-2">
              {branch.keyFacts.map((fact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-3 rounded-lg border border-white/6 bg-white/3 px-4 py-2.5"
                >
                  <span className="mt-0.5 shrink-0 text-[#F59E0B]">▸</span>
                  <p className="font-body text-xs leading-snug text-white/60">{fact}</p>
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
              background: "linear-gradient(to right, #080C14 0%, rgba(8,12,20,0.3) 40%, transparent 100%)",
            }} />
            {/* HUD corners */}
            {["top-3 right-3 border-t border-r", "bottom-3 right-3 border-b border-r"].map((pos, i) => (
              <div key={i} className={`absolute ${pos} h-5 w-5 border-[rgba(245,158,11,0.5)]`} />
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
  const statusColors = {
    active:   { dot: "#22C55E", label: "ACTIVE", border: "rgba(34,197,94,0.2)"  },
    testing:  { dot: "#F59E0B", label: "TESTING", border: "rgba(245,158,11,0.2)" },
    concept:  { dot: "#60A5FA", label: "CONCEPT", border: "rgba(96,165,250,0.2)" },
  };

  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {programs.map((program) => {
        const sc = statusColors[program.status];
        return (
          <motion.div
            key={program.id}
            variants={{
              hidden: { opacity: 0, y: 24, scale: 0.97 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
            }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/8 bg-[#080C14] p-5 transition-all hover:border-[rgba(245,158,11,0.25)]"
          >
            {/* Glow on hover */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.05) 0%, transparent 70%)" }} />

            {/* Header */}
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.25em]" style={{ color: sc.dot }}>
                  {program.category}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{program.icon}</span>
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">{program.name}</h3>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 shrink-0" style={{ borderColor: sc.border, background: `${sc.dot}10` }}>
                <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: sc.dot }} />
                <span className="font-mono text-[8px] tracking-widest" style={{ color: sc.dot }}>{sc.label}</span>
              </div>
            </div>

            <p className="mb-3 grow font-body text-xs leading-relaxed text-white/55">{program.description}</p>

            {/* Significance */}
            <div className="rounded-lg border border-[rgba(245,158,11,0.12)] bg-[rgba(245,158,11,0.03)] px-3 py-2.5">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#F59E0B] mb-1">STRATEGIC IMPACT</p>
              <p className="font-body text-[11px] leading-snug text-white/50">{program.significance}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
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
          <text x="200" y="145" textAnchor="middle" fill="rgba(245,158,11,0.6)" fontSize="9"
            fontFamily="'Space Mono','Courier',monospace" letterSpacing="0.2em">NUCLEAR</text>
          <text x="200" y="158" textAnchor="middle" fill="rgba(245,158,11,0.6)" fontSize="9"
            fontFamily="'Space Mono','Courier',monospace" letterSpacing="0.2em">TRIAD</text>
        </svg>
      </div>

      {/* Detail panel */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {active === null ? (
            <motion.p key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center font-mono text-xs text-white/30 tracking-[0.2em]">
              CLICK A NODE TO ACCESS CLASSIFIED DATA
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
  const carriers = positions;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#04080F]">
      {/* Map background — dark ocean */}
      <div className="relative" style={{ paddingBottom: "50%" }}>
        <div className="absolute inset-0">
          {/* Simplified world map grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 60% at 25% 40%, rgba(30,111,191,0.08) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 75% 35%, rgba(30,111,191,0.06) 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 55% 65%, rgba(30,111,191,0.05) 0%, transparent 50%)
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
            viewBox="0 0 100 50" 
            className="absolute inset-0 w-full h-full" 
            preserveAspectRatio="none"
            role="img"
            aria-label="Global map showing approximate positions of U.S. Navy Carrier Strike Groups"
          >
            {/* Carrier group positions */}
            {carriers.map((c) => (
              <g key={c.id}
                onMouseEnter={() => setHovered(c.id)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                {/* Ping rings */}
                <circle cx={c.cx} cy={c.cy} r="3" fill="none" stroke="rgba(245,158,11,0.4)"
                  strokeWidth="0.5"
                  style={{ animation: `radar-ping 2.5s ease-out ${carriers.indexOf(c) * 0.3}s infinite` }} />
                {/* Dot */}
                <circle cx={c.cx} cy={c.cy} r={hovered === c.id ? 1.8 : 1.2}
                  fill={hovered === c.id ? "#F59E0B" : "#F59E0B"}
                  opacity={hovered === c.id ? 1 : 0.8}
                  style={{
                    filter: `drop-shadow(0 0 ${hovered === c.id ? 4 : 2}px rgba(245,158,11,0.8))`,
                    transition: "all 0.2s ease",
                  }}
                />
              </g>
            ))}

            {/* Equator line */}
            <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(59,130,246,0.1)" strokeWidth="0.3" />
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
      <div className="flex items-center justify-between border-t border-white/8 px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#F59E0B]" style={{ boxShadow: "0 0 6px rgba(245,158,11,0.8)" }} />
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">Carrier Strike Group</p>
        </div>
        <p className="font-mono text-[9px] text-white/25">APPROXIMATE POSITIONS · UNCLASSIFIED</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. ParallaxMilitaryHero — Ken Burns + HUD overlay hero image
// ─────────────────────────────────────────────────────────────────────────────

export function ParallaxMilitaryHero({
  imageSrc, imageAlt, title, subtitle, tagline, stats, children
}: { 
  imageSrc: string; 
  imageAlt: string; 
  title?: string;
  subtitle?: string;
  tagline?: string;
  stats?: { value: string; label: string }[];
  children?: React.ReactNode 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div ref={ref} className="relative flex min-h-screen items-end overflow-hidden bg-[#04080F]" style={{ position: "relative" }}>
      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={imageSrc} alt={imageAlt} fill priority
          className="object-cover"
          sizes="100vw"
          quality={85}
          placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
          style={{ filter: "brightness(0.45) saturate(0.7) contrast(1.1)" }}
        />
      </motion.div>

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-[#04080F] via-[#04080F]/20 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-[#04080F]/80 via-transparent to-transparent" />

      {/* HUD grid */}
      <HUDGrid opacity={0.05} />

      {/* HUD frame elements */}
      <div className="pointer-events-none absolute inset-4 z-10 hidden md:block">
        {/* Corner brackets */}
        {[
          "top-0 left-0 border-t-2 border-l-2",
          "top-0 right-0 border-t-2 border-r-2",
          "bottom-0 left-0 border-b-2 border-l-2",
          "bottom-0 right-0 border-b-2 border-r-2",
        ].map((cls, i) => (
          <div key={i} className={`absolute ${cls} h-10 w-10 border-[rgba(245,158,11,0.4)]`} />
        ))}

        {/* Top HUD bar */}
        <div className="absolute top-0 left-12 right-12 flex items-center justify-between border-t border-[rgba(245,158,11,0.15)] pt-2">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#F59E0B]/60">● LIVE</span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/25">GLOBAL OPERATIONS CENTER</span>
          </div>
          <div className="flex items-center gap-4">
            <RadarPing size={28} />
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/25">THREAT LEVEL: ELEVATED</span>
          </div>
        </div>

        {/* Side data strips */}
        <div className="absolute left-0 top-16 space-y-1">
          {["ALTITUDE: FL450", "HEADING: 270°", "SPEED: M2.1", "STATUS: ARMED"].map((data, i) => (
            <p key={i} className="font-mono text-[8px] tracking-[0.2em] text-white/20">{data}</p>
          ))}
        </div>
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 text-center md:text-left">
          {tagline && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 font-mono text-[10px] tracking-[0.4em] text-[#F59E0B]"
            >
              ◈ {tagline.toUpperCase()} ◈
            </motion.p>
          )}
          {title && (
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4 font-hero text-[clamp(48px,10vw,120px)] font-black leading-[0.85] tracking-tight text-white"
            >
              {title}
            </motion.h1>
          )}
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-10 max-w-2xl font-body text-sm leading-relaxed text-white/50 md:text-lg"
            >
              {subtitle}
            </motion.p>
          )}

          {stats && (
            <div className="mb-12 flex flex-wrap justify-center md:justify-start gap-8">
              {stats.map((s, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                >
                  <p className="font-hero text-3xl font-bold text-[#F59E0B]">{s.value}</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">{s.label}</p>
                </motion.div>
              ))}
            </div>
          )}

          {children}
        </div>
      </motion.div>

      {/* Bottom amber rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[rgba(245,158,11,0.5)] to-transparent" />
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
                  <span className={`font-mono text-xs ${isHighlight ? "text-[#F59E0B] font-bold" : "text-white/50"}`}>
                    {row.country}
                  </span>
                </div>
                <span className={`font-mono text-xs ${isHighlight ? "text-[#F59E0B]" : "text-white/35"}`}>
                  ${row.budget}B
                </span>
              </div>
              <div className="h-4 overflow-hidden rounded-sm bg-white/5">
                <motion.div
                  className="h-full rounded-sm"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${pct}%` } : { width: 0 }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: isHighlight
                      ? "linear-gradient(90deg, #92400E, #F59E0B, #FCD34D)"
                      : "rgba(255,255,255,0.15)",
                    boxShadow: isHighlight ? "0 0 12px rgba(245,158,11,0.4)" : "none",
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
// 11. MilStyles — Global HUD animations and cinematic utility classes
// ─────────────────────────────────────────────────────────────────────────────

export function MilStyles() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes mk-blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.35; }
      }
      .mk-blink { animation: mk-blink 3s ease-in-out infinite; }

      @keyframes mk-ken {
        0% { transform: scale(1); }
        100% { transform: scale(1.08) translate(-1%, -1%); }
      }
      .mk-ken { animation: mk-ken 24s ease-in-out infinite alternate; }

      @keyframes mk-grain-anim {
        0%, 100% { transform: translate(0, 0); }
        10% { transform: translate(-1%, -1%); }
        20% { transform: translate(1%, 1%); }
        30% { transform: translate(-2%, 0); }
        40% { transform: translate(2%, 2%); }
        50% { transform: translate(-1%, 2%); }
        60% { transform: translate(2%, 1%); }
        70% { transform: translate(1%, -2%); }
        80% { transform: translate(-2%, -1%); }
        90% { transform: translate(1%, 2%); }
      }

      .mk-grain { position: relative; isolation: isolate; }
      
      .md { font-family: var(--font-hero), "Bebas Neue", sans-serif; }
      .mb { font-family: var(--font-body), "Inter", sans-serif; }

      .mil-nav-card {
        transition: all 0.25s ease;
      }
      .mil-nav-card:hover {
        border-color: rgba(245,158,11, 0.3) !important;
        background: rgba(245,158,11, 0.04) !important;
      }
    `}} />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. HUDCorners — four-point corner framing
// ─────────────────────────────────────────────────────────────────────────────

export function HUDCorners({ color = "#f59e0b", size = 20, weight = 1.5, offset = 0 }: {
  color?: string; size?: number; weight?: number; offset?: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10" style={{ margin: -offset }}>
      {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => {
        const isTop = pos.includes("top");
        const isLeft = pos.includes("left");
        return (
          <div 
            key={i} 
            className={`absolute ${pos}`} 
            style={{ 
              width: size, 
              height: size,
              borderTop: isTop ? `${weight}px solid ${color}` : "none",
              borderBottom: !isTop ? `${weight}px solid ${color}` : "none",
              borderLeft: isLeft ? `${weight}px solid ${color}` : "none",
              borderRight: !isLeft ? `${weight}px solid ${color}` : "none",
              opacity: 0.6
            }} 
          />
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 13. GrainOverlay — cinematic texture
// ─────────────────────────────────────────────────────────────────────────────

export function GrainOverlay({ z = 10, opacity = 0.05 }: { z?: number; opacity?: number }) {
  return (
    <div 
      className="pointer-events-none absolute inset-0 overflow-hidden" 
      style={{ zIndex: z, opacity }}
    >
      <div 
        className="absolute inset-[-200%]"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
          animation: 'mk-grain-anim 0.5s steps(1) infinite'
        }} 
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 14. ScanLine — horizontal sweep line
// ─────────────────────────────────────────────────────────────────────────────

export function ScanLine({ color = "rgba(245,158,11,0.15)", dur = 8 }: { color?: string; dur?: number }) {
  return (
    <div 
      className="pointer-events-none absolute left-0 right-0 h-[1.5px] z-30"
      style={{ 
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        animation: `scan-line ${dur}s linear infinite`
      }}
    />
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
