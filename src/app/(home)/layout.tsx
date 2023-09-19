import HomeHero from '@/components/HomeHero';
import { screenMinWidth } from '@/styles/breakpoints';
import { styled } from '@linaria/react';

export const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	padding: 5.4rem 1.2rem 0;

	${screenMinWidth('md')} {
		padding: 5.4rem 3.2rem 0;
	}
`;

type HomeLayoutProps = {
	children: React.ReactNode;
	featuredProperties: React.ReactNode;
};

const HomeLayout = ({ children, featuredProperties }: HomeLayoutProps) => {
	return (
		<>
			<HomeHero />

			<ContentWrapper>
				{children}
				{featuredProperties}
			</ContentWrapper>
		</>
	);
};

export default HomeLayout;
