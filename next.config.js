/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";

const baseConfig = {
  output: "standalone",
  turbopack: {},
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
      "react-icons/hi2",
      "date-fns",
      "recharts",
      "react-toastify",
      "@tanstack/react-query",
      "driver.js",
      "zustand",
      "axios",
    ],
  },
};

// Skip loading next-pwa (and its workbox/webpack dependency tree) in development so config loading stays sub-second.
const nextConfig = isProduction
  ? require("@ducanh2912/next-pwa").default({
      dest: "public",
      cacheOnFrontEndNav: true,
      aggressiveFrontEndNavCaching: true,
      reloadOnOnline: true,
      swcMinify: true,
      disable: false,
      workboxOptions: {
        disableDevLogs: true,
      },
    })(baseConfig)
  : baseConfig;

module.exports = nextConfig;
