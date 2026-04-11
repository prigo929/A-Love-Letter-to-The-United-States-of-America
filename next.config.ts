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
    ],
    // Prefer WebP/AVIF for smaller file sizes
    formats: ["image/avif", "image/webp"],
    // Allow the quality levels used by next/image in this app
    qualities: [75, 85],
    // Device breakpoints for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
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
          // Preload critical fonts
          {
            key: "Link",
            value: [
              '</fonts/bebas-neue.woff2>; rel=preload; as=font; type="font/woff2"; crossorigin',
              '</fonts/playfair-display.woff2>; rel=preload; as=font; type="font/woff2"; crossorigin',
            ].join(", "),
          },
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
