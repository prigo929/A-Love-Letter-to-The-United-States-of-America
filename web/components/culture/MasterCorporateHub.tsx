"use client";

// ─── MasterCorporateHub ───────────────────────────────────────────────────────
// "The Master Corporate Hub": Unified, zero-duplication interactive dashboard
// combining:
// 1) 5 Economic Eras & Corporate Lineage
// 2) Foundational Product Breakthroughs & Founder Quotes
// 3) Cultural Manifestos & Slogans
// 4) Founders' Garages & Origin Addresses
// Written in editorial voice: zero em dashes, zero AI tropes.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE_IMAGES } from "@/lib/site-images";

// Import individual view components
import { CorporateLineageTimeline } from "./CorporateLineageTimeline";
import { CompanyBreakthroughShowcase } from "./CompanyBreakthroughShowcase";
import { IconicSlogansGrid } from "./IconicSlogansGrid";
import { FoundersGarageGrid } from "./FoundersGarageGrid";

type HubViewMode = "lineage" | "breakthroughs" | "slogans" | "garages";

export function MasterCorporateHub() {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const [activeView, setActiveView] = useState<HubViewMode>("lineage");

  const VIEWS: { id: HubViewMode; icon: string; title: string; titleRo: string; subtitle: string; subtitleRo: string }[] = [
    {
      id: "lineage",
      icon: "⏳",
      title: "5 Economic Eras",
      titleRo: "5 Ere Economice",
      subtitle: "1850s to AI Era Lineage",
      subtitleRo: "Evoluția din 1850 până în Era AI",
    },
    {
      id: "breakthroughs",
      icon: "💡",
      title: "Product Breakthroughs",
      titleRo: "Inovații & Produse",
      subtitle: "Founder Quotes & Milestones",
      subtitleRo: "Citate & Repere Istorice",
    },
    {
      id: "slogans",
      icon: "🗣️",
      title: "Iconic Slogans",
      titleRo: "Sloganuri Culturale",
      subtitle: "Ad Agencies & Psychology",
      subtitleRo: "Publicitate & Psihologie",
    },
    {
      id: "garages",
      icon: "🏡",
      title: "Founders' Garages",
      titleRo: "Garajele Fondatoare",
      subtitle: "Original Addresses & Photos",
      subtitleRo: "Adrese Istorice & Fotografii",
    },
  ];

  return (
    <div className="w-full">
      {/* Top Hub Navigation Bar */}
      <div className="mb-12 rounded-3xl bg-[#0C0907]/90 border border-white/10 p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {VIEWS.map((view) => {
            const isActive = activeView === view.id;
            return (
              <button
                key={view.id}
                type="button"
                onClick={() => setActiveView(view.id)}
                className="flex flex-col items-start p-4 sm:p-5 rounded-2xl transition-all duration-300 border text-left"
                style={{
                  cursor: "pointer",
                  backgroundColor: isActive ? "#E8B923" : "rgba(255,255,255,0.03)",
                  color: isActive ? "#0C0907" : "#F5EDD8",
                  borderColor: isActive ? "#E8B923" : "rgba(255,255,255,0.08)",
                  transform: isActive ? "scale(1.02)" : "scale(1)",
                  boxShadow: isActive ? "0 10px 30px rgba(232,185,35,0.25)" : "none",
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg">{view.icon}</span>
                  <span
                    className="font-body text-xs sm:text-sm font-bold uppercase tracking-wider"
                    style={{ color: isActive ? "#0C0907" : "#E8B923" }}
                  >
                    {ro ? view.titleRo : view.title}
                  </span>
                </div>
                <span
                  className="font-body text-[11px] font-semibold opacity-70"
                  style={{ color: isActive ? "#0C0907" : "rgba(245,237,216,0.65)" }}
                >
                  {ro ? view.subtitleRo : view.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active View Container */}
      <div className="transition-all duration-500">
        {activeView === "lineage" && (
          <div className="space-y-6">
            <div className="text-center mb-10">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-glory-gold font-bold mb-2">
                {ro ? "EVOLUȚIA ISTORICĂ A CAPITALISMULUI AMERICAN" : "THE HISTORICAL LINEAGE OF AMERICAN CAPITALISM"}
              </p>
              <h3 className="culture-text-hero text-[#F5EDD8] text-3xl sm:text-5xl font-black tracking-tight">
                {ro ? "CRONOLOGIA LINIILOR DE SÂNGE CORPORATIVE" : "THE CORPORATE LINEAGE TIMELINE"}
              </h3>
              <p className="mx-auto mt-4 max-w-3xl font-editorial text-lg text-[#F5EDD8]/80 leading-relaxed">
                {ro
                  ? "„Cum au evoluat inovațiile corporative americane în 5 ere economice distincte, de la căile ferate și abur în anii 1850 până la rețelele cloud și inteligența artificială generativă.”"
                  : "“How American corporate innovation evolved across 5 distinct economic eras, from 1850s steam and railroads to cloud networks and generative artificial intelligence.”"}
              </p>
            </div>
            <CorporateLineageTimeline />
          </div>
        )}

        {activeView === "breakthroughs" && (
          <div className="space-y-6">
            <div className="text-center mb-10">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-glory-gold font-bold mb-2">
                {ro ? "PIONIERII INDUSTRIEI AMERICANE" : "PIONEERS OF AMERICAN INDUSTRY"}
              </p>
              <h3 className="culture-text-hero text-[#F5EDD8] text-3xl sm:text-5xl font-black tracking-tight">
                {ro ? "INOVAȚIILE CARE AU SCHIMBAT LUMEA" : "BREAKTHROUGHS THAT RESHAPED THE WORLD"}
              </h3>
              <p className="mx-auto mt-4 max-w-3xl font-editorial text-lg text-[#F5EDD8]/80 leading-relaxed">
                {ro
                  ? "„De la blugii 501 Levi's și sticla conturată Coca-Cola la iPhone-ul Apple și linia de asamblare Ford: poveștile produselor iconice care au redefinit viața de zi cu zi.”"
                  : "“From Levi's 501 blue jeans and Coca-Cola's contoured bottle to Apple's iPhone and Ford's assembly line: the stories of iconic products that redefined daily human life.”"}
              </p>
            </div>
            <CompanyBreakthroughShowcase />
          </div>
        )}

        {activeView === "slogans" && (
          <div className="space-y-6">
            <div className="text-center mb-10">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-glory-gold font-bold mb-2">
                {ro ? "SLOGANURILE CARE AU MODELAT LIMBAJUL UMAN" : "SLOGANS THAT SHAPED HUMAN VOCABULARY"}
              </p>
              <h3 className="culture-text-hero text-[#F5EDD8] text-3xl sm:text-5xl font-black tracking-tight">
                {ro ? "MANIFESTELE CULTURALE ALE BRANDURILOR" : "THE CULTURAL MANIFESTOS OF BRANDS"}
              </h3>
              <p className="mx-auto mt-4 max-w-3xl font-editorial text-lg text-[#F5EDD8]/80 leading-relaxed">
                {ro
                  ? "„Cum au transformat cele mai puternice sloganuri din publicitatea americană deciziile de cumpărare în concepte filosofice și expresii uzuale în limba vorbită pe tot globul.”"
                  : "“How America's most powerful commercial slogans transformed buying choices into philosophical concepts and universal phrases across global speech.”"}
              </p>
            </div>
            <IconicSlogansGrid />
          </div>
        )}

        {activeView === "garages" && (
          <div className="space-y-6">
            <div className="text-center mb-10">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-glory-gold font-bold mb-2">
                {ro ? "GARAJELE FONDATOARE ȘI RĂDĂCINILE PROVINCIALE" : "THE FOUNDERS' GARAGES & SMALL-TOWN ROOTS"}
              </p>
              <h3 className="culture-text-hero text-[#F5EDD8] text-3xl sm:text-5xl font-black tracking-tight">
                {ro ? "PUNCTUL DE PLECARE AL IMPERIILOR CORPORATIVE" : "WHERE CORPORATE EMPIRES WERE BORN"}
              </h3>
              <p className="mx-auto mt-4 max-w-3xl font-editorial text-lg text-[#F5EDD8]/80 leading-relaxed">
                {ro
                  ? "„De la garajele de suburbie din Los Altos, Palo Alto și Bellevue la un mic magazin 5&10 din Bentonville: poveștile primilor metri pătrați unde au luat naștere giganții de trilioane de dolari.”"
                  : "“From suburban single-car garages in Los Altos, Palo Alto, and Bellevue to a small 5&10 store in Bentonville: the stories of the first square feet where multi-trillion-dollar giants were born.”"}
              </p>
            </div>
            <FoundersGarageGrid />
          </div>
        )}
      </div>
    </div>
  );
}
