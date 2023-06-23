import Image from 'next/image';

import HeroImg from '@/assets/hero-header.png';
import { styled } from '@linaria/react';

const Wrapper = styled.section`
	position: relative;
	color: rgba(255, 255, 255, 0.87);

	width: 100%;
	height: 45rem;
`;

const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	max-width: 100%;
	height: 100%;
	overflow: hidden;
	z-index: -1;

	& img {
		object-fit: cover;
		width: 100%;
		z-index: -1;
	}

	&::before {
		position: absolute;
		content: '';
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: -4.4rem auto 0;
	height: 100%;
	max-width: max-content;
	padding: 0 1.2rem;
`;

const Title = styled.h1`
	font-size: 4rem;
	margin-bottom: 1.6rem;
`;

const Subtitle = styled.p`
	font-size: 1.4rem;
`;

const PropertiesData = styled.div`
	display: flex;
	gap: 2.4rem;
	margin-top: 3.2rem;
`;

const PropertiesDataItem = styled.div`
	padding-left: 1.2rem;
	border-left: 1px solid #d4d4d8;

	& p:first-child {
		font-size: 2.4rem;
		font-weight: 500;
		color: #a855f7;
	}

	& p:last-child {
		font-size: 1.2rem;
		font-weight: 300;
		color: #d4d4d8;
	}
`;

const HomeHero = () => {
	return (
		<Wrapper>
			<Overlay aria-hidden="true">
				<Image src={HeroImg} placeholder="blur" fill alt="Hidden background" priority />
			</Overlay>

			<Content>
				<Title>Buy, Rent or Sell, Easily.</Title>
				<Subtitle>
					Unlock a world of real estate opportunities: seamless property buying, renting
					or selling experience
				</Subtitle>

				<PropertiesData>
					<PropertiesDataItem>
						<p>1534+</p>
						<p>properties</p>
					</PropertiesDataItem>

					<PropertiesDataItem>
						<p>1369+</p>
						<p>renters</p>
					</PropertiesDataItem>
				</PropertiesData>
			</Content>
		</Wrapper>
	);
};

export default HomeHero;
