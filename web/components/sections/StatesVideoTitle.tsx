"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

type StatesVideoTitleProps = {
  // The actual word we render, e.g. "STATES" or "UNITE".
  text: string;
  // Shadow string shared with the rest of the hero title.
  shadow: string;
};

type TextMetrics = {
  // The measured size of the hidden text span in the browser.
  width: number;
  height: number;
  // The typographic values we reuse for both the fallback and the video mask.
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  letterSpacing: number;
};

// We keep the public URL stable so the component does not need to know
// which source file in /VIDEOS was copied into /public/videos.
const FLAG_VIDEO_URL = "/videos/flag-loop.mp4";
const FLAG_POSTER_URL = "/videos/flag-loop-poster.jpg";

function escapeXml(value: string) {
  // SVG markup is just text under the hood, so special characters must be
  // escaped before we inject a word into the SVG string.
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function sanitizeId(value: string) {
  // React's generated ids can contain characters that are awkward in SVG ids.
  // We strip them down so gradient/filter ids stay predictable and valid.
  return value.replace(/[^a-zA-Z0-9_-]/g, "");
}

export function StatesVideoTitle({ text, shadow }: StatesVideoTitleProps) {
  // We render one invisible HTML text node first, then ask the browser how big
  // it really is. That measured size becomes the source of truth for the SVGs.
  const measureRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [metrics, setMetrics] = useState<TextMetrics | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const idBase = sanitizeId(useId());

  useEffect(() => {
    const measureElement = measureRef.current;
    if (!measureElement) return;

    const updateMetrics = () => {
      // Read the real rendered size of the hidden text.
      const rect = measureElement.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        setMetrics(null);
        return;
      }

      // Read the actual computed font styles from the browser. This matters
      // because SVG text and HTML text only line up when they share the same
      // font settings.
      const computedStyle = window.getComputedStyle(measureElement);
      const computedLetterSpacing =
        computedStyle.letterSpacing === "normal"
          ? 0
          : parseFloat(computedStyle.letterSpacing) || 0;
      setMetrics({
        width: rect.width,
        height: rect.height,
        fontSize: parseFloat(computedStyle.fontSize) || rect.height,
        fontFamily:
          computedStyle.fontFamily || '"Archivo Black", system-ui, sans-serif',
        fontWeight: computedStyle.fontWeight || "900",
        letterSpacing: computedLetterSpacing * 0.82,
      });
    };

    // Measure immediately on mount.
    updateMetrics();
    // Measure again if the viewport changes.
    window.addEventListener("resize", updateMetrics);

    // Measure again if the text box itself changes size because of responsive
    // layout, font settling, or locale changes.
    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(measureElement);

    // Wait for fonts to finish loading, then measure one more time so the SVG
    // matches the final font metrics instead of a temporary fallback font.
    void document.fonts?.ready?.then(updateMetrics);

    return () => {
      window.removeEventListener("resize", updateMetrics);
      resizeObserver.disconnect();
    };
  }, [text]);

  useEffect(() => {
    setVideoReady(false);
    setVideoError(false);
    setIsPlaying(false);
  }, [text]);

  // Video playback management & Low Power Mode / Autoplay detection
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 2) {
      setVideoReady(true);
    }

    let isIntersecting = true;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("playing", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    const attemptPlay = () => {
      if (!video || !isIntersecting) return;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Low Power Mode or Autoplay restricted.
            // Pause gracefully and display static img poster through mask.
            setIsPlaying(false);
          });
      }
    };

    attemptPlay();

    // IntersectionObserver to pause video when off-screen for battery/GPU performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isIntersecting) {
        attemptPlay();
      } else {
        video.pause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("playing", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [text]);

  const maskSvg = useMemo(() => {
    if (!metrics) return "";
    // Extra padding around the SVG text prevents the left/right edges of the
    // letters and the soft shadow from being clipped.
    const horizontalBleed = Math.max(metrics.fontSize * 0.08, 8);
    const verticalBleed = Math.max(metrics.fontSize * 0.18, 12);
    const svgWidth = metrics.width + horizontalBleed * 2;
    const svgHeight = metrics.height + verticalBleed * 2;

    // This SVG is not shown directly. It is used as the mask shape for the
    // video layer, so only the letters reveal the flag clip.
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" preserveAspectRatio="xMidYMid meet">
        <text
          x="50%"
          y="50%"
          text-anchor="middle"
          dominant-baseline="central"
          font-family="${escapeXml(metrics.fontFamily)}"
          font-size="${metrics.fontSize}px"
          font-weight="${metrics.fontWeight}"
          letter-spacing="${metrics.letterSpacing}px"
          fill="white"
        >${escapeXml(text)}</text>
      </svg>
    `.trim();

    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, [metrics, text]);

  const statesLineStyle = {
    display: "block",
    fontWeight: 900,
    margin: "0 auto",
    lineHeight: "1.1",
    width: "fit-content",
  } as const;

  const shadowFilterId = `${idBase}-shadow`;
  const horizontalBleed = metrics ? Math.max(metrics.fontSize * 0.08, 8) : 0;
  const verticalBleed = metrics ? Math.max(metrics.fontSize * 0.18, 12) : 0;
  const svgWidth = metrics ? metrics.width + horizontalBleed * 2 : 0;
  const svgHeight = metrics ? metrics.height + verticalBleed * 2 : 0;

  return (
    <span className="relative isolate mx-auto block w-fit" style={statesLineStyle}>
      {/* Inline styles to suppress WebKit native media controls / play button bubbles */}
      <style>{`
        video::-webkit-media-controls-start-playback-button,
        video::-webkit-media-controls-play-button,
        video::-webkit-media-controls-overlay-play-button,
        video::-webkit-media-controls {
          display: none !important;
          -webkit-appearance: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}</style>

      <span
        ref={measureRef}
        aria-hidden="true"
        className="relative block whitespace-nowrap"
        style={{ visibility: "hidden" }}
      >
        {/* Invisible measuring text. It exists only to give us exact font metrics. */}
        {text}
      </span>

      {/* Video / Poster layer with text mask */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute block overflow-hidden"
        style={
          metrics
            ? {
                left: -horizontalBleed,
                top: -verticalBleed,
                width: svgWidth,
                height: svgHeight,
                WebkitMaskImage: maskSvg,
                maskImage: maskSvg,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }
            : { opacity: 0 }
        }
      >
        {/* Pure static image fallback for Low Power Mode / paused state.
            An <img> tag never renders WebKit play button bubbles. */}
        <img
          src={FLAG_POSTER_URL}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Video element: hidden via visibility when paused so Safari cannot overlay play controls */}
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover pointer-events-none transition-opacity duration-300 ${
            isPlaying ? "opacity-100" : "opacity-0 invisible"
          }`}
          src={FLAG_VIDEO_URL}
          poster={FLAG_POSTER_URL}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          tabIndex={-1}
          aria-hidden="true"
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoError(true)}
        />
      </span>

      {metrics ? (
        <>
          {/* Soft shadow layer. This sits behind both the video version and the
              static fallback so the middle word matches the other hero lines. */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 block overflow-visible"
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            style={{
              left: -horizontalBleed,
              top: -verticalBleed,
            }}
          >
            <defs>
              <filter
                id={shadowFilterId}
                x="-30%"
                y="-40%"
                width="160%"
                height="200%"
                colorInterpolationFilters="sRGB"
              >
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.38" />
                <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#000000" floodOpacity="0.3" />
                <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.24" />
              </filter>
            </defs>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily={metrics.fontFamily}
              fontSize={metrics.fontSize}
              fontWeight={metrics.fontWeight}
              letterSpacing={`${metrics.letterSpacing}px`}
              fill="#ffffff"
              fillOpacity={(!videoReady || videoError) ? "1" : "0.001"}
              filter={`url(#${shadowFilterId})`}
            >
              {text}
            </text>
          </svg>
        </>
      ) : null}
    </span>
  );
}
