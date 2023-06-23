import FeaturedProperties from '@/components/FeaturedProperties';
import HomeContent from '@/components/HomeContent';
import HomeHero from '@/components/HomeHero';
import { Property } from '@/types';
import { styled } from '@linaria/react';

const properties: Property[] = [
	{
		id: 1,
		cover: 'https://placehold.co/200.png',
		title: 'Modern Family Home',
		location: 'San Francisco',
		price: 1234567890,
		status: { slug: 'for-sale', name: 'For Sale' },
		amenities: [
			{ slug: 'park', name: 'Park' },
			{ slug: 'pool', name: 'Pool' },
			{ slug: 'gym', name: 'Gym' },
		],
	},
	{
		id: 2,
		cover: 'https://placehold.co/200.png',
		title: 'Tarpon Bay',
		location: 'Orlando',
		price: 3245,
		status: { slug: 'for-rent', name: 'For Rent' },
		amenities: [
			{ slug: 'park', name: 'Park' },
			{ slug: 'pool', name: 'Pool' },
			{ slug: 'gym', name: 'Gym' },
		],
	},
	{
		id: 3,
		cover: 'https://placehold.co/200.png',
		title: 'Wonder Land',
		location: 'St. Petersburg Beach Florida 33706',
		price: 1000,
		status: { slug: 'for-rent', name: 'For Rent' },
		amenities: [{ slug: 'park', name: 'Park' }],
	},
	{
		id: 4,
		cover: 'https://placehold.co/200.png',
		title: 'Cove Red',
		location: 'Miami',
		price: 300000,
		status: { slug: 'for-sale', name: 'For Sale' },
		amenities: [{ slug: 'gym', name: 'Gym' }],
	},
	{
		id: 5,
		cover: 'https://placehold.co/200.png',
		title: 'Disneyland',
		location: 'Orlando Florida 32830',
		price: 3400,
		status: { slug: 'for-sale', name: 'For Sale' },
		amenities: [
			{ slug: 'park', name: 'Park' },
			{ slug: 'pool', name: 'Pool' },
			{ slug: 'gym', name: 'Gym' },
		],
	},
];

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
				<FeaturedProperties properties={properties} />
			</ContentWrapper>
		</Container>
	);
};

export default HomePage;
