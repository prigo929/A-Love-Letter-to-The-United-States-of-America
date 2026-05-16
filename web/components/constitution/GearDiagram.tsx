"use client";
// ─── Constitutional Mechanism — Separation of Powers ─────────────────────────
// Patek Philippe-inspired interlocking gears representing the three branches.
// Ratchet animation (22.5° per click), spring physics, counter-rotation,
// axle bridges engraved with "Article I/II/III", and a fixed Complication Ledger.

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Helper: gear path with SSR-safe rounding ─────────────────────────────────
function gearPath(cx: number, cy: number, outerR: number, innerR: number, teeth: number): string {
  const points: string[] = [];
  const toothAngle = (Math.PI * 2) / teeth;
  const halfTooth = toothAngle / 4;
  const r2 = (n: number) => Math.round(n * 100) / 100;

  for (let i = 0; i < teeth; i++) {
    const angle = i * toothAngle - Math.PI / 2;
    points.push(`${r2(cx + outerR * Math.cos(angle - halfTooth))},${r2(cy + outerR * Math.sin(angle - halfTooth))}`);
    points.push(`${r2(cx + outerR * Math.cos(angle + halfTooth))},${r2(cy + outerR * Math.sin(angle + halfTooth))}`);
    const valleyAngle = angle + toothAngle / 2;
    points.push(`${r2(cx + innerR * Math.cos(valleyAngle - halfTooth))},${r2(cy + innerR * Math.sin(valleyAngle - halfTooth))}`);
    points.push(`${r2(cx + innerR * Math.cos(valleyAngle + halfTooth))},${r2(cy + innerR * Math.sin(valleyAngle + halfTooth))}`);
  }
  return `M${points.join("L")}Z`;
}

// ── Gear data ────────────────────────────────────────────────────────────────
// Wider equilateral triangle layout: Leg/Exec at top, Judicial below.
// Central "We the People" at (350, 265) — centered in the triangle.

interface GearInfo {
  id: string;
  label: string;
  labelRo: string;
  article: string;
  cx: number;
  cy: number;
  outerR: number;
  innerR: number;
  teeth: number;
  direction: 1 | -1;
  powers: { en: string; ro: string }[];
}

const GEARS: GearInfo[] = [
  {
    id: "legislative",
    label: "LEGISLATIVE",
    labelRo: "LEGISLATIV",
    article: "ARTICLE I",
    cx: 185, cy: 170,
    outerR: 95, innerR: 78,
    teeth: 16,
    direction: 1,
    powers: [
      { en: "Makes Laws (Subject to Veto)", ro: "Creează Legi (Supuse Veto-ului)" },
      { en: "Controls Budget (Limits Exec)", ro: "Controlează Bugetul (Limitează Executivul)" },
      { en: "Declares War (Checks Cmdr)", ro: "Declară Război (Controlează Comandantul)" },
      { en: "Confirms Judges (Consent)", ro: "Confirmă Judecători (Consimțământ)" },
    ],
  },
  {
    id: "executive",
    label: "EXECUTIVE",
    labelRo: "EXECUTIV",
    article: "ARTICLE II",
    cx: 515, cy: 170,
    outerR: 95, innerR: 78,
    teeth: 16,
    direction: -1,
    powers: [
      { en: "Enforces Laws (Subject to Courts)", ro: "Aplică Legile (Supus Instanțelor)" },
      { en: "Commands Military (If Funded)", ro: "Comandă Armata (Dacă e Finanțată)" },
      { en: "Signs Treaties (Needs Senate)", ro: "Semnează Tratate (Necesită Senatul)" },
      { en: "Veto Power (Can be Overridden)", ro: "Puterea de Veto (Poate fi Anulată)" },
    ],
  },
  {
    id: "judicial",
    label: "JUDICIAL",
    labelRo: "JUDICIAR",
    article: "ARTICLE III",
    cx: 350, cy: 455,
    outerR: 95, innerR: 78,
    teeth: 16,
    direction: 1,
    powers: [
      { en: "Reviews Laws (Can Strike Down)", ro: "Revizuiește Legi (Le Poate Anula)" },
      { en: "Interprets Const. (Final Say)", ro: "Interpretează Const. (Cuvântul Final)" },
      { en: "Lifetime Tenure (Can be Impeached)", ro: "Mandat pe Viață (Poate fi Demis)" },
      { en: "No Direct Enforcement Power", ro: "Fără Putere Directă de Execuție" },
    ],
  },
];

// Center of triangle
const CENTER_X = 350;
const CENTER_Y = 265;

// Ratchet step (one tooth = 22.5°)
const RATCHET_DEG = 22.5;

// Spring physics — heavy brass escapement feel
const RATCHET_SPRING = {
  type: "spring" as const,
  stiffness: 400,
  damping: 15,
  mass: 1.5,
};

// Gridlock shake
const SHAKE_ANIM = {
  x: [0, -3, 3, -2, 2, -1, 1, 0],
  transition: { duration: 0.5, ease: [0.45, 0.05, 0.55, 0.95] as const },
};

export function GearDiagram({ isRo }: { isRo: boolean }) {
  const [activeGear, setActiveGear] = useState<string | null>(null);
  // Cumulative rotation per gear
  const [rotations, setRotations] = useState<Record<string, number>>({
    legislative: 0,
    executive: 0,
    judicial: 0,
  });
  const [gridlock, setGridlock] = useState(false);
  const gridlockTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleGearClick = useCallback((id: string) => {
    if (gridlock) return;
    setActiveGear(activeGear === id ? null : id);

    // Ratchet: clicked gear advances one tooth, others counter-rotate
    setRotations((prev) => {
      const clickedGear = GEARS.find((g) => g.id === id)!;
      const step = RATCHET_DEG * clickedGear.direction;
      const next = { ...prev };
      next[id] = prev[id] + step;
      // Counter-rotate others
      GEARS.forEach((g) => {
        if (g.id !== id) {
          next[g.id] = prev[g.id] - step * 0.5; // gear ratio
        }
      });
      return next;
    });
  }, [activeGear, gridlock]);

  const handleGridlock = useCallback(() => {
    if (gridlock) return;
    setGridlock(true);
    setActiveGear("gridlock");
    if (gridlockTimeout.current) clearTimeout(gridlockTimeout.current);
    gridlockTimeout.current = setTimeout(() => {
      setGridlock(false);
      setActiveGear(null);
    }, 3000);
  }, [gridlock]);

  const activeGearData = GEARS.find((g) => g.id === activeGear);

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-sm" style={{
        background: "linear-gradient(168deg, rgba(12,16,24,0.95) 0%, rgba(8,11,18,0.98) 100%)",
        border: "1px solid rgba(201,168,76,0.08)",
      }}>
        {/* Geneva stripes background */}
        <div className="pointer-events-none absolute inset-0" style={{
          background: "repeating-linear-gradient(135deg, rgba(201,168,76,0.01) 0px, rgba(201,168,76,0.01) 2px, transparent 2px, transparent 8px)",
        }} />

        <svg
          viewBox="0 0 700 600"
          className="w-full"
          role="img"
          aria-label={isRo ? "Diagrama separării puterilor" : "Separation of Powers gear diagram"}
        >
          <defs>
            <filter id="gear-glow">
              <feGaussianBlur stdDeviation="4" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(201,168,76,0.15)" />
              <stop offset="100%" stopColor="rgba(201,168,76,0)" />
            </radialGradient>
            <filter id="gridlock-glow">
              <feGaussianBlur stdDeviation="6" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Constitutional Bridges — axle lines with Article labels ── */}
          {GEARS.map((gear) => {
            const isActive = activeGear === gear.id;
            // SSR-safe rounding for calculated SVG properties
            const r2 = (n: number) => Math.round(n * 100) / 100;
            const midX = r2(CENTER_X + (gear.cx - CENTER_X) * 0.38);
            const midY = r2(CENTER_Y + (gear.cy - CENTER_Y) * 0.38);
            const angle = Math.atan2(gear.cy - CENTER_Y, gear.cx - CENTER_X);
            let rawLabelAngle = (angle * 180) / Math.PI;
            if (rawLabelAngle > 90 || rawLabelAngle < -90) rawLabelAngle += 180;
            const labelAngle = r2(rawLabelAngle);

            return (
              <g key={`bridge-${gear.id}`}>
                {/* Bridge line */}
                <line
                  x1={CENTER_X} y1={CENTER_Y}
                  x2={gear.cx} y2={gear.cy}
                  stroke={isActive ? "rgba(201,168,76,0.2)" : "rgba(201,168,76,0.06)"}
                  strokeWidth={isActive ? 1.5 : 1}
                  style={{ transition: "stroke 0.3s ease" }}
                />
                {/* Article engraving on bridge */}
                <text
                  x={midX}
                  y={midY}
                  textAnchor="middle"
                  fill={isActive ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.12)"}
                  fontSize="7"
                  fontFamily="'Inter',sans-serif"
                  fontWeight="600"
                  letterSpacing=".15em"
                  transform={`rotate(${labelAngle}, ${midX}, ${midY})`}
                  style={{ transition: "fill 0.3s ease" }}
                >
                  {gear.article}
                </text>
              </g>
            );
          })}

          {/* ── Central Tourbillon — "We the People" ── */}
          <circle cx={CENTER_X} cy={CENTER_Y} r="38" fill="url(#center-glow)" />
          <circle cx={CENTER_X} cy={CENTER_Y} r="38" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="1" />
          <circle cx={CENTER_X} cy={CENTER_Y} r="30" fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5" strokeDasharray="2 3" />
          <circle cx={CENTER_X} cy={CENTER_Y} r="22" fill="none" stroke="rgba(201,168,76,0.05)" strokeWidth="0.5" />
          <text x={CENTER_X} y={CENTER_Y - 4} textAnchor="middle" fill="#C9A84C" fontSize="7" fontFamily="'Inter',sans-serif" fontWeight="600" letterSpacing=".15em">
            WE THE
          </text>
          <text x={CENTER_X} y={CENTER_Y + 8} textAnchor="middle" fill="#C9A84C" fontSize="7" fontFamily="'Inter',sans-serif" fontWeight="600" letterSpacing=".15em">
            PEOPLE
          </text>

          {/* ── Gears ── */}
          {GEARS.map((gear) => {
            const isActive = activeGear === gear.id;
            const isGridlockActive = gridlock;
            const rot = rotations[gear.id] ?? 0;

            return (
              <motion.g
                key={gear.id}
                className="cursor-pointer"
                onClick={() => handleGearClick(gear.id)}
                animate={isGridlockActive ? SHAKE_ANIM : {}}
              >
                {/* Outer concentric detail ring */}
                <motion.circle
                  cx={gear.cx} cy={gear.cy}
                  r={gear.outerR + 8}
                  fill="none"
                  stroke={isActive ? "rgba(201,168,76,0.12)" : "rgba(201,168,76,0.03)"}
                  strokeWidth="0.5"
                  strokeDasharray="1 4"
                  animate={{ rotate: -rot * 0.3 }}
                  transition={RATCHET_SPRING}
                  style={{ transformOrigin: `${gear.cx}px ${gear.cy}px`, transition: "stroke 0.3s ease" }}
                />

                {/* Gear teeth */}
                <motion.path
                  d={gearPath(gear.cx, gear.cy, gear.outerR, gear.innerR, gear.teeth)}
                  fill="none"
                  stroke={isGridlockActive ? "#B8860B" : isActive ? "#C9A84C" : "rgba(201,168,76,0.25)"}
                  strokeWidth={isActive ? 1.5 : 1}
                  filter={isActive || isGridlockActive ? "url(#gear-glow)" : undefined}
                  animate={{ rotate: rot }}
                  transition={RATCHET_SPRING}
                  style={{ transformOrigin: `${gear.cx}px ${gear.cy}px` }}
                />

                {/* Inner detail ring — "jewel" */}
                <motion.circle
                  cx={gear.cx} cy={gear.cy} r="50"
                  fill="none"
                  stroke={isActive ? "rgba(201,168,76,0.15)" : "rgba(201,168,76,0.05)"}
                  strokeWidth="0.5"
                  strokeDasharray="3 5"
                  animate={{ rotate: -rot * 0.5 }}
                  transition={RATCHET_SPRING}
                  style={{ transformOrigin: `${gear.cx}px ${gear.cy}px`, transition: "stroke 0.3s ease" }}
                />

                {/* Inner jewel ring 2 */}
                <circle
                  cx={gear.cx} cy={gear.cy} r="35"
                  fill="none"
                  stroke={isActive ? "rgba(201,168,76,0.08)" : "rgba(201,168,76,0.03)"}
                  strokeWidth="0.5"
                  style={{ transition: "stroke 0.3s ease" }}
                />

                {/* Center bore (axle) */}
                <circle
                  cx={gear.cx} cy={gear.cy} r="7"
                  fill="none"
                  stroke={isActive ? "#C9A84C" : "rgba(201,168,76,0.2)"}
                  strokeWidth="1"
                  style={{ transition: "stroke 0.3s ease" }}
                />
                <circle
                  cx={gear.cx} cy={gear.cy} r="3"
                  fill={isActive ? "#C9A84C" : "rgba(201,168,76,0.3)"}
                  style={{ transition: "fill 0.3s ease" }}
                />

                {/* Branch label */}
                <text
                  x={gear.cx}
                  y={gear.id === "judicial" ? gear.cy + gear.outerR + 24 : gear.cy - gear.outerR - 16}
                  textAnchor="middle"
                  fill={isActive ? "#E8C878" : "#C9A84C"}
                  fontSize="10"
                  fontFamily="'Inter',sans-serif"
                  fontWeight="700"
                  letterSpacing=".2em"
                  style={{ transition: "fill 0.3s ease" }}
                >
                  {isRo ? gear.labelRo : gear.label}
                </text>
              </motion.g>
            );
          })}
        </svg>

        {/* ── Complication Ledger — fixed-height data plate ── */}
        <div
          className="border-t border-[rgba(201,168,76,0.08)] px-5 py-4"
          style={{ background: "rgba(201,168,76,0.02)", minHeight: "88px" }}
        >
          <AnimatePresence mode="wait">
            {activeGear === "gridlock" ? (
              <motion.div
                key="gridlock"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="mb-2 font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B8860B]">
                  ⚙ SYS: {isRo ? "BLOCAJ DETECTAT" : "GRIDLOCK DETECTED"} — {isRo ? "LIBERTATEA ESTE PREZERVATĂ" : "LIBERTY PRESERVED"}
                </p>
                <p className="font-body text-xs text-[#B8B4AC]" style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}>
                  {isRo
                    ? "Când ramurile se blochează reciproc, sistemul funcționează exact așa cum a fost conceput. Separarea puterilor există pentru a preveni tirania — nu pentru eficiență."
                    : "When the branches lock against each other, the system is working exactly as designed. Separation of powers exists to prevent tyranny — not for efficiency."}
                </p>
              </motion.div>
            ) : activeGearData ? (
              <motion.div
                key={activeGearData.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="mb-2 font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[rgba(201,168,76,0.5)]">
                  ⚙ {isRo ? activeGearData.labelRo : activeGearData.label} — {activeGearData.article} — {isRo ? "Puteri Constituționale" : "Constitutional Powers"}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {activeGearData.powers.map((p, i) => (
                    <div
                      key={i}
                      className="rounded-sm px-3 py-2"
                      style={{ border: "1px solid rgba(201,168,76,0.08)", background: "rgba(201,168,76,0.03)" }}
                    >
                      <p className="font-body text-xs text-[#F5F0E8]" style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}>
                        {isRo ? p.ro : p.en}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[rgba(201,168,76,0.25)]">
                  ⚙ {isRo ? "SELECTEAZĂ O RAMURĂ • PUTERILE SUNT LIMITATE" : "SELECT A BRANCH • POWERS ARE CONSTRAINED"}
                </p>
                <p className="mt-1 max-w-xl font-body text-xs leading-relaxed text-[#6B6860]" style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}>
                  {isRo ? "Observă cum rotirea unei roți forțează celelalte să se miște. Dacă se împing în direcții opuse, mașinăria se oprește." : "Notice how turning one gear forces the others to move. If they push in opposite directions, the machine halts."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Controls — instruction + gridlock button ── */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-[#6B6860]">
          {isRo
            ? "Click = o rotație (22.5°) · Roțile conectate se mișcă invers"
            : "Click = one ratchet (22.5°) · Connected gears counter-rotate"}
        </p>
        <button
          type="button"
          onClick={handleGridlock}
          disabled={gridlock}
          className="rounded-sm px-4 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.15em] transition-all disabled:opacity-40"
          style={{
            border: "1px solid rgba(184,134,11,0.3)",
            color: "#B8860B",
            background: gridlock ? "rgba(184,134,11,0.06)" : "transparent",
          }}
        >
          ⚡ {isRo ? "VETO / SUPRASCRIERE" : "VETO / OVERRIDE"}
        </button>
      </div>
    </div>
  );
}
