"use client";

// ─── BusinessFormationChart — the startup engine underneath venture capital ──
// Monthly business applications filed with the IRS (Census Business Formation
// Statistics, 2004→today). Venture capital funds a few thousand companies a year;
// this is the other several million. The pandemic set off the largest surge on
// record and, unusually, it never went back down.
//
// Two series, because the headline number flatters itself. `apps` is every
// application; `hp` is the "high-propensity" subset the Census judges likely to
// actually employ someone. The gap between the bands is the point — only about a
// third of the surge is firms that will ever hire.

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
import type { BusinessFormationPoint } from "@/lib/data/economy-data";

interface BusinessFormationChartProps {
  data: BusinessFormationPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function BusinessFormationChart({ data, title, subtitle, source }: BusinessFormationChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const nf = (n: number) => n.toLocaleString(ro ? "ro-RO" : "en-US");

  const copy = ro
    ? {
        gfc: "Criza 2008",
        covid: "Valul COVID",
        appsLabel: "Cereri de înființare, pe lună",
        hpLabel: "Dintre care probabil vor angaja",
        peakLabel: "Vârf lunar record — iulie 2020",
        latestLabel: "Cea mai recentă lună",
        hpShareLabel: "Din cererile din 2024, cele care probabil vor angaja",
        source: "Sursă:",
      }
    : {
        gfc: "2008 crisis",
        covid: "COVID surge",
        appsLabel: "Business applications, per month",
        hpLabel: "Of which likely to hire",
        peakLabel: "Record month — July 2020",
        latestLabel: "Most recent month",
        hpShareLabel: "Of 2024 applications, likely to ever employ someone",
        source: "Source:",
      };

  const peak = data.reduce((a, b) => (b.apps > a.apps ? b : a), data[0]);
  const latest = data[data.length - 1];
  // Share of the headline that is actually employer-track, from the data itself.
  const y2024 = data.filter((d) => d.month.startsWith("2024"));
  const hpShare = y2024.length
    ? (y2024.reduce((s, d) => s + d.hp, 0) / y2024.reduce((s, d) => s + d.apps, 0)) * 100
    : 0;

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
                <linearGradient id="bfsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_GOLD} stopOpacity={0.42} />
                  <stop offset="95%" stopColor={CHART_GOLD} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="bfsHpGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0.03} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                ticks={["2004-07", "2008-09", "2012-01", "2016-01", "2020-07", "2023-01", "2026-06"]}
                tickFormatter={(m: string) => String(m).slice(0, 4)}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as BusinessFormationPoint;
                  return (
                    <div className="rounded-xl border border-white/15 bg-navy-dark/95 px-4 py-3 shadow-2xl backdrop-blur-sm">
                      <p className="mb-1 font-body text-xs text-white/50">{label}</p>
                      <p className="font-hero text-2xl text-glory-gold">{nf(p.apps)}</p>
                      <p className="font-body text-xs text-white/50">{copy.appsLabel}</p>
                      <p className="mt-1.5 font-hero text-lg text-white/85">{nf(p.hp)}</p>
                      <p className="font-body text-xs text-white/40">{copy.hpLabel}</p>
                    </div>
                  );
                }}
              />

              {[{ x: "2008-09", l: copy.gfc }, { x: "2020-07", l: copy.covid }].map((m) => (
                <ReferenceLine key={m.x} x={m.x} stroke="rgba(255,255,255,0.25)" strokeDasharray="3 3"
                  label={{ value: m.l, position: "top", fill: "rgba(255,255,255,0.45)", fontSize: 10 }} />
              ))}

              <Area type="monotone" dataKey="apps" stroke={CHART_GOLD} strokeWidth={1.8} fill="url(#bfsGradient)" isAnimationActive animationDuration={1400} />
              {/* Employer-track subset, drawn over the headline: the gap is the story */}
              <Area type="monotone" dataKey="hp" stroke="rgba(255,255,255,0.55)" strokeWidth={1.2} fill="url(#bfsHpGradient)" isAnimationActive animationDuration={1400} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 md:grid-cols-3">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">{nf(peak.apps)}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.peakLabel}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{nf(latest.apps)}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.latestLabel}</div>
        </div>
        <div>
          <div className="font-hero text-3xl text-white/85 md:text-4xl">{hpShare.toFixed(0)}%</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">{copy.hpShareLabel}</div>
        </div>
      </div>

      {source && <p className="mt-4 text-right font-body text-xs text-white/30">{copy.source} {source}</p>}
    </motion.div>
  );
}
