import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
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

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Create Stripe Checkout Session for subscription
    const stripeSession = await getStripe().checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_COMMUNITY_PRICE_ID || "price_1T1WdiA1Q0bjxXUQLBHJYn0C",
          quantity: 1,
        },
      ],
      customer_email: session.user.email || undefined,
      metadata: {
        user_id: session.user.id,
        product_type: "community",
      },
      subscription_data: {
        metadata: {
          user_id: session.user.id,
          product_type: "community",
        },
      },
      success_url: `${siteUrl}/community/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/community`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (err) {
    console.error("Community checkout error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}