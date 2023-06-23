import Filters from '@/components/Filters';
import { TaxonomyTerm } from '@/types';
import { styled } from '@linaria/react';

const Container = styled.div`
	margin-top: 5.4rem;
	padding: 0 1.6rem;
`;

const Title = styled.h1`
	font-size: 2.4rem;
	text-align: center;
	margin-bottom: 3.2rem;
`;

const getTaxonomyTerms = async (taxonomyName: string): Promise<TaxonomyTerm[]> =>
	fetch(`${process.env.WP_HOST}/${taxonomyName}`).then((res) => res.json());

const SearchPage = async () => {
	const amenitiesTerms = getTaxonomyTerms('amenities');
	const propertyStatusTerms = getTaxonomyTerms('property_status');
	const [amenities, propertyStatus] = await Promise.all([amenitiesTerms, propertyStatusTerms]);

	return (
		<Container>
			<Title>Search your new home</Title>

			<Filters amenities={amenities} propertyStatus={propertyStatus} />
		</Container>
	);
};

export default SearchPage;
