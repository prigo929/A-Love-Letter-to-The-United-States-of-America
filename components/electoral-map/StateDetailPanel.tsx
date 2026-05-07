"use client";
import { motion } from "framer-motion";
import { ELECTORAL_HISTORY, getStateData, PARTY_COLORS, STATE_ADMISSION } from "@/lib/data/electoral-data";

function pc(p: string) { return PARTY_COLORS[p] || "#C9A84C"; }

export function StateDetailPanel({
  stateName, year, onClose, isRo,
}: { stateName: string; year: number; onClose: () => void; isRo?: boolean }) {
  const data = getStateData(year, stateName);
  const admitted = STATE_ADMISSION[stateName];
  const history = ELECTORAL_HISTORY.filter(yd => yd.states[stateName]).map(yd => ({
    year: yd.year, party: yd.states[stateName]?.president.party || "",
  }));

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute right-0 top-0 bottom-0 z-20 w-64 overflow-y-auto border-l border-[rgba(201,168,76,0.15)] bg-[#080B12]/98 p-3 backdrop-blur-md"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-body text-base font-bold text-[#F5F0E8]">{stateName}</h3>
        <button onClick={onClose} className="text-[#6B6860] hover:text-[#F5F0E8] transition-colors font-mono text-sm">✕</button>
      </div>
      <div className="mb-3 flex items-center gap-2 font-mono text-[9px] text-[#8A8780]">
        <span style={{ fontVariantNumeric: "tabular-nums" }}>{year}</span>
        <span>·</span>
        <span>{data.electoralVotes} EV</span>
        {admitted && <><span>·</span><span>{isRo ? "Admis" : "Admitted"} {admitted}</span></>}
      </div>

      {data.president.party && [
        { label: isRo ? "Președinte" : "President", party: data.president.party, detail: data.president.flipped ? "⟳ Flipped" : data.president.party },
        { label: isRo ? "Senat" : "Senate", party: data.senate.party1, detail: data.senate.split ? `${data.senate.party1}/${data.senate.party2}` : data.senate.party1 },
        { label: isRo ? "Cameră" : "House", party: data.house.demReps >= data.house.repReps ? "DEM" : "REP", detail: `D${data.house.demReps} R${data.house.repReps}` },
        { label: isRo ? "Guvernator" : "Governor", party: data.governor.party, detail: data.governor.party },
      ].map((row) => (
        <div key={row.label} className="mb-2 border border-[rgba(201,168,76,0.06)] bg-white/[0.02] p-2">
          <p className="font-mono text-[8px] uppercase tracking-widest text-[#6B6860]">{row.label}</p>
          <div className="mt-0.5 flex items-center gap-1.5">
            <div className="h-[6px] w-[6px]" style={{ background: pc(row.party) }} />
            <span className="font-mono text-[11px] font-semibold text-[#F5F0E8]">{row.detail}</span>
          </div>
        </div>
      ))}

      {history.length > 0 && (
        <>
          <p className="mt-3 mb-1.5 font-mono text-[8px] uppercase tracking-widest text-[#6B6860]">
            {isRo ? "Istorie" : "History"}
          </p>
          <div className="flex gap-[2px]">
            {history.map((h) => (
              <div key={h.year} className="flex-1 text-center" title={`${h.year}: ${h.party}`}>
                <div className="mx-auto h-5 w-full" style={{ background: pc(h.party), opacity: h.year === year ? 1 : 0.45 }} />
                {(h.year === year || h.year === history[0]?.year || h.year === history[history.length-1]?.year) && (
                  <p className="mt-0.5 font-mono text-[5px] text-[#6B6860]">{String(h.year).slice(-2)}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
