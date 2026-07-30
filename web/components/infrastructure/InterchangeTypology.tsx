"use client";

// ─── InterchangeTypology ──────────────────────────────────────────────────────
// An illustrated field guide to the four interchange forms that stitch the
// Interstate grid together. Each is drawn top-down as ribbon roads with animated
// directional traffic and grade-separated crossings. Selecting a form enlarges
// it and reveals its engineering spec, footprint, and a landmark example.

import { useState } from "react";

type Id = "diamond" | "cloverleaf" | "stack" | "spui" | "trumpet" | "ddi";
type Loc = "en" | "ro";

const GOLD = "#E8B923";
const STEEL = "#475569"; // Sleeker dark-slate grey
const CASING = "#000000"; // Pitch black road base casing
const FLOW = "#ffffff"; // Pure white glowing flow dashes

const ASPHALT_FREEWAY = "#1c1c21"; // Dark charcoal asphalt for freeway
const ASPHALT_CROSS = "#27272c"; // Slightly lighter dark asphalt for crossroad
const ASPHALT_RAMP = "#131316"; // Darkest asphalt for ramps

function Ribbon({
  d,
  color,
  w,
  hasShadow = false,
  shadowOffset = 3,
}: {
  d: string;
  color: string;
  w: number;
  hasShadow?: boolean;
  shadowOffset?: number;
}) {
  return (
    <>
      {/* 0. High-performance drop shadow path */}
      {hasShadow && (
        <path
          d={d}
          fill="none"
          stroke="rgba(0,0,0,0.55)"
          strokeWidth={w + 5.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`translate(0, ${shadowOffset})`}
        />
      )}

      {/* 1. Road bed casing (outer outline) */}
      <path d={d} fill="none" stroke={CASING} strokeWidth={w + 3} strokeLinecap="round" strokeLinejoin="round" />
      
      {/* 1.5 Concrete side barrier rails (bridges/guardrails) */}
      <path d={d} fill="none" stroke="#52525b" strokeWidth={w + 1.4} strokeLinecap="round" strokeLinejoin="round" />

      {/* 2. Concrete shoulder lines (thin border edges) */}
      <path d={d} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={w + 0.6} strokeLinecap="round" strokeLinejoin="round" />
      
      {/* 3. Asphalt road surface */}
      <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function DoubleYellow({ d, bg }: { d: string; bg: string }) {
  return (
    <>
      <path d={d} fill="none" stroke="#eab308" strokeWidth={2.0} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={bg} strokeWidth={0.6} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function FlowLine({ d, glowId }: { d: string; glowId?: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={FLOW}
      strokeWidth={1.3}
      strokeDasharray="3 17"
      strokeLinecap="round"
      filter={glowId ? `url(#${glowId})` : undefined}
      style={{ animation: "ix-flow 1.2s linear infinite" }}
    />
  );
}

function RouteLabel({ x, y, src }: { x: number; y: number; src: string }) {
  return (
    <image
      href={src}
      x={x - 9}
      y={y - 9}
      width={18}
      height={18}
      pointerEvents="none"
    />
  );
}

function Streetlight({ cx, cy, uid }: { cx: number; cy: number; uid: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={10} fill={`url(#light-glow-${uid})`} opacity={0.35} pointerEvents="none" />
      <circle cx={cx} cy={cy} r={1.2} fill="#fff" pointerEvents="none" />
    </g>
  );
}

function LandscapeLawn({ d }: { d: string }) {
  return (
    <path
      d={d}
      fill="rgba(34,197,94,0.02)"
      stroke="rgba(34,197,94,0.07)"
      strokeWidth={0.8}
      strokeDasharray="2 3"
      pointerEvents="none"
    />
  );
}

function JerseyBarrier({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#71717a" strokeWidth={1.5} strokeLinecap="round" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#a1a1aa" strokeWidth={0.5} strokeLinecap="round" />
    </>
  );
}

interface Kind {
  id: Id;
  name: { en: string; ro: string };
  tag: { en: string; ro: string };
  desc: { en: string; ro: string };
  example: { en: string; ro: string };
  footprint: number; // relative land area, for the comparison bar
  spec: {
    footprint: { en: string; ro: string };
    levels: string;
    signals: { en: string; ro: string };
    capacity: { en: string; ro: string };
    conflict: { en: string; ro: string };
    since: string;
  };
  diagram: (uid: string) => React.ReactNode;
}

const KINDS: Kind[] = [
  {
    id: "diamond",
    name: { en: "Diamond", ro: "Diamant" },
    tag: { en: "The Ubiquitous Workhorse", ro: "Calul de povară universal" },
    desc: {
      en: "The baseline standard of American highway design. Four direct ramps connect the freeway to a secondary road at a single grade-separated bridge. While highly cost-effective and space-efficient, it introduces conflict points where ramp traffic meets the crossroad via stop signs or traffic signals.",
      ro: "Standardul de bază al designului rutier american. Patru bretele directe conectează autostrada de un drum secundar printr-un singur pod denivelat. Deși este extrem de eficient ca cost și spațiu, introduce puncte de conflict acolo unde bretelele întâlnesc drumul secundar prin semafoare sau indicatoare.",
    },
    example: {
      en: "The default design for thousands of rural exits and suburban crossings across the Interstate network.",
      ro: "Designul implicit pentru mii de ieșiri rurale și intersecții suburbane din întreaga rețea de autostrăzi.",
    },
    footprint: 1,
    spec: {
      footprint: { en: "Small", ro: "Mică" },
      levels: "2",
      signals: { en: "Yes", ro: "Da" },
      capacity: { en: "Low (~1,500/hr)", ro: "Redusă (~1.500/h)" },
      conflict: { en: "26 points", ro: "26 puncte" },
      since: "1930s",
    },
    diagram: (uid) => (
      <>
        {/* Landscape Grass Fields */}
        <LandscapeLawn d="M 15 15 H 100 V 50 Q 65 65 50 100 H 15 Z" />
        <LandscapeLawn d="M 205 15 H 120 V 50 Q 155 65 170 100 H 205 Z" />
        <LandscapeLawn d="M 205 205 H 120 V 170 Q 155 155 170 120 H 205 Z" />
        <LandscapeLawn d="M 15 205 H 100 V 170 Q 65 155 50 120 H 15 Z" />

        {/* Level 1: Freeway (Horizontal, at grade) */}
        <Ribbon d="M8 106 H212" color={ASPHALT_FREEWAY} w={6} />
        <Ribbon d="M8 114 H212" color={ASPHALT_FREEWAY} w={6} />
        <JerseyBarrier x1={8} y1={110} x2={212} y2={110} />
        <FlowLine d="M212 106 H8" glowId={`glow-gold-${uid}`} />
        <FlowLine d="M8 114 H212" glowId={`glow-gold-${uid}`} />
        
        {/* Level 1.5: Ramps */}
        <Ribbon d="M 170 106 H 155 Q 130 80 110 58" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 170 106 H 155 Q 130 80 110 58" glowId={`glow-gold-${uid}`} />

        <Ribbon d="M 110 58 Q 90 80 65 106 H 50" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 110 58 Q 90 80 65 106 H 50" glowId={`glow-gold-${uid}`} />

        <Ribbon d="M 50 114 H 65 Q 90 140 110 162" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 50 114 H 65 Q 90 140 110 162" glowId={`glow-gold-${uid}`} />

        <Ribbon d="M 110 162 Q 130 140 155 114 H 170" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 110 162 Q 130 140 155 114 H 170" glowId={`glow-gold-${uid}`} />
        
        {/* Level 2: Crossroad (Vertical, crosses OVER freeway) - casts shadow */}
        <Ribbon d="M110 8 V212" color={ASPHALT_CROSS} w={12} hasShadow shadowOffset={2.5} />
        <DoubleYellow d="M110 8 V212" bg={ASPHALT_CROSS} />
        <FlowLine d="M106.5 8 V212" glowId={`glow-steel-${uid}`} />
        <FlowLine d="M113.5 212 V8" glowId={`glow-steel-${uid}`} />

        {/* Bridge expansion joints (On the vertical crossroad overpass bridge deck) */}
        <line x1={104} y1={96} x2={116} y2={96} stroke="#a1a1aa" strokeWidth={1} />
        <line x1={104} y1={124} x2={116} y2={124} stroke="#a1a1aa" strokeWidth={1} />

        {/* Traffic signal lights at ramp terminals */}
        <circle cx={110} cy={58} r={2.2} fill="#ef4444" stroke="#000" strokeWidth={0.5} filter={`url(#glow-gold-${uid})`} />
        <circle cx={110} cy={162} r={2.2} fill="#22c55e" stroke="#000" strokeWidth={0.5} filter={`url(#glow-gold-${uid})`} />

        {/* High-mast streetlights */}
        <Streetlight cx={80} cy={70} uid={uid} />
        <Streetlight cx={140} cy={70} uid={uid} />
        <Streetlight cx={80} cy={150} uid={uid} />
        <Streetlight cx={140} cy={150} uid={uid} />

        {/* Official SVG Highway route labels */}
        <RouteLabel x={18} y={110} src="/interstate-shields/I-90.svg" />
        <RouteLabel x={202} y={110} src="/interstate-shields/I-90.svg" />
        <RouteLabel x={110} y={18} src="/interstate-shields/California_4.svg" />
        <RouteLabel x={110} y={202} src="/interstate-shields/California_4.svg" />
      </>
    ),
  },
  {
    id: "cloverleaf",
    name: { en: "Cloverleaf", ro: "Treflă" },
    tag: { en: "The Pioneer of Free-Flow", ro: "Pionierul fluxului continuu" },
    desc: {
      en: "Invented to eliminate stoplights entirely by using looping ramps for left turns. While groundbreaking in the 1930s, it created a dangerous traffic pattern known as 'weaving', where cars accelerating to enter the highway must cross paths with cars decelerating to exit on the exact same lane.",
      ro: "Inventat pentru a elimina complet semafoarele, folosind bucle la dreapta pentru virajele la stânga. Revoluționar în anii 1930, a creat un model de trafic periculos numit „întrețesere”: unde mașinile care accelerează pentru a intra se încrucișează cu cele care încetinesc pentru a ieși.",
    },
    example: {
      en: "Woodbridge Interchange, NJ (1928): America's first cloverleaf. Now largely phased out on high-volume routes.",
      ro: "Nodul Woodbridge, NJ (1928): prima treflă din America. Acum este eliminată treptat pe rutele cu trafic intens.",
    },
    footprint: 3.4,
    spec: {
      footprint: { en: "Large", ro: "Mare" },
      levels: "2",
      signals: { en: "None", ro: "Niciunul" },
      capacity: { en: "Medium (~2,500/hr)", ro: "Medie (~2.500/h)" },
      conflict: { en: "16 (weaving)", ro: "16 (întrețesere)" },
      since: "1928",
    },
    diagram: (uid) => (
      <>
        {/* Landscape Grass Fields (Outer Corners) */}
        <LandscapeLawn d="M 15 15 H 95 V 50 Q 50 50 50 95 H 15 Z" />
        <LandscapeLawn d="M 205 15 H 125 V 50 Q 170 50 170 95 H 205 Z" />
        <LandscapeLawn d="M 205 205 H 125 V 170 Q 170 170 170 125 H 205 Z" />
        <LandscapeLawn d="M 15 205 H 95 V 170 Q 50 170 50 125 H 15 Z" />

        {/* Grass Fields Inside Loops */}
        {[
          [76, 76],
          [144, 76],
          [76, 144],
          [144, 144],
        ].map(([cx, cy]) => (
          <circle key={`grass-${cx}-${cy}`} cx={cx} cy={cy} r={24} fill="rgba(34,197,94,0.02)" stroke="rgba(34,197,94,0.08)" strokeWidth={0.8} strokeDasharray="2 3" />
        ))}

        {/* Level 1: Crossroad (Vertical, underpass) */}
        <Ribbon d="M110 8 V212" color={ASPHALT_CROSS} w={12} />
        <DoubleYellow d="M110 8 V212" bg={ASPHALT_CROSS} />
        <FlowLine d="M106.5 8 V212" glowId={`glow-steel-${uid}`} />
        <FlowLine d="M113.5 212 V8" glowId={`glow-steel-${uid}`} />

        {/* Level 1: Clover loops passing under */}
        {[
          [76, 76],
          [144, 76],
          [76, 144],
          [144, 144],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r={25} fill="none" stroke={CASING} strokeWidth={7.5} />
            <circle cx={cx} cy={cy} r={25} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={5.5} />
            <circle cx={cx} cy={cy} r={25} fill="none" stroke={ASPHALT_RAMP} strokeWidth={4.5} />
            <circle
              cx={cx}
              cy={cy}
              r={25}
              fill="none"
              stroke={FLOW}
              strokeWidth={1.2}
              strokeDasharray="3 17"
              filter={`url(#glow-gold-${uid})`}
              style={{ animation: "ix-flow 1.2s linear infinite" }}
            />
          </g>
        ))}

        {/* Level 1: Outer straight ramps */}
        <Ribbon d="M 106.5 25 Q 106.5 58 58 106 H 40" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 106.5 25 Q 106.5 58 58 106 H 40" glowId={`glow-gold-${uid}`} />

        <Ribbon d="M 170 106 H 162 Q 113.5 58 113.5 25" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 170 106 H 162 Q 113.5 58 113.5 25" glowId={`glow-gold-${uid}`} />

        <Ribbon d="M 113.5 195 Q 113.5 162 162 114 H 180" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 113.5 195 Q 113.5 162 162 114 H 180" glowId={`glow-gold-${uid}`} />

        <Ribbon d="M 50 114 H 58 Q 106.5 162 106.5 195" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 50 114 H 58 Q 106.5 162 106.5 195" glowId={`glow-gold-${uid}`} />
        
        {/* Level 2: Freeway (Dual Carriageway, OVER crossroad) - casts shadow */}
        <Ribbon d="M8 106 H212" color={ASPHALT_FREEWAY} w={6} hasShadow shadowOffset={2.5} />
        <Ribbon d="M8 114 H212" color={ASPHALT_FREEWAY} w={6} hasShadow shadowOffset={2.5} />
        
        {/* Central concrete Jersey barrier */}
        <JerseyBarrier x1={8} y1={110} x2={212} y2={110} />

        {/* Directional freeway flows */}
        <FlowLine d="M212 106 H8" glowId={`glow-gold-${uid}`} />
        <FlowLine d="M8 114 H212" glowId={`glow-gold-${uid}`} />

        {/* Bridge expansion joints (On the horizontal freeway overpass) */}
        <line x1={96} y1={102} x2={96} y2={118} stroke="#a1a1aa" strokeWidth={1} />
        <line x1={124} y1={102} x2={124} y2={118} stroke="#a1a1aa" strokeWidth={1} />

        {/* Concrete bridge piers underneath */}
        <rect x={102} y={72} width={3} height={8} fill="#3f3f46" rx={0.5} />
        <rect x={115} y={72} width={3} height={8} fill="#3f3f46" rx={0.5} />
        <rect x={102} y={140} width={3} height={8} fill="#3f3f46" rx={0.5} />
        <rect x={115} y={140} width={3} height={8} fill="#3f3f46" rx={0.5} />

        {/* High-mast streetlights inside loop grass */}
        <Streetlight cx={76} cy={76} uid={uid} />
        <Streetlight cx={144} cy={76} uid={uid} />
        <Streetlight cx={76} cy={144} uid={uid} />
        <Streetlight cx={144} cy={144} uid={uid} />

        {/* Official SVG Highway route labels */}
        <RouteLabel x={18} y={110} src="/interstate-shields/I-90.svg" />
        <RouteLabel x={202} y={110} src="/interstate-shields/I-90.svg" />
        <RouteLabel x={110} y={18} src="/interstate-shields/US_1.svg" />
        <RouteLabel x={110} y={202} src="/interstate-shields/US_1.svg" />
      </>
    ),
  },
  {
    id: "stack",
    name: { en: "Stack", ro: "Suprapus" },
    tag: { en: "The Peak of Highway Engineering", ro: "Apogeul ingineriei rutiere" },
    desc: {
      en: "A massive multi-level masterpiece designed for the high-speed junction of two major freeways. By separating every movement onto its own dedicated flyover ramp, it completely eliminates weaving and signal phases, allowing continuous flow at highway speeds, though at immense construction costs.",
      ro: "O capodoperă masivă pe mai multe niveluri, proiectată pentru joncțiunea de mare viteză a două autostrăzi majore. Prin separarea fiecărei mișcări pe propria rampă suspendată dedicată, elimină complet întrețeserea, permițând un flux continuu la viteze de autostradă.",
    },
    example: {
      en: "Judge Harry Pregerson Interchange, LA (1993): A towering 5-level stack handling 350,000 vehicles daily.",
      ro: "Nodul Judge Harry Pregerson, LA (1993): o structură impunătoare pe 5 niveluri ce gestionează 350.000 de vehicule zilnic.",
    },
    footprint: 4,
    spec: {
      footprint: { en: "Very large", ro: "Foarte mare" },
      levels: "4–5",
      signals: { en: "None", ro: "Niciunul" },
      capacity: { en: "High (10,000+/hr)", ro: "Ridicată (10k+/h)" },
      conflict: { en: "0 points", ro: "0 puncte" },
      since: "1949",
    },
    diagram: (uid) => (
      <>
        {/* Landscape Grass Fields */}
        <LandscapeLawn d="M 15 15 H 95 V 45 Q 45 45 45 95 H 15 Z" />
        <LandscapeLawn d="M 205 15 H 125 V 45 Q 175 45 175 95 H 205 Z" />
        <LandscapeLawn d="M 205 205 H 125 V 175 Q 175 175 175 125 H 205 Z" />
        <LandscapeLawn d="M 15 205 H 95 V 175 Q 45 175 45 125 H 15 Z" />

        {/* Level 1: Crossroad (Vertical, base grade) */}
        <Ribbon d="M110 8 V212" color={ASPHALT_CROSS} w={12} />
        <DoubleYellow d="M110 8 V212" bg={ASPHALT_CROSS} />
        <FlowLine d="M106.5 8 V212" glowId={`glow-steel-${uid}`} />
        <FlowLine d="M113.5 212 V8" glowId={`glow-steel-${uid}`} />

        {/* Level 2: Freeway (Dual Carriageway, passes OVER crossroad) - casts shadow */}
        <Ribbon d="M8 106 H212" color={ASPHALT_FREEWAY} w={6} hasShadow shadowOffset={2.0} />
        <Ribbon d="M8 114 H212" color={ASPHALT_FREEWAY} w={6} hasShadow shadowOffset={2.0} />
        
        {/* Central concrete Jersey barrier */}
        <JerseyBarrier x1={8} y1={110} x2={212} y2={110} />

        {/* Directional freeway flows */}
        <FlowLine d="M212 106 H8" glowId={`glow-gold-${uid}`} />
        <FlowLine d="M8 114 H212" glowId={`glow-gold-${uid}`} />

        {/* Bridge expansion joints */}
        <line x1={96} y1={102} x2={96} y2={118} stroke="#a1a1aa" strokeWidth={1} />
        <line x1={124} y1={102} x2={124} y2={118} stroke="#a1a1aa" strokeWidth={1} />

        {/* Level 3: Lower flyovers - cast shadow on Level 2 freeway */}
        <Ribbon d="M 106.5 50 C 106.5 90 125 114 170 114" color={ASPHALT_RAMP} w={4.5} hasShadow shadowOffset={3.8} />
        <FlowLine d="M 106.5 50 C 106.5 90 125 114 170 114" glowId={`glow-gold-${uid}`} />

        <Ribbon d="M 113.5 170 C 113.5 130 95 106 50 106" color={ASPHALT_RAMP} w={4.5} hasShadow shadowOffset={3.8} />
        <FlowLine d="M 113.5 170 C 113.5 130 95 106 50 106" glowId={`glow-gold-${uid}`} />

        {/* Level 4: Upper flyovers - cast shadow on Level 3 and below */}
        <Ribbon d="M 50 114 C 90 114 113.5 90 113.5 50" color={ASPHALT_RAMP} w={4.5} hasShadow shadowOffset={5.5} />
        <FlowLine d="M 50 114 C 90 114 113.5 90 113.5 50" glowId={`glow-gold-${uid}`} />

        <Ribbon d="M 170 106 C 130 106 106.5 130 106.5 170" color={ASPHALT_RAMP} w={4.5} hasShadow shadowOffset={5.5} />
        <FlowLine d="M 170 106 C 130 106 106.5 130 106.5 170" glowId={`glow-gold-${uid}`} />

        {/* Structural bridge columns */}
        <circle cx={100} cy={100} r={2} fill="#52525b" stroke="#000" strokeWidth={0.5} />
        <circle cx={120} cy={100} r={2} fill="#52525b" stroke="#000" strokeWidth={0.5} />
        <circle cx={100} cy={120} r={2} fill="#52525b" stroke="#000" strokeWidth={0.5} />
        <circle cx={120} cy={120} r={2} fill="#52525b" stroke="#000" strokeWidth={0.5} />

        {/* High-mast streetlights */}
        <Streetlight cx={75} cy={75} uid={uid} />
        <Streetlight cx={145} cy={75} uid={uid} />
        <Streetlight cx={75} cy={145} uid={uid} />
        <Streetlight cx={145} cy={145} uid={uid} />

        {/* Official SVG Highway route labels */}
        <RouteLabel x={18} y={110} src="/interstate-shields/I-95.svg" />
        <RouteLabel x={202} y={110} src="/interstate-shields/I-95.svg" />
        <RouteLabel x={110} y={18} src="/interstate-shields/I-10.svg" />
        <RouteLabel x={110} y={202} src="/interstate-shields/I-10.svg" />
      </>
    ),
  },
  {
    id: "spui",
    name: { en: "Single-Point Urban", ro: "SPUI - Punct Unic" },
    tag: { en: "The Urban Space Saver", ro: "Soluția de eficiență urbană" },
    desc: {
      en: "A modern design optimizing flow in dense urban areas. By aligning all left-turn movements to converge at a single, centralized traffic signal directly beneath or above the freeway, it allows simultaneous left turns, moving massive traffic volumes within a tiny right-of-way.",
      ro: "Un design modern ce optimizează fluxul în zonele urbane dense. Prin alinierea tuturor virajelor la stânga într-un singur semafor centralizat aflat sub sau deasupra autostrăzii, permite viraje simultane pe o suprafață minimă de teren.",
    },
    example: {
      en: "First built in Clearwater, Florida (1974). A staple of dense suburban commercial corridors.",
      ro: "Construit prima dată în Clearwater, Florida (1974). Un element de bază în coridoarele comerciale suburbane dense.",
    },
    footprint: 1.3,
    spec: {
      footprint: { en: "Compact", ro: "Compactă" },
      levels: "2",
      signals: { en: "One (Central)", ro: "Unul (Central)" },
      capacity: { en: "Medium (~4,000/hr)", ro: "Medie (~4.000/h)" },
      conflict: { en: "24 points", ro: "24 puncte" },
      since: "1970s",
    },
    diagram: (uid) => (
      <>
        {/* Landscape Grass Fields */}
        <LandscapeLawn d="M 15 15 H 95 V 90 Q 75 92 48 96 H 15 Z" />
        <LandscapeLawn d="M 205 15 H 125 V 90 Q 145 92 172 96 H 205 Z" />
        <LandscapeLawn d="M 205 205 H 125 V 130 Q 145 128 172 124 H 205 Z" />
        <LandscapeLawn d="M 15 205 H 95 V 130 Q 75 128 48 124 H 15 Z" />

        {/* Level 1: Freeway (Horizontal, at grade) */}
        <Ribbon d="M8 106 H212" color={ASPHALT_FREEWAY} w={6} />
        <Ribbon d="M8 114 H212" color={ASPHALT_FREEWAY} w={6} />
        <JerseyBarrier x1={8} y1={110} x2={212} y2={110} />
        <FlowLine d="M212 106 H8" glowId={`glow-gold-${uid}`} />
        <FlowLine d="M8 114 H212" glowId={`glow-gold-${uid}`} />

        {/* Level 1.5: Ramps */}
        <Ribbon d="M 172 106 C 142 106 126 108 110 110" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 172 106 C 142 106 126 108 110 110" glowId={`glow-gold-${uid}`} />

        <Ribbon d="M 48 114 C 78 114 94 112 110 110" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 48 114 C 78 114 94 112 110 110" glowId={`glow-gold-${uid}`} />

        <Ribbon d="M 110 110 C 126 112 142 114 172 114" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 110 110 C 126 112 142 114 172 114" glowId={`glow-gold-${uid}`} />

        <Ribbon d="M 110 110 C 94 108 78 106 48 106" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 110 110 C 94 108 78 106 48 106" glowId={`glow-gold-${uid}`} />
        
        {/* Level 2: Crossroad (Vertical, crosses OVER freeway on wide bridge deck) - casts shadow */}
        <Ribbon d="M110 8 V212" color={ASPHALT_CROSS} w={12} hasShadow shadowOffset={2.5} />
        <DoubleYellow d="M110 8 V212" bg={ASPHALT_CROSS} />
        <FlowLine d="M106.5 8 V212" glowId={`glow-steel-${uid}`} />
        <FlowLine d="M113.5 212 V8" glowId={`glow-steel-${uid}`} />

        {/* Bridge expansion joints (On wide SPUI bridge deck) */}
        <line x1={104} y1={86} x2={116} y2={86} stroke="#a1a1aa" strokeWidth={1} />
        <line x1={104} y1={134} x2={116} y2={134} stroke="#a1a1aa" strokeWidth={1} />

        {/* Central controller box signal (Single Point on bridge deck) */}
        <circle cx={110} cy={110} r={7} fill="#fff" stroke={GOLD} strokeWidth={3} filter={`url(#glow-gold-${uid})`} />
        <circle cx={110} cy={110} r={2.5} fill={GOLD} />

        {/* High-mast streetlights */}
        <Streetlight cx={75} cy={110} uid={uid} />
        <Streetlight cx={145} cy={110} uid={uid} />
        <Streetlight cx={110} cy={75} uid={uid} />
        <Streetlight cx={110} cy={145} uid={uid} />

        {/* Official SVG Highway route labels */}
        <RouteLabel x={18} y={110} src="/interstate-shields/I-70.svg" />
        <RouteLabel x={202} y={110} src="/interstate-shields/I-70.svg" />
        <RouteLabel x={110} y={18} src="/interstate-shields/California_9.svg" />
        <RouteLabel x={110} y={202} src="/interstate-shields/California_9.svg" />
      </>
    ),
  },
  {
    id: "trumpet",
    name: { en: "Trumpet", ro: "Trompetă" },
    tag: { en: "The Three-Way Flow Optimizer", ro: "Optimizatorul de flux cu 3 direcții" },
    desc: {
      en: "Designed specifically for three-way junctions where one highway terminates at another. By wrapping the turning traffic into a loop ramp and a matching semi-directional curve, it allows completely free-flowing movements in all directions without traffic signals. Commonly used for toll roads, parkway endings, and high-volume T-junctions.",
      ro: "Proiectat special pentru intersecții cu trei direcții unde o autostradă se termină în alta. Prin ghidarea traficului într-o rampă în buclă și o curbă semi-direcțională, permite flux continuu în toate direcțiile fără semafoare.",
    },
    example: {
      en: "The termination of the New York State Thruway (I-87) at local turnpikes and parkways.",
      ro: "Terminarea autostrăzii New York State Thruway (I-87) la intersecțiile cu drumurile expres locale.",
    },
    footprint: 2.1,
    spec: {
      footprint: { en: "Medium", ro: "Medie" },
      levels: "2",
      signals: { en: "None", ro: "Niciunul" },
      capacity: { en: "High (~3,500/hr)", ro: "Ridicată (~3.500/h)" },
      conflict: { en: "4 points", ro: "4 puncte" },
      since: "1930s",
    },
    diagram: (uid) => (
      <>
        {/* Landscape Grass Fields */}
        <LandscapeLawn d="M 15 15 H 95 V 65 Q 50 76 15 95 Z" />
        <LandscapeLawn d="M 205 15 H 125 V 65 Q 160 90 205 95 Z" />
        <LandscapeLawn d="M 205 205 H 125 V 170 Q 155 155 170 120 H 205 Z" />
        <LandscapeLawn d="M 15 205 H 95 V 170 Q 65 155 50 120 H 15 Z" />

        {/* Level 1: Crossroad (Vertical, terminates at freeway) */}
        <Ribbon d="M110 110 V212" color={ASPHALT_CROSS} w={12} />
        <DoubleYellow d="M110 110 V212" bg={ASPHALT_CROSS} />
        <FlowLine d="M106.5 110 V212" glowId={`glow-steel-${uid}`} />
        <FlowLine d="M113.5 212 V110" glowId={`glow-steel-${uid}`} />

        {/* Level 1: Ramps at grade */}
        {/* Direct right turn (northbound to eastbound) */}
        <Ribbon d="M 113.5 160 Q 113.5 114 135 114 H 170" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 113.5 160 Q 113.5 114 135 114 H 170" glowId={`glow-gold-${uid}`} />

        {/* Direct right turn (westbound to southbound) */}
        <Ribbon d="M 125 106 Q 106.5 106 106.5 150" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 125 106 Q 106.5 106 106.5 150" glowId={`glow-gold-${uid}`} />

        {/* Semi-directional left turn (eastbound to southbound) */}
        <Ribbon d="M 50 114 H 65 Q 106.5 114 106.5 160" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 50 114 H 65 Q 106.5 114 106.5 160" glowId={`glow-gold-${uid}`} />

        {/* Level 2: Freeway (Dual Carriageway, crosses OVER crossroad) - casts shadow */}
        <Ribbon d="M8 106 H212" color={ASPHALT_FREEWAY} w={6} hasShadow shadowOffset={2.5} />
        <Ribbon d="M8 114 H212" color={ASPHALT_FREEWAY} w={6} hasShadow shadowOffset={2.5} />
        
        {/* Central concrete Jersey barrier */}
        <JerseyBarrier x1={8} y1={110} x2={212} y2={110} />

        {/* Directional freeway flows */}
        <FlowLine d="M212 106 H8" glowId={`glow-gold-${uid}`} />
        <FlowLine d="M8 114 H212" glowId={`glow-gold-${uid}`} />

        {/* Bridge expansion joints (On horizontal freeway bridge deck) */}
        <line x1={96} y1={102} x2={96} y2={118} stroke="#a1a1aa" strokeWidth={1} />
        <line x1={124} y1={102} x2={124} y2={118} stroke="#a1a1aa" strokeWidth={1} />

        {/* Level 3: Trumpet Loop (Left turn) - flies OVER freeway */}
        <Ribbon d="M 113.5 160 C 135 160 145 140 145 110 C 145 80 120 76 110 76 C 90 76 65 96 50 106" color={ASPHALT_RAMP} w={4.5} hasShadow shadowOffset={4.5} />
        <FlowLine d="M 113.5 160 C 135 160 145 140 145 110 C 145 80 120 76 110 76 C 90 76 65 96 50 106" glowId={`glow-gold-${uid}`} />

        {/* High-mast streetlights */}
        <Streetlight cx={80} cy={70} uid={uid} />
        <Streetlight cx={140} cy={70} uid={uid} />
        <Streetlight cx={80} cy={150} uid={uid} />
        <Streetlight cx={140} cy={150} uid={uid} />

        {/* Official SVG Highway route labels */}
        <RouteLabel x={18} y={110} src="/interstate-shields/I-90.svg" />
        <RouteLabel x={202} y={110} src="/interstate-shields/I-90.svg" />
        <RouteLabel x={110} y={202} src="/interstate-shields/California_4.svg" />
      </>
    ),
  },
  {
    id: "ddi",
    name: { en: "Diverging Diamond", ro: "Diamant Divergent" },
    tag: { en: "The Modern Crossover Safety Standard", ro: "Standardul modern de siguranță prin încrucișare" },
    desc: {
      en: "A cutting-edge service interchange that crosses opposing directions of crossroad traffic to the opposite side of the road between the ramp terminals. This eliminates the need for left-turning traffic to cross opposing lanes, significantly reducing conflict points and allowing simple two-phase traffic signal cycles that process massive traffic volumes in a compact footprint.",
      ro: "Un nod rutier modern care încrucișează sensurile opuse ale drumului secundar pe partea cealaltă a drumului între bretele. Elimină necesitatea ca virajele la stânga să se intersecteze cu sensul opus, reducând masiv punctele de conflict.",
    },
    example: {
      en: "First U.S. installation in Springfield, MO (2009); now widely adopted for congested suburban Interstate exits.",
      ro: "Prima instalare în SUA la Springfield, MO (2009); acum este adoptat pe scară largă pentru ieșirile suburbane aglomerate.",
    },
    footprint: 1.2,
    spec: {
      footprint: { en: "Compact", ro: "Compactă" },
      levels: "2",
      signals: { en: "Two (Crossovers)", ro: "Două (Încrucișări)" },
      capacity: { en: "Very High (~5,000/hr)", ro: "Very High (~5.000/h)" },
      conflict: { en: "14 points", ro: "14 puncte" },
      since: "2009 (US)",
    },
    diagram: (uid) => (
      <>
        {/* Landscape Grass Fields */}
        <LandscapeLawn d="M 15 15 H 95 V 65 Q 50 76 15 95 Z" />
        <LandscapeLawn d="M 205 15 H 125 V 65 Q 160 90 205 95 Z" />
        <LandscapeLawn d="M 205 205 H 125 V 155 Q 160 140 205 125 Z" />
        <LandscapeLawn d="M 15 205 H 95 V 155 Q 50 140 15 125 Z" />

        {/* Level 1: Crossroad Crossover paths (Vertical with crossover layout, passes UNDER freeway) */}
        {/* Northbound (crosses to left in center) */}
        <Ribbon d="M 113.5 212 V 155 L 106.5 135 V 85 L 113.5 65 V 8" color={ASPHALT_CROSS} w={6} />
        <FlowLine d="M 113.5 212 V 155 L 106.5 135 V 85 L 113.5 65 V 8" glowId={`glow-steel-${uid}`} />

        {/* Southbound (crosses to right in center) */}
        <Ribbon d="M 106.5 8 V 65 L 113.5 85 V 135 L 106.5 155 V 212" color={ASPHALT_CROSS} w={6} />
        <FlowLine d="M 106.5 8 V 65 L 113.5 85 V 135 L 106.5 155 V 212" glowId={`glow-steel-${uid}`} />

        {/* Level 1: Ramps */}
        {/* Westbound exit (to southbound) */}
        <Ribbon d="M 170 106 H 155 Q 113.5 85 113.5 65" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 170 106 H 155 Q 113.5 85 113.5 65" glowId={`glow-gold-${uid}`} />

        {/* Eastbound exit (to northbound) */}
        <Ribbon d="M 50 114 H 65 Q 106.5 135 106.5 155" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 50 114 H 65 Q 106.5 135 106.5 155" glowId={`glow-gold-${uid}`} />

        {/* Southbound left entry (to eastbound freeway) */}
        <Ribbon d="M 113.5 95 Q 113.5 114 150 114 H 170" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 113.5 95 Q 113.5 114 150 114 H 170" glowId={`glow-gold-${uid}`} />

        {/* Northbound left entry (to westbound freeway) */}
        <Ribbon d="M 106.5 125 Q 106.5 106 70 106 H 50" color={ASPHALT_RAMP} w={4.5} />
        <FlowLine d="M 106.5 125 Q 106.5 106 70 106 H 50" glowId={`glow-gold-${uid}`} />

        {/* Level 2: Freeway (Dual Carriageway, OVER crossroad) - casts shadow */}
        <Ribbon d="M8 106 H212" color={ASPHALT_FREEWAY} w={6} hasShadow shadowOffset={2.5} />
        <Ribbon d="M8 114 H212" color={ASPHALT_FREEWAY} w={6} hasShadow shadowOffset={2.5} />
        
        {/* Central concrete Jersey barrier */}
        <JerseyBarrier x1={8} y1={110} x2={212} y2={110} />

        {/* Directional freeway flows */}
        <FlowLine d="M212 106 H8" glowId={`glow-gold-${uid}`} />
        <FlowLine d="M8 114 H212" glowId={`glow-gold-${uid}`} />

        {/* Bridge expansion joints (On horizontal freeway bridge deck) */}
        <line x1={96} y1={102} x2={96} y2={118} stroke="#a1a1aa" strokeWidth={1} />
        <line x1={124} y1={102} x2={124} y2={118} stroke="#a1a1aa" strokeWidth={1} />

        {/* Crossover signals */}
        <circle cx={110} cy={75} r={2.2} fill="#ef4444" stroke="#000" strokeWidth={0.5} filter={`url(#glow-gold-${uid})`} />
        <circle cx={110} cy={145} r={2.2} fill="#ef4444" stroke="#000" strokeWidth={0.5} filter={`url(#glow-gold-${uid})`} />

        {/* High-mast streetlights */}
        <Streetlight cx={75} cy={110} uid={uid} />
        <Streetlight cx={145} cy={110} uid={uid} />
        <Streetlight cx={110} cy={75} uid={uid} />
        <Streetlight cx={110} cy={145} uid={uid} />

        {/* Official SVG Highway route labels */}
        <RouteLabel x={18} y={110} src="/interstate-shields/I-95.svg" />
        <RouteLabel x={202} y={110} src="/interstate-shields/I-95.svg" />
        <RouteLabel x={110} y={18} src="/interstate-shields/California_9.svg" />
        <RouteLabel x={110} y={202} src="/interstate-shields/California_9.svg" />
      </>
    ),
  },
];

function Diagram({ uid, children }: { uid: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 220 220" className="h-auto w-full select-none">
      <defs>
        <pattern id={`ixgrid-${uid}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        </pattern>
        {/* Glow Filters */}
        <filter id={`glow-gold-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`glow-steel-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Streetlight Radial Glow */}
        <radialGradient id={`light-glow-${uid}`}>
          <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
          <stop offset="25%" stopColor="#eab308" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Blueprint background grid */}
      <rect x="0" y="0" width="220" height="220" fill="rgba(6,8,12,0.6)" rx="12" />
      <rect x="0" y="0" width="220" height="220" fill={`url(#ixgrid-${uid})`} rx="12" />
      
      {/* Blueprint tick marks */}
      <g stroke="rgba(255,255,255,0.15)" strokeWidth="0.8">
        <line x1="20" y1="2" x2="20" y2="6" />
        <line x1="60" y1="2" x2="60" y2="6" />
        <line x1="110" y1="2" x2="110" y2="6" />
        <line x1="160" y1="2" x2="160" y2="6" />
        <line x1="200" y1="2" x2="200" y2="6" />

        <line x1="2" y1="20" x2="6" y2="20" />
        <line x1="2" y1="60" x2="6" y2="60" />
        <line x1="2" y1="110" x2="6" y2="110" />
        <line x1="2" y1="160" x2="6" y2="160" />
        <line x1="2" y1="200" x2="6" y2="200" />
      </g>

      {/* Sleek blueprint frame */}
      <rect x="2" y="2" width="216" height="216" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.2" rx="12" />
      {children}
    </svg>
  );
}

export function InterchangeTypology({ locale }: { locale: Loc }) {
  const [activeId, setActiveId] = useState<Id>("diamond");
  const active = KINDS.find((k) => k.id === activeId)!;
  const maxFoot = Math.max(...KINDS.map((k) => k.footprint));

  const specRows: [string, string][] = [
    [locale === "ro" ? "Teren" : "Footprint", active.spec.footprint[locale]],
    [locale === "ro" ? "Niveluri" : "Levels", active.spec.levels],
    [locale === "ro" ? "Semafoare" : "Signals", active.spec.signals[locale]],
    [locale === "ro" ? "Capacitate" : "Capacity", active.spec.capacity[locale]],
    [locale === "ro" ? "Puncte Conflict" : "Conflict Points", active.spec.conflict[locale]],
    [locale === "ro" ? "Înființat" : "Since", active.spec.since],
  ];

  return (
    <div className="w-full">
      <style>{`@keyframes ix-flow { to { stroke-dashoffset: -20; } }`}</style>
      <div className="grid gap-10 lg:grid-cols-12">
        {/* Featured diagram + narrative */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-10 backdrop-blur-md">
            <div className="absolute left-6 top-6 font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
              {locale === "ro" ? "SCHEMĂ // NOD RUTIER" : "SCHEMATIC // INTERCHANGE DESIGN"}
            </div>
            <div className="absolute right-6 top-6 flex items-center gap-3 font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-white/30">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-3 rounded-full" style={{ background: GOLD }} />
                {locale === "ro" ? "autostradă" : "freeway"}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-3 rounded-full" style={{ background: STEEL }} />
                {locale === "ro" ? "drum" : "cross road"}
              </span>
            </div>
            <div className="mx-auto mt-8 max-w-[340px] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <Diagram uid={active.id}>{active.diagram(active.id)}</Diagram>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-macro-display text-3xl font-bold tracking-tight text-white">
                {active.name[locale]}
              </h3>
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8B923]">
                {active.tag[locale]}
              </span>
            </div>
            <p className="font-sans text-base leading-relaxed text-white/60 mt-4 max-w-2xl">
              {active.desc[locale]}
            </p>
            <p className="mt-4 border-l border-[#E8B923]/60 pl-4 font-sans text-sm italic leading-relaxed text-white/40">
              {active.example[locale]}
            </p>
          </div>
        </div>

        {/* Selector + spec + footprint comparison */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            {KINDS.map((k) => {
              const on = k.id === activeId;
              return (
                <button
                  key={k.id}
                  onClick={() => setActiveId(k.id)}
                  onMouseEnter={() => setActiveId(k.id)}
                  className="group relative rounded-xl border p-4 text-left transition-all duration-300 transform hover:-translate-y-0.5"
                  style={{
                    borderColor: on ? "#E8B923" : "rgba(255,255,255,0.06)",
                    background: on ? "rgba(232,185,35,0.05)" : "rgba(255,255,255,0.015)",
                    boxShadow: on ? "0 10px 25px -5px rgba(232,185,35,0.1)" : "none",
                  }}
                >
                  <div className="mx-auto max-w-[80px] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <Diagram uid={`t-${k.id}`}>{k.diagram(`t-${k.id}`)}</Diagram>
                  </div>
                  <div className="mt-3 font-macro-display text-[14px] font-bold leading-tight text-white transition-colors duration-300 group-hover:text-[#E8B923]">
                    {k.name[locale]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Spec readout dashboard - responsive grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08]">
            {specRows.map(([label, value]) => (
              <div key={label} className="bg-[#050505] px-3 py-4 text-center">
                <div className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-white/35">
                  {label}
                </div>
                <div className="mt-1.5 font-macro-display text-[13px] sm:text-sm font-bold text-[#E8B923]">{value}</div>
              </div>
            ))}
          </div>

          {/* Footprint comparison bar */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.01] p-5 backdrop-blur-sm">
            <div className="mb-4 font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">
              {locale === "ro" ? "Amprenta la sol comparativă" : "Land footprint, compared"}
            </div>
            <div className="space-y-3">
              {KINDS.map((k) => {
                const on = k.id === activeId;
                return (
                  <button
                    key={k.id}
                    onClick={() => setActiveId(k.id)}
                    className="flex w-full items-center gap-3 group/bar"
                  >
                    <span className="w-20 shrink-0 text-left font-sans text-[11px] font-bold uppercase tracking-wider transition-colors duration-300" style={{ color: on ? "#E8B923" : "rgba(255,255,255,0.4)" }}>
                      {k.name[locale]}
                    </span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                      <span
                        className="block h-full rounded-full transition-all duration-500"
                        style={{ width: `${(k.footprint / maxFoot) * 100}%`, background: on ? GOLD : "rgba(255,255,255,0.2)" }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
