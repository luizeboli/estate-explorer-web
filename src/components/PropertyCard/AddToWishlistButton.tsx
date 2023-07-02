import { useWishlistContext } from '@/components/WishlistProvider/context';
import { styled } from '@linaria/react';
import { Heart } from 'lucide-react';
import IconButton from '@/components/IconButton';
import { usePropertyContext } from './context';

type HeartIconProps = {
	isWishlisted: boolean;
};

const HeartIcon = styled(Heart)<HeartIconProps>`
	fill: ${({ isWishlisted }) => (isWishlisted ? 'rgb(168 85 247)' : 'none')};
	color: rgb(168 85 247);
`;

const AddToWishlistButton = () => {
	const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistContext();
	const { id } = usePropertyContext();
	const isWishlisted = isInWishlist(id);

	const handleWishlistClick = () => {
		if (isWishlisted) {
			removeFromWishlist(id);
		} else {
			addToWishlist(id);
		}
	};

	return (
		<IconButton
			onClick={handleWishlistClick}
			aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
		>
			<HeartIcon size={20} isWishlisted={isWishlisted} />
		</IconButton>
	);
};
export default AddToWishlistButton;
