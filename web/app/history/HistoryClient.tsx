"use client";

// ─── History Client Dashboard ──────────────────────────────────────────────────
// A premium bilingual timeline dashboard showcasing the 11 chronological eras of
// the United States, alongside cards linking to the 15 thematic history deep-dives.

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Sparkles,
  Compass,
  Flag,
  TrendingUp,
  Swords,
  Globe,
  Home,
  Sun,
  Users,
  Coins,
  Shield,
  Scale,
  Eye,
  Megaphone,
  BookOpen,
  Calendar,
  ArrowRight,
  Search,
  ExternalLink,
} from "lucide-react";

import { HISTORY_ERAS } from "@/lib/data/history-eras-data";
import { getLocalizedNavSections } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/config";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { HistoryStyles } from "@/components/history/HistoryStyles";

// Translation dictionary for local UI elements
const TEXT = {
  title: {
    en: "Chronological History of the United States",
    ro: "Istoria Cronologică a Statelor Unite",
  },
  subtitle: {
    en: "Explore the epic story of liberty, individual courage, and the triumph of a self-governing constitutional republic.",
    ro: "Explorează povestea legendară a libertății, a curajului individual și a triumfului unei republici constituționale autoguvernate.",
  },
  timelineTitle: {
    en: "Chronology of Liberty",
    ro: "Cronologia Libertății",
  },
  timelineSubtitle: {
    en: "Select an era to explore",
    ro: "Selectează o epocă pentru a explora",
  },
  thematicTitle: {
    en: "Thematic Historical Journeys",
    ro: "Călătorii Istorice Tematice",
  },
  thematicSubtitle: {
    en: "Explore key pillars of the American spirit, constitutional battles, and systemic triumphs.",
    ro: "Explorează pilonii cheie ai spiritului american, bătăliile constituționale și triumfurile sistemice.",
  },
  sectionsLabel: {
    en: "Sections:",
    ro: "Secțiuni:",
  },
  readChapter: {
    en: "Explore Chapter",
    ro: "Explorează Capitolul",
  },
  eraNavGridTitle: {
    en: "In this Era:",
    ro: "În această Epocă:",
  },
} as const;

// Custom mapping of Lucide icons based on route subpaths
const getIconForItem = (href: string) => {
  if (href.endsWith("founding-principles")) return <Award className="w-5 h-5" />;
  if (href.endsWith("american-exceptionalism")) return <Sparkles className="w-5 h-5" />;
  if (href.endsWith("frontier-and-expansion")) return <Compass className="w-5 h-5" />;
  if (href.endsWith("union-and-liberty")) return <Flag className="w-5 h-5" />;
  if (href.endsWith("industrial-rise")) return <TrendingUp className="w-5 h-5" />;
  if (href.endsWith("world-wars")) return <Swords className="w-5 h-5" />;
  if (href.endsWith("american-dream")) return <Home className="w-5 h-5" />;
  if (href.endsWith("cold-war")) return <Globe className="w-5 h-5" />;
  if (href.endsWith("reagan-revolution")) return <Sun className="w-5 h-5" />;
  if (href.endsWith("we-must-fight")) return <Megaphone className="w-5 h-5" />;
  if (href.endsWith("faith-and-reform")) return <Users className="w-5 h-5" />;
  if (href.endsWith("free-markets")) return <Coins className="w-5 h-5" />;
  if (href.endsWith("crisis-and-resilience")) return <Shield className="w-5 h-5" />;
  if (href.endsWith("reform-and-rights")) return <Scale className="w-5 h-5" />;
  if (href.endsWith("post-9-11-america")) return <Eye className="w-5 h-5" />;
  if (href.endsWith("populism-and-labor")) return <Megaphone className="w-5 h-5" />;
  return <BookOpen className="w-5 h-5" />;
};

const HERO_STATS = {
  en: [
    { value: "1776", label: "Founding Year" },
    { value: "250", label: "Years of Liberty" },
    { value: "13", label: "Original Colonies" },
    { value: "50", label: "United States" },
  ],
  ro: [
    { value: "1776", label: "Anul Fondării" },
    { value: "250", label: "Ani de Libertate" },
    { value: "13", label: "Colonii Originale" },
    { value: "50", label: "State Unite" },
  ],
} as const;


export default function HistoryClient({ locale }: { locale: string }) {
  const currentLocale = locale as Locale;
  const [activeEraId, setActiveEraId] = useState(HISTORY_ERAS[0].id);

  // Retrieve active era data
  const activeEra = HISTORY_ERAS.find((e) => e.id === activeEraId) ?? HISTORY_ERAS[0];

  // Retrieve the 15 thematic history pages from local config
  const localizedSections = getLocalizedNavSections(currentLocale);
  const historySection = localizedSections.find((s) => s.href === "/history");
  const thematicItems = historySection ? historySection.items : [];

  return (
    <div className="relative history-classified-bg min-h-screen pb-16">
      <HistoryStyles />

      {/* ── Hero section ── */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="mx-auto max-w-7xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold text-glory-gold tracking-widest uppercase block">
                {currentLocale === "ro" ? "PAGINĂ CRONOLOGICĂ" : "CHRONOLOGICAL HISTORY"}
              </span>
              <h1 className="history-serif-title text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                {TEXT.title[currentLocale]}
              </h1>
              <p className="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed font-light">
                {TEXT.subtitle[currentLocale]}
              </p>
            </div>
            
            {/* Hero Stats */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-6 border-l border-white/10 pl-8">
              {HERO_STATS[currentLocale].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-3xl font-extralight tracking-tight text-white">{stat.value}</div>
                  <div className="text-[10px] font-semibold text-white/40 tracking-wider uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* ── Chronological History Interactive Timeline Dashboard ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
        
        {/* Timeline Selector Top Bar */}
        <div className="p-6 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm relative">
          <div className="border-b border-white/10 pb-4 mb-6">
            <h2 className="text-xs font-semibold text-glory-gold tracking-widest uppercase mb-1">
              {TEXT.timelineTitle[currentLocale]}
            </h2>
            <p className="text-[10px] text-white/40 uppercase tracking-wider">
              {TEXT.timelineSubtitle[currentLocale]}
            </p>
          </div>

          {/* Era Navigation Horizontal Scroll Track */}
          <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="flex gap-4 min-w-max px-1">
              {HISTORY_ERAS.map((era, index) => {
                const isActive = era.id === activeEraId;
                return (
                  <button
                    key={era.id}
                    onClick={() => setActiveEraId(era.id)}
                    className={`p-4 rounded-lg border text-left transition-all duration-300 flex flex-col justify-between w-60 relative group ${
                      isActive
                        ? "border-glory-gold/40 bg-white/[0.06] text-glory-gold shadow-[0_4px_15px_rgba(232,185,35,0.05)]"
                        : "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-semibold text-xs tracking-wider">
                        {era.years}
                      </span>
                      <span className="text-[8px] text-white/30 tracking-wider">
                        ERA {index + 1}
                      </span>
                    </div>
                    <span className="text-xs tracking-wide line-clamp-2 leading-snug">
                      {currentLocale === "ro"
                        ? era.title.ro.replace("Istoria Statelor Unite (", "").replace(")", "")
                        : era.title.en.replace("History of the United States (", "").replace(")", "")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Era Content Display Area (Stacked, much wider) */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEraId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="history-grid-border p-8 md:p-12 space-y-8 relative overflow-hidden rounded-lg"
            >
              {/* Era Header */}
              <div className="border-b border-white/10 pb-6 space-y-2">
                <span className="text-xs font-semibold text-glory-gold tracking-widest uppercase">
                  {activeEra.years}
                </span>
                <h2 className="history-serif-title text-3xl md:text-4xl font-bold text-white">
                  {currentLocale === "ro" ? activeEra.title.ro : activeEra.title.en}
                </h2>
              </div>

              {/* Table of Contents / Anchors */}
              {activeEra.sections.length > 1 && (
                <div className="p-3.5 rounded-lg border border-white/10 bg-white/[0.02] flex flex-wrap gap-2 text-[11px] items-center">
                  <span className="text-white/50 flex items-center gap-1 font-semibold uppercase tracking-wider mr-2">
                    <Search className="w-3.5 h-3.5 text-glory-gold" /> {TEXT.sectionsLabel[currentLocale]}
                  </span>
                  {activeEra.sections.map((sec, idx) => {
                    const heading = currentLocale === "ro" ? sec.heading.ro : sec.heading.en;
                    if (!heading) return null;
                    return (
                      <a
                        key={idx}
                        href={`#section-${idx}`}
                        className="px-3 py-1 rounded bg-white/5 hover:bg-glory-gold/10 hover:text-glory-gold transition-all duration-200 text-white/80 border border-white/5"
                      >
                        {heading}
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Subsections & Paragraphs */}
              <div className="space-y-8">
                {activeEra.sections.map((sec, secIdx) => {
                  const sectionHeading = currentLocale === "ro" ? sec.heading.ro : sec.heading.en;
                  return (
                    <div
                      key={secIdx}
                      id={`section-${secIdx}`}
                      className="space-y-4 scroll-mt-24 border-b border-white/5 pb-8 last:border-0 last:pb-0"
                    >
                      {sectionHeading && (
                        <h3 className="text-sm font-semibold text-glory-gold tracking-wider uppercase border-l border-glory-gold pl-3">
                          {sectionHeading}
                        </h3>
                      )}

                      <div className="space-y-4">
                        {sec.subsections.map((sub, subIdx) => {
                          const subHeading = currentLocale === "ro" ? sub.heading.ro : sub.heading.en;
                          return (
                            <div key={subIdx} className="space-y-3">
                              {subHeading && (
                                <h4 className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                                  {subHeading}
                                </h4>
                              )}
                              <div className="space-y-4">
                                {sub.paragraphs.map((para, paraIdx) => {
                                  const text = currentLocale === "ro" ? para.ro : para.en;
                                  return (
                                    <p
                                      key={paraIdx}
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
      </section>
 
      {/* ── Thematic History Journeys Navigation Grid ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl space-y-12">
          
          <div className="text-center space-y-3 pb-8 border-b border-white/10 max-w-3xl mx-auto">
            <span className="text-xs text-glory-gold font-semibold tracking-widest uppercase">THEMATIC HISTORICAL JOURNEYS</span>
            <h2 className="history-serif-title text-3xl md:text-4xl font-bold text-white tracking-tight">
              {TEXT.thematicTitle[currentLocale]}
            </h2>
            <p className="text-white/60 text-sm leading-relaxed font-light">
              {TEXT.thematicSubtitle[currentLocale]}
            </p>
          </div>
 
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {thematicItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="group relative overflow-hidden history-grid-border hover:border-glory-gold/30 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between p-6 min-h-[260px] rounded-lg"
              >
                {/* Visual top bar glow */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-glory-blue/20 to-transparent group-hover:from-glory-gold/40 group-hover:to-glory-blue/40 transition-all duration-300" />
 
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-glory-gold/70 group-hover:text-glory-gold transition-colors text-[10px] font-semibold tracking-wider uppercase">
                    <div className="flex items-center gap-2">
                      {getIconForItem(item.href)}
                      <span>
                        {locale === "ro" ? `Cap. ${index + 1}` : `Ch. ${index + 1}`}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-white/95 group-hover:text-white transition-colors text-xs uppercase tracking-wider">
                      {item.label}
                    </h3>
                    <p className="text-white/50 text-xs leading-relaxed line-clamp-4 font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
 
                <div className="pt-4 mt-auto">
                  <Link
                    href={item.href}
                    className="flex items-center justify-between w-full text-left text-[11px] uppercase tracking-wider font-semibold text-glory-gold group-hover:text-white transition-colors pt-3 border-t border-white/5"
                  >
                    <span>{TEXT.readChapter[currentLocale]}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── AI Oracle CTA ── */}
      <AskAmericaCTA
        locale={currentLocale}
        descriptionEn="Ask the AI Oracle about founding principles, American exceptionalism, the Civil War, the Cold War, or the Reagan era."
        descriptionRo="Întreabă Oracolul AI despre principiile fondatoare, excepționalismul american, Războiul Civil, Războiul Rece sau era Reagan."
      />
    </div>
  );
}

