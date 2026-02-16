import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { db } from "@/db";
import { users, purchases, skills } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { validateGitHubUsername, inviteCollaborator, checkRepoExists } from "@/lib/github";

/**
 * PUT /api/user/github
 * Update user's GitHub username and send pending repo invitations
 */
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { github_username } = await req.json();

    if (!github_username || typeof github_username !== 'string') {
      return NextResponse.json(
        { error: "GitHub username is required" },
        { status: 400 }
      );
    }

    // Validate the GitHub username format (basic validation)
    const usernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
    if (!usernameRegex.test(github_username)) {
      return NextResponse.json(
        { error: "Invalid GitHub username format" },
        { status: 400 }
      );
    }

    // Validate that the GitHub username exists (optional - can be skipped for performance)
    const isValidUsername = await validateGitHubUsername(github_username);
    if (!isValidUsername) {
      return NextResponse.json(
        { error: "GitHub username does not exist" },
        { status: 400 }
      );
    }

    // Update the user's GitHub username
    await db
      .update(users)
      .set({ github_username })
      .where(eq(users.id, session.user.id));

    // Find all completed purchases for this user where GitHub invites haven't been sent
    const purchasesNeedingInvites = await db
      .select({
        purchase: purchases,
        skill: skills,
      })
      .from(purchases)
      .innerJoin(skills, eq(purchases.skill_id, skills.id))
      .where(
        and(
          eq(purchases.user_id, session.user.id),
          eq(purchases.status, 'completed'),
          eq(purchases.github_invite_status, 'not_sent')
        )
      );

    const inviteResults: Array<{
      skillName: string;
      repoName: string | null;
      success: boolean;
      error?: string;
    }> = [];

    // Send GitHub invitations for each purchase
    for (const { purchase, skill } of purchasesNeedingInvites) {
      if (!skill.github_repo) {
        // Skip skills without a GitHub repo configured
        continue;
      }

      let githubInviteStatus = 'not_sent';
      let inviteError: string | undefined;

      try {
        // Check if repo exists
        const repoExists = await checkRepoExists(skill.github_repo);
        if (!repoExists) {
          githubInviteStatus = 'failed';
          inviteError = `Repository ${skill.github_repo} does not exist`;
        } else {
          // Send the invitation
          const inviteResult = await inviteCollaborator(skill.github_repo, github_username);
          
          if (inviteResult.success) {
            githubInviteStatus = 'sent';
          } else {
            githubInviteStatus = 'failed';
            inviteError = inviteResult.error;
          }
        }
      } catch (error) {
        githubInviteStatus = 'failed';
        inviteError = error instanceof Error ? error.message : 'Unknown error';
      }

      // Update the purchase record with the invite status
      await db
        .update(purchases)
        .set({ github_invite_status: githubInviteStatus })
        .where(eq(purchases.id, purchase.id));

      inviteResults.push({
        skillName: skill.name,
        repoName: skill.github_repo,
        success: githubInviteStatus === 'sent',
        error: inviteError,
      });
    }

    return NextResponse.json({
      message: "GitHub username updated successfully",
      github_username,
      invitations_sent: inviteResults.filter(r => r.success).length,
      invitations_failed: inviteResults.filter(r => !r.success).length,
      results: inviteResults,
    });

  } catch (error) {
    console.error("GitHub username update error:", error);
    return NextResponse.json(
      { error: "Failed to update GitHub username" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/user/github
 * Get user's current GitHub username
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

    const [user] = await db
      .select({ github_username: users.github_username })
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    return NextResponse.json({
      github_username: user?.github_username || null,
    });

  } catch (error) {
    console.error("GitHub username fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub username" },
      { status: 500 }
    );
  }
}