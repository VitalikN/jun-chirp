/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      { protocol: "https", hostname: "media.licdn.com" },
    ],
  },
  // використовувати для проксуванням запитів ( робота з CORS кукі)
  // ===
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_BASE_URL + "/:path*",
      },
    ];
  },
  // ===
};

export default nextConfig;

// const nextConfig = {
//

// module.exports = nextConfig;
