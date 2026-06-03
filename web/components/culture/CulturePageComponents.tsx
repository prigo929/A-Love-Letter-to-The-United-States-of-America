"use client";
// ─────────────────────────────────────────────────────────────────────────────
// CulturePageComponents.tsx — Client components for /culture landing page
// "Life Magazine meets The Atlantic" — the warmest vertical on the site.
// ─────────────────────────────────────────────────────────────────────────────

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback, memo } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";
import { SITE_IMAGES } from "@/lib/site-images";
import {
  BRAND_LOGOS_ROW_1,
  BRAND_LOGOS_ROW_2,
  CULTURE_MEDIA_WALL_IMAGES,
} from "@/lib/data/culture-data";
import type {
  CultureStat,
  CultureThesis,
  CulturePillar,
  CultureSubpage,
  CultureArgument,
  CultureQuote,
  CultureRadarPoint,
  CultureDecade,
  SoftPowerBudgetLine,
  CultureMusicGenre,
  CultureCulinaryPillar,
  CultureOriginationItem,
  CultureEditorialImperialismData,
  CultureDigitalPipesData,
  CultureIconsSectionData,
  CultureHollywoodData,
  CultureManifestoData,
  CultureEnglishLanguageData,
} from "@/lib/data/culture-data";






// ─── Culture Palette Injection ───────────────────────────────────────────────

export function CultureStyles() {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');

      /* ── Core Palette ───────────────────────────────────────────── */
      .culture-bg { background-color: #0C0907; }
      .culture-cream-bg { background-color: #F5EDD8; }
      .culture-red { color: #E8391B; }
      .font-editorial { font-family: 'EB Garamond', 'Playfair Display', Georgia, serif; }

      /* ── Typography Utilities ────────────────────────────────────── */
      .culture-text-hero {
        font-family: 'Bebas Neue', Impact, sans-serif;
        font-size: clamp(56px, 9vw, 130px);
        font-weight: 400;
        letter-spacing: 0.04em;
        line-height: 0.92;
        text-transform: uppercase;
      }
      .culture-text-label {
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.4em;
        text-transform: uppercase;
        color: rgba(245, 237, 216, 0.45);
      }
      .culture-text-metadata {
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: rgba(245, 237, 216, 0.55);
      }

      /* ── Dot Grid Canvas ────────────────────────────────────────── */
      .culture-dot-canvas {
        background-image: radial-gradient(rgba(255,215,0,0.06) 1px, transparent 1px);
        background-size: 24px 24px;
      }

      /* ── Glassmorphism ──────────────────────────────────────────── */
      .culture-glass {
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.06);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }

      /* ── Gradient Border ────────────────────────────────────────── */
      .culture-gradient-border {
        position: relative;
      }
      .culture-gradient-border::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 1px;
        background: linear-gradient(135deg, rgba(255,215,0,0) 0%, rgba(255,215,0,0.12) 50%, rgba(255,215,0,0) 100%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0;
        transition: opacity 0.5s ease;
        pointer-events: none;
      }
      .culture-gradient-border:hover::before {
        opacity: 1;
      }

      /* ── Marquee Animations ─────────────────────────────────────── */
      @keyframes marquee-left {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-50%, 0, 0); }
      }
      @keyframes marquee-right {
        0% { transform: translate3d(-50%, 0, 0); }
        100% { transform: translate3d(0, 0, 0); }
      }
      .animate-marquee-left {
        animation: marquee-left 50s linear infinite;
        will-change: transform;
      }
      .animate-marquee-right {
        animation: marquee-right 50s linear infinite;
        will-change: transform;
      }

      /* ── Entry Animations ───────────────────────────────────────── */
      @keyframes fadeInUp {
        from { opacity: 0; transform: translate3d(0, 24px, 0); }
        to { opacity: 1; transform: translate3d(0, 0, 0); }
      }
      .animate-fade-in-up {
        animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      /* ── Gold Shimmer Accent ────────────────────────────────────── */
      @keyframes goldShimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .culture-gold-shimmer {
        background: linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.08) 50%, transparent 100%);
        background-size: 200% 100%;
        animation: goldShimmer 6s ease-in-out infinite;
      }

      /* ── Film Grain Scanline ────────────────────────────────────── */
      .culture-scanline {
        background: repeating-linear-gradient(
          to bottom,
          transparent,
          transparent 2px,
          rgba(0,0,0,0.03) 2px,
          rgba(0,0,0,0.03) 4px
        );
        pointer-events: none;
      }

      /* ── Section Transition Fade ────────────────────────────────── */
      .culture-section-fade-top {
        background: linear-gradient(to bottom, #0C0907 0%, transparent 100%);
      }
      .culture-section-fade-bottom {
        background: linear-gradient(to top, #0C0907 0%, transparent 100%);
      }
      .gradient-dark-to-cream {
        background: linear-gradient(to bottom, #0C0907, #F5EDD8);
      }
      .gradient-cream-to-dark {
        background: linear-gradient(to bottom, #F5EDD8, #0C0907);
      }
    `}</style>
  );
}

// ─── Vox Aesthetic Utilities ──────────────────────────────────────────────────

export function TextHighlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block px-1">
      <motion.span
        className="absolute bottom-[2px] left-0 right-0 h-[38%] bg-glory-gold/25 -z-10 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}

export function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-85px" });

  let prefix = "";
  let num = 0;
  let suffix = "";
  let decimals = 0;

  // 1. Check for "X of Y" or "X din Y"
  const ofMatch = value.match(/^(\d+)(\s+(?:of|din)\s+\d+)$/i);
  if (ofMatch) {
    num = parseFloat(ofMatch[1]);
    suffix = ofMatch[2];
  } else {
    // 2. Normalize Romanian decimal separator
    const cleanVal = value.replace(",", ".");
    const genericMatch = cleanVal.match(/^([$€]?)([\d.]+)(%?[\s\w+]*)$/);
    if (genericMatch) {
      prefix = genericMatch[1];
      num = parseFloat(genericMatch[2]);
      suffix = genericMatch[3];
      if (genericMatch[2].includes(".")) {
        decimals = genericMatch[2].split(".")[1].length;
      }
    } else {
      return <span>{value}</span>;
    }
  }

  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, num, {
        duration: 2.0,
        ease: [0.25, 0.1, 0.25, 1],
      });
      return () => controls.stop();
    }
  }, [inView, num, motionValue]);

  const displayValue = useTransform(motionValue, (latest) => {
    let formattedNum = latest.toFixed(decimals);
    if (value.includes(",")) {
      formattedNum = formattedNum.replace(".", ",");
    }
    return `${prefix}${formattedNum}${suffix}`;
  });

  const spanRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    return displayValue.on("change", (latest) => {
      if (spanRef.current) {
        spanRef.current.textContent = latest;
      }
    });
  }, [displayValue]);

  return (
    <span ref={ref} className="inline-block">
      <span ref={spanRef}>{prefix}0{suffix}</span>
    </span>
  );
}

export function parseTextWithHighlights(text: string) {
  const parts = text.split(/(\[hl\].*?\[\/hl\])/g);
  return parts.map((part, idx) => {
    if (part.startsWith("[hl]") && part.endsWith("[/hl]")) {
      const cleanText = part.slice(4, -5);
      return <TextHighlight key={idx}>{cleanText}</TextHighlight>;
    }
    return part;
  });
}


// ─── §1 — Filmstrip Mosaic Hero ──────────────────────────────────────────────

const FILMSTRIP_IMAGES = [
  { src: SITE_IMAGES.culture.jazzClub, alt: "Live jazz club performance" },
  { src: SITE_IMAGES.culture.nflStadium, alt: "NFL stadium at night with American flag" },
  { src: SITE_IMAGES.culture.hollywoodSign, alt: "Hollywood sign at sunset" },
  { src: SITE_IMAGES.culture.burger, alt: "Classic American burger" },
  { src: SITE_IMAGES.culture.concertCrowd, alt: "Concert crowd with stage lights" },
  { src: SITE_IMAGES.culture.disneyWorld, alt: "Cinderella Castle at Disney World" },
  { src: SITE_IMAGES.culture.timesSquare, alt: "Times Square on a rainy night" },
  { src: SITE_IMAGES.culture.route66, alt: "Route 66 painted on desert highway" },
];

interface CultureFilmstripHeroProps {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  deck: string;
}

export function CultureFilmstripHero({
  eyebrow,
  titleLine1,
  titleLine2,
  deck,
}: CultureFilmstripHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Each image parallaxes at a slightly different speed for depth
  const y0 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const y6 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y7 = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const yOffsets = [y0, y1, y2, y3, y4, y5, y6, y7];

  return (
    <section
      ref={containerRef}
      id="culture-hero"
      className="relative min-h-[100dvh] w-full overflow-hidden culture-bg"
    >
      {/* Filmstrip mosaic grid — staggered entrance */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-0">
        {FILMSTRIP_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden"
            style={{ y: yOffsets[i] }}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={{
              duration: 1.4,
              delay: 0.1 + i * 0.12,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
              priority={i < 4}
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
          </motion.div>
        ))}
      </div>

      {/* Deep cinematic gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,9,7,0.15) 0%, rgba(12,9,7,0.25) 20%, rgba(12,9,7,0.7) 50%, rgba(12,9,7,0.95) 75%, #0C0907 100%)",
        }}
      />

      {/* Radial vignette for cinematic depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(12,9,7,0.6) 100%)",
        }}
      />

      {/* Film grain texture overlay */}
      <div className="absolute inset-0 bg-opening-noise opacity-25 pointer-events-none" />

      {/* Dot-grid texture overlay */}
      <div className="absolute inset-0 culture-dot-canvas opacity-40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end min-h-[100dvh] px-6 sm:px-8 lg:px-16 pb-20 md:pb-32">
        {/* Eyebrow */}
        <motion.p
          className="culture-text-label text-glory-gold/80 mb-6"
          style={{ letterSpacing: "0.35em" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          {eyebrow}
        </motion.p>

        {/* Main Title — monumental */}
        <motion.h1
          className="culture-text-hero text-white mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="block">{titleLine1}</span>
          <span className="block text-white/20">{titleLine2}</span>
        </motion.h1>

        {/* Gold accent divider */}
        <motion.div
          className="w-20 h-px bg-gradient-to-r from-glory-gold to-glory-gold/0 mb-8"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] as const }}
          style={{ transformOrigin: "left" }}
        />

        {/* Deck */}
        <motion.p
          className="font-editorial text-[#F5EDD8]/70 italic text-lg sm:text-xl lg:text-2xl max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          {deck}
        </motion.p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1.2 VideoCultureHero — cinematic looping video hero (Times Square)
// ─────────────────────────────────────────────────────────────────────────────

export interface VideoCultureHeroProps {
  videoSrc: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  deck: string;
}

export function VideoCultureHero({
  videoSrc,
  eyebrow,
  titleLine1,
  titleLine2,
  deck,
}: VideoCultureHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch((err) => {
        console.warn("Autoplay block in VideoCultureHero:", err);
      });
    }
  }, [videoSrc]);

  const videoOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const videoScale  = useTransform(scrollYProgress, [0, 0.55], [1.0, 1.18]);
  const videoY      = useTransform(scrollYProgress, [0, 1],    ["0%", "22%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  return (
    <div ref={containerRef} className="relative h-[180dvh] culture-bg">
      <div className="sticky top-0 h-screen w-full overflow-hidden culture-bg">
        {/* Looping video layer */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ opacity: videoOpacity, scale: videoScale, y: videoY }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover brightness-[0.4] saturate-[0.8]"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </motion.div>

        {/* Dark gradient overlay — bottom 60% and top vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(12,9,7,0.1) 0%, rgba(12,9,7,0.3) 30%, rgba(12,9,7,0.85) 60%, rgba(12,9,7,0.98) 80%, #0C0907 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(12,9,7,0.7) 100%)" }}
        />

        {/* Film grain texture overlay */}
        <div className="absolute inset-0 bg-opening-noise opacity-30 pointer-events-none" />

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
          className="relative z-10 flex h-full flex-col justify-end px-6 sm:px-8 lg:px-16 pb-12 pt-20"
          style={{ opacity: textOpacity, y: textY }}
        >
          {/* Eyebrow */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            className="font-body text-[11px] sm:text-xs uppercase tracking-[0.3em] text-glory-gold mb-4 md:mb-5 font-semibold"
          >
            {eyebrow}
          </motion.p>

          {/* Main Title */}
          <div className="overflow-hidden py-2">
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.19, 1, 0.22, 1] } } }}
              className="font-hero text-white leading-[0.9] mb-4 md:mb-6"
              style={{ fontSize: "clamp(48px, 10vw, 140px)", letterSpacing: "0.02em" }}
            >
              <span className="block">{titleLine1}</span>
              <span className="block text-glory-gold">{titleLine2}</span>
            </motion.h1>
          </div>

          {/* Deck */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            className="font-editorial text-[#F5EDD8]/80 italic text-lg sm:text-xl lg:text-2xl max-w-3xl leading-relaxed"
          >
            {deck}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── §2 — Numbers Strip ──────────────────────────────────────────────────────

interface CultureNumbersStripProps {
  stats: CultureStat[];
}

export function CultureNumbersStrip({ stats }: CultureNumbersStripProps) {
  return (
    <section id="culture-stats" className="culture-bg">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-2 md:grid-cols-5 border-b border-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="relative border-r border-white/5 last:border-r-0 p-8 md:p-12 flex flex-col group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
            >
              {/* Hover gold accent top line */}
              <div className="absolute top-0 left-0 w-0 h-px bg-glory-gold/60 group-hover:w-full transition-all duration-700" />
              <p className="text-[clamp(28px,4vw,52px)] font-extralight tracking-tighter text-white mb-4 leading-none tabular-nums">
                <AnimatedNumber value={stat.value} />
              </p>
              <div className="h-px w-8 bg-white/10 mb-4" />
              <p className="culture-text-label text-[10px] leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── §3 — Thesis Block ───────────────────────────────────────────────────────

interface CultureThesisBlockProps {
  thesis: CultureThesis;
}

export function CultureThesisBlock({ thesis }: CultureThesisBlockProps) {
  return (
    <section id="culture-thesis" className="relative culture-bg py-24 md:py-36 overflow-hidden">
      {/* Dot-grid background texture */}
      <div className="absolute inset-0 culture-dot-canvas opacity-25 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[800px] px-6 sm:px-8 flex flex-col items-center">
        {/* Pull Quote */}
        <motion.blockquote
          className="relative text-center mb-24 w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          {/* Decorative opening quote */}
          <span
            className="block font-editorial text-glory-gold/15 text-[140px] leading-none select-none -mb-14"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          {/* Gold rule above */}
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-glory-gold to-transparent mx-auto mb-10" />

          <p className="font-editorial italic text-[#F5EDD8] text-2xl sm:text-3xl lg:text-[2.6rem] leading-[1.5] mb-8">
            &ldquo;{parseTextWithHighlights(thesis.pullQuote)}&rdquo;
          </p>

          {/* Gold rule below */}
          <div className="w-12 h-px bg-glory-gold/40 mx-auto mb-6" />

          <cite className="not-italic culture-text-metadata text-glory-gold/80 tracking-[0.25em] text-[11px]">
            — {thesis.attribution}
          </cite>
        </motion.blockquote>

        {/* Narrative Flow: Connecting gold line */}
        <div className="w-px h-16 bg-gradient-to-b from-glory-gold/30 to-transparent mb-16" />

        {/* Editorial paragraphs in a staggered vertical flow */}
        <div className="w-full flex flex-col gap-20">
          {thesis.paragraphs.map((p, i) => (
            <motion.div
              key={i}
              className="relative pl-12 md:pl-16 border-l border-white/5 hover:border-glory-gold/30 transition-colors duration-500"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1] as const,
                delay: i * 0.1,
              }}
            >
              {/* Large floating serif number */}
              <span className="absolute left-0 top-0 font-editorial italic text-glory-gold/20 text-3xl md:text-4xl select-none leading-none -translate-x-1/2 bg-[#0C0907] py-1">
                0{i + 1}
              </span>

              <p className="font-editorial text-[#F5EDD8]/75 text-lg sm:text-xl md:text-2xl leading-[1.8] max-w-[680px]">
                {parseTextWithHighlights(p)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── §4 — Soft Power Pillars ─────────────────────────────────────────────────

const PILLAR_GLOW_SCHEMES = [
  { // Film & TV
    color: "from-red-500/15 to-transparent",
    border: "hover:border-red-500/30",
    lineBg: "bg-red-500/50"
  },
  { // Sports
    color: "from-emerald-500/15 to-transparent",
    border: "hover:border-emerald-500/30",
    lineBg: "bg-emerald-500/50"
  },
  { // Food & Drinks
    color: "from-amber-500/15 to-transparent",
    border: "hover:border-amber-500/30",
    lineBg: "bg-amber-500/50"
  },
  { // Music
    color: "from-purple-500/15 to-transparent",
    border: "hover:border-purple-500/30",
    lineBg: "bg-purple-500/50"
  },
  { // Fashion
    color: "from-pink-500/15 to-transparent",
    border: "hover:border-pink-500/30",
    lineBg: "bg-pink-500/50"
  },
  { // English
    color: "from-blue-500/15 to-transparent",
    border: "hover:border-blue-500/30",
    lineBg: "bg-blue-500/50"
  },
  { // Brands
    color: "from-yellow-500/15 to-transparent",
    border: "hover:border-yellow-500/30",
    lineBg: "bg-glory-gold/50"
  },
  { // Entertainment
    color: "from-indigo-500/15 to-transparent",
    border: "hover:border-indigo-500/30",
    lineBg: "bg-indigo-500/50"
  }
];

interface CulturePillarsStripProps {
  pillars: CulturePillar[];
}

export function CulturePillarsStrip({ pillars }: CulturePillarsStripProps) {
  return (
    <section id="culture-pillars" className="relative culture-bg py-32 md:py-48 overflow-hidden">
      {/* Dot-grid background */}
      <div className="absolute inset-0 culture-dot-canvas opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section header — monumental typography */}
        <div className="mb-24 text-center">
          <span className="culture-text-label text-glory-gold/70 block mb-6" style={{ letterSpacing: "0.5em" }}>
            THE SOFT POWER ARSENAL
          </span>
          <h2 className="culture-text-hero text-white">
            <span className="block">DIMENSIONS OF</span>
            <span className="block text-white/20">GLOBAL INFLUENCE</span>
          </h2>
        </div>

        {/* Cinematic Bento-style pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, i) => {
            const scheme = PILLAR_GLOW_SCHEMES[i % PILLAR_GLOW_SCHEMES.length];

            return (
              <div
                key={i}
                className={cn(
                  "relative overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.015] p-6 md:p-8 flex flex-col justify-between group transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.03] min-h-[240px] opacity-0 animate-fade-in-up culture-gradient-border",
                  scheme.border
                )}
                style={{
                  animationDelay: `${i * 80}ms`,
                }}
              >
                {/* Dot-grid texture inside card */}
                <div className="absolute inset-0 culture-dot-canvas opacity-15 pointer-events-none rounded-xl" />

                {/* Glowing pools at top right */}
                <div className={cn("absolute -right-16 -top-16 w-36 h-36 rounded-full bg-gradient-to-br filter blur-3xl opacity-0 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none", scheme.color)} />
                
                {/* Top Row: Domain name + Emoji Container */}
                <div className="flex items-center justify-between w-full mb-8 relative z-10">
                  <span className="culture-text-label text-[10px] group-hover:text-[#F5EDD8]/70 transition-colors duration-300">
                    {pillar.domain}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 select-none">
                    {pillar.emoji}
                  </div>
                </div>

                {/* Bottom content: Huge metric + Label */}
                <div className="flex flex-col items-start mt-auto relative z-10">
                  <span className="text-[clamp(32px,4vw,48px)] font-extralight tracking-tighter text-[#F5EDD8] group-hover:text-white transition-colors duration-300 leading-none">
                    {pillar.stat}
                  </span>
                  <div className="h-px w-8 bg-white/10 mt-3 mb-2 group-hover:w-12 group-hover:bg-glory-gold/30 transition-all duration-500" />
                  <span className="culture-text-label text-[10px] group-hover:text-[#F5EDD8]/60 transition-colors duration-300 leading-relaxed">
                    {pillar.statLabel}
                  </span>
                </div>

                {/* Expanding bottom accent line */}
                <div className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] transition-all duration-500 group-hover:w-full", scheme.lineBg)} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── §5 — Editorial Bento Grid ───────────────────────────────────────────────

/** Map subpage IDs to actual images */
const BENTO_IMAGES: Record<string, string> = {
  overview: SITE_IMAGES.culture.timesSquare,
  film: SITE_IMAGES.culture.hollywoodSign,
  sports: SITE_IMAGES.culture.nflStadium,
  entertainment: SITE_IMAGES.culture.disneyWorld,
  brands: SITE_IMAGES.culture.melsDriveIn,
  food: SITE_IMAGES.culture.burger,
  fashion: SITE_IMAGES.culture.classicCar,
  music: SITE_IMAGES.culture.jazzClub,
};

interface CultureBentoGridProps {
  subpages: CultureSubpage[];
  sectionTitle: string;
}

export function CultureBentoGrid({ subpages, sectionTitle }: CultureBentoGridProps) {
  // Split into rows: Row1 = overview(L) + film(S) + sports(S), Row2 = entertainment(M) + brands(M) + food(M), Row3 = fashion(S) + music(L) — but we keep it flexible via IDs
  const overview = subpages.find((s) => s.id === "overview")!;
  const film = subpages.find((s) => s.id === "film")!;
  const sports = subpages.find((s) => s.id === "sports")!;
  const entertainment = subpages.find((s) => s.id === "entertainment")!;
  const brands = subpages.find((s) => s.id === "brands")!;
  const food = subpages.find((s) => s.id === "food")!;
  const fashion = subpages.find((s) => s.id === "fashion")!;
  const music = subpages.find((s) => s.id === "music")!;

  return (
    <section id="culture-grid" className="culture-bg pt-16 md:pt-24 pb-8 md:pb-12">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section title */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <p className="font-body text-[11px] uppercase tracking-[0.3em] text-glory-gold mb-3 font-semibold">
            ★ {sectionTitle} ★
          </p>
        </motion.div>

        {/* Desktop bento — hidden on mobile */}
        <div className="hidden md:grid gap-4">
          {/* Row 1: Large (60%) + Two stacked (40%) */}
          <div className="grid grid-cols-5 gap-4" style={{ minHeight: "420px" }}>
            <div className="col-span-3">
              <BentoCard card={overview} />
            </div>
            <div className="col-span-2 grid grid-rows-2 gap-4">
              <BentoCard card={film} />
              <BentoCard card={sports} />
            </div>
          </div>

          {/* Row 2: Three equal */}
          <div className="grid grid-cols-3 gap-4" style={{ minHeight: "320px" }}>
            <BentoCard card={entertainment} />
            <BentoCard card={brands} />
            <BentoCard card={food} />
          </div>

          {/* Row 3: Two stacked (40%) + Large (60%) */}
          <div className="grid grid-cols-5 gap-4" style={{ minHeight: "420px" }}>
            <div className="col-span-2 grid grid-rows-2 gap-4">
              <BentoCard card={fashion} />
              <BentoCard card={food} isAlt />
            </div>
            <div className="col-span-3">
              <BentoCard card={music} />
            </div>
          </div>
        </div>

        {/* Mobile carousel — swipe left/right */}
        <div className="md:hidden overflow-x-auto no-scrollbar -mx-6 px-6">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            {subpages.map((card) => (
              <div key={card.id} className="w-[280px] h-[360px] shrink-0">
                <BentoCard card={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BentoCard({ card, isAlt }: { card: CultureSubpage; isAlt?: boolean }) {
  const imgSrc = isAlt ? SITE_IMAGES.culture.burgerFries : (BENTO_IMAGES[card.id] || SITE_IMAGES.culture.timesSquare);
  const isExternal = card.href !== "#";

  const inner = (
    <div className="group relative w-full h-full overflow-hidden rounded-xl cursor-pointer">
      {/* Background image */}
      <Image
        src={imgSrc}
        alt={card.title}
        fill
        className="object-cover transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] grayscale group-hover:grayscale-0 group-hover:scale-105"
        sizes="(max-width: 768px) 280px, 40vw"
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
      />

      {/* Deep vignette */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,9,7,0.1) 0%, rgba(12,9,7,0.45) 40%, rgba(12,9,7,0.92) 100%)",
        }}
      />

      {/* Inner shadow for depth */}
      <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_60px_rgba(0,0,0,0.4)] pointer-events-none" />

      {/* Light sweep shine on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)",
        }}
      />

      {/* Hover gold border */}
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-glory-gold/40 transition-colors duration-500 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 z-10">
        {/* Top — category label */}
        <p className="culture-text-label text-glory-gold/80 text-[10px]" style={{ letterSpacing: "0.3em" }}>
          {isAlt ? card.category.replace("Food", "Kitchen") : card.category}
        </p>

        {/* Bottom — title + stat */}
        <div className="flex flex-col justify-end">
          <h3 className="font-hero text-white text-xl sm:text-2xl lg:text-3xl leading-tight mb-2">
            {isAlt ? "The American Kitchen" : card.title}
          </h3>
          
          {card.description && (
            <p className="font-editorial text-[#F5EDD8]/70 text-xs sm:text-sm leading-relaxed mb-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 max-h-0 group-hover:max-h-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
              {isAlt ? "From diners and Southern BBQ to global fast food, American culinary exports represent optimized consistency and convenience." : card.description}
            </p>
          )}

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extralight tracking-tight text-white tabular-nums">
              {card.stat}
            </span>
            <span className="culture-text-label text-[9px] text-[#F5EDD8]/40">
              {card.statLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isExternal) {
    return <Link href={card.href} className="block w-full h-full">{inner}</Link>;
  }
  return <div className="w-full h-full">{inner}</div>;
}

// ─── §6 — Free Market Argument Strip (Cream Section) ─────────────────────────

interface CultureFreeMarketStripProps {
  arguments_: CultureArgument[];
  sectionTitle: string;
}

export function CultureFreeMarketStrip({ arguments_, sectionTitle }: CultureFreeMarketStripProps) {
  return (
    <section id="culture-argument" className="relative culture-cream-bg py-28 md:py-40 overflow-hidden">
      {/* Parchment texture overlay */}
      <div className="absolute inset-0 bg-parchment-texture pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section label */}
        <motion.p
          className="font-body text-[11px] uppercase tracking-[0.4em] text-[#0C0907]/35 mb-16 font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          {sectionTitle}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {arguments_.map((arg, i) => (
            <motion.div
              key={i}
              className="border-l-2 border-[#C9A84C]/25 pl-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
            >
              <h3 className="font-body text-[#0C0907] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                {arg.title}
              </h3>
              <p className="font-editorial text-[#0C0907]/65 text-base leading-[1.75]">
                {parseTextWithHighlights(arg.body)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── §7 — Radar Chart Teaser ─────────────────────────────────────────────────

interface CultureRadarTeaserProps {
  data: CultureRadarPoint[];
  headline: string;
  ctaLabel: string;
  ctaHref: string;
}

export function CultureRadarTeaser({ data, headline, ctaLabel, ctaHref }: CultureRadarTeaserProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const inView = useInView(chartRef, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView) {
      setHasAnimated(true);
    }
  }, [inView]);

  const animatedData = hasAnimated
    ? data
    : data.map((d) => ({
        ...d,
        USA: 0,
        UK: 0,
        France: 0,
        Japan: 0,
      }));

  return (
    <section id="culture-radar" className="relative culture-bg py-24 md:py-32 overflow-hidden">
      {/* Dot-grid background */}
      <div className="absolute inset-0 culture-dot-canvas opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8">
        <motion.h2
          className="font-editorial italic text-[#F5EDD8] text-2xl sm:text-3xl text-center mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          {headline}
        </motion.h2>

        <motion.div
          ref={chartRef}
          className="w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <ResponsiveContainer width="100%" height={420}>
            <RadarChart data={animatedData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis
                dataKey="domain"
                tick={{ fill: "#F5EDD8", fontSize: 11, fontFamily: "Inter" }}
                tickLine={false}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <Radar
                name="USA"
                dataKey="USA"
                stroke="#FFD700"
                fill="#FFD700"
                fillOpacity={0.2}
                strokeWidth={2.5}
                isAnimationActive={true}
                animationDuration={1500}
              />
              <Radar
                name="UK"
                dataKey="UK"
                stroke="rgba(148,163,184,0.4)"
                fill="rgba(148,163,184,0.06)"
                strokeWidth={1}
                isAnimationActive={true}
                animationDuration={1500}
              />
              <Radar
                name="France"
                dataKey="France"
                stroke="rgba(148,163,184,0.35)"
                fill="rgba(148,163,184,0.04)"
                strokeWidth={1}
                isAnimationActive={true}
                animationDuration={1500}
              />
              <Radar
                name="Japan"
                dataKey="Japan"
                stroke="rgba(148,163,184,0.3)"
                fill="rgba(148,163,184,0.03)"
                strokeWidth={1}
                isAnimationActive={true}
                animationDuration={1500}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: "24px",
                  fontSize: "11px",
                  fontFamily: "Inter",
                  color: "#F5EDD8",
                  letterSpacing: "0.05em",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <Link
            href={ctaHref}
            className="culture-text-metadata text-glory-gold/80 hover:text-glory-gold text-[11px] tracking-[0.2em] transition-colors"
          >
            {ctaLabel} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── §8 — Quote Carousel ────────────────────────────────────────────────────

interface CultureQuoteCarouselProps {
  quotes: CultureQuote[];
}

export function CultureQuoteCarousel({ quotes }: CultureQuoteCarouselProps) {
  const [active, setActive] = useState(0);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % quotes.length);
  }, [quotes.length]);

  useEffect(() => {
    const timer = setInterval(advance, 7000);
    return () => clearInterval(timer);
  }, [advance]);

  return (
    <section id="culture-quotes" className="relative culture-bg py-28 md:py-36 overflow-hidden">
      {/* Dot-grid background */}
      <div className="absolute inset-0 culture-dot-canvas opacity-15 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-8 text-center">
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              {/* Decorative quotation mark */}
              <span
                className="font-editorial text-glory-gold/10 text-[80px] leading-none select-none -mb-6"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Gold gradient bar */}
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-glory-gold to-transparent mb-8" />

              <p className="font-editorial italic text-[#F5EDD8] text-xl sm:text-2xl lg:text-3xl leading-[1.6] mb-8 max-w-2xl">
                &ldquo;{quotes[active].text}&rdquo;
              </p>

              <footer>
                <cite className="not-italic culture-text-metadata text-glory-gold/80 tracking-[0.2em] text-[11px] block mb-1">
                  — {quotes[active].author}
                </cite>
                <span className="culture-text-label text-[10px] text-[#F5EDD8]/35">
                  {quotes[active].role}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Dot indicators with smoother active state */}
        <div className="flex items-center justify-center gap-2.5 mt-10">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Quote ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                i === active
                  ? "bg-glory-gold w-8"
                  : "bg-white/15 hover:bg-white/30 w-1.5",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── §10 — Parallax Divider Band ─────────────────────────────────────────────

interface CultureParallaxDividerProps {
  imageSrc: string;
  alt?: string;
  heightClassName?: string;
}

export function CultureParallaxDivider({
  imageSrc,
  alt = "American culture scene",
  heightClassName = "h-[50vh]",
}: CultureParallaxDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden w-full", heightClassName)}
    >
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover brightness-[0.65] contrast-[1.05]"
          priority={false}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0907] via-transparent to-[#0C0907] pointer-events-none" />
    </div>
  );
}


// ─── §12 — Brand Logos Marquee ───────────────────────────────────────────────

export function CultureBrandLogosMarquee() {
  return (
    <section className="culture-bg pt-8 md:pt-12 pb-16 md:pb-24 overflow-hidden flex flex-col gap-24 md:gap-32">
      {/* Row 1 (Scrolling Left) */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee-left whitespace-nowrap">
          {/* Track 1 */}
          <div className="flex items-center gap-16 pr-16 flex-shrink-0">
            {BRAND_LOGOS_ROW_1.map((logo) => (
              <div
                key={`${logo.name}-row1-track1`}
                className="inline-flex items-center justify-center h-12 md:h-16 px-6 md:px-10 flex-shrink-0"
              >
                <img
                  src={`/assets/companies/${logo.file}`}
                  alt={logo.name}
                  className={cn(
                    "h-8 md:h-12 w-auto object-contain grayscale opacity-75 hover:opacity-100 hover:grayscale-0 transition-all duration-300 pointer-events-none select-none",
                    logo.invert && "invert brightness-200"
                  )}
                  loading="eager"
                />
              </div>
            ))}
          </div>
          {/* Track 2 */}
          <div className="flex items-center gap-16 pr-16 flex-shrink-0" aria-hidden="true">
            {BRAND_LOGOS_ROW_1.map((logo) => (
              <div
                key={`${logo.name}-row1-track2`}
                className="inline-flex items-center justify-center h-12 md:h-16 px-6 md:px-10 flex-shrink-0"
              >
                <img
                  src={`/assets/companies/${logo.file}`}
                  alt={logo.name}
                  className={cn(
                    "h-8 md:h-12 w-auto object-contain grayscale opacity-75 hover:opacity-100 hover:grayscale-0 transition-all duration-300 pointer-events-none select-none",
                    logo.invert && "invert brightness-200"
                  )}
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 (Scrolling Right) */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee-right whitespace-nowrap">
          {/* Track 1 */}
          <div className="flex items-center gap-16 pr-16 flex-shrink-0">
            {BRAND_LOGOS_ROW_2.map((logo) => (
              <div
                key={`${logo.name}-row2-track1`}
                className="inline-flex items-center justify-center h-12 md:h-16 px-6 md:px-10 flex-shrink-0"
              >
                <img
                  src={`/assets/companies/${logo.file}`}
                  alt={logo.name}
                  className={cn(
                    "h-8 md:h-12 w-auto object-contain grayscale opacity-75 hover:opacity-100 hover:grayscale-0 transition-all duration-300 pointer-events-none select-none",
                    logo.invert && "invert brightness-200"
                  )}
                  loading="eager"
                />
              </div>
            ))}
          </div>
          {/* Track 2 */}
          <div className="flex items-center gap-16 pr-16 flex-shrink-0" aria-hidden="true">
            {BRAND_LOGOS_ROW_2.map((logo) => (
              <div
                key={`${logo.name}-row2-track2`}
                className="inline-flex items-center justify-center h-12 md:h-16 px-6 md:px-10 flex-shrink-0"
              >
                <img
                  src={`/assets/companies/${logo.file}`}
                  alt={logo.name}
                  className={cn(
                    "h-8 md:h-12 w-auto object-contain grayscale opacity-75 hover:opacity-100 hover:grayscale-0 transition-all duration-300 pointer-events-none select-none",
                    logo.invert && "invert brightness-200"
                  )}
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── §13 — Viewport Quote Moment ─────────────────────────────────────────────

interface CultureViewportQuoteProps {
  quote: CultureQuote;
  bgImageSrc: string;
}

export function CultureViewportQuote({ quote, bgImageSrc }: CultureViewportQuoteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.6, 1.0], [0.2, 0.85, 1.0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center px-6 sm:px-12 bg-black"
    >
      {/* Background Image */}
      <motion.div style={{ scale }} className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src={bgImageSrc}
          alt="Quote background"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.18] contrast-[1.1]"
          priority={false}
        />
      </motion.div>

      {/* Dot-grid texture */}
      <div className="absolute inset-0 culture-dot-canvas opacity-30 pointer-events-none" />

      {/* Film-grain noise */}
      <div className="absolute inset-0 bg-opening-noise opacity-20 pointer-events-none" />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0907] via-transparent to-[#0C0907] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)" }}
      />

      {/* Content Panel */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center"
      >
        <span className="culture-text-label text-glory-gold/70 mb-8 sm:mb-10 block" style={{ letterSpacing: "0.4em" }}>
          THE AMERICAN ESSENCE
        </span>

        <h2 className="font-editorial italic text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-relaxed tracking-wide mb-10 sm:mb-14 max-w-4xl mx-auto px-4">
          &ldquo;{quote.text}&rdquo;
        </h2>

        <div className="w-20 h-px bg-gradient-to-r from-transparent via-glory-gold/60 to-transparent mb-8" />

        <footer>
          <cite className="not-italic culture-text-metadata text-glory-gold/90 tracking-[0.2em] text-[11px] block mb-2">
            — {quote.author}
          </cite>
          <span className="culture-text-label text-[10px] text-[#F5EDD8]/40">
            {quote.role}
          </span>
        </footer>
      </motion.div>
    </section>
  );
}

// ─── §14 — Timeline Horizontal Scroll ────────────────────────────────────────

interface CultureTimelineScrollProps {
  decades: CultureDecade[];
  sectionTitle: string;
}

export function CultureTimelineScroll({ decades, sectionTitle }: CultureTimelineScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>("");

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="relative culture-bg py-28 md:py-36 overflow-hidden">
      {/* Dot-grid background */}
      <div className="absolute inset-0 culture-dot-canvas opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 mb-16 flex justify-between items-end">
        <div>
          <span className="culture-text-label text-glory-gold/70 block mb-4" style={{ letterSpacing: "0.4em" }}>
            CHRONOLOGY OF INFLUENCE
          </span>
          <h2 className="culture-text-hero text-white" style={{ fontSize: "clamp(40px, 7vw, 90px)" }}>
            <span className="block">{sectionTitle}</span>
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-[#F5EDD8]/60 hover:border-glory-gold/50 hover:text-glory-gold transition-all duration-300 text-sm"
            aria-label="Scroll Left"
          >
            ←
          </button>
          <button
            onClick={scrollRight}
            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-[#F5EDD8]/60 hover:border-glory-gold/50 hover:text-glory-gold transition-all duration-300 text-sm"
            aria-label="Scroll Right"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative z-10 flex gap-5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-none px-6 sm:px-8 md:px-16 lg:px-24 pb-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {decades.map((dec, idx) => {
          const imgKey = dec.imageKey as keyof typeof SITE_IMAGES.culture;
          const imageSrc = SITE_IMAGES.culture[imgKey] || SITE_IMAGES.culture.statueOfLiberty;

          return (
            <div
              key={dec.year}
              onClick={() => {
                setSelectedImage(imageSrc);
                setSelectedTitle(`${dec.year} — ${dec.title}`);
                setSelectedSubtitle(dec.sentence);
              }}
              className="flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] snap-start bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden group hover:border-glory-gold/30 transition-all duration-500 flex flex-col justify-between culture-gradient-border cursor-pointer"
            >
              <div className="p-6 md:p-8 flex flex-col gap-2">
                <span className="font-body text-7xl md:text-8xl font-black text-white/[0.03] group-hover:text-glory-gold/8 transition-colors duration-500 leading-none">
                  {dec.year}
                </span>
                <h3 className="font-editorial italic text-xl md:text-2xl text-[#F5EDD8]/80 group-hover:text-white transition-colors duration-300">
                  {dec.title}
                </h3>
              </div>

              <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={dec.title}
                  fill
                  sizes="(max-width: 768px) 80vw, 30vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0907] via-transparent to-transparent opacity-80" />
                {/* Magnifier overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-[#F5EDD8]/90">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
                  </svg>
                </div>
              </div>

              <div className="p-6 md:p-8 border-t border-white/5 bg-black/30">
                <p className="font-body text-[#F5EDD8]/60 text-sm leading-relaxed">
                  {dec.sentence}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <ImageLightboxModal
        src={selectedImage}
        title={selectedTitle}
        subtitle={selectedSubtitle}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}

// ─── §15 — Soft Power Budget ────────────────────────────────────────────────

interface CultureSoftPowerBudgetProps {
  budgetLines: SoftPowerBudgetLine[];
}

export function CultureSoftPowerBudget({ budgetLines }: CultureSoftPowerBudgetProps) {
  return (
    <section className="culture-cream-bg py-24 md:py-32 text-[#0C0907]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col gap-16 md:gap-24">
        {budgetLines.map((line, idx) => {
          const isUsa = line.label.includes("American") || line.label.includes("private") || line.label.includes("SUA") || line.label.includes("private");
          const isRo = line.label.includes("Franța") || line.label.includes("SUA");
          const isFrance = line.label.includes("France") || line.label.includes("Franța");
          const isUk = line.label.includes("British") || line.label.includes("Council");

          let fullDigits = line.value;
          if (line.value.includes("B") || line.value.includes("Mld")) {
            fullDigits = line.value.includes("$")
              ? (isRo ? "$900.000.000.000" : "$900,000,000,000")
              : (isRo ? "€4.000.000.000" : "€4,000,000,000");
          } else if (line.value.includes("M")) {
            fullDigits = isRo ? "£900.000.000" : "£900,000,000";
          }

          // Relative target width
          const barWidth = isUsa ? "100%" : isFrance ? "2.5%" : "1%";

          return (
            <motion.div
              key={line.label}
              className="flex flex-col items-center justify-center w-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className={cn(
                  "font-editorial leading-none tracking-tighter mb-4 block",
                  isUsa
                    ? "text-6xl sm:text-8xl md:text-9xl font-black text-[#E8391B]"
                    : "text-4xl sm:text-6xl md:text-7xl font-semibold opacity-60"
                )}
              >
                {fullDigits}
              </span>

              <span className="font-body text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold opacity-60 max-w-md block mb-4">
                {line.label}
              </span>

              {/* Visual relative bar */}
              <div className="w-full max-w-[280px] sm:max-w-md h-2 bg-black/5 rounded-full overflow-hidden relative border border-black/5 mb-2">
                <motion.div
                  className={cn(
                    "h-full rounded-full",
                    isUsa ? "bg-[#E8391B]" : "bg-black/35"
                  )}
                  initial={{ width: 0 }}
                  whileInView={{ width: barWidth }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: idx * 0.2 + 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>

              {/* Multiplier tags to show scale context */}
              {isUsa && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 0.75, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 + 0.8 }}
                  className="text-[9px] sm:text-[10px] font-body tracking-[0.1em] uppercase font-bold text-[#E8391B] bg-[#E8391B]/10 px-2.5 py-0.5 rounded-full mt-2"
                >
                  {isRo ? "225× mai mare decât bugetul Franței" : "225× larger than France's budget"}
                </motion.span>
              )}

              {idx < budgetLines.length - 1 && (
                <div className="w-8 h-px bg-black/10 mt-16 md:mt-24" />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ─── §16 — Culture Archive Vault ─────────────────────────────────────────────

interface ArchiveItem {
  title: string;
  subtitle: string;
  year: string;
  imageKey: keyof typeof SITE_IMAGES.culture;
}

const CINEMA_ITEMS: ArchiveItem[] = [
  { title: "The Godfather", subtitle: "Dir. Francis Ford Coppola", year: "1972", imageKey: "vaultGodfather" },
  { title: "Jaws", subtitle: "Dir. Steven Spielberg", year: "1975", imageKey: "vaultJaws" },
  { title: "Star Wars", subtitle: "Dir. George Lucas", year: "1977", imageKey: "vaultStarWars" },
  { title: "Jurassic Park", subtitle: "Dir. Steven Spielberg", year: "1993", imageKey: "vaultJurassicPark" },
  { title: "Pulp Fiction", subtitle: "Dir. Quentin Tarantino", year: "1994", imageKey: "vaultPulpFiction" },
  { title: "Interstellar", subtitle: "Dir. Christopher Nolan", year: "2014", imageKey: "vaultInterstellar" },
];

const MUSIC_ITEMS: ArchiveItem[] = [
  { title: "Kind of Blue", subtitle: "Miles Davis", year: "1959", imageKey: "vaultMilesDavis" },
  { title: "Pet Sounds", subtitle: "The Beach Boys", year: "1966", imageKey: "vaultBeachBoys" },
  { title: "At Folsom Prison", subtitle: "Johnny Cash", year: "1968", imageKey: "vaultJohnnyCash" },
  { title: "Thriller", subtitle: "Michael Jackson", year: "1982", imageKey: "vaultMichaelJackson" },
  { title: "Nevermind", subtitle: "Nirvana", year: "1991", imageKey: "vaultNirvana" },
];

const EDITORIAL_ITEMS: ArchiveItem[] = [
  { title: "Fortune Cover", subtitle: "Aviation as Seen by Monkeys", year: "1931", imageKey: "vaultFortune1931" },
  { title: "LIFE Magazine", subtitle: "Marilyn Monroe Feature", year: "1953", imageKey: "vaultLifeMarilyn" },
  { title: "LIFE Magazine", subtitle: "Disney World Grand Opening", year: "1971", imageKey: "vaultLifeDisney" },
  { title: "TIME Magazine", subtitle: "September 11 Remembrance", year: "2001", imageKey: "vaultTime911" },
];

const ADS_ITEMS: ArchiveItem[] = [
  { title: "Coca-Cola Ad", subtitle: "Vintage Print Ad", year: "1971", imageKey: "vaultCocaCola1971" },
  { title: "General Foods", subtitle: "International Coffees Ad", year: "1982", imageKey: "vaultGeneralFoods1982" },
  { title: "Uniden Ad", subtitle: "Cordless Phone Ad", year: "1987", imageKey: "vaultUniden1987" },
  { title: "Coca-Cola is it", subtitle: "Classic Slogan Ad", year: "1988", imageKey: "vaultCocaCola1988" },
  { title: "Coca-Cola Ad", subtitle: "You Can't Beat the Feeling", year: "1989", imageKey: "vaultCocaCola1989" },
  { title: "Tiffany & Co.", subtitle: "Archival Ad", year: "1967", imageKey: "vaultTiffany1967" },
];

interface CultureArchiveVaultProps {
  isRo: boolean;
}

interface ImageLightboxModalProps {
  src: string | null;
  title?: string;
  subtitle?: string;
  contribution?: string;
  achievement?: string;
  quote?: string;
  onClose: () => void;
}

export function ImageLightboxModal({ src, title, subtitle, contribution, achievement, quote, onClose }: ImageLightboxModalProps) {
  useEffect(() => {
    if (src) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [src]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all duration-300 focus:outline-none z-10"
            aria-label="Close lightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center bg-zinc-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl p-2 cursor-default"
          >
            <div className="relative w-full overflow-hidden rounded-lg" style={{ height: "min(65vh, 600px)", aspectRatio: "3/2" }}>
              <Image
                src={src}
                alt={title || "Lightbox view"}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 90vw, 1200px"
                priority
              />
            </div>
            
            {(title || subtitle || contribution || achievement || quote) && (
              <div className="w-full text-center py-4 px-6 mt-1 border-t border-white/5 flex flex-col items-center gap-1">
                {title && <h4 className="font-editorial text-lg text-[#F5EDD8] mb-0.5">{title}</h4>}
                {contribution && (
                  <p className="font-body text-[10px] tracking-widest text-glory-gold uppercase font-semibold">
                    {contribution}
                  </p>
                )}
                {achievement && (
                  <p className="font-body text-[11px] text-[#F5EDD8]/80 max-w-xl italic mt-0.5 mb-1">
                    ★ {achievement}
                  </p>
                )}
                {quote && (
                  <blockquote className="font-editorial italic text-xs text-[#F5EDD8]/60 border-l border-glory-gold/40 pl-3 max-w-md text-left py-1 my-1">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                )}
                {subtitle && <p className="font-body text-xs tracking-widest text-[#F5EDD8]/45 uppercase mt-1">{subtitle}</p>}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const VaultCard = memo(function VaultCard({ item, idx, onClick }: { item: ArchiveItem; idx: number; onClick?: () => void }) {
  const imageSrc = SITE_IMAGES.culture[item.imageKey] || SITE_IMAGES.culture.statueOfLiberty;

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className="group flex flex-col items-center text-center cursor-pointer"
    >
      {/* Poster/Cover Frame */}
      <div 
        className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-black/40 border border-white/5 shadow-2xl transition-all duration-500 group-hover:border-glory-gold/40 group-hover:shadow-[0_20px_50px_rgba(212,175,55,0.08)] mb-4"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        <Image
          src={imageSrc}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover grayscale transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:grayscale-0 group-hover:scale-105"
          style={{ willChange: "transform, filter", transform: "translateZ(0)" }}
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
        
        {/* Visual Year Tag */}
        <span className="absolute top-3 right-3 bg-black/70 border border-white/10 text-glory-gold font-body text-[9px] tracking-widest font-black py-1 px-2 rounded uppercase pointer-events-none">
          {item.year}
        </span>
      </div>

      {/* Descriptions */}
      <h3 className="font-editorial italic text-base sm:text-lg text-[#F5EDD8] group-hover:text-glory-gold transition-colors duration-300 mb-1 line-clamp-1">
        {item.title}
      </h3>
      <span className="font-body text-[10px] sm:text-xs text-[#F5EDD8]/45 line-clamp-1 uppercase tracking-widest font-medium">
        {item.subtitle}
      </span>
    </motion.div>
  );
});

export function CultureArchiveVault({ isRo }: CultureArchiveVaultProps) {
  const [activeTab, setActiveTab] = useState<"cinema" | "music" | "editorial" | "ads">("cinema");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>("");

  const tabs = [
    { id: "cinema", label: isRo ? "Cinema" : "Cinema" },
    { id: "music", label: isRo ? "Muzică" : "Music" },
    { id: "editorial", label: isRo ? "Publicații" : "Editorial" },
    { id: "ads", label: isRo ? "Reclame" : "Ads" },
  ] as const;

  const getItems = () => {
    switch (activeTab) {
      case "cinema":
        return CINEMA_ITEMS;
      case "music":
        return MUSIC_ITEMS;
      case "editorial":
        return EDITORIAL_ITEMS;
      case "ads":
        return ADS_ITEMS;
    }
  };

  const title = isRo ? "ARHIVA CULTURALĂ" : "THE ARCHIVE VAULT";
  const subtitle = isRo
    ? "O selecție de exporturi culturale de referință care au modelat imaginația globală."
    : "A curated archive of landmark cultural exports that defined global creative expression.";

  return (
    <section id="culture-archive-vault" className="relative culture-bg py-28 md:py-36 overflow-hidden">
      {/* Dot-grid background */}
      <div className="absolute inset-0 culture-dot-canvas opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center">
        {/* Title Block */}
        <motion.div
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="font-body text-glory-gold text-xs font-semibold uppercase tracking-[0.25em] block mb-3">
            VAULT OF INFLUENCE
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#F5EDD8] mb-4">
            {title}
          </h2>
          <p className="font-body text-sm sm:text-base text-[#F5EDD8]/60 leading-relaxed font-light font-body">
            {subtitle}
          </p>
        </motion.div>

        {/* Tabs Controller */}
        <div className="flex justify-center border-b border-white/10 mb-12 max-w-lg mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative py-3 px-6 font-body text-xs uppercase tracking-widest font-semibold transition-colors duration-300",
                activeTab === tab.id
                  ? "text-glory-gold"
                  : "text-[#F5EDD8]/45 hover:text-[#F5EDD8]/80"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-glory-gold"
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-center max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="col-span-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
            >
              {getItems().map((item, idx) => {
                const imageSrc = SITE_IMAGES.culture[item.imageKey] || SITE_IMAGES.culture.statueOfLiberty;
                return (
                  <VaultCard
                    key={`${activeTab}-${item.imageKey}`}
                    item={item}
                    idx={idx}
                    onClick={() => {
                      setSelectedImage(imageSrc);
                      setSelectedTitle(item.title);
                      setSelectedSubtitle(`${item.subtitle} (${item.year})`);
                    }}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ImageLightboxModal
        src={selectedImage}
        title={selectedTitle}
        subtitle={selectedSubtitle}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}

// ─── §17 — Living Media Wall ─────────────────────────────────────────────────

interface ShiftingGridCellProps {
  src: string;
  isColor: boolean;
  onClick?: () => void;
}

export const ShiftingGridCell = memo(function ShiftingGridCell({ src, isColor, onClick }: ShiftingGridCellProps) {
  return (
    <div 
      onClick={onClick}
      className="relative w-full h-full overflow-hidden bg-black/60 rounded border border-white/[0.03] cursor-pointer group/cell"
    >
      <motion.div
        animate={{ opacity: isColor ? 0.95 : 0.45 }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "opacity", transform: "translateZ(0)" }}
      >
        <Image
          src={src}
          alt="Cultural artifact"
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={cn(
            "object-cover transition-all duration-1000 ease-in-out group-hover/cell:scale-105",
            isColor ? "grayscale-0 scale-[1.03]" : "grayscale scale-100"
          )}
          style={{ willChange: "transform, filter", transform: "translateZ(0)" }}
          decoding="async"
          loading="lazy"
        />
        {/* Dimming layer instead of heavy GPU filter */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/30 pointer-events-none transition-opacity duration-1000",
            isColor ? "opacity-0" : "opacity-100"
          )} 
        />
      </motion.div>

      {/* Magnifier icon on hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cell:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-white/90">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
        </svg>
      </div>
    </div>
  );
});

const INITIAL_COLOR_STATES = [
  true, false, false, false,
  false, true, false, false,
  false, false, true, false,
  false, false, false, true
];

interface CultureLivingMediaWallProps {
  isRo?: boolean;
}

export function CultureLivingMediaWall({ isRo = false }: CultureLivingMediaWallProps) {
  const [visibleImages, setVisibleImages] = useState<string[]>(CULTURE_MEDIA_WALL_IMAGES.slice(0, 16));
  const [colorStates, setColorStates] = useState<boolean[]>(INITIAL_COLOR_STATES);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const unusedRef = useRef<string[]>([]);
  const usedRef = useRef<string[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "600px" });

  // Sync ref to track latest color states without interval re-creation
  const colorStatesRef = useRef<boolean[]>(INITIAL_COLOR_STATES);
  useEffect(() => {
    colorStatesRef.current = colorStates;
  }, [colorStates]);

  // Initialize pool on mount
  useEffect(() => {
    const initial = CULTURE_MEDIA_WALL_IMAGES.slice(0, 16);
    const unused = CULTURE_MEDIA_WALL_IMAGES.slice(16).sort(() => Math.random() - 0.5);
    
    unusedRef.current = unused;
    usedRef.current = initial;
  }, []);

  const getNewImage = useCallback(() => {
    if (unusedRef.current.length === 0) {
      unusedRef.current = [...usedRef.current].sort(() => Math.random() - 0.5);
      usedRef.current = [];
    }
    const newImg = unusedRef.current.pop()!;
    usedRef.current.push(newImg);
    return newImg;
  }, []);

  // Shifting interval
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      // Find indices that are currently false (not highlighted/dimmed)
      // to swap images, keeping the transition completely masked.
      const inactiveIndices: number[] = [];
      colorStatesRef.current.forEach((col, i) => {
        if (!col) inactiveIndices.push(i);
      });

      if (inactiveIndices.length > 0) {
        const swapIndex = inactiveIndices[Math.floor(Math.random() * inactiveIndices.length)];
        const nextImg = getNewImage();

        setVisibleImages((prev) => {
          const next = [...prev];
          next[swapIndex] = nextImg;
          return next;
        });
      }

      // Shift color states: select 4 random cells to highlight
      setColorStates(() => {
        const nextColors = Array(16).fill(false);
        const colorIndices: number[] = [];
        while (colorIndices.length < 4) {
          const idx = Math.floor(Math.random() * 16);
          if (!colorIndices.includes(idx)) {
            colorIndices.push(idx);
            nextColors[idx] = true;
          }
        }
        return nextColors;
      });
    }, 4000); // 4 seconds interval for a premium feel

    return () => clearInterval(interval);
  }, [isInView, getNewImage]);

  const modalTitle = isRo ? "Artefact Arhivă Culturală" : "Cultural Archive Artifact";
  const modalSubtitle = isRo ? "O selecție de elemente reprezentative ale culturii americane" : "A landmark artifact of American cultural influence";

  return (
    <section ref={sectionRef} className="relative culture-bg py-24 md:py-32 overflow-hidden border-t border-white/5">
      {/* Dot-grid background */}
      <div className="absolute inset-0 culture-dot-canvas opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <p className="culture-text-label text-glory-gold mb-3" style={{ letterSpacing: "0.25em" }}>
            CULTURAL ARTIFACTS
          </p>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#F5EDD8]">
            THE ARCHIVE
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {visibleImages.map((src, idx) => (
            <div
              key={idx}
              className="relative aspect-square w-full overflow-hidden rounded bg-black/40 border border-white/5"
            >
              <ShiftingGridCell
                src={src}
                isColor={colorStates[idx]}
                onClick={() => setSelectedImage(src)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gold radial glow in center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,215,0,0.02) 0%, transparent 60%)" }}
      />

      <ImageLightboxModal
        src={selectedImage}
        title={modalTitle}
        subtitle={modalSubtitle}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}

// ─── §17 — Music Origins Section ─────────────────────────────────────────────

interface CultureMusicSectionProps {
  genres: CultureMusicGenre[];
  sectionTitle: string;
  isRo: boolean;
}

export function CultureMusicSection({ genres, sectionTitle, isRo }: CultureMusicSectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>("");

  const musicImages: Record<string, string> = {
    jazzClub: SITE_IMAGES.culture.jazzClub,
    music: SITE_IMAGES.culture.guitarNeon,
    concertCrowd: SITE_IMAGES.culture.concertCrowd,
    overview: SITE_IMAGES.culture.timesSquareIconic,
  };

  return (
    <section id="culture-music" className="relative culture-bg py-28 md:py-36 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 culture-dot-canvas opacity-15 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.p
            className="culture-text-label text-glory-gold"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {isRo ? "RĂDĂCINI REGIONALE · IMPACT PLANETAR" : "REGIONAL ROOTS · PLANETARY IMPACT"}
          </motion.p>
          <motion.h2
            className="culture-text-hero text-white mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {sectionTitle}
          </motion.h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-glory-gold to-transparent mx-auto mt-6" />
        </div>

        {/* Music Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {genres.map((g, i) => {
            const imgSrc = musicImages[g.imageKey] || SITE_IMAGES.culture.jazzClub;
            return (
              <motion.div
                key={g.genre}
                onClick={() => {
                  setSelectedImage(imgSrc);
                  setSelectedTitle(g.genre);
                  setSelectedSubtitle(`${g.city} — ${g.description}`);
                }}
                className="group relative h-[420px] rounded-xl overflow-hidden culture-gradient-border border border-white/5 flex flex-col justify-end p-6 cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Background Image */}
                <Image
                  src={imgSrc}
                  alt={g.genre}
                  fill
                  className="object-cover transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] grayscale group-hover:grayscale-0 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />

                {/* Vignette Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(12,9,7,0.1) 0%, rgba(12,9,7,0.5) 45%, rgba(12,9,7,0.95) 100%)",
                  }}
                />

                {/* Light sweep sweep on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%)" }} />

                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <p className="culture-text-label text-[9px] text-glory-gold/80" style={{ letterSpacing: "0.25em" }}>
                      {g.city}
                    </p>
                    {/* Tiny decorative disc / Magnifier icon on hover */}
                    <div className="relative w-5 h-5">
                      <div className="absolute inset-0 rounded-full border border-white/20 bg-black flex items-center justify-center animate-spin group-hover:opacity-0 transition-opacity duration-300" style={{ animationDuration: "6s", animationPlayState: "paused" }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-glory-gold/60" />
                      </div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white/90">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-hero text-2xl lg:text-3xl text-white tracking-wide mb-3">
                      {g.genre}
                    </h3>
                    <p className="font-editorial text-sm sm:text-base text-[#F5EDD8]/70 leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ImageLightboxModal
        src={selectedImage}
        title={selectedTitle}
        subtitle={selectedSubtitle}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}

// ─── §18 — Culinary Pillars Section ──────────────────────────────────────────

interface CultureCulinarySectionProps {
  pillars: CultureCulinaryPillar[];
  sectionTitle: string;
  isRo: boolean;
}

export function CultureCulinarySection({ pillars, sectionTitle, isRo }: CultureCulinarySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>("");

  const culinaryImages: Record<string, string> = {
    diner: SITE_IMAGES.culture.flosV8,
    burger: SITE_IMAGES.culture.burger,
    food: SITE_IMAGES.culture.mcDonalds,
  };

  return (
    <section id="culture-culinary" className="relative culture-cream-bg py-28 md:py-36 overflow-hidden border-t border-black/5 text-[#0C0907]">
      <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.p
            className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {isRo ? "SISTEME DE ALIMENTAȚIE · ARTA COMUNITĂȚII" : "FOOD SYSTEMS · ART OF COMMUNITY"}
          </motion.p>
          <motion.h2
            className="culture-text-hero text-[#0C0907] mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {sectionTitle}
          </motion.h2>
          <div className="w-24 h-px bg-[#0C0907]/10 mx-auto mt-6" />
        </div>

        {/* Culinary Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10">
          {pillars.map((p, i) => {
            const imgSrc = culinaryImages[p.imageKey] || SITE_IMAGES.culture.burger;
            return (
              <motion.div
                key={p.title}
                onClick={() => {
                  setSelectedImage(imgSrc);
                  setSelectedTitle(p.title);
                  setSelectedSubtitle(p.subtitle);
                }}
                className="group flex flex-col bg-white/40 backdrop-blur-md rounded-2xl p-5 border border-[#0C0907]/5 shadow-[0_8px_30px_rgb(12,9,7,0.02)] hover:shadow-[0_20px_50px_rgb(12,9,7,0.06)] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Image Box */}
                <div className="relative h-[220px] rounded-xl overflow-hidden mb-6 shadow-inner border border-[#0C0907]/5">
                  <Image
                    src={imgSrc}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                  <div className="absolute inset-0 bg-[#0C0907]/5 group-hover:bg-[#0C0907]/0 transition-colors duration-500" />
                  {/* Magnifier icon on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-white/90">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
                    </svg>
                  </div>
                </div>

                {/* Subtitle / Eyebrow */}
                <p className="culture-text-label text-[10px] text-glory-gold tracking-[0.25em] mb-2 font-bold">
                  {p.subtitle}
                </p>

                {/* Title */}
                <h3 className="font-editorial text-2xl font-semibold mb-4 text-[#0C0907]">
                  {p.title}
                </h3>

                {/* Body Paragraph */}
                <p className="font-editorial text-sm text-[#0C0907]/70 leading-relaxed">
                  {parseTextWithHighlights(p.body)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ImageLightboxModal
        src={selectedImage}
        title={selectedTitle}
        subtitle={selectedSubtitle}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}

// ─── §2.5 — Culture Origination Strip ────────────────────────────────────────

interface CultureOriginationStripProps {
  originations: CultureOriginationItem[];
  isRo: boolean;
}

export function CultureOriginationStrip({ originations, isRo }: CultureOriginationStripProps) {
  return (
    <section id="culture-origination" className="culture-bg border-b border-white/5 relative overflow-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 culture-dot-canvas opacity-10 pointer-events-none" />

      <div className="mx-auto max-w-[1440px] relative z-10">
        {/* Eyebrow Label */}
        <div className="px-8 pt-8 md:pt-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-glory-gold animate-pulse" />
            <p className="culture-text-label text-[10px] tracking-[0.35em] text-glory-gold/90 font-bold uppercase">
              {isRo ? "INVENTAREA FORMELOR CULTURALE" : "INVENTING THE CULTURAL FORMS"}
            </p>
          </div>
          <span className="font-editorial italic text-xs text-[#F5EDD8]/30">
            {isRo ? "Made in America, Sold to the World" : "Made in America, Sold to the World"}
          </span>
        </div>

        {/* 8-Item Tight Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 divide-x divide-y sm:divide-y-0 divide-white/5 border-t border-white/5 mt-6">
          {originations.map((orig, i) => (
            <motion.div
              key={orig.innovation}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="relative p-6 md:p-8 flex flex-col justify-between group min-h-[170px] overflow-hidden cursor-default"
            >
              {/* Dynamic top gold border transition */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-glory-gold group-hover:w-full transition-all duration-500 ease-out" />
              
              {/* Radial glow background on hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Decade label */}
              <span className="font-editorial italic text-glory-gold/40 group-hover:text-glory-gold/80 transition-colors duration-300 text-sm leading-none mb-3">
                {orig.decade}
              </span>

              <div className="flex flex-col mt-auto">
                {/* Innovation Title */}
                <h4 className="font-editorial text-lg sm:text-xl text-[#F5EDD8] group-hover:text-white transition-colors duration-300 mb-2 leading-tight">
                  {orig.innovation}
                </h4>
                {/* Small Description */}
                <p className="font-body text-[11px] text-[#F5EDD8]/45 group-hover:text-[#F5EDD8]/70 transition-colors duration-300 leading-relaxed font-medium">
                  {orig.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── §3.5 — Editorial Imperialism (Counter-Programming) ─────────────────────

interface CultureEditorialImperialismProps {
  data: CultureEditorialImperialismData;
  isRo?: boolean;
}

export function CultureEditorialImperialism({ data, isRo = false }: CultureEditorialImperialismProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="culture-imperialism"
      className="relative culture-bg py-28 md:py-36 overflow-hidden border-b border-white/5"
    >
      {/* Golden-hued background grid Canvas */}
      <div className="absolute inset-0 culture-dot-canvas opacity-20 pointer-events-none" />

      {/* Subtle gold radial glow in background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 30% 50%, rgba(212,175,55,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Callout Quote Card */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              whileHover="hover"
              className="relative p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-glory-gold/30 transition-colors duration-500 overflow-hidden group cursor-default"
            >
              {/* Shimmer overlay gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                style={{
                  background: "radial-gradient(circle at center, rgba(212,175,55,0.08) 0%, transparent 70%)"
                }}
              />
              
              {/* Border shimmer effect */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-glory-gold to-transparent group-hover:w-full transition-all duration-700 ease-out" />
              
              {/* Decorative Quote Mark */}
              <span className="font-editorial text-glory-gold/10 text-[100px] leading-none absolute -top-4 -left-2 select-none pointer-events-none">
                &ldquo;
              </span>

              <motion.p
                variants={{
                  hover: { color: "#FFD700", textShadow: "0 0 15px rgba(255,215,0,0.15)" }
                }}
                transition={{ duration: 0.4 }}
                className="font-editorial italic text-2xl sm:text-3xl lg:text-4xl text-[#F5EDD8] leading-[1.35] relative z-10"
              >
                {data.statement}
              </motion.p>

              {/* Little author/source credit in quote box */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                <span className="culture-text-label text-[9px] text-glory-gold/80 tracking-[0.2em]">
                  {isRo ? "PERSPECTIVĂ EDITORIALĂ" : "EDITORIAL PERSPECTIVE"}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-glory-gold/40 group-hover:bg-glory-gold transition-colors duration-500" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Narrative content */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="culture-text-label text-glory-gold block mb-4 tracking-[0.3em] font-bold">
              {data.eyebrow}
            </span>
            
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight mb-8">
              {data.headline}
            </h2>

            <div className="w-16 h-0.5 bg-glory-gold/40 mb-8" />

            <p className="font-body text-[#F5EDD8]/75 text-sm sm:text-base leading-relaxed font-light">
              {data.body}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── §3.8 — Digital America: Pipes of Global Culture ─────────────────────────

function PipeIcon({ iconKey }: { iconKey: string }) {
  switch (iconKey) {
    case "search":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.604 10.604Z" />
        </svg>
      );
    case "social":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a3 3 0 0 0 3-3V12a3 3 0 0 0-3-3h-.721m-4.5 9.72a3 3 0 0 0-3-3v-6a3 3 0 0 0 3-3m0 0V4.5a3 3 0 0 1 3-3h.721M12 22.5c.07 0 .14-.002.21-.006A9.973 9.973 0 0 0 18 18.72m-6 3.78a9.973 9.973 0 0 1-5.79-3.78m0 0a3 3 0 0 1-3-3V12a3 3 0 0 1 3-3h.721m0 0a9.972 9.972 0 0 1 5.069-5.212m0 0a9.972 9.972 0 0 1 5.069 5.212M12 1.5c.07 0 .14.002.21.006A9.973 9.973 0 0 1 18 5.28m-6-3.774a9.973 9.973 0 0 0-5.79 3.774" />
        </svg>
      );
    case "streaming":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
        </svg>
      );
    case "podcast":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
        </svg>
      );
    case "smartphone":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      );
    case "ai":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.187L15 15l-5.187.904ZM18 9.096 17.25 13l-.75-3.904L13 8.25l3.5-.75L17.25 4l.75 3.5 3.904.75-3.904.846Zm-12-6L5.5 6l-.5-3-3-.5L5 2l.5-3 .5 3 3 .5-3 .5Z" />
        </svg>
      );
    default:
      return null;
  }
}

function parseTextWithLinks(text: string) {
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return parts.map((part, idx) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      const linkText = match[1];
      const linkHref = match[2];
      return (
        <Link 
          key={idx} 
          href={linkHref} 
          className="text-glory-gold hover:text-glory-gold/80 font-semibold underline underline-offset-4 decoration-glory-gold/30 hover:decoration-glory-gold transition-all duration-300"
        >
          {linkText}
        </Link>
      );
    }
    return part;
  });
}

export function CultureDigitalPipes({ data, isRo = false }: { data: CultureDigitalPipesData; isRo?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="culture-digital-pipes"
      className="relative culture-bg py-28 md:py-36 overflow-hidden border-b border-white/5"
    >
      {/* Background grid canvas with slight digital hue tint */}
      <div className="absolute inset-0 culture-dot-canvas opacity-[0.15] pointer-events-none" />
      
      {/* Subtle radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 70% 30%, rgba(212,175,55,0.02) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Garamond Quote Callout */}
          <motion.div
            className="lg:col-span-4 lg:sticky lg:top-28"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              whileHover="hover"
              className="relative p-8 sm:p-10 rounded-2xl bg-white/[0.01] border border-white/[0.05] hover:border-glory-gold/30 transition-colors duration-500 overflow-hidden group cursor-default"
            >
              {/* Gold radial shine on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                style={{
                  background: "radial-gradient(circle at center, rgba(212,175,55,0.06) 0%, transparent 70%)"
                }}
              />

              <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-glory-gold to-transparent group-hover:w-full transition-all duration-700 ease-out" />
              
              <span className="font-editorial text-glory-gold/10 text-[90px] leading-none absolute -top-4 -left-2 select-none pointer-events-none">
                &ldquo;
              </span>

              <motion.p
                variants={{
                  hover: { color: "#FFD700", textShadow: "0 0 15px rgba(255,215,0,0.12)" }
                }}
                transition={{ duration: 0.4 }}
                className="font-editorial italic text-2xl sm:text-3xl lg:text-3xl xl:text-4xl text-[#F5EDD8] leading-snug relative z-10"
              >
                {data.statement}
              </motion.p>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                <span className="culture-text-label text-[9px] text-[#F5EDD8]/45 tracking-[0.2em] uppercase font-bold">
                  {isRo ? "Noul Peisaj" : "The New Landscape"}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-glory-gold/30 group-hover:bg-glory-gold transition-colors duration-500" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Title, Body, and Pipes Grid */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Header Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="culture-text-label text-glory-gold block mb-4 tracking-[0.3em] font-bold">
                {data.eyebrow}
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-white font-bold leading-tight mb-6">
                {data.headline}
              </h2>
              <div className="w-16 h-0.5 bg-glory-gold/40 mb-6" />
              <p className="font-body text-[#F5EDD8]/70 text-sm sm:text-base leading-relaxed font-light">
                {data.body}
              </p>
            </motion.div>

            {/* The 6 Pipes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.pipes.map((pipe, idx) => (
                <motion.div
                  key={pipe.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="culture-glass rounded-xl p-6 border border-white/[0.04] hover:border-glory-gold/30 transition-all duration-300 group/pipe cursor-default flex flex-col gap-3 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-[2px] h-0 bg-glory-gold group-hover/pipe:h-full transition-all duration-500 ease-out" />
                  
                  <div className="text-glory-gold/70 group-hover/pipe:text-glory-gold group-hover/pipe:scale-105 transition-all duration-300 w-fit">
                    <PipeIcon iconKey={pipe.iconKey} />
                  </div>
                  
                  <h3 className="font-editorial italic text-lg sm:text-xl text-[#F5EDD8] group-hover/pipe:text-white transition-colors duration-300">
                    {pipe.title}
                  </h3>
                  
                  <p className="font-body text-xs sm:text-[13px] text-[#F5EDD8]/50 group-hover/pipe:text-[#F5EDD8]/75 transition-colors duration-300 leading-relaxed font-light">
                    {pipe.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Bridge Callout Link Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 sm:p-8 rounded-xl bg-gradient-to-r from-white/[0.01] to-white/[0.03] border border-white/[0.05] hover:border-glory-gold/20 transition-all duration-500 flex flex-col sm:flex-row gap-4 items-center justify-between group/bridge cursor-default overflow-hidden mt-4"
            >
              {/* Subtle tech grid background behind bridge card */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:14px_24px] opacity-30 pointer-events-none" />

              <div className="flex flex-col gap-1 relative z-10 text-center sm:text-left">
                <span className="culture-text-label text-[9px] text-glory-gold tracking-[0.25em]">
                  {isRo ? "CONEXIUNI INTER-DOMENII" : "INTER-DOMAIN LINKS"}
                </span>
                <p className="font-body text-xs sm:text-[13px] text-[#F5EDD8]/65 leading-relaxed font-light max-w-xl">
                  {parseTextWithLinks(data.bridgeText)}
                </p>
              </div>

              <div className="flex-shrink-0 relative z-10 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#F5EDD8]/60 group-hover/bridge:border-glory-gold/40 group-hover/bridge:text-glory-gold transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 transform group-hover/bridge:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}

// ─── §3.9 — Cultural Icons: The Faces of America ───────────────────────────

interface CultureIconsSectionProps {
  data: CultureIconsSectionData;
  isRo?: boolean;
}

export function CultureIconsSection({ data, isRo = false }: CultureIconsSectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>("");
  const [selectedContribution, setSelectedContribution] = useState<string>("");
  const [selectedAchievement, setSelectedAchievement] = useState<string>("");
  const [selectedQuote, setSelectedQuote] = useState<string>("");

  return (
    <section id="culture-icons" className="relative culture-bg py-28 md:py-36 overflow-hidden border-b border-white/5">
      {/* Dot-grid background */}
      <div className="absolute inset-0 culture-dot-canvas opacity-15 pointer-events-none" />

      {/* Gold radial background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(212,175,55,0.01) 0%, transparent 75%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto flex flex-col items-center">
          <motion.p
            className="culture-text-label text-glory-gold"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {data.eyebrow}
          </motion.p>
          <motion.h2
            className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {data.title}
          </motion.h2>
          <motion.p
            className="font-body text-[#F5EDD8]/60 text-sm sm:text-base leading-relaxed font-light mt-6 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {data.deck}
          </motion.p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-glory-gold to-transparent mt-8" />
        </div>

        {/* 10-Icons Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {data.icons.map((icon, i) => {
            const imgKey = icon.imageKey as keyof typeof SITE_IMAGES.culture;
            const imageSrc = SITE_IMAGES.culture[imgKey] || SITE_IMAGES.culture.statueOfLiberty;

            return (
              <motion.div
                key={icon.name}
                onClick={() => {
                  setSelectedImage(imageSrc);
                  setSelectedTitle(icon.name);
                  setSelectedSubtitle(`${icon.years} — ${icon.description}`);
                  setSelectedContribution(icon.contribution);
                  setSelectedAchievement(icon.achievement);
                  setSelectedQuote(icon.quote);
                }}
                className="group relative aspect-[3/4.5] rounded-xl overflow-hidden culture-gradient-border border border-white/5 flex flex-col justify-end p-5 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: (i % 5) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Grayscale Background Image */}
                <Image
                  src={imageSrc}
                  alt={icon.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />

                {/* Dark Vignette Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(12,9,7,0.1) 0%, rgba(12,9,7,0.55) 40%, rgba(12,9,7,0.98) 100%)",
                  }}
                />

                {/* Card border shine top line on hover */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-glory-gold group-hover:w-full transition-all duration-500 ease-out" />

                {/* Card Content */}
                <div className="relative z-10 flex flex-col gap-1.5 pointer-events-none">
                  <span className="font-body text-[9px] uppercase tracking-widest text-glory-gold/80 leading-none">
                    {icon.years}
                  </span>
                  <h3 className="font-editorial italic text-lg sm:text-xl text-white group-hover:text-glory-gold transition-colors duration-300 leading-tight">
                    {icon.name}
                  </h3>
                  <p className="font-editorial text-xs sm:text-sm text-[#F5EDD8]/60 group-hover:text-[#F5EDD8]/80 transition-colors duration-300 leading-relaxed font-light line-clamp-3">
                    {icon.description}
                  </p>
                </div>

                {/* Magnifier overlay indicator on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-white/90">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      <ImageLightboxModal
        src={selectedImage}
        title={selectedTitle}
        subtitle={selectedSubtitle}
        contribution={selectedContribution}
        achievement={selectedAchievement}
        quote={selectedQuote}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}

// ─── §3.10 — Hollywood: The Dream Factory ───────────────────────────────────

interface CultureHollywoodEditorialProps {
  data: CultureHollywoodData;
  isRo?: boolean;
}

export function CultureHollywoodEditorial({ data, isRo = false }: CultureHollywoodEditorialProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="culture-hollywood"
      className="relative culture-bg py-28 md:py-36 overflow-hidden border-b border-white/5"
    >
      {/* Background dot grid */}
      <div className="absolute inset-0 culture-dot-canvas opacity-15 pointer-events-none" />

      {/* Subtle gold radial background glow on left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 25% 50%, rgba(212,175,55,0.02) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Bold Pull Quote Card */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              whileHover="hover"
              className="relative p-8 sm:p-10 rounded-2xl bg-white/[0.01] border border-white/[0.05] hover:border-glory-gold/30 transition-colors duration-500 overflow-hidden group cursor-default"
            >
              {/* Gold radial shimmer overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                style={{
                  background: "radial-gradient(circle at center, rgba(212,175,55,0.06) 0%, transparent 70%)"
                }}
              />
              
              {/* Shimmer top border line */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-glory-gold to-transparent group-hover:w-full transition-all duration-700 ease-out" />
              
              {/* Decorative Quote Mark */}
              <span className="font-editorial text-glory-gold/10 text-[100px] leading-none absolute -top-4 -left-2 select-none pointer-events-none">
                &ldquo;
              </span>

              <motion.p
                variants={{
                  hover: { color: "#FFD700", textShadow: "0 0 15px rgba(255,215,0,0.12)" }
                }}
                transition={{ duration: 0.4 }}
                className="font-editorial italic text-2xl sm:text-3xl lg:text-3xl xl:text-4xl text-[#F5EDD8] leading-snug relative z-10"
              >
                {data.pullQuote}
              </motion.p>

              {/* Source label */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                <span className="culture-text-label text-[9px] text-[#F5EDD8]/45 tracking-[0.2em] uppercase font-bold">
                  {isRo ? "Ecranul Global" : "The Global Screen"}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-glory-gold/30 group-hover:bg-glory-gold transition-colors duration-500" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Editorial Copy, Stats, and Callout Link */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="culture-text-label text-glory-gold block mb-4 tracking-[0.3em] font-bold">
              {data.eyebrow}
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-white font-bold leading-tight mb-6">
              {data.headline}
            </h2>
            <div className="w-16 h-0.5 bg-glory-gold/40 mb-6" />
            <p className="font-body text-[#F5EDD8]/70 text-sm sm:text-base leading-relaxed font-light mb-8">
              {data.body}
            </p>

            {/* Sub-stats block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {data.stats.map((s, idx) => (
                <div 
                  key={s.label}
                  className="border border-white/[0.04] bg-white/[0.01] rounded-xl p-5 flex flex-col items-center text-center hover:border-glory-gold/20 transition-all duration-300 group/stat cursor-default"
                >
                  <span className="text-3.5xl sm:text-4xl font-extralight text-white group-hover/stat:text-glory-gold transition-colors duration-300 leading-none tabular-nums">
                    <AnimatedNumber value={s.value} />
                  </span>
                  <span className="culture-text-label text-[9px] text-[#F5EDD8]/45 mt-3 tracking-wider leading-relaxed uppercase">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button Link scrolling down to the Archive Vault */}
            <div className="flex justify-start">
              <a 
                href="#culture-archive-vault"
                className="inline-flex items-center gap-3 bg-white/5 border border-white/10 hover:border-glory-gold/40 hover:bg-white/[0.08] text-white hover:text-glory-gold font-body text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 group/cta shadow-lg"
              >
                <span>{data.ctaText}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="w-3.5 h-3.5 transform group-hover/cta:translate-y-0.5 transition-transform duration-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

interface CultureManifestoSectionProps {
  data: CultureManifestoData;
  isRo?: boolean;
}

export function CultureManifestoSection({ data, isRo = false }: CultureManifestoSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="culture-manifesto"
      className="relative culture-bg py-32 md:py-40 overflow-hidden border-t border-white/5"
    >
      {/* Background Canvas & Radial Glow */}
      <div className="absolute inset-0 culture-dot-canvas opacity-20 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(212,175,55,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 text-center">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="culture-text-label text-glory-gold block mb-6 tracking-[0.4em] font-bold"
        >
          {data.eyebrow}
        </motion.span>

        {/* Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-editorial italic text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-[#F5EDD8] leading-tight max-w-4xl mx-auto mb-8 cursor-default hover:text-glory-gold transition-colors duration-500"
        >
          &ldquo;{data.statement}&rdquo;
        </motion.h2>

        {/* Gold separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-24 h-0.5 bg-glory-gold/40 mx-auto mb-8 origin-center"
        />

        {/* Body Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-[#F5EDD8]/75 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-3xl mx-auto mb-16"
        >
          {data.body}
        </motion.p>

        {/* Verticals Navigation Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-6"
        >
          {data.verticals.map((vert) => {
            // Custom SVGs representing the icon logic
            let iconSvg;
            if (vert.href.includes("constitution")) {
              // Scale / Balance icon
              iconSvg = (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17M12 3L7 8h10L12 3zM19 17h2M3 17h2M5 17c0-2.21 3.134-4 7-4s7 1.79 7 4M5 17h14" />
                </svg>
              );
            } else if (vert.href.includes("economy")) {
              // Trending Up / Chart icon
              iconSvg = (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              );
            } else {
              // Shield / Military icon
              iconSvg = (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              );
            }

            return (
              <Link
                key={vert.href}
                href={vert.href}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white/[0.01] border border-white/[0.04] hover:border-glory-gold/30 transition-all duration-500 flex flex-col items-center justify-between text-center overflow-hidden cursor-pointer"
              >
                {/* Subtle top gold border slide on hover */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-glory-gold to-transparent group-hover:w-full transition-all duration-700 ease-out" />
                
                {/* Hover background radial gold glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at center, rgba(212,175,55,0.05) 0%, transparent 70%)"
                  }}
                />

                {/* Icon Wrapper */}
                <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/[0.06] group-hover:border-glory-gold/30 flex items-center justify-center text-glory-gold/70 group-hover:text-glory-gold group-hover:scale-110 transition-all duration-500 mb-6">
                  {iconSvg}
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-editorial text-xl sm:text-2xl text-white font-medium mb-2 group-hover:text-glory-gold transition-colors duration-300">
                    {vert.title}
                  </h3>
                  <p className="font-body text-[#F5EDD8]/40 text-xs sm:text-sm tracking-wide leading-relaxed font-light">
                    {vert.subtitle}
                  </p>
                </div>

                {/* Small link arrow indicator */}
                <div className="mt-6 flex items-center gap-1.5 text-glory-gold/40 group-hover:text-glory-gold transition-colors duration-300 text-[10px] uppercase tracking-widest font-bold font-body">
                  <span>{isRo ? "Explorează" : "Explore"}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

interface CultureEnglishLanguageProps {
  data: CultureEnglishLanguageData;
  isRo?: boolean;
}

export function CultureEnglishLanguage({ data, isRo = false }: CultureEnglishLanguageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="culture-english-language"
      className="relative culture-cream-bg py-28 md:py-36 overflow-hidden"
    >
      {/* Background canvas pattern with very light opacity */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.85) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Headings and Copy */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="culture-text-label text-[#E8391B] block mb-4 tracking-[0.3em] font-bold">
              {data.eyebrow}
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-[#0C0907] font-bold leading-tight mb-6">
              {data.headline}
            </h2>
            <div className="w-16 h-0.5 bg-[#E8391B]/40 mb-8" />
            
            <div className="space-y-6">
              {data.paragraphs.map((p, index) => (
                <p 
                  key={index}
                  className="font-body text-[#0C0907]/75 text-sm sm:text-base leading-relaxed font-light"
                >
                  {p}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive Domain Progress Bars */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-[#FAF6EC] border border-[#0C0907]/5 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 sm:space-y-7">
              {data.domains.map((dom) => (
                <div key={dom.name} className="space-y-2 group">
                  <div className="flex items-end justify-between">
                    <span className="font-editorial text-lg sm:text-xl text-[#0C0907] font-medium group-hover:text-[#E8391B] transition-colors duration-300">
                      {dom.name}
                    </span>
                    <span className="font-editorial text-lg sm:text-xl text-[#0C0907] font-bold tabular-nums">
                      {dom.percentage}%
                    </span>
                  </div>

                  {/* Progress bar container */}
                  <div className="h-2 w-full bg-[#E5DEC9] rounded-full overflow-hidden relative">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-[#E8391B]"
                      initial={{ width: "0%" }}
                      animate={isInView ? { width: `${dom.percentage}%` } : { width: "0%" }}
                      transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>

                  <p className="font-body text-[#0C0907]/60 text-xs font-light tracking-wide leading-relaxed">
                    {dom.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}






