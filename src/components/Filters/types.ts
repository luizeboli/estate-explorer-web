import { TaxonomyTitle } from '@/types';

export type FilterState = {
	[Title in TaxonomyTitle]: {
		[slug: string]: boolean;
	};
};
