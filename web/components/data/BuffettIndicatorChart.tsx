"use client";

// ─── BuffettIndicatorChart — the market measured against the economy ─────────
// Total U.S. corporate equity value as a percent of GDP, quarterly since 1947.
// The 100% line is the reference the ratio is usually read against: for most of
// the 20th century the market was worth less than the country's annual output.
// It is now more than twice that.

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
import { motion } from "framer-motion";
import { CHART_GOLD } from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { BuffettPoint } from "@/lib/data/economy-data";

interface BuffettIndicatorChartProps {
  data: BuffettPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function BuffettIndicatorChart({ data, title, subtitle, source }: BuffettIndicatorChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
    ? {
        parity: "Paritate (100% din PIB)",
        dotcom: "Dot-com",
        gfc: "2008",
        valueLabel: "Valoarea acțiunilor ca % din PIB",
        latest: "Astăzi",
        peak: "Maxim istoric",
        source: "Sursă:",
      }
    : {
        parity: "Parity (100% of GDP)",
        dotcom: "Dot-com",
        gfc: "2008",
        valueLabel: "Equity value as % of GDP",
        latest: "Today",
        peak: "All-time high",
        source: "Source:",
      };

  const latest = data[data.length - 1];
  const peak = data.reduce((a, b) => (b.pct > a.pct ? b : a), data[0]);

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
                <linearGradient id="buffettGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_GOLD} stopOpacity={0.42} />
                  <stop offset="95%" stopColor={CHART_GOLD} stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                ticks={["1950-01", "1970-01", "1990-01", "2000-01", "2010-01", "2020-01", "2026-01"]}
                tickFormatter={(d: string) => String(d).slice(0, 4)}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-2xl text-glory-gold">{payload[0].value}%</p>
                      <p className="font-body text-xs text-white/50">{copy.valueLabel}</p>
                    </div>
                  );
                }}
              />

              {/* Parity: the market worth exactly one year of national output */}
              <ReferenceLine y={100} stroke="rgba(255,255,255,0.4)" strokeDasharray="5 5"
                label={{ value: copy.parity, position: "insideTopLeft", fill: "rgba(255,255,255,0.5)", fontSize: 10 }} />
              {[{ x: "2000-01", l: copy.dotcom }, { x: "2008-10", l: copy.gfc }].map((m) => (
                <ReferenceLine key={m.x} x={m.x} stroke="rgba(255,255,255,0.22)" strokeDasharray="3 3"
                  label={{ value: m.l, position: "top", fill: "rgba(255,255,255,0.4)", fontSize: 10 }} />
              ))}

              <Area type="monotone" dataKey="pct" stroke={CHART_GOLD} strokeWidth={2} fill="url(#buffettGradient)" isAnimationActive animationDuration={1400} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">{latest.pct}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.latest}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{peak.pct}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.peak} · {peak.date}</div>
        </div>
      </div>

      {source && <p className="mt-4 text-right font-body text-xs text-white/30">{copy.source} {source}</p>}
    </motion.div>
  );
}
