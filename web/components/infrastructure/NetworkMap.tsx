"use client";

// ─── NetworkMap ───────────────────────────────────────────────────────────────
// The interactive continental-network map used by the Interstate Highway and
// Continental Rail pages.
//
//  · Era pills cross-fade between historic layers (routes are keyed by era, so
//    switching re-triggers the organic draw-on animation).
//  · Corridors draw themselves in with a framer-motion pathLength animation and
//    carry a moving "vehicle" dot via SVG <animateMotion>.
//  · Hovering (or tapping) a corridor chip or the line itself illuminates that
//    route and dims the rest; a detail panel narrates the selection.
//  · Controls and detail panel live in normal document flow — nothing overlays
//    the map, so mobile never clips (lesson learned on the explorer page).

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  useMapContext,
} from "react-simple-maps";
import { GEO_URL } from "@/lib/data/us-geo";
import interstatesData from "@/lib/data/interstates-simplified.json";
import type { NetworkEra, NetworkRoute, MapNode, LngLat } from "@/lib/data/infrastructure-network-data";

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

// ─── Route layer (needs the projection, so it must live inside the map) ──────

function RoutesLayer({
  routes,
  nodes,
  era,
  selectedId,
  onSelect,
  reducedMotion,
}: {
  routes: NetworkRoute[];
  nodes: MapNode[];
  era: string;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  reducedMotion: boolean;
}) {
  const { projection } = useMapContext();

  const drawn = useMemo(
    () =>
      routes
        .filter((r) => r.era === era)
        .map((r) => ({ route: r, d: buildPath(r.waypoints, projection) }))
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

  const allInterstatesPaths = useMemo(() => {
    if (era !== "interstate") return [];
    const pathsList: { id: string; d: string; isFeatured: boolean }[] = [];
    for (const routeName in interstatesData) {
      const isFeatured = routes.some(
        (r) => r.era === "interstate" && r.id.toLowerCase() === routeName.toLowerCase(),
      );
      const segments = (interstatesData as any)[routeName] || [];
      segments.forEach((seg: any, idx: number) => {
        const d = buildPath(seg as LngLat[], projection);
        if (d) {
          pathsList.push({ id: `${routeName}-${idx}`, d, isFeatured });
        }
      });
    }
    return pathsList;
  }, [era, routes, projection]);

  return (
    <g>
      {/* Background Interstates Network */}
      {era === "interstate" &&
        allInterstatesPaths.map((p) => (
          <motion.path
            key={p.id}
            d={p.d}
            fill="none"
            stroke={p.isFeatured ? "transparent" : "rgba(96, 165, 250, 0.18)"}
            strokeWidth={0.7}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            style={{ pointerEvents: "none" }}
          />
        ))}

      {drawn.map(({ route, d }, i) => {
        const dimmed = selectedId !== null && selectedId !== route.id;
        return (
          <g key={`${era}-${route.id}`} style={{ opacity: dimmed ? 0.13 : 1, transition: "opacity 0.35s ease" }}>
            {/* Soft glow underlay */}
            <path d={d} fill="none" stroke={route.color} strokeWidth={5} strokeLinecap="round" opacity={0.14} style={{ pointerEvents: "none" }} />
            {/* The corridor itself — draws on organically when the era mounts */}
            {route.dashed || reducedMotion ? (
              <motion.path
                d={d}
                fill="none"
                stroke={route.color}
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeDasharray={route.dashed ? "5 6" : undefined}
                style={{ pointerEvents: "none" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.95 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1, delay: i * 0.18 }}
              />
            ) : (
              <motion.path
                d={d}
                fill="none"
                stroke={route.color}
                strokeWidth={1.7}
                strokeLinecap="round"
                style={{ pointerEvents: "none" }}
                initial={{ pathLength: 0, opacity: 0.4 }}
                whileInView={{ pathLength: 1, opacity: 0.95 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 2.1, ease: "easeInOut", delay: i * 0.18 }}
              />
            )}
            {/* Moving vehicle dot — always mounted (inherits group opacity);
                pointer-transparent so it never perturbs hover state. */}
            {!reducedMotion && (
              <circle r={2.4} fill={route.color} stroke="#000" strokeWidth={0.6} style={{ pointerEvents: "none" }}>
                <animateMotion dur={`${11 + i * 2.5}s`} repeatCount="indefinite" path={d} />
              </circle>
            )}
            {/* Fat invisible hit-area for hover/tap */}
            <path
              d={d}
              fill="none"
              stroke="transparent"
              strokeWidth={14}
              style={{ pointerEvents: "stroke", cursor: "pointer" }}
              onMouseEnter={() => onSelect(route.id)}
              onClick={() => onSelect(selectedId === route.id ? null : route.id)}
            />
          </g>
        );
      })}

      {/* Junction nodes */}
      {projectedNodes.map(({ node, p }) => (
        <g key={node.id} style={{ pointerEvents: "none" }}>
          <circle cx={p[0]} cy={p[1]} r={node.major ? 3.4 : 2.2} fill="#fff" stroke="#000" strokeWidth={0.8} />
          <text
            x={p[0] + 6}
            y={p[1] - 5}
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: node.major ? 10.5 : 8.5,
              fill: node.major ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              paintOrder: "stroke",
              stroke: "rgba(0,0,0,0.85)",
              strokeWidth: 2.5,
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
  labels: {
    eraLabel: string;
    corridorsLabel: string;
    lengthLabel: string;
    openedLabel: string;
    hint: string;
  };
}

export function NetworkMap({ locale, eras, routes, nodes, accent = "#fbbf24", labels }: NetworkMapProps) {
  const [era, setEra] = useState(eras[0].id);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const eraRoutes = useMemo(() => routes.filter((r) => r.era === era), [routes, era]);
  const selected = useMemo(
    () => eraRoutes.find((r) => r.id === selectedId) ?? null,
    [eraRoutes, selectedId],
  );

  const switchEra = (id: string) => {
    setEra(id);
    setSelectedId(null);
  };

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

      {/* Corridor chips (legend + selector) */}
      <div className="mb-6 flex flex-wrap gap-x-5 gap-y-2" onMouseLeave={() => setSelectedId(null)}>
        {eraRoutes.map((r) => {
          const dim = selectedId !== null && selectedId !== r.id;
          return (
            <button
              key={r.id}
              onMouseEnter={() => setSelectedId(r.id)}
              onClick={() => setSelectedId(selectedId === r.id ? null : r.id)}
              className="flex items-center gap-2 transition-opacity duration-300"
              style={{ opacity: dim ? 0.3 : 1 }}
            >
              <span
                className="h-[3px] w-7 rounded-full"
                style={{ background: r.color, opacity: 0.9 }}
              />
              <span className="font-macro-body text-xs font-semibold text-white/70">
                {r.name[locale]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Map */}
      <div className="relative w-full" onMouseLeave={() => setSelectedId(null)}>
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1120 }}
          width={940}
          height={540}
          style={{ width: "100%", height: "auto" }}
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
                        strokeWidth: 0.6,
                        outline: "none",
                      },
                      hover: { fill: "#0a0a0a", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))}
                <RoutesLayer
                  routes={routes}
                  nodes={nodes}
                  era={era}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  reducedMotion={!!prefersReducedMotion}
                />
              </>
            )}
          </Geographies>
        </ComposableMap>
      </div>

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
              <div className="mt-4 flex gap-8">
                <div>
                  <div className="font-macro-mono text-[9px] uppercase tracking-[0.2em] text-white/30">{labels.lengthLabel}</div>
                  <div className="font-hero text-2xl" style={{ color: selected.color }}>{selected.lengthLabel}</div>
                </div>
                <div>
                  <div className="font-macro-mono text-[9px] uppercase tracking-[0.2em] text-white/30">{labels.openedLabel}</div>
                  <div className="font-hero text-2xl text-white/85">{selected.year}</div>
                </div>
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
