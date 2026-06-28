"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useInView, animate } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DecodeText } from "@/components/shared/CinematicSystem";

interface FilmHeroProps {
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

function HeroStatValue({ value }: { value: string | number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();

  const raw = String(value);
  const match = raw.match(/^([^0-9]*?)([0-9,.]+)([^0-9]*?)$/);

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
  }, [inView, target, decimals, grouped, prefersReducedMotion, match]);

  if (!match) return <span ref={ref}>{raw}</span>;
  return (
    <span ref={ref} className="tabular-nums" aria-label={raw}>
      {prefix}{display}{suffix}
    </span>
  );
}

export function FilmHero({ imageSrc, imageAlt, videoSrc, eyebrow, titleLead, titleAccent, description, stats }: FilmHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;

    // Parse media fragment if any, e.g., #t=37
    const hash = videoSrc?.split("#")[1];
    let startTime = 0;
    let endTime = Infinity;
    if (hash && hash.startsWith("t=")) {
      const parts = hash.substring(2).split(",");
      if (parts[0]) startTime = parseFloat(parts[0]);
      if (parts[1]) endTime = parseFloat(parts[1]);
    }

    const onTimeUpdate = () => {
      if (video.currentTime >= endTime) {
        video.currentTime = startTime;
        video.play().catch(() => {});
      }
    };

    const onEnded = () => {
      video.currentTime = startTime;
      video.play().catch(() => {});
    };

    if (endTime < Infinity) {
      video.addEventListener("timeupdate", onTimeUpdate);
    }
    video.addEventListener("ended", onEnded);

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

    return () => {
      observer.disconnect();
      video.removeEventListener("ended", onEnded);
      if (endTime < Infinity) {
        video.removeEventListener("timeupdate", onTimeUpdate);
      }
    };
  }, [videoSrc]);

  return (
    <div ref={ref} className="relative min-h-[100dvh] w-full overflow-hidden bg-[#0C0907] pt-32 pb-16 flex flex-col justify-center">
      <motion.div style={{ y, scale, opacity: 0.6 }} className="absolute inset-0">
        {!videoSrc && imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt || ""}
            fill
            priority
            className="object-cover"
            sizes="100vw"
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

      {/* Double-layered original-style gradients customized for the Film page */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]" 
        style={{ 
          background: 'linear-gradient(to top, #0C0907 0%, transparent 50%, rgba(0, 0, 0, 0.75) 100%)' 
        }} 
      />
      <div 
        className="absolute inset-0 pointer-events-none z-[1] opacity-80" 
        style={{ 
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, transparent 50%, #0C0907 100%)' 
        }} 
      />
      <div 
        className="absolute inset-0 pointer-events-none z-[1]" 
        style={{ 
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.7) 100%)' 
        }} 
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28"
      >
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0">
          <div className="lg:col-span-8">
            <motion.p
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04 } }
              }}
              className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923]/95 mb-6"
            >
              <DecodeText text={eyebrow} />
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
