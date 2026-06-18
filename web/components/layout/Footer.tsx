"use client";

// ─── Footer ───────────────────────────────────────────────────────────────────
// Dark navy footer with navigation links, star motif, and flag animation.

import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { SITE } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getFooterCopy } from "@/lib/i18n/messages/layout";
export function Footer() {
  const { locale } = useLanguage();
  const copy = getFooterCopy(locale);

  return (
    <footer
      className="bg-navy-dark border-t border-white/10 text-white"
      role="contentinfo"
    >
      {/* ── Main Footer Body ────────────────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col items-center text-center">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-6 group"
            >
              <div className="flex gap-0.5 items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-glory-gold text-glory-gold"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div>
                <span className="font-hero text-2xl text-white tracking-wider block leading-none">
                  AMERICA
                </span>
                <span className="font-body text-[10px] text-glory-gold tracking-[0.2em] uppercase">
                  {copy.logoTagline}
                </span>
              </div>
            </Link>

            <p className="font-body text-white/55 text-sm leading-relaxed max-w-xs mb-6 mx-auto">
              {copy.description}
            </p>

            {/* Est. badge */}
            <div className="inline-flex items-center gap-2 bg-glory-gold/10 border border-glory-gold/25 rounded-full px-4 py-2">
              <Star
                className="w-3 h-3 fill-glory-gold text-glory-gold"
                aria-hidden="true"
              />
              <span className="font-body text-xs text-glory-gold font-semibold tracking-widest uppercase">
                {copy.est}
              </span>
              <Star
                className="w-3 h-3 fill-glory-gold text-glory-gold"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Nav columns */}
          {copy.sections.map((section) => (
            <div key={section.heading} className="flex flex-col items-center text-center">
              <h3 className="font-body text-xs font-semibold text-glory-gold uppercase tracking-widest mb-5">
                {section.heading}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-white/55 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:text-glory-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Red/Blue stripe divider ──────────────────────────────────────────── */}
      <div className="flex h-1" aria-hidden="true">
        <div className="flex-1 bg-glory-red" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-glory-blue" />
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────────────────── */}
      <div className="bg-black/30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center gap-4 text-center">
          <p className="font-body text-xs text-white/35">
            {copy.copyright}
          </p>

          {/* "Made with love in the USA" */}
          <p className="font-body text-xs text-white/35 flex items-center gap-1.5">
            {copy.madeWith}
            <Heart
              className="w-3 h-3 fill-glory-red text-glory-red animate-pulse"
              aria-label="love"
            />
            {copy.inThe}
            {locale === "ro" ? (
              <span className="font-semibold select-none">
                <span className="text-glory-red">S</span>
                <span className="text-white">U</span>
                <span className="text-blue-400">A</span> 🇺🇸
              </span>
            ) : (
              <span className="font-semibold select-none">
                <span className="text-glory-red">U</span>
                <span className="text-white">S</span>
                <span className="text-blue-400">A</span> 🇺🇸
              </span>
            )}
          </p>

          {/* Disclaimer */}
          <p className="font-body text-xs text-white/20 max-w-md">
            {copy.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
