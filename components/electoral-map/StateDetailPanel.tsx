"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ELECTORAL_HISTORY, getStateData, getFlipData, PARTY_COLORS, STATE_ADMISSION } from "@/lib/data/electoral-data";

function pc(p: string) { return PARTY_COLORS[p] || "#C9A84C"; }

export function StateDetailPanel({
  stateName, year, onClose, isRo,
}: { stateName: string; year: number; onClose: () => void; isRo?: boolean }) {
  const data = getStateData(year, stateName);
  const flip = getFlipData(year, stateName);
  const admitted = STATE_ADMISSION[stateName];
  const [sparkTip, setSparkTip] = useState<{ year: number; party: string } | null>(null);

  const history = ELECTORAL_HISTORY
    .filter(yd => yd.states[stateName])
    .map(yd => ({ year: yd.year, party: yd.states[stateName]?.president.party || "" }));

  const races: { label: string; party: string; detail: string; flipped: boolean }[] = [
    {
      label: isRo ? "Președinte" : "President",
      party: data.president.party,
      detail: data.president.party,
      flipped: flip.presFlip,
    },
    {
      label: isRo ? "Senat" : "Senate",
      party: data.senate.party1,
      detail: data.senate.split ? `${data.senate.party1} / ${data.senate.party2}` : data.senate.party1,
      flipped: flip.senFlip1 || flip.senFlip2,
    },
    {
      label: isRo ? "Cameră" : "House",
      party: data.house.demReps >= data.house.repReps ? "DEM" : "REP",
      detail: `${data.house.demReps} DEM · ${data.house.repReps} REP`,
      flipped: flip.houseFlipDem > 0 || flip.houseFlipRep > 0,
    },
    {
      label: isRo ? "Guvernator" : "Governor",
      party: data.governor.party,
      detail: data.governor.party,
      flipped: flip.govFlip,
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
          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center text-[#6B6860] transition-colors hover:text-[#F5F0E8] font-mono text-xs">
          ✕
        </button>

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <h2 className="mb-1 pr-8 font-display text-4xl font-black leading-none text-[#F5F0E8]">
          {stateName}
        </h2>
        <div className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#6B6860]"
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
              style={{ borderLeftWidth: 3, borderLeftColor: pc(r.party) }}
            >
              <div className="px-3 py-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#6B6860]">
                    {r.label}
                  </span>
                  {r.flipped && (
                    <span className="animate-pulse rounded-sm bg-[#C9A84C]/20 px-1 py-[1px] font-mono text-[7px] font-bold uppercase tracking-widest text-[#C9A84C]">
                      FLIP
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-[1px]" style={{ background: pc(r.party) }} />
                  <span className="font-mono text-[12px] font-bold text-[#F5F0E8]">
                    {r.detail}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── House Detail (if data exists) ────────────────────────────────── */}
        {data.house.totalReps > 0 && (
          <div className="mb-5">
            <p className="mb-1.5 font-mono text-[8px] uppercase tracking-widest text-[#6B6860]">
              {isRo ? "Distribuție Cameră" : "House Breakdown"}
            </p>
            <div className="flex h-3 w-full overflow-hidden rounded-[1px]">
              <div style={{ width: `${(data.house.demReps / data.house.totalReps) * 100}%`, background: pc("DEM") }} />
              <div style={{ width: `${(data.house.repReps / data.house.totalReps) * 100}%`, background: pc("REP") }} />
            </div>
            <div className="mt-1 flex justify-between font-mono text-[8px] text-[#6B6860]" style={{ fontVariantNumeric: "tabular-nums" }}>
              <span>DEM {data.house.demReps}</span>
              <span>{data.house.totalReps} {isRo ? "total" : "total"}</span>
              <span>REP {data.house.repReps}</span>
            </div>
          </div>
        )}

        {/* ── HISTORY SPARKLINE (CENTERPIECE) ─────────────────────────────── */}
        {history.length > 0 && (
          <div>
            <p className="mb-2 font-mono text-[8px] uppercase tracking-widest text-[#6B6860]">
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
            <div className="mt-1 flex justify-between font-mono text-[6px] text-[#6B6860]" style={{ fontVariantNumeric: "tabular-nums" }}>
              <span>{history[0]?.year}</span>
              {sparkTip && (
                <span className="text-[#F5F0E8]">
                  {sparkTip.year} · <span style={{ color: pc(sparkTip.party) }}>{sparkTip.party}</span>
                </span>
              )}
              <span>{history[history.length - 1]?.year}</span>
            </div>

            {/* Year marker for current */}
            <div className="mt-1 flex justify-between font-mono text-[7px]">
              <span className="text-[#6B6860]">{history.length} {isRo ? "alegeri" : "elections"}</span>
              <span className="text-[#C9A84C]">▲ {year}</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
