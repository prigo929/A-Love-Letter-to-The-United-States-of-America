"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import {
  Anchor,
  ArrowUpRight,
  MapPin,
  Network,
  Plane,
  Satellite,
  Shield,
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
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. AirForceStyles
// ─────────────────────────────────────────────────────────────────────────────

export function AirForceStyles() {
  return (
    <style jsx global>{`
      .af-page {
        --af-black: #000000;
        --af-void: #050608;
        --af-surface: #0a0c10;
        --af-elevated: #12151b;
        --af-amber: #d4a44a;
        --af-sky: #7aaed4;
        --af-border: rgba(255, 255, 255, 0.06);
        background: var(--af-black);
        color: white;
      }

      .af-font-display {
        font-family: var(--font-archivo), Inter, system-ui, sans-serif;
        letter-spacing: -0.035em;
        text-transform: uppercase;
      }

      .af-font-mono {
        font-family: var(--font-mono), "SFMono-Regular", Consolas, monospace;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .af-dot-grid {
        background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
        background-size: 28px 28px;
      }

      .af-noise::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0.06;
        mix-blend-mode: overlay;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E");
      }

      .af-glass {
        background: rgba(8, 10, 14, 0.82);
        backdrop-filter: blur(40px) saturate(1.2);
        -webkit-backdrop-filter: blur(40px) saturate(1.2);
        border: 1px solid rgba(255, 255, 255, 0.06);
      }

      .af-panel {
        background: var(--af-surface);
        border: 1px solid rgba(255, 255, 255, 0.05);
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
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] bg-white/[0.03]">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[#d4a44a] via-white/90 to-white"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
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
        duration: 2,
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

function AFSectionTitle({
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
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      className={cn("mb-24 max-w-5xl", isCenter ? "mx-auto text-center" : "text-left")}
    >
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="af-font-mono mb-6 tracking-[0.3em] text-[10px] text-[#d4a44a]/70"
      >
        {label}
      </motion.div>
      <motion.h2
        variants={fadeUp}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="af-font-display text-[clamp(36px,7vw,88px)] font-black leading-[0.88] text-white"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="af-font-display text-[clamp(36px,7vw,88px)] font-black leading-[0.88] text-white/15 mt-1"
        >
          {subtitle}
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
// Full-bleed image divider
// ─────────────────────────────────────────────────────────────────────────────

export function AirForceFullBleed({
  imageSrc, imageAlt, caption,
}: {
  imageSrc: string; imageAlt: string; caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <div ref={ref} className="relative h-[55vh] min-h-[400px] overflow-hidden">
      <motion.div className="absolute inset-0 -inset-y-[12%]" style={{ y }}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          quality={90}
          className="object-cover brightness-[0.3] saturate-[0.8]"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
      {caption && (
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <span className="af-font-mono text-[10px] tracking-[0.3em] text-white/30">{caption}</span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. AirForceMetricStrip
// ─────────────────────────────────────────────────────────────────────────────

export function AirForceMetricStrip({ metrics, locale = "en" }: { metrics: AirForceMetric[]; locale?: Locale }) {
  return (
    <section className="relative bg-[#050608] border-y border-white/[0.04]">
      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6 bg-white/[0.04] border border-white/[0.04]">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative bg-[#050608] p-6 lg:p-7"
            >
              <div className="af-font-display text-[clamp(28px,3.5vw,42px)] font-black text-white leading-none mb-3 tracking-tight">
                <AFCountUp value={m.value} />
              </div>
              <div className="af-font-mono text-[8px] tracking-[0.2em] text-white/35 mb-4 leading-relaxed">{m.label}</div>
              <div className="text-[11px] leading-[1.7] text-white/25 group-hover:text-white/40 transition-colors duration-500">{m.detail}</div>
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
    <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="absolute inset-0 af-dot-grid opacity-40 pointer-events-none" />
      <div className="af-noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px]">
        <AFSectionTitle
          label={isRo ? "Comparație globală" : "Global comparison"}
          title={isRo ? "Putere aeriană" : "Fleet strength"}
          subtitle={isRo ? "fără precedent" : "unmatched"}
          body={isRo
            ? "Forțele Aeriene ale SUA operează cea mai mare și avansată flotă aeriană militară din lume — mai mare decât următoarele cinci forțe aeriene combinate."
            : "The United States Air Force operates the largest and most advanced military air fleet in the world — larger than the next five air forces combined."}
        />

        {/* Tabs */}
        <div className="flex justify-center gap-1.5 mb-14">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "af-font-mono px-6 py-3 text-[10px] tracking-[0.15em] transition-all duration-300 rounded-sm",
                tab === t.key
                  ? "bg-white text-black"
                  : "text-white/30 hover:text-white/60 hover:bg-white/[0.04]"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Comparison bars */}
        <div className="space-y-2 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              {data.map((d) => {
                const val = tab === "fighters" ? d.fighters : tab === "bombers" ? d.bombers : d.totalAircraft;
                const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
                const isUS = d.highlight;
                return (
                  <div key={d.country} className="group/row">
                    <div className={cn(
                      "flex items-center gap-5 py-4 px-5 transition-colors duration-300 rounded-sm",
                      isUS ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                    )}>
                      <div className="flex items-center gap-3 w-36 shrink-0">
                        <span className="text-lg">{d.flag}</span>
                        <span className={cn("af-font-mono text-[10px] tracking-[0.08em]", isUS ? "text-white" : "text-white/40")}>
                          {d.country}
                        </span>
                      </div>
                      
                      <div className="flex-1 relative h-5 bg-white/[0.03] rounded-full overflow-hidden">
                        {isUS ? (
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-y-0 left-0 flex rounded-full overflow-hidden"
                          >
                            {/* Segment 1: U.S. Air Force */}
                            <div
                              style={{ width: `${((tab === "total" ? 5217 : tab === "fighters" ? 1900 : 140) / val) * 100}%` }}
                              className="h-full bg-gradient-to-r from-[#d4a44a] to-[#d4a44a]/85"
                            />
                            {/* Segment 2: U.S. Army (Only for total) */}
                            {tab === "total" && (
                              <div
                                style={{ width: `${(4400 / val) * 100}%` }}
                                className="h-full bg-gradient-to-r from-white/40 to-white/25 border-l border-black/40"
                              />
                            )}
                            {/* Segment 3: U.S. Navy & Marines (Total and fighters) */}
                            {(tab === "total" || tab === "fighters") && (
                              <div
                                style={{ width: `${((tab === "total" ? 3600 : 1150) / val) * 100}%` }}
                                className="h-full bg-gradient-to-r from-white/20 to-white/10 border-l border-black/40"
                              />
                            )}
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-white/12 to-white/[0.04]"
                          />
                        )}
                      </div>
                      
                      <div className={cn(
                        "af-font-display text-base font-black w-16 text-right tabular-nums",
                        isUS ? "text-[#d4a44a]" : "text-white/35"
                      )}>
                        {val.toLocaleString()}
                      </div>
                    </div>
                    
                    {isUS && (
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1 mb-4 pl-5 md:pl-[164px] pr-20 text-[9px] tracking-wider af-font-mono text-white/40">
                        {tab === "total" ? (
                          <>
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#d4a44a]" />
                              {isRo ? "U.S. Air Force: 5.217" : "U.S. Air Force: 5,217"}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                              {isRo ? "U.S. Army: 4.400" : "U.S. Army: 4,400"}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                              {isRo ? "U.S. Navy & Marines: 3.600" : "U.S. Navy & Marines: 3,600"}
                            </span>
                          </>
                        ) : tab === "fighters" ? (
                          <>
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#d4a44a]" />
                              {isRo ? "U.S. Air Force: 1.900" : "U.S. Air Force: 1,900"}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                              {isRo ? "U.S. Navy & Marines: 1.150" : "U.S. Navy & Marines: 1,150"}
                            </span>
                          </>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#d4a44a]" />
                            {isRo ? "U.S. Air Force: 140 (Toate bombardierele strategice din SUA)" : "U.S. Air Force: 140 (All U.S. Strategic Bombers)"}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Intelligence Brief footnote for Bombers */}
          {tab === "bombers" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 border-l border-zinc-600/60 pl-5 py-1 text-left"
            >
              <h4 className="af-font-mono text-[9px] font-bold tracking-[0.25em] text-[#d4a44a] uppercase mb-2">
                {isRo ? "RAPORT ANALITIC: REALITATEA DESCURAJĂRII STRATEGICE" : "INTELLIGENCE BRIEF: THE REALITY OF STRATEGIC DETERRENCE"}
              </h4>
              <p className="text-[11px] leading-[1.8] text-zinc-400 max-w-3xl">
                {isRo ? (
                  <>
                    Volumul brut este o metrică a trecutului. În timp ce adversarii apropiați își umflă numărul flotei cu avioane clasice non-stealth produse în masă (cum ar fi cele din era sovietică Tu-95 sau chinezești H-6), flota de bombardiere americană optimizează pentru supraviețuire, viteză și letalitate de penetrare.
                    <br /><br />
                    Numărul de 140 din SUA este o forță extrem de specializată care combină capacitatea masivă de încărcare a B-52 Stratofortress, capacitatea de lovire supersonică a B-1B Lancer, penetrarea greu de detectat a B-2 Spirit și viitorul B-21 Raider de generația a 6-a. În spațiul aerian contestat modern, un singur B-21 nedetectat sau un payload B-1B desfășurat rapid este exponențial mai devastator decât o duzină de bombardiere clasice vizibile.
                  </>
                ) : (
                  <>
                    Raw volume is a metric of the past. While near-peer adversaries inflate their fleet numbers with mass-produced, non-stealth legacy airframes (such as the Soviet-era Tu-95 or the Chinese H-6), the American bomber fleet optimizes for survivability, speed, and penetrating lethality.
                    <br /><br />
                    The U.S. 140 count is a highly specialized force combining the massive payload capacity of the B-52 Stratofortress, the supersonic strike capability of the B-1B Lancer, the low-observable penetration of the B-2 Spirit, and the incoming 6th-generation B-21 Raider. In modern contested airspace, a single undetected B-21 or a rapidly deployed B-1B payload is exponentially more devastating than a dozen visible legacy bombers.
                  </>
                )}
              </p>
            </motion.div>
          )}
        </div>

        <div className="mt-12 text-center af-font-mono text-[9px] tracking-[0.25em] text-white/20">
          {isRo ? "Sursa: Flight International · Global Combat Aircraft Audit 2024" : "Source: Flight International · Global Combat Aircraft Audit 2024"}
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
    <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="af-noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px]">
        <AFSectionTitle
          label={isRo ? "Capacități de bază" : "Core capabilities"}
          title={isRo ? "Domeniile" : "Domains"}
          subtitle={isRo ? "supremației" : "of supremacy"}
          body={isRo
            ? "Cinci funcții de misiune distincte care definesc supremația aeriană a Americii — fiecare un pilon al descurajării și proiectării de forță."
            : "Five distinct mission functions that define American air supremacy — each a pillar of deterrence and force projection."}
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              transition={{ duration: 0.7, delay: i * 0.07 }}
              className={cn(
                "group relative overflow-hidden af-panel p-8 sm:p-10 transition-all duration-500 hover:border-white/10 flex flex-col",
                i === 0 && "lg:col-span-2 lg:row-span-2",
                i === 0 ? "min-h-[380px]" : "min-h-[260px]"
              )}
            >
              {/* Top accent dot */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-2 rounded-full opacity-60" style={{ backgroundColor: cap.accent }} />
                <span className="af-font-mono text-[9px] tracking-[0.2em] text-white/30">{cap.kicker}</span>
              </div>

              <h3 className={cn(
                "af-font-display font-black text-white mb-5 leading-[0.92]",
                i === 0 ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"
              )}>
                {cap.title}
              </h3>
              <p className={cn(
                "leading-[1.8] text-white/40 group-hover:text-white/55 transition-colors duration-500 mb-8",
                i === 0 ? "text-sm max-w-lg" : "text-xs"
              )}>
                {cap.description}
              </p>

              <div className="mt-auto">
                <span className="af-font-mono text-[9px] tracking-[0.15em]" style={{ color: cap.accent, opacity: 0.7 }}>
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
    <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="af-noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px]">
        <AFSectionTitle
          label={isRo ? "Teatre de operațiuni" : "Theaters of operation"}
          title={isRo ? "Comandamente" : "Global"}
          subtitle={isRo ? "globale" : "commands"}
          body={isRo
            ? "Selectați un teatru. Forțele Aeriene se configurează ca prezență, descurajare și infrastructură de comandă adaptată fiecărui mediu strategic."
            : "Select a theater. The Air Force reconfigures as presence, deterrence, and command infrastructure tuned to each strategic environment."}
        />

        <div className="grid overflow-hidden border border-white/[0.04] bg-[#050608] lg:grid-cols-[320px_1fr_380px] min-h-[680px]">
          {/* Left — theater list */}
          <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.04] bg-black/30">
            {theaters.map((theater, index) => {
              const selected = activeIndex === index;
              return (
                <button
                  key={theater.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative flex-1 text-left px-7 py-6 transition-colors duration-300 border-b border-white/[0.03] last:border-b-0",
                    selected ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                  )}
                >
                  {selected && (
                    <motion.div
                      layoutId="af-theater-indicator"
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/60"
                      transition={{ type: "spring", stiffness: 400, damping: 40 }}
                    />
                  )}
                  <div className="af-font-mono text-[8px] tracking-[0.2em] text-white/25 mb-2">{theater.region}</div>
                  <div className={cn(
                    "af-font-display text-lg font-black leading-none transition-colors",
                    selected ? "text-white" : "text-white/35"
                  )}>
                    {theater.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center — image */}
          <div className="relative min-h-[400px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={active.imageSrc}
                  alt={active.imageAlt}
                  fill
                  quality={90}
                  className="object-cover brightness-[0.28] saturate-[0.7]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/50 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 right-8 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id + "-caption"}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="af-font-mono text-[9px] tracking-[0.2em] text-white/30 mb-3">{active.signal}</div>
                  <div className="af-font-display text-2xl sm:text-3xl font-black text-white leading-[0.9]">{active.headline}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right — details */}
          <div className="flex flex-col border-t lg:border-t-0 lg:border-l border-white/[0.04] bg-[#050608] p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-detail"}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full"
              >
                <div className="af-font-mono text-[8px] tracking-[0.2em] text-white/25 mb-2">{active.region}</div>
                <h3 className="af-font-display text-xl font-black text-white mb-5 leading-[0.92]">{active.name}</h3>
                <p className="text-[13px] leading-[1.85] text-white/40 mb-10">{active.description}</p>

                <div className="mt-auto space-y-4">
                  {active.metrics.map((m) => (
                    <div key={m.label} className="flex items-center justify-between">
                      <span className="af-font-mono text-[9px] tracking-[0.12em] text-white/30">{m.label}</span>
                      <span className="af-font-mono text-[10px] tracking-[0.08em] text-white/65">{m.value}</span>
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
    <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="af-noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px]">
        <AFSectionTitle
          label={isRo ? "Platforme de luptă" : "Combat platforms"}
          title={isRo ? "Arsenal" : "Weapons"}
          subtitle={isRo ? "aerian" : "platforms"}
          body={isRo
            ? "De la superioritate aeriană la lovitură globală, mobilitate rapidă și război autonom — fiecare platformă reprezintă un pilon al puterii aeriene americane."
            : "From air superiority to global strike, rapid mobility, and autonomous warfare — each platform represents a pillar of American airpower."}
        />

        {/* Platform tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-14">
          {platforms.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "af-font-mono px-4 py-2.5 text-[9px] tracking-[0.1em] transition-all duration-300 rounded-sm",
                activeIndex === i
                  ? "bg-white text-black"
                  : "text-white/25 hover:text-white/55 hover:bg-white/[0.04]"
              )}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Active platform */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid border border-white/[0.04] bg-[#050608] lg:grid-cols-[1fr_420px]"
          >
            {/* Image */}
            <div className="relative min-h-[420px] lg:min-h-[560px] overflow-hidden">
              <Image
                src={active.imageSrc}
                alt={active.imageAlt}
                fill
                quality={90}
                className="object-cover brightness-[0.35] saturate-[0.8]"
                sizes="(max-width: 1024px) 100vw, 60vw"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050608]/50 pointer-events-none" />
              <div className="absolute bottom-10 left-10 z-10">
                <div className="af-font-mono text-[9px] tracking-[0.2em] text-white/30 mb-3">{active.designation}</div>
                <div className="af-font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[0.85]">{active.name}</div>
              </div>
            </div>

            {/* Detail panel */}
            <div className="flex flex-col p-9 lg:p-11 border-t lg:border-t-0 lg:border-l border-white/[0.04]">
              <div className="af-font-mono text-[9px] tracking-[0.2em] text-[#7aaed4]/50 mb-4">{active.capability}</div>
              <p className="text-[13px] leading-[1.85] text-white/45 mb-10">{active.role}</p>

              <div className="grid grid-cols-2 gap-3 mt-auto">
                {active.specs.map((s) => (
                  <div key={s.label} className="af-panel p-5">
                    <div className="af-font-mono text-[8px] tracking-[0.2em] text-white/25 mb-2">{s.label}</div>
                    <div className="af-font-display text-lg font-black text-white leading-none">{s.value}</div>
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
    <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="af-noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px]">
        <AFSectionTitle
          label={isRo ? "Moștenire" : "Heritage"}
          title={isRo ? "Istoria" : "History"}
          subtitle={isRo ? "zborului" : "of flight"}
          body={isRo
            ? "De la Kitty Hawk la bombardierul stealth B-21 Raider — un secol de dominanță aeriană americană neîntreruptă."
            : "From Kitty Hawk to the B-21 Raider stealth bomber — a century of unbroken American air dominance."}
        />

        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/[0.06]" />

          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={event.year}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                className={cn(
                  "relative mb-16 last:mb-0 pl-14 md:pl-0",
                  "md:grid md:grid-cols-2 md:gap-16"
                )}
              >
                {/* Year dot */}
                <div className="absolute left-6 md:left-1/2 top-2 -translate-x-1/2 z-10">
                  <div className="h-3 w-3 rounded-full bg-[#d4a44a]/80 ring-4 ring-black" />
                </div>

                {/* Card — placed on correct side */}
                <div className={cn(
                  "md:col-span-1",
                  isLeft ? "md:col-start-1 md:pr-8" : "md:col-start-2 md:pl-8"
                )}>
                  {/* Year badge */}
                  <div className="af-font-mono text-[11px] tracking-[0.2em] text-[#d4a44a]/60 mb-3">{event.year}</div>

                  {/* Image */}
                  {event.imageSrc && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden mb-5 rounded-sm">
                      <Image
                        src={event.imageSrc}
                        alt={event.title}
                        fill
                        className="object-cover brightness-[0.45] saturate-[0.7] hover:brightness-[0.6] hover:saturate-[0.9] transition-all duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        placeholder="blur"
                        blurDataURL={BLUR_PLACEHOLDER}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    </div>
                  )}

                  <h3 className="af-font-display text-lg sm:text-xl font-black text-white mb-3 leading-[0.95]">{event.title}</h3>
                  <p className="text-[12px] leading-[1.8] text-white/40 mb-4">{event.description}</p>

                  <span className="af-font-mono text-[8px] tracking-[0.15em] text-white/25">{event.significance}</span>
                </div>

                {/* Empty col */}
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
    <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="absolute inset-0 af-dot-grid opacity-30 pointer-events-none" />
      <div className="af-noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px]">
        <AFSectionTitle
          label={isRo ? "Baze & instalații" : "Bases & installations"}
          title={isRo ? "Infrastructură" : "Global"}
          subtitle={isRo ? "globală" : "footprint"}
          body={isRo
            ? "De la deșertul Nevada la Europa de Vest și Pacificul de Vest — bazele aeriene americane formează o rețea globală de putere aeriană permanentă."
            : "From the Nevada desert to Western Europe and the Western Pacific — American air bases form a permanent global airpower network."}
        />

        <div className="grid gap-4 lg:grid-cols-[1fr_460px]">
          {/* Base grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {bases.map((base, i) => (
              <button
                key={base.name}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "group relative text-left p-6 transition-all duration-300 rounded-sm",
                  activeIndex === i
                    ? "bg-white/[0.05] ring-1 ring-white/10"
                    : "hover:bg-white/[0.02]"
                )}
              >
                <MapPin size={11} className={cn("mb-3 transition-colors", activeIndex === i ? "text-white/50" : "text-white/20")} strokeWidth={1.5} />
                <div className={cn(
                  "af-font-display text-sm font-black leading-none mb-1.5 transition-colors",
                  activeIndex === i ? "text-white" : "text-white/40"
                )}>
                  {base.name}
                </div>
                <div className="af-font-mono text-[8px] tracking-[0.12em] text-white/25">{base.location}</div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="af-panel p-9 rounded-sm"
            >
              <div className="af-font-mono text-[9px] tracking-[0.2em] text-white/25 mb-2">{active.role}</div>
              <h3 className="af-font-display text-2xl sm:text-3xl font-black text-white mb-2 leading-[0.92]">{active.name}</h3>
              <div className="af-font-mono text-[8px] tracking-[0.15em] text-white/25 mb-7">{active.location}</div>
              <p className="text-[13px] leading-[1.85] text-white/40 mb-10">{active.description}</p>

              <div className="space-y-4">
                {active.stats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="af-font-mono text-[9px] tracking-[0.12em] text-white/30">{s.label}</span>
                    <span className="af-font-mono text-[10px] tracking-[0.08em] text-white/60">{s.value}</span>
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
    <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="af-noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px]">
        <AFSectionTitle
          label={isRo ? "Programe viitoare" : "Future programs"}
          title={isRo ? "Generația" : "Next"}
          subtitle={isRo ? "următoare" : "generation"}
          body={isRo
            ? "De la NGAD și CCA la arme hipersonice și modernizarea nucleară — programele care vor defini puterea aeriană americană în deceniile următoare."
            : "From NGAD and CCA to hypersonic weapons and nuclear modernization — the programs defining American airpower for decades to come."}
        />

        <div className="grid border border-white/[0.04] bg-[#050608] lg:grid-cols-[1fr_420px]">
          {/* Image side */}
          <div className="relative min-h-[380px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <Image
                  src={active.imageSrc}
                  alt={active.imageAlt}
                  fill
                  quality={90}
                  className="object-cover brightness-[0.25] saturate-[0.6]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050608]/50 pointer-events-none" />

            {/* Program tabs at bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-10 flex">
              {programs.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "flex-1 py-4 text-center af-font-mono text-[10px] tracking-[0.12em] transition-all duration-300 border-t border-r border-white/[0.04] last:border-r-0",
                    activeIndex === i
                      ? "bg-white/[0.08] text-white"
                      : "bg-black/60 text-white/25 hover:text-white/50"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.label + "-detail"}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col p-9 border-t lg:border-t-0 lg:border-l border-white/[0.04]"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="af-font-mono text-[9px] tracking-[0.15em] text-[#d4a44a]/50">{active.status}</span>
              </div>
              <h3 className="af-font-display text-xl sm:text-2xl font-black text-white mb-5 leading-[0.92]">{active.title}</h3>
              <div className="af-font-mono text-[9px] tracking-[0.15em] text-[#7aaed4]/40 mb-4">{active.capability}</div>
              <p className="text-[13px] leading-[1.85] text-white/40 mb-10">{active.description}</p>

              <div className="grid grid-cols-2 gap-2.5 mt-auto">
                {active.specs.map((s) => (
                  <div key={s.label} className="af-panel p-4">
                    <div className="af-font-mono text-[7px] tracking-[0.2em] text-white/25 mb-1.5">{s.label}</div>
                    <div className="af-font-display text-sm font-black text-white leading-none">{s.value}</div>
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
      desc: isRo ? "Infrastructură militară și logistică" : "Global footprint and logistics network",
      icon: Network,
    },
    {
      href: "/military/intelligence",
      label: isRo ? "Informații" : "Intelligence",
      desc: isRo ? "SIGINT, HUMINT și securitate cibernetică" : "SIGINT, HUMINT, and cyber capabilities",
      icon: Shield,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black px-6 py-32 sm:px-10 md:py-40 lg:px-16">
      <div className="absolute inset-0 af-dot-grid opacity-25 pointer-events-none" />
      <div className="af-noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1000px] text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="af-font-display text-[clamp(32px,8vw,96px)] font-black leading-[0.88] text-white"
          >
            {isRo ? "Supremație aeriană" : "Air supremacy"}
          </motion.h2>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="af-font-display text-[clamp(32px,8vw,96px)] font-black leading-[0.88] text-white/12 mt-1"
          >
            {isRo ? "fără egal." : "without equal."}
          </motion.div>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="mx-auto mt-10 max-w-2xl text-sm leading-[1.9] text-white/40"
          >
            {isRo
              ? "Când o criză apare oriunde pe Pământ, primul lucru pe care îl aud națiunile este motoarele avioanelor americane. Forțele Aeriene sunt umbrela sub care operează toate celelalte forțe."
              : "When a crisis erupts anywhere on Earth, the first thing nations hear is the sound of American jet engines. The Air Force is the umbrella under which every other force operates."}
          </motion.p>
        </motion.div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/military"
            className="group inline-flex h-12 items-center gap-3 bg-white px-7 text-[11px] font-bold uppercase tracking-[0.1em] text-black transition-opacity hover:opacity-85 rounded-sm"
          >
            {isRo ? "Prezentare militară" : "Military overview"}
            <ArrowUpRight size={14} strokeWidth={2.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Cross-links */}
        <div className="mt-24 pt-16 border-t border-white/[0.04]">
          <div className="af-font-mono text-[9px] tracking-[0.3em] text-white/20 mb-10">
            {isRo ? "Explorați alte dimensiuni militare" : "Explore other military dimensions"}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            {branches.map((b) => {
              const Icon = b.icon;
              return (
                <Link
                  key={b.href}
                  href={b.href}
                  className="group af-panel p-6 hover:bg-white/[0.03] transition-colors duration-400 rounded-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon size={14} strokeWidth={1.5} className="text-white/20 group-hover:text-white/50 transition-colors" />
                    <span className="af-font-display text-sm font-bold text-white/60 group-hover:text-white transition-colors">
                      {b.label}
                    </span>
                  </div>
                  <p className="text-[11px] leading-[1.7] text-white/25 group-hover:text-white/40 transition-colors">
                    {b.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
