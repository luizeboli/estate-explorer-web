import HomeContent from '@/components/HomeContent';
import HomeHero from '@/components/HomeHero';
import { styled } from '@linaria/react';

const Container = styled.div`
	height: 100vh;
	overflow-y: scroll;
	overflow-x: hidden;
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	padding: 8rem;
	gap: 5.4rem;
	padding-bottom: 3.2rem;
`;

const HomePage = () => {
	return (
		<Container>
			<HomeHero />

			<ContentWrapper>
				<HomeContent />
			</ContentWrapper>
		</Container>
	);
};

export default HomePage;
