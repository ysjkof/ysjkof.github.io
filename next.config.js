/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== "production";
const GITHUB_REPOSITORY_NAME = "ysjkof.github.io";

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: !debug ? `/${GITHUB_REPOSITORY_NAME}/` : "",
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    return config;
  },
};

module.exports = nextConfig;
