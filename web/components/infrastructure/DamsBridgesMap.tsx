"use client";

// ─── DamsBridgesMap ────────────────────────────────────────────────────────────
// An interactive, high-performance USA map plotting the 12 monumental dams and
// bridges of the United States. Category buttons allow filtering by dams (blue)
// and bridges (red). Selecting a marker opens a detailed fact sheet at the bottom.

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ComposableMap, Geographies, Geography, useMapContext } from "react-simple-maps";
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
}: {
  filter: "all" | "dam" | "bridge";
  selected: string | null;
  onSelect: (id: string | null) => void;
  reducedMotion: boolean;
}) {
  const { projection } = useMapContext();

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
        const r = isSel ? 6 : 4.5;

        return (
          <g
            key={m.id}
            style={{ opacity: dim ? 0.3 : 1, transition: "opacity 0.3s ease", cursor: "pointer" }}
            onMouseEnter={() => onSelect(m.id)}
            onClick={() => onSelect(isSel ? null : m.id)}
          >
            {isSel && !reducedMotion && (
              <circle cx={p[0]} cy={p[1]} r={r} fill="none" stroke={color} strokeWidth={1}>
                <animate attributeName="r" values={`${r};${r * 2.8}`} dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={p[0]} cy={p[1]} r={r} fill={color} fillOpacity={0.3} stroke={color} strokeWidth={isSel ? 1.6 : 0.9} />
            <circle cx={p[0]} cy={p[1]} r={2} fill="#fff" />
            
            {/* Short identifier text next to major landmarks */}
            {isSel && (
              <text
                x={p[0] + 10}
                y={p[1] + 3}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 9,
                  fontWeight: "bold",
                  fill: "#fff",
                  paintOrder: "stroke",
                  stroke: "rgba(0,0,0,0.85)",
                  strokeWidth: 2.5,
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
  const reduced = useReducedMotion();

  const monument = useMemo(() => MONUMENTS.find((m) => m.id === selected) ?? null, [selected]);

  const filters: { id: typeof filter; label: string; color?: string }[] = [
    { id: "all", label: labels.all },
    { id: "dam", label: labels.dams, color: TYPE_COLOR.dam },
    { id: "bridge", label: labels.bridges, color: TYPE_COLOR.bridge },
  ];

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
                className="flex items-center gap-2 rounded-full border px-4 py-1.5 font-macro-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-all"
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
        <span className="font-macro-mono text-[10px] uppercase tracking-[0.15em] text-white/35">
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
                <MonumentsLayer filter={filter} selected={selected} onSelect={setSelected} reducedMotion={!!reduced} />
              </>
            )}
          </Geographies>
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
                  className="font-macro-mono text-[10px] font-bold uppercase tracking-[0.15em]"
                  style={{ color: TYPE_COLOR[monument.type] }}
                >
                  {monument.type === "dam" ? labels.dams.replace(/e$/, "") : labels.bridges.replace(/uri$/, "")}
                </span>
                <span className="font-macro-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                  · {monument.location[locale]}
                </span>
              </div>
              <h3 className="font-macro-display text-2xl font-bold tracking-tight text-white">
                {monument.name[locale]}
              </h3>
              <div className="mt-3 flex gap-4">
                <div>
                  <span className="font-macro-mono text-[9px] uppercase tracking-wider text-white/30 mr-1.5">
                    {labels.completed}:
                  </span>
                  <span className="font-macro-mono text-[11px] font-bold text-white/80">{monument.year}</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-7 flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="shrink-0">
                <div className="font-macro-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                  {labels.statLabel}
                </div>
                <div className="font-hero text-3xl mt-1 text-[#E8B923]">
                  {monument.stat[locale]}
                </div>
              </div>
              <div className="flex-1">
                <div className="font-macro-mono text-[9px] uppercase tracking-[0.2em] text-white/30 mb-1">
                  {locale === "ro" ? "Fisă Tehnică & Istorie" : "Fact Sheet & History"}
                </div>
                <p className="font-macro-mono text-[11px] uppercase leading-relaxed tracking-wider text-white/60">
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
