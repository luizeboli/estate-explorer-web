import FeaturedProperties from '@/components/FeaturedProperties';
import HomeContent from '@/components/HomeContent';
import HomeHero from '@/components/HomeHero';
import { getProperties } from '@/services/api';
import { screenMinWidth } from '@/styles/breakpoints';
import { styled } from '@linaria/react';

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	padding: 5.4rem 1.2rem 0;
	gap: 5.4rem;

	${screenMinWidth('md')} {
		padding: 5.4rem 3.2rem 0;
	}
`;

const HomePage = async () => {
	const properties = await getProperties({ params: { per_page: 10 } });

	return (
		<>
			<HomeHero />

			<ContentWrapper>
				<HomeContent />
				{properties.length && <FeaturedProperties properties={properties} />}
			</ContentWrapper>
		</>
	);
};

export default HomePage;
