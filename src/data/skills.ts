export interface Skill {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  /** Raw numeric price for cart math */
  priceNum: number;
  category: string;
  rating: number;
  reviewCount: number;
  /** Long description shown on product page */
  description: string;
  /** What's included list */
  includes: string[];
  /** Bullet features */
  features: string[];
  /** Version string */
  version: string;
  /** Compatibility line */
  compatibility: string;
  heroImage?: string;
  /** Optional HTML overlay text rendered on top of heroImage */
  heroOverlay?: {
    title: string;
    subtitle: string;
  };
  /** Stripe Product ID (from Stripe Dashboard) */
  stripeProductId: string;
  /** Stripe Price ID (from Stripe Dashboard) */
  stripePriceId: string;
  /** GitHub owner/repo for the private skill repo */
  githubRepo: string;
}

export const SKILLS: Skill[] = [
  {
    slug: "kalshi-prediction-markets",
    name: "Clawshi",
    tagline:
      "72M trades revealed a pattern most bettors don't know exists. This agent trades it for you.",
    price: "$15",
    priceNum: 15,
    category: "Trading",
    rating: 4.9,
    reviewCount: 312,
    description:
      "We studied 72 million Kalshi trades and found a repeating pattern in how retail bettors price contracts — it shows up in sports, politics, crypto, entertainment. Every single category. The edge isn't theoretical. It's a documented statistical bias that creates mispriced contracts, and most traders are on the wrong side of it. Clawshi scans for these moments 3x daily, validates each one against real-time news, and executes with risk controls you define. You set the rules. It trades them.",
    includes: [
      "SKILL.md — full skill definition with cron prompts",
      "Opportunity scanner (all categories, 3x daily)",
      "Gameday sports scanner with injury/schedule data",
      "Position monitor with settlement tracking",
      "Clawshi quick-bet system (voice/text triggered)",
      "Dashboard data export for visualization",
      "7 Python scripts (scanner, trader, monitor, dashboard)",
      "Risk config templates (bet sizing, edge thresholds)",
      "Strategy documentation based on 72M trade research",
    ],
    features: [
      "Exploits proven edge from 72M+ Kalshi trade analysis",
      "Autonomous scanning 3x daily across all categories",
      "Live news validation before every trade (Tavily integration)",
      "\"Clawshi\" instant execution — say the news, agent places the bet",
      "Sports-specific scanner with injury reports and line movement",
      "Configurable risk limits: max bet, daily exposure, min edge",
      "Limit-only orders (maker, not taker) for +2.5% fee advantage",
      "Full audit trail with position tracking and P&L reporting",
      "RSA-authenticated Kalshi API integration",
      "Human-in-the-loop or fully autonomous mode",
    ],
    version: "2.1.0",
    compatibility: "OpenClaw v2.0+",
    heroImage: "/images/kalshi-hero.webp",
    heroOverlay: {
      title: "Clawshi",
      subtitle: "AI-Powered Trading Strategies\n& Probability Analysis",
    },
    stripeProductId: "prod_Tz9I5p0mO7OkAN",
    stripePriceId: "price_1T1AzfA1Q0bjxXUQJteDipxa",
    githubRepo: "openclaw-design/kalshi-prediction-markets",
  },
  {
    slug: "openclaw-memory-system",
    name: "Memory System",
    tagline:
      "Your agent wakes up fresh every session. This gives it a brain — structured memory, a decision ledger, and a test to prove it works.",
    price: "$9",
    priceNum: 9,
    category: "Agent Core",
    rating: 4.8,
    reviewCount: 189,
    description:
      "OpenClaw agents have amnesia by default. Sessions reset daily, gateway restarts wipe context, and your agent can't remember yesterday's conversations, decisions, or hard-won lessons. Without this, it's just an expensive chatbot that forgets everything between sessions. The Memory System is a file-based architecture — daily journals, long-term curated memory, a boot sequence that restores full context, and heartbeat-driven maintenance that promotes daily notes into permanent knowledge. The Decision Ledger is the killer feature: a structured log that prevents your agent from relitigating settled decisions. Saves tokens, prevents flip-flopping, creates institutional knowledge.",
    includes: [
      "SKILL.md — 10K+ word skill definition with full documentation",
      "AGENTS.md template — boot sequence (what to do when waking up)",
      "MEMORY.md template — long-term curated knowledge",
      "HEARTBEAT.md template — periodic maintenance checklist",
      "USER.md template — info about your human",
      "Decision Ledger format — structured decision tracking",
      "trim-sessions.sh — trims bloated sessions >2MB automatically",
      "memory-stats.sh — memory health overview CLI",
      "Filled-out examples (daily-log-example.md, memory-example.md)",
    ],
    features: [
      "Survives session resets, gateway restarts, and daily 4AM wipes",
      "Decision Ledger — never relitigate a settled decision again",
      "Heartbeat-driven promotion from daily notes to long-term memory",
      "The Pumpernickel Test — built-in verification that memory works",
      "Session bloat prevention (trims >2MB files, keeps 7-day backups)",
      "Security-aware — private memory excluded from group chats",
      "Self-maintaining — weekly prune cycle keeps memory lean",
      "Zero dependencies — no API keys, no external services, just files",
    ],
    version: "1.0.0",
    compatibility: "OpenClaw v2.0+",
    heroImage: "/images/memory-system-hero.webp",
    heroOverlay: {
      title: "Memory System",
      subtitle: "Persistent Context & Decision Tracking\nfor OpenClaw Agents",
    },
    stripeProductId: "prod_Tz9ITgqam5ffgg",
    stripePriceId: "price_1T1AzVA1Q0bjxXUQowjCebJe",
    githubRepo: "openclaw-design/openclaw-memory-system",
  },
  {
    slug: "smart-email-responder",
    name: "Smart Email Responder",
    tagline:
      "Stop writing emails. Your agent learns your voice from 50 past threads, then drafts replies that sound like you wrote them.",
    price: "$5",
    priceNum: 5,
    category: "Productivity",
    rating: 4.8,
    reviewCount: 142,
    description:
      "Smart Email Responder analyzes your existing emails to learn your writing style, tone, and common phrases. It then drafts contextually appropriate responses for incoming messages — from quick acknowledgments to detailed replies. Works with Gmail, Outlook, and any IMAP provider.",
    includes: [
      "SKILL.md — core skill definition",
      "Email tone calibration agent",
      "Thread context analyzer",
      "3 example configurations",
    ],
    features: [
      "Learns your unique writing voice from past emails",
      "Context-aware replies based on full thread history",
      "Adjustable formality slider (casual → corporate)",
      "Supports Gmail, Outlook, and IMAP",
      "Draft review mode — approve before sending",
    ],
    version: "1.2.0",
    compatibility: "OpenClaw v2.0+",
    heroImage: "/images/email-responder-hero.webp",
    heroOverlay: {
      title: "Email Responder",
      subtitle: "AI-Powered Draft Replies\nThat Sound Like You",
    },
    stripeProductId: "prod_Tz9IQPZ0f5FF6J",
    stripePriceId: "price_1T1AzgA1Q0bjxXUQm1YFV0xq",
    githubRepo: "openclaw-design/smart-email-responder",
  },
  {
    slug: "sports-odds-analyzer",
    name: "Sports Odds Analyzer",
    tagline:
      "Compare odds across 15 sportsbooks in real time. Find value bets before the line moves — alerts hit your phone in seconds.",
    price: "$7",
    priceNum: 7,
    category: "Automation",
    rating: 4.6,
    reviewCount: 87,
    description:
      "Sports Odds Analyzer scrapes and compares real-time odds across DraftKings, FanDuel, BetMGM, and 12 more sportsbooks. It identifies value bets using expected value calculations, tracks line movement, and sends alerts when edges appear. Built for serious bettors who want data-driven decisions.",
    includes: [
      "SKILL.md — core skill definition",
      "Odds scraping agents (15 books)",
      "EV calculator module",
      "Alert configuration templates",
      "Historical odds database schema",
    ],
    features: [
      "Real-time odds from 15+ sportsbooks",
      "Expected value (EV) calculations on every line",
      "Line movement tracking and alerts",
      "Arbitrage opportunity detection",
      "Customizable alert thresholds",
      "Historical data export (CSV/JSON)",
    ],
    version: "2.1.0",
    compatibility: "OpenClaw v2.0+",
    heroImage: "/images/sports-odds-hero.webp",
    heroOverlay: {
      title: "Odds Analyzer",
      subtitle: "Real-Time Odds Comparison\nAcross 15 Sportsbooks",
    },
    stripeProductId: "prod_Tz9InocpzM0i4w",
    stripePriceId: "price_1T1AzhA1Q0bjxXUQrbNnGnYz",
    githubRepo: "openclaw-design/sports-odds-analyzer",
  },
  {
    slug: "github-pr-reviewer",
    name: "GitHub PR Reviewer",
    tagline:
      "Every PR reviewed in under 90 seconds. Catches bugs, security holes, and style drift before your team even looks at it.",
    price: "$7",
    priceNum: 7,
    category: "Development",
    rating: 4.9,
    reviewCount: 234,
    description:
      "GitHub PR Reviewer integrates directly with your repositories to provide instant, thorough code reviews on every pull request. It checks for bugs, security vulnerabilities, style inconsistencies, and performance issues. Supports JavaScript, TypeScript, Python, Go, and Rust out of the box.",
    includes: [
      "SKILL.md — core skill definition",
      "Language-specific review agents (5 languages)",
      "Security scanning rules",
      "Custom rule configuration",
      "GitHub App integration guide",
    ],
    features: [
      "Instant review on PR open — no waiting for humans",
      "Bug detection with explanation and fix suggestion",
      "Security vulnerability scanning (OWASP Top 10)",
      "Style and convention enforcement",
      "Performance anti-pattern detection",
      "Inline comments on exact code lines",
    ],
    version: "3.0.1",
    compatibility: "OpenClaw v2.0+",
    heroImage: "/images/pr-reviewer-hero.webp",
    heroOverlay: {
      title: "PR Reviewer",
      subtitle: "Automated Code Reviews\nin Under 90 Seconds",
    },
    stripeProductId: "prod_Tz9IcnDak1mgeO",
    stripePriceId: "price_1T1B27A1Q0bjxXUQdnNLBvbM",
    githubRepo: "openclaw-design/github-pr-reviewer",
  },
  {
    slug: "content-factory",
    name: "Content Factory",
    tagline:
      "One brief, four platforms. Multi-agent pipeline turns ideas into algorithm-tuned posts for X, LinkedIn, Instagram, and Threads.",
    price: "$9",
    priceNum: 9,
    category: "Media",
    rating: 4.5,
    reviewCount: 98,
    description:
      "Social Content Engine takes a single content brief and generates platform-native posts for Twitter/X, LinkedIn, Instagram, and Threads. Each post is optimized for the platform's algorithm — hashtags, character limits, hooks, and visual suggestions included.",
    includes: [
      "SKILL.md — core skill definition",
      "Platform optimization agents (4 platforms)",
      "Hashtag research module",
      "Content calendar template",
      "10 brief-to-post examples",
    ],
    features: [
      "One brief → four platform-optimized posts",
      "Algorithm-aware formatting for each platform",
      "Trending hashtag suggestions",
      "Visual/carousel content recommendations",
      "A/B variant generation",
      "Scheduling-ready output format",
    ],
    version: "1.5.0",
    compatibility: "OpenClaw v2.0+",
    heroImage: "/images/content-factory-hero.webp",
    heroOverlay: {
      title: "Content Factory",
      subtitle: "Multi-Agent Content Pipeline\nAcross Every Platform",
    },
    stripeProductId: "prod_Tz9IQ7apd0hSRh",
    stripePriceId: "price_1T1AzWA1Q0bjxXUQGt2fi9HI",
    githubRepo: "openclaw-design/content-factory",
  },
  {
    slug: "smart-home-orchestrator",
    name: "Smart Home Orchestrator",
    tagline:
      "Say \"movie mode\" and your lights dim, blinds close, TV turns on. One command controls every device in your house.",
    price: "$5",
    priceNum: 5,
    category: "Smart Home",
    rating: 4.7,
    reviewCount: 63,
    description:
      "Smart Home Orchestrator connects your IoT devices through a unified natural language interface. Say 'movie mode' and it dims lights, closes blinds, turns on the TV, and adjusts the thermostat. Supports HomeKit, Google Home, SmartThings, and MQTT devices.",
    includes: [
      "SKILL.md — core skill definition",
      "Device discovery agents",
      "Scene builder module",
      "MQTT bridge configuration",
      "5 pre-built scene templates",
    ],
    features: [
      "Natural language device control",
      "Multi-device scene automation",
      "Supports HomeKit, Google Home, SmartThings, MQTT",
      "Time and sensor-based triggers",
      "Energy usage monitoring",
      "Voice command integration",
    ],
    version: "1.0.3",
    compatibility: "OpenClaw v2.0+",
    heroImage: "/images/smart-home-hero.webp",
    heroOverlay: {
      title: "Smart Home",
      subtitle: "One Command Controls\nEvery Device in Your House",
    },
    stripeProductId: "prod_Tz9IzDvE4IqfKf",
    stripePriceId: "price_1T1B02A1Q0bjxXUQUbirHR6Z",
    githubRepo: "openclaw-design/smart-home-orchestrator",
  },
  {
    slug: "meeting-notes-pro",
    name: "Meeting Notes Pro",
    tagline:
      "Paste a meeting transcript, get back a clean summary, every action item with an owner, and a follow-up email draft. Takes 8 seconds.",
    price: "$5",
    priceNum: 5,
    category: "Productivity",
    rating: 4.4,
    reviewCount: 176,
    description:
      "Meeting Notes Pro processes raw meeting transcripts (from Zoom, Google Meet, Teams, or Otter.ai) and produces clean, structured output: a summary, key decisions, action items with owners, and follow-up email drafts. Perfect for teams that hate taking notes.",
    includes: [
      "SKILL.md — core skill definition",
      "Transcript parser (Zoom/Meet/Teams/Otter)",
      "Action item extractor",
      "Follow-up email generator",
      "Summary template library",
    ],
    features: [
      "Processes transcripts from all major platforms",
      "Clean summary with key decisions highlighted",
      "Action items extracted with assigned owners",
      "Follow-up email drafts generated automatically",
      "Searchable meeting archive",
      "Slack/Teams integration for sharing",
    ],
    version: "2.0.0",
    compatibility: "OpenClaw v2.0+",
    heroImage: "/images/meeting-notes-hero.webp",
    heroOverlay: {
      title: "Meeting Notes",
      subtitle: "Transcript → Summary + Action Items\nin 8 Seconds",
    },
    stripeProductId: "prod_Tz9Iaj48rtYwiX",
    stripePriceId: "price_1T1B02A1Q0bjxXUQade4GJvE",
    githubRepo: "openclaw-design/meeting-notes-pro",
  },
  {
    slug: "market-recon",
    name: "Market Recon",
    tagline:
      "30 days of Reddit threads, X posts, and forum rants — distilled into pain points, opportunities, and a product brief your agent can build from.",
    price: "$9",
    priceNum: 9,
    category: "Automation",
    rating: 4.8,
    reviewCount: 127,
    description:
      "Market Recon ships with a built-in research engine for quick scans. For deep intelligence, it plugs into the open-source last30days skill — pulling real conversations from Reddit, X posts, YouTube transcripts, and web pages. Either way, Market Recon's value-add is the same: it turns raw research into scored opportunities, competitor analysis, and ready-to-build product briefs. The 'Idea to Prototype' pipeline goes further — taking research output and having your agent build a working MVP from the findings.",
    includes: [
      "SKILL.md — 11K+ word research methodology with prompt library",
      "5 research prompt templates (SaaS, product, API, community, content)",
      "Complete example research report with opportunity scoring",
      "Idea-to-Prototype pipeline (research → spec → MVP)",
      "Quick scan mode for lightweight research passes",
      "Competitor analysis matrix generator",
      "Pain point extraction with severity/frequency scoring",
      "Auto product brief generator from research findings",
      "last30days integration guide with setup walkthrough",
    ],
    features: [
      "Dual research engine: built-in quick scan OR deep 4-source via last30days integration",
      "Integrates with @mvanhorn's open-source last30days skill (Reddit + X + YouTube + Web)",
      "30-day historical analysis — not just today's trending topics",
      "Pain point extraction with severity and frequency scoring",
      "Competitor landscape mapping with feature gap analysis",
      "Opportunity scoring: market size × pain × solution gap",
      "Auto-generated product briefs ready for development",
      "Idea-to-Prototype pipeline — research → spec → working MVP",
      "Weekly monitoring via cron for ongoing market tracking",
      "Export to Markdown, JSON, or structured formats",
    ],
    version: "1.1.0",
    compatibility: "OpenClaw v2.0+",
    heroImage: "/images/market-recon-hero.webp",
    heroOverlay: {
      title: "Market Recon",
      subtitle: "Deep Market Intelligence\nFrom Real User Conversations",
    },
    stripeProductId: "prod_Tz9Ic55ZZi2fwC",
    stripePriceId: "price_1T1AzTA1Q0bjxXUQZGn2IuKw",
    githubRepo: "openclaw-design/market-recon",
  },
  {
    slug: "morning-command-center",
    name: "Morning Command Center",
    tagline:
      "Wake up to a briefing that actually matters — calendar, email, weather, news, and portfolio in one daily digest, delivered before your coffee's ready.",
    price: "$7",
    priceNum: 7,
    category: "Productivity",
    rating: 4.9,
    reviewCount: 203,
    description:
      "Morning Command Center is a fully automated daily briefing system. At a time you choose, your agent checks your calendar, scans unread emails for urgency, pulls weather for your location, grabs relevant news, and checks your portfolio — then delivers a clean, prioritized digest to Telegram, Discord, Signal, or email. It doesn't just summarize — it triages. Urgent items surface first with recommended actions. Quiet mornings get a quick 'all clear.' Everything runs on cron, zero interaction required.",
    includes: [
      "SKILL.md — complete briefing system with prompt templates",
      "Cron configuration for daily/hourly scheduling",
      "Multi-channel delivery (Telegram, Discord, Signal, email)",
      "Calendar integration (Google Calendar, Apple Calendar)",
      "Email triage module (Gmail, IMAP, Proton Bridge)",
      "Weather module (no API key required)",
      "News scanner with topic filtering",
      "Portfolio tracker (stocks, crypto, prediction markets)",
      "Priority scoring engine — surfaces what matters first",
      "Weekend/quiet mode configuration",
    ],
    features: [
      "Fully automated — runs on cron, zero daily interaction",
      "Multi-source briefing: calendar, email, weather, news, portfolio",
      "Smart triage — urgent items surface first with actions",
      "Delivers to Telegram, Discord, Signal, or email",
      "Weekend mode — lighter briefings on off days",
      "Configurable sections — enable only what you care about",
      "Zero mandatory API keys — works with free data sources",
      "Optional integrations: Google Calendar, financial APIs",
      "Quiet morning detection — short 'all clear' when nothing's urgent",
      "Historical briefing archive for reference",
    ],
    version: "1.0.0",
    compatibility: "OpenClaw v2.0+",
    heroImage: "/images/morning-command-center-hero.webp",
    heroOverlay: {
      title: "Command Center",
      subtitle: "Automated Daily Briefings\nDelivered Before Coffee",
    },
    stripeProductId: "prod_Tz9IzDUHeoE9dj",
    stripePriceId: "price_1T1AzSA1Q0bjxXUQ4Aqb8KKW",
    githubRepo: "openclaw-design/morning-command-center",
  },
  {
    slug: "autonomous-goal-engine",
    name: "Autonomous Goal Engine",
    tagline:
      "Brain-dump your goals. Wake up to today's tasks. Your agent breaks down ambitions into daily actions and tracks everything on a kanban board.",
    price: "$12",
    priceNum: 12,
    category: "Productivity",
    rating: 4.7,
    reviewCount: 156,
    description:
      "Autonomous Goal Engine turns vague ambitions into concrete daily actions. Brain-dump your goals in plain English — 'launch my SaaS by March,' 'lose 15 pounds,' 'learn Spanish' — and the engine decomposes them into milestones, weekly targets, and daily tasks. Every morning, it generates your task list based on deadlines, dependencies, and energy patterns. A built-in kanban board tracks everything. Weekly reviews auto-adjust timelines when life happens. It's a personal project manager that never sleeps.",
    includes: [
      "SKILL.md — goal decomposition engine with prompt library",
      "Goal intake templates (business, health, learning, creative)",
      "Milestone generator with dependency mapping",
      "Daily task generation engine (cron-driven)",
      "Kanban board (HTML dashboard, no external tools)",
      "Weekly review automation with timeline adjustment",
      "Progress tracking with streak detection",
      "Accountability notifications via any channel",
      "Goal archive and retrospective generator",
      "Multi-goal priority balancing system",
    ],
    features: [
      "Natural language goal input — just brain-dump what you want",
      "Automatic decomposition: goals → milestones → weekly → daily tasks",
      "Morning task delivery tuned to your energy patterns",
      "Built-in kanban board — no Notion/Trello/Jira needed",
      "Weekly auto-review adjusts timelines when you fall behind",
      "Streak tracking and momentum scoring",
      "Multi-goal balancing — handles competing priorities",
      "Accountability pings via Telegram, Discord, or Signal",
      "Retrospective reports: what worked, what didn't",
      "Zero external dependencies — all file-based, runs locally",
    ],
    version: "1.0.0",
    compatibility: "OpenClaw v2.0+",
    heroImage: "/images/autonomous-goal-engine-hero.webp",
    heroOverlay: {
      title: "Goal Engine",
      subtitle: "Brain-Dump Goals → Daily Tasks\nWith Built-In Kanban",
    },
    stripeProductId: "prod_Tz9IXNeNvMlBy6",
    stripePriceId: "price_1T1AzUA1Q0bjxXUQWb7Bd3H3",
    githubRepo: "openclaw-design/autonomous-goal-engine",
  },
  {
    slug: "app-forge",
    name: "App Forge",
    tagline:
      "Describe the app. Get a working prototype. One command builds full-stack tools that replace your Notion, Airtable, and spreadsheet hacks.",
    price: "$9",
    priceNum: 9,
    category: "Development",
    rating: 4.6,
    reviewCount: 94,
    description:
      "App Forge is a one-command app builder for OpenClaw agents. Describe what you need in plain English — 'a CRM for my freelance clients,' 'a habit tracker with streaks,' 'an invoice generator' — and App Forge generates a working full-stack prototype. It builds HTML/CSS/JS apps with local storage, or full Next.js/Flask apps with databases. Templates cover the most common replacements: CRM, invoice tool, habit tracker, recipe manager, bookmark organizer. Stop paying $20/month for Notion when your agent can build a better version in 60 seconds.",
    includes: [
      "SKILL.md — app generation engine with architecture patterns",
      "10 app templates (CRM, invoices, habits, recipes, bookmarks, etc.)",
      "Frontend generator (HTML/Tailwind or React)",
      "Backend generator (Next.js API routes or Flask)",
      "Database schema generator (SQLite, JSON, or Postgres)",
      "Deployment guides (local, Vercel, Railway)",
      "Iteration engine — describe changes, agent updates the app",
      "Component library with pre-built UI patterns",
      "Data import/export (CSV, JSON, API)",
      "Mobile-responsive by default",
    ],
    features: [
      "One-command app generation from plain English description",
      "10 pre-built templates for common tools people overpay for",
      "Full-stack output: frontend + backend + database",
      "Iterative refinement — describe changes, agent rebuilds",
      "Mobile-responsive output by default",
      "Local-first: SQLite/JSON storage, no cloud dependency",
      "Optional cloud deploy to Vercel or Railway",
      "Data import from CSV, JSON, or existing tools",
      "Component reuse across generated apps",
      "Zero framework lock-in — generates clean, standard code",
    ],
    version: "1.0.0",
    compatibility: "OpenClaw v2.0+",
    heroImage: "/images/app-forge-hero.webp",
    heroOverlay: {
      title: "App Forge",
      subtitle: "Describe It → Build It\nOne-Command App Generator",
    },
    stripeProductId: "prod_Tz9IS7GA8zJY3c",
    stripePriceId: "price_1T1AzVA1Q0bjxXUQhUtgbTt6",
    githubRepo: "openclaw-design/app-forge",
  },
];

/** Look up a skill by slug */
export function getSkillBySlug(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug === slug);
}

/** Get all skill slugs (for static generation) */
export function getAllSlugs(): string[] {
  return SKILLS.map((s) => s.slug);
}

export const CATEGORIES = [
  "All",
  "Agent Core",
  "Trading",
  "Productivity",
  "Development",
  "Automation",
  "Media",
  "Smart Home",
  "Communication",
];

export const SORT_OPTIONS = [
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: Low \u2192 High" },
  { key: "price-desc", label: "Price: High \u2192 Low" },
  { key: "rating", label: "Highest Rated" },
];
