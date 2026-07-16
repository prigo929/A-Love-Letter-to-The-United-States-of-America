"use client";

// ─── GDP vs Labor Force Sector Comparison Chart ──────────────────────────────
// A Recharts vertical layout grouped BarChart comparing sector output (BEA GDP share)
// against sector labor allocation (BLS job share). Demonstrates sector-level
// productivity differentials.

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { CHART_GOLD } from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { GdpLaborComparisonPoint } from "@/lib/data/economy-data";

interface GdpLaborComparisonChartProps {
  data: GdpLaborComparisonPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function GdpLaborComparisonChart({ data, title, subtitle, source }: GdpLaborComparisonChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const sourceLabel = ro ? "Sursă:" : "Source:";
  const gdpLegend = ro ? "Ponderea în PIB (%)" : "GDP Share (%)";
  const laborLegend = ro ? "Ponderea în Forța de Muncă (%)" : "Labor Share (%)";
  const jobsLabel = ro ? "Total Angajați:" : "Total Employees:";
  const productivityInfo = ro
    ? "O pondere în PIB mai mare decât în forța de muncă indică o productivitate și o valoare adăugată ridicată pe lucrător."
    : "A higher GDP share than labor share indicates high productivity and value added per worker.";

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
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 20, left: 40, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
              <XAxis
                type="number"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey={ro ? "sectorRo" : "sector"}
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 10, fill: "rgba(255,255,255,0.6)" }}
                tickLine={false}
                axisLine={false}
                width={130}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const item = payload[0].payload as GdpLaborComparisonPoint;
                  return (
                    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm max-w-[280px]">
                      <p className="mb-2 font-display text-xs font-bold text-white leading-tight">
                        {ro ? item.sectorRo : item.sector}
                      </p>
                      
                      <div className="flex items-center justify-between gap-8 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-[#E8B923]" />
                          <span className="text-white/60 text-[11px]">{gdpLegend}</span>
                        </div>
                        <span className="text-[#E8B923] text-xs font-bold">{item.gdpShare.toFixed(1)}%</span>
                      </div>

                      <div className="flex items-center justify-between gap-8 mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-[#06b6d4]" />
                          <span className="text-white/60 text-[11px]">{laborLegend}</span>
                        </div>
                        <span className="text-[#06b6d4] text-xs font-bold">{item.laborShare.toFixed(1)}%</span>
                      </div>

                      <div className="border-t border-white/5 pt-1.5 flex items-center justify-between">
                        <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider">{jobsLabel}</span>
                        <span className="text-white text-xs font-mono font-bold">{item.jobsCount}M</span>
                      </div>
                    </div>
                  );
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="rect"
                iconSize={10}
                wrapperStyle={{ fontSize: 11, paddingBottom: 10 }}
              />
              <Bar
                name={gdpLegend}
                dataKey="gdpShare"
                fill={CHART_GOLD}
                radius={[0, 4, 4, 0]}
                maxBarSize={14}
              />
              <Bar
                name={laborLegend}
                dataKey="laborShare"
                fill="#06b6d4"
                radius={[0, 4, 4, 0]}
                maxBarSize={14}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      {/* Productivity Insight Box */}
      <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.01] p-3 text-xs text-white/50 leading-relaxed italic text-center">
        {productivityInfo}
      </div>

      {source && (
        <p className="mt-4 text-right font-body text-[10px] uppercase tracking-wider text-white/30">
          {sourceLabel} {source}
        </p>
      )}
    </motion.div>
  );
}
