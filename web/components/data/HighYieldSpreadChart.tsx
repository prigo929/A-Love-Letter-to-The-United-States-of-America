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
import type { HighYieldSpreadPoint } from "@/lib/data/economy-data";

interface HighYieldSpreadChartProps {
  data: HighYieldSpreadPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function HighYieldSpreadChart({ data, title, subtitle, source }: HighYieldSpreadChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
     ? {
         valueLabel: "Marjă de credit (puncte procentuale)",
         source: "Sursă:",
         latest: "Cel mai recent",
         gfc: "Criza 2008",
         covid: "COVID",
         dotcom: "Bust Dot-Com",
       }
     : {
         valueLabel: "Credit Spread (percentage points)",
         source: "Source:",
         latest: "Latest",
         gfc: "2008 Crisis",
         covid: "COVID",
         dotcom: "Dot-Com Bust",
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
                <linearGradient id="spreadGradient" x1="0" y1="0" x2="0" y2="1">
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
                ticks={["1998-01", "2002-01", "2008-10", "2012-01", "2016-01", "2020-03", "2026-07"]}
                tickFormatter={(m: string) => String(m).slice(0, 4)}
              />
              <YAxis
                tick={CHART_TICK_MUTED}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                width={40}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as HighYieldSpreadPoint;
                  return (
                    <div className={CHART_TOOLTIP_CLASS}>
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-2xl text-glory-gold">{p.value.toFixed(2)}%</p>
                      <p className="font-body text-xs text-white/50">{copy.valueLabel}</p>
                    </div>
                  );
                }}
              />
              <ReferenceLine
                x="2002-10"
                stroke="rgba(255,255,255,0.25)"
                strokeDasharray="3 3"
                label={{ value: copy.dotcom, position: "top", fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              />
              <ReferenceLine
                x="2008-10"
                stroke="rgba(255,255,255,0.25)"
                strokeDasharray="3 3"
                label={{ value: copy.gfc, position: "top", fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              />
              <ReferenceLine
                x="2020-03"
                stroke="rgba(255,255,255,0.25)"
                strokeDasharray="3 3"
                label={{ value: copy.covid, position: "top", fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={CHART_GOLD}
                strokeWidth={2}
                fill="url(#spreadGradient)"
                isAnimationActive
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 border-t border-white/10 pt-6">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">{latest.value.toFixed(2)}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.latest} ({latest.month}, prima de credit corporativ)
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
