import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import {
  MacroStyles,
  MacroHero,
  CountUp,
  InfrastructureBand,
} from "@/components/economy/EconomyAnimations";
import { CultureStyles, CultureBrandLogosMarquee } from "@/components/culture/CulturePageComponents";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Companies & Brands | The American Operating System",
  description: "Explore the Logo Empire — how Levi's, Coca-Cola, Nike, and Apple shape global consumer systems.",
};

export default async function CultureCompaniesBrandsPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const breadcrumbCulture = isRo ? "Cultură" : "Culture";
  const breadcrumbPage = isRo ? "Companii și Branduri" : "Companies & Brands";

  const content = {
    eyebrow: isRo ? "IMPERIUL LOGO-URILOR · BRANDURI" : "THE LOGO EMPIRE · BRANDS",
    title: isRo ? "ARHITECTURA DE BRAND A VIEȚII MODERNE" : "THE BRAND ARCHITECTURE OF LIFE",
    pullQuote: isRo
      ? "Brandurile americane nu vând doar produse; ele exportă sisteme de utilitate, confort și statut social."
      : "American brands do not just sell products; they export systems of utility, comfort, and social status.",
    body1: isRo
      ? "De la blugii Levi's purtați pe toate continentele până la sticlele conturate de Coca-Cola și designurile elegante de iPhone, companiile americane definesc interfața fizică a culturii moderne. Aceste logo-uri au depășit granițele comerciale pentru a deveni simboluri ale libertății personale și ale stilului de viață democratizat."
      : "From Levi's blue jeans worn on every continent to contoured bottles of Coca-Cola and the sleek designs of iPhones, American corporations define the physical interface of modern culture. These logos have transcended commerce to become symbols of personal freedom and democratic lifestyle.",
    body2: isRo
      ? "Șapte din primele zece cele mai valoroase branduri din lume sunt americane. Acest lucru reflectă nu doar dimensiunea pieței lor, ci și eficiența rețelelor lor de distribuție și atracția lor estetică universală."
      : "Seven of the top ten most valuable global brands are American. This reflects not just the scale of their markets, but the efficiency of their distribution networks and their universal aesthetic appeal.",
    
    brand1Title: "Apple",
    brand1Desc: isRo ? "Inventatorul interfețelor intuitive care conectează lumea." : "The inventor of intuitive interfaces that connect the world.",
    brand2Title: "Nike",
    brand2Desc: isRo ? "Pionierul culturii streetwear și al cultului performanței." : "The pioneer of streetwear culture and the cult of performance.",
    brand3Title: "Coca-Cola",
    brand3Desc: isRo ? "Cel mai recunoscut logo din lume, servit de 1,9 miliarde de ori zilnic." : "The most recognized logo on Earth, served 1.9 billion times daily.",
    brand4Title: "Levi's",
    brand4Desc: isRo ? "Creatorul uniformei globale a modernității: blugii albaștri." : "The creator of modernity's global uniform: blue jeans.",

    statsTitle: isRo ? "FORTĂREAȚA COMMERCIALĂ" : "COMMERCIAL EMPIRE",
    stat1Label: isRo ? "Cele mai Valoroase Branduri" : "Top Valuable Brands",
    stat2Label: isRo ? "Portii Coca-Cola / Zi" : "Daily Coke Servings",
    stat3Label: isRo ? "Tari cu Magazine Nike" : "Nike Markets Reached",

    bandLabel: isRo ? "CALEA LIBERTĂȚII" : "THE HIGHWAY OF FREEDOM",
    bandTitle: isRo ? "Autostrada visului american" : "The Highway of the American Dream",
    bandSubtitle: isRo
      ? "Pe Route 66 sau în inima marilor metropole, brandurile americane au conturat peisajul libertății individuale de mișcare și exprimare."
      : "Across Route 66 or in the heart of major metros, American brands constructed the physical landscape of individual mobility and personal expression.",

    backLink: isRo ? "← Înapoi la Divertisment" : "← Back to Entertainment",
    nextLink: isRo ? "Mâncare și Băuturi →" : "Food & Drinks →",
    oracleDescription: isRo
      ? "Întreabă Oracolul AI despre valoarea brandului Apple, istoria Nike, logistica Coca-Cola sau blugii Levi's."
      : "Ask the AI Oracle about Apple's brand value, Nike's cultural history, Coca-Cola's global distribution, or Levi Strauss history.",
  };

  return (
    <>
      <MacroStyles />
      <CultureStyles />

      {/* Cinematic Hero Banner */}
      <MacroHero
        imageSrc={SITE_IMAGES.culture.classicCar}
        imageAlt="Classic Car reflecting neon signs at Mel's Diner"
        eyebrow={content.eyebrow}
        titleLead={isRo ? "BRANDUL" : "THE BRAND"}
        titleAccent={isRo ? "AMERICAN" : "EMPIRE"}
        description={content.pullQuote}
        stats={[
          {
            value: "7/10",
            label: content.stat1Label,
          },
          {
            value: "1.9B",
            label: content.stat2Label,
          },
          {
            value: "150+",
            label: content.stat3Label,
          },
        ]}
      />

      <div className="bg-[#030405] relative z-10 pb-32 pt-16 font-body text-white">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
          <Breadcrumb
            items={[
              { label: breadcrumbCulture, href: "/culture" },
              { label: breadcrumbPage },
            ]}
            className="mb-8"
          />
        </div>

        {/* Dynamic Count-Up Stats */}
        <section className="py-24 border-t border-b border-white/5 bg-white/[0.01] mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-16 font-semibold">
              {content.statsTitle}
            </p>
            <div className="grid gap-12 sm:grid-cols-3 text-center">
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={70} suffix="%" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Top Branduri Globale" : "Top 10 Global Brands"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "7 din primele 10 cele mai valoroase mărci de pe planetă sunt create în Statele Unite ale Americii."
                    : "7 of the top 10 most valuable brands on the planet are engineered in the United States."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={1900} suffix="M" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Serviri Zilnice Coke" : "Daily Coke Servings"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Produsele Coca-Cola sunt consumate de 1,9 miliarde de ori în fiecare zi în peste 200 de țări."
                    : "Coca-Cola products are consumed 1.9 billion times every single day across over 200 nations."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={150} suffix="+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Piețe Internaționale" : "International Markets"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Brandurile americane conduc distribuția globală, definind standardele de stil urban."
                    : "US brands drive worldwide distribution network systems, defining urban fashion standards."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Essay & Featured Brands */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid gap-12 lg:grid-cols-3 items-start">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-macro-display text-3xl font-bold text-[#E8B923] mb-6">
                {content.title}
              </h2>
              <p className="font-macro-body text-white/80 text-lg md:text-xl leading-relaxed mb-6">
                {content.body1}
              </p>
              <p className="font-macro-body text-white/70 text-base md:text-lg leading-relaxed">
                {content.body2}
              </p>
            </div>

            {/* Featured brands sidebar container */}
            <div className="culture-glass rounded-3xl p-8 border border-white/5 space-y-6 font-sans">
              <h3 className="font-macro-display text-lg font-bold text-glory-gold border-b border-white/10 pb-3 uppercase tracking-wider">
                {isRo ? "Pilonii Logo-ului" : "Logo Pillars"}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-white text-base">{content.brand1Title}</h4>
                  <p className="text-[#F5EDD8]/60 mt-1 text-xs leading-relaxed">{content.brand1Desc}</p>
                </div>
                <div className="border-t border-white/5 pt-4">
                  <h4 className="font-bold text-white text-base">{content.brand2Title}</h4>
                  <p className="text-[#F5EDD8]/60 mt-1 text-xs leading-relaxed">{content.brand2Desc}</p>
                </div>
                <div className="border-t border-white/5 pt-4">
                  <h4 className="font-bold text-white text-base">{content.brand3Title}</h4>
                  <p className="text-[#F5EDD8]/60 mt-1 text-xs leading-relaxed">{content.brand3Desc}</p>
                </div>
                <div className="border-t border-white/5 pt-4">
                  <h4 className="font-bold text-white text-base">{content.brand4Title}</h4>
                  <p className="text-[#F5EDD8]/60 mt-1 text-xs leading-relaxed">{content.brand4Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Band — Route 66 */}
        <InfrastructureBand
          imageSrc={SITE_IMAGES.culture.route66}
          imageAlt="Route 66 Sunrise Highway"
        >
          <div className="relative z-10 text-center md:text-left">
            <span className="macro-eyebrow mb-2 block">
              {content.bandLabel}
            </span>
            <h2 className="macro-section-title text-white mb-4">
              {content.bandTitle}
            </h2>
            <p className="macro-body text-white/70 max-w-3xl leading-relaxed">
              {content.bandSubtitle}
            </p>
          </div>
        </InfrastructureBand>

        {/* Brand Logos Marquee */}
        <section className="py-24 border-t border-b border-white/5 bg-white/[0.01] my-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-16 font-semibold">
              {isRo ? "MARCI ICONICE IN COLECTIV" : "ICONIC CORPORATIONS IN THE COLLECTIVE"}
            </p>
            <CultureBrandLogosMarquee />
          </div>
        </section>

        {/* Navigation */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between border-t border-white/10 pt-12">
            <a
              href="/culture/entertainment"
              className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors font-mono"
            >
              {content.backLink}
            </a>
            <a
              href="/culture/food-and-drinks"
              className="text-xs uppercase tracking-widest text-[#E8B923] hover:text-white transition-colors font-mono"
            >
              {content.nextLink}
            </a>
          </div>
        </div>

        {/* AI Oracle */}
        <div className="mt-32">
          <AskAmericaCTA
            locale={locale}
            descriptionEn={content.oracleDescription}
            descriptionRo={content.oracleDescription}
          />
        </div>
      </div>
    </>
  );
}
