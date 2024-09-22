/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/o/:slug",
        destination: "/o/:slug/chats",
        permanent: true
      }
    ]
  }
};

export default nextConfig;
