import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "obaibvkdhpmrjqoxcczs.supabase.co",
    ],
  },
};

export default nextConfig;
