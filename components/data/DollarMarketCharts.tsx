"use client";

// ─── Dollar Reserve & Market Cap Charts ──────────────────────────────────────
// DollarReserveChart: pie chart of global FX reserve composition.
// MarketCapChart: bar chart of stock exchange market caps.
// Both client components for Recharts.

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type {
  DollarReservePoint,
  MarketCapPoint,
} from "@/lib/data/economy-data";

// ─── Dollar Reserve Pie Chart ─────────────────────────────────────────────────

interface DollarReserveChartProps {
  data: DollarReservePoint[];
  title?: string;
  source?: string;
}

function ReserveLegend({ data }: { data: DollarReservePoint[] }) {
  return (
    <ul className="mt-6 space-y-2">
      {data.map((entry, i) => (
        <li key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-body text-sm text-white/70">
              {entry.currency}
            </span>
          </div>
          <span className="font-hero text-base" style={{ color: entry.color }}>
            {entry.percentage}%
          </span>
        </li>
      ))}
    </ul>
  );
}

export function DollarReserveChart({
  data,
  title,
  source,
}: DollarReserveChartProps) {
  const { locale } = useLanguage();
  const sourceLabel = locale === "ro" ? "Sursă:" : "Source:";
  const usdReserve =
    data.find((entry) => entry.currency.includes("US Dollar")) ?? data[0];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="w-full"
    >
      {title && (
        <h3 className="mb-6 font-display text-xl font-semibold text-white md:text-2xl">
          {title}
        </h3>
      )}

      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        {/* Pie */}
        <div className="h-65 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <PieChart>
              <Pie
                data={data}
                dataKey="percentage"
                nameKey="currency"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={105}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {/* Center label */}
              <text
                x="50%"
                y="46%"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <tspan
                  x="50%"
                  dy="0"
                  fontSize="28"
                  fontFamily="var(--font-hero)"
                  fill="#FFD700"
                >
                  {usdReserve ? `${usdReserve.percentage.toFixed(1)}%` : "N/A"}
                </tspan>
                <tspan
                  x="50%"
                  dy="20"
                  fontSize="11"
                  fontFamily="var(--font-body)"
                  fill="rgba(255,255,255,0.5)"
                >
                  USD
                </tspan>
              </text>
              <Tooltip
                formatter={(value: any, name: any) => [`${value}%`, name]}
                contentStyle={{
                  backgroundColor: "#0d1117",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "12px",
                  fontFamily: "var(--font-body)",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div>
          <ReserveLegend data={data} />
        </div>
      </div>

      {source && (
        <p className="mt-4 text-right font-body text-xs text-white/30">
          {sourceLabel} {source}
        </p>
      )}
    </motion.div>
  );
}

// ─── Market Cap Bar Chart ─────────────────────────────────────────────────────

interface MarketCapChartProps {
  data: MarketCapPoint[];
  title?: string;
  source?: string;
}

function MarketCapTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: MarketCapPoint }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="mb-1 font-body text-sm font-semibold text-white">{label}</p>
      <p className="font-hero text-2xl text-glory-gold">
        ${item.value.toFixed(1)}T
      </p>
      <p className="font-body text-xs text-white/50">{item.payload.country}</p>
    </div>
  );
}

export function MarketCapChart({ data, title, source }: MarketCapChartProps) {
  const { locale } = useLanguage();
  const sourceLabel = locale === "ro" ? "Sursă:" : "Source:";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="w-full"
    >
      {title && (
        <h3 className="mb-6 font-display text-xl font-semibold text-white md:text-2xl">
          {title}
        </h3>
      )}

      <div className="h-70 w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{
                fill: "rgba(255,255,255,0.4)",
                fontSize: 11,
                fontFamily: "var(--font-body)",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}T`}
            />
            <YAxis
              dataKey="exchange"
              type="category"
              tick={{
                fill: "rgba(255,255,255,0.6)",
                fontSize: 12,
                fontFamily: "var(--font-body)",
              }}
              axisLine={false}
              tickLine={false}
              width={90}
            />
            <Tooltip
              content={<MarketCapTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar dataKey="marketCap" radius={[0, 6, 6, 0]} maxBarSize={30}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.highlight ? "#FFD700" : "#3C3B6E"}
                  opacity={entry.highlight ? 1 : 0.72}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {source && (
        <p className="mt-3 text-right font-body text-xs text-white/30">
          {sourceLabel} {source}
        </p>
      )}
    </motion.div>
  );
}
