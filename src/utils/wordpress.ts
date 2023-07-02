import { Property } from '@/types';
import { PropertyStatusTermSlug, Taxonomies, Taxonomy, TaxonomyTitle } from '@/types/taxonomy';
import { WordpressPropertyPostType, WordpressPropertyTermsQueryParams } from '@/types/wordpress';

type PrepareTermsSlugQueryParams = {
	[K in TaxonomyTitle]: K extends 'property_status' ? PropertyStatusTermSlug : Taxonomies[K];
};

export const prepareTermsSlugQuery = (props?: PrepareTermsSlugQueryParams) => {
	if (!props) return {};

	const keys = Object.keys(props) as Array<keyof typeof props>;
	return keys.reduce<WordpressPropertyTermsQueryParams>((acc, key) => {
		const value = props[key];
		if (!value) return acc;

		const queryValue = Array.isArray(value) ? value.map(({ slug }) => slug).join(',') : value;
		acc[`${key}_slug`] = queryValue;
		return acc;
	}, {});
};

const normalizeTaxonomies = (taxonomies: Taxonomy[]) => {
	return taxonomies.reduce((acc, taxonomyTerms) => {
		const [term] = taxonomyTerms;
		const { taxonomy } = term;
		return {
			...acc,
			[taxonomy]: taxonomyTerms,
		};
	}, {} as { [K in TaxonomyTitle]: Taxonomies[K] });
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
			property_status: property_status[0],
			...taxonomies,
		};
	});
