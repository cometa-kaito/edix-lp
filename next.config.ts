import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /docs/ は学校へ個別にお送りする書類（推測されないパス）。検索に出さない
  async headers() {
    return [
      {
        source: "/docs/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
