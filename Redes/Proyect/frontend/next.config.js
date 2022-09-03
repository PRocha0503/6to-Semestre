/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [__dirname + 'styles', "node_modules"],
  },
}

module.exports = nextConfig
