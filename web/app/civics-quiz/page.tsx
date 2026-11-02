import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { CivicsQuiz } from "@/components/interactive/CivicsQuiz";
import { SITE } from "@/lib/constants";
import Link from "next/link";
import { Landmark, ArrowLeft, BookOpen, Star, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "U.S. Civics & Citizenship Test | Interactive Exam",
  description:
    "Test your knowledge of the U.S. Constitution, American history, government, and founding ideals with the interactive USCIS Naturalization Civics Test.",
  openGraph: {
    title: "U.S. Civics & Citizenship Test | America: The Greatest Nation",
    description:
      "Can you pass the official U.S. Naturalization Civics Exam? Test your knowledge of American democracy, history, and constitutional governance.",
    url: `${SITE.url}/civics-quiz`,
  },
};

export default async function CivicsQuizPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const breadcrumb = isRo ? "Testul de Cetățenie și Civică" : "Civics & Citizenship Test";

  return (
    <main className="min-h-screen bg-navy-dark pt-24 pb-24 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(232, 185, 35, 0.15) 0%, rgba(60, 59, 110, 0.08) 50%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <Breadcrumb
          items={[
            { label: isRo ? "Interactiv" : "Interactive", href: "/interactive" },
            { label: breadcrumb },
          ]}
          className="mb-8"
        />

        {/* Hero header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-glory-gold/30 bg-glory-gold/10 text-glory-gold text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRo ? "EXERCIȚIU DE CETĂȚENIE" : "USCIS NATURALIZATION EXAM"}</span>
          </div>

          <h1 className="font-hero text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
            {isRo ? "Testul Oficial de Civică al SUA" : "The Official U.S. Civics Exam"}
          </h1>

          <p className="font-body text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {isRo
              ? "Experimentați interviul oficial de cetățenie americană. Puteți atinge scorul de trecere de 60% cerut tuturor noilor cetățeni ai Statelor Unite?"
              : "Experience the real citizenship interview. Can you achieve the official 60% passing score required of all aspiring citizens of the United States?"}
          </p>

          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-white/50 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-glory-gold" />
              {isRo ? "100% Întrebări Autentice" : "100% Authentic Questions"}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {isRo ? "Standard Oficial 60%" : "60% Passing Benchmark"}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {isRo ? "Bilingv Română / Engleză" : "Bilingual EN / RO"}
            </span>
          </div>
        </div>

        {/* Interactive Quiz Engine */}
        <CivicsQuiz locale={locale} />

        {/* Bottom Educational Navigation Bar */}
        <div className="mt-16 max-w-4xl mx-auto pt-10 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/constitution/the-document"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-glory-gold transition-colors font-body"
          >
            <BookOpen className="w-4 h-4 text-glory-gold" />
            <span>{isRo ? "Citește Constituția SUA Integral" : "Read the Full U.S. Constitution"}</span>
          </Link>

          <Link
            href="/interactive"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-glory-gold transition-colors font-body"
          >
            <Landmark className="w-4 h-4 text-glory-gold" />
            <span>{isRo ? "Întreabă Oracolul Ask America" : "Ask America AI Oracle"}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

