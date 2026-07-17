"use client";

// ─── NasdaqChart — the price of American technology ──────────────────────────
// The Nasdaq Composite, monthly since the index opened at 100 in 1971. This is
// the exchange where Apple, Microsoft, NVIDIA, Alphabet, Amazon and Meta list,
// so the line is about as close as a single series gets to "what is American
// technology worth".
//
// The axis is LOGARITHMIC and the toggle makes that a choice the reader can see.
// On a linear axis the first thirty years of the index are a flat line on the
// floor — 1971 to 2000 is invisible next to 26,000 — which would hide the two
// things actually worth seeing: the 1974 trough at 58.6, and the dot-com crash,
// where the index lost roughly three-quarters of its value and took fifteen years
// to recover. A log axis shows equal percentage moves as equal distances, which
// is how a compounding index should be read.

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
import { useState } from "react";
import { motion } from "framer-motion";
import { CHART_GOLD, CHART_ANIM_MS, curveFor } from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { NasdaqPoint } from "@/lib/data/economy-data";

type Scale = "log" | "linear";

interface NasdaqChartProps {
  data: NasdaqPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function NasdaqChart({ data, title, subtitle, source }: NasdaqChartProps) {
  const { locale } = useLanguage();
  const [scale, setScale] = useState<Scale>("log");
  const ro = locale === "ro";

  const copy = ro
    ? {
        log: "Logaritmic",
        linear: "Liniar",
        logNote: "mișcări procentuale egale, distanțe egale",
        linearNote: "primii 30 de ani devin invizibili",
        closeLabel: "Nasdaq Composite (medie lunară)",
        dotcom: "Vârful dot-com",
        gfc: "2008",
        peakLabel: "Maxim istoric",
        troughLabel: "Minimul din 1974",
        multipleLabel: "De la lansarea indicelui la 100, în 1971",
        source: "Sursă:",
      }
    : {
        log: "Logarithmic",
        linear: "Linear",
        logNote: "equal percentage moves, equal distances",
        linearNote: "the first 30 years vanish",
        closeLabel: "Nasdaq Composite (monthly average)",
        dotcom: "Dot-com peak",
        gfc: "2008",
        peakLabel: "All-time high",
        troughLabel: "1974 trough",
        multipleLabel: "Since the index opened at 100 in 1971",
        source: "Source:",
      };

  const peak = data.reduce((a, b) => (b.close > a.close ? b : a), data[0]);
  const trough = data.reduce((a, b) => (b.close < a.close ? b : a), data[0]);
  const latest = data[data.length - 1];
  const multiple = latest.close / 100; // the index was defined as 100 at inception

  const nf = (n: number) => Math.round(n).toLocaleString(ro ? "ro-RO" : "en-US");

  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="w-full">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          {title && <h3 className="font-display text-xl font-semibold text-white md:text-2xl">{title}</h3>}
          {subtitle && <p className="mt-1 font-body text-sm text-white/55">{subtitle}</p>}
        </div>
        {/* The scale is the argument, so it is a control rather than a footnote. */}
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex rounded-full border border-white/12 p-0.5">
            {(["log", "linear"] as Scale[]).map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className="rounded-full px-4 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.14em] transition-all"
                style={{
                  background: scale === s ? "rgba(255,255,255,0.9)" : "transparent",
                  color: scale === s ? "#000" : "rgba(255,255,255,0.5)",
                }}
              >
                {s === "log" ? copy.log : copy.linear}
              </button>
            ))}
          </div>
          <span className="font-body text-[10px] uppercase tracking-wider text-white/35">
            {scale === "log" ? copy.logNote : copy.linearNote}
          </span>
        </div>
      </div>

      <LazyChart height={400}>
        <div className="h-[340px] w-full md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <AreaChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="nasdaqGradient" x1="0" y1="0" x2="0" y2="1">
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
                ticks={["1971-03", "1980-01", "1990-01", "2000-03", "2010-01", "2020-01", "2026-06"]}
                tickFormatter={(m: string) => String(m).slice(0, 4)}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={false}
                scale={scale}
                // A log axis cannot start at zero; the series low is 58.6.
                domain={scale === "log" ? [50, 30000] : [0, 30000]}
                allowDataOverflow={false}
                ticks={scale === "log" ? [100, 1000, 10000] : [0, 10000, 20000, 30000]}
                tickFormatter={(v: number) => (v >= 1000 ? `${v / 1000}k` : String(v))}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-2xl text-glory-gold">{nf(payload[0].value as number)}</p>
                      <p className="font-body text-xs text-white/50">{copy.closeLabel}</p>
                    </div>
                  );
                }}
              />

              {[{ x: "2000-03", l: copy.dotcom }, { x: "2008-10", l: copy.gfc }].map((m) => (
                <ReferenceLine key={m.x} x={m.x} stroke="rgba(255,255,255,0.25)" strokeDasharray="3 3"
                  label={{ value: m.l, position: "top", fill: "rgba(255,255,255,0.45)", fontSize: 10 }} />
              ))}

              {/* key={scale}: Recharts keeps the old geometry when only the axis
                  scale changes, so remount the series to actually redraw it. */}
              <Area key={scale} type={curveFor(data.length)} dataKey="close" stroke={CHART_GOLD} strokeWidth={1.7}
                fill="url(#nasdaqGradient)" isAnimationActive animationDuration={CHART_ANIM_MS} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 md:grid-cols-3">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">{nf(peak.close)}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.peakLabel} · {peak.month}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{trough.close.toFixed(1)}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.troughLabel}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{Math.round(multiple)}×</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.multipleLabel}</div>
        </div>
      </div>

      {source && <p className="mt-4 text-right font-body text-xs text-white/30">{copy.source} {source}</p>}
    </motion.div>
  );
}
