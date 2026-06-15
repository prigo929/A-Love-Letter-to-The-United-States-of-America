"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

export interface LightboxPhoto {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string; // CSS aspect-ratio value e.g. "3/2", "16/9", "7/3"
}

interface PhotoLightboxGridProps {
  photos: LightboxPhoto[];
  gridClassName?: string;
}

export function PhotoLightboxGrid({
  photos,
  gridClassName = "grid grid-cols-1 md:grid-cols-3 gap-4",
}: PhotoLightboxGridProps) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, close]);

  return (
    <>
      <div className={gridClassName}>
        {photos.map((photo, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className="group relative w-full overflow-hidden rounded-2xl cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            style={{ aspectRatio: photo.aspect ?? "3/2" }}
            aria-label={`View full size: ${photo.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {photo.caption && (
              <p className="absolute bottom-0 left-0 right-0 translate-y-1 p-4 font-mono text-xs uppercase tracking-wider text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {photo.caption}
              </p>
            )}
            <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <ZoomIn size={14} className="text-white" />
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <>
            <motion.div
              key="lb-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
              onClick={close}
            />
            <motion.div
              key="lb-panel"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-4 z-50 flex flex-col overflow-hidden rounded-2xl bg-[#050505] md:inset-10 lg:inset-16"
            >
              <div className="flex items-center gap-4 border-b border-white/10 px-5 py-3">
                <p className="flex-1 truncate font-mono text-sm text-white/60">
                  {photos[active].caption ?? photos[active].alt}
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  aria-label="Close lightbox"
                >
                  <X size={15} className="text-white" />
                </button>
              </div>
              <div className="relative flex-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos[active].src}
                  alt={photos[active].alt}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
