import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { FactCard } from '@/components/sections/FactCard'

export const metadata: Metadata = {
  title: 'Explorer',
  description: 'An interactive state-by-state exploration of the United States.',
}

export default function ExplorerPage() {
  return (
    <section className="min-h-screen bg-navy-mid px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl">
        <Breadcrumb items={[{ label: 'Explorer' }]} className="mb-8" />

        <div className="mb-12 max-w-3xl">
          <p className="section-eyebrow">State by State</p>
          <h1 className="mb-4 font-display text-h1 text-white">Map Explorer</h1>
          <p className="font-body text-lg leading-relaxed text-white/60">
            The interactive map preview on the home page now links here. This page is reserved for the deeper state explorer with richer state facts, rankings, and regional stories.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <FactCard fact="California alone would rank among the largest economies on Earth." source="State-level GDP comparisons" category="West" color="gold" />
          <FactCard fact="Texas is America’s energy powerhouse and a major export engine." source="US Energy Information Administration" category="South" color="red" />
          <FactCard fact="Massachusetts concentrates world-class research, medicine, and higher education." source="NIH / university rankings" category="Northeast" color="blue" />
        </div>
      </div>
    </section>
  )
}
