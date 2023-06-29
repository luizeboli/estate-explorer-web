export type TaxonomyTitle = 'property_status' | 'amenities';

export type TaxonomyTitleSlug = `${TaxonomyTitle}_slug`;

export type PropertyStatusTerm = TaxonomyTerm<'property_status'>;

export type PropertyStatusTermSlug = 'for-rent' | 'for-sale';

export type AmenityTerm = TaxonomyTerm<'amenities'>;

export type AmenityTermSlug = 'gym' | 'pool' | 'parking';

export type TaxonomyTerm<TTitle extends TaxonomyTitle = TaxonomyTitle> = {
	id: number;
	name: string;
	slug: TaxonomiesSlugs[TTitle];
	taxonomy: TTitle;
};

export type Taxonomies = {
	amenities: AmenityTerm[];
	property_status: PropertyStatusTerm[];
};

export type TaxonomiesSlugs = {
	amenities: AmenityTermSlug;
	property_status: PropertyStatusTermSlug;
};

export type Taxonomy = AmenityTerm[] | PropertyStatusTerm[];
