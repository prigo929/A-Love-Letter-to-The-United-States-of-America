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
    ],
    // Prefer WebP for faster real-world first loads. AVIF can be smaller, but
    // it is slower to encode on first request, which hurts perceived speed.
    formats: ["image/webp"],
    // Allow the quality levels used by next/image in this app
    qualities: [75, 85, 100],
    // Cache optimized images aggressively so repeat visits and route
    // transitions do not keep paying the transform cost.
    minimumCacheTTL: 60 * 60 * 24 * 365,
    // Device breakpoints for responsive images. Keep the set useful, but avoid
    // generating unnecessary ultra-large variants for most screens.
    deviceSizes: [640, 750, 828, 1080, 1200, 1536, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
    ];
  },
};

export default nextConfig;
