import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSkillBySlug } from "@/data/skills";

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
    const githubUsername = metadata.github_username || "";
    const slugs = metadata.skill_slugs?.split(",").filter(Boolean) || [];

    const skills = slugs
      .map((slug) => {
        const skill = getSkillBySlug(slug);
        if (!skill) return null;
        return {
          name: skill.name,
          slug: skill.slug,
          githubRepo: skill.githubRepo,
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      githubUsername,
      skills,
      customerEmail: session.customer_details?.email || null,
      paymentStatus: session.payment_status,
    });
  } catch (err) {
    console.error("Session fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
