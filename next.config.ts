import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/games", destination: "/cooking", permanent: true }];
  },
  /** Keep compiled route modules in memory longer to avoid flaky `/_next/static/*` 404s in dev. */
  onDemandEntries: {
    maxInactiveAge: 5 * 60 * 1000,
    pagesBufferLength: 25,
  },
};

export default nextConfig;
