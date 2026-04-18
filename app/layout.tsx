// ─── Root Layout ─────────────────────────────────────────────────────────────
// Sets up: fonts, global providers, header/footer, page transitions.
// Everything here wraps EVERY page.

import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop, ReadingProgressBar } from "@/components/layout/PageChrome";
import { SITE } from "@/lib/constants";
import "@/app/globals.css";

// ─── Font Loading (next/font for performance + no CLS) ────────────────────────

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hero",
  display: "swap", // Text visible immediately with fallback font
  preload: true,
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700"],
});

// ─── Site-wide Metadata ───────────────────────────────────────────────────────

export const metadata: Metadata = {
  // ── Basic ────────────────────────────────────────────────────────────────
  title: {
    default: `${SITE.name} | A Celebration of the United States`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "United States",
    "America",
    "USA",
    "American history",
    "US economy",
    "US military",
    "national parks",
    "Constitution",
    "American culture",
    "American innovation",
    "Silicon Valley",
    "American universities",
    "American exceptionalism",
  ],

  // ── Authors ──────────────────────────────────────────────────────────────
  authors: [{ name: "America: The Greatest Nation" }],
  creator: "America: The Greatest Nation",
  publisher: "America: The Greatest Nation",

  // ── Open Graph ───────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | The Greatest Nation in History`,
    description: SITE.description,
    images: [
      {
        url: `${SITE.url}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "The United States of America — The Greatest Nation",
      },
    ],
  },

  // ── Twitter/X Card ───────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    creator: SITE.twitter,
    title: `${SITE.name} | The Greatest Nation`,
    description: SITE.description,
    images: [`${SITE.url}/images/og-default.jpg`],
  },

  // ── Icons ────────────────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.svg",
  },

  // ── Manifest ─────────────────────────────────────────────────────────────
  manifest: "/site.webmanifest",

  // ── Robots ───────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ─── Viewport ─────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3C3B6E" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
};

// ─── Structured Data (JSON-LD) ────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// ─── Root Layout Component ────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${playfairDisplay.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* DNS prefetch for CDN-hosted map data */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>

      <body className="bg-navy-dark text-white antialiased font-body">
        <ReadingProgressBar />

        {/* Skip to content link — accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* Sticky header */}
        <Header />

        {/* Page content */}
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>

        {/* Footer */}
        <Footer />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
