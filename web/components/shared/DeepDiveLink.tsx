"use client";

import type { ReactNode } from "react";

/**
 * Link to an in-page "IN DEPTH" (deep-dive) anchor like `#deep-dive-NASA`.
 *
 * Next.js `<Link>` updates the hash via history.pushState, which does NOT fire a
 * native `hashchange` event: so the DeepDiveSection listener only reacted on a
 * second click. This sets `location.hash` directly (which DOES fire hashchange),
 * and re-dispatches the event when the hash is already current, so a single
 * click always navigates immediately.
 */
export function DeepDiveLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (typeof window === "undefined") return;
    if (window.location.hash === href) {
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } else {
      window.location.hash = href;
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
