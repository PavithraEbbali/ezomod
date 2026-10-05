/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  compiler: { removeConsole: process.env.NODE_ENV === "production" },
  // Inline the (small) Tailwind CSS into each page so it does not block first render.
  experimental: { inlineCss: true },
};

export default nextConfig;
