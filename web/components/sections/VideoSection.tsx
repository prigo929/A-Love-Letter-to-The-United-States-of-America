"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Clock, Tag } from "lucide-react";
import { fadeUp, scaleUp, staggerContainer } from "@/lib/animations";
import { VIDEO_PREVIEWS } from "@/lib/data/home";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";

export function VideoSection() {
  const { locale } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videos =
    locale === "ro"
      ? [
          {
            ...VIDEO_PREVIEWS[0],
            title: "Peisajul American",
            description:
              "Din Munții Stâncoși până în Everglades-ul Floridei — o călătorie cinematografică prin minunile naturale fără egal ale Americii.",
            category: "Natură",
          },
          {
            ...VIDEO_PREVIEWS[1],
            title: "Construită prin Inovație",
            description:
              "Din laboratorul lui Edison până în Silicon Valley — povestea felului în care ingeniozitatea americană a reconfigurat lumea.",
            category: "Inovație",
          },
          {
            ...VIDEO_PREVIEWS[2],
            title: "Apărătoarea Libertății",
            description:
              "Povestea celei mai puternice armate din istorie — și a păcii pe care a menținut-o timp de 80 de ani.",
            category: "Armată",
          },
        ]
      : VIDEO_PREVIEWS;
  const active = videos.find((video) => video.id === activeVideo);
  const copy =
    locale === "ro"
      ? {
          eyebrow: "America în Mișcare",
          title: "Privește Povestea",
          description:
            "Documentare cinematografice care celebrează peisajele, inovațiile și apărătorii Americii.",
          phaseNotice:
            "★ Seria completă de documentare vine în Faza 16 — Galeria Media ★",
          closeLabel: "Închide video-ul",
          modalNotice: "🎬 Video-ul complet va fi disponibil în Faza 16 — Galeria Media",
          playPrefix: "Redă:",
        }
      : {
          eyebrow: "America in Motion",
          title: "Watch the Story",
          description:
            "Cinematic documentaries celebrating America's landscapes, innovations, and defenders.",
          phaseNotice:
            "★ Full documentary series coming in Phase 16 — Media Gallery ★",
          closeLabel: "Close video",
          modalNotice: "🎬 Full video available in Phase 16 — Media Gallery",
          playPrefix: "Play:",
        };

  return (
    <section
      className="relative overflow-hidden bg-navy-dark py-24 md:py-32"
      aria-labelledby="video-heading"
    >
      <div
        className="absolute bottom-0 left-0 top-0 w-1 bg-glory-red"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="mb-14"
        >
          <motion.p variants={fadeUp} className="section-eyebrow">
            {copy.eyebrow}
          </motion.p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <motion.h2
              id="video-heading"
              variants={fadeUp}
              className="font-display text-h2 text-white"
            >
              {copy.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="max-w-sm font-body text-sm text-white/50"
            >
              {copy.description}
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              variants={scaleUp}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:border-glory-gold/40",
                index === 0 && "md:col-span-2 md:row-span-1",
              )}
              onClick={() => setActiveVideo(video.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) =>
                event.key === "Enter" && setActiveVideo(video.id)
              }
              aria-label={`${copy.playPrefix} ${video.title}`}
            >
              <div
                className={cn(
                  "relative w-full overflow-hidden",
                  index === 0 ? "aspect-video" : "aspect-[4/3]",
                )}
              >
                <Image
                  src={video.thumbnailSrc}
                  alt={video.thumbnailAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/30 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-glory-gold shadow-gold-lg"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Play
                      className="ml-1 h-6 w-6 fill-navy-dark text-navy-dark"
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>

                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-black/60 px-2.5 py-1 backdrop-blur-sm">
                  <Clock className="h-3 w-3 text-white/70" aria-hidden="true" />
                  <span className="font-body text-xs font-medium text-white/80">
                    {video.duration}
                  </span>
                </div>

                <div className="absolute left-3 top-3 flex items-center gap-1 rounded-lg border border-glory-gold/30 bg-glory-gold/20 px-2.5 py-1 backdrop-blur-sm">
                  <Tag className="h-3 w-3 text-glory-gold" aria-hidden="true" />
                  <span className="font-body text-xs font-semibold text-glory-gold">
                    {video.category}
                  </span>
                </div>
              </div>

              <div className="bg-navy-light/80 p-4">
                <div
                  className="mb-2 h-0.5 w-8 bg-glory-gold transition-all duration-300 group-hover:w-16"
                  aria-hidden="true"
                />
                <h3 className="mb-1 font-display text-lg font-semibold text-white transition-colors group-hover:text-glory-gold">
                  {video.title}
                </h3>
                <p className="line-clamp-2 font-body text-sm leading-snug text-white/50">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-8 text-center font-body text-sm text-white/30"
        >
          {copy.phaseNotice}
        </motion.p>
      </div>

      <AnimatePresence>
        {activeVideo && active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
              onClick={() => setActiveVideo(null)}
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-4 z-50 flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-navy-dark shadow-2xl md:inset-12 lg:inset-20"
              role="dialog"
              aria-modal="true"
              aria-label={`Video: ${active.title}`}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-widest text-glory-gold">
                    {active.category}
                  </p>
                  <h3 className="font-display text-xl text-white">
                    {active.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold"
                  aria-label={copy.closeLabel}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="relative flex flex-1 items-center justify-center bg-black">
                <Image
                  src={active.thumbnailSrc}
                  alt={active.thumbnailAlt}
                  fill
                  className="object-cover opacity-30"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
                <div className="relative z-10 px-8 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-glory-gold bg-glory-gold/20">
                    <Play
                      className="ml-1 h-8 w-8 fill-glory-gold text-glory-gold"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mb-2 font-display text-2xl text-white">
                    {active.title}
                  </p>
                  <p className="mx-auto mb-6 max-w-md font-body text-sm text-white/60">
                    {active.description}
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3">
                    <span className="font-body text-sm text-white/60">
                      {copy.modalNotice}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
