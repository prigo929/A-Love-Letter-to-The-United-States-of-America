import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import {
  Lightbulb,
  Atom,
  Flame,
  Cpu,
  Dna,
  ExternalLink
} from "lucide-react";
import { MacroStyles, MacroHero } from "@/components/shared/CinematicSystem";
import { HorizontalScrollBand, ScrollytellPin } from "@/components/shared/CinematicScroll";
import { RevealSection } from "@/components/shared/Reveal";

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
  labsLabel: string;
  labsTitle: string;
  labsParagraph1: string;
  labsParagraph2: string;
  labsSource: string;
  labsSourceUrl: string;
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
      value: "398",
      label: "Nobel Laureates",
      description: "American scientists have won ~34% of all Nobel Prizes in history. Since 1970, over half of all prizes have been won by Americans (nearly two-thirds recently), and they account for half of all global scientific citations."
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
  shaleParagraph2: "No government planned this; it was market-driven ingenuity. Powering this is the Pipeline Nation: the US operates the world's largest energy pipeline network with over 2.8 million miles of pipe — a 65% global share (vs Russia 8%, Canada 3%). This underground web delivers cheap natural gas and crude invisibly and continuously, creating a domestic commodity market structurally insulated from the foreign import vulnerabilities that haunt Europe.",
  shaleSource: "US Energy Information Administration (EIA) / Pipeline 101",
  shaleSourceUrl: "https://pipeline101.org/location/",
  labsLabel: "NATIONAL SCIENTIFIC CONCENTRATION",
  labsTitle: "The DOE National Labs: Unmatched Research Infrastructure",
  labsParagraph1: "The Department of Energy's 17 National Laboratories (including Lawrence Livermore, Oak Ridge, Argonne, SLAC, and Fermilab) represent the most comprehensive scientific research system in the world. Directly descended from the wartime Manhattan Project, this system coordinates specialized, large-scale scientific infrastructure that no other country can replicate.",
  labsParagraph2: "Operating continuously for over 70 years, these institutions house instruments found nowhere else on Earth. It was here that scientists achieved the world's first fusion ignition at Lawrence Livermore in 2022 and built some of the fastest supercomputers in existence at Oak Ridge. The system stands as a monument to deep research that no single private corporation or foreign state could fund.",
  labsSource: "US Department of Energy (DOE)",
  labsSourceUrl: "https://www.energy.gov/us-department-energy-national-laboratories",
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
  statsTitle: "Conducerea Științifică în Cifre",
  stats: [
    {
      value: "398",
      label: "Laureați Nobel",
      description: "Oamenii de știință din SUA au câștigat ~34% din toate premiile Nobel din istorie. Din 1970, peste jumătate din premii au fost câștigate de americani (aproape două treimi recent), producând jumătate din citările științifice globale."
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
  shaleParagraph2: "Niciun minister nu a planificat asta; a fost ingeniozitate privată. Motorul acestei abundențe este rețeaua națională de conducte: SUA au cea mai mare rețea de conducte energetice din lume, cu peste 4,5 milioane de kilometri (2,8 milioane mile) — o cotă globală de 65% (față de Rusia 8%, Canada 3%). Această rețea subterană transportă gaze și petrol continuu și ieftin, oferind o imunitate structurală în fața vulnerabilităților de import care afectează Europa.",
  shaleSource: "Administrația Americană pentru Informații în Domeniul Energiei (EIA) / Pipeline 101",
  shaleSourceUrl: "https://pipeline101.org/location/",
  labsLabel: "CONCENTRARE ȘTIINȚIFICĂ NAȚIONALĂ",
  labsTitle: "Laboratoarele Naționale DOE: Infrastructură de Cercetare Unică",
  labsParagraph1: "Cele 17 Laboratoare Naționale ale Departamentului de Energie al SUA (inclusiv Lawrence Livermore, Oak Ridge, Argonne, SLAC și Fermilab) reprezintă cel mai cuprinzător sistem de cercetare științifică din lume. Descendent direct din Proiectul Manhattan, acest sistem reunește o infrastructură masivă și specializată pe care nicio altă țară nu o poate replica.",
  labsParagraph2: "Funcționând continuu de peste 70 de ani, aceste instituții dețin instrumente unice. Aici a fost realizată prima aprindere prin fuziune din lume la Lawrence Livermore în 2022 și sunt găzduite cele mai rapide supercomputere la Oak Ridge. Sistemul este un monument al cercetării fundamentale pe care nicio companie privată sau stat străin nu o poate finanța la această scară.",
  labsSource: "Departamentul de Energie al SUA (DOE)",
  labsSourceUrl: "https://www.energy.gov/us-department-energy-national-laboratories",
  oracleDescription: "Întreabă Oracolul AI despre descoperirile științifice istorice, tranzistori, dezvoltarea biotehnologiei sau numărul de premii Nobel din SUA."
};

export default async function SciencePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <>
      <MacroStyles />
      <MacroHero
        videoSrc="/videos/library/Technology/Fiber Optics, light, trails video.mp4"
        eyebrow={copy.heroTagline}
        titleLead={isRo ? "AU CONSTRUIT" : "THEY BUILT THE"}
        titleAccent={isRo ? "LUMEA MODERNĂ" : "MODERN WORLD"}
        description={copy.heroSubtitle}
        stats={[
          { value: "398", label: isRo ? "Laureați Nobel" : "Nobel Laureates" },
          { value: "350k+", label: isRo ? "Brevete / An" : "Patents / Year" },
          { value: "#1", label: isRo ? "Finanțare R&D" : "Global R&D Funding" },
        ]}
      />

      <div className="bg-[#000000] relative z-10 pb-32 font-body text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 mb-8">
          <Breadcrumb items={[{ label: copy.breadcrumb }]} />
        </div>

        {/* Thesis */}
        <RevealSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-6">
              <span className="macro-eyebrow">{isRo ? "DOMINAȚIE ȘTIINȚIFICĂ" : "SCIENTIFIC DOMINANCE"}</span>
              <h2 className="font-macro-display text-4xl md:text-5xl font-bold text-white leading-tight">
                {copy.thesisTitle}
              </h2>
              <p className="font-macro-body text-white/80 text-xl leading-relaxed">
                {copy.thesisParagraph1}
              </p>
              <p className="font-macro-body text-white/80 text-xl leading-relaxed">
                {copy.thesisParagraph2}
              </p>
            </div>
          </div>
        </RevealSection>

        {/* Stats */}
        <RevealSection className="border-b border-white/5 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#E8B923] text-center mb-12">
              {copy.statsTitle}
            </h3>
            <div className="grid gap-8 sm:grid-cols-3 text-center">
              {copy.stats.map((stat, idx) => (
                <div key={idx} className="p-8 rounded-2xl border border-white/5 bg-white/2 hover:border-[#E8B923]/20 transition-all">
                  <p className="macro-stat-value mb-2">{stat.value}</p>
                  <p className="font-display text-lg font-bold text-white mb-3">{stat.label}</p>
                  <p className="text-xs text-white/50 leading-relaxed">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Chronology — mobile grid */}
        <section className="border-b border-white/5 px-4 py-20 sm:px-6 lg:hidden">
          <div className="mx-auto max-w-7xl">
            <h2 className="macro-section-title text-white text-center text-3xl mb-12">{copy.gridTitle}</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {copy.gridItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="group rounded-3xl border border-white/10 bg-white/2 p-6 flex flex-col justify-between hover:border-[#E8B923]/40 hover:bg-white/4 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[#E8B923] border border-[#E8B923]/25 px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                      {idx === 0 && <Lightbulb className="h-5 w-5 text-white/30 group-hover:text-[#E8B923] transition-colors" />}
                      {idx === 1 && <Atom className="h-5 w-5 text-white/30 group-hover:text-[#E8B923] transition-colors" />}
                      {idx === 2 && <Cpu className="h-5 w-5 text-white/30 group-hover:text-[#E8B923] transition-colors" />}
                      {idx === 3 && <Dna className="h-5 w-5 text-white/30 group-hover:text-[#E8B923] transition-colors" />}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#E8B923] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed">{item.description}</p>
                  </div>
                  <span className="mt-6 text-xs text-[#E8B923] group-hover:underline block">
                    {isRo ? "Vezi perioada →" : "View era →"}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Chronology — desktop horizontal scroll timeline */}
        <section className="hidden lg:block border-b border-white/5">
          <div className="mx-auto max-w-7xl px-8 pt-20">
            <h2 className="macro-section-title text-white text-center text-3xl">{copy.gridTitle}</h2>
            <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-white/30 mt-4">
              {isRo ? "Derulează pentru a traversa erele" : "Scroll to travel through the eras"}
            </p>
          </div>
          <HorizontalScrollBand panels={4}>
            {copy.gridItems.map((item, idx) => (
              <div key={idx} className="flex-1 h-full flex items-center justify-center px-16">
                <Link
                  href={item.href}
                  className="group relative w-full max-w-3xl rounded-3xl border border-white/10 bg-white/2 p-14 hover:border-[#E8B923]/40 hover:bg-white/4 transition-all duration-300"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-10 right-6 font-mono text-[120px] font-bold leading-none text-white/4 select-none"
                  >
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-sm font-mono text-[#E8B923] border border-[#E8B923]/25 px-3 py-1 rounded">
                      {item.badge}
                    </span>
                    {idx === 0 && <Lightbulb className="h-8 w-8 text-white/30 group-hover:text-[#E8B923] transition-colors" />}
                    {idx === 1 && <Atom className="h-8 w-8 text-white/30 group-hover:text-[#E8B923] transition-colors" />}
                    {idx === 2 && <Cpu className="h-8 w-8 text-white/30 group-hover:text-[#E8B923] transition-colors" />}
                    {idx === 3 && <Dna className="h-8 w-8 text-white/30 group-hover:text-[#E8B923] transition-colors" />}
                  </div>
                  <h3 className="font-display text-4xl font-bold text-white mb-6 group-hover:text-[#E8B923] transition-colors">
                    {item.title}
                  </h3>
                  <p className="macro-body text-base mb-8">{item.description}</p>
                  <span className="text-sm text-[#E8B923] group-hover:underline">
                    {isRo ? "Vezi perioada →" : "View era →"}
                  </span>
                </Link>
              </div>
            ))}
          </HorizontalScrollBand>
        </section>

        {/* Shale Revolution */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/2 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-[0.06]">
              <Flame className="h-40 w-40 text-[#E8B923]" />
            </div>
            <div className="relative z-10">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E8B923] mb-3 block">{copy.shaleLabel}</span>
              <h2 className="macro-section-title text-white text-3xl mb-6">{copy.shaleTitle}</h2>
              <p className="macro-body mb-6">{copy.shaleParagraph1}</p>
              <p className="macro-body mb-8">{copy.shaleParagraph2}</p>
              <div className="flex items-center justify-between border-t border-white/5 pt-6 text-xs text-white/40">
                <span>Source: {copy.shaleSource}</span>
                <a href={copy.shaleSourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#E8B923] hover:underline">
                  {isRo ? "Date oficiale EIA" : "EIA Official Data"}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* DOE National Labs — pinned scrollytelling */}
        <section className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollytellPin
              imageSrc="/images/library/Technology/server aisles in google data center in Ohio.jpg"
              imageAlt="Server aisles inside a hyperscale American data center"
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#E8B923] mb-3 block">{copy.labsLabel}</span>
                <h2 className="macro-section-title text-white text-3xl">{copy.labsTitle}</h2>
              </div>
              <p className="macro-body">{copy.labsParagraph1}</p>
              <p className="macro-body">{copy.labsParagraph2}</p>
              <div className="flex items-center justify-between border-t border-white/5 pt-6 text-xs text-white/40">
                <span>Source: {copy.labsSource}</span>
                <a href={copy.labsSourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#E8B923] hover:underline">
                  {isRo ? "Portal Oficial DOE Labs" : "Official DOE Labs Portal"}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </ScrollytellPin>
          </div>
        </section>

        <AskAmericaCTA locale={locale} descriptionEn={copyEn.oracleDescription} descriptionRo={copyRo.oracleDescription} />
      </div>
    </>
  );
}
