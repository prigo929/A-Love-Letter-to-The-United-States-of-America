import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { Globe, Building2, HeartHandshake, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "UN & International Order | Global Leadership",
  description: "Explore the founding role of the United States in creating and funding the United Nations, IMF, World Bank, and post-war international architecture.",
};

interface UnCopy {
  breadcrumbParent: string;
  breadcrumbPage: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroStats: Array<{ value: string; label: string }>;
  thesisTitle: string;
  thesisParagraph: string;
  pillarsTitle: string;
  pillars: Array<{
    title: string;
    description: string;
    badge: string;
  }>;
  fundingTitle: string;
  fundingParagraph1: string;
  fundingParagraph2: string;
  oracleDescription: string;
}

const copyEn: UnCopy = {
  breadcrumbParent: "Global Leadership",
  breadcrumbPage: "UN & World Order",
  heroTagline: "FOUNDING THE GLOBAL COMMONS",
  heroTitle: "UN & World Order: The Architecture of Liberty",
  heroSubtitle: "How American leadership designed and funded the multilateral institutions that prevented a third world war and stabilized global finance.",
  heroStats: [
    { value: "1945", label: "UN Founded" },
    { value: "22%", label: "US UN Funding Share" },
    { value: "$12B+", label: "Annual US Foreign Aid" },
    { value: "190+", label: "Member Nations" },
  ],
  thesisTitle: "Creating the Post-War Multilateral Architecture",
  thesisParagraph: "Following the destruction of World War II, the United States led the creation of a new international order designed to replace unilateral aggression with rules-based cooperation. Hosted in New York, the United Nations (UN) became the premier forum for conflict resolution, while the Bretton Woods institutions (the IMF and World Bank) stabilized global currencies and funded reconstruction, lifting billions out of poverty.",
  pillarsTitle: "Pillars of the Rules-Based Order",
  pillars: [
    {
      title: "The United Nations Charter",
      description: "Drafted largely by American diplomats, the Charter outlawed aggressive territorial conquest and established the Security Council to maintain global peace and sovereignty.",
      badge: "Global Security"
    },
    {
      title: "Bretton Woods & Finance",
      description: "Establishing the International Monetary Fund (IMF) and the World Bank to prevent the currency collapses that triggered the Great Depression, ensuring economic stability.",
      badge: "Financial Order"
    },
    {
      title: "Humanitarian Aid & Health",
      description: "Underwriting massive global development campaigns through USAID, the World Health Organization (WHO), and UNICEF, eradicating deadly diseases and feeding millions.",
      badge: "Humanitarian Leadership"
    },
    {
      title: "Treaty Architecture",
      description: "Leading and safeguarding international treaties on nuclear non-proliferation (NPT), maritime navigation (UNCLOS), and fundamental human rights covenants.",
      badge: "Diplomatic Framework"
    }
  ],
  fundingTitle: "Funding the Commons: The American Contribution",
  fundingParagraph1: "The United States is the single largest financial contributor to the United Nations system, providing 22% of the UN's core budget and over 25% of its peacekeeping budget. This funding supports essential operations from refugee protection and disaster relief to food security programs in developing nations.",
  fundingParagraph2: "By underwriting this international architecture, the American taxpayer has sustained a stable framework for global interaction, commerce, and human rights. This investment has prevented conflicts between major nuclear powers and fostered the longest period of relative peace in modern history.",
  oracleDescription: "Ask the AI Oracle about the creation of the United Nations, US contributions to the UN budget, or the Bretton Woods financial system."
};

const copyRo: UnCopy = {
  breadcrumbParent: "Leadership Global",
  breadcrumbPage: "ONU și Ordinea Mondială",
  heroTagline: "FONDATORII BUNURILOR COMUNE",
  heroTitle: "ONU & Ordinea Mondială: Arhitectura Libertății",
  heroSubtitle: "Cum a proiectat și finanțat leadershipul american instituțiile multilaterale care au prevenit al treilea război mondial și au stabilizat sistemul financiar.",
  heroStats: [
    { value: "1945", label: "ONU Înființată" },
    { value: "22%", label: "Finanțare SUA la ONU" },
    { value: "$12B+", label: "Ajutor Extern Anual" },
    { value: "190+", label: "Națiuni Membre" },
  ],
  thesisTitle: "Crearea Arhitecturii Multilaterale Postbelice",
  thesisParagraph: "După distrugerea provocată de al Doilea Război Mondial, Statele Unite au condus crearea unei noi ordini internaționale menite să înlocuiască agresiunea unilaterală cu o cooperare bazată pe reguli. Găzduită la New York, Organizația Națiunilor Unite (ONU) a devenit forumul principal de soluționare a conflictelor, în timp ce instituțiile Bretton Woods (FMI și Banca Mondială) au stabilizat monedele globale și au finanțat reconstrucția.",
  pillarsTitle: "Pilonii Ordinii Bazate pe Reguli",
  pillars: [
    {
      title: "Carta Națiunilor Unite",
      description: "Redactată în mare parte de diplomați americani, Carta a scos în afara legii cucerirea teritorială agresivă și a înființat Consiliul de Securitate pentru a menține suveranitatea.",
      badge: "Securitate Globală"
    },
    {
      title: "Bretton Woods & Finanțe",
      description: "Înființarea Fondului Monetar Internațional (FMI) și a Băncii Mondiale pentru a preveni colapsurile valutare care au declanșat Marea Criză economică.",
      badge: "Ordine Financiară"
    },
    {
      title: "Ajutor Umanitar & Sănătate",
      description: "Susținerea campaniilor globale prin USAID, Organizația Mondială a Sănătății (OMS) și UNICEF, eradicând boli letale și hrănind milioane de oameni.",
      badge: "Umanitar"
    },
    {
      title: "Arhitectura Tratatelor",
      description: "Conducerea și garantarea tratatelor internaționale privind neproliferarea nucleară (NPT), navigația maritimă (UNCLOS) și drepturile omului.",
      badge: "Cadru Diplomatic"
    }
  ],
  fundingTitle: "Finanțarea Ordinii: Contribuția Americană",
  fundingParagraph1: "Statele Unite sunt cel mai mare contribuabil financiar la sistemul Națiunilor Unite, oferind 22% din bugetul de bază al ONU și peste 25% din bugetul operațiunilor de menținere a păcii. Această finanțare sprijină protecția refugiaților, asistența în caz de dezastre și securitatea alimentară.",
  fundingParagraph2: "Subvenționând această arhitectură internațională, contribuabilul american a asigurat un cadru stabil pentru interacțiunea globală, comerț și drepturile omului, prevenind conflicte majore între marile puteri și oferind cea mai lungă perioadă de pace relativă din istoria modernă.",
  oracleDescription: "Întreabă Oracolul AI despre crearea Organizației Națiunilor Unite, contribuțiile SUA la bugetul ONU sau sistemul Bretton Woods."
};

export default async function UnInstitutionsPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  const pillarIcons = [Globe, Building2, HeartHandshake, ShieldAlert];

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 text-white font-sans selection:bg-glory-gold selection:text-black">
      {/* Breadcrumbs with spacious margin */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
        <Breadcrumb
          items={[
            { label: copy.breadcrumbParent, href: "/global-leadership" },
            { label: copy.breadcrumbPage },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
        <span className="text-xs font-semibold tracking-widest text-[#E8B923] uppercase block mb-4">
          {copy.heroTagline}
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-5xl leading-tight">
          {copy.heroTitle}
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl">
          {copy.heroSubtitle}
        </p>

        {/* Large Stats - No borders or boxes, just clean spacing */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {copy.heroStats.map((s, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-6xl md:text-7xl font-bold text-glory-gold tracking-tight">{s.value}</span>
              <span className="text-xs uppercase tracking-widest text-white/40 font-semibold mt-3">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Thesis Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {copy.thesisTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {copy.thesisParagraph}
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">{copy.pillarsTitle}</h2>
        <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
          {copy.pillars.map((item, idx) => {
            const Icon = pillarIcons[idx] ?? Globe;
            return (
              <div key={idx} className="flex flex-col items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-glory-gold mb-6">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-semibold tracking-widest text-[#E8B923] uppercase mb-2">{item.badge}</span>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-light">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Editorial Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {copy.fundingTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-6">
            {copy.fundingParagraph1}
          </p>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-12">
            {copy.fundingParagraph2}
          </p>
        </div>
      </section>

      <div className="mt-16">
        <AskAmericaCTA
          locale={locale}
          descriptionEn={copyEn.oracleDescription}
          descriptionRo={copyRo.oracleDescription}
        />
      </div>
    </main>
  );
}
