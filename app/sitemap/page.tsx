// ─── Sitemap Page ──────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import Link from 'next/link'
import { NAV_SECTIONS } from '@/lib/constants'

export const metadata: Metadata = {
  title:       'All Sections | America: The Greatest Nation',
  description: 'Complete sitemap — explore every section celebrating American greatness.',
}

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-navy-dark pt-24 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-h1 text-white mb-4 mt-8">All Sections</h1>
        <p className="font-body text-white/60 text-lg mb-12">
          Every chapter of America's extraordinary story.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NAV_SECTIONS.map((section) => (
            <div key={section.href} className="bg-navy-light rounded-2xl p-6 border border-white/10">
              <Link
                href={section.href}
                className="font-display text-xl text-glory-gold hover:text-glory-gold-dark transition-colors block mb-2"
              >
                {section.title}
              </Link>
              <p className="font-body text-sm text-white/55 mb-4">{section.description}</p>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-body text-sm text-white/50 hover:text-white transition-colors"
                    >
                      → {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
