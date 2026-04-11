# 🇺🇸 America: The Greatest Nation

A cinematic, large-scale web experience celebrating the United States of America across every measurable dimension — economy, military, nature, innovation, culture, and more.

---

## Tech Stack

| Layer      | Tech                                  |
| ---------- | ------------------------------------- |
| Framework  | Next.js 14 (App Router)               |
| Styling    | Tailwind CSS v3 with custom USA theme |
| Database   | Supabase (PostgreSQL)                 |
| Deployment | Vercel                                |
| Animations | Framer Motion                         |
| Charts     | Recharts + D3.js                      |
| Icons      | Lucide React                          |
| Forms      | React Hook Form + Zod                 |
| State      | Zustand                               |

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials:

- `NEXT_PUBLIC_SUPABASE_URL` — from Supabase Dashboard → Project Settings → API
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — same location
- `SUPABASE_SERVICE_ROLE_KEY` — same location (keep secret, server-only)

### 3. Set up Supabase database

1. Go to [app.supabase.com](https://app.supabase.com)
2. Create a new project
3. Open **SQL Editor → New Query**
4. Paste and run the contents of `supabase-schema.sql`

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel Dashboard → Project → Settings → Environment Variables
```

---

## Project Structure

```
usa-patriot-site/
├── app/
│   ├── layout.tsx              # Root layout (fonts, header, footer)
│   ├── page.tsx                # Home page
│   ├── globals.css             # Tailwind + custom CSS
│   ├── actions/
│   │   └── newsletter.ts       # Server Action: newsletter signup
│   ├── economy/page.tsx        # Phase 3 placeholder
│   └── sitemap/page.tsx        # All sections sitemap
├── components/
│   ├── ui/
│   │   ├── Button.tsx          # 4 variants: primary, secondary, ghost, gold
│   │   ├── Card.tsx            # Generic card shell
│   │   ├── Badge.tsx           # Tag/label component
│   │   └── AnimatedCounter.tsx # Scroll-triggered count-up
│   ├── layout/
│   │   ├── Header.tsx          # Sticky glass header + mega menu + mobile drawer
│   │   └── Footer.tsx          # Dark navy footer with flag stripe
│   ├── sections/
│   │   ├── HeroSection.tsx     # Full-viewport hero with parallax + particle stars
│   │   ├── OpeningStatement.tsx# Parchment quote section
│   │   ├── StatBar.tsx         # 6-stat animated counter bar
│   │   ├── SectionGrid.tsx     # 10-card navigation grid
│   │   ├── NavigationCard.tsx  # Individual section card
│   │   ├── QuoteCarousel.tsx   # Rotating famous quotes
│   │   ├── StatCard.tsx        # Individual stat with counter
│   │   ├── QuoteBlock.tsx      # Pull-quote component
│   │   └── NewsletterSection.tsx
│   └── forms/
│       └── NewsletterSignup.tsx # RHF + Zod + Supabase
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client (singleton)
│   │   └── server.ts           # Server Supabase client + admin client
│   ├── animations.ts           # All Framer Motion variants
│   ├── constants.ts            # Colors, nav structure, key stats
│   └── utils.ts                # cn(), formatNumber(), unsplashUrl(), etc.
├── types/
│   ├── content.types.ts        # All content TypeScript interfaces
│   └── database.types.ts       # Supabase table row types
├── tailwind.config.ts          # Full custom theme (colors, fonts, animations)
├── next.config.ts              # Image domains, headers, performance
└── supabase-schema.sql         # Run this in Supabase SQL Editor
```

---

## Build Phases

| Phase       | Status          | Description                                 |
| ----------- | --------------- | ------------------------------------------- |
| **Phase 1** | ✅ **Complete** | Foundation: layout, theme, components, hero |
| Phase 2     | 🔜 Next         | Home page: all sections fully built         |
| Phase 3     | 🔜              | Economy section                             |
| Phase 4     | 🔜              | Nature & Geography                          |
| Phase 5     | 🔜              | Military                                    |
| Phase 6     | 🔜              | Constitution & Democracy                    |
| Phase 7     | 🔜              | Culture                                     |
| Phase 8     | 🔜              | Innovation & Technology                     |
| Phase 9     | 🔜              | Science & Inventions                        |
| Phase 10    | 🔜              | Universities                                |
| Phase 11-18 | 🔜              | Quality of Life → Launch                    |

---

## Design System

### Colors

| Token        | Hex       | Use                         |
| ------------ | --------- | --------------------------- |
| `glory-red`  | `#B22234` | Primary actions, accents    |
| `glory-blue` | `#3C3B6E` | Headers, links, backgrounds |
| `glory-gold` | `#FFD700` | Stat numbers, highlights    |
| `navy-dark`  | `#0d1117` | Page background             |
| `parchment`  | `#F5F0E8` | Light quote sections        |

### Fonts

- **Bebas Neue** — hero display numbers, large titles
- **Playfair Display** — editorial headings (h1–h4)
- **Inter** — body copy, labels, UI text

---

## Performance Targets

- Lighthouse Performance: **90+**
- Lighthouse Accessibility: **95+**
- First Contentful Paint: **< 1.5s**
- Largest Contentful Paint: **< 2.5s**
- Cumulative Layout Shift: **< 0.1**

---

## Data Sources

All statistics are sourced from official institutions:

- World Bank, IMF, OECD
- SIPRI (military spending)
- National Park Service
- Nobel Foundation
- Department of Defense
- US Census Bureau
- Pitchbook / NVCA (venture capital)
- QS World University Rankings

---

_Made with ❤️ in the USA 🇺🇸_
