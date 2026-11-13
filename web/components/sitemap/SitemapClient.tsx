"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Map,
  Camera,
  Video,
  Award,
  Sparkles,
  Globe,
  Layers,
  BookOpen,
  Search,
  ArrowRight,
  TrendingUp,
  Mountain,
  Shield,
  Scroll,
  Palette,
  Cpu,
  GraduationCap,
  HeartPulse,
  Landmark,
  Database,
  Building2,
  ChevronRight,
  Compass,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export interface SitemapItem {
  label: string;
  href: string;
  description?: string;
}

export interface SitemapSection {
  title: string;
  href: string;
  description: string;
  badge?: string;
  items: readonly SitemapItem[] | SitemapItem[];
}

interface PortalItem {
  href: string;
  title: string;
  description: string;
  tag: string;
  iconName: string;
}

interface SitemapClientProps {
  locale: Locale;
  navSections: readonly SitemapSection[] | SitemapSection[];
  portals: PortalItem[];
  copy: {
    eyebrow: string;
    title: string;
    subtitle: string;
    stats: {
      verticals: string;
      chapters: string;
      portals: string;
      visualAssets: string;
    };
    filterAll: string;
    filterPortals: string;
    filterChronicles: string;
    searchPlaceholder: string;
    portalsEyebrow: string;
    portalsTitle: string;
    portalsDescription: string;
    verticalsEyebrow: string;
    verticalsTitle: string;
    verticalsDescription: string;
    exploreHub: string;
    noResults: string;
    noResultsSub: string;
    resetSearch: string;
    searchCtaTitle: string;
    searchCtaDesc: string;
    searchCtaButton: string;
    oracleCtaTitle: string;
    oracleCtaDesc: string;
    oracleCtaButton: string;
  };
}

const PORTAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  explorer: Map,
  gallery: Camera,
  videos: Video,
  "civics-quiz": Award,
  interactive: Sparkles,
  "united-states": Globe,
  "natural-resources": Layers,
  misconceptions: BookOpen,
  search: Search,
};

const VERTICAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "/economy": TrendingUp,
  "/nature": Mountain,
  "/military": Shield,
  "/constitution": Scroll,
  "/culture": Palette,
  "/innovation": Cpu,
  "/science": Sparkles,
  "/universities": GraduationCap,
  "/quality-of-life": HeartPulse,
  "/global-leadership": Globe,
  "/history": Landmark,
  "/data": Database,
  "/infrastructure": Building2,
  "/literature-philosophy": BookOpen,
  "/art-architecture": Compass,
};

export function SitemapClient({
  locale,
  navSections,
  portals,
  copy,
}: SitemapClientProps) {
  const [filterMode, setFilterMode] = useState<"all" | "portals" | "chronicles">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const totalChapters = useMemo(() => {
    return (navSections as readonly SitemapSection[]).reduce<number>(
      (acc: number, section) => acc + section.items.length,
      0
    );
  }, [navSections]);

  const filteredPortals = useMemo(() => {
    if (filterMode === "chronicles") return [];
    if (!searchQuery.trim()) return portals;
    const query = searchQuery.toLowerCase().trim();
    return portals.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tag.toLowerCase().includes(query)
    );
  }, [portals, filterMode, searchQuery]);

  const filteredSections = useMemo(() => {
    if (filterMode === "portals") return [];
    if (!searchQuery.trim()) return navSections;
    const query = searchQuery.toLowerCase().trim();
    return navSections
      .map((section) => {
        const matchesSection =
          section.title.toLowerCase().includes(query) ||
          section.description.toLowerCase().includes(query);
        const matchingItems = (section.items as readonly SitemapItem[]).filter(
          (item: SitemapItem) =>
            item.label.toLowerCase().includes(query) ||
            Boolean(item.description && item.description.toLowerCase().includes(query))
        );
        if (matchesSection) return section;
        if (matchingItems.length > 0) {
          return { ...section, items: matchingItems };
        }
        return null;
      })
      .filter((s): s is SitemapSection => s !== null);
  }, [navSections, filterMode, searchQuery]);

  const hasAnyResults = filteredPortals.length > 0 || filteredSections.length > 0;

  return (
    <div className="min-h-screen bg-navy-dark text-white pt-24 pb-24 selection:bg-glory-gold selection:text-black">
      {/* ── Hero Header ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-navy-mid/60 via-navy-dark to-navy-dark px-4 pt-10 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-glory-gold">
              ★ {copy.eyebrow} ★
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
                {copy.title}
              </h1>
              <p className="mt-4 font-body text-base sm:text-lg text-white/70 leading-relaxed">
                {copy.subtitle}
              </p>
            </div>

            {/* Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur">
                <span className="font-hero text-2xl text-glory-gold block leading-none">
                  15
                </span>
                <span className="font-body text-[11px] font-medium text-white/50 uppercase tracking-wider block mt-1">
                  {copy.stats.verticals}
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur">
                <span className="font-hero text-2xl text-white block leading-none">
                  {totalChapters}+
                </span>
                <span className="font-body text-[11px] font-medium text-white/50 uppercase tracking-wider block mt-1">
                  {copy.stats.chapters}
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur">
                <span className="font-hero text-2xl text-glory-gold block leading-none">
                  9
                </span>
                <span className="font-body text-[11px] font-medium text-white/50 uppercase tracking-wider block mt-1">
                  {copy.stats.portals}
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur">
                <span className="font-hero text-2xl text-white block leading-none">
                  1,100+
                </span>
                <span className="font-body text-[11px] font-medium text-white/50 uppercase tracking-wider block mt-1">
                  {copy.stats.visualAssets}
                </span>
              </div>
            </div>
          </div>

          {/* ── Quick Filter & Search Bar ────────────────────────────── */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl border border-white/10 bg-black/40">
              <button
                type="button"
                onClick={() => setFilterMode("all")}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg font-body text-xs font-semibold uppercase tracking-wider transition-all",
                  filterMode === "all"
                    ? "bg-glory-gold text-black shadow-md"
                    : "text-white/60 hover:text-white"
                )}
              >
                {copy.filterAll}
              </button>
              <button
                type="button"
                onClick={() => setFilterMode("portals")}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg font-body text-xs font-semibold uppercase tracking-wider transition-all",
                  filterMode === "portals"
                    ? "bg-glory-gold text-black shadow-md"
                    : "text-white/60 hover:text-white"
                )}
              >
                {copy.filterPortals}
              </button>
              <button
                type="button"
                onClick={() => setFilterMode("chronicles")}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg font-body text-xs font-semibold uppercase tracking-wider transition-all",
                  filterMode === "chronicles"
                    ? "bg-glory-gold text-black shadow-md"
                    : "text-white/60 hover:text-white"
                )}
              >
                {copy.filterChronicles}
              </button>
            </div>

            {/* Live Filter Input */}
            <div className="relative min-w-[280px] max-w-md flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-glory-gold/70" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={copy.searchPlaceholder}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-2 pl-10 pr-4 font-body text-xs text-white placeholder-white/40 focus:border-glory-gold/60 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Area ────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* ── Empty State ────────────────────────────────────────────── */}
        {!hasAnyResults && (
          <div className="text-center py-24 rounded-3xl border border-white/10 bg-white/[0.02]">
            <Search className="w-10 h-10 text-white/30 mx-auto mb-4" />
            <h2 className="font-display text-2xl text-white mb-2">
              {copy.noResults}
            </h2>
            <p className="font-body text-sm text-white/50 max-w-md mx-auto mb-6">
              {copy.noResultsSub}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setFilterMode("all");
              }}
              className="px-4 py-2 rounded-xl border border-glory-gold/40 bg-glory-gold/10 font-body text-xs font-semibold uppercase tracking-wider text-glory-gold hover:bg-glory-gold hover:text-black transition-colors"
            >
              {copy.resetSearch}
            </button>
          </div>
        )}

        {/* ── Section 1: Interactive Portals & Visual Archives ────────────── */}
        {filteredPortals.length > 0 && (
          <section>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-glory-gold flex items-center gap-2">
                  <span>★</span> {copy.portalsEyebrow} <span>★</span>
                </p>
                <h2 className="font-display text-2xl sm:text-3xl text-white mt-1">
                  {copy.portalsTitle}
                </h2>
              </div>
              <p className="font-body text-xs sm:text-sm text-white/50 max-w-md">
                {copy.portalsDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredPortals.map((portal) => {
                const IconComponent = PORTAL_ICONS[portal.iconName] || Globe;
                return (
                  <Link
                    key={portal.href}
                    href={portal.href}
                    className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border border-glory-gold/20 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-glory-gold/50 hover:bg-glory-gold/[0.06] transition-all duration-200 shadow-lg"
                  >
                    <div>
                      {/* Top Row: Icon + Tag + Arrow */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-glory-gold/30 bg-glory-gold/10 text-glory-gold group-hover:scale-105 transition-transform">
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <span className="font-body text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-white/10 bg-white/5 text-white/60">
                            {portal.tag}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-glory-gold/60 group-hover:text-glory-gold group-hover:translate-x-1 transition-all" />
                      </div>

                      <h3 className="font-display text-xl text-white group-hover:text-glory-gold transition-colors">
                        {portal.title}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-white/60 leading-relaxed mt-2 line-clamp-2">
                        {portal.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-glory-gold font-semibold uppercase tracking-wider">
                      <span>{copy.exploreHub}</span>
                      <span>→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Section 2: Thematic Verticals & Chronicles ────────────── */}
        {filteredSections.length > 0 && (
          <section>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-glory-gold flex items-center gap-2">
                  <span>★</span> {copy.verticalsEyebrow} <span>★</span>
                </p>
                <h2 className="font-display text-2xl sm:text-3xl text-white mt-1">
                  {copy.verticalsTitle}
                </h2>
              </div>
              <p className="font-body text-xs sm:text-sm text-white/50 max-w-md">
                {copy.verticalsDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSections.map((section, idx) => {
                const IconComponent = VERTICAL_ICONS[section.href] || Landmark;
                return (
                  <div
                    key={section.href}
                    className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] hover:border-glory-gold/30 hover:bg-white/[0.04] transition-all duration-200 overflow-hidden shadow-xl"
                  >
                    <div className="p-5 sm:p-6">
                      {/* Header with index, icon, title & badge */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-glory-gold">
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="font-hero text-xs tracking-wider text-glory-gold/70 block leading-none">
                              {(idx + 1).toString().padStart(2, "0")}
                            </span>
                            <Link
                              href={section.href}
                              className="font-display text-xl text-white hover:text-glory-gold transition-colors block mt-0.5"
                            >
                              {section.title}
                            </Link>
                          </div>
                        </div>

                        {"badge" in section && (section as { badge?: string }).badge && (
                          <span className="text-[10px] font-body text-glory-gold bg-glory-gold/10 border border-glory-gold/20 font-semibold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                            {(section as { badge?: string }).badge}
                          </span>
                        )}
                      </div>

                      <p className="font-body text-xs text-white/60 leading-relaxed mb-4 line-clamp-2">
                        {section.description}
                      </p>

                      {/* Chapters list */}
                      <div className="space-y-1.5 pt-3 border-t border-white/5">
                        <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-white/40 block mb-2">
                          {section.items.length} {locale === "ro" ? "Capitole" : "Chapters"}
                        </span>
                        {(section.items as readonly SitemapItem[]).map((item: SitemapItem) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="group/item flex items-center justify-between p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <span className="font-body text-xs font-medium group-hover/item:text-glory-gold transition-colors truncate">
                              {item.label}
                            </span>
                            <ChevronRight className="h-3 w-3 text-white/30 group-hover/item:text-glory-gold group-hover/item:translate-x-0.5 transition-all shrink-0 ml-2" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Explore Hub Link */}
                    <div className="px-5 py-3 border-t border-white/5 bg-white/[0.01]">
                      <Link
                        href={section.href}
                        className="font-body text-xs text-glory-gold hover:text-glory-gold-dark font-semibold tracking-wider uppercase flex items-center justify-between transition-colors"
                      >
                        <span>{copy.exploreHub}</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Section 3: Bottom Action Cards ────────────────────────────── */}
        <section className="pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Global Search Card */}
            <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-glory-gold/30 bg-glory-gold/10 text-glory-gold mb-4">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl text-white">
                  {copy.searchCtaTitle}
                </h3>
                <p className="font-body text-sm text-white/60 mt-2 leading-relaxed">
                  {copy.searchCtaDesc}
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-glory-gold/40 bg-glory-gold text-black font-body text-xs font-semibold uppercase tracking-wider hover:bg-glory-gold-dark transition-colors"
                >
                  {copy.searchCtaButton} →
                </Link>
              </div>
            </div>

            {/* Ask America Oracle Card */}
            <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-glory-gold/30 bg-glory-gold/10 text-glory-gold mb-4">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl text-white">
                  {copy.oracleCtaTitle}
                </h3>
                <p className="font-body text-sm text-white/60 mt-2 leading-relaxed">
                  {copy.oracleCtaDesc}
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/interactive"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white font-body text-xs font-semibold uppercase tracking-wider hover:bg-white/20 transition-colors"
                >
                  {copy.oracleCtaButton} →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
