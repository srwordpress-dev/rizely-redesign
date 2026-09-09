/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    // Static export has no image optimizer, so blog covers from Strapi are
    // served as-is. remotePatterns is listed anyway so nothing has to be
    // rediscovered if optimization is ever turned on.
    unoptimized: true,
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "1337" }, // local Strapi
      { protocol: "https", hostname: "**.up.railway.app" }, // Strapi on Railway
      { protocol: "https", hostname: "res.cloudinary.com" }, // Cloudinary media
    ],
  },
};

export default nextConfig;
