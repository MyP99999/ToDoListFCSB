/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "images.pixels.com"]
  }
}

module.exports = nextConfig
