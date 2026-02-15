# PRD: OpenClaw Marketplace (openclaw.design)

## Introduction

A premium skill marketplace for OpenClaw (Clawdbot) at **openclaw.design**. While ClawHub (clawhub.ai) serves as the free, open-source skill registry, OpenClaw Marketplace is where curated, high-quality skills are **sold** to OpenClaw users via Stripe. Think of it as the paid App Store layer on top of the free ecosystem.

Skills are `SKILL.md` bundles — the same format OpenClaw uses natively — delivered as downloadable packages after purchase. The marketplace features rich, visually compelling skill pages with hero imagery, walkthroughs, creator stories, reviews, and version history.

This is a **single-vendor** store: only our team creates and sells skills. The architecture should be clean enough to potentially open to third-party sellers later, but MVP is our catalog only.

---

## Goals

- Launch a polished, visually exciting marketplace at openclaw.design
- Let OpenClaw users browse, preview, and purchase premium skill bundles via Stripe
- Deliver purchased skills as downloadable SKILL.md bundles (zip) for self-install
- Require user accounts for purchase history, re-downloads, and receipt management
- Provide rich skill detail pages: hero images, how-it-works, creator stories, reviews, changelogs
- Establish a design language using Google Stitch for rapid, high-quality visual prototyping
- Build on Next.js + Vercel for fast iteration, SSR/SEO, and native Stripe support

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 (App Router) | SSR, SEO, API routes, server actions |
| Hosting | Vercel | Zero-config deploys, edge functions, analytics |
| Payments | Stripe Checkout + Webhooks | Industry standard, handles tax, receipts, refunds |
| Auth | NextAuth.js (Auth.js) v5 | GitHub OAuth + email/password, session management |
| Database | Vercel Postgres (or Neon) | Serverless Postgres, tight Vercel integration |
| ORM | Drizzle ORM | Type-safe, lightweight, great DX |
| File Storage | Vercel Blob or S3 | Skill bundle zips + hero images |
| Styling | Tailwind CSS + HeroUI (heroui.com) | Beautiful component library, dark mode built-in, Tailwind-based |
| Design | Google Stitch | AI-generated visual designs and prototypes |
| Email | Resend | Transactional emails (receipts, download links) |

---

## User Stories

### US-001: Project scaffold and dev environment
**Description:** As a developer, I need a Next.js 15 app with Tailwind, HeroUI, and Drizzle ORM configured so we can build features incrementally.

**Acceptance Criteria:**
- [ ] Next.js 15 App Router project in root (or `app/`) with TypeScript
- [ ] Tailwind CSS + HeroUI (heroui.com, formerly NextUI) initialized via `npx heroui-cli@latest init`
- [ ] Drizzle ORM configured with Vercel Postgres (or Neon) connection
- [ ] Environment variables documented in `.env.example`
- [ ] `npm run dev` runs local server; `npm run build` succeeds
- [ ] Typecheck/lint passes

### US-002: Database schema — skills, users, purchases
**Description:** As a developer, I need the core database tables so the app can store skills, user accounts, and purchase records.

**Acceptance Criteria:**
- [ ] `skills` table: id, slug, name, tagline, description, price_cents, currency, hero_image_url, created_at, updated_at, published (boolean), category
- [ ] `skill_versions` table: id, skill_id, version, changelog, bundle_url, created_at
- [ ] `users` table: id, email, name, avatar_url, stripe_customer_id, created_at
- [ ] `purchases` table: id, user_id, skill_id, skill_version_id, stripe_payment_intent_id, amount_cents, currency, status, purchased_at
- [ ] `reviews` table: id, user_id, skill_id, rating (1-5), body, created_at
- [ ] Drizzle migrations run successfully
- [ ] Typecheck passes

### US-003: Authentication (GitHub OAuth + email)
**Description:** As a user, I want to create an account and log in so I can purchase skills and access my downloads.

**Acceptance Criteria:**
- [ ] NextAuth.js v5 configured with GitHub OAuth provider
- [ ] Email/password provider as fallback
- [ ] Sign in / Sign up pages with clean UI
- [ ] Session persists across page navigations
- [ ] User record created in database on first login
- [ ] Protected routes redirect to sign-in
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-004: Skill catalog / browse page (homepage)
**Description:** As a visitor, I want to browse available skills on the homepage so I can discover what's for sale.

**Acceptance Criteria:**
- [ ] Homepage at `/` displays grid of skill cards
- [ ] Each card shows: hero image, skill name, tagline, price, category badge
- [ ] Cards are visually rich and exciting (large images, hover effects, subtle animations)
- [ ] Filter by category (sidebar or top bar)
- [ ] Sort by: newest, price low-to-high, price high-to-low, highest rated
- [ ] Responsive grid: 3 columns desktop, 2 tablet, 1 mobile
- [ ] SEO meta tags (title, description, Open Graph)
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-005: Skill detail page
**Description:** As a visitor, I want to see everything about a skill before buying — what it does, how it works, what others think.

**Acceptance Criteria:**
- [ ] Dynamic route at `/skills/[slug]`
- [ ] Hero section: large image/video, skill name, tagline, price, "Buy Now" button
- [ ] "About" section: full markdown description rendered
- [ ] "How It Works" section: step-by-step walkthrough with screenshots/diagrams
- [ ] "Creator Story" section: narrative about why/how the skill was built
- [ ] "Reviews" section: star ratings, review text, reviewer name/avatar
- [ ] Sidebar: price, buy button, install instructions preview, version info
- [ ] "Related Skills" section at bottom
- [ ] "Changelog" section: version history with dates and notes
- [ ] SSR for SEO (server component with dynamic metadata)
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-006: Stripe checkout integration
**Description:** As a user, I want to buy a skill with my credit card via Stripe so I can download and use it.

**Acceptance Criteria:**
- [ ] "Buy Now" button creates a Stripe Checkout session (server action)
- [ ] Redirects to Stripe-hosted checkout page
- [ ] Success URL returns to `/purchases/[id]/success` with download link
- [ ] Cancel URL returns to the skill detail page
- [ ] Stripe webhook handler at `/api/webhooks/stripe`
- [ ] On `checkout.session.completed`: create purchase record, associate with user
- [ ] Stripe customer created/linked on first purchase
- [ ] Handles duplicate webhook events idempotently
- [ ] Typecheck/lint passes

### US-007: Skill bundle delivery (download after purchase)
**Description:** As a buyer, I want to download my purchased skill bundle so I can install it in my OpenClaw instance.

**Acceptance Criteria:**
- [ ] Purchase success page shows download button
- [ ] Download endpoint generates a signed, time-limited URL for the zip bundle
- [ ] Bundle contains: SKILL.md + any supporting files (scripts, configs)
- [ ] Only the purchasing user can access the download (auth check)
- [ ] Email sent via Resend with download link after purchase
- [ ] Typecheck/lint passes

### US-008: User dashboard — purchases and downloads
**Description:** As a logged-in user, I want to see my purchase history and re-download any skill I've bought.

**Acceptance Criteria:**
- [ ] Protected route at `/dashboard`
- [ ] List of all purchases: skill name, date, amount, version, download button
- [ ] Each purchase has a "Re-download" button (generates fresh signed URL)
- [ ] Link to receipt (Stripe-hosted receipt URL)
- [ ] Empty state when no purchases
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-009: Admin — skill management (CRUD)
**Description:** As an admin, I need to create, edit, and publish skills so I can manage the catalog.

**Acceptance Criteria:**
- [ ] Admin routes at `/admin/skills` (protected by admin role check)
- [ ] List all skills (published and drafts)
- [ ] Create skill form: name, slug, tagline, description (markdown), price, category, hero image upload
- [ ] Edit skill: all fields editable, preview markdown
- [ ] Publish/unpublish toggle
- [ ] Upload new version: version string, changelog, bundle zip upload
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-010: Reviews and ratings
**Description:** As a buyer, I want to leave a review so other users can see if a skill is worth buying.

**Acceptance Criteria:**
- [ ] Review form on skill detail page (only visible to users who purchased the skill)
- [ ] Star rating (1-5) + text body
- [ ] One review per user per skill (can edit, not duplicate)
- [ ] Average rating displayed on skill card and detail page
- [ ] Review count shown
- [ ] Reviews sorted by most recent
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-011: SEO and marketing pages
**Description:** As a visitor, I want the site to look professional and rank well so I can find it through search.

**Acceptance Criteria:**
- [ ] Dynamic sitemap.xml at `/sitemap.xml`
- [ ] robots.txt at `/robots.txt`
- [ ] Open Graph + Twitter card meta for all pages
- [ ] Structured data (JSON-LD) for product pages (skills)
- [ ] `/about` page: what is OpenClaw Marketplace, who makes it, why premium skills
- [ ] Clean, branded 404 page
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-012: Google Stitch design prompt and visual assets
**Description:** As a designer, I need a Google Stitch prompt that generates the marketplace's visual design system so we can rapidly prototype and build consistent UI.

**Acceptance Criteria:**
- [ ] Google Stitch prompt saved to `design/stitch-prompt.md`
- [ ] Prompt covers: homepage layout, skill card design, skill detail page, checkout flow, dashboard, color palette, typography, spacing
- [ ] Prompt references openclaw.design domain, dark theme preference, "premium but approachable" vibe
- [ ] Prompt includes specific instructions for: hero image treatment, card hover states, CTA button styles, pricing display
- [ ] Prompt requests responsive layouts (desktop, tablet, mobile)
- [ ] Generated designs saved/referenced in `design/` folder
- [ ] Typecheck/lint passes (for any code generated from designs)

---

## Functional Requirements

- **FR-1:** The app runs as a Next.js 15 site deployed on Vercel at openclaw.design.
- **FR-2:** Users can browse all published skills on the homepage in a visually rich grid.
- **FR-3:** Each skill has a dedicated detail page at `/skills/[slug]` with full info, media, reviews, and changelog.
- **FR-4:** Users must create an account (GitHub OAuth or email) to purchase.
- **FR-5:** Clicking "Buy Now" initiates a Stripe Checkout session for the skill's price.
- **FR-6:** After successful payment, a purchase record is created and the user can download the skill bundle (zip).
- **FR-7:** A confirmation email with a download link is sent after purchase via Resend.
- **FR-8:** Users can view all purchases and re-download bundles from `/dashboard`.
- **FR-9:** Admins can create, edit, publish/unpublish skills and upload new versions at `/admin/skills`.
- **FR-10:** Buyers can leave one star rating + text review per purchased skill.
- **FR-11:** Skill detail pages include: hero image/video, description, how-it-works, creator story, reviews, related skills, and changelog.
- **FR-12:** All pages have proper SEO metadata, Open Graph tags, and structured data.
- **FR-13:** A Google Stitch design prompt is maintained in `design/stitch-prompt.md` for generating visual assets and UI prototypes.
- **FR-14:** Skill bundles are stored securely; download URLs are signed and time-limited.
- **FR-15:** Stripe webhook events are handled idempotently to prevent duplicate purchases.

---

## Non-Goals (Out of Scope for MVP)

- **Multi-vendor / third-party sellers.** MVP is single-vendor (our team only). Architecture should be extensible but no seller onboarding, payouts, or seller dashboard.
- **Subscription / recurring billing.** All skills are one-time purchases. Subscriptions can come later.
- **In-app skill installation.** Users download a zip and install manually. Auto-install integration with OpenClaw CLI is future work.
- **Free tier / freemium skills.** All listed skills are paid. Free skills live on ClawHub.
- **Refund flow in the UI.** Refunds handled manually via Stripe dashboard for now.
- **Skill analytics / usage tracking.** No telemetry on how often a purchased skill is used.
- **Mobile native app.** Responsive web is sufficient.
- **Real-time chat / support.** Use email or Discord for support.

---

## Design Considerations

- **Reference: openclaw.ai** — The main OpenClaw site (https://openclaw.ai/) is our aesthetic north star. Study its dark theme, bold typography, community shoutout wall, and clean section layout. Our marketplace should feel like a natural extension of that brand.
- **Animated background claw:** The header/hero area features a large, semi-transparent lobster claw SVG/illustration in the background that subtly animates (slow drift, gentle rotation, or parallax on scroll). It should be atmospheric, not distracting — think a watermark that breathes.
- **Google Stitch first:** Before coding UI, generate designs in Google Stitch using the prompt in `design/stitch-prompt.md`. This lets us iterate on layout and visuals rapidly without writing CSS.
- **Dark theme default:** Match openclaw.ai's dark, confident vibe. Deep backgrounds, vibrant accent colors, glowing CTAs. Not pure black — use deep navy/charcoal like the main site.
- **Lobster branding:** Carry the lobster/claw identity throughout — the claw icon in nav, the animated background claw, and playful-but-premium copy tone.
- **Premium but approachable:** Skills should feel like premium digital products. Large hero images, generous whitespace, bold typography. The openclaw.ai site nails "developer cool" — we want that same energy with a commerce layer.
- **Community proof:** Like openclaw.ai's shoutout wall, consider a testimonial/social proof section on the homepage featuring quotes from skill buyers.
- **Visual hierarchy on cards:** Hero image dominates (60%+ of card), then name, then price. Tagline and category are secondary.
- **Skill detail page = sales page:** Treat each skill page like a landing page. Persuasive copy, social proof (reviews), clear CTA.
- **ClawHub compatibility:** Skills use the same `SKILL.md` format. Consider linking to the free ClawHub listing if a free version exists.

---

## Technical Considerations

- **Stripe webhook security:** Verify webhook signatures. Use `stripe.webhooks.constructEvent` with the webhook secret.
- **Bundle storage:** Zip files stored in Vercel Blob (or S3). Signed URLs with 1-hour expiration for downloads.
- **Image optimization:** Use Next.js `<Image>` for hero images. Consider storing originals in Blob and serving optimized versions.
- **Rate limiting:** Add rate limiting to auth routes and purchase endpoints to prevent abuse.
- **Database indexes:** Index `skills.slug` (unique), `purchases.user_id`, `purchases.skill_id`, `reviews.skill_id`.
- **Caching:** ISR (Incremental Static Regeneration) for skill pages. Revalidate on publish/review.
- **Environment separation:** Stripe test mode for dev/staging, live mode for production. Separate webhook endpoints.

---

## Success Metrics

- A visitor can go from homepage to purchased skill in under 3 minutes
- Skill detail pages load in under 2 seconds (LCP)
- Stripe checkout completes without errors for 99%+ of attempts
- Every purchased skill is downloadable immediately and via email
- Skill pages rank on Google for "[skill name] openclaw" queries within 30 days
- Average review rating is visible and accurate across all skill cards

---

## Additional User Stories (US-017 through US-021)

### US-017: Skill search with preloaded suggestions
**Description:** As a visitor, I want to search for skills by keyword so I can quickly find what I need.

**Acceptance Criteria:**
- [ ] Search bar in navigation searches skill names, taglines, and descriptions
- [ ] Results appear as a dropdown as user types (debounced, 300ms)
- [ ] Preloaded popular suggestions shown when search bar is focused but empty
- [ ] Pressing Enter or clicking a result navigates to skill detail page
- [ ] Search query preserved in URL params (`/skills?q=weather`)
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-018: Legal pages — Terms, Privacy, Refund Policy
**Description:** As a marketplace operator, I need legal pages to process payments and comply with regulations.

**Acceptance Criteria:**
- [ ] Terms of Service at `/terms` — account creation, purchasing, license, prohibited uses, liability
- [ ] Privacy Policy at `/privacy` — data collected, cookies, third-party services (Stripe, GitHub, Resend)
- [ ] Refund Policy at `/refunds` — digital goods policy, when refunds are granted, how to request
- [ ] Gambling/betting disclaimer: skills related to gambling are tools only, user assumes all risk, must comply with local laws
- [ ] Footer links to all legal pages
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

### US-019: Seed content — launch skills
**Description:** As a marketplace operator, I need at least 5 skills populated so the store isn't empty at launch.

**Acceptance Criteria:**
- [ ] Seed script or admin-created entries for at least 5 launch skills
- [ ] Each skill has full content: name, tagline, description, category, price, hero image, version + bundle
- [ ] Skills span at least 3 categories
- [ ] At least one gambling/betting skill with proper disclaimers
- [ ] Seed runnable via `npm run seed` or admin UI

### US-020: Email templates — welcome, receipt, download
**Description:** As a buyer, I want professional emails after signing up and purchasing.

**Acceptance Criteria:**
- [ ] Resend SDK configured with API key and verified sender domain
- [ ] Welcome email on first account creation
- [ ] Purchase receipt email with skill name, price, date, download link, install instructions
- [ ] Emails use dark-themed branding matching the site
- [ ] Typecheck passes

### US-021: Analytics — Vercel Analytics and conversion tracking
**Description:** As a marketplace operator, I need analytics to track traffic and conversions.

**Acceptance Criteria:**
- [ ] Vercel Analytics enabled via `@vercel/analytics`
- [ ] Vercel Speed Insights enabled for Core Web Vitals
- [ ] Custom events: `skill_viewed`, `buy_clicked`, `purchase_completed`, `download_clicked`
- [ ] Typecheck passes

---

## Open Questions

1. **Pricing strategy:** What price range for skills? ($5-$15 utility skills? $25-$50 premium skills? Tiered?)
2. **Skill bundling:** Should we offer skill packs / bundles at a discount?
3. **Preview / trial:** Should users be able to see a partial SKILL.md before buying, or is the detail page description enough?
4. **Update policy:** When a new version of a purchased skill is released, does the buyer get it free? Or is it a new purchase?
5. **ClawHub cross-listing:** Should paid skills also appear on ClawHub (with a "buy on openclaw.design" link)?
6. **Domain setup:** Is openclaw.design already registered and pointed at Vercel?
7. **ASCII claw rendering:** Pure text `<pre>` tag vs CSS-animated text grid vs SVG conversion — decide after generating the art.

---

## Google Stitch Design Prompt

The following prompt should be used with Google Stitch to generate the visual design system for the marketplace. Save the output designs to the `design/` folder.

---

### Prompt for Google Stitch

```
Design a premium digital marketplace website called "OpenClaw Marketplace" at openclaw.design.
This site sells AI agent skills (small automation templates) for the OpenClaw/Clawdbot platform.

DESIGN REFERENCE:
- Study https://openclaw.ai/ — this is the parent brand. Our marketplace should feel like a 
  natural extension of that site's aesthetic: same dark confident tone, bold typography, 
  clean section breaks, and lobster/claw branding throughout.
- openclaw.ai uses: dark backgrounds, large bold headlines, community shoutout/testimonial walls, 
  tabbed install sections, clean nav with logo + links, generous spacing, and a playful-but-premium 
  developer tone.
- Our marketplace adds a commerce layer on top of that same brand identity.

BRAND & VIBE:
- Dark theme matching openclaw.ai (deep navy/charcoal backgrounds, not pure black)
- Accent colors: electric blue (#3B82F6) and vibrant coral (#F97316) for CTAs
- Carry the lobster/claw identity: claw icon in nav, claw motifs in backgrounds
- Premium but approachable — same "developer cool" energy as openclaw.ai but with a store layer
- Subtle glow effects on interactive elements
- "Intelligence at work" feeling — clean, confident, slightly futuristic

ANIMATED ASCII CLAW BACKGROUND:
- The header/hero section features a LARGE ASCII art lobster claw rendered in Geist Mono
- The claw is made of actual text characters (ASCII art) — not an SVG or image
- Generated using an ASCII art tool (e.g. asciigen.xyz or similar), then embedded as text
- Rendered at low opacity (5-10%) in whatever monospace font looks best for the art 
  (doesn't have to be Geist Mono — could be a denser font like Iosevka or a classic like Courier)
- The ASCII claw subtly animates: slow floating drift, gentle rotation, or parallax on scroll
- It should feel atmospheric and alive — a terminal watermark that breathes
- The monospace ASCII characters reinforce the hacker/terminal aesthetic of the brand
- Visible on the homepage hero and optionally on other page headers
- Rendering approach TBD: pure <pre> text, CSS-animated text grid, or SVG conversion

PAGES TO DESIGN:

1. HOMEPAGE (/)
   - Navigation: lobster claw icon + "OpenClaw" wordmark, search bar, "Browse Skills", sign in/avatar
   - Hero banner with animated background claw behind it:
     * Bold headline "Premium Skills for Your AI Agent"
     * Subtext about curated, tested, documented skills
     * CTA button "Browse Marketplace" (glowing coral)
   - Optional: community proof section (testimonial cards from skill buyers, similar to 
     openclaw.ai's shoutout wall)
   - Skills grid: 3 columns, each card has:
     * Large hero image (60% of card height, rounded corners)
     * Skill name (bold, white)
     * One-line tagline (muted text)
     * Price badge (bottom-right, pill shape, accent color)
     * Category tag (top-left overlay, semi-transparent)
     * Star rating (small, below name)
     * Hover: subtle scale + glow border
   - Filter bar: categories (Productivity, Communication, Development, Media, Automation, Smart Home)
   - Sort dropdown: Newest, Price Low-High, Price High-Low, Highest Rated
   - Footer: links to About, GitHub, Discord, Terms, Privacy — matching openclaw.ai footer style

2. SKILL DETAIL PAGE (/skills/[slug])
   - Hero section: full-width image or video background with gradient overlay, 
     subtle claw watermark in corner
     * Skill name (large, bold), tagline underneath
     * Price + "Buy Now" button (large, glowing CTA)
     * Star rating + review count
   - Content sections (scrolling, not tabs — like openclaw.ai's vertical flow):
     * "About" — rich text description
     * "How It Works" — numbered steps with icons/screenshots
     * "Creator Story" — narrative with author avatar, why they built it
     * "Reviews" — star ratings, review cards with user avatars
     * "Changelog" — version timeline with dates
   - Sticky sidebar (desktop): price, buy button, version info, category, 
     install instructions preview
   - "Related Skills" carousel at bottom

3. CHECKOUT SUCCESS PAGE
   - Animated claw in background (celebratory feel)
   - Confirmation with checkmark animation
   - SKILL.md content revealed inline with "Copy to Clipboard" button
   - Download .md button + Download zip button
   - "What's next" — 3-step install instructions with icons
   - Link to dashboard for future re-downloads

4. USER DASHBOARD (/dashboard)
   - Welcome header with user avatar + name
   - "My Purchases" list: skill thumbnail, name, purchase date, version, 
     download button, copy SKILL.md button
   - Clean card layout (not table)
   - Empty state: lobster claw illustration + "No purchases yet" + "Browse Skills" CTA

5. SIGN IN / SIGN UP
   - Centered card on dark background with subtle claw watermark
   - OpenClaw logo at top
   - "Sign in with GitHub" button (prominent, dark with GitHub icon)
   - Divider: "or continue with email"
   - Email + password fields
   - "Sign In" button (accent color)
   - Clean, minimal, trustworthy — matches openclaw.ai's clean aesthetic

TYPOGRAPHY:
- Primary monospace: Geist Mono (by Vercel) — used for headings, code blocks, ASCII claw, 
  and anywhere we want that terminal/hacker feel. It's geometric, ultra-clean, and native to Next.js.
- Body text: Geist Sans (pairs naturally with Geist Mono, same family)
- The monospace-forward typography is intentional — it reinforces the "AI agent / terminal" identity
- Hero headline: 48-64px, Geist Mono bold
- Section headings: 28-36px, Geist Mono
- Body: 16px, Geist Sans
- Code/technical: Geist Mono

SPACING & LAYOUT (match openclaw.ai's generous spacing):
- Generous padding throughout — sections breathe, nothing cramped
- Max content width: 1280px centered
- Section padding: 80-100px vertical on desktop
- Responsive: desktop (3-col grid), tablet (2-col), mobile (1-col stacked)

IMAGERY STYLE FOR SKILL CARDS:
- Each skill card hero image should feel like a "product shot"
- Abstract, colorful, slightly 3D, representing what the skill does
- Example: a weather skill → stylized clouds with glowing data streams
- Example: a Slack skill → chat bubbles with a friendly robot icon
- Example: a GitHub skill → code brackets with flowing gradient lines
- Rich gradients, soft shadows, vibrant but not childish

SPECIFIC ELEMENTS:
- Animated claw: large SVG, 5-10% opacity, slow CSS animation (translateY + rotate), 
  positioned absolute behind hero content
- Pricing pills: rounded-full, semi-transparent coral background, white text, coral border
- Star ratings: filled stars in amber (#F59E0B), outlined gray for empty
- Buy buttons: rounded-lg, coral gradient (F97316 → F59E0B), white bold text, shadow, hover glow
- Cards: rounded-xl, dark surface (#1F2937), thin border (#374151) on hover, subtle shadow
- Category badges: small pills, muted background, category text
- Search bar: rounded-full, dark surface, subtle border, magnifying glass icon
- Navigation: transparent/blur background, sticky on scroll (like openclaw.ai)
- Testimonial cards: dark surface, quote text, user handle, subtle border — matching 
  openclaw.ai's shoutout wall style
```

---

## Using this PRD

- **Markdown:** `tasks/prd-openclaw-marketplace.md`
- **JSON:** `prd.json` (converted via `prd-generator/skills/convert-to-json/`)
- **Branch:** `openclaw-marketplace`
