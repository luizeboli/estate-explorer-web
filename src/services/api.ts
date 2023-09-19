import { wordPressAmenities } from '@/mocks/amenities';
import { wordPressProperties } from '@/mocks/properties';
import { wordPressPropertyStatus } from '@/mocks/property-status';
import type { FetcherOptions } from '@/services/fetcher';
import type { TaxonomyTerm } from '@/types/taxonomy';
import type { WordpressPropertyPostType, WordpressPropertyQueryParams } from '@/types/wordpress';
import { normalizeWordpressProperties } from '@/utils/wordpress';

type GetPropertiesParams = {
	params?: WordpressPropertyQueryParams;
	options?: Omit<FetcherOptions, 'params'>;
};

export const getProperties = async ({ params = {} }: GetPropertiesParams = {}) => {
	const { amenities_slug, property_status_slug, slug, exclude } = params;

	if (slug) {
		const property = wordPressProperties.find((property) => property.slug === slug);
		return normalizeWordpressProperties([property] as WordpressPropertyPostType[]);
	}

	if (!amenities_slug && !property_status_slug)
		return normalizeWordpressProperties(wordPressProperties as WordpressPropertyPostType[]);

	const statuses = property_status_slug?.split(',') ?? [];
	const amenities = amenities_slug?.split(',') ?? [];

	const filteredProperties = wordPressProperties.filter((property) => {
		if (property.id === exclude) return false;

		const termsValues = property._embedded['wp:term'].reduce<Record<string, string[]>>(
			(acc, terms) => {
				const [term] = terms;
				const slugs = terms.map((term) => term.slug);

				acc[term.taxonomy] = slugs;

				return acc;
			},
			{},
		);

		if (
			statuses.length > 0 &&
			!statuses.every((status) => termsValues.property_status.includes(status))
		)
			return false;

		if (
			amenities.length > 0 &&
			!amenities.every((amenity) => termsValues.amenities.includes(amenity))
		)
			return false;

		return true;
	});

	return normalizeWordpressProperties(filteredProperties as WordpressPropertyPostType[]);
};

export const getTaxonomyTerms = async <TTerms = TaxonomyTerm[]>(taxonomy: string) => {
	if (taxonomy === 'amenities') {
		return wordPressAmenities as TTerms;
	}

	if (taxonomy === 'property_status') {
		return wordPressPropertyStatus as TTerms;
	}

	return [];
};
