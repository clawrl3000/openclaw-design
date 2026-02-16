import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { purchases, skills, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { inviteCollaborator, checkRepoExists } from "@/lib/github";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(req: NextRequest) {
  // Read raw body for signature verification
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};
    const userId = metadata.user_id;
    const skillIds = metadata.skill_ids?.split(",").filter(Boolean) || [];

    if (!userId) {
      console.error("No user_id in session metadata:", session.id);
      return NextResponse.json({ received: true });
    }

    if (skillIds.length === 0) {
      console.error("No skill_ids in session metadata:", session.id);
      return NextResponse.json({ received: true });
    }

    console.log(
      `[Webhook] Processing purchase for user ${userId}: ${skillIds.join(", ")}`
    );

    try {
      // Get the payment intent to access its ID
      const paymentIntentId = session.payment_intent as string;

      // Get user details to check for GitHub username
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      // Create purchase records for each skill
      for (const skillId of skillIds) {
        // Get skill details to determine price and currency
        const [skill] = await db
          .select()
          .from(skills)
          .where(eq(skills.id, skillId))
          .limit(1);

        if (!skill) {
          console.error(`[Webhook] Unknown skill ID: ${skillId}`);
          continue;
        }

        let githubInviteStatus = 'not_sent';

        // Attempt to send GitHub invitation if user has GitHub username and skill has a repo
        if (user?.github_username && skill.github_repo) {
          console.log(`[Webhook] Attempting GitHub invite for ${user.github_username} to ${skill.github_repo}`);
          
          try {
            // Check if repo exists first
            const repoExists = await checkRepoExists(skill.github_repo);
            if (!repoExists) {
              console.error(`[Webhook] Repository ${skill.github_repo} does not exist`);
              githubInviteStatus = 'failed';
            } else {
              // Send the invitation
              const inviteResult = await inviteCollaborator(skill.github_repo, user.github_username);
              
              if (inviteResult.success) {
                githubInviteStatus = 'sent';
                console.log(`[Webhook] GitHub invitation sent successfully for ${skill.name}`);
              } else {
                githubInviteStatus = 'failed';
                console.error(`[Webhook] Failed to send GitHub invitation: ${inviteResult.error}`);
              }
            }
          } catch (error) {
            console.error(`[Webhook] Error sending GitHub invitation:`, error);
            githubInviteStatus = 'failed';
          }
        } else if (!user?.github_username) {
          console.log(`[Webhook] No GitHub username for user ${userId}, invitation not sent`);
        } else if (!skill.github_repo) {
          console.log(`[Webhook] No GitHub repo configured for skill ${skill.name}`);
        }

        // Create purchase record
        await db.insert(purchases).values({
          user_id: userId,
          skill_id: skillId,
          stripe_payment_intent_id: paymentIntentId,
          amount_cents: skill.price_cents,
          currency: skill.currency,
          status: "completed",
          github_invite_status: githubInviteStatus,
          purchased_at: new Date(),
        });

        console.log(
          `[Webhook] Created purchase record for user ${userId}, skill ${skill.name}, invite status: ${githubInviteStatus}`
        );
      }

      // Update the user's Stripe customer ID if not already set
      if (session.customer && typeof session.customer === 'string') {
        await db
          .update(users)
          .set({ stripe_customer_id: session.customer })
          .where(eq(users.id, userId));
      }

      console.log(`[Webhook] Purchase processing completed for session ${session.id}`);
    } catch (error) {
      console.error(`[Webhook] Error processing purchase:`, error);
      // Don't return error response - we still want to acknowledge the webhook
    }
  }

  // Handle the payment_intent.succeeded event for status updates
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const metadata = paymentIntent.metadata || {};
    const userId = metadata.user_id;
    const skillIds = metadata.skill_ids?.split(",").filter(Boolean) || [];

    if (userId && skillIds.length > 0) {
      try {
        // Update purchase status to completed
        for (const skillId of skillIds) {
          await db
            .update(purchases)
            .set({ status: "completed" })
            .where(eq(purchases.stripe_payment_intent_id, paymentIntent.id));
        }

        console.log(
          `[Webhook] Updated purchase status to completed for payment intent ${paymentIntent.id}`
        );
      } catch (error) {
        console.error(`[Webhook] Error updating purchase status:`, error);
      }
    }
  }

  return NextResponse.json({ received: true });
}
