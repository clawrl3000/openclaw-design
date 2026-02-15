# OpenClaw Marketplace — Agent Instructions

## Overview

Premium skill marketplace for OpenClaw at **openclaw.design**. Users browse, purchase, and download AI agent skill bundles via Stripe.

**Current state:** Project foundation (PRD, design specs, planning). The Next.js app will be built from these specs.

## Tech Stack

- **Framework:** Next.js 15 (App Router), TypeScript
- **UI:** HeroUI (heroui.com) + Tailwind CSS
- **Fonts:** Geist Mono (headings, code) + Geist Sans (body)
- **Database:** Drizzle ORM + Vercel Postgres (or Neon)
- **Auth:** NextAuth.js v5 (GitHub OAuth + email)
- **Payments:** Stripe Checkout + Webhooks
- **Email:** Resend
- **Storage:** Vercel Blob
- **Hosting:** Vercel

## Key Files

- `prd.json` — PRD with 21 user stories
- `tasks/prd-openclaw-marketplace.md` — Full PRD markdown
- `design/stitch-prompt.md` — Google Stitch design prompt
- `.env.example` — All required environment variables
- `prd-generator/skills/` — PRD and SEO skills

## Design Direction

- Dark theme matching openclaw.ai aesthetic
- Animated ASCII art claw in hero background (monospace text, low opacity)
- Geist Mono for terminal/hacker feel, Geist Sans for body
- Reference: https://openclaw.ai/

## Patterns

- Skills are SKILL.md bundles (same format as OpenClaw native skills)
- After purchase: SKILL.md revealed inline + copy button + download
- Single-vendor store (our team only, no third-party sellers for MVP)
- Gambling/betting skills require legal disclaimers
