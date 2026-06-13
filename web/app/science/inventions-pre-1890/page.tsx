import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import InventionsDashboard from "@/components/interactive/InventionsDashboard";
import { INVENTIONS_PRE_1890 } from "@/lib/data/inventions-pre-1890-data";
import {
  Lightbulb,
  Cpu,
  MessageSquareCode,
  Wrench,
  ExternalLink,
  Flame,
  Radio,
  FileText
} from "lucide-react";
import { MacroStyles, MacroHero } from "@/components/shared/CinematicSystem";
import { RevealSection } from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Early American Ingenuity (Pre-1890) | Science & Inventions",
  description: "Explore the early American industrial explosion, featuring the lightning rod, cotton gin, telegraph, telephone, and the incandescent lightbulb.",
};

interface Pre1890Copy {
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

const copyEn: Pre1890Copy = {
  breadcrumbParent: "Science & Inventions",
  breadcrumbPage: "Inventions Pre-1890",
  heroTagline: "THE INDUSTRIAL EXPLOSION",
  heroTitle: "Foundations of American Ingenuity",
  heroSubtitle: "How a young nation, protected by constitutional patent rights and fueled by frontier resourcefulness, laid the industrial groundwork for the modern age.",
  thesisTitle: "The Constitutional Spark and Frontier Resourcefulness",
  thesisParagraph1: "Before the United States became a global superpower, it was a frontier society that faced severe labor shortages and vast distances. To survive and thrive, Americans had to innovate. This drive was formalized in Article I, Section 8, Clause 8 of the U.S. Constitution, which empowered Congress to promote the progress of science and useful arts by securing exclusive patent rights for inventors.",
  thesisParagraph2: "This legal framework catalyzed an industrial explosion. From Benjamin Franklin's early electrical experiments to the steam engines, cotton gins, and telegraph lines that stitched the continent together, early American inventions were fundamentally pragmatic. They solved immediate physical challenges — bridging distances, multiplying human labor, and illuminating the dark.",
  featuredTitle: "Pivotal Pre-1890 Inventions",
  archiveTitle: "The Comprehensive Patent Archives",
  archiveSubtitle: "Explore the full, detailed history of 187 pre-1890 American inventions compiled directly from historical patent logs.",
  oracleDescription: "Ask the AI Oracle about early American inventors like Benjamin Franklin, Eli Whitney, Samuel Morse, Alexander Graham Bell, or Thomas Edison."
};

const copyRo: Pre1890Copy = {
  breadcrumbParent: "Știință și Invenții",
  breadcrumbPage: "Invenții înainte de 1890",
  heroTagline: "EXPLOZIA INDUSTRIALĂ",
  heroTitle: "Fundația Ingeniozității Americane",
  heroSubtitle: "Cum o națiune tânără, protejată de drepturile constituționale de brevet și stimulată de ingeniozitatea de frontieră, a pus bazele industriale ale erei moderne.",
  thesisTitle: "Scânteia Constituțională și Spiritul de Frontieră",
  thesisParagraph1: "Înainte ca Statele Unite să devină o superputere globală, au fost o societate de frontieră care s-a confruntat cu o lipsă acută de forță de muncă și distanțe enorme. Pentru a supraviețui și a prospera, americanii au trebuit să inoveze. Această nevoie a fost formalizată în Articolul I, Secțiunea 8, Clauza 8 din Constituția SUA, garantând inventatorilor drepturi exclusive asupra brevetelor.",
  thesisParagraph2: "Acest cadru legal a catalizat o explozie industrială. De la experimentele electrice timpurii ale lui Benjamin Franklin, până la motoarele cu aburi, daracele de bumbac și liniile de telegraf care au unit continentul, primele invenții americane au fost profund pragmatice. Ele au rezolvat provocări fizice imediate: scurtarea distanțelor, multiplicarea forței de muncă și iluminarea întunericului.",
  featuredTitle: "Invenții Pivotale înainte de 1890",
  archiveTitle: "Arhiva Completă de Brevete",
  archiveSubtitle: "Explorează istoria detaliată a celor 187 de invenții americane dinainte de 1890, compilate direct din jurnalele de brevete.",
  oracleDescription: "Întreabă Oracolul AI despre inventatorii americani timpurii precum Benjamin Franklin, Eli Whitney, Samuel Morse, Alexander Graham Bell sau Thomas Edison."
};

// Key Featured Inventions Data (Fully Localized for Depth and Detail)
const featuredInventions = [
  {
    year: "1749 / 1752",
    titleEn: "The Lightning Rod (Franklin Rod)",
    titleRo: "Paratrăsnetul (Tija lui Franklin)",
    inventor: "Benjamin Franklin",
    icon: Flame,
    descEn: "Franklin's pointed conductor was conceived in 1749 when he concluded that electricity and lightning were identical. In 1752, his famous kite experiment proved this theory. The lightning rod became the first practical application of electrical science, saving countless wooden colonial buildings and steeples from burning to the ground.",
    descRo: "Tija ascuțită a lui Franklin a fost concepută în 1749, când acesta a concluzionat că fulgerul este electricitate. În 1752, faimosul experiment cu zmeul a demonstrat această teorie. Paratrăsnetul a devenit prima aplicație practică a științei electricității, salvând nenumărate clădiri coloniale și biserici din lemn de la incendii pustiitoare."
  },
  {
    year: "1793",
    titleEn: "The Cotton Gin",
    titleRo: "Daracul de Bumbac (Cotton Gin)",
    inventor: "Eli Whitney",
    icon: Wrench,
    descEn: "Whitney's machine mechanized the arduous task of separating cotton fibers from seeds, increasing productivity by a factor of fifty. While it established the South as a dominant global cotton exporter and sparked the American textile industry, it also tragically solidified and expanded the institution of slavery across the antebellum South.",
    descRo: "Mașina lui Whitney a mecanizat sarcina grea de separare a fibrelor de bumbac de semințe, crescând productivitatea de cincizeci de ori. Deși a transformat Sudul într-un exportator global dominant de bumbac, a consolidat și a extins în mod tragic instituția sclaviei în sudul dinaintea Războiului Civil."
  },
  {
    year: "1837",
    titleEn: "The Electromagnetic Telegraph",
    titleRo: "Telegraful Electromagnetic",
    inventor: "Samuel Morse",
    icon: Radio,
    descEn: "Morse developed a single-circuit telegraph system alongside his partner Alfred Vail, who helped design Morse Code. Transmitting the first official message in 1844 ('What hath God wrought'), this invention shriveled the time needed to communicate across continents from weeks to milliseconds, forming the nervous system of modern finance and media.",
    descRo: "Morse a dezvoltat un sistem de telegraf cu un singur circuit alături de partenerul său Alfred Vail, care a ajutat la crearea Codului Morse. Transmițând primul mesaj oficial în 1844 ('Ce lucruri mari a făcut Dumnezeu!'), această invenție a redus timpul de comunicare transcontinentală de la săptămâni la milisecunde, formând sistemul nervos al finanțelor și presei moderne."
  },
  {
    year: "1876 / 1879",
    titleEn: "Telephone & Incandescent Lightbulb",
    titleRo: "Telefonul și Becul Incandescent",
    inventor: "Alexander Graham Bell & Thomas Edison",
    icon: Lightbulb,
    descEn: "In 1876, Bell patented the telephone, transmitting human voice electrically. Three years later in 1879, Edison developed a commercially viable incandescent bulb with a carbonized bamboo filament at Menlo Park. Together, these inventions literally illuminated and connected the modern urban and industrial landscape.",
    descRo: "În 1876, Bell a brevetat telefonul, transmițând vocea umană prin impulsuri electrice. Trei ani mai târziu, în 1879, Edison a creat becul incandescent viabil comercial folosind un filament din bambus carbonizat în Menlo Park. Împreună, aceste invenții au iluminat și au conectat peisajul urban și industrial modern."
  }
];

export default async function InventionsPre1890Page() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <>
      <MacroStyles />
      <MacroHero
        imageSrc="/images/library/Technology/PCB circuit board of electronic device.jpg"
        imageAlt="Industrial era circuit board and mechanical components"
        eyebrow={copy.heroTagline}
        titleLead={isRo ? "FUNDAȚIA" : "FOUNDATIONS OF"}
        titleAccent={isRo ? "INGENIOZITĂȚII" : "AMERICAN INGENUITY"}
        description={copy.heroSubtitle}
        stats={[
          { value: "1787", label: isRo ? "Brevete Constituționale" : "Constitutional Patents" },
          { value: "187", label: isRo ? "Invenții Catalogate" : "Inventions Catalogued" },
          { value: "1879", label: isRo ? "Becul lui Edison" : "Edison's Lightbulb" },
        ]}
      />

      <div className="bg-[#000000] relative z-10 pb-32 font-body text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 mb-8">
          <Breadcrumb items={[{ label: copy.breadcrumbParent, href: "/science" }, { label: copy.breadcrumbPage }]} />
        </div>

        {/* Thesis */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/2 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-[0.06] pointer-events-none">
              <Cpu className="h-32 w-32 text-[#E8B923]" />
            </div>
            <h2 className="macro-section-title text-[#E8B923] text-3xl mb-6">{copy.thesisTitle}</h2>
            <p className="macro-body mb-6">{copy.thesisParagraph1}</p>
            <p className="macro-body">{copy.thesisParagraph2}</p>
          </div>
        </RevealSection>

        {/* Featured Inventions */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="macro-section-title text-white text-center text-3xl mb-16">{copy.featuredTitle}</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredInventions.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="group rounded-3xl border border-white/10 bg-white/2 p-8 relative overflow-hidden hover:border-[#E8B923]/30 transition-all duration-300 flex flex-col justify-between">
                    <div className="absolute top-4 right-4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity pointer-events-none">
                      <Icon className="h-32 w-32 text-[#E8B923]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-sm font-bold text-[#E8B923] bg-[#E8B923]/10 px-3 py-1 rounded-full border border-[#E8B923]/25">
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
            <InventionsDashboard locale={locale} inventions={INVENTIONS_PRE_1890} />
          </div>
        </RevealSection>

        <AskAmericaCTA locale={locale} descriptionEn={copyEn.oracleDescription} descriptionRo={copyRo.oracleDescription} />
      </div>
    </>
  );
}
