"use client";
// ─── Interactive US Map ──────────────────────────────────────────────────────
// Simplified SVG map of all 50 states. Each state is a region that
// can be colored by match score. Hover shows tooltip with state info.
// Uses simplified path data for a clean, abstract cartographic look.

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { StatePolicyExtended } from "@/lib/data/federalism-data";

// ── Tile-grid cartogram — industry-standard layout ──────────────────────────
// Matches the Bloomberg / NYT / FiveThirtyEight hex-tile convention.
// 11 columns × 7 rows, manually positioned for geographic accuracy.
const TILE_SIZE = 48;
const GAP = 3;
const COLS = 11;
const ROWS = 7;
const TILE_POSITIONS: Record<string, [number, number]> = {
  // Row 0
  AK: [0, 0], ME: [10, 0],
  // Row 1
  WA: [0, 1], ID: [1, 1], MT: [2, 1], ND: [3, 1], MN: [4, 1], IL: [5, 1], WI: [6, 1], MI: [7, 1], NY: [8, 1], RI: [9, 1], MA: [10, 1],
  // Row 2
  OR: [0, 2], NV: [1, 2], WY: [2, 2], SD: [3, 2], IA: [4, 2], IN: [5, 2], OH: [6, 2], PA: [7, 2], NJ: [8, 2], CT: [9, 2], NH: [10, 2],
  // Row 3
  CA: [0, 3], UT: [1, 3], CO: [2, 3], NE: [3, 3], MO: [4, 3], KY: [5, 3], WV: [6, 3], VA: [7, 3], MD: [8, 3], DE: [9, 3], VT: [10, 3],
  // Row 4
  AZ: [1, 4], NM: [2, 4], KS: [3, 4], AR: [4, 4], TN: [5, 4], NC: [6, 4], SC: [7, 4],
  // Row 5
  HI: [0, 5], TX: [2, 5], OK: [3, 5], LA: [4, 5], MS: [5, 5], AL: [6, 5], GA: [7, 5],
  // Row 6
  FL: [7, 6],
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
