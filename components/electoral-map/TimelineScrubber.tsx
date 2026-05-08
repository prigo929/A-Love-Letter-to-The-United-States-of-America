"use client";
import { useRef, useCallback, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ELECTORAL_HISTORY, ERAS, ViewMode } from "@/lib/data/electoral-data";

const ALL_YEARS = ELECTORAL_HISTORY.map((d) => d.year);
const MIN_YEAR = ALL_YEARS[0];
const MAX_YEAR = ALL_YEARS[ALL_YEARS.length - 1];
const TRACK_H = 72;
const PX = 24;
const TW = 800;
const INNER = TW - PX * 2;

function yearToX(y: number) { return PX + ((y - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * INNER; }

export function TimelineScrubber({
  currentYear, onYearChange, isRo, viewMode,
}: { currentYear: number; onYearChange: (y: number) => void; isRo?: boolean; viewMode?: ViewMode; }) {
  const ref = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hoverY, setHoverY] = useState<number | null>(null);

  const years = useMemo(() => {
    if (viewMode === "President") return ALL_YEARS.filter(y => y % 4 === 0);
    return ALL_YEARS;
  }, [viewMode]);

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => {
      const idx = years.indexOf(currentYear);
      if (idx === -1) {
        const next = years.find(y => y > currentYear) || years[0];
        onYearChange(next);
      } else {
        onYearChange(idx < years.length - 1 ? years[idx + 1] : years[0]);
      }
    }, 1800);
    return () => clearInterval(iv);
  }, [playing, currentYear, onYearChange, years]);

  const snap = useCallback((cx: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (cx - r.left - (PX * r.width / TW)) / ((INNER * r.width) / TW)));
    let best = years[0], bestD = Infinity;
    for (const y of years) {
      const d = Math.abs((y - MIN_YEAR) / (MAX_YEAR - MIN_YEAR) - ratio);
      if (d < bestD) { bestD = d; best = y; }
    }
    onYearChange(best);
  }, [onYearChange, years]);

  const onDown = useCallback((e: React.PointerEvent) => {
    setDragging(true); setPlaying(false);
    (e.target as Element).setPointerCapture(e.pointerId);
    snap(e.clientX);
  }, [snap]);

  const showLabel = (y: number) => {
    if (y === currentYear || y === MIN_YEAR || y === MAX_YEAR) return true;
    return ERAS.some(era => era.start === y);
  };

  const phX = yearToX(currentYear);

  return (
    <div className="relative w-full select-none touch-none">
      <div className="mb-1.5 flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2">
          <button onClick={() => setPlaying(p => !p)}
            className="flex h-5 w-5 items-center justify-center border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.04)] text-[#C9A84C] transition-all hover:bg-[rgba(201,168,76,0.12)]"
            aria-label={playing ? "Pause" : "Play"}>
            <span className="text-[8px]">{playing ? "⏸" : "▶"}</span>
          </button>
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#6B6860]">
            {isRo ? "Cronologie" : "Timeline"} · {years.length} {isRo ? "alegeri" : "elections"}
          </span>
        </div>
        <motion.span key={currentYear} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="font-mono text-sm font-bold text-[#C9A84C]" style={{ fontVariantNumeric: "tabular-nums" }}>
          {currentYear}
        </motion.span>
      </div>

      <div className="relative w-full">
        <svg ref={ref} viewBox={`0 0 ${TW} ${TRACK_H}`}
          className="w-full cursor-pointer"
          onPointerDown={onDown}
          onPointerMove={(e) => { if (dragging) snap(e.clientX); }}
          onPointerUp={() => setDragging(false)}
          onPointerLeave={() => setDragging(false)}>

        {ERAS.map((era) => {
          const x1 = yearToX(Math.max(era.start, MIN_YEAR));
          const x2 = yearToX(Math.min(era.end, MAX_YEAR));
          return (
            <g key={era.label}>
              <rect x={x1} y={4} width={Math.max(0, x2 - x1)} height={TRACK_H - 8} fill={era.color} />
              <text x={(x1 + x2) / 2} y={12} textAnchor="middle"
                fill="rgba(201,168,76,0.25)" fontSize="6" fontFamily="'Inter',sans-serif"
                fontWeight="600" letterSpacing="0.1em">
                {era.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        <line x1={PX} y1={TRACK_H / 2} x2={TW - PX} y2={TRACK_H / 2}
          stroke="rgba(201,168,76,0.1)" strokeWidth={1} />

        {years.map((y) => {
          const x = yearToX(y);
          const active = y === currentYear;
          const hov = y === hoverY;
          return (
            <g key={y} onMouseEnter={() => setHoverY(y)} onMouseLeave={() => setHoverY(null)}>
              <line x1={x} y1={TRACK_H / 2 - (active ? 12 : 5)}
                x2={x} y2={TRACK_H / 2 + (active ? 12 : 5)}
                stroke={active ? "#C9A84C" : hov ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.15)"}
                strokeWidth={active ? 2 : 0.5} />
            </g>
          );
        })}

        <circle cx={phX} cy={TRACK_H / 2} r={dragging ? 5 : 3.5} fill="#C9A84C" />
        <circle cx={phX} cy={TRACK_H / 2} r={dragging ? 9 : 7}
          fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth={0.5} />
        </svg>

        <div className="absolute top-[75%] left-[3%] right-[3%] h-4 pointer-events-none md:top-[70%]">
          {years.map((y) => {
            const active = y === currentYear;
            const hov = y === hoverY;
            if (!showLabel(y) && !hov) return null;
            if (!active && y !== MIN_YEAR && y !== MAX_YEAR && Math.abs(y - currentYear) <= 12) return null;

            let positionClasses = "-translate-x-1/2";
            let leftStyle = `${((y - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100}%`;
            if (y === MIN_YEAR) { positionClasses = ""; leftStyle = "0%"; }
            else if (y === MAX_YEAR) { positionClasses = "-translate-x-full"; leftStyle = "100%"; }

            return (
              <div key={`lbl-${y}`} className={`absolute font-mono tracking-tighter whitespace-nowrap ${positionClasses} ${active ? "text-[10px] font-bold text-[#C9A84C] -translate-y-[6px] z-10" : hov ? "text-[9px] text-[rgba(201,168,76,0.6)] z-0" : "text-[9px] text-[rgba(201,168,76,0.3)] z-0"}`} style={{ left: leftStyle, fontVariantNumeric: "tabular-nums" }}>
                <span className={active ? "bg-[#080B12] px-1 py-0.5 rounded-sm" : ""}>{y}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

