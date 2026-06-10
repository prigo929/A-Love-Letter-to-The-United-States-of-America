import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  Cpu, 
  ExternalLink
} from "lucide-react";
import { 
  MacroStyles, 
  MacroHero, 
  CountUp, 
  InfrastructureBand 
} from "@/components/economy/EconomyAnimations";

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
  heroTagline: "THE SILICON AGE",
  heroTitle: "Designing the\nAI Frontier",
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
  heroTagline: "ERA SILICIULUI",
  heroTitle: "Proiectarea\nFrontierei AI",
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
    <>
      <MacroStyles />
      
      {/* Cinematic Looping Video Hero */}
      <MacroHero 
        titleLead={copy.heroTitle}
        titleAccent={copy.heroTagline}
        eyebrow={copy.breadcrumbPage}
        description={copy.heroSubtitle}
        videoSrc="/videos/library/Technology/Nvidia AI cinematic.mp4"
      />

      <div className="bg-[#030405] relative z-10 pb-32 pt-16 font-body text-white">
        {/* Breadcrumbs */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
          <Breadcrumb
            items={[
              { label: copy.breadcrumbParent, href: "/innovation" },
              { label: copy.breadcrumbPage },
            ]}
          />
        </div>

        {/* Thesis Section */}
        <section id="intro" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Cpu className="h-40 w-40 text-[#E8B923]" />
            </div>
            <h2 className="font-macro-display text-3xl font-bold text-[#E8B923] mb-8">
              {copy.thesisTitle}
            </h2>
            <p className="font-macro-body text-white/80 text-lg md:text-xl leading-relaxed mb-6">
              {copy.thesisParagraph1}
            </p>
            <p className="font-macro-body text-white/80 text-lg md:text-xl leading-relaxed">
              {copy.thesisParagraph2}
            </p>
          </div>
        </section>

        {/* AI & Computing Stats Section */}
        <section className="py-24 border-t border-b border-white/5 bg-white/[0.01] mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={50} suffix="%" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "DESIGN DOMINANȚĂ" : "DESIGN DOMINANCE"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo ? "Din veniturile globale din semiconductori captate de firme din SUA" : "Of global semiconductor design revenues captured by US firms"}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={100} suffix="%" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "SOFTWARE EDA" : "EDA SOFTWARE"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo ? "Dependență globală de software-ul EDA din SUA pentru cipuri avansate" : "Global reliance on US EDA software for advanced chip design"}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={90} suffix="%" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "CALCUL DE FRONTIERĂ AI" : "AI COMPUTE"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo ? "Din supercomputerele de antrenament AI operând pe IP din SUA" : "Of frontier AI training compute running on American designed IP"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones grid */}
        <section id="milestones" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <h2 className="font-macro-display text-4xl font-bold text-center mb-16 text-white uppercase tracking-tight">
            {copy.milestonesTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {copy.milestones.map((item, idx) => (
              <div 
                key={idx}
                className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-between hover:border-[#E8B923]/40 hover:bg-white/[0.04] transition-all duration-500 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-[#E8B923] border border-[#E8B923]/25 px-2 py-0.5 rounded">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-macro-display text-2xl font-bold text-white mb-4 group-hover:text-[#E8B923] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-body">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Semiconductor Design Feature Section (Cinematic Silicon Wafer Parallax) */}
        <InfrastructureBand
          imageSrc="/images/library/Technology/Vivid and detailed close-up of a patterned silicon wafer with vibrant green and blue colors.jpg"
          imageAlt="Patterned Silicon Wafer Close-up"
        >
          <div className="relative z-10">
            <span className="macro-eyebrow mb-3 block">
              {copy.aiLabel}
            </span>
            <h2 className="macro-section-title text-white mb-6">
              {copy.aiTitle}
            </h2>
            <p className="macro-body text-white/80 mb-6 max-w-4xl">
              {copy.aiParagraph1}
            </p>
            <p className="macro-body text-white/80 mb-8 max-w-4xl">
              {copy.aiParagraph2}
            </p>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40 font-mono">
              <span>Source: {copy.aiSource}</span>
              <a 
                href={copy.aiSourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-[#E8B923] hover:underline"
              >
                {isRo ? "Verifică datele industriei" : "Verify Industry Data"}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </InfrastructureBand>

        {/* Physical Infrastructure of AI Section */}
        <section id="ai-infrastructure" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-32">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-6 font-semibold">
            {isRo ? "INFRASTRUCTURA FIZICĂ" : "PHYSICAL INFRASTRUCTURE"}
          </p>
          <h2 className="font-macro-display text-4xl font-bold text-center mb-6 text-white uppercase tracking-tight">
            {isRo ? "Infrastructura Fizică a Inteligenței Artificiale" : "The Physical Infrastructure of AI"}
          </h2>
          <p className="font-macro-body text-white/70 text-lg text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            {isRo 
              ? "Inteligența artificială nu este doar software. Ea se bazează pe cele mai complexe lanțuri de aprovizionare și pe o infrastructură fizică masivă — de la microprocesoare specializate la centre de date gigantice care consumă gigawați de energie." 
              : "Artificial intelligence is not just software. It relies on the most complex manufacturing supply chains and massive physical infrastructure on Earth — from specialized silicon hardware to hyper-scale data centers consuming gigawatts of energy."}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                tag: isRo ? "Hardware Avansat" : "Advanced Silicon",
                title: isRo ? "Nvidia H100: Motorul AI" : "Nvidia H100: The AI Engine",
                description: isRo
                  ? "GPU-ul NVIDIA H100 Tensor Core, bazat pe arhitectura Hopper, reprezintă un salt uriaș în accelerarea computațională. Acesta conține 80 de miliarde de tranzistori și este proiectat să antreneze LLM-uri la viteze și eficiențe fără precedent, fiind piesa de bază a supercomputerelor AI."
                  : "The NVIDIA H100 Tensor Core GPU, built on the Hopper architecture, represents a monumental leap in acceleration. It houses 80 billion transistors and is designed to train LLMs at unprecedented speed and efficiency, serving as the foundational hardware block for AI supercomputers.",
                imageSrc: "/images/library/Technology/NVIDIA H100 GPU on new SXM5 Module. GTC2022_SXM5_01_v001_DL.png"
              },
              {
                tag: isRo ? "Echipamente de Fabricație" : "Fab Equipment",
                title: isRo ? "Echipamente Semiconductori" : "Semiconductor Tooling",
                description: isRo
                  ? "Companiile americane — Applied Materials, Lam Research și KLA Corporation — dețin un cvasi-monopol pe echipamentele critice de depunere, gravare chimică și metrologie utilizate în fabrici. Fără aceste mașini din SUA, nicio fabrică avansată de cipuri din lume nu poate opera."
                  : "While ASML handles lithography, the fabrication process requires hundreds of other advanced machines. US companies — Applied Materials, Lam Research, and KLA — hold a near-monopoly on critical deposition, etching, and metrology equipment, forming a secondary hardware chokehold.",
                imageSrc: "/images/library/Technology/macro of a silicon wafer.jpg"
              },
              {
                tag: isRo ? "Centre de Date Hyper-scale" : "Hyper-scale Data Centers",
                title: isRo ? "Google Midlothian: Centrul de Date" : "Google Midlothian: The Powerhouse",
                description: isRo
                  ? "Centrul de date Google din Midlothian, Texas, arătând dimensiunea rezervoarelor de răcire și a curții de generatoare. Aceste facilități moderne funcționează 24/7 pentru a găzdui clustere TPU și servicii cloud, optimizând consumul de apă și energie."
                  : "Google's data center in Midlothian, Texas, showcasing the scale of cooling water tanks and generator yards. These modern facilities run 24/7 to host TPU clusters and cloud services, operating with advanced water and power efficiency to minimize carbon footprint.",
                imageSrc: "/images/library/Technology/Google Data Center Midlothian Texas at Dusk with Water Tanks and GCUB Generator Yard.jpg"
              },
              {
                tag: isRo ? "Rețea Distribuită" : "Distributed Compute",
                title: isRo ? "Coridorul de Servere din Ohio" : "The Ohio Server Aisles",
                description: isRo
                  ? "În interiorul unui coridor de servere de înaltă densitate din centrul de date Google din Ohio. Mii de servere echipate cu procesoare avansate sunt interconectate prin fibră optică de mare viteză, formând rețeaua computațională distribuită ce rulează modelele AI de frontieră."
                  : "Inside a high-density server aisle in Google's Ohio data center. Thousands of servers containing advanced processors are networked with high-throughput fiber optics, forming the distributed computing fabric that runs frontier AI models.",
                imageSrc: "/images/library/Technology/server aisles in google data center in Ohio.jpg"
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col hover:border-[#E8B923]/30 transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030405] via-transparent to-transparent" />
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between bg-black/20">
                  <div>
                    <span className="text-xs font-mono text-[#E8B923] uppercase tracking-wider mb-2 block">
                      {item.tag}
                    </span>
                    <h3 className="font-macro-display text-2xl font-bold text-white mb-3 group-hover:text-[#E8B923] transition-colors min-h-[4rem]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed font-body">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Ask America Oracle Section */}
        <div className="mt-32">
          <AskAmericaCTA
            locale={locale}
            descriptionEn={copyEn.oracleDescription}
            descriptionRo={copyRo.oracleDescription}
          />
        </div>
      </div>
    </>
  );
}
