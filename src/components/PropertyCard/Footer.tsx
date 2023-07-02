'use client';

import { styled } from '@linaria/react';
import AmenityIcon from '@/components/AmenityIcon';
import colors from '@/styles/colors';
import { usePropertyContext } from './context';

const Wrapper = styled.div`
	display: flex;
	margin: 0 1.4rem 1.6rem;
	padding-top: 1.2rem;
	border-top: 1px solid ${colors.neutral[200]};
`;

const Amenities = styled.ul`
	display: flex;
	gap: 1.2rem;
`;

const Amenity = styled.li`
	font-size: 1.4rem;
	flex-shrink: 0;
	& svg {
		margin-right: 0.4rem;
		vertical-align: middle;
		color: ${colors.purple[400]};
	}
`;

const Footer = () => {
	const { amenities } = usePropertyContext();
	return (
		<Wrapper>
			<Amenities>
				{amenities.map((amenity) => (
					<Amenity key={amenity.slug}>
						<AmenityIcon slug={amenity.slug} size={18} />
						{amenity.name}
					</Amenity>
				))}
			</Amenities>
		</Wrapper>
	);
};

export default Footer;
