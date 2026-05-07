"use client";
// ─── Timeline Scrubber ──────────────────────────────────────────────────────
// A custom SVG-based timeline at the bottom of the Electoral Archive Map.
// It renders tick marks for each election year and a draggable playhead.
// Built as an SVG track (not a generic <input range>) for the Bloomberg/WSJ
// editorial aesthetic.

import { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ELECTORAL_HISTORY } from "@/lib/data/electoral-data";

const YEARS = ELECTORAL_HISTORY.map((d) => d.year);
const MIN_YEAR = YEARS[0];
const MAX_YEAR = YEARS[YEARS.length - 1];

const TRACK_HEIGHT = 56;
const PADDING_X = 32;

export function TimelineScrubber({
  currentYear,
  onYearChange,
  isRo,
}: {
  currentYear: number;
  onYearChange: (year: number) => void;
  isRo?: boolean;
}) {
  const trackRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Autoplay: cycle through years every 2 seconds
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const idx = YEARS.indexOf(currentYear);
      const next = idx < YEARS.length - 1 ? YEARS[idx + 1] : YEARS[0];
      onYearChange(next);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlaying, currentYear, onYearChange]);

  // Snap to the nearest election year
  const snapToYear = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(
        0,
        Math.min(1, (clientX - rect.left - PADDING_X) / (rect.width - PADDING_X * 2))
      );
      let closest = YEARS[0];
      let minDist = Infinity;
      for (const y of YEARS) {
        const yRatio = (y - MIN_YEAR) / (MAX_YEAR - MIN_YEAR);
        const dist = Math.abs(yRatio - ratio);
        if (dist < minDist) { minDist = dist; closest = y; }
      }
      onYearChange(closest);
    },
    [onYearChange]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      setIsPlaying(false);
      (e.target as Element).setPointerCapture(e.pointerId);
      snapToYear(e.clientX);
    },
    [snapToYear]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (isDragging) snapToYear(e.clientX);
    },
    [isDragging, snapToYear]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const playheadRatio =
    YEARS.length > 1 ? (currentYear - MIN_YEAR) / (MAX_YEAR - MIN_YEAR) : 0;

  return (
    <div className="relative w-full">
      {/* Header with play button */}
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="flex h-6 w-6 items-center justify-center rounded-sm border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.06)] text-[#C9A84C] transition-all hover:bg-[rgba(201,168,76,0.15)]"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <span className="text-[10px]">{isPlaying ? "⏸" : "▶"}</span>
          </button>
          <span className="font-body text-[10px] uppercase tracking-[0.2em] text-[#6B6860]">
            {isRo ? "Cronologie Electorală" : "Electoral Timeline"}
          </span>
        </div>
        <motion.span
          key={currentYear}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-lg font-bold text-[#C9A84C]"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {currentYear}
        </motion.span>
      </div>

      {/* SVG Track */}
      <svg
        ref={trackRef}
        viewBox={`0 0 800 ${TRACK_HEIGHT}`}
        className="w-full cursor-pointer select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ touchAction: "none" }}
      >
        {/* Track Background */}
        <rect
          x={PADDING_X}
          y={TRACK_HEIGHT / 2 - 1}
          width={800 - PADDING_X * 2}
          height={2}
          fill="rgba(201, 168, 76, 0.15)"
          rx={1}
        />

        {/* Tick Marks for Each Year */}
        {YEARS.map((year) => {
          const ratio = (year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR);
          const x = PADDING_X + ratio * (800 - PADDING_X * 2);
          const isActive = year === currentYear;
          const isHovered = year === hoveredYear;

          return (
            <g
              key={year}
              onMouseEnter={() => setHoveredYear(year)}
              onMouseLeave={() => setHoveredYear(null)}
            >
              {/* Tick Line */}
              <line
                x1={x}
                y1={TRACK_HEIGHT / 2 - (isActive ? 14 : 8)}
                x2={x}
                y2={TRACK_HEIGHT / 2 + (isActive ? 14 : 8)}
                stroke={
                  isActive
                    ? "#C9A84C"
                    : isHovered
                      ? "rgba(201, 168, 76, 0.6)"
                      : "rgba(201, 168, 76, 0.25)"
                }
                strokeWidth={isActive ? 2.5 : 1}
                style={{ transition: "all 0.2s ease" }}
              />
              {/* Year Label */}
              <text
                x={x}
                y={TRACK_HEIGHT / 2 + (isActive ? 26 : 22)}
                textAnchor="middle"
                fill={
                  isActive
                    ? "#C9A84C"
                    : isHovered
                      ? "rgba(201, 168, 76, 0.7)"
                      : "rgba(201, 168, 76, 0.3)"
                }
                fontSize={isActive ? "10" : "8"}
                fontFamily="'Inter', sans-serif"
                fontWeight={isActive ? "700" : "500"}
                style={{ transition: "all 0.2s ease" }}
              >
                {year}
              </text>
            </g>
          );
        })}

        {/* Playhead Glow */}
        {(() => {
          const x = PADDING_X + playheadRatio * (800 - PADDING_X * 2);
          return (
            <>
              <circle
                cx={x}
                cy={TRACK_HEIGHT / 2}
                r={isDragging ? 7 : 5}
                fill="#C9A84C"
                style={{ transition: "r 0.15s ease" }}
              />
              <circle
                cx={x}
                cy={TRACK_HEIGHT / 2}
                r={isDragging ? 12 : 9}
                fill="none"
                stroke="rgba(201, 168, 76, 0.3)"
                strokeWidth={1}
                style={{ transition: "r 0.15s ease" }}
              />
            </>
          );
        })()}
      </svg>
    </div>
  );
}
