"use client";

// ─── Header ───────────────────────────────────────────────────────────────────
// Sticky header with glass morphism that appears after scrolling.
// Desktop: horizontal nav with mega-menu dropdowns.
// Mobile: hamburger → slide-in drawer with staggered links.

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Menu, X, ChevronDown, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getLocalizedNavSections } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  mobileMenu,
  megaMenu,
  megaMenuLinks,
  megaMenuLink,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

const LOGO_STAR_DELAY_CLASSES = [
  "motion-delay-0",
  "motion-delay-40",
  "motion-delay-80",
  "motion-delay-120",
  "motion-delay-160",
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const { locale, setLocale, selectedLanguage, languageOptions } =
    useLanguage();
  const navSections = getLocalizedNavSections(locale);
  const primaryNav = navSections.slice(0, 6);
  const copy =
    locale === "ro"
      ? {
          logoTagline: "Cea Mai Mare Națiune",
          dataLink: "Date",
          chooseLanguage: "Alege limba",
          viewAllCta: "Toate Secțiunile",
          exploreCta: "Explorează",
          openMenu: "Deschide meniul de navigare",
          closeMenu: "Închide meniul de navigare",
          mobileMenuLabel: "Meniu de navigare",
          mobileNavLabel: "Navigare mobilă",
          galleryLink: "Galerie",
          timelineLink: "Cronologie",
          exploreNation: "Explorează Națiunea",
          languageHeading: "Limbă",
          viewAllPrefix: "Vezi Toată Secțiunea",
        }
      : {
          logoTagline: "The Greatest Nation",
          dataLink: "Data",
          chooseLanguage: "Choose language",
          viewAllCta: "All Sections",
          exploreCta: "Explore",
          openMenu: "Open navigation menu",
          closeMenu: "Close navigation menu",
          mobileMenuLabel: "Navigation menu",
          mobileNavLabel: "Mobile navigation",
          galleryLink: "Gallery",
          timelineLink: "Timeline",
          exploreNation: "Explore the Nation",
          languageHeading: "Language",
          viewAllPrefix: "View All",
        };

  // ── Scroll detection ───────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close mobile menu on route change ─────────────────────────────────────
  useEffect(() => {
    setMobileOpen(false);
    setLanguageMenuOpen(false);
  }, [pathname]);

  // ── Lock body scroll when mobile menu is open ──────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // ── Close language menu on outside click ─────────────────────────────────
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  // ── Mega menu hover handlers (with delay to prevent flicker) ──────────────
  const handleMenuEnter = (title: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMenu(title);
  };
  const handleMenuLeave = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const handleLanguageSelect = (
    language: (typeof languageOptions)[number],
  ) => {
    setLocale(language.locale);
    setLanguageMenuOpen(false);
  };

  return (
    <>
      {/* ── Main Header ──────────────────────────────────────────────────── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-navy-dark/95 backdrop-blur-glass border-b border-white/10 shadow-xl"
            : "bg-transparent",
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
                      "w-3 h-3 fill-glory-gold/60 text-glory-gold/60 transition-all duration-300",
                      LOGO_STAR_DELAY_CLASSES[i],
                      "group-hover:fill-glory-gold group-hover:text-glory-gold group-hover:scale-110",
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <div>
                <span className="font-hero text-xl md:text-2xl text-white tracking-wider leading-none block">
                  AMERICA
                </span>
                <span className="font-body text-[10px] text-glory-gold tracking-[0.25em] uppercase leading-none block -mt-0.5">
                  {copy.logoTagline}
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ────────────────────────────────────────────── */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {primaryNav.map((section) => (
                <div
                  key={section.title}
                  className="relative"
                  onMouseEnter={() => handleMenuEnter(section.title)}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link
                    href={section.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg font-body text-sm font-medium",
                      "transition-colors duration-150",
                      "text-white/80 hover:text-white hover:bg-white/10",
                      pathname.startsWith(section.href) &&
                        "text-glory-gold bg-glory-gold/10",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold",
                    )}
                    aria-current={
                      pathname.startsWith(section.href) ? "page" : undefined
                    }
                  >
                    {section.title}
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        activeMenu === section.title && "rotate-180",
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
                        className="absolute top-full left-1/2 mt-1 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/20 bg-navy-dark/65 shadow-2xl backdrop-blur-2xl isolate"
                        onMouseEnter={() => handleMenuEnter(section.title)}
                        onMouseLeave={handleMenuLeave}
                        role="menu"
                      >
                        {/* Keep the dropdown consistently blurred in both states,
                            but add enough tint that background text never wins. */}
                        <div
                          className="absolute inset-0 bg-gradient-to-b from-navy-dark/45 via-navy-dark/55 to-navy-dark/65 backdrop-blur-2xl"
                          aria-hidden="true"
                        />

                        {/* Section header */}
                        <div className="relative z-10 px-4 py-3 border-b border-white/10 bg-white/5">
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
                          className="relative z-10 py-2"
                          role="none"
                        >
                          {section.items.map(
                            (
                              item: (typeof section.items)[number],
                            ) => (
                            <motion.li
                              key={item.href}
                              variants={megaMenuLink}
                              role="none"
                            >
                              <Link
                                href={item.href}
                                className={cn(
                                  "flex flex-col px-4 py-2.5 hover:bg-white/8 transition-colors duration-150",
                                  "focus-visible:outline-none focus-visible:bg-white/8",
                                  pathname === item.href && "bg-glory-gold/10",
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
                            ),
                          )}
                        </motion.ul>

                        {/* View all link */}
                        <div className="relative z-10 px-4 py-3 border-t border-white/10 bg-white/5">
                          <Link
                            href={section.href}
                            className="font-body text-xs text-glory-gold hover:text-glory-gold-dark font-semibold tracking-wide uppercase flex items-center gap-1 transition-colors"
                          >
                            {copy.viewAllPrefix} {section.title} →
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
                {copy.dataLink}
              </Link>
            </nav>

            {/* ── Desktop CTA ────────────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-3">
              <div ref={languageMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setLanguageMenuOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 font-body text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold"
                  aria-haspopup="menu"
                  aria-expanded={languageMenuOpen}
                  aria-label={copy.chooseLanguage}
                >
                  <Languages className="h-4 w-4 text-glory-gold" />
                  <span>{selectedLanguage.flag}</span>
                  <span>{selectedLanguage.code}</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      languageMenuOpen && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  {languageMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full z-60 mt-2 w-44 overflow-hidden rounded-2xl border border-white/15 bg-navy-dark/80 shadow-2xl backdrop-blur-2xl"
                      role="menu"
                    >
                      {languageOptions.map((language) => (
                        <button
                          key={language.code}
                          type="button"
                          onClick={() => handleLanguageSelect(language)}
                          className={cn(
                            "flex w-full items-center justify-between px-4 py-3 text-left font-body text-sm transition-colors hover:bg-white/8",
                            selectedLanguage.code === language.code
                              ? "bg-glory-gold/10 text-glory-gold"
                              : "text-white/80",
                          )}
                          role="menuitem"
                        >
                          <span className="flex items-center gap-2">
                            <span>{language.flag}</span>
                            <span>{language.label}</span>
                          </span>
                          <span className="text-xs tracking-widest">
                            {language.code}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button href="/sitemap" variant="ghost" size="sm">
                {copy.viewAllCta}
              </Button>
              <Button href="/economy" variant="gold" size="sm">
                {copy.exploreCta}
              </Button>
            </div>

            {/* ── Mobile Hamburger ───────────────────────────────────────── */}
            <button
              className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold"
              onClick={() => setMobileOpen(true)}
              aria-label={copy.openMenu}
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
              aria-label={copy.mobileMenuLabel}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <span className="font-hero text-xl text-white tracking-wider">
                  AMERICA
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold"
                  aria-label={copy.closeMenu}
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="px-4 py-4" aria-label={copy.mobileNavLabel}>
                {navSections.map((section) => (
                  <div key={section.title} className="mb-1">
                    <Link
                      href={section.href}
                      className={cn(
                        "flex items-center justify-between w-full px-4 py-3 rounded-xl",
                        "font-body font-semibold text-base transition-colors duration-150",
                        pathname.startsWith(section.href)
                          ? "bg-glory-gold/15 text-glory-gold"
                          : "text-white/80 hover:bg-white/10 hover:text-white",
                      )}
                    >
                      {section.title}
                      {"badge" in section && (
                        <span className="text-xs font-body text-glory-gold/70 font-normal">
                          {section.badge}
                        </span>
                      )}
                    </Link>
                  </div>
                ))}

                <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                  <Link
                    href="/data"
                    className="block px-4 py-3 rounded-xl font-body text-white/80 hover:bg-white/10 font-semibold"
                  >
                    {locale === "ro" ? "Date și Studii" : "Data & Studies"}
                  </Link>
                  <Link
                    href="/gallery"
                    className="block px-4 py-3 rounded-xl font-body text-white/80 hover:bg-white/10 font-semibold"
                  >
                    {copy.galleryLink}
                  </Link>
                  <Link
                    href="/timeline"
                    className="block px-4 py-3 rounded-xl font-body text-white/80 hover:bg-white/10 font-semibold"
                  >
                    {copy.timelineLink}
                  </Link>
                </div>

                <div className="mt-6 px-4">
                  <Button href="/economy" variant="gold" size="lg" fullWidth>
                    {copy.exploreNation}
                  </Button>
                </div>

                <div className="mt-8 border-t border-white/10 px-4 pt-6">
                  <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.28em] text-glory-gold">
                    {copy.languageHeading}
                  </p>
                  <div className="space-y-2">
                    {languageOptions.map((language) => (
                      <button
                        key={language.code}
                        type="button"
                        onClick={() => handleLanguageSelect(language)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left font-body text-sm transition-colors",
                          selectedLanguage.code === language.code
                            ? "border-glory-gold/35 bg-glory-gold/10 text-glory-gold"
                            : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span>{language.flag}</span>
                          <span>{language.label}</span>
                        </span>
                        <span className="text-xs tracking-widest">
                          {language.code}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
