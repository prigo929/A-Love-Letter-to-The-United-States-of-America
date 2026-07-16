"use client";

// ─── StateGdpMap — where the $30.6T actually is ──────────────────────────────
// A choropleth of nominal GDP by state. The reason to map this instead of listing
// it is concentration: five states are about 41% of the national economy, and the
// map makes that visible instantly in a way a table of 51 rows never does.
//
// The scale is LOGARITHMIC on purpose. California ($4.25T) is over a hundred times
// Vermont ($44B); on a linear ramp every state except California, Texas and New York
// collapses to the same near-black and the map says nothing. A log ramp keeps the
// ordering honest while letting the middle of the distribution stay legible. The
// legend is labelled with real dollar values so the non-linearity is disclosed
// rather than hidden.

import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { GEO_URL, FIPS_TO_ABBREV } from "@/lib/data/us-geo";
import type { StateGdpPoint } from "@/lib/data/economy-data";

interface StateGdpMapProps {
  data: StateGdpPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

// Ramp stops, dark navy -> glory gold. Index chosen by log position.
const RAMP = ["#0d1b2a", "#1b3a5c", "#2f5f86", "#6b8f6b", "#b09545", "#E8B923"];

export function StateGdpMap({ data, title, subtitle, source }: StateGdpMapProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [hover, setHover] = useState<StateGdpPoint | null>(null);

  const copy = ro
    ? {
        gdpLabel: "PIB nominal",
        peerPrefix: "Aproximativ cât",
        totalLabel: "PIB total al statelor",
        top5Label: "Din economie, în primele 5 state",
        largestLabel: "Cel mai mare stat",
        hint: "Treci cu mouse-ul peste un stat",
        legend: "PIB (scară logaritmică)",
        source: "Sursă:",
      }
    : {
        gdpLabel: "Nominal GDP",
        peerPrefix: "About the size of",
        totalLabel: "Total state GDP",
        top5Label: "Of the economy, in the top 5 states",
        largestLabel: "Largest state",
        hint: "Hover a state",
        legend: "GDP (logarithmic scale)",
        source: "Source:",
      };

  const byAbbrev = new Map(data.map((d) => [d.abbrev, d]));
  const values = data.map((d) => d.gdp);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lmin = Math.log(min);
  const lmax = Math.log(max);

  const colorFor = (gdp: number) => {
    const t = (Math.log(gdp) - lmin) / (lmax - lmin); // 0..1 in log space
    const i = Math.min(RAMP.length - 1, Math.max(0, Math.round(t * (RAMP.length - 1))));
    return RAMP[i];
  };

  const fmt = (b: number) =>
    b >= 1000 ? `$${(b / 1000).toFixed(2)}T` : `$${Math.round(b)}B`;

  const sorted = [...data].sort((a, b) => b.gdp - a.gdp);
  const total = data.reduce((s, d) => s + d.gdp, 0);
  const top5 = sorted.slice(0, 5).reduce((s, d) => s + d.gdp, 0);

  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="w-full">
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="font-display text-xl font-semibold text-white md:text-2xl">{title}</h3>}
          {subtitle && <p className="mt-1 font-body text-sm text-white/55">{subtitle}</p>}
        </div>
      )}

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
        {/* Readout: fixed corner rather than a floating tooltip, which jitters
            against the map's own hover repaint. */}
        <div className="pointer-events-none absolute left-4 top-3 z-10">
          {hover ? (
            <>
              <div className="font-body text-[10px] font-bold uppercase tracking-wider text-white/40">
                {ro ? hover.nameRo : hover.name}
              </div>
              <div className="font-hero text-3xl text-glory-gold">{fmt(hover.gdp)}</div>
              {hover.peer && (
                <div className="font-body text-[11px] text-white/45">
                  {copy.peerPrefix} {ro ? hover.peerRo : hover.peer}
                </div>
              )}
            </>
          ) : (
            <div className="font-body text-[10px] uppercase tracking-wider text-white/25">{copy.hint}</div>
          )}
        </div>

        <ComposableMap projection="geoAlbersUsa" projectionConfig={{ scale: 950 }} style={{ width: "100%", height: "auto" }}>
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo) => {
                const abbrev = FIPS_TO_ABBREV[geo.id?.toString().padStart(2, "0") ?? ""] ?? "";
                const st = byAbbrev.get(abbrev);
                const active = hover?.abbrev === abbrev;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => st && setHover(st)}
                    onMouseLeave={() => setHover(null)}
                    style={{
                      default: {
                        fill: st ? colorFor(st.gdp) : "#101010",
                        stroke: "rgba(0,0,0,0.55)",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: st ? colorFor(st.gdp) : "#101010",
                        stroke: "#fff",
                        strokeWidth: 1,
                        outline: "none",
                      },
                      pressed: { fill: st ? colorFor(st.gdp) : "#101010", outline: "none" },
                    }}
                    opacity={active || !hover ? 1 : 0.55}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Legend, labelled in dollars so the log ramp is disclosed */}
        <div className="flex items-center gap-3 border-t border-white/10 px-4 py-3">
          <span className="font-body text-[10px] uppercase tracking-wider text-white/35">{copy.legend}</span>
          <div className="flex flex-1 items-center gap-1">
            {RAMP.map((c, i) => (
              <div key={c} className="h-2 flex-1" style={{ background: c }} title={fmt(Math.exp(lmin + (i / (RAMP.length - 1)) * (lmax - lmin)))} />
            ))}
          </div>
          <span className="font-body text-[10px] text-white/35">{fmt(min)}</span>
          <span className="font-body text-[10px] text-white/25">→</span>
          <span className="font-body text-[10px] text-white/35">{fmt(max)}</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 md:grid-cols-3">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">{fmt(total)}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.totalLabel}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{((top5 / total) * 100).toFixed(0)}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.top5Label}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{fmt(sorted[0].gdp)}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.largestLabel} · {ro ? sorted[0].nameRo : sorted[0].name}
          </div>
        </div>
      </div>

      {source && <p className="mt-4 text-right font-body text-xs text-white/30">{copy.source} {source}</p>}
    </motion.div>
  );
}
