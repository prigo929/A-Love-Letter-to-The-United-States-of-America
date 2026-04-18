"use client";

// Homepage closing gallery section.
//
// Beginner guide:
// - To change which images appear here, edit GALLERY_PREVIEW_IMAGES in
//   lib/data/home.ts
// - This file only controls layout, hover effects, and the lightbox behavior

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ZoomIn, MapPin } from "lucide-react";
import { fadeUp, scaleUp, staggerContainer } from "@/lib/animations";
import { GALLERY_PREVIEW_IMAGES } from "@/lib/data/home";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";

type GalleryImage = (typeof GALLERY_PREVIEW_IMAGES)[number];

function Lightbox({
  image,
  onClose,
}: {
  image: GalleryImage;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-4 z-50 flex flex-col overflow-hidden rounded-2xl bg-navy-dark md:inset-12 lg:inset-16"
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-lg bg-black/60 p-2 text-white/80 transition-colors hover:bg-black/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="relative flex-1">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="100vw"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              priority
            />
          </div>

          <div className="flex items-center gap-4 border-t border-white/10 bg-navy-dark px-6 py-4">
            <div className="flex-1">
              <p className="font-body text-sm font-semibold text-white">
                {image.caption}
              </p>
              <p className="font-body text-xs text-white/50">{image.alt}</p>
            </div>
            <span className="rounded-full border border-glory-gold/25 bg-glory-gold/10 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider text-glory-gold">
              {image.category}
            </span>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}

function GalleryCard({
  image,
  onClick,
  priority = false,
  className,
}: {
  image: GalleryImage;
  onClick: () => void;
  priority?: boolean;
  className?: string;
}) {
  const aspectClass = {
    tall: "aspect-[3/4]",
    wide: "aspect-[16/9]",
    normal: "aspect-[4/3]",
  }[image.span];

  return (
    <motion.div
      variants={scaleUp}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-xl",
        className,
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => event.key === "Enter" && onClick()}
      aria-label={`View full image: ${image.caption}`}
    >
      <div className={cn("relative w-full overflow-hidden", aspectClass)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          priority={priority}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute right-3 top-3 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ZoomIn className="h-4 w-4 text-white" aria-hidden="true" />
        </div>

        <div className="absolute left-3 top-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full border border-glory-gold/30 bg-navy-dark/80 px-2.5 py-1 font-body text-xs font-semibold uppercase tracking-wider text-glory-gold backdrop-blur-sm">
            {image.category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="flex items-center gap-1.5 font-body text-sm font-semibold leading-tight text-white">
            <MapPin
              className="h-3 w-3 shrink-0 text-glory-gold"
              aria-hidden="true"
            />
            {image.caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function GalleryPreviewSection() {
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  // Used to build the category pills automatically from the gallery data.
  const categories = [...new Set(GALLERY_PREVIEW_IMAGES.map((image) => image.category))];

  return (
    <section
      className="relative overflow-hidden bg-navy-dark py-24 md:py-32"
      aria-labelledby="gallery-heading"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glory-gold/40 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="mb-12 grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_320px] xl:items-end"
        >
          <div className="max-w-3xl">
            <motion.p variants={fadeUp} className="section-eyebrow">
              America Through the Lens
            </motion.p>
            <motion.h2
              id="gallery-heading"
              variants={fadeUp}
              className="max-w-2xl font-display text-h2 text-white"
            >
              A Visual Journey
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-white/58"
            >
              Eight frames. Cities, institutions, innovation, landscapes, and
              the physical scale of the country itself. This closing gallery
              turns the homepage into something you can read and then see.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-wrap gap-2"
            >
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/65"
                >
                  {category}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <p className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-glory-gold">
              Gallery Preview
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="font-hero text-4xl leading-none text-white">8</p>
                <p className="mt-1 font-body text-xs uppercase tracking-[0.18em] text-white/45">
                  Featured Frames
                </p>
              </div>
              <div>
                <p className="font-hero text-4xl leading-none text-white">
                  {categories.length}
                </p>
                <p className="mt-1 font-body text-xs uppercase tracking-[0.18em] text-white/45">
                  Visual Themes
                </p>
              </div>
            </div>
            <p className="mt-5 font-body text-sm leading-relaxed text-white/55">
              Open any frame for a closer look, or jump into the full gallery
              page to turn this preview into a deeper visual archive.
            </p>
            <Link
              href="/gallery"
              className="group mt-6 inline-flex items-center gap-2 rounded-xl border border-glory-gold/30 bg-glory-gold/10 px-5 py-3 font-body text-sm font-semibold text-glory-gold transition-all duration-200 hover:bg-glory-gold/20"
            >
              Explore Full Gallery
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainer}
          className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
        >
          {/* This layout is intentionally hand-curated rather than `.map()`ed in
              one loop so the ending gallery feels editorial instead of uniform. */}
          <div className="grid gap-4">
            <GalleryCard
              image={GALLERY_PREVIEW_IMAGES[0]}
              onClick={() => setLightboxImage(GALLERY_PREVIEW_IMAGES[0])}
              priority
              className="border border-white/10 bg-white/5 shadow-2xl"
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <GalleryCard
                image={GALLERY_PREVIEW_IMAGES[5]}
                onClick={() => setLightboxImage(GALLERY_PREVIEW_IMAGES[5])}
                className="border border-white/10"
              />
              <GalleryCard
                image={GALLERY_PREVIEW_IMAGES[6]}
                onClick={() => setLightboxImage(GALLERY_PREVIEW_IMAGES[6])}
                className="border border-white/10"
              />
              <GalleryCard
                image={GALLERY_PREVIEW_IMAGES[7]}
                onClick={() => setLightboxImage(GALLERY_PREVIEW_IMAGES[7])}
                className="border border-white/10 sm:col-span-2 xl:col-span-1"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <GalleryCard
              image={GALLERY_PREVIEW_IMAGES[1]}
              onClick={() => setLightboxImage(GALLERY_PREVIEW_IMAGES[1])}
              priority
              className="border border-white/10 sm:col-span-2"
            />
            <GalleryCard
              image={GALLERY_PREVIEW_IMAGES[2]}
              onClick={() => setLightboxImage(GALLERY_PREVIEW_IMAGES[2])}
              className="border border-white/10"
            />
            <GalleryCard
              image={GALLERY_PREVIEW_IMAGES[3]}
              onClick={() => setLightboxImage(GALLERY_PREVIEW_IMAGES[3])}
              className="border border-white/10"
            />
            <GalleryCard
              image={GALLERY_PREVIEW_IMAGES[4]}
              onClick={() => setLightboxImage(GALLERY_PREVIEW_IMAGES[4])}
              className="border border-white/10 sm:col-span-2"
            />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-2xl font-body text-sm leading-relaxed text-white/45">
            Landscapes, skylines, institutions, and industry. The gallery ends
            the homepage with tangible places rather than abstractions.
          </p>
          <Link
            href="/gallery"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-glory-gold/30 bg-glory-gold/10 px-8 py-4 font-body text-base font-semibold text-glory-gold transition-all duration-200 hover:bg-glory-gold/20 md:justify-start"
          >
            View All Photos
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>

      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </section>
  );
}
