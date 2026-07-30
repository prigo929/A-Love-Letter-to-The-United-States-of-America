"use client";

// ─── InterstateShield ─────────────────────────────────────────────────────────
// Renders the real AASHTO Interstate shield SVGs. Two entry points:
//   · InterstateShield: an <img> of the static file, for HTML contexts
//                        (legend chips, detail panel)
//   · MapShield       : the shield drawn as NATIVE SVG paths, for the zoomable
//                        map (see below)
//
// The map badge is drawn from shared vector geometry rather than an <img> in a
// <foreignObject>. HTML inside a foreignObject does not track SVG zoom/pan
// transforms smoothly in Chrome/Safari, so the badges jittered on zoom/select.
// Native <path> geometry transforms with the map exactly like the road lines do.

import { useMemo } from "react";
import shieldNumbers from "@/lib/data/interstate-shield-numbers.json";
import {
  GLYPHS,
  NARROW_SHAPE,
  NARROW_BANNER,
  WIDE_SHAPE,
  WIDE_BANNER,
} from "@/lib/data/shield-geometry";

const SHIELD_SET = new Set(shieldNumbers as number[]);
const SHIELD_SRC = (n: string | number) => `/interstate-shields/I-${n}.svg`;

/** True when a real shield asset exists for this route number (incl. 3-digit). */
export function hasShield(n: string | number): boolean {
  const v = Number(n);
  return Number.isInteger(v) && SHIELD_SET.has(v);
}

// ── Native-SVG shield composition (map badges) ────────────────────────────────
// Compose any route number from the shared shell + Roadgeek digit glyphs, exactly
// as the static shield files are built. Cached: each number is assembled once.
const SHIELD_H = 601; // both shells are 601 tall

interface ShieldGeom {
  width: number;
  inner: string;
}
const GEOM_CACHE = new Map<number, ShieldGeom | null>();

function composeShield(n: number): ShieldGeom | null {
  const digits = String(n);
  if (![...digits].every((c) => GLYPHS[c])) return null;
  const wide = digits.length >= 3;
  const width = wide ? 750 : 601;
  const cx = width / 2;
  const gap = wide ? 51 : 52; // inter-digit ink gap, matched to the real shields
  const total =
    [...digits].reduce((sum, c) => sum + GLYPHS[c].w, 0) + gap * (digits.length - 1);
  const target = wide ? 545 : 470; // shrink only if the number would overflow
  const scale = Math.min(1, target / total);

  let cursor = cx - total / 2;
  let glyphs = "";
  for (const c of digits) {
    const g = GLYPHS[c];
    glyphs += `<path fill="#fff" d="${g.d}" transform="translate(${(cursor - g.xmin).toFixed(2)},0)"/>`;
    cursor += g.w + gap;
  }
  const number =
    scale < 1
      ? `<g transform="translate(${cx},315) scale(${scale.toFixed(4)}) translate(${-cx},-315)">${glyphs}</g>`
      : glyphs;

  const shape = wide ? WIDE_SHAPE : NARROW_SHAPE;
  const banner = wide ? WIDE_BANNER : NARROW_BANNER;
  return { width, inner: shape + banner + number };
}

function shieldGeom(n: number): ShieldGeom | null {
  if (!GEOM_CACHE.has(n)) GEOM_CACHE.set(n, composeShield(n));
  return GEOM_CACHE.get(n)!;
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

/** Shield drawn as native SVG paths, centred on (cx, cy) in the map's user space
 *  and scaled so it stands `size` units tall. Transforms cleanly with the map. */
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
  const geom = useMemo(() => shieldGeom(Number(number)), [number]);
  if (!geom) return null;
  const s = size / SHIELD_H; // scale the 601-tall shell to `size` tall
  return (
    <g
      transform={`translate(${cx},${cy}) scale(${s}) translate(${-geom.width / 2},${-SHIELD_H / 2})`}
      opacity={opacity}
      style={{ pointerEvents: "none", transition: "opacity 0.3s ease" }}
      dangerouslySetInnerHTML={{ __html: geom.inner }}
    />
  );
}
