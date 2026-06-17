import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";

export const metadata: Metadata = {
  title: "America in Motion | Watch the Story",
  description:
    "Cinematic films of the United States — 16K and 8K aerials of American cities, landscapes, and the neighborhoods of everyday life.",
};

interface VideoItem {
  id: string;
  title: string;
  description: string;
  tag: string;
}

export default async function VideosPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        breadcrumb: "Videoclipuri",
        eyebrow: "AMERICA ÎN MIȘCARE",
        title: "Privește Povestea",
        intro:
          "Filme cinematografice ale Statelor Unite — aeriene în 16K și 8K peste orașe, peisaje și cartierele vieții de zi cu zi.",
      }
    : {
        breadcrumb: "Videos",
        eyebrow: "AMERICA IN MOTION",
        title: "Watch the Story",
        intro:
          "Cinematic films of the United States — 16K and 8K aerials over its cities, landscapes, and the neighborhoods of everyday life.",
      };

  const videos: VideoItem[] = isRo
    ? [
        { id: "jPBfZrgvpSo", title: "America în 16K", tag: "Națiunea", description: "Statele Unite în 16K ultra-HD — cea mai mare economie din lume, de la un ocean la altul." },
        { id: "vE3BAgh_VAQ", title: "Zbor Peste Orașele Americane", tag: "Orașe", description: "O călătorie aeriană în 8K peste skyline-urile și suburbiile marilor orașe americane." },
        { id: "rVrhikMug3A", title: "Cartiere Americane · Furtună", tag: "Cotidian", description: "O plimbare pe străzile mărginite de copaci, cu nori de furtună la orizont." },
        { id: "44x97vx6jjs", title: "Plimbare de Iarnă", tag: "Cotidian", description: "O seară liniștită de iarnă prin cartierele americane." },
        { id: "zMGvONrrEVI", title: "Suburbiile Carolinei de Nord", tag: "Cotidian", description: "O plimbare prin cartierele și suburbiile din Carolina de Nord." },
      ]
    : [
        { id: "jPBfZrgvpSo", title: "America in 16K", tag: "The Nation", description: "The United States in stunning 16K ultra-HD — the world's largest economy, from coast to shining coast." },
        { id: "vE3BAgh_VAQ", title: "Flying Over American Cities", tag: "Cities", description: "An 8K aerial journey over the skylines, grids, and endless suburbs of America's great cities." },
        { id: "rVrhikMug3A", title: "American Neighborhoods · Storm Clouds", tag: "Everyday", description: "A quiet walk through tree-lined streets as storm clouds gather on the horizon." },
        { id: "44x97vx6jjs", title: "A Winter Evening Walk", tag: "Everyday", description: "A quiet winter evening stroll through the neighborhoods of small-town America." },
        { id: "zMGvONrrEVI", title: "The Suburbs of North Carolina", tag: "Everyday", description: "A walk through the neighborhoods and suburbs of North Carolina, USA." },
      ];

  const [featured, ...rest] = videos;

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: copy.breadcrumb }]} className="mb-8" />
      </div>

      {/* Hero */}
      <section className="border-b border-white/10 px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-glory-gold mb-4">{copy.eyebrow}</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-[1.05]">{copy.title}</h1>
          <p className="mt-5 max-w-2xl font-body text-lg text-white/60 leading-relaxed">{copy.intro}</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
          {/* Featured */}
          <div>
            <YouTubeEmbed id={featured.id} title={featured.title} />
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">{featured.title}</h2>
                <p className="mt-1 max-w-2xl font-body text-sm text-white/55 leading-relaxed">{featured.description}</p>
              </div>
              <span className="shrink-0 rounded border border-glory-gold/25 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-glory-gold">
                {featured.tag}
              </span>
            </div>
          </div>

          {/* Rest */}
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
            {rest.map((v) => (
              <div key={v.id}>
                <YouTubeEmbed id={v.id} title={v.title} />
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{v.title}</h3>
                    <p className="mt-1 font-body text-sm text-white/55 leading-relaxed">{v.description}</p>
                  </div>
                  <span className="shrink-0 rounded border border-glory-gold/25 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-glory-gold">
                    {v.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
