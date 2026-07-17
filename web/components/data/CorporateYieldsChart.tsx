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
} from "recharts";
import { motion } from "framer-motion";
import {
  CHART_GOLD,
  CHART_RED,
  CHART_GRID,
  CHART_AXIS_LINE,
  CHART_TICK_MUTED,
  CHART_TOOLTIP_CLASS,
} from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { CorporateYieldPoint } from "@/lib/data/economy-data";

interface CorporateYieldsChartProps {
  data: CorporateYieldPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function CorporateYieldsChart({ data, title, subtitle, source }: CorporateYieldsChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
     ? {
         aaaLabel: "Randament Aaa (Calitate Superioară)",
         baaLabel: "Randament Baa (Calitate Medie)",
         source: "Sursă:",
         latest: "Cel mai recent",
       }
     : {
         aaaLabel: "Aaa Yield (High Quality)",
         baaLabel: "Baa Yield (Medium Quality)",
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
                ticks={["1970-01", "1980-01", "1990-01", "2000-01", "2010-01", "2020-01", "2026-06"]}
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
                  const p = payload[0].payload as CorporateYieldPoint;
                  return (
                    <div className={CHART_TOOLTIP_CLASS}>
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-xl text-glory-gold font-bold">
                        {p.aaa.toFixed(2)}%{" "}
                        <span className="font-body text-xs text-white/50">{copy.aaaLabel}</span>
                      </p>
                      <p className="font-hero text-xl text-[#f97316] font-bold mt-1">
                        {p.baa.toFixed(2)}%{" "}
                        <span className="font-body text-xs text-white/50">{copy.baaLabel}</span>
                      </p>
                    </div>
                  );
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (value === "aaa" ? copy.aaaLabel : copy.baaLabel)}
              />
              <Line
                type="monotone"
                dataKey="aaa"
                stroke={CHART_GOLD}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                isAnimationActive
              />
              <Line
                type="monotone"
                dataKey="baa"
                stroke="#f97316"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">{latest.aaa.toFixed(2)}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.aaaLabel} ({latest.month})
          </div>
        </div>
        <div>
          <div className="font-hero text-3xl text-[#f97316] md:text-4xl">{latest.baa.toFixed(2)}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.baaLabel} ({latest.month})
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
