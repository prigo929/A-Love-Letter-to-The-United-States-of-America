"use client";

// ─── ResourceGallery ──────────────────────────────────────────────────────────
// Grouped photo gallery for /natural-resources. Renders each themed category as a
// sub-grid of cards; clicking a card opens a full-screen lightbox. Adapted from
// the IconicPhotographs lightbox, but self-contained and category-grouped, driven
// by StaticImageData imports (automatic dimensions + blur placeholder).

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import type { GalleryCategory } from "@/lib/data/natural-resources-gallery-data";

const ACCENT = "#4ade80";

interface ResourceGalleryProps {
  categories: GalleryCategory[];
  eyebrow: string;
  title: string;
  intro?: string;
}

export function ResourceGallery({
  categories,
  eyebrow,
  title,
  intro,
}: ResourceGalleryProps) {
  // Flatten for stable lightbox indexing across categories.
  const all = categories.flatMap((c) => c.photos);
  const [active, setActive] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % all.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + all.length) % all.length));
    };
    document.addEventListener("keydown", onKey);

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPadding = body.style.paddingRight;
    const scrollbarW = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarW > 0) body.style.paddingRight = `${scrollbarW}px`;

    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPadding;
    };
  }, [active, close, all.length]);

  if (all.length === 0) return null;

  const photo = active !== null ? all[active] : null;

  const overlay = (
    <AnimatePresence>
      {photo && (
        <>
          <motion.div
            key="lb-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black"
            onClick={close}
          />
          <motion.div
            key="lb-panel"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[101] flex flex-col bg-black/98"
          >
            <div
              className="flex items-start gap-4 border-b border-white/10 bg-black/40 px-5 py-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-semibold text-white">
                  {photo.title}
                  <span className="ml-2 font-body text-xs font-normal" style={{ color: ACCENT }}>
                    {photo.year}
                  </span>
                </p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/45">
                  {photo.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                aria-label="Close"
              >
                <X size={15} className="text-white" />
              </button>
            </div>
            <div
              className="relative flex-1 cursor-zoom-out overflow-hidden bg-transparent"
              onClick={close}
            >
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                sizes="100vw"
                priority
                quality={95}
                className="cursor-default object-contain p-2 sm:p-4"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  let runningIndex = 0;

  return (
    <>
      <section
        id="gallery"
        className="relative w-full bg-black px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-screen-xl">
          <header className="mb-16 max-w-3xl">
            <p
              className="font-body text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: ACCENT }}
            >
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

          <div className="space-y-20">
            {categories.map((cat) => (
              <div key={cat.id}>
                <h3 className="mb-8 flex items-center gap-4 font-display text-2xl font-semibold text-white">
                  <span
                    className="inline-block h-px w-10"
                    style={{ background: ACCENT }}
                    aria-hidden="true"
                  />
                  {cat.title}
                </h3>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {cat.photos.map((p) => {
                    const idx = runningIndex++;
                    return (
                      <figure
                        key={p.id}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-dark/40"
                      >
                        <button
                          type="button"
                          onClick={() => setActive(idx)}
                          className="relative aspect-[4/3] w-full overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                          aria-label={`View: ${p.title}`}
                        >
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            placeholder="blur"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                            aria-hidden="true"
                          />
                          <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <ZoomIn size={14} className="text-white" />
                          </div>
                        </button>
                        <figcaption className="flex flex-1 flex-col p-5">
                          <h4 className="font-display text-base font-semibold leading-tight text-white">
                            {p.title}
                            <span
                              className="ml-2 font-body text-xs font-normal"
                              style={{ color: ACCENT }}
                            >
                              {p.year}
                            </span>
                          </h4>
                          <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-white/55 text-justify">
                            {p.caption}
                          </p>
                          <p className="mt-4 font-body text-[11px] uppercase tracking-widest text-white/35">
                            {p.location}
                          </p>
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}

export default ResourceGallery;
