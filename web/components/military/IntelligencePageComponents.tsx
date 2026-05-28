"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type {
  IntelligenceAgency,
  IntelligenceCapability,
  IntelligenceNode,
  IntelligenceHeritageEvent,
  IntelligenceFutureProgram,
} from "@/lib/data/intelligence-data";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — The classified archive palette
// ─────────────────────────────────────────────────────────────────────────────

const INTEL = {
  black: "#000000",
  surface: "#050505",
  paper: "#E8E2D5",
  paperDim: "rgba(232, 226, 213, 0.40)",
  paperFaint: "rgba(232, 226, 213, 0.15)",
  green: "#1C3A1C",
  greenText: "#2A4A2A",
  greenBright: "#3A5A3A",
  redact: "#0A0A0A",
  border: "rgba(232, 226, 213, 0.06)",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 1. IntelClassifiedStyles — Global CSS injection
// ─────────────────────────────────────────────────────────────────────────────

export function IntelClassifiedStyles() {
  return (
    <style jsx global>{`
      .intel-classified {
        --intel-black: ${INTEL.black};
        --intel-surface: ${INTEL.surface};
        --intel-paper: ${INTEL.paper};
        --intel-paper-dim: ${INTEL.paperDim};
        --intel-paper-faint: ${INTEL.paperFaint};
        --intel-green: ${INTEL.green};
        --intel-green-text: ${INTEL.greenText};
        --intel-redact: ${INTEL.redact};
        --intel-border: ${INTEL.border};

        background: var(--intel-black);
        color: var(--intel-paper);
      }

      /* Bureaucratic voice — monospace, all-caps, wide tracking */
      .intel-bureaucratic {
        font-family: var(--font-mono), "SFMono-Regular", Consolas, monospace;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        font-size: 10px;
        line-height: 1.6;
        color: var(--intel-green-text);
      }

      /* Editorial voice — Playfair Display italic, for human weight */
      .intel-editorial {
        font-family: var(--font-display), "Playfair Display", Georgia, serif;
        font-style: italic;
        font-weight: 400;
        letter-spacing: -0.01em;
        color: var(--intel-paper);
      }

      /* Document body text */
      .intel-body {
        font-family: var(--font-mono), monospace;
        font-size: 12px;
        line-height: 2.0;
        letter-spacing: 0.04em;
        color: var(--intel-paper-dim);
      }

      /* Redaction bar */
      .intel-redacted {
        background: var(--intel-redact);
        color: transparent;
        user-select: none;
        padding: 0 2px;
        margin: 0 1px;
        display: inline;
      }

      /* Separator */
      .intel-separator {
        height: 1px;
        background: var(--intel-green);
        opacity: 0.3;
        width: 100%;
      }

      /* Prevent inherited gold/crimson from leaking */
      .intel-classified * {
        --mil-accent: ${INTEL.greenText};
      }

      /* Scrollbar styling for the classified page */
      .intel-classified::-webkit-scrollbar {
        width: 4px;
      }
      .intel-classified::-webkit-scrollbar-track {
        background: ${INTEL.black};
      }
      .intel-classified::-webkit-scrollbar-thumb {
        background: ${INTEL.green};
        border-radius: 0;
      }
    `}</style>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ClassificationHeader — Fixed TOP SECRET bar
// ─────────────────────────────────────────────────────────────────────────────

export function ClassificationHeader() {
  const closingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [closingInView, setClosingInView] = useState(false);

  // Track when the closing section enters viewport
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrolled / docHeight;
      // Start fading at 85% scroll, fully gone at 100%
      setClosingInView(progress > 0.85);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = useTransform(scrollYProgress, [0.85, 1.0], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="fixed top-0 inset-x-0 z-[90] flex items-center justify-center h-8 border-b"
      data-classification-header
    >
      <div
        className="absolute inset-0"
        style={{ background: INTEL.surface, borderBottomColor: INTEL.border }}
      />
      <span
        className="intel-bureaucratic relative z-10"
        style={{
          fontSize: "9px",
          letterSpacing: "0.35em",
          color: INTEL.greenText,
        }}
      >
        TOP SECRET // SI // TK // NOFORN // ORCON
      </span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. EntrySequence — Typing animation
// ─────────────────────────────────────────────────────────────────────────────

export function EntrySequence({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState(0);
  const [text, setText] = useState("");
  const [complete, setComplete] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const lines = [
    "ACCESSING ARCHIVE...",
    "CLEARANCE VERIFIED",
    "PROCEED",
  ];

  const typeText = useCallback((lineText: string, charDelay: number): Promise<void> => {
    return new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setText(lineText.slice(0, i));
        if (i >= lineText.length) {
          clearInterval(interval);
          resolve();
        }
      }, charDelay);
    });
  }, []);

  useEffect(() => {
    if (!inView || complete) return;

    let cancelled = false;
    const run = async () => {
      // Phase 0: ACCESSING ARCHIVE...
      setPhase(0);
      await typeText(lines[0], 50);
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 800));

      // Phase 1: CLEARANCE VERIFIED
      setPhase(1);
      setText("");
      await typeText(lines[1], 45);
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 600));

      // Phase 2: PROCEED
      setPhase(2);
      setText("");
      await typeText(lines[2], 70);
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 400));

      setComplete(true);
      onComplete?.();
    };

    run();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (complete) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="flex items-center justify-center py-24"
        style={{ background: INTEL.black }}
      >
        <span className="intel-bureaucratic" style={{ color: INTEL.greenText, fontSize: "11px" }}>
          PROCEED
        </span>
      </motion.div>
    );
  }

  return (
    <div
      ref={ref}
      className="flex items-center justify-center py-32"
      style={{ background: INTEL.black }}
    >
      <div className="text-center">
        <span
          className="intel-bureaucratic"
          style={{
            color: INTEL.greenText,
            fontSize: "11px",
            letterSpacing: "0.3em",
          }}
        >
          {text}
          <span className="animate-pulse">▌</span>
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. SingleStatistic — One massive number
// ─────────────────────────────────────────────────────────────────────────────

export function SingleStatistic({ locale = "en" }: { locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isRo = locale === "ro";

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center px-6 py-40 md:py-56"
      style={{ background: INTEL.black }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2.0, ease: "easeOut" }}
        className="text-center max-w-3xl"
      >
        {/* The number — massive, editorial */}
        <div
          className="intel-editorial"
          style={{
            fontSize: "clamp(60px, 12vw, 140px)",
            lineHeight: 1,
            fontWeight: 400,
            fontStyle: "italic",
            color: INTEL.paper,
            letterSpacing: "-0.03em",
          }}
        >
          1,271,000
        </div>

        {/* The description — tiny bureaucratic */}
        <div className="mt-8">
          <span
            className="intel-bureaucratic"
            style={{
              fontSize: "10px",
              letterSpacing: "0.25em",
              color: INTEL.paperDim,
              lineHeight: 2.2,
            }}
          >
            {isRo
              ? "PAGINI DE DOCUMENTE DECLASIFICATE PUBLICATE DE CIA DIN 1995"
              : "PAGES OF DECLASSIFIED DOCUMENTS RELEASED BY THE CIA SINCE 1995"}
          </span>
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. AgencyDossier — Vertical scrolling chapters
// ─────────────────────────────────────────────────────────────────────────────

function AgencyChapter({ agency, index, isLast }: { agency: IntelligenceAgency; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 items-start">
        {/* Seal — desaturated */}
        <div className="flex justify-center lg:justify-start pt-2">
          <div className="relative w-32 h-32 lg:w-40 lg:h-40">
            <Image
              src={agency.imageSrc}
              alt={`${agency.name} Seal`}
              width={160}
              height={160}
              className="object-contain w-full h-full"
              style={{
                filter: "grayscale(70%) brightness(0.7) contrast(1.1)",
                opacity: 0.6,
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          {/* Agency header — bureaucratic */}
          <div
            className="intel-bureaucratic mb-4"
            style={{ fontSize: "10px", color: INTEL.greenText, letterSpacing: "0.25em" }}
          >
            {agency.name.toUpperCase()} // EST. {agency.stats.find((s) => s.label === "Founded" || s.label === "Fondată")?.value || "CLASSIFIED"}
          </div>

          {/* Role — editorial */}
          <div
            className="intel-editorial mb-6"
            style={{ fontSize: "clamp(20px, 3vw, 32px)", lineHeight: 1.3 }}
          >
            {agency.role}
          </div>

          {/* Body text */}
          <p className="intel-body max-w-2xl mb-8">
            {agency.description}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            {agency.stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span
                  className="intel-bureaucratic mb-1"
                  style={{ fontSize: "8px", letterSpacing: "0.2em", color: INTEL.greenText }}
                >
                  {s.label.toUpperCase()}
                </span>
                <span
                  className="intel-bureaucratic"
                  style={{ fontSize: "10px", color: INTEL.paper, letterSpacing: "0.08em" }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Separator */}
      {!isLast && (
        <div className="intel-separator my-20 lg:my-28" style={{ background: INTEL.green, opacity: 0.2 }} />
      )}
    </motion.div>
  );
}

export function AgencyDossier({ agencies, locale = "en" }: { agencies: IntelligenceAgency[]; locale?: Locale }) {
  const isRo = locale === "ro";

  return (
    <section className="relative px-6 sm:px-10 lg:px-16 py-28 md:py-40" style={{ background: INTEL.black }}>
      <div className="mx-auto max-w-[1100px]">
        {/* Section header */}
        <div className="mb-28 lg:mb-36">
          <div
            className="intel-bureaucratic mb-8"
            style={{ fontSize: "9px", letterSpacing: "0.35em", color: INTEL.greenText }}
          >
            {isRo ? "DOSARE AGENȚII // NIVEL 5 ACCES" : "AGENCY DOSSIERS // LEVEL 5 ACCESS"}
          </div>
          <div
            className="intel-editorial"
            style={{ fontSize: "clamp(24px, 4vw, 44px)", lineHeight: 1.25 }}
          >
            {isRo
              ? "Cele cinci agenții care ancorează sistemul de informații al Statelor Unite."
              : "The five agencies that anchor the intelligence apparatus of the United States."}
          </div>
        </div>

        {/* Agency chapters — static, no interactivity */}
        <div className="space-y-0">
          {agencies.map((agency, i) => (
            <AgencyChapter
              key={agency.id}
              agency={agency}
              index={i}
              isLast={i === agencies.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. DeclassifiedDocument — Intelligence disciplines with redaction bars
// ─────────────────────────────────────────────────────────────────────────────

function RedactedText({ children }: { children: React.ReactNode }) {
  return <span className="intel-redacted">{children}</span>;
}

export function DeclassifiedDocument({ capabilities, locale = "en" }: { capabilities: IntelligenceCapability[]; locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isRo = locale === "ro";

  return (
    <section
      ref={ref}
      className="relative px-6 sm:px-10 lg:px-16 py-28 md:py-40"
      style={{ background: INTEL.black }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mx-auto max-w-[900px]"
      >
        {/* Document header */}
        <div
          className="p-6 sm:p-10 mb-2"
          style={{ background: INTEL.surface, border: `1px solid ${INTEL.border}` }}
        >
          <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
            <div className="intel-bureaucratic" style={{ fontSize: "9px", color: INTEL.greenText }}>
              {isRo ? "DOCUMENT DECLASIFICAT" : "DECLASSIFIED DOCUMENT"}
            </div>
            <div className="intel-bureaucratic" style={{ fontSize: "8px", color: INTEL.paperFaint }}>
              REF: IC-2024-DISCIPLINES-001
            </div>
          </div>

          <div
            className="intel-bureaucratic mb-2"
            style={{ fontSize: "8px", letterSpacing: "0.3em", color: INTEL.greenText }}
          >
            {isRo ? "SUBIECT: DISCIPLINE DE COLECTARE INFORMAȚII" : "SUBJECT: INTELLIGENCE COLLECTION DISCIPLINES"}
          </div>
          <div className="intel-bureaucratic" style={{ fontSize: "8px", color: INTEL.paperFaint }}>
            {isRo ? "DATA: DECLASIFICAT PRIN REVIZUIRE AUTOMATIZATĂ" : "DATE: DECLASSIFIED UNDER AUTOMATED REVIEW"}
          </div>
        </div>

        {/* Document body — disciplines */}
        <div
          className="p-6 sm:p-10"
          style={{ background: INTEL.surface, border: `1px solid ${INTEL.border}` }}
        >
          {capabilities.map((cap, i) => (
            <div key={cap.title} className={cn("pb-10", i < capabilities.length - 1 && "mb-10 border-b")} style={{ borderColor: INTEL.border }}>
              {/* Discipline designator */}
              <div
                className="intel-bureaucratic mb-4"
                style={{ fontSize: "9px", letterSpacing: "0.25em", color: INTEL.greenText }}
              >
                {cap.kicker}
              </div>

              {/* Title */}
              <h3
                className="intel-editorial mb-4"
                style={{
                  fontSize: "clamp(18px, 2.5vw, 26px)",
                  fontStyle: "italic",
                  lineHeight: 1.3,
                }}
              >
                {cap.title}
              </h3>

              {/* Body with strategic redactions */}
              <p className="intel-body mb-4">
                {i === 0 && (
                  <>
                    {cap.description.split(".")[0]}.{" "}
                    <RedactedText>CLASSIFIED INTERCEPT METHODOLOGY</RedactedText>{" "}
                    {cap.description.split(".").slice(1).join(".")}
                  </>
                )}
                {i === 1 && (
                  <>
                    {cap.description.split(".")[0]}.{" "}
                    <RedactedText>OPERATIONAL ASSET IDENTITIES WITHHELD</RedactedText>{" "}
                    {cap.description.split(".").slice(1).join(".")}
                  </>
                )}
                {i === 2 && (
                  <>
                    {cap.description.split(".")[0]}.{" "}
                    {cap.description.split(".").slice(1, 2).join(".")}.{" "}
                    <RedactedText>RESOLUTION PARAMETERS CLASSIFIED</RedactedText>
                  </>
                )}
                {i === 3 && (
                  <>
                    <RedactedText>SPECIFIC TARGET INFRASTRUCTURE</RedactedText>{" "}
                    {cap.description}
                  </>
                )}
                {i >= 4 && (
                  <>
                    {cap.description.split(".")[0]}.{" "}
                    <RedactedText>SENSOR ARRAY SPECIFICATIONS</RedactedText>{" "}
                    {cap.description.split(".").slice(1).join(".")}
                  </>
                )}
              </p>

              {/* Classification tag */}
              <div className="intel-bureaucratic" style={{ fontSize: "8px", color: INTEL.paperFaint }}>
                {cap.stat.toUpperCase()} — {isRo ? "CAPACITATE VERIFICATĂ" : "CAPABILITY VERIFIED"}
              </div>
            </div>
          ))}
        </div>

        {/* Document footer */}
        <div
          className="p-4 sm:p-6 mt-2 flex justify-between items-center"
          style={{ background: INTEL.surface, border: `1px solid ${INTEL.border}` }}
        >
          <span className="intel-bureaucratic" style={{ fontSize: "8px", color: INTEL.paperFaint }}>
            END OF DOCUMENT
          </span>
          <span className="intel-bureaucratic" style={{ fontSize: "8px", color: INTEL.greenText }}>
            PAGE 1 OF 1
          </span>
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. InstallationsList — Quiet vertical list
// ─────────────────────────────────────────────────────────────────────────────

export function InstallationsList({ nodes, locale = "en" }: { nodes: IntelligenceNode[]; locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isRo = locale === "ro";

  return (
    <section
      ref={ref}
      className="relative px-6 sm:px-10 lg:px-16 py-28 md:py-40"
      style={{ background: INTEL.black }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mx-auto max-w-[1100px]"
      >
        {/* Section header */}
        <div className="mb-20 lg:mb-28">
          <div
            className="intel-bureaucratic mb-8"
            style={{ fontSize: "9px", letterSpacing: "0.35em", color: INTEL.greenText }}
          >
            {isRo ? "INSTALAȚII GLOBALE // CLASIFICAT" : "GLOBAL INSTALLATIONS // CLASSIFIED"}
          </div>
          <div
            className="intel-editorial"
            style={{ fontSize: "clamp(22px, 3.5vw, 38px)", lineHeight: 1.3 }}
          >
            {isRo
              ? "Stații de interceptare și noduri criptologice poziționate strategic pe tot globul."
              : "Interception stations and cryptologic hubs positioned strategically across the globe."}
          </div>
        </div>

        {/* Quiet vertical list */}
        <div className="space-y-0">
          {nodes.map((node, i) => (
            <motion.div
              key={node.name}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
            >
              <div
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3 md:gap-10 py-10 items-baseline"
                style={{ borderBottom: `1px solid ${INTEL.border}` }}
              >
                {/* Location */}
                <div
                  className="intel-bureaucratic"
                  style={{ fontSize: "9px", letterSpacing: "0.2em", color: INTEL.greenText }}
                >
                  {node.location.toUpperCase()}
                </div>

                {/* Details */}
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "clamp(16px, 2vw, 22px)",
                      fontWeight: 400,
                      letterSpacing: "0.02em",
                      color: INTEL.paper,
                      marginBottom: "6px",
                      textTransform: "uppercase",
                    }}
                  >
                    {node.name}
                  </h3>
                  <div
                    className="intel-bureaucratic mb-3"
                    style={{ fontSize: "9px", color: INTEL.greenText, letterSpacing: "0.15em" }}
                  >
                    {node.role.toUpperCase()}
                  </div>
                  <p className="intel-body max-w-2xl" style={{ fontSize: "11px" }}>
                    {node.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. FiveEyesGeometry — SVG pentagon with animated connecting lines
// ─────────────────────────────────────────────────────────────────────────────

export function FiveEyesGeometry({ locale = "en" }: { locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isRo = locale === "ro";

  // Pentagon points (centered at 250,220, radius ~160)
  const points = [
    { x: 250, y: 60, label: "USA" },          // top
    { x: 402, y: 176, label: "UK" },           // top-right
    { x: 344, y: 370, label: "AUS" },          // bottom-right
    { x: 156, y: 370, label: isRo ? "CAN" : "CAN" },  // bottom-left
    { x: 98, y: 176, label: "NZL" },           // top-left
  ];

  // All connecting lines (every pair)
  const lines: [number, number][] = [];
  for (let i = 0; i < 5; i++) {
    for (let j = i + 1; j < 5; j++) {
      lines.push([i, j]);
    }
  }

  return (
    <section
      ref={ref}
      className="relative px-6 sm:px-10 lg:px-16 py-28 md:py-40"
      style={{ background: INTEL.black }}
    >
      <div className="mx-auto max-w-[1100px]">
        {/* Section header */}
        <div className="mb-16 lg:mb-24 text-center">
          <div
            className="intel-bureaucratic mb-8"
            style={{ fontSize: "9px", letterSpacing: "0.35em", color: INTEL.greenText }}
          >
            {isRo ? "ALIANȚĂ DE INFORMAȚII // TRATATUL UKUSA" : "INTELLIGENCE ALLIANCE // UKUSA TREATY"}
          </div>
          <div
            className="intel-editorial mx-auto"
            style={{ fontSize: "clamp(22px, 3.5vw, 38px)", lineHeight: 1.3, maxWidth: "600px" }}
          >
            {isRo
              ? "Cei cinci ochi care văd totul."
              : "The five eyes that see everything."}
          </div>
        </div>

        {/* SVG Diagram */}
        <div className="flex justify-center">
          <svg viewBox="0 0 500 440" className="w-full max-w-[460px] h-auto">
            {/* Connecting lines — animated stroke-dashoffset */}
            {lines.map(([a, b], i) => {
              const p1 = points[a];
              const p2 = points[b];
              const length = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
              return (
                <line
                  key={`${a}-${b}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={INTEL.green}
                  strokeWidth="1"
                  strokeOpacity={0.4}
                  strokeDasharray={length}
                  strokeDashoffset={inView ? 0 : length}
                  style={{
                    transition: `stroke-dashoffset ${1.5 + i * 0.15}s ease-out ${0.3 + i * 0.1}s`,
                  }}
                />
              );
            })}

            {/* Node points and labels */}
            {points.map((p, i) => (
              <g key={p.label}>
                {/* Point dot */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={inView ? 4 : 0}
                  fill={INTEL.greenText}
                  style={{
                    transition: `r 0.8s ease-out ${0.5 + i * 0.2}s`,
                  }}
                />
                {/* Outer ring */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={inView ? 10 : 0}
                  fill="none"
                  stroke={INTEL.green}
                  strokeWidth="1"
                  strokeOpacity={0.3}
                  style={{
                    transition: `r 0.8s ease-out ${0.5 + i * 0.2}s`,
                  }}
                />
                {/* Label */}
                <text
                  x={p.x}
                  y={p.y + (i === 0 ? -22 : i <= 2 ? 30 : 30)}
                  textAnchor="middle"
                  fill={INTEL.greenText}
                  fontSize="10"
                  fontFamily="var(--font-mono), monospace"
                  letterSpacing="0.2em"
                  opacity={inView ? 1 : 0}
                  style={{
                    transition: `opacity 1s ease-out ${1 + i * 0.15}s`,
                    textTransform: "uppercase",
                  }}
                >
                  {p.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Brief paragraph about the alliance */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="intel-body" style={{ fontSize: "11px", lineHeight: 2.2 }}>
            {isRo
              ? "Alianța Five Eyes — compusă din Statele Unite, Regatul Unit, Australia, Canada și Noua Zeelandă — constituie cel mai extins și profund parteneriat de schimb de informații din istorie. Originile sale datează din Al Doilea Război Mondial, iar structura sa actuală rămâne în mare parte clasificată."
              : "The Five Eyes alliance — comprising the United States, United Kingdom, Australia, Canada, and New Zealand — constitutes the most extensive and deeply integrated intelligence-sharing partnership in history. Its origins trace to World War II, and its current operational structure remains largely classified."}
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. HeritageList — Minimal vertical date list
// ─────────────────────────────────────────────────────────────────────────────

export function HeritageList({ events, locale = "en" }: { events: IntelligenceHeritageEvent[]; locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isRo = locale === "ro";

  return (
    <section
      ref={ref}
      className="relative px-6 sm:px-10 lg:px-16 py-28 md:py-40"
      style={{ background: INTEL.black }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mx-auto max-w-[1100px]"
      >
        {/* Section header */}
        <div className="mb-20 lg:mb-28">
          <div
            className="intel-bureaucratic mb-8"
            style={{ fontSize: "9px", letterSpacing: "0.35em", color: INTEL.greenText }}
          >
            {isRo ? "CRONOLOGIE // MOMENTE DEFINITORII" : "CHRONOLOGY // DEFINING MOMENTS"}
          </div>
          <div
            className="intel-editorial"
            style={{ fontSize: "clamp(22px, 3.5vw, 38px)", lineHeight: 1.3 }}
          >
            {isRo
              ? "Momentele care au modelat comunitea de informații."
              : "The moments that shaped the intelligence community."}
          </div>
        </div>

        {/* Vertical date list — no images, no cards */}
        <div className="space-y-0">
          {events.map((event, i) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1.0, delay: i * 0.12, ease: "easeOut" }}
            >
              <div
                className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-6 sm:gap-10 py-8 items-baseline"
                style={{ borderBottom: `1px solid ${INTEL.border}` }}
              >
                {/* Year */}
                <div
                  className="intel-bureaucratic"
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: INTEL.greenText,
                  }}
                >
                  {event.year}
                </div>

                {/* Event */}
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "clamp(13px, 1.5vw, 16px)",
                      fontWeight: 400,
                      letterSpacing: "0.05em",
                      color: INTEL.paper,
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    {event.title}
                  </h3>
                  <p className="intel-body max-w-xl" style={{ fontSize: "11px" }}>
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. ClassifiedPrograms — Future programs with [REDACTED] markers
// ─────────────────────────────────────────────────────────────────────────────

export function ClassifiedPrograms({ programs, locale = "en" }: { programs: IntelligenceFutureProgram[]; locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isRo = locale === "ro";

  return (
    <section
      ref={ref}
      className="relative px-6 sm:px-10 lg:px-16 py-28 md:py-40"
      style={{ background: INTEL.black }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mx-auto max-w-[900px]"
      >
        {/* Section header */}
        <div className="mb-20 lg:mb-28">
          <div
            className="intel-bureaucratic mb-8"
            style={{ fontSize: "9px", letterSpacing: "0.35em", color: INTEL.greenText }}
          >
            {isRo ? "PROGRAME CLASIFICATE // ACCES RESTRICȚIONAT" : "CLASSIFIED PROGRAMS // RESTRICTED ACCESS"}
          </div>
          <div
            className="intel-editorial"
            style={{ fontSize: "clamp(22px, 3.5vw, 38px)", lineHeight: 1.3 }}
          >
            {isRo
              ? "Inițiative tehnologice care vor defini deceniul următor."
              : "Technological initiatives that will define the next decade."}
          </div>
        </div>

        {/* Programs — document-style layout */}
        <div
          className="p-6 sm:p-10"
          style={{ background: INTEL.surface, border: `1px solid ${INTEL.border}` }}
        >
          {programs.map((program, i) => (
            <div
              key={program.label}
              className={cn("pb-10", i < programs.length - 1 && "mb-10 border-b")}
              style={{ borderColor: INTEL.border }}
            >
              {/* Status marker */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span
                  className="intel-bureaucratic"
                  style={{ fontSize: "9px", color: INTEL.greenText, letterSpacing: "0.25em" }}
                >
                  {program.label.toUpperCase()}
                </span>
                <span
                  className="intel-bureaucratic px-2 py-0.5"
                  style={{
                    fontSize: "8px",
                    color: INTEL.paper,
                    letterSpacing: "0.15em",
                    background: INTEL.redact,
                    border: `1px solid ${INTEL.border}`,
                  }}
                >
                  [{program.status.toUpperCase()}]
                </span>
              </div>

              {/* Title — editorial */}
              <h3
                className="intel-editorial mb-4"
                style={{ fontSize: "clamp(18px, 2.5vw, 24px)", lineHeight: 1.3 }}
              >
                {program.title}
              </h3>

              {/* Description */}
              <p className="intel-body mb-6 max-w-2xl">{program.description}</p>

              {/* Specs — clean monospace rows */}
              <div style={{ borderTop: `1px solid ${INTEL.border}` }}>
                {program.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] py-2.5 items-baseline"
                    style={{ borderBottom: `1px solid ${INTEL.border}` }}
                  >
                    <span
                      className="intel-bureaucratic"
                      style={{ fontSize: "8px", color: INTEL.greenText, letterSpacing: "0.15em" }}
                    >
                      {spec.label.toUpperCase()}
                    </span>
                    <span
                      className="intel-body"
                      style={{ fontSize: "11px", color: INTEL.paperDim }}
                    >
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Document footer */}
        <div
          className="p-4 sm:p-6 mt-2 flex justify-between items-center"
          style={{ background: INTEL.surface, border: `1px solid ${INTEL.border}` }}
        >
          <span className="intel-bureaucratic" style={{ fontSize: "8px", color: INTEL.paperFaint }}>
            {isRo ? "SFÂRȘIT REGISTRU" : "END OF REGISTRY"}
          </span>
          <span className="intel-bureaucratic" style={{ fontSize: "8px", color: INTEL.greenText }}>
            [CLASSIFIED]
          </span>
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. ClosingQuote — Playfair italic, centered
// ─────────────────────────────────────────────────────────────────────────────

export function ClosingQuote({ locale = "en" }: { locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isRo = locale === "ro";

  const branches = [
    {
      href: "/military/navy",
      label: isRo ? "Marina" : "Navy",
    },
    {
      href: "/military/space-force",
      label: isRo ? "Forțele Spațiale" : "Space Force",
    },
    {
      href: "/military/air-force",
      label: isRo ? "Forțele Aeriene" : "Air Force",
    },
    {
      href: "/military/global-bases",
      label: isRo ? "Baze Globale" : "Global Bases",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative px-6 sm:px-10 lg:px-16 py-40 md:py-56"
      style={{ background: INTEL.black }}
      data-closing-section
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="mx-auto max-w-[800px] text-center"
      >
        {/* The quote */}
        <div
          className="intel-editorial mb-12"
          style={{
            fontSize: "clamp(22px, 4vw, 40px)",
            lineHeight: 1.35,
            fontStyle: "italic",
          }}
        >
          {isRo
            ? "\u201ECel mai important lucru pe care l-am \u00EEnv\u0103\u021Bat este c\u0103 nu po\u021Bi c\u00E2\u0219tiga un r\u0103zboi f\u0103r\u0103 informa\u021Bii.\u201D"
            : "\u201CThe most important thing I learned is that you cannot win a war without intelligence.\u201D"}
        </div>

        {/* Attribution */}
        <div
          className="intel-bureaucratic mb-32"
          style={{ fontSize: "9px", color: INTEL.paperFaint, letterSpacing: "0.2em" }}
        >
          — DWIGHT D. EISENHOWER
        </div>

        {/* Separator */}
        <div className="intel-separator mb-16" style={{ background: INTEL.green, opacity: 0.15 }} />

        {/* CTA */}
        <div className="mb-16">
          <Link
            href="/military"
            className="group inline-flex h-10 items-center gap-3 px-6 text-[10px] font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-70"
            style={{
              fontFamily: "var(--font-mono), monospace",
              color: INTEL.paper,
              border: `1px solid ${INTEL.border}`,
              background: INTEL.surface,
            }}
          >
            {isRo ? "Prezentare Militară" : "Military Overview"}
            <ArrowUpRight size={12} strokeWidth={2} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Navigation cross-links */}
        <div
          className="intel-bureaucratic mb-8"
          style={{ fontSize: "8px", letterSpacing: "0.25em", color: INTEL.paperFaint }}
        >
          {isRo ? "ALTE DIMENSIUNI MILITARE" : "OTHER MILITARY DIMENSIONS"}
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {branches.map((b) => (
            <Link
              key={b.href}
              href={b.href}
              className="intel-bureaucratic transition-colors hover:opacity-60"
              style={{
                fontSize: "9px",
                letterSpacing: "0.15em",
                color: INTEL.paperDim,
              }}
            >
              {b.label.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* Final classification marking */}
        <div className="mt-24">
          <span
            className="intel-bureaucratic"
            style={{ fontSize: "8px", letterSpacing: "0.3em", color: INTEL.greenText, opacity: 0.4 }}
          >
            // END OF FILE //
          </span>
        </div>
      </motion.div>
    </section>
  );
}
