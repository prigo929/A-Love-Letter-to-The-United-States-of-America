"use client";

// Homepage chart preview section.
//
// Beginner guide:
// - The chart numbers themselves come from lib/data/home.ts
// - This file only controls how those numbers are rendered visually
// - If a unit/title is wrong, fix the chart config in `charts` below
//
// `use client` is required because this component uses browser-only features:
// - scroll/viewport detection via Framer Motion
// - animated chart rendering in the browser

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { ArrowRight, TrendingUp } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { COLORS } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  GDP_COMPARISON_DATA,
  MILITARY_SPENDING_DATA,
  NOBEL_PRIZES_DATA,
} from "@/lib/data/home";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  unit: string;
}

function ChartTooltip({ active, payload, label, unit }: ChartTooltipProps) {
  // Recharts calls this repeatedly while the mouse moves over the chart.
  // Returning null means "show no tooltip right now".
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-white/20 bg-navy-dark px-3 py-2 shadow-xl">
      <p className="mb-0.5 font-body text-xs text-white/60">{label}</p>
      <p className="font-hero text-lg leading-none text-glory-gold">
        {payload[0].value.toLocaleString()}
        {unit}
      </p>
    </div>
  );
}

interface ChartCardProps {
  title: string;
  subtitle: string;
  data: { country: string; value: number; isUSA?: boolean }[];
  unit: string;
  source: string;
  highlight: string;
  index: number;
}

function ChartCard({
  title,
  subtitle,
  data,
  unit,
  source,
  highlight,
  index,
}: ChartCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  // `useInView` becomes true once this card scrolls into view, which lets us
  // delay the bar animation until the user actually sees the chart.
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-light"
    >
      <div className="border-b border-white/8 px-6 pb-4 pt-6">
        <p className="mb-1 font-body text-xs font-semibold uppercase tracking-widest text-glory-gold">
          {subtitle}
        </p>
        <h3 className="font-display text-xl text-white">{title}</h3>
      </div>

      <div className="mx-6 mb-4 mt-5 flex items-center gap-3 rounded-xl border border-glory-gold/25 bg-glory-gold/10 px-4 py-3">
        <TrendingUp
          className="h-4 w-4 shrink-0 text-glory-gold"
          aria-hidden="true"
        />
        <p className="font-body text-sm font-medium leading-snug text-glory-gold">
          {highlight}
        </p>
      </div>

      <div className="min-h-[200px] flex-1 px-2 pb-4">
        {/* Recharts handles the responsive sizing inside this container. */}
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{ top: 16, right: 16, bottom: 8, left: 8 }}
            barCategoryGap="25%"
          >
            <XAxis
              dataKey="country"
              interval={0}
              padding={{ left: 10, right: 10 }}
              tick={{
                fill: "rgba(255,255,255,0.45)",
                fontSize: 11,
                fontFamily: "Inter",
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              content={<ChartTooltip unit={unit} />}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              isAnimationActive={inView}
              animationBegin={index * 120}
              animationDuration={900}
              animationEasing="ease-out"
            >
              {/* One Cell per bar lets us color the USA differently from the rest. */}
              {data.map((entry) => (
                <Cell
                  key={entry.country}
                  fill={entry.isUSA ? COLORS.gloryGold : "rgba(60,59,110,0.7)"}
                />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                style={{
                  fill: "rgba(255,255,255,0.4)",
                  fontSize: 10,
                  fontFamily: "Inter",
                }}
                formatter={(value: any) => {
                  if (unit) return `${value}${unit}`;
                  return value >= 1000
                    ? `${(value / 1000).toFixed(1)}k`
                    : String(value);
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="px-6 pb-4 font-body text-xs text-white/30">
        Source: {source}
      </p>
    </motion.div>
  );
}

export function DataTeaserSection() {
  const { locale } = useLanguage();
  // These three cards are configured here so a content editor can quickly
  // change labels/units without touching the reusable chart markup above.
  const charts: ChartCardProps[] = [
    {
      title: locale === "ro" ? "PIB (trilioane $)" : "GDP ($Trillion)",
      subtitle: locale === "ro" ? "Economia Mondială" : "World Economy",
      data: [...GDP_COMPARISON_DATA],
      unit: "T",
      source: locale === "ro" ? "Banca Mondială 2024" : "World Bank 2024",
      highlight:
        locale === "ro"
          ? "PIB-ul SUA este mai mare decât China, Japonia și Germania la un loc"
          : "US GDP is larger than China, Japan, and Germany combined",
      index: 0,
    },
    {
      title:
        locale === "ro"
          ? "Cheltuieli Militare (mld. $)"
          : "Military Spending ($B)",
      subtitle: locale === "ro" ? "Buget de Apărare" : "Defense Budget",
      data: [...MILITARY_SPENDING_DATA],
      unit: "B",
      source: "SIPRI 2024",
      highlight:
        locale === "ro"
          ? "SUA cheltuiește mai mult decât următoarele 10 națiuni la un loc"
          : "US spends more than the next 10 nations combined",
      index: 1,
    },
    {
      title:
        locale === "ro" ? "Premii Nobel Câștigate" : "Nobel Prizes Won",
      subtitle:
        locale === "ro" ? "Realizare Științifică" : "Scientific Achievement",
      data: [...NOBEL_PRIZES_DATA],
      unit: "",
      source:
        locale === "ro"
          ? "Fundația Nobel — Total istoric"
          : "Nobel Foundation — All time",
      highlight:
        locale === "ro"
          ? "America a câștigat de 3 ori mai multe Nobel decât Regatul Unit, țara aflată pe locul 2"
          : "America has won 3× more Nobels than the UK, the #2 nation",
      index: 2,
    },
  ];
  const copy =
    locale === "ro"
      ? {
          eyebrow: "Cifrele Nu Mint",
          title: "Date Dure. Fapte de Necontestat.",
          description:
            "Fiecare grafic, fiecare studiu, fiecare indice spune aceeași poveste. America conduce, la o distanță uriașă.",
          usLegend: "Statele Unite",
          othersLegend: "Alte națiuni",
          cta: "Vezi Analiza Completă",
        }
      : {
          eyebrow: "The Numbers Don't Lie",
          title: "Hard Data. Undeniable Facts.",
          description:
            "Every bar chart, every study, every index tells the same story. America leads, by an enormous margin.",
          usLegend: "United States",
          othersLegend: "Other nations",
          cta: "See Full Analysis",
        };

  return (
    <section
      className="relative overflow-hidden bg-navy-mid py-24 md:py-32"
      aria-labelledby="data-heading"
    >
      <div
        className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-glory-gold/40 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="mb-14 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="section-eyebrow justify-center"
          >
            {copy.eyebrow}
          </motion.p>
          <motion.h2
            id="data-heading"
            variants={fadeUp}
            className="mb-4 font-display text-h2 text-white"
          >
            {copy.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-xl font-body text-lg text-white/55"
          >
            {copy.description}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {charts.map((chart) => (
            <ChartCard key={chart.title} {...chart} />
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row"
        >
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-sm bg-glory-gold"
                aria-hidden="true"
              />
              <span className="font-body text-xs text-white/50">
                {copy.usLegend}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-sm bg-glory-blue/70"
                aria-hidden="true"
              />
              <span className="font-body text-xs text-white/50">
                {copy.othersLegend}
              </span>
            </div>
          </div>

          <Link
            href="/data"
            className="group inline-flex items-center gap-2 rounded-xl border border-glory-gold/30 bg-glory-gold/10 px-6 py-3 font-body text-sm font-semibold text-glory-gold transition-all duration-200 hover:bg-glory-gold/20"
          >
            {copy.cta}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
