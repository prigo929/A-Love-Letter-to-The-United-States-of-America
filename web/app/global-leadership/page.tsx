import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Global Leadership",
  description: "An empty layout scaffold for the Global Leadership section.",
};

export default async function GlobalLeadershipPage() {
  const locale = await getServerLocale();
  const breadcrumb = locale === "ro" ? "Leadership Global" : "Global Leadership";

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: breadcrumb }]} className="mb-8" />
      </div>

      <section
        id="hero"
        className="scroll-mt-24 border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto min-h-[60dvh] max-w-7xl rounded-3xl border border-dashed border-white/15 bg-white/3 p-8">
          {/* TODO: Drop in existing dark mode gradient and main title here */}
        </div>
      </section>

      <section
        id="intro"
        className="scroll-mt-24 border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl rounded-3xl border border-dashed border-white/15 bg-white/3 p-8">
          {/* TODO: Drop in existing thesis statement on the indispensable nation role here */}
        </div>
      </section>

      <section
        id="nav-grid"
        className="scroll-mt-24 border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <div className="min-h-[180px] rounded-2xl border border-dashed border-white/15 bg-white/3 p-6">
              {/* TODO: Create empty cards. Drop in links to NATO, Dollar as Reserve Currency, Soft Power Export, UN & Institutions here */}
            </div>
            <div className="min-h-[180px] rounded-2xl border border-dashed border-white/15 bg-white/3 p-6" />
            <div className="min-h-[180px] rounded-2xl border border-dashed border-white/15 bg-white/3 p-6" />
            <div className="min-h-[180px] rounded-2xl border border-dashed border-white/15 bg-white/3 p-6" />
          </div>
        </div>
      </section>

      <section
        id="feature"
        className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto min-h-[420px] max-w-7xl rounded-3xl border border-dashed border-white/15 bg-white/3 p-8">
          {/* TODO: Drop in alliances map or global reserve charts component here */}
        </div>
      </section>
    </main>
  );
}
