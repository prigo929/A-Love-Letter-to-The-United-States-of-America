import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";

export const metadata: Metadata = {
  title: "History",
  description: "An empty layout scaffold for the History vertical page.",
};

export default async function HistoryPage() {
  const locale = await getServerLocale();
  const breadcrumb = locale === "ro" ? "Istorie" : "History";

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
          {/* TODO: Drop in existing thesis statement on American history and exceptionalism here */}
        </div>
      </section>

      <section
        id="nav-grid"
        className="scroll-mt-24 border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {/* TODO: Create empty cards. Drop in existing links to all 15 history chapters here */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="min-h-[180px] rounded-2xl border border-dashed border-white/15 bg-white/3 p-6" />
            ))}
          </div>
        </div>
      </section>

      <section
        id="feature"
        className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 pb-12"
      >
        <div className="mx-auto min-h-[420px] max-w-7xl rounded-3xl border border-dashed border-white/15 bg-white/3 p-8">
          {/* TODO: Drop in interactive history timeline or visualization here */}
        </div>
      </section>

      <AskAmericaCTA
        locale={locale}
        descriptionEn="Ask the AI Oracle about founding principles, American exceptionalism, the Civil War, the Cold War, or the Reagan era."
        descriptionRo="Întreabă Oracolul AI despre principiile fondatoare, excepționalismul american, Războiul Civil, Războiul Rece sau era Reagan."
      />
    </main>
  );
}
