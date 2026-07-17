"use client";

// ─── U.S. GDP, the long run ──────────────────────────────────────────────────
// The growth chart the GDP page was missing. Everything else there is a snapshot
// bar; this is the compounding itself, every year since the BEA series starts in
// 1929.
//
// Real vs nominal matters here and the toggle is the point: nominal growth is
// mostly inflation, so `real` (chained 2017 dollars) is the honest measure of
// how much more the country actually makes. Reference lines anchor the shape to
// the history a reader already knows — the Depression trough, the war, 2008, COVID.

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useState } from "react";
import { motion } from "framer-motion";
import { CHART_GOLD, curveFor, CHART_ANIM_MS } from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { GdpHistoryPoint } from "@/lib/data/economy-data";

type Basis = "real" | "nominal";

interface GdpHistoryChartProps {
  data: GdpHistoryPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
  realBase?: number;
}

export function GdpHistoryChart({ data, title, subtitle, source, realBase = 2017 }: GdpHistoryChartProps) {
  const { locale } = useLanguage();
  const [basis, setBasis] = useState<Basis>("real");
  const ro = locale === "ro";

  const copy = ro
    ? {
        real: "Real",
        nominal: "Nominal",
        realNote: `dolari constanți ${realBase} — inflația eliminată`,
        nominalNote: "dolari curenți — include inflația",
        axis: "Trilioane USD",
        yearPrefix: "Anul",
        depression: "Marea Criză",
        ww2: "Al Doilea Război",
        gfc: "Criza din 2008",
        covid: "COVID",
        growthLabel: `Creștere reală ${data[0]?.year} → ${data[data.length - 1]?.year}`,
        annualLabel: "Creștere reală medie anuală",
        source: "Sursă:",
      }
    : {
        real: "Real",
        nominal: "Nominal",
        realNote: `chained ${realBase} dollars — inflation removed`,
        nominalNote: "current dollars — includes inflation",
        axis: "USD Trillions",
        yearPrefix: "Year",
        depression: "Depression",
        ww2: "WWII",
        gfc: "2008",
        covid: "COVID",
        growthLabel: `Real growth ${data[0]?.year} → ${data[data.length - 1]?.year}`,
        annualLabel: "Average annual real growth",
        source: "Source:",
      };

  const first = data[0];
  const last = data[data.length - 1];
  const multiple = first && last ? last.real / first.real : 0;
  const years = first && last ? last.year - first.year : 0;
  // Compound annual growth rate over the whole series.
  const cagr = multiple > 0 && years > 0 ? (Math.pow(multiple, 1 / years) - 1) * 100 : 0;

  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="w-full">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          {title && <h3 className="font-display text-xl font-semibold text-white md:text-2xl">{title}</h3>}
          {subtitle && <p className="mt-1 font-body text-sm text-white/55">{subtitle}</p>}
        </div>
        {/* Real vs nominal: the distinction is the story, so it's a control. */}
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex rounded-full border border-white/12 p-0.5">
            {(["real", "nominal"] as Basis[]).map((b) => (
              <button
                key={b}
                onClick={() => setBasis(b)}
                className="rounded-full px-4 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.14em] transition-all"
                style={{
                  background: basis === b ? "rgba(255,255,255,0.9)" : "transparent",
                  color: basis === b ? "#000" : "rgba(255,255,255,0.5)",
                }}
              >
                {b === "real" ? copy.real : copy.nominal}
              </button>
            ))}
          </div>
          <span className="font-body text-[10px] uppercase tracking-wider text-white/35">
            {basis === "real" ? copy.realNote : copy.nominalNote}
          </span>
        </div>
      </div>

      <LazyChart height={400}>
        <div className="h-[340px] w-full md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <AreaChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="gdpHistGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_GOLD} stopOpacity={0.42} />
                  <stop offset="95%" stopColor={CHART_GOLD} stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="year"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                ticks={[1929, 1945, 1960, 1980, 2000, 2020, last?.year].filter(Boolean) as number[]}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => `$${v}T`}
                label={{
                  value: copy.axis,
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "rgba(255,255,255,0.35)", fontSize: 11 },
                }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const v = payload[0].value as number;
                  return (
                    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
                      <p className="mb-1 font-body text-xs text-white/50">{copy.yearPrefix} {label}</p>
                      <p className="font-hero text-2xl text-glory-gold">${v.toFixed(2)}T</p>
                      <p className="font-body text-xs text-white/50">
                        {basis === "real" ? copy.realNote : copy.nominalNote}
                      </p>
                    </div>
                  );
                }}
              />

              {/* Anchors: the shape of the curve against history the reader knows */}
              {[
                { x: 1933, label: copy.depression },
                { x: 1944, label: copy.ww2 },
                { x: 2009, label: copy.gfc },
                { x: 2020, label: copy.covid },
              ].map((m) => (
                <ReferenceLine
                  key={m.x}
                  x={m.x}
                  stroke="rgba(255,255,255,0.22)"
                  strokeDasharray="4 4"
                  label={{
                    value: m.label,
                    position: "top",
                    fill: "rgba(255,255,255,0.4)",
                    fontSize: 10,
                  }}
                />
              ))}

              {/* key={basis}: Recharts does not redraw an <Area> when only its
                  dataKey changes, so remount it to actually swap real↔nominal. */}
              <Area
                key={basis}
                type={curveFor(data.length)}
                dataKey={basis}
                stroke={CHART_GOLD}
                strokeWidth={2}
                fill="url(#gdpHistGradient)"
                isAnimationActive
                animationDuration={CHART_ANIM_MS}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      {/* The compounding, stated */}
      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">{multiple.toFixed(1)}×</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.growthLabel}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{cagr.toFixed(1)}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.annualLabel}</div>
        </div>
      </div>

      {source && (
        <p className="mt-4 text-right font-body text-xs text-white/30">
          {copy.source} {source}
        </p>
      )}
    </motion.div>
  );
}
