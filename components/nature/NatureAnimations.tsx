"use client";

// ─── Nature Animation Components ─────────────────────────────────────────────
// Spatial Editorial visual engine for the Nature & Geography vertical.
//
// Design Language: "Spatial Editorial"
// - Vast negative space, borderless design, environmental integration
// - Inspired by: Apple environmental showcases, Rivian digital showrooms,
//   Aman Resorts, high-end interactive spatial documentaries
// - Typography: extreme scale contrast — massive cinematic headers paired
//   with tightly tracked minimalist metadata
// - Motion: natural, physical gravity — fade, blur, scale via useScroll

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { SITE_IMAGES } from "@/lib/site-images";

// ─────────────────────────────────────────────────────────────────────────────
// 0. NatStyles — Spatial Editorial Design System
// ─────────────────────────────────────────────────────────────────────────────

export function NatStyles() {
  return (
    <style jsx global>{`
      :root {
        /* ── Surface hierarchy ── */
        --nat-void:     #030504;
        --nat-surface:  #0a0c0a;
        --nat-elevated: #121412;
        --nat-border:   rgba(255,255,255,0.04);

        /* ── Accent system — organic, never synthetic ── */
        --nat-accent-earth:   #C4956A;
        --nat-accent-forest:  #4ade80;
        --nat-accent-glacier: #7DD3FC;
        --nat-accent-stone:   #8B8680;
      }

      /* ── Typography — Spatial Editorial grade ── */

      .nat-text-display {
        font-family: var(--font-archivo);
        font-size: clamp(80px, 15vw, 240px);
        font-weight: 200;
        line-height: 0.85;
        letter-spacing: -0.05em;
        text-transform: uppercase;
      }

      .nat-text-hero {
        font-family: var(--font-archivo);
        font-size: clamp(50px, 10vw, 160px);
        font-weight: 900;
        line-height: 0.9;
        letter-spacing: -0.04em;
        text-transform: uppercase;
      }

      .nat-text-section {
        font-family: var(--font-archivo);
        font-size: clamp(48px, 8vw, 120px);
        font-weight: 900;
        line-height: 0.9;
        letter-spacing: -0.03em;
        text-transform: uppercase;
      }

      .nat-text-heading {
        font-family: var(--font-archivo);
        font-size: clamp(28px, 4vw, 56px);
        font-weight: 800;
        line-height: 1;
        letter-spacing: -0.02em;
        text-transform: uppercase;
      }

      .nat-text-body {
        font-family: var(--font-body, 'Inter', system-ui, sans-serif);
        font-size: clamp(14px, 1.2vw, 18px);
        line-height: 1.7;
        color: rgba(255,255,255,0.65);
      }

      .nat-text-label {
        font-family: var(--font-hero);
        font-size: clamp(8px, 0.8vw, 10px);
        font-weight: 500;
        letter-spacing: 0.4em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.45);
      }

      .nat-text-metadata {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.35);
      }

      /* ── Utilities ── */

      .nat-noise::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
        pointer-events: none;
        z-index: 1;
      }

      .nat-glass {
        background: rgba(10, 12, 10, 0.6);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.04);
      }

      .nat-edge-fade {
        background: linear-gradient(to bottom, #030504 0%, rgba(3,5,4,0) 15%, rgba(3,5,4,0) 85%, #030504 100%);
      }

      @keyframes nat-breathe {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
      }
      .nat-breathe { animation: nat-breathe 3s ease-in-out infinite; }
    `}</style>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// 1. NatureHeroCrossfade — 5-slide crossfade with Ken-Burns zoom + dots
// ─────────────────────────────────────────────────────────────────────────────

// Uses local SITE_IMAGES for the best quality. Falls back to Unsplash only for
// Denali reflection (no local matching shot) and Yellowstone prismatic (local
// yellowstonePrismatic is better for this context).
const HERO_SLIDES = [
  { src: SITE_IMAGES.homeGrandCanyon,        alt: "Grand Canyon at sunrise",                   label: "GRAND CANYON · ARIZONA"       },
  { src: SITE_IMAGES.denaliNationalPark,     alt: "Denali, highest peak in North America",     label: "DENALI · ALASKA"              },
  { src: SITE_IMAGES.yosemiteNationalPark,   alt: "Yosemite National Park valley",             label: "YOSEMITE · CALIFORNIA"        },
  { src: SITE_IMAGES.yellowstonePrismatic,   alt: "Grand Prismatic Spring, Yellowstone",       label: "YELLOWSTONE · WYOMING"        },
  { src: SITE_IMAGES.glacierNationalPark,    alt: "Glacier National Park alpine lakes",        label: "GLACIER NP · MONTANA"         },
];

export function NatureHeroCrossfade({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % HERO_SLIDES.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-(--nat-void,#030504)">
      {HERO_SLIDES.map((slide, i) => {
        const isPrev = i === (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
        const isNext = i === (current + 1) % HERO_SLIDES.length;
        const isActive = i === current;
        if (!isActive && !isPrev && !isNext) return null;

        return (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 2.0, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              animate={isActive ? { scale: 1.08 } : { scale: 1 }}
              transition={{ duration: 7, ease: "linear" }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover brightness-[0.4] saturate-[0.7]"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Cinematic vignettes */}
      <div className="absolute inset-0 z-10 nat-edge-fade" />
      <div className="absolute inset-0 z-10" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(3,5,4,0.7) 100%)'
      }} />

      {/* Film grain */}
      <div className="absolute inset-0 z-10 nat-noise pointer-events-none" />

      {/* Slide metadata label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={current}
          className="absolute bottom-8 right-8 z-20 nat-text-metadata"
          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.5 }}
        >
          {HERO_SLIDES[current].label}
        </motion.p>
      </AnimatePresence>

      {/* Breathing scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <div className="h-8 w-px bg-white/20 nat-breathe" />
      </div>

      {/* Content overlay */}
      <div className="relative z-20 flex h-screen flex-col justify-end pb-24 pt-48">
        <div className="mx-auto max-w-[1440px] w-full px-6 md:px-12">{children}</div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ParallaxImageBand — scroll-linked full-width cinematic divider
// ─────────────────────────────────────────────────────────────────────────────

interface ParallaxImageBandProps {
  imageSrc: string;
  imageAlt: string;
  children?: React.ReactNode;
  height?: number;
  overlayOpacity?: number;
}

export function ParallaxImageBand({ imageSrc, imageAlt, children, height = 600, overlayOpacity = 0.55 }: ParallaxImageBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height }}>
      <motion.div className="absolute inset-[-15%]" style={{ y }}>
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover brightness-[0.35] saturate-[0.6]" sizes="100vw" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
      </motion.div>
      {/* Edge fade vignettes */}
      <div className="absolute inset-0 nat-edge-fade" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 20%, rgba(3,5,4,0.6) 100%)'
      }} />
      <div className="absolute inset-0 nat-noise pointer-events-none" />
      {children && <div className="absolute inset-0 z-10 flex items-center justify-center px-6">{children}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. AnimatedStatWall — borderless horizontal stat strip
// ─────────────────────────────────────────────────────────────────────────────

interface StatWallItem {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  sub?: string;
  color?: string;
}

function CountUp({ value, prefix = "", suffix = "", decimals = 0, color = "#C4956A" }: {
  value: number; prefix?: string; suffix?: string; decimals?: number; color?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { if (ref.current) ref.current.textContent = prefix + v.toFixed(decimals) + suffix; },
    });
    return controls.stop;
  }, [inView, value, prefix, suffix, decimals, motionValue]);

  return <span ref={ref} className="font-hero tabular-nums" style={{ color }}>{prefix}0{suffix}</span>;
}

export function AnimatedStatWall({ stats }: { stats: StatWallItem[] }) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-stretch justify-center"
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
    >
      {stats.map((stat, i) => (
        <motion.div key={i}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
          className="flex flex-col items-center justify-center gap-3 py-10 px-8 md:px-12 text-center flex-1"
          style={{
            borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            borderBottom: 'none',
          }}
        >
          <p className="leading-none text-[clamp(40px,6vw,80px)] font-extralight tracking-tighter" style={{ color: stat.color ?? "#C4956A" }}>
            <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} color={stat.color ?? "#C4956A"} />
          </p>
          <p className="nat-text-label">{stat.label}</p>
          {stat.sub && <p className="nat-text-metadata">{stat.sub}</p>}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. ParkCinematicGrid — borderless editorial park showcase
// ─────────────────────────────────────────────────────────────────────────────

interface ParkData {
  name: string; state: string; established: number; visitors: number;
  area: number; highlight: string; imageSrc: string; imageAlt: string;
}

export function ParkCinematicGrid({ parks, visitLabel = "Visits/yr", acresLabel = "Acres", estLabel = "Est." }: {
  parks: ParkData[]; visitLabel?: string; acresLabel?: string; estLabel?: string;
}) {
  return (
    <motion.div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {parks.map((park) => (
        <motion.div key={park.name}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
          className="group relative h-80 md:h-96 overflow-hidden"
        >
          <motion.div className="absolute inset-0" whileHover={{ scale: 1.04 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <Image src={park.imageSrc} alt={park.imageAlt} fill className="object-cover brightness-[0.5] saturate-[0.7] transition-all duration-700 group-hover:brightness-[0.6] group-hover:saturate-[0.8]"
              sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
              placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,5,4,0.9)_0%,rgba(3,5,4,0)_50%)]" />
          <span className="absolute right-4 top-4 z-10 nat-text-metadata">
            {estLabel} {park.established}
          </span>
          <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
            <p className="nat-text-metadata mb-2" style={{ color: 'var(--nat-accent-earth)' }}>{park.state}</p>
            <h3 className="nat-text-heading text-white">{park.name}</h3>
            <div className="mt-3 overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500 ease-out">
              <p className="text-sm leading-relaxed text-white/50 mb-3">{park.highlight}</p>
              <div className="flex gap-6">
                <span className="nat-text-metadata"><span className="text-sm text-white/80 mr-1">{park.visitors}M</span> {visitLabel}</span>
                <span className="nat-text-metadata"><span className="text-sm text-white/80 mr-1">{park.area.toLocaleString()}K</span> {acresLabel}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// 5. CanyonStrataReveal — borderless geological timeline
// ─────────────────────────────────────────────────────────────────────────────

export function CanyonStrataReveal({ layers }: { layers: { layer: string; age: string; depth: string; color: string }[] }) {
  return (
    <motion.div className="border-t border-b border-white/[0.04]"
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
    >
      {layers.map((layer, i) => (
        <motion.div key={i}
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 border-b border-white/[0.04] py-5 last:border-0 hover:bg-white/[0.02] transition-colors px-4"
        >
          <div className="flex items-center gap-3 sm:w-1/4 shrink-0">
            <div className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: layer.color }} />
            <p className="nat-text-metadata text-white/40">{layer.depth}</p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-white tracking-wide truncate">{layer.layer}</p>
          </div>
          <p className="font-hero text-sm tracking-wider shrink-0" style={{ color: 'var(--nat-accent-earth)' }}>
            {layer.age}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// 10. HeroTextReveal — Spatial Editorial hero title
// ─────────────────────────────────────────────────────────────────────────────

export function HeroTextReveal({ line1, line2, line2Color = "#4ade80", eyebrow, body, children }: {
  line1: string; line2: string; line2Color?: string; eyebrow?: string; body?: string; children?: React.ReactNode;
}) {
  return (
    <motion.div initial="hidden" animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
    >
      {eyebrow && (
        <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          className="nat-text-label mb-6" style={{ color: 'var(--nat-accent-earth)' }}>{eyebrow}
        </motion.p>
      )}
      <div className="overflow-hidden">
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.19, 1, 0.22, 1] } } }}
          className="nat-text-hero"
        >
          <span className="block text-white">{line1}</span>
          <span className="block" style={{ color: line2Color }}>{line2}</span>
        </motion.h1>
      </div>
      {body && (
        <motion.p variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 } } }}
          className="nat-text-body mt-8 max-w-2xl">{body}
        </motion.p>
      )}
      {children && (
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2 } } }}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. RegionCardsGrid — borderless editorial region modules
// ─────────────────────────────────────────────────────────────────────────────

interface RegionCardData { region: string; icon: string; headline: string; stat: string; statLabel: string; description: string; }

export function RegionCardsGrid({ regions }: { regions: RegionCardData[] }) {
  return (
    <motion.div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {regions.map((region) => (
        <motion.div key={region.region}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
          className="bg-(--nat-surface) p-8 md:p-10 transition-colors hover:bg-(--nat-elevated)"
        >
          <p className="nat-text-metadata mb-4" style={{ color: 'var(--nat-accent-earth)' }}>{region.region}</p>
          <h3 className="nat-text-heading text-white mb-4" style={{ fontSize: 'clamp(20px, 3vw, 32px)' }}>{region.headline}</h3>
          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-[clamp(32px,4vw,48px)] font-extralight tracking-tighter" style={{ color: 'var(--nat-accent-earth)' }}>{region.stat}</span>
            <span className="nat-text-metadata">{region.statLabel}</span>
          </div>
          <p className="nat-text-body text-sm">{region.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. NatureQuoteBreak — borderless full-width editorial quote
// ─────────────────────────────────────────────────────────────────────────────

export function NatureQuoteBreak({ quote, attribution, title }: {
  quote: string; attribution: string; title?: string;
}) {
  return (
    <motion.div
      className="py-24 md:py-32 px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2 }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="h-px w-16 bg-white/10 mx-auto mb-12" />
        <p className="nat-text-section italic leading-tight mb-10" style={{ fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-0.02em' }}>
          &ldquo;{quote}&rdquo;
        </p>
        <p className="nat-text-label" style={{ color: 'var(--nat-accent-earth)' }}>— {attribution}</p>
        {title && <p className="nat-text-metadata mt-2">{title}</p>}
        <div className="h-px w-16 bg-white/10 mx-auto mt-12" />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 13. NatureFactModule — borderless fact presentation
// ─────────────────────────────────────────────────────────────────────────────

export function NatureFactModule({ fact, detail, source, color = 'earth' }: {
  fact: string; detail: string; source: string; color?: 'earth' | 'forest' | 'glacier';
}) {
  const accentMap = { earth: 'var(--nat-accent-earth)', forest: 'var(--nat-accent-forest)', glacier: 'var(--nat-accent-glacier)' };
  const accent = accentMap[color];

  return (
    <motion.div
      className="py-8 border-b border-white/4 last:border-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="md:w-1/3">
          <div className="h-1 w-8 mb-4" style={{ background: accent }} />
          <h3 className="text-lg font-semibold text-white leading-snug">{fact}</h3>
        </div>
        <div className="md:w-2/3">
          <p className="nat-text-body mb-4">{detail}</p>
          <p className="nat-text-metadata">{source}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 14. NatureSubPageHero — single-image cinematic hero for sub-pages
// ─────────────────────────────────────────────────────────────────────────────

export function NatureSubPageHero({ imageSrc, imageAlt, label, children }: {
  imageSrc: string; imageAlt: string; label?: string; children: React.ReactNode;
}) {
  return (
    <section className="relative h-screen overflow-hidden bg-(--nat-void,#030504)">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 12, ease: "easeOut" }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.4] saturate-[0.7]"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </motion.div>

      {/* Cinematic vignettes */}
      <div className="absolute inset-0 z-10 nat-edge-fade" />
      <div className="absolute inset-0 z-10" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(3,5,4,0.7) 100%)'
      }} />

      {/* Film grain */}
      <div className="absolute inset-0 z-10 nat-noise pointer-events-none" />

      {/* Slide metadata label */}
      {label && (
        <p className="absolute bottom-8 right-8 z-20 nat-text-metadata">
          {label}
        </p>
      )}

      {/* Breathing scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <div className="h-8 w-px bg-white/20 nat-breathe" />
      </div>

      {/* Content overlay */}
      <div className="relative z-20 flex h-screen flex-col justify-end pb-24 pt-48">
        <div className="mx-auto max-w-[1440px] w-full px-6 md:px-12">{children}</div>
      </div>
    </section>
  );
}

