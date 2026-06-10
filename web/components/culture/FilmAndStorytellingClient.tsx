"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  X, 
  Film, 
  Sparkles, 
  Tv, 
  Layers, 
  Compass, 
  Music, 
  Maximize2, 
  Home, 
  ChevronRight,
  Camera,
  Clapperboard
} from "lucide-react";
import { GalleryImage } from "@/lib/data/gallery";
import { CultureStyles } from "./CulturePageComponents";
import { SITE_IMAGES } from "@/lib/site-images";
import { 
  MacroStyles, 
  MacroHero 
} from "@/components/economy/EconomyAnimations";

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
}

export function FilmAndStorytellingClient({ 
  filmImages, 
  isRo = false, 
  hollywoodData 
}: FilmAndStorytellingClientProps) {
  const [activeEra, setActiveEra] = useState<"golden" | "new" | "digital">("golden");
  const [selectedMovie, setSelectedMovie] = useState<GalleryImage | null>(null);

  // Handle escape key to exit modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedMovie) {
          setSelectedMovie(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMovie]);

  const content = {
    eraTitle: isRo ? "EPOCHILE CINEMATOGRAFICE ALE AMERICII" : "THE CINEMATIC EPOCHS OF AMERICA",
    eraSubtitle: isRo 
      ? "Cum competiția liberă și inovația tehnică au remodelat peisajul narativ global"
      : "How free competition and technical risk-taking reshaped global narrative forms",
    grammarTitle: isRo ? "SINTAXA VIZUALĂ: CUM VISEAZĂ PLANETA" : "VISUAL SYNTAX: HOW THE PLANET DREAMS",
    grammarSubtitle: isRo 
      ? "Inovațiile gramaticale pe care Hollywood le-a transformat în limbajul universal al atenției"
      : "The grammatical structures Hollywood standardized into a universal linguistic currency of attention",
    
    auteursTitle: isRo ? "AUTEURII: LEGENDARI CREATORI DE VISURI" : "THE LEGENDARY AUTEURS OF CINEMA",
    auteursSubtitle: isRo
      ? "Creatorii vizionari care au modelat subconștientul colectiv global prin semnăturile lor artistice"
      : "The visionary directors who shaped the global collective subconscious through distinct artistic signatures",
    auteursSignature: isRo ? "Semnătură Vizuală:" : "Visual Signature:",
    auteursMasterpieces: isRo ? "Filme de Referință:" : "Key Masterpieces:",
    
    frameTitle: isRo ? "ANATOMIA UNUI CADRU: COMPoziție ȘI PSIHOLOGIE" : "ANATOMY OF A FRAME: VISUAL PSYCHOLOGY",
    frameSubtitle: isRo
      ? "Cum transmit regizorii mesaje subconștiente publicului prin geometrie și optică"
      : "How directors communicate subconscious ideas through optical scale, angles, and geometry",
    frameRationale: isRo ? "Rol Narativ:" : "Narrative Rationale:",
    frameTechnique: isRo ? "Metodă Tehnică:" : "Technical Method:",
    frameExample: isRo ? "Exemple Clasice:" : "Classic Examples:",
    
    posterShelfTitle: isRo ? "RAFTUL DE POSTERE FILME CLASICE" : "CLASSIC CINEMATIC POSTER SHELF",
    posterShelfSubtitle: isRo 
      ? "Apasă pe poster pentru a analiza inovația cinematografică din spatele fiecărei capodopere"
      : "Click on any theatrical poster to analyze the technical and storytelling breakthrough behind the masterpiece",
    modalDirector: isRo ? "Regizor" : "Director",
    modalYear: isRo ? "An Lansare" : "Release Year",
    modalRuntime: isRo ? "Durată" : "Runtime",
    modalGenre: isRo ? "Gen" : "Genre",
    modalBreakthrough: isRo ? "Inovație Cheie" : "Key Cinematic Breakthrough",
    closeBtn: isRo ? "Închide" : "Close",
    backLink: isRo ? "← Înapoi la Prezentare Generală" : "← Back to Overview",
    nextLink: isRo ? "Sportul American →" : "American Sports →",
    ticketStubTitle: isRo ? "BILET DE CINEMA ADMIS" : "CINEMA ADMIT ONE TICKET",
  };

  const eras = {
    golden: {
      title: isRo ? "Epoca de Aur (1920-1950)" : "The Golden Age (1920-1950)",
      headline: isRo ? "Sistemul de Studiouri și Montajul de Continuitate" : "The Studio System & Continuity",
      desc: isRo 
        ? "Dezvoltat în timpul ascensiunii marilor studiouri din Los Angeles, acest sistem a creat regulile gramaticale fundamentale ale filmului. Principiul montajului invizibil a creat o continuitate perfectă a spațiului și timpului, atrăgând publicul în poveste fără să observe tăieturile."
        : "Developed during the rise of Los Angeles' major studios, this era established the fundamental grammatical rules of cinema. The principle of invisible editing constructed a seamless continuity of space and time, pulling audiences into narratives without notice.",
      keyTech: isRo 
        ? ["Regula de 180 de Grade pentru convergența privirilor", "Sistemul contractelor de exclusivitate cu mari actori", "Inovația culorilor prin Technicolor în 3 benzi", "Standardizarea genurilor (Western, Noir, Musical)"]
        : ["The 180-Degree Rule for seamless eye-line matching", "Exclusive star-contract studio roster system", "Technicolor 3-strip chemistry and visual saturation", "Classic genre formulas (Westerns, Noir, Musicals)"],
      quote: isRo 
        ? "„Cinemaul nu este o felie de viață, ci o felie de tort.”"
        : "\"Cinema is not a slice of life, it's a piece of cake.\"",
      quoteAuthor: "Alfred Hitchcock",
    },
    new: {
      title: isRo ? "Noul Hollywood (1960-1970)" : "New Hollywood (1960-1970)",
      headline: isRo ? "Auteur-ii și Deconstrucția Miturilor" : "Auteurs & Deconstructed Myths",
      desc: isRo 
        ? "Odată cu prăbușirea vechiului cod de cenzură, o nouă generație de regizori instruiți în școli de film a preluat frâiele. Influențați de modernismul european, au deconstruit genurile clasice și au înlocuit eroii ideali cu anti-eroi complecși pe fundalul realității urbane."
        : "With the collapse of the old censorship code, a new wave of film-school educated directors took creative control. Inspired by European modernism, they deconstructed classic genres, replacing idealized heroes with complex, morally gray anti-heroes set in gritty realism.",
      keyTech: isRo 
        ? ["Auteurismul - controlul creativ deplin al regizorului", "Filmări pe străzi reale în loc de decoruri de studio", "Ambiguitate morală și finaluri deschise", "Montaj experimental (jump cuts, montaj sonor)"]
        : ["Auteur Theory - absolute creative dominance of the director", "Location shooting on real streets instead of studio backlots", "Moral ambiguity and open-ended narrative resolutions", "Experimental editing (jump cuts, overlapping soundscapes)"],
      quote: isRo 
        ? "„Cel mai practic lucru pe care îl poți face în artă este să îți urmezi intuiția.”"
        : "\"The most businesslike thing you can do in art is to follow your own intuition.\"",
      quoteAuthor: "Francis Ford Coppola",
    },
    digital: {
      title: isRo ? "Blockbuster & Digital (1980-Prezent)" : "Blockbuster & Digital (1980-Pres.)",
      headline: isRo ? "Spectacolul High-Concept și CGI" : "High-Concept Spectacle & CGI",
      desc: isRo 
        ? "Începând cu Jaws și Star Wars, Hollywood a perfecționat filmul de tip eveniment global. Narațiunile au devenit 'high-concept' (ușor de explicat într-o propoziție), iar apariția efectelor digitale (CGI) a transformat ecranul într-o pânză a imaginației nelimitate, accesibilă oricărei limbi."
        : "Pivoting with Jaws and Star Wars, Hollywood mastered the global event movie. Narratives were built around clear, 'high-concept' premises easily pitched in a single sentence, while computer-generated imagery (CGI) turned screens into spaces of limitless sensory fantasy.",
      keyTech: isRo 
        ? ["CGI de ultimă generație și mapare digitală a mișcării", "Macro-narațiuni (universuri cinematografice extinse)", "Sisteme de sunet multi-canal Dolby Atmos & IMAX", "Strategii de marketing global simultan"]
        : ["State-of-the-art CGI, rendering, and performance capture", "Macro-storytelling (interconnected cinematic universes)", "Dolby Atmos multi-channel surround and IMAX format scale", "Simultaneous worldwide multi-platform saturation releases"],
      quote: isRo 
        ? "„De fiecare dată când merg la un film, este ceva magic, indiferent despre ce e vorba.”"
        : "\"Every time I go to a movie, it's magic, no matter what the movie's about.\"",
      quoteAuthor: "Steven Spielberg",
    }
  };

  const grammarCards = [
    {
      icon: <Layers className="w-6 h-6 text-glory-gold" />,
      title: isRo ? "Montajul Paralel (Cross-Cutting)" : "Parallel Editing",
      text: isRo 
        ? "Prezentarea a două acțiuni în locuri diferite simultan. Această invenție gramaticală timpurie a permis Hollywood-ului să creeze tensiune și suspans extrem, stabilind ritmul de bază pentru thrillere și filme de acțiune."
        : "Showing two separate actions in different locations simultaneously. This early grammatical invention allowed Hollywood to engineer supreme suspense, establishing the fundamental pacing of thrillers and action sequences.",
      example: "Inception, The Godfather (Christening scene)"
    },
    {
      icon: <Compass className="w-6 h-6 text-glory-gold" />,
      title: isRo ? "Monomitul: Călătoria Eroului" : "The Hero's Journey",
      text: isRo 
        ? "Structurarea scenariilor pe baza etapelor mitologice identificate de Joseph Campbell (Plecare, Inițiere, Întoarcere). Această rețetă oferă filmelor rezonanță emoțională universală în orice cultură."
        : "Structuring screenplays around Joseph Campbell's universal mythological stages (Departure, Initiation, Return). This structural blueprint gives movies intuitive emotional resonance across all human cultures.",
      example: "Star Wars, The Matrix, The Lion King"
    },
    {
      icon: <Music className="w-6 h-6 text-glory-gold" />,
      title: isRo ? "Leitmotivul Muzical în Sunet" : "The Musical Leitmotif",
      text: isRo 
        ? "Asocierea unor teme orchestrale specifice fiecărui personaj sau concept. Adaptat din opera wagneriană, acest truc ghidează subconștientul spectatorului, dând o identitate sonoră memorabilă filmelor."
        : "Assigning specific orchestral signatures to characters, themes, or objects. Adapted from Wagnerian opera, this system guides the viewer's subconscious, creating instant auditory recognition.",
      example: "Jaws, Star Wars (John Williams), Inception (Hans Zimmer)"
    },
    {
      icon: <Tv className="w-6 h-6 text-glory-gold" />,
      title: isRo ? "Narațiunea High-Concept" : "High-Concept Narrative",
      text: isRo 
        ? "Construirea poveștii în jurul unui sâmbure narativ atât de simplu și vizual încât poate fi explicat într-o singură propoziție. Aceasta permite traducerea facilă pe piețele externe, fără bariere culturale."
        : "Designing movies around a hook so simple and highly visual it can be fully pitched in a single sentence. This streamlines cross-border distribution and eliminates semantic barriers for global crowds.",
      example: "Jurassic Park (\"Cloned dinosaurs run loose in an island theme park\")"
    }
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
      masterpieces: ["Jaws", "E.T. the Extra-Terrestrial", "Schindler's List", "Saving Ryan"]
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
      masterpieces: ["Taxi Driver", "Raging Bull", "Goodfellas", "The Departed"]
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
      masterpieces: ["Dr. Strangelove", "2001: Space Odyssey", "Clockwork Orange", "The Shining"]
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
      masterpieces: ["The Godfather I & II", "The Conversation", "Apocalypse Now"]
    },
    {
      name: "Alfred Hitchcock",
      title: isRo ? "Maestrul Suspansului" : "Master of Psychological Suspense",
      bio: isRo
        ? "Regizorul care a transformat structura camerei într-un instrument de control al anxietății. Hitchcock a formalizat gramatica suspansului, transformând voyeurismul și paranoia în spectacol artistic."
        : "The director who turned the camera lens into a mechanism of pure anxiety control. Hitchcock formalized the rules of suspense, transforming voyeurism and paranoia into high art.",
      signature: isRo
        ? "Cadre subiective din unghiul personajului, asocieri de montaj rapid, concepte tip 'MacGuffin'."
        : "Subjective point-of-view angles, rapid associative montage sequences, 'MacGuffin' plot engines.",
      masterpieces: ["Rear Window", "Vertigo", "North by Northwest", "Psycho"]
    }
  ];

  const compositions = [
    {
      title: isRo ? "Orizontul Larg" : "The Wide Horizon",
      rationale: isRo ? "Libertate și Izolare la Frontieră" : "Frontier Freedom & Isolation",
      desc: isRo
        ? "Încadrarea subiectului ca un detaliu minuscul pe fundalul unui peisaj grandios. Această compoziție reflectă scara imensă a geografiei americane, simbolizând atât libertatea supremă, cât și izolarea copleșitoare."
        : "Framing a human subject as a tiny spec against a massive environment. This scale matches the physical geography of the American continent, representing both boundless individual freedom and absolute isolation.",
      technique: isRo ? "Obiectiv grandangular, linie de orizont joasă, profunzime mare de focalizare." : "Wide-angle lens, low horizon line, deep focus depth-of-field.",
      example: "The Searchers (John Ford), Paris, Texas (Wim Wenders)"
    },
    {
      title: isRo ? "Unghiul Înclinat" : "The Dutch Angle",
      rationale: isRo ? "Paranoia și Colaps Moral" : "Moral Disorientation & Paranoia",
      desc: isRo
        ? "Înclinarea axei orizontale a camerei pentru a crea un cadru dezechilibrat. Cadrul comunică subconștient panică mentală, anxietate, dezorientare și sentimentul că realitatea s-a destabilizat complet."
        : "Tilting the camera's horizontal axis to create an unbalanced frame. This angle communicates mental disorientation, paranoia, fear, and the structural collapse of a character's reality.",
      technique: isRo ? "Înclinarea laterală a capului de trepied, linii diagonale dominante." : "Roll axis tilt, dominant diagonal guidelines, unbalanced framing vectors.",
      example: "The Third Man, Mission: Impossible (De Palma)"
    },
    {
      title: isRo ? "Dolly Zoom (Vertigo)" : "The Dolly Zoom",
      rationale: isRo ? "Șoc Subconștient Brusc" : "Subconscious Shock & Vertigo",
      desc: isRo
        ? "Deplasarea fizică a camerei spre subiect în timp ce se face zoom-out optic (sau invers). Subiectul rămâne de aceeași dimensiune în timp ce perspectiva fundalului se strânge sau se extinde spectaculos, redând un atac de panică vizual."
        : "Moving the camera physically while zooming the lens in the opposite direction. The subject stays static while the background perspective rapidly expands or compresses, mimicking an internal panic attack.",
      technique: isRo ? "Tragere fizică pe șine (dolly) sincronizată electronic cu schimbarea zoomului." : "Synchronized camera carriage movement and optical focal length adjustment.",
      example: "Vertigo (Hitchcock), Jaws (Spielberg)"
    },
    {
      title: isRo ? "Cadrul de Jos (Hero Shot)" : "The Low-Angle Hero Shot",
      rationale: isRo ? "Putere, Dominanță și Statut" : "Power, Dominance & Mythic Status",
      desc: isRo
        ? "Amplasarea camerei aproape de sol, orientată în sus spre personaj. Forțează privitorul să ridice privirea, inducând subconștient o percepție de măreție, autoritate, pericol sau statură mitică."
        : "Placing the camera low to the ground and tilting upward toward a subject. This forces the audience to physically look up, inducing subconscious feelings of authority, power, danger, or mythic status.",
      technique: isRo ? "Poziționare joasă, obiectiv grandangular pentru accentuarea înălțimii." : "Low tripod index, upward tilt, wide-angle lens scaling to exaggerate dimensions.",
      example: "Citizen Kane (Welles), Pulp Fiction (Tarantino)"
    }
  ];

  // Render camera viewfinders inside each frame card
  const renderViewfinder = (index: number) => {
    return (
      <div className="relative w-full aspect-[16/10] bg-black/40 border border-white/10 rounded-xl overflow-hidden mb-6 flex items-center justify-center group-hover:border-glory-gold/30 transition-colors duration-300">
        {/* Corner viewfinder marks */}
        <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-white/20 group-hover:border-glory-gold/50 transition-colors duration-300" />
        <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-white/20 group-hover:border-glory-gold/50 transition-colors duration-300" />
        <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-white/20 group-hover:border-glory-gold/50 transition-colors duration-300" />
        <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-white/20 group-hover:border-glory-gold/50 transition-colors duration-300" />
        
        {/* Viewfinder crosshair */}
        <span className="text-white/10 group-hover:text-glory-gold/30 font-sans text-sm select-none pointer-events-none transition-colors duration-300">+</span>

        {index === 0 && (
          /* Wide Horizon vector */
          <svg className="w-3/4 h-3/4 text-white/10 group-hover:text-glory-gold/25 transition-all duration-500 group-hover:scale-[1.03]" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1">
            <line x1="5" y1="42" x2="95" y2="42" />
            <path d="M 5,42 L 25,28 L 50,38 L 75,22 L 95,42" strokeDasharray="2 2" />
            <circle cx="50" cy="39" r="1.5" fill="currentColor" />
          </svg>
        )}

        {index === 1 && (
          /* Dutch Angle vector */
          <svg className="w-3/4 h-3/4 text-white/10 group-hover:text-glory-gold/25 transition-all duration-500 group-hover:scale-[1.03] rotate-[12deg] group-hover:rotate-[15deg]" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="15" y="12" width="70" height="36" strokeDasharray="3 3" />
            <line x1="5" y1="20" x2="95" y2="45" strokeWidth="1.2" />
            <path d="M 45,35 L 45,22 L 55,22 L 55,35 Z" fill="currentColor" fillOpacity="0.05" />
          </svg>
        )}

        {index === 2 && (
          /* Dolly Zoom perspective lines */
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
          /* Low-Angle Hero vector */
          <svg className="w-3/4 h-3/4 text-white/10 group-hover:text-glory-gold/25 transition-all duration-500 group-hover:scale-[1.03]" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1">
            <line x1="12" y1="60" x2="42" y2="5" />
            <line x1="88" y1="60" x2="58" y2="5" />
            <path d="M 40,55 L 45,30 L 35,24 L 50,8 L 65,24 L 55,30 L 60,55 Z" fill="currentColor" fillOpacity="0.1" />
            <path d="M 50,4 L 46,8 M 50,4 L 54,8" strokeWidth="1.2" />
          </svg>
        )}
      </div>
    );
  };

  // Helper to get movie extra data based on image path
  const getMovieExtraData = (path: string) => {
    const p = path.toLowerCase();
    if (p.includes("blade runner")) {
      return {
        director: "Ridley Scott",
        year: "1982",
        genre: "Sci-Fi / Neo-Noir",
        runtime: "117 min",
        innovationTitle: isRo ? "Estetică Cyberpunk & Worldbuilding" : "Cyberpunk Aesthetic & Worldbuilding",
        innovationText: isRo 
          ? "Blade Runner a redefinit modul în care cinematografia imaginează viitorul. Splicing-ul dintre neonul japonez, ploaia continuă din Los Angeles și arhitectura retro-fitted a creat modelul vizual pentru întregul gen cyberpunk."
          : "Blade Runner redefined how cinema imagines the future. Splicing Japanese neon, continuous Los Angeles rain, and retro-fitted architecture, it established the visual template for the entire cyberpunk genre."
      };
    }
    if (p.includes("goodfellas")) {
      return {
        director: "Martin Scorsese",
        year: "1990",
        genre: isRo ? "Biografic / Crimă" : "Biographical / Crime",
        runtime: "145 min",
        innovationTitle: isRo ? "Montaj Hiperkinetic & Narațiune Voiceover" : "Hyper-Kinetic Editing & Voiceover",
        innovationText: isRo
          ? "Goodfellas a spart structurile narative liniare prin utilizarea cadrelor înghețate (freeze-frames), tăieturilor rapide de montaj și a narațiunii suprapuse dinamice, influențând zeci de regizori moderni."
          : "Goodfellas shattered linear narrative structures through dynamic freeze-frames, rapid whip-pan edits, and overlapping double voiceover narration, shaping decades of modern filmmaking."
      };
    }
    if (p.includes("interstellar")) {
      return {
        director: "Christopher Nolan",
        year: "2014",
        genre: isRo ? "Sci-Fi / Aventură" : "Sci-Fi / Adventure",
        runtime: "169 min",
        innovationTitle: isRo ? "Fizică Teoretică & Emoție la Scară Cosmică" : "Theoretical Physics & Cosmic Emotion",
        innovationText: isRo
          ? "Filmul a colaborat îndeaproape cu astrofizicianul Kip Thorne pentru a crea prima reprezentare vizuală precisă din punct de vedere științific a unei găuri negre supermasive (Gargantua), randată pe baza ecuațiilor relativității generale."
          : "The film collaborated closely with astrophysicist Kip Thorne to build the first scientifically accurate visual model of a supermasive black hole (Gargantua), rendered using general relativity equations."
      };
    }
    if (p.includes("avengers") || p.includes("endgame")) {
      return {
        director: "Anthony & Joe Russo",
        year: "2019",
        genre: "Action / Sci-Fi",
        runtime: "181 min",
        innovationTitle: isRo ? "Macro-Narațiune de Univers Interconectat" : "Interconnected Shared Universe",
        innovationText: isRo
          ? "Reprezintă apogeul unui experiment narativ fără precedent: interconectarea a 22 de filme diferite pe parcursul a 11 ani într-o singură macro-narațiune coerentă și profitabilă la nivel global."
          : "Represents the absolute peak of an unprecedented storytelling experiment: interconnecting 22 separate films over 11 years into a single, cohesive, globally dominant narrative arc."
      };
    }
    if (p.includes("saving private ryan")) {
      return {
        director: "Steven Spielberg",
        year: "1998",
        genre: isRo ? "Dramă / Război" : "Drama / War",
        runtime: "169 min",
        innovationTitle: isRo ? "Realismul Combativ & Unghiul Obturatorului" : "Combat Realism & Shutter Angle",
        innovationText: isRo
          ? "Spielberg a desincronizat obturatorul camerei la 45 sau 90 de grade în loc de standardul de 180, eliminând neclaritatea de mișcare pentru a reda explozii și lupte cu o claritate stroboscopică, viscerală și copleșitoare."
          : "Spielberg desynchronized the camera shutter to 45 or 90 degrees instead of the 180-degree standard, stripping motion blur to render explosions and flying shrapnel with stroboscopic, visceral clarity."
      };
    }
    if (p.includes("dark knight")) {
      return {
        director: "Christopher Nolan",
        year: "2008",
        genre: isRo ? "Acțiune / Thriller" : "Action / Thriller",
        runtime: "152 min",
        innovationTitle: isRo ? "Cinema cu Supereroi în Format IMAX" : "Comic Book Cinema in IMAX Scale",
        innovationText: isRo
          ? "Primul lungmetraj major de ficțiune care a folosit camere native IMAX de 70mm pentru secvențe de acțiune cheie, ridicând cinematografia cu supereroi la rangul de tragedie urbană shakespeariană."
          : "The first major narrative feature to utilize native 70mm IMAX cameras for key action sequences, elevating comic-book adaptations into high-stakes, grand-scale urban tragedies."
      };
    }
    if (p.includes("matrix")) {
      return {
        director: "Lana & Lilly Wachowski",
        year: "1999",
        genre: isRo ? "Sci-Fi / Acțiune" : "Sci-Fi / Action",
        runtime: "136 min",
        innovationTitle: isRo ? "Bullet-Time & Coregrafia Digitală" : "Bullet-Time & Cyberpunk Philosophy",
        innovationText: isRo
          ? "Introducerea efectului revoluționar 'bullet-time' (folosind zeci de camere fixe declanșate secvențial) a permis camerei să se miște în timp real în jurul personajelor înghețate într-o mișcare ultra-lentă."
          : "The introduction of the revolutionary 'bullet-time' effect (using a circular array of still cameras triggered sequentially) allowed the camera to orbit characters frozen in hyper-slow motion."
      };
    }
    if (p.includes("titanic")) {
      return {
        director: "James Cameron",
        year: "1997",
        genre: isRo ? "Dramă / Romantic" : "Drama / Romance",
        runtime: "194 min",
        innovationTitle: isRo ? "Simulări de Mulțime & Producție la Scară Gigantă" : "Digital Crowd Simulation & Epic Scale",
        innovationText: isRo
          ? "Filmul a dezvoltat software specializat de simulare a mulțimilor umane pentru a popula nava digitală în timpul scufundării, îmbinând modelarea fizică la scară reală cu efectele digitale de ultimă generație."
          : "The film developed pioneering software for human crowd simulation to populate the digital ship during sinking, merging real-scale physical models with cutting-edge digital composites."
      };
    }
    return {
      director: "Hollywood Director",
      year: "Classic",
      genre: isRo ? "Cinematografie" : "Cinematography",
      runtime: "N/A",
      innovationTitle: isRo ? "Inovație Americană" : "American Innovation",
      innovationText: isRo ? "Inovație tehnică și narativă majoră." : "Major technical and narrative innovation."
    };
  };

  return (
    <div className="culture-bg text-[#F5EDD8] min-h-screen relative overflow-hidden">
      <CultureStyles />
      <MacroStyles />

      {/* Cinematic Hero */}
      <MacroHero 
        eyebrow={hollywoodData.eyebrow}
        titleLead={hollywoodData.headline}
        titleAccent=""
        description={isRo 
          ? "Hollywood-ul a generat codul vizual prin care întreaga planetă își spune poveștile, își expune valorile și își imaginează viitorul."
          : "Hollywood generated the visual syntax through which the entire planet tells its stories, projects its values, and dreams of the future."}
        imageSrc={SITE_IMAGES.culture.hollywoodSign}
        imageAlt="Hollywood sign sunset"
        stats={hollywoodData.stats.map(s => ({ value: s.value, label: s.label }))}
      />

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 font-editorial">
        {/* Integrated Breadcrumb trail */}
        <div className="flex justify-start mb-12">
          <nav
            aria-label={isRo ? "Fir de navigare" : "Breadcrumb"}
            className="flex items-center gap-1.5 font-body text-sm text-white/50 font-sans tracking-wide"
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
              {isRo ? "Film și Narativă" : "Film & Storytelling"}
            </span>
          </nav>
        </div>
        {/* Hero Quote & Editorial */}
        <section className="mb-24">
          <div className="grid gap-12 lg:grid-cols-3 items-center">
            <div className="lg:col-span-2">
              <blockquote className="text-2xl md:text-3xl font-editorial italic text-[#F5EDD8]/90 leading-relaxed mb-8 pl-6 border-l-2 border-[#E8391B]">
                "{hollywoodData.pullQuote}"
              </blockquote>

              <p className="font-sans text-base text-[#F5EDD8]/70 leading-relaxed">
                {hollywoodData.body}
              </p>
            </div>

            {/* Sidebar Stats */}
            <div className="culture-glass rounded-2xl p-6 border border-white/5 space-y-6 font-sans relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-glory-gold/[0.02] to-transparent pointer-events-none" />
              {hollywoodData.stats.map((stat, idx) => (
                <div key={idx} className="border-b border-white/5 pb-4 last:border-0 last:pb-0 relative z-10">
                  <div className="text-4xl font-bold text-white tracking-tight group-hover:text-glory-gold transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-xs text-glory-gold uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Timeline of Cinematic Eras ─────────────────────────────────────── */}
        <section className="mb-24 border-t border-white/10 pt-16 font-sans">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-xs font-semibold tracking-wider text-glory-gold uppercase mb-2">
              {content.eraTitle}
            </h2>
            <p className="text-sm text-[#F5EDD8]/60 font-serif italic max-w-2xl">
              {content.eraSubtitle}
            </p>
          </div>

          {/* Timeline Tabs Header */}
          <div className="flex flex-wrap md:flex-nowrap border-b border-white/5 mb-10 gap-2 overflow-x-auto pb-1 no-scrollbar">
            {(Object.keys(eras) as Array<keyof typeof eras>).map((eraKey) => (
              <button
                key={eraKey}
                onClick={() => setActiveEra(eraKey)}
                className={`px-6 py-4 text-sm font-semibold uppercase tracking-wider border-b-2 transition-all duration-300 whitespace-nowrap ${
                  activeEra === eraKey
                    ? "border-glory-gold text-glory-gold bg-white/[0.02]"
                    : "border-transparent text-[#F5EDD8]/50 hover:text-[#F5EDD8] hover:bg-white/[0.01]"
                }`}
              >
                {eras[eraKey].title}
              </button>
            ))}
          </div>

          {/* Timeline Tab Content */}
          <div className="culture-glass rounded-2xl p-8 md:p-10 border border-white/5 min-h-[300px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-glory-gold/[0.01] to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEra}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid gap-10 lg:grid-cols-12 items-start"
              >
                {/* Era explanation */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="text-xs text-glory-gold uppercase tracking-widest font-bold block">
                    {eras[activeEra].title}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-editorial text-white font-bold leading-tight">
                    {eras[activeEra].headline}
                  </h3>
                  <p className="text-sm text-[#F5EDD8]/70 leading-relaxed font-sans">
                    {eras[activeEra].desc}
                  </p>

                  <div className="pt-4 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                      {isRo ? "Inovații Industriale & Artistice:" : "Industrial & Artistic Breakthroughs:"}
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {eras[activeEra].keyTech.map((tech, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs text-[#F5EDD8]/80 font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-glory-gold shrink-0" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Director Quote Showcase */}
                <div className="lg:col-span-5 flex flex-col justify-center h-full border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-10">
                  <div className="relative p-6 rounded-xl bg-black/20 border border-white/5">
                    <span className="font-editorial text-glory-gold/5 text-[90px] leading-none absolute -top-4 -left-1 select-none pointer-events-none">
                      &ldquo;
                    </span>
                    <p className="font-editorial italic text-lg text-[#F5EDD8]/90 relative z-10 leading-relaxed mb-4">
                      {eras[activeEra].quote}
                    </p>
                    <div className="text-xs uppercase tracking-widest font-bold text-glory-gold font-sans">
                      — {eras[activeEra].quoteAuthor}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Legendary Auteurs Spotlight (Film Cell Styling) ──────────────────── */}
        <section className="mb-24 border-t border-white/10 pt-16 font-sans">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-xs font-semibold tracking-wider text-glory-gold uppercase mb-2">
              {content.auteursTitle}
            </h2>
            <p className="text-sm text-[#F5EDD8]/60 font-serif italic max-w-2xl">
              {content.auteursSubtitle}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {auteurs.map((auteur, idx) => (
              <div 
                key={idx}
                className="relative bg-black/30 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-glory-gold/25 hover:bg-white/[0.01] transition-all duration-300 group shadow-lg outline outline-1 outline-white/5 outline-offset-4"
              >
                {/* Top Film sprocket perforated border */}
                <div className="flex justify-between px-4 py-2 border-b border-white/5 bg-black/50 select-none">
                  <span className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                  <span className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                  <span className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                  <span className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                  <span className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                  <span className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                  <span className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                  <span className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                </div>

                <div className="p-6 flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <Clapperboard className="w-4.5 h-4.5 text-glory-gold shrink-0" />
                    <span className="text-[10px] font-bold text-glory-gold uppercase tracking-widest">
                      {auteur.title}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-glory-gold transition-colors duration-300">
                    {auteur.name}
                  </h3>
                  <p className="text-xs text-[#F5EDD8]/65 leading-relaxed mb-6 font-sans">
                    {auteur.bio}
                  </p>

                  <div className="space-y-4 pt-4 border-t border-white/5 text-xs font-sans">
                    <div>
                      <span className="text-[10px] text-glory-gold uppercase tracking-wider block font-bold mb-1">
                        {content.auteursSignature}
                      </span>
                      <span className="text-white/80 italic font-serif">
                        {auteur.signature}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-glory-gold uppercase tracking-wider block font-bold mb-1.5">
                        {content.auteursMasterpieces}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {auteur.masterpieces.map((film, fIdx) => (
                          <span 
                            key={fIdx}
                            className="bg-glory-gold/[0.04] border border-glory-gold/15 text-glory-gold text-[9px] font-semibold px-2 py-0.5 rounded"
                          >
                            {film}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Film sprocket perforated border */}
                <div className="flex justify-between px-4 py-2 border-t border-white/5 bg-black/50 select-none">
                  <span className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                  <span className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                  <span className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                  <span className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                  <span className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                  <span className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                  <span className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                  <span className="w-1.5 h-2.5 bg-white/10 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Cinematic Grammar Grid ─────────────────────────────────────────── */}
        <section className="mb-24 border-t border-white/10 pt-16 font-sans">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-xs font-semibold tracking-wider text-glory-gold uppercase mb-2">
              {content.grammarTitle}
            </h2>
            <p className="text-sm text-[#F5EDD8]/60 font-serif italic max-w-2xl">
              {content.grammarSubtitle}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {grammarCards.map((card, idx) => (
              <div
                key={idx}
                className="culture-glass rounded-2xl p-6 border border-white/5 hover:border-glory-gold/30 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between group cursor-default"
              >
                <div>
                  <div className="p-3 bg-white/[0.03] rounded-xl w-fit mb-5 group-hover:bg-glory-gold/10 transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-base font-bold text-white mb-3 tracking-tight group-hover:text-glory-gold transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#F5EDD8]/60 leading-relaxed mb-6">
                    {card.text}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <span className="text-[10px] text-glory-gold uppercase tracking-wider block font-bold mb-1">
                    {isRo ? "Exemple cheie:" : "Key Example:"}
                  </span>
                  <span className="text-xs text-white/95 font-serif italic">
                    {card.example}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Anatomy of a Frame: Visual Composition (Viewfinder Layout) ─────── */}
        <section className="mb-24 border-t border-white/10 pt-16 font-sans">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-xs font-semibold tracking-wider text-glory-gold uppercase mb-2">
              {content.frameTitle}
            </h2>
            <p className="text-sm text-[#F5EDD8]/60 font-serif italic max-w-2xl">
              {content.frameSubtitle}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {compositions.map((comp, idx) => (
              <div
                key={idx}
                className="culture-glass rounded-2xl p-6 border border-white/5 hover:border-glory-gold/30 hover:bg-white/[0.01] transition-all duration-300 flex flex-col justify-between group cursor-default"
              >
                <div>
                  {/* Dynamic Viewfinder Graphic */}
                  {renderViewfinder(idx)}

                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-glory-gold uppercase tracking-widest">
                      {comp.rationale}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-glory-gold transition-colors duration-300">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-[#F5EDD8]/70 leading-relaxed mb-6 font-sans">
                    {comp.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-3 text-xs font-sans">
                  <div>
                    <span className="text-[10px] text-glory-gold uppercase tracking-wider block font-bold mb-0.5">
                      {content.frameTechnique}
                    </span>
                    <span className="text-white/80">
                      {comp.technique}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-glory-gold uppercase tracking-wider block font-bold mb-0.5">
                      {content.frameExample}
                    </span>
                    <span className="text-white/90 italic font-serif">
                      {comp.example}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Poster Grid Shelf (Interactive Film Vault) ────────────────────────── */}
        <section className="border-t border-white/10 pt-16 mb-20 font-sans">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-xs font-semibold tracking-wider text-glory-gold uppercase mb-2">
              {content.posterShelfTitle}
            </h2>
            <p className="text-sm text-[#F5EDD8]/60 font-serif italic">
              {content.posterShelfSubtitle}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filmImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedMovie(img)}
                className="group relative culture-glass rounded-2xl overflow-hidden border border-white/5 hover:border-glory-gold/30 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col cursor-pointer bg-black/20"
              >
                {/* Poster Frame Container */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-black/40">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Hover Overlay Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="bg-glory-gold text-navy-dark text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                      <Maximize2 className="w-3 h-3" />
                      {isRo ? "Analizează" : "Analyze"}
                    </span>
                  </div>
                </div>

                {/* Card Title Label */}
                <div className="p-4 border-t border-white/5">
                  <h3 className="text-sm font-bold text-white group-hover:text-glory-gold transition-colors duration-300 truncate">
                    {img.caption}
                  </h3>
                  <p className="text-[10px] text-[#F5EDD8]/50 mt-0.5 uppercase tracking-wider font-bold">
                    {getMovieExtraData(img.path).director} · {getMovieExtraData(img.path).year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Lightbox Modal (Ticket Stub Style Overhaul) ────────────────────── */}
        <AnimatePresence>
          {selectedMovie && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Darkened blur backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMovie(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              />

              {/* Theater Program Booklet Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative bg-[#0d0f14] border border-white/10 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[85vh] md:max-h-[80vh] flex flex-col md:flex-row shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-10"
              >
                {/* Left side: Poster Image */}
                <div className="relative w-full md:w-2/5 aspect-[4/5] md:aspect-auto md:min-h-full bg-black/40 border-b md:border-b-0 border-white/5 overflow-hidden">
                  <Image
                    src={selectedMovie.src}
                    alt={selectedMovie.alt}
                    fill
                    className="object-cover scale-[1.01]"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                  
                  {/* Decorative Ticket Brand */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10 select-none opacity-40 font-sans">
                    <span className="text-[8px] font-bold text-white tracking-[0.3em] uppercase">
                      {content.ticketStubTitle}
                    </span>
                    <span className="text-[8px] font-bold text-glory-gold tracking-widest font-mono">
                      N° 732948
                    </span>
                  </div>
                </div>

                {/* Vertical Perforated Separation Line */}
                <div className="hidden md:flex relative flex-col items-center justify-between w-[1px] bg-transparent z-20">
                  <div className="absolute top-0 bottom-0 left-[-1px] w-[1px] border-l border-dashed border-white/15 h-full" />
                  
                  {/* Perforated ticket punch notches */}
                  <div className="absolute top-[-10px] left-[-10px] w-5 h-5 bg-[#0C0907] border border-white/10 rounded-full z-20" />
                  <div className="absolute bottom-[-10px] left-[-10px] w-5 h-5 bg-[#0C0907] border border-white/10 rounded-full z-20" />
                </div>

                {/* Right side: Detailed Narrative Analysis */}
                <div className="p-6 sm:p-8 md:p-10 w-full md:w-3/5 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-none font-sans bg-[#0c0f14]">
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-editorial font-bold text-white tracking-tight leading-tight">
                          {selectedMovie.caption}
                        </h2>
                        <span className="text-xs text-glory-gold font-bold uppercase tracking-wider mt-1 block">
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

                    {/* Stats strip */}
                    <div className="grid grid-cols-3 gap-3 border-y border-white/5 py-4 mb-6 text-xs bg-black/10 px-4 rounded-xl">
                      <div>
                        <span className="text-white/35 block mb-1 uppercase tracking-wider font-semibold text-[8px]">
                          {content.modalDirector}
                        </span>
                        <span className="text-white font-medium">
                          {getMovieExtraData(selectedMovie.path).director}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/35 block mb-1 uppercase tracking-wider font-semibold text-[8px]">
                          {content.modalYear}
                        </span>
                        <span className="text-white font-medium">
                          {getMovieExtraData(selectedMovie.path).year}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/35 block mb-1 uppercase tracking-wider font-semibold text-[8px]">
                          {content.modalRuntime}
                        </span>
                        <span className="text-white font-medium">
                          {getMovieExtraData(selectedMovie.path).runtime}
                        </span>
                      </div>
                    </div>

                    {/* Editorial Essay */}
                    <div className="space-y-4 mb-8">
                      <p className="text-sm text-[#F5EDD8]/80 leading-relaxed font-serif">
                        {selectedMovie.description}
                      </p>
                    </div>

                    {/* Innovation Callout */}
                    <div className="p-5 rounded-xl bg-glory-gold/[0.01] border border-glory-gold/15 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-glory-gold/[0.02] to-transparent pointer-events-none" />
                      <div className="flex gap-3">
                        <Sparkles className="w-5 h-5 text-glory-gold shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-[10px] font-bold text-glory-gold uppercase tracking-wider mb-2">
                            {content.modalBreakthrough}
                          </h4>
                          <h5 className="text-sm font-semibold text-white mb-1 font-sans">
                            {getMovieExtraData(selectedMovie.path).innovationTitle}
                          </h5>
                          <p className="text-xs text-[#F5EDD8]/70 leading-relaxed font-sans">
                            {getMovieExtraData(selectedMovie.path).innovationText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Close footer */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
                    <button
                      onClick={() => setSelectedMovie(null)}
                      className="px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-navy-dark hover:border-white transition-all duration-300"
                    >
                      {content.closeBtn}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between border-t border-white/10 pt-12 mt-16 font-sans">
          <a
            href="/culture/overview"
            className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors"
          >
            {content.backLink}
          </a>
          <a
            href="/culture/sports"
            className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors"
          >
            {content.nextLink}
          </a>
        </div>
      </div>
    </div>
  );
}
