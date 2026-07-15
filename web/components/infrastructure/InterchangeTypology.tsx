"use client";

// ─── InterchangeTypology ──────────────────────────────────────────────────────
// An illustrated field guide to the four interchange forms that stitch the
// Interstate grid together. Each is drawn top-down as ribbon roads with animated
// directional traffic and grade-separated crossings. Selecting a form enlarges
// it and reveals its engineering spec, footprint, and a landmark example.

import { useState } from "react";

type Id = "diamond" | "cloverleaf" | "stack" | "spui";
type Loc = "en" | "ro";

const GOLD = "#E8B923";
const STEEL = "#475569"; // Sleeker dark-slate grey
const RAMP = "#d4af37";
const CASING = "#000000"; // Pitch black road base casing
const FLOW = "#ffffff"; // Pure white glowing flow dashes

function Ribbon({ d, color, w, flow, glowId }: { d: string; color: string; w: number; flow?: boolean; glowId?: string }) {
  return (
    <>
      <path d={d} fill="none" stroke={CASING} strokeWidth={w + 5} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
      {flow && (
        <path
          d={d}
          fill="none"
          stroke={FLOW}
          strokeWidth={Math.max(1.4, w * 0.22)}
          strokeDasharray="3 14"
          strokeLinecap="round"
          opacity={0.95}
          filter={glowId ? `url(#${glowId})` : undefined}
          style={{ animation: "ix-flow 1.2s linear infinite" }}
        />
      )}
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
    since: string;
  };
  diagram: (uid: string) => React.ReactNode;
}

const KINDS: Kind[] = [
  {
    id: "diamond",
    name: { en: "Diamond", ro: "Diamant" },
    tag: { en: "The workhorse", ro: "Calul de povară" },
    desc: {
      en: "Four short ramps peel off the freeway and meet the cross street at grade, where a stop or signal handles the turns. Cheap, compact, and by far the most common junction on the system.",
      ro: "Patru bretele scurte se desprind din autostradă și întâlnesc drumul secundar la nivel, unde un stop sau un semafor gestionează virajele. Ieftin, compact și de departe cel mai frecvent nod din sistem.",
    },
    example: {
      en: "Standard on rural and suburban Interstates nationwide.",
      ro: "Standard pe autostrăzile rurale și suburbane din toată țara.",
    },
    footprint: 1,
    spec: {
      footprint: { en: "Small", ro: "Mică" },
      levels: "2",
      signals: { en: "Yes", ro: "Da" },
      since: "1930s",
    },
    diagram: (uid) => (
      <>
        <Ribbon d="M110 8 V212" color={STEEL} w={12} flow glowId={`glow-steel-${uid}`} />
        <Ribbon d="M58 110 Q70 70 110 58" color={RAMP} w={4.5} flow glowId={`glow-gold-${uid}`} />
        <Ribbon d="M110 58 Q150 70 162 110" color={RAMP} w={4.5} flow glowId={`glow-gold-${uid}`} />
        <Ribbon d="M162 110 Q150 150 110 162" color={RAMP} w={4.5} flow glowId={`glow-gold-${uid}`} />
        <Ribbon d="M110 162 Q70 150 58 110" color={RAMP} w={4.5} flow glowId={`glow-gold-${uid}`} />
        <Ribbon d="M8 110 H212" color={GOLD} w={14} flow glowId={`glow-gold-${uid}`} />
      </>
    ),
  },
  {
    id: "cloverleaf",
    name: { en: "Cloverleaf", ro: "Treflă" },
    tag: { en: "The first free-flow", ro: "Primul flux continuu" },
    desc: {
      en: "Four looping ramps turn every left without a single stoplight. The catch is weaving: traffic entering and exiting must trade places on the same short stretch, which chokes at high volume.",
      ro: "Patru bretele în buclă rezolvă fiecare viraj la stânga fără niciun semafor. Neajunsul este întrețeserea: traficul care intră și cel care iese fac schimb de locuri pe aceeași porțiune scurtă, ceea ce se blochează la volume mari.",
    },
    example: {
      en: "First built at Woodbridge, New Jersey, in 1928.",
      ro: "Prima construită la Woodbridge, New Jersey, in 1928.",
    },
    footprint: 3.4,
    spec: {
      footprint: { en: "Large", ro: "Mare" },
      levels: "2",
      signals: { en: "None", ro: "Niciun" },
      since: "1928",
    },
    diagram: (uid) => (
      <>
        {[
          [76, 76],
          [144, 76],
          [76, 144],
          [144, 144],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r={25} fill="none" stroke={CASING} strokeWidth={9.5} />
            <circle cx={cx} cy={cy} r={25} fill="none" stroke={RAMP} strokeWidth={4.5} />
            <circle
              cx={cx}
              cy={cy}
              r={25}
              fill="none"
              stroke={FLOW}
              strokeWidth={1.5}
              strokeDasharray="2 12"
              filter={`url(#glow-gold-${uid})`}
              style={{ animation: "ix-flow 1.5s linear infinite" }}
            />
          </g>
        ))}
        <Ribbon d="M110 8 V212" color={STEEL} w={12} flow glowId={`glow-steel-${uid}`} />
        <Ribbon d="M8 110 H212" color={GOLD} w={14} flow glowId={`glow-gold-${uid}`} />
      </>
    ),
  },
  {
    id: "stack",
    name: { en: "Stack", ro: "Suprapus" },
    tag: { en: "The interchange king", ro: "Regele nodurilor" },
    desc: {
      en: "Freeway meets freeway. Sweeping flyover ramps carry every movement at full speed with no weaving and no signals, stacked four or five levels high. The fastest form to drive and the costliest to build.",
      ro: "Autostradă peste autostradă. Bretele largi, suspendate, preiau fiecare mișcare la viteză maximă, fără întrețesere și fără semafoare, suprapuse pe patru sau cinci niveluri. Cea mai rapidă formă de condus și cea mai scumpă de construit.",
    },
    example: {
      en: "The Judge Harry Pregerson Interchange, Los Angeles — five levels.",
      ro: "Nodul Judge Harry Pregerson, Los Angeles — cinci niveluri.",
    },
    footprint: 4,
    spec: {
      footprint: { en: "Very large", ro: "Foarte mare" },
      levels: "4–5",
      signals: { en: "None", ro: "Niciun" },
      since: "1949",
    },
    diagram: (uid) => (
      <>
        <Ribbon d="M110 8 V212" color="#b98f2a" w={12} flow glowId={`glow-steel-${uid}`} />
        <Ribbon d="M164 92 C128 92 120 84 120 50" color={RAMP} w={4.5} flow glowId={`glow-gold-${uid}`} />
        <Ribbon d="M92 50 C92 84 84 92 50 92" color={RAMP} w={4.5} flow glowId={`glow-gold-${uid}`} />
        <Ribbon d="M56 128 C84 128 92 136 92 170" color={RAMP} w={4.5} flow glowId={`glow-gold-${uid}`} />
        <Ribbon d="M128 170 C128 136 136 128 164 128" color={RAMP} w={4.5} flow glowId={`glow-gold-${uid}`} />
        <Ribbon d="M8 110 H212" color={GOLD} w={14} flow glowId={`glow-gold-${uid}`} />
      </>
    ),
  },
  {
    id: "spui",
    name: { en: "Single-Point Urban", ro: "Urban cu Punct Unic" },
    tag: { en: "The city solution", ro: "Soluția urbană" },
    desc: {
      en: "Every ramp converges on a single signalized point beneath the freeway, so all left turns clear on one traffic phase. It moves diamond-level traffic in a fraction of the land a cloverleaf demands.",
      ro: "Fiecare breteă converge într-un singur punct cu semafor, sub autostradă, astfel încât toate virajele la stânga se eliberează într-o singură fază. Preia trafic cât un diamant pe o fracțiune din terenul cerut de o treflă.",
    },
    example: {
      en: "A staple of dense suburban corridors since the 1970s.",
      ro: "Un element de bază al coridoarelor suburbane dense din anii 1970.",
    },
    footprint: 1.3,
    spec: {
      footprint: { en: "Compact", ro: "Compactă" },
      levels: "2",
      signals: { en: "One", ro: "Unul" },
      since: "1970s",
    },
    diagram: (uid) => (
      <>
        <Ribbon d="M8 110 H212" color={GOLD} w={14} flow glowId={`glow-gold-${uid}`} />
        <Ribbon d="M172 124 C142 124 126 114 110 110" color={RAMP} w={4.5} flow glowId={`glow-gold-${uid}`} />
        <Ribbon d="M48 124 C78 124 94 114 110 110" color={RAMP} w={4.5} flow glowId={`glow-gold-${uid}`} />
        <Ribbon d="M172 96 C142 96 126 106 110 110" color={RAMP} w={4.5} flow glowId={`glow-gold-${uid}`} />
        <Ribbon d="M48 96 C78 96 94 106 110 110" color={RAMP} w={4.5} flow glowId={`glow-gold-${uid}`} />
        <Ribbon d="M110 8 V212" color={STEEL} w={12} flow glowId={`glow-steel-${uid}`} />
        <circle cx={110} cy={110} r={7} fill="#fff" stroke={GOLD} strokeWidth={3} />
        <circle cx={110} cy={110} r={2.5} fill={GOLD} />
      </>
    ),
  },
];

function Diagram({ uid, children }: { uid: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 220 220" className="h-auto w-full select-none">
      <defs>
        <pattern id={`ixgrid-${uid}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
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
      </defs>
      {/* Blueprint background grid */}
      <rect x="0" y="0" width="220" height="220" fill="rgba(6,8,12,0.6)" />
      <rect x="0" y="0" width="220" height="220" fill={`url(#ixgrid-${uid})`} />
      
      {/* Sleek blueprint frame */}
      <rect x="2" y="2" width="216" height="216" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.2" rx="12" />
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
    [locale === "ro" ? "Din" : "Since", active.spec.since],
  ];

  return (
    <div className="w-full">
      <style>{`@keyframes ix-flow { to { stroke-dashoffset: -17; } }`}</style>
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

          {/* Spec readout dashboard */}
          <div className="grid grid-cols-4 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08]">
            {specRows.map(([label, value]) => (
              <div key={label} className="bg-[#050505] px-3 py-4 text-center">
                <div className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-white/35">
                  {label}
                </div>
                <div className="mt-1.5 font-macro-display text-base font-bold text-[#E8B923]">{value}</div>
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
