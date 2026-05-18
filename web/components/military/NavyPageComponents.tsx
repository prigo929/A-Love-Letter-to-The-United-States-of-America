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
  NavyCapability,
  NavyCommandLayer,
  NavyFutureProgram,
  NavyMetric,
  NavyPlatform,
  NavyTheater,
  NavyVisualPanel,
  NavyWeaponSystem,
} from "@/lib/data/navy-data";
import { getNavyWeapons } from "@/lib/data/navy-data";

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
    <section className="border-y border-white/5 bg-black">
      <div className="mx-auto grid max-w-[1520px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col px-8 py-12 border-r border-b border-white/5 last:border-r-0">
            <div className="mil-text-metadata mb-6 tracking-[0.3em] font-black text-white">{metric.label}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-[clamp(32px,3.8vw,56px)] sm:text-[clamp(36px,3.8vw,60px)] lg:text-[clamp(40px,3.8vw,64px)] font-extralight tracking-tighter leading-none text-white">
                <NavyCountUp value={metric.value} />
              </span>
            </div>
            <div className="mt-6 mb-4 h-px w-full" style={{
              background: 'linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.05), transparent)'
            }} />
            <div className="mil-text-metadata max-w-[280px] leading-relaxed opacity-60 text-[11px] font-medium tracking-wide text-white/70">
              {metric.detail}
            </div>
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
  const [activeIdx, setActiveIdx] = useState(0);

  // Custom localized logs
  const getLogs = (idx: number) => {
    if (locale === "ro") {
      switch (idx) {
        case 0:
          return [
            "STATUS: SCANARE PERSISTENTĂ ISR SPAȚIU-AER ACTIVĂ",
            "REȚEA: SAT-LINK MILITARĂ CRIPTATĂ (SECURE LEVEL 5)",
            "LĂȚIME BANDĂ: 1.8 GBPS ÎN TIMP REAL DIRECT DIN TEATRU",
            "SATELLITE CUEING: DETECȚIE TACTICĂ FLUX CONTINUU"
          ];
        case 1:
          return [
            "STATUS: COMANDĂ INTEGRATĂ AEGIS BASELINE 10 CONECTATĂ",
            "REȚEA-COOP: CEC ACTIVAT (8 NODURI FLOTĂ CONECTATE)",
            "CONEXIUNE LINK 16: STABILĂ // INTEGRITATE DATE 99.99%",
            "DECISION GRID: FUZIUNE VECTORIALĂ DETECȚIE-CONTROL"
          ];
        case 2:
          return [
            "STATUS: AUTORIZARE ENGAGEMENT JOINT FIRES CONFIRMATĂ",
            "ARSENAL TACTIC: CELULE Mk 41 VLS / TORPILE Mk 48 PREGĂTITE",
            "GHIDARE ACTIVER-VECTOR: LOCK PE COORDONATE ACTIVE",
            "PROIECȚIE DE FORȚĂ: GRUP AERIAN PORTAVION DEPLOYAT"
          ];
        default:
          return [];
      }
    } else {
      switch (idx) {
        case 0:
          return [
            "STATUS: PERSISTENT ACTIVE SPACE-AIR ISR SCAN",
            "UP-LINK: SECURE MILITARY SATELLITE NETWORK (LEVEL 5)",
            "BANDWIDTH: 1.8 GBPS REAL-TIME STREAMING FROM ORBIT",
            "SATELLITE CUEING: PERSISTENT THREAT TRACK DETECTED"
          ];
        case 1:
          return [
            "STATUS: AEGIS BASELINE 10 DECISION CORE ENGAGED",
            "COOP-NET: CEC DEPLOYED (8 FLEET NODES SYNCHRONIZED)",
            "LINK 15/16 STABILITY: 99.999% TACTICAL INTEGRITY",
            "DECISION GRID: FUSING HIGH-SPEED TELEMETRY VOLLEYS"
          ];
        case 2:
          return [
            "STATUS: JOINT FIRES KINETIC ENGAGEMENT AUTHORIZED",
            "READY ARSENAL: Mk 41 VLS CELLS / Mk 48 TUBES CHARGED",
            "ACTIVE GUIDANCE: TERMINAL TARGET ACQUISITION LOCKED",
            "POWER PROJECTION: CARRIER AIR WING STRIKE ACTIVE"
          ];
        default:
          return [];
      }
    }
  };

  const activeLogs = getLogs(activeIdx);
  const activeColor = layers[activeIdx]?.accent || "#8edcff";

  // Typing simulator state for the monospaced terminal logs
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [typingIdx, setTypingIdx] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [timestamps, setTimestamps] = useState<string[]>([]);

  useEffect(() => {
    // Generate simulated high-precision timestamps
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    
    const times = [
      `[${h}:${now.getMinutes()}:${now.getSeconds()}.024]`,
      `[${h}:${now.getMinutes()}:${now.getSeconds()}.108]`,
      `[${h}:${now.getMinutes()}:${now.getSeconds()}.254]`,
      `[${h}:${now.getMinutes()}:${now.getSeconds()}.392]`,
    ];
    setTimestamps(times);
    
    // Clear and reset typing simulation
    setVisibleLines([]);
    setTypingIdx(0);
    setIsTypingComplete(false);
  }, [activeIdx]);

  useEffect(() => {
    if (typingIdx < activeLogs.length) {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => [...prev, activeLogs[typingIdx]]);
        setTypingIdx((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [typingIdx, activeLogs]);

  // Command shell prompt
  const getPromptHeader = () => {
    switch (activeIdx) {
      case 0:
        return "C2-DECK:~# exec_isr_scan --level-5";
      case 1:
        return "C2-DECK:~# sysctl --init aegis_combat_core";
      case 2:
        return "C2-DECK:~# authorize_strike --vector-vls";
      default:
        return "C2-DECK:~# sh";
    }
  };

  // Helper to format/parse status tags and color them
  const renderColoredLog = (log: string) => {
    if (log.includes(":")) {
      const [label, val] = log.split(":");
      
      // Check if value contains active keywords to highlight
      const highlights = ["ACTIVĂ", "ONLINE", "CONECTATĂ", "OK", "ONLINE & tracking", "ENGAGED", "SYNCHRONIZED", "CONFIRMED", "ACTIVE"];
      const warningHighlights = ["LOCK", "LOCKED", "STRIKE ACTIVE", "KINETIC ENGAGEMENT"];
      
      let matchedColor = activeColor;
      let matchedFontWeight = "font-bold";
      
      const containsHighlight = highlights.some(h => val.includes(h));
      const containsWarning = warningHighlights.some(w => val.includes(w));
      
      if (containsHighlight) {
        matchedColor = "#34d399"; // Bright emerald green
      } else if (containsWarning) {
        matchedColor = "#f87171"; // Bright red
      }
      
      return (
        <span className="flex flex-wrap gap-1 items-center">
          <span className="text-white/40 uppercase">{label}:</span>
          <span
            className={matchedFontWeight}
            style={{
              color: matchedColor,
              textShadow: containsHighlight || containsWarning ? `0 0 8px ${matchedColor}40` : "none"
            }}
          >
            {val}
          </span>
        </span>
      );
    }
    return <span className="flex-1">{log}</span>;
  };

  // Icons corresponding to layers
  const icons = [Satellite, Network, Crosshair];

  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32 lg:px-12 border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,42,102,0.18),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(0,26,51,0.12),transparent_40%)]" />
      <div className="absolute inset-0 navy-grid-plane opacity-15 pointer-events-none" />
      <div className="navy-noise absolute inset-0 opacity-35 pointer-events-none" />
      
      <div className="relative mx-auto max-w-[1520px]">
        {/* Dynamic section title with C2 design label */}
        <div className="mb-16">
          <div className="navy-font-mono text-[10px] tracking-[0.3em] text-[#8edcff]/70 uppercase mb-3">
            {locale === "ro" ? "[ SISTEM DE COMANDĂ ȘI CONTROL C2 ]" : "[ COMMAND & CONTROL ARCHITECTURE ]"}
          </div>
          <h2 className="navy-font-display text-4xl font-black uppercase leading-[0.95] md:text-7xl text-white">
            {locale === "ro" ? "VITEZĂ DECIZIONALĂ" : "DECISION SPEED"}
          </h2>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-white/50">
            {locale === "ro"
              ? "Flota este concepută pentru a detecta prima, a decide mai rapid și a lansa atacuri multi-domeniu sincronizate. Secretul constă în integrarea de rețea, nu într-o armă singulară."
              : "The fleet is designed to sense first, decide faster, and create effects from multiple domains at once. The real power is the cooperative network integration, not a single weapon."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:items-start mt-12">
          {/* Left Column: Cyber-Tactical C2 Command HUD */}
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="navy-glass-premium border border-white/10 bg-[#020202] p-6 rounded-lg relative overflow-hidden">
              {/* Radar glowing sweep overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="navy-font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-widest">
                  {locale === "ro" ? "DECK CONECTAT" : "C2 DECK SECURE"}
                </span>
              </div>

              <div className="navy-font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 mb-6">
                {locale === "ro" ? "VIZUALIZARE REȚEA DE LUPTĂ" : "TACTICAL DATA LINK MESH"}
              </div>

              {/* HUD Screen Graphic visualizer */}
              <div className="h-[220px] w-full border border-white/5 bg-black/60 relative overflow-hidden rounded flex items-center justify-center">
                {/* Background radar grid pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
                
                {/* 1. Sensing Layer Graphic */}
                {activeIdx === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <svg className="w-full h-full p-2" viewBox="0 0 100 100">
                      {/* Animated Orbital trajectory line */}
                      <motion.path
                        d="M 10 20 Q 50 -5 90 20"
                        stroke="#8edcff"
                        strokeWidth="0.4"
                        strokeDasharray="4,4"
                        fill="none"
                        opacity="0.3"
                        animate={{ strokeDashoffset: [0, -20] }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                      />
                      
                      {/* Detailed Space Satellite */}
                      <motion.g
                        initial={{ opacity: 0, x: -10, y: -10 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* Connection line */}
                        <line x1="30" y1="16" x2="50" y2="40" stroke="#8edcff" strokeWidth="0.4" strokeDasharray="2,2" opacity="0.4" />
                        
                        {/* Satellite dish assembly */}
                        <circle cx="30" cy="16" r="3.5" fill="#001A33" stroke="#8edcff" strokeWidth="0.8" />
                        <circle cx="30" cy="16" r="1.2" fill="#8edcff" className="animate-pulse" />
                        
                        {/* Dual Solar Panels */}
                        <rect x="18" y="14" width="7" height="3" fill="#003366" stroke="#8edcff" strokeWidth="0.4" />
                        <rect x="35" y="14" width="7" height="3" fill="#003366" stroke="#8edcff" strokeWidth="0.4" />
                        <line x1="25" y1="15.5" x2="35" y2="15.5" stroke="#8edcff" strokeWidth="0.5" />
                        <text x="30" y="8" fill="#8edcff" fontSize="3" textAnchor="middle" className="navy-font-mono font-black" opacity="0.8">USA-MIL-SAT</text>
                      </motion.g>
 
                      {/* E-2D Hawkeye Airborne Early Warning Plane */}
                      <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                      >
                        {/* Plane silhouette */}
                        <polygon points="50,34 52,38 56,38 50,44 44,38 48,38" fill="#8edcff" opacity="0.9" />
                        <line x1="38" y1="38" x2="62" y2="38" stroke="#8edcff" strokeWidth="1.2" />
                        
                        {/* Rotating Rotodome Radar Disk */}
                        <ellipse cx="50" cy="33" rx="7" ry="1.5" fill="#001A33" stroke="#8edcff" strokeWidth="0.75" />
                        <line x1="50" y1="33" x2="50" y2="35.5" stroke="#8edcff" strokeWidth="0.6" />
                        
                        {/* Dual Concentric Glowing Radar rings radiating from E-2D */}
                        <circle cx="50" cy="33" r="14" stroke="#8edcff" strokeWidth="0.3" strokeDasharray="2,2" fill="none" opacity="0.25" />
                        <circle cx="50" cy="33" r="10" stroke="#8edcff" strokeWidth="0.5" fill="none" opacity="0.35" className="animate-ping" style={{ animationDuration: '2.5s' }} />
                        <circle cx="50" cy="33" r="6" stroke="#8edcff" strokeWidth="0.6" fill="none" opacity="0.45" className="animate-ping" style={{ animationDuration: '1.2s' }} />
                        
                        <text x="50" y="49" fill="#8edcff" fontSize="3" textAnchor="middle" className="navy-font-mono font-black" opacity="0.8">E-2D HAWKEYE</text>
                      </motion.g>
 
                      {/* Undersea Submarine (Bottom Left) & Acoustic Echoes */}
                      <motion.g
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {/* Submarine Silhouette */}
                        <rect x="14" y="78" width="15" height="3" rx="1.5" fill="#8edcff" opacity="0.85" />
                        <rect x="21" y="74" width="3" height="4" fill="#8edcff" opacity="0.85" />
                        <line x1="22.5" y1="74" x2="22.5" y2="71" stroke="#8edcff" strokeWidth="0.5" /> {/* Periscope */}
                        
                        {/* Undersea acoustic sonar point */}
                        <circle cx="8" cy="80" r="1" fill="#8edcff" className="animate-pulse" />
                        <circle cx="21" cy="74" r="1.5" fill="#8edcff" className="animate-pulse" />
                        
                        {/* Pulsating Sonar sound waves */}
                        <path d="M 8 75 A 8 8 0 0 0 8 84" stroke="#8edcff" strokeWidth="0.5" fill="none" opacity="0.5" className="animate-pulse" />
                        <path d="M 6 72 A 12 12 0 0 0 6 87" stroke="#8edcff" strokeWidth="0.5" fill="none" opacity="0.3" className="animate-pulse" />
                        
                        <motion.circle
                          cx="22" cy="74" r="8"
                          stroke="#8edcff" strokeWidth="0.35" fill="none"
                          initial={{ r: 2, opacity: 0.8 }}
                          animate={{ r: 14, opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }}
                        />
                        
                        <text x="21.5" y="87" fill="#8edcff" fontSize="3" textAnchor="middle" className="navy-font-mono font-black" opacity="0.8">VIRGINIA-SSN</text>
                      </motion.g>
 
                      {/* Surface Arleigh Burke Destroyer (Bottom Right) */}
                      <motion.g
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {/* Destroyer Silhouette */}
                        <polygon points="68,79 84,79 87,74 65,74" fill="#8edcff" opacity="0.85" />
                        <rect x="70" y="69" width="7" height="5" fill="#8edcff" opacity="0.85" />
                        <line x1="77" y1="74" x2="81" y2="69" stroke="#8edcff" strokeWidth="0.8" /> {/* Gun mount */}
                        
                        <text x="76" y="87" fill="#8edcff" fontSize="3" textAnchor="middle" className="navy-font-mono font-black" opacity="0.8">DDG-FLIGHT III</text>
                      </motion.g>
 
                      {/* Integrated Net Link Lines */}
                      <line x1="30" y1="16" x2="50" y2="33" stroke="#8edcff" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
                      <line x1="50" y1="38" x2="21.5" y2="74" stroke="#8edcff" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
                      <line x1="50" y1="38" x2="76" y2="74" stroke="#8edcff" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
                      <line x1="21.5" y1="78" x2="68" y2="76" stroke="#8edcff" strokeWidth="0.4" strokeDasharray="3,3" opacity="0.4" /> {/* Undersea acoustic line */}
 
                      {/* Dynamic incoming telemetry data packets flowing along links */}
                      <motion.circle
                        cx="21.5" cy="74" r="1.2" fill="#ffffff"
                        animate={{ cx: [21.5, 50], cy: [74, 38] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                      />
                      <motion.circle
                        cx="76" cy="74" r="1.2" fill="#ffffff"
                        animate={{ cx: [76, 50], cy: [74, 38] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                      />
                      <motion.circle
                        cx="50" cy="33" r="1.2" fill="#ffffff"
                        animate={{ cx: [50, 30], cy: [33, 16] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      />
 
                      {/* Animated scanning cone */}
                      <polygon points="50,33 15,74 85,74" fill="url(#sensing-cone-gradient)" opacity="0.12" />
 
                      <defs>
                        <linearGradient id="sensing-cone-gradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#8edcff" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#8edcff" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                )}

                {/* 2. Decision Layer Graphic */}
                {activeIdx === 1 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <svg className="w-full h-full p-2" viewBox="0 0 100 100">
                      {/* Aegis Radar concentric scope compass rings */}
                      <circle cx="50" cy="50" r="12" stroke="#f2d48a" strokeWidth="0.5" fill="none" opacity="0.2" />
                      <circle cx="50" cy="50" r="28" stroke="#f2d48a" strokeWidth="0.5" fill="none" opacity="0.15" />
                      <circle cx="50" cy="50" r="44" stroke="#f2d48a" strokeWidth="0.75" fill="none" opacity="0.3" />
 
                      {/* Compass Heading Labels */}
                      <text x="50" y="10" fill="#f2d48a" fontSize="3" textAnchor="middle" className="navy-font-mono font-black" opacity="0.7">N 000</text>
                      <text x="92" y="51" fill="#f2d48a" fontSize="3" textAnchor="middle" className="navy-font-mono font-black" opacity="0.7">E 090</text>
                      <text x="50" y="93" fill="#f2d48a" fontSize="3" textAnchor="middle" className="navy-font-mono font-black" opacity="0.7">S 180</text>
                      <text x="8" y="51" fill="#f2d48a" fontSize="3" textAnchor="middle" className="navy-font-mono font-black" opacity="0.7">W 270</text>
 
                      {/* Rotating Radar Segment Sweep Shadow */}
                      <motion.path
                        d="M 50 50 L 88 28 A 44 44 0 0 0 68 8 L 50 50 Z"
                        fill="url(#radar-sweep-gradient)"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
                        style={{ transformOrigin: "50px 50px" }}
                      />
 
                      {/* Aegis continuous rotative sweeper line */}
                      <motion.line
                        x1="50"
                        y1="50"
                        x2="88"
                        y2="28"
                        stroke="#f2d48a"
                        strokeWidth="1.2"
                        opacity="0.75"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
                        style={{ transformOrigin: "50px 50px" }}
                      />
 
                      {/* Fused Threat CPU Histogram in corner */}
                      <g opacity="0.6">
                        <text x="6" y="16" fill="#f2d48a" fontSize="2" className="navy-font-mono font-black" opacity="0.5">CPU THREAT FUSION</text>
                        <motion.rect x="6" y="19" width="2" height="1" fill="#f2d48a" animate={{ height: [1, 5, 2, 6, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                        <motion.rect x="10" y="19" width="2" height="3" fill="#f2d48a" animate={{ height: [3, 1, 6, 2, 3] }} transition={{ repeat: Infinity, duration: 2 }} />
                        <motion.rect x="14" y="19" width="2" height="5" fill="#f2d48a" animate={{ height: [5, 7, 2, 4, 5] }} transition={{ repeat: Infinity, duration: 1.2 }} />
                        <motion.rect x="18" y="19" width="2" height="2" fill="#f2d48a" animate={{ height: [2, 6, 4, 1, 2] }} transition={{ repeat: Infinity, duration: 1.8 }} />
                      </g>
 
                      {/* Connected Tactical Mesh Nodes */}
                      <g fill="#f2d48a">
                        {/* Central Decision Hub Core */}
                        <circle cx="50" cy="50" r="4.5" className="animate-pulse" />
                        
                        {/* Node 1: TRK-882 */}
                        <circle cx="28" cy="32" r="2.5" />
                        <line x1="50" y1="50" x2="28" y2="32" stroke="#f2d48a" strokeWidth="0.75" strokeDasharray="2,2" opacity="0.5" />
                        <text x="24" y="27" fill="#f2d48a" fontSize="2.8" className="navy-font-mono font-black" opacity="0.8">TRK-882</text>
                        <text x="24" y="30.5" fill="#f2d48a" fontSize="2" className="navy-font-mono" opacity="0.5">AZ:284 RNG:120</text>
 
                        {/* Node 2: TRK-491 */}
                        <circle cx="72" cy="38" r="2.5" />
                        <line x1="50" y1="50" x2="72" y2="38" stroke="#f2d48a" strokeWidth="0.75" strokeDasharray="2,2" opacity="0.5" />
                        <text x="75" y="34" fill="#f2d48a" fontSize="2.8" className="navy-font-mono font-black" opacity="0.8">TRK-491</text>
                        <text x="75" y="37.5" fill="#f2d48a" fontSize="2" className="navy-font-mono" opacity="0.5">AZ:084 RNG:402</text>
 
                        {/* Node 3: TRK-504 */}
                        <circle cx="64" cy="70" r="2.5" />
                        <line x1="50" y1="50" x2="64" y2="70" stroke="#f2d48a" strokeWidth="0.75" strokeDasharray="2,2" opacity="0.5" />
                        <text x="67" y="75" fill="#f2d48a" fontSize="2.8" className="navy-font-mono font-black" opacity="0.8">TRK-504</text>
 
                        {/* Node 4: TRK-119 */}
                        <circle cx="34" cy="68" r="2.5" />
                        <line x1="50" y1="50" x2="34" y2="68" stroke="#f2d48a" strokeWidth="0.75" strokeDasharray="2,2" opacity="0.5" />
                        <text x="22" y="74" fill="#f2d48a" fontSize="2.8" className="navy-font-mono font-black" opacity="0.8">TRK-119</text>
                      </g>
 
                      {/* Active target coordinate tracking brackets */}
                      <g stroke="#f2d48a" strokeWidth="0.4" fill="none" opacity="0.6">
                        {/* Node 1 Brackets */}
                        <path d="M 24 29 L 24 27 L 26 27" />
                        <path d="M 32 29 L 32 27 L 30 27" />
                        <path d="M 24 35 L 24 37 L 26 37" />
                        <path d="M 32 35 L 32 37 L 30 37" />
                        
                        {/* Node 2 Brackets */}
                        <path d="M 68 35 L 68 33 L 70 33" />
                        <path d="M 76 35 L 76 33 L 74 33" />
                        <path d="M 68 41 L 68 43 L 70 43" />
                        <path d="M 76 41 L 76 43 L 74 43" />
                      </g>
 
                      {/* Moving Data Packets (Neon Dots flowing along links) */}
                      <motion.circle
                        cx="28" cy="32" r="1.5" fill="#ffffff"
                        animate={{ cx: [28, 50], cy: [32, 50] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      />
                      <motion.circle
                        cx="72" cy="38" r="1.5" fill="#ffffff"
                        animate={{ cx: [72, 50], cy: [38, 50] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      />
                      <motion.circle
                        cx="34" cy="68" r="1.5" fill="#ffffff"
                        animate={{ cx: [34, 50], cy: [68, 50] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                      />
 
                      {/* Interactive text badge */}
                      <rect x="36" y="44" width="28" height="6" fill="#001A33" stroke="#f2d48a" strokeWidth="0.5" rx="1" />
                      <text x="50" y="48.5" fill="#f2d48a" fontSize="2.8" textAnchor="middle" fontWeight="bold" className="navy-font-mono animate-pulse">AEGIS LINK</text>
 
                      <defs>
                        <linearGradient id="radar-sweep-gradient" x1="0" x2="1" y1="0" y2="1">
                          <stop offset="0%" stopColor="#f2d48a" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#f2d48a" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                )}

                {/* 3. Effect Layer Graphic */}
                {activeIdx === 2 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <svg className="w-full h-full p-2" viewBox="0 0 100 100">
                      {/* Crosshair target scope lines */}
                      <line x1="8" y1="50" x2="92" y2="50" stroke="#ff7a7a" strokeWidth="0.4" strokeDasharray="3,3" opacity="0.4" />
                      <line x1="50" y1="8" x2="50" y2="92" stroke="#ff7a7a" strokeWidth="0.4" strokeDasharray="3,3" opacity="0.4" />
                      <circle cx="50" cy="50" r="38" stroke="#ff7a7a" strokeWidth="0.5" fill="none" opacity="0.2" />
                      <circle cx="50" cy="50" r="22" stroke="#ff7a7a" strokeWidth="0.6" fill="none" opacity="0.35" />
                      <circle cx="50" cy="50" r="2.5" fill="#ff7a7a" />
 
                      {/* Twin-tail F-35C aerospace stealth fighter silhouette */}
                      <motion.g
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {/* F-35C Body & Wings */}
                        <polygon points="12,18 20,22 18,24 10,24 8,20" fill="#ff7a7a" opacity="0.8" />
                        {/* Stabilizer tails */}
                        <line x1="8" y1="20" x2="6" y2="16" stroke="#ff7a7a" strokeWidth="0.8" />
                        <line x1="8" y1="24" x2="6" y2="28" stroke="#ff7a7a" strokeWidth="0.8" />
                        
                        <text x="14" y="14" fill="#ff7a7a" fontSize="3" className="navy-font-mono font-black" opacity="0.8">F-35C STRIKE</text>
                        
                        {/* Guided weapon launch drop trail to TR-02 */}
                        <motion.circle
                          cx="14" cy="24" r="0.8" fill="#ffffff"
                          animate={{ cx: [14, 34], cy: [24, 62] }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: "easeIn" }}
                        />
                      </motion.g>
 
                      {/* Terminal Flight Calculations Readout Block */}
                      <g opacity="0.85" className="navy-font-mono" fill="#ff7a7a">
                        <text x="94" y="14" fontSize="2.8" textAnchor="end" fontWeight="bold">HYPERSONIC INTERCEPT</text>
                        
                        <motion.text
                          x="94" y="19" fontSize="2.2" textAnchor="end"
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                        >
                          VELOCITY: MACH 8.42
                        </motion.text>
                        
                        <motion.text
                          x="94" y="23" fontSize="2.2" textAnchor="end"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1.2 }}
                        >
                          TTG-01: 14.82 SEC
                        </motion.text>
 
                        <text x="94" y="27" fontSize="2" textAnchor="end" opacity="0.5">SYS STATUS: ENGAGED</text>
                      </g>
 
                      {/* Live System Status Waveform (Center Right) */}
                      <path d="M 68 38 L 71 43 L 74 32 L 77 48 L 80 30 L 83 42 L 86 38 L 89 40" fill="none" stroke="#ff7a7a" strokeWidth="0.8" opacity="0.6" className="animate-pulse" />
                      <text x="68" y="29.5" fill="#ff7a7a" fontSize="3" className="navy-font-mono font-black" opacity="0.8">WARHEAD CHARGED</text>
 
                      {/* Detailed Surface Destroyer Firing VLS (Bottom Left) */}
                      <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Deck silhouette */}
                        <polygon points="5,88 24,88 28,82 1,82" fill="#ff7a7a" opacity="0.65" />
                        <rect x="11" y="82" width="6" height="1" fill="#ffffff" />
                        
                        {/* Rising hypersonic interceptor missile */}
                        <line x1="14" y1="82" x2="14" y2="70" stroke="#ffffff" strokeWidth="1.2" />
                        <polygon points="14,66 12.5,70 15.5,70" fill="#ffffff" />
                        
                        {/* Glowing orange exhaust plume trail */}
                        <polygon points="12,82 16,82 14,88" fill="url(#fire-plume-gradient)" opacity="0.8" />
                        
                        <text x="14" y="94" fill="#ff7a7a" fontSize="3" textAnchor="middle" className="navy-font-mono font-black" opacity="0.8">VLS Mk 41</text>
                      </motion.g>
 
                      {/* Underwater Virginia-SSN launching a Tomahawk (Bottom Right) */}
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {/* Underwater sub hull */}
                        <rect x="75" y="85" width="18" height="3" rx="1" fill="#ff7a7a" opacity="0.5" />
                        {/* Tomahawk missile launched underwater, traveling up to Node 1 */}
                        <motion.path
                          d="M 80 85 Q 88 55 68 30"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="0.8"
                          strokeDasharray="2,2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.5 }}
                        />
                        <text x="84" y="93" fill="#ff7a7a" fontSize="2.5" textAnchor="middle" className="navy-font-mono" opacity="0.6">TOMAHAWK UGM</text>
                      </motion.g>
 
                      {/* Lock-on target 1 tracking coordinates brackets */}
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {/* Pulsing ring target lock */}
                        <circle cx="68" cy="30" r="4.5" fill="none" stroke="#ff7a7a" strokeWidth="1.2" className="animate-ping" style={{ animationDuration: '1.5s' }} />
                        <circle cx="68" cy="30" r="1.5" fill="#ff7a7a" />
                        
                        {/* Closing targeting brackets [  ] */}
                        <path d="M 62 25 L 64 25 L 64 27" stroke="#ff7a7a" strokeWidth="0.8" fill="none" />
                        <path d="M 74 25 L 72 25 L 72 27" stroke="#ff7a7a" strokeWidth="0.8" fill="none" />
                        <path d="M 62 35 L 64 35 L 64 33" stroke="#ff7a7a" strokeWidth="0.8" fill="none" />
                        <path d="M 74 35 L 72 35 L 72 33" stroke="#ff7a7a" strokeWidth="0.8" fill="none" />
                        
                        <text x="68" y="44" fill="#ff7a7a" fontSize="2.8" textAnchor="middle" className="navy-font-mono font-black">LOCK [TR-01]</text>
                        <text x="68" y="47.5" fill="#ff7a7a" fontSize="2.2" textAnchor="middle" className="navy-font-mono" opacity="0.5">AZ:084 EL:15</text>
                      </motion.g>
 
                      {/* Lock-on target 2 tracking coordinates brackets */}
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                      >
                        {/* Pulsing ring target lock */}
                        <circle cx="34" cy="62" r="4.5" fill="none" stroke="#ff7a7a" strokeWidth="1.2" className="animate-ping" style={{ animationDuration: '2s' }} />
                        <circle cx="34" cy="62" r="1.5" fill="#ff7a7a" />
                        
                        {/* Targeting brackets [  ] */}
                        <path d="M 28 57 L 30 57 L 30 59" stroke="#ff7a7a" strokeWidth="0.8" fill="none" />
                        <path d="M 40 57 L 38 57 L 38 59" stroke="#ff7a7a" strokeWidth="0.8" fill="none" />
                        <path d="M 28 67 L 30 67 L 30 65" stroke="#ff7a7a" strokeWidth="0.8" fill="none" />
                        <path d="M 40 67 L 38 67 L 38 65" stroke="#ff7a7a" strokeWidth="0.8" fill="none" />
                        
                        <text x="34" y="72.5" fill="#ff7a7a" fontSize="2.8" textAnchor="middle" className="navy-font-mono font-black">LOCK [TR-02]</text>
                        <text x="34" y="76" fill="#ff7a7a" fontSize="2.2" textAnchor="middle" className="navy-font-mono" opacity="0.5">AZ:284 EL:08</text>
                      </motion.g>
 
                      {/* Launch flight vector trajectory curve */}
                      <motion.path
                        d="M 14 74 Q 35 40 68 30"
                        fill="none"
                        stroke="#ff7a7a"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1 }}
                      />
 
                      <defs>
                        <linearGradient id="fire-plume-gradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                          <stop offset="50%" stopColor="#ff7a7a" stopOpacity="0.7" />
                          <stop offset="100%" stopColor="#ff7a7a" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                )}
              </div>

              {/* Live console logging logs feed */}
              <div className="mt-5 border border-white/5 bg-black/95 p-4 rounded no-scrollbar h-[135px] overflow-y-auto navy-font-mono text-[9px] tracking-wider leading-relaxed">
                <div className="text-[#8edcff]/40 font-bold mb-2 flex items-center gap-1.5">
                  <span>{getPromptHeader()}</span>
                  {!isTypingComplete && (
                    <span className="animate-pulse h-2.5 w-1.5 bg-[#8edcff]" style={{ backgroundColor: activeColor }} />
                  )}
                </div>
                
                <div className="space-y-1">
                  {visibleLines.map((log, lidx) => (
                    <motion.div
                      key={log}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-white/85 flex items-start"
                    >
                      <span className="text-white/20 mr-2 shrink-0">{timestamps[lidx]}</span>
                      {renderColoredLog(log)}
                    </motion.div>
                  ))}
                </div>

                {isTypingComplete && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#8edcff]/40 font-bold mt-2 flex items-center gap-1.5"
                  >
                    <span>C2-DECK:~#</span>
                    <span className="animate-pulse h-2.5 w-1.5 bg-[#8edcff]" style={{ backgroundColor: activeColor }} />
                  </motion.div>
                )}
              </div>

              {/* Progress telemetry meters */}
              <div className="mt-6 space-y-4 border-t border-white/5 pt-5">
                <div>
                  <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-white/40 mb-1.5">
                    <span>{locale === "ro" ? "INTEGRITATE DATE REȚEA" : "DATA INTEGRITY CORE"}</span>
                    <span className="navy-font-mono font-bold text-white/80">
                      {activeIdx === 0 ? "98%" : activeIdx === 1 ? "99.9%" : "95.4%"}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: activeColor }}
                      initial={{ width: "0%" }}
                      animate={{ width: activeIdx === 0 ? "98%" : activeIdx === 1 ? "99.9%" : "95.4%" }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-white/40 mb-1.5">
                    <span>{locale === "ro" ? "LATENȚĂ COOPERATIVĂ" : "NETWORK LATENCY INDEX"}</span>
                    <span className="navy-font-mono font-bold text-white/80">
                      {activeIdx === 0 ? "14 ms" : activeIdx === 1 ? "4 ms" : "12 ms"}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: activeColor }}
                      initial={{ width: "0%" }}
                      animate={{ width: activeIdx === 0 ? "80%" : activeIdx === 1 ? "96%" : "85%" }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Layers Selector Tiles */}
          <div className="space-y-4">
            {layers.map((layer, index) => {
              const selected = index === activeIdx;
              const LayerIcon = icons[index] ?? Network;

              return (
                <button
                  key={layer.title}
                  type="button"
                  onClick={() => setActiveIdx(index)}
                  className={cn(
                    "w-full text-left p-6 md:p-8 transition-all duration-300 relative border flex flex-col justify-between overflow-hidden",
                    selected
                      ? "bg-white/[0.04] border-white/10"
                      : "bg-[#020202] border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
                  )}
                >
                  {/* Sliding spring indicator border on the left */}
                  {selected && (
                    <motion.div
                      layoutId="c2-active-border"
                      className="absolute inset-y-0 left-0 w-[3px]"
                      style={{ backgroundColor: layer.accent }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="navy-font-mono text-[9px] tracking-widest text-white/30 uppercase">
                          LAYER 0{index + 1}
                        </span>
                        {selected && (
                          <span className="navy-font-mono text-[8px] bg-[#001a33]/60 text-[#8edcff] px-2 py-0.5 border border-[#8edcff]/10 uppercase font-black tracking-widest">
                            {locale === "ro" ? "TELEMETRIE ACTIVĂ" : "LIVE FEED"}
                          </span>
                        )}
                      </div>
                      <div
                        className="h-9 w-9 rounded border border-white/5 bg-black flex items-center justify-center"
                        style={{ color: selected ? layer.accent : "rgba(255,255,255,0.3)" }}
                      >
                        <LayerIcon size={16} strokeWidth={1.5} />
                      </div>
                    </div>

                    <h3 className="navy-font-display text-2xl font-black uppercase leading-none text-white/90">
                      {layer.title}
                    </h3>
                    
                    <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-white/50 leading-relaxed">
                      {layer.subtitle}
                    </p>
                    
                    <p className="mt-3 text-xs leading-relaxed text-white/40">
                      {layer.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {layer.nodes.map((node) => (
                        <span
                          key={node}
                          className="border border-white/5 bg-black/40 px-2 py-1 text-[8px] sm:text-[9px] font-bold uppercase text-white/40 tracking-wider rounded"
                        >
                          {node}
                        </span>
                      ))}
                    </div>

                    {!selected && (
                      <span className="navy-font-mono text-[8px] tracking-[0.25em] text-[#8edcff]/40 uppercase hover:text-[#8edcff]/80 transition-colors">
                        {locale === "ro" ? "[ SELECTEAZĂ C2 ]" : "[ ACTIVATE C2 ]"}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
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
              onClick={() => setActiveProgram(program)}
              className="group cursor-pointer min-h-[360px] bg-black p-8 border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all duration-300"
            >
              <div>
                <div className="mb-6 flex flex-col items-start gap-3">
                  <span className="border border-[#001a33] bg-[#001a33]/40 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#8edcff]/90">
                    {program.status}
                  </span>
                  <span className="navy-font-display text-3xl sm:text-4xl font-black text-white/10 block leading-none transition-colors group-hover:text-white/20" title={program.label}>
                    {program.label}
                  </span>
                </div>
                <h3 className="navy-font-display mt-8 text-lg sm:text-xl font-black uppercase leading-tight text-white/80 group-hover:text-white transition-colors">
                  {program.title}
                </h3>
                <p className="mt-4 text-xs leading-relaxed text-white/40 group-hover:text-white/50 transition-colors">{program.description}</p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <span className="navy-font-mono text-[9px] font-bold uppercase tracking-widest text-[#8edcff]/60 group-hover:text-[#8edcff] transition-colors">
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
                <span className="navy-font-mono text-[10px] tracking-[0.3em] text-[#8edcff] uppercase">
                  {locale === "ro" ? "VIITORUL GEOMETRIEI FLOTEI" : "FLEET CAPITAL PROGRAM"}
                </span>
                <button
                  onClick={() => setActiveProgram(null)}
                  className="navy-font-mono text-[10px] hover:text-white transition-colors tracking-[0.2em] text-white/40"
                >
                  {locale === "ro" ? "[ ÎNCHIDE ]" : "[ CLOSE ]"}
                </button>
              </div>

              {/* Header Visual Banner */}
              <div className="relative w-full h-[30dvh] md:h-[40dvh] overflow-hidden">
                <Image src={activeProgram.imageSrc} alt={activeProgram.imageAlt} fill className="object-cover grayscale-[0.2]" priority sizes="100vw" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/45 to-transparent" />
                <div className="absolute bottom-8 left-6 md:left-10">
                  <p className="navy-font-mono text-[9px] mb-3 tracking-[0.25em] text-[#8edcff] uppercase">{activeProgram.status}</p>
                  <h3 className="navy-font-display text-3xl md:text-5xl font-black tracking-tighter uppercase text-white leading-none">
                    {activeProgram.title}
                  </h3>
                </div>
              </div>

              {/* Content Panel */}
              <div className="px-6 md:px-10 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1.2fr] gap-12">
                  <div>
                    <div className="navy-font-mono text-[10px] mb-4 tracking-[0.2em] text-white/40">
                      {locale === "ro" ? "DIRECȚIA CAPABILITĂȚII" : "CAPABILITY DIRECTION"}
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-white/60 mb-8">{activeProgram.capability}</p>
                    
                    {/* Visual signature band */}
                    <div className="pl-5 border-l-2 border-[#001A33] bg-[#001a33]/15 py-4 pr-4">
                      <div className="navy-font-mono text-[9px] mb-2 tracking-[0.2em] text-[#8edcff]">
                        {locale === "ro" ? "PROIECTARE TACTICĂ" : "TACTICAL PROJECTION"}
                      </div>
                      <p className="text-[11px] leading-relaxed text-white/40">
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
                      <div className="navy-font-mono text-[10px] mb-4 tracking-[0.2em] text-white/40">
                        {locale === "ro" ? "SPECIFICAȚII PROGRAM" : "PROGRAM SPECIFICATIONS"}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {activeProgram.specs.map((spec) => (
                          <div key={spec.label} className="navy-panel-tactical p-4 border border-white/5 rounded bg-black/40">
                            <div className="text-[9px] uppercase tracking-widest text-white/30">{spec.label}</div>
                            <div className="mt-2 text-xs font-bold text-white/90">{spec.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-6">
                      <div className="navy-font-mono text-[9px] mb-2 tracking-[0.2em] text-white/30">
                        STATUS: <span className="text-[#8edcff] font-bold">{activeProgram.status.toUpperCase()}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-white/40">
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

export function NavyWeaponsConsole({ locale = "en" }: { locale?: Locale }) {
  const weapons = getNavyWeapons(locale);
  const [activeTab, setActiveTab] = useState(0);
  const weapon = weapons[activeTab];

  return (
    <section className="relative overflow-hidden bg-black py-24 sm:py-32 border-t border-white/5">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,26,51,0.2)_0%,transparent_70%)]" />
      <div className="navy-grid-plane absolute inset-0 opacity-15" />
      <div className="navy-noise absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle
          label={locale === "ro" ? "ARMAMENT TACTIC" : "TACTICAL ARMAMENT"}
          titlePart1={locale === "ro" ? "SISTEME DE" : "INTEGRATED WEAPON"}
          titlePart2={locale === "ro" ? "FOC PRECIZ" : "DELIVERY CONSOLE"}
          body={locale === "ro"
            ? "Arhitectura de atac și apărare a flotei, de la rachete hipersonice la sisteme autonome de interceptare, fuzionată într-o rețea de foc letală."
            : "The fleet's offensive and defensive strike grid, ranging from long-range precision cruise missiles to autonomous point defense gatling systems."}
        />

        {/* Weapons console frame */}
        <div className="navy-glass-premium overflow-hidden rounded-lg border border-white/10 bg-black/60">
          
          {/* Header tabs */}
          <div className="flex flex-wrap border-b border-white/10 bg-black/80">
            {weapons.map((w, idx) => (
              <button
                key={w.id}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "relative flex-1 min-w-[140px] px-6 py-5 text-center transition-all duration-300 font-mono text-[10px] tracking-[0.2em] uppercase border-r border-white/5 last:border-r-0",
                  idx === activeTab
                    ? "text-white bg-white/5 font-bold"
                    : "text-white/40 hover:text-white/70 hover:bg-white/2"
                )}
              >
                {/* Active glow accent */}
                {idx === activeTab && (
                  <motion.div
                    layoutId="active-weapon-indicator"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-[#8edcff]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {w.designation.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Console main body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
            
            {/* Left Column: Spec Panel (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#8edcff] animate-pulse" />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[#8edcff]/80 uppercase">
                    [ {weapon.category} ]
                  </span>
                </div>
                <h3 className="navy-font-display text-2xl sm:text-4xl font-black tracking-tight text-white leading-none">
                  {weapon.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/40 font-mono tracking-wider">
                  SYSTEM DESIGNATION: {weapon.designation}
                </p>
                <p className="text-sm leading-relaxed text-white/70 max-w-2xl pt-2">
                  {weapon.description}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4">
                {weapon.specs.map((s) => (
                  <div
                    key={s.label}
                    className="navy-panel-tactical p-4 border border-white/5 rounded bg-black/40 flex flex-col space-y-1"
                  >
                    <span className="font-mono text-[9px] tracking-wider text-white/30 uppercase">
                      {s.label}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
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
                    <div className="flex justify-between text-[10px] font-mono tracking-widest text-white/50">
                      <span>SYSTEM ACCURACY</span>
                      <span className="text-[#8edcff] font-bold">{weapon.accuracy}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${weapon.accuracy}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#0052a3] to-[#8edcff] rounded-full"
                      />
                    </div>
                  </div>

                  {/* Combat sorties / Operations telemetry */}
                  <div className="flex flex-col justify-end">
                    <div className="text-[9px] font-mono tracking-widest text-white/30 uppercase">
                      TELEMETRY STATUS
                    </div>
                    <div className="text-xs font-mono tracking-wider text-[#70e0bf] font-bold uppercase mt-1">
                      {weapon.operations}
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Column: Visual Telemetry/Radar Screen (5 cols) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[340px] rounded-full border border-white/10 bg-[#00060d]/80 overflow-hidden flex items-center justify-center p-8 box-shadow-[inset_0_0_24px_rgba(0,132,255,0.06)]">
                
                {/* Radar grid aesthetics */}
                <div className="absolute inset-0 rounded-full border border-white/5 m-4" />
                <div className="absolute inset-0 rounded-full border border-white/5 m-12" />
                <div className="absolute inset-0 rounded-full border border-[#8edcff]/10 m-24" />
                
                {/* Crosshairs */}
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5 -translate-x-1/2" />
                <div className="absolute left-0 right-0 top-1/2 h-px bg-white/5 -translate-y-1/2" />

                {/* Sonar sweep animation */}
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(0,132,255,0.15)_0deg,transparent_90deg)] animate-[spin_5s_linear_infinite] pointer-events-none" />

                {/* Glowing target dots */}
                <motion.div
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 left-1/3 h-2 w-2 rounded-full bg-[#70e0bf]"
                  style={{ boxShadow: "0 0 10px #70e0bf" }}
                />
                <motion.div
                  animate={{
                    opacity: [0.1, 0.8, 0.1],
                    scale: [0.7, 1.1, 0.7]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                  className="absolute bottom-1/3 right-1/4 h-1.5 w-1.5 rounded-full bg-[#ff6b6b]"
                  style={{ boxShadow: "0 0 8px #ff6b6b" }}
                />
                <motion.div
                  animate={{
                    opacity: [0.3, 0.9, 0.3],
                    scale: [0.9, 1.3, 0.9]
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                  className="absolute top-1/2 right-1/3 h-2 w-2 rounded-full bg-[#f2d48a]"
                  style={{ boxShadow: "0 0 10px #f2d48a" }}
                />

                {/* Radar Sweep HUD labels */}
                <div className="relative z-10 text-center flex flex-col items-center space-y-3 p-4">
                  <div className="rounded border border-[#8edcff]/20 bg-black/80 px-3 py-1 font-mono text-[9px] tracking-[0.2em] text-[#8edcff] uppercase">
                    SYS-LOCK COMPLETED
                  </div>
                  <div className="font-mono text-[8px] tracking-widest text-white/40 text-center max-w-[200px] leading-relaxed uppercase break-all">
                    {weapon.tacticalOverlay}
                  </div>
                </div>

                {/* Tech overlay border markings */}
                <div className="absolute top-4 left-4 font-mono text-[8px] text-white/20">SYS.290_VLS</div>
                <div className="absolute bottom-4 right-4 font-mono text-[8px] text-[#8edcff]/30">RADAR // ACTIVE</div>

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
