import React from "react";
import Link from "next/link";

/**
 * Parses a string containing markdown-style links like [Text](#anchor)
 * and returns an array of React elements or plain text.
 */
export function renderTextWithLinks(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const linkText = match[1];
    const linkHref = match[2];
    parts.push(
      <Link
        key={match.index}
        href={linkHref}
        scroll={false}
        className="text-[#E8B923] underline underline-offset-4 hover:text-white transition-colors font-medium"
      >
        {linkText}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
