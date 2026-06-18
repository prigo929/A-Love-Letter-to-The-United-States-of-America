"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, CornerDownLeft, FileText, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getLocalizedNavSections } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  title: string;
  category: string;
  description: string;
  href: string;
}

function getSearchIndex(locale: "en" | "ro"): SearchItem[] {
  const sections = getLocalizedNavSections(locale);
  const items: SearchItem[] = [];

  // Add Home
  items.push({
    title: locale === "ro" ? "Acasă" : "Home",
    category: locale === "ro" ? "Navigare" : "Navigation",
    description:
      locale === "ro"
        ? "Pagina principală a site-ului America: Cea Mai Mare Națiune."
        : "The homepage of America: The Greatest Nation.",
    href: "/",
  });

  // Map nav sections
  sections.forEach((section) => {
    items.push({
      title: section.title,
      category: locale === "ro" ? "Secțiune" : "Section",
      description: section.description || "",
      href: section.href,
    });

    if (section.items) {
      section.items.forEach((subItem) => {
        items.push({
          title: subItem.label,
          category: section.title,
          description: subItem.description || "",
          href: subItem.href,
        });
      });
    }
  });

  return items;
}

function runSearch(query: string, items: SearchItem[]): SearchItem[] {
  if (!query) return [];
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  interface ScoredItem {
    item: SearchItem;
    score: number;
  }

  const scored: ScoredItem[] = [];

  items.forEach((item) => {
    const title = item.title.toLowerCase();
    const desc = item.description.toLowerCase();
    const cat = item.category.toLowerCase();
    const href = item.href.toLowerCase();

    let matchesAll = true;
    let score = 0;

    for (const term of terms) {
      const isTitleExact = title === term;
      const isTitleInclude = title.includes(term);
      const isDescInclude = desc.includes(term);
      const isCatInclude = cat.includes(term);
      const isHrefInclude = href.includes(term);

      if (!isTitleInclude && !isDescInclude && !isCatInclude && !isHrefInclude) {
        matchesAll = false;
        break;
      }

      if (isTitleExact) score += 100;
      else if (title.startsWith(term)) score += 50;
      else if (isTitleInclude) score += 30;

      if (isCatInclude) score += 20;
      if (isDescInclude) score += 10;
      if (isHrefInclude) score += 5;
    }

    if (matchesAll) {
      scored.push({ item, score });
    }
  });

  return scored.sort((a, b) => b.score - a.score).map((s) => s.item);
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const { locale } = useLanguage();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const searchIndex = getSearchIndex(locale);
  const results = runSearch(query, searchIndex);

  const copy =
    locale === "ro"
      ? {
          placeholder: "Caută secțiuni, date, istorie...",
          noResults: "Niciun rezultat găsit pentru",
          helpTip: "Folosește tastele direcționale și Enter pentru a naviga",
          escLabel: "ESC pentru închidere",
          recentSearches: "Secțiuni sugerate",
        }
      : {
          placeholder: "Search sections, data, history...",
          noResults: "No results found for",
          helpTip: "Use arrow keys and Enter to navigate",
          escLabel: "ESC to close",
          recentSearches: "Suggested sections",
        };

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keybindings inside modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? Math.min(prev + 1, results.length - 1) : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const activeItem = results.length > 0 ? results[selectedIndex] : null;
        if (activeItem) {
          router.push(activeItem.href);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, router, onClose]);

  // Scroll active item into view inside container
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        const container = resultsContainerRef.current;
        const activeTop = activeEl.offsetTop;
        const activeHeight = activeEl.offsetHeight;
        const containerScrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;

        if (activeTop < containerScrollTop) {
          container.scrollTop = activeTop;
        } else if (activeTop + activeHeight > containerScrollTop + containerHeight) {
          container.scrollTop = activeTop + activeHeight - containerHeight;
        }
      }
    }
  }, [selectedIndex]);

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 md:px-0 font-body">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-navy-dark/95 shadow-2xl backdrop-blur-xl flex flex-col"
          >
            {/* Search Input Area */}
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search className="h-5 w-5 text-white/40 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={copy.placeholder}
                className="w-full bg-transparent font-body text-base text-white placeholder-white/40 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="rounded-lg p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <span className="hidden sm:inline-block shrink-0 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/50">
                {copy.escLabel}
              </span>
            </div>

            {/* Content Area */}
            <div className="flex-1 max-h-[50vh] overflow-y-auto p-4">
              {query === "" ? (
                // Suggestions / Initial view
                <div>
                  <h3 className="flex items-center gap-2 px-3 text-xs font-semibold uppercase tracking-wider text-glory-gold mb-3">
                    <Sparkles className="h-3.5 w-3.5" />
                    {copy.recentSearches}
                  </h3>
                  <div className="space-y-1">
                    {searchIndex.slice(1, 7).map((item, idx) => (
                      <button
                        key={item.href}
                        onClick={() => {
                          router.push(item.href);
                          onClose();
                        }}
                        className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-white/5 group"
                      >
                        <FileText className="h-4 w-4 text-white/40 group-hover:text-glory-gold" />
                        <div>
                          <p className="text-sm font-medium text-white/80 group-hover:text-white">
                            {item.title}
                          </p>
                          <p className="text-xs text-white/40 line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length > 0 ? (
                // Results List
                <div ref={resultsContainerRef} className="space-y-1">
                  {results.map((item, idx) => {
                    const isSelected = selectedIndex === idx;
                    return (
                      <button
                        key={item.href}
                        onClick={() => {
                          router.push(item.href);
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-all duration-150 relative group",
                          isSelected
                            ? "bg-glory-gold/10 border-l-2 border-glory-gold pl-3.5"
                            : "hover:bg-white/5 border-l-2 border-transparent"
                        )}
                      >
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-glory-gold/70">
                              {item.category}
                            </span>
                            <span className="text-[10px] text-white/20">•</span>
                            <p className={cn("text-sm font-medium transition-colors", isSelected ? "text-white" : "text-white/80")}>
                              {item.title}
                            </p>
                          </div>
                          <p className="text-xs text-white/50 line-clamp-1">{item.description}</p>
                        </div>
                        {isSelected && (
                          <CornerDownLeft className="h-4 w-4 text-glory-gold shrink-0 opacity-80" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                // No Results
                <div className="py-12 text-center">
                  <p className="text-sm text-white/40">
                    {copy.noResults} <span className="text-glory-gold font-semibold">&ldquo;{query}&rdquo;</span>
                  </p>
                </div>
              )}
            </div>

            {/* Footer Help Bar */}
            {results.length > 0 && (
              <div className="border-t border-white/5 bg-white/[0.01] px-5 py-3 text-center sm:text-left">
                <p className="text-[10px] text-white/30 tracking-wider font-medium uppercase">
                  {copy.helpTip}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
