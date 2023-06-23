import { FilterState } from '@/components/Filters/types';
import { TaxonomyTerm } from '@/types';

export const createInitialState = (terms: TaxonomyTerm[]) =>
	terms.reduce(
		(acc, { taxonomy, slug }) => ({
			...acc,
			[taxonomy]: { ...acc[taxonomy as keyof FilterState], [slug]: false },
		}),
		{} as FilterState,
	);
