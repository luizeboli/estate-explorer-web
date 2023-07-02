import { FetcherOptions, fetcher } from '@/services/fetcher';
import { TaxonomyTerm } from '@/types/taxonomy';
import { WordpressPropertyPostType, WordpressPropertyQueryParams } from '@/types/wordpress';
import { normalizeWordpressProperties } from '@/utils/wordpress';

type GetPropertiesParams = {
	params?: WordpressPropertyQueryParams;
	options?: Omit<FetcherOptions, 'params'>;
};

export const getProperties = async ({ params = {}, options = {} }: GetPropertiesParams = {}) => {
	const data = await fetcher<WordpressPropertyPostType[]>('/properties', {
		...options,
		params: { ...params, _embed: '' },
	});

	return normalizeWordpressProperties(data);
};

export const getTaxonomyTerms = async <TTerms = TaxonomyTerm[]>(taxonomy: string) => {
	const data = await fetcher<TTerms>(`/${taxonomy}`);
	return data;
};
