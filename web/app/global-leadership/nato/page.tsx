import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  Shield, 
  Globe, 
  Anchor, 
  Zap, 
  Coins, 
  HelpCircle, 
  ExternalLink 
} from "lucide-react";

export const metadata: Metadata = {
  title: "NATO Alliance & Pax Americana | Global Leadership",
  description: "Explore the security foundations of the free world: NATO, Article 5, and how the U.S. defense budget underwrites global stability.",
};

interface NatoCopy {
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
  defenseLabel: string;
  defenseTitle: string;
  defenseParagraph1: string;
  defenseParagraph2: string;
  defenseSource: string;
  defenseSourceUrl: string;
  oracleDescription: string;
}

const copyEn: NatoCopy = {
  breadcrumbParent: "Global Leadership",
  breadcrumbPage: "NATO Alliance",
  heroTagline: "SECURITY & PAX AMERICANA",
  heroTitle: "NATO: The Shield of the Democratic World",
  heroSubtitle: "How collective defense and the American security umbrella have guaranteed peace and enabled global prosperity since 1945.",
  thesisTitle: "The Cornerstone of Transatlantic Security",
  thesisParagraph: "Established in 1949, the North Atlantic Treaty Organization (NATO) binds 32 sovereign democratic nations together in mutual defense. At its core is Article 5—the commitment that an attack on one is an attack on all. Underpinned by American military capability and the strategic nuclear umbrella, NATO has successfully deterred aggression and kept the peace in Europe for more than seven decades.",
  pillarsTitle: "Key Pillars of the Alliance",
  pillars: [
    {
      title: "Article 5 Commitment",
      description: "The sacred pledge of collective defense. It has been invoked only once in history: by European allies in support of the United States immediately following the September 11 attacks.",
      badge: "Mutual Defense"
    },
    {
      title: "Global Sea Lanes Control",
      description: "The US Navy patrolled global choke points and shipping lanes, ensuring that trillions of dollars in trade can move freely between continents without piracy or blockade.",
      badge: "Maritime Security"
    },
    {
      title: "The Nuclear Umbrella",
      description: "A strategic security subsidy that protects non-nuclear allies (like Germany, Italy, and Japan) from external coercion, preventing a dangerous regional arms race.",
      badge: "Deterrence"
    },
    {
      title: "Allied Interoperability",
      description: "Standardized command structures, equipment, and regular joint military exercises ensure that 32 armies can act as a unified, coordinated global defense force.",
      badge: "Cooperation"
    }
  ],
  defenseLabel: "UNDERWRITING THE FREE WORLD",
  defenseTitle: "Defense and the Pax Americana: Funding Global Stability",
  defenseParagraph1: "The US defense budget of approximately $886 billion in FY2024 exceeds the combined military spending of all other NATO allies. This is frequently cited by critics as evidence of American imperialism — but what is omitted is that this spending underwrites the security of the entire liberal democratic world. The global shipping lanes that carry trade are patrolled by the US Navy, ensuring stable consumer prices worldwide.",
  defenseParagraph2: "The nuclear umbrella that allows Germany, Japan, South Korea, and dozens of others to spend just 1% to 2% of GDP on defense is an American subsidy to global stability. Europe's ability to fund generous social welfare states is contingent, in substantial part, on not having to pay for its own serious defense. American taxpayers have been quietly subsidizing the conditions for global prosperity since 1945.",
  defenseSource: "U.S. Department of Defense Comptroller",
  defenseSourceUrl: "https://comptroller.defense.gov/Budget-Materials/",
  oracleDescription: "Ask the AI Oracle about NATO Article 5 history, US defense budget allocations, shipping lane patrols, or transatlantic military spending."
};

const copyRo: NatoCopy = {
  breadcrumbParent: "Leadership Global",
  breadcrumbPage: "Alianța NATO",
  heroTagline: "SECURITATE ȘI PAX AMERICANA",
  heroTitle: "NATO: Scutul Lumii Democratice",
  heroSubtitle: "Cum au garantat pacea apărarea colectivă și umbrela de securitate americană, permițând prosperitatea globală din 1945.",
  thesisTitle: "Piatra de Temelie a Securității Transatlantice",
  thesisParagraph: "Înființată în 1949, Organizația Tratatului Atlanticului de Nord (NATO) reunește 32 de națiuni democratice suverane în apărarea reciprocă. În centrul său se află Articolul 5 — angajamentul că un atac împotriva unuia este un atac împotriva tuturor. Susținut de capacitatea militară a SUA și de umbrela sa nucleară, NATO a descurajat agresiunile externe timp de peste șapte decenii.",
  pillarsTitle: "Pilonii Cheie ai Alianței",
  pillars: [
    {
      title: "Angajamentul Articolului 5",
      description: "Promisiunea sacră a apărării colective. A fost invocat o singură dată în istorie: de către aliații europeni în sprijinul SUA, imediat după atacurile teroriste de la 11 septembrie.",
      badge: "Apărare Reciprocă"
    },
    {
      title: "Controlul Rutelor Maritime",
      description: "Marina SUA patrulează punctele maritime strâmte și rutele comerciale globale, garantând că mărfuri de trilioane de dolari circulă liber între continente fără riscuri de piraterie.",
      badge: "Securitate Maritimă"
    },
    {
      title: "Umbrela Nucleară",
      description: "O subvenție strategică ce protejează aliații non-nucleari (cum ar fi Germania, Italia și Japonia) de coerciție externă, eliminând necesitatea ca aceștia să își dezvolte propriul arsenal.",
      badge: "Descurajare"
    },
    {
      title: "Interoperabilitatea Aliaților",
      description: "Structurile de comandă unificate, echipamentele standardizate și exercițiile comune permit ca 32 de armate diferite să acționeze ca o singură forță coerentă.",
      badge: "Cooperare"
    }
  ],
  defenseLabel: "SUBVENȚIONAREA LUMII LIBERE",
  defenseTitle: "Pacea Americană (Pax Americana): Cine Plătește Pacea?",
  defenseParagraph1: "Bugetul de apărare al SUA de aproximativ 886 de miliarde de dolari în anul fiscal 2024 depășește cheltuielile militare cumulate ale tuturor celorlalți aliați NATO la un loc. Această cheltuială, adesea criticată ca fiind expansionistă, garantează securitatea întregii lumi democratice libere și patrularea rutelor prin care trec resursele comerciale.",
  defenseParagraph2: "Umbrela nucleară americană le permite Germaniei, Japoniei și Coreei de Sud să aloce doar 1-2% din PIB pentru apărare, beneficiind de stabilitatea mondială finanțată de SUA. Capacitatea Europei de a susține state sociale generoase este condiționată, în mare parte, de faptul că nu trebuie să își plătească propria apărare militară serioasă.",
  defenseSource: "Controlorul Bugetar al Departamentului de Apărare al SUA",
  defenseSourceUrl: "https://comptroller.defense.gov/Budget-Materials/",
  oracleDescription: "Întreabă Oracolul AI despre istoria Articolului 5 al NATO, alocările bugetului de apărare al SUA, patrulele maritime sau cheltuielile militare transatlantice."
};

export default async function NatoAlliancePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white font-body selection:bg-glory-gold selection:text-navy-dark">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: copy.breadcrumbParent, href: "/global-leadership" },
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
            <Shield className="h-24 w-24 text-glory-gold" />
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
                    {idx === 0 && <Shield className="h-5 w-5 text-white/35" />}
                    {idx === 1 && <Anchor className="h-5 w-5 text-white/35" />}
                    {idx === 2 && <Zap className="h-5 w-5 text-white/35" />}
                    {idx === 3 && <Globe className="h-5 w-5 text-white/35" />}
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

      {/* Pax Americana Underwriting Section */}
      <section
        id="defense-feature"
        className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 pb-16 bg-gradient-to-r from-navy-dark via-navy-mid to-navy-dark"
      >
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-navy-dark/60 backdrop-blur p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Coins className="h-40 w-40 text-glory-gold" />
          </div>
          
          <div className="relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-glory-gold mb-3 block">
              {copy.defenseLabel}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
              {copy.defenseTitle}
            </h2>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-6">
              {copy.defenseParagraph1}
            </p>
            <p className="font-body text-white/80 text-lg leading-relaxed mb-8">
              {copy.defenseParagraph2}
            </p>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40">
              <span>Source: {copy.defenseSource}</span>
              <a 
                href={copy.defenseSourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-glory-gold hover:underline"
              >
                {isRo ? "Detalii Buget DoD" : "DoD Budget Details"}
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
