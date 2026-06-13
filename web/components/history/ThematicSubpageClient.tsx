"use client";

// ─── Thematic Subpage Client Component ─────────────────────────────────────────
// A premium, interactive tabbed explorer designed to show detailed historical
// articles for any of the 15 thematic history routes, supporting bilingual views.

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, BookOpen, Clock } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { HistoryStyles } from "./HistoryStyles";

export interface ThematicSubsection {
  heading: { en: string; ro: string };
  paragraphs: { en: string; ro: string }[];
}

export interface ThematicSection {
  heading: { en: string; ro: string };
  subsections: ThematicSubsection[];
}

export interface ThematicTopic {
  id: string;
  title: { en: string; ro: string };
  sections: ThematicSection[];
}

interface ThematicSubpageClientProps {
  locale: string;
  subpageId: string;
  title: { en: string; ro: string };
  description: { en: string; ro: string };
  topics: ThematicTopic[];
  embed?: boolean;
}

const TEXT = {
  selectTopic: {
    en: "Focus Topics",
    ro: "Subiecte Principale",
  },
  sectionsLabel: {
    en: "In this article:",
    ro: "În acest articol:",
  },
  backButton: {
    en: "Back to History Dashboard",
    ro: "Înapoi la Panoul Istoriei",
  },
} as const;

export default function ThematicSubpageClient({
  locale,
  subpageId,
  title,
  description,
  topics,
  embed = false,
}: ThematicSubpageClientProps) {
  const currentLocale = locale as Locale;
  const [activeTopicId, setActiveTopicId] = useState(topics[0]?.id || "");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashChange = () => {
        if (window.location.hash) {
          const hash = decodeURIComponent(window.location.hash.replace("#", ""));
          const matched = topics.find(
            (t) => t.id === hash || t.id.toLowerCase() === hash.toLowerCase()
          );
          if (matched) {
            setActiveTopicId(matched.id);
          }
        }
      };

      // Run on initial mount
      handleHashChange();

      // Listen for hash changes
      window.addEventListener("hashchange", handleHashChange);
      return () => {
        window.removeEventListener("hashchange", handleHashChange);
      };
    }
  }, [topics]);

  // If there are no topics, render a clean fallback
  if (!topics || topics.length === 0) {
    return (
      <div className="text-center py-20 text-white/50">
        No topics loaded for this chapter.
      </div>
    );
  }

  const activeTopic = topics.find((t) => t.id === activeTopicId) || topics[0];

  return (
    <div className="relative history-classified-bg">
      <HistoryStyles />
      
      {/* Back button */}
      {!embed && (
        <div className="mb-8">
          <Link
            href="/history"
            className="inline-flex items-center gap-2 text-xs font-semibold text-glory-gold hover:text-white transition-colors group tracking-wider uppercase"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
            {TEXT.backButton[currentLocale]}
          </Link>
        </div>
      )}

      {/* Hero Header */}
      {embed ? (
        <div className="mb-10 space-y-3 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded border border-glory-gold/30 bg-glory-gold/5 text-glory-gold text-[9px] font-bold uppercase tracking-wider">
              <BookOpen className="w-3 h-3" /> {currentLocale === "ro" ? "Cronici Detaliate" : "Detailed Chronicles"}
            </span>
          </div>
          <h2 className="history-serif-title text-2xl md:text-4xl font-bold text-white tracking-tight">
            {title[currentLocale]}
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-3xl font-light">
            {description[currentLocale]}
          </p>
        </div>
      ) : (
        <section className="relative overflow-hidden history-grid-border p-8 md:p-12 mb-12 rounded-lg">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded border border-glory-gold/30 bg-glory-gold/5 text-glory-gold text-[9px] font-bold uppercase tracking-wider">
                <BookOpen className="w-3 h-3" /> {currentLocale === "ro" ? "Cronici Tematice" : "Thematic Chronicles"}
              </span>
            </div>
            <h1 className="history-serif-title text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              {title[currentLocale]}
            </h1>
            <p className="text-white/60 text-base max-w-3xl leading-relaxed font-light">
              {description[currentLocale]}
            </p>
          </div>
        </section>
      )}
 
      {/* Main Grid: Left Tabs, Right Content Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Topic Tabs */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <h2 className="text-xs font-semibold text-glory-gold tracking-widest uppercase mb-4">
              {TEXT.selectTopic[currentLocale]}
            </h2>
            <div className="space-y-2">
              {topics.map((topic, index) => {
                const isActive = topic.id === activeTopicId;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveTopicId(topic.id)}
                    className={`w-full text-left p-3.5 rounded-lg transition-all duration-300 relative group flex items-center justify-between border ${
                      isActive
                        ? "border-glory-gold/30 bg-white/[0.04] shadow-[0_4px_20px_rgba(232,185,35,0.04)] text-glory-gold font-medium"
                        : "border-transparent bg-transparent hover:bg-white/[0.02] text-white/70 hover:text-white"
                    }`}
                  >
                    {/* Active indicator dot */}
                    <div
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r transition-all duration-300 ${
                        isActive
                          ? "bg-glory-gold scale-y-100"
                          : "bg-transparent scale-y-0 group-hover:bg-white/10 group-hover:scale-y-50"
                      }`}
                    />
                    <span className="text-xs tracking-wider pl-2 uppercase">
                      {currentLocale === "ro" ? topic.title.ro : topic.title.en}
                    </span>
                    <span className="text-[9px] text-white/30 tracking-wider">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
 
        {/* Right column: Content Reader Pane */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTopicId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="history-grid-border p-8 md:p-12 space-y-6 relative overflow-hidden rounded-lg"
            >
              {/* Topic Header */}
              <div className="border-b border-white/10 pb-5 space-y-1">
                <span className="text-[10px] font-semibold text-glory-gold tracking-widest uppercase block">
                  {currentLocale === "ro" ? "SECȚIUNE INDIVIDUALĂ" : "INDIVIDUAL FOCUS"}
                </span>
                <h2 className="history-serif-title text-2xl md:text-3xl font-bold text-white leading-tight">
                  {currentLocale === "ro" ? activeTopic.title.ro : activeTopic.title.en}
                </h2>
              </div>
 
              {/* Local Table of Contents */}
              {activeTopic.sections && activeTopic.sections.length > 1 && (
                <div className="p-3.5 rounded-lg border border-white/10 bg-white/[0.02] flex flex-wrap gap-2 text-[11px] items-center">
                  <span className="text-white/50 flex items-center gap-1 font-semibold uppercase tracking-wider mr-2">
                    <Search className="w-3.5 h-3.5 text-glory-gold" /> {TEXT.sectionsLabel[currentLocale]}
                  </span>
                  {activeTopic.sections.map((sec, idx) => {
                    const heading = currentLocale === "ro" ? sec.heading.ro : sec.heading.en;
                    if (!heading) return null;
                    return (
                      <a
                        key={idx}
                        href={`#topic-sec-${idx}`}
                        className="px-3 py-1 rounded bg-white/5 hover:bg-glory-gold/10 hover:text-glory-gold transition-all duration-200 text-white/80 border border-white/5"
                      >
                        {heading}
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Sections & Subsection details */}
              <div className="space-y-8 pt-2">
                {activeTopic.sections && activeTopic.sections.map((sec, secIdx) => {
                  const heading = currentLocale === "ro" ? sec.heading.ro : sec.heading.en;
                  return (
                    <div
                      key={secIdx}
                      id={`topic-sec-${secIdx}`}
                      className="space-y-4 scroll-mt-24 border-b border-white/5 pb-8 last:border-0 last:pb-0"
                    >
                      {heading && heading !== "Introduction" && (
                        <h3 className="text-sm font-semibold text-glory-gold tracking-wider uppercase border-l border-glory-gold pl-3">
                          {heading}
                        </h3>
                      )}
                      
                      <div className="space-y-5">
                        {sec.subsections.map((sub, subIdx) => {
                          const subHeading = currentLocale === "ro" ? sub.heading.ro : sub.heading.en;
                          return (
                            <div key={subIdx} className="space-y-2.5">
                              {subHeading && (
                                <h4 className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                                  {subHeading}
                                </h4>
                              )}
                              <div className="space-y-4">
                                {sub.paragraphs.map((para, pIdx) => {
                                  const text = currentLocale === "ro" ? para.ro : para.en;
                                  return (
                                    <p
                                      key={pIdx}
                                      className="history-serif-body text-white/80 leading-relaxed text-base md:text-lg text-justify font-light"
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
                    </div>
                  );
                })}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
