import { render, screen } from '@/tests/utils';
import NotFound from './not-found';

describe('<NotFound />', () => {
	it('should render not found text with a link to search page', async () => {
		// Arrange
		render(<NotFound />);

		// Assert
		expect(await screen.findByText(/404 - Not Found/i)).toBeInTheDocument();
		expect(screen.getByText(/Could not found requested property/i)).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /View all properties/i })).toHaveAttribute(
			'href',
			'/search',
		);
	});
});
