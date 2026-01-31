/** @type {import('next').NextConfig} */
const nextConfig = {
    onDemandEntries: {
        // Make dev server keep pages in memory longer to avoid disposing chunks too fast
        maxInactiveAge: 60 * 60 * 1000,
        pagesBufferLength: 5,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    async redirects() {
        return [
            {
                source: '/login',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
