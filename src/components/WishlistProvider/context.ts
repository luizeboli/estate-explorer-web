import { createContext, useContext } from 'react';

export type TWishlistContext = {
	wishlist: number[];
	addToWishlist: (id: number) => void;
	removeFromWishlist: (id: number) => void;
	isInWishlist: (id: number) => boolean;
};

export const WishlistContext = createContext<TWishlistContext | undefined>(undefined);

export const useWishlistContext = () => {
	const context = useContext(WishlistContext);

	if (!context) {
		throw new Error('useWishlistContext must be used within a WishlistProvider');
	}

	return context;
};
