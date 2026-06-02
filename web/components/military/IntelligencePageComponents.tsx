"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import flagAus from "@/ASSETS/Flags/Flag_of_Australia.svg";
import flagCan from "@/ASSETS/Flags/Flag_of_Canada.svg";
import flagNzl from "@/ASSETS/Flags/Flag_of_New_Zealand.svg";
import flagUk from "@/ASSETS/Flags/Flag_of_the_United_Kingdom.svg";
import flagUsa from "@/ASSETS/Flags/Flag_of_the_United_States.svg";
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
  paperDim: "rgba(232, 226, 213, 0.50)",
  paperFaint: "rgba(232, 226, 213, 0.20)",
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
        letter-spacing: 0.15em;
        text-transform: uppercase;
        font-size: clamp(12px, 1vw, 14px);
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

      /* Document body text — scaled up to match military pages */
      .intel-body {
        font-family: var(--font-body, 'Inter', system-ui, sans-serif);
        font-size: clamp(14px, 1.2vw, 17px);
        line-height: 1.9;
        letter-spacing: 0.02em;
        color: var(--intel-paper-dim);
      }

      /* Redaction bar */
      .intel-redacted {
        background: var(--intel-redact);
        color: transparent;
        user-select: none;
        padding: 1px 4px;
        margin: 0 2px;
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
    `}</style>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

// 3. SingleStatistic — One massive number
// ─────────────────────────────────────────────────────────────────────────────

export function SingleStatistic({ locale = "en" }: { locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isRo = locale === "ro";

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center px-6 pt-16 pb-60 md:pt-20 md:pb-80"
      style={{ background: INTEL.black }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2.0, ease: "easeOut" }}
        className="text-center max-w-4xl"
      >
        <div
          className="intel-editorial"
          style={{
            fontSize: "clamp(72px, 14vw, 180px)",
            lineHeight: 0.9,
            fontWeight: 400,
            fontStyle: "italic",
            color: INTEL.paper,
            letterSpacing: "-0.03em",
          }}
        >
          {isRo ? "1.271.000" : "1,271,000"}
        </div>

        <div className="mt-10">
          <span
            className="intel-bureaucratic"
            style={{
              fontSize: "clamp(12px, 1vw, 15px)",
              letterSpacing: "0.2em",
              color: INTEL.paperDim,
              lineHeight: 2,
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
// 4. AgencyDossier — Vertical scrolling chapters
// ─────────────────────────────────────────────────────────────────────────────

function AgencyChapter({ agency, isLast }: { agency: IntelligenceAgency; isLast: boolean }) {
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
          <div className="relative w-36 h-36 lg:w-44 lg:h-44">
            <Image
              src={agency.imageSrc}
              alt={`${agency.name} Seal`}
              width={176}
              height={176}
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
          <div
            className="intel-bureaucratic mb-5"
            style={{ fontSize: "clamp(11px, 0.9vw, 14px)", color: INTEL.greenText, letterSpacing: "0.2em" }}
          >
            {agency.name.toUpperCase()} // EST. {agency.stats.find((s) => s.label === "Founded" || s.label === "Fondat\u0103")?.value || "CLASSIFIED"}
          </div>

          <div
            className="intel-editorial mb-6"
            style={{ fontSize: "clamp(24px, 3.5vw, 42px)", lineHeight: 1.2 }}
          >
            {agency.role}
          </div>

          <p className="intel-body max-w-2xl mb-8">
            {agency.description}
          </p>

          <div className="flex flex-wrap gap-x-14 gap-y-5">
            {agency.stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span
                  className="intel-bureaucratic mb-1.5"
                  style={{ fontSize: "clamp(10px, 0.8vw, 12px)", letterSpacing: "0.18em", color: INTEL.greenText }}
                >
                  {s.label.toUpperCase()}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "clamp(13px, 1vw, 16px)",
                    color: INTEL.paper,
                    letterSpacing: "0.04em",
                  }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

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
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-24 lg:mb-32">
          <div
            className="intel-bureaucratic mb-8"
            style={{ fontSize: "clamp(11px, 0.9vw, 14px)", letterSpacing: "0.25em", color: INTEL.greenText }}
          >
            {isRo ? "DOSARE AGEN\u021AII" : "AGENCY DOSSIERS"}
          </div>
          <div
            className="intel-editorial"
            style={{ fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.2 }}
          >
            {isRo
              ? "Cele cinci agen\u021Bii care ancoreaz\u0103 sistemul de informa\u021Bii al Statelor Unite."
              : "The five agencies that anchor the intelligence apparatus of the United States."}
          </div>
        </div>

        <div className="space-y-0">
          {agencies.map((agency, i) => (
            <AgencyChapter
              key={agency.id}
              agency={agency}
              isLast={i === agencies.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. IntelligenceDisciplines — Clean section (no fake document wrapper)
// ─────────────────────────────────────────────────────────────────────────────

function RedactedText({ children }: { children: React.ReactNode }) {
  return <span className="intel-redacted">{children}</span>;
}

export function IntelligenceDisciplines({ capabilities, locale = "en" }: { capabilities: IntelligenceCapability[]; locale?: Locale }) {
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
        className="mx-auto max-w-[1200px]"
      >
        {/* Section header */}
        <div className="mb-24 lg:mb-32">
          <div
            className="intel-bureaucratic mb-8"
            style={{ fontSize: "clamp(11px, 0.9vw, 14px)", letterSpacing: "0.25em", color: INTEL.greenText }}
          >
            {isRo ? "DISCIPLINE DE COLECTARE" : "COLLECTION DISCIPLINES"}
          </div>
          <div
            className="intel-editorial"
            style={{ fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.2 }}
          >
            {isRo
              ? "Cele cinci moduri fundamentale prin care informa\u021Biile sunt ob\u021Binute."
              : "The five fundamental modes through which intelligence is gathered."}
          </div>
        </div>

        {/* Disciplines — clean alternating layout */}
        <div className="space-y-0">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
            >
              <div
                className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-12 py-12 items-baseline"
                style={{ borderBottom: `1px solid ${INTEL.border}` }}
              >
                {/* Kicker */}
                <div
                  className="intel-bureaucratic"
                  style={{ fontSize: "clamp(11px, 0.9vw, 14px)", letterSpacing: "0.15em", color: INTEL.greenText }}
                >
                  {cap.kicker}
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="intel-editorial mb-4"
                    style={{ fontSize: "clamp(22px, 3vw, 36px)", lineHeight: 1.2 }}
                  >
                    {cap.title}
                  </h3>

                  <p className="intel-body max-w-2xl mb-5">
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

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
        className="mx-auto max-w-[1200px]"
      >
        <div className="mb-20 lg:mb-28">
          <div
            className="intel-bureaucratic mb-8"
            style={{ fontSize: "clamp(11px, 0.9vw, 14px)", letterSpacing: "0.25em", color: INTEL.greenText }}
          >
            {isRo ? "INSTALA\u021AII GLOBALE" : "GLOBAL INSTALLATIONS"}
          </div>
          <div
            className="intel-editorial"
            style={{ fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.2 }}
          >
            {isRo
              ? "Sta\u021Bii de interceptare \u0219i noduri criptologice pozi\u021Bionate strategic pe tot globul."
              : "Interception stations and cryptologic hubs positioned strategically across the globe."}
          </div>
        </div>

        <div className="space-y-0">
          {nodes.map((node, i) => (
            <motion.div
              key={node.name}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: i * 0.12, ease: "easeOut" }}
            >
              <div
                className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 md:gap-12 py-12 items-baseline"
                style={{ borderBottom: `1px solid ${INTEL.border}` }}
              >
                <div
                  className="intel-bureaucratic"
                  style={{ fontSize: "clamp(11px, 0.9vw, 14px)", letterSpacing: "0.15em", color: INTEL.greenText }}
                >
                  {node.location.toUpperCase()}
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "clamp(18px, 2.5vw, 28px)",
                      fontWeight: 400,
                      letterSpacing: "0.02em",
                      color: INTEL.paper,
                      marginBottom: "8px",
                      textTransform: "uppercase",
                    }}
                  >
                    {node.name}
                  </h3>
                  <div
                    className="intel-bureaucratic mb-4"
                    style={{ fontSize: "clamp(11px, 0.9vw, 13px)", color: INTEL.greenText, letterSpacing: "0.12em" }}
                  >
                    {node.role.toUpperCase()}
                  </div>
                  <p className="intel-body max-w-2xl">
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
// 8. FiveEyesGeometry — Symmetrical network map representation (no pentagram)
// ─────────────────────────────────────────────────────────────────────────────

export function FiveEyesGeometry({ locale = "en" }: { locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isRo = locale === "ro";

  // Points layout: USA at the center, other 4 on edges (maximally expanded symmetrical layout centered at 250,220)
  const points = [
    { x: 250, y: 220, label: "USA" },          // center
    { x: 60, y: 50, label: "UK" },             // top-left
    { x: 440, y: 50, label: "AUS" },           // top-right
    { x: 440, y: 390, label: "NZL" },          // bottom-right
    { x: 60, y: 390, label: "CAN" },           // bottom-left
  ];

  // All connecting lines (every pair)
  const lines: [number, number][] = [];
  for (let i = 0; i < 5; i++) {
    for (let j = i + 1; j < 5; j++) {
      lines.push([i, j]);
    }
  }

  const flagMap: Record<string, string> = {
    USA: flagUsa.src,
    UK: flagUk.src,
    AUS: flagAus.src,
    NZL: flagNzl.src,
    CAN: flagCan.src,
  };

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
            style={{ fontSize: "clamp(11px, 0.9vw, 14px)", letterSpacing: "0.25em", color: INTEL.greenText }}
          >
            {isRo ? "ALIANȚĂ DE INFORMAȚII // TRATATUL UKUSA" : "INTELLIGENCE ALLIANCE // UKUSA TREATY"}
          </div>
          <div
            className="intel-editorial mx-auto"
            style={{ fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.2, maxWidth: "700px" }}
          >
            {isRo
              ? "Cei cinci ochi care văd totul."
              : "The five eyes that see everything."}
          </div>
        </div>

        {/* SVG Diagram */}
        <div className="flex justify-center">
          <svg viewBox="0 0 500 440" className="w-full max-w-[540px] h-auto">
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
                {/* Flag Image with custom transition */}
                <g
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "scale(1)" : "scale(0)",
                    transformOrigin: `${p.x}px ${p.y}px`,
                    transition: `opacity 0.8s ease-out ${0.5 + i * 0.2}s, transform 0.8s ease-out ${0.5 + i * 0.2}s`,
                  }}
                >
                  {/* Faint background container to hold the flag */}
                  <rect
                    x={p.x - 34}
                    y={p.y - 21}
                    width={68}
                    height={42}
                    fill="#050505"
                    stroke={INTEL.green}
                    strokeWidth="1"
                    rx="1"
                  />
                  <image
                    href={flagMap[p.label]}
                    x={p.x - 33}
                    y={p.y - 20}
                    width={66}
                    height={40}
                    preserveAspectRatio="none"
                  />
                </g>

                {/* Label */}
                <text
                  x={p.x}
                  y={p.y + (p.label === "USA" ? -32 : p.y < 220 ? -32 : 44)}
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
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="intel-body" style={{ lineHeight: 2 }}>
            {isRo
              ? "Alianța Five Eyes — compusă din Statele Unite, Regatul Unit, Australia, Canada și Noua Zeelandă — constituie cel mai extins și profund parteneriat de schimb de informații din istorie. Originile sale datează din Al Doilea Război Mondial, iar structura sa actuală rămâne în mare parte clasificată."
              : "The Five Eyes alliance — comprising the United States, United Kingdom, Australia, Canada, and New Zealand — constitutes the most extensive and deeply integrated intelligence-sharing partnership in history. Its origins trace to World War II, and its current operational structure remains largely classified."}
          </p>
        </div>
      </div>
    </section>
  );
}


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
        className="mx-auto max-w-[1200px]"
      >
        <div className="mb-20 lg:mb-28">
          <div
            className="intel-bureaucratic mb-8"
            style={{ fontSize: "clamp(11px, 0.9vw, 14px)", letterSpacing: "0.25em", color: INTEL.greenText }}
          >
            {isRo ? "CRONOLOGIE" : "CHRONOLOGY"}
          </div>
          <div
            className="intel-editorial"
            style={{ fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.2 }}
          >
            {isRo
              ? "Momentele care au modelat comunitatea de informa\u021Bii."
              : "The moments that shaped the intelligence community."}
          </div>
        </div>

        <div className="space-y-0">
          {events.map((event, i) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1.0, delay: i * 0.1, ease: "easeOut" }}
            >
              <div
                className="grid grid-cols-[80px_1fr] sm:grid-cols-[140px_1fr] gap-6 sm:gap-12 py-10 items-baseline"
                style={{ borderBottom: `1px solid ${INTEL.border}` }}
              >
                <div
                  className="intel-bureaucratic"
                  style={{
                    fontSize: "clamp(15px, 1.5vw, 20px)",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: INTEL.greenText,
                  }}
                >
                  {event.year}
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "clamp(16px, 2vw, 22px)",
                      fontWeight: 400,
                      letterSpacing: "0.04em",
                      color: INTEL.paper,
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    {event.title}
                  </h3>
                  <p className="intel-body max-w-2xl">
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
// 10. IntelligenceFailures — Gravitas section
// ─────────────────────────────────────────────────────────────────────────────

interface IntelFailure {
  year: string;
  title: string;
  description: string;
  cost: string;
}

const FAILURES_EN: IntelFailure[] = [
  {
    year: "1941",
    title: "Pearl Harbor",
    description: "Despite intercepted Japanese diplomatic communications and multiple warning indicators, intelligence agencies failed to synthesize fragmentary data into a coherent warning. The attack killed 2,403 Americans and drew the United States into World War II.",
    cost: "2,403 killed. Pacific Fleet crippled.",
  },
  {
    year: "1961",
    title: "Bay of Pigs",
    description: "CIA-planned invasion of Cuba by 1,400 Cuban exiles collapsed within 72 hours. Intelligence assessments overestimated popular support for an uprising, underestimated Castro's military readiness, and failed to maintain operational security.",
    cost: "114 killed. 1,189 captured.",
  },
  {
    year: "2001",
    title: "September 11",
    description: "Seventeen agencies held fragments of the threat picture \u2014 flight school surveillance, intercepted communications, watch-list matches \u2014 but institutional barriers prevented the assembly of a complete warning. The failure led directly to the creation of the Director of National Intelligence and the restructuring of the entire community.",
    cost: "2,977 killed. Intelligence community restructured.",
  },
];

const FAILURES_RO: IntelFailure[] = [
  {
    year: "1941",
    title: "Pearl Harbor",
    description: "\u00CEn ciuda intercept\u0103rii comunica\u021Biilor diplomatice japoneze \u0219i a multiplelor indicii de avertizare, agen\u021Biile de informa\u021Bii nu au reu\u0219it s\u0103 sintetizeze datele fragmentare \u00EEntr-un avertisment coerent. Atacul a ucis 2.403 de americani.",
    cost: "2.403 uci\u0219i. Flota Pacificului distrus\u0103.",
  },
  {
    year: "1961",
    title: "Golful Porcilor",
    description: "Invazia Cubei planificat\u0103 de CIA cu 1.400 de exila\u021Bi cubanezi s-a pr\u0103bu\u0219it \u00EEn 72 de ore. Evalu\u0103rile de informa\u021Bii au supraestimat sprijinul popular \u0219i au subestimat preg\u0103tirea militar\u0103 a lui Castro.",
    cost: "114 uci\u0219i. 1.189 captura\u021Bi.",
  },
  {
    year: "2001",
    title: "11 Septembrie",
    description: "\u0218aptesprezece agen\u021Bii de\u021Bineau fragmente ale imaginii amenin\u021B\u0103rii \u2014 supraveghere \u0219coli de zbor, comunica\u021Bii interceptate, potriviri pe liste de urm\u0103rire \u2014 dar barierele institu\u021Bionale au \u00EEmpiedicat asamblarea unui avertisment complet.",
    cost: "2.977 uci\u0219i. Comunitatea de informa\u021Bii restructurat\u0103.",
  },
];

export function IntelligenceFailures({ locale = "en" }: { locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isRo = locale === "ro";
  const failures = isRo ? FAILURES_RO : FAILURES_EN;

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
        className="mx-auto max-w-[1200px]"
      >
        {/* Editorial intro — the rare Playfair moment */}
        <div className="mb-24 lg:mb-32">
          <div
            className="intel-editorial"
            style={{ fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.2 }}
          >
            {isRo
              ? "Costul a ceea ce a fost ratat."
              : "The cost of what was missed."}
          </div>
          <p className="intel-body mt-8 max-w-3xl">
            {isRo
              ? "Un serviciu de informa\u021Bii care \u00EE\u0219i celebreaz\u0103 doar succesele este un serviciu care nu a \u00EEnv\u0103\u021Bat nimic. Aceste momente definesc comunitatea la fel de mult ca victoriile ei."
              : "An intelligence community that only celebrates its successes is one that has learned nothing. These moments define the community as much as its victories."}
          </p>
        </div>

        {/* Failure entries */}
        <div className="space-y-0">
          {failures.map((failure, i) => (
            <motion.div
              key={failure.year}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
            >
              <div
                className="grid grid-cols-[80px_1fr] sm:grid-cols-[140px_1fr] gap-6 sm:gap-12 py-12 items-baseline"
                style={{ borderBottom: `1px solid ${INTEL.border}` }}
              >
                <div
                  className="intel-bureaucratic"
                  style={{
                    fontSize: "clamp(15px, 1.5vw, 20px)",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: INTEL.greenText,
                  }}
                >
                  {failure.year}
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "clamp(18px, 2.5vw, 28px)",
                      fontWeight: 400,
                      letterSpacing: "0.04em",
                      color: INTEL.paper,
                      textTransform: "uppercase",
                      marginBottom: "10px",
                    }}
                  >
                    {failure.title}
                  </h3>
                  <p className="intel-body max-w-2xl mb-6">
                    {failure.description}
                  </p>
                  <div
                    className="intel-bureaucratic"
                    style={{ fontSize: "clamp(11px, 0.9vw, 13px)", color: INTEL.paperDim, letterSpacing: "0.12em" }}
                  >
                    {failure.cost}
                  </div>
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
// 11. FuturePrograms — Clean layout (no fake classified markers)
// ─────────────────────────────────────────────────────────────────────────────

export function FuturePrograms({ programs, locale = "en" }: { programs: IntelligenceFutureProgram[]; locale?: Locale }) {
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
        className="mx-auto max-w-[1200px]"
      >
        {/* Section header */}
        <div className="mb-24 lg:mb-32">
          <div
            className="intel-bureaucratic mb-8"
            style={{ fontSize: "clamp(11px, 0.9vw, 14px)", letterSpacing: "0.25em", color: INTEL.greenText }}
          >
            {isRo ? "PROGRAME \u00CEN DEZVOLTARE" : "PROGRAMS IN DEVELOPMENT"}
          </div>
          <div
            className="intel-editorial"
            style={{ fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.2 }}
          >
            {isRo
              ? "Ini\u021Biativele tehnologice care vor defini deceniul urm\u0103tor."
              : "The technological initiatives that will define the next decade."}
          </div>
        </div>

        {/* Programs */}
        <div className="space-y-0">
          {programs.map((program, i) => (
            <motion.div
              key={program.label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
            >
              <div
                className="py-12"
                style={{ borderBottom: `1px solid ${INTEL.border}` }}
              >
                {/* Header */}
                <div className="flex flex-wrap items-baseline gap-6 mb-4">
                  <h3
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "clamp(18px, 2.5vw, 28px)",
                      fontWeight: 400,
                      letterSpacing: "0.04em",
                      color: INTEL.paper,
                      textTransform: "uppercase",
                    }}
                  >
                    {program.title}
                  </h3>
                  <span
                    className="intel-bureaucratic"
                    style={{ fontSize: "clamp(10px, 0.8vw, 13px)", color: INTEL.greenText }}
                  >
                    {program.status}
                  </span>
                </div>

                <p className="intel-body max-w-3xl mb-8">{program.description}</p>

                {/* Specs grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {program.specs.map((spec) => (
                    <div key={spec.label} className="flex flex-col">
                      <span
                        className="intel-bureaucratic mb-2"
                        style={{ fontSize: "clamp(10px, 0.8vw, 12px)", color: INTEL.greenText, letterSpacing: "0.15em" }}
                      >
                        {spec.label.toUpperCase()}
                      </span>
                      <span className="intel-body" style={{ fontSize: "clamp(13px, 1vw, 15px)", color: INTEL.paper }}>
                        {spec.value}
                      </span>
                    </div>
                  ))}
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
// 12. TheVault — CIA Reading Room Interactive Explorer
// ─────────────────────────────────────────────────────────────────────────────

interface VaultDoc {
  id: string;
  refNo: string;
  date: string;
  title: string;
  classification: string;
  to: string;
  from: string;
  subject: string;
  content: string;
}

interface VaultFolder {
  id: string;
  name: string;
  documents: VaultDoc[];
}

const VAULT_DATA_EN: VaultFolder[] = [
  {
    id: "cold-war",
    name: "COLD WAR DOSSIERS",
    documents: [
      {
        id: "cuba-u2",
        refNo: "CIA-NID-1962-10-22",
        date: "22 OCTOBER 1962",
        title: "U-2 PHOTOGRAPHIC RECONNAISSANCE OF SAN CRISTOBAL",
        classification: "TOP SECRET // EYES ONLY",
        to: "THE PRESIDENT OF THE UNITED STATES",
        from: "DIRECTOR OF CENTRAL INTELLIGENCE",
        subject: "CONFIRMED DEPLOYMENT OF SOVIET MRBMs IN CUBA",
        content: "Photographic reconnaissance flights executed on 14 October have confirmed the installation of [redact]SS-4 Sandal medium-range ballistic missiles[/redact] near San Cristobal, Cuba. Analysts at the National Photographic Interpretation Center (NPIC) have identified [redact]six launch pads[/redact] capable of striking major urban areas of the eastern United States within [redact]18 minutes[/redact] of command authorization. Strategic bombers at Soviet staging airbases remain in alert state [redact]DEFCON-2 equivalent[/redact].\n\nAdditionally, ground telemetry indicates the arrival of [redact]42 Il-28 nuclear-capable bombers[/redact] and Soviet troop contingents at [redact]San Julian airbase[/redact]. Reconnaissance photos reveal security perimeters manned by Soviet combat units, indicating operational control resides with [redact]General Issa Pliyev[/redact]. EXCOMM advises immediate blockade action.\n\nOperational directive from JCS authorizes [redact]low-level tactical reconnaissance zips[/redact] under Operation Blue Moon. Air Force assets at Homestead AFB are on high alert. Any interference with USAF reconnaissance assets will be met with [redact]immediate retaliatory air strikes[/redact] against Cuban air defense nodes."
      },
      {
        id: "berlin-tunnel",
        refNo: "CIA-SOG-1956-04-22",
        date: "22 APRIL 1956",
        title: "OPERATION PBJOINTLY: SOVIET INTERCEPT SUSPENSION",
        classification: "SECRET // NOFORN",
        to: "CHIEF, FOREIGN INTELLIGENCE STATIONS",
        from: "BERLIN OPERATIONS STATION COMMANDER",
        subject: "COMPROMISE AND RECOVERY ACTION AT SECTION 4",
        content: "At approximately 0210 hours, Soviet army engineers penetrated the subterranean conduit located in the [redact]Soviet sector of Berlin[/redact]. Operation PBJOINTLY has been compromised. Post-incident analysis suggests that the [redact]KGB had advance warning[/redact] of the excavation since late 1954, likely through a high-level mole inside [redact]SIS (MI6)[/redact], code-named [redact]George Blake[/redact]. All signals recording operations at the site are ceased immediately.\n\nEmergency destruction of all [redact]Ampex magnetic recording tapes[/redact] and cryptographic terminal equipment at the West Berlin terminal has been completed. Preliminary debriefings indicate that over [redact]443,000 intercepted conversations[/redact] were gathered before breach. Safe evacuation of [redact]two high-level Eastern informants[/redact] is under coordination.\n\nSecurity sweep of all West Berlin command points is underway to isolate further [redact]SIS/CIA leaks[/redact]. Agent Blake remains active inside the network, but counterintelligence assets have begun [redact]monitored feed injections[/redact] to feed false intelligence to Soviet officers in Karlshorst."
      }
    ]
  },
  {
    id: "clandestine-sci",
    name: "CLANDESTINE SCIENCE",
    documents: [
      {
        id: "mkultra-68",
        refNo: "CIA-TSS-MKULTRA-68",
        date: "14 JUNE 1957",
        title: "SUBPROJECT 68: PSYCHOACTIVE DRUG EVALUATION",
        classification: "SECRET // DECLASSIFIED A1",
        to: "CHIEF, TECHNICAL SERVICES STAFF",
        from: "DIRECTOR, RESEARCH SUBPROJECT 68",
        subject: "TREATMENT PATTERNS AT THE ALLAN MEMORIAL INSTITUTE",
        content: "Subproject 68 experiments continue to assess the disruption of cognitive patterns via administration of [redact]high-dose LSD-25[/redact] combined with prolonged [redact]sensory deprivation[/redact]. Subjects are placed in induced sleep states for periods up to [redact]35 days[/redact] while listening to tape loops repeating verbal anchors. Preliminary outcomes indicate [redact]severe retrograde amnesia[/redact] in 85% of subjects, with complete personality de-patterning achieved.\n\nFurther phases will evaluate the application of [redact]electroconvulsive shock therapy[/redact] at voltages [redact]30-40% above normal clinical thresholds[/redact] to accelerate memory erasure. Funding has been routed through the [redact]Geschickter Fund for Medical Research[/redact] to mask agency sponsorship. Next progress report scheduled for [redact]September 1957[/redact].\n\nSecurity protocols have been upgraded. In the event of congressional inquiries or unauthorized disclosure, files are to be [redact]completely incinerated[/redact] under emergency authorization [redact]E.O. MK-DESTROY[/redact]. Only local copies held by [redact]Dr. Sidney Gottlieb[/redact] are to be preserved."
      },
      {
        id: "stargate-81",
        refNo: "DIA-DIA-SG-81",
        date: "18 SEPTEMBER 1981",
        title: "PROJECT STAR GATE: ESPIONAGE APPLICATIONS",
        classification: "SECRET // EYES ONLY // NOFORN",
        to: "COMMANDER, INSCOM",
        from: "PROJECT COORDINATOR, PSYCHOENERGETICS DIVISION",
        subject: "REMOTE VIEWING MISSION REPORT - USSR SUBMARINE BASE",
        content: "The viewer was targeted against the classified submarine building at [redact]Severodvinsk, USSR[/redact]. The viewer described a massive new class of submarine under construction, characterized by [redact]double hull titanium alloy[/redact] and carrying [redact]20 ballistic missile launch tubes[/redact]. Intelligence correlation confirms the presence of the [redact]Typhoon-class SSBN[/redact], matching the layout produced by the viewer during the session.\n\nSubsequent session coordinate matches at the [redact]Semipalatinsk test site[/redact] yielded highly accurate descriptions of a [redact]vertical underground shaft installation[/redact] and nuclear canister deployment. Project management recommends continued operational usage for [redact]denied areas[/redact] where satellite passes are blocked by weather or countermeasures.\n\nTraining methodologies have been expanded to include [redact]audio-binaural synchronization[/redact] techniques designed by the Monroe Institute. Subject viewers show enhanced coordinate lock-on rates under these conditions. Next target profile: [redact]Lop Nor nuclear weapons facility, China[/redact]."
      }
    ]
  },
  {
    id: "anomalous-uap",
    name: "ANOMALOUS PHENOMENA",
    documents: [
      {
        id: "bluebook-52",
        refNo: "USAF-BB-1952-07-19",
        date: "19 JULY 1952",
        title: "PROJECT BLUE BOOK: INCIDENT REPORT WASHINGTON DC",
        classification: "RESTRICTED // ARCHIVE",
        to: "COMMANDING GENERAL, AIR DEFENSE COMMAND",
        from: "CHIEF, PROJECT BLUE BOOK INVESTIGATION",
        subject: "UNIDENTIFIED RADAR INSIGHTS OVER CAPITAL AIRSPACE",
        content: "At 2340 hours, radar operators at Washington National Airport detected [redact]seven slow-moving objects[/redact] traveling at speeds ranging from 100 to [redact]7,000 miles per hour[/redact]. Commercial pilots reported visual observations of [redact]glowing orange lights[/redact] maneuvering in ways that violate known aerodynamic physics. Interceptor aircraft scrambles were initiated; however, the objects [redact]vanished instantly[/redact] upon aircraft approach, only to return when aircraft departed.\n\nF-94 interceptors reported severe electromagnetic interference causing [redact]temporary radio blackout[/redact] and navigation instruments disruption. Air Intelligence concludes that temperature inversion layer reflections cannot account for [redact]simultaneous visual and radar correlation[/redact]. Highly secret briefing presented to the [redact]National Security Council[/redact] under strict wraps.\n\nOfficial public relations guidelines direct all inquiries to be answered with [redact]natural atmospheric phenomena[/redact] explanations, specifically citing swamp gas, weather balloons, or [redact]mirage temperature inversions[/redact]. Personnel who witnessed the objects are sworn to secrecy under [redact]the Espionage Act[/redact]."
      },
      {
        id: "roswell-47",
        refNo: "RAAF-INT-1947-07-08",
        date: "08 JULY 1947",
        title: "RECOVERY REPORT: DEBRIS FIELD ANOMALY",
        classification: "TOP SECRET // EYES ONLY",
        to: "COMMANDING GENERAL, EIGHTH AIR FORCE",
        from: "INTELLIGENCE OFFICER, 509TH BOMB GROUP",
        subject: "ACQUISITION OF CLASSIFIED WEATHER CONSTALLATION PARTS",
        content: "Debris recovered from the Foster Ranch near Corona, New Mexico consists of metallic foil, wooden struts, and highly anomalous structural tape containing [redact]pictographic writing symbols[/redact]. Materials have been identified as part of the highly classified project [redact]Project Mogul balloon array[/redact], designed to detect Soviet nuclear atmospheric tests. Public media release has been altered to state the recovery of a [redact]standard weather balloon[/redact] to maintain intelligence operational security.\n\nAll recovered biological samples and structural remnants have been transported to [redact]Wright Field, Ohio[/redact] under armed escort. Initial structural analysis of the lightweight alloy shows it resists temperature up to [redact]3,000 degrees Fahrenheit[/redact] and does not bend under hydraulic press. Further analysis is restricted to [redact]Foreign Technology Division[/redact] personnel.\n\nMaterial samples have been designated under code name [redact]Project HELIOS[/redact] for forward transmission to [redact]Los Alamos Scientific Laboratory[/redact]. The metallurgical properties suggest an atomic structure that [redact]does not exist on the periodic table[/redact]. High-level surveillance of the Corona civilian population is active."
      }
    ]
  },
  {
    id: "surveillance-sig",
    name: "SURVEILLANCE SYSTEMS",
    documents: [
      {
        id: "echelon-72",
        refNo: "NSA-ECH-1972-11-03",
        date: "03 NOVEMBER 1972",
        title: "PROJECT ECHELON: AUTOMATED TELEGRAPH DECRYPTION",
        classification: "SECRET // UMBRA",
        to: "CHIEF, SIGNALS INTELLIGENCE DIRECTORATE",
        from: "PROGRAM MANAGER, ECHELON NETWORK",
        subject: "INTEGRATION OF DICTIONARY SEARCH WORDS AT STATION B",
        content: "The automated signals interception system at [redact]Menwith Hill Station[/redact] is now processing all trans-atlantic satellite communications. The search matrix utilizes a [redact]dictionary keyword database[/redact] to flag telegraph and telex transmissions containing target terms. Intercepted traffic is automatically routed to [redact]NSA HQ Fort Meade[/redact] for final cryptanalytic decoding. Daily throughput has exceeded [redact]two million messages[/redact].\n\nUnder FVEY integration, GCHQ and CSE have completed the implementation of [redact]Project Project P-415[/redact] software modules on their respective high-speed systems. This allows real-time automated routing of intercepts to [redact]COUNCIL OF FIVE[/redact] databases without manual operator intervention. System stability stands at [redact]99.8% operational availability[/redact].\n\nAdditionally, decryption of [redact]Soviet diplomatic cable traffic[/redact] is now running on the new [redact]CRAY-1 supercomputer mainframe[/redact]. Direct data links are operational between GCHQ Cheltenham and NSA Fort Meade to process the raw intelligence stream. Security classification upgraded to [redact]TOP SECRET // FVEY // UMBRA[/redact]."
      },
      {
        id: "minaret-69",
        refNo: "NSA-MIN-1969-08-15",
        date: "15 AUGUST 1969",
        title: "PROJECT MINARET: ANTI-WAR LIST FUSION",
        classification: "TOP SECRET // CODEWORD",
        to: "DIRECTOR, NATIONAL SECURITY AGENCY",
        from: "SPECIAL OPERATIONS BRANCH CHIEF",
        subject: "WATCHLIST COMPILATION FOR DOMESTIC ACTIVISTS",
        content: "Pursuant to inter-agency request, the SIGINT watchlist has been updated to include [redact]1,600 prominent American citizens[/redact] involved in civil rights and anti-Vietnam war movements. Intercepted international telephone calls and cables of targets including [redact]Martin Luther King Jr. and Jane Fonda[/redact] are being distributed to [redact]the FBI and CIA[/redact] under the code name Project MINARET. No judicial warrants have been obtained for these intercepts.\n\nTarget profiles are generated automatically based on [redact]link-analysis pattern matching[/redact] from the telegraph traffic. Transcripts are delivered via secure physical courier to [redact]Counterintelligence Staff at Langley[/redact] and Special Operations Division of FBI. Warning: this activity must not be disclosed in any [redact]civilian court proceedings[/redact] due to constitutional liability.\n\nTarget watchlist expansion under [redact]Operation Shamrock[/redact] is authorized, fusing telegraphic data with international voice intercepts. Intercept operators must sign [redact]Form 1099-ND[/redact] to ensure absolute compliance with secrecy mandates. The project will continue operating without external oversight."
      }
    ]
  }
];

const VAULT_DATA_RO: VaultFolder[] = [
  {
    id: "cold-war",
    name: "DOSARE RĂZBOI RECE",
    documents: [
      {
        id: "cuba-u2",
        refNo: "CIA-NID-1962-10-22",
        date: "22 OCTOMBRIE 1962",
        title: "RECUNOAȘTERE FOTOGRAFICĂ U-2 ÎN SAN CRISTOBAL",
        classification: "TOP SECRET // EYES ONLY",
        to: "PREȘEDINTELE STATELOR UNITE",
        from: "DIRECTORUL AGENȚIEI CENTRALE DE INFORMAȚII",
        subject: "DEPLASARE CONFIRMATĂ A RACHETELOR SOVIETICE ÎN CUBA",
        content: "Zborurile de recunoaștere din 14 octombrie au confirmat instalarea de [redact]rachete balistice cu rază medie SS-4 Sandal[/redact] lângă San Cristobal, Cuba. Analiștii au identificat [redact]șase rampe de lansare[/redact] capabile să lovească zonele urbane din estul SUA în [redact]18 minute[/redact] de la ordin. Bombardierele strategice din bazele sovietice rămân în stare de alertă [redact]echivalentă DEFCON-2[/redact].\n\nÎn plus, telemetria la sol indică sosirea a [redact]42 de bombardiere Il-28 capabile nuclear[/redact] și a contingentelor sovietice la baza aeriană [redact]San Julian[/redact]. Fotografiile relevă perimetre păzite de unități de luptă sovietice sub conducerea directă a [redact]Generalului Issa Pliyev[/redact]. EXCOMM recomandă instituirea blocadei maritime.\n\nDirectiva operațională de la JCS autorizează [redact]zboruri de recunoaștere tactică la joasă înălțime[/redact] în cadrul Operațiunii Blue Moon. Aviația de la Homestead AFB este în alertă maximă. Orice atac asupra aeronavelor USAF va fi urmat de [redact]lovituri aeriene imediate[/redact] asupra apărării antiaeriene cubaneze."
      },
      {
        id: "berlin-tunnel",
        refNo: "CIA-SOG-1956-04-22",
        date: "22 APRILIE 1956",
        title: "OPERAȚIUNEA PBJOINTLY: SUSPENDAREA INTERCEPTĂRILOR",
        classification: "SECRET // NOFORN",
        to: "ȘEFUL STAȚIILOR DE INFORMAȚII EXTERNE",
        from: "COMANDANTUL STAȚIEI DE OPERAȚIUNI BERLIN",
        subject: "COMPROMITERE ȘI ACȚIUNE DE RECUPERARE LA SECȚIUNEA 4",
        content: "La aproximativ ora 0210, inginerii armatei sovietice au pătruns în conducta subterană situată în [redact]sectorul sovietic din Berlin[/redact]. Operațiunea PBJOINTLY a fost compromisă. Analiza sugerează că [redact]KGB-ul a avut informații prealabile[/redact] încă din 1954, cel mai probabil printr-o cârtiță în [redact]SIS (MI6)[/redact], cu numele de cod [redact]George Blake[/redact]. Toate interceptările au fost oprite.\n\nDistrugerea de urgență a tuturor [redact]benzilor de înregistrare magnetică Ampex[/redact] și a echipamentelor criptografice din terminalul Berlinul de Vest a fost finalizată. Datele indică peste [redact]443.000 de conversații interceptate[/redact] înainte de pătrundere. Evacuarea în siguranță a [redact]doi informatori din est[/redact] este în curs de desfășurare.\n\nVerificarea de securitate a tuturor punctelor de comandă din Berlinul de Vest este în curs pentru a izola alte [redact]scurgeri SIS/CIA[/redact]. Agentul Blake rămâne activ, dar contra-informațiile au început [redact]injectarea de date monitorizate[/redact] false pentru ofițerii sovietici din Karlshorst."
      }
    ]
  },
  {
    id: "clandestine-sci",
    name: "ȘTIINȚĂ CLANDESTINĂ",
    documents: [
      {
        id: "mkultra-68",
        refNo: "CIA-TSS-MKULTRA-68",
        date: "14 IUNIE 1957",
        title: "SUBPROIECTUL 68: EVALUAREA SUBSTANȚELOR PSIHOACTIVE",
        classification: "SECRET // DECLASIFICAT A1",
        to: "ȘEFUL PERSONALULUI DE SERVICII TEHNICE",
        from: "DIRECTORUL SUBPROIECTULUI DE CERCETARE 68",
        subject: "MODELE DE TRATAMENT LA INSTITUTUL ALLAN MEMORIAL",
        content: "Experimentele subproiectului 68 continuă evaluarea perturbării cognitive prin administrarea de [redact]doze mari de LSD-25[/redact] combinată cu [redact]deprivarea senzorială[/redact] prelungită. Subiecții sunt plasați în somn indus timp de până la [redact]35 de zile[/redact] ascultând benzi audio repetitive. Rezultatele indică [redact]amnezie retrogradă severă[/redact] la 85% din cazuri.\n\nFazele următoare vor evalua aplicarea [redact]terapiei prin electroșocuri[/redact] la tensiuni cu [redact]30-40% peste pragul clinic normal[/redact] pentru a accelera ștergerea memoriei. Fondurile au fost direcționate prin [redact]Fondul Geschickter de Cercetări Medicale[/redact] pentru a masca implicarea Agenției.\n\nProtocoalele de securitate au fost actualizate. În cazul unor anchete parlamentare sau al divulgării neautorizate, dosarele vor fi [redact]complet incinerate[/redact] în baza autorizației de urgență [redact]E.O. MK-DESTROY[/redact]. Doar copiile locale deținute de [redact]Dr. Sidney Gottlieb[/redact] vor fi păstrate."
      },
      {
        id: "stargate-81",
        refNo: "DIA-DIA-SG-81",
        date: "18 SEPTEMBRIE 1981",
        title: "PROIECTUL STAR GATE: APLICAȚII DE ESPIONAJ",
        classification: "SECRET // EYES ONLY // NOFORN",
        to: "COMANDANTUL INSCOM",
        from: "COORDONATOR PROIECT, DIVIZIA PSIHOENERGETICĂ",
        subject: "RAPORT DE MISIUNE - BAZA SUBMARINE URSS",
        content: "Subiectul a vizat clădirea clasificată de submarine din [redact]Severodvinsk, URSS[/redact]. Acesta a descris un nou submarin masiv în construcție, caracterizat prin [redact]carcasă dublă din aliaj de titan[/redact] și dotat cu [redact]20 de tuburi de lansare rachete[/redact]. Datele confirmă prezența clasei [redact]Typhoon SSBN[/redact], corespunzând schiței realizate în sesiune.\n\nSesiunile ulterioare axate pe coordonatele de la [redact]poligonul Semipalatinsk[/redact] au oferit descrieri precise ale unui [redact]puț vertical subteran[/redact] și ale desfășurării de focoase. Conducerea proiectului recomandă utilizarea în continuare pentru [redact]zone interzise[/redact] în care sateliții sunt blocați de nori sau bruiaj.\n\nMetodologiile de antrenament au fost extinse pentru a include tehnici de [redact]sincronizare audio-binaurală[/redact] concepute de Institutul Monroe. Subiecții prezintă o rată sporită de localizare a coordonatelor. Următoarea țintă: [redact]instalația nucleară Lop Nor, China[/redact]."
      }
    ]
  },
  {
    id: "anomalous-uap",
    name: "FENOMENE ANOMALE",
    documents: [
      {
        id: "bluebook-52",
        refNo: "USAF-BB-1952-07-19",
        date: "19 IULIE 1952",
        title: "PROIECTUL BLUE BOOK: INCIDENTUL WASHINGTON DC",
        classification: "RESTRICTIONAT // ARHIVĂ",
        to: "GENERAL COMANDANT, COMANDAMENTUL DE APĂRARE AERIANĂ",
        from: "ȘEFUL INVESTIGAȚIEI PROIECTULUI BLUE BOOK",
        subject: "OBSERVAȚII RADAR NEIDENTIFICATE ÎN SPATIUL AERIAN REZIDENȚIAL",
        content: "La ora 2340, operatorii radar de la Aeroportul Național Washington au detectat [redact]șapte obiecte cu mișcare lentă[/redact] deplasându-se cu viteze de la 100 la [redact]11.000 km/h[/redact]. Piloții au raportat [redact]lumini portocalii strălucitoare[/redact] cu manevre ce încalcă legile fizicii. Avioanele de vânătoare au fost trimise; totuși, obiectele [redact]au dispărut instantaneu[/redact] la apropierea lor.\n\nInterceptoarele F-94 au raportat interferențe electromagnetice severe ce au cauzat [redact]blocarea radio temporară[/redact] și defectarea instrumentelor. Serviciile de Informații concluzionează că inversiunile termice nu pot explica [redact]corelația vizuală și radar simultană[/redact]. Raport prezentat la [redact]Consiliul de Securitate Națională[/redact].\n\nDirectivele oficiale de relații publice impun ca toate întrebările să primească răspunsuri bazate pe [redact]fenomene atmosferice naturale[/redact], invocând gazele de mlaștină, baloanele meteo sau [redact]inversiunile termice tip miraj[/redact]. Personalul a depus jurământ de confidențialitate conform [redact]Legii Espionajului[/redact]."
      },
      {
        id: "roswell-47",
        refNo: "RAAF-INT-1947-07-08",
        date: "08 IULIE 1947",
        title: "RAPORT DE RECUPERARE: ANOMALIE DEBRIS",
        classification: "TOP SECRET // EYES ONLY",
        to: "GENERALUL COMANDANT, FLOTA A OPTA AERIANĂ",
        from: "OFIȚER DE INFORMAȚII, GRUPUL 509 BOMBARDIERE",
        subject: "ACHIZIȚIE PIESE CLASIFICATE CONSTELLAȚIE METEO",
        content: "Resturile recuperate de la Foster Ranch de lângă Corona, New Mexico constau în folie metalică și bandă structurală anomală conținând [redact]simboluri pictografice[/redact]. Materialele au fost identificate as parte a proiectului clasificat [redact]Project Mogul (balon aerostatic)[/redact] pentru detectarea testelor nucleare sovietice. Comunicatul de presă a fost modificat indicând un [redact]balon meteo standard[/redact].\n\nToate probele biologice și rămășițele structurale recuperate au fost transportate la [redact]Wright Field, Ohio[/redact] sub escortă înarmată. Analiza structurală inițială a aliajului indică rezistență termică de până la [redact]1.650 grade Celsius[/redact] și flexibilitate nulă sub presă. Accesul este restricționat la [redact]Divizia de Tehnologii Străine[/redact].\n\nMostrele de materiale au fost desemnate sub numele de cod [redact]Proiectul HELIOS[/redact] pentru transmiterea către [redact]Laboratorul Științific Los Alamos[/redact]. Proprietățile metalurgice sugerează o structură atomică care [redact]nu există pe tabelul periodic[/redact]. Monitorizarea populației civile din Corona este activă."
      }
    ]
  },
  {
    id: "surveillance-sig",
    name: "INFORMAȚII DIN SEMNALE",
    documents: [
      {
        id: "echelon-72",
        refNo: "NSA-ECH-1972-11-03",
        date: "03 NOIEMBRIE 1972",
        title: "PROIECTUL ECHELON: DECRIPTARE TELEGRAFICĂ AUTOMATĂ",
        classification: "SECRET // UMBRA",
        to: "ȘEFUL DIRECȚIEI DE INFORMAȚII DIN SEMNALE",
        from: "MANAGER PROGRAM, REȚEAUA ECHELON",
        subject: "INTEGRAREA CUVINTELOR CHEIE LA STAȚIA B",
        content: "Sistemul automat de interceptare a semnalelor de la [redact]Menwith Hill Station[/redact] procesează acum toate comunicațiile prin satelit. Matricea de căutare utilizează o [redact]bază de date cu cuvinte cheie[/redact] pentru a semnala mesajele relevante. Traficul este direcționat automat la [redact]NSA HQ Fort Meade[/redact] pentru decodarea finală. Volumul depășește [redact]două milioane de mesaje zilnic[/redact].\n\nSub integrarea FVEY, GCHQ și CSE au finalizat implementarea modulelor software [redact]Proiectul P-415[/redact] pe sistemele lor. Acest lucru permite partajarea automată în timp real a interceptărilor către bazele de date [redact]CONSILIULUI CELOR CINCI[/redact] fără operator. Stabilitatea sistemului este de [redact]99.8% disponibilitate[/redact].\n\nÎn plus, decriptarea [redact]traficului diplomatic sovietic[/redact] rulează acum pe noul [redact]supercomputer mainframe CRAY-1[/redact]. Legăturile directe sunt operaționale între GCHQ Cheltenham și NSA Fort Meade pentru procesarea datelor. Clasificare ridicată la [redact]TOP SECRET // FVEY // UMBRA[/redact]."
      },
      {
        id: "minaret-69",
        refNo: "NSA-MIN-1969-08-15",
        date: "15 AUGUST 1969",
        title: "PROIECTUL MINARET: INFORMAȚII INTERNE",
        classification: "TOP SECRET // CODEWORD",
        to: "DIRECTORUL AGENȚIEI DE SECURITATE NAȚIONALĂ",
        from: "ȘEF OPERAȚIUNI SPECIALE",
        subject: "COMPILARE LISTĂ PENTRU ACTIVIȘTII INTERNI",
        content: "Conform solicitării inter-agenții, lista SIGINT a fost actualizată pentru a include [redact]1.600 de cetățeni americani de seamă[/redact] implicați în mișcările anti-război. Convorbirile și telegramele interceptate ale unor ținte ca [redact]Martin Luther King Jr. și Jane Fonda[/redact] are being distributed to [redact]the FBI and CIA[/redact] under the code name Project MINARET. No judicial warrants have been obtained for these intercepts.\n\nProfilele țintelor sunt generate automat pe baza [redact]analizei de legătură link-analysis[/redact] din traficul telegrafic. Transcrierile sunt livrate prin curier fizic securizat către [redact]Contra-informații Langley[/redact] și FBI. AVERTISMENT: această activitate nu trebuie divulgată în nicio [redact]procedură judiciară civilă[/redact] din cauza răspunderii constituționale.\n\nExtinderea listei de ținte sub [redact]Operațiunea Shamrock[/redact] este autorizată, fuzionând datele telegrafice cu interceptările vocale. Operatorii trebuie să semneze [redact]Formularul 1099-ND[/redact] pentru a asigura confidențialitatea. Proiectul va continua fără supraveghere externă."
      }
    ]
  }
];

function parseRedactions(text: string, isDeclassified: boolean) {
  const parts = text.split(/(\[redact\].*?\[\/redact\])/g);
  return parts.map((part, index) => {
    if (part.startsWith("[redact]") && part.endsWith("[/redact]")) {
      const innerText = part.slice(8, -9);
      return (
        <span
          key={index}
          className={cn(
            "transition-all duration-700 ease-in-out font-mono font-bold mx-0.5 px-1.5 rounded-sm",
            isDeclassified
              ? "bg-zinc-200 text-zinc-950 select-text"
              : "bg-zinc-950 text-transparent select-none pointer-events-none"
          )}
        >
          {innerText}
        </span>
      );
    }
    return part;
  });
}

export function TheVault({ locale = "en" }: { locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isRo = locale === "ro";

  const folders = isRo ? VAULT_DATA_RO : VAULT_DATA_EN;

  const [activeFolderId, setActiveFolderId] = useState("cold-war");
  const [activeDocId, setActiveDocId] = useState("cuba-u2");
  const [isDeclassified, setIsDeclassified] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptProgress, setDecryptProgress] = useState(0);

  const activeFolder = folders.find((f) => f.id === activeFolderId) || folders[0];
  const activeDoc = activeFolder.documents.find((d) => d.id === activeDocId) || activeFolder.documents[0];

  const handleFolderChange = (id: string) => {
    setActiveFolderId(id);
    const nextFolder = folders.find((f) => f.id === id);
    if (nextFolder && nextFolder.documents.length > 0) {
      setActiveDocId(nextFolder.documents[0].id);
    }
    setIsDeclassified(false);
    setIsDecrypting(false);
    setDecryptProgress(0);
  };

  const handleDocChange = (id: string) => {
    setActiveDocId(id);
    setIsDeclassified(false);
    setIsDecrypting(false);
    setDecryptProgress(0);
  };

  const triggerDeclassification = () => {
    if (isDeclassified) {
      setIsDeclassified(false);
      setDecryptProgress(0);
      return;
    }

    setIsDecrypting(true);
    setDecryptProgress(10);

    const interval = setInterval(() => {
      setDecryptProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDecrypting(false);
          setIsDeclassified(true);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

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
        className="mx-auto max-w-[1200px]"
      >
        {/* Section Header */}
        <div className="mb-20 lg:mb-28 text-left">
          <div
            className="intel-bureaucratic mb-8"
            style={{ fontSize: "clamp(11px, 0.9vw, 14px)", letterSpacing: "0.25em", color: "#a1a1aa" }}
          >
            {isRo ? "CAMERA DE LECTURĂ ELECTRONICĂ" : "ELECTRONIC READING ROOM"}
          </div>
          <div
            className="intel-editorial"
            style={{ fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.2 }}
          >
            {isRo ? "Arhiva Documentelor Clasificate" : "The Vault"}
          </div>
          <p className="intel-body mt-6 max-w-3xl leading-relaxed">
            {isRo
              ? "Explorați o selecție simulată de documente CIA declasificate prin proceduri FOIA. Utilizați controlul de declasificare pentru a examina marcajele de securitate din text."
              : "Explore a curated simulation of declassified CIA records released under the Freedom of Information Act. Use the declassification control to review security redactions in the record."}
          </p>
        </div>

        {/* Vault Explorer Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-0 bg-black overflow-hidden min-h-[1020px] text-left">
          
          {/* Left Panel: Folders & Document Listing */}
          <div className="border-r border-zinc-800/40 flex flex-col bg-black">
            {/* Folders List */}
            <div className="p-4 border-b border-zinc-900 space-y-2">
              <span className="intel-bureaucratic text-[9px] text-zinc-500 block mb-2 tracking-widest">
                {isRo ? "CATEGORII ARHIVĂ" : "ARCHIVE CATEGORIES"}
              </span>
              <div className="flex flex-wrap lg:flex-col gap-1">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => handleFolderChange(folder.id)}
                    className={cn(
                      "w-full text-left font-mono text-[11px] px-3 py-2 transition-colors rounded-sm tracking-wider uppercase",
                      activeFolderId === folder.id
                        ? "bg-zinc-900 text-white font-semibold"
                        : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-950"
                    )}
                  >
                    {folder.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Documents in Active Folder */}
            <div className="p-4 flex-1 space-y-2 overflow-y-auto">
              <span className="intel-bureaucratic text-[9px] text-zinc-500 block mb-2 tracking-widest">
                {isRo ? "DOSARE DISPONIBILE" : "AVAILABLE DOCUMENTS"}
              </span>
              <div className="space-y-1">
                {activeFolder.documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => handleDocChange(doc.id)}
                    className={cn(
                      "w-full text-left font-mono text-xs px-3 py-2.5 transition-colors rounded-sm flex flex-col",
                      activeDocId === doc.id
                        ? "bg-zinc-900 text-white"
                        : "text-zinc-500 hover:bg-zinc-950 hover:text-zinc-300"
                    )}
                  >
                    <span className="font-semibold truncate">{doc.title}</span>
                    <span className="text-[9px] text-zinc-500 mt-1">{doc.refNo}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Document Viewer Desk Area */}
          <div className="flex flex-col bg-black min-h-[1020px]">
            {/* Document Controls Header */}
            <div className="p-4 sm:px-6 bg-black border-b border-zinc-900 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] text-zinc-100 font-semibold tracking-widest px-0 py-0.5 inline-block uppercase">
                  {activeDoc.classification}
                </span>
                <span className="font-mono text-[9px] text-zinc-500 ml-3 tracking-wider">
                  {activeDoc.refNo}
                </span>
              </div>

              {/* Decrypt Trigger Button */}
              <button
                onClick={triggerDeclassification}
                disabled={isDecrypting}
                className={cn(
                  "font-mono text-[11px] px-4 py-2 border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors rounded-sm uppercase tracking-wider hover:bg-zinc-800 hover:text-white disabled:cursor-wait disabled:opacity-70",
                  isDeclassified
                    ? "text-zinc-100"
                    : "text-zinc-300"
                )}
              >
                {isDecrypting ? (
                  <span>{isRo ? "PROCESARE CERERE" : "PROCESSING REQUEST"} [{Math.min(decryptProgress, 100)}%]</span>
                ) : isDeclassified ? (
                  <span>{isRo ? "RE-CLASIFICĂ DOSARUL" : "RE-CLASSIFY RECORD"}</span>
                ) : (
                  <span>{isRo ? "SOLICITĂ DECLASIFICAREA" : "REQUEST DECLASSIFICATION"}</span>
                )}
              </button>
            </div>

            {/* Desk Surface with the Paper Memo Document */}
            <div className="flex-1 p-6 sm:p-10 bg-black flex items-center justify-center relative overflow-hidden">
              {/* Lamp Light Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025)_0%,transparent_76%)]" />

              {/* Document Stack Container */}
              <div className="relative w-full max-w-2xl mx-auto my-4 z-10">
                {/* Main Paper Sheet */}
                <div className="relative bg-[#f7f5f0] text-[#1E1D1B] p-8 sm:p-12 min-h-[920px] shadow-2xl shadow-black/40 flex flex-col justify-between rounded-sm">

                  {/* Distressed Stamp Overlays */}
                  <div className="absolute top-8 right-8 pointer-events-none select-none z-20 opacity-70">
                    {isDeclassified ? (
                      <div className="border-2 border-dashed border-red-600/80 text-red-600/80 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-sm transform rotate-6 tracking-widest font-mono">
                        {isRo ? "DECLASIFICAT // E.O. 13526" : "DECLASSIFIED // E.O. 13526"}
                      </div>
                    ) : (
                      <div className="border-2 border-solid border-red-800/80 text-red-800/80 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-sm transform -rotate-3 tracking-widest font-mono">
                        {isRo ? "SECRET // STRICT SECRET" : "SECRET // EYES ONLY"}
                      </div>
                    )}
                  </div>

                  {/* Memo Content */}
                  <div className="flex-1 font-mono text-left">
                    {/* Typewriter Memo Header */}
                    <div className="text-[11px] text-[#554C3E] space-y-1 pb-4 border-b border-[#EBE6DC] mb-6 uppercase tracking-wide">
                      <div>TO: {activeDoc.to}</div>
                      <div>FROM: {activeDoc.from}</div>
                      <div>DATE: {activeDoc.date}</div>
                      <div>SUBJECT: {activeDoc.subject}</div>
                    </div>

                    {/* Memo Body */}
                    <div className="text-xs sm:text-sm text-[#2A2927] leading-relaxed whitespace-pre-line select-text font-mono">
                      {parseRedactions(activeDoc.content, isDeclassified)}
                    </div>
                  </div>

                  {/* Memo Footer */}
                  <div className="border-t border-[#EBE6DC] pt-4 mt-8 flex flex-wrap justify-between items-center text-[9px] font-mono text-[#7D7465]">
                    <div>FOIA CASE NO: 2026-F-0809 // RETRO-DECONV</div>
                    <div>{isRo ? "SURSA: ARHIVA CIA" : "SOURCE: CIA READING ROOM"}</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}


// 13. ClosingQuote — Playfair italic, centered
// ─────────────────────────────────────────────────────────────────────────────

export function ClosingQuote({ locale = "en" }: { locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isRo = locale === "ro";

  const branches = [
    { href: "/military/navy", label: isRo ? "Marina" : "Navy" },
    { href: "/military/space-force", label: isRo ? "For\u021Bele Spa\u021Biale" : "Space Force" },
    { href: "/military/air-force", label: isRo ? "For\u021Bele Aeriene" : "Air Force" },
    { href: "/military/global-bases", label: isRo ? "Baze Globale" : "Global Bases" },
  ];

  return (
    <section
      ref={ref}
      className="relative px-6 sm:px-10 lg:px-16 py-40 md:py-56"
      style={{ background: INTEL.black }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="mx-auto max-w-[900px] text-center"
      >
        <div
          className="intel-editorial mb-12"
          style={{
            fontSize: "clamp(26px, 4.5vw, 48px)",
            lineHeight: 1.3,
            fontStyle: "italic",
          }}
        >
          {isRo
            ? "\u201ECel mai important lucru pe care l-am \u00EEnv\u0103\u021Bat este c\u0103 nu po\u021Bi c\u00E2\u0219tiga un r\u0103zboi f\u0103r\u0103 informa\u021Bii.\u201D"
            : "\u201CThe most important thing I learned is that you cannot win a war without intelligence.\u201D"}
        </div>

        <div
          className="intel-bureaucratic mb-32"
          style={{ fontSize: "clamp(11px, 0.9vw, 14px)", color: INTEL.paperFaint, letterSpacing: "0.2em" }}
        >
          {"\u2014"} DWIGHT D. EISENHOWER
        </div>

        <div className="intel-separator mb-16" style={{ background: INTEL.green, opacity: 0.15 }} />

        <div className="mb-16">
          <Link
            href="/military"
            className="group inline-flex h-11 items-center gap-3 px-7 transition-opacity hover:opacity-70"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "clamp(11px, 0.9vw, 13px)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: INTEL.paper,
              border: `1px solid ${INTEL.border}`,
              background: INTEL.surface,
            }}
          >
            {isRo ? "Prezentare Militar\u0103" : "Military Overview"}
            <ArrowUpRight size={14} strokeWidth={2} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div
          className="intel-bureaucratic mb-8"
          style={{ fontSize: "clamp(10px, 0.8vw, 12px)", letterSpacing: "0.2em", color: INTEL.paperFaint }}
        >
          {isRo ? "ALTE DIMENSIUNI MILITARE" : "OTHER MILITARY DIMENSIONS"}
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {branches.map((b) => (
            <Link
              key={b.href}
              href={b.href}
              className="intel-bureaucratic transition-colors hover:opacity-60"
              style={{
                fontSize: "clamp(11px, 0.9vw, 14px)",
                letterSpacing: "0.12em",
                color: INTEL.paperDim,
              }}
            >
              {b.label.toUpperCase()}
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
