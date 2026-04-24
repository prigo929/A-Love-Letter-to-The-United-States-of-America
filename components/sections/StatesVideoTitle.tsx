"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

type StatesVideoTitleProps = {
  text: string;
  shadow: string;
};

type TextMetrics = {
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  letterSpacing: number;
};

const FLAG_VIDEO_URL = "/videos/flag-loop.mp4";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function sanitizeId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "");
}

export function StatesVideoTitle({ text, shadow }: StatesVideoTitleProps) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [metrics, setMetrics] = useState<TextMetrics | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const idBase = sanitizeId(useId());

  useEffect(() => {
    const measureElement = measureRef.current;
    if (!measureElement) return;

    const updateMetrics = () => {
      const rect = measureElement.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        setMetrics(null);
        return;
      }

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

    updateMetrics();
    window.addEventListener("resize", updateMetrics);

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(measureElement);

    void document.fonts?.ready?.then(updateMetrics);

    return () => {
      window.removeEventListener("resize", updateMetrics);
      resizeObserver.disconnect();
    };
  }, [text]);

  useEffect(() => {
    setVideoReady(false);
    setVideoError(false);
  }, [text]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 3) {
      setVideoReady(true);
    }

    const syncLoop = () => {
      if (video.duration && video.currentTime >= video.duration - 0.12) {
        video.currentTime = 0.02;
        void video.play();
      }
    };

    const handleEnded = () => {
      video.currentTime = 0.02;
      void video.play();
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
    const horizontalBleed = Math.max(metrics.fontSize * 0.08, 8);
    const verticalBleed = Math.max(metrics.fontSize * 0.18, 12);
    const svgWidth = metrics.width + horizontalBleed * 2;
    const svgHeight = metrics.height + verticalBleed * 2;

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
        {text}
      </span>

      {metrics ? (
        <>
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
              preload="metadata"
              onLoadedData={() => setVideoReady(true)}
              onError={() => {
                console.log("Video Error");
                setVideoError(true);
              }}
            />
          </span>

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
