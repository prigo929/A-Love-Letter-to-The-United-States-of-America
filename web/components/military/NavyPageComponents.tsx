"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import {
  Anchor,
  ArrowUpRight,
  Cpu,
  Gauge,
  Network,
  Plane,
  Satellite,
  Shield,
  Ship,
  Waves,
} from "lucide-react";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type {
  NavyCapability,
  NavyCommandLayer,
  NavyFutureProgram,
  NavyMetric,
  NavyPlatform,
  NavyTheater,
  NavyVisualPanel,
} from "@/lib/data/navy-data";

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
        --navy-void: #020202;
        --navy-surface: #00060d;
        --navy-accent-dark: #001A33; /* Strong Navy */
        --navy-panel: rgba(0, 26, 51, 0.45);
        --navy-border: rgba(255, 255, 255, 0.05);
        --navy-border-glow: rgba(0, 132, 255, 0.12);
        --navy-blue: #8edcff;
        --navy-sea: #70e0bf;
        --navy-warm: #f2d48a;
        --navy-red: #ff6b6b;
        background: var(--navy-black);
        color: white;
      }

      .navy-font-display {
        font-family: var(--font-archivo), Inter, system-ui, sans-serif;
        letter-spacing: -0.03em;
        text-transform: uppercase;
      }

      .navy-font-mono {
        font-family: var(--font-mono), "SFMono-Regular", Consolas, monospace;
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }

      .navy-grid-plane {
        background-image:
          radial-gradient(rgba(0, 132, 255, 0.06) 1px, transparent 1px),
          radial-gradient(rgba(242, 212, 138, 0.03) 1px, transparent 1px);
        background-size: 28px 28px;
        mask-image: radial-gradient(ellipse at 50% 45%, black 0%, transparent 80%);
      }

      .navy-noise::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0.12;
        mix-blend-mode: screen;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E");
      }

      .navy-cinematic-line {
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.28), transparent);
      }

      .navy-glass-premium {
        background: rgba(0, 3, 8, 0.85);
        backdrop-filter: blur(30px) saturate(1.1);
        -webkit-backdrop-filter: blur(30px) saturate(1.1);
        border: 1px solid var(--navy-border-glow);
        box-shadow: 
          inset 0 0 24px rgba(0, 26, 51, 0.7),
          0 12px 48px rgba(0, 0, 0, 0.9);
      }

      .navy-panel-tactical {
        background: rgba(0, 6, 13, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.06);
        box-shadow: inset 0 0 16px rgba(0, 26, 51, 0.4);
      }

      .navy-depth-ring {
        background:
          radial-gradient(circle at 50% 50%, transparent 0 38%, rgba(0, 132, 255, 0.12) 39%, transparent 40%),
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
        background: linear-gradient(105deg, transparent 36%, rgba(142, 220, 255, 0.1), transparent 64%);
        animation: navy-sheen 8s ease-in-out infinite;
      }
    `}</style>
  );
}

export function NavyPageProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-px bg-white/4">
      <motion.div
        className="h-full origin-left bg-[linear-gradient(90deg,#001A33,#8edcff,#ffffff)]"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1.5 NavyCountUp — High-Performance Numerical Counter
// ─────────────────────────────────────────────────────────────────────────────

function NavyCountUp({ value, color = "white" }: { value: string; color?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayVal, setDisplayVal] = useState("0");

  useEffect(() => {
    const numericMatch = value.match(/^([\d.]+)(.*)$/);
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
          setDisplayVal(latest.toFixed(0) + suffix);
        },
      });
      return () => controls.stop();
    }
  }, [inView, value]);

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
      <div className="navy-drift absolute -left-20 top-20 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(0,42,102,0.22),transparent_62%)] blur-3xl" />
      <div className="navy-drift absolute -right-24 bottom-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(0,26,51,0.15),transparent_64%)] blur-3xl" />
      
      <div className="navy-grid-plane absolute inset-0 opacity-40" />
      <div className="navy-noise absolute inset-0" />

      <div className="relative z-10 flex min-h-[100svh] items-end">
        <div className="mx-auto grid w-full max-w-[1520px] gap-10 px-5 pb-8 pt-32 sm:px-8 md:grid-cols-[1fr_420px] md:items-end md:pb-12 lg:px-12">
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
                  <NavyCountUp value={metric.value} />
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">{metric.label}</div>
                <p className="mt-4 text-[11px] leading-relaxed text-white/40">{metric.detail}</p>
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
    <section className="border-y border-white/5 bg-[#020202]">
      <div className="mx-auto grid max-w-[1520px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="min-h-52 border-b border-r border-white/5 p-8 lg:border-b-0 last:border-r-0">
            <div className="navy-font-display text-5xl font-extralight text-white">
              <NavyCountUp value={metric.value} />
            </div>
            <div className="mt-5 text-xs font-bold uppercase tracking-widest text-white/70">{metric.label}</div>
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-white/40">{metric.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. NavyCapabilityGrid — Bento Grid Systems
// ─────────────────────────────────────────────────────────────────────────────

export function NavyCapabilityGrid({ capabilities, locale = "en" }: { capabilities: NavyCapability[]; locale?: Locale }) {
  const icons = [Ship, Waves, Shield, Cpu];

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(0,42,102,0.15),transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 navy-grid-plane opacity-20 pointer-events-none" />
      <div className="navy-noise absolute inset-0 opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-[1520px]">
        <SectionTitle
          label={locale === "ro" ? "ARHITECTURA CAPABILITĂȚILOR" : "CAPABILITY ARCHITECTURE"}
          titlePart1={locale === "ro" ? "SISTEM" : "INTEGRATED"}
          titlePart2={locale === "ro" ? "INTEGRAT" : "SYSTEMS"}
          body={locale === "ro" 
            ? "Forța Marinei derivă din interoperabilitatea totală a navelor, aeronavelor, submarinelor, senzorilor orbitali și echipajelor înalt calificate." 
            : "The Navy's power comes from the integration of ships, aircraft, submarines, satellites, software, industrial depth, and crews trained to operate under extreme tempo."}
        />
        <div className="mt-14 grid grid-cols-1 gap-px bg-white/5 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((capability, index) => {
            const Icon = icons[index] ?? Ship;
            return (
              <motion.article
                key={capability.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="group navy-panel-tactical min-h-[420px] p-8 transition-all duration-300 hover:bg-[#000a14]"
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-11 w-11 items-center justify-center border border-white/8 bg-black"
                      style={{ color: capability.accent }}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <span className="navy-font-mono text-xs uppercase tracking-wider text-white/30">{capability.stat}</span>
                  </div>
                  <div className="mt-10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{capability.kicker}</div>
                  <h3 className="navy-font-display mt-4 text-2xl font-black uppercase leading-none text-white/90">
                    {capability.title}
                  </h3>
                  <p className="mt-6 text-xs leading-relaxed text-white/50">{capability.description}</p>
                  <div className="mt-auto pt-10">
                    <div className="h-px w-full bg-white/5">
                      <div
                        className="h-px w-12 transition-all duration-500 group-hover:w-full"
                        style={{ backgroundColor: capability.accent }}
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,42,102,0.18),transparent_32%),radial-gradient(circle_at_82%_72%,rgba(0,26,51,0.15),transparent_34%)]" />
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
                    selected ? "bg-white/[0.04] text-white" : "text-white/40 hover:bg-white/[0.015] hover:text-white/70"
                  )}
                >
                  {selected && (
                    <motion.div
                      layoutId="navy-theater-active"
                      className="absolute inset-0 border border-white/10"
                      style={{ boxShadow: 'inset 0 0 12px rgba(0, 132, 255, 0.08)' }}
                      transition={{ type: "spring", stiffness: 320, damping: 34 }}
                    />
                  )}
                  <div className="relative z-10">
                    <div className="navy-font-mono text-[9px] uppercase tracking-[0.2em]">{theater.region}</div>
                    <div className="navy-font-display mt-3 text-2xl font-black uppercase leading-none">{theater.name}</div>
                    <div className="mt-5 h-px w-full bg-white/5">
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
            <FleetMesh accent={active.accent} />

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
                  <div className="navy-font-mono text-[9px] font-bold uppercase text-white/50 tracking-[0.2em]">{active.signal}</div>
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
                <div className="flex items-center justify-between gap-4">
                  <span className="navy-font-mono text-[10px] uppercase tracking-widest text-white/40">
                    {locale === "ro" ? "Profilul teatrului" : "Theater profile"}
                  </span>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: active.accent }} />
                </div>
                <p className="mt-8 text-xs leading-relaxed text-white/60">{active.description}</p>
                <div className="mt-8 grid gap-px bg-white/5">
                  {active.metrics.map((metric) => (
                    <div key={metric.label} className="grid grid-cols-[1fr_auto] items-center gap-5 bg-[#020202] p-4 border border-white/5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">{metric.label}</span>
                      <span className="navy-font-display text-sm font-black uppercase text-white">{metric.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-10">
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
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDossierOpen]);

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#000000,transparent_20%,transparent_80%,#000000)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,42,102,0.15),transparent_55%)] animate-pulse" style={{ animationDuration: '6s' }} />
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
          className="relative mt-14 grid min-h-[760px] overflow-hidden border border-white/5 bg-[#020202] lg:grid-cols-[1fr_440px]"
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
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#000000_0%,rgba(0,0,0,0.18)_46%,#000000_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_46%,#000000_100%)]" />
            
            {/* Active label badge */}
            <div className="absolute left-8 top-8 z-10 hidden max-w-sm border border-white/5 bg-black/40 p-5 backdrop-blur-xl md:block">
              <div className="navy-font-mono text-[9px] uppercase tracking-widest text-white/40">
                {locale === "ro" ? "Platformă activă" : "Active platform"}
              </div>
              <div className="navy-font-display mt-3 text-3xl font-black uppercase leading-none text-white">{active.name}</div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-9 lg:max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="navy-font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">{active.className}</div>
                  <h3 className="navy-font-display mt-4 text-4xl font-black uppercase leading-none md:text-6xl text-white">
                    {active.role}
                  </h3>
                  <p className="mt-7 max-w-2xl text-xs leading-relaxed text-white/50">{active.capability}</p>
                  
                  {/* Premium dossier trigger button */}
                  <button
                    onClick={() => setIsDossierOpen(true)}
                    className="mt-8 flex h-11 items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 px-5 text-xs font-bold uppercase text-white tracking-[0.2em] backdrop-blur-md transition-all"
                  >
                    {locale === "ro" ? "VEZI DOSARUL TEHNIC →" : "VIEW TECH DOSSIER →"}
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Selector Column */}
          <div className="flex flex-col border-t border-white/5 bg-black/40 p-6 backdrop-blur-xl lg:border-l lg:border-t-0">
            <div className="grid gap-2">
              {platforms.map((platform, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={platform.name}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "relative overflow-hidden border border-white/5 p-4 text-left transition-colors duration-300",
                      selected ? "bg-white/[0.04] text-white" : "bg-white/[0.008] text-white/40 hover:bg-white/[0.02] hover:text-white/70"
                    )}
                  >
                    {selected && (
                      <motion.div
                        layoutId="navy-platform-active"
                        className="absolute inset-y-0 left-0 w-[2px] bg-[#8edcff]"
                        transition={{ type: "spring", stiffness: 330, damping: 35 }}
                      />
                    )}
                    <div className="pl-3">
                      <div className="navy-font-display text-xl font-black uppercase leading-none">{platform.name}</div>
                      <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-white/30">{platform.className}</div>
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
                    <div key={spec.label} className="bg-black p-4 border border-white/5">
                      <div className="text-[9px] uppercase tracking-widest text-white/30">{spec.label}</div>
                      <div className="mt-2 text-xs font-bold text-white/80">{spec.value}</div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
              <div className="mt-6 h-px bg-white/5">
                <motion.div
                  key={activeIndex}
                  className="h-px bg-[linear-gradient(90deg,#001A33,#8edcff,#ffffff)]"
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
                <span className="navy-font-mono text-[10px] tracking-[0.3em] text-white/50">
                  {locale === "ro" ? "DOSAR TEHNIC FLOTĂ" : "FLEET SYSTEM DOSSIER"}
                </span>
                <button
                  onClick={() => setIsDossierOpen(false)}
                  className="navy-font-mono text-[10px] hover:text-white transition-colors tracking-[0.2em] text-white/40"
                >
                  {locale === "ro" ? "[ ÎNCHIDE ]" : "[ CLOSE ]"}
                </button>
              </div>

              {/* Parallax Hero Image Block */}
              <div className="relative w-full h-[35dvh] md:h-[45dvh] overflow-hidden">
                <Image src={active.imageSrc} alt={active.imageAlt} fill className="object-cover" priority sizes="100vw" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-8 left-6 md:left-10">
                  <p className="navy-font-mono text-[9px] mb-3 tracking-[0.25em] text-[#8edcff] uppercase">{active.className}</p>
                  <h3 className="navy-font-display text-3xl md:text-5xl font-black tracking-tighter uppercase text-white leading-none">
                    {active.name}
                  </h3>
                </div>
              </div>

              {/* Content Panel */}
              <div className="px-6 md:px-10 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-12">
                  <div>
                    <div className="navy-font-mono text-[10px] mb-4 tracking-[0.2em] text-white/40">
                      {locale === "ro" ? "DESCRIEREA CAPABILITĂȚILOR" : "CAPABILITY OVERVIEW"}
                    </div>
                    <p className="text-xs leading-relaxed text-white/60 mb-8">{active.capability}</p>
                    
                    {/* Dark Navy visual signature band */}
                    <div className="pl-5 border-l-2 border-[#001A33] bg-[#001a33]/10 py-4 pr-4">
                      <div className="navy-font-mono text-[9px] mb-2 tracking-[0.2em] text-[#8edcff]">
                        {locale === "ro" ? "SIGNATURĂ STRATEGICĂ" : "STRATEGIC SIGNATURE"}
                      </div>
                      <p className="text-[11px] leading-relaxed text-white/40">
                        {locale === "ro" 
                          ? "Această navă reprezintă prezență americană deplină, suveranitate operațională în ape internaționale și integrare tactică în kill-web-ul digital."
                          : "This platform represents complete sovereign presence, operational maneuverability, and multi-domain fire-control networking globally."}
                      </p>
                    </div>
                  </div>

                  <div className="hidden lg:block bg-white/5" />

                  <div>
                    <div className="navy-font-mono text-[10px] mb-6 tracking-[0.2em] text-white/40">
                      {locale === "ro" ? "SPECIFICAȚII TEHNICE" : "TECHNICAL SPECIFICATIONS"}
                    </div>
                    
                    <div className="space-y-4">
                      {active.specs.map((spec, i) => (
                        <div key={i} className="flex justify-between items-baseline py-2.5 border-b border-white/5 last:border-b-0">
                          <span className="navy-font-mono text-[9px] tracking-[0.15em] text-white/30">{spec.label.toUpperCase()}</span>
                          <span className="text-xs font-bold text-white/80">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-3">
                      <div className="bg-[#000a14] border border-white/5 p-4">
                        <div className="navy-font-mono text-[8px] text-white/30 tracking-wider">DOMAIN</div>
                        <div className="text-xs font-bold text-[#8edcff] mt-1">{locale === "ro" ? "DOMINANȚĂ GLOBALĂ" : "GLOBAL DOMAIN"}</div>
                      </div>
                      <div className="bg-[#000a14] border border-white/5 p-4">
                        <div className="navy-font-mono text-[8px] text-white/30 tracking-wider">STATUS</div>
                        <div className="text-xs font-bold text-[#70e0bf] mt-1">{locale === "ro" ? "ACTIV / OPERAȚIONAL" : "DEPLOYED / ACT"}</div>
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
// 7. NavyCommandStack — Command Layers (Vercel-inspired)
// ─────────────────────────────────────────────────────────────────────────────

export function NavyCommandStack({ layers, locale = "en" }: { layers: NavyCommandLayer[]; locale?: Locale }) {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,42,102,0.15),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(0,26,51,0.12),transparent_30%)]" />
      <div className="absolute inset-0 navy-grid-plane opacity-15 pointer-events-none" />
      <div className="navy-noise absolute inset-0 opacity-30 pointer-events-none" />
      <div className="relative mx-auto grid max-w-[1520px] gap-14 lg:grid-cols-[0.72fr_1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionTitle
            label={locale === "ro" ? "COMANDĂ ȘI CONTROL" : "COMMAND AND CONTROL"}
            titlePart1={locale === "ro" ? "VITEZĂ" : "DECISION"}
            titlePart2={locale === "ro" ? "DECIZIONALĂ" : "SPEED"}
            body={locale === "ro"
              ? "Flota este concepută pentru a detecta prima, a decide mai rapid și a crea efecte multi-domeniu sincronizate."
              : "The fleet is designed to sense first, decide faster, and create effects from multiple domains at once. The beautiful part is the integration, not a single weapon."}
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {[Satellite, Network, Gauge, Plane].map((Icon, index) => (
              <div key={index} className="flex h-12 w-12 items-center justify-center border border-white/5 bg-[#000a14] text-white/50">
                <Icon size={18} strokeWidth={1.5} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {layers.map((layer, index) => (
            <motion.article
              key={layer.title}
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="navy-panel-tactical p-7 backdrop-blur-xl md:p-9 border border-white/5"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="navy-font-mono text-[9px] uppercase tracking-widest text-white/30">Layer 0{index + 1}</div>
                  <h3 className="navy-font-display mt-3 text-2xl font-black uppercase leading-none text-white">{layer.title}</h3>
                </div>
                <div className="h-1 w-24 rounded-full" style={{ backgroundColor: layer.accent }} />
              </div>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-white/50">{layer.subtitle}</p>
              <p className="mt-5 text-xs leading-relaxed text-white/40">{layer.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {layer.nodes.map((node) => (
                  <span key={node} className="border border-white/5 bg-black px-3 py-1.5 text-[10px] font-semibold uppercase text-white/40 tracking-wider">
                    {node}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
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
  return (
    <section className="relative overflow-hidden bg-[#020202] px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,42,102,0.12),transparent_50%)] pointer-events-none" />
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
              className="min-h-[360px] bg-black p-8 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="mb-6 flex flex-col items-start gap-3">
                  <span className="border border-[#001a33] bg-[#001a33]/40 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#8edcff]/90">
                    {program.status}
                  </span>
                  <span className="navy-font-display text-3xl sm:text-4xl font-black text-white/10 block leading-none" title={program.label}>
                    {program.label}
                  </span>
                </div>
                <h3 className="navy-font-display mt-8 text-lg sm:text-xl font-black uppercase leading-tight text-white/80">
                  {program.title}
                </h3>
                <p className="mt-4 text-xs leading-relaxed text-white/40">{program.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. NavyClosing — Page Closing Call-to-Action
// ─────────────────────────────────────────────────────────────────────────────

export function NavyClosing({ locale = "en" }: { locale?: Locale }) {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,42,102,0.18),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 navy-grid-plane opacity-25 pointer-events-none" />
      <div className="navy-noise absolute inset-0 opacity-35 pointer-events-none" />
      <div className="relative mx-auto max-w-[1160px] text-center">
        <Anchor className="mx-auto mb-8 text-[#8edcff]/50 animate-pulse" size={32} strokeWidth={1.2} />
        <h2 className="navy-font-display text-4xl font-black uppercase leading-[0.95] md:text-7xl text-white">
          {locale === "ro" ? "Putere militară fără o adresă fixă." : "American power with no fixed address."}
        </h2>
        <p className="mx-auto mt-9 max-w-3xl text-xs leading-relaxed text-white/50 md:text-sm">
          {locale === "ro"
            ? "Un grup de atac de portavioane nu întreabă unde este criza strategică. Mută pista, centrul de comandă securizat, scutul antirachetă și prezența americană direct în teatru."
            : "A Navy carrier group does not ask where the crisis is. It moves the runway, the command center, the missile shield, the logistics train, and the national signal into the theater."}
        </p>
        <div className="mt-12 flex justify-center">
          <Link
            href="/military"
            className="group inline-flex h-12 items-center gap-3 border border-white/10 bg-white px-6 text-xs font-bold uppercase text-black transition-colors hover:bg-white/85"
          >
            {locale === "ro" ? "Prezentare militară" : "Military overview"}
            <ArrowUpRight size={15} strokeWidth={2} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. Sub-components (Radar mesh, section headers)
// ─────────────────────────────────────────────────────────────────────────────

function FleetMesh({ accent }: { accent: string }) {
  const nodes = [
    { x: 18, y: 62, label: "SSN" },
    { x: 34, y: 34, label: "CVN" },
    { x: 52, y: 54, label: "DDG" },
    { x: 66, y: 28, label: "E-2D" },
    { x: 82, y: 66, label: "F-35C" },
  ];

  return (
    <svg
      className="absolute inset-0 z-[5] h-full w-full opacity-80"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fleet-mesh-line" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.08" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.38" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.08" />
        </linearGradient>
      </defs>
      {[
        "M18 62 C32 42 40 38 52 54 S70 44 82 66",
        "M34 34 C46 26 54 26 66 28",
        "M18 62 C28 70 42 72 52 54",
        "M66 28 C74 38 78 50 82 66",
      ].map((d, index) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="url(#fleet-mesh-line)"
          strokeWidth="0.18"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {nodes.map((node, index) => (
        <g key={node.label}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="0.8"
            fill={accent}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.35 + index * 0.08 }}
            vectorEffect="non-scaling-stroke"
          />
          <text
            x={node.x + 1.7}
            y={node.y - 1.4}
            fill="rgba(255,255,255,0.4)"
            fontSize="1.9"
            fontFamily="monospace"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function SectionTitle({
  label,
  titlePart1,
  titlePart2,
  body,
}: {
  label: string;
  titlePart1: string;
  titlePart2: string;
  body: string;
}) {
  return (
    <div className="text-center mb-20 max-w-4xl mx-auto flex flex-col items-center">
      <div className="mil-text-label mb-10 tracking-[0.5em] text-[#8edcff]/85 text-xs sm:text-sm font-bold uppercase">
        [ {label} ]
      </div>
      <h2 className="mil-text-hero mb-6 flex flex-col items-center w-full text-center">
        <span className="block whitespace-nowrap leading-[0.85] text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white">{titlePart1}</span>
        <span className="block whitespace-nowrap text-white/20 leading-[0.85] text-4xl sm:text-6xl lg:text-7xl font-black uppercase">{titlePart2}</span>
      </h2>
      <p className="mt-4 max-w-2xl text-center text-xs sm:text-sm leading-relaxed text-white/60 tracking-wide">
        {body}
      </p>
    </div>
  );
}
