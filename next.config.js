/* eslint-disable import/no-extraneous-dependencies */
const withLinaria = require('next-with-linaria');

/** @type {import('next').NextConfig} */
const nextConfig = {
	rewrites: async () => [
		{
			source: '/wp-api/:path*',
			destination: `${process.env.WP_HOST_URL}/:path*`,
		},
	],
	images: {
		domains: ['placehold.co', process.env.WP_IMAGES_HOST],
	},
};

module.exports = withLinaria(nextConfig);
