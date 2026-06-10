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
import { getCultureMusicGenres } from "@/lib/data/culture-data";
import { GALLERY_IMAGES } from "@/lib/data/gallery";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Music Genres & Origins | The American Operating System",
  description: "Explore the regional roots of Jazz, Blues, Rock, and Hip Hop, and their global impact.",
};

export default async function MusicGenresPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const genres = getCultureMusicGenres(locale);

  // Filter gallery images for album covers/music category
  const musicImages = GALLERY_IMAGES.filter(
    (img) => img.category === "Music" && img.path.includes("Album Covers")
  );

  const breadcrumbCulture = isRo ? "Cultură" : "Culture";
  const breadcrumbPage = isRo ? "Genuri Muzicale" : "Music Genres";

  const content = {
    eyebrow: isRo ? "SUNETUL EXPORTULUI · MUZICĂ" : "THE SOUND OF EXPORT · MUSIC",
    title: isRo ? "RĂDĂCINI REGIONALE ȘI RITMURI GLOBALE" : "REGIONAL ROOTS & GLOBAL BEATS",
    introText: isRo
      ? "Jazz, Blues, Rock 'n' Roll și Hip-Hop nu au fost impuse prin decrete guvernamentale. Au fost create în comunități locale, pe străzi și în cluburi mici, prin competiția liberă a talentelor și dorința de exprimare artistică."
      : "Jazz, Blues, Rock 'n' Roll, and Hip-Hop were not dictated by government decrees. They were competed into existence in local communities, streets, and small clubs, driven by raw talent and the freedom of self-expression.",
    
    albumsTitle: isRo ? "COLECȚIE DE ALBUME EMBLEMATICE" : "ICONIC ALBUM COVERS COLLECTION",
    albumsSubtitle: isRo
      ? "Arta grafică a vinilurilor și albumelor care au redefinit sunetul global"
      : "Visual artwork of records and releases that reshaped the global soundscape",

    statsTitle: isRo ? "SUNETUL PLANETAR IN CIFRE" : "THE PLANETARY SOUNDSCAPE BY THE NUMBERS",
    stat1Label: isRo ? "Genuri Muzicale Majore" : "Major Global Genres",
    stat2Label: isRo ? "Cota Streaming Hip-Hop" : "Hip-Hop Global Streams",
    stat3Label: isRo ? "Valoare Piata SUA" : "US Music Market Size",

    bandLabel: isRo ? "INSTRUMENTUL EXPRIMĂRII" : "THE INSTRUMENT OF INDIVIDUAL EXPRESSION",
    bandTitle: isRo ? "Ghitara Neon: Ritmul Revoluției" : "Neon Guitar: The Rhythm of Rebellion",
    bandSubtitle: isRo
      ? "De la chitara electrică Fender Stratocaster la sintetizatoarele moderne, tehnologia muzicală americană a dat glas spiritului rebel al tinereții de pretutindeni."
      : "From the Fender Stratocaster electric guitar to modern synthesizers, American musical innovation voiced the rebellious spirit of youth worldwide.",

    backLink: isRo ? "← Înapoi la Mâncare și Băuturi" : "← Back to Food & Drinks",
    nextLink: isRo ? "Modă →" : "Fashion →",
    oracleDescription: isRo
      ? "Întreabă Oracolul AI despre nașterea hip-hop-ului în Bronx, originile jazz-ului în New Orleans sau evoluția rock-ului."
      : "Ask the AI Oracle about the birth of hip-hop in the Bronx, New Orleans jazz origins, or the commercial rise of rock and roll.",
  };

  return (
    <>
      <MacroStyles />
      <CultureStyles />

      {/* Cinematic Hero Banner */}
      <MacroHero
        imageSrc={SITE_IMAGES.culture.jazzClub}
        imageAlt="Live Jazz Band performing on stage with neon sign"
        eyebrow={content.eyebrow}
        titleLead={isRo ? "GENURI" : "MUSIC"}
        titleAccent={isRo ? "MUZICALE" : "GENRES"}
        description={content.introText}
        stats={[
          {
            value: "4/4",
            label: content.stat1Label,
          },
          {
            value: "30%+",
            label: content.stat2Label,
          },
          {
            value: "$15B+",
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
                  <CountUp value={4} />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Genuri Muzicale Globale" : "Global Music Genres"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Jazz, Blues, Rock 'n' Roll și Hip-Hop — toate născute din diversitatea culturală a Americii."
                    : "Jazz, Blues, Rock 'n' Roll, and Hip-Hop — all born from the cultural crucible of America."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={30} suffix="%" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Consum Hip-Hop Global" : "Hip-Hop Global Streaming"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Hip-Hop-ul este cel mai mare gen muzical din lume după consumul digital de streaming."
                    : "Hip-Hop dominates global streaming networks, accounting for over 30% of total audio streams."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  $<CountUp value={15} suffix="B+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Valoare Industrie SUA" : "US Market Size"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Statele Unite operează cel mai valoros ecosistem muzical comercial de pe glob."
                    : "The US operates the largest commercial music ecosystem of copyright and publishing."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Genres Cards */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <h2 className="font-macro-display text-3xl font-bold text-[#E8B923] text-center mb-16 uppercase tracking-tight">
            {content.title}
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {genres.map((genre) => (
              <div
                key={genre.genre}
                className="culture-glass rounded-3xl p-8 border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 hover:bg-white/[0.03] transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono text-[#E8B923] border border-[#E8B923]/25 px-2 py-0.5 rounded">
                      {genre.city}
                    </span>
                  </div>
                  <h3 className="font-macro-display text-2xl font-bold text-white mb-3">
                    {genre.genre}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed font-body">
                    {genre.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Parallax Band — Guitar Neon */}
        <InfrastructureBand
          imageSrc={SITE_IMAGES.culture.guitarNeon}
          imageAlt="Close up of Electric Guitar Illuminated by Purple and Blue Neon Lights"
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

        {/* Album Covers Grid */}
        {musicImages.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-32">
            <div className="mb-16 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] mb-4 font-semibold">
                {isRo ? "COLECTIA CULTURALA" : "THE CULTURAL RECORD VAULT"}
              </p>
              <h2 className="font-macro-display text-4xl font-bold text-white uppercase tracking-tight mb-4">
                {content.albumsTitle}
              </h2>
              <p className="font-macro-body text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
                {content.albumsSubtitle}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {musicImages.map((img) => (
                <div
                  key={img.id}
                  className="group relative culture-glass rounded-3xl overflow-hidden border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/30 transition-all duration-500 flex flex-col justify-between"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-black/40">
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
              href="/culture/food-and-drinks"
              className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors font-mono"
            >
              {content.backLink}
            </a>
            <a
              href="/culture/fashion"
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
