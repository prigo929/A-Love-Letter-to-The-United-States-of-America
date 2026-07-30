import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import { SITE } from "@/lib/constants";
import WeMustFightClient from "@/components/history/WeMustFightClient";

const PAGE_TITLE = "We Must Fight: Ronald Reagan, 1964";
const PAGE_DESCRIPTION =
  "A cinematic experience of Ronald Reagan's legendary 1964 speech 'A Time for Choosing', outlining the moral case for freedom and peace through strength, the ideological cornerstone of the Reagan Revolution.";
const OG_IMAGE = "/images/og-reagan-speech.jpg";
const PAGE_URL = `${SITE.url}/history/we-must-fight`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/history/we-must-fight" },

  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: SITE.name,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 800,
        alt: "Ronald Reagan standing in front of the American flag",
      },
    ],
    publishedTime: "1964-10-27T00:00:00.000Z",
    authors: ["Ronald Reagan"],
    tags: ["Ronald Reagan", "Speech", "Freedom", "Cold War", "American History"],
  },

  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    creator: SITE.twitter,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default async function WeMustFightPage() {
  const locale = await getServerLocale();

  return <WeMustFightClient locale={locale} />;
}

