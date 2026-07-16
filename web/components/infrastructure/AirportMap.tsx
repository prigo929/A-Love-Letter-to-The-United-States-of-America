"use client";

// ─── AirportMap ───────────────────────────────────────────────────────────────
// The commercial-service airports of the United States, plotted from FAA/NTAD
// enplanement data on a geoAlbersUsa projection. Supports both Passengers mode
// and Cargo mode (which displays cargo volume, sized appropriately, with overnight
// sortie lines radiating from Memphis FedEx SuperHub).

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ComposableMap, Geographies, Geography, useMapContext, ZoomableGroup } from "react-simple-maps";
import { GEO_URL } from "@/lib/data/us-geo";
import airportsData from "@/lib/data/airports.json";
import airportsAll from "@/lib/data/airports-all.json";
import {
  AVIATION_HUBS,
  MEM_SORTIE_TARGETS,
  type LngLat,
} from "@/lib/data/infrastructure-network-data";

const US_CENTER: [number, number] = [-96, 38];
const MAX_ZOOM = 12;

// Every non-commercial airfield, drawn as a faint density layer (one SVG path per
// category via round-capped dot segments — one DOM node for thousands of points).
const GA_LAYERS = airportsAll as unknown as Record<string, [number, number][]>;
const GA_COLOR: Record<string, string> = {
  ga: "rgba(255,255,255,0.30)",
  heliport: "rgba(232,185,35,0.34)",
  seaplane: "rgba(56,189,248,0.45)",
  gliderport: "rgba(163,230,53,0.5)",
  ultralight: "rgba(244,114,182,0.5)",
};

type Tier = "L" | "M" | "S";
type Filter = "all" | Tier;
type Mode = "passengers" | "cargo";

interface Airport {
  id: string;
  name: string;
  city: string;
  state: string;
  lng: number;
  lat: number;
  enpl: number;
  pax: number;
  tier: Tier;
  intl: boolean;
  tower: boolean;
  cargo: number;
}

// Enrich FAA database with cargo statistics from AVIATION_HUBS
const AIRPORTS = (airportsData as { airports: Omit<Airport, "cargo">[] }).airports.map((a) => {
  const hub = AVIATION_HUBS.find((h) => h.code === a.id);
  return {
    ...a,
    cargo: hub ? hub.cargo : 0,
  } as Airport;
});

const TIER_COLOR: Record<Tier | "cargo", string> = {
  L: "#E8B923", // large hub — gold
  M: "#60a5fa", // medium hub — blue
  S: "#7c8896", // small hub — steel
  cargo: "#fb923c", // cargo hub — orange
};

/** Quadratic arc between two projected points, bowed perpendicular to the chord. */
function arcPath(a: [number, number], b: [number, number], bow = 0.16): string {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const cx = mx - dy * bow;
  const cy = my + dx * bow;
  return `M ${a[0].toFixed(1)},${a[1].toFixed(1)} Q ${cx.toFixed(1)},${cy.toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`;
}

interface AirportMapLabels {
  all: string;
  major: string;
  medium: string;
  regional: string;
  enplanements: string;
  passengers: string;
  hint: string;
  towered: string;
  international: string;
  perYear: string;
  scopeCommercial: string;
  scopeAll: string;
  gaAirfields: string;
  heliports: string;
  seaplane: string;
}

function AirportsLayer({
  filter,
  scope,
  mode,
  selected,
  onSelect,
  reducedMotion,
  zoom,
}: {
  filter: Filter;
  scope: "commercial" | "all";
  mode: Mode;
  selected: string | null;
  onSelect: (id: string | null) => void;
  reducedMotion: boolean;
  zoom: number;
}) {
  const { projection } = useMapContext();
  const k = 1 / zoom; // counter-scale factor

  // Density layer: one path of round-capped dots per GA category. Only in passengers + scope all
  const gaPaths = useMemo(() => {
    if (scope !== "all" || mode === "cargo") return [];
    return Object.entries(GA_LAYERS).map(([cat, pts]) => {
      let d = "";
      for (const ll of pts) {
        const p = projection(ll);
        if (p) d += `M${p[0].toFixed(1)} ${p[1].toFixed(1)}h0.01`;
      }
      return { cat, d };
    });
  }, [scope, mode, projection]);

  const memP = projection([-89.977, 35.042]);
  const sorties = useMemo(() => {
    if (mode !== "cargo" || !memP) return [];
    return MEM_SORTIE_TARGETS.map((t: LngLat) => projection(t))
      .filter((p): p is [number, number] => Array.isArray(p))
      .map((p) => arcPath(memP, p));
  }, [mode, memP, projection]);

  const drawn = useMemo(() => {
    let list = AIRPORTS;
    if (mode === "cargo") {
      list = AIRPORTS.filter((a) => a.cargo > 0);
    } else {
      list = AIRPORTS.filter((a) => scope === "all" || filter === "all" || a.tier === filter);
    }

    return list
      .map((a) => ({ a, p: projection([a.lng, a.lat]) }))
      .filter((x): x is { a: Airport; p: [number, number] } => Array.isArray(x.p))
      .sort((x, y) => (mode === "cargo" ? y.a.cargo - x.a.cargo : y.a.enpl - x.a.enpl));
  }, [filter, scope, mode, projection]);

  const radius = (a: Airport) => {
    if (mode === "cargo") {
      return (2.5 + Math.sqrt(a.cargo) * 8) * k;
    }
    return (1.4 + Math.sqrt(a.enpl) / 470) * k;
  };

  return (
    <g>
      {/* GA density layer (under the commercial markers) */}
      {gaPaths.map(({ cat, d }) => (
        <path key={cat} d={d} stroke={GA_COLOR[cat]} strokeWidth={1.1 * k} strokeLinecap="round" fill="none" style={{ pointerEvents: "none" }} />
      ))}

      {/* FedEx overnight sorties (cargo mode only) */}
      {mode === "cargo" && sorties.map((d, i) => (
        <g key={i} className="motion-reduce:hidden">
          <path
            d={d}
            fill="none"
            stroke={TIER_COLOR.cargo}
            strokeWidth={0.9 * k}
            strokeDasharray={`${3 * k} ${7 * k}`}
            opacity={0.45}
            pointerEvents="none"
            style={reducedMotion ? undefined : { animation: "infra-dash 2.6s linear infinite" }}
          />
        </g>
      ))}

      {drawn.map(({ a, p }) => {
        const r = radius(a);
        const isSel = selected === a.id;
        const dim = selected !== null && !isSel;
        const color = mode === "cargo" ? TIER_COLOR.cargo : TIER_COLOR[a.tier];
        
        // Show labels for all cargo airports, large commercial ones, or smaller ones as we zoom in
        const showLabel =
          mode === "cargo" ||
          a.enpl > 3_000_000 ||
          (zoom >= 2.0 && a.enpl > 1_000_000) ||
          zoom >= 3.5;

        return (
          <g
            key={a.id}
            style={{ opacity: dim ? 0.25 : 1, transition: "opacity 0.3s ease", cursor: "pointer" }}
            onMouseEnter={() => onSelect(a.id)}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(isSel ? null : a.id);
            }}
          >
            {isSel && !reducedMotion && (
              <circle cx={p[0]} cy={p[1]} r={r} fill="none" stroke={color} strokeWidth={1 * k}>
                <animate attributeName="r" values={`${r};${r * 2.4}`} dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={p[0]} cy={p[1]} r={r} fill={color} fillOpacity={0.22} stroke={color} strokeWidth={isSel ? 1.4 * k : 0.7 * k} />
            <circle cx={p[0]} cy={p[1]} r={1.6 * k} fill="#fff" />
            
            {showLabel && (
              <text
                x={p[0]}
                y={p[1] - r - 3 * k}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: 8.5 * k,
                  letterSpacing: "0.08em",
                  fill: isSel ? color : "rgba(255,255,255,0.65)",
                  paintOrder: "stroke",
                  stroke: "rgba(0,0,0,0.85)",
                  strokeWidth: 2.4 * k,
                  pointerEvents: "none",
                }}
              >
                {a.id}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

export function AirportMap({ locale, labels }: { locale: "en" | "ro"; labels: AirportMapLabels }) {
  const [mode, setMode] = useState<Mode>("passengers");
  const [filter, setFilter] = useState<Filter>("all");
  const [scope, setScope] = useState<"commercial" | "all">("commercial");
  const [selected, setSelected] = useState<string | null>(null);
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: US_CENTER,
    zoom: 1,
  });
  const reduced = useReducedMotion();

  const airport = useMemo(() => AIRPORTS.find((a) => a.id === selected) ?? null, [selected]);
  
  const shown = useMemo(() => {
    if (mode === "cargo") {
      return AIRPORTS.filter((a) => a.cargo > 0).length;
    }
    return scope === "all"
      ? 19514
      : filter === "all"
        ? AIRPORTS.length
        : AIRPORTS.filter((a) => a.tier === filter).length;
  }, [filter, scope, mode]);

  const filters: { id: Filter; label: string; color?: string }[] = [
    { id: "all", label: labels.all },
    { id: "L", label: labels.major, color: TIER_COLOR.L },
    { id: "M", label: labels.medium, color: TIER_COLOR.M },
    { id: "S", label: labels.regional, color: TIER_COLOR.S },
  ];

  const zoomBy = (factor: number) => {
    setPosition((p) => ({
      ...p,
      zoom: Math.min(MAX_ZOOM, Math.max(1, p.zoom * factor)),
    }));
  };

  const resetView = () => setPosition({ coordinates: US_CENTER, zoom: 1 });

  return (
    <div className="w-full">
      <style>{`@keyframes infra-dash { to { stroke-dashoffset: -20; } }`}</style>

      {/* Mode selection toggle */}
      <div className="mb-6 flex gap-2 border-b border-white/5 pb-4">
        {(["passengers", "cargo"] as const).map((m) => {
          const active = mode === m;
          const color = m === "passengers" ? TIER_COLOR.L : TIER_COLOR.cargo;
          return (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setSelected(null);
                setFilter("all");
                setScope("commercial");
                resetView();
              }}
              className="rounded-full border px-4 py-1.5 font-sans text-[11px] font-bold uppercase tracking-wider transition-all"
              style={{
                borderColor: active ? color : "rgba(255,255,255,0.08)",
                background: active ? `${color}14` : "transparent",
                color: active ? color : "rgba(255,255,255,0.5)",
              }}
            >
              {m === "passengers" ? (locale === "ro" ? "Pasageri" : "Passengers") : (locale === "ro" ? "Marfă (Cargo)" : "Cargo")}
            </button>
          );
        })}
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {mode === "passengers" ? (
          <>
            {/* Scope toggle: commercial airports vs every airfield */}
            <div className="flex rounded-full border border-white/12 p-0.5 w-fit">
              {(["commercial", "all"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setScope(s);
                    setSelected(null);
                    resetView();
                  }}
                  className="rounded-full px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.15em] transition-all"
                  style={{
                    background: scope === s ? "rgba(255,255,255,0.9)" : "transparent",
                    color: scope === s ? "#000" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {s === "commercial" ? labels.scopeCommercial : labels.scopeAll}
                </button>
              ))}
            </div>

            {scope === "commercial" && (
              <div className="flex flex-wrap gap-2">
                {filters.map((f) => {
                  const active = filter === f.id;
                  const c = f.color ?? "#E8B923";
                  return (
                    <button
                      key={f.id}
                      onClick={() => {
                        setFilter(f.id);
                        setSelected(null);
                      }}
                      className="flex items-center gap-2 rounded-full border px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.14em] transition-all"
                      style={{
                        borderColor: active ? c : "rgba(255,255,255,0.12)",
                        background: active ? `${c}14` : "transparent",
                        color: active ? c : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {f.id !== "all" && (
                        <span className="h-2 w-2 rounded-full" style={{ background: c }} />
                      )}
                      {f.label}
                    </button>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-orange-400">
            {locale === "ro" ? "Rețeaua națională de marfă aeriană (Cargo)" : "National Air Cargo Network"}
          </div>
        )}
        
        <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-white/35">
          {shown.toLocaleString(locale === "ro" ? "ro-RO" : "en-US")} · {labels.hint}
        </span>
      </div>

      {/* Map area with zoom controls */}
      <div className="relative w-full overflow-hidden">
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
          onClick={() => setSelected(null)}
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
              if (evt?.type === "wheel") return evt.ctrlKey || evt.metaKey;
              return true;
            }}
            onMoveEnd={({ coordinates, zoom }: { coordinates: [number, number]; zoom: number }) =>
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
                        default: { fill: "#0a0a0a", stroke: "rgba(255,255,255,0.07)", strokeWidth: 0.6, outline: "none" },
                        hover: { fill: "#0a0a0a", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))}
                  <AirportsLayer
                    filter={filter}
                    scope={scope}
                    mode={mode}
                    selected={selected}
                    onSelect={setSelected}
                    reducedMotion={!!reduced}
                    zoom={position.zoom}
                  />
                </>
              )}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Detail panel — keyed remount */}
      <div className="mt-2 min-h-[130px] border-t border-white/[0.07] pt-6">
        {airport && (
          <motion.div key={airport.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="mb-1 flex items-center gap-2">
                <span className="font-hero text-2xl" style={{ color: mode === "cargo" ? TIER_COLOR.cargo : TIER_COLOR[airport.tier] }}>
                  {airport.id}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-white/35">
                  {airport.city}, {airport.state}
                </span>
              </div>
              <h3 className="font-macro-display text-2xl font-bold tracking-tight text-white">{airport.name}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {airport.intl && (
                  <span className="rounded-full border border-white/12 px-2.5 py-0.5 font-sans text-[9px] uppercase tracking-wider text-white/50">
                    {labels.international}
                  </span>
                )}
                {airport.tower && (
                  <span className="rounded-full border border-white/12 px-2.5 py-0.5 font-sans text-[9px] uppercase tracking-wider text-white/50">
                    {labels.towered}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-10 md:col-span-7">
              {mode === "passengers" ? (
                <>
                  <div>
                    <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30">{labels.enplanements}</div>
                    <div className="font-hero text-3xl" style={{ color: TIER_COLOR[airport.tier] }}>
                      {(airport.enpl / 1_000_000).toFixed(1)}M
                    </div>
                    <div className="font-sans text-[9px] uppercase tracking-wide text-white/35">{labels.perYear}</div>
                  </div>
                  <div>
                    <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30">{labels.passengers}</div>
                    <div className="font-hero text-3xl text-white/85">{(airport.pax / 1_000_000).toFixed(1)}M</div>
                    <div className="font-sans text-[9px] uppercase tracking-wide text-white/35">{labels.perYear}</div>
                  </div>
                </>
              ) : (
                <div>
                  <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30">
                    {locale === "ro" ? "Volum Anual de Marfă" : "Annual Cargo Volume"}
                  </div>
                  <div className="font-hero text-3xl text-orange-400">
                    {airport.cargo.toFixed(1)}M
                    <span className="ml-1 font-sans text-[11px] uppercase tracking-wide text-white/40">tons</span>
                  </div>
                  <div className="font-sans text-[9px] uppercase tracking-wide text-white/35">
                    {locale === "ro" ? "tone metrice / an" : "metric tonnes / year"}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
