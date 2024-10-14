/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/leader?step=create',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
