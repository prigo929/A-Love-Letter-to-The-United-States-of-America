import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Cloud Computing | Innovation",
  description: "An empty layout scaffold for the Cloud Computing page.",
};

export default async function CloudComputingPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Inovație și Tehnologie" : "Innovation & Technology";
  const breadcrumbPage = locale === "ro" ? "Cloud Computing" : "Cloud Computing";

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: breadcrumbParent, href: "/innovation" },
            { label: breadcrumbPage },
          ]}
          className="mb-8"
        />
      </div>

      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto min-h-[65dvh] max-w-7xl rounded-3xl border border-dashed border-white/15 bg-white/3 p-8">
          {/* TODO: Drop in cloud infrastructure visual/graphic here */}
        </div>
      </section>

      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-dashed border-white/15 bg-white/3 p-8">
          {/* TODO: Drop in thesis statement on AWS, Azure, GCP powering global internet infrastructure here */}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid auto-rows-[minmax(180px,1fr)] gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/3 p-6">
              {/* TODO: Create empty cards. Drop in content for Virtualization, AWS Launch, Data Centers, and SaaS Economy here */}
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
