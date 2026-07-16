"use client";

// ─── GDP Bar Chart ────────────────────────────────────────────────────────────
// A specialized Recharts bar chart designed for economic comparisons.
//
// Features:
// - Highlight Logic: Automatically colors the "US" bar in gold to drive the 
//   narrative of American leadership.
// - Scalable Units: Supports trillions (GDP) or thousands (Per Capita) using `valueSuffix`.
// - Multilingual Tooltips: Integrates with the site's i18n system.
//
// Beginner guide:
// - This component only draws the chart
// - The actual numbers come from the page or data file that calls it
// - `valueSuffix` lets the same chart work for trillions ("T") or thousands ("K")

import { useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { motion, useInView } from "framer-motion";
import { CHART_GOLD, CHART_NAVY } from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { GdpDataPoint } from "@/lib/data/economy-data";

interface GdpBarChartProps {
  data: GdpDataPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
  valueSuffix?: string;
  /** Axis label, already localised by the caller. REQUIRED on purpose: this used
   *  to default to "GDP (2024, USD Trillions)", which silently mislabelled five
   *  charts (including SIPRI defence spending in USD billions). A default that
   *  asserts a year and a metric can always go stale — so the caller must say. */
  valueLabel: string;
  valuePrefix?: string;
  valueDecimals?: number;
}

// ── Custom Tooltip ─────────────────────────────────────────────────────────────
// This controls the small popup shown when the user hovers a bar.

function CustomTooltip({
  active,
  payload,
  label,
  valueSuffix,
  valueLabel,
  valuePrefix,
  valueDecimals,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: GdpDataPoint }>;
  label?: string;
  valueSuffix: string;
  valueLabel: string;
  valuePrefix: string;
  valueDecimals: number;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];

  return (
    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="mb-1 font-body text-sm font-semibold text-white">
        {item.payload.flag} {label}
      </p>
      <p className="font-hero text-2xl text-glory-gold">
        {valuePrefix}{item.value.toFixed(valueDecimals)}
        {valueSuffix}
      </p>
      <p className="font-body text-xs text-white/50">{valueLabel}</p>
    </div>
  );
}

// ── Custom Bar Label ───────────────────────────────────────────────────────────
// This prints the number above each bar.

function CustomLabel(props: {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
  index?: number;
  valueSuffix?: string;
  valuePrefix?: string;
  valueDecimals?: number;
}) {
  const { x = 0, y = 0, width = 0, value = 0, index = 0, valueSuffix = "T", valuePrefix = "$", valueDecimals = 1 } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 8}
      fill={CHART_GOLD}
      textAnchor="middle"
      fontSize={12}
      fontWeight={700}
      fontFamily="var(--font-hero)"
      letterSpacing="0.05em"
      style={{
        opacity: 0,
        animation: "chartLabelFadeIn 0.8s ease-out forwards",
        animationDelay: `${0.1 + index * 0.05}s`, // Starts 100ms after the bar begins rising
      }}
    >
      {valuePrefix}{value.toFixed(valueDecimals)}
      {valueSuffix}
    </text>
  );
}

export function GdpBarChart({
  data,
  title,
  subtitle,
  source,
  valueSuffix = "T",
  valueLabel,
  valuePrefix = "$",
  valueDecimals = 1,
}: GdpBarChartProps) {
  const { locale } = useLanguage();
  // Callers pass an already-localised label; no string-matching translation here
  // (matching on the exact English string silently broke whenever it changed).
  const localizedValueLabel = valueLabel;
  const sourceLabel = locale === "ro" ? "Sursă:" : "Source:";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="w-full"
    >
      <style jsx global>{`
        @keyframes chartLabelFadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 font-body text-sm text-white/55">{subtitle}</p>
          )}
        </div>
      )}

      <LazyChart height={400}>
        <div className="h-80 w-full md:h-96">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <BarChart
              data={data}
              margin={{ top: 30, right: 20, left: 10, bottom: 60 }}
              barCategoryGap="30%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.07)"
                vertical={false}
              />
              <XAxis
                dataKey="country"
                tick={{
                  fill: "rgba(255,255,255,0.7)",
                  fontSize: 13,
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
                angle={-35}
                textAnchor="end"
                interval={0}
                height={80}
              />
              <YAxis
                tick={{
                  fill: "rgba(255,255,255,0.5)",
                  fontSize: 13,
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${valuePrefix}${v}${valueSuffix}`}
              />
              <Tooltip
                content={
                  <CustomTooltip
                    valueSuffix={valueSuffix}
                    valueLabel={localizedValueLabel}
                    valuePrefix={valuePrefix}
                    valueDecimals={valueDecimals}
                  />
                }
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
              />
              <Bar
                dataKey="gdp"
                radius={[6, 6, 0, 0]}
                maxBarSize={60}
                isAnimationActive={true}
                animationDuration={900}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.highlight ? CHART_GOLD : CHART_NAVY}
                    opacity={entry.highlight ? 1 : 0.75}
                  />
                ))}
                <LabelList content={<CustomLabel valueSuffix={valueSuffix} valuePrefix={valuePrefix} valueDecimals={valueDecimals} />} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      {source && (
        <p className="mt-3 text-right font-body text-xs text-white/30">
          {sourceLabel} {source}
        </p>
      )}
    </motion.div>
  );
}
