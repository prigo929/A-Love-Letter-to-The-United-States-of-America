import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  Dna, 
  Heart, 
  PlusCircle, 
  FlaskConical, 
  Award, 
  ExternalLink 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Medicine & Biotech | Science & Inventions",
  description: "Discover American breakthroughs in life sciences: from the polio vaccine and DNA cloning to Human Genome mapping and mRNA innovation.",
};

interface BiotechCopy {
  breadcrumbParent: string;
  breadcrumbPage: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  thesisTitle: string;
  thesisParagraph: string;
  milestonesTitle: string;
  milestones: Array<{
    title: string;
    details: string;
    date: string;
  }>;
  pharmaLabel: string;
  pharmaTitle: string;
  pharmaParagraph1: string;
  pharmaParagraph2: string;
  pharmaSource: string;
  pharmaSourceUrl: string;
  oracleDescription: string;
}

const copyEn: BiotechCopy = {
  breadcrumbParent: "Science & Inventions",
  breadcrumbPage: "Medicine & Biotech",
  heroTagline: "LIFE SCIENCES & VACCINES",
  heroTitle: "Conquering Diseases, Mapping the Code of Life",
  heroSubtitle: "How the NIH, venture capital, and academic research labs created the modern biotechnology industry.",
  thesisTitle: "The Life Science Revolution",
  thesisParagraph: "The United States is the undisputed global hub for biological innovation. Supported by the National Institutes of Health (NIH)—the largest public funder of biomedical research in the world—and a deep ecosystem of private capital, American scientists have mapped the human genome, pioneered gene therapies, and developed the vaccines that protect global health.",
  milestonesTitle: "Biotech Milestones",
  milestones: [
    {
      title: "Polio Vaccine",
      date: "1953",
      details: "Jonas Salk developed the first successful inactivated polio vaccine at the University of Pittsburgh, choosing not to patent it to maximize distribution and save millions from paralysis."
    },
    {
      title: "Recombinant DNA",
      date: "1973",
      details: "Herbert Boyer (UCSF) and Stanley Cohen (Stanford) pioneered genetic engineering by splicing genes, laying the technical foundation for the entire biotechnology industry."
    },
    {
      title: "Human Genome Project",
      date: "1990 - 2003",
      details: "A US-led international public project that successfully sequenced 99% of the active human genetic code, transforming diagnostic medicine and cancer therapies forever."
    },
    {
      title: "mRNA Vaccine Platform",
      date: "2020",
      details: "Decades of research in US universities culminated in the rapid development, financing, and scaling of mRNA platforms that effectively ended the global COVID-19 emergency."
    }
  ],
  pharmaLabel: "CARRYING THE WORLD'S R&D",
  pharmaTitle: "Pharmaceutical Innovation: Underwriting Global Pipelines",
  pharmaParagraph1: "Roughly half of all new molecular entities approved globally each year originate from American companies or American research institutions. Every major cancer immunotherapy, antiviral drug class, and the mRNA vaccine platform that ended the COVID-19 emergency was developed, financed, and scaled in the United States.",
  pharmaParagraph2: "European single-payer systems negotiate cheap drug prices by free-riding on American innovation: they know that if the US didn't accept market-rate pricing and bear the full cost of R&D failure, most of these treatments simply wouldn't exist. The American healthcare 'premium' is, in substantial part, the price of underwriting the world's pharmaceutical pipeline on everyone else's behalf.",
  pharmaSource: "PhRMA Research & Development Report",
  pharmaSourceUrl: "https://www.phrma.org/en/Advocacy/Research-and-Development",
  oracleDescription: "Ask the AI Oracle about NIH biomedical funding, mRNA platform discoveries, gene-splicing history, or global pharmaceutical R&D."
};

const copyRo: BiotechCopy = {
  breadcrumbParent: "Știință și Invenții",
  breadcrumbPage: "Medicină și Biotehnologie",
  heroTagline: "ȘTIINȚELE VIEȚII ȘI VACCINURI",
  heroTitle: "Cucerirea Bolilor, Secvențierea Codului Vieții",
  heroSubtitle: "Cum au creat NIH, capitalul de risc și laboratoarele academice industria biotehnologică modernă.",
  thesisTitle: "Revoluția Științelor Vieții",
  thesisParagraph: "Statele Unite sunt hub-ul global incontestabil pentru inovația biologică. Sprijiniți de National Institutes of Health (NIH) — cel mai mare finanțator public de cercetare biomedicală din lume — și de un ecosistem profund de capital privat, oamenii de știință americani au mapat genomul uman, au fost pionieri în terapiile genice și au dezvoltat vaccinurile care protejează sănătatea globală.",
  milestonesTitle: "Repere în Biotehnologie",
  milestones: [
    {
      title: "Vaccinul Antipoliomielitic",
      date: "1953",
      details: "Jonas Salk a dezvoltat primul vaccin de succes împotriva poliomielitei la Universitatea din Pittsburgh, alegând să nu îl breveteze pentru a maximiza distribuția și a salva milioane de oameni de paralizie."
    },
    {
      title: "ADN Recombinat",
      date: "1973",
      details: "Herbert Boyer (UCSF) și Stanley Cohen (Stanford) au fost pionierii ingineriei genetice prin îmbinarea genelor, punând bazele tehnice pentru întreaga industrie biotehnologică."
    },
    {
      title: "Proiectul Genomului Uman",
      date: "1990 - 2003",
      details: "Un proiect public internațional condus de SUA care a secvențiat cu succes 99% din codul genetic uman activ, transformând diagnosticul și terapiile oncologice."
    },
    {
      title: "Platforma de Vaccin mRNA",
      date: "2020",
      details: "Decenii de cercetare în universitățile din SUA au culminat cu dezvoltarea rapidă, finanțarea și scalarea platformelor mRNA, punând capăt pandemiei de COVID-19."
    }
  ],
  pharmaLabel: "FINANȚAREA R&D-ului MONDIAL",
  pharmaTitle: "Inovația Farmaceutică: Finanțarea R&D-ului Mondial",
  pharmaParagraph1: "Aproximativ jumătate din toate entitățile moleculare noi aprobate la nivel global în fiecare an provin de la companii sau instituții de cercetare americane. Fiecare imunoterapie majoră pentru cancer, clasă de medicamente antivirale și platforma de vaccin mRNA care a pus capăt urgenței COVID-19 au fost dezvoltate, finanțate și scalate în Statele Unite.",
  pharmaParagraph2: "Sistemele europene cu plătitor unic negociază prețuri mici la medicamente profitând de inovația americană: știu că dacă SUA nu ar accepta prețurile de piață și nu ar suporta costul total al eșecului R&D, majoritatea acestor tratamente pur și simplu nu ar exista. „Prima” plătită de consumatorii americani este costul prin care se susține progresul medical mondial.",
  pharmaSource: "Raportul PhRMA privind Cercetarea și Dezvoltarea",
  pharmaSourceUrl: "https://www.phrma.org/en/Advocacy/Research-and-Development",
  oracleDescription: "Întreabă Oracolul AI despre finanțarea NIH, descoperirea vaccinurilor mRNA, istoria ingineriei genetice sau dezvoltarea globală de noi medicamente."
};

export default async function MedicineAndBiotechPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white font-body selection:bg-glory-gold selection:text-navy-dark">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: copy.breadcrumbParent, href: "/science" },
            { label: copy.breadcrumbPage },
          ]}
          className="mb-8"
        />
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="scroll-mt-24 border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-navy-dark via-navy-mid to-navy-dark relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-star-pattern opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-glory-gold mb-4 block">
            {copy.heroTagline}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {copy.heroTitle}
          </h1>
          <p className="font-body text-white/70 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            {copy.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Thesis Section */}
      <section
        id="intro"
        className="scroll-mt-24 border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 bg-navy-dark"
      >
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/3 p-8 md:p-12 relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Dna className="h-24 w-24 text-glory-gold" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-glory-gold mb-6">
            {copy.thesisTitle}
          </h2>
          <p className="font-body text-white/80 text-lg leading-relaxed">
            {copy.thesisParagraph}
          </p>
        </div>
      </section>

      {/* Milestones grid */}
      <section
        id="milestones"
        className="scroll-mt-24 border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 bg-navy-dark"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            {copy.milestonesTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {copy.milestones.map((item, idx) => (
              <div 
                key={idx}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between hover:border-glory-gold/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-glory-gold border border-glory-gold/25 px-2 py-0.5 rounded">
                      {item.date}
                    </span>
                    <PlusCircle className="h-5 w-5 text-white/30" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed font-body">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pharmaceutical innovation R&D underwriting Section */}
      <section
        id="pharma-feature"
        className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 pb-16 bg-gradient-to-r from-navy-dark via-navy-mid to-navy-dark"
      >
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-navy-dark/60 backdrop-blur p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FlaskConical className="h-40 w-40 text-glory-gold" />
          </div>
          
          <div className="relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-glory-gold mb-3 block">
              {copy.pharmaLabel}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
              {copy.pharmaTitle}
            </h2>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-6">
              {copy.pharmaParagraph1}
            </p>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-8">
              {copy.pharmaParagraph2}
            </p>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40">
              <span>Source: {copy.pharmaSource}</span>
              <a 
                href={copy.pharmaSourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-glory-gold hover:underline"
              >
                {isRo ? "Detalii cercetare PhRMA" : "PhRMA Research Details"}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AI Ask America Oracle Section */}
      <AskAmericaCTA
        locale={locale}
        descriptionEn={copyEn.oracleDescription}
        descriptionRo={copyRo.oracleDescription}
      />
    </main>
  );
}
