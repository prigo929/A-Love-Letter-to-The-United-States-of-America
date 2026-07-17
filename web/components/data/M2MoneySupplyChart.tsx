"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
import type { M2MoneySupplyPoint } from "@/lib/data/economy-data";

interface M2MoneySupplyChartProps {
  data: M2MoneySupplyPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function M2MoneySupplyChart({ data, title, subtitle, source }: M2MoneySupplyChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
     ? {
         m2Label: "Masa monetară M2 (trilioane USD)",
         source: "Sursă:",
         latest: "Cel mai recent",
       }
     : {
         m2Label: "M2 Money Supply (USD Trillions)",
         source: "Source:",
         latest: "Latest",
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
                <linearGradient id="m2Gradient" x1="0" y1="0" x2="0" y2="1">
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
                ticks={["2000-01", "2005-01", "2010-01", "2015-01", "2020-01", "2025-01", "2026-05"]}
                tickFormatter={(m: string) => String(m).slice(0, 4)}
              />
              <YAxis
                tick={CHART_TICK_MUTED}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}T`}
                width={45}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as M2MoneySupplyPoint;
                  return (
                    <div className={CHART_TOOLTIP_CLASS}>
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-2xl text-glory-gold">${p.m2.toFixed(1)}T</p>
                      <p className="font-body text-xs text-white/50">{copy.m2Label}</p>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="m2"
                stroke={CHART_GOLD}
                strokeWidth={2}
                fill="url(#m2Gradient)"
                isAnimationActive
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 border-t border-white/10 pt-6">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">${latest.m2.toFixed(1)} Trillion</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.latest} ({latest.month})
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
