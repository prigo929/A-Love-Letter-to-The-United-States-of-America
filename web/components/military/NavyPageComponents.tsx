"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import {
  Anchor,
  ArrowUpRight,
  Cpu,
  Crosshair,
  Gauge,
  Heart,
  MapPin,
  Network,
  Plane,
  Satellite,
  Shield,
  Ship,
  Target,
  Waves,
} from "lucide-react";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type {
  NavyAirWingSquadron,
  NavyBase,
  NavyCapability,
  NavyFleetComparison,
  NavyFutureProgram,
  NavyHeritageEvent,
  NavyHumanitarianMission,
  NavyMetric,
  NavyPlatform,
  NavySpecWarUnit,
  NavyTheater,
  NavyVisualPanel,
  NavyWeaponSystem,
} from "@/lib/data/navy-data";
import { getNavyWeapons } from "@/lib/data/navy-data";
import { SITE_IMAGES } from "@/lib/site-images";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. NavyStyles — Dark Sonar & Black-Ops Styling Architecture
// ─────────────────────────────────────────────────────────────────────────────

export function NavyStyles() {
  return (
    <style jsx global>{`
      .navy-page {
        --navy-black: #000000;
        --navy-void: #050608;
        --navy-surface: #0a0c10;
        --navy-elevated: #12151b;
        --navy-panel: rgba(8, 10, 14, 0.82);
        --navy-border: rgba(255, 255, 255, 0.06);
        --navy-blue: #7d93ab;
        background: var(--navy-black);
        color: white;
      }

      .navy-font-display {
        font-family: var(--font-archivo), Inter, system-ui, sans-serif;
        letter-spacing: -0.035em;
        text-transform: uppercase;
      }

      .navy-font-mono {
        font-family: var(--font-mono), "SFMono-Regular", Consolas, monospace;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .navy-grid-plane {
        background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
        background-size: 28px 28px;
      }

      .navy-noise::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0.06;
        mix-blend-mode: overlay;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E");
      }

      .navy-cinematic-line {
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.28), transparent);
      }

      .navy-glass-premium {
        background: rgba(8, 10, 14, 0.82);
        backdrop-filter: blur(40px) saturate(1.2);
        -webkit-backdrop-filter: blur(40px) saturate(1.2);
        border: 1px solid rgba(255, 255, 255, 0.06);
      }

      .navy-panel-tactical {
        background: var(--navy-surface);
        border: 1px solid rgba(255, 255, 255, 0.05);
      }

      .navy-depth-ring {
        background:
          radial-gradient(circle at 50% 50%, transparent 0 38%, rgba(120,132,150,0.12) 39%, transparent 40%),
          radial-gradient(circle at 50% 50%, transparent 0 58%, rgba(255, 255, 255, 0.08) 59%, transparent 60%);
      }

      .navy-flow-mask {
        mask-image: linear-gradient(90deg, transparent, black 16%, black 84%, transparent);
      }

      @keyframes navy-drift {
        0% { transform: translate3d(-1%, -0.5%, 0) scale(1); }
        100% { transform: translate3d(1%, 0.5%, 0) scale(1.03); }
      }

      .navy-drift {
        animation: navy-drift 20s ease-in-out infinite alternate;
      }

      @keyframes navy-sheen {
        0% { transform: translateX(-130%); opacity: 0; }
        20% { opacity: 0.45; }
        100% { transform: translateX(130%); opacity: 0; }
      }

      .navy-sheen::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(105deg, transparent 36%, rgba(150,160,175,0.1), transparent 64%);
        animation: navy-sheen 8s ease-in-out infinite;
      }
    `}</style>
  );
}

export function NavySectionDivider() {
  return (
    <div className="relative flex justify-center items-center py-6 px-6">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-px w-full max-w-[480px] origin-center bg-gradient-to-r from-transparent via-[#7d93ab]/20 to-transparent"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1.5 NavyCountUp — High-Performance Numerical Counter
// ─────────────────────────────────────────────────────────────────────────────

function NavyCountUp({ value, color = "white", locale = "en" }: { value: string; color?: string; locale?: Locale }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayVal, setDisplayVal] = useState("0");

  useEffect(() => {
    const cleanValue = value.trim();
    const match = cleanValue.match(/^([\d,.]+)(.*)$/);
    if (!match) {
      setDisplayVal(value);
      return;
    }
    const numericStr = match[1].replace(/[,.]/g, '');
    const num = parseInt(numericStr, 10);
    const suffix = match[2] || "";
    
    if (inView) {
      const controls = animate(0, num, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          const formatted = Math.round(latest).toLocaleString(locale === "ro" ? "ro-RO" : "en-US");
          setDisplayVal(formatted + suffix);
        },
      });
      return () => controls.stop();
    }
  }, [inView, value, locale]);

  return <span ref={ref} style={{ color }}>{displayVal}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. NavyHero — Full-Viewport Parallax Header
// ─────────────────────────────────────────────────────────────────────────────

export function NavyHero({
  metrics,
  imageSrc,
  locale = "en",
}: {
  metrics: NavyMetric[];
  imageSrc: string;
  locale?: Locale;
}) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.22], [0, 120]);
  const titleY = useTransform(scrollYProgress, [0, 0.18], [0, -42]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.45]);
  const scale = useTransform(scrollYProgress, [0, 0.22], [1.02, 1.09]);

  const items = locale === "ro" 
    ? ["aviație de portavion", "descurajare subacvatică", "focuri integrate"]
    : ["carrier aviation", "undersea deterrence", "integrated fires"];

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">
      <motion.div style={{ y, opacity, scale }} className="absolute inset-0">
        <Image
          src={imageSrc}
          alt="U.S. Navy aircraft carrier in cinematic light"
          fill
          priority
          quality={90}
          className="h-full w-full object-cover grayscale-[0.3]"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#000000_0%,rgba(0,0,0,0.85)_24%,rgba(0,0,0,0.18)_62%,#000000_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#000000_0%,rgba(0,0,0,0)_18%,rgba(0,0,0,0.08)_64%,#000000_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(180deg,transparent,#000000)]" />
      
      {/* Strong Navy Sonar Glow Overlays */}
      <div className="navy-drift absolute -left-20 top-20 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(96,108,126,0.22),transparent_62%)] blur-3xl" />
      <div className="navy-drift absolute -right-24 bottom-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(74,82,94,0.15),transparent_64%)] blur-3xl" />
      
      <div className="navy-grid-plane absolute inset-0 opacity-40" />
      <div className="navy-noise absolute inset-0" />

      <div className="relative z-10 flex min-h-[100svh] items-end">
        <div className="mx-auto grid w-full max-w-[1520px] gap-10 px-5 pb-8 pt-44 sm:px-8 md:grid-cols-[1fr_420px] md:items-end md:pb-12 lg:px-12">
          <motion.div
            style={{ y: titleY }}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08 }}
            className="max-w-5xl"
          >
            <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
              <span className="h-px w-14 bg-white/28" />
              <span className="navy-font-mono text-xs font-bold uppercase text-white/60 tracking-[0.25em]">
                {locale === "ro" ? "Marina Statelor Unite" : "United States Navy"}
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="navy-font-display text-6xl font-black uppercase leading-[0.9] text-white sm:text-7xl md:text-8xl lg:text-9xl"
            >
              {locale === "ro" ? (
                <>
                  Control maritim.
                  <span className="block text-white/24 font-light">Comandă globală.</span>
                </>
              ) : (
                <>
                  Sea Control.
                  <span className="block text-white/24 font-light">Global Command.</span>
                </>
              )}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-2xl text-sm leading-8 text-white/60 md:text-base"
            >
              {locale === "ro" ? (
                "Marina este grila mobilă de aviație aerospațială, descurajare subacvatică, apărare antirachetă, logistică și proiecție strategică a Americii. Transformă oceanele în spațiu de manevră suveran."
              ) : (
                "The Navy is America's mobile aerospace, undersea, missile-defense, logistics, and deterrence grid. It turns oceans into maneuver space and keeps national power present without waiting for permission."
              )}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
              {items.map((item) => (
                <span
                  key={item}
                  className="border border-white/8 bg-white/[0.02] px-4 py-2 text-xs font-bold uppercase text-white/50 backdrop-blur-xl tracking-wider"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Premium HUD Sonar Sidebar Panel */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="navy-sheen navy-glass-premium relative grid grid-cols-2 overflow-hidden"
          >
            {metrics.map((metric) => (
              <div key={metric.label} className="min-h-36 border-b border-r border-white/5 p-6 last:border-r-0 last:border-b-0 odd:border-r">
                <div className="navy-font-display text-4xl font-black text-white">
                  <NavyCountUp value={metric.value} locale={locale} />
                </div>
                <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/85">{metric.label}</div>
                <p className="mt-4 text-[13px] leading-relaxed text-white/65 font-medium">{metric.detail}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. NavyMetricStrip — Tactical Stats Strip with Count-Ups
// ─────────────────────────────────────────────────────────────────────────────

export function NavyMetricStrip({ metrics, locale = "en" }: { metrics: NavyMetric[]; locale?: Locale }) {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/5">
          {metrics.map((metric, i) => (
            <div key={metric.label} className="border-r border-b border-white/5">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col px-8 py-12"
              >
                {/* Label — top */}
                <div className="mil-text-metadata mb-6 tracking-[0.3em] font-black text-white">
                  {metric.label}
                </div>

                {/* Large number */}
                <div className="flex items-baseline gap-1">
                  <span className="text-[clamp(48px,7vw,96px)] font-extralight tracking-tighter leading-none text-white">
                    <NavyCountUp value={metric.value} locale={locale} />
                  </span>
                </div>

                {/* Gradient divider */}
                <div className="mt-6 mb-4 h-px w-full" style={{
                  background: "linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.05), transparent)"
                }} />

                {/* Sublabel */}
                <div className="mil-text-metadata max-w-[280px] leading-relaxed opacity-60 text-[11px] font-medium tracking-wide text-white/70">
                  {metric.detail}
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
// 4. NavyCapabilityGrid — Bento Grid Systems
// ─────────────────────────────────────────────────────────────────────────────

export function NavyCapabilityGrid({ capabilities, locale = "en" }: { capabilities: NavyCapability[]; locale?: Locale }) {
  const isRo = locale === "ro";
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const icons = [Ship, Waves, Shield, Cpu];

  const capabilityBgImages = [
    SITE_IMAGES.navy.geraldFord,
    SITE_IMAGES.navy.ohioSubmarine,
    SITE_IMAGES.navy.destroyer,
    SITE_IMAGES.navy.flightDeck,
  ];

  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(96,108,126,0.15),transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 navy-grid-plane opacity-20 pointer-events-none" />
      <div className="navy-noise absolute inset-0 opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-[1400px]">
        <SectionTitle
          label={isRo ? "ARHITECTURA CAPABILITĂȚILOR" : "CAPABILITY ARCHITECTURE"}
          titlePart1={isRo ? "SISTEME" : "INTEGRATED"}
          titlePart2={isRo ? "INTEGRATE" : "SYSTEMS"}
          body={isRo 
            ? "Forța Marinei derivă din interoperabilitatea totală a navelor, aeronavelor, submarinelor, senzorilor orbitali și echipajelor." 
            : "The Navy's power comes from the integration of ships, aircraft, submarines, satellites, software, industrial depth, and crews trained to operate under extreme tempo."}
        />
        
        <div className="flex flex-col lg:flex-row gap-3 mt-16 lg:h-[480px]">
          {capabilities.map((cap, i) => {
            const isHovered = hoveredIdx === i;
            const isAnyHovered = hoveredIdx !== null;
            const bgImage = capabilityBgImages[i];
            const Icon = icons[i] ?? Ship;

            return (
              <motion.div
                key={cap.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={cn(
                  "group relative overflow-hidden navy-panel-tactical p-6 sm:p-8 flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none min-h-[220px] lg:min-h-0",
                  isHovered ? "lg:flex-[3.2] bg-white/[0.04] border-white/10" : 
                  isAnyHovered ? "lg:flex-[0.6] opacity-35 bg-black/40 border-white/[0.02]" : "lg:flex-1 bg-white/[0.02] border-white/[0.04]"
                )}
              >
                {/* Background image preview on hover */}
                {bgImage && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
                    style={{ opacity: isHovered ? 0.12 : 0.04 }}
                  >
                    <Image src={bgImage} alt="" fill className="object-cover saturate-[0.4]" sizes="20vw" />
                  </div>
                )}

                <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[#7d93ab] blur-[80px] pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-[0.06]" />

                {/* Header: Icon + Stat */}
                <div className="flex items-center justify-between mb-6 lg:mb-0 shrink-0">
                  <div className="flex h-11 w-11 items-center justify-center border border-white/8 bg-black text-[#7d93ab] transition-colors duration-500 group-hover:border-[#7d93ab]/25">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <span className="navy-font-mono text-[11px] font-bold tracking-[0.12em] text-[#7d93ab]/70 transition-colors duration-500 group-hover:text-[#7d93ab]/90">
                    {cap.stat}
                  </span>
                </div>

                {/* Middle Content */}
                <div className="flex-1 flex flex-col justify-center my-4 lg:my-0">
                  <span className="navy-font-mono text-[11px] font-bold tracking-[0.15em] text-[#7d93ab]/70 transition-colors duration-500 group-hover:text-[#7d93ab]/90 mb-2 block">
                    {cap.kicker}
                  </span>
                  <h3 className={cn(
                    "navy-font-display font-black text-white leading-[0.92] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isHovered ? "text-2xl sm:text-3xl mb-4" : "text-xl sm:text-2xl lg:text-xl xl:text-2xl",
                    !isHovered && isAnyHovered ? "lg:opacity-60" : ""
                  )}>
                    {cap.title}
                  </h3>
                  
                  {/* Description (collapsible on desktop, static on mobile) */}
                  <div className={cn(
                    "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
                    isHovered ? "opacity-100 max-h-[300px] mb-2" : "lg:opacity-0 lg:max-h-0"
                  )}>
                    <p className="text-[13px] leading-[1.8] text-white/65 max-w-md font-medium">
                      {cap.description}
                    </p>
                  </div>
                </div>

                {/* Footer Line indicator */}
                <div className="shrink-0 mt-2 lg:mt-0">
                  <div className="h-px w-full bg-white/5">
                    <div className="h-px w-12 bg-[#7d93ab] transition-all duration-500 group-hover:w-full" />
                  </div>
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
// 5. NavyOperationalConsole — Strategic Map Theater
// ─────────────────────────────────────────────────────────────────────────────

export function NavyOperationalConsole({ theaters, locale = "en" }: { theaters: NavyTheater[]; locale?: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = theaters[activeIndex];

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(96,108,126,0.18),transparent_32%),radial-gradient(circle_at_82%_72%,rgba(74,82,94,0.15),transparent_34%)]" />
      <div className="absolute inset-0 navy-grid-plane opacity-20 pointer-events-none" />
      <div className="navy-noise absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-[1520px]">
        <SectionTitle
          label={locale === "ro" ? "TEATRU INTERACTIV" : "INTERACTIVE THEATER"}
          titlePart1={locale === "ro" ? "SISTEM" : "OCEANIC"}
          titlePart2={locale === "ro" ? "OCEANIC" : "OPERATIONS"}
          body={locale === "ro"
            ? "Selectați un teatru. Interfața configurează forțele navale ca prezență militară, rețea logistică, scut antirachetă și aviație adaptată fiecărui mediu strategic."
            : "Select a theater. The interface reframes the same Navy as presence, deterrence, logistics, aviation, and command infrastructure tuned to a different strategic environment."}
        />

        <div className="mt-14 grid min-h-[760px] overflow-hidden border border-white/5 bg-[#020202] lg:grid-cols-[360px_1fr_420px]">
          {/* Left panel options */}
          <div className="z-10 flex flex-col border-b border-white/5 bg-black/40 p-4 backdrop-blur-xl lg:border-b-0 lg:border-r">
            {theaters.map((theater, index) => {
              const selected = active.id === theater.id;
              return (
                <button
                  key={theater.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "group relative min-h-32 overflow-hidden border border-transparent p-6 text-left transition-colors duration-300 mb-2 last:mb-0",
                    selected ? "bg-white/[0.04] text-white" : "text-white/55 hover:bg-white/[0.015] hover:text-white/80"
                  )}
                >
                  {selected && (
                    <motion.div
                      layoutId="navy-theater-active"
                      className="absolute inset-0 border border-white/10"
                      style={{ boxShadow: 'inset 0 0 12px rgba(120,132,150,0.08)' }}
                      transition={{ type: "spring", stiffness: 320, damping: 34 }}
                    />
                  )}
                  <div className="relative z-10">
                    <div className="navy-font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#7d93ab]/70">{theater.region}</div>
                    <div className="navy-font-display mt-3 text-2xl font-black uppercase leading-none">{theater.name}</div>
                    <div className="mt-5 h-px w-full bg-white/5">
                      <div
                        className={cn("h-px transition-all duration-500", selected ? "w-full" : "w-10 group-hover:w-1/2")}
                        style={{ backgroundColor: "#7d93ab" }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center visual display */}
          <div className="relative min-h-[520px] overflow-hidden">
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
                  className="object-cover grayscale-[0.2]"
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1),#000000_94%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#000000_0%,transparent_28%,transparent_70%,#000000_100%)]" />
            <div className="absolute inset-0 navy-depth-ring opacity-35" />

            <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45 }}
                  className="max-w-2xl"
                >
                  <div className="navy-font-mono text-[11px] font-bold uppercase text-[#7d93ab] tracking-[0.15em]">{active.signal}</div>
                  <h3 className="navy-font-display mt-4 text-4xl font-black uppercase leading-none md:text-6xl text-white">
                    {active.headline}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right text profiling */}
          <div className="z-10 flex flex-col border-t border-white/5 bg-black/40 p-8 backdrop-blur-xl lg:border-l lg:border-t-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 22 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.45 }}
                className="flex h-full flex-col"
              >
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span className="navy-font-mono text-[10px] tracking-[0.15em] font-semibold text-white/45 uppercase">
                    {locale === "ro" ? "Profilul teatrului" : "Theater profile"}
                  </span>
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7d93ab] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7d93ab]" />
                  </div>
                </div>
                <h3 className="navy-font-display text-xl font-black text-white mb-4 leading-[0.92]">{active.name}</h3>
                <p className="text-[13px] leading-[1.85] text-white/65 mb-8">{active.description}</p>
                <div className="mt-auto space-y-4">
                  {active.metrics.map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between border-b border-white/[0.03] pb-3 last:border-0 last:pb-0">
                      <span className="navy-font-mono text-[11px] tracking-[0.12em] font-medium text-white/45">{metric.label}</span>
                      <span className="navy-font-mono text-[11px] tracking-[0.08em] font-semibold text-white/80">{metric.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/[0.04]">
                  <div className="navy-flow-mask grid grid-cols-6 gap-2">
                    {Array.from({ length: 18 }).map((_, index) => (
                      <motion.span
                        key={index}
                        className="h-1 bg-white/10"
                        animate={{ opacity: [0.1, 0.6, 0.1] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.055 }}
                      />
                    ))}
                  </div>
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
// 6. NavyPlatformShowcase — Dossiers & Capitals Systems (Maverick grade)
// ─────────────────────────────────────────────────────────────────────────────

export function NavyPlatformShowcase({ platforms, locale = "en" }: { platforms: NavyPlatform[]; locale?: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = platforms[activeIndex];
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  useEffect(() => {
    if (isDossierOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isDossierOpen]);

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#000000,transparent_20%,transparent_80%,#000000)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(96,108,126,0.15),transparent_55%)] animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute inset-0 navy-grid-plane opacity-15 pointer-events-none" />
      <div className="navy-noise absolute inset-0 opacity-30 pointer-events-none" />
      <div className="mx-auto max-w-[1520px]">
        <SectionTitle
          label={locale === "ro" ? "PLATFORME ACTIVE" : "ACTIVE PLATFORMS"}
          titlePart1={locale === "ro" ? "NAVE" : "CAPITAL"}
          titlePart2={locale === "ro" ? "MARI" : "SHIPS"}
          body={locale === "ro"
            ? "Fiecare platformă navală este optimizată ca nod activ în rețeaua globală de luptă: coordonare prin satelit, senzori radar performanți și logistica flotei."
            : "Each platform is designed as part of a larger kill web: sensors, launchers, communications, logistics, aviation, cyber, and allied command structures."}
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="relative mt-14 grid min-h-[760px] overflow-hidden border border-white/10 bg-[#020202] rounded-lg shadow-2xl lg:grid-cols-[1fr_440px]"
        >
          {/* Main Visual Display */}
          <div className="relative min-h-[520px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={active.imageSrc}
                  alt={active.imageAlt}
                  fill
                  quality={90}
                  className="object-cover grayscale-[0.2]"
                  sizes="(max-width: 1024px) 100vw, 68vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#000000_0%,rgba(0,0,0,0.18)_46%,#000000_100%)] pointer-events-none z-10" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_46%,#000000_100%)] pointer-events-none z-10" />
            
            {/* Active label badge */}
            <div className="absolute left-8 top-8 z-20 hidden max-w-sm border border-white/10 bg-black/60 p-5 backdrop-blur-xl md:block rounded">
              <div className="navy-font-mono text-[11px] font-bold uppercase tracking-widest text-white/60">
                {locale === "ro" ? "Platformă activă" : "Active platform"}
              </div>
              <div className="navy-font-display mt-3 text-2xl sm:text-3xl font-black uppercase leading-snug text-white" style={{ wordSpacing: "0.22em", letterSpacing: "0.05em" }}>
                {active.name}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-9 lg:max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="navy-font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#7d93ab]">{active.className}</div>
                  <h3 className="navy-font-display mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-white" style={{ wordSpacing: "0.22em", letterSpacing: "0.05em" }}>
                    {active.role}
                  </h3>
                  <p className="mt-7 max-w-2xl text-[13px] leading-relaxed text-white/65 font-medium">{active.capability}</p>
                  
                  {/* Premium dossier trigger button */}
                  <button
                    onClick={() => setIsDossierOpen(true)}
                    className="mt-8 flex h-11 items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 px-5 text-xs font-bold uppercase text-white tracking-[0.2em] backdrop-blur-md transition-all rounded"
                  >
                    {locale === "ro" ? "VEZI DOSARUL TEHNIC →" : "VIEW TECH DOSSIER →"}
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Selector Column */}
          <div className="flex flex-col border-t border-white/10 bg-black/85 p-6 backdrop-blur-xl lg:border-l lg:border-white/10 lg:border-t-0">
            <div className="grid gap-2">
              {platforms.map((platform, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={platform.name}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "relative overflow-hidden border border-white/5 p-4 text-left transition-colors duration-300 rounded",
                      selected ? "bg-white/[0.04] text-white border-white/15" : "bg-white/[0.008] text-white/55 hover:bg-white/[0.02] hover:text-white/80"
                    )}
                  >
                    {selected && (
                      <motion.div
                        layoutId="navy-platform-active"
                        className="absolute inset-y-0 left-0 w-[2px] bg-[#7d93ab]"
                        transition={{ type: "spring", stiffness: 330, damping: 35 }}
                      />
                    )}
                    <div className="pl-3">
                      <div className="navy-font-display text-lg sm:text-xl font-extrabold uppercase leading-snug" style={{ wordSpacing: "0.22em", letterSpacing: "0.05em" }}>
                        {platform.name}
                      </div>
                      <div className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#7d93ab]/70">
                        {platform.className}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-2 gap-px bg-white/5"
                >
                  {active.specs.map((spec) => (
                    <div key={spec.label} className="bg-black p-4 border border-white/5 rounded-sm">
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-white/45">{spec.label}</div>
                      <div className="mt-2 text-xs font-bold text-white/80">{spec.value}</div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
              <div className="mt-6 h-px bg-white/5">
                <motion.div
                  key={activeIndex}
                  className="h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.08),#7d93ab,#ffffff)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((activeIndex + 1) / platforms.length) * 100}%` }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Expanded Dossier Fullscreen Overlay (Top Gun: Maverick theme) */}
      <AnimatePresence>
        {isDossierOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8" onClick={() => setIsDossierOpen(false)}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/98 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="navy-glass-premium relative z-10 w-full max-w-5xl max-h-[90dvh] overflow-y-auto no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Overlay sticky header */}
              <div className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-10 py-5 bg-[#000308]/90 backdrop-blur-md border-b border-white/5">
                <span className="navy-font-mono text-[11px] font-bold tracking-[0.25em] text-white/70">
                  {locale === "ro" ? "DOSAR TEHNIC FLOTĂ" : "FLEET SYSTEM DOSSIER"}
                </span>
                <button
                  onClick={() => setIsDossierOpen(false)}
                  className="navy-font-mono text-[11px] hover:text-white transition-colors tracking-[0.15em] text-white/55"
                >
                  {locale === "ro" ? "[ ÎNCHIDE ]" : "[ CLOSE ]"}
                </button>
              </div>

              {/* Parallax Hero Image Block */}
              <div className="relative w-full h-[35dvh] md:h-[45dvh] overflow-hidden">
                <Image src={active.imageSrc} alt={active.imageAlt} fill className="object-cover" priority sizes="100vw" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-8 left-6 md:left-10">
                  <p className="navy-font-mono text-[11px] font-bold mb-3 tracking-[0.15em] text-[#7d93ab] uppercase">{active.className}</p>
                  <h3 className="navy-font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase text-white leading-snug" style={{ wordSpacing: "0.22em", letterSpacing: "0.05em" }}>
                    {active.name}
                  </h3>
                </div>
              </div>

              {/* Content Panel */}
              <div className="px-6 md:px-10 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-12">
                  <div>
                    <div className="navy-font-mono text-[11px] font-bold mb-4 tracking-[0.15em] text-white/60">
                      {locale === "ro" ? "DESCRIEREA CAPABILITĂȚILOR" : "CAPABILITY OVERVIEW"}
                    </div>
                    <p className="text-[13px] leading-relaxed text-white/65 mb-8">{active.capability}</p>
                    
                    {/* Dark Navy visual signature band */}
                    <div className="pl-5 border-l-2 border-[#7d93ab]/25 bg-white/[0.025] py-4 pr-4">
                      <div className="navy-font-mono text-[11px] font-bold mb-2 tracking-[0.15em] text-[#7d93ab]">
                        {locale === "ro" ? "SIGNATURĂ STRATEGICĂ" : "STRATEGIC SIGNATURE"}
                      </div>
                      <p className="text-[13px] leading-relaxed text-white/65 font-medium">
                        {locale === "ro" 
                          ? "Această navă reprezintă prezență americană deplină, suveranitate operațională în ape internaționale și integrare tactică în kill-web-ul digital."
                          : "This platform represents complete sovereign presence, operational maneuverability, and multi-domain fire-control networking globally."}
                      </p>
                    </div>
                  </div>

                  <div className="hidden lg:block bg-white/5" />

                  <div>
                    <div className="navy-font-mono text-[11px] font-bold mb-6 tracking-[0.15em] text-white/60">
                      {locale === "ro" ? "SPECIFICAȚII TEHNICE" : "TECHNICAL SPECIFICATIONS"}
                    </div>
                    
                    <div className="space-y-4">
                      {active.specs.map((spec, i) => (
                        <div key={i} className="flex justify-between items-baseline py-2.5 border-b border-white/5 last:border-b-0">
                          <span className="navy-font-mono text-[11px] font-medium tracking-[0.12em] text-white/45">{spec.label.toUpperCase()}</span>
                          <span className="text-[13px] font-bold text-white">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-3">
                      <div className="bg-[#000a14] border border-white/5 p-4">
                        <div className="navy-font-mono text-[10px] font-semibold text-white/45 tracking-wider">DOMAIN</div>
                        <div className="text-xs font-bold text-[#7d93ab] mt-1">{locale === "ro" ? "DOMINANȚĂ GLOBALĂ" : "GLOBAL DOMAIN"}</div>
                      </div>
                      <div className="bg-[#000a14] border border-white/5 p-4">
                        <div className="navy-font-mono text-[10px] font-semibold text-white/45 tracking-wider">STATUS</div>
                        <div className="text-xs font-bold text-[#7d93ab] mt-1">{locale === "ro" ? "ACTIV / OPERAȚIONAL" : "DEPLOYED / ACT"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// 8. NavyFullscreenPanel — Parallax Image Blocks
// ─────────────────────────────────────────────────────────────────────────────

export function NavyFullscreenPanel({ panel, reverse = false, locale = "en" }: { panel: NavyVisualPanel; reverse?: boolean; locale?: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [48, 0, -48]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.01, 1.05]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-black">
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <Image
          src={panel.imageSrc}
          alt={panel.imageAlt}
          fill
          quality={90}
          className="object-cover grayscale-[0.2]"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </motion.div>
      <div
        className={cn(
          "absolute inset-0",
          reverse
            ? "bg-[linear-gradient(270deg,#000000_0%,rgba(0,0,0,0.85)_34%,rgba(0,0,0,0.16)_74%,#000000_100%)]"
            : "bg-[linear-gradient(90deg,#000000_0%,rgba(0,0,0,0.85)_34%,rgba(0,0,0,0.16)_74%,#000000_100%)]"
        )}
      />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-[linear-gradient(180deg,transparent,#000000)]" />
      <div className="absolute inset-x-8 top-8 h-px bg-white/5" />
      <div className="absolute inset-y-8 left-8 w-px bg-white/5" />
      <div className="absolute inset-y-8 right-8 hidden w-px bg-white/5 md:block" />
      <div className="relative z-10 flex min-h-[100svh] items-center px-5 py-24 sm:px-8 lg:px-12">
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
          className={cn("max-w-2xl", reverse && "ml-auto")}
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="navy-cinematic-line h-px w-24" />
            <span className="navy-font-mono text-xs font-bold uppercase tracking-widest text-white/50">{panel.eyebrow}</span>
          </div>
          <h2 className="navy-font-display text-4xl font-black uppercase leading-[0.95] md:text-6xl text-white">
            {panel.title}
          </h2>
          <p className="mt-8 text-xs leading-relaxed text-white/50">{panel.description}</p>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. NavyFutureStack — Bento Programs Grid
// ─────────────────────────────────────────────────────────────────────────────

export function NavyFutureStack({ programs, locale = "en" }: { programs: NavyFutureProgram[]; locale?: Locale }) {
  const [activeProgram, setActiveProgram] = useState<NavyFutureProgram | null>(null);

  useEffect(() => {
    if (activeProgram !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProgram]);

  return (
    <section className="relative overflow-hidden bg-[#020202] px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(96,108,126,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 navy-grid-plane opacity-15 pointer-events-none" />
      <div className="navy-noise absolute inset-0 opacity-30 pointer-events-none" />
      <div className="mx-auto max-w-[1520px]">
        <SectionTitle
          label={locale === "ro" ? "VIITOAREA FLOTĂ" : "NEXT FLEET"}
          titlePart1={locale === "ro" ? "STEALTH" : "STEALTH &"}
          titlePart2={locale === "ro" ? "AUTONOMIE" : "AUTONOMY"}
          body={locale === "ro"
            ? "Marina viitorului se concentrează pe o structură distribuită: platforme autonome, senzori software și capacități de penetrare stealth."
            : "The future Navy is less about one bigger ship and more about a distributed fleet: crewed and uncrewed systems, longer-range aviation, software-defined sensors, and resilient production."}
        />
        <div className="mt-14 grid grid-cols-1 gap-px bg-white/5 md:grid-cols-2 xl:grid-cols-4">
          {programs.map((program, index) => (
            <motion.article
              key={program.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              onClick={() => setActiveProgram(program)}
              className="group cursor-pointer min-h-[360px] bg-black p-8 border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all duration-300"
            >
              <div>
                <div className="mb-6 flex flex-col items-start gap-3">
                  <span className="border border-[#7d93ab]/15 bg-white/[0.03] px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#7d93ab]">
                    {program.status}
                  </span>
                  <span className="navy-font-display text-3xl sm:text-4xl font-black text-white/10 block leading-none transition-colors group-hover:text-white/20" title={program.label}>
                    {program.label}
                  </span>
                </div>
                <h3 className="navy-font-display mt-8 text-lg sm:text-xl font-black uppercase leading-tight text-white/80 group-hover:text-white transition-colors">
                  {program.title}
                </h3>
                <p className="mt-4 text-[13px] leading-relaxed text-white/60 group-hover:text-white/75 transition-colors font-medium">{program.description}</p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <span className="navy-font-mono text-[11px] font-bold uppercase tracking-widest text-[#7d93ab]/80 group-hover:text-[#7d93ab] transition-colors">
                  {locale === "ro" ? "DOSAR TEHNIC →" : "PROGRAM DOSSIER →"}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Program Detailed Dossier Modal Overlay */}
      <AnimatePresence>
        {activeProgram !== null && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8" onClick={() => setActiveProgram(null)}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/98 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="navy-glass-premium relative z-10 w-full max-w-4xl max-h-[90dvh] overflow-y-auto no-scrollbar border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Overlay sticky header */}
              <div className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-10 py-5 bg-[#000308]/95 backdrop-blur-md border-b border-white/5">
                <span className="navy-font-mono text-[11px] font-bold tracking-[0.2em] text-[#7d93ab] uppercase">
                  {locale === "ro" ? "VIITORUL GEOMETRIEI FLOTEI" : "FLEET CAPITAL PROGRAM"}
                </span>
                <button
                  onClick={() => setActiveProgram(null)}
                  className="navy-font-mono text-[11px] hover:text-white transition-colors tracking-[0.15em] text-white/55"
                >
                  {locale === "ro" ? "[ ÎNCHIDE ]" : "[ CLOSE ]"}
                </button>
              </div>

              {/* Header Visual Banner */}
              <div className="relative w-full h-[30dvh] md:h-[40dvh] overflow-hidden">
                <Image src={activeProgram.imageSrc} alt={activeProgram.imageAlt} fill className="object-cover grayscale-[0.2]" priority sizes="100vw" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/45 to-transparent" />
                <div className="absolute bottom-8 left-6 md:left-10">
                  <p className="navy-font-mono text-[11px] font-bold mb-3 tracking-[0.15em] text-[#7d93ab] uppercase">{activeProgram.status}</p>
                  <h3 className="navy-font-display text-3xl md:text-5xl font-black tracking-tighter uppercase text-white leading-none">
                    {activeProgram.title}
                  </h3>
                </div>
              </div>

              {/* Content Panel */}
              <div className="px-6 md:px-10 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1.2fr] gap-12">
                  <div>
                    <div className="navy-font-mono text-[11px] font-bold mb-4 tracking-[0.15em] text-white/60">
                      {locale === "ro" ? "DIRECȚIA CAPABILITĂȚII" : "CAPABILITY DIRECTION"}
                    </div>
                    <p className="text-[13px] leading-relaxed text-white/65 mb-8">{activeProgram.capability}</p>
                    
                    {/* Visual signature band */}
                    <div className="pl-5 border-l-2 border-[#7d93ab]/25 bg-white/[0.025] py-4 pr-4">
                      <div className="navy-font-mono text-[11px] font-bold mb-2 tracking-[0.15em] text-[#7d93ab]">
                        {locale === "ro" ? "PROIECTARE TACTICĂ" : "TACTICAL PROJECTION"}
                      </div>
                      <p className="text-[13px] leading-relaxed text-white/65 font-medium">
                        {locale === "ro" 
                          ? "Această componentă redefineste logistica, detecția și dominația spațiului de luptă maritim într-un mod descentralizat și rezistent."
                          : "This program redefines marine logistics, distributed detection, and tactical maritime command under a highly survivable, modular model."}
                      </p>
                    </div>
                  </div>

                  <div className="hidden lg:block w-px bg-white/5" />

                  {/* Right side specs */}
                  <div className="space-y-8">
                    <div>
                      <div className="navy-font-mono text-[11px] font-bold mb-4 tracking-[0.15em] text-white/60">
                        {locale === "ro" ? "SPECIFICAȚII PROGRAM" : "PROGRAM SPECIFICATIONS"}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {activeProgram.specs.map((spec) => (
                          <div key={spec.label} className="navy-panel-tactical p-4 border border-white/5 rounded bg-black/40">
                            <div className="text-[11px] font-semibold uppercase tracking-widest text-white/45">{spec.label}</div>
                            <div className="mt-2 text-xs font-bold text-white/90">{spec.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-6">
                      <div className="navy-font-mono text-[11px] font-bold mb-2 tracking-[0.15em] text-white/45">
                        STATUS: <span className="text-[#7d93ab] font-bold">{activeProgram.status.toUpperCase()}</span>
                      </div>
                      <p className="text-[13px] leading-relaxed text-white/65 font-medium">
                        {locale === "ro"
                          ? "Programul se încadrează în agenda pe termen lung a Departamentului Apărării pentru susținerea superiorității în teatru."
                          : "Approved under the Department of the Navy's strategic fleet framework for long-term multi-domain operational supremacy."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. NavyClosing — Page Closing Call-to-Action
// ─────────────────────────────────────────────────────────────────────────────

export function NavyClosing({ locale = "en" }: { locale?: Locale }) {
  const isRo = locale === "ro";

  const branches = [
    {
      href: "/military/air-force",
      label: isRo ? "Forțele Aeriene" : "Air Force",
    },
    {
      href: "/military/space-force",
      label: isRo ? "Forțele Spațiale" : "Space Force",
    },
    {
      href: "/military/global-bases",
      label: isRo ? "Baze Globale" : "Global Bases",
    },
    {
      href: "/military/intelligence",
      label: isRo ? "Informații" : "Intelligence",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,108,126,0.18),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 navy-grid-plane opacity-25 pointer-events-none" />
      <div className="navy-noise absolute inset-0 opacity-35 pointer-events-none" />
      
      <div className="relative mx-auto max-w-[1160px] text-center">
        <Anchor className="mx-auto mb-8 text-[#7d93ab]/50 animate-pulse" size={32} strokeWidth={1.2} />
        <h2 className="navy-font-display text-4xl font-black uppercase leading-[0.95] md:text-7xl text-white">
          {locale === "ro" ? "Putere militară fără o adresă fixă." : "American power with no fixed address."}
        </h2>
        <p className="mx-auto mt-9 max-w-3xl text-xs leading-relaxed text-white/50 md:text-sm">
          {locale === "ro"
            ? "Un grup de atac de portavioane nu întreabă unde este criza strategică. Mută pista, centrul de comandă securizat, scutul antirachetă și prezența americană direct în teatru."
            : "A Navy carrier group does not ask where the crisis is. It moves the runway, the command center, the missile shield, the logistics train, and the national signal into the theater."}
        </p>

        {/* Primary CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/military"
            className="group inline-flex h-12 items-center gap-3 border border-white/10 bg-white px-6 text-xs font-bold uppercase text-black transition-colors hover:bg-white/85"
          >
            {locale === "ro" ? "Prezentare militară" : "Military overview"}
            <ArrowUpRight size={15} strokeWidth={2} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Cross-links */}
        <div className="mt-20 border-t border-white/5 pt-16">
          <div className="navy-font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-white/60 mb-8">
            {locale === "ro" ? "ALTE DIMENSIUNI MILITARE" : "OTHER MILITARY DIMENSIONS"}
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {branches.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="font-mono text-xs uppercase tracking-[0.15em] text-white/50 transition-colors hover:text-[#7d93ab]"
              >
                {b.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. Sub-components (Radar mesh, section headers)
// ─────────────────────────────────────────────────────────────────────────────

export function NavyWeaponsConsole({ locale = "en" }: { locale?: Locale }) {
  const weapons = getNavyWeapons(locale);
  const [activeTab, setActiveTab] = useState(0);
  const weapon = weapons[activeTab];

  return (
    <section className="relative overflow-hidden bg-black py-24 sm:py-32 border-t border-white/5">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />
      <div className="navy-grid-plane absolute inset-0 opacity-15" />
      <div className="navy-noise absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle
          label={locale === "ro" ? "ARMAMENT TACTIC" : "TACTICAL ARMAMENT"}
          titlePart1={locale === "ro" ? "SISTEME DE" : "INTEGRATED WEAPON"}
          titlePart2={locale === "ro" ? "FOC PRECIZ" : "DELIVERY CONSOLE"}
          body={locale === "ro"
            ? "Arhitectura de atac și apărare a flotei, de la rachete de precizie la sisteme autonome de interceptare, fuzionată într-o rețea de foc digitală."
            : "The fleet's offensive and defensive strike grid, ranging from long-range precision cruise missiles to autonomous point defense gatling systems."}
        />

        {/* Weapons console frame */}
        <div className="navy-glass-premium overflow-hidden rounded-lg border border-white/10 bg-black/60 shadow-2xl">
          
          {/* Header tabs */}
          <div className="flex flex-wrap border-b border-white/10 bg-black/85">
            {weapons.map((w, idx) => (
              <button
                key={w.id}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "relative flex-1 min-w-[170px] px-6 py-5 text-left transition-all duration-300 font-mono border-r border-white/5 last:border-r-0 group overflow-hidden",
                  idx === activeTab
                    ? "text-white bg-white/5 font-bold"
                    : "text-white/55 hover:text-white/80 hover:bg-white/2"
                )}
              >
                {/* Active glow accent */}
                {idx === activeTab && (
                  <motion.div
                    layoutId="active-weapon-indicator"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-[#7d93ab]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {/* Micro tech borders inside tabs */}
                <div className="absolute top-0 right-0 h-1.5 w-1.5 border-t border-r border-white/10 group-hover:border-[#7d93ab]/50" />
                
                <div className="flex flex-col space-y-1 relative z-10">
                  <span className="text-[11px] tracking-[0.2em] font-black uppercase text-white group-hover:text-[#7d93ab] transition-colors duration-200">
                    {w.name.split(" ")[0]}
                  </span>
                  <span className="text-[10px] tracking-wider font-semibold text-white/45 group-hover:text-white/70 transition-colors duration-200">
                    {w.designation}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Console main body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
            
            {/* Left Column: Spec Panel (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              
              <div className="space-y-5 relative">
                {/* Cyber corner brackets accent */}
                <div className="absolute -top-4 -left-4 h-6 w-6 border-t-2 border-l-2 border-[#7d93ab]/20 pointer-events-none" />
                
                <h3 className="navy-font-display text-2xl sm:text-4.5xl font-black text-white leading-snug uppercase pt-1" style={{ wordSpacing: "0.25em", letterSpacing: "0.06em" }}>
                  {weapon.name}
                </h3>
                
                <div className="inline-block border border-[#7d93ab]/10 rounded bg-[#0a0c10]/40 px-3 py-1 text-[11px] tracking-widest text-[#7d93ab] font-bold font-mono">
                  {locale === "ro" ? "DESEMNARE SISTEM" : "SYSTEM DESIGNATION"}: {weapon.designation}
                </div>
                
                <p className="text-sm leading-relaxed text-white/70 max-w-2xl pt-2">
                  {weapon.description}
                </p>
              </div>

              {/* Specs Grid with high-fidelity glowing panels */}
              <div className="grid grid-cols-2 gap-4">
                {weapon.specs.map((s) => (
                  <div
                    key={s.label}
                    className="relative overflow-hidden navy-panel-tactical p-4 border border-white/5 rounded bg-black/40 flex flex-col space-y-1 group hover:border-[#7d93ab]/20 transition-all duration-300"
                  >
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7d93ab]/10 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <span className="navy-font-mono text-[11px] font-semibold tracking-wider text-white/45 uppercase">
                      {s.label}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white tracking-wide uppercase">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status and telemetry bars */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Accuracy telemetry */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold tracking-widest text-white/70">
                      <span>{locale === "ro" ? "ACURATEȚE SISTEM" : "SYSTEM ACCURACY"}</span>
                      <span className="text-[#7d93ab] font-bold">{weapon.accuracy}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${weapon.accuracy}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-[#7d93ab] rounded-full"
                      />
                    </div>
                  </div>

                  {/* Operations telemetry */}
                  <div className="flex flex-col justify-end">
                    <div className="navy-font-mono text-[11px] font-bold tracking-widest text-white/45 uppercase">
                      {locale === "ro" ? "STATUS TELEMETRIE" : "TELEMETRY STATUS"}
                    </div>
                    <div className="text-xs font-mono tracking-wider text-[#7d93ab] font-bold uppercase mt-1">
                      {weapon.operations}
                    </div>
                  </div>

                </div>
              </div>

              {/* Tactical Deployment Profile Block */}
              <div className="border border-white/10 rounded bg-[#0a0c10]/60 p-5 font-mono text-[11px] leading-relaxed text-white/70 space-y-2">
                <div className="text-[#7d93ab] text-[11px] uppercase tracking-widest font-black border-b border-white/10 pb-1.5 mb-2">
                  {locale === "ro" ? "PROFIL DE DESFĂȘURARE TACTICĂ" : "TACTICAL DEPLOYMENT PROFILE"}
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-white/40">{locale === "ro" ? "STARE INTEGRARE:" : "INTEGRATION STATE:"}</span>
                  <span className="text-white font-semibold">{locale === "ro" ? "SECURIZAT // REȚEA COMUNĂ LINK-16" : "SECURE // LINK-16 JOINT NETWORK"}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-white/40">{locale === "ro" ? "STATUS DESFĂȘURARE:" : "DEPLOYMENT STATUS:"}</span>
                  <span className="text-[#7d93ab] font-semibold">{locale === "ro" ? "PREGĂTIRE OPERAȚIONALĂ OK" : "OPERATIONAL Readiness OK"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">{locale === "ro" ? "POTRIVIRE SISTEM ȚINTĂ:" : "TARGET SYSTEM MATCH:"}</span>
                  <span className="text-white font-semibold">{weapon.tacticalOverlay}</span>
                </div>
              </div>

            </div>

            {/* Right Column: High-Fidelity Weapon Image (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              
              {/* High-Fidelity Tactical Weapon Frame */}
              <div className="relative w-full aspect-square max-w-[340px] rounded-lg border border-white/10 bg-black/40 overflow-hidden flex items-center justify-center p-2 group">
                
                {/* Cyber corner brackets accent */}
                <div className="absolute top-2 left-2 right-2 bottom-2 rounded border border-white/5 pointer-events-none z-20" />

                {/* Real Image component */}
                <div className="relative z-10 w-full h-full">
                  <Image
                    src={`/images/military/navy/${weapon.id}.jpg`}
                    alt={weapon.name}
                    fill
                    className="object-contain opacity-95 group-hover:opacity-100 transition-opacity duration-500"
                    priority
                  />
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

function SectionTitle({
  label,
  titlePart1,
  titlePart2,
  body,
  align = "center",
}: {
  label: string;
  titlePart1: string;
  titlePart2?: string;
  body: string;
  align?: "center" | "left";
}) {
  const isCenter = align === "center";
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      className={cn("mb-20 max-w-5xl", isCenter ? "mx-auto text-center" : "text-left")}
    >
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="navy-font-mono mb-5 tracking-[0.25em] text-[11px] font-bold text-[#7d93ab]"
      >
        {label}
      </motion.div>
      <motion.h2
        variants={fadeUp}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="navy-font-display text-[clamp(36px,7vw,88px)] font-black leading-[0.88] text-white"
      >
        {titlePart1}
      </motion.h2>
      {titlePart2 && (
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="navy-font-display text-[clamp(36px,7vw,88px)] font-black leading-[0.88] text-white/15 mt-1"
        >
          {titlePart2}
        </motion.div>
      )}
      <motion.p
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className={cn(
          "mt-8 text-sm leading-[1.9] text-white/50 tracking-wide",
          isCenter ? "max-w-2xl mx-auto" : "max-w-xl"
        )}
      >
        {body}
      </motion.p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. NavyFlyNavyVideo — Full-Bleed Naval Aviation Video Segment
// ─────────────────────────────────────────────────────────────────────────────

export function NavyFlyNavyVideo({ locale = "en" }: { locale?: Locale }) {
  const isRo = locale === "ro";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial start time
    video.currentTime = 4;
    video.muted = true;
    video.play().catch((err) => {
      console.warn("Autoplay block in NavyFlyNavyVideo:", err);
    });

    const handleTimeUpdate = () => {
      // Loop reset or manual seeks backward
      if (video.currentTime < 4) {
        video.currentTime = 4;
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <section
      id="fly-navy-video"
      className="relative overflow-hidden bg-black"
    >
      <div className="pt-22 pb-12 flex justify-center">
        <div className="mil-text-label tracking-[0.5em]">{isRo ? "FORȚA AERONAVALĂ · SHOWCASE" : "NAVAL AVIATION · SHOWCASE"}</div>
      </div>

      <div className="relative w-full aspect-video overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay loop muted playsInline
          className="w-full h-full object-cover"
          style={{ filter: "contrast(1.1) brightness(0.75) saturate(0.8)" }}
          aria-label="Cinematic naval aviation supremacy showcase video"
        >
          <source src="/videos/military/fly-navy.mp4#t=4" type="video/mp4" />
        </video>

        {/* Edge vignette */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,black_0%,rgba(0,0,0,0)_15%,rgba(0,0,0,0)_85%,black_100%)]" />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)"
        }} />

        {/* Centered lockup */}
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="text-center">
            <h2 className="mil-text-section mb-4">
              <span className="block whitespace-nowrap">{isRo ? "AVIAȚIE" : "FLY"}</span>
              <span className="block whitespace-nowrap text-white/20">{isRo ? "MARINĂ" : "NAVY"}</span>
            </h2>
            <p className="mil-text-metadata tracking-[0.4em] font-bold text-[11px] text-white/50">
              {isRo ? "DOMINAȚIE AERONAVALĂ · SEMPER FORTIS" : "PLANETARY CARRIER AVIATION · SEMPER FORTIS"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 13. NavyFleetComparisonSection — Fleet Size Dashboard
// ─────────────────────────────────────────────────────────────────────────────

export function NavyFleetComparisonSection({
  data,
  locale = "en",
}: {
  data: NavyFleetComparison[];
  locale?: Locale;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeMetric, setActiveMetric] = useState<"carriers" | "submarines" | "tonnage">("carriers");
  const isRo = locale === "ro";

  const usData = data.find((d) => d.highlight) ?? data[0];
  const maxCarriers = usData.carriers;
  const maxSubs = usData.submarines;

  const metricOptions: { key: "carriers" | "submarines" | "tonnage"; label: string }[] = [
    { key: "carriers", label: isRo ? "PORTAVIOANE" : "CARRIERS" },
    { key: "submarines", label: isRo ? "SUBMARINE" : "SUBMARINES" },
    { key: "tonnage", label: isRo ? "TONAJ" : "TONNAGE" },
  ];

  function getBarValue(row: NavyFleetComparison): number {
    if (activeMetric === "carriers") return row.carriers;
    if (activeMetric === "submarines") return row.submarines;
    return parseFloat(row.tonnage.replace(',', '.'));
  }

  function getMaxValue(): number {
    if (activeMetric === "carriers") return maxCarriers;
    if (activeMetric === "submarines") return maxSubs;
    return parseFloat(usData.tonnage.replace(',', '.'));
  }

  function getDisplayValue(row: NavyFleetComparison): string {
    if (activeMetric === "carriers") return String(row.carriers);
    if (activeMetric === "submarines") return String(row.submarines);
    return row.tonnage + (isRo ? " tone" : " tons");
  }

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-10%,rgba(96,108,126,0.12),transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 navy-grid-plane opacity-15 pointer-events-none" />
      <div className="navy-noise absolute inset-0 opacity-30 pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-[1520px]">
        <SectionTitle
          label={isRo ? "SCARĂ GLOBALĂ" : "GLOBAL SCALE"}
          titlePart1={isRo ? "DOMINAȚIE" : "MARITIME"}
          titlePart2={isRo ? "MARITIMĂ" : "DOMINANCE"}
          body={isRo
            ? "Marina SUA nu este doar cea mai mare din lume — este mai mare decât următoarele treisprezece marine combinate ca tonaj total. Nicio altă națiune nu operează mai mult de trei portavioane."
            : "The U.S. Navy isn't just the world's largest — it displaces more tonnage than the next thirteen navies combined. No other nation operates more than three aircraft carriers."}
        />

        {/* Metric selector tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {metricOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setActiveMetric(opt.key)}
              className={cn(
                "px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] border transition-all duration-200",
                activeMetric === opt.key
                  ? "bg-white/[0.06] border-white/15 text-white"
                  : "bg-transparent border-white/5 text-white/50 hover:text-white/80 hover:border-white/10"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Comparison grid */}
        <div className="overflow-hidden rounded-lg border border-white/5 bg-[#020202]">
          <div className="p-6 md:p-10 space-y-5">
            {data.map((row, i) => {
              const val = getBarValue(row);
              const max = getMaxValue();
              const pct = max > 0 ? (val / max) * 100 : 0;

              return (
                <div key={row.country}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">{row.flag}</span>
                      <span className={cn(
                        "font-mono text-[11px] uppercase tracking-wide",
                        row.highlight ? "text-white font-bold" : "text-white/50"
                      )}>
                        {row.country}
                      </span>
                    </div>
                    <span className={cn(
                      "font-mono text-[12px]",
                      row.highlight ? "text-white font-bold" : "text-white/60"
                    )}>
                      {getDisplayValue(row)}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className={cn(
                        "h-full rounded-full",
                        row.highlight ? "bg-white" : "bg-white/15"
                      )}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${pct}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      style={row.highlight ? { boxShadow: "0 0 8px rgba(255,255,255,0.12)" } : undefined}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer stats strip */}
          <div className="grid grid-cols-3 border-t border-white/5">
            <div className="p-5 border-r border-white/5 text-center">
              <div className="navy-font-mono text-[11px] font-bold tracking-widest text-white/45 mb-1">{isRo ? "PORTAVIOANE NUCLEARE" : "NUCLEAR CARRIERS"}</div>
              <div className="text-xl font-black text-white">11</div>
            </div>
            <div className="p-5 border-r border-white/5 text-center">
              <div className="navy-font-mono text-[11px] font-bold tracking-widest text-white/45 mb-1">{isRo ? "SUBMARINE ACTIVE" : "ACTIVE SUBMARINES"}</div>
              <div className="text-xl font-black text-white">72</div>
            </div>
            <div className="p-5 text-center">
              <div className="navy-font-mono text-[11px] font-bold tracking-widest text-white/45 mb-1">{isRo ? "TONAJ TOTAL FLOTĂ" : "TOTAL FLEET TONNAGE"}</div>
              <div className="text-xl font-black text-white">{isRo ? "4,6 mil." : "4.6M"}</div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center navy-font-mono text-[10px] font-medium text-white/40 uppercase tracking-widest">
          {isRo ? "Surse: IISS Military Balance 2024, Naval Vessel Register" : "Sources: IISS Military Balance 2024, Naval Vessel Register"}
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 14. NavyHeritageTimeline — Vertical History Timeline
// ─────────────────────────────────────────────────────────────────────────────

export function NavyHeritageTimeline({
  events,
  locale = "en",
}: {
  events: NavyHeritageEvent[];
  locale?: Locale;
}) {
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(96,108,126,0.10),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 navy-grid-plane opacity-10 pointer-events-none" />
      <div className="navy-noise absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-[1520px]">
        <SectionTitle
          label={isRo ? "MOȘTENIRE NAVALĂ" : "NAVAL HERITAGE"}
          titlePart1={isRo ? "248 DE ANI" : "248 YEARS"}
          titlePart2={isRo ? "DE PUTERE MARITIMĂ" : "OF SEA POWER"}
          body={isRo
            ? "De la Revoluție la dominația globală a portavioanelor, Marina SUA și-a definit epoca prin inovație, curaj și prezență permanentă pe toate oceanele lumii."
            : "From the Revolution to global carrier dominance, the U.S. Navy has defined each era through innovation, courage, and permanent presence across every ocean on Earth."}
        />

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central spine */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/8 md:-translate-x-px" />

          <div className="space-y-0">
            {events.map((event, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={cn(
                    "relative grid gap-8 py-8",
                    "md:grid-cols-[1fr_auto_1fr]",
                    "grid-cols-[auto_1fr]"
                  )}
                >
                  {/* Left content (desktop) */}
                  <div className={cn(
                    "hidden md:flex flex-col",
                    isLeft ? "items-end text-right" : "items-end text-right opacity-0"
                  )}>
                    {isLeft && (
                      <div className="navy-panel-tactical p-6 max-w-sm">
                        <div className="relative w-full aspect-[16/10] mb-4 overflow-hidden border border-white/5 bg-neutral-900">
                          <Image
                            src={event.imageSrc}
                            alt={event.title}
                            fill
                            sizes="384px"
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            placeholder="blur"
                            blurDataURL={BLUR_PLACEHOLDER}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="navy-font-mono text-[11px] font-bold tracking-widest text-[#7d93ab] mb-2.5">{event.significance}</div>
                        <h4 className="navy-font-display text-lg font-black uppercase text-white leading-tight mb-3">{event.title}</h4>
                        <p className="text-[13px] sm:text-[14px] leading-relaxed text-white/65 font-medium">{event.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Center node */}
                  <div className="flex flex-col items-center z-10">
                    <div className="flex h-12 w-12 items-center justify-center border border-white/10 bg-black text-white">
                      <span className="navy-font-mono text-[13px] font-bold tracking-wider text-white">{event.year}</span>
                    </div>
                  </div>

                  {/* Right content (desktop) / Main content (mobile) */}
                  <div className={cn(
                    "flex flex-col",
                    !isLeft ? "items-start text-left" : "md:opacity-0 md:pointer-events-none items-start text-left"
                  )}>
                    {/* Always show on mobile */}
                    <div className="navy-panel-tactical p-6 max-w-sm md:hidden">
                      <div className="relative w-full aspect-[16/10] mb-4 overflow-hidden border border-white/5 bg-neutral-900">
                        <Image
                          src={event.imageSrc}
                          alt={event.title}
                          fill
                          sizes="100vw"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          placeholder="blur"
                          blurDataURL={BLUR_PLACEHOLDER}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="navy-font-mono text-[11px] font-bold tracking-widest text-[#7d93ab] mb-2.5">{event.significance}</div>
                      <h4 className="navy-font-display text-lg font-black uppercase text-white leading-tight mb-3">{event.title}</h4>
                      <p className="text-[13px] sm:text-[14px] leading-relaxed text-white/65 font-medium">{event.description}</p>
                    </div>
                    {/* Show on desktop for right-side items */}
                    {!isLeft && (
                      <div className="navy-panel-tactical p-6 max-w-sm hidden md:block">
                        <div className="relative w-full aspect-[16/10] mb-4 overflow-hidden border border-white/5 bg-neutral-900">
                          <Image
                            src={event.imageSrc}
                            alt={event.title}
                            fill
                            sizes="384px"
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            placeholder="blur"
                            blurDataURL={BLUR_PLACEHOLDER}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="navy-font-mono text-[11px] font-bold tracking-widest text-[#7d93ab] mb-2.5">{event.significance}</div>
                        <h4 className="navy-font-display text-lg font-black uppercase text-white leading-tight mb-3">{event.title}</h4>
                        <p className="text-[13px] sm:text-[14px] leading-relaxed text-white/65 font-medium">{event.description}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 15. NavySpecWarSection — Navy SEALs & SWCC Dossier
// ─────────────────────────────────────────────────────────────────────────────

export function NavySpecWarSection({
  units,
  locale = "en",
}: {
  units: NavySpecWarUnit[];
  locale?: Locale;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = units[activeIndex];
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(96,108,126,0.12),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 navy-grid-plane opacity-15 pointer-events-none" />
      <div className="navy-noise absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-[1520px]">
        <SectionTitle
          label={isRo ? "OPERAȚIUNI SPECIALE NAVALE" : "NAVAL SPECIAL WARFARE"}
          titlePart1={isRo ? "VÂRFUL" : "TIP OF"}
          titlePart2={isRo ? "SULIȚEI" : "THE SPEAR"}
          body={isRo
            ? "Comandamentul Operațiunilor Speciale Navale pregătește și desfășoară forțe de operațiuni speciale maritime pentru a conduce acțiunea directă, recunoașterea specială și războiul neconvențional în medii maritime, litorale și terestre."
            : "Naval Special Warfare Command trains and deploys maritime special operations forces to conduct direct action, special reconnaissance, and unconventional warfare across maritime, littoral, and land environments."}
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-0 overflow-hidden rounded-lg border border-white/5 bg-[#020202]"
        >
          {/* Left: Unit selector */}
          <div className="flex flex-row lg:flex-col border-b lg:border-b-0 lg:border-r border-white/5 bg-black/40">
            {units.map((unit, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative flex-1 lg:flex-auto min-h-24 lg:min-h-40 overflow-hidden border-r lg:border-r-0 lg:border-b border-white/5 last:border-r-0 last:border-b-0 p-6 text-left transition-all duration-300",
                    selected ? "bg-white/[0.04] text-white" : "text-white/55 hover:bg-white/[0.015] hover:text-white/80"
                  )}
                >
                  {selected && (
                    <motion.div
                      layoutId="navy-specwar-active"
                      className="absolute inset-y-0 left-0 w-[2px] bg-[#7d93ab] hidden lg:block"
                      transition={{ type: "spring", stiffness: 330, damping: 35 }}
                    />
                    )}
                  <div className="relative z-10">
                    <div className="navy-font-mono text-[11px] font-bold uppercase tracking-[0.15em] mb-2 text-[#7d93ab]">{unit.role}</div>
                    <div className="navy-font-display text-xl lg:text-2xl font-black uppercase leading-tight">{unit.name}</div>
                    <div className="hidden lg:block mt-2 text-[11px] text-white/55 font-medium">{unit.fullName}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Active unit details */}
          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Header */}
                <div>
                  <div className="navy-font-mono text-[11px] font-bold uppercase tracking-[0.15em] mb-3 text-[#7d93ab]">{active.fullName}</div>
                  <h3 className="navy-font-display text-3xl md:text-4xl font-black uppercase text-white leading-tight">{active.name}</h3>
                </div>

                {/* Description */}
                <p className="text-[13px] leading-relaxed text-white/65 font-medium max-w-2xl">{active.description}</p>

                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
                  {active.stats.map((stat) => (
                    <div key={stat.label} className="bg-[#020202] p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-white/45 mb-2">{stat.label}</div>
                      <div className="text-sm font-bold text-white">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Mission profile tags */}
                <div>
                  <div className="navy-font-mono text-[11px] font-bold uppercase tracking-widest text-white/45 mb-3">
                    {isRo ? "PROFILURI DE MISIUNE" : "MISSION PROFILES"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {active.missions.map((mission) => (
                      <span
                        key={mission}
                        className="border border-white/8 bg-white/[0.02] px-3.5 py-1.5 text-[11px] font-bold uppercase text-white/70 tracking-wider"
                      >
                        {mission}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Selection rate visual (only for SEALs) */}
                {active.id === "seal-teams" && (
                  <div className="navy-panel-tactical p-5 mt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="navy-font-mono text-[11px] font-bold uppercase tracking-widest text-white/60">
                        {isRo ? "RATA DE SELECȚIE BUD/S" : "BUD/S SELECTION RATE"}
                      </span>
                      <span className="text-sm font-bold text-white">~25%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "25%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ background: "#7d93ab", boxShadow: "0 0 8px rgba(150,160,175,0.18)" }}
                      />
                    </div>
                    <p className="mt-3 text-[12px] text-white/55 leading-relaxed font-medium">
                      {isRo
                        ? "Din fiecare clasă BUD/S, aproximativ 75% din candidați renunță sau sunt eliminați. Cei care rămân devin unii dintre cei mai capabili operatori militari din lume."
                        : "Of every BUD/S class, approximately 75% of candidates drop on request or are eliminated. Those who remain become some of the most capable military operators on Earth."}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 16. NavyAirWingComposition — Carrier Air Wing Squadron Roster
// ─────────────────────────────────────────────────────────────────────────────

export function NavyAirWingComposition({
  squadrons,
  locale = "en",
}: {
  squadrons: NavyAirWingSquadron[];
  locale?: Locale;
}) {
  const isRo = locale === "ro";
  const totalAircraft = squadrons.reduce((sum, s) => sum + s.count, 0);

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_-10%,rgba(96,108,126,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 navy-grid-plane opacity-15 pointer-events-none" />
      <div className="navy-noise absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-[1520px]">
        <SectionTitle
          label={isRo ? "GRUPUL AERIAN DE PORTAVION" : "CARRIER AIR WING"}
          titlePart1={isRo ? "ESCADRILE" : "SQUADRON"}
          titlePart2={isRo ? "AERIENE" : "ROSTER"}
          body={isRo
            ? "Un grup aerian de portavion combină avioane de vânătoare, războiul electronic, alertă timpurie, elicoptere ASW, logistică și platforme autonome într-un singur ecosistem aerospațial integrat."
            : "A carrier air wing combines strike fighters, electronic warfare, airborne early warning, ASW helicopters, fleet logistics, and autonomous platforms into a single integrated aerospace ecosystem."}
        />

        {/* Total aircraft callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="flex justify-center mb-12"
        >
          <div className="navy-panel-tactical px-8 py-4 flex items-center gap-6">
            <div className="text-center">
              <div className="navy-font-mono text-[11px] font-bold tracking-widest text-white/45 mb-1">{isRo ? "TOTAL AERONAVE / CVW" : "TOTAL AIRCRAFT / CVW"}</div>
              <div className="text-3xl font-black text-white">{totalAircraft}</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="navy-font-mono text-[11px] font-bold tracking-widest text-white/45 mb-1">{isRo ? "TIPURI ESCADRILE" : "SQUADRON TYPES"}</div>
              <div className="text-3xl font-black text-white">{squadrons.length}</div>
            </div>
          </div>
        </motion.div>

        {/* Squadron grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-white/5">
          {squadrons.map((sq, i) => (
            <motion.div
              key={sq.aircraft}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group relative bg-[#020202] p-6 transition-colors duration-300 hover:bg-[#000a14]"
            >
              {/* Accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#7d93ab]/40" />

              <div className="flex items-center justify-between mb-4">
                <span className="navy-font-mono text-[11px] font-bold uppercase tracking-widest text-[#7d93ab]">{sq.designation}</span>
                <span className="navy-font-display text-2xl font-black text-white">×{sq.count}</span>
              </div>

              <div className="text-[11px] font-bold uppercase tracking-wider text-white/55 mb-2">{sq.type}</div>
              <h4 className="navy-font-display text-base font-extrabold uppercase text-white leading-tight mb-4" style={{ letterSpacing: "0.03em" }}>
                {sq.aircraft}
              </h4>

              <p className="text-[12px] leading-relaxed text-white/60 font-medium">{sq.role}</p>

              <div className="mt-5 h-px w-full bg-white/5">
                <div
                  className="h-px w-8 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: "#7d93ab" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 17. NavyBasesSection — Forward Deployed Naval Installations
// ─────────────────────────────────────────────────────────────────────────────

export function NavyBasesSection({
  bases,
  locale = "en",
}: {
  bases: NavyBase[];
  locale?: Locale;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = bases[activeIndex];
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_60%,rgba(96,108,126,0.12),transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 navy-grid-plane opacity-12 pointer-events-none" />
      <div className="navy-noise absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-[1520px]">
        <SectionTitle
          label={isRo ? "INFRASTRUCTURĂ GLOBALĂ" : "GLOBAL INFRASTRUCTURE"}
          titlePart1={isRo ? "BAZE" : "FORWARD"}
          titlePart2={isRo ? "AVANSATE" : "STATIONS"}
          body={isRo
            ? "Portavioanele și submarinele nu operează din vid. Puterea navală necesită o rețea de baze, dane, depozite de armament și instalații de mentenanță distribuite strategic pe glob."
            : "Carriers and submarines don't operate from a vacuum. Sea power requires a global network of bases, piers, magazines, and maintenance facilities positioned to sustain persistent forward presence."}
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0 overflow-hidden rounded-lg border border-white/5 bg-[#020202]"
        >
          {/* Left: Active base details */}
          <div className="p-8 md:p-10 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/8 bg-black"
                    style={{ color: "#7d93ab" }}
                  >
                    <MapPin size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="navy-font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#7d93ab] mb-1">{active.region}</div>
                    <h3 className="navy-font-display text-2xl md:text-3xl font-black uppercase text-white leading-tight">{active.name}</h3>
                  </div>
                </div>

                <div className="navy-font-mono text-[11px] font-bold uppercase tracking-widest mb-4 text-[#7d93ab]">
                  {active.location} · {active.role}
                </div>

                <p className="text-[13px] leading-relaxed text-white/65 font-medium max-w-2xl mb-8">{active.description}</p>

                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 mt-auto">
                  {active.stats.map((stat) => (
                    <div key={stat.label} className="bg-[#020202] p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-white/45 mb-2">{stat.label}</div>
                      <div className="text-sm font-bold text-white">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Base selector */}
          <div className="flex flex-col border-t lg:border-t-0 lg:border-l border-white/5 bg-black/40">
            {bases.map((base, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={base.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative overflow-hidden border-b border-white/5 last:border-b-0 p-5 text-left transition-all duration-300",
                    selected ? "bg-white/[0.04] text-white" : "text-white/55 hover:bg-white/[0.015] hover:text-white/80"
                  )}
                >
                  {selected && (
                    <motion.div
                      layoutId="navy-base-active"
                      className="absolute inset-y-0 left-0 w-[2px]"
                      style={{ backgroundColor: "#7d93ab" }}
                      transition={{ type: "spring", stiffness: 330, damping: 35 }}
                    />
                  )}
                  <div className="pl-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={11} strokeWidth={1.5} className="text-[#7d93ab]/60" />
                      <span className="navy-font-mono text-[10px] font-semibold uppercase tracking-widest text-[#7d93ab]/70">{base.region}</span>
                    </div>
                    <div className="navy-font-display text-sm sm:text-base font-extrabold uppercase leading-snug mt-1.5" style={{ letterSpacing: "0.04em" }}>
                      {base.name}
                    </div>
                    <div className="mt-1 text-[11px] text-white/45 font-medium">{base.location}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 18. NavyHumanitarianSection — Disaster Relief & Soft Power
// ─────────────────────────────────────────────────────────────────────────────

export function NavyHumanitarianSection({
  missions,
  locale = "en",
}: {
  missions: NavyHumanitarianMission[];
  locale?: Locale;
}) {
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(96,108,126,0.10),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 navy-grid-plane opacity-10 pointer-events-none" />
      <div className="navy-noise absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-[1520px]">
        <SectionTitle
          label={isRo ? "OPERAȚIUNI UMANITARE" : "HUMANITARIAN OPERATIONS"}
          titlePart1={isRo ? "PUTERE" : "FORCE"}
          titlePart2={isRo ? "PENTRU BINE" : "FOR GOOD"}
          body={isRo
            ? "Când dezastrul lovește, Marina este adesea primul răspuns. Navele spital, grupurile amfibii și batalionele Seabee livrează ajutor la scară pe care nicio organizație civilă nu o poate egala."
            : "When disaster strikes, the Navy is often the first response. Hospital ships, amphibious groups, and Seabee construction battalions deliver aid at a scale no civilian organization can match."}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {missions.map((mission, i) => (
            <motion.div
              key={mission.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group bg-[#020202] p-8 transition-colors duration-300 hover:bg-[#000a14]"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center border border-white/8 bg-black"
                    style={{ color: "#7d93ab" }}
                  >
                    <Heart size={14} strokeWidth={1.5} />
                  </div>
                  <span className="navy-font-mono text-[11px] font-bold uppercase tracking-widest text-[#7d93ab]/80">{mission.year}</span>
                </div>
              </div>

              <h4 className="navy-font-display text-xl font-black uppercase text-white leading-tight mb-4">{mission.name}</h4>
              <p className="text-[13px] leading-relaxed text-white/65 font-medium mb-6">{mission.description}</p>

              {/* Impact & Asset */}
              <div className="grid grid-cols-1 gap-3 mt-auto">
                <div className="navy-panel-tactical p-3 flex items-center gap-3">
                  <span className="navy-font-mono text-[11px] font-bold uppercase tracking-widest text-white/45 shrink-0">{isRo ? "IMPACT" : "IMPACT"}</span>
                  <span className="text-[11px] font-bold text-white">{mission.impact}</span>
                </div>
                <div className="navy-panel-tactical p-3 flex items-center gap-3">
                  <span className="navy-font-mono text-[11px] font-bold uppercase tracking-widest text-white/45 shrink-0">{isRo ? "RESURSE" : "ASSETS"}</span>
                  <span className="text-[12px] text-white/65 font-semibold font-mono">{mission.asset}</span>
                </div>
              </div>

              <div className="mt-6 h-px w-full bg-white/5">
                <div
                  className="h-px w-10 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: "#7d93ab" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
