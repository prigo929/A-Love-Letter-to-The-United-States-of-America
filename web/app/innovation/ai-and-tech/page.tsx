import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { ComputeCalculator } from "@/components/interactive/ComputeCalculator";
import { 
  Cpu, 
  ExternalLink,
  Terminal,
  Brain,
  Code2
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
  softwareLabel: string;
  softwareTitle: string;
  softwareParagraph1: string;
  softwareParagraph2: string;
  softwareCudaTitle: string;
  softwarePytorchTitle: string;
  labsLabel: string;
  labsTitle: string;
  labsSubtitle: string;
  labsList: Array<{
    name: string;
    founded: string;
    models: string;
    role: string;
    contribution: string;
  }>;
}

const copyEn: AiCopy = {
  breadcrumbParent: "Innovation & Technology",
  breadcrumbPage: "AI & Tech",
  heroTagline: "THE SILICON AGE",
  heroTitle: "Designing the\nAI Frontier",
  heroSubtitle: "How Silicon Valley and American intellectual property command the design layer of the global computing stack.",
  thesisTitle: "The Architecture of Intelligence",
  thesisParagraph1: "From the silicon transistor invented at Bell Labs to the neural networks powering generative AI, the United States is the primary architect of digital intelligence. While physical fabrication has expanded globally, the core design layer, specialized architectures, and software toolchains remain deeply concentrated in American technology hubs. This structural advantage ensures that every compute cycle on earth relies on American IP.",
  thesisParagraph2: "This command is secured by a double lock: Electronic Design Automation (EDA) software and Instruction Set Architectures (ISAs). Because high-value chip design requires billions in R&D capital, American firms capture the majority of global industry profits. Physical fabrication is outsourced as a service to overseas foundries, while the high-margin, irreplaceable design layer remains safely in Silicon Valley.",
  milestonesTitle: "Chronology of Compute",
  milestones: [
    {
      title: "The Silicon Transistor",
      date: "1947",
      details: "Invented at Bell Labs in New Jersey, this solid-state amplifier replaced fragile, hot vacuum tubes, creating the core binary building block of all modern digital logic."
    },
    {
      title: "The Integrated Circuit",
      date: "1958",
      details: "Co-invented in the United States, this breakthrough consolidated multiple transistors, resistors, and capacitors onto a single flat piece of silicon, scaling compute density."
    },
    {
      title: "The Microprocessor",
      date: "1971",
      details: "Intel released the 4004, the world's first commercial single-chip CPU. Placing all computing components on a single chip democratized personal computing and microchips."
    },
    {
      title: "GPU Parallel Compute",
      date: "1999",
      details: "Nvidia invented the GeForce 256, defining the Graphics Processing Unit. By executing thousands of mathematical calculations in parallel, GPUs later became the bedrock of deep learning."
    },
    {
      title: "The Transformer Architecture",
      date: "2017",
      details: "Google researchers published the 'Attention Is All You Need' paper. By introducing self-attention mechanisms, it allowed neural networks to process data in parallel and capture complex context."
    },
    {
      title: "Generative Scaling & LLMs",
      date: "2020s",
      details: "American research labs scaled neural networks to trillions of parameters. GPT models and ChatGPT proved that scaling compute power yields emergent cognitive reasoning capabilities."
    }
  ],
  aiLabel: "THE DESIGN CHOKEHLD",
  aiTitle: "Semiconductor Design: The Invisible American Chokehold",
  aiParagraph1: "The global semiconductor supply chain is often viewed through the lens of physical manufacturing in Taiwan. However, the design layer controls the ecosystem's direction and captures its economic value. Nvidia, AMD, Qualcomm, Apple Silicon, Broadcom, and Intel—the companies that draft the blueprints for the chips running every AI supercomputer, hyperscale data center, and smart device on Earth—are all headquartered in the United States.",
  aiParagraph2: "Moreover, two American companies, Synopsys and Cadence, hold a virtual duopoly on Electronic Design Automation (EDA) software—the highly complex computer-aided tools required to layout billions of transistors on a single chip. Without this software, semiconductor design globally would halt. As a result, US firms capture approximately 50% of all global semiconductor revenue despite owning minimal physical fabrication capacity. The 2022 export restrictions demonstrated that the global compute pipeline has a physical master switch controlled entirely by American intellectual property.",
  aiSource: "Semiconductor Industry Association (SIA)",
  aiSourceUrl: "https://www.semiconductors.org/",
  oracleDescription: "Ask the AI Oracle about electronic design automation software, Nvidia H100 architecture, ARM instruction sets, or US semiconductor export controls.",
  softwareLabel: "THE SOFTWARE LOCK-IN",
  softwareTitle: "The Programming Moat: CUDA and the US Framework Monopoly",
  softwareParagraph1: "Silicon hardware is useless without compiler software to orchestrate parallel computations. The ultimate lock-in of the American AI stack is the software layer, anchored by Nvidia's CUDA (Compute Unified Device Architecture) platform. Launched in 2006, CUDA has received nearly two decades of continuous optimization, creating a developer ecosystem so deeply integrated that porting AI workloads to non-Nvidia hardware is exceptionally difficult and costly.",
  softwareParagraph2: "On top of the compiler layer lie the neural network frameworks. PyTorch, originally developed by Meta, and TensorFlow, created by Google, are the standard tools used by virtually every AI engineer on Earth. Because these open-source frameworks are engineered and maintained in the United States, they are naturally optimized first for American silicon, creating a self-reinforcing flywheel that keeps global AI development bound to the American software toolchain.",
  softwareCudaTitle: "NVIDIA CUDA Fused RMSNorm Kernel",
  softwarePytorchTitle: "PyTorch Llama Attention Layer",
  labsLabel: "FRONTIER COGNITION",
  labsTitle: "Frontier Labs: Orchestrating the Mind",
  labsSubtitle: "The most advanced foundation models on Earth are conceptualized, trained, and scaled by American research institutions.",
  labsList: [
    {
      name: "OpenAI",
      founded: "2015 | San Francisco, CA",
      models: "GPT-4o, o1, Sora",
      role: "Pioneer of Scaling Laws",
      contribution: "Sparked the global generative AI era. Pioneered LLM reinforcement learning from human feedback (RLHF) and massive reinforcement training models."
    },
    {
      name: "Anthropic",
      founded: "2021 | San Francisco, CA",
      models: "Claude 3.5 Sonnet, Claude 3 Opus",
      role: "Pioneering AI Safety & Reasoning",
      contribution: "Founded by former OpenAI researchers. Focuses on constitutional AI and safety steering, while consistently matching or exceeding raw reasoning frontiers."
    },
    {
      name: "Google DeepMind",
      founded: "2010 | Mountain View & London",
      models: "Gemini 1.5 Pro, AlphaFold 3",
      role: "Scientific AI & Multi-Modal Leaders",
      contribution: "Pioneered deep reinforcement learning (AlphaGo). Merged with Google's main AI labs to create Gemini, boasting the world's longest context windows."
    },
    {
      name: "Meta AI",
      founded: "2013 | Menlo Park, CA",
      models: "Llama 3.1, Llama 3.2, Segment Anything",
      role: "Open-Source Force Multiplier",
      contribution: "Democratized state-of-the-art weights globally. By releasing the open-weights Llama series, Meta anchor-biased the global software developer ecosystem."
    }
  ]
};

const copyRo: AiCopy = {
  breadcrumbParent: "Inovație și Tehnologie",
  breadcrumbPage: "AI și Tehnologie",
  heroTagline: "ERA SILICIULUI",
  heroTitle: "Proiectarea\nFrontierei AI",
  heroSubtitle: "Cum Silicon Valley și proprietatea intelectuală americană controlează stratul de proiectare al întregului ecosistem global de computing.",
  thesisTitle: "Arhitectura Inteligenței",
  thesisParagraph1: "De la tranzistorul de siliciu inventat la Bell Labs până la rețelele neuronale care alimentează AI generativă, Statele Unite sunt arhitectul principal al inteligenței digitale. În timp ce fabricarea fizică s-a extins global, stratul de proiectare de bază, arhitecturile specializate și lanțurile de instrumente software rămân profund concentrate în hub-urile tehnologice americane. Acest avantaj structural asigură că fiecare ciclu de calcul de pe pământ depinde de proprietatea intelectuală (IP) americană.",
  thesisParagraph2: "Această dominație este asigurată de un dublu control: software-ul de automatizare a proiectării electronice (EDA) și arhitecturile seturilor de instrucțiuni (ISA). Deoarece proiectarea de cipuri de mare valoare necesită miliarde în capital de cercetare și dezvoltare, firmele americane captează majoritatea profiturilor industriei, lăsând fabricarea fizică ca un serviciu externalizat către turnătoriile de peste mări.",
  milestonesTitle: "Cronologia Calculului Digital",
  milestones: [
    {
      title: "Tranzistorul de Siliciu",
      date: "1947",
      details: "Inventat la Bell Labs în New Jersey, acest amplificator a înlocuit tuburile vidate fragile și fierbinți, creând blocul de bază al întregii logici digitale moderne."
    },
    {
      title: "Circuitul Integrat",
      date: "1958",
      details: "Co-inventat în SUA, acest progres a reunit tranzistori, rezistori și condensatori pe o singură plăcuță de siliciu, crescând exponențial densitatea de calcul."
    },
    {
      title: "Microprocesorul",
      date: "1971",
      details: "Intel a lansat 4004, primul CPU comercial pe un singur cip. Plasarea tuturor componentelor de calcul pe o singură plăcuță a democratizat calculul personal."
    },
    {
      title: "Calculul Paralel pe GPU",
      date: "1999",
      details: "Nvidia a inventat GeForce 256, definind unitatea de procesare grafică (GPU). Executând mii de calcule în paralel, GPU-urile au devenit fundamentul deep learning."
    },
    {
      title: "Arhitectura Transformer",
      date: "2017",
      details: "Cercetătorii Google au publicat 'Attention Is All You Need'. Arhitectura Transformer a permis rețelelor neuronale să proceseze datele în paralel și să capteze context complex."
    },
    {
      title: "Scalarea Generativă și LLM-urile",
      date: "2020s",
      details: "Laboratoarele de cercetare din SUA au scalat rețelele neuronale la trilioane de parametri. Modelele GPT au dovedit că scalarea calculului determină abilități cognitive emergente."
    }
  ],
  aiLabel: "CONTROLUL DE DESIGN",
  aiTitle: "Proiectarea Semiconductorilor: Controlul Invizibil al Americii",
  aiParagraph1: "Lanțul global de aprovizionare cu semiconductori este adesea privit prin prisma producției fizice din Taiwan. Cu toate acestea, stratul de proiectare controlează direcția întregului ecosistem și îi captează valoarea economică. Nvidia, AMD, Qualcomm, Apple Silicon, Broadcom și Intel — companiile care creează planurile pentru cipurile ce rulează pe fiecare supercomputer AI, centru de date hyper-scale și dispozitiv inteligent — își au toate sediile în Statele Unite.",
  aiParagraph2: "Mai mult, două companii americane, Synopsys și Cadence, dețin un cvasi-monopol pe software-ul de automatizare a proiectării electronice (EDA) — instrumentele software extrem de complexe necesare pentru a proiecta dispunerea a miliarde de tranzistori pe un singur cip. Fără acest software, proiectarea globală de semiconductori s-ar opri. Ca urmare, firmele din SUA captează aproximativ 50% din veniturile globale din semiconductori, deși dețin o capacitate de producție fizică minimă. Restricțiile de export din 2022 au demonstrat că fluxul global de compute are un comutator principal controlat de IP-ul american.",
  aiSource: "Semiconductor Industry Association (SIA)",
  aiSourceUrl: "https://www.semiconductors.org/",
  oracleDescription: "Întreabă Oracolul AI despre programele EDA, arhitectura Nvidia H100, seturile de instrucțiuni ARM sau restricțiile de export ale SUA pe cipuri.",
  softwareLabel: "MONOPOLUL SOFTWARE",
  softwareTitle: "Monopolul pe Software: CUDA și Ecosistemul Cadrelor de Lucru",
  softwareParagraph1: "Hardware-ul din siliciu este inutil fără un software de compilare care să coordoneze calculele paralele. Adevărata barieră de intrare în ecosistemul AI este stratul software, ancorat de platforma CUDA (Compute Unified Device Architecture) de la Nvidia. Lansată în 2006, CUDA a primit aproape două decenii de optimizare continuă, creând un ecosistem de dezvoltatori atât de integrat încât rularea sarcinilor AI pe alt hardware în afară de cel de la Nvidia este extrem de dificilă și costisitoare.",
  softwareParagraph2: "Deasupra stratului de compilare se află cadrele de lucru pentru rețele neuronale. PyTorch, dezvoltat inițial de Meta, și TensorFlow, creat de Google, sunt instrumentele standard utilizate de practic fiecare inginer AI din lume. Deoarece aceste instrumente open-source sunt proiectate și întreținute în Statele Unite, ele sunt optimizate din start pentru siliciul american, creând un cerc virtuos care menține dezvoltarea globală de AI strâns legată de lanțul de instrumente software din SUA.",
  softwareCudaTitle: "Kernel Fuzionat RMSNorm NVIDIA CUDA",
  softwarePytorchTitle: "Strat de Atenție Llama în PyTorch",
  labsLabel: "COGNIȚIA DE FRONTIERĂ",
  labsTitle: "Laboratoarele de Frontieră: Dirijarea Inteligenței",
  labsSubtitle: "Cele mai avansate modele de bază din lume sunt conceptualizate, antrenate și scalate de instituții de cercetare americane.",
  labsList: [
    {
      name: "OpenAI",
      founded: "2015 | San Francisco, CA",
      models: "GPT-4o, o1, Sora",
      role: "Pionierul Legilor de Scalare",
      contribution: "A declanșat era AI generative la nivel global. A pionierat învățarea prin întărire din feedback uman (RLHF) și antrenamentul prin învățare consolidată la scară largă."
    },
    {
      name: "Anthropic",
      founded: "2021 | San Francisco, CA",
      models: "Claude 3.5 Sonnet, Claude 3 Opus",
      role: "Pionierul Siguranței și Raționamentului AI",
      contribution: "Fondat de foști cercetători OpenAI. Se concentrează pe AI constituțional și direcționare sigură, egalând sau depășind în mod contrastant frontierele raționamentului brut."
    },
    {
      name: "Google DeepMind",
      founded: "2010 | Mountain View & Londra",
      models: "Gemini 1.5 Pro, AlphaFold 3",
      role: "Lideri în AI Științific și Multi-Modal",
      contribution: "A pionierat învățarea profundă prin întărire (AlphaGo). Fuzionat cu laboratoarele principale Google pentru a crea Gemini, oferind cele mai mari ferestre de context din lume."
    },
    {
      name: "Meta AI",
      founded: "2013 | Menlo Park, CA",
      models: "Llama 3.1, Llama 3.2, Segment Anything",
      role: "Multiplicator de Forță Open-Source",
      contribution: "A democratizat ponderile modelelor de top la nivel global. Prin lansarea seriei Llama cu ponderi deschise, Meta a ancorat ecosistemul global de dezvoltatori de software."
    }
  ]
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Software Moat Section */}
        <section id="software-moat" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-32">
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] font-semibold mb-3 block">
              {copy.softwareLabel}
            </span>
            <h2 className="font-macro-display text-4xl font-bold text-white uppercase tracking-tight mb-8">
              {copy.softwareTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
              <p className="font-macro-body text-white/70 text-lg leading-relaxed">
                {copy.softwareParagraph1}
              </p>
              <p className="font-macro-body text-white/70 text-lg leading-relaxed">
                {copy.softwareParagraph2}
              </p>
            </div>
          </div>

          {/* IDE Mock Code Block Showcase */}
          <div className="rounded-3xl border border-white/5 bg-[#08090b] overflow-hidden shadow-2xl relative">
            {/* Terminal Header */}
            <div className="bg-[#0f1115] px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex gap-4 text-xs font-mono text-white/40">
                <span className="flex items-center gap-1.5 text-white/60 font-semibold border-b-2 border-[#E8B923] pb-1 px-1">
                  <Code2 className="h-3.5 w-3.5 text-[#E8B923]" />
                  AI_Stack_Blueprints
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/30 font-mono">
                <Terminal className="h-3.5 w-3.5" />
                <span>bash - host_h100_cluster</span>
              </div>
            </div>

            {/* Code Body - side by side on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/5 font-mono text-[11px] sm:text-xs text-white/70 leading-relaxed overflow-x-auto">
              {/* CUDA Column */}
              <div className="p-6 sm:p-8 bg-black/10 flex flex-col">
                <div className="text-white/40 uppercase tracking-widest text-[10px] font-bold mb-4 flex items-center justify-between">
                  <span>{copy.softwareCudaTitle}</span>
                  <span className="text-[#2ac3de]">CUDA C++</span>
                </div>
                <pre className="whitespace-pre overflow-x-auto max-h-[360px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
{`// CUDA kernel: Parallel RMSNorm execution targeting Tensor Cores
`}<span className="text-[#bb9af2]">__global__</span> <span className="text-[#2ac3de]">void</span> <span className="text-[#7aa2f7]">rms_norm_kernel</span>(<span className="text-[#2ac3de]">float</span>* out, <span className="text-[#bb9af2]">const</span> <span className="text-[#2ac3de]">float</span>* in, <span className="text-[#bb9af2]">const</span> <span className="text-[#2ac3de]">float</span>* weight, <span className="text-[#2ac3de]">float</span> eps, <span className="text-[#2ac3de]">int</span> size) {"{"}
    <span className="text-[#2ac3de]">int</span> row_idx = blockIdx.x; <span className="text-[#565f89]">// Thread block processes one matrix row</span>
    <span className="text-[#2ac3de]">int</span> col_idx = threadIdx.x; <span className="text-[#565f89]">// Threads parallelize columns</span>
    
    <span className="text-[#bb9af2]">__shared__</span> <span className="text-[#2ac3de]">float</span> s_variance;
    <span className="text-[#2ac3de]">float</span> sum = <span className="text-[#ff9e64]">0.0f</span>;
    
    <span className="text-[#565f89]">// Accumulate squared sum</span>
    <span className="text-[#bb9af2]">for</span> (<span className="text-[#2ac3de]">int</span> i = col_idx; i {"<"} size; i += blockDim.x) {"{"}
        <span className="text-[#2ac3de]">float</span> val = in[row_idx * size + i];
        sum += val * val;
    {"}"}
    
    <span className="text-[#565f89]">// Parallel reduction in shared memory</span>
    <span className="text-[#2ac3de]">float</span> block_sum = block_reduce_sum(sum);
    <span className="text-[#bb9af2]">if</span> (col_idx == <span className="text-[#ff9e64]">0</span>) {"{"}
        s_variance = rsqrtf(block_sum / size + eps);
    {"}"}
    <span className="text-[#7aa2f7]">__syncthreads</span>();
    
    <span className="text-[#565f89]">// Normalize and scale with weights</span>
    <span className="text-[#bb9af2]">for</span> (<span className="text-[#2ac3de]">int</span> i = col_idx; i {"<"} size; i += blockDim.x) {"{"}
        <span className="text-[#2ac3de]">int</span> idx = row_idx * size + i;
        out[idx] = in[idx] * s_variance * weight[i];
    {"}"}
{"}"}

<span className="text-[#2ac3de]">void</span> <span className="text-[#7aa2f7]">launch_rms_norm</span>(<span className="text-[#2ac3de]">float</span>* d_out, <span className="text-[#2ac3de]">float</span>* d_in, <span className="text-[#2ac3de]">float</span>* d_weight, <span className="text-[#2ac3de]">int</span> rows, <span className="text-[#2ac3de]">int</span> cols) {"{"}
    <span className="text-[#2ac3de]">int</span> threads = <span className="text-[#ff9e64]">1024</span>;
    <span className="text-[#565f89]">// Launch row blocks to utilize parallel grid streaming</span>
    rms_norm_kernel{"<<<"}rows, threads{">>>"}(d_out, d_in, d_weight, <span className="text-[#ff9e64]">1e-5f</span>, cols);
    <span className="text-[#7aa2f7]">cudaDeviceSynchronize</span>();
{"}"}</pre>
              </div>

              {/* PyTorch Column */}
              <div className="p-6 sm:p-8 bg-black/20 flex flex-col">
                <div className="text-white/40 uppercase tracking-widest text-[10px] font-bold mb-4 flex items-center justify-between">
                  <span>{copy.softwarePytorchTitle}</span>
                  <span className="text-[#9ece6a]">Python 3.11</span>
                </div>
                <pre className="whitespace-pre overflow-x-auto max-h-[360px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
<span className="text-[#bb9af2]">import</span> torch
<span className="text-[#bb9af2]">import</span> torch.nn <span className="text-[#bb9af2]">as</span> nn
<span className="text-[#bb9af2]">import</span> math

<span className="text-[#bb9af2]">class</span> <span className="text-[#2ac3de]">LlamaAttentionBlock</span>(nn.Module):
    <span className="text-[#bb9af2]">def</span> <span className="text-[#7aa2f7]">__init__</span>(<span className="text-[#bb9af2]">self</span>, d_model=<span className="text-[#ff9e64]">4096</span>, n_heads=<span className="text-[#ff9e64]">32</span>):
        <span className="text-[#7aa2f7]">super</span>().__init__()
        <span className="text-[#bb9af2]">self</span>.n_heads = n_heads
        <span className="text-[#bb9af2]">self</span>.head_dim = d_model // n_heads
        
        <span className="text-[#565f89]"># Projection weights targeting Tensor Cores</span>
        <span className="text-[#bb9af2]">self</span>.q_proj = nn.Linear(d_model, d_model, bias=<span className="text-[#bb9af2]">False</span>)
        <span className="text-[#bb9af2]">self</span>.k_proj = nn.Linear(d_model, d_model, bias=<span className="text-[#bb9af2]">False</span>)
        <span className="text-[#bb9af2]">self</span>.v_proj = nn.Linear(d_model, d_model, bias=<span className="text-[#bb9af2]">False</span>)
        <span className="text-[#bb9af2]">self</span>.o_proj = nn.Linear(d_model, d_model, bias=<span className="text-[#bb9af2]">False</span>)

    <span className="text-[#bb9af2]">def</span> <span className="text-[#7aa2f7]">forward</span>(<span className="text-[#bb9af2]">self</span>, x):
        b, s, d = x.shape
        q = <span className="text-[#bb9af2]">self</span>.q_proj(x).view(b, s, <span className="text-[#bb9af2]">self</span>.n_heads, <span className="text-[#bb9af2]">self</span>.head_dim).transpose(<span className="text-[#ff9e64]">1</span>, <span className="text-[#ff9e64]">2</span>)
        k = <span className="text-[#bb9af2]">self</span>.k_proj(x).view(b, s, <span className="text-[#bb9af2]">self</span>.n_heads, <span className="text-[#bb9af2]">self</span>.head_dim).transpose(<span className="text-[#ff9e64]">1</span>, <span className="text-[#ff9e64]">2</span>)
        v = <span className="text-[#bb9af2]">self</span>.v_proj(x).view(b, s, <span className="text-[#bb9af2]">self</span>.n_heads, <span className="text-[#bb9af2]">self</span>.head_dim).transpose(<span className="text-[#ff9e64]">1</span>, <span className="text-[#ff9e64]">2</span>)
        
        <span className="text-[#565f89]"># Scaled dot-product attention executed on GPU</span>
        scores = torch.matmul(q, k.transpose(-<span className="text-[#ff9e64]">2</span>, -<span className="text-[#ff9e64]">1</span>)) / math.sqrt(<span className="text-[#bb9af2]">self</span>.head_dim)
        attn = torch.softmax(scores, dim=-<span className="text-[#ff9e64]">1</span>)
        context = torch.matmul(attn, v)
        
        context = context.transpose(<span className="text-[#ff9e64]">1</span>, <span className="text-[#ff9e64]">2</span>).contiguous().view(b, s, d)
        <span className="text-[#bb9af2]">return</span> <span className="text-[#bb9af2]">self</span>.o_proj(context)

# Move parameters and allocate directly in CUDA memory
model = LlamaAttentionBlock().to(<span className="text-[#9ece6a]">"cuda"</span>)</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Compute Scaling Law Simulator */}
        <section id="scaling-calculator" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <ComputeCalculator locale={locale} />
        </section>

        {/* Frontier Labs Section */}
        <section id="frontier-labs" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] font-semibold mb-3 block flex items-center justify-center gap-2">
              <Brain className="h-4 w-4 text-[#E8B923] animate-pulse" />
              {copy.labsLabel}
            </span>
            <h2 className="font-macro-display text-4xl font-bold text-white uppercase tracking-tight mb-4">
              {copy.labsTitle}
            </h2>
            <p className="font-macro-body text-white/60 text-lg max-w-3xl mx-auto">
              {copy.labsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.labsList.map((lab, idx) => (
              <div 
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] p-8 flex flex-col justify-between hover:border-[#E8B923]/30 hover:bg-white/[0.03] transition-all duration-500 hover:-translate-y-1"
              >
                <div>
                  <h3 className="font-macro-display text-2xl font-bold text-white mb-1 group-hover:text-[#E8B923] transition-colors">
                    {lab.name}
                  </h3>
                  <span className="text-[10px] font-mono text-[#E8B923]/70 uppercase tracking-widest block mb-4">
                    {lab.role}
                  </span>
                  <p className="text-sm text-white/70 leading-relaxed font-body mb-6">
                    {lab.contribution}
                  </p>
                </div>
                
                <div className="border-t border-white/5 pt-4 mt-auto">
                  <div className="flex justify-between text-[11px] font-mono text-white/40 mb-1">
                    <span>HQ / FOUNDED</span>
                    <span className="text-white/60 font-semibold">{lab.founded}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-white/40">
                    <span>FLAGSHIP MODELS</span>
                    <span className="text-[#E8B923] font-semibold">{lab.models}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

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
