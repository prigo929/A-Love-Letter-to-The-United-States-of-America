"use client";
import { memo, useMemo, useCallback, useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import type { ViewMode } from "@/lib/data/electoral-data";
import { getStateData, getFlipData, STATE_ADMISSION, PARTY_COLORS, ELECTORAL_HISTORY, PARTY_FULL_NAMES, CONGRESS_DATA } from "@/lib/data/electoral-data";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
function pc(p: string) { return PARTY_COLORS[p] || "#C9A84C"; }

/**
 * MapRenderer: The visual engine of the Electoral Archive.
 * 
 * It supports two primary rendering modes:
 * 1. GeographicMap: A standard Albers USA projection using TopoJSON data.
 *    - Handles Presidential (State winner), Senate (split/diagonal), and Governor views.
 * 2. HouseCartogram: A dot-grid representation of the 435 House seats.
 *    - Uses handcrafted ASCII-like shapes to preserve the "look" of states while 
 *      displaying a accurate seat counts.
 */
interface MapGeo { rsmKey: string; properties?: { name?: string }; }
interface Tip { x: number; y: number; name: string; party: string | string[]; detail: string; }

// ── CARTOGRAM CONSTANTS ───────────────────────────────────────────────────
const SQ = 10, GAP = 1, CELL = 11;

const STATE_SHAPES: Record<string, string[]> = {
  "California": [
    "  ##  ",
    " ###  ",
    " #### ",
    " #### ",
    "##### ",
    "##### ",
    "######",
    "######",
    "######",
    " #####",
    "  ####",
    "   ## ",
  ],
  "Texas": [
    "  ####  ",
    " ###### ",
    "########",
    "########",
    " ###### ",
    "  ####  ",
    "   ##   ",
  ],
  "Florida": [
    "###### ",
    "#######",
    " ######",
    "  #####",
    "   ####",
  ],
  "New York": [
    " ######",
    "#######",
    "#######",
    "   ####",
    "     ##",
  ],
  "Pennsylvania": [
    "######",
    "######",
    " #####",
  ],
  "Illinois": [
    " ####",
    "#####",
    "#####",
    " ### ",
  ],
  "Ohio": [
    " ####",
    "#####",
    " ####",
    "  ## ",
  ],
  "Georgia": [
    " ### ",
    "#### ",
    "#### ",
    " ### ",
  ],
  "North Carolina": [
    "  ####",
    "######",
    "####  ",
  ],
  "Michigan": [
    " ##   ",
    "   ## ",
    "  ####",
    " #####",
  ],
  "New Jersey": [
    " ##",
    "###",
    "###",
    "## ",
    "## ",
  ],
  "Virginia": [
    " ####",
    "#####",
    "  ## ",
  ],
  "Washington": [
    " ###",
    "####",
    "### ",
  ],
  "Massachusetts": [
    " ####",
    "#####",
  ],
  "Indiana": [
    "###",
    "###",
    "###",
  ],
  "Tennessee": [
    "#####",
    " ####",
  ],
  "Missouri": [
    "###",
    "###",
    " ##",
  ],
  "Maryland": [
    " ####",
    "#### ",
  ],
  "Wisconsin": [
    "###",
    "###",
    "## ",
  ],
  "Colorado": [
    "####",
    "####",
  ],
  "Minnesota": [
    " ##",
    "###",
    "###",
  ],
  "South Carolina": [
    " ###",
    "####",
  ],
  "Alabama": [
    "##",
    "##",
    "###",
  ],
  "Louisiana": [
    " ##",
    "####",
  ],
  "Kentucky": [
    "####",
    " ## ",
  ],
  "Oregon": [
    "###",
    "###",
  ],
  "Oklahoma": [
    "###",
    " ##",
  ],
  "Connecticut": [
    "###",
    " ##",
  ]
};

function parseShape(shape: string[]): [number, number][] {
  const coords: [number, number][] = [];
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] === "#") coords.push([c, r]);
    }
  }
  return coords;
}

const STATE_COLS: Record<string, number> = {
  California: 6, Texas: 8, Florida: 7, "New York": 7, Pennsylvania: 6, Illinois: 5,
  Ohio: 5, Georgia: 4, "North Carolina": 6, Michigan: 6, "New Jersey": 3, Virginia: 5,
  Washington: 4, Massachusetts: 5, Indiana: 3, Tennessee: 5, Missouri: 3, Maryland: 5,
  Wisconsin: 3, Colorado: 4, Minnesota: 3, "South Carolina": 4, Alabama: 3, Louisiana: 4,
  Kentucky: 4, Oregon: 3, Oklahoma: 3, Connecticut: 3
};

const ANCHORS: Record<string, [number, number]> = {
  Washington:[95,40],Oregon:[75,140],California:[25,260],
  Idaho:[200,90],Montana:[300,50],Wyoming:[300,120],Nevada:[150,220],
  Utah:[225,200],Colorado:[310,190],Arizona:[210,350],"New Mexico":[295,310],
  "North Dakota":[430,50],"South Dakota":[430,100],Nebraska:[430,160],
  Kansas:[430,230],Oklahoma:[430,310],Texas:[370,410],
  Minnesota:[525,60],Iowa:[530,170],Missouri:[545,270],Arkansas:[555,380],
  Louisiana:[600,470],Wisconsin:[620,70],Illinois:[620,170],Indiana:[690,220],
  Kentucky:[720,320],Tennessee:[680,380],Mississippi:[660,460],Alabama:[730,440],
  Michigan:[720,80],Ohio:[780,190],"West Virginia":[830,290],
  Virginia:[890,320],"North Carolina":[940,380],"South Carolina":[950,450],
  Georgia:[830,430],Florida:[840,530],
  "New York":[890,80],Pennsylvania:[850,185],"New Jersey":[1020,195],
  Delaware:[1030,290],Maryland:[950,280],Connecticut:[1030,135],
  "Rhode Island":[1100,105],Massachusetts:[1030,60],Vermont:[985,25],
  "New Hampshire":[1040,20],Maine:[1100,20],
  Alaska:[30,530],Hawaii:[130,560],
};

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

interface CSquare { x: number; y: number; color: string; state: string; idx: number; hasFlipHash: boolean; }
interface CLabel { x: number; y: number; text: string; state: string; }
interface CartoState { name: string; squares: CSquare[]; bbox: { x: number, y: number, w: number, h: number }; label: CLabel; }

interface CartoData { states: CartoState[]; bounds: { x: number; y: number; w: number; h: number; }; }
function buildCartogram(year: number): CartoData {
  const yd = ELECTORAL_HISTORY.find((d) => d.year === year) || ELECTORAL_HISTORY[0];
  const statesArr: CartoState[] = [];
  let gMinX = Infinity, gMaxX = -Infinity, gMinY = Infinity, gMaxY = -Infinity;
  const cd = CONGRESS_DATA[year] || { p1: "DEM", p2: "REP" };
  const p1 = cd.p1, p2 = cd.p2;

  for (const [name, [ax, ay]] of Object.entries(ANCHORS)) {
    const sd = yd.states[name];
    if (!sd) continue;
    const total = sd.house.totalReps;
    if (total <= 0) continue;

    const flip = getFlipData(year, name);
    const cols = STATE_COLS[name] || Math.ceil(Math.sqrt(total));
    let maxY = ay;

    // Fixed Party Order: Ensure "Left/Liberal" parties are always first (top/left) 
    // to prevent visual switching when the national majority (p1/p2) flips.
    const isP1First = (p1 === "DEM" || p1 === "DR" || p1 === "WHIG" || p1 === "PROG");
    const firstParty = isP1First ? p1 : p2;
    const secondParty = isP1First ? p2 : p1;
    const firstReps = isP1First ? sd.house.p1Reps : sd.house.p2Reps;
    const secondReps = isP1First ? sd.house.p2Reps : sd.house.p1Reps;
    
    // FirstParty is always "Left/Dem", SecondParty is always "Right/Rep"
    // So we map houseFlipDem to firstFlip and houseFlipRep to secondFlip
    const firstFlip = flip.houseFlipDem;
    const secondFlip = flip.houseFlipRep;

    const sqDefs: { color: string; hasFlipHash: boolean }[] = [];
    // Hunks of first party (Dems) -> Flip Dem -> Flip Rep -> Hunks of second party (Reps)
    for (let i = 0; i < firstReps - firstFlip; i++) sqDefs.push({ color: pc(firstParty), hasFlipHash: false });
    for (let i = 0; i < firstFlip; i++) sqDefs.push({ color: pc(firstParty), hasFlipHash: true });
    for (let i = 0; i < secondFlip; i++) sqDefs.push({ color: pc(secondParty), hasFlipHash: true });
    for (let i = 0; i < secondReps - secondFlip; i++) sqDefs.push({ color: pc(secondParty), hasFlipHash: false });

    const squares: CSquare[] = [];
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxSqY = -Infinity;
    
    const shapeStrs = STATE_SHAPES[name];
    let customCoords: [number, number][] | null = null;
    if (shapeStrs) customCoords = parseShape(shapeStrs);

    for (let i = 0; i < total; i++) {
      let col = i % cols;
      let row = Math.floor(i / cols);
      
      if (customCoords) {
        if (i < customCoords.length) {
          col = customCoords[i][0];
          row = customCoords[i][1];
        } else {
          // Fallback append for extra historical seats beyond modern shape
          col = (i - customCoords.length) % cols;
          row = shapeStrs.length + Math.floor((i - customCoords.length) / cols);
        }
      }

      const x = ax + col * CELL;
      const y = ay + row * CELL;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x + SQ > maxX) maxX = x + SQ;
      if (y + SQ > maxSqY) maxSqY = y + SQ;
      if (y + SQ > maxY) maxY = y + SQ;

      squares.push({ x, y, color: sqDefs[i].color, state: name, idx: i, hasFlipHash: sqDefs[i].hasFlipHash });
    }

    const w = maxX - minX;
    const h = maxSqY - minY;
    statesArr.push({
      name,
      squares,
      bbox: { x: minX - 2, y: minY - 2, w: w + 4, h: h + 4 },
      label: { x: minX + w / 2, y: maxY + 12, text: ABBREV[name] || name, state: name }
    });

    if (minX < gMinX) gMinX = minX;
    if (minY < gMinY) gMinY = minY;
    if (maxX > gMaxX) gMaxX = maxX;
    if (maxY + 20 > gMaxY) gMaxY = maxY + 20; // +20 for labels
  }
  return { states: statesArr, bounds: { x: gMinX, y: gMinY, w: gMaxX - gMinX, h: gMaxY - gMinY } };
}

// ── SUB-COMPONENTS ──────────────────────────────────────────────────────

const HouseStateGroup = memo(({ cs, isHovered, isDimmed, onMouseEnter, onMouseLeave, onClick }: { 
  cs: any, isHovered: boolean, isDimmed: boolean, 
  onMouseEnter: (e: React.MouseEvent) => void, 
  onMouseLeave: () => void, 
  onClick: () => void 
}) => {
  return (
    <g onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} style={{ cursor: "pointer" }}>
      <rect x={cs.bbox.x} y={cs.bbox.y} width={cs.bbox.w} height={cs.bbox.h} fill="transparent" />
      {cs.squares.map((sq: any) => (
        <g key={`sq-${sq.idx}`}>
          <rect x={sq.x} y={sq.y} width={SQ} height={SQ} rx={1} fill={sq.color} 
            style={{ pointerEvents: "none", opacity: isDimmed ? 0.2 : 1, transition: "opacity 0.12s" }} />
          {sq.hasFlipHash && (
            <rect x={sq.x} y={sq.y} width={SQ} height={SQ} rx={1} fill="url(#flip-hash-sm)" 
              style={{ pointerEvents: "none", opacity: isDimmed ? 0.2 : 1 }} />
          )}
        </g>
      ))}
      <text x={cs.label.x} y={cs.label.y} textAnchor="middle" 
        fill={isHovered ? "#F5F0E8" : "#666"} fontSize="9" fontFamily="Inter, sans-serif" fontWeight="600" 
        style={{ transition: "fill 0.15s", pointerEvents: "none", userSelect: "none", opacity: isDimmed ? 0.2 : 1 }}>
        {cs.label.text}
      </text>
    </g>
  );
});

// ── MAIN COMPONENT ────────────────────────────────────────────────────────

const HouseCartogram = memo(({ data, hovered, onSquareEnter, clearHover, onStateClick }: {
  data: CartoData | null,
  hovered: string | null,
  onSquareEnter: (name: string, e: React.MouseEvent) => void,
  clearHover: () => void,
  onStateClick?: (n: string) => void
}) => {
  if (!data) return null;
  
  const VB_W = 1150, VB_H = 620;
  const scale = 0.92;
  const contentW = data.bounds.w * scale;
  const contentH = data.bounds.h * scale;
  const tx = (VB_W - contentW) / 2 - data.bounds.x * scale;
  const ty = (VB_H - contentH) / 2 - data.bounds.y * scale;

  return (
    <>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="flip-hash-sm" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
          </pattern>
        </defs>
        <g transform={`translate(${tx}, ${ty}) scale(${scale})`}>
          {data.states.map((cs) => (
            <HouseStateGroup
              key={`state-${cs.name}`}
              cs={cs}
              isHovered={hovered === cs.name}
              isDimmed={hovered !== null && hovered !== cs.name}
              onMouseEnter={(e: React.MouseEvent) => onSquareEnter(cs.name, e)}
              onMouseLeave={clearHover}
              onClick={() => onStateClick?.(cs.name)}
            />
          ))}
        </g>
      </svg>
    </>
  );
});

const GeographicMap = memo(({ year, viewMode, hovered, onGeoEnter, clearHover, onStateClick }: {
  year: number,
  viewMode: ViewMode,
  hovered: string | null,
  onGeoEnter: (geo: any, e: React.MouseEvent<SVGPathElement>) => void,
  clearHover: () => void,
  onStateClick?: (n: string) => void
}) => {
  const yd = ELECTORAL_HISTORY.find((d) => d.year === year) || ELECTORAL_HISTORY[0];
  const cd = CONGRESS_DATA[year] || { p1: "DEM", p2: "REP" };
  const p1 = cd.p1, p2 = cd.p2;

  return (
    <>
      <ComposableMap projection="geoAlbersUsa" projectionConfig={{ scale: 1180, translate: [480, 310] }} style={{ width: "100%", height: "auto" }} width={1000} height={600} viewBox="0 0 1000 600">
        <defs>
          <pattern id="split-dr" width="1" height="1" patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox">
            <polygon points="0,0 1,0 0,1" fill={pc(p1)} /><polygon points="1,0 1,1 0,1" fill={pc(p2)} />
          </pattern>
          <pattern id="split-rd" width="1" height="1" patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox">
            <polygon points="0,0 1,0 0,1" fill={pc(p2)} /><polygon points="1,0 1,1 0,1" fill={pc(p1)} />
          </pattern>
          <pattern id="flip-hash" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.22)" strokeWidth="2.5" />
          </pattern>
          {/* clip-half definitions allow for the diagonal "split" delegation look in the Senate view */}
          <clipPath id="clip-half-1" clipPathUnits="objectBoundingBox">
            <polygon points="0,0 1,0 0,1" />
          </clipPath>
          <clipPath id="clip-half-2" clipPathUnits="objectBoundingBox">
            <polygon points="1,0 1,1 0,1" />
          </clipPath>
        </defs>
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: MapGeo[] }) => {
            const elements: React.ReactNode[] = [];
            geographies.forEach((geo) => {
              const name = geo.properties?.name ?? "";
              const data = getStateData(year, name);
              const flip = getFlipData(year, name);
              const isTerritory = (STATE_ADMISSION[name] || 1787) > year;
              const isHov = hovered === name;
              const isActive = viewMode === "Senate" ? data.senate.active : viewMode === "Governor" ? data.governor.active : true;
              const dimmed = hovered && !isHov;
              
              const isOffYear = viewMode === "President" && yd.demPopVote === 0 && !yd.unopposed;
              let targetOpacity = 1;
              if (dimmed) targetOpacity = 0.25;
              else if (!isTerritory && !isActive) targetOpacity = 0.2;

              let fill = "#1A1F3A", stroke = "#080B12", sw = 0.5, dash = "";
              if (isTerritory) { fill = "none"; stroke = "rgba(201,168,76,0.12)"; dash = "2,2"; }
              else {
                if (!isActive) { dash = "3,2"; stroke = "rgba(255,255,255,0.1)"; }
                if (viewMode === "President") {
                  fill = pc(data.president.party);
                  if (isOffYear) { targetOpacity = 0.1; dash = "2,2"; }
                }
                else if (viewMode === "Senate") fill = data.senate.split ? (data.senate.party1 === "DEM" ? "url(#split-dr)" : "url(#split-rd)") : pc(data.senate.party1);
                else fill = pc(data.governor.party);
              }

              let isFlipped = false;
              if (!isTerritory) {
                if (viewMode === "President" && flip.presFlip) isFlipped = true;
                else if (viewMode === "Governor" && flip.govFlip) isFlipped = true;
              }

              let isVacant1 = false;
              let isVacant2 = false;
              let isVacantBoth = false;
              if (viewMode === "Senate" && !isTerritory) {
                isVacant1 = data.senate.party1 === "VACANT";
                isVacant2 = data.senate.party2 === "VACANT";
                isVacantBoth = isVacant1 && isVacant2;
              }

              elements.push(
                <Geography key={geo.rsmKey} geography={geo}
                  onMouseEnter={(evt: React.MouseEvent<SVGPathElement>) => onGeoEnter(geo, evt)}
                  onMouseLeave={clearHover} onClick={() => onStateClick?.(name)}
                  style={{
                    default: { fill, stroke: isHov ? "#FFF" : (isVacantBoth ? "rgba(255,255,255,0.2)" : stroke), strokeWidth: isHov ? 1.2 : sw, strokeDasharray: isVacantBoth ? "4 4" : dash, outline: "none", opacity: targetOpacity, transition: "opacity 0.2s, fill 0.5s, stroke 0.15s" },
                    hover: { fill, stroke: "#FFF", strokeWidth: 1.2, strokeDasharray: dash, outline: "none", cursor: "pointer", opacity: 1 },
                    pressed: { fill, outline: "none" },
                  }}
                />
              );

              if (!isTerritory && viewMode === "Senate" && !isVacantBoth) {
                if (isVacant1) {
                  elements.push(
                    <Geography key={`${geo.rsmKey}-vacant-1`} geography={geo}
                      style={{
                        default: { fill: "none", clipPath: "url(#clip-half-1)", stroke: "rgba(255,255,255,0.2)", strokeDasharray: "4 4", outline: "none", opacity: targetOpacity, pointerEvents: "none" as const, transition: "opacity 0.2s" },
                        hover: { fill: "none", clipPath: "url(#clip-half-1)", stroke: "rgba(255,255,255,0.2)", strokeDasharray: "4 4", outline: "none", pointerEvents: "none" as const },
                        pressed: { fill: "none", clipPath: "url(#clip-half-1)", outline: "none" },
                      }}
                      tabIndex={-1}
                    />
                  );
                }
                if (isVacant2) {
                  elements.push(
                    <Geography key={`${geo.rsmKey}-vacant-2`} geography={geo}
                      style={{
                        default: { fill: "none", clipPath: "url(#clip-half-2)", stroke: "rgba(255,255,255,0.2)", strokeDasharray: "4 4", outline: "none", opacity: targetOpacity, pointerEvents: "none" as const, transition: "opacity 0.2s" },
                        hover: { fill: "none", clipPath: "url(#clip-half-2)", stroke: "rgba(255,255,255,0.2)", strokeDasharray: "4 4", outline: "none", pointerEvents: "none" as const },
                        pressed: { fill: "none", clipPath: "url(#clip-half-2)", outline: "none" },
                      }}
                      tabIndex={-1}
                    />
                  );
                }
              }

              if (!isTerritory && viewMode === "Senate") {
                if (flip.senFlip1) {
                  elements.push(
                    <Geography key={`${geo.rsmKey}-flip-1`} geography={geo}
                      style={{
                        default: { fill: "url(#flip-hash)", clipPath: "url(#clip-half-1)", stroke: "none", outline: "none", opacity: targetOpacity, pointerEvents: "none" as const, transition: "opacity 0.2s" },
                        hover: { fill: "url(#flip-hash)", clipPath: "url(#clip-half-1)", stroke: "none", outline: "none", pointerEvents: "none" as const },
                        pressed: { fill: "url(#flip-hash)", clipPath: "url(#clip-half-1)", outline: "none" },
                      }}
                      tabIndex={-1}
                    />
                  );
                }
                if (flip.senFlip2) {
                  elements.push(
                    <Geography key={`${geo.rsmKey}-flip-2`} geography={geo}
                      style={{
                        default: { fill: "url(#flip-hash)", clipPath: "url(#clip-half-2)", stroke: "none", outline: "none", opacity: targetOpacity, pointerEvents: "none" as const, transition: "opacity 0.2s" },
                        hover: { fill: "url(#flip-hash)", clipPath: "url(#clip-half-2)", stroke: "none", outline: "none", pointerEvents: "none" as const },
                        pressed: { fill: "url(#flip-hash)", clipPath: "url(#clip-half-2)", outline: "none" },
                      }}
                      tabIndex={-1}
                    />
                  );
                }
              } else if (isFlipped) {
                elements.push(
                  <Geography key={`${geo.rsmKey}-flip`} geography={geo}
                    style={{
                      default: { fill: "url(#flip-hash)", stroke: "none", outline: "none", opacity: targetOpacity, pointerEvents: "none" as const, transition: "opacity 0.2s" },
                      hover: { fill: "url(#flip-hash)", stroke: "none", outline: "none", pointerEvents: "none" as const },
                      pressed: { fill: "url(#flip-hash)", outline: "none" },
                    }}
                    tabIndex={-1}
                  />
                );
              }
            });
            return <>{elements}</>;
          }}
        </Geographies>
      </ComposableMap>
    </>
  );
});

// ── MAIN COMPONENT ────────────────────────────────────────────────────────

export function MapRenderer({ year, viewMode, onStateClick, isRo }: { year: number; viewMode: ViewMode; onStateClick?: (n: string) => void; isRo?: boolean; }) {
  const [tip, setTip] = useState<Tip | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const isHouse = viewMode === "House";
  const yd = useMemo(() => ELECTORAL_HISTORY.find((d) => d.year === year) || ELECTORAL_HISTORY[0], [year]);
  const isOffYear = viewMode === "President" && yd.demPopVote === 0 && !yd.unopposed;
  const cartoData = useMemo(() => isHouse ? buildCartogram(year) : null, [year, isHouse]);

  const onGeoEnter = useCallback((geo: MapGeo, evt: React.MouseEvent<SVGPathElement>) => {
    const name = geo.properties?.name ?? "";
    const data = getStateData(year, name);
    const flip = getFlipData(year, name);
    setHovered(name);
    const admitted = STATE_ADMISSION[name];
    const admitStr = admitted ? ` · Est. ${admitted}` : "";
    let party: string | string[] = "", detail = "";
    if (viewMode === "President") {
      party = data.president.party;
      detail = (flip.presFlip ? "⟳ FLIP · " : "") + party + admitStr;
    } else if (viewMode === "Senate") {
      party = data.senate.split ? [data.senate.party1, data.senate.party2] : data.senate.party1;
      detail = ((flip.senFlip1 || flip.senFlip2) ? "⟳ FLIP · " : "") + (data.senate.split ? `${data.senate.party1}/${data.senate.party2}` : data.senate.party1) + admitStr;
    } else {
      party = data.governor.party;
      detail = (flip.govFlip ? "⟳ FLIP · " : "") + party + admitStr;
    }
    setTip({ x: evt.clientX, y: evt.clientY, name, party, detail });
  }, [year, viewMode]);

  const onSquareEnter = useCallback((name: string, evt: React.MouseEvent) => {
    const data = getStateData(year, name);
    const flip = getFlipData(year, name);
    const cd = CONGRESS_DATA[year] || { p1: "DEM", p2: "REP" };
    setHovered(name);
    const flipStr = (flip.houseFlipDem > 0 || flip.houseFlipRep > 0) ? ` · ${flip.houseFlipDem > 0 ? `+${flip.houseFlipDem} GAIN` : `+${flip.houseFlipRep} GAIN`}` : "";
    setTip({
      x: evt.clientX, y: evt.clientY, name,
      party: data.house.p1Reps > data.house.p2Reps ? cd.p1 : cd.p2,
      detail: `${name}: ${data.house.p1Reps} ${cd.p1}, ${data.house.p2Reps} ${cd.p2}${flipStr}`,
    });
  }, [year]);

  const clearHover = useCallback(() => { setHovered(null); setTip(null); }, []);

  return (
    <div className="relative w-full grid" onMouseMove={(e) => setTip(p => p ? { ...p, x: e.clientX, y: e.clientY } : null)}>
      {/* 1. Geographic Map (Stacked in grid cell 1x1) */}
      <motion.div 
        className="col-start-1 row-start-1 w-full"
        initial={false}
        animate={{ opacity: isHouse ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        style={{ pointerEvents: isHouse ? "none" : "auto" }}
      >
        <GeographicMap
          year={year}
          viewMode={viewMode}
          hovered={hovered}
          onGeoEnter={onGeoEnter}
          clearHover={clearHover}
          onStateClick={onStateClick}
        />
      </motion.div>

      {/* 2. House Cartogram (Stacked in grid cell 1x1) */}
      <motion.div 
        className="col-start-1 row-start-1 w-full"
        initial={false}
        animate={{ opacity: isHouse ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ pointerEvents: isHouse ? "auto" : "none" }}
      >
        <HouseCartogram
          data={cartoData}
          hovered={hovered}
          onSquareEnter={onSquareEnter}
          clearHover={clearHover}
          onStateClick={onStateClick}
        />
      </motion.div>

      {/* ── Tooltip ────────────────────────────────────────────────────── */}
      {tip && (
        <div className="pointer-events-none fixed z-50"
          style={{ left: Math.min(tip.x + 12, typeof window !== "undefined" ? window.innerWidth - 230 : 800), top: Math.max(tip.y - 56, 8) }}>
          <div className="border border-[rgba(201,168,76,0.2)] bg-[#080B12]/97 px-3 py-2 backdrop-blur-sm" style={{ minWidth: 180 }}>
            <p className="font-body text-[11px] font-bold tracking-wide text-[#F5F0E8]">{tip.name}</p>
            <p className="mt-0.5 font-body text-[10px] text-[#8A8780]">{tip.detail}</p>
            {tip.party && (
              <div className="mt-1 flex items-center gap-1.5">
                {Array.isArray(tip.party) ? tip.party.map((p, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="h-[6px] w-[6px]" style={{ background: pc(p) }} />
                    <span className="font-body text-[8px] uppercase tracking-widest text-[#6B6860]">{p}</span>
                  </div>
                )) : (
                  <div className="flex items-center gap-1">
                    <div className="h-[6px] w-[6px]" style={{ background: pc(tip.party) }} />
                    <span className="font-body text-[8px] uppercase tracking-widest text-[#6B6860]">{PARTY_FULL_NAMES[tip.party] || tip.party}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Off-Year Overlay */}
      {isOffYear && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="bg-[#080B12]/60 px-8 py-4 border border-[rgba(201,168,76,0.3)] backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <span className="font-body text-[10px] md:text-[12px] uppercase tracking-[0.6em] text-[#C9A84C] font-black text-center block">
              {isRo ? "AN INTERMEDIAR: FĂRĂ ALEGERI PREZIDENȚIALE" : "OFF-YEAR: NO PRESIDENTIAL ELECTION"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
