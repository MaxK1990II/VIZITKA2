import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  generateEtags: false,
  poweredByHeader: false,
  experimental: {
    devtoolSegmentExplorer: false,
  },
};

export default nextConfig;
