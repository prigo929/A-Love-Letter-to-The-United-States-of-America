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
import type { VcExitPoint } from "@/lib/data/economy-data";

interface VcExitsChartProps {
  data: VcExitPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function VcExitsChart({ data, title, subtitle, source }: VcExitsChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
     ? {
         ipo: "IPO (Lansări la Bursă)",
         ma: "M&A (Fuziuni și Achiziții)",
         buyout: "Buyout (Răscumpărări)",
         valueLabel: "Valoare Exits (miliarde USD)",
         source: "Sursă:",
         latest: "Cel mai recent",
       }
     : {
         ipo: "IPO (Public Listings)",
         ma: "M&A (Mergers & Acquisitions)",
         buyout: "Buyout (Acquisitions)",
         valueLabel: "Exit Value (USD Billions)",
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
                  const p = payload[0].payload as VcExitPoint;
                  const total = p.ipo + p.ma + p.buyout;
                  return (
                    <div className={CHART_TOOLTIP_CLASS}>
                      <p className="mb-2 font-body text-xs text-white/50">{label} - {locale === "ro" ? "Valoare Exits" : "Exit Activity"}</p>
                      <p className="font-body text-xs text-white/80">
                        <span className="inline-block w-2 h-2 rounded-full mr-2 bg-[#E8B923]" />
                        {copy.ipo}: <span className="font-bold text-white">${p.ipo}B</span>
                      </p>
                      <p className="font-body text-xs text-white/80 mt-1">
                        <span className="inline-block w-2 h-2 rounded-full mr-2 bg-[#60A5FA]" />
                        {copy.ma}: <span className="font-bold text-white">${p.ma}B</span>
                      </p>
                      <p className="font-body text-xs text-white/80 mt-1">
                        <span className="inline-block w-2 h-2 rounded-full mr-2 bg-[#A78BFA]" />
                        {copy.buyout}: <span className="font-bold text-white">${p.buyout}B</span>
                      </p>
                      <div className="border-t border-white/10 mt-2 pt-2">
                        <p className="font-hero text-lg text-glory-gold font-bold">
                          ${total.toFixed(1)}B <span className="font-body text-xs text-white/50">{locale === "ro" ? "Total" : "Total Exit Value"}</span>
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
                  if (value === "ipo") return copy.ipo;
                  if (value === "ma") return copy.ma;
                  return copy.buyout;
                }}
              />
              <Bar dataKey="ipo" stackId="a" fill={CHART_GOLD} opacity={0.95} />
              <Bar dataKey="ma" stackId="a" fill="#60A5FA" opacity={0.8} />
              <Bar dataKey="buyout" stackId="a" fill="#A78BFA" opacity={0.8} />
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
