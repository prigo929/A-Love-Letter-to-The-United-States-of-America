import type { Metadata } from "next";
import { SearchPageClient } from "@/components/search/SearchPageClient";

export const metadata: Metadata = {
  title: "Search America",
  description:
    "Search through over 117 chapters, chronicles, historical archives, and national achievements across the United States of America.",
};

export default function SearchPage() {
  return <SearchPageClient />;
}

