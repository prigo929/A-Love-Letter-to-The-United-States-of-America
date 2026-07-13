"use client";

// ─── InterchangeTypology ──────────────────────────────────────────────────────
// A small illustrated field guide to the four interchange forms that stitch the
// Interstate grid together, drawn as schematic top-down diagrams. The gold band
// is the free-flowing freeway; the grey band is the crossing road; the thin gold
// curves are the connecting ramps. A dashed overlay drifts along the freeway to
// suggest moving traffic. Selecting a type enlarges it and reveals the detail.

import { useState } from "react";

type Id = "diamond" | "cloverleaf" | "stack" | "spui";

interface Kind {
  id: Id;
  name: { en: string; ro: string };
  tag: { en: string; ro: string };
  footprint: { en: string; ro: string };
  desc: { en: string; ro: string };
  diagram: (uid: string) => React.ReactNode;
}

const GOLD = "#E8B923";
const GREY = "#5b6470";
const RAMP = "rgba(232,185,35,0.6)";

// Shared diagram chrome: faint blueprint grid + a drifting dashed freeway line.
function Frame({ uid, children, flow }: { uid: string; children: React.ReactNode; flow: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-auto w-full select-none">
      <defs>
        <pattern id={`grid-${uid}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="200" height="200" fill={`url(#grid-${uid})`} />
      {children}
      {/* moving traffic on the freeway */}
      <path
        d={flow}
        fill="none"
        stroke={GOLD}
        strokeWidth="2.4"
        strokeDasharray="2 12"
        strokeLinecap="round"
        opacity="0.9"
        style={{ animation: "ix-flow 1.6s linear infinite" }}
      />
    </svg>
  );
}

const KINDS: Kind[] = [
  {
    id: "diamond",
    name: { en: "Diamond", ro: "Diamant" },
    tag: { en: "Smallest footprint", ro: "Amprentă minimă" },
    footprint: { en: "Freeway ↔ arterial", ro: "Autostradă ↔ arteră" },
    desc: {
      en: "The workhorse, and by far the most common. Four short ramps peel off the freeway and meet the cross street at grade, where a stop or signal handles the turns. Cheap, compact, and easy to sign.",
      ro: "Calul de povară și, de departe, cea mai frecventă. Patru bretele scurte se desprind din autostradă și întâlnesc drumul secundar la nivel, unde un stop sau un semafor gestionează virajele. Ieftin, compact și ușor de semnalizat.",
    },
    diagram: (uid) => (
      <Frame uid={uid} flow="M4 100 H196">
        <line x1="100" y1="6" x2="100" y2="194" stroke={GREY} strokeWidth="12" strokeLinecap="round" />
        <path d="M55 100 C55 78 78 55 100 55" fill="none" stroke={RAMP} strokeWidth="4" />
        <path d="M145 100 C145 78 122 55 100 55" fill="none" stroke={RAMP} strokeWidth="4" />
        <path d="M55 100 C55 122 78 145 100 145" fill="none" stroke={RAMP} strokeWidth="4" />
        <path d="M145 100 C145 122 122 145 100 145" fill="none" stroke={RAMP} strokeWidth="4" />
        <line x1="4" y1="100" x2="196" y2="100" stroke={GOLD} strokeWidth="12" strokeLinecap="round" />
      </Frame>
    ),
  },
  {
    id: "cloverleaf",
    name: { en: "Cloverleaf", ro: "Treflă" },
    tag: { en: "No signals, but weaving", ro: "Fără semafoare, dar cu întrețesere" },
    footprint: { en: "First built 1928", ro: "Prima construită în 1928" },
    desc: {
      en: "The first free-flowing design: four looping ramps turn every left without a single stoplight. The catch is weaving — traffic entering and exiting must trade places on the same short stretch, which chokes at high volumes.",
      ro: "Primul design cu flux continuu: patru bretele în buclă rezolvă fiecare viraj la stânga fără niciun semafor. Neajunsul este întrețeserea — traficul care intră și cel care iese trebuie să facă schimb de locuri pe aceeași porțiune scurtă, ceea ce se blochează la volume mari.",
    },
    diagram: (uid) => (
      <Frame uid={uid} flow="M4 100 H196">
        <line x1="100" y1="4" x2="100" y2="196" stroke={GREY} strokeWidth="12" strokeLinecap="round" />
        <line x1="4" y1="100" x2="196" y2="100" stroke={GOLD} strokeWidth="12" strokeLinecap="round" />
        {[
          [72, 72],
          [128, 72],
          [72, 128],
          [128, 128],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="22" fill="none" stroke={RAMP} strokeWidth="4" />
        ))}
      </Frame>
    ),
  },
  {
    id: "stack",
    name: { en: "Stack", ro: "Suprapus (Stack)" },
    tag: { en: "Highest capacity", ro: "Capacitate maximă" },
    footprint: { en: "Four or more levels", ro: "Patru sau mai multe niveluri" },
    desc: {
      en: "Freeway meets freeway. Sweeping flyover ramps carry every movement at full speed with no weaving and no signals, stacked four or five levels high. The fastest form to drive and the most expensive to build.",
      ro: "Autostradă peste autostradă. Bretele largi, suspendate, preiau fiecare mișcare la viteză maximă, fără întrețesere și fără semafoare, suprapuse pe patru sau cinci niveluri. Cea mai rapidă formă de condus și cea mai scumpă de construit.",
    },
    diagram: (uid) => (
      <Frame uid={uid} flow="M4 100 H196">
        <line x1="100" y1="4" x2="100" y2="196" stroke={GOLD} strokeWidth="12" strokeLinecap="round" />
        <path d="M150 88 C120 88 112 80 112 50" fill="none" stroke={RAMP} strokeWidth="4" />
        <path d="M88 50 C88 80 80 88 50 88" fill="none" stroke={RAMP} strokeWidth="4" />
        <path d="M50 112 C80 112 88 120 88 150" fill="none" stroke={RAMP} strokeWidth="4" />
        <path d="M112 150 C112 120 120 112 150 112" fill="none" stroke={RAMP} strokeWidth="4" />
        <line x1="4" y1="100" x2="196" y2="100" stroke={GOLD} strokeWidth="12" strokeLinecap="round" />
      </Frame>
    ),
  },
  {
    id: "spui",
    name: { en: "Single-Point Urban", ro: "Urban cu Punct Unic" },
    tag: { en: "One signal, tight space", ro: "Un semafor, spațiu strâns" },
    footprint: { en: "Freeway ↔ arterial", ro: "Autostradă ↔ arteră" },
    desc: {
      en: "A city trick. Every ramp converges on a single signalized point beneath (or above) the freeway, so all left turns clear on one traffic phase. It moves diamond-level traffic in a fraction of the land a cloverleaf demands.",
      ro: "Un truc urban. Fiecare breteă converge într-un singur punct cu semafor, sub (sau peste) autostradă, astfel încât toate virajele la stânga se eliberează într-o singură fază. Preia trafic cât un diamant pe o fracțiune din terenul cerut de o treflă.",
    },
    diagram: (uid) => (
      <Frame uid={uid} flow="M4 100 H196">
        <line x1="100" y1="4" x2="100" y2="196" stroke={GREY} strokeWidth="12" strokeLinecap="round" />
        <path d="M158 112 C130 112 114 104 100 100" fill="none" stroke={RAMP} strokeWidth="4" />
        <path d="M42 112 C70 112 86 104 100 100" fill="none" stroke={RAMP} strokeWidth="4" />
        <path d="M158 88 C130 88 114 96 100 100" fill="none" stroke={RAMP} strokeWidth="4" />
        <path d="M42 88 C70 88 86 96 100 100" fill="none" stroke={RAMP} strokeWidth="4" />
        <line x1="4" y1="100" x2="196" y2="100" stroke={GOLD} strokeWidth="12" strokeLinecap="round" />
        <circle cx="100" cy="100" r="6" fill="#fff" stroke={GOLD} strokeWidth="2.5" />
      </Frame>
    ),
  },
];

export function InterchangeTypology({ locale }: { locale: "en" | "ro" }) {
  const [activeId, setActiveId] = useState<Id>("diamond");
  const active = KINDS.find((k) => k.id === activeId)!;

  return (
    <div>
      <style>{`@keyframes ix-flow { to { stroke-dashoffset: -14; } }`}</style>
      <div className="grid gap-10 lg:grid-cols-12">
        {/* Featured diagram */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#070707] p-6 md:p-10">
            <div className="pointer-events-none absolute left-4 top-4 font-macro-mono text-[9px] uppercase tracking-widest text-white/20">
              {locale === "ro" ? "SCHEMĂ // VEDERE DE SUS" : "SCHEMATIC // PLAN VIEW"}
            </div>
            <div className="mx-auto max-w-[340px]">{active.diagram(active.id)}</div>
          </div>
          <div className="mt-6">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-macro-display text-2xl font-black tracking-tight text-white">
                {active.name[locale]}
              </h3>
              <span className="font-macro-mono text-[11px] uppercase tracking-[0.15em] text-[#E8B923]">
                {active.tag[locale]}
              </span>
            </div>
            <p className="macro-body mt-4 max-w-2xl !text-base leading-relaxed text-white/65">
              {active.desc[locale]}
            </p>
          </div>
        </div>

        {/* Selectable thumbnails */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:content-start">
          {KINDS.map((k) => {
            const on = k.id === activeId;
            return (
              <button
                key={k.id}
                onClick={() => setActiveId(k.id)}
                onMouseEnter={() => setActiveId(k.id)}
                className="rounded-2xl border p-4 text-left transition-all duration-300"
                style={{
                  borderColor: on ? "rgba(232,185,35,0.5)" : "rgba(255,255,255,0.06)",
                  background: on ? "rgba(232,185,35,0.05)" : "rgba(255,255,255,0.015)",
                }}
              >
                <div className="mx-auto max-w-[120px] opacity-90">{k.diagram(`t-${k.id}`)}</div>
                <div className="mt-3 font-macro-display text-sm font-bold text-white">{k.name[locale]}</div>
                <div className="mt-0.5 font-macro-mono text-[9px] uppercase tracking-[0.12em] text-white/35">
                  {k.footprint[locale]}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
