"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ViewMode } from "@/lib/data/electoral-data";
import { ELECTORAL_HISTORY } from "@/lib/data/electoral-data";
import { MapRenderer } from "./MapRenderer";
import { TimelineScrubber } from "./TimelineScrubber";
import { ElectoralVoteBar } from "./ElectoralVoteBar";
import { StateDetailPanel } from "./StateDetailPanel";

const YEARS = ELECTORAL_HISTORY.map((d) => d.year);

const VIEW_MODES: { key: ViewMode; label: string; labelRo: string; desc: string; descRo: string }[] = [
  { key: "President", label: "President", labelRo: "Președinte", desc: "Electoral College · solid state fills, diagonal hatch = party flip", descRo: "Colegiul Electoral · culori solide, hașură diagonală = schimbare de partid" },
  { key: "Senate", label: "Senate", labelRo: "Senat", desc: "Upper Chamber · split gradient = divided delegation", descRo: "Camera Superioară · gradient împărțit = delegație divizată" },
  { key: "House", label: "House", labelRo: "Cameră", desc: "Representatives · 435 dots clustered by state", descRo: "Reprezentanți · 435 de puncte grupate pe stat" },
  { key: "Governor", label: "Governor", labelRo: "Guvernator", desc: "State Executive · pure solid fill = sitting governor party", descRo: "Executiv de Stat · culoare solidă = partidul guvernatorului" },
];

export function ElectoralMap({ isRo }: { isRo?: boolean }) {
  const [currentYear, setCurrentYear] = useState(ELECTORAL_HISTORY[ELECTORAL_HISTORY.length - 1].year);
  const [viewMode, setViewMode] = useState<ViewMode>("President");
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const handleYearChange = useCallback((year: number) => setCurrentYear(year), []);
  const activeViewConfig = VIEW_MODES.find((v) => v.key === viewMode)!;

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        const idx = YEARS.indexOf(currentYear);
        if (idx > 0) setCurrentYear(YEARS[idx - 1]);
      } else if (e.key === "ArrowRight") {
        const idx = YEARS.indexOf(currentYear);
        if (idx < YEARS.length - 1) setCurrentYear(YEARS[idx + 1]);
      } else if (e.key >= "1" && e.key <= "4") {
        setViewMode(VIEW_MODES[parseInt(e.key) - 1].key);
      } else if (e.key === "Escape") {
        setSelectedState(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentYear]);

  // Dynamic stats computed from real data
  const stats = useMemo(() => {
    const yd = ELECTORAL_HISTORY.find((d) => d.year === currentYear) || ELECTORAL_HISTORY[0];
    let demStates = 0, repStates = 0, splitSen = 0, demHouse = 0, repHouse = 0, demGov = 0, repGov = 0;
    for (const sd of Object.values(yd.states)) {
      if (sd.president.party === "DEM") demStates++; else repStates++;
      if (sd.senate.split) splitSen++;
      demHouse += sd.house.demReps;
      repHouse += sd.house.repReps;
      if (sd.governor.party === "DEM") demGov++; else repGov++;
    }
    return { demStates, repStates, splitSen, demHouse, repHouse, demGov, repGov };
  }, [currentYear]);

  const dynamicStats = viewMode === "President"
    ? [{ l: isRo ? "Dem" : "DEM", v: `${stats.demStates}` }, { l: isRo ? "Rep" : "REP", v: `${stats.repStates}` }]
    : viewMode === "Senate"
      ? [{ l: isRo ? "Împărțite" : "Split", v: `${stats.splitSen}` }, { l: isRo ? "Solide" : "Solid", v: `${50 - stats.splitSen}` }]
      : viewMode === "House"
        ? [{ l: "DEM", v: `${stats.demHouse}` }, { l: "REP", v: `${stats.repHouse}` }]
        : [{ l: "DEM", v: `${stats.demGov}` }, { l: "REP", v: `${stats.repGov}` }];

  return (
    <div className="relative w-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <motion.p className="mb-2 font-body text-[10px] uppercase tracking-[0.3em] text-[#C9A84C]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {isRo ? "Arhiva Electorală" : "Electoral Archive"}
        </motion.p>
        <motion.h2 className="font-display text-3xl font-bold text-[#F5F0E8] md:text-4xl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          {isRo ? "Harta Democrației Americane" : "The Map of American Democracy"}
        </motion.h2>
        <motion.p className="mt-2 font-body text-sm text-[#8A8780]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {isRo ? "Explorează istoria electorală prin patru perspective constituționale. Folosește ← → sau tastele 1-4." : "Explore electoral history through four constitutional perspectives. Use ← → or keys 1-4."}
        </motion.p>
      </div>

      {/* View Mode Tabs */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-1.5">
        {VIEW_MODES.map((mode, i) => {
          const isActive = viewMode === mode.key;
          return (
            <button key={mode.key} onClick={() => setViewMode(mode.key)}
              className={`relative rounded-sm px-3 py-2 font-body text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${isActive ? "bg-[#C9A84C]/10 text-[#C9A84C]" : "text-[#6B6860] hover:text-[#B8B4AC]"}`}>
              <span className="mr-1 text-[9px] opacity-40">{i + 1}</span>
              {isRo ? mode.labelRo : mode.label}
              {isActive && <motion.div layoutId="viewmode-indicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A84C]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
            </button>
          );
        })}
      </div>

      {/* View Mode Description */}
      <AnimatePresence mode="wait">
        <motion.p key={viewMode} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.25 }}
          className="mb-6 text-center font-body text-[11px] uppercase tracking-[0.15em] text-[#6B6860]">
          {isRo ? activeViewConfig.descRo : activeViewConfig.desc}
        </motion.p>
      </AnimatePresence>

      {/* Electoral Vote Bar (President only) */}
      {viewMode === "President" && <ElectoralVoteBar year={currentYear} isRo={isRo} />}

      {/* Map Container */}
      <div className="relative rounded-sm border border-[rgba(201,168,76,0.08)] bg-[#0A0D14] p-2 md:p-4 overflow-hidden">
        <div className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-[rgba(201,168,76,0.15)]" />
        <div className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-[rgba(201,168,76,0.15)]" />
        <div className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-[rgba(201,168,76,0.15)]" />
        <div className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-[rgba(201,168,76,0.15)]" />

        <MapRenderer year={currentYear} viewMode={viewMode} onStateClick={(name) => setSelectedState(name)} />

        {/* State Detail Panel */}
        <AnimatePresence>
          {selectedState && (
            <StateDetailPanel stateName={selectedState} year={currentYear} onClose={() => setSelectedState(null)} isRo={isRo} />
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 border-t border-[rgba(201,168,76,0.08)] pt-3 md:gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-[1px] bg-[#1E5AA8]" />
            <span className="font-body text-[9px] text-[#8A8780]">Democrat</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-[1px] bg-[#B22234]" />
            <span className="font-body text-[9px] text-[#8A8780]">Republican</span>
          </div>
          {viewMode === "Senate" && (
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-[1px]" style={{ background: "linear-gradient(90deg, #1E5AA8 50%, #B22234 50%)" }} />
              <span className="font-body text-[9px] text-[#8A8780]">{isRo ? "Împărțit" : "Split"}</span>
            </div>
          )}
          {viewMode === "House" && (
            <div className="flex items-center gap-1.5">
              <span className="font-body text-[9px] text-[#8A8780]">● = 1 {isRo ? "reprezentant" : "representative"}</span>
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-5">
        <TimelineScrubber currentYear={currentYear} onYearChange={handleYearChange} isRo={isRo} />
      </div>

      {/* Dynamic Stats */}
      <motion.div key={`${currentYear}-${viewMode}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
        className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
        {[
          { label: isRo ? "An" : "Year", value: String(currentYear) },
          { label: isRo ? "Perspectivă" : "View", value: isRo ? activeViewConfig.labelRo : activeViewConfig.label },
          ...dynamicStats.map((s) => ({ label: s.l, value: s.v })),
        ].map((stat) => (
          <div key={stat.label} className="rounded-sm border border-[rgba(201,168,76,0.06)] bg-[#0A0D14] p-2.5 text-center">
            <p className="font-body text-[8px] uppercase tracking-[0.2em] text-[#6B6860]">{stat.label}</p>
            <p className="mt-0.5 font-display text-base font-bold text-[#C9A84C]" style={{ fontVariantNumeric: "tabular-nums" }}>{stat.value}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
