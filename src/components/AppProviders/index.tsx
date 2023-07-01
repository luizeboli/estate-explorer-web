'use client';

import { SWRConfig } from 'swr';
import swrConfig from '@/utils/swr-config';
import WishlistProvider from '@/components/WishlistProvider';

type AppProviderProps = React.PropsWithChildren<{}>;

const AppProviders = ({ children }: AppProviderProps) => {
	return (
		<SWRConfig value={swrConfig}>
			<WishlistProvider>{children}</WishlistProvider>
		</SWRConfig>
	);
};

export default AppProviders;
