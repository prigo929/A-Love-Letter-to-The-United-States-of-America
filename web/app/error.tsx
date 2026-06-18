"use client";

// ─── Error Boundary ───────────────────────────────────────────────────────────
// Catches runtime errors in any page below the root layout.
// Must be a client component because it uses `useEffect` and the `reset` callback.
//
// This wraps the `{children}` inside layout.tsx, so the Header/Footer still
// render normally — only the broken page content gets replaced.

import { useEffect } from "react";
import { Star, AlertTriangle, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your error reporting service in production
    console.error("[Error Boundary]", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] bg-navy-dark text-white flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(178,34,52,0.08) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center max-w-xl mx-auto">
        {/* Star row */}
        <div className="flex items-center justify-center gap-1.5 mb-8" aria-hidden="true">
          {[...Array(3)].map((_, i) => (
            <Star
              key={i}
              className="w-3 h-3 fill-glory-gold/40 text-glory-gold/40"
            />
          ))}
        </div>

        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 rounded-2xl bg-glory-red/10 border border-glory-red/20">
            <AlertTriangle className="w-10 h-10 text-glory-red" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-display text-h3 text-white mb-4 text-balance">
          Mission Control: We Have a Problem
        </h1>

        {/* Description */}
        <p className="font-body text-body text-white/60 mb-2 max-w-md mx-auto">
          Something went wrong while loading this page. Our engineers have been
          notified and are on it.
        </p>

        {/* Error digest for debugging (production-safe) */}
        {error.digest && (
          <p className="font-mono text-xs text-white/20 mb-6">
            Error ID: {error.digest}
          </p>
        )}

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-8" aria-hidden="true">
          <div className="w-12 h-px bg-glory-gold/30" />
          <Star className="w-3 h-3 fill-glory-gold/50 text-glory-gold/50" />
          <div className="w-12 h-px bg-glory-gold/30" />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-glory-gold text-navy-dark font-body font-semibold text-sm hover:bg-glory-gold-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          <Button href="/" variant="ghost" size="lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
