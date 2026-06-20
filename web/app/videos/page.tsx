import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";
import { LocalVideoCard } from "@/components/shared/LocalVideoCard";
import { cn } from "@/lib/utils";

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

interface SiteClip {
  src: string;
  title: string;
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
        moreEyebrow: "DIN TOT SITE-UL",
        moreTitle: "Mai Multe Filme",
        moreIntro:
          "Clipurile cinematografice folosite în paginile sitului — apărare, tehnologie, spațiu și cultură.",
      }
    : {
        breadcrumb: "Videos",
        eyebrow: "AMERICA IN MOTION",
        title: "Watch the Story",
        intro:
          "Cinematic films of the United States — 16K and 8K aerials over its cities, landscapes, and the neighborhoods of everyday life.",
        moreEyebrow: "FROM ACROSS THE SITE",
        moreTitle: "More Films",
        moreIntro:
          "The cinematic clips woven through the site's pages — defense, technology, space, and culture.",
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

  const siteClips: SiteClip[] = [
    { src: "/videos/earth-pixels-from-space.mp4", title: isRo ? "Pământul din Spațiu" : "Earth from Space", tag: isRo ? "Spațiu" : "Space" },
    { src: "/videos/library/Technology/Falcon 9 Launch and Landing cinematic.mp4", title: isRo ? "Falcon 9 — Lansare și Aterizare" : "Falcon 9 — Launch & Landing", tag: "SpaceX" },
    { src: "/videos/library/Technology/Starship's Tenth Flight Test launch and landing cinematic.mp4", title: isRo ? "Starship — Zborul 10" : "Starship — Flight 10", tag: "SpaceX" },
    { src: "/videos/library/Technology/The Extravehicular Activity (EVA) Suit SpaceX ShowCase 4K Cinematic.mp4", title: isRo ? "Costumul EVA SpaceX" : "SpaceX EVA Suit", tag: "SpaceX" },
    { src: "/videos/library/Technology/TERAFAB cinematic - with Tesla and SpaceX.mp4", title: isRo ? "TERAFAB — Tesla și SpaceX" : "TERAFAB — Tesla & SpaceX", tag: isRo ? "Industrie" : "Industry" },
    { src: "/videos/library/Technology/Nvidia AI cinematic.mp4", title: isRo ? "NVIDIA — Era AI" : "NVIDIA — The AI Era", tag: "AI" },
    { src: "/videos/library/Technology/Fiber Optics, light, trails video.mp4", title: isRo ? "Fibre Optice și Internetul" : "Fiber Optics & The Internet", tag: isRo ? "Tehnologie" : "Technology" },
    { src: "/videos/library/Technology/Introducing iPhone 17 Pro - Apple.mp4", title: "iPhone 17 Pro", tag: "Apple" },
    { src: "/videos/library/Technology/Introducing iPhone Air - Apple.mp4", title: isRo ? "Prezentarea iPhone Air" : "Introducing iPhone Air", tag: "Apple" },
    { src: "/videos/library/Technology/Design is how it works - Apple.mp4", title: isRo ? "Designul Este Cum Funcționează" : "Design Is How It Works", tag: "Apple" },
    { src: "/videos/library/Technology/Celebrating Steve - October 5 - Apple.mp4", title: isRo ? "Celebrându-l pe Steve" : "Celebrating Steve", tag: "Apple" },
    { src: "/videos/library/Technology/Video Games, the Movie.mp4", title: isRo ? "Jocuri Video: Filmul" : "Video Games: The Movie", tag: "Gaming" },
    { src: "/videos/library/Technology/The Call - Season 2022 Cinematic - League of Legends cinematic.mp4", title: isRo ? "Apelul: Sezonul 2022" : "The Call: Season 2022", tag: "Gaming" },
    { src: "/videos/library/Technology/Video Games edit.mp4", title: isRo ? "Revoluția Jocurilor Video" : "American Gaming Revolution", tag: "Gaming" },
    { src: "/videos/military/b2-spirit-hero.mp4", title: isRo ? "Bombardierul B-2 Spirit" : "B-2 Spirit Stealth Bomber", tag: isRo ? "Forțele Aeriene" : "Air Force" },
    { src: "/videos/military/fly-navy.mp4", title: isRo ? "Marina SUA" : "Fly Navy", tag: isRo ? "Marina" : "Navy" },
    { src: "/videos/military/us-space-force-americas-invisible-front.mp4", title: isRo ? "Forța Spațială: Frontul Invizibil" : "Space Force: Invisible Front", tag: isRo ? "Forța Spațială" : "Space Force" },
    { src: "/videos/military/supremacy-wave.mp4", title: isRo ? "Supremație Aeriană" : "Air Supremacy", tag: isRo ? "Armată" : "Military" },
    { src: "/videos/military/cia-edit.mp4", title: isRo ? "Sediul CIA" : "CIA Headquarters", tag: isRo ? "Servicii Secrete" : "Intelligence" },
    { src: "/videos/library/Culture/Michael Jordan - Edit.mp4", title: "Michael Jordan", tag: isRo ? "Sport" : "Sports" },
    { src: "/videos/times-square-aerial.mp4", title: "Times Square", tag: isRo ? "Orașe" : "Cities" },
    { src: "/videos/library/Culture/Times Square Aerial.mp4", title: isRo ? "Skyline Times Square" : "Times Square Skyline", tag: isRo ? "Orașe" : "Cities" },
    { src: "/videos/flag-loop.mp4", title: isRo ? "Drapelul American" : "Old Glory", tag: isRo ? "Simboluri" : "Symbols" },
  ];

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

      {/* Films — 1 per row */}
      <section className="px-4 py-14 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-y-16">
          {videos.map((v) => {
            return (
              <div key={v.id} className="flex flex-col">
                <YouTubeEmbed
                  id={v.id}
                  title={v.title}
                  aspectClassName="aspect-video w-full"
                />
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display font-bold text-white text-2xl md:text-3xl">
                      {v.title}
                    </h3>
                    <p className="mt-2 max-w-3xl font-body text-base text-white/70 leading-relaxed">{v.description}</p>
                  </div>
                  <span className="shrink-0 rounded border border-glory-gold/25 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-glory-gold">
                    {v.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* More from across the site (local clips) */}
      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-glory-gold mb-3">{copy.moreEyebrow}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">{copy.moreTitle}</h2>
          <p className="max-w-2xl font-body text-sm text-white/55 leading-relaxed mb-10">{copy.moreIntro}</p>
          <div className="flex flex-col gap-y-16">
            {siteClips.map((clip) => (
              <div key={clip.src} className="flex flex-col">
                <LocalVideoCard src={clip.src} title={clip.title} />
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white">{clip.title}</h3>
                  </div>
                  <span className="shrink-0 rounded border border-white/20 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-white/60">
                    {clip.tag}
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
