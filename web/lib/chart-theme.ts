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

// Tooltip container: keep chart popups consistent with the void aesthetic.
export const CHART_TOOLTIP_CLASS =
  "rounded-xl border border-white/15 bg-[#000000]/95 px-4 py-3 shadow-2xl backdrop-blur-sm";


// ─── Dense-series performance ────────────────────────────────────────────────
// These charts plot decades of monthly data into a few hundred pixels: the fed
// funds rate is 864 points, corporate yields 678, the yield curve 602. At that
// density there is less than one pixel between points, so `type="monotone"`
// spends cubic beziers on smoothing that is physically too small to see: and
// beziers cost roughly 3x the path data of straight segments.
//
// This is measured, not assumed. On the capital-markets page the fed funds area
// path alone was 69,228 characters; `linear` cut it to 22,792 with no visible
// difference, and the page held ~675KB of path strings in total. Profiling that
// page while scrolling showed ~9.7fps with only 1.1% of the time blocked on
// JavaScript: the main thread was idle, so the cost is RASTERISATION, not
// scripting. The browser re-rasterises those vector paths on every frame.
//
// So the fix is fewer path commands, not less animation. Enter animations are
// cheap here and stay on: they were never the bottleneck. Detail is preserved
// too: every data point is still plotted, we simply stop paying for curve
// smoothing between points that sit less than a pixel apart.
export const DENSE_SERIES_POINTS = 150;

/** Curve type for a series of `n` points. Smoothing below the density threshold,
 *  straight segments above it: where the curve would be sub-pixel and invisible
 *  but still costs ~3x the path data to rasterise every frame. */
export function curveFor(n: number): "monotone" | "linear" {
  return n > DENSE_SERIES_POINTS ? "linear" : "monotone";
}

// ─── Reveal timing ───────────────────────────────────────────────────────────
// One duration for every chart's enter animation, because they had drifted to
// five different values (900, 1000, 1200, 1400, and Recharts' 1500 default for
// the ten charts that never set one): which read as inconsistent rather than
// deliberate when several charts animate on the same screen.
//
// These are long on purpose. The reveal is editorial here: a decade-spanning
// curve drawing itself slowly is the point, and the charts sit in a page you
// scroll through rather than a dashboard you scan. Animation is not a
// performance concern on this site: profiling showed the pages are
// rasterisation-bound with the main thread ~99% idle (see DENSE_SERIES_POINTS),
// so a longer reveal costs nothing.
export const CHART_ANIM_MS = 2400;

/** Slower still, for the single hero chart on a page: the one the section is
 *  actually about. Use sparingly; if everything is emphasised, nothing is. */
export const CHART_ANIM_MS_HERO = 3000;
