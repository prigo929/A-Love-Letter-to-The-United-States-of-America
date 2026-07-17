"use client";

// ─── US Annual Real GDP Growth Rate Chart ─────────────────────────────────────
// Bar chart (1970–2025): each year's real GDP % YoY change.
// Recession years (NBER-defined) rendered in red, expansions in gold/navy.
// Source: BEA NIPA / World Bank WDI.

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import { CHART_GOLD, CHART_ANIM_MS } from "@/lib/chart-theme";
import type { GdpGrowthRatePoint } from "@/lib/data/economy-data";

interface GdpAnnualGrowthChartProps {
  data: GdpGrowthRatePoint[];
  title?: string;
  source?: string;
}

function GrowthTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: GdpGrowthRatePoint }>;
  label?: number;
}) {
  const { locale } = useLanguage();
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  const isRecession = item.recession;
  return (
    <div className="rounded-xl border border-white/15 bg-[#0a0a0a]/95 px-4 py-3 shadow-2xl backdrop-blur-sm min-w-[140px]">
      <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-1">{label}</p>
      <p
        className="font-macro-display text-2xl font-bold"
        style={{ color: item.growth >= 0 ? CHART_GOLD : "#ef4444" }}
      >
        {item.growth > 0 ? "+" : ""}{item.growth.toFixed(1)}%
      </p>
      {isRecession && (
        <p className="font-macro-body text-xs text-red-400 mt-1 uppercase tracking-wider">
          {locale === "ro" ? "Recesiune NBER" : "NBER Recession"}
        </p>
      )}
    </div>
  );
}

export function GdpAnnualGrowthChart({
  data,
  title,
  source,
}: GdpAnnualGrowthChartProps) {
  const { locale } = useLanguage();
  const sourceLabel = locale === "ro" ? "Sursă:" : "Source:";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="w-full"
    >
      {title && (
        <h3 className="mb-8 font-macro-display text-xl font-semibold text-white md:text-2xl">
          {title}
        </h3>
      )}

      {/* Legend */}
      <div className="flex gap-6 mb-6">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: CHART_GOLD }} />
          <span className="font-macro-body text-xs text-white/50 uppercase tracking-widest">
            {locale === "ro" ? "Expansiune" : "Expansion"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-red-500" />
          <span className="font-macro-body text-xs text-white/50 uppercase tracking-widest">
            {locale === "ro" ? "Recesiune" : "Recession"}
          </span>
        </div>
      </div>

      <LazyChart height={300}>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: 5, bottom: 5 }}
              barCategoryGap="15%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />
              <XAxis
                dataKey="year"
                tick={{
                  fill: "rgba(255,255,255,0.35)",
                  fontSize: 10,
                  fontFamily: "var(--font-macro-body)",
                }}
                axisLine={false}
                tickLine={false}
                interval={4}
              />
              <YAxis
                tick={{
                  fill: "rgba(255,255,255,0.4)",
                  fontSize: 11,
                  fontFamily: "var(--font-macro-body)",
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                domain={["auto", "auto"]}
                width={42}
              />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
              <Tooltip
                content={<GrowthTooltip />}
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
              />
              <Bar dataKey="growth" radius={[3, 3, 0, 0]} maxBarSize={12} isAnimationActive animationDuration={CHART_ANIM_MS}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.recession ? "#ef4444" : CHART_GOLD}
                    opacity={entry.recession ? 0.85 : (entry.growth >= 0 ? 0.85 : 1)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      {source && (
        <p className="mt-3 text-right font-macro-body text-xs text-white/30">
          {sourceLabel} {source}
        </p>
      )}
    </motion.div>
  );
}
