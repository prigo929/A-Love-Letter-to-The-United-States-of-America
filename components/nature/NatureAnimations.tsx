"use client";

// ─── Nature Animation Components ─────────────────────────────────────────────
// All interactive, animated, client-only elements for the Nature section.
// SITE_IMAGES is imported here for hero crossfade — local images = best quality.

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { SITE_IMAGES } from "@/lib/site-images";

// ─────────────────────────────────────────────────────────────────────────────
// 1. NatureHeroCrossfade — 5-slide crossfade with Ken-Burns zoom + dots
// ─────────────────────────────────────────────────────────────────────────────

// Uses local SITE_IMAGES for the best quality. Falls back to Unsplash only for
// Denali reflection (no local matching shot) and Yellowstone prismatic (local
// yellowstonePrismatic is better for this context).
const HERO_SLIDES = [
  { src: SITE_IMAGES.homeGrandCanyon,        alt: "Grand Canyon at sunrise",                   label: "Grand Canyon, Arizona"       },
  { src: SITE_IMAGES.denaliNationalPark,     alt: "Denali, highest peak in North America",     label: "Denali, Alaska"              },
  { src: SITE_IMAGES.yosemiteNationalPark,   alt: "Yosemite National Park valley",             label: "Yosemite, California"        },
  { src: SITE_IMAGES.yellowstonePrismatic,   alt: "Grand Prismatic Spring, Yellowstone",       label: "Yellowstone, Wyoming"        },
  { src: SITE_IMAGES.glacierNationalPark,    alt: "Glacier National Park alpine lakes",        label: "Glacier NP, Montana"         },
];

export function NatureHeroCrossfade({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy-dark">
      {HERO_SLIDES.map((slide, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            animate={i === current ? { scale: 1.06 } : { scale: 1 }}
            transition={{ duration: 6, ease: "linear" }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-navy-dark/60 via-transparent to-navy-dark/90" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy-dark/70 via-transparent to-transparent" />

      {/* Slide label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={current}
          className="absolute bottom-10 right-8 z-20 font-body text-xs uppercase tracking-[0.3em] text-white/40"
          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.5 }}
        >
          {HERO_SLIDES[current].label}
        </motion.p>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}
            className="h-1.5 overflow-hidden rounded-full transition-all duration-300"
            style={{ width: i === current ? 28 : 6 }}
          >
            <span className="block h-full w-full rounded-full bg-white transition-opacity" style={{ opacity: i === current ? 1 : 0.35 }} />
          </button>
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-10 bg-gradient-to-t from-navy-dark to-transparent" />

      <div className="relative z-20 flex min-h-screen items-end pb-24 pt-32">
        <div className="mx-auto max-w-screen-xl w-full px-4 sm:px-6 lg:px-8">{children}</div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ParallaxImageBand — scroll-linked full-width image divider
// ─────────────────────────────────────────────────────────────────────────────

interface ParallaxImageBandProps {
  imageSrc: string;
  imageAlt: string;
  children?: React.ReactNode;
  height?: number;
  overlayOpacity?: number;
}

export function ParallaxImageBand({ imageSrc, imageAlt, children, height = 420, overlayOpacity = 0.55 }: ParallaxImageBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height }}>
      <motion.div className="absolute inset-[-15%]" style={{ y }}>
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="100vw" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
      </motion.div>
      <div className="absolute inset-0" style={{ background: `rgba(13,17,23,${overlayOpacity})` }} />
      {children && <div className="absolute inset-0 z-10 flex items-center justify-center">{children}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. AnimatedStatWall — counting numbers animate on scroll
// ─────────────────────────────────────────────────────────────────────────────

interface StatWallItem {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  sub?: string;
  color?: string;
}

function CountUp({ value, prefix = "", suffix = "", decimals = 0, color = "#FFD700" }: {
  value: number; prefix?: string; suffix?: string; decimals?: number; color?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { if (ref.current) ref.current.textContent = prefix + v.toFixed(decimals) + suffix; },
    });
    return controls.stop;
  }, [inView, value, prefix, suffix, decimals, motionValue]);

  return <span ref={ref} className="font-hero tabular-nums" style={{ color }}>{prefix}0{suffix}</span>;
}

export function AnimatedStatWall({ stats }: { stats: StatWallItem[] }) {
  const cols = stats.length <= 3 ? "sm:grid-cols-3" : stats.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <motion.div
      className={`grid gap-px ${cols} bg-white/8 rounded-2xl overflow-hidden`}
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {stats.map((stat, i) => (
        <motion.div key={i}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
          className="flex flex-col items-center justify-center gap-2 p-8 text-center bg-navy-mid"
        >
          <p className="leading-none text-5xl md:text-6xl lg:text-7xl" style={{ color: stat.color ?? "#FFD700" }}>
            <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} color={stat.color ?? "#FFD700"} />
          </p>
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-white/60">{stat.label}</p>
          {stat.sub && <p className="font-body text-xs text-white/35">{stat.sub}</p>}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. ParkCinematicGrid — Ken-Burns hover cards
// ─────────────────────────────────────────────────────────────────────────────

interface ParkData {
  name: string; state: string; established: number; visitors: number;
  area: number; highlight: string; imageSrc: string; imageAlt: string;
}

export function ParkCinematicGrid({ parks, visitLabel = "Visits/yr", acresLabel = "Acres", estLabel = "Est." }: {
  parks: ParkData[]; visitLabel?: string; acresLabel?: string; estLabel?: string;
}) {
  return (
    <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {parks.map((park) => (
        <motion.div key={park.name}
          variants={{ hidden: { opacity: 0, scale: 0.95, y: 20 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
          className="group relative h-72 overflow-hidden rounded-2xl"
        >
          <motion.div className="absolute inset-0" whileHover={{ scale: 1.08 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <Image src={park.imageSrc} alt={park.imageAlt} fill className="object-cover"
              sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
              placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <motion.div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20"
            initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.35 }} />
          <span className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 font-body text-xs text-white/70 backdrop-blur-sm">
            {estLabel} {park.established}
          </span>
          <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-glory-gold">{park.state}</p>
            <h3 className="mt-1 font-display text-xl font-bold text-white">{park.name}</h3>
            <motion.div initial={{ opacity: 0, y: 12 }} whileHover={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className="mt-2">
              <p className="font-body text-xs italic leading-relaxed text-white/60">{park.highlight}</p>
              <div className="mt-3 flex gap-4">
                <span className="font-body text-xs text-white/50"><span className="font-hero text-sm text-glory-gold">{park.visitors}M</span> {visitLabel}</span>
                <span className="font-body text-xs text-white/50"><span className="font-hero text-sm text-white">{park.area.toLocaleString()}K</span> {acresLabel}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. AuroraBackground — pure CSS animated aurora borealis
// ─────────────────────────────────────────────────────────────────────────────

export function AuroraBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-[#020818]">
      <style>{`
        @keyframes aurora1 { 0%,100%{transform:translateX(-20%) translateY(0%) skewX(-5deg);opacity:.5} 50%{transform:translateX(10%) translateY(-15%) skewX(5deg);opacity:.8} }
        @keyframes aurora2 { 0%,100%{transform:translateX(10%) translateY(10%) skewX(8deg);opacity:.4} 50%{transform:translateX(-15%) translateY(-5%) skewX(-3deg);opacity:.7} }
        @keyframes aurora3 { 0%,100%{transform:translateX(0%) translateY(-10%) skewX(-10deg);opacity:.3} 50%{transform:translateX(20%) translateY(5%) skewX(5deg);opacity:.6} }
        @keyframes aurora4 { 0%,100%{transform:translateX(-10%) translateY(5%) skewX(3deg);opacity:.35} 50%{transform:translateX(15%) translateY(-8%) skewX(-6deg);opacity:.55} }
      `}</style>
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div style={{ position:"absolute", top:"15%", left:"-30%", width:"160%", height:"25%", background:"linear-gradient(to bottom,transparent,rgba(0,255,180,0.18) 40%,rgba(0,200,140,0.22) 55%,transparent)", filter:"blur(28px)", animation:"aurora1 12s ease-in-out infinite", borderRadius:"50%" }} />
        <div style={{ position:"absolute", top:"25%", left:"-20%", width:"140%", height:"20%", background:"linear-gradient(to bottom,transparent,rgba(80,100,255,0.16) 40%,rgba(120,60,220,0.2) 55%,transparent)", filter:"blur(32px)", animation:"aurora2 16s ease-in-out infinite", borderRadius:"50%" }} />
        <div style={{ position:"absolute", top:"8%",  left:"-10%", width:"120%", height:"18%", background:"linear-gradient(to bottom,transparent,rgba(0,220,255,0.12) 45%,rgba(0,180,230,0.15) 55%,transparent)", filter:"blur(24px)", animation:"aurora3 14s ease-in-out infinite", borderRadius:"50%" }} />
        <div style={{ position:"absolute", top:"35%", left:"-25%", width:"130%", height:"15%", background:"linear-gradient(to bottom,transparent,rgba(200,60,180,0.09) 45%,rgba(150,30,130,0.12) 55%,transparent)", filter:"blur(36px)", animation:"aurora4 18s ease-in-out infinite", borderRadius:"50%" }} />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. GeyserScene — SVG animated geyser eruption
// ─────────────────────────────────────────────────────────────────────────────

export function GeyserScene({ label = "OLD FAITHFUL", sublabel = "Erupts every 44–125 minutes" }: { label?: string; sublabel?: string }) {
  return (
    <div className="flex flex-col items-center justify-center select-none">
      <style>{`
        @keyframes geyser-cycle { 0%,40%{opacity:0;transform:scaleY(0);transform-origin:bottom center} 50%{opacity:1;transform:scaleY(1);transform-origin:bottom center} 80%{opacity:.6;transform:scaleY(.9);transform-origin:bottom center} 100%{opacity:0;transform:scaleY(.1);transform-origin:bottom center} }
        @keyframes drift1 { 0%{transform:translate(0,0) scale(1);opacity:.7} 100%{transform:translate(-40px,-120px) scale(2.5);opacity:0} }
        @keyframes drift2 { 0%{transform:translate(0,0) scale(1);opacity:.6} 100%{transform:translate(35px,-100px) scale(2);opacity:0} }
        @keyframes drift3 { 0%{transform:translate(0,0) scale(1);opacity:.5} 100%{transform:translate(-15px,-140px) scale(3);opacity:0} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(2.8);opacity:0} }
      `}</style>
      <svg viewBox="0 0 220 260" width="220" height="260" aria-label="Animated geyser" role="img">
        <ellipse cx="110" cy="245" rx="90" ry="12" fill="#1a1f3a" />
        <ellipse cx="110" cy="245" rx="70" ry="8" fill="#252b4a" />
        <path d="M 88 240 L 100 210 L 120 210 L 132 240 Z" fill="#3C3B6E" />
        <path d="M 96 240 L 105 215 L 115 215 L 124 240 Z" fill="#252b4a" />
        <ellipse cx="110" cy="210" rx="10" ry="4" fill="#1a1f3a" />
        <rect x="103" y="60" width="14" height="150" rx="7" fill="url(#wg1)" style={{ animation:"geyser-cycle 4s ease-in-out infinite" }} />
        <rect x="105" y="40" width="10" height="170" rx="5" fill="url(#wg2)" style={{ animation:"geyser-cycle 4s ease-in-out infinite .3s" }} />
        <circle cx="110" cy="90" r="14" fill="rgba(200,230,255,.3)" style={{ animation:"drift1 3s ease-out infinite .5s" }} />
        <circle cx="110" cy="70" r="10" fill="rgba(200,230,255,.25)" style={{ animation:"drift2 3s ease-out infinite 1s" }} />
        <circle cx="110" cy="50" r="8"  fill="rgba(200,230,255,.2)" style={{ animation:"drift3 3s ease-out infinite 1.5s" }} />
        <circle cx="110" cy="210" r="12" fill="none" stroke="rgba(150,220,255,.6)" strokeWidth="2" style={{ animation:"pulse-ring 2s ease-out infinite" }} />
        <circle cx="110" cy="210" r="12" fill="none" stroke="rgba(150,220,255,.4)" strokeWidth="1.5" style={{ animation:"pulse-ring 2s ease-out infinite .6s" }} />
        <defs>
          <linearGradient id="wg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(150,220,255,0)" /><stop offset="30%" stopColor="rgba(150,220,255,.8)" /><stop offset="100%" stopColor="rgba(80,160,255,1)" /></linearGradient>
          <linearGradient id="wg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(200,240,255,0)" /><stop offset="40%" stopColor="rgba(200,240,255,.6)" /><stop offset="100%" stopColor="rgba(150,210,255,.8)" /></linearGradient>
        </defs>
      </svg>
      <p className="mt-2 font-hero text-2xl text-blue-300 tracking-widest">{label}</p>
      <p className="font-body text-xs text-white/40 tracking-wider mt-1">{sublabel}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. CanyonStrataReveal — alternating left/right geological layers
// ─────────────────────────────────────────────────────────────────────────────

export function CanyonStrataReveal({ layers }: { layers: { layer: string; age: string; depth: string; color: string }[] }) {
  return (
    <motion.div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-mid"
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
    >
      {layers.map((layer, i) => (
        <motion.div key={i}
          variants={{ hidden: { opacity: 0, x: i % 2 === 0 ? -50 : 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
          className="flex items-center gap-4 border-b border-white/5 px-5 py-3.5 last:border-0 hover:bg-white/3 transition-colors"
        >
          <div className="h-5 w-5 shrink-0 rounded-sm shadow-lg" style={{ backgroundColor: layer.color }} />
          <div className="w-32 shrink-0"><p className="font-body text-xs text-white/35">{layer.depth}</p></div>
          <div className="flex-1 min-w-0"><p className="font-body text-sm font-semibold text-white truncate">{layer.layer}</p></div>
          <p className="font-hero text-base text-glory-gold shrink-0">{layer.age}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. WaveSection — morphing SVG water wave divider
// ─────────────────────────────────────────────────────────────────────────────

export function WaveSection({ children, color = "#1a3a5c" }: { children?: React.ReactNode; color?: string }) {
  return (
    <div className="relative overflow-hidden" style={{ background: color }}>
      <style>{`
        @keyframes wv1 { 0%,100%{d:path("M0,60 C180,100 360,20 540,60 C720,100 900,20 1080,60 L1080,120 L0,120 Z")} 50%{d:path("M0,80 C180,40 360,100 540,80 C720,40 900,100 1080,80 L1080,120 L0,120 Z")} }
        @keyframes wv2 { 0%,100%{d:path("M0,80 C200,40 400,110 600,80 C800,40 1000,110 1080,80 L1080,120 L0,120 Z")} 50%{d:path("M0,60 C200,100 400,50 600,70 C800,100 1000,50 1080,70 L1080,120 L0,120 Z")} }
        .wv1{animation:wv1 6s ease-in-out infinite} .wv2{animation:wv2 8s ease-in-out infinite 1s}
      `}</style>
      <svg viewBox="0 0 1080 120" preserveAspectRatio="none" className="w-full" style={{ height:80, display:"block", marginTop:-1 }}>
        <path className="wv2" d="M0,80 C200,40 400,110 600,80 C800,40 1000,110 1080,80 L1080,120 L0,120 Z" fill="rgba(255,255,255,0.04)" />
        <path className="wv1" d="M0,60 C180,100 360,20 540,60 C720,100 900,20 1080,60 L1080,120 L0,120 Z" fill="rgba(255,255,255,0.06)" />
      </svg>
      <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">{children}</div>
      <svg viewBox="0 0 1080 120" preserveAspectRatio="none" className="w-full rotate-180" style={{ height:80, display:"block", marginBottom:-1 }}>
        <path className="wv1" d="M0,60 C180,100 360,20 540,60 C720,100 900,20 1080,60 L1080,120 L0,120 Z" fill="rgba(255,255,255,0.06)" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. SnowParticles — CSS floating snowflakes
// ─────────────────────────────────────────────────────────────────────────────

export function SnowParticles({ count = 30 }: { count?: number }) {
  const flakes = Array.from({ length: count }, (_, i) => ({
    id: i, left: `${(i * 37 + 13) % 100}%`, size: 2 + (i % 5),
    duration: 6 + (i % 8), delay: -(i * 0.7), drift: -15 + (i % 31),
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <style>{`@keyframes snowfall{0%{transform:translateY(-20px) translateX(0px);opacity:0}10%{opacity:1}90%{opacity:.6}100%{transform:translateY(110vh) translateX(var(--drift));opacity:0}}`}</style>
      {flakes.map((f) => (
        <div key={f.id} className="absolute rounded-full bg-white/60"
          style={{ left: f.left, top: 0, width: f.size, height: f.size, "--drift": `${f.drift}px`, animation: `snowfall ${f.duration}s linear ${f.delay}s infinite` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. HeroTextReveal — staggered animated hero title
// ─────────────────────────────────────────────────────────────────────────────

export function HeroTextReveal({ line1, line2, line2Color = "#4ade80", eyebrow, body, children }: {
  line1: string; line2: string; line2Color?: string; eyebrow?: string; body?: string; children?: React.ReactNode;
}) {
  return (
    <motion.div initial="hidden" animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
    >
      {eyebrow && (
        <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.3em] text-glory-gold">{eyebrow}
        </motion.p>
      )}
      <div className="overflow-hidden">
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 80, skewY: 3 }, visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 1.0, ease: [0.19, 1, 0.22, 1] } } }}
          className="font-hero leading-none tracking-wide" style={{ fontSize: "clamp(3.5rem,8vw,7rem)" }}
        >
          <span className="block text-white">{line1}</span>
          <span className="block" style={{ color: line2Color }}>{line2}</span>
        </motion.h1>
      </div>
      {body && (
        <motion.p variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 } } }}
          className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-white/70 md:text-xl">{body}
        </motion.p>
      )}
      {children && (
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2 } } }}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. RegionCardsGrid — stagger + hover lift
// ─────────────────────────────────────────────────────────────────────────────

interface RegionCardData { region: string; icon: string; headline: string; stat: string; statLabel: string; description: string; }

export function RegionCardsGrid({ regions }: { regions: RegionCardData[] }) {
  return (
    <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {regions.map((region) => (
        <motion.div key={region.region}
          variants={{ hidden: { opacity: 0, y: 30, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="rounded-2xl border border-white/10 bg-navy-mid p-5 transition-shadow hover:border-glory-gold/25 hover:shadow-[0_8px_30px_rgba(255,215,0,0.06)]"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label={region.region}>{region.icon}</span>
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-glory-gold">{region.region}</p>
              <p className="font-display text-base font-semibold leading-snug text-white">{region.headline}</p>
            </div>
          </div>
          <div className="mb-3 flex items-baseline gap-2">
            <span className="font-hero text-2xl text-glory-gold">{region.stat}</span>
            <span className="font-body text-xs text-white/45">{region.statLabel}</span>
          </div>
          <p className="font-body text-sm leading-relaxed text-white/55">{region.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
