---
name: typography-formatting
description: >
  Apply professional typography, text formatting, and visual hierarchy to UI text.
  Handles bold, italic, highlights, gradients, color accents, font pairing, and
  inline rich text in React/HTML/CSS. Use when writing UI copy, formatting headings,
  styling text with emphasis, creating highlighted/accented words, applying gradient
  text, fixing inconsistent typography, or when the user says "format text", "highlight",
  "bold this", "make this pop", "style the heading", or "fix the typography".
---

# Typography & Text Formatting

Professional text styling for dark-theme UI. Every rule targets React + Tailwind CSS
on dark backgrounds (#110B07 to #1E1510 range).

## When to Apply

- Writing or editing any user-facing text in components
- User asks for emphasis, highlights, bold, italic, gradient text
- Reviewing copy that looks flat or has no visual hierarchy
- Formatting headings, taglines, stats, labels, or body text

## Core Principle

**One highlight per sentence. Two weights per block. Three sizes per section.**

More than that creates noise. Less creates monotony.

## Font Pairing Rules

| Role | Font | CSS | Use |
|------|------|-----|-----|
| Headings, prices, labels, code | Geist Mono | `font-mono` | Precision, data, identity |
| Body text, descriptions, long prose | Geist Sans | `font-sans` (default) | Readability, warmth |

Never mix more than these two. Mono = structure. Sans = narrative.

## Weight Scale

| Weight | Tailwind | When |
|--------|----------|------|
| 400 (Regular) | `font-normal` | Body text, descriptions |
| 500 (Medium) | `font-medium` | Subtle emphasis, labels |
| 600 (Semibold) | `font-semibold` | Section headings, sub-titles |
| 700 (Bold) | `font-bold` | Page titles, product names |
| 800 (Extrabold) | `font-extrabold` | Prices, hero stats, display numbers |

**Rule**: Only jump 2 weight levels between adjacent text. 400 next to 800 looks broken.
400 → 600 → 800 reads as a natural hierarchy.

## Bold & Italic in UI Text

### Bold — for scannability

Use bold to let someone **skim and still get the point**. Bold the outcome, not the filler.

```tsx
// BAD: bold the whole sentence
<p className="font-bold">This skill scans markets and finds mispriced contracts.</p>

// BAD: bold the feature word
<p>This skill <strong>scans</strong> markets and finds mispriced contracts.</p>

// GOOD: bold the outcome
<p className="text-white/45">
  This skill scans markets and finds{" "}
  <strong className="text-white/70 font-medium">mispriced contracts</strong>.
</p>
```

**Bold pattern**: Bump from `text-white/45` to `text-white/70` + `font-medium`.
Never use `font-bold` inside body text — it's too heavy. `font-medium` is enough contrast.

### Italic — for voice and attribution

Italic is for tone shifts: asides, quotes, technical terms on first use, or conversational
emphasis.

```tsx
// Technical term on first use
<p>
  Exploits the <em className="text-white/55 not-italic">longshot bias</em> — where
  bettors systematically overpay for unlikely events.
</p>

// Conversational aside
<p>
  Your agent handles the rest. <em className="text-white/35 italic">Seriously, all of it.</em>
</p>
```

**Rule**: On dark backgrounds, true italic can look thin and hard to read. Prefer
`not-italic` + a color shift for "emphasis that reads like italic" in body text.
Reserve real `italic` for short asides and quotes only.

## Highlighting & Accenting Words

### Gradient text — for hero/display text only

```tsx
<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] via-[#F97316] to-[#F59E0B]">
  highlighted words
</span>
```

**Only use on**: Hero headlines, product names, stat numbers, CTA emphasis.
**Never use on**: Body text, labels, or anything under 20px. Gradients disappear at small sizes.

### Color accent — for inline emphasis

```tsx
// Coral accent for key terms
<span className="text-[#FF4D4D]">72 million trades</span>

// Amber accent for numbers/stats
<span className="text-[#F59E0B] font-mono">98.24%</span>

// Orange accent for action words
<span className="text-[#F97316]">instant execution</span>
```

**Rule**: One accent color per paragraph. Mixing coral + amber + orange in one
block looks like a rainbow. Pick the one that fits the word type:

| Word type | Color | Example |
|-----------|-------|---------|
| Key metric, stat | Amber `#F59E0B` | "98.24% win rate" |
| Product name, brand term | Coral `#FF4D4D` | "Clawshi", "OpenClaw" |
| Action, verb, CTA word | Orange `#F97316` | "executes", "ships", "installs" |
| Warning, risk, caveat | Coral `#FF4D4D` at 60% | "risk", "loss" |

### Background highlight — for callout phrases

```tsx
<span className="bg-[#FF4D4D]/10 text-[#FF4D4D] px-1.5 py-0.5 rounded font-mono text-[13px]">
  +2.29% edge
</span>
```

Use for: Data snippets pulled into prose, inline code-like values, key stats.

## Heading Patterns

### Page title (h1)

```tsx
<h1 className="font-mono text-[28px] font-bold text-white/90 leading-[1.15] tracking-tight">
  Product Name
</h1>
```

### Section heading (h2)

```tsx
<h2 className="font-mono text-[18px] font-semibold text-white/80 mb-5 tracking-tight">
  Section Title
</h2>
```

### Subsection (h3)

```tsx
<h3 className="font-mono text-[15px] font-semibold text-white/70">
  Subsection
</h3>
```

### Overline / label

```tsx
<span className="font-mono text-[11px] font-medium text-white/30 uppercase tracking-widest">
  Category Label
</span>
```

## Body Text Patterns

### Standard paragraph

```tsx
<p className="text-[15px] text-white/45 leading-[1.7] max-w-[65ch]">
  Body text here. Keep paragraphs under 3 lines on desktop.
</p>
```

### Paragraph with emphasis

```tsx
<p className="text-[15px] text-white/45 leading-[1.7] max-w-[65ch]">
  Your agent scans for{" "}
  <strong className="text-white/70 font-medium">mispriced contracts</strong>{" "}
  in the <span className="text-[#F59E0B] font-mono">85-97¢</span> range where
  historical win rates exceed implied probability.
</p>
```

### Tagline / short description

```tsx
<p className="text-[14px] text-white/35 leading-relaxed max-w-[40ch]">
  Short supporting text. Lighter weight, tighter max-width.
</p>
```

## Number & Price Formatting

```tsx
// Large display price
<span className="font-mono text-[42px] font-extrabold text-white tracking-tight leading-none">
  $49
</span>

// Inline price
<span className="font-mono font-bold text-[#FF4D4D]">$49</span>

// Stat with label
<div>
  <p className="font-mono text-2xl font-bold text-white">1,112</p>
  <p className="text-[11px] text-white/25 font-mono uppercase tracking-wider mt-0.5">Installs</p>
</div>

// Percentage / metric
<span className="font-mono text-[#F59E0B]">98.24%</span>
```

**Rule**: Prices and stats are always `font-mono`. Always. No exceptions.

## List Formatting

### Feature list with icon

```tsx
<div className="flex items-start gap-3">
  <span className="text-[#FF4D4D] mt-[3px] flex-shrink-0">
    <CheckIcon size={14} />
  </span>
  <span className="text-[14px] text-white/50 leading-relaxed">
    Feature description here
  </span>
</div>
```

### Metadata key-value row

```tsx
<div className="flex justify-between text-[13px]">
  <span className="text-white/20 font-mono">Label</span>
  <span className="text-white/50 font-mono">Value</span>
</div>
```

## Anti-Patterns

| Don't | Do Instead |
|-------|------------|
| Bold entire sentences | Bold 1-3 key words only |
| Use `font-bold` in body text | Use `font-medium` + color bump |
| Gradient text under 20px | Use solid color accent |
| Mix 3+ accent colors in one paragraph | Pick one per block |
| Italic for emphasis in dark UI | Color shift + weight bump |
| ALL CAPS for body text | ALL CAPS only for overline labels (11-12px) |
| Underline for emphasis | Underline only for links |
| Center-align body paragraphs | Left-align everything except hero headlines |
| Skip heading levels (h1 → h3) | Use every level in order |

## Quick Reference: Opacity Scale for Dark Theme

| Opacity | Tailwind | Role |
|---------|----------|------|
| 90% | `text-white/90` | Product names, prices, h1 |
| 80% | `text-white/80` | Section headings (h2) |
| 70% | `text-white/70` | Inline bold emphasis, h3 |
| 50% | `text-white/50` | Feature text, secondary body |
| 45% | `text-white/45` | Primary body text, descriptions |
| 35% | `text-white/35` | Taglines, supporting text |
| 25% | `text-white/25` | Labels, captions, meta values |
| 20% | `text-white/20` | Meta keys, muted labels |
| 10% | `text-white/10` | Decorative, empty states |
