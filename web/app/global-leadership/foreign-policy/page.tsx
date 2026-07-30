import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { Landmark, Heart, ShieldAlert, Award, Sparkles, BookOpen, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "American Foreign Policy | Global Leadership",
  description: "Explore the doctrines, diplomacy, and alliances that define American global influence, from the Monroe Doctrine to modern foreign policy.",
};

interface ForeignPolicyCopy {
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
  hadrTitle: string;
  hadrParagraph1: string;
  hadrParagraph2: string;
  softPowerTitle: string;
  softPowerParagraph1: string;
  softPowerParagraph2: string;
  doctrineTitle: string;
  doctrineParagraph1: string;
  doctrineParagraph2: string;
  oracleDescription: string;
}

const copyEn: ForeignPolicyCopy = {
  breadcrumbParent: "Global Leadership",
  breadcrumbPage: "Foreign Policy",
  heroTagline: "DIPLOMACY & GLOBAL INFLUENCE",
  heroTitle: "Foreign Policy: Guiding the Free World",
  heroSubtitle: "The evolution of American diplomatic power, foreign aid, and strategic doctrines that shaped global alliances and protected democratic values.",
  heroStats: [
    { value: "190+", label: "Embassies & Consulates" },
    { value: "$70B+", label: "Annual Development Aid" },
    { value: "1823", label: "Monroe Doctrine" },
    { value: "1947", label: "Truman Doctrine" },
  ],
  washingtonQuote: "It is our true policy to steer clear of permanent alliances with any portion of the foreign world.",
  washingtonQuoteAuthor: "President George Washington, Farewell Address, 1796",
  thesisTitle: "The Evolution of Global Engagement",
  thesisParagraph1: "American foreign policy has evolved from George Washington's advice of avoiding 'entangling alliances' to a posture of active, global leadership. During the twentieth century, faced with the threats of totalitarianism, the United States developed key doctrines and diplomatic frameworks (like the Marshall Plan and containment) to support sovereign democratic nations and maintain international law.",
  thesisParagraph2: "This posture balances realism, protecting strategic trade corridors and resource flows, with idealism, which advocates for human rights, self-determination, and democratic governance worldwide. Today, U.S. diplomats operate a massive network of embassies to manage conflicts, negotiate trade agreements, and coordinate humanitarian response.",
  pillarsTitle: "Core Foundations of US Foreign Policy",
  pillars: [
    {
      title: "Democratic Sovereignty",
      description: "Supporting free peoples resisting subjugation by armed minorities or external pressures, establishing the baseline of modern collective security.",
      badge: "The Truman Doctrine"
    },
    {
      title: "Rebuilding & Partnership",
      description: "The Marshall Plan's legacy of donating billions to rebuild war-torn European economies, converting former adversaries into stable, prosperous democratic allies.",
      badge: "Economic Diplomacy"
    },
    {
      title: "Global Humanitarian Aid",
      description: "Leading international development and emergency relief through USAID, combating poverty, building infrastructure, and eradicating pandemics globally.",
      badge: "Development Assistance"
    },
    {
      title: "Alliance Architectures",
      description: "Operating a vast diplomatic network to coordinate global policies, manage regional conflicts, and secure strategic supply chains.",
      badge: "Strategic Alliances"
    }
  ],
  hadrTitle: "Disaster Relief: The World's First Responder",
  hadrParagraph1: "A unique and critical element of U.S. foreign outreach is Humanitarian Aid and Disaster Relief (HADR). The United States military, particularly the U.S. Navy and Marine Corps, acts as the world's primary rapid-response humanitarian force. In the wake of catastrophic earthquakes, tsunamis, or typhoons (such as the 2004 Indian Ocean tsunami or the 2011 Japanese earthquake), U.S. carrier strike groups deploy immediately to deliver clean water, medical aid, and search-and-rescue services.",
  hadrParagraph2: "Working alongside USAID, U.S. forces deploy heavy-lift helicopters and floating hospitals (like the USNS Mercy) to remote disaster zones long before civilian agencies can mobilize. This unique logistical capability saves thousands of lives annually and demonstrates America's commitment to protecting human life regardless of borders.",
  softPowerTitle: "Soft Power: Peace Corps & Fulbright Program",
  softPowerParagraph1: "Diplomacy is not conducted solely through state departments and treaty signings; it is built on human connections. Established in 1961 by President John F. Kennedy, the Peace Corps has sent over 240,000 American volunteers to serve in 140 countries, working in education, agriculture, and community health to build grassroots friendships.",
  softPowerParagraph2: "Similarly, the Fulbright Program, established in 1946 under Senator J. William Fulbright, has sponsored over 400,000 students, scholars, and teachers to conduct international exchanges. By building mutual understanding, these soft power initiatives export American ideals and build a global network of shared cultural values.",
  doctrineTitle: "From Isolation to Indispensability",
  doctrineParagraph1: "For its first century, the United States focused on territorial growth, using the Monroe Doctrine of 1823 to warn European empires against colonial interference in the Western Hemisphere. However, the world wars of the twentieth century demonstrated that American security is inextricably linked to global stability, turning the US into the 'indispensable nation' of the free world.",
  doctrineParagraph2: "During the Cold War, this expanded into the Carter Doctrine (pledging military force to defend the Persian Gulf) and the Reagan Doctrine (providing assistance to anti-communist movements). Today, American foreign policy continues to balance traditional alliances with emerging cyber security, space diplomacy, and supply chain resilience.",
  oracleDescription: "Ask the AI Oracle about the Marshall Plan, the Monroe Doctrine, the Truman Doctrine, the Peace Corps, or U.S. military disaster relief (HADR) operations."
};

const copyRo: ForeignPolicyCopy = {
  breadcrumbParent: "Leadership Global",
  breadcrumbPage: "Politică Externă",
  heroTagline: "DIPLOMAȚIE ȘI INFLUENȚĂ GLOBALĂ",
  heroTitle: "Politică Externă: Ghidarea Lumii Libere",
  heroSubtitle: "Evoluția puterii diplomatice americane, a ajutorului extern și a doctrinelor strategice care au modelat alianțele globale și au protejat democrația.",
  heroStats: [
    { value: "190+", label: "Ambasade & Consulate" },
    { value: "$70B+", label: "Ajutor Anual Dezvoltare" },
    { value: "1823", label: "Doctrina Monroe" },
    { value: "1947", label: "Doctrina Truman" },
  ],
  washingtonQuote: "Este politica noastră adevărată de a ne ține la distanță de alianțele permanente cu orice parte a lumii externe.",
  washingtonQuoteAuthor: "Președintele George Washington, Discursul de Adio, 1796",
  thesisTitle: "Evoluția Angajamentului Global",
  thesisParagraph1: "Politică externă a SUA a evoluat de la recomandarea lui George Washington de a evita „alianțele încurcate” la o postură de leadership global activ. În timpul secolului al XX-lea, confruntate cu amenințarea totalitarismului, Statele Unite au dezvoltat doctrine cheie și cadre diplomatice (cum ar fi Planul Marshall) pentru a sprijini națiunile democratice suverane.",
  thesisParagraph2: "Această postură echilibrează realismul (protejarea coridoarelor comerciale strategice) cu idealismul, care promovează drepturile omului și guvernarea democratică. Astăzi, diplomații americani operează o rețea uriașă de ambasade.",
  pillarsTitle: "Fundațiile Cheie ale Politicii Externe a SUA",
  pillars: [
    {
      title: "Suveranitatea Democratică",
      description: "Sprijinirea popoarelor libere care rezistă încercărilor de subjugare de către minorități înarmate sau presiuni externe.",
      badge: "Doctrina Truman"
    },
    {
      title: "Reconstrucție & Parteneriat",
      description: "Moștenirea Planului Marshall de a dona miliarde pentru reconstrucția economiilor europene devastate, transformând foștii inamici în aliați stabili.",
      badge: "Diplomație Economică"
    },
    {
      title: "Ajutor Umanitar Global",
      description: "Conducerea asistenței internaționale prin USAID, combaterea sărăciei, construirea de infrastructură și eradicarea pandemiilor.",
      badge: "Asistență pentru Dezvoltare"
    },
    {
      title: "Arhitectura Alianțelor",
      description: "Operarea unei rețele diplomatice vaste pentru coordonarea politicilor, gestionarea conflictelor regionale și securizarea lanțurilor de aprovizionare.",
      badge: "Alianțe Strategice"
    }
  ],
  hadrTitle: "Asistență în Caz de Dezastru: Primul Răspuns al Lumii",
  hadrParagraph1: "Un element esențial al prezenței externe a SUA este Asistența Umanitară și în Caz de Dezastru (HADR). Armata SUA, în special Marina și Corpul de Infanterie Marină, acționează ca prima forță globală de răspuns umanitar rapid. În urma cutremurelor sau tsunami-urilor devastatoare (cum ar fi tsunami-ul din Oceanul Indian din 2004), grupurile navale intervin imediat.",
  hadrParagraph2: "Colaborând cu USAID, forțele americane trimit elicoptere de transport și spitale plutitoare (precum USNS Mercy) în zonele afectate de dezastre, mult înainte ca agențiile civile să se poată mobiliza. Această capacitate logistică unică salvează mii de vieți anual.",
  softPowerTitle: "Puterea Blândă: Corpul Păcii și Programul Fulbright",
  softPowerParagraph1: "Diplomația nu se desfășoară doar prin semnarea de tratate; se construiește pe conexiuni umane. Înființat în 1961 de președintele John F. Kennedy, Corpul Păcii a trimis peste 240.000 de voluntari americani în 140 de țări, lucrând în educație, agricultură și sănătate.",
  softPowerParagraph2: "De asemenea, Programul Fulbright, înființat în 1946 sub senatorul J. William Fulbright, a sponsorizat peste 400.000 de studenți, cercetători și profesori în schimburi internaționale, promovând înțelegerea reciprocă.",
  doctrineTitle: "De la Izolare la Rolul Indispensabil",
  doctrineParagraph1: "În primul său secol, Statele Unite s-au concentrat pe creșterea internă, folosind Doctrina Monroe din 1823 pentru a avertiza imperiile europene împotriva interferențelor coloniale. Cu toate acestea, războaiele mondiale au demonstrat că securitatea americană este legată de stabilitatea globală, transformând SUA în națiunea indispensabilă a lumii libere.",
  doctrineParagraph2: "În timpul Războiului Rece, aceasta s-a extins în Doctrina Carter (apărarea Golfului Persic) și Doctrina Reagan (sprijinirea mișcărilor anticomuniste). Astăzi, politica externă a SUA echilibrează alianțele tradiționale cu securitatea cibernetică și diplomația spațială.",
  oracleDescription: "Întreabă Oracolul AI despre Planul Marshall, Doctrina Monroe, Doctrina Truman, Corpul Păcii sau misiunile militare de asistență umanitară (HADR) ale SUA."
};

export default async function ForeignPolicyPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  const pillarIcons = [ShieldAlert, Award, Heart, Landmark];

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
            const Icon = pillarIcons[idx] ?? Landmark;
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

      {/* Humanitarian HADR Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-3 text-glory-gold mb-2">
            <Activity className="h-6 w-6" />
            <span className="text-sm font-semibold tracking-widest uppercase">{isRo ? "ASISTENȚĂ UMANITARĂ" : "HUMANITARIAN ASSISTANCE"}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {copy.hadrTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {copy.hadrParagraph1}
          </p>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {copy.hadrParagraph2}
          </p>
        </div>
      </section>

      {/* Soft Power Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-3 text-glory-gold mb-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-sm font-semibold tracking-widest uppercase">{isRo ? "PUTERE BLÂNDĂ" : "SOFT POWER"}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {copy.softPowerTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {copy.softPowerParagraph1}
          </p>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {copy.softPowerParagraph2}
          </p>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-[#E8391B] mb-2">
            <Sparkles className="h-6 w-6" />
            <span className="text-sm font-semibold tracking-widest uppercase">{isRo ? "DOCTRINE ISTORICE" : "HISTORIC DOCTRINES"}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {copy.doctrineTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-6">
            {copy.doctrineParagraph1}
          </p>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-12">
            {copy.doctrineParagraph2}
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
