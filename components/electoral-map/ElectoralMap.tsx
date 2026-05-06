"use client";
// ─── Electoral Archive Map ──────────────────────────────────────────────────
// Main wrapper component that owns the state for year and view mode.
// It composes the MapRenderer and TimelineScrubber into a single,
// museum-grade interactive experience.

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ViewMode } from "@/lib/data/electoral-data";
import { ELECTORAL_HISTORY } from "@/lib/data/electoral-data";
import { MapRenderer } from "./MapRenderer";
import { TimelineScrubber } from "./TimelineScrubber";

const VIEW_MODES: { key: ViewMode; label: string; labelRo: string; desc: string; descRo: string }[] = [
  {
    key: "President",
    label: "President",
    labelRo: "Președinte",
    desc: "Electoral College · solid state fills, diagonal hatch = party flip",
    descRo: "Colegiul Electoral · culori solide, hașură diagonală = schimbare de partid",
  },
  {
    key: "Senate",
    label: "Senate",
    labelRo: "Senat",
    desc: "Upper Chamber · split gradient = divided delegation",
    descRo: "Camera Superioară · gradient împărțit = delegație divizată",
  },
  {
    key: "House",
    label: "House",
    labelRo: "Cameră",
    desc: "Representatives · dot matrix clustered by district winners",
    descRo: "Reprezentanți · matrice de puncte grupate pe câștigători de district",
  },
  {
    key: "Governor",
    label: "Governor",
    labelRo: "Guvernator",
    desc: "State Executive · pure solid fill = sitting governor party",
    descRo: "Executiv de Stat · culoare solidă = partidul guvernatorului",
  },
];

export function ElectoralMap({ isRo }: { isRo?: boolean }) {
  const [currentYear, setCurrentYear] = useState(ELECTORAL_HISTORY[ELECTORAL_HISTORY.length - 1].year);
  const [viewMode, setViewMode] = useState<ViewMode>("President");
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const handleYearChange = useCallback((year: number) => {
    setCurrentYear(year);
  }, []);

  const activeViewConfig = VIEW_MODES.find((v) => v.key === viewMode)!;

  return (
    <div className="relative w-full">
      {/* ── Section Header ────────────────────────────────────────────────── */}
      <div className="mb-8 text-center">
        <motion.p
          className="mb-2 font-body text-[10px] uppercase tracking-[0.3em] text-[#C9A84C]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isRo ? "Arhiva Electorală" : "Electoral Archive"}
        </motion.p>
        <motion.h2
          className="font-display text-3xl font-bold text-[#F5F0E8] md:text-4xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {isRo ? "Harta Democrației Americane" : "The Map of American Democracy"}
        </motion.h2>
        <motion.p
          className="mt-2 font-body text-sm text-[#8A8780]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {isRo
            ? "Explorează istoria electorală prin patru perspective constituționale."
            : "Explore electoral history through four constitutional perspectives."}
        </motion.p>
      </div>

      {/* ── View Mode Tabs ────────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-1.5">
        {VIEW_MODES.map((mode) => {
          const isActive = viewMode === mode.key;
          return (
            <button
              key={mode.key}
              onClick={() => setViewMode(mode.key)}
              className={`relative rounded-sm px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                isActive
                  ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                  : "text-[#6B6860] hover:text-[#B8B4AC]"
              }`}
            >
              {isRo ? mode.labelRo : mode.label}
              {isActive && (
                <motion.div
                  layoutId="viewmode-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A84C]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* View Mode Description */}
      <AnimatePresence mode="wait">
        <motion.p
          key={viewMode}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="mb-6 text-center font-body text-[11px] uppercase tracking-[0.15em] text-[#6B6860]"
        >
          {isRo ? activeViewConfig.descRo : activeViewConfig.desc}
        </motion.p>
      </AnimatePresence>

      {/* ── Map Container ─────────────────────────────────────────────────── */}
      <div className="relative rounded-sm border border-[rgba(201,168,76,0.08)] bg-[#0A0D14] p-4 md:p-6">
        {/* Subtle corner decorations */}
        <div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-[rgba(201,168,76,0.15)]" />
        <div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-[rgba(201,168,76,0.15)]" />
        <div className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[rgba(201,168,76,0.15)]" />
        <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[rgba(201,168,76,0.15)]" />

        <MapRenderer year={currentYear} viewMode={viewMode} />

        {/* ── Legend ────────────────────────────────────────────────────────── */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border-t border-[rgba(201,168,76,0.08)] pt-4">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-[1px] bg-[#1E5AA8]" />
            <span className="font-body text-[10px] text-[#8A8780]">
              {isRo ? "Democrat" : "Democrat"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-[1px] bg-[#B22234]" />
            <span className="font-body text-[10px] text-[#8A8780]">
              {isRo ? "Republican" : "Republican"}
            </span>
          </div>
          {viewMode === "President" && (
            <div className="flex items-center gap-1.5">
              <div
                className="h-3 w-3 rounded-[1px]"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, #B22234, #B22234 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)",
                }}
              />
              <span className="font-body text-[10px] text-[#8A8780]">
                {isRo ? "Schimbare de partid" : "Flipped from previous"}
              </span>
            </div>
          )}
          {viewMode === "Senate" && (
            <div className="flex items-center gap-1.5">
              <div
                className="h-3 w-3 rounded-[1px]"
                style={{
                  background: "linear-gradient(90deg, #1E5AA8 50%, #B22234 50%)",
                }}
              />
              <span className="font-body text-[10px] text-[#8A8780]">
                {isRo ? "Delegație împărțită" : "Split delegation"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Timeline Scrubber ─────────────────────────────────────────────── */}
      <div className="mt-6">
        <TimelineScrubber
          currentYear={currentYear}
          onYearChange={handleYearChange}
          isRo={isRo}
        />
      </div>

      {/* ── Summary Stats Bar ─────────────────────────────────────────────── */}
      <motion.div
        key={`${currentYear}-${viewMode}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4"
      >
        {[
          {
            label: isRo ? "Anul Alegerilor" : "Election Year",
            value: String(currentYear),
          },
          {
            label: isRo ? "Perspectivă" : "Perspective",
            value: isRo ? activeViewConfig.labelRo : activeViewConfig.label,
          },
          {
            label: isRo ? "State Vizualizate" : "States Mapped",
            value: "50",
          },
          {
            label: isRo ? "Sistem" : "System",
            value: isRo ? "Republică Federală" : "Federal Republic",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-sm border border-[rgba(201,168,76,0.06)] bg-[#0A0D14] p-3 text-center"
          >
            <p className="font-body text-[9px] uppercase tracking-[0.2em] text-[#6B6860]">
              {stat.label}
            </p>
            <p
              className="mt-1 font-display text-lg font-bold text-[#C9A84C]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
