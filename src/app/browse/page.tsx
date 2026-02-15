import { BrowseContent } from "@/components/browse-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Skills — OpenClaw Marketplace",
  description: "Discover and purchase premium AI agent skills. Filter by category, search by name, and find the perfect tools for your AI agent.",
  openGraph: {
    title: "Browse Skills — OpenClaw Marketplace",
    description: "Discover and purchase premium AI agent skills. Filter by category, search by name, and find the perfect tools for your AI agent.",
    type: "website",
  },
};

export default function BrowsePage() {
  return <BrowseContent />;
}