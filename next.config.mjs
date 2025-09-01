/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude html2pdf.js from server-side bundle
      config.externals = config.externals || [];
      config.externals.push('html2pdf.js');
    }
    return config;
  },
};

export default nextConfig;
