import { useWishlistContext } from '@/components/WishlistProvider/context';
import { styled } from '@linaria/react';
import { Heart } from 'lucide-react';
import IconButton from '@/components/IconButton';
import colors from '@/styles/colors';
import { usePropertyContext } from './context';

type StyledIconButtonProps = {
	isWishlisted: boolean;
};

const StyledIconButton = styled(IconButton)<StyledIconButtonProps>`
	& svg {
		fill: ${({ isWishlisted }) => (isWishlisted ? colors.purple[500] : 'none')};
		color: ${colors.purple[500]};
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
		<StyledIconButton
			onClick={handleWishlistClick}
			aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
			isWishlisted={isWishlisted}
		>
			<Heart size={20} />
		</StyledIconButton>
	);
};
export default AddToWishlistButton;
