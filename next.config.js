/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    // Setting resolve.alias to false tells webpack to ignore a module
    // https://webpack.js.org/configuration/resolve/#resolvealias
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    // config.plugins = config.plugins.filter((plugin) => {
    //   return plugin.constructor.name !== "ReactFreshWebpackPlugin";
    // });
    if (!isServer) {
      // Ensure that all imports of 'yjs' resolve to the same instance
      config.resolve.alias['yjs'] = path.resolve(__dirname, 'node_modules/yjs')
    }
    return config;
  },
  images: {
    domains: ["videoapi-muybridge.vimeocdn.com", "img.clerk.com", "utfs.io"],
  },
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
