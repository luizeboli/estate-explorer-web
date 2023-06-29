import {
	NextSearchParams,
	Property,
	PropertyStatus,
	Taxonomy,
	TaxonomyTerm,
	TaxonomyTitle,
	WordpressPropertyPostType,
} from '@/types';

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

const formatCurrency = (price: number) =>
	new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(price);

export const normalizeWordpressProperties = (properties: WordpressPropertyPostType[]): Property[] =>
	properties.map(({ _embedded, id, slug, title, meta: { description, location, price } }) => {
		const taxonomiesWithTerms = _embedded?.['wp:term'] ?? [];
		const { property_status, ...taxonomies } = normalizeTaxonomies(taxonomiesWithTerms);

		return {
			id,
			slug,
			cover: _embedded['wp:featuredmedia']?.[0].source_url ?? null,
			title: title.rendered,
			description,
			location,
			price: formatCurrency(price),
			property_status: property_status.slug as PropertyStatus,
			...taxonomies,
		};
	});
