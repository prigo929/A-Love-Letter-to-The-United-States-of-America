"use client";

// ─── QuarterlySeriesChart — one quarterly dollar series, plotted ─────────────
// R&D investment and corporate profits are the same shape of thing: a single
// current-dollar figure per quarter since 1947, whose story is the growth. Rather
// than two near-identical chart files, callers normalise to {q, v} and pass their
// own labels. Anything with a genuinely different reading (a toggle, a second
// band, reference lines that carry meaning) should get its own component instead.

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
import { CHART_GOLD } from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";

export interface QuarterlyPoint { q: string; v: number; }

interface QuarterlySeriesChartProps {
  data: QuarterlyPoint[];
  /** Already-localised label for the value, e.g. "R&D investment, annual rate". */
  valueLabel: string;
  title?: string;
  subtitle?: string;
  source?: string;
  /** Localised caption for the headline stat (the latest value). */
  latestLabel: string;
  /** Localised caption for the growth multiple since the series began. */
  multipleLabel: string;
  /** Optional annotations, x = "YYYY-MM" present in the data. */
  markers?: { x: string; label: string }[];
  gradientId: string;
}

const fmtUsd = (b: number) =>
  b >= 1000 ? `$${(b / 1000).toFixed(2)}T` : b >= 1 ? `$${b.toFixed(0)}B` : `$${(b * 1000).toFixed(0)}M`;

export function QuarterlySeriesChart({
  data,
  valueLabel,
  title,
  subtitle,
  source,
  latestLabel,
  multipleLabel,
  markers = [],
  gradientId,
}: QuarterlySeriesChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const sourceWord = ro ? "Sursă:" : "Source:";

  const first = data[0];
  const latest = data[data.length - 1];
  const multiple = first && first.v > 0 ? latest.v / first.v : 0;

  // Six evenly spaced ticks from the actual data, so a tick is never dropped for
  // naming a quarter the series doesn't contain.
  const ticks = Array.from({ length: 6 }, (_, i) =>
    data[Math.round((i / 5) * (data.length - 1))]?.q
  ).filter(Boolean) as string[];

  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="w-full">
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="font-display text-xl font-semibold text-white md:text-2xl">{title}</h3>}
          {subtitle && <p className="mt-1 font-body text-sm text-white/55">{subtitle}</p>}
        </div>
      )}

      <LazyChart height={380}>
        <div className="h-[320px] w-full md:h-[380px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <AreaChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_GOLD} stopOpacity={0.42} />
                  <stop offset="95%" stopColor={CHART_GOLD} stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="q"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                ticks={ticks}
                tickFormatter={(q: string) => String(q).slice(0, 4)}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(1)}T` : `$${v}B`)}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-2xl text-glory-gold">{fmtUsd(payload[0].value as number)}</p>
                      <p className="font-body text-xs text-white/50">{valueLabel}</p>
                    </div>
                  );
                }}
              />

              {markers.map((m) => (
                <ReferenceLine key={m.x} x={m.x} stroke="rgba(255,255,255,0.25)" strokeDasharray="3 3"
                  label={{ value: m.label, position: "top", fill: "rgba(255,255,255,0.45)", fontSize: 10 }} />
              ))}

              <Area type="monotone" dataKey="v" stroke={CHART_GOLD} strokeWidth={1.7} fill={`url(#${gradientId})`} isAnimationActive animationDuration={1400} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">{fmtUsd(latest.v)}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{latestLabel}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{Math.round(multiple)}×</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{multipleLabel}</div>
        </div>
      </div>

      {source && <p className="mt-4 text-right font-body text-xs text-white/30">{sourceWord} {source}</p>}
    </motion.div>
  );
}
