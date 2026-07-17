"use client";

// ─── GDP Sectors Chart ────────────────────────────────────────────────────────
// A horizontal Recharts bar chart showing U.S. GDP by industry sector.
// Colors the primary service sectors (Finance/Real Estate and Professional services)
// in gold to illustrate the modern, services-driven nature of the economy.

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { CHART_GOLD, CHART_ANIM_MS } from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { GdpSectorPoint } from "@/lib/data/economy-data";

interface GdpSectorsChartProps {
  data: GdpSectorPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function GdpSectorsChart({ data, title, subtitle, source }: GdpSectorsChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const sourceLabel = ro ? "Sursă:" : "Source:";
  const valueLabel = ro ? "Valoare adăugată" : "Value Added";

  // Localize sector names based on active locale
  const chartData = data.map((d) => ({
    ...d,
    displayName: ro ? d.sectorRo : d.sector,
  }));

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

      <LazyChart height={450}>
        <div className="h-[400px] w-full md:h-[450px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: -10, bottom: 10 }}
              barCategoryGap="25%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="displayName"
                tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 10.5, fontWeight: 500 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
                width={160}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const item = payload[0].payload as typeof chartData[0];
                  return (
                    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
                      <p className="mb-1.5 font-body text-sm font-semibold text-white leading-snug">
                        {item.displayName}
                      </p>
                      <p className="font-hero text-2xl text-glory-gold font-bold">
                        {item.percentage}%
                      </p>
                      <p className="font-body text-xs text-white/50 mt-1">
                        {valueLabel}: ${item.value.toFixed(1)}T
                      </p>
                    </div>
                  );
                }}
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
              />
              <Bar
                dataKey="percentage"
                radius={[0, 4, 4, 0]}
                isAnimationActive={true}
                animationDuration={CHART_ANIM_MS}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.highlight ? CHART_GOLD : "rgba(255,255,255,0.12)"}
                    stroke={entry.highlight ? CHART_GOLD : "rgba(255,255,255,0.2)"}
                    strokeWidth={1}
                  />
                ))}
              </Bar>
            </BarChart>
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
