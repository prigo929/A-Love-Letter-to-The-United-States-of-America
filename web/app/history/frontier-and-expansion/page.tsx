import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Frontier & Expansion | History",
  description: "Westward expansion, pioneers, homesteading, Manifest Destiny, frontier individualism.",
};

export default async function FrontierAndExpansionPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Frontieră și Expansiune" : "Frontier & Expansion";

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: breadcrumbParent, href: "/history" },
            { label: breadcrumbPage },
          ]}
          className="mb-8"
        />
      </div>

      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto min-h-[65dvh] max-w-7xl rounded-3xl border border-dashed border-white/15 bg-white/3 p-8">
          {/* TODO: Drop in frontier/pioneers visual here */}
        </div>
      </section>

      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-dashed border-white/15 bg-white/3 p-8">
          {/* TODO: Drop in thesis statement on westward expansion, Manifest Destiny, and frontier individualism here */}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid auto-rows-[minmax(180px,1fr)] gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/3 p-6">
              {/* TODO: Create empty cards. Drop in content for Westward Pioneers, Homestead Act, Manifest Destiny, and Frontier Spirit here */}
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
