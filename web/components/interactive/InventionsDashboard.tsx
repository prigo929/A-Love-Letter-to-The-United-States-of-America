"use client";

import React, { useState, useMemo } from "react";
import { Search, ArrowUpDown, SlidersHorizontal, Sparkles, Filter, X } from "lucide-react";

export interface InventionItem {
  id: string;
  year: string;
  name: {
    en: string;
    ro: string;
  };
  description: {
    en: string;
    ro: string;
  };
  era: {
    en: string;
    ro: string;
  };
}

interface InventionsDashboardProps {
  locale: string;
  inventions: InventionItem[];
}

export default function InventionsDashboard({ locale, inventions }: InventionsDashboardProps) {
  const isRo = locale === "ro";

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEra, setSelectedEra] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [visibleCount, setVisibleCount] = useState(24);

  // Localization Copy
  const copy = {
    searchPlaceholder: isRo ? "Caută invenții, inventatori sau cuvinte cheie..." : "Search inventions, inventors, or keywords...",
    sortBy: isRo ? "Sortează după an" : "Sort by year",
    oldest: isRo ? "Cei mai vechi" : "Oldest First",
    newest: isRo ? "Cei mai noi" : "Newest First",
    showing: isRo ? "Se afișează" : "Showing",
    of: isRo ? "din" : "of",
    results: isRo ? "invenții" : "inventions",
    loadMore: isRo ? "Încarcă mai multe invenții" : "Load More Inventions",
    noResults: isRo ? "Nu s-au găsit invenții care să corespundă criteriilor." : "No inventions found matching your criteria.",
    clearFilters: isRo ? "Resetează filtrele" : "Clear filters"
  };

  // Eras options dynamically computed based on actual inventions data
  const eras = useMemo(() => {
    const uniqueErasEn = Array.from(new Set(inventions.map(inv => inv.era.en)));
    const eraOptions = [
      { en: "All", ro: "Toate" }
    ];
    
    uniqueErasEn.forEach(eraEn => {
      const match = inventions.find(inv => inv.era.en === eraEn);
      if (match) {
        eraOptions.push({
          en: eraEn,
          ro: match.era.ro
        });
      }
    });
    
    return eraOptions;
  }, [inventions]);

  // Filter & Sort Logic
  const filteredAndSortedInventions = useMemo(() => {
    let result = [...inventions];

    // Filter by Era
    if (selectedEra !== "All") {
      result = result.filter(inv => inv.era.en === selectedEra);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(inv => {
        const nameMatch = inv.name.en.toLowerCase().includes(query) || inv.name.ro.toLowerCase().includes(query);
        const descMatch = inv.description.en.toLowerCase().includes(query) || inv.description.ro.toLowerCase().includes(query);
        const yearMatch = inv.year.includes(query);
        return nameMatch || descMatch || yearMatch;
      });
    }

    // Sort chronologically
    result.sort((a, b) => {
      const yearA = parseInt(a.year.split("–")[0].split("-")[0]);
      const yearB = parseInt(b.year.split("–")[0].split("-")[0]);

      if (sortOrder === "asc") {
        return yearA - yearB;
      } else {
        return yearB - yearA;
      }
    });

    return result;
  }, [inventions, selectedEra, searchQuery, sortOrder]);

  // Handle Load More
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 24);
  };

  // Reset all filters
  const handleClear = () => {
    setSearchQuery("");
    setSelectedEra("All");
    setSortOrder("asc");
    setVisibleCount(24);
  };

  // Active displayed list
  const displayedInventions = useMemo(() => {
    return filteredAndSortedInventions.slice(0, visibleCount);
  }, [filteredAndSortedInventions, visibleCount]);

  return (
    <div className="space-y-12">
      {/* Interactive Control Panel */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 lg:p-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-12 items-center">
          {/* Search bar */}
          <div className="relative md:col-span-6">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-white/40" />
            <input
              type="text"
              placeholder={copy.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(24);
              }}
              className="w-full bg-navy-dark border border-white/10 rounded-2xl py-3 pl-12 pr-10 text-white placeholder-white/45 focus:outline-none focus:border-glory-gold/45 focus:ring-1 focus:ring-glory-gold/25 transition-all text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3.5 text-white/40 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Era Filter Selector */}
          <div className="md:col-span-4 flex items-center gap-2">
            <Filter className="h-4 w-4 text-glory-gold shrink-0" />
            <select
              value={selectedEra}
              onChange={(e) => {
                setSelectedEra(e.target.value);
                setVisibleCount(24);
              }}
              className="w-full bg-navy-dark border border-white/10 rounded-2xl py-3 px-4 text-white text-sm focus:outline-none focus:border-glory-gold/45 transition-all cursor-pointer"
            >
              {eras.map((era) => (
                <option key={era.en} value={era.en} className="bg-navy-mid text-white">
                  {isRo ? era.ro : era.en}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Control */}
          <div className="md:col-span-2">
            <button
              onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
              className="w-full flex items-center justify-center gap-2 bg-navy-dark hover:bg-white/[0.04] border border-white/10 rounded-2xl py-3 px-4 text-white text-sm transition-all focus:outline-none"
              title={copy.sortBy}
            >
              <ArrowUpDown className="h-4 w-4 text-glory-gold" />
              <span>{sortOrder === "asc" ? copy.oldest : copy.newest}</span>
            </button>
          </div>
        </div>

        {/* Stats and Reset */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/5 pt-4 gap-4 text-xs font-mono text-white/50">
          <div>
            {copy.showing} <span className="text-glory-gold font-bold">{filteredAndSortedInventions.length}</span> {copy.of} <span className="text-white">{inventions.length}</span> {copy.results}
          </div>
          {(searchQuery || selectedEra !== "All" || sortOrder !== "asc") && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-glory-gold hover:text-glory-gold-dark hover:underline transition-colors"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>{copy.clearFilters}</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid List */}
      {displayedInventions.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {displayedInventions.map((inv) => (
            <div
              key={inv.id}
              className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-glory-gold/40 hover:bg-white/8 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-glory-gold/5 rounded-full blur-2xl group-hover:bg-glory-gold/10 transition-all duration-500" />

              <div>
                {/* Badge and Year Header */}
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                  <span className="text-sm font-mono font-bold text-glory-gold bg-glory-gold/10 px-3 py-1 rounded-full border border-glory-gold/25">
                    {inv.year}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    {isRo ? inv.era.ro.split(" (")[0] : inv.era.en.split(" (")[0]}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-glory-gold transition-colors">
                  {isRo ? inv.name.ro : inv.name.en}
                </h3>

                {/* Description */}
                <p className="font-body text-xs text-white/70 leading-relaxed font-light mb-4">
                  {isRo ? inv.description.ro : inv.description.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 rounded-3xl border border-white/5 bg-white/2">
          <Sparkles className="h-10 w-10 text-white/20 mx-auto mb-4" />
          <p className="font-body text-white/50 text-lg">{copy.noResults}</p>
          <button
            onClick={handleClear}
            className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-glory-gold hover:underline border border-glory-gold/20 rounded-full px-4 py-2 hover:bg-glory-gold/5 transition-all"
          >
            {copy.clearFilters}
          </button>
        </div>
      )}

      {/* Load More Button */}
      {filteredAndSortedInventions.length > visibleCount && (
        <div className="text-center pt-8">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center gap-3 bg-navy-mid hover:bg-navy-light text-white font-mono text-xs uppercase tracking-widest border border-white/10 hover:border-glory-gold/30 rounded-full px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-gold/10"
          >
            <span>{copy.loadMore}</span>
            <span className="text-[10px] text-white/40">
              ({filteredAndSortedInventions.length - visibleCount} remaining)
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
