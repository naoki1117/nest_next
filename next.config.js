/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

// const WithPWA = require("next-pwa");

// module.exports = WithPWA ({
//   pwa: {
//     dest:"public",
//     register :true,
//     skipWaiting:true,
//   },
//   reactStrictMode:true,
// })
