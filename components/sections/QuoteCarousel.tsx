'use client'

// ─── Quote Carousel ───────────────────────────────────────────────────────────
// Rotating famous quotes about America. 5s per quote, fade transition.

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { quoteEnter, fadeUp } from '@/lib/animations'

const QUOTES = [
  {
    id: 1,
    quote: "America will never be destroyed from the outside. If we falter and lose our freedoms, it will be because we destroyed ourselves.",
    attribution: "Abraham Lincoln",
    role: "16th President of the United States",
    year: 1858,
  },
  {
    id: 2,
    quote: "The best minds are not in government. If any were, business would steal them away.",
    attribution: "Ronald Reagan",
    role: "40th President of the United States",
    year: 1980,
  },
  {
    id: 3,
    quote: "America is the only country that went from barbarism to decadence without civilization in between.",
    attribution: "Alexis de Tocqueville",
    role: "French Political Philosopher & Author of Democracy in America",
    year: 1835,
  },
  {
    id: 4,
    quote: "In the beginning of a change, the patriot is a scarce man, and brave, and hated and scorned. When his cause succeeds, the timid join him, for then it costs nothing to be a patriot.",
    attribution: "Mark Twain",
    role: "American Author & Humorist",
    year: 1904,
  },
  {
    id: 5,
    quote: "I chose America because it is the only country in the world where the government does not tell you what to do.",
    attribution: "Albert Einstein",
    role: "Nobel Prize–winning Physicist, who chose to become an American citizen",
    year: 1940,
  },
  {
    id: 6,
    quote: "Ask not what your country can do for you — ask what you can do for your country.",
    attribution: "John F. Kennedy",
    role: "35th President of the United States",
    year: 1961,
  },
  {
    id: 7,
    quote: "Freedom is never more than one generation away from extinction. We didn't pass it to our children in the bloodstream. It must be fought for, protected, and handed on for them to do the same.",
    attribution: "Ronald Reagan",
    role: "40th President of the United States",
    year: 1964,
  },
]

export function QuoteCarousel() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % QUOTES.length)
    }, 6000)
    return () => clearInterval(id)
  }, [isPaused])

  const prev = () => setCurrent((i) => (i - 1 + QUOTES.length) % QUOTES.length)
  const next = () => setCurrent((i) => (i + 1) % QUOTES.length)

  const quote = QUOTES[current]

  return (
    <section
      className="bg-glory-blue relative overflow-hidden py-24 md:py-36"
      aria-labelledby="quotes-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Cpolygon points='30,3 36,21 57,21 40,33 46,54 30,42 14,54 20,33 3,21 24,21' fill='rgba(255,215,0,0.2)'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-8">
        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-eyebrow justify-center text-glory-gold/80">
            Words That Endure
          </p>
          <h2 id="quotes-heading" className="font-display text-h2 text-white">
            They Said It Best
          </h2>
        </motion.div>

        {/* Quote display */}
        <div className="relative min-h-[280px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={quote.id}
              variants={quoteEnter}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center px-12 md:px-20 w-full"
            >
              {/* Quote mark */}
              <div className="font-hero text-[120px] text-glory-gold/20 leading-none -mb-8 select-none" aria-hidden="true">
                "
              </div>

              {/* Gold line */}
              <div className="w-16 h-0.5 bg-glory-gold mx-auto mb-8" aria-hidden="true" />

              <blockquote>
                <p className="font-display text-2xl md:text-3xl lg:text-4xl text-white italic leading-relaxed mb-8">
                  "{quote.quote}"
                </p>
                <footer className="flex flex-col items-center gap-1">
                  <div className="flex gap-1 mb-2" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-glory-gold text-glory-gold" />
                    ))}
                  </div>
                  <cite className="not-italic font-body font-semibold text-white text-lg">
                    — {quote.attribution}
                    {quote.year && (
                      <span className="text-white/50 font-normal text-base ml-2">({quote.year})</span>
                    )}
                  </cite>
                  {quote.role && (
                    <span className="font-body text-sm text-white/60 max-w-md text-center">
                      {quote.role}
                    </span>
                  )}
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:ring-2 focus-visible:ring-glory-gold focus-visible:outline-none"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:ring-2 focus-visible:ring-glory-gold focus-visible:outline-none"
            aria-label="Next quote"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-10" role="tablist" aria-label="Quote navigation">
          {QUOTES.map((q, i) => (
            <button
              key={q.id}
              role="tab"
              aria-selected={i === current}
              aria-label={`Quote by ${q.attribution}`}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-glory-gold focus-visible:outline-none ${
                i === current
                  ? 'w-6 h-2 bg-glory-gold'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
