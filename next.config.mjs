/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // أي طلب يبدأ بـ /api-proxy سينتقل لسيرفرك
        source: "/api-proxy/:path*",
        destination: "http://165.227.11.150/:path*",
      },
    ];
  },
};

export default nextConfig;
