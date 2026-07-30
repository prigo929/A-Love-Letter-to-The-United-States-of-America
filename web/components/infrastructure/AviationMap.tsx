"use client";

// ─── AviationMap ──────────────────────────────────────────────────────────────
// Interactive node map of America's global aviation hubs. Two data layers: 
// passengers and cargo: with proportional circles, a pulsing selection ring,
// and (in cargo mode) animated overnight-sortie arcs radiating from the FedEx
// SuperHub at Memphis. geoAlbersUsa keeps Anchorage visible in the Alaska inset.

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  useMapContext,
} from "react-simple-maps";
import { GEO_URL } from "@/lib/data/us-geo";
import {
  AVIATION_HUBS,
  MEM_SORTIE_TARGETS,
  type AviationHub,
  type LngLat,
} from "@/lib/data/infrastructure-network-data";

type Mode = "passengers" | "cargo";

const MODE_ACCENT: Record<Mode, string> = {
  passengers: "#60a5fa",
  cargo: "#fb923c",
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

function HubsLayer({
  mode,
  selected,
  onSelect,
  reducedMotion,
}: {
  mode: Mode;
  selected: string | null;
  onSelect: (code: string | null) => void;
  reducedMotion: boolean;
}) {
  const { projection } = useMapContext();
  const accent = MODE_ACCENT[mode];

  const hubs = useMemo(
    () =>
      AVIATION_HUBS.filter((h) => (mode === "passengers" ? h.passengers > 0 : h.cargo > 0))
        .map((h) => ({ hub: h, p: projection(h.coordinates) }))
        .filter((h): h is { hub: AviationHub; p: [number, number] } => Array.isArray(h.p))
        // Draw big circles first so small hubs stay clickable on top.
        .sort((a, b) =>
          mode === "passengers" ? b.hub.passengers - a.hub.passengers : b.hub.cargo - a.hub.cargo,
        ),
    [mode, projection],
  );

  const memP = projection([-89.977, 35.042]);
  const sorties = useMemo(() => {
    if (mode !== "cargo" || !memP) return [];
    return MEM_SORTIE_TARGETS.map((t: LngLat) => projection(t))
      .filter((p): p is [number, number] => Array.isArray(p))
      .map((p) => arcPath(memP, p));
  }, [mode, memP, projection]);

  const radius = (h: AviationHub) =>
    mode === "passengers" ? 2 + h.passengers * 0.17 : 2.5 + h.cargo * 4.6;

  return (
    <g>
      {/* Overnight sortie arcs (cargo mode): marching-dash flow animation */}
      {sorties.map((d, i) => (
        <g key={i} className="motion-reduce:hidden">
          <path
            d={d}
            fill="none"
            stroke={accent}
            strokeWidth={0.9}
            strokeDasharray="3 7"
            opacity={0.45}
            pointerEvents="none"
            style={reducedMotion ? undefined : { animation: "infra-dash 2.6s linear infinite" }}
          />
        </g>
      ))}

      {hubs.map(({ hub, p }) => {
        const r = radius(hub);
        const isSel = selected === hub.code;
        const dim = selected !== null && !isSel;
        return (
          <g
            key={`${mode}-${hub.code}`}
            style={{ opacity: dim ? 0.25 : 1, transition: "opacity 0.3s ease", cursor: "pointer" }}
            onMouseEnter={() => onSelect(hub.code)}
            onClick={() => onSelect(isSel ? null : hub.code)}
          >
            {/* Pulse ring on the selected hub */}
            {isSel && !reducedMotion && (
              <circle cx={p[0]} cy={p[1]} r={r} fill="none" stroke={accent} strokeWidth={1} style={{ pointerEvents: "none" }}>
                <animate attributeName="r" values={`${r};${r * 1.9}`} dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={p[0]} cy={p[1]} r={r} fill={accent} opacity={0.16} />
            <circle cx={p[0]} cy={p[1]} r={r} fill="none" stroke={accent} strokeWidth={isSel ? 1.6 : 0.9} opacity={0.85} />
            <circle cx={p[0]} cy={p[1]} r={1.6} fill="#fff" />
            <text
              x={p[0]}
              y={p[1] - r - 4}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 9.5,
                letterSpacing: "0.12em",
                fill: isSel ? accent : "rgba(255,255,255,0.6)",
                paintOrder: "stroke",
                stroke: "rgba(0,0,0,0.85)",
                strokeWidth: 2.5,
                pointerEvents: "none",
              }}
            >
              {hub.code}
            </text>
          </g>
        );
      })}
    </g>
  );
}

interface AviationMapProps {
  locale: "en" | "ro";
  labels: {
    passengers: string;
    cargo: string;
    paxUnit: string;
    cargoUnit: string;
    hint: string;
  };
}

export function AviationMap({ locale, labels }: AviationMapProps) {
  const [mode, setMode] = useState<Mode>("passengers");
  const [selected, setSelected] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const accent = MODE_ACCENT[mode];

  const hub = useMemo(() => AVIATION_HUBS.find((h) => h.code === selected) ?? null, [selected]);

  return (
    <div className="w-full">
      {/* Marching-dash keyframes for the sortie arcs */}
      <style>{`@keyframes infra-dash { to { stroke-dashoffset: -20; } }`}</style>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          {(["passengers", "cargo"] as Mode[]).map((m) => {
            const active = mode === m;
            const color = MODE_ACCENT[m];
            return (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setSelected(m === "cargo" ? "MEM" : "ATL");
                }}
                className="rounded-full border px-5 py-2 font-macro-display text-sm font-bold tracking-tight transition-all duration-300"
                style={{
                  borderColor: active ? color : "rgba(255,255,255,0.12)",
                  background: active ? `${color}14` : "transparent",
                  color: active ? color : "rgba(255,255,255,0.5)",
                }}
              >
                {m === "passengers" ? labels.passengers : labels.cargo}
              </button>
            );
          })}
        </div>
        <p className="max-w-xs font-macro-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-white/25">
          {labels.hint}
        </p>
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
                <HubsLayer mode={mode} selected={selected} onSelect={setSelected} reducedMotion={!!prefersReducedMotion} />
              </>
            )}
          </Geographies>
        </ComposableMap>
      </div>

      {/* Hub detail: keyed remount instead of exit-gated AnimatePresence */}
      <div className="mt-2 min-h-[130px] border-t border-white/[0.07] pt-6">
        {hub && (
          <motion.div
            key={`${mode}-${hub.code}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <span className="font-macro-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                {hub.city}
              </span>
              <h3 className="mt-1 font-macro-display text-2xl font-bold tracking-tight text-white">
                {hub.name[locale]}
              </h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-hero text-4xl" style={{ color: accent }}>
                  {mode === "passengers" ? hub.passengers.toFixed(1) : hub.cargo.toFixed(1)}
                </span>
                <span className="font-macro-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                  {mode === "passengers" ? labels.paxUnit : labels.cargoUnit}
                </span>
              </div>
            </div>
            <p className="font-macro-body text-base font-light leading-relaxed text-white/65 md:col-span-8 md:text-lg">
              {hub.note[locale]}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
