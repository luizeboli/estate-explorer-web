import { fetcher } from '@/services/fetcher';
import { WordpressPropertyPostType, WordpressPropertyQueryParams } from '@/types';
import { normalizeWordpressProperties } from '@/utils/wordpress';

export const getTaxonomyTerms = () => {};

type GetPropertiesParams = {
	params: WordpressPropertyQueryParams;
};

export const getProperties = async ({ params }: GetPropertiesParams) => {
	const data = await fetcher<WordpressPropertyPostType[]>('/properties', {
		params: { ...params, _embed: '' },
	});

	return normalizeWordpressProperties(data);
};
