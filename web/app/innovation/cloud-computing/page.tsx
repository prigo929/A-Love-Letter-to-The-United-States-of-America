import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  Server, 
  Cloud, 
  Database, 
  Network, 
  ExternalLink,
  PlusCircle,
  Cpu,
  Globe
} from "lucide-react";
import { 
  MacroStyles, 
  MacroHero, 
  CountUp, 
  InfrastructureBand 
} from "@/components/economy/EconomyAnimations";

export const metadata: Metadata = {
  title: "Cloud Computing | Innovation & Technology",
  description: "Explore how America built the global cloud computing infrastructure: from virtualization and the launch of AWS to the global data center footprint.",
};

interface CloudCopy {
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
  layersTitle: string;
  layersSubtitle: string;
  layers: Array<{
    title: string;
    tagline: string;
    details: string;
  }>;
  centersLabel: string;
  centersTitle: string;
  centersParagraph1: string;
  centersParagraph2: string;
  centersSource: string;
  centersSourceUrl: string;
  oracleDescription: string;
}

const copyEn: CloudCopy = {
  breadcrumbParent: "Innovation & Technology",
  breadcrumbPage: "Cloud Computing",
  heroTagline: "THE ELASTIC WEB",
  heroTitle: "The Global Cloud",
  heroSubtitle: "How Silicon Valley engineering and hyper-scale capital created the on-demand utility infrastructure running the modern digital world.",
  thesisTitle: "The Utility Engine of Civilization",
  thesisParagraph1: "The creation of the cloud is the story of turning raw computer hardware into an on-demand public utility. In 2002, an internal mandate at Amazon declared that all teams must expose their data and functionality through service interfaces, preparing the architectural groundwork. In 2006, Amazon Web Services launched S3 and EC2, followed closely by Google Cloud and Microsoft Azure, permanently shifting the global economy from physical server purchase cycles to elastic rental infrastructure.",
  thesisParagraph2: "This transformation decoupled software scaling from physical limits. Startups that once required millions of dollars in capital expenditure to buy server hardware could now launch for dollars a day, while multi-national corporations and sovereign states could dynamically scale their computations to meet real-time spikes. The modern internet is not a decentralized network of independent machines; it is a virtualization layer running on hyper-scale infrastructure engineered in America.",
  milestonesTitle: "Key Pillars of the Cloud",
  milestones: [
    {
      title: "Virtualization",
      date: "Late 1990s",
      details: "Pioneered by VMware, virtualization decoupled software from physical hardware. By introducing the hypervisor, it allowed single physical servers to run dozens of virtual machines simultaneously, increasing CPU utilization rates from a wasteful 5-15% to over 80%."
    },
    {
      title: "The AWS API Mandate",
      date: "2002 - 2006",
      details: "Jeff Bezos' famous 2002 internal directive mandated that all software modules communicate via APIs, preparing the architecture for the public launch of AWS in 2006. This turned computing, database storage, and bandwidth into instantly rentable utilities."
    },
    {
      title: "The SaaS Revolution",
      date: "2010s",
      details: "The cloud enabled the Software-as-a-Service model. Led by Salesforce, Adobe, and ServiceNow, software shifted from physical CD-ROMs and desktop licenses to dynamic web subscriptions, creating a multi-trillion dollar market and accelerating enterprise productivity."
    },
    {
      title: "AI Superclusters",
      date: "2020s",
      details: "The training of modern generative AI models shifted the cloud from individual virtual servers to massive, unified supercomputers. Hyper-scalers now deploy tens of thousands of GPUs connected by high-speed NVLink fabrics inside single custom-built facilities."
    }
  ],
  layersTitle: "Architectural Layers of the American Cloud",
  layersSubtitle: "The hidden software and hardware innovations that enable millions of businesses to run on shared global utility hardware.",
  layers: [
    {
      title: "Hyper-scale SDN Fabrics",
      tagline: "SOFTWARE-DEFINED NETWORKS",
      details: "Virtualization extends from CPU to the physical network. Technologies like Google's Andromeda and AWS's Hyperplane abstract physical switches, routing trillions of packets per second with microsecond latency, enabling secure multi-tenant isolation on shared routers."
    },
    {
      title: "The Global Fiber Substrate",
      tagline: "PRIVATE UNDERSEA CABLES",
      details: "To bypass public internet congestion, American tech giants have financed and laid over 100 private undersea fiber optic cables across the Atlantic and Pacific. Google, Meta, and Microsoft now own or lease the majority of global transoceanic bandwidth."
    },
    {
      title: "Eleven 9s Durability",
      tagline: "DISTRIBUTED OBJECT STORAGE",
      details: "Systems like Amazon S3 and Google Colossus store data as chunks replicated across multiple physical storage domains. By automated parity coding, they achieve 99.999999999% durability, ensuring data is never lost even during simultaneous data center power losses."
    },
    {
      title: "Proprietary Cloud Silicon",
      tagline: "CUSTOM HARDWARE ENGINE",
      details: "To optimize power and performance, cloud leaders design proprietary chips. AWS's Graviton processors provide ARM-based efficiency for server workloads, while Google's custom TPUs (Tensor Processing Units) power the world's largest AI neural training grids."
    }
  ],
  centersLabel: "HYPER-SCALE HEGEMONY",
  centersTitle: "The Physical Substrate: America's Data Center Dominance",
  centersParagraph1: "Behind the ephemeral metaphor of the 'cloud' lies an immense physical reality of concrete and power lines. The United States houses over 5,400 operational data centers, representing 43% of the global total, more than the next ten nations combined. In terms of raw electrical grid capacity, the US represents 53.7 gigawatts of installed data center capacity, eclipsing the entire European Union's 11.9 gigawatts by more than four times.",
  centersParagraph2: "This density is anchored in regional hubs like Northern Virginia (the 'Data Center Alley' of Loudoun County), which processes an estimated 70% of the world's daily internet traffic. Because global fiber optics, undersea cables, and routing protocols are physically anchored in these American corridors, the data streams of foreign governments, multinational corporations, and billions of individuals are routed through and stored on infrastructure managed under American jurisdictional and technical standards.",
  centersSource: "Visual Capitalist / Data Center Map 2024",
  centersSourceUrl: "https://www.visualcapitalist.com/data-center-capacity-around-the-world/",
  oracleDescription: "Ask the AI Oracle about AWS launch history, virtualization technologies, data center power capacity, or SaaS economic growth."
};

const copyRo: CloudCopy = {
  breadcrumbParent: "Inovație și Tehnologie",
  breadcrumbPage: "Cloud Computing",
  heroTagline: "WEB-UL ELASTIC",
  heroTitle: "Cloud-ul Global",
  heroSubtitle: "Cum ingineria din Silicon Valley și capitalul hyper-scale au creat infrastructura de utilitate publică ce rulează lumea digitală modernă.",
  thesisTitle: "Motorul de Utilitate al Civilizației",
  thesisParagraph1: "Crearea cloud-ului reprezintă povestea transformării hardware-ului brut într-o utilitate publică la cerere. În 2002, o directivă internă la Amazon a decretat că toate echipele trebuie să își expună datele și funcționalitățile prin interfețe de servicii (API), pregătind terenul arhitectural. În 2006, Amazon Web Services a lansat S3 și EC2, urmat îndeaproape de Google Cloud și Microsoft Azure, mutând definitiv economia globală de la ciclurile de achiziție de servere fizice la închirierea de infrastructură elastică.",
  thesisParagraph2: "Această transformare a decuplat scalarea software-ului de limitele fizice. Startup-urile care odată aveau nevoie de milioane de dolari pentru a cumpăra servere fizice puteau acum să se lanseze cu doar câțiva dolari pe zi, în timp ce corporațiile multinaționale și statele suverane își puteau scala dinamic calculele pentru a face față vârfurilor de trafic în timp real. Internetul modern nu este o rețea descentralizată de computere independente, ci un strat de virtualizare ce rulează pe o infrastructură hyper-scale proiectată în America.",
  milestonesTitle: "Pilonii Cheie ai Cloud-ului",
  milestones: [
    {
      title: "Virtualizarea",
      date: "Sfârșitul anilor 1990",
      details: "Pionierată de VMware, virtualizarea a decuplat software-ul de hardware-ul fizic. Prin introducerea hypervisorului, a permis unui singur server fizic să ruleze zeci de mașini virtuale simultan, crescând ratele de utilizare a CPU de la un nivel ineficient de 5-15% la peste 80%."
    },
    {
      title: "Directiva API și Lansarea AWS",
      date: "2002 - 2006",
      details: "Directiva faimoasă a lui Jeff Bezos din 2002 a impus ca toate modulele software să comunice prin API-uri, pregătind structura pentru lansarea publică a AWS în 2006. Aceasta a transformat calculul, stocarea și lățimea de bandă în utilități închiriabile instantaneu."
    },
    {
      title: "Revoluția SaaS",
      date: "Anii 2010",
      details: "Cloud-ul a deblocat modelul Software-as-a-Service. Condus de companii precum Salesforce, Adobe și ServiceNow, software-ul a trecut de la CD-ROM-uri fizice și licențe desktop la abonamente web dinamice, creând o piață de trilioane de dolari și accelerând productivitatea."
    },
    {
      title: "Superclusterele de AI",
      date: "Anii 2020",
      details: "Antrenarea modelelor moderne de AI a transformat cloud-ul din servere virtuale individuale în supercomputere masive, unificate. Furnizorii hyper-scale instalează acum zeci de mii de GPU-uri conectate prin rețele NVLink de mare viteză în cadrul aceleiași facilități personalizate."
    }
  ],
  layersTitle: "Straturile Arhitecturale ale Cloud-ului American",
  layersSubtitle: "Inovațiile ascunse de software și hardware care permit milioanelor de afaceri să ruleze pe o infrastructură globală partajată.",
  layers: [
    {
      title: "Structuri SDN Hyper-scale",
      tagline: "REȚELE DEFINITE PRIN SOFTWARE",
      details: "Virtualizarea se extinde de la CPU la rețeaua fizică. Tehnologii precum Google Andromeda și AWS Hyperplane abstractizează switch-urile fizice, rutând trilioane de pachete pe secundă cu latență de microsecunde, asigurând izolarea securizată pe routere partajate."
    },
    {
      title: "Substratul de Fibră Globală",
      tagline: "CABLURI SUBMARINE PRIVATE",
      details: "Pentru a evita congestionarea internetului public, giganții tehnologici americani au finanțat și instalat peste 100 de cabluri submarine de fibră optică peste Atlantic și Pacific. Google, Meta și Microsoft dețin acum majoritatea lățimii de bandă transoceanice globale."
    },
    {
      title: "Durabilitate de 11 de Nouă",
      tagline: "STOCARE DISTRIBUITĂ DE OBIECTE",
      details: "Sisteme precum Amazon S3 și Google Colossus stochează datele segmentate și duplicate în multiple domenii fizice de stocare. Prin codare automatizată a parității, obțin o durabilitate de 99.999999999%, prevenind pierderea datelor."
    },
    {
      title: "Cipuri Proprietare de Cloud",
      tagline: "PROCESARE PERSONALIZATĂ",
      details: "Pentru a optimiza consumul și performanța, liderii de cloud proiectează cipuri proprii. Procesoarele AWS Graviton oferă eficiență bazată pe arhitectura ARM, în timp ce unitățile TPU de la Google alimentează cele mai mari rețele de antrenare AI."
    }
  ],
  centersLabel: "HEGEMONIE HYPER-SCALE",
  centersTitle: "Substratul Fizic: Dominanța SUA în Centrele de Date",
  centersParagraph1: "În spatele metaforei efemere a 'cloud-ului' se află un peisaj fizic imens de beton și linii electrice. Statele Unite găzduiesc peste 5.400 de centre de date operaționale, reprezentând 43% din totalul global, mai mult decât următoarele zece națiuni combinate. În ceea ce privește capacitatea rețelei electrice, SUA dețin 53,7 gigawați de capacitate instalată în centre de date, depășind de peste patru ori capacitatea de 11,9 gigawați a întregii Uniuni Europene.",
  centersParagraph2: "Această densitate este ancorată în hub-uri regionale precum Northern Virginia ('Data Center Alley' din comitatul Loudoun), care procesează aproximativ 70% din traficul zilnic de internet al planetei. Deoarece fibrele optice globale, cablurile submarine și protocoalele de rutare sunt ancorate fizic în aceste coridoare americane, fluxurile de date ale guvernelor străine, corporațiilor și miliardelor de utilizatori sunt rutate și stocate pe o infrastructură gestionată sub standardele tehnice și jurisdicționale ale SUA.",
  centersSource: "Visual Capitalist / Data Center Map 2024",
  centersSourceUrl: "https://www.visualcapitalist.com/data-center-capacity-around-the-world/",
  oracleDescription: "Întreabă Oracolul AI despre istoria lansării AWS, tehnologiile de virtualizare, capacitatea energetică a centrelor de date sau creșterea economică SaaS."
};

export default async function CloudComputingPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <>
      <MacroStyles />
      
      {/* Cinematic Cover Hero */}
      <MacroHero 
        titleLead={copy.heroTitle}
        titleAccent={copy.heroTagline}
        eyebrow={copy.breadcrumbPage}
        description={copy.heroSubtitle}
        imageSrc="/images/library/Technology/Google Data Center Midlothian Texas at Dusk with Water Tanks and GCUB Generator Yard.jpg"
        imageAlt="Google Data Center in Midlothian Texas"
      />

      <div className="bg-[#000000] relative z-10 pb-32 pt-16 font-body text-white">
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
        <section id="intro" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-32">
          <h2 className="font-macro-display text-3xl md:text-4xl font-bold text-[#E8B923] mb-10 max-w-3xl leading-tight">
            {copy.thesisTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
            <p className="font-macro-body text-white/75 text-lg leading-relaxed">
              {copy.thesisParagraph1}
            </p>
            <p className="font-macro-body text-white/75 text-lg leading-relaxed">
              {copy.thesisParagraph2}
            </p>
          </div>
        </section>

        {/* Cloud Stats Section */}
        <section className="py-24 border-t border-b border-white/5 bg-white/[0.01] mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={43} suffix="%" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "COTĂ GLOBALĂ" : "GLOBAL SHARE"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo ? "Din toate centrele de date active la nivel mondial se află în SUA" : "Of all operational data centers worldwide are located in the United States"}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={53.7} decimals={1} suffix=" GW" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "CAPACITATE ENERGETICĂ" : "POWER CAPACITY"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo ? "Capacitate instalată în SUA, comparativ cu cei 11,9 GW ai întregii UE" : "Installed capacity in the US, compared to the entire EU's 11.9 GW"}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={5400} suffix="+" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "FACILITĂȚI ACTIVE" : "US FACILITIES"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo ? "Centre de date hyper-scale și enterprise ce alimentează tranzacțiile globale" : "Hyper-scale and enterprise data centers powering global transactions"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones grid */}
        <section id="milestones" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-6 font-semibold">
            {isRo ? "EVOLUȚIA PLATFORMELOR" : "PLATFORM EVOLUTION"}
          </p>
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
                    <span className="text-xs font-mono text-white/35">
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

        {/* Architectural Layers Section */}
        <section id="layers" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32 border-t border-white/5 pt-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-6 font-semibold">
            {isRo ? "INFRASCTRUCTURĂ DE JOS ÎN SUS" : "STACK FROM THE GROUND UP"}
          </p>
          <h2 className="font-macro-display text-4xl font-bold text-center mb-6 text-white uppercase tracking-tight">
            {copy.layersTitle}
          </h2>
          <p className="font-macro-body text-white/60 text-lg md:text-xl text-center max-w-3xl mx-auto leading-relaxed mb-16">
            {copy.layersSubtitle}
          </p>
          
          <div className="grid gap-8 md:grid-cols-2">
            {copy.layers.map((layer, idx) => {
              const Icon = [Network, Globe, Database, Cpu][idx % 4];
              return (
                <div 
                  key={idx}
                  className="rounded-3xl border border-white/5 bg-white/[0.01] p-8 hover:border-[#E8B923]/30 hover:bg-white/[0.02] transition-all duration-500 flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center border border-white/10">
                      <Icon className="h-6 w-6 text-[#E8B923]" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-body font-semibold text-[#E8B923] tracking-widest block uppercase mb-2">
                      {layer.tagline}
                    </span>
                    <h3 className="font-macro-display text-2xl font-bold text-white mb-4">
                      {layer.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed font-body">
                      {layer.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Data Center Dominance (Cinematic Parallax Band) */}
        <InfrastructureBand
          imageSrc="/images/library/Technology/server aisles in google data center in Ohio.jpg"
          imageAlt="Google Data Center Server Aisles"
        >
          <div className="relative z-10">
            <span className="macro-eyebrow mb-3 block">
              {copy.centersLabel}
            </span>
            <h2 className="macro-section-title text-white mb-6">
              {copy.centersTitle}
            </h2>
            <p className="macro-body text-white/80 mb-6 max-w-4xl">
              {copy.centersParagraph1}
            </p>
            <p className="macro-body text-white/80 mb-8 max-w-4xl">
              {copy.centersParagraph2}
            </p>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40 font-body">
              <span>Source: {copy.centersSource}</span>
              <a 
                href={copy.centersSourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-[#E8B923] hover:underline"
              >
                {isRo ? "Verifică capacitatea centrelor de date" : "Verify Data Center Capacity"}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </InfrastructureBand>

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
