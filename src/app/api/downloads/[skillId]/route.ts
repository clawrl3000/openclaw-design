import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { db } from "@/db";
import { purchases, skills } from "@/db/schema";
import { eq, and } from "drizzle-orm";

const GITHUB_OWNER = "openclaw-design";

/**
 * GET /api/downloads/[skillId]
 * Download a purchased skill as a ZIP.
 * Verifies purchase via session, fetches from GitHub with server-side PAT.
 * Buyer needs no git auth — just clicks the download button.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ skillId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required. Please sign in first." },
        { status: 401 }
      );
    }

    const { skillId } = await params;

    // Verify purchase
    const [purchase] = await db
      .select({ purchase: purchases, skill: skills })
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
        { error: "Purchase not found" },
        { status: 403 }
      );
    }

    const repoName = purchase.skill.github_repo;
    if (!repoName) {
      return NextResponse.json(
        { error: "Download not available for this skill yet" },
        { status: 404 }
      );
    }

    const githubPat = process.env.GITHUB_PAT;
    if (!githubPat) {
      console.error("[Download] GITHUB_PAT not configured");
      return NextResponse.json(
        { error: "Download service error" },
        { status: 500 }
      );
    }

    // Fetch repo zip from GitHub
    const zipUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${repoName}/zipball/main`;
    const ghResponse = await fetch(zipUrl, {
      headers: {
        Authorization: `token ${githubPat}`,
        Accept: "application/vnd.github.v3+json",
      },
      redirect: "follow",
    });

    if (!ghResponse.ok) {
      console.error(`[Download] GitHub error: ${ghResponse.status} for ${repoName}`);
      return NextResponse.json(
        { error: "Failed to fetch skill files from repository" },
        { status: 502 }
      );
    }

    const zipBuffer = await ghResponse.arrayBuffer();
    const filename = `${purchase.skill.slug}.zip`;

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": zipBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("[Download] Error:", error);
    return NextResponse.json(
      { error: "Download failed" },
      { status: 500 }
    );
  }
}
