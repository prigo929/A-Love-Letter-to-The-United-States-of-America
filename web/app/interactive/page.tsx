import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmerica } from "@/components/interactive/AskAmerica";

export const metadata: Metadata = {
  title: "Ask America — Interactive AI Oracle",
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
      </section>
    </main>
  );
}
