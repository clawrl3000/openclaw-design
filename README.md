# OpenClaw Marketplace

Premium skill marketplace for [OpenClaw](https://openclaw.ai/) at **openclaw.design**.

Browse, purchase, and download curated AI agent skill bundles via Stripe.

## What Is This?

While [ClawHub](https://clawhub.ai) is the free, open-source skill registry for OpenClaw, this marketplace sells **premium, curated skills** — tested, documented, with walkthroughs and creator stories.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| UI | HeroUI + Tailwind CSS |
| Fonts | Geist Mono + Geist Sans |
| Database | Drizzle ORM + Postgres |
| Auth | NextAuth.js v5 |
| Payments | Stripe |
| Email | Resend |
| Hosting | Vercel |

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in your API keys in .env.local

# Run dev server
npm run dev
```

See `.env.example` for all required environment variables.

## Project Structure

```
├── prd.json                          # PRD (21 user stories)
├── tasks/prd-openclaw-marketplace.md # Full PRD document
├── design/stitch-prompt.md           # Google Stitch design prompt
├── prd-generator/skills/             # Reusable skills
│   ├── create-prd/SKILL.md
│   ├── convert-to-json/SKILL.md
│   └── seo-optimizer/SKILL.md
└── .env.example                      # Required env vars
```

## License

Private.
