"use client";

// ─── AirportMap ───────────────────────────────────────────────────────────────
// The 873 commercial-service airports of the United States, plotted from FAA/NTAD
// enplanement data on a geoAlbersUsa projection. Circle area scales with annual
// enplanements and colour marks the hub tier. Filter by tier; hover or tap any
// airport for its detail. Alaska and Hawaii ride in the projection's insets.

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ComposableMap, Geographies, Geography, useMapContext } from "react-simple-maps";
import { GEO_URL } from "@/lib/data/us-geo";
import airportsData from "@/lib/data/airports.json";

type Tier = "L" | "M" | "S";
type Filter = "all" | Tier;

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
}
const AIRPORTS = (airportsData as { airports: Airport[] }).airports;

const TIER_COLOR: Record<Tier, string> = {
  L: "#E8B923", // large hub — gold
  M: "#60a5fa", // medium hub — blue
  S: "#7c8896", // small hub — steel
};

const radius = (enpl: number) => 1.4 + Math.sqrt(enpl) / 470;

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
}

function AirportsLayer({
  filter,
  selected,
  onSelect,
  reducedMotion,
}: {
  filter: Filter;
  selected: string | null;
  onSelect: (id: string | null) => void;
  reducedMotion: boolean;
}) {
  const { projection } = useMapContext();

  const drawn = useMemo(
    () =>
      AIRPORTS.filter((a) => filter === "all" || a.tier === filter)
        .map((a) => ({ a, p: projection([a.lng, a.lat]) }))
        .filter((x): x is { a: Airport; p: [number, number] } => Array.isArray(x.p))
        // biggest first so the small dots stay clickable on top
        .sort((x, y) => y.a.enpl - x.a.enpl),
    [filter, projection],
  );

  return (
    <g>
      {drawn.map(({ a, p }) => {
        const r = radius(a.enpl);
        const isSel = selected === a.id;
        const dim = selected !== null && !isSel;
        const color = TIER_COLOR[a.tier];
        return (
          <g
            key={a.id}
            style={{ opacity: dim ? 0.25 : 1, transition: "opacity 0.3s ease", cursor: "pointer" }}
            onMouseEnter={() => onSelect(a.id)}
            onClick={() => onSelect(isSel ? null : a.id)}
          >
            {isSel && !reducedMotion && (
              <circle cx={p[0]} cy={p[1]} r={r} fill="none" stroke={color} strokeWidth={1}>
                <animate attributeName="r" values={`${r};${r * 2.4}`} dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={p[0]} cy={p[1]} r={r} fill={color} fillOpacity={0.22} stroke={color} strokeWidth={isSel ? 1.4 : 0.7} />
            {a.enpl > 3_000_000 && (
              <text
                x={p[0]}
                y={p[1] - r - 3}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 8.5,
                  letterSpacing: "0.08em",
                  fill: isSel ? color : "rgba(255,255,255,0.65)",
                  paintOrder: "stroke",
                  stroke: "rgba(0,0,0,0.85)",
                  strokeWidth: 2.4,
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
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const airport = useMemo(() => AIRPORTS.find((a) => a.id === selected) ?? null, [selected]);
  const shown = useMemo(
    () => (filter === "all" ? AIRPORTS.length : AIRPORTS.filter((a) => a.tier === filter).length),
    [filter],
  );

  const filters: { id: Filter; label: string; color?: string }[] = [
    { id: "all", label: labels.all },
    { id: "L", label: labels.major, color: TIER_COLOR.L },
    { id: "M", label: labels.medium, color: TIER_COLOR.M },
    { id: "S", label: labels.regional, color: TIER_COLOR.S },
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
          {shown.toLocaleString(locale === "ro" ? "ro-RO" : "en-US")} · {labels.hint}
        </span>
      </div>

      <div onMouseLeave={() => setSelected(null)}>
        <ComposableMap projection="geoAlbersUsa" projectionConfig={{ scale: 1120 }} width={940} height={540} style={{ width: "100%", height: "auto" }}>
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
                <AirportsLayer filter={filter} selected={selected} onSelect={setSelected} reducedMotion={!!reduced} />
              </>
            )}
          </Geographies>
        </ComposableMap>
      </div>

      {/* Detail panel — keyed remount */}
      <div className="mt-2 min-h-[130px] border-t border-white/[0.07] pt-6">
        {airport && (
          <motion.div key={airport.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="mb-1 flex items-center gap-2">
                <span className="font-hero text-2xl" style={{ color: TIER_COLOR[airport.tier] }}>{airport.id}</span>
                <span className="font-macro-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                  {airport.city}, {airport.state}
                </span>
              </div>
              <h3 className="font-macro-display text-2xl font-bold tracking-tight text-white">{airport.name}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {airport.intl && (
                  <span className="rounded-full border border-white/12 px-2.5 py-0.5 font-macro-mono text-[9px] uppercase tracking-wider text-white/50">
                    {labels.international}
                  </span>
                )}
                {airport.tower && (
                  <span className="rounded-full border border-white/12 px-2.5 py-0.5 font-macro-mono text-[9px] uppercase tracking-wider text-white/50">
                    {labels.towered}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-10 md:col-span-7">
              <div>
                <div className="font-macro-mono text-[9px] uppercase tracking-[0.2em] text-white/30">{labels.enplanements}</div>
                <div className="font-hero text-3xl" style={{ color: TIER_COLOR[airport.tier] }}>
                  {(airport.enpl / 1_000_000).toFixed(1)}M
                </div>
                <div className="font-macro-mono text-[9px] uppercase tracking-wide text-white/35">{labels.perYear}</div>
              </div>
              <div>
                <div className="font-macro-mono text-[9px] uppercase tracking-[0.2em] text-white/30">{labels.passengers}</div>
                <div className="font-hero text-3xl text-white/85">{(airport.pax / 1_000_000).toFixed(1)}M</div>
                <div className="font-macro-mono text-[9px] uppercase tracking-wide text-white/35">{labels.perYear}</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
