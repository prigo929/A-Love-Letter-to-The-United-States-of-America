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
  title: "Entertainment & Media | The American Operating System",
  description: "Explore the global attention loop dominated by Netflix, Disney, and YouTube, alongside North America's massive theme park industry.",
};

export default async function CultureEntertainmentPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const content = {
    pullQuote: isRo
      ? "Spre deosebire de televiziunile de stat tradiționale, mașina de divertisment din SUA este alimentată în întregime de cererea globală a consumatorilor."
      : "Unlike traditional state-run media, the U.S. entertainment machine is powered entirely by global consumer demand.",
    body1: isRo
      ? "Netflix, Disney, YouTube și Amazon Prime Video dictează timpul de ecran la nivel mondial. Aceste platforme nu sunt doar servicii de streaming; sunt conducte digitale care transmit valori, estetici și narațiuni către fiecare colț al planetei."
      : "Netflix, Disney, YouTube, and Amazon Prime Video dictate global screen time. These platforms are not just streaming services; they are digital pipelines broadcasting values, aesthetics, and narratives to every corner of the planet.",
    body2: isRo
      ? "O singură companie, cum ar fi Netflix, cheltuiește peste 15 miliarde de dolari anual pe conținut — o cifră care depășește bugetele întregi de cultură ale majorității națiunilor europene adunate la un loc."
      : "A single company like Netflix spends over $15 billion annually on content — a figure that dwarfs the entire cultural budgets of most European nations combined.",
    hollywoodTitle: isRo ? "Hollywood și Mașina de Export Cultural American" : "Hollywood and the American Cultural Export Machine",
    hollywoodText1: isRo
      ? "Exporturile SUA de filme și divertisment depășesc frecvent 90% din cota de piață în multe țări. America de Nord a reprezentat aproximativ 34,2% din piața globală de cinema în 2024."
      : "US exports of film and entertainment media often attain shares in international markets in excess of 90 percent. North America accounted for approximately 34.2% of the global movies and entertainment market in 2024.",
    hollywoodText2: isRo
      ? "Hollywood nu este doar divertisment; este o industrie de export de proprietate intelectuală de sute de miliarde care vinde valori, estetică, limbă și aspirații americane. Universul Cinematic Marvel a strâns singur peste 30 de miliarde de dolari global."
      : "Hollywood is not entertainment; it is a multi-hundred-billion-dollar IP export industry that sells American values, aesthetics, language, and aspirations to the entire world simultaneously. The Marvel Cinematic Universe alone has grossed over $30 billion globally.",
    hollywoodSourceUrl: "https://selectusa.github.io/events/industry-snapshots/media-entertainment-industry-united-states.html",
    themeParkTitle: isRo ? "Complexul Industrial al Parcurilor Tematice" : "The Theme Park Industrial Complex",
    themeParkText1: isRo
      ? "America de Nord domină piața mondială a parcurilor tematice cu o cotă de venituri de 37% în 2025. Este un export industrial de proprietate intelectuală culturală americană — Marvel, Star Wars, Pixar — transpus în realitate fizică."
      : "North America dominates the global theme park market with the largest revenue share of approximately 37% in 2025. It is a massive export industry that builds American cultural IP — Marvel, Star Wars, Pixar — into physical, experiential reality at premium prices.",
    themeParkText2: isRo
      ? "Cele 12 parcuri Disney la nivel global atrag singure peste 34% din vizitatorii mondiali (140 de milioane de vizitatori anual). Florida Centrală singură a înregistrat 75 de milioane de vizitatori în 2024, generând aproape 95 de miliarde de dolari impact economic total."
      : "Disney's 12 parks alone capture over 34% of global theme park attendance, with 140 million visitors annually. Central Florida alone recorded 75 million visitors in 2024 generating nearly $95 billion in total economic impact.",
    backLink: isRo ? "← Înapoi la Sport" : "← Back to Sports",
    nextLink: isRo ? "Companii și Branduri →" : "Companies & Brands →",
  };

  const streamingPlatforms = [
    {
      name: "Netflix",
      stat: "260M+",
      statLabel: isRo ? "Abonați Globali" : "Global Subscribers",
      detail: isRo ? "Conținut în 45 de limbi, 190 de țări. Cel mai mare exportator de narațiuni din lume." : "Content in 45 languages, 190 countries. The world's largest exporter of narrative.",
    },
    {
      name: "YouTube",
      stat: "2.7B",
      statLabel: isRo ? "Utilizatori Lunari" : "Monthly Users",
      detail: isRo ? "Platforma video a omenirii — creată, finanțată și construită în Silicon Valley." : "Humanity's video platform — built, funded, and engineered in Silicon Valley.",
    },
    {
      name: "Disney+",
      stat: "150M+",
      statLabel: isRo ? "Abonați" : "Subscribers",
      detail: isRo ? "Marvel, Star Wars, Pixar, National Geographic — proprietate intelectuală americană globalizată." : "Marvel, Star Wars, Pixar, National Geographic — American IP globalized at scale.",
    },
  ];

  const vault = [
    { src: SITE_IMAGES.culture.vaultGodfather, title: "The Godfather", sub: "1972" },
    { src: SITE_IMAGES.culture.vaultStarWars, title: "Star Wars", sub: "1977" },
    { src: SITE_IMAGES.culture.vaultJaws, title: "Jaws", sub: "1975" },
    { src: SITE_IMAGES.culture.vaultPulpFiction, title: "Pulp Fiction", sub: "1994" },
    { src: SITE_IMAGES.culture.vaultJurassicPark, title: "Jurassic Park", sub: "1993" },
    { src: SITE_IMAGES.culture.vaultInterstellar, title: "Interstellar", sub: "2014" },
    { src: SITE_IMAGES.culture.vaultMilesDavis, title: "Miles Davis", sub: "Kind of Blue" },
    { src: SITE_IMAGES.culture.vaultMichaelJackson, title: "Michael Jackson", sub: "Thriller" },
    { src: SITE_IMAGES.culture.vaultNirvana, title: "Nirvana", sub: "Nevermind" },
    { src: SITE_IMAGES.culture.vaultJohnnyCash, title: "Johnny Cash", sub: "Folsom Prison" },
    { src: SITE_IMAGES.culture.vault50Cent, title: "50 Cent", sub: "Get Rich..." },
    { src: SITE_IMAGES.culture.vaultEminem, title: "Eminem", sub: "MMLP" },
  ];

  return (
    <>
      <MacroStyles />
      <CultureStyles />

      <MacroHero
        videoSrc="/videos/library/Culture/Times Square Aerial.mp4"
        eyebrow={isRo ? "MEDIA · ENTERTAINMENT" : "MEDIA · ENTERTAINMENT"}
        titleLead={isRo ? "PIEȚE GLOBALE" : "GLOBAL MEDIA"}
        titleAccent={isRo ? "DE MEDIA" : "MARKETS"}
        description={content.pullQuote}
        stats={[
          { value: "260M+", label: isRo ? "Abonați Netflix" : "Netflix Subscribers" },
          { value: "$260B", label: isRo ? "Piața Media SUA" : "US Media Market" },
          { value: "190", label: isRo ? "Țări Deservite" : "Countries Reached" },
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
            <span className="text-white font-medium">{isRo ? "Divertisment" : "Entertainment"}</span>
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
                { value: "$15B", label: isRo ? "Buget conținut Netflix" : "Netflix Content Budget" },
                { value: "75M", label: isRo ? "Vizitatori Florida Centrală" : "Central Florida Visitors" },
                { value: "$95B", label: isRo ? "Impact economic Orlando" : "Orlando Economic Impact" },
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

        {/* CREAM: Streaming Platforms */}
        <section className="relative culture-cream-bg text-[#0C0907] py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "DOMINANȚĂ STREAMING" : "STREAMING DOMINANCE"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "PLATFORMELE ATENȚIEI" : "THE ATTENTION PLATFORMS"}</h2>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {streamingPlatforms.map((p, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-md rounded-2xl p-8 border border-[#0C0907]/5 shadow-[0_8px_30px_rgb(12,9,7,0.03)] hover:shadow-[0_20px_50px_rgb(12,9,7,0.08)] hover:-translate-y-1.5 transition-all duration-500">
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B] mb-4">{p.name}</p>
                  <p className="font-macro-display text-5xl font-black text-[#0C0907] tracking-tight mb-1">{p.stat}</p>
                  <p className="font-body text-xs font-bold uppercase tracking-wider text-[#0C0907]/50 mb-5">{p.statLabel}</p>
                  <p className="font-editorial text-sm text-[#0C0907]/70 leading-relaxed">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CREAM: Theme Parks */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-28 md:pb-36 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-24">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold mb-4">
                  {isRo ? "DIVERTISMENT EXPERIENȚIAL" : "EXPERIENTIAL ENTERTAINMENT"}
                </p>
                <h3 className="font-editorial text-3xl md:text-4xl font-bold text-[#0C0907] leading-tight mb-6">{content.themeParkTitle}</h3>
                <p className="font-editorial text-base text-[#0C0907]/70 leading-relaxed mb-4">{content.themeParkText1}</p>
                <p className="font-editorial text-base text-[#0C0907]/70 leading-relaxed">{content.themeParkText2}</p>
              </div>
              <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-[#0C0907]/10 shadow-[0_20px_50px_rgb(12,9,7,0.12)] group">
                <Image src={SITE_IMAGES.culture.disneyWorld} alt="Disney World Cinderella Castle Orlando" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>

        <div className="h-16 w-full gradient-cream-to-dark" />

        {/* Dark: Hollywood stats + vault */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <section className="mb-28">
            <div className="grid gap-10 lg:grid-cols-3 items-start">
              <div className="lg:col-span-2 space-y-5">
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-glory-gold mb-3">
                  {isRo ? "MAȘINA CULTURALĂ" : "THE CULTURE MACHINE"}
                </p>
                <h2 className="font-editorial text-3xl md:text-4xl font-bold text-white leading-tight">{content.hollywoodTitle}</h2>
                <p className="font-editorial text-base text-[#F5EDD8]/70 leading-relaxed">{content.hollywoodText1}</p>
                <p className="font-editorial text-base text-[#F5EDD8]/70 leading-relaxed">{content.hollywoodText2}</p>
                <p className="text-xs font-body text-white/35 mt-2">
                  Source:{" "}
                  <a href={content.hollywoodSourceUrl} target="_blank" rel="noopener noreferrer" className="text-glory-gold hover:underline">
                    SelectUSA
                  </a>
                </p>
              </div>
              <div className="flex flex-col gap-8 justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10">
                {[
                  { value: "90%+", label: isRo ? "Cotă piață internațională" : "International Market Share" },
                  { value: "70%+", label: isRo ? "Venituri box office din export" : "Box Office from Exports" },
                  { value: "$30B+", label: isRo ? "Încasări totale MCU" : "Total MCU Gross" },
                ].map((s, i) => (
                  <div key={i} className="border-t border-white/5 pt-6 first:border-0 first:pt-0">
                    <span className="font-macro-display text-5xl font-black text-[#E8B923] block mb-1">{s.value}</span>
                    <span className="text-sm font-body text-white/75">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Vault */}
          <section className="mb-24">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-glory-gold text-center mb-4 font-semibold">
              {isRo ? "ARHIVA CULTURALĂ" : "THE CULTURE ARCHIVE"}
            </p>
            <h2 className="font-macro-display text-3xl font-bold text-center mb-12 text-white uppercase tracking-tight">
              {isRo ? "Capodopere Globale" : "Global Masterpieces"}
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {vault.map((v, i) => (
                <div key={i} className="relative aspect-3/4 overflow-hidden rounded-xl border border-white/5 group hover:border-glory-gold/40 transition-all duration-300">
                  <Image src={v.src} alt={v.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="16vw" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <span className="font-body text-xs font-bold text-white leading-tight">{v.title}</span>
                    <span className="font-body text-[10px] text-glory-gold mt-1">{v.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex items-center justify-between border-t border-white/10 pt-12 font-body">
            <a href="/culture/sports" className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors">{content.backLink}</a>
            <a href="/culture/companies-brands" className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors">{content.nextLink}</a>
          </div>
        </div>

        <div className="culture-bg">
          <AskAmericaCTA
            locale={locale}
            descriptionEn="Ask the AI Oracle about Netflix's global reach, Disney's theme park empire, Hollywood's cultural exports, or the US media market."
            descriptionRo="Întreabă Oracolul AI despre dominanța Netflix, imperiul parcurilor Disney, exporturile culturale Hollywood sau piața media din SUA."
          />
        </div>
      </div>
    </>
  );
}
