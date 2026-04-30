"use client";
// ─── Exhibit-Grade Presentation Components ────────────────────────────────────
// Smithsonian-quality glass cases, accession labels, nut-graf typographic
// anchors, breathing sections, and neoclassical entablature section breaks.
//
// These components translate the physical gravitas of a museum exhibit
// into digital form — every detail is intentional.

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

// ── ExhibitCase ───────────────────────────────────────────────────────────────
// Wraps content in a museum-vitrine container with recessed glass illusion.
// Sharp corners (not rounded) — vitrines are glass boxes.
export function ExhibitCase({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        background:
          "linear-gradient(168deg, rgba(12,16,24,0.95) 0%, rgba(8,11,18,0.98) 100%)",
        boxShadow:
          "inset 0 2px 20px rgba(0,0,0,0.8), inset 0 -1px 0 rgba(201,168,76,0.06), 0 0 80px rgba(201,168,76,0.03), 0 25px 80px rgba(0,0,0,0.4)",
        border: "1px solid rgba(201,168,76,0.08)",
        borderRadius: "2px",
      }}
    >
      {/* Top glass-edge highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 70%, transparent 90%)",
        }}
      />
      {children}
    </div>
  );
}

// ── AccessionLabel ────────────────────────────────────────────────────────────
// Museum-grade micro-typography label card.
// 11-12px floor for WCAG compliance, visual recession through color hierarchy.
export function AccessionLabel({
  title,
  date,
  medium,
  collection,
  accessionNumber,
  position = "bottom-right",
}: {
  title: string;
  date: string;
  medium?: string;
  collection: string;
  accessionNumber?: string;
  position?: "bottom-left" | "bottom-right";
}) {
  return (
    <div
      className={`absolute bottom-4 ${position === "bottom-left" ? "left-4" : "right-4"} z-10 max-w-[240px]`}
    >
      <div
        className="space-y-0.5 px-3 py-2"
        style={{
          background: "rgba(8,11,18,0.85)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(201,168,76,0.08)",
          borderRadius: "1px",
        }}
      >
        <p
          className="font-body font-semibold uppercase text-[rgba(201,168,76,0.6)]"
          style={{ fontSize: "11px", letterSpacing: "0.15em", fontWeight: 600 }}
        >
          {title}
        </p>
        <p
          className="font-body text-[rgba(201,168,76,0.4)]"
          style={{ fontSize: "11px", letterSpacing: "0.1em", fontWeight: 500 }}
        >
          {date}
        </p>
        {medium && (
          <p
            className="font-body italic text-[rgba(201,168,76,0.35)]"
            style={{ fontSize: "11px", fontWeight: 500 }}
          >
            {medium}
          </p>
        )}
        <p
          className="font-body text-[rgba(201,168,76,0.3)]"
          style={{ fontSize: "11px", letterSpacing: "0.08em", fontWeight: 500 }}
        >
          {collection}
        </p>
        {accessionNumber && (
          <p
            className="font-body text-[rgba(201,168,76,0.25)]"
            style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              fontWeight: 500,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {accessionNumber}
          </p>
        )}
      </div>
    </div>
  );
}

// ── NutGraf ───────────────────────────────────────────────────────────────────
// A single-sentence thesis in massive EB Garamond italic gold.
// The WSJ "nut graf" that tells you exactly what the section will prove.
export function NutGraf({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-8 ${className}`}
      style={{
        fontFamily: "'EB Garamond', 'Georgia', serif",
        fontSize: "clamp(28px, 4vw, 56px)",
        fontStyle: "italic",
        fontWeight: 400,
        lineHeight: 1.3,
        background:
          "linear-gradient(180deg, #E8C878 0%, #C9A84C 60%, #8B6A2A 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </motion.p>
  );
}

// ── Entablature ──────────────────────────────────────────────────────────────
// Neoclassical section break — replaces CinematicSectionBreak.
// Multi-layered horizontal rules with inscribed chapter numeral and title.
// Evokes the frieze above the columns of the Lincoln Memorial.
export function Entablature({
  chapter,
  title,
}: {
  chapter: string;
  title: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 70%)",
      }}
    >
      {/* Geneva stripes ambient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(135deg, rgba(201,168,76,0.015) 0px, rgba(201,168,76,0.015) 2px, transparent 2px, transparent 8px)",
        }}
      />

      <div className="mx-auto max-w-screen-lg px-4">
        {/* Top cornice — thin gold */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.3) 20%, rgba(201,168,76,0.5) 50%, rgba(201,168,76,0.3) 80%, transparent 100%)",
          }}
        />

        {/* Top cornice — thicker, darker */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-1 h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.15) 25%, rgba(201,168,76,0.25) 50%, rgba(201,168,76,0.15) 75%, transparent 95%)",
          }}
        />

        {/* Inscribed content */}
        <div className="py-8 text-center">
          {/* Chapter numeral — massive background */}
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none select-none font-hero leading-none"
            style={{
              fontSize: "clamp(80px, 14vw, 180px)",
              background:
                "linear-gradient(180deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.03) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.08em",
            }}
          >
            {chapter}
          </motion.p>

          {/* Title — inscription style */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-body font-semibold uppercase text-[#C9A84C]"
            style={{
              fontSize: "clamp(11px, 1.2vw, 14px)",
              letterSpacing: "0.35em",
              marginTop: "-0.5em",
              textShadow:
                "0 1px 0 rgba(245,240,232,0.08), 0 -1px 0 rgba(0,0,0,0.6)",
            }}
          >
            {title}
          </motion.p>
        </div>

        {/* Bottom cornice — thicker */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.15) 25%, rgba(201,168,76,0.25) 50%, rgba(201,168,76,0.15) 75%, transparent 95%)",
          }}
        />

        {/* Bottom cornice — thin gold */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-1 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.3) 20%, rgba(201,168,76,0.5) 50%, rgba(201,168,76,0.3) 80%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}

// ── BreathingSection ─────────────────────────────────────────────────────────
// Full-viewport emotional reset between chapters.
// A single word, a pulsing gold dot, a moment of silence before the next movement.
export function BreathingSection({
  word,
}: {
  word: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0, 1, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.85, 1, 1, 1, 0.9]
  );

  return (
    <div
      ref={ref}
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden"
    >
      {/* Marble texture ambient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/constitution/marble-texture.webp')",
          backgroundRepeat: "repeat",
          backgroundSize: "512px 512px",
          opacity: 0.025,
          mixBlendMode: "screen",
        }}
      />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center"
      >
        {/* Pulsing gold dot */}
        <motion.div
          className="mx-auto mb-8 h-2 w-2 rounded-full bg-[#C9A84C]"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(201,168,76,0.4)",
              "0 0 0 20px rgba(201,168,76,0)",
              "0 0 0 0 rgba(201,168,76,0.4)",
            ],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Single word — inscription style */}
        <p
          className="select-none font-hero uppercase"
          style={{
            fontSize: "clamp(48px, 8vw, 120px)",
            letterSpacing: "0.25em",
            background:
              "linear-gradient(180deg, rgba(201,168,76,0.25) 0%, rgba(201,168,76,0.08) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
          }}
        >
          {word}
        </p>
      </motion.div>
    </div>
  );
}

// ── InscriptionText ──────────────────────────────────────────────────────────
// For the most important statements — carved-in-stone typography.
export function InscriptionText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`font-hero uppercase ${className}`}
      style={{
        letterSpacing: "0.2em",
        fontWeight: 400,
        textShadow:
          "0 1px 0 rgba(245,240,232,0.12), 0 -1px 0 rgba(0,0,0,0.7)",
        color: "rgba(201,168,76,0.7)",
      }}
    >
      {children}
    </motion.p>
  );
}

// ── ScrollToDissolveEntrance ──────────────────────────────────────────────────
// The "curtain rises" moment. A fixed overlay title card that dissolves as
// the user scrolls DOWN. Fully reversible — scrolling back up restores it.
// Only responds to positive scroll (overscroll / bounce up won't trigger it).
export function ScrollToDissolveEntrance({
  isRo,
}: {
  isRo: boolean;
}) {
  const { scrollY } = useScroll();

  // Dissolve within first 150px of downward scroll
  // useTransform clamps below 0, so upward overscroll keeps opacity at 1
  const overlayOpacity = useTransform(scrollY, [0, 60, 150], [1, 0.3, 0]);
  const titleScale = useTransform(scrollY, [0, 150], [1, 0.95]);
  const titleY = useTransform(scrollY, [0, 150], [0, -30]);
  const scrollHintOpacity = useTransform(scrollY, [0, 20, 80], [0.7, 0.5, 0]);

  // pointer-events disabled when substantially dissolved (reversible)
  const [interactive, setInteractive] = useState(true);
  useMotionValueEvent(scrollY, "change", (v) => {
    setInteractive(v < 100);
  });

  return (
    <motion.div
      className={`fixed inset-0 z-40 flex items-center justify-center ${!interactive ? "pointer-events-none" : ""}`}
      style={{ opacity: overlayOpacity }}
    >
      {/* Heavy vault darkness */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, #0A0E16 0%, #020406 100%)",
        }}
      />

      {/* Marble texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/constitution/marble-texture.webp')",
          backgroundRepeat: "repeat",
          backgroundSize: "512px 512px",
          opacity: 0.015,
          mixBlendMode: "screen",
        }}
      />

      <motion.div
        className="relative z-10 text-center px-6"
        style={{ scale: titleScale, y: titleY }}
      >
        {/* Stars row — top */}
        <p
          className="mb-6 select-none text-[#C9A84C]"
          style={{
            fontSize: "clamp(10px, 1.2vw, 14px)",
            letterSpacing: "0.5em",
          }}
        >
          ★ ★ ★ ★ ★ ★ ★ ★ ★
        </p>

        {/* Title */}
        <h1
          className="select-none font-hero uppercase"
          style={{
            fontSize: "clamp(28px, 5vw, 64px)",
            letterSpacing: "0.15em",
            color: "#F5F0E8",
          }}
        >
          {isRo ? "CONSTITUȚIA" : "THE CONSTITUTION"}
        </h1>
        <p
          className="mt-3 select-none"
          style={{
            fontFamily: "'EB Garamond', 'Georgia', serif",
            fontSize: "clamp(14px, 2vw, 24px)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "rgba(201,168,76,0.65)",
          }}
        >
          {isRo
            ? "a Statelor Unite ale Americii"
            : "of the United States of America"}
        </p>

        {/* Divider */}
        <div
          className="mx-auto mt-8 h-px w-24"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
          }}
        />

        <p
          className="mt-5 select-none font-body text-[#6B6860]"
          style={{
            fontSize: "clamp(10px, 1vw, 12px)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          {isRo ? "Un Exhibit Interactiv" : "An Interactive Exhibit"}
        </p>

        {/* Stars row — bottom */}
        <p
          className="mt-6 select-none text-[#C9A84C]"
          style={{
            fontSize: "clamp(10px, 1.2vw, 14px)",
            letterSpacing: "0.5em",
          }}
        >
          ★ ★ ★ ★ ★ ★ ★ ★ ★
        </p>
      </motion.div>

      {/* Scroll-to-enter hint */}
      <motion.div
        className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        style={{ opacity: scrollHintOpacity }}
      >
        <p
          className="font-body uppercase text-[#6B6860]"
          style={{ fontSize: "10px", letterSpacing: "0.3em" }}
        >
          {isRo ? "Derulează pentru a Intra" : "Scroll to Enter"}
        </p>
        <motion.div
          className="h-6 w-px bg-gradient-to-b from-[rgba(201,168,76,0.4)] to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── WeThePeople ──────────────────────────────────────────────────────────────
// Dedicated scroll-locked section for the "We the People" reveal.
// Its own 120vh container gives it ~20vh of comfortable scroll visibility
// before the user moves into the CinematicHero.
export function WeThePeople({ isRo }: { isRo: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Stay fully visible through most of the section, fade out at the end
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.9]);
  const y       = useTransform(scrollYProgress, [0.6, 1], [0, -60]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#080B12]"
      style={{ height: "120vh" }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Subtle marble ambient */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url('/images/constitution/marble-texture.webp')",
            backgroundRepeat: "repeat",
            backgroundSize: "512px 512px",
            opacity: 0.02,
            mixBlendMode: "screen",
          }}
        />

        <motion.div
          className="relative z-10 text-center"
          style={{ opacity, scale, y, willChange: "transform, opacity" }}
        >
          <p
            className="select-none"
            style={{
              fontFamily: "'EB Garamond', 'Georgia', serif",
              fontSize: "clamp(48px, 10vw, 120px)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#C9A84C",
              textShadow: "0 0 80px rgba(201,168,76,0.3), 0 0 160px rgba(201,168,76,0.1)",
              letterSpacing: "0.04em",
            }}
          >
            We the People
          </p>
          <p className="mt-4 font-body text-sm tracking-[0.3em] uppercase text-[#6B6860]">
            {isRo ? "Statele Unite ale Americii · Înf. 1776" : "United States of America · Est. 1776"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ── ConservationSpotlight ────────────────────────────────────────────────────
// Wraps an artifact in an archival vault spotlight.
// The darkness is heavy (not empty). The spotlight has a warm amber tint
// like the controlled lighting in the Archives Rotunda.
export function ConservationSpotlight({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Spotlight expands from 20% to 100% radius as element enters viewport center
  const spotlightRadius = useTransform(scrollYProgress, [0, 0.5, 1], [15, 50, 100]);
  const spotlightOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 0.7, 1]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {children}
      {/* Conservation-grade spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          opacity: useTransform(spotlightOpacity, (v: number) => 1 - v),
          background: "radial-gradient(circle at 50% 50%, transparent 0%, transparent 20%, rgba(4,6,10,0.97) 45%)",
        }}
      />
      {/* Warm amber tint on the spotlight edge */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay"
        style={{
          opacity: useTransform(spotlightRadius, (r: number) => r < 60 ? 0.08 : 0),
          background: "radial-gradient(circle at 50% 50%, rgba(201,168,76,0.15) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

// ── ChapterFooter ────────────────────────────────────────────────────────────
// Persistent running chapter indicator at viewport bottom.
// Replaces the 2xl-only sidebar with something always visible.
// Uses IntersectionObserver to detect which chapter is in view.
const CHAPTER_IDS = [
  { id: "overview", chapter: "I", en: "The Living Document", ro: "Documentul Viu" },
  { id: "the-document", chapter: "I", en: "The Living Document", ro: "Documentul Viu" },
  { id: "founders", chapter: "II", en: "Architects of Liberty", ro: "Arhitecții Libertății" },
  { id: "bill-of-rights", chapter: "III", en: "Bill of Rights", ro: "Declarația Drepturilor" },
  { id: "separation-of-powers", chapter: "IV", en: "Separation of Powers", ro: "Separarea Puterilor" },
  { id: "federalism", chapter: "V", en: "Laboratories of Democracy", ro: "Laboratoare ale Democrației" },
  { id: "track-record", chapter: "VI", en: "250 Years of Evidence", ro: "250 de Ani de Dovezi" },
  { id: "constitution-race", chapter: "VI", en: "250 Years of Evidence", ro: "250 de Ani de Dovezi" },
  { id: "rights-at-risk", chapter: "VII", en: "Global Context", ro: "Context Global" },
  { id: "world-without", chapter: "VIII", en: "The World Without", ro: "Lumea Fără" },
  { id: "explore", chapter: "VIII", en: "The World Without", ro: "Lumea Fără" },
];

export function ChapterFooter({ isRo }: { isRo: boolean }) {
  const [activeChapter, setActiveChapter] = useState<typeof CHAPTER_IDS[0] | null>(null);

  useEffect(() => {
    const observerMap = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          observerMap.set(entry.target.id, entry);
        });

        // Find the topmost visible section
        let topmost: typeof CHAPTER_IDS[0] | null = null;
        let topmostTop = Infinity;
        for (const ch of CHAPTER_IDS) {
          const entry = observerMap.get(ch.id);
          if (entry?.isIntersecting && entry.boundingClientRect.top < topmostTop) {
            topmost = ch;
            topmostTop = entry.boundingClientRect.top;
          }
        }
        setActiveChapter(topmost);
      },
      { threshold: 0.1, rootMargin: "-10% 0px -10% 0px" }
    );

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      CHAPTER_IDS.forEach((ch) => {
        const el = document.getElementById(ch.id);
        if (el) observer.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {activeChapter && (
        <motion.div
          key="chapter-footer"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
        >
          <div
            className="mx-auto flex max-w-screen-lg items-center justify-center gap-4 px-4 py-3"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(8,11,18,0.9) 40%)",
            }}
          >
            {/* Left line */}
            <div
              className="hidden h-px flex-1 sm:block"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2))",
              }}
            />

            {/* Chapter indicator */}
            <p
              className="font-body uppercase text-[rgba(201,168,76,0.5)]"
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                fontWeight: 600,
              }}
            >
              <span className="text-[rgba(201,168,76,0.3)]">
                {isRo ? "Capitol" : "Chapter"} {activeChapter.chapter}{" "}
                {isRo ? "din" : "of"} VIII
              </span>
              <span className="mx-3 text-[rgba(201,168,76,0.15)]">·</span>
              <span>{isRo ? activeChapter.ro : activeChapter.en}</span>
            </p>

            {/* Right line */}
            <div
              className="hidden h-px flex-1 sm:block"
              style={{
                background: "linear-gradient(90deg, rgba(201,168,76,0.2), transparent)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
