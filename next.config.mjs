import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY:
      process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY || "",
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@syncfusion/ej2-base": path.resolve(
        __dirname,
        "node_modules/@syncfusion/ej2-base"
      ),
    };
    if (isServer) {
      // Exclude html2pdf.js from server-side bundle
      config.externals = config.externals || [];
      config.externals.push("html2pdf.js");
    }
    return config;
  },
};

export default nextConfig;
