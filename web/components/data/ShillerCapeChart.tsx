"use client";

import {
  LineChart,
  Line,
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
import type { ShillerCapePoint } from "@/lib/data/economy-data";

interface ShillerCapeChartProps {
  data: ShillerCapePoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function ShillerCapeChart({ data, title, subtitle, source }: ShillerCapeChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
     ? {
         valueLabel: "Multiplu Shiller CAPE",
         source: "Sursă:",
         latest: "Cel mai recent",
         mean: "Medie Istorică (~17.0)",
         dotcom: "Bust Dot-Com (2000)",
         gfc: "Criza 2008",
       }
     : {
         valueLabel: "Shiller CAPE Multiple",
         source: "Source:",
         latest: "Latest",
         mean: "Historical Mean (~17.0)",
         dotcom: "Dot-Com Peak (2000)",
         gfc: "2008 Crisis",
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
            <LineChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
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
                tickFormatter={(v) => `${v}x`}
                width={35}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as ShillerCapePoint;
                  return (
                    <div className={CHART_TOOLTIP_CLASS}>
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-2xl text-glory-gold">{p.value.toFixed(1)}x</p>
                      <p className="font-body text-xs text-white/50">{copy.valueLabel}</p>
                    </div>
                  );
                }}
              />
              <ReferenceLine
                y={17.0}
                stroke="rgba(255,255,255,0.25)"
                strokeDasharray="3 3"
                label={{ value: copy.mean, position: "top", fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              />
              <ReferenceLine
                x={2000}
                stroke="rgba(255,255,255,0.2)"
                strokeDasharray="3 3"
                label={{ value: copy.dotcom, position: "top", fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={CHART_GOLD}
                strokeWidth={2.2}
                dot={false}
                activeDot={{ r: 5 }}
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 border-t border-white/10 pt-6">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">{latest.value.toFixed(1)}x</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.latest} ({latest.year}, multi-anual price-to-earnings)
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
