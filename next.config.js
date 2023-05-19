/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "http://localhost",
        // port: "4000",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "www.poke-api.online",
        // port: "4000",
        pathname: "/images/**",
      },
    ],
  },
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
};

module.exports = nextConfig;
