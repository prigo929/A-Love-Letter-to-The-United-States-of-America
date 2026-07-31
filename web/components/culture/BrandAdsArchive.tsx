"use client";

// ─── BrandAdsArchive ─────────────────────────────────────────────────────────
// "Vintage Brand Advertising Archive": Interactive retro print ad vault covering
// mid-century to 1980s American commercial campaigns.
// Written in editorial voice: zero em dashes, zero AI tropes.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";

// Import Brand Ad static images directly
import adCoke1971 from "@/IMAGES/Culture/Brand Ads/1971 Coca Cola Coke Vintage Print Ad Bottle Glass in Snow Ice Cold.jpg";
import adCoke1988 from "@/IMAGES/Culture/Brand Ads/Coca-Cola is it, 1988.jpg";
import adCoke1989 from "@/IMAGES/Culture/Brand Ads/Coca-Cola (1989) You Can't beat the feeling.jpg";
import adKfc1968 from "@/IMAGES/Culture/Brand Ads/1968 Kentucky Fried Chicken advertisement.jpg";
import adFord1987 from "@/IMAGES/Culture/Brand Ads/1987 advertisement for Ford.jpg";
import adWsj1988 from "@/IMAGES/Culture/Brand Ads/1988 The Wall Street Journal advertisement.jpg";
import adGeneralFoods1982 from "@/IMAGES/Culture/Brand Ads/1982 General Foods International Coffees advertisement.jpg";
import adUniden1987 from "@/IMAGES/Culture/Brand Ads/1987 Uniden cordless phone advertisement.jpg";
import adTiffany1967 from "@/IMAGES/Culture/Brand Ads/Tiffany & Co_ Archival Ad 1967.jpg";
import adChiquita1968 from "@/IMAGES/Culture/Brand Ads/1968 Chiquita banana advertisement.jpg";
import adConverse1968 from "@/IMAGES/Culture/Brand Ads/Converse-basketball-shoes-from-1968.jpg";
import adConverseSears1977 from "@/IMAGES/Culture/Brand Ads/Converse-shoes-by-Sears-1977.jpg";
import adPacMan1980 from "@/IMAGES/Culture/Brand Ads/Pac-Man-arcade-video-games-from-1980.jpg";
import adAsteroids from "@/IMAGES/Culture/Brand Ads/Asteroids-arcade-video-game.jpg";
import adJeans1973 from "@/IMAGES/Culture/Brand Ads/Retro-70s-corduroy-western-jeans-with-bell-bottoms-1973.jpg";
import adSprite1966 from "@/IMAGES/Culture/Brand Ads/Sprite-with-vodka-1966.jpg";
import adMinuteMaid1979 from "@/IMAGES/Culture/Brand Ads/1979 Minute Maid Ad.jpg";
import adMagicChef1950 from "@/IMAGES/Culture/Brand Ads/Vintage-Magic-Chef-gas-range-from-1950.jpg";
import adLemonLightly1970s from "@/IMAGES/Culture/Brand Ads/Vintage-Lemon-Go-Lightly-for-blonde-hair-1970s.jpg";

interface VintageAdItem {
  id: string;
  src: any;
  title: string;
  titleRo: string;
  brand: string;
  decade: "1950s" | "1960s" | "1970s" | "1980s";
  category: "Food & Beverage" | "Automotive & Tech" | "Fashion & Living" | "Entertainment";
  categoryRo: string;
  tagline: string;
  taglineRo: string;
  story: string;
  storyRo: string;
}

const VINTAGE_ADS: VintageAdItem[] = [
  {
    id: "coke-1971",
    src: adCoke1971,
    title: "Coca-Cola: Ice Cold in Snow (1971)",
    titleRo: "Coca-Cola: Rece ca gheața în zăpadă (1971)",
    brand: "Coca-Cola",
    decade: "1970s",
    category: "Food & Beverage",
    categoryRo: "Alimente & Băuturi",
    tagline: "I'd Like to Buy the World a Coke",
    taglineRo: "Mi-ar plăcea să cumpăr o Cola pentru întreaga lume",
    story:
      "A masterpiece of 1970s optimistic multiculturalism. Debuting alongside the iconic Hilltop television commercial, this print print campaign presented Coca-Cola not merely as a soft drink, but as a universal symbol of human connection and peace.",
    storyRo:
      "O capodoperă a multiculturalismului optimizant din anii 1970. Lansată alături de celebra reclamă TV Hilltop, această campanie a prezentat Coca-Cola ca un simbol universal al conexiunii și păcii umane.",
  },
  {
    id: "coke-1988",
    src: adCoke1988,
    title: "Coca-Cola Is It! (1988)",
    titleRo: "Coca-Cola Is It! (1988)",
    brand: "Coca-Cola",
    decade: "1980s",
    category: "Food & Beverage",
    categoryRo: "Alimente & Băuturi",
    tagline: "America's Real Choice",
    taglineRo: "Alegerea reală a Americii",
    story:
      "Following the historic resolution of the 1985 New Coke controversy, Coca-Cola returned with bold, high-contrast 1980s typography asserting its unmatched position as America's flagship beverage.",
    storyRo:
      "După rezolvarea controversatei New Coke din 1985, Coca-Cola a revenit cu o tipografie îndrăzneață afirmându-și poziția inegalabilă ca băutură emblemă a Americii.",
  },
  {
    id: "kfc-1968",
    src: adKfc1968,
    title: "KFC Finger Lickin' Good (1968)",
    titleRo: "KFC Finger Lickin' Good (1968)",
    brand: "Kentucky Fried Chicken",
    decade: "1960s",
    category: "Food & Beverage",
    categoryRo: "Alimente & Băuturi",
    tagline: "Colonel Sanders' Secret 11 Herbs & Spices",
    taglineRo: "Cele 11 ierburi și condimente secrete ale Colonelu-ului Sanders",
    story:
      "Colonel Harland Sanders was one of the early pioneer founders who converted a personal face and white suit into a national fast-food franchise empire, promising homemade Southern comfort across America.",
    storyRo:
      "Colonelul Harland Sanders a fost unul dintre pionierii care și-au transformat chipul și costumul alb într-un imperiu național de franciză fast-food.",
  },
  {
    id: "ford-1987",
    src: adFord1987,
    title: "Ford: Have You Driven a Ford Lately? (1987)",
    titleRo: "Ford: Ai condus un Ford în ultima vreme? (1987)",
    brand: "Ford",
    decade: "1980s",
    category: "Automotive & Tech",
    categoryRo: "Auto & Tehnologie",
    tagline: "Quality is Job 1",
    taglineRo: "Calitatea este Prioritatea #1",
    story:
      "During the 1980s automotive renaissance, Ford introduced aerodynamic design language with the Taurus, backed by a nationwide print campaign celebrating American engineering pride.",
    storyRo:
      "În timpul renașterii automobilistice din anii '80, Ford a introdus un limbaj de design aerodinamic, susținut de o campanie ce celebra mândria inginerească americană.",
  },
  {
    id: "pacman-1980",
    src: adPacMan1980,
    title: "Pac-Man Arcade Phenomenon (1980)",
    titleRo: "Fenomenul Pac-Man Arcade (1980)",
    brand: "Midway / Pac-Man",
    decade: "1980s",
    category: "Entertainment",
    categoryRo: "Divertisment",
    tagline: "The Arcade Craze Sweeping America",
    taglineRo: "Febra sferelor arcade care a cucerit America",
    story:
      "When arcade cabinets arrived in American shopping malls and bowling alleys, Pac-Man transformed video gaming from an obscure hobby into a mainstream pop-culture obsession generating billions in quarter coins.",
    storyRo:
      "Când jocurile arcade au ajuns în mall-uri, Pac-Man a transformat jocurile video dintr-un hobby obscur într-o obsesie pop culture generând miliarde de fise.",
  },
  {
    id: "tiffany-1967",
    src: adTiffany1967,
    title: "Tiffany & Co. Archival Luxury (1967)",
    titleRo: "Tiffany & Co. Lux Arhival (1967)",
    brand: "Tiffany & Co.",
    decade: "1960s",
    category: "Fashion & Living",
    categoryRo: "Modă & Stil de Viață",
    tagline: "The Iconic Blue Box",
    taglineRo: "Celebra cutie albastră",
    story:
      "Established on Fifth Avenue in New York City, Tiffany & Co. defined American high luxury through minimalist, elegant typography and the globally recognized robin's egg blue box.",
    storyRo:
      "Fondată pe Fifth Avenue în New York, Tiffany & Co. a definit luxul american prin tipografie minimalistă și celebra cutie albastru-turcoaz.",
  },
  {
    id: "converse-1968",
    src: adConverse1968,
    title: "Converse All Star Basketball (1968)",
    titleRo: "Bascheții Converse All Star (1968)",
    brand: "Converse",
    decade: "1960s",
    category: "Fashion & Living",
    categoryRo: "Modă & Stil de Viață",
    tagline: "The Official Shoe of American Basketball",
    taglineRo: "Incalțămintea oficială a baschetului american",
    story:
      "Before Nike Air Jordans existed, Chuck Taylor All Stars were worn by virtually every professional and college basketball player in America, transitioning post-war into iconic casual footwear.",
    storyRo:
      "Înainte ca Nike Air Jordan să existe, bascheții Chuck Taylor All Star erau purtați de aproape fiecare jucător de baschet din America.",
  },
  {
    id: "general-foods-1982",
    src: adGeneralFoods1982,
    title: "General Foods International Coffees (1982)",
    titleRo: "Cafeaua Internațională General Foods (1982)",
    brand: "General Foods",
    decade: "1980s",
    category: "Food & Beverage",
    categoryRo: "Alimente & Băuturi",
    tagline: "Celebrate the Moments of Your Life",
    taglineRo: "Celebrează momentele vieții tale",
    story:
      "Pioneering suburban comfort and cozy home coffee breaks long before espresso bars swept American cities, General Foods turned instant flavored coffees into a warm living-room ritual.",
    storyRo:
      "Pionier al confortului suburban cu mult înainte ca cafenelele să cucerească orașele, General Foods a transformat cafeaua cu arome într-un ritual cald de casă.",
  },
  {
    id: "magic-chef-1950",
    src: adMagicChef1950,
    title: "Magic Chef Gas Range (1950)",
    titleRo: "Aragazul cu gaz Magic Chef (1950)",
    brand: "Magic Chef",
    decade: "1950s",
    category: "Fashion & Living",
    categoryRo: "Modă & Stil de Viață",
    tagline: "Postwar Kitchen Convenience",
    taglineRo: "Confortul bucătăriei postbelice",
    story:
      "Post-WWII appliance innovation brought automated gas ranges into American suburban homes, embodying the postwar middle-class ideal of modern domestic leisure.",
    storyRo:
      "Inovațiile în electrocasnice din perioada postbelică au adus aragazele automate în casele suburbane americane, întruchipând idealul de confort al clasei de mijloc.",
  },
];

export function BrandAdsArchive() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [filterDecade, setFilterDecade] = useState<string>("ALL");
  const [activeAd, setActiveAd] = useState<VintageAdItem>(VINTAGE_ADS[0]);

  const filtered = filterDecade === "ALL" 
    ? VINTAGE_ADS 
    : VINTAGE_ADS.filter(ad => ad.decade === filterDecade);

  return (
    <div className="my-16">
      {/* Decade Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {["ALL", "1950s", "1960s", "1970s", "1980s"].map((dec) => {
          const on = filterDecade === dec;
          return (
            <button
              key={dec}
              type="button"
              onClick={() => setFilterDecade(dec)}
              className="px-5 py-2.5 rounded-full font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 border"
              style={{
                cursor: "pointer",
                backgroundColor: on ? "#0C0907" : "rgba(255,255,255,0.4)",
                color: on ? "#F5EDD8" : "#0C0907",
                borderColor: on ? "#0C0907" : "rgba(12,9,7,0.15)",
                transform: on ? "scale(1.04)" : "scale(1)",
                boxShadow: on ? "0 10px 25px rgba(12,9,7,0.12)" : "none",
              }}
            >
              {dec === "ALL" ? (ro ? "Toate deceniile" : "All Decades") : dec}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Showcase */}
      <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-[#0C0907]/10 p-8 md:p-12 shadow-[0_20px_60px_rgba(12,9,7,0.06)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] items-center">
          {/* Ad Image Preview Frame */}
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-[0_15px_45px_rgba(12,9,7,0.12)] border border-[#0C0907]/10 bg-white/90">
            <Image
              src={activeAd.src}
              alt={activeAd.title}
              fill
              className="object-contain p-3"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>

          {/* Ad Details Dossier */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="rounded-full bg-[#E8391B]/10 border border-[#E8391B]/20 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-[#E8391B]">
                  {activeAd.decade}
                </span>
                <span className="font-body text-xs font-semibold text-[#0C0907]/50">
                  {ro ? activeAd.categoryRo : activeAd.category}
                </span>
              </div>

              <h3 className="font-macro-display text-3xl sm:text-4xl font-black text-[#0C0907] leading-tight mb-3">
                {ro ? activeAd.titleRo : activeAd.title}
              </h3>

              <p className="font-editorial text-xl italic text-[#0C0907]/80 leading-relaxed mb-6">
                &ldquo;{ro ? activeAd.taglineRo : activeAd.tagline}&rdquo;
              </p>

              <div className="w-16 h-px bg-[#0C0907]/15 mb-6" />

              <p className="font-editorial text-lg leading-relaxed text-[#0C0907]/85 mb-8">
                {ro ? activeAd.storyRo : activeAd.story}
              </p>
            </div>

            {/* Thumbnail Carousel Selector */}
            <div>
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#0C0907]/45 mb-3">
                {ro ? "SELECTEAZĂ RECLAMĂ DIN ARHIVĂ" : "SELECT ARCHIVAL AD"}
              </p>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {filtered.map((ad) => {
                  const isSel = ad.id === activeAd.id;
                  return (
                    <button
                      key={ad.id}
                      type="button"
                      onClick={() => setActiveAd(ad)}
                      className="relative h-20 w-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300"
                      style={{
                        cursor: "pointer",
                        borderColor: isSel ? "#E8391B" : "rgba(12,9,7,0.1)",
                        transform: isSel ? "scale(1.08)" : "scale(1)",
                        opacity: isSel ? 1 : 0.65,
                      }}
                    >
                      <Image
                        src={ad.src}
                        alt={ad.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
