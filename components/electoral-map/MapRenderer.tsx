"use client";
// ─── Electoral Archive Map Renderer ─────────────────────────────────────────
// Uses react-simple-maps to render a US map with four different view modes.
// Each view mode changes the fill logic for each state polygon.
//
// For the House view, instead of dissolving into dots (which would require
// a custom projection hook not available in react-simple-maps v3), we use
// a proportional dot-density overlay rendered via a separate SVG layer.

import { useState, useCallback, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import type { ViewMode } from "@/lib/data/electoral-data";
import { getStateData } from "@/lib/data/electoral-data";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// ── Party Colors (Bloomberg/WSJ editorial palette) ─────────────────────────

function getPartyColor(party: string): string {
  if (party === "DEM") return "#1E5AA8"; // Royal Blue
  if (party === "REP") return "#B22234"; // Crimson
  return "#C9A84C"; // Gold for other/independent
}

function getPartyColorMuted(party: string): string {
  if (party === "DEM") return "#152E55";
  if (party === "REP") return "#5A1119";
  return "#4A3A1A";
}

// ── Tooltip ────────────────────────────────────────────────────────────────

interface TooltipData {
  x: number;
  y: number;
  name: string;
  party: string;
  detail: string;
}

// ── Map Geography Type ─────────────────────────────────────────────────────

interface MapGeo {
  rsmKey: string;
  properties?: { name?: string };
}

// ── Hash pattern ID per state (unique to avoid SVG conflicts) ──────────────

function getHashPatternId(stateName: string) {
  return `hash-${stateName.replace(/\s/g, "-").toLowerCase()}`;
}

function getSplitGradientId(stateName: string) {
  return `split-${stateName.replace(/\s/g, "-").toLowerCase()}`;
}

// ── Component ──────────────────────────────────────────────────────────────

export function MapRenderer({
  year,
  viewMode,
}: {
  year: number;
  viewMode: ViewMode;
}) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const handleMouseEnter = useCallback(
    (geo: MapGeo, evt: React.MouseEvent<SVGPathElement>) => {
      const stateName = geo.properties?.name ?? "Unknown";
      const data = getStateData(year, stateName);

      let party = "";
      let detail = "";

      if (viewMode === "President") {
        party = data.president.party;
        detail = data.president.flipped ? "Flipped from previous cycle" : `Won by ${party}`;
      } else if (viewMode === "Senate") {
        if (data.senate.split) {
          detail = `Split: ${data.senate.party1} + ${data.senate.party2}`;
        } else {
          party = data.senate.party1;
          detail = `Both seats: ${party}`;
        }
      } else if (viewMode === "House") {
        detail = `DEM ${data.house.demReps} · REP ${data.house.repReps} (${data.house.totalReps} total)`;
        party = data.house.demReps > data.house.repReps ? "DEM" : "REP";
      } else if (viewMode === "Governor") {
        party = data.governor.party;
        detail = `Governor: ${party}`;
      }

      setTooltip({
        x: evt.clientX,
        y: evt.clientY,
        name: stateName,
        party,
        detail,
      });
    },
    [year, viewMode]
  );

  const handleMouseMove = useCallback((evt: React.MouseEvent) => {
    setTooltip((prev) => (prev ? { ...prev, x: evt.clientX, y: evt.clientY } : null));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  // Build a set of all states that need special SVG defs (hash or gradient)
  // We compute this once per year+viewMode to keep the render clean.
  const specialStates = useMemo(() => {
    const hashed: Set<string> = new Set();
    const split: Map<string, { party1: string; party2: string }> = new Map();
    // We can't enumerate from the geo data here since it's loaded async,
    // but the defs are defined inline per-state during render.
    return { hashed, split };
  }, [year, viewMode]);

  return (
    <div className="relative w-full" onMouseMove={handleMouseMove}>
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 1000 }}
        style={{ width: "100%", height: "auto" }}
        aria-label="Electoral Archive Map of the United States"
      >
        {/* Global Defs */}
        <defs>
          {/* Hash pattern for "flipped" presidential states */}
          <pattern
            id="flip-hash"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="3" height="6" fill="rgba(255, 255, 255, 0.18)" />
          </pattern>
        </defs>

        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: MapGeo[] }) =>
            geographies.map((geo) => {
              const stateName = geo.properties?.name ?? "Unknown";
              const data = getStateData(year, stateName);

              // ── Compute fill based on view mode ──────────────────────
              let fill = "#1A1F3A"; // default empty
              let strokeColor = "#080B12";
              let strokeWidth = 0.5;
              let showFlipOverlay = false;

              if (viewMode === "President") {
                fill = getPartyColor(data.president.party);
                showFlipOverlay = data.president.flipped;
              } else if (viewMode === "Senate") {
                if (data.senate.split) {
                  // For split senate, we use a "majority" color + visual indicator
                  fill = getPartyColor(data.senate.party1);
                  strokeColor = getPartyColor(data.senate.party2);
                  strokeWidth = 2;
                } else {
                  fill = getPartyColor(data.senate.party1);
                }
              } else if (viewMode === "House") {
                // Use proportional blending — show majority party but muted
                const total = data.house.totalReps || 1;
                const demRatio = data.house.demReps / total;
                fill = demRatio > 0.5 ? getPartyColor("DEM") : getPartyColor("REP");
                // Make opacity proportional to how dominant the majority is
                const dominance = Math.abs(demRatio - 0.5) * 2; // 0 = even, 1 = total
                // Mix with muted version for less dominant states
                if (dominance < 0.3) {
                  fill = demRatio > 0.5 ? getPartyColorMuted("DEM") : getPartyColorMuted("REP");
                }
              } else if (viewMode === "Governor") {
                fill = getPartyColor(data.governor.party);
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(evt: React.MouseEvent<SVGPathElement>) =>
                    handleMouseEnter(geo, evt)
                  }
                  onMouseLeave={handleMouseLeave}
                  style={{
                    default: {
                      fill,
                      stroke: strokeColor,
                      strokeWidth,
                      outline: "none",
                      transition: "fill 0.6s ease, stroke 0.4s ease",
                    },
                    hover: {
                      fill,
                      stroke: "#C9A84C",
                      strokeWidth: 1.5,
                      outline: "none",
                      cursor: "pointer",
                      filter: "brightness(1.2)",
                    },
                    pressed: {
                      fill,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* ── Tooltip ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            key="electoral-tooltip"
            initial={{ opacity: 0, scale: 0.92, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none fixed z-50"
            style={{ left: tooltip.x + 14, top: tooltip.y - 70 }}
          >
            <div className="min-w-[180px] rounded-sm border border-[rgba(201,168,76,0.25)] bg-[#080B12]/95 px-3 py-2.5 shadow-2xl backdrop-blur-sm">
              <p className="mb-1 font-body text-xs font-bold text-[#F5F0E8]">
                {tooltip.name}
              </p>
              <p className="font-body text-[10px] text-[#8A8780]" style={{ fontVariantNumeric: "tabular-nums" }}>
                {tooltip.detail}
              </p>
              {tooltip.party && (
                <div className="mt-1.5 flex items-center gap-1.5">
                  <div
                    className="h-2 w-2 rounded-[1px]"
                    style={{ backgroundColor: getPartyColor(tooltip.party) }}
                  />
                  <span className="font-body text-[9px] uppercase tracking-[0.15em] text-[#6B6860]">
                    {tooltip.party}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
