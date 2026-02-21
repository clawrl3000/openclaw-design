import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { skills } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

interface CheckoutItem {
  slug?: string;
  skillId?: string;
}

export async function POST(req: NextRequest) {
  try {
    // Get the authenticated user session
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { items } = body as {
      items: CheckoutItem[];
    };

    // Validate input
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items provided" },
        { status: 400 }
      );
    }

    // Resolve items to skills from database and build line_items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const skillIds: string[] = [];

    for (const item of items) {
      // Support lookup by slug or skillId
      let skill;
      if (item.slug) {
        [skill] = await db
          .select()
          .from(skills)
          .where(eq(skills.slug, item.slug))
          .limit(1);
      } else if (item.skillId) {
        [skill] = await db
          .select()
          .from(skills)
          .where(eq(skills.id, item.skillId))
          .limit(1);
      }

      if (!skill) {
        return NextResponse.json(
          { error: `Unknown skill: ${item.slug || item.skillId}` },
          { status: 400 }
        );
      }

      // Only allow purchasing published skills
      if (!skill.published) {
        return NextResponse.json(
          { error: `Skill ${skill.name} is not available for purchase` },
          { status: 400 }
        );
      }

      skillIds.push(skill.id);
      lineItems.push({
        price_data: {
          currency: skill.currency.toLowerCase(),
          product_data: {
            name: skill.name,
            description: skill.tagline,
            images: skill.hero_image_url ? [skill.hero_image_url] : undefined,
          },
          unit_amount: skill.price_cents,
        },
        quantity: 1,
      });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Create Stripe Checkout Session
    const stripeSession = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_email: session.user.email || undefined,
      metadata: {
        user_id: session.user.id,
        skill_ids: skillIds.join(","),
      },
      success_url: `${siteUrl}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/browse`,
      payment_intent_data: {
        metadata: {
          user_id: session.user.id,
          skill_ids: skillIds.join(","),
        },
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (err) {
    console.error("Checkout error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
