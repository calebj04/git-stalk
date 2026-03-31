import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "obaibvkdhpmrjqoxcczs.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;