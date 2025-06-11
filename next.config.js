const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n, // i18n config from next-i18next
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
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Home',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
