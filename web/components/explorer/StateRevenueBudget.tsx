"use client";

// ─── How States Make Money ────────────────────────────────────────────────────
// An interactive breakdown of one state's general revenue, built from the Census
// Bureau's FY2024 Annual Survey of State Government Finances. The buckets
// partition total revenue exactly, so the stacked bar always fills to 100%.

import { useMemo, useState } from "react";

import { Coins, Info } from "lucide-react";
import { STATE_REVENUE, NATIONAL_REVENUE, REVENUE_FISCAL_YEAR, type StateRevenue } from "@/lib/data/state-revenue";

type SourceId =
  | "federal" | "income" | "sales" | "charges" | "property" | "natural" | "lottery" | "other";

interface SourceDef {
  id: SourceId;
  color: string;
  label: { en: string; ro: string };
  /** Sums the underlying Census buckets. */
  value: (r: StateRevenue) => number;
  /** Optional sub-components shown when the source is selected. */
  parts?: { label: { en: string; ro: string }; value: (r: StateRevenue) => number }[];
  note?: { en: string; ro: string };
}

const SOURCES: SourceDef[] = [
  {
    id: "federal",
    color: "#60a5fa",
    label: { en: "Federal grants", ro: "Fonduri federale" },
    value: (r) => r.federal,
    note: {
      en: "Medicaid, highway, education and welfare grants sent from Washington. For most states this is the single largest line.",
      ro: "Granturi pentru Medicaid, autostrăzi, educație și asistență socială trimise de la Washington. Pentru majoritatea statelor este cea mai mare linie.",
    },
  },
  {
    id: "income",
    color: "#fbbf24",
    label: { en: "Income tax", ro: "Impozit pe venit" },
    value: (r) => r.incomeIndividual + r.incomeCorporate,
    parts: [
      { label: { en: "Individual", ro: "Persoane fizice" }, value: (r) => r.incomeIndividual },
      { label: { en: "Corporate", ro: "Companii" }, value: (r) => r.incomeCorporate },
    ],
  },
  {
    id: "sales",
    color: "#34d399",
    label: { en: "Sales tax", ro: "Taxă pe vânzări" },
    value: (r) => r.salesGeneral + r.salesSelective,
    parts: [
      { label: { en: "General sales", ro: "Vânzări generale" }, value: (r) => r.salesGeneral },
      { label: { en: "Selective (fuel, tobacco, alcohol…)", ro: "Selective (carburanți, tutun, alcool…)" }, value: (r) => r.salesSelective },
    ],
  },
  {
    id: "charges",
    color: "#f87171",
    label: { en: "Fees & charges", ro: "Taxe și tarife" },
    value: (r) => r.charges,
    note: {
      en: "University tuition, public hospital charges, tolls and park fees — money the state earns by selling a service.",
      ro: "Taxe universitare, spitale publice, taxe de drum și de parcuri — bani câștigați prin vânzarea unui serviciu.",
    },
  },
  {
    id: "property",
    color: "#a78bfa",
    label: { en: "Property tax", ro: "Impozit pe proprietate" },
    value: (r) => r.property,
    note: {
      en: "Property tax is overwhelmingly a local tax in the United States. At the state level it is usually a rounding error.",
      ro: "Impozitul pe proprietate este în principal o taxă locală în SUA. La nivel de stat este de obicei nesemnificativ.",
    },
  },
  {
    id: "natural",
    color: "#fb923c",
    label: { en: "Natural resources", ro: "Resurse naturale" },
    value: (r) => r.severance + r.royalties,
    parts: [
      { label: { en: "Severance taxes", ro: "Taxe de extracție" }, value: (r) => r.severance },
      { label: { en: "Royalties", ro: "Redevențe" }, value: (r) => r.royalties },
    ],
    note: {
      en: "Severance taxes and royalties on oil, gas, coal and minerals as they leave the ground.",
      ro: "Taxe de extracție și redevențe pe petrol, gaze, cărbune și minerale.",
    },
  },
  {
    id: "lottery",
    color: "#2dd4bf",
    label: { en: "Lottery", ro: "Loterie" },
    value: (r) => r.lottery,
    note: {
      en: "Net lottery revenue — ticket sales minus prizes paid and administration.",
      ro: "Venit net din loterie — vânzări de bilete minus premii și administrare.",
    },
  },
  {
    id: "other",
    color: "#64748b",
    label: { en: "Other", ro: "Altele" },
    value: (r) => r.otherTaxes + r.otherMisc + r.localGrants,
    note: {
      en: "Everything else: licence taxes, fines, interest earnings, and grants received from local governments.",
      ro: "Restul: taxe de licență, amenzi, dobânzi și fonduri primite de la administrațiile locale.",
    },
  },
];

const fmtMoney = (thousands: number, locale: string) => {
  const dollars = thousands * 1000;
  if (dollars >= 1e9) return `$${(dollars / 1e9).toFixed(1)}B`;
  if (dollars >= 1e6) return `$${(dollars / 1e6).toFixed(0)}M`;
  return `$${dollars.toLocaleString(locale === "ro" ? "ro-RO" : "en-US")}`;
};

interface Props {
  locale: "en" | "ro";
  abbrev: string;
  stateName: string;
  /** Population in millions, used for the per-resident figure. */
  population: number;
  translations: {
    eyebrow: string;
    title: string;
    intro: string;
    totalLabel: string;
    perResidentLabel: string;
    vsNationalLabel: string;
    sourceLabel: string;
    shareLabel: string;
    noIncomeTax: string;
    noSalesTax: string;
    sourceNote: string;
  };
}

export function StateRevenueBudget({ locale, abbrev, stateName, population, translations }: Props) {
  const [selected, setSelected] = useState<SourceId | null>(null);

  const rev = STATE_REVENUE[abbrev];

  const rows = useMemo(() => {
    if (!rev) return [];
    return SOURCES.map((s) => {
      const value = s.value(rev);
      const natValue = s.value(NATIONAL_REVENUE);
      return {
        def: s,
        value,
        share: (value / rev.total) * 100,
        nationalShare: (natValue / NATIONAL_REVENUE.total) * 100,
      };
    });
  }, [rev]);

  if (!rev) return null;

  const perResident = Math.round((rev.total * 1000) / (population * 1_000_000));
  const active = rows.find((r) => r.def.id === selected) ?? null;

  // Structural facts that are worth calling out explicitly.
  const noIncomeTax = rev.incomeIndividual === 0;
  const noGeneralSalesTax = rev.salesGeneral === 0;

  return (
    <div className="rounded-3xl border border-white/[0.06] bg-[#070707] p-6 md:p-8 shadow-lg">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-1 flex items-center gap-1.5 font-body text-[9px] font-bold uppercase tracking-[0.18em] text-[#34d399]">
            <Coins className="h-3 w-3" />
            {translations.eyebrow}
          </p>
          <h3 className="mb-2 font-display text-xl font-extrabold text-white">{translations.title}</h3>
          <p className="font-body text-xs leading-relaxed text-white/55">{translations.intro}</p>
        </div>
        <div className="flex shrink-0 gap-3">
          <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-4">
            <span className="mb-1 block font-body text-[9px] font-bold uppercase tracking-wider text-white/30">
              {translations.totalLabel}
            </span>
            <div className="font-hero text-2xl text-white">{fmtMoney(rev.total, locale)}</div>
          </div>
          <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-4">
            <span className="mb-1 block font-body text-[9px] font-bold uppercase tracking-wider text-white/30">
              {translations.perResidentLabel}
            </span>
            <div className="font-hero text-2xl text-[#34d399]">${perResident.toLocaleString("en-US")}</div>
          </div>
        </div>
      </div>

      {/* Structural badges */}
      {(noIncomeTax || noGeneralSalesTax) && (
        <div className="mb-5 flex flex-wrap gap-2">
          {noIncomeTax && (
            <span className="rounded-full border border-[#fbbf24]/30 bg-[#fbbf24]/10 px-3 py-1 font-body text-[10px] font-semibold text-[#fbbf24]">
              {translations.noIncomeTax}
            </span>
          )}
          {noGeneralSalesTax && (
            <span className="rounded-full border border-[#34d399]/30 bg-[#34d399]/10 px-3 py-1 font-body text-[10px] font-semibold text-[#34d399]">
              {translations.noSalesTax}
            </span>
          )}
        </div>
      )}

      {/* Stacked 100% bar.
          Widths are plain percentages with a CSS transition — framer-motion cannot
          interpolate from `0px` to a percentage and silently leaves the bar at zero. */}
      <div className="mb-2 flex h-9 w-full overflow-hidden rounded-lg">
        {rows
          .filter((r) => r.value > 0)
          .map((r) => {
            const dim = selected !== null && selected !== r.def.id;
            return (
              <button
                key={r.def.id}
                onClick={() => setSelected(selected === r.def.id ? null : r.def.id)}
                className="group relative h-full shrink-0 transition-[width,opacity] duration-500 ease-out"
                style={{ width: `${r.share}%`, background: r.def.color, opacity: dim ? 0.28 : 1 }}
                title={`${r.def.label[locale]} — ${r.share.toFixed(1)}%`}
                aria-label={`${r.def.label[locale]}: ${r.share.toFixed(1)}%`}
              />
            );
          })}
      </div>
      <p className="mb-6 text-right font-body text-[9px] text-white/25">{translations.sourceNote}</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Source table */}
        <div className="md:col-span-7">
          <div className="mb-2 flex items-center justify-between border-b border-white/[0.06] pb-2">
            <span className="font-body text-[9px] font-bold uppercase tracking-wider text-white/30">{translations.sourceLabel}</span>
            <div className="flex gap-6">
              <span className="w-16 text-right font-body text-[9px] font-bold uppercase tracking-wider text-white/30">{translations.shareLabel}</span>
              <span className="w-20 text-right font-body text-[9px] font-bold uppercase tracking-wider text-white/30">{translations.vsNationalLabel}</span>
            </div>
          </div>
          {rows.map((r) => {
            const diff = r.share - r.nationalShare;
            const isActive = selected === r.def.id;
            return (
              <button
                key={r.def.id}
                onClick={() => setSelected(isActive ? null : r.def.id)}
                className="flex w-full items-center justify-between gap-4 border-b border-white/[0.04] py-2.5 text-left transition-colors hover:bg-white/[0.02]"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: r.def.color }} />
                  <span className={`truncate font-body text-xs ${isActive ? "font-bold text-white" : "text-white/75"}`}>
                    {r.def.label[locale]}
                  </span>
                </span>
                <span className="flex shrink-0 gap-6">
                  <span className="w-16 text-right font-body text-xs font-semibold text-white">{r.share.toFixed(1)}%</span>
                  <span
                    className="w-20 text-right font-body text-[11px] font-semibold"
                    style={{ color: Math.abs(diff) < 0.5 ? "rgba(255,255,255,0.3)" : diff > 0 ? "#34d399" : "#f87171" }}
                  >
                    {diff > 0 ? "+" : ""}{diff.toFixed(1)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail of the selected source */}
        <div className="md:col-span-5 rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-5">
          {active ? (
            <>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm" style={{ background: active.def.color }} />
                <h4 className="font-display text-base font-bold text-white">{active.def.label[locale]}</h4>
              </div>
              <div className="mb-4 flex items-baseline gap-3">
                <span className="font-hero text-3xl" style={{ color: active.def.color }}>
                  {active.share.toFixed(1)}%
                </span>
                <span className="font-body text-sm text-white/50">{fmtMoney(active.value, locale)}</span>
              </div>

              {active.def.parts && active.value > 0 && (
                <div className="mb-4 space-y-2 border-t border-white/[0.05] pt-3">
                  {active.def.parts.map((p) => {
                    const v = p.value(rev);
                    return (
                      <div key={p.label.en} className="flex items-center justify-between gap-3">
                        <span className="font-body text-[11px] text-white/50">{p.label[locale]}</span>
                        <span className="font-body text-[11px] font-semibold text-white/80">
                          {((v / rev.total) * 100).toFixed(1)}% · {fmtMoney(v, locale)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {active.def.note && (
                <p className="flex gap-2 border-t border-white/[0.05] pt-3 font-body text-[11px] leading-relaxed text-white/55">
                  <Info className="mt-0.5 h-3 w-3 shrink-0" />
                  <span>{active.def.note[locale]}</span>
                </p>
              )}
            </>
          ) : (
            <div className="flex h-full min-h-[180px] flex-col items-center justify-center text-center">
              <Coins className="mb-3 h-6 w-6 text-white/15" />
              <p className="font-body text-xs leading-relaxed text-white/35">
                {locale === "ro"
                  ? `Apasă pe o sursă de venit pentru a vedea detaliile pentru ${stateName}.`
                  : `Select a revenue source to see how ${stateName} raises it.`}
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-5 border-t border-white/[0.05] pt-3 font-body text-[9px] leading-relaxed text-white/25">
        {locale === "ro"
          ? `Sursă: U.S. Census Bureau, Annual Survey of State Government Finances, anul fiscal ${REVENUE_FISCAL_YEAR}. „Venit general" exclude magazinele de băuturi, utilitățile și fondurile de asigurări.`
          : `Source: U.S. Census Bureau, Annual Survey of State Government Finances, fiscal year ${REVENUE_FISCAL_YEAR}. "General revenue" excludes liquor stores, utilities and insurance trusts.`}
      </p>
    </div>
  );
}
