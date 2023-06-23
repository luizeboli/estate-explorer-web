import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export const Wrapper = styled.div`
	display: block;
	overflow: hidden;

	border-radius: 0.6rem;
	border: 1px solid rgb(229 229 229);

	background-color: #fff;
`;

export const ImageWrapper = css`
	display: flex;
	position: relative;
`;

export const Content = styled.div`
	padding: 2.4rem 1.4rem 1.2rem;
`;

export const PriceTitleWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.8rem;
`;

export const Price = styled.p`
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

export const Title = styled.p`
	font-size: 1.6rem;
	font-weight: 500;
`;

export const AddToWishList = styled.button`
	& svg {
		color: rgb(168 85 247);
	}
`;

export const Location = styled.p`
	font-size: 1.2rem;
	color: rgb(115 115 115);

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const Footer = styled.div`
	display: flex;
	margin: 0 1.4rem 1.6rem;
	padding-top: 1.2rem;
	border-top: 1px solid rgb(229 229 229);
`;

// export const Amenity

// export const amenitiesIcons = {
// 	gym: <Dumbbell size={12} />,
// 	park: <ParkingSquare size={12} />,
// 	pool: <Waves size={12} />,
// };
