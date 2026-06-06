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
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Entertainment & Media | The American Operating System",
  description:
    "Explore the global attention loop dominated by Netflix, Disney, and YouTube, alongside North America's massive theme park industry.",
};

export default async function CultureEntertainmentPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const breadcrumbCulture = isRo ? "Cultură" : "Culture";
  const breadcrumbPage = isRo ? "Divertisment" : "Entertainment";

  const content = {
    eyebrow: isRo
      ? "MAȘINA DE ATENȚIE · ENTERTAINMENT"
      : "THE ATTENTION MACHINE · ENTERTAINMENT",
    title: isRo
      ? "PIEȚE GLOBALE DE MEDIA ȘI SCREEN TIME"
      : "GLOBAL MEDIA MARKETS & SCREEN TIME",
    pullQuote: isRo
      ? "Spre deosebire de televiziunile de stat tradiționale, mașina de divertisment din SUA este alimentată în întregime de cererea globală a consumatorilor."
      : "Unlike traditional state-run media, the U.S. entertainment machine is powered entirely by global consumer demand.",
    body1: isRo
      ? "Netflix, Disney, YouTube și Amazon Prime Video dictează timpul de ecran la nivel mondial. Aceste platforme nu sunt doar servicii de streaming; sunt conducte digitale care transmit valori, estetici și narațiuni către fiecare colț al planetei."
      : "Netflix, Disney, YouTube, and Amazon Prime Video dictate global screen time. These platforms are not just streaming services; they are digital pipelines broadcasting values, aesthetics, and narratives to every corner of the planet. They represent the export of attention infrastructure.",
    body2: isRo
      ? "Această industrie se bazează pe o competiție privată acerbă și pe infuzii masive de capital de risc pentru conținut original. O singură companie, cum ar fi Netflix, cheltuiește peste 15 miliarde de dolari anual pe conținut — o cifră care depășește bugetele întregi de cultură ale majorității națiunilor europene adunate la un loc."
      : "This industry relies on fierce private competition and massive venture funding for original content. A single company like Netflix spends over $15 billion annually on content — a figure that dwarfs the entire cultural budgets of most European nations combined.",

    themeParkLabel: isRo
      ? "DIVERTISMENT EXPERIENȚIAL"
      : "EXPERIENTIAL ENTERTAINMENT",
    themeParkTitle: isRo
      ? "Complexul Industrial al Parcurilor Tematice"
      : "The Theme Park Industrial Complex",
    themeParkText1: isRo
      ? "America de Nord domină piața mondială a parcurilor tematice cu o cotă de venituri de 37% în 2025. Acesta nu este doar divertisment simplu; este un export industrial de proprietate intelectuală culturală americană (Marvel, Star Wars, Pixar) transpus în realitate fizică."
      : "North America dominates the global theme park market with the largest revenue share of approximately 37% in 2025. This is not entertainment for its own sake; it is a massive export industry that builds American cultural IP — Marvel, Star Wars, Pixar — into physical, experiential reality at premium prices.",
    themeParkText2: isRo
      ? "Cele 12 parcuri Disney la nivel global atrag singure peste 34% din vizitatorii mondiali (140 de milioane de vizitatori anual). În Florida Centrală, 75 de milioane de vizitatori au generat un impact economic de 95 de miliarde de dolari în 2024 — depășind economia turistică a multor țări întregi."
      : "Disney's 12 parks alone capture over 34% of global theme park attendance, with 140 million visitors annually. Central Florida alone recorded 75 million visitors in 2024 generating nearly $95 billion in total economic impact, making a single American metro area's theme park cluster larger than the entire tourism economies of most nations.",

    hollywoodLabel: isRo ? "MAȘINA CULTURALĂ" : "THE CULTURE MACHINE",
    hollywoodTitle: isRo
      ? "Hollywood și Mașina de Export Cultural American"
      : "Hollywood and the American Cultural Export Machine",
    hollywoodText1: isRo
      ? "Exporturile SUA de filme și divertisment depășesc frecvent 90% din cota de piață în multe țări, datorită interesului global ridicat. America de Nord a reprezentat aproximativ 34,2% din piața globală de cinema în 2024, SUA conducând cu peste 2,3 miliarde de bilete vândute și 390 de milioane de utilizatori digitali activi."
      : "US exports of film and entertainment media often attain shares in international markets in excess of 90 percent due to high global interest in US filmed entertainment. North America accounted for approximately 34.2% of the global movies and entertainment market in 2024, with the US leading with over 2.3 billion cinema admissions and 390 million active digital users.",
    hollywoodText2: isRo
      ? "Platforme americane precum Netflix, Disney+, Amazon Prime și HBO Max domină streamingul global. Hollywood nu este doar divertisment; este o industrie de export de proprietate intelectuală de sute de miliarde care vinde valori, estetică, limbă și aspirații americane. Piețele internaționale generează peste 70% din încasările de box office, ceea ce înseamnă că studiourile americane colectează practic o taxă pe timpul de recreere al întregii lumi. Universul Cinematic Marvel a strâns singur peste 30 de miliarde de dolari global. Nicio altă țară nu se apropie de această scară de penetrare sistematică."
      : "Netflix, Disney+, Amazon Prime Video, and HBO Max — all American platforms — collectively dominate global streaming in virtually every market they operate in. The deeper point is that Hollywood is not entertainment; it is a multi-hundred-billion-dollar IP export industry that sells American values, aesthetics, language, and aspirations to the entire world simultaneously. International markets now account for over 70% of Hollywood's box office revenue, meaning American studios are essentially taxing the world's leisure time. The Marvel Cinematic Universe alone has grossed over $30 billion globally. No other country's culture industry comes close to this scale of systematic global penetration — not Bollywood, not K-pop, not British television, despite their genuine quality and influence.",
    hollywoodSource: "SelectUSA snapshot",
    hollywoodSourceUrl: "https://selectusa.github.io/events/industry-snapshots/media-entertainment-industry-united-states.html",

    backLink: isRo ? "← Înapoi la Sport" : "← Back to Sports",
    nextLink: isRo ? "Companii și Branduri →" : "Companies & Brands →",
  };

  const streamingPlatforms = [
    {
      name: "Netflix",
      stat: "260M+",
      statLabel: isRo ? "Abonați Globali" : "Global Subscribers",
      detail: isRo
        ? "Conținut în 45 de limbi, 190 de țări. Cel mai mare exportator de narațiuni din lume."
        : "Content in 45 languages, 190 countries. The world's largest exporter of narrative.",
    },
    {
      name: "YouTube",
      stat: "2.7B",
      statLabel: isRo ? "Utilizatori Lunari" : "Monthly Users",
      detail: isRo
        ? "Platforma video a omenirii — creată, finanțată și construită în Silicon Valley."
        : "Humanity's video platform — built, funded, and engineered in Silicon Valley.",
    },
    {
      name: "Disney+",
      stat: "150M+",
      statLabel: isRo ? "Abonați" : "Subscribers",
      detail: isRo
        ? "Marvel, Star Wars, Pixar, National Geographic — proprietate intelectuală americană globalizată."
        : "Marvel, Star Wars, Pixar, National Geographic — American IP globalized at scale.",
    },
  ];

  return (
    <>
      <MacroStyles />

      {/* Cinematic Hero — Times Square Aerial */}
      <MacroHero
        videoSrc="/videos/library/Culture/Times Square Aerial.mp4"
        eyebrow={isRo ? "MEDIA · ENTERTAINMENT" : "MEDIA · ENTERTAINMENT"}
        titleLead={isRo ? "PIEȚE GLOBALE" : "GLOBAL MEDIA"}
        titleAccent={isRo ? "DE MEDIA" : "MARKETS"}
        description={content.pullQuote}
        stats={[
          {
            value: "260M+",
            label: isRo ? "Abonați Netflix" : "Netflix Subscribers",
          },
          {
            value: "$260B",
            label: isRo ? "Piața Media SUA" : "US Media Market",
          },
          {
            value: "190",
            label: isRo ? "Țări Deservite" : "Countries Reached",
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

        {/* Streaming Dominance Stats */}
        <section className="py-24 border-t border-b border-white/5 bg-white/[0.01] mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-16 font-semibold">
              {isRo ? "DOMINANȚĂ STREAMING" : "STREAMING DOMINANCE"}
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {streamingPlatforms.map((platform, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-[#E8B923] mb-4">
                    {platform.name}
                  </p>
                  <p className="font-macro-display text-4xl md:text-5xl text-white font-black tracking-tight mb-2">
                    {platform.stat}
                  </p>
                  <p className="font-mono text-xs text-[#E8B923] uppercase tracking-wider mb-4">
                    {platform.statLabel}
                  </p>
                  <p className="text-sm text-white/50 leading-relaxed font-body">
                    {platform.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Editorial Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid gap-12 lg:grid-cols-5 items-start">
            <div className="lg:col-span-3 space-y-6">
              <span className="macro-eyebrow">{content.eyebrow}</span>
              <h2 className="macro-section-title text-white text-3xl md:text-5xl">
                {content.title}
              </h2>
              <blockquote className="text-xl md:text-2xl font-display italic text-white/90 leading-relaxed pl-6 border-l-2 border-[#E8B923] mt-4">
                &ldquo;{content.pullQuote}&rdquo;
              </blockquote>
            </div>
            <div className="lg:col-span-2 space-y-6 pt-2">
              <p className="macro-body text-white/70">{content.body1}</p>
              <p className="macro-body text-white/70">{content.body2}</p>
            </div>
          </div>
        </section>

        {/* Dynamic Count-Up Stats */}
        <section className="py-24 border-t border-b border-white/5 bg-white/[0.01] mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-16 font-semibold">
              {isRo ? "INFLUENȚĂ GLOBALĂ" : "GLOBAL FOOTPRINT"}
            </p>
            <div className="grid gap-12 sm:grid-cols-3 text-center">
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  $<CountUp value={15} suffix="B" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Netflix — Buget Conținut" : "Netflix Content Budget"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "O singură companie americană cheltuiește mai mult pe conținut decât bugetele culturale ale întregii Europe combinate."
                    : "A single American company spends more on content than the cultural budgets of all of Europe combined."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={75} suffix="M" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Vizitatori Florida Centrală" : "Central Florida Visitors"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Un singur cluster de parcuri tematice americane depășește turismul anual al majorității națiunilor."
                    : "A single American theme park cluster out-draws the annual tourism of most nations."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  $<CountUp value={95} suffix="B" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Impact Economic Orlando" : "Orlando Economic Impact"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Impactul economic generat de parcurile tematice din Florida Centrală în 2024."
                    : "Total economic impact generated by Central Florida's theme park cluster in 2024."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Band — Times Square / Hollywood */}
        <InfrastructureBand
          imageSrc={SITE_IMAGES.culture.timesSquareIconic}
          imageAlt="Times Square New York City"
        >
          <div className="relative z-10 text-center md:text-left">
            <span className="macro-eyebrow mb-2 block">
              {content.themeParkLabel}
            </span>
            <h2 className="macro-section-title text-white mb-4">
              {content.themeParkTitle}
            </h2>
            <p className="macro-body text-white/70 max-w-3xl leading-relaxed">
              {content.themeParkText1}
            </p>
          </div>
        </InfrastructureBand>

        {/* Theme Parks Editorial */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <span className="macro-eyebrow">{content.themeParkLabel}</span>
              <h2 className="macro-section-title text-white text-3xl md:text-4xl">
                {content.themeParkTitle}
              </h2>
              <p className="macro-body text-white/70">{content.themeParkText1}</p>
              <p className="macro-body text-white/70">{content.themeParkText2}</p>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SITE_IMAGES.culture.disneyWorld}
                alt="Disney World Cinderella Castle Orlando"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {/* Hollywood / Cinema Images */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-12 font-semibold">
            {isRo ? "FABRICAT ÎN HOLLYWOOD" : "MADE IN HOLLYWOOD"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/5 md:col-span-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SITE_IMAGES.culture.hollywoodSign}
                alt="Hollywood Sign at Sunset"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SITE_IMAGES.culture.chicagoTheatre}
                alt="Chicago Theatre Marquee"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

        {/* Hollywood Export Machine Editorial */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 md:p-12">
            <div className="grid gap-8 lg:grid-cols-3 items-start">
              <div className="lg:col-span-2 space-y-6">
                <span className="macro-eyebrow">{content.hollywoodLabel}</span>
                <h2 className="macro-section-title text-white text-3xl md:text-4xl">
                  {content.hollywoodTitle}
                </h2>
                <p className="macro-body text-white/70 leading-relaxed">{content.hollywoodText1}</p>
                <p className="macro-body text-white/70 leading-relaxed">{content.hollywoodText2}</p>
              </div>

              {/* Stats column */}
              <div className="grid gap-8 border-l border-white/10 pl-8 h-full justify-center">
                <div>
                  <p className="font-macro-display text-5xl font-bold text-[#E8B923] tracking-tight mb-1">
                    90%+
                  </p>
                  <p className="font-mono text-xs text-white/50 uppercase tracking-wider">
                    {isRo ? "Cotă de Piață Internațională" : "International Market Share"}
                  </p>
                </div>
                <div>
                  <p className="font-macro-display text-5xl font-bold text-white tracking-tight mb-1">
                    70%+
                  </p>
                  <p className="font-mono text-xs text-white/50 uppercase tracking-wider">
                    {isRo ? "Venituri Box Office din Export" : "Box Office from Exports"}
                  </p>
                </div>
                <div>
                  <p className="font-macro-display text-5xl font-bold text-white tracking-tight mb-1">
                    $30B+
                  </p>
                  <p className="font-mono text-xs text-white/50 uppercase tracking-wider">
                    {isRo ? "Încasări Totale MCU" : "Total MCU Gross"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-8 text-xs text-white/40 font-mono">
              <span>Source: {content.hollywoodSource}</span>
              <a 
                href={content.hollywoodSourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-[#E8B923] hover:underline"
              >
                {isRo ? "Vezi datele SelectUSA" : "View SelectUSA Data"}
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* Culture Archive Vault */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-4 font-semibold">
            {isRo ? "ARHIVA CULTURALĂ" : "THE CULTURE ARCHIVE"}
          </p>
          <h2 className="font-macro-display text-4xl font-bold text-center mb-12 text-white uppercase tracking-tight">
            {isRo ? "Capodopere Globale: Cinema și Muzică" : "Global Masterpieces: Cinema & Music"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
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
            ].map((vault, i) => (
              <div
                key={i}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01] group hover:border-[#E8B923]/40 transition-all duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={vault.src}
                  alt={vault.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-sm font-bold text-white leading-tight">{vault.title}</span>
                  <span className="text-xs text-[#E8B923] font-mono mt-1 leading-none">{vault.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between border-t border-white/10 pt-12">
            <a
              href="/culture/sports"
              className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors font-mono"
            >
              {content.backLink}
            </a>
            <a
              href="/culture/companies-brands"
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
            descriptionEn="Ask the AI Oracle about Netflix's global reach, Disney's theme park empire, Hollywood's cultural exports, or the US media market."
            descriptionRo="Întreabă Oracolul AI despre dominanța Netflix, imperiul parcurilor Disney, exporturile culturale Hollywood sau piața media din SUA."
          />
        </div>
      </div>
    </>
  );
}
