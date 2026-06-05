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
  Cpu
} from "lucide-react";

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
  heroTagline: "GLOBAL DIGITAL SUBSTRATE",
  heroTitle: "Powering the Global Cloud",
  heroSubtitle: "How American software engineering and capital created the utility computing paradigm that runs today's internet.",
  thesisTitle: "The Infrastructure of the Invisible Web",
  thesisParagraph1: "Cloud computing shifted the world from physical servers to elastic, on-demand utility infrastructure. Guided by innovations in virtualization and the creation of Amazon Web Services (AWS) in 2006, followed by Google Cloud and Microsoft Azure, American firms created the platforms that allow startups, multinationals, and governments to scale instantly.",
  thesisParagraph2: "Operating this digital universe requires a massive physical footprint. Today, the core databases, machine learning systems, and streaming pipelines of the global economy reside on physical infrastructure designed, financed, and operated by American technology leaders.",
  milestonesTitle: "Key Pillars of the Cloud",
  milestones: [
    {
      title: "Virtualization",
      date: "Late 1990s",
      details: "Pioneered by VMware and other US firms, virtualization allowed a single physical server to run multiple operating systems, dramatically improving hardware efficiency."
    },
    {
      title: "The Launch of AWS",
      date: "2006",
      details: "Amazon launched S3 (storage) and EC2 (computing), establishing the modern public cloud model and letting companies rent infrastructure instead of buying it."
    },
    {
      title: "The SaaS Economy",
      date: "2010s",
      details: "Companies like Salesforce, Adobe, and ServiceNow shifted software from desktop installations to cloud subscriptions, creating the multi-trillion dollar Software-as-a-Service industry."
    },
    {
      title: "AI Training & Hyper-scale",
      date: "2020s",
      details: "Modern deep learning models and large language models require vast hyper-scale data center arrays operating hundreds of thousands of specialized GPUs in parallel."
    }
  ],
  centersLabel: "THE PHYSICAL BACKBONE",
  centersTitle: "The Digital Backbone: America's Data Center Dominance",
  centersParagraph1: "The United States accounts for 43% of all data centers globally, with over 5,400 facilities — more than the next ten countries combined (with Germany at a distant second with 529 and the UK at 523). In terms of raw power capacity, the US represents 44% of the global total, with 53.7 gigawatts of installed capacity compared to the entire European Union's 11.9 gigawatts.",
  centersParagraph2: "The practical consequence is that the physical substrate of global digital civilization — cloud computing, streaming, AI training, and financial transactions — runs on American hardware in American buildings. Northern Virginia alone is the world's largest concentration, hosting more data capacity than most European nations in their entirety, representing a modern form of infrastructure dominance with no historical precedent.",
  centersSource: "Visual Capitalist / Data Center Map 2024",
  centersSourceUrl: "https://www.visualcapitalist.com/data-center-capacity-around-the-world/",
  oracleDescription: "Ask the AI Oracle about AWS launch history, virtualization technologies, data center power capacity, or SaaS economic growth."
};

const copyRo: CloudCopy = {
  breadcrumbParent: "Inovație și Tehnologie",
  breadcrumbPage: "Cloud Computing",
  heroTagline: "SUBSTRATUL DIGITAL GLOBAL",
  heroTitle: "Alimentarea Cloud-ului Global",
  heroSubtitle: "Cum ingineria software și capitalul american au creat paradigma rețelelor elastice pe care rulează internetul de astăzi.",
  thesisTitle: "Infrastructura Web-ului Invizibil",
  thesisParagraph1: "Cloud computing-ul a mutat lumea de la serverele fizice la o infrastructură elastică, la cerere. Ghidați de inovații în virtualizare și lansarea Amazon Web Services (AWS) în 2006, urmați de Google Cloud și Microsoft Azure, companiile americane au creat platformele care permit startup-urilor, corporațiilor și guvernelor să se scaleze instantaneu.",
  thesisParagraph2: "Operarea acestui univers digital necesită o amprentă fizică masivă. Astăzi, bazele de date, sistemele de învățare automată și fluxurile de streaming ale economiei globale rezidă pe o infrastructură fizică concepută, finanțată și operată de liderii tehnologici americani.",
  milestonesTitle: "Pilonii Cheie ai Cloud-ului",
  milestones: [
    {
      title: "Virtualizarea",
      date: "Sfârșitul anilor 1990",
      details: "Pionierată de VMware și alte firme din SUA, virtualizarea a permis unui singur server fizic să ruleze mai multe sisteme de operare, îmbunătățind dramatic eficiența hardware-ului."
    },
    {
      title: "Lansarea AWS",
      date: "2006",
      details: "Amazon a lansat S3 (stocare) și EC2 (calcul), stabilind modelul modern de cloud public și permițând companiilor să închirieze infrastructură în loc să o cumpere."
    },
    {
      title: "Economia SaaS",
      date: "Anii 2010",
      details: "Companii precum Salesforce, Adobe și ServiceNow au mutat software-ul de la instalările locale la abonamente în cloud, creând industria Software-as-a-Service de trilioane de dolari."
    },
    {
      title: "Antrenarea AI și Hyper-scale",
      date: "Anii 2020",
      details: "Modelele moderne de deep learning și rețelele neuronale necesită clustere imense de centre de date hyper-scale, operând sute de mii de GPU-uri specializate în paralel."
    }
  ],
  centersLabel: "COLOANA VERTEBRALĂ FIZICĂ",
  centersTitle: "Coloana Vertebrală Digitală: Dominanța SUA în Centre de Date",
  centersParagraph1: "Statele Unite găzduiesc 43% din toate centrele de date din întreaga lume, cu peste 5.400 de facilități — mai mult decât următoarele zece țări combinate (Germania se află pe locul doi cu 529 de facilități, iar Regatul Unit pe trei cu 523). În ceea ce privește capacitatea brută de alimentare, SUA reprezintă 44% din totalul global, cu 53,7 gigawați de capacitate instalată, comparativ cu doar 11,9 gigawați în întreaga Uniune Europeană.",
  centersParagraph2: "Consecința practică este că infrastructura fizică a civilizației digitale — cloud computing, streaming, antrenare AI și tranzacții financiare — rulează pe hardware american. Regiunea Northern Virginia găzduiește cea mai mare concentrare de centre de date de pe planetă, având o capacitate mai mare decât majoritatea națiunilor europene la un loc.",
  centersSource: "Visual Capitalist / Data Center Map 2024",
  centersSourceUrl: "https://www.visualcapitalist.com/data-center-capacity-around-the-world/",
  oracleDescription: "Întreabă Oracolul AI despre istoria lansării AWS, tehnologiile de virtualizare, capacitatea energetică a centrelor de date sau creșterea economică SaaS."
};

export default async function CloudComputingPage() {
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
            <Cloud className="h-24 w-24 text-glory-gold" />
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

      {/* Data Center Dominance Section */}
      <section
        id="data-centers-feature"
        className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 pb-24 bg-gradient-to-r from-navy-dark via-navy-mid to-navy-dark"
      >
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-navy-dark/60 backdrop-blur p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Server className="h-40 w-40 text-glory-gold" />
          </div>
          
          <div className="relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-glory-gold mb-3 block">
              {copy.centersLabel}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
              {copy.centersTitle}
            </h2>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-6">
              {copy.centersParagraph1}
            </p>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-8">
              {copy.centersParagraph2}
            </p>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40">
              <span>Source: {copy.centersSource}</span>
              <a 
                href={copy.centersSourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-glory-gold hover:underline"
              >
                {isRo ? "Verifică capacitatea centrelor de date" : "Verify Data Center Capacity"}
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
