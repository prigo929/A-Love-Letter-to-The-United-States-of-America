"use client";
// ─── Exhibit-Grade Presentation Components ────────────────────────────────────
// Smithsonian-quality glass cases, accession labels, nut-graf typographic
// anchors, breathing sections, and neoclassical entablature section breaks.
//
// These components translate the physical gravitas of a museum exhibit
// into digital form — every detail is intentional.

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

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
