'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { scaleUp } from '@/lib/animations'
import { Badge } from '@/components/ui/Badge'
import { BLUR_PLACEHOLDER } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface NavigationCardProps {
  href:        string
  title:       string
  description: string
  imageSrc:    string
  imageAlt:    string
  badge?:      string
  className?:  string
}

export function NavigationCard({
  href,
  title,
  description,
  imageSrc,
  imageAlt,
  badge,
  className,
}: NavigationCardProps) {
  return (
    <motion.div
      variants={scaleUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={cn('group', className)}
    >
      <Link
        href={href}
        className="block rounded-2xl overflow-hidden bg-navy-light border border-white/10 h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold"
        aria-label={`Explore ${title}`}
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/20 to-transparent" />

          {/* Badge on image */}
          {badge && (
            <div className="absolute top-3 left-3">
              <Badge variant="gold" size="sm">{badge}</Badge>
            </div>
          )}

          {/* Arrow icon — appears on hover */}
          <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-glory-gold flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <ArrowRight className="w-4 h-4 text-navy-dark" aria-hidden="true" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Gold accent line — grows on hover */}
          <div className="w-8 h-0.5 bg-glory-gold mb-3 transition-all duration-300 group-hover:w-16" />

          <h3 className="font-display text-xl font-semibold text-white mb-1.5 group-hover:text-glory-gold transition-colors duration-200">
            {title}
          </h3>
          <p className="font-body text-sm text-white/60 leading-relaxed">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
