'use client'

// ─── Animated Counter ─────────────────────────────────────────────────────────
// Counts from 0 to `value` when it enters the viewport.
// Uses Framer Motion's useMotionValue + animate.

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useTransform, animate, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { COUNTER_DURATION } from '@/lib/animations'

interface AnimatedCounterProps {
  value:     number
  prefix?:   string      // e.g. "$", "#"
  suffix?:   string      // e.g. "T", "M+", "%"
  decimals?: number      // decimal places (default 0)
  duration?: number      // seconds (default 2.0)
  className?: string
  onComplete?: () => void
}

export function AnimatedCounter({
  value,
  prefix   = '',
  suffix   = '',
  decimals = 0,
  duration = COUNTER_DURATION,
  className,
  onComplete,
}: AnimatedCounterProps) {
  const ref       = useRef<HTMLSpanElement>(null)
  const isInView  = useInView(ref, { once: true, margin: '-80px' })
  const motionVal = useMotionValue(0)

  // Transform motion value → formatted string
  const displayVal = useTransform(motionVal, (v) =>
    `${prefix}${v.toFixed(decimals)}${suffix}`
  )

  useEffect(() => {
    if (!isInView) return

    const controls = animate(motionVal, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],   // easeOutExpo
      onComplete,
    })

    return controls.stop
  }, [isInView, motionVal, value, duration, onComplete])

  return (
    <motion.span
      ref={ref}
      className={cn('tabular-nums', className)}
    >
      {displayVal}
    </motion.span>
  )
}
