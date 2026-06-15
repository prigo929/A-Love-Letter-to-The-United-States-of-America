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
  Satellite,
  Shield,
} from "lucide-react";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type {
  SpaceForceBase,
  SpaceForceCapability,
  SpaceForceFleetComparison,
  SpaceForceFutureProgram,
  SpaceForceHeritageEvent,
  SpaceForceMetric,
  SpaceForcePlatform,
  SpaceForceTheater,
} from "@/lib/data/spaceforce-data";
import { SITE_IMAGES } from "@/lib/site-images";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

// Map capability accent → background image for Enhancement 5
const CAPABILITY_BG_MAP: Record<string, string> = {
  "#3ddbd9": SITE_IMAGES.spaceForce.earthNight,
  "#ff6b6b": SITE_IMAGES.spaceForce.launch,
  "#b9c7d9": SITE_IMAGES.spaceForce.earth,
  "#8b5cf6": SITE_IMAGES.spaceForce.spacex,
  "#34d399": SITE_IMAGES.spaceForce.launch,
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. SpaceForceStyles
// ─────────────────────────────────────────────────────────────────────────────

export function SpaceForceStyles() {
  return (
    <style jsx global>{`
      .sf-page {
        --sf-black: #000000;
        --sf-void: #050608;
        --sf-surface: #0a0c10;
        --sf-elevated: #12151b;
        --sf-amber: #3ddbd9;
        --sf-sky: #b9c7d9;
        --sf-border: rgba(255, 255, 255, 0.06);
        background: var(--sf-black);
        color: white;
      }

      .sf-font-display {
        font-family: var(--font-archivo), Inter, system-ui, sans-serif;
        letter-spacing: -0.035em;
        text-transform: uppercase;
      }

      .sf-font-mono {
        font-family: var(--font-mono), "SFMono-Regular", Consolas, monospace;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .sf-dot-grid {
        background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
        background-size: 28px 28px;
      }

      .sf-noise::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0.06;
        mix-blend-mode: overlay;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E");
      }

      .sf-glass {
        background: rgba(8, 10, 14, 0.82);
        backdrop-filter: blur(40px) saturate(1.2);
        -webkit-backdrop-filter: blur(40px) saturate(1.2);
        border: 1px solid rgba(255, 255, 255, 0.06);
      }

      .sf-panel {
        background: var(--sf-surface);
        border: 1px solid rgba(255, 255, 255, 0.05);
      }
    `}</style>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. SpaceForcePageProgress (Enhancement 10)
// ─────────────────────────────────────────────────────────────────────────────

export function SpaceForcePageProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] bg-white/[0.03]">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[#3ddbd9] via-white/90 to-white"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  SFSectionDivider — animated horizontal rule (Enhancement 7)
// ─────────────────────────────────────────────────────────────────────────────

export function SFSectionDivider() {
  return (
    <div className="relative flex justify-center items-center py-6 px-6">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-px w-full max-w-[480px] origin-center bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function SFCountUp({ value, locale = "en" }: { value: string; locale?: Locale }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayVal, setDisplayVal] = useState("0");

  useEffect(() => {
    const cleanValue = value.replace(/,/g, "").replace(/\./g, ""); // strip all thousands separators
    const numericMatch = cleanValue.match(/^([\d.]+)(.*)$/);
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
          const isYear = num >= 1000 && num < 2100 && suffix === "";
          const formatted = (num >= 1000 && !isYear)
            ? Math.round(latest).toLocaleString(locale === "ro" ? "ro-RO" : "en-US")
            : latest.toFixed(0);
          setDisplayVal(formatted + suffix);
        },
      });
      return () => controls.stop();
    }
  }, [inView, value, locale]);

  return <span ref={ref} className="text-white">{displayVal}</span>;
}

function SFSectionTitle({
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
        className="sf-font-mono mb-5 tracking-[0.25em] text-[11px] font-bold text-[#3ddbd9]"
      >
        {label}
      </motion.div>
      <motion.h2
        variants={fadeUp}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="sf-font-display text-[clamp(36px,7vw,88px)] font-black leading-[0.88] text-white"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="sf-font-display text-[clamp(36px,7vw,88px)] font-black leading-[0.88] text-white/15 mt-1"
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

export function SpaceForceFullBleed({
  imageSrc, imageAlt, caption, pullQuote,
}: {
  imageSrc: string; imageAlt: string; caption?: string; pullQuote?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <div ref={ref} className="relative h-[62vh] min-h-[440px] overflow-hidden">
      <motion.div className="absolute inset-0 -inset-y-[12%]" style={{ y }}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          quality={90}
          className="object-cover brightness-[0.28] saturate-[0.75]"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />

      {pullQuote && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 h-px w-14 origin-center bg-[#3ddbd9]/50"
          />
          <p className="sf-font-display text-[clamp(20px,4vw,54px)] font-black text-white leading-[1.05] max-w-4xl tracking-tight">
            {pullQuote}
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 h-px w-14 origin-center bg-[#3ddbd9]/50"
          />
        </motion.div>
      )}

      {caption && (
        <div className="absolute bottom-7 left-0 right-0 text-center">
          <span className="sf-font-mono text-[11px] tracking-[0.25em] font-semibold text-white/55">{caption}</span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. SpaceForceMetricStrip
// ─────────────────────────────────────────────────────────────────────────────

export function SpaceForceMetricStrip({ metrics, locale = "en" }: { metrics: SpaceForceMetric[]; locale?: Locale }) {
  return (
    <section className="relative overflow-hidden" style={{ background: "#000000" }}>
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/5">
          {metrics.map((m, i) => (
            <div key={m.label} className="border-r border-b border-white/5">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col px-8 py-12"
              >
                {/* Label — top */}
                <div className="mil-text-metadata mb-6 tracking-[0.3em] font-black text-white">
                  {m.label}
                </div>

                {/* Large number */}
                <div className="flex items-baseline gap-1">
                  <span className="text-[clamp(48px,7vw,96px)] font-extralight tracking-tighter leading-none">
                    <SFCountUp value={m.value} locale={locale} />
                  </span>
                </div>

                {/* Gradient divider */}
                <div className="mt-6 mb-4 h-px w-full" style={{
                  background: "linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.05), transparent)"
                }} />

                {/* Sublabel */}
                <div className="mil-text-metadata max-w-[240px] leading-relaxed opacity-60 text-[11px] font-medium tracking-wide">
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
// 4. SpaceForceFleetComparisonSection
// ─────────────────────────────────────────────────────────────────────────────

export function SpaceForceFleetComparisonSection({ data, locale = "en" }: { data: SpaceForceFleetComparison[]; locale?: Locale }) {
  const [tab, setTab] = useState<"military" | "gps" | "total">("military");
  const isRo = locale === "ro";

  const maxVal = Math.max(...data.map((d) =>
    tab === "military" ? d.militarySatellites : tab === "gps" ? d.gpsSatellites : d.totalSpacecraft
  ));

  const tabs = [
    { key: "military" as const, label: isRo ? "Sateliți militari" : "Military satellites" },
    { key: "gps" as const, label: isRo ? "Sateliți PNT" : "PNT satellites" },
    { key: "total" as const, label: isRo ? "Total spațial" : "Total spacecraft" },
  ];

  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="absolute inset-0 sf-dot-grid opacity-40 pointer-events-none" />
      <div className="sf-noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px]">
        <SFSectionTitle
          label={isRo ? "Comparație globală" : "Global comparison"}
          title={isRo ? "Avantaj" : "Orbital"}
          subtitle={isRo ? "orbital" : "advantage"}
          body={isRo
            ? "Space Force organizează infrastructura orbitală care oferă Statelor Unite poziționare, avertizare, comunicații și conștientizare spațială la scară globală."
            : "Space Force organizes the orbital infrastructure that gives the United States global positioning, warning, communications, and space awareness at scale."}
        />

        {/* Tabs */}
        <div className="flex justify-center gap-1.5 mb-14">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "sf-font-mono px-6 py-3 text-[11px] font-bold tracking-[0.12em] transition-all duration-300 rounded-sm",
                tab === t.key
                  ? "bg-white text-black"
                  : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
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
                const val = tab === "military" ? d.militarySatellites : tab === "gps" ? d.gpsSatellites : d.totalSpacecraft;
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
                        <span className={cn("sf-font-mono text-[11px] tracking-[0.08em] font-medium", isUS ? "text-white" : "text-white/55")}>
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
                            <motion.div
                              animate={{ width: `${Math.min(100, ((tab === "total" ? 250 : tab === "military" ? 250 : 31) / val) * 100)}%` }}
                              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full bg-gradient-to-r from-[#3ddbd9] to-[#3ddbd9]/85"
                            />
                            {tab === "total" && (
                              <motion.div
                                animate={{ width: `${Math.min(100, (31 / val) * 100)}%` }}
                                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                                className="h-full bg-gradient-to-r from-white/40 to-white/25 border-l border-black/40"
                              />
                            )}
                            {tab === "total" && (
                              <motion.div
                                animate={{ width: `${Math.max(0, 100 - (((250 + 31) / val) * 100))}%` }}
                                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
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
                      
                      {/* Enhancement 8: hover number ticker */}
                      <SFTickerNumber
                        value={val}
                        locale={locale}
                        className={cn(
                          "sf-font-display text-base font-black w-16 text-right tabular-nums select-none",
                          isUS ? "text-[#3ddbd9]" : "text-white/35"
                        )}
                      />
                    </div>
                    
                    {isUS && (
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1 mb-4 pl-5 md:pl-[164px] pr-20 text-[11px] tracking-wider sf-font-mono text-white/65 font-medium">
                        {tab === "total" ? (
                          <>
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#3ddbd9]" />
                              {isRo ? "Sateliți militari SUA: 250+" : "U.S. military satellites: 250+"}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                              {isRo ? "GPS activ: 31+" : "Active GPS: 31+"}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                              {isRo ? "Comercial/civil: dominant" : "Commercial/civil: dominant"}
                            </span>
                          </>
                        ) : tab === "military" ? (
                          <>
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#3ddbd9]" />
                              {isRo ? "SUA: 250+ active militare" : "United States: 250+ military assets"}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                              {isRo ? "Operat prin arhitecturi comune" : "Operated across joint architectures"}
                            </span>
                          </>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3ddbd9]" />
                            {isRo ? "GPS american: serviciu global gratuit" : "American GPS: free global utility"}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {tab === "gps" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 border-l border-zinc-600/60 pl-5 py-1 text-left"
            >
              <h4 className="sf-font-mono text-[11px] font-bold tracking-[0.2em] text-[#3ddbd9] uppercase mb-2.5">
                {isRo ? "RAPORT ANALITIC: INFRASTRUCTURA INVIZIBILĂ" : "INTELLIGENCE BRIEF: THE INVISIBLE INFRASTRUCTURE"}
              </h4>
              <p className="text-[11px] leading-[1.8] text-zinc-400 max-w-3xl">
                {isRo
                  ? "GPS nu este doar o aplicație de hartă. Este ceasul de precizie pentru arme, rețele electrice, piețe financiare, logistică și comunicații. Space Force apără semnalul care face posibilă coordonarea modernă."
                  : "GPS is not just a map app. It is the precision clock for weapons, power grids, financial markets, logistics, and communications. Space Force protects the signal that makes modern coordination possible."}
              </p>
            </motion.div>
          )}
        </div>

        <div className="mt-12 text-center sf-font-mono text-[10px] tracking-[0.2em] font-medium text-white/40">
          {isRo ? "Sursa: registre publice orbitale și fact sheets oficiale USSF" : "Source: public orbital registries and official USSF fact sheets"}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. SpaceForceCapabilityGrid
// ─────────────────────────────────────────────────────────────────────────────

export function SpaceForceCapabilityGrid({ capabilities, locale = "en" }: { capabilities: SpaceForceCapability[]; locale?: Locale }) {
  const isRo = locale === "ro";
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="sf-noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px]">
        <SFSectionTitle
          label={isRo ? "Capacități de bază" : "Core capabilities"}
          title={isRo ? "Straturile" : "Layers"}
          subtitle={isRo ? "orbitei" : "of orbit"}
          body={isRo
            ? "Cinci funcții de misiune transformă spațiul într-un avantaj militar: navigație, avertizare, comunicații, conștientizare și apărare orbitală."
            : "Five mission functions turn space into military advantage: navigation, warning, communications, awareness, and orbital defense."}
        />

        <div className="flex flex-col lg:flex-row gap-3 mt-16 lg:h-[480px]">
          {capabilities.map((cap, i) => {
            const isHovered = hoveredIdx === i;
            const isAnyHovered = hoveredIdx !== null;
            const bgImage = CAPABILITY_BG_MAP[cap.accent];

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
                  "group relative overflow-hidden sf-panel p-6 sm:p-8 flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none min-h-[220px] lg:min-h-0",
                  isHovered ? "lg:flex-[3.2] bg-white/[0.04] border-white/10" : 
                  isAnyHovered ? "lg:flex-[0.6] opacity-35 bg-black/40 border-white/[0.02]" : "lg:flex-1 bg-white/[0.02] border-white/[0.04]"
                )}
              >
                {/* Enhancement 5: Subtle background image on hover */}
                {bgImage && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
                    style={{ opacity: isHovered ? 0.1 : 0.04 }}
                  >
                    <Image src={bgImage} alt="" fill className="object-cover saturate-[0.4]" sizes="20vw" />
                  </div>
                )}
                {/* Background Accent Glow */}
                <div 
                  className={cn(
                    "absolute top-0 right-0 h-40 w-40 rounded-full blur-[80px] pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-10",
                    cap.accent === "#3ddbd9" ? "bg-cyan-300" :
                    cap.accent === "#b9c7d9" ? "bg-slate-300" :
                    cap.accent === "#8b5cf6" ? "bg-violet-400" :
                    cap.accent === "#34d399" ? "bg-emerald-400" :
                    "bg-red-400"
                  )}
                />

                {/* Header: Dot + Kicker */}
                <div className="flex items-center gap-3 mb-6 lg:mb-0 shrink-0">
                  <div className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all duration-500",
                    isHovered ? "opacity-100 scale-125" : "opacity-40",
                    cap.accent === "#3ddbd9" ? "bg-cyan-300" :
                    cap.accent === "#b9c7d9" ? "bg-slate-300" :
                    cap.accent === "#8b5cf6" ? "bg-violet-400" :
                    cap.accent === "#34d399" ? "bg-emerald-400" :
                    "bg-red-400"
                  )} />
                  <span className="sf-font-mono text-[11px] font-bold tracking-[0.15em] text-white/50 transition-colors duration-500 group-hover:text-white/80">
                    {cap.kicker}
                  </span>
                </div>

                {/* Middle Content */}
                <div className="flex-1 flex flex-col justify-center my-4 lg:my-0">
                  <h3 className={cn(
                    "sf-font-display font-black text-white leading-[0.92] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
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

                {/* Footer: Bottom Stat */}
                <div className="shrink-0 mt-2 lg:mt-0">
                  <span className={cn(
                    "sf-font-mono text-[11px] font-bold tracking-[0.1em] transition-all duration-500",
                    isHovered ? "opacity-100" : "opacity-55",
                    cap.accent === "#3ddbd9" ? "text-cyan-300" :
                    cap.accent === "#b9c7d9" ? "text-slate-300" :
                    cap.accent === "#8b5cf6" ? "text-violet-400" :
                    cap.accent === "#34d399" ? "text-emerald-400" :
                    "text-red-400"
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
// 6. SpaceForceOperationalConsole
// ─────────────────────────────────────────────────────────────────────────────

export function SpaceForceOperationalConsole({ theaters, locale = "en" }: { theaters: SpaceForceTheater[]; locale?: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = theaters[activeIndex];
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="sf-noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px]">
        <SFSectionTitle
          label={isRo ? "Comenzi operaționale" : "Operational commands"}
          title={isRo ? "Comandamente" : "Global"}
          subtitle={isRo ? "spațiale" : "space command"}
          body={isRo
            ? "Selectați o comandă. Space Force transformă sateliți, senzori, lansări și rețele în efecte operaționale pentru forța întrunită."
            : "Select a command. Space Force turns satellites, sensors, launch, and networks into operational effects for the joint force."}
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
                      layoutId="sf-theater-indicator"
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/60"
                      transition={{ type: "spring", stiffness: 400, damping: 40 }}
                    />
                  )}
                  <div className="sf-font-mono text-[10px] tracking-[0.15em] text-white/40 mb-2">{theater.region}</div>
                  <div className={cn(
                    "sf-font-display text-lg font-black leading-none transition-colors",
                    selected ? "text-white" : "text-white/55"
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
                  <div className="sf-font-mono text-[11px] font-bold tracking-[0.15em] text-[#3ddbd9] mb-3">{active.signal}</div>
                  <div className="sf-font-display text-2xl sm:text-3xl font-black text-white leading-[0.9]">{active.headline}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right — details + Enhancement 6: pulsing signal indicator */}
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
                <div className="sf-font-mono text-[10px] tracking-[0.15em] text-white/40 mb-2">{active.region}</div>
                <h3 className="sf-font-display text-xl font-black text-white mb-5 leading-[0.92]">{active.name}</h3>
                <p className="text-[13px] leading-[1.85] text-white/65 mb-10">{active.description}</p>

                <div className="mt-auto space-y-4">
                  {active.metrics.map((m) => (
                    <div key={m.label} className="flex items-center justify-between">
                      <span className="sf-font-mono text-[11px] tracking-[0.12em] font-medium text-white/45">{m.label}</span>
                      <span className="sf-font-mono text-[11px] tracking-[0.08em] font-semibold text-white/80">{m.value}</span>
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
// 7. SpaceForcePlatformShowcase
// ─────────────────────────────────────────────────────────────────────────────

// Enhancement 8: hover-animated number ticker
function SFTickerNumber({ value, className, locale = "en" }: { value: number; className?: string; locale?: Locale }) {
  const [display, setDisplay] = useState(value);
  const animating = useRef(false);

  const handleEnter = () => {
    if (animating.current) return;
    animating.current = true;
    const end = value;
    const duration = 420;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(end * t));
      if (t < 1) requestAnimationFrame(tick);
      else { animating.current = false; setDisplay(end); }
    };
    requestAnimationFrame(tick);
  };

  return <span className={className} onMouseEnter={handleEnter}>{display.toLocaleString(locale === "ro" ? "ro-RO" : "en-US")}</span>;
}

export function SpaceForcePlatformShowcase({ platforms, locale = "en" }: { platforms: SpaceForcePlatform[]; locale?: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = platforms[activeIndex];
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="sf-noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px]">
        <SFSectionTitle
          label={isRo ? "Sisteme orbitale" : "Orbital systems"}
          title={isRo ? "Arhitectura" : "Mission"}
          subtitle={isRo ? "misiunii" : "systems"}
          body={isRo
            ? "De la GPS la avertizare rachete, comunicații protejate și acces la orbită — fiecare sistem susține modul modern de luptă american."
            : "From GPS to missile warning, protected communications, and access to orbit, each system underwrites modern American warfare."}
        />

        {/* Platform tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-14">
          {platforms.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "sf-font-mono px-4 py-2.5 text-[11px] tracking-[0.08em] font-semibold transition-all duration-300 rounded-sm",
                activeIndex === i
                  ? "bg-white text-black"
                  : "text-white/45 hover:text-white/80 hover:bg-white/[0.04]"
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
            {/* Enhancement 3: Brighter image + slow ken-burns drift */}
            <div className="relative min-h-[420px] lg:min-h-[560px] overflow-hidden">
              <motion.div
                key={active.name + "-img"}
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                className="absolute inset-0"
              >
                <Image
                  src={active.imageSrc}
                  alt={active.imageAlt}
                  fill
                  quality={90}
                  className="object-cover brightness-[0.55] saturate-[0.85] transition-[filter] duration-700 hover:brightness-[0.72] hover:saturate-[1.0]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050608]/50 pointer-events-none" />
              <div className="absolute bottom-10 left-10 z-10">
                <div className="sf-font-mono text-[11px] tracking-[0.15em] font-medium text-white/50 mb-3">{active.designation}</div>
                <div className="sf-font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[0.85]">{active.name}</div>
              </div>
            </div>

            {/* Detail panel */}
            <div className="flex flex-col p-9 lg:p-11 border-t lg:border-t-0 lg:border-l border-white/[0.04]">
              <div className="sf-font-mono text-[11px] tracking-[0.15em] font-bold text-[#b9c7d9]/75 mb-4">{active.capability}</div>
              <p className="text-[13px] leading-[1.85] text-white/45 mb-10">{active.role}</p>

              <div className="grid grid-cols-2 gap-3 mt-auto">
                {active.specs.map((s) => (
                  <div key={s.label} className="sf-panel p-5">
                    <div className="sf-font-mono text-[10px] tracking-[0.15em] text-white/40 mb-2">{s.label}</div>
                    <div className="sf-font-display text-lg font-black text-white leading-none">{s.value}</div>
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
// 8. SpaceForceHeritageTimeline
// ─────────────────────────────────────────────────────────────────────────────

export function SpaceForceHeritageTimeline({ events, locale = "en" }: { events: SpaceForceHeritageEvent[]; locale?: Locale }) {
  const isRo = locale === "ro";
  // Enhancement 4: Landmark indices get larger aspect ratio
  const LANDMARK = new Set([0, 4]);
  // Enhancement 4: Vintage years get sepia treatment
  const VINTAGE   = new Set(["1903", "1947", "1950", "1960"]);

  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="sf-noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px]">
        <SFSectionTitle
          label={isRo ? "Moștenire" : "Heritage"}
          title={isRo ? "Istoria" : "History"}
          subtitle={isRo ? "orbitei" : "of orbit"}
          body={isRo
            ? "De la începutul erei spațiale la înființarea Space Force — o linie de comandă construită pentru domeniul orbital."
            : "From the start of the space age to the creation of Space Force, a command lineage built for the orbital domain."}
        />

        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/[0.06]" />

          {events.map((event, i) => {
            const isLeft    = i % 2 === 0;
            const isLandmark = LANDMARK.has(i);
            const isVintage  = VINTAGE.has(event.year);
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
                  <div className={cn(
                    "rounded-full ring-4 ring-black",
                    isLandmark ? "h-4 w-4 bg-[#3ddbd9]" : "h-3 w-3 bg-[#3ddbd9]/80"
                  )} />
                </div>

                {/* Card — placed on correct side */}
                <div className={cn(
                  "md:col-span-1",
                  isLeft ? "md:col-start-1 md:pr-8" : "md:col-start-2 md:pl-8"
                )}>
                  {/* Year badge */}
                  <div className="sf-font-mono text-[13px] tracking-[0.15em] font-bold text-[#3ddbd9]/90 mb-2">{event.year}</div>

                  {/* Enhancement 4: Alternating aspect + sepia */}
                  {event.imageSrc && (
                    <div className={cn(
                      "relative w-full overflow-hidden mb-5 rounded-sm border border-white/5 bg-[#050608]/60",
                      event.aspectClass || (isLandmark ? "aspect-[4/3]" : "aspect-[16/9]")
                    )}>
                      <Image
                        src={event.imageSrc}
                        alt={event.title}
                        fill
                        className={cn(
                          event.imageFit === "contain" ? "object-contain px-4 py-2" : "object-cover",
                          "transition-all duration-700 hover:brightness-[0.65] hover:saturate-[0.95]",
                          isVintage
                            ? "brightness-[0.5] saturate-[0.45] sepia-[0.3]"
                            : "brightness-[0.5] saturate-[0.75]"
                        )}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        placeholder="blur"
                        blurDataURL={BLUR_PLACEHOLDER}
                      />
                      {event.imageFit !== "contain" && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                      )}
                    </div>
                  )}

                  <h3 className="sf-font-display text-lg sm:text-xl font-black text-white mb-3 leading-[0.95]">{event.title}</h3>
                  <p className="text-[14px] leading-[1.8] text-white/65 mb-4">{event.description}</p>

                  <span className="sf-font-mono text-[10px] font-semibold tracking-[0.12em] text-white/50">{event.significance}</span>
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
// 9. SpaceForceBasesSection
// ─────────────────────────────────────────────────────────────────────────────

export function SpaceForceBasesSection({ bases, locale = "en" }: { bases: SpaceForceBase[]; locale?: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = bases[activeIndex];
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="absolute inset-0 sf-dot-grid opacity-30 pointer-events-none" />
      <div className="sf-noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px]">
        <SFSectionTitle
          label={isRo ? "Baze & instalații" : "Bases & installations"}
          title={isRo ? "Infrastructură" : "Space"}
          subtitle={isRo ? "spațială" : "footprint"}
          body={isRo
            ? "De la Colorado Springs la Vandenberg, Patrick și Los Angeles — instalațiile Space Force conectează operațiuni, lansare, avertizare și achiziție."
            : "From Colorado Springs to Vandenberg, Patrick, and Los Angeles, Space Force installations connect operations, launch, warning, and acquisition."}
        />

        <div className="grid gap-4 lg:grid-cols-[1fr_460px]">
          {/* Base grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {bases.map((base, i) => (
              <button
                key={base.name}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "group relative text-left p-6 transition-all duration-500 rounded-sm overflow-hidden",
                  activeIndex === i
                    ? "bg-white/[0.05]"
                    : "hover:bg-white/[0.02]"
                )}
                style={activeIndex === i ? {
                  boxShadow: `0 0 0 1px ${base.accent}35, inset 0 0 30px ${base.accent}08`,
                } : {}}
              >
                <MapPin size={11} className={cn("mb-3 transition-colors", activeIndex === i ? "text-white/70" : "text-white/35")} strokeWidth={1.5} />
                <div className={cn(
                  "sf-font-display text-sm font-black leading-none mb-1.5 transition-colors",
                  activeIndex === i ? "text-white" : "text-white/60"
                )}>
                  {base.name}
                </div>
                <div className="sf-font-mono text-[10px] tracking-[0.12em] text-white/45">{base.location}</div>
                {/* Enhancement 9: accent-colored left bar */}
                {activeIndex === i && (
                  <motion.div
                    layoutId="base-accent-bar"
                    className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-sm"
                    style={{ background: base.accent }}
                    transition={{ type: "spring", stiffness: 450, damping: 40 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Detail panel — Enhancement 9: accent-tinted border */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="sf-panel p-9 rounded-sm"
              style={{ borderColor: `${active.accent}28`, boxShadow: `0 0 48px ${active.accent}0a` }}
            >
              <div className="sf-font-mono text-[11px] tracking-[0.15em] font-bold text-[#3ddbd9] mb-2">{active.role}</div>
              <h3 className="sf-font-display text-2xl sm:text-3xl font-black text-white mb-2 leading-[0.92]">{active.name}</h3>
              <div className="sf-font-mono text-[10px] tracking-[0.12em] text-white/45 mb-7">{active.location}</div>
              <p className="text-[13px] leading-[1.85] text-white/65 mb-10">{active.description}</p>

              <div className="space-y-4">
                {active.stats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="sf-font-mono text-[11px] tracking-[0.12em] text-white/45">{s.label}</span>
                    <span className="sf-font-mono text-[11px] tracking-[0.08em] text-white/75">{s.value}</span>
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
// 10. SpaceForceFutureStack
// ─────────────────────────────────────────────────────────────────────────────

export function SpaceForceFutureStack({ programs, locale = "en" }: { programs: SpaceForceFutureProgram[]; locale?: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = programs[activeIndex];
  const isRo = locale === "ro";

  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="sf-noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px]">
        <SFSectionTitle
          label={isRo ? "Programe viitoare" : "Future programs"}
          title={isRo ? "Orbita" : "Resilient"}
          subtitle={isRo ? "rezilientă" : "orbit"}
          body={isRo
            ? "De la GPS modernizat la OPIR next-gen, comunicații protejate și constelații proliferate — viitorul este distribuit, rezilient și rapid de reîmprospătat."
            : "From modernized GPS to next-gen OPIR, protected communications, and proliferated constellations, the future is distributed, resilient, and rapidly refreshed."}
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
                    "flex-1 py-4 text-center sf-font-mono text-[11px] tracking-[0.1em] font-semibold transition-all duration-300 border-t border-r border-white/[0.04] last:border-r-0",
                    activeIndex === i
                      ? "bg-white/[0.08] text-white"
                      : "bg-black/60 text-white/45 hover:text-white/80"
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
                <span className="sf-font-mono text-[11px] tracking-[0.15em] font-bold text-[#3ddbd9]">{active.status}</span>
              </div>
              <h3 className="sf-font-display text-xl sm:text-2xl font-black text-white mb-5 leading-[0.92]">{active.title}</h3>
              <div className="sf-font-mono text-[11px] tracking-[0.15em] font-bold text-[#b9c7d9]/70 mb-4">{active.capability}</div>
              <p className="text-[13px] leading-[1.85] text-white/65 mb-10">{active.description}</p>

              <div className="grid grid-cols-2 gap-2.5 mt-auto">
                {active.specs.map((s) => (
                  <div key={s.label} className="sf-panel p-4">
                    <div className="sf-font-mono text-[9px] tracking-[0.15em] text-white/40 mb-1.5">{s.label}</div>
                    <div className="sf-font-display text-sm font-black text-white leading-none">{s.value}</div>
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
// 11. SpaceForceClosing
// ─────────────────────────────────────────────────────────────────────────────

export function SpaceForceClosing({ locale = "en" }: { locale?: Locale }) {
  const isRo = locale === "ro";

  const branches = [
    {
      href: "/military/navy",
      label: isRo ? "Marina" : "Navy",
    },
    {
      href: "/military/air-force",
      label: isRo ? "Forțele Aeriene" : "Air Force",
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
    <section className="relative overflow-hidden bg-black px-6 py-32 sm:px-10 md:py-40 lg:px-16">
      <div className="absolute inset-0 sf-dot-grid opacity-25 pointer-events-none" />
      <div className="sf-noise absolute inset-0 pointer-events-none" />

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
            className="sf-font-display text-[clamp(32px,8vw,96px)] font-black leading-[0.88] text-white"
          >
            {isRo ? "Mereu deasupra" : "Always above"}
          </motion.h2>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="sf-font-display text-[clamp(32px,8vw,96px)] font-black leading-[0.88] text-white/12 mt-1"
          >
            {isRo ? "mereu conectat." : "always connected."}
          </motion.div>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="mx-auto mt-10 max-w-2xl text-sm leading-[1.9] text-white/55 font-medium"
          >
            {isRo
              ? "Când o criză apare oriunde pe Pământ, primele date decisive vin adesea de deasupra: avertizare, poziționare, comunicații și custodie orbitală."
              : "When a crisis erupts anywhere on Earth, decisive data often arrives first from above: warning, positioning, communications, and orbital custody."}
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
          <div className="sf-font-mono text-[12px] uppercase tracking-[0.2em] font-bold text-white/60 mb-8">
            {isRo ? "ALTE DIMENSIUNI MILITARE" : "OTHER MILITARY DIMENSIONS"}
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {branches.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="sf-font-mono text-xs uppercase tracking-[0.15em] text-white/50 transition-colors hover:text-[#3ddbd9]"
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
