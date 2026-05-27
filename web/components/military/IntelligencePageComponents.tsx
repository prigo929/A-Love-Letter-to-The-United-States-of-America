"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  Globe,
  MapPin,
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. IntelligenceStyles — Clean, elegant typography and layouts
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligenceStyles() {
  return (
    <style jsx global>{`
      .intel-page {
        --intel-black: #000000;
        --intel-void: #030406;
        --intel-surface: #090b0e;
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
// 2. IntelligencePageProgress — Minimal scroll progress
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
// IntelligenceSectionDivider
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligenceSectionDivider() {
  return (
    <div className="relative flex justify-center items-center py-6">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="h-px w-full max-w-[280px] origin-center bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Count Up Counter
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
        duration: 2.0,
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

  return <span ref={ref} className="text-white font-extralight">{displayVal}</span>;
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
        className="intel-font-mono mb-4 tracking-[0.3em] text-[9px] text-[#d4a44a]"
      >
        {label}
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="intel-font-display text-[clamp(28px,5vw,72px)] font-bold tracking-tight leading-[0.95] text-white"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.div
          variants={fadeUp}
          className="intel-font-display text-[clamp(28px,5vw,72px)] font-bold tracking-tight leading-[0.95] text-white/10 mt-1"
        >
          {subtitle}
        </motion.div>
      )}
      <motion.p
        variants={fadeUp}
        className={cn(
          "mt-6 text-sm leading-[1.8] text-white/40 tracking-wide font-normal",
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
    <div ref={ref} className="relative h-[55vh] min-h-[380px] overflow-hidden bg-black">
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
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black pointer-events-none" />

      {pullQuote && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <div className="mb-5 h-[2px] w-12 bg-[#d4a44a]/40" />
          <p className="intel-font-display text-[clamp(18px,3.5vw,40px)] font-light text-white/90 leading-[1.1] max-w-4xl tracking-tight">
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
// 3. IntelligenceMetricStrip — Exact MinimalistStat replica grid
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligenceMetricStrip({ metrics }: { metrics: IntelligenceMetric[] }) {
  return (
    <section className="relative bg-black border-t border-b border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-[1440px]">
        {/* 2x3 or 3x2 High Contrast Grid representing Tesla-spec page */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => (
            <div key={m.label} className="border-r border-b border-white/[0.04] last:border-r-0 lg:[&:nth-child(3n)]:border-r-0">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 1.0, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col px-8 py-12"
              >
                {/* Uppercase White wide-tracking label matching main page MinimalistStat */}
                <div className="intel-font-mono text-[10px] tracking-[0.3em] font-black text-white mb-6">
                  {m.label}
                </div>

                {/* Thin, giant count-up number matching MinimalistStat */}
                <div className="flex items-baseline gap-1">
                  <span className="text-[clamp(48px,7vw,96px)] font-extralight tracking-tighter leading-none">
                    <IntelCountUp value={m.value} />
                  </span>
                </div>

                {/* Linear-gradient line divider under the numbers */}
                <div className="mt-6 mb-4 h-px w-full" style={{
                  background: 'linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.05), transparent)'
                }} />

                {/* Muted sublabel detailing stat context */}
                <div className="intel-font-display max-w-[260px] leading-relaxed opacity-60 text-[11px] font-medium tracking-wide text-white/60">
                  {m.detail}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. IntelligenceAgencyShowcase — Split Editorial Layout (Highly Unique)
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

        <div className="grid overflow-hidden border border-white/[0.04] bg-[#030406] lg:grid-cols-[320px_1fr] min-h-[580px] rounded-sm shadow-2xl">
          {/* Left: Interactive list representing a dossier directory */}
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
                  <div className="text-[10px] text-white/20 mt-1 truncate max-w-[220px]">{agency.role}</div>
                </button>
              );
            })}
          </div>

          {/* Right: Immersive content card, using full background photography with overlay */}
          <div className="relative min-h-[500px] flex flex-col justify-end p-8 sm:p-12 lg:p-16 overflow-hidden">
            {/* Background Image with Ken-Burns style slow transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-bg"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={active.imageSrc}
                  alt={active.name}
                  fill
                  className="object-cover brightness-[0.16] saturate-[0.6] scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
              </motion.div>
            </AnimatePresence>

            {/* Heavy gradient vignette overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id + "-details"}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="intel-font-mono text-[9px] tracking-[0.25em] text-[#d4a44a] mb-4">{active.specialty}</div>
                  <h3 className="intel-font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight max-w-2xl">{active.name}</h3>
                  <div className="text-sm text-white/50 italic mb-8 font-light max-w-xl">{active.role}</div>
                  <p className="text-sm leading-[1.8] text-white/40 tracking-wide font-normal max-w-xl mb-12">{active.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-3xl">
                    {active.stats.map((s) => (
                      <div key={s.label} className="flex flex-col">
                        <span className="intel-font-mono text-[8px] tracking-[0.15em] text-white/30 mb-1.5">{s.label}</span>
                        <span className="text-xs font-semibold text-white/85 tracking-wide">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. IntelligenceCapabilityGrid — Alternating Full-Width Rows (Highly Unique)
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligenceCapabilityGrid({ capabilities, locale = "en" }: { capabilities: IntelligenceCapability[]; locale?: Locale }) {
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 sm:px-10 md:py-32 lg:px-16">
      <div className="relative mx-auto max-w-[1200px]">
        <IntelSectionTitle
          label={isRo ? "Capabilități tactice" : "Tactical Disciplines"}
          title={isRo ? "Domenii de" : "Intelligence"}
          subtitle={isRo ? "colectare" : "disciplines"}
          body={isRo
            ? "Cele cinci modalități fundamentale prin care informațiile sunt obținute, analizate și transformate în planuri strategice."
            : "The five distinct modes of intelligence operations that feed critical decisions at every level of national command."}
        />

        {/* Large, high-end alternating vertical content layout instead of simple cards */}
        <div className="mt-20 space-y-16 lg:space-y-24">
          {capabilities.map((cap, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={cap.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "flex flex-col lg:flex-row items-start lg:items-center justify-between pb-12 border-b border-white/[0.04] last:border-b-0 gap-8 lg:gap-16",
                  isEven ? "" : "lg:flex-row-reverse"
                )}
              >
                {/* Large horizontal index number */}
                <div className="intel-font-display text-7xl sm:text-8xl font-black text-white/5 tracking-tighter select-none lg:w-44 shrink-0">
                  {cap.kicker.split(" ")[0]}
                </div>

                {/* Capability Content */}
                <div className="flex-1 max-w-xl">
                  <span className="intel-font-mono text-[9px] tracking-[0.2em] text-[#d4a44a] mb-3 block">{cap.kicker}</span>
                  <h3 className="intel-font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4 leading-tight">{cap.title}</h3>
                  <p className="text-[13px] leading-[1.85] text-white/40 tracking-wide font-normal mb-6">
                    {cap.description}
                  </p>
                  <span className="intel-font-mono text-[9px] tracking-[0.12em] text-white/30 border border-white/10 px-3 py-1 rounded-full bg-white/[0.01]">
                    {cap.stat}
                  </span>
                </div>

                {/* Sleek inline indicator */}
                <div className="hidden lg:block h-px w-8 bg-white/10 shrink-0" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. IntelligenceOperationsConsole — Installation Map List Flow
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligenceOperationsConsole({ nodes, locale = "en" }: { nodes: IntelligenceNode[]; locale?: Locale }) {
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

        {/* Sequential mapping flow instead of tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {nodes.map((node, index) => (
            <motion.div
              key={node.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="intel-panel p-8 flex flex-col justify-between min-h-[300px] rounded-sm border-l-2 border-white/10 hover:border-l-[#d4a44a] transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={11} className="text-white/30" />
                  <span className="intel-font-mono text-[8px] tracking-[0.15em] text-white/30">{node.location}</span>
                </div>
                <h3 className="intel-font-display text-lg font-bold tracking-tight text-white mb-2">{node.name}</h3>
                <div className="intel-font-mono text-[7px] tracking-[0.2em] mb-5 uppercase text-[#d4a44a]/80 font-semibold">{node.role}</div>
                <p className="text-[12px] leading-[1.7] text-white/40 tracking-wide font-normal">{node.description}</p>
              </div>

              <div className="flex flex-col gap-2 pt-6 border-t border-white/[0.04] mt-6">
                {node.stats.map((s) => (
                  <div key={s.label} className="flex justify-between items-center text-[10px]">
                    <span className="intel-font-mono text-white/25">{s.label}</span>
                    <span className="text-white/60 font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. IntelligenceHeritageTimeline — Horizontal Drag/Scroll Reel (Highly Unique)
// ─────────────────────────────────────────────────────────────────────────────

export function IntelligenceHeritageTimeline({ events, locale = "en" }: { events: IntelligenceHeritageEvent[]; locale?: Locale }) {
  const isRo = locale === "ro";
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <IntelSectionTitle
          label={isRo ? "Puncte de cotitură" : "Heritage"}
          title={isRo ? "Istoric & Moștenire" : "Intelligence"}
          subtitle={isRo ? "pe teren" : "heritage"}
          body={isRo
            ? "Evoluția programelor și colectării de informații, de la înființarea serviciilor în 1947 până la capabilitățile cibernetice moderne."
            : "The milestones and pivotal events that shaped the capabilities and legal frameworks of the U.S. intelligence community."}
        />
      </div>

      {/* Horizontal scrolling timeline filmstrip */}
      <div className="relative mt-16 overflow-hidden">
        {/* Shadow overlays for smooth edge fading */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Scroll Container */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-6 px-12 md:px-24 pb-12 snap-x snap-mandatory scrollbar-none select-none"
          style={{ scrollbarWidth: "none" }}
        >
          {events.map((event, i) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="w-[320px] sm:w-[380px] shrink-0 snap-center intel-panel p-6 sm:p-8 flex flex-col justify-between min-h-[460px] rounded-sm hover:border-white/10 transition-colors duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="intel-font-mono text-xl font-bold text-[#d4a44a] tracking-wider">{event.year}</span>
                  <span className="intel-font-mono text-[7px] tracking-[0.15em] text-white/20">[ DOSSIER_{i+1} ]</span>
                </div>

                {event.imageSrc && (
                  <div className="relative w-full aspect-[16/10] overflow-hidden mb-6 rounded-sm bg-black/40">
                    <Image
                      src={event.imageSrc}
                      alt={event.title}
                      fill
                      className="object-cover brightness-[0.25] saturate-[0.6] hover:brightness-[0.4] transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, 380px"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                    />
                  </div>
                )}

                <h3 className="intel-font-display text-lg font-bold tracking-tight text-white mb-2 leading-snug">{event.title}</h3>
                <p className="text-[12px] leading-[1.7] text-white/40 tracking-wide font-normal mb-4">{event.description}</p>
              </div>

              <div className="pt-4 border-t border-white/[0.04] mt-4">
                <span className="intel-font-mono text-[8px] tracking-[0.1em] text-white/25 leading-normal block">
                  {event.significance}
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
// 8. IntelligenceFutureStack — Technical Blueprint Grid (Highly Unique)
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

        {/* 2-Column Split Briefing slide deck */}
        <div className="grid overflow-hidden border border-white/[0.04] bg-[#030406] lg:grid-cols-[300px_1fr] min-h-[500px] mt-16 rounded-sm shadow-2xl">
          {/* Left panel selectors */}
          <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.04] bg-white/[0.01]">
            {programs.map((p, i) => {
              const selected = activeIndex === i;
              return (
                <button
                  key={p.label}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "relative text-left px-8 py-8 transition-all duration-300 border-b border-white/[0.03] last:border-b-0 flex flex-col justify-center",
                    selected ? "bg-white/[0.03]" : "hover:bg-white/[0.01]"
                  )}
                >
                  {selected && (
                    <motion.div
                      layoutId="intel-program-indicator"
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#d4a44a]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <div className="intel-font-mono text-[8px] tracking-[0.15em] text-white/30 mb-2">{p.status}</div>
                  <div className={cn(
                    "intel-font-display text-md font-semibold tracking-tight transition-colors",
                    selected ? "text-white" : "text-white/45"
                  )}>
                    {p.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right panel presentation dossier */}
          <div className="relative flex flex-col justify-end p-8 sm:p-12 lg:p-16 overflow-hidden min-h-[500px]">
            {/* Background image related to the active program */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.label + "-bg"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={active.imageSrc}
                  alt={active.title}
                  fill
                  className="object-cover brightness-[0.13] saturate-[0.4] scale-102"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
              </motion.div>
            </AnimatePresence>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

            <div className="relative z-10 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.label + "-details"}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                    <span className="intel-font-mono text-[8px] tracking-[0.15em] text-[#d4a44a]">{active.status}</span>
                    <span className="intel-font-mono text-[8px] text-white/20 tracking-wider">CODE: {active.label.toUpperCase()}</span>
                  </div>
                  <h3 className="intel-font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 leading-tight">{active.title}</h3>
                  <div className="intel-font-mono text-[9px] tracking-[0.12em] text-white/40 mb-6">{active.capability}</div>
                  <p className="text-[13px] leading-[1.85] text-white/40 tracking-wide font-normal max-w-2xl mb-10">{active.description}</p>

                  {/* Sleek Technical specs list */}
                  <div className="border-t border-white/10 divide-y divide-white/[0.04] max-w-3xl">
                    {active.specs.map((s) => (
                      <div key={s.label} className="grid grid-cols-1 sm:grid-cols-[200px_1fr] py-3.5 items-center">
                        <span className="intel-font-mono text-[8px] tracking-[0.15em] text-[#d4a44a]">{s.label}</span>
                        <span className="intel-font-display text-[13px] text-white/70 font-normal mt-1 sm:mt-0">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
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
