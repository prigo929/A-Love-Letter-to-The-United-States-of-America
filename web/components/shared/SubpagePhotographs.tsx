// ─── SubpagePhotographs ───────────────────────────────────────────────────────
// A strip of curated photographs for a specific sub-page (e.g. "internet-history",
// "navy", "bill-of-rights"). Mirrors IconicPhotographs but filters
// SUBPAGE_PHOTOGRAPHS by the `subpage` slug. Only renders entries whose image has
// been sourced (imagePath present and resolvable in the gallery manifest), so the
// strip grows automatically as images land. Server component — no client JS.

import Image from "next/image";
import { SUBPAGE_PHOTOGRAPHS } from "@/lib/data/subpage-photographs-data";
import { GALLERY_ASSETS } from "@/lib/data/gallery-assets";

const SRC_BY_PATH = new Map(GALLERY_ASSETS.map((a) => [a.path, a.src]));

interface SubpagePhotographsProps {
  subpage: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
}

export function SubpagePhotographs({
  subpage,
  eyebrow = "The Visual Record",
  title = "Photographs",
  intro,
}: SubpagePhotographsProps) {
  const photos = SUBPAGE_PHOTOGRAPHS.filter(
    (p) => p.subpage === subpage && p.imagePath && SRC_BY_PATH.has(p.imagePath),
  );

  if (photos.length === 0) return null;

  return (
    <section className="relative w-full bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl">
        <header className="mb-12 max-w-3xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-glory-gold">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-hero text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          {intro && (
            <p className="mt-4 font-body text-base leading-relaxed text-white/55">
              {intro}
            </p>
          )}
        </header>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => {
            const src = SRC_BY_PATH.get(photo.imagePath!)!;
            return (
              <figure
                key={photo.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-dark/40"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                </div>
                <figcaption className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold leading-tight text-white">
                    {photo.title}
                    <span className="ml-2 font-body text-sm font-normal text-glory-gold">
                      {photo.year}
                    </span>
                  </h3>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-white/55">
                    {photo.blurb}
                  </p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SubpagePhotographs;
