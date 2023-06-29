import Filters from '@/components/Filters';
import { NextSearchParams } from '@/types';
import { styled } from '@linaria/react';
import { fetcher } from '@/services/fetcher';
import * as PropertyCard from '@/components/PropertyCard';
import { getProperties } from '@/services/api';
import { TaxonomyTerm } from '@/types/taxonomy';
import { createInitialFilters, prepareTermsSearchParams } from './helpers';

const Wrapper = styled.div`
	padding: 5.4rem 5% 0;
`;

const Container = styled.div`
	max-width: 1440px;
	margin: 0 auto;
`;

const Title = styled.h1`
	font-size: 2.4rem;
	margin-bottom: 3.2rem;
`;

const List = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 1.6rem;
	flex-grow: 1;
`;

const EmptyStateText = styled.p`
	font-size: 1.6rem;
	text-align: center;

	@media screen and (min-width: 768px) {
		text-align: left;
	}
`;

const Properties = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3.2rem;

	@media screen and (min-width: 1024px) {
		flex-direction: row;
	}
`;

const SearchPage = async ({ searchParams }: { searchParams?: NextSearchParams }) => {
	const termsParams = prepareTermsSearchParams(searchParams);
	const [amenities, propertyStatus, properties] = await Promise.all([
		fetcher<TaxonomyTerm[]>('/amenities'),
		fetcher<TaxonomyTerm[]>('/property_status'),
		getProperties({ params: { ...termsParams, per_page: 10 } }),
	]);

	return (
		<Wrapper>
			<Container>
				<Title>Search your new home</Title>

				<Properties>
					<Filters
						amenities={amenities}
						propertyStatus={propertyStatus}
						initialFilters={createInitialFilters(
							[...amenities, ...propertyStatus],
							searchParams,
						)}
					/>

					{!!properties.length && (
						<List>
							{properties.map((property) => (
								<PropertyCard.Root key={property.id} property={property}>
									<PropertyCard.Cover />
									<PropertyCard.Body />
									<PropertyCard.Footer />
								</PropertyCard.Root>
							))}
						</List>
					)}

					{!properties.length && (
						<EmptyStateText>
							No properties found. Try changing your filters.
						</EmptyStateText>
					)}
				</Properties>
			</Container>
		</Wrapper>
	);
};

export default SearchPage;
