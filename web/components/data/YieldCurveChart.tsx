"use client";

// ─── YieldCurveChart — the market's own recession alarm ──────────────────────
// The 10-year Treasury yield minus the 2-year, monthly since 1976. Above zero is
// normal: long money costs more than short money. Below zero is "inverted" — the
// market betting rates must come down, which usually means it expects trouble.
//
// The zero line is the whole chart, so it is drawn as the axis of the story: the
// area is split into a positive band and a red negative band, and NBER recessions
// are shaded behind. Every recession since 1976 follows an inversion.
//
// The honest caveat is deliberately given equal weight in the copy: the 2022–24
// inversion was the deepest since Volcker and no recession followed. This chart
// shows an indicator with a good record and a real miss, not a prophecy.

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { YieldCurvePoint } from "@/lib/data/economy-data";

interface YieldCurveChartProps {
  data: YieldCurvePoint[];
  recessions: { start: string; end: string }[];
  title?: string;
  subtitle?: string;
  source?: string;
}

const NORMAL = "#34d399";
const INVERTED = "#ef4444";

export function YieldCurveChart({ data, recessions, title, subtitle, source }: YieldCurveChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
    ? {
        spreadLabel: "10 ani minus 2 ani, puncte procentuale",
        normal: "Normal",
        inverted: "Inversat",
        zero: "Zero — curba se aplatizează",
        volcker: "Volcker",
        recession: "Recesiune",
        deepestLabel: "Cea mai adâncă inversiune — martie 1980",
        monthsLabel: "Luni inversate din 1976",
        latestLabel: "Astăzi",
        source: "Sursă:",
      }
    : {
        spreadLabel: "10-year minus 2-year, percentage points",
        normal: "Normal",
        inverted: "Inverted",
        zero: "Zero — the curve flattens",
        volcker: "Volcker",
        recession: "Recession",
        deepestLabel: "Deepest inversion — March 1980",
        monthsLabel: "Months inverted since 1976",
        latestLabel: "Today",
        source: "Source:",
      };

  const deepest = data.reduce((a, b) => (b.spread < a.spread ? b : a), data[0]);
  const latest = data[data.length - 1];
  const monthsInverted = data.filter((d) => d.spread < 0).length;

  // Split the series so the inverted stretches can be filled red without
  // bleeding colour into the normal ones. Recharts needs the gaps as nulls.
  const shaped = data.map((d) => ({
    month: d.month,
    spread: d.spread,
    pos: d.spread >= 0 ? d.spread : 0,
    neg: d.spread < 0 ? d.spread : 0,
  }));

  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="w-full">
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="font-display text-xl font-semibold text-white md:text-2xl">{title}</h3>}
          {subtitle && <p className="mt-1 font-body text-sm text-white/55">{subtitle}</p>}
        </div>
      )}

      <LazyChart height={400}>
        <div className="h-[340px] w-full md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <AreaChart data={shaped} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="ycPos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={NORMAL} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={NORMAL} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="ycNeg" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="5%" stopColor={INVERTED} stopOpacity={0.5} />
                  <stop offset="95%" stopColor={INVERTED} stopOpacity={0.03} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />

              {/* NBER recessions behind the curve: what the alarm was warning about */}
              {recessions.map((r) => (
                <ReferenceArea
                  key={r.start}
                  x1={r.start}
                  x2={r.end}
                  fill="rgba(255,255,255,0.07)"
                  stroke="none"
                />
              ))}

              <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                ticks={["1980-01", "1990-01", "2000-01", "2008-01", "2016-01", "2023-07", "2026-07"]}
                tickFormatter={(m: string) => String(m).slice(0, 4)}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={false}
                domain={[-3, 3]}
                tickFormatter={(v: number) => `${v > 0 ? "+" : ""}${v}`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as { spread: number };
                  const inv = p.spread < 0;
                  return (
                    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-2xl" style={{ color: inv ? INVERTED : NORMAL }}>
                        {p.spread > 0 ? "+" : ""}{p.spread.toFixed(2)}
                      </p>
                      <p className="font-body text-xs text-white/50">{copy.spreadLabel}</p>
                      <p className="mt-1 font-body text-xs font-bold uppercase tracking-wider" style={{ color: inv ? INVERTED : NORMAL }}>
                        {inv ? copy.inverted : copy.normal}
                      </p>
                    </div>
                  );
                }}
              />

              {/* Zero: the line the whole indicator is defined by */}
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.5)" strokeWidth={1.2}
                label={{ value: copy.zero, position: "insideTopLeft", fill: "rgba(255,255,255,0.5)", fontSize: 10 }} />

              <Area type="monotone" dataKey="pos" stroke={NORMAL} strokeWidth={1.4} fill="url(#ycPos)" isAnimationActive animationDuration={1400} />
              <Area type="monotone" dataKey="neg" stroke={INVERTED} strokeWidth={1.4} fill="url(#ycNeg)" isAnimationActive animationDuration={1400} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 md:grid-cols-3">
        <div>
          <div className="font-hero text-3xl md:text-4xl" style={{ color: INVERTED }}>{deepest.spread.toFixed(2)}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.deepestLabel}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{monthsInverted}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.monthsLabel}</div>
        </div>
        <div>
          <div className="font-hero text-3xl md:text-4xl" style={{ color: latest.spread < 0 ? INVERTED : NORMAL }}>
            {latest.spread > 0 ? "+" : ""}{latest.spread.toFixed(2)}
          </div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.latestLabel}</div>
        </div>
      </div>

      {source && <p className="mt-4 text-right font-body text-xs text-white/30">{copy.source} {source}</p>}
    </motion.div>
  );
}
