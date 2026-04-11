// ─── Home Page ────────────────────────────────────────────────────────────────
// Assembles the full 11-section home page in order.
// Server Component — all client components imported as leaves.

import type { Metadata } from 'next'
import { HeroSection }        from '@/components/sections/HeroSection'
import { OpeningStatement }   from '@/components/sections/OpeningStatement'
import { StatBar }            from '@/components/sections/StatBar'
import { SectionGrid }        from '@/components/sections/SectionGrid'
import { WhyAmericaSection }  from '@/components/sections/WhyAmericaSection'
import { MapPreviewSection }  from '@/components/sections/MapPreviewSection'
import { VideoSection }       from '@/components/sections/VideoSection'
import { DataTeaserSection }  from '@/components/sections/DataTeaserSection'
import { QuoteCarousel }      from '@/components/sections/QuoteCarousel'
import { GalleryPreviewSection } from '@/components/sections/GalleryPreviewSection'
import { NewsletterSection }  from '@/components/sections/NewsletterSection'
import { SITE }               from '@/lib/constants'

// ─── Page Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       `${SITE.name} | Home`,
  description: SITE.description,
  alternates:  { canonical: '/' },
  openGraph: {
    title:       `${SITE.name} | The Greatest Nation in History`,
    description: SITE.description,
    url:         '/',
  },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const jsonLd = {
  '@context':  'https://schema.org',
  '@type':     'WebPage',
  name:        `${SITE.name} — Home`,
  description: SITE.description,
  url:         SITE.url,
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Section 1: Cinematic hero */}
      <HeroSection />

      {/* Section 2: Opening statement — parchment background, editorial quote */}
      <OpeningStatement />

      {/* Section 3: Key stats bar — 6 animated counters */}
      <StatBar />

      {/* Section 4: Section navigation cards — 10 major sections */}
      <SectionGrid />

      {/* Section 5: Why America — four editorial feature blocks */}
      <WhyAmericaSection />

      {/* Section 6: Interactive map preview */}
      <MapPreviewSection />

      {/* Section 7: Video previews */}
      <VideoSection />

      {/* Section 8: Data teaser charts */}
      <DataTeaserSection />

      {/* Section 9: Quote carousel — Lincoln, Reagan, Einstein, JFK */}
      <QuoteCarousel />

      {/* Section 10: Gallery preview */}
      <GalleryPreviewSection />

      {/* Section 11: Newsletter signup — Supabase connected */}
      <NewsletterSection />
    </>
  )
}
