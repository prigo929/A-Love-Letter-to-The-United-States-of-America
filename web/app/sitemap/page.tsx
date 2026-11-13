// ─── Sitemap Page ──────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { getLocalizedNavSections } from "@/lib/constants";
import { getServerLocale } from "@/lib/i18n/server";
import { SitemapClient } from "@/components/sitemap/SitemapClient";

export const metadata: Metadata = {
  title: "All Sections & Directory",
  description:
    "Complete directory: explore every chronicle, database, and interactive portal celebrating American greatness.",
  alternates: {
    canonical: "/sitemap",
  },
};

export default async function SitemapPage() {
  const locale = await getServerLocale();
  const navSections = getLocalizedNavSections(locale);

  const portals =
    locale === "ro"
      ? [
          {
            href: "/explorer",
            title: "Explorator de Hartă GIS",
            description: "Straturi demografice de recensământ și infrastructură pe comitate.",
            tag: "GIS & Date",
            iconName: "explorer",
          },
          {
            href: "/gallery",
            title: "Galerie & Active Publice",
            description: "Peste 1.100 de cadre foto de înaltă rezoluție și vectori publici.",
            tag: "Arhivă Vizuală",
            iconName: "gallery",
          },
          {
            href: "/videos",
            title: "Teatru Video Cinematic",
            description: "Documentare și cronici vizuale ale marilor momente americane.",
            tag: "Media",
            iconName: "videos",
          },
          {
            href: "/civics-quiz",
            title: "Examen de Cetățenie & Civică",
            description: "Testul oficial USCIS de naturalizare cu 100 de întrebări.",
            tag: "Educație",
            iconName: "civics-quiz",
          },
          {
            href: "/interactive",
            title: "Oracolul AI America",
            description: "Întrebări și răspunsuri inteligente din întreaga bază de cunoștințe.",
            tag: "Inteligență Artificială",
            iconName: "interactive",
          },
          {
            href: "/united-states",
            title: "Profilul Celor 50 de State",
            description: "Statistici esențiale, capitole demografice și date naționale.",
            tag: "Profil Național",
            iconName: "united-states",
          },
          {
            href: "/natural-resources",
            title: "Resurse Naturale & Energie",
            description: "Bogățiile subterane, zăcămintele și producția energetică.",
            tag: "Resurse",
            iconName: "natural-resources",
          },
          {
            href: "/data/misconceptions",
            title: "Mituri vs. Realitate",
            description: "Demontarea concepțiilor greșite comune cu date factuale.",
            tag: "Factologic",
            iconName: "misconceptions",
          },
          {
            href: "/search",
            title: "Portalul de Căutare Globală",
            description: "Indexul complet de căutare instantanee pe întregul site.",
            tag: "Căutare",
            iconName: "search",
          },
        ]
      : [
          {
            href: "/explorer",
            title: "Interactive Map Explorer",
            description: "County-level Census demographics and infrastructure overlays.",
            tag: "GIS & Demographics",
            iconName: "explorer",
          },
          {
            href: "/gallery",
            title: "Photo & Public Asset Gallery",
            description: "Over 1,100 high-resolution photo frames and public graphic vectors.",
            tag: "Visual Archive",
            iconName: "gallery",
          },
          {
            href: "/videos",
            title: "Cinematic Video Theatre",
            description: "Curated documentaries and visual chronicles of American milestones.",
            tag: "Media Theatre",
            iconName: "videos",
          },
          {
            href: "/civics-quiz",
            title: "USCIS Civics Examination",
            description: "Official 100-question citizenship test with scoring analytics.",
            tag: "Civic Education",
            iconName: "civics-quiz",
          },
          {
            href: "/interactive",
            title: "Ask America AI Oracle",
            description: "Intelligent Q&A powered by the complete patriotic knowledge base.",
            tag: "Artificial Intelligence",
            iconName: "interactive",
          },
          {
            href: "/united-states",
            title: "United States & 50-State Profile",
            description: "Key national statistics, historical facts, and state indicators.",
            tag: "National Profile",
            iconName: "united-states",
          },
          {
            href: "/natural-resources",
            title: "Natural Resources & Energy",
            description: "Mineral wealth, fertile basins, and energy independence.",
            tag: "Energy & Basin",
            iconName: "natural-resources",
          },
          {
            href: "/data/misconceptions",
            title: "Misconceptions Index",
            description: "Refuting pervasive myths about American history and governance.",
            tag: "Fact Verification",
            iconName: "misconceptions",
          },
          {
            href: "/search",
            title: "Global Search Portal",
            description: "Instantaneous cross-site search across all chapters and records.",
            tag: "Global Search",
            iconName: "search",
          },
        ];

  const copy =
    locale === "ro"
      ? {
          eyebrow: "INDEXUL REPUBLICII",
          title: "Toate Secțiunile & Arhivele",
          subtitle:
            "Fiecare capitol, cronologie, bază de date, uneltă interactivă și document istoric al civilizației americane.",
          stats: {
            verticals: "Verticale de Bază",
            chapters: "Capitole Publicate",
            portals: "Portale Interactive",
            visualAssets: "Active & Fotografii",
          },
          filterAll: "Toate (24)",
          filterPortals: "Portale (9)",
          filterChronicles: "Cronici Tematice (15)",
          searchPlaceholder: "Filtrează capitole, verticale sau portale interactive...",
          portalsEyebrow: "PUNCTE DE ATRACȚIE",
          portalsTitle: "Portale Interactive & Arhive Vizuale",
          portalsDescription:
            "Aplicații web avansate, straturi GIS de recensământ, arhive foto și examene civice.",
          verticalsEyebrow: "CRONICI COMPLETE",
          verticalsTitle: "Verticale Tematice & Capitole",
          verticalsDescription:
            "Cercetări detaliate despre istorie, guvernare, inovație, economie și cultura americană.",
          exploreHub: "Vezi Secțiunea",
          noResults: "Niciun rezultat găsit",
          noResultsSub: "Nu am găsit capitole sau portale care să corespundă căutării tale.",
          resetSearch: "Resetează Filtrele",
          searchCtaTitle: "Căutare Instantanee pe Site",
          searchCtaDesc:
            "Caută în întregul index de conținut cu indexare în timp real și scoruri de relevanță.",
          searchCtaButton: "Deschide Căutarea Globală",
          oracleCtaTitle: "Oracolul AI America",
          oracleCtaDesc:
            "Adresează orice întrebare despre istoria, constituția sau inovațiile Statelor Unite.",
          oracleCtaButton: "Pornește Oracolul AI",
        }
      : {
          eyebrow: "DIRECTORY ARCHIVE",
          title: "All Sections & Archives",
          subtitle:
            "Every chronicle, database, interactive portal, and historical record celebrating America's extraordinary story.",
          stats: {
            verticals: "Core Verticals",
            chapters: "Published Chapters",
            portals: "Interactive Portals",
            visualAssets: "Frames & Vectors",
          },
          filterAll: "All (24)",
          filterPortals: "Portals (9)",
          filterChronicles: "Thematic Chronicles (15)",
          searchPlaceholder: "Filter chapters, verticals, or interactive portals...",
          portalsEyebrow: "FEATURE HIGHLIGHTS",
          portalsTitle: "Interactive Portals & Visual Archives",
          portalsDescription:
            "Specialized web applications, county GIS explorer, visual assets, and civics examinations.",
          verticalsEyebrow: "COMPLETE CHRONICLES",
          verticalsTitle: "Thematic Verticals & Chapters",
          verticalsDescription:
            "Comprehensive deep dives across American history, governance, innovation, and culture.",
          exploreHub: "Explore Hub",
          noResults: "No Results Found",
          noResultsSub: "No chapters or portals matched your current filter criteria.",
          resetSearch: "Reset Filters",
          searchCtaTitle: "Instant Cross-Site Search",
          searchCtaDesc:
            "Search through the entire knowledge base with real-time keyword indexing and relevance scoring.",
          searchCtaButton: "Open Global Search",
          oracleCtaTitle: "Ask America AI Oracle",
          oracleCtaDesc:
            "Ask any question about American history, economy, innovation, or democratic governance.",
          oracleCtaButton: "Launch AI Oracle",
        };

  return (
    <SitemapClient
      locale={locale}
      navSections={navSections}
      portals={portals}
      copy={copy}
    />
  );
}
