import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { CultureStyles } from "@/components/culture/CulturePageComponents";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "American Sports & Soft Power | The American Operating System",
  description: "Explore the global cultural reach of NFL, NBA, MLB, and NCAA sports programs.",
};

export default async function CultureSportsPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const breadcrumbCulture = isRo ? "Cultură" : "Culture";
  const breadcrumbPage = isRo ? "Sport" : "Sports";

  const content = {
    eyebrow: isRo ? "EXPORT CULTURAL GLOBAL · SPORT" : "GLOBAL CULTURAL EXPORT · SPORTS",
    title: isRo ? "SPORTUL AMERICAN ȘI PUTEREA SOFT" : "AMERICAN SPORTS & SOFT POWER",
    deck: isRo
      ? "NFL, NBA, MLB și fotbalul universitar — cultura sportivă americană este un export masiv de soft-power și o instituție unică. De la cele 100+ milioane de spectatori ai Super Bowl-ului până la impactul global al baschetului, sportul definește ritualul colectiv american."
      : "The NFL, NBA, MLB, and college football — American sports culture is a massive soft-power export and a uniquely American institution. From the Super Bowl's 100+ million domestic viewers to basketball's global cultural footprint, sports define the American collective ritual.",
    
    nflLabel: isRo ? "FOTBAL AMERICAN" : "GRIDIRON FOOTBALL",
    nflTitle: isRo ? "NFL & Spectacolul Super Bowl" : "The NFL & The Super Bowl",
    nflText: isRo
      ? "O sărbătoare națională de facto în Statele Unite. Super Bowl reunește peste 100 de milioane de telespectatori interni, îmbinând atletismul de elită cu reclame emblematice și show-uri de la pauză de renume mondial."
      : "A de facto national holiday in the United States. The Super Bowl gathers over 100 million domestic viewers, merging elite athleticism with iconic advertising campaigns and world-renowned halftime shows.",

    nbaLabel: isRo ? "BASCHET" : "BASKETBALL",
    nbaTitle: isRo ? "NBA și Cultura Superstarurilor" : "The NBA & Global Superstar Culture",
    nbaText: isRo
      ? "De la Dream Team din 1992 până la superstarurile de astăzi, baschetul este unul dintre cele mai de succes exporturi culturale ale Americii, influențând moda, muzica și stilul urban pe toate continentele."
      : "From the 1992 Dream Team to modern global superstars, basketball is one of America's most successful cultural exports, shaping global fashion, music, and urban lifestyle trends.",

    mlbLabel: isRo ? "BASEBALL & SPORTURI UNIVERSITARE" : "BASEBALL & COLLEGE TRADITIONS",
    mlbTitle: isRo ? "MLB ca Istorie și Pasiunea NCAA" : "MLB Pastime & NCAA Fanaticism",
    mlbText: isRo
      ? "Major League Baseball reprezintă nostalgia și istoria Americii. În paralel, fotbalul și baschetul universitar din NCAA mobilizează comunități locale cu stadioane gigantice de peste 100.000 de locuri."
      : "Major League Baseball represents nostalgia and the history of America. In parallel, NCAA college football and basketball mobilize local communities with giant stadiums exceeding 100,000 capacities.",

    backLink: isRo ? "← Înapoi la Film și Narativă" : "← Back to Film & Storytelling",
    nextLink: isRo ? "Divertisment și Media →" : "Entertainment & Media →",
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
            {content.deck}
          </p>
        </section>

        {/* Sports Pillars Editorial Grid */}
        <section className="space-y-24 font-sans">
          {/* Section 1: NFL */}
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold tracking-wider text-glory-gold uppercase">
                {content.nflLabel}
              </span>
              <h2 className="text-2xl md:text-3xl font-editorial font-bold text-white">
                {content.nflTitle}
              </h2>
              <p className="text-[#F5EDD8]/70 leading-relaxed text-sm">
                {content.nflText}
              </p>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/5 bg-black/40">
              <Image
                src={SITE_IMAGES.culture.nflStadium}
                alt="NFL Stadium"
                fill
                className="object-cover hover:scale-102 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Section 2: NBA */}
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/5 bg-black/40 lg:order-2">
              <Image
                src={SITE_IMAGES.culture.cowboysStadium}
                alt="NBA Superstar Culture"
                fill
                className="object-cover hover:scale-102 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6 lg:order-1">
              <span className="text-xs font-semibold tracking-wider text-glory-gold uppercase">
                {content.nbaLabel}
              </span>
              <h2 className="text-2xl md:text-3xl font-editorial font-bold text-white">
                {content.nbaTitle}
              </h2>
              <p className="text-[#F5EDD8]/70 leading-relaxed text-sm">
                {content.nbaText}
              </p>
            </div>
          </div>

          {/* Section 3: MLB & NCAA */}
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold tracking-wider text-glory-gold uppercase">
                {content.mlbLabel}
              </span>
              <h2 className="text-2xl md:text-3xl font-editorial font-bold text-white">
                {content.mlbTitle}
              </h2>
              <p className="text-[#F5EDD8]/70 leading-relaxed text-sm">
                {content.mlbText}
              </p>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/5 bg-black/40">
              <Image
                src={SITE_IMAGES.culture.baseballPark}
                alt="Baseball and NCAA College traditions"
                fill
                className="object-cover hover:scale-102 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-white/10 pt-12 mt-24 font-sans">
          <a
            href="/culture/film-and-storytelling"
            className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors"
          >
            {content.backLink}
          </a>
          <a
            href="/culture/entertainment"
            className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors"
          >
            {content.nextLink}
          </a>
        </div>
      </div>
    </main>
  );
}
