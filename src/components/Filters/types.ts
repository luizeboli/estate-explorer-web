import { TaxonomiesSlugs, TaxonomyTitle } from '@/types/taxonomy';

export type FilterState = {
	[Title in TaxonomyTitle]: {
		[slug in TaxonomiesSlugs[Title]]: boolean;
	};
};
