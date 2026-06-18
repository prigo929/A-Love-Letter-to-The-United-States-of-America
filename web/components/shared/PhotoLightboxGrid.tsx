"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export interface LightboxPhoto {
  src: string;
  alt: string;
  caption?: string;
  /** Optional longer description, shown beneath the tile (card mode) and in the lightbox. */
  description?: string;
  aspect?: string; // CSS aspect-ratio value e.g. "3/2", "16/9", "7/3"
  sizes?: string; // optional per-photo responsive sizes override
  /** Extra object-fit/position classes for the thumbnail, e.g. "object-top". */
  objectClassName?: string;
}

interface PhotoLightboxGridProps {
  photos: LightboxPhoto[];
  gridClassName?: string;
  /** Responsive sizes hint for the thumbnails. */
  sizes?: string;
  /** Card mode: render caption + description beneath each tile instead of a hover overlay. */
  withCaptions?: boolean;
}

const DEFAULT_SIZES =
  "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw";

const isSvg = (src: string) => src.split("?")[0].toLowerCase().endsWith(".svg");

export function PhotoLightboxGrid({
  photos,
  gridClassName = "grid grid-cols-1 md:grid-cols-3 gap-4",
  sizes = DEFAULT_SIZES,
  withCaptions = false,
}: PhotoLightboxGridProps) {
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
    // Lock scroll while a photo is open. Lock BOTH <html> and <body> because the
    // document scroller varies (body only sets overflow-x), and compensate for the
    // removed scrollbar width to avoid a layout jump.
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
            className="fixed inset-0 z-100 bg-black"
            onClick={close}
          />
          <motion.div
            key="lb-panel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 z-101 flex flex-col md:inset-10 lg:inset-16"
          >
            <div
              className="flex items-start gap-4 rounded-t-2xl border-b border-white/10 bg-[#050505] px-5 py-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-sm text-white/70">
                  {photos[active].caption ?? photos[active].alt}
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
            {/* Clicking the area around the photo closes; clicking the photo itself does not. */}
            <div
              className="relative flex-1 cursor-zoom-out overflow-hidden rounded-b-2xl bg-[#050505]"
              onClick={close}
            >
              <Image
                src={photos[active].src}
                alt={photos[active].alt}
                fill
                sizes="90vw"
                priority
                unoptimized={isSvg(photos[active].src)}
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
      <div className={gridClassName}>
        {photos.map((photo, i) => (
          <div key={i} className={withCaptions ? "flex flex-col" : "contents"}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group relative w-full overflow-hidden rounded-2xl cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              style={{ aspectRatio: photo.aspect ?? "3/2" }}
              aria-label={`View full size: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={photo.sizes ?? sizes}
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                unoptimized={isSvg(photo.src)}
                className={`object-cover transition-transform duration-700 group-hover:scale-105 ${photo.objectClassName ?? ""}`}
              />
              {!withCaptions && (
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              )}
              {!withCaptions && photo.caption && (
                <p className="absolute bottom-0 left-0 right-0 translate-y-1 p-4 font-mono text-xs uppercase tracking-wider text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.caption}
                </p>
              )}
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ZoomIn size={14} className="text-white" />
              </div>
            </button>
            {withCaptions && (photo.caption || photo.description) && (
              <div className="pt-3">
                {photo.caption && (
                  <p className="font-display text-sm font-bold leading-tight text-white">
                    {photo.caption}
                  </p>
                )}
                {photo.description && (
                  <p className="mt-1.5 text-xs leading-relaxed text-white/55">
                    {photo.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
