"use client";

// ─── Reveal ───────────────────────────────────────────────────────────────────
// Scroll-triggered entrance wrapper for the cinematic pages. Server components
// wrap any section content in <Reveal> and it animates in when scrolled into
// view. Variants:
//   "fade-up" (default): opacity + 32px rise
//   "fade"             : opacity only (safe around sticky descendants)
//   "wipe"             : clip-path unveil from the bottom, for images/cards
// GoldRule is the matching hairline that draws itself in like a pen stroke.

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealVariant = "fade-up" | "fade" | "wipe";

const VARIANTS: Record<RevealVariant, { hidden: TargetAndTransition; visible: TargetAndTransition }> = {
  "fade-up": {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  wipe: {
    hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0.4 },
    visible: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 },
  },
};

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.9,
  className,
  once = true,
}: {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-90px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const { hidden, visible } = VARIANTS[variant];

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={inView ? visible : hidden}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── RevealSection ────────────────────────────────────────────────────────────
// Drop-in replacement for a page-level <section> that fades up on entering
// view. Server pages swap `<section className=...>` for `<RevealSection
// className=...>` and the whole block animates in. Do NOT use around sticky
// descendants (scrollytelling/pinned bands): use a plain <section> there.

export function RevealSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ─── GoldRule ─────────────────────────────────────────────────────────────────
// A 1px gold-to-transparent rule that draws from left to right on entering
// view. Drop it above section headers in place of static border-t dividers.

export function GoldRule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : undefined}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "block h-px w-full origin-left bg-linear-to-r from-[#E8B923]/70 via-white/15 to-transparent",
        className,
      )}
    />
  );
}
