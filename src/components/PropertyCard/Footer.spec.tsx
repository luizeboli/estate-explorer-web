import { render, screen } from '@/tests/utils';
import { Property } from '@/types';
import { AmenityTerm } from '@/types/taxonomy';
import * as PropertyCard from '.';

describe('<PropertyCard.Footer />', () => {
	it('should render property amenities', () => {
		// Arrange
		const amenities = [
			{
				id: 1,
				name: 'Fake Amenity 1',
				slug: 'gym',
			},
			{
				id: 2,
				name: 'Fake Amenity 2',
				slug: 'parking',
			},
			{
				id: 2,
				name: 'Fake Amenity 3',
				slug: 'pool',
			},
		] as AmenityTerm[];

		render(
			<PropertyCard.Root property={{ amenities } as Property}>
				<PropertyCard.Footer />
			</PropertyCard.Root>,
		);

		// Assert
		amenities.forEach((amenity) => {
			expect(screen.getByText(amenity.name)).toBeInTheDocument();
		});
	});
});
