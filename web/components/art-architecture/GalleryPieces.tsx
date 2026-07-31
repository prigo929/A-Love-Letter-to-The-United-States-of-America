// ─── GalleryPieces ───────────────────────────────────────────────────────────
// Museum-quality presentation primitives for the art pages: a framed, matted
// painting with an engraved caption plate ("gilt" for the 19th-century Hudson
// River wall, "cube" for the white-cube modern gallery), and a spotlight layout
// pairing a large framed work with prose. Server components: pure markup + image.

import Image from "next/image";

type FrameVariant = "gilt" | "cube";

const GILT_BORDER =
  "linear-gradient(135deg,#8a6d1f 0%,#e8c86a 22%,#b8860b 48%,#f0dc9a 68%,#7a5e18 100%)";

function Frame({
  src,
  alt,
  variant,
  priority,
}: {
  src: string;
  alt: string;
  variant: FrameVariant;
  priority?: boolean;
}) {
  if (variant === "cube") {
    return (
      <div className="bg-white p-3 shadow-[0_40px_90px_rgba(0,0,0,0.45)] ring-1 ring-black/10">
        <div className="ring-1 ring-black/15">
          <Image
            src={src}
            alt={alt}
            width={1800}
            height={1300}
            sizes="(max-width: 768px) 100vw, 70vw"
            className="block h-auto w-full"
            priority={priority}
          />
        </div>
      </div>
    );
  }
  // gilt
  return (
    <div
      className="rounded-[3px] p-[9px] shadow-[0_45px_100px_rgba(0,0,0,0.6)]"
      style={{ background: GILT_BORDER, boxShadow: "0 45px 100px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(0,0,0,0.35)" }}
    >
      <div
        className="p-4 sm:p-6"
        style={{ background: "#f2ecdc", boxShadow: "inset 0 0 40px rgba(120,95,40,0.18), inset 0 0 0 1px rgba(120,95,40,0.25)" }}
      >
        <div className="shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
          <Image
            src={src}
            alt={alt}
            width={1800}
            height={1300}
            sizes="(max-width: 768px) 100vw, 70vw"
            className="block h-auto w-full"
            priority={priority}
          />
        </div>
      </div>
    </div>
  );
}

function CaptionPlate({
  artist,
  title,
  year,
  variant,
  align = "center",
}: {
  artist?: string;
  title: string;
  year: string;
  variant: FrameVariant;
  align?: "center" | "left";
}) {
  const gilt = variant === "gilt";
  return (
    <figcaption className={align === "center" ? "mt-6 text-center" : "mt-6"}>
      <span
        className="inline-block px-4 py-1.5"
        style={
          gilt
            ? { background: "linear-gradient(180deg,#d9c07e,#b7963f)", boxShadow: "0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4)" }
            : { background: "#111", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }
        }
      >
        <span
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em]"
          style={{ color: gilt ? "#3a2c07" : "#f5f5f5" }}
        >
          {artist ? `${artist} · ` : ""}{title} · {year}
        </span>
      </span>
    </figcaption>
  );
}

/** A single framed, matted, captioned painting. */
export function ArtFramedPlate({
  src,
  alt,
  artist,
  title,
  year,
  note,
  variant = "gilt",
  priority,
}: {
  src: string;
  alt: string;
  artist?: string;
  title: string;
  year: string;
  note?: string;
  variant?: FrameVariant;
  priority?: boolean;
}) {
  return (
    <figure>
      <Frame src={src} alt={alt} variant={variant} priority={priority} />
      <CaptionPlate artist={artist} title={title} year={year} variant={variant} />
      {note && (
        <p className="mx-auto mt-4 max-w-xl text-center font-serif text-[15px] italic leading-relaxed text-white/55">
          {note}
        </p>
      )}
    </figure>
  );
}

/** A large featured work beside a column of prose. */
export function SpotlightPiece({
  src,
  alt,
  artist,
  title,
  year,
  variant = "gilt",
  reverse = false,
  children,
}: {
  src: string;
  alt: string;
  artist?: string;
  title: string;
  year: string;
  variant?: FrameVariant;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`grid items-center gap-10 md:gap-16 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <figure>
        <Frame src={src} alt={alt} variant={variant} />
        <CaptionPlate artist={artist} title={title} year={year} variant={variant} align="left" />
      </figure>
      <div className="max-w-xl">{children}</div>
    </div>
  );
}
