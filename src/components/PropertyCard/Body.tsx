import { Heart } from 'lucide-react';
import { styled } from '@linaria/react';
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
	color: rgb(147 51 234);
	margin-bottom: 1.4rem;

	& span {
		font-size: 1.2rem;
		font-weight: 400;
		color: rgb(82 82 82);
	}
`;

const Title = styled.p`
	font-size: 1.6rem;
	font-weight: 500;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const AddToWishList = styled.button`
	& svg {
		color: rgb(168 85 247);
	}
`;

const Location = styled.p`
	font-size: 1.2rem;
	color: rgb(115 115 115);

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const PropertyBody = () => {
	const { price, property_status, title, location } = usePropertyContext();

	return (
		<Wrapper>
			<PriceTitleWrapper>
				<div>
					<Price>
						{price}
						{property_status === 'for-rent' && <span> /month</span>}
					</Price>

					<Title>{title}</Title>
				</div>

				<AddToWishList type="button">
					<Heart size={20} />
				</AddToWishList>
			</PriceTitleWrapper>

			<Location>{location}</Location>
		</Wrapper>
	);
};

export default PropertyBody;
