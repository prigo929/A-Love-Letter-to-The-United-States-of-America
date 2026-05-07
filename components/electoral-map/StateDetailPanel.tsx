"use client";
import { motion } from "framer-motion";
import { ELECTORAL_HISTORY, getStateData } from "@/lib/data/electoral-data";

function partyColor(p: string) {
  return p === "DEM" ? "#1E5AA8" : p === "REP" ? "#B22234" : "#C9A84C";
}

export function StateDetailPanel({
  stateName, year, onClose, isRo,
}: { stateName: string; year: number; onClose: () => void; isRo?: boolean }) {
  const data = getStateData(year, stateName);
  const history = ELECTORAL_HISTORY.map((yd) => ({
    year: yd.year,
    party: yd.states[stateName]?.president.party || "REP",
  }));

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute right-0 top-0 bottom-0 z-20 w-72 overflow-y-auto rounded-l-sm border-l border-[rgba(201,168,76,0.15)] bg-[#0A0D14]/98 p-4 backdrop-blur-md"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-[#F5F0E8]">{stateName}</h3>
        <button onClick={onClose} className="text-[#6B6860] hover:text-[#F5F0E8] transition-colors text-lg">✕</button>
      </div>
      <p className="mb-4 font-body text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]" style={{ fontVariantNumeric: "tabular-nums" }}>
        {year} · {data.electoralVotes} {isRo ? "voturi electorale" : "electoral votes"}
      </p>

      {/* Data rows */}
      {[
        { label: isRo ? "Președinte" : "President", party: data.president.party, detail: data.president.flipped ? (isRo ? "Schimbare" : "Flipped") : "" },
        { label: isRo ? "Senat" : "Senate", party: data.senate.party1, detail: data.senate.split ? `${data.senate.party1}/${data.senate.party2}` : data.senate.party1 },
        { label: isRo ? "Cameră" : "House", party: data.house.demReps > data.house.repReps ? "DEM" : "REP", detail: `D${data.house.demReps} · R${data.house.repReps}` },
        { label: isRo ? "Guvernator" : "Governor", party: data.governor.party, detail: data.governor.party },
      ].map((row) => (
        <div key={row.label} className="mb-3 rounded-sm border border-[rgba(201,168,76,0.06)] bg-white/3 p-3">
          <p className="font-body text-[9px] uppercase tracking-[0.15em] text-[#6B6860]">{row.label}</p>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-[1px]" style={{ background: partyColor(row.party) }} />
            <span className="font-body text-sm font-semibold text-[#F5F0E8]" style={{ fontVariantNumeric: "tabular-nums" }}>{row.detail}</span>
          </div>
        </div>
      ))}

      {/* Mini history sparkline */}
      <p className="mt-4 mb-2 font-body text-[9px] uppercase tracking-[0.15em] text-[#6B6860]">
        {isRo ? "Istorie Prezidențială" : "Presidential History"}
      </p>
      <div className="flex gap-1">
        {history.map((h) => (
          <div key={h.year} className="flex-1 text-center">
            <div className="mx-auto h-6 w-full rounded-[1px]" style={{ background: partyColor(h.party), opacity: h.year === year ? 1 : 0.5 }} />
            <p className="mt-1 font-body text-[7px] text-[#6B6860]" style={{ fontVariantNumeric: "tabular-nums" }}>
              {String(h.year).slice(2)}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
