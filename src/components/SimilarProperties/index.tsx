'use client';

import * as PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import useSimilarProperties from '@/hooks/useSimilarProperties';
import { Property } from '@/types';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';

type SimilarPropertiesProps = {
	baseProperty: Property;
};

const Wrapper = styled.div`
	background-color: rgb(243 232 255);
	margin: 6.2rem -5% 0;
	padding: 4rem 5%;
`;

const TitleWrapper = styled.div`
	display: flex;
	gap: 1.2rem;
	margin-bottom: 1.6rem;
`;

const Title = styled.h3`
	font-size: 2rem;
	font-weight: 500;
`;

const Container = styled.div`
	max-width: 1440px;
	margin: 0 auto;
`;

const List = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 1.6rem;
	flex-grow: 1;
`;

const spinner = css`
	color: rgb(168 85 247);
`;

const SimilarProperties = ({ baseProperty }: SimilarPropertiesProps) => {
	const {
		data: properties,
		isLoading,
		isValidating,
	} = useSimilarProperties({ baseProperty, params: { per_page: 5 } });

	return (
		<Wrapper>
			<Container>
				<TitleWrapper>
					<Title>Similar Properties</Title>
					{(isLoading || isValidating) && <Spinner className={spinner} size={24} />}
				</TitleWrapper>

				<List>
					{properties?.map((property) => (
						<li key={property.id}>
							<PropertyCard.Root property={property}>
								<PropertyCard.Cover />
								<PropertyCard.Body />
								<PropertyCard.Footer />
							</PropertyCard.Root>
						</li>
					))}
				</List>
			</Container>
		</Wrapper>
	);
};

export default SimilarProperties;
