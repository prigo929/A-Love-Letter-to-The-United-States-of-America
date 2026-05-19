import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "American Sports & Soft Power",
  description:
    "An empty editorial layout scaffold for the American Sports subpage.",
};

export default async function AmericanSportsPage() {
  const locale = await getServerLocale();
  const breadcrumbCulture = locale === "ro" ? "Cultură" : "Culture";
  const breadcrumbPage =
    locale === "ro" ? "Sportul American" : "American Sports";

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: breadcrumbCulture, href: "/culture" },
            { label: breadcrumbPage },
          ]}
          className="mb-8"
        />
      </div>

      {/* Hero / Soft Power Thesis */}
      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto min-h-[40dvh] max-w-7xl rounded-3xl border border-dashed border-white/15 bg-white/3 p-8 flex flex-col justify-center">
          <span className="font-hero text-xs uppercase tracking-[0.2em] text-glory-gold mb-3">
            {locale === "ro" ? "Export Cultural Global" : "Global Cultural Export"}
          </span>
          <h1 className="font-hero text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {locale === "ro" ? "Sportul American și Teza Soft Power" : "American Sports & The Soft Power Thesis"}
          </h1>
          <p className="max-w-2xl font-body text-base text-white/70 leading-relaxed">
            {locale === "ro"
              ? "NFL, NBA, MLB și fotbalul universitar — cultura sportivă americană este un export masiv de soft-power și o instituție unică. De la cele 100+ milioane de spectatori ai Super Bowl-ului până la impactul global al baschetului, sportul definește ritualul colectiv american."
              : "The NFL, NBA, MLB, and college football — American sports culture is a massive soft-power export and a uniquely American institution. From the Super Bowl's 100+ million domestic viewers to basketball's global cultural footprint, sports define the American collective ritual."}
          </p>
        </div>
      </section>

      {/* Editorial Content Blocks Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
          {/* Row 1: NFL & Super Bowl */}
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/3 p-8 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-body text-glory-gold uppercase tracking-wider font-semibold">
                  {locale === "ro" ? "Fotbal American" : "Gridiron Football"}
                </span>
                <h3 className="font-hero text-xl font-bold mt-2 mb-3">
                  {locale === "ro" ? "NFL & Spectacolul Super Bowl" : "The NFL & The Super Bowl"}
                </h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">
                  {locale === "ro"
                    ? "O sărbătoare națională de facto în Statele Unite. Super Bowl reunește peste 100 de milioane de telespectatori interni, îmbinând atletismul de elită cu reclame emblematice și show-uri de la pauză de renume mondial."
                    : "A de facto national holiday in the United States. The Super Bowl gathers over 100 million domestic viewers, merging elite athleticism with iconic advertising campaigns and world-renowned halftime shows."}
                </p>
              </div>
              <div className="text-xs font-body text-white/35 mt-4">
                {locale === "ro" ? "TODO: Grafice de audiență și zone video" : "TODO: Audience metrics charts and video placeholders"}
              </div>
            </div>
            <div className="min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/3 p-8 flex flex-col justify-end">
              <span className="text-xs font-body text-white/20">
                {locale === "ro" ? "[Loc de plasare imagine: Stadion de fotbal plin]" : "[Image Placeholder: Packed Stadium Under Lights]"}
              </span>
            </div>
          </div>

          {/* Row 2: NBA Global Reach */}
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="order-2 min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/3 p-8 flex flex-col justify-end lg:order-1">
              <span className="text-xs font-body text-white/20">
                {locale === "ro" ? "[Loc de plasare imagine: Teren de baschet urban]" : "[Image Placeholder: Basketball Court in the City]"}
              </span>
            </div>
            <div className="order-1 min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/3 p-8 flex flex-col justify-between lg:order-2">
              <div>
                <span className="text-[11px] font-body text-glory-gold uppercase tracking-wider font-semibold">
                  {locale === "ro" ? "Baschet" : "Basketball"}
                </span>
                <h3 className="font-hero text-xl font-bold mt-2 mb-3">
                  {locale === "ro" ? "NBA și Cultura Superstarurilor" : "The NBA & Global Superstar Culture"}
                </h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">
                  {locale === "ro"
                    ? "De la Dream Team din 1992 până la superstarurile de astăzi, baschetul este unul dintre cele mai de succes exporturi culturale ale Americii, influențând moda, muzica și stilul urban pe toate continentele."
                    : "From the 1992 Dream Team to modern global superstars, basketball is one of America's most successful cultural exports, shaping global fashion, music, and urban lifestyle trends."}
                </p>
              </div>
              <div className="text-xs font-body text-white/35 mt-4">
                {locale === "ro" ? "TODO: Hartă a ligii și elemente interactive" : "TODO: Global player roster map and interactive nodes"}
              </div>
            </div>
          </div>

          {/* Row 3: MLB Pastime & NCAA */}
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/3 p-8 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-body text-glory-gold uppercase tracking-wider font-semibold">
                  {locale === "ro" ? "Baseball & Sporturi Universitare" : "Baseball & College Traditions"}
                </span>
                <h3 className="font-hero text-xl font-bold mt-2 mb-3">
                  {locale === "ro" ? "MLB ca Istorie și Pasiunea NCAA" : "MLB Pastime & NCAA Fanaticism"}
                </h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">
                  {locale === "ro"
                    ? "Major League Baseball reprezintă nostalgia și istoria Americii. În paralel, fotbalul și baschetul universitar din NCAA mobilizează comunități locale cu stadioane gigantice de 100.000+ de locuri."
                    : "Major League Baseball represents nostalgia and the history of America. In parallel, NCAA college football and basketball mobilize local communities with giant stadiums exceeding 100,000 capacities."}
                </p>
              </div>
              <div className="text-xs font-body text-white/35 mt-4">
                {locale === "ro" ? "TODO: Hartă a stadioanelor" : "TODO: Historic ballparks map"}
              </div>
            </div>
            <div className="min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/3 p-8 flex flex-col justify-end">
              <span className="text-xs font-body text-white/20">
                {locale === "ro" ? "[Loc de plasare imagine: Meci de baseball istoric]" : "[Image Placeholder: Vintage Baseball Game]"}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
