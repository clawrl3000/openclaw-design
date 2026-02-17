import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Welcome to OpenClaw Community | Discord Access",
  description: "Welcome to the OpenClaw Community! Your Discord invite link and next steps.",
  robots: { index: false, follow: false },
};

export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
