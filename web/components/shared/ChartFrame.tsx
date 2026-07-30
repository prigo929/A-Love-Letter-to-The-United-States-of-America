// ─── ChartFrame ───────────────────────────────────────────────────────────────
// Cinematic framing for data visualizations: void-black card, mono eyebrow,
// gold rule that draws in, and a source line. Wrap any chart in this on the
// cinematic pages so data reads like a terminal display, not a floating SVG.
//
// Server-safe: the only client piece is the GoldRule animation.

import { GoldRule } from "@/components/shared/Reveal";

export function ChartFrame({
  eyebrow,
  title,
  source,
  children,
  className,
}: {
  eyebrow?: string;
  title?: string;
  source?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={`rounded-3xl border border-white/10 bg-white/2 p-6 md:p-10 ${className ?? ""}`}
    >
      {(eyebrow || title) && (
        <figcaption className="mb-8">
          {eyebrow && (
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E8B923] mb-3">
              {eyebrow}
            </p>
          )}
          {title && (
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
              {title}
            </h3>
          )}
          <GoldRule className="mt-6" />
        </figcaption>
      )}
      {children}
      {source && (
        <p className="mt-6 text-right font-mono text-[11px] uppercase tracking-widest text-white/30">
          Source: {source}
        </p>
      )}
    </figure>
  );
}
