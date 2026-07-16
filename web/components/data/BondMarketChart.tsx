"use client";

// ─── Bond Market Composition Chart ────────────────────────────────────────────
// Donut chart showing US fixed income outstanding by category (SIFMA 1Q26).
// $50.5T total: Treasuries $30.8T, Corporate $11.7T, Municipal $4.5T, etc.
//
// Beginner guide:
// - Data flows in via `data` prop (BondMarketPoint[]) from economy-data.ts.
// - Uses Recharts PieChart with innerRadius for the donut shape.

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { BondMarketPoint } from "@/lib/data/economy-data";

interface BondMarketChartProps {
  data: BondMarketPoint[];
  title?: string;
  source?: string;
}

function BondTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: BondMarketPoint }>;
}) {
  const { locale } = useLanguage();
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-xl border border-white/15 bg-[#0a0a0a]/95 px-4 py-3 shadow-2xl backdrop-blur-sm max-w-xs">
      <p className="font-mono text-xs uppercase tracking-widest text-[#E8B923] mb-1">
        {locale === "ro" ? item.categoryRo : item.category}
      </p>
      <p className="font-macro-display text-2xl text-white font-bold">
        ${item.value.toFixed(1)}<span className="text-lg">T</span>
      </p>
      <p className="font-macro-body text-sm text-white/60 mt-1">
        {item.percentage.toFixed(1)}% of total market
      </p>
      <p className="font-macro-body text-xs text-white/40 mt-2 leading-relaxed">
        {locale === "ro" ? item.descriptionRo : item.description}
      </p>
    </div>
  );
}

export function BondMarketChart({ data, title, source }: BondMarketChartProps) {
  const { locale } = useLanguage();
  const sourceLabel = locale === "ro" ? "Sursă:" : "Source:";
  const totalValue = data.reduce((sum, d) => sum + d.value, 0);

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

      <LazyChart height={340}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] items-center">
          {/* Donut Chart */}
          <div className="relative h-72 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius="52%"
                  outerRadius="78%"
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                {/* Center label */}
                <text x="50%" y="46%" textAnchor="middle" dominantBaseline="middle">
                  <tspan
                    x="50%"
                    dy="0"
                    fontSize="30"
                    fontFamily="var(--font-macro-display)"
                    fill="#E8B923"
                    fontWeight="700"
                  >
                    ${totalValue.toFixed(1)}T
                  </tspan>
                  <tspan
                    x="50%"
                    dy="22"
                    fontSize="10"
                    fontFamily="var(--font-macro-body)"
                    fill="rgba(255,255,255,0.4)"
                    letterSpacing="2"
                  >
                    {locale === "ro" ? "TOTAL PIAȚĂ" : "TOTAL MARKET"}
                  </tspan>
                </text>
                <Tooltip
                  content={<BondTooltip />}
                  cursor={false}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend with value breakdown */}
          <div className="space-y-3">
            {data.map((entry) => (
              <div
                key={entry.category}
                className="flex items-center gap-4 rounded-lg border border-white/5 p-3 hover:border-white/15 transition-colors duration-200"
              >
                <span
                  className="h-3 w-3 flex-shrink-0 rounded-sm"
                  style={{ backgroundColor: entry.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-macro-body text-sm text-white/80 truncate">
                    {locale === "ro" ? entry.categoryRo : entry.category}
                  </p>
                  <p className="font-macro-body text-xs text-white/40 truncate">
                    {locale === "ro" ? entry.descriptionRo : entry.description}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-macro-display text-base font-bold" style={{ color: entry.color }}>
                    ${entry.value.toFixed(1)}T
                  </p>
                  <p className="font-macro-body text-xs text-white/40">
                    {entry.percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </LazyChart>

      {source && (
        <p className="mt-4 text-right font-macro-body text-xs text-white/30">
          {sourceLabel} {source}
        </p>
      )}
    </motion.div>
  );
}
