"use client";

// ─────────────────────────────────────────────────────────────────────────────
// CINEMATIC DESIGN SYSTEM (site-wide)
// ─────────────────────────────────────────────────────────────────────────────
// Formerly components/economy/EconomyAnimations.tsx — promoted to shared/ since
// it now powers 30+ pages across Economy, Innovation, Universities, Science,
// Quality of Life and Culture. The old path re-exports from here.
//
// Design Philosophy:
// - Aesthetic Absolute: Flawless typography, immense negative space, borderless.
// - Infrastructure Integration: Cinematic assets with localized blur masks.
// - Typographic Scale: Geometric sans narrative + brutalist mono metadata.
// - Organic Motion: Frictionless fades and scales mapped to scroll physics.

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useReducedMotion, animate } from "framer-motion";
import Image from "next/image";
import { cn, BLUR_PLACEHOLDER } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// 1. MacroStyles — Core CSS Injection
// ─────────────────────────────────────────────────────────────────────────────

export function MacroStyles() {
  return (
    <style jsx global>{`
      :root {
        --macro-bg: #000000; /* Absolute deep void */
        --macro-text: #F0F2F5;
        --macro-muted: rgba(240, 242, 245, 0.4);
        --macro-accent: #E8B923; /* Glory gold */

        --font-macro-display: var(--font-archivo), system-ui, sans-serif;
        --font-macro-body: var(--font-inter), system-ui, sans-serif;
        --font-macro-mono: 'Space Mono', monospace;
      }

      body {
        background-color: var(--macro-bg);
        color: var(--macro-text);
      }

      .macro-hero-title {
        font-family: var(--font-macro-display);
        font-size: clamp(38px, 8vw, 140px);
        font-weight: 900;
        line-height: 1.0;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        overflow-wrap: normal;
        word-break: normal;
      }

      .macro-hero-accent {
        word-break: keep-all;
      }

      .macro-section-title {
        font-family: var(--font-macro-display);
        font-size: clamp(36px, 4vw, 80px);
        font-weight: 800;
        line-height: 1.0;
        letter-spacing: -0.01em;
        text-transform: uppercase;
      }

      .macro-body {
        font-family: var(--font-macro-body);
        font-size: clamp(16px, 1.5vw, 24px);
        font-weight: 300;
        line-height: 1.8;
        letter-spacing: 0.02em;
        word-spacing: 0.05em;
        color: rgba(255, 255, 255, 0.7);
      }

      .macro-stat-value {
        font-family: var(--font-macro-display);
        font-size: clamp(40px, 6vw, 90px);
        font-weight: 900;
        line-height: 0.95;
        letter-spacing: -0.04em;
        color: var(--macro-accent);
      }

      .macro-metadata {
        font-family: var(--font-macro-mono);
        font-size: 16px;
        font-weight: 900;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--macro-muted);
      }

      .macro-eyebrow {
        font-family: var(--font-macro-mono);
        font-size: 18px;
        font-weight: 900;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--macro-accent);
      }

      /* Blur Masks — kept light: a 24px backdrop blur under scroll parallax is a
         Safari repaint killer, so we use 12px and drop the saturate pass. */
      .macro-blur-mask {
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.8) 0%,
          rgba(0, 0, 0, 0.4) 100%
        );
        border-top: 1px solid rgba(255, 255, 255, 0.05);
      }

      .macro-edge-fade {
        mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
        -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
      }
    `}</style>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. DecodeText — terminal-style scramble that settles into the real string
// ─────────────────────────────────────────────────────────────────────────────

const DECODE_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&";

export function DecodeText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();
  const [output, setOutput] = useState(prefersReducedMotion ? text : "");

  useEffect(() => {
    if (!inView || prefersReducedMotion) {
      if (prefersReducedMotion) setOutput(text);
      return;
    }
    let frame = 0;
    let rafId: number;
    const totalFrames = 36; // ~0.6s of decode at 60fps
    const startDelay = delay * 1000;

    const tick = () => {
      frame += 1;
      const settled = Math.floor((frame / totalFrames) * text.length);
      let next = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " " || i < settled) {
          next += ch;
        } else {
          next += DECODE_GLYPHS[Math.floor(Math.random() * DECODE_GLYPHS.length)];
        }
      }
      setOutput(next);
      if (settled < text.length) {
        rafId = requestAnimationFrame(tick);
      } else {
        setOutput(text);
      }
    };

    const timeout = setTimeout(() => {
      rafId = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, [inView, text, delay, prefersReducedMotion]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {output || " "}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. HeroStatValue — parses "2,301" / "#2" / "~90%" / "$48B" / "350k+" and
//    counts the numeric core up when it enters view. Falls back to static text.
// ─────────────────────────────────────────────────────────────────────────────

const STAT_NUMERIC = /^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/;

function HeroStatValue({ value }: { value: string | number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();
  const raw = String(value);
  const match = raw.match(STAT_NUMERIC);

  const prefix = match?.[1] ?? "";
  const core = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = core ? parseFloat(core.replace(/,/g, "")) : 0;
  const decimals = core.includes(".") ? core.split(".")[1].length : 0;
  const grouped = core.includes(",");

  const [display, setDisplay] = useState(match && !prefersReducedMotion ? "0" : core);

  useEffect(() => {
    if (!match || !inView || prefersReducedMotion) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setDisplay(
          grouped
            ? Math.round(v).toLocaleString("en-US")
            : v.toFixed(decimals),
        );
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target, decimals, grouped, prefersReducedMotion]);

  if (!match) return <span ref={ref}>{raw}</span>;
  return (
    <span ref={ref} className="tabular-nums" aria-label={raw}>
      {prefix}{display}{suffix}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. MacroHero — Frictionless Cinematic Entrance
//    Word-staggered title reveal, decoding eyebrow, count-up stats.
// ─────────────────────────────────────────────────────────────────────────────

interface MacroHeroProps {
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  stats?: { value: string | number; label: string; sub?: string }[];
}

const heroWordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
};

const heroWord = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
};

function StaggeredTitleLines({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("block", className)}>
      {text.split("\n").map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {line.split(" ").map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block overflow-hidden pt-[0.16em] -mt-[0.16em] pb-[0.08em] -mb-[0.08em] align-bottom">
              <motion.span variants={heroWord} className="inline-block">
                {word}
                {wordIdx < line.split(" ").length - 1 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

export function MacroHero({ imageSrc, imageAlt, videoSrc, eyebrow, titleLead, titleAccent, description, stats }: MacroHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.05]);

  // Play the hero video only while it's on screen, and pause it once scrolled
  // away so Safari can release the decoder (it otherwise keeps looping video
  // buffers resident in RAM). Combined with preload="none" this bounds memory.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [videoSrc]);

  return (
    <div ref={ref} className="relative min-h-[100dvh] w-full overflow-hidden bg-[#000000] pt-32 pb-16 flex flex-col justify-center">
      <motion.div style={{ y, scale, opacity: 0.6 }} className="absolute inset-0">
        {!videoSrc && imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt || ""}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            quality={90}
          />
        )}
        {videoSrc && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-[#000000] via-transparent to-[#000000] pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-linear-to-b from-[#000000] via-transparent to-[#000000] pointer-events-none opacity-80 z-[1]" />
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex min-h-[60dvh] flex-col justify-center px-6 md:px-12 max-w-[1600px] mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 lg:items-start pt-8">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="macro-eyebrow mb-6"
              style={{ textShadow: "0px 2px 10px rgba(0,0,0,0.8)" }}
            >
              <DecodeText text={eyebrow} delay={0.25} />
            </motion.p>
            {prefersReducedMotion ? (
              <h1 className="macro-hero-title drop-shadow-2xl">
                <span className="block text-white">
                  {titleLead.split("\n").map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </span>
                <span className="block text-[#E8B923] macro-hero-accent">
                  {titleAccent.split("\n").map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </span>
              </h1>
            ) : (
              <motion.h1
                variants={heroWordContainer}
                initial="hidden"
                animate="visible"
                className="macro-hero-title drop-shadow-2xl"
              >
                <StaggeredTitleLines text={titleLead} className="text-white" />
                <StaggeredTitleLines text={titleAccent} className="text-[#E8B923] macro-hero-accent" />
              </motion.h1>
            )}
          </div>
          <div className="lg:col-span-4 lg:col-start-9 pb-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="macro-body mb-6 text-white/90"
              style={{ textShadow: "0px 4px 20px rgba(0,0,0,0.9), 0px 2px 4px rgba(0,0,0,0.8)" }}
            >
              {description}
            </motion.p>

            {stats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:grid-cols-1 lg:gap-4"
              >
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-macro-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-1">
                      <HeroStatValue value={stat.value} />
                    </span>
                    <span className="macro-metadata">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CountUp — Scroll-triggered numeric count-up animation
// ─────────────────────────────────────────────────────────────────────────────

export function CountUp({ value, prefix = "", suffix = "", decimals = 0, color = "#E8B923" }: {
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

  return <span ref={ref} className="font-mono tabular-nums" style={{ color }}>{prefix}0{suffix}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. MacroStat — Borderless Extreme Scale Data
// ─────────────────────────────────────────────────────────────────────────────

export function MacroStat({ value, label, source, color = "#E8B923" }: { value: React.ReactNode, label: string, source?: string, color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col"
    >
      <div className="macro-stat-value mb-4" style={{ color }}>{value}</div>
      <div className="macro-metadata text-white/80">{label}</div>
      {source && <div className="macro-metadata opacity-40 mt-2">SOURCE: {source}</div>}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. MacroFact — Borderless Editorial Insight (gold rule draws in on view)
// ─────────────────────────────────────────────────────────────────────────────

export function MacroFact({ fact, detail, index }: { fact: string, detail?: string, index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative flex flex-col max-w-2xl pt-8"
    >
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 h-px w-full origin-left bg-linear-to-r from-[#E8B923]/60 via-white/15 to-transparent"
      />
      {index !== undefined && (
        <div className="macro-metadata mb-6 text-[#E8B923]">[{index.toString().padStart(2, '0')}]</div>
      )}
      <h3 className="font-macro-display text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 leading-tight">
        {fact}
      </h3>
      {detail && (
        <p className="font-macro-body text-lg text-white/60 leading-relaxed">
          {detail}
        </p>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. InfrastructureBand — Cinematic backdrop with blur mask
// ─────────────────────────────────────────────────────────────────────────────

export function InfrastructureBand({ imageSrc, imageAlt, children }: { imageSrc: string, imageAlt: string, children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className="relative w-full my-32 overflow-hidden bg-[#000000]">
      <motion.div style={{ y }} className="absolute inset-0 h-[130%] top-[-15%]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover opacity-50 grayscale-[0.3]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#000000] via-transparent to-[#000000] pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-b from-[#000000] via-transparent to-[#000000] pointer-events-none opacity-80" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />
      </motion.div>
      <div className="relative z-10 w-full macro-blur-mask p-12 md:p-24 lg:p-32 mt-64">
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
