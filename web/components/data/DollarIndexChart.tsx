"use client";

// ─── DollarIndexChart: what the dollar is actually worth ────────────────────
// The Fed's nominal broad dollar index: the dollar against a trade-weighted
// basket of the currencies America actually trades with, monthly since the index
// was set to 100 in January 2006.
//
// This chart exists to keep the page honest. The section above it shows the
// dollar's share of global reserves falling from ~71% to ~57%, which reads like
// decline. This one shows the other half: the dollar's exchange value is near the
// top of its twenty-year range. Both are true, and they are not in tension: a
// smaller share of a much larger pool of reserves, at a higher price.
//
// The 100 line is drawn because it is the index's own definition, not a judgement:
// above it, the dollar buys more than it did in 2006.

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
import { CHART_GOLD, CHART_ANIM_MS, curveFor } from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { DollarIndexPoint } from "@/lib/data/economy-data";

interface DollarIndexChartProps {
  data: DollarIndexPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function DollarIndexChart({ data, title, subtitle, source }: DollarIndexChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
    ? {
        indexLabel: "Indicele dolarului (ian. 2006 = 100)",
        baseline: "100: nivelul din 2006",
        gfc: "Criza 2008",
        covid: "COVID",
        peakLabel: "Maximul intervalului: ianuarie 2025",
        lowLabel: "Minimul intervalului: iulie 2011",
        latestLabel: "Astăzi",
        source: "Sursă:",
      }
    : {
        indexLabel: "Dollar index (Jan 2006 = 100)",
        baseline: "100: the 2006 level",
        gfc: "2008 crisis",
        covid: "COVID",
        peakLabel: "Range high: January 2025",
        lowLabel: "Range low: July 2011",
        latestLabel: "Today",
        source: "Source:",
      };

  const peak = data.reduce((a, b) => (b.index > a.index ? b : a), data[0]);
  const low = data.reduce((a, b) => (b.index < a.index ? b : a), data[0]);
  const latest = data[data.length - 1];

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
                <linearGradient id="dxyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_GOLD} stopOpacity={0.42} />
                  <stop offset="95%" stopColor={CHART_GOLD} stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                ticks={["2006-01", "2008-10", "2011-07", "2015-01", "2020-03", "2025-01", "2026-06"]}
                tickFormatter={(m: string) => String(m).slice(0, 4)}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={false}
                domain={[80, 135]}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-2xl text-glory-gold">{(payload[0].value as number).toFixed(1)}</p>
                      <p className="font-body text-xs text-white/50">{copy.indexLabel}</p>
                    </div>
                  );
                }}
              />

              {/* The index's own baseline: above this, the dollar buys more than in 2006 */}
              <ReferenceLine y={100} stroke="rgba(255,255,255,0.4)" strokeDasharray="5 5"
                label={{ value: copy.baseline, position: "insideBottomLeft", fill: "rgba(255,255,255,0.5)", fontSize: 10 }} />
              {[{ x: "2008-10", l: copy.gfc }, { x: "2020-03", l: copy.covid }].map((m) => (
                <ReferenceLine key={m.x} x={m.x} stroke="rgba(255,255,255,0.22)" strokeDasharray="3 3"
                  label={{ value: m.l, position: "top", fill: "rgba(255,255,255,0.4)", fontSize: 10 }} />
              ))}

              <Area type={curveFor(data.length)} dataKey="index" stroke={CHART_GOLD} strokeWidth={1.7}
                fill="url(#dxyGradient)" isAnimationActive animationDuration={CHART_ANIM_MS} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 md:grid-cols-3">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">{peak.index.toFixed(1)}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.peakLabel}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{low.index.toFixed(1)}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.lowLabel}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{latest.index.toFixed(1)}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.latestLabel}</div>
        </div>
      </div>

      {source && <p className="mt-4 text-right font-body text-xs text-white/30">{copy.source} {source}</p>}
    </motion.div>
  );
}
