// This file generates the browser tab favicon as a PNG via Next.js ImageResponse.
// Next.js picks this up automatically as a route-level icon (Web App Manifest icon).
// Safari prefers raster icons over SVG, and this file produces a proper PNG at the
// correct sizes without requiring any external tooling.

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      // US Flag simplified: red background, blue canton, white stripes implied by layout
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        {/* 13 alternating red/white stripes */}
        {Array.from({ length: 13 }, (_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: i % 2 === 0 ? "#B22234" : "#FFFFFF",
            }}
          />
        ))}
        {/* Blue canton overlay — top-left ~40% width, ~54% height (7 of 13 stripes) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 13,
            height: 17,
            background: "#3C3B6E",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            padding: 1,
          }}
        >
          {/* 50 stars approximated as a 5x5 dot grid for legibility at 32px */}
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={i}
              style={{
                width: 1.5,
                height: 1.5,
                borderRadius: "50%",
                background: "#FFFFFF",
                margin: 0.3,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
