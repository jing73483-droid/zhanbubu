import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? "/zhanbubu" : undefined,
  assetPrefix: isGithubPages ? "/zhanbubu/" : undefined,
};

export default nextConfig;
