"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { StaticImageData } from "next/image";
import {
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  FileCode,
  Grid3X3,
  Home,
  Layers,
  MapPin,
  Search,
  Shield,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { GalleryCategory, GalleryImage } from "@/lib/data/gallery";
import type { PublicAsset, PublicAssetCategory } from "@/lib/data/public-assets";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";

type GalleryCopy = {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  description: string;
  featured: string;
  collection: string;
  publicCollection?: string;
  allLabel: string;
  close: string;
  location: string;
  theme: string;
  photosTab?: string;
  assetsTab?: string;
  searchAssets?: string;
  downloadAsset?: string;
  copyPath?: string;
  pathCopied?: string;
};

type GalleryExperienceProps = {
  images: GalleryImage[];
  categories: readonly GalleryCategory[];
  publicAssets?: PublicAsset[];
  publicAssetCategories?: readonly PublicAssetCategory[];
  heroImage: {
    path: string;
    src: StaticImageData;
  };
  copy: GalleryCopy;
};

function categoryLabel(category: string, allLabel: string) {
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

function PublicAssetTile({
  asset,
  onSelect,
  copy,
}: {
  asset: PublicAsset;
  onSelect: (asset: PublicAsset) => void;
  copy: GalleryCopy;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyPath = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(asset.path);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:border-glory-gold/50 hover:bg-white/[0.06]"
    >
      <button
        type="button"
        onClick={() => onSelect(asset)}
        className="flex h-36 w-full items-center justify-center p-3 focus:outline-none"
      >
        <div className="relative h-full w-full">
          <Image
            src={asset.path}
            alt={asset.name}
            fill
            unoptimized={asset.type === "svg"}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />
        </div>
      </button>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-medium text-white group-hover:text-glory-gold">
            {asset.name}
          </p>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-white/70">
              {asset.type}
            </span>
            <span className="truncate font-body text-[10px] text-white/40">
              {asset.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleCopyPath}
            title={copy.copyPath || "Copy path"}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-black/40 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
          <a
            href={asset.path}
            download
            title={copy.downloadAsset || "Download asset"}
            onClick={(e) => e.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-black/40 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <Download className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
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

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    setZoomed(false);
  }, [image.path]);

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

function PublicAssetDialog({
  asset,
  copy,
  onClose,
}: {
  asset: PublicAsset;
  copy: GalleryCopy;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleCopyPath = () => {
    navigator.clipboard.writeText(asset.path);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="asset-dialog-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        key="asset-dialog-panel"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-4 z-50 m-auto flex max-h-[85vh] max-w-2xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#070911] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={asset.name}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-glory-gold">
              {asset.category}
            </span>
            <h2 className="font-display text-xl text-white">{asset.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-white/10 p-2 text-white/70 transition hover:bg-white/20 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative flex min-h-[300px] items-center justify-center bg-black/60 p-8">
          <div className="relative h-64 w-full">
            <Image
              src={asset.path}
              alt={asset.name}
              fill
              unoptimized={asset.type === "svg"}
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-[#0a0d17] px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="rounded bg-glory-gold/20 px-2 py-1 font-mono text-xs font-semibold text-glory-gold uppercase">
              {asset.type}
            </span>
            <span className="font-mono text-xs text-white/60 truncate max-w-xs">
              {asset.path}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyPath}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 font-body text-xs font-semibold text-white transition hover:bg-white/10"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? copy.pathCopied || "Copied!" : copy.copyPath || "Copy path"}</span>
            </button>
            <a
              href={asset.path}
              download
              className="flex items-center gap-1.5 rounded-lg bg-glory-gold px-4 py-2 font-body text-xs font-semibold text-black transition hover:bg-glory-gold/90"
            >
              <Download className="h-4 w-4" />
              <span>{copy.downloadAsset || "Download Asset"}</span>
            </a>
          </div>
        </div>
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
  publicAssets = [],
  publicAssetCategories = [],
  heroImage,
  copy,
}: GalleryExperienceProps) {
  const [activeTab, setActiveTab] = useState<"photos" | "assets">("photos");
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [activeAssetCategory, setActiveAssetCategory] = useState<PublicAssetCategory>("All");
  const [assetSearchQuery, setAssetSearchQuery] = useState("");

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<PublicAsset | null>(null);

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

  const filteredPublicAssets = useMemo(() => {
    return publicAssets.filter((asset) => {
      const matchesCategory =
        activeAssetCategory === "All" || asset.category === activeAssetCategory;
      const matchesSearch =
        !assetSearchQuery ||
        asset.name.toLowerCase().includes(assetSearchQuery.toLowerCase()) ||
        asset.path.toLowerCase().includes(assetSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [publicAssets, activeAssetCategory, assetSearchQuery]);

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
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/25 to-black/45" />
          <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black via-black/75 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#05070d]/80 via-[#05070d]/35 to-transparent" />
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
            <p className="mt-5 font-body text-base leading-7 text-white/90 md:text-lg">
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
                <Layers
                  className="mb-4 h-5 w-5 text-glory-gold"
                  aria-hidden="true"
                />
                <p className="font-hero text-4xl leading-none text-white">
                  {publicAssets.length}
                </p>
                <p className="mt-1 font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
                  {copy.publicCollection || "Graphic Assets"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Mode Segment Switcher */}
      <section className="border-y border-white/10 bg-[#080b13] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("photos")}
              className={cn(
                "flex items-center gap-2 rounded-md px-4 py-2 font-body text-xs font-semibold uppercase tracking-wider transition",
                activeTab === "photos"
                  ? "bg-glory-gold text-black shadow-md"
                  : "text-white/60 hover:text-white"
              )}
            >
              <Camera className="h-4 w-4" />
              <span>{copy.photosTab || "Photo Archive"} ({images.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("assets")}
              className={cn(
                "flex items-center gap-2 rounded-md px-4 py-2 font-body text-xs font-semibold uppercase tracking-wider transition",
                activeTab === "assets"
                  ? "bg-glory-gold text-black shadow-md"
                  : "text-white/60 hover:text-white"
              )}
            >
              <Layers className="h-4 w-4" />
              <span>{copy.assetsTab || "Public & Graphic Assets"} ({publicAssets.length})</span>
            </button>
          </div>

          {activeTab === "assets" && (
            <div className="relative min-w-[260px] max-w-md flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={assetSearchQuery}
                onChange={(e) => setAssetSearchQuery(e.target.value)}
                placeholder={copy.searchAssets || "Search assets (e.g. I-95, Apple, Texas)..."}
                className="w-full rounded-lg border border-white/10 bg-white/[0.05] py-2 pl-10 pr-4 font-body text-xs text-white placeholder-white/40 focus:border-glory-gold focus:outline-none"
              />
              {assetSearchQuery && (
                <button
                  type="button"
                  onClick={() => setAssetSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Category Chips */}
        <div className="mx-auto mt-4 flex max-w-screen-xl gap-2 overflow-x-auto no-scrollbar">
          {activeTab === "photos"
            ? categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "shrink-0 rounded-lg border px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.16em] transition",
                    activeCategory === category
                      ? "border-glory-gold/60 bg-glory-gold/15 text-glory-gold"
                      : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white",
                  )}
                >
                  {categoryLabel(category, copy.allLabel)}
                </button>
              ))
            : publicAssetCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveAssetCategory(category)}
                  className={cn(
                    "shrink-0 rounded-lg border px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.16em] transition",
                    activeAssetCategory === category
                      ? "border-glory-gold/60 bg-glory-gold/15 text-glory-gold"
                      : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white",
                  )}
                >
                  {categoryLabel(category, copy.allLabel)}
                </button>
              ))}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        {activeTab === "photos" ? (
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
        ) : (
          <div className="mx-auto max-w-screen-xl">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-3">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-white/50">
                Showing {filteredPublicAssets.length} public asset{filteredPublicAssets.length === 1 ? "" : "s"}
              </p>
            </div>

            {filteredPublicAssets.length === 0 ? (
              <div className="py-20 text-center text-white/40">
                <FileCode className="mx-auto mb-3 h-10 w-10 opacity-30" />
                <p className="font-display text-lg">No assets match your search or filter.</p>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredPublicAssets.map((asset) => (
                    <PublicAssetTile
                      key={asset.id}
                      asset={asset}
                      onSelect={setSelectedAsset}
                      copy={copy}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        )}
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

      {selectedAsset && (
        <PublicAssetDialog
          asset={selectedAsset}
          copy={copy}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </main>
  );
}

