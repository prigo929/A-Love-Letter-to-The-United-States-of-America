"use client";

// ─── GDP Divergence Chart ─────────────────────────────────────────────────────
// A Recharts line chart illustrating how U.S. economic growth has diverged from
// its major advanced peers (Group of Seven) since 2010.

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
import { CHART_GOLD, CHART_ANIM_MS } from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { GdpDivergencePoint } from "@/lib/data/economy-data";

interface GdpDivergenceChartProps {
  data: GdpDivergencePoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function GdpDivergenceChart({ data, title, subtitle, source }: GdpDivergenceChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const sourceLabel = ro ? "Sursă:" : "Source:";
  const usLabel = ro ? "Statele Unite (Indice)" : "United States (Index)";
  const g7Label = ro ? "Restul G7 (Indice)" : "Rest of G7 (Index)";
  const tooltipTitle = ro ? "Indice PIB Real (2010 = 100)" : "Real GDP Index (2010 = 100)";
  const outperformanceLabel = ro ? "Divergență / Performanță SUA" : "U.S. Cumulative Outperformance";

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
                domain={[95, 145]}
                tickFormatter={(v) => `${v}`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const usVal = payload[0].value as number;
                  const g7Val = payload[1].value as number;
                  const diff = usVal - g7Val;
                  return (
                    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
                      <p className="mb-1.5 font-body text-xs text-white/50">{ro ? "Anul" : "Year"} {label}</p>
                      <p className="font-body text-sm font-semibold text-white mb-1.5">{tooltipTitle}</p>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="h-2 w-2 rounded-full" style={{ background: CHART_GOLD }} />
                        <span className="text-white text-sm">{ro ? "SUA" : "US"}: <strong>{usVal.toFixed(1)}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: "rgba(255,255,255,0.5)" }} />
                        <span className="text-white/75 text-sm">{ro ? "G7 (Restul)" : "G7 (Rest)"}: <strong>{g7Val.toFixed(1)}</strong></span>
                      </div>
                      {diff > 0 && (
                        <p className="text-xs text-emerald-400 font-semibold border-t border-white/10 pt-1.5">
                          {outperformanceLabel}: +{diff.toFixed(1)}%
                        </p>
                      )}
                    </div>
                  );
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingBottom: 10, color: "rgba(255,255,255,0.8)" }}
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
                animationDuration={CHART_ANIM_MS}
              />
              <Line
                name={g7Label}
                type="monotone"
                dataKey="g7"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth={2}
                dot={{ fill: "rgba(255,255,255,0.4)", r: 3 }}
                activeDot={{ r: 5 }}
                isAnimationActive
                animationDuration={CHART_ANIM_MS}
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
