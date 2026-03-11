import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  generateEtags: false,
  poweredByHeader: false,
  experimental: {
    devtoolSegmentExplorer: false,
  },
};

export default nextConfig;
