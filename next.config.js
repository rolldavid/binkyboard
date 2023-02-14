/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.poblanocloud.com",
        port: "",
        pathname: "/*",
      },
    ],
  },
};

module.exports = nextConfig;
