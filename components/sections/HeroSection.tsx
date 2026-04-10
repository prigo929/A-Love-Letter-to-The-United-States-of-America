'use client'

// ─── Hero Section ─────────────────────────────────────────────────────────────
// Full-viewport cinematic hero with:
//  • 5-image crossfade carousel (6s per image)
//  • Animated particle stars canvas
//  • Parallax text on scroll
//  • Staggered text reveal on mount
//  • Two CTA buttons
//  • Animated scroll indicator

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { heroContainer, heroTitle, heroSubtitle, heroCTA } from '@/lib/animations'
import { HERO_IMAGES, SITE } from '@/lib/constants'
import { BLUR_PLACEHOLDER } from '@/lib/utils'

// ─── Particle Stars Canvas ────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Resize canvas to full viewport
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create stars
    const STAR_COUNT = 120
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      r:       Math.random() * 1.5 + 0.3,
      alpha:   Math.random(),
      speed:   Math.random() * 0.005 + 0.002,
      offset:  Math.random() * Math.PI * 2,
    }))

    let frame: number
    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        // Twinkle: sinusoidal opacity
        const twinkle = (Math.sin(t * star.speed * 10 + star.offset) + 1) / 2
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 215, 0, ${twinkle * 0.7 + 0.1})`
        ctx.fill()
      })

      t++
      frame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none"
      aria-hidden="true"
    />
  )
}

function applyHeroParallax(
  latest: number,
  backgroundEl: HTMLDivElement | null,
  contentEl: HTMLDivElement | null,
  indicatorEl: HTMLDivElement | null
) {
  const backgroundOffset = Math.min((latest / 600) * 160, 160)
  const contentOffset = Math.max((latest / 600) * -120, -120)
  const fade = Math.max(0, Math.min(1, 1 - latest / 400))

  if (backgroundEl) {
    backgroundEl.style.transform = `translate3d(0, ${backgroundOffset}px, 0)`
  }

  if (contentEl) {
    contentEl.style.transform = `translate3d(0, ${contentOffset}px, 0)`
    contentEl.style.opacity = `${fade}`
  }

  if (indicatorEl) {
    indicatorEl.style.opacity = `${fade}`
  }
}

// ─── Hero Component ───────────────────────────────────────────────────────────

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundLayerRef = useRef<HTMLDivElement>(null)
  const contentLayerRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  // Parallax scroll
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    applyHeroParallax(
      latest,
      backgroundLayerRef.current,
      contentLayerRef.current,
      scrollIndicatorRef.current
    )
  })

  useEffect(() => {
    applyHeroParallax(
      scrollY.get(),
      backgroundLayerRef.current,
      contentLayerRef.current,
      scrollIndicatorRef.current
    )
  }, [scrollY])

  // Image carousel — cycle every 6 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentImage((i) => (i + 1) % HERO_IMAGES.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  const images = HERO_IMAGES.map((img) => ({
    src:
      'src' in img
        ? img.src
        : `https://images.unsplash.com/${img.unsplash}?q=85&w=1920&auto=format&fit=crop`,
    alt: img.alt,
  }))

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen-safe flex flex-col items-center justify-center overflow-hidden bg-navy-dark pt-24 md:pt-28 lg:pt-32"
      role="banner"
      aria-label="America: The Greatest Nation hero section"
    >
      {/* ── Background Image Carousel ──────────────────────────────────────── */}
      <div ref={backgroundLayerRef} className="absolute inset-0 z-0 will-change-transform">
        <AnimatePresence>
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImage].src}
              alt={images[currentImage].alt}
              fill
              priority={currentImage === 0}
              className="object-cover"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              sizes="100vw"
              quality={85}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Gradient Overlay ───────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-[1] hero-overlay-gradient" aria-hidden="true" />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[2] hero-bottom-fade" aria-hidden="true" />

      {/* ── Particle Stars ─────────────────────────────────────────────────── */}
      <ParticleCanvas />

      {/* ── Hero Content ───────────────────────────────────────────────────── */}
      <div
        ref={contentLayerRef}
        className="relative z-20 text-center px-4 sm:px-6 max-w-6xl mx-auto will-change-transform"
      >
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 md:gap-8"
        >
          {/* Eyebrow — Est. 1776 */}
          <motion.div
            variants={heroSubtitle}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-px bg-glory-gold" aria-hidden="true" />
            <span className="font-body text-xs md:text-sm text-glory-gold tracking-[0.35em] uppercase font-semibold">
              Est. 1776 · The American Story
            </span>
            <div className="w-12 h-px bg-glory-gold" aria-hidden="true" />
          </motion.div>

          {/* Main title — BEBAS NEUE */}
          <motion.h1
            variants={heroTitle}
            className="font-hero hero-title-shell leading-none text-center"
          >
            <span className="hero-title-top">THE UNITED</span>

            <span className="hero-title-middle">STATES</span>

            <span className="hero-title-bottom">OF AMERICA</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={heroSubtitle}
            className="font-display text-xl md:text-3xl lg:text-4xl text-white/85 italic font-normal max-w-3xl leading-relaxed"
          >
            {SITE.tagline}
          </motion.p>

          {/* Star row decoration */}
          <motion.div
            variants={heroSubtitle}
            className="flex items-center gap-2"
            aria-hidden="true"
          >
            {[...Array(13)].map((_, i) => (
              <Star
                key={i}
                className={
                  i === 6
                    ? 'hero-star-large text-glory-gold fill-glory-gold'
                    : 'hero-star-small text-glory-gold fill-glory-gold'
                }
              />
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={heroCTA}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          >
            <Button href="/economy" variant="gold" size="xl">
              Explore the Nation
            </Button>
            <Button href="/sitemap" variant="ghost" size="xl">
              View All Sections
            </Button>
          </motion.div>

          {/* Image carousel indicators */}
          <motion.div
            variants={heroCTA}
            className="flex gap-2 mt-2"
            aria-label="Background image selection"
            role="tablist"
          >
            {images.map((img, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === currentImage}
                aria-label={`Show image: ${img.alt}`}
                onClick={() => setCurrentImage(i)}
                className={`h-0.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-glory-gold ${
                  i === currentImage
                    ? "w-8 bg-glory-gold"
                    : "w-3 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ───────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        aria-hidden="true"
      >
        <div ref={scrollIndicatorRef} className="flex flex-col items-center gap-2 will-change-transform">
          <span className="font-body text-xs text-white/40 tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-glory-gold" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
