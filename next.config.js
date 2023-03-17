/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [
      "prisma",
      "@prisma/client",
      "next-auth/client",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3h42dhdxazsqn.cloudfront.net",
        port: "",
        pathname: "/*",
      },
    ],
    domains: ["d3h42dhdxazsqn.cloudfront.net"],
  },
};

module.exports = nextConfig;
