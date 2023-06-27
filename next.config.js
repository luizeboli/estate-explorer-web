/* eslint-disable import/no-extraneous-dependencies */
const withLinaria = require('next-with-linaria');

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['placehold.co', 'estate-explorer.local'],
	},
};

module.exports = withLinaria(nextConfig);
