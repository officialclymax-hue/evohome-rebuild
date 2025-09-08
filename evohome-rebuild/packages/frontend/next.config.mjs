/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  env: {
    // used at build/runtime for SSR data fetching
    API_BASE: process.env.API_BASE || 'https://evohome-rebuild.onrender.com'
  }
};
export default nextConfig;
