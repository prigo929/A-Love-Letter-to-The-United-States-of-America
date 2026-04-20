"use client";

// ─── S&P 500 Historical Line Chart ───────────────────────────────────────────
// Shows 45 years of S&P 500 performance with Recharts.
// Annotates key events (dot-com bust, financial crisis, recovery).
// Client component (Recharts requirement).

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
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { SP500DataPoint } from "@/lib/data/economy-data";

interface SP500ChartProps {
  data: SP500DataPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="mb-1 font-body text-xs text-white/50">Year {label}</p>
      <p className="font-hero text-2xl text-glory-gold">
        {payload[0].value.toLocaleString()}
      </p>
      <p className="font-body text-xs text-white/50">S&P 500 Index Level</p>
    </div>
  );
}

export function SP500Chart({ data, title, subtitle, source }: SP500ChartProps) {
  const { locale } = useLanguage();
  const copy =
    locale === "ro"
      ? {
          yearPrefix: "Anul",
          indexLevel: "Nivelul indicelui S&P 500",
          dotCom: "Dot-com",
          gfc: "Criza Financiară",
          totalReturn: "Randament total 1980 → 2024",
          annualReturn: "Randament mediu anual",
          source: "Sursă:",
        }
      : {
          yearPrefix: "Year",
          indexLevel: "S&P 500 Index Level",
          dotCom: "Dot-com",
          gfc: "GFC",
          totalReturn: "1980 → 2024 Total Return",
          annualReturn: "Annual Average Return",
          source: "Source:",
        };

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

      <div className="h-[300px] w-full md:h-[360px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart
            data={data}
            margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="sp500Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B22234" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#B22234" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              tick={{
                fill: "rgba(255,255,255,0.45)",
                fontSize: 11,
                fontFamily: "var(--font-body)",
              }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
            />
            <YAxis
              tick={{
                fill: "rgba(255,255,255,0.4)",
                fontSize: 11,
                fontFamily: "var(--font-body)",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v
              }
            />
            <Tooltip
              content={(props) => {
                if (!props.active || !props.payload?.length) return null;
                return (
                  <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
                    <p className="mb-1 font-body text-xs text-white/50">
                      {copy.yearPrefix} {props.label}
                    </p>
                    <p className="font-hero text-2xl text-glory-gold">
                      {props.payload[0].value?.toLocaleString()}
                    </p>
                    <p className="font-body text-xs text-white/50">
                      {copy.indexLevel}
                    </p>
                  </div>
                );
              }}
            />

            {/* Annotation lines */}
            <ReferenceLine
              x={2002}
              stroke="rgba(255,255,255,0.2)"
              strokeDasharray="4 4"
              label={{
                value: copy.dotCom,
                fill: "rgba(255,255,255,0.35)",
                fontSize: 10,
                fontFamily: "var(--font-body)",
              }}
            />
            <ReferenceLine
              x={2009}
              stroke="rgba(255,255,255,0.2)"
              strokeDasharray="4 4"
              label={{
                value: copy.gfc,
                fill: "rgba(255,255,255,0.35)",
                fontSize: 10,
                fontFamily: "var(--font-body)",
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#B22234"
              strokeWidth={2.5}
              fill="url(#sp500Gradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#FFD700",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Return callout */}
      <div className="mt-4 flex flex-wrap gap-4">
        <div className="rounded-lg border border-glory-gold/20 bg-glory-gold/8 px-4 py-2.5">
          <p className="font-body text-xs text-white/50">
            {copy.totalReturn}
          </p>
          <p className="font-hero text-xl text-glory-gold">+3,915%</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5">
          <p className="font-body text-xs text-white/50">
            {copy.annualReturn}
          </p>
          <p className="font-hero text-xl text-white">~10.5%</p>
        </div>
      </div>

      {source && (
        <p className="mt-3 text-right font-body text-xs text-white/30">
          {copy.source} {source}
        </p>
      )}
    </motion.div>
  );
}
