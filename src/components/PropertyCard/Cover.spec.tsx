import { render, screen } from '@/tests/utils';
import { Property } from '@/types';
import * as PropertyCard from '.';

describe('<PropertyCard.Cover />', () => {
	it('should render the property image as a link', async () => {
		// Arrange
		render(
			<PropertyCard.Root
				property={
					{
						title: 'property',
						slug: 'slug',
						cover: 'https://property-cover.com/png',
					} as Property
				}
			>
				<PropertyCard.Cover />
			</PropertyCard.Root>,
		);

		// Assert
		expect(await screen.findByRole('link')).toHaveAttribute('href', '/property/slug');
		expect(screen.getByRole('img')).toHaveAttribute(
			'src',
			expect.stringContaining('https%3A%2F%2Fproperty-cover.com%2Fpng'),
		);
	});
});
