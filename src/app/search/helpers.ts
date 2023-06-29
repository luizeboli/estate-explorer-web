import { FilterState } from '@/components/Filters/types';
import { NextSearchParams, TaxonomyTerm, TaxonomyTitle, TaxonomyTitleSlug } from '@/types';

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

type TermsParams = Partial<{
	[key in TaxonomyTitleSlug]: string;
}>;

export const prepareTermsSearchParams = (searchParams?: NextSearchParams) => {
	if (!searchParams) return {};

	const allowedParams = ['property_status', 'amenities'] satisfies TaxonomyTitle[];

	return Object.keys(searchParams).reduce<TermsParams>((acc, key) => {
		const paramValue = searchParams[key];

		if (!paramValue) return acc;
		if (!allowedParams.includes(key as TaxonomyTitle)) return acc;

		const value = Array.isArray(paramValue) ? paramValue.join(',') : paramValue;
		acc[`${key}_slug` as TaxonomyTitleSlug] = value;

		return acc;
	}, {});
};
