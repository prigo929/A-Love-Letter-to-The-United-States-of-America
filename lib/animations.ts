// ─── Framer Motion Animation Variants ────────────────────────────────────────
// All shared animation configs live here.
// Import into any component — never define inline unless truly one-off.
//
// Performance note: Always use viewport={{ once: true, margin: "-100px" }}
// on motion.div to prevent re-triggering on scroll up.

import type { Variants, Transition } from 'framer-motion'

// ─── Shared Transitions ───────────────────────────────────────────────────────

export const easeOutCubic: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier — fast then soft landing
}

export const easeOutExpo: Transition = {
  duration: 1.0,
  ease: [0.19, 1, 0.22, 1],
}

export const spring: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 1,
}

export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 15,
}

// ─── Reveal Animations ───────────────────────────────────────────────────────

/** Standard section reveal — fades up from below */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeOutCubic,
  },
}

/** Fade in only (no movement) */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

/** Slide in from the left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeOutCubic,
  },
}

/** Slide in from the right */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeOutCubic,
  },
}

/** Scale up with fade — for cards and images */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: easeOutCubic,
  },
}

/** Hero text word-by-word reveal */
export const heroWord: Variants = {
  hidden: { opacity: 0, y: 80, rotateX: -20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 1.0,
      ease: [0.19, 1, 0.22, 1],
    },
  },
}

// ─── Container / Stagger ─────────────────────────────────────────────────────

/** Container that staggers children — use on grids, lists */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

/** Slower stagger — for featured sections */
export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
}

/** Fast stagger — for stat bars, small items */
export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
}

// ─── Hero Specific ────────────────────────────────────────────────────────────

/** Hero container — orchestrates all hero children */
export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

/** Title line reveal in hero */
export const heroTitle: Variants = {
  hidden: { opacity: 0, y: 100, skewY: 4 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 1.2,
      ease: [0.19, 1, 0.22, 1],
    },
  },
}

/** Subtitle reveal */
export const heroSubtitle: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.19, 1, 0.22, 1],
    },
  },
}

/** CTA buttons appear last */
export const heroCTA: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

// ─── Number Counter ───────────────────────────────────────────────────────────
// Used with Framer Motion's useMotionValue + animate()
// See: components/sections/AnimatedCounter.tsx

export const COUNTER_DURATION = 2.0  // seconds

// ─── Page Transitions ─────────────────────────────────────────────────────────

/** Wrap with <AnimatePresence> in the root layout */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

// ─── Interactive Elements ─────────────────────────────────────────────────────

/** Card hover — slight lift + scale */
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

/** Button hover fill effect */
export const buttonFill = {
  rest:  { width: '0%' },
  hover: { width: '100%', transition: { duration: 0.35, ease: 'easeOut' } },
}

// ─── Navigation ───────────────────────────────────────────────────────────────

/** Mobile nav menu slides from right */
export const mobileMenu: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

/** Mega menu dropdown */
export const megaMenu: Variants = {
  hidden: { opacity: 0, y: -8, scaleY: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -8,
    scaleY: 0.95,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
}

/** Stagger for mega menu links */
export const megaMenuLinks: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

export const megaMenuLink: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

// ─── Chart Animations ────────────────────────────────────────────────────────

/** Bar chart bars grow from bottom */
export const barGrow: Variants = {
  hidden: { scaleY: 0, originY: 1 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

// ─── Quote Carousel ───────────────────────────────────────────────────────────

export const quoteEnter: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: -40,
    transition: { duration: 0.4, ease: 'easeIn' },
  },
}

// ─── Timeline ────────────────────────────────────────────────────────────────

/** Timeline items appear with a line drawing from above */
export const timelineItem: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeOutCubic,
  },
}

export const timelineLine: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}
