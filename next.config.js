/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactStrictMode: true,
    appDir: true,
    allowMiddlewareResponseBody: true,
  },
  // serverMiddleware: [
  //   { path: '/', handler: '~/middleware/maintenance.ts' },

  // ],
  api: {
    bodyParser: true
  },
}

module.exports = nextConfig
