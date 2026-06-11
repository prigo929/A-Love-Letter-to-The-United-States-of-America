import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Pax Americana | Global Leadership",
  description: "The global military reach of the United States — 750+ bases, 11 carrier strike groups, and alliances spanning six continents.",
};

export default async function PaxAmericanaPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const breadcrumbParent = isRo ? "Leadership Global" : "Global Leadership";
  const breadcrumbPage = "Pax Americana";

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
          {/* TODO: Global bases map, carrier group tracker, alliance network */}
        </div>
      </section>
    </main>
  );
}
