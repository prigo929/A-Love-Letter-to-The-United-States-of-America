"use client";

// ─── Nature Charts ────────────────────────────────────────────────────────────
// Three Recharts chart components for the Nature section.
// All are client components (Recharts requirement).
// Exports: ParkVisitorsChart, BiodiversityChart, GreatLakesChart

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import type {
  ParkVisitorData,
  BiodiversityData,
  GreatLakeData,
} from "@/lib/data/nature-data";

// ─── Shared tooltip style ─────────────────────────────────────────────────────

const tooltipStyle = {
  backgroundColor: "#0d1117",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "12px",
  fontFamily: "var(--font-body)",
  color: "#fff",
  fontSize: "13px",
};

// ─── Park Visitors Chart ──────────────────────────────────────────────────────

interface ParkChartProps {
  data: ParkVisitorData[];
  title?: string;
  subtitle?: string;
  source?: string;
}

function ParkTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: ParkVisitorData }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="mb-1 font-body text-sm font-semibold text-white">{label}</p>
      <p className="font-hero text-2xl text-glory-gold">
        {payload[0].value.toFixed(1)}M
      </p>
      <p className="font-body text-xs text-white/50">Annual Visitors</p>
    </div>
  );
}

export function ParkVisitorsChart({
  data,
  title,
  subtitle,
  source,
}: ParkChartProps) {
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
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
            barCategoryGap="25%"
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
              tickFormatter={(v) => `${v}M`}
            />
            <YAxis
              dataKey="park"
              type="category"
              tick={{
                fill: "rgba(255,255,255,0.65)",
                fontSize: 11,
                fontFamily: "var(--font-body)",
              }}
              axisLine={false}
              tickLine={false}
              width={150}
            />
            <Tooltip
              content={<ParkTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar dataKey="visitors" radius={[0, 6, 6, 0]} maxBarSize={28}>
              {data.map((entry, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={entry.highlight ? "#FFD700" : "#3C3B6E"}
                  opacity={entry.highlight ? 1 : 0.8}
                />
              ))}
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

// ─── Biodiversity Chart ───────────────────────────────────────────────────────

interface BiodiversityChartProps {
  data: BiodiversityData[];
  title?: string;
  subtitle?: string;
  source?: string;
}

function BiodiversityTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: BiodiversityData }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="mb-1 font-body text-sm font-semibold text-white">
        {item.payload.flag} {label}
      </p>
      <p className="font-hero text-2xl text-glory-gold">
        {item.value.toLocaleString()}K
      </p>
      <p className="font-body text-xs text-white/50">Known species (thousands)</p>
    </div>
  );
}

export function BiodiversityChart({
  data,
  title,
  subtitle,
  source,
}: BiodiversityChartProps) {
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
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 10, bottom: 60 }}
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
              tickFormatter={(v) => `${v}K`}
            />
            <Tooltip
              content={<BiodiversityTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar dataKey="species" radius={[6, 6, 0, 0]} maxBarSize={55}>
              {data.map((entry, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={entry.highlight ? "#B22234" : "#3C3B6E"}
                  opacity={entry.highlight ? 1 : 0.72}
                />
              ))}
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

// ─── Great Lakes Chart ────────────────────────────────────────────────────────

interface GreatLakesChartProps {
  data: GreatLakeData[];
  title?: string;
  subtitle?: string;
  source?: string;
}

function LakesTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: GreatLakeData }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="mb-1 font-body text-sm font-semibold text-white">
        Lake {label}
      </p>
      <p className="font-hero text-xl text-glory-gold">
        {item.value.toLocaleString()} mi³
      </p>
      <p className="font-body text-xs text-white/50">Volume (cubic miles)</p>
      <p className="font-body text-xs text-white/40 mt-1">
        Area: {item.payload.area.toLocaleString()} mi² · Depth: {item.payload.maxDepth} ft
      </p>
    </div>
  );
}

export function GreatLakesChart({
  data,
  title,
  subtitle,
  source,
}: GreatLakesChartProps) {
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
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
            barCategoryGap="30%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />
            <XAxis
              dataKey="lake"
              tick={{
                fill: "rgba(255,255,255,0.6)",
                fontSize: 12,
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
              tickFormatter={(v) => `${v} mi³`}
            />
            <Tooltip
              content={<LakesTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar dataKey="volume" radius={[6, 6, 0, 0]} maxBarSize={60}>
              {data.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={entry.color} opacity={0.9} />
              ))}
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
