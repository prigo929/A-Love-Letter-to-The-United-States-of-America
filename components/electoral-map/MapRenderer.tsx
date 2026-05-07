"use client";
import { useState, useCallback, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Marker } = require("react-simple-maps") as { Marker: React.ComponentType<{ coordinates: [number, number]; children: React.ReactNode }> };
import { motion, AnimatePresence } from "framer-motion";
import type { ViewMode } from "@/lib/data/electoral-data";
import { getStateData, STATE_CENTROIDS, ELECTORAL_HISTORY, PARTY_COLORS, STATE_ADMISSION } from "@/lib/data/electoral-data";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
function pc(p: string) { return PARTY_COLORS[p] || "#C9A84C"; }

interface MapGeo { rsmKey: string; properties?: { name?: string }; }
interface Tip { x: number; y: number; name: string; party: string; detail: string; }

// Rigid hexagonal grid packing for House view
function rigidGrid(cx: number, cy: number, n: number): [number, number][] {
  if (n <= 0) return [];
  if (n === 1) return [[cx, cy]];
  const cols = Math.ceil(Math.sqrt(n * 1.3));
  const rows = Math.ceil(n / cols);
  const sp = 0.45; // geographic spacing in degrees
  const pts: [number, number][] = [];
  let count = 0;
  for (let r = 0; r < rows && count < n; r++) {
    const rowOffset = r % 2 === 1 ? sp * 0.5 : 0;
    const colsInRow = Math.min(cols, n - count);
    for (let c = 0; c < colsInRow && count < n; c++) {
      const x = cx + (c - (colsInRow - 1) / 2) * sp + rowOffset;
      const y = cy + (r - (rows - 1) / 2) * (sp * 0.866);
      pts.push([x, y]);
      count++;
    }
  }
  return pts;
}

function buildHouseDots(year: number) {
  const yd = ELECTORAL_HISTORY.find((d) => d.year === year) || ELECTORAL_HISTORY[0];
  const dots: { lon: number; lat: number; color: string; id: string }[] = [];
  let idx = 0;
  for (const [name, centroid] of Object.entries(STATE_CENTROIDS)) {
    const sd = yd.states[name];
    if (!sd || sd.house.totalReps <= 0) continue;
    // Skip states not yet admitted
    if (STATE_ADMISSION[name] && STATE_ADMISSION[name] > year) continue;
    const grid = rigidGrid(centroid[0], centroid[1], sd.house.totalReps);
    for (let i = 0; i < grid.length; i++) {
      dots.push({
        lon: grid[i][0], lat: grid[i][1],
        color: i < sd.house.demReps ? pc(sd.senate.party1 === "DEM" ? "DEM" : "DEM") : pc("REP"),
        id: `d${idx++}`,
      });
    }
    // Re-color correctly: first demReps are DEM-colored
    const startIdx = idx - grid.length;
    for (let i = 0; i < grid.length; i++) {
      dots[startIdx + i].color = i < sd.house.demReps ? pc("DEM") : pc("REP");
    }
  }
  return dots;
}

export function MapRenderer({
  year, viewMode, onStateClick,
}: { year: number; viewMode: ViewMode; onStateClick?: (n: string) => void; }) {
  const [tip, setTip] = useState<Tip | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const isHouse = viewMode === "House";
  const houseDots = useMemo(() => isHouse ? buildHouseDots(year) : [], [year, isHouse]);

  const onEnter = useCallback((geo: MapGeo, evt: React.MouseEvent<SVGPathElement>) => {
    const name = geo.properties?.name ?? "";
    const data = getStateData(year, name);
    setHovered(name);
    let party = "", detail = "";
    const admitted = STATE_ADMISSION[name];
    const admitStr = admitted ? ` · Est. ${admitted}` : "";
    if (viewMode === "President") { party = data.president.party; detail = (data.president.flipped ? "⟳ Flipped" : party) + admitStr; }
    else if (viewMode === "Senate") { party = data.senate.party1; detail = (data.senate.split ? `${data.senate.party1}/${data.senate.party2}` : data.senate.party1) + admitStr; }
    else if (viewMode === "House") { party = data.house.demReps > data.house.repReps ? "DEM" : "REP"; detail = `D${data.house.demReps} R${data.house.repReps}` + admitStr; }
    else { party = data.governor.party; detail = party + admitStr; }
    setTip({ x: evt.clientX, y: evt.clientY, name, party, detail });
  }, [year, viewMode]);

  return (
    <div className="relative w-full" onMouseMove={(e) => setTip(p => p ? { ...p, x: e.clientX, y: e.clientY } : null)}>
      <ComposableMap projection="geoAlbersUsa" projectionConfig={{ scale: 1000 }} style={{ width: "100%", height: "auto" }}>
        {/* Senate diagonal split pattern (objectBoundingBox = per-state) */}
        <defs>
          <pattern id="split-dr" width="1" height="1" patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox">
            <polygon points="0,0 1,0 0,1" fill={pc("DEM")} />
            <polygon points="1,0 1,1 0,1" fill={pc("REP")} />
          </pattern>
          <pattern id="split-rd" width="1" height="1" patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox">
            <polygon points="0,0 1,0 0,1" fill={pc("REP")} />
            <polygon points="1,0 1,1 0,1" fill={pc("DEM")} />
          </pattern>
        </defs>

        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: MapGeo[] }) =>
            geographies.map((geo) => {
              const name = geo.properties?.name ?? "";
              const data = getStateData(year, name);
              const admitted = STATE_ADMISSION[name] || 1787;
              const isTerritory = admitted > year;
              const isHov = hovered === name;
              const dimmed = hovered && !isHov;

              let fill = "#1A1F3A";
              let stroke = "#080B12";
              let sw = 0.5;
              let dashArray = "";

              if (isTerritory) {
                fill = "none"; stroke = "rgba(201,168,76,0.12)"; sw = 0.5; dashArray = "2,2";
              } else if (isHouse) {
                fill = "#0A0D14"; stroke = "rgba(201,168,76,0.05)"; sw = 0.3;
              } else if (viewMode === "President") {
                fill = pc(data.president.party);
              } else if (viewMode === "Senate") {
                fill = data.senate.split
                  ? (data.senate.party1 === "DEM" ? "url(#split-dr)" : "url(#split-rd)")
                  : pc(data.senate.party1);
              } else {
                fill = pc(data.governor.party);
              }

              return (
                <Geography key={geo.rsmKey} geography={geo}
                  onMouseEnter={(evt: React.MouseEvent<SVGPathElement>) => onEnter(geo, evt)}
                  onMouseLeave={() => { setHovered(null); setTip(null); }}
                  onClick={() => onStateClick?.(name)}
                  style={{
                    default: {
                      fill, stroke: isHov ? "#FFFFFF" : stroke, strokeWidth: isHov ? 1.2 : sw,
                      strokeDasharray: dashArray, outline: "none",
                      opacity: dimmed ? 0.3 : 1,
                      transition: "opacity 0.2s ease, fill 0.5s ease, stroke 0.15s ease",
                    },
                    hover: {
                      fill, stroke: "#FFFFFF", strokeWidth: 1.2, strokeDasharray: dashArray,
                      outline: "none", cursor: "pointer", opacity: 1,
                    },
                    pressed: { fill, outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* House rigid dot grid */}
        {isHouse && houseDots.map((d) => (
          <Marker key={d.id} coordinates={[d.lon, d.lat]}>
            <circle r={2} fill={d.color} opacity={0.92} />
          </Marker>
        ))}
      </ComposableMap>

      {/* Tooltip: sharp, dark, no bounce */}
      {tip && (
        <div className="pointer-events-none fixed z-50"
          style={{ left: Math.min(tip.x + 12, typeof window !== "undefined" ? window.innerWidth - 200 : 800), top: Math.max(tip.y - 60, 8) }}>
          <div className="border border-[rgba(201,168,76,0.2)] bg-[#080B12]/97 px-3 py-2 backdrop-blur-sm" style={{ minWidth: 160 }}>
            <p className="font-body text-[11px] font-bold tracking-wide text-[#F5F0E8]">{tip.name}</p>
            <p className="mt-0.5 font-mono text-[10px] text-[#8A8780]">{tip.detail}</p>
            {tip.party && (
              <div className="mt-1 flex items-center gap-1.5">
                <div className="h-[6px] w-[6px]" style={{ background: pc(tip.party) }} />
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#6B6860]">{tip.party}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
