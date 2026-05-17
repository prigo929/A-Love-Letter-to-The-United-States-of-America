"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Anchor,
  ArrowUpRight,
  Cpu,
  Gauge,
  Network,
  Plane,
  Satellite,
  Shield,
  Ship,
  Waves,
} from "lucide-react";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";
import type {
  NavyCapability,
  NavyCommandLayer,
  NavyFutureProgram,
  NavyMetric,
  NavyPlatform,
  NavyVisualPanel,
} from "@/lib/data/navy-data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function NavyStyles() {
  return (
    <style jsx global>{`
      .navy-page {
        --navy-black: #030507;
        --navy-ink: #071017;
        --navy-panel: rgba(9, 17, 24, 0.72);
        --navy-border: rgba(255, 255, 255, 0.1);
        --navy-blue: #8edcff;
        --navy-sea: #70e0bf;
        --navy-warm: #f2d48a;
        --navy-red: #ff6b6b;
        background: var(--navy-black);
        color: white;
      }

      .navy-font-display {
        font-family: var(--font-archivo), Inter, system-ui, sans-serif;
        letter-spacing: 0;
      }

      .navy-font-mono {
        font-family: var(--font-mono), "SFMono-Regular", Consolas, monospace;
        letter-spacing: 0;
      }

      .navy-grid-plane {
        background-image:
          linear-gradient(rgba(142, 220, 255, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(242, 212, 138, 0.05) 1px, transparent 1px);
        background-size: 56px 56px;
        mask-image: radial-gradient(ellipse at 50% 45%, black 0%, transparent 72%);
      }

      .navy-noise::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0.16;
        mix-blend-mode: screen;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E");
      }

      .navy-cinematic-line {
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.38), transparent);
      }
    `}</style>
  );
}

export function NavyHero({
  metrics,
  imageSrc,
}: {
  metrics: NavyMetric[];
  imageSrc: string;
}) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.22], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.45]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#030507]">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <Image
          src={imageSrc}
          alt="U.S. Navy aircraft carrier in cinematic light"
          fill
          priority
          quality={90}
          className="h-full w-full object-cover"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#030507_0%,rgba(3,5,7,0.8)_24%,rgba(3,5,7,0.18)_62%,#030507_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#030507_0%,rgba(3,5,7,0)_18%,rgba(3,5,7,0.08)_64%,#030507_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(180deg,transparent,#030507)]" />
      <div className="navy-grid-plane absolute inset-0 opacity-45" />
      <div className="navy-noise absolute inset-0" />

      <div className="relative z-10 flex min-h-[100svh] items-end">
        <div className="mx-auto grid w-full max-w-[1520px] gap-10 px-5 pb-8 pt-32 sm:px-8 md:grid-cols-[1fr_420px] md:items-end md:pb-12 lg:px-12">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08 }}
            className="max-w-5xl"
          >
            <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
              <span className="h-px w-14 bg-white/40" />
              <span className="navy-font-mono text-xs font-bold uppercase text-white/72">
                United States Navy
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="navy-font-display text-6xl font-black uppercase leading-[0.9] text-white sm:text-7xl md:text-8xl lg:text-9xl"
            >
              Sea Control.
              <span className="block text-white/28">Global Command.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-2xl text-base leading-8 text-white/72 md:text-lg"
            >
              The Navy is America's mobile aerospace, undersea, missile-defense, logistics,
              and deterrence grid. It turns oceans into maneuver space and keeps national
              power present without waiting for permission to use a runway.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="grid grid-cols-2 border border-white/10 bg-black/38 backdrop-blur-xl"
          >
            {metrics.map((metric) => (
              <div key={metric.label} className="min-h-36 border-b border-r border-white/10 p-5 last:border-r-0">
                <div className="navy-font-display text-4xl font-black text-white">{metric.value}</div>
                <div className="mt-2 text-sm font-semibold uppercase text-white/78">{metric.label}</div>
                <p className="mt-4 text-xs leading-5 text-white/46">{metric.detail}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function NavyMetricStrip({ metrics }: { metrics: NavyMetric[] }) {
  return (
    <section className="border-y border-white/10 bg-[#05080b]">
      <div className="mx-auto grid max-w-[1520px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="min-h-52 border-b border-r border-white/10 p-8 lg:border-b-0">
            <div className="navy-font-display text-5xl font-black">{metric.value}</div>
            <div className="mt-5 text-sm font-bold uppercase text-white/82">{metric.label}</div>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/52">{metric.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function NavyCapabilityGrid({ capabilities }: { capabilities: NavyCapability[] }) {
  const icons = [Ship, Waves, Shield, Cpu];

  return (
    <section className="relative overflow-hidden bg-[#030507] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="absolute inset-0 navy-grid-plane opacity-30" />
      <div className="relative mx-auto max-w-[1520px]">
        <SectionTitle
          eyebrow="Capability architecture"
          title="Built as a technological system"
          body="The Navy's power comes from the integration of ships, aircraft, submarines, satellites, software, industrial depth, and crews trained to operate under extreme tempo."
        />
        <div className="mt-14 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((capability, index) => {
            const Icon = icons[index] ?? Ship;
            return (
              <motion.article
                key={capability.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="group min-h-[420px] bg-[#05080b] p-7 transition-colors duration-300 hover:bg-[#081017]"
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-11 w-11 items-center justify-center border border-white/10"
                      style={{ color: capability.accent }}
                    >
                      <Icon size={20} strokeWidth={1.7} />
                    </div>
                    <span className="navy-font-mono text-xs uppercase text-white/38">{capability.stat}</span>
                  </div>
                  <div className="mt-10 text-xs font-bold uppercase text-white/42">{capability.kicker}</div>
                  <h3 className="navy-font-display mt-4 text-3xl font-black uppercase leading-none">
                    {capability.title}
                  </h3>
                  <p className="mt-8 text-sm leading-7 text-white/55">{capability.description}</p>
                  <div className="mt-auto pt-10">
                    <div className="h-px w-full bg-white/10">
                      <div
                        className="h-px w-1/3 transition-all duration-500 group-hover:w-full"
                        style={{ backgroundColor: capability.accent }}
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function NavyPlatformShowcase({ platforms }: { platforms: NavyPlatform[] }) {
  return (
    <section className="bg-[#05080b] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[1520px]">
        <SectionTitle
          eyebrow="Platform stack"
          title="Capital ships, quiet machines, carrier aviation"
          body="Each platform is designed as part of a larger kill web: sensors, launchers, communications, logistics, aviation, cyber, and allied command structures."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {platforms.map((platform, index) => (
            <motion.article
              key={platform.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              className="grid min-h-[560px] overflow-hidden border border-white/10 bg-[#030507] md:grid-cols-[46%_1fr]"
            >
              <div className="relative min-h-[260px] md:min-h-full">
                <Image
                  src={platform.imageSrc}
                  alt={platform.imageAlt}
                  fill
                  quality={90}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 46vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(3,5,7,0.78))]" />
              </div>
              <div className="flex flex-col p-7 md:p-9">
                <div className="flex items-center justify-between gap-4">
                  <span className="navy-font-mono text-xs uppercase text-white/48">{platform.className}</span>
                  <span className="border border-white/10 px-3 py-1 text-xs font-bold uppercase text-white/56">
                    {platform.role}
                  </span>
                </div>
                <h3 className="navy-font-display mt-8 text-4xl font-black uppercase leading-none">
                  {platform.name}
                </h3>
                <p className="mt-7 text-sm leading-7 text-white/58">{platform.capability}</p>
                <div className="mt-auto grid grid-cols-2 gap-px bg-white/10 pt-10">
                  {platform.specs.map((spec) => (
                    <div key={spec.label} className="bg-[#05080b] p-4">
                      <div className="text-xs uppercase text-white/38">{spec.label}</div>
                      <div className="mt-2 text-sm font-bold text-white">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NavyCommandStack({ layers }: { layers: NavyCommandLayer[] }) {
  return (
    <section className="relative overflow-hidden bg-[#030507] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(142,220,255,0.13),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(255,107,107,0.09),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-[1520px] gap-14 lg:grid-cols-[0.72fr_1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionTitle
            eyebrow="Command and control"
            title="Decision speed at oceanic scale"
            body="The fleet is designed to sense first, decide faster, and create effects from multiple domains at once. The beautiful part is the integration, not a single weapon."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {[Satellite, Network, Gauge, Plane].map((Icon, index) => (
              <div key={index} className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/[0.03] text-white/70">
                <Icon size={20} strokeWidth={1.6} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {layers.map((layer, index) => (
            <motion.article
              key={layer.title}
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl md:p-9"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="navy-font-mono text-xs uppercase text-white/40">Layer 0{index + 1}</div>
                  <h3 className="navy-font-display mt-3 text-4xl font-black uppercase leading-none">{layer.title}</h3>
                </div>
                <div className="h-2 w-28" style={{ backgroundColor: layer.accent }} />
              </div>
              <p className="mt-5 text-sm font-semibold uppercase text-white/58">{layer.subtitle}</p>
              <p className="mt-7 max-w-3xl text-sm leading-7 text-white/58">{layer.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {layer.nodes.map((node) => (
                  <span key={node} className="border border-white/10 px-3 py-2 text-xs font-semibold uppercase text-white/58">
                    {node}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NavyFullscreenPanel({ panel, reverse = false }: { panel: NavyVisualPanel; reverse?: boolean }) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#030507]">
      <Image
        src={panel.imageSrc}
        alt={panel.imageAlt}
        fill
        quality={90}
        className="object-cover"
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
      />
      <div
        className={cn(
          "absolute inset-0",
          reverse
            ? "bg-[linear-gradient(270deg,#030507_0%,rgba(3,5,7,0.78)_34%,rgba(3,5,7,0.16)_74%,#030507_100%)]"
            : "bg-[linear-gradient(90deg,#030507_0%,rgba(3,5,7,0.78)_34%,rgba(3,5,7,0.16)_74%,#030507_100%)]"
        )}
      />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-[linear-gradient(180deg,transparent,#030507)]" />
      <div className="relative z-10 flex min-h-[100svh] items-center px-5 py-24 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
          className={cn("max-w-2xl", reverse && "ml-auto")}
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="navy-cinematic-line h-px w-24" />
            <span className="navy-font-mono text-xs font-bold uppercase text-white/62">{panel.eyebrow}</span>
          </div>
          <h2 className="navy-font-display text-5xl font-black uppercase leading-[0.95] md:text-7xl">
            {panel.title}
          </h2>
          <p className="mt-8 text-base leading-8 text-white/66 md:text-lg">{panel.description}</p>
        </motion.div>
      </div>
    </section>
  );
}

export function NavyFutureStack({ programs }: { programs: NavyFutureProgram[] }) {
  return (
    <section className="bg-[#05080b] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[1520px]">
        <SectionTitle
          eyebrow="Next fleet"
          title="Autonomy, software, stealth, industrial tempo"
          body="The future Navy is less about one bigger ship and more about a distributed fleet: crewed and uncrewed systems, longer-range aviation, software-defined sensors, and resilient production."
        />
        <div className="mt-14 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-4">
          {programs.map((program, index) => (
            <motion.article
              key={program.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="min-h-[360px] bg-[#030507] p-7"
            >
              <div className="flex items-start justify-between gap-5">
                <span className="navy-font-display text-5xl font-black text-white/18">{program.label}</span>
                <span className="border border-white/10 px-3 py-1 text-xs font-bold uppercase text-white/52">
                  {program.status}
                </span>
              </div>
              <h3 className="navy-font-display mt-12 text-3xl font-black uppercase leading-none">
                {program.title}
              </h3>
              <p className="mt-7 text-sm leading-7 text-white/56">{program.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NavyClosing() {
  return (
    <section className="relative overflow-hidden bg-[#030507] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="absolute inset-0 navy-grid-plane opacity-35" />
      <div className="relative mx-auto max-w-[1160px] text-center">
        <Anchor className="mx-auto mb-8 text-white/40" size={34} strokeWidth={1.4} />
        <h2 className="navy-font-display text-5xl font-black uppercase leading-[0.95] md:text-8xl">
          American power with no fixed address.
        </h2>
        <p className="mx-auto mt-9 max-w-3xl text-base leading-8 text-white/62 md:text-lg">
          A Navy carrier group does not ask where the crisis is. It moves the runway,
          the command center, the missile shield, the logistics train, and the national
          signal into the theater.
        </p>
        <div className="mt-12 flex justify-center">
          <Link
            href="/military"
            className="group inline-flex h-12 items-center gap-3 border border-white/14 bg-white px-5 text-sm font-bold uppercase text-black transition-colors hover:bg-white/86"
          >
            Military overview
            <ArrowUpRight size={17} strokeWidth={2} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="max-w-4xl">
      <div className="mb-5 flex items-center gap-4">
        <span className="h-px w-16 bg-white/28" />
        <span className="navy-font-mono text-xs font-bold uppercase text-white/48">{eyebrow}</span>
      </div>
      <h2 className="navy-font-display text-5xl font-black uppercase leading-[0.95] md:text-7xl">
        {title}
      </h2>
      <p className="mt-7 max-w-2xl text-base leading-8 text-white/60">{body}</p>
    </div>
  );
}
