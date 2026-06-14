import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { Gamepad2, ExternalLink, Layers, Zap } from "lucide-react";
import {
  MacroStyles,
  MacroHero,
  CountUp,
} from "@/components/economy/EconomyAnimations";

export const metadata: Metadata = {
  title: "Gaming | Innovation & Technology",
  description:
    "How America invented the video game industry — from Atari's 1972 coin cabinet to Epic Games' Unreal Engine powering 50% of all games shipped globally.",
};

interface GamingCopy {
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
  dominanceLabel: string;
  dominanceTitle: string;
  dominanceParagraph1: string;
  dominanceParagraph2: string;
  dominanceSource: string;
  dominanceSourceUrl: string;
  engineLabel: string;
  engineTitle: string;
  engineParagraph1: string;
  engineParagraph2: string;
  engineLayers: Array<{ layer: string; title: string; items: string[] }>;
  videosLabel: string;
  videosTitle: string;
  videoItems: Array<{ title: string; description: string; videoSrc: string; tag: string }>;
  galleryLabel: string;
  galleryTitle: string;
  gallery: Array<{ tag: string; title: string; description: string; imageSrc: string }>;
  oracleDescription: string;
}

const copyEn: GamingCopy = {
  breadcrumbParent: "Innovation & Technology",
  breadcrumbPage: "Gaming",
  heroTagline: "INTERACTIVE ENTERTAINMENT",
  heroTitle: "America\nBuilt the Game",
  heroSubtitle:
    "How the United States invented the video game, built the platforms every studio runs on, and now controls the engine powering interactive entertainment worldwide.",
  thesisTitle: "America Invented the Video Game — and Owns Every Platform It Runs On",
  thesisParagraph1:
    "In 1972, Nolan Bushnell and Ted Dabney founded Atari in Sunnyvale, California, and released Pong — the world's first commercially successful video game. What began as a single coin-operated cabinet in a Silicon Valley bar became the foundation of the most profitable entertainment medium in human history. The global video game industry now generates more annual revenue than Hollywood film and the global music industry combined.",
  thesisParagraph2:
    "Today, the most critical platforms, engines, and intellectual properties in gaming are American-built. Microsoft's Xbox and Activision Blizzard control the largest gaming portfolio on Earth. Epic Games' Unreal Engine powers over 50% of all AAA titles shipped globally, collecting royalties from studios on every continent. Valve's Steam marketplace controls 90% of digital PC game sales. Riot Games' League of Legends remains the most-played PC game on Earth. America did not merely invent video games — it owns the infrastructure on which all of them run.",
  milestonesTitle: "The American Arcade",
  milestones: [
    {
      title: "Atari & Pong",
      date: "1972",
      details:
        "Nolan Bushnell founds Atari in Sunnyvale, California — the first commercially successful video game company. Pong becomes the world's first arcade hit. Within three years, Atari generates $40M in annual revenue and the entertainment software industry is born.",
    },
    {
      title: "The FPS Revolution",
      date: "1993",
      details:
        "id Software (Dallas, TX) releases Doom, defining the first-person shooter genre and proving that PC gaming can achieve mass-market scale. An estimated 10 million people play Doom within 24 months. Its open modding architecture becomes the template for community-driven game development.",
    },
    {
      title: "Steam & Digital Distribution",
      date: "2003",
      details:
        "Valve (Bellevue, WA) launches Steam, transforming how games are sold. What begins as an update client for Half-Life 2 becomes the dominant PC game platform, controlling ~90% of digital PC game sales and serving 132 million active users through American servers.",
    },
    {
      title: "Fortnite & Gaming as Platform",
      date: "2017 – Present",
      details:
        "Epic Games (Cary, NC) launches Fortnite Battle Royale, reaching 350 million registered accounts by 2020 and redefining gaming as a social platform. Epic's Unreal Engine 5 — the world's most advanced real-time rendering engine — powers titles from studios in 190 countries, with royalties flowing back to North Carolina.",
    },
  ],
  dominanceLabel: "THE AMERICAN PLATFORM LOCK",
  dominanceTitle: "US Studios Control Every Critical Layer of the Global Game Stack",
  dominanceParagraph1:
    "The video game industry's infrastructure is more thoroughly American than any other entertainment sector. The three largest game distribution platforms — Steam (Valve), Xbox Game Pass (Microsoft), and Epic Games Store (Epic) — are all headquartered in the United States. The two dominant game engines — Unreal Engine (Epic) and Unity (Unity Technologies, San Francisco) — are American. Every major Western console platform — Xbox — is American-built.",
  dominanceParagraph2:
    "Microsoft's $68.7 billion acquisition of Activision Blizzard in 2023 created the world's third-largest gaming company, combining Call of Duty, World of Warcraft, Overwatch, and Candy Crush under a single American balance sheet. Combined with first-party Xbox Game Studios, Microsoft now holds one of the largest collections of game intellectual property in existence. The entire value chain — from engine license to distribution cut to subscription revenue — is controlled in the United States.",
  dominanceSource: "Newzoo Global Games Market Report",
  dominanceSourceUrl: "https://newzoo.com/",
  engineLabel: "THE UNREAL MONOPOLY",
  engineTitle: "How Epic Built the Infrastructure of Interactive Reality",
  engineParagraph1:
    "Epic Games' Unreal Engine is to the gaming industry what CUDA is to artificial intelligence: a proprietary middleware layer so deeply embedded in global production pipelines that switching away is effectively impossible. Built in Cary, North Carolina, Unreal Engine powers over 50% of AAA game titles worldwide, along with cinematic visual effects (The Mandalorian), automotive visualization, and architectural rendering. Every studio that ships a game on Unreal owes Epic a 5% royalty on gross revenue above $1 million.",
  engineParagraph2:
    "Unreal Engine 5's flagship technologies — Nanite virtualized geometry and Lumen global illumination — set a technical standard that competitors require years to approach. The engine's Blueprint visual scripting system lowered the barrier for game development globally, expanding Epic's installed base to hundreds of thousands of studios while deepening platform lock-in. No government, no non-US company, and no open-source project has come close to matching it.",
  engineLayers: [
    {
      layer: "RENDER",
      title: "Real-Time Rendering",
      items: ["Nanite Virtualized Geometry", "Lumen Global Illumination", "Hardware Ray Tracing", "TSR Upscaling"],
    },
    {
      layer: "PHYSICS",
      title: "Simulation",
      items: ["Chaos Physics", "Rigid Body Dynamics", "Soft Body & Cloth", "Fluid Simulation"],
    },
    {
      layer: "ANIM",
      title: "Animation",
      items: ["Control Rig", "Motion Warping", "Full-Body IK", "Sequencer Cinematics"],
    },
    {
      layer: "AI",
      title: "Artificial Intelligence",
      items: ["Behavior Trees", "Mass AI (City Sample)", "EQS", "Navigation Mesh"],
    },
    {
      layer: "AUDIO",
      title: "Sound",
      items: ["MetaSounds", "Spatial Audio", "Procedural Sound", "Convolution Reverb"],
    },
    {
      layer: "DEPLOY",
      title: "Platform Targets",
      items: ["PC", "Console (Xbox / PS)", "Mobile", "XR / AR / VR", "Film & TV / ICVFX"],
    },
  ],
  videosLabel: "INTERACTIVE CINEMA",
  videosTitle: "The Art and Culture of American Gaming",
  videoItems: [
    {
      title: "Video Games: The Movie",
      description:
        "A documentary journey through the history of American gaming — from the arcade cabinets of Atari's Sunnyvale to the global esports arenas of today. Featuring the founders, designers, and executives who built the world's most lucrative entertainment industry from a single coin-operated machine.",
      videoSrc: "/videos/library/Technology/Video Games, the Movie.mp4",
      tag: "DOCUMENTARY",
    },
    {
      title: "The Call — League of Legends",
      description:
        "Riot Games' Season 2022 cinematic for League of Legends — one of the most-watched game trailers in history, produced entirely in-house by a studio born in Los Angeles. League of Legends has 150 million registered accounts and remains the most-played PC game on Earth, 14 years after its launch.",
      videoSrc: "/videos/library/Technology/The Call | Season 2022 Cinematic - League of Legends cinematic.mp4",
      tag: "RIOT GAMES",
    },
  ],
  galleryLabel: "THE AMERICAN STUDIOS",
  galleryTitle: "The Companies That Built Interactive Entertainment",
  gallery: [
    {
      tag: "Atari, 1972",
      title: "Where It All Started",
      description:
        "Atari's Pong cabinet — the world's first commercially successful video game — was placed in Andy Capp's Tavern in Sunnyvale, California, in November 1972. Within days it broke down: the coin box was overflowing with quarters. That moment marked the beginning of an industry that now generates more revenue annually than film and music combined.",
      imageSrc: "/images/library/Culture/Brand Ads/Asteroids-arcade-video-game.jpg",
    },
    {
      tag: "Namco / Midway, 1980",
      title: "Pac-Man and the Arcade Era",
      description:
        "Pac-Man's 1980 North American release — distributed by Midway, a Chicago company — became the highest-grossing arcade game in history, generating over $2.5 billion in quarters. The US arcade industry at its 1982 peak generated $8 billion annually — more than the entire Las Vegas casino industry at the time.",
      imageSrc: "/images/library/Culture/Brand Ads/Pac-Man-arcade-video-games-from-1980.jpg",
    },
    {
      tag: "EA Inc., Redwood City",
      title: "EA: The World's Largest Sports Game Publisher",
      description:
        "Electronic Arts — founded in 1982 in San Mateo, California by Trip Hawkins — became the world's largest sports game publisher, with FIFA, Madden NFL, and The Sims generating billions annually. EA's Redwood City campus is the headquarters of a company with $7.4 billion in annual revenue and sports franchises licensed across every major global league.",
      imageSrc: "/images/library/Technology/EA HQ campus logo.jpg",
    },
  ],
  oracleDescription:
    "Ask the AI Oracle about Atari's founding, the Doom engine's influence on FPS games, Valve's Steam monopoly, Epic's Unreal Engine royalties, or Riot Games' League of Legends global player base.",
};

const copyRo: GamingCopy = {
  breadcrumbParent: "Inovație și Tehnologie",
  breadcrumbPage: "Gaming",
  heroTagline: "DIVERTISMENT INTERACTIV",
  heroTitle: "America\na Creat Jocul",
  heroSubtitle:
    "Cum Statele Unite au inventat jocul video, au construit platformele pe care rulează fiecare studio și controlează acum motorul ce alimentează divertismentul interactiv la nivel global.",
  thesisTitle: "America a Inventat Jocul Video — și Deține Fiecare Platformă pe Care Rulează",
  thesisParagraph1:
    "În 1972, Nolan Bushnell și Ted Dabney au fondat Atari în Sunnyvale, California, și au lansat Pong — primul joc video comercial de succes din lume. Ceea ce a început ca un singur cabinet cu monede într-un bar din Silicon Valley a devenit fundația celui mai profitabil mediu de divertisment din istoria omenirii. Industria globală a jocurilor video generează acum mai mult venit anual decât filmul de la Hollywood și industria muzicală globală combinate.",
  thesisParagraph2:
    "Astăzi, cele mai critice platforme, motoare și proprietăți intelectuale din gaming sunt construite în America. Xbox și Activision Blizzard de la Microsoft controlează cel mai mare portofoliu de gaming de pe Pământ. Unreal Engine de la Epic Games alimentează peste 50% din toate titlurile AAA livrate global, colectând redevențe de la studiouri de pe fiecare continent. Platforma Steam a Valve controlează 90% din vânzările digitale de jocuri pe PC. League of Legends de la Riot Games rămâne cel mai jucat joc pe PC de pe Pământ. America nu a inventat doar jocurile video — deține infrastructura pe care toate rulează.",
  milestonesTitle: "Arcade-ul American",
  milestones: [
    {
      title: "Atari și Pong",
      date: "1972",
      details:
        "Nolan Bushnell fondează Atari în Sunnyvale, California — prima companie de jocuri video de succes comercial. Pong devine primul hit arcade din lume. În trei ani, Atari generează 40 de milioane de dolari în venituri anuale și industria software-ului de divertisment se naște.",
    },
    {
      title: "Revoluția FPS",
      date: "1993",
      details:
        "id Software (Dallas, TX) lansează Doom, definind genul first-person shooter și dovedind că gaming-ul pe PC poate atinge scară de masă. Circa 10 milioane de persoane joacă Doom în 24 de luni. Arhitectura sa deschisă de modding devine șablonul pentru dezvoltarea de jocuri condusă de comunitate.",
    },
    {
      title: "Steam și Distribuția Digitală",
      date: "2003",
      details:
        "Valve (Bellevue, WA) lansează Steam, transformând modul în care sunt vândute jocurile. Ceea ce începe ca un client de actualizare pentru Half-Life 2 devine platforma dominantă de jocuri pe PC, controlând ~90% din vânzările digitale și servind 132 de milioane de utilizatori activi.",
    },
    {
      title: "Fortnite și Gaming ca Platformă",
      date: "2017 – Prezent",
      details:
        "Epic Games (Cary, NC) lansează Fortnite Battle Royale, atingând 350 de milioane de conturi înregistrate până în 2020 și redefinind gaming-ul ca platformă socială. Unreal Engine 5 — cel mai avansat motor de randare în timp real din lume — alimentează titluri din studiouri din 190 de țări, cu redevențe care curg înapoi în Carolina de Nord.",
    },
  ],
  dominanceLabel: "CONTROLUL PLATFORMEI AMERICANE",
  dominanceTitle: "Studiourile SUA Controlează Fiecare Strat Critic al Stivei Globale de Gaming",
  dominanceParagraph1:
    "Infrastructura industriei jocurilor video este mai profund americană decât orice alt sector de divertisment. Cele trei cele mai mari platforme de distribuție a jocurilor — Steam (Valve), Xbox Game Pass (Microsoft) și Epic Games Store (Epic) — au sediul în Statele Unite. Cele două motoare dominante de jocuri — Unreal Engine (Epic) și Unity (San Francisco) — sunt americane. Fiecare platformă majoră de consolă occidentală — Xbox — este construită în America.",
  dominanceParagraph2:
    "Achiziția Activision Blizzard de 68,7 miliarde de dolari de către Microsoft în 2023 a creat a treia cea mai mare companie de gaming din lume, combinând Call of Duty, World of Warcraft, Overwatch și Candy Crush sub un singur bilanț american. Împreună cu Xbox Game Studios, Microsoft deține acum una dintre cele mai mari colecții de proprietate intelectuală de gaming existente. Întregul lanț valoric — de la licența motorului la comisionul de distribuție la venitul din abonament — este controlat în Statele Unite.",
  dominanceSource: "Raportul Global al Pieței de Jocuri Newzoo",
  dominanceSourceUrl: "https://newzoo.com/",
  engineLabel: "MONOPOLUL UNREAL",
  engineTitle: "Cum Epic a Construit Infrastructura Realității Interactive",
  engineParagraph1:
    "Unreal Engine de la Epic Games este pentru industria gaming-ului ceea ce CUDA este pentru inteligența artificială: un strat proprietar de middleware atât de profund integrat în fluxurile de producție globale încât trecerea la altceva este practic imposibilă. Construit în Cary, Carolina de Nord, Unreal Engine alimentează peste 50% din titlurile AAA mondiale, alături de efecte vizuale cinematice (The Mandalorian), vizualizare auto și randare arhitecturală.",
  engineParagraph2:
    "Tehnologiile emblematice ale Unreal Engine 5 — geometria virtualizată Nanite și iluminarea globală Lumen — stabilesc un standard tehnic pe care concurenții necesită ani pentru a-l atinge. Sistemul de scripting vizual Blueprint al motorului a coborât bariera pentru dezvoltarea de jocuri la nivel global, extinzând baza instalată Epic la sute de mii de studiouri, adâncind în același timp dependența de platformă.",
  engineLayers: [
    {
      layer: "RENDER",
      title: "Randare în Timp Real",
      items: ["Nanite Virtualized Geometry", "Lumen Global Illumination", "Hardware Ray Tracing", "TSR Upscaling"],
    },
    {
      layer: "FIZICĂ",
      title: "Simulare",
      items: ["Chaos Physics", "Rigid Body Dynamics", "Soft Body & Cloth", "Fluid Simulation"],
    },
    {
      layer: "ANIM",
      title: "Animație",
      items: ["Control Rig", "Motion Warping", "Full-Body IK", "Sequencer Cinematics"],
    },
    {
      layer: "AI",
      title: "Inteligență Artificială",
      items: ["Behavior Trees", "Mass AI (City Sample)", "EQS", "Navigation Mesh"],
    },
    {
      layer: "AUDIO",
      title: "Sunet",
      items: ["MetaSounds", "Spatial Audio", "Procedural Sound", "Convolution Reverb"],
    },
    {
      layer: "DEPLOY",
      title: "Platforme Țintă",
      items: ["PC", "Consolă (Xbox / PS)", "Mobil", "XR / AR / VR", "Film & TV / ICVFX"],
    },
  ],
  videosLabel: "CINEMA INTERACTIV",
  videosTitle: "Arta și Cultura Gaming-ului American",
  videoItems: [
    {
      title: "Jocuri Video: Filmul",
      description:
        "O călătorie documentară prin istoria gaming-ului american — de la cabinetele arcade ale Atari din Sunnyvale până la arenele globale de esports de astăzi. Cu fondatorii, designerii și directorii executivi care au construit cea mai lucrativă industrie de divertisment din lume dintr-o singură mașină cu monede.",
      videoSrc: "/videos/library/Technology/Video Games, the Movie.mp4",
      tag: "DOCUMENTAR",
    },
    {
      title: "The Call — League of Legends",
      description:
        "Cinematicul Sezonului 2022 de la Riot Games pentru League of Legends — unul dintre cele mai vizionate traileruri de jocuri din istorie, produs în întregime intern de un studio născut în Los Angeles. League of Legends are 150 de milioane de conturi înregistrate și rămâne cel mai jucat joc pe PC de pe Pământ, la 14 ani de la lansare.",
      videoSrc: "/videos/library/Technology/The Call | Season 2022 Cinematic - League of Legends cinematic.mp4",
      tag: "RIOT GAMES",
    },
  ],
  galleryLabel: "STUDIOURILE AMERICANE",
  galleryTitle: "Companiile Care au Construit Divertismentul Interactiv",
  gallery: [
    {
      tag: "Atari, 1972",
      title: "De Unde a Început Totul",
      description:
        "Cabinetul Pong al Atari — primul joc video comercial de succes din lume — a fost plasat în Andy Capp's Tavern din Sunnyvale, California, în noiembrie 1972. În câteva zile s-a defectat: cutia de monede era plină ochi. Acel moment a marcat începutul unei industrii care generează acum mai mult venit anual decât filmul și muzica combinate.",
      imageSrc: "/images/library/Culture/Brand Ads/Asteroids-arcade-video-game.jpg",
    },
    {
      tag: "Namco / Midway, 1980",
      title: "Pac-Man și Era Arcade",
      description:
        "Lansarea nord-americană a Pac-Man în 1980 — distribuită de Midway, o companie din Chicago — a devenit cel mai profitabil joc arcade din istorie, generând peste 2,5 miliarde de dolari în monede. Industria arcade din SUA la apogeul ei din 1982 genera 8 miliarde de dolari anual — mai mult decât întreaga industrie cazino din Las Vegas la acea vreme.",
      imageSrc: "/images/library/Culture/Brand Ads/Pac-Man-arcade-video-games-from-1980.jpg",
    },
    {
      tag: "EA Inc., Redwood City",
      title: "EA: Cel Mai Mare Editor de Jocuri Sportive",
      description:
        "Electronic Arts — fondată în 1982 în San Mateo, California, de Trip Hawkins — a devenit cel mai mare editor de jocuri sportive din lume, cu FIFA, Madden NFL și The Sims generând miliarde anual. Campusul EA din Redwood City este sediul unei companii cu 7,4 miliarde de dolari în venituri anuale și francize sportive licențiate în fiecare ligă globală majoră.",
      imageSrc: "/images/library/Technology/EA HQ campus logo.jpg",
    },
  ],
  oracleDescription:
    "Întreabă Oracolul AI despre fondarea Atari, influența motorului Doom asupra jocurilor FPS, monopolul Steam al Valve, redevențele Unreal Engine ale Epic sau baza globală de jucători League of Legends a Riot Games.",
};

export default async function GamingPage() {
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
        videoSrc="/videos/library/Technology/Video Games edit.mp4"
        imageSrc="/images/library/Technology/EA HQ campus logo.jpg"
        imageAlt="Electronic Arts campus logo"
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
                  $<CountUp value={184} suffix="B+" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "PIAȚA GLOBALĂ DE GAMING" : "GLOBAL GAMING MARKET"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo
                    ? "Venitul anual al industriei globale de jocuri video — mai mult decât filmul și muzica combinate"
                    : "Annual revenue of the global video game industry — more than film and music combined"}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={3.1} suffix="B+" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "JUCĂTORI GLOBALI" : "GLOBAL PLAYERS"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo
                    ? "Persoane care joacă jocuri video în mod regulat — marea majoritate pe platforme și motoare americane"
                    : "People who play video games regularly — the vast majority on American-built platforms and engines"}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={50} suffix="%+" />
                </span>
                <span className="macro-metadata mb-2">
                  {isRo ? "COTĂ UNREAL ENGINE" : "UNREAL ENGINE SHARE"}
                </span>
                <p className="text-sm text-white/60 max-w-xs leading-relaxed font-body">
                  {isRo
                    ? "Din toate titlurile AAA livrate global rulează pe Unreal Engine de la Epic Games din Carolina de Nord"
                    : "Of all AAA titles shipped globally run on Epic Games' Unreal Engine, built in North Carolina"}
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

        {/* US Dominance Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5">
          <span className="macro-eyebrow mb-3 block">{copy.dominanceLabel}</span>
          <h2 className="macro-section-title text-white mb-6">{copy.dominanceTitle}</h2>
          <p className="macro-body text-white/80 mb-6 max-w-4xl">{copy.dominanceParagraph1}</p>
          <p className="macro-body text-white/80 mb-8 max-w-4xl">{copy.dominanceParagraph2}</p>
          <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40 font-mono">
            <span>Source: {copy.dominanceSource}</span>
            <a
              href={copy.dominanceSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#E8B923] hover:underline"
            >
              {isRo ? "Verifică datele" : "Verify Data"}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>

        {/* Unreal Engine Section */}
        <section id="unreal-engine" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-32">
          <div className="border-t border-white/5 pt-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] font-semibold mb-3 flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#E8B923]" />
              {copy.engineLabel}
            </span>
            <h2 className="font-macro-display text-4xl font-bold text-white uppercase tracking-tight mb-8">
              {copy.engineTitle}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="font-macro-body text-white/80 text-lg leading-relaxed mb-6">
                  {copy.engineParagraph1}
                </p>
                <p className="font-macro-body text-white/80 text-lg leading-relaxed">
                  {copy.engineParagraph2}
                </p>
              </div>

              {/* Engine Stats */}
              <div className="flex flex-col gap-8 justify-center">
                {[
                  { value: "50%+",  label: isRo ? "Din titlurile AAA globale rulează pe Unreal" : "Of all global AAA titles run on Unreal Engine", note: isRo ? "Cel mai utilizat motor din industrie" : "The most-used engine in the industry" },
                  { value: "5%",    label: isRo ? "Redevență pe venitul brut al studiourilor" : "Royalty on studio gross revenue over $1M", note: isRo ? "Fiecare joc livrat aduce bani la Epic" : "Every shipped game sends royalties to Epic" },
                  { value: "190",   label: isRo ? "Țări cu studiouri ce folosesc Unreal" : "Countries with studios building on Unreal", note: isRo ? "Controlul platformei este global" : "Platform control is truly global" },
                  { value: "UE5",   label: isRo ? "Nanite + Lumen — standard de industrie neegalat" : "Nanite + Lumen — unmatched industry standard", note: isRo ? "Concurența are nevoie de ani pentru a apropia" : "Competitors need years to approach it" },
                ].map((s, i) => (
                  <div key={i} className="border-t border-white/5 pt-6">
                    <span className="font-macro-display text-5xl font-black text-[#E8B923] block mb-2">{s.value}</span>
                    <span className="text-base font-body text-white/80 block leading-snug mb-1">{s.label}</span>
                    <span className="text-sm font-body text-white/50">{s.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cinematic Video Showcase */}
        <section
          id="gaming-videos"
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

        {/* Studios Gallery */}
        <section id="studios" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 mb-32">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-6 font-semibold">
            {copy.galleryLabel}
          </p>
          <h2 className="font-macro-display text-4xl font-bold text-center mb-16 text-white uppercase tracking-tight">
            {copy.galleryTitle}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                  <div className="absolute inset-0 bg-linear-to-t from-[#000000] via-[#000000]/40 to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] font-mono text-[#E8B923] bg-black/60 backdrop-blur-sm border border-[#E8B923]/25 px-2.5 py-0.5 rounded uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
                <div className="p-8 flex-1 flex flex-col bg-black/20">
                  <h3 className="font-macro-display text-xl font-bold text-white mb-3 group-hover:text-[#E8B923] transition-colors">
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

        {/* Studios Overview — compact data row */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="border-t border-white/5 pt-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] font-semibold mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#E8B923]" />
              {isRo ? "CELE MAI MARI COMPANII AMERICANE DE GAMING" : "MAJOR AMERICAN GAMING COMPANIES"}
            </span>
            <h2 className="font-macro-display text-4xl font-bold text-white uppercase tracking-tight mb-10">
              {isRo ? "Stiva de Putere a Industriei" : "The Industry Power Stack"}
            </h2>
            <div className="divide-y divide-white/5">
              {[
                {
                  company: "Microsoft / Xbox",
                  hq: "Redmond, WA",
                  fact: isRo
                    ? "Xbox Game Studios + Activision Blizzard — achiziție de 68,7 mld. USD · Call of Duty, Halo, Forza, Minecraft"
                    : "Xbox Game Studios + Activision Blizzard — $68.7B acquisition · Call of Duty, Halo, Forza, Minecraft",
                },
                {
                  company: "Epic Games",
                  hq: "Cary, NC",
                  fact: isRo
                    ? "Unreal Engine · 50%+ din titlurile AAA globale · Fortnite, 350M conturi · royalty 5% pe venituri"
                    : "Unreal Engine · 50%+ of global AAA titles · Fortnite, 350M accounts · 5% gross revenue royalty",
                },
                {
                  company: "Valve",
                  hq: "Bellevue, WA",
                  fact: isRo
                    ? "Steam — 90% din vânzările digitale pe PC · 132M utilizatori activi · Half-Life, Counter-Strike, Dota 2"
                    : "Steam — 90% of digital PC game sales · 132M active users · Half-Life, Counter-Strike, Dota 2",
                },
                {
                  company: "Riot Games",
                  hq: "Los Angeles, CA",
                  fact: isRo
                    ? "League of Legends — 150M conturi înregistrate · cel mai jucat joc PC pe Pământ · Valorant, Teamfight Tactics"
                    : "League of Legends — 150M registered accounts · most-played PC game on Earth · Valorant, Teamfight Tactics",
                },
                {
                  company: "Electronic Arts",
                  hq: "Redwood City, CA",
                  fact: isRo
                    ? "7,4 mld. USD venituri anuale · EA Sports FC, Madden NFL, The Sims, Battlefield, Apex Legends"
                    : "$7.4B annual revenue · EA Sports FC, Madden NFL, The Sims, Battlefield, Apex Legends",
                },
                {
                  company: "Unity Technologies",
                  hq: "San Francisco, CA",
                  fact: isRo
                    ? "Motor nr. 2 după Unreal · domină gaming-ul mobil · 70%+ din primele 1000 de jocuri mobile folosesc Unity"
                    : "#2 engine after Unreal · dominates mobile gaming · 70%+ of top 1000 mobile games built on Unity",
                },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-8 py-7">
                  <span className="font-macro-display text-2xl font-bold text-[#E8B923]/30 w-10 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-3 mb-2">
                      <p className="font-macro-display text-2xl font-bold text-white">{row.company}</p>
                      <span className="text-sm font-body text-white/50">{row.hq}</span>
                    </div>
                    <p className="text-sm font-body text-white/65 leading-relaxed">{row.fact.replace(/ · /g, "  ·  ")}</p>
                  </div>
                </div>
              ))}
            </div>
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
