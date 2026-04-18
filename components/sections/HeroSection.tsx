"use client";

// ─── Hero Section ─────────────────────────────────────────────────────────────
// Full-viewport cinematic hero with:
//  • 5-image crossfade carousel (6s per image)
//  • Animated particle stars canvas
//  • Parallax text on scroll
//  • Staggered text reveal on mount
//  • Two CTA buttons
//  • Animated scroll indicator
//
// Beginner guide:
// - The rotating hero images come from `HERO_IMAGES` in lib/constants.ts
// - The actual image files live in /IMAGES and are registered in lib/site-images.ts
// - So the usual image change path is: IMAGES -> site-images.ts -> constants.ts
//
// `use client` is required because this section depends on browser-only APIs:
// timers, canvas drawing, and scroll-based animation.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronDown, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  heroContainer,
  heroTitle,
  heroSubtitle,
  heroCTA,
} from "@/lib/animations";
import { getSiteTagline, HERO_IMAGES } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

// ─── Particle Stars Canvas ────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to full viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create stars
    const STAR_COUNT = 120;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
      offset: Math.random() * Math.PI * 2,
    }));

    let frame: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Twinkle: sinusoidal opacity
        const twinkle = (Math.sin(t * star.speed * 10 + star.offset) + 1) / 2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${twinkle * 0.7 + 0.1})`;
        ctx.fill();
      });

      t++;
      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}

// ─── Hero Component ───────────────────────────────────────────────────────────

export function HeroSection() {
  // Local component state: which image in the slideshow is currently active.
  const [currentImage, setCurrentImage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();
  const copy =
    locale === "ro"
      ? {
          eyebrow: "Fondată în 1776 · Povestea Americii",
          titleLines: ["STATELE", "UNITE", "ALE AMERICII"],
          exploreCta: "Explorează Națiunea",
          allSectionsCta: "Vezi Toate Secțiunile",
          imageAlts: [
            "Declarația de Independență și simboluri ale fondării Statelor Unite",
            "Podul Golden Gate peste golful San Francisco",
            "Lansare SpaceX pe cerul Floridei",
            "Linia orizontului din New York la apus",
            "Statele Unite noaptea, văzute din spațiu",
          ],
        }
      : {
          eyebrow: "Est. 1776 · The American Story",
          titleLines: ["THE UNITED", "STATES", "OF AMERICA"],
          exploreCta: "Explore the Nation",
          allSectionsCta: "View All Sections",
          imageAlts: HERO_IMAGES.map((image) => image.alt),
        };

  // Parallax scroll:
  // Framer Motion reads the page scroll position and converts it into animated
  // values we can attach directly to styles below.
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, -120]);
  const bgY = useTransform(scrollY, [0, 600], [0, 160]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Image carousel — cycle every 6 seconds
  useEffect(() => {
    // setInterval runs in the browser and advances the slideshow repeatedly.
    const id = setInterval(() => {
      setCurrentImage((i) => (i + 1) % HERO_IMAGES.length);
    }, 6000);
    // Cleanup matters: without this, the timer would keep running after unmount.
    return () => clearInterval(id);
  }, []);

  // Convert the shared data format into the minimal shape this component needs.
  const images = HERO_IMAGES.map((img, index) => ({
    src: img.src,
    alt: copy.imageAlts[index] ?? img.alt,
  }));

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen-safe flex flex-col items-center justify-center overflow-hidden bg-navy-dark pt-24 md:pt-28 lg:pt-32"
      role="banner"
      aria-label="America: The Greatest Nation hero section"
    >
      {/* ── Background Image Carousel ────────────────────────────────────────
          Only one image is visible at a time. The fade animation is handled by
          AnimatePresence + motion.div. */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <AnimatePresence>
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImage].src}
              alt={images[currentImage].alt}
              fill
              priority={currentImage === 0}
              className="object-cover"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              sizes="100vw"
              quality={85}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Gradient Overlay ─────────────────────────────────────────────────
          This darkens the photo so white text stays readable on top of it. */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,10,30,0.90) 0%, rgba(60,59,110,0.70) 40%, rgba(139,26,38,0.60) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom fade into next section
          This softens the transition from the hero into the darker section below. */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[2]"
        style={{
          background: "linear-gradient(to bottom, transparent, #0d1117)",
        }}
        aria-hidden="true"
      />

      {/* ── Particle Stars ─────────────────────────────────────────────────── */}
      <ParticleCanvas />

      {/* ── Hero Content ───────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-20 text-center px-4 sm:px-6 max-w-6xl mx-auto"
        style={{ y: textY }}
      >
        <motion.div
          variants={heroContainer}
          initial={false}
          animate="visible"
          className="flex flex-col items-center gap-6 md:gap-8"
        >
          {/* Eyebrow — Est. 1776 */}
          <motion.div
            variants={heroSubtitle}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-px bg-glory-gold" aria-hidden="true" />
            <span className="font-body text-xs md:text-sm text-glory-gold tracking-[0.35em] uppercase font-semibold">
              {copy.eyebrow}
            </span>
            <div className="w-12 h-px bg-glory-gold" aria-hidden="true" />
          </motion.div>

          {/* Main title.
              The big patriotic styling is intentionally hard-coded here because
              this headline is a custom art-directed treatment, not normal body text. */}
          <motion.h1
            variants={heroTitle}
            className="font-hero leading-none text-center"
            style={{
              fontSize: "clamp(56px, 11vw, 148px)",
              letterSpacing: "0.02em",
              fontFamily: '"Archivo Black", system-ui, sans-serif',
              textTransform: "uppercase",
            }}
            >
              {/* THE UNITED - Crisp White with Deep Cinematic Shadow */}
            <span
              style={{
                display: "block",
                color: "#FFFFFF",
                textShadow:
                  "0 4px 12px rgba(0,0,0,0.6), 0 12px 40px rgba(0,0,0,0.8)",
              }}
            >
              {copy.titleLines[0]}
            </span>

            {/* STATES - CSS-Only Red, White, and Blue Sweep */}
            <span
              style={{
                display: "block",
                fontWeight: 900,
                background:
                  "linear-gradient(90deg, #B31942 0%, #B31942 25%, #FFFFFF 45%, #FFFFFF 55%, #0A3161 75%, #0A3161 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0px 8px 16px rgba(0,0,0,0.7))",
                margin: "0.05em 0",
                lineHeight: "1.1",
              }}
            >
              {copy.titleLines[1]}
            </span>

            {/* OF AMERICA - Matching Top Text */}
            <span
              style={{
                display: "block",
                color: "#FFFFFF",
                textShadow:
                  "0 4px 12px rgba(0,0,0,0.6), 0 12px 40px rgba(0,0,0,0.8)",
              }}
            >
              {copy.titleLines[2]}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={heroSubtitle}
            className="font-display text-xl md:text-3xl lg:text-4xl text-white/85 italic font-normal max-w-3xl leading-relaxed"
          >
            {getSiteTagline(locale)}
          </motion.p>

          {/* Star row decoration */}
          <motion.div
            variants={heroSubtitle}
            className="flex items-center gap-2"
            aria-hidden="true"
          >
            {[...Array(13)].map((_, i) => (
              <Star
                key={i}
                className="text-glory-gold fill-glory-gold"
                style={{
                  width: i === 6 ? 20 : 12,
                  height: i === 6 ? 20 : 12,
                  opacity: i === 6 ? 1 : 0.6,
                }}
              />
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={heroCTA}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 w-full"
          >
            <Button href="/economy" variant="gold" size="xl">
              {copy.exploreCta}
            </Button>
            <Button href="/sitemap" variant="ghost" size="xl">
              {copy.allSectionsCta}
            </Button>
          </motion.div>

          {/* Image carousel indicators */}
          <motion.div
            variants={heroCTA}
            className="flex justify-center gap-2 mt-2 w-full"
            aria-label="Background image selection"
            role="tablist"
          >
            {images.map((img, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === currentImage}
                aria-label={`Show image: ${img.alt}`}
                onClick={() => setCurrentImage(i)}
                className={`h-0.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-glory-gold ${
                  i === currentImage
                    ? "w-8 bg-glory-gold"
                    : "w-3 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ───────────────────────────────────────────────── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          style={{ opacity }}
          className="flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-glory-gold" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
