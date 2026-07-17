"use client";

import {
  ComposedChart,
  Bar,
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
  CHART_GRID,
  CHART_AXIS_LINE,
  CHART_TICK_MUTED,
  CHART_TOOLTIP_CLASS,
} from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { VcDealActivityPoint } from "@/lib/data/economy-data";

interface VcDealCountVolumeChartProps {
  data: VcDealActivityPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function VcDealCountVolumeChart({ data, title, subtitle, source }: VcDealCountVolumeChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
     ? {
         valueLabel: "Valoare Tranzacții (miliarde USD)",
         countLabel: "Număr Tranzacții",
         source: "Sursă:",
         latest: "Cel mai recent",
       }
     : {
         valueLabel: "Deal Value (USD Billions)",
         countLabel: "Deal Count",
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
            <ComposedChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} vertical={false} />
              <XAxis
                dataKey="year"
                tick={CHART_TICK_MUTED}
                axisLine={{ stroke: CHART_AXIS_LINE }}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={CHART_TICK_MUTED}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}B`}
                width={40}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={CHART_TICK_MUTED}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
                width={40}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as VcDealActivityPoint;
                  return (
                    <div className={CHART_TOOLTIP_CLASS}>
                      <p className="mb-2 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-xl text-glory-gold font-bold">
                        ${p.value.toFixed(1)}B <span className="font-body text-xs text-white/50">{locale === "ro" ? "Valoare" : "Capital"}</span>
                      </p>
                      <p className="font-hero text-xl text-[#60A5FA] font-bold mt-1">
                        {p.count.toLocaleString()} <span className="font-body text-xs text-white/50">{locale === "ro" ? "Tranzacții" : "Deals"}</span>
                      </p>
                    </div>
                  );
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (value === "value" ? copy.valueLabel : copy.countLabel)}
              />
              <Bar yAxisId="left" dataKey="value" fill={CHART_GOLD} opacity={0.9} barSize={28} isAnimationActive />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="count"
                stroke="#60A5FA"
                strokeWidth={2.2}
                dot={false}
                activeDot={{ r: 4 }}
                isAnimationActive
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">${latest.value.toFixed(1)}B</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.valueLabel} ({latest.year})
          </div>
        </div>
        <div>
          <div className="font-hero text-3xl text-[#60A5FA] md:text-4xl">{latest.count.toLocaleString()}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.countLabel} ({latest.year})
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
