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
import { CHART_GOLD, CHART_GRID, CHART_AXIS_LINE, CHART_TICK_MUTED, CHART_TOOLTIP_CLASS, curveFor, CHART_ANIM_MS } from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { DebtToGdpPoint } from "@/lib/data/economy-data";

interface DebtToGdpChartProps {
  data: DebtToGdpPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function DebtToGdpChart({ data, title, subtitle, source }: DebtToGdpChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
     ? {
         debtLabel: "Datorie ca % din PIB",
         source: "Sursă:",
         latest: "Cel mai recent",
         gfc: "Criză 2008",
         covid: "COVID-19",
       }
     : {
         debtLabel: "Debt as % of GDP",
         source: "Source:",
         latest: "Latest",
         gfc: "2008 Crisis",
         covid: "COVID-19",
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
                <linearGradient id="debtGradient" x1="0" y1="0" x2="0" y2="1">
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
                tickFormatter={(v) => `${v}%`}
                width={45}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as DebtToGdpPoint;
                  return (
                    <div className={CHART_TOOLTIP_CLASS}>
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-2xl text-glory-gold">{p.debt}%</p>
                      <p className="font-body text-xs text-white/50">{copy.debtLabel}</p>
                    </div>
                  );
                }}
              />
              <ReferenceLine
                x={2008}
                stroke="rgba(255,255,255,0.25)"
                strokeDasharray="3 3"
                label={{ value: copy.gfc, position: "top", fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              />
              <ReferenceLine
                x={2020}
                stroke="rgba(255,255,255,0.25)"
                strokeDasharray="3 3"
                label={{ value: copy.covid, position: "top", fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              />
              <Area
                type={curveFor(data.length)}
                dataKey="debt"
                stroke={CHART_GOLD}
                strokeWidth={2}
                fill="url(#debtGradient)"
                isAnimationActive animationDuration={CHART_ANIM_MS}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 border-t border-white/10 pt-6">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">{latest.debt}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.latest} ({latest.year})
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
