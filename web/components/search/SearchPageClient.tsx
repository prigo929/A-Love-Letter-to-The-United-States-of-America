"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, X, Sparkles, ArrowRight, BookOpen, Compass } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getSearchIndex, runSearch, type SearchItem } from "@/lib/search";
import { cn } from "@/lib/utils";

const POPULAR_QUERIES_EN = [
  "Constitution",
  "Apollo Program",
  "Yellowstone",
  "Silicon Valley",
  "Aircraft Carriers",
  "Electoral College",
  "National Parks",
  "Artificial Intelligence",
];

const POPULAR_QUERIES_RO = [
  "Constituție",
  "Programul Apollo",
  "Yellowstone",
  "Silicon Valley",
  "Portavioane",
  "Colegiul Electoral",
  "Parcuri Naționale",
  "Inteligență Artificială",
];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const { locale } = useLanguage();
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const searchIndex = useMemo(() => getSearchIndex(locale), [locale]);
  const rawResults = useMemo(() => runSearch(query, searchIndex), [query, searchIndex]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    rawResults.forEach((item) => {
      if (item.category) cats.add(item.category);
    });
    return ["All", ...Array.from(cats)];
  }, [rawResults]);

  const filteredResults = useMemo(() => {
    if (selectedCategory === "All") return rawResults;
    return rawResults.filter((item) => item.category === selectedCategory);
  }, [rawResults, selectedCategory]);

  const popularQueries = locale === "ro" ? POPULAR_QUERIES_RO : POPULAR_QUERIES_EN;

  const copy =
    locale === "ro"
      ? {
          title: "Căutare în Întreaga Națiune",
          subtitle: "Explorează peste 117 capitole, cronici istorice, date și active naționale.",
          placeholder: "Caută subiecte, legi, parcuri, inovații...",
          resultsCount: (count: number) =>
            count === 0
              ? "Niciun rezultat găsit"
              : count === 1
                ? "1 rezultat găsit"
                : `${count} rezultate găsite`,
          popularHeading: "Căutări Frecvente",
          allCategories: "Toate Categoriile",
          noResultsPrompt: "Nu am găsit pagini care să corespundă termenilor introduși.",
          tryAgainPrompt: "Încearcă să folosești cuvinte cheie mai generale sau verifică ortografia.",
          exploreSitemap: "Explorează Harta Site-ului",
        }
      : {
          title: "Search Across the Nation",
          subtitle: "Explore all 117+ chapters, historical chronicles, data repositories, and national archives.",
          placeholder: "Search topics, founding documents, parks, innovations...",
          resultsCount: (count: number) =>
            count === 0
              ? "No results found"
              : count === 1
                ? "1 result found"
                : `${count} results found`,
          popularHeading: "Popular Searches",
          allCategories: "All Categories",
          noResultsPrompt: "No pages matched your search query.",
          tryAgainPrompt: "Try broader keywords, check spelling, or browse by section.",
          exploreSitemap: "Browse Complete Sitemap",
        };

  return (
    <div className="min-h-screen bg-navy-dark pt-28 pb-24 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-glory-gold/30 bg-glory-gold/10 text-glory-gold text-xs font-semibold uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Search Portal</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-white tracking-tight">
            {copy.title}
          </h1>
          <p className="mt-3 font-body text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            {copy.subtitle}
          </p>
        </div>

        {/* Search Input Box */}
        <div className="relative mb-6">
          <div className="relative flex items-center">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-glory-gold pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedCategory("All");
              }}
              placeholder={copy.placeholder}
              autoFocus
              className="w-full bg-white/[0.06] border border-white/20 rounded-2xl py-4 pl-12 pr-12 font-body text-lg text-white placeholder-white/40 focus:outline-none focus:border-glory-gold focus:ring-2 focus:ring-glory-gold/20 shadow-2xl transition duration-200"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedCategory("All");
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Popular Suggestions */}
        {!query && (
          <div className="mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-white/40 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-glory-gold" />
              {copy.popularHeading}
            </p>
            <div className="flex flex-wrap gap-2">
              {popularQueries.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/10 hover:border-glory-gold/40 text-xs sm:text-sm font-body text-white/80 hover:text-glory-gold transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Header & Category Chips */}
        {query && (
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <p className="font-body text-sm text-white/60">
                {copy.resultsCount(rawResults.length)} {rawResults.length > 0 && `for "${query}"`}
              </p>
              {rawResults.length > 0 && categories.length > 2 && (
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "px-2.5 py-1 rounded-lg font-body text-xs transition-colors",
                          isSelected
                            ? "bg-glory-gold text-black font-semibold shadow-sm"
                            : "bg-white/5 text-white/60 hover:text-white border border-white/10"
                        )}
                      >
                        {cat === "All" ? copy.allCategories : cat}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Results List */}
            {filteredResults.length > 0 ? (
              <div className="space-y-3">
                {filteredResults.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group block p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-glory-gold/40 transition duration-150"
                  >
                    <div className="flex items-center justify-between gap-4 mb-1.5">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-glory-gold px-2 py-0.5 rounded border border-glory-gold/30 bg-glory-gold/10">
                        {item.category}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-glory-gold group-hover:translate-x-1 transition-all" />
                    </div>
                    <h2 className="font-display text-xl text-white group-hover:text-glory-gold transition-colors">
                      {item.title}
                    </h2>
                    <p className="font-body text-sm text-white/60 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 rounded-2xl border border-white/10 bg-white/[0.02]">
                <BookOpen className="w-10 h-10 text-white/30 mx-auto mb-3" />
                <h3 className="font-display text-xl text-white mb-2">
                  {copy.noResultsPrompt}
                </h3>
                <p className="font-body text-sm text-white/50 max-w-md mx-auto mb-6">
                  {copy.tryAgainPrompt}
                </p>
                <Link
                  href="/sitemap"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-glory-gold/40 bg-glory-gold/10 text-glory-gold text-xs font-semibold uppercase tracking-wider hover:bg-glory-gold hover:text-black transition-colors"
                >
                  {copy.exploreSitemap} →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function SearchPageClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-navy-dark pt-32 text-center text-white/50">
          Loading Search...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}

