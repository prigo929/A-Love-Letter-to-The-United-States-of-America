"use client";

// ─── Thematic Subpage Client Component ─────────────────────────────────────────
// A premium, interactive tabbed explorer designed to show detailed historical
// articles for any of the 15 thematic history routes, supporting bilingual views.

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, BookOpen, Clock } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

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
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 ${embed ? "pt-16 border-t border-white/10" : ""}`}>
      
      {/* Back button */}
      {!embed && (
        <div className="mb-6">
          <Link
            href="/history"
            className="inline-flex items-center gap-2 text-sm font-semibold text-glory-gold hover:text-glory-gold/80 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
            {TEXT.backButton[currentLocale]}
          </Link>
        </div>
      )}

      {/* Hero Header */}
      {embed ? (
        <div className="mb-10 space-y-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-glory-gold/30 bg-glory-gold/5 text-glory-gold text-[10px] font-bold uppercase tracking-wider">
            <BookOpen className="w-3 h-3" /> {currentLocale === "ro" ? "Cronici Detaliate" : "Detailed Chronicles"}
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-black text-white tracking-tight">
            {title[currentLocale]}
          </h2>
          <p className="font-body text-white/60 text-sm md:text-base leading-relaxed">
            {description[currentLocale]}
          </p>
        </div>
      ) : (
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-glory-blue/15 via-white/3 to-glory-red/10 p-8 md:p-12 mb-12 shadow-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-glory-blue via-glory-gold to-glory-red" />
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-glory-gold/30 bg-glory-gold/5 text-glory-gold text-[10px] font-bold uppercase tracking-wider">
              <BookOpen className="w-3 h-3" /> Chapter Explorer
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
              {title[currentLocale]}
            </h1>
            <p className="font-body text-white/70 text-sm md:text-base leading-relaxed">
              {description[currentLocale]}
            </p>
          </div>
        </section>
      )}

      {/* Main Grid: Left Tabs, Right Content Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Topic Tabs */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm">
            <h2 className="font-display text-base font-bold text-white mb-3">
              {TEXT.selectTopic[currentLocale]}
            </h2>
            <div className="space-y-2">
              {topics.map((topic) => {
                const isActive = topic.id === activeTopicId;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveTopicId(topic.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group ${
                      isActive
                        ? "border-glory-gold/45 bg-gradient-to-r from-navy-mid to-glory-blue/25 text-glory-gold shadow-[0_0_15px_rgba(255,215,0,0.06)] font-bold"
                        : "border-transparent bg-transparent hover:bg-white/5 text-white/75 hover:text-white"
                    }`}
                  >
                    <span className="font-display text-sm tracking-wide">
                      {currentLocale === "ro" ? topic.title.ro : topic.title.en}
                    </span>
                    <Clock className={`w-3.5 h-3.5 opacity-40 group-hover:opacity-85 transition-opacity ${isActive ? "opacity-90" : ""}`} />
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
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-navy-mid to-navy-dark p-6 md:p-8 space-y-6 shadow-xl"
            >
              {/* Topic Header */}
              <div className="border-b border-white/10 pb-5">
                <h2 className="font-display text-2xl md:text-3xl font-black text-white leading-tight">
                  {currentLocale === "ro" ? activeTopic.title.ro : activeTopic.title.en}
                </h2>
              </div>

              {/* Local Table of Contents */}
              {activeTopic.sections && activeTopic.sections.length > 1 && (
                <div className="p-4 rounded-xl border border-white/5 bg-white/3 flex flex-wrap gap-2 text-xs items-center">
                  <span className="text-white/45 flex items-center gap-1 font-semibold uppercase tracking-wider mr-2">
                    <Search className="w-3.5 h-3.5" /> {TEXT.sectionsLabel[currentLocale]}
                  </span>
                  {activeTopic.sections.map((sec, idx) => {
                    const heading = currentLocale === "ro" ? sec.heading.ro : sec.heading.en;
                    if (!heading) return null;
                    return (
                      <a
                        key={idx}
                        href={`#topic-sec-${idx}`}
                        className="px-2.5 py-1 rounded-lg bg-navy-mid hover:bg-glory-gold/15 hover:text-glory-gold transition-colors text-white/75 border border-white/5"
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
                      className="space-y-4 scroll-mt-24 border-b border-white/5 pb-6 last:border-0 last:pb-0"
                    >
                      {heading && heading !== "Introduction" && (
                        <h3 className="font-display text-lg md:text-xl font-bold text-glory-gold border-l-2 border-glory-gold pl-3">
                          {heading}
                        </h3>
                      )}
                      
                      <div className="space-y-5">
                        {sec.subsections.map((sub, subIdx) => {
                          const subHeading = currentLocale === "ro" ? sub.heading.ro : sub.heading.en;
                          return (
                            <div key={subIdx} className="space-y-2.5">
                              {subHeading && (
                                <h4 className="font-display text-sm md:text-base font-bold text-white/95">
                                  {subHeading}
                                </h4>
                              )}
                              <div className="space-y-3">
                                {sub.paragraphs.map((para, pIdx) => (
                                  <p
                                    key={pIdx}
                                    className="font-body text-white/75 leading-relaxed text-sm md:text-[15px] text-justify"
                                  >
                                    {currentLocale === "ro" ? para.ro : para.en}
                                  </p>
                                ))}
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
