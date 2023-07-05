import { render } from '@/tests/utils';
import type { AmenityTermSlug } from '@/types/taxonomy';
import AmenityIcon from '.';

describe('<AmenityIcon />', () => {
	it.each<{ slug: AmenityTermSlug; icon: string }>([
		{
			slug: 'gym',
			icon: 'dumbbell',
		},
		{
			slug: 'parking',
			icon: 'parking-square',
		},
		{
			slug: 'pool',
			icon: 'waves',
		},
	])('should render the "$icon" icon for "$slug" amenity', ({ icon, slug }) => {
		// Arrange
		const { container } = render(<AmenityIcon slug={slug} />);

		// Assert
		const iconElement = container.getElementsByClassName(`lucide-${icon}`)[0];
		expect(iconElement).toBeInTheDocument();
	});
});
