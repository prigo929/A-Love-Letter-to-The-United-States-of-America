import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Image Optimization ─────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        // Unsplash high-quality placeholder images
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        // Unsplash photo and download pages
        protocol: "https",
        hostname: "unsplash.com",
        pathname: "/photos/**",
      },
      {
        // Pexels images
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        // NASA images
        protocol: "https",
        hostname: "*.nasa.gov",
        pathname: "/**",
      },
      {
        // Wikimedia Commons document scans and portraits
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/**",
      },
      {
        // DVIDS — Defense Visual Information Distribution Service
        protocol: "https",
        hostname: "media.defense.gov",
        pathname: "/**",
      },
      {
        // Pixabay CDN
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "/**",
      },
      {
        // YouTube thumbnails
        protocol: "https",
        hostname: "*.ytimg.com",
        pathname: "/**",
      },
    ],
    // Prefer WebP for faster real-world first loads. AVIF can be smaller, but
    // it is slower to encode on first request, which hurts perceived speed.
    formats: ["image/webp"],
    // Allow the quality levels used by next/image in this app
    qualities: [75, 85, 90, 100],
    // Cache optimized images for a shorter duration (1 day) to allow eviction of stale images.
    minimumCacheTTL: 60 * 60 * 24,
    // Limit Next.js image disk cache size to 100MB to prevent ballooning cache folders
    maximumDiskCacheSize: 104857600,
    // Device breakpoints for responsive images. Keep the set useful, but avoid
    // generating unnecessary ultra-large variants for most screens.
    deviceSizes: [640, 1080, 1920, 2560],
    imageSizes: [32, 64, 128, 256, 384],
  },

  // ─── Experimental ───────────────────────────────────────────────
  experimental: {
    // The Electoral Archive generates a massive biennial dataset (1788-2024).
    // The sequential initialization in electoral-data.ts keeps this well under limits.
    serverSourceMaps: false,
    // Optimize memory during compilation
    webpackMemoryOptimizations: true,
    optimizePackageImports: ["lucide-react", "framer-motion", "recharts", "zod", "zustand"],
    // Disable Turbopack disk caching to prevent local development folder from growing to massive sizes (e.g. 80GB+)
    turbopackFileSystemCacheForDev: false,
  },

  // ─── Turbopack ───────────────────────────────────────────────────
  turbopack: {
    root: path.resolve(__dirname),
  },

  // ─── Compiler ────────────────────────────────────────────────────
  compiler: {
    // Remove console.log in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // ─── Headers ─────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security headers
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Hero videos and other static clips should also be treated as
        // immutable assets once deployed.
        source: "/videos/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ─── Redirects ───────────────────────────────────────────────────
  async redirects() {
    return [
      // Convenience aliases
      { source: "/map", destination: "/explorer", permanent: false },
      {
        source: "/parks",
        destination: "/nature/national-parks",
        permanent: false,
      },
      // History section reorganization — preserve old URLs
      { source: "/history/arsenal-of-democracy", destination: "/history/wwii", permanent: true },
      { source: "/history/the-american-dream", destination: "/history/american-dream", permanent: true },
      { source: "/history/cold-war-and-anti-communism", destination: "/history/cold-war", permanent: true },
      { source: "/history/the-reagan-revolution", destination: "/history/reagan-revolution", permanent: true },
      { source: "/history/the-populist-era", destination: "/history/populist-era", permanent: true },
      { source: "/history/free-markets-and-prosperity", destination: "/history/free-markets", permanent: true },
      { source: "/history/faith-family-and-community", destination: "/history/faith-and-family", permanent: true },
      { source: "/history/border-sovereignty-and-national-identity", destination: "/history/border-sovereignty", permanent: true },
    ];
  },
};

export default nextConfig;
