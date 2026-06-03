import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { CultureStyles, CultureBrandLogosMarquee } from "@/components/culture/CulturePageComponents";

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

    backLink: isRo ? "← Înapoi la Divertisment" : "← Back to Entertainment",
    nextLink: isRo ? "Mâncare și Băuturi →" : "Food & Drinks →",
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

        {/* Hero */}
        <section className="mb-20">
          <span className="culture-text-label block mb-4 text-glory-gold">
            {content.eyebrow}
          </span>
          <h1 className="culture-text-hero mb-8 text-[#F5EDD8]">
            {content.title}
          </h1>

          <div className="grid gap-12 lg:grid-cols-3 items-start border-t border-white/10 pt-12 mb-16">
            <div className="lg:col-span-2 space-y-6">
              <blockquote className="text-2xl font-editorial italic text-[#F5EDD8]/90 leading-relaxed mb-8 pl-6 border-l-2 border-[#E8391B]">
                "{content.pullQuote}"
              </blockquote>
              <p className="font-sans text-base text-[#F5EDD8]/70 leading-relaxed">
                {content.body1}
              </p>
              <p className="font-sans text-[#F5EDD8]/70 leading-relaxed text-sm">
                {content.body2}
              </p>
            </div>
            
            {/* Grid of featured brands */}
            <div className="culture-glass rounded-2xl p-6 border border-white/5 space-y-4 font-sans text-sm">
              <div>
                <h4 className="font-bold text-white">{content.brand1Title}</h4>
                <p className="text-[#F5EDD8]/60 mt-1 text-xs">{content.brand1Desc}</p>
              </div>
              <div className="border-t border-white/5 pt-3">
                <h4 className="font-bold text-white">{content.brand2Title}</h4>
                <p className="text-[#F5EDD8]/60 mt-1 text-xs">{content.brand2Desc}</p>
              </div>
              <div className="border-t border-white/5 pt-3">
                <h4 className="font-bold text-white">{content.brand3Title}</h4>
                <p className="text-[#F5EDD8]/60 mt-1 text-xs">{content.brand3Desc}</p>
              </div>
              <div className="border-t border-white/5 pt-3">
                <h4 className="font-bold text-white">{content.brand4Title}</h4>
                <p className="text-[#F5EDD8]/60 mt-1 text-xs">{content.brand4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Logos Marquee */}
        <section className="mb-20">
          <CultureBrandLogosMarquee />
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-white/10 pt-12 mt-16 font-sans">
          <a
            href="/culture/entertainment"
            className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors"
          >
            {content.backLink}
          </a>
          <a
            href="/culture/food-and-drinks"
            className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors"
          >
            {content.nextLink}
          </a>
        </div>
      </div>
    </main>
  );
}
