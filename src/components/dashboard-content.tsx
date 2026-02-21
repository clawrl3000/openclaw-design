"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Chip,
  Divider,
  Link,
  Spinner
} from "@heroui/react";
// Custom SVG icons to avoid dependency issues
function ArrowDownTrayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}

function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 1.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
interface Purchase {
  id: string;
  skill: {
    id: string;
    name: string;
    slug: string;
    hero_image_url?: string | null;
    category: string;
    github_repo?: string | null;
    github_url?: string | null;
  };
  amount_cents: number;
  currency: string;
  status: string;
  github_invite_status: string | null;
  purchased_at: string;
}

interface UserData {
  github_username: string | null;
  purchases: Purchase[];
  total_spent: number;
}

interface DashboardContentProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function DashboardContent({ user }: DashboardContentProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [githubUsername, setGithubUsername] = useState<string>("");
  const [showGithubForm, setShowGithubForm] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('/api/user/purchases');
        if (response.ok) {
          const data: UserData = await response.json();
          setUserData(data);
          setGithubUsername(data.github_username || "");
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const formatPrice = (cents: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(cents / 100);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  // Handle GitHub username update
  const handleGithubUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUsername.trim()) return;

    setGithubLoading(true);
    try {
      const response = await fetch('/api/user/github', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ github_username: githubUsername }),
      });

      if (response.ok) {
        // Refresh user data
        const updatedResponse = await fetch('/api/user/purchases');
        if (updatedResponse.ok) {
          const data: UserData = await updatedResponse.json();
          setUserData(data);
        }
        setShowGithubForm(false);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update GitHub username');
      }
    } catch (error) {
      alert('Failed to update GitHub username');
    } finally {
      setGithubLoading(false);
    }
  };

  const purchases = userData?.purchases || [];
  const totalSpent = userData?.total_spent || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your purchased skills and GitHub access
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
            <CardBody className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <CreditCardIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Spent</p>
                  <p className="text-2xl font-semibold text-white">
                    {formatPrice(totalSpent, 'USD')}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
            <CardBody className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <ArrowDownTrayIcon className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Skills Owned</p>
                  <p className="text-2xl font-semibold text-white">
                    {purchases.length}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
            <CardBody className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <CalendarIcon className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Member Since</p>
                  <p className="text-2xl font-semibold text-white">
                    Recently
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Account Info */}
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 mb-4">
          <CardHeader className="pb-0">
            <h2 className="text-xl font-semibold text-white">Account Information</h2>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-4 mb-4">
              <Avatar
                src={user.image || undefined}
                name={user.name || 'User'}
                size="lg"
                className="shrink-0"
              />
              <div>
                <p className="text-lg font-medium text-white">{user.name || 'Anonymous User'}</p>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* GitHub Integration */}
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 mb-8">
          <CardHeader className="pb-0">
            <div className="flex items-center gap-3">
              <GitHubIcon className="h-5 w-5 text-gray-300" />
              <h2 className="text-xl font-semibold text-white">GitHub Integration</h2>
            </div>
          </CardHeader>
          <CardBody>
            {userData?.github_username ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">
                    Connected: <span className="text-green-400">@{userData.github_username}</span>
                  </p>
                  <p className="text-gray-400 text-sm">
                    You'll receive repository invitations for purchased skills
                  </p>
                </div>
                <Button
                  color="secondary"
                  variant="flat"
                  size="sm"
                  onPress={() => setShowGithubForm(true)}
                >
                  Change Username
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-300">
                  Connect your GitHub account to get access to private skill repositories
                </p>
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<GitHubIcon className="h-4 w-4" />}
                  onPress={() => setShowGithubForm(true)}
                >
                  Add GitHub Username
                </Button>
              </div>
            )}
            
            {showGithubForm && (
              <form onSubmit={handleGithubUpdate} className="mt-4 space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="GitHub username"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
                    disabled={githubLoading}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    isLoading={githubLoading}
                    isDisabled={!githubUsername.trim()}
                  >
                    {githubLoading ? "Updating..." : "Update"}
                  </Button>
                  <Button
                    color="secondary"
                    variant="flat"
                    onPress={() => setShowGithubForm(false)}
                    isDisabled={githubLoading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </CardBody>
        </Card>

        {/* Installation Guide */}
        {purchases.length > 0 && (
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 mb-8">
            <CardHeader className="pb-0">
              <h2 className="text-xl font-semibold text-white">📚 How to Install Your Skills</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                
                {/* GitHub Method (if user has GitHub) */}
                {userData?.github_username && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                        1
                      </div>
                      <div>
                        <h3 className="text-white font-medium">🎯 Recommended: GitHub Repository Access</h3>
                        <p className="text-gray-400 text-sm">Get source code, updates, and community support</p>
                      </div>
                    </div>
                    
                    <div className="ml-11 space-y-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                      <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                        <li><strong>Check your email</strong> for GitHub repository invitations</li>
                        <li><strong>Accept each invitation</strong> (one per skill you purchased)</li>
                        <li><strong>Visit the repository</strong> — click "Get from GitHub" buttons below</li>
                        <li><strong>Follow the README</strong> — every repo has instant setup instructions</li>
                        <li><strong>Copy SKILL.md</strong> to your agent&apos;s skills/ folder</li>
                        <li><strong>Restart your agent</strong> → Done! 🎉</li>
                      </ol>
                      
                      <div className="bg-emerald-400/10 rounded p-3 mt-3">
                        <p className="text-emerald-300 text-xs">
                          <strong>💡 Pro tip:</strong> GitHub repos get updates automatically. When skills improve, you&apos;ll see the changes!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Install from GitHub */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {userData?.github_username ? "2" : "1"}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">📦 Install from GitHub</h3>
                      <p className="text-gray-400 text-sm">Clone or download from your private repo</p>
                    </div>
                  </div>
                  
                  <div className="ml-11 space-y-3 bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                    <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                      <li><strong>Accept the GitHub invitation</strong> from your email or GitHub notifications</li>
                      <li><strong>Clone the repo</strong> or download as ZIP from GitHub</li>
                      <li><strong>Copy SKILL.md + scripts</strong> to your agent&apos;s skills/ folder</li>
                      <li><strong>Restart your agent</strong></li>
                    </ol>
                    
                    <div className="bg-gray-800 rounded p-3 font-mono text-xs text-green-400">
                      <div className="flex items-center justify-between">
                        <span># Clone and install:</span>
                        <button
                          onClick={() => navigator.clipboard.writeText("git clone https://github.com/openclaw-design/SKILL-NAME.git && cp -r SKILL-NAME/ ~/your-agent/skills/")}
                          className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="mt-1">git clone https://github.com/openclaw-design/SKILL-NAME.git</div>
                      <div>cp -r SKILL-NAME/ ~/your-agent/skills/</div>
                    </div>
                  </div>
                </div>

                {/* Troubleshooting */}
                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                  <h4 className="text-yellow-300 font-medium mb-2">🔧 Need Help?</h4>
                  <ul className="text-yellow-200/80 text-sm space-y-1">
                    <li>• <strong>Can&apos;t find skills folder?</strong> Check your agent&apos;s documentation</li>
                    <li>• <strong>Skill not working?</strong> Make sure SKILL.md is directly in skills/ (not in a subfolder)</li>
                    <li>• <strong>GitHub invite missing?</strong> Check spam folder or update your GitHub username above</li>
                    <li>• <strong>Still stuck?</strong> Visit any GitHub repo and file an issue — we&apos;ll help!</li>
                  </ul>
                </div>

              </div>
            </CardBody>
          </Card>
        )}

        {/* Purchase History */}
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
          <CardHeader className="pb-0">
            <h2 className="text-xl font-semibold text-white">Your Skills</h2>
          </CardHeader>
          <CardBody>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Spinner size="lg" color="primary" />
              </div>
            ) : purchases.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">No purchases yet</p>
                <Button 
                  as={Link}
                  href="/browse"
                  color="primary"
                  variant="flat"
                >
                  Browse Skills
                </Button>
              </div>
            ) : (
              <Table
                aria-label="Purchase history"
                classNames={{
                  wrapper: "bg-transparent shadow-none",
                  th: "bg-gray-800/50 text-gray-300 border-b border-gray-700",
                  td: "border-b border-gray-700/50",
                }}
              >
                <TableHeader>
                  <TableColumn>SKILL</TableColumn>
                  <TableColumn>CATEGORY</TableColumn>
                  <TableColumn>AMOUNT</TableColumn>
                  <TableColumn>DATE</TableColumn>
                  <TableColumn>GITHUB</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {purchases.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={purchase.skill.hero_image_url}
                            name={purchase.skill.name}
                            size="sm"
                            className="shrink-0"
                          />
                          <div>
                            <p className="font-medium text-white">{purchase.skill.name}</p>
                            <Link 
                              href={`/skills/${purchase.skill.slug}`}
                              className="text-sm text-gray-400 hover:text-blue-400"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          size="sm" 
                          variant="flat"
                          color="secondary"
                        >
                          {purchase.skill.category}
                        </Chip>
                      </TableCell>
                      <TableCell className="text-white font-medium">
                        {formatPrice(purchase.amount_cents, purchase.currency)}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {formatDate(purchase.purchased_at)}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {purchase.skill.github_url ? (
                            <>
                              <Link
                                href={purchase.skill.github_url}
                                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                                isExternal
                              >
                                <GitHubIcon className="h-3 w-3" />
                                Repository
                              </Link>
                              <Chip 
                                size="sm"
                                color={
                                  purchase.github_invite_status === 'sent' ? 'success' :
                                  purchase.github_invite_status === 'failed' ? 'danger' :
                                  'warning'
                                }
                                variant="flat"
                                className="text-xs"
                              >
                                {
                                  purchase.github_invite_status === 'sent' ? 'Invited' :
                                  purchase.github_invite_status === 'failed' ? 'Failed' :
                                  'No invite'
                                }
                              </Chip>
                            </>
                          ) : (
                            <span className="text-gray-400 text-sm">No repo</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {purchase.skill.github_url ? (
                            <Button
                              size="sm"
                              color="primary"
                              variant="flat"
                              startContent={<GitHubIcon className="h-4 w-4" />}
                              as={Link}
                              href={purchase.skill.github_url}
                              isExternal
                            >
                              Get from GitHub
                            </Button>
                          ) : (
                            <span className="text-gray-400 text-sm">Pending invite</span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}