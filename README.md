# America: The Greatest Nation

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Languages](https://img.shields.io/badge/Languages-EN%20%7C%20RO-B22234?style=for-the-badge)](#translation-system)
[![Status](https://img.shields.io/badge/Status-Active%20Build-FFD700?style=for-the-badge&labelColor=0d1117)](#status)

A cinematic Next.js site about the United States built as a long-form patriotic experience: large hero media, editorial sections, data visualizations, image-led storytelling, and deep-dive pages for topics like economy, culture, quality of life, and more.

> A patriotic editorial web experience, not a template.
>
> The goal of this repo is to make the site feel intentional, premium, data-backed, and unmistakably American.

This repo is not a generic marketing site. It is structured like a content platform:

- homepage as an end-to-end narrative experience
- deep section pages with reusable layout and data components
- centralized image management through `IMAGES/` + `lib/site-images.ts`
- bilingual UI support for English and Romanian
- data-driven content in `lib/data/*` instead of hardcoded JSX

## Quick Snapshot

| Area | What makes this repo interesting |
| --- | --- |
| Visual style | cinematic hero, editorial sections, patriotic palette, strong imagery |
| Content model | facts and media are centralized instead of being scattered in JSX |
| Images | local asset library in `IMAGES/` managed through one registry |
| Internationalization | English + Romanian UI with client + server locale handling |
| Storytelling | homepage is structured like a sequence, not a landing-page template |
| Deep dives | economy section already works as a real content vertical |

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

## Experience Highlights

- rotating homepage hero with curated local imagery
- animated mega-menu with desktop dropdowns and mobile overlay
- reading progress bar and floating back-to-top button
- data teaser charts with USA-highlighted comparisons
- map preview, video preview, quote carousel, and gallery preview sections
- economy section with full landing page plus five deep-dive routes
- local image library with category folders for easier media management
- Romanian translation mode wired through provider state and cookies

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

### Fast start

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

### Recommended pre-push check

```bash
npm run type-check
npm run build
```

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

## Content Map

If you are new to the repo, this is the shortest useful mental model:

```text
IMAGES/ -> lib/site-images.ts -> lib/data/* or lib/constants.ts -> components -> pages
```

That flow is the backbone of the project:

- media lives in `IMAGES/`
- image keys are centralized in `SITE_IMAGES`
- content and statistics live in `lib/data/*`
- components render the content
- pages assemble the full experience

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

## Feature Flags Without a Feature Flag System

This repo does not use a formal feature-flag service right now, but it is still easy to stage work:

- scaffold a route page and leave TODO zones in place
- wire the route into navigation early if useful
- keep facts in data files so unfinished sections do not contaminate shared components
- keep visual experiments isolated in their own section component

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

### Why this is better than raw URLs everywhere

- easier swaps
- fewer broken references
- easier reuse across sections
- less chance of Vercel/Linux case-sensitivity failures
- one obvious place to audit what the live site is using

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

### Good editing discipline

- use data files for numbers, lists, cards, and repeated text
- keep page files focused on structure
- keep shared visuals inside components
- keep filenames stable once the site depends on them

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

### Current translation approach

- client surfaces like the header use the language provider
- server routes use cookie-based locale reads
- shared datasets can expose localized getters
- Romanian is treated as a first-class display mode, not a mock toggle

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

This is the practical operator section.

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

### Design principle

If a new section looks like a generic SaaS block, it is probably wrong for this repo.

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

### Build sanity checklist

- `npm run type-check` passes
- local image paths match real file names exactly
- new routes are linked intentionally
- translated routes still render without client-only assumptions
- no content was hardcoded into JSX if it belongs in `lib/data/*`

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

## Roadmap Energy

Good next expansions for this repo:

- finish the culture hub with real content blocks and media
- turn quality-of-life from scaffold to full narrative section
- deepen the explorer and gallery experiences
- tighten per-route metadata and translated SEO copy
- expand the Romanian coverage to every remaining visible string
- continue improving the README as the repo gets more opinionated

## Status

| Area | Status |
| --- | --- |
| Homepage | strong and feature-rich |
| Economy | substantial and already production-shaped |
| Culture | scaffolded, ready for content |
| Quality of Life | scaffolded, ready for content |
| Translation | live for shared UI and major route content |
| Image system | centralized and local-first |
| README | now aligned with the actual repo |

---

Built as a patriotic editorial web experience, not a template.  
Keep the bar high. Use real images, real statistics, and intentional layouts.
