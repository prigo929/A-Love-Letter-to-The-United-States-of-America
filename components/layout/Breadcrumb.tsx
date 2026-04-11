import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BreadcrumbItem } from '@/types/content.types'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  dark?: boolean
}

export function Breadcrumb({ items, className, dark = true }: BreadcrumbProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: item.href } : {}),
      })),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={cn(
          'flex flex-wrap items-center gap-1.5 font-body text-sm',
          dark ? 'text-white/50' : 'text-navy-mid/60',
          className
        )}
      >
        <Link
          href="/"
          className={cn(
            'flex items-center gap-1 transition-colors duration-150',
            dark ? 'hover:text-white' : 'hover:text-navy-dark'
          )}
        >
          <Home className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">Home</span>
        </Link>

        {items.map((item, index) => (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 shrink-0 opacity-40" aria-hidden="true" />
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className={cn(
                  'transition-colors duration-150',
                  dark ? 'hover:text-white' : 'hover:text-navy-dark'
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(dark ? 'text-white' : 'text-navy-dark', 'font-medium')}
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
