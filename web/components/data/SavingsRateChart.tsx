"use client";

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
import type { SavingsRatePoint } from "@/lib/data/economy-data";

interface SavingsRateChartProps {
  data: SavingsRatePoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function SavingsRateChart({ data, title, subtitle, source }: SavingsRateChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
     ? {
         valueLabel: "Rata Economisirii Personale (%)",
         source: "Sursă:",
         latest: "Cel mai recent",
         covid: "Vârf COVID (32%)",
         mean: "Medie Istorică (~8.5%)",
       }
     : {
         valueLabel: "Personal Savings Rate (%)",
         source: "Source:",
         latest: "Latest",
         covid: "COVID Peak (32%)",
         mean: "Historical Average (~8.5%)",
       };

  const latest = data[data.length - 1];

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

      <LazyChart height={340}>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <AreaChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_GOLD} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={CHART_GOLD} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} vertical={false} />
              <XAxis
                dataKey="month"
                tick={CHART_TICK_MUTED}
                axisLine={{ stroke: CHART_AXIS_LINE }}
                tickLine={false}
                ticks={["1970-01", "1980-01", "1990-01", "2000-01", "2010-01", "2020-01", "2026-05"]}
                tickFormatter={(m: string) => String(m).slice(0, 4)}
              />
              <YAxis
                tick={CHART_TICK_MUTED}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                width={35}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as SavingsRatePoint;
                  return (
                    <div className={CHART_TOOLTIP_CLASS}>
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-2xl text-glory-gold">{p.value.toFixed(1)}%</p>
                      <p className="font-body text-xs text-white/50">{copy.valueLabel}</p>
                    </div>
                  );
                }}
              />
              <ReferenceLine
                y={8.5}
                stroke="rgba(255,255,255,0.2)"
                strokeDasharray="3 3"
                label={{ value: copy.mean, position: "top", fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              />
              <ReferenceLine
                x="2020-04"
                stroke="rgba(255,255,255,0.25)"
                strokeDasharray="3 3"
                label={{ value: copy.covid, position: "top", fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={CHART_GOLD}
                strokeWidth={2}
                fill="url(#savingsGrad)"
                isAnimationActive
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 border-t border-white/10 pt-6">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">{latest.value.toFixed(1)}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.latest} ({latest.month}, economii ca % din venitul disponibil)
          </div>
        </div>
      </div>

      {source && (
        <p className="mt-4 text-right font-body text-xs text-white/30">
          {copy.source} {source}
        </p>
      )}
    </motion.div>
  );
}
