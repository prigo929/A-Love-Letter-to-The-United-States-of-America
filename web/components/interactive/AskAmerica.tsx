"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, RotateCcw, HelpCircle, ChevronRight, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { VERTICALS_THEMATIC_DATA } from "@/lib/data/verticals-thematic-data";

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
    responseEn: "America's founding was built on the core principle of a constitutional republic with limited government power. The Federalist Papers outlined a system of checks and balances where division of powers prevents tyranny, while the Bill of Rights safeguards individual liberty as inherent, natural rights.",
    responseRo: "Fondarea Americii s-a bazat pe principiul unei republici constituționale cu o guvernare limitată. Scrierile Federalist Papers au detaliat un sistem de control și echilibru în care separarea puterilor previne tirania, iar Carta Drepturilor protejează libertatea individuală ca drepturi naturale.",
    cta: {
      labelEn: "Explore Constitution & Founding →",
      labelRo: "Explorează Constituția și Fondarea →",
      href: "/constitution",
    },
  },
  {
    keywords: ["economy", "dollar", "gdp", "capital", "markets", "wall street", "finance", "trade", "economie", "moneda"],
    responseEn: "The U.S. economy is the world's largest, currently valued at $32.4 Trillion. Capital markets (NYSE and NASDAQ) represent the most liquid and deep investment pools globally. The U.S. dollar operates as the primary global reserve currency, backing over 60% of central bank reserves and securing international trade networks.",
    responseRo: "Economia SUA este cea mai mare din lume, evaluată în prezent la 32,4 trilioane de dolari. Piețele de capital (NYSE și NASDAQ) reprezintă cele mai lichide bazine de investiții la nivel global, iar dolarul american este principala monedă de rezervă, acoperind peste 60% din rezervele băncilor centrale.",
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
      href: "/culture/sports",
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
    responseEn: "The U.S. Armed Forces are the most capable military force in human history, backed by a $954 Billion defense budget. Global stability is sustained through 11 nuclear-powered aircraft carrier strike groups, over 800 overseas bases, and the NATO alliance, where the U.S. acts as the core security guarantor.",
    responseRo: "Forțele Armate ale SUA sunt cea mai capabilă forță militară din istoria omenirii, susținută de un buget de apărare de 954 miliarde de dolari. Stabilitatea globală este menținută prin 11 grupuri de atac cu portavion nuclear, peste 800 de baze externe și alianța NATO.",
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
    responseEn: "The modern conservation movement was born in America, leading to the creation of the world's first national park (Yellowstone) in 1872. Today, 63 national parks cover 85 million acres of protected wilderness, preserving the Arctic tundra of Alaska, the granite peaks of Yosemite, and the deep chasms of the Grand Canyon.",
    responseRo: "Mișcarea modernă de conservare s-a născut în America, ducând la crearea primului parc național din lume (Yellowstone, 1872). Astăzi, 63 de parcuri naționale protejează 85 de milioane de acri de sălbăticie, incluzând tundra arctică din Alaska, munții din Yosemite și Marele Canion.",
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
    ? "Bun venit la Oracolul Ask America. Sunt preîncărcat cu date, statistici și teze din toate cele 12 verticale ale proiectului american. Pune-mi orice întrebare."
    : "Welcome to the Ask America Oracle. I am preloaded with data, metrics, and arguments from all 12 verticals of the American project. Ask me anything.";

  const inputPlaceholder = isRo
    ? "Întreabă Oracolul despre America..."
    : "Ask the Oracle about America...";

  const suggestionTitle = isRo ? "Întrebări Sugerate" : "Suggested Questions";
  const analyzingText = isRo ? "Oracolul analizează..." : "Oracle analyzing...";

  const fallbackResponse = isRo
    ? "Sunt Oracolul Ask America. Pot analiza economia (PIB-ul de 32.4T$), principiile constituționale (Federalist Papers), tehnologia (Silicon Valley, AI), armata (NATO), sportul (NFL, NBA) și conservarea naturii. Încercați cuvinte cheie."
    : "I am the Ask America Oracle. I can analyze the economy ($32.4T GDP), constitutional principles (Federalist Papers), tech (Silicon Valley, AI), military (NATO), sports exports (NFL, NBA), and conservation history. Try keywords.";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "oracle",
      text: welcomeText,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const feedRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (feedRef.current) {
      feedRef.current.scrollTo({
        top: feedRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const findResponse = (text: string): { response: string; cta?: { label: string; href: string } } => {
    const cleanText = text.toLowerCase();
    
    // Stop words to remove from query words
    const stopWords = new Set([
      "the", "a", "an", "is", "of", "and", "in", "to", "for", "with", "about", 
      "on", "why", "what", "how", "who", "where", "explain", "describe", "tell", 
      "me", "show", "are", "by", "from", "that", "this", "these", "those"
    ]);
    
    // Parse query into unique significant search words
    const queryWords = cleanText
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2 && !stopWords.has(word));

    let bestMatch: {
      topic: any;
      vertical: string;
      sectionHeading: string;
      paragraphText: string;
      score: number;
    } | null = null;

    const genericTopicWords = new Set(["united", "states", "america", "american", "the", "of", "to", "in", "and", "for"]);

    // 1. Search through the 52 Grokipedia deep-dives
    for (const [vertical, topics] of Object.entries(VERTICALS_THEMATIC_DATA)) {
      for (const topic of topics) {
        const titleEn = topic.title.en.toLowerCase();
        const titleRo = topic.title.ro.toLowerCase();
        const idName = topic.id.toLowerCase().replace(/_/g, " ");

        // Tokenise title/ID to find unique significant words
        const titleWords = new Set(
          `${titleEn} ${titleRo} ${idName}`
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ")
            .split(/\s+/)
            .filter((word) => word.length > 2 && !genericTopicWords.has(word))
        );

        // Calculate matching fraction of title words against the query words
        const matchedTitleWords = Array.from(titleWords).filter((w) =>
          queryWords.some((qw) => w.startsWith(qw) || qw.startsWith(w))
        );

        const titleMatched = matchedTitleWords.length > 0;

        // Title boost based on matching fraction of significant topic terms
        let titleBoost = 0;
        if (titleMatched) {
          const fraction = titleWords.size > 0 ? matchedTitleWords.length / titleWords.size : 0.5;
          titleBoost = 10.0 + 10.0 * fraction;

          // Subject Directness Boost: if topic represents exactly the single word queried
          if (titleWords.size === 1) {
            titleBoost += 10.0;
          }
        }

        for (const section of topic.sections) {
          const secHeading = isRo ? section.heading.ro : section.heading.en;

          // Introduction boost
          let introBoost = 0.0;
          const secHeadingLower = (secHeading || "").toLowerCase();
          if (
            secHeadingLower === "introduction" ||
            secHeadingLower === "introducere" ||
            secHeadingLower === "overview" ||
            secHeadingLower === "prezentare generală" ||
            secHeadingLower === "prezentare"
          ) {
            introBoost = 1.5;
          }

          for (const sub of section.subsections) {
            for (const para of sub.paragraphs) {
              const paraText = isRo ? para.ro : para.en;
              if (!paraText) continue;

              const paraLower = paraText.toLowerCase();
              const paraWords = paraLower
                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ")
                .split(/\s+/);

              let score = 0;

              for (const word of queryWords) {
                const hasMatch = paraWords.some((pw) =>
                  pw.length >= 3 && (pw.startsWith(word) || word.startsWith(pw))
                );
                if (hasMatch) {
                  score += 1.0;
                }
              }

              const totalScore = score + titleBoost + introBoost;

              // Save the best scoring paragraph match (minimum base score of 1 match word, excluding title boost)
              if (score > 0 && (!bestMatch || totalScore > bestMatch.score)) {
                bestMatch = {
                  topic,
                  vertical,
                  sectionHeading: secHeading || (isRo ? topic.title.ro : topic.title.en),
                  paragraphText: paraText,
                  score: totalScore,
                };
              } else if (score > 0 && bestMatch && totalScore === bestMatch.score) {
                // Tie break by ID length (prefer shorter/more general parent topics)
                if (topic.id.length < bestMatch.topic.id.length) {
                  bestMatch = {
                    topic,
                    vertical,
                    sectionHeading: secHeading || (isRo ? topic.title.ro : topic.title.en),
                    paragraphText: paraText,
                    score: totalScore,
                  };
                }
              }
            }
          }
        }
      }
    }

    if (bestMatch && bestMatch.score >= 2) {
      return {
        response: isRo
          ? `Din arhiva noastră detaliată despre „${bestMatch.topic.title.ro}” (Secțiunea: ${bestMatch.sectionHeading}):\n\n„${bestMatch.paragraphText}”`
          : `From our detailed archive on "${bestMatch.topic.title.en}" (Section: ${bestMatch.sectionHeading}):\n\n"${bestMatch.paragraphText}"`,
        cta: {
          label: isRo
            ? `Citește documentul complet despre „${bestMatch.topic.title.ro}” →`
            : `Read full document on "${bestMatch.topic.title.en}" →`,
          href: `/${bestMatch.vertical}#deep-dive-${bestMatch.topic.id}`,
        },
      };
    }

    // 2. Fall back to exact title matching (if score was below threshold but title matched)
    for (const [vertical, topics] of Object.entries(VERTICALS_THEMATIC_DATA)) {
      for (const topic of topics) {
        const titleEn = topic.title.en.toLowerCase();
        const titleRo = topic.title.ro.toLowerCase();
        const idName = topic.id.toLowerCase().replace(/_/g, " ");

        if (
          cleanText.includes(titleEn) ||
          cleanText.includes(titleRo) ||
          cleanText.includes(idName)
        ) {
          const firstSection = topic.sections[0];
          const firstSub = firstSection?.subsections[0];
          const firstPara = firstSub?.paragraphs[0];
          const introText = isRo ? firstPara?.ro : firstPara?.en;

          if (introText) {
            return {
              response: isRo
                ? `Conform arhivei noastre detaliate despre „${topic.title.ro}”:\n\n${introText}`
                : `According to our detailed archive on "${topic.title.en}":\n\n${introText}`,
              cta: {
                label: isRo
                  ? `Citește documentul complet despre „${topic.title.ro}” →`
                  : `Read full document on "${topic.title.en}" →`,
                href: `/${vertical}#deep-dive-${topic.id}`,
              },
            };
          }
        }
      }
    }

    // 3. Fall back to generic knowledge base
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

    await new Promise((resolve) => setTimeout(resolve, 800));

    const { response, cta } = findResponse(question);
    setIsTyping(false);

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

    let currentText = "";
    let i = 0;
    const chunkSize = Math.max(2, Math.ceil(response.length / 120)); // stream faster for longer texts (max ~1.5s total)
    const interval = setInterval(() => {
      if (i < response.length) {
        currentText += response.slice(i, i + chunkSize);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === oracleMsgId ? { ...msg, text: currentText } : msg
          )
        );
        i += chunkSize;
      } else {
        clearInterval(interval);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === oracleMsgId
              ? { ...msg, text: response, isStreaming: false, cta }
              : msg
          )
        );
      }
    }, 12);
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
    <div className="mx-auto max-w-4xl bg-black border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[600px] max-h-[75vh] text-zinc-100 font-sans">
      
      {/* Vercel-style Clean Header */}
      <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
          <div>
            <h2 className="text-xs font-semibold tracking-wider text-zinc-300 uppercase font-mono">
              Ask America Oracle
            </h2>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors"
          title="Reset session"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages Feed */}
      <div ref={feedRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-black">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-4 max-w-[85%] transition-all",
              msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            {/* Minimal Avatar */}
            <div className={cn(
              "w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 text-xs border font-mono transition-colors",
              msg.sender === "user"
                ? "bg-zinc-900 border-zinc-700 text-zinc-300"
                : "bg-white border-zinc-800 text-black font-extrabold"
            )}>
              {msg.sender === "user" ? "U" : "▲"}
            </div>

            {/* Bubble */}
            <div className="space-y-3">
              <div
                className={cn(
                  "rounded-lg px-4 py-3 text-sm leading-relaxed border transition-colors",
                  msg.sender === "user"
                    ? "bg-zinc-900 border-zinc-800 text-zinc-100"
                    : "bg-zinc-950 border-zinc-900 text-zinc-300"
                )}
              >
                {msg.text}
                {msg.isStreaming && (
                  <span className="inline-block w-1.5 h-3.5 bg-zinc-100 ml-1 animate-pulse" />
                )}
              </div>

              {/* Minimalist CTA Link */}
              {msg.cta && (
                <div className="animate-fade-in pl-0.5">
                  <a
                    href={msg.cta.href}
                    className="inline-flex items-center gap-1 text-xs font-medium text-white hover:text-zinc-300 transition-colors group"
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
            <div className="w-7 h-7 rounded-md bg-white border border-zinc-800 text-black flex items-center justify-center flex-shrink-0 font-mono text-xs font-extrabold">
              ▲
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-900 text-xs text-zinc-500">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400 animate-spin" />
              <span>{analyzingText}</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Questions Grid */}
      {messages.length === 1 && !isTyping && (
        <div className="px-6 py-4 bg-zinc-950/80 border-t border-zinc-800">
          <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-1.5 font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            {suggestionTitle}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {suggestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-left px-3 py-2 text-xs rounded-md bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors font-medium"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputValue);
        }}
        className="p-4 bg-zinc-950 border-t border-zinc-800 flex gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={inputPlaceholder}
          disabled={isTyping}
          className="flex-1 rounded-md bg-black border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="px-4 py-2 rounded-md bg-white hover:bg-zinc-200 text-black font-semibold disabled:opacity-50 transition-colors flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
