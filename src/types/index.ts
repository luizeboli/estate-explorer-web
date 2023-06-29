export type TaxonomyTitle = 'property_status' | 'amenities';

export type TaxonomyTitleSlug = `${TaxonomyTitle}_slug`;

export type TaxonomyTerm<TSlug = string> = {
	id: number;
	name: string;
	slug: TSlug;
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

export type AmenitySlug = 'gym' | 'pool' | 'parking';

export type Property = {
	id: number;
	slug: string;
	cover: string | null;
	title: string;
	description: string;
	location: string;
	price: string;
	property_status: PropertyStatus;
	amenities: TaxonomyTerm<AmenitySlug>[];
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

export type WordpressPropertyTermsQueryParams = Partial<{
	[key in TaxonomyTitleSlug]: string;
}>;

export type WordpressPropertyQueryParams = WordpressPropertyTermsQueryParams &
	WordpressCommonQueryParams;
