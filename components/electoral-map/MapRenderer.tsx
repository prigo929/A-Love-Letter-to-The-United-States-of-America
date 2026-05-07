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

// ── NYT CARTOGRAM: HAND-PLACED STATE ANCHORS ─────────────────────────────
// Each state has a pixel-precise anchor [x, y] in a 1200×800 viewBox.
// Spacing guarantees zero overlap even for the largest blocks (CA: 52 reps).
const SQ = 10;   // square size
const GAP = 2;    // gap within state
const CELL = SQ + GAP; // 12px per cell

// Custom column counts for shaping large states (Tetris-like)
const STATE_COLS: Record<string, number> = {
  California: 7, Texas: 7, Florida: 7, "New York": 6, Pennsylvania: 5,
  Illinois: 5, Ohio: 4, Georgia: 4, "North Carolina": 4, Michigan: 4,
  "New Jersey": 4, Virginia: 4, Washington: 4, Massachusetts: 3, Tennessee: 3,
  Indiana: 3, Arizona: 3, Missouri: 3, Maryland: 3, Wisconsin: 3,
  Colorado: 3, Minnesota: 3, "South Carolina": 3, Alabama: 3,
};

// Pixel anchors: [x, y] for each state's top-left corner.
// Positioned to mimic US geography with guaranteed non-overlapping bounding boxes.
const ANCHORS: Record<string, [number, number]> = {
  // Pacific
  Washington:  [95,  40],
  Oregon:      [75, 140],
  California:  [25, 260],
  // Mountain
  Idaho:       [200, 90],
  Montana:     [300, 50],
  Wyoming:     [300, 120],
  Nevada:      [150, 220],
  Utah:        [225, 200],
  Colorado:    [310, 190],
  Arizona:     [210, 350],
  "New Mexico":[295, 310],
  // Plains
  "North Dakota": [430, 50],
  "South Dakota": [430, 100],
  Nebraska:       [430, 160],
  Kansas:         [430, 230],
  Oklahoma:       [430, 310],
  Texas:          [370, 410],
  // Midwest
  Minnesota:  [525, 60],
  Iowa:       [530, 170],
  Missouri:   [545, 270],
  Arkansas:   [555, 380],
  Louisiana:  [600, 470],
  Wisconsin:  [620, 70],
  Illinois:   [620, 170],
  Indiana:    [690, 220],
  Kentucky:   [720, 320],
  Tennessee:  [680, 380],
  Mississippi:[660, 460],
  Alabama:    [730, 440],
  // Great Lakes + East Central
  Michigan:   [720, 80],
  Ohio:       [780, 190],
  "West Virginia": [830, 290],
  // Southeast
  Virginia:   [890, 320],
  "North Carolina": [940, 380],
  "South Carolina": [950, 450],
  Georgia:    [830, 430],
  Florida:    [840, 530],
  // Northeast
  "New York":     [890, 80],
  Pennsylvania:   [850, 185],
  "New Jersey":   [1020, 195],
  Delaware:       [1030, 290],
  Maryland:       [950, 280],
  Connecticut:    [1030, 135],
  "Rhode Island": [1100, 105],
  Massachusetts:  [1030, 60],
  Vermont:        [985, 25],
  "New Hampshire":[1040, 20],
  Maine:          [1100, 20],
  // Non-contiguous
  Alaska: [30, 530],
  Hawaii: [130, 560],
};

// Abbreviation map
const ABBREV: Record<string, string> = {
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

interface CSquare { x: number; y: number; color: string; state: string; idx: number; }
interface CLabel { x: number; y: number; text: string; state: string; }

function buildCartogram(year: number): { squares: CSquare[]; labels: CLabel[] } {
  const yd = ELECTORAL_HISTORY.find((d) => d.year === year) || ELECTORAL_HISTORY[0];
  const squares: CSquare[] = [];
  const labels: CLabel[] = [];

  for (const [name, [ax, ay]] of Object.entries(ANCHORS)) {
    const sd = yd.states[name];
    if (!sd) continue;
    const total = sd.house.totalReps;
    if (total <= 0) continue;

    const cols = STATE_COLS[name] || Math.ceil(Math.sqrt(total));
    let maxY = ay;

    for (let i = 0; i < total; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = ax + col * CELL;
      const y = ay + row * CELL;
      if (y + SQ > maxY) maxY = y + SQ;
      squares.push({
        x, y,
        color: i < sd.house.demReps ? pc("DEM") : pc("REP"),
        state: name,
        idx: i,
      });
    }

    // Label: centered below the block with 10px offset
    const blockW = Math.min(total, cols) * CELL - GAP;
    labels.push({
      x: ax + blockW / 2,
      y: maxY + 12,
      text: ABBREV[name] || name,
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
    setTip({
      x: evt.clientX, y: evt.clientY, name,
      party: data.house.demReps > data.house.repReps ? "DEM" : "REP",
      detail: `${name}: ${data.house.demReps} DEM, ${data.house.repReps} REP`,
    });
  }, [year]);

  const clearHover = useCallback(() => { setHovered(null); setTip(null); }, []);

  return (
    <div className="relative w-full" onMouseMove={(e) => setTip(p => p ? { ...p, x: e.clientX, y: e.clientY } : null)}>

      {/* ── Geographic Map (President / Senate / Governor) ──────────────── */}
      <AnimatePresence>
        {!isHouse && (
          <motion.div key="geo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <ComposableMap projection="geoAlbersUsa" projectionConfig={{ scale: 1000 }} style={{ width: "100%", height: "auto" }}>
              <defs>
                <pattern id="split-dr" width="1" height="1" patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox">
                  <polygon points="0,0 1,0 0,1" fill={pc("DEM")} /><polygon points="1,0 1,1 0,1" fill={pc("REP")} />
                </pattern>
                <pattern id="split-rd" width="1" height="1" patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox">
                  <polygon points="0,0 1,0 0,1" fill={pc("REP")} /><polygon points="1,0 1,1 0,1" fill={pc("DEM")} />
                </pattern>
              </defs>
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: MapGeo[] }) =>
                  geographies.map((geo) => {
                    const name = geo.properties?.name ?? "";
                    const data = getStateData(year, name);
                    const isTerritory = (STATE_ADMISSION[name] || 1787) > year;
                    const isHov = hovered === name;
                    const dimmed = hovered && !isHov;

                    let fill = "#1A1F3A", stroke = "#080B12", sw = 0.5, dash = "";
                    if (isTerritory) { fill = "none"; stroke = "rgba(201,168,76,0.12)"; dash = "2,2"; }
                    else if (viewMode === "President") fill = pc(data.president.party);
                    else if (viewMode === "Senate") fill = data.senate.split ? (data.senate.party1 === "DEM" ? "url(#split-dr)" : "url(#split-rd)") : pc(data.senate.party1);
                    else fill = pc(data.governor.party);

                    return (
                      <Geography key={geo.rsmKey} geography={geo}
                        onMouseEnter={(evt: React.MouseEvent<SVGPathElement>) => onGeoEnter(geo, evt)}
                        onMouseLeave={clearHover} onClick={() => onStateClick?.(name)}
                        style={{
                          default: { fill, stroke: isHov ? "#FFF" : stroke, strokeWidth: isHov ? 1.2 : sw, strokeDasharray: dash, outline: "none", opacity: dimmed ? 0.3 : 1, transition: "opacity 0.2s, fill 0.5s, stroke 0.15s" },
                          hover: { fill, stroke: "#FFF", strokeWidth: 1.2, strokeDasharray: dash, outline: "none", cursor: "pointer", opacity: 1 },
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

      {/* ── NYT Proportional Square Cartogram (House) ──────────────────── */}
      <AnimatePresence>
        {isHouse && cartogram && (
          <motion.div key="carto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <svg viewBox="0 0 1200 650" className="w-full" preserveAspectRatio="xMidYMid meet">
              {/* Squares */}
              {cartogram.squares.map((sq, i) => {
                const dimmed = hovered !== null && hovered !== sq.state;
                return (
                  <motion.rect key={`${sq.state}-${sq.idx}`}
                    x={sq.x} y={sq.y} width={SQ} height={SQ} rx={1}
                    fill={sq.color}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: dimmed ? 0.2 : 1 }}
                    transition={{ scale: { duration: 0.35, delay: Math.min(i * 0.002, 0.7) }, opacity: { duration: 0.12 } }}
                    style={{ cursor: "pointer", transformOrigin: `${sq.x + SQ / 2}px ${sq.y + SQ / 2}px` }}
                    onMouseEnter={(e) => onSquareEnter(sq.state, e)}
                    onMouseLeave={clearHover}
                    onClick={() => onStateClick?.(sq.state)}
                  />
                );
              })}
              {/* Labels */}
              {cartogram.labels.map((lb) => (
                <text key={`lbl-${lb.state}`} x={lb.x} y={lb.y} textAnchor="middle"
                  fill={hovered === lb.state ? "#F5F0E8" : "#666"}
                  fontSize="9" fontFamily="Inter, system-ui, sans-serif" fontWeight="600"
                  style={{ transition: "fill 0.15s", pointerEvents: "none", userSelect: "none" }}>
                  {lb.text}
                </text>
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Tooltip ────────────────────────────────────────────────────── */}
      {tip && (
        <div className="pointer-events-none fixed z-50"
          style={{ left: Math.min(tip.x + 12, typeof window !== "undefined" ? window.innerWidth - 230 : 800), top: Math.max(tip.y - 56, 8) }}>
          <div className="border border-[rgba(201,168,76,0.2)] bg-[#080B12]/97 px-3 py-2 backdrop-blur-sm" style={{ minWidth: 180 }}>
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
