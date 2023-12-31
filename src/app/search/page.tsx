import Filters from '@/components/Filters';
import type { NextSearchParams } from '@/types';
import { styled } from '@linaria/react';
import * as PropertyCard from '@/components/PropertyCard';
import { getProperties, getTaxonomyTerms } from '@/services/api';
import type { AmenityTerm, PropertyStatusTerm } from '@/types/taxonomy';
import breakpoints, { screenMinWidth } from '@/styles/breakpoints';
import { createInitialFilters, prepareTermsSearchParams } from './helpers';

const Wrapper = styled.div`
	padding: 5.4rem 5% 0;
`;

const Container = styled.div`
	max-width: ${breakpoints.lg}px;
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

	${screenMinWidth('md')} {
		text-align: left;
	}
`;

const Properties = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3.2rem;

	${screenMinWidth('xmd')} {
		flex-direction: row;
	}
`;

const SearchPage = async ({ searchParams }: { searchParams?: NextSearchParams }) => {
	const termsParams = prepareTermsSearchParams(searchParams);
	const [amenities, propertyStatus, properties] = await Promise.all([
		getTaxonomyTerms<AmenityTerm[]>('amenities'),
		getTaxonomyTerms<PropertyStatusTerm[]>('property_status'),
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
						<List data-testid="properties-list">
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
