"use client";
// ─── Interactive US Map ──────────────────────────────────────────────────────
// Simplified SVG map of all 50 states. Each state is a region that
// can be colored by match score. Hover shows tooltip with state info.
// Uses simplified path data for a clean, abstract cartographic look.

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { StatePolicyExtended } from "@/lib/data/federalism-data";

// ── Tile-grid cartogram — manually positioned ──────────────────────────────
const TILE_SIZE = 48;
const GAP = 3;
const COLS = 12;
const ROWS = 8;
const TILE_POSITIONS: Record<string, [number, number]> = {
  // Row 0
  AK: [0, 0], ME: [11, 0],
  // Row 1
  VT: [9, 1], NH: [10, 1],
  // Row 2
  WA: [0, 2], ID: [1, 2], MT: [2, 2], ND: [3, 2], MN: [4, 2], WI: [5, 2], MI: [6, 2], NY: [8, 2], MA: [9, 2], RI: [10, 2],
  // Row 3
  OR: [0, 3], NV: [1, 3], WY: [2, 3], SD: [3, 3], IA: [4, 3], IL: [5, 3], IN: [6, 3], OH: [7, 3], PA: [8, 3], NJ: [9, 3], CT: [10, 3],
  // Row 4
  CA: [0, 4], UT: [1, 4], CO: [2, 4], NE: [3, 4], MO: [4, 4], KY: [5, 4], WV: [6, 4], VA: [7, 4], MD: [8, 4], DE: [9, 4],
  // Row 5
  AZ: [1, 5], NM: [2, 5], KS: [3, 5], AR: [4, 5], TN: [5, 5], NC: [6, 5], SC: [7, 5],
  // Row 6
  OK: [3, 6], LA: [4, 6], MS: [5, 6], AL: [6, 6], GA: [7, 6],
  // Row 7
  HI: [0, 7], TX: [3, 7], FL: [8, 7],
};

function scoreToColor(score: number): string {
  // 0% = dark navy (#0C1018), 100% = bright gold (#E8C878)
  if (score >= 0.85) return "#E8C878";
  if (score >= 0.7) return "#C9A84C";
  if (score >= 0.55) return "#8B6A2A";
  if (score >= 0.4) return "#4A3A1A";
  if (score >= 0.25) return "#2A2215";
  return "#151920";
}

interface ScoredState extends StatePolicyExtended {
  score: number;
}

export function USMapInteractive({
  states,
  isRo,
  onStateClick,
}: {
  states: ScoredState[];
  isRo?: boolean;
  onStateClick?: (state: ScoredState) => void;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const stateMap = useMemo(() => {
    const map: Record<string, ScoredState> = {};
    states.forEach((s) => { map[s.id] = s; });
    return map;
  }, [states]);

  const hoveredState = hoveredId ? stateMap[hoveredId] : null;

  // SVG dimensions based on tile grid
  const svgW = COLS * (TILE_SIZE + GAP) + GAP;
  const svgH = ROWS * (TILE_SIZE + GAP) + GAP;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="w-full"
        role="img"
        aria-label={isRo ? "Harta interactivă a SUA" : "Interactive US Map"}
      >
        {Object.entries(TILE_POSITIONS).map(([abbr, [col, row]]) => {
          const state = stateMap[abbr];
          if (!state) return null;
          const x = GAP + col * (TILE_SIZE + GAP);
          const y = GAP + row * (TILE_SIZE + GAP);
          const isHovered = hoveredId === abbr;

          return (
            <g
              key={abbr}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredId(abbr)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onStateClick?.(state)}
            >
              <rect
                x={x} y={y}
                width={TILE_SIZE} height={TILE_SIZE}
                rx={3}
                fill={scoreToColor(state.score)}
                stroke={isHovered ? "#E8C878" : "rgba(201,168,76,0.08)"}
                strokeWidth={isHovered ? 2 : 0.5}
                style={{ transition: "fill 0.4s ease, stroke 0.2s ease" }}
              />
              <text
                x={x + TILE_SIZE / 2}
                y={y + TILE_SIZE / 2 - 4}
                textAnchor="middle"
                fill={state.score > 0.55 ? "#080B12" : "#C9A84C"}
                fontSize="10"
                fontFamily="'Inter', sans-serif"
                fontWeight="700"
                letterSpacing="0.05em"
                style={{ transition: "fill 0.4s ease" }}
              >
                {abbr}
              </text>
              <text
                x={x + TILE_SIZE / 2}
                y={y + TILE_SIZE / 2 + 8}
                textAnchor="middle"
                fill={state.score > 0.55 ? "rgba(8,11,18,0.6)" : "rgba(201,168,76,0.4)"}
                fontSize="7"
                fontFamily="'Inter', sans-serif"
                fontWeight="600"
                style={{ transition: "fill 0.4s ease" }}
              >
                {Math.round(state.score * 100)}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredState && (() => {
          const pos = TILE_POSITIONS[hoveredState.abbr];
          if (!pos) return null;
          const [col, row] = pos;
          // Position tooltip relative to the tile
          const leftPct = ((col * (TILE_SIZE + GAP) + TILE_SIZE / 2) / svgW) * 100;
          const topPct = ((row * (TILE_SIZE + GAP)) / svgH) * 100;

          return (
            <motion.div
              key={hoveredState.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none absolute z-30 w-48 rounded-sm border border-[rgba(201,168,76,0.2)] bg-[#080B12]/95 p-3 shadow-2xl backdrop-blur-sm"
              style={{
                left: `${Math.min(Math.max(leftPct, 15), 80)}%`,
                top: `${Math.max(topPct - 2, 0)}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <p className="mb-1 font-body text-xs font-bold text-[#F5F0E8]">{hoveredState.name}</p>
              <div className="space-y-0.5 font-body" style={{ fontVariantNumeric: "tabular-nums" }}>
                {[
                  { l: isRo ? "Potrivire" : "Match", v: `${Math.round(hoveredState.score * 100)}%` },
                  { l: isRo ? "Creștere PIB" : "GDP Growth", v: `+${hoveredState.gdpGrowth5yr}%` },
                  { l: isRo ? "Migrație" : "Migration", v: `${hoveredState.netMigration > 0 ? "+" : ""}${hoveredState.netMigration}k` },
                  { l: isRo ? "Venit Median" : "Median Income", v: `$${hoveredState.medianIncome.toLocaleString()}` },
                ].map((r) => (
                  <div key={r.l} className="flex justify-between text-[9px]">
                    <span className="text-[#6B6860]">{r.l}</span>
                    <span className="text-[#C9A84C]">{r.v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="font-body text-[9px] text-[#6B6860]">0%</span>
        <div className="flex h-2 w-32 overflow-hidden rounded-full">
          {["#151920", "#2A2215", "#4A3A1A", "#8B6A2A", "#C9A84C", "#E8C878"].map((c, i) => (
            <div key={i} className="flex-1" style={{ background: c }} />
          ))}
        </div>
        <span className="font-body text-[9px] text-[#6B6860]">100%</span>
      </div>
    </div>
  );
}
