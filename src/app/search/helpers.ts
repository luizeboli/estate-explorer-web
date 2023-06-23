import { FilterState } from '@/components/Filters/types';
import { TaxonomyTerm } from '@/types';

export const createInitialFilters = (
	terms: TaxonomyTerm[],
	searchParams?: { [key: string]: string | string[] | undefined },
) => {
	return terms.reduce((acc, { taxonomy, slug }) => {
		const query = searchParams?.[taxonomy];
		if (!acc[taxonomy]) acc[taxonomy] = {};

		if (Array.isArray(query)) {
			acc[taxonomy][slug] = query.includes(slug);
		} else {
			acc[taxonomy][slug] = query === slug;
		}

		return acc;
	}, {} as FilterState);
};
