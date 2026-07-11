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
import type { NetworkEra, NetworkRoute, MapNode, LngLat } from "@/lib/data/infrastructure-network-data";

interface RouteGeom {
  segments: LngLat[][];
  miles: number;
  aadt: number;
}
const INTERSTATE_GEOMS = interstatesData as unknown as Record<string, RouteGeom>;

const US_CENTER: LngLat = [-96.6, 38.7];
const MAX_ZOOM = 12;

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
}: {
  routes: NetworkRoute[];
  nodes: MapNode[];
  era: string;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  reducedMotion: boolean;
  featuredIds: Set<string>;
  zoom: number;
}) {
  const { projection } = useMapContext();
  const k = 1 / zoom; // counter-scale factor for screen-constant sizes

  const drawn = useMemo(
    () =>
      routes
        .filter((r) => r.era === era)
        .map((r) => {
          const geom = INTERSTATE_GEOMS[r.id.toUpperCase()];
          if (geom && geom.segments.length > 0) {
            const paths = geom.segments
              .map((seg) => buildPolyline(seg as LngLat[], projection))
              .filter(Boolean);
            // The generator sorts segments longest-first: the vehicle dot
            // follows the main alignment, not a disconnected twin.
            return { route: r, d: paths.join(" "), dotD: paths[0] ?? "" };
          }
          const d = buildPath(r.waypoints, projection);
          return { route: r, d, dotD: d };
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
      {drawn.map(({ route, d, dotD }, i) => {
        const isFeatured = featuredIds.has(route.id);
        const isSelected = selectedId === route.id;
        const dimmed = selectedId !== null && !isSelected;

        const strokeWidth = isSelected ? 2.1 : isFeatured ? 1.5 : 0.8;
        const strokeColor = isSelected || isFeatured ? route.color : "rgba(148, 163, 184, 0.4)";

        return (
          <g
            key={`${era}-${route.id}`}
            className="group cursor-pointer"
            style={{ opacity: dimmed ? (isFeatured ? 0.45 : 0.4) : 1, transition: "opacity 0.3s ease" }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(selectedId === route.id ? null : route.id);
            }}
          >
            {/* Soft glow underlay — featured/selected only */}
            {(isFeatured || isSelected) && (
              <motion.path
                d={d}
                fill="none"
                stroke={route.color}
                strokeWidth={4.5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-200 group-hover:opacity-40"
                style={{ pointerEvents: "none" }}
                animate={isSelected ? { opacity: [0.12, 0.28, 0.12] } : { opacity: 0.13 }}
                transition={isSelected ? { duration: 2.0, repeat: Infinity, ease: "easeInOut" } : undefined}
              />
            )}
            {/* The corridor itself */}
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
                whileInView={{ opacity: 0.95 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1, delay: isFeatured ? i * 0.1 : 0.2 }}
              />
            ) : isFeatured ? (
              <motion.path
                d={d}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-200 group-hover:brightness-150"
                style={{ pointerEvents: "none" }}
                initial={{ pathLength: 0, opacity: 0.4 }}
                whileInView={{ pathLength: 1, opacity: 0.95 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 2.1, ease: "easeInOut", delay: i * 0.1 }}
              />
            ) : (
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
                whileInView={{ opacity: 0.85 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.4, delay: 0.35 }}
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
  };
}

export function NetworkMap({
  locale,
  eras,
  routes,
  nodes,
  accent = "#fbbf24",
  backgroundNetwork = false,
  labels,
}: NetworkMapProps) {
  const [era, setEra] = useState(eras[0].id);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [position, setPosition] = useState<{ coordinates: LngLat; zoom: number }>({
    coordinates: US_CENTER,
    zoom: 1,
  });
  const prefersReducedMotion = useReducedMotion();

  const featuredIds = useMemo(() => new Set(routes.map((r) => r.id)), [routes]);

  /** Featured corridors + (optionally) every other primary Interstate as a
   *  discoverable background route, with real NTAD mileage and traffic. */
  const combinedRoutes = useMemo(() => {
    if (!backgroundNetwork) return routes;
    const list = [...routes];
    for (const key of Object.keys(INTERSTATE_GEOMS)) {
      const id = key.toLowerCase();
      if (list.some((r) => r.id === id)) continue;
      const num = parseInt(key.replace("I", ""), 10);
      const geom = INTERSTATE_GEOMS[key];
      const isOdd = num % 2 !== 0;
      list.push({
        id,
        era: "interstate",
        name: { en: `Interstate ${num}`, ro: `Interstatala ${num}` },
        color: isOdd ? "#60a5fa" : "#fb923c",
        waypoints: [],
        endpoints: {
          en: isOdd ? "North ⇄ South corridor" : "East ⇄ West corridor",
          ro: isOdd ? "Coridor Nord ⇄ Sud" : "Coridor Est ⇄ Vest",
        },
        lengthLabel: `${geom.miles.toLocaleString("en-US")} mi`,
        year: "1956–",
        description: {
          en: `A primary route of the Interstate System. Along its ${geom.miles.toLocaleString("en-US")} miles, the average segment carries about ${geom.aadt.toLocaleString("en-US")} vehicles every day (FHWA National Highway System data).`,
          ro: `O rută primară a Sistemului Interstatal. De-a lungul celor ${geom.miles.toLocaleString("ro-RO")} mile, segmentul mediu este tranzitat de circa ${geom.aadt.toLocaleString("ro-RO")} de vehicule în fiecare zi (date FHWA, National Highway System).`,
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
      {/* Era toggle */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
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
        <p className="max-w-xs font-macro-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-white/25">
          {labels.hint}
        </p>
      </div>

      {/* Corridor chips (featured legend + selector) */}
      <div className="mb-6 flex flex-wrap gap-x-5 gap-y-2" onMouseLeave={() => setSelectedId(null)}>
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
                <span className="h-[3px] w-7 rounded-full" style={{ background: r.color, opacity: 0.9 }} />
                <span className="font-macro-body text-xs font-semibold text-white/70">{r.name[locale]}</span>
              </button>
            );
          })}
      </div>

      {/* Map + zoom controls */}
      <div className="relative w-full" onMouseLeave={() => setSelectedId(null)}>
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
              <h3 className="font-macro-display text-2xl font-bold tracking-tight text-white">
                {selected.name[locale]}
              </h3>
              <p className="mt-1 font-macro-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
                {selected.endpoints[locale]}
              </p>
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
