"use client";

// ─── Infrastructure motion primitives ─────────────────────────────────────────
// Small client-side pieces so the pages themselves can stay server components:
//  · Reveal      — scroll-triggered fade/rise for any block
//  · SerifLede   — large editorial-serif lede (Playfair) with a slow reveal
//  · MegaTimeline — the megaprojects chronology with growing rules and
//                   staggered typography reveals

import { motion } from "framer-motion";
import type { Megaproject } from "@/lib/data/infrastructure-network-data";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Large editorial serif lede — the counterpoint to the brutalist sans. */
export function SerifLede({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={`[font-family:var(--font-display)] text-2xl font-normal italic leading-snug text-white/85 md:text-4xl md:leading-snug ${className ?? ""}`}
    >
      {children}
    </motion.p>
  );
}

export function MegaTimeline({ projects, locale }: { projects: Megaproject[]; locale: "en" | "ro" }) {
  return (
    <div>
      {projects.map((p, i) => (
        <motion.div
          key={p.year + p.name.en}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.08 }}
          className="group relative grid gap-x-10 gap-y-3 py-10 md:grid-cols-12 md:py-14"
        >
          {/* Growing hairline */}
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-[#E8B923]/50 via-white/10 to-transparent"
          />
          <div className="md:col-span-2">
            <span className="font-hero text-4xl text-[#E8B923]/90 md:text-5xl">{p.year}</span>
          </div>
          <div className="md:col-span-4">
            <h3 className="font-macro-display text-xl font-bold tracking-tight text-white md:text-2xl">
              {p.name[locale]}
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-hero text-2xl text-white/80">{p.stat}</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-white/35">
                {p.statLabel[locale]}
              </span>
            </div>
          </div>
          <p className="font-macro-body text-base font-light leading-relaxed text-white/60 md:col-span-6">
            {p.description[locale]}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
