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
        hostname: "www.poblanocloud.com",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "d3h42dhdxazsqn.cloudfront.net",
        port: "",
        pathname: "/*",
      },
    ],
  },
};

module.exports = nextConfig;
