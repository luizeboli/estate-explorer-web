export type TaxonomyTitle = 'property_status' | 'amenities';

export type TaxonomyTitleSlug = `${TaxonomyTitle}_slug`;

export type TaxonomyTerm = {
	id: number;
	name: string;
	slug: string;
	taxonomy: TaxonomyTitle;
};

export type Taxonomy = TaxonomyTerm[];

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

export type PropertyStatus = 'for-rent' | 'for-sale';

export type Property = {
	id: number;
	slug: string;
	cover: string | null;
	title: string;
	description: string;
	location: string;
	price: string;
	status: PropertyStatus;
	amenities: TaxonomyTerm[];
};

export type NextSearchParams = {
	[key: string]: string | string[] | undefined;
};

export type WordpressCommonQueryParams = Partial<{
	_embed: string;
	per_page: string | number;
	exclude: string | number;
	slug: string;
}>;

export type WordpressPropertyQueryParams = Partial<{
	[key in TaxonomyTitleSlug]: string;
}> &
	WordpressCommonQueryParams;
