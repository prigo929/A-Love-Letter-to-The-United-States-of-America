# America: The Greatest Nation

A cinematic Next.js site about the United States built as a long-form patriotic experience: large hero media, editorial sections, data visualizations, image-led storytelling, and deep-dive pages for topics like economy, culture, quality of life, and more.

This repo is not a generic marketing site. It is structured like a content platform:

- homepage as an end-to-end narrative experience
- deep section pages with reusable layout and data components
- centralized image management through `IMAGES/` + `lib/site-images.ts`
- bilingual UI support for English and Romanian
- data-driven content in `lib/data/*` instead of hardcoded JSX

## What Is Built

Current routes:

- `/` home page with hero, statement, stats, section grid, Why America blocks, map preview, video preview, data teaser charts, quote carousel, gallery preview, newsletter
- `/economy` full landing page plus deep dives:
  - `/economy/gdp-growth`
  - `/economy/capital-markets`
  - `/economy/startups-venture-capital`
  - `/economy/dollar-dominance`
  - `/economy/trade-and-exports`
- `/culture`
- `/culture/the-american-high-school`
- `/culture/american-aesthetics`
- `/quality-of-life`
- `/gallery`
- `/data`
- `/timeline`
- `/explorer`
- `/sitemap`

The culture and quality-of-life pages are currently clean scaffolds with TODO zones, ready for content drops.

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 16 App Router |
| React | React 18 |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| Charts | Recharts + D3 |
| Maps | react-simple-maps |
| Forms | React Hook Form + Zod |
| Data / backend | Supabase |
| Deployment | Vercel |
| Analytics | Vercel Analytics + Speed Insights |

## Dev Commands

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

Available scripts:

```bash
npm run dev         # stable local dev, uses webpack
npm run dev:turbo   # Turbopack variant
npm run build
npm run start
npm run type-check
```

Note:

- `npm run dev` intentionally uses webpack because this repo previously hit Turbopack stability issues during local development.
- production builds still use standard `next build`.

## Environment Variables

Create `.env.local` manually in the project root.

Required values:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

The service role key is server-only. Do not expose it to the browser.

## Database Setup

This repo uses Supabase for newsletter signup storage.

1. Create a Supabase project
2. Open the SQL editor
3. Run [`supabase-schema.sql`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/supabase-schema.sql)
4. Add your environment variables in `.env.local`

Relevant files:

- [newsletter.ts](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/app/actions/newsletter.ts)
- [client.ts](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/supabase/client.ts)
- [server.ts](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/supabase/server.ts)
- [database.types.ts](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/types/database.types.ts)

## Project Shape

```text
app/
  page.tsx                       home page
  layout.tsx                     root shell
  globals.css                    site-wide styles
  economy/                       economy landing + deep dives
  culture/                       culture hub + scaffolds
  quality-of-life/               scaffold
  gallery/ data/ timeline/ explorer/ sitemap/

components/
  layout/                        header, footer, breadcrumb, page chrome
  sections/                      editorial homepage and section components
  data/                          reusable chart components
  forms/                         newsletter form
  providers/                     language provider

lib/
  data/                          structured content and stats
  site-images.ts                 central image registry
  constants.ts                   nav, homepage hero, shared site constants
  i18n/                          locale config and server locale helpers
  supabase/                      backend clients
  animations.ts                  motion variants
  utils.ts                       helpers

IMAGES/
  categorized local image library used by the site
```

## Homepage Architecture

The home page in [`app/page.tsx`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/app/page.tsx) is intentionally composed from reusable sections.

Key section components:

- [HeroSection.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/sections/HeroSection.tsx)
- [OpeningStatement.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/sections/OpeningStatement.tsx)
- [StatBar.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/sections/StatBar.tsx)
- [SectionGrid.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/sections/SectionGrid.tsx)
- [WhyAmericaSection.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/sections/WhyAmericaSection.tsx)
- [MapPreviewSection.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/sections/MapPreviewSection.tsx)
- [VideoSection.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/sections/VideoSection.tsx)
- [DataTeaserSection.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/sections/DataTeaserSection.tsx)
- [QuoteCarousel.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/sections/QuoteCarousel.tsx)
- [GalleryPreviewSection.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/sections/GalleryPreviewSection.tsx)
- [NewsletterSection.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/sections/NewsletterSection.tsx)

Support utilities mounted globally in the layout:

- reading progress bar
- back-to-top button
- language provider
- analytics and speed insights

## Image Workflow

This repo is optimized so you can manage images without hunting through JSX.

### The rule

Do not scatter raw image paths across the app unless there is a good reason.

Use this flow:

1. add the file somewhere in [`IMAGES`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/IMAGES)
2. import it in [`site-images.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/site-images.ts)
3. expose it as a stable `SITE_IMAGES.someKey`
4. consume that key from data files or components

### Where images are typically wired

- [`constants.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/constants.ts) for nav cards and hero slideshow
- [`home.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/data/home.ts) for homepage content
- [`economy-data.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/data/economy-data.ts) for economy pages

### Example

If you want to change a homepage hero image:

1. add the new file to `IMAGES/`
2. import it in [`site-images.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/site-images.ts)
3. replace the hero key in [`constants.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/constants.ts)

## Content Workflow

Most factual content is intentionally stored in data files.

Main content sources:

- [`home.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/data/home.ts)
- [`economy-data.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/data/economy-data.ts)
- [`constants.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/constants.ts)

Use these rules:

- change facts and stats in data files
- change section order in page files
- change visual layout in component files
- change images via `SITE_IMAGES`

## Translation System

The site currently supports:

- English
- Romanian

Core files:

- [`config.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/i18n/config.ts)
- [`LanguageProvider.tsx`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/providers/LanguageProvider.tsx)
- [`server.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/i18n/server.ts)

How it works:

- client components use the language provider
- server pages read the locale from a cookie
- the header language selector writes both local storage and cookie state

If you add a new route and want it translated:

1. read the locale with `getServerLocale()` in the page
2. create a `copy` object inside the page or data getter
3. render translated labels from that object

## Reusable Components Worth Knowing

Layout:

- [Header.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/layout/Header.tsx)
- [Footer.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/layout/Footer.tsx)
- [Breadcrumb.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/layout/Breadcrumb.tsx)
- [PageChrome.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/layout/PageChrome.tsx)

Content:

- [FactCard.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/sections/FactCard.tsx)
- [StatCard.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/sections/StatCard.tsx)
- [QuoteBlock.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/sections/QuoteBlock.tsx)
- [ParallaxSection.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/sections/ParallaxSection.tsx)
- [AccordionSection.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/sections/AccordionSection.tsx)

Charts:

- [GdpBarChart.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/data/GdpBarChart.tsx)
- [SP500Chart.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/data/SP500Chart.tsx)
- [VCCharts.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/data/VCCharts.tsx)
- [DollarMarketCharts.tsx](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/components/data/DollarMarketCharts.tsx)

## “How Do I Change X?”

### Change homepage section order

Edit [`app/page.tsx`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/app/page.tsx)

### Change homepage hero images

Edit [`constants.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/constants.ts)

### Change homepage stats, cards, gallery content, videos, or chart data

Edit [`home.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/data/home.ts)

### Change economy facts, overview text, quote content, or subpage card data

Edit [`economy-data.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/data/economy-data.ts)

### Change header navigation or submenu structure

Edit [`constants.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/constants.ts)

### Change the language options

Edit [`config.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/i18n/config.ts)

### Change sitewide look and reusable CSS helpers

Edit [`globals.css`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/app/globals.css)

## Design Notes

The visual language of the repo is built around:

- `glory-red`
- `glory-blue`
- `glory-gold`
- deep navy backgrounds
- editorial typography
- image-heavy sections with gold accents and patriotic gradients

This is not a neutral design system. If you add new sections, preserve the established tone:

- high contrast
- strong imagery
- premium editorial layout
- patriotic palette
- minimal generic placeholder UI

## Deployment

The project is designed for Vercel.

Standard flow:

```bash
npm run type-check
npm run build
```

Then push to GitHub and deploy through Vercel.

If Vercel fails on static image imports:

- check the exact filename casing in [`site-images.ts`](/Users/alinprigoreanu/Documents/The United States of America/Website - Patriotic USA/usa-patriot-site/lib/site-images.ts)
- remember macOS may hide case mistakes that Linux CI will reject

## Practical Notes

- keep file names stable once referenced in `SITE_IMAGES`
- prefer editing data files over hardcoding copy in JSX
- prefer adding new sections as components instead of bloating page files
- run `npm run type-check` before pushing
- if a local image changes, hard refresh the browser because Next/Image caching can make swaps look delayed

## Cool Bits In This Repo

- rotating multi-image homepage hero
- homepage data teaser charts with USA-highlighted bars
- animated mega-menu with mobile overlay
- breadcrumb JSON-LD support
- reading progress bar + floating back-to-top button
- local image library instead of scattered remote URLs
- Romanian translation mode wired through real cookie + provider state
- economy section built as a real editorial/data hybrid, not just cards and charts

## Status

This repo already has a strong home page and a substantial economy section.

Most likely next expansion areas:

- filling the culture scaffolds
- filling the quality-of-life scaffolds
- expanding map explorer and gallery depth
- tightening SEO metadata on all translated routes

---

Built as a patriotic editorial web experience, not a template.  
Keep the bar high. Use real images, real statistics, and intentional layouts.
