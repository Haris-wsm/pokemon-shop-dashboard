/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: "http",
      //   hostname: "localhost",
      //   port: "4000",
      //   pathname: "/images/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "http://178.128.113.92",
      //   // port: "4000",
      //   pathname: "/images/**",
      // },
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
