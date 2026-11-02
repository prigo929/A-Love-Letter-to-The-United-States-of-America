"use client";

// ─── Topographic Contours ────────────────────────────────────────────────────
// Authentic USGS-inspired vector elevation contour lines for the Nature vertical.
//  • Pure SVG vector lines representing elevation profiles of the American continent.
//  • Extreme minimalism: razor-thin lines (0.5px) at 4%–8% opacity on deep #000000 black.
//  • Elevation survey stamps: Mt. Whitney (14,505'), Grand Canyon Rim, Sierra crest.
//  • Subtle parallax drift with scroll. Zero gamer HUDs, zero kitsch.

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TopographicContoursProps {
  className?: string;
  opacity?: number;
}

export function TopographicContours({
  className,
  opacity = 0.07,
}: TopographicContoursProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yDrift = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden select-none",
        className
      )}
      style={{ opacity }}
      aria-hidden="true"
    >
      <motion.svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ y: yDrift }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="topoFade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#4ADE80" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* ── Elevation Contours (USGS Quadrangle Curves) ────────────────── */}
        <path
          d="M -100 250 C 300 220, 600 380, 900 280 S 1400 150, 1600 220"
          stroke="url(#topoFade)"
          strokeWidth="0.75"
          strokeDasharray="4 4"
        />
        <path
          d="M -100 320 C 250 300, 550 440, 850 360 S 1350 210, 1600 290"
          stroke="currentColor"
          className="text-white"
          strokeWidth="0.5"
        />
        <path
          d="M -100 400 C 220 380, 500 520, 800 430 S 1300 280, 1600 380"
          stroke="currentColor"
          className="text-white"
          strokeWidth="0.75"
        />
        <path
          d="M -100 480 C 180 470, 460 590, 760 510 S 1250 350, 1600 460"
          stroke="currentColor"
          className="text-white"
          strokeWidth="0.5"
        />
        <path
          d="M -100 560 C 150 550, 420 670, 710 590 S 1200 430, 1600 550"
          stroke="currentColor"
          className="text-white"
          strokeWidth="0.85"
        />
        <path
          d="M -100 640 C 120 630, 380 750, 670 660 S 1150 500, 1600 640"
          stroke="currentColor"
          className="text-white"
          strokeWidth="0.5"
          strokeDasharray="2 4"
        />

        {/* ── Topographic Ring Enclosures (Peak Elevation) ────────────────── */}
        <ellipse
          cx="820"
          cy="480"
          rx="180"
          ry="90"
          stroke="currentColor"
          className="text-white"
          strokeWidth="0.5"
        />
        <ellipse
          cx="820"
          cy="480"
          rx="120"
          ry="60"
          stroke="currentColor"
          className="text-white"
          strokeWidth="0.75"
        />
        <ellipse
          cx="820"
          cy="480"
          rx="60"
          ry="30"
          stroke="url(#topoFade)"
          strokeWidth="1"
        />

        {/* ── Cartographic Metadata Callouts ─────────────────────────────── */}
        <text
          x="830"
          y="485"
          fill="rgba(255,255,255,0.7)"
          fontSize="9"
          fontFamily="monospace"
          letterSpacing="0.2em"
        >
          ▲ 14,505 FT · MT WHITNEY
        </text>
        <text
          x="320"
          y="420"
          fill="rgba(255,255,255,0.5)"
          fontSize="8"
          fontFamily="monospace"
          letterSpacing="0.25em"
        >
          CONTOUR INTERVAL 500 FT
        </text>
        <text
          x="1050"
          y="310"
          fill="rgba(255,255,255,0.5)"
          fontSize="8"
          fontFamily="monospace"
          letterSpacing="0.25em"
        >
          USGS QUADRANGLE REF: WGS84
        </text>
      </motion.svg>
    </div>
  );
}
