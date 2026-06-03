import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { CultureStyles } from "@/components/culture/CulturePageComponents";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Fashion & Streetwear | The American Operating System",
  description: "Explore how blue jeans, sneakers, and streetwear became the default global uniform of youth culture.",
};

export default async function CultureFashionPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const breadcrumbCulture = isRo ? "Cultură" : "Culture";
  const breadcrumbPage = isRo ? "Modă" : "Fashion";

  const content = {
    eyebrow: isRo ? "UNIFORMA REBELIUNII · MODĂ" : "THE UNIFORM OF REBELLION · FASHION",
    title: isRo ? "BLUGII ALBAȘTRI, SNEAKERȘII ȘI STREETWEAR-UL" : "BLUE JEANS, SNEAKERS & STREETWEAR",
    pullQuote: isRo
      ? "Moda americană nu a început în saloanele elitiste de design; a început ca îmbrăcăminte de lucru și echipament sportiv, devenind o declarație democratică de rebeliune."
      : "American fashion did not begin in elite design salons; it started as rugged workwear and athletic gear, evolving into a democratic statement of rebellion.",
    body1: isRo
      ? "Blugii albaștri, creați inițial de Levi Strauss în secolul al XIX-lea ca pantaloni durabili pentru mineri și fermieri, au devenit în timp uniforma universală a modernității. Adoptați de tineri în anii 1950 ca simbol al rebeliunii și casualității, denimul a șters diferențele de clasă socială și a devenit cel mai exportat stil vestimentar de pe planetă."
      : "Blue jeans, originally patented by Levi Strauss in the 19th century as durable trousers for miners and laborers, evolved over time into the universal uniform of modernity. Adopted by youth in the 1950s as a symbol of rebellion and casual comfort, denim erased social class distinctions and became the most exported garment style on Earth.",
    body2: isRo
      ? "În paralel, pantofii sport (sneakerșii) au evoluat de la terenul de sport la cultură urbană și modă de lux. Branduri precum Nike și Converse au condus această schimbare, transformând funcționalitatea atletică într-un limbaj al identității și al aspirațiilor de zi cu zi."
      : "In parallel, athletic sneakers evolved from the sports field to urban culture and luxury high fashion. Brands like Nike and Converse drove this shift, transforming athletic functionality into a language of personal identity and everyday aspirations.",
    
    section1Title: isRo ? "Denimul ca Declarație" : "Denim as a Statement",
    section1Text: isRo
      ? "De la Hollywood la străzile din Tokyo, blugii reprezintă confortul democratizat. Un produs industrial, ieftin și rezistent, care a cucerit lumea prin simplitatea sa."
      : "From Hollywood stars to the streets of Tokyo, jeans represent democratized comfort. A mass-produced, inexpensive, and rugged garment that captured the world through its sheer utility and simplicity.",

    section2Title: isRo ? "Cultura Sneakerșilor" : "The Sneaker Cult",
    section2Text: isRo
      ? "Air Jordan, Chuck Taylor și sneakerșii moderni au redefinit luxul urban. Pantofii concepuți pentru baschet au devenit moneda de schimb a culturii pop și a streetwear-ului global."
      : "Air Jordans, Chuck Taylors, and modern sneakers redefined urban luxury. Shoes designed for basketball became the primary currency of pop culture and global streetwear fashion.",

    backLink: isRo ? "← Înapoi la Genuri Muzicale" : "← Back to Music Genres",
    nextLink: isRo ? "Limba Engleză →" : "English Language →",
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

        {/* Hero & Editorial */}
        <section className="mb-20">
          <span className="culture-text-label block mb-4 text-glory-gold">
            {content.eyebrow}
          </span>
          <h1 className="culture-text-hero mb-8 text-[#F5EDD8]">
            {content.title}
          </h1>

          <div className="grid gap-12 lg:grid-cols-2 items-center border-t border-white/10 pt-12">
            <div className="space-y-6">
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
            
            <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-white/5 bg-black/40">
              <Image
                src={SITE_IMAGES.culture.fashionJeansSneakers}
                alt="Blue Jeans and White Sneakers"
                fill
                className="object-cover hover:scale-102 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Detail Cards */}
        <section className="grid gap-8 md:grid-cols-2 mb-20 font-sans">
          <div className="culture-glass rounded-2xl p-8 border border-white/5 space-y-4">
            <h3 className="text-xl font-bold text-white">
              {content.section1Title}
            </h3>
            <p className="text-sm text-[#F5EDD8]/70 leading-relaxed">
              {content.section1Text}
            </p>
          </div>
          <div className="culture-glass rounded-2xl p-8 border border-white/5 space-y-4">
            <h3 className="text-xl font-bold text-white">
              {content.section2Title}
            </h3>
            <p className="text-sm text-[#F5EDD8]/70 leading-relaxed">
              {content.section2Text}
            </p>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-white/10 pt-12 mt-16 font-sans">
          <a
            href="/culture/music-genres"
            className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors"
          >
            {content.backLink}
          </a>
          <a
            href="/culture/english-language"
            className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors"
          >
            {content.nextLink}
          </a>
        </div>
      </div>
    </main>
  );
}
