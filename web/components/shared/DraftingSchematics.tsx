"use client";

// ─── Drafting Schematics ─────────────────────────────────────────────────────
// Minimalist architectural blueprint & dimension linework for Infrastructure.
//  • Pure vector SVG structural dimension lines and orthographic grids.
//  • Extreme restraint: laser-thin 0.5px lines at 4%–7% opacity on #000000 deep black.
//  • Engineering callouts: Hoover Dam crest elevation, Golden Gate suspension span.
//  • Micro crosshairs (+) and technical tolerances. Zero gamer tropes.

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface DraftingSchematicsProps {
  className?: string;
  opacity?: number;
}

export function DraftingSchematics({
  className,
  opacity = 0.06,
}: DraftingSchematicsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const xPan = useTransform(scrollYProgress, [0, 1], [-15, 15]);

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
        style={{ x: xPan }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="draftingGrid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="0.5"
            />
            <circle cx="0" cy="0" r="1" fill="rgba(255, 255, 255, 0.4)" />
          </pattern>
        </defs>

        {/* ── Subdued CAD Drafting Grid ──────────────────────────────────── */}
        <rect width="100%" height="100%" fill="url(#draftingGrid)" />

        {/* ── Horizontal & Vertical Datum Lines ─────────────────────────── */}
        <line
          x1="0"
          y1="450"
          x2="1440"
          y2="450"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="0.75"
          strokeDasharray="6 6"
        />
        <line
          x1="720"
          y1="0"
          x2="720"
          y2="900"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="0.75"
          strokeDasharray="6 6"
        />

        {/* ── Engineering Dimension Arrows & Schematics ─────────────────── */}
        {/* Golden Gate Span Spec */}
        <g transform="translate(180, 240)">
          <line
            x1="0"
            y1="0"
            x2="500"
            y2="0"
            stroke="rgba(255, 215, 0, 0.6)"
            strokeWidth="0.75"
          />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="rgba(255, 215, 0, 0.6)" strokeWidth="0.75" />
          <line x1="500" y1="-8" x2="500" y2="8" stroke="rgba(255, 215, 0, 0.6)" strokeWidth="0.75" />
          <text
            x="250"
            y="-10"
            textAnchor="middle"
            fill="rgba(255, 215, 0, 0.8)"
            fontSize="9"
            fontFamily="monospace"
            letterSpacing="0.25em"
          >
            ◀ 4,200 FT · MAIN SUSPENSION SPAN ▶
          </text>
        </g>

        {/* Hoover Dam Elevation Spec */}
        <g transform="translate(860, 620)">
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="180"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="0.75"
          />
          <line x1="-8" y1="0" x2="8" y2="0" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.75" />
          <line x1="-8" y1="180" x2="8" y2="180" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.75" />
          <text
            x="14"
            y="95"
            fill="rgba(255, 255, 255, 0.7)"
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="0.2em"
          >
            ELEV +726 FT // CREST DATUM
          </text>
        </g>

        {/* Structural Tolerance Coordinates */}
        <text
          x="120"
          y="820"
          fill="rgba(255, 255, 255, 0.45)"
          fontSize="8"
          fontFamily="monospace"
          letterSpacing="0.3em"
        >
          INTERSTATE HIGHWAY SYSTEM // 47,856 MI · SPEC: AASHTO-HS20
        </text>
      </motion.svg>
    </div>
  );
}
