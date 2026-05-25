"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import {
  Anchor,
  ArrowUpRight,
  Crosshair,
  Gauge,
  MapPin,
  Network,
  Plane,
  Radar,
  Rocket,
  Satellite,
  Shield,
  Target,
  Zap,
} from "lucide-react";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type {
  AirForceBase,
  AirForceCapability,
  AirForceFleetComparison,
  AirForceFutureProgram,
  AirForceHeritageEvent,
  AirForceMetric,
  AirForcePlatform,
  AirForceTheater,
} from "@/lib/data/airforce-data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. AirForceStyles — Aerospace-Grade HUD Design System
// ─────────────────────────────────────────────────────────────────────────────

export function AirForceStyles() {
  return (
    <style jsx global>{`
      .af-page {
        --af-black: #000000;
        --af-void: #020304;
        --af-surface: #060a0f;
        --af-steel: #8b9bb4;
        --af-amber: #f5a623;
        --af-sky: #7dd3fc;
        --af-panel: rgba(6, 10, 15, 0.9);
        --af-border: rgba(255, 255, 255, 0.05);
        --af-border-glow: rgba(125, 211, 252, 0.12);
        background: var(--af-black);
        color: white;
      }

      .af-font-display {
        font-family: var(--font-archivo), Inter, system-ui, sans-serif;
        letter-spacing: -0.03em;
        text-transform: uppercase;
      }

      .af-font-mono {
        font-family: var(--font-mono), "SFMono-Regular", Consolas, monospace;
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }

      .af-grid-plane {
        background-image:
          radial-gradient(rgba(125, 211, 252, 0.05) 1px, transparent 1px),
          radial-gradient(rgba(245, 166, 35, 0.03) 1px, transparent 1px);
        background-size: 32px 32px;
        mask-image: radial-gradient(ellipse at 50% 45%, black 0%, transparent 80%);
      }

      .af-noise::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0.10;
        mix-blend-mode: screen;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E");
      }

      .af-glass-premium {
        background: rgba(3, 6, 10, 0.88);
        backdrop-filter: blur(32px) saturate(1.15);
        -webkit-backdrop-filter: blur(32px) saturate(1.15);
        border: 1px solid var(--af-border-glow);
        box-shadow: 
          inset 0 0 20px rgba(6, 10, 15, 0.8),
          0 10px 40px rgba(0, 0, 0, 0.9);
      }

      .af-panel-tactical {
        background: rgba(4, 8, 14, 0.92);
        border: 1px solid rgba(255, 255, 255, 0.06);
        box-shadow: inset 0 0 14px rgba(6, 10, 15, 0.5);
      }

      .af-hud-line {
        background: linear-gradient(90deg, transparent, rgba(245, 166, 35, 0.25), transparent);
      }

      @keyframes af-drift {
        0% { transform: translate3d(-0.5%, -0.3%, 0) scale(1); }
        100% { transform: translate3d(0.5%, 0.3%, 0) scale(1.02); }
      }

      .af-drift {
        animation: af-drift 18s ease-in-out infinite alternate;
      }

      @keyframes af-sheen {
        0% { transform: translateX(-130%); opacity: 0; }
        20% { opacity: 0.35; }
        100% { transform: translateX(130%); opacity: 0; }
      }

      .af-sheen::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(105deg, transparent 36%, rgba(125, 211, 252, 0.08), transparent 64%);
        animation: af-sheen 9s ease-in-out infinite;
      }
    `}</style>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. AirForcePageProgress
// ─────────────────────────────────────────────────────────────────────────────

export function AirForcePageProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-px bg-white/4">
      <motion.div
        className="h-full origin-left bg-[linear-gradient(90deg,#1a1a2e,#f5a623,#ffffff)]"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2.5 CountUp helper
// ─────────────────────────────────────────────────────────────────────────────

function AFCountUp({ value, color = "white" }: { value: string; color?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayVal, setDisplayVal] = useState("0");

  useEffect(() => {
    const numericMatch = value.replace(/,/g, "").match(/^([\d.]+)(.*)$/);
    if (!numericMatch) {
      setDisplayVal(value);
      return;
    }
    const num = parseFloat(numericMatch[1]);
    const suffix = numericMatch[2] || "";

    if (inView) {
      const controls = animate(0, num, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          const formatted = num >= 1000
            ? Math.round(latest).toLocaleString("en-US")
            : latest.toFixed(0);
          setDisplayVal(formatted + suffix);
        },
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return <span ref={ref} style={{ color }}>{displayVal}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2.6 SectionTitle helper
// ─────────────────────────────────────────────────────────────────────────────

function AFSectionTitle({
  label, titlePart1, titlePart2, body,
}: {
  label: string; titlePart1: string; titlePart2: string; body: string;
}) {
  return (
    <div className="text-center mb-20 max-w-4xl mx-auto flex flex-col items-center">
      <div className="af-font-mono mb-10 tracking-[0.25em] text-[#f5a623]/80 text-[10px] sm:text-xs font-bold uppercase">
        [ {label} ]
      </div>
      <h2 className="mb-6 flex flex-col items-center w-full text-center">
        <span className="af-font-display block whitespace-nowrap leading-[0.85] text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white">{titlePart1}</span>
        <span className="af-font-display block whitespace-nowrap text-white/20 leading-[0.85] text-4xl sm:text-6xl lg:text-7xl font-black uppercase">{titlePart2}</span>
      </h2>
      <p className="mt-4 max-w-2xl text-center text-xs sm:text-sm leading-relaxed text-white/55 tracking-wide">
        {body}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. AirForceMetricStrip
// ─────────────────────────────────────────────────────────────────────────────

export function AirForceMetricStrip({ metrics, locale = "en" }: { metrics: AirForceMetric[]; locale?: Locale }) {
  return (
    <section className="relative overflow-hidden bg-black border-b border-white/5">
      <div className="absolute inset-0 af-grid-plane opacity-15 pointer-events-none" />
      <div className="af-noise absolute inset-0 opacity-25 pointer-events-none" />
      <div className="relative mx-auto max-w-[1520px] px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map((m) => (
            <motion.div
              key={m.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden border border-white/5 bg-[#020304] p-5 hover:border-white/10 transition-colors duration-300"
            >
              <div className="af-font-display text-3xl font-black text-white leading-none mb-2">
                <AFCountUp value={m.value} />
              </div>
              <div className="af-font-mono text-[9px] tracking-[0.2em] text-white/45 mb-3">{m.label}</div>
              <div className="text-[10px] leading-relaxed text-white/35 group-hover:text-white/50 transition-colors">{m.detail}</div>
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#f5a623]/50 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. AirForceFleetComparisonSection
// ─────────────────────────────────────────────────────────────────────────────

export function AirForceFleetComparisonSection({ data, locale = "en" }: { data: AirForceFleetComparison[]; locale?: Locale }) {
  const [tab, setTab] = useState<"fighters" | "bombers" | "total">("fighters");
  const isRo = locale === "ro";

  const maxVal = Math.max(...data.map((d) =>
    tab === "fighters" ? d.fighters : tab === "bombers" ? d.bombers : d.totalAircraft
  ));

  const tabs = [
    { key: "fighters" as const, label: isRo ? "Avioane de Luptă" : "Fighters" },
    { key: "bombers" as const, label: isRo ? "Bombardiere" : "Bombers" },
    { key: "total" as const, label: isRo ? "Total Aeronave" : "Total Aircraft" },
  ];

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(125,211,252,0.08),transparent_40%)] pointer-events-none" />
      <div className="af-noise absolute inset-0 opacity-25 pointer-events-none" />

      <div className="relative mx-auto max-w-[1520px]">
        <AFSectionTitle
          label={isRo ? "COMPARAȚIE GLOBALĂ" : "GLOBAL COMPARISON"}
          titlePart1={isRo ? "FLOTĂ" : "FLEET"}
          titlePart2={isRo ? "AERIANĂ" : "STRENGTH"}
          body={isRo
            ? "Forțele Aeriene ale SUA operează cea mai mare și avansată flotă aeriană militară din lume — mai mare decât următoarele cinci forțe aeriene combinate."
            : "The United States Air Force operates the largest and most advanced military air fleet in the world — larger than the next five air forces combined."}
        />

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "af-font-mono px-5 py-2.5 text-[10px] tracking-[0.15em] border transition-all duration-300",
                tab === t.key
                  ? "border-[#f5a623]/40 bg-[#f5a623]/8 text-white"
                  : "border-white/5 text-white/35 hover:text-white/60 hover:border-white/10"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Comparison bars */}
        <div className="space-y-3 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              {data.map((d) => {
                const val = tab === "fighters" ? d.fighters : tab === "bombers" ? d.bombers : d.totalAircraft;
                const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
                const isUS = d.highlight;
                return (
                  <div key={d.country} className={cn(
                    "group relative flex items-center gap-4 border p-4 transition-colors duration-300",
                    isUS ? "border-[#f5a623]/20 bg-[#f5a623]/[0.04]" : "border-white/5 bg-[#020304] hover:border-white/8"
                  )}>
                    <div className="flex items-center gap-3 w-40 shrink-0">
                      <span className="text-xl">{d.flag}</span>
                      <span className={cn("af-font-mono text-[10px] tracking-[0.1em]", isUS ? "text-white" : "text-white/50")}>
                        {d.country}
                      </span>
                    </div>
                    <div className="flex-1 relative h-6 bg-white/[0.03] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                          "absolute inset-y-0 left-0",
                          isUS
                            ? "bg-gradient-to-r from-[#f5a623]/60 to-[#f5a623]/20"
                            : "bg-gradient-to-r from-white/15 to-white/5"
                        )}
                      />
                    </div>
                    <div className={cn(
                      "af-font-display text-lg font-black w-20 text-right",
                      isUS ? "text-[#f5a623]" : "text-white/50"
                    )}>
                      {val.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Source */}
        <div className="mt-10 text-center af-font-mono text-[9px] tracking-[0.2em] text-white/25">
          {isRo ? "SURSA: FLIGHT INTERNATIONAL · GLOBAL COMBAT AIRCRAFT AUDIT 2024" : "SOURCE: FLIGHT INTERNATIONAL · GLOBAL COMBAT AIRCRAFT AUDIT 2024"}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. AirForceCapabilityGrid
// ─────────────────────────────────────────────────────────────────────────────

export function AirForceCapabilityGrid({ capabilities, locale = "en" }: { capabilities: AirForceCapability[]; locale?: Locale }) {
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(245,166,35,0.06),transparent_40%)] pointer-events-none" />
      <div className="af-noise absolute inset-0 opacity-25 pointer-events-none" />

      <div className="relative mx-auto max-w-[1520px]">
        <AFSectionTitle
          label={isRo ? "CAPACITĂȚI DE BAZĂ" : "CORE CAPABILITIES"}
          titlePart1={isRo ? "DOMENIILE" : "DOMAINS"}
          titlePart2={isRo ? "PUTERII" : "OF POWER"}
          body={isRo
            ? "Cinci funcții de misiune distincte care definesc supremația aeriană a Americii — fiecare un pilon al descurajării și proiectării de forță."
            : "Five distinct mission functions that define American air supremacy — each a pillar of deterrence and force projection."}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={cn(
                "group relative overflow-hidden border border-white/5 bg-[#020304] p-7 hover:border-white/10 transition-all duration-300",
                i === 0 && "lg:col-span-2 lg:row-span-2",
                i === 0 ? "min-h-[320px]" : "min-h-[220px]"
              )}
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-full h-[2px]">
                <div
                  className="h-full w-0 group-hover:w-full transition-all duration-700"
                  style={{ backgroundColor: cap.accent }}
                />
              </div>

              <div className="af-font-mono text-[9px] tracking-[0.2em] text-white/35 mb-4">{cap.kicker}</div>
              <h3 className="af-font-display text-2xl sm:text-3xl font-black text-white mb-4 leading-[0.95]">
                {cap.title}
              </h3>
              <p className="text-xs leading-relaxed text-white/45 group-hover:text-white/60 transition-colors mb-6">
                {cap.description}
              </p>

              <div className="mt-auto flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cap.accent }} />
                <span className="af-font-mono text-[9px] tracking-[0.15em]" style={{ color: cap.accent }}>
                  {cap.stat}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. AirForceOperationalConsole
// ─────────────────────────────────────────────────────────────────────────────

export function AirForceOperationalConsole({ theaters, locale = "en" }: { theaters: AirForceTheater[]; locale?: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = theaters[activeIndex];
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(125,211,252,0.10),transparent_32%),radial-gradient(circle_at_82%_72%,rgba(6,10,15,0.15),transparent_34%)]" />
      <div className="absolute inset-0 af-grid-plane opacity-18 pointer-events-none" />
      <div className="af-noise absolute inset-0 opacity-25 pointer-events-none" />

      <div className="relative mx-auto max-w-[1520px]">
        <AFSectionTitle
          label={isRo ? "TEATRU INTERACTIV" : "INTERACTIVE THEATER"}
          titlePart1={isRo ? "COMANDAMENTE" : "GLOBAL"}
          titlePart2={isRo ? "GLOBALE" : "COMMANDS"}
          body={isRo
            ? "Selectați un teatru. Interfața configurează forțele aeriene ca prezență, descurajare, logistică și infrastructură de comandă adaptată fiecărui mediu strategic."
            : "Select a theater. The interface reframes the same Air Force as presence, deterrence, logistics, and command infrastructure tuned to a different strategic environment."}
        />

        <div className="mt-14 grid min-h-[760px] overflow-hidden border border-white/5 bg-[#020304] lg:grid-cols-[340px_1fr_400px]">
          {/* Left panel — theater selector */}
          <div className="z-10 flex flex-col border-b border-white/5 bg-black/40 p-4 backdrop-blur-xl lg:border-b-0 lg:border-r">
            {theaters.map((theater, index) => {
              const selected = active.id === theater.id;
              return (
                <button
                  key={theater.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "group relative min-h-28 overflow-hidden border border-transparent p-5 text-left transition-colors duration-300 mb-2 last:mb-0",
                    selected ? "bg-white/[0.04] text-white" : "text-white/40 hover:bg-white/[0.015] hover:text-white/70"
                  )}
                >
                  {selected && (
                    <motion.div
                      layoutId="af-theater-active"
                      className="absolute inset-0 border border-white/10"
                      style={{ boxShadow: "inset 0 0 12px rgba(125, 211, 252, 0.06)" }}
                      transition={{ type: "spring", stiffness: 320, damping: 34 }}
                    />
                  )}
                  <div className="relative z-10">
                    <div className="af-font-mono text-[9px] uppercase tracking-[0.2em]">{theater.region}</div>
                    <div className="af-font-display mt-2 text-xl font-black uppercase leading-none">{theater.name}</div>
                    <div className="mt-4 h-px w-full bg-white/5">
                      <div
                        className={cn("h-px transition-all duration-500", selected ? "w-full" : "w-10 group-hover:w-1/2")}
                        style={{ backgroundColor: theater.accent }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center — image */}
          <div className="relative min-h-[480px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={active.imageSrc}
                  alt={active.imageAlt}
                  fill
                  quality={90}
                  className="object-cover brightness-[0.35] grayscale-[0.2]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
              </motion.div>
            </AnimatePresence>

            {/* HUD overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020304] via-transparent to-[#020304]/40 pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id + "-label"}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="af-font-mono text-[9px] tracking-[0.2em] text-[#f5a623]/70 mb-2">{active.signal}</div>
                  <div className="af-font-display text-3xl font-black text-white leading-[0.9] mb-3">{active.headline}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right — detail panel */}
          <div className="z-10 flex flex-col border-t border-white/5 bg-[#020304]/80 p-6 backdrop-blur-xl lg:border-t-0 lg:border-l">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-detail"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full"
              >
                <div className="af-font-mono text-[9px] tracking-[0.2em] text-white/35 mb-4">{active.region}</div>
                <h3 className="af-font-display text-2xl font-black text-white mb-4 leading-[0.95]">{active.name}</h3>
                <p className="text-xs leading-relaxed text-white/45 mb-8">{active.description}</p>

                <div className="mt-auto space-y-3">
                  {active.metrics.map((m) => (
                    <div key={m.label} className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="af-font-mono text-[9px] tracking-[0.15em] text-white/40">{m.label}</span>
                      <span className="af-font-mono text-[10px] tracking-[0.1em] text-white/70">{m.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. AirForcePlatformShowcase
// ─────────────────────────────────────────────────────────────────────────────

export function AirForcePlatformShowcase({ platforms, locale = "en" }: { platforms: AirForcePlatform[]; locale?: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = platforms[activeIndex];
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_80%,rgba(245,166,35,0.06),transparent_50%)] pointer-events-none" />
      <div className="af-noise absolute inset-0 opacity-25 pointer-events-none" />

      <div className="relative mx-auto max-w-[1520px]">
        <AFSectionTitle
          label={isRo ? "PLATFORME DE LUPTĂ" : "COMBAT PLATFORMS"}
          titlePart1={isRo ? "ARSENAL" : "WEAPONS"}
          titlePart2={isRo ? "AERIAN" : "PLATFORMS"}
          body={isRo
            ? "De la superioritate aeriană la lovitură globală, mobilitate rapidă și război autonom — fiecare platformă reprezintă un pilon al puterii aeriene americane."
            : "From air superiority to global strike, rapid mobility, and autonomous warfare — each platform represents a pillar of American airpower."}
        />

        {/* Platform selector tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {platforms.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "af-font-mono px-4 py-2 text-[9px] tracking-[0.12em] border transition-all duration-300",
                activeIndex === i
                  ? "border-[#7dd3fc]/30 bg-[#7dd3fc]/8 text-white"
                  : "border-white/5 text-white/30 hover:text-white/60 hover:border-white/10"
              )}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Active platform display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-0 border border-white/5 bg-[#020304] lg:grid-cols-[1fr_480px]"
          >
            {/* Image */}
            <div className="relative min-h-[400px] lg:min-h-[520px] overflow-hidden">
              <Image
                src={active.imageSrc}
                alt={active.imageAlt}
                fill
                quality={90}
                className="object-cover brightness-[0.4] grayscale-[0.15]"
                sizes="(max-width: 1024px) 100vw, 60vw"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#020304]/80 pointer-events-none" />
              <div className="absolute bottom-8 left-8 z-10">
                <div className="af-font-mono text-[9px] tracking-[0.2em] text-[#f5a623]/70 mb-2">{active.designation}</div>
                <div className="af-font-display text-5xl sm:text-6xl font-black text-white leading-[0.85]">{active.name}</div>
              </div>
            </div>

            {/* Detail panel */}
            <div className="flex flex-col p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-white/5">
              <div className="af-font-mono text-[9px] tracking-[0.2em] text-[#7dd3fc]/60 mb-3">{active.capability}</div>
              <p className="text-sm leading-relaxed text-white/55 mb-8">{active.role}</p>

              <div className="grid grid-cols-2 gap-4 mt-auto">
                {active.specs.map((s) => (
                  <div key={s.label} className="border border-white/5 bg-white/[0.02] p-4">
                    <div className="af-font-mono text-[8px] tracking-[0.2em] text-white/35 mb-1">{s.label}</div>
                    <div className="af-font-display text-lg font-black text-white">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. AirForceHeritageTimeline
// ─────────────────────────────────────────────────────────────────────────────

export function AirForceHeritageTimeline({ events, locale = "en" }: { events: AirForceHeritageEvent[]; locale?: Locale }) {
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(245,166,35,0.06),transparent_50%)] pointer-events-none" />
      <div className="af-noise absolute inset-0 opacity-25 pointer-events-none" />

      <div className="relative mx-auto max-w-[1280px]">
        <AFSectionTitle
          label={isRo ? "MOȘTENIRE" : "HERITAGE"}
          titlePart1={isRo ? "ISTORIA" : "HISTORY"}
          titlePart2={isRo ? "ZBORULUI" : "OF FLIGHT"}
          body={isRo
            ? "De la Kitty Hawk la bombardierul stealth B-21 Raider — un secol de dominanță aeriană americană neîntreruptă."
            : "From Kitty Hawk to the B-21 Raider stealth bomber — a century of unbroken American air dominance."}
        />

        {/* Timeline spine */}
        <div className="relative">
          {/* Central vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/8 hidden md:block" />

          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={event.year}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className={cn(
                  "relative mb-12 last:mb-0 md:grid md:grid-cols-2 md:gap-12",
                  isLeft ? "" : "md:direction-rtl"
                )}
              >
                {/* Year node on spine */}
                <div className="absolute left-1/2 top-4 -translate-x-1/2 z-10 hidden md:flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-[#f5a623] shadow-[0_0_12px_rgba(245,166,35,0.3)]" />
                </div>

                {/* Content card */}
                <div className={cn(
                  "af-panel-tactical p-6 md:direction-ltr",
                  isLeft ? "md:col-start-1 md:pr-16" : "md:col-start-2 md:pl-16"
                )}>
                  <div className="af-font-mono text-[10px] tracking-[0.2em] text-[#f5a623]/70 mb-2">{event.year}</div>
                  <h3 className="af-font-display text-xl font-black text-white mb-3 leading-[0.95]">{event.title}</h3>
                  <p className="text-xs leading-relaxed text-white/45 mb-4">{event.description}</p>

                  {/* Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/5 mb-4">
                    <Image
                      src={event.imageSrc}
                      alt={event.title}
                      fill
                      className="object-cover brightness-[0.5] grayscale-[0.2] hover:brightness-[0.65] hover:scale-[1.02] transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020304]/60 to-transparent pointer-events-none" />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-[#f5a623]/50" />
                    <span className="af-font-mono text-[8px] tracking-[0.15em] text-white/35">{event.significance}</span>
                  </div>
                </div>

                {/* Empty opposite column for spacing */}
                <div className={cn("hidden md:block", isLeft ? "md:col-start-2" : "md:col-start-1")} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. AirForceBasesSection
// ─────────────────────────────────────────────────────────────────────────────

export function AirForceBasesSection({ bases, locale = "en" }: { bases: AirForceBase[]; locale?: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = bases[activeIndex];
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 af-grid-plane opacity-15 pointer-events-none" />
      <div className="af-noise absolute inset-0 opacity-25 pointer-events-none" />

      <div className="relative mx-auto max-w-[1520px]">
        <AFSectionTitle
          label={isRo ? "BAZE & INSTALAȚII" : "BASES & INSTALLATIONS"}
          titlePart1={isRo ? "INFRASTRUCTURĂ" : "GLOBAL"}
          titlePart2={isRo ? "GLOBALĂ" : "FOOTPRINT"}
          body={isRo
            ? "De la deșertul Nevada la Europa de Vest și Pacificul de Vest — bazele aeriene americane formează o rețea globală de putere aeriană permanentă."
            : "From the Nevada desert to Western Europe and the Western Pacific — American air bases form a permanent global network of airpower readiness."}
        />

        <div className="grid gap-4 lg:grid-cols-[1fr_480px]">
          {/* Base grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {bases.map((base, i) => (
              <button
                key={base.name}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "group relative text-left border p-5 transition-all duration-300",
                  activeIndex === i
                    ? "border-white/10 bg-white/[0.04]"
                    : "border-white/5 bg-[#020304] hover:border-white/8"
                )}
              >
                {activeIndex === i && (
                  <motion.div
                    layoutId="af-base-active"
                    className="absolute inset-0 border"
                    style={{ borderColor: `${base.accent}30` }}
                    transition={{ type: "spring", stiffness: 320, damping: 34 }}
                  />
                )}
                <div className="relative z-10">
                  <MapPin size={12} className="text-white/30 mb-2" strokeWidth={1.5} />
                  <div className="af-font-display text-sm font-black text-white leading-none mb-1">{base.name}</div>
                  <div className="af-font-mono text-[8px] tracking-[0.15em] text-white/35">{base.location}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="border border-white/5 bg-[#020304] p-8"
            >
              <div className="af-font-mono text-[9px] tracking-[0.2em] mb-2" style={{ color: `${active.accent}90` }}>
                {active.role}
              </div>
              <h3 className="af-font-display text-3xl font-black text-white mb-2 leading-[0.95]">{active.name}</h3>
              <div className="af-font-mono text-[9px] tracking-[0.15em] text-white/35 mb-6">{active.location}</div>
              <p className="text-xs leading-relaxed text-white/45 mb-8">{active.description}</p>

              <div className="space-y-3">
                {active.stats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="af-font-mono text-[9px] tracking-[0.15em] text-white/40">{s.label}</span>
                    <span className="af-font-mono text-[10px] tracking-[0.1em] text-white/70">{s.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. AirForceFutureStack
// ─────────────────────────────────────────────────────────────────────────────

export function AirForceFutureStack({ programs, locale = "en" }: { programs: AirForceFutureProgram[]; locale?: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = programs[activeIndex];
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(125,211,252,0.06),transparent_45%)] pointer-events-none" />
      <div className="af-noise absolute inset-0 opacity-25 pointer-events-none" />

      <div className="relative mx-auto max-w-[1520px]">
        <AFSectionTitle
          label={isRo ? "PROGRAME VIITOARE" : "FUTURE PROGRAMS"}
          titlePart1={isRo ? "GENERAȚIA" : "NEXT"}
          titlePart2={isRo ? "URMĂTOARE" : "GENERATION"}
          body={isRo
            ? "De la NGAD și CCA la arme hipersonice și modernizarea nucleară — programele care vor defini puterea aeriană americană în deceniile următoare."
            : "From NGAD and CCA to hypersonic weapons and nuclear modernization — the programs that will define American airpower for decades to come."}
        />

        <div className="grid gap-0 border border-white/5 bg-[#020304] lg:grid-cols-[1fr_440px]">
          {/* Image */}
          <div className="relative min-h-[400px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.label}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src={active.imageSrc}
                  alt={active.imageAlt}
                  fill
                  quality={90}
                  className="object-cover brightness-[0.3] grayscale-[0.3]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#020304]/60 pointer-events-none" />

            {/* Program selector */}
            <div className="absolute bottom-0 left-0 right-0 z-10 flex border-t border-white/5">
              {programs.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "flex-1 py-4 text-center af-font-mono text-[10px] tracking-[0.15em] transition-all duration-300 border-r border-white/5 last:border-r-0",
                    activeIndex === i
                      ? "bg-[#f5a623]/10 text-[#f5a623]"
                      : "bg-black/60 text-white/30 hover:text-white/60"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.label + "-detail"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col p-8 border-t lg:border-t-0 lg:border-l border-white/5"
            >
              <div className="af-font-mono text-[9px] tracking-[0.2em] text-[#f5a623]/60 mb-1">{active.status}</div>
              <div className="af-font-mono text-[10px] tracking-[0.15em] text-white/35 mb-4">{active.capability}</div>
              <h3 className="af-font-display text-2xl font-black text-white mb-4 leading-[0.95]">{active.title}</h3>
              <p className="text-xs leading-relaxed text-white/45 mb-8">{active.description}</p>

              <div className="grid grid-cols-2 gap-3 mt-auto">
                {active.specs.map((s) => (
                  <div key={s.label} className="border border-white/5 bg-white/[0.02] p-3">
                    <div className="af-font-mono text-[8px] tracking-[0.2em] text-white/35 mb-1">{s.label}</div>
                    <div className="af-font-display text-sm font-black text-white">{s.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. AirForceClosing
// ─────────────────────────────────────────────────────────────────────────────

export function AirForceClosing({ locale = "en" }: { locale?: Locale }) {
  const isRo = locale === "ro";

  const branches = [
    {
      href: "/military/navy",
      label: isRo ? "Marina" : "Navy",
      desc: isRo ? "Dominanță maritimă și proiectare de forță navală" : "Maritime dominance and carrier strike groups",
      icon: Anchor,
    },
    {
      href: "/military/space-force",
      label: isRo ? "Forțele Spațiale" : "Space Force",
      desc: isRo ? "Apărare orbitală și constelații de sateliți" : "Orbital defense and satellite constellations",
      icon: Satellite,
    },
    {
      href: "/military/global-bases",
      label: isRo ? "Baze Globale" : "Global Bases",
      desc: isRo ? "Infrastructură militară și logistică avansată" : "Global footprint and logistics network",
      icon: Network,
    },
    {
      href: "/military/intelligence",
      label: isRo ? "Informații Militare" : "Intelligence",
      desc: isRo ? "SIGINT, HUMINT și securitate cibernetică" : "SIGINT, HUMINT, and cyber capabilities",
      icon: Shield,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,166,35,0.10),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 af-grid-plane opacity-20 pointer-events-none" />
      <div className="af-noise absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-[1160px] text-center">
        <Plane className="mx-auto mb-8 text-[#f5a623]/50 animate-pulse" size={32} strokeWidth={1.2} />
        <h2 className="af-font-display text-4xl font-black uppercase leading-[0.95] md:text-7xl text-white">
          {isRo ? "Supremație aeriană fără egal." : "Air supremacy without equal."}
        </h2>
        <p className="mx-auto mt-9 max-w-3xl text-xs leading-relaxed text-white/50 md:text-sm">
          {isRo
            ? "Când o criză apare oriunde pe Pământ, primul lucru pe care îl aud națiunile este motoarele avioanelor americane. Forțele Aeriene sunt umbrela sub care operează toate celelalte forțe."
            : "When a crisis erupts anywhere on Earth, the first thing nations hear is the sound of American jet engines. The Air Force is the umbrella under which every other force operates."}
        </p>

        {/* Primary CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/military"
            className="group inline-flex h-12 items-center gap-3 border border-white/10 bg-white px-6 text-xs font-bold uppercase text-black transition-colors hover:bg-white/85"
          >
            {isRo ? "Prezentare militară" : "Military overview"}
            <ArrowUpRight size={15} strokeWidth={2} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Cross-links grid */}
        <div className="mt-20 border-t border-white/5 pt-16">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/35 mb-8">
            {isRo ? "Explorați alte dimensiuni militare" : "Explore other military dimensions"}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {branches.map((b) => {
              const Icon = b.icon;
              return (
                <Link
                  key={b.href}
                  href={b.href}
                  className="group relative block border border-white/5 bg-[#020304] p-5 hover:bg-[#060a0f] hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center border border-white/8 bg-black text-[#f5a623]/70 group-hover:text-white transition-colors">
                      <Icon size={14} strokeWidth={1.5} />
                    </div>
                    <span className="af-font-display text-sm font-bold uppercase text-white group-hover:text-[#f5a623] transition-colors">
                      {b.label}
                    </span>
                  </div>
                  <p className="text-[10px] leading-relaxed text-white/40 group-hover:text-white/60 transition-colors">
                    {b.desc}
                  </p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#f5a623]/50 transition-all duration-500 group-hover:w-full" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
