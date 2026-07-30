"use client";

// ─── FedFundsChart: the price of money ──────────────────────────────────────
// The Fed's policy rate, monthly since 1954. Every other price in this section: 
// bonds, equities, venture rounds: is quoted against this one, which is why it
// belongs on the capital-markets page rather than a rates footnote.
//
// The chart is really two anchors and the distance between them: Volcker's
// 19.10% in June 1981, deliberately causing a recession to kill inflation, and
// 0.05% in April 2020, money as near to free as it has ever been.

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
import { CHART_GOLD, curveFor, CHART_ANIM_MS } from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { FedFundsPoint } from "@/lib/data/economy-data";

interface FedFundsChartProps {
  data: FedFundsPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function FedFundsChart({ data, title, subtitle, source }: FedFundsChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
    ? {
        rateLabel: "Rata fondurilor federale",
        volcker: "Șocul Volcker",
        zirp: "Rate aproape zero",
        peakLabel: "Maxim istoric: iunie 1981",
        lowLabel: "Minim istoric: aprilie 2020",
        latestLabel: "Astăzi",
        source: "Sursă:",
      }
    : {
        rateLabel: "Federal funds rate",
        volcker: "Volcker shock",
        zirp: "Near-zero rates",
        peakLabel: "All-time high: June 1981",
        lowLabel: "All-time low: April 2020",
        latestLabel: "Today",
        source: "Source:",
      };

  const peak = data.reduce((a, b) => (b.rate > a.rate ? b : a), data[0]);
  const low = data.reduce((a, b) => (b.rate < a.rate ? b : a), data[0]);
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
                <linearGradient id="ffGradient" x1="0" y1="0" x2="0" y2="1">
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
                ticks={["1954-07", "1970-01", "1981-06", "1995-01", "2009-01", "2020-04", "2026-06"]}
                tickFormatter={(m: string) => String(m).slice(0, 4)}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={false}
                domain={[0, 20]}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-2xl text-glory-gold">{(payload[0].value as number).toFixed(2)}%</p>
                      <p className="font-body text-xs text-white/50">{copy.rateLabel}</p>
                    </div>
                  );
                }}
              />

              {[{ x: "1981-06", l: copy.volcker }, { x: "2009-01", l: copy.zirp }].map((m) => (
                <ReferenceLine key={m.x} x={m.x} stroke="rgba(255,255,255,0.25)" strokeDasharray="3 3"
                  label={{ value: m.l, position: "top", fill: "rgba(255,255,255,0.45)", fontSize: 10 }} />
              ))}

              <Area type={curveFor(data.length)} dataKey="rate" stroke={CHART_GOLD} strokeWidth={1.6} fill="url(#ffGradient)" isAnimationActive animationDuration={CHART_ANIM_MS} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 md:grid-cols-3">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">{peak.rate.toFixed(2)}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.peakLabel}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{low.rate.toFixed(2)}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.lowLabel}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{latest.rate.toFixed(2)}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.latestLabel}</div>
        </div>
      </div>

      {source && <p className="mt-4 text-right font-body text-xs text-white/30">{copy.source} {source}</p>}
    </motion.div>
  );
}
