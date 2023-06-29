'use client';

import { SWRConfig } from 'swr';
import swrConfig from '@/utils/swr-config';

type AppProviderProps = React.PropsWithChildren<{}>;

const AppProviders = ({ children }: AppProviderProps) => {
	return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
};

export default AppProviders;
