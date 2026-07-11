import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { Compass, Ship, Network, ShieldCheck, Sparkles, Navigation } from "lucide-react";

export const metadata: Metadata = {
  title: "Pax Americana & Global Bases | Global Leadership",
  description: "Explore the global security footprint of the United States — 750+ bases, 11 carrier strike groups, and the GPS network that powers global navigation.",
};

interface PaxAmericanaCopy {
  breadcrumbParent: string;
  breadcrumbPage: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroStats: Array<{ value: string; label: string }>;
  washingtonQuote: string;
  washingtonQuoteAuthor: string;
  thesisTitle: string;
  thesisParagraph1: string;
  thesisParagraph2: string;
  pillarsTitle: string;
  pillars: Array<{
    title: string;
    description: string;
    badge: string;
  }>;
  gpsTitle: string;
  gpsParagraph1: string;
  gpsParagraph2: string;
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
  heroSubtitle: "How a global network of bases, carrier strike groups, and satellite systems underwrite international commerce and deter aggression.",
  heroStats: [
    { value: "750+", label: "Military Bases" },
    { value: "11", label: "Carrier Strike Groups" },
    { value: "80+", label: "Host Nations" },
    { value: "75+ Yrs", label: "The Long Peace" },
  ],
  washingtonQuote: "To be prepared for war is one of the most effectual means of preserving peace.",
  washingtonQuoteAuthor: "President George Washington, January 8, 1790",
  thesisTitle: "The Security Foundation of Global Commerce",
  thesisParagraph1: "Since the end of World War II, the world has experienced the 'Long Peace' — a period devoid of direct military conflict between major nuclear powers. This stability is anchored by Pax Americana: the global security footprint of the United States. Through forward-deployed forces, naval patrols, and mutual defense alliances, America has discouraged territorial expansion and underwritten the security of the free world.",
  thesisParagraph2: "This protection extends across key geographical deterrence zones: the Indo-Pacific corridor, the Mediterranean Sea, and the Arabian Gulf. By maintaining high-readiness forces at strategic transit bottlenecks, the U.S. deters regional aggression, preventing localized disputes from escalating into catastrophic global conflicts.",
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
  gpsTitle: "The GPS Network: A Free Global Subsidy",
  gpsParagraph1: "Beyond physical presence, Pax Americana underwrites the digital infrastructure of modern logistics. The Global Positioning System (GPS)—a constellation of over 30 satellites launched, maintained, and operated by the United States Space Force—is provided entirely free of charge to the entire world. It handles the navigation data for every commercial aircraft, container vessel, and smartphone application on Earth.",
  gpsParagraph2: "By operating this space-based utility without licensing fees or blockades, the United States provides a continuous global subsidy that drives trillions of dollars in economic efficiency, safety, and technological innovation across all industries.",
  reachTitle: "Deterrence and the Cost of Peace",
  reachParagraph1: "Pax Americana is not merely about military supremacy; it is the physical infrastructure that underwrites the global economy. By securing sea lanes, air corridors, and undersea fiber-optic communication cables, the US military ensures that international trade, capital flows, and communication lines remain unmolested. This stability benefits all trading nations, keeping global commodity prices stable.",
  reachParagraph2: "Maintaining this network requires significant resource allocations, financed directly by the American taxpayer. This global security subsidy has enabled allies to focus their national budgets on domestic welfare, education, and technological growth, consolidating a shared era of unprecedented prosperity.",
  oracleDescription: "Ask the AI Oracle about the location of US military bases, the role of carrier strike groups, the GPS satellite network, or the concept of Pax Americana."
};

const copyRo: PaxAmericanaCopy = {
  breadcrumbParent: "Leadership Global",
  breadcrumbPage: "Pax Americana",
  heroTagline: "PACEA AMERICANĂ",
  heroTitle: "Pax Americana: Garantarea Stabilității Globale",
  heroSubtitle: "Cum garantează o rețea globală de baze militare, grupuri de portavioane și sisteme satelitare comerțul internațional și descurajarea agresiunilor.",
  heroStats: [
    { value: "750+", label: "Baze Militare" },
    { value: "11", label: "Grupuri de Portavioane" },
    { value: "80+", label: "Țări Gazdă" },
    { value: "75+ Ani", label: "Pacea Lungă" },
  ],
  washingtonQuote: "Pregătirea pentru război este unul dintre cele mai eficiente mijloace de a păstra pacea.",
  washingtonQuoteAuthor: "Președintele George Washington, 8 ianuarie 1790",
  thesisTitle: "Fundația de Securitate a Comerțului Global",
  thesisParagraph1: "De la sfârșitul celui de-al Doilea Război Mondial, omenirea a experimentat „Pacea Lungă” — o perioadă lipsită de conflicte militare directe între marile puteri nucleare. Această stabilitate este ancorată în Pax Americana: prezența de securitate globală a Statelor Unite. Prin forțe dislocate avansat și alianțe de apărare reciprocă, America a descurajat expansiunea teritorială.",
  thesisParagraph2: "Această protecție se extinde în zone cheie de descurajare: coridorul Indo-Pacific, Marea Mediterană și Golful Arabic. Menținând forțe pregătite în puncte maritime de tranzit strategice, SUA previn escaladarea disputelor în conflicte globale.",
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
  gpsTitle: "Rețeaua GPS: O Subvenție Globală Gratuită",
  gpsParagraph1: "Dincolo de prezența fizică, Pax Americana susține infrastructura digitală a logisticii moderne. Sistemul de Poziționare Globală (GPS)—o constelație de peste 30 de sateliți lansați, întreținuți și operați de Forța Spațială a Statelor Unite—este pus la dispoziție în mod gratuit pentru întreaga lume.",
  gpsParagraph2: "Prin operarea acestui serviciu satelitar fără taxe de licențiere, Statele Unite oferă o subvenție globală continuă care stimulează eficiența economică, siguranța și inovația tehnologică în toate industriile lumii.",
  reachTitle: "Descurajarea și Costul Păcii",
  reachParagraph1: "Pax Americana nu înseamnă doar supremație militară; este infrastructura fizică ce susține economia globală. Asigurând rutele maritime, coridoarele aeriene și cablurile de fibră optică submarine, armata SUA garantează că fluxurile comerciale și de comunicații rămân protejate, stabilizând prețurile globale.",
  reachParagraph2: "Menținerea acestei rețele necesită alocări substanțiale de resurse, finanțate direct de contribuabilul american. Această subvenție globală de securitate le-a permis aliaților să își concentreze resursele naționale pe programe sociale, educație și dezvoltare tehnologică.",
  oracleDescription: "Întreabă Oracolul AI despre locațiile bazelor militare americane, rolul grupurilor de portavioane, rețeaua GPS sau conceptul Pax Americana."
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

      {/* Editorial Quote */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32 py-12">
        <div className="max-w-4xl border-l-2 border-[#E8391B] pl-8">
          <p className="text-2xl md:text-3xl italic text-[#F5EDD8] leading-relaxed font-light">
            &ldquo;{copy.washingtonQuote}&rdquo;
          </p>
          <span className="text-sm uppercase tracking-widest text-white/40 block mt-4 font-semibold">
            {copy.washingtonQuoteAuthor}
          </span>
        </div>
      </section>

      {/* Thesis Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {copy.thesisTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {copy.thesisParagraph1}
          </p>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {copy.thesisParagraph2}
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

      {/* GPS Network Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-3 text-glory-gold mb-2">
            <Navigation className="h-6 w-6" />
            <span className="text-sm font-semibold tracking-widest uppercase">{isRo ? "INFRASTRUCTURĂ SPAȚIALĂ" : "SPACE INFRASTRUCTURE"}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {copy.gpsTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {copy.gpsParagraph1}
          </p>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {copy.gpsParagraph2}
          </p>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-[#E8391B] mb-2">
            <Sparkles className="h-6 w-6" />
            <span className="text-sm font-semibold tracking-widest uppercase">{isRo ? "COSTURILE APĂRĂRII" : "THE PRICE OF DEFENSE"}</span>
          </div>
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
