"use client";

// ─── NetworkMap ───────────────────────────────────────────────────────────────
// The interactive continental-network map used by the Interstate Highway and
// Continental Rail pages.
//
//  · Era pills cross-fade between historic layers.
//  · Featured corridors use high-fidelity FHWA/NTAD geometry (see
//    scripts/build-interstates-geojson.py); the full primary Interstate grid
//    renders as a discoverable background layer (hover/tap any line).
//  · Zoom & pan: buttons, pinch and drag (wheel zoom requires Ctrl/⌘ so the
//    page keeps scrolling normally). Strokes stay screen-constant via
//    vector-effect; nodes and labels counter-scale.
//  · Hovering a corridor illuminates it and dims the rest; the detail panel
//    narrates it — length, era, and real average daily traffic (AADT).
//  · Decorative layers are pointer-transparent; only fat hit-paths interact.
//  · Controls and panel live in normal flow — nothing overlays the map.

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  useMapContext,
} from "react-simple-maps";
import { GEO_URL } from "@/lib/data/us-geo";
import interstatesData from "@/lib/data/interstates-simplified.json";
import { InterstateShield, MapShield } from "@/components/infrastructure/InterstateShield";
import type { NetworkEra, NetworkRoute, MapNode, LngLat } from "@/lib/data/infrastructure-network-data";

interface RouteGeom {
  segments: LngLat[][];
  miles: number;
  aadt?: number; // interstates: average daily traffic
  tracks?: number; // rail: average track count
}
const INTERSTATE_GEOMS = interstatesData as unknown as Record<string, RouteGeom>;

const US_CENTER: LngLat = [-96.6, 38.7];
const MAX_ZOOM = 12;



interface PowerPlant {
  id: string;
  name: string;
  type: "hydro" | "nuclear" | "solar" | "wind";
  location: string;
  capacity: string;
  coordinates: [number, number];
  description: {
    en: string;
    ro: string;
  };
}

const POWER_PLANTS: PowerPlant[] = [
  {
    id: "grand-coulee",
    name: "Grand Coulee Dam",
    type: "hydro",
    location: "Columbia River, WA",
    capacity: "6,809 MW",
    coordinates: [-118.98, 47.96],
    description: {
      en: "The largest power station in the United States. An engineering colossus on the Columbia River producing 21 billion kilowatt-hours of clean energy annually.",
      ro: "Cea mai mare hidrocentrală din SUA. Un colos ingineresc pe râul Columbia care produce anual 21 de miliarde de kWh de energie curată.",
    },
  },
  {
    id: "palo-verde",
    name: "Palo Verde Station",
    type: "nuclear",
    location: "Wintersburg, AZ",
    capacity: "3,937 MW",
    coordinates: [-112.86, 33.39],
    description: {
      en: "The largest nuclear plant and largest single power producer in the nation, providing carbon-free electricity to over 4 million people across the Southwest.",
      ro: "Cea mai mare centrală nucleară și cel mai mare producător unic de energie din țară, alimentând peste 4 milioane de oameni din sud-vest.",
    },
  },
  {
    id: "vogtle",
    name: "Plant Vogtle",
    type: "nuclear",
    location: "Waynesboro, GA",
    capacity: "4,536 MW",
    coordinates: [-81.76, 33.14],
    description: {
      en: "With its newly completed Units 3 & 4, Vogtle is now the largest generator of clean, carbon-free energy in the United States.",
      ro: "Odată cu finalizarea recentă a reactoarelor 3 și 4, centrala Vogtle este cel mai mare generator de energie curată fără carbon din SUA.",
    },
  },
  {
    id: "alta-wind",
    name: "Alta Wind Energy Center",
    type: "wind",
    location: "Tehachapi Pass, CA",
    capacity: "1,548 MW",
    coordinates: [-118.22, 35.02],
    description: {
      en: "One of the largest onshore wind farms in the world, spanning the Tehachapi wind corridor to supply clean power to Southern California.",
      ro: "Unul dintre cele mai mari parcuri eoliene terestre din lume, situat în trecătoarea Tehachapi, alimentând California de Sud.",
    },
  },
  {
    id: "ivanpah",
    name: "Ivanpah Solar Facility",
    type: "solar",
    location: "Mojave Desert, CA",
    capacity: "392 MW",
    coordinates: [-115.47, 35.56],
    description: {
      en: "A massive concentrated solar thermal plant utilizing 170,000 heliostat mirrors to focus sunlight onto steam boilers atop three solar towers.",
      ro: "O centrală termosolară masivă în deșertul Mojave, folosind 170.000 de oglinzi heliostat pentru a concentra lumina pe trei turnuri solare.",
    },
  },
  {
    id: "hoover",
    name: "Hoover Dam",
    type: "hydro",
    location: "Nevada / Arizona",
    capacity: "2,080 MW",
    coordinates: [-114.74, 36.02],
    description: {
      en: "The historic engineering marvel of the Depression era, generating clean hydroelectric power from the Colorado River for three Western states.",
      ro: "Minunea inginerească istorică din perioada Marii Depresiuni, generând energie hidroelectrică din râul Colorado pentru trei state vestice.",
    },
  },
];

const PLANT_COLOR: Record<string, string> = {
  hydro: "#38bdf8",
  nuclear: "#a78bfa",
  wind: "#34d399",
  solar: "#fbbf24",
};

// ─── AADT traffic heat scale ──────────────────────────────────────────────────
// Average daily traffic spans from ~5k (rural Alaska) to ~300k (urban cores), so
// the ramp is logarithmic. Blue (quiet) → teal → amber → red (jammed).
const HEAT_STOPS: [number, [number, number, number]][] = [
  [0.0, [56, 130, 246]], // blue
  [0.4, [45, 212, 191]], // teal
  [0.7, [251, 191, 36]], // amber
  [1.0, [239, 68, 68]], // red
];
/** Normalised heat value in [0,1] from a metric and its domain. */
function heatT(value: number, lo: number, hi: number, log: boolean): number {
  const v = log ? Math.log10(Math.max(1, value)) : value;
  const l = log ? Math.log10(Math.max(1, lo)) : lo;
  const h = log ? Math.log10(Math.max(1, hi)) : hi;
  return Math.max(0, Math.min(1, (v - l) / (h - l)));
}
function heatColorFromT(t: number): string {
  let a = HEAT_STOPS[0];
  let b = HEAT_STOPS[HEAT_STOPS.length - 1];
  for (let i = 0; i < HEAT_STOPS.length - 1; i++) {
    if (t >= HEAT_STOPS[i][0] && t <= HEAT_STOPS[i + 1][0]) {
      a = HEAT_STOPS[i];
      b = HEAT_STOPS[i + 1];
      break;
    }
  }
  const f = b[0] === a[0] ? 0 : (t - a[0]) / (b[0] - a[0]);
  const c = a[1].map((v, i) => Math.round(v + (b[1][i] - v) * f));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

/** Heat colour + metric config, chosen by the map's background variant. */
interface HeatConfig {
  metric: (g: RouteGeom | undefined) => number;
  lo: number;
  hi: number;
  log: boolean;
}
const HEAT_INTERSTATE: HeatConfig = { metric: (g) => g?.aadt ?? 0, lo: 5000, hi: 250000, log: true };
const HEAT_RAIL: HeatConfig = { metric: (g) => g?.tracks ?? 1, lo: 1, hi: 3, log: false };
const HEAT_NONE: HeatConfig = { metric: () => 0, lo: 0, hi: 1, log: false };

/** Route number for shield lookup: "i90"→"90", "i610"→"610". Null for the named
 *  trails and for Alaska/Hawaii keys (ak1/hi1), which have no numbered shield. */
function interstateNumber(id: string): string | null {
  const m = /^i(\d{1,3})$/.exec(id);
  return m ? m[1] : null;
}

/** Parses a geometry key into a display descriptor.
 *  "i610"→Interstate 610 (aux); "ak1"→Alaska Route A-1; "hi1"→Hawaii H-1. */
function describeKey(key: string, locale: "en" | "ro") {
  const upper = key.toUpperCase();
  if (/^AK\d+$/.test(upper)) {
    const n = upper.slice(2);
    return {
      name: locale === "ro" ? `Ruta A-${n} (Alaska)` : `Alaska Route A-${n}`,
      color: "#94a3b8",
      endpoints: locale === "ro" ? "Sistemul din Alaska" : "Alaska Interstate System",
    };
  }
  if (/^HI\d+$/.test(upper)) {
    const n = upper.slice(2);
    return {
      name: locale === "ro" ? `Interstatala H-${n} (Hawaii)` : `Interstate H-${n} (Hawaii)`,
      color: "#94a3b8",
      endpoints: locale === "ro" ? "Sistemul din Hawaii" : "Hawaii Interstate System",
    };
  }
  const num = parseInt(upper.replace("I", ""), 10);
  const aux = num > 99;
  const isOdd = num % 2 !== 0;
  return {
    name: locale === "ro" ? `Interstatala ${num}` : `Interstate ${num}`,
    color: aux ? "#a78bfa" : isOdd ? "#60a5fa" : "#fb923c",
    endpoints: aux
      ? locale === "ro"
        ? "Rută auxiliară (centură / ramificație)"
        : "Auxiliary route (beltway / spur)"
      : isOdd
        ? locale === "ro"
          ? "Coridor Nord ⇄ Sud"
          : "North ⇄ South corridor"
        : locale === "ro"
          ? "Coridor Est ⇄ Vest"
          : "East ⇄ West corridor",
  };
}

// Class I freight owners + Amtrak: display name, network colour, and role.
const RAIL_INFO: Record<string, { name: string; color: string; freight: boolean }> = {
  BNSF: { name: "BNSF Railway", color: "#f97316", freight: true },
  UP: { name: "Union Pacific", color: "#facc15", freight: true },
  CSXT: { name: "CSX Transportation", color: "#3b82f6", freight: true },
  NS: { name: "Norfolk Southern", color: "#a855f7", freight: true },
  CPKC: { name: "Canadian Pacific Kansas City", color: "#ef4444", freight: true },
  CN: { name: "Canadian National", color: "#ec4899", freight: true },
  AMTK: { name: "Amtrak", color: "#22d3ee", freight: false },
};
function describeRail(key: string, locale: "en" | "ro") {
  const info = RAIL_INFO[key.toUpperCase()] ?? { name: key, color: "#94a3b8", freight: true };
  const role = info.freight
    ? locale === "ro"
      ? "Rețea principală de marfă (Clasa I)"
      : "Class I freight main line"
    : locale === "ro"
      ? "Rețeaua națională de pasageri"
      : "National passenger network";
  return { name: info.name, color: info.color, endpoints: role };
}

// Transmission voltage classes: name, colour (cool→hot by voltage), and role.
const POWER_INFO: Record<string, { name: string; color: string; ehv: boolean }> = {
  v765: { name: "500+ kV", color: "#783d19", ehv: true }, // dark brown/rust
  v500: { name: "400-500 kV", color: "#d97706", ehv: true }, // orange/amber
  v345: { name: "300-400 kV", color: "#eab308", ehv: true }, // yellow
  v230: { name: "200-300 kV", color: "#22c55e", ehv: false }, // green
  v115: { name: "100-200 kV", color: "#06b6d4", ehv: false }, // light blue
  v69: { name: "<100 kV", color: "#8b5cf6", ehv: false }, // purple
  vdc: { name: "HVDC", color: "#ec4899", ehv: true }, // pink/magenta
};
function describePower(key: string, locale: "en" | "ro") {
  const info = POWER_INFO[key.toLowerCase()] ?? { name: key, color: "#94a3b8", ehv: false };
  const role =
    key.toLowerCase() === "vdc"
      ? locale === "ro"
        ? "Linie de curent continuu de înaltă tensiune"
        : "High-voltage direct-current line"
      : info.ehv
        ? locale === "ro"
          ? "Coloana vertebrală de foarte înaltă tensiune"
          : "Extra-high-voltage backbone"
        : locale === "ro"
          ? "Transport de înaltă tensiune"
          : "High-voltage transmission";
  return { name: info.name, color: info.color, endpoints: role };
}

// Waterways and aqueducts classes: name, colour (cyan for aqueducts, blue/teal for waterways).
const WATER_INFO: Record<string, { name: string; color: string; isAqueduct: boolean }> = {
  aqueduct_california: { name: "California Aqueduct", color: "#06b6d4", isAqueduct: true }, // cyan
  aqueduct_la: { name: "Los Angeles Aqueduct", color: "#0891b2", isAqueduct: true }, // dark cyan
  aqueduct_cap: { name: "Central Arizona Project", color: "#22d3ee", isAqueduct: true }, // light cyan
  aqueduct_catskill: { name: "Catskill Aqueduct", color: "#0ea5e9", isAqueduct: true }, // sky blue
  aqueduct_delaware: { name: "Delaware Aqueduct", color: "#38bdf8", isAqueduct: true }, // light sky blue
  waterway_icw_atlantic: { name: "Intracoastal Waterway (Atlantic)", color: "#1d4ed8", isAqueduct: false }, // royal blue
  waterway_icw_gulf: { name: "Intracoastal Waterway (Gulf)", color: "#2563eb", isAqueduct: false }, // medium blue
  waterway_seaway: { name: "St. Lawrence Seaway", color: "#1e3a8a", isAqueduct: false }, // navy blue
  waterway_mississippi: { name: "Mississippi River", color: "#0284c7", isAqueduct: false }, // ocean blue
  waterway_ohio: { name: "Ohio River", color: "#0369a1", isAqueduct: false }, // deeper ocean blue
  waterway_illinois: { name: "Illinois Waterway", color: "#075985", isAqueduct: false }, // dark blue
};

function describeWater(key: string, locale: "en" | "ro") {
  const info = WATER_INFO[key.toLowerCase()] ?? { name: key, color: "#3b82f6", isAqueduct: false };
  let name = info.name;
  if (locale === "ro") {
    // Translate names bilingually
    if (key.toLowerCase() === "aqueduct_california") name = "Apeductul Californiei";
    else if (key.toLowerCase() === "aqueduct_la") name = "Apeductul Los Angeles";
    else if (key.toLowerCase() === "aqueduct_cap") name = "Central Arizona Project";
    else if (key.toLowerCase() === "aqueduct_catskill") name = "Apeductul Catskill";
    else if (key.toLowerCase() === "aqueduct_delaware") name = "Apeductul Delaware";
    else if (key.toLowerCase() === "waterway_icw_atlantic") name = "Intracoastal Waterway (Atlantic)";
    else if (key.toLowerCase() === "waterway_icw_gulf") name = "Intracoastal Waterway (Golful Mexic)";
    else if (key.toLowerCase() === "waterway_seaway") name = "Calea Navigabilă Sf. Laurențiu";
    else if (key.toLowerCase() === "waterway_mississippi") name = "Fluviul Mississippi";
    else if (key.toLowerCase() === "waterway_ohio") name = "Râul Ohio";
    else if (key.toLowerCase() === "waterway_illinois") name = "Calea Navigabilă Illinois";
  }
  const role = info.isAqueduct
    ? locale === "ro"
      ? "Sistem major de alimentare cu apă"
      : "Major water supply aqueduct"
    : locale === "ro"
      ? "Cale navigabilă comercială"
      : "Commercial navigation waterway";
  return { name, color: info.color, endpoints: role };
}


// ─── Path helpers ─────────────────────────────────────────────────────────────

/** Projects waypoints and threads a gentle quadratic curve through them. */
function buildPath(
  waypoints: LngLat[],
  projection: (c: LngLat) => [number, number] | null,
): string {
  if (!waypoints) return "";
  const pts = waypoints
    .filter((w) => Array.isArray(w) && w.length === 2 && w[0] !== undefined && w[1] !== undefined)
    .map((w) => projection(w))
    .filter((p): p is [number, number] => Array.isArray(p));
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const midX = (pts[i][0] + pts[i + 1][0]) / 2;
    const midY = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q ${pts[i][0].toFixed(1)},${pts[i][1].toFixed(1)} ${midX.toFixed(1)},${midY.toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last[0].toFixed(1)},${last[1].toFixed(1)}`;
  return d;
}

/** Straight projected polyline (used for dense NTAD geometry — already smooth). */
function buildPolyline(
  coords: LngLat[],
  projection: (c: LngLat) => [number, number] | null,
): string {
  if (!coords) return "";
  const pts = coords
    .filter((c) => Array.isArray(c) && c.length === 2 && c[0] !== undefined && c[1] !== undefined)
    .map((c) => projection(c))
    .filter((p): p is [number, number] => Array.isArray(p));
  if (pts.length < 2) return "";
  return "M " + pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" L ");
}

// ─── Route layer (needs the projection, so it must live inside the map) ──────

function RoutesLayer({
  routes,
  nodes,
  era,
  selectedId,
  onSelect,
  reducedMotion,
  featuredIds,
  zoom,
  heat,
  geoms,
  heatCfg,
  prominentBackground,
  variant,
  railFilter,
  powerFilter,
}: {
  routes: NetworkRoute[];
  nodes: MapNode[];
  era: string;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  reducedMotion: boolean;
  featuredIds: Set<string>;
  zoom: number;
  heat: boolean;
  geoms: Record<string, RouteGeom>;
  heatCfg: HeatConfig;
  /** Render the background network boldly (rail: the owner net is the content). */
  prominentBackground?: boolean;
  variant?: "interstate" | "rail" | "power" | "water";
  railFilter?: "all" | "freight" | "passenger";
  powerFilter?: "all" | "plants";
}) {
  const { projection } = useMapContext();
  const k = 1 / zoom; // counter-scale factor for screen-constant sizes

  const substationPath = useMemo(() => {
    const pts = (geoms as any).substations as LngLat[] | undefined;
    if (!pts) return "";
    let d = "";
    for (const ll of pts) {
      const p = projection(ll);
      if (p) d += `M${p[0].toFixed(1)} ${p[1].toFixed(1)}h0.01`;
    }
    return d;
  }, [geoms, projection]);

  const drawn = useMemo(
    () =>
      routes
        .filter((r) => r.era === era)
        .map((r) => {
          const geom = geoms[r.id.toUpperCase()];
          const aadt = heatCfg.metric(geom);
          // Anchor the route's shield badge on the middle vertex of its main
          // alignment, projected to screen space.
          const anchorFrom = (coords: LngLat[]): [number, number] | null =>
            coords.length ? projection(coords[Math.floor(coords.length / 2)]) : null;
          if (geom && geom.segments.length > 0) {
            const paths = geom.segments
              .map((seg) => buildPolyline(seg as LngLat[], projection))
              .filter(Boolean);
            // The generator sorts segments longest-first: the vehicle dot
            // follows the main alignment, not a disconnected twin.
            return {
              route: r,
              d: paths.join(" "),
              dotD: paths[0] ?? "",
              anchor: anchorFrom(geom.segments[0] as LngLat[]),
              aadt,
            };
          }
          const d = variant === "rail" ? buildPolyline(r.waypoints, projection) : buildPath(r.waypoints, projection);
          return { route: r, d, dotD: d, anchor: anchorFrom(r.waypoints), aadt };
        })
        .filter((r) => r.d),
    [routes, era, projection, geoms, heatCfg, variant],
  );

  const activeNodeIds = useMemo(() => {
    if (variant === "rail") {
      if (era === "golden") {
        return new Set(["oma", "sac", "promontory"]);
      }
      if (era === "expansion") {
        return new Set(["chi", "kc", "la", "sea", "hou", "no", "oma", "sac"]);
      }
      if (era === "modern") {
        return new Set(["chi", "kc", "la", "sea", "hou", "no", "oma", "sac"]);
      }
    }
    return null;
  }, [variant, era]);

  const projectedNodes = useMemo(
    () =>
      nodes
        .filter((n) => !activeNodeIds || activeNodeIds.has(n.id))
        .map((n) => ({ node: n, p: projection(n.coordinates) }))
        .filter((n): n is { node: MapNode; p: [number, number] } => Array.isArray(n.p)),
    [nodes, projection, activeNodeIds],
  );

  return (
    <g>
      {/* Substations density layer for the power grid */}
      {substationPath && (
        <path
          d={substationPath}
          stroke="#fb923c"
          strokeWidth={1.8 * k}
          strokeLinecap="round"
          fill="none"
          style={{ opacity: 0.65, pointerEvents: "none", transition: "stroke-width 0.1s ease" }}
        />
      )}

      {drawn.map(({ route, d, dotD, aadt }, i) => {
        const isFeatured = featuredIds.has(route.id);
        const isSelected = selectedId === route.id;
        const dimmed = selectedId !== null && !isSelected;

        // Heat mode recolours every route by its metric (traffic for highways,
        // track count for rail) and thickens the busiest corridors, flattening
        // the corridor/background distinction so the whole network reads as flow.
        const t = heat ? heatT(aadt, heatCfg.lo, heatCfg.hi, heatCfg.log) : 0;
        const bgWidth = prominentBackground ? 1.3 : 0.9;
        const strokeWidth = heat
          ? (isSelected ? 1.2 : 0.6) + t * 2.4
          : isSelected
            ? 2.1
            : isFeatured
              ? 1.5
              : bgWidth;
        const strokeColor = heat ? heatColorFromT(t) : route.color;
        const bgOpacity = prominentBackground ? 0.88 : 0.46;
        const bgDimOpacity = prominentBackground ? 0.22 : 0.14;
        const activeOpacity = heat
          ? isSelected
            ? 1.0
            : dimmed
              ? 0.25
              : 0.85
          : isSelected
            ? 1.0
            : dimmed
              ? isFeatured
                ? 0.5
                : bgDimOpacity
              : isFeatured
                ? 0.95
                : bgOpacity;

        return (
          <g
            key={`${era}-${route.id}`}
            className="group cursor-pointer"
            style={{ opacity: activeOpacity, transition: "opacity 0.3s ease" }}
            // Hover or tap selects; the selection then persists (only an empty-map
            // click or another route clears it). Leaving the map no longer resets.
            onMouseEnter={() => onSelect(route.id)}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(route.id);
            }}
          >
            {/* Soft glow underlay — selected always; featured only outside heat mode */}
            {(isSelected || (!heat && isFeatured)) && (
              <motion.path
                d={d}
                fill="none"
                stroke={strokeColor}
                strokeWidth={4.5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-200 group-hover:opacity-40"
                style={{ pointerEvents: "none" }}
                animate={isSelected ? { opacity: [0.12, 0.28, 0.12] } : { opacity: 0.13 }}
                transition={isSelected ? { duration: 2.0, repeat: Infinity, ease: "easeInOut" } : undefined}
              />
            )}
            {/* The corridor itself.
                Entrance animations run on MOUNT (animate), not whileInView: SVG
                child elements are unreliable IntersectionObserver targets in
                Safari/Firefox, which left the routes stuck at their initial state
                (invisible) outside Chromium. Background routes render statically so
                they always show regardless of animation support. */}
            {route.dashed || reducedMotion ? (
              <motion.path
                d={d}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={route.dashed ? "5 6" : undefined}
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-200 group-hover:brightness-150"
                style={{ pointerEvents: "none" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                transition={{ duration: 1.1, delay: isFeatured ? i * 0.08 : 0.2 }}
              />
            ) : isFeatured ? (
              // Full-length opacity fade only — a pathLength draw-in could be
              // interrupted by re-projection (zoom/pan) and leave the corridor
              // half-drawn, so featured routes always render their entire length.
              <motion.path
                d={d}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-200 group-hover:brightness-150"
                style={{ pointerEvents: "none" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                transition={{ duration: 1.0, delay: i * 0.06 }}
              />
            ) : (
              <path
                d={d}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                opacity={0.9}
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-200 group-hover:brightness-150"
                style={{ pointerEvents: "none" }}
              />
            )}
            {/* Moving vehicle dot — featured routes, main alignment only */}
            {!reducedMotion && isFeatured && dotD && (
              <motion.circle
                r={2.3 * k}
                fill={route.color}
                stroke="#000"
                strokeWidth={0.6 * k}
                className="transition-all duration-200 group-hover:brightness-125"
                style={{ pointerEvents: "none" }}
                animate={{ r: [2.0 * k, 3.2 * k, 2.0 * k] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <animateMotion dur={`${11 + i * 2.5}s`} repeatCount="indefinite" path={dotD} />
              </motion.circle>
            )}
            {/* Fat invisible hit-area for hover/tap */}
            <path
              d={d}
              fill="none"
              stroke="transparent"
              strokeWidth={isFeatured ? 11 : 7}
              vectorEffect="non-scaling-stroke"
              style={{ pointerEvents: "stroke" }}
            />
          </g>
        );
      })}

      {/* Junction nodes — counter-scaled so they stay readable under zoom */}
      {projectedNodes.map(({ node, p }) => (
        <g key={node.id} style={{ pointerEvents: "none" }}>
          <circle
            cx={p[0]}
            cy={p[1]}
            r={(node.major ? 3.2 : 2.1) * k}
            fill="#fff"
            stroke="#000"
            strokeWidth={0.8 * k}
          />
          <text
            x={p[0] + 6 * k}
            y={p[1] - 5 * k}
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: (node.major ? 10.5 : 8.5) * k,
              fill: node.major ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              paintOrder: "stroke",
              stroke: "rgba(0,0,0,0.85)",
              strokeWidth: 2.5 * k,
            }}
          >
            {node.name}
          </text>
        </g>
      ))}

      {/* Interstate shield badges. Every numbered route carries one — featured
          corridors and the selected route always; the rest of the primary grid
          and the 3-digit rings/spurs (I-610, I-495 …) reveal as you zoom in, so
          the national overview stays legible instead of a wall of shields.
          Counter-scaled to hold a constant on-screen size. */}
      {drawn.map(({ route, anchor }) => {
        const num = interstateNumber(route.id);
        if (!num || !anchor) return null;
        const isFeatured = featuredIds.has(route.id);
        const isSelected = selectedId === route.id;
        const aux = parseInt(num, 10) > 99; // 3-digit beltway / spur
        // Reveal thresholds keep the map uncluttered at low zoom.
        let show: boolean;
        if (heat) show = isSelected; // heat mode: only the selected shield
        else if (isFeatured || isSelected) show = true;
        else if (aux) show = zoom >= 3.2; // dense metro rings appear last
        else show = zoom >= 2.2; // other primaries appear on a slight zoom-in
        if (!show) return null;
        const px = isSelected ? 26 : isFeatured ? 17 : 13; // on-screen size
        const faded = selectedId !== null && !isSelected;
        return (
          <MapShield
            key={`shield-${route.id}`}
            number={num}
            cx={anchor[0]}
            cy={anchor[1]}
            size={px * k}
            opacity={faded ? 0.5 : 1}
          />
        );
      })}



      {/* Power Plants point layer */}
      {variant === "power" && powerFilter === "plants" && POWER_PLANTS.map((plant) => {
        const p = projection(plant.coordinates);
        if (!p) return null;
        const isSel = selectedId === `plant-${plant.id}`;
        const dim = selectedId !== null && !isSel;
        const color = PLANT_COLOR[plant.type] || "#fb923c";
        return (
          <g
            key={`plant-${plant.id}`}
            style={{ opacity: dim ? 0.25 : 1, transition: "opacity 0.3s ease", cursor: "pointer" }}
            onMouseEnter={() => onSelect(`plant-${plant.id}`)}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(isSel ? null : `plant-${plant.id}`);
            }}
          >
            {isSel && (
              <circle cx={p[0]} cy={p[1]} r={6.5 * k} fill="none" stroke={color} strokeWidth={1 * k}>
                <animate attributeName="r" values={`${6.5 * k};${15 * k}`} dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={p[0]} cy={p[1]} r={5.2 * k} fill={color} fillOpacity={0.3} stroke={color} strokeWidth={1.2 * k} />
            <circle cx={p[0]} cy={p[1]} r={1.6 * k} fill="#fff" />
            <text
              x={p[0]}
              y={p[1] - 8 * k}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: 8.5 * k,
                fontWeight: "bold",
                fill: isSel ? color : "rgba(255,255,255,0.75)",
                paintOrder: "stroke",
                stroke: "rgba(0,0,0,0.85)",
                strokeWidth: 2.2 * k,
                pointerEvents: "none",
              }}
            >
              {plant.name}
            </text>
          </g>
        );
      })}
    </g>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

interface NetworkMapProps {
  locale: "en" | "ro";
  eras: NetworkEra[];
  routes: NetworkRoute[];
  nodes: MapNode[];
  /** Accent for the active era pill. */
  accent?: string;
  /** Render the full background network behind the featured corridors. */
  backgroundNetwork?: boolean;
  /** Which background dataset drives the network. */
  variant?: "interstate" | "rail" | "power" | "water";
  /** Background geometry (defaults to the Interstate grid when variant omitted). */
  backgroundGeoms?: Record<string, RouteGeom>;
  /** Offer a heat colour mode toggle (traffic for highways, tracks for rail). */
  enableHeatmap?: boolean;
  /** Hide the era-switch pills and lock the map to a single era. */
  hideEraToggle?: boolean;
  /** Era to open on (defaults to the first era). */
  initialEra?: string;
  labels: {
    eraLabel: string;
    corridorsLabel: string;
    lengthLabel: string;
    openedLabel: string;
    hint: string;
    /** Label for the average-daily-traffic stat (shown when data exists). */
    trafficLabel?: string;
    vehiclesPerDay?: string;
    zoomHint?: string;
    /** Heat-mode toggle + legend labels. */
    viewCorridors?: string;
    viewTraffic?: string;
    heatLow?: string;
    heatHigh?: string;
  };
}

export function NetworkMap({
  locale,
  eras,
  routes,
  nodes,
  accent = "#fbbf24",
  backgroundNetwork = false,
  variant = "interstate",
  backgroundGeoms,
  enableHeatmap = false,
  hideEraToggle = false,
  initialEra,
  labels,
}: NetworkMapProps) {
  const isRail = variant === "rail";
  const isPower = variant === "power";
  const isWater = variant === "water";
  const boldBg = isRail || isPower || isWater; // the background net is the content, not a backdrop
  const GEOMS = backgroundGeoms ?? INTERSTATE_GEOMS;
  const heatCfg = isPower || isWater ? HEAT_NONE : isRail ? HEAT_RAIL : HEAT_INTERSTATE;
  const bgEra = isPower ? "grid" : isRail ? "modern" : isWater ? "waterway" : "interstate";
  const describe = isPower ? describePower : isRail ? describeRail : isWater ? describeWater : describeKey;
  const [era, setEra] = useState(initialEra ?? eras[0].id);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [heat, setHeat] = useState(false);
  const [position, setPosition] = useState<{ coordinates: LngLat; zoom: number }>({
    coordinates: US_CENTER,
    zoom: 1,
  });
  const [railFilter, setRailFilter] = useState<"all" | "freight" | "passenger">("all");
  const [powerFilter, setPowerFilter] = useState<"all" | "plants">("plants");

  const prefersReducedMotion = useReducedMotion();

  const featuredIds = useMemo(() => new Set(routes.map((r) => r.id)), [routes]);

  /** Featured corridors + (optionally) every other Interstate — primaries, the
   *  3-digit rings/spurs, and the Alaska/Hawaii systems — as discoverable
   *  background routes, each with real NTAD mileage and traffic. */
  const combinedRoutes = useMemo(() => {
    if (!backgroundNetwork) return routes;
    const list = [...routes];
    for (const key of Object.keys(GEOMS)) {
      if (key === "substations") continue;
      const id = key.toLowerCase();
      if (list.some((r) => r.id === id)) continue;
      const geom = GEOMS[key];
      const en = describe(key, "en");
      const ro = describe(key, "ro");
      const miEn = geom.miles.toLocaleString("en-US");
      const miRo = geom.miles.toLocaleString("ro-RO");
      const description = isPower
        ? {
            en: `${en.name} lines: ${miEn} miles of ${en.endpoints.toLowerCase()} on the U.S. grid (HIFLD transmission-line data).`,
            ro: `Linii de ${ro.name}: ${miRo} mile de ${ro.endpoints.toLowerCase()} din rețeaua SUA (date HIFLD).`,
          }
        : isWater
        ? {
            en: `${en.name}: ${miEn} miles of water supply or commercial transit (${en.endpoints.toLowerCase()}).`,
            ro: `${ro.name}: ${miRo} de mile de transport comercial sau alimentare (${ro.endpoints.toLowerCase()}).`,
          }
        : isRail
        ? {
            en: `${en.name}: ${miEn} route-miles of ${en.endpoints.toLowerCase()} across the United States (FRA / NTAD North American Rail Network data).`,
            ro: `${ro.name}: ${miRo} mile de rețea (${ro.endpoints.toLowerCase()}) în Statele Unite (date FRA / NTAD).`,
          }
        : {
            en: `A route of the Interstate System. Along its ${miEn} miles, the average segment carries about ${(geom.aadt ?? 0).toLocaleString("en-US")} vehicles every day (FHWA National Highway System data).`,
            ro: `O rută a Sistemului Interstatal. De-a lungul celor ${miRo} mile, segmentul mediu este tranzitat de circa ${(geom.aadt ?? 0).toLocaleString("ro-RO")} de vehicule în fiecare zi (date FHWA, National Highway System).`,
          };
      list.push({
        id,
        era: bgEra,
        name: { en: en.name, ro: ro.name },
        color: en.color,
        waypoints: [],
        endpoints: { en: en.endpoints, ro: ro.endpoints },
        lengthLabel: `${miEn} mi`,
        year: boldBg ? "Today" : "1956–",
        description,
      });
    }
    return list;
  }, [routes, backgroundNetwork, GEOMS, describe, bgEra, isRail, isPower, isWater, boldBg]);

  const filteredCombinedRoutes = useMemo(() => {
    let list = combinedRoutes;
    if (isRail && era === "modern") {
      list = list.filter((r) => r.id !== "amtk");
      const amtrakIds = [
        "coast-starlight",
        "california-zephyr",
        "empire-builder",
        "southwest-chief",
        "sunset-limited",
        "texas-eagle",
        "crescent",
        "northeast-corridor",
        "cardinal",
        "city-of-new-orleans",
        "silver-meteor",
        "silver-star",
        "auto-train",
        "palmetto",
        "carolinian",
        "adirondack",
        "maple-leaf",
      ];
      if (railFilter === "freight") {
        list = list.filter((r) => !amtrakIds.includes(r.id));
      } else if (railFilter === "passenger") {
        list = list.filter((r) => amtrakIds.includes(r.id));
      }
    }
    return list;
  }, [combinedRoutes, isRail, era, railFilter]);

  const eraRoutes = useMemo(() => filteredCombinedRoutes.filter((r) => r.era === era), [filteredCombinedRoutes, era]);

  const selected = useMemo(
    () => eraRoutes.find((r) => r.id === selectedId) ?? null,
    [eraRoutes, selectedId],
  );



  const selectedPlant = useMemo(() => {
    if (!isPower || powerFilter !== "plants") return null;
    return POWER_PLANTS.find((p) => `plant-${p.id}` === selectedId) ?? null;
  }, [selectedId, isPower, powerFilter]);

  const selectedAadt = useMemo(() => {
    if (!selected || boldBg) return 0; // rail/power have no per-route traffic stat
    return GEOMS[selected.id.toUpperCase()]?.aadt ?? 0;
  }, [selected, boldBg, GEOMS]);

  const switchEra = (id: string) => {
    setEra(id);
    setSelectedId(null);
  };

  const zoomBy = (factor: number) => {
    setPosition((p) => ({
      ...p,
      zoom: Math.min(MAX_ZOOM, Math.max(1, p.zoom * factor)),
    }));
  };
  const resetView = () => setPosition({ coordinates: US_CENTER, zoom: 1 });

  return (
    <div className="w-full">
      {/* Era toggle (hidden when the map is locked to a single era) */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {!hideEraToggle && (
          <div>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-white/35">
              {labels.eraLabel}
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {eras.map((e) => {
                const active = era === e.id;
                return (
                  <button
                    key={e.id}
                    onClick={() => switchEra(e.id)}
                    className="group rounded-full border px-5 py-2.5 text-left transition-all duration-300"
                    style={{
                      borderColor: active ? accent : "rgba(255,255,255,0.12)",
                      background: active ? `${accent}14` : "transparent",
                    }}
                  >
                    <span
                      className="block font-macro-display text-sm font-bold tracking-tight"
                      style={{ color: active ? accent : "rgba(255,255,255,0.55)" }}
                    >
                      {e.label[locale]}
                    </span>
                    <span className="block font-sans text-[10px] uppercase tracking-[0.18em] text-white/30">
                      {e.sublabel[locale]}
                    </span>
                  </button>
                );
              })}
            </div>
            {isRail && era === "modern" && (
              <div className="mt-4 flex flex-col gap-2">
                <span className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
                  {locale === "ro" ? "Tip Rețea" : "Network Filter"}
                </span>
                <div className="flex rounded-full border border-white/12 p-0.5 w-fit">
                  {[
                    { id: "all", label: locale === "ro" ? "Toate" : "All" },
                    { id: "freight", label: locale === "ro" ? "Doar Marfă" : "Freight Only" },
                    { id: "passenger", label: locale === "ro" ? "Pasageri" : "Passenger" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setRailFilter(t.id as any);
                        setSelectedId(null);
                      }}
                      className="rounded-full px-3.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.15em] transition-all"
                      style={{
                        background: railFilter === t.id ? "rgba(255,255,255,0.9)" : "transparent",
                        color: railFilter === t.id ? "#000" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {isPower && (
              <div className="mt-4 flex flex-col gap-2">
                <span className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
                  {locale === "ro" ? "Centrale Energie Curată" : "Clean Power Plants"}
                </span>
                <div className="flex rounded-full border border-white/12 p-0.5 w-fit">
                  {[
                    { id: "plants", label: locale === "ro" ? "Afișează centrale" : "Show Power Plants" },
                    { id: "all", label: locale === "ro" ? "Doar linii" : "Lines Only" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setPowerFilter(t.id as any);
                        setSelectedId(null);
                      }}
                      className="rounded-full px-3.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.15em] transition-all"
                      style={{
                        background: powerFilter === t.id ? "rgba(255,255,255,0.9)" : "transparent",
                        color: powerFilter === t.id ? "#000" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col items-start gap-3 md:items-end">
          {/* Colour-mode toggle: corridor colours vs heat */}
          {enableHeatmap && era === bgEra && (
            <div className="flex rounded-full border border-white/12 p-0.5">
              {[
                { on: false, label: labels.viewCorridors ?? "Corridors" },
                { on: true, label: labels.viewTraffic ?? "Traffic" },
              ].map((m) => (
                <button
                  key={String(m.on)}
                  onClick={() => setHeat(m.on)}
                  className="rounded-full px-3.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.15em] transition-all"
                  style={{
                    background: heat === m.on ? "rgba(255,255,255,0.9)" : "transparent",
                    color: heat === m.on ? "#000" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          )}
          <p className="max-w-xs font-sans text-[10px] uppercase leading-relaxed tracking-[0.15em] text-white/25 md:text-right">
            {labels.hint}
          </p>
        </div>
      </div>

      {/* Heat legend (replaces the corridor chips in heat mode) */}
      {heat && era === bgEra ? (
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
            {labels.heatLow ?? "Quiet"}
          </span>
          <div
            className="h-2 w-56 max-w-[55vw] rounded-full"
            style={{
              background: `linear-gradient(to right, ${heatColorFromT(0)}, ${heatColorFromT(0.4)}, ${heatColorFromT(0.7)}, ${heatColorFromT(1)})`,
            }}
          />
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
            {labels.heatHigh ?? "Jammed"}
          </span>
        </div>
      ) : (
      /* Corridor chips (featured legend + selector) */
      <div className="mb-6 flex flex-wrap gap-x-5 gap-y-2">
        {eraRoutes
          // interstates: the featured corridors. rail/power: the background
          // networks themselves (owners / voltage classes) are the content.
          .filter((r) => featuredIds.has(r.id) || (boldBg && r.era === bgEra))
          .map((r) => {
            const dim = selectedId !== null && selectedId !== r.id;
            return (
              <button
                key={r.id}
                onMouseEnter={() => setSelectedId(r.id)}
                onClick={() => setSelectedId(selectedId === r.id ? null : r.id)}
                className="flex items-center gap-2 transition-opacity duration-300"
                style={{ opacity: dim ? 0.3 : 1 }}
              >
                {interstateNumber(r.id) ? (
                  <span className="flex flex-col items-center" style={{ lineHeight: 0 }}>
                    <InterstateShield number={interstateNumber(r.id)!} size={22} />
                    <span className="mt-[3px] h-[2px] w-5 rounded-full" style={{ background: r.color }} />
                  </span>
                ) : (
                  <span className="h-[3px] w-7 rounded-full" style={{ background: r.color, opacity: 0.9 }} />
                )}
                <span className="font-macro-body text-xs font-semibold text-white/70">{r.name[locale]}</span>
              </button>
            );
          })}
      </div>
      )}

      {/* Map + zoom controls */}
      <div className="relative w-full">
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
          {[
            { sym: "+", act: () => zoomBy(1.7), aria: "Zoom in" },
            { sym: "−", act: () => zoomBy(1 / 1.7), aria: "Zoom out" },
            { sym: "⌂", act: resetView, aria: "Reset view" },
          ].map((b) => (
            <button
              key={b.aria}
              onClick={b.act}
              aria-label={b.aria}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/70 font-macro-display text-base text-white/70 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white"
            >
              {b.sym}
            </button>
          ))}
        </div>
        {position.zoom > 1.01 && (
          <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-white/10 bg-black/70 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.15em] text-white/50 backdrop-blur-sm">
            {position.zoom.toFixed(1)}×
          </div>
        )}

        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1120 }}
          width={940}
          height={540}
          style={{ width: "100%", height: "auto" }}
          onClick={() => setSelectedId(null)}
        >
          <ZoomableGroup
            center={position.coordinates}
            zoom={position.zoom}
            minZoom={1}
            maxZoom={MAX_ZOOM}
            translateExtent={[
              [-80, -60],
              [1020, 600],
            ]}
            filterZoomEvent={(evt: any) => {
              // Plain wheel keeps scrolling the page; Ctrl/⌘-wheel (and pinch,
              // which browsers report as ctrl+wheel), drag and touch all zoom/pan.
              if (evt?.type === "wheel") return evt.ctrlKey || evt.metaKey;
              return true;
            }}
            onMoveEnd={({ coordinates, zoom }: { coordinates: LngLat; zoom: number }) =>
              setPosition({ coordinates, zoom })
            }
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: any[] }) => (
                <>
                  {geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: "#0a0a0a",
                          stroke: "rgba(255,255,255,0.07)",
                          strokeWidth: 0.6 / position.zoom,
                          outline: "none",
                        },
                        hover: { fill: "#0a0a0a", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))}
                  <RoutesLayer
                    routes={filteredCombinedRoutes}
                    nodes={nodes}
                    era={era}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    reducedMotion={!!prefersReducedMotion}
                    featuredIds={featuredIds}
                    zoom={position.zoom}
                    heat={heat && era === bgEra}
                    geoms={GEOMS}
                    heatCfg={heatCfg}
                    prominentBackground={boldBg && era === bgEra}
                    variant={variant}
                    railFilter={railFilter}
                    powerFilter={powerFilter}
                  />
                </>
              )}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      {labels.zoomHint && (
        <p className="mt-2 text-right font-sans text-[9px] uppercase tracking-[0.15em] text-white/20">
          {labels.zoomHint}
        </p>
      )}

      {/* Detail panel — narrates the hovered/selected corridor.
          Keyed remount (no AnimatePresence): exit-gated swaps deadlock under
          React 19 when the outgoing child never finishes its exit animation. */}
      <div className="mt-2 min-h-[150px] border-t border-white/[0.07] pt-6">
        {selectedPlant ? (
          <motion.div
            key={`plant-${selectedPlant.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <div className="mb-2 flex items-center gap-3">
                <span className="h-[3px] w-10 rounded-full" style={{ background: PLANT_COLOR[selectedPlant.type] }} />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em]" style={{ color: PLANT_COLOR[selectedPlant.type] }}>
                  {locale === "ro" ? "Producător Energie" : "Clean Power Station"}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="font-macro-display text-2xl font-bold tracking-tight text-white">
                  {selectedPlant.name}
                </h3>
                <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.15em] text-white/40">
                  {selectedPlant.location}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                <div>
                  <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30">
                    {locale === "ro" ? "Capacitate" : "Capacity"}
                  </div>
                  <div className="font-hero text-2xl" style={{ color: PLANT_COLOR[selectedPlant.type] }}>
                    {selectedPlant.capacity}
                  </div>
                </div>
                <div>
                  <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30">
                    {locale === "ro" ? "Tip Resursă" : "Energy Source"}
                  </div>
                  <div className="font-hero text-2xl text-white/85 uppercase">
                    {selectedPlant.type}
                  </div>
                </div>
              </div>
            </div>
            <p className="font-macro-body text-base font-light leading-relaxed text-white/65 md:col-span-8 md:text-lg">
              {selectedPlant.description[locale]}
            </p>
          </motion.div>
        ) : selected ? (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <div className="mb-2 flex items-center gap-3">
                <span className="h-[3px] w-10 rounded-full" style={{ background: selected.color }} />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/35">
                  {selected.year}
                </span>
              </div>
              <div className="flex items-start gap-3">
                {interstateNumber(selected.id) && (
                  <InterstateShield
                    number={interstateNumber(selected.id)!}
                    size={56}
                    className="mt-0.5 shrink-0 drop-shadow-md"
                  />
                )}
                <div className="min-w-0">
                  <h3 className="font-macro-display text-2xl font-bold tracking-tight text-white">
                    {selected.name[locale]}
                  </h3>
                  <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.15em] text-white/40">
                    {selected.endpoints[locale]}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                <div>
                  <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30">
                    {labels.lengthLabel}
                  </div>
                  <div className="font-hero text-2xl" style={{ color: selected.color }}>
                    {selected.lengthLabel}
                  </div>
                </div>
                <div>
                  <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30">
                    {labels.openedLabel}
                  </div>
                  <div className="font-hero text-2xl text-white/85">{selected.year}</div>
                </div>
                {selectedAadt > 0 && labels.trafficLabel && (
                  <div>
                    <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30">
                      {labels.trafficLabel}
                    </div>
                    <div className="font-hero text-2xl text-white/85">
                      {selectedAadt.toLocaleString(locale === "ro" ? "ro-RO" : "en-US")}
                      <span className="ml-1.5 font-sans text-[10px] uppercase tracking-[0.1em] text-white/35">
                        {labels.vehiclesPerDay}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="font-macro-body text-base font-light leading-relaxed text-white/65 md:col-span-8 md:text-lg">
              {selected.description[locale]}
            </p>
          </motion.div>
        ) : (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/25"
          >
            {labels.corridorsLabel}
          </motion.p>
        )}
      </div>
    </div>
  );
}
