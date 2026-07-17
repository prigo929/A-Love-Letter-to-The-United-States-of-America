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
import { CHART_GOLD, CHART_GRID, CHART_AXIS_LINE, CHART_TICK_MUTED, CHART_TOOLTIP_CLASS, curveFor, CHART_ANIM_MS } from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { IndustrialProductionPoint } from "@/lib/data/economy-data";

interface IndustrialProductionChartProps {
  data: IndustrialProductionPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function IndustrialProductionChart({ data, title, subtitle, source }: IndustrialProductionChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
     ? {
         valueLabel: "Indicele Producției Industriale (Base 2017=100)",
         source: "Sursă:",
         latest: "Cel mai recent",
         growth: "Creștere din 1970",
       }
     : {
         valueLabel: "Industrial Production Index (Base 2017=100)",
         source: "Source:",
         latest: "Latest",
         growth: "Growth since 1970",
       };

  const latest = data[data.length - 1];
  const first = data[0];
  const growthPercent = (((latest.value - first.value) / first.value) * 100).toFixed(0);

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
                <linearGradient id="indproGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_GOLD} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={CHART_GOLD} stopOpacity={0.02} />
                </linearGradient>
              </defs>
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
                domain={[20, 120]}
                width={40}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as IndustrialProductionPoint;
                  return (
                    <div className={CHART_TOOLTIP_CLASS}>
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-2xl text-glory-gold">{p.value}</p>
                      <p className="font-body text-xs text-white/50">{copy.valueLabel}</p>
                    </div>
                  );
                }}
              />
              <Area
                type={curveFor(data.length)}
                dataKey="value"
                stroke={CHART_GOLD}
                strokeWidth={2}
                fill="url(#indproGradient)"
                isAnimationActive animationDuration={CHART_ANIM_MS}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">{latest.value}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.latest} ({latest.year}, Base 2017=100)
          </div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">+{growthPercent}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.growth}
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
