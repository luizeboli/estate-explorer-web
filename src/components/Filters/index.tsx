'use client';

import { styled } from '@linaria/react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { TaxonomyTerm } from '@/types/taxonomy';
import { FilterState } from './types';
import TaxonomyFilter from './TaxonomyFilter';
import { buildSearchQueryString } from './helpers';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	margin-bottom: 1.2rem;

	@media screen and (min-width: 1024px) {
		margin-bottom: 0;
	}
`;

const Container = styled.ul`
	display: flex;
	background-color: #fff;
	border: 1px solid #d4d4d8;
	border-radius: 0.6rem;
	padding: 1.6rem 2.4rem;

	@media screen and (min-width: 1024px) {
		gap: 2.4rem;
		flex-direction: column;
	}
`;

type FiltersProps = {
	amenities: TaxonomyTerm[];
	propertyStatus: TaxonomyTerm[];
	initialFilters: FilterState;
};

const Filters = ({ amenities, propertyStatus, initialFilters }: FiltersProps) => {
	const pathname = usePathname();
	const router = useRouter();
	const [filters, setFilters] = useState(initialFilters);

	const updateFilters = (taxonomy: keyof FilterState) => (slug: string, value: boolean) => {
		const newFilters = { ...filters, [taxonomy]: { ...filters[taxonomy], [slug]: value } };
		setFilters(newFilters);

		const query = buildSearchQueryString(newFilters);
		router.push(`${pathname}?${decodeURIComponent(query.toString())}`);
	};

	return (
		<Wrapper>
			<Container>
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
			</Container>
		</Wrapper>
	);
};
export default Filters;
