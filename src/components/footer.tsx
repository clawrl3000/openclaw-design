import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#1E1510] bg-[#0C0805]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <span className="font-mono font-bold text-lg text-white">
              OpenClaw
            </span>
            <p className="mt-3 text-sm text-white/40 leading-relaxed max-w-xs">
              Premium AI agent skills. Tested, documented, and ready to install.
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="font-mono text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">
              Marketplace
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/skills"
                  className="text-sm text-white/40 hover:text-white/80 transition-colors"
                >
                  Browse Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/40 hover:text-white/80 transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-mono text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/openclaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 hover:text-white/80 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/openclaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 hover:text-white/80 transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-mono text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-white/40 hover:text-white/80 transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-white/40 hover:text-white/80 transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/refunds"
                  className="text-sm text-white/40 hover:text-white/80 transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1E1510] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} OpenClaw. All rights reserved.
          </p>
          <p className="text-xs text-white/20 font-mono">openclaw.design</p>
        </div>
      </div>
    </footer>
  );
}
