import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

export default nextConfig;
