import type { Taxonomy, TaxonomyTitleSlug } from '@/types/taxonomy';

export type WordpressPropertyPostType = {
	id: number;
	title: {
		rendered: string;
	};
	slug: string;
	meta: {
		description: string;
		location: string;
		price: number;
	};
	_embedded: {
		'wp:featuredmedia':
			| {
					source_url: string;
			  }[]
			| undefined;
		'wp:term': Taxonomy[];
	};
};

export type WordpressCommonQueryParams = Partial<{
	_embed: string;
	per_page: string | number;
	exclude: string | number;
	slug: string;
}>;

export type WordpressPropertyTermsQueryParams = Partial<{
	[key in TaxonomyTitleSlug]: string;
}>;

export type WordpressPropertyQueryParams = WordpressPropertyTermsQueryParams &
	WordpressCommonQueryParams;
