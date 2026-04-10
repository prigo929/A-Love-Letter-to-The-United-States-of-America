'use client'

// ─── Header ───────────────────────────────────────────────────────────────────
// Sticky header with glass morphism that appears after scrolling.
// Desktop: horizontal nav with mega-menu dropdowns.
// Mobile: hamburger → slide-in drawer with staggered links.

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NAV_SECTIONS } from '@/lib/constants'
import { mobileMenu, megaMenu, megaMenuLinks, megaMenuLink } from '@/lib/animations'
import { cn } from '@/lib/utils'

// Top-level nav labels (subset shown in header)
const PRIMARY_NAV = NAV_SECTIONS.slice(0, 6)  // Economy → Innovation

export function Header() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [activeMenu,  setActiveMenu]  = useState<string | null>(null)
  const pathname = usePathname()
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Scroll detection ───────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Close mobile menu on route change ─────────────────────────────────────
  useEffect(() => { setMobileOpen(false) }, [pathname])

  // ── Lock body scroll when mobile menu is open ──────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // ── Mega menu hover handlers (with delay to prevent flicker) ──────────────
  const handleMenuEnter = (title: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current)
    setActiveMenu(title)
  }
  const handleMenuLeave = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 150)
  }

  return (
    <>
      {/* ── Main Header ──────────────────────────────────────────────────── */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-navy-dark/95 backdrop-blur-glass border-b border-white/10 shadow-xl'
            : 'bg-transparent'
        )}
        role="banner"
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ── Logo ───────────────────────────────────────────────────── */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold rounded-lg"
              aria-label="America: The Greatest Nation — Home"
            >
              {/* Stars icon */}
              <div className="flex gap-0.5 items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'transition-all duration-300',
                      i < 3 ? 'w-3 h-3 fill-glory-gold text-glory-gold' : 'w-2 h-2 fill-glory-gold/60 text-glory-gold/60',
                      'group-hover:fill-glory-gold group-hover:text-glory-gold group-hover:scale-110'
                    )}
                    style={{ transitionDelay: `${i * 40}ms` }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <div>
                <span className="font-hero text-xl md:text-2xl text-white tracking-wider leading-none block">
                  AMERICA
                </span>
                <span className="font-body text-[10px] text-glory-gold tracking-[0.25em] uppercase leading-none block -mt-0.5">
                  The Greatest Nation
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ────────────────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {PRIMARY_NAV.map((section) => (
                <div
                  key={section.title}
                  className="relative"
                  onMouseEnter={() => handleMenuEnter(section.title)}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link
                    href={section.href}
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 rounded-lg font-body text-sm font-medium',
                      'transition-colors duration-150',
                      'text-white/80 hover:text-white hover:bg-white/10',
                      pathname.startsWith(section.href) && 'text-glory-gold bg-glory-gold/10',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold'
                    )}
                    aria-current={pathname.startsWith(section.href) ? 'page' : undefined}
                  >
                    {section.title}
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200',
                        activeMenu === section.title && 'rotate-180'
                      )}
                      aria-hidden="true"
                    />
                  </Link>

                  {/* Mega dropdown */}
                  <AnimatePresence>
                    {activeMenu === section.title && (
                      <motion.div
                        variants={megaMenu}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-navy-dark/98 backdrop-blur-glass border border-white/15 rounded-2xl shadow-2xl overflow-hidden"
                        onMouseEnter={() => handleMenuEnter(section.title)}
                        onMouseLeave={handleMenuLeave}
                        role="menu"
                      >
                        {/* Section header */}
                        <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                          <p className="font-body text-xs text-glory-gold uppercase tracking-widest font-semibold">
                            {section.title}
                          </p>
                          <p className="font-body text-xs text-white/50 mt-0.5 line-clamp-1">
                            {section.description}
                          </p>
                        </div>

                        {/* Links */}
                        <motion.ul
                          variants={megaMenuLinks}
                          initial="hidden"
                          animate="visible"
                          className="py-2"
                          role="none"
                        >
                          {section.items.map((item) => (
                            <motion.li key={item.href} variants={megaMenuLink} role="none">
                              <Link
                                href={item.href}
                                className={cn(
                                  'flex flex-col px-4 py-2.5 hover:bg-white/8 transition-colors duration-150',
                                  'focus-visible:outline-none focus-visible:bg-white/8',
                                  pathname === item.href && 'bg-glory-gold/10'
                                )}
                                role="menuitem"
                              >
                                <span className="font-body text-sm font-medium text-white/90 hover:text-white">
                                  {item.label}
                                </span>
                                <span className="font-body text-xs text-white/40 leading-snug mt-0.5">
                                  {item.description}
                                </span>
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>

                        {/* View all link */}
                        <div className="px-4 py-3 border-t border-white/10 bg-white/5">
                          <Link
                            href={section.href}
                            className="font-body text-xs text-glory-gold hover:text-glory-gold-dark font-semibold tracking-wide uppercase flex items-center gap-1 transition-colors"
                          >
                            View All {section.title} →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* More dropdown or Data link */}
              <Link
                href="/data"
                className="px-3 py-2 rounded-lg font-body text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                Data
              </Link>
            </nav>

            {/* ── Desktop CTA ────────────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-3">
              <Button href="/sitemap" variant="ghost" size="sm">
                All Sections
              </Button>
              <Button href="/economy" variant="gold" size="sm">
                Explore
              </Button>
            </div>

            {/* ── Mobile Hamburger ───────────────────────────────────────── */}
            <button
              className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              variants={mobileMenu}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 z-70 w-80 max-w-[90vw] bg-navy-dark border-l border-white/10 overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <span className="font-hero text-xl text-white tracking-wider">AMERICA</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="px-4 py-4" aria-label="Mobile navigation">
                {NAV_SECTIONS.map((section, i) => (
                  <div key={section.title} className="mb-1">
                    <Link
                      href={section.href}
                      className={cn(
                        'flex items-center justify-between w-full px-4 py-3 rounded-xl',
                        'font-body font-semibold text-base transition-colors duration-150',
                        pathname.startsWith(section.href)
                          ? 'bg-glory-gold/15 text-glory-gold'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      )}
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      {section.title}
                      {'badge' in section && (
                        <span className="text-xs font-body text-glory-gold/70 font-normal">
                          {section.badge}
                        </span>
                      )}
                    </Link>
                  </div>
                ))}

                <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                  <Link href="/data" className="block px-4 py-3 rounded-xl font-body text-white/80 hover:bg-white/10 font-semibold">
                    Data & Studies
                  </Link>
                  <Link href="/gallery" className="block px-4 py-3 rounded-xl font-body text-white/80 hover:bg-white/10 font-semibold">
                    Gallery
                  </Link>
                  <Link href="/timeline" className="block px-4 py-3 rounded-xl font-body text-white/80 hover:bg-white/10 font-semibold">
                    Timeline
                  </Link>
                </div>

                <div className="mt-6 px-4">
                  <Button href="/economy" variant="gold" size="lg" fullWidth>
                    Explore the Nation
                  </Button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
