import Filters from '@/components/Filters';
import { NextSearchParams, TaxonomyTerm, WordpressPropertyPostType } from '@/types';
import { styled } from '@linaria/react';
import { fetcher } from '@/services/api';
import PropertyCard from '@/components/PropertyCard';
import {
	createInitialFilters,
	createWordpressQuery,
	normalizeWordpressProperties,
} from './helpers';

const Wrapper = styled.div`
	padding: 5.4rem 1.6rem 0;
`;

const Container = styled.div`
	max-width: 1440px;
	margin: 0 auto;
`;

const Title = styled.h1`
	font-size: 2.4rem;
	text-align: center;
	margin-bottom: 3.2rem;
`;

const List = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 1.6rem;
`;

const SearchPage = async ({ searchParams }: { searchParams?: NextSearchParams }) => {
	const [amenities, propertyStatus, propertiesPostType] = await Promise.all([
		fetcher<TaxonomyTerm[]>('/amenities'),
		fetcher<TaxonomyTerm[]>('/property_status'),
		fetcher<WordpressPropertyPostType[]>(
			`/properties?_embed&${createWordpressQuery(searchParams)}`,
			{ cache: 'no-cache' },
		),
	]);

	const properties = normalizeWordpressProperties(propertiesPostType);

	return (
		<Wrapper>
			<Container>
				<Title>Search your new home</Title>

				<Filters
					amenities={amenities}
					propertyStatus={propertyStatus}
					initialFilters={createInitialFilters(
						[...amenities, ...propertyStatus],
						searchParams,
					)}
				/>

				<List>
					{properties.map((property) => (
						<PropertyCard key={property.id} property={property} />
					))}
				</List>
			</Container>
		</Wrapper>
	);
};

export default SearchPage;
