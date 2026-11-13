"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, RotateCcw, HelpCircle, ChevronRight, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { askAmericaOracle } from "@/app/actions/ask-america";

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


    const { response, cta } = await askAmericaOracle(question, locale);
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
          aria-label={isRo ? "Trimite întrebarea" : "Send question"}
          title={isRo ? "Trimite întrebarea" : "Send question"}
          className="px-4 py-2 rounded-md bg-white hover:bg-zinc-200 text-black font-semibold disabled:opacity-50 transition-colors flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
