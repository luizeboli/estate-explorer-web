import { FilterState } from './types';

export const buildSearchQueryString = (filters: FilterState) => {
	const query = new URLSearchParams();

	Object.entries(filters).forEach(([taxonomy, terms]) => {
		const termsToSearch = Object.entries(terms).reduce((acc, [slug, value]) => {
			if (value) {
				acc.push(slug);
			}
			return acc;
		}, [] as string[]);

		if (termsToSearch.length) {
			query.append(taxonomy, termsToSearch.join(','));
		}
	});

	return query;
};
