"use client";
// ─── The Midnight Gallery ────────────────────────────────────────────────────
// A private, climate-controlled vault deep beneath the National Archives.
// Dark and quiet. Dramatic spotlights on individual portraits. 3D parallax
// on mouse movement. Gilt frames. Dossier panels on click.

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { FoundingFather } from "@/lib/data/constitution-data";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

// ── Portrait Card with 3D parallax ──────────────────────────────────────────
function PortraitCard({
  founder,
  isActive,
  onSelect,
  isRo,
}: {
  founder: FoundingFather;
  isActive: boolean;
  onSelect: () => void;
  isRo?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (cy - 0.5) * -12, y: (cx - 0.5) * 12 });
    setGlare({ x: cx * 100, y: cy * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  }, []);

  // Mobile: gyroscope parallax
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) return;

    const handler = (e: DeviceOrientationEvent) => {
      const beta = Math.min(Math.max(e.beta ?? 0, -30), 30);
      const gamma = Math.min(Math.max(e.gamma ?? 0, -30), 30);
      setTilt({ x: beta * 0.3, y: gamma * 0.3 });
    };

    // Feature detect & request permission (iOS 13+)
    const dOE = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    if (typeof dOE.requestPermission === "function") {
      // Permission will be requested on first user interaction
    } else {
      window.addEventListener("deviceorientation", handler);
    }
    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="relative"
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Spotlight from above */}
        <div
          className="absolute -inset-8 -top-16 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Gilt frame */}
        <div
          className="relative overflow-hidden"
          style={{
            border: "3px solid",
            borderImage: "linear-gradient(180deg, #D4AF6A 0%, #8B6A2A 40%, #C9A84C 60%, #8B6A2A 100%) 1",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.8), 0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.15)",
          }}
        >
          {/* Portrait image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={founder.portraitSrc}
              alt={founder.portraitAlt}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              style={{ filter: "sepia(30%) saturate(0.8) contrast(1.1) brightness(0.85)" }}
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              quality={100}
            />

            {/* Museum glass overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.04) 0%, transparent 60%)`,
                backdropFilter: "brightness(1.02)",
              }}
            />

            {/* Bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        </div>

        {/* Brass nameplate */}
        <div className="mt-3 text-center">
          <p
            className="font-body text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              background: "linear-gradient(180deg, #E8C878 0%, #C9A84C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {founder.name}
          </p>
          <p className="mt-0.5 font-body text-[10px] text-[#6B6860]">
            {founder.years}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Dossier Panel ────────────────────────────────────────────────────────────
function DossierPanel({
  founder,
  onClose,
  isRo,
}: {
  founder: FoundingFather;
  onClose: () => void;
  isRo?: boolean;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

      {/* Dossier card */}
      <motion.div
        className="relative z-10 mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-sm"
        style={{
          background: "linear-gradient(168deg, rgba(12,16,24,0.98) 0%, rgba(8,11,18,1) 100%)",
          border: "1px solid rgba(201,168,76,0.12)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.06)",
        }}
        initial={{ y: 60, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 40, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Close button — gear-tooth style */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[rgba(201,168,76,0.1)]"
          style={{
            border: "1px solid rgba(201,168,76,0.2)",
            color: "#C9A84C",
            fontSize: "16px",
          }}
          aria-label="Close dossier"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-[280px_1fr]">
          {/* Portrait side */}
          <div className="relative h-64 overflow-hidden md:h-auto">
            <Image
              src={founder.portraitSrc}
              alt={founder.portraitAlt}
              fill
              sizes="(max-width: 768px) 100vw, 280px"
              className="object-cover object-top"
              style={{ filter: "sepia(25%) saturate(0.85) contrast(1.1) brightness(0.9)" }}
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              quality={100}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, transparent 40%, rgba(8,11,18,0.98) 100%)",
              }}
            />
            <div
              className="absolute inset-0 md:hidden"
              style={{
                background: "linear-gradient(to bottom, transparent 40%, rgba(8,11,18,0.98) 100%)",
              }}
            />
          </div>

          {/* Dossier content */}
          <div className="p-6 md:p-8">
            {/* Header */}
            <p className="mb-1 font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[rgba(201,168,76,0.5)]">
              {isRo ? "── Dosar Fondator ──" : "── Founder Dossier ──"}
            </p>
            <h3 className="mb-1 font-display text-3xl font-semibold text-[#F5F0E8]">
              {founder.name}
            </h3>
            <p className="mb-6 font-body text-sm text-[#C9A84C]">{founder.years}</p>

            {/* Role */}
            <div className="mb-6 space-y-1.5 font-body" style={{ fontVariantNumeric: "tabular-nums" }}>
              {[
                { label: isRo ? "ROL" : "ROLE", value: founder.role },
              ].map((r) => (
                <div key={r.label} className="flex items-baseline gap-2 text-[12px]">
                  <span className="shrink-0 uppercase tracking-[0.15em] text-[#6B6860]">{r.label}</span>
                  <span className="flex-1 border-b border-dotted border-[rgba(201,168,76,0.08)]" />
                  <span className="text-[#B8B4AC]">{r.value}</span>
                </div>
              ))}
            </div>

            {/* Key Contributions */}
            <div className="mb-6">
              <p className="mb-3 font-body text-[9px] font-semibold uppercase tracking-[0.15em] text-[rgba(201,168,76,0.5)]">
                {isRo ? "── Contribuții Cheie ──" : "── Key Contributions ──"}
              </p>
              <ol className="space-y-2">
                {founder.contributions.map((c, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 shrink-0 font-hero text-sm text-[rgba(201,168,76,0.4)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-body text-sm leading-relaxed text-[#B8B4AC]">{c}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Notable Quote */}
            <div className="mb-6">
              <p className="mb-3 font-body text-[9px] font-semibold uppercase tracking-[0.15em] text-[rgba(201,168,76,0.5)]">
                {isRo ? "── Citat Notabil ──" : "── Notable Quote ──"}
              </p>
              <blockquote className="border-l-2 border-[rgba(201,168,76,0.3)] pl-4">
                <p
                  className="leading-relaxed text-[#F5F0E8]/80"
                  style={{
                    fontFamily: "'EB Garamond', 'Georgia', serif",
                    fontStyle: "italic",
                    fontSize: "clamp(15px, 1.5vw, 18px)",
                  }}
                >
                  &ldquo;{founder.quote}&rdquo;
                </p>
                <cite className="mt-2 block font-body text-[10px] not-italic uppercase tracking-[0.15em] text-[#C9A84C]">
                  — {founder.quoteSource}
                </cite>
              </blockquote>
            </div>

            {/* Connections */}
            {founder.connections.length > 0 && (
              <div>
                <p className="mb-2 font-body text-[9px] font-semibold uppercase tracking-[0.15em] text-[rgba(201,168,76,0.5)]">
                  {isRo ? "── Conexiuni ──" : "── Connections ──"}
                </p>
                <p className="font-body text-sm text-[#6B6860]">
                  → {founder.connections.join(" · ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Gallery Export ──────────────────────────────────────────────────────
export function MidnightGallery({
  founders,
  isRo,
}: {
  founders: FoundingFather[];
  isRo?: boolean;
}) {
  const [activeFoE, setActiveFoE] = useState<FoundingFather | null>(null);

  return (
    <div className="relative">
      {/* Vault atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(201,168,76,0.02) 0%, transparent 60%)",
        }}
      />

      {/* Portrait grid — flex with justify-center so last row is centered */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {founders.map((f) => (
          <div key={f.id} className="w-[calc(50%-12px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-24px)] xl:w-[calc(20%-26px)]">
            <PortraitCard
              founder={f}
              isActive={activeFoE?.id === f.id}
              onSelect={() => setActiveFoE(f)}
              isRo={isRo}
            />
          </div>
        ))}
      </div>

      {/* Vault floor indicator */}
      <p className="mt-8 text-center font-body text-[10px] uppercase tracking-[0.3em] text-[#6B6860]">
        {isRo
          ? "Dă click pe un portret pentru a deschide dosarul"
          : "Click a portrait to open the dossier"}
      </p>

      {/* Dossier overlay */}
      <AnimatePresence>
        {activeFoE && (
          <DossierPanel
            key={activeFoE.id}
            founder={activeFoE}
            onClose={() => setActiveFoE(null)}
            isRo={isRo}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
