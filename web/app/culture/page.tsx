// ─────────────────────────────────────────────────────────────────────────────
// page.tsx — CULTURE HUB · "The American Operating System"
//
// Design language: Life Magazine × The Atlantic × Warm Editorial
// The warmest vertical on the site. Dark-to-cream alternating rhythm.
//
// §1  HERO             — Filmstrip mosaic with parallax depth
// §2  NUMBERS STRIP    — 5 stat counters in glory-gold
// §3  THESIS BLOCK     — Magazine longread opener with pull quote
// §4  SOFT POWER       — 8 domain scorecards
// §5  BENTO GRID       — Magazine editorial subpage navigation
// §6  FREE MARKET      — Cream/ivory argument strip (first light section)
// §7  RADAR CHART      — Soft power teaser comparison
// §8  QUOTE CAROUSEL   — 3 rotating cultural quotes
// §9  NEWSLETTER       — Existing reusable component
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import { SITE_IMAGES } from "@/lib/site-images";
import { VERTICALS_THEMATIC_DATA } from "@/lib/data/verticals-thematic-data";
import DeepDiveSection from "@/components/shared/DeepDiveSection";
import { IconicPhotographs } from "@/components/shared/IconicPhotographs";
import { DEEP_DIVE_THEMES } from "@/lib/deep-dive-themes";

import {
  getCultureStats,
  getCultureThesis,
  getCulturePillars,
  getCultureSubpages,
  getCultureArguments,
  getCultureQuotes,
  CULTURE_RADAR_DATA,
  getCultureDecades,
  getSoftPowerBudget,
  getCultureMusicGenres,
  getCultureCulinaryPillars,
  getCultureOriginations,
  getCultureEditorialImperialism,
  getCultureDigitalPipes,
  getCultureIcons,
  getCultureHollywood,
  getCultureManifesto,
  getCultureEnglishLanguage,
} from "@/lib/data/culture-data";





import {
  CultureStyles,
  VideoCultureHero,
  CultureNumbersStrip,
  CultureThesisBlock,
  CulturePillarsStrip,
  CultureBentoGrid,
  CultureFreeMarketStrip,
  CultureAsymmetryMatrix,
  CultureQuoteCarousel,
  CultureParallaxDivider,
  CultureBrandLogosMarquee,
  CultureViewportQuote,
  CultureTimelineScroll,
  CultureSoftPowerBudget,
  CultureArchiveVault,
  CultureMusicSection,
  CultureCulinarySection,
  CultureOriginationStrip,
  CultureEditorialImperialism,
  CultureDigitalPipes,
  CultureIconsSection,
  CultureHollywoodEditorial,
  CultureManifestoSection,
  CultureEnglishLanguage,
  CultureSportsFashionStrip,
} from "@/components/culture/CulturePageComponents";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "American Culture | The American Operating System",
  description:
    "America didn't just build a nation — it built the operating system for modern civilization. Explore the cultural exports, soft power pillars, and free-market forces that shape how the world eats, dresses, watches, and dreams.",
  openGraph: {
    title: "American Culture | The American Operating System",
    description:
      "Film, music, food, sports, fashion, brands — America's cultural arsenal, built by free markets and broadcast to the world.",
    images: [{ url: SITE_IMAGES.culture.timesSquare, width: 1200, height: 630 }],
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CulturePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  // Data
  const stats = getCultureStats(locale);
  const thesis = getCultureThesis(locale);
  const pillars = getCulturePillars(locale);
  const subpages = getCultureSubpages(locale);
  const arguments_ = getCultureArguments(locale);
  const quotes = getCultureQuotes(locale);
  const decades = getCultureDecades(locale);
  const budget = getSoftPowerBudget(locale);
  const musicGenres = getCultureMusicGenres(locale);
  const culinaryPillars = getCultureCulinaryPillars(locale);
  const originations = getCultureOriginations(locale);
  const editorialImperialism = getCultureEditorialImperialism(locale);
  const digitalPipes = getCultureDigitalPipes(locale);
  const culturalIcons = getCultureIcons(locale);
  const hollywoodData = getCultureHollywood(locale);
  const manifestoData = getCultureManifesto(locale);
  const englishLanguageData = getCultureEnglishLanguage(locale);




  // Localized copy
  const hero = {
    eyebrow: isRo
      ? "Putere Soft · Dominanță Culturală · Acoperire Globală"
      : "Soft Power · Cultural Dominance · Global Reach",
    titleLine1: isRo ? "SISTEMUL DE" : "THE AMERICAN",
    titleLine2: isRo ? "OPERARE AMERICAN" : "OPERATING SYSTEM",
    deck: isRo
      ? "America nu a construit doar o națiune. A construit sistemul de operare al civilizației moderne — prin piețe libere, întreprinderi private și acces democratic."
      : "America didn\u2019t just build a nation. It built the operating system for modern civilization \u2014 through free markets, private enterprise, and democratic access.",
  };

  const gridTitle = isRo ? "Verticale Culturale" : "Cultural Verticals";
  const argumentTitle = isRo ? "Argumentul Pieței Libere" : "The Free Market Argument";
  const timelineTitle = isRo ? "Decenii de Influență" : "Decades of Influence";
  const radarHeadline = isRo
    ? "Pe fiecare dimensiune a influenței culturale, o singură națiune conduce."
    : "Across every dimension of cultural influence, one nation leads.";
  const musicTitle = isRo ? "Muzica de Export: Rădăcini Regionale" : "The Sound of Export: Regional Roots";
  const culinaryTitle = isRo ? "Estetica Gustului Democrat: Diners, Smoke & Systems" : "The Democratic Palate: Diners, Smoke & Systems";

  const bonoQuote = quotes.find((q) => q.author === "Bono") || quotes[1];

  return (
    <main className="min-h-screen">
      <CultureStyles />

      {/* §1 — Video Culture Hero */}
      <VideoCultureHero
        videoSrc="/videos/times-square-aerial.mp4"
        imageSrc={SITE_IMAGES.culture.timesSquare}
        eyebrow={hero.eyebrow}
        titleLine1={hero.titleLine1}
        titleLine2={hero.titleLine2}
        deck={hero.deck}
      />

      {/* §2 — Subpage Navigation (Magazine Table of Contents) */}
      <CultureBentoGrid subpages={subpages} sectionTitle={gridTitle} />

      {/* §3 — Numbers Strip */}
      <CultureNumbersStrip stats={stats} isRo={isRo} />

      {/* §4 — Thesis Block */}
      <CultureThesisBlock thesis={thesis} />

      {/* Parallax Divider 1 — Times Square Iconic */}
      <CultureParallaxDivider imageSrc={SITE_IMAGES.culture.timesSquareIconic} alt="Times Square Iconic" />

      {/* American Brand Logos Continuous Marquee */}
      <CultureBrandLogosMarquee />

      {/* §5 — Soft Power Pillars */}
      <CulturePillarsStrip pillars={pillars} />

      {/* §6 — Origination Strip */}
      <CultureOriginationStrip originations={originations} isRo={isRo} />

      {/* Transition: Dark to Cream */}
      <div className="h-12 w-full gradient-dark-to-cream" />

      {/* §7 — Free Market Argument (Cream Section) */}
      <CultureFreeMarketStrip arguments_={arguments_} sectionTitle={argumentTitle} />

      {/* §8 — Soft Power Budget Scale Comparison (Cream Section) */}
      <CultureSoftPowerBudget budgetLines={budget} />

      {/* §9 — Culinary Pillars Section (Cream Section) */}
      <CultureCulinarySection pillars={culinaryPillars} sectionTitle={culinaryTitle} isRo={isRo} />

      {/* §10 — The English Language Editorial Section (Cream Section) */}
      <CultureEnglishLanguage data={englishLanguageData} isRo={isRo} />

      {/* Transition: Cream to Dark */}
      <div className="h-12 w-full gradient-cream-to-dark" />

      {/* §11 — Editorial Counter-Programming: Imperialism Critique */}
      <CultureEditorialImperialism data={editorialImperialism} isRo={isRo} />

      {/* §12 — Cultural Timeline Scroll Area */}
      <CultureTimelineScroll decades={decades} sectionTitle={timelineTitle} />

      {/* §13 — Full Viewport Quote Moment (Bono: "America is an idea...") */}
      <CultureViewportQuote quote={bonoQuote} bgImageSrc={SITE_IMAGES.culture.route66} />

      {/* §14 — Digital America: Pipes of Global Culture */}
      <CultureDigitalPipes data={digitalPipes} isRo={isRo} />

      {/* §15 — Music Origins Section */}
      <CultureMusicSection genres={musicGenres} sectionTitle={musicTitle} isRo={isRo} />

      {/* §16 — Sports & Fashion Editorial Teasers */}
      <CultureSportsFashionStrip isRo={isRo} />

      {/* §17 — Cultural Icons — The Faces of America */}
      <CultureIconsSection data={culturalIcons} isRo={isRo} />

      {/* §17 — Asymmetry of Influence Matrix */}
      <CultureAsymmetryMatrix
        data={CULTURE_RADAR_DATA}
        headline={radarHeadline}
      />

      {/* §18 — Hollywood — The Dream Factory Editorial */}
      <CultureHollywoodEditorial data={hollywoodData} isRo={isRo} />

      {/* Parallax Divider 2 — NFL/Cowboys Stadium */}
      <CultureParallaxDivider imageSrc={SITE_IMAGES.culture.nflStadium} alt="American Football Stadium Lights" />

      {/* §19 — Interactive Archive Vault Showcase */}
      <CultureArchiveVault isRo={isRo} />

      {/* §20 — Quote Carousel */}
      <CultureQuoteCarousel quotes={quotes} />

      {/* Iconic Photographs */}
      <IconicPhotographs
        section="culture"
        intro="American sport, music, film, and celebrity — the figures and moments that shaped the nation's popular culture, captured on film."
      />

      {/* Deep Dive Archive */}
      <DeepDiveSection
        locale={locale}
        topics={VERTICALS_THEMATIC_DATA["culture"] || []}
        theme={DEEP_DIVE_THEMES.culture}
      />

      {/* §21 — Closing Manifesto exit section */}
      <CultureManifestoSection data={manifestoData} isRo={isRo} />
    </main>
  );
}
