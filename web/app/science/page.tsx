import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  Lightbulb, 
  Atom, 
  Flame, 
  ShieldAlert, 
  FlaskConical, 
  Cpu, 
  Dna, 
  ExternalLink 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Science & Inventions | Built the Modern World",
  description: "Explore American scientific dominance, from historic breakthroughs and Nobel prizes to the shale revolution and pharmaceutical innovation.",
};

interface ScienceCopy {
  breadcrumb: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  thesisTitle: string;
  thesisParagraph1: string;
  thesisParagraph2: string;
  statsTitle: string;
  stats: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  gridTitle: string;
  gridItems: Array<{
    title: string;
    description: string;
    href: string;
    badge: string;
  }>;
  shaleLabel: string;
  shaleTitle: string;
  shaleParagraph1: string;
  shaleParagraph2: string;
  shaleSource: string;
  shaleSourceUrl: string;
  oracleDescription: string;
}

const copyEn: ScienceCopy = {
  breadcrumb: "Science & Inventions",
  heroTagline: "BUILDING THE MODERN WORLD",
  heroTitle: "They Built the Modern World, One Invention at a Time",
  heroSubtitle: "A system built on patent protections, risk capital, and academic freedom has produced more Nobel Laureates than any other nation in history.",
  thesisTitle: "The Engine of Scientific Inquiry",
  thesisParagraph1: "From the electric lightbulb and the airplane to the microchip and artificial intelligence, the modern world runs on American intellectual property. This dominance is not a happy accident; it is the direct product of a legal framework established in Article I of the Constitution to protect patent rights, combined with massive funding for research.",
  thesisParagraph2: "The US leads the world in peer-reviewed scientific citations and attracts the finest international minds. Whether curing diseases or pioneering the digital age, American scientists operate with a level of resource depth and administrative freedom unmatched globally.",
  statsTitle: "Scientific Leadership by the Numbers",
  stats: [
    {
      value: "400+",
      label: "Nobel Prizes",
      description: "More than any other nation in history, demonstrating a culture of deep basic research."
    },
    {
      value: "350k+",
      label: "Annual Patents",
      description: "A continuous flow of new utility patents protecting intellectual property."
    },
    {
      value: "#1",
      label: "Global R&D Funding",
      description: "Investing over $900 billion annually across corporate labs and public institutions."
    }
  ],
  gridTitle: "Chronology of Innovation",
  gridItems: [
    {
      title: "Inventions Pre-1890",
      description: "The foundations of modern connectivity: the telegraph, lightbulb, telephone, and vulcanized rubber.",
      href: "/science/inventions-pre-1890",
      badge: "Industrial Age"
    },
    {
      title: "Inventions 1890-1945",
      description: "The era of speed and power: the airplane, assembly line, movie projector, and nuclear fission.",
      href: "/science/inventions-1890-1945",
      badge: "Machine Age"
    },
    {
      title: "Post-War Miracles",
      description: "Creating the digital universe: the transistor, microprocessor, laser, internet, and GPS.",
      href: "/science/inventions-post-1991",
      badge: "Digital Age"
    },
    {
      title: "Medicine & Biotech",
      description: "Conquering disease: polio vaccines, recombinant DNA, gene sequencing, and mRNA platforms.",
      href: "/science/medicine-and-biotech",
      badge: "Life Sciences"
    }
  ],
  shaleLabel: "THE PRIVATE-SECTOR REVOLUTION",
  shaleTitle: "Energy Dominance: The Shale Revolution",
  shaleParagraph1: "In 2008, the United States was a net importer of oil and gas, geopolitically constrained by OPEC pricing. By the mid-2010s, it had become the world's single largest producer of both oil and natural gas simultaneously — surpassing Saudi Arabia and Russia — driven entirely by private entrepreneurs, risk capital, and a property rights system that let landowners profit from what lay beneath their own soil.",
  shaleParagraph2: "No government ministry planned this. No state energy company executed it. It was hydraulic fracturing, horizontal drilling, and American ingenuity operating in a competitive market. The strategic consequences were immense: energy independence, cheap domestic fuel, and a geopolitical trump card that energy-dependent Europe desperately wished it had possessed before February 2022.",
  shaleSource: "US Energy Information Administration (EIA)",
  shaleSourceUrl: "https://www.eia.gov/energyexplained/oil-and-petroleum-products/where-our-oil-comes-from.php",
  oracleDescription: "Ask the AI Oracle about historic scientific breakthroughs, transistors, biotechnology developments, or American Nobel prize counts."
};

const copyRo: ScienceCopy = {
  breadcrumb: "Știință și Invenții",
  heroTagline: "CONSTRUIREA LUMII MODERNE",
  heroTitle: "Au Construit Lumea Modernă, Invenție cu Invenție",
  heroSubtitle: "Un sistem bazat pe protecția brevetelor, capital de risc și libertate academică a produs mai mulți laureați Nobel decât orice altă națiune.",
  thesisTitle: "Motorul Cercetării Științifice",
  thesisParagraph1: "De la becul electric și avion până la microcip și inteligența artificială, lumea modernă funcționează pe baza proprietății intelectuale americane. Această dominație este produsul direct al unui cadru legal stabilit în Articolul I din Constituție pentru protejarea drepturilor de autor, combinat cu finanțări uriașe.",
  thesisParagraph2: "SUA conduc lumea în ceea ce privește citările științifice evaluate de colegi și atrag cele mai bune minți internaționale. Fie că vorbim de vindecarea bolilor, fie de pionieratul în era digitală, oamenii de știință americani operează cu resurse fără egal.",
  statsTitle: "Leadership-ul Științific în Cifre",
  stats: [
    {
      value: "400+",
      label: "Premii Nobel",
      description: "Mai multe decât orice altă țară din istorie, dovedind o cultură a cercetării de bază."
    },
    {
      value: "350k+",
      label: "Brevete Anuale",
      description: "Un flux continuu de noi brevete de utilitate care protejează proprietatea intelectuală."
    },
    {
      value: "#1",
      label: "Finanțare R&D",
      description: "Investiții de peste 900 de miliarde de dolari anual în laboratoare private și publice."
    }
  ],
  gridTitle: "Cronologia Inovației",
  gridItems: [
    {
      title: "Invenții înainte de 1890",
      description: "Fundațiile conectivității moderne: telegraful, becul, telefonul și cauciucul vulcanizat.",
      href: "/science/inventions-pre-1890",
      badge: "Era Industrială"
    },
    {
      title: "Invenții 1890-1945",
      description: "Era vitezei și a puterii: avionul, banda de asamblare, proiectorul de filme și fisiunea nucleară.",
      href: "/science/inventions-1890-1945",
      badge: "Era Mașinilor"
    },
    {
      title: "Miracole Postbelice",
      description: "Crearea universului digital: tranzistorul, microprocesorul, laserul, internetul și sistemul GPS.",
      href: "/science/inventions-post-1991",
      badge: "Era Digitală"
    },
    {
      title: "Medicină și Biotehnologie",
      description: "Cucerirea bolilor: vaccinurile antipoliomielitice, ADN-ul recombinat, secvențierea genelor și platformele mRNA.",
      href: "/science/medicine-and-biotech",
      badge: "Științele Vieții"
    }
  ],
  shaleLabel: "REVOLUȚIA SECTORULUI PRIVAT",
  shaleTitle: "Dominanța Energetică: Revoluția Șisturilor",
  shaleParagraph1: "În 2008, Statele Unite erau un importator net de petrol și gaze, limitate geopolitic de prețurile OPEC. Până la jumătatea anilor 2010, deveniseră cel mai mare producător mondial atât de petrol, cât și de gaze naturale simultan — depășind Arabia Saudită și Rusia — un impuls generat în întregime de antreprenori privați, capital de risc și un sistem de drepturi de proprietate care permite proprietarilor de terenuri să profite de resursele din subsol.",
  shaleParagraph2: "Niciun minister guvernamental nu a planificat asta. Nicio companie energetică de stat nu a executat-o. A fost fracturarea hidraulică, forajul orizontal și ingeniozitatea americană pe o piață competitivă. Consecințele strategice au fost imense: independență energetică, combustibil intern ieftin și un atu geopolitic de invidiat.",
  shaleSource: "Administrația Americană pentru Informații în Domeniul Energiei (EIA)",
  shaleSourceUrl: "https://www.eia.gov/energyexplained/oil-and-petroleum-products/where-our-oil-comes-from.php",
  oracleDescription: "Întreabă Oracolul AI despre descoperirile științifice istorice, tranzistori, dezvoltarea biotehnologiei sau numărul de premii Nobel din SUA."
};

export default async function SciencePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white font-body selection:bg-glory-gold selection:text-navy-dark">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: copy.breadcrumb }]} className="mb-8" />
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
            <FlaskConical className="h-24 w-24 text-glory-gold" />
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

      {/* Stats Section */}
      <section
        id="stats"
        className="scroll-mt-24 border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8 bg-navy-dark"
      >
        <div className="mx-auto max-w-7xl">
          <h3 className="font-mono text-xs uppercase tracking-widest text-glory-gold text-center mb-12">
            {copy.statsTitle}
          </h3>
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            {copy.stats.map((stat, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-glory-gold/20 transition-all"
              >
                <p className="font-hero text-4xl sm:text-5xl text-glory-gold tracking-wide mb-2">
                  {stat.value}
                </p>
                <p className="font-display text-lg font-bold text-white mb-2">
                  {stat.label}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Links Section */}
      <section
        id="nav-grid"
        className="scroll-mt-24 border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 bg-navy-dark"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            {copy.gridTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {copy.gridItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between hover:border-glory-gold/40 hover:bg-white/8 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-glory-gold border border-glory-gold/25 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                    {idx === 0 && <Lightbulb className="h-5 w-5 text-white/40 group-hover:text-glory-gold transition-colors" />}
                    {idx === 1 && <Atom className="h-5 w-5 text-white/40 group-hover:text-glory-gold transition-colors" />}
                    {idx === 2 && <Cpu className="h-5 w-5 text-white/40 group-hover:text-glory-gold transition-colors" />}
                    {idx === 3 && <Dna className="h-5 w-5 text-white/40 group-hover:text-glory-gold transition-colors" />}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-glory-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed font-body">
                    {item.description}
                  </p>
                </div>
                <span className="mt-6 text-xs text-glory-gold group-hover:underline block">
                  {isRo ? "Vezi perioada →" : "View era →"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shale Revolution (Energy Dominance) Section */}
      <section
        id="feature"
        className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 pb-12 bg-gradient-to-r from-navy-dark via-navy-mid to-navy-dark"
      >
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-navy-dark/60 backdrop-blur p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Flame className="h-40 w-40 text-glory-gold" />
          </div>
          
          <div className="relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-glory-gold mb-3 block">
              {copy.shaleLabel}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
              {copy.shaleTitle}
            </h2>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-6">
              {copy.shaleParagraph1}
            </p>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-8">
              {copy.shaleParagraph2}
            </p>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40">
              <span>Source: {copy.shaleSource}</span>
              <a 
                href={copy.shaleSourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-glory-gold hover:underline"
              >
                {isRo ? "Date oficiale EIA" : "EIA Official Data"}
                <ExternalLink className="h-3. w-3" />
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
