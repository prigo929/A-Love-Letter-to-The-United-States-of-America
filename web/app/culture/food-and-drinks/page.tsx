import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Home, ChevronRight } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { MacroStyles, MacroHero } from "@/components/economy/EconomyAnimations";
import { CultureStyles } from "@/components/culture/CulturePageComponents";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Food & Drinks | The American Operating System",
  description: "Diners, fast food, and the democratic palate — explore the history and catalogue of American culinary culture.",
};

export default async function FoodAndDrinksPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const content = {
    pullQuote: isRo
      ? "Sistemul culinar american a industrializat consistența și a democratizat accesul la mâncare la scară planetară."
      : "The American culinary system industrialized consistency and democratized access to food on a planetary scale.",
    body1: isRo
      ? "Diner-ul clasic american reprezintă designul spațial al accesului democratic. Deschis oricui, la orice oră, cu cafea fără fund și cabine retro, este o zonă de confort arhitecturală care a transformat comunitatea și conversația în bunuri accesibile. Modelul de franciză (McDonald's, Starbucks, Subway) a transformat prepararea mâncării într-un sistem de asamblare de precizie — o rețetă unică, reprodusă identic în zeci de mii de bucătării de pe toate continentele."
      : "The classic American diner represents the spatial design of democratic access. Open to anyone at any hour, with bottomless coffee and retro booths, it is an architectural comfort zone that commoditized community. The franchise model (McDonald's, Starbucks, Subway) turned food preparation into a precision assembly system — one recipe replicated identically across tens of thousands of kitchens on every continent.",
    body2: isRo
      ? "De la grătarele afumate lent în Texas la barurile speakeasy pre-Prohibiție exportate în Paris sau Tokyo, bucătăria americană combină tradițiile regionale cu scalabilitatea modernă."
      : "From low-and-slow smoked barbecue in Texas to pre-Prohibition speakeasy bars exported to Paris or Tokyo, American food and drink blend regional traditions with modern scalability.",
    bandSubtitle: isRo
      ? "Cu tejghele cromate, lumini neon și cabine din vinilin, diner-ul este interfața democratică a conversației libere din SUA."
      : "With chrome counters, neon glow, and vinyl booths, the diner is the democratic interface of neighborhood conversation across America.",
    backLink: isRo ? "← Înapoi la Companii și Branduri" : "← Back to Companies & Brands",
    nextLink: isRo ? "Genuri Muzicale →" : "Music Genres →",
  };

  const foodPillars = [
    {
      title: isRo ? "Hamburgerul" : "The Hamburger",
      subtitle: isRo ? "Simbolul Democrației Culinare" : "Symbol of Culinary Democracy",
      image: SITE_IMAGES.culture.burger,
      alt: "Classic American Burger",
      desc: isRo
        ? "De la grătarul din curte la McDonald's, hamburgherul american a redefinit ce înseamnă o masă rapidă, satisfăcătoare și universală."
        : "From the backyard grill to McDonald's, the American hamburger redefined what a fast, satisfying, universal meal looks like.",
    },
    {
      title: isRo ? "Fast Food" : "Fast Food Nation",
      subtitle: isRo ? "Franciza care a cucerit lumea" : "The Franchise That Conquered the World",
      image: SITE_IMAGES.culture.mcdMenu,
      alt: "McDonald's Menu with burger, fries, and soda",
      desc: isRo
        ? "McDonald's a creat primul sistem global de preparare a mâncării — consistență perfectă în orice colț al lumii."
        : "McDonald's created the first global food preparation system — perfect consistency in every corner of the world.",
    },
    {
      title: isRo ? "Diner-ul American" : "The American Diner",
      subtitle: isRo ? "Templul Nostalgiei" : "Cathedral of Nostalgia",
      image: SITE_IMAGES.culture.dinerInside,
      alt: "Inside of a classic American diner",
      desc: isRo
        ? "Tejghele cromate, lumini neon și cafea fără fund — diner-ul este tabloul accesului democratic la confort și comunitate."
        : "Chrome counters, neon lights, and bottomless coffee — the diner is the tableau of democratic access to comfort and community.",
    },
  ];

  const drinkPillars = [
    {
      title: "Coca-Cola",
      stat: "1886",
      statLabel: isRo ? "An fondare" : "Founded",
      desc: isRo
        ? "Inventată în Atlanta, Georgia — acum disponibilă în peste 200 de țări, cel mai distribuit produs din lume."
        : "Invented in Atlanta, Georgia — now available in 200+ countries, the most distributed product on Earth.",
    },
    {
      title: isRo ? "Speakeasy & Cocktail" : "Speakeasy & Cocktail",
      stat: "1920s",
      statLabel: isRo ? "Era Prohibiției" : "Prohibition Era",
      desc: isRo
        ? "Barurile clandestine din era Prohibiției au inventat cocktail-ul modern și au exportat cultura mixologiei americane în toată lumea."
        : "Prohibition-era underground bars invented the modern cocktail and exported American mixology culture worldwide.",
    },
    {
      title: isRo ? "Cafeaua Americană" : "American Coffee",
      stat: "$100B+",
      statLabel: isRo ? "Piața anuală" : "Annual Market",
      desc: isRo
        ? "Starbucks a transformat o băutură simplă într-o experiență aspirațională — 35,000 de cafenele pe 6 continente."
        : "Starbucks transformed a simple beverage into an aspirational experience — 35,000 locations across 6 continents.",
    },
  ];

  return (
    <>
      <MacroStyles />
      <CultureStyles />

      <MacroHero
        imageSrc={SITE_IMAGES.culture.melsDriveIn}
        imageAlt="Vintage Classic Cars parked outside Mel's Drive-In retro diner at night"
        eyebrow={isRo ? "GUSTUL DEMOCRATIZAT · CULINAR" : "THE DEMOCRATIC PALATE · CULINARY"}
        titleLead={isRo ? "MÂNCARE" : "FOOD &"}
        titleAccent={isRo ? "ȘI BĂUTURI" : "DRINKS"}
        description={content.pullQuote}
        stats={[
          { value: "1.9B", label: isRo ? "Porții Coca-Cola / Zi" : "Daily Coca-Cola Servings" },
          { value: "40,000+", label: isRo ? "Restaurante McDonald's" : "McDonald's Locations" },
          { value: "$900B", label: isRo ? "Piața Food Service SUA" : "U.S. Food Service Market" },
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
            <span className="text-white font-medium">{isRo ? "Mâncare și Băuturi" : "Food & Drinks"}</span>
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
                { value: "1.9B", label: isRo ? "Porții Coca-Cola servite zilnic" : "Daily Coca-Cola servings worldwide" },
                { value: "40,000+", label: isRo ? "Restaurante McDonald's globale" : "McDonald's locations worldwide" },
                { value: "$900B", label: isRo ? "Piața Food Service SUA" : "U.S. food service market size" },
              ].map((s, i) => (
                <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="font-macro-display text-4xl font-bold text-white group-hover:text-glory-gold transition-colors duration-300">{s.value}</div>
                  <div className="text-xs text-glory-gold uppercase tracking-wider mt-1 font-body">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-16 w-full gradient-dark-to-cream" />

        {/* CREAM: Food pillars */}
        <section className="relative culture-cream-bg text-[#0C0907] py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
            <div className="text-center mb-20">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "ICOANE CULINARE" : "CULINARY ICONS"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "PILONII CULINARI" : "FOOD PILLARS"}</h2>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <div className="space-y-28">
              {foodPillars.map((pillar, i) => (
                <div key={i} className={`grid gap-12 md:gap-20 items-center ${i % 2 === 0 ? "md:grid-cols-[3fr_2fr]" : "md:grid-cols-[2fr_3fr] md:[&>*:first-child]:order-last"}`}>
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B] mb-3">{pillar.subtitle}</p>
                    <h3 className="font-macro-display text-5xl md:text-6xl font-black text-[#0C0907] tracking-tight mb-6 leading-none">{pillar.title}</h3>
                    <p className="font-editorial text-lg text-[#0C0907]/70 leading-relaxed">{pillar.desc}</p>
                  </div>
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-[0_30px_80px_rgb(12,9,7,0.15)]">
                    <Image src={pillar.image} alt={pillar.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CREAM: Drink pillars */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-28 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "BĂUTURI EMBLEMATICE" : "ICONIC DRINKS"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "BĂUTURILE AMERICANE" : "THE DRINKS"}</h2>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {drinkPillars.map((d, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-md rounded-2xl p-8 border border-[#0C0907]/5 shadow-[0_8px_30px_rgb(12,9,7,0.03)] hover:shadow-[0_20px_50px_rgb(12,9,7,0.08)] hover:-translate-y-1.5 transition-all duration-500">
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B] mb-3">{d.title}</p>
                  <p className="font-macro-display text-4xl font-black text-[#0C0907] tracking-tight mb-1">{d.stat}</p>
                  <p className="font-body text-xs font-bold uppercase tracking-wider text-[#0C0907]/45 mb-5">{d.statLabel}</p>
                  <p className="font-editorial text-sm text-[#0C0907]/70 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-16 w-full gradient-cream-to-dark" />

        {/* Dark: stats + diner parallax */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/5 rounded-3xl overflow-hidden mb-20">
            {[
              { value: "1.9B", label: isRo ? "Porții Coca-Cola / zi" : "Daily Coke servings", note: isRo ? "Distribuit global" : "Globally distributed" },
              { value: "40K+", label: isRo ? "Restaurante McDonald's" : "McDonald's locations", note: isRo ? "Pe 6 continente" : "Across 6 continents" },
              { value: "$900B", label: isRo ? "Piața food service" : "Food service market", note: isRo ? "Economia gastro SUA" : "American gastro economy" },
              { value: "35K+", label: isRo ? "Cafenele Starbucks" : "Starbucks cafes", note: isRo ? "Experiența aspirațională" : "Aspirational experience" },
            ].map((s, i) => (
              <div key={i} className={`p-8 flex flex-col gap-2 ${i > 0 ? "border-l border-white/5" : ""}`}>
                <span className="font-macro-display text-4xl md:text-5xl font-black text-[#E8B923]">{s.value}</span>
                <span className="text-sm font-body text-white/75 leading-snug">{s.label}</span>
                <span className="text-xs font-body text-white/45">{s.note}</span>
              </div>
            ))}
          </div>

          <div className="relative rounded-3xl h-72 overflow-hidden flex items-center justify-center mb-20">
            <Image src={SITE_IMAGES.culture.dinerInside} alt="Inside a classic American diner" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 text-center px-6 max-w-3xl">
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-glory-gold mb-4">
                {isRo ? "DESIGNUL SPAȚIAL AL CONFORTULUI" : "THE SPATIAL DESIGN OF COMFORT"}
              </p>
              <p className="font-editorial italic text-2xl md:text-3xl text-[#F5EDD8] leading-snug">
                &ldquo;{content.bandSubtitle}&rdquo;
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-20">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
              <Image src={SITE_IMAGES.culture.speakeasyDesign} alt="1920s Speakeasy Design" fill className="object-cover" sizes="50vw" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="font-body text-xs font-bold uppercase tracking-widest text-glory-gold mb-1">{isRo ? "SPEAKEASY ERA" : "SPEAKEASY ERA"}</p>
                <p className="font-editorial italic text-xl text-white">{isRo ? "1920–1933 · Arta Cocktail-ului" : "1920–1933 · The Art of the Cocktail"}</p>
              </div>
            </div>
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
              <Image src={SITE_IMAGES.culture.cokeGlass} alt="Coca-Cola glass full" fill className="object-cover" sizes="50vw" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="font-body text-xs font-bold uppercase tracking-widest text-glory-gold mb-1">{isRo ? "SIMBOLUL GLOBAL" : "THE GLOBAL SYMBOL"}</p>
                <p className="font-editorial italic text-xl text-white">{isRo ? "Coca-Cola · Creat în 1886, Atlanta" : "Coca-Cola · Created 1886, Atlanta"}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-12 font-body">
            <a href="/culture/companies-brands" className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors">{content.backLink}</a>
            <a href="/culture/music-genres" className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors">{content.nextLink}</a>
          </div>
        </div>

        <div className="culture-bg">
          <AskAmericaCTA
            locale={locale}
            descriptionEn="Ask the AI Oracle about the history of McDonald's, the origins of Coca-Cola, American BBQ traditions, or the classic American diner."
            descriptionRo="Întreabă Oracolul AI despre istoria McDonald's, originile Coca-Cola, tradițiile BBQ americane sau diner-ul clasic."
          />
        </div>
      </div>
    </>
  );
}
