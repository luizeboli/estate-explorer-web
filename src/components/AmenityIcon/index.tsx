import type { AmenityTermSlug } from '@/types/taxonomy';
import type { LucideIcon, LucideProps } from 'lucide-react';
import { Dumbbell, ParkingSquare, Waves } from 'lucide-react';

const amenityIcons: { [key in AmenityTermSlug]: LucideIcon } = {
	gym: Dumbbell,
	parking: ParkingSquare,
	pool: Waves,
};

type AmenityIconProps = {
	slug: keyof typeof amenityIcons;
} & LucideProps;

const AmenityIcon = ({ slug, ...lucideProps }: AmenityIconProps) => {
	const Component = amenityIcons[slug];

	// eslint-disable-next-line react/jsx-props-no-spreading
	return <Component {...lucideProps} />;
};

export default AmenityIcon;
