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
  title: "English Language | The American Operating System",
  description: "Explore the linguistic gravity of English as the invisible global standard for code, aviation, science, and commerce.",
};

export default async function EnglishLanguagePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const content = {
    pullQuote: isRo
      ? "Engleza nu a cucerit lumea prin decrete imperiale — a câștigat prin utilitate voluntară, devenind sistemul de operare al logicii globale."
      : "English did not conquer the world through imperial decree — it won through voluntary utility, becoming the operating system of global logic.",
    body1: isRo
      ? "Fiecare linie de cod scrisă în Tokyo, Berlin sau São Paulo conține cuvinte cheie în engleză. 90% din cercetarea științifică internațională este publicată în engleză. ICAO mandatează engleza ca limbă universală a aviației. Toate tranzacțiile financiare majore, toate contractele de drept internațional, toate standardele tehnice globale sunt redactate în engleză."
      : "Every line of code compiled in Tokyo, Berlin, or São Paulo contains English keywords. 90% of international scientific research is published in English. ICAO mandates English as the universal language of aviation. All major financial transactions, international law contracts, and global technical standards are written in English.",
    body2: isRo
      ? "Engleza americană, în special, a adăugat o nouă dimensiune limbii: vocabularul inovației tehnologice (startup, disrupt, app, streaming, cloud) și al culturii pop (blockbuster, jeans, cool, OK) — cuvinte care nu mai au echivalente funcționale în alte limbi."
      : "American English in particular added a new dimension to the language: the vocabulary of technological innovation (startup, disrupt, app, streaming, cloud) and pop culture (blockbuster, jeans, cool, OK) — words that no longer have functional equivalents in other languages.",
    bandSubtitle: isRo
      ? "În spatele fiecărei linii de cod compilate în Tokyo, Berlin sau São Paulo stau cuvintele cheie în engleză — standardul voluntar care scalează eficiența globală."
      : "Behind every line of code compiled in Tokyo, Berlin, or São Paulo lie English keywords — the voluntary standard scaling global efficiency.",
    backLink: isRo ? "← Înapoi la Modă" : "← Back to Fashion",
    nextLink: isRo ? "Prezentare Generală →" : "Overview →",
  };

  const domains = [
    {
      title: isRo ? "Cod & Tehnologie" : "Code & Technology",
      stat: "100%",
      statLabel: isRo ? "Limbaje de programare" : "Programming languages",
      desc: isRo
        ? "Python, JavaScript, C++, SQL — fiecare limbaj de programare major folosește cuvinte cheie în engleză. Nu există alternativă viabilă la scară globală."
        : "Python, JavaScript, C++, SQL — every major programming language uses English keywords. There is no viable alternative at global scale.",
      icon: "{ }",
    },
    {
      title: isRo ? "Știință & Cercetare" : "Science & Research",
      stat: "90%",
      statLabel: isRo ? "Lucrări științifice" : "Scientific papers",
      desc: isRo
        ? "Nouăzeci de procente din publicațiile de cercetare internaționale sunt scrise în engleză — inclusiv cele din China, Germania sau Japonia."
        : "Ninety percent of international research publications are written in English — including those from China, Germany, and Japan.",
      icon: "∑",
    },
    {
      title: isRo ? "Aviație & Spațiu" : "Aviation & Space",
      stat: "100%",
      statLabel: isRo ? "Standard ICAO global" : "ICAO global standard",
      desc: isRo
        ? "ICAO mandatează engleza ca singura limbă acceptată în comunicațiile de control al traficului aerian internațional. Zero excepții."
        : "ICAO mandates English as the sole accepted language in international air traffic control communications. Zero exceptions.",
      icon: "✈",
    },
    {
      title: isRo ? "Finanțe & Drept" : "Finance & Law",
      stat: "$",
      statLabel: isRo ? "Moneda tranzacțiilor" : "Currency of transactions",
      desc: isRo
        ? "NYSE, NASDAQ, FMI, Banca Mondială — toate contractele de drept internațional și tranzacțiile financiare majore sunt redactate în engleză."
        : "NYSE, NASDAQ, IMF, World Bank — all major international law contracts and financial transactions are drafted in English.",
      icon: "⚖",
    },
    {
      title: isRo ? "Internet & Social Media" : "Internet & Social Media",
      stat: "5B+",
      statLabel: isRo ? "Utilizatori internet global" : "Global internet users",
      desc: isRo
        ? "Tweet, Like, Share, Google, App, Streaming, Podcast, Selfie, Hashtag — vocabularul internetului este vocabularul englez american. Platformele americane definesc gramatica vieții digitale globale."
        : "Tweet, Like, Share, Google, App, Streaming, Podcast, Selfie, Hashtag — the vocabulary of the internet is American English vocabulary. US-built platforms define the grammar of global digital life.",
      icon: "#",
    },
    {
      title: isRo ? "Cultură Pop & Hollywood" : "Pop Culture & Hollywood",
      stat: "90%+",
      statLabel: isRo ? "Cota globală box office" : "Global box office share",
      desc: isRo
        ? "Blockbuster, sequel, franchise, cool, OK, jazz, denim — exporturile culturale americane au injectat sute de cuvinte în limbile lumii fără echivalent local. Hollywood a creat primul vocabular vizual global."
        : "Blockbuster, sequel, franchise, cool, OK, jazz, denim — American cultural exports have injected hundreds of words into world languages with no local equivalent. Hollywood built the first global visual vocabulary.",
      icon: "★",
    },
  ];

  const americanWords = [
    { word: "OK", origin: isRo ? "Boston, 1839" : "Boston, 1839" },
    { word: "Cool", origin: isRo ? "Slang jazz, 1930s" : "Jazz slang, 1930s" },
    { word: "Startup", origin: isRo ? "Silicon Valley, 1970s" : "Silicon Valley, 1970s" },
    { word: "Blockbuster", origin: isRo ? "Hollywood, 1942" : "Hollywood, 1942" },
    { word: "Jazz", origin: isRo ? "New Orleans, 1915" : "New Orleans, 1915" },
    { word: "Google", origin: isRo ? "Googleplex, 1998" : "Googleplex, 1998" },
    { word: "Tweet", origin: isRo ? "Twitter, 2006" : "Twitter, 2006" },
    { word: "Like", origin: isRo ? "Facebook, 2009" : "Facebook, 2009" },
    { word: "App", origin: isRo ? "App Store, 2008" : "App Store, 2008" },
    { word: "Streaming", origin: isRo ? "Netflix, 2007" : "Netflix, 2007" },
    { word: "Selfie", origin: isRo ? "Instagram, 2013" : "Instagram, 2013" },
    { word: "Hashtag", origin: isRo ? "Twitter, 2007" : "Twitter, 2007" },
    { word: "Cloud", origin: isRo ? "Amazon AWS, 2006" : "Amazon AWS, 2006" },
    { word: "Podcast", origin: isRo ? "iPod + radio, 2004" : "iPod + broadcast, 2004" },
    { word: "Viral", origin: isRo ? "Internet, 1990s" : "Internet culture, 1990s" },
    { word: "Denim", origin: isRo ? "Levi's, 1873" : "Levi's, 1873" },
  ];

  const magazineCovers = [
    { src: SITE_IMAGES.culture.vaultNatGeo1942, alt: "National Geographic July 1942 — American Flag", label: "Nat Geo 1942" },
    { src: SITE_IMAGES.culture.vaultNatGeo1969, alt: "National Geographic Dec 1969 — Apollo 11 Moon", label: "Nat Geo 1969" },
    { src: SITE_IMAGES.culture.vaultNatGeo1981, alt: "National Geographic Oct 1981 — Space Shuttle", label: "Nat Geo 1981" },
    { src: SITE_IMAGES.culture.vaultNatGeo1984, alt: "National Geographic March 1984 — The Laser", label: "Nat Geo 1984" },
    { src: SITE_IMAGES.culture.vaultNatGeo1996, alt: "National Geographic March 1996 — Emperor Penguins", label: "Nat Geo 1996" },
    { src: SITE_IMAGES.culture.vaultNatGeo1997, alt: "National Geographic April 1997 — Hubble Universe", label: "Nat Geo 1997" },
    { src: SITE_IMAGES.culture.vaultTime911, alt: "TIME Magazine — 9/11 Cover", label: "TIME 9/11" },
    { src: SITE_IMAGES.culture.vaultFortune1931, alt: "Fortune 1931 — Aviation Cover", label: "Fortune 1931" },
  ];

  return (
    <>
      <MacroStyles />
      <CultureStyles />

      <MacroHero
        imageSrc={SITE_IMAGES.culture.timesSquare}
        imageAlt="Times Square NYC at night with illuminated signs"
        eyebrow={isRo ? "GRAVITAȚIA GLOBALĂ · LIMBĂ" : "THE GLOBAL GRAVITY · LANGUAGE"}
        titleLead={isRo ? "GRAVITAȚIE" : "LINGUISTIC"}
        titleAccent={isRo ? "LINGVISTICĂ" : "GRAVITY"}
        description={content.pullQuote}
        stats={[
          { value: "100%", label: isRo ? "Aviație & Cod" : "Aviation & Coding" },
          { value: "90%", label: isRo ? "Publicații Științifice" : "Scientific Papers" },
          { value: "1.5B", label: isRo ? "Vorbitori de Engleză" : "English Speakers" },
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
            <span className="text-white font-medium">{isRo ? "Limba Engleză" : "English Language"}</span>
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
                { value: "100%", label: isRo ? "Aviație internațională (ICAO)" : "International aviation (ICAO standard)" },
                { value: "90%", label: isRo ? "Publicații științifice globale" : "Global scientific publications" },
                { value: "1.5B", label: isRo ? "Vorbitori de engleză în lume" : "English speakers worldwide" },
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

        {/* CREAM: Domain cards */}
        <section className="relative culture-cream-bg text-[#0C0907] py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
            <div className="text-center mb-20">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "DOMENII DE DOMINANȚĂ" : "DOMAINS OF DOMINANCE"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "SISTEMUL GLOBAL" : "THE GLOBAL OS"}</h2>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {domains.map((d, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-md rounded-2xl p-8 border border-[#0C0907]/5 shadow-[0_8px_30px_rgb(12,9,7,0.03)] hover:shadow-[0_20px_50px_rgb(12,9,7,0.08)] hover:-translate-y-1.5 transition-all duration-500">
                  <p className="font-macro-display text-4xl mb-3 text-[#E8391B]">{d.icon}</p>
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B] mb-3">{d.title}</p>
                  <p className="font-macro-display text-4xl font-black text-[#0C0907] tracking-tight mb-1">{d.stat}</p>
                  <p className="font-body text-xs font-bold uppercase tracking-wider text-[#0C0907]/45 mb-5">{d.statLabel}</p>
                  <p className="font-editorial text-sm text-[#0C0907]/70 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CREAM: Magazine vault */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-28 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "ARHIVA PRESEI AMERICANE" : "THE AMERICAN PRESS ARCHIVE"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "PRESA CA PUTERE" : "THE PRESS AS POWER"}</h2>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
              {magazineCovers.map((cover, i) => (
                <div key={i} className="group relative aspect-3/4 rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(12,9,7,0.1)] hover:shadow-[0_20px_50px_rgb(12,9,7,0.2)] hover:-translate-y-1 transition-all duration-500">
                  <Image src={cover.src} alt={cover.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 25vw, 12vw" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-body text-[9px] font-bold text-white leading-tight">{cover.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CREAM: American Words That Conquered The World */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-28 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "EXPORT LEXICAL AMERICAN" : "AMERICAN LEXICAL EXPORT"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "CUVINTE CARE AU CUCERIT LUMEA" : "WORDS THAT CONQUERED THE WORLD"}</h2>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
              <p className="font-editorial text-lg text-[#0C0907]/65 mt-8 max-w-2xl mx-auto">
                {isRo
                  ? "Sute de cuvinte americane nu mai au echivalente funcționale în alte limbi — ele au înlocuit termenul local original în vorbirea cotidiană pe 6 continente."
                  : "Hundreds of American words no longer have functional equivalents in other languages — they replaced the original local term in everyday speech across 6 continents."}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
              {americanWords.map((w, i) => (
                <div key={i} className="bg-white/50 backdrop-blur-md rounded-xl p-4 border border-[#0C0907]/5 text-center hover:shadow-[0_8px_30px_rgb(12,9,7,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <p className="font-macro-display text-2xl md:text-3xl font-black text-[#0C0907] tracking-tight">{w.word}</p>
                  <p className="font-body text-[9px] font-bold uppercase tracking-wider text-[#E8391B] mt-2 leading-tight">{w.origin}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-16 w-full gradient-cream-to-dark" />

        {/* Dark: stats + Times Square parallax */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/5 rounded-3xl overflow-hidden mb-20">
            {[
              { value: "100%", label: isRo ? "Standard aviație ICAO" : "ICAO aviation standard", note: isRo ? "Zero excepții" : "Zero exceptions" },
              { value: "90%", label: isRo ? "Cercetare globală" : "Global scientific research", note: isRo ? "Publicată în engleză" : "Published in English" },
              { value: "5B+", label: isRo ? "Utilizatori internet" : "Internet users worldwide", note: isRo ? "Toate platformele — engleze" : "All platforms — English" },
              { value: "1.5B", label: isRo ? "Vorbitori de engleză" : "English speakers", note: isRo ? "Locutori globali" : "Global speakers" },
            ].map((s, i) => (
              <div key={i} className={`p-8 flex flex-col gap-2 ${i > 0 ? "border-l border-white/5" : ""}`}>
                <span className="font-macro-display text-4xl md:text-5xl font-black text-[#E8B923]">{s.value}</span>
                <span className="text-sm font-body text-white/75 leading-snug">{s.label}</span>
                <span className="text-xs font-body text-white/45">{s.note}</span>
              </div>
            ))}
          </div>

          <div className="relative rounded-3xl h-72 overflow-hidden flex items-center justify-center mb-20">
            <Image src={SITE_IMAGES.culture.timesSquareIconic} alt="Times Square NYC iconic view" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 text-center px-6 max-w-3xl">
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-glory-gold mb-4">
                {isRo ? "SISTEMUL DE OPERARE AL LOGICII" : "THE OPERATING SYSTEM OF LOGIC"}
              </p>
              <p className="font-editorial italic text-2xl md:text-3xl text-[#F5EDD8] leading-snug">
                &ldquo;{content.bandSubtitle}&rdquo;
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-12 font-body">
            <a href="/culture/fashion" className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors">{content.backLink}</a>
            <a href="/culture" className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors">{content.nextLink}</a>
          </div>
        </div>

        <div className="culture-bg">
          <AskAmericaCTA
            locale={locale}
            descriptionEn="Ask the AI Oracle about ICAO aviation language mandates, the origins of English coding syntax, or its role as a global scientific lingua franca."
            descriptionRo="Întreabă Oracolul AI despre standardul ICAO în aviație, terminologia de programare în engleză sau răspândirea limbii ca lingua franca."
          />
        </div>
      </div>
    </>
  );
}
