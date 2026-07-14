"use client";

// ─── PortMap ──────────────────────────────────────────────────────────────────
// An interactive USA map plotting the 34 major deepwater ports of the United States.
// Circle sizes scale with annual cargo tonnage (short tons), and toggle chips filter
// ports by trade type (All, Import-heavy, or Export-heavy). Selecting a port reveals
// a detailed trade balance sheet (imports, exports, domestic vs foreign split).

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ComposableMap, Geographies, Geography, useMapContext } from "react-simple-maps";
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

//Sizing function: radius scales with the square root of total cargo tonnage
const getRadius = (total: number) => 3.0 + Math.sqrt(total) / 2800;

type FilterMode = "all" | "imports" | "exports";

const FILTER_COLOR: Record<FilterMode, string> = {
  all: "#E8B923",     // Gold for all ports
  imports: "#ec4899", // Pink for import-heavy ports
  exports: "#10b981", // Green for export-heavy ports
};

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
  selected,
  onSelect,
  reducedMotion,
}: {
  filter: FilterMode;
  selected: string | null;
  onSelect: (id: string | null) => void;
  reducedMotion: boolean;
}) {
  const { projection } = useMapContext();

  const drawn = useMemo(() => {
    return PORTS.filter((p) => {
      if (filter === "all") return true;
      if (filter === "imports") return p.imports > p.exports;
      if (filter === "exports") return p.exports > p.imports;
      return true;
    })
      .map((p) => ({ p, coord: projection([p.lng, p.lat]) }))
      .filter((x): x is { p: Port; coord: [number, number] } => Array.isArray(x.coord));
  }, [filter, projection]);

  return (
    <g>
      {drawn.map(({ p, coord }) => {
        const isSel = selected === p.id;
        const dim = selected !== null && !isSel;
        
        // Resolve dominant color based on this port's specific imports/exports profile
        const isImportHeavy = p.imports > p.exports;
        const defaultColor = isImportHeavy ? FILTER_COLOR.imports : FILTER_COLOR.exports;
        const color = filter === "all" ? FILTER_COLOR.all : defaultColor;
        
        const r = getRadius(p.total);

        return (
          <g
            key={p.id}
            style={{ opacity: dim ? 0.25 : 1, transition: "opacity 0.3s ease", cursor: "pointer" }}
            onMouseEnter={() => onSelect(p.id)}
            onClick={() => onSelect(isSel ? null : p.id)}
          >
            {isSel && !reducedMotion && (
              <circle cx={coord[0]} cy={coord[1]} r={r} fill="none" stroke={color} strokeWidth={1}>
                <animate attributeName="r" values={`${r};${r * 2.4}`} dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={coord[0]} cy={coord[1]} r={r} fill={color} fillOpacity={0.22} stroke={color} strokeWidth={isSel ? 1.5 : 0.8} />
            <circle cx={coord[0]} cy={coord[1]} r={1.5} fill="#fff" />

            {/* Label displayed on hover */}
            {isSel && (
              <text
                x={coord[0]}
                y={coord[1] - r - 4}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: 9,
                  fontWeight: "bold",
                  fill: "#fff",
                  paintOrder: "stroke",
                  stroke: "rgba(0,0,0,0.85)",
                  strokeWidth: 2.5,
                  pointerEvents: "none",
                }}
              >
                {p.name}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

export function PortMap({ locale, labels }: { locale: "en" | "ro"; labels: MapLabels }) {
  const [filter, setFilter] = useState<FilterMode>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const port = useMemo(() => PORTS.find((p) => p.id === selected) ?? null, [selected]);

  const filters: { id: FilterMode; label: string; color: string }[] = [
    { id: "all", label: labels.all, color: FILTER_COLOR.all },
    { id: "imports", label: labels.imports, color: FILTER_COLOR.imports },
    { id: "exports", label: labels.exports, color: FILTER_COLOR.exports },
  ];

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

    return {
      totalM,
      domesticM,
      foreignM,
      foreignPct,
      domesticPct,
      importPct,
      exportPct,
    };
  }, [port]);

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
        <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-white/35">
          {labels.hint}
        </span>
      </div>

      <div onMouseLeave={() => setSelected(null)}>
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
                      default: { fill: "#0a0a0a", stroke: "rgba(255,255,255,0.07)", strokeWidth: 0.6, outline: "none" },
                      hover: { fill: "#0a0a0a", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))}
                <PortsLayer filter={filter} selected={selected} onSelect={setSelected} reducedMotion={!!reduced} />
              </>
            )}
          </Geographies>
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
              <div>
                <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30">
                  {labels.tonnageLabel}
                </div>
                <div className="font-hero text-3xl mt-1 text-[#E8B923]">
                  {detailsStats.totalM}M
                  <span className="ml-1 font-sans text-[10px] uppercase tracking-wide text-white/40">tons</span>
                </div>
              </div>
              
              {/* Domestic vs Foreign split bar */}
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

              {/* Imports vs Exports split bar */}
              <div>
                <div className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30 mb-2">
                  {labels.splitLabel.replace(/.* vs .*/, "Imports vs Exports")}
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
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
