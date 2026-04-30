"use client";
// ─── Exposed Movement Gear Diagram ───────────────────────────────────────────
// Patek Philippe-inspired interlocking gears representing the three branches.
// Legislative, Executive, and Judicial as meshing SVG gears that rotate
// when hovered. Fine gold strokes on dark background. Central tourbillon
// labeled "We the People".

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper: generate gear path
function gearPath(cx: number, cy: number, outerR: number, innerR: number, teeth: number): string {
  const points: string[] = [];
  const toothAngle = (Math.PI * 2) / teeth;
  const halfTooth = toothAngle / 4;
  // Round to 2dp to prevent SSR/CSR floating-point hydration mismatches
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

interface GearInfo {
  id: string;
  label: string;
  labelRo: string;
  cx: number;
  cy: number;
  outerR: number;
  innerR: number;
  teeth: number;
  speed: number; // rotation speed multiplier
  direction: 1 | -1;
  powers: { en: string; ro: string }[];
}

const GEARS: GearInfo[] = [
  {
    id: "legislative",
    label: "LEGISLATIVE",
    labelRo: "LEGISLATIV",
    cx: 200, cy: 180,
    outerR: 100, innerR: 82,
    teeth: 16,
    speed: 1,
    direction: 1,
    powers: [
      { en: "Makes Laws", ro: "Creează Legi" },
      { en: "Controls Budget", ro: "Controlează Bugetul" },
      { en: "Declares War", ro: "Declară Război" },
      { en: "Confirms Judges", ro: "Confirmă Judecătorii" },
    ],
  },
  {
    id: "executive",
    label: "EXECUTIVE",
    labelRo: "EXECUTIV",
    cx: 500, cy: 180,
    outerR: 100, innerR: 82,
    teeth: 16,
    speed: 1,
    direction: -1,
    powers: [
      { en: "Enforces Laws", ro: "Aplică Legile" },
      { en: "Commands Military", ro: "Comandă Armata" },
      { en: "Signs Treaties", ro: "Semnează Tratate" },
      { en: "Veto Power", ro: "Puterea de Veto" },
    ],
  },
  {
    id: "judicial",
    label: "JUDICIAL",
    labelRo: "JUDICIAR",
    cx: 350, cy: 380,
    outerR: 100, innerR: 82,
    teeth: 16,
    speed: 1,
    direction: 1,
    powers: [
      { en: "Reviews Laws", ro: "Revizuiește Legi" },
      { en: "Interprets Constitution", ro: "Interpretează Constituția" },
      { en: "Judicial Review", ro: "Control Judiciar" },
      { en: "Lifetime Tenure", ro: "Mandat pe Viață" },
    ],
  },
];

export function GearDiagram({ isRo }: { isRo: boolean }) {
  const [activeGear, setActiveGear] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGearClick = (id: string) => {
    setActiveGear(activeGear === id ? null : id);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  return (
    <div className="relative">
      {/* SVG Mechanism */}
      <div className="relative overflow-hidden rounded-sm" style={{
        background: "linear-gradient(168deg, rgba(12,16,24,0.95) 0%, rgba(8,11,18,0.98) 100%)",
        border: "1px solid rgba(201,168,76,0.08)",
      }}>
        {/* Geneva stripes background */}
        <div className="pointer-events-none absolute inset-0" style={{
          background: "repeating-linear-gradient(135deg, rgba(201,168,76,0.01) 0px, rgba(201,168,76,0.01) 2px, transparent 2px, transparent 8px)",
        }} />

        <svg
          viewBox="0 0 700 520"
          className="w-full"
          role="img"
          aria-label={isRo ? "Diagrama separării puterilor" : "Separation of Powers gear diagram"}
        >
          <defs>
            <filter id="gear-glow">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(201,168,76,0.12)" />
              <stop offset="100%" stopColor="rgba(201,168,76,0)" />
            </radialGradient>
          </defs>

          {/* Connection lines between gears */}
          {[
            { x1: 200, y1: 180, x2: 500, y2: 180 },
            { x1: 200, y1: 180, x2: 350, y2: 380 },
            { x1: 500, y1: 180, x2: 350, y2: 380 },
          ].map((line, i) => (
            <line
              key={i}
              x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke="rgba(201,168,76,0.06)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Central tourbillon — "We the People" */}
          <circle cx="350" cy="250" r="35" fill="url(#center-glow)" />
          <circle cx="350" cy="250" r="35" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="1" />
          <circle cx="350" cy="250" r="28" fill="none" stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />
          <text x="350" y="246" textAnchor="middle" fill="#C9A84C" fontSize="7" fontFamily="'Inter',sans-serif" fontWeight="600" letterSpacing=".15em">
            WE THE
          </text>
          <text x="350" y="258" textAnchor="middle" fill="#C9A84C" fontSize="7" fontFamily="'Inter',sans-serif" fontWeight="600" letterSpacing=".15em">
            PEOPLE
          </text>

          {/* Gears */}
          {GEARS.map((gear) => {
            const isActive = activeGear === gear.id;
            const rotation = isAnimating
              ? gear.direction * gear.speed * 360
              : 0;

            return (
              <g
                key={gear.id}
                className="cursor-pointer"
                onClick={() => handleGearClick(gear.id)}
              >
                {/* Gear teeth */}
                <motion.path
                  d={gearPath(gear.cx, gear.cy, gear.outerR, gear.innerR, gear.teeth)}
                  fill="none"
                  stroke={isActive ? "#C9A84C" : "rgba(201,168,76,0.25)"}
                  strokeWidth={isActive ? 1.5 : 1}
                  filter={isActive ? "url(#gear-glow)" : undefined}
                  animate={{ rotate: rotation }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  style={{ transformOrigin: `${gear.cx}px ${gear.cy}px` }}
                />

                {/* Center bore */}
                <circle
                  cx={gear.cx} cy={gear.cy} r="6"
                  fill="none"
                  stroke={isActive ? "#C9A84C" : "rgba(201,168,76,0.2)"}
                  strokeWidth="1"
                />
                <circle
                  cx={gear.cx} cy={gear.cy} r="2.5"
                  fill={isActive ? "#C9A84C" : "rgba(201,168,76,0.3)"}
                />

                {/* Inner detail ring */}
                <motion.circle
                  cx={gear.cx} cy={gear.cy} r="50"
                  fill="none"
                  stroke={isActive ? "rgba(201,168,76,0.15)" : "rgba(201,168,76,0.06)"}
                  strokeWidth="0.5"
                  strokeDasharray="3 5"
                  animate={{ rotate: -rotation * 0.5 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  style={{ transformOrigin: `${gear.cx}px ${gear.cy}px` }}
                />

                {/* Branch label */}
                <text
                  x={gear.cx}
                  y={gear.cy - gear.outerR - 12}
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
              </g>
            );
          })}
        </svg>

        {/* Powers readout — appears when gear is selected */}
        <AnimatePresence>
          {activeGear && (() => {
            const gear = GEARS.find((g) => g.id === activeGear);
            if (!gear) return null;
            return (
              <motion.div
                key={gear.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-[rgba(201,168,76,0.08)] px-5 py-4"
                style={{ background: "rgba(201,168,76,0.02)" }}
              >
                <p className="mb-2 font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[rgba(201,168,76,0.5)]">
                  {isRo ? gear.labelRo : gear.label} — {isRo ? "Puteri Constituționale" : "Constitutional Powers"}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {gear.powers.map((p, i) => (
                    <div
                      key={i}
                      className="rounded-sm border border-[rgba(201,168,76,0.08)] px-3 py-2"
                      style={{ background: "rgba(201,168,76,0.03)" }}
                    >
                      <p className="font-body text-xs text-[#F5F0E8]">
                        {isRo ? p.ro : p.en}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>

      {/* Instruction */}
      <p className="mt-4 text-center font-body text-[10px] uppercase tracking-[0.3em] text-[#6B6860]">
        {isRo
          ? "Dă click pe o roată pentru a vedea puterile constituționale"
          : "Click a gear to see constitutional powers"}
      </p>
    </div>
  );
}
