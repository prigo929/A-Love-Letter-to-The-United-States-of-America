import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { CultureStyles } from "@/components/culture/CulturePageComponents";
import { getCultureMusicGenres } from "@/lib/data/culture-data";
import { GALLERY_IMAGES } from "@/lib/data/gallery";

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

    backLink: isRo ? "← Înapoi la Mâncare și Băuturi" : "← Back to Food & Drinks",
    nextLink: isRo ? "Modă →" : "Fashion →",
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
          <p className="max-w-4xl font-sans text-base text-[#F5EDD8]/70 leading-relaxed border-t border-white/10 pt-8">
            {content.introText}
          </p>
        </section>

        {/* Genres Detailed Cards */}
        <section className="grid gap-8 md:grid-cols-2 mb-20 font-sans">
          {genres.map((genre) => (
            <div
              key={genre.genre}
              className="culture-glass rounded-2xl p-8 border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-semibold text-glory-gold uppercase tracking-wider">
                    {genre.city}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {genre.genre}
                </h3>
                <p className="text-sm text-[#F5EDD8]/70 leading-relaxed">
                  {genre.description}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Album Covers Grid */}
        {musicImages.length > 0 && (
          <section className="border-t border-white/10 pt-16 mb-20 font-sans">
            <div className="mb-12">
              <h2 className="text-xs font-semibold tracking-wider text-glory-gold uppercase mb-2">
                {content.albumsTitle}
              </h2>
              <p className="text-sm text-[#F5EDD8]/60">
                {content.albumsSubtitle}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {musicImages.map((img) => (
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
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-white mb-1">
                      {img.caption}
                    </h3>
                    <p className="text-xs text-[#F5EDD8]/50 italic mb-2">
                      {img.location || "USA"}
                    </p>
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
            href="/culture/food-and-drinks"
            className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors"
          >
            {content.backLink}
          </a>
          <a
            href="/culture/fashion"
            className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors"
          >
            {content.nextLink}
          </a>
        </div>
      </div>
    </main>
  );
}
