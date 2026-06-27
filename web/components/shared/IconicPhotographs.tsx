"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import {
  ICONIC_PHOTOGRAPHS_BY_SECTION,
  type PhotoSection,
} from "@/lib/data/iconic-photographs-data";
import { GALLERY_ASSETS } from "@/lib/data/gallery-assets";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

const SRC_BY_PATH = new Map(GALLERY_ASSETS.map((a) => [a.path, a.src]));

const isSvg = (src: string) => src.split("?")[0].toLowerCase().endsWith(".svg");

interface IconicPhotographsProps {
  section: PhotoSection;
  eyebrow?: string;
  title?: string;
  intro?: string;
}

export function IconicPhotographs({
  section,
  eyebrow = "The Visual Record",
  title = "Iconic Photographs",
  intro,
}: IconicPhotographsProps) {
  const [active, setActive] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
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
  }, [active, close]);

  const photos = (ICONIC_PHOTOGRAPHS_BY_SECTION[section] ?? []).filter(
    (p) => p.imagePath && SRC_BY_PATH.has(p.imagePath),
  );

  if (photos.length === 0) return null;

  const overlay = (
    <AnimatePresence>
      {active !== null && (
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
              className="flex items-start gap-4 border-b border-white/10 bg-black/40 backdrop-blur-md px-5 py-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-semibold text-white">
                  {photos[active].title}
                  <span className="ml-2 font-body text-xs font-normal text-glory-gold">
                    {photos[active].year}
                  </span>
                </p>
                {photos[active].description && (
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/45">
                    {photos[active].description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={close}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                aria-label="Close lightbox"
              >
                <X size={15} className="text-white" />
              </button>
            </div>
            <div
              className="relative flex-1 cursor-zoom-out overflow-hidden bg-transparent"
              onClick={close}
            >
              <Image
                src={SRC_BY_PATH.get(photos[active].imagePath!)!}
                alt={photos[active].title}
                fill
                sizes="100vw"
                priority
                quality={100}
                unoptimized={isSvg(SRC_BY_PATH.get(photos[active].imagePath!)!.src)}
                className="cursor-default object-contain p-2 sm:p-4"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
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
            {photos.map((photo, i) => {
              const src = SRC_BY_PATH.get(photo.imagePath!)!;
              return (
                <figure
                  key={photo.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-dark/40"
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="relative w-full overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    style={{ aspectRatio: `${src.width} / ${src.height}` }}
                    aria-label={`View full size: ${photo.title}`}
                  >
                    <Image
                      src={src}
                      alt={photo.caption}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <ZoomIn size={14} className="text-white" />
                    </div>
                  </button>
                  <figcaption className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold leading-tight text-white">
                      {photo.title}
                      <span className="ml-2 font-body text-sm font-normal text-glory-gold">
                        {photo.year}
                      </span>
                    </h3>
                    <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-white/55 text-justify">
                      {photo.description}
                    </p>
                    <p className="mt-4 font-body text-xs uppercase tracking-widest text-white/35">
                      {photo.location}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}

export default IconicPhotographs;
