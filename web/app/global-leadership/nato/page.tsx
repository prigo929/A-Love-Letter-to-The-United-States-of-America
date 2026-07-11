import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { Shield, Globe, Anchor, Zap, ExternalLink, Milestone, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "NATO Alliance & Transatlantic Shield | Global Leadership",
  description: "Explore the security foundations of the free world: NATO, Article 5, the defense of the Suwalki Gap, and Swedish/Finnish integration under the U.S. security umbrella.",
};

interface NatoCopy {
  breadcrumbParent: string;
  breadcrumbPage: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroStats: Array<{ value: string; label: string }>;
  trumanQuote: string;
  trumanQuoteAuthor: string;
  thesisTitle: string;
  thesisParagraph1: string;
  thesisParagraph2: string;
  pillarsTitle: string;
  pillars: Array<{
    title: string;
    description: string;
    badge: string;
  }>;
  expansionTitle: string;
  expansionParagraph1: string;
  expansionParagraph2: string;
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
  heroSubtitle: "How collective defense and the American security umbrella have guaranteed peace, integrated Allied forces, and enabled global prosperity since 1945.",
  heroStats: [
    { value: "32", label: "Member Nations" },
    { value: "1", label: "Time Article 5 Invoked" },
    { value: "$954B", label: "US Defense Budget (FY25)" },
    { value: "1949", label: "Alliance Founded" },
  ],
  trumanQuote: "In this pact, we hope to create a shield against aggression and the fear of aggression — a bulwark which will permit us to get on with the real business of government and society, the business of achieving a fuller and happier life for all our citizens.",
  trumanQuoteAuthor: "President Harry S. Truman, April 4, 1949",
  thesisTitle: "The Cornerstone of Transatlantic Security",
  thesisParagraph1: "Established in 1949 amidst the rise of the Soviet threat, the North Atlantic Treaty Organization (NATO) binds 32 sovereign democratic nations together in mutual defense. At its core is Article 5—the solemn commitment that an armed attack against one member is considered an attack against all. Underpinned by American military capability and the strategic nuclear umbrella, NATO has successfully deterred aggression and kept the peace in Europe for over seven decades.",
  thesisParagraph2: "Beyond deterring territorial expansion, the alliance functions as an integrated command structure. Standardized military protocols (STANAG), shared intelligence, and regular joint combat exercises ensure that 32 separate national forces can plug-and-play as a single, highly coordinated global defense force capable of protecting the Suwalki Gap and Allied borders.",
  pillarsTitle: "Key Pillars of the Transatlantic Shield",
  pillars: [
    {
      title: "Article 5 Collective Defense",
      description: "The commitment that an attack on one is an attack on all. Historically, it has been invoked only once: by European allies in support of the United States immediately following the September 11 attacks, leading to joint operations in Afghanistan.",
      badge: "Mutual Defense"
    },
    {
      title: "Global Sea Lanes Protection",
      description: "The US Navy, alongside allied naval fleets, patrolled maritime choke points and global trade routes, keeping the oceans open for civilian shipping and securing trillions in commerce.",
      badge: "Maritime Security"
    },
    {
      title: "The Strategic Nuclear Umbrella",
      description: "A deterrence subsidy that extends American nuclear capabilities to non-nuclear allies (like Germany, Italy, and Poland), discouraging regional proliferation and maintaining stability.",
      badge: "Deterrence"
    },
    {
      title: "Allied Interoperability",
      description: "From ammunition calibers and communication systems to logistics chains and command structures, NATO standardizes operations so diverse armies can fight as one.",
      badge: "Operational Union"
    }
  ],
  expansionTitle: "The Baltic Lake: Accession of Sweden & Finland",
  expansionParagraph1: "The accession of Finland (2023) and Sweden (2024) marked a historic geopolitical shift. Spurred by regional aggression, these militarily advanced nations abandoned decades of neutrality to seek shelter under the U.S. security umbrella. Their integration effectively transforms the Baltic Sea into a 'NATO Lake,' securing northern Europe and reinforcing the defense of the vulnerable Baltic States.",
  expansionParagraph2: "Finland adds a highly trained conscript army and a 830-mile border with the Russian Federation, while Sweden contributes a state-of-the-art navy, advanced submarine technology, and the strategic island of Gotland. This expansion secures the Arctic corridor and eliminates strategic gaps in the northeastern flank of the alliance.",
  defenseLabel: "UNDERWRITING THE FREE WORLD",
  defenseTitle: "Defense and the Pax Americana: Funding Global Stability",
  defenseParagraph1: "The US defense budget of approximately $954 billion in FY2025 exceeds the combined military spending of all other NATO allies. While critics sometimes characterize this footprint as expansionist, it is the fundamental underwriter of security for the liberal democratic world. The global shipping routes that sustain commercial cargo are secured by U.S. naval patrols, keeping shipping rates stable and ports open.",
  defenseParagraph2: "The security umbrella that allows Germany, Japan, South Korea, and others to dedicate their budgets to domestic welfare and industrial technological leadership is an American subsidy. By maintaining forward bases and high-readiness forces, American taxpayers have quietly financed the conditions required for modern global prosperity.",
  defenseSource: "U.S. Department of Defense Comptroller",
  defenseSourceUrl: "https://comptroller.defense.gov/Budget-Materials/",
  oracleDescription: "Ask the AI Oracle about NATO Article 5 history, Sweden and Finland's military contributions, the defense of the Baltic Sea, or transatlantic defense budgets."
};

const copyRo: NatoCopy = {
  breadcrumbParent: "Leadership Global",
  breadcrumbPage: "Alianța NATO",
  heroTagline: "SECURITATE ȘI PAX AMERICANA",
  heroTitle: "NATO: Scutul Lumii Democratice",
  heroSubtitle: "Cum au garantat pacea apărarea colectivă și umbrela de securitate americană, au integrat forțele aliate și au permis prosperitatea globală din 1945.",
  heroStats: [
    { value: "32", label: "Națiuni Membre" },
    { value: "1", label: "Invocări ale Articolului 5" },
    { value: "$954B", label: "Buget Apărare SUA (2025)" },
    { value: "1949", label: "Alianță Înființată" },
  ],
  trumanQuote: "Prin acest pact, sperăm să creăm un scut împotriva agresiunii și a temerii de agresiune — un bastion care ne va permite să ne continuăm activitatea reală de guvernare și societate, activitatea de a asigura o viață mai plină și mai fericită pentru toți cetățenii noștri.",
  trumanQuoteAuthor: "Președintele Harry S. Truman, 4 aprilie 1949",
  thesisTitle: "Piatra de Temelie a Securității Transatlantice",
  thesisParagraph1: "Înființată în 1949 în fața ascensiunii amenințării sovietice, Organizația Tratatului Atlanticului de Nord (NATO) reunește 32 de națiuni democratice suverane în apărarea reciprocă. În centrul său se află Articolul 5 — angajamentul solemn că un atac armat împotriva unui membru este considerat un atac împotriva tuturor. Susținut de capacitatea militară a SUA și de umbrela sa nucleară, NATO a descurajat agresiunile externe timp de peste șapte decenii.",
  thesisParagraph2: "Dincolo de descurajarea expansiunii teritoriale, alianța funcționează ca o structură de comandă integrată. Protocoalele militare standardizate (STANAG), schimbul de informații secrete și exercițiile de luptă regulate asigură că 32 de forțe naționale diferite pot coopera instantaneu ca o singură forță, capabilă să apere coridorul Suwalki și granițele aliate.",
  pillarsTitle: "Pilonii Cheie ai Scutului Transatlantic",
  pillars: [
    {
      title: "Apărarea Colectivă (Articolul 5)",
      description: "Angajamentul că un atac împotriva unui membru este un atac împotriva tuturor. A fost invocat o singură dată în istorie: de către aliații europeni în sprijinul SUA, imediat după atacurile teroriste de la 11 septembrie, ducând la operațiuni comune în Afganistan.",
      badge: "Apărare Reciprocă"
    },
    {
      title: "Protecția Rutelor Maritime Globale",
      description: "Marina SUA, alături de flotele aliate, patrulează strâmtorile și rutele comerciale globale, menținând oceanele deschise pentru navigația civilă și securizând trilioane de dolari în mărfuri.",
      badge: "Securitate Maritimă"
    },
    {
      title: "Umbrela Nucleară Strategică",
      description: "O subvenție de securitate care extinde capacitățile nucleare ale SUA asupra aliaților non-nucleari (cum ar fi Germania, Italia și Polonia), descurajând proliferarea și menținând stabilitatea.",
      badge: "Descurajare"
    },
    {
      title: "Interoperabilitatea Aliaților",
      description: "De la calibrele muniției și sistemele de comunicații la lanțurile logistice și structurile de comandă, NATO standardizează operațiunile pentru ca armate diverse să poată lupta ca una singură.",
      badge: "Uniune Operațională"
    }
  ],
  expansionTitle: "Lacul Baltic: Aderarea Suediei și Finlandei",
  expansionParagraph1: "Aderarea Finlandei (2023) și a Suediei (2024) a marcat o schimbare geopolitică istorică. Sub presiunea agresiunii regionale, aceste națiuni avansate din punct de vedere militar au abandonat neutralitatea pentru a căuta protecție sub umbrela de securitate a SUA. Integrarea lor transformă Marea Baltică într-un „lac NATO”, securizând nordul Europei.",
  expansionParagraph2: "Finlanda aduce o armată de rezervă foarte bine pregătită și o graniță de 1.340 de kilometri cu Federația Rusă, în timp ce Suedia contribuie cu o marină de ultimă generație, tehnologie avansată de submarine și insula strategică Gotland. Această expansiune securizează coridorul arctic.",
  defenseLabel: "SUBVENȚIONAREA LUMII LIBERE",
  defenseTitle: "Pacea Americană (Pax Americana): Cine Plătește Pacea?",
  defenseParagraph1: "Bugetul de apărare al SUA de aproximativ 954 de miliarde de dolari în anul fiscal 2025 depășește cheltuielile militare cumulate ale tuturor celorlalți aliați NATO la un loc. Deși unii critici descriu această prezență ca fiind expansionistă, ea garantează securitatea întregii lumi democratice libere. Rutele maritime globale care susțin comerțul sunt securizate de patrulele navale americane.",
  defenseParagraph2: "Umbrela de securitate care le permite Germaniei, Japoniei și Coreei de Sud să aloce resurse pentru programe sociale, educație și inovație tehnologică este o subvenție americană. Prin menținerea bazelor avansate, contribuabilii americani au finanțat condițiile necesare pentru prosperitatea globală modernă.",
  defenseSource: "Controlorul Bugetar al Departamentului de Apărare al SUA",
  defenseSourceUrl: "https://comptroller.defense.gov/Budget-Materials/",
  oracleDescription: "Întreabă Oracolul AI despre istoria Articolului 5 al NATO, contribuția militară a Suediei și Finlandei, apărarea Mării Baltice sau bugetele de apărare transatlantice."
};

export default async function NatoAlliancePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  const pillarIcons = [Shield, Anchor, Zap, Globe];

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

      {/* Editorial Quote - Big text, clean spacing */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32 py-12">
        <div className="max-w-4xl border-l-2 border-[#E8391B] pl-8">
          <p className="text-2xl md:text-3xl italic text-[#F5EDD8] leading-relaxed font-light">
            &ldquo;{copy.trumanQuote}&rdquo;
          </p>
          <span className="text-sm uppercase tracking-widest text-white/40 block mt-4 font-semibold">
            {copy.trumanQuoteAuthor}
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
            const Icon = pillarIcons[idx] ?? Shield;
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

      {/* Expansion Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-3 text-glory-gold mb-2">
            <Milestone className="h-6 w-6" />
            <span className="text-sm font-semibold tracking-widest uppercase">{isRo ? "GEOPOLITICĂ" : "GEOPOLITICS"}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {copy.expansionTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {copy.expansionParagraph1}
          </p>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
            {copy.expansionParagraph2}
          </p>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-[#E8391B] mb-2">
            <Sparkles className="h-6 w-6" />
            <span className="text-sm font-semibold tracking-widest uppercase">{copy.defenseLabel}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {copy.defenseTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-6">
            {copy.defenseParagraph1}
          </p>
          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-12">
            {copy.defenseParagraph2}
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <span>Source: {copy.defenseSource}</span>
            <a
              href={copy.defenseSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-glory-gold hover:underline font-semibold"
            >
              {isRo ? "Detalii Buget DoD" : "DoD Budget Details"}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
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
