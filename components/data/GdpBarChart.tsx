"use client";

// ─── GDP Bar Chart ────────────────────────────────────────────────────────────
// Recharts bar chart comparing GDP across major economies.
// Highlights the US bar in glory-gold. Client component (Recharts requirement).
//
// Beginner guide:
// - This component only draws the chart
// - The actual numbers come from the page or data file that calls it
// - `valueSuffix` lets the same chart work for trillions ("T") or thousands ("K")

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
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import type { GdpDataPoint } from "@/lib/data/economy-data";

interface GdpBarChartProps {
  data: GdpDataPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
  valueSuffix?: string;
  valueLabel?: string;
}

// ── Custom Tooltip ─────────────────────────────────────────────────────────────
// This controls the small popup shown when the user hovers a bar.

function CustomTooltip({
  active,
  payload,
  label,
  valueSuffix,
  valueLabel,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: GdpDataPoint }>;
  label?: string;
  valueSuffix: string;
  valueLabel: string;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];

  return (
    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="mb-1 font-body text-sm font-semibold text-white">
        {item.payload.flag} {label}
      </p>
      <p className="font-hero text-2xl text-glory-gold">
        ${item.value.toFixed(1)}
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
}) {
  const { x = 0, y = 0, width = 0, value = 0, valueSuffix = "T" } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 8}
      fill="#FFD700"
      textAnchor="middle"
      fontSize={11}
      fontFamily="var(--font-hero)"
      letterSpacing="0.05em"
    >
      ${value.toFixed(1)}
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
  valueLabel = "GDP (2024, USD Trillions)",
}: GdpBarChartProps) {
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
            <p className="mt-1 font-body text-sm text-white/55">{subtitle}</p>
          )}
        </div>
      )}

      <div className="h-[320px] w-full md:h-[380px]">
        {/* ResponsiveContainer makes the chart fill the available width/height. */}
        <ResponsiveContainer width="100%" height="100%">
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
                fill: "rgba(255,255,255,0.55)",
                fontSize: 11,
                fontFamily: "var(--font-body)",
              }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              tick={{
                fill: "rgba(255,255,255,0.4)",
                fontSize: 11,
                fontFamily: "var(--font-body)",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}${valueSuffix}`}
            />
            <Tooltip
              content={
                <CustomTooltip
                  valueSuffix={valueSuffix}
                  valueLabel={valueLabel}
                />
              }
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            {/* `dataKey="gdp"` tells Recharts which property in each data item
                should be used for the bar heights. */}
            <Bar dataKey="gdp" radius={[6, 6, 0, 0]} maxBarSize={60}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.highlight ? "#FFD700" : "#3C3B6E"}
                  opacity={entry.highlight ? 1 : 0.75}
                />
              ))}
              <LabelList content={<CustomLabel valueSuffix={valueSuffix} />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {source && (
        <p className="mt-3 text-right font-body text-xs text-white/30">
          Source: {source}
        </p>
      )}
    </motion.div>
  );
}
