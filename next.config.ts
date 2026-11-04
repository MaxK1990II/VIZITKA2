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
    // Locale-specific root documents need a standalone static 404 page.
    globalNotFound: true,
    devtoolSegmentExplorer: false,
  },
};

export default nextConfig;
