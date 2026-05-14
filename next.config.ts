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
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid webpack dev cache pointing at removed chunks (`Cannot find module './447.js'`)
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
