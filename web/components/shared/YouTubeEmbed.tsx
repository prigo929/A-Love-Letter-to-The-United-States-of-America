"use client";

// ─── YouTubeEmbed ─────────────────────────────────────────────────────────────
// A chrome-free YouTube player. Shows a thumbnail facade; on click it enters
// fullscreen and autoplays via the IFrame Player API (react-youtube). A
// transparent overlay sits on top of the player so YouTube's own UI never
// receives hover/clicks — clicking the overlay just toggles play/pause.
//
// Note: YouTube can't be forced to a fixed resolution from an embed; it
// auto-selects up to 4K/HDR based on the (now fullscreen) player size + bandwidth.

import { useRef, useState } from "react";
import YouTube, { type YouTubeEvent } from "react-youtube";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type Player = YouTubeEvent["target"];

interface YouTubeEmbedProps {
  id: string;
  title: string;
  /** Tailwind aspect ratio class, defaults to 16/9. */
  aspectClassName?: string;
  className?: string;
}

export function YouTubeEmbed({
  id,
  title,
  aspectClassName = "aspect-video",
  className,
}: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const requestFullscreen = () => {
    const el = containerRef.current as
      | (HTMLDivElement & { webkitRequestFullscreen?: () => void })
      | null;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    else el.webkitRequestFullscreen?.();
  };

  const start = () => {
    setPlaying(true);
    requestFullscreen();
  };

  const togglePlay = () => {
    const p = playerRef.current;
    if (!p) return;
    // 1 = playing, 2 = paused
    if (p.getPlayerState() === 1) p.pauseVideo();
    else p.playVideo();
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black",
        aspectClassName,
        // Fill the screen edge-to-edge when fullscreen (drop the aspect/rounding).
        "[&:fullscreen]:aspect-auto [&:fullscreen]:h-screen! [&:fullscreen]:w-screen! [&:fullscreen]:rounded-none [&:fullscreen]:border-0",
        className,
      )}
    >
      {playing ? (
        <>
          <YouTube
            videoId={id}
            className="absolute inset-0 h-full w-full"
            iframeClassName="absolute inset-0 h-full w-full"
            onReady={(e: YouTubeEvent) => {
              playerRef.current = e.target;
            }}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 1,
                controls: 0,
                modestbranding: 1,
                rel: 0,
                iv_load_policy: 3,
                disablekb: 1,
                fs: 0,
                playsinline: 1,
                color: "white",
              },
            }}
          />
          {/* Transparent layer: blocks YouTube's hover UI and toggles play/pause. */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={`Play/pause: ${title}`}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer bg-transparent"
          />
        </>
      ) : (
        <button
          type="button"
          onClick={start}
          className="absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold"
          aria-label={`Play: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt={title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-glory-gold shadow-gold-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-1 h-8 w-8 fill-navy-dark text-navy-dark" aria-hidden="true" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
