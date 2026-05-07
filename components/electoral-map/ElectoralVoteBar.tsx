"use client";
import { motion } from "framer-motion";
import { ELECTORAL_HISTORY, PARTY_COLORS } from "@/lib/data/electoral-data";

export function ElectoralVoteBar({ year, isRo }: { year: number; isRo?: boolean }) {
  const yd = ELECTORAL_HISTORY.find((d) => d.year === year) || ELECTORAL_HISTORY[0];
  // Tally by party
  const tally: Record<string, number> = {};
  for (const sd of Object.values(yd.states)) {
    const p = sd.president.party;
    tally[p] = (tally[p] || 0) + sd.electoralVotes;
  }
  const parties = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const total = parties.reduce((s, [, v]) => s + v, 0) || 1;
  const winThreshold = Math.floor(total / 2) + 1;
  const thresholdPct = (winThreshold / total) * 100;

  let offset = 0;
  return (
    <div className="mb-5">
      <div className="mb-1.5 flex items-center justify-between">
        {parties.map(([p, v]) => (
          <span key={p} className="font-mono text-[9px] uppercase tracking-widest" style={{ color: PARTY_COLORS[p] || "#C9A84C", fontVariantNumeric: "tabular-nums" }}>
            {p} · {v}
          </span>
        ))}
      </div>
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
        <div className="absolute inset-y-0 z-10 w-[1.5px] bg-[#C9A84C]" style={{ left: `${thresholdPct}%` }} />
        <div className="absolute -top-[14px] z-10 -translate-x-1/2 font-mono text-[7px] font-bold text-[#C9A84C]"
          style={{ left: `${thresholdPct}%`, fontVariantNumeric: "tabular-nums" }}>
          {winThreshold}
        </div>
      </div>
    </div>
  );
}
