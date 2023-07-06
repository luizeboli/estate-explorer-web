import * as PropertyCard from '@/components/PropertyCard';
import { getProperties } from '@/services/api';
import breakpoints, { screenMinWidth } from '@/styles/breakpoints';
import colors from '@/styles/colors';
import { styled } from '@linaria/react';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	padding: 6.2rem 1.2rem 0;

	${screenMinWidth('sm')} {
		max-width: 32rem;
		width: 100%;
		margin: 0 auto;
	}

	${screenMinWidth('md')} {
		padding: 6.2rem 3.2rem 0;
		max-width: ${breakpoints.lg}px;
	}
`;

const Title = styled.h2`
	position: relative;
	font-size: 3.2rem;
	margin-bottom: 1.6rem;

	&::before {
		position: absolute;
		content: '';
		bottom: 0;
		width: 10.5rem;
		height: 0.2rem;
		background-color: ${colors.purple[500]};
	}
`;

const List = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 3.2rem;
`;

const FeaturedPropertiesSection = async () => {
	const properties = await getProperties({ params: { per_page: 10 } });

	if (!properties.length) return null;

	return (
		<Wrapper>
			<Title>Featured Properties</Title>

			<List data-testid="properties-list">
				{properties.map((property) => (
					<li key={property.id}>
						<PropertyCard.Root property={property}>
							<PropertyCard.StatusTag />
							<PropertyCard.Cover />
							<PropertyCard.Body />
							<PropertyCard.Footer />
						</PropertyCard.Root>
					</li>
				))}
			</List>
		</Wrapper>
	);
};

export default FeaturedPropertiesSection;
