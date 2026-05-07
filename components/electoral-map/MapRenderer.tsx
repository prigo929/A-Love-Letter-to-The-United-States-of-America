"use client";
import { useState, useCallback, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// Marker is exported at runtime but missing from v3 type declarations
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Marker } = require("react-simple-maps") as { Marker: React.ComponentType<{ coordinates: [number, number]; children: React.ReactNode }> };
import { motion, AnimatePresence } from "framer-motion";
import type { ViewMode } from "@/lib/data/electoral-data";
import { getStateData, STATE_CENTROIDS, ELECTORAL_HISTORY } from "@/lib/data/electoral-data";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

function partyColor(p: string) { return p === "DEM" ? "#1E5AA8" : p === "REP" ? "#B22234" : "#C9A84C"; }
function partyMuted(p: string) { return p === "DEM" ? "#152E55" : p === "REP" ? "#5A1119" : "#4A3A1A"; }

interface MapGeo { rsmKey: string; properties?: { name?: string }; }
interface TooltipData { x: number; y: number; name: string; party: string; detail: string; }

// Sunflower spiral packing: distributes N points around a center
function sunflowerPack(cx: number, cy: number, n: number, spacing: number): [number, number][] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const r = spacing * Math.sqrt(i);
    const theta = i * golden;
    pts.push([cx + r * Math.cos(theta), cy + r * Math.sin(theta)]);
  }
  return pts;
}

// Generate all 435 representative dots grouped by state
function buildHouseDots(year: number) {
  const dots: { x: number; y: number; color: string; state: string; id: string }[] = [];
  const yd = ELECTORAL_HISTORY.find((d) => d.year === year) || ELECTORAL_HISTORY[0];
  let globalIdx = 0;

  for (const [name, centroid] of Object.entries(STATE_CENTROIDS)) {
    const sd = yd.states[name];
    if (!sd) continue;
    const total = sd.house.totalReps;
    if (total <= 0) continue;

    // Scale spacing based on total reps — fewer reps = tighter cluster
    const spacing = total > 20 ? 0.25 : total > 10 ? 0.35 : total > 3 ? 0.5 : 0.3;
    const positions = sunflowerPack(centroid[0], centroid[1], total, spacing);

    // First N=demReps are DEM, rest are REP
    for (let i = 0; i < total; i++) {
      const isDem = i < sd.house.demReps;
      dots.push({
        x: positions[i][0],
        y: positions[i][1],
        color: isDem ? partyColor("DEM") : partyColor("REP"),
        state: name,
        id: `dot-${globalIdx++}`,
      });
    }
  }
  return dots;
}

export function MapRenderer({
  year, viewMode, onStateClick,
}: {
  year: number; viewMode: ViewMode; onStateClick?: (name: string) => void;
}) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const isHouse = viewMode === "House";

  // Memoize the 435 dots
  const houseDots = useMemo(() => isHouse ? buildHouseDots(year) : [], [year, isHouse]);

  const handleEnter = useCallback((geo: MapGeo, evt: React.MouseEvent<SVGPathElement>) => {
    const name = geo.properties?.name ?? "Unknown";
    const data = getStateData(year, name);
    let party = "", detail = "";
    if (viewMode === "President") {
      party = data.president.party;
      detail = data.president.flipped ? "Flipped from previous cycle" : `Won by ${party}`;
    } else if (viewMode === "Senate") {
      detail = data.senate.split ? `Split: ${data.senate.party1} + ${data.senate.party2}` : `Both: ${data.senate.party1}`;
      party = data.senate.party1;
    } else if (viewMode === "House") {
      detail = `DEM ${data.house.demReps} · REP ${data.house.repReps}`;
      party = data.house.demReps > data.house.repReps ? "DEM" : "REP";
    } else {
      party = data.governor.party; detail = `Governor: ${party}`;
    }
    setTooltip({ x: evt.clientX, y: evt.clientY, name, party, detail });
  }, [year, viewMode]);

  const handleMove = useCallback((evt: React.MouseEvent) => {
    setTooltip((p) => p ? { ...p, x: evt.clientX, y: evt.clientY } : null);
  }, []);

  return (
    <div className="relative w-full" onMouseMove={handleMove}>
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 1000 }}
        style={{ width: "100%", height: "auto" }}
        aria-label="Electoral Archive Map"
      >
        {/* State polygons */}
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: MapGeo[] }) =>
            geographies.map((geo) => {
              const name = geo.properties?.name ?? "Unknown";
              const data = getStateData(year, name);
              let fill = "#1A1F3A", stroke = "#080B12", sw = 0.5;

              if (!isHouse) {
                if (viewMode === "President") fill = partyColor(data.president.party);
                else if (viewMode === "Senate") {
                  fill = partyColor(data.senate.party1);
                  if (data.senate.split) { stroke = partyColor(data.senate.party2); sw = 2; }
                } else fill = partyColor(data.governor.party);
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(evt: React.MouseEvent<SVGPathElement>) => handleEnter(geo, evt)}
                  onMouseLeave={() => setTooltip(null)}
                  onClick={() => onStateClick?.(name)}
                  style={{
                    default: {
                      fill: isHouse ? "#0d1117" : fill,
                      stroke: isHouse ? "rgba(201,168,76,0.06)" : stroke,
                      strokeWidth: isHouse ? 0.3 : sw,
                      outline: "none",
                      opacity: isHouse ? 0.3 : 1,
                      transition: "fill 0.6s ease, opacity 0.6s ease, stroke 0.4s ease",
                    },
                    hover: {
                      fill: isHouse ? "#0d1117" : fill,
                      stroke: "#C9A84C",
                      strokeWidth: isHouse ? 0.5 : 1.5,
                      outline: "none",
                      cursor: "pointer",
                      opacity: isHouse ? 0.4 : 1,
                      filter: isHouse ? "none" : "brightness(1.2)",
                    },
                    pressed: { fill: isHouse ? "#0d1117" : fill, outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* House dot-density layer: 435 representative dots */}
        {isHouse && houseDots.map((dot, i) => (
          <Marker key={dot.id} coordinates={[dot.x, dot.y]}>
            <motion.circle
              r={dot.state === "California" || dot.state === "Texas" ? 2 : dot.state === "Florida" || dot.state === "New York" ? 2.2 : 2.5}
              fill={dot.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.002, 0.8) }}
              style={{ filter: "drop-shadow(0 0 1px rgba(0,0,0,0.5))" }}
            />
          </Marker>
        ))}
      </ComposableMap>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            key="tip"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.1 }}
            className="pointer-events-none fixed z-50"
            style={{ left: Math.min(tooltip.x + 14, typeof window !== "undefined" ? window.innerWidth - 200 : 800), top: Math.max(tooltip.y - 70, 10) }}
          >
            <div className="min-w-[170px] rounded-sm border border-[rgba(201,168,76,0.25)] bg-[#080B12]/95 px-3 py-2 shadow-2xl backdrop-blur-sm">
              <p className="mb-0.5 font-body text-xs font-bold text-[#F5F0E8]">{tooltip.name}</p>
              <p className="font-body text-[10px] text-[#8A8780]" style={{ fontVariantNumeric: "tabular-nums" }}>{tooltip.detail}</p>
              {tooltip.party && (
                <div className="mt-1 flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-[1px]" style={{ background: partyColor(tooltip.party) }} />
                  <span className="font-body text-[9px] uppercase tracking-[0.15em] text-[#6B6860]">{tooltip.party}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
