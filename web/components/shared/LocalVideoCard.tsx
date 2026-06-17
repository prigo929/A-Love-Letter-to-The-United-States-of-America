"use client";

// ─── LocalVideoCard ───────────────────────────────────────────────────────────
// Plays a locally-hosted MP4 from /public/videos. Shows a poster/first-frame with
// a play button; on click it starts playback and reveals native controls. Light
// by default (preload="metadata") so a grid of these stays fast.

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocalVideoCardProps {
  src: string;
  title: string;
  poster?: string;
  aspectClassName?: string;
  className?: string;
}

export function LocalVideoCard({
  src,
  title,
  poster,
  aspectClassName = "aspect-video",
  className,
}: LocalVideoCardProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    ref.current?.play().catch(() => {});
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black",
        aspectClassName,
        className,
      )}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls={started}
        preload="metadata"
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!started && (
        <button
          type="button"
          onClick={start}
          className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold"
          aria-label={`Play: ${title}`}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent transition group-hover:from-black/60" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-glory-gold shadow-gold-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-0.5 h-6 w-6 fill-navy-dark text-navy-dark" aria-hidden="true" />
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 p-3 text-left">
            <span className="font-display text-sm font-semibold text-white drop-shadow">{title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
