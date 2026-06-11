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
        // Take up to the first sentence (period + space or end)
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

  if (!topics.length) return null;

  const activeTopic = topics.find((t) => t.id === activeId) ?? topics[0];
  const pullQuote = extractPullQuote(activeTopic, isRo);

  const accentRgb = hexToRgb(theme.accent);
  const accentFaint = accentRgb ? `rgba(${accentRgb},0.08)` : "rgba(255,255,255,0.05)";
  const accentBorder = accentRgb ? `rgba(${accentRgb},0.25)` : "rgba(255,255,255,0.15)";

  return (
    <section style={{ background: theme.bg }} className="relative overflow-hidden">

      {/* ── Section-break bar ─────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-24">
        <div className="flex items-center gap-5 mb-14">
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
          className="grid gap-2 mb-16"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(${topics.length > 10 ? "160px" : "180px"}, 1fr))`,
          }}
        >
          {topics.map((topic, i) => {
            const isActive = topic.id === activeId;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveId(topic.id)}
                className="group relative text-left p-3.5 rounded-xl border transition-all duration-200 focus-visible:outline-none"
                style={{
                  background: isActive ? accentFaint : "transparent",
                  borderColor: isActive ? accentBorder : "rgba(255,255,255,0.07)",
                }}
              >
                {/* Active indicator strip */}
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
        <div className="h-px mb-14" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* ── Article reader ─────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {/* Article title */}
            <h2
              className="font-hero text-[clamp(40px,6vw,80px)] leading-none tracking-wide text-white mb-6"
            >
              {isRo ? activeTopic.title.ro : activeTopic.title.en}
            </h2>

            {/* Section jump links */}
            {activeTopic.sections.length > 2 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {activeTopic.sections.map((sec, i) => {
                  const heading = isRo ? sec.heading.ro : sec.heading.en;
                  if (!heading || heading === "Introduction") return null;
                  return (
                    <a
                      key={i}
                      href={`#dds-sec-${i}`}
                      className="px-3 py-1 rounded-full text-[11px] font-semibold transition-colors"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.45)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {heading}
                    </a>
                  );
                })}
              </div>
            )}

            {/* Pull quote — editorial lede */}
            {pullQuote && (
              <blockquote
                className="mb-12 pl-5 text-[clamp(15px,1.5vw,18px)] italic leading-relaxed max-w-[780px]"
                style={{
                  borderLeft: `3px solid ${theme.accent}`,
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                {pullQuote}
              </blockquote>
            )}

            {/* Sections */}
            <div className="space-y-12">
              {activeTopic.sections.map((sec, secIdx) => {
                const heading = isRo ? sec.heading.ro : sec.heading.en;
                return (
                  <div
                    key={secIdx}
                    id={`dds-sec-${secIdx}`}
                    className="scroll-mt-24"
                  >
                    {/* Section heading */}
                    {heading && heading !== "Introduction" && (
                      <h3
                        className="font-mono text-[11px] font-black uppercase tracking-[0.2em] mb-5 flex items-center gap-3"
                        style={{ color: theme.accent }}
                      >
                        <span
                          className="inline-block w-5 h-px shrink-0"
                          style={{ background: theme.accent }}
                        />
                        {heading}
                      </h3>
                    )}

                    {/* Two-column layout for sections with many subsections */}
                    <div
                      className={
                        sec.subsections.length > 3
                          ? "grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-8"
                          : "space-y-8 max-w-[900px]"
                      }
                    >
                      {sec.subsections.map((sub, subIdx) => {
                        const subHeading = isRo ? sub.heading.ro : sub.heading.en;
                        return (
                          <div key={subIdx}>
                            {subHeading && (
                              <h4
                                className="text-[13px] font-bold text-white/90 mb-3 leading-snug"
                              >
                                {subHeading}
                              </h4>
                            )}
                            <div className="space-y-3">
                              {sub.paragraphs.map((para, pIdx) => {
                                // Skip the pull-quote paragraph (sec 0, sub 0, para 0) if used
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
                                    className="text-[14px] md:text-[15px] leading-[1.75] text-white/60"
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
