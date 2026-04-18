"use client";

// ─── Footer ───────────────────────────────────────────────────────────────────
// Dark navy footer with navigation links, star motif, and flag animation.

import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { SITE } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { yearsSince1776 } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const yearsOld = yearsSince1776();
  const { locale } = useLanguage();
  const copy =
    locale === "ro"
      ? {
          logoTagline: "Cea Mai Mare Națiune",
          description: `O celebrare cinematografică a Statelor Unite ale Americii — ${yearsOld} ani de libertate, inovație și realizări fără egal.`,
          est: `Fondată în 1776 · ${yearsOld} Ani de Forță`,
          sections: [
            {
              heading: "Explorează",
              links: [
                { label: "Economie", href: "/economy" },
                { label: "Natură și Parcuri", href: "/nature" },
                { label: "Armată", href: "/military" },
                { label: "Constituție", href: "/constitution" },
                { label: "Cultură", href: "/culture" },
              ],
            },
            {
              heading: "Inovație",
              links: [
                { label: "Tehnologie", href: "/innovation" },
                { label: "Știință", href: "/science" },
                { label: "Universități", href: "/universities" },
                { label: "Calitatea Vieții", href: "/quality-of-life" },
                { label: "Leadership Global", href: "/global-leadership" },
              ],
            },
            {
              heading: "Date și Media",
              links: [
                { label: "Date și Studii", href: "/data" },
                { label: "Galerie Foto", href: "/gallery" },
                { label: "Cronologie", href: "/timeline" },
                { label: "Explorator de Hartă", href: "/explorer" },
                { label: "Toate Secțiunile", href: "/sitemap" },
              ],
            },
          ],
          copyright: `© ${currentYear} ${SITE.name}. O celebrare a realizărilor americane.`,
          madeWith: "Realizat cu",
          inThe: "în",
          country: "SUA 🇺🇸",
          disclaimer:
            "Toate statisticile sunt preluate din surse oficiale guvernamentale, academice și instituții internaționale.",
        }
      : {
          logoTagline: "The Greatest Nation",
          description: `A cinematic celebration of the United States of America — ${yearsOld} years of freedom, innovation, and unrivaled achievement.`,
          est: `Est. 1776 · ${yearsOld} Years Strong`,
          sections: [
            {
              heading: "Explore",
              links: [
                { label: "Economy", href: "/economy" },
                { label: "Nature & Parks", href: "/nature" },
                { label: "Military", href: "/military" },
                { label: "Constitution", href: "/constitution" },
                { label: "Culture", href: "/culture" },
              ],
            },
            {
              heading: "Innovation",
              links: [
                { label: "Technology", href: "/innovation" },
                { label: "Science", href: "/science" },
                { label: "Universities", href: "/universities" },
                { label: "Quality of Life", href: "/quality-of-life" },
                { label: "Global Leadership", href: "/global-leadership" },
              ],
            },
            {
              heading: "Data & Media",
              links: [
                { label: "Data & Studies", href: "/data" },
                { label: "Photo Gallery", href: "/gallery" },
                { label: "Timeline", href: "/timeline" },
                { label: "Map Explorer", href: "/explorer" },
                { label: "All Sections", href: "/sitemap" },
              ],
            },
          ],
          copyright: `© ${currentYear} ${SITE.name}. A celebration of American achievement.`,
          madeWith: "Made with",
          inThe: "in the",
          country: "USA 🇺🇸",
          disclaimer:
            "All statistics sourced from official government, academic, and international institutions.",
        };

  return (
    <footer
      className="bg-navy-dark border-t border-white/10 text-white"
      role="contentinfo"
    >
      {/* ── Main Footer Body ────────────────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
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

            <p className="font-body text-white/55 text-sm leading-relaxed max-w-xs mb-6">
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
            <div key={section.heading}>
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
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/35 text-center sm:text-left">
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
            <span className="text-glory-gold font-semibold">{copy.country}</span>
          </p>

          {/* Disclaimer */}
          <p className="font-body text-xs text-white/20 text-center sm:text-right max-w-xs">
            {copy.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
