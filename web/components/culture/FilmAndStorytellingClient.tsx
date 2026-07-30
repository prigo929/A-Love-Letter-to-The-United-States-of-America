"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  Tv,
  Layers,
  Compass,
  Music,
  Maximize2,
  Home,
  ChevronRight,
  Clapperboard,
} from "lucide-react";
import { GalleryImage } from "@/lib/data/gallery";
import { CultureStyles } from "./CulturePageComponents";
import { SITE_IMAGES } from "@/lib/site-images";
import { MacroStyles, MacroHero } from "@/components/economy/EconomyAnimations";

interface FilmAndStorytellingClientProps {
  filmImages: GalleryImage[];
  isRo?: boolean;
  hollywoodData: {
    eyebrow: string;
    headline: string;
    pullQuote: string;
    body: string;
    stats: Array<{ value: string; label: string }>;
  };
  /** When true (default), renders the MacroHero, CultureStyles, MacroStyles header */
  showHero?: boolean;
  /** When true (default), renders the bottom back/next nav links */
  showBottomNav?: boolean;
}

export function FilmAndStorytellingClient({
  filmImages,
  isRo = false,
  hollywoodData,
  showHero = true,
  showBottomNav = true,
}: FilmAndStorytellingClientProps) {
  const [selectedMovie, setSelectedMovie] = useState<GalleryImage | null>(null);

  // Handle escape key to exit modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedMovie) setSelectedMovie(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMovie]);

  const content = {
    epochsLabel: isRo ? "PELICULA AMERICII · 1920–PREZENT" : "THE FILM OF AMERICA · 1920–PRESENT",
    epochsTitle: isRo ? "EPOCILE CINEMATOGRAFICE" : "THE CINEMATIC EPOCHS",
    epochsSub: isRo
      ? "Cum competiția liberă și riscul tehnic au remodelat formele narative ale planetei."
      : "How free competition and technical risk-taking reshaped the planet's narrative forms.",

    grammarLabel: isRo ? "SINTAXA VIZUALĂ" : "THE VISUAL SYNTAX",
    grammarTitle: isRo ? "CUM VISEAZĂ PLANETA" : "HOW THE PLANET DREAMS",
    grammarSub: isRo
      ? "Structurile gramaticale pe care Hollywood le-a standardizat într-o monedă universală a atenției."
      : "The grammatical structures Hollywood standardized into a universal currency of attention.",

    auteursTitle: isRo ? "AUTORII LEGENDARI" : "THE LEGENDARY AUTEURS",
    auteursSub: isRo
      ? "Regizorii vizionari care au modelat subconștientul colectiv global prin semnături artistice distincte."
      : "The visionary directors who shaped the global collective subconscious through distinct artistic signatures.",
    auteursSignature: isRo ? "Semnătură vizuală:" : "Visual Signature:",
    auteursMasterpieces: isRo ? "Filme de referință:" : "Key Masterpieces:",

    frameTitle: isRo ? "ANATOMIA UNUI CADRU" : "ANATOMY OF A FRAME",
    frameSub: isRo
      ? "Cum transmit regizorii idei subconștiente prin scară optică, unghiuri și geometrie."
      : "How directors communicate subconscious ideas through optical scale, angles, and geometry.",
    frameTechnique: isRo ? "Metodă tehnică:" : "Technical Method:",
    frameExample: isRo ? "Exemple clasice:" : "Classic Examples:",

    posterTitle: isRo ? "ARHIVA DE POSTERE" : "THE POSTER VAULT",
    posterSub: isRo
      ? "Apasă pe orice poster pentru a analiza inovația tehnică și narativă din spatele capodoperei."
      : "Click any theatrical poster to analyze the technical and storytelling breakthrough behind the masterpiece.",
    modalDirector: isRo ? "Regizor" : "Director",
    modalYear: isRo ? "An lansare" : "Release Year",
    modalRuntime: isRo ? "Durată" : "Runtime",
    modalBreakthrough: isRo ? "Inovație cheie" : "Key Cinematic Breakthrough",
    closeBtn: isRo ? "Închide" : "Close",
    ticketStubTitle: isRo ? "BILET DE CINEMA · ADMIS UNUL" : "CINEMA · ADMIT ONE",
    backLink: isRo ? "← Înapoi la Prezentare Generală" : "← Back to Overview",
    nextLink: isRo ? "Sportul American →" : "American Sports →",
    breakthroughsLabel: isRo ? "Inovații industriale și artistice" : "Industrial & Artistic Breakthroughs",
  };

  const eras = [
    {
      num: "01",
      span: isRo ? "1920 – 1950" : "1920 – 1950",
      title: isRo ? "Epoca de Aur" : "The Golden Age",
      headline: isRo ? "Sistemul de Studiouri și Montajul de Continuitate" : "The Studio System & Continuity",
      image: "/images/library/Culture/Cinema/Golden Age of Hollywood different people.png",
      desc: isRo
        ? "Dezvoltat în timpul ascensiunii marilor studiouri din Los Angeles, acest sistem a creat regulile gramaticale fundamentale ale filmului. Principiul montajului invizibil a creat o continuitate perfectă a spațiului și timpului, atrăgând publicul în poveste fără să observe tăieturile."
        : "Developed during the rise of Los Angeles' major studios, this era established the fundamental grammatical rules of cinema. The principle of invisible editing constructed a seamless continuity of space and time, pulling audiences into narratives without notice.",
      keyTech: isRo
        ? ["Regula de 180 de grade pentru convergența privirilor", "Sistemul contractelor de exclusivitate cu mari actori", "Inovația culorilor prin Technicolor în 3 benzi", "Standardizarea genurilor (Western, Noir, Musical)"]
        : ["The 180-Degree Rule for seamless eye-line matching", "Exclusive star-contract studio roster system", "Technicolor 3-strip chemistry and visual saturation", "Classic genre formulas (Westerns, Noir, Musicals)"],
      quote: isRo ? "Cinemaul nu este o felie de viață, ci o felie de tort." : "Cinema is not a slice of life, it's a piece of cake.",
      quoteAuthor: "Alfred Hitchcock",
    },
    {
      num: "02",
      span: isRo ? "1960 – 1970" : "1960 – 1970",
      title: isRo ? "Noul Hollywood" : "New Hollywood",
      headline: isRo ? "Auterii și Deconstrucția Miturilor" : "Auteurs & Deconstructed Myths",
      image: "/images/library/Culture/Cinema/Bonnie_and_Clyde_(1967_promo_photo_-_Dunaway_&_Beatty).jpg",
      desc: isRo
        ? "Odată cu prăbușirea vechiului cod de cenzură, o nouă generație de regizori instruiți în școli de film a preluat frâiele. Influențați de modernismul european, au deconstruit genurile clasice și au înlocuit eroii ideali cu anti-eroi complecși pe fundalul realității urbane."
        : "With the collapse of the old censorship code, a new wave of film-school educated directors took creative control. Inspired by European modernism, they deconstructed classic genres, replacing idealized heroes with complex, morally gray anti-heroes set in gritty realism.",
      keyTech: isRo
        ? ["Auterismul: controlul creativ deplin al regizorului", "Filmări pe străzi reale în loc de decoruri de studio", "Ambiguitate morală și finaluri deschise", "Montaj experimental (jump cuts, montaj sonor)"]
        : ["Auteur Theory: absolute creative dominance of the director", "Location shooting on real streets instead of studio backlots", "Moral ambiguity and open-ended narrative resolutions", "Experimental editing (jump cuts, overlapping soundscapes)"],
      quote: isRo ? "Cel mai practic lucru pe care îl poți face în artă este să îți urmezi intuiția." : "The most businesslike thing you can do in art is to follow your own intuition.",
      quoteAuthor: "Francis Ford Coppola",
    },
    {
      num: "03",
      span: isRo ? "1980 – Prezent" : "1980 – Present",
      title: isRo ? "Blockbuster & Digital" : "Blockbuster & Digital",
      headline: isRo ? "Spectacolul High-Concept și CGI" : "High-Concept Spectacle & CGI",
      image: "/images/library/Culture/Cinema/movies-before-after-green-screen-cgi-avengers-1.jpg",
      desc: isRo
        ? "Începând cu Jaws și Star Wars, Hollywood a perfecționat filmul de tip eveniment global. Narațiunile au devenit „high-concept” (ușor de explicat într-o propoziție), iar apariția efectelor digitale (CGI) a transformat ecranul într-o pânză a imaginației nelimitate, accesibilă oricărei limbi."
        : "Pivoting with Jaws and Star Wars, Hollywood mastered the global event movie. Narratives were built around clear, 'high-concept' premises easily pitched in a single sentence, while computer-generated imagery (CGI) turned screens into spaces of limitless sensory fantasy.",
      keyTech: isRo
        ? ["CGI de ultimă generație și mapare digitală a mișcării", "Macro-narațiuni (universuri cinematografice extinse)", "Sisteme de sunet multi-canal Dolby Atmos & IMAX", "Strategii de marketing global simultan"]
        : ["State-of-the-art CGI, rendering, and performance capture", "Macro-storytelling (interconnected cinematic universes)", "Dolby Atmos multi-channel surround and IMAX format scale", "Simultaneous worldwide multi-platform saturation releases"],
      quote: isRo ? "De fiecare dată când merg la un film, este ceva magic, indiferent despre ce e vorba." : "Every time I go to a movie, it's magic, no matter what the movie's about.",
      quoteAuthor: "Steven Spielberg",
    },
  ];

  const grammarCards = [
    {
      icon: <Layers className="w-6 h-6" />,
      title: isRo ? "Montajul Paralel (Cross-Cutting)" : "Parallel Editing",
      text: isRo
        ? "Prezentarea a două acțiuni în locuri diferite simultan. Această invenție gramaticală timpurie a permis Hollywood-ului să creeze tensiune și suspans extrem, stabilind ritmul de bază pentru thrillere și filme de acțiune."
        : "Showing two separate actions in different locations simultaneously. This early grammatical invention allowed Hollywood to engineer supreme suspense, establishing the fundamental pacing of thrillers and action sequences.",
      example: "Inception, The Godfather (Christening scene)",
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: isRo ? "Monomitul: Călătoria Eroului" : "The Hero's Journey",
      text: isRo
        ? "Structurarea scenariilor pe baza etapelor mitologice identificate de Joseph Campbell (Plecare, Inițiere, Întoarcere). Această rețetă oferă filmelor rezonanță emoțională universală în orice cultură."
        : "Structuring screenplays around Joseph Campbell's universal mythological stages (Departure, Initiation, Return). This structural blueprint gives movies intuitive emotional resonance across all human cultures.",
      example: "Star Wars, The Matrix, The Lion King",
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: isRo ? "Leitmotivul Muzical" : "The Musical Leitmotif",
      text: isRo
        ? "Asocierea unor teme orchestrale specifice fiecărui personaj sau concept. Adaptat din opera wagneriană, acest truc ghidează subconștientul spectatorului, dând o identitate sonoră memorabilă filmelor."
        : "Assigning specific orchestral signatures to characters, themes, or objects. Adapted from Wagnerian opera, this system guides the viewer's subconscious, creating instant auditory recognition.",
      example: "Jaws, Star Wars (John Williams), Inception (Hans Zimmer)",
    },
    {
      icon: <Tv className="w-6 h-6" />,
      title: isRo ? "Narațiunea High-Concept" : "High-Concept Narrative",
      text: isRo
        ? "Construirea poveștii în jurul unui sâmbure narativ atât de simplu și vizual încât poate fi explicat într-o singură propoziție. Aceasta permite traducerea facilă pe piețele externe, fără bariere culturale."
        : "Designing movies around a hook so simple and highly visual it can be fully pitched in a single sentence. This streamlines cross-border distribution and eliminates semantic barriers for global crowds.",
      example: 'Jurassic Park ("Cloned dinosaurs run loose in an island theme park")',
    },
  ];

  const auteurs = [
    {
      name: "Steven Spielberg",
      title: isRo ? "Maestrul Miracolului" : "Master of Wonder & Spectacle",
      bio: isRo
        ? "Regizorul definitoriu al cinematografiei moderne. Spielberg a modelat formatul blockbusterului de vară, îmbinând inovațiile tehnice masive cu empatia umană profundă, inocența copilăriei și temele istorice dramatice."
        : "The defining director of modern cinema. Spielberg masterminded the summer blockbuster template, blending massive technical scale with deep human empathy, childhood wonder, and historic drama.",
      signature: isRo
        ? "Cadre luate de jos sugerând uimirea copilărească, urmăriri complexe de cameră, culori calde."
        : "Low-angle child-like wonder frames, complex camera tracking shots, warm backlighting.",
      masterpieces: ["Jaws", "E.T.", "Schindler's List", "Saving Private Ryan"],
    },
    {
      name: "Martin Scorsese",
      title: isRo ? "Arhitectul Realismului Brut" : "Architect of Underworld Realism",
      bio: isRo
        ? "Cronicarul subconștientului urban și al gangsterilor americani. Scorsese explorează vinovăția, lăcomia, mântuirea și cultura italo-americană folosind un stil vizual hiper-dinamic și editare extrem de alertă."
        : "The chronicler of urban anxiety and the American underworld. Scorsese explores guilt, greed, redemption, and Italian-American identity through hyper-kinetic camerawork and high-tempo editing.",
      signature: isRo
        ? "Whip-pans rapide, narațiuni suprapuse (voiceover), freeze-frame-uri și cadre secvență extrem de lungi."
        : "Rapid whip-pans, extensive voiceover narration, freeze-frames, and ultra-long tracking shots.",
      masterpieces: ["Taxi Driver", "Raging Bull", "Goodfellas", "The Departed"],
    },
    {
      name: "Stanley Kubrick",
      title: isRo ? "Simetrie și Precizie" : "Symmetry, Philosophy & Precision",
      bio: isRo
        ? "Filozoful perfecționist al lentilei. Kubrick a forțat limitele tehnice și compoziționale ale camerei, oferind analize reci, simetrice și profunde despre condiția umană, nebunie, violență și viitor."
        : "The perfectionist philosopher of the frame. Kubrick pushed optical and technical boundaries to their limits, presenting symmetrical, cerebral investigations into human nature, madness, and technology.",
      signature: isRo
        ? "Perspectivă cu punct de fugă central, mișcări perfect orizontale de traveling, muzică clasică epică."
        : "One-point perspective symmetry, slow and steady tracking dollies, epic classical scores.",
      masterpieces: ["Dr. Strangelove", "2001: A Space Odyssey", "A Clockwork Orange", "The Shining"],
    },
    {
      name: "Francis Ford Coppola",
      title: isRo ? "Măreție Operatică" : "Operatic Grandeur & Tragedy",
      bio: isRo
        ? "Forța creativă a revoluției cinematografice din anii '70. Coppola a reinventat epopeea de familie și miturile violenței americane prin drame masive caracterizate de o estetică operatică teatrală."
        : "The creative titan of 1970s artistic independence. Coppola reinvented the family epic and the mythology of American violence through grand, operatic dramas defined by theatrical aesthetic scale.",
      signature: isRo
        ? "Umbre chiaroscuro dramatice, dizolvări picturale între cadre, montaj paralel epic."
        : "Dramatic chiaroscuro shadow play, pictorial cross-dissolves, epic parallel montage.",
      masterpieces: ["The Godfather I & II", "The Conversation", "Apocalypse Now"],
    },
    {
      name: "Alfred Hitchcock",
      title: isRo ? "Maestrul Suspansului" : "Master of Psychological Suspense",
      bio: isRo
        ? "Regizorul care a transformat structura camerei într-un instrument de control al anxietății. Hitchcock a formalizat gramatica suspansului, transformând voyeurismul și paranoia în spectacol artistic."
        : "The director who turned the camera lens into a mechanism of pure anxiety control. Hitchcock formalized the rules of suspense, transforming voyeurism and paranoia into high art.",
      signature: isRo
        ? "Cadre subiective din unghiul personajului, asocieri de montaj rapid, concepte tip „MacGuffin”."
        : "Subjective point-of-view angles, rapid associative montage sequences, 'MacGuffin' plot engines.",
      masterpieces: ["Rear Window", "Vertigo", "North by Northwest", "Psycho"],
    },
  ];

  const compositions = [
    {
      title: isRo ? "Orizontul Larg" : "The Wide Horizon",
      rationale: isRo ? "Libertate și Izolare la Frontieră" : "Frontier Freedom & Isolation",
      desc: isRo
        ? "Încadrarea subiectului ca un detaliu minuscul pe fundalul unui peisaj grandios. Această compoziție reflectă scara imensă a geografiei americane, simbolizând atât libertatea supremă, cât și izolarea copleșitoare."
        : "Framing a human subject as a tiny spec against a massive environment. This scale matches the physical geography of the American continent, representing both boundless individual freedom and absolute isolation.",
      technique: isRo ? "Obiectiv grandangular, linie de orizont joasă, profunzime mare de focalizare." : "Wide-angle lens, low horizon line, deep focus depth-of-field.",
      example: "The Searchers (John Ford), Paris, Texas (Wim Wenders)",
    },
    {
      title: isRo ? "Unghiul Înclinat" : "The Dutch Angle",
      rationale: isRo ? "Paranoia și Colaps Moral" : "Moral Disorientation & Paranoia",
      desc: isRo
        ? "Înclinarea axei orizontale a camerei pentru a crea un cadru dezechilibrat. Cadrul comunică subconștient panică mentală, anxietate, dezorientare și sentimentul că realitatea s-a destabilizat complet."
        : "Tilting the camera's horizontal axis to create an unbalanced frame. This angle communicates mental disorientation, paranoia, fear, and the structural collapse of a character's reality.",
      technique: isRo ? "Înclinarea laterală a capului de trepied, linii diagonale dominante." : "Roll axis tilt, dominant diagonal guidelines, unbalanced framing vectors.",
      example: "The Third Man, Mission: Impossible (De Palma)",
    },
    {
      title: isRo ? "Dolly Zoom (Vertigo)" : "The Dolly Zoom",
      rationale: isRo ? "Șoc Subconștient Brusc" : "Subconscious Shock & Vertigo",
      desc: isRo
        ? "Deplasarea fizică a camerei spre subiect în timp ce se face zoom-out optic (sau invers). Subiectul rămâne de aceeași dimensiune în timp ce perspectiva fundalului se strânge sau se extinde spectaculos, redând un atac de panică vizual."
        : "Moving the camera physically while zooming the lens in the opposite direction. The subject stays static while the background perspective rapidly expands or compresses, mimicking an internal panic attack.",
      technique: isRo ? "Tragere fizică pe șine (dolly) sincronizată electronic cu schimbarea zoomului." : "Synchronized camera carriage movement and optical focal length adjustment.",
      example: "Vertigo (Hitchcock), Jaws (Spielberg)",
    },
    {
      title: isRo ? "Cadrul de Jos (Hero Shot)" : "The Low-Angle Hero Shot",
      rationale: isRo ? "Putere, Dominanță și Statut" : "Power, Dominance & Mythic Status",
      desc: isRo
        ? "Amplasarea camerei aproape de sol, orientată în sus spre personaj. Forțează privitorul să ridice privirea, inducând subconștient o percepție de măreție, autoritate, pericol sau statură mitică."
        : "Placing the camera low to the ground and tilting upward toward a subject. This forces the audience to physically look up, inducing subconscious feelings of authority, power, danger, or mythic status.",
      technique: isRo ? "Poziționare joasă, obiectiv grandangular pentru accentuarea înălțimii." : "Low tripod index, upward tilt, wide-angle lens scaling to exaggerate dimensions.",
      example: "Citizen Kane (Welles), Pulp Fiction (Tarantino)",
    },
  ];

  // Dynamic viewfinder graphic per composition (dark-section only)
  const renderViewfinder = (index: number) => (
    <div className="relative w-full aspect-16/10 bg-black/40 border border-white/10 rounded-xl overflow-hidden mb-6 flex items-center justify-center group-hover:border-glory-gold/30 transition-colors duration-300">
      <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-white/20 group-hover:border-glory-gold/50 transition-colors duration-300" />
      <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-white/20 group-hover:border-glory-gold/50 transition-colors duration-300" />
      <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-white/20 group-hover:border-glory-gold/50 transition-colors duration-300" />
      <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-white/20 group-hover:border-glory-gold/50 transition-colors duration-300" />
      <span className="text-white/10 group-hover:text-glory-gold/30 font-sans text-sm select-none pointer-events-none transition-colors duration-300">+</span>

      {index === 0 && (
        <svg className="w-3/4 h-3/4 text-white/10 group-hover:text-glory-gold/25 transition-all duration-500 group-hover:scale-[1.03]" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1">
          <line x1="5" y1="42" x2="95" y2="42" />
          <path d="M 5,42 L 25,28 L 50,38 L 75,22 L 95,42" strokeDasharray="2 2" />
          <circle cx="50" cy="39" r="1.5" fill="currentColor" />
        </svg>
      )}
      {index === 1 && (
        <svg className="w-3/4 h-3/4 text-white/10 group-hover:text-glory-gold/25 transition-all duration-500 group-hover:scale-[1.03] rotate-12 group-hover:rotate-15" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="15" y="12" width="70" height="36" strokeDasharray="3 3" />
          <line x1="5" y1="20" x2="95" y2="45" strokeWidth="1.2" />
          <path d="M 45,35 L 45,22 L 55,22 L 55,35 Z" fill="currentColor" fillOpacity="0.05" />
        </svg>
      )}
      {index === 2 && (
        <svg className="w-3/4 h-3/4 text-white/10 group-hover:text-glory-gold/25 transition-all duration-500 group-hover:scale-[1.03]" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="8" y="6" width="84" height="48" opacity="0.2" />
          <rect x="22" y="15" width="56" height="30" opacity="0.4" />
          <rect x="38" y="24" width="24" height="12" opacity="0.7" />
          <line x1="8" y1="6" x2="38" y2="24" />
          <line x1="92" y1="6" x2="62" y2="24" />
          <line x1="8" y1="54" x2="38" y2="36" />
          <line x1="92" y1="54" x2="62" y2="36" />
          <path d="M 50,7 L 50,14 M 47,11 L 50,14 L 53,11" strokeWidth="1.2" className="animate-pulse" />
          <path d="M 50,53 L 50,46 M 47,49 L 50,46 L 53,49" strokeWidth="1.2" className="animate-pulse" />
        </svg>
      )}
      {index === 3 && (
        <svg className="w-3/4 h-3/4 text-white/10 group-hover:text-glory-gold/25 transition-all duration-500 group-hover:scale-[1.03]" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1">
          <line x1="12" y1="60" x2="42" y2="5" />
          <line x1="88" y1="60" x2="58" y2="5" />
          <path d="M 40,55 L 45,30 L 35,24 L 50,8 L 65,24 L 55,30 L 60,55 Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M 50,4 L 46,8 M 50,4 L 54,8" strokeWidth="1.2" />
        </svg>
      )}
    </div>
  );

  // Movie metadata for poster modal
  const getMovieExtraData = (path: string) => {
    const p = path.toLowerCase();
    if (p.includes("blade runner")) {
      return {
        director: "Ridley Scott", year: "1982", genre: "Sci-Fi / Neo-Noir", runtime: "117 min",
        innovationTitle: isRo ? "Estetică Cyberpunk & Worldbuilding" : "Cyberpunk Aesthetic & Worldbuilding",
        innovationText: isRo
          ? "Blade Runner a redefinit modul în care cinematografia imaginează viitorul. Splicing-ul dintre neonul japonez, ploaia continuă din Los Angeles și arhitectura retro-fitted a creat modelul vizual pentru întregul gen cyberpunk."
          : "Blade Runner redefined how cinema imagines the future. Splicing Japanese neon, continuous Los Angeles rain, and retro-fitted architecture, it established the visual template for the entire cyberpunk genre.",
      };
    }
    if (p.includes("goodfellas")) {
      return {
        director: "Martin Scorsese", year: "1990", genre: isRo ? "Biografic / Crimă" : "Biographical / Crime", runtime: "145 min",
        innovationTitle: isRo ? "Montaj Hiperkinetic & Narațiune Voiceover" : "Hyper-Kinetic Editing & Voiceover",
        innovationText: isRo
          ? "Goodfellas a spart structurile narative liniare prin utilizarea cadrelor înghețate (freeze-frames), tăieturilor rapide de montaj și a narațiunii suprapuse dinamice, influențând zeci de regizori moderni."
          : "Goodfellas shattered linear narrative structures through dynamic freeze-frames, rapid whip-pan edits, and overlapping double voiceover narration, shaping decades of modern filmmaking.",
      };
    }
    if (p.includes("interstellar")) {
      return {
        director: "Christopher Nolan", year: "2014", genre: isRo ? "Sci-Fi / Aventură" : "Sci-Fi / Adventure", runtime: "169 min",
        innovationTitle: isRo ? "Fizică Teoretică & Emoție la Scară Cosmică" : "Theoretical Physics & Cosmic Emotion",
        innovationText: isRo
          ? "Filmul a colaborat îndeaproape cu astrofizicianul Kip Thorne pentru a crea prima reprezentare vizuală precisă din punct de vedere științific a unei găuri negre supermasive (Gargantua), randată pe baza ecuațiilor relativității generale."
          : "The film collaborated closely with astrophysicist Kip Thorne to build the first scientifically accurate visual model of a supermassive black hole (Gargantua), rendered using general relativity equations.",
      };
    }
    if (p.includes("avengers") || p.includes("endgame")) {
      return {
        director: "Anthony & Joe Russo", year: "2019", genre: "Action / Sci-Fi", runtime: "181 min",
        innovationTitle: isRo ? "Macro-Narațiune de Univers Interconectat" : "Interconnected Shared Universe",
        innovationText: isRo
          ? "Reprezintă apogeul unui experiment narativ fără precedent: interconectarea a 22 de filme diferite pe parcursul a 11 ani într-o singură macro-narațiune coerentă și profitabilă la nivel global."
          : "Represents the absolute peak of an unprecedented storytelling experiment: interconnecting 22 separate films over 11 years into a single, cohesive, globally dominant narrative arc.",
      };
    }
    if (p.includes("saving private ryan")) {
      return {
        director: "Steven Spielberg", year: "1998", genre: isRo ? "Dramă / Război" : "Drama / War", runtime: "169 min",
        innovationTitle: isRo ? "Realismul Combativ & Unghiul Obturatorului" : "Combat Realism & Shutter Angle",
        innovationText: isRo
          ? "Spielberg a desincronizat obturatorul camerei la 45 sau 90 de grade în loc de standardul de 180, eliminând neclaritatea de mișcare pentru a reda explozii și lupte cu o claritate stroboscopică, viscerală și copleșitoare."
          : "Spielberg desynchronized the camera shutter to 45 or 90 degrees instead of the 180-degree standard, stripping motion blur to render explosions and flying shrapnel with stroboscopic, visceral clarity.",
      };
    }
    if (p.includes("dark knight")) {
      return {
        director: "Christopher Nolan", year: "2008", genre: isRo ? "Acțiune / Thriller" : "Action / Thriller", runtime: "152 min",
        innovationTitle: isRo ? "Cinema cu Supereroi în Format IMAX" : "Comic Book Cinema in IMAX Scale",
        innovationText: isRo
          ? "Primul lungmetraj major de ficțiune care a folosit camere native IMAX de 70mm pentru secvențe de acțiune cheie, ridicând cinematografia cu supereroi la rangul de tragedie urbană shakespeariană."
          : "The first major narrative feature to utilize native 70mm IMAX cameras for key action sequences, elevating comic-book adaptations into high-stakes, grand-scale urban tragedies.",
      };
    }
    if (p.includes("matrix")) {
      return {
        director: "Lana & Lilly Wachowski", year: "1999", genre: isRo ? "Sci-Fi / Acțiune" : "Sci-Fi / Action", runtime: "136 min",
        innovationTitle: isRo ? "Bullet-Time & Coregrafia Digitală" : "Bullet-Time & Cyberpunk Philosophy",
        innovationText: isRo
          ? "Introducerea efectului revoluționar „bullet-time” (folosind zeci de camere fixe declanșate secvențial) a permis camerei să se miște în timp real în jurul personajelor înghețate într-o mișcare ultra-lentă."
          : "The introduction of the revolutionary 'bullet-time' effect (using a circular array of still cameras triggered sequentially) allowed the camera to orbit characters frozen in hyper-slow motion.",
      };
    }
    if (p.includes("titanic")) {
      return {
        director: "James Cameron", year: "1997", genre: isRo ? "Dramă / Romantic" : "Drama / Romance", runtime: "194 min",
        innovationTitle: isRo ? "Simulări de Mulțime & Producție la Scară Gigantă" : "Digital Crowd Simulation & Epic Scale",
        innovationText: isRo
          ? "Filmul a dezvoltat software specializat de simulare a mulțimilor umane pentru a popula nava digitală în timpul scufundării, îmbinând modelarea fizică la scară reală cu efectele digitale de ultimă generație."
          : "The film developed pioneering software for human crowd simulation to populate the digital ship during sinking, merging real-scale physical models with cutting-edge digital composites.",
      };
    }
    return {
      director: "Hollywood Director", year: "Classic", genre: isRo ? "Cinematografie" : "Cinematography", runtime: "N/A",
      innovationTitle: isRo ? "Inovație Americană" : "American Innovation",
      innovationText: isRo ? "Inovație tehnică și narativă majoră." : "Major technical and narrative innovation.",
    };
  };

  return (
    <div className={showHero ? "culture-bg text-[#F5EDD8] min-h-screen relative overflow-hidden" : "text-[#F5EDD8] relative overflow-hidden"}>
      {showHero && <CultureStyles />}
      {showHero && <MacroStyles />}

      {/* ── Cinematic Hero (dark): only shown when standalone ────────── */}
      {showHero && (
        <MacroHero
          eyebrow={hollywoodData.eyebrow}
          titleLead={hollywoodData.headline}
          titleAccent=""
          description={isRo
            ? "Hollywood-ul a generat codul vizual prin care întreaga planetă își spune poveștile, își expune valorile și își imaginează viitorul."
            : "Hollywood generated the visual syntax through which the entire planet tells its stories, projects its values, and dreams of the future."}
          imageSrc={SITE_IMAGES.culture.hollywoodSign}
          imageAlt="Hollywood sign sunset"
          stats={hollywoodData.stats.map((s) => ({ value: s.value, label: s.label }))}
        />
      )}

      {/* ── Editorial Thesis + gradient: only when standalone ──────────── */}
      {showHero && (
        <>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-24">
            <nav
              aria-label={isRo ? "Fir de navigare" : "Breadcrumb"}
              className="flex items-center gap-1.5 font-body text-sm text-white/50 tracking-wide mb-14"
            >
              <Link href="/" className="hover:text-white transition-colors flex items-center">
                <Home className="h-3.5 w-3.5" />
              </Link>
              <ChevronRight className="h-3 w-3 opacity-30 shrink-0" />
              <Link href="/culture" className="hover:text-white transition-colors">
                {isRo ? "Cultură" : "Culture"}
              </Link>
              <ChevronRight className="h-3 w-3 opacity-30 shrink-0" />
              <span className="text-white font-medium">
                {isRo ? "Film & Divertisment" : "Film \u0026 Entertainment"}
              </span>
            </nav>

            <div className="grid gap-12 lg:grid-cols-3 items-start">
              <div className="lg:col-span-2">
                <blockquote className="font-editorial text-2xl md:text-[2.1rem] italic text-[#F5EDD8]/95 leading-[1.4] mb-8 pl-6 border-l-2 border-[#E8391B]">
                  &ldquo;{hollywoodData.pullQuote}&rdquo;
                </blockquote>
                <p className="font-editorial text-lg text-[#F5EDD8]/70 leading-relaxed">
                  {hollywoodData.body}
                </p>
              </div>
              <div className="culture-glass rounded-2xl p-6 border border-white/5 space-y-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-b from-glory-gold/2 to-transparent pointer-events-none" />
                {hollywoodData.stats.map((stat, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-4 last:border-0 last:pb-0 relative z-10">
                    <div className="font-macro-display text-4xl font-bold text-white tracking-tight group-hover:text-glory-gold transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-xs text-glory-gold uppercase tracking-wider mt-1 font-body">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transition: dark → cream */}
          <div className="h-16 w-full gradient-dark-to-cream" />
        </>
      )}

      {/* ── CREAM FEATURE: The Cinematic Epochs ───────────────────────── */}
      <section className="relative culture-cream-bg text-[#0C0907] py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-20">
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
              {content.epochsLabel}
            </p>
            <h2 className="culture-text-hero text-[#0C0907] mt-4">{content.epochsTitle}</h2>
            <p className="font-editorial italic text-lg text-[#0C0907]/55 mt-5 max-w-2xl mx-auto">
              {content.epochsSub}
            </p>
            <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
          </div>

          <div className="space-y-20 md:space-y-28">
            {eras.map((era, i) => (
              <motion.div
                key={era.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`grid gap-10 lg:grid-cols-2 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                {/* Image */}
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-[#0C0907]/10 shadow-[0_20px_50px_rgb(12,9,7,0.12)] group">
                  <Image
                    src={era.image}
                    alt={era.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 culture-scanline opacity-40 mix-blend-multiply pointer-events-none" />
                  <span className="absolute top-5 left-5 font-macro-display text-5xl font-black text-[#F5EDD8] drop-shadow-lg select-none">
                    {era.num}
                  </span>
                </div>

                {/* Text */}
                <div>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8391B]">
                      {era.title}
                    </span>
                    <span className="font-body text-xs text-[#0C0907]/40 tracking-widest">{era.span}</span>
                  </div>
                  <h3 className="font-editorial text-3xl md:text-4xl font-bold text-[#0C0907] leading-tight mb-5">
                    {era.headline}
                  </h3>
                  <p className="font-editorial text-base text-[#0C0907]/70 leading-relaxed mb-6">
                    {era.desc}
                  </p>

                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#0C0907]/40 mb-3">
                    {content.breakthroughsLabel}
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2 mb-7">
                    {era.keyTech.map((tech, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 font-body text-sm text-[#0C0907]/75">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8391B] shrink-0 mt-1.5" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>

                  <blockquote className="border-l-2 border-[#0C0907]/20 pl-5">
                    <p className="font-editorial italic text-lg text-[#0C0907]/85 leading-snug mb-1.5">
                      &ldquo;{era.quote}&rdquo;
                    </p>
                    <cite className="not-italic font-body text-xs font-bold uppercase tracking-widest text-[#E8391B]">
                      {era.quoteAuthor}
                    </cite>
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREAM: The Visual Syntax (Cinematic Grammar) ──────────────── */}
      <section className="relative culture-cream-bg text-[#0C0907] pb-28 md:pb-36 overflow-hidden border-t border-[#0C0907]/5">
        <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-24 md:pt-28">
          <div className="text-center mb-16">
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
              {content.grammarLabel}
            </p>
            <h2 className="culture-text-hero text-[#0C0907] mt-4">{content.grammarTitle}</h2>
            <p className="font-editorial italic text-lg text-[#0C0907]/55 mt-5 max-w-2xl mx-auto">
              {content.grammarSub}
            </p>
            <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {grammarCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col justify-between bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-[#0C0907]/5 shadow-[0_8px_30px_rgb(12,9,7,0.03)] hover:shadow-[0_20px_50px_rgb(12,9,7,0.08)] hover:-translate-y-1.5 transition-all duration-500"
              >
                <div>
                  <div className="p-3 bg-[#E8391B]/8 text-[#E8391B] rounded-xl w-fit mb-5 group-hover:bg-[#E8391B]/15 transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h3 className="font-editorial text-xl font-semibold text-[#0C0907] mb-3 leading-snug">
                    {card.title}
                  </h3>
                  <p className="font-body text-sm text-[#0C0907]/65 leading-relaxed mb-6">
                    {card.text}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#0C0907]/10">
                  <span className="font-body text-[10px] text-[#E8391B] uppercase tracking-wider block font-bold mb-1">
                    {isRo ? "Exemple cheie:" : "Key Example:"}
                  </span>
                  <span className="font-editorial text-sm text-[#0C0907]/85 italic">
                    {card.example}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transition: cream → dark ──────────────────────────────────── */}
      <div className="h-16 w-full gradient-cream-to-dark" />

      {/* ── DARK SHOWCASE: Auteurs + Frames + Vault ───────────────────── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        {/* Legendary Auteurs */}
        <section className="mb-28">
          <div className="mb-12 text-left">
            <h2 className="font-body text-xs font-semibold tracking-[0.2em] text-glory-gold uppercase mb-3">
              {content.auteursTitle}
            </h2>
            <p className="font-editorial italic text-base text-[#F5EDD8]/60 max-w-2xl">
              {content.auteursSub}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {auteurs.map((auteur, idx) => (
              <div
                key={idx}
                className="relative bg-black/30 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-glory-gold/25 hover:bg-white/1 transition-all duration-300 group shadow-lg outline-1 outline-white/5 outline-offset-4"
              >
                <div className="flex justify-between px-4 py-2 border-b border-white/5 bg-black/50 select-none">
                  {Array.from({ length: 8 }).map((_, k) => (
                    <span key={k} className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                  ))}
                </div>
                <div className="p-6 grow">
                  <div className="flex items-center gap-3 mb-4">
                    <Clapperboard className="w-4.5 h-4.5 text-glory-gold shrink-0" />
                    <span className="text-[10px] font-bold text-glory-gold uppercase tracking-widest font-body">
                      {auteur.title}
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-white mb-3 group-hover:text-glory-gold transition-colors duration-300">
                    {auteur.name}
                  </h3>
                  <p className="font-body text-xs text-[#F5EDD8]/65 leading-relaxed mb-6">
                    {auteur.bio}
                  </p>
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div>
                      <span className="text-[10px] text-glory-gold uppercase tracking-wider block font-bold mb-1 font-body">
                        {content.auteursSignature}
                      </span>
                      <span className="font-editorial text-white/80 italic text-sm">{auteur.signature}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-glory-gold uppercase tracking-wider block font-bold mb-1.5 font-body">
                        {content.auteursMasterpieces}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {auteur.masterpieces.map((film, fIdx) => (
                          <span
                            key={fIdx}
                            className="bg-glory-gold/4 border border-glory-gold/15 text-glory-gold text-[9px] font-semibold px-2 py-0.5 rounded font-body"
                          >
                            {film}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between px-4 py-2 border-t border-white/5 bg-black/50 select-none">
                  {Array.from({ length: 8 }).map((_, k) => (
                    <span key={k} className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Anatomy of a Frame */}
        <section className="mb-28 border-t border-white/10 pt-20">
          <div className="mb-12 text-center md:text-left">
            <h2 className="font-body text-xs font-semibold tracking-[0.2em] text-glory-gold uppercase mb-3">
              {content.frameTitle}
            </h2>
            <p className="font-editorial italic text-base text-[#F5EDD8]/60 max-w-2xl">
              {content.frameSub}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {compositions.map((comp, idx) => (
              <div
                key={idx}
                className="culture-glass rounded-2xl p-6 border border-white/5 hover:border-glory-gold/30 hover:bg-white/1 transition-all duration-300 flex flex-col justify-between group cursor-default"
              >
                <div>
                  {renderViewfinder(idx)}
                  <span className="text-[10px] font-bold text-glory-gold uppercase tracking-widest font-body">
                    {comp.rationale}
                  </span>
                  <h3 className="font-editorial text-lg font-bold text-white mt-2 mb-3 group-hover:text-glory-gold transition-colors duration-300">
                    {comp.title}
                  </h3>
                  <p className="font-body text-xs text-[#F5EDD8]/70 leading-relaxed mb-6">
                    {comp.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div>
                    <span className="text-[10px] text-glory-gold uppercase tracking-wider block font-bold mb-0.5 font-body">
                      {content.frameTechnique}
                    </span>
                    <span className="font-body text-xs text-white/80">{comp.technique}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-glory-gold uppercase tracking-wider block font-bold mb-0.5 font-body">
                      {content.frameExample}
                    </span>
                    <span className="font-editorial text-xs text-white/90 italic">{comp.example}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Parallax Quote Band ───────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-105 w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={SITE_IMAGES.culture.chicagoTheatre}
            alt="Chicago Theatre"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="font-editorial italic text-3xl md:text-5xl text-[#F5EDD8] leading-tight mb-6">
            &ldquo;{isRo ? "Este distractiv să faci imposibilul." : "It's kind of fun to do the impossible."}&rdquo;
          </p>
          <cite className="not-italic font-body text-sm font-bold uppercase tracking-[0.3em] text-glory-gold">
            Walt Disney
          </cite>
        </div>
      </section>

      {/* ── DARK: Poster Vault ────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <section>
          <div className="mb-12 text-center md:text-left">
            <h2 className="font-body text-xs font-semibold tracking-[0.2em] text-glory-gold uppercase mb-3">
              {content.posterTitle}
            </h2>
            <p className="font-editorial italic text-base text-[#F5EDD8]/60 max-w-2xl">
              {content.posterSub}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filmImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedMovie(img)}
                className="group relative culture-glass rounded-2xl overflow-hidden border border-white/5 hover:border-glory-gold/30 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col cursor-pointer bg-black/20"
              >
                <div className="relative aspect-2/3 w-full overflow-hidden bg-black/40">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="bg-glory-gold text-navy-dark text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md font-body">
                      <Maximize2 className="w-3 h-3" />
                      {isRo ? "Analizează" : "Analyze"}
                    </span>
                  </div>
                </div>
                <div className="p-4 border-t border-white/5">
                  <h3 className="font-editorial text-sm font-bold text-white group-hover:text-glory-gold transition-colors duration-300 truncate">
                    {img.caption}
                  </h3>
                  <p className="font-body text-[10px] text-[#F5EDD8]/50 mt-0.5 uppercase tracking-wider font-bold">
                    {getMovieExtraData(img.path).director} · {getMovieExtraData(img.path).year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Navigation: only shown when standalone */}
        {showBottomNav && (
          <div className="flex items-center justify-between border-t border-white/10 pt-12 mt-20 font-body">
            <a href="/culture" className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors">
              {content.backLink}
            </a>
            <a href="/culture/sports" className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors">
              {content.nextLink}
            </a>
          </div>
        )}
      </div>

      {/* ── Poster Modal ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedMovie && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMovie(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-[#0d0f14] border border-white/10 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[85vh] md:max-h-[80vh] flex flex-col md:flex-row shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-10"
            >
              <div className="relative w-full md:w-2/5 aspect-4/5 md:aspect-auto md:min-h-full bg-black/40 border-b md:border-b-0 border-white/5 overflow-hidden">
                <Image
                  src={selectedMovie.src}
                  alt={selectedMovie.alt}
                  fill
                  className="object-cover scale-[1.01]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10 select-none opacity-40 font-body">
                  <span className="text-[8px] font-bold text-white tracking-[0.3em] uppercase">
                    {content.ticketStubTitle}
                  </span>
                  <span className="text-[8px] font-bold text-glory-gold tracking-widest">N° 732948</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 md:p-10 w-full md:w-3/5 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-none bg-[#0c0f14]">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h2 className="font-editorial text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                        {selectedMovie.caption}
                      </h2>
                      <span className="font-body text-xs text-glory-gold font-bold uppercase tracking-wider mt-1 block">
                        {getMovieExtraData(selectedMovie.path).genre}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedMovie(null)}
                      className="p-1.5 rounded-full bg-white/5 border border-white/10 text-white/45 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-3 border-y border-white/5 py-4 mb-6 bg-black/10 px-4 rounded-xl font-body">
                    {[
                      { label: content.modalDirector, value: getMovieExtraData(selectedMovie.path).director },
                      { label: content.modalYear, value: getMovieExtraData(selectedMovie.path).year },
                      { label: content.modalRuntime, value: getMovieExtraData(selectedMovie.path).runtime },
                    ].map((d, k) => (
                      <div key={k}>
                        <span className="text-white/35 block mb-1 uppercase tracking-wider font-semibold text-[8px]">
                          {d.label}
                        </span>
                        <span className="text-white font-medium text-xs">{d.value}</span>
                      </div>
                    ))}
                  </div>

                  <p className="font-editorial text-sm text-[#F5EDD8]/80 leading-relaxed mb-8">
                    {selectedMovie.description}
                  </p>

                  <div className="p-5 rounded-xl bg-glory-gold/2 border border-glory-gold/15 relative overflow-hidden">
                    <div className="flex gap-3">
                      <Sparkles className="w-5 h-5 text-glory-gold shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-body text-[10px] font-bold text-glory-gold uppercase tracking-wider mb-2">
                          {content.modalBreakthrough}
                        </h4>
                        <h5 className="font-body text-sm font-semibold text-white mb-1">
                          {getMovieExtraData(selectedMovie.path).innovationTitle}
                        </h5>
                        <p className="font-body text-xs text-[#F5EDD8]/70 leading-relaxed">
                          {getMovieExtraData(selectedMovie.path).innovationText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
                  <button
                    onClick={() => setSelectedMovie(null)}
                    className="px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-navy-dark hover:border-white transition-all duration-300 font-body"
                  >
                    {content.closeBtn}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
