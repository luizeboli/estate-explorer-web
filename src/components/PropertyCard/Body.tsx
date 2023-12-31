import { styled } from '@linaria/react';
import dynamic from 'next/dynamic';
import Spinner from '@/components/Spinner';
import colors from '@/styles/colors';
import { usePropertyContext } from './context';

const Wrapper = styled.div`
	padding: 2.4rem 1.4rem 1.2rem;
`;

const PriceTitleWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.8rem;

	> div {
		display: grid;
	}
`;

const Price = styled.p`
	font-size: 1.4rem;
	font-weight: 700;
	color: ${colors.purple[600]};
	margin-bottom: 1.4rem;

	& span {
		font-size: 1.2rem;
		font-weight: 400;
		color: ${colors.neutral[600]};
	}
`;

const Title = styled.p`
	font-size: 1.6rem;
	font-weight: 500;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const Location = styled.p`
	font-size: 1.2rem;
	color: ${colors.neutral[500]};

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const AddToWishlistButton = dynamic(() => import('./AddToWishlistButton'), {
	ssr: false,
	loading: () => <Spinner size={24} />,
});

const PropertyBody = () => {
	const { price, property_status, title, location } = usePropertyContext();

	return (
		<Wrapper>
			<PriceTitleWrapper>
				<div>
					<Price>
						{price}
						{property_status.slug === 'for-rent' && <span> /month</span>}
					</Price>

					<Title>{title}</Title>
				</div>

				<AddToWishlistButton />
			</PriceTitleWrapper>

			<Location>{location}</Location>
		</Wrapper>
	);
};

export default PropertyBody;
