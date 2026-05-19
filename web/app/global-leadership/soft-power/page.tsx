import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Soft Power | Global Leadership",
  description: "An empty layout scaffold for the Soft Power page.",
};

export default async function SoftPowerPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Leadership Global" : "Global Leadership";
  const breadcrumbPage = locale === "ro" ? "Soft Power" : "Soft Power";

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: breadcrumbParent, href: "/global-leadership" },
            { label: breadcrumbPage },
          ]}
          className="mb-8"
        />
      </div>

      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto min-h-[65dvh] max-w-7xl rounded-3xl border border-dashed border-white/15 bg-white/3 p-8">
          {/* TODO: Drop in soft power export/culture/brands visual here */}
        </div>
      </section>

      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-dashed border-white/15 bg-white/3 p-8">
          {/* TODO: Drop in thesis statement on Hollywood, global brands, music, and values export here */}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid auto-rows-[minmax(180px,1fr)] gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/3 p-6">
              {/* TODO: Create empty cards. Drop in content for Hollywood/Movies, Global Brands, Music/Pop Culture, and Democratic Ideals here */}
            </div>
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/3 p-6" />
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/3 p-6" />
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/3 p-6" />
          </div>
        </div>
      </section>
    </main>
  );
}
