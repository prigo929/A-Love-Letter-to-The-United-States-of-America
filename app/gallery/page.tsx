import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ParallaxSection } from "@/components/sections/ParallaxSection";
import { getServerLocale } from "@/lib/i18n/server";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual celebration of American landscapes, cities, institutions, and achievements.",
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
            "Pagina completă a galeriei urmează. Previzualizarea de pe homepage este deja live, iar această destinație va crește într-o arhivă vizuală mai profundă a peisajelor, orașelor, campusurilor și simbolurilor Americii.",
          imageAlt: "Linia orizontului din New York la amurg",
        }
      : {
          breadcrumb: "Gallery",
          eyebrow: "America Through the Lens",
          title: "Gallery",
          description:
            "The full gallery page is staged next. The home page preview is already live, and this destination will grow into a deeper visual archive of America’s landscapes, cities, campuses, and icons.",
          imageAlt: "New York City skyline at dusk",
        };

  return (
    <ParallaxSection
      imageSrc={SITE_IMAGES.homeNycSkyline}
      imageAlt={copy.imageAlt}
      className="pt-24"
      minHeight="min-h-screen"
    >
      <section className="px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <Breadcrumb items={[{ label: copy.breadcrumb }]} className="mb-8" />
          <div className="max-w-3xl rounded-3xl border border-white/10 bg-navy-dark/70 p-8 backdrop-blur-sm">
            <p className="section-eyebrow">{copy.eyebrow}</p>
            <h1 className="mb-4 font-display text-h1 text-white">
              {copy.title}
            </h1>
            <p className="font-body text-lg leading-relaxed text-white/65">
              {copy.description}
            </p>
          </div>
        </div>
      </section>
    </ParallaxSection>
  );
}
