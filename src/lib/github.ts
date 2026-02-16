/**
 * GitHub API utilities for managing repository collaborators
 * Used to invite purchasers to private skill repositories on the openclaw-design account
 */

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_OWNER = 'openclaw-design'; // GitHub organization/user that owns the skill repos

interface GitHubCollaboratorResponse {
  id: number;
  login: string;
  email?: string;
  permissions: {
    read: boolean;
    write: boolean;
    admin: boolean;
  };
}

interface GitHubInvitationResponse {
  id: number;
  login: string;
  email?: string;
  permissions: string;
  created_at: string;
}

export interface GitHubInviteResult {
  success: boolean;
  error?: string;
  invitation?: GitHubInvitationResponse;
}

/**
 * Get GitHub API headers with authentication
 */
function getGitHubHeaders() {
  const token = process.env.GITHUB_PAT;
  if (!token) {
    throw new Error('GITHUB_PAT environment variable not set');
  }

  return {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'OpenClaw-Marketplace/1.0',
  };
}

/**
 * Check if a repository exists
 */
export async function checkRepoExists(repoName: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_OWNER}/${repoName}`,
      {
        method: 'GET',
        headers: getGitHubHeaders(),
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error(`Error checking repo ${repoName}:`, error);
    return false;
  }
}

/**
 * Invite a user as a collaborator to a repository with read access
 */
export async function inviteCollaborator(
  repoName: string,
  username: string
): Promise<GitHubInviteResult> {
  try {
    const headers = getGitHubHeaders();

    // First, check if the user is already a collaborator
    const existingResponse = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_OWNER}/${repoName}/collaborators/${username}`,
      {
        method: 'GET',
        headers,
      }
    );

    if (existingResponse.status === 204) {
      return {
        success: true,
        error: `User ${username} is already a collaborator on ${repoName}`,
      };
    }

    // Check if there's a pending invitation
    const invitationsResponse = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_OWNER}/${repoName}/invitations`,
      {
        method: 'GET',
        headers,
      }
    );

    if (invitationsResponse.ok) {
      const invitations: GitHubInvitationResponse[] = await invitationsResponse.json();
      const existingInvite = invitations.find(inv => inv.login === username);
      
      if (existingInvite) {
        return {
          success: true,
          error: `Invitation already pending for ${username} on ${repoName}`,
          invitation: existingInvite,
        };
      }
    }

    // Send new invitation with read-only access
    const inviteResponse = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_OWNER}/${repoName}/collaborators/${username}`,
      {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          permission: 'pull', // Read-only access
        }),
      }
    );

    if (inviteResponse.status === 201) {
      // Invitation sent successfully
      const invitation = await inviteResponse.json();
      return {
        success: true,
        invitation,
      };
    } else if (inviteResponse.status === 204) {
      // User was added as collaborator directly (happens if they're a member of the org)
      return {
        success: true,
        error: `User ${username} was added directly as a collaborator`,
      };
    } else {
      const errorData = await inviteResponse.json().catch(() => null);
      return {
        success: false,
        error: errorData?.message || `GitHub API error: ${inviteResponse.status}`,
      };
    }
  } catch (error) {
    console.error(`Error inviting ${username} to ${repoName}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * List all collaborators for a repository
 */
export async function listCollaborators(repoName: string): Promise<GitHubCollaboratorResponse[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_OWNER}/${repoName}/collaborators`,
      {
        method: 'GET',
        headers: getGitHubHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error listing collaborators for ${repoName}:`, error);
    return [];
  }
}

/**
 * List pending invitations for a repository
 */
export async function listInvitations(repoName: string): Promise<GitHubInvitationResponse[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_OWNER}/${repoName}/invitations`,
      {
        method: 'GET',
        headers: getGitHubHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error listing invitations for ${repoName}:`, error);
    return [];
  }
}

/**
 * Get the GitHub repository URL for a skill
 */
export function getRepoUrl(repoName: string): string {
  return `https://github.com/${GITHUB_OWNER}/${repoName}`;
}

/**
 * Validate if a GitHub username exists
 */
export async function validateGitHubUsername(username: string): Promise<boolean> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      method: 'GET',
      headers: getGitHubHeaders(),
    });
    return response.status === 200;
  } catch (error) {
    console.error(`Error validating username ${username}:`, error);
    return false;
  }
}