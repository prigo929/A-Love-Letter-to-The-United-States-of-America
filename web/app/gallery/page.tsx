import type { Metadata } from "next";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import {
  GALLERY_CATEGORIES,
  GALLERY_HERO_IMAGE,
  GALLERY_IMAGES,
} from "@/lib/data/gallery";
import {
  PUBLIC_ASSET_CATEGORIES,
  PUBLIC_ASSETS,
} from "@/lib/data/public-assets";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Gallery & Public Assets",
  description:
    "A cinematic visual archive of American geography, cities, institutions, symbols, innovation, and public graphic assets.",
};

export default async function GalleryPage() {
  const locale = await getServerLocale();
  const copy =
    locale === "ro"
      ? {
          breadcrumb: "Galerie",
          eyebrow: "America Prin Obiectiv",
          title: "Galerie & Active Grafice",
          description:
            "O arhivă vizuală curată și cinematică a orașelor, peisajelor, instituțiilor, simbolurilor, plus o colecție completă de active publice și vectori.",
          featured: "Teme",
          collection: "Cadre Foto",
          publicCollection: "Active Grafice",
          allLabel: "Toate",
          close: "Închide imaginea",
          location: "Loc",
          theme: "Temă",
          photosTab: "Arhivă Fotografică",
          assetsTab: "Active Publice & Simboluri Vectoriale",
          searchAssets: "Caută active (ex. I-95, Apple, Texas)...",
          downloadAsset: "Descarcă activul",
          copyPath: "Copiază cale",
          pathCopied: "Copiata!",
        }
      : {
          breadcrumb: "Gallery",
          eyebrow: "America Through the Lens",
          title: "Gallery & Public Assets",
          description:
            "A clean cinematic archive of American cities, natural scenery, institutions, symbols, innovation, plus a complete library of public vector & brand assets.",
          featured: "Themes",
          collection: "Photo Frames",
          publicCollection: "Graphic Assets",
          allLabel: "All",
          close: "Close image",
          location: "Location",
          theme: "Theme",
          photosTab: "Photo Archive",
          assetsTab: "Public & Graphic Assets",
          searchAssets: "Search assets (e.g. I-95, Apple, Texas)...",
          downloadAsset: "Download asset",
          copyPath: "Copy path",
          pathCopied: "Copied!",
        };

  return (
    <GalleryExperience
      images={GALLERY_IMAGES}
      categories={GALLERY_CATEGORIES}
      publicAssets={PUBLIC_ASSETS}
      publicAssetCategories={PUBLIC_ASSET_CATEGORIES}
      heroImage={GALLERY_HERO_IMAGE}
      copy={copy}
    />
  );
}
