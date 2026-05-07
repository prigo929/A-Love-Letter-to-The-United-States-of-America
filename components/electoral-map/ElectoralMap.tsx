"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
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

  // Keyboard
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { const i = YEARS.indexOf(year); if (i > 0) setYear(YEARS[i - 1]); }
      else if (e.key === "ArrowRight") { const i = YEARS.indexOf(year); if (i < YEARS.length - 1) setYear(YEARS[i + 1]); }
      else if (e.key >= "1" && e.key <= "4") setView(VIEWS[+e.key - 1].key);
      else if (e.key === "Escape") setSel(null);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [year]);

  // Dynamic stats + active parties
  const { stats, activeParties } = useMemo(() => {
    const yd = ELECTORAL_HISTORY.find((d) => d.year === year) || ELECTORAL_HISTORY[0];
    const partySet = new Set<string>();
    let dS = 0, rS = 0, oS = 0, dH = 0, rH = 0;
    for (const sd of Object.values(yd.states)) {
      partySet.add(sd.president.party);
      if (sd.president.party === "DEM") dS++; else if (sd.president.party === "REP") rS++; else oS++;
      dH += sd.house.demReps; rH += sd.house.repReps;
    }
    return {
      stats: { dS, rS, oS, dH, rH, total: Object.keys(yd.states).filter(s => s !== "District of Columbia").length },
      activeParties: [...partySet].filter(Boolean),
    };
  }, [year]);

  return (
    <div className="relative w-full">
      {/* Header */}
      <div className="mb-6 text-center">
        <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.3em] text-[#C9A84C]">
          {isRo ? "Arhiva Electorală · 1789–2024" : "Electoral Archive · 1789–2024"}
        </p>
        <h2 className="font-display text-2xl font-bold text-[#F5F0E8] md:text-3xl">
          {isRo ? "Harta Democrației Americane" : "The Map of American Democracy"}
        </h2>
        <p className="mt-1 font-mono text-[10px] text-[#6B6860]">
          {isRo ? "← → sau tastele 1-4 · click pe stat pentru detalii" : "← → or keys 1-4 · click state for details"}
        </p>
      </div>

      {/* View tabs */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-1">
        {VIEWS.map((m, i) => (
          <button key={m.key} onClick={() => setView(m.key)}
            className={`relative px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all ${view === m.key ? "text-[#C9A84C]" : "text-[#6B6860] hover:text-[#B8B4AC]"}`}>
            <span className="mr-1 text-[8px] opacity-30">{i + 1}</span>
            {isRo ? m.ro : m.en}
            {view === m.key && <motion.div layoutId="vtab" className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C9A84C]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="mb-4 text-center font-mono text-[9px] uppercase tracking-widest text-[#6B6860]">
          {isRo ? v.descRo : v.descEn}
        </motion.p>
      </AnimatePresence>

      {/* Header bar (Dynamic for all views) */}
      <ElectionHeader year={year} viewMode={view as ViewMode} isRo={isRo} />

      {/* Map */}
      <div className="relative overflow-hidden border border-[rgba(201,168,76,0.06)] bg-[#080B12] p-1.5 md:p-3">
        <MapRenderer year={year} viewMode={view} onStateClick={(n) => setSel(n)} />
        <AnimatePresence>
          {sel && <StateDetailPanel stateName={sel} year={year} onClose={() => setSel(null)} isRo={isRo} />}
        </AnimatePresence>

        {/* Dynamic legend */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3 border-t border-[rgba(201,168,76,0.06)] pt-2">
          {activeParties.map((p) => (
            <div key={p} className="flex items-center gap-1">
              <div className="h-[6px] w-[6px]" style={{ background: PARTY_COLORS[p] || "#C9A84C" }} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#8A8780]">{PARTY_FULL_NAMES[p] || p}</span>
            </div>
          ))}
          {view === "House" && <span className="font-mono text-[8px] text-[#6B6860]">● = 1 rep</span>}
          <span className="font-mono text-[8px] text-[#6B6860]">┈ = {isRo ? "teritoriu" : "territory"}</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-4"><TimelineScrubber currentYear={year} onYearChange={setYear} isRo={isRo} /></div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-1.5 md:grid-cols-5">
        {[
          { l: isRo ? "An" : "Year", v: String(year) },
          { l: isRo ? "State" : "States", v: String(stats.total) },
          { l: activeParties[0] || "W", v: String(stats.dS + stats.oS - stats.rS > 0 ? stats.dS + stats.oS : stats.dS) },
          { l: activeParties[1] || "L", v: String(stats.rS || stats.oS) },
          { l: isRo ? "Alegeri" : "Elections", v: String(YEARS.length) },
        ].map((s) => (
          <div key={s.l} className="border border-[rgba(201,168,76,0.04)] bg-[#080B12] p-2 text-center">
            <p className="font-mono text-[7px] uppercase tracking-widest text-[#6B6860]">{s.l}</p>
            <p className="font-mono text-sm font-bold text-[#C9A84C]" style={{ fontVariantNumeric: "tabular-nums" }}>{s.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
