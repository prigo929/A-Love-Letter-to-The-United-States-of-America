// ─────────────────────────────────────────────────────────────────────────────
// page.tsx — MILITARY POWER · CINEMATIC OVERHAUL v3
// "The United States as a planetary command-and-control system."
//
// Design language ─────────────────────────────────────────────────────────────
//   Defense-Tech × Aerospace HUD × Apple Keynote × Top Gun: Maverick
//
// Architecture ────────────────────────────────────────────────────────────────
//   Every section is a full-bleed cinematic panel.
//   Layers per panel: bg-image → vignette → grid → scan → grain → HUD → text
//
// Sections ────────────────────────────────────────────────────────────────────
//   §0  HERO          — B-2 emerging from darkness, parallax, particle canvas
//   §1  STAT WALL     — HUD counters across the full viewport
//   §2  DOMINANCE     — global overview + budget comparison bars
//   §3  BRANCHES      — cinematic branch selector
//   §4  CARRIER MAP   — world map with real-time carrier positions + satellite
//   §5  WEAPONS       — classified dossier cards
//   §6  NUCLEAR TRIAD — interactive SVG triangle
//   §7  DARPA         — future systems grid
//   §8  INDUSTRY      — defense contractor grid
//   §9  FACTS         — rolling ticker + fact cards
//   §10 QUOTE         — full-bleed cinematic quote
//   §11 SUB-PAGE NAV  — chapter navigation
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


import {
  MilStyles,
  HUDGrid,
  HUDCounter,
  HUDCorners,
  GrainOverlay,
  ScanLine,
  RadarPing,
  ParticleCanvas,
  WeaponSystemCard,
  BranchSelector,
  DARPAProgramGrid,
  NuclearTriadDiagram,
  GlobalCarrierMap,
  ParallaxMilitaryHero,
  BudgetComparisonBar,
} from "@/components/military/MilitaryAnimations";

import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";
import { SITE_IMAGES } from "@/lib/site-images";

import {
  MILITARY_STATS,
  MILITARY_BRANCHES,
  WEAPON_SYSTEMS,
  DARPA_PROGRAMS,
  NUCLEAR_TRIAD,
  CARRIER_POSITIONS,
  MILITARY_QUOTES,
  DEFENSE_CONTRACTORS,
  BUDGET_DATA,
  getMilitaryFacts,
  getMilitaryStats,
} from "@/lib/data/military-data";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "American Military Power | America: The Greatest Nation",
  description:
    "The United States operates the most advanced military-industrial-intelligence system in human history. Explore the forces, technologies, and doctrine that define planetary dominance.",
  openGraph: {
    title: "American Military Power",
    description: "Planetary command-and-control. The full spectrum of American military supremacy.",
    images: [{ url: SITE_IMAGES.military.hero, width: 1200, height: 630 }],
  },
};

// ─── Constants ────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { 
    value: `${MILITARY_STATS.find(s => s.id === "budget")?.prefix}${MILITARY_STATS.find(s => s.id === "budget")?.value}${MILITARY_STATS.find(s => s.id === "budget")?.suffix}`, 
    label: "Defense Budget" 
  },
  { 
    value: `${MILITARY_STATS.find(s => s.id === "carriers")?.value}`, 
    label: "Carrier Groups" 
  },
  { 
    value: `${MILITARY_STATS.find(s => s.id === "bases")?.value}${MILITARY_STATS.find(s => s.id === "bases")?.suffix}`, 
    label: "Global Bases" 
  },
  { 
    value: `${MILITARY_STATS.find(s => s.id === "nukes")?.value}${MILITARY_STATS.find(s => s.id === "nukes")?.suffix}`, 
    label: "Nuclear Warheads" 
  },
];

const DOMINANCE_METRICS = [
  { value: "39%",  label: "Share of Global Military Spending",          color: "#f59e0b" as const },
  { 
    value: `${MILITARY_STATS.find(s => s.id === "satellites")?.value}${MILITARY_STATS.find(s => s.id === "satellites")?.suffix}`,  
    label: "Satellites in Military Orbit",               
    color: "#60a5fa" as const 
  },
  { 
    value: `${Math.round(MILITARY_STATS.find(s => s.id === "aircraft")?.value! / 1000)}K+`, 
    label: "Military Aircraft — Largest Fleet on Earth", 
    color: "#f59e0b" as const 
  },
  { 
    value: `${MILITARY_STATS.find(s => s.id === "ships")?.value}${MILITARY_STATS.find(s => s.id === "ships")?.suffix}`,  
    label: "Naval Vessels Including 11 Supercarriers",   
    color: "#60a5fa" as const 
  },
];

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  children,
  id,
  label,
  amber = false,
  fullBleed = false,
  bg = "#070c18",
  noPad = false,
}: {
  children: React.ReactNode;
  id?: string;
  label?: string;
  amber?: boolean;
  fullBleed?: boolean;
  bg?: string;
  noPad?: boolean;
}) {
  return (
    <section
      id={id}
      style={{
        position:   "relative",
        background: bg,
        overflow:   "hidden",
      }}
    >
      {/* Amber or steel top rule */}
      <div style={{
        height: 1.5,
        background: amber
          ? "linear-gradient(90deg,transparent,#f59e0b 30%,#f59e0b 70%,transparent)"
          : "linear-gradient(90deg,transparent,rgba(96,165,250,.3) 30%,rgba(96,165,250,.3) 70%,transparent)",
      }}/>

      {/* Section label */}
      {label && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          display: "flex", justifyContent: "center", paddingTop: 22,
          zIndex: 4,
        }}>
          <div
            className="md"
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           10,
              fontSize:       8,
              letterSpacing: ".38em",
              color:         amber ? "rgba(245,158,11,.55)" : "rgba(96,165,250,.45)",
              textTransform: "uppercase",
            }}
          >
            <div style={{
              height: 1, width: 40,
              background: `linear-gradient(90deg,transparent,${amber ? "#f59e0b" : "#60a5fa"})`,
            }}/>
            {label}
            <div style={{
              height: 1, width: 40,
              background: `linear-gradient(90deg,${amber ? "#f59e0b" : "#60a5fa"},transparent)`,
            }}/>
          </div>
        </div>
      )}

      {/* Content */}
      <div style={noPad ? undefined : {
        maxWidth:  fullBleed ? "none" : 1280,
        margin:    "0 auto",
        padding:   fullBleed ? 0 : "80px 24px",
        paddingTop: label ? (fullBleed ? 0 : 100) : undefined,
      }}>
        {children}
      </div>
    </section>
  );
}

// ─── Classified Badge ─────────────────────────────────────────────────────────

function ClassifiedBadge({ text = "CLASSIFIED · EYES ONLY" }: { text?: string }) {
  return (
    <div
      className="md mk-blink"
      style={{
        display:       "inline-flex",
        alignItems:    "center",
        gap:           8,
        padding:       "5px 14px",
        border:        "1px solid rgba(245,158,11,.3)",
        background:    "rgba(245,158,11,.07)",
        fontSize:       8,
        letterSpacing: ".3em",
        color:         "rgba(245,158,11,.8)",
        textTransform: "uppercase",
      }}
    >
      ◈ {text}
    </div>
  );
}

// ─── Cinematic Section Image ──────────────────────────────────────────────────

function CinematicImage({
  src,
  alt,
  height = 480,
  children,
  grade = true,
}: {
  src:       string;
  alt:       string;
  height?:   number;
  children?: React.ReactNode;
  grade?:    boolean;
}) {
  return (
    <div
      className="mk-grain"
      style={{
        position: "relative",
        height,
        overflow: "hidden",
        background: "#040810",
      }}
    >
      <div className="mk-ken" style={{ position: "absolute", inset: "-6%" }}>
        <Image
          src={src}
          alt={alt}
          fill
          quality={80}
          sizes="(max-width: 1024px) 100vw, 1280px"
          style={{
            objectFit: "cover",
            filter:    "brightness(.28) saturate(.45) hue-rotate(200deg)",
          }}
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </div>

      {grade && (
        <div style={{
          position:   "absolute",
          inset:       0,
          zIndex:      2,
          background: "linear-gradient(135deg,rgba(0,0,0,.55) 0%,rgba(7,12,24,.65) 60%,rgba(0,0,0,.8) 100%)",
        }}/>
      )}

      <HUDGrid/>
      <ScanLine/>
      <GrainOverlay z={30} opacity={.025}/>

      <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>
        {children}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function MilitaryPage() {
  const locale = await getServerLocale();
  const stats  = getMilitaryStats(locale);
  const facts  = getMilitaryFacts(locale);
  const quote  = MILITARY_QUOTES[0];

  return (
    <div
      className="md"
      style={{ background: "#070c18", color: "#fff", minHeight: "100vh" }}
    >
      <MilStyles/>


      {/* ─── §1  HERO — B-2 emerging from darkness ─────────────────────────── */}
      <ParallaxMilitaryHero
        imageSrc={SITE_IMAGES.military.hero}
        imageAlt="B-2 Spirit stealth bomber"
        title="ABSOLUTE POWER"
        subtitle="United States Military · Industrial · Intelligence Complex"
        tagline="First in strength · First in readiness · First in the world"
        stats={HERO_STATS}
      />

      {/* ─── §2  GLOBAL STAT WALL ──────────────────────────────────────────── */}
      <Section
        id="stats"
        bg="#040810"
        amber
        label="VERIFIED METRICS · FY 2024"
        noPad
      >
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))",
            gap:                  0,
            borderTop:           "1px solid rgba(255,255,255,.04)",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.id}
              style={{
                borderRight:  "1px solid rgba(255,255,255,.04)",
                borderBottom: "1px solid rgba(255,255,255,.04)",
                padding:      "36px 28px",
              }}
            >
              <HUDCounter stat={s} index={i}/>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── §3  GLOBAL DOMINANCE OVERVIEW ─────────────────────────────────── */}
      <Section
        id="dominance"
        label="GLOBAL DOMINANCE · STRATEGIC OVERVIEW"
        bg="#060c1a"
      >
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <ClassifiedBadge text="STRATEGIC ASSESSMENT · 2024"/>
          <h2
            className="md"
            style={{
              marginTop:     18,
              fontSize:       "clamp(36px,6vw,72px)",
              fontWeight:     900,
              lineHeight:     .92,
              letterSpacing: "-.02em",
              color:         "#fff",
            }}
          >
            PLANETARY<br/>
            <span style={{ color: "#f59e0b" }}>COMMAND</span>
          </h2>
          <p
            className="mb"
            style={{
              marginTop:  20,
              maxWidth:   620,
              margin:     "20px auto 0",
              fontSize:    15,
              lineHeight:  1.7,
              color:      "rgba(255,255,255,.45)",
            }}
          >
            The United States does not simply field a military — it operates a globally
            interconnected command-and-control system spanning land, sea, air, space, and
            cyberspace. No nation comes close.
          </p>
        </div>

        {/* Dominance metric tiles */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
            gap:                 20,
            marginBottom:        48,
          }}
        >
          {DOMINANCE_METRICS.map((m, i) => (
            <div
              key={i}
              style={{
                position:       "relative",
                padding:        "28px 24px",
                background:     "rgba(255,255,255,.02)",
                border:         "1px solid rgba(255,255,255,.06)",
                backdropFilter: "blur(8px)",
                overflow:       "hidden",
              }}
            >
              <HUDCorners color={m.color} size={12} weight={1.2} offset={6}/>
              <div
                className="md"
                style={{ fontSize: "clamp(30px,4vw,48px)", fontWeight: 900, color: m.color, lineHeight: 1 }}
              >
                {m.value}
              </div>
              <div
                className="mb"
                style={{ marginTop: 10, fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,.48)" }}
              >
                {m.label}
              </div>
              <div style={{
                position:   "absolute",
                bottom:      0,
                left:        0,
                right:       0,
                height:      2,
                background: `linear-gradient(90deg,${m.color},transparent)`,
              }}/>
            </div>
          ))}
        </div>

        {/* Budget comparison chart */}
        <div
          style={{
            padding:        "36px",
            background:     "rgba(255,255,255,.02)",
            border:         "1px solid rgba(255,255,255,.06)",
            position:       "relative",
            overflow:       "hidden",
          }}
        >
          <HUDCorners color="#f59e0b" size={14} weight={1.5} offset={8}/>
          <GrainOverlay z={20} opacity={.02}/>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <div
                className="md"
                style={{ fontSize: 8, letterSpacing: ".3em", color: "rgba(245,158,11,.6)", marginBottom: 6 }}
              >
                VERIFIED · SIPRI 2024
              </div>
              <h3
                className="md"
                style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}
              >
                DEFENSE BUDGET COMPARISON
              </h3>
            </div>
            <RadarPing size={60}/>
          </div>

          <BudgetComparisonBar data={BUDGET_DATA}/>

          <div
            className="md"
            style={{ marginTop: 20, fontSize: 8, letterSpacing: ".2em", color: "rgba(255,255,255,.2)" }}
          >
            ◈ &nbsp; U.S. OUTSPENDS THE NEXT TEN NATIONS COMBINED
          </div>
        </div>
      </Section>
      
      {/* ─── §3.5  SUPREMACY WAVE — MILITARY SHOWCASE ────────────────────────── */}
      <Section
        id="supremacy-wave"
        label="AMERICA SUPREMACY · MILITARY SHOWCASE"
        bg="#040810"
      >
        <div 
          style={{ 
            position: "relative", 
            width: "100%", 
            aspectRatio: "16/9", 
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,.1)",
            background: "#000"
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            aria-label="Cinematic military supremacy video showcase"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src="/videos/military/supremacy-wave.mp4" type="video/mp4" />
          </video>
          
          {/* CRT Scanline effect overlay for immersive military aesthetic */}
          <div className={cn(
            "pointer-events-none absolute inset-0 z-20 opacity-15",
            "bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)," +
            "linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]",
            "bg-size-[100%_4px,3px_100%]"
          )} />
          
          <HUDCorners color="#f59e0b" size={24} weight={2} offset={16}/>
          
          <div style={{
            position: "absolute",
            bottom: 30,
            left: 30,
            zIndex: 30,
            borderLeft: "2px solid #f59e0b",
            paddingLeft: 16
          }}>
            <h2 className="md" style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: ".1em" }}>
              ABSOLUTE SUPREMACY
            </h2>
            <p className="md" style={{ fontSize: 9, letterSpacing: ".3em", color: "rgba(245,158,11,.8)", marginTop: 4 }}>
              PLANETARY DOMINANCE · VERIFIED 2024
            </p>
          </div>
        </div>
      </Section>

      {/* ─── §4  MILITARY BRANCHES ──────────────────────────────────────────── */}
      <Section
        id="branches"
        label="THE BRANCHES OF SERVICE"
        bg="#070c18"
        amber
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            className="md"
            style={{
              fontSize:       "clamp(32px,5vw,60px)",
              fontWeight:     900,
              lineHeight:     .95,
              letterSpacing: "-.015em",
              color:         "#fff",
              margin:         0,
            }}
          >
            SIX BRANCHES.<br/>
            <span style={{ color: "#f59e0b" }}>ONE MISSION.</span>
          </h2>
        </div>
        <BranchSelector branches={MILITARY_BRANCHES}/>
      </Section>

      {/* ─── §5  CARRIER MAP CINEMATIC INTERLUDE ────────────────────────────── */}
      <CinematicImage
        src={SITE_IMAGES.military.carrier}
        alt="USS Nimitz carrier strike group"
        height={420}
      >
        <div style={{
          position:        "absolute",
          inset:            0,
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          flexDirection:   "column",
          textAlign:       "center",
          padding:         "0 24px",
        }}>
          <HUDCorners color="#f59e0b" size={24} weight={2} offset={16}/>
          <div className="md" style={{ fontSize: 8, letterSpacing: ".4em", color: "rgba(245,158,11,.7)", marginBottom: 18 }}>
            NAVAL SUPERIORITY · GLOBAL REACH
          </div>
          <h2
            className="md"
            style={{
              fontSize:       "clamp(40px,8vw,96px)",
              fontWeight:     900,
              lineHeight:     .9,
              letterSpacing: "-.02em",
              color:         "#fff",
              margin:         0,
            }}
          >
            11 CARRIER<br/>STRIKE GROUPS
          </h2>
          <div
            className="md"
            style={{
              marginTop:     22,
              fontSize:       "clamp(9px,1.4vw,12px)",
              letterSpacing: ".25em",
              color:         "rgba(255,255,255,.35)",
              textTransform: "uppercase",
            }}
          >
            Simultaneously deployed across every ocean on earth
          </div>
        </div>
      </CinematicImage>

      {/* ─── §6  GLOBAL CARRIER MAP ─────────────────────────────────────────── */}
      <Section
        id="carrier-map"
        label="CARRIER GROUP DEPLOYMENT · LIVE POSITIONS"
        bg="#040810"
      >
        <GlobalCarrierMap positions={CARRIER_POSITIONS}/>
      </Section>

      {/* ─── §7  WEAPON SYSTEMS ─────────────────────────────────────────────── */}
      <Section
        id="weapons"
        label="CROWN JEWELS OF AMERICAN POWER"
        bg="#060c1a"
        amber
      >
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <ClassifiedBadge text="WEAPONS SYSTEMS · DOSSIER ACCESS"/>
          <h2
            className="md"
            style={{
              marginTop:     18,
              fontSize:       "clamp(32px,5.5vw,66px)",
              fontWeight:     900,
              lineHeight:     .92,
              letterSpacing: "-.02em",
              color:         "#fff",
            }}
          >
            THE ARSENAL OF<br/>
            <span style={{ color: "#f59e0b" }}>DEMOCRACY</span>
          </h2>
          <p
            className="mb"
            style={{
              marginTop:  18,
              maxWidth:   560,
              margin:     "18px auto 0",
              fontSize:    14,
              lineHeight:  1.7,
              color:      "rgba(255,255,255,.42)",
            }}
          >
            From stealth aircraft to hypersonic missiles, the systems that define
            the technological boundary of what warfare can be.
          </p>
        </div>

        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))",
            gap:                  24,
          }}
        >
          {WEAPON_SYSTEMS.map((sys, i) => (
            <WeaponSystemCard key={sys.id} system={sys} index={i}/>
          ))}
        </div>
      </Section>

      {/* ─── §8  B-2 CINEMATIC INTERLUDE ────────────────────────────────────── */}
      <CinematicImage
        src={SITE_IMAGES.military.b2}
        alt="B-2 Spirit stealth bomber over the Pacific"
        height={520}
      >
        <div style={{
          position:       "absolute",
          bottom:          60,
          left:            0,
          right:           0,
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          textAlign:      "center",
          padding:        "0 24px",
        }}>
          <div className="md" style={{ fontSize: 8, letterSpacing: ".4em", color: "rgba(245,158,11,.65)", marginBottom: 14 }}>
            NORTHROP GRUMMAN B-2 SPIRIT · SINCE 1997
          </div>
          <h2
            className="md"
            style={{
              fontSize:       "clamp(36px,7vw,84px)",
              fontWeight:     900,
              lineHeight:     .9,
              letterSpacing: "-.02em",
              color:         "#fff",
              margin:         0,
            }}
          >
            BORN FROM<br/>
            <span style={{ color: "#f59e0b" }}>DARKNESS</span>
          </h2>
          <div
            className="mb"
            style={{
              marginTop:   18,
              maxWidth:    460,
              fontSize:    13,
              lineHeight:  1.65,
              color:      "rgba(255,255,255,.42)",
            }}
          >
            The world's only operational low-observable strategic stealth bomber.
            Radar cross-section equivalent to a large bird. Range: global.
          </div>

          {/* Spec strip */}
          <div style={{
            marginTop:  28,
            display:    "flex",
            gap:         24,
            flexWrap:   "wrap",
            justifyContent: "center",
          }}>
            {[
              ["SPEED", "Mach 0.95"],
              ["RANGE", "6,900+ mi"],
              ["PAYLOAD", "40,000 lb"],
              ["FLEET",   "20 aircraft"],
            ].map(([k, v]) => (
              <div key={k} style={{ textAlign: "center" }}>
                <div className="md" style={{ fontSize: 7, letterSpacing: ".22em", color: "rgba(245,158,11,.55)" }}>{k}</div>
                <div className="md" style={{ fontSize: 13, color: "#f59e0b", fontWeight: 700 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <HUDCorners color="#f59e0b" size={22} weight={2} offset={20}/>
      </CinematicImage>

      {/* ─── §9  NUCLEAR TRIAD ──────────────────────────────────────────────── */}
      <Section
        id="nuclear"
        label="NUCLEAR DETERRENCE · THE IRON TRIAD"
        bg="#040810"
        amber
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <ClassifiedBadge text="NUCLEAR COMMAND · TOP SECRET"/>
          <h2
            className="md"
            style={{
              marginTop:     18,
              fontSize:       "clamp(32px,5vw,60px)",
              fontWeight:     900,
              lineHeight:     .92,
              letterSpacing: "-.02em",
              color:         "#fff",
            }}
          >
            THE NUCLEAR<br/>
            <span style={{ color: "#f59e0b" }}>TRIAD</span>
          </h2>
        </div>

        <NuclearTriadDiagram triad={NUCLEAR_TRIAD}/>

        {/* Triad facts strip */}
        <div
          style={{
            marginTop:           28,
            display:             "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            borderTop:           "1px solid rgba(255,255,255,.05)",
            borderLeft:          "1px solid rgba(255,255,255,.05)",
          }}
        >
          {[
            { v: "5,550+",   l: "Total Nuclear Warheads",         sub: "Verified stockpile" },
            { v: "400",      l: "Minuteman III ICBMs on Alert",    sub: "Silo-based, 24/7" },
            { v: "14",       l: "Ohio-Class SSBNs",                sub: "Trident II D5 equipped" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding:      "28px 24px",
                borderRight:  "1px solid rgba(255,255,255,.05)",
                borderBottom: "1px solid rgba(255,255,255,.05)",
                textAlign:    "center",
              }}
            >
              <div className="md" style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#f59e0b", lineHeight: 1 }}>
                {item.v}
              </div>
              <div className="md" style={{ marginTop: 8, fontSize: 10, letterSpacing: ".16em", color: "rgba(255,255,255,.65)" }}>
                {item.l}
              </div>
              <div className="md" style={{ marginTop: 4, fontSize: 8, letterSpacing: ".14em", color: "rgba(255,255,255,.3)" }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── §10  DARPA / FUTURE SYSTEMS ────────────────────────────────────── */}
      <Section
        id="darpa"
        label="DARPA · FUTURE CAPABILITIES"
        bg="#060c1a"
      >
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <ClassifiedBadge text="FUTURE SYSTEMS · CONCEPT PHASE"/>
          <h2
            className="md"
            style={{
              marginTop:     18,
              fontSize:       "clamp(32px,5.5vw,66px)",
              fontWeight:     900,
              lineHeight:     .92,
              letterSpacing: "-.02em",
              color:         "#fff",
            }}
          >
            THE NEXT<br/>
            <span style={{ color: "#60a5fa" }}>GENERATION</span>
          </h2>
          <p
            className="mb"
            style={{
              marginTop:  18,
              maxWidth:   560,
              margin:     "18px auto 0",
              fontSize:    14,
              lineHeight:  1.7,
              color:      "rgba(255,255,255,.42)",
            }}
          >
            DARPA — the Defense Advanced Research Projects Agency — funds technologies
            a generation ahead of the battlefield. What's in development today
            is what wins wars in 2040.
          </p>
        </div>

        <DARPAProgramGrid programs={DARPA_PROGRAMS}/>
      </Section>


      {/* ─── §11  ORBITAL CINEMATIC INTERLUDE ───────────────────────────────── */}
      <CinematicImage
        src={SITE_IMAGES.military.satellite}
        alt="US military satellite orbital infrastructure"
        height={460}
      >
        <div style={{
          position:       "absolute",
          inset:           0,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          flexDirection:  "column",
          textAlign:      "center",
          padding:        "0 24px",
        }}>
          <HUDCorners color="#60a5fa" size={22} weight={2} offset={20}/>

          <div className="md" style={{ fontSize: 8, letterSpacing: ".38em", color: "rgba(96,165,250,.65)", marginBottom: 16 }}>
            SPACE DOMAIN AWARENESS · REAL-TIME GLOBAL COVERAGE
          </div>
          <h2
            className="md"
            style={{
              fontSize:       "clamp(36px,7vw,88px)",
              fontWeight:     900,
              lineHeight:     .9,
              letterSpacing: "-.02em",
              color:         "#fff",
              margin:         0,
            }}
          >
            ORBITAL<br/>
            <span style={{ color: "#60a5fa" }}>DOMINANCE</span>
          </h2>
          <div
            className="mb"
            style={{
              marginTop:  18,
              maxWidth:   460,
              fontSize:    13,
              lineHeight:  1.65,
              color:      "rgba(255,255,255,.42)",
            }}
          >
            142+ military satellites provide GPS precision, real-time ISR, nuclear launch
            detection, strategic communications, and missile defense integration.
          </div>

          {/* HUD data elements */}
          <div style={{ position: "absolute", top: 22, right: 22, textAlign: "right" }}>
            {["ORBIT: LEO/MEO/GEO", "UPLINK: ENCRYPTED", "COVERAGE: GLOBAL", "STATUS: NOMINAL"].map((t, i) => (
              <div key={i} className="md" style={{ fontSize: 8, letterSpacing: ".18em", color: "rgba(96,165,250,.4)", marginBottom: 5 }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </CinematicImage>

      {/* ─── §12  DEFENSE INDUSTRIAL BASE ───────────────────────────────────── */}
      <Section
        id="industry"
        label="DEFENSE INDUSTRIAL BASE"
        bg="#040810"
        amber
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            className="md"
            style={{
              fontSize:       "clamp(30px,5vw,60px)",
              fontWeight:     900,
              lineHeight:     .95,
              letterSpacing: "-.015em",
              color:         "#fff",
              margin:         0,
            }}
          >
            THE PRIME<br/>
            <span style={{ color: "#f59e0b" }}>CONTRACTORS</span>
          </h2>
          <p
            className="mb"
            style={{
              marginTop:  16,
              maxWidth:   520,
              margin:     "16px auto 0",
              fontSize:    14,
              lineHeight:  1.7,
              color:      "rgba(255,255,255,.42)",
            }}
          >
            The companies that translate American science into weapons no adversary
            can counter — and no alliance can field.
          </p>
        </div>

        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
            gap:                  16,
          }}
        >
          {DEFENSE_CONTRACTORS.map((c, i) => (
            <div
              key={c.name}
              style={{
                position:       "relative",
                padding:        "24px 22px",
                background:     "rgba(255,255,255,.02)",
                border:         "1px solid rgba(255,255,255,.06)",
                backdropFilter: "blur(8px)",
                overflow:       "hidden",
                display:        "flex",
                flexDirection:  "column",
                height:         "100%",
              }}
            >
              <HUDCorners color="#f59e0b" size={12} weight={1.2} offset={6}/>

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <h4
                  className="md"
                  style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: 0 }}
                >
                  {c.name}
                </h4>
                <div
                  className="md"
                  style={{
                    padding:       "4px 10px",
                    background:    "rgba(245,158,11,.1)",
                    border:        "1px solid rgba(245,158,11,.25)",
                    fontSize:       9,
                    letterSpacing: ".15em",
                    color:         "#f59e0b",
                    whiteSpace:    "nowrap",
                  }}
                >
                  {c.revenue}
                </div>
              </div>

              <div
                className="mb"
                style={{ marginBottom: 14, fontSize: 11, color: "rgba(96,165,250,.7)", letterSpacing: ".05em", flexGrow: 1 }}
              >
                {c.specialty}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {c.programs.map(prog => (
                  <div
                    key={prog}
                    className="md"
                    style={{
                      padding:       "3px 10px",
                      background:    "rgba(255,255,255,.04)",
                      border:        "1px solid rgba(255,255,255,.07)",
                      fontSize:       8,
                      letterSpacing: ".12em",
                      color:         "rgba(255,255,255,.4)",
                    }}
                  >
                    {prog}
                  </div>
                ))}
              </div>

              <div style={{
                position:   "absolute",
                bottom:      0,
                left:        0,
                right:       0,
                height:      1.5,
                background: `linear-gradient(90deg,transparent,rgba(245,158,11,${.15 + i * .04}),transparent)`,
              }}/>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── §13  FACTS GRID ────────────────────────────────────────────────── */}
      <Section
        id="facts"
        label="CONTEXTUAL INTELLIGENCE"
        bg="#060c1a"
      >
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2
            className="md"
            style={{
              fontSize:       "clamp(28px,4.5vw,54px)",
              fontWeight:     900,
              lineHeight:     .95,
              letterSpacing: "-.015em",
              color:         "#fff",
              margin:         0,
            }}
          >
            STRATEGIC<br/>
            <span style={{ color: "#60a5fa" }}>CONTEXT</span>
          </h2>
        </div>

        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap:                  16,
          }}
        >
          {facts.map((f, i) => (
            <div
              key={i}
              style={{
                position:   "relative",
                padding:    "20px 20px 18px",
                background: "rgba(255,255,255,.02)",
                border:     "1px solid rgba(255,255,255,.06)",
                overflow:   "hidden",
                height:     "100%",
              }}
            >
              <HUDCorners color="#60a5fa" size={11} weight={1.2} offset={5}/>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{
                  flexShrink:  0,
                  marginTop:    2,
                  width:        20,
                  height:       20,
                  background:  "rgba(96,165,250,.12)",
                  border:      "1px solid rgba(96,165,250,.25)",
                  display:     "flex",
                  alignItems:  "center",
                  justifyContent: "center",
                }}>
                  <div style={{ width: 5, height: 5, background: "#60a5fa", borderRadius: "50%" }}/>
                </div>
                <p
                  className="mb"
                  style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,.52)" }}
                >
                  {f.fact}
                </p>
              </div>
              <div style={{
                position:   "absolute",
                bottom:      0,
                left:        0,
                width:      "40%",
                height:      1,
                background: "rgba(96,165,250,.2)",
              }}/>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── §14  QUOTE — full-bleed cinematic ──────────────────────────────── */}
      <div
        className="mk-grain"
        style={{
          position:   "relative",
          minHeight:   400,
          display:    "flex",
          alignItems: "center",
          overflow:   "hidden",
          background: "#000",
        }}
      >
        <div style={{
          position:   "absolute",
          inset:       0,
          zIndex:      1,
          background: "linear-gradient(135deg,#000 0%,rgba(7,12,24,.96) 50%,#000 100%)",
        }}/>
        <HUDGrid/>
        <ScanLine color="rgba(245,158,11,.2)" dur={12}/>
        <GrainOverlay z={30} opacity={.025}/>

        <div style={{
          position:       "relative",
          zIndex:          20,
          maxWidth:        900,
          margin:         "0 auto",
          padding:        "80px 32px",
          textAlign:      "center",
        }}>
          <HUDCorners color="#f59e0b" size={24} weight={2} offset={20}/>

          <div className="md" style={{ fontSize: 8, letterSpacing: ".4em", color: "rgba(245,158,11,.55)", marginBottom: 30 }}>
            ◈ &nbsp; COMMAND AUTHORITY &nbsp; ◈
          </div>

          <blockquote
            className="md"
            style={{
              margin:        0,
              fontSize:      "clamp(20px,3.5vw,40px)",
              fontWeight:    700,
              lineHeight:    1.2,
              letterSpacing: "-.01em",
              color:         "#fff",
              fontStyle:     "normal",
            }}
          >
            &ldquo;{quote.quote}&rdquo;
          </blockquote>

          <div style={{ marginTop: 30, height: 1, width: 80, background: "#f59e0b", margin: "30px auto 0" }}/>

          <div className="md" style={{ marginTop: 20, fontSize: 9, letterSpacing: ".28em", color: "rgba(255,255,255,.38)" }}>
            — {quote.attribution?.toUpperCase()}
          </div>
          {quote.title && (
            <div className="md" style={{ marginTop: 6, fontSize: 8, letterSpacing: ".2em", color: "rgba(255,255,255,.22)" }}>
              {quote.title}
            </div>
          )}
        </div>
      </div>

      {/* ─── §15  CHAPTER NAVIGATION ─────────────────────────────────────────── */}
      <Section
        id="explore"
        label="EXPLORE ALL CHAPTERS"
        bg="#040810"
        amber
      >
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2
            className="md"
            style={{
              fontSize:       "clamp(28px,4.5vw,52px)",
              fontWeight:     900,
              lineHeight:     .95,
              letterSpacing: "-.015em",
              color:         "#fff",
              margin:         0,
            }}
          >
            EXPLORE THE<br/>
            <span style={{ color: "#f59e0b" }}>FULL PICTURE</span>
          </h2>
          <p
            className="mb"
            style={{
              marginTop:  14,
              maxWidth:   480,
              margin:     "14px auto 0",
              fontSize:    14,
              lineHeight:  1.7,
              color:      "rgba(255,255,255,.4)",
            }}
          >
            The military is one dimension of American power. Explore the complete
            system — economy, science, culture, geography, and more.
          </p>
        </div>

        {/* Sub-page nav grid */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
            gap:                  16,
          }}
        >
          {[
            { href: "/military/air-force",     label: "Air Force",          icon: "✈", sub: "Air Supremacy"         },
            { href: "/military/navy",           label: "Navy",               icon: "⚓", sub: "Sea Control"           },
            { href: "/military/army",           label: "Army",               icon: "🎖", sub: "Land Dominance"        },
            { href: "/military/space-force",    label: "Space Force",        icon: "🛰", sub: "Orbital Domain"        },
            { href: "/military/cyber",          label: "Cyber Command",      icon: "⚡", sub: "Digital Warfare"       },
            { href: "/military/special-ops",    label: "Special Operations", icon: "◈",  sub: "Tier One Forces"       },
            { href: "/military/nuclear",        label: "Nuclear Arsenal",    icon: "☢", sub: "Strategic Deterrence"  },
            { href: "/military/ai-autonomous",  label: "AI & Autonomous",    icon: "🤖", sub: "Next-Gen Systems"      },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ textDecoration: "none" }}
            >
              <div
                className="mil-nav-card"
                style={{
                  position:       "relative",
                  padding:        "22px 18px",
                  background:     "rgba(255,255,255,.02)",
                  border:         "1px solid rgba(255,255,255,.06)",
                  cursor:         "pointer",
                  overflow:       "hidden",
                  height:         "100%",
                  display:        "flex",
                  flexDirection:  "column",
                }}
              >
                <HUDCorners color="#f59e0b" size={10} weight={1} offset={5}/>

                <div style={{ fontSize: 22, marginBottom: 10 }}>{item.icon}</div>
                <div
                  className="md"
                  style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: ".1em" }}
                >
                  {item.label}
                </div>
                <div
                  className="md"
                  style={{ marginTop: 4, fontSize: 8, letterSpacing: ".18em", color: "rgba(255,255,255,.35)", flexGrow: 1 }}
                >
                  {item.sub}
                </div>

                <div
                  className="md"
                  style={{
                    position:      "absolute",
                    bottom:         14,
                    right:          14,
                    fontSize:       9,
                    letterSpacing: ".15em",
                    color:         "rgba(245,158,11,.55)",
                  }}
                >
                  ENTER →
                </div>

                <div style={{
                  position:   "absolute",
                  bottom:      0,
                  left:        0,
                  right:       0,
                  height:      1.5,
                  background: "linear-gradient(90deg,transparent,rgba(245,158,11,.25),transparent)",
                }}/>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom classification strip */}
        <div style={{
          marginTop:     56,
          paddingTop:    24,
          borderTop:     "1px solid rgba(255,255,255,.04)",
          display:       "flex",
          alignItems:    "center",
          justifyContent:"center",
          gap:            14,
        }}>
          <div style={{ height: 1, width: 60, background: "linear-gradient(90deg,transparent,rgba(245,158,11,.35))" }}/>
          <span
            className="md mk-blink"
            style={{ fontSize: 8, letterSpacing: ".38em", color: "rgba(245,158,11,.38)" }}
          >
            ◈ &nbsp; AMERICA: THE GREATEST NATION &nbsp; · &nbsp; ALL RIGHTS RESERVED &nbsp; ◈
          </span>
          <div style={{ height: 1, width: 60, background: "linear-gradient(90deg,rgba(245,158,11,.35),transparent)" }}/>
        </div>
      </Section>
    </div>
  );
}
