const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  env: {
    BASE_URL: process.env.BASE_URL,
    reCaptchaKey: process.env.reCaptchaKey,
  },
  devIndicators: {
    buildActivity: false,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig; 