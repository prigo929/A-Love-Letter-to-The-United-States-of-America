// ─── Economy Page (Placeholder — Phase 3) ────────────────────────────────────

import type { Metadata } from 'next'
import Link from 'next/link'
import { ECONOMY_PAGE_COPY } from '@/lib/data/home'

export const metadata: Metadata = {
  title:       'Economy | America: The Greatest Nation',
  description: ECONOMY_PAGE_COPY.description,
}

export default function EconomyPage() {
  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="font-hero text-8xl text-glory-gold mb-4">{ECONOMY_PAGE_COPY.heroValue}</p>
        <h1 className="font-display text-4xl text-white mb-4">The Engine of the World</h1>
        <p className="font-body text-white/60 mb-8">{ECONOMY_PAGE_COPY.body}</p>
        <Link href="/" className="font-body text-glory-gold hover:text-glory-gold-dark transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
