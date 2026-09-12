import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co", pathname: "/image/**" },
    ],
  },
  onDemandEntries: { maxInactiveAge: 5 * 60 * 1000, pagesBufferLength: 25 },
};
export default nextConfig;
