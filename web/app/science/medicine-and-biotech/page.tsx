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
import { MacroStyles, MacroHero } from "@/components/shared/CinematicSystem";
import { RevealSection } from "@/components/shared/Reveal";

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
  nihLabel: string;
  nihTitle: string;
  nihParagraph1: string;
  nihParagraph2: string;
  nihSource: string;
  nihSourceUrl: string;
  pharmaLabel: string;
  pharmaTitle: string;
  pharmaParagraph1: string;
  pharmaParagraph2: string;
  pharmaSource: string;
  pharmaSourceUrl: string;
  plasmaLabel: string;
  plasmaTitle: string;
  plasmaParagraph1: string;
  plasmaParagraph2: string;
  plasmaSource: string;
  plasmaSourceUrl: string;
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
    },
    {
      title: "Boston-Cambridge Biotech Hub",
      date: "Kendall Square",
      details: "Kendall Square adjacent to MIT and Harvard contains over 120 biotech companies in a single square mile. Boston and Cambridge together host 63.2M sq ft of lab space and raised $6.85B in venture capital in 2024, forming the most innovative square mile on Earth."
    },
    {
      title: "Medical Device Dominance",
      date: "Medtech Leader",
      details: "US companies control over 45% of global medtech revenue. Industry leaders Medtronic, Abbott, Stryker, and Boston Scientific dominate international markets for surgical robotics, implantable devices, and advanced diagnostics."
    }
  ],
  nihLabel: "THE BIOMEDICAL RESEARCH ENGINE",
  nihTitle: "The National Institutes of Health (NIH)",
  nihParagraph1: "The annual budget of the National Institutes of Health — the biggest funder of biomedical research in the world — is approximately $48 billion. To put this in perspective: the entire research budget of the UK Medical Research Council runs to roughly £1 billion. Germany's DFG, the main public research funder, operates at a similar scale. The NIH budget is not double or triple these figures — it is an order of magnitude larger than any comparable institution in the world.",
  nihParagraph2: "NIH funding has played a significant role in the dramatic increase in US life expectancy from 47.3 years in 1900 to 78.4 years today. Every dollar of NIH funding delivers $2.56 in economic activity, and in fiscal year 2024 alone the agency awarded over $36.9 billion to researchers, supporting more than 400,000 jobs and generating over $94 billion in new economic activity nationwide. The global pharmaceutical and biotechnology industries are built on discoveries seeded by NIH grants to academic researchers, frequently decades before commercial applications emerge. The NIH is, in effect, a publicly funded basic research subsidy to the entire global health industry.",
  nihSource: "National Institutes of Health (NIH)",
  nihSourceUrl: "https://www.nih.gov/about-nih/organization/budget",
  pharmaLabel: "CARRYING THE WORLD'S R&D",
  pharmaTitle: "Pharmaceutical Innovation: Underwriting Global Pipelines",
  pharmaParagraph1: "Roughly half of all new molecular entities approved globally each year originate from American companies or American research institutions. Every major cancer immunotherapy, antiviral drug class, and the mRNA vaccine platform that ended the COVID-19 emergency was developed, financed, and scaled in the United States.",
  pharmaParagraph2: "European single-payer systems negotiate cheap drug prices by free-riding on American innovation: they know that if the US didn't accept market-rate pricing and bear the full cost of R&D failure, most of these treatments simply wouldn't exist. The American healthcare 'premium' is, in substantial part, the price of underwriting the world's pharmaceutical pipeline on everyone else's behalf.",
  pharmaSource: "PhRMA Research & Development Report",
  pharmaSourceUrl: "https://www.phrma.org/en/Advocacy/Research-and-Development",
  plasmaLabel: "THE GLOBAL PLASMA ARSENAL",
  plasmaTitle: "America Bleeds for the World: The Global Plasma Supply",
  plasmaParagraph1: "With just 5% of the global population, the United States provides 68% of the blood plasma used to manufacture lifesaving medicines for the entire world. Plasma-derived therapies treat immune deficiencies, bleeding disorders, and other serious conditions for which there is no synthetic substitute. Treating a single patient for a year requires between 130 and 1,300 individual donations, with global demand rising by 6% to 8% annually.",
  plasmaParagraph2: "The reason for US dominance is simple: the US is one of the very few nations that legally compensates plasma donors, creating a reliable market-driven supply. Countries like France, which ban compensation, face massive shortages (coming up 1.5 million liters short in 2024), forcing countries like the UK and Canada to import their shortfalls from the United States. The American market-based model literally keeps patients alive across other continents.",
  plasmaSource: "Georgetown University / Donor Ethics",
  plasmaSourceUrl: "https://www.georgetown.edu/news/the-professor-untangling-the-thorny-ethics-of-global-blood-plasma-collection/",
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
    },
    {
      title: "Hub-ul Biotech Boston-Cambridge",
      date: "Kendall Square",
      details: "Kendall Square, situat lângă MIT și Harvard, găzduiește peste 120 de companii biotehnologice pe o singură milă pătrată. Boston și Cambridge dețin împreună 5,8 milioane mp de spații de laborator, fiind cel mai inovator hub bio-tech de pe Pământ."
    },
    {
      title: "Dominanța Echipamentelor Medicale",
      date: "Lider Medtech",
      details: "Companiile americane dețin peste 45% din veniturile globale din tehnologie medicală (medtech) în 2025. Giganții Medtronic, Abbott, Stryker și Boston Scientific domină piețele internaționale de robotică chirurgicală și implanturi."
    }
  ],
  nihLabel: "MOTORUL BIOMEDICAL MONDIAL",
  nihTitle: "National Institutes of Health (NIH)",
  nihParagraph1: "Bugetul anual al National Institutes of Health (NIH) — cel mai mare finanțator de cercetare biomedicală din lume — este de aproximativ 48 de miliarde de dolari. Pentru a pune acest lucru în perspectivă: întregul buget de cercetare al Medical Research Council din Marea Britanie se ridică la aproximativ 1 miliard de lire sterline. Bugetul NIH nu este dublu sau triplu, ci cu un ordin de mărime mai mare decât al oricărei instituții de profil din lume.",
  nihParagraph2: "Finanțarea NIH a avut un rol major în creșterea speranței de viață în SUA de la 47,3 ani în 1900 la 78,4 ani astăzi. Fiecare dolar investit de NIH generează 2,56 dolari în activitate economică directă. În anul fiscal 2024, agenția a acordat peste 36,9 miliarde de dolari sub formă de granturi cercetătorilor din universități, susținând peste 400.000 de locuri de muncă. Decoperirile de bază finanțate de NIH subvenționează, în esență, întreaga industrie globală de farmaceutice și biotehnologie.",
  nihSource: "National Institutes of Health (NIH)",
  nihSourceUrl: "https://www.nih.gov/about-nih/organization/budget",
  pharmaLabel: "FINANȚAREA R&D-ului MONDIAL",
  pharmaTitle: "Inovația Farmaceutică: Finanțarea R&D-ului Mondial",
  pharmaParagraph1: "Aproximativ jumătate din toate entitățile moleculare noi aprobate la nivel global în fiecare an provin de la companii sau instituții de cercetare americane. Fiecare imunoterapie majoră pentru cancer, clasă de medicamente antivirale și platforma de vaccin mRNA care a pus capăt urgenței COVID-19 au fost dezvoltate, finanțate și scalate în Statele Unite.",
  pharmaParagraph2: "Sistemele europene cu plătitor unic negociază prețuri mici la medicamente profitând de inovația americană: știu că dacă SUA nu ar accepta prețurile de piață și nu ar suporta costul total al eșecului R&D, majoritatea acestor tratamente pur și simplu nu ar exista. „Prima” plătită de consumatorii americani este costul prin care se susține progresul medical mondial.",
  pharmaSource: "Raportul PhRMA privind Cercetarea și Dezvoltarea",
  pharmaSourceUrl: "https://www.phrma.org/en/Advocacy/Research-and-Development",
  plasmaLabel: "DONATORUL DE SÂNGE AL PLANETEI",
  plasmaTitle: "America Sângerează pentru Lume: Rezerva Globală de Plasmă",
  plasmaParagraph1: "Cu doar 5% din populația globală, Statele Unite furnizează 68% din plasma sanguină utilizată pentru fabricarea medicamentelor vitale pentru întreaga planetă. Terapiile derivate din plasmă tratează deficiențe imunitare, tulburări de coagulare și alte afecțiuni grave pentru care nu există substitute sintetice. Tratarea unui singur pacient timp de un an necesită între 130 și 1.300 de donări individuale.",
  plasmaParagraph2: "Mecanismul din spatele dominanței americane este simplu: SUA este una dintre puținele țări care compensează legal donatorii de plasmă, creând o piață stabilă. Țări precum Franța, care interzic compensarea, se confruntă cu penurii masive (un deficit de 1,5 milioane de litri în 2024), forțând state precum Marea Britanie și Canada să importe deficitul din SUA. Modelul de piață american ține în viață pacienți de pe alte continente.",
  plasmaSource: "Georgetown University / Donor Ethics",
  plasmaSourceUrl: "https://www.georgetown.edu/news/the-professor-untangling-the-thorny-ethics-of-global-blood-plasma-collection/",
  oracleDescription: "Întreabă Oracolul AI despre finanțarea NIH, descoperirea vaccinurilor mRNA, istoria ingineriei genetice sau dezvoltarea globală de noi medicamente."
};

export default async function MedicineAndBiotechPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <>
      <MacroStyles />
      <MacroHero
        imageSrc="/images/library/Technology/Fiber Optic Cable.jpg"
        imageAlt="Scientific research and biotech laboratory"
        eyebrow={copy.heroTagline}
        titleLead={isRo ? "CUCERIREA BOLILOR," : "CONQUERING DISEASE,"}
        titleAccent={isRo ? "CODUL VIEȚII" : "MAPPING LIFE'S CODE"}
        description={copy.heroSubtitle}
        stats={[
          { value: "$48B", label: isRo ? "Buget NIH Anual" : "NIH Annual Budget" },
          { value: "68%", label: isRo ? "Plasmă Globală" : "Global Blood Plasma" },
          { value: "~50%", label: isRo ? "Entități Moleculare Noi" : "New Molecular Entities" },
        ]}
      />

      <div className="bg-[#030405] relative z-10 pb-32 font-body text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 mb-8">
          <Breadcrumb items={[{ label: copy.breadcrumbParent, href: "/science" }, { label: copy.breadcrumbPage }]} />
        </div>

        {/* Thesis */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/2 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-[0.06] pointer-events-none">
              <Dna className="h-32 w-32 text-[#E8B923]" />
            </div>
            <h2 className="macro-section-title text-[#E8B923] text-3xl mb-6">{copy.thesisTitle}</h2>
            <p className="macro-body">{copy.thesisParagraph}</p>
          </div>
        </RevealSection>

        {/* Milestones */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="macro-section-title text-white text-center text-3xl mb-12">{copy.milestonesTitle}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {copy.milestones.map((item, idx) => (
                <div key={idx} className="rounded-3xl border border-white/10 bg-white/2 p-6 flex flex-col justify-between hover:border-[#E8B923]/40 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[#E8B923] border border-[#E8B923]/25 px-2 py-0.5 rounded">
                        {item.date}
                      </span>
                      <PlusCircle className="h-5 w-5 text-white/30" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="macro-body text-xs">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* NIH Feature */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/2 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-[0.06] pointer-events-none">
              <Award className="h-40 w-40 text-[#E8B923]" />
            </div>
            <div className="relative z-10">
              <span className="macro-eyebrow text-[#E8B923] mb-3 block">{copy.nihLabel}</span>
              <h2 className="macro-section-title text-white text-3xl mb-6">{copy.nihTitle}</h2>
              <p className="macro-body mb-6">{copy.nihParagraph1}</p>
              <p className="macro-body mb-8">{copy.nihParagraph2}</p>
              <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40">
                <span>Source: {copy.nihSource}</span>
                <a href={copy.nihSourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#E8B923] hover:underline">
                  {isRo ? "Bugetul și structura NIH" : "NIH Budget & Structure"}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Pharma Feature */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/2 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-[0.06] pointer-events-none">
              <FlaskConical className="h-40 w-40 text-[#E8B923]" />
            </div>
            <div className="relative z-10">
              <span className="macro-eyebrow text-[#E8B923] mb-3 block">{copy.pharmaLabel}</span>
              <h2 className="macro-section-title text-white text-3xl mb-6">{copy.pharmaTitle}</h2>
              <p className="macro-body mb-6">{copy.pharmaParagraph1}</p>
              <p className="macro-body mb-8">{copy.pharmaParagraph2}</p>
              <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40">
                <span>Source: {copy.pharmaSource}</span>
                <a href={copy.pharmaSourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#E8B923] hover:underline">
                  {isRo ? "Detalii cercetare PhRMA" : "PhRMA Research Details"}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Plasma Feature */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/2 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-[0.06] pointer-events-none">
              <Heart className="h-40 w-40 text-[#E8B923]" />
            </div>
            <div className="relative z-10">
              <span className="macro-eyebrow text-[#E8B923] mb-3 block">{copy.plasmaLabel}</span>
              <h2 className="macro-section-title text-white text-3xl mb-6">{copy.plasmaTitle}</h2>
              <p className="macro-body mb-6">{copy.plasmaParagraph1}</p>
              <p className="macro-body mb-8">{copy.plasmaParagraph2}</p>
              <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40">
                <span>Source: {copy.plasmaSource}</span>
                <a href={copy.plasmaSourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#E8B923] hover:underline">
                  {isRo ? "Detalii etică donare Georgetown" : "Georgetown Donor Ethics Details"}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </RevealSection>

        <AskAmericaCTA locale={locale} descriptionEn={copyEn.oracleDescription} descriptionRo={copyRo.oracleDescription} />
      </div>
    </>
  );
}
