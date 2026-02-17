import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "OpenClaw Community | Private Discord for AI Agent Builders",
  description: "Join our private Discord community for OpenClaw users. Share business ideas, get member support, discover new use cases, and connect with other AI agent builders.",
  keywords: "OpenClaw, Discord, community, AI agents, business ideas, member support, skill sharing",
  openGraph: {
    title: "Join the OpenClaw Community",
    description: "Private Discord for OpenClaw users. Business ideas, member support, skill sharing & more.",
    type: "website",
    url: "https://openclaw.design/community"
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the OpenClaw Community", 
    description: "Private Discord for OpenClaw users. Business ideas, member support, skill sharing & more.",
  }
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}