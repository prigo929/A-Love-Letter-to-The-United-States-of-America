"use client";

// ─── Minimalist Monochrome Flag ──────────────────────────────────────────────
// Architectural, currency-engraved vector graphic of the United States Flag.
//  • Pure SVG vector art (zero video files, zero cloth physics).
//  • Official 1.9 : 1 proportions, 13 precision stripes, 50 geometric stars.
//  • Banknote engraving micro-hatching and laser-thin titanium rules.
//  • Monochromatic noir palette: pitch obsidian (#000000), charcoal, platinum.
//  • Subtle light-sweep metallic reflection on mount/hover.

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MinimalistMonochromeFlagProps {
  className?: string;
  opacity?: number;
  sweep?: boolean;
}

export function MinimalistMonochromeFlag({
  className,
  opacity = 0.16,
  sweep = true,
}: MinimalistMonochromeFlagProps) {
  // Official US Flag geometry (1.9 : 1 ratio)
  const W = 950;
  const H = 500;
  const stripeH = H / 13;
  const cantonW = W * 0.4;
  const cantonH = stripeH * 7;

  // Star geometry
  const starOuterR = cantonH * 0.038;
  const starInnerR = starOuterR * 0.382;

  const getStarPoints = (cx: number, cy: number) => {
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / 5;
    const points: string[] = [];
    for (let i = 0; i < 5; i++) {
      points.push(`${cx + Math.cos(rot) * starOuterR},${cy + Math.sin(rot) * starOuterR}`);
      rot += step;
      points.push(`${cx + Math.cos(rot) * innerR(starInnerR)},${cy + Math.sin(rot) * innerR(starInnerR)}`);
      rot += step;
    }
    return points.join(" ");
  };

  const innerR = (r: number) => r;

  return (
    <div
      className={cn(
        "relative w-full max-w-5xl mx-auto overflow-hidden pointer-events-none select-none",
        className,
      )}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl"
      >
        <defs>
          {/* Subtle titanium gradient for light stripes */}
          <linearGradient id="titaniumStripe" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.16" />
          </linearGradient>

          {/* Canton deep midnight gradient */}
          <linearGradient id="cantonNoir" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0E121B" />
            <stop offset="100%" stopColor="#05070B" />
          </linearGradient>

          {/* Micro-hatching banknote engraving pattern */}
          <pattern
            id="engravingLines"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          </pattern>

          {/* Sweeping diagonal light beam mask */}
          <linearGradient id="sweepBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Soft elliptical edge vignette */}
          <mask id="flagVignette">
            <radialGradient id="vignetteGrad" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="#FFFFFF" />
              <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.75" />
              <stop offset="98%" stopColor="#000000" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#vignetteGrad)" />
          </mask>
        </defs>

        <g mask="url(#flagVignette)">
          {/* ── 13 Alternating Stripes ────────────────────────────────────── */}
          {Array.from({ length: 13 }).map((_, i) => {
            const isDark = i % 2 === 0;
            const y = i * stripeH;
            return (
              <g key={i}>
                <rect
                  x="0"
                  y={y}
                  width={W}
                  height={stripeH}
                  fill={isDark ? "#06080C" : "url(#titaniumStripe)"}
                />
                {/* Precision hairline rule between stripes */}
                <line
                  x1="0"
                  y1={y + stripeH}
                  x2={W}
                  y2={y + stripeH}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="0.5"
                />
              </g>
            );
          })}

          {/* ── Banknote Engraving Micro-Texture ──────────────────────────── */}
          <rect width={W} height={H} fill="url(#engravingLines)" />

          {/* ── The Canton (7 stripes high, 40% wide) ─────────────────────── */}
          <rect
            x="0"
            y="0"
            width={cantonW}
            height={cantonH}
            fill="url(#cantonNoir)"
          />
          {/* Laser-etched border for canton */}
          <rect
            x="0"
            y="0"
            width={cantonW}
            height={cantonH}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
            fill="none"
          />

          {/* ── 50 Stars (9 alternating rows of 6 and 5) ──────────────────── */}
          {Array.from({ length: 9 }).map((_, row) => {
            const isEvenRow = row % 2 === 0;
            const starCount = isEvenRow ? 6 : 5;
            const cy = (row + 1) * (cantonH / 10);

            return Array.from({ length: starCount }).map((_, col) => {
              const cx = isEvenRow
                ? (col * 2 + 1) * (cantonW / 12)
                : (col * 2 + 2) * (cantonW / 12);

              return (
                <polygon
                  key={`${row}-${col}`}
                  points={getStarPoints(cx, cy)}
                  fill="rgba(240, 245, 255, 0.75)"
                />
              );
            });
          })}

          {/* ── Outer Precision Border ────────────────────────────────────── */}
          <rect
            x="0.5"
            y="0.5"
            width={W - 1}
            height={H - 1}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            fill="none"
          />

          {/* ── Sweeping Light Reflection Sheen ───────────────────────────── */}
          {sweep && (
            <motion.rect
              x="-100%"
              y="0"
              width="100%"
              height="100%"
              fill="url(#sweepBeam)"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                repeatDelay: 6,
                ease: "easeInOut",
              }}
            />
          )}
        </g>
      </svg>
    </div>
  );
}

