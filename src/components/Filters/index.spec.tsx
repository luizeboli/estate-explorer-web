/* eslint-disable react/jsx-props-no-spreading */
import { render, screen } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import * as router from 'next/navigation';
import Filters, { FiltersProps, freshFiltersState } from '.';

jest.mock('next/navigation');

const props: FiltersProps = {
	initialFilters: freshFiltersState,
	amenities: [
		{
			id: 1,
			name: 'Fake Amenity',
			slug: 'gym',
			taxonomy: 'amenities',
		},
	],
	propertyStatus: [
		{
			id: 1,
			name: 'Fake Sale',
			slug: 'for-sale',
			taxonomy: 'property_status',
		},
		{
			id: 2,
			name: 'Fake Rent',
			slug: 'for-rent',
			taxonomy: 'property_status',
		},
	],
};

describe('<Filters/>', () => {
	beforeEach(() => {
		jest.spyOn(router, 'usePathname').mockReturnValue('/');
	});

	it('should render taxonomies options', () => {
		// Arrange
		render(<Filters {...props} />);

		// Assert
		expect(screen.getByLabelText('Fake Amenity')).toBeInTheDocument();
		expect(screen.getByLabelText('Fake Sale')).toBeInTheDocument();
	});

	it('should render the initial filters value', () => {
		// Arrange
		const initialFilters = {
			amenities: {
				parking: true,
				gym: true,
				pool: true,
			},
			property_status: {
				'for-rent': false,
				'for-sale': true,
			},
		};
		render(<Filters {...props} initialFilters={initialFilters} />);

		// Assert
		expect(screen.getByLabelText('Fake Amenity')).toBeChecked();
		expect(screen.getByLabelText('Fake Sale')).toBeChecked();
		expect(screen.getByLabelText('Fake Rent')).not.toBeChecked();
	});

	it('should push new route query when a filter is selected', async () => {
		// Arrange
		const mockedPush = jest.fn();
		jest.spyOn(router, 'useRouter').mockReturnValue({
			push: mockedPush,
		} as any);

		render(<Filters {...props} />);

		// Act
		await userEvent.click(screen.getByLabelText('Fake Amenity'));
		expect(mockedPush).toHaveBeenCalledWith('/?amenities=gym');
		await userEvent.click(screen.getByLabelText('Fake Sale'));

		// Assert
		expect(mockedPush).toHaveBeenCalledWith('/?amenities=gym&property_status=for-sale');
	});

	it('should include initial filters in the query when pushing new filters', async () => {
		// Arrange
		const mockedPush = jest.fn();
		jest.spyOn(router, 'useRouter').mockReturnValue({
			push: mockedPush,
		} as any);

		const initialFilters = {
			amenities: {
				parking: false,
				gym: true,
				pool: false,
			},
			property_status: {
				'for-rent': false,
				'for-sale': false,
			},
		};

		render(<Filters {...props} initialFilters={initialFilters} />);

		// Act
		await userEvent.click(screen.getByLabelText('Fake Sale'));

		// Assert
		expect(mockedPush).toHaveBeenCalledWith('/?amenities=gym&property_status=for-sale');
	});

	it('should remove filter from query when unselected', async () => {
		// Arrange
		const mockedPush = jest.fn();
		jest.spyOn(router, 'useRouter').mockReturnValue({
			push: mockedPush,
		} as any);

		render(<Filters {...props} />);

		// Act
		await userEvent.click(screen.getByLabelText('Fake Amenity'));
		await userEvent.click(screen.getByLabelText('Fake Amenity'));

		// Assert
		expect(mockedPush).toHaveBeenLastCalledWith('/');
	});

	it('should add multiple values in the same param', async () => {
		// Arrange
		const mockedPush = jest.fn();
		jest.spyOn(router, 'useRouter').mockReturnValue({
			push: mockedPush,
		} as any);

		render(<Filters {...props} />);

		// Act
		await userEvent.click(screen.getByLabelText('Fake Amenity'));
		await userEvent.click(screen.getByLabelText('Fake Sale'));
		await userEvent.click(screen.getByLabelText('Fake Rent'));

		// Assert
		expect(mockedPush).toHaveBeenLastCalledWith(
			'/?amenities=gym&property_status=for-rent,for-sale',
		);
	});
});
