"use client";

// ─── GDP Expenditures Chart ──────────────────────────────────────────────────
// An interactive, responsive, segmented horizontal bar chart showing U.S. GDP
// by major expenditure component (C + I + G + NX).
// Features smooth micro-animations, glassmorphic styling, and localized tooltips.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { GdpExpenditurePoint } from "@/lib/data/economy-data";

interface GdpExpendituresChartProps {
  data: GdpExpenditurePoint[];
  title?: string;
  subtitle?: string;
  source?: string;
}

export function GdpExpendituresChart({ data, title, subtitle, source }: GdpExpendituresChartProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const sourceLabel = ro ? "Sursă:" : "Source:";
  const formulaLabel = ro ? "Formula PIB:" : "GDP Formula:";
  const activeLabel = ro ? "Detalii Componentă" : "Component Details";

  // Filter positive vs negative components (Net Exports is negative)
  const positiveComponents = data.filter((d) => d.percentage > 0);
  const totalPositivePercentage = positiveComponents.reduce((sum, item) => sum + item.percentage, 0);

  // Active state for hover details
  const [activeId, setActiveId] = useState<number>(0); // Default to Consumption (index 0)

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="w-full font-body"
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

      {/* GDP Equation Callout Banner */}
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/40">
          {formulaLabel}
        </span>
        <div className="font-mono text-lg font-bold text-white tracking-wider">
          GDP = <span className="text-[#E8B923]">C</span> + <span className="text-[#3b82f6]">I</span> + <span className="text-[#e11d48]">G</span> + <span className="text-[#6b7280]">NX</span>
        </div>
      </div>

      {/* Segmented Bar Chart */}
      <div className="relative mb-8">
        <div className="h-8 w-full overflow-hidden rounded-full border border-white/10 bg-white/[0.04] p-1 flex">
          {positiveComponents.map((item, i) => {
            // Normalize width to fit positive percentage sum
            const widthPct = (item.percentage / totalPositivePercentage) * 100;
            const isHovered = activeId === i;

            return (
              <button
                key={item.component}
                className="h-full relative focus:outline-none transition-all duration-300"
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: item.color,
                  opacity: activeId === null || isHovered ? 1 : 0.45,
                  transform: isHovered ? "scaleY(1.15)" : "scaleY(1)",
                  zIndex: isHovered ? 10 : 1,
                  borderRadius:
                    i === 0
                      ? "999px 0 0 999px"
                      : i === positiveComponents.length - 1
                      ? "0 999px 999px 0"
                      : "0",
                }}
                onMouseEnter={() => setActiveId(i)}
                aria-label={ro ? item.componentRo : item.component}
              />
            );
          })}
        </div>

        {/* Net Exports (NX) Subtraction representation under the positive stack */}
        {data.find((d) => d.percentage < 0) && (
          <div className="mt-2 flex items-center justify-end">
            <button
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 transition-all hover:bg-white/[0.08]"
              style={{
                borderColor: activeId === 3 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)",
                opacity: activeId === null || activeId === 3 ? 1 : 0.45,
              }}
              onMouseEnter={() => setActiveId(3)}
            >
              <span className="h-2 w-2 rounded-full bg-[#6b7280]" />
              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-white/60">
                {ro ? "Deficit Comercial Nete" : "Net Trade Deficit"}: -3.3%
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Info Card Panel */}
      <div className="grid gap-6 md:grid-cols-12 items-stretch min-h-[160px]">
        {/* Left Side: Selected segment statistics */}
        <div className="md:col-span-5 rounded-2xl border border-white/8 bg-[#0a0a0a]/80 p-6 flex flex-col justify-between backdrop-blur-md">
          {activeId !== null && (
            <div>
              <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#E8B923]">
                {activeLabel}
              </span>
              <h4 className="font-display text-lg font-bold text-white mt-1 leading-tight">
                {ro ? data[activeId].componentRo : data[activeId].component}
              </h4>
              <div className="mt-4 flex items-baseline gap-4">
                <span className="font-hero text-4xl font-extrabold text-white">
                  {data[activeId].percentage}%
                </span>
                <span className="font-sans text-xs uppercase text-white/40">
                  ${Math.abs(data[activeId].value).toFixed(1)}T
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Segment description */}
        <div className="md:col-span-7 rounded-2xl border border-white/8 bg-[#0a0a0a]/40 p-6 flex items-center backdrop-blur-md">
          {activeId !== null && (
            <p className="font-body text-sm leading-relaxed text-white/70">
              {ro ? data[activeId].descriptionRo : data[activeId].description}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Legend */}
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/5 pt-6 justify-center">
        {data.map((item, i) => (
          <button
            key={item.component}
            className="flex items-center gap-2.5 transition-opacity"
            style={{ opacity: activeId === null || activeId === i ? 1 : 0.4 }}
            onMouseEnter={() => setActiveId(i)}
          >
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="font-sans text-xs font-semibold text-white/85">
              {ro ? item.componentRo.split(" (")[0] : item.component.split(" (")[0]}
            </span>
            <span className="font-mono text-xs font-bold text-[#E8B923]">
              {item.percentage > 0 ? "+" : ""}{item.percentage}%
            </span>
          </button>
        ))}
      </div>

      {source && (
        <p className="mt-6 text-right font-body text-[10px] uppercase tracking-wider text-white/30">
          {sourceLabel} {source}
        </p>
      )}
    </motion.div>
  );
}
