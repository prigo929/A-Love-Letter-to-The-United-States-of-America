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
  // We keep a ref to the <video> so we can inspect its load state and manually
  // reset playback before the final paused frame becomes visible.
  const videoRef = useRef<HTMLVideoElement>(null);
  // This lock prevents multiple loop-reset events from firing at nearly the
  // same time when the video is close to its final frame.
  const restartLockRef = useRef(false);
  const [metrics, setMetrics] = useState<TextMetrics | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
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
    // Whenever the word changes, treat the video as "not ready" again until
    // the new render confirms otherwise.
    setVideoReady(false);
    setVideoError(false);
  }, [text]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    restartLockRef.current = false;

    if (video.readyState >= 3) {
      // If the browser already has enough data to play the video (for example
      // because it came from cache), mark it ready immediately.
      setVideoReady(true);
    }

    const resumePlayback = () => {
      void video.play().catch(() => {
        // Ignore autoplay/playback promise noise. The fallback UI already
        // handles real loading failures through `videoError`.
      });
    };

    const restartFromBeginning = () => {
      if (restartLockRef.current || !video.duration) return;
      restartLockRef.current = true;

      // Some browsers need the seek to finish before a new `play()` call will
      // actually resume motion. We wait for `seeked`, then clear the lock.
      const handleSeeked = () => {
        restartLockRef.current = false;
        resumePlayback();
      };

      video.addEventListener("seeked", handleSeeked, { once: true });
      video.currentTime = 0.02;

      // Safety net: if `seeked` is skipped or delayed, still try to resume.
      window.setTimeout(() => {
        if (!restartLockRef.current) return;
        restartLockRef.current = false;
        resumePlayback();
      }, 80);
    };

    const syncLoop = () => {
      // Jump back slightly before the final frame so the user never sees the
      // native pause that some browsers show at the end of a loop.
      if (video.duration && video.currentTime >= video.duration - 0.18) {
        restartFromBeginning();
      }
    };

    const handleEnded = () => {
      restartFromBeginning();
    };

    const intervalId = window.setInterval(syncLoop, 16);
    video.addEventListener("timeupdate", syncLoop);
    video.addEventListener("ended", handleEnded);

    return () => {
      window.clearInterval(intervalId);
      video.removeEventListener("timeupdate", syncLoop);
      video.removeEventListener("ended", handleEnded);
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

  // Show the fallback until we know the text metrics and the video is playable.
  const showFallback = !metrics || !videoReady || videoError;
  const statesLineStyle = {
    display: "block",
    fontWeight: 900,
    margin: "0 auto",
    lineHeight: "1.1",
    width: "fit-content",
  } as const;

  const gradientId = `${idBase}-gradient`;
  const shadowFilterId = `${idBase}-shadow`;
  const horizontalBleed = metrics ? Math.max(metrics.fontSize * 0.08, 8) : 0;
  const verticalBleed = metrics ? Math.max(metrics.fontSize * 0.18, 12) : 0;
  const svgWidth = metrics ? metrics.width + horizontalBleed * 2 : 0;
  const svgHeight = metrics ? metrics.height + verticalBleed * 2 : 0;

  return (
    <span className="relative isolate mx-auto block w-fit" style={statesLineStyle}>
      <span
        ref={measureRef}
        aria-hidden="true"
        className="relative block whitespace-nowrap"
        style={{ visibility: "hidden" }}
      >
        {/* Invisible measuring text. It exists only to give us exact font metrics. */}
        {text}
      </span>

      {metrics ? (
        <>
          {/* Soft shadow layer. This sits behind both the video version and the
              gradient fallback so the middle word matches the other hero lines. */}
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
              fillOpacity="0.001"
              filter={`url(#${shadowFilterId})`}
            >
              {text}
            </text>
          </svg>

          {/* Video layer. The video is real, but the SVG mask makes it visible
              only through the letter shapes. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute block overflow-hidden"
            style={{
              opacity: showFallback ? 0 : 1,
              transition: "opacity 260ms ease",
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
            }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={FLAG_VIDEO_URL}
              autoPlay
              muted
              playsInline
              preload="auto"
              onCanPlay={() => setVideoReady(true)}
              onLoadedData={() => setVideoReady(true)}
              onError={() => {
                console.log("Video Error");
                setVideoError(true);
              }}
            />
          </span>

          {/* Fallback gradient text. This is what we show while the video is not
              ready, or if the video fails to load. */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute block overflow-visible"
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            style={{
              opacity: showFallback ? 1 : 0,
              transition: "opacity 260ms ease",
              left: -horizontalBleed,
              top: -verticalBleed,
            }}
          >
            <defs>
              <filter
                id={`${shadowFilterId}-fallback`}
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
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B31942" />
                <stop offset="25%" stopColor="#B31942" />
                <stop offset="45%" stopColor="#FFFFFF" />
                <stop offset="55%" stopColor="#FFFFFF" />
                <stop offset="75%" stopColor="#0A3161" />
                <stop offset="100%" stopColor="#0A3161" />
              </linearGradient>
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
              fill={`url(#${gradientId})`}
              filter={`url(#${shadowFilterId}-fallback)`}
            >
              {text}
            </text>
          </svg>
        </>
      ) : null}
    </span>
  );
}
