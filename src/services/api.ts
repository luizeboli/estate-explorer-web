import { FetcherOptions, fetcher } from '@/services/fetcher';
import { WordpressPropertyPostType, WordpressPropertyQueryParams } from '@/types/wordpress';
import { normalizeWordpressProperties } from '@/utils/wordpress';

export const getTaxonomyTerms = () => {};

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
