import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmerica } from "@/components/interactive/AskAmerica";
import { ShieldCheck, ArrowRight, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Ask America: Interactive AI Oracle",
  description: "An interactive, pre-loaded AI Chatbot oracle powered by arguments from all 12 verticals of the American project.",
};

export default async function InteractivePage() {
  const locale = await getServerLocale();
  const breadcrumb = locale === "ro" ? "Oracolul AI" : "Interactive AI Oracle";

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: breadcrumb }]} className="mb-8" />
      </div>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-10">
          <span className="font-hero text-xs uppercase tracking-[0.25em] text-glory-gold mb-3 block">
            {locale === "ro" ? "Explorare Interactivă" : "Interactive Exploration"}
          </span>
          <h1 className="font-hero text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {locale === "ro" ? "Oracolul Ask America" : "The Ask America Oracle"}
          </h1>
          <p className="max-w-2xl mx-auto font-body text-base text-white/60 leading-relaxed">
            {locale === "ro"
              ? "Experimentați o sinteză ghidată de AI a modelului de succes american. Întrebați oracolul despre constituție, economie, inovație, forță militară și sport."
              : "Experience a guided AI synthesis of the American success model. Ask the oracle about the constitution, economy, innovation, military strength, and sports."}
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-2 sm:px-0">
          <AskAmerica locale={locale} />
        </div>

        {/* Civics Quiz Banner */}
        <div className="mx-auto max-w-4xl px-2 sm:px-0 mt-12">
          <div className="rounded-3xl border border-glory-gold/30 bg-gradient-to-r from-glory-blue-dark/50 via-white/[0.04] to-glory-gold/10 p-6 sm:p-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4 text-left">
              <div className="p-3.5 rounded-2xl bg-glory-gold/15 text-glory-gold border border-glory-gold/25 shrink-0">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-glory-gold font-semibold block mb-1">
                  {locale === "ro" ? "NOU · TEST INTERACTIV" : "NEW · INTERACTIVE QUIZ"}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                  {locale === "ro" ? "Testul Oficial de Cetățenie și Civică" : "Official U.S. Civics & Naturalization Exam"}
                </h3>
                <p className="font-body text-xs sm:text-sm text-white/70 max-w-xl">
                  {locale === "ro"
                    ? "Poți trece examenul oficial cerut noilor cetățeni americani? Testează-ți cunoștințele din cele 100 de întrebări oficiale USCIS."
                    : "Can you achieve the official 60% passing benchmark required of new U.S. citizens? Test your mastery of American governance and history."}
                </p>
              </div>
            </div>

            <Link
              href="/civics-quiz"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-glory-gold text-navy-dark font-display font-bold text-sm shadow-gold hover:bg-glory-gold-dark transition-all shrink-0 w-full md:w-auto justify-center"
            >
              <span>{locale === "ro" ? "Începe Testul" : "Take the Test"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
