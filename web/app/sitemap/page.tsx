// ─── Sitemap Page ──────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Link from "next/link";
import { getLocalizedNavSections } from "@/lib/constants";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "All Sections",
  description:
    "Complete sitemap: explore every section celebrating American greatness.",
};

export default async function SitemapPage() {
  const locale = await getServerLocale();
  const navSections = getLocalizedNavSections(locale);
  const copy =
    locale === "ro"
      ? {
          title: "Toate Secțiunile",
          description: "Fiecare capitol al poveștii extraordinare a Americii.",
          portalsTitle: "Portale Interactive & Arhive Vizuale",
          portalsDescription:
            "Aplicații web interactive, explorator GIS, arhive foto și examene civice.",
          portals: [
            {
              href: "/explorer",
              title: "Explorator de Hartă GIS",
              description: "Straturi demografice de recensământ și infrastructură pe comitate.",
            },
            {
              href: "/gallery",
              title: "Galerie & Active Publice",
              description: "Peste 1.100 de cadre foto de înaltă rezoluție și vectori publici.",
            },
            {
              href: "/videos",
              title: "Teatru Video Cinematic",
              description: "Documentare și cronici vizuale ale marilor momente americane.",
            },
            {
              href: "/civics-quiz",
              title: "Examen de Cetățenie & Civică",
              description: "Testul oficial USCIS de naturalizare cu 100 de întrebări.",
            },
            {
              href: "/interactive",
              title: "Oracolul AI America",
              description: "Întrebări și răspunsuri inteligente din întreaga bază de cunoștințe.",
            },
            {
              href: "/united-states",
              title: "Profilul Celor 50 de State",
              description: "Statistici esențiale, capitole demografice și date naționale.",
            },
            {
              href: "/natural-resources",
              title: "Resurse Naturale & Energie",
              description: "Bogățiile subterane, zăcămintele și producția energetică.",
            },
            {
              href: "/data/misconceptions",
              title: "Mituri vs. Realitate",
              description: "Demontarea concepțiilor greșite comune cu date factuale.",
            },
            {
              href: "/search",
              title: "Portalul de Căutare Globală",
              description: "Indexul complet de căutare instantanee pe întregul site.",
            },
          ],
        }
      : {
          title: "All Sections",
          description: "Every chapter of America's extraordinary story.",
          portalsTitle: "Interactive Portals & Visual Archives",
          portalsDescription:
            "Interactive web applications, county GIS explorer, visual assets, and civics examinations.",
          portals: [
            {
              href: "/explorer",
              title: "Interactive Map Explorer",
              description: "County-level Census demographics and infrastructure overlays.",
            },
            {
              href: "/gallery",
              title: "Photo & Public Asset Gallery",
              description: "Over 1,100 high-resolution photo frames and public graphic vectors.",
            },
            {
              href: "/videos",
              title: "Cinematic Video Theatre",
              description: "Curated documentaries and visual chronicles of American milestones.",
            },
            {
              href: "/civics-quiz",
              title: "USCIS Civics Examination",
              description: "Official 100-question citizenship test with scoring analytics.",
            },
            {
              href: "/interactive",
              title: "Ask America AI Oracle",
              description: "Intelligent Q&A powered by the complete patriotic knowledge base.",
            },
            {
              href: "/united-states",
              title: "United States & 50-State Profile",
              description: "Key national statistics, historical facts, and state indicators.",
            },
            {
              href: "/natural-resources",
              title: "Natural Resources & Energy",
              description: "Mineral wealth, fertile basins, and energy independence.",
            },
            {
              href: "/data/misconceptions",
              title: "Misconceptions Index",
              description: "Refuting pervasive myths about American history and governance.",
            },
            {
              href: "/search",
              title: "Global Search Portal",
              description: "Instantaneous cross-site search across all chapters and records.",
            },
          ],
        };

  return (
    <div className="min-h-screen bg-navy-dark pt-24 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-h1 text-white mb-4 mt-8">
          {copy.title}
        </h1>
        <p className="font-body text-white/60 text-lg mb-12">
          {copy.description}
        </p>

        {/* Featured Interactive Portals */}
        <section className="mb-14">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-glory-gold font-semibold">
                Feature Highlights
              </p>
              <h2 className="font-display text-2xl text-white mt-1">
                {copy.portalsTitle}
              </h2>
            </div>
            <p className="font-body text-xs text-white/40 max-w-md">
              {copy.portalsDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {copy.portals.map((portal) => (
              <Link
                key={portal.href}
                href={portal.href}
                className="group p-5 rounded-2xl border border-glory-gold/20 bg-glory-gold/[0.03] hover:bg-glory-gold/[0.08] hover:border-glory-gold/50 transition duration-150 block"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="font-display text-lg text-white group-hover:text-glory-gold transition-colors">
                    {portal.title}
                  </h3>
                  <span className="font-mono text-xs text-glory-gold group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
                <p className="font-body text-xs text-white/60 line-clamp-2">
                  {portal.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <div className="mb-6 border-b border-white/10 pb-4">
          <p className="font-mono text-xs uppercase tracking-widest text-white/50 font-semibold">
            {locale === "ro" ? "Cronici Tematice & Discipline" : "Thematic Verticals & Chronicles"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {navSections.map((section) => (
            <div
              key={section.href}
              className="bg-navy-light rounded-2xl p-6 border border-white/10"
            >
              <Link
                href={section.href}
                className="font-display text-xl text-glory-gold hover:text-glory-gold-dark transition-colors block mb-2"
              >
                {section.title}
              </Link>
              <p className="font-body text-sm text-white/55 mb-4">
                {section.description}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-body text-sm text-white/50 hover:text-white transition-colors"
                    >
                      → {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
