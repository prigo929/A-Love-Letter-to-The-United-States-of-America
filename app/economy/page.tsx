// ─── Economy Page (Placeholder — Phase 3) ────────────────────────────────────

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title:       'Economy | America: The Greatest Nation',
  description: 'The United States economy — $28.8 trillion, the largest in human history.',
}

export default function EconomyPage() {
  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="font-hero text-8xl text-glory-gold mb-4">$28.8T</p>
        <h1 className="font-display text-4xl text-white mb-4">The Engine of the World</h1>
        <p className="font-body text-white/60 mb-8">
          Phase 3 — Economy section — coming soon. Full charts, data, and analysis of 
          America's unrivaled economic dominance.
        </p>
        <Link href="/" className="font-body text-glory-gold hover:text-glory-gold-dark transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
