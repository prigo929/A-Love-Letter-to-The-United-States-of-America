"use client";

// ─── UnemploymentChart: who is left out of the GDP number ───────────────────
// The civilian unemployment rate, monthly since 1948, with NBER recessions
// shaded behind it. Every other chart on this page measures what America makes;
// this one measures the people not making it, which is the honest companion to a
// curve that otherwise only ever goes up.
//
// The COVID spike is why the series is worth plotting at full monthly detail: a
// near-vertical move to 14.8% in April 2020, the highest on record, followed by
// the fastest recovery in the series. Annual data would flatten both.

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
import { CHART_ANIM_MS, curveFor } from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { UnemploymentPoint } from "@/lib/data/economy-data";

interface UnemploymentChartProps {
  data: UnemploymentPoint[];
  recessions: { start: string; end: string }[];
  title?: string;
  subtitle?: string;
  source?: string;
}

const JOBLESS = "#ef4444";

export function UnemploymentChart({ data, recessions, title, subtitle, source }: UnemploymentChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
    ? {
        rateLabel: "Rata șomajului",
        covid: "COVID",
        volckerRecession: "Recesiunea 1982",
        fullEmployment: "Ocupare deplină (~4%)",
        peakLabel: "Maxim record: aprilie 2020",
        lowLabel: "Minim record: mai 1953",
        latestLabel: "Astăzi",
        source: "Sursă:",
      }
    : {
        rateLabel: "Unemployment rate",
        covid: "COVID",
        volckerRecession: "1982 recession",
        fullEmployment: "Full employment (~4%)",
        peakLabel: "Record high: April 2020",
        lowLabel: "Record low: May 1953",
        latestLabel: "Today",
        source: "Source:",
      };

  const peak = data.reduce((a, b) => (b.rate > a.rate ? b : a), data[0]);
  const low = data.reduce((a, b) => (b.rate < a.rate ? b : a), data[0]);
  const latest = data[data.length - 1];

  // Recessions here start in 1948, but the shared RECESSIONS list only covers
  // the yield-curve era (1976+). Clip to what the axis actually contains so a
  // band is never drawn against a category the chart doesn't have.
  const first = data[0]?.month ?? "";
  const visibleRecessions = recessions.filter((r) => r.start >= first);

  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="w-full">
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="font-display text-xl font-semibold text-white md:text-2xl">{title}</h3>}
          {subtitle && <p className="mt-1 font-body text-sm text-white/55">{subtitle}</p>}
        </div>
      )}

      <LazyChart height={380}>
        <div className="h-[320px] w-full md:h-[380px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <AreaChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="unrateGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={JOBLESS} stopOpacity={0.45} />
                  <stop offset="95%" stopColor={JOBLESS} stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />

              {visibleRecessions.map((r) => (
                <ReferenceArea key={r.start} x1={r.start} x2={r.end} fill="rgba(255,255,255,0.07)" stroke="none" />
              ))}

              <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                ticks={["1950-01", "1960-01", "1975-01", "1990-01", "2005-01", "2020-04", "2026-06"]}
                tickFormatter={(m: string) => String(m).slice(0, 4)}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={false}
                domain={[0, 16]}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-2xl" style={{ color: JOBLESS }}>{(payload[0].value as number).toFixed(1)}%</p>
                      <p className="font-body text-xs text-white/50">{copy.rateLabel}</p>
                    </div>
                  );
                }}
              />

              {/* The rate economists treat as effectively full employment */}
              <ReferenceLine y={4} stroke="rgba(52,211,153,0.45)" strokeDasharray="4 4"
                label={{ value: copy.fullEmployment, position: "insideBottomRight", fill: "rgba(52,211,153,0.7)", fontSize: 10 }} />
              {[{ x: "1982-11", l: copy.volckerRecession }, { x: "2020-04", l: copy.covid }].map((m) => (
                <ReferenceLine key={m.x} x={m.x} stroke="rgba(255,255,255,0.25)" strokeDasharray="3 3"
                  label={{ value: m.l, position: "top", fill: "rgba(255,255,255,0.45)", fontSize: 10 }} />
              ))}

              <Area type={curveFor(data.length)} dataKey="rate" stroke={JOBLESS} strokeWidth={1.6}
                fill="url(#unrateGradient)" isAnimationActive animationDuration={CHART_ANIM_MS} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 md:grid-cols-3">
        <div>
          <div className="font-hero text-3xl md:text-4xl" style={{ color: JOBLESS }}>{peak.rate.toFixed(1)}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.peakLabel}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{low.rate.toFixed(1)}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.lowLabel}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{latest.rate.toFixed(1)}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.latestLabel}</div>
        </div>
      </div>

      {source && <p className="mt-4 text-right font-body text-xs text-white/30">{copy.source} {source}</p>}
    </motion.div>
  );
}
