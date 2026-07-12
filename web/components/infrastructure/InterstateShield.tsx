"use client";

// ─── InterstateShield ─────────────────────────────────────────────────────────
// The classic AASHTO Interstate shield, drawn as inline SVG so it renders both
// as a standalone icon (legend, detail panel) and embedded in the map's SVG
// (route badges). Red crown with "INTERSTATE", navy field, white numerals and a
// white border.
//
// The white border is produced by a fat white stroke on the silhouette with a
// solid navy fill on top (no second path, no transforms) — this keeps the clip
// coordinate space identical to the fill, which matters when the shield is
// embedded inside a scaled <g> on the zoomable map.

import { useId } from "react";

// Shield silhouette in a 0–100 box (roughly square, like a 2-digit marker).
export const SHIELD_D =
  "M50 4 C36 4 30 13 12 11 C14 25 10 35 6 45 C2 58 11 73 27 84 C36 90 44 95 50 98 " +
  "C56 95 64 90 73 84 C89 73 98 58 94 45 C90 35 86 25 88 11 C70 13 64 4 50 4 Z";

const NAVY = "#0B3E91";
const RED = "#C8102E";

/** Shield artwork in local 0–100 space. `uid` must be unique per instance. */
export function ShieldContent({
  number,
  uid,
  showText = false,
}: {
  number: string;
  uid: string;
  showText?: boolean;
}) {
  const clipId = `is-${uid}`;
  const crown = showText ? 42 : 35;
  const numY = showText ? 72 : 67;
  const numSize = number.length > 2 ? 40 : 52;
  return (
    <g>
      {/* White silhouette (fill + fat stroke) → the border rim */}
      <path d={SHIELD_D} fill="#ffffff" stroke="#ffffff" strokeWidth={9} strokeLinejoin="round" />
      {/* Navy field, inset by the exposed half of the white stroke */}
      <path d={SHIELD_D} fill={NAVY} />
      {/* Red crown + separator, clipped to the field */}
      <clipPath id={clipId}>
        <path d={SHIELD_D} />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="0" width="100" height={crown} fill={RED} />
        <rect x="0" y={crown - 1} width="100" height="3" fill="#ffffff" />
        {showText && (
          <text
            x="50"
            y="26"
            textAnchor="middle"
            fill="#ffffff"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontWeight: 800,
              fontSize: 15,
              letterSpacing: "0.5px",
            }}
          >
            INTERSTATE
          </text>
        )}
      </g>
      {/* Route number */}
      <text
        x="50"
        y={numY}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ffffff"
        style={{
          fontFamily: "var(--font-display), system-ui, sans-serif",
          fontWeight: 800,
          fontSize: numSize,
        }}
      >
        {number}
      </text>
    </g>
  );
}

/** Standalone shield icon for HTML contexts (legend chips, detail panel). */
export function InterstateShield({
  number,
  size = 30,
  showText = false,
  className,
}: {
  number: string | number;
  size?: number;
  showText?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`Interstate ${number}`}
    >
      <ShieldContent number={String(number)} uid={uid} showText={showText} />
    </svg>
  );
}
