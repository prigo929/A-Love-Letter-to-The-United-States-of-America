"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, RotateCcw, HelpCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "user" | "oracle";
  text: string;
  isStreaming?: boolean;
  cta?: {
    label: string;
    href: string;
  };
}

interface AskAmericaProps {
  locale: string;
}

// Pre-defined knowledge base
interface KnowledgeItem {
  keywords: string[];
  responseEn: string;
  responseRo: string;
  cta: {
    labelEn: string;
    labelRo: string;
    href: string;
  };
}

const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    keywords: ["constitution", "founding", "government", "liberty", "rights", "federalist", "revolu", "constitu"],
    responseEn: "America's founding was built on the core principle of a constitutional republic with strictly limited government power. The Federalist Papers outlined a system of checks and balances where division of powers prevents tyranny, while the Bill of Rights safeguards individual liberty as inherent, natural rights.",
    responseRo: "Fondarea Americii s-a bazat pe principiul unei republici constituționale cu o guvernare strict limitată. Scrierile Federalist Papers au detaliat un sistem de control și echilibru în care separarea puterilor previne tirania, iar Carta Drepturilor protejează libertatea individuală ca drepturi naturale.",
    cta: {
      labelEn: "Explore Constitution & Founding →",
      labelRo: "Explorează Constituția și Fondarea →",
      href: "/constitution",
    },
  },
  {
    keywords: ["economy", "dollar", "gdp", "capital", "markets", "wall street", "finance", "trade", "economie", "moneda"],
    responseEn: "The U.S. economy is the world's largest, currently valued at $28.8 Trillion. Capital markets (NYSE and NASDAQ) represent the most liquid and deep investment pools globally. The U.S. dollar operates as the primary global reserve currency, backing over 60% of central bank reserves and securing international trade networks.",
    responseRo: "Economia SUA este cea mai mare din lume, evaluată în prezent la 28,8 trilioane de dolari. Piețele de capital (NYSE și NASDAQ) reprezintă cele mai lichide bazine de investiții la nivel global, iar dolarul american este principala monedă de rezervă, acoperind peste 60% din rezervele băncilor centrale.",
    cta: {
      labelEn: "Explore U.S. Capital & GDP →",
      labelRo: "Explorează Capitalul și PIB-ul SUA →",
      href: "/economy",
    },
  },
  {
    keywords: ["sports", "nfl", "nba", "mlb", "football", "super bowl", "basketball", "baseball", "ncaa", "sport"],
    responseEn: "American sports culture represents a massive soft-power export. The NFL's Super Bowl attracts over 100 million domestic viewers, acting as a de facto cultural holiday. Meanwhile, the NBA's global reach shapes street fashion and lifestyle trends across all continents, and the NCAA mobilizes local communities around colossal university stadiums.",
    responseRo: "Cultura sportivă americană reprezintă un export masiv de soft-power. Super Bowl-ul NFL atrage peste 100 de milioane de telespectatori, funcționând ca o sărbătoare națională, în timp ce NBA influențează moda și stilul urban pe toate continentele, iar NCAA adună comunitățile pe stadioane universitare gigantice.",
    cta: {
      labelEn: "Explore American Sports & Soft Power →",
      labelRo: "Explorează Sportul American și Soft Power →",
      href: "/culture/american-sports",
    },
  },
  {
    keywords: ["innovation", "technology", "internet", "iphone", "ai", "tech", "silicon valley", "space", "spacex", "cloud", "inovat"],
    responseEn: "From the invention of the ARPANET (the precursor to the Internet) to the personal computer revolution, the smartphone, and today's cutting-edge AI breakthroughs led by Silicon Valley (OpenAI, Google, Anthropic), the United States serves as the primary engine of global technological advancement.",
    responseRo: "De la crearea ARPANET (precursorul Internetului) până la revoluția computerelor personale, smartphone-uri și inovațiile AI conduse de Silicon Valley (OpenAI, Google, Anthropic), Statele Unite servesc drept motor principal al progresului tehnologic global.",
    cta: {
      labelEn: "Explore Silicon Valley & Innovation →",
      labelRo: "Explorează Silicon Valley și Inovația →",
      href: "/innovation",
    },
  },
  {
    keywords: ["military", "navy", "force", "nato", "army", "defense", "bases", "armat", "baze"],
    responseEn: "The U.S. Armed Forces are the most capable military force in human history, backed by a $916 Billion defense budget. Global stability is sustained through 11 nuclear-powered aircraft carrier strike groups, over 800 overseas bases, and the NATO alliance, where the U.S. acts as the core security guarantor.",
    responseRo: "Forțele Armate ale SUA sunt cea mai capabilă forță militară din istoria omenirii, susținută de un buget de apărare de 916 miliarde de dolari. Stabilitatea globală este menținută prin 11 grupuri de atac cu portavion nuclear, peste 800 de baze externe și alianța NATO.",
    cta: {
      labelEn: "Explore Military & Air Power →",
      labelRo: "Explorează Armata și Forțele Aeriene →",
      href: "/military",
    },
  },
  {
    keywords: ["university", "stem", "ivy", "education", "science", "inventions", "universit", "stiint", "scoala", "liceu"],
    responseEn: "U.S. higher education dominates global rankings, housing top Ivy League institutions and massive public research powerhouses. American scientific labs have driven world-changing breakthroughs, including polio eradication, semiconductor transistors, and the sequencing of the human genome.",
    responseRo: "Învățământul superior din SUA domină clasamentele globale, găzduind universități de elită din Ivy League și centre de cercetare publică. Laboratoarele americane au condus descoperiri epocale, inclusiv vaccinul antipoliomielitic, tranzistorii și genomul uman.",
    cta: {
      labelEn: "Explore Universities & STEM →",
      labelRo: "Explorează Universitățile și STEM →",
      href: "/universities",
    },
  },
  {
    keywords: ["nature", "parks", "yellowstone", "alaska", "grand canyon", "conserv", "natur", "parc"],
    responseEn: "The modern conservation movement was born in America, leading to the creation of the world's first national park (Yellowstone) in 1872. Today, 63 national parks cover 85 million acres of protected wilderness, spanning from the Arctic wilderness of Alaska to the deep chasms of the Grand Canyon.",
    responseRo: "Mișcarea modernă de conservare s-a născut în America, ducând la crearea primului parc național din lume (Yellowstone, 1872). Astăzi, 63 de parcuri naționale protejează 85 de milioane de acri de sălbăticie, de la Alaska la Grand Canyon.",
    cta: {
      labelEn: "Explore National Parks & Wilderness →",
      labelRo: "Explorează Parcurile Naționale și Sălbăticia →",
      href: "/nature/national-parks",
    },
  },
  {
    keywords: ["history", "lincoln", "civil war", "preservation", "reagan", "exceptionalism", "cold war", "dream", "popul", "istorie"],
    responseEn: "American history is a continuous battle to align reality with its founding creed of liberty. Critical eras include the preservation of the Union and abolition of slavery under Abraham Lincoln, the industrial rise of capitalism, WWII mobilization as the 'Arsenal of Democracy', and the collapse of communism.",
    responseRo: "Istoria americană este o luptă continuă pentru alinierea realității cu crezul său fondator de libertate. Edele critice includ conservarea Uniunii sub Abraham Lincoln, ascensiunea industrială a capitalismului și mobilizarea din Al Doilea Război Mondial.",
    cta: {
      labelEn: "Explore History & Exceptionalism →",
      labelRo: "Explorează Istoria și Excepționalismul →",
      href: "/history",
    },
  },
];

const SUGGESTED_QUESTIONS_EN = [
  "Why is the US dollar the world's reserve currency?",
  "What are the founding principles of the Constitution?",
  "Explain the soft power of American sports (NFL, NBA).",
  "How does Silicon Valley lead global technology?",
];

const SUGGESTED_QUESTIONS_RO = [
  "De ce este dolarul american moneda de rezervă a lumii?",
  "Care sunt principiile fondatoare ale Constituției?",
  "Explică soft power-ul sportului american (NFL, NBA).",
  "Cum conduce Silicon Valley tehnologia globală?",
];

export function AskAmerica({ locale }: AskAmericaProps) {
  const isRo = locale === "ro";

  const welcomeText = isRo
    ? "Bun venit la Oracolul Ask America. Sunt preîncărcat cu date, statistici și teze din toate cele 12 verticale ale proiectului american. Pune-mi orice întrebare despre economie, istorie, constituție, inovație sau cultura sportivă."
    : "Welcome to the Ask America Oracle. I am preloaded with data, metrics, and arguments from all 12 verticals of the American project. Ask me anything about our economy, history, constitution, innovation, or sports culture.";

  const inputPlaceholder = isRo
    ? "Întreabă Oracolul despre America..."
    : "Ask the Oracle about America...";

  const suggestionTitle = isRo ? "Întrebări Sugerate" : "Suggested Questions";
  const analyzingText = isRo ? "Oracolul analizează..." : "Oracle analyzing...";
  const statusOnlineText = isRo ? "ORACOL ONLINE" : "ORACLE ONLINE";

  const fallbackResponse = isRo
    ? "Sunt Oracolul Ask America. Pot analiza economia (PIB-ul de 28.8T$), principiile constituționale (Federalist Papers), tehnologia (Silicon Valley, AI), armata (NATO), sportul (NFL, NBA) și conservarea naturii. Introduceți cuvinte cheie precum 'economie', 'constituție', 'sport' sau 'inovație' pentru o analiză detaliată."
    : "I am the Ask America Oracle. I can analyze the economy ($28.8T GDP), constitutional principles (Federalist Papers), tech (Silicon Valley, AI), military (NATO), sports exports (NFL, NBA), and conservation history. Try entering keywords like 'economy', 'constitution', 'sports', or 'innovation' for a detailed deep-dive.";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "oracle",
      text: welcomeText,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Keyword matching search
  const findResponse = (text: string): { response: string; cta?: { label: string; href: string } } => {
    const cleanText = text.toLowerCase();

    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some((kw) => cleanText.includes(kw))) {
        return {
          response: isRo ? item.responseRo : item.responseEn,
          cta: {
            label: isRo ? item.cta.labelRo : item.cta.labelEn,
            href: item.cta.href,
          },
        };
      }
    }

    return { response: fallbackResponse };
  };

  const handleSend = async (question: string) => {
    if (!question.trim()) return;

    // Add user message
    const userMsgId = Date.now().toString();
    const newMessages = [
      ...messages,
      {
        id: userMsgId,
        sender: "user" as const,
        text: question,
      },
    ];
    setMessages(newMessages);
    setInputValue("");
    setIsTyping(true);

    // Simulate think duration
    await new Promise((resolve) => setTimeout(resolve, 900));

    const { response, cta } = findResponse(question);

    setIsTyping(false);

    // Add streaming empty message
    const oracleMsgId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: oracleMsgId,
        sender: "oracle" as const,
        text: "",
        isStreaming: true,
      },
    ]);

    // Stream text character-by-character
    let currentText = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < response.length) {
        currentText += response[i];
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === oracleMsgId ? { ...msg, text: currentText } : msg
          )
        );
        i += 2; // Stream 2 chars at a time for fast feels
      } else {
        clearInterval(interval);
        // Complete streaming state and attach CTA
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === oracleMsgId
              ? { ...msg, text: response, isStreaming: false, cta }
              : msg
          )
        );
      }
    }, 15);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        sender: "oracle",
        text: welcomeText,
      },
    ]);
  };

  const suggestions = isRo ? SUGGESTED_QUESTIONS_RO : SUGGESTED_QUESTIONS_EN;

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-navy-mid/60 backdrop-blur-md overflow-hidden shadow-2xl flex flex-col min-h-[600px] max-h-[75vh]">
      {/* Chat Header */}
      <div className="px-6 py-4 bg-navy-dark/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-glory-gold/10 border border-glory-gold/20 text-glory-gold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-hero text-sm tracking-widest text-white uppercase">
              ASK AMERICA
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-body text-emerald-400 font-bold uppercase tracking-wider">
                {statusOnlineText}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
          title="Reset chat"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-4 max-w-[85%] transition-all duration-300",
              msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            {/* Avatar */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs",
                msg.sender === "user"
                  ? "bg-glory-gold/20 text-glory-gold border border-glory-gold/30"
                  : "bg-navy-dark text-white/80 border border-white/10"
              )}
            >
              {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className="space-y-3">
              <div
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-body leading-relaxed border shadow-sm",
                  msg.sender === "user"
                    ? "bg-glory-gold/10 border-glory-gold/20 text-white"
                    : "bg-navy-dark/40 border-white/5 text-white/90"
                )}
              >
                {msg.text}
                {msg.isStreaming && (
                  <span className="inline-block w-1.5 h-3.5 bg-glory-gold/80 ml-1 animate-pulse" />
                )}
              </div>

              {/* Call to Action Link */}
              {msg.cta && (
                <div className="animate-fade-in pl-1">
                  <a
                    href={msg.cta.href}
                    className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-glory-gold hover:text-white transition-colors duration-150 group"
                  >
                    {msg.cta.label}
                    <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-4 max-w-[80%] mr-auto items-center">
            <div className="w-8 h-8 rounded-full bg-navy-dark text-white/80 border border-white/10 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-navy-dark/40 border border-white/5 text-xs font-body text-white/40">
              <Sparkles className="w-3.5 h-3.5 text-glory-gold animate-spin" />
              <span>{analyzingText}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Grid */}
      {messages.length === 1 && !isTyping && (
        <div className="px-6 py-4 bg-navy-dark/30 border-t border-white/5">
          <p className="text-[10px] font-body text-glory-gold font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            {suggestionTitle}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {suggestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-left px-3 py-2 rounded-xl text-xs font-body font-medium bg-navy-dark/50 hover:bg-glory-gold/10 border border-white/5 hover:border-glory-gold/25 text-white/70 hover:text-white transition-all duration-150"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputValue);
        }}
        className="p-4 bg-navy-dark/60 border-t border-white/10 flex gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={inputPlaceholder}
          disabled={isTyping}
          className="flex-1 rounded-xl bg-navy-dark/80 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-glory-gold/50 focus:border-glory-gold/50 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="p-3 rounded-xl bg-glory-gold hover:bg-glory-gold-light text-navy-dark font-semibold disabled:opacity-50 transition-colors flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
