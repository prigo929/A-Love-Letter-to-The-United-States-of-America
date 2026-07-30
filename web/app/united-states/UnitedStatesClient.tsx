"use client";

// ─── United States Profile Page ───────────────────────────────────────────────
// Premium interactive tabbed dashboard showcasing the complete USA profile.
// Sources: Grokipedia/Wikipedia content parsed, translated to Romanian.

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Globe, Scale, TrendingUp, Users, Palette,
  ChevronRight, Star, ExternalLink, Info, Map, Swords, Flag,
} from "lucide-react";
import { US_SECTIONS, US_QUICK_FACTS } from "@/lib/data/united-states-data";
import type { USSection } from "@/lib/data/united-states-data";
import { PhotoLightboxGrid } from "@/components/shared/PhotoLightboxGrid";
import { SITE_IMAGES } from "@/lib/site-images";

// ─── Tab config ───────────────────────────────────────────────────────────────
const TABS: {
  id: string;
  icon: React.ReactNode;
  label_en: string;
  label_ro: string;
  color: string;
  link?: { href: string; label_en: string; label_ro: string };
}[] = [
  {
    id: "etymology-and-national-identity",
    icon: <Flag className="w-4 h-4" />,
    label_en: "Identity & Symbols",
    label_ro: "Identitate și Simboluri",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "history",
    icon: <BookOpen className="w-4 h-4" />,
    label_en: "History",
    label_ro: "Istorie",
    color: "from-amber-500 to-orange-600",
    link: { href: "/history", label_en: "Explore Full History →", label_ro: "Explorează Istoria Completă →" },
  },
  {
    id: "geography-and-environment",
    icon: <Globe className="w-4 h-4" />,
    label_en: "Geography",
    label_ro: "Geografie",
    color: "from-emerald-500 to-green-600",
    link: { href: "/nature", label_en: "Explore Nature & Parks →", label_ro: "Explorează Natura și Parcurile →" },
  },
  {
    id: "government-and-law",
    icon: <Scale className="w-4 h-4" />,
    label_en: "Government & Law",
    label_ro: "Guvern și Lege",
    color: "from-purple-500 to-violet-600",
    link: { href: "/constitution", label_en: "Explore the Constitution →", label_ro: "Explorează Constituția →" },
  },
  {
    id: "foreign-relations-and-national-security",
    icon: <Swords className="w-4 h-4" />,
    label_en: "Foreign Relations",
    label_ro: "Relații Externe",
    color: "from-red-500 to-rose-600",
    link: { href: "/military", label_en: "Explore the Military →", label_ro: "Explorează Armata →" },
  },
  {
    id: "economy",
    icon: <TrendingUp className="w-4 h-4" />,
    label_en: "Economy",
    label_ro: "Economie",
    color: "from-yellow-500 to-amber-600",
    link: { href: "/economy", label_en: "Explore the Economy →", label_ro: "Explorează Economia →" },
  },
  {
    id: "demographics-and-society",
    icon: <Users className="w-4 h-4" />,
    label_en: "Demographics",
    label_ro: "Demografie",
    color: "from-cyan-500 to-sky-600",
  },
  {
    id: "culture-and-values",
    icon: <Palette className="w-4 h-4" />,
    label_en: "Culture & Values",
    label_ro: "Cultură și Valori",
    color: "from-pink-500 to-fuchsia-600",
    link: { href: "/culture", label_en: "Explore American Culture →", label_ro: "Explorează Cultura Americană →" },
  },
];

// ─── Hero quick-fact strip ────────────────────────────────────────────────────
function QuickFactStrip({ locale }: { locale: string }) {
  const facts = US_QUICK_FACTS.slice(0, 6);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
      {facts.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 flex flex-col gap-1 hover:border-glory-gold/30 transition-colors group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="font-body text-[10px] uppercase tracking-[0.2em] text-glory-gold/80 font-semibold">
            {locale === "ro" ? f.label.ro : f.label.en}
          </p>
          <p className="font-display text-white/90 text-sm font-semibold leading-tight">
            {locale === "ro" ? f.value.ro : f.value.en}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Full quick-facts grid ────────────────────────────────────────────────────
function AllQuickFacts({ locale }: { locale: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {US_QUICK_FACTS.map((f, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/4 p-4 hover:border-glory-gold/25 transition-colors"
        >
          <div className="mt-0.5 flex-shrink-0 w-2 h-2 rounded-full bg-glory-gold/60" />
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-glory-gold/70 font-semibold mb-0.5">
              {locale === "ro" ? f.label.ro : f.label.en}
            </p>
            <p className="font-body text-white/85 text-sm leading-snug">
              {locale === "ro" ? f.value.ro : f.value.en}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Table renderer ───────────────────────────────────────────────────────────
function DataTable({ table, locale }: { table: USSection["tables"][number]; locale: string }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 mt-4">
      <table className="w-full text-sm">
        <thead className="bg-white/6 border-b border-white/10">
          <tr>
            {table.headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left font-body font-semibold text-glory-gold/80 text-xs uppercase tracking-wider">
                {locale === "ro" ? h.ro : h.en}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri} className="border-t border-white/6 hover:bg-white/4 transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 font-body text-white/75 text-sm">
                  {locale === "ro" ? cell.ro : cell.en}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Section content ──────────────────────────────────────────────────────────
function SectionContent({ section, locale, ctaLink }: {
  section: USSection;
  locale: string;
  ctaLink?: { href: string; label_en: string; label_ro: string };
}) {
  return (
    <motion.div
      key={section.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-8"
    >
      {/* Section title */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
          {locale === "ro" ? section.title.ro : section.title.en}
        </h2>
        {ctaLink && (
          <Link
            href={ctaLink.href}
            className="flex items-center gap-2 rounded-xl border border-glory-gold/30 bg-glory-gold/8 px-4 py-2 text-glory-gold text-sm font-semibold hover:bg-glory-gold/15 transition-colors group whitespace-nowrap"
          >
            {locale === "ro" ? ctaLink.label_ro : ctaLink.label_en}
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>

      {/* Subsections */}
      {section.subsections.map((sub, si) => (
        sub.paragraphs.length > 0 && (
          <div key={si} className="space-y-4">
            {sub.heading.en && (
              <h3 className="font-display text-lg font-semibold text-white/90 border-l-2 border-glory-gold/50 pl-3">
                {locale === "ro" ? sub.heading.ro : sub.heading.en}
              </h3>
            )}
            <div className="space-y-3">
              {sub.paragraphs.map((para, pi) => (
                <p key={pi} className="font-body text-white/70 leading-relaxed text-[15px]">
                  {locale === "ro" ? para.ro : para.en}
                </p>
              ))}
            </div>
          </div>
        )
      ))}

      {/* Tables */}
      {section.tables.map((table, ti) => (
        <DataTable key={ti} table={table} locale={locale} />
      ))}
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function UnitedStatesClient({ locale }: { locale: string }) {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [showAllFacts, setShowAllFacts] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeTabConfig = TABS.find(t => t.id === activeTab) ?? TABS[0];
  const activeSection = US_SECTIONS.find(s => s.id === activeTab);

  const heading = locale === "ro"
    ? { title: "Profilul Statelor Unite", sub: "Un portret complet al celei mai mari națiuni din lume" }
    : { title: "United States Profile", sub: "A complete portrait of the world's greatest nation" };

  return (
    <div className="min-h-screen bg-navy-dark">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-glory-blue/10 rounded-full blur-[120px]" />
          <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-glory-red/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-screen-xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/40 text-sm font-body mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/60">
              {locale === "ro" ? "Profilul SUA" : "US Profile"}
            </span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-glory-gold text-glory-gold" />
            ))}
            <span className="ml-2 font-body text-xs text-glory-gold/70 uppercase tracking-widest font-semibold">
              {locale === "ro" ? "Statele Unite ale Americii" : "United States of America"}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-[1.05] mb-3">
            {heading.title}
          </h1>
          <p className="font-body text-white/60 text-lg max-w-2xl leading-relaxed">
            {heading.sub}
          </p>

          {/* Quick fact strip */}
          <QuickFactStrip locale={locale} />

          {/* Show all facts toggle */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowAllFacts(v => !v)}
              className="flex items-center gap-2 text-glory-gold/70 hover:text-glory-gold text-sm font-body font-semibold transition-colors"
            >
              <Info className="w-4 h-4" />
              {locale === "ro"
                ? (showAllFacts ? "Ascunde toate faptele" : "Afișează toate faptele")
                : (showAllFacts ? "Hide all facts" : "Show all quick facts")}
            </button>
          </div>

          <AnimatePresence>
            {showAllFacts && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-6 overflow-hidden"
              >
                <AllQuickFacts locale={locale} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Map illustrations (stylized) ──────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-4">
        <div className="max-w-screen-xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-glory-gold font-semibold mb-2">
            {locale === "ro" ? "O NAȚIUNE, 50 DE STATE" : "ONE NATION, 50 STATES"}
          </p>
          <p className="text-white/50 text-sm font-body leading-relaxed max-w-2xl mb-6">
            {locale === "ro"
              ? "De la coastele arctice ale Alaskăi până la insulele tropicale ale Hawaiʻi: 50 de state sub același drapel. (Ilustrații stilizate.)"
              : "From the Arctic coasts of Alaska to the tropical shores of Hawaiʻi: 50 states under one flag. (Stylized illustrations.)"}
          </p>
          <PhotoLightboxGrid
            gridClassName="grid grid-cols-1 md:grid-cols-2 gap-6"
            photos={[
              {
                src: SITE_IMAGES.usaMapFlag,
                alt: "United States map filled with the American flag pattern across all 50 states",
                caption: locale === "ro" ? "O Națiune, 50 de State: de la Oceanic la Oceanic" : "One Nation, 50 States: From Sea to Shining Sea",
                aspect: "5/3",
              },
              {
                src: SITE_IMAGES.usaMapPeople,
                alt: "United States map with stylized red and blue people figures",
                caption: locale === "ro" ? "Un Popor de Imigranți: ilustrație" : "A People of Many Origins: illustration",
                aspect: "5/3",
              },
            ]}
          />
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex gap-8 items-start">

            {/* ── Sidebar tab nav (desktop) ─────────────────────────────── */}
            <aside className="hidden lg:flex flex-col w-64 shrink-0 sticky top-24 gap-1">
              {TABS.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={[
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group",
                      isActive
                        ? "bg-white/10 border border-white/15 text-white shadow-lg"
                        : "text-white/50 hover:text-white/80 hover:bg-white/6 border border-transparent",
                    ].join(" ")}
                  >
                    <span className={[
                      "flex items-center justify-center w-7 h-7 rounded-lg transition-all",
                      isActive
                        ? `bg-gradient-to-br ${tab.color} text-white shadow-sm`
                        : "bg-white/6 text-white/40 group-hover:bg-white/10 group-hover:text-white/70",
                    ].join(" ")}>
                      {tab.icon}
                    </span>
                    <span className="font-body text-sm font-semibold">
                      {locale === "ro" ? tab.label_ro : tab.label_en}
                    </span>
                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 ml-auto text-white/60" />
                    )}
                  </button>
                );
              })}
            </aside>

            {/* ── Mobile tab selector ───────────────────────────────────── */}
            <div className="lg:hidden w-full mb-6">
              <button
                onClick={() => setIsMobileMenuOpen(v => !v)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-white/15 bg-white/8 text-white"
              >
                <span className="flex items-center gap-3">
                  <span className={`flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br ${activeTabConfig.color} text-white`}>
                    {activeTabConfig.icon}
                  </span>
                  <span className="font-body font-semibold text-sm">
                    {locale === "ro" ? activeTabConfig.label_ro : activeTabConfig.label_en}
                  </span>
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${isMobileMenuOpen ? "rotate-90" : ""}`} />
              </button>
              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 overflow-hidden border border-white/10 rounded-xl bg-navy-mid divide-y divide-white/6"
                  >
                    {TABS.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/6 transition-colors"
                      >
                        <span className={`flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br ${tab.color} text-white text-xs`}>
                          {tab.icon}
                        </span>
                        <span className="font-body text-sm text-white/80">
                          {locale === "ro" ? tab.label_ro : tab.label_en}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Content panel ─────────────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                {activeSection ? (
                  <SectionContent
                    key={activeTab}
                    section={activeSection}
                    locale={locale}
                    ctaLink={activeTabConfig.link}
                  />
                ) : (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 text-white/40 py-16"
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-glory-gold/40 border-t-glory-gold animate-spin" />
                    <span className="font-body">
                      {locale === "ro" ? "Se încarcă secțiunea…" : "Loading section…"}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── Deep-dive CTA footer ─────────────────────────────────────────── */}
      <section className="border-t border-white/8 bg-navy-mid/50 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-screen-xl mx-auto">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-glory-gold font-semibold mb-3">
            {locale === "ro" ? "Explorează Mai Departe" : "Explore Deeper"}
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-white font-bold mb-8">
            {locale === "ro"
              ? "Scufundă-te în paginile noastre specializate"
              : "Dive into our specialized deep-dive pages"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { href: "/history", en: "History", ro: "Istorie", icon: <BookOpen className="w-5 h-5" />, color: "from-amber-500 to-orange-600" },
              { href: "/economy", en: "Economy", ro: "Economie", icon: <TrendingUp className="w-5 h-5" />, color: "from-yellow-500 to-amber-600" },
              { href: "/military", en: "Military", ro: "Armată", icon: <Swords className="w-5 h-5" />, color: "from-red-500 to-rose-600" },
              { href: "/constitution", en: "Constitution", ro: "Constituție", icon: <Scale className="w-5 h-5" />, color: "from-purple-500 to-violet-600" },
              { href: "/nature", en: "Nature", ro: "Natură", icon: <Map className="w-5 h-5" />, color: "from-emerald-500 to-green-600" },
              { href: "/culture", en: "Culture", ro: "Cultură", icon: <Palette className="w-5 h-5" />, color: "from-pink-500 to-fuchsia-600" },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/4 p-5 hover:border-white/20 hover:bg-white/8 transition-all duration-200"
              >
                <div className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} text-white group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <span className="font-body text-sm text-white/70 group-hover:text-white font-semibold transition-colors">
                  {locale === "ro" ? item.ro : item.en}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
