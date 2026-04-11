'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BLUR_PLACEHOLDER, cn } from '@/lib/utils'

interface ParallaxSectionProps {
  imageSrc: string
  imageAlt: string
  speed?: number
  overlay?: string
  children: React.ReactNode
  className?: string
  minHeight?: string
}

export function ParallaxSection({
  imageSrc,
  imageAlt,
  speed = 0.3,
  overlay = 'from-navy-dark/80 via-navy-dark/50 to-transparent',
  children,
  className,
  minHeight = 'min-h-[60vh]',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 50}%`, `${speed * 50}%`])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', minHeight, className)}>
      <motion.div className="absolute inset-0 scale-110" style={{ y }} aria-hidden="true">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </motion.div>

      <div className={cn('absolute inset-0 bg-gradient-to-b', overlay)} aria-hidden="true" />

      <div className="relative z-10">{children}</div>
    </div>
  )
}
