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
  if (href.endsWith("arsenal-of-democracy")) return <Swords className="w-5 h-5" />;
  if (href.endsWith("cold-war-and-anti-communism")) return <Globe className="w-5 h-5" />;
  if (href.endsWith("the-american-dream")) return <Home className="w-5 h-5" />;
  if (href.endsWith("the-reagan-revolution")) return <Sun className="w-5 h-5" />;
  if (href.endsWith("faith-family-and-community")) return <Users className="w-5 h-5" />;
  if (href.endsWith("free-markets-and-prosperity")) return <Coins className="w-5 h-5" />;
  if (href.endsWith("border-sovereignty-and-national-identity")) return <Shield className="w-5 h-5" />;
  if (href.endsWith("constitutional-battles")) return <Scale className="w-5 h-5" />;
  if (href.endsWith("post-9-11-america")) return <Eye className="w-5 h-5" />;
  if (href.endsWith("the-populist-era")) return <Megaphone className="w-5 h-5" />;
  return <BookOpen className="w-5 h-5" />;
};

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
    <div className="relative">
      {/* ── Hero section ── */}
      <section className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-glory-blue/10 rounded-full blur-[100px]" />
          <div className="absolute top-10 right-0 w-[300px] h-[300px] bg-glory-red/5 rounded-full blur-[90px]" />
        </div>

        <div className="mx-auto max-w-7xl relative">
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 md:p-12 text-center overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-glory-blue via-glory-gold to-glory-red" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto space-y-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-glory-gold/30 bg-glory-gold/5 text-glory-gold text-xs font-semibold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" /> 1776 – Present
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
                {TEXT.title[currentLocale]}
              </h1>
              <p className="font-body text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                {TEXT.subtitle[currentLocale]}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
 
      {/* ── Chronological History Interactive Timeline Dashboard ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Vertical/Horizontal Navigation Sidebar (Timeline Selector) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm relative">
              <h2 className="font-display text-lg font-bold text-white mb-1">
                {TEXT.timelineTitle[currentLocale]}
              </h2>
              <p className="font-body text-xs text-white/50 mb-4">
                {TEXT.timelineSubtitle[currentLocale]}
              </p>
 
              {/* Desktop timeline list */}
              <div className="hidden lg:block relative pl-4 border-l border-white/10 space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {HISTORY_ERAS.map((era) => {
                   const isActive = era.id === activeEraId;
                   return (
                     <button
                       key={era.id}
                       onClick={() => setActiveEraId(era.id)}
                       className={`w-full text-left p-3 rounded-xl transition-all duration-200 relative group flex flex-col gap-1 border ${
                         isActive
                           ? "border-glory-gold/30 bg-white/[0.05] shadow-[0_0_15px_rgba(255,215,0,0.06)]"
                           : "border-transparent bg-transparent hover:bg-white/5"
                       }`}
                     >
                       {/* Active indicator node */}
                       <div
                         className={`absolute left-[-21px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border transition-all ${
                           isActive
                             ? "bg-glory-gold border-glory-gold scale-125 shadow-[0_0_8px_#FFD700]"
                             : "bg-black border-white/30 group-hover:border-white/60"
                         }`}
                       />
                       <span
                         className={`font-display font-bold text-sm tracking-wide transition-colors ${
                           isActive ? "text-glory-gold" : "text-white/85 group-hover:text-white"
                         }`}
                       >
                         {era.years}
                       </span>
                       <span
                         className={`font-body text-xs line-clamp-1 transition-colors ${
                           isActive ? "text-white/90" : "text-white/60"
                         }`}
                       >
                         {currentLocale === "ro" ? era.title.ro : era.title.en}
                       </span>
                     </button>
                   );
                })}
              </div>
 
              {/* Mobile horizontal scroller */}
              <div className="lg:hidden flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
                {HISTORY_ERAS.map((era) => {
                  const isActive = era.id === activeEraId;
                  return (
                    <button
                      key={era.id}
                      onClick={() => setActiveEraId(era.id)}
                      className={`flex-shrink-0 snap-center p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center min-w-[120px] ${
                        isActive
                          ? "border-glory-gold/40 bg-white/[0.08] text-glory-gold shadow-[0_0_15px_rgba(255,215,0,0.1)]"
                          : "border-white/10 bg-white/3 text-white/70"
                      }`}
                    >
                      <span className="font-display font-bold text-xs">{era.years}</span>
                      <span className="font-body text-[10px] uppercase tracking-wider text-white/40 mt-1 line-clamp-1 max-w-[100px]">
                        {currentLocale === "ro" ? era.title.ro.replace("Istoria Statelor Unite", "") : era.title.en.replace("History of the United States", "")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
 
          {/* Era Content Display Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEraId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 space-y-6 shadow-xl"
              >
                {/* Era Header */}
                <div className="border-b border-white/10 pb-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-white/5 text-glory-gold border border-glory-gold/25 font-display text-sm font-bold tracking-wider">
                      {activeEra.years}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-black text-white">
                    {currentLocale === "ro" ? activeEra.title.ro : activeEra.title.en}
                  </h2>
                </div>
 
                {/* mini Table of Contents / Anchors */}
                {activeEra.sections.length > 1 && (
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex flex-wrap gap-2 text-xs items-center">
                    <span className="text-white/45 flex items-center gap-1 font-semibold uppercase tracking-wider mr-2">
                      <Search className="w-3.5 h-3.5" /> {TEXT.sectionsLabel[currentLocale]}
                    </span>
                    {activeEra.sections.map((sec, idx) => {
                      const heading = currentLocale === "ro" ? sec.heading.ro : sec.heading.en;
                      if (!heading) return null;
                      return (
                        <a
                          key={idx}
                          href={`#section-${idx}`}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-glory-gold/15 hover:text-glory-gold transition-colors text-white/75 border border-white/5"
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
                        className="space-y-4 scroll-mt-24 border-b border-white/5 pb-6 last:border-0 last:pb-0"
                      >
                        {sectionHeading && (
                          <h3 className="font-display text-lg md:text-xl font-bold text-glory-gold border-l-2 border-glory-gold pl-3">
                            {sectionHeading}
                          </h3>
                        )}
 
                        <div className="space-y-4">
                          {sec.subsections.map((sub, subIdx) => {
                            const subHeading = currentLocale === "ro" ? sub.heading.ro : sub.heading.en;
                            return (
                              <div key={subIdx} className="space-y-3">
                                {subHeading && (
                                  <h4 className="font-display text-sm md:text-base font-semibold text-white/95">
                                    {subHeading}
                                  </h4>
                                )}
                                <div className="space-y-3">
                                  {sub.paragraphs.map((para, paraIdx) => (
                                    <p
                                      key={paraIdx}
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
      </section>
 
      {/* ── Thematic History Journeys Navigation Grid ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-black">
        <div className="mx-auto max-w-7xl space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl font-black text-white tracking-tight">
              {TEXT.thematicTitle[currentLocale]}
            </h2>
            <p className="font-body text-white/60 text-sm md:text-base max-w-2xl mx-auto">
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
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] hover:border-glory-gold/30 hover:shadow-[0_0_20px_rgba(255,215,0,0.08)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual top bar glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-glory-blue/40 to-transparent group-hover:from-glory-gold/40 group-hover:to-glory-blue/40 transition-colors" />

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-glory-gold/80 group-hover:text-glory-gold transition-colors">
                    {getIconForItem(item.href)}
                    <span className="font-display text-[10px] tracking-wider text-white/30 uppercase group-hover:text-glory-gold/45">
                      {locale === "ro" ? `Cap. ${index + 1}` : `Ch. ${index + 1}`}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-white/90 group-hover:text-white transition-colors text-sm md:text-base leading-tight">
                      {item.label}
                    </h3>
                    <p className="font-body text-white/60 text-xs leading-normal line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={item.href}
                    className="flex items-center justify-between w-full text-left text-xs font-semibold text-glory-gold hover:text-glory-gold-light group-2 transition-colors pt-3 border-t border-white/5"
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
