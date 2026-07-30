import type { Metadata } from "next";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import {
  GALLERY_CATEGORIES,
  GALLERY_HERO_IMAGE,
  GALLERY_IMAGES,
} from "@/lib/data/gallery";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A cinematic visual archive of American geography, cities, institutions, symbols, innovation, and power.",
};

export default async function GalleryPage() {
  const locale = await getServerLocale();
  const copy =
    locale === "ro"
      ? {
          breadcrumb: "Galerie",
          eyebrow: "America Prin Obiectiv",
          title: "Galerie",
          description:
            "O arhivă vizuală curată și cinematică a orașelor, peisajelor, instituțiilor, simbolurilor și infrastructurii americane.",
          featured: "Teme",
          collection: "Cadre",
          allLabel: "Toate",
          close: "Închide imaginea",
          location: "Loc",
          theme: "Temă",
        }
      : {
          breadcrumb: "Gallery",
          eyebrow: "America Through the Lens",
          title: "Gallery",
          description:
            "A clean cinematic archive of American cities, natural scenery, institutions, symbols, innovation, and hard power.",
          featured: "Themes",
          collection: "Frames",
          allLabel: "All",
          close: "Close image",
          location: "Location",
          theme: "Theme",
        };

  return (
    <GalleryExperience
      images={GALLERY_IMAGES}
      categories={GALLERY_CATEGORIES}
      heroImage={GALLERY_HERO_IMAGE}
      copy={copy}
    />
  );
}
