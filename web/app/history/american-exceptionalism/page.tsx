import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  Users, 
  Sparkles, 
  Map, 
  Scale, 
  Compass, 
  BookOpen, 
  ExternalLink 
} from "lucide-react";

export const metadata: Metadata = {
  title: "American Exceptionalism | History",
  description: "Explore why America developed a liberty-first political culture, rejecting class-based feudal structures to build a merit-based constitutional republic.",
};

interface ExceptionalismCopy {
  breadcrumbParent: string;
  breadcrumbPage: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  thesisTitle: string;
  thesisParagraph: string;
  pillarsTitle: string;
  pillars: Array<{
    title: string;
    description: string;
    badge: string;
  }>;
  meritLabel: string;
  meritTitle: string;
  meritParagraph1: string;
  meritParagraph2: string;
  meritSource: string;
  meritSourceUrl: string;
  oracleDescription: string;
}

const copyEn: ExceptionalismCopy = {
  breadcrumbParent: "History",
  breadcrumbPage: "American Exceptionalism",
  heroTagline: "LIBERTY-FIRST NATION",
  heroTitle: "A Liberty-First Culture, Different by Design",
  heroSubtitle: "How the rejection of feudal class structures and a commitment to individual self-government created a unique political experiment.",
  thesisTitle: "The Roots of Exceptionalism",
  thesisParagraph: "Unlike the old nations of Europe, which were defined by shared ethnicity, blood, and feudal history, the United States was founded on an idea: that all men are created equal, endowed with natural rights to liberty and the pursuit of happiness. This 'exceptional' foundation shaped a political culture prioritizing individual freedom over state authority, decentralized local government, and a deep-seated belief in personal responsibility.",
  pillarsTitle: "Pillars of the Exceptional Model",
  pillars: [
    {
      title: "Liberty-First Culture",
      description: "A deep cultural skepticism of centralized power. The state exists to protect preexisting natural rights, not to grant them, making individual liberty the absolute default.",
      badge: "Individualism"
    },
    {
      title: "Local Self-Government",
      description: "Building community order from the bottom up rather than the top down. Civic associations, local councils, and state laws act as laboratories of democratic governance.",
      badge: "Federalism"
    },
    {
      title: "Rejection of Feudalism",
      description: "America was born free of hereditary class systems and aristocratic titles. Status was determined by effort and contribution, not bloodlines or royal decrees.",
      badge: "No Aristocracy"
    },
    {
      title: "Civic Virtue & Associations",
      description: "Alexis de Tocqueville noted that Americans solved community problems by forming voluntary associations, preventing the state from monopolizing social life.",
      badge: "Voluntarism"
    }
  ],
  meritLabel: "THE MERITOCRACY PROOF",
  meritTitle: "Immigrant Achievement: The Meritocracy Proof",
  meritParagraph1: "The single most empirically powerful argument for American exceptionalism is the data on voluntary immigrant success. Indian-Americans — who came to the US with no historical tie of colonialism, no legacy preference, no ethnic political machine behind them — are the highest-earning demographic in the country, with median household incomes more than double the national average. Nigerian-Americans rank among the most educated demographic groups in the nation.",
  meritParagraph2: "Lebanese, Chinese, Korean, and Iranian immigrant communities have replicated the same pattern across generations: arriving with little, operating through a merit-based system, and reaching the upper-middle class within one or two generations. People do not vote with their feet toward a rigged system. They vote toward the one that works.",
  meritSource: "Pew Research Second-Generation Immigrant Studies",
  meritSourceUrl: "https://www.pewresearch.org/social-trends/2013/04/04/second-generation-americans/",
  oracleDescription: "Ask the AI Oracle about Alexis de Tocqueville's observations, immigrant median household incomes, or the constitutional roots of self-government."
};

const copyRo: ExceptionalismCopy = {
  breadcrumbParent: "Istorie",
  breadcrumbPage: "Excepționalism American",
  heroTagline: "O NAȚIUNE DEDICATĂ LIBERTĂȚII",
  heroTitle: "O Cultură a Libertății, Diferită prin Design",
  heroSubtitle: "Cum respingerea structurilor feudale de clasă și atașamentul față de autoguvernare au creat un experiment politic unic.",
  thesisTitle: "Rădăcinile Excepționalismului",
  thesisParagraph: "Spre deosebire de națiunile vechi ale Europei, definite de etnie și istorie feudală comună, Statele Unite au fost fondate pe o idee: că toți oamenii sunt creați egali, înzestrați cu drepturi naturale la libertate și căutarea fericirii. Această bază „excepțională” a conturat o cultură care prioritizează libertatea individuală în fața autorității statului.",
  pillarsTitle: "Pilonii Modelului Excepțional",
  pillars: [
    {
      title: "Cultura Primatului Libertății",
      description: "Un scepticism profund față de puterea centralizată. Statul are rolul de a proteja drepturile naturale preexistente, nu de a le acorda, făcând din libertate starea implicită.",
      badge: "Individualism"
    },
    {
      title: "Autoguvernarea Locală",
      description: "Construirea ordinii comunitare de jos în sus, nu de sus în jos. Asociațiile civice, consiliile locale și legile statale servesc drept laboratoare ale guvernării.",
      badge: "Federalism"
    },
    {
      title: "Respingerea Feudalismului",
      description: "America s-a născut liberă de sisteme de clasă ereditare și titluri nobiliare. Statutul social a fost determinat de efort, nu de descendența genealogică.",
      badge: "Fără Aristocrație"
    },
    {
      title: "Virtutea Civică și Voluntariatul",
      description: "Alexis de Tocqueville a remarcat că americanii rezolvă problemele comunitare prin asociații libere, împiedicând statul să monopolizeze viața socială.",
      badge: "Voluntariat"
    }
  ],
  meritLabel: "DOVADA MERITOCRAȚIEI",
  meritTitle: "Succesul Imigranților: Dovada Meritocrației",
  meritParagraph1: "Cel mai puternic argument empiric pentru excepționalismul american este reprezentat de datele privind succesul imigranților voluntari. Indienii americani au cele mai mari venituri dintre toate categoriile demografice din țară, cu venituri medii ale gospodăriilor mai mult de dublu față de media națională. Nigerienii americani se numără printre cele mai educate grupuri.",
  meritParagraph2: "Comunitățile de imigranți libanezi, chinezi, coreeni și iranieni au replicat același model de-a lungul generațiilor: sosesc cu puține resurse, operează într-un sistem meritocratic și ating clasa de mijloc superioară în una sau două generații. Oamenii nu migrează în număr mare spre un sistem blocat; migrează spre cel care funcționează.",
  meritSource: "Pew Research - Studii privind A Doua Generație de Imigranți",
  meritSourceUrl: "https://www.pewresearch.org/social-trends/2013/04/04/second-generation-americans/",
  oracleDescription: "Întreabă Oracolul AI despre observațiile lui Alexis de Tocqueville, veniturile medii ale gospodăriilor de imigranți sau rădăcinile autoguvernării constituționale."
};

export default async function AmericanExceptionalismPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white font-body selection:bg-glory-gold selection:text-navy-dark">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: copy.breadcrumbParent, href: "/history" },
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
            <Compass className="h-24 w-24 text-glory-gold" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-glory-gold mb-6">
            {copy.thesisTitle}
          </h2>
          <p className="font-body text-white/80 text-lg leading-relaxed">
            {copy.thesisParagraph}
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section
        id="pillars"
        className="scroll-mt-24 border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 bg-navy-dark"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            {copy.pillarsTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {copy.pillars.map((item, idx) => (
              <div 
                key={idx}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between hover:border-glory-gold/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-glory-gold border border-glory-gold/25 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                    {idx === 0 && <Sparkles className="h-5 w-5 text-white/35" />}
                    {idx === 1 && <Map className="h-5 w-5 text-white/35" />}
                    {idx === 2 && <Scale className="h-5 w-5 text-white/35" />}
                    {idx === 3 && <BookOpen className="h-5 w-5 text-white/35" />}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed font-body">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Immigrant Achievement Section */}
      <section
        id="merit-feature"
        className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 pb-16 bg-gradient-to-r from-navy-dark via-navy-mid to-navy-dark"
      >
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-navy-dark/60 backdrop-blur p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users className="h-40 w-40 text-glory-gold" />
          </div>
          
          <div className="relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-glory-gold mb-3 block">
              {copy.meritLabel}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
              {copy.meritTitle}
            </h2>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-6">
              {copy.meritParagraph1}
            </p>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-8">
              {copy.meritParagraph2}
            </p>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40">
              <span>Source: {copy.meritSource}</span>
              <a 
                href={copy.meritSourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-glory-gold hover:underline"
              >
                {isRo ? "Date Pew Research" : "Pew Research Data"}
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
