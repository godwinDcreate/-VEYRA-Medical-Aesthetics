# VEYRA Medical Aesthetics — Website System

Premium **Liquid Glass** MedSpa website **and** reusable multi-tenant website system.

> **Build once. Configure. Improve. Repeat.**

Portfolio / proof-of-concept for an AI-Native Website Expert role at Forever Booked.

**VEYRA is fictional.** All providers, testimonials, addresses, and business details are demo content — not a real medical practice.

---

## Design language

Luxury medical aesthetics × editorial fashion × liquid glass × soft wellness × Apple-like spatial design.

- Floating glass pill navigation
- Layered ivory / champagne / sage atmosphere with slow liquid blobs
- Thin translucent glass surfaces (`glass-light` → `glass-strong` / `glass-dark`)
- Multi-step luxury consultation booking
- Intelligent concierge AI Treatment Guide (not a chatbot UI)
- Desktop-only subtle custom cursor (disabled on touch + reduced motion)

Glass is used strategically — typography and photography lead; glass enhances.

---

## Overview

This project demonstrates how to ship beautiful, fast, SEO & GEO optimized MedSpa websites that are:

- Easy for clients to update (config / CMS-ready content)
- Easy for an internal team to manage (shared components + tenant registry)
- Faster to launch with every new site (duplicate config → theme → deploy)

Live demo tenants:

| ID | Brand |
|----|--------|
| `veyra` | VEYRA Medical Aesthetics |
| `aurelia` | AURELIA Aesthetics |
| `nova` | NOVA Medical Spa |

Switch brands on the developer architecture tour: [`/system`](./src/pages/System.tsx)

---

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 7
- Lucide React
- Framer Motion (subtle reveals only; respects `prefers-reduced-motion`)

Deploy target: **Vercel**

---

## Quick start

```bash
cd projects/veyra-medical-aesthetics
npm install
cp .env.example .env
npm run dev
```

Build & preview:

```bash
npm run build
npm run preview
```

---

## Project structure

```
src/
  components/     # Reusable UI (Header, Hero, TreatmentCard, AITreatmentGuide, …)
  config/
    medspa.ts     # Tenant registry
    medspas/      # Per-client configs (veyra, aurelia, nova)
  context/        # Active tenant + theme application
  data/           # Shared treatment knowledge base
  lib/            # SEO + JSON-LD helpers
  pages/          # Route screens
  services/       # aiService, bookingService (provider-agnostic)
  types/          # MedSpaConfig contract (CMS-ready)
api/              # Vercel serverless stubs (AI + booking) — secrets stay server-side
public/           # robots.txt, sitemap.xml, favicon
```

---

## Multi-tenant architecture

1. Components read `useMedSpa().config` — never hardcode client copy.
2. Each MedSpa is a `MedSpaConfig` object (brand, theme, contact, treatments, SEO…).
3. Register the config in `src/config/medspa.ts`.
4. Theme tokens map to CSS variables via `applyTheme()`.

### Create a new MedSpa

1. Duplicate `src/config/medspas/veyra.ts` → `src/config/medspas/your-client.ts`
2. Update branding, theme colors, logo text
3. Update services / treatment SEO copy as needed
4. Update location, phone, hours, service area
5. Update SEO defaults + `pageSeo`
6. Replace imagery and testimonials
7. Add to `medSpaRegistry` + `medSpaOptions`
8. Preview with the header selector → deploy

Philosophy: **the tenth site should be faster than the second.**

---

## Theme system

Each config includes a `theme` object (`background`, `foreground`, `primary`, `accent`, …).

Changing theme tokens updates the full UI through CSS variables — no per-component color edits.

---

## SEO & GEO

- Semantic HTML5, one H1 per page, heading hierarchy
- Unique titles, meta descriptions, canonical URLs, Open Graph
- `robots.txt` + `sitemap.xml`
- Breadcrumbs + internal linking
- JSON-LD: Organization, WebSite, MedicalBusiness, Service, FAQPage, BreadcrumbList, WebPage
- Treatment content model answers GEO questions (what / who / expect / consult / where / book)
- Local page: `/locations/austin`

Structured data is generated from config where possible — **no invented ratings, licenses, or awards**.

---

## AI Treatment Guide

Flow:

```
User → Frontend → /api/ai-guide → AI provider → treatment knowledge → Response
```

- UI uses `src/services/aiService.ts` only
- Without a configured API, a polished **mock** ranks treatments from the knowledge base
- **Never** put API keys in `VITE_*` env vars or frontend code
- Server stub: `api/ai-guide.js` (extend with OpenAI / Anthropic / Gemini)

Always shows the medical education disclaimer — not a diagnosis tool.

---

## Booking

`/book` form validates input, shows loading/success states, includes a honeypot field.

`src/services/bookingService.ts` + `api/book.js` are ready to wire to GoHighLevel, CRM, or booking software.

---

## CMS readiness

`MedSpaConfig` is the content contract. Future sources:

- Sanity / Contentful / Strapi / WordPress / Supabase

Map CMS documents → `MedSpaConfig` and keep components unchanged. Comments in config files mark integration points.

---

## Environment variables

See `.env.example`.

| Variable | Where | Purpose |
|----------|--------|---------|
| `VITE_SITE_URL` | Frontend | Canonical / OG base |
| `VITE_AI_API_URL` | Frontend | AI endpoint path |
| `VITE_BOOKING_API_URL` | Frontend | Booking endpoint path |
| `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` / `GEMINI_API_KEY` | **Server only** | Live AI |

---

## Performance

- Manual chunks for vendor + motion
- Lazy-loaded routes
- Image width/height + lazy loading (hero uses `fetchPriority="high"`)
- Minimal dependencies
- Fixed atmospheric gradients (no video backgrounds)
- `prefers-reduced-motion` respected

---

## Deployment (Vercel)

1. Import the repo in Vercel
2. Framework preset: Vite
3. Set env vars from `.env.example`
4. Deploy

`vercel.json` includes SPA rewrites and long-cache headers for assets.

---

## Screening checklist (intent)

| Requirement | How this project shows it |
|-------------|---------------------------|
| Beautiful | Editorial MedSpa design system |
| Fast / mobile | Vite, lazy routes, mobile-first nav & forms |
| SEO + GEO | Metadata, sitemap, JSON-LD, answer-first content |
| AI-native | Treatment Guide + secure API architecture |
| Editable | Config-driven / CMS-ready content model |
| Manageable | `/system` + shared components |
| Reusable / multi-site | Three live tenants, one codebase |

---

## License / disclaimer

Demo portfolio project. Not affiliated with Forever Booked. Not a real clinic. Do not use for clinical marketing as-is without replacing all fictional content and adding compliant medical review.
