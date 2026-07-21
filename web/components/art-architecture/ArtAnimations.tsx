"use client";

// ─── Art & Architecture Animation Components ──────────────────────────────────
// Spatial Editorial visual engine for the Art & Architecture vertical.
//
// Design Language: "High-Contrast Editorial"
// - Hard borders, severe typography, stark B&W photography that bleeds into color
// - Inspired by: Artforum magazine, MoMA digital properties, architectural journals
// - Palette: Near-black void + Copper Gold + Crimson + Ivory
// - Motion: Precise, purposeful — no gimmick micro-animations
//
// Security:
// - No innerHTML/outerHTML usage
// - All text via React JSX text nodes (textContent equivalent)
// - No user input or sensitive data on this page

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValueEvent } from "framer-motion";
import { useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// 0. ArtStyles — High-Contrast Editorial Design System
// ─────────────────────────────────────────────────────────────────────────────

export function ArtStyles() {
  return (
    <style jsx global>{`
      :root {
        /* ── Surface hierarchy — near-black, not pure black ── */
        --art-void:     #080609;
        --art-surface:  #0e0b10;
        --art-elevated: #16121a;
        --art-border:   rgba(255,255,255,0.06);

        /* ── Accent system — editorial, not vibrant ── */
        --art-accent-copper:  #C4956A;
        --art-accent-crimson: #B22234;
        --art-accent-ivory:   #F0EBE1;
        --art-accent-slate:   #8A8490;
      }

      /* ── Typography — Spatial Editorial grade ── */

      .art-text-display {
        font-family: var(--font-archivo);
        font-size: clamp(80px, 15vw, 220px);
        font-weight: 200;
        line-height: 0.85;
        letter-spacing: -0.05em;
        text-transform: uppercase;
      }

      .art-text-hero {
        font-family: var(--font-archivo);
        font-size: clamp(50px, 9vw, 148px);
        font-weight: 900;
        line-height: 0.9;
        letter-spacing: -0.04em;
        text-transform: uppercase;
      }

      .art-text-section {
        font-family: var(--font-archivo);
        font-size: clamp(36px, 6vw, 96px);
        font-weight: 900;
        line-height: 0.9;
        letter-spacing: -0.03em;
        text-transform: uppercase;
      }

      .art-text-heading {
        font-family: var(--font-archivo);
        font-size: clamp(22px, 3.5vw, 48px);
        font-weight: 800;
        line-height: 1;
        letter-spacing: -0.02em;
        text-transform: uppercase;
      }

      .art-text-body {
        font-family: var(--font-body, 'Inter', system-ui, sans-serif);
        font-size: clamp(14px, 1.2vw, 17px);
        line-height: 1.8;
        letter-spacing: 0.02em;
        word-spacing: 0.04em;
        color: rgba(240,235,225,0.65);
      }

      .art-text-label {
        font-family: var(--font-hero);
        font-size: clamp(11px, 2vw, 14px);
        font-weight: 900;
        letter-spacing: clamp(0.12em, 1.5vw, 0.18em);
        text-transform: uppercase;
        color: rgba(240,235,225,0.85);
      }

      .art-text-metadata {
        font-family: var(--font-mono, 'Inter', monospace);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: rgba(240,235,225,0.5);
      }

      /* ── Utilities ── */

      .art-noise::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
        pointer-events: none;
        z-index: 1;
      }

      .art-glass {
        background: rgba(14, 11, 16, 0.65);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.05);
      }

      .art-edge-fade {
        background: linear-gradient(to bottom, #080609 0%, rgba(8,6,9,0) 18%, rgba(8,6,9,0) 82%, #080609 100%);
      }

      /* ── Gallery B&W → Color ── */
      .art-gallery-tile img {
        filter: grayscale(1) contrast(1.08);
        transition: filter 0.7s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .art-gallery-tile:hover img {
        filter: grayscale(0) contrast(1.02);
      }
      .art-gallery-tile .art-tile-overlay {
        background: linear-gradient(to top, rgba(8,6,9,0.95) 0%, rgba(8,6,9,0.5) 40%, rgba(8,6,9,0.1) 80%);
        transition: opacity 0.5s ease;
      }
      .art-gallery-tile:hover .art-tile-overlay {
        background: linear-gradient(to top, rgba(8,6,9,0.98) 0%, rgba(8,6,9,0.4) 50%, rgba(8,6,9,0) 100%);
      }

      /* ── Era Timeline horizontal track ── */
      .art-era-track {
        display: flex;
        gap: 0;
        width: max-content;
        /* Trailing pad so the track ALWAYS overflows the viewport, even on wide
           monitors. Without it, five 340px cards (~1700px) fit inside a 1920px
           screen, the measured overflow is 0, and the pinned horizontal scroll
           never translates — which read as "the scroll section is broken". The
           pad guarantees real travel on any screen width and lets the last card
           settle to centre instead of jamming against the right edge. */
        padding-right: 40vw;
      }

      .art-era-card {
        width: min(440px, 82vw);
        flex-shrink: 0;
        border-right: 1px solid rgba(255,255,255,0.06);
      }
      .art-era-card:last-child { border-right: none; }

      @keyframes art-shimmer-bar {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(400%); }
      }
      .art-shimmer-bar::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(196,149,106,0.35), transparent);
        animation: art-shimmer-bar 2.4s ease-in-out infinite;
      }
    `}</style>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. ArtHeroCrossfade — 5-slide crossfade with Ken-Burns zoom
// ─────────────────────────────────────────────────────────────────────────────

// Every URL here is a VERIFIED Wikimedia Commons file (queried via the API, then
// fetched to confirm HTTP 200). The previous set was five hallucinated paths that
// all 404'd — which is why the hero showed nothing. Do not hand-write these; if
// you change one, fetch it first and confirm it resolves.
const ART_HERO_SLIDES = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/92/EMPIRE_STATE_BUILDING%2C_NIGHT%2C_COLORFUL.jpg",
    alt: "Empire State Building at night, New York City",
    label: "EMPIRE STATE · NEW YORK CITY",
    badge: "1931 — ART DECO",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Brooklyn-side_tower_of_the_Brooklyn_Bridge_from_Brooklyn_Bridge_Park%2C_New_York_City.jpg/3840px-Brooklyn-side_tower_of_the_Brooklyn_Bridge_from_Brooklyn_Bridge_Park%2C_New_York_City.jpg",
    alt: "Brooklyn Bridge tower, New York City",
    label: "BROOKLYN BRIDGE · 1883",
    badge: "GOTHIC REVIVAL",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/de/Gateway_Arch%2C_St._Louis.jpg",
    alt: "Gateway Arch, St. Louis, Missouri",
    label: "GATEWAY ARCH · ST. LOUIS",
    badge: "1965 — MODERNIST",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/54/Exterior_and_Museum_Mile_View_from_Interior_Circular_Window_of_the_Solomon_R_Guggenheim_Museum.jpg",
    alt: "Solomon R. Guggenheim Museum, Frank Lloyd Wright, New York City",
    label: "GUGGENHEIM · NEW YORK CITY",
    badge: "1959 — F. L. WRIGHT",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/New_York_City_%28New_York%2C_USA%29%2C_One_World_Trade_Center_--_2012_--_6566.jpg/1920px-New_York_City_%28New_York%2C_USA%29%2C_One_World_Trade_Center_--_2012_--_6566.jpg",
    alt: "One World Trade Center, New York City",
    label: "ONE WORLD TRADE · NEW YORK",
    badge: "2013 — SUPERTALL",
  },
];

export function ArtHeroCrossfade({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % ART_HERO_SLIDES.length), 7500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden" style={{ background: 'var(--art-void)' }}>
      {ART_HERO_SLIDES.map((slide, i) => {
        const isPrev = i === (current - 1 + ART_HERO_SLIDES.length) % ART_HERO_SLIDES.length;
        const isNext = i === (current + 1) % ART_HERO_SLIDES.length;
        const isActive = i === current;
        if (!isActive && !isPrev && !isNext) return null;

        return (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              animate={isActive ? { scale: 1.06 } : { scale: 1 }}
              transition={{ duration: 7.5, ease: "linear" }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
                style={{ filter: 'brightness(0.38) saturate(0.55)' }}
                unoptimized
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Cinematic vignettes */}
      <div className="absolute inset-0 z-10 art-edge-fade" />
      <div className="absolute inset-0 z-10" style={{
        background: 'radial-gradient(ellipse at center, transparent 25%, rgba(8,6,9,0.75) 100%)'
      }} />
      <div className="absolute inset-0 z-10 art-noise pointer-events-none" />

      {/* Slide badge — top right */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute top-8 right-8 z-20 flex flex-col items-end gap-1"
          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.5 }}
        >
          <p className="art-text-metadata" style={{ color: 'var(--art-accent-copper)' }}>
            {ART_HERO_SLIDES[current].badge}
          </p>
          <p className="art-text-metadata">{ART_HERO_SLIDES[current].label}</p>
        </motion.div>
      </AnimatePresence>

      {/* Dot nav */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2">
        {ART_HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            id={`art-hero-dot-${i}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className="transition-all duration-300"
            style={{
              width: i === current ? '24px' : '6px',
              height: '2px',
              background: i === current ? 'var(--art-accent-copper)' : 'rgba(255,255,255,0.3)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Content overlay */}
      <div className="relative z-20 flex h-screen flex-col justify-end pb-16 pt-32 md:pb-24 md:pt-48">
        <div className="mx-auto max-w-[1440px] w-full px-6 md:px-12">{children}</div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ArtHeroTitle — Animated hero title reveal
// ─────────────────────────────────────────────────────────────────────────────

export function ArtHeroTitle({
  eyebrow, line1, line2, line2Color = "var(--art-accent-copper)", body, children
}: {
  eyebrow?: string;
  line1: string;
  line2: string;
  line2Color?: string;
  body?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
    >
      {eyebrow && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          className="art-text-label mb-3 md:mb-5"
          style={{ color: 'var(--art-accent-copper)' }}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h1
        variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.19, 1, 0.22, 1] } } }}
        className="art-text-hero"
      >
        <span className="block text-white">{line1}</span>
        <span className="block" style={{ color: line2Color }}>{line2}</span>
      </motion.h1>
      {body && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 } } }}
          className="art-text-body mt-4 md:mt-8 max-w-2xl"
        >
          {body}
        </motion.p>
      )}
      {children && (
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2 } } }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. ArtParallaxBand — scroll-linked full-width cinematic divider
// ─────────────────────────────────────────────────────────────────────────────

interface ArtParallaxBandProps {
  imageSrc: string;
  imageAlt: string;
  children?: React.ReactNode;
  height?: number;
  unoptimized?: boolean;
}

export function ArtParallaxBand({
  imageSrc, imageAlt, children, height = 550, unoptimized: unopt = false
}: ArtParallaxBandProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start end", "end start"] });

  // Use useMotionValueEvent → direct DOM ref update to avoid WAAPI entirely.
  // No motion.div with MotionValue style props — that triggers startWaapiAnimation.
  const yOffset = height * 0.14;
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (innerRef.current) {
      innerRef.current.style.transform = `translateY(${(v * 2 - 1) * yOffset}px)`;
    }
  });

  return (
    <div ref={outerRef} className="relative w-full overflow-hidden" style={{ height }}>
      <div
        ref={innerRef}
        className="absolute inset-[-14%]"
        style={{ willChange: 'transform', transform: `translateY(${-yOffset}px)` }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          style={{ filter: 'brightness(0.32) saturate(0.5)' }}
          sizes="100vw"
          unoptimized={unopt}
        />
      </div>
      <div className="absolute inset-0 art-edge-fade" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 20%, rgba(8,6,9,0.65) 100%)'
      }} />
      <div className="absolute inset-0 art-noise pointer-events-none" />
      {children && (
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">{children}</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. ArtCountUp — animated count-up number
// ─────────────────────────────────────────────────────────────────────────────

export function ArtCountUp({
  value, prefix = "", suffix = "", decimals = 0, color = "var(--art-accent-copper)"
}: {
  value: number; prefix?: string; suffix?: string; decimals?: number; color?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) {
          // Security: using textContent, not innerHTML
          ref.current.textContent = prefix + v.toFixed(decimals) + suffix;
        }
      },
    });
    return controls.stop;
  }, [inView, value, prefix, suffix, decimals, motionValue]);

  return (
    <span ref={ref} className="font-hero tabular-nums" style={{ color }}>
      {prefix}0{suffix}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. ArtStatWall — horizontal editorial stat strip
// ─────────────────────────────────────────────────────────────────────────────

interface ArtStatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  sub?: string;
  color?: string;
}

export function ArtStatWall({ stats }: { stats: ArtStatItem[] }) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-stretch justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
          className="flex flex-col items-center justify-center gap-3 py-10 px-8 md:px-12 text-center flex-1"
          style={{
            borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}
        >
          <p
            className="leading-none text-[clamp(38px,5vw,68px)] font-black tracking-tight uppercase whitespace-nowrap"
            style={{ color: stat.color ?? 'var(--art-accent-copper)', fontFamily: 'var(--font-archivo)' }}
          >
            <ArtCountUp
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
              color={stat.color ?? 'var(--art-accent-copper)'}
            />
          </p>
          <p className="art-text-label">{stat.label}</p>
          {stat.sub && <p className="art-text-metadata">{stat.sub}</p>}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. ArtGalleryGrid — B&W → Color curated gallery tiles
// ─────────────────────────────────────────────────────────────────────────────

interface GalleryTileData {
  href: string;
  imageSrc: string;
  imageAlt: string;
  era: string;
  title: string;
  description: string;
  span?: "wide" | "normal";
}

export function ArtGalleryGrid({ tiles }: { tiles: GalleryTileData[] }) {
  return (
    <motion.div
      className="grid gap-px"
      style={{
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridAutoRows: 'minmax(240px, auto)',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
    >
      {tiles.map((tile, i) => {
        // Layout: first tile is wide (col-span-7), second is normal (5)
        // Third and fourth split 6/6, fifth is wide (8) + small 4
        const colSpanMap: Record<number, string> = {
          0: 'col-span-12 md:col-span-7',
          1: 'col-span-12 md:col-span-5',
          2: 'col-span-12 md:col-span-5',
          3: 'col-span-12 md:col-span-7',
          4: 'col-span-12',
        };
        const colSpan = colSpanMap[i] ?? 'col-span-12 md:col-span-6';

        return (
          <motion.div
            key={tile.href}
            className={colSpan}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } } }}
          >
            <Link
              href={tile.href}
              className="art-gallery-tile group relative block w-full overflow-hidden"
              style={{ height: '100%', minHeight: '240px' }}
              id={`art-gallery-${tile.href.replace(/\//g, '-').slice(1)}`}
            >
              {/* Image — B&W by default via CSS class, color on hover */}
              <div className="absolute inset-0">
                <Image
                  src={tile.imageSrc}
                  alt={tile.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw,(max-width:1200px) 60vw,50vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
              </div>

              {/* Gradient overlay */}
              <div className="art-tile-overlay absolute inset-0" />

              {/* Top-right era badge */}
              <span className="absolute top-4 right-4 z-10 art-text-metadata" style={{ color: 'var(--art-accent-copper)' }}>
                {tile.era}
              </span>

              {/* Content — bottom */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                {/* Thin copper rule */}
                <div
                  className="mb-4 h-px w-0 group-hover:w-12 transition-all duration-500"
                  style={{ background: 'var(--art-accent-copper)' }}
                />
                <h3
                  className="art-text-heading text-white mb-2 transition-colors duration-300"
                  style={{ fontSize: 'clamp(18px, 2.4vw, 30px)' }}
                >
                  {tile.title}
                </h3>
                <p className="art-text-body text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-400 max-w-sm">
                  {tile.description}
                </p>
                <span
                  className="inline-flex items-center gap-2 mt-3 art-text-metadata opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ color: 'var(--art-accent-copper)' }}
                >
                  Explore →
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. ArtEraTimeline — Horizontal pinned-scroll era timeline
// ─────────────────────────────────────────────────────────────────────────────

interface EraData {
  era: string;
  years: string;
  movement: string;
  keywork: string;
  architect: string;
  description: string;
  color: string;
  icon: string;
}

export function ArtEraTimeline({ eras }: { eras: EraData[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Measure track overflow once mounted and on resize
  const [maxTranslate, setMaxTranslate] = useState(0);
  useEffect(() => {
    function measure() {
      if (trackRef.current && containerRef.current) {
        const overflow = trackRef.current.scrollWidth - containerRef.current.offsetWidth;
        setMaxTranslate(Math.max(0, overflow));
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Drive ALL scroll-linked DOM mutations via useMotionValueEvent → direct ref.style.
  // This completely bypasses Framer Motion's WAAPI path (startWaapiAnimation).
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-v * maxTranslate}px)`;
    }
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${v * 100}%`;
    }
  });

  const scrollHeight = `${Math.max(300, eras.length * 120)}vh`;

  return (
    <div ref={containerRef} style={{ height: scrollHeight, position: 'relative' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center" style={{ background: 'var(--art-void)' }}>
        {/* Header */}
        <div className="mx-auto max-w-[1440px] w-full px-6 md:px-12 mb-8 flex-shrink-0">
          <p className="art-text-label" style={{ color: 'var(--art-accent-copper)' }}>
            The Architecture of a Nation
          </p>
          <h2 className="art-text-section text-white mt-2" style={{ fontSize: 'clamp(28px, 4.5vw, 64px)' }}>
            Five Eras
          </h2>
          <p className="art-text-metadata mt-2">Scroll to travel through time →</p>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

        {/* Track — plain div, translated via direct DOM ref update */}
        <div className="overflow-hidden flex-1 flex items-center">
          <div
            ref={trackRef}
            className="art-era-track h-full"
            style={{ willChange: 'transform', transform: 'translateX(0px)' }}
          >
            {eras.map((era, i) => (
              <EraCard key={era.era} era={era} index={i} total={eras.length} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>

        {/* Progress bar — plain div updated via ref */}
        <div className="flex-shrink-0" style={{ height: '2px', background: 'rgba(255,255,255,0.04)' }}>
          <div
            ref={progressBarRef}
            style={{ height: '2px', width: '0%', background: 'var(--art-accent-copper)', willChange: 'width' }}
          />
        </div>
      </div>
    </div>
  );
}

function EraCard({
  era, index, total, scrollYProgress
}: {
  era: EraData;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const start = index / total;
  const end = (index + 1) / total;

  // Drive opacity + scale via direct DOM ref mutation (useMotionValueEvent).
  // Avoids motion.div with MotionValue style props → no WAAPI TypeError.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!cardRef.current) return;

    // Opacity: ramp 0.3→1 entering, hold at 1, ramp 1→0.3 leaving
    const opacityIn = start - 0.1;
    const opacityPeak = start + 0.05;
    const opacityFall = end - 0.05;
    const opacityOut = end + 0.1;
    let opacity: number;
    if (v <= opacityIn) opacity = 0.3;
    else if (v <= opacityPeak) opacity = 0.3 + ((v - opacityIn) / (opacityPeak - opacityIn)) * 0.7;
    else if (v <= opacityFall) opacity = 1;
    else if (v <= opacityOut) opacity = 1 - ((v - opacityFall) / (opacityOut - opacityFall)) * 0.7;
    else opacity = 0.3;

    // Scale: 0.96→1 entering, hold at 1, 1→0.96 leaving
    let scale: number;
    if (v <= start) scale = 0.96;
    else if (v <= start + 0.05) scale = 0.96 + ((v - start) / 0.05) * 0.04;
    else if (v <= end - 0.05) scale = 1;
    else if (v <= end) scale = 1 - ((v - (end - 0.05)) / 0.05) * 0.04;
    else scale = 0.96;

    cardRef.current.style.opacity = String(opacity);
    cardRef.current.style.transform = `scale(${scale})`;
  });

  return (
    <div
      ref={cardRef}
      className="art-era-card h-full flex flex-col justify-center px-10 py-12 relative"
      style={{ opacity: 0.3, transform: 'scale(0.96)', background: 'var(--art-void)', willChange: 'opacity, transform' }}
    >
      {/* Large ghost index number */}
      <p
        className="art-text-display mb-6 select-none"
        style={{
          fontSize: 'clamp(80px, 8vw, 140px)',
          color: era.color,
          opacity: 0.12,
          position: 'absolute',
          top: '1rem',
          right: '2rem',
          lineHeight: 1,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </p>

      <span style={{ fontSize: '2rem', marginBottom: '1rem' }}>{era.icon}</span>

      <p className="art-text-metadata mb-2" style={{ color: era.color }}>
        {era.years}
      </p>

      <h3
        className="text-white mb-4"
        style={{
          fontFamily: 'var(--font-archivo)',
          fontSize: 'clamp(20px, 2.2vw, 30px)',
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
        }}
      >
        {era.movement}
      </h3>

      <div style={{ height: '2px', width: '40px', background: era.color, marginBottom: '1.25rem' }} />

      <p className="art-text-body mb-6" style={{ fontSize: 'clamp(13px, 1.1vw, 15px)' }}>
        {era.description}
      </p>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
        <p className="art-text-metadata mb-1">Landmark Work</p>
        <p className="text-white text-sm font-semibold">{era.keywork}</p>
        <p className="art-text-metadata mt-1">{era.architect}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. ArtQuoteBreak — full-width editorial quote
// ─────────────────────────────────────────────────────────────────────────────

export function ArtQuoteBreak({
  quote, attribution, title
}: {
  quote: string; attribution: string; title?: string;
}) {
  return (
    <motion.div
      className="py-28 md:py-40 px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2 }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="h-px w-12 mx-auto mb-12" style={{ background: 'rgba(196,149,106,0.35)' }} />
        <p
          className="italic leading-[1.7] mb-16"
          style={{
            fontFamily: 'var(--font-archivo)',
            fontSize: 'clamp(22px, 3.5vw, 44px)',
            fontWeight: 400,
            letterSpacing: '0.03em',
            color: 'var(--art-accent-ivory)',
          }}
        >
          &ldquo;{quote}&rdquo;
        </p>
        <p className="art-text-label" style={{ color: 'var(--art-accent-copper)' }}>— {attribution}</p>
        {title && <p className="art-text-metadata mt-2">{title}</p>}
        <div className="h-px w-12 mx-auto mt-12" style={{ background: 'rgba(196,149,106,0.35)' }} />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. ArtFactModule — borderless editorial fact row
// ─────────────────────────────────────────────────────────────────────────────

export function ArtFactModule({
  fact, detail, source, color = 'copper'
}: {
  fact: string; detail: string; source: string; color?: 'copper' | 'crimson' | 'slate';
}) {
  const accentMap = {
    copper: 'var(--art-accent-copper)',
    crimson: 'var(--art-accent-crimson)',
    slate: 'var(--art-accent-slate)',
  };
  const accent = accentMap[color];

  return (
    <motion.div
      className="py-8"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="md:w-1/3">
          <div className="h-1 w-8 mb-4" style={{ background: accent }} />
          <h3 className="text-base font-semibold text-white leading-snug">{fact}</h3>
        </div>
        <div className="md:w-2/3">
          <p className="art-text-body mb-4">{detail}</p>
          <p className="art-text-metadata">{source}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. ArtSubPageCards — era sub-page navigation cards
// ─────────────────────────────────────────────────────────────────────────────

interface SubPageCard {
  href: string;
  title: string;
  description: string;
  badge: string;
  imageSrc: string;
  imageAlt: string;
}

export function ArtSubPageCards({ cards }: { cards: SubPageCard[] }) {
  return (
    <motion.div
      className="grid gap-px sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {cards.map((card) => (
        <motion.div
          key={card.href}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
        >
          <Link
            href={card.href}
            id={`art-subpage-${card.href.replace(/\//g, '-').slice(1)}`}
            className="group relative block h-72 md:h-80 overflow-hidden"
          >
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
              <Image
                src={card.imageSrc}
                alt={card.imageAlt}
                fill
                className="object-cover transition-all duration-700"
                style={{ filter: 'brightness(0.42) saturate(0.6)' }}
                sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,6,9,0.95)_0%,rgba(8,6,9,0)_55%)]" />
            <span className="absolute right-4 top-4 art-text-metadata" style={{ color: 'var(--art-accent-copper)' }}>
              {card.badge}
            </span>
            <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
              {/* Thin rule animated on hover */}
              <div
                className="mb-3 h-px w-0 group-hover:w-10 transition-all duration-500"
                style={{ background: 'var(--art-accent-copper)' }}
              />
              <h3 className="art-text-heading text-white mb-2 group-hover:text-[var(--art-accent-copper)] transition-colors duration-300" style={{ fontSize: 'clamp(16px, 2vw, 24px)' }}>
                {card.title}
              </h3>
              <p className="art-text-body text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {card.description}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
