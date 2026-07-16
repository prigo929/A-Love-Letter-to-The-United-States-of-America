"use client";

// ─── GDP Global Comparison Chart ──────────────────────────────────────────────
// A Recharts line chart illustrating nominal GDP trajectory since 1980 for the
// world's leading economies. Highlights U.S. growth and Chinese rise relative to
// Japanese and European stagnation.

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { CHART_GOLD } from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { GdpGlobalHistoryPoint } from "@/lib/data/economy-data";

interface GdpGlobalComparisonChartProps {
  data: GdpGlobalHistoryPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function GdpGlobalComparisonChart({ data, title, subtitle, source }: GdpGlobalComparisonChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const sourceLabel = ro ? "Sursă:" : "Source:";
  const usLabel = ro ? "Statele Unite" : "United States";
  const chinaLabel = ro ? "China" : "China";
  const japanLabel = ro ? "Japonia" : "Japan";
  const germanyLabel = ro ? "Germania" : "Germany";
  const valueLabel = ro ? "PIB (Trilioane USD)" : "GDP (USD Trillions)";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="w-full font-body"
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 font-body text-sm text-white/55">{subtitle}</p>
          )}
        </div>
      )}

      <LazyChart height={400}>
        <div className="h-[340px] w-full md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <LineChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="year"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v}T`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
                      <p className="mb-1.5 font-body text-xs text-white/50">{ro ? "Anul" : "Year"} {label}</p>
                      <p className="font-body text-sm font-semibold text-white mb-2">{valueLabel}</p>
                      
                      {payload.map((p) => (
                        <div key={p.name} className="flex items-center justify-between gap-8 mb-1 last:mb-0">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                            <span className="text-white/80 text-xs">{p.name}</span>
                          </div>
                          <span className="text-white text-xs font-bold">${(p.value as number).toFixed(2)}T</span>
                        </div>
                      ))}
                    </div>
                  );
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingBottom: 10 }}
              />
              <Line
                name={usLabel}
                type="monotone"
                dataKey="us"
                stroke={CHART_GOLD}
                strokeWidth={3}
                dot={{ fill: CHART_GOLD, r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive
                animationDuration={1200}
              />
              <Line
                name={chinaLabel}
                type="monotone"
                dataKey="china"
                stroke="#e11d48"
                strokeWidth={2}
                dot={{ fill: "#e11d48", r: 3 }}
                activeDot={{ r: 5 }}
                isAnimationActive
                animationDuration={1200}
              />
              <Line
                name={japanLabel}
                type="monotone"
                dataKey="japan"
                stroke="#a1a1aa"
                strokeWidth={1.5}
                dot={{ fill: "#a1a1aa", r: 3 }}
                activeDot={{ r: 5 }}
                isAnimationActive
                animationDuration={1200}
              />
              <Line
                name={germanyLabel}
                type="monotone"
                dataKey="germany"
                stroke="#3b82f6"
                strokeWidth={1.5}
                dot={{ fill: "#3b82f6", r: 3 }}
                activeDot={{ r: 5 }}
                isAnimationActive
                animationDuration={1200}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      {source && (
        <p className="mt-4 text-right font-body text-xs text-white/30">
          {sourceLabel} {source}
        </p>
      )}
    </motion.div>
  );
}
