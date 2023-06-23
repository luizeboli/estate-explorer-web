import HomeHero from '@/components/HomeHero';
import { styled } from '@linaria/react';

const Container = styled.div`
	height: 100vh;
	overflow-y: scroll;
	overflow-x: hidden;
`;

const HomePage = () => {
	return (
		<Container>
			<HomeHero />
		</Container>
	);
};

export default HomePage;
