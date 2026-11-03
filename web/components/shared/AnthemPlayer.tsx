"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause, Music, ChevronDown, Check, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface Track {
  id: string;
  src: string;
  title: { en: string; ro: string };
  subtitle: { en: string; ro: string };
  duration: string;
}

const ANTHEM_TRACKS: Track[] = [
  {
    id: "anthem-epic",
    src: "/audio/anthem-epic.mp3",
    title: {
      en: "The Star-Spangled Banner",
      ro: "Imnul Național al SUA",
    },
    subtitle: {
      en: "Epic Cinematic Orchestral",
      ro: "Orchestral Cinematic Epic",
    },
    duration: "3:05",
  },
  {
    id: "anthem-instrumental",
    src: "/audio/anthem-instrumental.mp3",
    title: {
      en: "The Star-Spangled Banner",
      ro: "Imnul Național al SUA",
    },
    subtitle: {
      en: "Traditional Military Brass",
      ro: "Fanfară Militară Tradițională",
    },
    duration: "1:26",
  },
  {
    id: "anthem-piano",
    src: "/audio/anthem-piano.mp3",
    title: {
      en: "The Star-Spangled Banner",
      ro: "Imnul Național al SUA",
    },
    subtitle: {
      en: "Solemn Piano Solo",
      ro: "Solo Solemn la Pian",
    },
    duration: "1:44",
  },
  {
    id: "ambient-exhibit",
    src: "/audio/ambient-exhibit.mp3",
    title: {
      en: "The American Legend",
      ro: "Legenda Americană",
    },
    subtitle: {
      en: "Symphonic Exhibit Theme",
      ro: "Suită Simfonică de Expoziție",
    },
    duration: "2:20",
  },
];

export function AnthemPlayer({ className }: { className?: string }) {
  const { locale } = useLanguage();
  const isRo = locale === "ro";

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = ANTHEM_TRACKS[currentTrackIndex];

  // Close popup on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Update volume on audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("[AnthemPlayer] Playback blocked or failed:", err);
      });
    }
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    const audio = audioRef.current;
    if (audio) {
      audio.src = ANTHEM_TRACKS[index].src;
      audio.load();
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("[AnthemPlayer] Error playing track:", err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div ref={dropdownRef} className={cn("relative flex items-center shrink-0 text-left", className)}>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="none"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={() => {
          // Play next track or loop
          const nextIdx = (currentTrackIndex + 1) % ANTHEM_TRACKS.length;
          selectTrack(nextIdx);
        }}
      />

      {/* Main Pill Button */}
      <div className="flex items-center rounded-xl border border-white/15 bg-white/5 backdrop-blur-md transition-all duration-200 hover:border-glory-gold/40 hover:bg-white/10 shrink-0">
        {/* Play / Pause Toggle Button */}
        <button
          type="button"
          onClick={togglePlay}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-white/90 hover:text-glory-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold rounded-l-xl transition-colors"
          aria-label={isPlaying ? (isRo ? "Pauză imn" : "Pause anthem") : (isRo ? "Redă imnul național" : "Play national anthem")}
          title={isPlaying ? (isRo ? "Pauză imn" : "Pause anthem") : (isRo ? "Redă imnul național" : "Play national anthem")}
        >
          {isPlaying ? (
            <Pause className="h-3.5 w-3.5 fill-glory-gold text-glory-gold animate-pulse shrink-0" />
          ) : (
            <Play className="h-3.5 w-3.5 fill-glory-gold text-glory-gold shrink-0" />
          )}

          {/* Equalizer animation bars */}
          <div className="flex items-end gap-0.5 h-3 w-3 overflow-hidden shrink-0" aria-hidden="true">
            <span
              className={cn(
                "w-0.5 rounded-full bg-glory-gold transition-all duration-300",
                isPlaying ? "h-2.5 animate-[pulse_0.6s_ease-in-out_infinite]" : "h-1 opacity-50"
              )}
            />
            <span
              className={cn(
                "w-0.5 rounded-full bg-glory-gold transition-all duration-300",
                isPlaying ? "h-3 animate-[pulse_0.8s_ease-in-out_infinite_0.15s]" : "h-1.5 opacity-50"
              )}
            />
            <span
              className={cn(
                "w-0.5 rounded-full bg-glory-gold transition-all duration-300",
                isPlaying ? "h-2 animate-[pulse_0.5s_ease-in-out_infinite_0.3s]" : "h-1 opacity-50"
              )}
            />
          </div>
        </button>

        {/* Dropdown open trigger */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="px-2 py-1.5 text-white/60 hover:text-white border-l border-white/10 rounded-r-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold shrink-0"
          aria-label={isRo ? "Alege versiunea imnului" : "Select anthem version"}
          aria-expanded={isOpen}
          title={isRo ? "Alege versiunea imnului" : "Select anthem version"}
        >
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform duration-200 shrink-0",
              isOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Popover Track Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-84 max-w-sm overflow-hidden rounded-2xl border border-white/15 bg-navy-dark/95 shadow-2xl backdrop-blur-2xl z-[70] p-4"
          >
            {/* Header / Current Playing */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-glory-gold/15 text-glory-gold">
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-hero text-sm tracking-wider text-white">
                    {isRo ? "COLECȚIE PATRIOTICĂ" : "PATRIOTIC SOUNDTRACK"}
                  </p>
                  <p className="font-body text-[11px] text-glory-gold truncate">
                    {isRo ? currentTrack.title.ro : currentTrack.title.en}
                  </p>
                </div>
              </div>

              {/* Mute button */}
              <button
                type="button"
                onClick={() => setIsMuted((m) => !m)}
                className="p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title={isMuted ? (isRo ? "Sunet activat" : "Unmute") : (isRo ? "Fără sunet" : "Mute")}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-glory-red" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Scrubber & Progress */}
            <div className="py-3">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-glory-gold"
                aria-label={isRo ? "Poziție redare" : "Seek time"}
              />
              <div className="flex justify-between items-center text-[10px] text-white/50 font-mono mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Volume control slider */}
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/10 text-xs text-white/60">
              <Volume2 className="w-3.5 h-3.5 opacity-70 shrink-0" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-glory-gold"
                aria-label={isRo ? "Volum" : "Volume"}
              />
              <span className="font-mono text-[10px] w-7 text-right">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>

            {/* Track List */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest px-2 mb-1">
                {isRo ? "Alege Versiunea" : "Select Version"}
              </p>
              {ANTHEM_TRACKS.map((track, idx) => {
                const isSelected = idx === currentTrackIndex;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => selectTrack(idx)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all",
                      isSelected
                        ? "bg-glory-gold/15 border border-glory-gold/30 text-white"
                        : "hover:bg-white/5 text-white/70 hover:text-white border border-transparent"
                    )}
                  >
                    <div className="min-w-0 pr-2">
                      <p className={cn("font-body text-xs font-semibold leading-tight", isSelected && "text-glory-gold")}>
                        {isRo ? track.subtitle.ro : track.subtitle.en}
                      </p>
                      <p className="font-body text-[10px] text-white/45 truncate mt-0.5">
                        {isRo ? track.title.ro : track.title.en}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono text-white/40">{track.duration}</span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-glory-gold" />
                      ) : (
                        <div className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* National Anthem Lyrics / History Quote */}
            <div className="mt-3 pt-3 border-t border-white/10 text-center">
              <p className="text-[10px] text-white/40 italic font-body">
                {isRo
                  ? "„O, say can you see by the dawn's early light...” — Francis Scott Key, 1814"
                  : '"O, say can you see by the dawn\'s early light..." — Francis Scott Key, 1814'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

