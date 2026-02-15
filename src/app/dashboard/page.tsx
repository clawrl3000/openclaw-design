import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { DashboardContent } from "@/components/dashboard-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Dashboard — OpenClaw Marketplace",
  description: "View your purchased skills and download history",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/dashboard");
  }

  return <DashboardContent user={session.user} />;
}