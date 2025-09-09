/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
  env: {
    API_BASE: process.env.API_BASE || 'https://evohome-rebuild.onrender.com'
  },
};
export default nextConfig;
