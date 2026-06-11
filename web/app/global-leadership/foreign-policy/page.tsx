import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Foreign Policy | Global Leadership",
  description: "American foreign policy from the Monroe Doctrine to modern diplomacy — doctrines, interventions, and the architecture of global influence.",
};

export default async function ForeignPolicyPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const breadcrumbParent = isRo ? "Leadership Global" : "Global Leadership";
  const breadcrumbPage = isRo ? "Politică Externă" : "Foreign Policy";

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
          {/* TODO: Foreign policy doctrines timeline, key interventions, diplomatic milestones */}
        </div>
      </section>
    </main>
  );
}
