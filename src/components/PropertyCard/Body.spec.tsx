import { render, screen } from '@/tests/utils';
import { Property } from '@/types';
import { textContentMatcher } from '@/tests/textContentMatcher';
import * as PropertyCard from '.';

describe('<PropertyCard.Body />', () => {
	it('should render property price, title and location', async () => {
		// Arrange
		render(
			<PropertyCard.Root
				property={
					{
						price: 'U$ 1000.00',
						title: 'Fake Title',
						location: 'Fake Location',
						property_status: {},
					} as Property
				}
			>
				<PropertyCard.Body />
			</PropertyCard.Root>,
		);

		// Assert
		expect(await screen.findByText('U$ 1000.00')).toBeInTheDocument();
		expect(screen.getByText('Fake Title')).toBeInTheDocument();
		expect(screen.getByText('Fake Location')).toBeInTheDocument();
	});

	it.each([
		{
			propertyStatus: 'for-rent',
			price: 'U$ 1000.00',
			expected: 'U$ 1000.00 /month',
		},
		{
			propertyStatus: 'for-sale',
			price: 'U$ 3,500,000.00',
			expected: 'U$ 3,500,000.00',
		},
	])(
		'should render price as "$expected" based on property status: $propertyStatus',
		async ({ expected, price, propertyStatus }) => {
			// Arrange
			render(
				<PropertyCard.Root
					property={
						{
							price,
							title: 'Fake Title',
							location: 'Fake Location',
							property_status: { slug: propertyStatus },
						} as Property
					}
				>
					<PropertyCard.Body />
				</PropertyCard.Root>,
			);

			// Assert
			expect(await screen.findByText(textContentMatcher(expected))).toBeInTheDocument();
		},
	);
});
