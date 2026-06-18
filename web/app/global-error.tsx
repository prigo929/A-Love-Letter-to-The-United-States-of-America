"use client";

// ─── Global Error Boundary ────────────────────────────────────────────────────
// Catches errors that occur in the ROOT LAYOUT itself. This is the last resort
// error page — it replaces the entire <html> shell because the layout that
// normally provides <html>, <head>, <body> has failed.
//
// Because it replaces the root layout, it MUST include its own <html> and <body>.
// Keep this page minimal — no imported components that might also be broken.

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#000000",
          color: "#ffffff",
          fontFamily: '"Inter", system-ui, sans-serif',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480, padding: "2rem" }}>
          {/* Minimal star decoration */}
          <div
            style={{
              fontSize: 14,
              color: "#FFD700",
              letterSpacing: "0.5em",
              marginBottom: 24,
            }}
          >
            ★ ★ ★
          </div>

          <h1
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 700,
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Critical System Error
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.6,
              marginBottom: 8,
            }}
          >
            Something went seriously wrong. The entire page couldn&apos;t load.
          </p>

          {error.digest && (
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.2)",
                fontFamily: "monospace",
                marginBottom: 32,
              }}
            >
              Error ID: {error.digest}
            </p>
          )}

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={reset}
              style={{
                padding: "12px 24px",
                backgroundColor: "#FFD700",
                color: "#000000",
                border: "none",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Try Again
            </button>
            <a
              href="/"
              style={{
                padding: "12px 24px",
                backgroundColor: "transparent",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "none",
                fontFamily: "inherit",
              }}
            >
              Return Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
