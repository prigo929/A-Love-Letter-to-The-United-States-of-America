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

  const isOffYear = viewMode === "President" && yd.demPopVote === 0 && !yd.unopposed;
  const parties = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const total = Object.values(yd.states).reduce((s, sd) => s + (viewMode === "President" ? sd.electoralVotes : 0), 0) || parties.reduce((s, [, v]) => s + v, 0) || 1;
  const totalSeats = viewMode === "President" ? total : viewMode === "Senate" ? 100 : viewMode === "House" ? 435 : total;
  
  const demVotes = isOffYear ? 0 : (tally["DEM"] || 0);
  const repVotes = isOffYear ? 0 : (tally["REP"] || 0);
  const otherVotes = isOffYear ? 0 : Object.entries(tally).filter(([p]) => p !== "DEM" && p !== "REP").reduce((s, [,v]) => s + v, 0);

  const thresholdLabel = isRo 
    ? (viewMode === "President" ? "270 PENTRU VICTORIE" : viewMode === "Senate" ? "50 PENTRU CONTROL" : viewMode === "House" ? "218 PENTRU VICTORIE" : "CÂȘTIGĂTOR")
    : (viewMode === "President" ? "270 TO WIN" : viewMode === "Senate" ? "50 FOR CONTROL" : viewMode === "House" ? "218 TO WIN" : "WINNER");
  
  const topParty = parties[0]?.[0] || "OTHER";
  const secondParty = parties[1]?.[0] || "OTHER";

  // Render dummy candidates/popular vote for NYT style
  // Since we don't have historical candidate lists wired in, we'll use placeholders styled properly

  let netGainStr = "";
  if (viewMode === "House" || viewMode === "Senate" || viewMode === "Governor") {
    const currIdx = ELECTORAL_HISTORY.findIndex(h => h.year === year);
    if (currIdx > 0) {
      const prevYd = ELECTORAL_HISTORY[currIdx - 1];
      let prevCount = 0;
      let currCount = 0;
      for (const sd of Object.values(yd.states)) {
        if (viewMode === "House") currCount += topParty === "DEM" ? sd.house.demReps : sd.house.repReps;
        else if (viewMode === "Senate") {
          if (sd.senate.party1 === topParty) currCount++;
          if (sd.senate.party2 === topParty) currCount++;
        }
        else if (viewMode === "Governor") {
          if (sd.governor.party === topParty) currCount++;
        }
      }
      for (const sd of Object.values(prevYd.states)) {
        if (viewMode === "House") prevCount += topParty === "DEM" ? sd.house.demReps : sd.house.repReps;
        else if (viewMode === "Senate") {
          if (sd.senate.party1 === topParty) prevCount++;
          if (sd.senate.party2 === topParty) prevCount++;
        }
        else if (viewMode === "Governor") {
          if (sd.governor.party === topParty) prevCount++;
        }
      }
      const delta = currCount - prevCount;
      if (delta > 0) netGainStr = isRo ? `+${delta} câștig net` : `+${delta} net gain`;
      else if (delta < 0) netGainStr = isRo ? `${delta} pierdere netă` : `${delta} net loss`;
      else netGainStr = isRo ? "Fără schimbări nete" : "No net change";
    }
  }

  let notUpCount = 0;
  if (viewMode === "Senate" || viewMode === "Governor") {
    const total = viewMode === "Senate" ? 100 : 50;
    const upCount = Object.values(yd.states).filter(s => viewMode === "Senate" ? s.senate.active : s.governor.active).length;
    notUpCount = total - upCount;
  }


  return (
    <div className="mb-6">
      {/* ── METADATA BAR ──────────────────────────────────────────────────────── */}
      <div className="mb-6 flex h-[32px] items-end justify-between px-1">
        {isOffYear ? (
          <div className="flex w-full items-center justify-center">
             {/* Empty space to maintain layout but hide candidates */}
          </div>
        ) : (
          <>
            {/* Left Candidate (Winner if Unopposed) */}
            <div className={yd.unopposed ? "flex w-full flex-col items-center justify-center" : "flex flex-col items-start"}>
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl font-black text-[#F5F0E8]">{parties[0]?.[1] || 0}</span>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: PARTY_COLORS[parties[0]?.[0]] }}>
                    {viewMode === "President" ? (
                      (yd.thirdPartyCandidates?.[parties[0]?.[0]] || 
                       ((parties[0]?.[0] === "DEM" || (year < 1860 && parties[0]?.[0] === "DR")) ? yd.demCandidate :
                        (parties[0]?.[0] === "REP" || (year < 1860 && parties[0]?.[0] === "FED")) ? yd.repCandidate : 
                        yd.demCandidate || PARTY_FULL_NAMES[parties[0]?.[0]] || parties[0]?.[0])
                      )
                    ) : PARTY_FULL_NAMES[parties[0]?.[0]] || parties[0]?.[0]}
                    {!isOffYear && parties[0]?.[1] > (parties[1]?.[1] || 0) && <span className="ml-1 text-white">✓</span>}
                  </span>
                  {viewMode === "President" && !isOffYear && (
                    <span className="font-mono text-[9px] text-[#8A8780] opacity-80">
                      {(parties[0]?.[0] === "DEM" || (year < 1860 && parties[0]?.[0] === "DR")) ? yd.demPopVote.toLocaleString() : 
                       (parties[0]?.[0] === "REP" || (year < 1860 && parties[0]?.[0] === "FED")) ? yd.repPopVote.toLocaleString() : ""}
                    </span>
                  )}
                  {yd.unopposed && <span className="font-mono text-[8px] text-[#8A8780] uppercase tracking-tighter">{isRo ? "FĂRĂ OPOZIȚIE" : "UNOPPOSED"}</span>}
                </div>
              </div>
            </div>

            {/* Right Candidate (Hide if Unopposed) */}
            {!yd.unopposed && parties[1] && (
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: PARTY_COLORS[parties[1]?.[0]] }}>
                      {viewMode === "President" ? (
                        (yd.thirdPartyCandidates?.[parties[1]?.[0]] || 
                         ((parties[1]?.[0] === "DEM" || (year < 1860 && parties[1]?.[0] === "DR")) ? yd.demCandidate :
                          (parties[1]?.[0] === "REP" || (year < 1860 && parties[1]?.[0] === "FED")) ? yd.repCandidate : 
                          yd.repCandidate || PARTY_FULL_NAMES[parties[1]?.[0]] || parties[1]?.[0])
                        )
                      ) : PARTY_FULL_NAMES[parties[1]?.[0]] || parties[1]?.[0]}
                    </span>
                    {viewMode === "President" && !isOffYear && (
                      <span className="font-mono text-[9px] text-[#8A8780] opacity-80">
                        {(parties[1]?.[0] === "DEM" || (year < 1860 && parties[1]?.[0] === "DR")) ? yd.demPopVote.toLocaleString() : 
                         (parties[1]?.[0] === "REP" || (year < 1860 && parties[1]?.[0] === "FED")) ? yd.repPopVote.toLocaleString() : ""}
                      </span>
                    )}
                  </div>
                  <span className="font-display text-2xl font-black text-[#F5F0E8]">{parties[1]?.[1] || 0}</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── THE PROGRESS BAR ──────────────────────────────────────────────────── */}
      <div className="relative h-4 w-full bg-[#1A1F3A]">
          {/* Blue Bar (Democrat) */}
          <motion.div 
            initial={false}
            animate={{ width: yd.unopposed ? "0%" : `${(demVotes / totalSeats) * 100}%` }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-y-0 left-0 bg-[#4169E1]" 
          />
          
          {/* Red Bar (Republican) */}
          <motion.div 
            initial={false}
            animate={{ width: yd.unopposed ? (parties[0]?.[0] === "REP" ? "100%" : "0%") : `${(repVotes / totalSeats) * 100}%` }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-y-0 right-0 bg-[#E64141]" 
          />

          {/* 3rd Party / Other fill (Washington FED/Independent) */}
          {parties.filter(([p, v]) => p !== "DEM" && p !== "REP" && v > 1).map(([p, v]) => {
            const w = yd.unopposed ? 100 : (v / totalSeats) * 100;
            return (
              <motion.div key={p}
                initial={false}
                animate={{ width: `${w}%`, left: yd.unopposed ? "0%" : `${(demVotes / totalSeats) * 100}%` }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-y-0 opacity-80"
                style={{ background: PARTY_COLORS[p] || "#9932CC" }}
              />
            );
          })}

          {/* Center Threshold Line */}
          <div className="absolute inset-y-0 left-1/2 z-10 w-[3px] -translate-x-1/2 bg-black" />
          
          {/* Threshold Label (Above the bar) */}
          <div className="absolute left-1/2 -top-[16px] z-20 -translate-x-1/2 whitespace-nowrap bg-[#080B12] px-1 font-mono text-[8px] font-bold tracking-tighter text-[#8A8780]">
            {thresholdLabel}
          </div>
        </div>
      {/* ── BOTTOM DATA BAR ───────────────────────────────────────────────────── */}
      {viewMode === "President" && (
        <div className="mt-1 flex justify-between font-mono text-[9px] text-[#8A8780]">
          <span>{parties[0]?.[0] === "DEM" ? yd.demPopVote.toLocaleString() : parties[0]?.[0] === "REP" ? yd.repPopVote.toLocaleString() : "---"} {isRo ? "voturi" : "votes"} ({parties[0]?.[0] === "DEM" ? ((yd.demPopVote / yd.totalPopVote) * 100).toFixed(1) : parties[0]?.[0] === "REP" ? ((yd.repPopVote / yd.totalPopVote) * 100).toFixed(1) : "---"}%)</span>
          <span>{(yd.totalPopVote / 1000000).toFixed(1)}M {isRo ? "voturi în total" : "total votes"}</span>
          <span>{parties[1]?.[0] === "DEM" ? yd.demPopVote.toLocaleString() : parties[1]?.[0] === "REP" ? yd.repPopVote.toLocaleString() : "---"} {isRo ? "voturi" : "votes"} ({parties[1]?.[0] === "DEM" ? ((yd.demPopVote / yd.totalPopVote) * 100).toFixed(1) : parties[1]?.[0] === "REP" ? ((yd.repPopVote / yd.totalPopVote) * 100).toFixed(1) : "---"}%)</span>
        </div>
      )}
      
      {viewMode === "Senate" && (
        <div className="mt-1 flex justify-between font-mono text-[9px] text-[#8A8780]">
          <span>{notUpCount} {isRo ? "locuri nu se aleg acum" : "seats not up for election"}</span>
          <span style={{ color: PARTY_COLORS[topParty] }}>{netGainStr}</span>
        </div>
      )}

      {viewMode === "Governor" && (
        <div className="mt-1 flex justify-between font-mono text-[9px] text-[#8A8780]">
          <span>{notUpCount} {isRo ? "guvernatori nu se aleg acum" : "governors not up for election"}</span>
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
