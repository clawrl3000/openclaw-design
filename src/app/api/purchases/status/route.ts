import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { db } from "@/db";
import { purchases, skills } from "@/db/schema";
import { eq, and } from "drizzle-orm";

const GITHUB_OWNER = "openclaw-design";

/**
 * GET /api/purchases/status?skill_ids=id1,id2
 * Check if the user is a collaborator on each purchased skill's repo.
 * Used by the success page to detect when invites have been accepted.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Auth required" }, { status: 401 });
    }

    const skillIds = req.nextUrl.searchParams.get("skill_ids")?.split(",").filter(Boolean) || [];
    if (skillIds.length === 0) {
      return NextResponse.json({ error: "Missing skill_ids" }, { status: 400 });
    }

    const githubPat = process.env.GITHUB_PAT;
    if (!githubPat) {
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    // Get the user's GitHub username
    const userPurchases = await db
      .select({ skill: skills, purchase: purchases })
      .from(purchases)
      .innerJoin(skills, eq(purchases.skill_id, skills.id))
      .where(
        and(
          eq(purchases.user_id, session.user.id),
          eq(purchases.status, "completed")
        )
      );

    // Get GitHub username from session
    const githubUsername = (session.user as Record<string, unknown>).githubUsername as string | undefined;
    if (!githubUsername) {
      return NextResponse.json({
        results: skillIds.map(id => ({ skill_id: id, accepted: false })),
      });
    }

    const results = await Promise.all(
      skillIds.map(async (skillId) => {
        const match = userPurchases.find(p => p.skill.id === skillId);
        if (!match?.skill.github_repo) {
          return { skill_id: skillId, accepted: false };
        }

        // Check if user is a collaborator (204 = yes, 404 = no)
        try {
          const res = await fetch(
            `https://api.github.com/repos/${GITHUB_OWNER}/${match.skill.github_repo}/collaborators/${githubUsername}`,
            {
              headers: {
                Authorization: `token ${githubPat}`,
                Accept: "application/vnd.github.v3+json",
              },
            }
          );
          return { skill_id: skillId, accepted: res.status === 204 };
        } catch {
          return { skill_id: skillId, accepted: false };
        }
      })
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("[PurchaseStatus] Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
