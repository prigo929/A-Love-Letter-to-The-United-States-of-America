import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { CultureStyles } from "@/components/culture/CulturePageComponents";
import { getCultureHollywood } from "@/lib/data/culture-data";
import { GALLERY_IMAGES } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Film & Storytelling | The American Operating System",
  description: "Hollywood and the visual syntax of human dreaming — explore how America's cinematic output shaped global values.",
};

export default async function FilmAndStorytellingPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const data = getCultureHollywood(locale);

  // Filter gallery images for movie posters/cinema
  const filmImages = GALLERY_IMAGES.filter(
    (img) => img.category === "Cinema" && img.path.includes("Movie Posters")
  );

  const breadcrumbCulture = isRo ? "Cultură" : "Culture";
  const breadcrumbPage = isRo ? "Film și Narativă" : "Film & Storytelling";

  const content = {
    posterTitle: isRo ? "RAFTUL DE POSTERE FILME CLASICE" : "CLASSIC CINEMATIC POSTER SHELF",
    posterSubtitle: isRo
      ? "Lucrări de artă publicitară teatrală din arhiva de cinema americană"
      : "Original theatrical advertising art from the American cinematic vault",
    backLink: isRo ? "← Înapoi la Prezentare Generală" : "← Back to Overview",
    nextLink: isRo ? "Sportul American →" : "American Sports →",
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
            {data.eyebrow}
          </span>
          <h1 className="culture-text-hero mb-8 text-[#F5EDD8]">
            {data.headline}
          </h1>

          <div className="grid gap-12 lg:grid-cols-3 items-start border-t border-white/10 pt-12">
            <div className="lg:col-span-2">
              <blockquote className="text-2xl md:text-3xl font-editorial italic text-[#F5EDD8]/90 leading-relaxed mb-8 pl-6 border-l-2 border-[#E8391B]">
                "{data.pullQuote}"
              </blockquote>

              <p className="font-sans text-base text-[#F5EDD8]/70 leading-relaxed">
                {data.body}
              </p>
            </div>

            {/* Sidebar Stats */}
            <div className="culture-glass rounded-2xl p-6 border border-white/5 space-y-6 font-sans">
              {data.stats.map((stat, idx) => (
                <div key={idx} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="text-4xl font-bold text-white tracking-tight">{stat.value}</div>
                  <div className="text-xs text-glory-gold uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Poster Shelf Grid */}
        {filmImages.length > 0 && (
          <section className="border-t border-white/10 pt-16 mb-20 font-sans">
            <div className="mb-12">
              <h2 className="text-xs font-semibold tracking-wider text-glory-gold uppercase mb-2">
                {content.posterTitle}
              </h2>
              <p className="text-sm text-[#F5EDD8]/60">
                {content.posterSubtitle}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filmImages.map((img) => (
                <div
                  key={img.id}
                  className="group relative culture-glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-black/40">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
            href="/culture/overview"
            className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors"
          >
            {content.backLink}
          </a>
          <a
            href="/culture/sports"
            className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors"
          >
            {content.nextLink}
          </a>
        </div>
      </div>
    </main>
  );
}
