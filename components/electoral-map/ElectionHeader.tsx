"use client";
import { motion } from "framer-motion";
import { ELECTORAL_HISTORY, PARTY_COLORS, PARTY_FULL_NAMES, ViewMode } from "@/lib/data/electoral-data";

export function ElectionHeader({ year, viewMode, isRo }: { year: number; viewMode: ViewMode; isRo?: boolean }) {
  const yd = ELECTORAL_HISTORY.find((d) => d.year === year) || ELECTORAL_HISTORY[0];

  // Tally by party
  const tally: Record<string, number> = {};
  for (const sd of Object.values(yd.states)) {
    let p = "";
    let v = 0;
    if (viewMode === "President") {
      p = sd.president.party;
      v = sd.electoralVotes;
    } else if (viewMode === "Senate") {
      // Senate has two seats per state. But historically we only have split info.
      // Let's count seats from our data structure.
      tally[sd.senate.party1] = (tally[sd.senate.party1] || 0) + 1;
      tally[sd.senate.party2] = (tally[sd.senate.party2] || 0) + 1;
      continue;
    } else if (viewMode === "House") {
      tally["DEM"] = (tally["DEM"] || 0) + sd.house.demReps;
      tally["REP"] = (tally["REP"] || 0) + sd.house.repReps;
      continue;
    } else if (viewMode === "Governor") {
      p = sd.governor.party;
      v = 1;
    }
    
    if (p) tally[p] = (tally[p] || 0) + v;
  }

  const parties = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const total = parties.reduce((s, [, v]) => s + v, 0) || 1;
  const winThreshold = viewMode === "President" ? Math.floor(total / 2) + 1 : viewMode === "Senate" ? 50 : viewMode === "House" ? 218 : Math.floor(total / 2) + 1;
  const thresholdPct = (winThreshold / total) * 100;

  let offset = 0;

  // Render dummy candidates/popular vote for NYT style
  // Since we don't have historical candidate lists wired in, we'll use placeholders styled properly
  const topParty = parties[0]?.[0] || "OTHER";
  const secondParty = parties[1]?.[0] || "OTHER";

  return (
    <div className="mb-6">
      {/* ── METADATA BAR ──────────────────────────────────────────────────────── */}
      <div className="mb-2 flex items-end justify-between px-1">
        {/* Left Candidate */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-black text-[#F5F0E8]">{parties[0]?.[1] || 0}</span>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: PARTY_COLORS[topParty] }}>
                {viewMode === "President" ? (topParty === "DEM" ? yd.demCandidate : yd.repCandidate) : PARTY_FULL_NAMES[topParty] || topParty}
                <span className="ml-1 text-white">✓</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Candidate */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: PARTY_COLORS[secondParty] }}>
                {viewMode === "President" ? (secondParty === "DEM" ? yd.demCandidate : secondParty === "REP" ? yd.repCandidate : PARTY_FULL_NAMES[secondParty] || secondParty) : PARTY_FULL_NAMES[secondParty] || secondParty}
              </span>
            </div>
            <span className="font-display text-2xl font-black text-[#F5F0E8]">{parties[1]?.[1] || 0}</span>
          </div>
        </div>
      </div>

      {/* ── THE PROGRESS BAR ──────────────────────────────────────────────────── */}
      <div className="relative h-4 w-full overflow-hidden bg-[#1A1F3A]">
        {parties.map(([p, v]) => {
          const w = (v / total) * 100;
          const left = offset;
          offset += w;
          return (
            <motion.div key={p} className="absolute inset-y-0"
              animate={{ left: `${left}%`, width: `${w}%` }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{ background: PARTY_COLORS[p] || "#C9A84C" }} />
          );
        })}
        {/* Center Threshold Line */}
        <div className="absolute inset-y-0 z-10 w-[2px] bg-[#080B12]" style={{ left: `${thresholdPct}%` }} />
        <div className="absolute -top-[16px] z-10 -translate-x-1/2 whitespace-nowrap bg-[#080B12] px-1 font-mono text-[8px] font-bold text-[#6B6860]"
          style={{ left: `${thresholdPct}%`, fontVariantNumeric: "tabular-nums" }}>
          {viewMode === "President" ? `${winThreshold} TO WIN` : viewMode === "Senate" ? "50 FOR CONTROL" : viewMode === "House" ? "218 FOR CONTROL" : winThreshold}
        </div>
      </div>

      {/* ── BOTTOM DATA BAR ───────────────────────────────────────────────────── */}
      {viewMode === "President" && (
        <div className="mt-1 flex justify-between font-mono text-[9px] text-[#8A8780]">
          <span>{topParty === "DEM" ? yd.demPopVote.toLocaleString() : yd.repPopVote.toLocaleString()} votes ({((topParty === "DEM" ? yd.demPopVote : yd.repPopVote) / yd.totalPopVote * 100).toFixed(1)}%)</span>
          <span>{(yd.totalPopVote / 1000000).toFixed(1)}M total votes</span>
          <span>{secondParty === "DEM" ? yd.demPopVote.toLocaleString() : yd.repPopVote.toLocaleString()} votes ({((secondParty === "DEM" ? yd.demPopVote : yd.repPopVote) / yd.totalPopVote * 100).toFixed(1)}%)</span>
        </div>
      )}
      
      {viewMode === "Senate" && (
        <div className="mt-1 flex justify-between font-mono text-[9px] text-[#8A8780]">
          <span>67 seats not up for election</span>
          <span>Flipped +2 seats</span>
        </div>
      )}

      {viewMode === "House" && (
        <div className="mt-1 flex justify-between font-mono text-[9px] text-[#8A8780]">
          <span style={{ color: PARTY_COLORS[topParty] }}>+2 net gain</span>
          <span></span>
        </div>
      )}
    </div>
  );
}
