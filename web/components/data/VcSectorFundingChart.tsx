"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  CHART_GOLD,
  CHART_GRID,
  CHART_AXIS_LINE,
  CHART_TICK_MUTED,
  CHART_TOOLTIP_CLASS,
} from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { VcSectorFundingPoint } from "@/lib/data/economy-data";

interface VcSectorFundingChartProps {
  data: VcSectorFundingPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function VcSectorFundingChart({ data, title, subtitle, source }: VcSectorFundingChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
     ? {
         software: "Software tradițional",
         ai: "Inteligență Artificială (AI/ML)",
         healthcare: "Sănătate / Biotech",
         other: "Alte sectoare (Hard Tech, Energie)",
         valueLabel: "Finanțare (miliarde USD)",
         source: "Sursă:",
         latest: "Cel mai recent",
       }
     : {
         software: "Traditional Software",
         ai: "Artificial Intelligence (AI/ML)",
         healthcare: "Healthcare / Biotech",
         other: "Other Sectors (Hard Tech, Energy)",
         valueLabel: "Funding (USD Billions)",
         source: "Source:",
         latest: "Latest",
       };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="w-full"
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 font-body text-sm text-white/55">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <LazyChart height={360}>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} vertical={false} />
              <XAxis
                dataKey="year"
                tick={CHART_TICK_MUTED}
                axisLine={{ stroke: CHART_AXIS_LINE }}
                tickLine={false}
              />
              <YAxis
                tick={CHART_TICK_MUTED}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}B`}
                width={40}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as VcSectorFundingPoint;
                  const total = p.software + p.ai + p.healthcare + p.other;
                  return (
                    <div className={CHART_TOOLTIP_CLASS}>
                      <p className="mb-2 font-body text-xs text-white/50">{label} - {locale === "ro" ? "Finanțare pe sectoare" : "Funding by Sector"}</p>
                      <p className="font-body text-xs text-white/80">
                        <span className="inline-block w-2 h-2 rounded-full mr-2 bg-[#60A5FA]" />
                        {copy.software}: <span className="font-bold text-white">${p.software}B</span>
                      </p>
                      <p className="font-body text-xs text-white/80 mt-1">
                        <span className="inline-block w-2 h-2 rounded-full mr-2 bg-[#E8B923]" />
                        {copy.ai}: <span className="font-bold text-white">${p.ai}B</span>
                      </p>
                      <p className="font-body text-xs text-white/80 mt-1">
                        <span className="inline-block w-2 h-2 rounded-full mr-2 bg-[#A78BFA]" />
                        {copy.healthcare}: <span className="font-bold text-white">${p.healthcare}B</span>
                      </p>
                      <p className="font-body text-xs text-white/80 mt-1">
                        <span className="inline-block w-2 h-2 rounded-full mr-2 bg-[#F97316]" />
                        {copy.other}: <span className="font-bold text-white">${p.other}B</span>
                      </p>
                      <div className="border-t border-white/10 mt-2 pt-2">
                        <p className="font-hero text-lg text-glory-gold font-bold">
                          ${total.toFixed(1)}B <span className="font-body text-xs text-white/50">{locale === "ro" ? "Total" : "Total Deployed"}</span>
                        </p>
                      </div>
                    </div>
                  );
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => {
                  if (value === "software") return copy.software;
                  if (value === "ai") return copy.ai;
                  if (value === "healthcare") return copy.healthcare;
                  return copy.other;
                }}
              />
              <Bar dataKey="software" stackId="a" fill="#60A5FA" opacity={0.8} />
              <Bar dataKey="ai" stackId="a" fill={CHART_GOLD} opacity={0.95} />
              <Bar dataKey="healthcare" stackId="a" fill="#A78BFA" opacity={0.8} />
              <Bar dataKey="other" stackId="a" fill="#F97316" opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      {source && (
        <p className="mt-4 text-right font-body text-xs text-white/30">
          {copy.source} {source}
        </p>
      )}
    </motion.div>
  );
}
