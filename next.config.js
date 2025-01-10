/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/leader?step=create',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
