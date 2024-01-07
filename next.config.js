/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add raw-loader to handle .glsl files
    config.module.rules.push({
      test: /\.glsl$/,
      use: ["raw-loader"],
    });

    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
