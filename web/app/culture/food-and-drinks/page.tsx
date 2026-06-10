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
import { CultureStyles } from "@/components/culture/CulturePageComponents";
import { GALLERY_IMAGES } from "@/lib/data/gallery";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Food & Drinks | The American Operating System",
  description: "Diners, fast food, and the democratic palate — explore the history and catalogue of American culinary culture.",
};

export default async function FoodAndDrinksPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  // Filter gallery images for food category
  const foodImages = GALLERY_IMAGES.filter((img) => img.category === "Food");

  const breadcrumbCulture = isRo ? "Cultură" : "Culture";
  const breadcrumbPage = isRo ? "Mâncare și Băuturi" : "Food & Drinks";

  const content = {
    eyebrow: isRo ? "GUSTUL DEMOCRATIZAT · CULINAR" : "THE DEMOCRATIC PALATE · CULINARY",
    title: isRo ? "DINER-URI, AFUMĂTOARE ȘI SISTEME" : "DINERS, SMOKE & SYSTEMS",
    pullQuote: isRo
      ? "Sistemul culinar american a industrializat consistența și a democratizat accesul la mâncare la scară planetară."
      : "The American culinary system industrialized consistency and democratized access to food on a planetary scale.",
    body1: isRo
      ? "Diner-ul clasic american reprezintă designul spațial al accesului democratic. Deschis oricui, la orice oră, cu cafea fără fund și cabine retro, este o zonă de confort arhitecturală care a transformat comunitatea și conversația în bunuri accesibile. În paralel, modelul de franciză (McDonald's, Starbucks, Subway) a transformat prepararea mâncării într-un sistem de asamblare de precizie — o rețetă unică, reprodusă identic în zeci de mii de bucătării de pe toate continentele."
      : "The classic American diner represents the spatial design of democratic access. Open to anyone at any hour, featuring bottomless coffee refills and retro booths, it is an architectural comfort zone that commoditized community and conversation. In parallel, the franchise model (McDonald's, Starbucks, Subway) turned food preparation into a precision assembly system — one single recipe, replicated identically in tens of thousands of kitchens across every continent.",
    body2: isRo
      ? "De la grătarele afumate lent în Texas la barurile speakeasy pre-Prohibiție exportate în Paris sau Tokyo, bucătăria americană combină tradițiile regionale cu scalabilitatea modernă."
      : "From low-and-slow smoked barbecue in Texas to pre-Prohibition speakeasy bars exported to Paris or Tokyo, American food and drinks blend regional traditions with modern scalability.",
    
    gridTitle: isRo ? "CATALOGUL PREPARATELOR CLASICE AMERICANE" : "CLASSIC AMERICAN CULINARY CATALOGUE",
    gridSubtitle: isRo
      ? "O galerie vizuală a preparatelor emblematice care definesc cultura alimentară din SUA"
      : "A visual showcase of the defining dishes that shape the U.S. food landscape",
    
    statsTitle: isRo ? "SCALĂ ȘI FRÂNCIZĂ" : "FRANCHISE & DEMOCRACY",
    stat1Label: isRo ? "Porții Zilnice Coca-Cola" : "Daily Coke Servings",
    stat2Label: isRo ? "Restaurante McDonald's" : "McDonald's Locations",
    stat3Label: isRo ? "Cota de Piață Francize" : "Global Franchise Share",

    bandLabel: isRo ? "DEDICAȚIE PENTRU DETALII" : "THE SPATIAL DESIGN OF COMFORT",
    bandTitle: isRo ? "Diner-ul American: Templul Nostalgiei" : "The American Diner: A Cathedral of Nostalgia",
    bandSubtitle: isRo
      ? "Cu tejghele cromate, lumini neon și o atmosferă primitoare, diner-ul este interfața democratică a conversației libere din SUA."
      : "With chrome counters, neon glow, and vinyl booths, the diner is the democratic interface of neighborhood conversation across America.",

    backLink: isRo ? "← Înapoi la Companii și Branduri" : "← Back to Companies & Brands",
    nextLink: isRo ? "Genuri Muzicale →" : "Music Genres →",
    oracleDescription: isRo
      ? "Întreabă Oracolul AI despre istoria burgerilor, barbecue-ul din Texas, diner-urile americane sau sistemul de franciză."
      : "Ask the AI Oracle about the history of hamburgers, Texas barbecue methods, the design of American diners, or the global franchise assembly system.",
  };

  return (
    <>
      <MacroStyles />
      <CultureStyles />

      {/* Cinematic Hero Banner */}
      <MacroHero
        imageSrc={SITE_IMAGES.culture.burgerFries}
        imageAlt="Classic American Burger and Fries close up"
        eyebrow={content.eyebrow}
        titleLead={isRo ? "GUSTUL" : "THE DEMOCRATIC"}
        titleAccent={isRo ? "DEMOCRATIZAT" : "PALATE"}
        description={content.pullQuote}
        stats={[
          {
            value: "1.9B",
            label: content.stat1Label,
          },
          {
            value: "40K+",
            label: content.stat2Label,
          },
          {
            value: "35%+",
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
                  <CountUp value={1900} suffix="M" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Consum Zilnic de Cola" : "Daily Coke Servings"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Subliniază dominanța absolută a rețelei globale de îmbuteliere și distribuție a brandului."
                    : "Highlighting the absolute planetary reach of the brand's bottling and distribution networks."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={40000} suffix="+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Restaurante în Lume" : "McDonald's Locations"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Standardizarea completă a bucătăriei ca un sistem industrial de asamblare precisă."
                    : "The complete standardization of a kitchen layout operating as a precision factory system."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={35} suffix="%" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Cota de Piață a Francizelor" : "Global Franchise Share"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Sistemul comercial din SUA domină modelul de parteneriat comercial de fast-food la nivel mondial."
                    : "US business methods command the global fast-food commercial partnership template."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Essay */}
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

            {/* Quick stats panel */}
            <div className="culture-glass rounded-3xl p-8 border border-white/5 space-y-6 font-sans">
              <h3 className="font-macro-display text-lg font-bold text-glory-gold border-b border-white/10 pb-3 uppercase tracking-wider">
                {isRo ? "Sistemul Alimentar" : "The Food Network"}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-white text-base">{isRo ? "Automatizare și Rețetă" : "Standardization"}</h4>
                  <p className="text-[#F5EDD8]/60 mt-1 text-xs leading-relaxed">
                    {isRo
                      ? "Fiecare ingredient este calibrat, măsurat și transportat folosind logistica de congelare rapidă."
                      : "Every ingredient is calibrated, measured, and transported using flash-freezing logistics."}
                  </p>
                </div>
                <div className="border-t border-white/5 pt-4">
                  <h4 className="font-bold text-white text-base">{isRo ? "Diversitate Regională" : "Regional Smoked Craft"}</h4>
                  <p className="text-[#F5EDD8]/60 mt-1 text-xs leading-relaxed">
                    {isRo
                      ? "Cultura BBQ reprezintă un meșteșug istoric bazat pe lemn local de stejar, mesquite sau hickory și coacere lentă."
                      : "BBQ culture represents historical regional craft relying on local oak, mesquite, or hickory woods and slow cook times."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Band — Diner Inside */}
        <InfrastructureBand
          imageSrc={SITE_IMAGES.culture.dinerInside}
          imageAlt="American Diner Interior"
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

        {/* Visual Showcase Catalogue */}
        {foodImages.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-32">
            <div className="mb-16 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] mb-4 font-semibold">
                {isRo ? "EXPLOREAZĂ SABORURILE" : "EXPLORE THE FLAVORS"}
              </p>
              <h2 className="font-macro-display text-4xl font-bold text-white uppercase tracking-tight mb-4">
                {content.gridTitle}
              </h2>
              <p className="font-macro-body text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
                {content.gridSubtitle}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {foodImages.map((img) => (
                <div
                  key={img.id}
                  className="group relative culture-glass rounded-3xl overflow-hidden border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/30 transition-all duration-500 flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src.src}
                      alt={img.alt}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030405] via-transparent to-transparent" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-macro-display text-lg font-bold text-white mb-1 group-hover:text-[#E8B923] transition-colors">
                        {img.caption}
                      </h3>
                      <p className="text-xs text-[#E8B923] font-mono uppercase tracking-wider mb-3">
                        {img.location || "USA"}
                      </p>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed font-body">
                      {img.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between border-t border-white/10 pt-12">
            <a
              href="/culture/companies-brands"
              className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors font-mono"
            >
              {content.backLink}
            </a>
            <a
              href="/culture/music-genres"
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
