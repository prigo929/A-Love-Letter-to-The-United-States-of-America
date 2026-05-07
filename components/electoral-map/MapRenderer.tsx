"use client";
import { useState, useCallback, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import type { ViewMode } from "@/lib/data/electoral-data";
import { getStateData, STATE_ADMISSION, PARTY_COLORS, ELECTORAL_HISTORY } from "@/lib/data/electoral-data";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
function pc(p: string) { return PARTY_COLORS[p] || "#C9A84C"; }

interface MapGeo { rsmKey: string; properties?: { name?: string }; }
interface Tip { x: number; y: number; name: string; party: string; detail: string; }

// ── NYT PROPORTIONAL CARTOGRAM LAYOUT ─────────────────────────────────────
// Static grid positions for each state block, arranged to mimic US geography.
// [col, row] is the top-left anchor of the state's block.
const CARTOGRAM_POS: Record<string, [number, number]> = {
  Washington:[2,1], Oregon:[2,3], California:[1,5], Alaska:[1,10], Hawaii:[3,10],
  Idaho:[3,2], Nevada:[2,4], Montana:[4,1], Wyoming:[4,2], Utah:[3,4], Colorado:[4,3],
  Arizona:[3,6], "New Mexico":[4,6],
  "North Dakota":[6,1], "South Dakota":[6,2], Nebraska:[6,3], Kansas:[6,4],
  Oklahoma:[6,5], Texas:[5,8],
  Minnesota:[7,1], Iowa:[7,3], Missouri:[7,4], Arkansas:[7,6], Louisiana:[7,8],
  Wisconsin:[8,1], Illinois:[8,3], Indiana:[8,4], Kentucky:[9,5], Tennessee:[8,6],
  Mississippi:[8,8], Alabama:[9,8],
  Michigan:[9,1], Ohio:[10,3], "West Virginia":[10,5], Virginia:[11,5],
  "North Carolina":[12,6], "South Carolina":[11,7], Georgia:[10,7], Florida:[10,9],
  "New York":[11,2], Pennsylvania:[10,3], "New Jersey":[13,4], Delaware:[13,5],
  Maryland:[12,5], Connecticut:[13,3], "Rhode Island":[14,3],
  Massachusetts:[13,1], "New Hampshire":[13,0], Vermont:[12,0], Maine:[14,0],
};

// Build squares for the cartogram
const SQ = 11; // square size in SVG units
const GAP = 1.5; // gap between squares within a state
const STATE_GAP = 4; // gap between state blocks

interface CartogramSquare {
  x: number; y: number; color: string; state: string; idx: number;
}

function buildCartogram(year: number): { squares: CartogramSquare[]; labels: { x: number; y: number; text: string; state: string }[] } {
  const yd = ELECTORAL_HISTORY.find((d) => d.year === year) || ELECTORAL_HISTORY[0];
  const squares: CartogramSquare[] = [];
  const labels: { x: number; y: number; text: string; state: string }[] = [];

  for (const [name, [gc, gr]] of Object.entries(CARTOGRAM_POS)) {
    const sd = yd.states[name];
    if (!sd) continue;
    const total = sd.house.totalReps;
    if (total <= 0) continue;

    // Block layout: arrange squares in rows
    const cols = Math.ceil(Math.sqrt(total * 1.2));
    const baseX = gc * (SQ + STATE_GAP) * 2.2;
    const baseY = gr * (SQ + STATE_GAP) * 1.8;

    for (let i = 0; i < total; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const isDem = i < sd.house.demReps;
      squares.push({
        x: baseX + col * (SQ + GAP),
        y: baseY + row * (SQ + GAP),
        color: isDem ? pc("DEM") : pc("REP"),
        state: name,
        idx: i,
      });
    }

    // State label below the block
    const rows = Math.ceil(total / cols);
    const abbrevs: Record<string, string> = {
      Alabama:"Ala.",Alaska:"Alaska",Arizona:"Ariz.",Arkansas:"Ark.",California:"Calif.",
      Colorado:"Colo.",Connecticut:"Conn.",Delaware:"Del.",Florida:"Fla.",Georgia:"Ga.",
      Hawaii:"Hawaii",Idaho:"Idaho",Illinois:"Ill.",Indiana:"Ind.",Iowa:"Iowa",Kansas:"Kan.",
      Kentucky:"Ky.",Louisiana:"La.",Maine:"Maine",Maryland:"Md.",Massachusetts:"Mass.",
      Michigan:"Mich.",Minnesota:"Minn.",Mississippi:"Miss.",Missouri:"Mo.",Montana:"Mont.",
      Nebraska:"Neb.",Nevada:"Nev.","New Hampshire":"N.H.","New Jersey":"N.J.",
      "New Mexico":"N.M.","New York":"N.Y.","North Carolina":"N.C.","North Dakota":"N.D.",
      Ohio:"Ohio",Oklahoma:"Okla.",Oregon:"Ore.",Pennsylvania:"Pa.","Rhode Island":"R.I.",
      "South Carolina":"S.C.","South Dakota":"S.D.",Tennessee:"Tenn.",Texas:"Texas",
      Utah:"Utah",Vermont:"Vt.",Virginia:"Va.",Washington:"Wash.",
      "West Virginia":"W.Va.",Wisconsin:"Wis.",Wyoming:"Wyo.",
    };
    labels.push({
      x: baseX + (cols * (SQ + GAP) - GAP) / 2,
      y: baseY + rows * (SQ + GAP) + 6,
      text: abbrevs[name] || name,
      state: name,
    });
  }

  return { squares, labels };
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────

export function MapRenderer({
  year, viewMode, onStateClick,
}: { year: number; viewMode: ViewMode; onStateClick?: (n: string) => void; }) {
  const [tip, setTip] = useState<Tip | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const isHouse = viewMode === "House";

  const cartogram = useMemo(() => isHouse ? buildCartogram(year) : null, [year, isHouse]);

  const onGeoEnter = useCallback((geo: MapGeo, evt: React.MouseEvent<SVGPathElement>) => {
    const name = geo.properties?.name ?? "";
    const data = getStateData(year, name);
    setHovered(name);
    const admitted = STATE_ADMISSION[name];
    const admitStr = admitted ? ` · Est. ${admitted}` : "";
    let party = "", detail = "";
    if (viewMode === "President") { party = data.president.party; detail = (data.president.flipped ? "⟳ Flipped" : party) + admitStr; }
    else if (viewMode === "Senate") { party = data.senate.party1; detail = (data.senate.split ? `${data.senate.party1}/${data.senate.party2}` : data.senate.party1) + admitStr; }
    else { party = data.governor.party; detail = party + admitStr; }
    setTip({ x: evt.clientX, y: evt.clientY, name, party, detail });
  }, [year, viewMode]);

  const onSquareEnter = useCallback((name: string, evt: React.MouseEvent) => {
    const data = getStateData(year, name);
    setHovered(name);
    const detail = `${name}: ${data.house.demReps} DEM, ${data.house.repReps} REP`;
    const party = data.house.demReps > data.house.repReps ? "DEM" : "REP";
    setTip({ x: evt.clientX, y: evt.clientY, name, party, detail });
  }, [year]);

  return (
    <div className="relative w-full" onMouseMove={(e) => setTip(p => p ? { ...p, x: e.clientX, y: e.clientY } : null)}>
      {/* Geographic map (President, Senate, Governor) */}
      <AnimatePresence>
        {!isHouse && (
          <motion.div
            key="geo-map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ComposableMap projection="geoAlbersUsa" projectionConfig={{ scale: 1000 }} style={{ width: "100%", height: "auto" }}>
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

                    let fill = "#1A1F3A", stroke = "#080B12", sw = 0.5, dash = "";
                    if (isTerritory) {
                      fill = "none"; stroke = "rgba(201,168,76,0.12)"; dash = "2,2";
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
                        onMouseEnter={(evt: React.MouseEvent<SVGPathElement>) => onGeoEnter(geo, evt)}
                        onMouseLeave={() => { setHovered(null); setTip(null); }}
                        onClick={() => onStateClick?.(name)}
                        style={{
                          default: {
                            fill, stroke: isHov ? "#FFFFFF" : stroke, strokeWidth: isHov ? 1.2 : sw,
                            strokeDasharray: dash, outline: "none",
                            opacity: dimmed ? 0.3 : 1,
                            transition: "opacity 0.2s ease, fill 0.5s ease, stroke 0.15s ease",
                          },
                          hover: { fill, stroke: "#FFFFFF", strokeWidth: 1.2, strokeDasharray: dash, outline: "none", cursor: "pointer", opacity: 1 },
                          pressed: { fill, outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NYT Proportional Cartogram (House view) */}
      <AnimatePresence>
        {isHouse && cartogram && (
          <motion.div
            key="cartogram"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <svg
              viewBox="0 0 420 320"
              className="w-full"
              style={{ maxHeight: "65vh" }}
            >
              {/* Squares */}
              {cartogram.squares.map((sq, i) => {
                const isHov = hovered === sq.state;
                const dimmed = hovered && !isHov;
                return (
                  <motion.rect
                    key={`${sq.state}-${sq.idx}`}
                    x={sq.x} y={sq.y}
                    width={SQ} height={SQ}
                    fill={sq.color}
                    rx={0.5}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: dimmed ? 0.25 : 1,
                    }}
                    transition={{
                      scale: { duration: 0.4, delay: Math.min(i * 0.002, 0.6) },
                      opacity: { duration: 0.15 },
                    }}
                    style={{ cursor: "pointer", transformOrigin: `${sq.x + SQ/2}px ${sq.y + SQ/2}px` }}
                    onMouseEnter={(e) => onSquareEnter(sq.state, e)}
                    onMouseLeave={() => { setHovered(null); setTip(null); }}
                    onClick={() => onStateClick?.(sq.state)}
                  />
                );
              })}
              {/* State labels */}
              {cartogram.labels.map((lb) => (
                <text key={lb.state} x={lb.x} y={lb.y} textAnchor="middle"
                  fill={hovered === lb.state ? "#F5F0E8" : "#6B6860"}
                  fontSize="4.5" fontFamily="'Inter',sans-serif" fontWeight="600"
                  style={{ transition: "fill 0.15s ease", pointerEvents: "none" }}>
                  {lb.text}
                </text>
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      {tip && (
        <div className="pointer-events-none fixed z-50"
          style={{ left: Math.min(tip.x + 12, typeof window !== "undefined" ? window.innerWidth - 220 : 800), top: Math.max(tip.y - 60, 8) }}>
          <div className="border border-[rgba(201,168,76,0.2)] bg-[#080B12]/97 px-3 py-2 backdrop-blur-sm" style={{ minWidth: 170 }}>
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
