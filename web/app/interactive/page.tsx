import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Interactive Features",
  description: "Explore the interactive features of the USA celebration site, including the Quiz, Timeline, and Map Explorer.",
};

export default async function InteractivePage() {
  const locale = await getServerLocale();
  const breadcrumb = locale === "ro" ? "Elemente Interactive" : "Interactive Features";

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
          {/* TODO: Drop in existing intro description for interactive tools here */}
        </div>
      </section>

      <section
        id="nav-grid"
        className="scroll-mt-24 border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <div className="min-h-[180px] rounded-2xl border border-dashed border-white/15 bg-white/3 p-6">
              {/* TODO: Link to Quiz page / feature */}
            </div>
            <div className="min-h-[180px] rounded-2xl border border-dashed border-white/15 bg-white/3 p-6">
              {/* TODO: Link to Timeline (/timeline) */}
            </div>
            <div className="min-h-[180px] rounded-2xl border border-dashed border-white/15 bg-white/3 p-6">
              {/* TODO: Link to Map Explorer (/explorer) */}
            </div>
          </div>
        </div>
      </section>

      <section
        id="feature"
        className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto min-h-[420px] max-w-7xl rounded-3xl border border-dashed border-white/15 bg-white/3 p-8">
          {/* TODO: Drop in interactive highlight dashboard or mini-game preview here */}
        </div>
      </section>
    </main>
  );
}
