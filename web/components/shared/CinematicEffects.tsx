"use client";

// ─── Cinematic Effects Suite ─────────────────────────────────────────────────
// Subtle analog film grain, depth-of-field blur-to-focus reveals, and
// anamorphic optical characteristics.

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ── 1. Film Grain Overlay ────────────────────────────────────────────────────
// Global, whisper-thin 35mm grain overlay. Zero interaction blocking.

export function FilmGrain({
  className,
  opacity = 0.038,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[999] film-grain-overlay select-none",
        className,
      )}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}

// ── 2. Blur-to-Focus Viewport Reveal ─────────────────────────────────────────
// Elements smoothly emerge from soft photographic bokeh blur into sharp focus.

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blurAmount?: number;
}

export function BlurReveal({
  children,
  className,
  delay = 0,
  duration = 1.1,
  yOffset = 20,
  blurAmount = 10,
}: BlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: yOffset,
        filter: `blur(${blurAmount}px)`,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
          : {
              opacity: 0,
              y: yOffset,
              filter: `blur(${blurAmount}px)`,
            }
      }
      transition={{
        duration,
        ease,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
