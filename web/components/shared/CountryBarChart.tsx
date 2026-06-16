"use client";

// ─── CountryBarChart ──────────────────────────────────────────────────────────
// A clean, editorial horizontal bar ranking for country/state comparisons.
// The USA row is highlighted in gold. Bars animate their width on scroll-in.
// Borderless to match the editorial style of the Quality-of-Life pages.

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface BarDatum {
  label: string;
  value: number;
  /** Optional pre-formatted display string (e.g. "$71,300"); falls back to value + unit. */
  display?: string;
  isUS?: boolean;
}

interface CountryBarChartProps {
  title: string;
  subtitle?: string;
  source?: string;
  unit?: string;
  /** Pre-sorted (descending) data; keep to ~15 rows + the USA row for readability. */
  data: BarDatum[];
}

export function CountryBarChart({
  title,
  subtitle,
  source,
  unit = "",
  data,
}: CountryBarChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div ref={ref} className="border-t border-white/10 pt-6">
      <h3 className="font-display text-lg font-bold text-white">{title}</h3>
      {subtitle && (
        <p className="mt-1 text-sm text-white/45 leading-relaxed">{subtitle}</p>
      )}
      <div className="mt-6 space-y-2.5">
        {data.map((d, i) => {
          const pct = Math.max(2, (d.value / max) * 100);
          return (
            <div key={d.label} className="flex items-center gap-3">
              <div
                className={`w-28 shrink-0 truncate text-right text-xs sm:w-44 ${
                  d.isUS ? "font-bold text-[#E8B923]" : "text-white/55"
                }`}
              >
                {d.label}
              </div>
              <div className="relative h-6 flex-1 overflow-hidden rounded bg-white/[0.04]">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded"
                  style={{ background: d.isUS ? "#E8B923" : "rgba(255,255,255,0.16)" }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${pct}%` } : { width: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                />
              </div>
              <div
                className={`w-16 shrink-0 text-right font-mono text-xs tabular-nums ${
                  d.isUS ? "font-bold text-[#E8B923]" : "text-white/60"
                }`}
              >
                {d.display ?? `${d.value.toLocaleString("en-US")}${unit}`}
              </div>
            </div>
          );
        })}
      </div>
      {source && (
        <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-white/30">
          Source: {source}
        </p>
      )}
    </div>
  );
}
