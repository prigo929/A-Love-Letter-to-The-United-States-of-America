// ─── Culture Section Layout ───────────────────────────────────────────────────
// The culture pages keep the site's editorial Playfair serif headings, while the
// rest of the site moved to Archivo sans. `serif-headings` (defined in
// globals.css) restores Playfair for all h1–h6 and `.font-display` descendants
// here. The `font-editorial` serif used inside culture components is defined
// separately by CultureStyles and is unaffected.

export default function CultureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="serif-headings">{children}</div>;
}
