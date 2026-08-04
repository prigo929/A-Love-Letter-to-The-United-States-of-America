"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Layers, Sparkles, Filter, Check, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  getAllInDepthArticles,
  DOMAIN_CATEGORIES,
  type AllInDepthArticle,
} from "@/lib/data/all-in-depth-articles";

// Helper: Extract pull quote from article paragraphs
function extractPullQuote(topic: AllInDepthArticle, isRo: boolean): string | null {
  for (const sec of topic.sections) {
    for (const sub of sec.subsections) {
      for (const para of sub.paragraphs) {
        const text = isRo ? para.ro : para.en;
        if (!text || text.length < 80) continue;
        const firstDot = text.search(/\.\s/);
        const sentence = firstDot > 0 ? text.slice(0, firstDot + 1) : text;
        if (sentence.length >= 60 && sentence.length <= 380) return sentence;
        if (sentence.length > 380) return sentence.slice(0, 320).trimEnd() + "…";
      }
    }
  }
  return null;
}

function hexToRgb(hex: string): string | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : null;
}

export function InDepthArticlesExplorer() {
  const { locale } = useLanguage();
  const isRo = locale === "ro";

  const allArticles = useMemo(() => getAllInDepthArticles(), []);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeId, setActiveId] = useState<string>(allArticles[0]?.id ?? "");
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));
  const readerRef = useRef<HTMLDivElement>(null);

  // Filter articles based on active category & search query
  const filteredArticles = useMemo(() => {
    let result = allArticles;

    if (selectedCategory !== "all") {
      result = result.filter((a) => a.domainCategory === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((a) => {
        const titleEn = a.title.en.toLowerCase();
        const titleRo = a.title.ro.toLowerCase();
        if (titleEn.includes(q) || titleRo.includes(q)) return true;

        // Search within sections text
        return a.sections.some((sec) =>
          sec.subsections.some((sub) =>
            sub.paragraphs.some((p) =>
              (p.en && p.en.toLowerCase().includes(q)) ||
              (p.ro && p.ro.toLowerCase().includes(q))
            )
          )
        );
      });
    }

    return result;
  }, [allArticles, selectedCategory, searchQuery]);

  // Keep active topic valid when filters change
  useEffect(() => {
    if (filteredArticles.length > 0) {
      const exists = filteredArticles.some((a) => a.id === activeId);
      if (!exists) {
        setActiveId(filteredArticles[0].id);
        setOpenSections(new Set([0]));
      }
    }
  }, [filteredArticles, activeId]);

  // Hash deep linking support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#deep-dive-") || hash.startsWith("#article-")) {
        const id = hash.replace("#deep-dive-", "").replace("#article-", "");
        const matched = allArticles.find((t) => t.id.toLowerCase() === id.toLowerCase());
        if (matched) {
          setSelectedCategory("all");
          setActiveId(matched.id);
          setOpenSections(new Set([0]));
          setTimeout(() => {
            if (readerRef.current) {
              const yOffset = -90;
              const y = readerRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }, 150);
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [allArticles]);

  const activeArticle = useMemo(() => {
    return allArticles.find((a) => a.id === activeId) ?? filteredArticles[0] ?? allArticles[0];
  }, [allArticles, filteredArticles, activeId]);

  const pullQuote = useMemo(() => {
    return activeArticle ? extractPullQuote(activeArticle, isRo) : null;
  }, [activeArticle, isRo]);

  const accentRgb = hexToRgb(activeArticle?.theme.accent ?? "#E8B923");
  const accentFaint = accentRgb ? `rgba(${accentRgb},0.08)` : "rgba(255,255,255,0.05)";
  const accentBorder = accentRgb ? `rgba(${accentRgb},0.25)` : "rgba(255,255,255,0.15)";

  function toggleSection(idx: number) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  }

  function handleTopicSelect(id: string) {
    setActiveId(id);
    setOpenSections(new Set([0]));
    if (readerRef.current && window.innerWidth < 768) {
      const yOffset = -90;
      const y = readerRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allArticles.length };
    allArticles.forEach((a) => {
      counts[a.domainCategory] = (counts[a.domainCategory] || 0) + 1;
    });
    return counts;
  }, [allArticles]);

  return (
    <div className="bg-navy-dark min-h-screen text-white">
      {/* ── Hero Header ────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(rgba(232,185,35,0.2) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-glory-gold/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-glory-blue/20 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-glory-gold" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.35em] text-glory-gold">
              {isRo ? "ARHIVĂ CUNOȘTINȚE · WIKIPEDIA & GROKIPEDIA" : "KNOWLEDGE ARCHIVE · WIKIPEDIA & GROKIPEDIA"}
            </span>
          </div>

          <h1 className="font-hero text-[clamp(38px,6vw,84px)] uppercase leading-[0.9] tracking-wide text-white mb-6">
            {isRo ? "ARTICOLE ÎN DETALIU" : "IN-DEPTH ARTICLES"}
          </h1>

          <p className="font-body text-base md:text-lg text-white/60 max-w-3xl leading-relaxed mb-10">
            {isRo
              ? "Biblioteca completă de 188 de articole detaliate, sinteze enciclopedice și studii aprofundate culese de pe toate paginile și domeniile platformei."
              : "The complete repository of 188 long-form articles, encyclopedic syntheses, and deep dives collected from across every page and vertical on the platform."}
          </p>

          {/* Search & Filter Control Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 lg:col-span-5 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-glory-gold" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRo ? "Caută în cele 188 de articole..." : "Search across 188 articles..."}
                className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/15 rounded-xl font-body text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-glory-gold focus:ring-1 focus:ring-glory-gold transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Articles counter badge */}
            <div className="md:col-span-6 lg:col-span-7 flex items-center justify-start md:justify-end gap-3 font-mono text-xs text-white/50">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
                <BookOpen className="w-3.5 h-3.5 text-glory-gold" />
                <span className="text-white font-bold">{filteredArticles.length}</span>
                <span>{isRo ? "articole găsite" : "articles found"}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Area ───────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        {/* Category Pills Bar */}
        <div className="mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest mr-2 flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-glory-gold" />
              {isRo ? "Domeniu:" : "Domain:"}
            </span>
            {DOMAIN_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] ?? 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium border transition-all duration-200 flex items-center gap-2 focus-visible:outline-none"
                  style={{
                    background: isActive ? `${cat.accent}20` : "rgba(255,255,255,0.03)",
                    borderColor: isActive ? cat.accent : "rgba(255,255,255,0.08)",
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
                  }}
                >
                  <span>{isRo ? cat.label.ro : cat.label.en}</span>
                  <span
                    className="font-mono text-[10px] px-1.5 py-0.5 rounded-md font-bold"
                    style={{
                      background: isActive ? cat.accent : "rgba(255,255,255,0.1)",
                      color: isActive ? "#000000" : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Topic Selector Grid ───────────────────────────────────────────── */}
        {filteredArticles.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-white/10 bg-white/[0.02]">
            <BookOpen className="w-12 h-12 text-glory-gold/40 mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-white mb-2">
              {isRo ? "Niciun articol găsit" : "No articles found"}
            </h3>
            <p className="font-body text-sm text-white/50 max-w-md mx-auto mb-6">
              {isRo
                ? "Încearcă să schimbi termenul de căutare sau să selectezi alt domeniu."
                : "Try adjusting your search terms or selecting a different category domain."}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-4 py-2 rounded-xl bg-glory-gold/10 border border-glory-gold/30 text-glory-gold font-mono text-xs uppercase tracking-wider hover:bg-glory-gold/20 transition-colors"
            >
              {isRo ? "Resetează Filtrele" : "Reset Filters"}
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/40">
                {isRo ? "Selectează un Subiect" : "Select Topic to Read"}
              </span>
              <span className="font-mono text-[11px] text-white/30">
                {filteredArticles.findIndex((a) => a.id === activeId) + 1} / {filteredArticles.length}
              </span>
            </div>

            <div
              className="grid gap-2.5 mb-14 max-h-[320px] overflow-y-auto p-2 rounded-2xl border border-white/8 bg-white/[0.015] scrollbar-thin"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(${filteredArticles.length > 20 ? "170px" : "200px"}, 1fr))`,
              }}
            >
              {filteredArticles.map((topic, i) => {
                const isActive = topic.id === activeId;
                const accent = topic.theme.accent;
                return (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicSelect(topic.id)}
                    className="group relative text-left p-3.5 rounded-xl border transition-all duration-200 focus-visible:outline-none"
                    style={{
                      background: isActive ? `${accent}15` : "rgba(255,255,255,0.02)",
                      borderColor: isActive ? `${accent}60` : "rgba(255,255,255,0.06)",
                    }}
                  >
                    {isActive && (
                      <span
                        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                        style={{ background: accent }}
                      />
                    )}
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="font-mono text-[9px] font-bold leading-none tracking-widest"
                        style={{ color: isActive ? accent : "rgba(255,255,255,0.3)" }}
                      >
                        {String(i + 1).padStart(3, "0")}
                      </span>
                      <span
                        className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {isRo ? topic.categoryLabel.ro : topic.categoryLabel.en}
                      </span>
                    </div>
                    <span
                      className="block text-[12px] font-semibold leading-snug transition-colors line-clamp-2"
                      style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)" }}
                    >
                      {isRo ? topic.title.ro : topic.title.en}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ── Article Reader ────────────────────────────────────────────── */}
            {activeArticle && (
              <div ref={readerRef} className="pt-6 border-t border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeArticle.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="rounded-3xl border border-white/10 bg-white/[0.015] p-6 md:p-12 relative overflow-hidden"
                  >
                    {/* Top Meta Band */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/8">
                      <div className="flex items-center gap-3">
                        <span
                          className="px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest"
                          style={{
                            background: `${activeArticle.theme.accent}20`,
                            color: activeArticle.theme.accent,
                            border: `1px solid ${activeArticle.theme.accent}40`,
                          }}
                        >
                          {isRo ? activeArticle.categoryLabel.ro : activeArticle.categoryLabel.en}
                        </span>
                        <span className="font-mono text-xs text-white/30">•</span>
                        <span className="font-mono text-xs text-white/40">
                          {activeArticle.sections.length} {isRo ? "secțiuni" : "sections"}
                        </span>
                      </div>

                      <span className="font-mono text-[11px] text-white/30 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-glory-gold" />
                        {isRo ? "Verificat din surse enciclopedice" : "Verified from Encyclopedic Sources"}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-hero text-[clamp(32px,4.5vw,64px)] leading-[0.95] tracking-wide text-white mb-6">
                      {isRo ? activeArticle.title.ro : activeArticle.title.en}
                    </h2>

                    {/* Pull Quote */}
                    {pullQuote && (
                      <blockquote
                        className="mb-10 pl-6 py-1 text-[clamp(14px,1.3vw,17px)] italic leading-relaxed max-w-[800px]"
                        style={{
                          borderLeft: `3px solid ${activeArticle.theme.accent}`,
                          color: "rgba(255,255,255,0.65)",
                          background: `${activeArticle.theme.accent}08`,
                          borderRadius: "0 12px 12px 0",
                        }}
                      >
                        "{pullQuote}"
                      </blockquote>
                    )}

                    {/* Accordion Sections */}
                    <div className="space-y-2">
                      {activeArticle.sections.map((sec, secIdx) => {
                        const heading = isRo ? sec.heading.ro : sec.heading.en;
                        const isOpen = openSections.has(secIdx);
                        const isIntro = !heading || heading === "Introduction";

                        return (
                          <div
                            key={secIdx}
                            className="rounded-2xl overflow-hidden transition-all duration-200"
                            style={{
                              border: isOpen
                                ? `1px solid ${accentBorder}`
                                : "1px solid rgba(255,255,255,0.06)",
                              background: isOpen ? accentFaint : "transparent",
                            }}
                          >
                            <button
                              onClick={() => toggleSection(secIdx)}
                              className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 group transition-colors"
                            >
                              <span
                                className="font-mono text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3"
                                style={{
                                  color: isOpen ? activeArticle.theme.accent : "rgba(255,255,255,0.45)",
                                }}
                              >
                                {!isIntro && (
                                  <span
                                    className="inline-block w-4 h-px shrink-0"
                                    style={{
                                      background: isOpen
                                        ? activeArticle.theme.accent
                                        : "rgba(255,255,255,0.2)",
                                    }}
                                  />
                                )}
                                {isIntro
                                  ? (isRo ? activeArticle.title.ro : activeArticle.title.en)
                                  : heading}
                              </span>

                              <span
                                className="shrink-0 text-xs font-mono transition-transform duration-200"
                                style={{
                                  color: isOpen ? activeArticle.theme.accent : "rgba(255,255,255,0.25)",
                                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                  display: "inline-block",
                                }}
                              >
                                ▾
                              </span>
                            </button>

                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  key="body"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: "easeInOut" }}
                                  style={{ overflow: "hidden" }}
                                >
                                  <div className="px-6 pb-8 pt-2 space-y-6">
                                    {sec.subsections.map((sub, subIdx) => {
                                      const subHeading = isRo ? sub.heading.ro : sub.heading.en;
                                      return (
                                        <div key={subIdx}>
                                          {subHeading && (
                                            <h4 className="text-sm md:text-base font-bold text-white/90 mb-3 leading-snug">
                                              {subHeading}
                                            </h4>
                                          )}
                                          <div className="space-y-3.5">
                                            {sub.paragraphs.map((para, pIdx) => {
                                              if (
                                                pullQuote &&
                                                secIdx === 0 &&
                                                subIdx === 0 &&
                                                pIdx === 0
                                              )
                                                return null;
                                              const text = isRo ? para.ro : para.en;
                                              if (!text) return null;
                                              return (
                                                <p
                                                  key={pIdx}
                                                  className="text-sm md:text-[15px] leading-[1.8] text-white/60 text-justify"
                                                >
                                                  {text}
                                                </p>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
