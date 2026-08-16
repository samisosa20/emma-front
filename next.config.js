/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = withPWA({
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "react-icons/md",
      "react-icons/bi",
      "react-icons/go",
      "@material-tailwind/react",
      "date-fns",
      "recharts",
      "react-toastify",
      "@tanstack/react-query",
      "driver.js",
      "zustand",
      "axios",
    ],
  },
});
module.exports = nextConfig;
