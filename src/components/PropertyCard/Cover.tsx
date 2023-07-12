import { css } from '@linaria/core';
import Image from 'next/image';
import Link from 'next/link';
import HouseCoverPlaceholder from '@/assets/house-placeholder.png';
import { usePropertyContext } from './context';

const imageWrapper = css`
	display: flex;
	position: relative;
	overflow: hidden;
	border-top-left-radius: 0.6rem;
	border-top-right-radius: 0.6rem;
`;

const PropertyCover = () => {
	const { title, cover, slug } = usePropertyContext();

	return (
		<Link href={`/property/${slug}`} className={imageWrapper} scroll={false}>
			<Image
				src={cover ?? HouseCoverPlaceholder}
				alt={title}
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
	);
};

export default PropertyCover;
