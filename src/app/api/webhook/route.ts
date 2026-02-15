import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSkillBySlug } from "@/data/skills";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

/**
 * Invite a GitHub user as a read-only collaborator on a private repo.
 * Uses the GitHub REST API with a Personal Access Token.
 */
async function inviteToRepo(
  githubUsername: string,
  ownerRepo: string
): Promise<{ ok: boolean; status: number; body: string }> {
  const [owner, repo] = ownerRepo.split("/");
  const url = `https://api.github.com/repos/${owner}/${repo}/collaborators/${githubUsername}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_PAT}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({ permission: "pull" }),
  });

  const body = await res.text();
  return { ok: res.ok, status: res.status, body };
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
    const githubUsername = metadata.github_username;
    const skillSlugs = metadata.skill_slugs?.split(",").filter(Boolean) || [];

    if (!githubUsername) {
      console.error("No github_username in session metadata:", session.id);
      return NextResponse.json({ received: true });
    }

    console.log(
      `[Webhook] Processing purchase for @${githubUsername}: ${skillSlugs.join(", ")}`
    );

    // Invite buyer to each purchased skill's private repo
    for (const slug of skillSlugs) {
      const skill = getSkillBySlug(slug);
      if (!skill) {
        console.error(`[Webhook] Unknown skill slug: ${slug}`);
        continue;
      }

      const result = await inviteToRepo(githubUsername, skill.githubRepo);

      if (result.ok || result.status === 204) {
        console.log(
          `[Webhook] Invited @${githubUsername} to ${skill.githubRepo}`
        );
      } else {
        console.error(
          `[Webhook] Failed to invite @${githubUsername} to ${skill.githubRepo}: ${result.status} ${result.body}`
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
