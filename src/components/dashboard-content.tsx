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
interface Purchase {
  id: string;
  skill: {
    id: string;
    name: string;
    slug: string;
    hero_image_url?: string;
    category: string;
  };
  amount_cents: number;
  currency: string;
  status: string;
  purchased_at: string;
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
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from your API
    // For now, simulate some purchase data
    const mockPurchases: Purchase[] = [
      {
        id: "1",
        skill: {
          id: "skill-1",
          name: "Clawshi",
          slug: "kalshi-prediction-markets",
          hero_image_url: "/images/kalshi-hero.png",
          category: "Trading"
        },
        amount_cents: 900,
        currency: "USD",
        status: "completed",
        purchased_at: "2024-02-10T15:30:00Z"
      },
      {
        id: "2", 
        skill: {
          id: "skill-2",
          name: "Email Dominator",
          slug: "email-dominator",
          hero_image_url: "/images/email-hero.png",
          category: "Productivity"
        },
        amount_cents: 700,
        currency: "USD",
        status: "completed",
        purchased_at: "2024-02-08T10:15:00Z"
      }
    ];

    // Simulate API delay
    setTimeout(() => {
      setPurchases(mockPurchases);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleDownload = async (skillId: string, skillSlug: string) => {
    setDownloadingId(skillId);
    
    try {
      // In a real app, this would hit your download API endpoint
      const response = await fetch(`/api/downloads/${skillId}`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${skillSlug}.skill`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Download failed');
      }
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setDownloadingId(null);
    }
  };

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

  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.amount_cents, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your purchased skills and downloads
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
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 mb-8">
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

        {/* Purchase History */}
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
          <CardHeader className="pb-0">
            <h2 className="text-xl font-semibold text-white">Purchase History</h2>
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
                  <TableColumn>STATUS</TableColumn>
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
                        <Chip 
                          size="sm"
                          color={purchase.status === 'completed' ? 'success' : 'warning'}
                          variant="flat"
                        >
                          {purchase.status}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                          startContent={<ArrowDownTrayIcon className="h-4 w-4" />}
                          isLoading={downloadingId === purchase.skill.id}
                          onPress={() => handleDownload(purchase.skill.id, purchase.skill.slug)}
                          isDisabled={purchase.status !== 'completed'}
                        >
                          {downloadingId === purchase.skill.id ? 'Downloading...' : 'Download'}
                        </Button>
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