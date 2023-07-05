import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@/tests/utils';
import ShareButton from '.';

Object.defineProperty(window, 'location', {
	value: {
		href: 'https://www.example.com',
	},
	writable: true,
});

describe('<ShareButton />', () => {
	it('should copy the current URL to the clipboard', async () => {
		// Arrange
		jest.useFakeTimers();

		const writeText = jest.fn();
		Object.assign(navigator, {
			clipboard: {
				writeText,
			},
		});

		render(<ShareButton />);

		// Act
		userEvent.click(screen.getByRole('button', { name: /share/i }));

		// Assert
		await waitFor(() => expect(writeText).toHaveBeenCalledWith('https://www.example.com'));
		expect(screen.getByRole('button', { name: /link copied/i })).toBeInTheDocument();

		jest.runAllTimers();

		expect(await screen.findByRole('button', { name: /share/i })).toBeInTheDocument();
	});
});
