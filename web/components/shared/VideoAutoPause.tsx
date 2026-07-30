"use client";

// ─── VideoAutoPause ───────────────────────────────────────────────────────────
// Site-wide guard that pauses every decorative background video the moment it
// scrolls off-screen, then resumes it when it comes back into view.
//
// Why: Safari's "Graphics and Media" (GPU/media) process keeps a hardware
// decoder + looping frame buffers resident in RAM for EVERY playing <video> on
// the page: even ones far below the fold. A page with several ambient hero /
// section backdrops therefore pins multiple decoders at once, which is the main
// driver of the high RAM/CPU the user observed. Pausing off-screen videos lets
// Safari release those decoders; nothing is unloaded, so scrolling back is
// instant and visual quality is untouched.
//
// Scope: only muted autoplay/loop videos (the site's ambient backdrops). User
// controlled players (with controls, unmuted, or click-to-play) are left alone.
// Mounted once in the root layout; a MutationObserver picks up videos added by
// client navigation or lazily-rendered sections.

import { useEffect } from "react";

const isBackgroundVideo = (v: HTMLVideoElement) =>
  v.muted && (v.autoplay || v.loop) && !v.controls;

export function VideoAutoPause() {
  useEffect(() => {
    const managed = new WeakSet<HTMLVideoElement>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            if (v.paused) v.play().catch(() => {});
          } else if (!v.paused) {
            v.pause();
          }
        }
      },
      { threshold: 0.01 },
    );

    const register = (v: HTMLVideoElement) => {
      if (managed.has(v) || !isBackgroundVideo(v)) return;
      managed.add(v);
      io.observe(v);
    };

    document
      .querySelectorAll("video")
      .forEach((v) => register(v as HTMLVideoElement));

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLVideoElement) {
            register(node);
          } else if (node instanceof HTMLElement) {
            node
              .querySelectorAll("video")
              .forEach((v) => register(v as HTMLVideoElement));
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

export default VideoAutoPause;
