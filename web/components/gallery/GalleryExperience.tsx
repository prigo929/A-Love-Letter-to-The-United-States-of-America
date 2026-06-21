"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { StaticImageData } from "next/image";
import { Camera, ChevronLeft, ChevronRight, Download, Grid3X3, Home, MapPin, X, ZoomIn, ZoomOut } from "lucide-react";
import type { GalleryCategory, GalleryImage } from "@/lib/data/gallery";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";

type GalleryCopy = {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  description: string;
  featured: string;
  collection: string;
  allLabel: string;
  close: string;
  location: string;
  theme: string;
};

type GalleryExperienceProps = {
  images: GalleryImage[];
  categories: readonly GalleryCategory[];
  heroImage: {
    path: string;
    src: StaticImageData;
  };
  copy: GalleryCopy;
};

function categoryLabel(category: GalleryCategory, allLabel: string) {
  return category === "All" ? allLabel : category;
}



function GalleryTile({
  image,
  onSelect,
}: {
  image: GalleryImage;
  onSelect: (image: GalleryImage) => void;
}) {
  const aspect =
    image.orientation === "portrait"
      ? "aspect-[2/3]"
      : image.orientation === "square"
        ? "aspect-square"
        : "aspect-[16/10]";

  // 3D tilt: the frame leans toward the cursor like a handled print.
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 260, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 260, damping: 20 });

  const handleTilt = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 6);
    rotateX.set(py * -6);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.button
      layout
      type="button"
      onClick={() => onSelect(image)}
      onPointerMove={handleTilt}
      onPointerLeave={resetTilt}
      style={
        prefersReducedMotion
          ? undefined
          : { rotateX: springRX, rotateY: springRY, transformPerspective: 900 }
      }
      className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] text-left"
    >
      <motion.div layoutId={`gallery-${image.path}`} className={cn("relative overflow-hidden", aspect)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.025] group-hover:brightness-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="mb-2 w-fit max-w-full truncate rounded-full bg-white/10 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur">
            {image.subcategory
              ? `${image.category} / ${image.subcategory}`
              : image.category}
          </p>
          <h3 className="line-clamp-2 font-display text-lg leading-tight text-white md:text-xl">
            {image.caption}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 font-body text-xs text-white/55">
            <MapPin className="h-3 w-3 text-glory-gold" aria-hidden="true" />
            <span className="truncate">{image.location}</span>
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}

function ImageDialog({
  image,
  copy,
  onClose,
  onPrev,
  onNext,
}: {
  image: GalleryImage;
  copy: GalleryCopy;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);

  // Keyboard: Escape closes, arrows move through the filtered collection.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onPrev, onNext]);

  // Reset zoom whenever the focused image changes.
  useEffect(() => {
    setZoomed(false);
  }, [image.path]);

  // Lock background scroll while the lightbox is open (the dialog only mounts
  // when open, so mount/unmount toggles the lock). Lock html + body and
  // compensate the scrollbar width to avoid a layout shift.
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    const prevPad = body.style.paddingRight;
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      body.style.paddingRight = prevPad;
    };
  }, []);

  const downloadName = image.path.split("/").pop() ?? "image.jpg";
  const downloadHref =
    typeof image.src === "string" ? image.src : image.src.src;

  return (
    <AnimatePresence>
      <motion.div
        key="gallery-dialog-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        key="gallery-dialog-panel"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-3 z-50 grid overflow-hidden rounded-lg border border-white/10 bg-[#070911] shadow-2xl md:inset-8 lg:grid-cols-[minmax(0,1.35fr)_420px]"
        role="dialog"
        aria-modal="true"
        aria-label={image.caption}
      >
        {/* Action buttons: download · zoom · close */}
        <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
          <a
            href={downloadHref}
            download={downloadName}
            onClick={(e) => e.stopPropagation()}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/55 text-white/80 backdrop-blur transition hover:bg-black/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold"
            aria-label="Download image"
            title="Download"
          >
            <Download className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setZoomed((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/55 text-white/80 backdrop-blur transition hover:bg-black/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold"
            aria-label={zoomed ? "Zoom out" : "Zoom in"}
            aria-pressed={zoomed}
            title={zoomed ? "Zoom out" : "Zoom in"}
          >
            {zoomed ? <ZoomOut className="h-5 w-5" aria-hidden="true" /> : <ZoomIn className="h-5 w-5" aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/55 text-white/80 backdrop-blur transition hover:bg-black/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold"
            aria-label={copy.close}
            title={copy.close}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <motion.div layoutId={`gallery-${image.path}`} className="relative h-[58vh] overflow-hidden bg-black lg:h-full">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={image.path}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={zoomed ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn(
                "absolute inset-0",
                zoomed && "cursor-grab active:cursor-grabbing",
              )}
              drag={zoomed}
              dragMomentum={false}
              dragElastic={0.05}
              dragConstraints={{ left: -600, right: 600, top: -400, bottom: 400 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                draggable={false}
                onClick={() => setZoomed((v) => !v)}
                className={cn(
                  "object-contain transition-transform duration-300",
                  zoomed ? "scale-[1.9] cursor-zoom-out" : "cursor-zoom-in",
                )}
                sizes="(max-width: 1024px) 100vw, 75vw"
                quality={90}
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Prev / next */}
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white/75 backdrop-blur transition hover:bg-black/75 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white/75 backdrop-blur transition hover:bg-black/75 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </motion.div>

        <aside className="overflow-y-auto px-6 py-8 md:px-8 lg:py-10">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-glory-gold">
            {image.category}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-white">
            {image.caption}
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                {copy.location}
              </p>
              <p className="mt-1 font-body text-sm text-white/80">
                {image.location}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                {copy.theme}
              </p>
              <p className="mt-1 font-body text-sm text-white/80">
                {image.theme}
              </p>
            </div>
          </div>
          <p className="mt-6 font-body text-sm leading-7 text-white/64">
            {image.description}
          </p>
        </aside>
      </motion.div>
    </AnimatePresence>
  );
}

const ORIENTATION_GROUPS = [
  { key: "landscape", label: "Landscape Frames" },
  { key: "portrait", label: "Portrait Frames" },
  { key: "square", label: "Square Frames" },
] as const;

function getGridClass(orientation: GalleryImage["orientation"]) {
  if (orientation === "portrait") {
    return "grid-cols-2 md:grid-cols-3 xl:grid-cols-5";
  }

  if (orientation === "square") {
    return "grid-cols-2 md:grid-cols-3 xl:grid-cols-4";
  }

  return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
}

export function GalleryExperience({
  images,
  categories,
  heroImage,
  copy,
}: GalleryExperienceProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = useMemo(
    () =>
      activeCategory === "All"
        ? images
        : images.filter((image) => image.category === activeCategory),
    [activeCategory, images],
  );

  const groupedImages = useMemo(
    () =>
      ORIENTATION_GROUPS.map((group) => ({
        ...group,
        images: filteredImages.filter(
          (image) => image.orientation === group.key,
        ),
      })).filter((group) => group.images.length > 0),
    [filteredImages],
  );



  // Flat display order for keyboard / arrow navigation inside the lightbox.
  const orderedImages = useMemo(
    () => groupedImages.flatMap((group) => group.images),
    [groupedImages],
  );

  const stepImage = useCallback(
    (direction: 1 | -1) => {
      setSelectedImage((current) => {
        if (!current || orderedImages.length === 0) return current;
        const idx = orderedImages.findIndex((img) => img.path === current.path);
        const nextIdx =
          (idx + direction + orderedImages.length) % orderedImages.length;
        return orderedImages[nextIdx] ?? current;
      });
    },
    [orderedImages],
  );

  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <section className="relative min-h-[60svh] overflow-hidden px-4 pb-14 pt-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={heroImage.src}
            alt="Chicago skyline and street grid at sunset"
            fill
            className="object-cover saturate-125"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black" />
          <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black via-black/75 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#05070d] via-[#05070d]/85 to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(60svh-9.5rem)] max-w-screen-xl flex-col justify-end">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-1.5 font-body text-sm text-white/60"
          >
            <Link
              href="/"
              className="flex items-center gap-1 transition-colors hover:text-white"
            >
              <Home className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
            <ChevronRight className="h-3 w-3 opacity-40" aria-hidden="true" />
            <span className="font-medium text-white" aria-current="page">
              {copy.breadcrumb}
            </span>
          </nav>

          <div className="max-w-3xl">
            <p className="section-eyebrow">{copy.eyebrow}</p>
            <h1 className="mt-3 font-display text-h1 leading-none text-white">
              {copy.title}
            </h1>
            <p className="mt-5 font-body text-base leading-7 text-white/64 md:text-lg">
              {copy.description}
            </p>

            <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
                <Camera
                  className="mb-4 h-5 w-5 text-glory-gold"
                  aria-hidden="true"
                />
                <p className="font-hero text-4xl leading-none text-white">
                  {images.length}
                </p>
                <p className="mt-1 font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                  {copy.collection}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
                <Grid3X3
                  className="mb-4 h-5 w-5 text-glory-gold"
                  aria-hidden="true"
                />
                <p className="font-hero text-4xl leading-none text-white">
                  {categories.length - 1}
                </p>
                <p className="mt-1 font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                  {copy.featured}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#080b13] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-screen-xl gap-2 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "shrink-0 rounded-lg border px-4 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.16em] transition",
                activeCategory === category
                  ? "border-glory-gold/60 bg-glory-gold/15 text-glory-gold"
                  : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white",
              )}
            >
              {categoryLabel(category, copy.allLabel)}
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl space-y-14">
          {groupedImages.map((group) => (
            <section key={group.key} aria-labelledby={`${group.key}-heading`}>
              <div className="mb-5 flex items-end justify-between gap-4 border-b border-white/10 pb-3">
                <h2
                  id={`${group.key}-heading`}
                  className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-white/50"
                >
                  {group.label}
                </h2>
                <p className="font-mono text-xs text-white/35">
                  {group.images.length.toString().padStart(2, "0")}
                </p>
              </div>
              <motion.div
                layout
                className={cn("grid gap-4", getGridClass(group.key))}
              >
                <AnimatePresence mode="popLayout">
                  {group.images.map((image) => (
                    <GalleryTile
                      key={image.path}
                      image={image}
                      onSelect={setSelectedImage}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </section>
          ))}
        </div>
      </section>

      {selectedImage && (
        <ImageDialog
          image={selectedImage}
          copy={copy}
          onClose={() => setSelectedImage(null)}
          onPrev={() => stepImage(-1)}
          onNext={() => stepImage(1)}
        />
      )}
    </main>
  );
}
