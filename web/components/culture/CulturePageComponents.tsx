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
import type {
  CultureStat,
  CultureThesis,
  CulturePillar,
  CultureSubpage,
  CultureArgument,
  CultureQuote,
  CultureRadarPoint,
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

// ─── §2 — Numbers Strip ──────────────────────────────────────────────────────

interface CultureNumbersStripProps {
  stats: CultureStat[];
}

export function CultureNumbersStrip({ stats }: CultureNumbersStripProps) {
  return (
    <section id="culture-stats" className="culture-bg border-t border-white/5 py-16 md:py-20">
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

interface CulturePillarsStripProps {
  pillars: CulturePillar[];
}

export function CulturePillarsStrip({ pillars }: CulturePillarsStripProps) {
  return (
    <section id="culture-pillars" className="culture-bg border-t border-white/5 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 lg:gap-4">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              className="text-center border-b-2 border-glory-gold/30 pb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
            >
              <span className="text-2xl mb-2 block" aria-hidden="true">
                {pillar.emoji}
              </span>
              <p className="font-hero text-glory-gold text-xs uppercase tracking-[0.15em] mb-2">
                {pillar.domain}
              </p>
              <p className="font-hero text-[#F5EDD8] text-2xl lg:text-3xl mb-1 tabular-nums">
                {pillar.stat}
              </p>
              <p className="font-body text-[#F5EDD8]/40 text-[10px] uppercase tracking-wider leading-tight">
                {pillar.statLabel}
              </p>
            </motion.div>
          ))}
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
    <section id="culture-grid" className="culture-bg py-16 md:py-24">
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
