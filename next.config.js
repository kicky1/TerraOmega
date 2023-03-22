/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactStrictMode: false,
    appDir: true,
    allowMiddlewareResponseBody: true,
    reactMode: "concurrent",
  },
  // serverMiddleware: [
  //   { path: '/', handler: '~/middleware/maintenance.ts' },

  // ],
  api: {
    bodyParser: true,
  },
};

module.exports = nextConfig;
