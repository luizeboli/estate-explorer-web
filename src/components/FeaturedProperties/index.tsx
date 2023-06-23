import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types';
import { styled } from '@linaria/react';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.h2`
	position: relative;
	font-size: 2.4rem;
	margin-bottom: 1.6rem;

	&::before {
		position: absolute;
		content: '';
		bottom: 0;
		width: 10.5rem;
		height: 0.2rem;
		background-color: rgb(168 85 247);
	}
`;

const List = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 1.6rem;
`;

type FeaturePropertiesProps = {
	properties: Property[];
};

const FeaturedProperties = ({ properties }: FeaturePropertiesProps) => {
	return (
		<Wrapper>
			<Title>Featured Properties</Title>

			<List>
				{properties.map((property) => (
					<li key={property.id}>
						<PropertyCard property={property} />
					</li>
				))}
			</List>
		</Wrapper>
	);
};

export default FeaturedProperties;
