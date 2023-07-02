/* eslint-disable import/no-extraneous-dependencies */
const withLinaria = require('next-with-linaria');

/** @type {import('next').NextConfig} */
const nextConfig = {
	rewrites: async () => [
		{
			source: '/wp-api/:path*',
			destination: `${process.env.WP_HOST}/:path*`,
		},
	],
	images: {
		domains: ['placehold.co', 'estate-explorer.local'],
	},
};

module.exports = withLinaria(nextConfig);
