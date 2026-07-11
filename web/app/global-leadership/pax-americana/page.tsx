import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { Compass, Ship, Network, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Pax Americana & Global Bases | Global Leadership",
  description: "Explore the global security footprint of the United States — 750+ bases, 11 carrier strike groups, and maritime trade security.",
};

interface PaxAmericanaCopy {
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
  reachTitle: string;
  reachParagraph1: string;
  reachParagraph2: string;
  oracleDescription: string;
}

const copyEn: PaxAmericanaCopy = {
  breadcrumbParent: "Global Leadership",
  breadcrumbPage: "Pax Americana",
  heroTagline: "THE AMERICAN PEACE",
  heroTitle: "Pax Americana: Underwriting Global Stability",
  heroSubtitle: "How a global network of bases, carrier strike groups, and naval patrols underwrite international commerce and deter aggression.",
  heroStats: [
    { value: "750+", label: "Military Bases" },
    { value: "11", label: "Carrier Strike Groups" },
    { value: "80+", label: "Host Nations" },
    { value: "75+ Yrs", label: "The Long Peace" },
  ],
  thesisTitle: "The Security Foundation of Global Commerce",
  thesisParagraph: "Since the end of World War II, the world has experienced the 'Long Peace' — a period devoid of direct military conflict between major nuclear powers. This stability is anchored by Pax Americana: the global security footprint of the United States. Through forward-deployed forces and mutual defense alliances, America has discouraged territorial expansion and underwritten the security of the free world.",
  pillarsTitle: "Pillars of Global Power Projection",
  pillars: [
    {
      title: "Global Base Footprint",
      description: "Operating over 750 installations in approximately 80 sovereign nations, providing logistics, radar surveillance, and rapid crisis response capabilities.",
      badge: "Forward Presence"
    },
    {
      title: "Carrier Strike Groups",
      description: "Projecting sovereign power across the global commons. America's 11 nuclear-powered supercarriers serve as floating airfields ready to deploy anywhere.",
      badge: "Power Projection"
    },
    {
      title: "Freedom of the Seas",
      description: "Patrolling maritime choke points (like the Straits of Malacca and the Suez Canal), ensuring container ships can navigate safely without piracy or blockade.",
      badge: "Maritime Security"
    },
    {
      title: "Intercontinental Alliances",
      description: "Binding treaty alliances spanning the Atlantic and Pacific, creating a unified deterrent network that prevents regional wars.",
      badge: "Treaty Shield"
    }
  ],
  reachTitle: "Deterrence and the Cost of Peace",
  reachParagraph1: "Pax Americana is not merely about military supremacy; it is the physical infrastructure that underwrites the global economy. By securing sea lanes and air corridors, the US military ensures that international trade, capital flows, and communication cables remain unmolested. This stability benefits all trading nations, keeping global commodity prices stable.",
  reachParagraph2: "Maintaining this network requires significant resource allocations, financed directly by the American taxpayer. This global security subsidy has enabled allies to focus their national resources on domestic welfare and technological growth, consolidating a shared era of unprecedented prosperity.",
  oracleDescription: "Ask the AI Oracle about the location of US military bases, the role of carrier strike groups, naval shipping lane security, or the concept of Pax Americana."
};

const copyRo: PaxAmericanaCopy = {
  breadcrumbParent: "Leadership Global",
  breadcrumbPage: "Pax Americana",
  heroTagline: "PACEA AMERICANĂ",
  heroTitle: "Pax Americana: Garantarea Stabilității Globale",
  heroSubtitle: "Cum garantează o rețea globală de baze militare, grupuri de portavioane și patrule navale comerțul internațional și descurajarea agresiunilor.",
  heroStats: [
    { value: "750+", label: "Baze Militare" },
    { value: "11", label: "Grupuri de Portavioane" },
    { value: "80+", label: "Țări Gazdă" },
    { value: "75+ Ani", label: "Pacea Lungă" },
  ],
  thesisTitle: "Fundația de Securitate a Comerțului Global",
  thesisParagraph: "De la sfârșitul celui de-al Doilea Război Mondial, omenirea a experimentat „Pacea Lungă” — o perioadă lipsită de conflicte militare directe între marile puteri nucleare. Această stabilitate este ancorată în Pax Americana: prezența de securitate globală a Statelor Unite. Prin forțe dislocate avansat și alianțe de apărare reciprocă, America a descurajat expansiunea teritorială.",
  pillarsTitle: "Pilonii Proiecției de Putere Globale",
  pillars: [
    {
      title: "Prezența Bazelor Globale",
      description: "Operarea a peste 750 de instalații în aproximativ 80 de țări suverane, asigurând logistică, supraveghere radar și capacități de răspuns rapid la crize.",
      badge: "Prezență Avansată"
    },
    {
      title: "Grupuri de Portavioane",
      description: "Proiectarea puterii suverane. Cele 11 super-portavioane cu propulsie nucleară ale Americii funcționează ca aeroporturi plutitoare pregătite de acțiune.",
      badge: "Proiecție de Putere"
    },
    {
      title: "Libertatea Mărilor",
      description: "Patrularea punctelor maritime strâmte comerciale, garantând că navele de containere pot naviga în siguranță, fără riscuri de blocadă sau piraterie.",
      badge: "Securitate Maritimă"
    },
    {
      title: "Alianțe Intercontinentale",
      description: "Pacte de alianță care acoperă Atlanticul și Pacificul, creând o rețea de descurajare unificată care previne războaiele regionale.",
      badge: "Scut de Tratate"
    }
  ],
  reachTitle: "Descurajarea și Costul Păcii",
  reachParagraph1: "Pax Americana nu înseamnă doar supremație militară; este infrastructura fizică ce susține economia globală. Asigurând rutele maritime și coridoarele aeriene, armata SUA garantează că fluxurile comerciale, de capital și cablurile de comunicații rămân protejate, stabilizând prețurile globale.",
  reachParagraph2: "Menținerea acestei rețele necesită alocări substanțiale de resurse, finanțate direct de contribuabilul american. Această subvenție globală de securitate le-a permis aliaților să își concentreze resursele naționale pe programe sociale și dezvoltare tehnologică, consolidând o eră de prosperitate comună.",
  oracleDescription: "Întreabă Oracolul AI despre locațiile bazelor militare americane, rolul grupurilor de portavioane, securitatea navigației sau conceptul Pax Americana."
};

export default async function PaxAmericanaPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  const pillarIcons = [Compass, Ship, Network, ShieldCheck];

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 text-white font-sans selection:bg-glory-gold selection:text-black">
      {/* Breadcrumbs with spacious margin */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
        <Breadcrumb
          items={[
            { label: copy.breadcrumbParent, href: "/global-leadership" },
            { label: copy.breadcrumbPage },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
        <span className="text-xs font-semibold tracking-widest text-[#E8B923] uppercase block mb-4">
          {copy.heroTagline}
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-5xl leading-tight">
          {copy.heroTitle}
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl">
          {copy.heroSubtitle}
        </p>

        {/* Large Stats - No borders or boxes, just clean spacing */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {copy.heroStats.map((s, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-6xl md:text-7xl font-bold text-glory-gold tracking-tight">{s.value}</span>
              <span className="text-xs uppercase tracking-widest text-white/40 font-semibold mt-3">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Thesis Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {copy.thesisTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {copy.thesisParagraph}
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">{copy.pillarsTitle}</h2>
        <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
          {copy.pillars.map((item, idx) => {
            const Icon = pillarIcons[idx] ?? Compass;
            return (
              <div key={idx} className="flex flex-col items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-glory-gold mb-6">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-semibold tracking-widest text-[#E8B923] uppercase mb-2">{item.badge}</span>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-light">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Editorial Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {copy.reachTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-6">
            {copy.reachParagraph1}
          </p>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-12">
            {copy.reachParagraph2}
          </p>
        </div>
      </section>

      <div className="mt-16">
        <AskAmericaCTA
          locale={locale}
          descriptionEn={copyEn.oracleDescription}
          descriptionRo={copyRo.oracleDescription}
        />
      </div>
    </main>
  );
}
