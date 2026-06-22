import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import WeMustFightClient from "@/components/history/WeMustFightClient";

export const metadata: Metadata = {
  title: "We Must Fight (Ronald Reagan) | Patriotic USA",
  description: "A cinematic experience of future President Ronald Reagan's legendary 1964 speech, 'A Time for Choosing', outlining the moral case for freedom and peace through strength.",
};

export default async function WeMustFightPage() {
  const locale = await getServerLocale();

  return <WeMustFightClient locale={locale} />;
}
