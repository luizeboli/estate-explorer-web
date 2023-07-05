import { render, screen } from '@/tests/utils';
import type { Property } from '@/types';
import userEvent from '@testing-library/user-event';
import colors from '@/styles/colors';
import * as PropertyCard from '.';
import AddToWishlistButton from './AddToWishlistButton';

describe('<AddToWishlistButton />', () => {
	it('should add a property to the wishlist', async () => {
		// Arrange
		const user = userEvent.setup();

		render(
			<PropertyCard.Root property={{ id: 123 } as Property}>
				<AddToWishlistButton />
			</PropertyCard.Root>,
		);

		// Act
		await user.click(screen.getByLabelText('Add to wishlist'));

		// Assert
		expect(screen.getByLabelText('Remove from wishlist')).toBeInTheDocument();
		expect(screen.getByTestId('wishlist-icon')).toHaveAttribute('fill', colors.purple[500]);
	});

	it('should remove a property from the wishlist', async () => {
		// Arrange
		const user = userEvent.setup();

		render(
			<PropertyCard.Root property={{ id: 123 } as Property}>
				<AddToWishlistButton />
			</PropertyCard.Root>,
		);

		// Act
		await user.click(screen.getByLabelText('Add to wishlist'));
		await user.click(screen.getByLabelText('Remove from wishlist'));

		// Assert
		expect(screen.getByLabelText('Add to wishlist')).toBeInTheDocument();
		expect(screen.getByTestId('wishlist-icon')).toHaveAttribute('fill', 'none');
	});
});
