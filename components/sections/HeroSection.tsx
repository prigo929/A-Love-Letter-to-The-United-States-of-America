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
} from "framer-motion";
import { ChevronDown, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatesVideoTitle } from "@/components/sections/StatesVideoTitle";
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

type ParticleLayer = "near" | "mid" | "far";
type ParticleShape = "dot" | "star";

type Particle = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
  alphaPulse: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  vx: number;
  vy: number;
  driftX: number;
  driftY: number;
  arcAmplitude: number;
  arcFrequency: number;
  arcOffset: number;
  blur: number;
  shape: ParticleShape;
  layer: ParticleLayer;
  colorIndex: number;
};

type ParticleTheme = {
  palette: [number, number, number][];
  accentOpacity: number;
};

const PARTICLE_THEMES: ParticleTheme[] = [
  { palette: [[255, 215, 120], [255, 238, 188], [214, 67, 67]], accentOpacity: 0.9 },
  { palette: [[255, 178, 96], [255, 225, 173], [203, 51, 51]], accentOpacity: 0.86 },
  { palette: [[214, 235, 255], [136, 192, 255], [255, 255, 255]], accentOpacity: 0.78 },
  { palette: [[255, 188, 111], [255, 227, 171], [209, 84, 84]], accentOpacity: 0.88 },
  { palette: [[205, 229, 255], [255, 255, 255], [120, 164, 255]], accentOpacity: 0.76 },
];

const LAYER_CONFIG = {
  near: {
    count: 24,
    size: [1.8, 3.8],
    alpha: [0.28, 0.72],
    pulse: [0.12, 0.32],
    speedX: [0.07, 0.18],
    speedY: [-0.56, -0.2],
    blur: [8, 18],
    parallax: 18,
    breathe: 0.018,
  },
  mid: {
    count: 44,
    size: [0.9, 2.2],
    alpha: [0.18, 0.5],
    pulse: [0.08, 0.22],
    speedX: [0.035, 0.115],
    speedY: [-0.32, -0.11],
    blur: [4, 10],
    parallax: 11,
    breathe: 0.012,
  },
  far: {
    count: 88,
    size: [0.35, 1.15],
    alpha: [0.06, 0.26],
    pulse: [0.03, 0.14],
    speedX: [0.012, 0.058],
    speedY: [-0.19, -0.045],
    blur: [0, 4],
    parallax: 5,
    breathe: 0.008,
  },
} as const;

const HERO_PARTICLE_ZONES = [
  // These weighted zones let us place more particles around the outer parts
  // of the hero and fewer directly over the main title.
  { x: [0.06, 0.22], y: [0.14, 0.52], weight: 1.25 },
  { x: [0.78, 0.94], y: [0.12, 0.5], weight: 1.25 },
  { x: [0.24, 0.38], y: [0.08, 0.28], weight: 0.8 },
  { x: [0.62, 0.76], y: [0.08, 0.28], weight: 0.8 },
  { x: [0.12, 0.34], y: [0.58, 0.92], weight: 1.05 },
  { x: [0.66, 0.9], y: [0.58, 0.92], weight: 1.05 },
  { x: [0.38, 0.62], y: [0.66, 0.98], weight: 0.72 },
  { x: [0.02, 0.98], y: [0.02, 0.98], weight: 0.45 },
] as const;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function lerpColor(
  start: [number, number, number],
  end: [number, number, number],
  amount: number,
): [number, number, number] {
  return [
    lerp(start[0], end[0], amount),
    lerp(start[1], end[1], amount),
    lerp(start[2], end[2], amount),
  ];
}

function getDesktopDensityMultiplier(width: number) {
  if (width >= 1600) return 1.32;
  if (width >= 1280) return 1.2;
  if (width >= 1024) return 1.1;
  return 1;
}

function pickWeightedZone() {
  // Pick one zone randomly, but let higher-weight zones win more often.
  const totalWeight = HERO_PARTICLE_ZONES.reduce((sum, zone) => sum + zone.weight, 0);
  let roll = Math.random() * totalWeight;

  for (const zone of HERO_PARTICLE_ZONES) {
    roll -= zone.weight;
    if (roll <= 0) return zone;
  }

  return HERO_PARTICLE_ZONES[HERO_PARTICLE_ZONES.length - 1];
}

function createParticle(
  layer: ParticleLayer,
  width: number,
  height: number,
): Particle {
  // Start by picking where on screen this particle should be born.
  const config = LAYER_CONFIG[layer];
  const zone = pickWeightedZone();
  const x = randomBetween(zone.x[0] * width, zone.x[1] * width);
  const y = randomBetween(zone.y[0] * height, zone.y[1] * height);

  // Pick the particle shape.
  // Nearer layers get slightly more stars so the foreground feels richer.
  const shapeRoll = Math.random();
  const shape: ParticleShape =
    layer === "near"
      ? shapeRoll > 0.9
        ? "star"
        : "dot"
      : layer === "mid"
        ? shapeRoll > 0.94
          ? "star"
          : "dot"
        : shapeRoll > 0.975
          ? "star"
          : "dot";
  const colorIndex =
    shape === "star"
      ? Math.floor(Math.random() * 2)
      : Math.floor(Math.random() * 3);

  return {
    baseX: x,
    baseY: y,
    x,
    y,
    size: randomBetween(config.size[0], config.size[1]),
    alpha: randomBetween(config.alpha[0], config.alpha[1]),
    alphaPulse: randomBetween(config.pulse[0], config.pulse[1]),
    twinkleSpeed: randomBetween(0.3, 1.4),
    twinkleOffset: randomBetween(0, Math.PI * 2),
    vx: randomBetween(config.speedX[0], config.speedX[1]),
    vy: randomBetween(config.speedY[0], config.speedY[1]),
    driftX: randomBetween(6, 26),
    driftY: randomBetween(4, 16),
    arcAmplitude: Math.random() > 0.72 ? randomBetween(8, 28) : randomBetween(1, 8),
    arcFrequency: randomBetween(0.15, 0.55),
    arcOffset: randomBetween(0, Math.PI * 2),
    blur: randomBetween(config.blur[0], config.blur[1]),
    shape,
    layer,
    colorIndex,
  };
}

function respawnParticle(particle: Particle, width: number, height: number) {
  // When a particle drifts too far away, recycle it instead of creating a
  // totally new object. This is cheaper for the browser.
  const next = createParticle(particle.layer, width, height);
  Object.assign(particle, next, {
    baseY: height + randomBetween(12, 120),
    y: height + randomBetween(12, 120),
  });
}

function ParticleCanvas({ currentImage }: { currentImage: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef<ParticleTheme>({
    palette: PARTICLE_THEMES[0].palette.map((color) => [...color] as [number, number, number]),
    accentOpacity: PARTICLE_THEMES[0].accentOpacity,
  });
  const targetThemeRef = useRef<ParticleTheme>(PARTICLE_THEMES[0]);
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const viewportSizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    // Each hero slide has its own particle color palette.
    // When the background image changes, aim for the matching palette.
    targetThemeRef.current = PARTICLE_THEMES[currentImage % PARTICLE_THEMES.length];
  }, [currentImage]);

  const drawStar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    outerRadius: number,
  ) => {
    const spikes = 5;
    const innerRadius = outerRadius * 0.44;
    let rotation = -Math.PI / 2;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(x, y - outerRadius);

    for (let i = 0; i < spikes; i += 1) {
      ctx.lineTo(
        x + Math.cos(rotation) * outerRadius,
        y + Math.sin(rotation) * outerRadius,
      );
      rotation += step;
      ctx.lineTo(
        x + Math.cos(rotation) * innerRadius,
        y + Math.sin(rotation) * innerRadius,
      );
      rotation += step;
    }

    ctx.closePath();
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    const allowMouseParallax =
      typeof window.matchMedia !== "function"
        ? true
        : window.matchMedia("(pointer: fine)").matches;

    const syncParticleDensity = (width: number, height: number) => {
      let particleIndex = 0;
      const densityMultiplier = getDesktopDensityMultiplier(width);

      (Object.keys(LAYER_CONFIG) as ParticleLayer[]).forEach((layer) => {
        const targetCount = Math.round(LAYER_CONFIG[layer].count * densityMultiplier);
        const currentLayerParticles = particles.filter((particle) => particle.layer === layer).length;

        for (let i = currentLayerParticles; i < targetCount; i += 1) {
          particles.push(createParticle(layer, width, height));
        }

        particleIndex += targetCount;
      });

      if (particles.length > particleIndex) {
        particles.splice(particleIndex);
      }
    };

    const resize = () => {
      // Match the canvas to the full browser window so the particles cover
      // the whole hero section.
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const previousWidth = viewportSizeRef.current.width;
      const previousHeight = viewportSizeRef.current.height;

      canvas.width = nextWidth;
      canvas.height = nextHeight;

      // On mobile, the browser chrome changes the viewport height while you
      // scroll. Rebuilding the whole field on every tiny height change makes
      // the particles appear to "restart", so we rescale them instead.
      if (!particles.length || !previousWidth || !previousHeight) {
        particles.length = 0;
        syncParticleDensity(nextWidth, nextHeight);
      } else {
        const widthRatio = nextWidth / previousWidth;
        const heightRatio = nextHeight / previousHeight;

        particles.forEach((particle) => {
          particle.baseX *= widthRatio;
          particle.x *= widthRatio;
          particle.baseY *= heightRatio;
          particle.y *= heightRatio;
        });

        syncParticleDensity(nextWidth, nextHeight);
      }

      viewportSizeRef.current = { width: nextWidth, height: nextHeight };
    };

    resize();

    window.addEventListener("resize", resize);

    const handlePointerMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      pointerRef.current.targetX = x;
      pointerRef.current.targetY = y;
    };

    const handlePointerLeave = () => {
      pointerRef.current.targetX = 0;
      pointerRef.current.targetY = 0;
    };

    if (allowMouseParallax) {
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("mouseleave", handlePointerLeave);
    }

    let frame: number;
    let lastTime = performance.now();

    const draw = (time: number) => {
      // `delta` keeps the animation from jumping too far if the browser slows
      // down for a moment between frames.
      const delta = Math.min((time - lastTime) / 16.6667, 2.4);
      lastTime = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth the mouse input so the particle field feels cinematic instead
      // of twitchy.
      const pointer = pointerRef.current;
      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      const breathe = Math.sin(time * 0.00018);
      const theme = themeRef.current;
      const targetTheme = targetThemeRef.current;
      theme.accentOpacity = lerp(theme.accentOpacity, targetTheme.accentOpacity, 0.035);
      theme.palette = theme.palette.map((color, index) =>
        lerpColor(color, targetTheme.palette[index] ?? targetTheme.palette[0], 0.035),
      ) as [number, number, number][];

      particles.forEach((particle, index) => {
        const config = LAYER_CONFIG[particle.layer];

        // Move the particle forward through the scene.
        particle.baseX += particle.vx * delta;
        particle.baseY += particle.vy * delta;

        if (
          particle.baseY < -140 ||
          particle.baseX > canvas.width + 120 ||
          particle.baseX < -120
        ) {
          respawnParticle(particle, canvas.width, canvas.height);
        }

        // Build the final position from several small motions layered together:
        // - the main drift
        // - a side-to-side sway
        // - an occasional arc
        // - a slow global breathing motion
        // - a subtle mouse parallax offset
        const arc = Math.sin(time * 0.001 * particle.arcFrequency + particle.arcOffset) * particle.arcAmplitude;
        const swayX = Math.sin(time * 0.00055 + index * 0.23) * particle.driftX;
        const swayY = Math.cos(time * 0.0004 + index * 0.19) * particle.driftY;
        const breatheScale = 1 + breathe * config.breathe;
        const parallaxX = pointer.x * config.parallax;
        const parallaxY = pointer.y * config.parallax * 0.7;

        particle.x =
          canvas.width / 2 +
          (particle.baseX + swayX + arc - canvas.width / 2) * breatheScale +
          parallaxX;
        particle.y =
          canvas.height / 2 +
          (particle.baseY + swayY - canvas.height / 2) * breatheScale +
          parallaxY;

        const twinkle =
          particle.alpha +
          ((Math.sin(time * 0.001 * particle.twinkleSpeed + particle.twinkleOffset) + 1) / 2) *
            particle.alphaPulse;
        const alpha = Math.min(twinkle * theme.accentOpacity, 0.95);
        const rgb = theme.palette[particle.colorIndex % theme.palette.length];
        const rgbString = `${Math.round(rgb[0])}, ${Math.round(rgb[1])}, ${Math.round(rgb[2])}`;

        ctx.save();
        ctx.fillStyle = `rgba(${rgbString}, ${alpha})`;
        ctx.strokeStyle = `rgba(${rgbString}, ${Math.min(alpha + 0.08, 1)})`;
        ctx.shadowBlur = particle.blur;
        ctx.shadowColor = `rgba(${rgbString}, ${Math.min(alpha + 0.15, 1)})`;

        if (particle.shape === "dot") {
          // Dots are the main soft-glow particles.
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Stars are rarer accents that add more visual sparkle.
          drawStar(
            ctx,
            particle.x,
            particle.y,
            Math.max(particle.size * (particle.layer === "far" ? 1.5 : 2.1), 1.4),
          );
        }

        ctx.restore();
      });

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      if (allowMouseParallax) {
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("mouseleave", handlePointerLeave);
      }
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
  const titleShadow =
    "0 2px 4px rgba(0,0,0,0.38), 0 6px 14px rgba(0,0,0,0.3), 0 12px 32px rgba(0,0,0,0.24)";
  const titleLineStyle = {
    display: "block",
    textShadow: titleShadow,
  } as const;
  return (
    <div
      ref={containerRef}
      className="relative min-h-screen-safe flex flex-col items-center justify-center overflow-hidden bg-navy-dark pt-24 md:pt-28 lg:pt-32"
      role="banner"
      aria-label="America: The Greatest Nation hero section"
    >
      {/* ── Background Image Carousel ────────────────────────────────────────
          Render all images and fade their opacity to avoid load flickering during transitions. */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: index === 0 ? 1 : 0 }}
            animate={{ opacity: index === currentImage ? 1 : 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={index === 0}
              className="object-cover"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              sizes="100vw"
              quality={85}
            />
          </motion.div>
        ))}
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
      <ParticleCanvas currentImage={currentImage} />

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
            <span style={{ ...titleLineStyle, color: "#FFFFFF" }}>
              {copy.titleLines[0]}
            </span>

            <StatesVideoTitle text={copy.titleLines[1]} shadow={titleShadow} />

            {/* OF AMERICA - Matching Top Text */}
            <span style={{ ...titleLineStyle, color: "#FFFFFF" }}>
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
