"use client";

// ─── US Venture Capital History Chart ────────────────────────────────────────
// Area chart showing annual US VC investment (2000–2025) from NVCA/PitchBook.
// Demonstrates the parabolic rise in risk capital, especially the AI-driven
// surge from 2020 to 2025 ($413B).

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
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import { CHART_GOLD } from "@/lib/chart-theme";
import type { VCHistoryPoint } from "@/lib/data/economy-data";

interface VCHistoryChartProps {
  data: VCHistoryPoint[];
  title?: string;
  source?: string;
}

function VCHistTooltip({
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
      <p className="font-mono text-xs uppercase tracking-widest text-[#E8B923] mb-1">
        {label}
      </p>
      <p className="font-macro-display text-2xl text-white font-bold">
        ${value}<span className="text-lg">B</span>
      </p>
      <p className="font-macro-body text-xs text-white/50 mt-1">
        {locale === "ro" ? "capital de risc investit" : "venture capital deployed"}
      </p>
      {value >= 400 && (
        <p className="font-macro-body text-xs text-[#E8B923] mt-1">
          {locale === "ro" ? "Erа AI" : "The AI Era"}
        </p>
      )}
    </div>
  );
}

export function VCHistoryChart({ data, title, source }: VCHistoryChartProps) {
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

      <LazyChart height={340}>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="vcGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_GOLD} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={CHART_GOLD} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />
              <XAxis
                dataKey="year"
                tick={{
                  fill: "rgba(255,255,255,0.45)",
                  fontSize: 11,
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
                tickFormatter={(v) => `$${v}B`}
                width={55}
              />
              {/* Mark 2020 — the AI investment inflection */}
              <ReferenceLine
                x={2020}
                stroke="rgba(232,185,35,0.25)"
                strokeDasharray="4 4"
                label={{
                  value: locale === "ro" ? "Erа AI" : "AI Era",
                  position: "top",
                  fill: "rgba(232,185,35,0.55)",
                  fontSize: 10,
                  fontFamily: "var(--font-macro-body)",
                }}
              />
              <Tooltip
                content={<VCHistTooltip />}
                cursor={{ stroke: "rgba(232,185,35,0.3)", strokeWidth: 1.5 }}
              />
              <Area
                type="monotone"
                dataKey="vc"
                stroke={CHART_GOLD}
                strokeWidth={2.5}
                fill="url(#vcGradient)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: CHART_GOLD,
                  stroke: "#000",
                  strokeWidth: 2,
                }}
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
