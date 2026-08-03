"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ViewMode } from "@/lib/data/electoral-data";
import { ELECTORAL_HISTORY, PARTY_COLORS, PARTY_FULL_NAMES } from "@/lib/data/electoral-data";
import { MapRenderer } from "./MapRenderer";
import { TimelineScrubber } from "./TimelineScrubber";
import { ElectionHeader } from "./ElectionHeader";
import { StateDetailPanel } from "./StateDetailPanel";

const YEARS = ELECTORAL_HISTORY.map((d) => d.year);
const VIEWS: { key: ViewMode; en: string; ro: string; descEn: string; descRo: string }[] = [
  { key: "President", en: "President", ro: "Președinte", descEn: "Electoral College · state fills by winning party", descRo: "Colegiul Electoral · state colorate pe partid" },
  { key: "Senate", en: "Senate", ro: "Senat", descEn: "Upper Chamber · diagonal split = divided delegation", descRo: "Camera Superioară · diagonală = delegație împărțită" },
  { key: "House", en: "House", ro: "Cameră", descEn: "Representatives · 435 dots in rigid grid", descRo: "Reprezentanți · 435 puncte în grilă rigidă" },
  { key: "Governor", en: "Governor", ro: "Guvernator", descEn: "State Executive · sitting governor party", descRo: "Executiv de Stat · partidul guvernatorului" },
];

export function ElectoralMap({ isRo }: { isRo?: boolean }) {
  const [year, setYear] = useState(YEARS[YEARS.length - 1]);
  const [view, setView] = useState<ViewMode>("President");
  const [sel, setSel] = useState<string | null>(null);
  const v = VIEWS.find((x) => x.key === view)!;

  // Keyboard Navigation: Enables rapid-fire historical analysis
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      // Arrow keys for timeline scrubbing
      if (e.key === "ArrowLeft") { const i = YEARS.indexOf(year); if (i > 0) setYear(YEARS[i - 1]); }
      else if (e.key === "ArrowRight") { const i = YEARS.indexOf(year); if (i < YEARS.length - 1) setYear(YEARS[i + 1]); }
      // Number keys (1-4) for switching view modes (President, Senate, House, Governor)
      else if (e.key >= "1" && e.key <= "4") setView(VIEWS[+e.key - 1].key);
      // Escape to close state details
      else if (e.key === "Escape") setSel(null);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [year]);

  // Dynamic stats + active parties
  const { stats, activeParties } = useMemo(() => {
    const yd = ELECTORAL_HISTORY.find((d) => d.year === year) || ELECTORAL_HISTORY[0];
    const partySet = new Set<string>();
    let dS = 0, rS = 0, oS = 0, p1H = 0, p2H = 0;
    for (const sd of Object.values(yd.states)) {
      partySet.add(sd.president.party);
      if (sd.president.party === "DEM") dS++; else if (sd.president.party === "REP") rS++; else oS++;
      p1H += sd.house.p1Reps; p2H += sd.house.p2Reps;
    }
    return {
      stats: { dS, rS, oS, p1H, p2H, total: Object.keys(yd.states).filter(s => s !== "District of Columbia").length },
      activeParties: [...partySet].filter(Boolean),
    };
  }, [year]);

  return (
    <div className="relative w-full">
      {/* Header */}
      <div className="mb-6 text-center">
        <p className="mb-1 font-body text-xs font-semibold uppercase tracking-wider text-[#C9A84C]">
          {isRo ? "Arhiva Electorală · 1789–2024" : "Electoral Archive · 1789–2024"}
        </p>
        <h2 className="font-display text-2xl font-bold text-[#F5F0E8] md:text-3xl">
          {isRo ? "Harta Democrației Americane" : "The Map of American Democracy"}
        </h2>
        <p className="mt-1.5 font-body text-xs font-medium text-[#B8B4AC]">
          {isRo ? "← → sau tastele 1-4 · click pe stat pentru detalii" : "← → or keys 1-4 · click state for details"}
        </p>
      </div>

      {/* View tabs */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-1.5">
        {VIEWS.map((m, i) => (
          <button key={m.key} onClick={() => setView(m.key)}
            className={`relative px-4 py-2 rounded-full border transition-all font-body text-xs font-semibold uppercase tracking-wider ${view === m.key ? "bg-[rgba(201,168,76,0.12)] border-[#C9A84C] text-[#C9A84C]" : "border-white/10 text-[#8A8780] hover:border-white/20 hover:text-[#F5F0E8]"}`}>
            <span className="mr-1.5 text-xs opacity-40">{i + 1}</span>
            {isRo ? m.ro : m.en}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="mb-4 text-center font-body text-xs font-medium uppercase tracking-wider text-[#8A8780]">
          {isRo ? v.descRo : v.descEn}
        </motion.p>
      </AnimatePresence>

      {/* Header bar (Dynamic for all views) */}
      <ElectionHeader year={year} viewMode={view as ViewMode} isRo={isRo} />

      {/* Map container - expanded for maximum visibility */}
      <div className="relative overflow-hidden rounded-xl border border-[rgba(201,168,76,0.12)] bg-[#080B12] p-4">
        <MapRenderer year={year} viewMode={view} onStateClick={(n) => setSel(n)} isRo={isRo} />
        <AnimatePresence>
          {sel && <StateDetailPanel stateName={sel} year={year} onClose={() => setSel(null)} isRo={isRo} />}
        </AnimatePresence>

        {/* Dynamic legend */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 border-t border-[rgba(201,168,76,0.1)] pt-3">
          {activeParties.map((p) => (
            <div key={p} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ background: PARTY_COLORS[p] || "#C9A84C" }} />
              <span className="font-body text-xs font-medium uppercase tracking-wider text-[#B8B4AC]">{PARTY_FULL_NAMES[p] || p}</span>
            </div>
          ))}
          {view === "House" && (
            <span className="font-body text-xs font-medium text-[#8A8780]">● = 1 rep</span>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-4"><TimelineScrubber currentYear={year} onYearChange={setYear} isRo={isRo} viewMode={view as ViewMode} /></div>

      {/* Stats */}
      <div className="mt-4 flex flex-wrap gap-2 md:flex-nowrap md:justify-between">
        {[
          { l: isRo ? "An" : "Year", v: String(year) },
          { l: isRo ? "State" : "States", v: String(stats.total) },
          { l: activeParties[0] || "W", v: String(stats.dS + stats.oS - stats.rS > 0 ? stats.dS + stats.oS : stats.dS) },
          { l: activeParties[1] || "L", v: String(stats.rS || stats.oS) },
          { l: isRo ? "Alegeri" : "Elections", v: String(YEARS.length) },
        ].map((s) => (
          <div key={s.l} className="flex-1 rounded-lg border border-[rgba(201,168,76,0.1)] bg-[#0C1017] p-3 text-center min-w-[80px]">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-[#8A8780]">{s.l}</p>
            <p className="mt-1 font-body text-base font-bold text-[#C9A84C]">{s.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
