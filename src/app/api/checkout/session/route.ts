import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { skills } from "@/db/schema";
import { eq } from "drizzle-orm";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

/**
 * GET /api/checkout/session?session_id=cs_xxx
 * Returns session metadata so the success page can show what was purchased.
 */
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Missing session_id" },
      { status: 400 }
    );
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    const metadata = session.metadata || {};
    const userId = metadata.user_id || "";
    const skillIds = metadata.skill_ids?.split(",").filter(Boolean) || [];

    // Fetch skill details from database
    const purchasedSkills = [];
    for (const skillId of skillIds) {
      const [skill] = await db
        .select()
        .from(skills)
        .where(eq(skills.id, skillId))
        .limit(1);

      if (skill) {
        purchasedSkills.push({
          id: skill.id,
          name: skill.name,
          slug: skill.slug,
          price_cents: skill.price_cents,
          currency: skill.currency,
          github_repo: skill.github_repo,
        });
      }
    }

    return NextResponse.json({
      userId,
      skills: purchasedSkills,
      customerEmail: session.customer_details?.email || null,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  } catch (err) {
    console.error("Session fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
