import { FilterState } from '@/components/Filters/types';
import {
	NextSearchParams,
	Taxonomy,
	TaxonomyTerm,
	TaxonomyTitle,
	WordpressPropertyPostType,
} from '@/types';

export const createInitialFilters = (terms: TaxonomyTerm[], searchParams?: NextSearchParams) => {
	return terms.reduce((acc, { taxonomy, slug }) => {
		const query = searchParams?.[taxonomy];

		return {
			...acc,
			[taxonomy]: {
				...acc[taxonomy],
				[slug]: query?.includes(slug) ?? false,
			},
		};
	}, {} as FilterState);
};

export const createWordpressQuery = (searchParams?: NextSearchParams) => {
	if (!searchParams) return '';

	const newQuery = new URLSearchParams();

	Object.entries(searchParams).forEach(([taxonomy, terms]) => {
		if (typeof terms !== 'string') return;
		newQuery.append(`${taxonomy}_slug`, terms);
	});

	return newQuery.toString();
};

const normalizeTaxonomies = (taxonomies: Taxonomy[]) => {
	return taxonomies.reduce((acc, taxonomyTerms) => {
		const [term] = taxonomyTerms;
		const { taxonomy } = term;

		if (taxonomy === 'property_status') {
			return {
				...acc,
				[taxonomy]: taxonomyTerms?.[0],
			};
		}

		return {
			...acc,
			[taxonomy]: taxonomyTerms,
		};
	}, {} as { [key in TaxonomyTitle]: key extends 'property_status' ? TaxonomyTerm : TaxonomyTerm[] });
};

export const normalizeWordpressProperties = (properties: WordpressPropertyPostType[]) =>
	properties.map(({ _embedded, id, slug, title, meta: { description, location, price } }) => {
		const { property_status: status, ...taxonomies } = normalizeTaxonomies(
			_embedded?.['wp:term'] ?? [],
		);
		return {
			id,
			slug,
			cover: _embedded['wp:featuredmedia']?.[0].source_url ?? null,
			title: title.rendered,
			description,
			location,
			price,
			status,
			...taxonomies,
		};
	});
