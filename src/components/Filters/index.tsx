'use client';

import { TaxonomyTerm } from '@/types';
import { styled } from '@linaria/react';
import { useState } from 'react';
import { FilterState } from '@/components/Filters/types';
import TaxonomyFilter from './TaxonomyFilter';

const Wrapper = styled.ul`
	display: flex;
	justify-content: space-between;
	background-color: #fff;
	border: 1px solid #d4d4d8;
	border-radius: 0.6rem;
	padding: 0.8rem 1.4rem;
`;

type FiltersProps = {
	amenities: TaxonomyTerm[];
	propertyStatus: TaxonomyTerm[];
	initialFilters: FilterState;
};

const Filters = ({ amenities, propertyStatus, initialFilters }: FiltersProps) => {
	const [filters, setFilters] = useState(initialFilters);

	const updateFilters = (taxonomy: keyof FilterState) => (slug: string, value: boolean) => {
		setFilters((prev) => ({
			...prev,
			[taxonomy]: { ...prev[taxonomy], [slug]: value },
		}));
	};

	return (
		<Wrapper>
			<TaxonomyFilter
				title="Status"
				terms={propertyStatus}
				values={filters.property_status}
				onChange={updateFilters('property_status')}
			/>
			<TaxonomyFilter
				title="Amenities"
				terms={amenities}
				values={filters.amenities}
				onChange={updateFilters('amenities')}
			/>
		</Wrapper>
	);
};
export default Filters;
