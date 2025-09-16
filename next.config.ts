import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Принудительное обновление кэша для разработки
  generateEtags: false,
  poweredByHeader: false,
};

export default nextConfig;
