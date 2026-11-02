"use client";

// ─── Monochrome Vector Flag ──────────────────────────────────────────────────
// Pure code-driven vector U.S. flag with mathematical cloth wave physics.
//  • Generated via Canvas 2D (zero video files, zero external 3D libraries).
//  • Official 1.9 : 1 proportions, 13 stripes, 50 stars in alternating 6/5 grid.
//  • Tailored to the #000000 deep black aesthetic: obsidian, charcoal & titanium.
//  • Double-sine harmonic wave with dynamic slope-based specular highlights.
//  • Auto-pauses offscreen via IntersectionObserver.
//  • Respects prefers-reduced-motion.

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MonochromeVectorFlagProps {
  className?: string;
  opacity?: number;
  speed?: number;
  amplitude?: number;
  vignette?: boolean;
}

export function MonochromeVectorFlag({
  className,
  opacity = 0.14,
  speed = 0.0016,
  amplitude = 24,
  vignette = true,
}: MonochromeVectorFlagProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // ── Pre-render official vector flag onto offscreen canvas ─────────────────
    // Standard US Flag ratio: 1.9 : 1 (1900 x 1000)
    const FLAG_W = 1900;
    const FLAG_H = 1000;
    const offscreen = document.createElement("canvas");
    offscreen.width = FLAG_W;
    offscreen.height = FLAG_H;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    // 1. Draw 13 alternating stripes
    const stripeH = FLAG_H / 13;
    for (let i = 0; i < 13; i++) {
      const isDark = i % 2 === 0; // In flag, top/bottom stripes are red (here: deep obsidian/charcoal)
      if (isDark) {
        // Deep obsidian charcoal with subtle texture
        offCtx.fillStyle = "#07090D";
      } else {
        // Titanium silver-white with soft metallic luster
        const stripeGrad = offCtx.createLinearGradient(0, i * stripeH, FLAG_W, i * stripeH);
        stripeGrad.addColorStop(0, "rgba(225, 230, 240, 0.42)");
        stripeGrad.addColorStop(0.5, "rgba(240, 245, 255, 0.48)");
        stripeGrad.addColorStop(1, "rgba(215, 220, 230, 0.40)");
        offCtx.fillStyle = stripeGrad;
      }
      offCtx.fillRect(0, i * stripeH, FLAG_W, stripeH + 0.5);
    }

    // 2. Draw Canton (The Union): 7 stripes high, 40% (0.76 of height) wide
    const cantonW = FLAG_W * 0.4;
    const cantonH = stripeH * 7;
    const cantonGrad = offCtx.createLinearGradient(0, 0, cantonW, cantonH);
    cantonGrad.addColorStop(0, "#0C0F17");
    cantonGrad.addColorStop(1, "#07090E");
    offCtx.fillStyle = cantonGrad;
    offCtx.fillRect(0, 0, cantonW, cantonH);

    // Subtle hairline stroke around canton
    offCtx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    offCtx.lineWidth = 2;
    offCtx.strokeRect(0, 0, cantonW, cantonH);

    // 3. Draw 50 Stars (9 alternating rows of 6 and 5)
    const drawStar = (cx: number, cy: number, spikes: number, outerR: number, innerR: number) => {
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;
      offCtx.beginPath();
      offCtx.moveTo(cx, cy - outerR);
      for (let i = 0; i < spikes; i++) {
        let x = cx + Math.cos(rot) * outerR;
        let y = cy + Math.sin(rot) * outerR;
        offCtx.lineTo(x, y);
        rot += step;
        x = cx + Math.cos(rot) * innerR;
        y = cy + Math.sin(rot) * innerR;
        offCtx.lineTo(x, y);
        rot += step;
      }
      offCtx.lineTo(cx, cy - outerR);
      offCtx.closePath();
      offCtx.fill();
    };

    offCtx.fillStyle = "rgba(245, 248, 255, 0.85)";
    const starOuterR = cantonH * 0.038;
    const starInnerR = starOuterR * 0.382;

    for (let row = 0; row < 9; row++) {
      const isEvenRow = row % 2 === 0;
      const starCount = isEvenRow ? 6 : 5;
      const y = (row + 1) * (cantonH / 10);

      for (let col = 0; col < starCount; col++) {
        const x = isEvenRow
          ? (col * 2 + 1) * (cantonW / 12)
          : (col * 2 + 2) * (cantonW / 12);
        drawStar(x, y, 5, starOuterR, starInnerR);
      }
    }

    // ── Wave Simulation & Resize Handling ─────────────────────────────────────
    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Performance: Pause simulation when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    // Wave slice animation loop
    const SLICES = 100;
    const startTime = performance.now();

    const render = (now: number) => {
      if (isVisible && width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height);

        const elapsed = reducedMotion ? 0 : now - startTime;
        const sliceW = width / SLICES;

        for (let i = 0; i < SLICES; i++) {
          const x = i * sliceW;
          const progress = x / width; // 0 at flagpole, 1 at fly

          // Wind cloth physics: left is anchored to flagpole, amplitude grows toward fly
          const currentAmp = Math.pow(progress, 1.15) * amplitude;
          const wave1 = Math.sin(x * 0.0075 - elapsed * speed);
          const wave2 = Math.sin(x * 0.016 - elapsed * speed * 1.45 + 0.9);
          const yOffset = currentAmp * (wave1 + 0.32 * wave2);

          // Calculate surface slope for realistic lighting
          const nextX = (i + 1) * sliceW;
          const nextProg = nextX / width;
          const nextAmp = Math.pow(nextProg, 1.15) * amplitude;
          const nextY = nextAmp * (
            Math.sin(nextX * 0.0075 - elapsed * speed) +
            0.32 * Math.sin(nextX * 0.016 - elapsed * speed * 1.45 + 0.9)
          );
          const slope = (nextY - yOffset) / sliceW;

          // Blit vertical slice from pre-rendered vector flag
          ctx.drawImage(
            offscreen,
            (x / width) * FLAG_W,
            0,
            (sliceW / width) * FLAG_W,
            FLAG_H,
            x,
            yOffset,
            sliceW + 0.5,
            height
          );

          // Specular highlights (crest) and gentle shadow (trough)
          if (!reducedMotion) {
            if (slope > 0) {
              const highlight = Math.min(0.24, slope * 0.42);
              ctx.fillStyle = `rgba(255, 255, 255, ${highlight})`;
              ctx.fillRect(x, yOffset, sliceW + 0.5, height);
            } else if (slope < 0) {
              const shadow = Math.min(0.38, -slope * 0.58);
              ctx.fillStyle = `rgba(0, 0, 0, ${shadow})`;
              ctx.fillRect(x, yOffset, sliceW + 0.5, height);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [amplitude, speed, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden pointer-events-none select-none",
        className
      )}
      style={{
        opacity,
        ...(vignette && {
          maskImage:
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0) 92%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0) 92%)",
        }),
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

