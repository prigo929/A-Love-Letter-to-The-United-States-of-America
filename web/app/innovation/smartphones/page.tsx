import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { Smartphone, Globe, TrendingUp, Layers, Cpu } from "lucide-react";

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
  appEconomyLabel: string;
  appEconomyTitle: string;
  appEconomyParagraph1: string;
  appEconomyParagraph2: string;
  platformsTitle: string;
  platformsSubtitle: string;
  platforms: Array<{
    name: string;
    founded: string;
    marketShare: string;
    role: string;
    contribution: string;
  }>;
  oracleDescription: string;
}

const copyEn: SmartphonesCopy = {
  breadcrumbParent: "Innovation & Technology",
  breadcrumbPage: "Smartphones",
  heroTagline: "THE MOBILE REVOLUTION",
  heroTitle: "The Device That\nRewired Humanity",
  heroSubtitle:
    "How America invented the modern smartphone and now controls the operating systems running in every pocket on Earth.",
  thesisTitle: "America Holds Both Sides of the Mobile Duopoly",
  thesisParagraph1:
    "On January 9, 2007, Steve Jobs walked onto a stage in San Francisco and introduced the iPhone — describing it as \"an iPod, a phone, and an internet communicator.\" The audience laughed at the audacity. What followed was the single most consequential consumer product launch in human history. Within eighteen months, Apple had also shipped the App Store, and the mobile internet economy was born. A year after that, Google — headquartered seventeen miles away in Mountain View — released Android to the world.",
  thesisParagraph2:
    "The result is the most lopsided technology monopoly ever constructed: two American companies, born within a few years of each other in the same geographic corridor of California, now provide the operating system for 99.6% of all smartphones on Earth. Every app downloaded, every mobile transaction processed, every person navigating an unfamiliar city — all of it runs on a platform invented, designed, and controlled in the United States.",
  milestonesTitle: "The Chronology of Mobile",
  milestones: [
    {
      title: "The iPhone Launch",
      date: "2007",
      details:
        "Steve Jobs unveils the first iPhone at Macworld, combining a phone, an iPod, and an internet communicator into a single device. The multi-touch capacitive screen, visual voicemail, and Safari browser set standards that every subsequent phone followed.",
    },
    {
      title: "The App Store Opens",
      date: "2008",
      details:
        "Apple launches the App Store with 500 applications. It creates an entirely new software economy: developers could now build and monetize apps to a global audience, generating what would grow into a $2T+ cumulative ecosystem.",
    },
    {
      title: "Android Goes Open Source",
      date: "2008",
      details:
        "Google releases Android 1.0 on the HTC Dream (T-Mobile G1). By making the OS open-source and licensing it freely to manufacturers, Google ensured that American mobile software would power virtually every non-Apple smartphone ever built.",
    },
    {
      title: "The Retina Display & FaceTime",
      date: "2010",
      details:
        "iPhone 4 debuts the Retina Display (326 ppi) and FaceTime video calling. The screen density became the new industry benchmark; FaceTime normalized video communication years before it became a global necessity.",
    },
    {
      title: "64-Bit Mobile Computing",
      date: "2013",
      details:
        "The iPhone 5s introduces Apple's A7 chip — the world's first 64-bit processor in a consumer smartphone. This architectural leap doubled computational throughput and laid the groundwork for on-device AI and augmented reality experiences.",
    },
    {
      title: "The Post-PC Era Solidified",
      date: "2017",
      details:
        "iPhone X marks the tenth anniversary with Face ID, an OLED Super Retina display, and the neural engine enabling real-time machine learning. Smartphone penetration surpasses the PC by more than 3:1, confirming mobile as humanity's primary computing platform.",
    },
    {
      title: "5G & the Next Frontier",
      date: "2020",
      details:
        "iPhone 12 becomes the first 5G iPhone, accelerating the global rollout of fifth-generation wireless networks. American chipmakers — Qualcomm, Apple Silicon — design the modems and baseband processors powering nearly all 5G devices worldwide.",
    },
    {
      title: "AI-Native Smartphones",
      date: "2024+",
      details:
        "Apple Intelligence and Google's Gemini Nano bring large language models directly onto device silicon. The smartphone has evolved from communication tool to personal AI agent — and once again the architecture, silicon, and software are designed in America.",
    },
  ],
  duopolyLabel: "THE 99.6% LOCK",
  duopolyTitle: "The American Operating System That Runs Every Pocket on Earth",
  duopolyParagraph1:
    "The mobile operating system market is the most concentrated technology duopoly in history. iOS (Apple, Cupertino, California) and Android (Google, Mountain View, California) together account for 99.6% of all smartphone operating systems globally. No other consumer technology platform — not search, not social media, not streaming — achieves this level of concentrated American control.",
  duopolyParagraph2:
    "Android's open-source licensing strategy proved especially decisive: by offering the OS free to manufacturers from Samsung to Xiaomi, Google ensured that its platform — and its advertising, services, and app ecosystem — would become the default infrastructure of global mobile computing. When a farmer in rural India opens a banking app, when a schoolchild in Lagos accesses Wikipedia, when a shopper in São Paulo hails a taxi — they are all running American software.",
  duopolySource: "StatCounter Global Stats",
  duopolySourceUrl: "https://gs.statcounter.com/os-market-share/mobile/worldwide/",
  appEconomyLabel: "THE APP STORE ECONOMY",
  appEconomyTitle: "The Platform Economy That Apple Built",
  appEconomyParagraph1:
    "The App Store, launched in July 2008 with 500 applications, has become one of the most economically significant platforms in history. By 2024, the combined iOS and Google Play ecosystem facilitated over $1.1 trillion in developer billings and sales — an economic output comparable to a G20 nation. Apple alone has paid out over $320 billion to developers since the App Store's inception.",
  appEconomyParagraph2:
    "The platform model Apple pioneered with the App Store became the template for every digital marketplace that followed: the App Store's 30% commission structure, its curated review process, and its trust-and-safety architecture were all copied by Google Play, Steam, the PlayStation Store, and every major digital distribution platform. Apple did not just build a store — it invented the rules of how digital economies operate.",
  platformsTitle: "The Two Platforms That Run the World",
  platformsSubtitle:
    "Both operating systems powering 99.6% of global smartphones were conceived, engineered, and are headquartered in the same 20-mile corridor of Northern California.",
  platforms: [
    {
      name: "Apple iOS",
      founded: "2007 | Cupertino, CA",
      marketShare: "~28% Global",
      role: "Premium Mobile Ecosystem",
      contribution:
        "iOS powers approximately 28% of global smartphones but generates over 65% of global mobile app revenue. The iPhone's vertical integration — owning chip design (Apple Silicon), OS (iOS), and distribution (App Store) — gives Apple the highest-margin consumer hardware business in history and a $3.5T market cap.",
    },
    {
      name: "Google Android",
      founded: "2008 | Mountain View, CA",
      marketShare: "~72% Global",
      role: "Open-Source Global Infrastructure",
      contribution:
        "Android powers approximately 72% of all smartphones globally — roughly 3.3 billion active devices. By licensing it freely, Google ensured its services (Search, Maps, Gmail, YouTube, Play Store) become the default on billions of devices, generating over $150B in annual mobile advertising revenue.",
    },
    {
      name: "Apple Silicon (A-Series)",
      founded: "2010 | Cupertino, CA",
      marketShare: "World's fastest mobile chips",
      role: "Mobile Chip Architecture Leader",
      contribution:
        "Apple's in-house A-series chips have led mobile semiconductor performance benchmarks for over a decade. The A17 Pro and A18 chips feature 6-core CPUs, 6-core GPUs, and a 16-core Neural Engine capable of 35+ trillion operations per second — enabling on-device AI inference that no Android competitor has matched.",
    },
    {
      name: "Qualcomm Snapdragon",
      founded: "1985 | San Diego, CA",
      marketShare: "~65% Android premium",
      role: "Mobile Modem & SoC Monopoly",
      contribution:
        "Qualcomm, headquartered in San Diego, California, designs the Snapdragon system-on-chip that powers the majority of premium Android smartphones worldwide, including Samsung Galaxy, Google Pixel, and OnePlus. Its CDMA and 5G modem patents create a royalty stream from virtually every cellular device sold on Earth.",
    },
  ],
  oracleDescription:
    "Ask the AI Oracle about the iPhone's original 2007 launch, the App Store economy, Apple Silicon architecture, 5G modem patents, or the iOS vs Android market share dynamics.",
};

const copyRo: SmartphonesCopy = {
  breadcrumbParent: "Inovație și Tehnologie",
  breadcrumbPage: "Smartphone-uri",
  heroTagline: "REVOLUȚIA MOBILĂ",
  heroTitle: "Dispozitivul Care\na Recablat Omenirea",
  heroSubtitle:
    "Cum America a inventat smartphone-ul modern și controlează acum sistemele de operare din fiecare buzunar de pe Pământ.",
  thesisTitle: "America Deține Ambele Laturi ale Duopolului Mobil",
  thesisParagraph1:
    "Pe 9 ianuarie 2007, Steve Jobs a urcat pe o scenă din San Francisco și a prezentat iPhone-ul — descriindu-l drept „un iPod, un telefon și un comunicator de internet.\" Publicul a râs de îndrăzneală. Ceea ce a urmat a fost cel mai important lansări de produs de consum din istoria omenirii. În mai puțin de optsprezece luni, Apple lansase și App Store-ul, iar economia internetului mobil se năștea. La un an distanță, Google — cu sediul la șaptesprezece mile mai încolo, în Mountain View — a lansat Android.",
  thesisParagraph2:
    "Rezultatul este cel mai asimetric monopol tehnologic construit vreodată: două companii americane, născute la câțiva ani distanță una de alta, în același coridor geografic din California, furnizează acum sistemul de operare pentru 99,6% din toate smartphone-urile de pe Pământ. Fiecare aplicație descărcată, fiecare tranzacție mobilă procesată, fiecare persoană care navighează printr-un oraș necunoscut — totul rulează pe o platformă inventată, proiectată și controlată în Statele Unite.",
  milestonesTitle: "Cronologia Revoluției Mobile",
  milestones: [
    {
      title: "Lansarea iPhone",
      date: "2007",
      details:
        "Steve Jobs prezintă primul iPhone la Macworld, combinând un telefon, un iPod și un comunicator de internet într-un singur dispozitiv. Ecranul capacitiv multi-touch, mesageria vocală vizuală și browserul Safari au stabilit standarde pe care fiecare telefon ulterior le-a urmat.",
    },
    {
      title: "Deschiderea App Store",
      date: "2008",
      details:
        "Apple lansează App Store cu 500 de aplicații. Creează o economie software complet nouă: dezvoltatorii puteau acum construi și monetiza aplicații pentru un public global, generând ceea ce va crește într-un ecosistem cumulativ de peste 2 trilioane de dolari.",
    },
    {
      title: "Android devine Open Source",
      date: "2008",
      details:
        "Google lansează Android 1.0 pe HTC Dream (T-Mobile G1). Oferind sistemul de operare gratuit producătorilor, Google s-a asigurat că software-ul mobil american va alimenta practic fiecare smartphone non-Apple construit vreodată.",
    },
    {
      title: "Retina Display și FaceTime",
      date: "2010",
      details:
        "iPhone 4 debutează cu Retina Display (326 ppi) și apeluri video FaceTime. Densitatea ecranului a devenit noul reper industrial; FaceTime a normalizat comunicarea video cu ani înainte de a deveni o necesitate globală.",
    },
    {
      title: "Calculul Mobil pe 64 de Biți",
      date: "2013",
      details:
        "iPhone 5s introduce cipul A7 de la Apple — primul procesor pe 64 de biți din lume într-un smartphone de consum. Saltul arhitectural a dublat debitul computațional și a pus bazele pentru AI pe dispozitiv și realitate augmentată.",
    },
    {
      title: "Era Post-PC Consolidată",
      date: "2017",
      details:
        "iPhone X marchează al zecelea aniversar cu Face ID, un ecran OLED Super Retina și motorul neural care permite machine learning în timp real. Penetrarea smartphone-urilor depășește PC-ul cu mai mult de 3:1, confirmând mobilul ca platformă primară de calcul a omenirii.",
    },
    {
      title: "5G și Noua Frontieră",
      date: "2020",
      details:
        "iPhone 12 devine primul iPhone 5G, accelerând implementarea globală a rețelelor wireless de a cincea generație. Producătorii americani de cipuri — Qualcomm, Apple Silicon — proiectează modemurile și procesoarele de bandă de bază care alimentează aproape toate dispozitivele 5G din lume.",
    },
    {
      title: "Smartphone-uri Native AI",
      date: "2024+",
      details:
        "Apple Intelligence și Gemini Nano de la Google aduc modele lingvistice mari direct pe siliciul dispozitivului. Smartphone-ul a evoluat de la instrument de comunicare la agent AI personal — și din nou arhitectura, siliciul și software-ul sunt proiectate în America.",
    },
  ],
  duopolyLabel: "CONTROLUL DE 99,6%",
  duopolyTitle: "Sistemul de Operare American Care Rulează în Fiecare Buzunar de pe Pământ",
  duopolyParagraph1:
    "Piața sistemelor de operare mobile este cel mai concentrat duopol tehnologic din istorie. iOS (Apple, Cupertino, California) și Android (Google, Mountain View, California) reprezintă împreună 99,6% din toate sistemele de operare pentru smartphone-uri la nivel global. Nicio altă platformă tehnologică de consum — nici căutarea, nici rețelele sociale, nici streaming-ul — nu atinge acest nivel de control american concentrat.",
  duopolyParagraph2:
    "Strategia de licențiere open-source a Android s-a dovedit mai ales decisivă: oferind sistemul de operare gratuit producătorilor, de la Samsung la Xiaomi, Google s-a asigurat că platforma sa — și serviciile, publicitatea și ecosistemul său de aplicații — vor deveni infrastructura implicită a calculului mobil global.",
  duopolySource: "StatCounter Global Stats",
  duopolySourceUrl: "https://gs.statcounter.com/os-market-share/mobile/worldwide/",
  appEconomyLabel: "ECONOMIA APP STORE",
  appEconomyTitle: "Economia de Platformă pe Care Apple a Construit-o",
  appEconomyParagraph1:
    "App Store, lansat în iulie 2008 cu 500 de aplicații, a devenit una dintre cele mai semnificative platforme din punct de vedere economic din istorie. Până în 2024, ecosistemul combinat iOS și Google Play a facilitat peste 1,1 trilioane de dolari în facturare și vânzări ale dezvoltatorilor. Apple singur a plătit peste 320 de miliarde de dolari dezvoltatorilor de la înființarea App Store.",
  appEconomyParagraph2:
    "Modelul de platformă pe care Apple l-a pionierat cu App Store a devenit șablonul pentru fiecare piață digitală care a urmat: comisionul de 30%, procesul de revizuire curatoriat și arhitectura de încredere și siguranță au fost copiate de Google Play, Steam, PlayStation Store și fiecare platformă majoră de distribuție digitală.",
  platformsTitle: "Cele Două Platforme Care Conduc Lumea",
  platformsSubtitle:
    "Ambele sisteme de operare care alimentează 99,6% din smartphone-urile globale au fost concepute, inginerate și au sediul în același coridor de 30 de kilometri din nordul Californiei.",
  platforms: [
    {
      name: "Apple iOS",
      founded: "2007 | Cupertino, CA",
      marketShare: "~28% Global",
      role: "Ecosistem Mobil Premium",
      contribution:
        "iOS alimentează aproximativ 28% din smartphone-urile globale, dar generează peste 65% din veniturile globale din aplicații mobile. Integrarea verticală a iPhone — deținând proiectarea cipurilor (Apple Silicon), sistemul de operare (iOS) și distribuția (App Store) — oferă Apple cea mai profitabilă afacere de hardware de consum din istorie și o capitalizare de piață de 3,5 trilioane de dolari.",
    },
    {
      name: "Google Android",
      founded: "2008 | Mountain View, CA",
      marketShare: "~72% Global",
      role: "Infrastructură Globală Open-Source",
      contribution:
        "Android alimentează aproximativ 72% din toate smartphone-urile la nivel global — aproximativ 3,3 miliarde de dispozitive active. Prin licențierea gratuită, Google s-a asigurat că serviciile sale (Căutare, Maps, Gmail, YouTube, Play Store) devin implicite pe miliarde de dispozitive, generând peste 150 de miliarde de dolari în venituri anuale din publicitate mobilă.",
    },
    {
      name: "Apple Silicon (Seria A)",
      founded: "2010 | Cupertino, CA",
      marketShare: "Cei mai rapizi cipuri mobile din lume",
      role: "Lider în Arhitectura Cipurilor Mobile",
      contribution:
        "Cipurile din seria A de la Apple au condus benchmark-urile de performanță în semiconductori mobili timp de peste un deceniu. Cipurile A17 Pro și A18 dispun de CPU cu 6 nuclee, GPU cu 6 nuclee și un Motor Neural cu 16 nuclee capabil de 35+ trilioane de operații pe secundă — permițând inferență AI pe dispozitiv pe care niciun concurent Android nu a egalat-o.",
    },
    {
      name: "Qualcomm Snapdragon",
      founded: "1985 | San Diego, CA",
      marketShare: "~65% Android premium",
      role: "Monopol pe Modem Mobil și SoC",
      contribution:
        "Qualcomm, cu sediul în San Diego, California, proiectează chip-ul Snapdragon system-on-chip care alimentează majoritatea smartphone-urilor Android premium din întreaga lume. Brevetele sale CDMA și 5G creează un flux de redevențe din practic fiecare dispozitiv celular vândut pe Pământ.",
    },
  ],
  oracleDescription:
    "Întreabă Oracolul AI despre lansarea originală iPhone din 2007, economia App Store, arhitectura Apple Silicon, brevetele modem 5G sau dinamica cotei de piață iOS versus Android.",
};

export default async function SmartphonesPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <>
      <MacroStyles />

      {/* Cinematic Hero */}
      <MacroHero
        titleLead={copy.heroTitle}
        titleAccent={copy.heroTagline}
        eyebrow={copy.breadcrumbPage}
        description={copy.heroSubtitle}
        videoSrc="/videos/library/Technology/Introducing iPhone 17 Pro | Apple.mp4"
      />

      <div className="bg-[#030405] relative z-10 pb-32 pt-16 font-body text-white">
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
        <section id="intro" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="rounded-3xl border border-white/5 bg-white/2 backdrop-blur-md p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Smartphone className="h-40 w-40 text-[#E8B923]" />
            </div>
            <h2 className="font-macro-display text-3xl font-bold text-[#E8B923] mb-8">
              {copy.thesisTitle}
            </h2>
            <p className="font-macro-body text-white/80 text-lg md:text-xl leading-relaxed mb-6">
              {copy.thesisParagraph1}
            </p>
            <p className="font-macro-body text-white/80 text-lg md:text-xl leading-relaxed">
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
                    ? "Plătite de Apple dezvoltatorilor de aplicații din întreaga lume de la lansarea App Store în 2008"
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
                    ? "Apple este cea mai valoroasă companie publică din istoria omenirii — construită în jurul iPhone-ului"
                    : "Apple is the most valuable public company in human history — built on the iPhone"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline / Milestones */}
        <section id="milestones" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
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
                    <span className="text-xs font-mono text-[#E8B923] border border-[#E8B923]/25 px-2 py-0.5 rounded">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-macro-display text-xl font-bold text-white mb-4 group-hover:text-[#E8B923] transition-colors">
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

        {/* iPhone Hero Image Feature Band */}
        <InfrastructureBand
          imageSrc="/images/library/Technology/iPhone saying Hello on dark background.jpg"
          imageAlt="iPhone displaying Hello on a dark background"
        >
          <div className="relative z-10">
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
                {isRo ? "Verifică datele" : "Verify Data"} →
              </a>
            </div>
          </div>
        </InfrastructureBand>

        {/* OS Duopoly Breakdown */}
        <section id="duopoly" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-32">
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] font-semibold mb-3 block">
              {isRo ? "DOMINANȚA SISTEMULUI DE OPERARE" : "OS DOMINANCE"}
            </span>
            <h2 className="font-macro-display text-4xl font-bold text-white uppercase tracking-tight mb-8">
              {isRo ? "Distribuția Globală a Sistemelor de Operare Mobile" : "Global Mobile OS Distribution"}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* OS Share bars */}
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-white/5 bg-white/1 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <Globe className="h-5 w-5 text-white/40" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-semibold">
                    {isRo ? "COTĂ DE PIAȚĂ GLOBALĂ" : "GLOBAL MARKET SHARE"}
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    {
                      name: "Android (Google)",
                      share: 72,
                      color: "#4ade80",
                      status: isRo ? "DOMINANT" : "DOMINANT",
                      hq: "Mountain View, CA",
                    },
                    {
                      name: "iOS (Apple)",
                      share: 27.6,
                      color: "#E8B923",
                      status: isRo ? "PREMIUM" : "PREMIUM",
                      hq: "Cupertino, CA",
                    },
                    {
                      name: isRo ? "Altele" : "Other",
                      share: 0.4,
                      color: "#94a3b8",
                      status: isRo ? "NEGLIJABIL" : "NEGLIGIBLE",
                      hq: "—",
                    },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <span className="text-xs font-mono text-white/60 w-36 shrink-0">{c.name}</span>
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${c.share}%`,
                            backgroundColor: c.color,
                            boxShadow: `0 0 6px ${c.color}66`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-mono w-10 text-white/50">{c.share}%</span>
                      <span
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded border"
                        style={{ color: c.color, borderColor: `${c.color}40` }}
                      >
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-white/30 font-body mt-4 leading-relaxed">
                  {isRo
                    ? "Estimat cotă de piață globală, 2025. Sursă: StatCounter."
                    : "Estimated global market share, 2025. Source: StatCounter."}
                </p>
              </div>

              {/* American Origin callout */}
              <div className="rounded-2xl border border-[#E8B923]/15 bg-[#E8B923]/3 p-6">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#E8B923] font-semibold mb-4 block">
                  {isRo ? "ORIGINEA GEOGRAFICĂ" : "GEOGRAPHIC ORIGIN"}
                </span>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      value: "Cupertino, CA",
                      label: isRo ? "Bornă iOS" : "iOS birthplace",
                    },
                    {
                      value: "Mountain View, CA",
                      label: isRo ? "Bornă Android" : "Android birthplace",
                    },
                    {
                      value: "17 miles",
                      label: isRo ? "Distanța dintre ele" : "Distance between them",
                    },
                    {
                      value: "99.6%",
                      label: isRo ? "Control mobil combinat" : "Combined mobile control",
                    },
                  ].map((s) => (
                    <div key={s.label}>
                      <span className="font-macro-display text-xl font-bold text-[#E8B923] block leading-tight">
                        {s.value}
                      </span>
                      <span className="text-[10px] text-white/50 font-body block leading-snug mt-0.5">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* App Economy breakdown */}
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-white/5 bg-white/1 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-5 w-5 text-[#E8B923]" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B923] font-semibold">
                    {copy.appEconomyLabel}
                  </span>
                </div>
                <h3 className="font-macro-display text-xl font-bold text-white mb-3">
                  {copy.appEconomyTitle}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed font-body mb-4">
                  {copy.appEconomyParagraph1}
                </p>
                <p className="text-sm text-white/60 leading-relaxed font-body">
                  {copy.appEconomyParagraph2}
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/1 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <Layers className="h-5 w-5 text-white/40" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-semibold">
                    {isRo ? "ECONOMIA APLICAȚIILOR MOBILE" : "MOBILE APP ECONOMY"}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      label: isRo ? "Facturare globală App Store + Play" : "Global App Store + Play billings",
                      value: "$1.1T+",
                      color: "#E8B923",
                    },
                    {
                      label: isRo ? "Plăți totale Apple către dev" : "Apple lifetime dev payouts",
                      value: "$320B+",
                      color: "#4ade80",
                    },
                    {
                      label: isRo ? "Aplicații active în App Store" : "Active App Store apps",
                      value: "1.8M+",
                      color: "#bb9af2",
                    },
                    {
                      label: isRo ? "Descărcări zilnice globale" : "Global daily downloads",
                      value: "500M+",
                      color: "#ff9e64",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                    >
                      <span className="text-xs font-body text-white/50">{item.label}</span>
                      <span
                        className="text-sm font-mono font-bold"
                        style={{ color: item.color }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apple HQ Image Feature */}
        <InfrastructureBand
          imageSrc="/images/library/Technology/Apple Cupertino headquarters from above.jpg"
          imageAlt="Apple Park headquarters in Cupertino, California from above"
        >
          <div className="relative z-10">
            <span className="macro-eyebrow mb-3 block">
              {isRo ? "APPLE PARK, CUPERTINO" : "APPLE PARK, CUPERTINO"}
            </span>
            <h2 className="macro-section-title text-white mb-6">
              {isRo ? "Cel Mai Valoros Produs din Istorie" : "The Most Valuable Product in History"}
            </h2>
            <p className="macro-body text-white/80 mb-6 max-w-4xl">
              {isRo
                ? "Apple Park, finalizat în 2017 la costul de 5 miliarde de dolari, este cartierul general al companiei care a creat cel mai valoros produs al tuturor timpurilor. iPhone-ul singur generează mai mult venit anual decât întreaga industrie a cafelei din lume, mai mult decât Netflix și Disney combinate și mai mult decât PIB-ul a 130 de țări suverane."
                : "Apple Park, completed in 2017 at a cost of $5 billion, is the headquarters of the company that created the most valuable product of all time. The iPhone alone generates more annual revenue than the entire global coffee industry, more than Netflix and Disney combined, and more than the GDP of 130 sovereign nations."}
            </p>
            <p className="macro-body text-white/80 mb-8 max-w-4xl">
              {isRo
                ? "Conducta inovației Apple — de la cipul M-series la Apple Intelligence până la Vision Pro — demonstrează că această companie nu a lansat pur și simplu un produs în 2007. A inventat o întreagă paradigmă de calcul care continuă să se extindă în noi dimensiuni ale existenței umane."
                : "Apple's innovation pipeline — from the M-series chip to Apple Intelligence to Vision Pro — demonstrates that this company did not simply launch a product in 2007. It invented an entire computing paradigm that continues expanding into new dimensions of human existence."}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
              {[
                { value: "$3.5T", label: isRo ? "Capitalizare piață" : "Market cap" },
                { value: "$390B+", label: isRo ? "Venit anual" : "Annual revenue" },
                { value: "2.2B+", label: isRo ? "Dispozitive active" : "Active devices" },
                { value: "1976", label: isRo ? "Fondată" : "Founded" },
              ].map((s) => (
                <div key={s.label}>
                  <span className="font-macro-display text-2xl md:text-3xl font-bold text-[#E8B923] block">
                    {s.value}
                  </span>
                  <span className="text-[10px] text-white/50 font-body block leading-snug mt-1 uppercase tracking-wide">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </InfrastructureBand>

        {/* The Four Platforms Section */}
        <section id="platforms" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-32">
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] font-semibold mb-3 flex items-center justify-center gap-2">
              <Cpu className="h-4 w-4 text-[#E8B923]" />
              {isRo ? "PLATFORMELE AMERICANE" : "THE AMERICAN PLATFORMS"}
            </span>
            <h2 className="font-macro-display text-4xl font-bold text-white uppercase tracking-tight mb-4">
              {copy.platformsTitle}
            </h2>
            <p className="font-macro-body text-white/60 text-lg max-w-3xl mx-auto">
              {copy.platformsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.platforms.map((platform, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/1 p-8 flex flex-col justify-between hover:border-[#E8B923]/30 hover:bg-white/3 transition-all duration-500 hover:-translate-y-1"
              >
                <div>
                  <h3 className="font-macro-display text-2xl font-bold text-white mb-1 group-hover:text-[#E8B923] transition-colors">
                    {platform.name}
                  </h3>
                  <span className="text-[10px] font-mono text-[#E8B923]/70 uppercase tracking-widest block mb-4">
                    {platform.role}
                  </span>
                  <p className="text-sm text-white/70 leading-relaxed font-body mb-6">
                    {platform.contribution}
                  </p>
                </div>
                <div className="border-t border-white/5 pt-4 mt-auto">
                  <div className="flex justify-between text-[11px] font-mono text-white/40 mb-1">
                    <span>{isRo ? "FONDATĂ / SEDIU" : "FOUNDED / HQ"}</span>
                    <span className="text-white/60 font-semibold">{platform.founded}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-white/40">
                    <span>{isRo ? "COTĂ DE PIAȚĂ" : "MARKET SHARE"}</span>
                    <span className="text-[#E8B923] font-semibold">{platform.marketShare}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Apple Products image grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/2 aspect-16/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/library/Technology/Apple Products.jpg"
                alt="Apple product lineup including iPhone, iPad, and MacBook"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#030405] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="text-xs font-mono text-[#E8B923] uppercase tracking-wider mb-2 block">
                  {isRo ? "Ecosistemul Apple" : "The Apple Ecosystem"}
                </span>
                <h3 className="font-macro-display text-2xl font-bold text-white">
                  {isRo ? "iPhone, iPad, Mac — Un Ecosistem Unificat" : "iPhone, iPad, Mac — One Unified Ecosystem"}
                </h3>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/2 aspect-16/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/library/Technology/iPhone saying Hello on wooden background.jpg"
                alt="iPhone displaying Hello on a wooden background"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#030405] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="text-xs font-mono text-[#E8B923] uppercase tracking-wider mb-2 block">
                  {isRo ? "iPhone, 2007 – Prezent" : "iPhone, 2007 – Present"}
                </span>
                <h3 className="font-macro-display text-2xl font-bold text-white">
                  {isRo ? "Hello. — Cel Mai Iconic Cuvânt din Istoria Tehnologiei" : "Hello. — The Most Iconic Word in Tech History"}
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* Ask America Oracle */}
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
