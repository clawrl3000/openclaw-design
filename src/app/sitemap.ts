import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://openclaw.design";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Skill pages (will be dynamic from DB later)
  const skills = [
    "smart-email-responder",
    "sports-odds-analyzer",
    "github-pr-reviewer",
    "social-content-engine",
    "smart-home-orchestrator",
    "meeting-notes-pro",
  ];

  const skillPages: MetadataRoute.Sitemap = skills.map((slug) => ({
    url: `${baseUrl}/skills/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...skillPages];
}
