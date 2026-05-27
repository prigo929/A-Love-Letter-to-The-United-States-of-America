"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import {
  ArrowUpRight,
  Compass,
  Cpu,
  Eye,
  Globe,
  MapPin,
  Network,
  Satellite,
  Shield,
} from "lucide-react";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type {
  IntelligenceMetric,
  IntelligenceAgency,
  IntelligenceCapability,
  IntelligenceNode,
  IntelligenceHeritageEvent,
  IntelligenceFutureProgram,
} from "@/lib/data/intelligence-data";
import { SITE_IMAGES } from "@/lib/site-images";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. IntelligenceStyles
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligenceStyles() {
  return (
    <style jsx global>{`
      .intel-page {
        --intel-black: #000000;
        --intel-void: #030406;
        --intel-surface: #090b0e;
        --intel-elevated: #11141a;
        --intel-gold: #d4a44a;
        --intel-border: rgba(255, 255, 255, 0.05);
        background: var(--intel-black);
        color: white;
      }

      .intel-font-display {
        font-family: var(--font-archivo), Inter, system-ui, sans-serif;
        letter-spacing: -0.02em;
      }

      .intel-font-mono {
        font-family: var(--font-mono), "SFMono-Regular", Consolas, monospace;
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }

      .intel-glass {
        background: rgba(3, 4, 6, 0.85);
        backdrop-filter: blur(20px) saturate(1.1);
        -webkit-backdrop-filter: blur(20px) saturate(1.1);
        border: 1px solid rgba(255, 255, 255, 0.05);
      }

      .intel-panel {
        background: var(--intel-surface);
        border: 1px solid rgba(255, 255, 255, 0.04);
      }
    `}</style>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. IntelligencePageProgress — simple clean gold scroll progress
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligencePageProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] bg-white/[0.02]">
      <motion.div
        className="h-full origin-left bg-[#d4a44a]"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// IntelligenceSectionDivider — simple fade line divider
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligenceSectionDivider() {
  return (
    <div className="relative flex justify-center items-center py-8">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-px w-full max-w-[360px] origin-center bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function IntelCountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayVal, setDisplayVal] = useState("0");

  useEffect(() => {
    const cleanValue = value.replace(/,/g, "");
    const numericMatch = cleanValue.match(/^([\d.]+)(.*)$/);
    if (!numericMatch) {
      setDisplayVal(value);
      return;
    }
    const num = parseFloat(numericMatch[1]);
    const suffix = numericMatch[2] || "";

    if (inView) {
      const controls = animate(0, num, {
        duration: 2.2,
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

  return <span ref={ref} className="text-white font-light">{displayVal}</span>;
}

function IntelSectionTitle({
  label, title, subtitle, body, align = "center",
}: {
  label: string; title: string; subtitle?: string; body: string; align?: "center" | "left";
}) {
  const isCenter = align === "center";
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      className={cn("mb-20 max-w-5xl", isCenter ? "mx-auto text-center" : "text-left")}
    >
      <motion.div
        variants={fadeUp}
        className="intel-font-mono mb-5 tracking-[0.25em] text-[10px] text-[#d4a44a]"
      >
        {label}
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="intel-font-display text-[clamp(32px,6vw,80px)] font-bold tracking-tight leading-[0.95] text-white"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.div
          variants={fadeUp}
          className="intel-font-display text-[clamp(32px,6vw,80px)] font-bold tracking-tight leading-[0.95] text-white/10 mt-1"
        >
          {subtitle}
        </motion.div>
      )}
      <motion.p
        variants={fadeUp}
        className={cn(
          "mt-6 text-sm leading-[1.8] text-white/40 font-normal tracking-wide",
          isCenter ? "max-w-2xl mx-auto" : "max-w-xl"
        )}
      >
        {body}
      </motion.p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// IntelligenceFullBleed — clean cinematic parallax with gradients
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligenceFullBleed({
  imageSrc, imageAlt, caption, pullQuote,
}: {
  imageSrc: string; imageAlt: string; caption?: string; pullQuote?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div ref={ref} className="relative h-[65vh] min-h-[460px] overflow-hidden bg-black">
      <motion.div className="absolute inset-0 -inset-y-[15%]" style={{ y }}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          quality={90}
          className="object-cover brightness-[0.22] saturate-[0.6]"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black pointer-events-none" />

      {pullQuote && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <div className="mb-5 h-[2px] w-12 bg-[#d4a44a]/40" />
          <p className="intel-font-display text-[clamp(18px,3.5vw,48px)] font-light text-white/95 leading-[1.1] max-w-4xl tracking-tight">
            {pullQuote}
          </p>
          <div className="mt-5 h-[2px] w-12 bg-[#d4a44a]/40" />
        </motion.div>
      )}

      {caption && (
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <span className="intel-font-mono text-[9px] tracking-[0.2em] text-white/20">{caption}</span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. IntelligenceMetricStrip
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligenceMetricStrip({ metrics }: { metrics: IntelligenceMetric[] }) {
  return (
    <section className="relative bg-black border-t border-b border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => (
            <div key={m.label} className="border-r border-b border-white/[0.04] last:border-r-0 lg:[&:nth-child(3n)]:border-r-0">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col px-10 py-14"
              >
                <div className="intel-font-mono mb-5 tracking-[0.2em] text-[10px] text-[#d4a44a]/80">
                  {m.label}
                </div>
                <div className="text-[clamp(44px,6vw,80px)] font-light leading-none tracking-tight text-white mb-6">
                  <IntelCountUp value={m.value} />
                </div>
                <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-5" />
                <p className="text-white/40 text-[11px] leading-relaxed tracking-wide font-normal max-w-[280px]">
                  {m.detail}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. IntelligenceAgencyShowcase — clean cinematic agency dossier
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligenceAgencyShowcase({ agencies, locale = "en" }: { agencies: IntelligenceAgency[]; locale?: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = agencies[activeIndex];
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 sm:px-10 md:py-32 lg:px-16">
      <div className="relative mx-auto max-w-[1400px]">
        <IntelSectionTitle
          label={isRo ? "Comunitatea de informații" : "Intelligence Community"}
          title={isRo ? "Cele Cinci Mari" : "The Big Five"}
          subtitle={isRo ? "piloni ai rețelei" : "agencies"}
          body={isRo
            ? "O privire detaliată asupra agențiilor pilon care ancorează colectarea, decriptarea și protecția datelor strategice ale Americii."
            : "An in-depth look at the pillar agencies that anchor the gathering, analysis, and execution of American national intelligence."}
        />

        <div className="grid overflow-hidden border border-white/[0.04] bg-[#030406] lg:grid-cols-[280px_1fr] min-h-[600px] rounded-sm shadow-2xl">
          {/* Left Agency List */}
          <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.04] bg-white/[0.01]">
            {agencies.map((agency, index) => {
              const selected = activeIndex === index;
              return (
                <button
                  key={agency.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative flex flex-col justify-center text-left px-8 py-8 transition-colors duration-400 border-b border-white/[0.03] last:border-b-0",
                    selected ? "bg-white/[0.03]" : "hover:bg-white/[0.01]"
                  )}
                >
                  {selected && (
                    <motion.div
                      layoutId="intel-agency-indicator"
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#d4a44a]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <div className="intel-font-mono text-[8px] tracking-[0.15em] text-white/30 mb-2">{agency.specialty.split(" ")[0]}</div>
                  <div className={cn(
                    "intel-font-display text-lg font-semibold tracking-tight transition-colors",
                    selected ? "text-white" : "text-white/40"
                  )}>
                    {agency.shortName}
                  </div>
                  <div className="text-[10px] text-white/20 mt-1 truncate max-w-[200px]">{agency.role}</div>
                </button>
              );
            })}
          </div>

          {/* Right Dossier Panel */}
          <div className="grid lg:grid-cols-2 min-h-[500px]">
            {/* Details Panel */}
            <div className="flex flex-col p-10 lg:p-14 justify-between border-b lg:border-b-0 lg:border-r border-white/[0.04]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id + "-info"}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    <div className="intel-font-mono text-[9px] tracking-[0.2em] text-[#d4a44a] mb-3">{active.specialty}</div>
                    <h3 className="intel-font-display text-3xl font-bold tracking-tight text-white mb-3 leading-tight">{active.name}</h3>
                    <div className="text-[12px] text-white/45 italic mb-8 font-light">{active.role}</div>
                    <p className="text-[13px] leading-[1.8] text-white/40 tracking-wide font-normal mb-8 max-w-md">{active.description}</p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/[0.04]">
                    {active.stats.map((s) => (
                      <div key={s.label} className="flex items-center justify-between text-xs">
                        <span className="intel-font-mono text-[9px] tracking-[0.1em] text-white/35">{s.label}</span>
                        <span className="text-white/70 font-medium tracking-wide">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Visual Photography Side (No AI, real photographic asset) */}
            <div className="relative min-h-[300px] lg:min-h-0 bg-black overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id + "-img"}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1.05 }}
                  exit={{ opacity: 0, scale: 1.0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.imageSrc}
                    alt={active.name}
                    fill
                    className="object-cover brightness-[0.25] saturate-[0.55]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent pointer-events-none hidden lg:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. IntelligenceCapabilityGrid — clean expanding capability cards
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligenceCapabilityGrid({ capabilities, locale = "en" }: { capabilities: IntelligenceCapability[]; locale?: Locale }) {
  const isRo = locale === "ro";
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 sm:px-10 md:py-32 lg:px-16">
      <div className="relative mx-auto max-w-[1400px]">
        <IntelSectionTitle
          label={isRo ? "Capabilități tactice" : "Tactical Disciplines"}
          title={isRo ? "Domenii de" : "Intelligence"}
          subtitle={isRo ? "colectare" : "disciplines"}
          body={isRo
            ? "Cele cinci modalități fundamentale prin care informațiile sunt obținute, analizate și transformate în planuri strategice."
            : "The five distinct modes of intelligence operations that feed critical decisions at every level of national command."}
        />

        <div className="flex flex-col lg:flex-row gap-4 mt-16 lg:h-[450px]">
          {capabilities.map((cap, i) => {
            const isHovered = hoveredIdx === i;
            const isAnyHovered = hoveredIdx !== null;

            return (
              <motion.div
                key={cap.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={cn(
                  "group relative overflow-hidden intel-panel p-8 flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none min-h-[200px] lg:min-h-0 rounded-sm",
                  isHovered ? "lg:flex-[3.5] bg-white/[0.04] border-white/10" : 
                  isAnyHovered ? "lg:flex-[0.6] opacity-30 bg-black/50 border-white/[0.02]" : "lg:flex-1 bg-white/[0.015] border-white/[0.03]"
                )}
              >
                {/* Clean background subtle glow */}
                <div 
                  className={cn(
                    "absolute top-0 right-0 h-40 w-40 rounded-full blur-[90px] pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-10",
                    cap.accent === "#38bdf8" ? "bg-sky-500" :
                    cap.accent === "#f5a623" ? "bg-amber-500" :
                    cap.accent === "#10b981" ? "bg-emerald-500" :
                    cap.accent === "#a78bfa" ? "bg-violet-500" :
                    "bg-red-500"
                  )}
                />

                {/* Dot and kicker */}
                <div className="flex items-center gap-3 shrink-0 mb-6 lg:mb-0">
                  <div className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all duration-500",
                    isHovered ? "opacity-100 scale-125" : "opacity-40",
                    cap.accent === "#38bdf8" ? "bg-sky-400" :
                    cap.accent === "#f5a623" ? "bg-amber-400" :
                    cap.accent === "#10b981" ? "bg-emerald-400" :
                    cap.accent === "#a78bfa" ? "bg-violet-400" :
                    "bg-red-400"
                  )} />
                  <span className="intel-font-mono text-[9px] tracking-[0.15em] text-white/30">
                    {cap.kicker}
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="flex-1 flex flex-col justify-center my-4 lg:my-0">
                  <h3 className={cn(
                    "intel-font-display font-semibold text-white leading-[0.95] tracking-tight transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isHovered ? "text-2xl sm:text-3xl mb-4" : "text-xl sm:text-2xl lg:text-lg xl:text-xl",
                    !isHovered && isAnyHovered ? "lg:opacity-50" : ""
                  )}>
                    {cap.title}
                  </h3>
                  
                  <div className={cn(
                    "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
                    isHovered ? "opacity-100 max-h-[220px]" : "lg:opacity-0 lg:max-h-0"
                  )}>
                    <p className="leading-[1.7] text-[12px] text-white/40 tracking-wide font-normal max-w-md">
                      {cap.description}
                    </p>
                  </div>
                </div>

                {/* Accent stat tag */}
                <div className="shrink-0 mt-4 lg:mt-0">
                  <span className={cn(
                    "intel-font-mono text-[9px] tracking-[0.12em] transition-all duration-500",
                    isHovered ? "opacity-95" : "opacity-35",
                    cap.accent === "#38bdf8" ? "text-sky-300" :
                    cap.accent === "#f5a623" ? "text-amber-300" :
                    cap.accent === "#10b981" ? "text-emerald-300" :
                    cap.accent === "#a78bfa" ? "text-violet-300" :
                    "text-red-300"
                  )}>
                    {cap.stat}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. IntelligenceOperationsConsole — Global Nodes Selector
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligenceOperationsConsole({ nodes, locale = "en" }: { nodes: IntelligenceNode[]; locale?: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = nodes[activeIndex];
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 sm:px-10 md:py-32 lg:px-16">
      <div className="relative mx-auto max-w-[1400px]">
        <IntelSectionTitle
          label={isRo ? "Infrastructură globală" : "Global Installations"}
          title={isRo ? "Noduri de" : "Interception"}
          subtitle={isRo ? "interceptare" : "installations"}
          body={isRo
            ? "Instalații de colectare a semnalelor amplasate strategic pentru supravegherea continuă a emisferelor planetei."
            : "Strategic ground stations and cryptologic hubs placed globally to feed continuous signal data into national servers."}
        />

        <div className="grid overflow-hidden border border-white/[0.04] bg-[#030406] lg:grid-cols-[300px_1fr] min-h-[500px] rounded-sm">
          {/* Left node list */}
          <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.04] bg-white/[0.01]">
            {nodes.map((node, index) => {
              const selected = activeIndex === index;
              return (
                <button
                  key={node.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative flex flex-col justify-center text-left px-8 py-7 transition-colors duration-300 border-b border-white/[0.03] last:border-b-0",
                    selected ? "bg-white/[0.03]" : "hover:bg-white/[0.01]"
                  )}
                >
                  {selected && (
                    <motion.div
                      layoutId="intel-node-indicator"
                      className="absolute left-0 top-0 bottom-0 w-[2.5px]"
                      style={{ background: node.accent }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <div className="intel-font-mono text-[8px] tracking-[0.15em] text-white/30 mb-2">{node.location}</div>
                  <div className={cn(
                    "intel-font-display text-sm font-semibold tracking-tight transition-colors",
                    selected ? "text-white" : "text-white/40"
                  )}>
                    {node.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right node details */}
          <div className="flex flex-col p-10 lg:p-14 justify-between bg-black/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={11} className="text-white/40" strokeWidth={1.5} />
                    <span className="intel-font-mono text-[9px] tracking-[0.15em] text-white/30">{active.location}</span>
                  </div>
                  <h3 className="intel-font-display text-2xl font-bold tracking-tight text-white mb-2 leading-none">{active.name}</h3>
                  <div className="intel-font-mono text-[8px] tracking-[0.2em] mb-8" style={{ color: active.accent }}>{active.role}</div>
                  <p className="text-[13px] leading-[1.8] text-white/40 tracking-wide font-normal max-w-2xl mb-8">{active.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/[0.04]">
                  {active.stats.map((s) => (
                    <div key={s.label} className="intel-panel p-5 rounded-sm">
                      <div className="intel-font-mono text-[8px] tracking-[0.15em] text-white/35 mb-2">{s.label}</div>
                      <div className="intel-font-display text-sm font-semibold text-white leading-none">{s.value}</div>
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
// 7. IntelligenceHeritageTimeline — clean high-contrast historical events
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligenceHeritageTimeline({ events, locale = "en" }: { events: IntelligenceHeritageEvent[]; locale?: Locale }) {
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 sm:px-10 md:py-32 lg:px-16">
      <div className="relative mx-auto max-w-[1200px]">
        <IntelSectionTitle
          label={isRo ? "Puncte de cotitură" : "Heritage"}
          title={isRo ? "Istoric & Moștenire" : "Intelligence"}
          subtitle={isRo ? "pe teren" : "heritage"}
          body={isRo
            ? "Evoluția programelor și colectării de informații, de la înființarea serviciilor în 1947 până la capabilitățile cibernetice moderne."
            : "The milestones and pivotal events that shaped the capabilities and legal frameworks of the U.S. intelligence community."}
        />

        <div className="relative mt-20">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/[0.06]" />

          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={event.year}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                className={cn(
                  "relative mb-20 last:mb-0 pl-14 md:pl-0",
                  "md:grid md:grid-cols-2 md:gap-16"
                )}
              >
                {/* Gold timeline node dot */}
                <div className="absolute left-6 md:left-1/2 top-2 -translate-x-1/2 z-10">
                  <div className="rounded-full ring-[3px] ring-black h-3.5 w-3.5 bg-[#d4a44a]" />
                </div>

                {/* Content card */}
                <div className={cn(
                  "md:col-span-1",
                  isLeft ? "md:col-start-1 md:pr-6" : "md:col-start-2 md:pl-6"
                )}>
                  <div className="intel-font-mono text-xs font-semibold text-[#d4a44a] mb-2">{event.year}</div>

                  {event.imageSrc && (
                    <div className="relative w-full aspect-[16/9] overflow-hidden mb-5 rounded-sm bg-[#050608]">
                      <Image
                        src={event.imageSrc}
                        alt={event.title}
                        fill
                        className="object-cover brightness-[0.25] saturate-[0.6] transition-all duration-700 hover:brightness-[0.4] hover:scale-102"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        placeholder="blur"
                        blurDataURL={BLUR_PLACEHOLDER}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    </div>
                  )}

                  <h3 className="intel-font-display text-lg font-bold tracking-tight text-white mb-2 leading-snug">{event.title}</h3>
                  <p className="text-[12px] leading-[1.7] text-white/40 tracking-wide font-normal mb-3 max-w-xl">{event.description}</p>
                  <span className="intel-font-mono text-[8px] tracking-[0.1em] text-white/25">{event.significance}</span>
                </div>

                {/* Empty column for balancing */}
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
// 8. IntelligenceFutureStack — Clean Programs Tab Selector
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligenceFutureStack({ programs, locale = "en" }: { programs: IntelligenceFutureProgram[]; locale?: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = programs[activeIndex];
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 sm:px-10 md:py-32 lg:px-16">
      <div className="relative mx-auto max-w-[1400px]">
        <IntelSectionTitle
          label={isRo ? "Capabilități de viitor" : "Next Gen Projects"}
          title={isRo ? "Programe" : "The Future"}
          subtitle={isRo ? "clasificate" : "stack"}
          body={isRo
            ? "Inițiativele tehnologice care vor asigura prelucrarea și criptarea avansată în următoarele decenii."
            : "The critical technological systems under development that will define cryptanalysis and global sensor networks."}
        />

        <div className="grid overflow-hidden border border-white/[0.04] bg-[#030406] lg:grid-cols-[1fr_380px] rounded-sm">
          {/* Detail Side */}
          <div className="flex flex-col p-10 lg:p-14 justify-between border-b lg:border-b-0 lg:border-r border-white/[0.04] bg-white/[0.01]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="intel-font-mono text-[9px] tracking-[0.15em] text-[#d4a44a]">{active.status}</span>
                  </div>
                  <h3 className="intel-font-display text-2xl font-bold tracking-tight text-white mb-4 leading-tight">{active.title}</h3>
                  <div className="intel-font-mono text-[9px] tracking-[0.12em] text-[#38bdf8] mb-6">{active.capability}</div>
                  <p className="text-[13px] leading-[1.8] text-white/40 tracking-wide font-normal max-w-2xl mb-10">{active.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  {active.specs.map((s) => (
                    <div key={s.label} className="intel-panel p-4 rounded-sm">
                      <div className="intel-font-mono text-[7px] tracking-[0.15em] text-white/30 mb-1.5">{s.label}</div>
                      <div className="intel-font-display text-sm font-semibold text-white leading-none">{s.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* List Program Selector Side */}
          <div className="flex flex-col bg-black/40">
            {programs.map((p, i) => (
              <button
                key={p.label}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "relative text-left px-8 py-8 transition-colors duration-300 border-b border-white/[0.04] last:border-b-0",
                  activeIndex === i
                    ? "bg-white/[0.03]"
                    : "hover:bg-white/[0.01]"
                )}
              >
                {activeIndex === i && (
                  <motion.div
                    layoutId="intel-program-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-[#d4a44a]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <div className="intel-font-mono text-[8px] tracking-[0.15em] text-white/30 mb-2">{p.status}</div>
                <div className={cn(
                  "intel-font-display text-md font-semibold tracking-tight transition-colors",
                  activeIndex === i ? "text-white" : "text-white/45"
                )}>
                  {p.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. IntelligenceClosing
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligenceClosing({ locale = "en" }: { locale?: Locale }) {
  const isRo = locale === "ro";

  const branches = [
    {
      href: "/military/navy",
      label: isRo ? "Marina" : "Navy",
      desc: isRo ? "Dominanță maritimă și proiectare de forță navală" : "Maritime dominance and carrier strike groups",
    },
    {
      href: "/military/space-force",
      label: isRo ? "Forțele Spațiale" : "Space Force",
      desc: isRo ? "Apărare orbitală și constelații de sateliți" : "Orbital defense and satellite constellations",
    },
    {
      href: "/military/global-bases",
      label: isRo ? "Baze Globale" : "Global Bases",
      desc: isRo ? "Infrastructură militară și logistică" : "Global footprint and logistics network",
    },
    {
      href: "/military/air-force",
      label: isRo ? "Forțele Aeriene" : "Air Force",
      desc: isRo ? "Superioritate aeriană și atac strategic" : "Air superiority and strategic global strike",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16 border-t border-white/[0.04]">
      <div className="relative mx-auto max-w-[1000px] text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2
            variants={fadeUp}
            className="intel-font-display text-[clamp(28px,6vw,72px)] font-bold tracking-tight leading-[0.95] text-white"
          >
            {isRo ? "Informația este" : "Information is"}
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="intel-font-display text-[clamp(28px,6vw,72px)] font-bold tracking-tight leading-[0.95] text-white/10 mt-1"
          >
            {isRo ? "descurajarea supremă." : "the ultimate deterrent."}
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-xs leading-[1.8] text-white/40 tracking-wide font-normal"
          >
            {isRo
              ? "Succesul oricărei operațiuni militare începe cu un semnal interceptat, o sursă verificată sau o coordonată de satelit. Rețeaua de informații a SUA este scutul nevăzut sub care se desfășoară apărarea globală."
              : "The success of any joint operation rests on an intercepted signal, a verified source, or a precise coordinate. The U.S. intelligence community forms the ultimate invisible shield of global deterrence."}
          </motion.p>
        </motion.div>

        {/* CTA Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/military"
            className="group inline-flex h-11 items-center gap-3 bg-white px-6 text-[10px] font-semibold uppercase tracking-[0.1em] text-black transition-opacity hover:opacity-85 rounded-sm shadow-md"
          >
            {isRo ? "Prezentare militară" : "Military overview"}
            <ArrowUpRight size={13} strokeWidth={2.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Dynamic Nav Cross-links */}
        <div className="mt-20 pt-16 border-t border-white/[0.04]">
          <div className="intel-font-mono text-[9px] tracking-[0.25em] text-white/20 mb-8">
            {isRo ? "Explorați alte dimensiuni militare" : "Explore other military dimensions"}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            {branches.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="group intel-panel p-6 hover:bg-white/[0.02] transition-all duration-300 rounded-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="intel-font-display text-sm font-semibold text-white/50 group-hover:text-white transition-colors">
                    {b.label}
                  </span>
                </div>
                <p className="text-[11px] leading-[1.6] text-white/25 group-hover:text-white/45 transition-colors font-normal">
                  {b.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
