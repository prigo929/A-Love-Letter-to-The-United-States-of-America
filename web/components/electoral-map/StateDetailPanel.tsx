"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ELECTORAL_HISTORY, getStateData, getFlipData, PARTY_COLORS, STATE_ADMISSION, PARTY_FULL_NAMES, CONGRESS_DATA } from "@/lib/data/electoral-data";

function pc(p: string) { return PARTY_COLORS[p] || "#C9A84C"; }

/**
 * StateDetailPanel: A deep-dive sidebar for a specific state's historical data.
 * 
 * Features:
 * - Multi-Level Summary: Shows winners for President, Senate, House, and Governor.
 * - Historical Sparkline: A visual timeline of every presidential election result for 
 *   this specific state since its admission to the Union.
 * - Admittance Context: Shows the year the state joined the United States.
 */
export function StateDetailPanel({
  stateName, year, onClose, isRo,
}: { stateName: string; year: number; onClose: () => void; isRo?: boolean }) {
  const data = getStateData(year, stateName);
  const flip = getFlipData(year, stateName);
  const cd = CONGRESS_DATA[year] || { p1: "DEM", p2: "REP" };
  const admitted = STATE_ADMISSION[stateName];
  const [sparkTip, setSparkTip] = useState<{ year: number; party: string } | null>(null);

  const history = ELECTORAL_HISTORY
    .filter(yd => yd.states[stateName])
    .map(yd => ({ year: yd.year, party: yd.states[stateName]?.president.party || "" }));

  const races: { label: string; blocks: { party: string; detail: string; flipped: boolean }[] }[] = [
    {
      label: isRo ? "Președinte" : "President",
      blocks: [{ 
        party: data.president.party, 
        detail: data.president.candidate ? `${data.president.candidate} (${PARTY_FULL_NAMES[data.president.party] || data.president.party})` : (PARTY_FULL_NAMES[data.president.party] || data.president.party), 
        flipped: flip.presFlip 
      }],
    },
    {
      label: isRo ? "Senat" : "Senate",
      blocks: data.senate.split
        ? [
            { party: data.senate.party1, detail: PARTY_FULL_NAMES[data.senate.party1] || data.senate.party1, flipped: flip.senFlip1 },
            { party: data.senate.party2, detail: PARTY_FULL_NAMES[data.senate.party2] || data.senate.party2, flipped: flip.senFlip2 },
          ]
        : [{ party: data.senate.party1, detail: PARTY_FULL_NAMES[data.senate.party1] || data.senate.party1, flipped: flip.senFlip1 || flip.senFlip2 }],
    },
    {
      label: isRo ? "Cameră" : "House",
      blocks: [{
        party: data.house.p1Reps >= data.house.p2Reps ? cd.p1 : cd.p2,
        detail: `${data.house.p1Reps} ${cd.p1} · ${data.house.p2Reps} ${cd.p2}`,
        flipped: flip.houseFlipDem > 0 || flip.houseFlipRep > 0,
      }],
    },
    {
      label: isRo ? "Guvernator" : "Governor",
      blocks: [{ party: data.governor.party, detail: PARTY_FULL_NAMES[data.governor.party] || data.governor.party, flipped: flip.govFlip }],
    },
  ];

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute right-0 top-0 bottom-0 z-20 w-80 overflow-y-auto border-l border-[rgba(201,168,76,0.12)] bg-[#060910]/[0.98] backdrop-blur-lg"
    >
      <div className="p-5">
        {/* Close */}
        <button onClick={onClose}
          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center text-[#6B6860] transition-colors hover:text-[#F5F0E8] font-body text-xs">
          ✕
        </button>

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <h2 className="mb-1 pr-8 font-display text-4xl font-black leading-none text-[#F5F0E8]">
          {stateName}
        </h2>
        <div className="mb-5 flex items-center gap-2 font-body text-[10px] uppercase tracking-widest text-[#6B6860]"
          style={{ fontVariantNumeric: "tabular-nums" }}>
          {admitted && (
            <span className="border border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.04)] px-1.5 py-0.5">
              {isRo ? "ADMIS" : "ADMITTED"} {admitted}
            </span>
          )}
          <span>•</span>
          <span className="border border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.04)] px-1.5 py-0.5">
            {data.electoralVotes} EV
          </span>
          <span>•</span>
          <span className="text-[#C9A84C]">{year}</span>
        </div>

        {/* ── THE 4 RACES ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {races.map((r) => (
            <div key={r.label}
              className="relative overflow-hidden border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)]"
              style={{ borderLeftWidth: 3, borderLeftColor: pc(r.blocks[0].party) }}
            >
              <div className="px-3 py-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-body text-[8px] uppercase tracking-widest text-[#6B6860]">
                    {r.label}
                  </span>
                  {r.blocks.length === 1 && r.blocks[0].flipped && (
                    <span className="animate-pulse rounded-sm bg-[#C9A84C]/20 px-1 py-[1px] font-body text-[7px] font-bold uppercase tracking-widest text-[#C9A84C]">
                      FLIP
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-col gap-1">
                  {r.blocks.map((b, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-[1px]" style={{ background: pc(b.party) }} />
                        <span className="font-body text-[12px] font-bold text-[#F5F0E8]">
                          {b.detail}
                        </span>
                      </div>
                      {r.blocks.length > 1 && b.flipped && (
                        <span className="animate-pulse rounded-sm bg-[#C9A84C]/20 px-1 py-[1px] font-body text-[7px] font-bold uppercase tracking-widest text-[#C9A84C]">
                          FLIP
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── House Detail (if data exists) ────────────────────────────────── */}
        {data.house.totalReps > 0 && (
          <div className="mb-5">
            <p className="mb-1.5 font-body text-[8px] uppercase tracking-widest text-[#6B6860]">
              {isRo ? "Distribuție Cameră" : "House Breakdown"}
            </p>
            <div className="flex h-3 w-full overflow-hidden rounded-[1px]">
              <div style={{ width: `${(data.house.p1Reps / data.house.totalReps) * 100}%`, background: pc(cd.p1) }} />
              <div style={{ width: `${(data.house.p2Reps / data.house.totalReps) * 100}%`, background: pc(cd.p2) }} />
            </div>
            <div className="mt-1 flex justify-between font-body text-[8px] text-[#6B6860]" style={{ fontVariantNumeric: "tabular-nums" }}>
              <span>{cd.p1} {data.house.p1Reps}</span>
              <span>{data.house.totalReps} {isRo ? "total" : "total"}</span>
              <span>{cd.p2} {data.house.p2Reps}</span>
            </div>
          </div>
        )}

            {/* ── HISTORY SPARKLINE (CENTERPIECE) ─────────────────────────────── */}
        {history.length > 0 && (
/* This sparkline provides a generational view of the state's political shifts. */
            <div>
              <p className="mb-2 font-body text-[8px] uppercase tracking-widest text-[#6B6860]">
                {isRo ? "Istorie Prezidențială" : "Presidential History"} · {history[0]?.year}–{history[history.length - 1]?.year}
              </p>
            <div className="relative flex items-end gap-[2px]" style={{ height: 80 }}>
              {history.map((h) => {
                const isActive = h.year === year;
                const isHov = sparkTip?.year === h.year;
                return (
                  <div
                    key={h.year}
                    className="group relative flex-1 cursor-pointer"
                    style={{ height: "100%" }}
                    onMouseEnter={() => setSparkTip({ year: h.year, party: h.party })}
                    onMouseLeave={() => setSparkTip(null)}
                  >
                    <div
                      className="absolute bottom-0 w-full rounded-t-[1px] transition-all duration-150"
                      style={{
                        height: isActive ? "100%" : isHov ? "85%" : "65%",
                        background: pc(h.party),
                        opacity: isActive ? 1 : isHov ? 0.85 : 0.4,
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Sparkline axis labels */}
            <div className="mt-1 flex justify-between font-body text-[6px] text-[#6B6860]" style={{ fontVariantNumeric: "tabular-nums" }}>
              <span>{history[0]?.year}</span>
              {sparkTip && (
                <span className="text-[#F5F0E8]">
                  {sparkTip.year} · <span style={{ color: pc(sparkTip.party) }}>{sparkTip.party}</span>
                </span>
              )}
              <span>{history[history.length - 1]?.year}</span>
            </div>

            {/* Year marker for current */}
            <div className="mt-1 flex justify-between font-body text-[7px]">
              <span className="text-[#6B6860]">{history.length} {isRo ? "alegeri" : "elections"}</span>
              <span className="text-[#C9A84C]">▲ {year}</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
