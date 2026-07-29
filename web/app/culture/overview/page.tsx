import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { CultureStyles } from "@/components/culture/CulturePageComponents";
import { AmericanCultureSpectrum } from "@/components/culture/AmericanCultureSpectrum";
import {
  getCultureStats,
  getCultureThesis,
  getCultureArguments,
} from "@/lib/data/culture-data";

export const metadata: Metadata = {
  title: "Culture Overview | The American Operating System",
  description: "Explore the core arguments and data behind the global export of American culture and soft power.",
};

export default async function CultureOverviewPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const stats = getCultureStats(locale);
  const thesis = getCultureThesis(locale);
  const arguments_ = getCultureArguments(locale);

  const breadcrumbCulture = isRo ? "Cultură" : "Culture";
  const breadcrumbPage = isRo ? "Prezentare Generală" : "Overview";

  const content = {
    eyebrow: isRo ? "TEZA SOFT POWER" : "THE SOFT POWER THESIS",
    title: isRo ? "MOTORUL PUTERII SOFT" : "THE ENGINE OF SOFT POWER",
    statsTitle: isRo ? "EXPUNEREA GLOBALĂ ÎN CIFRE" : "GLOBAL EXPOSURE BY THE NUMBERS",
    argumentsTitle: isRo ? "PIETELE LIBERE CREAZĂ CULTURĂ" : "FREE MARKETS CREATE CULTURE",
    backLink: isRo ? "← Înapoi la Hub-ul Cultural" : "← Back to Culture Hub",
    nextLink: isRo ? "Film și Narativă →" : "Film & Storytelling →",
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

        {/* Hero Section */}
        <section className="mb-20">
          <span className="culture-text-label block mb-4 text-glory-gold">
            {content.eyebrow}
          </span>
          <h1 className="culture-text-hero mb-8 text-[#F5EDD8]">
            {content.title}
          </h1>

          <div className="grid gap-12 lg:grid-cols-3 items-start border-t border-white/10 pt-12">
            <div className="lg:col-span-2">
              {/* Thesis Quote */}
              <blockquote className="text-2xl md:text-3xl font-editorial italic text-[#F5EDD8]/90 leading-relaxed mb-8 pl-6 border-l-2 border-[#E8391B]">
                <span
                  dangerouslySetInnerHTML={{
                    __html: thesis.pullQuote.replace(/\[hl\]/g, '<span class="text-white font-semibold">').replace(/\[\/hl\]/g, "</span>"),
                  }}
                />
              </blockquote>

              {/* Thesis Paragraphs */}
              <div className="space-y-6 font-sans text-base text-[#F5EDD8]/70 leading-relaxed">
                {thesis.paragraphs.map((p, index) => (
                  <p
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: p.replace(/\[hl\]/g, '<span class="text-white font-semibold">').replace(/\[\/hl\]/g, "</span>"),
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="culture-glass rounded-2xl p-6 border border-white/5 space-y-6 font-sans">
              <h3 className="culture-text-metadata text-glory-gold border-b border-white/10 pb-3">
                {content.statsTitle}
              </h3>
              {stats.map((stat, idx) => (
                <div key={idx} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
                  <div className="text-xs text-[#F5EDD8]/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Arguments Grid */}
        <section className="border-t border-white/10 pt-16 mb-20 font-sans">
          <h2 className="culture-text-metadata text-glory-gold mb-12 tracking-[0.25em]">
            {content.argumentsTitle}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {arguments_.map((arg, idx) => (
              <div key={idx} className="culture-glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:border-white/15 transition-colors">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {arg.title}
                  </h3>
                  <p
                    className="text-sm text-[#F5EDD8]/60 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: arg.body.replace(/\[hl\]/g, '<span class="text-white font-medium">').replace(/\[\/hl\]/g, "</span>"),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The export paradox */}
        <section className="border-t border-white/10 pt-16 mb-20">
          <span className="culture-text-label block mb-4 text-glory-gold">
            {isRo ? "CE ÎL FACE AMERICAN" : "WHAT MAKES IT AMERICAN"}
          </span>
          <h2 className="culture-text-hero mb-8 text-[#F5EDD8]">
            {isRo ? "PARADOXUL EXPORTULUI" : "THE EXPORT PARADOX"}
          </h2>

          <div className="grid gap-12 lg:grid-cols-3 items-start mb-14">
            <blockquote className="lg:col-span-2 text-2xl md:text-3xl font-editorial italic text-[#F5EDD8]/90 leading-relaxed pl-6 border-l-2 border-[#E8391B]">
              {isRo
                ? "Cel mai intens american divertisment este cel mai greu de exportat — iar cultura pop modernă, construită pentru lume, a fost în tăcere curățată de americanismul ei."
                : "The most intensely American entertainment is the hardest to export — and modern pop culture, built for the world, has been quietly sanded of its Americanness."}
            </blockquote>
            <div className="space-y-5 font-sans text-base text-[#F5EDD8]/70 leading-relaxed">
              <p>
                {isRo
                  ? "Trăind în interiorul unei culturi, e ușor să presupui că a oricărei alte țări e mai bogată și mai autentică decât a ta. Fă un pas înapoi, și cultura pop americană se dovedește la fel de plină de referințe și glume interne."
                  : "Living inside a culture, it's easy to assume every other country's is richer and more authentic than your own. Step back, and American pop culture turns out to be just as crammed with references and in-jokes."}
              </p>
              <p>
                {isRo
                  ? "Comedia poartă cel mai mult din asta: satira socială o face cel mai particular cultural gen. De aceea Hollywood-ul preferă acțiune și fantasy — cel mai ușor de exportat."
                  : "Comedy carries the most of it: social satire makes it the most culturally particular genre. It's why Hollywood favors action and fantasy — the easiest to export."}
              </p>
            </div>
          </div>

          <AmericanCultureSpectrum />
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-white/10 pt-12 mt-16 font-sans">
          <a
            href="/culture"
            className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors"
          >
            {content.backLink}
          </a>
          <a
            href="/culture/film-and-storytelling"
            className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors"
          >
            {content.nextLink}
          </a>
        </div>
      </div>
    </main>
  );
}
