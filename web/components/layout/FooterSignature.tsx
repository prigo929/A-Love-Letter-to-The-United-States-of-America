"use client";

// ─── FooterSignature ──────────────────────────────────────────────────────────
// The closing shot: a viewport-wide hollow-outline "AMERICA" whose gold fill
// sweeps in left-to-right as the footer scrolls into view. Two stacked copies
// of the same text — an outlined base and a filled overlay whose clip-path is
// driven by scroll progress.

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function FooterSignature() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end 0.9"],
  });

  const clip = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  const textClass =
    "block w-full text-center font-black uppercase select-none whitespace-nowrap leading-none tracking-[0.02em]";
  const textStyle: React.CSSProperties = {
    fontFamily: "var(--font-archivo), system-ui, sans-serif",
    fontSize: "clamp(64px, 12.5vw, 240px)",
  };

  return (
    <div ref={ref} className="overflow-hidden px-2 pt-20 pb-6" aria-hidden="true">
      <div className="relative">
        {/* Outlined base */}
        <span
          className={`${textClass} text-transparent`}
          style={{
            ...textStyle,
            WebkitTextStroke: "1px rgba(232, 185, 35, 0.28)",
          }}
        >
          AMERICA
        </span>
        {/* Gold fill sweep */}
        {prefersReducedMotion ? (
          <span
            className={`${textClass} absolute inset-0 text-[#E8B923]/80`}
            style={textStyle}
          >
            AMERICA
          </span>
        ) : (
          <motion.span
            className={`${textClass} absolute inset-0 text-[#E8B923]/80`}
            style={{ ...textStyle, clipPath: clip }}
          >
            AMERICA
          </motion.span>
        )}
      </div>
    </div>
  );
}
