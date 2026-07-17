"use client";

// ─── US IPO Market History Chart ─────────────────────────────────────────────
// ComposedChart: bars for IPO deal count + line for total proceeds (USD billions).
// Source: Renaissance Capital 2020–2025. Tracks the full cycle from SPAC boom
// through the rate-hike freeze to the AI-led recovery.

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import { CHART_GOLD, CHART_ANIM_MS } from "@/lib/chart-theme";
import type { IPOMarketPoint } from "@/lib/data/economy-data";

interface IPOMarketChartProps {
  data: IPOMarketPoint[];
  title?: string;
  source?: string;
}

function IPOTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: number;
}) {
  const { locale } = useLanguage();
  if (!active || !payload?.length) return null;
  const deals = payload.find((p) => p.name === "deals");
  const proceeds = payload.find((p) => p.name === "proceeds");
  return (
    <div className="rounded-xl border border-white/15 bg-[#0a0a0a]/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-2">{label}</p>
      {deals && (
        <p className="font-macro-display text-xl text-white font-bold">
          {deals.value} <span className="font-macro-body text-sm text-white/50">{locale === "ro" ? "IPO-uri" : "IPOs"}</span>
        </p>
      )}
      {proceeds && (
        <p className="font-macro-display text-xl font-bold" style={{ color: CHART_GOLD }}>
          ${proceeds.value.toFixed(1)}B{" "}
          <span className="font-macro-body text-sm text-white/50">{locale === "ro" ? "colectați" : "raised"}</span>
        </p>
      )}
    </div>
  );
}

export function IPOMarketChart({ data, title, source }: IPOMarketChartProps) {
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

      <LazyChart height={320}>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <ComposedChart data={data} margin={{ top: 20, right: 40, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "var(--font-macro-body)" }}
                axisLine={false}
                tickLine={false}
              />
              {/* Left axis: deal count */}
              <YAxis
                yAxisId="deals"
                orientation="left"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "var(--font-macro-body)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}`}
                width={35}
              />
              {/* Right axis: proceeds */}
              <YAxis
                yAxisId="proceeds"
                orientation="right"
                tick={{ fill: "rgba(232,185,35,0.6)", fontSize: 11, fontFamily: "var(--font-macro-body)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}B`}
                width={52}
              />
              <Tooltip content={<IPOTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Legend
                wrapperStyle={{ paddingTop: 16, fontFamily: "var(--font-macro-body)", fontSize: 12, color: "rgba(255,255,255,0.5)" }}
                formatter={(value) =>
                  value === "deals"
                    ? locale === "ro" ? "Nr. IPO-uri" : "# IPOs"
                    : locale === "ro" ? "Venituri (Mld$)" : "Proceeds ($B)"
                }
              />
              <Bar
                yAxisId="deals"
                dataKey="deals"
                fill="rgba(255,255,255,0.15)"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
                isAnimationActive animationDuration={CHART_ANIM_MS}
              />
              <Line
                yAxisId="proceeds"
                dataKey="proceeds"
                stroke={CHART_GOLD}
                strokeWidth={2.5}
                dot={{ fill: CHART_GOLD, r: 5, stroke: "#000", strokeWidth: 2 }}
                activeDot={{ r: 7 }}
                type="monotone"
                isAnimationActive animationDuration={CHART_ANIM_MS}
              />
            </ComposedChart>
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
