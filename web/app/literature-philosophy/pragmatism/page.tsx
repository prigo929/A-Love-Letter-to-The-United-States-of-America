import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";

export const metadata: Metadata = {
  title: "The Pragmatist School | Patriotic USA",
  description: "Explore The Pragmatist School and its impact on the American story.",
};

export default async function Page() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: isRo ? "Literatură & Filosofie" : "Literature & Philosophy", href: "/literature-philosophy" },
            { label: isRo ? "Școala Pragmatică" : "The Pragmatist School" },
          ]}
          className="mb-8"
        />
        
        <div className="border border-white/10 bg-white/[0.02] rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-glory-gold/5 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded border border-glory-gold/30 bg-glory-gold/5 text-glory-gold text-[9px] font-bold uppercase tracking-wider mb-6">
            {isRo ? "Literatură & Filosofie" : "Literature & Philosophy"}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {isRo ? "Școala Pragmatică" : "The Pragmatist School"}
          </h1>
          
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl mb-8">
            {isRo 
              ? "Această secțiune este în curs de dezvoltare. Explorează detaliile folosind oracolul interactiv de mai jos."
              : "This section is currently under development. Explore details using the interactive AI oracle below."
            }
          </p>
        </div>

        <AskAmericaCTA
          locale={locale}
          descriptionEn="Explore this topic using the interactive AI oracle."
          descriptionRo="Explorează acest subiect folosind oracolul interactiv AI."
        />
      </div>
    </main>
  );
}
