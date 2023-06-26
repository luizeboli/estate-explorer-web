'use client';

import { TaxonomyTerm } from '@/types';
import { styled } from '@linaria/react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FilterState } from './types';
import TaxonomyFilter from './TaxonomyFilter';
import { buildSearchQueryString } from './helpers';

const Wrapper = styled.div``;

const Container = styled.ul`
	display: flex;
	justify-content: space-between;
	background-color: #fff;
	border: 1px solid #d4d4d8;
	border-radius: 0.6rem;
	padding: 0.8rem 1.4rem;
	margin-bottom: 1.2rem;
`;

const Search = styled.button`
	align-self: flex-start;
	color: #fff;
	padding: 0.8rem 1.2rem;
	background-color: rgb(168 85 247);
	border-radius: 0.6rem;
	font-size: 1.4rem;
	font-weight: 500;
	width: 100%;

	&:hover {
		background-color: rgb(126 34 206);
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
		setFilters((prev) => ({ ...prev, [taxonomy]: { ...prev[taxonomy], [slug]: value } }));
	};

	const handleSearch = () => {
		const query = buildSearchQueryString(filters);
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

			<Search type="button" onClick={handleSearch}>
				Search
			</Search>
		</Wrapper>
	);
};
export default Filters;
