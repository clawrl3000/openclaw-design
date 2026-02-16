import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { purchases, skills } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

// GET /api/reviews/check-purchase?skillId=xxx or ?skillSlug=xxx
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ purchased: false });
  }

  let skillId = req.nextUrl.searchParams.get("skillId");
  if (!skillId) {
    const slug = req.nextUrl.searchParams.get("skillSlug");
    if (!slug) return NextResponse.json({ purchased: false });
    const [skill] = await db.select({ id: skills.id }).from(skills).where(eq(skills.slug, slug)).limit(1);
    skillId = skill?.id ?? null;
  }
  if (!skillId) {
    return NextResponse.json({ purchased: false });
  }

  try {
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

    return NextResponse.json({ purchased: !!purchase });
  } catch {
    return NextResponse.json({ purchased: false });
  }
}
