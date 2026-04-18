import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";

// TODO: Import and call useSoundscape hook here for gym sounds

export const metadata: Metadata = {
  title: "The American High School",
  description:
    "An empty anthropological-style layout scaffold for the American High School page.",
};

export default async function AmericanHighSchoolPage() {
  const locale = await getServerLocale();
  const breadcrumbCulture = locale === "ro" ? "Cultură" : "Culture";
  const breadcrumbPage =
    locale === "ro" ? "Liceul American" : "The American High School";

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: breadcrumbCulture, href: "/culture" },
            { label: breadcrumbPage },
          ]}
          className="mb-8"
        />
      </div>

      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto min-h-[65vh] max-w-screen-xl rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8">
          {/* TODO: Drop in existing parallax image of school bus here */}
        </div>
      </section>

      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8">
          {/* TODO: Drop in existing pull-quote about Hollywood exporting the teen experience here */}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid auto-rows-[minmax(180px,1fr)] gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-6">
              {/* TODO: Create 4 empty cards. Drop in existing content for Football, Cafeteria, Prom, and SATs here */}
            </div>
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-6" />
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-6" />
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-6" />
          </div>
        </div>
      </section>
    </main>
  );
}
