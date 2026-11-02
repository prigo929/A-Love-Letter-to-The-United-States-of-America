"use client";

// ─── Quote Signature Component ───────────────────────────────────────────────
// Universal animated Spencerian calligraphy signature with real-time vector
// quill flourish line, gold foil sheen, and refined archival micro-typography.
// Used across QuoteCarousel, QuoteBlock, NatureQuoteBreak, and section quotes.

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuoteSignatureProps {
  attribution: string;
  role?: string;
  title?: string;
  year?: number | string;
  className?: string;
  delay?: number;
  textColor?: "gold" | "white" | "silver";
}

export function QuoteSignature({
  attribution,
  role,
  title,
  year,
  className,
  delay = 0.15,
  textColor = "gold",
}: QuoteSignatureProps) {
  const subtitle = role ?? title;

  // Easing standard: fast initial sweep with soft, feathered deceleration
  const quillEase = [0.16, 1, 0.3, 1] as const;

  const colorStyles = {
    gold: "text-glory-gold drop-shadow-[0_2px_16px_rgba(255,215,0,0.22)]",
    white: "text-white/95 drop-shadow-[0_2px_16px_rgba(255,255,255,0.20)]",
    silver: "text-slate-200 drop-shadow-[0_2px_16px_rgba(226,232,240,0.20)]",
  };

  return (
    <footer className={cn("flex flex-col items-center select-none", className)}>
      {/* ── Handcrafted Spencerian Calligraphy Signature ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.1, ease: quillEase, delay }}
        className="relative flex flex-col items-center justify-center my-2"
      >
        <span
          className={cn(
            "font-signature text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide",
            colorStyles[textColor],
          )}
        >
          {attribution}
        </span>

        {/* ── Animated Vector Quill Flourish Stroke ───────────────────────── */}
        <svg
          className="w-44 sm:w-56 md:w-64 h-4 overflow-visible -mt-1 select-none pointer-events-none"
          viewBox="0 0 200 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="quillGoldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C8A96E" stopOpacity="0" />
              <stop offset="25%" stopColor="#FFD700" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#E8C878" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#C8A96E" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 5 8 C 50 1, 100 15, 150 6 S 195 9, 198 8"
            stroke="url(#quillGoldGradient)"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: quillEase, delay: delay + 0.1 }}
          />
        </svg>
      </motion.div>

      {/* ── Archival Micro-Typography Attribution ─────────────────────────── */}
      <cite className="not-italic font-body text-xs text-white/70 tracking-[0.25em] uppercase mt-2 block text-center">
        {attribution}
        {year && (
          <span className="text-white/40 ml-2 font-mono font-normal">
            [{year}]
          </span>
        )}
      </cite>

      {subtitle && (
        <span className="font-body text-xs text-white/50 max-w-lg text-center mt-1 leading-relaxed block">
          {subtitle}
        </span>
      )}
    </footer>
  );
}
