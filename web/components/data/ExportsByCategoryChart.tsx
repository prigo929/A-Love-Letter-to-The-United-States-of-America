"use client";

// ─── US Exports by Category Chart ─────────────────────────────────────────────
// Horizontal bar chart of top US goods export categories (2025 Census/BEA).
// Total goods exports ~$2.18T. Shows America is not just a service economy.

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import { CHART_GOLD } from "@/lib/chart-theme";
import type { ExportCategoryPoint } from "@/lib/data/economy-data";

interface ExportsChartProps {
  data: ExportCategoryPoint[];
  title?: string;
  source?: string;
}

const BAR_COLORS = [
  CHART_GOLD,
  "#60A5FA",
  "#34D399",
  "#A78BFA",
  "#F97316",
  "#F472B6",
  "#22D3EE",
  "#FB923C",
];

function ExportTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: ExportCategoryPoint }>;
}) {
  const { locale } = useLanguage();
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-xl border border-white/15 bg-[#0a0a0a]/95 px-4 py-3 shadow-2xl backdrop-blur-sm max-w-[220px]">
      <p className="font-macro-body text-sm text-white font-semibold mb-1">
        {item.emoji} {locale === "ro" ? item.categoryRo : item.category}
      </p>
      <p className="font-macro-display text-2xl font-bold" style={{ color: CHART_GOLD }}>
        ${item.value}<span className="text-base">B</span>
      </p>
      <p className="font-macro-body text-xs text-white/40 mt-1">
        {locale === "ro" ? "exporturi SUA 2025" : "US exports 2025"}
      </p>
    </div>
  );
}

export function ExportsByCategoryChart({ data, title, source }: ExportsChartProps) {
  const { locale } = useLanguage();
  const sourceLabel = locale === "ro" ? "Sursă:" : "Source:";

  const sorted = [...data].sort((a, b) => b.value - a.value);
  const chartData = sorted.map((d) => ({
    ...d,
    label: locale === "ro" ? d.categoryRo : d.category,
  }));

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

      <LazyChart height={360}>
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 80, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{
                  fill: "rgba(255,255,255,0.4)",
                  fontSize: 11,
                  fontFamily: "var(--font-macro-body)",
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}B`}
              />
              <YAxis
                dataKey="label"
                type="category"
                tick={{
                  fill: "rgba(255,255,255,0.65)",
                  fontSize: 11,
                  fontFamily: "var(--font-macro-body)",
                }}
                axisLine={false}
                tickLine={false}
                width={148}
              />
              <Tooltip
                content={<ExportTooltip />}
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={26} isAnimationActive>
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={BAR_COLORS[index % BAR_COLORS.length]}
                    opacity={0.85}
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
