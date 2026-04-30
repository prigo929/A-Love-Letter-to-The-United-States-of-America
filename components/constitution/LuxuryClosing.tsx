"use client";
// ─── Luxury Closing ──────────────────────────────────────────────────────────
// The final moment of the exhibit. A dignified statement with share actions.
// "This exhibit is free. This document is real. These rights are yours."

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export function LuxuryClosing({ isRo }: { isRo: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: isRo ? "Constituția — Un Exhibit Interactiv" : "The Constitution — An Interactive Exhibit",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 70%)",
      }}
    >
      {/* Marble texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/constitution/marble-texture.webp')",
          backgroundRepeat: "repeat",
          backgroundSize: "512px 512px",
          opacity: 0.02,
          mixBlendMode: "screen",
        }}
      />

      <div className="relative z-10 mx-auto max-w-screen-md px-4 text-center">
        {/* Top cornice */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-12 h-px w-full max-w-xs"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
          }}
        />

        {/* Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="mb-2"
            style={{
              fontFamily: "'EB Garamond', 'Georgia', serif",
              fontStyle: "italic",
              fontSize: "clamp(20px, 3vw, 32px)",
              lineHeight: 1.5,
              color: "#F5F0E8",
            }}
          >
            {isRo
              ? "Acest exhibit este gratuit."
              : "This exhibit is free."}
          </p>
          <p
            className="mb-2"
            style={{
              fontFamily: "'EB Garamond', 'Georgia', serif",
              fontStyle: "italic",
              fontSize: "clamp(20px, 3vw, 32px)",
              lineHeight: 1.5,
              color: "#F5F0E8",
            }}
          >
            {isRo
              ? "Acest document este real."
              : "This document is real."}
          </p>
          <p
            style={{
              fontFamily: "'EB Garamond', 'Georgia', serif",
              fontStyle: "italic",
              fontSize: "clamp(20px, 3vw, 32px)",
              lineHeight: 1.5,
              background: "linear-gradient(180deg, #E8C878 0%, #C9A84C 60%, #8B6A2A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {isRo
              ? "Aceste drepturi sunt ale tale."
              : "These rights are yours."}
          </p>
        </motion.div>

        {/* Star */}
        <motion.p
          className="my-10 text-[#C9A84C]"
          style={{ fontSize: "24px" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          ★
        </motion.p>

        {/* Action buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-sm px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.2em] transition-all hover:bg-[rgba(201,168,76,0.12)]"
            style={{
              border: "1px solid rgba(201,168,76,0.25)",
              color: "#C9A84C",
            }}
          >
            {copied
              ? (isRo ? "✓ Link Copiat" : "✓ Link Copied")
              : (isRo ? "Distribuie Exhibitul" : "Share This Exhibit")}
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-sm px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#6B6860] transition-all hover:text-[#C9A84C]"
            style={{
              border: "1px solid rgba(201,168,76,0.08)",
            }}
          >
            {isRo ? "Înapoi Sus ↑" : "Back to Top ↑"}
          </button>
        </motion.div>

        {/* Bottom cornice */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 h-px w-full max-w-xs"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
          }}
        />
      </div>
    </section>
  );
}
