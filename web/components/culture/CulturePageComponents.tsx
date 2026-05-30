"use client";
// ─────────────────────────────────────────────────────────────────────────────
// CulturePageComponents.tsx — Client components for /culture landing page
// "Life Magazine meets The Atlantic" — the warmest vertical on the site.
// ─────────────────────────────────────────────────────────────────────────────

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
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
} from "@/lib/data/culture-data";

// ─── Culture Palette Injection ───────────────────────────────────────────────

export function CultureStyles() {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');
      .culture-bg { background-color: #0C0907; }
      .culture-cream-bg { background-color: #F5EDD8; }
      .culture-red { color: #E8391B; }
      .font-editorial { font-family: 'EB Garamond', 'Playfair Display', Georgia, serif; }

      @keyframes marquee-left {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-50%, 0, 0); }
      }
      @keyframes marquee-right {
        0% { transform: translate3d(-50%, 0, 0); }
        100% { transform: translate3d(0, 0, 0); }
      }
      .animate-marquee-left {
        animation: marquee-left 45s linear infinite;
      }
      .animate-marquee-right {
        animation: marquee-right 45s linear infinite;
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translate3d(0, 20px, 0); }
        to { opacity: 1; transform: translate3d(0, 0, 0); }
      }
      .animate-fade-in-up {
        animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
    `}</style>
  );
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
      {/* Filmstrip mosaic grid */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-0">
        {FILMSTRIP_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden"
            style={{ y: yOffsets[i] }}
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

      {/* Dark gradient overlay — bottom 60% */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,9,7,0.1) 0%, rgba(12,9,7,0.3) 30%, rgba(12,9,7,0.85) 60%, rgba(12,9,7,0.98) 80%, #0C0907 100%)",
        }}
      />

      {/* Film grain texture overlay */}
      <div className="absolute inset-0 bg-opening-noise opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end min-h-[100dvh] px-6 sm:px-8 lg:px-16 pb-16 md:pb-24">
        {/* Eyebrow */}
        <motion.p
          className="font-body text-[11px] sm:text-xs uppercase tracking-[0.3em] text-glory-gold mb-5 font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          {eyebrow}
        </motion.p>

        {/* Main Title */}
        <motion.h1
          className="font-hero text-white leading-[0.9] mb-6"
          style={{ fontSize: "clamp(48px, 10vw, 140px)", letterSpacing: "0.02em" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <span className="block">{titleLine1}</span>
          <span className="block text-glory-gold">{titleLine2}</span>
        </motion.h1>

        {/* Deck */}
        <motion.p
          className="font-editorial text-[#F5EDD8]/80 italic text-lg sm:text-xl lg:text-2xl max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
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
            preload="auto"
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
    <section id="culture-stats" className="culture-bg py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
            >
              <p className="font-hero text-glory-gold text-3xl sm:text-4xl md:text-5xl mb-2 tabular-nums">
                {stat.value}
              </p>
              <p className="font-body text-[#F5EDD8]/60 text-xs sm:text-sm uppercase tracking-wider font-medium">
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
    <section id="culture-thesis" className="culture-bg py-20 md:py-32">
      <div className="mx-auto max-w-[700px] px-6 sm:px-8">
        {/* Pull Quote */}
        <motion.blockquote
          className="relative text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          {/* Decorative opening quote */}
          <span
            className="block font-editorial text-glory-gold/20 text-[120px] leading-none select-none -mb-12"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          {/* Gold bar */}
          <motion.div
            className="w-16 h-0.5 bg-glory-gold mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.2 }}
          />

          <p className="font-editorial italic text-[#F5EDD8] text-2xl sm:text-3xl lg:text-4xl leading-[1.5] mb-6">
            &ldquo;{thesis.pullQuote}&rdquo;
          </p>

          <cite className="not-italic font-body text-glory-gold text-sm uppercase tracking-[0.2em] font-semibold">
            — {thesis.attribution}
          </cite>
        </motion.blockquote>

        {/* Editorial paragraphs */}
        {thesis.paragraphs.map((p, i) => (
          <motion.p
            key={i}
            className="font-editorial text-[#F5EDD8]/70 text-lg leading-[1.8] mb-6 last:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: 0.2 + i * 0.15,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
          >
            {p}
          </motion.p>
        ))}
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
    <section id="culture-pillars" className="culture-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section title & Header */}
        <div className="mb-16 text-left">
          <span className="font-body text-glory-gold text-xs font-semibold uppercase tracking-[0.2em] block mb-3">
            THE SOFT POWER ARSENAL
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#F5EDD8] leading-tight">
            Dimensions of Global Influence
          </h2>
        </div>

        {/* Cinematic Bento-style pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const scheme = PILLAR_GLOW_SCHEMES[i % PILLAR_GLOW_SCHEMES.length];

            return (
              <div
                key={i}
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.01] p-6 md:p-8 flex flex-col justify-between group shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/[0.02] min-h-[220px] opacity-0 animate-fade-in-up",
                  scheme.border
                )}
                style={{
                  animationDelay: `${i * 80}ms`,
                }}
              >
                {/* Glowing pools at top right */}
                <div className={cn("absolute -right-16 -top-16 w-36 h-36 rounded-full bg-gradient-to-br filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none", scheme.color)} />
                
                {/* Top Row: Domain name + Emoji Container */}
                <div className="flex items-center justify-between w-full mb-8 relative z-10">
                  <span className="font-body text-[10px] sm:text-xs tracking-[0.25em] text-[#F5EDD8]/40 group-hover:text-[#F5EDD8]/80 transition-colors duration-300 font-bold uppercase">
                    {pillar.domain}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 select-none">
                    {pillar.emoji}
                  </div>
                </div>

                {/* Bottom content: Huge metric + Label */}
                <div className="flex flex-col items-start mt-auto relative z-10">
                  <span className="font-editorial italic text-4xl sm:text-5xl text-[#F5EDD8] group-hover:text-white transition-colors duration-300 tracking-tight leading-none">
                    {pillar.stat}
                  </span>
                  <span className="font-body text-xs text-[#F5EDD8]/40 group-hover:text-[#F5EDD8]/70 transition-colors duration-300 font-medium leading-relaxed mt-3">
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
        className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
        sizes="(max-width: 768px) 280px, 40vw"
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,9,7,0.15) 0%, rgba(12,9,7,0.55) 50%, rgba(12,9,7,0.92) 100%)",
        }}
      />

      {/* Hover gold border */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-glory-gold/50 transition-colors duration-500 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 z-10">
        {/* Top — category label */}
        <p className="font-hero text-glory-gold text-[10px] sm:text-[11px] uppercase tracking-[0.2em]">
          {isAlt ? card.category.replace("Food", "Kitchen") : card.category}
        </p>

        {/* Bottom — title + stat */}
        <div>
          <h3 className="font-hero text-white text-xl sm:text-2xl lg:text-3xl leading-tight mb-2">
            {isAlt ? "The American Kitchen" : card.title}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="font-hero text-glory-gold text-lg tabular-nums">
              {card.stat}
            </span>
            <span className="font-body text-[#F5EDD8]/50 text-[10px] uppercase tracking-wider">
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
    <section id="culture-argument" className="culture-cream-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section label */}
        <motion.p
          className="font-hero text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/40 mb-10 font-semibold text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          {sectionTitle}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {arguments_.map((arg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
            >
              {/* Gold accent line */}
              <div className="w-10 h-0.5 bg-[#C9A84C] mb-5" />

              <h3 className="font-hero text-[#0C0907] text-lg uppercase tracking-wider mb-3">
                {arg.title}
              </h3>
              <p className="font-editorial text-[#0C0907]/70 text-base leading-[1.7]">
                {arg.body}
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
  return (
    <section id="culture-radar" className="culture-bg py-16 md:py-24 border-t border-white/5">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <motion.h2
          className="font-editorial italic text-[#F5EDD8] text-2xl sm:text-3xl text-center mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          {headline}
        </motion.h2>

        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <ResponsiveContainer width="100%" height={420}>
            <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
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
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Radar
                name="UK"
                dataKey="UK"
                stroke="rgba(148,163,184,0.5)"
                fill="rgba(148,163,184,0.08)"
                strokeWidth={1}
              />
              <Radar
                name="France"
                dataKey="France"
                stroke="rgba(148,163,184,0.4)"
                fill="rgba(148,163,184,0.05)"
                strokeWidth={1}
              />
              <Radar
                name="Japan"
                dataKey="Japan"
                stroke="rgba(148,163,184,0.35)"
                fill="rgba(148,163,184,0.04)"
                strokeWidth={1}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "12px",
                  fontFamily: "Inter",
                  color: "#F5EDD8",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <Link
            href={ctaHref}
            className="font-body text-glory-gold hover:text-glory-gold/80 text-sm font-semibold tracking-wider uppercase transition-colors"
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
    <section id="culture-quotes" className="culture-bg py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-3xl px-6 sm:px-8 text-center">
        <div className="relative min-h-[260px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              {/* Gold bar */}
              <div className="w-12 h-0.5 bg-glory-gold mb-8" />

              <p className="font-editorial italic text-[#F5EDD8] text-xl sm:text-2xl lg:text-3xl leading-[1.6] mb-8 max-w-2xl">
                &ldquo;{quotes[active].text}&rdquo;
              </p>

              <footer>
                <cite className="not-italic font-body text-glory-gold text-sm font-semibold uppercase tracking-[0.15em] block mb-1">
                  — {quotes[active].author}
                </cite>
                <span className="font-body text-[#F5EDD8]/40 text-xs">
                  {quotes[active].role}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Quote ${i + 1}`}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i === active
                  ? "bg-glory-gold w-6"
                  : "bg-white/20 hover:bg-white/40",
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

// ─── §11 — Looping Video Section ─────────────────────────────────────────────

export function CultureLoopingVideoSection() {
  return (
    <section className="relative w-full h-[40vh] overflow-hidden culture-bg">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover pointer-events-none brightness-[0.5] saturate-[0.8]"
      >
        <source src="/videos/times-square-aerial.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Seamless fading overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0907] via-transparent to-[#0C0907] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(12,9,7,0.7)_100%)] pointer-events-none" />
    </section>
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
          <div className="flex items-center gap-16 pr-16">
            {BRAND_LOGOS_ROW_1.map((logo) => (
              <div
                key={`${logo.name}-row1-track1`}
                className="inline-flex items-center justify-center w-28 md:w-36 h-12 md:h-16"
              >
                <img
                  src={`/assets/companies/${logo.file}`}
                  alt={logo.name}
                  className={cn(
                    "h-8 md:h-12 w-auto object-contain grayscale opacity-75 hover:opacity-100 hover:grayscale-0 transition-all duration-300 pointer-events-none select-none",
                    logo.invert && "invert brightness-200"
                  )}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          {/* Track 2 */}
          <div className="flex items-center gap-16 pr-16" aria-hidden="true">
            {BRAND_LOGOS_ROW_1.map((logo) => (
              <div
                key={`${logo.name}-row1-track2`}
                className="inline-flex items-center justify-center w-28 md:w-36 h-12 md:h-16"
              >
                <img
                  src={`/assets/companies/${logo.file}`}
                  alt={logo.name}
                  className={cn(
                    "h-8 md:h-12 w-auto object-contain grayscale opacity-75 hover:opacity-100 hover:grayscale-0 transition-all duration-300 pointer-events-none select-none",
                    logo.invert && "invert brightness-200"
                  )}
                  loading="lazy"
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
          <div className="flex items-center gap-16 pr-16">
            {BRAND_LOGOS_ROW_2.map((logo) => (
              <div
                key={`${logo.name}-row2-track1`}
                className="inline-flex items-center justify-center w-28 md:w-36 h-12 md:h-16"
              >
                <img
                  src={`/assets/companies/${logo.file}`}
                  alt={logo.name}
                  className={cn(
                    "h-8 md:h-12 w-auto object-contain grayscale opacity-75 hover:opacity-100 hover:grayscale-0 transition-all duration-300 pointer-events-none select-none",
                    logo.invert && "invert brightness-200"
                  )}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          {/* Track 2 */}
          <div className="flex items-center gap-16 pr-16" aria-hidden="true">
            {BRAND_LOGOS_ROW_2.map((logo) => (
              <div
                key={`${logo.name}-row2-track2`}
                className="inline-flex items-center justify-center w-28 md:w-36 h-12 md:h-16"
              >
                <img
                  src={`/assets/companies/${logo.file}`}
                  alt={logo.name}
                  className={cn(
                    "h-8 md:h-12 w-auto object-contain grayscale opacity-75 hover:opacity-100 hover:grayscale-0 transition-all duration-300 pointer-events-none select-none",
                    logo.invert && "invert brightness-200"
                  )}
                  loading="lazy"
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

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.7, 1.0], [0.3, 0.8, 1.0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center px-6 sm:px-12 bg-black"
    >
      {/* Background Image */}
      <motion.div style={{ scale }} className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src={bgImageSrc}
          alt="Bono quote background"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.2] contrast-[1.1]"
          priority={false}
        />
      </motion.div>

      {/* Aesthetic Overlay Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0907] via-transparent to-[#0C0907] pointer-events-none" />

      {/* Content Panel */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center"
      >
        <span className="font-body text-glory-gold/80 text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold mb-6 sm:mb-8 block">
          THE AMERICAN ESSENCE
        </span>

        <h2 className="font-editorial italic text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-relaxed tracking-wide mb-8 sm:mb-12 max-w-4xl mx-auto px-4">
          &ldquo;{quote.text}&rdquo;
        </h2>

        <div className="w-16 h-0.5 bg-glory-gold/60 mb-6 sm:mb-8" />

        <footer>
          <cite className="not-italic font-body text-glory-gold text-sm sm:text-base font-semibold uppercase tracking-[0.15em] block mb-2">
            — {quote.author}
          </cite>
          <span className="font-body text-[#F5EDD8]/50 text-xs sm:text-sm">
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
    <section className="culture-bg py-20 md:py-28 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12 flex justify-between items-end">
        <div>
          <span className="font-body text-glory-gold text-xs font-semibold uppercase tracking-[0.2em] block mb-2">
            CHRONOLOGY OF INFLUENCE
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#F5EDD8]">
            {sectionTitle}
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#F5EDD8] hover:border-glory-gold hover:text-glory-gold transition-colors text-lg"
            aria-label="Scroll Left"
          >
            ←
          </button>
          <button
            onClick={scrollRight}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#F5EDD8] hover:border-glory-gold hover:text-glory-gold transition-colors text-lg"
            aria-label="Scroll Right"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-none px-6 sm:px-8 md:px-16 lg:px-24 pb-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {decades.map((dec, idx) => {
          const imgKey = dec.imageKey as keyof typeof SITE_IMAGES.culture;
          const imageSrc = SITE_IMAGES.culture[imgKey] || SITE_IMAGES.culture.statueOfLiberty;

          return (
            <div
              key={dec.year}
              className="flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] snap-start bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden group hover:border-glory-gold/40 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="p-6 md:p-8 flex flex-col gap-2">
                <span className="font-body text-7xl md:text-8xl font-black text-white/5 group-hover:text-glory-gold/10 transition-colors duration-500 leading-none">
                  {dec.year}
                </span>
                <h3 className="font-editorial italic text-xl md:text-2xl text-glory-gold group-hover:text-white transition-colors duration-300">
                  {dec.title}
                </h3>
              </div>

              <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={dec.title}
                  fill
                  sizes="(max-width: 768px) 80vw, 30vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0907] via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-6 md:p-8 border-t border-white/5 bg-black/20">
                <p className="font-body text-[#F5EDD8]/70 text-sm sm:text-base leading-relaxed">
                  {dec.sentence}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── §15 — Soft Power Budget ────────────────────────────────────────────────

interface CultureSoftPowerBudgetProps {
  budgetLines: SoftPowerBudgetLine[];
}

export function CultureSoftPowerBudget({ budgetLines }: CultureSoftPowerBudgetProps) {
  return (
    <section className="culture-cream-bg py-24 md:py-32 border-y border-black/5 text-[#0C0907]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col gap-16 md:gap-24">
        {budgetLines.map((line, idx) => {
          const isUsa = line.label.includes("American") || line.label.includes("private") || line.label.includes("SUA") || line.label.includes("private");
          const isRo = line.label.includes("Franța") || line.label.includes("SUA");

          let fullDigits = line.value;
          if (line.value.includes("B") || line.value.includes("Mld")) {
            fullDigits = line.value.includes("$")
              ? (isRo ? "$900.000.000.000" : "$900,000,000,000")
              : (isRo ? "€4.000.000.000" : "€4,000,000,000");
          } else if (line.value.includes("M")) {
            fullDigits = isRo ? "£900.000.000" : "£900,000,000";
          }

          return (
            <motion.div
              key={line.label}
              className="flex flex-col items-center justify-center"
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

              <span className="font-body text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold opacity-60 max-w-md block">
                {line.label}
              </span>

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

interface CultureArchiveVaultProps {
  isRo: boolean;
}

export function CultureArchiveVault({ isRo }: CultureArchiveVaultProps) {
  const [activeTab, setActiveTab] = useState<"cinema" | "music" | "editorial">("cinema");

  const tabs = [
    { id: "cinema", label: isRo ? "Cinema" : "Cinema" },
    { id: "music", label: isRo ? "Muzică" : "Music" },
    { id: "editorial", label: isRo ? "Publicații" : "Editorial" },
  ] as const;

  const getItems = () => {
    switch (activeTab) {
      case "cinema":
        return CINEMA_ITEMS;
      case "music":
        return MUSIC_ITEMS;
      case "editorial":
        return EDITORIAL_ITEMS;
    }
  };

  const title = isRo ? "ARHIVA CULTURALĂ" : "THE ARCHIVE VAULT";
  const subtitle = isRo
    ? "O selecție de exporturi culturale de referință care au modelat imaginația globală."
    : "A curated archive of landmark cultural exports that defined global creative expression.";

  return (
    <section className="culture-bg py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
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
        <div className="flex justify-center border-b border-white/10 mb-12 max-w-md mx-auto">
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
                  <motion.div
                    key={`${activeTab}-${item.imageKey}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group flex flex-col items-center text-center cursor-pointer"
                  >
                    {/* Poster/Cover Frame */}
                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-black/40 border border-white/5 shadow-2xl transition-all duration-500 group-hover:border-glory-gold/40 group-hover:shadow-[0_20px_50px_rgba(212,175,55,0.08)] mb-4">
                      <Image
                        src={imageSrc}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover grayscale transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:grayscale-0 group-hover:scale-105"
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
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─── §17 — Living Media Wall ─────────────────────────────────────────────────

const MOBILE_SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1"
];

const TABLET_SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-2 row-span-2",
  "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1"
];

const DESKTOP_SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-2",
  "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-2 row-span-2",
  "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-2",
  "col-span-1 row-span-2",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1",
  "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1"
];

interface ShiftingGridCellProps {
  src: string;
  isColor: boolean;
}

export function ShiftingGridCell({ src, isColor }: ShiftingGridCellProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black/60 rounded border border-white/[0.03]">
      <AnimatePresence>
        <motion.div
          key={src}
          initial={{ opacity: 0 }}
          animate={{ opacity: isColor ? 0.9 : 0.45 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 2.0, ease: "easeInOut" } 
          }}
          transition={{
            opacity: { duration: 2.0, ease: "easeInOut" },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={src}
            alt="Cultural artifact"
            className={cn(
              "w-full h-full object-cover",
              isColor ? "" : "grayscale"
            )}
            loading="lazy"
          />
          {/* Dimming layer instead of heavy GPU filter */}
          {!isColor && (
            <div className="absolute inset-0 bg-black/35 pointer-events-none" />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function CultureLivingMediaWall() {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [visibleImages, setVisibleImages] = useState<string[]>([]);
  const [colorStates, setColorStates] = useState<boolean[]>([]);
  
  const unusedRef = useRef<string[]>([]);
  const usedRef = useRef<string[]>([]);

  // Detect screen size on client
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize pool on mount
  useEffect(() => {
    const shuffled = [...CULTURE_MEDIA_WALL_IMAGES].sort(() => Math.random() - 0.5);
    const initial = shuffled.slice(0, 40); // Max size of our layout spans (39)
    const unused = shuffled.slice(40);
    
    setVisibleImages(initial);
    setColorStates(Array.from({ length: 40 }, () => Math.random() < 0.12));
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
    if (visibleImages.length === 0) return;

    const interval = setInterval(() => {
      const spansCount = screenSize === 'mobile' ? 25 : screenSize === 'tablet' ? 30 : 39;
      const randIndex = Math.floor(Math.random() * spansCount);
      const nextImg = getNewImage();

      setVisibleImages((prev) => {
        const next = [...prev];
        next[randIndex] = nextImg;
        return next;
      });

      setColorStates((prev) => {
        const next = [...prev];
        next[randIndex] = Math.random() < 0.12;
        return next;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [visibleImages, screenSize, getNewImage]);

  if (visibleImages.length === 0) return null;

  const spans = screenSize === 'mobile' ? MOBILE_SPANS :
                screenSize === 'tablet' ? TABLET_SPANS :
                                          DESKTOP_SPANS;

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden select-none flex items-center justify-center">
      {/* Full-Viewport Shifting Grid */}
      <div
        className="grid gap-2 p-2 w-full h-full grid-flow-dense"
        style={{
          gridTemplateColumns: screenSize === 'mobile' ? 'repeat(4, minmax(0, 1fr))' :
                               screenSize === 'tablet' ? 'repeat(6, minmax(0, 1fr))' :
                                                         'repeat(8, minmax(0, 1fr))',
          gridTemplateRows: screenSize === 'mobile' ? 'repeat(8, minmax(0, 1fr))' :
                            screenSize === 'tablet' ? 'repeat(7, minmax(0, 1fr))' :
                                                      'repeat(7, minmax(0, 1fr))'
        }}
      >
        {spans.map((spanClass, idx) => (
          <div
            key={idx}
            className={cn("w-full h-full relative", spanClass)}
          >
            <ShiftingGridCell
              src={visibleImages[idx]}
              isColor={colorStates[idx]}
            />
          </div>
        ))}
      </div>

      {/* Ambient Dark Overlay to make the grid feel cohesive */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </section>
  );
}


