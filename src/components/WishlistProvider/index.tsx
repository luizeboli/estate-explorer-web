'use client';

import useLocalStorage from '@/hooks/useLocalStorage';
import { useCallback, useMemo } from 'react';
import { TWishlistContext, WishlistContext } from './context';

type WishlistProviderProps = React.PropsWithChildren<{}>;

const WishlistProvider = ({ children }: WishlistProviderProps) => {
	const [wishlist, setWishlist] = useLocalStorage('wishlist', [] as number[]);

	const addToWishlist = useCallback<TWishlistContext['addToWishlist']>(
		(id) => {
			setWishlist((prev) => [...prev, id]);
		},
		[setWishlist],
	);

	const removeFromWishlist = useCallback<TWishlistContext['removeFromWishlist']>(
		(id) => {
			setWishlist((prev) => prev.filter((item) => item !== id));
		},
		[setWishlist],
	);

	const isInWishlist = useCallback<TWishlistContext['isInWishlist']>(
		(id) => {
			return wishlist.includes(id);
		},
		[wishlist],
	);

	const contextValue = useMemo(
		() => ({
			wishlist,
			addToWishlist,
			removeFromWishlist,
			isInWishlist,
		}),
		[wishlist, addToWishlist, removeFromWishlist, isInWishlist],
	);
	return <WishlistContext.Provider value={contextValue}>{children}</WishlistContext.Provider>;
};

export default WishlistProvider;
