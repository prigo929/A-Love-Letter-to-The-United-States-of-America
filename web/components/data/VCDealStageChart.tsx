"use client";

// ─── VC Deal Stage Breakdown Chart ───────────────────────────────────────────
// Scatter-style bubble chart showing deal count vs capital deployed per stage.
// Mega-rounds ($1B+) dominate capital at $217B despite only 180 deals.
// Source: NVCA / PitchBook Venture Monitor 2025 Full-Year.

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { VCDealStagePoint } from "@/lib/data/economy-data";

interface VCDealStageChartProps {
  data: VCDealStagePoint[];
  title?: string;
  source?: string;
}

function StageTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: VCDealStagePoint; name: string; value: number }>;
}) {
  const { locale } = useLanguage();
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-xl border border-white/15 bg-[#0a0a0a]/95 px-4 py-3 shadow-2xl backdrop-blur-sm max-w-[220px]">
      <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: item.color }}>
        {locale === "ro" ? item.stageRo : item.stage}
      </p>
      <p className="font-macro-display text-xl text-white font-bold">
        ${item.capital.toFixed(1)}B
        <span className="font-macro-body text-xs text-white/50 ml-1">
          {locale === "ro" ? "capital investit" : "capital deployed"}
        </span>
      </p>
      <p className="font-macro-body text-sm text-white/60 mt-1">
        {item.dealCount.toLocaleString()} {locale === "ro" ? "runde" : "rounds"}
      </p>
    </div>
  );
}

export function VCDealStageChart({ data, title, source }: VCDealStageChartProps) {
  const { locale } = useLanguage();
  const sourceLabel = locale === "ro" ? "Sursă:" : "Source:";

  const chartData = data.map((d) => ({
    ...d,
    stageLabel: locale === "ro" ? d.stageRo : d.stage,
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

      <LazyChart height={340}>
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Capital deployed bar chart */}
          <div className="h-72 w-full">
            <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">
              {locale === "ro" ? "Capital Investit (Mld$)" : "Capital Deployed ($B)"}
            </p>
            <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 0, right: 50, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontFamily: "var(--font-macro-body)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v}B`}
                />
                <YAxis
                  dataKey="stageLabel"
                  type="category"
                  tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 10, fontFamily: "var(--font-macro-body)" }}
                  axisLine={false}
                  tickLine={false}
                  width={130}
                />
                <Tooltip content={<StageTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="capital" radius={[0, 6, 6, 0]} maxBarSize={24} isAnimationActive>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} opacity={0.9} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend with deal counts */}
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">
              {locale === "ro" ? "Distribuția Capitalului" : "Capital Distribution"}
            </p>
            {chartData.map((entry) => {
              const totalCapital = data.reduce((sum, d) => sum + d.capital, 0);
              const pct = ((entry.capital / totalCapital) * 100).toFixed(0);
              return (
                <div
                  key={entry.stage}
                  className="flex items-center gap-3 rounded-lg border border-white/5 p-3 hover:border-white/15 transition-colors"
                >
                  <span
                    className="h-3 w-3 flex-shrink-0 rounded-sm"
                    style={{ backgroundColor: entry.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-macro-body text-sm text-white/75 truncate">
                      {locale === "ro" ? entry.stageRo : entry.stage}
                    </p>
                    <p className="font-macro-body text-xs text-white/35">
                      {entry.dealCount.toLocaleString()} {locale === "ro" ? "runde" : "rounds"}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-macro-display text-base font-bold" style={{ color: entry.color }}>
                      {pct}%
                    </p>
                    <p className="font-macro-body text-xs text-white/35">
                      ${entry.capital.toFixed(0)}B
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </LazyChart>

      {source && (
        <p className="mt-6 text-right font-macro-body text-xs text-white/30">
          {sourceLabel} {source}
        </p>
      )}
    </motion.div>
  );
}
