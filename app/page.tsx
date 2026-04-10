// ─── Home Page ────────────────────────────────────────────────────────────────
// Assembles all Phase 1 home page sections in order.
// Server Component — all client components imported as leaves.

import type { Metadata } from 'next'
import { HeroSection }        from '@/components/sections/HeroSection'
import { OpeningStatement }   from '@/components/sections/OpeningStatement'
import { StatBar }            from '@/components/sections/StatBar'
import { SectionGrid }        from '@/components/sections/SectionGrid'
import { QuoteCarousel }      from '@/components/sections/QuoteCarousel'
import { NewsletterSection }  from '@/components/sections/NewsletterSection'
import { SITE }               from '@/lib/constants'

// ─── Page Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       `${SITE.name} | Home`,
  description: SITE.description,
  openGraph: {
    title:       `${SITE.name} | The Greatest Nation in History`,
    description: SITE.description,
  },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* Section 1: Cinematic hero */}
      <HeroSection />

      {/* Section 2: Opening statement — parchment background, editorial quote */}
      <OpeningStatement />

      {/* Section 3: Key stats bar — 6 animated counters */}
      <StatBar />

      {/* Section 4: Section navigation cards — 10 major sections */}
      <SectionGrid />

      {/* Section 5: Quote carousel — Lincoln, Reagan, Einstein, JFK */}
      <QuoteCarousel />

      {/* Section 6: Newsletter signup — Supabase connected */}
      <NewsletterSection />
    </>
  )
}
