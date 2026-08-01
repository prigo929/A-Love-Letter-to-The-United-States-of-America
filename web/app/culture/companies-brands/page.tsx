import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PhotoLightboxGrid } from "@/components/shared/PhotoLightboxGrid";
import { Home, ChevronRight } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { MacroStyles, MacroHero } from "@/components/economy/EconomyAnimations";
import { CultureStyles, CultureBrandLogosMarquee } from "@/components/culture/CulturePageComponents";
import { MascotCanon } from "@/components/culture/MascotCanon";
import { BrandAdsArchive } from "@/components/culture/BrandAdsArchive";
import { CompanyBreakthroughShowcase } from "@/components/culture/CompanyBreakthroughShowcase";
import { CorporateLineageTimeline } from "@/components/culture/CorporateLineageTimeline";
import { IconicSlogansGrid } from "@/components/culture/IconicSlogansGrid";
import { FoundersGarageGrid } from "@/components/culture/FoundersGarageGrid";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Companies & Brands | The American Operating System",
  description: "Explore the Logo Empire, how Levi's, Coca-Cola, Nike, and Apple shape global consumer systems.",
};

export default async function CultureCompaniesBrandsPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const content = {
    pullQuote: isRo
      ? "Brandurile americane nu vând doar produse; ele exportă sisteme de utilitate, confort și statut social."
      : "American brands export complete systems of utility, comfort, and social status alongside their physical products.",
    body1: isRo
      ? "De la blugii Levi's purtați pe toate continentele până la sticlele conturate de Coca-Cola și designurile elegante de iPhone, companiile americane definesc interfața fizică a culturii moderne. Aceste logo-uri au depășit granițele comerciale pentru a deveni simboluri ale libertății personale și ale stilului de viață democratizat."
      : "From Levi's blue jeans worn on every continent to contoured bottles of Coca-Cola and the sleek designs of iPhones, American corporations define the physical interface of modern culture. These logos have transcended commerce to become symbols of personal freedom and democratic lifestyle.",
    body2: isRo
      ? "Șapte din primele zece cele mai valoroase branduri din lume sunt americane. Acest lucru reflectă nu doar dimensiunea pieței lor, ci și eficiența rețelelor lor de distribuție și atracția lor estetică universală."
      : "Seven of the top ten most valuable global brands are American. Behind that number is the efficiency of their distribution networks and a universal aesthetic appeal.",
    bandSubtitle: isRo
      ? "Pe Route 66 sau în inima marilor metropole, brandurile americane au conturat peisajul libertății individuale de mișcare și exprimare."
      : "Across Route 66 or in the heart of major metros, American brands shaped the physical texture of individual mobility and personal expression.",
    backLink: isRo ? "← Înapoi la Divertisment" : "← Back to Entertainment",
    nextLink: isRo ? "Mâncare și Băuturi →" : "Food & Drinks →",
  };

  return (
    <>
      <MacroStyles />
      <CultureStyles />

      <MacroHero
        imageSrc={SITE_IMAGES.culture.cocaCola3Bottles}
        imageAlt="Three classic glass Coca-Cola bottles"
        eyebrow={isRo ? "IMPERIUL LOGO-URILOR · BRANDURI" : "THE LOGO EMPIRE · BRANDS"}
        titleLead={isRo ? "BRANDUL" : "THE BRAND"}
        titleAccent={isRo ? "AMERICAN" : "EMPIRE"}
        description={content.pullQuote}
        stats={[
          { value: "7/10", label: isRo ? "Top Branduri Globale" : "Top Global Brands" },
          { value: "1.9B", label: isRo ? "Porții Coca-Cola / Zi" : "Daily Coke Servings" },
          { value: "150+", label: isRo ? "Piețe Nike" : "Nike Markets Reached" },
        ]}
      />

      {/* Dark thesis */}
      <div className="culture-bg text-[#F5EDD8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-24">
          <nav className="flex items-center gap-1.5 font-body text-sm text-white/50 tracking-wide mb-14">
            <Link href="/" className="hover:text-white transition-colors flex items-center"><Home className="h-3.5 w-3.5" /></Link>
            <ChevronRight className="h-3 w-3 opacity-30 shrink-0" />
            <Link href="/culture" className="hover:text-white transition-colors">{isRo ? "Cultură" : "Culture"}</Link>
            <ChevronRight className="h-3 w-3 opacity-30 shrink-0" />
            <span className="text-white font-medium">{isRo ? "Companii și Branduri" : "Companies & Brands"}</span>
          </nav>
          <div className="grid gap-12 lg:grid-cols-3 items-start">
            <div className="lg:col-span-2">
              <blockquote className="font-editorial text-2xl md:text-[2.1rem] italic text-[#F5EDD8]/95 leading-[1.4] mb-8 pl-6 border-l-2 border-[#E8391B]">
                &ldquo;{content.pullQuote}&rdquo;
              </blockquote>
              <p className="font-editorial text-lg text-[#F5EDD8]/70 leading-relaxed mb-4">{content.body1}</p>
              <p className="font-editorial text-lg text-[#F5EDD8]/70 leading-relaxed">{content.body2}</p>
            </div>
            <div className="culture-glass rounded-2xl p-6 border border-white/5 space-y-6 group">
              {[
                { value: "7/10", label: isRo ? "Top branduri globale sunt americane" : "Top 10 global brands are American" },
                { value: "1.9B", label: isRo ? "Produse Coca-Cola consumate zilnic" : "Daily Coca-Cola products consumed" },
                { value: "150+", label: isRo ? "Piețe internaționale Nike" : "Nike international markets" },
              ].map((s, i) => (
                <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="font-macro-display text-4xl font-bold text-white group-hover:text-glory-gold transition-colors duration-300">{s.value}</div>
                  <div className="text-xs text-glory-gold uppercase tracking-wider mt-1 font-body">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dark: Corporate Lineage Timeline (5 Eras) */}
          <div className="mt-24 border-t border-white/5 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-glory-gold font-bold mb-3">
                {isRo ? "EVOLUȚIA ISTORICĂ A CAPITALISMULUI AMERICAN" : "THE HISTORICAL LINEAGE OF AMERICAN CAPITALISM"}
              </p>
              <h2 className="culture-text-hero text-[#F5EDD8] text-4xl sm:text-6xl font-black tracking-tight">
                {isRo ? "CRONOLOGIA LINIILOR DE SÂNGE CORPORATIVE" : "THE CORPORATE LINEAGE TIMELINE"}
              </h2>
              <p className="mx-auto mt-6 max-w-3xl font-editorial text-xl italic text-[#F5EDD8]/80 leading-relaxed">
                {isRo
                  ? "„Cum au evoluat inovațiile corporative americane în 5 ere economice distincte, de la căile ferate și abur în anii 1850 până la rețelele cloud și inteligența artificială generativă.”"
                  : "“How American corporate innovation evolved across 5 distinct economic eras, from 1850s steam and railroads to cloud networks and generative artificial intelligence.”"}
              </p>
              <div className="w-24 h-px bg-glory-gold/30 mx-auto mt-8" />
            </div>
            <CorporateLineageTimeline />
          </div>

          {/* Dark: Interactive Specific Company & Product Breakthrough Showcase */}
          <div className="mt-24 border-t border-white/5 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-glory-gold font-bold mb-3">
                {isRo ? "PIONIERII INDUSTRIEI AMERICANE" : "PIONEERS OF AMERICAN INDUSTRY"}
              </p>
              <h2 className="culture-text-hero text-[#F5EDD8] text-4xl sm:text-6xl font-black tracking-tight">
                {isRo ? "INOVAȚIILE CARE AU SCHIMBAT LUMEA" : "BREAKTHROUGHS THAT RESHAPED THE WORLD"}
              </h2>
              <p className="mx-auto mt-6 max-w-3xl font-editorial text-xl italic text-[#F5EDD8]/80 leading-relaxed">
                {isRo
                  ? "„De la blugii 501 Levi's și sticla conturată Coca-Cola la iPhone-ul Apple și linia de asamblare Ford: poveștile produselor iconice care au redefinit viața de zi cu zi.”"
                  : "“From Levi's 501 blue jeans and Coca-Cola's contoured bottle to Apple's iPhone and Ford's assembly line: the stories of iconic products that redefined daily human life.”"}
              </p>
              <div className="w-24 h-px bg-glory-gold/30 mx-auto mt-8" />
            </div>
            <CompanyBreakthroughShowcase />
          </div>

          {/* Dark: Iconic Commercial Slogans Grid */}
          <div className="mt-24 border-t border-white/5 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-glory-gold font-bold mb-3">
                {isRo ? "SLOGANURILE CARE AU MODELAT LIMBAJUL UMAN" : "SLOGANS THAT SHAPED HUMAN VOCABULARY"}
              </p>
              <h2 className="culture-text-hero text-[#F5EDD8] text-4xl sm:text-6xl font-black tracking-tight">
                {isRo ? "MANIFESTELE CULTURALE ALE BRANDURILOR" : "THE CULTURAL MANIFESTOS OF BRANDS"}
              </h2>
              <p className="mx-auto mt-6 max-w-3xl font-editorial text-xl italic text-[#F5EDD8]/80 leading-relaxed">
                {isRo
                  ? "„Cum au transformat cele mai puternice sloganuri din publicitatea americană deciziile de cumpărare în concepte filosofice și expresii uzuale în limba vorbită pe tot globul.”"
                  : "“How America's most powerful commercial slogans transformed buying choices into philosophical concepts and universal phrases across global speech.”"}
              </p>
              <div className="w-24 h-px bg-glory-gold/30 mx-auto mt-8" />
            </div>
            <IconicSlogansGrid />
          </div>

          {/* Dark: Founders' Garage & Small-Town Roots */}
          <div className="mt-24 border-t border-white/5 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-glory-gold font-bold mb-3">
                {isRo ? "GARAGEURILE FONDATOARE ȘI RĂDĂCINILE PROVINCIALE" : "THE FOUNDERS' GARAGES & SMALL-TOWN ROOTS"}
              </p>
              <h2 className="culture-text-hero text-[#F5EDD8] text-4xl sm:text-6xl font-black tracking-tight">
                {isRo ? "PUNCTUL DE PLECARE AL IMPERIILOR CORPORATIVE" : "WHERE CORPORATE EMPIRES WERE BORN"}
              </h2>
              <p className="mx-auto mt-6 max-w-3xl font-editorial text-xl italic text-[#F5EDD8]/80 leading-relaxed">
                {isRo
                  ? "„De la garajele de suburbie din Los Altos, Palo Alto și Bellevue la un mic magazin 5&10 din Bentonville: poveștile primilor metri pătrați unde au luat naștere giganții de trilioane de dolari.”"
                  : "“From suburban single-car garages in Los Altos, Palo Alto, and Bellevue to a small 5&10 store in Bentonville: the stories of the first square feet where multi-trillion-dollar giants were born.”"}
              </p>
              <div className="w-24 h-px bg-glory-gold/30 mx-auto mt-8" />
            </div>
            <FoundersGarageGrid />
          </div>
        </div>

        <div className="h-16 w-full gradient-dark-to-cream" />

        {/* CREAM: Why Do So Many Things Have Mascots */}
        <section className="relative culture-cream-bg text-[#0C0907] py-24 overflow-hidden">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "BRANDING & IDENTITATE VIZUALĂ" : "BRANDING & VISUAL IDENTITY"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">
                {isRo ? "DE CE AU ATÂTEA LUCRURI MASCOTE" : "WHY DO SO MANY THINGS HAVE MASCOTS"}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-editorial text-lg text-[#0C0907]/60">
                {isRo
                  ? "De la buldogul Yale din 1889 și portretele fondatorilor victorieni, la era de aur a cerealelor TV și creatura хаotică Gritty: cum au devenit mascotele cele mai puternice instrumente de identitate ale brandurilor."
                  : "From the 1889 Yale Bulldog and Victorian founder portraits to the postwar TV cereal boom and Philadelphia's chaotic Gritty: how mascots became America's ultimate branding device."}
              </p>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <MascotCanon />
          </div>
        </section>

        {/* CREAM: Vintage Print Ad Vault */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-24 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "PUBLICITATE & ARHIVĂ VINTAGE" : "VINTAGE PRINT AD ARCHIVE"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">
                {isRo ? "RECLAME CARE AU SCHIMBAT CULTURA" : "ADS THAT SHAPED CULTURE"}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-editorial text-lg text-[#0C0907]/60">
                {isRo
                  ? "Explorează reclamele tipărite istorice de la Coca-Cola, Ford, KFC, Pac-Man și Tiffany & Co. care au definit gustul comercial și nostalgia secolului XX."
                  : "Explore archival print advertising campaigns from Coca-Cola, Ford, KFC, Pac-Man, and Tiffany & Co. that defined 20th-century commercial taste and nostalgia."}
              </p>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <BrandAdsArchive />
          </div>
        </section>

        {/* CREAM: Brand Logos Marquee */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-28 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-20">
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold text-center mb-12">
              {isRo ? "MĂRCI ICONICE ÎN COLECTIV" : "ICONIC CORPORATIONS IN THE COLLECTIVE"}
            </p>
          </div>
          <div className="relative z-10 w-full">
            <CultureBrandLogosMarquee bgVariant="cream" />
          </div>
        </section>

        <div className="h-16 w-full gradient-cream-to-dark" />

        {/* Dark: Route 66 parallax + stats */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/5 rounded-3xl overflow-hidden mb-20">
            {[
              { value: "7/10", label: isRo ? "Top branduri globale" : "Top 10 Global Brands", note: isRo ? "Fabricate în SUA" : "Engineered in the USA" },
              { value: "200+", label: isRo ? "Piețe Coca-Cola" : "Coca-Cola Markets", note: isRo ? "Cea mai globală distribuție" : "Most global distribution ever" },
              { value: "$3.4T", label: isRo ? "Capitalizare Apple" : "Apple Market Cap", note: isRo ? "Cel mai valoros brand" : "Most valuable brand on Earth" },
              { value: "150+", label: isRo ? "Piețe Nike" : "Nike Markets", note: isRo ? "Cultura streetwear globalizată" : "Streetwear culture globalized" },
            ].map((s, i) => (
              <div key={i} className={`p-8 flex flex-col gap-2 ${i > 0 ? "border-l border-white/5" : ""}`}>
                <span className="font-macro-display text-4xl md:text-5xl font-black text-[#E8B923]">{s.value}</span>
                <span className="text-sm font-body text-white/75 leading-snug">{s.label}</span>
                <span className="text-xs font-body text-white/45">{s.note}</span>
              </div>
            ))}
          </div>

          {/* Sports Franchise Economy */}
          <div className="mb-20">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <p className="font-body text-[11px] uppercase tracking-[0.3em] text-white/40 font-bold mb-3">{isRo ? "ECONOMIA FRANCIZELOR SPORTIVE" : "THE SPORTS FRANCHISE ECONOMY"}</p>
                <h2 className="font-macro-display text-3xl md:text-4xl font-black text-white mb-6">{isRo ? "STADIOANELE CA BRAND" : "STADIUMS AS BRAND"}</h2>
                <p className="font-editorial text-base text-[#F5EDD8]/70 leading-relaxed mb-4">
                  {isRo
                    ? "Dallas Cowboys sunt cea mai valoroasă franciză sportivă din lume, 10 miliarde de dolari. New York Yankees valorează 7,1 miliarde de dolari. Las Vegas Raiders au construit un stadion de 2 miliarde de dolari finanțat parțial public. Francizele sportive americane generează un ecosistem de 100+ miliarde de dolari incluzând media, merchandising și publicitate."
                    : "The Dallas Cowboys are the world's most valuable sports franchise at $10 billion. The New York Yankees are worth $7.1 billion. The Las Vegas Raiders built a $2 billion stadium partly publicly funded. American sports franchises generate a $100B+ ecosystem spanning media rights, merchandise, and global advertising."}
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { value: "$10B", label: "Dallas Cowboys" },
                    { value: "$7.1B", label: "NY Yankees" },
                    { value: "$100B+", label: isRo ? "Ecosistem Sport SUA" : "US Sports Ecosystem" },
                  ].map((stat, i) => (
                    <div key={i} className="border border-white/10 rounded-xl p-4 text-center">
                      <p className="font-macro-display text-2xl font-black text-[#E8B923]">{stat.value}</p>
                      <p className="font-body text-[9px] uppercase tracking-wider text-white/50 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden">
                <Image src={SITE_IMAGES.culture.cowboysStadium} alt="AT&T Stadium Dallas Cowboys, world's most valuable sports franchise" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>

          {/* McDonald's Visual */}
          <div className="mb-20">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden">
                <Image src={SITE_IMAGES.culture.mcDonalds} alt="McDonald's restaurant, the Golden Arches empire" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              </div>
              <div>
                <p className="font-body text-[11px] uppercase tracking-[0.3em] text-white/40 font-bold mb-3">{isRo ? "SISTEMUL FAST FOOD" : "THE FAST FOOD SYSTEM"}</p>
                <h2 className="font-macro-display text-3xl md:text-4xl font-black text-white mb-6">{isRo ? "ARCADELE DE AUR" : "THE GOLDEN ARCHES"}</h2>
                <p className="font-editorial text-base text-[#F5EDD8]/70 leading-relaxed">
                  {isRo
                    ? "McDonald's este prezent în 100+ de țări cu 40.000+ de restaurante și servește 69 milioane de clienți zilnic. Modelul de franciză inventat de Ray Kroc în 1954 a redefinit ce înseamnă un restaurant, o experiență de consum și un standard calitativ la scară planetară. Arcadele de aur sunt recunoscute de 88% din locuitorii Pământului."
                    : "McDonald's operates in 100+ countries with 40,000+ restaurants and serves 69 million customers daily. The franchise model invented by Ray Kroc in 1954 redefined what a restaurant, consumer experience, and quality standard means at planetary scale. The Golden Arches are recognized by 88% of the Earth's population."}
                </p>
              </div>
            </div>
          </div>

          {/* Vintage Ad Archive */}
          <div className="mb-20">
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-white/40 font-bold mb-2">{isRo ? "ARHIVA RECLAMELOR VINTAGE" : "VINTAGE AD ARCHIVE"}</p>
            <h2 className="font-macro-display text-3xl md:text-4xl font-black text-white mb-8">{isRo ? "MĂRCI ÎN TIMP" : "BRANDS THROUGH TIME"}</h2>
            <PhotoLightboxGrid
              gridClassName="grid grid-cols-4 md:grid-cols-8 gap-3"
              sizes="12vw"
              photos={[
                { src: SITE_IMAGES.culture.vaultCocaCola1971, alt: "Coca-Cola vintage ad, 1971", caption: "Coca-Cola · 1971", aspect: "3/4" },
                { src: SITE_IMAGES.culture.vaultCocaCola1988, alt: "Coca-Cola vintage ad, 1988", caption: "Coca-Cola · 1988", aspect: "3/4" },
                { src: SITE_IMAGES.culture.vaultCocaCola1989, alt: "Coca-Cola vintage ad, 1989", caption: "Coca-Cola · 1989", aspect: "3/4" },
                { src: SITE_IMAGES.culture.vaultKfc1968, alt: "KFC vintage ad, 1968", caption: "KFC · 1968", aspect: "3/4" },
                { src: SITE_IMAGES.culture.vaultFord1987, alt: "Ford vintage ad, 1987", caption: "Ford · 1987", aspect: "3/4" },
                { src: SITE_IMAGES.culture.vaultWsj1988, alt: "Wall Street Journal ad, 1988", caption: "WSJ · 1988", aspect: "3/4" },
                { src: SITE_IMAGES.culture.vaultGeneralFoods1982, alt: "General Foods vintage ad, 1982", caption: "General Foods · 1982", aspect: "3/4" },
                { src: SITE_IMAGES.culture.vaultUniden1987, alt: "Uniden vintage ad, 1987", caption: "Uniden · 1987", aspect: "3/4" },
              ]}
            />
          </div>

          <div className="relative rounded-3xl h-72 overflow-hidden flex items-center justify-center mb-20">
            <Image src={SITE_IMAGES.culture.route66} alt="Route 66 Sunrise Highway" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 text-center px-6 max-w-3xl">
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-glory-gold mb-4">
                {isRo ? "CALEA LIBERTĂȚII" : "THE HIGHWAY OF FREEDOM"}
              </p>
              <p className="font-editorial italic text-2xl md:text-3xl text-[#F5EDD8] leading-snug">
                &ldquo;{content.bandSubtitle}&rdquo;
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-12 font-body">
            <a href="/culture/entertainment" className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors">{content.backLink}</a>
            <a href="/culture/food-and-drinks" className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors">{content.nextLink}</a>
          </div>
        </div>

        <div className="culture-bg">
          <AskAmericaCTA
            locale={locale}
            descriptionEn="Ask the AI Oracle about Apple's brand value, Nike's cultural history, Coca-Cola's global distribution, or Levi Strauss history."
            descriptionRo="Întreabă Oracolul AI despre valoarea brandului Apple, istoria Nike, logistica Coca-Cola sau blugii Levi's."
          />
        </div>
      </div>
    </>
  );
}
