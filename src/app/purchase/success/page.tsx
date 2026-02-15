import { SuccessContent } from "@/components/success-content";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Purchase Complete — OpenClaw Marketplace",
  description: "Your skills are ready. Check your email for GitHub repo invitations.",
  robots: { index: false, follow: false },
};

function SuccessLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin w-8 h-8 border-2 border-[#FF4D4D]/30 border-t-[#FF4D4D] rounded-full mx-auto" />
        <p className="font-mono text-sm text-white/40">
          Loading purchase details…
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessLoading />}>
      <SuccessContent />
    </Suspense>
  );
}
