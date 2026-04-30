"use client";
// ─── Cinematic Storytelling Components ─────────────────────────────────────────
// This file contains high-end UI components that help tell the story of
// the Constitution in a "Cinematic" way.
//
// For Beginners: These components use "Props" (properties) to customize how they look.
// For example, "isRo" is a prop that tells the component to show Romanian text.

import { useRef, useMemo, useId } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useInView,
  animate,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
import type { PresidentialTransfer } from "@/lib/data/constitution-data";

// ─── CountUp (local) ──────────────────────────────────────────────────────────

function CountUp({ to, suffix = "", delay = 0 }: { to: number; suffix?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      animate(mv, to, {
        duration: 2.4,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => {
          if (!ref.current) return;
          ref.current.textContent =
            v.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
        },
      });
    }, delay);
    return () => clearTimeout(t);
  }, [inView, to, delay, mv, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

// 1. CINEMATIC STAT — A huge, impact-focused number.
// We use this to highlight scale, like the "$31 Trillion economy" or "237 years".
export function CinematicStat({
  value,
  suffix = "",
  label,
  sublabel,
}: {
  value: number;
  suffix?: string;
  label: string;
  sublabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0, 1, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.8, 1, 1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -40]);

  return (
    <div
      ref={ref}
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden"
      style={{ position: "relative" }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-4"
      >
        <p
          className="font-hero leading-none"
          style={{
            fontSize: "clamp(80px, 15vw, 200px)",
            background:
              "linear-gradient(180deg, #F5F0E8 0%, #E8C878 30%, #C9A84C 60%, #8B6A2A 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.02em",
          }}
        >
          <CountUp to={value} suffix={suffix} />
        </p>
        <p className="mt-4 font-body text-lg font-medium tracking-wide text-[#B8B4AC] md:text-xl">
          {label}
        </p>
        {sublabel && (
          <p className="mt-2 font-body text-sm text-[#6B6860]">{sublabel}</p>
        )}
      </motion.div>

      {/* Thin golden divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.2)] to-transparent" />
    </div>
  );
}

// 2. CINEMATIC HERO — The grand introduction of the exhibit.
// "We the People" is visible on load, then scrolls into the headline phase.
export function CinematicHero({ isRo }: { isRo: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Phase 1: "We the People" — visible on load, fades as user scrolls
  const wtpOpacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const wtpScale   = useTransform(scrollYProgress, [0, 0.35], [1, 0.88]);
  const wtpY       = useTransform(scrollYProgress, [0, 0.35], [0, -60]);

  // Phase 2: Main headline — fades in as "We the People" fades out
  const headlineOpacity = useTransform(scrollYProgress, [0.3, 0.42, 0.72, 0.92], [0, 1, 1, 0]);
  const headlineY       = useTransform(scrollYProgress, [0.3, 0.42, 0.72, 0.92], [60, 0, 0, -20]);

  // Phase 3: Subtitle + CTAs
  const subtitleOpacity = useTransform(scrollYProgress, [0.38, 0.48, 0.72, 0.92], [0, 1, 1, 0]);
  const subtitleY       = useTransform(scrollYProgress, [0.38, 0.48], [30, 0]);

  // Background parchment watermark
  const parchmentOpacity = useTransform(scrollYProgress, [0, 0.15, 0.72, 0.95], [0, 0.04, 0.04, 0.01]);
  const bgScale          = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  // Golden line
  const lineWidth = useTransform(scrollYProgress, [0.3, 0.42], ["0%", "100%"]);

  // Scroll indicator — visible at the start
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.02, 0.12], [0.7, 0.7, 0]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#080B12]"
      style={{ height: "200vh", position: "relative" }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Parchment watermark */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity: parchmentOpacity, scale: bgScale, willChange: "transform, opacity" }}
        >
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/constitution/constitution-page-1.jpg')",
              filter: "sepia(80%) contrast(0.8) brightness(0.6)",
            }}
          />
        </motion.div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#080B12]/60 via-[#080B12]/30 to-[#080B12]" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#080B12]/50 via-transparent to-[#080B12]/50" />

        {/* Phase 1: "We the People" */}
        <motion.div
          className="absolute z-10 text-center"
          style={{
            opacity: wtpOpacity,
            scale: wtpScale,
            y: wtpY,
            willChange: "transform, opacity",
          }}
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

        {/* Phase 2: Main headline */}
        <motion.div
          className="absolute z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8"
          style={{ opacity: headlineOpacity, y: headlineY, willChange: "transform, opacity" }}
        >
          <div className="flex flex-col items-start">
            <p className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.35em] text-[#C9A84C]">
              {isRo ? "Constituție și Democrație" : "Constitution & Democracy"}
            </p>
            <motion.div
              className="mb-6 h-px bg-gradient-to-r from-[#C9A84C] to-transparent"
              style={{ width: lineWidth }}
            />
            <h1
              className="mb-6 font-hero leading-none tracking-wide"
              style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
            >
              <span className="block text-[#F5F0E8]">
                {isRo ? "CEL MAI LUNG" : "THE LONGEST"}
              </span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #D4AF6A, #E8C878, #C9A84C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {isRo ? "EXPERIMENT ÎN DEMOCRAȚIE" : "EXPERIMENT IN DEMOCRACY"}
              </span>
            </h1>

            <motion.div style={{ opacity: subtitleOpacity, y: subtitleY, willChange: "transform, opacity" }}>
              <p
                className="mb-8 max-w-2xl font-body text-lg leading-relaxed text-[#B8B4AC] md:text-xl"
                style={{ fontFamily: "'EB Garamond','Georgia',serif", fontStyle: "italic" }}
              >
                {isRo
                  ? '"250 de ani de guvernare constituțională neîntreruptă — un record pe care nicio altă națiune de pe Pământ nu îl poate egala."'
                  : '"250 years of unbroken constitutional government — a record no other nation on Earth comes close to matching."'}
              </p>
              <p className="mb-12 max-w-lg font-body text-base leading-relaxed text-[#6B6860]">
                {isRo
                  ? "Nu prin șansă. Nu prin geografie. Prin design."
                  : "Not by chance. Not by geography. By design."}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#the-document"
                  className="inline-flex items-center gap-2 rounded-xl border border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.08)] px-6 py-3 font-body text-sm font-semibold text-[#C9A84C] backdrop-blur-sm transition-all hover:bg-[rgba(201,168,76,0.15)]"
                >
                  {isRo ? "Explorează Documentul" : "Explore the Document"}
                </a>
                <a
                  href="#track-record"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-6 py-3 font-body text-sm font-semibold text-[#F5F0E8] backdrop-blur-sm transition-all hover:bg-white/8"
                >
                  {isRo ? "59 Alegeri, Zero Coupuri" : "59 Elections, Zero Coups"}
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-[#6B6860]">
            Scroll
          </p>
          <div className="h-8 w-5 rounded-full border border-[rgba(201,168,76,0.3)] flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-1 bg-[#C9A84C] rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 3. UNBROKEN LINE — Vertical transfer of power timeline
// ═════════════════════════════════════════════════════════════════════════════

function TransferNode({
  transfer,
  index,
  isRo,
}: {
  transfer: PresidentialTransfer;
  index: number;
  isRo: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40% 0px -40% 0px" });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(isInView);
  }, [isInView]);

  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start justify-center">
      {/* Left content */}
      <div className={`w-[45%] ${isLeft ? "pr-8 text-right" : "pr-8 text-right opacity-0 pointer-events-none"}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={expanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-hero text-3xl text-[#C9A84C] md:text-4xl">{transfer.year}</p>
            <p className="mt-1 font-body text-sm font-semibold text-[#F5F0E8]">
              {transfer.from} → {transfer.to}
            </p>
            <p className="mt-2 font-body text-xs leading-relaxed text-[#8B8880]">
              {transfer.context}
            </p>
            {transfer.crisis && transfer.verdict && expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-3 overflow-hidden rounded-lg border border-green-500/20 bg-green-900/10 p-3 text-left"
              >
                <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-green-400">
                  {isRo ? "Verdictul" : "The Verdict"}
                </p>
                <p className="mt-1 font-body text-xs leading-relaxed text-[#B8B4AC]">
                  {transfer.verdict}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Center node */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={expanded ? { scale: 1.3 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ${
            transfer.crisis
              ? expanded
                ? "border-[#C0392B] bg-[#C0392B] shadow-[0_0_30px_rgba(192,57,43,0.6)]"
                : "border-[rgba(192,57,43,0.5)] bg-[rgba(192,57,43,0.15)]"
              : expanded
                ? "border-[#C9A84C] bg-[#C9A84C] shadow-[0_0_30px_rgba(201,168,76,0.5)]"
                : "border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)]"
          }`}
        >
          {transfer.crisis ? (
            <span className="text-sm">{expanded ? "⚡" : "!"}</span>
          ) : (
            <span className="text-xs text-[#080B12] font-bold">
              {expanded ? "✓" : String(transfer.year).slice(-2)}
            </span>
          )}
        </motion.div>
      </div>

      {/* Right content */}
      <div className={`w-[45%] ${!isLeft ? "pl-8" : "pl-8 opacity-0 pointer-events-none"}`}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={expanded ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-hero text-3xl text-[#C9A84C] md:text-4xl">{transfer.year}</p>
            <p className="mt-1 font-body text-sm font-semibold text-[#F5F0E8]">
              {transfer.from} → {transfer.to}
            </p>
            <p className="mt-2 font-body text-xs leading-relaxed text-[#8B8880]">
              {transfer.context}
            </p>
            {transfer.crisis && transfer.verdict && expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-3 overflow-hidden rounded-lg border border-green-500/20 bg-green-900/10 p-3"
              >
                <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-green-400">
                  {isRo ? "Verdictul" : "The Verdict"}
                </p>
                <p className="mt-1 font-body text-xs leading-relaxed text-[#B8B4AC]">
                  {transfer.verdict}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// 3. THE UNBROKEN LINE — A vertical timeline of power transfers.
// This is a metaphor for the stability of American democracy.
// As you scroll, the "golden thread" follows you down the page.
export function UnbrokenLine({
  transfers,
  isRo,
}: {
  transfers: PresidentialTransfer[];
  isRo: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative">
      {/* The unbroken golden line and transfers */}
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[rgba(201,168,76,0.1)]">
          <motion.div
            className="absolute left-0 top-0 w-full origin-top"
            style={{
              height: lineHeight,
              background:
                "linear-gradient(180deg, #8B6A2A 0%, #C9A84C 30%, #E8C878 60%, #C9A84C 100%)",
              boxShadow: "0 0 12px rgba(201,168,76,0.3), 0 0 40px rgba(201,168,76,0.1)",
            }}
          />
        </div>

        {/* Transfer nodes */}
        <div className="relative space-y-12 py-8 md:space-y-16">
          {transfers.map((t, i) => (
            <TransferNode key={t.year} transfer={t} index={i} isRo={isRo} />
          ))}
        </div>
      </div>

      {/* Bottom statement */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative z-10 pt-12 text-center"
      >
        <p
          className="font-hero leading-none"
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            background:
              "linear-gradient(180deg, #E8C878 0%, #C9A84C 50%, #8B6A2A 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {isRo
            ? "59 de ori. Linia nu s-a rupt niciodată."
            : "59 times. The line never broke."}
        </p>
      </motion.div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 4. CINEMATIC SECTION BREAK — golden thread between sections
// ═════════════════════════════════════════════════════════════════════════════

export function CinematicSectionBreak({
  chapter,
  title,
}: {
  chapter: string;
  title: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden py-24"
      style={{
        background:
          "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 70%)",
      }}
    >
      {/* Grid stacking: numeral + title perfectly centered on top of each other */}
      <div className="grid place-items-center" style={{ gridTemplateAreas: "'center'" }}>
        {/* Chapter number — background layer */}
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-hero select-none pointer-events-none leading-none"
          style={{
            gridArea: "center",
            fontSize: "clamp(100px, 18vw, 240px)",
            background:
              "linear-gradient(180deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.03) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            paddingLeft: "0.08em", // Compensate for natural right-heavy glyphs or add optical centering
            letterSpacing: "0.08em",
          }}
        >
          {chapter}
        </motion.p>

        {/* Title + decorative lines — foreground layer */}
        <div className="flex flex-col items-center gap-3" style={{ gridArea: "center" }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-px w-20 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-[#C9A84C]"
          >
            {title}
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="h-px w-20 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
          />
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 5. CINEMATIC PULL QUOTE — full-width dramatic quote
// ═════════════════════════════════════════════════════════════════════════════

export function CinematicPullQuote({
  quote,
  attribution,
  source,
}: {
  quote: string;
  attribution: string;
  source: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.3], [-40, 0]);

  return (
    <div ref={ref} className="relative py-16 md:py-24" style={{ position: "relative" }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 60%)",
        }}
      />

      <motion.div
        style={{ opacity, x }}
        className="relative z-10 mx-auto max-w-screen-lg px-4 sm:px-6"
      >
        <div className="border-l-2 border-[#C9A84C]/40 pl-6 md:pl-10">
          <p
            style={{
              fontFamily: "'EB Garamond', 'Georgia', serif",
              fontSize: "clamp(24px, 4vw, 42px)",
              fontStyle: "italic",
              lineHeight: 1.5,
              color: "rgba(245,240,232,0.85)",
            }}
          >
            &ldquo;{quote}&rdquo;
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-8 bg-[#C9A84C]/40" />
            <div>
              <p className="font-body text-sm font-semibold text-[#C9A84C]">
                {attribution}
              </p>
              <p className="font-body text-xs text-[#6B6860]">{source}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// 5. CONSTITUTION RACE — A data visualization "race" between nations.
// It shows how most constitutions fail or get replaced while the U.S. bar keeps going.
// Principle: "Stability". A stable constitution provides a predictable environment for growth.
interface ConstitutionEra {
  country: string;
  start: number;
  end: number | null;
  label: string;
}

const CONSTITUTION_ERAS: ConstitutionEra[] = [
  { country: "United States", start: 1789, end: null, label: "1789 — present" },
  { country: "France (1st Rep)", start: 1791, end: 1795, label: "1st Republic" },
  { country: "France (Dir.)", start: 1795, end: 1799, label: "Directoire" },
  { country: "France (2nd Rep)", start: 1848, end: 1852, label: "2nd Republic" },
  { country: "France (3rd Rep)", start: 1870, end: 1940, label: "3rd Republic" },
  { country: "France (4th Rep)", start: 1946, end: 1958, label: "4th Republic" },
  { country: "France (5th Rep)", start: 1958, end: null, label: "5th Republic" },
  { country: "Norway", start: 1814, end: null, label: "1814 (heavily revised)" },
  { country: "Germany (Weimar)", start: 1919, end: 1933, label: "Weimar Republic" },
  { country: "Germany (Basic)", start: 1949, end: null, label: "Basic Law" },
  { country: "Japan", start: 1947, end: null, label: "Post-WWII" },
  { country: "Italy", start: 1948, end: null, label: "Republic" },
  { country: "Spain", start: 1978, end: null, label: "Post-Franco" },
  { country: "Russia", start: 1993, end: null, label: "Post-Soviet" },
];

export function ConstitutionRace({ isRo }: { isRo: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewRef = useInView(containerRef, { once: true, margin: "-100px" });
  const [currentYear, setCurrentYear] = useState(1789);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endYear = 2026;

  useEffect(() => {
    if (inViewRef && !isPlaying && currentYear === 1789) {
      setIsPlaying(true);
    }
  }, [inViewRef, isPlaying, currentYear]);

  useEffect(() => {
    if (!isPlaying) return;
    intervalRef.current = setInterval(() => {
      setCurrentYear((prev) => {
        if (prev >= endYear) {
          setIsPlaying(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return endYear;
        }
        return prev + 1;
      });
    }, 30);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const replay = () => {
    setCurrentYear(1789);
    setTimeout(() => setIsPlaying(true), 100);
  };

  const bars = CONSTITUTION_ERAS
    .filter((era) => era.start <= currentYear)
    .map((era) => {
      const eraEnd = era.end ?? currentYear;
      const displayEnd = Math.min(eraEnd, currentYear);
      const years = Math.max(0, displayEnd - era.start);
      const collapsed = era.end !== null && currentYear >= era.end;
      return { ...era, years, collapsed };
    })
    .sort((a, b) => b.years - a.years);

  const maxYears = endYear - 1789;

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.15)] bg-[#0A0E15] p-6 md:p-8"
      style={{ position: "relative" }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">
            {isRo ? "Cursă Constituțională" : "Constitution Race"}
          </p>
          <p className="mt-1 font-body text-xs text-[#6B6860]">
            {isRo
              ? "Privește cum constituții se prăbușesc în timp ce America persistă"
              : "Watch constitutions collapse while America persists"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p
            className="font-hero text-4xl tabular-nums md:text-5xl"
            style={{
              background: "linear-gradient(180deg, #E8C878 0%, #C9A84C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {currentYear}
          </p>
          {currentYear >= endYear && (
            <button
              onClick={replay}
              className="rounded-lg border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.06)] px-3 py-1.5 font-body text-xs font-semibold text-[#C9A84C] transition-all hover:bg-[rgba(201,168,76,0.12)]"
            >
              {isRo ? "Reluare" : "Replay"}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {bars.slice(0, 8).map((bar) => {
          const isUS = bar.country === "United States";
          const pct = Math.max(1, (bar.years / maxYears) * 100);
          return (
            <div key={bar.country} className="flex items-center gap-3">
              <div className="w-36 shrink-0 text-right md:w-44">
                <p
                  className={`font-body text-xs truncate ${
                    isUS ? "font-bold text-[#C9A84C]" : bar.collapsed ? "text-[#4A4540] line-through" : "text-[#8B8880]"
                  }`}
                >
                  {bar.country}
                </p>
              </div>
              <div className="relative flex-1 h-7 rounded bg-white/5 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%`, opacity: bar.collapsed ? 0.25 : 1 }}
                  transition={{ duration: 0.08, ease: "linear" }}
                  style={{
                    background: isUS
                      ? "linear-gradient(90deg, #8B6A2A, #C9A84C, #E8C878)"
                      : bar.collapsed
                        ? "rgba(192,57,43,0.4)"
                        : "rgba(201,168,76,0.3)",
                    boxShadow: isUS ? "0 0 20px rgba(201,168,76,0.3), 0 0 40px rgba(201,168,76,0.1)" : "none",
                  }}
                />
                <div className="relative z-10 flex h-full items-center px-2">
                  <span className={`font-hero text-xs ${isUS ? "text-[#080B12]" : bar.collapsed ? "text-[#4A4540]" : "text-[#B8B4AC]"}`}>
                    {bar.years > 0 ? `${bar.years}y` : ""}{bar.collapsed ? " ✕" : ""}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-6 rounded-full" style={{ background: "linear-gradient(90deg, #8B6A2A, #C9A84C)" }} />
          <span className="font-body text-[10px] text-[#6B6860]">{isRo ? "Constituție activă" : "Active constitution"}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-6 rounded-full bg-[rgba(192,57,43,0.4)]" />
          <span className="font-body text-[10px] text-[#6B6860]">{isRo ? "Prăbușită / Rescrisă" : "Collapsed / Rewritten"}</span>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 7. WORLD WITHOUT — Dark counter-factual split-screen
// ═════════════════════════════════════════════════════════════════════════════

interface CounterFactual {
  right: string;
  rightDetail: string;
  without: string;
  withoutDetail: string;
  country: string;
}

const COUNTER_FACTUALS_EN: CounterFactual[] = [
  {
    right: "You can criticize the President on social media",
    rightDetail: "The First Amendment protects speech that criticizes the government, including the President. No prior restraint, no government approval needed.",
    without: "A tennis star disappeared for 3 weeks after accusing a government official",
    withoutDetail: "In China, Peng Shuai vanished from public life for 19 days after accusing a former vice-premier of sexual assault. The internet censored every mention.",
    country: "China",
  },
  {
    right: "You cannot be held without charges",
    rightDetail: "The Fifth and Sixth Amendments guarantee due process and a speedy trial. Habeas corpus ensures the government must justify detention before a judge.",
    without: "A journalist was detained for 3 years without trial",
    withoutDetail: "In Turkey, journalist Can Dündar was imprisoned without trial for reporting on government arms shipments. Thousands of journalists, academics, and judges were detained after the 2016 coup attempt.",
    country: "Turkey",
  },
  {
    right: "You can practice any religion — or none",
    rightDetail: "The First Amendment's Establishment and Free Exercise Clauses prohibit government-imposed religion and protect individual religious choices.",
    without: "Over 1 million people are in detention camps for their faith",
    withoutDetail: "In China's Xinjiang region, the UN estimates that over 1 million Uyghur Muslims have been detained in re-education camps since 2017.",
    country: "China",
  },
  {
    right: "A jury of 12 citizens decides your fate — not the state",
    rightDetail: "The Sixth and Seventh Amendments guarantee jury trials in criminal and civil cases. The state cannot convict you alone.",
    without: "Courts have a 99.9% conviction rate",
    withoutDetail: "In Japan, the conviction rate in criminal cases exceeds 99.9%. In Russia, acquittals run at 0.3%. The outcome is decided before the trial begins.",
    country: "Japan / Russia",
  },
  {
    right: "Police need a warrant to search your home",
    rightDetail: "The Fourth Amendment requires probable cause and a judge-issued warrant before government agents can search your property.",
    without: "Police entered 68,000 homes without warrants in a single year",
    withoutDetail: "In the Philippines during the 'war on drugs,' police conducted tens of thousands of warrantless raids. An estimated 12,000–30,000 people were killed between 2016–2022.",
    country: "Philippines",
  },
];

const COUNTER_FACTUALS_RO: CounterFactual[] = [
  {
    right: "Poți critica Președintele pe rețelele sociale",
    rightDetail: "Primul Amendament protejează discursul care critică guvernul. Fără cenzură prealabilă, fără aprobare guvernamentală.",
    without: "O jucătoare de tenis a dispărut 3 săptămâni",
    withoutDetail: "În China, Peng Shuai a dispărut din viața publică timp de 19 zile după ce l-a acuzat pe un fost vice-premier.",
    country: "China",
  },
  {
    right: "Nu poți fi reținut fără acuzații",
    rightDetail: "Al Cincilea și al Șaselea Amendament garantează procesul echitabil și un proces rapid.",
    without: "Un jurnalist a fost reținut 3 ani fără proces",
    withoutDetail: "În Turcia, jurnalistul Can Dündar a fost închis fără proces pentru raportarea unor transporturi de arme.",
    country: "Turcia",
  },
  {
    right: "Poți practica orice religie — sau niciuna",
    rightDetail: "Clauzele Primului Amendament interzic religia impusă de stat.",
    without: "Peste 1 milion de oameni sunt în lagăre de detenție",
    withoutDetail: "În Xinjiang, ONU estimează peste 1 milion de musulmani uiguri reținuți din 2017.",
    country: "China",
  },
  {
    right: "Un juriu de 12 cetățeni îți decide soarta",
    rightDetail: "Al Șaselea și al Șaptelea Amendament garantează procese cu juriu.",
    without: "Instanțele au o rată de condamnare de 99,9%",
    withoutDetail: "În Japonia, rata de condamnare depășește 99,9%. În Rusia, achitările sunt de 0,3%.",
    country: "Japonia / Rusia",
  },
  {
    right: "Poliția are nevoie de mandat pentru percheziție",
    rightDetail: "Al Patrulea Amendament necesită cauză probabilă și mandat emis de judecător.",
    without: "Poliția a intrat în 68.000 de case fără mandat",
    withoutDetail: "În Filipine, zeci de mii de raiduri fără mandat. Între 12.000–30.000 ucise între 2016–2022.",
    country: "Filipine",
  },
];

function CounterFactualRow({ item, index, isRo }: { item: CounterFactual; index: number; isRo: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inViewCF = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inViewCF ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-0 overflow-hidden rounded-2xl border border-white/8 md:grid-cols-2"
    >
      <div className="border-b border-white/8 bg-[rgba(201,168,76,0.03)] p-6 md:border-b-0 md:border-r">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10 text-xs text-green-400">✓</span>
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-green-400">{isRo ? "În America" : "In America"}</span>
        </div>
        <p className="mb-2 font-display text-lg font-semibold leading-snug text-[#F5F0E8]">{item.right}</p>
        <p className="font-body text-xs leading-relaxed text-[#8B8880]">{item.rightDetail}</p>
      </div>
      <div className="bg-[rgba(192,57,43,0.03)] p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-xs text-red-400">✕</span>
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400">{item.country}</span>
        </div>
        <p className="mb-2 font-display text-lg font-semibold leading-snug text-[#F5F0E8]">{item.without}</p>
        <p className="font-body text-xs leading-relaxed text-[#8B8880]">{item.withoutDetail}</p>
      </div>
    </motion.div>
  );
}

export function WorldWithout({ isRo }: { isRo: boolean }) {
  const facts = isRo ? COUNTER_FACTUALS_RO : COUNTER_FACTUALS_EN;
  return (
    <div className="space-y-4">
      {facts.map((item, i) => (
        <CounterFactualRow key={i} item={item} index={i} isRo={isRo} />
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="rounded-2xl border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.04)] p-6 text-center md:p-8"
      >
        <p
          className="mx-auto max-w-2xl"
          style={{
            fontFamily: "'EB Garamond', 'Georgia', serif",
            fontSize: "clamp(18px, 2.5vw, 28px)",
            fontStyle: "italic",
            lineHeight: 1.6,
            color: "rgba(245,240,232,0.9)",
          }}
        >
          {isRo
            ? "Aceste drepturi nu sunt inevitabile. Ele sunt proiectate. Ele trebuie menținute."
            : "These rights are not inevitable. They are engineered. They must be maintained."}
        </p>
      </motion.div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 8. SCROLL PROGRESS SIDEBAR — Constitution-themed floating navigation
// ═════════════════════════════════════════════════════════════════════════════

interface SidebarSection {
  id: string;
  label: string;
  chapter: string;
}

export function ScrollProgressSidebar({ isRo }: { isRo: boolean }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const sections: SidebarSection[] = useMemo(
    () => [
      { id: "overview", label: isRo ? "Documentul" : "The Document", chapter: "I" },
      { id: "the-document", label: isRo ? "Pasaje" : "Passages", chapter: "I" },
      { id: "founders", label: isRo ? "Fondatori" : "Founders", chapter: "II" },
      { id: "bill-of-rights", label: isRo ? "Drepturi" : "Rights", chapter: "III" },
      { id: "separation-of-powers", label: isRo ? "Separare" : "Separation", chapter: "IV" },
      { id: "federalism", label: isRo ? "Federalism" : "Federalism", chapter: "V" },
      { id: "track-record", label: isRo ? "Istorie" : "Timeline", chapter: "VI" },
      { id: "rights-at-risk", label: isRo ? "Context" : "Context", chapter: "VII" },
      { id: "world-without", label: isRo ? "Contrafactual" : "Counter-factual", chapter: "VIII" },
      { id: "explore", label: isRo ? "Explorează" : "Explore", chapter: "IX" },
    ],
    [isRo]
  );

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 2.5);
      let found: string | null = null;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            found = sections[i].id;
            break;
          }
        }
      }
      setActiveId(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-3 top-1/2 z-50 hidden -translate-y-1/2 2xl:flex"
          aria-label="Page navigation"
        >
          <div className="flex flex-col items-center gap-2 py-2">
            {sections.map((section) => {
              const isActive = activeId === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group relative flex items-center"
                  title={section.label}
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? "h-3 w-3 bg-[#C9A84C] shadow-[0_0_10px_rgba(201,168,76,0.6)]"
                        : "h-1.5 w-1.5 bg-white/15 group-hover:bg-white/30 group-hover:scale-150"
                    }`}
                  />
                  <span className="pointer-events-none absolute left-full ml-4 whitespace-nowrap rounded-lg border border-[rgba(201,168,76,0.2)] bg-[#080B12]/95 px-3 py-1.5 font-body text-[11px] text-[#F5F0E8] opacity-0 shadow-xl backdrop-blur-xl transition-opacity group-hover:opacity-100">
                    <span className="mr-1.5 text-[#C9A84C]">{section.chapter}</span>{section.label}
                  </span>
                </a>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
