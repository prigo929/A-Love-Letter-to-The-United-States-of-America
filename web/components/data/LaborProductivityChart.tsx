"use client";

// ─── Labor Productivity Chart ─────────────────────────────────────────────────
// Horizontal bar chart: GDP per hour worked (USD PPP) for 9 major economies.
// Source: OECD.Stat 2024. US leads all large economies at $97.10/hr.

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
import { CHART_GOLD, CHART_NAVY } from "@/lib/chart-theme";
import type { ProductivityPoint } from "@/lib/data/economy-data";

interface ProductivityChartProps {
  data: ProductivityPoint[];
  title?: string;
  source?: string;
}

function ProductivityTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: ProductivityPoint }>;
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
        ${item.value.toFixed(1)}
        <span className="font-macro-body text-sm text-white/50 ml-1">
          {locale === "ro" ? "/ oră (PPP)" : "/ hour (PPP)"}
        </span>
      </p>
      {item.highlight && (
        <p className="font-macro-body text-xs text-[#E8B923] mt-1">
          {locale === "ro" ? "Cel mai productiv din G20" : "Most productive G20 economy"}
        </p>
      )}
    </div>
  );
}

export function LaborProductivityChart({ data, title, source }: ProductivityChartProps) {
  const { locale } = useLanguage();
  const sourceLabel = locale === "ro" ? "Sursă:" : "Source:";

  // Sort descending
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

      <LazyChart height={360}>
        <div className="h-[360px] w-full">
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
                domain={[0, 110]}
                tick={{
                  fill: "rgba(255,255,255,0.4)",
                  fontSize: 11,
                  fontFamily: "var(--font-macro-body)",
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}`}
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
              {/* OECD average reference */}
              <ReferenceLine
                x={68}
                stroke="rgba(255,255,255,0.2)"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: locale === "ro" ? "Media OCDE" : "OECD avg",
                  position: "top",
                  fill: "rgba(255,255,255,0.35)",
                  fontSize: 9,
                  fontFamily: "var(--font-macro-body)",
                }}
              />
              <Tooltip
                content={<ProductivityTooltip />}
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={26} isAnimationActive>
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
