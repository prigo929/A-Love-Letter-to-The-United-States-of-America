"use client";

// ─── InterstateShield ─────────────────────────────────────────────────────────
// Renders the real AASHTO Interstate shield SVGs (public/interstate-shields/,
// sourced from the official marker set). Two entry points:
//   · InterstateShield — an <img>, for HTML contexts (legend chips, detail panel)
//   · MapShield        — an SVG <image>, for embedding in the zoomable map
//
// Shields exist for 1- and 2-digit primary routes; anything else falls back to
// null so callers can render their own marker.

import shieldNumbers from "@/lib/data/interstate-shield-numbers.json";

const SHIELD_SET = new Set(shieldNumbers as number[]);
const SHIELD_SRC = (n: string | number) => `/interstate-shields/I-${n}.svg`;

/** True when a real shield asset exists for this route number (incl. 3-digit). */
export function hasShield(n: string | number): boolean {
  const v = Number(n);
  return Number.isInteger(v) && SHIELD_SET.has(v);
}

/** Standalone shield icon for HTML contexts (legend chips, detail panel). */
export function InterstateShield({
  number,
  size = 30,
  className,
}: {
  number: string | number;
  size?: number;
  className?: string;
}) {
  if (!hasShield(number)) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG, no optimization needed
    <img
      src={SHIELD_SRC(number)}
      width={size}
      height={size}
      alt={`Interstate ${number}`}
      className={className}
      loading="lazy"
      draggable={false}
    />
  );
}

/** Shield as an SVG <image>, centred on (cx, cy) in the map's user space. */
export function MapShield({
  number,
  cx,
  cy,
  size,
  opacity = 1,
}: {
  number: string | number;
  cx: number;
  cy: number;
  size: number;
  opacity?: number;
}) {
  if (!hasShield(number)) return null;
  return (
    <image
      href={SHIELD_SRC(number)}
      x={cx - size / 2}
      y={cy - size / 2}
      width={size}
      height={size}
      opacity={opacity}
      preserveAspectRatio="xMidYMid meet"
      style={{ pointerEvents: "none", transition: "opacity 0.3s ease" }}
    />
  );
}
