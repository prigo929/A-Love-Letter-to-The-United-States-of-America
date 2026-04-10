'use client'

// ─── Button Component ─────────────────────────────────────────────────────────
// Four variants: primary (red), secondary (blue outline), ghost, gold.
// Includes animated fill effect on hover via Framer Motion.

import { forwardRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gold'
type ButtonSize    = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonBaseProps {
  variant?:   ButtonVariant
  size?:      ButtonSize
  className?: string
  children:   React.ReactNode
  icon?:      React.ReactNode   // Optional left icon
  iconRight?: React.ReactNode   // Optional right icon
  fullWidth?: boolean
  loading?:   boolean
  disabled?:  boolean
}

// Button acting as a <button>
interface ButtonAsButton extends ButtonBaseProps {
  href?: never
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
}

// Button acting as a <Link>
interface ButtonAsLink extends ButtonBaseProps {
  href:       string
  onClick?:   never
  type?:      never
  external?:  boolean
}

export type ButtonProps = ButtonAsButton | ButtonAsLink

// ─── Style maps ───────────────────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-glory-red text-white border-2 border-glory-red',
    'hover:bg-glory-red-dark hover:border-glory-red-dark',
    'focus-visible:ring-glory-red/50',
    'shadow-md hover:shadow-red',
  ].join(' '),

  secondary: [
    'bg-transparent text-glory-blue border-2 border-glory-blue',
    'hover:bg-glory-blue hover:text-white',
    'dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-navy-dark',
    'focus-visible:ring-glory-blue/50',
  ].join(' '),

  ghost: [
    'bg-transparent text-current border-2 border-transparent',
    'hover:border-current hover:bg-white/10',
    'focus-visible:ring-white/50',
  ].join(' '),

  gold: [
    'bg-glory-gold text-navy-dark border-2 border-glory-gold font-semibold',
    'hover:bg-glory-gold-dark hover:border-glory-gold-dark hover:text-navy-dark',
    'focus-visible:ring-glory-gold/50',
    'shadow-gold hover:shadow-gold-lg',
  ].join(' '),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm:  'px-4 py-2 text-sm gap-1.5 rounded-lg',
  md:  'px-6 py-3 text-base gap-2 rounded-xl',
  lg:  'px-8 py-4 text-lg gap-2.5 rounded-xl',
  xl:  'px-10 py-5 text-xl gap-3 rounded-2xl',
}

// ─── Component ───────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant   = 'primary',
      size      = 'md',
      className,
      children,
      icon,
      iconRight,
      fullWidth = false,
      loading   = false,
      disabled  = false,
    } = props

    const classes = cn(
      // Base
      'relative inline-flex items-center justify-center font-body font-medium',
      'transition-all duration-200 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'select-none overflow-hidden',
      // Variant + size
      variantStyles[variant],
      sizeStyles[size],
      // Modifiers
      fullWidth  && 'w-full',
      (disabled || loading) && 'opacity-50 pointer-events-none cursor-not-allowed',
      className
    )

    const content = (
      <>
        {/* Loading spinner */}
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {/* Left icon */}
        {!loading && icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
        {/* Label */}
        <span>{children}</span>
        {/* Right icon */}
        {iconRight && <span className="shrink-0" aria-hidden="true">{iconRight}</span>}
      </>
    )

    // ── Render as Link ────────────────────────────────────────────────────────
    if ('href' in props && props.href) {
      const { href, external } = props
      if (external) {
        return (
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {content}
          </motion.a>
        )
      }
      return (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={fullWidth ? 'w-full' : 'inline-block'}
        >
          <Link href={href} className={classes}>
            {content}
          </Link>
        </motion.div>
      )
    }

    // ── Render as button ──────────────────────────────────────────────────────
    const { type = 'button', onClick } = props as ButtonAsButton
    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={classes}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.97 } : {}}
      >
        {content}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
