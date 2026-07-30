import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import InventionsDashboard from "@/components/interactive/InventionsDashboard";
import { INVENTIONS_1890_1945 } from "@/lib/data/inventions-1890-1945-data";
import {
  Plane,
  Settings,
  Orbit,
  Shield
} from "lucide-react";
import { MacroStyles, MacroHero } from "@/components/shared/CinematicSystem";
import { RevealSection } from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Rise of the Machine Age (1890–1945) | Science & Inventions",
  description: "Explore the era of speed and power: from the Wright Brothers' airplane and Ford's assembly line to Goddard's liquid rocket and the Manhattan Project.",
};

interface Inventions1890To1945Copy {
  breadcrumbParent: string;
  breadcrumbPage: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  thesisTitle: string;
  thesisParagraph1: string;
  thesisParagraph2: string;
  featuredTitle: string;
  archiveTitle: string;
  archiveSubtitle: string;
  oracleDescription: string;
}

const copyEn: Inventions1890To1945Copy = {
  breadcrumbParent: "Science & Inventions",
  breadcrumbPage: "Inventions 1890–1945",
  heroTagline: "THE MACHINE & WAR TIME ERA",
  heroTitle: "Architects of Speed and Power",
  heroSubtitle: "How the convergence of industrial scaling, corporate research labs, and wartime mobilization accelerated American technological dominance.",
  thesisTitle: "Mass Production and the Crucible of Global War",
  thesisParagraph1: "Between 1890 and 1945, the United States transitioned from an emerging industrial player to the industrial and scientific workshop of the world. The era was defined by scaling: the invention of the assembly line transformed luxury items into accessible consumer goods, and electrical networks expanded across the country. American ingenuity shifted from solitary inventors to structured research labs, like those of General Electric, DuPont, and Bell Labs.",
  thesisParagraph2: "This era of scaling reached its absolute peak under the extreme crucible of World War II. Facing existential global threats, the U.S. government coordinated with private corporations and elite universities under the Office of Scientific Research and Development. This mobilization produced radar, mass-produced penicillin, synthetic rubber, and ultimately the atomic bomb, establishing a federally-funded scientific infrastructure that continues to define global technology.",
  featuredTitle: "Defining 1890-1945 Inventions",
  archiveTitle: "The Machine Age archives",
  archiveSubtitle: "Explore the full, detailed history of 234 American inventions from the Progressive Era, the Roaring Twenties, and World War II.",
  oracleDescription: "Ask the AI Oracle about the Wright brothers' airplane, Henry Ford's assembly line, Robert Goddard's rockets, or the Manhattan Project."
};

const copyRo: Inventions1890To1945Copy = {
  breadcrumbParent: "Știință și Invenții",
  breadcrumbPage: "Invenții 1890–1945",
  heroTagline: "ERA MAȘINILOR ȘI A RĂZBOIULUI",
  heroTitle: "Arhitecții Vitezei și ai Puterii",
  heroSubtitle: "Cum convergența dezvoltării industriale, a laboratoarelor de cercetare corporative și a mobilizării din timpul războiului a accelerat dominația tehnologică americană.",
  thesisTitle: "Producția de Masă și Al Doilea Război Mondial",
  thesisParagraph1: "Între 1890 și 1945, Statele Unite au trecut de la statutul de jucător industrial emergent la cel de atelier industrial și științific al lumii. Era a fost definită de scalare: inventarea benzii de asamblare a transformat articolele de lux în bunuri de larg consum accesibile, iar rețelele electrice s-au extins în întreaga țară. Ingeniozitatea s-a mutat de la inventatori solitari la laboratoare de cercetare organizate.",
  thesisParagraph2: "Această epocă a atins apogeul în timpul celui de-al Doilea Război Mondial. Confruntându-se cu amenințări globale, guvernul SUA a colaborat cu corporații private și universități de elită în cadrul Biroului de Cercetare și Dezvoltare Științifică. Această mobilizare de forțe a produs radarul, penicilina de masă, cauciucul sintetic și, în cele din urmă, bomba atomică, stabilind o infrastructură științifică de vârf.",
  featuredTitle: "Invenții Pivotale între 1890 și 1945",
  archiveTitle: "Arhivele Erei Mașinilor",
  archiveSubtitle: "Explorează istoria detaliată a celor 234 de invenții americane din Epoca Progresistă, Anii Nebuni și al Doilea Război Mondial.",
  oracleDescription: "Întreabă Oracolul AI despre avionul fraților Wright, linia de asamblare a lui Henry Ford, rachetele lui Robert Goddard sau Proiectul Manhattan."
};

// Key Featured Inventions Data (Fully Localized for Depth and Detail)
const featuredInventions = [
  {
    year: "1903",
    titleEn: "The Airplane",
    titleRo: "Avionul (Aparatul de Zbor Motorizat)",
    inventor: "Orville & Wilbur Wright",
    icon: Plane,
    descEn: "At Kitty Hawk, North Carolina, the Wright brothers achieved the first controlled, sustained, and powered flight of a heavier-than-air aircraft. Through their pioneering research in three-axis control, they solved the fundamental aerodynamic stability problems that had blocked flight for centuries, launching the modern aviation age.",
    descRo: "La Kitty Hawk, Carolina de Nord, frații Wright au realizat primul zbor controlat, susținut și propulsat al unui aparat mai greu decât aerul. Prin cercetările lor în controlul pe trei axe, au rezolvat problemele fundamentale de stabilitate aerodinamică, deschizând era aviației moderne."
  },
  {
    year: "1913",
    titleEn: "The Moving Assembly Line",
    titleRo: "Banda de Asamblare în Flux",
    inventor: "Henry Ford",
    icon: Settings,
    descEn: "Ford revolutionized industrial manufacturing by installing the first moving assembly line for the mass production of the Model T. By dividing labor, standardizing parts, and bringing the work directly to the worker, he cut chassis assembly time from 12 hours to 93 minutes, making cars affordable to the working class.",
    descRo: "Ford a revoluționat producția industrială prin instalarea primei linii de asamblare în mișcare pentru producția în masă a Modelului T. Împărțind munca și standardizând piesele, a redus timpul de asamblare a șasiului de la 12 ore la 93 de minute, făcând mașinile accesibile clasei muncitoare."
  },
  {
    year: "1926",
    titleEn: "The Liquid-Fuel Rocket",
    titleRo: "Racheta cu Combustibil Lichid",
    inventor: "Robert Goddard",
    icon: Orbit,
    descEn: "Goddard launched the world's first liquid-propellant rocket in Auburn, Massachusetts. Using gasoline and liquid oxygen, the flight lasted 2.5 seconds and reached 41 feet, proving that liquid propulsion was physically possible. This breakthrough laid the direct structural foundation for Apollo lunar flights and modern space travel.",
    descRo: "Goddard a lansat prima rachetă din lume cu combustibil lichid în Auburn, Massachusetts. Folosind benzină și oxigen lichid, zborul a durat 2,5 secunde și a atins o înălțime de 12 metri. Această descoperire a pus bazele structurale ale zborurilor lunare Apollo și explorării spațiale moderne."
  },
  {
    year: "1945",
    titleEn: "The Atomic Bomb (Nuclear Fission)",
    titleRo: "Bomba Atomică (Proiectul Manhattan)",
    inventor: "J. Robert Oppenheimer & Team",
    icon: Shield,
    descEn: "Under the extreme urgency of WWII, the US government mobilized the Manhattan Project, the largest scientific collaboration in history. Culminating in the Trinity test in July 1945, this breakthrough harnessed controlled nuclear fission, bringing a rapid end to WWII and thrusting humanity into the nuclear age.",
    descRo: "Sub urgența extremă a celui de-al Doilea Război Mondial, guvernul SUA a organizat Proiectul Manhattan - cea mai mare colaborare științifică din istorie. Culminând cu testul Trinity în iulie 1945, această descoperire a stăpânit fisiunea nucleară controlată, punând capăt războiului."
  }
];

export default async function Inventions1890To1945Page() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <>
      <MacroStyles />
      <MacroHero
        imageSrc="/images/library/Technology/Landed rockets in hangar 39A SpaceX.jpg"
        imageAlt="Industrial era machinery and rocket technology"
        eyebrow={copy.heroTagline}
        titleLead={isRo ? "ARHITECȚII" : "ARCHITECTS OF"}
        titleAccent={isRo ? "VITEZEI ȘI PUTERII" : "SPEED AND POWER"}
        description={copy.heroSubtitle}
        stats={[
          { value: "1903", label: isRo ? "Primul Zbor Motorizat" : "First Powered Flight" },
          { value: "234", label: isRo ? "Invenții Catalogate" : "Inventions Catalogued" },
          { value: "1945", label: isRo ? "Proiectul Manhattan" : "Manhattan Project" },
        ]}
      />

      <div className="bg-[#000000] relative z-10 pb-32 font-body text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 mb-8">
          <Breadcrumb items={[{ label: copy.breadcrumbParent, href: "/science" }, { label: copy.breadcrumbPage }]} />
        </div>

        {/* Thesis */}
        <RevealSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-6">
              <span className="macro-eyebrow">{copy.heroTagline}</span>
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

        {/* Featured Inventions */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="macro-section-title text-white text-center text-3xl mb-16">{copy.featuredTitle}</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredInventions.map((item, idx) => {
                return (
                  <div key={idx} className="group border-t border-white/10 pt-8 flex flex-col justify-between transition-colors duration-300 hover:border-[#E8B923]/40">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-sm font-bold text-[#E8B923]">
                          {item.year}
                        </span>
                        <span className="text-xs text-white/40 font-mono">{item.inventor}</span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-[#E8B923] transition-colors">
                        {isRo ? item.titleRo : item.titleEn}
                      </h3>
                      <p className="macro-body text-sm">{isRo ? item.descRo : item.descEn}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealSection>

        {/* Archive */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="macro-section-title text-white text-3xl mb-4">{copy.archiveTitle}</h2>
              <p className="macro-body text-sm">{copy.archiveSubtitle}</p>
            </div>
            <InventionsDashboard locale={locale} inventions={INVENTIONS_1890_1945} />
          </div>
        </RevealSection>

        <AskAmericaCTA locale={locale} descriptionEn={copyEn.oracleDescription} descriptionRo={copyRo.oracleDescription} />
      </div>
    </>
  );
}
