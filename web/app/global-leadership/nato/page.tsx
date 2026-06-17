import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { HistoryStyles } from "@/components/history/HistoryStyles";
import { Shield, Globe, Anchor, Zap, ExternalLink } from "lucide-react";

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
  heroStats: Array<{ value: string; label: string }>;
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
  heroStats: [
    { value: "32", label: "Member Nations" },
    { value: "1", label: "Time Article 5 Invoked" },
    { value: "$954B", label: "US Defense Budget (FY25)" },
    { value: "1949", label: "Alliance Founded" },
  ],
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
  defenseParagraph1: "The US defense budget of approximately $954 billion in FY2025 exceeds the combined military spending of all other NATO allies. This is frequently cited by critics as evidence of American imperialism — but what is omitted is that this spending underwrites the security of the entire liberal democratic world. The global shipping lanes that carry trade are patrolled by the US Navy, ensuring stable consumer prices worldwide.",
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
  heroStats: [
    { value: "32", label: "Națiuni Membre" },
    { value: "1", label: "Invocări ale Articolului 5" },
    { value: "$954B", label: "Buget Apărare SUA (2025)" },
    { value: "1949", label: "Alianță Înființată" },
  ],
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
  defenseParagraph1: "Bugetul de apărare al SUA de aproximativ 954 de miliarde de dolari în anul fiscal 2025 depășește cheltuielile militare cumulate ale tuturor celorlalți aliați NATO la un loc. Această cheltuială, adesea criticată ca fiind expansionistă, garantează securitatea întregii lumi democratice libere și patrularea rutelor prin care trec resursele comerciale.",
  defenseParagraph2: "Umbrela nucleară americană le permite Germaniei, Japoniei și Coreei de Sud să aloce doar 1-2% din PIB pentru apărare, beneficiind de stabilitatea mondială finanțată de SUA. Capacitatea Europei de a susține state sociale generoase este condiționată, în mare parte, de faptul că nu trebuie să își plătească propria apărare militară serioasă.",
  defenseSource: "Controlorul Bugetar al Departamentului de Apărare al SUA",
  defenseSourceUrl: "https://comptroller.defense.gov/Budget-Materials/",
  oracleDescription: "Întreabă Oracolul AI despre istoria Articolului 5 al NATO, alocările bugetului de apărare al SUA, patrulele maritime sau cheltuielile militare transatlantice."
};

export default async function NatoAlliancePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  const pillarIcons = [Shield, Anchor, Zap, Globe];

  return (
    <main className="history-classified-bg min-h-screen pt-24 font-body selection:bg-glory-gold selection:text-navy-dark">
      <HistoryStyles />

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

      {/* Hero — editorial */}
      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="history-bureaucratic block mb-5">{copy.heroTagline}</span>
          <h1 className="history-serif-title max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05]">
            {copy.heroTitle}
          </h1>
          <p className="history-serif-body mt-6 max-w-2xl text-lg">{copy.heroSubtitle}</p>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/5 sm:grid-cols-4">
            {copy.heroStats.map((s, i) => (
              <div key={i} className="bg-navy-dark p-5">
                <div className="font-display text-3xl font-bold text-glory-gold">{s.value}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thesis — editorial */}
      <section className="border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="history-serif-title text-2xl sm:text-3xl font-bold text-white border-b border-white/10 pb-4 mb-6">
            {copy.thesisTitle}
          </h2>
          <p className="history-serif-body text-lg">{copy.thesisParagraph}</p>
        </div>
      </section>

      {/* Pillars — editorial border-top cards */}
      <section className="border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="history-serif-title text-3xl font-bold text-white mb-12">{copy.pillarsTitle}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {copy.pillars.map((item, idx) => {
              const Icon = pillarIcons[idx] ?? Shield;
              return (
                <div key={idx} className="border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="h-5 w-5 text-glory-gold" />
                    <span className="history-bureaucratic">{item.badge}</span>
                  </div>
                  <h3 className="history-serif-title text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed font-body">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pax Americana — editorial */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <span className="history-bureaucratic block mb-3">{copy.defenseLabel}</span>
          <h2 className="history-serif-title text-3xl sm:text-4xl font-bold text-white mb-6">{copy.defenseTitle}</h2>
          <p className="history-serif-body text-lg mb-6">{copy.defenseParagraph1}</p>
          <p className="history-serif-body text-lg mb-8">{copy.defenseParagraph2}</p>
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
      </section>

      <AskAmericaCTA
        locale={locale}
        descriptionEn={copyEn.oracleDescription}
        descriptionRo={copyRo.oracleDescription}
      />
    </main>
  );
}
