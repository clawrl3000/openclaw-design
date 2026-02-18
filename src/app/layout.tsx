import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OpenClaw Marketplace — Premium AI Agent Skills",
    template: "%s | OpenClaw Marketplace",
  },
  description:
    "Browse and download premium AI agent skills for OpenClaw. Tested, documented, 1-click install. Productivity, automation, development & more.",
  metadataBase: new URL("https://openclaw.design"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI agent skills",
    "OpenClaw",
    "AI marketplace",
    "agent plugins",
    "AI automation",
    "SKILL.md",
    "premium AI tools",
  ],
  authors: [{ name: "OpenClaw", url: "https://openclaw.design" }],
  creator: "OpenClaw",
  publisher: "OpenClaw",
  openGraph: {
    title: "OpenClaw Marketplace — Premium AI Agent Skills",
    description:
      "Browse and download premium AI agent skills. Tested, documented, and ready to install in one click.",
    url: "https://openclaw.design",
    siteName: "OpenClaw Marketplace",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw Marketplace — Premium AI Agent Skills",
    description:
      "Browse and download premium AI agent skills. Tested, documented, 1-click install.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD structured data for rich results
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://openclaw.design/#website",
      url: "https://openclaw.design",
      name: "OpenClaw Marketplace",
      description:
        "Browse and download premium AI agent skills for OpenClaw. Tested, documented, 1-click install.",
      publisher: { "@id": "https://openclaw.design/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://openclaw.design/skills?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://openclaw.design/#organization",
      name: "OpenClaw",
      url: "https://openclaw.design",
      description:
        "Premium AI agent skills marketplace. Curated, tested, and documented skill bundles for the OpenClaw agent platform.",
      sameAs: [
        "https://github.com/openclaw",
        "https://discord.gg/openclaw",
      ],
    },
    {
      "@type": "WebApplication",
      "@id": "https://openclaw.design/#app",
      name: "OpenClaw Marketplace",
      url: "https://openclaw.design",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      description:
        "Marketplace for premium AI agent skills — productivity, automation, development, and more.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "5",
        highPrice: "9",
        offerCount: "8",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "8",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://openclaw.design/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://openclaw.design",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://plausible.io/js/pa-KMHQhX-JPzNS0G5UpA5dR.js"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
