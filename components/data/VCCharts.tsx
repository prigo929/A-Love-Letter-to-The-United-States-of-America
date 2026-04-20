"use client";

// ─── VC Investment & Unicorn Charts ─────────────────────────────────────────
// Two charts: VC investment by country (bar) + unicorn distribution (pie).
// Client component (Recharts).

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { VCDataPoint, UnicornDataPoint } from "@/lib/data/economy-data";

// ─── VC Bar Chart ─────────────────────────────────────────────────────────────

interface VCBarChartProps {
  data: VCDataPoint[];
  title?: string;
  source?: string;
}

function VCTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: VCDataPoint }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="mb-1 font-body text-sm font-semibold text-white">{label}</p>
      <p className="font-hero text-2xl text-glory-gold">${item.value}B</p>
      <p className="font-body text-xs text-white/50">
        {item.payload.percentage}% of global VC
      </p>
    </div>
  );
}

export function VCBarChart({ data, title, source }: VCBarChartProps) {
  const { locale } = useLanguage();
  const ofGlobalLabel =
    locale === "ro" ? "din venture capitalul global" : "of global VC";
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

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 10, bottom: 60 }}
            barCategoryGap="35%"
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
                fontSize: 10,
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
              tickFormatter={(v) => `$${v}B`}
            />
            <Tooltip
              content={(props) => {
                if (!props.active || !props.payload?.length) return null;
                const item = props.payload[0];
                return (
                  <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
                    <p className="mb-1 font-body text-sm font-semibold text-white">
                      {props.label}
                    </p>
                    <p className="font-hero text-2xl text-glory-gold">
                      ${item.value}B
                    </p>
                    <p className="font-body text-xs text-white/50">
                      {item.payload.percentage}% {ofGlobalLabel}
                    </p>
                  </div>
                );
              }}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar dataKey="investment" radius={[5, 5, 0, 0]} maxBarSize={55}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.highlight ? "#FFD700" : "#3C3B6E"}
                  opacity={entry.highlight ? 1 : 0.7}
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

// ─── Unicorn Pie Chart ────────────────────────────────────────────────────────

interface UnicornPieChartProps {
  data: UnicornDataPoint[];
  title?: string;
  source?: string;
}

const PIE_COLORS = [
  "#FFD700",
  "#B22234",
  "#3C3B6E",
  "#5554A0",
  "#8B1A26",
  "#5B8CFF",
  "#374151",
];

function UnicornLegend({
  data,
  locale,
}: {
  data: UnicornDataPoint[];
  locale: "en" | "ro";
}) {
  const unicornLabel = locale === "ro" ? "unicorni" : "unicorns";

  return (
    <ul className="grid gap-2 pt-5 sm:grid-cols-2">
      {data.map((entry, index) => (
        <li
          key={entry.country}
          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2"
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
            />
            <span className="font-body text-xs font-medium text-white/70">
              {entry.country}
            </span>
          </div>
          <div className="text-right">
            <p className="font-body text-xs font-semibold text-white">
              {entry.unicorns} {unicornLabel}
            </p>
            <p className="font-body text-[11px] text-glory-gold">
              {entry.percentage}%
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function UnicornTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; payload: UnicornDataPoint }>;
}) {
  const { locale } = useLanguage();

  if (!active || !payload?.length) return null;

  const item = payload[0];
  const shareLabel = locale === "ro" ? "din totalul global" : "of global total";
  const unicornLabel = locale === "ro" ? "unicorni" : "unicorns";

  return (
    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="mb-1 font-body text-sm font-semibold text-white">
        {item.name}
      </p>
      <p className="font-hero text-2xl text-glory-gold">
        {item.value} {unicornLabel}
      </p>
      <p className="font-body text-xs text-white/50">
        {item.payload.percentage}% {shareLabel}
      </p>
    </div>
  );
}

export function UnicornPieChart({ data, title, source }: UnicornPieChartProps) {
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

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="unicorns"
              nameKey="country"
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={112}
              paddingAngle={2}
              label={false}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<UnicornTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <UnicornLegend data={data} locale={locale} />

      {source && (
        <p className="mt-3 text-right font-body text-xs text-white/30">
          {sourceLabel} {source}
        </p>
      )}
    </motion.div>
  );
}
