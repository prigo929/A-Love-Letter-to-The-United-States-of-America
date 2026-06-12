"use client";

// ─── Magnetic ─────────────────────────────────────────────────────────────────
// Wraps interactive elements. Formerly provided magnetic cursor gravitation,
// now disabled for a cleaner, unified hover feel.

import React from "react";

export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
