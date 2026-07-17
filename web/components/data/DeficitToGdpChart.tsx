"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { motion } from "framer-motion";
import {
  CHART_GOLD,
  CHART_RED,
  CHART_GRID,
  CHART_AXIS_LINE,
  CHART_TICK_MUTED,
  CHART_TOOLTIP_CLASS,
} from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { DeficitToGdpPoint } from "@/lib/data/economy-data";

interface DeficitToGdpChartProps {
  data: DeficitToGdpPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function DeficitToGdpChart({ data, title, subtitle, source }: DeficitToGdpChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
     ? {
         valueLabel: "Excedent / Deficit ca % din PIB",
         source: "Sursă:",
         latest: "Cel mai recent",
         surplus: "Excedent",
         deficit: "Deficit",
       }
     : {
         valueLabel: "Surplus / Deficit as % of GDP",
         source: "Source:",
         latest: "Latest",
         surplus: "Surplus",
         deficit: "Deficit",
       };

  const latest = data[data.length - 1];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="w-full"
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 font-body text-sm text-white/55">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <LazyChart height={340}>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} vertical={false} />
              <XAxis
                dataKey="year"
                tick={CHART_TICK_MUTED}
                axisLine={{ stroke: CHART_AXIS_LINE }}
                tickLine={false}
              />
              <YAxis
                tick={CHART_TICK_MUTED}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                width={45}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as DeficitToGdpPoint;
                  const isSurplus = p.value >= 0;
                  return (
                    <div className={CHART_TOOLTIP_CLASS}>
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p
                        className="font-hero text-2xl font-bold"
                        style={{ color: isSurplus ? CHART_GOLD : "#ef4444" }}
                      >
                        {isSurplus ? "+" : ""}{p.value.toFixed(2)}%
                      </p>
                      <p className="font-body text-xs text-white/50">
                        {isSurplus ? copy.surplus : copy.deficit} {locale === "ro" ? "bugetar ca % din PIB" : "as % of GDP"}
                      </p>
                    </div>
                  );
                }}
              />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.4)" />
              <Bar dataKey="value" isAnimationActive>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.value >= 0 ? CHART_GOLD : CHART_RED}
                    opacity={entry.value >= 0 ? 0.95 : 0.8}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 border-t border-white/10 pt-6">
        <div>
          <div
            className="font-hero text-3xl md:text-4xl"
            style={{ color: latest.value >= 0 ? CHART_GOLD : "#ef4444" }}
          >
            {latest.value >= 0 ? "+" : ""}{latest.value.toFixed(2)}%
          </div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.latest} ({latest.year}, {latest.value >= 0 ? copy.surplus : copy.deficit} bugetar ca % din PIB)
          </div>
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
