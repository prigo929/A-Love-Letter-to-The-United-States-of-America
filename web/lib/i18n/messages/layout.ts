import { SITE } from "@/lib/constants";
import { yearsSince1776 } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

export function getHeaderCopy(locale: Locale) {
  if (locale === "ro") {
    return {
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
      historyLink: "Istorie",
      exploreNation: "Explorează Națiunea",
      languageHeading: "Limbă",
      viewAllPrefix: "Vezi Toată Secțiunea",
    };
  }
  return {
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
    historyLink: "History",
    exploreNation: "Explore the Nation",
    languageHeading: "Language",
    viewAllPrefix: "View All",
  };
}

export function getFooterCopy(locale: Locale) {
  const currentYear = new Date().getFullYear();
  const yearsOld = yearsSince1776();

  if (locale === "ro") {
    return {
      logoTagline: "Cea Mai Mare Națiune",
      description: `O celebrare cinematografică a Statelor Unite ale Americii: ${yearsOld} ani de libertate, inovație și realizări fără egal.`,
      est: "Fondată în 1776",
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
            { label: "Istorie", href: "/history" },
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
    };
  }
  return {
    logoTagline: "The Greatest Nation",
    description: `A cinematic celebration of the United States of America: ${yearsOld} years of freedom, innovation, and unrivaled achievement.`,
    est: "Est. 1776",
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
          { label: "History", href: "/history" },
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
}
