import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { CultureStyles } from "@/components/culture/CulturePageComponents";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Entertainment & Media | The American Operating System",
  description: "Explore the global attention loop dominated by Netflix, Disney, and YouTube, alongside North America's massive theme park industry.",
};

export default async function CultureEntertainmentPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const breadcrumbCulture = isRo ? "Cultură" : "Culture";
  const breadcrumbPage = isRo ? "Divertisment" : "Entertainment";

  const content = {
    eyebrow: isRo ? "MAȘINA DE ATENȚIE · ENTERTAINMENT" : "THE ATTENTION MACHINE · ENTERTAINMENT",
    title: isRo ? "PIEȚE GLOBALE DE MEDIA ȘI SCREEN TIME" : "GLOBAL MEDIA MARKETS & SCREEN TIME",
    pullQuote: isRo
      ? "Spre deosebire de televiziunile de stat tradiționale, mașina de divertisment din SUA este alimentată în întregime de cererea globală a consumatorilor."
      : "Unlike traditional state-run media, the U.S. entertainment machine is powered entirely by global consumer demand.",
    body1: isRo
      ? "Netflix, Disney, YouTube și Amazon Prime Video dictează timpul de ecran la nivel mondial. Aceste platforme nu sunt doar servicii de streaming; sunt conducte digitale care transmit valori, estetici și narațiuni către fiecare colț al planetei. Ele reprezintă exportul infrastructurii de atenție."
      : "Netflix, Disney, YouTube, and Amazon Prime Video dictate global screen time. These platforms are not just streaming services; they are digital pipelines broadcasting values, aesthetics, and narratives to every corner of the planet. They represent the export of attention infrastructure.",
    body2: isRo
      ? "Această industrie se bazează pe o competiție privată acerbă și pe infuzii masive de capital de risc pentru conținut original. O singură companie, cum ar fi Netflix, cheltuiește peste 15 miliarde de dolari anual pe conținut — o cifră care depășește bugetele întregi de cultură ale majorității națiunilor europene adunate la un loc."
      : "This industry relies on fierce private competition and massive venture funding for original content. A single company like Netflix spends over $15 billion annually on content — a figure that dwarfs the entire cultural budgets of most European nations combined.",
    
    stat1Value: "260M+",
    stat1Label: isRo ? "Abonați Netflix Global" : "Global Netflix Subscribers",
    stat2Value: "190",
    stat2Label: isRo ? "Țări Deservite în 45 Limbi" : "Countries Reached in 45 Languages",
    stat3Value: "$260B",
    stat3Label: isRo ? "Piața de Media din SUA" : "US Media & Entertainment Market Size",

    themeParkLabel: isRo ? "DIVERTISMENT EXPERIENȚIAL" : "EXPERIENTIAL ENTERTAINMENT",
    themeParkTitle: isRo ? "Complexul Industrial al Parcurilor Tematice" : "The Theme Park Industrial Complex",
    themeParkText1: isRo
      ? "America de Nord domină piața mondială a parcurilor tematice cu o cotă de venituri de 37% în 2025. Acesta nu este doar divertisment simplu; este un export industrial extrem de avansat de proprietate intelectuală culturală americană (Marvel, Star Wars, Pixar) transpus în realitate fizică."
      : "North America dominates the global theme park market with a largest revenue share of approximately 37% in 2025. This is not entertainment for its own sake; it is a massive export industry that builds American cultural IP — Marvel, Star Wars, Pixar, and Harry Potter — into physical, experiential reality at premium prices.",
    themeParkText2: isRo
      ? "Cele 12 parcuri Disney la nivel global atrag singure peste 34% din vizitatorii mondiali (140 de milioane de vizitatori anual), în timp ce Universal atrage alte 57 de milioane. În Florida Centrală, 75 de milioane de vizitatori au generat un impact economic de 95 de miliarde de dolari în 2024 — depășind economia turistică a multor țări întregi."
      : "Disney's 12 parks alone capture over 34% of global theme park attendance, with 140 million visitors annually, while Universal's 6 parks draw another 57 million. Central Florida alone recorded 75 million visitors in 2024 generating nearly $95 billion in total economic impact, making a single American metro area's theme park cluster larger than the entire tourism economies of most nations.",

    backLink: isRo ? "← Înapoi la Sport" : "← Back to Sports",
    nextLink: isRo ? "Companii și Branduri →" : "Companies & Brands →",
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
        <section className="mb-24">
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

            {/* Sidebar Stats */}
            <div className="culture-glass rounded-2xl p-6 border border-white/5 space-y-6 font-sans">
              <div className="border-b border-white/5 pb-4">
                <div className="text-4xl font-bold text-white tracking-tight">{content.stat1Value}</div>
                <div className="text-xs text-glory-gold uppercase tracking-wider mt-1">{content.stat1Label}</div>
              </div>
              <div className="border-b border-white/5 pb-4">
                <div className="text-4xl font-bold text-white tracking-tight">{content.stat2Value}</div>
                <div className="text-xs text-glory-gold uppercase tracking-wider mt-1">{content.stat2Label}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white tracking-tight">{content.stat3Value}</div>
                <div className="text-xs text-glory-gold uppercase tracking-wider mt-1">{content.stat3Label}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Experiential Entertainment / Theme Parks */}
        <section className="mb-24 border-t border-white/10 pt-16 font-sans">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold tracking-wider text-glory-gold uppercase">
                {content.themeParkLabel}
              </span>
              <h2 className="text-3xl font-editorial font-bold text-white leading-tight">
                {content.themeParkTitle}
              </h2>
              <p className="text-[#F5EDD8]/70 leading-relaxed text-sm">
                {content.themeParkText1}
              </p>
              <p className="text-[#F5EDD8]/70 leading-relaxed text-sm">
                {content.themeParkText2}
              </p>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/5 bg-black/40">
              <Image
                src={SITE_IMAGES.culture.disneyWorld}
                alt="Disney World Cinderella Castle"
                fill
                className="object-cover hover:scale-102 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-white/10 pt-12 mt-16 font-sans">
          <a
            href="/culture/sports"
            className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors"
          >
            {content.backLink}
          </a>
          <a
            href="/culture/companies-brands"
            className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors"
          >
            {content.nextLink}
          </a>
        </div>
      </div>
    </main>
  );
}
