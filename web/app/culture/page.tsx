import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Culture",
  description: "An empty layout scaffold for the Culture hub page.",
};

export default async function CulturePage() {
  const locale = await getServerLocale();
  const breadcrumb = locale === "ro" ? "Cultură" : "Culture";

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
          {/* TODO: Drop in existing thesis statement on American soft power here */}
        </div>
      </section>

      <section
        id="nav-grid"
        className="scroll-mt-24 border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
            <div className="min-h-[180px] rounded-2xl border border-dashed border-white/15 bg-white/3 p-6">
              {/* TODO: Create empty cards. Drop in existing links to Music, Food, Hollywood, High School, Aesthetics here */}
            </div>
            <div className="min-h-[180px] rounded-2xl border border-dashed border-white/15 bg-white/3 p-6" />
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
          {/* TODO: Drop in existing "Melting Pot" WebGL component here */}
        </div>
      </section>

      {/* Interactive Chat CTA */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl border border-glory-gold/20 bg-glory-gold/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
          <div>
            <span className="font-hero text-xs uppercase tracking-[0.2em] text-[#E8B923] mb-2 block">
              {locale === "ro" ? "Ai întrebări despre Cultura Americană?" : "Have questions about American Culture?"}
            </span>
            <h3 className="font-hero text-2xl md:text-3xl font-bold text-white">
              {locale === "ro" ? "Oracolul Ask America" : "The Ask America Oracle"}
            </h3>
            <p className="font-body text-white/50 text-sm mt-2 max-w-2xl">
              {locale === "ro"
                ? "Discută cu AI despre exporturile culturale americane, Hollywood, estetică urbană, sistemul școlar și cultura sportivă."
                : "Discuss with AI about American cultural exports, Hollywood, urban aesthetics, high school systems, and sports culture."}
            </p>
          </div>
          <a
            href="/interactive"
            className="shrink-0 inline-flex items-center gap-3 px-6 py-3.5 bg-glory-gold hover:bg-glory-gold-light text-navy-dark font-body font-semibold text-sm transition-colors rounded-xl shadow-lg"
          >
            {locale === "ro" ? "Întreabă America →" : "Ask America →"}
          </a>
        </div>
      </section>
    </main>
  );
}
