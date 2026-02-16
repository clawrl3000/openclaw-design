import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { reviews, purchases, users, skills } from "@/db/schema";
import { eq, and, avg, count, desc } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

async function resolveSkillId(params: URLSearchParams): Promise<string | null> {
  const id = params.get("skillId");
  if (id) return id;
  const slug = params.get("skillSlug");
  if (!slug) return null;
  const [skill] = await db.select({ id: skills.id }).from(skills).where(eq(skills.slug, slug)).limit(1);
  return skill?.id ?? null;
}

// GET /api/reviews?skillId=xxx or ?skillSlug=xxx
export async function GET(req: NextRequest) {
  const skillId = await resolveSkillId(req.nextUrl.searchParams);
  if (!skillId) {
    return NextResponse.json({ error: "skillId or skillSlug required" }, { status: 400 });
  }

  try {
    // Get reviews with user info
    const reviewRows = await db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        body: reviews.body,
        createdAt: reviews.created_at,
        userName: users.name,
        userImage: users.image,
        userId: reviews.user_id,
      })
      .from(reviews)
      .innerJoin(users, eq(reviews.user_id, users.id))
      .where(eq(reviews.skill_id, skillId))
      .orderBy(desc(reviews.created_at));

    // Get aggregates
    const [agg] = await db
      .select({
        avgRating: avg(reviews.rating),
        reviewCount: count(reviews.id),
      })
      .from(reviews)
      .where(eq(reviews.skill_id, skillId));

    return NextResponse.json({
      reviews: reviewRows,
      avgRating: agg?.avgRating ? parseFloat(agg.avgRating) : null,
      reviewCount: agg?.reviewCount ?? 0,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// POST /api/reviews
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const { skillId: rawSkillId, skillSlug, rating, body } = await req.json();

    // Resolve skill ID from either skillId or skillSlug
    let skillId = rawSkillId;
    if (!skillId && skillSlug) {
      const [skill] = await db.select({ id: skills.id }).from(skills).where(eq(skills.slug, skillSlug)).limit(1);
      skillId = skill?.id;
    }

    if (!skillId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "skillId/skillSlug and rating (1-5) required" },
        { status: 400 }
      );
    }

    // Verify user purchased this skill
    const [purchase] = await db
      .select()
      .from(purchases)
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
        { error: "You must purchase this skill before reviewing" },
        { status: 403 }
      );
    }

    // Check for existing review (upsert)
    const [existing] = await db
      .select()
      .from(reviews)
      .where(
        and(
          eq(reviews.user_id, session.user.id),
          eq(reviews.skill_id, skillId)
        )
      )
      .limit(1);

    let review;
    if (existing) {
      // Update existing
      const [updated] = await db
        .update(reviews)
        .set({
          rating: Math.round(rating),
          body: body?.trim() || null,
        })
        .where(eq(reviews.id, existing.id))
        .returning();
      review = updated;
    } else {
      // Create new
      const [created] = await db
        .insert(reviews)
        .values({
          user_id: session.user.id,
          skill_id: skillId,
          rating: Math.round(rating),
          body: body?.trim() || null,
        })
        .returning();
      review = created;
    }

    return NextResponse.json({ review });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// DELETE /api/reviews?id=xxx
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const reviewId = req.nextUrl.searchParams.get("id");
  if (!reviewId) {
    return NextResponse.json({ error: "Review id required" }, { status: 400 });
  }

  try {
    // Verify ownership
    const [existing] = await db
      .select()
      .from(reviews)
      .where(
        and(
          eq(reviews.id, reviewId),
          eq(reviews.user_id, session.user.id)
        )
      )
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    await db.delete(reviews).where(eq(reviews.id, reviewId));

    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
