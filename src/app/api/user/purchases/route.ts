import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { db } from "@/db";
import { purchases, skills, users } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { getRepoUrl } from "@/lib/github";

export interface PurchaseWithGitHub {
  id: string;
  skill: {
    id: string;
    name: string;
    slug: string;
    hero_image_url?: string | null;
    category: string;
    github_repo?: string | null;
    github_url?: string | null;
  };
  amount_cents: number;
  currency: string;
  status: string;
  github_invite_status: string | null;
  purchased_at: string;
}

/**
 * GET /api/user/purchases
 * Get user's purchase history with GitHub repository information
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get user's GitHub username
    const [user] = await db
      .select({ github_username: users.github_username })
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    // Get user's purchases with skill information
    const userPurchases = await db
      .select({
        purchase: purchases,
        skill: skills,
      })
      .from(purchases)
      .innerJoin(skills, eq(purchases.skill_id, skills.id))
      .where(
        and(
          eq(purchases.user_id, session.user.id),
          eq(purchases.status, 'completed')
        )
      )
      .orderBy(desc(purchases.purchased_at));

    // Transform the data to include GitHub information
    const purchasesWithGitHub: PurchaseWithGitHub[] = userPurchases.map(({ purchase, skill }) => ({
      id: purchase.id,
      skill: {
        id: skill.id,
        name: skill.name,
        slug: skill.slug,
        hero_image_url: skill.hero_image_url,
        category: skill.category,
        github_repo: skill.github_repo,
        github_url: skill.github_repo ? getRepoUrl(skill.github_repo) : null,
      },
      amount_cents: purchase.amount_cents,
      currency: purchase.currency,
      status: purchase.status,
      github_invite_status: purchase.github_invite_status,
      purchased_at: purchase.purchased_at.toISOString(),
    }));

    return NextResponse.json({
      github_username: user?.github_username || null,
      purchases: purchasesWithGitHub,
      total_spent: purchasesWithGitHub.reduce((sum, p) => sum + p.amount_cents, 0),
    });

  } catch (error) {
    console.error("Purchases fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch purchases" },
      { status: 500 }
    );
  }
}