import { wordPressProperties } from '@/mocks/properties';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const propertyStatusesParam = request.nextUrl.searchParams.get('property_status_slug');
	const amenitiesParam = request.nextUrl.searchParams.get('amenities_slug');

	if (!propertyStatusesParam && !amenitiesParam) return NextResponse.json(wordPressProperties);

	const statuses = propertyStatusesParam?.split(',') ?? [];
	const amenities = amenitiesParam?.split(',') ?? [];

	const filteredProperties = wordPressProperties.filter((property) => {
		const termsValues = property._embedded['wp:term'].reduce<Record<string, string[]>>(
			(acc, terms) => {
				const [term] = terms;
				const slugs = terms.map((term) => term.slug);

				acc[term.taxonomy] = slugs;

				return acc;
			},
			{},
		);

		if (
			statuses.length > 0 &&
			!statuses.every((status) => termsValues.property_status.includes(status))
		)
			return false;

		if (
			amenities.length > 0 &&
			!amenities.every((amenity) => termsValues.amenities.includes(amenity))
		)
			return false;

		return true;
	});

	return NextResponse.json(filteredProperties);
}
