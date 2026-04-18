// Reusable breadcrumb navigation for inner pages.
//
// Beginner guide:
// - `items` is the list of page levels after Home
// - This component also outputs SEO-friendly breadcrumb JSON-LD
// - Use it near the top of deep pages like /economy/gdp-growth

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/server";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/types/content.types";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  dark?: boolean;
}

export async function Breadcrumb({
  items,
  className,
  dark = true,
}: BreadcrumbProps) {
  const locale = await getServerLocale();
  const homeLabel = locale === "ro" ? "Acasă" : "Home";
  const ariaLabel = locale === "ro" ? "Fir de navigare" : "Breadcrumb";
  // Structured data for search engines so they can understand the page hierarchy.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel, item: "/" },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: item.href } : {}),
      })),
    ],
  };

  return (
    <>
      {/* Search engines read this script; users do not see it on the page. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Visible breadcrumb trail for users. */}
      <nav
        aria-label={ariaLabel}
        className={cn(
          "flex flex-wrap items-center gap-1.5 font-body text-sm",
          dark ? "text-white/50" : "text-navy-mid/60",
          className,
        )}
      >
        <Link
          href="/"
          className={cn(
            "flex items-center gap-1 transition-colors duration-150",
            dark ? "hover:text-white" : "hover:text-navy-dark",
          )}
        >
          <Home className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">{homeLabel}</span>
        </Link>

        {items.map((item, index) => (
          <span
            key={`${item.label}-${index}`}
            className="flex items-center gap-1.5"
          >
            <ChevronRight
              className="h-3 w-3 shrink-0 opacity-40"
              aria-hidden="true"
            />
            {/* Earlier items are links; the last item is the current page label. */}
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className={cn(
                  "transition-colors duration-150",
                  dark ? "hover:text-white" : "hover:text-navy-dark",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  dark ? "text-white" : "text-navy-dark",
                  "font-medium",
                )}
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
