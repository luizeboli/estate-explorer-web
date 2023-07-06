import type { AmenityTerm } from '@/types/taxonomy';
import type { WordpressPropertyPostType } from '@/types/wordpress';
import { prepareTermsSlugQuery, normalizeWordpressProperties } from './wordpress';

describe('prepareTermsSlugQuery', () => {
	it('should return empty object if no props are passed', () => {
		expect(prepareTermsSlugQuery()).toEqual({});
	});

	it('should return object with query params', () => {
		expect(
			prepareTermsSlugQuery({
				property_status: 'for-rent',
				amenities: [{ slug: 'gym' }, { slug: 'pool' }] as AmenityTerm[],
			}),
		).toEqual({
			property_status_slug: 'for-rent',
			amenities_slug: 'gym,pool',
		});
	});
});

describe('normalizeWordpressProperties', () => {
	it('should return empty array if no properties are passed', () => {
		expect(normalizeWordpressProperties([])).toEqual([]);
	});

	it('should return normalized properties', () => {
		const properties: WordpressPropertyPostType[] = [
			{
				_embedded: {
					'wp:featuredmedia': [
						{
							source_url: 'https://source-url.com',
						},
					],
					'wp:term': [
						[
							{
								taxonomy: 'property_status',
								slug: 'for-rent',
								id: 1,
								name: 'For Rent',
							},
						],
						[
							{
								taxonomy: 'amenities',
								slug: 'gym',
								id: 1,
								name: 'Gym',
							},
							{
								taxonomy: 'amenities',
								slug: 'pool',
								id: 2,
								name: 'Pool',
							},
						],
					],
				},
				id: 1,
				slug: 'property-slug',
				title: {
					rendered: 'Property Title',
				},
				meta: {
					description: 'Property description',
					location: 'Property location',
					price: 1000,
				},
			},
		];

		expect(normalizeWordpressProperties(properties)).toEqual([
			{
				id: 1,
				slug: 'property-slug',
				cover: 'https://source-url.com',
				title: 'Property Title',
				description: 'Property description',
				location: 'Property location',
				price: '$1,000.00',
				property_status: {
					id: 1,
					taxonomy: 'property_status',
					slug: 'for-rent',
					name: 'For Rent',
				},
				amenities: [
					{
						taxonomy: 'amenities',
						slug: 'gym',
						id: 1,
						name: 'Gym',
					},
					{
						taxonomy: 'amenities',
						slug: 'pool',
						id: 2,
						name: 'Pool',
					},
				],
			},
		]);
	});

	it('should return normalized properties when theres no taxonomies and featured image', () => {
		const properties = [
			{
				id: 1,
				slug: 'property-slug',
				title: {
					rendered: 'Property Title',
				},
				meta: {
					description: 'Property description',
					location: 'Property location',
					price: 1000,
				},
			},
		] as WordpressPropertyPostType[];

		expect(normalizeWordpressProperties(properties)).toEqual([
			{
				id: 1,
				slug: 'property-slug',
				cover: null,
				title: 'Property Title',
				description: 'Property description',
				location: 'Property location',
				price: '$1,000.00',
				property_status: undefined,
				amenities: undefined,
			},
		]);
	});
});
