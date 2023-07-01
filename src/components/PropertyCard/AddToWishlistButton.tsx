import { useWishlistContext } from '@/components/WishlistProvider/context';
import { styled } from '@linaria/react';
import { Heart } from 'lucide-react';
import { usePropertyContext } from './context';

type AddToWishlistProps = {
	isWishlisted: boolean;
};

const Button = styled.button<AddToWishlistProps>`
	& svg {
		fill: ${({ isWishlisted }) => (isWishlisted ? 'rgb(168 85 247)' : 'none')};
		color: rgb(168 85 247);
	}
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
		<Button
			type="button"
			onClick={handleWishlistClick}
			aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
			isWishlisted={isWishlisted}
		>
			<Heart size={20} />
		</Button>
	);
};
export default AddToWishlistButton;
