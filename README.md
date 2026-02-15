# OpenClaw Marketplace

Premium skill marketplace for [OpenClaw](https://openclaw.ai/) at **openclaw.design**.

Browse, purchase, and download curated AI agent skill bundles via Stripe.

## Status

**This repo is the project foundation** — PRD, design specs, and planning artifacts. The Next.js app will be built from these specs.

## What Is This?

While [ClawHub](https://clawhub.ai) is the free, open-source skill registry for OpenClaw, this marketplace sells **premium, curated skills** — tested, documented, with walkthroughs and creator stories.

## Planned Tech Stack

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

## What's Here

```
├── prd.json                          # PRD with 21 user stories (structured)
├── tasks/prd-openclaw-marketplace.md # Full PRD document (markdown)
├── design/stitch-prompt.md           # Google Stitch design prompt
├── prd-generator/skills/             # Reusable agent skills
│   ├── create-prd/SKILL.md           #   PRD generation
│   ├── convert-to-json/SKILL.md      #   PRD → JSON conversion
│   └── seo-optimizer/SKILL.md        #   SEO audit & metadata
├── .env.example                      # Required env vars template
└── AGENTS.md                         # Agent instructions
```

## License

Private.
