// ─── Badge Component ─────────────────────────────────────────────────────────
// Small labels used on cards, section headers, and stat blocks.
// Server Component — no 'use client' needed.

import { cn } from '@/lib/utils'

type BadgeVariant = 'gold' | 'red' | 'blue' | 'white' | 'glass' | 'success'
type BadgeSize    = 'sm' | 'md' | 'lg'

interface BadgeProps {
  children:   React.ReactNode
  variant?:   BadgeVariant
  size?:      BadgeSize
  className?: string
  dot?:       boolean  // Show colored dot before text
}

const variantStyles: Record<BadgeVariant, string> = {
  gold:    'bg-glory-gold/20 text-glory-gold border border-glory-gold/30',
  red:     'bg-glory-red/15 text-glory-red-light border border-glory-red/20',
  blue:    'bg-glory-blue/20 text-glory-blue-light border border-glory-blue/30',
  white:   'bg-white/15 text-white border border-white/25',
  glass:   'bg-white/10 backdrop-blur-sm text-white border border-white/20',
  success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-xs font-medium tracking-wide',
  md: 'px-3.5 py-1 text-sm font-medium tracking-wide',
  lg: 'px-4 py-1.5 text-base font-semibold tracking-wide',
}

const dotColors: Record<BadgeVariant, string> = {
  gold:    'bg-glory-gold',
  red:     'bg-glory-red-light',
  blue:    'bg-glory-blue-light',
  white:   'bg-white',
  glass:   'bg-white',
  success: 'bg-emerald-400',
}

export function Badge({
  children,
  variant   = 'gold',
  size      = 'md',
  className,
  dot       = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-body',
        'uppercase tracking-widest',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
