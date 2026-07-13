"use client";

// ─── InterchangeTypology ──────────────────────────────────────────────────────
// An illustrated field guide to the four interchange forms that stitch the
// Interstate grid together. Each is drawn top-down as ribbon roads with animated
// directional traffic and grade-separated crossings (the through road is drawn
// over the crossing road, the way a real overpass sits above it). Selecting a
// form enlarges it and reveals its engineering spec, footprint, and a landmark
// example.

import { useState } from "react";

type Id = "diamond" | "cloverleaf" | "stack" | "spui";
type Loc = "en" | "ro";

const GOLD = "#E8B923";
const STEEL = "#7c8896";
const RAMP = "#caa02e";
const CASING = "#050505";
const FLOW = "#fff3c4";

// A road as a ribbon: dark casing under a coloured fill. Optional moving dashes.
function Ribbon({ d, color, w, flow }: { d: string; color: string; w: number; flow?: boolean }) {
  return (
    <>
      <path d={d} fill="none" stroke={CASING} strokeWidth={w + 5} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
      {flow && (
        <path
          d={d}
          fill="none"
          stroke={FLOW}
          strokeWidth={Math.max(1.4, w * 0.24)}
          strokeDasharray="2 13"
          strokeLinecap="round"
          opacity={0.9}
          style={{ animation: "ix-flow 1.5s linear infinite" }}
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
    diagram: () => (
      <>
        <Ribbon d="M110 8 V212" color={STEEL} w={13} />
        {/* four ramps forming the diamond around the crossing */}
        <Ribbon d="M58 110 Q70 70 110 58" color={RAMP} w={5} flow />
        <Ribbon d="M110 58 Q150 70 162 110" color={RAMP} w={5} flow />
        <Ribbon d="M162 110 Q150 150 110 162" color={RAMP} w={5} flow />
        <Ribbon d="M110 162 Q70 150 58 110" color={RAMP} w={5} flow />
        <Ribbon d="M8 110 H212" color={GOLD} w={15} flow />
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
      ro: "Prima construită la Woodbridge, New Jersey, în 1928.",
    },
    footprint: 3.4,
    spec: {
      footprint: { en: "Large", ro: "Mare" },
      levels: "2",
      signals: { en: "None", ro: "Niciun" },
      since: "1928",
    },
    diagram: () => (
      <>
        {/* four loop ramps (pass under the mainlines) */}
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
              style={{ animation: "ix-flow 1.5s linear infinite" }}
            />
          </g>
        ))}
        {/* mainlines cross over the loops */}
        <Ribbon d="M110 8 V212" color={STEEL} w={13} />
        <Ribbon d="M8 110 H212" color={GOLD} w={15} flow />
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
        <Ribbon d="M110 8 V212" color="#b98f2a" w={13} />
        <Ribbon d="M164 92 C128 92 120 84 120 50" color={RAMP} w={5} flow />
        <Ribbon d="M92 50 C92 84 84 92 50 92" color={RAMP} w={5} flow />
        <Ribbon d="M56 128 C84 128 92 136 92 170" color={RAMP} w={5} flow />
        <Ribbon d="M128 170 C128 136 136 128 164 128" color={RAMP} w={5} flow />
        <Ribbon d="M8 110 H212" color={GOLD} w={15} flow />
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
        <Ribbon d="M8 110 H212" color={GOLD} w={15} flow />
        <Ribbon d="M172 124 C142 124 126 114 110 110" color={RAMP} w={5} flow />
        <Ribbon d="M48 124 C78 124 94 114 110 110" color={RAMP} w={5} flow />
        <Ribbon d="M172 96 C142 96 126 106 110 110" color={RAMP} w={5} flow />
        <Ribbon d="M48 96 C78 96 94 106 110 110" color={RAMP} w={5} flow />
        <Ribbon d="M110 8 V212" color={STEEL} w={13} />
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
        <pattern id={`ixgrid-${uid}`} width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M22 0H0V22" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="220" height="220" fill={`url(#ixgrid-${uid})`} />
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
    <div>
      <style>{`@keyframes ix-flow { to { stroke-dashoffset: -15; } }`}</style>
      <div className="grid gap-10 lg:grid-cols-12">
        {/* Featured diagram + narrative */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070707] p-6 md:p-10">
            <div className="pointer-events-none absolute left-4 top-4 font-macro-mono text-[9px] uppercase tracking-widest text-white/20">
              {locale === "ro" ? "SCHEMĂ // VEDERE DE SUS" : "SCHEMATIC // PLAN VIEW"}
            </div>
            <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-2 font-macro-mono text-[9px] uppercase tracking-widest text-white/25">
              <span className="inline-block h-2 w-4 rounded-full" style={{ background: GOLD }} />
              {locale === "ro" ? "autostradă" : "freeway"}
              <span className="ml-2 inline-block h-2 w-4 rounded-full" style={{ background: STEEL }} />
              {locale === "ro" ? "drum" : "cross road"}
            </div>
            <div className="mx-auto max-w-[360px]">
              <Diagram uid={active.id}>{active.diagram(active.id)}</Diagram>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-macro-display text-3xl font-black tracking-tight text-white">
                {active.name[locale]}
              </h3>
              <span className="font-macro-mono text-[11px] uppercase tracking-[0.18em] text-[#E8B923]">
                {active.tag[locale]}
              </span>
            </div>
            <p className="macro-body mt-4 max-w-2xl !text-base leading-relaxed text-white/65">
              {active.desc[locale]}
            </p>
            <p className="mt-4 border-l-2 border-[#E8B923]/40 pl-4 font-macro-body text-sm italic leading-relaxed text-white/45">
              {active.example[locale]}
            </p>
          </div>
        </div>

        {/* Selector + spec + footprint comparison */}
        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-3">
            {KINDS.map((k) => {
              const on = k.id === activeId;
              return (
                <button
                  key={k.id}
                  onClick={() => setActiveId(k.id)}
                  onMouseEnter={() => setActiveId(k.id)}
                  className="rounded-xl border p-3 text-left transition-all duration-300"
                  style={{
                    borderColor: on ? "rgba(232,185,35,0.55)" : "rgba(255,255,255,0.06)",
                    background: on ? "rgba(232,185,35,0.06)" : "rgba(255,255,255,0.015)",
                  }}
                >
                  <div className="mx-auto max-w-[96px] opacity-90">
                    <Diagram uid={`t-${k.id}`}>{k.diagram(`t-${k.id}`)}</Diagram>
                  </div>
                  <div className="mt-2 font-macro-display text-[13px] font-bold leading-tight text-white">
                    {k.name[locale]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Spec readout */}
          <div className="mt-5 grid grid-cols-4 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.05]">
            {specRows.map(([label, value]) => (
              <div key={label} className="bg-[#070707] px-3 py-4 text-center">
                <div className="font-macro-mono text-[9px] uppercase tracking-[0.14em] text-white/35">
                  {label}
                </div>
                <div className="mt-1.5 font-macro-display text-base font-bold text-white">{value}</div>
              </div>
            ))}
          </div>

          {/* Footprint comparison */}
          <div className="mt-5 rounded-xl border border-white/[0.07] bg-[#070707] p-4">
            <div className="mb-3 font-macro-mono text-[9px] uppercase tracking-[0.16em] text-white/35">
              {locale === "ro" ? "Teren ocupat, comparativ" : "Land footprint, compared"}
            </div>
            <div className="space-y-2">
              {KINDS.map((k) => {
                const on = k.id === activeId;
                return (
                  <button
                    key={k.id}
                    onClick={() => setActiveId(k.id)}
                    className="flex w-full items-center gap-3"
                  >
                    <span className="w-24 shrink-0 text-left font-macro-mono text-[10px] uppercase tracking-wider" style={{ color: on ? "#E8B923" : "rgba(255,255,255,0.4)" }}>
                      {k.name[locale]}
                    </span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                      <span
                        className="block h-full rounded-full transition-all duration-500"
                        style={{ width: `${(k.footprint / maxFoot) * 100}%`, background: on ? GOLD : "rgba(255,255,255,0.22)" }}
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
