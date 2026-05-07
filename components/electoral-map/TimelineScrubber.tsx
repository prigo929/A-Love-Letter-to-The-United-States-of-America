"use client";
import { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ELECTORAL_HISTORY, ERAS } from "@/lib/data/electoral-data";

const YEARS = ELECTORAL_HISTORY.map((d) => d.year);
const MIN_YEAR = YEARS[0];
const MAX_YEAR = YEARS[YEARS.length - 1];
const TRACK_H = 72;
const PX = 24;
const TW = 800;
const INNER = TW - PX * 2;

function yearToX(y: number) { return PX + ((y - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * INNER; }

export function TimelineScrubber({
  currentYear, onYearChange, isRo,
}: { currentYear: number; onYearChange: (y: number) => void; isRo?: boolean; }) {
  const ref = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hoverY, setHoverY] = useState<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => {
      const idx = YEARS.indexOf(currentYear);
      onYearChange(idx < YEARS.length - 1 ? YEARS[idx + 1] : YEARS[0]);
    }, 1800);
    return () => clearInterval(iv);
  }, [playing, currentYear, onYearChange]);

  const snap = useCallback((cx: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (cx - r.left - (PX * r.width / TW)) / ((INNER * r.width) / TW)));
    let best = YEARS[0], bestD = Infinity;
    for (const y of YEARS) {
      const d = Math.abs((y - MIN_YEAR) / (MAX_YEAR - MIN_YEAR) - ratio);
      if (d < bestD) { bestD = d; best = y; }
    }
    onYearChange(best);
  }, [onYearChange]);

  const onDown = useCallback((e: React.PointerEvent) => {
    setDragging(true); setPlaying(false);
    (e.target as Element).setPointerCapture(e.pointerId);
    snap(e.clientX);
  }, [snap]);

  // Show labels for every ~20 years on dense timeline, all years if <15 elections
  const showLabel = (y: number) => {
    if (YEARS.length <= 15) return true;
    if (y === currentYear || y === MIN_YEAR || y === MAX_YEAR) return true;
    return y % 20 === 0 || y === hoverY;
  };

  const phX = yearToX(currentYear);

  return (
    <div className="relative w-full">
      <div className="mb-1.5 flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2">
          <button onClick={() => setPlaying(p => !p)}
            className="flex h-5 w-5 items-center justify-center border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.04)] text-[#C9A84C] transition-all hover:bg-[rgba(201,168,76,0.12)]"
            aria-label={playing ? "Pause" : "Play"}>
            <span className="text-[8px]">{playing ? "⏸" : "▶"}</span>
          </button>
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#6B6860]">
            {isRo ? "Cronologie" : "Timeline"} · {YEARS.length} {isRo ? "alegeri" : "elections"}
          </span>
        </div>
        <motion.span key={currentYear} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="font-mono text-sm font-bold text-[#C9A84C]" style={{ fontVariantNumeric: "tabular-nums" }}>
          {currentYear}
        </motion.span>
      </div>

      <svg ref={ref} viewBox={`0 0 ${TW} ${TRACK_H}`}
        className="w-full cursor-pointer select-none"
        onPointerDown={onDown}
        onPointerMove={(e) => { if (dragging) snap(e.clientX); }}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
        style={{ touchAction: "none" }}>

        {/* Era background bands */}
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

        {/* Track line */}
        <line x1={PX} y1={TRACK_H / 2} x2={TW - PX} y2={TRACK_H / 2}
          stroke="rgba(201,168,76,0.1)" strokeWidth={1} />

        {/* Tick marks */}
        {YEARS.map((y) => {
          const x = yearToX(y);
          const active = y === currentYear;
          const hov = y === hoverY;
          const label = showLabel(y);
          return (
            <g key={y} onMouseEnter={() => setHoverY(y)} onMouseLeave={() => setHoverY(null)}>
              <line x1={x} y1={TRACK_H / 2 - (active ? 12 : 5)}
                x2={x} y2={TRACK_H / 2 + (active ? 12 : 5)}
                stroke={active ? "#C9A84C" : hov ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.15)"}
                strokeWidth={active ? 2 : 0.5} />
              {label && (
                <text x={x} y={TRACK_H / 2 + (active ? 24 : 18)} textAnchor="middle"
                  fill={active ? "#C9A84C" : hov ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.2)"}
                  fontSize={active ? "8" : "6"} fontFamily="'Inter',monospace"
                  fontWeight={active ? "700" : "400"}>
                  {y}
                </text>
              )}
            </g>
          );
        })}

        {/* Playhead */}
        <circle cx={phX} cy={TRACK_H / 2} r={dragging ? 5 : 3.5} fill="#C9A84C" />
        <circle cx={phX} cy={TRACK_H / 2} r={dragging ? 9 : 7}
          fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth={0.5} />
      </svg>
    </div>
  );
}
