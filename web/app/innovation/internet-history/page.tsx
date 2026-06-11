import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { ExternalLink, Globe } from "lucide-react";
import {
  MacroStyles,
  MacroHero,
  CountUp,
} from "@/components/economy/EconomyAnimations";

export const metadata: Metadata = {
  title: "The Internet | Innovation & Technology",
  description:
    "How America invented the internet — from ARPANET's 1969 first message to the five American platforms that now generate most of the world's internet traffic and revenue.",
};

interface InternetCopy {
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
  platformLabel: string;
  platformTitle: string;
  platformParagraph1: string;
  platformParagraph2: string;
  platformSource: string;
  platformSourceUrl: string;
  infrastructureLabel: string;
  infrastructureTitle: string;
  infrastructureParagraph1: string;
  infrastructureParagraph2: string;
  galleryLabel: string;
  galleryTitle: string;
  gallery: Array<{ tag: string; title: string; description: string; imageSrc: string }>;
  oracleDescription: string;
}

const copyEn: InternetCopy = {
  breadcrumbParent: "Innovation & Technology",
  breadcrumbPage: "The Internet",
  heroTagline: "MADE IN AMERICA",
  heroTitle: "The\nInternet",
  heroSubtitle:
    "How a US Defense Department project became the global communications backbone — and how five American companies now own the platforms that run it.",
  thesisTitle: "America Built the Internet — and Still Controls the Infrastructure It Runs On",
  thesisParagraph1:
    "On October 29, 1969, the first message transmitted over ARPANET — a Defense Advanced Research Projects Agency network connecting UCLA to Stanford — crashed the receiving computer after two letters: LO. The intended word was LOGIN. In that accidental truncation, the communications backbone of the modern world was born. ARPANET was funded by the US Department of Defense, built by American universities, and engineered to survive the disruption of any single node by routing data dynamically across a distributed network.",
  thesisParagraph2:
    "Today, that original architecture connects 5.4 billion people, and the companies that own and operate the critical infrastructure remain American. Amazon, Google, and Microsoft host approximately 65% of all internet services globally. Google handles over 90% of all search queries on Earth. Meta's platforms reach 3.2 billion daily users. The undersea cables carrying 95% of all international internet traffic are overwhelmingly built and in many cases owned by American corporations. The internet was a US government project — and its privatized successor is a US corporate infrastructure.",
  milestonesTitle: "The History of the Internet",
  milestones: [
    {
      title: "ARPANET",
      date: "1969",
      details:
        "The first message is sent over ARPANET on October 29, 1969, connecting UCLA to Stanford Research Institute. Funded entirely by DARPA — a US Defense Department agency — the packet-switching architecture designed by American engineers becomes the foundation for every network that follows.",
    },
    {
      title: "TCP/IP",
      date: "1974 – 1983",
      details:
        "Vint Cerf and Bob Kahn (both American) finalize TCP/IP — the universal protocol allowing all computers on Earth to communicate. Every device connected to the internet today, from a smartphone in Lagos to a server in Tokyo, communicates using a protocol invented at Stanford and implemented by DARPA.",
    },
    {
      title: "The World Wide Web",
      date: "1991 – 1993",
      details:
        "Tim Berners-Lee invents the Web at CERN in 1991. But it is American engineer Marc Andreessen at the University of Illinois who builds Mosaic in 1993 — the first graphical browser for non-technical users. Andreessen co-founds Netscape and the commercial internet is born in the United States.",
    },
    {
      title: "The Platform Era",
      date: "2004 – Present",
      details:
        "Facebook (2004), YouTube (2005), Twitter (2006), AWS (2006), and the iPhone (2007) are all American. By 2024, the five most internet-valuable companies — Apple, Microsoft, Alphabet, Amazon, Meta — are all US-headquartered and collectively generate over $1.5 trillion annually from internet services.",
    },
  ],
  platformLabel: "THE AMERICAN INTERNET",
  platformTitle: "Five US Companies Generate Most of the World's Internet Traffic and Revenue",
  platformParagraph1:
    "The commercial internet is not a neutral, distributed network — it is a heavily concentrated system dominated by American platforms. Google controls over 90% of global search, meaning virtually every query typed into a search box on Earth flows through American servers. Meta's family of apps (Facebook, Instagram, WhatsApp) reaches over 3.2 billion people daily — roughly 40% of the entire human population — using the internet every day.",
  platformParagraph2:
    "Amazon Web Services, launched in 2006 from Seattle, transformed the internet from a collection of independently hosted websites into a utility running on American infrastructure. AWS hosts Netflix, Airbnb, NASA, the CIA, and millions of businesses across every continent. A significant portion of the internet goes partially offline whenever AWS experiences a major outage — which has happened multiple times — revealing the extraordinary concentration of the global internet's physical layer inside American data centers.",
  platformSource: "Statista, Cloudflare Radar, SimilarWeb",
  platformSourceUrl: "https://radar.cloudflare.com/",
  infrastructureLabel: "THE PHYSICAL BACKBONE",
  infrastructureTitle: "America Controls the Cables, the DNS, and the Routing of the Global Internet",
  infrastructureParagraph1:
    "The internet has a physical layer that most users never see: approximately 600 undersea cables carrying 95% of all international internet traffic across the ocean floor. American corporations — Google, Meta, Amazon, and Microsoft — have spent billions of dollars in the past decade building and co-owning the majority of new transoceanic cable systems. The result is that the physical pathway of global communications is increasingly owned by the same American companies that own the applications running on top of it.",
  infrastructureParagraph2:
    "The internet's addressing and naming system is controlled by ICANN (Internet Corporation for Assigned Names and Numbers), a US nonprofit headquartered in Los Angeles. ICANN manages the global DNS root — the authoritative list of every domain extension (.com, .org, .net, and every country-code TLD) — under a contract historically held with the US Department of Commerce. Every website on Earth depends on a system administered in the United States.",
  galleryLabel: "THE INFRASTRUCTURE OF THE INTERNET",
  galleryTitle: "The Physical and Human Architecture of the Connected World",
  gallery: [
    {
      tag: "Silicon Valley, CA",
      title: "Where the Internet Was Commercialized",
      description:
        "Silicon Valley — the strip of cities running from San Jose to San Francisco — is where the commercial internet was built. Netscape, Yahoo, Google, Facebook, Apple, and Netflix all launched from this 50-mile corridor. No comparable geographic concentration of internet value creation exists anywhere else on Earth.",
      imageSrc: "/images/library/Technology/home-silicon-valley.jpg",
    },
    {
      tag: "Google Data Center, Ohio",
      title: "The Physical Internet",
      description:
        "Google's data center in Midlothian, Texas is one of dozens of hyperscale facilities that constitute the physical internet. American hyperscalers — Google, Amazon, Microsoft — operate the largest concentrations of computing infrastructure in human history, processing a majority of the world's internet requests from facilities on US soil.",
      imageSrc: "/images/library/Technology/Google Data Center Midlothian Texas at Dusk with Water Tanks and GCUB Generator Yard.jpg",
    },
    {
      tag: "Internet Backbone",
      title: "Fiber Optic Cable: The Internet's Nervous System",
      description:
        "The global internet transmits data at the speed of light through fiber optic cables — glass strands thinner than a human hair, bundled into undersea and underground lines connecting every continent. The majority of the undersea cables built in the past decade have been financed and co-owned by American technology companies, making the physical backbone of the internet increasingly a private American asset.",
      imageSrc: "/images/library/Technology/Fiber Optic Cable.jpg",
    },
    {
      tag: "Internet Hardware",
      title: "The Circuit Boards Behind Every Connection",
      description:
        "Every router, switch, and server that routes internet traffic contains printed circuit boards designed, and in many cases architecturally specified, by American companies. Qualcomm, Broadcom, Intel, and Marvell design the network silicon that determines how data moves across every layer of the global internet stack, from the last-mile router to the core backbone.",
      imageSrc: "/images/library/Technology/PCB circuit board of electronic device.jpg",
    },
  ],
  oracleDescription:
    "Ask the AI Oracle about ARPANET's founding, the TCP/IP protocol, how undersea cables carry internet traffic, Google's search monopoly, or why ICANN controls global DNS from Los Angeles.",
};

const copyRo: InternetCopy = {
  breadcrumbParent: "Inovație și Tehnologie",
  breadcrumbPage: "Internetul",
  heroTagline: "CREAT ÎN AMERICA",
  heroTitle: "Internetul",
  heroSubtitle:
    "Cum un proiect al Departamentului Apărării din SUA a devenit coloana vertebrală globală de comunicații — și cum cinci companii americane dețin acum platformele pe care rulează.",
  thesisTitle: "America a Construit Internetul — și Controlează Încă Infrastructura pe Care Rulează",
  thesisParagraph1:
    "Pe 29 octombrie 1969, primul mesaj transmis prin ARPANET — o rețea a Agenției pentru Proiecte de Cercetare Avansată în Apărare, conectând UCLA la Stanford — a blocat computerul receptor după două litere: LO. Cuvântul intenționat era LOGIN. În acea trunchere accidentală, s-a născut coloana vertebrală de comunicații a lumii moderne. ARPANET a fost finanțat de Departamentul Apărării al SUA, construit de universități americane și proiectat pentru a rezista perturbării oricărui nod prin rutarea dinamică a datelor.",
  thesisParagraph2:
    "Astăzi, acea arhitectură originală conectează 5,4 miliarde de persoane, iar companiile care dețin și operează infrastructura critică rămân americane. Amazon, Google și Microsoft găzduiesc aproximativ 65% din toate serviciile internet la nivel global. Google procesează peste 90% din toate interogările de căutare de pe Pământ. Platformele Meta ajung zilnic la 3,2 miliarde de utilizatori. Cablurile submarine care transportă 95% din tot traficul internet internațional sunt în mare parte construite și în multe cazuri deținute de corporații americane. Internetul a fost un proiect al guvernului SUA — iar succesorul său privatizat este o infrastructură corporativă americană.",
  milestonesTitle: "Istoria Internetului",
  milestones: [
    {
      title: "ARPANET",
      date: "1969",
      details:
        "Primul mesaj este trimis prin ARPANET pe 29 octombrie 1969, conectând UCLA la Stanford Research Institute. Finanțat integral de DARPA — o agenție a Departamentului Apărării SUA — arhitectura cu comutare de pachete devine fundația pentru fiecare rețea care urmează.",
    },
    {
      title: "TCP/IP",
      date: "1974 – 1983",
      details:
        "Vint Cerf și Bob Kahn (ambii americani) finalizează TCP/IP — protocolul universal care permite tuturor computerelor de pe Pământ să comunice. Fiecare dispozitiv conectat la internet astăzi comunică folosind un protocol inventat la Stanford și implementat de DARPA.",
    },
    {
      title: "World Wide Web",
      date: "1991 – 1993",
      details:
        "Tim Berners-Lee inventează Web-ul la CERN în 1991. Dar inginerul american Marc Andreessen de la Universitatea Illinois construiește Mosaic în 1993 — primul browser grafic pentru utilizatorii non-tehnici. Andreessen co-fondează Netscape și internetul comercial se naște în Statele Unite.",
    },
    {
      title: "Era Platformelor",
      date: "2004 – Prezent",
      details:
        "Facebook (2004), YouTube (2005), Twitter (2006), AWS (2006) și iPhone (2007) sunt toate americane. Până în 2024, cele mai valoroase cinci companii de internet — Apple, Microsoft, Alphabet, Amazon, Meta — sunt toate cu sediul în SUA și generează colectiv peste 1,5 trilioane de dolari anual din servicii internet.",
    },
  ],
  platformLabel: "INTERNETUL AMERICAN",
  platformTitle: "Cinci Companii din SUA Generează Cea Mai Mare Parte din Traficul și Veniturile Globale de Internet",
  platformParagraph1:
    "Internetul comercial nu este o rețea neutră, distribuită — este un sistem puternic concentrat, dominat de platforme americane. Google controlează peste 90% din căutarea globală, ceea ce înseamnă că practic fiecare interogare introdusă într-un motor de căutare de pe Pământ trece prin servere americane. Familia de aplicații a Meta (Facebook, Instagram, WhatsApp) ajunge zilnic la 3,2 miliarde de persoane — aproximativ 40% din întreaga populație umană.",
  platformParagraph2:
    "Amazon Web Services, lansat în 2006 din Seattle, a transformat internetul dintr-o colecție de site-uri găzduite independent într-o utilitate care rulează pe infrastructura americană. AWS găzduiește Netflix, Airbnb, NASA, CIA și milioane de afaceri pe fiecare continent. O parte semnificativă a internetului se defectează parțial ori de câte ori AWS suferă o întrerupere majoră — ceea ce s-a întâmplat de mai multe ori — revelând concentrarea extraordinară a stratului fizic al internetului global în centrele de date americane.",
  platformSource: "Statista, Cloudflare Radar, SimilarWeb",
  platformSourceUrl: "https://radar.cloudflare.com/",
  infrastructureLabel: "COLOANA VERTEBRALĂ FIZICĂ",
  infrastructureTitle: "America Controlează Cablurile, DNS-ul și Rutarea Internetului Global",
  infrastructureParagraph1:
    "Internetul are un strat fizic pe care majoritatea utilizatorilor nu îl văd niciodată: aproximativ 600 de cabluri submarine care transportă 95% din tot traficul internet internațional pe fundul oceanului. Corporații americane — Google, Meta, Amazon și Microsoft — au cheltuit miliarde de dolari în ultimul deceniu construind și co-dând sisteme de cabluri transoceanic, făcând calea fizică a comunicațiilor globale un activ privat american.",
  infrastructureParagraph2:
    "Sistemul de adresare și denumire a internetului este controlat de ICANN (Internet Corporation for Assigned Names and Numbers), un nonprofit american cu sediul în Los Angeles. ICANN gestionează rădăcina DNS globală — lista autoritativă a fiecărei extensii de domeniu (.com, .org, .net și fiecare TLD național) — sub un contract deținut istoric cu Departamentul de Comerț al SUA. Fiecare site web de pe Pământ depinde de un sistem administrat în Statele Unite.",
  galleryLabel: "INFRASTRUCTURA INTERNETULUI",
  galleryTitle: "Arhitectura Fizică și Umană a Lumii Conectate",
  gallery: [
    {
      tag: "Silicon Valley, CA",
      title: "Unde a Fost Comercializat Internetul",
      description:
        "Silicon Valley — fâșia de orașe de la San Jose la San Francisco — este locul unde a fost construit internetul comercial. Netscape, Yahoo, Google, Facebook, Apple și Netflix au lansat toate din acest coridor de 80 de kilometri. Nicio altă concentrare geografică comparabilă de creare a valorii internet nu există în altă parte pe Pământ.",
      imageSrc: "/images/library/Technology/home-silicon-valley.jpg",
    },
    {
      tag: "Google Data Center, Texas",
      title: "Internetul Fizic",
      description:
        "Centrul de date Google din Midlothian, Texas este unul dintre zecile de facilități hyperscale care constituie internetul fizic. Hyperscaleri americani — Google, Amazon, Microsoft — operează cele mai mari concentrări de infrastructură de calcul din istoria omenirii, procesând cea mai mare parte a cererilor internet ale lumii din facilități pe teritoriul SUA.",
      imageSrc: "/images/library/Technology/Google Data Center Midlothian Texas at Dusk with Water Tanks and GCUB Generator Yard.jpg",
    },
    {
      tag: "Coloana Vertebrală Internet",
      title: "Cablul de Fibră Optică: Sistemul Nervos al Internetului",
      description:
        "Internetul global transmite date la viteza luminii prin cabluri de fibră optică — fire de sticlă mai subțiri decât un fir de păr, grupate în linii submarine și subterane care conectează fiecare continent. Marea majoritate a cablurilor submarine construite în ultimul deceniu au fost finanțate și co-deținute de companii americane de tehnologie.",
      imageSrc: "/images/library/Technology/Fiber Optic Cable.jpg",
    },
    {
      tag: "Hardware Internet",
      title: "Plăcile de Circuit din Spatele Fiecărei Conexiuni",
      description:
        "Fiecare router, switch și server care rutează traficul internet conține plăci de circuit proiectate, și în multe cazuri specificate arhitectural, de companii americane. Qualcomm, Broadcom, Intel și Marvell proiectează siliciul de rețea care determină modul în care datele se mișcă pe fiecare strat al stivei globale de internet.",
      imageSrc: "/images/library/Technology/PCB circuit board of electronic device.jpg",
    },
  ],
  oracleDescription:
    "Întreabă Oracolul AI despre fondarea ARPANET, protocolul TCP/IP, cum cablurile submarine transportă traficul internet, monopolul Google în căutare sau de ce ICANN controlează DNS-ul global din Los Angeles.",
};

export default async function InternetHistoryPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <>
      <MacroStyles />

      <MacroHero
        titleLead={copy.heroTitle}
        titleAccent={copy.heroTagline}
        eyebrow={copy.breadcrumbPage}
        description={copy.heroSubtitle}
        videoSrc="/videos/library/Technology/Fiber Optics, light, trails video.mp4"
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
                  <CountUp value={5.4} suffix="B" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "UTILIZATORI CONECTAȚI" : "PEOPLE CONNECTED"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo
                    ? "Oameni conectați la internet în 2024 — pe o rețea născută ca proiect militar american"
                    : "People connected to the internet in 2024 — on a network born as an American military project"}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={90} suffix="%+" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "COTĂ CĂUTARE GOOGLE" : "GOOGLE SEARCH SHARE"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo
                    ? "Practic fiecare interogare de căutare de pe Pământ trece prin servere din California"
                    : "Virtually every search query on Earth flows through servers in California"}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={65} suffix="%+" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "DOMINANȚĂ CLOUD SUA" : "US CLOUD DOMINANCE"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo
                    ? "Din toate serviciile internet globale sunt găzduite pe infrastructura americană AWS, Azure sau Google Cloud"
                    : "Of all global internet services are hosted on American AWS, Azure, or Google Cloud infrastructure"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones */}
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
                    <span className="text-xs font-mono text-white/35">{item.date}</span>
                  </div>
                  <h3 className="font-macro-display text-2xl font-bold text-white mb-4 group-hover:text-[#E8B923] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-body">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Platform Dominance */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5">
          <span className="macro-eyebrow mb-3 block">{copy.platformLabel}</span>
          <h2 className="macro-section-title text-white mb-6">{copy.platformTitle}</h2>
          <p className="macro-body text-white/80 mb-6 max-w-4xl">{copy.platformParagraph1}</p>
          <p className="macro-body text-white/80 mb-8 max-w-4xl">{copy.platformParagraph2}</p>
          <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40 font-mono">
            <span>Source: {copy.platformSource}</span>
            <a
              href={copy.platformSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#E8B923] hover:underline"
            >
              {isRo ? "Verifică datele" : "Verify Data"}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>

        {/* Platform Stats Band */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/5 rounded-3xl overflow-hidden">
            {[
              { value: "3.2B",  label: isRo ? "Utilizatori zilnici Meta" : "Meta daily active users", note: isRo ? "Facebook + Instagram + WhatsApp" : "Facebook + Instagram + WhatsApp" },
              { value: "90%+",  label: isRo ? "Cotă globală de căutare Google" : "Google global search share", note: isRo ? "Fiecare query trece prin California" : "Every query routes through California" },
              { value: "$1.5T+",label: isRo ? "Venituri anuale top 5 platforme" : "Annual revenue, top 5 US platforms", note: isRo ? "Apple, Microsoft, Alphabet, Amazon, Meta" : "Apple, Microsoft, Alphabet, Amazon, Meta" },
              { value: "95%",   label: isRo ? "Din traficul internațional prin cabluri submarine" : "Of intl. traffic through undersea cables", note: isRo ? "Majoritare deținute de companii americane" : "Majority co-owned by US corporations" },
            ].map((s, i) => (
              <div key={i} className={`p-8 flex flex-col gap-2 ${i > 0 ? "border-l border-white/5" : ""}`}>
                <span className="font-macro-display text-4xl md:text-5xl font-black text-[#E8B923]">{s.value}</span>
                <span className="text-sm font-body text-white/75 leading-snug">{s.label}</span>
                <span className="text-xs font-body text-white/45">{s.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Infrastructure Section */}
        <section id="infrastructure" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="border-t border-white/5 pt-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] font-semibold mb-3 flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#E8B923]" />
              {copy.infrastructureLabel}
            </span>
            <h2 className="font-macro-display text-4xl font-bold text-white uppercase tracking-tight mb-8">
              {copy.infrastructureTitle}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <p className="font-macro-body text-white/80 text-lg leading-relaxed">
                {copy.infrastructureParagraph1}
              </p>
              <p className="font-macro-body text-white/80 text-lg leading-relaxed">
                {copy.infrastructureParagraph2}
              </p>
            </div>

            {/* Infrastructure Stats */}
            <div className="mt-16 flex flex-col gap-8">
              {[
                {
                  value: "600+",
                  label: isRo ? "Cabluri submarine active care transportă traficul internet global" : "Active undersea cables carrying global internet traffic",
                  note: isRo ? "Cabluri co-deținute de Google, Meta, Amazon și Microsoft" : "Majority of new cables co-owned by Google, Meta, Amazon, Microsoft",
                },
                {
                  value: "ICANN",
                  label: isRo ? "Controlează rădăcina DNS globală din Los Angeles, California" : "Controls the global DNS root from Los Angeles, California",
                  note: isRo ? "Fiecare domeniu .com, .org, .net depinde de un sistem administrat în SUA" : "Every .com, .org, .net domain depends on a system administered in the US",
                },
                {
                  value: "1969",
                  label: isRo ? "Primul mesaj ARPANET — de la UCLA la Stanford, ambele din California" : "First ARPANET message — from UCLA to Stanford, both in California",
                  note: isRo ? "LO — primele două litere înainte ca sistemul să se blocheze" : "LO — the first two letters before the system crashed",
                },
              ].map((s, i) => (
                <div key={i} className="border-t border-white/5 pt-6">
                  <span className="font-macro-display text-5xl font-black text-[#E8B923] block mb-2">{s.value}</span>
                  <span className="text-base font-body text-white/80 block leading-snug mb-1">{s.label}</span>
                  <span className="text-sm font-body text-white/50">{s.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-32">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-6 font-semibold">
            {copy.galleryLabel}
          </p>
          <h2 className="font-macro-display text-4xl font-bold text-center mb-16 text-white uppercase tracking-tight">
            {copy.galleryTitle}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {copy.gallery.map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/2 flex flex-col hover:border-[#E8B923]/30 transition-all duration-500"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#030405] via-[#030405]/40 to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] font-mono text-[#E8B923] bg-black/60 backdrop-blur-sm border border-[#E8B923]/25 px-2.5 py-0.5 rounded uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col bg-black/20">
                  <h3 className="font-macro-display text-lg font-bold text-white mb-3 group-hover:text-[#E8B923] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-body flex-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Oracle */}
        <div className="mt-32">
          <AskAmericaCTA
            locale={locale}
            descriptionEn={copy.oracleDescription}
            descriptionRo={copy.oracleDescription}
          />
        </div>
      </div>
    </>
  );
}
