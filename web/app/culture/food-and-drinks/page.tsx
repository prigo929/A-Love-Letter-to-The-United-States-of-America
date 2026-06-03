import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { CultureStyles } from "@/components/culture/CulturePageComponents";
import { GALLERY_IMAGES } from "@/lib/data/gallery";

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
    
    backLink: isRo ? "← Înapoi la Companii și Branduri" : "← Back to Companies & Brands",
    nextLink: isRo ? "Genuri Muzicale →" : "Music Genres →",
  };

  return (
    <main className="min-h-screen culture-bg pt-32 pb-24 text-[#F5EDD8] font-editorial">
      <CultureStyles />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: breadcrumbCulture, href: "/culture" },
            { label: breadcrumbPage },
          ]}
          className="mb-12 font-sans"
        />

        {/* Hero & Narrative */}
        <section className="mb-20">
          <span className="culture-text-label block mb-4 text-glory-gold">
            {content.eyebrow}
          </span>
          <h1 className="culture-text-hero mb-8 text-[#F5EDD8]">
            {content.title}
          </h1>

          <div className="grid gap-12 lg:grid-cols-3 items-start border-t border-white/10 pt-12">
            <div className="lg:col-span-2 space-y-6">
              <blockquote className="text-2xl font-editorial italic text-[#F5EDD8]/90 leading-relaxed mb-8 pl-6 border-l-2 border-[#E8391B]">
                "{content.pullQuote}"
              </blockquote>
              <p className="font-sans text-base text-[#F5EDD8]/70 leading-relaxed">
                {content.body1}
              </p>
              <p className="font-sans text-base text-[#F5EDD8]/70 leading-relaxed">
                {content.body2}
              </p>
            </div>

            {/* Coke & McDonald's highlight */}
            <div className="culture-glass rounded-2xl p-6 border border-white/5 space-y-6 font-sans">
              <div>
                <div className="text-4xl font-bold text-white tracking-tight">1.9B</div>
                <div className="text-xs text-glory-gold uppercase tracking-wider mt-1">
                  {isRo ? "Porții Zilnice de Coca-Cola" : "Daily Coca-Cola Servings Globally"}
                </div>
              </div>
              <div className="border-t border-white/5 pt-4">
                <div className="text-4xl font-bold text-white tracking-tight">40,000+</div>
                <div className="text-xs text-glory-gold uppercase tracking-wider mt-1">
                  {isRo ? "Locații McDonald's în Lume" : "McDonald's Locations Worldwide"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Showcase Catalogue */}
        {foodImages.length > 0 && (
          <section className="border-t border-white/10 pt-16 mb-20 font-sans">
            <div className="mb-12">
              <h2 className="text-xs font-semibold tracking-wider text-glory-gold uppercase mb-2">
                {content.gridTitle}
              </h2>
              <p className="text-sm text-[#F5EDD8]/60">
                {content.gridSubtitle}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {foodImages.map((img) => (
                <div
                  key={img.id}
                  className="group relative culture-glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-black/40">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">
                        {img.caption}
                      </h3>
                      <p className="text-xs text-[#F5EDD8]/50 italic mb-2">
                        {img.location || "USA"}
                      </p>
                    </div>
                    <p className="text-xs text-[#F5EDD8]/70 leading-relaxed line-clamp-3">
                      {img.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-white/10 pt-12 mt-16 font-sans">
          <a
            href="/culture/companies-brands"
            className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors"
          >
            {content.backLink}
          </a>
          <a
            href="/culture/music-genres"
            className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors"
          >
            {content.nextLink}
          </a>
        </div>
      </div>
    </main>
  );
}
