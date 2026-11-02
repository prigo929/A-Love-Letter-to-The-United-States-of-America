"use client";

import { useState, useMemo } from "react";
import {
  CIVICS_QUESTIONS,
  CIVICS_CATEGORIES,
  QuizQuestion,
  QuizCategory,
} from "@/lib/data/civics-quiz-data";
import {
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Star,
  Sparkles,
  Share2,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface CivicsQuizProps {
  locale: string;
}

type QuizLength = 10 | 20 | 25;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function CivicsQuiz({ locale }: CivicsQuizProps) {
  const isRo = locale === "ro";

  // Configuration state
  const [quizLength, setQuizLength] = useState<QuizLength>(20);
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | "all">("all");
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Active quiz state
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: { selected: number; isCorrect: boolean } }>({});
  const [copied, setCopied] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  // Filter pool and start quiz
  const startQuiz = () => {
    let pool = CIVICS_QUESTIONS;
    if (selectedCategory !== "all") {
      pool = CIVICS_QUESTIONS.filter((q) => q.category === selectedCategory);
    }
    const shuffled = shuffleArray(pool).slice(0, Math.min(quizLength, pool.length));
    setActiveQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setQuizFinished(false);
    setReviewMode(false);
    setQuizStarted(true);
  };

  const currentQ = activeQuestions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);

    const isCorrect = idx === currentQ.correctIndex;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        selected: idx,
        isCorrect,
      },
    }));
  };

  const handleNext = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  // Score statistics
  const score = useMemo(() => {
    return Object.values(userAnswers).filter((a) => a.isCorrect).length;
  }, [userAnswers]);

  const percentage = useMemo(() => {
    if (!activeQuestions.length) return 0;
    return Math.round((score / activeQuestions.length) * 100);
  }, [score, activeQuestions]);

  const isPassed = percentage >= 60; // Standard 60% USCIS naturalization passing standard

  // Rank title
  const rank = useMemo(() => {
    if (percentage === 100) {
      return {
        title: isRo ? "Părinte Fondator / Savant Constituțional" : "Founding Father / Constitutional Scholar",
        badge: "★ ★ ★ ★ ★",
        color: "text-glory-gold border-glory-gold/40 bg-glory-gold/10",
      };
    }
    if (percentage >= 80) {
      return {
        title: isRo ? "Cetățean de Onoare / Patriot Exemplar" : "Honor Citizen / Exemplary Patriot",
        badge: "★ ★ ★ ★",
        color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
      };
    }
    if (percentage >= 60) {
      return {
        title: isRo ? "Cetățean Naturalizat al Statelor Unite" : "Naturalized United States Citizen",
        badge: "★ ★ ★",
        color: "text-blue-400 border-blue-500/40 bg-blue-500/10",
      };
    }
    return {
      title: isRo ? "Student al Libertății / Începător Civic" : "Student of Liberty / Aspiring Citizen",
      badge: "★ ★",
      color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    };
  }, [percentage, isRo]);

  const handleShare = () => {
    const text = isRo
      ? `Am obținut ${score}/${activeQuestions.length} (${percentage}%) la Testul Oficial de Cetățenie și Civică Americană pe America: The Greatest Nation! Rang: ${rank.title}. Testează-ți și tu cunoștințele:`
      : `I scored ${score}/${activeQuestions.length} (${percentage}%) on the Official U.S. Civics & Citizenship Test on America: The Greatest Nation! Rank: ${rank.title}. Test your knowledge:`;
    
    if (navigator.share) {
      navigator.share({
        title: "U.S. Civics & Naturalization Quiz",
        text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* ── 1. QUIZ START SCREEN ────────────────────────────────────────── */}
      {!quizStarted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-10 shadow-2xl text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-glory-gold/30 bg-glory-gold/10 text-glory-gold text-xs font-semibold uppercase tracking-widest mb-6">
            <ShieldCheck className="w-4 h-4 text-glory-gold" />
            <span>{isRo ? "Testul Oficial USCIS" : "Official USCIS Civics Test"}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl text-white font-bold mb-4">
            {isRo ? "Testul de Civică și Cetățenie Americană" : "U.S. Civics & Naturalization Quiz"}
          </h2>

          <p className="font-body text-base text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
            {isRo
              ? "Testați-vă cunoștințele despre Constituția SUA, istoria națională, guvernare și simbolurile libertății. Întrebările sunt aliniate cu cele 100 de întrebări oficiale pentru obținerea cetățeniei americane."
              : "Challenge yourself with authentic questions from the official U.S. naturalization exam. Test your mastery of American governance, founding principles, landmark history, and national symbols."}
          </p>

          {/* Configuration controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto text-left mb-10">
            {/* Exam Length */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2 font-mono">
                {isRo ? "Formatul Testului" : "Test Format"}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 10, label: isRo ? "10 Întrebări" : "10 Sprint" },
                  { value: 20, label: isRo ? "20 Oficial" : "20 Official" },
                  { value: 25, label: isRo ? "25 Toate" : "25 Master" },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setQuizLength(item.value as QuizLength)}
                    className={cn(
                      "py-2.5 px-2 rounded-xl text-xs font-semibold text-center border transition-all",
                      quizLength === item.value
                        ? "border-glory-gold bg-glory-gold/15 text-glory-gold shadow-gold-sm"
                        : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2 font-mono">
                {isRo ? "Domeniu Tematic" : "Subject Focus"}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full py-2.5 px-3 rounded-xl bg-navy-mid border border-white/15 text-white font-body text-xs focus:outline-none focus:border-glory-gold"
              >
                <option value="all">{isRo ? "Toate domeniile (Guvern, Istorie, Simboluri)" : "All Subjects (Comprehensive)"}</option>
                <option value="government">{isRo ? "Guvernul și Constituția" : "American Government & Constitution"}</option>
                <option value="history">{isRo ? "Istoria Statelor Unite" : "American History & Landmark Eras"}</option>
                <option value="symbols_geography">{isRo ? "Simboluri, Geografie & Sărbători" : "Symbols, Geography & Holidays"}</option>
              </select>
            </div>
          </div>

          {/* Start CTA */}
          <button
            type="button"
            onClick={startQuiz}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-glory-gold text-navy-dark font-display text-base font-bold shadow-gold hover:bg-glory-gold-dark hover:shadow-gold-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>{isRo ? "Începe Testul Acum" : "Begin Citizenship Exam"}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}

      {/* ── 2. ACTIVE QUIZ QUESTION ─────────────────────────────────────── */}
      {quizStarted && !quizFinished && currentQ && (
        <div className="space-y-6">
          {/* Top Progress & Stats Bar */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase px-2.5 py-1 rounded-md bg-white/10 text-glory-gold font-semibold">
                {isRo ? `Întrebarea ${currentIndex + 1} din ${activeQuestions.length}` : `Question ${currentIndex + 1} of ${activeQuestions.length}`}
              </span>
              <span className="text-xs text-white/50 hidden sm:inline">
                {isRo ? currentQ.categoryLabel.ro : currentQ.categoryLabel.en}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-xs font-mono text-white/70">
                {isRo ? "Scor:" : "Score:"} <span className="text-emerald-400 font-bold">{score}</span> / {currentIndex}
              </div>
              <button
                type="button"
                onClick={() => setQuizStarted(false)}
                className="text-xs text-white/40 hover:text-white transition-colors"
              >
                {isRo ? "Renunță" : "Exit"}
              </button>
            </div>
          </div>

          {/* Progress bar line */}
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
            <motion.div
              className="bg-glory-gold h-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Main Question Card */}
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-10 shadow-2xl"
          >
            <h3 className="font-display text-xl sm:text-2xl text-white font-semibold leading-relaxed mb-8">
              {isRo ? currentQ.question.ro : currentQ.question.en}
            </h3>

            {/* Answer Options */}
            <div className="space-y-3 mb-8">
              {(isRo ? currentQ.options.ro : currentQ.options.en).map((optionText, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                const showSuccess = isAnswerSubmitted && isCorrect;
                const showFailure = isAnswerSubmitted && isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={cn(
                      "w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group",
                      !isAnswerSubmitted && "border-white/10 bg-white/[0.02] hover:border-glory-gold/50 hover:bg-white/[0.06] text-white/90",
                      showSuccess && "border-emerald-500/70 bg-emerald-500/15 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
                      showFailure && "border-glory-red/70 bg-glory-red/15 text-red-100",
                      isAnswerSubmitted && !isSelected && !isCorrect && "opacity-40 border-white/5 bg-transparent"
                    )}
                  >
                    <div className="flex items-center gap-3.5 pr-2">
                      <span className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-semibold border transition-colors shrink-0",
                        !isAnswerSubmitted && "border-white/15 bg-white/5 text-white/60 group-hover:border-glory-gold group-hover:text-glory-gold",
                        showSuccess && "border-emerald-500 bg-emerald-500 text-black",
                        showFailure && "border-glory-red bg-glory-red text-white"
                      )}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="font-body text-sm sm:text-base font-medium">
                        {optionText}
                      </span>
                    </div>

                    {showSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    {showFailure && <XCircle className="w-5 h-5 text-glory-red shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation / Historical Note reveal */}
            <AnimatePresence>
              {isAnswerSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-glory-gold/30 bg-glory-gold/5 p-5 mb-8"
                >
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-glory-gold shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="font-body text-xs font-semibold uppercase tracking-wider text-glory-gold font-mono">
                        {isRo ? "Explicație Constituțională" : "Constitutional Explanation"}
                      </p>
                      <p className="font-body text-sm text-white/90 leading-relaxed">
                        {isRo ? currentQ.explanation.ro : currentQ.explanation.en}
                      </p>
                      <p className="font-body text-xs text-white/60 italic pt-1 border-t border-white/10">
                        <span className="font-semibold text-white/80 not-italic mr-1">{isRo ? "Fapt istoric:" : "Historical fact:"}</span>
                        {isRo ? currentQ.historicalFact.ro : currentQ.historicalFact.en}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Question CTA */}
            {isAnswerSubmitted && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-glory-gold text-navy-dark font-display font-bold text-sm shadow-gold hover:bg-glory-gold-dark transition-all"
                >
                  <span>
                    {currentIndex + 1 < activeQuestions.length
                      ? (isRo ? "Următoarea Întrebare" : "Next Question")
                      : (isRo ? "Vezi Rezultatul Final" : "View Final Results")}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* ── 3. RESULTS SCORECARD ────────────────────────────────────────── */}
      {quizFinished && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl p-6 sm:p-12 shadow-2xl text-center"
        >
          {/* Certificate header */}
          <div className="flex justify-center gap-1.5 mb-4 text-glory-gold" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-glory-gold" />
            ))}
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 mb-2">
            {isRo ? "RAPORT OFICIAL AL TESTULUI DE CIVICĂ" : "OFFICIAL CIVICS TEST SCORE REPORT"}
          </p>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-6">
            {isPassed
              ? (isRo ? "EXAMEN PROMOVAT! 🇺🇸" : "EXAM PASSED! 🇺🇸")
              : (isRo ? "NECESITĂ REVIZUIRE 📜" : "NEEDS REVIEW 📜")}
          </h2>

          {/* Big score circle */}
          <div className="relative inline-flex items-center justify-center w-36 h-36 rounded-full border-4 border-glory-gold/40 bg-glory-gold/10 mb-6 shadow-gold">
            <div className="text-center">
              <span className="font-hero text-4xl text-white block leading-none">{percentage}%</span>
              <span className="font-mono text-xs text-glory-gold block mt-1">
                {score} / {activeQuestions.length}
              </span>
            </div>
          </div>

          {/* Rank Badge */}
          <div className={cn("inline-block px-5 py-2.5 rounded-2xl border font-body text-sm font-semibold mb-8 max-w-md mx-auto", rank.color)}>
            <span className="block text-xs uppercase tracking-widest opacity-80 mb-0.5">{rank.badge}</span>
            <span>{rank.title}</span>
          </div>

          <p className="font-body text-sm text-white/70 max-w-lg mx-auto leading-relaxed mb-8">
            {isPassed
              ? (isRo
                  ? `Felicitări! Ați atins ${percentage}%, depășind pragul oficial de 60% cerut la interviul de cetățenie al Serviciului de Imigrare al SUA (USCIS).`
                  : `Congratulations! You scored ${percentage}%, passing the official 60% requirement used by the U.S. Citizenship and Immigration Services (USCIS) in naturalization interviews.`)
              : (isRo
                  ? `Ați obținut ${percentage}%. Standardul oficial de promovare este de 60% (12 din 20). Revedeți răspunsurile mai jos și reîncercați testul!`
                  : `You scored ${percentage}%. The official naturalization passing benchmark is 60% (12 out of 20). Review your questions below and try again!`)}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button
              type="button"
              onClick={startQuiz}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-glory-gold text-navy-dark font-display font-bold text-sm shadow-gold hover:bg-glory-gold-dark transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isRo ? "Reia Testul" : "Retake Test"}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white font-display font-semibold text-sm hover:bg-white/10 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? (isRo ? "Copiat în clipboard!" : "Copied!") : (isRo ? "Distribuie Rezultatul" : "Share Score")}</span>
            </button>

            <button
              type="button"
              onClick={() => setReviewMode((v) => !v)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white/80 font-body text-sm hover:bg-white/10 transition-all"
            >
              <BookOpen className="w-4 h-4 text-glory-gold" />
              <span>{reviewMode ? (isRo ? "Ascunde Răspunsurile" : "Hide Review") : (isRo ? "Revizuiește Toate Întrebările" : "Review All Answers")}</span>
              {reviewMode ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Review mode drawer */}
          <AnimatePresence>
            {reviewMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-left space-y-4 pt-6 border-t border-white/10"
              >
                <h4 className="font-display text-lg text-white font-bold mb-4">
                  {isRo ? "Revizuirea Întrebărilor și Explicații" : "Question Review & Historical Backstory"}
                </h4>

                {activeQuestions.map((q, idx) => {
                  const ans = userAnswers[q.id];
                  const wasCorrect = ans?.isCorrect;

                  return (
                    <div
                      key={q.id}
                      className={cn(
                        "p-5 rounded-2xl border text-sm",
                        wasCorrect ? "border-emerald-500/30 bg-emerald-500/5" : "border-glory-red/30 bg-glory-red/5"
                      )}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-semibold text-white/60">
                          #{idx + 1} · {isRo ? q.categoryLabel.ro : q.categoryLabel.en}
                        </span>
                        {wasCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold font-mono">
                            <Check className="w-3.5 h-3.5" /> {isRo ? "CORECT" : "CORRECT"}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-glory-red font-semibold font-mono">
                            <XCircle className="w-3.5 h-3.5" /> {isRo ? "INCORECT" : "INCORRECT"}
                          </span>
                        )}
                      </div>

                      <p className="font-display font-semibold text-white mb-2">
                        {isRo ? q.question.ro : q.question.en}
                      </p>

                      <p className="text-xs text-white/70 mb-1">
                        <strong className="text-glory-gold">{isRo ? "Răspuns corect:" : "Correct answer:"}</strong>{" "}
                        {(isRo ? q.options.ro : q.options.en)[q.correctIndex]}
                      </p>

                      <p className="text-xs text-white/50 italic border-t border-white/5 pt-2 mt-2">
                        {isRo ? q.explanation.ro : q.explanation.en}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

