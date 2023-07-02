/* eslint-disable import/no-extraneous-dependencies */
const withLinaria = require('next-with-linaria');

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['placehold.co', process.env.WP_IMAGES_HOST],
	},
};

module.exports = withLinaria(nextConfig);
