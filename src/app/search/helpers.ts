import { FilterState } from '@/components/Filters/types';
import { TaxonomyTerm } from '@/types';

export const createInitialFilters = (
	terms: TaxonomyTerm[],
	searchParams?: { [key: string]: string | string[] | undefined },
) => {
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
