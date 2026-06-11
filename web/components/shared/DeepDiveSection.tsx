"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ThematicTopic } from "@/lib/data/verticals-thematic-data";
import type { DeepDiveTheme } from "@/lib/deep-dive-themes";

export type { DeepDiveTheme };

// ─── Pull-quote extraction ──────────────────────────────────────────────────────
function extractPullQuote(topic: ThematicTopic, isRo: boolean): string | null {
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

// ─── Component ─────────────────────────────────────────────────────────────────
interface DeepDiveSectionProps {
  locale: string;
  topics: ThematicTopic[];
  theme: DeepDiveTheme;
}

export default function DeepDiveSection({
  locale,
  topics,
  theme,
}: DeepDiveSectionProps) {
  const isRo = locale === "ro";
  const [activeId, setActiveId] = useState(topics[0]?.id ?? "");
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));

  if (!topics.length) return null;

  const activeTopic = topics.find((t) => t.id === activeId) ?? topics[0];
  const pullQuote = extractPullQuote(activeTopic, isRo);

  const accentRgb = hexToRgb(theme.accent);
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

  function handleTopicChange(id: string) {
    setActiveId(id);
    setOpenSections(new Set([0]));
  }

  return (
    <section style={{ background: theme.bg }} className="relative overflow-hidden">

      {/* ── Section-break bar ─────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20">
        <div className="flex items-center gap-5 mb-12">
          <div className="h-px flex-1" style={{ background: accentBorder }} />
          <span
            className="font-mono text-[10px] font-black uppercase tracking-[0.35em] shrink-0"
            style={{ color: theme.accent }}
          >
            {isRo ? (theme.labelRo ?? theme.label) : theme.label}
          </span>
          <div className="h-px flex-1" style={{ background: accentBorder }} />
        </div>

        {/* ── Topic index grid ────────────────────────────────────────────── */}
        <div
          className="grid gap-2 mb-14"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(${topics.length > 10 ? "160px" : "180px"}, 1fr))`,
          }}
        >
          {topics.map((topic, i) => {
            const isActive = topic.id === activeId;
            return (
              <button
                key={topic.id}
                onClick={() => handleTopicChange(topic.id)}
                className="group relative text-left p-3.5 rounded-xl border transition-all duration-200 focus-visible:outline-none"
                style={{
                  background: isActive ? accentFaint : "transparent",
                  borderColor: isActive ? accentBorder : "rgba(255,255,255,0.07)",
                }}
              >
                {isActive && (
                  <span
                    className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full"
                    style={{ background: theme.accent }}
                  />
                )}
                <span
                  className="block font-mono text-[9px] font-bold mb-1.5 leading-none tracking-widest"
                  style={{ color: isActive ? theme.accent : "rgba(255,255,255,0.25)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="block text-[12px] font-semibold leading-snug transition-colors"
                  style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)" }}
                >
                  {isRo ? topic.title.ro : topic.title.en}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Divider ─────────────────────────────────────────────────────── */}
        <div className="h-px mb-12" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* ── Article reader ─────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {/* Article title */}
            <h2 className="font-hero text-[clamp(36px,5vw,72px)] leading-none tracking-wide text-white mb-5">
              {isRo ? activeTopic.title.ro : activeTopic.title.en}
            </h2>

            {/* Pull quote — always visible, collapses never */}
            {pullQuote && (
              <blockquote
                className="mb-10 pl-5 text-[clamp(14px,1.4vw,17px)] italic leading-relaxed max-w-[720px]"
                style={{
                  borderLeft: `3px solid ${theme.accent}`,
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {pullQuote}
              </blockquote>
            )}

            {/* ── Accordion sections ──────────────────────────────────────── */}
            <div className="space-y-1">
              {activeTopic.sections.map((sec, secIdx) => {
                const heading = isRo ? sec.heading.ro : sec.heading.en;
                const isOpen = openSections.has(secIdx);
                const isIntro = !heading || heading === "Introduction";

                return (
                  <div
                    key={secIdx}
                    className="rounded-xl overflow-hidden"
                    style={{
                      border: isOpen
                        ? `1px solid ${accentBorder}`
                        : "1px solid rgba(255,255,255,0.05)",
                      background: isOpen ? accentFaint : "transparent",
                    }}
                  >
                    {/* Accordion toggle */}
                    <button
                      onClick={() => toggleSection(secIdx)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 group transition-colors"
                    >
                      <span
                        className="font-mono text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3"
                        style={{ color: isOpen ? theme.accent : "rgba(255,255,255,0.35)" }}
                      >
                        {!isIntro && (
                          <span
                            className="inline-block w-4 h-px shrink-0"
                            style={{ background: isOpen ? theme.accent : "rgba(255,255,255,0.2)" }}
                          />
                        )}
                        {isIntro
                          ? (isRo ? activeTopic.title.ro : activeTopic.title.en)
                          : heading}
                      </span>
                      {/* Chevron */}
                      <span
                        className="shrink-0 text-[10px] font-mono transition-transform duration-200"
                        style={{
                          color: isOpen ? theme.accent : "rgba(255,255,255,0.2)",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          display: "inline-block",
                        }}
                      >
                        ▾
                      </span>
                    </button>

                    {/* Accordion body */}
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
                          <div
                            className={
                              sec.subsections.length > 3
                                ? "px-5 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6"
                                : "px-5 pb-6 space-y-6 max-w-[860px]"
                            }
                          >
                            {sec.subsections.map((sub, subIdx) => {
                              const subHeading = isRo ? sub.heading.ro : sub.heading.en;
                              return (
                                <div key={subIdx}>
                                  {subHeading && (
                                    <h4 className="text-[13px] font-bold text-white/85 mb-2.5 leading-snug">
                                      {subHeading}
                                    </h4>
                                  )}
                                  <div className="space-y-2.5">
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
                                          className="text-[14px] md:text-[15px] leading-[1.75] text-white/55"
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
    </section>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function hexToRgb(hex: string): string | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : null;
}
