"use client";

// ─── CursorEffects ────────────────────────────────────────────────────────────
// Site-wide cursor spotlight: a soft gold radial glow that follows the pointer
// across card surfaces. Mounted once in the root layout; uses event delegation
// against the cards' shared utility classes so individual pages never need to
// opt in. The visual itself lives in globals.css under `.spot-glow::after`.
//
// Pointer-only (skipped on touch devices and when reduced motion is set).

import { useEffect } from "react";

const CARD_SELECTOR = [
  ".rounded-3xl.border",
  ".rounded-2xl.border",
  ".rounded-xl.border",
  ".rounded-lg.border",
].join(", ");

export function CursorEffects() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let rafId = 0;
    let pending: PointerEvent | null = null;
    let lastCard: HTMLElement | null = null;

    const apply = () => {
      rafId = 0;
      const e = pending;
      if (!e) return;
      const target = e.target as Element | null;
      const card = (target?.closest?.(CARD_SELECTOR) as HTMLElement | null) ?? null;

      if (card !== lastCard && lastCard) {
        lastCard.style.setProperty("--spot-o", "0");
      }
      if (card) {
        const rect = card.getBoundingClientRect();
        card.classList.add("spot-glow");
        card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
        card.style.setProperty("--spot-o", "1");
      }
      lastCard = card;
    };

    const onPointerMove = (e: PointerEvent) => {
      pending = e;
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    const onPointerLeave = () => {
      if (lastCard) {
        lastCard.style.setProperty("--spot-o", "0");
        lastCard = null;
      }
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
