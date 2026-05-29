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
} from "@/lib/data/culture-data";

import {
  CultureStyles,
  CultureFilmstripHero,
  CultureNumbersStrip,
  CultureThesisBlock,
  CulturePillarsStrip,
  CultureBentoGrid,
  CultureFreeMarketStrip,
  CultureRadarTeaser,
  CultureQuoteCarousel,
  CultureParallaxDivider,
  CultureLoopingVideoSection,
  CultureBrandLogosMarquee,
  CultureViewportQuote,
  CultureTimelineScroll,
  CultureSoftPowerBudget,
  CultureArchiveVault,
  CultureLivingMediaWall,
} from "@/components/culture/CulturePageComponents";

import { NewsletterSection } from "@/components/sections/NewsletterSection";

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
  const radarCta = isRo ? "Explorează analiza completă" : "Explore the full analysis";

  const bonoQuote = quotes.find((q) => q.author === "Bono") || quotes[1];

  return (
    <main className="min-h-screen">
      <CultureStyles />

      {/* §1 — Filmstrip Hero */}
      <CultureFilmstripHero
        eyebrow={hero.eyebrow}
        titleLine1={hero.titleLine1}
        titleLine2={hero.titleLine2}
        deck={hero.deck}
      />

      {/* §2 — Numbers Strip */}
      <CultureNumbersStrip stats={stats} />

      {/* §3 — Thesis Block */}
      <CultureThesisBlock thesis={thesis} />

      {/* Parallax Divider 1 — Times Square Iconic */}
      <CultureParallaxDivider imageSrc={SITE_IMAGES.culture.timesSquareIconic} alt="Times Square Iconic" />

      {/* §4 — Soft Power Pillars */}
      <CulturePillarsStrip pillars={pillars} />

      {/* §5 — Editorial Bento Grid */}
      <CultureBentoGrid subpages={subpages} sectionTitle={gridTitle} />

      {/* Looping Video Section — Times Square Aerial */}
      <CultureLoopingVideoSection />

      {/* American Brand Logos Continuous Marquee */}
      <CultureBrandLogosMarquee />

      {/* §6 — Free Market Argument (Cream Section) */}
      <CultureFreeMarketStrip arguments_={arguments_} sectionTitle={argumentTitle} />

      {/* Soft Power Budget Scale Comparison (Cream Section) */}
      <CultureSoftPowerBudget budgetLines={budget} />

      {/* Cultural Timeline Scroll Area */}
      <CultureTimelineScroll decades={decades} sectionTitle={timelineTitle} />

      {/* Full Viewport Quote Moment (Bono: "America is an idea...") */}
      <CultureViewportQuote quote={bonoQuote} bgImageSrc={SITE_IMAGES.culture.route66} />

      {/* Living Media Wall Grid (40 Shifting Cultural Artifacts) */}
      <CultureLivingMediaWall />

      {/* §7 — Radar Chart Teaser */}
      <CultureRadarTeaser
        data={CULTURE_RADAR_DATA}
        headline={radarHeadline}
        ctaLabel={radarCta}
        ctaHref="#"
      />

      {/* Parallax Divider 2 — NFL/Cowboys Stadium */}
      <CultureParallaxDivider imageSrc={SITE_IMAGES.culture.nflStadium} alt="American Football Stadium Lights" />

      {/* Interactive Archive Vault Showcase */}
      <CultureArchiveVault isRo={isRo} />

      {/* §8 — Quote Carousel */}
      <CultureQuoteCarousel quotes={quotes} />

      {/* §9 — Newsletter */}
      <div className="culture-bg">
        <NewsletterSection />
      </div>
    </main>
  );
}
