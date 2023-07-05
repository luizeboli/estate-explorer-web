import { useWishlistContext } from '@/components/WishlistProvider/context';
import { Heart } from 'lucide-react';
import colors from '@/styles/colors';
import IconButton from '@/components/IconButton';
import { usePropertyContext } from './context';

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
			<Heart
				data-testid="wishlist-icon"
				size={20}
				color={colors.purple[500]}
				fill={isWishlisted ? colors.purple[500] : 'none'}
			/>
		</IconButton>
	);
};
export default AddToWishlistButton;
