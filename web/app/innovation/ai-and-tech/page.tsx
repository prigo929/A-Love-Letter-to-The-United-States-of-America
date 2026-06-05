import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  Cpu, 
  ExternalLink,
  PlusCircle,
  Brain,
  Layers
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI & Tech | Innovation & Technology",
  description: "Explore why the United States controls the design layer and intellectual property of the global semiconductor and AI stack.",
};

interface AiCopy {
  breadcrumbParent: string;
  breadcrumbPage: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  thesisTitle: string;
  thesisParagraph1: string;
  thesisParagraph2: string;
  milestonesTitle: string;
  milestones: Array<{
    title: string;
    date: string;
    details: string;
  }>;
  aiLabel: string;
  aiTitle: string;
  aiParagraph1: string;
  aiParagraph2: string;
  aiSource: string;
  aiSourceUrl: string;
  oracleDescription: string;
}

const copyEn: AiCopy = {
  breadcrumbParent: "Innovation & Technology",
  breadcrumbPage: "AI & Tech",
  heroTagline: "COMPUTATIONAL SOVEREIGNTY",
  heroTitle: "Designing the AI Frontier",
  heroSubtitle: "How Silicon Valley and American intellectual property command the design layer of the global computing stack.",
  thesisTitle: "The Architecture of Intelligence",
  thesisParagraph1: "From the silicon transistor invented at Bell Labs to the neural networks powering generative AI, the United States is the primary architect of digital intelligence. While manufacturing has expanded globally, the intellectual property, design software, and advanced architectures remain concentrated in American technology hubs, creating a structural advantage.",
  thesisParagraph2: "This command of the design layer is anchored in Electronic Design Automation (EDA) software and processor architectures. Because high-value chip design requires immense R&D capital, American firms capture the majority of global industry profits, leaving physical fabrication as a service.",
  milestonesTitle: "Chronology of Compute",
  milestones: [
    {
      title: "The Silicon Transistor",
      date: "1947",
      details: "Invented at Bell Labs, the transistor replaced vacuum tubes, enabling the miniaturization of electronic switches and launching modern computing."
    },
    {
      title: "The Integrated Circuit",
      date: "1958",
      details: "Co-invented in the US, the microchip combined multiple transistors onto a single piece of silicon, scaling processing power exponentially."
    },
    {
      title: "The Microprocessor",
      date: "1971",
      details: "Intel launched the 4004, placing an entire Central Processing Unit (CPU) on a single silicon wafer and democratizing microcomputers."
    },
    {
      title: "Deep Learning & LLMs",
      date: "2010s - 2020s",
      details: "Pioneered by US research labs and funded by venture capital, neural networks scaled to trillions of parameters, launching generative AI."
    }
  ],
  aiLabel: "THE DESIGN CHOKEHLD",
  aiTitle: "Semiconductor Design: The Invisible American Chokehold",
  aiParagraph1: "The global semiconductor industry is often described as a Taiwan manufacturing story, but the more structurally important fact is that the US controls the design layer of the entire global chip stack. Nvidia, AMD, Qualcomm, Apple Silicon, Broadcom, and Intel — the companies designing the processors powering every AI data center, smartphone, and automobile on Earth — are all American.",
  aiParagraph2: "Furthermore, Synopsys and Cadence provide the Electronic Design Automation (EDA) software used to design virtually every advanced chip made globally, while ARM Holdings (US-listed, UK-origin) defines the underlying instruction sets. Because design is where the value lives, US firms capture roughly 50% of global semiconductor revenue despite not owning the fabs. When the US placed export controls on advanced chips in 2022, it was turning off a valve in a pipeline that runs through American intellectual property.",
  aiSource: "Semiconductor Industry Association (SIA)",
  aiSourceUrl: "https://www.semiconductors.org/",
  oracleDescription: "Ask the AI Oracle about electronic design automation software, Nvidia H100 architecture, ARM instruction sets, or US semiconductor export controls."
};

const copyRo: AiCopy = {
  breadcrumbParent: "Inovație și Tehnologie",
  breadcrumbPage: "AI și Tehnologie",
  heroTagline: "SUVERANITATE COMPUTAȚIONALĂ",
  heroTitle: "Proiectarea Frontierei AI",
  heroSubtitle: "Cum Silicon Valley și proprietatea intelectuală americană controlează stratul de proiectare al întregului ecosistem global de computing.",
  thesisTitle: "Arhitectura Inteligenței",
  thesisParagraph1: "De la tranzistorul de siliciu inventat la Bell Labs până la rețelele neuronale care alimentează AI generativă, Statele Unite sunt arhitectul principal al inteligenței digitale. În timp ce producția fizică s-a extins global, designul de bază, software-ul de proiectare și arhitecturile avansate rămân concentrate în hub-urile americane.",
  thesisParagraph2: "Acest avantaj structural este ancorat în software-ul de automatizare a proiectării electronice (EDA) și în arhitecturile procesoarelor. Deoarece proiectarea de cipuri necesită capital uriaș de cercetare, firmele americane captează majoritatea profiturilor, fabricarea fiind un serviciu complementar.",
  milestonesTitle: "Cronologia Calculului Digital",
  milestones: [
    {
      title: "Tranzistorul de Siliciu",
      date: "1947",
      details: "Inventat la Bell Labs, tranzistorul a înlocuit tuburile vidate, permițând miniaturizarea comutatoarelor electronice și lansând computingul modern."
    },
    {
      title: "Circuitul Integrat",
      date: "1958",
      details: "Co-inventat în SUA, microcipul a reunit componente multiple pe o singură plăcuță de siliciu, crescând exponențial puterea de calcul."
    },
    {
      title: "Microprocesorul",
      date: "1971",
      details: "Intel a lansat 4004, punând o unitate centrală de procesare (CPU) pe o singură placă de siliciu și democratizând microcomputerele."
    },
    {
      title: "Deep Learning și LLM-uri",
      date: "Anii 2010 - 2020",
      details: "Pionierate de laboratoare de cercetare din SUA și finanțate de capital de risc, rețelele neuronale au crescut la trilioane de parametri, creând AI generativă."
    }
  ],
  aiLabel: "CONTROLUL DE DESIGN",
  aiTitle: "Proiectarea Semiconductorilor: Controlul Invizibil al Americii",
  aiParagraph1: "Industria globală de semiconductori este descrisă adesea ca o poveste de producție din Taiwan, dar faptul structural mai important este că SUA controlează stratul de design al întregului ecosistem. Nvidia, AMD, Qualcomm, Apple Silicon, Broadcom și Intel — companiile care proiectează procesoarele pentru centrele de date AI, smartphone-uri și automobile — sunt toate americane.",
  aiParagraph2: "În plus, Synopsys și Cadence oferă software-ul de automatizare a proiectării electronice (EDA) utilizat pentru a proiecta practic orice cip avansat din lume, în timp ce ARM Holdings definește seturile de instrucțiuni. Companiile din SUA captează circa 50% din veniturile din semiconductori fără a deține fabrici de producție. Restricțiile de export din 2022 au arătat cum SUA pot opri un robinet care depinde integral de IP-ul american.",
  aiSource: "Semiconductor Industry Association (SIA)",
  aiSourceUrl: "https://www.semiconductors.org/",
  oracleDescription: "Întreabă Oracolul AI despre programele EDA, arhitectura Nvidia H100, seturile de instrucțiuni ARM sau restricțiile de export ale SUA pe cipuri."
};

export default async function AiAndTechPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white font-body selection:bg-glory-gold selection:text-navy-dark">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: copy.breadcrumbParent, href: "/innovation" },
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
            <Brain className="h-24 w-24 text-glory-gold" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-glory-gold mb-6">
            {copy.thesisTitle}
          </h2>
          <p className="font-body text-white/80 text-lg leading-relaxed mb-6">
            {copy.thesisParagraph1}
          </p>
          <p className="font-body text-white/80 text-lg leading-relaxed">
            {copy.thesisParagraph2}
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

      {/* Semiconductor Design Feature Section */}
      <section
        id="semiconductor-design-feature"
        className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 pb-24 bg-gradient-to-r from-navy-dark via-navy-mid to-navy-dark"
      >
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-navy-dark/60 backdrop-blur p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Cpu className="h-40 w-40 text-glory-gold" />
          </div>
          
          <div className="relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-glory-gold mb-3 block">
              {copy.aiLabel}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
              {copy.aiTitle}
            </h2>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-6">
              {copy.aiParagraph1}
            </p>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-8">
              {copy.aiParagraph2}
            </p>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40">
              <span>Source: {copy.aiSource}</span>
              <a 
                href={copy.aiSourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-glory-gold hover:underline"
              >
                {isRo ? "Verifică datele industriei" : "Verify Industry Data"}
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
