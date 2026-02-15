import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSkillBySlug } from "@/data/skills";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

interface CheckoutItem {
  slug: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, githubUsername } = body as {
      items: CheckoutItem[];
      githubUsername: string;
    };

    // Validate input
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items provided" },
        { status: 400 }
      );
    }

    if (!githubUsername || githubUsername.trim().length === 0) {
      return NextResponse.json(
        { error: "GitHub username is required" },
        { status: 400 }
      );
    }

    // Resolve items to skills and build line_items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const slugs: string[] = [];

    for (const item of items) {
      const skill = getSkillBySlug(item.slug);
      if (!skill) {
        return NextResponse.json(
          { error: `Unknown skill: ${item.slug}` },
          { status: 400 }
        );
      }
      slugs.push(skill.slug);
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: skill.name,
            description: skill.tagline,
          },
          unit_amount: Math.round(skill.priceNum * 100), // cents
        },
        quantity: 1,
      });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Create Stripe Checkout Session
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      metadata: {
        github_username: githubUsername.trim(),
        skill_slugs: slugs.join(","),
      },
      success_url: `${siteUrl}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
