# Google Stitch Design Prompt — OpenClaw Marketplace

Paste the prompt below into Google Stitch to generate the visual design system. Save generated designs back into this `design/` folder.

---

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
- The header/hero section features a LARGE ASCII art lobster claw
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
- Primary monospace: Geist Mono (by Vercel) — used for headings, code blocks, 
  and anywhere we want that terminal/hacker feel.
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
- Animated claw: ASCII art text, 5-10% opacity, slow CSS animation (translateY + rotate), 
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
