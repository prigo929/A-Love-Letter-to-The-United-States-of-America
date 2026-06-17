"use client";

// ─── YouTubeEmbed ─────────────────────────────────────────────────────────────
// Shows a thumbnail facade; clicking it loads the real YouTube player with full
// native chrome — play/pause, the settings gear (quality/captions/speed), and
// the fullscreen button. Double-clicking the video toggles fullscreen (native
// YouTube behavior). YouTube auto-selects resolution up to 4K/HDR by player size
// and bandwidth.

import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const src =
    `https://www.youtube-nocookie.com/embed/${id}` +
    `?autoplay=1&rel=0&modestbranding=1&playsinline=1&color=white`;

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black",
        aspectClassName,
        className,
      )}
    >
      {playing ? (
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
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
