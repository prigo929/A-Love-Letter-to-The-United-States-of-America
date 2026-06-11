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
  title: "Music Genres & Origins | The American Operating System",
  description: "Explore the regional roots of Jazz, Blues, Rock, and Hip Hop, and their global impact.",
};

export default async function MusicGenresPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const content = {
    pullQuote: isRo
      ? "Jazz, Blues, Rock și Hip-Hop nu au fost impuse prin decrete — au apărut din comunități locale, compete în cluburi mici, prin libertatea expresiei brute."
      : "Jazz, Blues, Rock and Hip-Hop were not dictated by government decree — they were competed into existence in local communities, driven by raw talent and the freedom of expression.",
    body1: isRo
      ? "New Orleans a dat naștere jazzului la intersecția dintre muzica africană, ritmuri caraibiene și armonii europene. Chicagoul a rafinat blues-ul electric. Memphis a inventat rock'n'roll-ul. Bronxul a codificat hip-hop-ul. Aceste genuri nu sunt simple stiluri muzicale — sunt sisteme culturale complete, cu propriul limbaj, estetică și economie."
      : "New Orleans birthed jazz at the intersection of African music, Caribbean rhythms, and European harmonics. Chicago refined electric blues. Memphis invented rock'n'roll. The Bronx codified hip-hop. These genres are not mere musical styles — they are complete cultural systems, each with its own language, aesthetic, and economy.",
    body2: isRo
      ? "Astăzi, muzica americană generează peste 26 miliarde de dolari anual și domină platformele globale de streaming, de la Spotify la Apple Music, reprezentând aproximativ 30% din piața mondială."
      : "Today, American music generates over $26 billion annually and dominates global streaming platforms from Spotify to Apple Music, accounting for roughly 30% of the world market.",
    bandSubtitle: isRo
      ? "De la chitara electrică Fender Stratocaster la sintetizatoarele moderne, inovația muzicală americană a dat glas spiritului rebel al tinereții de pretutindeni."
      : "From the Fender Stratocaster to modern synthesizers, American musical innovation voiced the rebellious spirit of youth worldwide.",
    backLink: isRo ? "← Înapoi la Mâncare și Băuturi" : "← Back to Food & Drinks",
    nextLink: isRo ? "Modă →" : "Fashion →",
  };

  const genres = [
    {
      name: isRo ? "Jazz" : "Jazz",
      origin: "New Orleans, 1900s",
      image: SITE_IMAGES.culture.jazzClub,
      alt: "Live Jazz Band performing on stage with neon sign",
      desc: isRo
        ? "Sinteza improvizată a muzicii africane, ritmurilor caraibiene și armoniilor europene. Prima artă muzicală cu adevărat americană — și primul mare export cultural al Statelor Unite."
        : "The improvised synthesis of African music, Caribbean rhythms, and European harmonics. The first truly American musical art form — and the country's first great cultural export.",
    },
    {
      name: isRo ? "Rock & Roll" : "Rock & Roll",
      origin: "Memphis, 1950s",
      image: SITE_IMAGES.culture.guitarNeon,
      alt: "Electric guitar illuminated by neon lights",
      desc: isRo
        ? "Elvis Presley, Chuck Berry și Little Richard au transformat blues-ul și gospel-ul în ceva complet nou — muzică pentru tineri, cu energie electrică și libertate corporală pe scenă."
        : "Elvis Presley, Chuck Berry, and Little Richard transformed blues and gospel into something entirely new — music for youth, with electric energy and physical freedom on stage.",
    },
    {
      name: "Hip-Hop",
      origin: "South Bronx, 1973",
      image: SITE_IMAGES.culture.concertCrowd,
      alt: "Silhouetted crowd with raised hands at live concert",
      desc: isRo
        ? "DJ Kool Herc a creat first break beat loop în apartamentul surorii sale din Bronx — și a lansat cel mai influent gen muzical al ultimilor 50 de ani, cu o piață globală de peste 10 miliarde dolari."
        : "DJ Kool Herc created the first breakbeat loop in his sister's South Bronx apartment — launching the most influential musical genre of the last 50 years, with a global market exceeding $10 billion.",
    },
  ];

  const albums = [
    { src: SITE_IMAGES.culture.vaultMilesDavis, alt: "Miles Davis — Kind of Blue", label: "Miles Davis · Kind of Blue" },
    { src: SITE_IMAGES.culture.vaultMichaelJackson, alt: "Michael Jackson — Thriller", label: "Michael Jackson · Thriller" },
    { src: SITE_IMAGES.culture.vaultNirvana, alt: "Nirvana — Nevermind", label: "Nirvana · Nevermind" },
    { src: SITE_IMAGES.culture.vaultJohnnyCash, alt: "Johnny Cash — At Folsom Prison", label: "Johnny Cash · At Folsom Prison" },
    { src: SITE_IMAGES.culture.vaultBeachBoys, alt: "The Beach Boys — Pet Sounds", label: "The Beach Boys · Pet Sounds" },
    { src: SITE_IMAGES.culture.vault50Cent, alt: "50 Cent — Get Rich or Die Tryin'", label: "50 Cent · Get Rich or Die Tryin'" },
    { src: SITE_IMAGES.culture.vaultEminem, alt: "Eminem — The Marshall Mathers LP", label: "Eminem · The Marshall Mathers LP" },
  ];

  return (
    <>
      <MacroStyles />
      <CultureStyles />

      <MacroHero
        imageSrc={SITE_IMAGES.culture.jazzClub}
        imageAlt="Live Jazz Band performing on stage with neon sign and red curtains"
        eyebrow={isRo ? "SUNETUL EXPORTULUI · MUZICĂ" : "THE SOUND OF EXPORT · MUSIC"}
        titleLead={isRo ? "GENURI" : "MUSIC"}
        titleAccent={isRo ? "MUZICALE" : "GENRES"}
        description={content.pullQuote}
        stats={[
          { value: "4", label: isRo ? "Genuri Fondatoare Majore" : "Founding Genres" },
          { value: "$26B+", label: isRo ? "Piața Muzicală SUA" : "U.S. Music Market" },
          { value: "30%", label: isRo ? "Din Piața Globală" : "Of Global Market Share" },
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
            <span className="text-white font-medium">{isRo ? "Genuri Muzicale" : "Music Genres"}</span>
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
                { value: "$26B+", label: isRo ? "Industria muzicală americană" : "U.S. music industry revenue" },
                { value: "30%", label: isRo ? "Cota din piața globală" : "Share of global music market" },
                { value: "4", label: isRo ? "Genuri fondatoare majore" : "Major founding genre lineages" },
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

        {/* CREAM: Genre spreads */}
        <section className="relative culture-cream-bg text-[#0C0907] py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
            <div className="text-center mb-20">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "RĂDĂCINI REGIONALE" : "REGIONAL ROOTS"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "GENURILE FONDATOARE" : "FOUNDING GENRES"}</h2>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <div className="space-y-28">
              {genres.map((genre, i) => (
                <div key={i} className={`grid gap-12 md:gap-20 items-center ${i % 2 === 0 ? "md:grid-cols-[3fr_2fr]" : "md:grid-cols-[2fr_3fr] md:[&>*:first-child]:order-last"}`}>
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B] mb-3">{genre.origin}</p>
                    <h3 className="font-macro-display text-5xl md:text-6xl font-black text-[#0C0907] tracking-tight mb-6 leading-none">{genre.name}</h3>
                    <p className="font-editorial text-lg text-[#0C0907]/70 leading-relaxed">{genre.desc}</p>
                  </div>
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-[0_30px_80px_rgb(12,9,7,0.15)]">
                    <Image src={genre.image} alt={genre.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CREAM: Album vault */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-28 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "COLECȚIA ALBUMELOR EMBLEMATICE" : "ICONIC ALBUM COVERS"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "ARHIVA VINILULUI" : "THE VINYL VAULT"}</h2>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {albums.map((album, i) => (
                <div key={i} className="group relative aspect-square rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(12,9,7,0.1)] hover:shadow-[0_20px_50px_rgb(12,9,7,0.2)] hover:-translate-y-1 transition-all duration-500">
                  <Image src={album.src} alt={album.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 33vw, 14vw" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-body text-[9px] font-bold text-white leading-tight">{album.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-16 w-full gradient-cream-to-dark" />

        {/* Dark: stats + guitar band */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/5 rounded-3xl overflow-hidden mb-20">
            {[
              { value: "$26B+", label: isRo ? "Industria muzicală SUA" : "U.S. music industry", note: isRo ? "Venituri anuale totale" : "Total annual revenue" },
              { value: "30%", label: isRo ? "Cota globală" : "Global market share", note: isRo ? "Dominanță mondială" : "Worldwide dominance" },
              { value: "4", label: isRo ? "Genuri fondatoare" : "Founding genre lineages", note: isRo ? "Jazz Blues Rock HipHop" : "Jazz Blues Rock HipHop" },
              { value: "1973", label: isRo ? "An fondare Hip-Hop" : "Hip-Hop birth year", note: isRo ? "South Bronx, New York" : "South Bronx, New York" },
            ].map((s, i) => (
              <div key={i} className={`p-8 flex flex-col gap-2 ${i > 0 ? "border-l border-white/5" : ""}`}>
                <span className="font-macro-display text-4xl md:text-5xl font-black text-[#E8B923]">{s.value}</span>
                <span className="text-sm font-body text-white/75 leading-snug">{s.label}</span>
                <span className="text-xs font-body text-white/45">{s.note}</span>
              </div>
            ))}
          </div>

          <div className="relative rounded-3xl h-72 overflow-hidden flex items-center justify-center mb-20">
            <Image src={SITE_IMAGES.culture.guitarNeon} alt="Electric guitar illuminated by neon lights" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 text-center px-6 max-w-3xl">
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-glory-gold mb-4">
                {isRo ? "INSTRUMENTUL EXPRIMĂRII" : "THE INSTRUMENT OF EXPRESSION"}
              </p>
              <p className="font-editorial italic text-2xl md:text-3xl text-[#F5EDD8] leading-snug">
                &ldquo;{content.bandSubtitle}&rdquo;
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-12 font-body">
            <a href="/culture/food-and-drinks" className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors">{content.backLink}</a>
            <a href="/culture/fashion" className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors">{content.nextLink}</a>
          </div>
        </div>

        <div className="culture-bg">
          <AskAmericaCTA
            locale={locale}
            descriptionEn="Ask the AI Oracle about the birth of hip-hop in the Bronx, New Orleans jazz origins, or the commercial rise of rock and roll."
            descriptionRo="Întreabă Oracolul AI despre nașterea hip-hop-ului în Bronx, originile jazz-ului în New Orleans sau evoluția rock-ului."
          />
        </div>
      </div>
    </>
  );
}
