import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  Lightbulb, 
  Cpu, 
  RadioTower, 
  Globe, 
  Satellite, 
  CloudRain, 
  ExternalLink,
  PlusCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: "Post-War Miracles | Science & Inventions",
  description: "Discover American digital and physical breakthroughs: from the transistor, microprocessor, and the internet (ARPANET) to GPS and NEXRAD weather radar.",
};

interface InventionsCopy {
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
  gpsLabel: string;
  gpsTitle: string;
  gpsParagraph1: string;
  gpsParagraph2: string;
  gpsSource: string;
  gpsSourceUrl: string;
  nexradLabel: string;
  nexradTitle: string;
  nexradParagraph1: string;
  nexradParagraph2: string;
  nexradSource: string;
  nexradSourceUrl: string;
  oracleDescription: string;
}

const copyEn: InventionsCopy = {
  breadcrumbParent: "Science & Inventions",
  breadcrumbPage: "Post-War Miracles",
  heroTagline: "THE DIGITAL AGE",
  heroTitle: "Architects of the Digital Universe",
  heroSubtitle: "How the synergy of government research, academic freedom, and venture capital created the core technologies of the modern era.",
  thesisTitle: "The Birth of Computing and Global Systems",
  thesisParagraph1: "The second half of the 20th century saw the United States construct the fundamental building blocks of modern technological civilization. From the invention of the transistor at Bell Labs to the packet-switching networks of ARPANET and the microprocessors of Silicon Valley, American labs laid the groundwork for computing, global networks, and space-based utility systems.",
  thesisParagraph2: "Quietly powering this digital revolution is the DARPA model: a defense agency operating with a $4 billion budget, no permanent research staff, and autonomous, short-term program managers. Born in response to Sputnik, DARPA funded ARPANET, GPS, stealth aircraft, autonomous vehicles, and mRNA vaccine platforms — yielding trillions of dollars of global economic value from a budget smaller than many mid-sized nations spend on military research.",
  milestonesTitle: "Foundational Digital Inventions",
  milestones: [
    {
      title: "The Transistor",
      date: "1947",
      details: "Invented at Bell Labs by John Bardeen, Walter Brattain, and William Shockley. Replacing bulky vacuum tubes, it became the fundamental building block of all modern electronics and computers."
    },
    {
      title: "The Microprocessor",
      date: "1971",
      details: "Intel engineers led by Federico Faggin, Ted Hoff, and Stanley Mazor designed the Intel 4004, integrating a complete CPU on a single silicon chip and launching the microcomputer revolution."
    },
    {
      title: "The Laser",
      date: "1960",
      details: "Theodore Maiman built the first functioning laser at Hughes Research Laboratories, based on theoretical work by Charles Townes and Arthur Schawlow, now powering global telecommunications and medicine."
    },
    {
      title: "The Internet (ARPANET)",
      date: "1969",
      details: "Funded by the US Department of Defense's DARPA, ARPANET completed the first packet-switched network transmission, establishing the TCP/IP communication protocol that underpins today's World Wide Web."
    }
  ],
  gpsLabel: "FREE GLOBAL UTILITY",
  gpsTitle: "GPS: America's Taxpayer-Funded Gift to Humanity",
  gpsParagraph1: "The Global Positioning System (GPS) — the satellite constellation that every smartphone, aircraft, ocean vessel, and precision farm machine on Earth uses for navigation — was built, launched, and continues to be operated by the United States Department of Defense at American taxpayer expense.",
  gpsParagraph2: "Made completely free for worldwide civilian use by Ronald Reagan in 1983, the US maintains 31 operational satellites and continuously funds its modernization. Every taxi ride in Rome, cargo vessel in the Pacific, and delivery truck in Tokyo runs on American strategic infrastructure, generating trillions of dollars of global economic value annually without charging international users a single cent.",
  gpsSource: "Official GPS.gov / US Department of Defense",
  gpsSourceUrl: "https://www.gps.gov/systems/gps/",
  nexradLabel: "GOLD STANDARD WEATHER SURVEILLANCE",
  nexradTitle: "NEXRAD: The Shield Against Extreme Weather",
  nexradParagraph1: "The NEXRAD (Next Generation Radar) system is a high-resolution network of 160 S-band Doppler weather radars operated jointly by the National Weather Service, FAA, and US Air Force. Deployed in 1992 and continuously updated since, no other nation operates anything approaching this density of advanced radar coverage.",
  nexradParagraph2: "NEXRAD provides near-total continental coverage, enabling meteorologists to issue tornado warnings with an average lead time of 13 minutes (compared to essentially zero without Doppler coverage). This critical infrastructure quietly saves hundreds of lives annually, underpins aviation safety, and serves as the global model for weather radar modernization.",
  nexradSource: "NOAA NCEI NEXRAD Portal",
  nexradSourceUrl: "https://www.ncei.noaa.gov/products/radar/next-generation-weather-radar",
  oracleDescription: "Ask the AI Oracle about GPS satellite operations, NEXRAD radar coverage, the invention of the transistor, or ARPANET history."
};

const copyRo: InventionsCopy = {
  breadcrumbParent: "Știință și Invenții",
  breadcrumbPage: "Miracole Postbelice",
  heroTagline: "ERA DIGITALĂ",
  heroTitle: "Arhitecții Universului Digital",
  heroSubtitle: "Cum sinergia dintre cercetarea guvernamentală, libertatea academică și capitalul de risc a creat tehnologiile erei moderne.",
  thesisTitle: "Nașterea Informaticii și a Sistemelor Globale",
  thesisParagraph1: "A doua jumătate a secolului XX a văzut Statele Unite construind blocurile fundamentale ale civilizației tehnologice moderne. De la inventarea tranzistorului la Bell Labs, până la rețelele ARPANET și microprocesoarele din Silicon Valley, laboratoarele americane au pus bazele informaticii, rețelelor globale și utilităților spațiale.",
  thesisParagraph2: "Motorul acestei revoluții este modelul DARPA: o agenție de apărare cu un buget de 4 miliarde de dolari, fără personal de cercetare permanent, care folosește manageri de program autonomi. Creată ca răspuns la Sputnik, DARPA a finanțat ARPANET, GPS, tehnologia stealth, vehiculele autonome și platformele mRNA — generând trilioane de dolari în valoare economică globală dintr-un buget redus.",
  milestonesTitle: "Invenții Digitale Fundamentale",
  milestones: [
    {
      title: "Tranzistorul",
      date: "1947",
      details: "Inventat la Bell Labs de John Bardeen, Walter Brattain și William Shockley. Înlocuind tuburile vidate voluminoase, a devenit componenta de bază a tuturor computerelor moderne."
    },
    {
      title: "Microprocesorul",
      date: "1971",
      details: "Inginerii Intel, conduși de Federico Faggin, Ted Hoff și Stanley Mazor, au proiectat cipul Intel 4004, integrând un procesor complet pe o singură placă de siliciu și lansând era calculatoarelor personale."
    },
    {
      title: "Laserul",
      date: "1960",
      details: "Theodore Maiman a construit primul laser funcțional la Hughes Research Laboratories, bazat pe lucrul teoretic al lui Charles Townes și Arthur Schawlow, o tehnologie ce stă la baza telecomunicațiilor și medicinei moderne."
    },
    {
      title: "Internetul (ARPANET)",
      date: "1969",
      details: "Finanțat de DARPA (agenția Departamentului de Apărare al SUA), ARPANET a realizat prima transmisie de date prin pachete, creând protocolul TCP/IP care stă la baza World Wide Web-ului de astăzi."
    }
  ],
  gpsLabel: "UTILITATE GLOBALĂ GRATUITĂ",
  gpsTitle: "GPS: Cadoul Americii Oferit Gratuit Umanității",
  gpsParagraph1: "Global Positioning System (GPS) — constelația de sateliți pe care orice smartphone, avion, navă și mașină agricolă de precizie de pe Pământ o folosește pentru navigare — a fost construită, lansată și este operată de Departamentul de Apărare al SUA pe cheltuiala contribuabililor americani.",
  gpsParagraph2: "Deschis complet gratuit pentru utilizarea civilă globală de Ronald Reagan în 1983, sistemul este menținut prin 31 de sateliți GPS activi. Fiecare cursă de Uber în Paris, navă cargo în Marea Chinei de Sud și camion de livrare în Tokyo rulează pe infrastructură americană, generând trilioane de dolari anual fără a taxa utilizatorii cu un singur cent.",
  gpsSource: "Official GPS.gov / US Department of Defense",
  gpsSourceUrl: "https://www.gps.gov/systems/gps/",
  nexradLabel: "STANDARDUL MONDIAL ÎN SUPRAVEGHERE METEO",
  nexradTitle: "NEXRAD: Scutul Împotriva Vremii Extreme",
  nexradParagraph1: "Sistemul NEXRAD este o rețea de înaltă rezoluție formată din 160 de radare meteo Doppler în bandă S operate în comun de Serviciul Național de Meteorologie al SUA, FAA și Forțele Aeriene ale SUA. Deploiat începând cu 1992, nicio altă țară nu are o acoperire Doppler de o asemenea densitate.",
  nexradParagraph2: "NEXRAD oferă acoperire continentală completă, permițând emiterea alertelor de tornadă cu un timp mediu de avertizare de 13 minute (față de aproape zero fără radar). Această infrastructură salvează sute de vieți anual și asigură siguranța aviației comerciale.",
  nexradSource: "NOAA NCEI NEXRAD Portal",
  nexradSourceUrl: "https://www.ncei.noaa.gov/products/radar/next-generation-weather-radar",
  oracleDescription: "Întreabă Oracolul AI despre funcționarea sateliților GPS, acoperirea radarelor NEXRAD, inventarea tranzistorului sau istoria ARPANET."
};

export default async function InventionsPost1991Page() {
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
            <Cpu className="h-24 w-24 text-glory-gold" />
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

      {/* GPS Feature Section */}
      <section
        id="gps-feature"
        className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-navy-dark via-navy-mid to-navy-dark border-b border-white/10"
      >
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-navy-dark/60 backdrop-blur p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Satellite className="h-40 w-40 text-glory-gold" />
          </div>
          
          <div className="relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-glory-gold mb-3 block">
              {copy.gpsLabel}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
              {copy.gpsTitle}
            </h2>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-6">
              {copy.gpsParagraph1}
            </p>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-8">
              {copy.gpsParagraph2}
            </p>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40">
              <span>Source: {copy.gpsSource}</span>
              <a 
                href={copy.gpsSourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-glory-gold hover:underline"
              >
                {isRo ? "Verifică site oficial GPS" : "Verify Official GPS Website"}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NEXRAD Feature Section */}
      <section
        id="nexrad-feature"
        className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 pb-24 bg-gradient-to-r from-navy-dark via-navy-mid to-navy-dark"
      >
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-navy-dark/60 backdrop-blur p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CloudRain className="h-40 w-40 text-glory-gold" />
          </div>
          
          <div className="relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-glory-gold mb-3 block">
              {copy.nexradLabel}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
              {copy.nexradTitle}
            </h2>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-6">
              {copy.nexradParagraph1}
            </p>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-8">
              {copy.nexradParagraph2}
            </p>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40">
              <span>Source: {copy.nexradSource}</span>
              <a 
                href={copy.nexradSourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-glory-gold hover:underline"
              >
                {isRo ? "Vezi portalul NOAA NEXRAD" : "View NOAA NEXRAD Portal"}
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
