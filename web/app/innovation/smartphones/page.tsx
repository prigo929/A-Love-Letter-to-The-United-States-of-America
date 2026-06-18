import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { Smartphone, ExternalLink, Cpu, ShoppingBag } from "lucide-react";
import {
  MacroStyles,
  MacroHero,
  CountUp,
  InfrastructureBand,
} from "@/components/economy/EconomyAnimations";

export const metadata: Metadata = {
  title: "Smartphones | Innovation & Technology",
  description:
    "How America invented the modern smartphone — from the iPhone's 2007 debut to the iOS/Android duopoly that runs 99% of all mobile devices on Earth.",
};

interface SmartphonesCopy {
  breadcrumbParent: string;
  breadcrumbPage: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  thesisTitle: string;
  thesisParagraph1: string;
  thesisParagraph2: string;
  milestonesTitle: string;
  milestones: Array<{ title: string; date: string; details: string }>;
  duopolyLabel: string;
  duopolyTitle: string;
  duopolyParagraph1: string;
  duopolyParagraph2: string;
  duopolySource: string;
  duopolySourceUrl: string;
  chipLabel: string;
  chipTitle: string;
  chipParagraph1: string;
  chipParagraph2: string;
  chipSpecs: Array<{ label: string; value: string; accent?: boolean }>;
  videosLabel: string;
  videosTitle: string;
  videoItems: Array<{ title: string; description: string; videoSrc: string; tag: string }>;
  appLabel: string;
  appTitle: string;
  appParagraph1: string;
  appParagraph2: string;
  appStats: Array<{ label: string; value: string; accent?: boolean }>;
  galleryLabel: string;
  galleryTitle: string;
  gallery: Array<{ tag: string; title: string; description: string; imageSrc: string }>;
  oracleDescription: string;
}

const copyEn: SmartphonesCopy = {
  breadcrumbParent: "Innovation & Technology",
  breadcrumbPage: "Smartphones",
  heroTagline: "MOBILE REVOLUTION",
  heroTitle: "Rewired\nHumanity",
  heroSubtitle:
    "How America invented the modern smartphone and now controls the operating systems running in every pocket on Earth.",
  thesisTitle: "America Holds Both Sides of the Mobile Duopoly",
  thesisParagraph1:
    "On January 9, 2007, Steve Jobs walked onto a stage in San Francisco and introduced the iPhone — describing it as \"an iPod, a phone, and an internet communicator.\" The audience laughed at the audacity. What followed was the single most consequential consumer product launch in human history. Within eighteen months, Apple had shipped the App Store and the mobile internet economy was born. A year after that, Google — headquartered seventeen miles away in Mountain View — released Android to the world.",
  thesisParagraph2:
    "The result is the most lopsided technology monopoly ever constructed: two American companies, born within a few years of each other in the same geographic corridor of California, now provide the operating system for 99.6% of all smartphones on Earth. Every app downloaded, every mobile transaction processed, every person navigating an unfamiliar city — all of it runs on a platform invented, designed, and controlled in the United States.",
  milestonesTitle: "The Chronology of Mobile",
  milestones: [
    {
      title: "The iPhone Launch",
      date: "2007",
      details:
        "Steve Jobs unveils the first iPhone at Macworld. The multi-touch screen, visual voicemail, and full Safari browser set standards every subsequent phone followed. It redefined what a phone could be.",
    },
    {
      title: "The App Store & Android",
      date: "2008",
      details:
        "Apple's App Store launches with 500 apps and creates an entirely new software economy. Within months, Google releases Android 1.0 — both American. Together, they establish a duopoly that has never been seriously challenged.",
    },
    {
      title: "64-Bit & Neural Engine",
      date: "2013 – 2017",
      details:
        "Apple's A7 introduces the world's first 64-bit mobile processor. By 2017, the iPhone X ships a dedicated Neural Engine — the first on-device AI accelerator in a consumer product — enabling Face ID and real-time ML inference.",
    },
    {
      title: "5G & AI-Native Mobile",
      date: "2020 – Present",
      details:
        "iPhone 12 accelerates the global 5G rollout. By 2024, Apple Intelligence and Google's Gemini Nano bring foundation models directly onto device silicon, completing the smartphone's evolution from communication tool to personal AI agent.",
    },
  ],
  duopolyLabel: "THE 99.6% LOCK",
  duopolyTitle: "The American Operating System Running Every Pocket on Earth",
  duopolyParagraph1:
    "The mobile operating system market is the most concentrated technology duopoly in history. iOS (Apple, Cupertino, California) and Android (Google, Mountain View, California) together account for 99.6% of all smartphone operating systems globally. No other technology platform — not search, not social media, not cloud — achieves this level of concentrated American control.",
  duopolyParagraph2:
    "Android's open-source licensing strategy proved especially decisive: by offering the OS free to any manufacturer, Google ensured that its platform, advertising, and app ecosystem would become the default infrastructure of global mobile computing. When a farmer in rural India opens a banking app, when a schoolchild in Lagos accesses Wikipedia, when a commuter in São Paulo hails a taxi — they are all running American software.",
  duopolySource: "StatCounter Global Stats",
  duopolySourceUrl: "https://gs.statcounter.com/os-market-share/mobile/worldwide/",
  chipLabel: "APPLE SILICON: THE PERFORMANCE CHOKEHOLD",
  chipTitle: "A-Series Chips: The World's Most Advanced Mobile Silicon",
  chipParagraph1:
    "Apple's in-house chip design team, operating out of Cupertino since 2010, has led mobile semiconductor performance benchmarks for over a decade without interruption. Every year the A-series chip releases, it sets a new record for mobile compute density, energy efficiency, and on-device AI inference that Android competitors take 18–24 months to approach.",
  chipParagraph2:
    "The A18 Pro chip powering the iPhone 16 Pro packs 16 billion transistors on a 3-nanometer node. Its 16-core Neural Engine executes 35 trillion operations per second, enabling real-time camera computational photography, on-device large language model inference, and augmented reality rendering — all simultaneously, without a network connection.",
  chipSpecs: [
    { label: "Process Node", value: "3nm (TSMC N3E)", accent: true },
    { label: "Transistor Count", value: "16 Billion" },
    { label: "CPU Cores", value: "6-Core (2P + 4E)" },
    { label: "GPU Cores", value: "6-Core" },
    { label: "Neural Engine", value: "16-Core NPU", accent: true },
    { label: "AI Performance", value: "35 TOPS" },
    { label: "Memory Bandwidth", value: "68.25 GB/s" },
    { label: "First 3nm Mobile", value: "iPhone 15 Pro, 2023" },
  ],
  videosLabel: "CINEMATIC MULTIMEDIA",
  videosTitle: "Apple's Product Vision in Motion",
  videoItems: [
    {
      title: "Introducing iPhone Air",
      description:
        "Apple's thinnest iPhone ever — the iPhone Air — redefines what a premium smartphone can feel like. At just 5.5mm, it achieves structural rigidity through a custom aluminum alloy and a new internal architecture, proving that thinness and performance are no longer in tension.",
      videoSrc: "/videos/library/Technology/Introducing iPhone Air | Apple.mp4",
      tag: "IPHONE AIR",
    },
    {
      title: "Design Is How It Works",
      description:
        "Apple's design philosophy, articulated in the voice of Jony Ive: that true design is not surface appearance but the way a product functions. This ethos — inherited from Steve Jobs — is the reason every iPhone generation resets the benchmark for the entire industry.",
      videoSrc: "/videos/library/Technology/Design is how it works | Apple.mp4",
      tag: "DESIGN PHILOSOPHY",
    },
  ],
  appLabel: "THE APP STORE ECONOMY",
  appTitle: "The Platform Economy That Apple Built",
  appParagraph1:
    "The App Store, launched in July 2008 with 500 applications, became the template for every digital marketplace that followed. Its 30% commission structure, curated review process, and developer SDK were all subsequently copied by Google Play, Steam, the PlayStation Store, and every major digital distribution platform on Earth. Apple invented the rules of how digital economies operate.",
  appParagraph2:
    "By 2025, the combined iOS and Google Play ecosystem facilitated over $1.2 trillion in developer billings and sales — an economic output comparable to a G20 nation's GDP. Apple alone has paid out over $350 billion to developers since inception. The App Store economy employs an estimated 2.4 million people in the United States alone.",
  appStats: [
    { label: "Combined App Economy", value: "$1.1T+", accent: true },
    { label: "Apple Developer Payouts (lifetime)", value: "$320B+" },
    { label: "Active App Store Apps", value: "1.8M+" },
    { label: "US Jobs Supported", value: "2.4M" },
    { label: "Daily Global Downloads", value: "500M+" },
    { label: "App Store Launch Year", value: "2008" },
  ],
  galleryLabel: "THE APPLE CAMPUS",
  galleryTitle: "Inside the World's Most Valuable Technology Company",
  gallery: [
    {
      tag: "Apple Park, 2017",
      title: "The Spaceship Campus",
      description:
        "Apple Park — completed in 2017 at a cost of $5 billion — is the 175-acre headquarters designed by Norman Foster. Its 2.8 million square foot main building houses over 12,000 employees and contains the Steve Jobs Theater, where every iPhone since the iPhone X has been announced.",
      imageSrc: "/images/library/Technology/Apple Cupertino headquarters from above.jpg",
    },
    {
      tag: "The Product Line",
      title: "iPhone, iPad, Mac — One Ecosystem",
      description:
        "Apple's hardware ecosystem is the most tightly integrated in consumer technology. The iPhone, iPad, MacBook, Apple Watch, and AirPods are all designed by the same team, run on in-house silicon, and share the same OS family — creating switching costs unmatched by any other platform.",
      imageSrc: "/images/library/Technology/Apple Products.jpg",
    },
    {
      tag: "Apple Inc., Cupertino",
      title: "Apple Headquarters",
      description:
        "Apple's original Infinite Loop campus in Cupertino, California — the address where Steve Jobs, Steve Wozniak, and Jony Ive developed the Mac, iPod, and iPhone. The company that started in a Cupertino garage in 1976 became the first company in history to reach a $1 trillion, then $2 trillion, then $3 trillion market capitalization.",
      imageSrc: "/images/library/Technology/Apple Headquarters.jpg",
    },
    {
      tag: "Hello Again",
      title: "The Device That Changed Everything",
      description:
        "The iPhone's \"Hello\" screen — carried across every generation since 2007 — is a deliberate homage to the original 1984 Macintosh's boot sequence. It is the most recognized product image in consumer technology history, symbolizing the moment America put a computer in every pocket on Earth.",
      imageSrc: "/images/library/Technology/iPhone saying Hello on wooden background.jpg",
    },
  ],
  oracleDescription:
    "Ask the AI Oracle about the iPhone's 2007 launch, Apple Silicon architecture, the App Store's $1T economy, iOS vs Android market share, or 5G modem patent royalties.",
};

const copyRo: SmartphonesCopy = {
  breadcrumbParent: "Inovație și Tehnologie",
  breadcrumbPage: "Smartphone-uri",
  heroTagline: "REVOLUȚIA MOBILĂ",
  heroTitle: "Recablând\nOmenirea",
  heroSubtitle:
    "Cum America a inventat smartphone-ul modern și controlează acum sistemele de operare din fiecare buzunar de pe Pământ.",
  thesisTitle: "America Deține Ambele Laturi ale Duopolului Mobil",
  thesisParagraph1:
    "Pe 9 ianuarie 2007, Steve Jobs a urcat pe o scenă din San Francisco și a prezentat iPhone-ul — descriindu-l drept un iPod, un telefon și un comunicator de internet. Publicul a râs de îndrăzneală. Ceea ce a urmat a fost cel mai important lansări de produs de consum din istoria omenirii. În mai puțin de optsprezece luni, Apple lansase și App Store-ul, iar economia internetului mobil se năștea. La un an distanță, Google — cu sediul la șaptesprezece mile mai încolo, în Mountain View — a lansat Android.",
  thesisParagraph2:
    "Rezultatul este cel mai asimetric monopol tehnologic construit vreodată: două companii americane, născute la câțiva ani distanță una de alta, în același coridor geografic din California, furnizează acum sistemul de operare pentru 99,6% din toate smartphone-urile de pe Pământ. Fiecare aplicație descărcată, fiecare tranzacție mobilă procesată, fiecare persoană care navighează printr-un oraș necunoscut — totul rulează pe o platformă inventată, proiectată și controlată în Statele Unite.",
  milestonesTitle: "Cronologia Revoluției Mobile",
  milestones: [
    {
      title: "Lansarea iPhone",
      date: "2007",
      details:
        "Steve Jobs prezintă primul iPhone la Macworld. Ecranul multi-touch, mesageria vocală vizuală și browserul Safari complet au stabilit standarde pe care fiecare telefon ulterior le-a urmat. A redefinit ce poate fi un telefon.",
    },
    {
      title: "App Store și Android",
      date: "2008",
      details:
        "App Store-ul Apple se lansează cu 500 de aplicații, creând o economie software complet nouă. La scurt timp, Google lansează Android 1.0 — ambele americane. Împreună, ele stabilesc un duopol care nu a fost niciodată serios contestat.",
    },
    {
      title: "64-Bit și Motor Neural",
      date: "2013 – 2017",
      details:
        "A7 de la Apple introduce primul procesor mobil pe 64 de biți din lume. Până în 2017, iPhone X lansează un Motor Neural dedicat — primul accelerator AI pe dispozitiv dintr-un produs de consum — permițând Face ID și inferență ML în timp real.",
    },
    {
      title: "5G și Mobile Nativ AI",
      date: "2020 – Prezent",
      details:
        "iPhone 12 accelerează implementarea globală a 5G. Până în 2024, Apple Intelligence și Gemini Nano de la Google aduc modele de bază direct pe siliciul dispozitivului, completând evoluția smartphone-ului de la instrument de comunicare la agent AI personal.",
    },
  ],
  duopolyLabel: "CONTROLUL DE 99,6%",
  duopolyTitle: "Sistemul de Operare American Care Rulează în Fiecare Buzunar de pe Pământ",
  duopolyParagraph1:
    "Piața sistemelor de operare mobile este cel mai concentrat duopol tehnologic din istorie. iOS (Apple, Cupertino, California) și Android (Google, Mountain View, California) reprezintă împreună 99,6% din toate sistemele de operare pentru smartphone-uri la nivel global. Nicio altă platformă tehnologică — nici căutarea, nici rețelele sociale, nici cloud-ul — nu atinge acest nivel de control american concentrat.",
  duopolyParagraph2:
    "Strategia de licențiere open-source a Android s-a dovedit mai ales decisivă: oferind sistemul de operare gratuit oricărui producător, Google s-a asigurat că platforma sa, publicitatea și ecosistemul de aplicații vor deveni infrastructura implicită a calculului mobil global. Când un fermier din India rurală deschide o aplicație bancară, când un elev din Lagos accesează Wikipedia, când un navetist din São Paulo solicită un taxi — toți rulează software american.",
  duopolySource: "StatCounter Global Stats",
  duopolySourceUrl: "https://gs.statcounter.com/os-market-share/mobile/worldwide/",
  chipLabel: "APPLE SILICON: CONTROLUL PERFORMANȚEI",
  chipTitle: "Cipurile din Seria A: Cel Mai Avansat Siliciu Mobil din Lume",
  chipParagraph1:
    "Echipa internă de proiectare a cipurilor Apple, operând din Cupertino din 2010, a condus benchmark-urile de performanță în semiconductori mobili timp de peste un deceniu fără întrerupere. În fiecare an, cipul din seria A stabilește un nou record pentru densitatea de calcul mobil, eficiența energetică și inferența AI pe dispozitiv, pe care concurenții Android le ating abia după 18–24 de luni.",
  chipParagraph2:
    "Cipul A18 Pro care alimentează iPhone 16 Pro conține 16 miliarde de tranzistori pe un nod de 3 nanometri. Motorul Neural cu 16 nuclee execută 35 de trilioane de operații pe secundă, permițând fotografie computațională în timp real, inferență de modele mari de limbaj pe dispozitiv și randare de realitate augmentată — toate simultan, fără conexiune la rețea.",
  chipSpecs: [
    { label: "Nod de Procesare", value: "3nm (TSMC N3E)", accent: true },
    { label: "Număr Tranzistori", value: "16 Miliarde" },
    { label: "Nuclee CPU", value: "6 Nuclee (2P + 4E)" },
    { label: "Nuclee GPU", value: "6 Nuclee" },
    { label: "Motor Neural", value: "16 Nuclee NPU", accent: true },
    { label: "Performanță AI", value: "35 TOPS" },
    { label: "Lățime de Bandă Memorie", value: "68,25 GB/s" },
    { label: "Primul 3nm Mobil", value: "iPhone 15 Pro, 2023" },
  ],
  videosLabel: "MULTIMEDIA CINEMATIC",
  videosTitle: "Viziunea de Produs Apple în Mișcare",
  videoItems: [
    {
      title: "Prezentare iPhone Air",
      description:
        "Cel mai subțire iPhone al Apple — iPhone Air — redefinește ce poate simți un smartphone premium. La doar 5,5mm grosime, atinge rigiditate structurală printr-un aliaj de aluminiu personalizat și o nouă arhitectură internă, dovedind că subțirimea și performanța nu mai sunt în tensiune.",
      videoSrc: "/videos/library/Technology/Introducing iPhone Air | Apple.mp4",
      tag: "IPHONE AIR",
    },
    {
      title: "Design-ul Este Modul în Care Funcționează",
      description:
        "Filosofia de design a Apple, articulată în vocea lui Jony Ive: că adevăratul design nu este aspectul de suprafață, ci modul în care funcționează un produs. Acest etos — moștenit de la Steve Jobs — este motivul pentru care fiecare generație iPhone resetează standardul de referință pentru întreaga industrie.",
      videoSrc: "/videos/library/Technology/Design is how it works | Apple.mp4",
      tag: "FILOSOFIE DE DESIGN",
    },
  ],
  appLabel: "ECONOMIA APP STORE",
  appTitle: "Economia de Platformă pe Care Apple a Construit-o",
  appParagraph1:
    "App Store, lansat în iulie 2008 cu 500 de aplicații, a devenit șablonul pentru fiecare piață digitală care a urmat. Comisionul său de 30%, procesul de revizuire curatoriat și SDK-ul pentru dezvoltatori au fost ulterior copiate de Google Play, Steam, PlayStation Store și fiecare platformă majoră de distribuție digitală de pe Pământ. Apple a inventat regulile după care funcționează economiile digitale.",
  appParagraph2:
    "Până în 2025, ecosistemul combinat iOS și Google Play a facilitat peste 1,2 trilioane de dolari în facturare și vânzări ale dezvoltatorilor — un output economic comparabil cu PIB-ul unui stat G20. Apple singur a plătit peste 350 de miliarde de dolari dezvoltatorilor de la înființare. Economia App Store susține un număr estimat de 2,4 milioane de locuri de muncă numai în Statele Unite.",
  appStats: [
    { label: "Economia Combinată a Aplicațiilor", value: "$1,1T+", accent: true },
    { label: "Plăți Apple către Dezvoltatori (total)", value: "$320 Mld.+" },
    { label: "Aplicații Active în App Store", value: "1,8M+" },
    { label: "Locuri de Muncă Susținute în SUA", value: "2,4M" },
    { label: "Descărcări Globale Zilnice", value: "500M+" },
    { label: "Anul Lansării App Store", value: "2008" },
  ],
  galleryLabel: "CAMPUSUL APPLE",
  galleryTitle: "Înăuntrul Celei Mai Valoroase Companii Tehnologice din Lume",
  gallery: [
    {
      tag: "Apple Park, 2017",
      title: "Campusul Navă Spațială",
      description:
        "Apple Park — finalizat în 2017 la costul de 5 miliarde de dolari — este cartierul general de 175 de acri proiectat de Norman Foster. Clădirea principală de 260.000 de metri pătrați găzduiește peste 12.000 de angajați și conține Steve Jobs Theater, unde a fost prezentat fiecare iPhone începând cu iPhone X.",
      imageSrc: "/images/library/Technology/Apple Cupertino headquarters from above.jpg",
    },
    {
      tag: "Linia de Produse",
      title: "iPhone, iPad, Mac — Un Ecosistem",
      description:
        "Ecosistemul hardware al Apple este cel mai integrat din tehnologia de consum. iPhone, iPad, MacBook, Apple Watch și AirPods sunt toate proiectate de aceeași echipă, rulează pe siliciu intern și partajează aceeași familie de sisteme de operare — creând costuri de schimbare fără egal.",
      imageSrc: "/images/library/Technology/Apple Products.jpg",
    },
    {
      tag: "Apple Inc., Cupertino",
      title: "Sediul Apple",
      description:
        "Campusul original Infinite Loop al Apple din Cupertino, California — adresa unde Steve Jobs, Steve Wozniak și Jony Ive au dezvoltat Mac, iPod și iPhone. Compania care a început într-un garaj din Cupertino în 1976 a devenit prima companie din istorie care a atins o capitalizare de 1, 2 și apoi 3 trilioane de dolari.",
      imageSrc: "/images/library/Technology/Apple Headquarters.jpg",
    },
    {
      tag: "Hello Din Nou",
      title: "Dispozitivul Care a Schimbat Totul",
      description:
        "Ecranul iPhone cu mesajul „Hello” — prezent în fiecare generație din 2007 — este un omagiu deliberat adus secvenței de pornire a Macintosh-ului din 1984. Este imaginea de produs cel mai recunoscută în istoria tehnologiei de consum, simbolizând momentul în care America a pus un calculator în fiecare buzunar de pe Pământ.",
      imageSrc: "/images/library/Technology/iPhone saying Hello on wooden background.jpg",
    },
  ],
  oracleDescription:
    "Întreabă Oracolul AI despre lansarea iPhone din 2007, arhitectura Apple Silicon, economia de 1 trilion de dolari a App Store, cota de piață iOS versus Android sau brevetele de modem 5G.",
};

export default async function SmartphonesPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <>
      <MacroStyles />

      {/* Cinematic Video Hero */}
      <MacroHero
        titleLead={copy.heroTitle}
        titleAccent={copy.heroTagline}
        eyebrow={copy.breadcrumbPage}
        description={copy.heroSubtitle}
        videoSrc="/videos/library/Technology/Introducing iPhone 17 Pro | Apple.mp4"
        imageSrc="/images/library/Technology/iPhone saying Hello on dark background.jpg"
        imageAlt="iPhone hello screen on dark background"
      />

      <div className="bg-[#000000] relative z-10 pb-32 pt-16 font-body text-white">
        {/* Breadcrumbs */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
          <Breadcrumb
            items={[
              { label: copy.breadcrumbParent, href: "/innovation" },
              { label: copy.breadcrumbPage },
            ]}
          />
        </div>

        {/* Thesis Section */}
        <section id="intro" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-32">
          <h2 className="font-macro-display text-3xl md:text-4xl font-bold text-[#E8B923] mb-10 max-w-3xl leading-tight">
            {copy.thesisTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
            <p className="font-macro-body text-white/75 text-lg leading-relaxed">
              {copy.thesisParagraph1}
            </p>
            <p className="font-macro-body text-white/75 text-lg leading-relaxed">
              {copy.thesisParagraph2}
            </p>
          </div>
        </section>

        {/* Key Stats */}
        <section className="py-24 border-t border-b border-white/5 bg-white/1 mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={99} suffix=".6%" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "CONTROL GLOBAL" : "GLOBAL CONTROL"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo
                    ? "Din toate smartphone-urile de pe Pământ rulează pe iOS sau Android — ambele născute în California"
                    : "Of all smartphones on Earth run iOS or Android — both born in California"}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  $<CountUp value={320} suffix="B+" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "PLĂȚI DEZVOLTATORI" : "DEVELOPER PAYOUTS"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo
                    ? "Plătite de Apple dezvoltatorilor de aplicații din întreaga lume de la lansarea App Store"
                    : "Paid by Apple to app developers worldwide since the App Store launched in 2008"}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  $<CountUp value={3.5} suffix="T" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "CAPITALIZARE APPLE" : "APPLE MARKET CAP"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo
                    ? "Apple este cea mai valoroasă companie publică din istoria omenirii, construită pe iPhone"
                    : "Apple is the most valuable public company in human history — built on the iPhone"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section id="milestones" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="font-macro-display text-4xl font-bold text-center mb-16 text-white uppercase tracking-tight">
            {copy.milestonesTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {copy.milestones.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/5 bg-white/2 p-8 flex flex-col justify-between hover:border-[#E8B923]/40 hover:bg-white/4 transition-all duration-500 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-white/35">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-macro-display text-2xl font-bold text-white mb-4 group-hover:text-[#E8B923] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-body">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* iOS/Android Duopoly Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5">
          <span className="macro-eyebrow mb-3 block">{copy.duopolyLabel}</span>
          <h2 className="macro-section-title text-white mb-6">{copy.duopolyTitle}</h2>
          <p className="macro-body text-white/80 mb-6 max-w-4xl">{copy.duopolyParagraph1}</p>
          <p className="macro-body text-white/80 mb-8 max-w-4xl">{copy.duopolyParagraph2}</p>
          <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40 font-mono">
            <span>Source: {copy.duopolySource}</span>
            <a
              href={copy.duopolySourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#E8B923] hover:underline"
            >
              {isRo ? "Verifică datele" : "Verify Data"}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>

        {/* Apple Silicon Section — 2-col spec panel (mirrors GPS section in Space page) */}
        <section id="apple-silicon" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-32">
          <div className="border-t border-white/5 pt-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] font-semibold mb-3 flex items-center gap-2">
              <Cpu className="h-4 w-4 text-[#E8B923]" />
              {copy.chipLabel}
            </span>
            <h2 className="font-macro-display text-4xl font-bold text-white uppercase tracking-tight mb-8">
              {copy.chipTitle}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="font-macro-body text-white/80 text-lg leading-relaxed mb-6">
                  {copy.chipParagraph1}
                </p>
                <p className="font-macro-body text-white/80 text-lg leading-relaxed">
                  {copy.chipParagraph2}
                </p>
              </div>

              {/* A18 Pro Spec Grid */}
              <div className="bg-white/1 rounded-3xl border border-white/5 p-8 flex flex-col justify-center">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-semibold mb-6">
                  {isRo ? "SPECIFICAȚII APPLE A18 PRO" : "APPLE A18 PRO SPECIFICATIONS"}
                </p>
                <div className="grid grid-cols-2 gap-5 font-body">
                  {copy.chipSpecs.map((spec) => (
                    <div key={spec.label} className="flex flex-col gap-1">
                      <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">
                        {spec.label}
                      </span>
                      <span
                        className={`font-bold text-lg ${spec.accent ? "text-[#E8B923]" : "text-white"}`}
                      >
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cinematic Video Showcase (mirrors Space page video section) */}
        <section
          id="apple-videos"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32 border-t border-white/5 pt-24"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-6 font-semibold">
            {copy.videosLabel}
          </p>
          <h2 className="font-macro-display text-4xl font-bold text-center mb-16 text-white uppercase tracking-tight">
            {copy.videosTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {copy.videoItems.map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/2 flex flex-col hover:border-[#E8B923]/30 transition-all duration-500"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  >
                    <source src={item.videoSrc} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-linear-to-t from-[#000000] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] font-mono text-[#E8B923] bg-black/60 backdrop-blur-sm border border-[#E8B923]/25 px-2.5 py-0.5 rounded uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between bg-black/20">
                  <div>
                    <h3 className="font-macro-display text-2xl font-bold text-white mb-4 group-hover:text-[#E8B923] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed font-body">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* App Store Economy Section — 2-col spec panel (mirrors Artemis section in Space page) */}
        <section id="app-economy" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-32">
          <div className="border-t border-white/5 pt-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] font-semibold mb-3 flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-[#E8B923]" />
              {copy.appLabel}
            </span>
            <h2 className="font-macro-display text-4xl font-bold text-white uppercase tracking-tight mb-8">
              {copy.appTitle}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="font-macro-body text-white/80 text-lg leading-relaxed mb-6">
                  {copy.appParagraph1}
                </p>
                <p className="font-macro-body text-white/80 text-lg leading-relaxed">
                  {copy.appParagraph2}
                </p>
              </div>

              {/* App Economy Stats Grid */}
              <div className="bg-white/1 rounded-3xl border border-white/5 p-8 flex flex-col justify-center">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-semibold mb-6">
                  {isRo ? "CIFRE CHEIE" : "KEY FIGURES"}
                </p>
                <div className="grid grid-cols-2 gap-5 font-body">
                  {copy.appStats.map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1">
                      <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">
                        {stat.label}
                      </span>
                      <span
                        className={`font-bold text-xl ${stat.accent ? "text-[#E8B923]" : "text-white"}`}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apple Campus Gallery (mirrors Apollo Legacy gallery in Space page) */}
        <section id="apple-campus" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-32">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-6 font-semibold">
            {copy.galleryLabel}
          </p>
          <h2 className="font-macro-display text-4xl font-bold text-center mb-16 text-white uppercase tracking-tight">
            {copy.galleryTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {copy.gallery.map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/2 flex flex-col hover:border-[#E8B923]/30 transition-all duration-500"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#000000] via-transparent to-transparent" />
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between bg-black/20">
                  <div>
                    <span className="text-xs font-mono text-[#E8B923] uppercase tracking-wider mb-2 block">
                      {item.tag}
                    </span>
                    <h3 className="font-macro-display text-2xl font-bold text-white mb-3 group-hover:text-[#E8B923] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed font-body">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Ask America Oracle */}
        <div className="mt-32">
          <AskAmericaCTA
            locale={locale}
            descriptionEn={copyEn.oracleDescription}
            descriptionRo={copyRo.oracleDescription}
          />
        </div>
      </div>
    </>
  );
}
