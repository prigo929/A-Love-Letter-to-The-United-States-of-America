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
// 2. EntrySequence — Typing animation
// ─────────────────────────────────────────────────────────────────────────────

export function EntrySequence() {
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
      setPhase(0);
      await typeText(lines[0], 50);
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 800));

      setPhase(1);
      setText("");
      await typeText(lines[1], 45);
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 600));

      setPhase(2);
      setText("");
      await typeText(lines[2], 70);
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 400));

      setComplete(true);
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
        className="flex items-center justify-center py-20"
        style={{ background: INTEL.black }}
      >
        <span className="intel-bureaucratic" style={{ color: INTEL.greenText, fontSize: "13px" }}>
          PROCEED
        </span>
      </motion.div>
    );
  }

  return (
    <div
      ref={ref}
      className="flex items-center justify-center py-28"
      style={{ background: INTEL.black }}
    >
      <div className="text-center">
        <span
          className="intel-bureaucratic"
          style={{
            color: INTEL.greenText,
            fontSize: "14px",
            letterSpacing: "0.25em",
          }}
        >
          {text}
          <span className="animate-pulse">{"\u258C"}</span>
        </span>
      </div>
    </div>
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
      className="relative flex flex-col items-center justify-center px-6 py-40 md:py-56"
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
          1,271,000
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

// ─────────────────────────────────────────────────────────────────────────────
// 6. DeclassifiedOperations — Case files of real operations
// ─────────────────────────────────────────────────────────────────────────────

interface CaseFile {
  codename: string;
  year: string;
  theater: string;
  objective: string;
  outcome: string;
  summary: string;
  redactedDetail: string;
}

const CASE_FILES_EN: CaseFile[] = [
  {
    codename: "OPERATION AJAX",
    year: "1953",
    theater: "IRAN",
    objective: "Overthrow of Prime Minister Mohammad Mosaddegh and restoration of Shah Mohammad Reza Pahlavi to consolidated power.",
    outcome: "Successful. Shah restored. Western petroleum access secured for 25 years.",
    summary: "A joint CIA-MI6 covert operation that destabilized the Iranian government through coordinated propaganda, bribery of military officers, and orchestrated street protests. The operation set the template for Cold War regime change.",
    redactedDetail: "COORDINATING OFFICER AND LOCAL ASSET NETWORK",
  },
  {
    codename: "OPERATION PBSUCCESS",
    year: "1954",
    theater: "GUATEMALA",
    objective: "Removal of President Jacobo \u00C1rbenz and installation of a military government aligned with U.S. interests.",
    outcome: "Successful. \u00C1rbenz resigned. Colonel Carlos Castillo Armas installed.",
    summary: "The CIA armed, trained, and directed a force of Guatemalan exiles to invade from Honduras. A psychological warfare campaign, including fake radio broadcasts, caused military defections and government collapse.",
    redactedDetail: "EXILE FORCE STAGING LOCATIONS AND FUNDING CHANNELS",
  },
  {
    codename: "OPERATION OLYMPIC GAMES",
    year: "2007\u20132010",
    theater: "IRAN",
    objective: "Degradation of Iranian uranium enrichment capability at the Natanz nuclear facility through cyber means.",
    outcome: "Successful. Approximately 1,000 IR-1 centrifuges destroyed. Program delayed by an estimated 2 years.",
    summary: "A joint NSA-Unit 8200 cyber weapon, later known publicly as Stuxnet, was introduced into air-gapped Iranian industrial control systems. The malware caused centrifuges to spin at destructive frequencies while reporting normal operations to monitoring systems.",
    redactedDetail: "DELIVERY VECTOR AND INITIAL ACCESS METHODOLOGY",
  },
  {
    codename: "OPERATION NEPTUNE SPEAR",
    year: "2011",
    theater: "ABBOTTABAD, PAKISTAN",
    objective: "Capture or kill of Osama bin Laden, leader of al-Qaeda, responsible for the September 11 attacks.",
    outcome: "Target killed. Intelligence materials recovered. No U.S. casualties.",
    summary: "A decade of intelligence fusion \u2014 SIGINT intercepts, HUMINT courier tracking, GEOINT compound modeling, and MASINT sensor data \u2014 converged to identify a fortified compound. SEAL Team Six executed a helicopter-borne raid under presidential authorization.",
    redactedDetail: "PAKISTANI LIAISON STATUS AND ADVANCE NOTIFICATION PROTOCOLS",
  },
];

const CASE_FILES_RO: CaseFile[] = [
  {
    codename: "OPERA\u021AIUNEA AJAX",
    year: "1953",
    theater: "IRAN",
    objective: "R\u0103sturnarea premierului Mohammad Mosaddegh \u0219i restaurarea \u0218ahului Mohammad Reza Pahlavi.",
    outcome: "Succes. \u0218ahul restaurat. Accesul occidental la petrol asigurat pentru 25 de ani.",
    summary: "O opera\u021Biune comun\u0103 CIA-MI6 care a destabilizat guvernul iranian prin propagand\u0103 coordonat\u0103, mituirea ofi\u021Berilor militari \u0219i proteste de strad\u0103 orchestrate.",
    redactedDetail: "OFI\u021AER COORDONATOR \u0218I RE\u021AEA DE ACTIVE LOCALE",
  },
  {
    codename: "OPERA\u021AIUNEA PBSUCCESS",
    year: "1954",
    theater: "GUATEMALA",
    objective: "\u00CEnl\u0103turarea pre\u0219edintelui Jacobo \u00C1rbenz \u0219i instalarea unui guvern militar aliniat intereselor SUA.",
    outcome: "Succes. \u00C1rbenz a demisionat. Colonelul Carlos Castillo Armas instalat.",
    summary: "CIA a \u00EEnarmat \u0219i antrenat o for\u021B\u0103 de exila\u021Bi guatemalezi pentru invazia din Honduras. O campanie de r\u0103zboi psihologic a cauzat defec\u021Biuni militare \u0219i pr\u0103bu\u0219irea guvernului.",
    redactedDetail: "LOCA\u021AII DE ORGANIZARE \u0218I CANALE DE FINAN\u021AARE",
  },
  {
    codename: "OPERA\u021AIUNEA OLYMPIC GAMES",
    year: "2007\u20132010",
    theater: "IRAN",
    objective: "Degradarea capacit\u0103\u021Bii de \u00EEmbog\u0103\u021Bire a uraniului la facilitatea nuclear\u0103 Natanz prin mijloace cibernetice.",
    outcome: "Succes. Aproximativ 1.000 de centrifuge IR-1 distruse. Programul \u00EEnt\u00E2rziat cu circa 2 ani.",
    summary: "O arm\u0103 cibernetic\u0103 comun\u0103 NSA-Unit 8200, cunoscut\u0103 public ulterior ca Stuxnet, a fost introdus\u0103 \u00EEn sistemele industriale iraniene izolate de re\u021Bea.",
    redactedDetail: "VECTOR DE LIVRARE \u0218I METODOLOGIA ACCESULUI INI\u021AIAL",
  },
  {
    codename: "OPERA\u021AIUNEA NEPTUNE SPEAR",
    year: "2011",
    theater: "ABBOTTABAD, PAKISTAN",
    objective: "Capturarea sau uciderea lui Osama bin Laden, liderul al-Qaeda, responsabil pentru atacurile din 11 septembrie.",
    outcome: "\u021Ainta eliminat\u0103. Materiale de informare recuperate. Zero victime americane.",
    summary: "Un deceniu de fuziune a informa\u021Biilor \u2014 intercept\u0103ri SIGINT, urm\u0103rire HUMINT, modelare GEOINT \u0219i date MASINT \u2014 a convergit pentru a identifica un complex fortificat. SEAL Team Six a executat un raid cu elicoptere.",
    redactedDetail: "STATUTUL LEG\u0102TURII CU PAKISTANUL \u0218I PROTOCOALELE DE NOTIFICARE",
  },
];

export function DeclassifiedOperations({ locale = "en" }: { locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isRo = locale === "ro";
  const cases = isRo ? CASE_FILES_RO : CASE_FILES_EN;

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
            {isRo ? "OPERA\u021AIUNI DECLASIFICATE" : "DECLASSIFIED OPERATIONS"}
          </div>
          <div
            className="intel-editorial"
            style={{ fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.2 }}
          >
            {isRo
              ? "Opera\u021Biuni reale care citesc ca fic\u021Biune."
              : "Real operations that read like fiction."}
          </div>
        </div>

        {/* Case files */}
        <div className="space-y-12 lg:space-y-16">
          {cases.map((file, i) => (
            <motion.div
              key={file.codename}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
            >
              <div
                className="p-8 sm:p-10 lg:p-12"
                style={{ background: INTEL.surface, border: `1px solid ${INTEL.border}` }}
              >
                {/* Case header row */}
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
                  <h3
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "clamp(18px, 2.5vw, 28px)",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: INTEL.paper,
                      textTransform: "uppercase",
                    }}
                  >
                    {file.codename}
                  </h3>
                  <span
                    className="intel-bureaucratic"
                    style={{ fontSize: "clamp(12px, 1vw, 15px)", color: INTEL.greenText }}
                  >
                    {file.year}
                  </span>
                </div>

                {/* Field rows */}
                <div className="space-y-5 mb-8" style={{ borderTop: `1px solid ${INTEL.border}`, paddingTop: "20px" }}>
                  <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] gap-4 items-baseline">
                    <span className="intel-bureaucratic" style={{ fontSize: "clamp(10px, 0.8vw, 13px)", color: INTEL.greenText }}>
                      {isRo ? "TEATRU" : "THEATER"}
                    </span>
                    <span className="intel-body" style={{ color: INTEL.paper }}>{file.theater}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] gap-4 items-baseline">
                    <span className="intel-bureaucratic" style={{ fontSize: "clamp(10px, 0.8vw, 13px)", color: INTEL.greenText }}>
                      {isRo ? "OBIECTIV" : "OBJECTIVE"}
                    </span>
                    <span className="intel-body">{file.objective}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] gap-4 items-baseline">
                    <span className="intel-bureaucratic" style={{ fontSize: "clamp(10px, 0.8vw, 13px)", color: INTEL.greenText }}>
                      {isRo ? "REZULTAT" : "OUTCOME"}
                    </span>
                    <span className="intel-body" style={{ color: INTEL.paper }}>{file.outcome}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="intel-body max-w-3xl mb-6">{file.summary}</p>

                {/* Redacted detail */}
                <div className="flex items-center gap-3">
                  <span className="intel-redacted" style={{ fontSize: "clamp(12px, 1vw, 15px)", padding: "2px 6px" }}>
                    {file.redactedDetail}
                  </span>
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
// 8. FiveEyesGeometry — SVG pentagon with animated connecting lines
// ─────────────────────────────────────────────────────────────────────────────

export function FiveEyesGeometry({ locale = "en" }: { locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isRo = locale === "ro";

  const points = [
    { x: 250, y: 60, label: "USA" },
    { x: 402, y: 176, label: "UK" },
    { x: 344, y: 370, label: "AUS" },
    { x: 156, y: 370, label: "CAN" },
    { x: 98, y: 176, label: "NZL" },
  ];

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
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 lg:mb-24 text-center">
          <div
            className="intel-bureaucratic mb-8"
            style={{ fontSize: "clamp(11px, 0.9vw, 14px)", letterSpacing: "0.25em", color: INTEL.greenText }}
          >
            {isRo ? "ALIAN\u021A\u0102 DE INFORMA\u021AII" : "INTELLIGENCE ALLIANCE"}
          </div>
          <div
            className="intel-editorial mx-auto"
            style={{ fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.2, maxWidth: "700px" }}
          >
            {isRo
              ? "Cei cinci ochi care v\u0103d totul."
              : "The five eyes that see everything."}
          </div>
        </div>

        <div className="flex justify-center">
          <svg viewBox="0 0 500 440" className="w-full max-w-[500px] h-auto">
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

            {points.map((p, i) => (
              <g key={p.label}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={inView ? 4 : 0}
                  fill={INTEL.greenText}
                  style={{ transition: `r 0.8s ease-out ${0.5 + i * 0.2}s` }}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={inView ? 10 : 0}
                  fill="none"
                  stroke={INTEL.green}
                  strokeWidth="1"
                  strokeOpacity={0.3}
                  style={{ transition: `r 0.8s ease-out ${0.5 + i * 0.2}s` }}
                />
                <text
                  x={p.x}
                  y={p.y + (i === 0 ? -22 : 30)}
                  textAnchor="middle"
                  fill={INTEL.greenText}
                  fontSize="12"
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

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="intel-body" style={{ lineHeight: 2 }}>
            {isRo
              ? "Alian\u021Ba Five Eyes \u2014 compus\u0103 din Statele Unite, Regatul Unit, Australia, Canada \u0219i Noua Zeeland\u0103 \u2014 constituie cel mai extins parteneriat de schimb de informa\u021Bii din istorie. Originile sale dateaz\u0103 din Al Doilea R\u0103zboi Mondial, iar structura sa actual\u0103 r\u0103m\u00E2ne \u00EEn mare parte clasificat\u0103."
              : "The Five Eyes alliance \u2014 comprising the United States, United Kingdom, Australia, Canada, and New Zealand \u2014 constitutes the most extensive and deeply integrated intelligence-sharing partnership in history. Its origins trace to World War II, and its current operational structure remains largely classified."}
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
// 12. TheVault — CIA Reading Room reference
// ─────────────────────────────────────────────────────────────────────────────

export function TheVault({ locale = "en" }: { locale?: Locale }) {
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
        transition={{ duration: 2.0, ease: "easeOut" }}
        className="mx-auto max-w-[1000px] text-center"
      >
        <div
          className="intel-bureaucratic mb-8"
          style={{ fontSize: "clamp(11px, 0.9vw, 14px)", letterSpacing: "0.25em", color: INTEL.greenText }}
        >
          {isRo ? "CAMERA DE LECTUR\u0102 ELECTRONIC\u0102" : "ELECTRONIC READING ROOM"}
        </div>

        <div
          className="intel-editorial mb-10"
          style={{ fontSize: "clamp(28px, 5vw, 50px)", lineHeight: 1.2 }}
        >
          {isRo ? "Seiful" : "The Vault"}
        </div>

        <p className="intel-body mx-auto max-w-2xl mb-12" style={{ lineHeight: 2 }}>
          {isRo
            ? "Camera de Lectur\u0103 Electronic\u0103 FOIA a CIA con\u021Bine peste 12 milioane de pagini de documente declasificate, accesibile public. Subiectele acoper\u0103 \u0219ase decenii de opera\u021Biuni, de la evaluarea amenin\u021B\u0103rilor din R\u0103zboiul Rece p\u00E2n\u0103 la activit\u0103\u021Bi de contrainforma\u021Bii, experimentele MK-ULTRA \u0219i planificarea R\u0103zboiului din Vietnam."
            : "The CIA\u2019s FOIA Electronic Reading Room contains over 12 million pages of declassified documents, accessible to the public. Subjects span six decades of operations, from Cold War threat assessments and counterintelligence activities to the MK-ULTRA experiments and Vietnam War planning."}
        </p>

        {/* Key stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-14 max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            <span
              className="intel-editorial"
              style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1 }}
            >
              12M+
            </span>
            <span className="intel-bureaucratic mt-3" style={{ fontSize: "clamp(10px, 0.8vw, 12px)", color: INTEL.paperDim }}>
              {isRo ? "PAGINI" : "PAGES"}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span
              className="intel-editorial"
              style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1 }}
            >
              930K+
            </span>
            <span className="intel-bureaucratic mt-3" style={{ fontSize: "clamp(10px, 0.8vw, 12px)", color: INTEL.paperDim }}>
              {isRo ? "DOCUMENTE" : "DOCUMENTS"}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span
              className="intel-editorial"
              style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1 }}
            >
              60+
            </span>
            <span className="intel-bureaucratic mt-3" style={{ fontSize: "clamp(10px, 0.8vw, 12px)", color: INTEL.paperDim }}>
              {isRo ? "ANI DE ARHIV\u0102" : "YEARS OF ARCHIVES"}
            </span>
          </div>
        </div>

        <div className="intel-separator mb-10 mx-auto max-w-[200px]" style={{ background: INTEL.green, opacity: 0.2 }} />

        <div className="intel-bureaucratic" style={{ fontSize: "clamp(10px, 0.8vw, 12px)", color: INTEL.paperFaint, letterSpacing: "0.15em" }}>
          {isRo
            ? "SURSA: CIA.GOV/READINGROOM \u2014 ACCESIBIL PUBLIC PRIN FOIA"
            : "SOURCE: CIA.GOV/READINGROOM \u2014 PUBLICLY ACCESSIBLE UNDER FOIA"}
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
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
