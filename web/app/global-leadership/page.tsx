import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import Link from "next/link";
import { Shield, Globe, Compass, Landmark, ArrowRight, Sparkles, Landmark as DollarIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Global Leadership | Patriotic USA",
  description: "Explore how the United States underwrites the security of the free world, patrols the global commons, and funds international stability.",
};

interface LeadershipSection {
  id: string;
  href: string;
  titleEn: string;
  titleRo: string;
  descEn: string;
  descRo: string;
  badgeEn: string;
  badgeRo: string;
  icon: typeof Shield;
}

const sections: LeadershipSection[] = [
  {
    id: "nato",
    href: "/global-leadership/nato",
    titleEn: "NATO Alliance",
    titleRo: "Alianța NATO",
    descEn: "Explore the collective defense pact of 32 sovereign democratic nations, underpinned by the American security umbrella and the strategic nuclear shield.",
    descRo: "Explorează pactul de apărare colectivă al celor 32 de națiuni democratice suverane, susținut de umbrela de securitate americană.",
    badgeEn: "Collective Security",
    badgeRo: "Securitate Colectivă",
    icon: Shield,
  },
  {
    id: "un",
    href: "/global-leadership/un",
    titleEn: "UN & World Order",
    titleRo: "ONU și Ordinea Mondială",
    descEn: "How American leadership designed, built, and funded the multilateral institutions like the UN, IMF, and World Bank to secure global peace and stability.",
    descRo: "Cum a proiectat, construit și finanțat leadershipul american instituțiile multilaterale precum ONU, FMI și Banca Mondială.",
    badgeEn: "Multilateral Order",
    badgeRo: "Ordine Multilaterală",
    icon: Globe,
  },
  {
    id: "pax-americana",
    href: "/global-leadership/pax-americana",
    titleEn: "Pax Americana",
    titleRo: "Pax Americana",
    descEn: "Detailing the military reach, 750+ bases, 11 carrier strike groups, and the U.S. Space Force's GPS satellite network that underwrites global transport.",
    descRo: "Prezentarea prezenței militare globale, a celor peste 750 de baze și a rețelei GPS oferite gratuit ca utilitate globală.",
    badgeEn: "Global Stability",
    badgeRo: "Stabilitate Globală",
    icon: Compass,
  },
  {
    id: "foreign-policy",
    href: "/global-leadership/foreign-policy",
    titleEn: "Foreign Policy",
    titleRo: "Politică Externă",
    descEn: "Trace the evolution of American diplomacy, foreign development aid, and historical doctrines from the Monroe Doctrine to modern soft power.",
    descRo: "Urmărește evoluția diplomației americane, a ajutorului extern și a doctrinelor istorice de la Doctrina Monroe la soft power.",
    badgeEn: "Diplomatic Strategy",
    badgeRo: "Strategie Diplomatică",
    icon: Landmark,
  },
];

export default async function GlobalLeadershipPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const breadcrumb = isRo ? "Leadership Global" : "Global Leadership";
  const heroTagline = isRo ? "NAȚIUNEA INDISPENSABILĂ" : "THE INDISPENSABLE NATION";
  const heroTitle = isRo ? "Leadership Global: Garanțiile Libertății" : "Global Leadership: Guarantees of Liberty";
  const heroSubtitle = isRo
    ? "Cum garantează Statele Unite securitatea lumii libere, patrulează spațiile comune globale și finanțează stabilitatea internațională."
    : "How the United States underwrites the security of the free world, patrols the global commons, and funds international stability.";

  const heroStats = [
    { value: "32", label: isRo ? "Aliați NATO Conduși" : "NATO Allies Led" },
    { value: "750+", label: isRo ? "Baze Militare Globale" : "Global Military Bases" },
    { value: "$954B", label: isRo ? "Buget Anual de Apărare" : "Annual Defense Budget" },
    { value: "57%", label: isRo ? "Rezerve Valutare în USD" : "FX Reserves in USD" },
  ];

  const fdrQuote = isRo
    ? "În zilele viitoare, pe care căutăm să le asigurăm, așteptăm cu nerăbdare o lume întemeiată pe patru libertăți umane esențiale: libertatea de exprimare, libertatea de cult, libertatea de a trăi ferit de lipsuri și libertatea de a trăi fără frică."
    : "In the future days, which we seek to make secure, we look forward to a world founded upon four essential human freedoms: freedom of speech, freedom of worship, freedom from want, and freedom from fear.";
  const fdrQuoteAuthor = isRo
    ? "Președintele Franklin D. Roosevelt, Discursul celor Patru Libertăți, 6 ianuarie 1941"
    : "President Franklin D. Roosevelt, Four Freedoms Address, January 6, 1941";

  const thesisTitle = isRo ? "Garantul Sistemului Internațional" : "The Guarantor of the International System";
  const thesisParagraph1 = isRo
    ? "După al Doilea Război Mondial, Statele Unite au făcut o alegere istorică: abandonarea izolaționismului în favoarea construirii unei rețele cuprinzătoare de securitate globală, diplomație și sprijin financiar. Această paradigmă, denumită adesea Pax Americana, a asigurat cea mai lungă perioadă din istoria modernă fără conflicte directe între marile puteri militare."
    : "Following World War II, the United States made a historic choice: to abandon its traditional peacetime isolationism and construct a comprehensive network of global security guarantees, diplomatic institutions, and financial aid. This paradigm, often referred to as Pax Americana, has maintained the longest period in modern history without direct combat between major military powers.";

  const thesisParagraph2 = isRo
    ? "Prin finanțarea a peste o cincime din bugetul Organizației Națiunilor Unite, patrularea oceanelor lumii pentru siguranța comerțului comercial și operarea constelației de sateliți GPS ca utilitate gratuită, Statele Unite subvenționează pilonii esențiali ai civilizației și economiei moderne globale. Această implicare activă previne formarea de viduri de putere geopolitică pe care regimurile autoritare le-ar putea specula."
    : "By financing over a fifth of the United Nations budget, patrolling the world's oceans to keep commercial cargo safe from piracy, and operating the GPS satellite constellation as a free public utility, the United States continues to underwrite the vital architecture of modern global civilization. This active engagement prevents geopolitical power vacuums that authoritarian regimes could exploit.";

  const dollarTitle = isRo ? "Temelia Financiară: Dolarul ca Valută de Rezervă" : "The Financial Bedrock: The Dollar as Global Reserve";
  const dollarParagraph1 = isRo
    ? "Stabilitatea sistemului comercial internațional se bazează pe o monedă de schimb unică și de încredere. Stabilit de acordurile de la Bretton Woods în 1944, dolarul american (USD) servește ca principală monedă de rezervă a lumii, reprezentând aproximativ 57% din rezervele valutare globale și fiind utilizat în peste 85% din tranzacțiile valutare internaționale."
    : "The stability of the international trading system relies on a single, trusted medium of exchange. Established by the Bretton Woods agreements in 1944, the United States dollar (USD) serves as the world's primary reserve currency, accounting for roughly 57% of global foreign exchange reserves and participating in over 85% of international currency transactions.";

  const dollarParagraph2 = isRo
    ? "Această hegemonie financiară este susținută de lichiditatea de neegalat a piețelor de capital din SUA, de soliditatea legilor de proprietate americane și de stabilitatea sa politică. Oferind o valută stabilă și universal acceptată, Statele Unite elimină riscul valutar pentru comercianții de pe glob, stimulând globalizarea și creșterea economică internațională."
    : "This financial hegemony is backed by the unmatched liquidity of U.S. capital markets, the strength of American property laws, and political stability. By providing a stable, universally accepted currency, the United States eliminates foreign exchange risk for merchants worldwide, driving globalization and international economic growth.";

  const selectSectionLabel = isRo ? "Alege un domeniu pentru a explora" : "Select a domain to explore";

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 text-white font-sans selection:bg-glory-gold selection:text-black">
      {/* Breadcrumbs with spacious margin */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
        <Breadcrumb items={[{ label: breadcrumb }]} />
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
        <span className="text-xs font-semibold tracking-widest text-[#E8B923] uppercase block mb-4">
          {heroTagline}
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-5xl leading-tight">
          {heroTitle}
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl">
          {heroSubtitle}
        </p>

        {/* Large Stats - No borders or boxes, just clean spacing */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {heroStats.map((s, i) => (
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
            &ldquo;{fdrQuote}&rdquo;
          </p>
          <span className="text-sm uppercase tracking-widest text-white/40 block mt-4 font-semibold">
            {fdrQuoteAuthor}
          </span>
        </div>
      </section>

      {/* Thesis Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {thesisTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {thesisParagraph1}
          </p>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {thesisParagraph2}
          </p>
        </div>
      </section>

      {/* The Global Dollar Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-3 text-glory-gold mb-2">
            <DollarIcon className="h-6 w-6" />
            <span className="text-sm font-semibold tracking-widest uppercase">{isRo ? "GEOPOLITICĂ FINANCIARĂ" : "FINANCIAL GEOPOLITICS"}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {dollarTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {dollarParagraph1}
          </p>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {dollarParagraph2}
          </p>
        </div>
      </section>

      {/* Categories / Links Section - Spacious and borderless */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <div className="flex items-center gap-3 text-[#E8391B] mb-8">
          <Sparkles className="h-6 w-6" />
          <span className="text-sm font-semibold tracking-widest uppercase">{selectSectionLabel}</span>
        </div>
        
        <div className="grid gap-16 md:grid-cols-2">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div key={sec.id} className="flex flex-col items-start group">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-glory-gold mb-6 group-hover:bg-[#E8B923]/10 transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-semibold tracking-widest text-[#E8B923] uppercase mb-2">
                  {isRo ? sec.badgeRo : sec.badgeEn}
                </span>
                <Link href={sec.href} className="inline-flex items-center gap-2 group-hover:text-glory-gold transition-colors">
                  <h3 className="text-3xl font-bold text-white group-hover:text-[#E8B923] transition-colors">
                    {isRo ? sec.titleRo : sec.titleEn}
                  </h3>
                  <ArrowRight className="h-6 w-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-glory-gold" />
                </Link>
                <p className="text-base text-white/50 leading-relaxed font-light mt-4 max-w-lg">
                  {isRo ? sec.descRo : sec.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-16">
        <AskAmericaCTA
          locale={locale}
          descriptionEn="Ask the AI Oracle about NATO military guarantees, the U.S. dollar as reserve asset, American soft power export, or multilateral institutions."
          descriptionRo="Întreabă Oracolul AI despre garanțiile militare NATO, dolarul american ca activ de rezervă, exportul de soft power sau instituțiile multilaterale."
        />
      </div>
    </main>
  );
}
