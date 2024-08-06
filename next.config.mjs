/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: "/",
        destination: "/driver",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
