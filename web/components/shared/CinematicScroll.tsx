"use client";

// ─── CinematicScroll ──────────────────────────────────────────────────────────
// Structural showpieces for the cinematic pages:
//
// HorizontalScrollBand — a pinned section where vertical scroll drives a
//   horizontal pan across full-height panels (documentary timeline feel).
//   Desktop-only by design; pair it with a stacked fallback behind a
//   `hidden lg:block` / `lg:hidden` split at the call site.
//
// ScrollytellPin — media column pins to the viewport while narrative text
//   scrolls past it. Pure CSS sticky, so it degrades gracefully everywhere.

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn, BLUR_PLACEHOLDER } from "@/lib/utils";

export function HorizontalScrollBand({
  children,
  panels,
  className,
}: {
  children: React.ReactNode;
  panels: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Pan the track by (panels - 1) viewport-widths across the pinned stretch.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((panels - 1) / panels) * 100}%`],
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={{ height: `${panels * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x, width: `${panels * 100}%` }}
          className="flex h-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export function ScrollytellPin({
  imageSrc,
  imageAlt,
  reverse = false,
  children,
  className,
}: {
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-10 lg:grid-cols-2 lg:gap-16 items-start",
        className,
      )}
    >
      <div
        className={cn(
          "relative lg:sticky lg:top-24 aspect-[4/3] overflow-hidden rounded-3xl border border-white/10",
          reverse && "lg:order-2",
        )}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#030405]/70 via-transparent to-transparent pointer-events-none" />
      </div>
      <div className={cn("flex flex-col gap-12", reverse && "lg:order-1")}>
        {children}
      </div>
    </div>
  );
}
