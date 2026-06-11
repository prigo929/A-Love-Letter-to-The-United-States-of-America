import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import UnitedStatesClient from "./UnitedStatesClient";

export const metadata: Metadata = {
  title: "United States Profile | Patriotic USA",
  description:
    "A comprehensive bilingual profile of the United States of America — covering history, geography, government, economy, demographics, culture, and more.",
};

export default async function UnitedStatesPage() {
  const locale = await getServerLocale();
  return <UnitedStatesClient locale={locale} />;
}
