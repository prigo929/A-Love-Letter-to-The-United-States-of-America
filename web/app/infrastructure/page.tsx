import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";

export const metadata: Metadata = {
  title: "Infrastructure | Patriotic USA",
  description: "Explore the physical networks that powered and integrated the American continent.",
};

export default async function InfrastructureHubPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: isRo ? "Acasă" : "Home", href: "/" },
            { label: isRo ? "Infrastructură" : "Infrastructure" },
          ]}
          className="mb-8"
        />
        
        <div className="border border-white/10 bg-white/[0.02] rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-glory-gold/5 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded border border-glory-gold/30 bg-glory-gold/5 text-glory-gold text-[9px] font-bold uppercase tracking-wider mb-6">
            {isRo ? "Inginerie & Rețele" : "Engineering & Networks"}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {isRo ? "Infrastructura Americană" : "American Infrastructure"}
          </h1>
          
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl mb-8">
            {isRo 
              ? "Această secțiune prezintă sistemele masive care au integrat continentul: autostrăzi, rețele feroviare, baraje, rețele electrice, apeducte, porturi și aeroporturi."
              : "This section presents the massive systems that integrated the continent: highways, railroads, dams, power grids, aqueducts, ports, and airports."
            }
          </p>
        </div>

        <AskAmericaCTA
          locale={locale}
          descriptionEn="Explore American infrastructure and engineering megaprojects using the interactive AI oracle."
          descriptionRo="Explorează infrastructura americană și megaproiectele de inginerie folosind oracolul interactiv AI."
        />
      </div>
    </main>
  );
}
