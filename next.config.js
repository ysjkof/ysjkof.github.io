/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== "production";
const GITHUB_REPOSITORY_NAME = "ysjkof.github.io";

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: !debug ? `/${GITHUB_REPOSITORY_NAME}/` : "",
};

module.exports = nextConfig;
