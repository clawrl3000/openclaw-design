---
name: seo-optimizer
description: "Analyze and optimize web pages for SEO. Use when you need to audit SEO, generate meta tags, create structured data, write Open Graph tags, build sitemaps, or improve search rankings. Triggers on: seo audit, optimize for search, meta tags, structured data, sitemap, open graph."
metadata: { "openclaw": { "requires": { "bins": ["curl"] } } }
---

# SEO Optimizer

Analyze web pages and generate optimized SEO metadata, structured data, Open Graph tags, and sitemaps.

---

## What You Can Do

1. **Audit a page** — Fetch a URL and analyze its SEO health
2. **Generate meta tags** — Title, description, keywords for any page
3. **Create Open Graph tags** — For social sharing (Facebook, Twitter/X, LinkedIn)
4. **Build structured data** — JSON-LD schema for products, articles, organizations, FAQs
5. **Generate sitemaps** — XML sitemaps from a list of URLs
6. **Write robots.txt** — Crawl directives for search engines
7. **Keyword analysis** — Suggest keywords based on page content

---

## 1. SEO Audit

Fetch a page and check for common issues:

```bash
curl -s -L "https://example.com" | head -200
```

**Check for:**
- `<title>` exists and is 50-60 characters
- `<meta name="description">` exists and is 150-160 characters
- `<h1>` exists (exactly one per page)
- Open Graph tags present (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter card tags present (`twitter:card`, `twitter:title`, `twitter:description`)
- Canonical URL set (`<link rel="canonical">`)
- Structured data present (JSON-LD `<script type="application/ld+json">`)
- Images have `alt` attributes
- No duplicate titles or descriptions across pages

**Report format:**
```
## SEO Audit: [URL]

### Score: [X/10]

✅ Title tag present (54 chars) — "Your Page Title Here"
✅ Meta description present (148 chars)
❌ Missing Open Graph image (og:image)
❌ No structured data found
⚠️  H1 tag found but generic ("Welcome")
✅ Canonical URL set
✅ All images have alt text (12/12)

### Recommendations:
1. Add og:image meta tag with a 1200x630px image
2. Add JSON-LD Product schema for product pages
3. Make H1 more descriptive and keyword-rich
```

---

## 2. Meta Tags

Generate optimized meta tags for a page:

```html
<!-- Primary Meta Tags -->
<title>[50-60 chars, primary keyword near front]</title>
<meta name="description" content="[150-160 chars, compelling, includes CTA]">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/page">
<meta property="og:title" content="[Same or slightly different from title]">
<meta property="og:description" content="[Same or slightly different from meta description]">
<meta property="og:image" content="https://example.com/og-image.png">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://example.com/page">
<meta name="twitter:title" content="[Title]">
<meta name="twitter:description" content="[Description]">
<meta name="twitter:image" content="https://example.com/og-image.png">
```

**Rules:**
- Title: primary keyword first, brand name last, pipe or dash separator
- Description: action-oriented, include a value proposition, end with CTA if possible
- OG image: 1200x630px recommended, text readable at small sizes
- Keep titles unique across all pages
- Keep descriptions unique across all pages

---

## 3. Structured Data (JSON-LD)

### Product (for e-commerce / marketplace)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "description": "Product description",
  "image": "https://example.com/image.jpg",
  "url": "https://example.com/product",
  "brand": {
    "@type": "Brand",
    "name": "Brand Name"
  },
  "offers": {
    "@type": "Offer",
    "price": "29.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://example.com/product"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "12"
  }
}
```

### Organization
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://twitter.com/handle",
    "https://github.com/org"
  ]
}
```

### FAQ
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text."
      }
    }
  ]
}
```

### SoftwareApplication (for skills/tools)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Skill Name",
  "description": "What it does",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "9.99",
    "priceCurrency": "USD"
  }
}
```

---

## 4. Sitemap Generation

Generate XML sitemap from a list of pages:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/skills/weather</loc>
    <lastmod>2026-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Priority guidelines:**
- Homepage: 1.0
- Category/browse pages: 0.8
- Product/skill detail pages: 0.8
- About/legal pages: 0.3
- Auth pages: 0.1 (or exclude)

---

## 5. Robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /dashboard/
Disallow: /auth/
Disallow: /api/
Disallow: /purchases/

Sitemap: https://example.com/sitemap.xml
```

---

## 6. Next.js Specific SEO

For Next.js App Router projects, generate metadata using the Metadata API:

```typescript
// app/layout.tsx — global defaults
export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Site Name — Tagline',
    template: '%s | Site Name',
  },
  description: 'Default site description',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Site Name',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

```typescript
// app/skills/[slug]/page.tsx — dynamic per-page
export async function generateMetadata({ params }): Promise<Metadata> {
  const skill = await getSkill(params.slug)
  return {
    title: skill.name,
    description: skill.tagline,
    openGraph: {
      title: skill.name,
      description: skill.tagline,
      images: [{ url: skill.heroImageUrl, width: 1200, height: 630 }],
    },
  }
}
```

```typescript
// app/sitemap.ts — dynamic sitemap
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const skills = await getAllPublishedSkills()
  return [
    { url: 'https://example.com', lastModified: new Date(), priority: 1 },
    ...skills.map(s => ({
      url: `https://example.com/skills/${s.slug}`,
      lastModified: s.updatedAt,
      priority: 0.8,
    })),
  ]
}
```

---

## Quick Commands

**Audit a live page:**
```bash
curl -s "https://example.com" | head -100
```

**Check if sitemap exists:**
```bash
curl -s "https://example.com/sitemap.xml" | head -20
```

**Check robots.txt:**
```bash
curl -s "https://example.com/robots.txt"
```

**Test Open Graph tags (use Facebook debugger URL):**
```
https://developers.facebook.com/tools/debug/?q=https://example.com
```

---

## Checklist

When optimizing a site for SEO:

- [ ] Every page has a unique `<title>` (50-60 chars)
- [ ] Every page has a unique `<meta description>` (150-160 chars)
- [ ] Every page has Open Graph tags (title, description, image, url)
- [ ] Every page has Twitter card tags
- [ ] Product/listing pages have JSON-LD structured data
- [ ] Homepage has Organization JSON-LD
- [ ] `sitemap.xml` exists and lists all public pages
- [ ] `robots.txt` exists and references the sitemap
- [ ] Canonical URLs set on all pages
- [ ] All images have descriptive `alt` text
- [ ] H1 tags are descriptive and keyword-rich (one per page)
- [ ] Internal linking between related pages
- [ ] Page load time under 3 seconds (Core Web Vitals)
