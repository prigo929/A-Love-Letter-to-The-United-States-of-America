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
  const totalSeats = viewMode === "President" ? 538 : viewMode === "Senate" ? 100 : viewMode === "House" ? 435 : total;
  const demVotes = tally["DEM"] || 0;
  const repVotes = tally["REP"] || 0;
  const otherVotes = Object.entries(tally).filter(([p]) => p !== "DEM" && p !== "REP").reduce((s, [,v]) => s + v, 0);

  const thresholdLabel = viewMode === "President" ? "270 TO WIN" : viewMode === "Senate" ? "50 FOR CONTROL" : viewMode === "House" ? "218 TO WIN" : "WINNER";
  
  const topParty = parties[0]?.[0] || "OTHER";
  const secondParty = parties[1]?.[0] || "OTHER";

  // Render dummy candidates/popular vote for NYT style
  // Since we don't have historical candidate lists wired in, we'll use placeholders styled properly

  let netGainStr = "";
  if (viewMode === "House" || viewMode === "Senate") {
    const currIdx = ELECTORAL_HISTORY.findIndex(h => h.year === year);
    if (currIdx > 0) {
      const prevYd = ELECTORAL_HISTORY[currIdx - 1];
      let prevCount = 0;
      const currCount = parties[0]?.[1] || 0;
      for (const sd of Object.values(prevYd.states)) {
        if (viewMode === "House") {
          prevCount += topParty === "DEM" ? sd.house.demReps : sd.house.repReps;
        } else if (viewMode === "Senate") {
          if (sd.senate.party1 === topParty) prevCount++;
          if (sd.senate.party2 === topParty) prevCount++;
        }
      }
      const delta = currCount - prevCount;
      if (delta > 0) netGainStr = `+${delta} net gain`;
      else if (delta < 0) netGainStr = `${delta} net loss`;
      else netGainStr = "No net change";
    }
  }

  return (
    <div className="mb-6">
      {/* ── METADATA BAR ──────────────────────────────────────────────────────── */}
      <div className="mb-6 flex items-end justify-between px-1">
        {/* Left Candidate */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-black text-[#F5F0E8]">{parties[0]?.[1] || 0}</span>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: PARTY_COLORS[parties[0]?.[0]] }}>
                {viewMode === "President" ? (
                  parties[0]?.[0] === "DEM" ? yd.demCandidate : 
                  parties[0]?.[0] === "REP" ? yd.repCandidate : 
                  (yd.thirdPartyCandidates?.[parties[0]?.[0]] || PARTY_FULL_NAMES[parties[0]?.[0]] || parties[0]?.[0])
                ) : PARTY_FULL_NAMES[parties[0]?.[0]] || parties[0]?.[0]}
                <span className="ml-1 text-white">✓</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Candidate */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: PARTY_COLORS[parties[1]?.[0]] }}>
                {viewMode === "President" ? (
                  parties[1]?.[0] === "DEM" ? yd.demCandidate : 
                  parties[1]?.[0] === "REP" ? yd.repCandidate : 
                  (yd.thirdPartyCandidates?.[parties[1]?.[0]] || PARTY_FULL_NAMES[parties[1]?.[0]] || parties[1]?.[0])
                ) : PARTY_FULL_NAMES[parties[1]?.[0]] || parties[1]?.[0]}
              </span>
            </div>
            <span className="font-display text-2xl font-black text-[#F5F0E8]">{parties[1]?.[1] || 0}</span>
          </div>
        </div>
      </div>

      {/* ── THE PROGRESS BAR ──────────────────────────────────────────────────── */}
      <div className="relative h-4 w-full bg-[#1A1F3A]">
        {/* Blue Bar (Democrat) */}
        <motion.div 
          initial={false}
          animate={{ width: `${(demVotes / totalSeats) * 100}%` }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-y-0 left-0 bg-[#4169E1]" 
        />
        
        {/* Red Bar (Republican) */}
        <motion.div 
          initial={false}
          animate={{ width: `${(repVotes / totalSeats) * 100}%` }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-y-0 right-0 bg-[#E64141]" 
        />

        {/* 3rd Party / Other fill (Only if significant) */}
        {parties.filter(([p, v]) => p !== "DEM" && p !== "REP" && v > 1).map(([p, v]) => {
          // This is a simplified positioning: placing them in the gap
          // In a real battle-for-center, they sit between the two major parties
          const w = (v / totalSeats) * 100;
          return (
            <motion.div key={p}
              initial={false}
              animate={{ width: `${w}%`, left: `${(demVotes / totalSeats) * 100}%` }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-y-0 opacity-80"
              style={{ background: PARTY_COLORS[p] || "#9932CC" }}
            />
          );
        })}

        {/* Center Threshold Line */}
        <div className="absolute inset-y-0 left-1/2 z-10 w-[1px] -translate-x-1/2 bg-[#F5F0E8]/40" />
        
        {/* Threshold Label (Above the bar) */}
        <div className="absolute left-1/2 -top-[16px] z-20 -translate-x-1/2 whitespace-nowrap bg-[#080B12] px-1 font-mono text-[8px] font-bold tracking-tighter text-[#8A8780]">
          {thresholdLabel}
        </div>
      </div>

      {/* ── BOTTOM DATA BAR ───────────────────────────────────────────────────── */}
      {viewMode === "President" && (
        <div className="mt-1 flex justify-between font-mono text-[9px] text-[#8A8780]">
          <span>{parties[0]?.[0] === "DEM" ? yd.demPopVote.toLocaleString() : parties[0]?.[0] === "REP" ? yd.repPopVote.toLocaleString() : "---"} votes ({parties[0]?.[0] === "DEM" ? ((yd.demPopVote / yd.totalPopVote) * 100).toFixed(1) : parties[0]?.[0] === "REP" ? ((yd.repPopVote / yd.totalPopVote) * 100).toFixed(1) : "---"}%)</span>
          <span>{(yd.totalPopVote / 1000000).toFixed(1)}M total votes</span>
          <span>{parties[1]?.[0] === "DEM" ? yd.demPopVote.toLocaleString() : parties[1]?.[0] === "REP" ? yd.repPopVote.toLocaleString() : "---"} votes ({parties[1]?.[0] === "DEM" ? ((yd.demPopVote / yd.totalPopVote) * 100).toFixed(1) : parties[1]?.[0] === "REP" ? ((yd.repPopVote / yd.totalPopVote) * 100).toFixed(1) : "---"}%)</span>
        </div>
      )}
      
      {viewMode === "Senate" && (
        <div className="mt-1 flex justify-between font-mono text-[9px] text-[#8A8780]">
          <span>67 seats not up for election</span>
          <span style={{ color: PARTY_COLORS[topParty] }}>{netGainStr}</span>
        </div>
      )}

      {viewMode === "House" && (
        <div className="mt-1 flex justify-between font-mono text-[9px] text-[#8A8780]">
          <span style={{ color: PARTY_COLORS[topParty] }}>{netGainStr}</span>
          <span></span>
        </div>
      )}
    </div>
  );
}
