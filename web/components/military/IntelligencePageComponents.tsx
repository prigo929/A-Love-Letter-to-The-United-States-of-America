"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
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
  agency: string;
  longSummary: string;
  timeline: { date: string; event: string }[];
  keyFigures: string[];
  fieldIntercept: string;
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
    agency: "CIA / SIS (MI6)",
    longSummary: "Initiated in response to Iran's nationalization of British oil holdings, the operation weaponized psychological warfare, paid street agitation, and military co-optation. It established a precedent for clandestine Cold War regime change, illustrating the efficacy of combining covert propaganda with local military collaboration.",
    timeline: [
      { date: "April 1953", event: "CIA approves budget of $1,000,000 for covert destabilization operations in Tehran." },
      { date: "August 15, 1953", event: "Initial coup attempt fails. PM Mosaddegh orders arrests of conspirators; the Shah flees to Baghdad." },
      { date: "August 19, 1953", event: "Pro-Shah military units led by General Zahedi capture key communication sites and government offices. Mosaddegh arrested." }
    ],
    keyFigures: ["Kermit Roosevelt Jr. (CIA Station Chief)", "General Fazlollah Zahedi", "Donald Wilber"],
    fieldIntercept: "CABLE-TEHRAN-190853-SECRET: ROADBLOCKS ESTABLISHED AT KEY INTERSECTIONS. [redact]STATION CHIEF ROOSEVELT[/redact] REPORTS SUCCESSFUL PAYMENTS TRANSFERRED TO LOCAL ASSETS. MILITARY COMPLIANCE ASSURED."
  },
  {
    codename: "OPERATION PBSUCCESS",
    year: "1954",
    theater: "GUATEMALA",
    objective: "Removal of President Jacobo Árbenz and installation of a military government aligned with U.S. interests.",
    outcome: "Successful. Árbenz resigned. Colonel Carlos Castillo Armas installed.",
    summary: "The CIA armed, trained, and directed a force of Guatemalan exiles to invade from Honduras. A psychological warfare campaign, including fake radio broadcasts, caused military defections and government collapse.",
    redactedDetail: "EXILE FORCE STAGING LOCATIONS AND FUNDING CHANNELS",
    agency: "CIA",
    longSummary: "Fearing land reforms that threatened U.S. commercial interests (specifically the United Fruit Company) and potential Communist influence, the CIA armed, trained, and funded a rebel army of exiles and conducted an extensive psychological warfare campaign.",
    timeline: [
      { date: "June 18, 1954", event: "Castillo Armas crosses border from Honduras with 480 trained fighters." },
      { date: "June 25, 1954", event: "Aerial bombing of Guatemala City military bases causes widespread panic." },
      { date: "June 27, 1954", event: "President Árbenz resigns under pressure from his military commanders." }
    ],
    keyFigures: ["Allen Dulles (DCI)", "Carlos Castillo Armas", "Frank Wisner"],
    fieldIntercept: "MEMO-CIA-DIRECTOR-1954: VOICE OF LIBERATION BROADCASTING STATIONS SUCCESSFULLY CONVINCED COMMANDERS OF FORCE STRENGTH MULTIPLIERS. [redact]EXILE FORCES ENROUTE TO TEGUCIGALPA[/redact]."
  },
  {
    codename: "OPERATION GOLD",
    year: "1953–1956",
    theater: "BERLIN",
    objective: "Tap subterranean Soviet army telephone lines in Berlin via a joint CIA-MI6 tunnel.",
    outcome: "Successful collection. Tunnel compromised by double agent.",
    summary: "Also known as Operation PBJOINTLY, a 450-meter tunnel was bored to intercept landline communications of the Soviet military headquarters. Though compromised from the start by a double agent, it yielded vast quantities of recording tapes.",
    redactedDetail: "DOUBLE AGENT IDENTIFICATION AND ESCAPE PROTOCOLS",
    agency: "CIA / SIS (MI6)",
    longSummary: "A highly classified joint operation that dug a tunnel under the Soviet sector of Berlin to tap telephone lines. Though compromised from the start by George Blake, a double agent within British intelligence, the operation tapped lines for 11 months, yielding 368,000 conversations.",
    timeline: [
      { date: "Dec 1953", event: "Construction of undercover warehouse in West Berlin begins." },
      { date: "Feb 1955", event: "Tunnel excavation reaches the Soviet telephone cable junction." },
      { date: "April 21, 1956", event: "Soviet technicians 'discover' the tunnel during heavy rainfall repairs." }
    ],
    keyFigures: ["William King Harvey (CIA)", "George Blake (KGB Mole)", "Allen Dulles"],
    fieldIntercept: "TRANSCRIPT-BERLIN-TAP-04: SIGNALS RECORDING CONTINUOUS. [redact]GEORGE BLAKE ACCESSED CHANNELS[/redact] PRIOR TO THE EXCAVATION. COMMUNICATIONS TRAFFIC HEAVILY MONITORED BY KGB."
  },
  {
    codename: "PROJECT MK-ULTRA",
    year: "1953–1973",
    theater: "NORTH AMERICA",
    objective: "Develop chemical, biological, and psychological agents for mind control and interrogation.",
    outcome: "Project terminated. Congressional hearings exposed extensive human experimentation.",
    summary: "Authorized by CIA Director Allen Dulles, the project conducted human experimentation using LSD, sensory deprivation, hypnosis, and electroshock therapy on unwitting citizens, patients, and prisoners.",
    redactedDetail: "PARTICIPATING RESEARCH FACILITIES AND CLINICAL METADATA",
    agency: "CIA / Technical Services Staff",
    longSummary: "A clandestine program of experiments on human subjects to develop chemical and biological agents for mind control, interrogation, and behavioral modification. The program operated across 80 institutions, including universities and hospitals.",
    timeline: [
      { date: "April 13, 1953", event: "DCI Dulles signs approval for chemical agent research under TSS." },
      { date: "Nov 1953", event: "Biologist Frank Olson dies under mysterious circumstances after ingestion of LSD." },
      { date: "1973", event: "DCI Richard Helms orders all project records destroyed, limiting subsequent congressional investigations." }
    ],
    keyFigures: ["Sidney Gottlieb (Chief Chemist)", "Allen Dulles", "Dr. Ewen Cameron"],
    fieldIntercept: "LOG-TSS-SUBPROJECT-3: SUBJECT RESPONDED TO DRUG ADMINISTRATION WITH SEVERE DISORIENTATION. [redact]ALLAN MEMORIAL HOSPITAL[/redact] RECORDINGS FILED UNDER HIGHLY RESTRICTED VAULT SECTOR."
  },
  {
    codename: "OPERATION CHAOS",
    year: "1967–1973",
    theater: "UNITED STATES",
    objective: "Espionage campaign targeting domestic anti-war activists and civil rights movements inside the US.",
    outcome: "Program exposed by journalism; outlawed by subsequent charter reforms.",
    summary: "Operating outside the CIA's legal charter, Project CHAOS compiled files on thousands of American citizens, trying to find foreign ties to domestic anti-war student movements.",
    redactedDetail: "DOMESTIC WATCHLISTS AND SPY CHANNELS",
    agency: "CIA / Domestic Operations",
    longSummary: "Operating outside the CIA's legal charter, Project CHAOS compiled files on thousands of American citizens, trying to find foreign ties to domestic anti-war student movements and civil rights organizations, including the Black Panther Party.",
    timeline: [
      { date: "August 1967", event: "DCI Richard Helms establishes Special Operations Group to run domestic surveillance." },
      { date: "1969", event: "Scope expanded to target the Black Panther Party and student leadership." },
      { date: "1974", event: "Program exposed by journalist Seymour Hersh in the New York Times, sparking the Rockefeller Commission." }
    ],
    keyFigures: ["Richard Helms", "James Jesus Angleton", "Seymour Hersh"],
    fieldIntercept: "WATCHLIST-DOMESTIC-09: SUBJECT IDENTIFIED AT CIVIL RALLIES. [redact]FBI CONTACT LINK ESTABLISHED[/redact]. TELECOMMUNICATIONS GATHERED THROUGH DOMESTIC MICROWAVE RELAY STATIONS."
  },
  {
    codename: "OPERATION CYCLONE",
    year: "1979–1989",
    theater: "AFGHANISTAN",
    objective: "Arm and finance the Afghan mujahideen during the Soviet-Afghan War.",
    outcome: "Soviet military forces withdrew. Major geopolitical shifts in Central Asia.",
    summary: "One of the longest and most expensive covert operations in history, sending billions of dollars in military hardware (including Stinger anti-aircraft missiles) to Afghan guerillas to bleed Soviet military forces.",
    redactedDetail: "LOGISTICAL NETWORK AND STINGER DELIVERY PATHS",
    agency: "CIA / ISI (Pakistan) / SIS",
    longSummary: "One of the longest and most expensive covert operations in history, sending billions of dollars in military hardware (including Stinger anti-aircraft missiles) to Afghan guerillas to bleed Soviet military forces. Fanned out through complex supply lines in Pakistan.",
    timeline: [
      { date: "July 3, 1979", event: "President Carter signs presidential finding authorizing non-lethal aid to Afghan rebels." },
      { date: "1986", event: "Delivery of Stinger shoulder-fired missiles begins, turning the air-war against Soviet helicopters." },
      { date: "Feb 1989", event: "Last Soviet military units withdraw from Afghanistan." }
    ],
    keyFigures: ["Charlie Wilson (US Representative)", "Gust Avrakotos (CIA)", "William Casey"],
    fieldIntercept: "SUPPLY-LINE-PESHAWAR-04: CONVOY SHIPPED 200 UNITS G-TYPE RADAR-SEEKING INFRARED HARDWARE. [redact]GENERAL HAQ COORDINATOR[/redact] CONFIRMED RECEIPT BY TACTICAL FORCES."
  },
  {
    codename: "OPERATION OLYMPIC GAMES",
    year: "2007–2010",
    theater: "IRAN",
    objective: "Degradation of Iranian uranium enrichment capability at the Natanz nuclear facility through cyber means.",
    outcome: "Successful. Approximately 1,000 IR-1 centrifuges destroyed. Program delayed by an estimated 2 years.",
    summary: "A joint NSA-Unit 8200 cyber weapon, later known publicly as Stuxnet, was introduced into air-gapped Iranian industrial control systems. The malware caused centrifuges to spin at destructive frequencies while reporting normal operations to monitoring systems.",
    redactedDetail: "DELIVERY VECTOR AND INITIAL ACCESS METHODOLOGY",
    agency: "NSA / CIA / Unit 8200",
    longSummary: "A highly classified cyber warfare campaign to disrupt Iran's nuclear centrifuges using industrial malware. Conceived under President Bush and continued under President Obama, this program launched the 'Stuxnet' worm to damage Siemens industrial controllers.",
    timeline: [
      { date: "2006", event: "NSA identifies vulnerabilities in Siemens industrial control hardware." },
      { date: "June 2009", event: "Early Stuxnet versions deployed via localized USB infection." },
      { date: "June 2010", event: "Cyber weapon escapes control, spreading to commercial networks worldwide." }
    ],
    keyFigures: ["Keith Alexander (DIRNSA)", "Barack Obama", "Michael Hayden"],
    fieldIntercept: "MALWARE-DUMP-NATANZ: CENTRIFUGE RPM MANIPULATION TRIGGERED. [redact]ISOLATED PLC SUITE COMPROMISED[/redact]. CONTROL ROOM MONITOR FEED REMAINS WITHIN OPERATIONAL LIMITS."
  },
  {
    codename: "OPERATION NEPTUNE SPEAR",
    year: "2011",
    theater: "ABBOTTABAD, PAKISTAN",
    objective: "Capture or kill of Osama bin Laden, leader of al-Qaeda, responsible for the September 11 attacks.",
    outcome: "Target killed. Intelligence materials recovered. No U.S. casualties.",
    summary: "A decade of intelligence fusion — SIGINT intercepts, HUMINT courier tracking, GEOINT compound modeling, and MASINT sensor data — converged to identify a fortified compound. SEAL Team Six executed a helicopter-borne raid under presidential authorization.",
    redactedDetail: "PAKISTANI LIAISON STATUS AND ADVANCE NOTIFICATION PROTOCOLS",
    agency: "CIA / JSOC",
    longSummary: "A targeted military raid in Abbottabad, Pakistan, that resulted in the death of Osama bin Laden. It converged a decade of intelligence collection — including courier surveillance, geospatial compound mockups, and signals tracking.",
    timeline: [
      { date: "August 2010", event: "CIA identifies compound in Abbottabad suspected of housing bin Laden." },
      { date: "April 29, 2011", event: "President Obama signs execution order for military raid." },
      { date: "May 2, 2011", event: "Helicopter assault launched from Jalalabad, Afghanistan. Compound cleared." }
    ],
    keyFigures: ["Leon Panetta (CIA Director)", "Admiral William McRaven", "Barack Obama"],
    fieldIntercept: "SATELLITE-FEED-LIVE: CHOPPER DOWNLINK CONFIRMED. TARGET ASSIMILATED. [redact]BODY RECOVERED FOR GENETIC CORRELATION[/redact]. EXTRACTION PROGRESSING."
  }
];

const CASE_FILES_RO: CaseFile[] = [
  {
    codename: "OPERAȚIUNEA AJAX",
    year: "1953",
    theater: "IRAN",
    objective: "Răsturnarea premierului Mohammad Mosaddegh și restaurarea Șahului Mohammad Reza Pahlavi.",
    outcome: "Succes. Șahul restaurat. Accesul occidental la petrol asigurat pentru 25 de ani.",
    summary: "O operațiune comună CIA-MI6 care a destabilizat guvernul iranian prin propagandă coordonată, mituirea ofițerilor militari și proteste de stradă orchestrate.",
    redactedDetail: "OFIȚER COORDONATOR ȘI REȚEA DE ACTIVE LOCALE",
    agency: "CIA / SIS (MI6)",
    longSummary: "Inițiată ca răspuns la naționalizarea petrolului de către prim-ministrul Mosaddegh, operațiunea a folosit războiul psihologic și revoltele stradale pentru a schimba regimul. A creat un precedent pentru acțiunile subacoperire din Războiul Rece.",
    timeline: [
      { date: "Aprilie 1953", event: "CIA aprobă bugetul de destabilizare pentru Teheran." },
      { date: "15 August 1953", event: "Prima tentativă eșuează; Mosaddegh preia controlul, Șahul fuge din țară." },
      { date: "19 August 1953", event: "Unitățile pro-Șah conduse de generalul Zahedi capturează posturile cheie. Mosaddegh este arestat." }
    ],
    keyFigures: ["Kermit Roosevelt Jr.", "General Fazlollah Zahedi", "Donald Wilber"],
    fieldIntercept: "CAB-TEHERAN-190853-SECRET: BLOCAJE LA INTERSECȚII. [redact]ȘEFUL STAȚIEI ROOSEVELT[/redact] RAPORTEAZĂ TRASFERURI FINANCIARE REUȘITE CĂTRE ACTIVELE LOCALE."
  },
  {
    codename: "OPERAȚIUNEA PBSUCCESS",
    year: "1954",
    theater: "GUATEMALA",
    objective: "Înlăturarea președintelui Jacobo Árbenz și instalarea unui guvern militar aliniat intereselor SUA.",
    outcome: "Succes. Árbenz a demisionat. Colonelul Carlos Castillo Armas instalat.",
    summary: "CIA a înarmat și antrenat o forță de exilați guatemalezi pentru invazia din Honduras. O campanie de război psihologic a cauzat defecțiuni militare și prăbușirea guvernului.",
    redactedDetail: "LOCAȚII DE ORGANIZARE ȘI CANALE DE FINANȚARE",
    agency: "CIA",
    longSummary: "De teama reformelor agrare care amenințau compania United Fruit, CIA a antrenat o forță rebelă de exilați în Honduras, provocând capitularea armatei guatemaleze prin tactici de dezinformare la radio.",
    timeline: [
      { date: "18 Iunie 1954", event: "Castillo Armas trece granița cu 480 de luptători." },
      { date: "25 Iunie 1954", event: "Bombardarea depozitelor militare din capitală generează panică." },
      { date: "27 Iunie 1954", event: "Președintele Árbenz demisionează sub presiunea comandanților." }
    ],
    keyFigures: ["Allen Dulles", "Carlos Castillo Armas", "Frank Wisner"],
    fieldIntercept: "MEMO-CIA-1954: STAȚIILE RADIO VOCEA ELIBERĂRII AU PROPAGAT EFICIENT ZVONURILE DE FORȚĂ MULTIPLĂ. [redact]TRUPE DE EXILAȚI ÎN DEPLASARE[/redact]."
  },
  {
    codename: "OPERAȚIUNEA GOLD",
    year: "1953–1956",
    theater: "BERLIN",
    objective: "Interceptarea cablurilor de telecomunicații ale Armatei Roșii printr-un tunel CIA-MI6.",
    outcome: "Succes parțial în colectare. Tunel deconectat după demascarea de către un agent dublu.",
    summary: "Cunoscută și sub numele de PBJOINTLY, această lucrare inginerească de 450 de metri a interceptat milioane de apeluri telefonice. Deși a fost trădată de agentul dublu George Blake încă din prima zi, a furnizat cantități uriașe de date.",
    redactedDetail: "OFIȚER COORDONATOR ȘI REȚEA DE ACTIVE LOCALE",
    agency: "CIA / SIS (MI6)",
    longSummary: "Un tunel săpat pe sub sectorul sovietic din Berlin pentru interceptarea cablurilor de telecomunicații ale Armatei Roșii. Deși a fost trădată de agentul dublu George Blake încă din prima zi, a furnizat cantități uriașe de date din interiorul comandamentului sovietic.",
    timeline: [
      { date: "Decembrie 1953", event: "Începe construcția depozitului acoperire în Berlinul de Vest." },
      { date: "Februarie 1955", event: "Tunelul atinge nodul de cabluri sovietice." },
      { date: "21 Aprilie 1956", event: "Tehnicienii sovietici descoperă infiltrarea în timpul unor reparații la sol." }
    ],
    keyFigures: ["William King Harvey", "George Blake", "Allen Dulles"],
    fieldIntercept: "TRANSCRIPT-BERLIN-04: ÎNREGISTRARE CONTINUĂ PE CANALELE 12-48. [redact]GEORGE BLAKE A ACCESAT CANALELE[/redact] INAINTE DE EXCAVARE. SOVIETICII AU DEȚINUT CONTROLUL INFORMAȚIEI."
  },
  {
    codename: "PROIECTUL MK-ULTRA",
    year: "1953–1973",
    theater: "SUA / CANADA",
    objective: "Dezvoltarea de substanțe chimice destinate controlului mental și interogării.",
    outcome: "Program sistat. Audierile Congresului au expus experimente abuzive pe subiecți umani.",
    summary: "Autorizat de directorul Allen Dulles, proiectul a realizat teste ilegale pe cetățeni, pacienți și prizonieri fără consimțământul lor, utilizând LSD, hipnoză și șocuri electrice pentru a slăbi capacitățile cognitive.",
    redactedDetail: "INSTITUȚII PARTICIPANTE ȘI SPECIFICAȚIILE SUBSTANȚELOR",
    agency: "CIA / TSS",
    longSummary: "Program secret de experimente pe subiecți umani pentru dezvoltarea de substanțe chimice destinate controlului mental. Autorizat de directorul Allen Dulles, proiectul a realizat teste abuzive fără consimțământ.",
    timeline: [
      { date: "13 Aprilie 1953", event: "Directorul Dulles aprobă oficial cercetarea privind agenții chimici." },
      { date: "Noiembrie 1953", event: "Biologul Frank Olson moare în condiții suspecte după ingerarea de LSD." },
      { date: "1973", event: "Directorul Richard Helms ordonă distrugerea tuturor dosarelor proiectului." }
    ],
    keyFigures: ["Sidney Gottlieb", "Allen Dulles", "Dr. Ewen Cameron"],
    fieldIntercept: "JURNAL-TSS-3: SUBIECTUL A REAGAT LA ADMINISTRAREA SUBSTANȚEI CU DEZORIENTARE SEVERĂ. [redact]SPITALUL ALLAN MEMORIAL[/redact] EXPERIMENTE STOCATE ÎN SECTORUL RESTRÂNS."
  },
  {
    codename: "OPERAȚIUNEA CHAOS",
    year: "1967–1973",
    theater: "STATELE UNITE",
    objective: "Campanie secretă de spionaj intern care a vizat activiștii împotriva războiului din Vietnam.",
    outcome: "Demascată public; a dus la investigații guvernamentale și reforme de securitate.",
    summary: "Încălcând statutul legal care îi interzice activitățile pe teritoriu național, CIA a creat dosare pentru mii de americani în încercarea de a demonstra influențe străine în mișcările studențești.",
    redactedDetail: "REȚELE DE SUPRAVEGHERE DOMESTICĂ ȘI LISTE CHEIE",
    agency: "CIA",
    longSummary: "O campanie secretă de spionaj intern care a vizat activiștii împotriva războiului din Vietnam și mișcările pentru drepturi civile. Încălcând statutul legal, CIA a creat dosare pentru mii de cetățeni.",
    timeline: [
      { date: "August 1967", event: "Richard Helms înființează Grupul de Operațiuni Speciale pentru supraveghere domestică." },
      { date: "1969", event: "Extinderea monitorizării asupra Partidului Black Panther și a liderilor studențești." },
      { date: "1974", event: "Jurnalistul Seymour Hersh dezvăluie programul în New York Times, declanșând Comisia Rockefeller." }
    ],
    keyFigures: ["Richard Helms", "James Jesus Angleton", "Seymour Hersh"],
    fieldIntercept: "LISTĂ-SURVEGHERE-09: SUBIECTUL IDENTIFICAT LA PROTEST. [redact]FBI A FUSIONAT SURSELE[/redact]. INTERCEPTĂRI AUDIO EFECTUATE FĂRĂ MANDAT."
  },
  {
    codename: "OPERAȚIUNEA CYCLONE",
    year: "1979–1989",
    theater: "AFGHANISTAN",
    objective: "Finanțarea și înarmarea mujahedinilor afgani pentru a contracara invazia sovietică.",
    outcome: "Trupele sovietice s-au retras. Schimbări majore de securitate în regiune.",
    summary: "Una dintre cele mai lungi și costisitoare operațiuni secrete din istoria CIA, pompând miliarde de dolari în armament (inclusiv lansatoare de rachete Stinger) pentru a epuiza resursele militare ale URSS.",
    redactedDetail: "RUTE DE APROVIZIONARE ȘI TIPURI DE ARMAMENT",
    agency: "CIA / ISI / SIS",
    longSummary: "Finanțarea și înarmarea mujahedinilor afgani pentru a contracara invazia militară sovietică în Afganistan. Una dintre cele mai lungi și costisitoare operațiuni secrete din istoria CIA.",
    timeline: [
      { date: "3 Iulie 1979", event: "Președintele Carter semnează decretul pentru asistență non-letală." },
      { date: "1986", event: "Începe livrarea rachetelor Stinger, neutralizând elicopterele sovietice." },
      { date: "Februarie 1989", event: "Ultimele trupe sovietice se retrag complet din Afganistan." }
    ],
    keyFigures: ["Charlie Wilson", "Gust Avrakotos", "William Casey"],
    fieldIntercept: "LINIE-APROVIZIONARE-04: CONVOIUL A EXPEDIAT 200 DE RACHETE INFRAROȘU. [redact]COORDONATOR GENERALUL HAQ[/redact] CONFIRMAT PRELUAREA."
  },
  {
    codename: "OPERAȚIUNEA OLYMPIC GAMES",
    year: "2007–2010",
    theater: "IRAN",
    objective: "Sabotarea centrifugelor nucleare iraniene de la Natanz prin atacuri cibernetice.",
    outcome: "Succes. Aproximativ 1.000 de centrifuge IR-1 distruse. Programul întârziat cu circa 2 ani.",
    summary: "O armă cibernetică comună NSA-Unit 8200, cunoscută public ulterior ca Stuxnet, a fost introdusă în sistemele industriale iraniene izolate de rețea.",
    redactedDetail: "VECTOR DE LIVRARE ȘI METODOLOGIA ACCESULUI INIȚIAL",
    agency: "NSA / CIA / Unitatea 8200",
    longSummary: "Atac cibernetic clasificat destinat sabotării centrifugelor nucleare iraniene de la Natanz prin utilizarea malware-ului industrial Stuxnet. A demonstrat posibilitatea distrugerii fizice prin cod software.",
    timeline: [
      { date: "2006", event: "NSA identifică vulnerabilități în controlerele industriale Siemens." },
      { date: "Iunie 2009", event: "Versiuni timpurii ale Stuxnet sunt răspândite prin memorii USB infectate." },
      { date: "Iunie 2010", event: "Viermele scapă de sub control și se răspândește global." }
    ],
    keyFigures: ["Keith Alexander", "Barack Obama", "Michael Hayden"],
    fieldIntercept: "COD-MALWARE-NATANZ: DETECTATĂ FLUCTUAȚIE MASIVĂ DE RPM. [redact]CONTROLER PLC INFECTAT[/redact]. PARAMETRII RAPORTAȚI AFECTEAZĂ DOAR SENSORII DE VITEZĂ."
  },
  {
    codename: "OPERAȚIUNEA NEPTUNE SPEAR",
    year: "2011",
    theater: "ABBOTTABAD, PAKISTAN",
    objective: "Capturarea sau uciderea lui Osama bin Laden, leaderul al-Qaeda, responsabil pentru atacurile din 11 septembrie.",
    outcome: "Ținta eliminată. Materiale de informare recuperate. Zero victime americane.",
    summary: "Un deceniu de fuziune a informațiilor — interceptări SIGINT, urmărire HUMINT, modelare GEOINT și date MASINT — a convergit pentru a identifica un complex fortificat. SEAL Team Six a executat un raid cu elicoptere.",
    redactedDetail: "STATUTUL LEGĂTURII CU PAKISTANUL ȘI PROTOCOALELE DE NOTIFICARE",
    agency: "CIA / JSOC",
    longSummary: "Asaltul militar de precizie desfășurat în Abbottabad, Pakistan, care a dus la eliminarea lui Osama bin Laden. Succesul s-a datorat corelării datelor SIGINT, HUMINT și a modelelor geospațiale 3D.",
    timeline: [
      { date: "August 2010", event: "CIA identifică complexul din Abbottabad suspectat că îl adăpostește pe bin Laden." },
      { date: "29 Aprilie 2011", event: "Președintele Obama ordonă declanșarea asaltului tactic." },
      { date: "2 Mai 2011", event: "Elicopterele pătrund în spațiul aerian pakistanez. Misiunea se finalizează." }
    ],
    keyFigures: ["Leon Panetta", "Admiral William McRaven", "Barack Obama"],
    fieldIntercept: "MONITOR-SATELIT-LIVE: ELICOPTERE STEALTH INTRATE PE RADAR. [redact]IDENTIFICARE ADN CONFIRMATĂ[/redact]. PUNCT EXTRACTAT. FĂRĂ REPLICĂ DIN PARTEA APĂRĂRII LOCAL."
  }
];

function RedactedSpan({ text }: { text: string }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        setRevealed(!revealed);
      }}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      className={cn(
        "cursor-help transition-all duration-500 font-semibold font-mono mx-0.5 px-0.5 rounded-sm",
        revealed
          ? "bg-[#1C3A1C]/25 text-[#E8E2D5] border border-[#3A5A3A]/40"
          : "bg-black text-transparent select-none border border-transparent"
      )}
      title="Hover to declassify"
    >
      {text}
    </span>
  );
}

function parseTelexRedactions(text: string) {
  const parts = text.split(/(\[redact\].*?\[\/redact\])/g);
  return parts.map((part, index) => {
    if (part.startsWith("[redact]") && part.endsWith("[/redact]")) {
      const innerText = part.slice(8, -9);
      return <RedactedSpan key={index} text={innerText} />;
    }
    return part;
  });
}

export function DeclassifiedOperations({ locale = "en" }: { locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isRo = locale === "ro";
  const cases = isRo ? CASE_FILES_RO : CASE_FILES_EN;

  const [selectedCase, setSelectedCase] = useState<CaseFile | null>(null);

  useEffect(() => {
    if (selectedCase) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedCase]);

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
            {isRo ? "OPERAȚIUNI DECLASIFICATE" : "DECLASSIFIED OPERATIONS"}
          </div>
          <div
            className="intel-editorial"
            style={{ fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.2 }}
          >
            {isRo
              ? "Dosare istorice declasificate în mod oficial."
              : "Historical operations released to the public archive."}
          </div>
        </div>

        {/* Case files */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((file, i) => (
            <motion.div
              key={file.codename}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: i * 0.1, ease: "easeOut" }}
            >
              <div
                onClick={() => setSelectedCase(file)}
                className="group cursor-pointer p-8 sm:p-10 h-full flex flex-col justify-between transition-all duration-300 hover:border-emerald-800/40 hover:bg-[#070707]"
                style={{ background: INTEL.surface, border: `1px solid ${INTEL.border}` }}
              >
                <div>
                  {/* Case header row */}
                  <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
                    <h3
                      className="group-hover:text-emerald-500 transition-colors"
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "clamp(16px, 2vw, 22px)",
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
                      style={{ fontSize: "clamp(11px, 0.9vw, 13px)", color: INTEL.greenText }}
                    >
                      {file.year}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="intel-body text-sm max-w-2xl mb-8 leading-relaxed">
                    {file.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-rgba(232, 226, 213, 0.05) pt-4">
                  <span className="intel-bureaucratic text-[10px] text-emerald-800/70">
                    {file.agency}
                  </span>
                  <span className="intel-bureaucratic text-[10px] group-hover:text-[#E8E2D5] transition-colors">
                    {isRo ? "[ DOSAR COMPLET ] →" : "[ EXPLORE DOSSIER ] →"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Clandestine Dossier Modal */}
      {selectedCase && (
        <div
          onClick={() => setSelectedCase(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 text-left"
        >
          <div
            className="border border-rgba(232, 226, 213, 0.12) bg-[#020202] max-w-4xl w-full rounded-sm text-[#E8E2D5] flex flex-col relative max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon "X" */}
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-4 right-4 text-[#E8E2D5]/40 hover:text-[#E8E2D5] hover:bg-[#070707] border border-transparent hover:border-rgba(232, 226, 213, 0.1) transition-colors p-2 rounded-sm z-50"
              aria-label={isRo ? "Închide dosarul" : "Close dossier"}
            >
              <X size={18} />
            </button>

            {/* Scrollable Content Wrapper */}
            <div className="overflow-y-auto p-6 sm:p-10 w-full">
              {/* Modal Header */}
              <div className="border-b border-rgba(232, 226, 213, 0.08) pb-6 mb-6 pr-8">
                <div className="intel-bureaucratic text-[10px] text-emerald-800/70 tracking-widest mb-1.5">
                  {isRo ? "DOSAR DECLASIFICAT // E.O. 12958 SEC. 3.3" : "DECLASSIFIED RECORD // E.O. 12958 SEC. 3.3"}
                </div>
                <h2 className="text-2xl sm:text-3xl font-mono uppercase tracking-wider text-[#E8E2D5]">
                  {selectedCase.codename}
                </h2>
              </div>

            {/* Content Layout */}
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
              {/* Metadata Column */}
              <div className="space-y-6 border-r border-rgba(232, 226, 213, 0.05) pr-6 font-mono text-xs">
                <div>
                  <div className="text-[10px] text-emerald-800 tracking-wider mb-1 uppercase">{isRo ? "Teatru" : "Theater"}</div>
                  <div className="text-[#E8E2D5]">{selectedCase.theater}</div>
                </div>
                <div>
                  <div className="text-[10px] text-emerald-800 tracking-wider mb-1 uppercase">{isRo ? "Perioadă" : "Year"}</div>
                  <div className="text-[#E8E2D5]">{selectedCase.year}</div>
                </div>
                <div>
                  <div className="text-[10px] text-emerald-800 tracking-wider mb-1 uppercase">{isRo ? "Agenții Coordonatoare" : "Agencies"}</div>
                  <div className="text-[#E8E2D5]">{selectedCase.agency}</div>
                </div>
                <div>
                  <div className="text-[10px] text-emerald-800 tracking-wider mb-1 uppercase">Clearance</div>
                  <div className="inline-block px-2 py-0.5 text-[10px] border border-emerald-800/40 text-emerald-500 font-bold uppercase rounded-sm">
                    {isRo ? "Declasificat" : "Declassified"}
                  </div>
                </div>
              </div>

              {/* Dossier Details Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="intel-bureaucratic text-[10px] text-emerald-800 tracking-wider mb-2 uppercase">
                    {isRo ? "1. Rezumat Executiv" : "1. Executive Summary"}
                  </h4>
                  <p className="intel-body text-sm leading-relaxed" style={{ color: "#D1CBBF" }}>
                    {selectedCase.longSummary}
                  </p>
                </div>

                <div className="border-t border-rgba(232, 226, 213, 0.05) pt-6">
                  <h4 className="intel-bureaucratic text-[10px] text-emerald-800 tracking-wider mb-4 uppercase">
                    {isRo ? "2. Cronologia Evenimentelor" : "2. Timeline of Target Actions"}
                  </h4>
                  <div className="space-y-4">
                    {selectedCase.timeline.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <span className="font-mono text-xs font-bold text-[#E8E2D5] bg-[#1C3A1C]/30 border border-[#3A5A3A]/40 px-2 py-0.5 shrink-0 rounded-sm">
                          {item.date}
                        </span>
                        <p className="intel-body text-sm leading-relaxed" style={{ color: "#C4BEB3" }}>
                          {item.event}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-rgba(232, 226, 213, 0.05) pt-6">
                  <h4 className="intel-bureaucratic text-[10px] text-emerald-800 tracking-wider mb-2 uppercase">
                    {isRo ? "3. Figuri Cheie" : "3. Key Personnel"}
                  </h4>
                  <p className="intel-body text-sm leading-relaxed font-mono text-[#D1CBBF]">
                    {selectedCase.keyFigures.join(" // ")}
                  </p>
                </div>

                <div className="border-t border-rgba(232, 226, 213, 0.05) pt-6">
                  <h4 className="intel-bureaucratic text-[10px] text-emerald-800 tracking-wider mb-3 uppercase">
                    {isRo ? "4. Interceptări & Comunicații Clandestine" : "4. Clandestine Communications Intercept"}
                  </h4>
                  <div className="bg-[#030303] border border-rgba(232, 226, 213, 0.08) p-5 font-mono text-xs text-[#E8E2D5]/80 rounded-sm leading-relaxed whitespace-pre-wrap select-text">
                    <span className="block text-[9px] text-[#2A4A2A] mb-2 uppercase tracking-widest border-b border-rgba(232, 226, 213, 0.05) pb-1">
                      Raw Telex Output // System: SIG-INT-D
                    </span>
                    {parseTelexRedactions(selectedCase.fieldIntercept)}
                  </div>
                  <div className="text-[10px] font-mono text-rgba(232, 226, 213, 0.3) mt-2 italic">
                    {isRo ? "* Notă: Puneți cursorul peste blocurile negre din interceptare pentru a le declasifica în timp real." : "* Note: Hover/click on black redaction bars to temporarily reveal classified wiretap content."}
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
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

  // Pentagon points (centered at 250,220, radius ~160)
  const points = [
    { x: 250, y: 60, label: "USA" },          // top
    { x: 402, y: 176, label: "UK" },           // top-right
    { x: 344, y: 370, label: "AUS" },          // bottom-right
    { x: 156, y: 370, label: "CAN" },          // bottom-left
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
        content: "Photographic reconnaissance flights executed on 14 October have confirmed the installation of [redact]SS-4 Sandal medium-range ballistic missiles[/redact] near San Cristobal, Cuba. Analysts at the National Photographic Interpretation Center (NPIC) have identified [redact]six launch pads[/redact] capable of striking major urban areas of the eastern United States within [redact]18 minutes[/redact] of command authorization. Strategic bombers at Soviet staging airbases remain in alert state [redact]DEFCON-2 equivalent[/redact]."
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
        content: "At approximately 0210 hours, Soviet army engineers penetrated the subterranean conduit located in the [redact]Soviet sector of Berlin[/redact]. Operation PBJOINTLY has been compromised. Post-incident analysis suggests that the [redact]KGB had advance warning[/redact] of the excavation since late 1954, likely through a high-level mole inside [redact]SIS (MI6)[/redact], code-named [redact]George Blake[/redact]. All signals recording operations at the site are ceased immediately."
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
        content: "Subproject 68 experiments continue to assess the disruption of cognitive patterns via administration of [redact]high-dose LSD-25[/redact] combined with prolonged [redact]sensory deprivation[/redact]. Subjects are placed in induced sleep states for periods up to [redact]35 days[/redact] while listening to tape loops repeating verbal anchors. Preliminary outcomes indicate [redact]severe retrograde amnesia[/redact] in 85% of subjects, with complete personality de-patterning achieved."
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
        content: "The viewer was targeted against the classified submarine building at [redact]Severodvinsk, USSR[/redact]. The viewer described a massive new class of submarine under construction, characterized by [redact]double hull titanium alloy[/redact] and carrying [redact]20 ballistic missile launch tubes[/redact]. Intelligence correlation confirms the presence of the [redact]Typhoon-class SSBN[/redact], matching the layout produced by the viewer during the session."
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
        content: "At 2340 hours, radar operators at Washington National Airport detected [redact]seven slow-moving objects[/redact] traveling at speeds ranging from 100 to [redact]7,000 miles per hour[/redact]. Commercial pilots reported visual observations of [redact]glowing orange lights[/redact] maneuvering in ways that violate known aerodynamic physics. Interceptor aircraft scrambles were initiated; however, the objects [redact]vanished instantly[/redact] upon aircraft approach, only to return when aircraft departed."
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
        content: "Debris recovered from the Foster Ranch near Corona, New Mexico consists of metallic foil, wooden struts, and highly anomalous structural tape containing [redact]pictographic writing symbols[/redact]. Materials have been identified as part of the highly classified project [redact]Project Mogul balloon array[/redact], designed to detect Soviet nuclear atmospheric tests. Public media release has been altered to state the recovery of a [redact]standard weather balloon[/redact] to maintain intelligence operational security."
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
        content: "The automated signals interception system at [redact]Menwith Hill Station[/redact] is now processing all trans-atlantic satellite communications. The search matrix utilizes a [redact]dictionary keyword database[/redact] to flag telegraph and telex transmissions containing target terms. Intercepted traffic is automatically routed to [redact]NSA HQ Fort Meade[/redact] for final cryptanalytic decoding. Daily throughput has exceeded [redact]two million messages[/redact]."
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
        content: "Pursuant to inter-agency request, the SIGINT watchlist has been updated to include [redact]1,600 prominent American citizens[/redact] involved in civil rights and anti-Vietnam war movements. Intercepted international telephone calls and cables of targets including [redact]Martin Luther King Jr. and Jane Fonda[/redact] are being distributed to [redact]the FBI and CIA[/redact] under the code name Project MINARET. No judicial warrants have been obtained for these intercepts."
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
        content: "Zborurile de recunoaștere din 14 octombrie au confirmat instalarea de [redact]rachete balistice cu rază medie SS-4 Sandal[/redact] lângă San Cristobal, Cuba. Analiștii au identificat [redact]șase rampe de lansare[/redact] capabile să lovească zonele urbane din estul SUA în [redact]18 minute[/redact] de la ordin. Bombardierele strategice din bazele sovietice rămân în stare de alertă [redact]echivalentă DEFCON-2[/redact]."
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
        content: "La aproximativ ora 0210, inginerii armatei sovietice au pătruns în conducta subterană situată în [redact]sectorul sovietic din Berlin[/redact]. Operațiunea PBJOINTLY a fost compromisă. Analiza sugerează că [redact]KGB-ul a avut informații prealabile[/redact] încă din 1954, cel mai probabil printr-o cârtiță în [redact]SIS (MI6)[/redact], cu numele de cod [redact]George Blake[/redact]. Toate interceptările au fost oprite."
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
        content: "Experimentele subproiectului 68 continuă evaluarea perturbării cognitive prin administrarea de [redact]doze mari de LSD-25[/redact] combinată cu [redact]deprivarea senzorială[/redact] prelungită. Subiecții sunt plasați în somn indus timp de până la [redact]35 de zile[/redact] ascultând benzi audio repetitive. Rezultatele indică [redact]amnezie retrogradă severă[/redact] la 85% din cazuri."
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
        content: "Subiectul a vizat clădirea clasificată de submarine din [redact]Severodvinsk, URSS[/redact]. Acesta a descris un nou submarin masiv în construcție, caracterizat prin [redact]carcasă dublă din aliaj de titan[/redact] și dotat cu [redact]20 de tuburi de lansare rachete[/redact]. Datele confirmă prezența clasei [redact]Typhoon SSBN[/redact], corespunzând schiței realizate în sesiune."
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
        content: "La ora 2340, operatorii radar de la Aeroportul Național Washington au detectat [redact]șapte obiecte cu mișcare lentă[/redact] deplasându-se cu viteze de la 100 la [redact]7.000 de mile pe oră[/redact]. Piloții au raportat [redact]lumini portocalii strălucitoare[/redact] cu manevre ce încalcă legile fizicii. Avioanele de vânătoare au fost trimise; totuși, obiectele [redact]au dispărut instantaneu[/redact] la apropierea lor."
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
        content: "Resturile recuperate de la Foster Ranch de lângă Corona, New Mexico constau în folie metalică și bandă structurală anomală conținând [redact]simboluri pictografice[/redact]. Materialele au fost identificate ca parte a proiectului clasificat [redact]Project Mogul (balon aerostatic)[/redact] pentru detectarea testelor nucleare sovietice. Comunicatul de presă a fost modificat indicând un [redact]balon meteo standard[/redact]."
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
        content: "Sistemul automat de interceptare a semnalelor de la [redact]Menwith Hill Station[/redact] procesează acum toate comunicațiile prin satelit. Matricea de căutare utilizează o [redact]bază de date cu cuvinte cheie[/redact] pentru a semnala mesajele relevante. Traficul este direcționat automat la [redact]NSA HQ Fort Meade[/redact] pentru decodarea finală. Volumul depășește [redact]două milioane de mesaje zilnic[/redact]."
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
        content: "Conform solicitării inter-agenții, lista SIGINT a fost actualizată pentru a include [redact]1.600 de cetățeni americani de seamă[/redact] implicați în mișcările anti-război. Convorbirile și telegramele interceptate ale unor ținte ca [redact]Martin Luther King Jr. și Jane Fonda[/redact] are being distributed to [redact]the FBI and CIA[/redact] under the code name Project MINARET. No judicial warrants have been obtained for these intercepts."
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
            "transition-all duration-700 ease-in-out font-mono font-bold mx-0.5 px-0.5 rounded-sm select-text",
            isDeclassified
              ? "bg-[#1C3A1C]/25 text-[#E8E2D5] border border-[#3A5A3A]/40"
              : "bg-black text-transparent select-none border border-transparent pointer-events-none"
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
            style={{ fontSize: "clamp(11px, 0.9vw, 14px)", letterSpacing: "0.25em", color: INTEL.greenText }}
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
              ? "Explorați o selecție simulată de documente CIA declasificate prin proceduri FOIA. Utilizați sistemul de criptanaliză pentru a îndepărta marcajele de securitate din text."
              : "Explore a curated simulation of declassified CIA records released under the Freedom of Information Act. Use the decryption interface to scrub security redactions."}
          </p>
        </div>

        {/* Vault Explorer Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 border border-rgba(232, 226, 213, 0.08) bg-[#020202] rounded-sm overflow-hidden min-h-[550px] text-left">
          
          {/* Left Panel: Folders & Document Listing */}
          <div className="border-r border-rgba(232, 226, 213, 0.08) flex flex-col bg-[#040404]">
            {/* Folders List */}
            <div className="p-4 border-b border-rgba(232, 226, 213, 0.08) space-y-2">
              <span className="intel-bureaucratic text-[9px] text-emerald-800/60 block mb-2 tracking-widest">
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
                        ? "bg-[#1C3A1C]/20 text-[#E8E2D5] border border-[#3A5A3A]/40 font-bold"
                        : "text-rgba(232, 226, 213, 0.4) hover:text-[#E8E2D5] hover:bg-[#070707]"
                    )}
                  >
                    📂 {folder.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Documents in Active Folder */}
            <div className="p-4 flex-1 space-y-2 overflow-y-auto">
              <span className="intel-bureaucratic text-[9px] text-emerald-800/60 block mb-2 tracking-widest">
                {isRo ? "DOSARE DISPONIBILE" : "AVAILABLE DOCUMENTS"}
              </span>
              <div className="space-y-1">
                {activeFolder.documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => handleDocChange(doc.id)}
                    className={cn(
                      "w-full text-left font-mono text-xs px-3 py-2.5 transition-colors rounded-sm flex flex-col border",
                      activeDocId === doc.id
                        ? "border-emerald-800/40 bg-[#070707] text-[#E8E2D5]"
                        : "border-transparent text-rgba(232, 226, 213, 0.5) hover:bg-[#070707]/50"
                    )}
                  >
                    <span className="font-semibold truncate">{doc.title}</span>
                    <span className="text-[9px] text-emerald-800/60 mt-1">{doc.refNo}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Document Viewer */}
          <div className="p-6 sm:p-10 flex flex-col justify-between bg-[#030303] min-h-[450px]">
            {/* Document Header Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rgba(232, 226, 213, 0.08) pb-5 mb-6">
              <div>
                <span className="font-mono text-[10px] text-emerald-500 font-bold tracking-widest border border-emerald-500/30 px-2 py-0.5 rounded-sm bg-[#1C3A1C]/10 inline-block uppercase">
                  {activeDoc.classification}
                </span>
                <span className="font-mono text-[9px] text-rgba(232, 226, 213, 0.3) ml-3 tracking-wider">
                  {activeDoc.refNo}
                </span>
              </div>

              {/* Decrypt Trigger Button */}
              <button
                onClick={triggerDeclassification}
                disabled={isDecrypting}
                className={cn(
                  "font-mono text-[11px] px-4 py-2 border transition-colors rounded-sm uppercase tracking-wider",
                  isDeclassified
                    ? "bg-[#2d1212]/30 text-red-400 border-red-950/40 hover:bg-[#2d1212]/50"
                    : "bg-[#1C3A1C]/30 text-emerald-400 border-emerald-950/40 hover:bg-[#1C3A1C]/50"
                )}
              >
                {isDecrypting ? (
                  <span>{isRo ? "DECRIPTARE INIȚIATĂ..." : "DECRYPTING LOG..."} [{Math.min(decryptProgress, 100)}%]</span>
                ) : isDeclassified ? (
                  <span>🔒 {isRo ? "RE-CLASIFICĂ DOSARUL" : "RE-CLASSIFY RECORD"}</span>
                ) : (
                  <span>🔓 {isRo ? "SOLICITĂ DECLASIFICAREA" : "REQUEST DECLASSIFICATION"}</span>
                )}
              </button>
            </div>

            {/* Document Sheet (Typewriter styling) */}
            <div className="flex-1 font-mono text-left max-w-3xl">
              {/* Bureaucratic Memo Info */}
              <div className="text-[11px] text-[#2A4A2A] space-y-1 pb-6 border-b border-rgba(232, 226, 213, 0.04) mb-6 uppercase tracking-wide">
                <div>TO: {activeDoc.to}</div>
                <div>FROM: {activeDoc.from}</div>
                <div>DATE: {activeDoc.date}</div>
                <div>SUBJECT: {activeDoc.subject}</div>
              </div>

              {/* Document Text */}
              <div className="text-sm text-[#E8E2D5]/90 leading-relaxed whitespace-pre-line select-text">
                {parseRedactions(activeDoc.content, isDeclassified)}
              </div>
            </div>

            {/* Document Footer */}
            <div className="border-t border-rgba(232, 226, 213, 0.05) pt-5 mt-8 flex flex-wrap justify-between items-center text-[10px] font-mono text-rgba(232, 226, 213, 0.25)">
              <div>FOIA CASE NO: 2026-F-0809 // RECORDS RETRO-DECONV</div>
              <div>{isRo ? "SURSA: CIA READING ROOM SIM" : "SOURCE: CIA READING ROOM SIM"}</div>
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
