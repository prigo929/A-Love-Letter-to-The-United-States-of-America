import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { CultureStyles } from "@/components/culture/CulturePageComponents";
import { getCultureEnglishLanguage } from "@/lib/data/culture-data";

export const metadata: Metadata = {
  title: "English Language | The American Operating System",
  description: "Explore the linguistic gravity of English as the invisible global standard for code, aviation, science, and commerce.",
};

export default async function EnglishLanguagePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const data = getCultureEnglishLanguage(locale);

  const breadcrumbCulture = isRo ? "Cultură" : "Culture";
  const breadcrumbPage = isRo ? "Limba Engleză" : "English Language";

  const content = {
    backLink: isRo ? "← Înapoi la Modă" : "← Back to Fashion",
    nextLink: isRo ? "Prezentare Generală →" : "Overview →",
  };

  return (
    <main className="min-h-screen culture-bg pt-32 pb-24 text-[#F5EDD8] font-editorial">
      <CultureStyles />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: breadcrumbCulture, href: "/culture" },
            { label: breadcrumbPage },
          ]}
          className="mb-12 font-sans"
        />

        {/* Hero & Editorial */}
        <section className="mb-20">
          <span className="culture-text-label block mb-4 text-glory-gold">
            {data.eyebrow}
          </span>
          <h1 className="culture-text-hero mb-8 text-[#F5EDD8]">
            {data.headline}
          </h1>

          <div className="grid gap-12 lg:grid-cols-3 items-start border-t border-white/10 pt-12">
            <div className="lg:col-span-2 space-y-6">
              {data.paragraphs.map((p, idx) => (
                <p key={idx} className="font-sans text-base text-[#F5EDD8]/70 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Sidebar metric representation */}
            <div className="culture-glass rounded-2xl p-6 border border-white/5 space-y-6 font-sans">
              <h3 className="culture-text-metadata text-glory-gold border-b border-white/10 pb-3">
                {isRo ? "GRAVITAȚIA LINGVISTICĂ" : "LINGUISTIC GRAVITY"}
              </h3>
              <div className="space-y-4">
                {data.domains.map((dom, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-white">
                      <span>{dom.name}</span>
                      <span className="text-glory-gold">{dom.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-glory-gold rounded-full"
                        style={{ width: `${dom.percentage}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-[#F5EDD8]/50 leading-relaxed">
                      {dom.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-white/10 pt-12 mt-16 font-sans">
          <a
            href="/culture/fashion"
            className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors"
          >
            {content.backLink}
          </a>
          <a
            href="/culture/overview"
            className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors"
          >
            {content.nextLink}
          </a>
        </div>
      </div>
    </main>
  );
}
