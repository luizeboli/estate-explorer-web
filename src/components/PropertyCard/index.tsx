import Image from 'next/image';
import Link from 'next/link';
import { Heart, Dumbbell, ParkingSquare, Waves } from 'lucide-react';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { Property } from '@/types';

const Wrapper = styled.div`
	display: block;
	overflow: hidden;

	border-radius: 0.6rem;
	border: 1px solid rgb(229 229 229);

	background-color: #fff;
`;

const ImageWrapper = css`
	display: flex;
	position: relative;
`;

const Content = styled.div`
	padding: 2.4rem 1.4rem 1.2rem;
`;

const PriceTitleWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.8rem;
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

const Footer = styled.div`
	display: flex;
	margin: 0 1.4rem 1.6rem;
	padding-top: 1.2rem;
	border-top: 1px solid rgb(229 229 229);
`;

const Amenities = styled.ul`
	display: flex;
	gap: 1.2rem;
`;

const Amenity = styled.li`
	& svg {
		margin-right: 0.4rem;
		vertical-align: middle;
		color: rgb(192 132 252);
	}
`;

const amenitiesIcons = {
	gym: <Dumbbell size={16} />,
	park: <ParkingSquare size={16} />,
	pool: <Waves size={16} />,
};

type PropertyCardProps = {
	property: Property;
};

const PropertyCard = ({ property }: PropertyCardProps) => {
	return (
		<Wrapper>
			<Link href={`/property/${property.id}`} className={ImageWrapper}>
				<Image
					src={property.cover}
					alt={property.title}
					width={300}
					height={160}
					sizes="100vw"
					style={{
						width: '100%',
						height: 'auto',
						aspectRatio: '16/9',
						objectFit: 'cover',
					}}
				/>
			</Link>

			<Content>
				<PriceTitleWrapper>
					<div>
						<Price>
							{new Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'USD',
							}).format(property.price)}
							{property.status.slug === 'for-rent' && <span> /month</span>}
						</Price>

						<Title>{property.title}</Title>
					</div>

					<AddToWishList type="button">
						<Heart size={20} />
					</AddToWishList>
				</PriceTitleWrapper>

				<Location>{property.location}</Location>
			</Content>

			<Footer>
				<Amenities>
					{property.amenities.map((amenity) => (
						<Amenity key={amenity.slug}>
							{amenitiesIcons[amenity.slug as keyof typeof amenitiesIcons]}
							{amenity.name}
						</Amenity>
					))}
				</Amenities>
			</Footer>
		</Wrapper>
	);
};

export default PropertyCard;
