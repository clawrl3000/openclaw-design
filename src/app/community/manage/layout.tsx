import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Manage Community Subscription | OpenClaw",
  description: "Manage your OpenClaw Community subscription. Update payment, cancel, or view billing history.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}