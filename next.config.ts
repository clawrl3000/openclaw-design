import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/how-openclaw-works",
        destination: "/learn/how-openclaw-works",
        permanent: true,
      },
      {
        source: "/lessons-from-210-hours",
        destination: "/learn/lessons-from-210-hours",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
