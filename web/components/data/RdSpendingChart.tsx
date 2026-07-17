"use client";

// ─── R&D Spending International Comparison Chart ──────────────────────────────
// Horizontal bar chart: GERD as % of GDP for top innovation economies.
// Source: NSF/NCSES, OECD MSTI 2024-2025.
//
// The US at 3.50% ranks 3rd globally — ahead of every EU peer and China.
// US R&D absolute dollar spend ($900B+) is by far #1 globally.

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import { CHART_GOLD, CHART_NAVY, CHART_ANIM_MS } from "@/lib/chart-theme";
import type { RdSpendingPoint } from "@/lib/data/economy-data";

interface RdSpendingChartProps {
  data: RdSpendingPoint[];
  title?: string;
  source?: string;
}

function RdTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: RdSpendingPoint }>;
  label?: string;
}) {
  const { locale } = useLanguage();
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-xl border border-white/15 bg-[#0a0a0a]/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="font-mono text-xs uppercase tracking-widest text-[#E8B923] mb-1">
        {locale === "ro" ? item.countryRo : item.country}
      </p>
      <p className="font-macro-display text-2xl text-white font-bold">
        {item.value.toFixed(2)}<span className="text-lg">%</span>
        <span className="font-macro-body text-sm text-white/50 ml-1">{locale === "ro" ? "din PIB" : "of GDP"}</span>
      </p>
      {item.highlight && (
        <p className="font-macro-body text-xs text-[#E8B923] mt-1">
          {locale === "ro" ? "#3 global — ~$900Mld cheltuiți în cercetare" : "#3 globally — ~$900B invested in R&D"}
        </p>
      )}
    </div>
  );
}

export function RdSpendingChart({ data, title, source }: RdSpendingChartProps) {
  const { locale } = useLanguage();
  const sourceLabel = locale === "ro" ? "Sursă:" : "Source:";

  // Sort descending for visual impact
  const sorted = [...data].sort((a, b) => b.value - a.value);

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

      <LazyChart height={380}>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <BarChart
              data={sorted}
              layout="vertical"
              margin={{ top: 5, right: 70, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                horizontal={false}
              />
              <XAxis
                type="number"
                domain={[0, 5.5]}
                tick={{
                  fill: "rgba(255,255,255,0.4)",
                  fontSize: 11,
                  fontFamily: "var(--font-macro-body)",
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                dataKey={locale === "ro" ? "countryRo" : "country"}
                type="category"
                tick={{
                  fill: "rgba(255,255,255,0.65)",
                  fontSize: 12,
                  fontFamily: "var(--font-macro-body)",
                }}
                axisLine={false}
                tickLine={false}
                width={110}
              />
              <ReferenceLine
                x={3.50}
                stroke="rgba(232,185,35,0.35)"
                strokeDasharray="4 4"
                strokeWidth={1.5}
              />
              <Tooltip
                content={<RdTooltip />}
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={22} isAnimationActive animationDuration={CHART_ANIM_MS}>
                {sorted.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.highlight ? CHART_GOLD : CHART_NAVY}
                    opacity={entry.highlight ? 1 : 0.75}
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
