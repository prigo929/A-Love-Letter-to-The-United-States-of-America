"use client";

// ─── DamsBridgesMap ────────────────────────────────────────────────────────────
// An interactive, high-performance USA map plotting the 12 monumental dams and
// bridges of the United States. Category buttons allow filtering by dams (blue)
// and bridges (red). Selecting a marker opens a detailed fact sheet at the bottom.

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ComposableMap, Geographies, Geography, ZoomableGroup, useMapContext } from "react-simple-maps";
import { GEO_URL } from "@/lib/data/us-geo";
import damsBridgesData from "@/lib/data/dams-bridges.json";

interface Monument {
  id: string;
  type: "dam" | "bridge";
  name: { en: string; ro: string };
  location: { en: string; ro: string };
  coordinates: [number, number]; // [lng, lat]
  year: string;
  stat: { en: string; ro: string };
  fact: { en: string; ro: string };
}

const MONUMENTS = (damsBridgesData as { monuments: Monument[] }).monuments;

const TYPE_COLOR: Record<"dam" | "bridge", string> = {
  dam: "#3b82f6",     // Blue for dams (water)
  bridge: "#e11d48",  // Rose/Red for bridges
};

const US_CENTER: [number, number] = [-96.6, 38.7];
const MAX_ZOOM = 8;

interface MapLabels {
  all: string;
  dams: string;
  bridges: string;
  completed: string;
  statLabel: string;
  hint: string;
  scopeLabel: string;
}

function MonumentsLayer({
  filter,
  selected,
  onSelect,
  reducedMotion,
  zoom,
}: {
  filter: "all" | "dam" | "bridge";
  selected: string | null;
  onSelect: (id: string | null) => void;
  reducedMotion: boolean;
  zoom: number;
}) {
  const { projection } = useMapContext();
  const k = 1 / zoom;

  const drawn = useMemo(
    () =>
      MONUMENTS.filter((m) => filter === "all" || m.type === filter)
        .map((m) => ({ m, p: projection(m.coordinates) }))
        .filter((x): x is { m: Monument; p: [number, number] } => Array.isArray(x.p)),
    [filter, projection],
  );

  return (
    <g>
      {drawn.map(({ m, p }) => {
        const isSel = selected === m.id;
        const dim = selected !== null && !isSel;
        const color = TYPE_COLOR[m.type];
        const r = (isSel ? 6.5 : 4.5) * k;

        return (
          <g
            key={m.id}
            style={{ opacity: dim ? 0.3 : 1, transition: "opacity 0.3s ease", cursor: "pointer" }}
            onMouseEnter={() => onSelect(m.id)}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(isSel ? null : m.id);
            }}
          >
            {isSel && !reducedMotion && (
              <circle cx={p[0]} cy={p[1]} r={r} fill="none" stroke={color} strokeWidth={1 * k}>
                <animate attributeName="r" values={`${r};${r * 2.8}`} dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={p[0]} cy={p[1]} r={r} fill={color} fillOpacity={0.3} stroke={color} strokeWidth={isSel ? 1.6 * k : 0.9 * k} />
            <circle cx={p[0]} cy={p[1]} r={2 * k} fill="#fff" />
            
            {/* Short identifier text next to major landmarks */}
            {(isSel || zoom >= 1.8) && (
              <text
                x={p[0] + 10 * k}
                y={p[1] + 3 * k}
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: 9.5 * k,
                  fontWeight: "bold",
                  fill: isSel ? color : "#fff",
                  paintOrder: "stroke",
                  stroke: "rgba(0,0,0,0.85)",
                  strokeWidth: 2.5 * k,
                  pointerEvents: "none",
                }}
              >
                {m.name.en}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

export function DamsBridgesMap({ locale, labels }: { locale: "en" | "ro"; labels: MapLabels }) {
  const [filter, setFilter] = useState<"all" | "dam" | "bridge">("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: US_CENTER,
    zoom: 1,
  });
  const reduced = useReducedMotion();

  const monument = useMemo(() => MONUMENTS.find((m) => m.id === selected) ?? null, [selected]);

  const filters: { id: typeof filter; label: string; color?: string }[] = [
    { id: "all", label: labels.all },
    { id: "dam", label: labels.dams, color: TYPE_COLOR.dam },
    { id: "bridge", label: labels.bridges, color: TYPE_COLOR.bridge },
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
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
                  background: active ? `${c}18` : "transparent",
                  color: active ? c : "rgba(255,255,255,0.5)",
                }}
              >
                {f.id !== "all" && <span className="h-2 w-2 rounded-full" style={{ background: c }} />}
                {f.label}
              </button>
            );
          })}
        </div>
        <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-white/35">
          {labels.hint}
        </span>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Floating Zoom Controls */}
        <div className="absolute right-4 top-4 z-10 flex flex-col gap-1.5">
          {[
            { sym: "+", act: () => zoomBy(1.5), aria: "Zoom in" },
            { sym: "−", act: () => zoomBy(1 / 1.5), aria: "Zoom out" },
            { sym: "⌂", act: resetView, aria: "Reset view" },
          ].map((b) => (
            <button
              key={b.aria}
              onClick={b.act}
              aria-label={b.aria}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-black/60 font-sans text-sm text-white/70 backdrop-blur-sm transition-colors hover:border-white/30 hover:text-white"
            >
              {b.sym}
            </button>
          ))}
        </div>
        {position.zoom > 1.01 && (
          <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/70 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.15em] text-[#3b82f6] backdrop-blur-sm">
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
                        default: { fill: "#0a0a0a", stroke: "rgba(255,255,255,0.07)", strokeWidth: 0.6 / position.zoom, outline: "none" },
                        hover: { fill: "#0a0a0a", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))}
                  <MonumentsLayer
                    filter={filter}
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

      {/* Details slide-up panel */}
      <div className="mt-2 min-h-[140px] border-t border-white/[0.07] pt-6">
        {monument && (
          <motion.div
            key={monument.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-12"
          >
            <div className="md:col-span-5">
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="font-sans text-[10px] font-bold uppercase tracking-[0.15em]"
                  style={{ color: TYPE_COLOR[monument.type] }}
                >
                  {monument.type === "dam" ? labels.dams.replace(/e$/, "") : labels.bridges.replace(/uri$/, "")}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-white/35">
                  · {monument.location[locale]}
                </span>
              </div>
              <h3 className="font-macro-display text-2xl font-bold tracking-tight text-white">
                {monument.name[locale]}
              </h3>
              <div className="mt-3 flex gap-4">
                <div>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-white/30 mr-1.5">
                    {labels.completed}:
                  </span>
                  <span className="font-sans text-[11px] font-bold text-white/80">{monument.year}</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-7 flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="shrink-0">
                <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30">
                  {labels.statLabel}
                </div>
                <div className="font-hero text-3xl mt-1 text-[#E8B923]">
                  {monument.stat[locale]}
                </div>
              </div>
              <div className="flex-1">
                <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30 mb-1">
                  {locale === "ro" ? "Fisă Tehnică & Istorie" : "Fact Sheet & History"}
                </div>
                <p className="font-sans text-[11px] uppercase leading-relaxed tracking-wider text-white/60">
                  {monument.fact[locale]}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
