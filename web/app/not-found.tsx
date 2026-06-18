// ─── 404 Page ─────────────────────────────────────────────────────────────────
// Cinematic "territory not found" page with patriotic styling.
// This is a Server Component — it doesn't need "use client".

import type { Metadata } from "next";
import Link from "next/link";
import { Star, MapPin, ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "404 — Territory Not Found",
  description: "The page you're looking for doesn't exist. Explore the rest of America instead.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen-safe bg-navy-dark text-white flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 bg-star-pattern-grid opacity-30"
        aria-hidden="true"
      />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(60,59,110,0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Star row */}
        <div className="flex items-center justify-center gap-1.5 mb-8" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-3 h-3 fill-glory-gold/40 text-glory-gold/40"
            />
          ))}
        </div>

        {/* 404 number */}
        <div className="font-hero text-[clamp(100px,20vw,200px)] leading-none text-glory-gold/10 select-none mb-4">
          404
        </div>

        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <MapPin className="w-12 h-12 text-glory-red/60" />
            <Compass className="w-5 h-5 text-glory-gold absolute -top-1 -right-2 animate-spin-slow" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-display text-h2 text-white mb-4 text-balance">
          Territory Not Found
        </h1>

        {/* Description */}
        <p className="font-body text-body-lg text-white/60 mb-4 max-w-md mx-auto leading-relaxed">
          This part of the map hasn&apos;t been charted yet. The page you&apos;re looking for
          may have been moved, renamed, or doesn&apos;t exist.
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 my-8" aria-hidden="true">
          <div className="w-12 h-px bg-glory-gold/30" />
          <Star className="w-3 h-3 fill-glory-gold/50 text-glory-gold/50" />
          <div className="w-12 h-px bg-glory-gold/30" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" variant="gold" size="lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return Home
          </Button>
          <Button href="/sitemap" variant="ghost" size="lg">
            View All Sections
          </Button>
        </div>

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="font-body text-xs text-white/30 uppercase tracking-widest mb-4">
            Popular Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "Economy", href: "/economy" },
              { label: "Military", href: "/military" },
              { label: "Nature", href: "/nature" },
              { label: "History", href: "/history" },
              { label: "Constitution", href: "/constitution" },
              { label: "Culture", href: "/culture" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm text-white/50 hover:text-glory-gold px-3 py-1.5 rounded-lg border border-white/10 hover:border-glory-gold/30 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
