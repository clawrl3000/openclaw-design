"use client";

import { Card, CardBody, Button } from "@heroui/react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

function GitHubIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function ClawIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C8 2 4 6 4 10C4 12 5 14 7 15L6 20C6 21 7 22 8 22H16C17 22 18 21 18 20L17 15C19 14 20 12 20 10C20 6 16 2 12 2Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M9 8C9 8 7 4 5 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 8C15 8 17 4 19 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 10C8 10 6 8 4 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 10C16 10 18 8 20 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="12" cy="14" rx="5" ry="6" fill="currentColor" opacity="0.3" />
      <circle cx="10" cy="12" r="1" fill="currentColor" />
      <circle cx="14" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

export default function SignInPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/")
    }
  }, [status, router])

  const handleGitHubSignIn = () => {
    signIn("github", { callbackUrl: "/" })
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (status === "authenticated") {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and header */}
        <div className="text-center mb-8">
          <ClawIcon className="text-[#FF4D4D] w-12 h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white font-mono">
            Welcome to OpenClaw
          </h1>
          <p className="text-white/60 mt-2">
            Sign in to access your purchased skills and more
          </p>
        </div>

        {/* Sign-in card */}
        <Card className="bg-[#110B07] border-white/10">
          <CardBody className="p-6">
            <Button
              onClick={handleGitHubSignIn}
              className="w-full bg-[#1E1510] hover:bg-[#2D221C] text-white border border-white/20 font-mono"
              size="lg"
              startContent={<GitHubIcon />}
            >
              Continue with GitHub
            </Button>

            <div className="mt-4 text-center">
              <p className="text-xs text-white/40">
                By signing in, you agree to our{" "}
                <a href="#" className="text-[#FF4D4D] hover:text-[#F97316] underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#FF4D4D] hover:text-[#F97316] underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-white/60 hover:text-white transition-colors font-mono"
          >
            ← Back to OpenClaw
          </a>
        </div>
      </div>
    </div>
  )
}