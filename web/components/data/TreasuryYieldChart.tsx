"use client";

// ─── US 10-Year Treasury Yield History ───────────────────────────────────────
// Area chart: FRED DGS10 annual averages 2000–2025.
// Shows the full macro cycle: post-dot-com highs → QE ZIRP era → taper tantrum
// → rate normalization → pandemic crash → fastest hiking cycle in 40 years.
// This is THE chart for explaining why everything in finance is priced off the US.

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import { CHART_GOLD } from "@/lib/chart-theme";
import type { TreasuryYieldPoint } from "@/lib/data/economy-data";

interface TreasuryYieldChartProps {
  data: TreasuryYieldPoint[];
  title?: string;
  source?: string;
}

function YieldTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: number;
}) {
  const { locale } = useLanguage();
  if (!active || !payload?.length) return null;
  const value = payload[0].value;
  return (
    <div className="rounded-xl border border-white/15 bg-[#0a0a0a]/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-1">{label}</p>
      <p className="font-macro-display text-2xl font-bold" style={{ color: CHART_GOLD }}>
        {value.toFixed(2)}%
      </p>
      <p className="font-macro-body text-xs text-white/50 mt-1">
        {locale === "ro" ? "Randament mediu anual Trezorerie 10Y" : "10Y Treasury annual average yield"}
      </p>
      {value < 1 && (
        <p className="font-macro-body text-xs text-blue-400 mt-1">
          {locale === "ro" ? "Era ZIRP (dobânzi zero)" : "ZIRP Era (zero interest rates)"}
        </p>
      )}
      {value > 4 && (
        <p className="font-macro-body text-xs text-orange-400 mt-1">
          {locale === "ro" ? "Ciclul de înăsprire monetară" : "Monetary tightening cycle"}
        </p>
      )}
    </div>
  );
}

export function TreasuryYieldChart({ data, title, source }: TreasuryYieldChartProps) {
  const { locale } = useLanguage();
  const sourceLabel = locale === "ro" ? "Sursă:" : "Source:";

  const annotations = [
    { year: 2008, label: locale === "ro" ? "Criză Fin." : "Fin. Crisis" },
    { year: 2020, label: locale === "ro" ? "COVID-19" : "COVID-19" },
    { year: 2022, label: locale === "ro" ? "Fed hike" : "Fed hike" },
  ];

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

      <LazyChart height={320}>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <AreaChart
              data={data}
              margin={{ top: 20, right: 20, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_GOLD} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={CHART_GOLD} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11, fontFamily: "var(--font-macro-body)" }}
                axisLine={false}
                tickLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "var(--font-macro-body)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                domain={[0, 7]}
                width={40}
              />
              {annotations.map((ann) => (
                <ReferenceLine
                  key={ann.year}
                  x={ann.year}
                  stroke="rgba(232,185,35,0.25)"
                  strokeDasharray="4 4"
                  label={{
                    value: ann.label,
                    position: "top",
                    fill: "rgba(232,185,35,0.5)",
                    fontSize: 9,
                    fontFamily: "var(--font-macro-body)",
                  }}
                />
              ))}
              <Tooltip
                content={<YieldTooltip />}
                cursor={{ stroke: "rgba(232,185,35,0.3)", strokeWidth: 1.5 }}
              />
              <Area
                type="monotone"
                dataKey="yield"
                stroke={CHART_GOLD}
                strokeWidth={2.5}
                fill="url(#yieldGradient)"
                dot={false}
                activeDot={{ r: 5, fill: CHART_GOLD, stroke: "#000", strokeWidth: 2 }}
                isAnimationActive
              />
            </AreaChart>
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
