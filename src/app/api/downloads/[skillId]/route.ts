import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { db } from "@/db";
import { purchases, skills, skill_versions } from "@/db/schema";
import { eq, and } from "drizzle-orm";

/**
 * GET /api/downloads/[skillId]
 * Download a purchased skill bundle (SKILL.md + assets)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ skillId: string }> }
) {
  try {
    // Get the authenticated user session
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { skillId } = await params;

    // Check if the user has purchased this skill
    const [purchase] = await db
      .select({
        purchase: purchases,
        skill: skills,
      })
      .from(purchases)
      .innerJoin(skills, eq(purchases.skill_id, skills.id))
      .where(
        and(
          eq(purchases.user_id, session.user.id),
          eq(purchases.skill_id, skillId),
          eq(purchases.status, "completed")
        )
      )
      .limit(1);

    if (!purchase) {
      return NextResponse.json(
        { error: "You have not purchased this skill or the purchase is not complete" },
        { status: 403 }
      );
    }

    // Get the latest version of the skill
    const [latestVersion] = await db
      .select()
      .from(skill_versions)
      .where(eq(skill_versions.skill_id, skillId))
      .orderBy(skill_versions.created_at)
      .limit(1);

    if (!latestVersion || !latestVersion.bundle_url) {
      return NextResponse.json(
        { error: "Skill bundle not available" },
        { status: 404 }
      );
    }

    // If the bundle_url is a local file path, serve the file directly
    if (latestVersion.bundle_url.startsWith("/") || latestVersion.bundle_url.startsWith("file://")) {
      // For development, we'll return the bundle URL for now
      // In production, you'd want to stream the file content
      return NextResponse.json({
        skill: purchase.skill,
        version: latestVersion,
        downloadUrl: latestVersion.bundle_url,
        message: "File ready for download"
      });
    }

    // If it's a URL, redirect to it
    return NextResponse.redirect(latestVersion.bundle_url);

  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to process download" },
      { status: 500 }
    );
  }
}