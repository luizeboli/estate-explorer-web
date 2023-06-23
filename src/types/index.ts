export type Property = {
	id: number;
	cover: string;
	title: string;
	location: string;
	price: number;
	status: PropertyStatus;
	amenities: PropertyAmenity[];
};

export type PropertyStatus = {
	slug: string;
	name: string;
};

export type PropertyAmenity = {
	slug: string;
	name: string;
};
