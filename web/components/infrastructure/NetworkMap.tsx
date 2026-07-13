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
  aadt: number;
}
const INTERSTATE_GEOMS = interstatesData as unknown as Record<string, RouteGeom>;

const US_CENTER: LngLat = [-96.6, 38.7];
const MAX_ZOOM = 12;

// ─── AADT traffic heat scale ──────────────────────────────────────────────────
// Average daily traffic spans from ~5k (rural Alaska) to ~300k (urban cores), so
// the ramp is logarithmic. Blue (quiet) → teal → amber → red (jammed).
const HEAT_STOPS: [number, [number, number, number]][] = [
  [0.0, [56, 130, 246]], // blue
  [0.4, [45, 212, 191]], // teal
  [0.7, [251, 191, 36]], // amber
  [1.0, [239, 68, 68]], // red
];
function heatColor(aadt: number): string {
  const lo = Math.log10(5000);
  const hi = Math.log10(250000);
  const t = Math.max(0, Math.min(1, (Math.log10(Math.max(1000, aadt)) - lo) / (hi - lo)));
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

// ─── Path helpers ─────────────────────────────────────────────────────────────

/** Projects waypoints and threads a gentle quadratic curve through them. */
function buildPath(
  waypoints: LngLat[],
  projection: (c: LngLat) => [number, number] | null,
): string {
  const pts = waypoints
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
  const pts = coords
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
}) {
  const { projection } = useMapContext();
  const k = 1 / zoom; // counter-scale factor for screen-constant sizes

  const drawn = useMemo(
    () =>
      routes
        .filter((r) => r.era === era)
        .map((r) => {
          const geom = INTERSTATE_GEOMS[r.id.toUpperCase()];
          const aadt = geom?.aadt ?? 0;
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
          const d = buildPath(r.waypoints, projection);
          return { route: r, d, dotD: d, anchor: anchorFrom(r.waypoints), aadt };
        })
        .filter((r) => r.d),
    [routes, era, projection],
  );

  const projectedNodes = useMemo(
    () =>
      nodes
        .map((n) => ({ node: n, p: projection(n.coordinates) }))
        .filter((n): n is { node: MapNode; p: [number, number] } => Array.isArray(n.p)),
    [nodes, projection],
  );

  return (
    <g>
      {drawn.map(({ route, d, dotD, aadt }, i) => {
        const isFeatured = featuredIds.has(route.id);
        const isSelected = selectedId === route.id;
        const dimmed = selectedId !== null && !isSelected;

        // Traffic-heat mode recolours every route by its average daily traffic
        // and thickens the busiest corridors, flattening the corridor/background
        // distinction so the whole network reads as a flow map.
        const strokeWidth = heat
          ? (isSelected ? 1.2 : 0.6) + Math.min(2.4, Math.log10(Math.max(1000, aadt)) - 3) * 1.1
          : isSelected
            ? 2.1
            : isFeatured
              ? 1.5
              : 0.9;
        const strokeColor = heat ? heatColor(aadt) : route.color;
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
                : 0.14
              : isFeatured
                ? 0.95
                : 0.46;

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
              fontFamily: "var(--font-mono), monospace",
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
  /** Render the full primary-Interstate grid behind the featured corridors. */
  backgroundNetwork?: boolean;
  /** Offer a traffic-heat colour mode toggle (needs AADT-bearing routes). */
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
  enableHeatmap = false,
  hideEraToggle = false,
  initialEra,
  labels,
}: NetworkMapProps) {
  const [era, setEra] = useState(initialEra ?? eras[0].id);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [heat, setHeat] = useState(false);
  const [position, setPosition] = useState<{ coordinates: LngLat; zoom: number }>({
    coordinates: US_CENTER,
    zoom: 1,
  });
  const prefersReducedMotion = useReducedMotion();

  const featuredIds = useMemo(() => new Set(routes.map((r) => r.id)), [routes]);

  /** Featured corridors + (optionally) every other Interstate — primaries, the
   *  3-digit rings/spurs, and the Alaska/Hawaii systems — as discoverable
   *  background routes, each with real NTAD mileage and traffic. */
  const combinedRoutes = useMemo(() => {
    if (!backgroundNetwork) return routes;
    const list = [...routes];
    for (const key of Object.keys(INTERSTATE_GEOMS)) {
      const id = key.toLowerCase();
      if (list.some((r) => r.id === id)) continue;
      const geom = INTERSTATE_GEOMS[key];
      const en = describeKey(key, "en");
      const ro = describeKey(key, "ro");
      list.push({
        id,
        era: "interstate",
        name: { en: en.name, ro: ro.name },
        color: en.color,
        waypoints: [],
        endpoints: { en: en.endpoints, ro: ro.endpoints },
        lengthLabel: `${geom.miles.toLocaleString("en-US")} mi`,
        year: "1956–",
        description: {
          en: `A route of the Interstate System. Along its ${geom.miles.toLocaleString("en-US")} miles, the average segment carries about ${geom.aadt.toLocaleString("en-US")} vehicles every day (FHWA National Highway System data).`,
          ro: `O rută a Sistemului Interstatal. De-a lungul celor ${geom.miles.toLocaleString("ro-RO")} mile, segmentul mediu este tranzitat de circa ${geom.aadt.toLocaleString("ro-RO")} de vehicule în fiecare zi (date FHWA, National Highway System).`,
        },
      });
    }
    return list;
  }, [routes, backgroundNetwork]);

  const eraRoutes = useMemo(() => combinedRoutes.filter((r) => r.era === era), [combinedRoutes, era]);
  const selected = useMemo(
    () => eraRoutes.find((r) => r.id === selectedId) ?? null,
    [eraRoutes, selectedId],
  );
  const selectedAadt = useMemo(() => {
    if (!selected) return 0;
    return INTERSTATE_GEOMS[selected.id.toUpperCase()]?.aadt ?? 0;
  }, [selected]);

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
            <span className="font-macro-mono text-[11px] font-bold uppercase tracking-[0.25em] text-white/35">
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
                    <span className="block font-macro-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
                      {e.sublabel[locale]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex flex-col items-start gap-3 md:items-end">
          {/* Colour-mode toggle: corridor colours vs traffic heat */}
          {enableHeatmap && era === "interstate" && (
            <div className="flex rounded-full border border-white/12 p-0.5">
              {[
                { on: false, label: labels.viewCorridors ?? "Corridors" },
                { on: true, label: labels.viewTraffic ?? "Traffic" },
              ].map((m) => (
                <button
                  key={String(m.on)}
                  onClick={() => setHeat(m.on)}
                  className="rounded-full px-3.5 py-1 font-macro-mono text-[10px] font-bold uppercase tracking-[0.15em] transition-all"
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
          <p className="max-w-xs font-macro-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-white/25 md:text-right">
            {labels.hint}
          </p>
        </div>
      </div>

      {/* Traffic-heat legend (replaces the corridor chips in heat mode) */}
      {heat && era === "interstate" ? (
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <span className="font-macro-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
            {labels.heatLow ?? "Quiet"}
          </span>
          <div
            className="h-2 w-56 max-w-[55vw] rounded-full"
            style={{
              background: `linear-gradient(to right, ${heatColor(5000)}, ${heatColor(20000)}, ${heatColor(70000)}, ${heatColor(250000)})`,
            }}
          />
          <span className="font-macro-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
            {labels.heatHigh ?? "Jammed"}
          </span>
        </div>
      ) : (
      /* Corridor chips (featured legend + selector) */
      <div className="mb-6 flex flex-wrap gap-x-5 gap-y-2">
        {eraRoutes
          .filter((r) => featuredIds.has(r.id))
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
          <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-white/10 bg-black/70 px-3 py-1 font-macro-mono text-[10px] uppercase tracking-[0.15em] text-white/50 backdrop-blur-sm">
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
                    routes={combinedRoutes}
                    nodes={nodes}
                    era={era}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    reducedMotion={!!prefersReducedMotion}
                    featuredIds={featuredIds}
                    zoom={position.zoom}
                    heat={heat && era === "interstate"}
                  />
                </>
              )}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      {labels.zoomHint && (
        <p className="mt-2 text-right font-macro-mono text-[9px] uppercase tracking-[0.15em] text-white/20">
          {labels.zoomHint}
        </p>
      )}

      {/* Detail panel — narrates the hovered/selected corridor.
          Keyed remount (no AnimatePresence): exit-gated swaps deadlock under
          React 19 when the outgoing child never finishes its exit animation. */}
      <div className="mt-2 min-h-[150px] border-t border-white/[0.07] pt-6">
        {selected ? (
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
                <span className="font-macro-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
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
                  <p className="mt-1 font-macro-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
                    {selected.endpoints[locale]}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                <div>
                  <div className="font-macro-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                    {labels.lengthLabel}
                  </div>
                  <div className="font-hero text-2xl" style={{ color: selected.color }}>
                    {selected.lengthLabel}
                  </div>
                </div>
                <div>
                  <div className="font-macro-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                    {labels.openedLabel}
                  </div>
                  <div className="font-hero text-2xl text-white/85">{selected.year}</div>
                </div>
                {selectedAadt > 0 && labels.trafficLabel && (
                  <div>
                    <div className="font-macro-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                      {labels.trafficLabel}
                    </div>
                    <div className="font-hero text-2xl text-white/85">
                      {selectedAadt.toLocaleString(locale === "ro" ? "ro-RO" : "en-US")}
                      <span className="ml-1.5 font-macro-mono text-[10px] uppercase tracking-[0.1em] text-white/35">
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
            className="font-macro-mono text-[11px] uppercase tracking-[0.2em] text-white/25"
          >
            {labels.corridorsLabel}
          </motion.p>
        )}
      </div>
    </div>
  );
}
