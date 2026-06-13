import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  Rocket, 
  ExternalLink,
  Orbit,
  Compass,
  Navigation
} from "lucide-react";
import { 
  MacroStyles, 
  MacroHero, 
  CountUp, 
  InfrastructureBand 
} from "@/components/economy/EconomyAnimations";

export const metadata: Metadata = {
  title: "Space Technology | Innovation & Technology",
  description: "Explore how American private enterprise and venture capital revolutionized access to orbit, breaking the space monopolies of nation-states.",
};

interface SpaceCopy {
  breadcrumbParent: string;
  breadcrumbPage: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  thesisTitle: string;
  thesisParagraph1: string;
  thesisParagraph2: string;
  milestonesTitle: string;
  milestones: Array<{
    title: string;
    date: string;
    details: string;
  }>;
  spaceLabel: string;
  spaceTitle: string;
  spaceParagraph1: string;
  spaceParagraph2: string;
  spaceSource: string;
  spaceSourceUrl: string;
  oracleDescription: string;
  gpsLabel: string;
  gpsTitle: string;
  gpsParagraph1: string;
  gpsParagraph2: string;
  gpsSatellites: string;
  gpsOrbitType: string;
  gpsPrecision: string;
  gpsCoverage: string;
  artemisLabel: string;
  artemisTitle: string;
  artemisParagraph1: string;
  artemisParagraph2: string;
  artemisHeight: string;
  artemisThrust: string;
  artemisCapacity: string;
  artemisDestinations: string;
}

const copyEn: SpaceCopy = {
  breadcrumbParent: "Innovation & Technology",
  breadcrumbPage: "Space Technology",
  heroTagline: "COMMERCIAL SPACE",
  heroTitle: "Privatizing the Cosmos",
  heroSubtitle: "How private American enterprise and venture capital revolutionized access to orbit, breaking the launch monopolies of nation-states.",
  thesisTitle: "The Shift to Commercial Space",
  thesisParagraph1: "For decades, space was the exclusive domain of national governments, driven by geopolitical competition and public funds. Today, the space economy is led by American private capital, rapid engineering iterations, and vertical integration. By fostering a regulatory environment that allows failure and fast learning, the United States has unlocked orbit as a commercial marketplace.",
  thesisParagraph2: "This shift is powered by rapid reuse, mass satellite production, and a private launch cadence. The physical infrastructure of space — once dictated by civil agencies — is now dominated by private fleets launching from American soil, reducing launch costs by an order of magnitude.",
  milestonesTitle: "Key Milestones in Space Tech",
  milestones: [
    {
      title: "The Apollo Program",
      date: "1960s - 1970s",
      details: "The pinnacle of state-funded space exploration, landing twelve Americans on the Moon and proving the power of national scientific mobilization."
    },
    {
      title: "The Space Shuttle",
      date: "1981 - 2011",
      details: "The world's first reusable spacecraft, launching the Hubble Space Telescope and assembling the International Space Station."
    },
    {
      title: "Commercial Crew & Cargo",
      date: "2010s",
      details: "NASA partnered with private firms, shifting from buying rockets to purchasing transportation services, seeding a massive commercial ecosystem."
    },
    {
      title: "Rapid Reusability",
      date: "2020s",
      details: "Private launch systems achieved rapid rocket booster reusability, dropping orbital access costs by 90% and making mega-constellations viable."
    }
  ],
  spaceLabel: "THE PRIVATIZATION OF ORBIT",
  spaceTitle: "Commercial Space: SpaceX & Launch Hegemony",
  spaceParagraph1: "SpaceX conducted 52 percent of all orbital launches globally in 2024, launched 84 percent of all satellites, and delivered 84 percent of total satellite mass to orbit. The United States has nearly three times as many operational satellites as all other countries combined, overwhelmingly due to SpaceX's Starlink constellation, which comprises 65 percent of all operational satellites in space.",
  spaceParagraph2: "Founded in 2002 by an immigrant, built with private capital, and operating in a regulatory environment that permits rapid iteration, SpaceX achieved what no European space agency, Chinese state enterprise, or Russian program has matched. The Falcon 9 has fundamentally restructured the global launch market like the 747 restructured air travel, while Starlink serves 9 million users in 125 countries, doing to global broadband what the interstate highway system did to domestic freight.",
  spaceSource: "American Enterprise Institute (AEI) 2024",
  spaceSourceUrl: "https://www.aei.org/op-eds/space-trends-in-2024/",
  oracleDescription: "Ask the AI Oracle about SpaceX launch cadence, reusable rocket economics, Starlink global coverage, or NASA commercial crew partnerships.",
  gpsLabel: "THE GLOBAL POSITIONING SYSTEM",
  gpsTitle: "GPS: The Invisible American Utility Running Global Trade",
  gpsParagraph1: "Developed by the United States Department of Defense in 1978 and opened to civil utility in the 1980s, the Global Positioning System (GPS) is a space-based radio navigation network operated and maintained by the United States Space Force. By broadcasting continuous, high-precision timing signals from Medium Earth Orbit (MEO), GPS provides geolocation, velocity, and synchronization data to billions of devices worldwide, entirely as a free public service funded by American taxpayers.",
  gpsParagraph2: "This infrastructure is the silent heartbeat of the modern global economy. It coordinates the transoceanic routes of global shipping fleets, regulates the separation of commercial aircraft, synchronizes global cell towers, and stamps timestamps onto every financial transaction on Wall Street. While other nations have built regional alternatives, GPS remains the foundational planetary standard, saving global industries hundreds of billions of dollars annually.",
  gpsSatellites: "31 Active Satellites",
  gpsOrbitType: "Medium Earth Orbit (MEO)",
  gpsPrecision: "Sub-Decimeter Accuracy",
  gpsCoverage: "100% Global Footprint",
  artemisLabel: "THE DEEP SPACE CORRIDOR",
  artemisTitle: "Starship & Artemis: Re-Engineering Human Frontiers",
  artemisParagraph1: "The second space age is defined by NASA's Artemis project collaborating with private space enterprises to build a high-frequency supply line to the Moon and Mars. Unlike the expendable Saturn V of the Apollo era, the anchor of this new logistical pipeline is SpaceX's Starship. Standing 121 meters tall, Starship is the most massive launch vehicle ever assembled, built to be fully and rapidly reusable to lower launch costs by two orders of magnitude.",
  artemisParagraph2: "By pioneering in-orbit cryogenic propellant transfer—refueling methane and oxygen in low Earth orbit—Starship bypasses the traditional constraints of gravity wells, enabling the delivery of over 100 metric tons of cargo to the lunar surface. Developed in South Texas (Starbase), Starship is not merely a rocket; it is the core transport vehicle of a logistics network designed to extend permanent human presence into deep space.",
  artemisHeight: "121m Tall Stack",
  artemisThrust: "16.7M lbs Thrust",
  artemisCapacity: "100+ Tons to Orbit",
  artemisDestinations: "Moon & Mars Landing"
};

const copyRo: SpaceCopy = {
  breadcrumbParent: "Inovație și Tehnologie",
  breadcrumbPage: "Tehnologie Spațială",
  heroTagline: "SPAȚIUL COMERCIAL",
  heroTitle: "Privatizarea Cosmosului",
  heroSubtitle: "Cum întreprinderea privată americană și capitalul de risc au revoluționat accesul pe orbită, spărgând monopolul statelor suverane.",
  thesisTitle: "Tranziția către Spațiul Comercial",
  thesisParagraph1: "Timp de decenii, spațiul a fost domeniul exclusiv al guvernelor naționale, stimulat de competiția geopolitică și fondurile publice. Astăzi, economia spațială este condusă de capitalul privat american, iterații rapide de inginerie și integrare verticală. Printr-un mediu de reglementare permisiv care încurajează experimentarea, SUA au deblocat orbita ca o piață comercială.",
  thesisParagraph2: "Această tranziție este susținută de reutilizarea rapidă, producția în masă de sateliți și o cadență ridicată de lansare. Infrastructura fizică a spațiului — odinioară dictată de agenții guvernamentale — este acum dominată de flote private ce decolează de pe sol american, reducând costurile de lansare.",
  milestonesTitle: "Pilonii Cheie ai Tehnologiei Spațiale",
  milestones: [
    {
      title: "Programul Apollo",
      date: "Anii 1960 - 1970",
      details: "Culmea explorării spațiale finanțate de stat, aselenizarea a 12 americani pe Lună și dovada puterii de mobilizare științifică națională."
    },
    {
      title: "Naveta Spațială",
      date: "1981 - 2011",
      details: "Prima navă spațială reutilizabilă din lume, lansând telescopul Hubble și asamblând Stația Spațială Internațională."
    },
    {
      title: "Echipaj și Marfă Comercială",
      date: "Anii 2010",
      details: "NASA a încheiat parteneriate cu firme private, trecând de la achiziționarea de rachete la cea de servicii de transport, stimulând o nouă industrie."
    },
    {
      title: "Reutilizarea Rapidă",
      date: "Anii 2020",
      details: "Sistemele private de lansare au obținut reutilizarea rapidă a boosterelor, reducând costurile de acces orbital cu 90% și făcând megaconstelațiile viabile."
    }
  ],
  spaceLabel: "PRIVATIZAREA ORBITEI",
  spaceTitle: "Spațiul Comercial: SpaceX și Hegemonia Lansărilor",
  spaceParagraph1: "SpaceX a efectuat 52% din toate lansările orbitale globale în 2024, a lansat 84% din toți sateliții și a livrat 84% din masa totală trimisă pe orbită. Statele Unite au de aproape trei ori mai mulți sateliți operaționali în spațiu decât toate celelalte țări combinate, în mare parte datorită rețelei Starlink, care reprezintă 65% din totalul sateliților activi.",
  spaceParagraph2: "Fondată în 2002 de un imigrant, construită cu capital privat și operând într-un mediu de reglementare permisiv, SpaceX a realizat ceea ce nicio agenție de stat chineză, europeană sau rusă nu a putut egala. Falcon 9 a restructurat piața globală de lansări așa cum Boeing 747 a schimbat călătoriile aeriene, în timp ce Starlink deservește 9 milioane de utilizatori din 125 de țări.",
  spaceSource: "American Enterprise Institute (AEI) 2024",
  spaceSourceUrl: "https://www.aei.org/op-eds/space-trends-in-2024/",
  oracleDescription: "Întreabă Oracolul AI despre cadența de lansare SpaceX, economia rachetelor reutilizabile, acoperirea Starlink sau parteneriatele comerciale NASA.",
  gpsLabel: "SISTEMUL DE POZIȚIONARE GLOBALĂ",
  gpsTitle: "GPS: Utilitatea Invizibilă ce Coordonează Comerțul Mondial",
  gpsParagraph1: "Dezvoltat de Departamentul de Apărare al SUA în 1978 și deschis uzului civil în anii 1980, Sistemul de Poziționare Globală (GPS) este o rețea de navigație prin satelit operată și întreținută de Forța Spațială a SUA. Difuzând semnale temporale de înaltă precizie de pe orbita medie (MEO), GPS oferă geolocalizare, viteză și sincronizare pentru miliarde de dispozitive din întreaga lume, fiind un serviciu public global gratuit finanțat de contribuabilii americani.",
  gpsParagraph2: "Această infrastructură este pulsul invizibil al economiei globale moderne. Coordonarea navelor pe rute transoceanice, dirijarea avioanelor comerciale, sincronizarea antenelor de telecomunicații și marcarea timpului pentru tranzacțiile financiare depind în totalitate de GPS. Deși alte națiuni au creat sisteme regionale proprii, GPS rămâne standardul planetar fundamental, economisind industriilor sute de miliarde de dolari anual.",
  gpsSatellites: "31 Sateliți Activi",
  gpsOrbitType: "Orbită Medie (MEO)",
  gpsPrecision: "Precizie Subdecimetrică",
  gpsCoverage: "Acoperire Globală 100%",
  artemisLabel: "CORIDORUL SPAȚIULUI ÎNDEPĂRTAT",
  artemisTitle: "Starship și Artemis: Reproiectarea Frontierelor Umane",
  artemisParagraph1: "A doua eră spațială este definită de colaborarea dintre proiectul Artemis al NASA și întreprinderile spațiale private pentru a construi o linie logistică către Lună și Marte. Spre deosebire de Saturn V din era Apollo, piesa centrală a acestei noi structuri logistice este Starship de la SpaceX. Cu o înălțime de 121 de metri, Starship este cel mai masiv vehicul de lansare asamblat vreodată, fiind proiectat pentru reutilizare rapidă și integrală.",
  artemisParagraph2: "Prin pionieratul transferului de propulsie criogenică pe orbită — realimentarea cu metan și oxigen pe orbita joasă a Pământului — Starship ocolește limitele gravitaționale tradiționale, permițând livrarea a peste 100 de tone pe suprafața lunară. Dezvoltat în Texasul de Sud (Starbase), Starship nu este doar o rachetă; este vehiculul de transport principal al unei rețele logistice menite să extindă prezența umană permanentă în spațiul cosmic.",
  artemisHeight: "121m Înălțime Totală",
  artemisThrust: "7.5M kg Tracțiune",
  artemisCapacity: "100+ Tone pe Orbită",
  artemisDestinations: "Lansări Lună & Marte"
};

export default async function SpaceTechnologyPage() {
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
        videoSrc="/videos/library/Technology/Starship's Tenth Flight Test launch and landing cinematic.mp4"
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

        {/* Space Stats Section */}
        <section className="py-24 border-t border-b border-white/5 bg-white/[0.01] mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={52} suffix="%" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "CADENȚĂ LANSĂRI" : "LAUNCH CADENCE"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo ? "Din lansările orbitale globale în 2024 efectuate de SpaceX" : "Of global orbital launches conducted by SpaceX in 2024"}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={84} suffix="%" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "MASĂ TRANSMISĂ" : "MASS TO ORBIT"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo ? "Din masa totală de sateliți trimisă pe orbită în 2024" : "Of total satellite mass delivered to orbit in 2024"}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={65} suffix="%" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "REȚEAUA ACTIVE" : "STARLINK NETWORK"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo ? "Din toți sateliții operaționali activi în spațiu în prezent" : "Of all active operational satellites in space today"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones grid */}
        <section id="milestones" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <h2 className="font-macro-display text-4xl font-bold text-center mb-16 text-white uppercase tracking-tight">
            {copy.milestonesTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {copy.milestones.map((item, idx) => (
              <div 
                key={idx}
                className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-between hover:border-[#E8B923]/40 hover:bg-white/[0.04] transition-all duration-500 group"
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

        {/* GPS Section */}
        <section id="gps-constellation" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-32">
          <div className="border-t border-white/5 pt-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] font-semibold mb-3 block flex items-center gap-2">
              <Compass className="h-4 w-4 text-[#E8B923]" />
              {copy.gpsLabel}
            </span>
            <h2 className="font-macro-display text-4xl font-bold text-white uppercase tracking-tight mb-8">
              {copy.gpsTitle}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="font-macro-body text-white/80 text-lg leading-relaxed mb-6">
                  {copy.gpsParagraph1}
                </p>
                <p className="font-macro-body text-white/80 text-lg leading-relaxed">
                  {copy.gpsParagraph2}
                </p>
              </div>
              
              {/* GPS Specs Grid */}
              <div className="bg-white/[0.01] rounded-3xl border border-white/5 p-8 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-6 font-body">
                  <div className="flex flex-col gap-1">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Active Fleet</span>
                    <span className="text-[#E8B923] font-bold text-xl">{copy.gpsSatellites}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Orbit Class</span>
                    <span className="text-white font-semibold text-lg">{copy.gpsOrbitType}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Precision</span>
                    <span className="text-white font-semibold text-lg">{copy.gpsPrecision}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Availability</span>
                    <span className="text-white font-semibold text-lg">{copy.gpsCoverage}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SpaceX Feature Section (Cinematic Parallax Band) */}
        <InfrastructureBand
          imageSrc="/images/library/Technology/Landed rockets in hangar 39A SpaceX.jpg"
          imageAlt="SpaceX Landed Rockets in Hangar"
        >
          <div className="relative z-10">
            <span className="macro-eyebrow mb-3 block">
              {copy.spaceLabel}
            </span>
            <h2 className="macro-section-title text-white mb-6">
              {copy.spaceTitle}
            </h2>
            <p className="macro-body text-white/80 mb-6 max-w-4xl">
              {copy.spaceParagraph1}
            </p>
            <p className="macro-body text-white/80 mb-8 max-w-4xl">
              {copy.spaceParagraph2}
            </p>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40 font-mono">
              <span>Source: {copy.spaceSource}</span>
              <a 
                href={copy.spaceSourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-[#E8B923] hover:underline"
              >
                {isRo ? "Verifică datele lansării" : "Verify Launch Data"}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </InfrastructureBand>

        {/* SpaceX Videos Cinematic Showcase */}
        <section id="spacex-showcase" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-32 border-t border-white/5 pt-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-6 font-semibold">
            {isRo ? "MULTIMEDIA CINEMATIC" : "CINEMATIC MULTIMEDIA"}
          </p>
          <h2 className="font-macro-display text-4xl font-bold text-center mb-16 text-white uppercase tracking-tight">
            {isRo ? "Tehnologia SpaceX în Acțiune" : "SpaceX Technology in Action"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: isRo ? "Lansarea și Aterizarea Falcon 9" : "Falcon 9 Launch & Landing",
                description: isRo
                  ? "Urmăriți precizia uluitoare a boosterului Falcon 9 care se lansează în spațiu și revine pentru a ateriza în picioare pe o platformă autonomă din Oceanul Atlantic. Această inovație a transformat reutilizarea rachetelor într-o rutină comercială."
                  : "Watch the breathtaking precision of the Falcon 9 booster launching into space and returning to land upright on an autonomous drone ship in the Atlantic Ocean. This engineering breakthrough turned rocket reuse into a routine commercial operation.",
                videoSrc: "/videos/library/Technology/Falcon 9 Launch and Landing cinematic.mp4",
                tag: isRo ? "REUTILIZARE COMPLETĂ" : "RAPID REUSABILITY"
              },
              {
                title: isRo ? "Costumul Spațial EVA de Nouă Generație" : "Next-Gen EVA Spacesuit",
                description: isRo
                  ? "Proiectat pentru misiunea Polaris Dawn și viitoarele zboruri către Marte, costumul spațial de activitate extravehiculară (EVA) dezvoltat de SpaceX asigură suport vital avansat, protecție termică și mobilitate sporită în vidul spațial."
                  : "Designed for the Polaris Dawn mission and future Martian voyages, the SpaceX Extravehicular Activity (EVA) suit provides advanced life support, thermal protection, and mobility in the vacuum of space, scaling astronaut safety.",
                videoSrc: "/videos/library/Technology/The Extravehicular Activity (EVA) Suit SpaceX ShowCase 4K Cinematic.mp4",
                tag: isRo ? "EXPLORARE SPAȚIALĂ UMANĂ" : "HUMAN SPACEFLIGHT"
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col hover:border-[#E8B923]/30 transition-all duration-500"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-700"
                  >
                    <source src={item.videoSrc} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent" />
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

        {/* Starship & Artemis Deep Space Section */}
        <section id="deep-space-pipeline" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-32">
          <div className="border-t border-white/5 pt-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] font-semibold mb-3 block flex items-center gap-2">
              <Navigation className="h-4 w-4 text-[#E8B923]" />
              {copy.artemisLabel}
            </span>
            <h2 className="font-macro-display text-4xl font-bold text-white uppercase tracking-tight mb-8">
              {copy.artemisTitle}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="font-macro-body text-white/80 text-lg leading-relaxed mb-6">
                  {copy.artemisParagraph1}
                </p>
                <p className="font-macro-body text-white/80 text-lg leading-relaxed">
                  {copy.artemisParagraph2}
                </p>
              </div>

              {/* Starship Specs Grid */}
              <div className="bg-white/[0.01] rounded-3xl border border-white/5 p-8 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-6 font-body">
                  <div className="flex flex-col gap-1">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Stack Height</span>
                    <span className="text-white font-semibold text-lg">{copy.artemisHeight}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Launch Thrust</span>
                    <span className="text-[#E8B923] font-bold text-xl">{copy.artemisThrust}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Payload Capacity</span>
                    <span className="text-white font-semibold text-lg">{copy.artemisCapacity}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Operational Core</span>
                    <span className="text-white font-semibold text-lg">{copy.artemisDestinations}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apollo Legacy Gallery */}
        <section id="apollo-legacy" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-32">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-6 font-semibold">
            {isRo ? "MOȘTENIREA APOLLO" : "THE APOLLO LEGACY"}
          </p>
          <h2 className="font-macro-display text-4xl font-bold text-center mb-16 text-white uppercase tracking-tight">
            {isRo ? "Arhiva Istorică a Programului Apollo" : "The Apollo Program Historical Archive"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                tag: isRo ? "Pregătire Lansare" : "Launch Prep",
                title: isRo ? "Transferul Saturn V" : "Saturn V Rollout",
                description: isRo
                  ? "Racheta Saturn V SA-506, purtând capsula Apollo 11, iese din clădirea VAB (Vehicle Assembly Building) spre Complexul de Lansare 39 pe 16 iulie 1969. Cu o înălțime de 111 metri, rămâne cea mai mare rachetă operațională din istorie."
                  : "The Saturn V SA-506 rocket, carrying Apollo 11, moves out of the Vehicle Assembly Building (VAB) towards Launch Complex 39 on July 16, 1969. Standing 363 feet tall, it remains the tallest, heaviest, and most powerful rocket ever brought to operational status.",
                imageSrc: "/images/library/Technology/Space/Saturn V SA-506, the rocket carrying the Apollo 11 spacecraft, moves out of the Vehicle Assembly Building towards Launch Complex 39.jpg"
              },
              {
                tag: isRo ? "Suprafața Lunară" : "Lunar Surface",
                title: isRo ? "Experimente Științifice" : "Scientific Deployment",
                description: isRo
                  ? "Buzz Aldrin stă lângă Pachetul de Experimente Seismice Pasive pe suprafața Lunii, cu modulul Eagle în fundal. Acest pachet a înregistrat primele cutremure lunare, oferind date esențiale despre structura internă a Lunii."
                  : "Buzz Aldrin stands next to the Passive Seismic Experiment Package on the lunar surface, with the Lunar Module Eagle in the background. This package recorded the first moonquakes, providing key insights into the Moon's internal structure.",
                imageSrc: "/images/library/Technology/Space/Aldrin next to the Passive Seismic Experiment Package with the Lunar Module Eagle in the background.jpg"
              },
              {
                tag: isRo ? "Moment Istoric" : "Patriotic Milestone",
                title: isRo ? "Salutul Drapelului American" : "Saluting the Stars and Stripes",
                description: isRo
                  ? "Astronautul Buzz Aldrin salută drapelul Statelor Unite arborat pe suprafața Lunii în timpul misiunii Apollo 11. Neil Armstrong a surprins această imagine legendară, arătând steagul susținut de o tijă metalică în vidul spațial."
                  : "Astronaut Buzz Aldrin salutes the U.S. flag deployed on the lunar surface during the Apollo 11 mission. Neil Armstrong captured this iconic image, showing the flag stiffened by a horizontal rod to remain visible in the vacuum of space.",
                imageSrc: "/images/library/Technology/Space/Buzz_salutes_the_U.S._Flag on the lunar surface.jpg"
              },
              {
                tag: isRo ? "Amprenta Umană" : "Legacy",
                title: isRo ? "Prima Urmă de Pas" : "The First Footprint",
                description: isRo
                  ? "Amprenta cizmei lui Buzz Aldrin în solul fin al Lunii, fotografiată pentru a studia mecanica solului. Această imagine a devenit una dintre cele mai recunoscute simboluri ale explorării și curajului uman."
                  : "Buzz Aldrin's bootprint in the fine lunar soil, taken to study the soil mechanics of the surface. This image became one of the most recognizable symbols of human exploration and technological achievement.",
                imageSrc: "/images/library/Technology/Space/Buzz_Aldrin's_bootprint_on_the_Moon.jpg"
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col hover:border-[#E8B923]/30 transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent" />
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

        {/* AI Ask America Oracle Section */}
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
