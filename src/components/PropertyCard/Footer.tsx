'use client';

import { styled } from '@linaria/react';
import { Dumbbell, ParkingSquare, Waves } from 'lucide-react';
import { usePropertyContext } from './context';

const Wrapper = styled.div`
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
	parking: <ParkingSquare size={16} />,
	pool: <Waves size={16} />,
};

const Footer = () => {
	const { amenities } = usePropertyContext();
	return (
		<Wrapper>
			<Amenities>
				{amenities.map((amenity) => (
					<Amenity key={amenity.slug}>
						{amenitiesIcons[amenity.slug as keyof typeof amenitiesIcons]}
						{amenity.name}
					</Amenity>
				))}
			</Amenities>
		</Wrapper>
	);
};

export default Footer;
