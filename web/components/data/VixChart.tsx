"use client";

// ─── VixChart — the CBOE fear index ──────────────────────────────────────────
// Monthly VIX since 1990. The point of this chart is the spikes: the index sits
// in the teens for years and then detonates when the floor drops out. We plot the
// monthly average as the body and the monthly high as a faint ghost above it, so
// the record days (82.69 in COVID, 80.86 in the 2008 crisis) stay visible instead
// of being averaged into nothing.

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
import { curveFor, CHART_ANIM_MS } from "@/lib/chart-theme";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { VixPoint } from "@/lib/data/economy-data";

interface VixChartProps {
  data: VixPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

const CALM = "#34d399";
const FEAR = "#ef4444";

export function VixChart({ data, title, subtitle, source }: VixChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
    ? {
        monthly: "Media lunară",
        peak: "Vârful lunii",
        calm: "Calm (20)",
        panic: "Panică (40)",
        gfc: "Criza 2008",
        covid: "COVID",
        recordLabel: "Recordul absolut — 16 martie 2020",
        calmLabel: "Sub 20 înseamnă piețe liniștite",
        source: "Sursă:",
      }
    : {
        monthly: "Monthly average",
        peak: "Monthly high",
        calm: "Calm (20)",
        panic: "Panic (40)",
        gfc: "2008 crisis",
        covid: "COVID",
        recordLabel: "All-time record — 16 March 2020",
        calmLabel: "Below 20 means quiet markets",
        source: "Source:",
      };

  const record = data.reduce((a, b) => (b.high > a.high ? b : a), data[0]);

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
                <linearGradient id="vixGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={FEAR} stopOpacity={0.45} />
                  <stop offset="95%" stopColor={FEAR} stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                ticks={["1990-01", "1998-01", "2004-01", "2008-10", "2014-01", "2020-03", "2026-01"]}
                tickFormatter={(m: string) => String(m).slice(0, 4)}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={false}
                domain={[0, 90]}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as VixPoint;
                  return (
                    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-2xl" style={{ color: p.avg >= 30 ? FEAR : CALM }}>{p.avg}</p>
                      <p className="font-body text-xs text-white/50">{copy.monthly}</p>
                      <p className="mt-1 font-body text-xs text-white/40">{copy.peak}: {p.high}</p>
                    </div>
                  );
                }}
              />

              {/* Regime lines: the market's own definition of calm vs panic */}
              <ReferenceLine y={20} stroke="rgba(52,211,153,0.5)" strokeDasharray="4 4"
                label={{ value: copy.calm, position: "insideTopRight", fill: "rgba(52,211,153,0.7)", fontSize: 10 }} />
              <ReferenceLine y={40} stroke="rgba(239,68,68,0.45)" strokeDasharray="4 4"
                label={{ value: copy.panic, position: "insideTopRight", fill: "rgba(239,68,68,0.7)", fontSize: 10 }} />
              {[{ x: "2008-10", l: copy.gfc }, { x: "2020-03", l: copy.covid }].map((m) => (
                <ReferenceLine key={m.x} x={m.x} stroke="rgba(255,255,255,0.25)" strokeDasharray="3 3"
                  label={{ value: m.l, position: "top", fill: "rgba(255,255,255,0.45)", fontSize: 10 }} />
              ))}

              {/* Ghost of the monthly high, so record spikes survive the averaging */}
              <Area type={curveFor(data.length)} dataKey="high" stroke="rgba(239,68,68,0.28)" strokeWidth={1} fill="none" isAnimationActive={false} />
              <Area type={curveFor(data.length)} dataKey="avg" stroke={FEAR} strokeWidth={1.6} fill="url(#vixGradient)" isAnimationActive animationDuration={CHART_ANIM_MS} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
        <div>
          <div className="font-hero text-3xl md:text-4xl" style={{ color: FEAR }}>{record.high}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.recordLabel}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{data[data.length - 1].avg}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.calmLabel}</div>
        </div>
      </div>

      {source && <p className="mt-4 text-right font-body text-xs text-white/30">{copy.source} {source}</p>}
    </motion.div>
  );
}
