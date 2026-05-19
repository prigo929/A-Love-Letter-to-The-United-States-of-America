import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Post-9/11 America | History",
  description: "War on terror, national security state, patriotism, foreign policy realignment.",
};

export default async function Post911AmericaPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "America Post-9/11" : "Post-9/11 America";

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
          {/* TODO: Drop in post-9/11 patriotism/defense visual here */}
        </div>
      </section>

      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-dashed border-white/15 bg-white/3 p-8">
          {/* TODO: Drop in thesis statement on the war on terror, patriotism resurgence, security state, and foreign policy realignment here */}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid auto-rows-[minmax(180px,1fr)] gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/3 p-6">
              {/* TODO: Create empty cards. Drop in content for War on Terror, National Security, Resurgent Patriotism, and Foreign Policy Realignment here */}
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
