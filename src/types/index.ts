export type TaxonomyTitle = 'property_status' | 'amenities';

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
		'wp:featuredmedia': {
			source_url: string;
		}[];
		'wp:term': Taxonomy[];
	};
};

export type Property = {
	id: number;
	slug: string;
	cover: string | null;
	title: string;
	location: string;
	price: number;
	status: TaxonomyTerm;
	amenities: TaxonomyTerm[];
};

export type NextSearchParams = {
	[key: string]: string | string[] | undefined;
};
