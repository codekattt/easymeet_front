/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/teamleader?step=create',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
