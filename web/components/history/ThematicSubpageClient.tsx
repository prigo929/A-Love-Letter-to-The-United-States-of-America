"use client";

// ─── Thematic Subpage Client Component ─────────────────────────────────────────
// A premium, interactive tabbed explorer designed to show detailed historical
// articles for any of the 15 thematic history routes, supporting bilingual views.

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Clock, X, Expand } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { HistoryStyles } from "./HistoryStyles";

/** A photo attached to a section, keyed by `${topicId}::${section.heading.en}`. */
export interface SectionFigure {
  src: StaticImageData;
  caption: string;
}

export interface ThematicTable {
  caption?: { en: string; ro: string };
  headers: { en: string; ro: string }[];
  rows: { en: string; ro: string }[][];
}

export interface ThematicSubsection {
  heading: { en: string; ro: string };
  paragraphs: { en: string; ro: string }[];
  table?: ThematicTable;
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
  /** Optional photos woven into sections, keyed `${topicId}::${section.heading.en}`. */
  sectionImages?: Record<string, SectionFigure[]>;
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
} as const;

export default function ThematicSubpageClient({
  locale,
  subpageId,
  title,
  description,
  topics,
  embed = false,
  sectionImages,
}: ThematicSubpageClientProps) {
  const currentLocale = locale as Locale;
  const [activeTopicId, setActiveTopicId] = useState(topics[0]?.id || "");
  const [lightbox, setLightbox] = useState<SectionFigure | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Full-screen viewer: lock scroll (html + body, compensating for the
  // scrollbar so the page doesn't shift) and close on Escape.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPadding = body.style.paddingRight;
    const scrollbarW = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarW > 0) body.style.paddingRight = `${scrollbarW}px`;

    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPadding;
    };
  }, [lightbox]);

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

  // Renders the figures attached to a given `${topicId}::${heading}` key, if any.
  // Used at both section and subsection level so photos can attach wherever they
  // best illustrate the text.
  const renderFigures = (key: string) => {
    const figs = sectionImages?.[key];
    if (!figs || figs.length === 0) return null;
    return (
      <div className={`grid gap-4 ${figs.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {figs.map((f, fi) => (
          <figure
            key={fi}
            className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-black/40"
          >
            <button
              type="button"
              onClick={() => setLightbox(f)}
              aria-label={`View full screen: ${f.caption}`}
              className="relative block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold"
            >
              {/* Full image, uncropped, at its natural aspect ratio. */}
              <Image
                src={f.src}
                alt={f.caption}
                sizes="(max-width: 768px) 100vw, 45vw"
                placeholder="blur"
                className="h-auto w-full object-contain"
              />
              <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Expand className="h-3.5 w-3.5 text-white" />
              </span>
            </button>
            <figcaption className="border-t border-white/5 px-3 py-2 text-[11px] leading-snug text-white/50">
              {f.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  };

  return (
    <div className="relative history-classified-bg">
      <HistoryStyles />

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
 
      {/* Topics Selector Top Bar */}
      <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm relative mb-8 max-w-6xl mx-auto">
        <div className="border-b border-white/10 pb-4 mb-6">
          <h2 className="text-xs font-semibold text-glory-gold tracking-widest uppercase mb-1">
            {TEXT.selectTopic[currentLocale]}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {topics.map((topic, index) => {
            const isActive = topic.id === activeTopicId;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopicId(topic.id)}
                className={`p-4 rounded-lg border text-left transition-all duration-300 flex flex-col justify-between relative group ${
                  isActive
                    ? "border-glory-gold/40 bg-white/[0.06] text-glory-gold shadow-[0_4px_15px_rgba(232,185,35,0.05)]"
                    : "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-[9px] text-white/30 tracking-wider">
                    TOPIC {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider line-clamp-2 leading-snug">
                  {currentLocale === "ro" ? topic.title.ro : topic.title.en}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Topic Chronicle Display Area */}
      <div className="max-w-6xl mx-auto">
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

                    {renderFigures(`${activeTopic.id}::${sec.heading.en}`)}

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
                            {renderFigures(`${activeTopic.id}::${sub.heading.en}`)}
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
                            {sub.table && (
                              <div className="mt-6 overflow-x-auto rounded-lg border border-glory-gold/20 bg-white/[0.02]">
                                {sub.table.caption && (
                                  <div className="px-4 py-2.5 border-b border-glory-gold/20 bg-glory-gold/5">
                                    <p className="text-[10px] font-bold text-glory-gold uppercase tracking-widest">
                                      {currentLocale === "ro" ? sub.table.caption.ro : sub.table.caption.en}
                                    </p>
                                  </div>
                                )}
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b border-white/10 bg-white/[0.03]">
                                      {sub.table.headers.map((h, hIdx) => (
                                        <th
                                          key={hIdx}
                                          className="px-4 py-3 text-left text-[10px] font-bold text-glory-gold uppercase tracking-wider whitespace-nowrap"
                                        >
                                          {currentLocale === "ro" ? h.ro : h.en}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {sub.table.rows.map((row, rIdx) => (
                                      <tr
                                        key={rIdx}
                                        className={`border-b border-white/5 transition-colors hover:bg-white/[0.03] ${
                                          rIdx % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"
                                        }`}
                                      >
                                        {row.map((cell, cIdx) => (
                                          <td
                                            key={cIdx}
                                            className={`px-4 py-3 text-sm leading-snug ${
                                              cIdx === 0
                                                ? "text-white/90 font-medium"
                                                : "text-white/65"
                                            }`}
                                          >
                                            {currentLocale === "ro" ? cell.ro : cell.en}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
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

      {/* Full-screen image viewer */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {lightbox && (
              <motion.div
                key="wwii-lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[120] flex flex-col bg-black/95 backdrop-blur-sm"
                onClick={() => setLightbox(null)}
              >
                <div className="flex items-start justify-between gap-4 px-5 py-4">
                  <p className="max-w-4xl text-sm leading-relaxed text-white/80">
                    {lightbox.caption}
                  </p>
                  <button
                    type="button"
                    onClick={() => setLightbox(null)}
                    aria-label="Close"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
                {/* Clicking the empty space around the image (or the backdrop)
                    closes; clicking the image itself does not. */}
                <div className="flex flex-1 cursor-zoom-out items-center justify-center overflow-hidden p-4">
                  <Image
                    src={lightbox.src}
                    alt={lightbox.caption}
                    sizes="92vw"
                    quality={95}
                    className="h-auto max-h-[85vh] w-auto max-w-[92vw] cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
