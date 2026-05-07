"use client";
import { motion } from "framer-motion";
import { ELECTORAL_HISTORY } from "@/lib/data/electoral-data";

export function ElectoralVoteBar({ year, isRo }: { year: number; isRo?: boolean }) {
  const yd = ELECTORAL_HISTORY.find((d) => d.year === year) || ELECTORAL_HISTORY[0];
  let dem = 0, rep = 0;
  for (const sd of Object.values(yd.states)) {
    if (sd.president.party === "DEM") dem += sd.electoralVotes;
    else rep += sd.electoralVotes;
  }
  const total = dem + rep || 1;
  const demPct = (dem / total) * 100;
  const winThreshold = 270;
  const thresholdPct = (winThreshold / total) * 100;

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-[#1E5AA8]" style={{ fontVariantNumeric: "tabular-nums" }}>
          {isRo ? "Democrat" : "Democrat"} · {dem}
        </span>
        <span className="font-body text-[10px] uppercase tracking-[0.15em] text-[#6B6860]">
          {winThreshold} {isRo ? "pentru victorie" : "to win"}
        </span>
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-[#B22234]" style={{ fontVariantNumeric: "tabular-nums" }}>
          {rep} · {isRo ? "Republican" : "Republican"}
        </span>
      </div>
      <div className="relative h-5 w-full overflow-hidden rounded-sm bg-[#1A1F3A]">
        <motion.div
          className="absolute inset-y-0 left-0 bg-[#1E5AA8]"
          animate={{ width: `${demPct}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-y-0 right-0 bg-[#B22234]"
          animate={{ width: `${100 - demPct}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        {/* 270 marker */}
        <div
          className="absolute inset-y-0 w-[2px] bg-[#C9A84C] z-10"
          style={{ left: `${thresholdPct}%` }}
        />
        <div
          className="absolute top-[-18px] z-10 -translate-x-1/2 font-body text-[9px] font-bold text-[#C9A84C]"
          style={{ left: `${thresholdPct}%` }}
        >
          {winThreshold}
        </div>
      </div>
    </div>
  );
}
