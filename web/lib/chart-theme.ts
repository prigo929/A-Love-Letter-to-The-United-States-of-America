// ─── Cinematic chart theme ────────────────────────────────────────────────────
// Single source of truth for data-visualization styling so every chart on the
// site speaks the same visual language as the cinematic design system
// (components/shared/CinematicSystem.tsx): void-black surfaces, one gold.
//
// Recharts components import these instead of hard-coding colors.

export const CHART_GOLD = "#E8B923"; // cinematic glory gold (matches --macro-accent)
export const CHART_NAVY = "#3C3B6E"; // muted bar color for non-US comparisons
export const CHART_RED = "#B22234"; // old glory red, used for line strokes
export const CHART_GRID = "rgba(255,255,255,0.06)";
export const CHART_AXIS_LINE = "rgba(255,255,255,0.1)";

export const CHART_TICK = {
  fill: "rgba(255,255,255,0.7)",
  fontSize: 13,
  fontFamily: "var(--font-body)",
  fontWeight: 500,
} as const;

export const CHART_TICK_MUTED = {
  fill: "rgba(255,255,255,0.5)",
  fontSize: 13,
  fontFamily: "var(--font-body)",
  fontWeight: 500,
} as const;

// Tooltip container — keep chart popups consistent with the void aesthetic.
export const CHART_TOOLTIP_CLASS =
  "rounded-xl border border-white/15 bg-[#030405]/95 px-4 py-3 shadow-2xl backdrop-blur-sm";
