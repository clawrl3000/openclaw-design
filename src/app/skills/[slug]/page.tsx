import { notFound } from "next/navigation";
import { getSkillBySlug, getAllSlugs, type Skill } from "@/data/skills";
import { SkillDetailContent } from "@/components/skill-detail-content";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Static generation for all known slugs */
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/** Dynamic metadata per skill */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) return {};

  return {
    title: `${skill.name} — AI Agent Skill`,
    description: skill.tagline,
    openGraph: {
      title: `${skill.name} — OpenClaw Marketplace`,
      description: skill.tagline,
      type: "website",
    },
  };
}

export default async function SkillPage({ params }: Props) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);

  if (!skill) {
    notFound();
  }

  return <SkillDetailContent skill={skill} />;
}
