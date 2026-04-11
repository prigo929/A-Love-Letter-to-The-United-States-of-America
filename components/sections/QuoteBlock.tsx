'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeUp } from '@/lib/animations'
import { cn } from '@/lib/utils'
import { BLUR_PLACEHOLDER } from '@/lib/utils'

interface QuoteBlockProps {
  quote:        string
  attribution:  string
  role?:        string
  title?:       string
  year?:        number
  imageSrc?:    string
  imageAlt?:    string
  variant?:     'light' | 'dark' | 'parchment'
  size?:        'md' | 'lg' | 'xl'
  className?:   string
}

const sizeStyles = {
  md: 'text-xl md:text-2xl',
  lg: 'text-2xl md:text-3xl',
  xl: 'text-3xl md:text-4xl lg:text-5xl',
}

export function QuoteBlock({
  quote,
  attribution,
  role,
  title,
  year,
  imageSrc,
  imageAlt,
  variant  = 'light',
  size     = 'lg',
  className,
}: QuoteBlockProps) {
  const isDark = variant === 'dark'
  const subtitle = role ?? title

  return (
    <motion.blockquote
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn(
        'relative max-w-4xl mx-auto text-center px-8 md:px-16',
        className
      )}
    >
      {/* Decorative quote mark */}
      <span
        className={cn(
          'font-hero text-[160px] leading-none select-none absolute -top-8 left-0 md:left-8',
          isDark ? 'text-white/10' : 'text-glory-blue/10'
        )}
        aria-hidden="true"
      >
        "
      </span>

      {/* Left gold accent bar */}
      <motion.div
        className="w-16 h-1 bg-glory-gold mx-auto mb-8"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      />

      {/* Quote text */}
      <p
        className={cn(
          'font-display italic leading-relaxed mb-8 relative z-10',
          sizeStyles[size],
          isDark ? 'text-white' : 'text-navy-dark'
        )}
      >
        "{quote}"
      </p>

      {/* Attribution */}
      <footer className="flex flex-col items-center gap-3">
        {imageSrc && (
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-glory-gold">
            <Image
              src={imageSrc}
              alt={imageAlt ?? attribution}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
          </div>
        )}
        <div>
          <cite
            className={cn(
              'not-italic font-body font-semibold text-base block',
              isDark ? 'text-white' : 'text-navy-dark'
            )}
          >
            — {attribution}
            {year && <span className="font-normal opacity-60 ml-1">({year})</span>}
          </cite>
          {subtitle && (
            <span className={cn('text-sm font-body', isDark ? 'text-white/60' : 'light-surface-copy-soft')}>
              {subtitle}
            </span>
          )}
        </div>
      </footer>
    </motion.blockquote>
  )
}
