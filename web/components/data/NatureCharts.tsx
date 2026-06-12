"use client";

// ─── Nature Charts ────────────────────────────────────────────────────────────
// Recharts-based visualizations for the Nature & Geography vertical.
//
// Key Patterns:
// - Continental Scale: Uses horizontal and vertical bar charts to compare US 
//   protected lands and species against global peers.
// - Highlight Logic: Colors the US-specific data in "Glory Gold" or "Glory Red"
//   to make the comparison immediate and intuitive.

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
  backgroundColor: "#0a0c0a",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "0px",
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
    <div className="border border-white/6 bg-[#0a0c0a]/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="mb-1 font-body text-sm font-semibold text-white">{label}</p>
      <p className="font-hero text-2xl" style={{ color: '#C4956A' }}>
        {payload[0].value.toFixed(1)}M
      </p>
      <p className="font-body text-xs text-white/40">Annual Visitors</p>
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
      <div className="h-75 w-full md:h-90">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
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
                fill: "rgba(255,255,255,0.7)",
                fontSize: 14,
                fontFamily: "var(--font-body)",
                fontWeight: 600,
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}M`}
            />
            <YAxis
              dataKey="park"
              type="category"
              tick={{
                fill: "rgba(255,255,255,0.9)",
                fontSize: 14,
                fontFamily: "var(--font-body)",
                fontWeight: 700,
              }}
              axisLine={false}
              tickLine={false}
              width={110}
            />
            <Tooltip
              content={<ParkTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar dataKey="visitors" radius={[0, 6, 6, 0]} maxBarSize={35} isAnimationActive={false}>
              {data.map((entry, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={entry.highlight ? "#C4956A" : "#1a1c1a"}
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
    <div className="border border-white/6 bg-[#0a0c0a]/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="mb-1 font-body text-sm font-semibold text-white">
        {item.payload.flag} {label}
      </p>
      <p className="font-hero text-2xl" style={{ color: '#4ade80' }}>
        {item.value.toLocaleString()}K
      </p>
      <p className="font-body text-xs text-white/40">Known species (thousands)</p>
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
      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
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
                fill: "rgba(255,255,255,0.8)",
                fontSize: 13,
                fontFamily: "var(--font-body)",
                fontWeight: 600,
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
                fill: "rgba(255,255,255,0.6)",
                fontSize: 13,
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
            <Bar dataKey="species" radius={[6, 6, 0, 0]} maxBarSize={65} isAnimationActive={false}>
              {data.map((entry, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={entry.highlight ? "#4ade80" : "#1a1c1a"}
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
    <div className="border border-white/6 bg-(--nat-void,#030504)/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
      <p className="nat-text-metadata text-white mb-1">
        Lake {label}
      </p>
      <p className="font-hero text-3xl" style={{ color: 'var(--nat-accent-glacier)' }}>
        {item.value.toLocaleString()} mi³
      </p>
      <p className="nat-text-metadata text-white/50 mt-1">Volume (cubic miles)</p>
      <p className="nat-text-metadata text-white/40 mt-1">
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
        <div className="mb-8">
          {title && (
            <h3 className="nat-text-section text-white">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="nat-text-body mt-4">{subtitle}</p>
          )}
        </div>
      )}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
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
                fill: "rgba(255,255,255,0.9)",
                fontSize: 14,
                fontFamily: "var(--font-body)",
                fontWeight: 700,
              }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
            />
            <YAxis
              tick={{
                fill: "rgba(255,255,255,0.6)",
                fontSize: 13,
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
            <Bar dataKey="volume" radius={[6, 6, 0, 0]} maxBarSize={70} isAnimationActive={false}>
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
