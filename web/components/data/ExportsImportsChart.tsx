"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { CHART_GOLD, CHART_RED, CHART_GRID, CHART_AXIS_LINE, CHART_TICK_MUTED, CHART_TOOLTIP_CLASS, curveFor, CHART_ANIM_MS } from "@/lib/chart-theme";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LazyChart } from "@/components/ui/LazyChart";
import type { ExportsImportsPoint } from "@/lib/data/economy-data";

interface ExportsImportsChartProps {
  data: ExportsImportsPoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function ExportsImportsChart({ data, title, subtitle, source }: ExportsImportsChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const copy = ro
     ? {
         exportsLabel: "Exporturi de Bunuri și Servicii",
         importsLabel: "Importuri de Bunuri și Servicii",
         source: "Sursă:",
         latest: "Cel mai recent",
       }
     : {
         exportsLabel: "Exports of Goods and Services",
         importsLabel: "Imports of Goods and Services",
         source: "Source:",
         latest: "Latest",
       };

  const latest = data[data.length - 1];

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
            <p className="mt-1 font-body text-sm text-white/55">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <LazyChart height={360}>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={100}>
            <AreaChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="exportsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_GOLD} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={CHART_GOLD} stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="importsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_RED} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={CHART_RED} stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} vertical={false} />
              <XAxis
                dataKey="date"
                tick={CHART_TICK_MUTED}
                axisLine={{ stroke: CHART_AXIS_LINE }}
                tickLine={false}
                ticks={["1970-01-01", "1980-01-01", "1990-01-01", "2000-01-01", "2010-01-01", "2020-01-01", "2026-01-01"]}
                tickFormatter={(d: string) => String(d).slice(0, 4)}
              />
              <YAxis
                tick={CHART_TICK_MUTED}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}B`}
                width={45}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as ExportsImportsPoint;
                  const diff = p.exports - p.imports;
                  return (
                    <div className={CHART_TOOLTIP_CLASS}>
                      <p className="mb-2 font-body text-xs text-white/50">{String(label).slice(0, 7)}</p>
                      <p className="font-body text-xs text-white/80">
                        <span className="inline-block w-2 h-2 rounded-full mr-2 bg-[#E8B923]" />
                        {copy.exportsLabel}: <span className="font-bold text-white">${p.exports.toFixed(1)}B</span>
                      </p>
                      <p className="font-body text-xs text-white/80 mt-1">
                        <span className="inline-block w-2 h-2 rounded-full mr-2 bg-[#ef4444]" />
                        {copy.importsLabel}: <span className="font-bold text-white">${p.imports.toFixed(1)}B</span>
                      </p>
                      <div className="border-t border-white/10 mt-2 pt-2">
                        <p className="font-hero text-lg font-bold" style={{ color: diff >= 0 ? CHART_GOLD : "#ef4444" }}>
                          {diff >= 0 ? "+" : ""}${diff.toFixed(1)}B <span className="font-body text-xs text-white/50">{locale === "ro" ? "Balanță Comercială" : "Trade Balance"}</span>
                        </p>
                      </div>
                    </div>
                  );
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (value === "exports" ? copy.exportsLabel : copy.importsLabel)}
              />
              <Area
                type={curveFor(data.length)}
                dataKey="exports"
                stroke={CHART_GOLD}
                strokeWidth={2}
                fill="url(#exportsGrad)"
                isAnimationActive animationDuration={CHART_ANIM_MS}
              />
              <Area
                type={curveFor(data.length)}
                dataKey="imports"
                stroke={CHART_RED}
                strokeWidth={2}
                fill="url(#importsGrad)"
                isAnimationActive animationDuration={CHART_ANIM_MS}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </LazyChart>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
        <div>
          <div className="font-hero text-3xl text-glory-gold md:text-4xl">${latest.exports.toFixed(1)}B</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.exportsLabel} ({String(latest.date).slice(0, 7)})
          </div>
        </div>
        <div>
          <div className="font-hero text-3xl text-[#ef4444] md:text-4xl">${latest.imports.toFixed(1)}B</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wider text-white/40">
            {copy.importsLabel} ({String(latest.date).slice(0, 7)})
          </div>
        </div>
      </div>

      {source && (
        <p className="mt-4 text-right font-body text-xs text-white/30">
          {copy.source} {source}
        </p>
      )}
    </motion.div>
  );
}
