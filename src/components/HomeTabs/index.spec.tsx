import { render, screen } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import HomeTabs from '.';

describe('<HomeTabs />', () => {
	it('should render default initial tab', async () => {
		// Arrange
		render(<HomeTabs />);

		// Assert
		expect(await screen.findByRole('tab', { name: 'For tenants' })).toHaveAttribute(
			'aria-selected',
			'true',
		);
		expect(
			screen.getByRole('heading', { name: 'Your gateway to dream rentals' }),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				'Our app provides a seamless and user-friendly experience, ensuring that you can find your dream rental effortlessly. From cozy apartments to spacious houses, we have a diverse range of properties to suit every lifestyle. Start your journey today and discover your ideal rental home with us.',
			),
		).toBeInTheDocument();
	});

	it('should switch between tabs', async () => {
		// Arrange
		const user = userEvent.setup();
		render(<HomeTabs />);

		// Act
		await user.click(screen.getByRole('tab', { name: 'For buyers' }));

		// Assert
		expect(
			await screen.findByRole('heading', { name: 'Unlock your dream home' }),
		).toBeInTheDocument();
		expect(screen.getByRole('tab', { name: 'For buyers' })).toHaveAttribute(
			'aria-selected',
			'true',
		);
		expect(
			screen.getByText(
				'Ready to make that long-awaited leap into homeownership? Our app is your key to unlocking your dream home. Explore a wide range of properties for sale, from charming starter homes to luxurious estates, all conveniently categorized to suit your preferences.',
			),
		).toBeInTheDocument();

		expect(screen.getByRole('tab', { name: 'For tenants' })).toHaveAttribute(
			'aria-selected',
			'false',
		);
		expect(
			screen.queryByRole('heading', { name: 'Your gateway to dream rentals' }),
		).not.toBeInTheDocument();

		expect(
			screen.queryByText(
				'Our app provides a seamless and user-friendly experience, ensuring that you can find your dream rental effortlessly. From cozy apartments to spacious houses, we have a diverse range of properties to suit every lifestyle. Start your journey today and discover your ideal rental home with us.',
			),
		).not.toBeInTheDocument();
	});

	it('should render link to the search page', async () => {
		// Arrange
		render(<HomeTabs />);

		// Assert
		expect(await screen.findByRole('link', { name: 'See properties' })).toHaveAttribute(
			'href',
			'/search',
		);
	});
});
