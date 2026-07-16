"use client";

// ─── PortMap ──────────────────────────────────────────────────────────────────
// An interactive USA map plotting the 34 major deepwater ports of the United States.
// Circle sizes scale with annual cargo tonnage (short tons), and toggle chips filter
// ports by trade type (All, Import-heavy, or Export-heavy). Selecting a port reveals
// a detailed trade balance sheet (imports, exports, domestic vs foreign split).

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ComposableMap, Geographies, Geography, ZoomableGroup, useMapContext } from "react-simple-maps";
import { GEO_URL } from "@/lib/data/us-geo";
import portsData from "@/lib/data/ports.json";

interface Port {
  id: string;
  rank: number;
  name: string;
  fullName: string;
  lng: number;
  lat: number;
  total: number;
  domestic: number;
  foreign: number;
  imports: number;
  exports: number;
}

const PORTS = (portsData as { ports: Port[] }).ports;

// Curated TEU (Twenty-Foot Equivalent Unit) container volumes in millions for major U.S. container ports.
const PORT_TEU: Record<string, number> = {
  "1": 3.9,   // Houston
  "4": 9.4,   // NY & NJ
  "5": 9.1,   // Long Beach
  "9": 3.7,   // Virginia
  "11": 10.6, // Los Angeles
  "13": 5.6,  // Savannah
  "23": 2.6,  // Charleston
  "24": 1.1,  // Everglades
  "31": 1.6,  // Tacoma
  "32": 1.8,  // Seattle
  "33": 2.3,  // Oakland
  "34": 1.2,  // Jacksonville
};

const US_CENTER: [number, number] = [-96.6, 38.7];
const MAX_ZOOM = 8;

type FilterMode = "all" | "imports" | "exports";
type ViewMode = "tonnage" | "teu";

const FILTER_COLOR: Record<FilterMode, string> = {
  all: "#E8B923",     // Gold for all ports
  imports: "#ec4899", // Pink for import-heavy ports
  exports: "#10b981", // Green for export-heavy ports
};

const TEU_COLOR = "#38bdf8"; // Light sky blue for container TEU mode

interface MapLabels {
  all: string;
  imports: string;
  exports: string;
  completed: string;
  statLabel: string;
  hint: string;
  rankLabel: string;
  tonnageLabel: string;
  splitLabel: string;
  domesticLabel: string;
  foreignLabel: string;
}

function PortsLayer({
  filter,
  viewMode,
  selected,
  onSelect,
  reducedMotion,
  zoom,
}: {
  filter: FilterMode;
  viewMode: ViewMode;
  selected: string | null;
  onSelect: (id: string | null) => void;
  reducedMotion: boolean;
  zoom: number;
}) {
  const { projection } = useMapContext();
  const k = 1 / zoom;

  const drawn = useMemo(() => {
    return PORTS.filter((p) => {
      if (viewMode === "teu") {
        return (PORT_TEU[p.id] || 0) > 0;
      }
      if (filter === "all") return true;
      if (filter === "imports") return p.imports > p.exports;
      if (filter === "exports") return p.exports > p.imports;
      return true;
    })
      .map((p) => ({ p, coord: projection([p.lng, p.lat]) }))
      .filter((x): x is { p: Port; coord: [number, number] } => Array.isArray(x.coord));
  }, [filter, viewMode, projection]);

  const getRadius = (p: Port) => {
    if (viewMode === "teu") {
      const teuVal = PORT_TEU[p.id] || 0;
      return (3.2 + Math.sqrt(teuVal) * 5.6) * k;
    }
    return (3.0 + Math.sqrt(p.total) / 2800) * k;
  };

  return (
    <g>
      {drawn.map(({ p, coord }) => {
        const isSel = selected === p.id;
        const dim = selected !== null && !isSel;
        
        // Resolve dominant color based on this port's specific imports/exports profile
        const isImportHeavy = p.imports > p.exports;
        const defaultColor = isImportHeavy ? FILTER_COLOR.imports : FILTER_COLOR.exports;
        const color = viewMode === "teu" ? TEU_COLOR : (filter === "all" ? FILTER_COLOR.all : defaultColor);
        
        const r = getRadius(p);

        return (
          <g
            key={p.id}
            style={{ opacity: dim ? 0.25 : 1, transition: "opacity 0.3s ease", cursor: "pointer" }}
            onMouseEnter={() => onSelect(p.id)}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(isSel ? null : p.id);
            }}
          >
            {isSel && !reducedMotion && (
              <circle cx={coord[0]} cy={coord[1]} r={r} fill="none" stroke={color} strokeWidth={1 * k}>
                <animate attributeName="r" values={`${r};${r * 2.4}`} dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={coord[0]} cy={coord[1]} r={r} fill={color} fillOpacity={0.22} stroke={color} strokeWidth={isSel ? 1.5 * k : 0.8 * k} />
            <circle cx={coord[0]} cy={coord[1]} r={1.5 * k} fill="#fff" />

            {/* Label displayed on hover / select or when zoomed in */}
            {(isSel || zoom >= 2.0) && (
              <text
                x={coord[0]}
                y={coord[1] - r - 4 * k}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: 8.5 * k,
                  fontWeight: "bold",
                  fill: isSel ? color : "#fff",
                  paintOrder: "stroke",
                  stroke: "rgba(0,0,0,0.85)",
                  strokeWidth: 2.5 * k,
                  pointerEvents: "none",
                }}
              >
                {p.name.split(",")[0]}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

export function PortMap({ locale, labels }: { locale: "en" | "ro"; labels: MapLabels }) {
  const [viewMode, setViewMode] = useState<ViewMode>("tonnage");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: US_CENTER,
    zoom: 1,
  });
  const reduced = useReducedMotion();

  const port = useMemo(() => PORTS.find((p) => p.id === selected) ?? null, [selected]);

  const filters: { id: FilterMode; label: string; color: string }[] = [
    { id: "all", label: labels.all, color: FILTER_COLOR.all },
    { id: "imports", label: labels.imports, color: FILTER_COLOR.imports },
    { id: "exports", label: labels.exports, color: FILTER_COLOR.exports },
  ];

  const zoomBy = (factor: number) => {
    setPosition((p) => ({
      ...p,
      zoom: Math.min(MAX_ZOOM, Math.max(1, p.zoom * factor)),
    }));
  };

  const resetView = () => setPosition({ coordinates: US_CENTER, zoom: 1 });

  // Calculate totals for details calculations
  const detailsStats = useMemo(() => {
    if (!port) return null;
    const totalM = (port.total / 1000000).toFixed(1);
    const domesticM = (port.domestic / 1000000).toFixed(1);
    const foreignM = (port.foreign / 1000000).toFixed(1);
    
    // Split percentages
    const foreignPct = Math.round((port.foreign / port.total) * 100);
    const domesticPct = 100 - foreignPct;
    
    const tradeTotal = port.imports + port.exports;
    const importPct = tradeTotal > 0 ? Math.round((port.imports / tradeTotal) * 100) : 0;
    const exportPct = 100 - importPct;

    const teuVal = PORT_TEU[port.id];

    return {
      totalM,
      domesticM,
      foreignM,
      foreignPct,
      domesticPct,
      importPct,
      exportPct,
      teuVal,
    };
  }, [port]);

  return (
    <div className="w-full">
      {/* Tonnage vs TEU mode selection toggle */}
      <div className="mb-6 flex gap-2 border-b border-white/5 pb-4">
        {[
          { id: "tonnage", label: locale === "ro" ? "Tonaj Anual" : "Annual Tonnage", color: FILTER_COLOR.all },
          { id: "teu", label: locale === "ro" ? "Volum Containere (TEU)" : "Container Volume (TEU)", color: TEU_COLOR },
        ].map((m) => {
          const active = viewMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                setViewMode(m.id as ViewMode);
                setSelected(null);
                setFilter("all");
                resetView();
              }}
              className="rounded-full border px-4 py-1.5 font-sans text-[11px] font-bold uppercase tracking-wider transition-all"
              style={{
                borderColor: active ? m.color : "rgba(255,255,255,0.08)",
                background: active ? `${m.color}14` : "transparent",
                color: active ? m.color : "rgba(255,255,255,0.5)",
              }}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {viewMode === "tonnage" ? (
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    setFilter(f.id);
                    setSelected(null);
                  }}
                  className="flex items-center gap-2 rounded-full border px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.14em] transition-all"
                  style={{
                    borderColor: active ? f.color : "rgba(255,255,255,0.12)",
                    background: active ? `${f.color}18` : "transparent",
                    color: active ? f.color : "rgba(255,255,255,0.5)",
                  }}
                >
                  {f.id !== "all" && <span className="h-2 w-2 rounded-full" style={{ background: f.color }} />}
                  {f.label}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="rounded-full border border-[#38bdf8]/20 bg-[#38bdf8]/5 px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-[#38bdf8]">
            {locale === "ro" ? "Principalele porturi de containere" : "Top Cargo Container Ports"}
          </div>
        )}
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
          <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/70 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.15em] text-[#38bdf8] backdrop-blur-sm">
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
                  <PortsLayer
                    filter={filter}
                    viewMode={viewMode}
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

      {/* Detail panel */}
      <div className="mt-2 min-h-[140px] border-t border-white/[0.07] pt-6">
        {port && detailsStats && (
          <motion.div
            key={port.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <div className="mb-1">
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-[#E8B923]">
                  {labels.rankLabel}: #{port.rank}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-white/35 ml-2">
                  · {locale === "ro" ? "Port Deepwater" : "Deepwater Port"}
                </span>
              </div>
              <h3 className="font-macro-display text-2xl font-bold tracking-tight text-white mb-2">
                {port.name}
              </h3>
              <p className="font-sans text-[9px] uppercase tracking-wider text-white/40 leading-relaxed">
                {port.fullName}
              </p>
            </div>
            
            <div className="md:col-span-8 grid gap-8 sm:grid-cols-3">
              {viewMode === "teu" && detailsStats.teuVal ? (
                <div>
                  <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#38bdf8]">
                    {locale === "ro" ? "Volum containere" : "Container Volume"}
                  </div>
                  <div className="font-hero text-3xl mt-1 text-[#38bdf8]">
                    {detailsStats.teuVal}M
                    <span className="ml-1.5 font-sans text-[10px] uppercase tracking-wide text-white/45">TEU / yr</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30">
                    {labels.tonnageLabel}
                  </div>
                  <div className="font-hero text-3xl mt-1 text-[#E8B923]">
                    {detailsStats.totalM}M
                    <span className="ml-1 font-sans text-[10px] uppercase tracking-wide text-white/40">tons</span>
                  </div>
                </div>
              )}
              
              {/* Domestic vs Foreign split bar (only makes sense for overall tonnage) */}
              {port.total > 0 && (
                <div>
                  <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30 mb-2">
                    {labels.splitLabel}
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
                    <div className="h-full bg-[#3b82f6]" style={{ width: `${detailsStats.domesticPct}%` }} />
                    <div className="h-full bg-white/40" style={{ width: `${detailsStats.foreignPct}%` }} />
                  </div>
                  <div className="flex justify-between mt-2 font-sans text-[8px] uppercase tracking-widest text-white/40">
                    <span className="text-[#3b82f6]">{labels.domesticLabel}: {detailsStats.domesticPct}%</span>
                    <span>{labels.foreignLabel}: {detailsStats.foreignPct}%</span>
                  </div>
                </div>
              )}

              {/* Imports vs Exports split bar (only if port has foreign trade) */}
              {port.foreign > 0 && (
                <div>
                  <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30 mb-2">
                    {locale === "ro" ? "Import vs Export" : "Imports vs Exports"}
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
                    <div className="h-full bg-[#ec4899]" style={{ width: `${detailsStats.importPct}%` }} />
                    <div className="h-full bg-[#10b981]" style={{ width: `${detailsStats.exportPct}%` }} />
                  </div>
                  <div className="flex justify-between mt-2 font-sans text-[8px] uppercase tracking-widest text-white/40">
                    <span className="text-[#ec4899]">Imports: {detailsStats.importPct}%</span>
                    <span className="text-[#10b981]">Exports: {detailsStats.exportPct}%</span>
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
