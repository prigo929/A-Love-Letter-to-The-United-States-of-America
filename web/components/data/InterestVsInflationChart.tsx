"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { motion } from "framer-motion";
import { CHART_GOLD, CHART_RED, CHART_GRID, CHART_AXIS_LINE, CHART_TICK_MUTED, CHART_TOOLTIP_CLASS, curveFor, CHART_ANIM_MS } from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { InterestVsInflationPoint } from "@/lib/data/economy-data";

interface InterestVsInflationChartProps {
  data: InterestVsInflationPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function InterestVsInflationChart({ data, title, subtitle, source }: InterestVsInflationChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
     ? {
         rateLabel: "Dobândă Fed Funds",
         inflationLabel: "Inflație YoY CPI",
         source: "Sursă:",
         latest: "Cel mai recent",
         volcker: "Volcker Shock (1981)",
         pandemic: "Pandemic Shock",
       }
     : {
         rateLabel: "Fed Funds Rate",
         inflationLabel: "YoY CPI Inflation",
         source: "Source:",
         latest: "Latest",
         volcker: "Volcker Shock (1981)",
         pandemic: "Pandemic Shock",
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

      <LazyChart height={360}>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <LineChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
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
                width={40}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as InterestVsInflationPoint;
                  return (
                    <div className={CHART_TOOLTIP_CLASS}>
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-xl text-glory-gold font-bold">
                        {p.rate.toFixed(2)}%{" "}
                        <span className="font-body text-xs text-white/50">{copy.rateLabel}</span>
                      </p>
                      <p className="font-hero text-xl text-[#ef4444] font-bold mt-1">
                        {p.inflation.toFixed(2)}%{" "}
                        <span className="font-body text-xs text-white/50">{copy.inflationLabel}</span>
                      </p>
                    </div>
                  );
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (value === "rate" ? copy.rateLabel : copy.inflationLabel)}
              />
              <ReferenceLine
                x="1981-06"
                stroke="rgba(255,255,255,0.25)"
                strokeDasharray="3 3"
                label={{ value: copy.volcker, position: "top", fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              />
              <ReferenceLine
                x="2020-04"
                stroke="rgba(255,255,255,0.25)"
                strokeDasharray="3 3"
                label={{ value: copy.pandemic, position: "top", fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              />
              <Line
                type={curveFor(data.length)}
                dataKey="rate"
                stroke={CHART_GOLD}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                isAnimationActive animationDuration={CHART_ANIM_MS}
              />
              <Line
                type={curveFor(data.length)}
                dataKey="inflation"
                stroke={CHART_RED}
                strokeWidth={1.8}
                dot={false}
                activeDot={{ r: 4 }}
                isAnimationActive animationDuration={CHART_ANIM_MS}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">{latest.rate.toFixed(2)}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.rateLabel} ({latest.month})
          </div>
        </div>
        <div>
          <div className="font-hero text-3xl text-[#ef4444] md:text-4xl">{latest.inflation.toFixed(2)}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.inflationLabel} ({latest.month})
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
